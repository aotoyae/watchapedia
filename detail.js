import { AUTHORIZE_KEY } from "./key.js";

const urlParams = new URLSearchParams(location.search);
const movieId = urlParams.get("id");

const BASE_URL = `https://api.themoviedb.org/3/movie/`;
const FULL_URL = `${BASE_URL + movieId}?language=en-US&`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTHORIZE_KEY,
  },
};

const fetchMovie = async (url) => {
  try {
    const response = await fetch(url, options);
    const movieData = await response.json();

    console.log(movieData);

    displayMovie(movieData);
  } catch (err) {
    console.log(err);
    window.alert(`ERROR!`);
  }
};

fetchMovie(FULL_URL);

const displayMovie = (movie) => {
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const POSTER_ARTICLE = document.getElementById("poster-article");
  const INFO_ARTICLE = document.getElementById("info-article");
  const TITLE_BOX = document.createElement("section");
  TITLE_BOX.classList.add("title-section");
  const DETAIL_BOX = document.createElement("section");
  DETAIL_BOX.classList.add("detail-section");

  POSTER_ARTICLE.innerHTML = `
      <img src=${IMG_URL + movie.poster_path}/>`;

  TITLE_BOX.innerHTML = `
      <h1>${movie.title}
      </h1>
      <p class="releas-date">${movie.release_date}</p>
      <p class="vote-star">
        ${Math.ceil((movie.vote_average / 2) * 10) / 10}
      </p>`;

  DETAIL_BOX.innerHTML = `
      <p class="tag-line">"${movie.tagline}"</p>
      <p class="plot">${movie.overview}</p>
      <a class="homepage-btn" href="${movie.homepage}" target="_blank">
        click
      </a>
  `;

  INFO_ARTICLE.appendChild(TITLE_BOX);
  INFO_ARTICLE.appendChild(DETAIL_BOX);
};
