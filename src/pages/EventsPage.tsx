import PageTransition from '../components/layout/PageTransition';

export default function EventsPage() {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto min-h-screen">

                <div className="mb-24 text-center">
                    <span className="font-mono text-accent text-xs tracking-widest uppercase mb-4 block">Private Dining</span>
                    <h1 className="font-serif text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8">
                        The <span className="stroke-text">Vault</span>
                    </h1>
                    <p className="font-sans text-lg text-muted/80 max-w-2xl mx-auto">
                        Host your own molecular gathering. Sound-proof, light-controlled, and taste-optimized environments for groups of 10 to 100.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <div className="aspect-video bg-muted/10 relative overflow-hidden group rounded-2xl border-2 border-border">
                        <img
                            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            alt="The Glass Room"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                            <h3 className="font-serif text-3xl text-white uppercase font-bold">The Glass Room</h3>
                        </div>
                    </div>
                    <div className="aspect-video bg-muted/10 relative overflow-hidden group rounded-2xl border-2 border-border">
                        <img
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            alt=" The Dark Room"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                            <h3 className="font-serif text-3xl text-white uppercase font-bold">The Dark Room</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-muted/5 border border-border p-12 text-center max-w-3xl mx-auto">
                    <h3 className="font-serif text-2xl uppercase font-bold mb-4">Inquire Now</h3>
                    <p className="font-sans text-muted mb-8">
                        Tell us about your event frequency. Our events director will calibrate the menu.
                    </p>
                    <button className="bg-foreground text-background px-10 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors w-full md:w-auto">
                        Contact Events Team
                    </button>
                </div>

            </div>
        </PageTransition>
    );
}
