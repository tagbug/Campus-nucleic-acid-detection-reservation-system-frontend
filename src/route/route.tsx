import React from "react";
import { Navigate, Outlet, RouteObject } from "react-router";
import { LoginRedirect } from "components/LoginRedirect";
import { NotFound } from "components/NotFound";
import { Logout } from "components/Logout";
import { Login } from "pages/Login";
import { AdminApp } from "pages/AdminApp";
import { UserApp } from "pages/UserApp";

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