import { css, html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import footerCss from './footer.css?type=css';

@customElement('app-footer')
export class FooterComponent extends LitElement {
  static styles = css`${unsafeCSS(footerCss)}`;

  @property() private STARTING_YEAR = 2007;
  @property() private currentYear = new Date().getFullYear();

  protected render(): TemplateResult {
    const { currentYear, STARTING_YEAR } = this;

    return html`
      <footer class="container as-footer">
        <div class="row">

          <div class="col-xs-12">
            <p class="copyright-text">&copy; ${STARTING_YEAR} - ${currentYear} Analog Studios</p>
          </div>

        </div>
      </footer>
    `;
  }
}