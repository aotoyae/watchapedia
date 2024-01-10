const movieContainer = document.getElementById("movie-container");
const movieContainerUl = document.getElementById("movie-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const page = 1;
const API_KEY = apiKey.headers;
const BASE_URL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US";
const FULL_URL = `${BASE_URL}&page=${page}`;

const options = {
  method: "GET",
  API_KEY
};

const getMovies = () => {
  fetch(FULL_URL, options)
    .then((response) => response.json())
    .then((movieList) => displayMovies(movieList))
    .catch((err) => {
      console.error(err);
      window.alert(`ERROR!`);
    });
};

getMovies();

const displayMovies = (movieList) => {
  let movies = movieList.results;
  movies.forEach((movie) => {
    let overview = movie.overview;
    let imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    movieContainerUl.innerHTML += `
      <li class = "movie-card">
        <img src ="${imageUrl}">
        <div class= "movie-info">
          <h3 class= "movie-title">
          ${movie.title}
          </h3>
          <p class= "movie-average">${Math.ceil(movie.vote_average * 10) / 10}</p>
          <p class= "movie-overview">${overview.length > 100 ? overview.slice(0, 100) + `...` : overview}</p>
          <h5 class= "movie-date"}>${movie.release_date}</h5>
        </div>
      </li>`;
  });
};

const searchMovies = () => {
  fetch(FULL_URL, options)
    .then((response) => response.json())
    .then((movieList) => {
      let movies = movieList.results;
      const searchTitle = searchInput.value.toLowerCase();

      movies
        .filter((movie) => movie.title.toLowerCase() === searchTitle)
        .forEach((movie) => {
          let overview = movie.overview;
          let imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

          movieContainerUl.innerHTML += `
            <li class = "movie-card">
              <img src ="${imageUrl}">
              <div class= "movie-info">
                <h3 class= "movie-title">
                ${movie.title}
                </h3>
                <p class= "movie-average">${Math.ceil(movie.vote_average * 10) / 10}</p>
                <p class= "movie-overview">${overview.length > 100 ? overview.slice(0, 100) + `...` : overview}</p>
                <h5 class= "movie-date"}>${movie.release_date}</h5>
              </div>
            </li>`;
        });
    })
    .catch((err) => {
      console.error(err);
      window.alert(`ERROR!`);
    });
};

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchMovies();
});
