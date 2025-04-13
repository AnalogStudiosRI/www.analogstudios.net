import { html, LitElement, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property } from 'lit/decorators.js';
import { getEventById } from '../../services/events/events-service.ts';
import { Event } from '../../services/events/event.model.ts';
import '../../components/social-share/social-share.ts';
import eventsSheet from './events.css' with { type: 'css' };
import themeSheet from '../../theme.css' with { type: 'css' };

@customElement('as-route-event-details')
export class EventDetailsRouteComponent extends LitElement {
  static styles = [themeSheet, eventsSheet];

  private MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  @property()
  accessor id: string;

  @property()
  accessor event: Event;

  async connectedCallback() {
    super.connectedCallback();

    // @ts-expect-error fix this please
    this.event = await getEventById(parseInt(this.id, 10));

    ga('set', 'page', `/event/${encodeURIComponent(this.event.title)}`);
    ga('send', 'pageview');
  }

  // EEEE, MMMM d, yyyy, h:mm a
  // SATURDAY, FEBRUARY 6, 2016, 9:00 PM
  private formatEventTime(timestamp: number): string {
    const dateObj = new Date(timestamp * 1000);
    const day = this.DAYS[dateObj.getDay()].toUpperCase();
    const month = this.MONTHS[dateObj.getMonth()].toUpperCase();
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const hour = hours <= 12 ? hours : hours - 12;
    const minutes = dateObj.getMinutes();
    const minute = minutes <= 9 ? `0${minutes}` : minutes;
    const ampm = hours <= 11 ? 'AM' : 'PM';

    return `${day}, ${month} ${date}, ${year}, ${hour}:${minute} ${ampm}`;
  }

  protected render(): TemplateResult {
    const { event } = this;

    if (!event) {
      return html``;
    } else {
      return html`
        <div class="as-events-container">
          <div id="as-event-detail-container">
            <app-social-share></app-social-share>
            <i class="cal-icon fa fa-calendar-o" style="font-size: 5rem;width:10%"></i>
            <div id="as-event-info">
              <p>Event Title: ${event.title}</p>
              <p>Event Date: ${this.formatEventTime(parseInt(event.startTime, 10))}</p>
              <p>Event Info:</p>
              <p style="color: var(--color-primary)">${unsafeHTML(event.description)}</p>
            </div>
          </div>
        </div>
      `;
    }
  }
}