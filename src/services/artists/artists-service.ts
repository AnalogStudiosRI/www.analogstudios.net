import { Artist } from './artist.model.ts';

const ARTISTS_API_URL = '/api/v2/artists';

// ensure only active artists are shown on the front end
function isActive(artist: Artist): Boolean {
  return parseInt(artist.isActive, 10) === 1;
}

function getArtists(): Promise<[Artist]> {
  return fetch(ARTISTS_API_URL)
    .then(resp => resp.json())
    .then(resp => resp.filter(isActive));
}

function getArtistById(id): Promise<Artist> {
  return fetch(`${ARTISTS_API_URL}?id=${id}`)
    .then(resp => resp.json())
    .then(resp => resp[0]);
}

export {
  getArtists,
  getArtistById
};