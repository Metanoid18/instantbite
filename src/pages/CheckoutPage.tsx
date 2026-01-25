import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';

export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Mock API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <PageTransition>
                <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white mb-8"
                    >
                        <CheckCircle className="w-12 h-12" />
                    </motion.div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold uppercase mb-4">Order Confirmed</h1>
                    <p className="font-sans text-muted max-w-md mb-8">
                        Your transaction has been mined. Kitchen nodes are now compiling your meal.
                    </p>
                    <Link to="/" className="bg-foreground text-background px-8 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                        Return to Index
                    </Link>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto min-h-screen">
                <Breadcrumbs />
                <h1 className="font-serif text-4xl md:text-6xl font-bold uppercase mb-12">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Form */}
                    <div className="flex-1">
                        <form onSubmit={handleCheckout} className="space-y-12">

                            <div className="space-y-6">
                                <h2 className="font-serif text-xl uppercase border-b border-border pb-4">Shipping Data</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input required type="text" placeholder="FIRST NAME" className="bg-transparent border border-border p-4 font-mono text-sm focus:border-accent outline-none" />
                                    <input required type="text" placeholder="LAST NAME" className="bg-transparent border border-border p-4 font-mono text-sm focus:border-accent outline-none" />
                                    <input required type="email" placeholder="EMAIL" className="bg-transparent border border-border p-4 font-mono text-sm focus:border-accent outline-none col-span-1 md:col-span-2" />
                                    <input required type="text" placeholder="ADDRESS" className="bg-transparent border border-border p-4 font-mono text-sm focus:border-accent outline-none col-span-1 md:col-span-2" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="font-serif text-xl uppercase border-b border-border pb-4">Payment Method</h2>
                                <div className="bg-muted/5 border border-border p-6 rounded relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-8">
                                        <span className="font-mono text-sm text-muted">CREDIT CARD</span>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-5 bg-foreground rounded-sm" />
                                            <div className="w-8 h-5 bg-muted rounded-sm" />
                                        </div>
                                    </div>
                                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border-b border-border py-2 font-mono text-xl mb-6 outline-none" />
                                    <div className="flex gap-6">
                                        <input required type="text" placeholder="MM/YY" className="w-24 bg-transparent border-b border-border py-2 font-mono text-sm outline-none" />
                                        <input required type="text" placeholder="CVC" className="w-24 bg-transparent border-b border-border py-2 font-mono text-sm outline-none" />
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={isProcessing || cart.length === 0}
                                className="w-full bg-accent text-white py-6 font-bold uppercase tracking-widest hover:bg-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {isProcessing ? 'Processing Transaction...' : `Pay $${total}`}
                            </button>

                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-96 space-y-8">
                        <h2 className="font-serif text-xl uppercase border-b border-border pb-4">Summary</h2>
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between font-sans text-sm">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span className="font-mono">${item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-border pt-4 flex justify-between font-serif text-xl font-bold">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                    </div>

                </div>
            </div>
        </PageTransition>
    );
}
