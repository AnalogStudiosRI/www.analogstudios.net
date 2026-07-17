import { modelAlbum } from "#components/card/card.tsx";
import { slugifyer, escapeHtmlAttribute } from "#services/util.ts";
import { getAlbums, getAlbumById } from "#services/albums.ts";
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
  const albums = await getAlbums();

  return albums.map((album) => {
    return {
      params: {
        name: slugifyer(album.title),
        id: album.id,
      },
    };
  });
} satisfies GetStaticPaths;

export const getStaticParams = async function ({ params }: { params: Params }) {
  const album = await getAlbumById(params.id);

  return { album };
} satisfies GetStaticParams;

export default class AlbumDetailsPage extends HTMLElement {
  #album: Album;

  constructor({ params }: { params: Props }) {
    super();
    this.#album = params?.album;
  }

  static getDownloadLink(album: Album): string {
    if (album.downloadUrl) {
      return `
        <a class="download-url as-link" href="${album.downloadUrl}" rel="noopener noreferrer">Download Link</a>
      `;
    }
    return "";
  }

  connectedCallback() {
    const formattedTitle = `${this.#album.title} (${this.#album.year})`;
    // don't need links on details pages
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { link, ...rest } = modelAlbum(this.#album);

    this.innerHTML = `
      <head>
        <title>Analog Studios RI - ${this.#album.title}</title>
        <meta property="og:title" content="Analog Studios RI - ${this.#album.title}" />
        <meta name="description" content="${this.#album.description}"/>
      </head>
      <body>
        <div class="container-flex as-routes-album-details">
          <div class="col-xs-4 hidden-sm-down">
            <as-social-share></as-social-share>
          </div>

          <div class="card-row hidden-sm-down">
            ${AlbumDetailsPage.getDownloadLink(this.#album)}
            <as-card details="${escapeHtmlAttribute(JSON.stringify(rest))}"></as-card>
          </div>

          <div class="card-row hidden-md-up mobile-container">
            <h4>${formattedTitle}</h4>
            <img class="mobile-image" src="${this.#album.imageUrl}" alt="${formattedTitle}"/>
            <p>${this.#album.description}</p>
          </div>
        </div>
      </body>
    `;
  }
}
