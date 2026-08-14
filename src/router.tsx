import { createBrowserRouter } from "react-router";
import App from "./App";
import DetailsRoute from "./pages/DetailsRoute";
import Table from "./components/List/Table";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";

export const router = createBrowserRouter([
    {
        path: '/', element: <App />,
        children: [
            { index: true, element: <Table /> },
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/table', element: <Table /> },
            { path: '/details/:bioguide', element: <DetailsRoute /> },
            { path: '*', element: <NotFound /> },
        ]
    }
]);