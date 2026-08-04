import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { fetchData, type DataType } from "../api/fetchData";
import type { Legislator } from "../types/legislator";
import type { LegislatorSocial } from "../types/socials";

type DataContextValue = {
    legislators: Legislator[] | null,
    socials: LegislatorSocial[] | null,
    isLoading: boolean,
    error: Error | TypeError | null,
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: PropsWithChildren) {
    const [legislators, setLegislators] = useState<Legislator[] | null>(null);
    const [socials, setSocials] = useState<LegislatorSocial[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | TypeError | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            setIsLoading(true);
            setError(null);

            try {
                if (isMounted) {
                    const legislatorData = await fetchData<Legislator[]>('legislators-current.json');
                    const socialData = await fetchData<LegislatorSocial[]>('legislators-social-media.json');
                    setLegislators(legislatorData);
                    setSocials(socialData);
                };
            } catch (err) {
                (isMounted && err instanceof Error)
                    ? setError(err)
                    : setError(new Error('Unknown Error'));
            } finally {
                isMounted = false;
                setIsLoading(false);
            }
        }

        loadData();
        return () => { isMounted = false; }
    }, []);

    return (
        <DataContext value={{ legislators, socials, isLoading, error }}>
            {children}
        </DataContext>
    );
}

export function useDataContext() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
}