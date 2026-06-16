import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function ReservePage() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        guests: 2,
        date: '',
        time: '',
        name: '',
        email: ''
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim()) {
            addToast('Please fill in all required fields', 'error');
            return;
        }
        setIsSubmitting(true);
        // Mock API delay
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1800);
    };

    if (isSuccess) {
        return (
            <PageTransition>
                <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        className="w-24 h-24 rounded-full bg-orange-600 flex items-center justify-center text-white mb-10"
                    >
                        <CheckCircle className="w-12 h-12" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4 max-w-lg"
                    >
                        <span className="font-mono text-xs tracking-[0.3em] text-orange-600 block uppercase">Reservation Confirmed</span>
                        <h1 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tighter">
                            Ritual Locked
                        </h1>
                        <p className="font-sans text-muted-foreground leading-relaxed">
                            A confirmation signal has been dispatched to your frequency. We'll see you at the table,{' '}
                            <span className="font-bold text-foreground">{formData.name}</span>.
                        </p>
                        <div className="flex flex-wrap gap-6 justify-center pt-4 font-mono text-xs text-muted-foreground">
                            {formData.date && <span>DATE: {formData.date}</span>}
                            {formData.time && <span>TIME: {formData.time}</span>}
                            <span>GUESTS: {formData.guests}</span>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12"
                    >
                        <Link
                            to="/"
                            className="bg-foreground text-background px-10 py-4 font-bold uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-colors"
                        >
                            Return to Index
                        </Link>
                    </motion.div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="pt-40 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
                {/* Background Drafting Lines */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
                    <div className="absolute left-[20%] top-0 bottom-0 w-px bg-foreground" />
                    <div className="absolute left-[80%] top-0 bottom-0 w-px bg-foreground" />
                </div>

                {/* Progress Header */}
                <div className="relative z-10 mb-20">
                    <div className="flex items-end justify-between border-b-2 border-foreground pb-8">
                        <div>
                            <span className="font-mono text-xs tracking-[0.3em] text-orange-600 block mb-2">[ OPS_CORE // RESERVATION_PROTOCOL ]</span>
                            <h1 className="font-serif text-6xl md:text-8xl font-black uppercase tracking-tighter">
                                The <span className="italic">Ritual</span>
                            </h1>
                        </div>
                        <div className="text-right">
                            <span className="font-serif text-8xl md:text-[120px] font-black leading-none opacity-10">0{step}</span>
                        </div>
                    </div>
                    {/* Linear Progress */}
                    <div className="w-full bg-foreground/5 h-[2px] mt-4 relative">
                        <motion.div
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.4 }}
                            className="absolute left-0 top-0 h-full bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                        />
                    </div>
                </div>

                <div className="relative z-10 max-w-2xl">
                    <AnimatePresence mode='wait'>
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="space-y-4">
                                    <h2 className="font-mono text-xs tracking-widest text-orange-600 uppercase">Step_01 // Magnitude</h2>
                                    <p className="font-serif text-3xl font-bold">Select the number of participants in the culinary sequence.</p>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
                                        <button
                                            key={num}
                                            onClick={() => setFormData({ ...formData, guests: num })}
                                            className={`w-16 h-16 border-2 flex items-center justify-center font-serif text-2xl transition-all duration-300 ${formData.guests === num
                                                ? 'bg-foreground text-background border-foreground scale-110 shadow-xl'
                                                : 'border-border hover:border-foreground'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-border">
                                    <button onClick={nextStep} className="group relative bg-foreground text-background px-12 py-5 font-bold uppercase tracking-[0.2em] overflow-hidden">
                                        <span className="relative z-10">Initialize Sequence</span>
                                        <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="space-y-4">
                                    <h2 className="font-mono text-xs tracking-widest text-orange-600 uppercase">Step_02 // Temporal_Node</h2>
                                    <p className="font-serif text-3xl font-bold">Coordinate the date for structural immersion.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-2">
                                        <label className="font-mono text-[10px] uppercase opacity-40">Calendar_Ref</label>
                                        <input
                                            type="date"
                                            className="w-full bg-transparent border-b-2 border-foreground py-4 font-mono text-xl focus:outline-none focus:border-orange-600 transition-colors"
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-mono text-[10px] uppercase opacity-40">Atomic_Time</label>
                                        <select
                                            className="w-full bg-transparent border-b-2 border-foreground py-4 font-mono text-xl focus:outline-none focus:border-orange-600 transition-colors appearance-none"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        >
                                            <option value="">SELECT TIME</option>
                                            <option value="18:00">18:00</option>
                                            <option value="19:30">19:30</option>
                                            <option value="21:00">21:00</option>
                                            <option value="22:30">22:30</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-8 flex items-center gap-8 border-t border-border">
                                    <button
                                        onClick={prevStep}
                                        className="font-mono text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                                    >
                                        [ REVERT_STEP ]
                                    </button>
                                    <button onClick={nextStep} className="group relative bg-foreground text-background px-12 py-5 font-bold uppercase tracking-[0.2em] overflow-hidden">
                                        <span className="relative z-10">Confirm Temporal Node</span>
                                        <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="space-y-4">
                                    <h2 className="font-mono text-xs tracking-widest text-orange-600 uppercase">Step_03 // Entity_Validation</h2>
                                    <p className="font-serif text-3xl font-bold">Provide access credentials to finalize the ritual.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="font-mono text-[10px] uppercase opacity-40">Primary_Entity_Name *</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="ENTER FULL NAME"
                                            value={formData.name}
                                            className="w-full bg-transparent border-b-2 border-foreground py-4 font-mono text-xl focus:outline-none focus:border-orange-600 transition-colors placeholder:opacity-20 uppercase"
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-mono text-[10px] uppercase opacity-40">Digital_Frequency *</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="ENTER EMAIL ADDRESS"
                                            value={formData.email}
                                            className="w-full bg-transparent border-b-2 border-foreground py-4 font-mono text-xl focus:outline-none focus:border-orange-600 transition-colors placeholder:opacity-20 uppercase"
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-8 flex items-center gap-8 border-t border-border">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="font-mono text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                                        >
                                            [ REVERT_STEP ]
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group relative bg-orange-600 text-white px-12 py-5 font-bold uppercase tracking-[0.2em] overflow-hidden w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            <span className="relative z-10">
                                                {isSubmitting ? 'Executing...' : 'Execute Reservation'}
                                            </span>
                                            <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PageTransition>
    );
}
