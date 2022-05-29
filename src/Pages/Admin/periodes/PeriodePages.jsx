import React from "react";
import { Outlet } from "react-router-dom";
import { PeriodeProvider } from "Services/PeriodeContext";

function PeriodePages() {
  return (
    <PeriodeProvider>
      <Outlet />
    </PeriodeProvider>
  );
}
export default PeriodePages;
