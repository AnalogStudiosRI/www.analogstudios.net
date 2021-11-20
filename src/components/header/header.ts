import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../navigation/navigation.ts';
import headerCss from './header.css?type=css';

@customElement('app-header')
class HeaderComponent extends LitElement {
  static styles = css`${unsafeCSS(headerCss)}`;

  protected render() {
    return html`
      <header class="as-header">
        <h1 class="as-header__logo"><a title="Home Page" href="/">Analog Studios</a></h1>

        <app-navigation></app-navigation>
      </header>
    `;
  }
}