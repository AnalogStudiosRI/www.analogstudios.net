import { html, LitElement } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getArtistById } from '../../services/artists/artists-service.ts';
import { getAlbumsByArtistId } from '../../services/albums/albums-service.ts';
import { modelArtist, modelAlbum } from '../../components/card/card.model.ts';
import type  { Artist } from '../../services/artists/artist.model.ts';
import type { Album } from '../../services/albums/album.model.ts';
import artistsSheet from './artists.css' with { type: 'css' };
import themeSheet from '../../theme.css' with { type: 'css' };
import stylesSheet from '../../styles.css' with { type: 'css' };
import '../../components/card/card.ts';
import '../../components/social-share/social-share.ts';

@customElement('as-route-artist-details')
export class ArtistDetailsRouteComponent extends LitElement {
  static styles = [themeSheet, stylesSheet, artistsSheet];

  @property()
  accessor id: string = '';

  @property()
  accessor artist: Artist = { id: 0, name: "", bio: "", imageUrl: "", isActive: "true" };;

  @property()
  accessor albums: Array<Album> = [];

  async connectedCallback() {
    super.connectedCallback();

    this.artist = await getArtistById(parseInt(this.id, 10));
    this.albums = await getAlbumsByArtistId(parseInt(this.id, 10));

    ga('set', 'page', `/artist/${encodeURIComponent(this.artist.name)}`);
    ga('send', 'pageview');
  }

  private getAlbumsForArtist(artist: Artist): TemplateResult {
    if (!this.albums || this.albums.length === 0) {
      return html``;
    } else {
      return html`
        <h2>Albums by ${artist.name}</h2>

        ${
          this.albums.map((album: Album) => {
            return html`<app-card .details="${modelAlbum(album)}"></app-card>`;
          })
        }
      `;
    }
  }

  protected render(): TemplateResult {
    const { artist } = this;

    if (!artist) {
      return html``;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { link, ...rest } = modelArtist(artist);

      return html`
        <div class="container-flex as-route-artist-details">
          <div class="row">

            <div class="col-xs-4 hidden-sm-down">
              <app-social-share></app-social-share>
            </div>

            <div class="col-xs-6">

              <div class="card-row hidden-sm-down">
                <app-card .details="${rest}"></app-card>
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
}