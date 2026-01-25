/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enables manual toggle via class
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "1.5rem",
            screens: { "2xl": "1400px" },
        },
        extend: {
            colors: {
                background: 'rgb(var(--background) / <alpha-value>)',
                foreground: 'rgb(var(--foreground) / <alpha-value>)',
                accent: 'rgb(var(--accent) / <alpha-value>)',
                border: 'rgb(var(--border) / <alpha-value>)',
                muted: 'rgb(var(--muted) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['"Space Grotesk"', 'sans-serif'], // Technical
                display: ['"Bites"', '"Syne"', 'sans-serif'],        // Artistic
                serif: ['"Cinzel"', 'serif'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, rgb(var(--grid-color) / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--grid-color) / 0.05) 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
}
