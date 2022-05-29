import React from "react";
import ErrorInterceptor from "Interceptors/ErrorInterceptor";

import { Outlet } from "react-router-dom";
import AdminAuthContext from "Services/AdminAuthContext";
function AdminApp() {
  const { logOut } = React.useContext(AdminAuthContext);

  return (
    <ErrorInterceptor logOut={logOut}>
      <div>
        <Outlet />
      </div>
    </ErrorInterceptor>
  );
}

export default AdminApp;
