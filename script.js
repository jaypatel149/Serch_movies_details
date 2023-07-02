let moviesName = document.getElementById("search-movie");
let searchBtn = document.getElementById("search-button");
let result = document.getElementById("results");

const displayMovieData = (movies) => {
  if (movies.length > 0) {
    result.innerHTML = `
      <div class="row">
        ${movies
          .map((movie) => {
            const poster = movie.Poster !== "N/A" ? movie.Poster : "https://www.slashfilm.com/img/gallery/films-top-10-movies-of-2021/l-intro-1642610118.jpg";
            return `
              <div class="card">
                <div class="card-box">
                  <img src="${poster}" alt="poster">
                  <div class="card-body">
                  <h4>${movie.Title}</h4>
                  <p>${movie.Year}</p>
                  </div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  } else {
    result.innerHTML = `<h3 class="msg">No movies found. Please try again.</h3>`;
  }
};


const getMovies = async () => {
  let movies = moviesName.value;

  if (movies.length === 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
  } else {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${movies}&apikey=6ad2397f`
      );
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      console.log("all movies data ",data.Search);
      if (data.Response === "True") {
        displayMovieData(data.Search);
      } else {
        displayMovieData([]);
      }
    } catch (error) {
      console.log("Error:", error.message);
      result.innerHTML = `<h3 class="msg">An error occurred. Please try again later.</h3>`;
    }
  }
};

searchBtn.addEventListener("click", getMovies);
