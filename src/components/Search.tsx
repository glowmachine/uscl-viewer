import { useEffect, useRef, useState } from "react";
import { useTableContext } from "../contexts/TableContext";
import debounce from "../util/debounce";
import FilterSelector from "./List/FilterSelector";

export const buttonStyle = 'size-8 grid place-content-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-600';

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
        <div className={`relative flex-1 ${showFilters ? 'rounded-t-xl' : 'rounded-full'} bg-zinc-100 dark:bg-zinc-700`}>
            <label className='sr-only'>Search</label>
            <input className={`w-full px-5 h-12 text-lg ${showFilters ? 'rounded-t-xl' : 'rounded-full'}`}
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
            <div className=''>
                <div className='absolute pl-4 z-10 flex items-center gap-2 right-3 top-1/2 -translate-y-1/2 bg-zinc-100 dark:bg-zinc-700'>
                    <button onClick={handleClearButton} className='text-sm underline'>clear</button>
                    <button className={`${buttonStyle} ${showFilters ? 'bg-zinc-200 dark:bg-zinc-600' : ''}`}
                        onClick={handleFilterButton}>
                        <span className='material-symbols-outlined'
                            style={{ fontVariationSettings: `'FILL' ${showFilters ? 1 : 0}` }}
                        >
                            filter_alt
                        </span>
                    </button>
                </div>
                <div className={`absolute rounded-b-xl z-20 w-full shadow-lg bg-zinc-100 dark:bg-zinc-700
                    grid ${showFilters ? 'grid-rows-[1fr] border-t-1 border-zinc-400 p-2' : 'grid-rows-[0fr] invisible'}
                    transition-[grid-template-rows] duration-300`}>
                    <div className='overflow-hidden'>
                        <FilterSelector />
                    </div>
                </div>
            </div>
        </div>
    );
}
