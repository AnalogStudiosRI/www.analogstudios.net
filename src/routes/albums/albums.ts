import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navigate } from 'lit-redux-router';
import { getAlbums } from '../../services/albums/albums-service.ts';
import { modelAlbum } from '../../components/card/card.model.ts';
import { Album } from '../../services/albums/album.model.ts';
import store from '../../store.ts';
import albumsSheet from './albums.css' with { type: 'css' };
import themeSheet from '../../theme.css' with { type: 'css' };
import stylesSheet from '../../styles.css' with { type: 'css' };
import '../../components/card/card.ts';

@customElement('as-route-albums')
export class AlbumsRouteComponent extends LitElement {
  static styles = [themeSheet, stylesSheet, albumsSheet];

  @property()
  accessor albums: Array<Album> = [];

  async connectedCallback() {
    super.connectedCallback();

    this.albums = await getAlbums();

    ga('set', 'page', '/albums');
    ga('send', 'pageview');
  }

  private onAlbumSelected(): void {
    const selectedAlbumId = this.shadowRoot.querySelector('select').value;

    store.dispatch(navigate(`/albums/${selectedAlbumId}`));
  }

  protected render(): TemplateResult {
    const { albums } = this;

    return html`
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
}