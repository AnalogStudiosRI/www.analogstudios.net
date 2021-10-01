import { css, html, LitElement, unsafeCSS } from 'lit';
import footerCss from './footer.css?type=css';

class FooterComponent extends LitElement {
  constructor() {
    super();

    this.STARTING_YEAR = 2007;
    this.currentYear = new Date().getFullYear(); 
  }

  static get styles() {
    return css`
      ${unsafeCSS(footerCss)}
    `;
  }

  render() {
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

customElements.define('app-footer', FooterComponent);