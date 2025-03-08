import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getEvents } from '../../services/events/events-service.ts';
import eventsCalendarSheet from './events-calendar.css' with { type: 'css' };
import themeSheet from '../../theme.css' with { type: 'css' };

@customElement('app-events-calendar')
export class EventsCalendarComponent extends LitElement {
  static styles = [themeSheet, eventsCalendarSheet];

  private DAYS_IN_WEEK = 7;
  private MAX_CALENDAR_SPACES = 42;
  private CALENDAR = [
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
  private currentMonthData = [[Event]];

  @property()
  accessor events = [];

  @property()
  accessor currentMonthIndex;

  @property()
  accessor currentYear;

  constructor() {
    super();
    const now = new Date();

    this.currentMonthIndex = now.getMonth();
    this.currentYear = now.getFullYear();
  }

  async connectedCallback() {
    super.connectedCallback();

    this.events = await getEvents();
    this.calculateCurrentMonthData();
  }

  private calculatePreviousMonth(): void {
    if (this.currentMonthIndex === 0) {
      this.currentMonthIndex = 11;
      this.currentYear -= 1;
    } else {
      this.currentMonthIndex -= 1;
    }

    this.calculateCurrentMonthData();
  }

  private calculateNextMonth(): void {
    if (this.currentMonthIndex === 11) {
      this.currentMonthIndex = 0;
      this.currentYear += 1;
    } else {
      this.currentMonthIndex += 1;
    }

    this.calculateCurrentMonthData();
  }

  private getHeaderText(): string {
    return this.CALENDAR[this.currentMonthIndex].NAME + ' ' + this.currentYear;
  }

  private shiftToPreviousMonth(): void {
    this.calculatePreviousMonth();
  }

  private shiftToNextMonth(): void {
    this.calculateNextMonth();
  }

  private calculateCurrentMonthData(): void {
    this.currentMonthData = [];
    let week = [];
    let monthDateCounter = 1;
    const startingDayOfMonth = new Date(this.currentYear, this.currentMonthIndex).getDay();
    const daysInMonth = this.CALENDAR[this.currentMonthIndex].DAYS;

    for (let i = 0, j = this.MAX_CALENDAR_SPACES; i < j; i += 1) {
      // use null as date default to block out tiles in our calenader that aren't in the month
      // while still keeping the calendar looking "full"
      const day = {
        date: null,
        hasEvents: false,
        events: []
      };

      if (i >= startingDayOfMonth && monthDateCounter <= daysInMonth) {
        day.date = monthDateCounter;

        // check if day has an event
        for (let k = 0, m = this.events.length; k < m; k += 1) {
          const event = this.events[k];
          const eventStartTimeTimestamp = event.startTime;
          const currentDayStartTimestamp = new Date(this.currentYear, this.currentMonthIndex, monthDateCounter, 0, 0, 0).getTime() / 1000;
          const currentDayEndTimestamp = new Date(this.currentYear, this.currentMonthIndex, monthDateCounter, 23, 0, 0).getTime() / 1000;

          if (eventStartTimeTimestamp >= currentDayStartTimestamp &&
             eventStartTimeTimestamp <= currentDayEndTimestamp) {
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

  protected render(): TemplateResult {
    return html`
      <div class="as-events-calendar">
        <div class="as-events-calendar__header">
          <button type="button" class="btn btn-default btn-sm as-events-calendar__btn" @click="${this.shiftToPreviousMonth}" tabindex="-1" aria-label="goto previous month">
            <i class="fa fa-arrow-left"></i>
          </button>

          <h3 class="as-events-calendar__header-text">Event Calendar<br><span class="as-events-calendar__month">${this.getHeaderText()}</span></h3>

          <button type="button" class="btn btn-default btn-sm as-events-calendar__btn" @click="${this.shiftToNextMonth}" tabindex="-1" aria-label="goto next month">
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

        ${
          this.currentMonthData.map((week) => {
            return html`
              <div class="as-events-calendar__week">
                ${
                  week.map((day) => {
                    // @ts-expect-error fix this please
                    const dayNotInMonthContent = !day.date ? unsafeHTML('<div></div>') : '';
                    // @ts-expect-error fix this please
                    const dayInMonthContent = day.date && !day.hasEvents
                      // @ts-expect-error fix this please
                      ? day.date
                      : '';
                    // @ts-expect-error fix this please
                    const eventsInDayContent = day.hasEvents
                      // @ts-expect-error fix this please
                      ? day.events.map((event) => {
                        return html`
                          <span class="as-events-calendar__day-event">
                            <a class="as-events-calendar__day-event" href="/events/${event.id}" title="${event.title}">
                              <i class="fa fa-calendar-check-o"></i>
                            </a>
                          </span>
                        `;
                      })
                      : '';

                    return html`
                      <div class="as-events-calendar__day">
                        <!--day not in month-->
                        ${dayNotInMonthContent}

                        <!--day in month without event-->
                        ${dayInMonthContent}

                        <!--day with event if there's an event-->
                        ${eventsInDayContent}
                      </div>
                    `;
                  })
                }
              </div>
            `;
          })
        }
        </div>
      </div>
    `;
  }
}