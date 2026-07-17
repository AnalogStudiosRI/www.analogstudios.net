import { getAlbums } from "#services/albums.ts";
import { slugifyer, escapeHtmlAttribute } from "#services/util.ts";
import { modelAlbum } from "#components/card/card.tsx";
// TODO: import alias (#) does not seem to work here with WCC
// import '#components/card/card.tsx';
import "../../components/card/card.tsx";
import "../../components/quick-links/quick-links.tsx";

export default class ArtistsPage extends HTMLElement {
  async connectedCallback() {
    const albums = await getAlbums();
    const artistsCardsHtml = albums
      .map((album) => {
        const detailsJson = JSON.stringify(modelAlbum(album));
        const escaped = escapeHtmlAttribute(detailsJson);
        return `<as-card details="${escaped}"></as-card>`;
      })
      .join("\n");

    this.innerHTML = `
      <head>
        <title>Analog Studios RI - Albums</title>
        <meta property="og:title" content="Analog Studios RI - Albums" />
        <meta name="description" content="Browse all albums produced at Analog Studios"/>
      </head>
      <body>
        <div class="container-flex as-route-albums">
          <div class="row">

            <div class="hidden-sm-down col-xs-3">
              <p>Quick Links</p>
              <as-quick-links
                label='Select Album'
                links='${JSON.stringify(albums.map((album) => ({ route: `/albums/${slugifyer(album.title)}/`, label: album.title })))}'
              ></as-quick-links>
            </div>

            <div class="albums-cards-list">
              ${artistsCardsHtml}
            </div>
          
          </div>
        </div>
      </body>
    `;
  }
}
