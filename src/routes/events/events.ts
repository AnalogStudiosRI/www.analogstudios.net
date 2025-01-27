import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/events-calendar/events-calendar.ts';
import eventsSheet from './events.css' with { type: 'css' };
import themeSheet from '../../theme.css' with { type: 'css' };

@customElement('as-route-events')
export class EventsRouteComponent extends LitElement {
  static styles = [themeSheet, eventsSheet];

  connectedCallback(): void {
    super.connectedCallback();

    ga('set', 'page', '/events');
    ga('send', 'pageview');
  }

  protected render(): TemplateResult {
    return html`
      <div class="as-events-container">
        <app-events-calendar></app-events-calendar>
      </div>
    `;
  }
}