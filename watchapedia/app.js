const movieContent = document.getElementById("movie-content");
const API_KEY = apiKey.headers;

const options = {
  method: "GET",
  API_KEY,
};

function dispaly() {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

dispaly();
