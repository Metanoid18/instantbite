import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    memberSince: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, name: string) => Promise<void>;
    logout: () => void;
    isAuthModalOpen: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
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

    const login = async (email: string, name: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
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
