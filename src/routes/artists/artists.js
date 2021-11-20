/* eslint-disable max-len */
import { html, LitElement } from 'lit';
import { getArtists } from '../../services/artists-service.js';
import { modelArtist } from '../../components/card/card.model.ts';
import { navigate } from 'lit-redux-router';
import store from '../../store.js';
import '../../components/card/card.ts';
import artistsCss from './artists.css?type=css';

class ArtistsRouteComponent extends LitElement {

  static get properties() {
    return {
      artists: { type: Array }
    };
  }

  constructor() {
    super();

    this.ANALOG_ID = '1';
    this.artists = [];
    this.displayArtists = [];
    this.analog = {};
  }

  async connectedCallback() {
    super.connectedCallback();

    this.artists = await getArtists();

    // make sure "newer" artists are at the top
    // and keep Analog at the top of the list
    this.displayArtists = this.artists.reverse().filter(artist => artist.id !== this.ANALOG_ID);
    this.analog = this.artists.filter(artist => artist.id === this.ANALOG_ID)[0];
  }

  onArtistSelected() {
    const selectedAristId = this.shadowRoot.querySelector('select').value;

    store.dispatch(navigate(`/artists/${selectedAristId}`));
  }

  /* eslint-disable indent */
  render() {
    const { displayArtists, analog } = this;

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
              ${[analog, ...displayArtists].map((artist) => {
                return html`
                  <option .value="${artist.id}">${artist.name}</option>
                `;
              })}
              <!-- <option *ngFor="let artist of getArtists()" value="artist.id">{{artist.name | ellipsis: 15}}</option> -->
            </select>

          </div>

          <div class="col-xs-7">
            <div class="artist-cards-list">
              <app-card .details="${modelArtist(analog)}"></app-card>

              ${displayArtists.map((artist) => {
                return html`
                  <app-card .details="${modelArtist(artist)}"></app-card>
                `;
              })};
            </div>
          </div>

        </div>
      </div>
    `;
  }
  /* eslint-enable indent */
}

customElements.define('as-route-artists', ArtistsRouteComponent);