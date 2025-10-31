import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import UserListPage from "./pages/users/UsersListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="userlistpage" element={<UserListPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard/userlistpage" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
