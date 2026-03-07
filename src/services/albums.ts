export interface Album {
  id: number,
  title: string,
  description: string,
  year: string,
  artistId: number,
  imageUrl?: string,
  downloadUrl?: string
}

const ALBUMS_API_URL = 'https://www.analogstudios.net/api/albums';

async function getAlbums(): Promise<Album[]> {
  return fetch(ALBUMS_API_URL)
    .then(resp => resp.json());
}

async function getAlbumById(id: number): Promise<Album> {
  return fetch(`${ALBUMS_API_URL}?id=${id}`)
    .then(resp => resp.json())
    .then(resp => resp[0]);
}

async function getAlbumsByArtistId(id: number): Promise<Album[]> {
  return fetch(`${ALBUMS_API_URL}?artistId=${id}`)
    .then(resp => resp.json());
}

export {
  getAlbums,
  getAlbumById,
  getAlbumsByArtistId
};