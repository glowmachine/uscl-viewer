import { Outlet } from 'react-router';
import './App.css';
import { DataProvider } from './contexts/DataContext';
import { TableProvider } from './contexts/TableContext';

export default function App() {
  return (
    <div className='max-h-screen flex flex-col'>
      <header className='bg-red-200'>hello world</header>
      <main className='flex flex-col'>
        <DataProvider>
          <TableProvider>
            <div className='min-h-0 p-1 flex flex-col gap-1'>
              <Outlet />
            </div>
          </TableProvider>
        </DataProvider>
      </main>
      <footer className='bg-red-200'>goodbye world</footer>
    </div>
  )
}