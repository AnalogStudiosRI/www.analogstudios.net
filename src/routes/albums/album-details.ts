import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getAlbumById } from '../../services/albums/albums-service.ts';
import { modelAlbum } from '../../components/card/card.model.ts';
import { Album } from '../../services/albums/album.model.ts';
import themeSheet from '../../theme.css' with { type: 'css' };
import albumsSheet from './albums.css' with { type: 'css' };
import '../../components/card/card.ts';
import '../../components/social-share/social-share.ts';

@customElement('as-route-album-details')
export class AlbumDetailsRouteComponent extends LitElement {
  static styles = [themeSheet, albumsSheet];

  @property()
  accessor id: string;

  @property()
  accessor album: Album;

  async connectedCallback() {
    super.connectedCallback();

    this.album = await getAlbumById(this.id);

    ga('set', 'page', `/album/${encodeURIComponent(this.album.title)}`);
    ga('send', 'pageview');
  }

  private getDownloadLink(album: Album): TemplateResult {
    if (!album.downloadUrl) {
      return html``;
    } else {
      return html`
        <a class="download-url as-link" href="${album.downloadUrl}" rel="noopener noreferrer">Download Link</a>
      `;
    }
  }

  /* eslint-disable indent */
  protected render(): TemplateResult {
    const { album } = this;

    if (!album) {
      return html``;
    } else {
      const formattedTitle = `${album.title} (${album.year})`;
      const modeledAlbum = modelAlbum(album);

      album.title = formattedTitle;

      // don't need links on details pages
      delete modeledAlbum.link;

      return html`
        <div class="container-flex as-routes-album-details">
          <div class="row">

            <div class="col-xs-4 hidden-sm-down">
              <app-social-share></app-social-share>
            </div>

            <div class="col-xs-6">

              <div class="card-row hidden-sm-down">
                ${this.getDownloadLink(album)}
                <app-card .details="${modeledAlbum}"></app-card>
              </div>

              <div class="card-row hidden-md-up">
                <h4>${formattedTitle}</h4>
                <img src="${album.imageUrl}" alt="${formattedTitle}"/>
                <p>${unsafeHTML(album.description)}</p>
              </div>

            </div>

          </div>
        </div>
      `;
    }
  }
  /* eslint-enable indent */
}