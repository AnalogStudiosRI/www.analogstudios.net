import { css, html, LitElement } from 'lit';

class HeaderComponent extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return css`
      h1 {
        color: grey; /* $black */
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <header>
        <h1>Welcome to Analog Studios!</h1>
      </header>
    `;
  }
}

customElements.define('app-header', HeaderComponent);