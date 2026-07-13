import { useTableContext } from "../contexts/TableContext";
import { districts, states, territories } from "../types/states";
import debounce from "../util/debounce";



export default function DataTableControls() {
    const { filterOptions, setFilterOptions, searchInput, setSearchInput } = useTableContext();
    const debouncedSearch = debounce((value) =>
        setFilterOptions((prev) => ({ ...prev, search: value })), 300);

    return (
        <div id='controls_container'
            className='flex flex-col gap-1'>
            <label htmlFor='searchbox' className=''>
                Search
                <input id='searchbox'
                    type='text'
                    className='border rounded px-1'
                    placeholder='Jane Doe'
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                        debouncedSearch(e.target.value);
                    }}
                />
            </label>
            <div>
                <label htmlFor='filterState'>State</label>
                <select id='filterState'
                    className='border rounded px-1'>
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
            <div>
                <label htmlFor='filterDem'>Democrats</label>
                <input id='filterDem' type='checkbox'
                    checked={filterOptions.filters.Democrats}
                    onChange={(e) => setFilterOptions((prev) =>
                        ({ ...prev, filters: { ...prev.filters, Democrats: e.target.checked } }))
                    }
                />
                <label htmlFor='filterInd'>Independents</label>
                <input id='filterInd' type='checkbox'
                    checked={filterOptions.filters.Independents}
                    onChange={(e) => setFilterOptions((prev) =>
                        ({ ...prev, filters: { ...prev.filters, Independents: e.target.checked } }))
                    }
                />
                <label htmlFor='filterRep'>Republicans</label>
                <input id='filterRep' type='checkbox'
                    checked={filterOptions.filters.Republicans}
                    onChange={(e) => setFilterOptions((prev) =>
                        ({ ...prev, filters: { ...prev.filters, Republicans: e.target.checked } }))
                    }
                />
            </div>
            <div>
                <label htmlFor='filterReps'>Representatives</label>
                <input id='filterReps' type='checkbox'
                    checked={filterOptions.filters.Representatives}
                    onChange={(e) => setFilterOptions((prev) =>
                        ({ ...prev, filters: { ...prev.filters, Representatives: e.target.checked } }))
                    }
                />
                <label htmlFor='filterSens'>Senators</label>
                <input id='filterSens' type='checkbox'
                    checked={filterOptions.filters.Senators}
                    onChange={(e) => setFilterOptions((prev) =>
                        ({ ...prev, filters: { ...prev.filters, Senators: e.target.checked } }))
                    }
                />
            </div>
        </div >
    );
}
