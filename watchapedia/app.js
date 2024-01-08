const movieContainer = document.getElementById("movie-container");
const movieContainerUl = document.getElementById("movie-list");

const page = 1;
const API_KEY = apiKey.headers;

const BASE_URL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US";
const FULL_URL = `${BASE_URL}&page=${page}`;

const options = {
  method: "GET",
  API_KEY,
};

function getApi() {
  fetch(FULL_URL, options)
    .then((response) => response.json())
    .then((json) => dispaly(json))
    .catch((err) => console.error(err));
}

getApi();

function dispaly(json) {
  let movies = json.results;
  console.log(movies);
  movies.forEach((movie) => {
    let overview = movie.overview;
    let imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    let classMovieInpo = "movie-info";
    let classMovieDate = "movie-date";
    let classMovieTitle = "movie-title";
    let classMovieOverview = "movie-overview";

    movieContainerUl.innerHTML += `
    <li>
      <img src ="${imageUrl}">
      <div class=${classMovieInpo}>
        <h3 class=${classMovieTitle}>
        ${movie.title}
        </h3>
        <p class=${classMovieOverview}>${
      overview.length > 100 ? overview.slice(0, 100) + `...` : overview
    }</p>
        <h5 class=${classMovieDate}>${movie.release_date}</h5>
      </div>
    </li>`;
  });
}
