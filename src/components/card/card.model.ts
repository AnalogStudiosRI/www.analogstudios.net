import { Artist } from '../../services/artists/artist.model.ts';
import { Album } from '../../services/albums/album.model.ts';

function modelAlbum(album: Album) {
  return {
    imagePath: album ? album.imageUrl : '',
    headingText: album ? album.title : '',
    bodyText: album ? album.description : '',
    imageAltText: album ? album.title : '',
    link: album ? '/albums/' + album.id : ''
  };
}

function modelArtist(artist: Artist) {
  return {
    imagePath: artist ? artist.imageUrl : '',
    headingText: artist ? artist.name : '',
    bodyText: artist ? artist.bio : '',
    imageAltText: artist ? artist.name : '',
    link: artist ? '/artists/' + artist.id : ''
  };
}

interface Details {
  imagePath: string,
  headingText: string,
  bodyText: string,
  imageAltText: string,
  link: string
}

export {
  modelAlbum,
  modelArtist,
  Details
};