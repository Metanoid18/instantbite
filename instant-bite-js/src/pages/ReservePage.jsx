import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';

export default function ReservePage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        guests: 2,
        date: '',
        time: '',
        name: '',
        email: ''
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return (
        <PageTransition>
            <div className="pt-40 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
                {/* Background Drafting Lines */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
                    <div className="absolute left-[20%] top-0 bottom-0 w-px bg-black" />
                    <div className="absolute left-[80%] top-0 bottom-0 w-px bg-black" />
                </div>

                {/* Progress Header */}
                <div className="relative z-10 mb-20">
                    <div className="flex items-end justify-between border-b-2 border-black pb-8">
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
                    <div className="w-full bg-black/5 h-[2px] mt-4 relative">
                        <motion.div
                            animate={{ width: `${(step / 3) * 100}%` }}
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
                                                ? 'bg-black text-white border-black scale-110 shadow-xl'
                                                : 'border-black/10 hover:border-black'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-black/5">
                                    <button onClick={nextStep} className="group relative bg-black text-white px-12 py-5 font-bold uppercase tracking-[0.2em] overflow-hidden">
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
                                            className="w-full bg-transparent border-b-2 border-black py-4 font-mono text-xl focus:outline-none focus:border-orange-600 transition-colors"
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-mono text-[10px] uppercase opacity-40">Atomic_Time</label>
                                        <select
                                            className="w-full bg-transparent border-b-2 border-black py-4 font-mono text-xl focus:outline-none focus:border-orange-600 transition-colors appearance-none"
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        >
                                            <option value="">SELECT TIME</option>
                                            <option>18:00</option>
                                            <option>19:30</option>
                                            <option>21:00</option>
                                            <option>22:30</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-8 flex items-center gap-8 border-t border-black/5">
                                    <button
                                        onClick={prevStep}
                                        className="font-mono text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                                    >
                                        [ REVERT_STEP ]
                                    </button>
                                    <button onClick={nextStep} className="group relative bg-black text-white px-12 py-5 font-bold uppercase tracking-[0.2em] overflow-hidden">
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

                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="font-mono text-[10px] uppercase opacity-40">Primary_Entity_Name</label>
                                        <input
                                            type="text"
                                            placeholder="ENTER FULL NAME"
                                            className="w-full bg-transparent border-b-2 border-black py-4 font-mono text-xl focus:outline-none focus:border-orange-600 transition-colors placeholder:opacity-20 uppercase"
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-mono text-[10px] uppercase opacity-40">Digital_Frequency</label>
                                        <input
                                            type="email"
                                            placeholder="ENTER EMAIL ADDRESS"
                                            className="w-full bg-transparent border-b-2 border-black py-4 font-mono text-xl focus:outline-none focus:border-orange-600 transition-colors placeholder:opacity-20 uppercase"
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-8 flex items-center gap-8 border-t border-black/5">
                                    <button
                                        onClick={prevStep}
                                        className="font-mono text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                                    >
                                        [ REVERT_STEP ]
                                    </button>
                                    <button className="group relative bg-orange-600 text-white px-12 py-5 font-bold uppercase tracking-[0.2em] overflow-hidden w-full md:w-auto">
                                        <span className="relative z-10">Execute Reservation</span>
                                        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PageTransition>
    );
}
