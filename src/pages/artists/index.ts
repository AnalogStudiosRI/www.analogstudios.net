import { getArtists } from "#services/artists.ts";
import { modelArtist } from "#components/card/card.tsx";
import { slugifyer, escapeHtmlAttribute } from "#services/util.ts";
// TODO: import alias (#) does not seem to work here with WCC
// import '#components/card/card.tsx';
import "../../components/card/card.tsx";
import "../../components/quick-links/quick-links.tsx";

export default class ArtistsPage extends HTMLElement {
  #ANALOG_ID = 1;

  async connectedCallback() {
    const artists = await getArtists();

    // make sure "newer" artists are at the top
    const artistsList = artists.reverse().filter((artist) => artist.id !== this.#ANALOG_ID);
    const analog = artists.filter((artist) => artist.id === this.#ANALOG_ID)[0];
    const artistsCardsHtml = [analog, ...artistsList]
      .map((artist) => {
        const detailsJson = JSON.stringify(modelArtist(artist));
        const escaped = escapeHtmlAttribute(detailsJson);
        return `<as-card details="${escaped}"></as-card>`;
      })
      .join("\n");

    this.innerHTML = `
      <head>
        <title>Analog Studios RI - Artists</title>
        <meta property="og:title" content="Analog Studios RI - Artists" />
        <meta name="description" content="Browse artists featured at Analog Studios"/>
      </head>
      <body>
        <div class="container-flex as-route-artists">
          <div class="row">

            <div class="hidden-sm-down col-xs-3">
              <p>Quick Links</p>
              <as-quick-links
                label='Select Artist'
                links='${JSON.stringify(artists.map((artist) => ({ route: `/artists/${slugifyer(artist.name)}/`, label: artist.name })))}'
              ></as-quick-links>
            </div>

            <div class="artist-cards-list">
              ${artistsCardsHtml}
            </div>

          </div>
        </div>
      </body>
    `;
  }
}
