import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property } from 'lit/decorators.js';
import { getEventById } from '../../services/events/events-service.ts';
import { Event } from '../../services/events/event.model.ts';
import eventsCss from './events.css?type=css';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@customElement('as-route-event-details')
class EventDetailsRouteComponent extends LitElement {

  @property()
  event: Event;

  static properties() {
    return {
      id: String,
      event: Object
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.event = await getEventById(this.id);
  }

  // EEEE, MMMM d, yyyy, h:mm a
  // SATURDAY, FEBRUARY 6, 2016, 9:00 PM
  private formatEventTime(timestamp: number): string {
    const dateObj = new Date(timestamp * 1000);
    const day = DAYS[dateObj.getDay()].toUpperCase();
    const month = MONTHS[dateObj.getMonth()].toUpperCase();
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const hour = hours <= 12 ? hours : hours - 12;
    const minutes = dateObj.getMinutes();
    const minute = minutes <= 9 ? `0${minutes}` : minutes;
    const ampm = hours <= 11 ? 'AM' : 'PM';

    return `${day}, ${month} ${date}, ${year}, ${hour}:${minute} ${ampm}`;
  }

  /* eslint-disable indent */
  protected render() {
    const { event } = this;

    if (!event) {
      return html``;
    } else {
      return html`
        <style>
          ${eventsCss}
        </style>

        <div class="as-events-container">

          <div id="as-event-detail-container">
            <i class="cal-icon fa fa-calendar-o" style="font-size: 5rem;width:20%"></i>
            <div id="as-event-info">
              <p>Event Title: ${event.title}</p>
              <p>Event Date: ${this.formatEventTime(event.startTime)}</p>
              <p>Event Info:</p>
              <p style="color: var(--color-primary)">${unsafeHTML(event.description)}</p>
            </div>
          </div>
          <as-social-share></as-social-share>
        </div>
      `;
    }
  }
  /* eslint-enable indent */
}
