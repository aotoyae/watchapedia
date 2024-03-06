import { AUTHORIZE_KEY } from './key.js';
import { BASE_URL, IMAGE_URL } from './url.js';

const urlParams = new URLSearchParams(location.search);
const movieId = urlParams.get('id');

const FULL_URL = `${BASE_URL}movie/${movieId}?language=en-US&`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
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
  const POSTER_ARTICLE = document.getElementById('poster-article');
  const INFO_ARTICLE = document.getElementById('info-article');

  const TITLE_BOX = document.createElement('section');
  TITLE_BOX.classList.add('title-section');
  const BACKDROP_BOX = document.createElement('section');
  BACKDROP_BOX.classList.add('backdrop-section');
  const DETAIL_BOX = document.createElement('section');
  DETAIL_BOX.classList.add('detail-section');

  console.log(movie);

  POSTER_ARTICLE.innerHTML = `
      <img src=${IMAGE_URL + movie.poster_path}/>
  `;

  TITLE_BOX.innerHTML = `
      <h1 class='movie-title'>${movie.title}</h1>
      <p class='vote-star'>
        ${getVoteAverage(movie.vote_average)}
      </p>
  `;

  BACKDROP_BOX.innerHTML = `
      <img src=${IMAGE_URL + movie.backdrop_path}/>
      <p class='tag-line'>'${movie.tagline}'</p>
      `;

  DETAIL_BOX.innerHTML = `
      <p class='plot'>${movie.overview}</p>
      <div class='side-info'>
        <p class='releas-date'>${movie.release_date}</p>
        <a class='homepage-btn' href='${movie.homepage}' target='_blank'>
          click
        </a>
      </div>
  `;

  INFO_ARTICLE.appendChild(TITLE_BOX);
  INFO_ARTICLE.appendChild(BACKDROP_BOX);
  INFO_ARTICLE.appendChild(DETAIL_BOX);
};

const getVoteAverage = (vote_average) => {
  return Math.ceil((vote_average / 2) * 10) / 10;
};
