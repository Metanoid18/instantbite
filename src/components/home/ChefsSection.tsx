import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CHEFS = [
    { id: 1, name: "Dr. Aris Thorne", role: "Head of R&D", image: "/chefs/chef1.png" },
    { id: 2, name: "Elena Vance", role: "Molecular Architect", image: "/chefs/chef2.png" },
    { id: 3, name: "Marcus Sterling", role: "Precision Specialist", image: "/chefs/chef3.png" },
    { id: 4, name: "Sato Yuki", role: "Flavor Engineer", image: "/chefs/chef4.png" },
    { id: 5, name: "Dr. Aris Thorne", role: "Head of R&D", image: "/chefs/chef1.png" },
    { id: 6, name: "Elena Vance", role: "Molecular Architect", image: "/chefs/chef2.png" },
    { id: 7, name: "Marcus Sterling", role: "Precision Specialist", image: "/chefs/chef3.png" },
    { id: 8, name: "Sato Yuki", role: "Flavor Engineer", image: "/chefs/chef4.png" },
];

export default function ChefsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const newScale = width / 1440;
            setScale(newScale);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextChef = () => {
        if (currentIndex < CHEFS.length - 3) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevChef = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Frame positions from user spec
    const cardWidth = 350;
    const cardHeight = 450;
    const gutter = 61;

    return (
        <section
            ref={containerRef}
            className="relative bg-background overflow-hidden"
            style={{ height: `${900 * scale}px` }}
        >
            <div
                className="absolute left-1/2 top-0 origin-top -translate-x-1/2"
                style={{
                    width: '1440px',
                    height: '900px',
                    transform: `translateX(-50%) scale(${scale})`
                }}
            >
                {/* Heading: Meet our chefs */}
                <div
                    className="absolute flex flex-col font-serif font-black justify-center leading-none left-[134px] not-italic text-[48px] text-foreground text-nowrap top-[182px] -translate-y-1/2 z-20"
                >
                    <p className="font-serif uppercase tracking-[0.05em]">Meet our chefs</p>
                </div>

                {/* Chef Profile Grid / Carousel Window */}
                <div
                    className="absolute left-[134px] top-[267px] overflow-hidden"
                    style={{ width: '1172px', height: '450px' }} // Spans from 134 to 1306
                >
                    <motion.div
                        className="flex gap-[61px] absolute left-0 top-0"
                        animate={{ x: -(currentIndex * (cardWidth + gutter)) }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    >
                        {CHEFS.map((chef) => (
                            <div
                                key={chef.id}
                                className="flex-shrink-0 rounded-[25px] overflow-hidden bg-muted group relative"
                                style={{
                                    width: `${cardWidth}px`,
                                    height: `${cardHeight}px`
                                }}
                            >
                                <img
                                    src={chef.image}
                                    alt={chef.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Info Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <h4 className="font-serif text-white text-3xl mb-1">{chef.name}</h4>
                                    <p className="font-mono text-accent text-xs uppercase tracking-[0.2em]">{chef.role}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Navigation Chevrons */}
                <button
                    onClick={prevChef}
                    disabled={currentIndex === 0}
                    className="absolute left-[40px] top-[492px] -translate-y-1/2 group transition-all disabled:opacity-20 z-30"
                >
                    <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors">
                        <ChevronLeft className="w-10 h-10 text-foreground group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    </div>
                </button>

                <button
                    onClick={nextChef}
                    disabled={currentIndex >= CHEFS.length - 3}
                    className="absolute right-[40px] top-[492px] -translate-y-1/2 group transition-all disabled:opacity-20 z-30"
                >
                    <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors">
                        <ChevronRight className="w-10 h-10 text-foreground group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    </div>
                </button>
            </div>
        </section>
    );
}
