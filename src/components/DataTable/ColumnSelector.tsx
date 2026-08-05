import { useEffect, useRef, useState } from "react";
import { bioCols, idCols, nameCols, termCols, useTableContext } from "../../contexts/TableContext";
import { useSettingsContext } from "../../contexts/SettingsContext";

export default function ColumnSelector() {
    const { columns, setColumns } = useTableContext();
    const { savedColKeys, setSavedColKeys, writeSavedColKeys } = useSettingsContext();
    const [draftColKeys, setDraftColKeys] = useState(savedColKeys);
    const [colSelectOpen, setColSelectOpen] = useState(false);
    const selectorPanel = useRef<HTMLDivElement>(null);

    function handleSelection(selectorKey: number, columnKey: string): void {
        setDraftColKeys(prev => prev.map((val, index) =>
            index === selectorKey ? columnKey : val
        ));
    }

    function handleSaveButton(): void {
        const selectors = draftColKeys.filter(k => k != '');
        const emptySelectors = draftColKeys.filter(k => k == '');
        const selectorKeys = [...selectors, ...emptySelectors];

        setDraftColKeys(selectorKeys);
        setSavedColKeys(selectorKeys);
        writeSavedColKeys(selectorKeys);
        setColumns(prev => {
            //for each selector key, get matching table cols,
            //filter out 'undefined' results when .find couldn't find the key,
            //set each col's 'selected' property to true
            const showCols = selectors
                .map(selectorKey => prev.find(col => col.key === selectorKey))
                .filter(col => col !== undefined)
                .map(col => ({ ...col, selected: true }));
            //for each table col, get the columns that don't match the saved keys,
            //set their 'selected' property to false
            const hideCols = prev
                .filter(col => !selectors.includes(col.key))
                .map(col => ({ ...col, selected: false }));
            return [...showCols, ...hideCols];
        });

        setColSelectOpen(false);
    }

    function handleCloseClick(e: MouseEvent) {
        if (selectorPanel.current && !selectorPanel.current
            .contains(e.target as Node)) {
            setDraftColKeys(savedColKeys);
            setColSelectOpen(false);
        }
    }

    function handleCloseEsc(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            setDraftColKeys(savedColKeys);
            setColSelectOpen(false);
        }
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
                    {draftColKeys.map((_, index) =>
                        <div className='flex justify-between'
                            key={`selector-${index}`}>
                            <span>{index + 1}.</span>
                            <select className={`w-9/10 border rounded px-1 
                                ${index === 0 ? "text-gray-500" : ''}`}
                                disabled={index === 0}
                                value={draftColKeys[index]}
                                onChange={e => handleSelection(index, e.target.value)}>
                                <option value=''>-</option>
                                <optgroup label='id'>
                                    {idCols.filter(col => col.key === draftColKeys[index]
                                        || !draftColKeys.includes(col.key))
                                        .map(option =>
                                            <option value={option.key}
                                                key={option.key}>
                                                {option.label}
                                            </option>
                                        )}
                                </optgroup>
                                <optgroup label='name'>
                                    {nameCols.filter(col => col.key === draftColKeys[index]
                                        || !draftColKeys.includes(col.key))
                                        .map(option =>
                                            <option value={option.key}
                                                key={option.key}>
                                                {option.label}
                                            </option>
                                        )}
                                </optgroup>
                                <optgroup label='bio'>
                                    {bioCols.filter(col => col.key === draftColKeys[index]
                                        || !draftColKeys.includes(col.key))
                                        .map(option =>
                                            <option value={option.key}
                                                key={option.key}>
                                                {option.label}
                                            </option>
                                        )}
                                </optgroup>
                                <optgroup label='term (current)'>
                                    {termCols.filter(col => col.key === draftColKeys[index]
                                        || !draftColKeys.includes(col.key))
                                        .map(option =>
                                            <option value={option.key}
                                                key={option.key}>
                                                {option.label}
                                            </option>
                                        )}
                                </optgroup>
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