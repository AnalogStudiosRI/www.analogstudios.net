import { css, html, LitElement, unsafeCSS } from 'lit';
import '../navigation/navigation.js';
import headerCss from './header.css?type=css';

class HeaderComponent extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return css`
      ${unsafeCSS(headerCss)}`;
  }

  render() {
    return html`
      <header class="as-header">
        <div id="as-inner-header">
          <h1 class="as-header__logo"><a title="Home Page" href="/">Analog Studios</a></h1>
          <app-navigation></app-navigation>
        </div>
      </header>
    `;
  }
}

customElements.define('app-header', HeaderComponent);
