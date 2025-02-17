/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import EventForm from './Pages/EventForm';
import UserManagement from './Pages/UserManagment';
// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '/',
        element: <Login />,
        children: [
          { path: '/', element: <Navigate to="/login" /> },
        ],
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'addEvent',
        element: <EventForm />
      },
      {
        path: 'addEvent/:id',
        element: <EventForm />
      },
      {
        path: 'users',
        element: <UserManagement />
      }
    ]);
}
