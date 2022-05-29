import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Popover } from "@mui/material";
import "./Menu.css";
import MenuButton from "./MenuButton";
import MenuNav from "./MenuNav";
import UserNav from "./UserNav";
import PanierContext from "Services/PanierContext";
import PanierItem from "Components/PanierItem/PanierItem";

function Menu() {
  const [isOpen, setOpen] = React.useState(false);
  const [panierOpen, setPanier] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { panier, total, removeFromPanier, updateInPanier } =
    React.useContext(PanierContext);

  const navigate = useNavigate();

  const toggleButton = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!isOpen);
  };

  const togglePanier = (event) => {
    setAnchorEl(event.currentTarget);
    setPanier(!panierOpen);
  };
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setOpen(false);
    });
    return window.removeEventListener("resize", () => {
      window.removeEventListener("resize");
    });
  });

  return (
    <>
      <div className="nav" id="header">
        <div className="navbar">
          <div className="nav-logo">
            <Link to="/">
              <img src="./assets/logomusee.png" alt="logo" height="70px" />
            </Link>
          </div>

          <MenuNav id="row-nav" />
          <UserNav id="row-user" toggle={togglePanier}>
            <div className="place-holder hidden-item"></div>
          </UserNav>
        </div>
      </div>
      <MenuButton isOpen={isOpen} toggle={toggleButton} />
      <Popover
        id="simple-popover"
        open={isOpen}
        anchorEl={anchorEl}
        onClose={toggleButton}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="menu-popup scroller"
      >
        <MenuNav id="column-nav" />
        <div id="column-user">
          <UserNav />
        </div>
      </Popover>
      <Popover
        id="panier-popover"
        open={panierOpen}
        anchorEl={anchorEl}
        onClose={togglePanier}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="menu-popup panier scroller"
      >
        <h2 className="panier-title">Panier</h2>
        <div className="panier-body">
          {panier.ouvrages.map((ouvrage, index) => {
            return (
              <PanierItem
                handleDelete={removeFromPanier}
                handleUpdate={updateInPanier}
                collection="ouvrages"
                key={index}
                item={ouvrage}
              />
            );
          })}

          {panier.billets.map((billet, index) => {
            return (
              <PanierItem
                handleDelete={removeFromPanier}
                handleUpdate={updateInPanier}
                collection="billets"
                key={index}
                item={billet}
              />
            );
          })}

          {panier.pieces.map((piece, index) => {
            return (
              <PanierItem
                handleDelete={removeFromPanier}
                handleUpdate={updateInPanier}
                collection="pieces"
                key={index}
                item={piece}
              />
            );
          })}
          {panier.pieces.length === 0 &&
          panier.ouvrages.length === 0 &&
          panier.billets.length === 0 ? (
            <h3 style={{ textAlign: "center", marginTop: "50px" }}>
              Panier vide
            </h3>
          ) : (
            <div className="flex justify-between">
              <strong style={{ margin: "auto" }}>Total: {total} DT</strong>
              <Button
                variant="contained"
                color="info"
                onClick={() => {
                  navigate("/commander");
                }}
              >
                Commander
              </Button>
            </div>
          )}
        </div>
      </Popover>
    </>
  );
}

export default Menu;
