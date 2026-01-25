import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
    {
        quote: "The architectural precision of every dish is mind-blowing. It's not just food, it's a structural experience.",
        author: "Sarah Jenkins",
        role: "Design Lead"
    },
    {
        quote: "I've never seen such a bold intersection of technology and culinary arts. The speed is truly terrifying.",
        author: "Marcus Voon",
        role: "Tech Critic"
    },
    {
        quote: "Strips away the pretense and leaves only raw, architectural perfection. A vision of the future.",
        author: "Elena Rossi",
        role: "Culinary Architect"
    },
    {
        quote: "Every bite feels calculated, yet emotionally resonant. The molecular structure of their steak is a masterpiece.",
        author: "Julian Thorne",
        role: "Food Scientist"
    },
    {
        quote: "The minimalism of the space is reflected in the purity of the flavors. Instant Bite is a masterclass in focus.",
        author: "Aria Vance",
        role: "Interior Designer"
    },
    {
        quote: "A tectonic shift in the fast-casual landscape. The flavor profiles are built with incredible geometric intent.",
        author: "Leo Sterling",
        role: "Gastronomy Critic"
    }
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

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

    const nextTestimonial = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const prevTestimonial = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    const Y_OFFSET = 2087.5;

    // Variants for the swiping animation
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    return (
        <section
            ref={containerRef}
            className="relative bg-background overflow-hidden"
            style={{ height: `${600 * scale}px` }}
        >
            <div
                className="absolute left-1/2 top-0 origin-top -translate-x-1/2"
                style={{
                    width: '1440px',
                    height: '600px',
                    transform: `translateX(-50%) scale(${scale})`
                }}
            >
                {/* Section Header */}
                <div
                    className="absolute flex flex-col font-serif font-black justify-center leading-none left-1/2 not-italic text-[48px] text-foreground text-center text-nowrap translate-x-[-50%] translate-y-[-50%] z-20"
                    style={{ top: `${2101 - Y_OFFSET + 50}px` }}
                >
                    <p className="leading-[1.2] font-serif uppercase tracking-[0.05em]">What our customers say</p>
                </div>

                {/* 1. Permanent SVG Frames (Static) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Left Frame */}
                    <div className="absolute" style={{ left: '82px', top: `${2101 - Y_OFFSET + 50}px`, width: '484.5px', height: '398px' }}>
                        <svg width="100%" height="100%" viewBox="0 0 485 399" fill="none">
                            <path
                                d="M485 398.5H31.5C14.3792 398.5 0.5 384.621 0.5 367.5V31.5C0.5 14.3792 14.3792 0.5 31.5 0.5H220"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>

                    {/* Right Frame */}
                    <div className="absolute" style={{ left: '885px', top: `${2101 - Y_OFFSET + 50}px`, width: '476px', height: '398px' }}>
                        <svg width="100%" height="100%" viewBox="0 0 476.5 399" fill="none">
                            <path
                                d="M0 398.5H445C462.121 398.5 476 384.621 476 367.5V31.5C476 14.3792 462.121 0.5 445 0.5H250"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                </div>

                {/* 2. Testimonial Content Blocks with clipping */}
                <div className="absolute inset-0 z-10">

                    {/* Left Slot Container */}
                    <div
                        className="absolute overflow-hidden"
                        style={{
                            left: '122px',
                            top: `${2101 - Y_OFFSET + 110}px`,
                            width: '400px',
                            height: '300px'
                        }}
                    >
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute inset-0 flex flex-col justify-center pr-12 select-none"
                            >
                                <p className="text-lg font-medium leading-relaxed italic text-foreground">
                                    "{TESTIMONIALS[activeIndex].quote}"
                                </p>
                                <span className="mt-4 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                                    — {TESTIMONIALS[activeIndex].author} // {TESTIMONIALS[activeIndex].role}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Center Slot Container */}
                    <div
                        className="absolute overflow-hidden"
                        style={{
                            left: '570px',
                            top: `${2101 - Y_OFFSET + 110}px`, // Aligned with side slots
                            width: '300px',
                            height: '300px'
                        }}
                    >
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 }}
                                className="absolute inset-0 flex flex-col justify-center text-center px-4 select-none"
                            >
                                <p className="text-lg font-medium leading-relaxed italic text-foreground">
                                    "{TESTIMONIALS[(activeIndex + 1) % TESTIMONIALS.length].quote}"
                                </p>
                                <span className="mt-4 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                                    — {TESTIMONIALS[(activeIndex + 1) % TESTIMONIALS.length].author} // {TESTIMONIALS[(activeIndex + 1) % TESTIMONIALS.length].role}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Slot Container */}
                    <div
                        className="absolute overflow-hidden"
                        style={{
                            left: '925px',
                            top: `${2101 - Y_OFFSET + 110}px`,
                            width: '400px',
                            height: '300px'
                        }}
                    >
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
                                className="absolute inset-0 flex flex-col justify-center pl-8 pr-12 select-none"
                            >
                                <p className="text-lg font-medium leading-relaxed italic text-foreground">
                                    "{TESTIMONIALS[(activeIndex + 2) % TESTIMONIALS.length].quote}"
                                </p>
                                <span className="mt-4 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                                    — {TESTIMONIALS[(activeIndex + 2) % TESTIMONIALS.length].author} // {TESTIMONIALS[(activeIndex + 2) % TESTIMONIALS.length].role}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* 3. Navigation Buttons (Arrows) */}
                <button
                    onClick={prevTestimonial}
                    className="absolute group transition-transform hover:scale-110 active:scale-95 outline-none z-30 flex items-center justify-center rounded-full bg-neutral-100 border border-transparent hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgb(var(--accent)/0.4)] transition-all duration-300"
                    style={{ left: '609px', top: `${2454 - Y_OFFSET + 50}px`, width: '90px', height: '90px' }}
                >
                    <ChevronLeft className="w-8 h-8 text-foreground group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
                </button>

                <button
                    onClick={nextTestimonial}
                    className="absolute group transition-transform hover:scale-110 active:scale-95 outline-none z-30 flex items-center justify-center rounded-full bg-neutral-100 border border-transparent hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgb(var(--accent)/0.4)] transition-all duration-300"
                    style={{ left: '761px', top: `${2454 - Y_OFFSET + 50}px`, width: '90px', height: '90px' }}
                >
                    <ChevronRight className="w-8 h-8 text-foreground group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
                </button>
            </div>
        </section>
    );
}
