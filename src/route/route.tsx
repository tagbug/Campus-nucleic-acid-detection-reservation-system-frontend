import {Navigate, RouteObject} from "react-router";
import {LoginRedirect} from "components/LoginRedirect";
import {NotFound} from "components/NotFound";
import {Logout} from "components/Logout";
import {Login} from "pages/Login";
import {AdminApp} from "pages/AdminApp";
import {UserApp} from "pages/UserApp";
import {UserIndex} from "pages/UserIndex";
import {UserHome} from "pages/UserHome";
import {UserAppointment} from "pages/UserAppointment";
import {UserQRCode} from "pages/UserQRCode";
import {UserResult} from "pages/UserResult";
import {SiteMange} from "pages/SiteMange";
import {AddTask} from "pages/AddTask";
import {TaskMange} from "pages/TaskMange";
import {AddResult} from "pages/AddResult";
import {ResultMange} from "pages/ResultMange";

export const routeConfig: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'logout',
                element: <Logout/>
            },
            {
                path: 'admin/',
                children: [
                    {
                        path: 'index',
                        element: <AdminApp/>
                    },
                    {
                        path: 'site/',
                        children: [
                            {
                                path: '',
                                element: <SiteMange/>,
                            },
                            {
                                path: ':siteId&:address/',
                                element: <TaskMange/>
                            },
                            {
                                path: 'add/',
                                children: [
                                    {
                                        path: ':siteId&:address',
                                        element: <AddTask/>,
                                    }
                                ]
                            },
                        ]

                    },
                    {
                        path: 'result/',
                        children: [
                            {
                                path: 'add',
                                element: <AddResult/>,
                            },
                            {
                                path: '',
                                element: <ResultMange/>,
                            },
                        ]
                    },
                    {
                        path: '',
                        element: <Navigate to="./index"/>
                    },
                    {
                        path: '*',
                        element: <NotFound/>
                    }
                ]
            },
            {
                path: 'user/',
                element: <UserApp/>,
                children: [
                    {
                        path: 'index',
                        element: <UserIndex/>
                    },
                    {
                        path: 'home',
                        element: <UserHome/>
                    },
                    {
                        path: 'appointment',
                        element: <UserAppointment/>
                    },
                    {
                        path: 'qrcode',
                        element: <UserQRCode/>
                    },
                    {
                        path: 'result',
                        element: <UserResult/>
                    },
                    {
                        path: '',
                        element: <Navigate to="./index"/>
                    },
                    {
                        path: '*',
                        element: <NotFound/>
                    }
                ]
            },
            {
                path: '',
                element: <LoginRedirect/>
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    }
]