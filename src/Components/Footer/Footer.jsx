import React from "react";
import "./footer.css";
const Footer = (props) => {
  return (
    <footer className="footer" id="footer">
      <div className="body">
        <div></div>
        <iframe
          allowFullScreen=""
          aria-hidden="false"
          frameBorder="0"
          title="adresse"
          height="200"
          /*src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12778.309524823584!2d10.1852923!3d36.
          804682!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6ebfa078b5b
          31c81!2sMus%C3%A9e%20de%20la%20Monnaie!5e0!3m2!1sfr!2stn!4v1591943903554!5m2!1sfr!2stn"*/
          className="maps"
          tabIndex="0"
        ></iframe>
      </div>

      <div className="stamp">Musée de Monnaie &copy;</div>
    </footer>
  );
};

export default Footer;
