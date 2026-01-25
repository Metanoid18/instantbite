import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext(undefined);

export function SettingsProvider({ children }) {
    const isNightTime = () => {
        const hour = new Date().getHours();
        return hour >= 19 || hour < 6; // 7 PM to 6 AM
    };

    // Initialize theme based on storage or time
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('ib-theme');
        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            return savedTheme;
        }

        const initialTheme = isNightTime() ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
        return initialTheme;
    });

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Monitor time for automatic switching
    React.useEffect(() => {
        const checkTime = () => {
            const night = isNightTime();
            const currentTheme = night ? 'dark' : 'light';

            // Only auto-switch if user hasn't manually set a preference in this session
            // or if we want to strictly follow the 7 PM rule.
            // The user said "automatically turns on once 7pm is hit", implying a trigger.

            const savedTheme = localStorage.getItem('ib-theme');
            if (!savedTheme) {
                setTheme(currentTheme);
                document.documentElement.classList.toggle('dark', night);
            }
        };

        const interval = setInterval(checkTime, 60000); // Check every minute
        checkTime(); // Initial check

        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('ib-theme', newTheme);
    };

    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    return (
        <SettingsContext.Provider value={{ theme, toggleTheme, isSettingsOpen, toggleSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within a SettingsProvider');
    return context;
};
