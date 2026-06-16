import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';

export default function DnaPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    return (
        <PageTransition>
            <div ref={containerRef} className="relative">

                {/* Intro Section */}
                <section className="h-screen flex items-center justify-center sticky top-0 overflow-hidden">
                    <motion.div style={{ opacity, scale }} className="text-center px-6">
                        <h1 className="font-serif text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6">
                            Origin <span className="text-accent">Story</span>
                        </h1>
                        <p className="font-sans text-sm md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                            BORN IN THE PARTICLE ACCELERATOR. PLATED IN THE VACUUM.
                        </p>
                    </motion.div>
                </section>

                {/* Content Stream */}
                <div className="relative z-10 bg-foreground text-background min-h-screen py-32 px-6 md:px-24">
                    <div className="max-w-4xl mx-auto space-y-32">

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="font-mono text-accent text-xs tracking-widest">01. THE CONCEPT</span>
                            <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase">Speed is a Flavor</h2>
                            <p className="font-sans text-background/70 text-lg leading-relaxed">
                                We challenged the notion that fast food must be low quality. By leveraging cryo-cooking techniques, we deliver Michelin-star textures in 45 seconds.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="font-mono text-accent text-xs tracking-widest">02. THE SUSTAINABILITY</span>
                            <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase">Zero Waste Arch</h2>
                            <p className="font-sans text-background/70 text-lg leading-relaxed">
                                Every ingredient is utilized. Skins become dusts. Stems become oils. We operate on a closed-loop molecular system that respects the atom.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="font-mono text-accent text-xs tracking-widest">03. THE FUTURE</span>
                            <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase">Beyond Biology</h2>
                            <p className="font-sans text-background/70 text-lg leading-relaxed">
                                Our R&D lab is currently testing sound-frequency flavor modulation. The future of dining isn't just about taste—it's about frequency.
                            </p>
                        </motion.div>

                    </div>
                </div>

            </div>
        </PageTransition>
    );
}
