import React from "react";
import Button from '../button/Button'

const Navbar = ({onClick}) => {
  return (
    <div className="Navbar">
        <p>Chuck Norris Facts</p>
        <Button onClick={onClick}>Get A Random Fact</Button>
    </div>
  );
};

export default Navbar;
