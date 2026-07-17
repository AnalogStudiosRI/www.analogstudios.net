import { modelArtist, modelAlbum } from "#components/card/card.tsx";
import { getAlbumsByArtistId } from "#services/albums.ts";
import { getArtists, getArtistById } from "#services/artists.ts";
import { escapeHtmlAttribute } from "#services/util.ts";
import type { Artist } from "#services/artists.ts";
import type { Album } from "#services/albums.ts";
// TODO: import alias (#) does not seem to work here with WCC
// import '#components/card/card.tsx';
import "../../components/card/card.tsx";
import type {
  GetStaticPaths,
  GetStaticParams,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from "@greenwood/cli";

type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticParams>;

export const getStaticPaths = async function () {
  const artists = await getArtists();

  return artists.map((artist) => {
    return {
      params: {
        name: artist.name.toLowerCase().replace(/ /g, "-"),
        id: artist.id,
      },
    };
  });
} satisfies GetStaticPaths;

export const getStaticParams = async function ({ params }: { params: Params }) {
  const artist = await getArtistById(params.id);
  const albums = await getAlbumsByArtistId(artist.id);

  return { artist, albums };
} satisfies GetStaticParams;

export default class ArtistDetailsPage extends HTMLElement {
  #artist: Artist;
  #albums: Album[] = [];

  constructor({ params }: { params: Props }) {
    super();
    this.#artist = params?.artist;
    this.#albums = params.albums;
  }

  #getAlbumsForArtist() {
    if (this.#albums?.length === 0) {
      return "";
    } else {
      return `
        <h2>Albums by ${this.#artist.name}</h2>

        ${this.#albums
          .map((album: Album) => {
            const detailsJson = JSON.stringify(modelAlbum(album));
            const escaped = escapeHtmlAttribute(detailsJson);
            return `<as-card details="${escaped}"></as-card>`;
          })
          .join("\n")}
      `;
    }
  }

  connectedCallback() {
    // don't need links on details pages
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { link, ...rest } = modelArtist(this.#artist);

    this.innerHTML = `
      <head>
        <title>Analog Studios RI - ${this.#artist.name}</title>
        <meta property="og:title" content="Analog Studios RI - ${this.#artist.name}" />
        <meta name="description" content="${this.#artist.bio}"/>
      </head>
      <body>
        <div class="container-flex as-route-artist-details">
          <div class="col-xs-4 hidden-sm-down">
            <as-social-share></as-social-share>
          </div>

          <div class="card-row hidden-sm-down">
            <as-card details="${escapeHtmlAttribute(JSON.stringify(rest))}"></as-card>
          </div>

          <div class="card-row hidden-md-up mobile-container">
            <h4>${this.#artist.name}</h4>
            <img class="mobile-image" src="${this.#artist.imageUrl}" alt="${this.#artist.name}"/>
            <p>${this.#artist.bio}</p>
          </div>

          ${this.#getAlbumsForArtist()}
        </div>
      </body>
    `;
  }
}
