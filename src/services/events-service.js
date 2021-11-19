const EVENTS_API_URL = '/api/events';

function getEvents() {
  return fetch(EVENTS_API_URL)
    .then(resp => resp.json());
}

function getEventById(id) {
  return fetch(`${EVENTS_API_URL}/${id}`)
    .then(resp => resp.json())
    .then(resp => resp[0]);
}

export {
  getEvents,
  getEventById
};