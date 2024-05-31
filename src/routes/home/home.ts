import { css, html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/events-calendar/events-calendar.ts';
import '../../components/posts-list/posts-list.ts';
import homeCss from './home.css?type=raw';
import theme from '../../theme.css' with { type: 'css' };
import styles from '../../styles.css' with { type: 'css' };

@customElement('as-route-home')
export class HomeRouteComponent extends LitElement {
  static styles = [theme, styles, css`${unsafeCSS(homeCss)}`];

  protected connectedCallback(): void {
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