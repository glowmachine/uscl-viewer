import { createContext, useContext, useState, type PropsWithChildren } from "react";

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const defaultSelectedColKeys = ['full', 'age', 'gender', 'type', 'state'].concat(Array(3).fill(''));

type SettingsContextValue = {
    selectedColKeys: string[],
    setSelectedColKeys: React.Dispatch<React.SetStateAction<string[]>>,
    readSelectedColKeys: () => string[],
    writeSelectedColKeys: (keys: string[]) => void,
}
export function SettingsProvider({ children }: PropsWithChildren) {
    const [selectedColKeys, setSelectedColKeys] = useState<string[]>(
        readSelectedColKeys()
    );

    function readSelectedColKeys(): string[] {
        try {
            const data = localStorage.getItem('columns');
            return data ? JSON.parse(data) : defaultSelectedColKeys;
        }
        catch (err) {
            console.warn(`Error parsing localStorage key: "columns" (${err})`);
            return defaultSelectedColKeys;
        }
    }

    function writeSelectedColKeys(keys: string[]): void {
        localStorage.setItem('columns', JSON.stringify(keys));
    }

    return (
        <SettingsContext value={{
            selectedColKeys, setSelectedColKeys,
            readSelectedColKeys, writeSelectedColKeys,
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