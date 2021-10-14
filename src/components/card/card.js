import { css, html, LitElement, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import cardCss from './card.css?type=css';

function modelAlbum(album) {
  return {
    imagePath: album ? album.imageUrl : '',
    headingText: album ? album.title : '',
    bodyText: album ? album.description : '',
    imageAltText: album ? album.title : '',
    link: album ? '/albums/' + album.id : ''
  };
}

function modelArtist(artist) {
  return {
    imagePath: artist ? artist.imageUrl : '',
    headingText: artist ? artist.name : '',
    bodyText: artist ? artist.bio : '',
    imageAltText: artist ? artist.name : '',
    link: artist ? '/artists/' + artist.id : ''
  };
}

class CardComponent extends LitElement {
  static get properties() {
    return {
      details: { type: Object }
    };
  }

  static get styles() {
    return css`
      ${unsafeCSS(cardCss)}`;
  }

  constructor() {
    super();
  }

  render() {
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
                    <p>${unsafeHTML(details.bodyText)}</p>
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

export {
  modelAlbum,
  modelArtist
};

customElements.define('app-card', CardComponent);