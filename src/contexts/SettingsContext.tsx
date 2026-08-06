import { createContext, useContext, useState, type PropsWithChildren } from "react";

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const defaultSavedColKeys = ['name', 'party', 'type', 'state', 'district']
    .concat(Array(3).fill(''));

type SettingsContextValue = {
    savedColKeys: string[],
    setSavedColKeys: React.Dispatch<React.SetStateAction<string[]>>,
    readSavedColKeys: () => string[],
    writeSavedColKeys: (keys: string[]) => void,
}
export function SettingsProvider({ children }: PropsWithChildren) {
    const [savedColKeys, setSavedColKeys] = useState<string[]>(
        readSavedColKeys()
    );

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

    return (
        <SettingsContext value={{
            savedColKeys, setSavedColKeys,
            readSavedColKeys, writeSavedColKeys,
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