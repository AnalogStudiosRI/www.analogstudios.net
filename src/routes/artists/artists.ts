/* eslint-disable max-len */
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navigate } from 'lit-redux-router';
import { getArtists } from '../../services/artists/artists-service.ts';
import { modelArtist } from '../../components/card/card.model.ts';
import { Artist } from '../../services/artists/artist.model.ts';
import store from '../../store.ts';
import '../../components/card/card.ts';
import artistsCss from './artists.css?type=css';

@customElement('as-route-artists')
class ArtistsRouteComponent extends LitElement {

  @property()
  artists: Array<Artist> = [];

  @property()
  ANALOG_ID = "1";

  @property()
  displayArtists: Array<Artist> = [];

  @property()
  analog: Artist = {};

  static properties() {
    return {
      artists: { type: Array }
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.artists = await getArtists();

    // make sure "newer" artists are at the top
    // and keep Analog at the top of the list
    this.displayArtists = this.artists.reverse().filter((artist: Artist) => artist.id !== this.ANALOG_ID);
    this.analog = this.artists.filter((artist: Artist) => artist.id === this.ANALOG_ID)[0];
  }

  private onArtistSelected() {
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
              ${[analog, ...displayArtists].map((artist: Artist) => {
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

              ${displayArtists.map((artist: Artist) => {
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