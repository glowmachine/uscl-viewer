import { Outlet } from 'react-router';
import './App.css';
import { DataProvider } from './contexts/DataContext';
import { TableProvider } from './contexts/TableContext';
import { SettingsProvider } from './contexts/SettingsContext';

export default function App() {
  return (
    <div className='h-screen grid grid-cols-4 grid-rows-[auto_1fr_auto]'>
      <header className='row-start col-span-full bg-red-200'>hello world</header>
      <section className='row-start-2 row-span-full bg-blue-200'>placeholder</section>
      <main className='row-start-2 col-span-3 overflow-hidden'>
        <DataProvider>
          <TableProvider>
            <Outlet />
          </TableProvider>
        </DataProvider>
      </main>
      <footer className='row-end col-span-full bg-red-200'>goodbye world</footer>
    </div>
  )
}