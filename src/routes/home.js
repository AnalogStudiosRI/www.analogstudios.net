import { html, LitElement } from 'lit';

class HomeRouteComponent extends LitElement {

  constructor() {
    super();

    console.debug('ENTER: home page route');
  }

  connectedCallback() {
    super.connectedCallback();

    console.debug('// TODO - fetch events');
  }

  render() {
    console.debug('// TDOD - render events');
    return html`<h2>Coming Soon!</h2>`;
  }
}

customElements.define('as-route-home', HomeRouteComponent);