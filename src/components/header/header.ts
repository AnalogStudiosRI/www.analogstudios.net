import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../navigation/navigation.ts';
import headerCss from './header.css?type=css';

@customElement('app-header')
export class HeaderComponent extends LitElement {

  createRenderRoot(): Element | ShadowRoot {
    return this;
  }
  
  protected render(): TemplateResult {
    return html`
      <style>
        ${headerCss}
      </style>

      <header class="as-header">
        <div id="as-inner-header">
          <i class="fa fa-calendar-check-o"></i>
          <h1 class="as-header__logo"><a title="Home Page" href="/">Analog Studios</a></h1>
          <app-navigation></app-navigation>
        </div>
      </header>
    `;
  }
}