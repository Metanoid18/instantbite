import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext(undefined);

export function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) throw new Error('useLoading must be used within a LoadingProvider');
    return context;
};
