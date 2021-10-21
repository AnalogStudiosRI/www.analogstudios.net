import { html, LitElement } from 'lit';

class AlbumDetailsRouteComponent extends LitElement {

  static get properties() {
    return {
      id: String
    };
  }

  /* eslint-disable indent */
  render() {
    return html`
      <h1>Hello Album Details => ${this.id}!</h1>
    `;
  }
  /* eslint-enable indent */
}

customElements.define('as-route-album-details', AlbumDetailsRouteComponent);