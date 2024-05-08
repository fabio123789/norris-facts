import React from "react";

const Searchbar = ({ onChange }) => {
  return (
    <div>
      <input
        onChange={onChange}
        placeholder="Search Chuck Facts…"
        className="Searchbar"
        type="search"
      />
      <p style={{fontSize: '0.8em'}}>To show the result you need to put between 3 to 120 characters</p>
    </div>
  );
};

export default Searchbar;
