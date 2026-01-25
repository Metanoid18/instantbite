import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface Dish {
    id: number;
    name: string;
    description: string;
    price: string;
    rating: string;
    reviews: string;
    image: string;
    category: string;
}

const FEATURED_DISHES: Dish[] = [
    // MAINS
    {
        id: 1,
        name: "Chicken And Chips",
        description: "Golden and crispy chips with a perfectly seasoned hamburger",
        price: "$15.00",
        rating: "4.8",
        reviews: "189 Reviews",
        category: "Mains",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Truffle Tagliatelle",
        description: "Hand-rolled pasta with shaved seasonal black truffles",
        price: "$28.00",
        rating: "5.0",
        reviews: "124 Reviews",
        category: "Mains",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2132&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Dry-Aged Ribeye",
        description: "45-day aged prime cut with bone marrow butter and herbs",
        price: "$42.00",
        rating: "4.9",
        reviews: "320 Reviews",
        category: "Mains",
        image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Poached Lobster",
        description: "Nova Scotia lobster tails with clarified saffron butter",
        price: "$55.00",
        rating: "4.9",
        reviews: "142 Reviews",
        category: "Mains",
        image: "https://images.unsplash.com/photo-1553163147-622ab57bb1cd?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "Wild Mushroom Risotto",
        description: "Foraged porcini, arborio rice, and 24-month aged parmesan",
        price: "$24.00",
        rating: "4.7",
        reviews: "215 Reviews",
        category: "Mains",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop"
    },

    // FAST FOODS
    {
        id: 2,
        name: "Crispy Wagyu Slider",
        description: "Dry-aged wagyu with truffle aioli on a toasted brioche bun",
        price: "$12.00",
        rating: "4.9",
        reviews: "245 Reviews",
        category: "Fast Foods",
        image: "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Atomic Wings",
        description: "Glazed in our signature molecular spice reduction",
        price: "$14.00",
        rating: "4.8",
        reviews: "312 Reviews",
        category: "Fast Foods",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 9,
        name: "The Void Burger",
        description: "Activated charcoal bun, double patty, and sharp cheddar",
        price: "$18.00",
        rating: "5.0",
        reviews: "560 Reviews",
        category: "Fast Foods",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop"
    },
    {
        id: 10,
        name: "Blackened Fries",
        description: "Seasoned with volcanic salt and smoked paprika blend",
        price: "$8.00",
        rating: "4.6",
        reviews: "420 Reviews",
        category: "Fast Foods",
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=1925&auto=format&fit=crop"
    },
    {
        id: 11,
        name: "Truffle Parm Tots",
        description: "Crispy tater tots with heavy truffle oil and parmesan rain",
        price: "$10.00",
        rating: "4.7",
        reviews: "185 Reviews",
        category: "Fast Foods",
        image: "https://images.unsplash.com/photo-1598449334812-33cc9cd6028a?q=80&w=2070&auto=format&fit=crop"
    },

    // DESSERTS
    {
        id: 3,
        name: "Velvet Cheesecake",
        description: "Madagascar vanilla bean with a sea salt graham cracker crust",
        price: "$9.00",
        rating: "4.7",
        reviews: "156 Reviews",
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 12,
        name: "Lava Cake",
        description: "70% dark chocolate souffle with a molten raspberry core",
        price: "$13.00",
        rating: "4.9",
        reviews: "280 Reviews",
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1617303026392-7f7226db796e?q=80&w=2024&auto=format&fit=crop"
    },
    {
        id: 13,
        name: "Saffron Panna Cotta",
        description: "Infused with Persian saffron and topped with honey glaze",
        price: "$11.00",
        rating: "4.8",
        reviews: "95 Reviews",
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 14,
        name: "Matcha Mochi Perle",
        description: "Ceremonial grade matcha with sweet red bean center",
        price: "$12.00",
        rating: "4.7",
        reviews: "112 Reviews",
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1582719202047-76d3432ee323?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 15,
        name: "Golden Churros",
        description: "Crisp fried dough dusted in cinnamon and 24k sugar",
        price: "$14.00",
        rating: "4.9",
        reviews: "205 Reviews",
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1581452445851-931105342203?q=80&w=2070&auto=format&fit=crop"
    }
];

const CATEGORIES = ["Fast Foods", "Mains", "Desserts"];

export default function FeaturedSection() {
    const [activeCategory, setActiveCategory] = useState("Mains");
    const [activeIndex, setActiveIndex] = useState(0);

    const filteredDishes = FEATURED_DISHES.filter(dish => dish.category === activeCategory);
    const count = filteredDishes.length;

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setActiveIndex(0);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % count);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + count) % count);
    };

    // Circular distance calculation for smooth sliding
    const getDistance = (index: number) => {
        let dist = index - activeIndex;
        if (Math.abs(dist) > count / 2) {
            dist = dist > 0 ? dist - count : dist + count;
        }
        return dist;
    };

    return (
        <section className="pt-24 pb-32 bg-background overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <div className="flex items-center gap-8 mb-16">
                    <div className="flex-1 h-[1.5px] bg-foreground" />
                    <h2 className="text-[48px] font-black font-serif uppercase tracking-[0.05em] text-foreground whitespace-nowrap">Featured Dishes</h2>
                    <div className="flex-1 h-[1.5px] bg-foreground" />
                </div>

                {/* Categories */}
                <div className="flex justify-center items-center gap-12 md:gap-16 mb-20 relative">
                    {CATEGORIES.map((cat, idx) => (
                        <React.Fragment key={cat}>
                            <div className="relative py-2">
                                <button
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`text-2xl font-bold transition-all duration-300 ${activeCategory === cat ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {cat}
                                </button>
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="categoryUnderline"
                                        className="absolute -bottom-2 left-0 right-0 h-1 bg-foreground rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </div>
                            {idx < CATEGORIES.length - 1 && (
                                <div className="w-px h-12 bg-border md:block hidden" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* 3D Swiping Carousel */}
                <div className="relative h-[650px] mb-16 flex items-center justify-center perspective-[2000px]">
                    <div className="relative w-full max-w-[450px] h-full flex items-center justify-center">
                        <AnimatePresence initial={false}>
                            {filteredDishes.map((dish, i) => {
                                const dist = getDistance(i);
                                const isVisible = Math.abs(dist) <= 1.5; // Show center and neighbors
                                const isCenter = Math.abs(dist) < 0.5;
                                const opacity = Math.abs(dist) > 1.5 ? 0 : 1 - Math.abs(dist) * 0.5;

                                return (
                                    <motion.div
                                        key={dish.id}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={(_, info) => {
                                            if (info.offset.x < -50) handleNext();
                                            else if (info.offset.x > 50) handlePrev();
                                        }}
                                        initial={false}
                                        animate={{
                                            x: dist * (window.innerWidth < 768 ? 220 : 380),
                                            scale: 1 - Math.abs(dist) * 0.2,
                                            rotateY: dist * 25,
                                            z: -Math.abs(dist) * 200,
                                            opacity: isVisible ? opacity : 0,
                                            zIndex: 10 - Math.abs(dist) * 10,
                                            pointerEvents: isCenter ? 'auto' : (Math.abs(dist) < 1.1 ? 'auto' : 'none')
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 30
                                        }}
                                        className="absolute w-full cursor-grab active:cursor-grabbing group"
                                        style={{
                                            display: isVisible ? 'block' : 'none'
                                        }}
                                        onClick={() => {
                                            if (dist < 0) handlePrev();
                                            else if (dist > 0) handleNext();
                                        }}
                                    >
                                        <div className="bg-muted rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 select-none">
                                            {/* Image */}
                                            <div className="relative h-80 overflow-hidden pointer-events-none">
                                                <img
                                                    src={dish.image}
                                                    alt={dish.name}
                                                    className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${isCenter ? '' : 'grayscale'}`}
                                                />
                                                {/* Rating Badge */}
                                                <div className="absolute top-6 right-6 bg-background rounded-full px-4 py-2 flex items-center gap-1 shadow-sm font-bold text-xl">
                                                    <Star className="w-5 h-5 fill-foreground" />
                                                    {dish.rating}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-10 text-center space-y-6 pointer-events-none bg-background">
                                                <h3 className="text-3xl font-black text-foreground leading-tight">{dish.name}</h3>
                                                <p className="text-muted-foreground text-sm leading-relaxed px-4 h-12 overflow-hidden">
                                                    {dish.description}
                                                </p>
                                                <div className="text-muted text-sm font-medium">
                                                    {dish.reviews}
                                                </div>
                                                <div className="text-4xl font-black text-foreground">
                                                    {dish.price}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Overlay for side cards */}
                                        {!isCenter && (
                                            <div className="absolute inset-0 bg-background/60 rounded-[40px] pointer-events-none transition-opacity duration-500" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-8 mt-12">
                    <div className="flex-1 h-[1.5px] bg-foreground" />
                    <Link
                        to="/menu"
                        className="px-10 py-4 border-2 border-foreground rounded-full font-bold text-xl hover:bg-foreground hover:text-background transition-all duration-300 transform hover:scale-105"
                    >
                        View Full Menu
                    </Link>
                    <div className="flex-1 h-[1.5px] bg-foreground" />
                </div>

            </div>
        </section>
    );
}
