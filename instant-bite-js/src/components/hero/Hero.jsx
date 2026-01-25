import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Magnetic from '../ui/Magnetic';
import { useLoading } from '../../context/LoadingContext';

export default function Hero() {
    const sectionRef = useRef(null);
    const { isLoading } = useLoading();
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const title1 = "CULINARY";
    const title2 = "PRECISION";

    const letterVariants = {
        initial: { y: 100, opacity: 0 },
        animate: (i) => ({
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }
        })
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-screen max-h-screen w-full flex flex-col justify-start pt-20 md:pt-24 overflow-hidden bg-background"
        >

            <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-[1720px] h-full flex flex-col">

                {/* Main Typography Header */}
                <div className="flex flex-col relative z-20 pointer-events-none mb-4 md:mb-10">
                    {/* Line 1: CULINARY */}
                    <div className="flex overflow-hidden relative leading-none">
                        {title1.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                initial="initial"
                                animate={isLoading ? "initial" : "animate"}
                                className="font-serif text-[11vw] md:text-[9.5vw] leading-[0.8] font-black uppercase tracking-[0.01em] text-foreground"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>

                    {/* Line 2: PRECISION (Outline) - Indented with Line */}
                    <div className="flex items-center relative pl-[26vw]">
                        {/* Orange Line - Positioned before Precision */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isLoading ? 0 : "24vw" }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="h-[2px] md:h-[4px] bg-orange-600 mr-4 md:mr-8 absolute left-0"
                        />

                        <div className="flex overflow-hidden leading-none">
                            {title2.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    custom={i + title1.length}
                                    variants={letterVariants}
                                    initial="initial"
                                    animate={isLoading ? "initial" : "animate"}
                                    className="font-serif text-[11vw] md:text-[9.5vw] leading-[0.8] font-black uppercase tracking-[0.01em] text-transparent stroke-text"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start relative z-30 flex-1 pb-4">

                    {/* Left Column: Text & CTA */}
                    <motion.div
                        style={{ y: textY, opacity: scrollOpacity }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isLoading ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="col-span-1 md:col-span-5 space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                                Order And We’ll Get It<br />
                                Delivered Instantly!
                            </h2>

                            {/* Stats */}
                            <div className="flex gap-12 mb-8">
                                <div>
                                    <div className="text-3xl font-black mb-1">500+</div>
                                    <div className="text-sm font-medium text-muted-foreground">Happy Customers</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black mb-1">50+</div>
                                    <div className="text-sm font-medium text-muted-foreground">Menu Items</div>
                                </div>
                            </div>

                            {/* Technical Text & CTA Grouping - Repositioned */}
                            <div className="space-y-4">
                                <div className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] font-bold">
                                    [ REF_NODE_24 ] // TOKYO_LONDON_VOID
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-12 pt-4">
                                    <p className="text-[11px] md:text-xs text-muted-foreground w-full md:w-[55%] leading-relaxed">
                                        Redefining The Fast Casual<br />
                                        Landscape Through Molecular<br />
                                        Structure And Architectural Flavor<br />
                                        Profiles.
                                    </p>

                                    {/* Button Positioned between Paragraph and Image */}
                                    <div className="md:ml-auto md:translate-x-20">
                                        <Magnetic>
                                            <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-[10px] tracking-widest hover:bg-orange-600 transition-colors uppercase whitespace-nowrap">
                                                Dine With Us
                                            </button>
                                        </Magnetic>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <div className="col-span-1 md:col-span-7 relative">
                        {/* Image Container - Floating/Overlapping */}
                        <motion.div
                            style={{ y: imageY }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isLoading ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full aspect-[4/3] md:-mt-32 md:ml-12"
                        >
                            <img
                                src="/hero-dish.jpg"
                                className="object-contain w-full h-full drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
                                alt="Signature Ribs"
                            />
                        </motion.div>
                    </div>
                </div>

            </div>
        </section >
    );
}
