import './App.css';
import DataTable from './components/DataTable';
import DataTableControls from './components/DataTableControls';
import { DataProvider } from './contexts/DataContext';
import { TableProvider } from './contexts/TableContext';

export default function App() {
  // const { data, isLoading, error } = useData('executive.json');
  return (
    <div className='max-h-screen flex flex-col'>
      <header className='bg-red-200'>hello world</header>
      <DataProvider>
        <TableProvider>
          <div className='min-h-0 p-1 flex flex-col gap-1'>
            <DataTable />
          </div>
        </TableProvider>
      </DataProvider>
      <footer className='bg-red-200'>goodbye world</footer>
    </div>
  )
}