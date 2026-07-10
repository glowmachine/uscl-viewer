import { createContext, useContext, useState, type PropsWithChildren } from "react";

export type TableColumn = {
    key: // these keys DO NOT MATCH legislatorsCurrent.ts types
    | 'first'
    | 'last'
    | 'age'
    | 'gender'
    | 'type'
    | 'state'
    | 'district'
    | 'party'
    | 'terms'
    | 'start'
    | 'end',
    label: string,
    visible: boolean,
}
export const tableColumns: TableColumn[] = [
    { key: 'first', label: 'First Name', visible: true },
    { key: 'last', label: 'Last Name', visible: true },
    { key: 'age', label: 'Age', visible: true },
    { key: 'gender', label: 'Gender', visible: true },
    { key: 'type', label: 'Role', visible: true },
    { key: 'state', label: 'State', visible: true },
    { key: 'district', label: 'District', visible: true },
    { key: 'party', label: 'Party', visible: true },
    { key: 'terms', label: 'Term', visible: true },
    { key: 'start', label: 'start', visible: true },
    { key: 'end', label: 'end', visible: true },
];
// export type FilterOptions = {
//     search: string[]
//     hiddenCat: string[] // should be typed with legislatorsCurrent.ts
// };
export type SortByOptions = { key: TableColumn['key'], asc: boolean };

type TableContextValue = {
    columns: TableColumn[],
    setColumns: React.Dispatch<React.SetStateAction<TableColumn[]>>,
    sortBy: SortByOptions,
    setSortBy: React.Dispatch<React.SetStateAction<SortByOptions>>,
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

export function TableProvider({ children }: PropsWithChildren) {
    const [columns, setColumns] =
        useState<TableColumn[]>(tableColumns);
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