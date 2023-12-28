import React from "react";
import axios from "axios";
import "./Movies.css";

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: [],
      hoverID: null
    };
  }

  async componentDidMount() {
    console.clear();
    this.fetchMovies("war"); // Initial fetch with default search query
  }

  async fetchMovies(query) {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=45f0782a&s=${query}`
      );
      this.setState({ filterData: response.data.Search || [] });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  searchMovies = async (query) => {
    if (query.trim() === "") {
      // If the search query is empty, fetch default movies
      this.fetchMovies("war");
    } else {
      this.fetchMovies(query);
    }
  };

  handleMouseEnter = (id) => {
    this.setState({ hoverID: id });
  };

  handleMouseLeave = () => {
    this.setState({ hoverID: null });
  };

  render() {
    const { filterData, hoverID } = this.state;

    return (
      <div className="body--wrapper">
        <h1>𝓜𝓸𝓿𝓲𝓮-𝓦𝓮𝓫𝓼𝓲𝓽𝓮</h1>
        <div className="section-body">
          <div className="searchBar--wrapper">
            <input
              type="text"
              className="searchBar"
              placeholder="𝚂𝚎𝚊𝚛𝚌𝚑 𝚏𝚘𝚛 𝙼𝚘𝚟𝚒𝚎"
              onChange={(e) => this.searchMovies(e.target.value)}
            />
          </div>
          <div>
            <div className="moviePosters--wrapper">
              {filterData.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="poster--pack"
                  onMouseEnter={() => this.handleMouseEnter(movie.imdbID)}
                  onMouseLeave={this.handleMouseLeave}
                >
                  <div className="poster--img--wrapper">
                    <img
                      className="poster--img"
                      src={movie.Poster}
                      alt={movie.Title}
                    />
                    <div className="poster--title">
                      <h3>{movie.Title}</h3>
                    </div>
                    {hoverID === movie.imdbID && (
                      <div className="poster--overlay">
                        <h3>{movie.Title}</h3>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {filterData.length === 0 && (
            <div className="error--wrapper">
              <span className="error404">No Results</span>
            </div>
          )}
          <div className="main-footer">
            <footer>©Designed by 𝓛𝓪𝓷𝓴𝓪𝓹𝓪𝓵𝓵𝓲 𝓢𝓾𝓭𝓱𝓮𝓮𝓮𝓻</footer>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
