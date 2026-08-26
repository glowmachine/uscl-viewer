import { useTableContext } from "../../contexts/TableContext";
import { districts, states, territories } from "../../types/states";

const styleCheckboxButton = `rounded-full border
                            px-2 py-1 transition-colors select-none

                                 text-zinc-300      peer-checked:text-zinc-100      bg-zinc-100      peer-checked:bg-zinc-500
                            dark:text-zinc-500 dark:peer-checked:text-zinc-700 dark:bg-zinc-700 dark:peer-checked:bg-zinc-300

                            peer-hover:ring-2 peer-hover:ring-blue-700
                            peer-focus-visible:ring-2 peer-focus-visible:ring-blue-700`;

export default function TableFilters() {
    const { filterOptions, setFilterOptions } = useTableContext();

    return (
        <div id='filters_container'
            className='w-full flex flex-row flex-wrap items-center justify-evenly gap-1
                *:border *:rounded *:px-2 *:pt-2 *:pb-4 *:flex *:gap-1 *:flex *:flex-col *:items-center'>
            <fieldset>
                <legend>State</legend>
                <label className='sr-only' htmlFor='filterState'>State</label>
                <select id='filterState'
                    className='border rounded px-1 w-full'
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
            <fieldset>
                <legend>Party</legend>
                <label>
                    <input type='checkbox'
                        className='peer sr-only'
                        checked={filterOptions.parties.democrat}
                        onChange={(e) => setFilterOptions((prev) =>
                            ({ ...prev, parties: { ...prev.parties, democrat: e.target.checked } }))
                        }
                    />
                    <span className={styleCheckboxButton}>Democrats</span>
                </label>
                <label>
                    <input type='checkbox'
                        className='peer sr-only'
                        checked={filterOptions.parties.independent}
                        onChange={(e) => setFilterOptions((prev) =>
                            ({ ...prev, parties: { ...prev.parties, independent: e.target.checked } }))
                        }
                    />
                    <span className={styleCheckboxButton}>Independents</span>
                </label>
                <label>
                    <input type='checkbox'
                        className='peer sr-only'
                        checked={filterOptions.parties.republican}
                        onChange={(e) => setFilterOptions((prev) =>
                            ({ ...prev, parties: { ...prev.parties, republican: e.target.checked } }))
                        }
                    />
                    <span className={styleCheckboxButton}>Republicans</span>
                </label>
            </fieldset>
        </div>
    );
}