/* eslint-disable max-len */
import { html, LitElement } from 'lit';
import '../../components/events-calendar/events-calendar.js';
import eventsCss from './events.css?type=css';

class EventsRouteComponent extends LitElement {

  render() {
    return html`
      <style>
        ${eventsCss}
      </style>

      <div class="as-events-container">
        <app-events-calendar></app-events-calendar>
      </div>
    `;
  }
}

customElements.define('as-route-events', EventsRouteComponent);
