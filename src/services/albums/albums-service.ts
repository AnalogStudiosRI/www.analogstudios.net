import { Album } from './album.model.ts';

const ALBUMS_API_URL = '/api/albums';

function getAlbums(): Promise<[Album]> {
  return fetch(ALBUMS_API_URL)
    .then(resp => resp.json());
}

function getAlbumById(id): Promise<Album> {
  return fetch(`${ALBUMS_API_URL}?id=${id}`)
    .then(resp => resp.json())
    .then(resp => resp[0]);
}

function getAlbumsByArtistId(id): Promise<[Album]> {
  return fetch(`${ALBUMS_API_URL}?artistId=${id}`)
    .then(resp => resp.json());
}

export {
  getAlbums,
  getAlbumById,
  getAlbumsByArtistId
};