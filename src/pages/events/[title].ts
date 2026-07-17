import { slugifyer } from "#services/util.ts";
import type { Event } from "#services/events.ts";

interface Props {
  params: {
    title: string;
  };
}

export default class EventDetailsPage extends HTMLElement {
  #MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  #DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  #title: string;

  constructor({ params }: Props) {
    super();
    this.#title = params?.title ?? "No Title";
  }

  // EEEE, MMMM d, yyyy, h:mm a
  // SATURDAY, FEBRUARY 6, 2016, 9:00 PM
  formatEventTime(timestamp: number | undefined): string {
    if (!timestamp) return "";

    const dateObj = new Date(timestamp * 1000);
    const day = this.#DAYS[dateObj.getDay()].toUpperCase();
    const month = this.#MONTHS[dateObj.getMonth()].toUpperCase();
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const hour = hours <= 12 ? hours : hours - 12;
    const minutes = dateObj.getMinutes();
    const minute = minutes <= 9 ? `0${minutes}` : minutes;
    const ampm = hours <= 11 ? "AM" : "PM";

    return `${day}, ${month} ${date}, ${year}, ${hour}:${minute} ${ampm}`;
  }

  async connectedCallback() {
    // TODO: better environment variable management / client side vs SSR
    // https://github.com/ProjectEvergreen/greenwood/discussions/1530
    const events = await fetch("http://www.analogstudios.net/api/events")
      .then((resp) => resp.json())
      .then((resp) => resp as Event[]);
    const event = [
      ...events,
      {
        id: 82,
        title: "Test Event",
        description:
          '\u003Cp\u003EBlissRI is back again for a two-day event!  We will be live-streaming the event so if you can&#39;t make it down, check out the live stream on \u003Ca href="https://www.youtube.com/watch?v=Pkzw1C17Eag"\u003EYouTube\u003C/a\u003E or \u003Ca href="https://www.facebook.com/events/747593301143608/"\u003EFacebook\u003C/a\u003E.\u003C/p\u003E\u003Cimg src="//images.ctfassets.net/kpfxkjvd7pox/1YFY5EZvqgWlaLafANbZEs/ece5d39a0f578a4f2f690663e504e32d/bliss-2025.jpg" loading="lazy"/\u003E\u003Cp\u003E\u003C/p\u003E',
        startTime: Math.floor(new Date().getTime() / 1000),
        endTime: Math.floor(new Date().getTime() / 1000) + 3600,
        createdTime: new Date().toISOString(),
        tags: [],
      },
    ].find((event) => slugifyer(event?.title) === this.#title);

    this.innerHTML = `
      <head>
        <title>Analog Studios RI - ${event?.title}</title>
        <meta property="og:title" content="Analog Studios RI - ${event?.title}" />
      </head>
      <body>
        <div class="as-events-container as-route-event-details">
          <div id="as-event-detail-container">
            <as-social-share></as-social-share>
            <i class="cal-icon fa fa-calendar-o" style="font-size: 5rem;width:10%"></i>
            <div id="as-event-info">
              <p>Event Title: ${event?.title}</p>
              <p>Event Date: ${this.formatEventTime(event?.startTime)}</p>
              <p>Event Info:</p>
              <p style="color: var(--color-primary)">${event?.description}</p>
            </div>
          </div>
        </div>
      </body>
    `;
  }
}

export const prerender = false;
