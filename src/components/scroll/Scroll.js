import React from "react";

const Scroll = ({ children, ...props }) => {
  return <div {...props} className="Scroll">{children}</div>;
};

export default Scroll;
