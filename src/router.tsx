import { createBrowserRouter } from "react-router";
import App from "./App";
import MemberRoute from "./pages/MemberRoute";
import Table from "./components/List/Table";
import NotFound from "./components/NotFound";
import About from "./components/About";

export const router = createBrowserRouter([
    {
        path: '/', element: <App />,
        children: [
            { index: true, element: <Table /> },
            { path: '/table', element: <Table /> },
            { path: '/details/:bioguide', element: <MemberRoute /> },
            { path: '/about', element: <About /> },
            { path: '*', element: <NotFound /> },
        ]
    }
]);