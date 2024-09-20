import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Login from "../layouts/login/Login";
import Main from "../pages/Main";
import RootLayout from "../pages/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <RootLayout>
                <Outlet />
            </RootLayout>
        ),
        children: [
            {
                path: "/home",
                element: <Main />
            },
            {
                path: "/",
                element: <Login />
            }
        ]
    }
]);

export default router;