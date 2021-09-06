const EVENTS_API_URL = '/api/events';

function getEvents() {
  return fetch(EVENTS_API_URL)
    .then(resp => resp.json());
}

export { getEvents };