import { useEffect, useState, useRef } from 'react';

export default function AppPromo() {
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

    const Y_OFFSET = 1877; // Start of the section (horizontal line from previous section)

    const features = [
        { text: "Fast and easy orders", top: 2492.5 },
        { text: "Real time order tracking", top: 2538.5 },
        { text: "Exclusive app-only details", top: 2584.5 }
    ];

    return (
        <section
            ref={containerRef}
            className="relative bg-background overflow-hidden"
            style={{ height: `${1900 * scale}px` }}
        >
            <div
                className="absolute left-1/2 top-0 origin-top -translate-x-1/2"
                style={{
                    width: '1440px',
                    height: '1900px',
                    transform: `translateX(-50%) scale(${scale})`
                }}
            >
                {/* 1. App Preview Image (Left) */}
                <div
                    className="absolute overflow-hidden"
                    style={{
                        left: '0px',
                        top: '100px',
                        width: '720px',
                        height: '730px'
                    }}
                >
                    <img
                        src="/mockup.png"
                        alt="Mobile App Preview"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* 2. App Heading (Right) */}
                <div
                    className="absolute flex flex-col font-serif font-black justify-center leading-tight left-[727px] not-italic text-[48px] text-foreground top-[2139px] -translate-y-1/2 w-[618px] z-20"
                    style={{ top: `${2139 - Y_OFFSET}px` }}
                >
                    <p className="uppercase tracking-[0.05em]">
                        Never feel hungry! download our mobile app
                    </p>
                </div>

                {/* 3. App Description */}
                <div
                    className="absolute font-sans font-semibold text-[15px] text-foreground opacity-70 leading-[25px] left-[727px] w-[519px] -translate-y-1/2"
                    style={{ top: `${2320 - Y_OFFSET}px` }}
                >
                    <p>
                        Enjoy delicious food on the go! Download Our mobile app and get
                        exclusive deals and lightning fast deliveries.
                    </p>
                </div>

                {/* 4. App Download Actions (Buttons) */}
                <div className="absolute top-[2381px] left-0 right-0 h-[60px]" style={{ top: `${2381 - Y_OFFSET}px` }}>
                    <button
                        className="absolute bg-foreground text-background text-[15px] font-bold py-4 px-10 rounded-[59px] hover:bg-zinc-800 transition-colors whitespace-nowrap"
                        style={{ left: '727px' }}
                    >
                        App Store
                    </button>
                    <button
                        className="absolute bg-background border border-foreground text-foreground text-[15px] font-bold py-4 px-10 rounded-[59px] hover:bg-foreground hover:text-background transition-all whitespace-nowrap"
                        style={{ left: '927px' }}
                    >
                        Play Store
                    </button>
                </div>

                {/* 5. Feature Highlights */}
                {features.map((feature, i) => (
                    <div
                        key={i}
                        className="absolute left-[731px] flex items-center"
                        style={{ top: `${feature.top - Y_OFFSET}px`, transform: 'translateY(-50%)' }}
                    >
                        <div className="w-[12px] h-[12px] bg-[#FF3300] rounded-full mr-[15px]" />
                        <span className="font-sans font-semibold text-[15px] text-foreground">
                            {feature.text}
                        </span>
                    </div>
                ))}

                {/* 6. "Visit Us" Heading */}
                <div
                    className="absolute left-0 right-0 flex items-center justify-center gap-10"
                    style={{ top: `${2895 - Y_OFFSET}px`, transform: 'translateY(-50%)' }}
                >
                    {/* Left Line */}
                    <div className="w-[485px] h-[1.5px] bg-foreground" />

                    <h2 className="font-serif font-medium text-[36px] text-foreground whitespace-nowrap px-4">
                        Visit us
                    </h2>

                    {/* Right Line */}
                    <div className="w-[500px] h-[1.5px] bg-foreground" />
                </div>

                {/* 7. Supporting Image (Left) */}
                <div
                    className="absolute bg-muted rounded-[25px] overflow-hidden"
                    style={{
                        left: '101px',
                        top: `${3166 - Y_OFFSET}px`,
                        width: '549px',
                        height: '411px'
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
                        alt="Restaurant Interior"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 8. Information Card with Custom SVG Borders */}
                <div
                    className="absolute"
                    style={{
                        left: '790px',
                        top: `${3062 - Y_OFFSET}px`,
                        width: '553px',
                        height: '619px'
                    }}
                >
                    {/* Top Border */}
                    <svg
                        className="absolute top-0 left-0"
                        width="553"
                        height="43"
                        viewBox="0 0 553 43"
                        style={{ transform: 'scaleY(-1)' }}
                    >
                        <path
                            d="M0.5 0V13C0.5 29.5685 13.9315 43 30.5 43H137H404.5H523C539.569 43 553 29.5685 553 13V0"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                        />
                    </svg>

                    {/* Bottom Border */}
                    <svg
                        className="absolute left-0"
                        style={{ top: '571px' }}
                        width="553"
                        height="43"
                        viewBox="0 0 553 43"
                    >
                        <path
                            d="M0.5 0V13C0.5 29.5685 13.9315 43 30.5 43H137H404.5H523C539.569 43 553 29.5685 553 13V0"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                        />
                    </svg>

                    {/* Content Container - Centered between borders */}
                    <div
                        className="absolute left-[45px] flex flex-col gap-[18px]"
                        style={{ top: '307px', transform: 'translateY(-50%)', width: '427px' }}
                    >
                        {/* Coordinates Section */}
                        <div>
                            <h3 className="font-serif font-extrabold text-[29px] text-foreground mb-2" style={{ letterSpacing: '0.29px' }}>
                                Coordinates
                            </h3>
                            <p className="font-sans font-medium text-[26px] text-foreground leading-[1.3]">
                                1024 Null Pointer Exception Ave<br />
                                Silicon Valley, CA 94025
                            </p>
                        </div>

                        {/* Divider */}
                        <svg width="427" height="1" viewBox="0 0 427 1">
                            <line x1="0" y1="0.5" x2="427" y2="0.5" stroke="currentColor" strokeWidth="1" />
                        </svg>

                        {/* Operations Section */}
                        <div>
                            <h3 className="font-serif font-extrabold text-[29px] text-foreground mb-2" style={{ letterSpacing: '0.29px' }}>
                                Operations
                            </h3>
                            <p className="font-sans font-medium text-[26px] text-foreground leading-[1.3] font-mono">
                                Mon - Thu          11:00 - 23:00<br />
                                Fri - Sat          11:00 - 02:00<br />
                                Sun                Closed for Defrag
                            </p>
                        </div>

                        {/* Divider */}
                        <svg width="427" height="1" viewBox="0 0 427 1">
                            <line x1="0" y1="0.5" x2="427" y2="0.5" stroke="currentColor" strokeWidth="1" />
                        </svg>

                        {/* Vocal Link Section */}
                        <div>
                            <h3 className="font-serif font-extrabold text-[29px] text-foreground mb-2" style={{ letterSpacing: '0.29px' }}>
                                Vocal link
                            </h3>
                            <p className="font-sans font-medium text-[26px] text-foreground leading-[1.3]">
                                +1 (555) 0110-0011
                            </p>
                        </div>

                        {/* Divider */}
                        <svg width="427" height="1" viewBox="0 0 427 1">
                            <line x1="0" y1="0.5" x2="427" y2="0.5" stroke="currentColor" strokeWidth="1" />
                        </svg>

                        {/* Digital Link Section */}
                        <div>
                            <h3 className="font-serif font-extrabold text-[29px] text-foreground mb-2" style={{ letterSpacing: '0.29px' }}>
                                Digital Link
                            </h3>
                            <p className="font-sans font-medium text-[26px] text-foreground leading-[1.3]">
                                signal@instantbite.void
                            </p>
                        </div>
                    </div>
                </div>



                {/* Supporting Image (Left of Card) */}
                <div
                    className="absolute bg-muted rounded-[25px] overflow-hidden"
                    style={{
                        left: '101px',
                        top: `${3166 - 1877}px`,
                        width: '549px',
                        height: '411px'
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
                        alt="Restaurant Interior"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
