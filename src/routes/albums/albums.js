/* eslint-disable max-len */
import { html, LitElement } from 'lit';
import { getAlbums } from '../../services/albums-service.js';
import { modelAlbum } from '../../components/card/card.model.ts';
import { navigate } from 'lit-redux-router';
import store from '../../store.js';
import '../../components/card/card.ts';
import albumsCss from './albums.css?type=css';

class AlbumsRouteComponent extends LitElement {

  static get properties() {
    return {
      albums: { type: Array }
    };
  }

  constructor() {
    super();

    this.albums = [];
  }

  async connectedCallback() {
    super.connectedCallback();

    this.albums = await getAlbums();
  }

  onAlbumSelected() {
    const selectedAlbumId = this.shadowRoot.querySelector('select').value;

    store.dispatch(navigate(`/albums/${selectedAlbumId}`));
  }

  /* eslint-disable indent */
  render() {
    const { albums } = this;

    return html`
      <style>
        ${albumsCss}
      </style>

      <div class="container-flex as-route-albums">
        <div class="row">

          <div class="col-xs-3 hidden-sm-down">

            <p>Quick Links</p>

            <select class="hidden-sm-down" @change="${this.onAlbumSelected}">
              <option .value="Select Artist">Select Album</option>
              ${albums.map((album) => {
                return html`
                  <option .value="${album.id}">${album.title}</option>
                `;
              })}
              <!-- <option *ngFor="let artist of getArtists()" value="artist.id">{{artist.name | ellipsis: 15}}</option> -->
            </select>

          </div>

          <div class="col-xs-7">
            ${albums.map((album) => {
              return html`
                <div class="album-cards-list">
                  <app-card .details="${modelAlbum(album)}"></app-card>
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

customElements.define('as-route-albums', AlbumsRouteComponent);