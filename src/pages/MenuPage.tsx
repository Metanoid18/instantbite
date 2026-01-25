import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import MenuItem from '../components/menu/MenuItem';
import { MENU_ITEMS, type Category, type MenuItem as MenuItemType } from '../data/menu';

const CATEGORIES: Category[] = ['Starters', 'Mains', 'Architectural', 'Drinks'];

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

    const filteredItems: MenuItemType[] = activeCategory === 'All'
        ? MENU_ITEMS
        : MENU_ITEMS.filter(item => item.category === activeCategory);

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto min-h-screen">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-8">
                    <h1 className="font-serif text-5xl md:text-8xl font-black uppercase tracking-tighter relative z-10">
                        The <span className="stroke-text">Index</span>
                    </h1>
                    <p className="font-sans text-xs md:text-sm text-muted max-w-md text-right mt-4 md:mt-0">
                        A CURATED SELECTION OF MOLECULAR GASTRONOMY DESIGNED FOR INSTANT CONSUMPTION.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-4 md:gap-8 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`font-sans text-xs font-bold uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${activeCategory === 'All' ? 'text-accent' : 'text-muted hover:text-foreground'
                            }`}
                    >
                        [ ALL ]
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`font-sans text-xs font-bold uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${activeCategory === cat ? 'text-accent' : 'text-muted hover:text-foreground'
                                }`}
                        >
                            [ {cat} ]
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map((item: MenuItemType, i: number) => (
                            <MenuItem key={item.id} item={item} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </PageTransition>
    );
}
