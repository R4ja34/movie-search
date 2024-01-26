// Import des clés API depuis un fichier externe
import apiKeys from '../../apikeys.js';

// Récupération de la clé API OMDB
const apiKey = apiKeys.omdb;

// Récupération des éléments du DOM
const searchMovie = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieContainer = document.getElementById('movie-container');

// Fonction pour obtenir les films depuis l'API OMDb
function getMovies(searchTerm) {
  // Construction de l'URL de l'API en utilisant la clé API et le terme de recherche
  const apiUrl = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

  // Appel à l'API avec fetch
  fetch(apiUrl)
    .then(response => {
      // Vérification de la réponse HTTP
      if (!response.ok) {
        throw new Error('La requête à l\'API a échoué.');
      }
      return response.json();
    })
    .then(data => {
      // Vérification de la réponse JSON de l'API
      if (data.Response === 'True') {
        // Affichage des films dans le DOM
        displayMovies(data.Search);
      } else {
        console.log('Aucun résultat trouvé.');
      }
    })
    .catch(error => console.error('Erreur lors de la requête à l\'API:', error));
}

// Fonction pour afficher plusieurs films dans le DOM
function displayMovies(movies) {
  // Efface le contenu précédent dans le conteneur des films
  movieContainer.innerHTML = "";

  // Boucle à travers les films et création des éléments DOM
  movies.forEach(movie => {
    // Création d'une carte (card) pour chaque film
    const card = document.createElement('div');
    card.className = 'card';
    card.style = 'width: 18rem;';

    // Création d'une image pour le film
    const img = document.createElement('img');
    img.src = movie.Poster;
    img.className = 'card-img-top';
    img.alt = movie.Title;

    // Création du corps de la carte
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Création du titre du film
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = movie.Title;

    // Création d'un lien pour afficher les détails du film
    const link = document.createElement('a');
    link.href = `#details/${movie.imdbID}`;
    link.className = 'btn btn-primary';
    link.id = 'show-details';
    link.textContent = 'Voir détails';

    // Ajout d'un gestionnaire d'événements pour afficher les détails lors du clic
    link.addEventListener('click', () => {
      showMovieDetails(movie);
    });

    // Construction de la structure de la carte
    cardBody.appendChild(title);
    cardBody.appendChild(link);

    card.appendChild(img);
    card.appendChild(cardBody);

    // Ajout de la carte au conteneur des films
    movieContainer.appendChild(card);
  });
}

// Fonction pour afficher les détails d'un film
function showMovieDetails(movie) {
  // Construction de l'URL de l'API pour obtenir les détails du film
  const detailUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;

  // Appel à l'API pour obtenir les détails du film
  fetch(detailUrl)
    .then(response => response.json())
    .then(data => {
      // Affichage des détails du film dans une modal
      const modal = document.getElementById('movieModal');
      const modalTitle = document.getElementById('modalTitle');
      const modalYear = document.getElementById('modalYear');
      const modalDirector = document.getElementById('modalDirector');
      const modalPoster = document.getElementById('modalPoster');
      const modalActors = document.getElementById('modalActors');
      const modalPlot = document.getElementById('modalPlot');

      modalPoster.innerHTML = `<img src="${data.Poster}" alt="${data.Title}">`;
      modalTitle.textContent = `Titre : ${data.Title}`;
      modalYear.textContent = `Date de sortie : ${data.Year}`;
      modalDirector.textContent = `Réalisateur : ${data.Director}`;
      modalActors.textContent = `Acteurs : ${data.Actors}`;
      modalPlot.textContent = `Plot : ${data.Plot}` || 'Aucun plot disponible';

      modal.style.display = 'block';

      // Gestion de la fermeture de la modal
      const closeModal = document.getElementById('closeModal');
      closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    })
    .catch(error => console.error('Erreur lors de la requête à l\'API:', error));
}

// Ajout d'un gestionnaire d'événements pour le formulaire de recherche
searchMovie.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  console.log(searchTerm);
  if (searchTerm !== '') {
    // Appel de la fonction pour obtenir les films avec le terme de recherche
    getMovies(searchTerm);
  }
});
