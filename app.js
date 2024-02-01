import { AUTHORIZE_KEY } from "./key.js";

const movieContainer = document.getElementById("movie-container");
const movieContainerUl = document.getElementById("movie-list");

const searchBtn = document.getElementById("search-btn");

const BASE_URL = `https://api.themoviedb.org/3/`;
const POPULAR_URL = `${BASE_URL}movie/popular?language=en-US`;
let page = 1;
let calledUrl = `${POPULAR_URL}&page=${page}`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTHORIZE_KEY,
  },
};

const fetchMovies = async (url) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const movieList = data.results;

    if (movieList.length !== 0) {
      displayMovies(movieList);
      addHistory();
    } else {
      noSearchedMovie();
    }
  } catch (err) {
    console.error(err);
    window.alert(`ERROR!`);
  }
};

fetchMovies(calledUrl);

const displayMovies = (movieList) => {
  movieList.forEach((movie) => {
    const overview = movie.overview;
    const movieLi = document.createElement("li");
    movieLi.classList.add("movie-card");
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    movieLi.addEventListener("click", () => {
      location.href = `detail.html?id=${movie.id}`;
      console.log(movie.id);
    });

    movieLi.innerHTML += `
        <img src ="${imageUrl}" onerror="this.src='image/no-poster.png'" alt="영화 포스터">
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
          <h5 class= "movie-date">${movie.release_date}</h5>
        </div>`;

    movieContainerUl.appendChild(movieLi);
  });
};

const addHistory = () => {
  const searchInput = document.getElementById("search-input");
  const searchKeyword = searchInput.value;
  const searchContainer = document.getElementById("search-container");
  const historySection = document.createElement("section");
  const SEARCH_URL = `${BASE_URL}search/movie?&query=${searchKeyword}`;

  const testP = document.createElement("p");
  testP.append(searchKeyword);

  historySection.appendChild(testP);
  searchContainer.appendChild(historySection);

  testP.addEventListener("click", () => {
    console.log("hi");
  });
};

const searchMovie = (event) => {
  event.preventDefault();
  movieContainerUl.innerHTML = "";

  const searchInput = document.getElementById("search-input");
  const searchKeyword = searchInput.value;

  const SEARCH_URL = `${BASE_URL}search/movie?&query=${searchKeyword}`;
  calledUrl = SEARCH_URL;

  if (searchKeyword) {
    fetchMovies(SEARCH_URL);
  } else if (searchKeyword.length === 0) {
    emptySearchInput();
  }
};

searchBtn.addEventListener("click", searchMovie);

const emptySearchInput = () => {
  alert("검색어를 입력해 주세요.");
  location.reload(true);
};

const noSearchedMovie = () => {
  alert(`검색하신 영화의 정보가 없습니다.`);
  location.reload(true);
};

const scrollHandler = async () => {
  if (
    window.innerHeight + Math.ceil(window.scrollY) + 1000 >=
    document.body.offsetHeight
  ) {
    page++;
    await fetchMovies(`${calledUrl}&page=${page}`);
    console.log(calledUrl);
  }
};

let timer = null;
const debouncing = () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(scrollHandler, 300);
};

document.addEventListener("scroll", debouncing);
