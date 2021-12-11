import { css, html, LitElement, unsafeCSS, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import socialShareCss from './social-share.css?type=css';
import '@analogstudiosri/web-social-share';

@customElement('app-social-share')
export class NavigationComponent extends LitElement {
  static styles = css`${unsafeCSS(socialShareCss)}`;

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
          <web-social-share show="true" .share=${share}>
            <i class="fa fa-facebook" slot="facebook" style="color: #00aced; width: 1.4rem;"></i>
            <i class="fa fa-twitter" slot="twitter" style="color: #00aced; width: 1.4rem;"></i>
          </web-social-share>
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