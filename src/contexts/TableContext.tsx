import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { allAreas } from "../types/states";

const initialColumns = [
    { key: 'id', label: 'Bioguide', visible: false },
    { key: 'first', label: 'First Name', visible: true },
    { key: 'last', label: 'Last Name', visible: true },
    { key: 'age', label: 'Age', visible: true },
    { key: 'gender', label: 'Gender', visible: true },
    { key: 'type', label: 'Role', visible: true },
    { key: 'state', label: 'State', visible: true },
    { key: 'district', label: 'District', visible: true },
    { key: 'party', label: 'Party', visible: true },
    { key: 'terms', label: 'Terms', visible: true },
    { key: 'start', label: 'Start', visible: true },
    { key: 'end', label: 'End', visible: true },
] as const satisfies Column[];
type Column = {
    key: string,
    label: string,
    visible?: boolean
};
export type ColumnKey = typeof initialColumns[number]['key'];

type ColumnTypeMap = {
    id: string,
    first: string,
    last: string,
    age: number,
    gender: 'F' | 'M',
    type: string,
    state: typeof allAreas[keyof typeof allAreas],
    district: number | undefined,
    party: string,
    terms: number,
    start: string,
    end: string,
};
export type Row = { [K in ColumnKey]: ColumnTypeMap[K] };

export type FilterOptions = {
    search: string,
    state: string,
    parties: {
        democrat: boolean,
        independent: boolean,
        republican: boolean,
    },
    types: {
        sen: boolean,
        rep: boolean,
    },
};

export type SortByOptions = {
    key: typeof initialColumns[number]['key'],
    asc: boolean,
};

type TableContextValue = {
    columns: Column[],
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>,
    sortBy: SortByOptions,
    setSortBy: React.Dispatch<React.SetStateAction<SortByOptions>>,
    filterOptions: FilterOptions,
    setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>,
    searchInput: string,
    setSearchInput: React.Dispatch<React.SetStateAction<string>>,
}
const TableContext = createContext<TableContextValue | undefined>(undefined);

export function TableProvider({ children }: PropsWithChildren) {
    const [columns, setColumns] = useState<Column[]>(
        initialColumns
    );
    const [sortBy, setSortBy] = useState<SortByOptions>({
        key: 'last',
        asc: true,
    });
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        search: '',
        state: '',
        parties: {
            democrat: true,
            independent: true,
            republican: true,
        },
        types: {
            sen: true,
            rep: true,
        },
    })
    const [searchInput, setSearchInput] = useState('');

    return (
        <TableContext value={{
            columns, setColumns,
            sortBy, setSortBy,
            filterOptions, setFilterOptions,
            searchInput, setSearchInput
        }}>
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