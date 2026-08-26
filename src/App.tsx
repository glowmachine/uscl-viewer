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
        <div className='h-screen flex flex-col'>
          <Header />
          <main className='min-h-0 h-full p-6 flex flex-col bg-gray-300'>
            <div className='relative h-full rounded-3xl pt-5 bg-white'>
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