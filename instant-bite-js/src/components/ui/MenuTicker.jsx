

export default function MenuTicker() {
    return (
        <div className="w-full bg-accent py-3 md:py-5 overflow-hidden flex border-y border-border">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            >
                {[...Array(8)].map((_, i) => (
                    <span key={i} className="text-white font-display font-bold text-2xl md:text-5xl uppercase mx-6 md:mx-12">
                        Seasonal • Organic • Premium • Instant •
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
