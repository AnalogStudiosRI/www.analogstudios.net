import './event.model.ts';

const EVENTS_API_URL = '/api/v2/events';

function getEvents(): Promise<[Event]> {
  return fetch(EVENTS_API_URL)
    .then(resp => resp.json());
}

function getEventById(id): Promise<Event> {
  return fetch(`${EVENTS_API_URL}?id=${id}`)
    .then(resp => resp.json())
    .then(resp => resp[0]);
}

export {
  getEvents,
  getEventById
};