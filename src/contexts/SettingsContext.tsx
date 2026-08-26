import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const defaultSavedColKeys = ['name', 'party', 'type', 'state', 'district']
    .concat(Array(3).fill(''));

type SettingsContextValue = {
    savedColKeys: string[],
    setSavedColKeys: React.Dispatch<React.SetStateAction<string[]>>,
    readSavedColKeys: () => string[],
    writeSavedColKeys: (keys: string[]) => void,
    darkMode: boolean,
    toggleDarkMode: () => void,
}
export function SettingsProvider({ children }: PropsWithChildren) {
    const [savedColKeys, setSavedColKeys] = useState<string[]>(readSavedColKeys());
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const stored = localStorage.getItem('darkMode');
        if (stored !== null) return stored === 'true';
        else return window.matchMedia('(prefers-color-scheme:dark').matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', String(darkMode));
    }, [darkMode]);

    function readSavedColKeys(): string[] {
        try {
            const data = localStorage.getItem('columns');
            return data ? JSON.parse(data) : defaultSavedColKeys;
        }
        catch (err) {
            console.warn(`Error parsing localStorage key: "columns" (${err})`);
            return defaultSavedColKeys;
        }
    }

    function writeSavedColKeys(keys: string[]): void {
        localStorage.setItem('columns', JSON.stringify(keys));
    }

    function toggleDarkMode(): void {
        setDarkMode(!darkMode);
    }

    return (
        <SettingsContext value={{
            savedColKeys, setSavedColKeys,
            readSavedColKeys, writeSavedColKeys,
            darkMode, toggleDarkMode,
        }}>
            {children}
        </SettingsContext>
    )
}

export function useSettingsContext() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettingsContext must be used within a SettingsProvider');
    }
    return context;
}