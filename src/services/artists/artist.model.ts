interface Artist {
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

export { Artist };