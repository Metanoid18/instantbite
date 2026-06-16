-- ============================================================================
-- INSTANT BITE - Common Queries & Use Cases
-- ============================================================================

-- ============================================================================
-- USER MANAGEMENT
-- ============================================================================

-- Get user with total spending
SELECT 
  u.id, 
  u.name, 
  u.email, 
  COUNT(o.id) as total_orders,
  SUM(o.total) as total_spent,
  COALESCE(lp.membership_level, 'none') as loyalty_level
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed'
LEFT JOIN loyalty_points lp ON u.id = lp.user_id
WHERE u.id = 1
GROUP BY u.id;

-- Find VIP customers (spent over $500)
SELECT 
  u.id,
  u.name,
  u.email,
  SUM(o.total) as total_spent,
  COUNT(o.id) as order_count,
  MAX(o.created_at) as last_order
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed'
GROUP BY u.id
HAVING SUM(o.total) > 500
ORDER BY total_spent DESC;

-- ============================================================================
-- MENU & CATEGORY MANAGEMENT
-- ============================================================================

-- Get complete menu with categories and allergen info
SELECT 
  mc.id as category_id,
  mc.name as category,
  mi.id,
  mi.name,
  mi.price,
  mi.description,
  mi.calories,
  COALESCE(GROUP_CONCAT(DISTINCT a.code SEPARATOR ', '), 'None') as allergens,
  COALESCE(GROUP_CONCAT(DISTINCT dr.code SEPARATOR ', '), 'N/A') as dietary_options,
  mi.is_signature,
  mi.is_best_seller
FROM menu_categories mc
LEFT JOIN menu_items mi ON mc.id = mi.category_id AND mi.is_available = TRUE
LEFT JOIN menu_item_allergens mia ON mi.id = mia.menu_item_id
LEFT JOIN allergens a ON mia.allergen_id = a.id
LEFT JOIN menu_item_dietary_restrictions midr ON mi.id = midr.menu_item_id
LEFT JOIN dietary_restrictions dr ON midr.dietary_restriction_id = dr.id
GROUP BY mc.id, mi.id
ORDER BY mc.display_order, mi.name;

-- Find menu items with specific allergens
SELECT 
  mi.id,
  mi.name,
  mi.price,
  GROUP_CONCAT(a.name) as allergens
FROM menu_items mi
JOIN menu_item_allergens mia ON mi.id = mia.menu_item_id
JOIN allergens a ON mia.allergen_id = a.id
WHERE a.code IN ('PN', 'SH')  -- Peanuts or Shellfish
GROUP BY mi.id;

-- Get vegan menu
SELECT 
  mi.id,
  mi.name,
  mi.price,
  mi.description,
  mc.name as category
FROM menu_items mi
JOIN menu_categories mc ON mi.category_id = mc.id
JOIN menu_item_dietary_restrictions midr ON mi.id = midr.menu_item_id
JOIN dietary_restrictions dr ON midr.dietary_restriction_id = dr.id
WHERE dr.code = 'VG' AND mi.is_available = TRUE
ORDER BY mc.display_order, mi.name;

-- Menu items sorted by popularity (times ordered)
SELECT 
  mi.id,
  mi.name,
  mi.price,
  mc.name as category,
  COUNT(oi.id) as times_ordered,
  ROUND(AVG(r.rating), 2) as avg_rating
FROM menu_items mi
LEFT JOIN order_items oi ON mi.id = oi.menu_item_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
LEFT JOIN reviews r ON o.id = r.order_id
JOIN menu_categories mc ON mi.category_id = mc.id
GROUP BY mi.id
ORDER BY times_ordered DESC;

-- Best rated menu items
SELECT 
  mi.id,
  mi.name,
  mi.price,
  COUNT(r.id) as review_count,
  ROUND(AVG(r.rating), 2) as avg_rating,
  mi.is_signature,
  mi.is_best_seller
FROM menu_items mi
LEFT JOIN order_items oi ON mi.id = oi.menu_item_id
LEFT JOIN orders o ON oi.order_id = o.id
LEFT JOIN reviews r ON o.id = r.order_id AND r.rating > 0
WHERE mi.is_available = TRUE
GROUP BY mi.id
HAVING COUNT(r.id) > 0
ORDER BY avg_rating DESC
LIMIT 10;

-- ============================================================================
-- ORDER & SALES ANALYTICS
-- ============================================================================

-- Daily sales report
SELECT 
  DATE(o.created_at) as order_date,
  COUNT(o.id) as total_orders,
  ROUND(SUM(o.subtotal), 2) as subtotal,
  ROUND(SUM(o.tax), 2) as total_tax,
  ROUND(SUM(o.delivery_fee), 2) as total_delivery_fees,
  ROUND(SUM(o.discount), 2) as total_discounts,
  ROUND(SUM(o.total), 2) as total_revenue,
  ROUND(AVG(o.total), 2) as avg_order_value,
  COUNT(DISTINCT o.user_id) as unique_customers
FROM orders o
WHERE o.status = 'completed'
GROUP BY DATE(o.created_at)
ORDER BY order_date DESC;

-- Weekly revenue trends
SELECT 
  DATE(o.created_at) as date,
  WEEK(o.created_at) as week_number,
  COUNT(o.id) as orders,
  ROUND(SUM(o.total), 2) as revenue
FROM orders o
WHERE o.status = 'completed' AND DATE(o.created_at) >= DATE_SUB(CURDATE(), INTERVAL 4 WEEK)
GROUP BY WEEK(o.created_at), DATE(o.created_at)
ORDER BY date DESC;

-- Orders by type (dine-in, takeout, delivery)
SELECT 
  o.order_type,
  COUNT(*) as total_orders,
  ROUND(AVG(o.total), 2) as avg_order_value,
  ROUND(SUM(o.total), 2) as total_revenue,
  ROUND(AVG(o.total - o.subtotal), 2) as avg_fees_per_order
FROM orders o
WHERE o.status = 'completed'
GROUP BY o.order_type;

-- Peak hours analysis
SELECT 
  HOUR(o.created_at) as hour,
  COUNT(*) as order_count,
  ROUND(AVG(o.total), 2) as avg_order_value,
  ROUND(SUM(o.total), 2) as revenue
FROM orders o
WHERE o.status = 'completed' AND DATE(o.created_at) = CURDATE()
GROUP BY HOUR(o.created_at)
ORDER BY hour;

-- Orders with items details
SELECT 
  o.order_number,
  o.order_type,
  o.status,
  o.created_at,
  u.name as customer,
  GROUP_CONCAT(CONCAT(oi.quantity, 'x ', mi.name) SEPARATOR ', ') as items,
  o.total as order_total
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN menu_items mi ON oi.menu_item_id = mi.id
WHERE o.status = 'completed'
GROUP BY o.id
ORDER BY o.created_at DESC
LIMIT 20;

-- Pending orders (needs attention)
SELECT 
  o.order_number,
  o.status,
  TIME_FORMAT(TIMEDIFF(NOW(), o.created_at), '%H:%i') as time_pending,
  u.name,
  GROUP_CONCAT(mi.name SEPARATOR ', ') as items,
  o.total
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN menu_items mi ON oi.menu_item_id = mi.id
WHERE o.status IN ('pending', 'confirmed', 'preparing')
GROUP BY o.id
ORDER BY o.created_at;

-- ============================================================================
-- RESERVATION MANAGEMENT
-- ============================================================================

-- Upcoming reservations
SELECT 
  r.reservation_number,
  r.guest_name,
  r.guest_phone,
  r.reserved_date,
  TIME_FORMAT(r.reserved_time, '%H:%i') as time,
  r.party_size,
  rt.table_number,
  rt.section,
  r.special_requests,
  r.status
FROM reservations r
LEFT JOIN restaurant_tables rt ON r.table_id = rt.id
WHERE r.reserved_date >= CURDATE() AND r.status IN ('pending', 'confirmed')
ORDER BY r.reserved_date, r.reserved_time;

-- Occupancy forecast for today
SELECT 
  TIME_FORMAT(r.reserved_time, '%H:%i') as time_slot,
  COUNT(*) as reservations,
  SUM(r.party_size) as total_guests,
  GROUP_CONCAT(rt.table_number SEPARATOR ', ') as assigned_tables
FROM reservations r
LEFT JOIN restaurant_tables rt ON r.table_id = rt.id
WHERE DATE(r.reserved_date) = CURDATE() AND r.status IN ('confirmed', 'seated')
GROUP BY TIME_FORMAT(r.reserved_time, '%H:%i')
ORDER BY r.reserved_time;

-- Table availability at a specific time
SELECT 
  rt.table_number,
  rt.section,
  rt.capacity,
  CASE 
    WHEN r.id IS NULL THEN 'Available'
    ELSE 'Reserved'
  END as status,
  r.guest_name,
  TIME_FORMAT(r.reserved_time, '%H:%i') as reservation_time
FROM restaurant_tables rt
LEFT JOIN reservations r ON rt.id = r.table_id 
  AND DATE(r.reserved_date) = CURDATE()
  AND r.status IN ('confirmed', 'seated')
ORDER BY rt.section, rt.table_number;

-- No-show analysis
SELECT 
  COUNT(*) as no_shows,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM reservations WHERE status = 'completed'), 2) as no_show_rate,
  DATE(CURDATE()) - INTERVAL (DAYOFWEEK(CURDATE()) - 1) DAY as week
FROM reservations
WHERE status = 'no-show'
  AND DATE(reserved_date) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);

-- ============================================================================
-- LOYALTY PROGRAM
-- ============================================================================

-- Top loyalty members
SELECT 
  u.id,
  u.name,
  u.email,
  lp.membership_level,
  lp.total_points,
  lp.available_points,
  COUNT(o.id) as total_orders,
  ROUND(SUM(o.total), 2) as total_spent,
  MAX(o.created_at) as last_order_date
FROM loyalty_points lp
JOIN users u ON lp.user_id = u.id
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed'
GROUP BY u.id
ORDER BY lp.available_points DESC;

-- Points distribution by level
SELECT 
  lp.membership_level,
  COUNT(*) as member_count,
  ROUND(AVG(lp.available_points), 0) as avg_points,
  SUM(lp.available_points) as total_points_available
FROM loyalty_points lp
GROUP BY lp.membership_level
ORDER BY FIELD(lp.membership_level, 'bronze', 'silver', 'gold', 'platinum');

-- Loyalty transactions for a user
SELECT 
  lt.id,
  lt.transaction_type,
  lt.points_amount,
  lt.description,
  o.order_number,
  lt.created_at
FROM loyalty_transactions lt
LEFT JOIN orders o ON lt.order_id = o.id
WHERE lt.user_id = 1
ORDER BY lt.created_at DESC;

-- ============================================================================
-- EVENTS & REGISTRATIONS
-- ============================================================================

-- Upcoming events with registration count
SELECT 
  e.id,
  e.title,
  e.event_date,
  TIME_FORMAT(e.event_time, '%H:%i') as time,
  e.capacity,
  COUNT(er.id) as registered_guests,
  ROUND(COUNT(er.id) * 100.0 / e.capacity, 1) as occupancy_pct,
  e.price,
  e.featured
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id AND er.status = 'registered'
WHERE e.event_date >= CURDATE()
GROUP BY e.id
ORDER BY e.event_date;

-- Event attendee details
SELECT 
  e.title,
  u.name,
  u.email,
  u.phone,
  er.guest_count,
  er.special_requests,
  er.status
FROM event_registrations er
JOIN events e ON er.event_id = e.id
JOIN users u ON er.user_id = u.id
WHERE e.id = 1
ORDER BY u.name;

-- Event revenue analysis
SELECT 
  e.id,
  e.title,
  e.event_date,
  e.price,
  COUNT(er.id) as attendees,
  ROUND(e.price * COUNT(er.id), 2) as revenue
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id AND er.status = 'registered'
WHERE e.event_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
GROUP BY e.id
ORDER BY revenue DESC;

-- ============================================================================
-- REVIEWS & RATINGS
-- ============================================================================

-- Review summary
SELECT 
  r.rating,
  COUNT(*) as review_count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM reviews WHERE status = 'approved'), 2) as percentage
FROM reviews r
WHERE r.status = 'approved'
GROUP BY r.rating
ORDER BY r.rating DESC;

-- Recent approved reviews
SELECT 
  r.id,
  u.name as reviewer,
  r.rating,
  r.title,
  r.comment,
  o.order_number,
  r.helpful_count,
  r.created_at
FROM reviews r
JOIN users u ON r.user_id = u.id
LEFT JOIN orders o ON r.order_id = o.id
WHERE r.status = 'approved'
ORDER BY r.created_at DESC
LIMIT 10;

-- ============================================================================
-- PROMOTIONAL CODES
-- ============================================================================

-- Active promo codes
SELECT 
  id,
  code,
  description,
  discount_type,
  discount_value,
  minimum_order_value,
  current_uses,
  total_uses_limit,
  ROUND((current_uses / total_uses_limit) * 100, 1) as usage_pct,
  is_active
FROM promo_codes
WHERE is_active = TRUE 
  AND NOW() BETWEEN start_date AND end_date
ORDER BY current_uses DESC;

-- Promo code performance
SELECT 
  pc.code,
  COUNT(pcu.id) as times_used,
  COUNT(DISTINCT pcu.user_id) as unique_users,
  ROUND(SUM(o.total), 2) as revenue_generated
FROM promo_codes pc
LEFT JOIN promo_code_usage pcu ON pc.id = pcu.promo_code_id
LEFT JOIN orders o ON pcu.order_id = o.id
WHERE o.status = 'completed'
GROUP BY pc.id
ORDER BY times_used DESC;

-- ============================================================================
-- BLOG & CONTENT
-- ============================================================================

-- Published blog posts
SELECT 
  b.id,
  b.title,
  b.slug,
  u.name as author,
  b.view_count,
  b.published_at,
  GROUP_CONCAT(bt.name SEPARATOR ', ') as tags
FROM blog_posts b
LEFT JOIN users u ON b.author_id = u.id
LEFT JOIN blog_post_tags bpt ON b.id = bpt.blog_post_id
LEFT JOIN blog_tags bt ON bpt.blog_tag_id = bt.id
WHERE b.status = 'published'
GROUP BY b.id
ORDER BY b.published_at DESC;

-- Most viewed blog posts
SELECT 
  title,
  slug,
  view_count,
  published_at,
  ROUND(view_count / DATEDIFF(CURDATE(), DATE(published_at)), 2) as avg_daily_views
FROM blog_posts
WHERE status = 'published' AND published_at IS NOT NULL
ORDER BY view_count DESC
LIMIT 10;

-- ============================================================================
-- STAFF MANAGEMENT
-- ============================================================================

-- Chef profiles
SELECT 
  id,
  name,
  specialty,
  years_experience,
  awards,
  featured,
  CASE WHEN featured = TRUE THEN '⭐ Featured' ELSE '' END as status
FROM chefs
ORDER BY featured DESC, years_experience DESC;

-- ============================================================================
-- OPERATIONAL REPORTS
-- ============================================================================

-- Restaurant settings summary
SELECT 
  setting_key,
  setting_value
FROM restaurant_settings
ORDER BY setting_key;

-- Operating hours
SELECT 
  day_of_week,
  CASE WHEN is_closed = TRUE 
    THEN 'CLOSED'
    ELSE CONCAT(TIME_FORMAT(opening_time, '%H:%i'), ' - ', TIME_FORMAT(closing_time, '%H:%i'))
  END as hours
FROM operating_hours
ORDER BY FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- Inventory status (low stock alerts)
SELECT 
  id,
  name,
  quantity_in_stock,
  reorder_level,
  unit,
  CASE 
    WHEN quantity_in_stock < reorder_level THEN '🔴 LOW STOCK'
    WHEN quantity_in_stock < (reorder_level * 1.5) THEN '🟡 MONITOR'
    ELSE '🟢 OK'
  END as status
FROM ingredients
WHERE quantity_in_stock < (reorder_level * 1.5)
ORDER BY quantity_in_stock;
