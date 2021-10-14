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

      <div class="container as-route-events">
        <div class="row">

          <div class="col-md-12">

            <app-events-calendar></app-events-calendar>

          </div>

        </div>
      </div>
    `;
  }
}

customElements.define('as-route-events', EventsRouteComponent);