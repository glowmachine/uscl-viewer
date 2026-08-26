import { NavLink, useLocation } from "react-router";
import Search from "./Search";

export default function Header() {
    const isRoot: boolean = useLocation().pathname == '/';
    const isAbout: boolean = useLocation().pathname == '/about';

    return (
        <header className='bg-red-200 h-18 px-5 py-2 flex justify-between items-center gap-4'>
            <NavLink to='/'>
                <div className='flex items-center gap-2'>
                    <div className='text-5xl'>🇺🇸</div>
                    <h1 className='text-2xl'>USCL Viewer</h1>
                </div>
            </NavLink>
            {isRoot && <Search />}
            {!isAbout && <NavLink to='/about' className='size-10 rounded-full grid place-items-center hover:cursor-pointer bg-red-300'>?</NavLink>}
        </header>
    );
}