const movieContainer = document.getElementById("movie-container");
const movieContainerUl = document.getElementById("movie-list");

const searchBtn = document.getElementById("search-btn");

const page = 1;
const API_KEY = apiKey.headers;
const BASE_URL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US";
const FULL_URL = `${BASE_URL}&page=${page}`;

const options = {
  method: "GET",
  API_KEY,
};

let allMovieList = [];

const fetchMovies = async () => {
  const { results } = await fetch(FULL_URL, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      window.alert(`ERROR!`);
    });

  return results;
};

const loadMovies = async () => {
  allMovieList = await fetchMovies();

  displayMovies(allMovieList);
};

loadMovies();

const displayMovies = (movieList) => {
  // let movies = movieList.results;
  movieList.forEach((movie) => {
    let overview = movie.overview;
    let imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    movieContainerUl.innerHTML += `
      <li class = "movie-card" onclick="alert('선택한 영화의 아이디는 ${
        movie.id
      }입니다.')">
        <img src ="${imageUrl}">
        <div class= "movie-info">
          <h3 class= "movie-title">
          ${movie.title}
          </h3>
          <p class= "movie-average">${
            Math.ceil((movie.vote_average / 2) * 10) / 10
          }</p>
          <p class= "movie-overview">${
            overview.length > 100 ? overview.slice(0, 100) + `...` : overview
          }</p>
          <h5 class= "movie-date"}>${movie.release_date}</h5>
        </div>
      </li>`;
  });
};

const searchMovies = () => {
  movieContainerUl.innerHTML = "";

  const searchInput = document.getElementById("search-input");
  const searchKeyword = searchInput.value.toUpperCase();
  const searchedMovieList = allMovieList.filter(({ title }) =>
    title.toUpperCase().includes(searchKeyword)
  );

  searchedMovieList.length > 0
    ? displayMovies(searchedMovieList)
    : alert("검색한 영화가 없습니다. 🥲");
};

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchMovies();
});
