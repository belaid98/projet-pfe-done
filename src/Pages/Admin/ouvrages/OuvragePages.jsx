import React from "react";
import { Outlet } from "react-router-dom";
import { OuvrageProvider } from "Services/OuvrageContext";

function OuvragePages() {
  return (
    <OuvrageProvider>
      <Outlet />
    </OuvrageProvider>
  );
}
export default OuvragePages;
