import { createContext, useContext, useState, type PropsWithChildren } from "react";


type Column = {
    key: string,
    label: string,
    visible?: boolean
};
const initialColumns = [
    { key: 'id', label: 'Bioguide', visible: true },
    { key: 'first', label: 'First Name', visible: true },
    { key: 'last', label: 'Last Name', visible: true },
    { key: 'age', label: 'Age', visible: true },
    { key: 'gender', label: 'Gender', visible: true },
    { key: 'type', label: 'Role', visible: true },
    { key: 'state', label: 'State', visible: true },
    { key: 'district', label: 'District', visible: true },
    { key: 'party', label: 'Party', visible: true },
    { key: 'terms', label: 'Term', visible: true },
    { key: 'start', label: 'Start', visible: true },
    { key: 'end', label: 'End', visible: true },
] as const satisfies Column[];
export type ColumnKey = typeof initialColumns[number]['key'];

export type SortByOptions = {
    key: typeof initialColumns[number]['key'],
    asc: boolean,
};
// export type FilterOptions = {
//     search: string[]
//     hiddenCat: string[] // should be typed with legislatorsCurrent.ts
// };

type TableContextValue = {
    columns: Column[],
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>,
    sortBy: SortByOptions,
    setSortBy: React.Dispatch<React.SetStateAction<SortByOptions>>,
}


const TableContext = createContext<TableContextValue | undefined>(undefined);

export function TableProvider({ children }: PropsWithChildren) {
    const [columns, setColumns] =
        useState<Column[]>(initialColumns);
    const [sortBy, setSortBy] = useState<SortByOptions>({
        key: 'last',
        asc: true,
    });

    return (
        <TableContext value={{ columns, setColumns, sortBy, setSortBy }}>
            {children}
        </TableContext>
    );
}

export function useTableContext() {
    const context = useContext(TableContext);
    if (!context)
        throw new Error('useTableContext must be used within a TableProvider');
    return context;
}