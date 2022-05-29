import React from "react";
import "./Menu.css";

function MenuButton(props) {
  const { isOpen, toggle } = props;

  return (
    <div
      id="hambtn-menu"
      className={isOpen ? "hamburglar is-open" : "hamburglar is-closed"}
      onClick={toggle}
    >
      <div className="btn-menu-icon">
        <div className="btn-menu-container">
          <span className="btn-menu-bun-top"></span>
          <span className="btn-menu-filling"></span>
          <span className="btn-menu-bun-bot"></span>
        </div>
      </div>

      {/* svg ring containter */}
      <div className="btn-menu-ring">
        <svg className="svg-ring">
          <path
            className="path"
            fill="none"
            stroke="#158fef"
            strokeMiterlimit="10"
            strokeWidth="4"
            d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2"
          />
        </svg>
      </div>
      {/* the masked path that animates the fill to the ring */}

      <svg width="0" height="0">
        <mask id="mask">
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#ff0000"
            strokeMiterlimit="10"
            strokeWidth="4"
            d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4"
          />
        </mask>
      </svg>
      <div className="path-btn-menu">
        <div className="animate-path">
          <div className="path-rotation"></div>
        </div>
      </div>
    </div>
  );
}

export default MenuButton;
