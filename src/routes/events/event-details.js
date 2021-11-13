import { html, LitElement } from 'lit';

class EventDetailsRouteComponent extends LitElement {

  static get properties() {
    return {
      id: String
    };
  }

  /* eslint-disable indent */
  render() {
    return html`
      <h1>Hello Event Details => ${this.id}!</h1>
    `;
  }
  /* eslint-enable indent */
}

customElements.define('as-route-event-details', EventDetailsRouteComponent);