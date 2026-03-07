import { getArtists, getArtistById } from '#services/artists.ts';
import type { Artist } from '#services/artists.ts';

// TODO: types for this from Greenwood?  can they be inferred?
interface StaticPaths {
  params: {
    name: string;
    id: number;
  }
}

// TODO: types for this from Greenwood?  can they be inferred?
interface PageProps {
  params: {
    artist: Artist;
  }
}

export async function getStaticPaths(): Promise<StaticPaths[]> {
  const artists = await getArtists();

  return artists.map(artist => {
    return {
      params: {
        name: artist.name.toLowerCase(),
        id: artist.id,
      }
    }
  });
}

export async function getStaticProps({ params }: StaticPaths): Promise<{ artist: Artist }> {
  const artist = await getArtistById(params.id);

  return { artist };
}


// TODO: types for this from Greenwood for SSR pages?  can they be inferred?
export default class ArtistDetailsPage extends HTMLElement {
  #artist: Artist;

  constructor({ params }: PageProps) {
    super();
    this.#artist = params?.artist;
  }

  async connectedCallback() {
    this.innerHTML = `
      <body>
        <a href="/">Back</a>
        <hr/>
        <h1>${this.#artist.name}</h1>
        <p><i>${this.#artist.bio}</i></p>
        <hr/>
        <pre>${JSON.stringify(this.#artist)}
      </body>
    `;
  }
}