import { useSettingsContext } from "../contexts/SettingsContext";

export default function DarkModeSwitch() {
    const { darkMode, toggleDarkMode } = useSettingsContext();
    return (
        <label className='flex items-center select-none'>
            <input type='checkbox' className='sr-only' checked={darkMode} onChange={toggleDarkMode} />
            <div className='h-2 w-8 rounded-full flex items-center bg-zinc-200 dark:bg-zinc-700'>
                <div className={`size-5 outline rounded-full grid place-items-center ${darkMode
                    ? 'bg-black text-white'
                    : 'bg-white text-black ml-auto'}`
                }>
                    {darkMode
                        ? <span className='material-symbols-outlined text-sm'>dark_mode</span>
                        : <span className='material-symbols-outlined text-sm'>light_mode</span>}
                </div>
            </div>
        </label>
    );
}