import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Dashboardmain from "../pages/dashboard/Dashboardmain";
import UserListPage from "../pages/users/UsersListPage";
import PhotoListPage from "../pages/photos/PhotoListPage";
import UserEditFormDesign from "../pages/users/UserEditFormDesign";
import PhotoForms from "../components/forms/PhotoForms";
import LanguagePage from "../pages/Languages/LanguagePage";
import LanguageAddForm from "../pages/Languages/LanguageAddForm";
import LanguageEditForm from "../pages/Languages/LanguageEditForm";
import CallsListPage from "../pages/Calls/CallsListPage";
import CoinsListPage from "../pages/Coins/CoinsListPage";
import OffersListPage from "../pages/Offers/OffersListPage";
import InterestPage from "../pages/Interest/InterestPage";
import LifestylePage from "../pages/Lifestlye/LifestylePage";
import LifestylecategoryPage from "../pages/Lifestylecategory/LifestylecategoryPage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Dashboardmain />,
      },
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
      {
        path: "languagepage",
        element: <LanguagePage />,
      },
      {
        path: "languagepage/add",
        element: <LanguageAddForm />,
      },
      {
        path: "languagepage/edit/:id",
        element: <LanguageEditForm />,
      },
      {
        path: "callspage",
        element: <CallsListPage/>,
      },
      {
        path: "Coinspage",
        element: <CoinsListPage/>,
      },
      {
        path: "Offerspage",
        element: <OffersListPage/>,
      },
      {
        path:"interestpage",
        element:<InterestPage/>
      },
      {
         path:"lifestylepage",
        element:<LifestylePage/>
      },
      {
        path:"lifestylecategorypage",
        element:<LifestylecategoryPage/>
      }
      
       
      
    ],
  },
]);

export default AppRouter;