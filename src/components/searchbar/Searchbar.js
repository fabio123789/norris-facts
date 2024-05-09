import React from "react";

const Searchbar = ({ onChange }) => {
  return (
    <div>
      <input
        onChange={onChange}
        placeholder="Search Chuck Norris Facts…"
        className="Searchbar"
        type="search"
      />
      <p style={{fontSize: '0.8em'}}>Enter 3-120 characters to see the result, but don't worry Chuck Norris can deliver a roundhouse kick that writes every fact instantly.</p>
    </div>
  );
};

export default Searchbar;
