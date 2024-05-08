import React, { useState, lazy, Suspense } from "react";
import "./App.css";
//import Dropdown from "./components/dropdown/Dropdown";
import Navbar from "./components/navbar/Navbar";
import Scroll from "./components/scroll/Scroll";
import Searchbar from "./components/searchbar/Searchbar";
import LazyLoad from "react-lazyload";
import Popup from "./components/popup/Popup";
import Head from "./images/head.png";

const Card = lazy(() => import("./components/card/Card"));

async function getFacts(query) {
  try {
    const facts = await fetch(
      "https://api.chucknorris.io/jokes/search?query=" + query
    );
    return facts.json();
  } catch {
    return { result: [] };
  }
}

function App() {
  const [facts, setFacts] = useState([]);
  const [searchbar, setSearchbar] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <Searchbar
        onChange={(e) => {
          if (e.target.value.length >= 3) {
            setLoading(true);
            setTimeout(() => {
              getFacts(e.target.value).then((data) => {
                setFacts(data.result ? data.result : []);
                setLoading(false);
              });
            }, 1000);
          }
          setSearchbar(e.target.value);
        }}
      />
      {/* <Dropdown values={["teste", "teste2", "teste3", "teste4"]}></Dropdown> */}
      <Scroll>
        {loading ? (
          <div className="LoadingArea">
            <img className="LoadingHead" alt="head" src={Head} />
            <p>
              When you're waiting for Chuck Norris facts to load, it's not a
              delay—it's the universe rearranging itself to ensure the facts
              meet Chuck Norris's high standards!
            </p>
          </div>
        ) : facts.length < 1 && searchbar.length < 1 ? (
          <p>
            When you start searching Chuck Norris facts, be prepared: Chuck
            Norris already knows what you're looking for, and he's got the facts
            lined up before you even hit "Enter!"
          </p>
        ) : facts.length < 1 && searchbar.length > 0 ? (
          <p>
            When you search for Chuck Norris and get a "Not found" message, it's
            not that the results don't exist.
            <br /> it's just that the internet knows better than to contradict
            Chuck Norris!
          </p>
        ) : (
          <div className="container">
            {facts.map((fact) => {
              return (
                <Card text={fact.value} category={fact.categories.toString()} />
              );
            })}
          </div>
        )}
      </Scroll>
      <Popup />
    </div>
  );
}

export default App;
