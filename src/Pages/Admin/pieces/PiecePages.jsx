import React from "react";
import { Outlet } from "react-router-dom";
import { PieceProvider } from "Services/PieceContext";

function PiecePages() {
  return (
    <PieceProvider>
      <Outlet />
    </PieceProvider>
  );
}
export default PiecePages;
