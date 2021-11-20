import { html, LitElement } from 'lit';
import '../../components/events-calendar/events-calendar.ts';
import '../../components/posts-list/posts-list.ts';

import homeCss from './home.css?type=css';

class HomeRouteComponent extends LitElement {

  render() {
    return html`
      <style>
        ${homeCss}
      </style>

      <div class="as-view-home">
        <div class="row">
          <div class="col-xs-12">

            <div class="as-media-carousel">
              <img src="/assets/home-banner.jpg" class="img-fluid">

              <span class="as-media-carousel__label">
                Welcome to Analog Studios!
              </span>

              <span class="as-media-carousel__attribution-label">Photo courtesy of
                <a href="http://www.maciaphotography.com/" class="as-media-carousel__attribution-label-link" target="_blank" alt="Morgan Macia Photography">Morgan Macia</a>
              </span>
            </div>

          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-lg-7">
            <app-posts-list max="2"></app-posts-list>
          </div>

          <div class="col-xs-12 col-lg-5">
            <app-events-calendar></app-events-calendar>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('as-route-home', HomeRouteComponent);