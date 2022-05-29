import React from "react";

const erroStyling = {
  backgroundColor: "rgb(87, 87, 87)",
  width: "100%",
  height: "100vh",
  color: "#FFFFFF",
  gap: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
};

const imgStyle = {
  width: "100%",
};

const NotFoundPage = (props) => {
  return (
    <div style={erroStyling}>
      <img style={{ imgStyle }} src="./assets/404.png" />
      <h1> La page que vous avez demandez n'existe pas</h1>
    </div>
  );
};

export default NotFoundPage;
