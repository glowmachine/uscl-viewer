import { useState } from "react";
import { useTableContext } from "../../contexts/TableContext";
import debounce from "../../util/debounce";
import TableFilters from "./TableFilters";

export default function TableControls() {
    const { setFilterOptions, searchInput, setSearchInput } = useTableContext();
    const [filterSelectOpen, setFilterSelectOpen] = useState(false);
    const [waitingIndicator, setWaitingIndicator] = useState(false);
    const debouceTimeMs = 300;
    const debouncedSearch = debounce((value) => {
        setFilterOptions((prev) => ({ ...prev, search: value }));
        setWaitingIndicator(false);
    }, debouceTimeMs);
    function handleSearch(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
        setSearchInput(e.target.value);
        setWaitingIndicator(true);
        debouncedSearch(e.target.value);
    }

    return (
        <div className='flex flex-col'>
            <div className='m-1 flex gap-1'>
                <label className='flex items-center justify-center gap-1'>
                    <span className='sr-only'>Search</span>
                    <div className='relative w-50'>
                        <input className='w-full border rounded p-2'
                            type='text'
                            placeholder='Search'
                            value={searchInput}
                            onChange={handleSearch}
                        />
                        {waitingIndicator && (
                            <div className='absolute right-2.5 top-1/2 -translate-y-1/2'>
                                <div className='h-4 w-4
                                rounded-full border-2 border-gray-200 border-t-blue-500
                                animate-spin [animation-duration:300ms]' />
                            </div>
                        )}
                    </div>
                </label>
                <button className='border rounded w-25'
                    onClick={() => setFilterSelectOpen(prev => !prev)}>
                    {!filterSelectOpen ? 'Show Filters' : 'Hide Filters'}
                </button>
            </div>
            {filterSelectOpen && <TableFilters />}
        </div>
    );
}
