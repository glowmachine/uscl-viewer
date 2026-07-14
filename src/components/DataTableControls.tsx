import { useState } from "react";
import { useTableContext } from "../contexts/TableContext";
import { districts, states, territories } from "../types/states";
import debounce from "../util/debounce";



export default function DataTableControls() {
    const { filterOptions, setFilterOptions, searchInput, setSearchInput } = useTableContext();
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
        <div id='controls_container'
            className='flex flex-col gap-1'>
            <label htmlFor='searchbox' className='flex'>Search
                <div className='relative w-50'>
                    <input id='searchbox'
                        type='text'
                        className='w-full border rounded px-1'
                        placeholder='Jane Doe'
                        value={searchInput}
                        onChange={handleSearch}
                    />
                    {waitingIndicator && (
                        <div className='absolute right-0.5 top-1/2 -translate-y-1/2'>
                            <div className='h-4 w-4
                            rounded-full border-2 border-gray-200 border-t-blue-500
                            animate-spin [animation-duration:300ms]' />
                        </div>
                    )}
                </div>
            </label>
            <div>
                <label htmlFor='filterState'>State</label>
                <select id='filterState'
                    className='border rounded px-1'
                    value={filterOptions.state}
                    onChange={(e) => setFilterOptions(prev => ({ ...prev, state: e.target.value }))}>
                    <option value='' key=''>ALL</option>
                    <optgroup label='States'>
                        {Object.entries(states).map(([abbr, fullName]) =>
                            <option value={abbr} key={abbr}>{fullName}</option>
                        )}
                    </optgroup>
                    <optgroup label='Territories'>
                        {Object.entries(territories).map(([abbr, fullName]) =>
                            <option value={abbr} key={abbr}>{fullName}</option>
                        )}
                    </optgroup>
                    <optgroup label='Capitol'>
                        {Object.entries(districts).map(([abbr, fullName]) =>
                            <option value={abbr} key={abbr}>{fullName}</option>
                        )}
                    </optgroup>
                </select>
            </div>
            <fieldset>
                <label htmlFor='filterDem'>Democrats</label>
                <input id='filterDem' type='checkbox'
                    checked={filterOptions.parties.democrat}
                    onChange={(e) => setFilterOptions((prev) =>
                        ({ ...prev, parties: { ...prev.parties, democrat: e.target.checked } }))
                    }
                />
                <label htmlFor='filterInd'>Independents</label>
                <input id='filterInd' type='checkbox'
                    checked={filterOptions.parties.independent}
                    onChange={(e) => setFilterOptions((prev) =>
                        ({ ...prev, parties: { ...prev.parties, independent: e.target.checked } }))
                    }
                />
                <label htmlFor='filterRep'>Republicans</label>
                <input id='filterRep' type='checkbox'
                    checked={filterOptions.parties.republican}
                    onChange={(e) => setFilterOptions((prev) =>
                        ({ ...prev, parties: { ...prev.parties, republican: e.target.checked } }))
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor='filterReps'>Representatives</label>
                <input id='filterReps' type='checkbox'
                    checked={filterOptions.types.representative}
                    onChange={(e) => setFilterOptions((prev) =>
                        ({ ...prev, types: { ...prev.types, representative: e.target.checked } }))
                    }
                />
                <label htmlFor='filterSens'>Senators</label>
                <input id='filterSens' type='checkbox'
                    checked={filterOptions.types.senator}
                    onChange={(e) => setFilterOptions((prev) =>
                        ({ ...prev, types: { ...prev.types, senator: e.target.checked } }))
                    }
                />
            </fieldset>
        </div >
    );
}
