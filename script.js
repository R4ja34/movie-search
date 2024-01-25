import apiKeys from './apikeys.js';

const apiKey = apiKeys.omdb;
const searchMovie = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Fonction pour obtenir les films depuis l'API OMDb
function getMovies(searchTerm) {
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const movies = data.Search;
      // Ici, tu pourrais traiter les résultats de la recherche (par exemple, les afficher dans le DOM)
      console.log(movies);
    })
    .catch(error => console.error('Erreur lors de la requête à l\'API:', error));
}

searchMovie.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  console.log(searchTerm);
  if (searchTerm !== '') {
    getMovies(searchTerm);
  }
});
