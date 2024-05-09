import React, { useEffect, useState, useCallback } from "react";
import Card from "../card/Card";
import Dropdown from "../dropdown/Dropdown";
import Button from "../button/Button";
import Head from "../../images/head.png";

async function getRandomFact(category) {
  const categoryParam = category
    ? "?category=" + encodeURIComponent(category)
    : "";
  const request = "https://api.chucknorris.io/jokes/random" + categoryParam;
  try {
    const response = await fetch(request);
    return response.json();
  } catch {
    return { error: "Failed to fetch fact." };
  }
}

async function getCategories() {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/categories");
    return response.json();
  } catch {
    return [];
  }
}

const Popup = ({onClick}) => {
  const [fact, setFact] = useState({});
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFact = useCallback(async (category = "") => {
    setLoading(true);
    const data = await getRandomFact(category);
    if (!data.error) {
      setFact(data);
      setCategory(category);
    } else {
      setFact({});
      console.error(data.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFact();
    getCategories().then(setCategories);
  }, [fetchFact]);

  return (
    <div onClick={onClick} className="PopupArea">
      <div onClick={(event) => event.stopPropagation()}  className="Popup">
        <i onClick={onClick} className="PopupIcon bi bi-x-lg"></i>
        {loading ? (
          <img className="LoadingHead" alt="head" src={Head} />
        ) : (
          <Card text={fact.value || "No fact available"} category={fact?.categories?.length > 0 ? fact.categories.toString() : category} />
        )}
        <div className="PopupButtonsArea">
          <Dropdown
            text="Random Category Fact"
            onClick={fetchFact}
            values={categories}
          />
          <Button onClick={() => fetchFact()}>Random Fact</Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
