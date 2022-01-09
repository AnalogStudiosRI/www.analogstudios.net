import { css, html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import socialShareCss from './social-share.css?type=css';

@customElement('app-socials-media')
export class NavigationComponent extends LitElement {
  static styles = css`${unsafeCSS(socialShareCss)}`;
  protected render(): TemplateResult {
    return html`
      <section class="socials">
        <h2>Social Links</h2>
        <article>
          <h3>Unordered List of Social Links</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com/analogstudiosri/">
                <i class="fa fa-facebook-square" aria-hidden="true">
                  <strong>Facebook</strong>
                </i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCxs5mxoDpmmR0hRbwsxU7Sg/">
                <i class="fa fa-youtube-play" aria-hidden="true">
                  <strong>YouTube</strong>
                </i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/dave.flamand/">
                <i class="fa fa-instagram" aria-hidden="true">
                  <strong>Instagram</strong>
                </i>
              </a>
            </li>
          </ul>
        </article>
      </section>
    `;
  }
}
