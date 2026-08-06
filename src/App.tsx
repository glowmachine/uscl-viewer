import { Outlet } from 'react-router';
import './App.css';
import { DataProvider } from './contexts/DataContext';
import { TableProvider } from './contexts/TableContext';
import { SettingsProvider } from './contexts/SettingsContext';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <SettingsProvider>
      <div className='h-screen flex flex-col'>
        <Header />
        <main className='min-h-0 flex flex-row'>
          <div className='flex-1 min-w-0'>
            <DataProvider>
              <TableProvider>
                <Outlet />
              </TableProvider>
            </DataProvider>
          </div>
        </main>
        <Footer />
      </div>
    </SettingsProvider>
  )
}