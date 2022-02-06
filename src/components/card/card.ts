import { css, html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Details } from './card.model.ts';
import cardCss from './card.css?type=css';

@customElement('app-card')
export class CardComponent extends LitElement {
  @property() details: Details;

  static styles = css`${unsafeCSS(cardCss)}`;

  protected render():TemplateResult {
    const { details } = this;

    console.debug({ details });

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
                    <h3 class="media-heading">${details.headingText}</h3>
                    <p>${unsafeHTML(details.bodyText || '')}</p>
                  </div>

                </div>
              </div>
            </a>

            <a href="${details.link}" title="Visit ${details.headingText}">
              <div class="card-row hidden-md-up">
                <h3>${details.headingText}</h3>
                <img src="${details.imagePath}" alt="${details.imageAltText}">
              </div>
            </a>

          </div>

        </div>
      </div>
    `;
  }
}