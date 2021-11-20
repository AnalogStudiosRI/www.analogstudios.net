import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Artist } from '../../services/artists/artist.model';
import { Album } from '../../services/albums/album.model';
import { Details } from './card.model.ts';
import cardCss from './card.css?type=css';

@customElement('app-card')
class CardComponent extends LitElement {
  @property()
  details: Details;

  static properties() {
    return {
      details: { type: Object }
    };
  }

  static styles = css`${unsafeCSS(cardCss)}`;

  protected render() {
    const { details } = this;

    return html`
      <div class="container as-card">
        <div class="row">
          <!-- why doesn't col-xs-12 work here -->
          <div class="col-xs-12">

            <a href="${details.link}" title="Visit ${details.headingText}">
              <div class="card-row hidden-sm-down">
                <div class="media">

                  <div class="media-left">
                    <img class="media-object" src="${details.imagePath}" alt="${details.imageAltText}">
                  </div>

                  <div class="media-body">
                    <!-- TODO anchor link here (click)="onArtistClicked(artist)" -->
                    <h4 class="media-heading">${details.headingText}</h4>
                    <p>${unsafeHTML(details.bodyText || '')}</p>
                  </div>

                </div>
              </div>
            </a>

            <a href="${details.link}" title="Visit ${details.headingText}">
              <div class="card-row hidden-md-up">
                <h4>${details.headingText}</h4>
                <img src="${details.imagePath}" alt="${details.imageAltText}">
              </div>
            </a>

          </div>

        </div>
      </div>
    `;
  }
}