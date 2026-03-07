import { getAlbums, getAlbumById } from '#services/albums.ts';
import type { Album } from '#services/albums.ts';

// TODO: types for all this from Greenwood: StaticPaths / Params / SSR page / etc?  can they be inferred?
interface StaticPaths {
  params: {
    name: string;
    id: number;
  }
}
interface StaticParams {
  album: Album
}
interface PageProps {
  params: {
    album: Album;
  }
}

export async function getStaticPaths(): Promise<StaticPaths[]> {
  const albums = await getAlbums();

  return albums.map(album => {
    return {
      params: {
        name: album.title.toLowerCase().replace(/ /g, '-'),
        id: album.id,
      }
    }
  });
}

export async function getStaticParams({ params }: StaticPaths): Promise<StaticParams> {
  const album = await getAlbumById(params.id);

  return { album };
}
export default class AlbumDetailsPage extends HTMLElement {
  #album: Album;

  constructor({ params }: PageProps) {
    super();
    this.#album = params?.album;
  }

  connectedCallback() {
    this.innerHTML = `
      <body>
        <a href="/">&lt; Back</a>
        <hr/>
        <h1>${this.#album.title}</h1>
        <p><i>${this.#album.description}</i></p>
        <hr/>
        <pre>${JSON.stringify(this.#album)}</pre>
      </body>
    `;
  }
}