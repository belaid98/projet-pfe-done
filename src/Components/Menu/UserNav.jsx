import React from "react";
import PersonAddAltRounded from "@mui/icons-material/PersonAddAltRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import LoginRounded from "@mui/icons-material/LoginRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import "./Menu.css";
import AuthContext from "Services/AuthContext";
function UserNav({ id, toggle, children }) {
  const navigate = useNavigate();

  const { user, logOut } = React.useContext(AuthContext);
  return (
    <div className="nav-user" id={id}>
      {user ? (
        <>
          <IconButton
            onClick={toggle}
            style={{ height: "46px", width: "46px", margin: "auto" }}
            aria-label="Panier"
          >
            <ShoppingCartIcon />
          </IconButton>
          <button
            className="auth-btn login-btn"
            onClick={() => {
              logOut();
            }}
          >
            <span>Déconnexion</span>
            <i className="ico">
              <LogoutRounded />
            </i>
          </button>
        </>
      ) : (
        <>
          <button
            className="auth-btn login-btn"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            <span>Connexion</span>
            <i className="ico">
              <LoginRounded />
            </i>
          </button>

          <button
            className="auth-btn signup-btn"
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            <span>S'inscrire</span>
            <i className="ico">
              <PersonAddAltRounded />
            </i>
          </button>
        </>
      )}
      {children}
    </div>
  );
}

export default UserNav;
