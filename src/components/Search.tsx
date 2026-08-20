import { useState } from "react";
import { useTableContext } from "../contexts/TableContext";
import debounce from "../util/debounce";
import FilterSelector from "./List/FilterSelector";

export const buttonStyle = 'w-8 h-8 grid place-content-center rounded-full hover:bg-gray-200';

export default function Search() {
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
        <div className={`relative flex-1 bg-gray-100 transition-[border-radius]
        ${filterSelectOpen ? 'rounded-t-2xl delay-0' : 'rounded-2xl delay-300'}`}>
            <div className='relative flex flex-col items-center'>
                <label className='sr-only'>Search</label>
                <input className={`z-20 w-full px-5 py-3 ${filterSelectOpen ? 'rounded-t-2xl' : 'rounded-2xl'}
                    focus:outline-none focus:ring-2 focus:ring-gray-500
                    transition-color duration-300`}
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
                <button className={`absolute z-30 right-2 top-1/2 -translate-y-1/2
                ${buttonStyle} ${true ? 'bg-gray-200' : ''}`}
                    onClick={() => setFilterSelectOpen(prev => !prev)}>
                    {/* onClick={() => { }}> */}
                    <span className='material-symbols-outlined'
                        style={{ fontVariationSettings: `'FILL' ${filterSelectOpen ? 1 : 0}` }}
                    >
                        filter_alt
                    </span>
                </button>
            </div>
            <div className={`absolute z-10 bg-gray-100 rounded-b-2xl
            grid ${filterSelectOpen ? 'grid-rows-[1fr] delay-100' : 'grid-rows-[0fr]'}
            transition-[grid-template-rows] duration-300`}>
                <div className='overflow-hidden'>
                    <div className='py-2'>
                        <FilterSelector />
                    </div>
                </div>
            </div>
        </div >
    );
}
