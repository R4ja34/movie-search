import apiKeys from './apikeys.js';

const apiKey = apiKeys.omdb;
const searchMovie = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieContainer = document.getElementById('movie-container');

// Fonction pour obtenir les films depuis l'API OMDb
function getMovies(searchTerm) {
  const apiUrl = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('La requête à l\'API a échoué.');
      }
      return response.json();
    })
    .then(data => {
      if (data.Response === 'True') {
        displayMovies(data.Search);
      } else {
        console.log('Aucun résultat trouvé.');
      }
    })
  .catch(error => console.error('Erreur lors de la requête à l\'API:', error));
}

// Fonction pour afficher plusieurs films dans le DOM
function displayMovies(movies) {
  movieContainer.innerHTML = ""; // Efface le contenu précédent

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style = 'width: 18rem;';

    const img = document.createElement('img');
    img.src = movie.Poster;
    img.className = 'card-img-top';
    img.alt = movie.Title;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = movie.Title;

    const link = document.createElement('a');
    link.href = `#details/${movie.imdbID}`; // Utilisez l'ID pour créer un lien vers les détails du film
    link.className = 'btn btn-primary';
    link.id = 'show-details';
    link.textContent = 'Voir détails';

    link.addEventListener('click', () => {
      showMovieDetails(movie);
    });

    cardBody.appendChild(title);
    cardBody.appendChild(link);

    card.appendChild(img);
    card.appendChild(cardBody);

    movieContainer.appendChild(card);
  });
}

function showMovieDetails(movie) {
  const detailUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;

  fetch(detailUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const modal = document.getElementById('movieModal');
      const modalTitle = document.getElementById('modalTitle');
      const modalYear = document.getElementById('modalYear');
      const modalDirector = document.getElementById('modalDirector');
      const modalPoster = document.getElementById('modalPoster');
      const modalActors = document.getElementById('modalActors');
      const modalPlot = document.getElementById('modalPlot');
      
      modalPoster.innerHTML = `<img src="${data.Poster}" alt="${data.Title}">`;
      modalTitle.textContent = `titre : ${data.Title}`;
      modalYear.textContent = `date de sortie : ${data.Year}`;
      modalDirector.textContent = `realisateur : ${data.Director}`;
      modalActors.textContent = `acteurs : ${data.Actors}`;
      modalPlot.textContent = `plot : ${data.Plot}` || 'Aucun plot disponible';

      modal.style.display = 'block';

      const closeModal = document.getElementById('closeModal');
      closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
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