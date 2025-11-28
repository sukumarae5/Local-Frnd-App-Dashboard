import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import UserListPage from '../pages/users/UsersListPage'
import PhotoListPage from '../pages/photos/PhotoListPage'
import UserEditFormDesign from '../pages/users/UserEditFormDesign'
import PhotoForms from '../components/forms/PhotoForms'

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

      // ✅ ADD EDIT ROUTE FOR PHOTO FORMS
      {
        path: "photolistpage/:photoId/edit",
        element: <PhotoForms />,
      },

      // Optional: create new photo
      {
        path: "photolistpage/new",
        element: <PhotoForms />,
      },
    ],
  },
]);

export default AppRouter
