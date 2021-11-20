import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getAlbumById } from '../../services/albums/albums-service.ts';
import { modelAlbum } from '../../components/card/card.model.ts';
import { Album } from '../../services/albums/album.model.ts';
import '../../components/card/card.ts';
import albumsCss from './albums.css?type=css';

@customElement('as-route-album-details')
export class AlbumDetailsRouteComponent extends LitElement {

  @property() album: Album;

  static properties() {
    return {
      id: String,
      album: Object
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.album = await getAlbumById(this.id);
  }

  private getDownloadLink(album: Album): TemplateResult {
    if (!album.downloadUrl) {
      return html``;
    } else {
      return html`
        <a class="download-url as-link" href="${album.downloadUrl}">Download Link</a>
      `;
    }
  }

  /* eslint-disable indent */
  protected render(): TemplateResult {
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