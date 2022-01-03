import { css, html, LitElement, unsafeCSS, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import socialShareCss from "./social-share.css?type=css";

@customElement("app-socials-media")
export class NavigationComponent extends LitElement {
  static styles = css`
    ${unsafeCSS(socialShareCss)}
  `;
  private socialLinks: any;
  constructor() {
    super();
    this.socialLinks = {
      names: [
        {
          type: "facebook",
          icon: "facebook-square",
          link: "https://www.facebook.com/analogstudiosri",
        },
        {
          type: "instagram",
          icon: "instagram",
          link: window.location.href,
        },
        {
          type: "youtube",
          icon: "youtube-play",
          link: "https://www.youtube.com/channel/UCxs5mxoDpmmR0hRbwsxU7Sg",
        },
      ],
    };
  }

  applyLinks() {
    return this.socialLinks.names.map((element) => {
      return html`<li>
        <a href="${element.link}" aria-label="${element.type} social link">
          <i class="fa fa-${element.icon}"></i>
          <strong>${element.type}</strong>
        </a>
      </li>`;
    });
  }
  protected render(): TemplateResult {
    return html`
           <section class="socials">
              <article>
                <ul>
                 ${this.applyLinks()}
                 <ul>
              </article>
            </section>
    `;
  }
}
