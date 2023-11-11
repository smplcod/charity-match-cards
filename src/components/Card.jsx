import React from "react";

const Card = ({ card, opened, onClick }) => {
  const style = {
    width: "100px",
    height: "100px",
    border: "1px solid black",
    display: "inline-block",
    margin: "5px",
    lineHeight: "100px",
    textAlign: "center",
    background: opened ? "white" : "gray",
    fontSize: "24px",
    cursor: "pointer",
  };

  return (
    <div style={style} onClick={onClick}>
      {opened ? card : ""}
    </div>
  );
};

export default Card;
