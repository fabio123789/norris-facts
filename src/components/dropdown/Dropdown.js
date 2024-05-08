import React, { useState } from "react";
import Button from "../button/Button";

const Dropdown = ({
  values = [],
  text = "Category",
  onClick = function () {},
}) => {
  const [isOpen, setOpen] = useState();

  return (
    <div
      onMouseLeave={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
      className="Dropdown"
    >
      <Button onClick={() => setOpen(!isOpen)}>
        {text}
        <i
          style={{ marginLeft: "5px" }}
          className={
            "bi" + (isOpen ? " bi-caret-up-fill" : " bi-caret-down-fill")
          }
        ></i>{" "}
      </Button>
      {isOpen ? (
        <div className="DropdownChildren">
          {values.map((value, key) => {
            return (
              <p
                key={key}
                onClick={() => {
                  onClick(value);
                  setOpen(false);
                }}
              >
                {value}
              </p>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
