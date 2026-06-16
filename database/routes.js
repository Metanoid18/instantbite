/**
 * Sample API Routes for Instant Bite Restaurant
 * This file demonstrates how to use the database module with Express.js
 * 
 * Install dependencies:
 * npm install express cors dotenv
 */

const express = require('express');
const db = require('./db');

const router = express.Router();

// ============================================================================
// MENU ENDPOINTS
// ============================================================================

/**
 * GET /api/menu
 * Get all available menu items organized by category
 */
router.get('/menu', async (req, res) => {
  try {
    const menu = await db.query(`
      SELECT 
        mc.id as category_id,
        mc.name as category,
        mi.id,
        mi.name,
        mi.description,
        mi.price,
        mi.image_url,
        mi.is_signature,
        mi.is_best_seller,
        mi.calories,
        GROUP_CONCAT(a.code) as allergens
      FROM menu_categories mc
      LEFT JOIN menu_items mi ON mc.id = mi.category_id AND mi.is_available = TRUE
      LEFT JOIN menu_item_allergens mia ON mi.id = mia.menu_item_id
      LEFT JOIN allergens a ON mia.allergen_id = a.id
      GROUP BY mi.id
      ORDER BY mc.display_order, mi.name
    `);

    // Organize by category
    const organized = {};
    for (const item of menu) {
      if (!organized[item.category]) {
        organized[item.category] = [];
      }
      organized[item.category].push(item);
    }

    res.json(organized);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/menu/:id
 * Get single menu item details
 */
router.get('/menu/:id', async (req, res) => {
  try {
    const item = await db.queryOne(
      'SELECT * FROM menu_items WHERE id = ?',
      [req.params.id]
    );

    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Get allergens
    const allergens = await db.query(
      'SELECT a.* FROM allergens a JOIN menu_item_allergens mia ON a.id = mia.allergen_id WHERE mia.menu_item_id = ?',
      [req.params.id]
    );

    // Get dietary info
    const dietary = await db.query(
      'SELECT dr.* FROM dietary_restrictions dr JOIN menu_item_dietary_restrictions midr ON dr.id = midr.dietary_restriction_id WHERE midr.menu_item_id = ?',
      [req.params.id]
    );

    res.json({ ...item, allergens, dietary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// USER ENDPOINTS
// ============================================================================

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    // TODO: Hash password properly in production!
    const userId = await db.insert('users', {
      email,
      password_hash: password, // NEVER do this in production!
      name,
      phone: phone || null,
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      created_at: new Date()
    });

    // Create loyalty account
    await db.insert('loyalty_points', {
      user_id: userId,
      total_points: 0,
      points_used: 0,
      membership_level: 'bronze'
    });

    res.status(201).json({ id: userId, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/users/:id
 * Get user profile with order history
 */
router.get('/users/:id', async (req, res) => {
  try {
    const user = await db.queryOne(
      'SELECT id, email, name, phone, avatar_url, created_at, last_login FROM users WHERE id = ?',
      [req.params.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const orders = await db.query(
      'SELECT id, order_number, status, total, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
      [req.params.id]
    );

    const loyalty = await db.queryOne(
      'SELECT * FROM loyalty_points WHERE user_id = ?',
      [req.params.id]
    );

    res.json({ user, orders, loyalty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// ORDER ENDPOINTS
// ============================================================================

/**
 * POST /api/orders
 * Create a new order
 */
router.post('/orders', async (req, res) => {
  try {
    const { 
      userId, 
      items,           // Array of {menuItemId, quantity}
      orderType,       // 'dine-in', 'takeout', 'delivery'
      tableNumber,     // For dine-in
      specialInstructions,
      deliveryAddress  // For delivery
    } = req.body;

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await db.queryOne(
        'SELECT price FROM menu_items WHERE id = ?',
        [item.menuItemId]
      );

      if (!menuItem) {
        return res.status(400).json({ error: `Menu item ${item.menuItemId} not found` });
      }

      const itemSubtotal = menuItem.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        unitPrice: menuItem.price,
        subtotal: itemSubtotal,
        specialRequests: item.specialRequests || null
      });
    }

    const tax = subtotal * 0.08;
    const deliveryFee = orderType === 'delivery' ? 5.00 : 0;
    const total = subtotal + tax + deliveryFee;

    // Create order
    const orderId = await db.insert('orders', {
      user_id: userId,
      order_number: `ORD-${Date.now()}`,
      status: 'pending',
      order_type: orderType,
      table_number: tableNumber || null,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      delivery_fee: deliveryFee,
      total: total.toFixed(2),
      special_instructions: specialInstructions || null,
      delivery_address: deliveryAddress || null
    });

    // Add order items
    for (const item of orderItems) {
      await db.insert('order_items', {
        order_id: orderId,
        menu_item_id: item.menuItemId,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        subtotal: item.subtotal.toFixed(2),
        special_requests: item.specialRequests
      });
    }

    // Award loyalty points
    const points = Math.floor(total / 10); // 1 point per $10 spent
    await db.insert('loyalty_transactions', {
      user_id: userId,
      order_id: orderId,
      points_amount: points,
      transaction_type: 'earned',
      description: 'Purchase reward'
    });

    const loyalty = await db.queryOne(
      'SELECT total_points FROM loyalty_points WHERE user_id = ?',
      [userId]
    );

    await db.update(
      'loyalty_points',
      { total_points: loyalty.total_points + points },
      'user_id = ?',
      [userId]
    );

    res.status(201).json({
      orderId,
      orderNumber: `ORD-${orderId}`,
      total: total.toFixed(2),
      pointsEarned: points
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/orders/:id
 * Get order details with items
 */
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await db.queryOne(
      'SELECT * FROM orders WHERE id = ?',
      [req.params.id]
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = await db.query(
      `SELECT 
        oi.*, 
        mi.name, 
        mi.image_url, 
        mi.description
       FROM order_items oi
       JOIN menu_items mi ON oi.menu_item_id = mi.id
       WHERE oi.order_id = ?`,
      [req.params.id]
    );

    res.json({ ...order, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/orders/:id
 * Update order status
 */
router.patch('/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;

    await db.update(
      'orders',
      { 
        status,
        updated_at: new Date()
      },
      'id = ?',
      [req.params.id]
    );

    res.json({ message: 'Order updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// RESERVATION ENDPOINTS
// ============================================================================

/**
 * POST /api/reservations
 * Create a new reservation
 */
router.post('/reservations', async (req, res) => {
  try {
    const {
      userId,
      guestName,
      guestEmail,
      guestPhone,
      partySize,
      reservedDate,
      reservedTime,
      specialRequests
    } = req.body;

    const reservationId = await db.insert('reservations', {
      user_id: userId,
      reservation_number: `RES-${Date.now()}`,
      guest_name: guestName,
      guest_email: guestEmail || null,
      guest_phone: guestPhone,
      party_size: partySize,
      reserved_date: reservedDate,
      reserved_time: reservedTime,
      special_requests: specialRequests || null,
      status: 'pending'
    });

    res.status(201).json({
      reservationId,
      reservationNumber: `RES-${reservationId}`,
      status: 'pending'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reservations/:id
 * Get reservation details
 */
router.get('/reservations/:id', async (req, res) => {
  try {
    const reservation = await db.queryOne(
      'SELECT * FROM reservations WHERE id = ?',
      [req.params.id]
    );

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/availability/:date
 * Check table availability for a date
 */
router.get('/availability/:date', async (req, res) => {
  try {
    const tables = await db.query(`
      SELECT 
        rt.id,
        rt.table_number,
        rt.section,
        rt.capacity,
        CASE 
          WHEN r.id IS NULL THEN 'available'
          ELSE 'reserved'
        END as status
      FROM restaurant_tables rt
      LEFT JOIN reservations r ON rt.id = r.table_id 
        AND DATE(r.reserved_date) = ?
        AND r.status IN ('confirmed', 'seated')
      ORDER BY rt.section, rt.table_number
    `, [req.params.date]);

    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// EVENT ENDPOINTS
// ============================================================================

/**
 * GET /api/events
 * Get upcoming events
 */
router.get('/events', async (req, res) => {
  try {
    const events = await db.query(`
      SELECT 
        e.*,
        COUNT(er.id) as registered_guests
      FROM events e
      LEFT JOIN event_registrations er ON e.id = er.event_id
      WHERE e.event_date >= CURDATE()
      GROUP BY e.id
      ORDER BY e.event_date
    `);

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/events/:id/register
 * Register user for an event
 */
router.post('/events/:id/register', async (req, res) => {
  try {
    const { userId, guestCount, specialRequests } = req.body;

    const registrationId = await db.insert('event_registrations', {
      event_id: req.params.id,
      user_id: userId,
      guest_count: guestCount || 1,
      special_requests: specialRequests || null,
      status: 'registered'
    });

    res.status(201).json({ registrationId, message: 'Registered for event' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// REVIEW ENDPOINTS
// ============================================================================

/**
 * POST /api/reviews
 * Submit a review
 */
router.post('/reviews', async (req, res) => {
  try {
    const { userId, orderId, rating, title, comment } = req.body;

    const reviewId = await db.insert('reviews', {
      user_id: userId,
      order_id: orderId || null,
      rating,
      title: title || null,
      comment,
      status: 'pending'
    });

    res.status(201).json({
      reviewId,
      message: 'Review submitted for approval'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reviews
 * Get approved reviews
 */
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await db.query(`
      SELECT 
        r.*,
        u.name as user_name,
        u.avatar_url
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.status = 'approved'
      ORDER BY r.created_at DESC
      LIMIT 20
    `);

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

/**
 * Usage in main app:
 * 
 * const express = require('express');
 * const apiRoutes = require('./database/routes');
 * 
 * const app = express();
 * app.use(express.json());
 * app.use('/api', apiRoutes);
 * 
 * app.listen(3000, () => console.log('Server running on port 3000'));
 */
