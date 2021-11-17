import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getAlbumById } from '../../services/albums-service.js';
import { modelAlbum } from '../../components/card/card.js';
import albumsCss from './albums.css?type=css';

class AlbumDetailsRouteComponent extends LitElement {

  static get properties() {
    return {
      id: String,
      album: Object
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.album = await getAlbumById(this.id);
  }

  getDownloadLink(album) {
    if (!album.downloadUrl) {
      return html``;
    } else {
      return html`
        <a class="download-url as-link" href="${album.downloadUrl}">Download Link</a>
      `;
    }
  }

  /* eslint-disable indent */
  render() {
    const { album } = this;

    if (!album) {
      return html``;
    } else {
      return html`
        <style>
          ${albumsCss}
        </style>

        <div class="container-flex as-routes-album-details">
          <div class="row">

            <div class="col-xs-4 hidden-sm-down">
              <as-social-share></as-social-share>
            </div>

            <div class="col-xs-6">

              <div class="card-row hidden-sm-down">
                ${this.getDownloadLink(album)}
                <app-card .details="${modelAlbum(album)}"></as-card>
              </div>

              <div class="card-row hidden-md-up">
                <h4>${album.title}</h4>
                <img src="${album.imageUrl}" alt="${album.title}"/>
                <p>${unsafeHTML(album.description)}></p>
              </div>

            </div>

          </div>
        </div>
      `;
    }
  }
  /* eslint-enable indent */
}

customElements.define('as-route-album-details', AlbumDetailsRouteComponent);