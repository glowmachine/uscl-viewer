import { useLocation } from "react-router";
import Search from "./Search";

export default function Header() {
    const isRoot: boolean = useLocation().pathname == '/';

    return (
        <header className='bg-red-200 px-3 py-1 flex justify-between items-center gap-20'>
            <div className='flex items-center gap-3'>
                <div className='text-5xl'>🇺🇸</div>
                <h1 className='text-2xl'>US Congress Legislators</h1>
            </div>
            {isRoot && <Search />}
            <div className='flex gap-3'>
                <button className='size-6 aspect-square outline'>A</button>
                <button className='size-6 aspect-square outline'>B</button>
                <button className='size-6 aspect-square outline'>C</button>
            </div>
        </header>
    );
}