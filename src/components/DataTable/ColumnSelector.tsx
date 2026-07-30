import { useEffect, useRef, useState } from "react";
import { useTableContext } from "../../contexts/TableContext";

export default function ColumnSelector() {
    const { columns, setColumns, selectedColKeys, setSelectedColKeys } = useTableContext();
    const [colSelectOpen, setColSelectOpen] = useState(false);
    const selectorPanel = useRef<HTMLDivElement>(null);

    function handleSelection(selectorKey: number, columnKey: string): void {
        setSelectedColKeys(prev => prev.map((val, index) =>
            index === selectorKey ? columnKey : val
        ))
    }

    function handleSaveButton(): void {
        setColumns(prev => {
            const selected = selectedColKeys
                .map(selectedKey => prev.find(col => col.key === selectedKey))
                .filter((col): col is typeof prev[number] => col !== undefined)
                .map(col => ({ ...col, selected: true }));
            const unselected = prev
                .filter(col => !selectedColKeys.includes(col.key))
                .map(col => ({ ...col, selected: false }));
            return [...selected, ...unselected];
        });
        tidyUpSelectedKeys();
    }

    function tidyUpSelectedKeys() {
        setSelectedColKeys(prev => {
            const selected = prev.filter(key => key !== '');
            const empty = prev.filter(key => key === '');;
            return [...selected, ...empty];
        });
        setColSelectOpen(false);
    }

    function handleClick(e: MouseEvent) {
        if (selectorPanel.current && !selectorPanel.current
            .contains(e.target as Node)) setColSelectOpen(false);
    }

    function handleEsc(e: KeyboardEvent) {
        if (e.key === 'Escape') setColSelectOpen(false);
    }

    useEffect(() => {
        setSelectedColKeys(prev => ['full', ...prev.slice(1)])

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleEsc);
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
        </div>
        }
    </>);
}