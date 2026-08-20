import { useState } from "react";
import { useTableContext } from "../contexts/TableContext";
import debounce from "../util/debounce";

export const buttonStyle = 'w-8 h-8 grid place-content-center rounded-full hover:bg-gray-200';

export default function Search() {
    const { setFilterOptions, searchInput, setSearchInput } = useTableContext();
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
        <div className='flex-1 bg-white rounded-full'>
            <label className='sr-only'>Search</label>
            <div className='relative'>
                <input className='w-full px-5 py-3 rounded-full
                focus:outline-none focus:ring-2 focus:ring-gray-500
                transition-color duration-300'
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
            </div>
        </div>
    );
}
