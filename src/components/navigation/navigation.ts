import { css, html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import navigationCss from './navigation.css?type=css';

@customElement('app-navigation')
export class NavigationComponent extends LitElement {
  static styles = css`${unsafeCSS(navigationCss)}`;

  protected render(): TemplateResult {
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