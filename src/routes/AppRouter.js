import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import UserListPage from "../pages/users/UsersListPage";
import PhotoListPage from "../pages/photos/PhotoListPage";
import UserEditFormDesign from "../pages/users/UserEditFormDesign";
import PhotoForms from "../components/forms/PhotoForms";
import LanguagePage from "../pages/Languages/LanguagePage";
import LanguageAddForm from "../pages/Languages/LanguageAddForm";
import LanguageEditForm from "../pages/Languages/LanguageEditForm"; // ✅ ADD

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
      {
        path: "photolistpage/:photoId/edit",
        element: <PhotoForms />,
      },
      {
        path: "photolistpage/new",
        element: <PhotoForms />,
      },

      // ================= LANGUAGES =================
      {
        path: "languagepage",
        element: <LanguagePage />,
      },
      {
        path: "languagepage/add",
        element: <LanguageAddForm />,
      },
      {
        path: "languagepage/edit/:id",   // ✅ THIS WAS MISSING
        element: <LanguageEditForm />,
      },
    ],
  },
]);

export default AppRouter;
