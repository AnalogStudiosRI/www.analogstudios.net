import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getPosts } from '../../services/posts/posts-service.ts';
import postsListCss from './posts-list.css?type=css';

@customElement('app-posts-list')
export class PostsListComponent extends LitElement {
  @property() max = 0;
  @property() posts = [];

  async connectedCallback() {
    super.connectedCallback();

    this.posts = (await getPosts()).reverse();
  }

  private getFormateDate(timestamp) {
    // SUNDAY, FEBRUARY 12, 2017, 8:47 AM
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCOTOBER', 'NOVEMBER', 'DECEMBER'];

    const dateObj = new Date(timestamp);
    const amPm = dateObj.getHours() < 12 ? 'AM' : 'PM';
    const hours = dateObj.getHours() < 12 ? dateObj.getHours() : dateObj.getHours() - 12;

    return `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${hours}:${dateObj.getMinutes()} ${amPm}`;
  }

  protected render() {
    const maxDisplay = !this.max ? this.posts.length : this.max; // : this.max;
    const maxPosts = this.posts.slice(0, maxDisplay);

    return html`
      <style>
        ${postsListCss}
      </style>
      <div class="as-posts-list">

        <h3 class="as-posts-list__heading">Latest Posts</h3>
        <div class="posts">
          ${
            maxPosts.map((post) => {
              const formattedDate = this.getFormateDate(post.createdTime * 1000);

              return html`
                <div class="post">
                  <div class="post__time">Posted: ${formattedDate}</div>

                  <h4 class="post__heading">${post.title}</h4>

                  <details class="post__summary">${unsafeHTML(post.summary)}</details>
                </div>
              `;
            })
          }
        </div>

      </div>
    `;
  }
}