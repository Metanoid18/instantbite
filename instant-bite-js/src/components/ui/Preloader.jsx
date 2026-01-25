import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLoading } from '../../context/LoadingContext';

export default function Preloader() {
    const { setIsLoading } = useLoading();
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!isVisible) {
            setIsLoading(false);
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVisible, setIsLoading]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsVisible(false), 400);
                    return 100;
                }
                return prev + 1;
            });
        }, 15);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center p-12 overflow-hidden"
                >
                    {/* Background Grid Accent */}
                    <div className="absolute inset-0 bg-grid-pattern bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] opacity-10" />

                    {/* Molecular Ring Animation */}
                    <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-accent/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border border-border rounded-full"
                        />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            className="w-4 h-4 bg-accent rounded-full shadow-[0_0_20px_rgba(255,59,48,0.5)]"
                        />

                        {/* Orbital Dots */}
                        {[0, 90, 180, 270].map((angle, i) => (
                            <motion.div
                                key={i}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                                style={{ transform: `rotate(${angle}deg)` }}
                            >
                                <div className="absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-foreground rounded-full" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative text-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4"
                        >
                            Instant<span className="text-accent">Bite</span>®
                        </motion.div>

                        <div className="flex items-center justify-center gap-4 overflow-hidden h-6">
                            <motion.div
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                className="font-mono text-[10px] tracking-[0.5em] text-muted overflow-hidden"
                            >
                                MOLECULAR_INIT / {progress.toString().padStart(3, '0')}%
                            </motion.div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-64 h-[1px] bg-border mt-8 relative overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="absolute inset-y-0 left-0 bg-accent"
                            />
                        </div>
                    </div>

                    {/* Footer Marker */}
                    <div className="absolute bottom-12 font-mono text-[8px] tracking-widest text-muted/30">
                        SYSTEM_STATUS: NOMINAL // VERSION_2.4.0
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
