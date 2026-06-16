-- ============================================================================
-- INSTANT BITE - Sample Data
-- ============================================================================

-- ============================================================================
-- MENU CATEGORIES
-- ============================================================================

INSERT INTO menu_categories (name, description, display_order, is_active) VALUES
('Starters', 'Begin your culinary journey', 1, TRUE),
('Mains', 'Our signature entrees', 2, TRUE),
('Architectural', 'Artisanal desserts and creations', 3, TRUE),
('Beverages', 'Refreshing drinks and spirits', 4, TRUE),
('Sides', 'Perfect complements to your meal', 5, TRUE);

-- ============================================================================
-- ALLERGENS
-- ============================================================================

INSERT INTO allergens (name, code, description) VALUES
('Peanuts', 'PN', 'Contains peanuts or peanut oil'),
('Tree Nuts', 'TN', 'Contains tree nuts'),
('Milk', 'ML', 'Contains milk or dairy'),
('Eggs', 'EG', 'Contains eggs'),
('Fish', 'FSH', 'Contains fish'),
('Shellfish', 'SH', 'Contains shellfish'),
('Soy', 'SY', 'Contains soy'),
('Wheat', 'WH', 'Contains wheat or gluten'),
('Sesame', 'SES', 'Contains sesame');

-- ============================================================================
-- DIETARY RESTRICTIONS
-- ============================================================================

INSERT INTO dietary_restrictions (name, code, description) VALUES
('Vegan', 'VG', 'No animal products'),
('Vegetarian', 'V', 'No meat or fish'),
('Gluten-Free', 'GF', 'No wheat or gluten'),
('Keto', 'K', 'Low carb diet'),
('Paleo', 'P', 'Ancestral diet'),
('Dairy-Free', 'DF', 'No dairy products'),
('Nut-Free', 'NF', 'No tree nuts or peanuts');

-- ============================================================================
-- USERS (Sample Customers)
-- ============================================================================

INSERT INTO users (email, password_hash, name, phone, avatar_url, created_at) VALUES
('john.doe@email.com', 'hashed_password_1', 'John Doe', '+1-555-0101', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', NOW() - INTERVAL 90 DAY),
('jane.smith@email.com', 'hashed_password_2', 'Jane Smith', '+1-555-0102', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', NOW() - INTERVAL 60 DAY),
('mike.wilson@email.com', 'hashed_password_3', 'Mike Wilson', '+1-555-0103', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', NOW() - INTERVAL 30 DAY),
('sarah.jones@email.com', 'hashed_password_4', 'Sarah Jones', '+1-555-0104', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', NOW() - INTERVAL 15 DAY),
('alex.brown@email.com', 'hashed_password_5', 'Alex Brown', '+1-555-0105', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', NOW() - INTERVAL 7 DAY);

-- ============================================================================
-- MENU ITEMS
-- ============================================================================

INSERT INTO menu_items (name, description, category_id, price, image_url, prep_time_minutes, is_signature, is_best_seller, calories) VALUES
-- Starters
('Structure Fries', 'Triple-cooked potato batons, rosemary dust, parmesan shavings.', 1, 8.00, 'https://images.unsplash.com/photo-1630384060421-a4323ceca041', 8, FALSE, TRUE, 380),
('Liquid Gold', 'Saffron-infused consommé, gold leaf, suspended micro-herbs.', 1, 14.00, 'https://images.unsplash.com/photo-1547592180-85f173990554', 12, FALSE, FALSE, 150),
('Void Wings', 'Charcoal-dusted chicken wings, truffle aioli, crispy shallots.', 1, 12.00, 'https://images.unsplash.com/photo-1608424849619-87d3d94b237e', 10, FALSE, TRUE, 420),

-- Mains
('Void Burger', 'Charcoal bun, dry-aged smash patty, truffle aioli, pickled enoki.', 2, 18.00, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5', 12, TRUE, TRUE, 620),
('Monolith Steak', 'Sous-vide flank steak, geometric root vegetables, reduction.', 2, 32.00, 'https://images.unsplash.com/photo-1600891964092-4316c288032e', 18, TRUE, TRUE, 580),
('Ethereal Pasta', 'Hand-rolled tagliatelle, charred tomato essence, basil oil, parmesan.', 2, 22.00, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', 14, FALSE, FALSE, 520),
('Geometric Fish', 'Pan-seared arctic char, precise beurre blanc, micro vegetables.', 2, 28.00, 'https://images.unsplash.com/photo-1615485294302-95dda7b6b2a7', 15, FALSE, FALSE, 380),

-- Architectural
('Concrete Mousse', 'Sesame grey mousse, activated charcoal sponge, blackberry gel.', 3, 12.00, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb', 8, FALSE, FALSE, 320),
('Void Sphere', 'Dark chocolate shell, nitrogen pearl centre, raspberry coulis.', 3, 14.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', 10, TRUE, TRUE, 380),
('Citrus Architecture', 'Yuzu tart, compressed grapefruit, meringue structure.', 3, 11.00, 'https://images.unsplash.com/photo-1604080554519-36bea6cf38d0', 7, FALSE, FALSE, 280),

-- Beverages
('Neon Nectar', 'Yuzu, tonic, butterfly pea flower, bioluminescent essence.', 4, 9.00, NULL, 3, FALSE, TRUE, 120),
('Void Cold Brew', 'Single-origin cold brew, activated charcoal, vanilla cream.', 4, 7.00, NULL, 5, FALSE, FALSE, 90),
('Golden Hour', 'Saffron-infused house lemonade, edible gold, sparkling water.', 4, 8.00, NULL, 4, FALSE, FALSE, 110),

-- Sides
('Charcoal Bread', 'House-made charcoal focaccia with herb butter.', 5, 5.00, NULL, 6, FALSE, FALSE, 280);

-- Add allergens to menu items
INSERT INTO menu_item_allergens (menu_item_id, allergen_id) VALUES
-- Void Burger (id=1, EG allergen id=4, ML=3, WH=8)
(4, 3), (4, 4), (4, 8),
-- Monolith Steak (ML=3)
(5, 3),
-- Ethereal Pasta (EG=4, ML=3, WH=8)
(6, 3), (6, 4), (6, 8),
-- Geometric Fish (FSH=5, ML=3)
(7, 3), (7, 5);

-- Add dietary restrictions to menu items
INSERT INTO menu_item_dietary_restrictions (menu_item_id, dietary_restriction_id) VALUES
-- Structure Fries (VG=1, GF=3, DF=6)
(1, 1), (1, 3), (1, 6),
-- Liquid Gold (VG=1, DF=6)
(3, 1), (3, 6);

-- ============================================================================
-- RESTAURANT TABLES
-- ============================================================================

INSERT INTO restaurant_tables (table_number, section, capacity, is_available) VALUES
(1, 'Main Floor', 2, TRUE),
(2, 'Main Floor', 2, TRUE),
(3, 'Main Floor', 4, TRUE),
(4, 'Main Floor', 4, FALSE),
(5, 'Main Floor', 6, TRUE),
(6, 'Window Seats', 2, TRUE),
(7, 'Window Seats', 2, TRUE),
(8, 'Window Seats', 4, TRUE),
(9, 'VIP Corner', 4, TRUE),
(10, 'VIP Corner', 6, TRUE);

-- ============================================================================
-- CHEFS
-- ============================================================================

INSERT INTO chefs (name, bio, specialty, featured, years_experience, awards) VALUES
('Chef Marcus Noir', 'Visionary chef pushing the boundaries of fine dining with architectural cuisine.', 'Modern Technique & Presentation', TRUE, 18, 'Michelin Star (2020, 2021), James Beard Award'),
('Chef Elena Rosa', 'Italian heritage meets contemporary innovation in every dish.', 'Italian & European Cuisine', TRUE, 14, 'Best Chef Award (2021)'),
('Chef James Park', 'Masterful fusion of Asian techniques with Western ingredients.', 'Fusion & Asian', FALSE, 12, 'Rising Star Chef (2021)');

-- ============================================================================
-- OPERATING HOURS
-- ============================================================================

INSERT INTO operating_hours (day_of_week, opening_time, closing_time, is_closed) VALUES
('Monday', '11:00:00', '22:00:00', FALSE),
('Tuesday', '11:00:00', '22:00:00', FALSE),
('Wednesday', '11:00:00', '22:00:00', FALSE),
('Thursday', '11:00:00', '23:00:00', FALSE),
('Friday', '11:00:00', '23:00:00', FALSE),
('Saturday', '10:00:00', '23:00:00', FALSE),
('Sunday', '10:00:00', '21:00:00', FALSE);

-- ============================================================================
-- TESTIMONIALS
-- ============================================================================

INSERT INTO testimonials (user_name, rating, comment, featured) VALUES
('Marcus T.', 5, 'An absolutely transcendent dining experience. The architectural presentation is as impressive as the flavors.', TRUE),
('Lisa K.', 5, 'Best meal of my life. The void burger is genuinely life-changing.', TRUE),
('David M.', 4, 'Incredible atmosphere and phenomenal service. Highly recommend for special occasions.', TRUE),
('Sarah H.', 5, 'The desserts alone are worth a visit. Every detail is perfection.', FALSE),
('John P.', 4, 'Amazing food, though pricey. Worth it for the experience.', FALSE);

-- ============================================================================
-- LOYALTY PROGRAM
-- ============================================================================

INSERT INTO loyalty_points (user_id, total_points, points_used, membership_level) VALUES
(1, 450, 50, 'gold'),
(2, 230, 0, 'silver'),
(3, 150, 0, 'bronze'),
(4, 580, 100, 'gold'),
(5, 95, 0, 'bronze');

-- ============================================================================
-- SAMPLE ORDERS
-- ============================================================================

INSERT INTO orders (user_id, order_number, status, order_type, table_number, subtotal, tax, delivery_fee, discount, total, created_at) VALUES
(1, 'ORD-2024-001', 'completed', 'dine-in', 3, 68.00, 5.44, 0, 0, 73.44, NOW() - INTERVAL 15 DAY),
(2, 'ORD-2024-002', 'completed', 'takeout', NULL, 45.00, 3.60, 0, 5.00, 43.60, NOW() - INTERVAL 10 DAY),
(3, 'ORD-2024-003', 'completed', 'delivery', NULL, 82.00, 6.56, 5.00, 0, 93.56, NOW() - INTERVAL 7 DAY),
(1, 'ORD-2024-004', 'completed', 'dine-in', 1, 52.00, 4.16, 0, 0, 56.16, NOW() - INTERVAL 3 DAY),
(4, 'ORD-2024-005', 'confirmed', 'dine-in', 5, 95.00, 7.60, 0, 0, 102.60, NOW() - INTERVAL 1 DAY);

-- ============================================================================
-- SAMPLE ORDER ITEMS
-- ============================================================================

INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, subtotal) VALUES
(1, 4, 2, 18.00, 36.00),  -- 2x Void Burger
(1, 1, 1, 8.00, 8.00),    -- 1x Structure Fries
(1, 9, 2, 12.00, 24.00),  -- 2x Void Sphere
(2, 4, 1, 18.00, 18.00),  -- 1x Void Burger
(2, 7, 1, 9.00, 9.00),    -- 1x Neon Nectar
(2, 8, 1, 8.00, 8.00),    -- 1x Void Cold Brew
(3, 5, 1, 32.00, 32.00),  -- 1x Monolith Steak
(3, 6, 1, 22.00, 22.00),  -- 1x Ethereal Pasta
(3, 10, 2, 14.00, 28.00), -- 2x Citrus Architecture
(4, 4, 1, 18.00, 18.00),  -- 1x Void Burger
(4, 1, 2, 8.00, 16.00),   -- 2x Structure Fries
(4, 9, 1, 12.00, 12.00),  -- 1x Void Sphere
(5, 5, 2, 32.00, 64.00),  -- 2x Monolith Steak
(5, 7, 1, 22.00, 22.00),  -- 1x Ethereal Pasta
(5, 9, 1, 12.00, 12.00);  -- 1x Void Sphere

-- ============================================================================
-- SAMPLE RESERVATIONS
-- ============================================================================

INSERT INTO reservations (user_id, reservation_number, guest_name, guest_email, guest_phone, party_size, reserved_date, reserved_time, special_requests, status, table_id) VALUES
(1, 'RES-2024-001', 'John Doe', 'john.doe@email.com', '+1-555-0101', 4, CURDATE() + INTERVAL 2 DAY, '19:00:00', 'Celebration dinner', 'confirmed', 3),
(2, 'RES-2024-002', 'Jane Smith', 'jane.smith@email.com', '+1-555-0102', 2, CURDATE() + INTERVAL 5 DAY, '20:00:00', 'Allergies: Shellfish', 'pending', NULL),
(3, 'RES-2024-003', 'Mike Wilson', 'mike.wilson@email.com', '+1-555-0103', 6, CURDATE() + INTERVAL 7 DAY, '18:30:00', 'Window seating if available', 'pending', NULL),
(4, 'RES-2024-004', 'Sarah Jones', 'sarah.jones@email.com', '+1-555-0104', 3, CURDATE() + INTERVAL 10 DAY, '19:30:00', NULL, 'pending', NULL);

-- ============================================================================
-- SAMPLE EVENTS
-- ============================================================================

INSERT INTO events (title, description, event_date, event_time, duration_minutes, location, capacity, current_attendees, price, featured, status) VALUES
('Chef''s Table Experience', 'An exclusive 6-course tasting menu with Chef Marcus Noir. Meet behind the scenes and learn the secrets of molecular gastronomy.', CURDATE() + INTERVAL 20 DAY, '19:00:00', 180, 'Chef''s Table', 8, 6, 195.00, TRUE, 'upcoming'),
('Wine Pairing Evening', 'Discover the perfect wine pairings with our sommelier. 5 carefully selected wines with complementary courses.', CURDATE() + INTERVAL 25 DAY, '19:30:00', 150, 'Main Dining', 30, 18, 85.00, TRUE, 'upcoming'),
('Cooking Class: Pasta Making', 'Learn to make fresh tagliatelle from scratch with Chef Elena Rosa. Take home your creations!', CURDATE() + INTERVAL 30 DAY, '14:00:00', 120, 'Kitchen Studio', 12, 8, 75.00, FALSE, 'upcoming');

-- ============================================================================
-- SAMPLE REVIEWS
-- ============================================================================

INSERT INTO reviews (user_id, order_id, rating, title, comment, status) VALUES
(1, 1, 5, 'Incredible experience', 'The food was absolutely magnificent. The service was attentive and the presentation was stunning.', 'approved'),
(2, 2, 4, 'Great food, fast service', 'Takeout was quick and the food arrived hot. Perfect quality!', 'approved'),
(3, 3, 5, 'Best dinner ever', 'Brought my spouse for an anniversary dinner. They treated us like royalty!', 'approved'),
(1, 4, 5, 'Must visit', 'Back for another round. The void burger is a work of art.', 'approved'),
(4, 5, 4, 'Excellent but pricey', 'Outstanding food quality. Prices match the experience.', 'pending');

-- ============================================================================
-- RESTAURANT SETTINGS
-- ============================================================================

INSERT INTO restaurant_settings (setting_key, setting_value, setting_type, description) VALUES
('restaurant_name', 'Instant Bite', 'string', 'Official restaurant name'),
('restaurant_phone', '+1-555-BITE-01', 'string', 'Main phone number'),
('restaurant_email', 'info@instantbite.com', 'string', 'Contact email'),
('restaurant_address', '123 Culinary Lane, Food City, FC 12345', 'string', 'Physical address'),
('restaurant_website', 'https://instantbite.com', 'string', 'Website URL'),
('cuisine_type', 'Architectural Modern', 'string', 'Type of cuisine'),
('seating_capacity', '50', 'number', 'Total seating capacity'),
('average_prep_time', '15', 'number', 'Average prep time in minutes'),
('delivery_radius_km', '5', 'number', 'Delivery service radius'),
('minimum_order_value', '25.00', 'string', 'Minimum order for delivery'),
('tax_rate', '8', 'number', 'Tax percentage'),
('enable_reservations', 'true', 'boolean', 'Allow table reservations'),
('enable_loyalty_program', 'true', 'boolean', 'Loyalty program active'),
('logo_url', '/logo.svg', 'string', 'Restaurant logo path');
