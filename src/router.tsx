import { createBrowserRouter } from "react-router";
import App from "./App";
import DetailsRoute from "./pages/DetailsRoute";
import DataTable from "./components/DataTable";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
    {
        path: '/', element: <App />,
        children: [
            { index: true, element: <DataTable /> },
            { path: '/details/:bioguide', element: <DetailsRoute /> },
            { path: '*', element: <NotFound /> },
        ]
    }
]);