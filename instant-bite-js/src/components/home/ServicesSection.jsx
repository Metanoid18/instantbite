import { useEffect, useState, useRef } from 'react';
import { Smartphone, Clock, ShieldCheck, ChefHat } from 'lucide-react';

const SERVICES = [
    {
        id: "info3",
        title: "Online order",
        icon: Smartphone,
        description: "Experience the ultimate convenience with our seamless online ordering system, designed for precision and speed.",
        top: 1282
    },
    {
        id: "info4",
        title: "24/7 service",
        icon: Clock,
        description: "Our kitchens never sleep. Round-the-clock culinary excellence delivered with architectural consistency.",
        top: 1395
    },
    {
        id: "info5",
        title: "Clean kitchen",
        icon: ShieldCheck,
        description: "Clinical hygiene standards maintained with tectonic discipline, ensuring the purest flavor profiles.",
        top: 1508
    },
    {
        id: "info6",
        title: "Super chefs",
        icon: ChefHat,
        description: "A collective of culinary architects dedicated to pushing the boundaries of gastronomic structure.",
        top: 1621
    }
];

export default function ServicesSection() {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const newScale = width / 1440;
            setScale(newScale);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const Y_OFFSET = 800; // Start of Frame7 services content

    return (
        <section
            ref={containerRef}
            className="relative bg-background overflow-hidden"
            style={{ height: `${1080 * scale}px` }}
        >
            <div
                className="absolute left-1/2 top-0 origin-top -translate-x-1/2"
                style={{
                    width: '1440px',
                    height: '1080px',
                    transform: `translateX(-50%) scale(${scale})`
                }}
            >
                {/* 1. Main Heading */}
                <div
                    className="absolute flex flex-col font-serif font-black justify-center leading-none left-[134px] not-italic text-[48px] text-foreground top-[976px] -translate-y-1/2 w-[540px] z-20"
                    style={{ top: `${976 - Y_OFFSET}px` }}
                >
                    <p className="leading-[1.2] font-serif uppercase tracking-[0.05em]">
                        We are more than just multiple service
                    </p>
                </div>

                {/* 2. Description Paragraph */}
                <div
                    className="absolute font-sans font-semibold text-[15px] text-foreground opacity-70 leading-[25px] left-[134px] w-[519px] -translate-y-1/2"
                    style={{ top: `${1189 - Y_OFFSET}px` }}
                >
                    <p>
                        Our commitment to culinary precision extends far beyond the plate.
                        Every touchpoint of the Instant Bite experience is engineered for
                        performance, speed, and structural integrity.
                    </p>
                </div>

                {/* 3. Service Info Grid (Left Column) */}
                {SERVICES.map((service) => (
                    <div
                        key={service.id}
                        className="absolute left-[134px]"
                        style={{ top: `${service.top - Y_OFFSET}px`, height: '70px', width: '514px', transform: 'translateY(-50%)' }}
                    >
                        {/* Icon Box (Frame30, 37, 38, 39) */}
                        <div className="absolute left-0 top-0 w-[70px] h-[70px] bg-background border border-border rounded-[10px] flex items-center justify-center">
                            <service.icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                        </div>

                        {/* Text Content - Starts at 80px from the left edge of this container (which is 134 + 80 = 214 absolute) */}
                        <div className="absolute left-[80px] top-0 w-[424px]">
                            <h4 className="font-sans font-semibold text-[15px] text-foreground uppercase tracking-wider mb-1">
                                {service.title}
                            </h4>
                            <p className="font-sans font-semibold text-[15px] text-foreground opacity-60 leading-[25px]">
                                {service.description}
                            </p>
                        </div>
                    </div>
                ))}

                {/* 4. Feature Image Block (Right Column) */}
                <div
                    className="absolute bg-muted rounded-[25px] overflow-hidden"
                    style={{
                        left: '688px',
                        top: `${856 - Y_OFFSET}px`,
                        width: '641px',
                        height: '825px'
                    }}
                >
                    <img
                        src="/services/highlight.png"
                        alt="Culinary Architecture"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
