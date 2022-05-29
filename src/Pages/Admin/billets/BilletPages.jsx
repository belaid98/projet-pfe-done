import React from "react";
import { Outlet } from "react-router-dom";
import { BilletProvider } from "Services/BilletContext";

function BilletPages() {
  return (
    <BilletProvider>
      <Outlet />
    </BilletProvider>
  );
}
export default BilletPages;
