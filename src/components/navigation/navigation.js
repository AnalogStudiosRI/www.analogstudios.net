import { css, html, LitElement, unsafeCSS } from 'lit';
import navigationCss from './navigation.css?type=css';

class NavigationComponent extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return css`
      ${unsafeCSS(navigationCss)}`;
  }

  render() {
    return html`
      <nav class="as-navigation">
        <ul class="list-unstyled as-navigation__list">
          <li class="as-navigation__list-item">
            <a class="as-navigation__link" href="/artists/">artists</a>
          </li>
      
          <li class="as-navigation__list-item">
            <a class="as-navigation__link" href="/albums/">albums</a>
          </li>
      
          <li class="as-navigation__list-item">
            <a class="as-navigation__link" href="/events/">events</a>
          </li>
      
          <li class="as-navigation__list-item">
            <a class="as-navigation__link" href="/contact/">contact</a>
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('app-navigation', NavigationComponent);