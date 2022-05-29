import React from "react";
import { Outlet } from "react-router-dom";
import { CommandProvider } from "Services/CommandContext";

function CommandPages() {
  return (
    <CommandProvider>
      <Outlet />
    </CommandProvider>
  );
}
export default CommandPages;
