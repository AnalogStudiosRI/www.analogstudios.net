import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../navigation/navigation.ts';
import theme from '../../theme.css' with { type: 'css' };
import headerCss from './header.css' with {type: 'css' };

@customElement('app-header')
export class HeaderComponent extends LitElement {
  static styles = [theme, headerCss];

  protected render(): TemplateResult {
    return html`
      <header class="as-header">
        <div id="as-inner-header">
          <h1 class="as-header__logo"><a title="Home Page" href="/">Analog Studios</a></h1>
          <app-navigation></app-navigation>
        </div>
      </header>
    `;
  }
}