export default function DataTableControls() {
    return (
        <div id='controls_container'
            className='flex flex-col gap-1'>
            <label htmlFor='searchbox' className=''>
                Search
                <input id='searchbox'
                    type='text'
                    className='border rounded px-1'
                    placeholder='Jane Doe' />
            </label>
            {/* <label htmlFor='filterState'>State</label>
            <select id='filterState'
                className='border rounded px-1'>
                <optgroup label='States'>
                    <option value='ME'>Maine</option>
                    <option value='MA'>Massachusetts</option>
                    <option value='MI'>Michigan</option>
                </optgroup>
                <optgroup label='Territories'>
                    <option value='VI'>US Virgin Islands</option>
                    <option value='GU'>Guam</option>
                </optgroup>
                <optgroup label='Capitol'>
                    <option value='DC'>District of Columbia</option>
                </optgroup>
            </select>
            <div>
                <label htmlFor='filterDem'>Democrats</label>
                <input id='filterDem' type='checkbox' checked />
                <label htmlFor='filterInd'>Independents</label>
                <input id='filterInd' type='checkbox' checked />
                <label htmlFor='filterRep'>Republicans</label>
                <input id='filterRep' type='checkbox' checked />
            </div>
            <div>
                <label htmlFor='filterSens'>Senators</label>
                <input id='filterSens' type='checkbox' checked />
                <label htmlFor='filterReps'>Representatives</label>
                <input id='filterReps' type='checkbox' checked />
            </div> */}
        </div >
    );
}
