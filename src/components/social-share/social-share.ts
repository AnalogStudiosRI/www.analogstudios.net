import { css, html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
// import navigationCss from './navigation.css?type=css';
import 'web-social-share';

@customElement('app-social-share')
export class NavigationComponent extends LitElement {
  // static styles = css`${unsafeCSS(navigationCss)}`;

  protected render(): TemplateResult {
    const share = {
      displayNames: true,
      config: [{
        facebook: {
          socialShareUrl: 'https://peterpeterparker.io'
        }
      }, {
        twitter: {
          socialShareUrl: 'https://peterpeterparker.io'
        }
      }]
    };

    return html`
      <div class="container">
        <div class="row">

          <h2 class="header">Interact + Share</h2>
          <web-social-share show="true" share=${share}></web-social-share>
          <!--
          <a class="btn btn-social-icon btn-facebook">
            <button ceiboShare  [facebook]="{u: getCurrentPageUrl()}"></button>
            <span class="fa fa-facebook"></span>
          </a>
      
          <a class="btn btn-social-icon btn-twitter">
            <button ceiboShare  [twitter]="{url: getCurrentPageUrl(), hashtags:'keepingitreel'}"></button>
            <span class="fa fa-twitter"></span>
          </a>
      
          <a class="btn btn-social-icon btn-google">
            <button ceiboShare  [googlePlus]="{url: getCurrentPageUrl()}"></button>
            <span class="fa fa-google"></span>
          </a>
          -->

        </div>
      </div>
    `;
  }
}