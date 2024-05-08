import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import Dropdown from "../dropdown/Dropdown";
import Button from "../button/Button";
import Head from "../../images/head.png";

async function getRandomFact(category) {
  let request = "https://api.chucknorris.io/jokes/random";
  if (category) request += "?category=" + category;
  try {
    const facts = await fetch(request);
    return facts.json();
  } catch {
    return {};
  }
}

async function getCategories() {
  try {
    const facts = await fetch("https://api.chucknorris.io/jokes/categories");
    return facts.json();
  } catch {
    return [];
  }
}

const Popup = () => {
  const [fact, setFact] = useState({});
  const [categories, setCategories] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRandomFact().then((data) => {
      setFact(data);
    });
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  return (
    <div className="PopupArea">
      <div className="Popup">
        <div className="PopupButtonsArea">
          <Dropdown
            text="Random Category Fact"
            onClick={(value) => {
              setLoading(true);
              getRandomFact(value).then((data) => {
                setFact(data);
                setCategory(value);
                setLoading(false);
              });
            }}
            values={categories}
          />
          <Button
            onClick={() => {
              setLoading(true);
              getRandomFact().then((data) => {
                setFact(data);
                setCategory('');
                setLoading(false);
              });
            }}
          >
            Random Fact
          </Button>
        </div>
        {loading ? (
          <img className="LoadingHead" alt="head" src={Head} />
        ) : (
          <Card text={fact.value} category={category} />
        )}
      </div>
    </div>
  );
};

export default Popup;
