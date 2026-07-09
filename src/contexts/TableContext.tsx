import { createContext, useContext, useState, type PropsWithChildren } from "react";

const tableColumns = [
    'Name', 'Age', 'Gender',
    'Role', 'State', 'District', 'Party', //from most recent term
    'Term', 'Start', 'End'
];
type TableColumn = typeof tableColumns[number];

type TableContextValue = {
    visibleColumns: TableColumn[],
    setVisibleColumns: React.Dispatch<React.SetStateAction<TableColumn[]>>,
    sortBy: TableColumn,
    setSortBy: React.Dispatch<React.SetStateAction<TableColumn>>,
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

export function TableProvider({ children }: PropsWithChildren) {
    const [visibleColumns, setVisibleColumns] = useState<TableColumn[]>(tableColumns);
    const [sortBy, setSortBy] = useState<TableColumn>(tableColumns[0]);

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