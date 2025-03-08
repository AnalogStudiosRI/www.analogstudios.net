import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import homeSheet from './home.css' with { type: 'css' };
import themeSheet from '../../theme.css' with { type: 'css' };
import stylesSheet from '../../styles.css' with { type: 'css' };
import '../../components/events-calendar/events-calendar.ts';
import '../../components/posts-list/posts-list.ts';

@customElement('as-route-home')
export class HomeRouteComponent extends LitElement {
  static styles = [themeSheet, stylesSheet, homeSheet];

  connectedCallback(): void {
    super.connectedCallback();

    ga('set', 'page', '/');
    ga('send', 'pageview');
  }

  protected render(): TemplateResult {
    return html`
      <div class="as-view-home">
        <div>
          <div>

            <div class="as-media-carousel">
              <img src="/assets/home-banner.webp" class="img-fluid" alt="banner image of founders in chairs">

              <span class="as-media-carousel__label">
                Welcome to Analog Studios!
              </span>

              <span class="as-media-carousel__attribution-label">Photo courtesy of
                <a href="http://www.maciaphotography.com/" class="as-media-carousel__attribution-label-link" 
                  target="_blank" rel="noopener noreferrer"
                  alt="Morgan Macia Photography">Morgan Macia
                </a>
              </span>
            </div>

          </div>
        </div>

        <div class="as-info-container">
          <div class="as-info-content">
            <app-posts-list max="2"></app-posts-list>
          </div>

          <div class="as-info-content">
            <app-events-calendar></app-events-calendar>
          </div>
        </div>
      </div>
    `;
  }
}