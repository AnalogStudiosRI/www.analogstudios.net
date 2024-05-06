import { css, html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import footerCss from './footer.css?type=raw';

@customElement('app-footer')
export class FooterComponent extends LitElement {
  static styles = css`${unsafeCSS(footerCss)}`;

  @property()
  private accessor STARTING_YEAR = 2007;

  @property()
  private accessor currentYear = new Date().getFullYear();

  protected render(): TemplateResult {
    const { currentYear, STARTING_YEAR } = this;

    return html`
     <footer class="container as-footer">
        <section>
          <h2>Analog Studio's Footer</h2>
          <article class="col-xs-12">
            <h3>Socials</h3>
            <ul class="socials">
              <li>
                <a href="https://www.facebook.com/analogstudiosri/"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                >
                  <i class="fa fa-facebook-square" aria-hidden="true">
                    <strong>Facebook</strong>
                  </i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCxs5mxoDpmmR0hRbwsxU7Sg/"
                target="_blank" rel="noopener noreferrer"
                aria-label="Visit our YouTube channel"
              >
                  <i class="fa fa-youtube-play" aria-hidden="true">
                    <strong>YouTube</strong>
                  </i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/analogstudios"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Visit our Twitter account"
                >
                  <i class="fa fa-twitter" aria-hidden="true">
                    <strong>Twitter</strong>
                  </i>
                </a>
              </li>
              <li>
              <a href="https://www.instagram.com/dave.flamand/"
                target="_blank" rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
              >
                <i class="fa fa-instagram" aria-hidden="true">
                  <strong>Instagram</strong>
                </i>
              </a>
            </li>
            </ul>
          </article>
          <article class="col-xs-12">
           <h3>Copyright</h3>
            <p class="copyright-text">&copy; ${STARTING_YEAR} - ${currentYear} Analog Studios</p>
          </article>
        </section>
      </footer>
    `;
  }
}