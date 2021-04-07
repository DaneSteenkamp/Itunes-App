import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      query: "City Color",
      entity: "musicTrack",
      favourites: [],
    };
    this.fetchItunes = this.fetchItunes.bind(this);
    this.addtoFav = this.addtoFav.bind(this);
  }

  handleChange = (name) => (e) => {
    // Captures the data entered into the input
    this.setState({
      [name]: e.target.value,
    });
  };

  fetchItunes() {
    // retrives data from Itunes databse and stores it in the empty array results
    axios
      .get(`/search/${this.state.query}/${this.state.entity}`)
      .then((responce) =>
        this.setState({
          results: responce.data,
        })
      );
  }

  componentDidMount() {
    this.fetchItunes();
  }

  addtoFav(fav) {
    // This function gets called whenever somone click the add button. The data gets stored in a new array called favourites
    this.setState({
      favourites: [...this.state.favourites, fav],
    });
  }

  removeFav(id) {
    // removes a item from the favourites array
    const updatedFav = this.state.favourites.filter((f) => f.trackId !== id);
    this.setState({
      favourites: updatedFav,
    });
  }

  render() {
    console.log(this.state.favourites);
    const categories = [
      { Music: "musicTrack" },
      { Movies: "movie" },
      { Podcast: "podcast" },
      { Ebook: "ebook" },
    ];

    return (
      <div>
        <Jumbotron>
          <div className="jumboContainer">
            <h1 className="jumboHeading">iTunes search app</h1>
            <p className="jumboWriteUp">
              Search iTunes database for your favourite Music, Movies, Books and
              Podcasts
            </p>
          </div>
          <select onChange={this.handleChange("entity")} className="dropDown">
            {categories.map((cat, index) => {
              const key = Object.keys(cat);
              const value = Object.values(cat);
              return (
                <option key={index} value={value}>
                  {key}
                </option>
              );
            })}
          </select>
          <input
            className="searchInput"
            placeholder="search"
            onChange={this.handleChange("query")}
          />
          <button onClick={this.fetchItunes}>Submit</button>
        </Jumbotron>
        <div className="container">
          <div className="row">
            {this.state.results.map((itunesData) => (
              <div className="returnData col-sm" key={itunesData.artistID}>
                <h2 style={{ color: "tomato" }}>Artist / Title:</h2>
                <h2>{itunesData.artistName}</h2>
                <h2 style={{ color: "tomato" }}>Name:</h2>
                <h2>{itunesData.trackName}</h2>
                <button onClick={() => this.addtoFav(itunesData)}>Add</button>
              </div>
            ))}
          </div>
        </div>
        <Jumbotron>
          <div className="jumboContainer">
            <h1 className="jumboHeading">Favourites</h1>
          </div>
        </Jumbotron>
        <div className="container">
          <div className="row">
            {this.state.favourites.map((itunesData) => (
              <div className="returnData col-sm" key={itunesData.artistID}>
                <h2 style={{ color: "tomato" }}>Artist / Title:</h2>
                <h2>{itunesData.artistName}</h2>
                <h2 style={{ color: "tomato" }}>Name:</h2>
                <h2>{itunesData.trackName}</h2>
                <button onClick={() => this.removeFav(itunesData.trackId)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
