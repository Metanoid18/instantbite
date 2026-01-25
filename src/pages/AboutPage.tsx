import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';

export default function AboutPage() {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto min-h-screen">

                {/* Hero / Philosophy Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
                    <div className="lg:col-span-7">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-mono text-xs tracking-[0.4em] text-orange-600 block mb-4 uppercase"
                        >
                            [ Origin_Node // 0.0.1 ]
                        </motion.span>
                        <h1 className="font-serif text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Culinary <br />
                            <span className="stroke-text italic">Precision</span>
                        </h1>
                        <p className="font-sans text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                            Instant Bite is not just a restaurant; it is a gastronomic laboratory where architectural principles meet molecular science. We redefine the fast-casual landscape through tectonic flavor profiles and structural integrity.
                        </p>
                    </div>
                    <div className="lg:col-span-12 h-px bg-border my-8" />
                </div>

                {/* Core Philosophy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 border-l-2 border-orange-600 bg-accent/5 space-y-4"
                    >
                        <h3 className="font-serif text-3xl font-bold uppercase tracking-tight">The Lab</h3>
                        <p className="font-sans text-muted-foreground leading-relaxed">
                            Our kitchens are clinical environments engineered for absolute consistency. Every dish is a prototype, refined through hundreds of iterations to achieve gastric perfection.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-8 border-l-2 border-orange-600 bg-accent/5 space-y-4"
                    >
                        <h3 className="font-serif text-3xl font-bold uppercase tracking-tight">Molecular</h3>
                        <p className="font-sans text-muted-foreground leading-relaxed">
                            We analyze flavor at the atomic level. By manipulating textural density and thermal variance, we create sensory experiences that transcend traditional cooking.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-8 border-l-2 border-orange-600 bg-accent/5 space-y-4"
                    >
                        <h3 className="font-serif text-3xl font-bold uppercase tracking-tight">Tectonic</h3>
                        <p className="font-sans text-muted-foreground leading-relaxed">
                            Plating is an architectural challenge. We build vertically, ensuring that every layer provides structural support and essential flavor contrast.
                        </p>
                    </motion.div>
                </div>

                {/* The Team / Narrative Section */}
                <div className="relative mb-32 overflow-hidden rounded-[2rem] border-2 border-black bg-black text-white p-12 md:p-24">
                    <div className="relative z-10 max-w-4xl">
                        <h2 className="font-serif text-5xl md:text-7xl font-black uppercase mb-12 italic">
                            The Architect of <span className="text-orange-600">Flavor</span>
                        </h2>
                        <div className="space-y-8 font-sans text-lg md:text-xl opacity-80 leading-relaxed">
                            <p>
                                Founded by Dr. Aris Thorne, a former structural engineer turned molecular gastonomist, Instant Bite emerged from the desire to eliminate the variance of human error from the culinary process.
                            </p>
                            <p>
                                "A burger should be as structurally sound as a skyscraper," Thorne famously stated. "At Instant Bite, we don't cook—we assemble protocols for the future of human consumption."
                            </p>
                        </div>

                        <div className="mt-16 flex flex-wrap gap-8 items-center">
                            <div className="flex flex-col">
                                <span className="font-serif text-4xl font-bold">128</span>
                                <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">Protocols Active</span>
                            </div>
                            <div className="w-px h-12 bg-white/20" />
                            <div className="flex flex-col">
                                <span className="font-serif text-4xl font-bold">0.03ms</span>
                                <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">Flavor Activation</span>
                            </div>
                            <div className="w-px h-12 bg-white/20" />
                            <div className="flex flex-col">
                                <span className="font-serif text-4xl font-bold">Infinite</span>
                                <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">Architectural Depth</span>
                            </div>
                        </div>
                    </div>

                    {/* Background Graphic Element */}
                    <div className="absolute right-[-10%] bottom-[-10%] opacity-10 pointer-events-none">
                        <svg width="800" height="800" viewBox="0 0 500 500">
                            <circle cx="250" cy="250" r="200" stroke="white" strokeWidth="1" fill="none" />
                            <path d="M250 50 V450 M50 250 H450" stroke="white" strokeWidth="1" />
                            <rect x="150" y="150" width="200" height="200" stroke="white" strokeWidth="1" fill="none" />
                        </svg>
                    </div>
                </div>

                {/* Technical Coordinates Section (Standardised) */}
                <div className="flex flex-col md:flex-row justify-between items-center py-20 border-t border-border gap-12">
                    <div className="text-center md:text-left">
                        <h4 className="font-serif text-3xl font-bold uppercase mb-4">Vocal Link</h4>
                        <p className="font-mono text-xl opacity-60">+1 (555) 0110-0011</p>
                    </div>
                    <div className="text-center md:text-left">
                        <h4 className="font-serif text-3xl font-bold uppercase mb-4">Digital Protocol</h4>
                        <p className="font-mono text-xl opacity-60">signal@instantbite.void</p>
                    </div>
                    <div className="text-center md:text-left">
                        <h4 className="font-serif text-3xl font-bold uppercase mb-4">Coordinates</h4>
                        <p className="font-mono text-xl opacity-60">37.4275° N, 122.1697° W</p>
                    </div>
                </div>

            </div>
        </PageTransition>
    );
}
