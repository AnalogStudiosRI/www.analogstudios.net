function modelAlbum(album) {
  return {
    imagePath: album ? album.imageUrl : '',
    headingText: album ? album.title : '',
    bodyText: album ? album.description : '',
    imageAltText: album ? album.title : '',
    link: album ? '/albums/' + album.id : ''
  };
}

function modelArtist(artist) {
  return {
    imagePath: artist ? artist.imageUrl : '',
    headingText: artist ? artist.name : '',
    bodyText: artist ? artist.bio : '',
    imageAltText: artist ? artist.name : '',
    link: artist ? '/artists/' + artist.id : ''
  };
}

export {
  modelAlbum,
  modelArtist
};