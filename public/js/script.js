import apiKeys from '../../apikeys.js';

const apiKey = apiKeys.omdb;
const searchMovie = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Fonction pour obtenir les films depuis l'API OMDb
function getMovies(searchTerm) {
  const apiUrl = `http://www.omdbapi.com/?t=${searchTerm}&apikey=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const title = data.Title;
      const year = data.Year;
      const director = data.Director;
      const poster = data.Poster;
      const released = data.Released
      const id = data.imdbID
      const cardElement = document.getElementById('movie-container');
      cardElement.innerHTML = `
      <div class="card" style="width: 18rem;">
          <img src="${poster}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">date de sortie : ${released}</p>
            <a href="#" class="btn btn-primary">Voir détails</a>
          </div>
        </div>
      `;

      // Vous pouvez maintenant utiliser ces variables comme vous le souhaitez
      console.log("Titre:", title);
      console.log("id:", id);
      console.log("Année de sortie:", year);
      console.log("Réalisateur:", director);
      console.log("Affiche:", poster);
    })
    .catch(error => console.error('Erreur lors de la requête à l\'API:', error));
};

searchMovie.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  console.log(searchTerm);
  if (searchTerm !== '') {
    getMovies(searchTerm);
  }
}
);