import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import UserListPage from '../pages/users/UsersListPage'
import PhotoListPage from '../pages/photos/PhotoListPage'
import UserEditFormDesign from '../pages/users/UserEditFormDesign'

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "userlistpage",
        element: <UserListPage />,
      },
      {
        path: "userlistpage/edit",
        element: <UserEditFormDesign />,
      },
      {
        path: "photolistpage",
        element: <PhotoListPage />,
      },
    ],
  },
]);


  

export default AppRouter
