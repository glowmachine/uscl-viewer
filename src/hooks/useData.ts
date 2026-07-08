import { useEffect, useState } from "react";
import { fetchData, type DataType, type Filename } from "../api/fetchData";

interface UseDataResult {
    data: DataType[] | null;
    isLoading: boolean;
    error: Error | TypeError | null;
}

export default function useData(filename: Filename): UseDataResult {
    const [data, setData] = useState<DataType[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | TypeError | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            setIsLoading(true);
            setError(null);

            try {
                if (isMounted) setData(await fetchData(filename));
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
    }, [filename]);

    return { data, isLoading, error };
}