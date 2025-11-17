import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import UserListPage from "./pages/users/UsersListPage";
import PhotoListPage from "./pages/photos/PhotoListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard/userlistpage" replace />} />

        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="userlistpage" replace />} />
          {/* ✅ Single page handles list + modal URLs (/add, /edit) */}
          <Route path="userlistpage/*" element={<UserListPage />} />
          
        </Route>
        <Route>
          <Route path="photolistpage/*" element={<PhotoListPage/>} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard/userlistpage" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
