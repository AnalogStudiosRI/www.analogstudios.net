/* eslint-disable max-len */
import { css, html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/events-calendar/events-calendar.ts';
import eventsCss from './events.css?type=raw';
import theme from '../../theme.css' with { type: 'css' };

@customElement('as-route-events')
export class EventsRouteComponent extends LitElement {
  static styles = [theme, css`${unsafeCSS(eventsCss)}`];

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