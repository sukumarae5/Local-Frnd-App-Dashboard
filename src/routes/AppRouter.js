// src/routes/AppRouter.js

import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import Dashboardmain from "../pages/dashboard/Dashboardmain";

import UserListPage from "../pages/users/UsersListPage";
import UserEditFormDesign from "../pages/users/UserEditFormDesign";

import PhotoListPage from "../pages/photos/PhotoListPage";
import PhotoForms from "../components/forms/PhotoForms";

import LanguagePage from "../pages/Languages/LanguagePage";
import LanguageAddForm from "../pages/Languages/LanguageAddForm";
import LanguageEditForm from "../pages/Languages/LanguageEditForm";

import CallsListPage from "../pages/Calls/CallsListPage";
import CoinsListPage from "../pages/Coins/CoinsListPage";

import OfferListPage from "../pages/Offers/OffersListPage";
import OfferCreatePage from "../pages/Offers/OfferCreatePage";
import OfferEditPage from "../pages/Offers/OfferEditPage";

import InterestPage from "../pages/Interest/InterestPage";
import LifestylePage from "../pages/Lifestlye/LifestylePage";
import LifestylecategoryPage from "../pages/Lifestylecategory/LifestylecategoryPage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
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
        path: "photolistpage/new",
        element: <PhotoForms />,
      },
      {
        path: "photolistpage/:photoId/edit",
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
        element: <CallsListPage />,
      },
      {
        path: "coinspage",
        element: <CoinsListPage />,
      },

      // Offers
      {
        path: "offerspage",
        element: <OfferListPage />,
      },
      {
        path: "offerspage/create",
        element: <OfferCreatePage />,
      },
      {
        path: "offerspage/edit/:id",
        element: <OfferEditPage />,
      },

      {
        path: "interestpage",
        element: <InterestPage />,
      },
      {
        path: "lifestylepage",
        element: <LifestylePage />,
      },
      {
        path: "lifestylecategorypage",
        element: <LifestylecategoryPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default AppRouter;