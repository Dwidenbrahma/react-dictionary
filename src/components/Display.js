import React from "react";
import "./display.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Display = (props) => {
  return (
    <div className="display">
      <p>{props.word}</p>
      <p>{props.phonetic}</p>
      <p>noun</p>
      <p>"{props.example1}"</p>
      <p>verb</p>
      <p>"{props.example2}"</p>
    </div>
  );
};

export default Display;
