export default function DataTableControls() {
    return (
        <div id='controls_container'
            className='flex flex-row items-center gap-1'>
            <label htmlFor='searchbox'>Search</label>
            <input
                id='searchbox'
                type='text'
                className='border rounded px-1'
                placeholder='Jane Doe' />
            <label htmlFor='historical'>Show Historical</label>
            <input id='historical' type='checkbox' />
        </div>
    );
}
