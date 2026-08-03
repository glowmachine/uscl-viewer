import { useEffect, useRef, useState } from "react";
import { useTableContext } from "../../contexts/TableContext";
import { useSettingsContext } from "../../contexts/SettingsContext";

export default function ColumnSelector() {
    const { columns, setColumns } = useTableContext();
    const { savedColKeys, setSavedColKeys, writeSavedColKeys } = useSettingsContext();
    const [colSelectOpen, setColSelectOpen] = useState(false);
    const selectorPanel = useRef<HTMLDivElement>(null);

    function handleSelection(selectorKey: number, columnKey: string): void {
        setSelectedColKeys(prev => prev.map((val, index) =>
            index === selectorKey ? columnKey : val
        ));
    }

    function handleSaveButton(): void {
        const selectors = selectedColKeys.filter(k => k != '');
        const emptySelectors = selectedColKeys.filter(k => k == '');
        const selectorKeys = [...selectors, ...emptySelectors];
        setSelectedColKeys(selectorKeys);
        writeSelectedColKeys(selectorKeys);

        setColumns(prev => {
            //for each selected key, get the matching table col,
            //confirm that they exist,
            //then set their 'selected' property to true
            const showCols = selectedColKeys
                .map(selectedKey => prev.find(col => col.key === selectedKey))
                .filter(col => col !== undefined)
                .map(col => ({ ...col, selected: true }));
            //for each table col, get the columns that don't match the selected keys,
            //then set their 'selected' property to false
            const hideCols = prev
                .filter(col => !selectedColKeys.includes(col.key))
                .map(col => ({ ...col, selected: false }));
            return [...showCols, ...hideCols];
        });
        setColSelectOpen(false);
    }

    function handleCloseClick(e: MouseEvent) {
        if (selectorPanel.current && !selectorPanel.current
            .contains(e.target as Node)) setColSelectOpen(false);
    }

    function handleCloseEsc(e: KeyboardEvent) {
        if (e.key === 'Escape') setColSelectOpen(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseClick);
        document.addEventListener('keydown', handleCloseEsc);
        return () => {
            document.removeEventListener('mousedown', handleCloseClick);
            document.removeEventListener('keydown', handleCloseEsc);
        }
    }, [colSelectOpen]);

    return (<>
        <button
            onClick={() => setColSelectOpen(prev => !prev)}>
            <span className='material-symbols-outlined'
                style={{ fontVariationSettings: `'FILL' ${colSelectOpen ? 1 : 0}` }}
            >
                view_column
            </span>
        </button>

        {colSelectOpen && <div className='fixed inset-0 z-100 bg-gray-500/50
                grid place-items-center'>

            <div ref={selectorPanel}
                className='w-[max(20rem,25rem)] bg-yellow-300 rounded p-3 pb-6
                flex flex-col'>
                <button className='self-end flex place-items-center
                aspect-square rounded-full hover:bg-white'
                    onClick={() => setColSelectOpen(false)}>
                    <span className='material-symbols-outlined'>
                        close
                    </span>
                </button>
                <h2 className='font-bold text-xl mx-2 mb-2'>Change visible columns</h2>
                <p className='px-10'>Small screens may need to scroll right to view all columns.</p>
                <div className='m-5 flex flex-col gap-1'>
                    {selectedColKeys.map((_, index) =>
                        <div className='flex justify-between'
                            key={`selector-${index}`}>
                            <span>{index + 1}.</span>
                            <select className={`w-9/10 border rounded px-1 
                                ${index === 0 ? "text-gray-500" : ''}`}
                                disabled={index === 0}
                                value={selectedColKeys[index]}
                                onChange={e => handleSelection(index, e.target.value)}>
                                <option value=''>-</option>
                                {columns.filter(col => col.key === selectedColKeys[index]
                                    || !selectedColKeys.includes(col.key))
                                    .map(option =>
                                        <option value={option.key}
                                            key={option.key}>
                                            {option.label}
                                        </option>
                                    )}
                            </select>
                        </div>
                    )}
                </div>
                <button className='self-center w-1/3 border rounded hover:bg-gray-300 active:bg-gray-500'
                    onClick={handleSaveButton}>
                    Save</button>
            </div>
        </div>}
    </>);
}