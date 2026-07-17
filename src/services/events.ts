interface Event {
  id: number;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  createdTime: string;
  tags?: string[];
}

const EVENTS_API_URL = "/api/events";

async function getEvents(): Promise<Event[]> {
  return fetch(EVENTS_API_URL).then((resp) => resp.json());
}

async function getEventById(id: number): Promise<Event> {
  return fetch(`${EVENTS_API_URL}?id=${id}`)
    .then((resp) => resp.json())
    .then((resp) => resp[0]);
}

export { getEvents, getEventById };

export type { Event };
