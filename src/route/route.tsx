import { Navigate, RouteObject } from "react-router";
import { LoginRedirect } from "components/LoginRedirect";
import { NotFound } from "components/NotFound";
import { Logout } from "components/Logout";
import { Login } from "pages/Login";
import { AdminApp } from "pages/AdminApp";
import { UserApp } from "pages/UserApp";
import { UserIndex } from "pages/UserIndex";
import { UserHome } from "pages/UserHome";
import { UserAppointment } from "pages/UserAppointment";
import { UserQRCode } from "pages/UserQRCode";
import { UserResult } from "pages/UserResult";

export const routeConfig: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'logout',
                element: <Logout />
            },
            {
                path: 'admin/',
                children: [
                    {
                        path: 'index',
                        element: <AdminApp />
                    },
                    {
                        path: '',
                        element: <Navigate to="./index" />
                    },
                    {
                        path: '*',
                        element: <NotFound />
                    }
                ]
            },
            {
                path: 'user/',
                element: <UserApp />,
                children: [
                    {
                        path: 'index',
                        element: <UserIndex />
                    },
                    {
                        path: 'home',
                        element: <UserHome />
                    },
                    {
                        path: 'appointment',
                        element: <UserAppointment />
                    },
                    {
                        path: 'qrcode',
                        element: <UserQRCode />
                    },
                    {
                        path: 'result',
                        element: <UserResult />
                    },
                    {
                        path: '',
                        element: <Navigate to="./index" />
                    },
                    {
                        path: '*',
                        element: <NotFound />
                    }
                ]
            },
            {
                path: '',
                element: <LoginRedirect />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
]