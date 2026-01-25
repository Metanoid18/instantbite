
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import Magnetic from '../ui/Magnetic';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-foreground text-background pt-24 pb-12 px-6 md:px-12 border-t border-border">
            <div className="max-w-[1920px] mx-auto">

                {/* Top Section: Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24"
                >

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h2 className="font-serif text-2xl font-bold tracking-tight text-background uppercase">
                            INSTANT<span className="text-orange-600">BITE</span><sup className="text-[10px] ml-0.5">®</sup>
                        </h2>
                        <p className="font-sans text-xs text-muted/60 max-w-[200px] leading-relaxed">
                            REDEFINING FAST DINING THROUGH ARCHITECTURAL FLAVOR. EST. 2024.
                        </p>
                    </div>

                    {/* Sitemaps */}
                    <div className="space-y-6">
                        <h3 className="font-mono text-xs text-accent tracking-widest uppercase">Explore</h3>
                        <div className="flex flex-col gap-3 font-sans text-sm font-medium">
                            <Link to="/menu" className="hover:text-accent transition-colors">Menu</Link>
                            <Link to="/reserve" className="hover:text-accent transition-colors">Reservations</Link>
                            <Link to="/events" className="hover:text-accent transition-colors">Private Events</Link>
                            <Link to="/dna" className="hover:text-accent transition-colors">Our DNA</Link>
                            <Link to="/contact" className="hover:text-accent transition-colors">Locations</Link>
                        </div>
                    </div>

                    {/* Socials & Legal */}
                    <div className="space-y-6">
                        <h3 className="font-mono text-xs text-accent tracking-widest uppercase">Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
                        </div>
                        <div className="flex flex-col gap-3 font-sans text-sm font-medium mt-4">
                            <Link to="/legal" className="hover:text-accent transition-colors">Privacy Policy</Link>
                            <Link to="/legal" className="hover:text-accent transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h3 className="font-mono text-xs text-accent tracking-widest uppercase">The Digest</h3>
                        <p className="font-sans text-xs text-muted/60 leading-relaxed">
                            Join our closed-loop frequency. No spam, only flavor updates.
                        </p>
                        <div className="flex border-b border-muted/30 pb-2">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-muted/30 font-mono"
                            />
                            <Magnetic>
                                <button className="text-accent hover:text-white transition-colors p-2">
                                    <ArrowUpRight className="w-5 h-5" />
                                </button>
                            </Magnetic>
                        </div>
                    </div>

                </motion.div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-end border-t border-muted/20 pt-8">
                    <div className="font-['Cinzel'] text-[12vw] md:text-[8vw] leading-[0.8] font-black opacity-10 tracking-[0.01em] select-none">
                        INSTANT
                    </div>
                    <div className="flex justify-between w-full md:w-auto mt-4 md:mt-0 gap-8 fond-mono text-[10px] text-muted/40 uppercase tracking-widest">
                        <span>© {currentYear} INSTANT BITE GRP.</span>
                        <span>ALL RIGHTS RESERVED.</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
