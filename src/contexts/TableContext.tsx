import { createContext, useContext, useState, type PropsWithChildren } from "react";

const tableColumns = [
    'First Name', 'Last Name', 'Age', 'Gender',
    'Role', 'State', 'District', 'Party', //from most recent term
    'Term', 'Start', 'End'
];
type TableColumn = typeof tableColumns[number];
export type SortByOptions = { column: TableColumn, asc: boolean };
export type FilterOptions = {};

type TableContextValue = {
    visibleColumns: TableColumn[],
    setVisibleColumns: React.Dispatch<React.SetStateAction<TableColumn[]>>,
    sortBy: SortByOptions,
    setSortBy: React.Dispatch<React.SetStateAction<SortByOptions>>,
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

export function TableProvider({ children }: PropsWithChildren) {
    const [visibleColumns, setVisibleColumns] = useState<TableColumn[]>(tableColumns);
    const [sortBy, setSortBy] = useState<SortByOptions>({ column: tableColumns[0], asc: true });
    const [filter, setFilter] = useState<FilterOptions>({});

    return (
        <TableContext value={{ visibleColumns, setVisibleColumns, sortBy, setSortBy }}>
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