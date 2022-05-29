import React from "react";
import { Link } from "react-router-dom";

function MenuNav(props) {
  return (
    <div className="nav-links" id={props.id}>
      <ul>
        <li className="hidden-item">
          <Link to="/">Page Acceuil</Link>
        </li>
        <li>
          <Link to="/#A_propos_nous">A Propos Nous</Link>
        </li>
        <li>
          <Link to="/#Monnaies">Monnaies</Link>
        </li>
        <li>
          <Link to="/#Collections">Collections</Link>
        </li>
        <li>
          <Link to="/#Contact">Contacter</Link>
        </li>
        <li>
          <Link to="/E_boutique">E-Boutique</Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuNav;
