interface Album {
  id: string,
  title: string,
  description: string,
  year: string,
  artistId: number,
  imageUrl?: string,
  downloadUrl?: string
}

export { Album };