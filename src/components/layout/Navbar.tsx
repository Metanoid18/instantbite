import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLoading } from '../../context/LoadingContext';

export default function Navbar() {
    const { toggleCart, cart } = useCart();
    const location = useLocation();
    const { isLoading } = useLoading();
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const links = [
        { name: 'Menu', path: '/menu' },
        { name: 'Reservations', path: '/reserve' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Blog', path: '/blog' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={isLoading ? { y: -100 } : { y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? "border-b border-border bg-background/80 backdrop-blur-md py-4"
                : "bg-transparent py-4"
                }`}>
            <div className="flex justify-between items-center px-6 md:px-12 max-w-[1920px] mx-auto min-h-[64px]">

                {/* Logo Area */}
                <Link
                    to="/"
                    className="flex items-center gap-2 group"
                >
                    {/* SVG Logo */}
                    {/* SVG Icon: Authentic Replica (12 Dots, Split Arc) */}
                    <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="iconGradient" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#EA580C" />
                                <stop offset="100%" stopColor="#0F172A" />
                            </linearGradient>
                        </defs>

                        {/* Main Arc (Plate/Gauge) - Smooth Gradient */}
                        <path
                            d="M10 38C6 34 4 28 5 20C7 10 16 4 25 4C34 4 43 10 45 20C46 28 44 34 40 38"
                            stroke="url(#iconGradient)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />

                        {/* Fork Needle - sleek & centered */}
                        <path
                            d="M25 32L36 19"
                            stroke="#EA580C"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                        {/* Needle Tines - Simplified */}
                        <path d="M36 19L39 16" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
                        <path d="M35 20L38 17" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />

                        {/* Center Pivot */}
                        <circle cx="25" cy="32" r="3" fill="#0F172A" />

                        {/* Ticks: Subtle 3/6/9/12 hints */}
                        <path d="M25 8V10" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                        <path d="M41 24H39" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                        <path d="M9 24H11" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

                    </svg>

                    <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
                        INSTANT<span className="text-orange-600">BITE</span>
                    </span>
                </Link>

                {/* Desktop Links (Centered) */}
                <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {links.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-sm font-medium transition-colors hover:text-orange-600 ${location.pathname === item.path ? 'text-foreground' : 'text-muted-foreground'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Action Area */}
                <div className="flex items-center gap-6">
                    {/* Search Button */}
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-orange-600 transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-orange-600 transition-colors"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Search</span>
                    </button>

                    {/* Cart Trigger */}
                    <button
                        onClick={toggleCart}
                        className="relative p-1 hover:text-orange-600 transition-colors"
                        aria-label="Shopping Cart"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <AnimatePresence>
                            {itemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center leading-none"
                                >
                                    {itemCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Mobile Menu Trigger */}
                    <button className="lg:hidden p-1 text-foreground hover:text-orange-600">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
