import React, { lazy, Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Scroll from "./components/scroll/Scroll";
import Searchbar from "./components/searchbar/Searchbar";
import Popup from "./components/popup/Popup";
import Head from "./images/head.png";

const Card = lazy(() => import("./components/card/Card"));

async function getFacts(query) {
  try {
    const facts = await fetch(
      "https://api.chucknorris.io/jokes/search?query=" +
        encodeURIComponent(query)
    );
    return facts.json();
  } catch {
    return { result: [] };
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      facts: [],
      searchbar: "",
      loading: false,
      error: "",
      openPopup: false,
    };
  }

  handleSearchChange = (value) => {
    if (value.length >= 3) {
      const state = {};
      this.setState({ loading: true }, () => {
        try {
          getFacts(value).then((data) => {
            state.facts = data.result ? data.result : [];
            state.error = "";
            this.setState(state);
          });
        } catch {
          state.facts = [];
          state.error = "Failed to load Chuck Norris facts. Try again later.";
        } finally {
          state.loading = false;
        }
        this.setState(state);
      });
    }
  };

  render() {
    const { facts, searchbar, loading, error, openPopup } = this.state;
    return (
      <div className="App">
        <Navbar onClick={() => this.setState({openPopup: true})} />
        <Searchbar
          onChange={(e) => {
            setTimeout(() => {
              this.setState({ searchbar: e.target.value });
              this.handleSearchChange(e.target.value);
            }, 500);
          }}
        />
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
          ) : error ? (
            <p>{error}</p>
          ) : searchbar.length < 3 ? (
            <p>
              When you start searching Chuck Norris facts, be prepared: Chuck
              Norris already knows what you're looking for, and he's got the
              facts lined up before you even hit "Enter!"
            </p>
          ) : facts.length < 1 && searchbar.length > 0 ? (
            <p>
              When you search for Chuck Norris and get a "Not found" message,
              it's not that the results don't exist.
              <br /> It's just that the internet knows better than to contradict
              Chuck Norris!
            </p>
          ) : (
            <div className="container">
              {facts.map((fact) => (
                <Card
                  key={fact.id}
                  text={fact.value}
                  category={fact.categories.toString()}
                />
              ))}
            </div>
          )}
        </Scroll>
        {openPopup ? <Popup onClick={() => this.setState({openPopup: false})} /> : null}
      </div>
    );
  }
}

export default App;
