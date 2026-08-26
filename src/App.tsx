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
      <TableProvider>
        <div className='h-screen flex flex-col'>
          <Header />
          <main className='min-h-0 w-full bg-gray-300'>
            <div className='p-6 flex flex-col min-w-0 max-h-full h-screen'>
              <div className='relative bg-white rounded-3xl h-full'>
                <DataProvider>
                  <Outlet />
                </DataProvider>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </TableProvider>
    </SettingsProvider>
  )
}