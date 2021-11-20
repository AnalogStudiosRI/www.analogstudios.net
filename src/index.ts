import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { connectRouter } from 'lit-redux-router';
import store from './store.ts';

connectRouter(store);

@customElement('app-router-outlet')
class App extends LitElement {

  render() {
    return html`
      <div>
        <main class="cc-page app-content">
          <lit-route
            path="/albums/:id"
            component="as-route-album-details"
            .resolve="${() => import('/routes/albums/album-details.ts')}">
          </lit-route>
          <lit-route
            path="/albums"
            component="as-route-albums"
            .resolve="${() => import('/routes/albums/albums.ts')}">
          </lit-route>
          <lit-route
            path="/artists/:id"
            component="as-route-artist-details"
            .resolve="${() => import('/routes/artists/artist-details.ts')}">
          </lit-route>
          <lit-route
            path="/artists"
            component="as-route-artists"
            .resolve="${() => import('/routes/artists/artists.ts')}">
          </lit-route>
          <lit-route
            path="/events/:id"
            component="as-route-event-details"
            .resolve="${() => import('/routes/events/event-details.ts')}">
          </lit-route>
          <lit-route
            path="/events"
            component="as-route-events"
            .resolve="${() => import('/routes/events/events.ts')}">
          </lit-route>
          <lit-route
            path="/"
            component="as-route-home"
            .resolve="${() => import('/routes/home/home.ts')}">
          </lit-route>
          <lit-route><h1>Not Found (404) Page - TODO</h1></lit-route>
        </main>
      </div>
    `;
  }
}