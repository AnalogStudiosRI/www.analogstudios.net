// TODO: page load hangs if we use import aliases (e.g. #)
import { getPosts } from "../../services/posts.ts";
import type { Post } from "../../services/posts.ts";
import postsListSheet from "./posts-list.css" with { type: "css" };
import themeSheet from "../../styles/theme.css" with { type: "css" };

// TODO: could this be as gwd-data-static / css modules
export default class PostsListComponent extends HTMLElement {
  #posts: Post[] = [];
  #max = 0;

  async connectedCallback() {
    if (typeof window === "undefined") {
      return;
    }

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    this.#posts = (await getPosts()).reverse();
    this.#max = this.hasAttribute("max") ? parseInt(this.getAttribute("max")!, 10) : 0;

    this?.shadowRoot?.adoptedStyleSheets.push(themeSheet, postsListSheet);
    this.render();
  }

  #getFormateDate(timestamp: number): string {
    // SUNDAY, FEBRUARY 12, 2017, 8:47 AM
    const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];

    const dateObj = new Date(timestamp);
    const amPm = dateObj.getHours() < 12 ? "AM" : "PM";
    const hours = dateObj.getHours() < 12 ? dateObj.getHours() : dateObj.getHours() - 12;

    return `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${hours}:${dateObj.getMinutes()} ${amPm}`;
  }

  render() {
    const maxDisplay = !this.#max ? this.#posts.length : this.#max;
    const maxPosts = this.#posts.slice(0, maxDisplay);
    const html = maxPosts
      .map((post) => {
        const formattedDate = this.#getFormateDate(post.createdTime * 1000);

        return `
        <div class="post">
          <div class="post__time">Posted: ${formattedDate}</div>

          <h4 class="post__heading">${post.title}</h4>

          <details class="post__summary">${post.summary}</details>
        </div>
      `;
      })
      .join("");

    return (
      <div class="as-posts-list">
        <h3 class="as-posts-list__heading">Latest Posts</h3>
        <div class="posts">{html}</div>
      </div>
    );
  }
}

customElements.define("as-posts-list", PostsListComponent);
