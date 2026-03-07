export interface Artist {
  id: number,
  name: string,
  bio: string,
  imageUrl: string,
  isActive: string
  genre?: string,
  location?: string,
  label?: string,
  contactPhone?: string,
  contactEmail?: string
}

const ARTISTS_API_URL = 'http://www.analogstudios.net/api/artists';

// ensure only active artists are shown on the front end
function isActive(artist: Artist): boolean {
  return parseInt(artist.isActive, 10) === 1;
}

async function getArtists(): Promise<Artist[]> {
  return fetch(ARTISTS_API_URL)
    .then(resp => resp.json())
    .then(resp => resp.filter(isActive));
}

async function getArtistById(id: number): Promise<Artist> {
  return fetch(`${ARTISTS_API_URL}?id=${id}`)
    .then(resp => resp.json())
    .then(resp => resp[0]);
}

export {
  getArtists,
  getArtistById
};