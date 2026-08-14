import { useEffect, useRef, useState } from "react";
import { bioCols, idCols, nameCols, socialCols, termCols, useTableContext } from "../../contexts/TableContext";
import { defaultSavedColKeys, useSettingsContext } from "../../contexts/SettingsContext";
import { buttonStyle } from "./TableControls";

export default function ColumnSelector() {
    const { setColumns } = useTableContext();
    const { savedColKeys, setSavedColKeys, writeSavedColKeys } = useSettingsContext();
    const [draftColKeys, setDraftColKeys] = useState(savedColKeys);
    const [colSelectOpen, setColSelectOpen] = useState(false);
    const selectorPanel = useRef<HTMLDivElement>(null);

    function handleSelection(selectorKey: number, columnKey: string): void {
        setDraftColKeys(prev => prev.map((val, index) =>
            index === selectorKey ? columnKey : val
        ));
    }

    function handleDoneButton(): void {
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

    function handleResetButton(): void {
        setDraftColKeys(defaultSavedColKeys);
    }

    function cancelSelection(): void {
        setDraftColKeys(savedColKeys);
        setColSelectOpen(false);
    }

    function handleCloseClick(e: MouseEvent) {
        if (selectorPanel.current && !selectorPanel.current
            .contains(e.target as Node)) {
            cancelSelection();
        }
    }

    function handleCloseEsc(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            cancelSelection();
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
        <button className={buttonStyle}
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
                className='w-[max(20rem,25rem)] text-sm bg-white rounded-[2rem] p-5 flex flex-col'>
                <h2 className='text-2xl pb-5'>Change visible columns</h2>
                <p className='pb-2.5'>Smaller screens may need to scroll right to view more columns.</p>
                <div className='w-50 flex flex-col'>
                    {draftColKeys.map((value, index) =>
                        <div className='flex justify-between gap-1 *:p-2' key={`selector-${index}`}>
                            <span>{index + 1}.</span>
                            <select className={`flex-1 rounded-t
                                ${index === 0 ? 'text-gray-400' : 'hover:bg-gray-200 border-b-1'}`}
                                disabled={index === 0}
                                value={value}
                                onChange={e => handleSelection(index, e.target.value)}
                            >
                                <option value='name' disabled>Name (default)</option>
                                <option value=''>-</option>

                                <optgroup label='id'>
                                    {idCols.map(option =>
                                        <option value={option.key}
                                            key={option.key}
                                            disabled={draftColKeys.includes(option.key)}>
                                            {option.label}
                                        </option>
                                    )}
                                </optgroup>
                                <optgroup label='name'>
                                    {nameCols.map(option =>
                                        <option value={option.key}
                                            key={option.key}
                                            disabled={draftColKeys.includes(option.key)}>
                                            {option.label}
                                        </option>
                                    )}
                                </optgroup>
                                <optgroup label='bio'>
                                    {bioCols.map(option =>
                                        <option value={option.key}
                                            key={option.key}
                                            disabled={draftColKeys.includes(option.key)}>
                                            {option.label}
                                        </option>
                                    )}
                                </optgroup>
                                <optgroup label='term (current)'>
                                    {termCols.map(option =>
                                        <option value={option.key}
                                            key={option.key}
                                            disabled={draftColKeys.includes(option.key)}>
                                            {option.label}
                                        </option>
                                    )}
                                </optgroup>
                                <optgroup label='social'>
                                    {socialCols.map(option =>
                                        <option value={option.key}
                                            key={option.key}
                                            disabled={draftColKeys.includes(option.key)}>
                                            {option.label}
                                        </option>
                                    )}
                                </optgroup>
                            </select>
                        </div>
                    )}
                </div>
                <div className='mx-2.5 mt-5 flex justify-between gap-1'>
                    <button className='px-3 py-2 self-center rounded-full hover:bg-gray-200'
                        onClick={handleResetButton}>
                        Reset</button>
                    <div className='flex gap-2'>
                        <button className='px-3 py-2 self-center rounded-full hover:bg-gray-200'
                            onClick={() => cancelSelection()}>
                            Cancel</button>
                        <button className='px-3 py-2 self-center rounded-full hover:bg-gray-200'
                            onClick={handleDoneButton}>
                            Done</button>
                    </div>
                </div>
            </div>
        </div>}
    </>);
}