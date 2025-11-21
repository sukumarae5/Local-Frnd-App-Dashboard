// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import UserListPage from "./pages/users/UsersListPage";
import UserEditFormDesign from "./pages/users/UserEditFormDesign";
import PhotoListPage from "./pages/photos/PhotoListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect to user list inside dashboard */}
        <Route
          path="/"
          element={<Navigate to="/dashboard/userlistpage" replace />}
        />

        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* When hitting /dashboard directly, go to userlistpage */}
          <Route index element={<Navigate to="userlistpage" replace />} />

          {/* User list */}
          <Route path="userlistpage" element={<UserListPage />} />

          {/* Edit user */}
          <Route path="userlistpage/edit" element={<UserEditFormDesign />} />

          {/* Photos list (under dashboard) */}
          <Route path="photolistpage" element={<PhotoListPage />} />
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to="/dashboard/userlistpage" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
