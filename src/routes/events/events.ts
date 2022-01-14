/* eslint-disable max-len */
import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/events-calendar/events-calendar.ts';
import eventsCss from './events.css?type=css';

@customElement('as-route-events')
export class EventsRouteComponent extends LitElement {

  protected connectedCallback(): void {
    super.connectedCallback();

    ga('set', 'page', '/events');
    ga('send', 'pageview');
  }

  protected render(): TemplateResult {
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
