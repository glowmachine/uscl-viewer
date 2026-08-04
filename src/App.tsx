import { Outlet } from 'react-router';
import './App.css';
import { DataProvider } from './contexts/DataContext';
import { TableProvider } from './contexts/TableContext';
import { SettingsProvider } from './contexts/SettingsContext';

export default function App() {
  return (
    <SettingsProvider>
      <div className='h-screen flex flex-col'>
        <header className='bg-red-200'>hello world</header>
        <main className='min-h-0 flex flex-row'>
          <div className='max-w-full flex-1'>
            <DataProvider>
              <TableProvider>
                <Outlet />
              </TableProvider>
            </DataProvider>
          </div>
        </main>
        <footer className='bg-red-200'>goodbye world</footer>
      </div>
    </SettingsProvider>
  )
}