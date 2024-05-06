import { css, html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import socialShareCss from './social-share.css?type=raw';
import 'web-social-share';

@customElement('app-social-share')
export class NavigationComponent extends LitElement {
  static styles = css`${unsafeCSS(socialShareCss)}`;

  @property()
  accessor show = false;

  shareConfig = {};

  constructor() {
    super();

    const socialShareUrl = window.location.href;

    this.shareConfig = {
      displayNames: true,
      config: [{
        facebook: {
          socialShareUrl
        }
      }, {
        twitter: {
          socialShareUrl
        }
      }, {
        pinterest: {
          socialShareUrl
        }
      }]
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.shadowRoot.addEventListener('closed', () => {
      this.toggleShowSocialShare();
    });
  }

  toggleShowSocialShare() {
    this.show = !this.show;
  }

  protected render(): TemplateResult {
    return html`
      <div class="container">
        <div class="row">

          <h2 class="header">Interact + Share</h2>

          <button type="button" class="btn" @click=${this.toggleShowSocialShare}>
            <svg class="svg-inline--fa fa-share-alt fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="share-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>
            SHARE THIS PAGE
          </button>

          <web-social-share class="wss" .show=${this.show} .share=${this.shareConfig}>
            <i class="fa fa-facebook" slot="facebook"></i>
            <i class="fa fa-twitter" slot="twitter"></i>
            <i class="fa fa-pinterest" slot="pinterest"></i>
          </web-social-share>

        </div>
      </div>
    `;
  }
}