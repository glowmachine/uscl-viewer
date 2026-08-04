import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { allAreas } from "../types/states";
import { useSettingsContext } from "./SettingsContext";

type Column = {
    key: string,
    label: string,
    selected: boolean
};
const tableColumns = [
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
    { key: 'twitter', label: 'Twitter', selected: true },
    { key: 'twitter_id', label: 'TwitterID', selected: true },
    { key: 'facebook', label: 'Facebook', selected: true },
    { key: 'youtube', label: 'Youtube', selected: true },
    { key: 'youtube_id', label: 'YoutubeID', selected: true },
    { key: 'instagram', label: 'Instagram', selected: true },
    { key: 'instagram_id', label: 'InstagramID', selected: true },
    { key: 'mastodon', label: 'Mastodon', selected: true },
] as const satisfies Column[];
export type ColumnKey = typeof tableColumns[number]['key'];
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
    twitter: string | undefined,
    twitter_id: string | undefined,
    facebook: string | undefined,
    youtube: string | undefined,
    youtube_id: string | undefined,
    instagram: string | undefined,
    instagram_id: string | undefined,
    mastodon: string | undefined,
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
    key: typeof tableColumns[number]['key'],
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
    const { savedColKeys } = useSettingsContext();

    const [columns, setColumns] = useState<Column[]>(() => {
        //for each saved key, get matching table cols,
        //filter out 'undefined' results when .find couldn't find the key,
        //set each col's 'selected' property to true
        const showCols = savedColKeys
            .map(savedColKey => tableColumns.find(col => col.key === savedColKey))
            .filter(col => col !== undefined)
            .map(col => ({ ...col, selected: true }));
        //for each table col, get the columns that don't match the saved keys,
        //set their 'selected' property to false
        const hideCols = tableColumns
            .filter(col => !savedColKeys.includes(col.key))
            .map(col => ({ ...col, selected: false }));
        return [...showCols, ...hideCols];
    });

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