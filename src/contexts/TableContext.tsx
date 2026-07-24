import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { allAreas } from "../types/states";

const initialColumns = [
    { key: 'full', label: 'Full Name', selected: true },
    { key: 'id', label: 'Bioguide', selected: false },
    { key: 'first', label: 'First Name', selected: true },
    { key: 'last', label: 'Last Name', selected: true },
    { key: 'age', label: 'Age', selected: true },
    { key: 'gender', label: 'Gender', selected: true },
    { key: 'type', label: 'Role', selected: true },
    { key: 'state', label: 'State', selected: true },
    { key: 'district', label: 'District', selected: true },
    { key: 'party', label: 'Party', selected: true },
    { key: 'terms', label: 'Terms', selected: true },
    { key: 'start', label: 'Start', selected: true },
    { key: 'end', label: 'End', selected: true },
] as const satisfies Column[];
type Column = {
    key: string,
    label: string,
    selected: boolean
};
export type ColumnKey = typeof initialColumns[number]['key'];

type ColumnTypeMap = {
    full: string,
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
    selectedColKeys: string[],
    setSelectedColKeys: React.Dispatch<React.SetStateAction<string[]>>,
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
    const [selectedColKeys, setSelectedColKeys] = useState<string[]>(
        Array(8).fill('')
    );
    const [sortBy, setSortBy] = useState<SortByOptions>({
        key: 'full',
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
            selectedColKeys, setSelectedColKeys,
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