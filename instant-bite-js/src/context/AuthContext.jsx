import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('ib-user');
        return saved ? JSON.parse(saved) : null;
    });

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            localStorage.setItem('ib-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('ib-user');
        }
    }, [user]);

    const login = async (email, name) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUser = {
            id: generateUserId(),
            name,
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            memberSince: new Date().toLocaleDateString()
        };

        setUser(newUser);
        closeAuthModal();
    };

    const logout = () => {
        setUser(null);
    };

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            logout,
            isAuthModalOpen,
            openAuthModal,
            closeAuthModal
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

function generateUserId() {
    return Math.random().toString(36).substr(2, 9);
}
