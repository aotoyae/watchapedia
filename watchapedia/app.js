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
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGY4MWFlODY2YjYxNTg0MWM3MGJhNThkN2FmMWZjOSIsInN1YiI6IjY1OTdkZjY2NWNjMTFkNzc2ZTdkY2I4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JYFXxsrYordw_PtizgJbfFiAB1J-fIMcISdFRFLDSnA",
  },
};

const fetchMovies = async (url) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const movieList = data.results;

    movieList.length !== 0 ? displayMovies(movieList) : noSearchedMovie();
  } catch (err) {
    console.error(err);
    window.alert(`ERROR!`);
  }
};

fetchMovies(calledUrl);

const displayMovies = (movieList) => {
  movieList.forEach((movie) => {
    const overview = movie.overview;
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    movieContainerUl.innerHTML += `
      <li class = "movie-card" onclick="alert('선택한 영화의 아이디는 ${
        movie.id
      }입니다.')">
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
          <h5 class= "movie-date"}>${movie.release_date}</h5>
        </div>
      </li>`;
  });
};

searchBtn.addEventListener("click", (event) => {
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
});

const emptySearchInput = () => {
  alert("검색어를 입력해 주세요.");
  location.reload(true);
};

const noSearchedMovie = () => {
  alert(`검색하신 영화의 정보가 없습니다.`);
  location.reload(true);
};

const test = async () => {
  if (
    window.innerHeight + Math.ceil(window.scrollY) + 1500 >= document.body.offsetHeight
  ) {
    console.log("hi");
    page++;
    await fetchMovies(`${calledUrl}&page=${page}`);
    console.log(calledUrl);
  }
};

let timer = null;
const last = () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(test, 0);
};

document.addEventListener("scroll", last);  
