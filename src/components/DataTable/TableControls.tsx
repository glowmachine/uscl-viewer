import { useState } from "react";
import { useTableContext } from "../../contexts/TableContext";
import { districts, states, territories } from "../../types/states";
import debounce from "../../util/debounce";

const styleCheckboxButton = `rounded-full border
                            px-2 py-1 transition-colors select-none
                            border-gray-300 bg-white text-gray-400
                            peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white
                            peer-hover:ring-2 peer-hover:ring-blue-500
                            peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500`;

export default function TableControls() {
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
        <div id='controls_container' className='m-1 flex flex-col gap-1'>
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
            <div id='filters_container'
                className='w-full flex flex-row flex-wrap items-center justify-evenly gap-1
                *:border *:rounded *:px-2 *:pt-2 *:pb-4 *:flex *:gap-1'>
                <fieldset>
                    <legend>State</legend>
                    <label className='sr-only' htmlFor='filterState'>State</label>
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
                </fieldset>
                <fieldset>
                    <legend>Party</legend>
                    <label>
                        <input type="checkbox"
                            className="peer sr-only"
                            checked={filterOptions.parties.democrat}
                            onChange={(e) => setFilterOptions((prev) =>
                                ({ ...prev, parties: { ...prev.parties, democrat: e.target.checked } }))
                            }
                        />
                        <span className={styleCheckboxButton}>Democrats</span>
                    </label>
                    <label>
                        <input type="checkbox"
                            className="peer sr-only"
                            checked={filterOptions.parties.independent}
                            onChange={(e) => setFilterOptions((prev) =>
                                ({ ...prev, parties: { ...prev.parties, independent: e.target.checked } }))
                            }
                        />
                        <span className={styleCheckboxButton}>Independents</span>
                    </label>
                    <label>
                        <input type="checkbox"
                            className="peer sr-only"
                            checked={filterOptions.parties.republican}
                            onChange={(e) => setFilterOptions((prev) =>
                                ({ ...prev, parties: { ...prev.parties, republican: e.target.checked } }))
                            }
                        />
                        <span className={styleCheckboxButton}>Republicans</span>
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Type</legend>
                    <label>
                        <input
                            className='peer sr-only' type='checkbox'
                            checked={filterOptions.types.rep}
                            onChange={(e) => setFilterOptions((prev) =>
                                ({ ...prev, types: { ...prev.types, rep: e.target.checked } }))
                            }
                        />
                        <span className={styleCheckboxButton}>Representatives</span>
                    </label>
                    <label>
                        <input className='peer sr-only' type='checkbox'
                            checked={filterOptions.types.sen}
                            onChange={(e) => setFilterOptions((prev) =>
                                ({ ...prev, types: { ...prev.types, sen: e.target.checked } }))
                            }
                        />
                        <span className={styleCheckboxButton}>Senators</span>
                    </label>
                </fieldset>
            </div>
        </div>
    );
}
