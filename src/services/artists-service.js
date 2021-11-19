const ARTISTS_API_URL = '/api/artists';

// ensure only active artists are shown on the front end
function isActive(artist) {
  return parseInt(artist.isActive, 10) === 1;
}

function getArtists() {
  return fetch(ARTISTS_API_URL)
    .then(resp => resp.json())
    .then(resp => resp.filter(isActive));
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