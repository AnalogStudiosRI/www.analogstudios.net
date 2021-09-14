/* eslint-disable max-depth */
import { css, html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getEvents } from '../services/events-service.js';
// import themeCss from '../../theme.css?type=css';

class EventsCalendarComponent extends LitElement {
  constructor() {
    super();
    const now = new Date();

    this.DAYS_IN_WEEK = 7;
    this.MAX_CALENDAR_SPACES = 35;
    this.CALENDAR = [
      { NAME: 'January', DAYS: 31 },
      { NAME: 'February', DAYS: 28 },
      { NAME: 'March', DAYS: 31 },
      { NAME: 'April', DAYS: 30 },
      { NAME: 'May', DAYS: 31 },
      { NAME: 'June', DAYS: 30 },
      { NAME: 'July', DAYS: 31 },
      { NAME: 'August', DAYS: 31 },
      { NAME: 'September', DAYS: 30 },
      { NAME: 'October', DAYS: 31 },
      { NAME: 'November', DAYS: 30 },
      { NAME: 'December', DAYS: 31 }
    ];
    this.events = [];
    this.currentMonthIndex = now.getMonth();
    this.currentYear = now.getFullYear();
    this.currentEventIndex = 0;
    this.hasEvents = false;
    this.currentMonthData = [];
  }

  static get properties() {
    return {
      events: { type: Array },
      currentMonthIndex: { type: Number },
      currentYear: { type: Number }
    };
  }

  // @import '../../components/bootstrap/bootstrap';
  // ${unsafeCss(themeCss)}
  static get styles() {
    return css`
      .as-events-calendar {
        .as-events-calendar__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
      
        .as-events-calendar__header-text {
          margin: 0;
          text-align: center;
        }
      
        .as-events-calendar__month {
          font-size: 1.25rem;
          font-weight: 700;
        }
      
        .as-events-calendar__btn {
          background-color: $black;
          color: $creme;
        }
      
        .as-events-calendar__days {
          display: flex;
          justify-content: space-between;
        }
      
        .as-events-calendar__week {
          display: flex;
          height: 60px;
        }
      
        .as-events-calendar__day-name {
          display: flex;
          justify-content: center;
          width: 14.285%;
        }
      
        .as-events-calendar__day {
          display: flex;
          width: 14.285%;
          align-items: center;
          justify-content: center;
          border: 1px solid $gold;
          background-color: $black;
          color: $creme;
          font-size: 1rem;
        }
      
        .as-events-calendar__day-event {
          color: $gold;
          font-size: 2rem;
          cursor: pointer;
        }
      }
    `;
  }

  async connectedCallback() {
    super.connectedCallback();

    this.events = await getEvents();
    this.calculateCurrentMonthData();
  }

  calculatePreviousMonth() {
    if (this.currentMonthIndex === 0) {
      this.currentMonthIndex = 11;
      this.currentYear -= 1;
    } else {
      this.currentMonthIndex -= 1;
    }

    this.calculateCurrentMonthData();
  }

  calculateNextMonth() {
    if (this.currentMonthIndex === 11) {
      this.currentMonthIndex = 0;
      this.currentYear += 1;
    } else {
      this.currentMonthIndex += 1;
    }

    this.calculateCurrentMonthData();
  }

  getHeaderText() {
    return this.CALENDAR[this.currentMonthIndex].NAME + ' ' + this.currentYear;
  }

  shiftToPreviousMonth() {
    this.calculatePreviousMonth();
  }

  shiftToNextMonth() {
    this.calculateNextMonth();
  }

  selectEvent(selectedEvent) {
    console.debug('selectedEvent TODO!!!', selectedEvent);
    // this.Router.navigate(['events', selectedEvent.id]);
  }

  calculateCurrentMonthData() {
    this.currentMonthData = [];
    let week = [];
    let monthDateCounter = 1;
    let startingDayOfMonth = new Date(this.currentYear, this.currentMonthIndex).getDay();
    let daysInMonth = this.CALENDAR[this.currentMonthIndex].DAYS;

    for (let i = 0, j = this.MAX_CALENDAR_SPACES; i < j; i += 1) {
      // use null as date default to block out tiles in our calenader that aren't in the month
      // while still keeping the calendar looking "full"
      let day = {
        date: null,
        hasEvents: false,
        events: []
      };

      if (i >= startingDayOfMonth && monthDateCounter <= daysInMonth) {
        day.date = monthDateCounter;

        // check if day has an event
        for (let k = 0, m = this.events.length; k < m; k += 1) {
          // TODO any https://thegreenhouse.atlassian.net/browse/AS-246
          let event = this.events[k];
          let eventStartTimeTimestamp = event.startTime;
          let currentDayStartTimestamp = new Date(this.currentYear, this.currentMonthIndex, monthDateCounter, 0, 0, 0).getTime() / 1000;
          let currentDayEndTimestamp = new Date(this.currentYear, this.currentMonthIndex, monthDateCounter, 23, 0, 0).getTime() / 1000;

          if (eventStartTimeTimestamp >= currentDayStartTimestamp &&
             eventStartTimeTimestamp <= currentDayEndTimestamp) {
            // TODO support multiple events on same day https://thegreenhouse.atlassian.net/browse/AS-260
            if (!day.hasEvents) {
              day.events.push(event);
              day.hasEvents = true;
            }
          }
        }

        monthDateCounter += 1;
      }

      week.push(day);

      if (week.length === this.DAYS_IN_WEEK) {
        this.currentMonthData.push(week);
        week = [];
      }

    }
  }

  render() {
    return html`      
      <div class="as-events-calendar">
        <div class="as-events-calendar__header">
          <button type="button" class="btn btn-default btn-sm as-events-calendar__btn" @click="${this.shiftToPreviousMonth}" tabindex="-1">
            <i class="fa fa-arrow-left"></i>
          </button>
      
          <h3 class="as-events-calendar__header-text">Event Calendar<br><span class="as-events-calendar__month">${this.getHeaderText()}</span></h3>
      
          <button type="button" class="btn btn-default btn-sm as-events-calendar__btn" @click="${this.shiftToNextMonth}" tabindex="-1">
            <i class="fa fa-arrow-right"></i>
          </button>
        </div>
      
        <div class="as-events-calendar__days">
          <div class="as-events-calendar__day-name">Sun</div>
          <div class="as-events-calendar__day-name">Mon</div>
          <div class="as-events-calendar__day-name">Tue</div>
          <div class="as-events-calendar__day-name">Wed</div>
          <div class="as-events-calendar__day-name">Thu</div>
          <div class="as-events-calendar__day-name">Fri</div>
          <div class="as-events-calendar__day-name">Sat</div>
        </div>

        <div class="as-events-calendar__week">
        ${
          this.currentMonthData.map((week) => {
            return week.map((day) => {
              const dayNotInMonthContent = !day.date ? unsafeHTML('<div></div>') : '';
              const dayInMonthContent = day.date && !day.hasEvents 
                ? day.date
                : '';
              const eventsInDayContent = day.hasEvents
                ? day.events.map((event) => {
                  return html`
                    <a href="/events/${event.id}" title="${event.title}">
                      ${event.title}
                      <i class="fa fa-calendar-check-o"></i>
                    </span>
                  `;
                })
                : '';

              return html`
                <!--day not in month-->
                ${dayNotInMonthContent}
          
                <!--day in month without event-->
                ${dayInMonthContent}
          
                <!--day with event if there's an event-->
                ${eventsInDayContent}
              `;
            });
          })
        }
        </div>
      </div>
    `;
  }
}

customElements.define('app-events-calendar', EventsCalendarComponent);