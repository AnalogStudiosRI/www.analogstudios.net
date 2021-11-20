/* eslint-disable max-len */
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navigate } from 'lit-redux-router';
import { getAlbums } from '../../services/albums/albums-service.ts';
import { modelAlbum } from '../../components/card/card.model.ts';
import { Album } from '../../services/albums/album.model.ts';
import store from '../../store.ts';
import '../../components/card/card.ts';
import albumsCss from './albums.css?type=css';

@customElement('as-route-albums')
class AlbumsRouteComponent extends LitElement {

  @property()
  albums: Array<Album> = [];

  static properties() {
    return {
      albums: { type: Array }
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.albums = await getAlbums();
  }

  private onAlbumSelected() {
    const selectedAlbumId = this.shadowRoot.querySelector('select').value;

    store.dispatch(navigate(`/albums/${selectedAlbumId}`));
  }

  /* eslint-disable indent */
  protected render(): TemplateResult {
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
              ${albums.map((album: Album) => {
                return html`
                  <option .value="${album.id}">${album.title}</option>
                `;
              })}
              <!-- <option *ngFor="let artist of getArtists()" value="artist.id">{{artist.name | ellipsis: 15}}</option> -->
            </select>

          </div>

          <div class="col-xs-7">
            ${albums.map((album: Album) => {
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