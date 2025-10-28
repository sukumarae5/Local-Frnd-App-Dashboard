import React from "react";
import UserListPage from "./pages/users/UsersListPage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
const App=()=>{
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/UserListPage" element={<UserListPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )

}
export default App;