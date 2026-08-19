import { useState } from "react";
import { useTableContext } from "../../contexts/TableContext";
import debounce from "../../util/debounce";
import FilterSelector from "./FilterSelector";
import ColumnSelector from "./ColumnSelector";

export const buttonStyle = 'w-8 h-8 grid place-content-center rounded-full hover:bg-gray-200';

export default function TableControls() {
    const { setFilterOptions, searchInput, setSearchInput } = useTableContext();
    const [filterSelectOpen, setFilterSelectOpen] = useState(false);
    // const [waitingIndicator, setWaitingIndicator] = useState(false);
    const debouceTimeMs = 300;
    const debouncedSearch = debounce((value) => {
        setFilterOptions((prev) => ({ ...prev, search: value }));
        // setWaitingIndicator(false);
    }, debouceTimeMs);
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>): void {
        setSearchInput(e.target.value);
        // setWaitingIndicator(true);
        debouncedSearch(e.target.value);
    }

    return (
        <div className='m-1 flex items-center gap-1'>
            <div className='flex-1 border rounded'>
                <label className='sr-only'>Search</label>
                <div className='relative'>
                    <input className='w-full p-2'
                        type='text'
                        placeholder='Search'
                        value={searchInput}
                        onChange={handleSearch}
                    />
                    {/* {waitingIndicator && (
                        <div className='absolute right-2.5 top-1/2 -translate-y-1/2'>
                            <div className='h-4 w-4
                            rounded-full border-2 border-gray-200 border-t-blue-500
                            animate-spin [animation-duration:300ms]' />
                        </div>
                    )} */}
                    <button className={`${buttonStyle} absolute right-1 top-1/2 -translate-y-1/2`}
                        onClick={() => setFilterSelectOpen(prev => !prev)}>
                        <span className='material-symbols-outlined'
                            style={{ fontVariationSettings: `'FILL' ${filterSelectOpen ? 1 : 0}` }}
                        >
                            filter_alt
                        </span>
                    </button>
                </div>
                {filterSelectOpen && <div className='border-t-1 m-1'><FilterSelector /></div>}
            </div>
            <ColumnSelector />
        </div>
    );
}
