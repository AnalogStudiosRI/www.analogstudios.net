import socialShareSheet from "./social-share.css" with { type: "css" };
import themeSheet from "../../styles/theme.css" with { type: "css" };
import { defineCustomElement } from "web-social-share";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "as-social-share": {
        show: boolean;
        share: ShareConfig;
      };
    }
  }
}

// TODO: get types from web-social-share package instead of defining our own here
interface ShareConfig {
  displayNames: boolean;
  config: Array<{
    [key: string]: {
      socialShareUrl: string;
    };
  }>;
}

export default class SocialShare extends HTMLElement {
  // TODO: use a signal for show / hide?
  #show: boolean = false;
  #shareConfig: ShareConfig;

  constructor() {
    super();

    const socialShareUrl = typeof window !== "undefined" ? window.location.href : "";

    this.#shareConfig = {
      displayNames: true,
      config: [
        {
          facebook: {
            socialShareUrl,
          },
        },
        {
          twitter: {
            socialShareUrl,
          },
        },
        {
          pinterest: {
            socialShareUrl,
          },
        },
      ],
    };
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    this?.shadowRoot?.adoptedStyleSheets?.push(themeSheet, socialShareSheet);
    this.render();

    // TODO: temp workaround for https://github.com/AnalogStudiosRI/www.analogstudios.net/pull/112#issuecomment-4564633209
    if (typeof window !== "undefined") {
      defineCustomElement();

      // TODO: how to best detect when the web-social-share component is ready to be interacted with
      // is there an event we can listen for instead of using a timeout?
      setTimeout(() => {
        const shareElement = this.shadowRoot?.querySelector("web-social-share");

        if (!shareElement) {
          console.error("Share element not found");
          return;
        }

        // have to set the property here instead of an attribute
        // https://github.com/peterpeterparker/web-social-share/issues/65
        shareElement.share = this.#shareConfig;
        shareElement.addEventListener("closed", () => {
          this.#show = false;
        });
      }, 1000);
    }
  }

  toggleShowSocialShare() {
    this.#show = !this.#show;
    this.shadowRoot
      ?.querySelector("web-social-share")
      ?.setAttribute("show", this.#show ? "true" : "");
  }

  render() {
    return (
      <div>
        <h2 class="header">Interact + Share</h2>

        <button type="button" class="btn" onclick={this.toggleShowSocialShare}>
          <svg
            class="svg-inline--fa fa-share-alt fa-w-14"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="share-alt"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
            ></path>
          </svg>
          SHARE THIS PAGE
        </button>

        <web-social-share>
          <i class="fa fa-facebook" slot="facebook"></i>
          <i class="fa fa-twitter" slot="twitter"></i>
          <i class="fa fa-pinterest" slot="pinterest"></i>
        </web-social-share>
      </div>
    );
  }
}

customElements.define("as-social-share", SocialShare);
