import { NavLink, useLocation } from "react-router";
import Search from "./Search";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Header() {
    const isRoot: boolean = useLocation().pathname == '/';
    const isAbout: boolean = useLocation().pathname == '/about';

    return (
        <header className='h-18 px-5 py-2 flex justify-between items-center gap-4 bg-white dark:bg-zinc-800'>
            <NavLink to='/'>
                <div className='flex items-center gap-2'>
                    <div className='text-5xl'>🇺🇸</div>
                    <h1 className='text-2xl'>USCL Viewer</h1>
                </div>
            </NavLink>
            {isRoot && <Search />}
            <div className='flex gap-2'>
                <DarkModeSwitch />
                {!isAbout && <NavLink to='/about'
                    className='size-10 rounded-full grid place-items-center hover:cursor-pointer font-serif text-2xl italic
                        hover:bg-zinc-200 dark:hover:bg-zinc-700'
                >i</NavLink>}
            </div>
        </header>
    );
}