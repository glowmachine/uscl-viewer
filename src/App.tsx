import { Outlet } from 'react-router';
import './App.css';
import { DataProvider } from './contexts/DataContext';
import { TableProvider } from './contexts/TableContext';

export default function App() {
  return (
    <div className='h-screen grid grid-cols-4 grid-rows-[auto_1fr_auto]'>
      <header className='row-start col-span-full bg-red-200'>hello world</header>
      <section className='row-start-2 row-span-full bg-blue-200'>placeholder</section>
      <main className='row-start-2 col-span-3 overflow-auto'>
        <DataProvider>
          <TableProvider>
            {/* <div className='flex flex-col gap-1'> */}
            <Outlet />
            {/* </div> */}
          </TableProvider>
        </DataProvider>
      </main>
      <footer className='row-end col-span-full bg-red-200'>goodbye world</footer>
    </div>
  )
}