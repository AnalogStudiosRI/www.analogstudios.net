/* eslint-disable max-len */
import { css, html, LitElement } from 'lit';
import '../components/events-calendar/events-calendar.js';
import '../components/posts-list/posts-list.js';

class HomeRouteComponent extends LitElement {

  // @import "../../theme.css";
  static styles = css`
    :host {
      .as-view-home {
        margin-bottom: 15px;

        .as-media-carousel {
          @include media-breakpoint-down(xs) {
            margin-top: -30px;
          }

          @include media-breakpoint-only(sm) {
            margin-top: 0;
          }

          position: relative;
          margin: 0 -15px 30px -15px;
        }

        .as-media-carousel__label {
          position: absolute;
          bottom: 45px;
          width: 100%;
          padding: 15px;
          background-color: transparentize($creme, .1);
          font-size: 1.25rem;
          letter-spacing: 2px;

          @include media-breakpoint-between(sm, md) {
            font-size: 1rem;
            text-align: center;
          }
        }

        .as-media-carousel__attribution-label {
          position: absolute;
          bottom: 0px;
          right: 0px;
          padding: 2px 4px;
          background: transparentize($black, .5);
          font-size: .5rem;
        }

        .as-media-carousel__attribution-label,
        .as-media-carousel__attribution-label-link {
          color: $creme;
        }

        .as-media-carousel__label,
        .as-media-carousel__attribution-label {
          @include media-breakpoint-down(sm) {
            display: none;
          }
        }

        .as-welcome {
          margin-bottom: 45px;
        }
      }
    }
  `

  render() {
    return html`
      <div class="as-view-home">
        <div class="row">
          <div class="col-xs-12">
      
            <div class="as-media-carousel">
              <!-- TODO if loading from cloudfront works (TGH-171), remove this??? 
              <img src="//d34k5cjnk2rcze.cloudfront.net/images/website/home-banner.jpg" class="img-fluid"> -->
      
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