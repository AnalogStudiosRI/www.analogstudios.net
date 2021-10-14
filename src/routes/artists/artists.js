/* eslint-disable max-len */
import { html, LitElement } from 'lit';
import { getArtists } from '../../services/artists-service.js';
import { modelArtist } from '../../components/card/card.js';
import artistsCss from './artists.css?type=css';

class ArtistsRouteComponent extends LitElement {

  static get properties() {
    return {
      artists: { type: Array }
    };
  }

  constructor() {
    super();

    this.artists = [];
  }

  async connectedCallback() {
    super.connectedCallback();

    this.artists = await getArtists();
  }

  onArtistSelected() {
    const selectedArtistId = this.shadowRoot.querySelector('select').value;

    alert(`onArtistSelected => ${selectedArtistId}`);
  }

  /* eslint-disable indent */
  render() {
    const { artists } = this;

    return html`
      <style>
        ${artistsCss}
      </style>

      <div class="container-flex as-route-artists">
        <div class="row">

          <div class="hidden-sm-down col-xs-3">

            <p>Quick Links</p>

            <select class="hidden-sm-down" @change="${this.onArtistSelected}">
              <option .value="Select Artist">Select Artist</option>
              ${artists.map((artist) => {
                return html`
                  <option .value="${artist.id}">${artist.name}</option>
                `;
              })}
              <!-- <option *ngFor="let artist of getArtists()" value="artist.id">{{artist.name | ellipsis: 15}}</option> -->
            </select>

          </div>

          <div class="col-xs-7">
            ${artists.map((artist) => {
              return html`
                <div class="artist-cards-list">
                  <app-card .details="${modelArtist(artist)}"></app-card>
                </div>
              `;
            })}
          </div>

        </div>
      </div>
    `;
  }
  /* eslint-enable indent */
}

customElements.define('as-route-artists', ArtistsRouteComponent);