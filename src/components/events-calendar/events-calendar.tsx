// TODO: page load hangs if we use import aliases (e.g. #)
import { getEvents } from "../../services/events.ts";
import eventsCalendarSheet from "./events-calendar.css" with { type: "css" };
import eventsSheet from "../../styles/events.css" with { type: "css" };
import themeSheet from "../../styles/theme.css" with { type: "css" };
import { slugifyer } from "../../services/util.ts";
import type { Event } from "#services/events.ts";

interface Day {
  date: number | null;
  hasEvents: boolean;
  events: Event[];
}

type Week = Day[];

export class EventsCalendarComponent extends HTMLElement {
  #DAYS_IN_WEEK = 7;
  #MAX_CALENDAR_SPACES = 42;
  #CALENDAR = [
    { NAME: "January", DAYS: 31 },
    { NAME: "February", DAYS: 28 },
    { NAME: "March", DAYS: 31 },
    { NAME: "April", DAYS: 30 },
    { NAME: "May", DAYS: 31 },
    { NAME: "June", DAYS: 30 },
    { NAME: "July", DAYS: 31 },
    { NAME: "August", DAYS: 31 },
    { NAME: "September", DAYS: 30 },
    { NAME: "October", DAYS: 31 },
    { NAME: "November", DAYS: 30 },
    { NAME: "December", DAYS: 31 },
  ];
  #events: Event[] = [];
  #currentMonthIndex: number;
  #currentMonthData: Week[] = [];
  #currentYear: number;

  constructor() {
    super();
    const now = new Date();

    this.#currentMonthIndex = now.getMonth();
    this.#currentYear = now.getFullYear();
  }

  async connectedCallback() {
    this.#events = await getEvents();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    this?.shadowRoot?.adoptedStyleSheets?.push(themeSheet, eventsSheet, eventsCalendarSheet);
    this.#calculateCurrentMonthData();
    this.render();
  }

  #calculateCurrentMonthData(): void {
    this.#currentMonthData = [];
    let week: Week = [];
    let monthDateCounter = 1;
    const startingDayOfMonth = new Date(this.#currentYear, this.#currentMonthIndex).getDay();
    const daysInMonth = this.#CALENDAR[this.#currentMonthIndex].DAYS;

    for (let i = 0, j = this.#MAX_CALENDAR_SPACES; i < j; i += 1) {
      // use null as date default to block out tiles in our calender that aren't in the month
      // while still keeping the calendar looking "full"
      const day: Day = {
        date: null,
        hasEvents: false,
        events: [],
      };

      if (i >= startingDayOfMonth && monthDateCounter <= daysInMonth) {
        day.date = monthDateCounter;

        // check if day has an event
        for (let k = 0, m = this.#events.length; k < m; k += 1) {
          const event = this.#events[k];
          const eventStartTimeTimestamp = event.startTime;
          const currentDayStartTimestamp =
            new Date(
              this.#currentYear,
              this.#currentMonthIndex,
              monthDateCounter,
              0,
              0,
              0,
            ).getTime() / 1000;
          const currentDayEndTimestamp =
            new Date(
              this.#currentYear,
              this.#currentMonthIndex,
              monthDateCounter,
              23,
              0,
              0,
            ).getTime() / 1000;

          if (
            eventStartTimeTimestamp >= currentDayStartTimestamp &&
            eventStartTimeTimestamp <= currentDayEndTimestamp
          ) {
            if (!day.hasEvents) {
              day.events.push(event);
              day.hasEvents = true;
            }
          }
        }

        monthDateCounter += 1;
      }

      week.push(day);

      if (week.length === this.#DAYS_IN_WEEK) {
        this.#currentMonthData.push(week);
        week = [];
      }
    }
  }

  #calculatePreviousMonth(): void {
    if (this.#currentMonthIndex === 0) {
      this.#currentMonthIndex = 11;
      this.#currentYear -= 1;
    } else {
      this.#currentMonthIndex -= 1;
    }

    this.#calculateCurrentMonthData();
  }

  #calculateNextMonth(): void {
    if (this.#currentMonthIndex === 11) {
      this.#currentMonthIndex = 0;
      this.#currentYear += 1;
    } else {
      this.#currentMonthIndex += 1;
    }

    this.#calculateCurrentMonthData();
  }

  #getHeaderText(): string {
    return this.#CALENDAR[this.#currentMonthIndex].NAME + " " + this.#currentYear;
  }

  // TODO: private methods are not supported by WCC <> JSX event handlers
  shiftToPreviousMonth(): void {
    this.#calculatePreviousMonth();
    this.render();
  }

  // TODO: private methods are not supported by WCC <> JSX event handlers
  shiftToNextMonth(): void {
    this.#calculateNextMonth();
    this.render();
  }

  render() {
    const html = this.#currentMonthData
      .map((week) => {
        return `
        <div class="as-events-calendar__week">
          ${week.map((day) => {
            const dayNotInMonthContent = !day.date ? "<div></div>" : "";
            const dayInMonthContent = day.date && !day.hasEvents ? day.date : "";
            const eventsInDayContent = day.hasEvents
              ? day.events.map((event) => {
                  return `
                    <span class="as-events-calendar__day-event">
                      <a class="as-events-calendar__day-event" href="/events/${slugifyer(event.title)}/" title="${event.title}">
                        <i class="fa fa-calendar-check-o"></i>
                      </a>
                    </span>
                  `;
                })
              : "";

            return `
                <div class="as-events-calendar__day">
                  <!--day not in month-->
                  ${dayNotInMonthContent}

                  <!--day in month without event-->
                  ${dayInMonthContent}

                  <!--day with event if there's an event-->
                  ${eventsInDayContent}
                </div>
              `;
          })}
        </div>
      `;
      })
      .join("");
    const headerText = this.#getHeaderText();

    return (
      <div class="as-events-calendar">
        <div class="as-events-calendar__header">
          <button
            type="button"
            class="btn btn-default btn-sm as-events-calendar__btn"
            onclick={this.shiftToPreviousMonth}
            tabindex={-1}
            aria-label="goto previous month"
          >
            <i class="fa fa-arrow-left"></i>
          </button>

          <h3 class="as-events-calendar__header-text">
            Event Calendar
            <br />
            <span class="as-events-calendar__month">{headerText}</span>
          </h3>

          <button
            type="button"
            class="btn btn-default btn-sm as-events-calendar__btn"
            onclick={this.shiftToNextMonth}
            tabindex={-1}
            aria-label="goto next month"
          >
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

        {html}
      </div>
    );
  }
}

customElements.define("as-events-calendar", EventsCalendarComponent);
