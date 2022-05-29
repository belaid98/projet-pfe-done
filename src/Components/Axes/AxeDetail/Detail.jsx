import React from "react";

function Detail(props) {
  return (
    <div className="timeline-content">
      <h3 className="date">{props.history.date}</h3>
      <h1>{props.history.title}</h1>
      <p>{props.history.details.slice(0, 30) + "..."}</p>

      <button className="botton" type="button" onClick={props.show}>
        Lire Plus
      </button>
    </div>
  );
}

export default Detail;
