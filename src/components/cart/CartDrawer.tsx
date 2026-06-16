import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
    const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart, total } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    // Lock body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            };
        }
    }, [isCartOpen]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-background border-l border-border z-[70] flex flex-col shadow-2xl"
                    >

                        {/* Header */}
                        <div className="p-8 border-b border-border flex justify-between items-center bg-background/50 backdrop-blur-md">
                            <h2 className="font-display text-2xl font-bold uppercase tracking-tighter">
                                Your Selection
                            </h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-border rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div
                            data-lenis-prevent="true"
                            className="flex-1 overflow-y-auto p-8 space-y-6 [scrollbar-width:auto] [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-accent/50 [&::-webkit-scrollbar-track]:bg-transparent"
                        >
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted space-y-4">
                                    <span className="text-4xl">☹</span>
                                    <p className="font-sans text-sm tracking-widest uppercase">Cart is Empty</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex gap-4 p-4 border border-border bg-background/50 hover:border-accent/50 transition-colors"
                                    >
                                        {/* Item Image (Small) */}
                                        <div className="w-20 h-20 bg-muted/10 overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-display font-bold uppercase tracking-tight text-sm pr-2">{item.name}</h3>
                                                <span className="font-mono text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center gap-3 border border-border px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className={`p-1 transition-colors ${item.quantity === 1 ? 'text-red-400 hover:text-red-500' : 'text-muted hover:text-foreground'}`}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="text-muted hover:text-foreground p-1"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-muted hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-8 border-t border-border space-y-6 bg-background">
                                <div className="flex justify-between items-center font-display text-xl font-bold uppercase">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-accent text-white py-4 font-bold uppercase tracking-widest hover:bg-foreground transition-colors"
                                >
                                    Checkout
                                </button>
                                <p className="text-center font-sans text-[10px] text-muted uppercase tracking-widest">
                                    Shipping & Taxes Calculated at Checkout
                                </p>
                            </div>
                        )}

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
