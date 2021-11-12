import { html, LitElement } from 'lit';
import { connectRouter } from 'lit-redux-router';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers';
import thunk from 'redux-thunk';

const store = createStore((state) => state,
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

connectRouter(store);

class App extends LitElement {

  render() {
    return html`
      <div>        
        <main class="cc-page app-content">
          <lit-route 
            path="/" 
            component="as-route-home"
            .resolve="${() => import('/routes/home.js')}"
          ></lit-route>
          <lit-route><h1>TODO</h1></lit-route>
        </main>
      </div>
    `;
  }
}

customElements.define('app-router-outlet', App); 