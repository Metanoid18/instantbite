# 🍽️ Instant Bite Database Documentation

## Overview

This is a comprehensive MySQL database system designed for the Instant Bite restaurant application. It handles menu management, orders, reservations, users, events, loyalty programs, and more.

## Database Setup

### Prerequisites

- MySQL 8.0 or higher
- Node.js 14+ (for setup script)
- MySQL credentials with root access

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install mysql2
   ```

2. **Configure Database Credentials**
   
   Edit `database/setup.js` and update the configuration:
   ```javascript
   const config = {
     hostUrl: 'localhost',
     port: 3306,
     rootUser: 'root',
     rootPassword: 'YOUR_ROOT_PASSWORD',  // Your MySQL root password
     databaseName: 'instant_bite',
     databaseUser: 'instant_bite_user',
     databasePassword: 'InstantBite@2024',  // Change this!
   };
   ```

3. **Run Setup Script**
   ```bash
   node database/setup.js
   ```
   
   The script will:
   - Create the database
   - Create a dedicated database user
   - Build all tables and relationships
   - Optionally load sample data

4. **Connection Config**
   
   The setup creates `database/db-config.js` with your credentials. **Do not commit this file to version control!**

## Database Schema

### Core Tables

#### 1. **users**
Stores customer/user information
- Email, password hash, name, phone
- Avatar, bio, created/updated timestamps
- Last login tracking, active status

```sql
SELECT * FROM users WHERE email = 'user@example.com';
```

#### 2. **menu_categories**
Organizational structure for menu items
- Categories: Starters, Mains, Architectural (desserts), Beverages, Sides
- Display order, active status

```sql
SELECT * FROM menu_categories ORDER BY display_order;
```

#### 3. **menu_items**
Individual dishes and beverages
- Name, description, price, category
- Image URL, preparation time
- Signature/best-seller flags, calorie info
- Availability status

```sql
SELECT * FROM menu_items WHERE is_available = TRUE ORDER BY category_id;
```

#### 4. **orders**
Customer orders (dine-in, takeout, delivery)
- Order number, status, type
- Pricing (subtotal, tax, fees, discounts)
- Table assignment (dine-in)
- Delivery details (address, phone, fees)
- Special instructions, completion timestamps

```sql
SELECT * FROM orders WHERE user_id = 1 ORDER BY created_at DESC;
```

#### 5. **order_items**
Individual items in each order
- Links to menu items
- Quantity, unit price, subtotal
- Special requests per item

```sql
SELECT oi.*, mi.name FROM order_items oi
JOIN menu_items mi ON oi.menu_item_id = mi.id
WHERE oi.order_id = 1;
```

#### 6. **reservations**
Table reservation system
- Guest details (name, email, phone)
- Party size, date, time, duration
- Table assignment, status tracking
- Special requests, confirmation tracking

```sql
SELECT * FROM reservations WHERE reserved_date >= CURDATE() AND status = 'pending';
```

#### 7. **restaurant_tables**
Physical tables in the restaurant
- Table number, section, capacity
- Availability status
- QR code URL for ordering

```sql
SELECT * FROM restaurant_tables WHERE section = 'Main Floor' ORDER BY capacity;
```

#### 8. **chefs**
Staff chef profiles
- Name, bio, specialty
- Experience, awards
- Featured status, image

```sql
SELECT * FROM chefs WHERE featured = TRUE;
```

#### 9. **events**
Events hosted by the restaurant
- Title, description, date/time
- Capacity and current attendees
- Price, image, status

```sql
SELECT * FROM events WHERE event_date >= CURDATE() AND status = 'upcoming';
```

#### 10. **event_registrations**
Guest registrations for events
- Links users to events
- Guest count, special requests
- Registration status

```sql
SELECT e.*, COUNT(er.id) as total_attendees FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id
WHERE e.id = 1 GROUP BY e.id;
```

#### 11. **blog_posts**
Restaurant blog/news
- Title, slug, content
- Author, featured image
- Publication status, view count

```sql
SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC;
```

#### 12. **reviews**
Customer reviews and ratings
- User review of orders
- Rating (1-5), comment
- Helpful count, approval status

```sql
SELECT r.*, u.name, mi.name as menu_item FROM reviews r
JOIN users u ON r.user_id = u.id
WHERE r.status = 'approved'
ORDER BY r.rating DESC;
```

#### 13. **loyalty_points**
Customer loyalty program accounts
- Total points, used points, available (calculated)
- Membership level (bronze, silver, gold, platinum)

```sql
SELECT user_id, available_points, membership_level FROM loyalty_points;
```

#### 14. **promo_codes**
Marketing discount codes
- Discount type (percentage or fixed)
- Usage limits, validity period
- Minimum order requirements

```sql
SELECT * FROM promo_codes 
WHERE is_active = TRUE AND NOW() BETWEEN start_date AND end_date;
```

#### 15. **allergens & dietary_restrictions**
Food information tags
- Common allergens (peanuts, milk, fish, etc.)
- Dietary options (vegan, gluten-free, keto, etc.)

```sql
SELECT DISTINCT mia.name FROM menu_item_allergens mia
WHERE menu_item_id = 1;
```

#### 16. **ingredients** (Optional for inventory)
Food inventory tracking
- Stock level, reorder point
- Unit cost, supplier info

```sql
SELECT * FROM ingredients WHERE quantity_in_stock < reorder_level;
```

## Usage Examples

### Node.js Integration

```javascript
const db = require('./database/db');

// Get all available menu items
const menuItems = await db.query(
  'SELECT * FROM menu_items WHERE is_available = TRUE'
);

// Insert a new order
const orderId = await db.insert('orders', {
  user_id: 1,
  order_number: 'ORD-2024-001',
  order_type: 'dine-in',
  table_number: 3,
  subtotal: 75.00,
  tax: 6.00,
  total: 81.00,
  status: 'pending'
});

// Get user with their recent orders
const user = await db.queryOne(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);

const orders = await db.query(
  'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
  [userId]
);

// Update reservation status
await db.update(
  'reservations',
  { status: 'confirmed', table_id: 5 },
  'id = ?',
  [reservationId]
);

// Complete an order
await db.update(
  'orders',
  { status: 'completed', completed_at: new Date() },
  'id = ?',
  [orderId]
);
```

## Advanced Queries

### Popular Menu Items
```sql
SELECT mi.*, COUNT(oi.id) as order_count
FROM menu_items mi
LEFT JOIN order_items oi ON mi.id = oi.menu_item_id
GROUP BY mi.id
ORDER BY order_count DESC
LIMIT 10;
```

### Revenue Report
```sql
SELECT 
  DATE(created_at) as date,
  SUM(total) as daily_revenue,
  COUNT(*) as orders_count,
  AVG(total) as avg_order_value
FROM orders
WHERE status = 'completed'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Reservation Occupancy
```sql
SELECT 
  reserved_date,
  COUNT(*) as reservations,
  SUM(party_size) as total_guests
FROM reservations
WHERE status IN ('confirmed', 'seated')
GROUP BY reserved_date
ORDER BY reserved_date;
```

### Loyalty Program Overview
```sql
SELECT 
  u.name,
  lp.membership_level,
  lp.total_points,
  lp.available_points,
  COUNT(o.id) as total_orders,
  SUM(o.total) as total_spent
FROM loyalty_points lp
JOIN users u ON lp.user_id = u.id
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed'
GROUP BY u.id
ORDER BY lp.available_points DESC;
```

### Menu with Allergen Info
```sql
SELECT 
  mi.id,
  mi.name,
  mi.price,
  mc.name as category,
  GROUP_CONCAT(a.code) as allergens,
  GROUP_CONCAT(dr.code) as dietary_options
FROM menu_items mi
LEFT JOIN menu_categories mc ON mi.category_id = mc.id
LEFT JOIN menu_item_allergens mia ON mi.id = mia.menu_item_id
LEFT JOIN allergens a ON mia.allergen_id = a.id
LEFT JOIN menu_item_dietary_restrictions midr ON mi.id = midr.menu_item_id
LEFT JOIN dietary_restrictions dr ON midr.dietary_restriction_id = dr.id
GROUP BY mi.id;
```

## Database Relationships

```
users
  ├── orders (1:many)
  │   └── order_items (1:many)
  │       └── menu_items (many:1)
  ├── reservations (1:many)
  ├── reviews (1:many)
  ├── loyalty_points (1:1)
  │   └── loyalty_transactions (1:many)
  ├── event_registrations (1:many)
  └── blog_posts (author, 1:many)

menu_items
  ├── menu_categories (many:1)
  ├── menu_item_allergens (many:many -> allergens)
  ├── menu_item_dietary_restrictions (many:many -> dietary_restrictions)
  ├── order_items (1:many)
  └── menu_item_ingredients (many:many -> ingredients)

events
  └── event_registrations (1:many)

restaurant_tables
  ├── reservations (1:many)
  └── orders (1:many)
```

## Indexing Strategy

The schema includes indexes on frequently queried columns:
- User email (unique, fast login)
- Order user_id and status (reporting, filtering)
- Menu item category and availability (menu display)
- Reservation date and status (booking system)
- Event date and status (event listing)
- Blog post status and publication date (blog queries)

These indexes optimize common queries without excessive storage overhead.

## Backup & Maintenance

### Backup
```bash
mysqldump -u instant_bite_user -p instant_bite > backup.sql
```

### Restore
```bash
mysql -u instant_bite_user -p instant_bite < backup.sql
```

### Check Database Integrity
```sql
CHECK TABLE menu_items, orders, reservations;
```

### Optimize Tables
```sql
OPTIMIZE TABLE menu_items, orders, reservations;
```

## Security Considerations

1. **Passwords**: Change default database password in `db-config.js`
2. **File Protection**: Never commit `db-config.js` to version control
3. **SQL Injection**: Always use parameterized queries (use `?` placeholders)
4. **User Privileges**: Database user has limited privileges (only on `instant_bite` database)
5. **Connection Pool**: Limits concurrent connections to prevent resource exhaustion

## Performance Tips

1. **Denormalization**: Consider denormalizing frequently joined data
2. **Pagination**: Always limit result sets in UI queries
3. **Caching**: Cache frequently accessed data (menu, chefs, testimonials)
4. **Archiving**: Archive old orders and events to maintain performance
5. **Monitoring**: Monitor slow queries with `EXPLAIN` statements

## Extending the Database

### Adding a New Feature

1. Create new table(s) in `schema.sql`
2. Add sample data to `sample-data.sql`
3. Run setup script to update database
4. Update `db.js` with new query functions if needed

### Example: Adding a "Favorites" Feature

```sql
CREATE TABLE user_favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (user_id, menu_item_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);
```

## Support & Documentation

- MySQL Documentation: https://dev.mysql.com/doc/
- mysql2 Package: https://github.com/sidorares/node-mysql2
- Restaurant Management Best Practices: See `QUERIES.md`

---

**Created for Instant Bite Restaurant** 🍽️
Database Version: 1.0
Last Updated: 2024
