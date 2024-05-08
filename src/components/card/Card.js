import React from "react";
import approved from "../../images/approved.png";

const Card = ({ text, category }) => {
  return (
    <div className="CardArea">
      <i onClick={() => window.navigator.clipboard.writeText(text)} className="bi bi-copy CardIcon"></i>
      <p className="CardText">{text}</p>
      <div className="CardBottomArea">
        <p className="CardText">{category}</p>
        <img className="CardImage" src={approved} alt="ChuckNorrisApproved" />
      </div>
    </div>
  );
};

export default Card;
