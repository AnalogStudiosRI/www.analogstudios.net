/* eslint-disable max-len */
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/events-calendar/events-calendar.ts';
import eventsCss from './events.css?type=css';

@customElement('as-route-events')
class EventsRouteComponent extends LitElement {

  protected render() {
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