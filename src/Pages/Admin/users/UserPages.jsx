import React from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "Services/UserContext";

function UserPages() {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
}
export default UserPages;
