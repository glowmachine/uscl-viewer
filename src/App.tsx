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
        <div className='h-screen flex flex-col dark:text-zinc-200'>
          <Header />
          <main className='min-h-0 h-full p-6 flex flex-col bg-zinc-100 dark:bg-zinc-900'>
            <div className='relative h-full rounded-3xl pt-5 bg-white dark:bg-zinc-800'>
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