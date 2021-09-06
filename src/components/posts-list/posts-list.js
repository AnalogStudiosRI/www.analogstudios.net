import { css, html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getPosts } from '../services/posts-service.js';

class PostsListComponent extends LitElement {

  static get properties() {
    return {
      max: { type: Number },
      posts: { type: Array }
    };
  }

  constructor() {
    super();

    this.max = null;
    this.posts = [];
  }

  // @import "../../components/bootstrap/bootstrap";
  static get styles() {
    return css`
      :host img {
        display: block;
        max-width: 100%;
        height: auto;
      }
      
      .as-posts-list {
        padding: 30px 15px;
        background-color: $black;
        color: $gold;
      
        @include media-breakpoint-down(md) {
          margin-bottom: 30px;
        }
      
        @include media-breakpoint-up(lg) {
          min-height: 387px;
        }
      
        .as-posts-list__heading {
          margin: 0;
          color: $creme;
        }
      
        .post {
          margin-top: 30px;
        }
      
        .post__heading {
          margin-bottom: 7.5px;
          color: $creme;
        }
      
        .post__time {
          margin-bottom: 7.5px;
        }
      
        .post__summary {
          cursor: pointer;
      
          &:focus {
            outline: 0;
          }
        }
      }
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    
    this.posts = (await getPosts()).reverse();
  }

  getFormateDate(timestamp) {
    // SUNDAY, FEBRUARY 12, 2017, 8:47 AM
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCOTOBER', 'NOVEMBER', 'DECEMBER'];

    const dateObj = new Date(timestamp);
    const amPm = dateObj.getHours() < 12 ? 'AM' : 'PM';
    const hours = dateObj.getHours() < 12 ? dateObj.getHours() : dateObj.getHours() - 12;

    return `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${hours}:${dateObj.getMinutes()} ${amPm}`;
  }

  render() {
    const maxDisplay = !this.max ? this.posts.length : this.max; // : this.max;
    const maxPosts = this.posts.slice(0, maxDisplay);

    return html`
      <div class="as-posts-list">
        
        <h3 class="as-posts-list__heading">Latest Posts</h3>
        <div class="posts">
          ${
            maxPosts.map((post) => {
              const formattedDate = this.getFormateDate(post.createdTime * 1000);

              return html`
                <div>
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

customElements.define('app-posts-list', PostsListComponent);