import PageTransition from '../components/layout/PageTransition';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';

export default function ContactPage() {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto min-h-screen">
                <Breadcrumbs />

                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-16 md:gap-24">

                    {/* Info Section */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="font-serif text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8">
                                Connect
                            </h1>
                            <p className="font-sans text-lg text-muted/80 max-w-md">
                                Locate our frequency. We transmit from the center of the culinary void.
                            </p>
                        </div>

                        <div className="space-y-8 font-sans">
                            <div className="flex items-start gap-6">
                                <MapPin className="w-6 h-6 text-accent mt-1" />
                                <div>
                                    <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Coordinates</h3>
                                    <p className="text-muted">1024 Null Pointer Exception Ave<br />Silicon Valley, CA 94025</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <Clock className="w-6 h-6 text-accent mt-1" />
                                <div>
                                    <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Operations</h3>
                                    <div className="grid grid-cols-2 gap-x-8 text-muted">
                                        <span>Mon - Thu</span><span>11:00 - 23:00</span>
                                        <span>Fri - Sat</span><span>11:00 - 02:00</span>
                                        <span>Sun</span><span>Closed for Defrag</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <Phone className="w-6 h-6 text-accent mt-1" />
                                <div>
                                    <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Vocal Link</h3>
                                    <p className="text-muted">+1 (555) 0110-0011</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <Mail className="w-6 h-6 text-accent mt-1" />
                                <div>
                                    <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Digital Link</h3>
                                    <p className="text-muted">signal@instantbite.void</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="h-[50vh] lg:h-auto bg-muted/10 relative overflow-hidden border-2 border-border group rounded-2xl">
                        <div className="absolute inset-0 bg-[url('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/13/2627/3159.png')] bg-cover bg-center grayscale contrast-125 opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <div className="w-4 h-4 bg-accent rounded-full animate-ping absolute top-0 left-0" />
                                <div className="w-4 h-4 bg-accent rounded-full relative z-10 border-2 border-background" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </PageTransition>
    );
}
