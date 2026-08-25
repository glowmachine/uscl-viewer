import { useEffect, useRef, useState } from "react";
import { useTableContext } from "../contexts/TableContext";
import debounce from "../util/debounce";
import FilterSelector from "./List/FilterSelector";

export const buttonStyle = 'w-8 h-8 grid place-content-center rounded-full hover:bg-gray-200';

export default function Search() {
    const { setFilterOptions, searchInput, setSearchInput } = useTableContext();
    const [showFilters, setShowFilters] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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

    function handleEnter(e: KeyboardEvent): void {
        if (inputRef.current && e.key === 'Enter') {
            setShowFilters(false);
        }
    }
    function handleFilterButton(): void {
        setShowFilters(prev => !prev);
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }
    function handleClearButton(): void {
        setSearchInput('');
        setFilterOptions((prev) => ({ ...prev, search: '' }));
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEnter);
        return () => document.removeEventListener('keydown', handleEnter);
    }, []);

    return (
        <div className={`flex-1 shadow-black ${showFilters ? '' : ''}`}>
            <div className={`relative bg-gray-100 ${showFilters ? 'rounded-t-xl' : 'rounded-full'}`}>
                <label className='sr-only'>Search</label>
                <input className={`w-full px-5 py-3 ${showFilters ? 'rounded-t-xl' : 'rounded-full'}`}
                    type='text'
                    placeholder='Search'
                    value={searchInput}
                    onChange={handleSearch}
                    ref={inputRef}
                />
                {/* {waitingIndicator && (
                    <div className='absolute right-2.5 top-1/2 -translate-y-1/2'>
                        <div className='h-4 w-4
                        rounded-full border-2 border-gray-200 border-t-blue-500
                        animate-spin [animation-duration:300ms]' />
                    </div>
                )} */}
                <div className='absolute z-10 flex items-center gap-1 right-2 top-1/2 -translate-y-1/2'>
                    <button onClick={handleClearButton} className='text-sm underline'>clear</button>
                    <button className={`${buttonStyle} ${showFilters ? 'bg-gray-200' : ''}`}
                        onClick={handleFilterButton}>
                        <span className='material-symbols-outlined'
                            style={{ fontVariationSettings: `'FILL' ${showFilters ? 1 : 0}` }}
                        >
                            filter_alt
                        </span>
                    </button>
                </div>
                <div className={`absolute bg-gray-100 rounded-b-xl z-20 w-full shadow-lg
                    grid ${showFilters ? 'grid-rows-[1fr] border-t-1 border-gray-400 p-2' : 'grid-rows-[0fr] invisible'}
                    transition-[grid-template-rows] duration-300`}>
                    <div className='overflow-hidden'>
                        <FilterSelector />
                    </div>
                </div>
            </div>
        </div>
    );
}
