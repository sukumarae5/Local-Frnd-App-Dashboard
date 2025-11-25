import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import UserListPage from "./pages/users/UsersListPage";
import PhotoListPage from "./pages/photos/PhotoListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard layout */}
        <Route path="/" element={<Dashboard />}>
          
          {/* User List + Edit path */}
          <Route path="/dashboard/userlistpage" element={<UserListPage />} />
          <Route path="/dashboard/userlistpage/edit" element={<UserListPage />} />

          {/* Other pages */}
          <Route path="/dashboard/photolistpage" element={<PhotoListPage />} />
          <Route path="/dashboard/moderation" element={<div>Moderation Page</div>} />
          <Route path="/dashboard/review" element={<div>Profile Review Page</div>} />
          <Route path="/dashboard/monetization" element={<div>Monetization Page</div>} />
          <Route path="/dashboard/analytics" element={<div>Analytics Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
