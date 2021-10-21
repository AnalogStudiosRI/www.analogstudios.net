/* eslint-disable max-len */
import { html, LitElement } from 'lit';
// import { getArtists } from '../../services/artists-service.js';
// import { modelArtist } from '../../components/card/card.js';
// import artistsCss from './artists.css?type=css';

class ArtistDetailsRouteComponent extends LitElement {

  static get properties() {
    return {
      id: String
    };
  }

  /* eslint-disable indent */
  render() {
    // const { artists } = this;

    return html`
      <h1>Hello Artist Details => ${this.id}!</h1>
    `;
  }
  /* eslint-enable indent */
}

customElements.define('as-route-artist-details', ArtistDetailsRouteComponent);