/* eslint-disable max-len */
import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getArtistById } from '../../services/artists/artists-service.ts';
import { getAlbumsByArtistId } from '../../services/albums/albums-service.ts';
import { modelArtist, modelAlbum } from '../../components/card/card.model.ts';
import '../../components/card/card.ts';
import artistsCss from './artists.css?type=css';

class ArtistDetailsRouteComponent extends LitElement {

  static get properties() {
    return {
      id: Number,
      artist: Object,
      albums: Array
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.artist = await getArtistById(this.id);
    this.albums = await getAlbumsByArtistId(this.id);
  }

  getAlbumsForArtist(artist) {
    if (!this.albums || this.albums.length === 0) {
      return html``;
    } else {
      return html`
        <h2>Albums by ${artist.name}</h2>

        ${
          this.albums.map((album) => {
            return html`<app-card .details="${modelAlbum(album)}"></app-card>`;
          })
        }
      `;
    }
  }

  /* eslint-disable indent */
  render() {
    const { artist } = this;

    if (!artist) {
      return html``;
    } else {
      return html`
        <style>
          ${artistsCss}
        </style>

        <div class="container-flex as-route-artist-details">
          <div class="row">

            <div class="col-xs-4 hidden-sm-down">
              <as-social-share></as-social-share>
            </div>

            <div class="col-xs-6">

              <div class="card-row hidden-sm-down">
                <app-card .details="${modelArtist(artist)}"></app-card>
              </div>

              <div class="card-row hidden-md-up" >
                <h4>${artist.name}</h4>
                <img src="${artist.imageUrl}" alt="${artist.name}"/>
                <p>${unsafeHTML(artist.bio)}</p>
              </div>

              ${this.getAlbumsForArtist(artist)}

            </div>
          </div>
        </div>
      `;
    }
  }
  /* eslint-enable indent */
}

customElements.define('as-route-artist-details', ArtistDetailsRouteComponent);