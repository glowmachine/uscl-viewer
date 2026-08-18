import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { fetchData } from "../api/fetchData";
import type { LegislatorCurrent } from "../types/LegislatorCurrent";
import type { LegislatorSocialMedia, Social } from "../types/LegislatorSocialMedia";
import type { LegislatorDistrictOffice, Office } from "../types/LegislatorDistrictOffice";

export type Legislator = LegislatorCurrent & { social: Social, offices: Office[] };

type DataContextValue = {
    legislators: Legislator[] | null,
    isLoading: boolean,
    error: Error | TypeError | null,
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: PropsWithChildren) {
    const [legislators, setLegislators] = useState<Legislator[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | TypeError | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            setIsLoading(true);
            setError(null);

            try {
                if (isMounted) {
                    const legislatorData = await fetchData<LegislatorCurrent[]>('legislators-current.json');
                    const socialData = await fetchData<LegislatorSocialMedia[]>('legislators-social-media.json');
                    const socialByID = new Map(socialData.map(member => [member.id.bioguide, member]));
                    const officeData = await fetchData<LegislatorDistrictOffice[]>('legislators-district-offices.json');
                    const officeByID = new Map(officeData.map(member => [member.id.bioguide, member]));
                    setLegislators(legislatorData.map(member => (
                        {
                            ...member,
                            social: socialByID.get(member.id.bioguide)?.social || {},
                            offices: officeByID.get(member.id.bioguide)?.offices || []
                        }
                    )));
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
        <DataContext value={{ legislators, isLoading, error }}>
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