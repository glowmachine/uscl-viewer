import { createBrowserRouter } from "react-router";
import App from "./App";
import DetailsRoute from "./pages/DetailsRoute";
import Table from "./components/DataTable/Table";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
    {
        path: '/', element: <App />,
        children: [
            { index: true, element: <Table /> },
            { path: '/table', element: <Table /> },
            { path: '/details/:bioguide', element: <DetailsRoute /> },
            { path: '*', element: <NotFound /> },
        ]
    }
]);