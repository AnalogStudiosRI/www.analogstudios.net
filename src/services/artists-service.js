const ARTISTS_API_URL = '/api/artists';

function getArtists() {
  return fetch(ARTISTS_API_URL)
    .then(resp => resp.json());
}

function getArtistById(id) {
  return fetch(`${ARTISTS_API_URL}/${id}`)
    .then(resp => resp.json())
    .then(resp => resp[0]);
}
  
export { 
  getArtists,
  getArtistById
};