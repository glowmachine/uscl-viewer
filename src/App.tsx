import { Outlet } from 'react-router';
import './App.css';
import { DataProvider } from './contexts/DataContext';
import { TableProvider } from './contexts/TableContext';
import { SettingsProvider } from './contexts/SettingsContext';
import Header from './components/Header';

export default function App() {
  return (
    <SettingsProvider>
      <TableProvider>
        <div className='h-dvh flex flex-col text-black dark:text-zinc-200'>
          <div className='sticky top-0 z-99 touch-none'><Header /></div>
          <main className='min-h-0 h-full sm:p-6 flex flex-col bg-zinc-100 dark:bg-zinc-900'>
            <div className='relative h-full sm:rounded-3xl sm:pt-5
              bg-white dark:bg-zinc-800
              dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-700'>
              <DataProvider>
                <Outlet />
              </DataProvider>
            </div>
          </main>
        </div>
      </TableProvider>
    </SettingsProvider>
  )
}