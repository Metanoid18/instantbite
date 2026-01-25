
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Magnetic from '../ui/Magnetic';

export default function MenuItem({ item, index }) {
    const { addToCart } = useCart();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-background border-2 border-border overflow-hidden hover:border-accent transition-colors duration-300 rounded-2xl"
        >
            {/* Image Area */}
            <div className="aspect-[4/3] overflow-hidden relative rounded-t-2xl">
                <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
                />

                {/* Quick Add Button */}
                <div className="absolute bottom-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Magnetic>
                        <button
                            onClick={() => addToCart(item)}
                            className="bg-accent text-white p-3 rounded-full hover:scale-110 transition-transform"
                            aria-label="Add to Cart"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </Magnetic>
                </div>

                {/* Tags */}
                {item.tags && (
                    <div className="absolute top-4 left-4 flex gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="bg-background/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-border">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Info Area */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-bold uppercase tracking-tight group-hover:text-accent transition-colors">
                        {item.name}
                    </h3>
                    <span className="font-mono text-sm">${item.price}</span>
                </div>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4">
                    {item.description}
                </p>
                <div className="w-full h-px bg-border group-hover:bg-accent/20 transition-colors" />
            </div>
        </motion.div>
    );
}
