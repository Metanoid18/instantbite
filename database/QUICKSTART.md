# 🚀 Quick Start Guide - Instant Bite Database

## Prerequisites

- **MySQL 8.0+** - Install from [mysql.com](https://dev.mysql.com/downloads/mysql/)
- **Node.js 14+** - Install from [nodejs.org](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd instant-bite
npm install mysql2
```

### Step 2: Configure Database Credentials

Edit `database/setup.js`:

```javascript
const config = {
  hostUrl: 'localhost',
  port: 3306,
  rootUser: 'root',
  rootPassword: 'YOUR_MYSQL_ROOT_PASSWORD',  // ← Update this!
  databaseName: 'instant_bite',
  databaseUser: 'instant_bite_user',
  databasePassword: 'InstantBite@2024',      // ← Change this too!
};
```

### Step 3: Run Setup Script
```bash
node database/setup.js
```

You'll be prompted to load sample data. Type `y` or `yes` to add demo data.

### Step 4: Verify Installation
```bash
mysql -u instant_bite_user -p instant_bite -e "SELECT COUNT(*) as menu_items FROM menu_items;"
```

Enter password: `InstantBite@2024` (or your custom password)

Expected output:
```
+-------------+
| menu_items  |
+-------------+
|     13      |
+-------------+
```

✅ **Database is ready!**

---

## Using the Database in Your App

### Node.js/Express Backend

```javascript
const db = require('./database/db');

// Get all menu items
app.get('/api/menu', async (req, res) => {
  const items = await db.query('SELECT * FROM menu_items WHERE is_available = TRUE');
  res.json(items);
});

// Create an order
app.post('/api/orders', async (req, res) => {
  const { userId, items, total, orderType } = req.body;
  
  const orderId = await db.insert('orders', {
    user_id: userId,
    order_number: `ORD-${Date.now()}`,
    order_type: orderType,
    subtotal: total,
    tax: total * 0.08,
    total: total * 1.08,
    status: 'pending'
  });
  
  res.json({ orderId, orderNumber: `ORD-${orderId}` });
});

// Get user's orders
app.get('/api/users/:id/orders', async (req, res) => {
  const orders = await db.query(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
    [req.params.id]
  );
  res.json(orders);
});

// Clean up on app shutdown
process.on('SIGINT', async () => {
  await db.closePool();
  process.exit(0);
});
```

### Connection Pool Usage

The `db.js` module handles connection pooling automatically:

```javascript
const db = require('./database/db');

// Simple query
const result = await db.query('SELECT * FROM menu_items');

// Query with parameters (prevents SQL injection)
const user = await db.queryOne(
  'SELECT * FROM users WHERE email = ?',
  ['user@example.com']
);

// Insert with generated ID
const itemId = await db.insert('menu_items', {
  name: 'New Dish',
  category_id: 2,
  price: 19.99,
  description: 'Delicious new item'
});

// Update
await db.update(
  'orders',
  { status: 'completed' },
  'id = ?',
  [orderId]
);

// Delete
await db.deleteRecord('promotional_codes', 'id = ?', [codeId]);
```

---

## Common Tasks

### Add a Menu Item
```javascript
const itemId = await db.insert('menu_items', {
  name: 'New Appetizer',
  description: 'Our latest creation',
  category_id: 1,  // Starters
  price: 12.50,
  image_url: 'https://...',
  is_available: true
});
```

### Create a Reservation
```javascript
const resId = await db.insert('reservations', {
  user_id: userId,
  reservation_number: 'RES-2024-001',
  guest_name: 'John Doe',
  guest_phone: '+1-555-0101',
  party_size: 4,
  reserved_date: '2024-03-20',
  reserved_time: '19:00',
  status: 'pending'
});
```

### Place an Order
```javascript
// Create order
const orderId = await db.insert('orders', {
  user_id: userId,
  order_number: 'ORD-' + Date.now(),
  order_type: 'dine-in',
  table_number: 3,
  subtotal: 75.00,
  tax: 6.00,
  total: 81.00,
  status: 'pending'
});

// Add items to order
for (const item of cartItems) {
  await db.insert('order_items', {
    order_id: orderId,
    menu_item_id: item.id,
    quantity: item.qty,
    unit_price: item.price,
    subtotal: item.price * item.qty
  });
}
```

### Update Order Status
```javascript
await db.update(
  'orders',
  { 
    status: 'completed',
    completed_at: new Date()
  },
  'id = ?',
  [orderId]
);
```

### Award Loyalty Points
```javascript
// Add points
await db.insert('loyalty_transactions', {
  user_id: userId,
  order_id: orderId,
  points_amount: 100,
  transaction_type: 'earned',
  description: 'Purchase reward'
});

// Update loyalty points total
const current = await db.queryOne(
  'SELECT total_points FROM loyalty_points WHERE user_id = ?',
  [userId]
);
await db.update(
  'loyalty_points',
  { total_points: current.total_points + 100 },
  'user_id = ?',
  [userId]
);
```

---

## Useful Queries

### Menu by Category
```javascript
const menu = await db.query(`
  SELECT mc.name as category, mi.* 
  FROM menu_items mi
  JOIN menu_categories mc ON mi.category_id = mc.id
  WHERE mi.is_available = TRUE
  ORDER BY mc.display_order, mi.name
`);
```

### Customer Analytics
```javascript
const customerStats = await db.query(`
  SELECT 
    u.name,
    COUNT(o.id) as orders,
    SUM(o.total) as spent,
    lp.membership_level
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  LEFT JOIN loyalty_points lp ON u.id = lp.user_id
  GROUP BY u.id
  ORDER BY spent DESC
`);
```

### Sales by Day
```javascript
const dailySales = await db.query(`
  SELECT 
    DATE(created_at) as date,
    COUNT(*) as orders,
    SUM(total) as revenue
  FROM orders
  WHERE status = 'completed'
  GROUP BY DATE(created_at)
  ORDER BY date DESC
  LIMIT 30
`);
```

---

## Troubleshooting

### "Connection refused" Error
```
✘ Make sure MySQL is running
  On Windows: Check Services or run 'mysqld'
  On Mac: brew services start mysql
  On Linux: sudo systemctl start mysql
```

### "Access denied for user" Error
```
✘ Verify credentials in setup.js match your MySQL configuration
✘ Make sure you've run the setup script
✘ Check db-config.js exists in database folder
```

### "Database doesn't exist" Error
```
✘ The setup script didn't complete successfully
✘ Try deleting db-config.js and running setup again
```

### Performance Issues
```
1. Check slow queries: mysql -u root -p -e "SHOW PROCESSLIST;"
2. Verify indexes exist: SHOW KEYS FROM table_name;
3. Check table sizes: SELECT table_name, round(((data_length + index_length) / 1024 / 1024), 2) as size_mb FROM information_schema.tables WHERE table_schema = 'instant_bite';
```

---

## Next Steps

1. **Backend Setup**: Create API endpoints using `db.js`
2. **Frontend Integration**: Connect React app to API endpoints
3. **Admin Panel**: Build management dashboard using queries from `QUERIES.sql`
4. **Testing**: Test with sample data before going live
5. **Backup**: Regular backups using `mysqldump`

---

## Documentation

- Full schema: [README.md](./README.md)
- Useful queries: [QUERIES.sql](./QUERIES.sql)
- Setup details: Just ran `setup.js`

Need help? Check the database README or review the sample queries for examples!

🍽️ **Happy coding with Instant Bite!**
