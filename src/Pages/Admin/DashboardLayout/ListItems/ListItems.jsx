import React from "react";
import "./list.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import BookIcon from "@mui/icons-material/Book";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ListSubheader from "@mui/material/ListSubheader";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div className="link">
      <Link
        className={match ? "active" : "inactive"}
        style={{ textDecoration: "none" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}
const mainList = [
  {
    icon: <DashboardIcon />,
    label: "Dashboard",
    ref: "",
  },
  {
    icon: <PeopleIcon />,
    label: "Utilisateurs",
    ref: "utilisateurs",
  },
  {
    icon: <ManageHistoryIcon />,
    label: "Periodes",
    ref: "periodes",
  },
  {
    icon: <AttachMoneyIcon />,
    label: "Pieces",
    ref: "pieces",
  },
  {
    icon: <LocalAtmIcon />,
    label: "Billets",
    ref: "billets",
  },
  {
    icon: <BookIcon />,
    label: "Ouvrages",
    ref: "ouvrages",
  },
];
let secondList = [
  {
    icon: <ShoppingCartIcon />,
    label: "Commandes",
    ref: "commandes",
  },
  {
    icon: <BarChartIcon />,
    label: "Reports",
    ref: "reports",
  },
];
export function MainListItems() {
  return (
    <React.Fragment>
      {mainList.map((item) => {
        return (
          <CustomLink key={item.ref} to={item.ref}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </CustomLink>
        );
      })}
    </React.Fragment>
  );
}

export const SecondaryListItems = () => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Statistiques
      </ListSubheader>
      {secondList.map((item) => {
        return (
          <CustomLink key={item.ref} to={item.ref}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </CustomLink>
        );
      })}
    </React.Fragment>
  );
};
