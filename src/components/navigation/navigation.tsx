import styles from "./navigation.module.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
      "as-navigation": {};
    }
  }
}

export default class Navigation extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  // TODO: get navigation from a content collection
  render() {
    return (
      <nav>
        <ul class={styles.list}>
          <li class={styles.listItem}>
            <h2 class={styles.heading}>
              <a class={styles.link} href="/artists/">
                artists
              </a>
            </h2>
          </li>

          <li class={styles.listItem}>
            <h2 class={styles.heading}>
              <a class={styles.link} href="/albums/">
                albums
              </a>
            </h2>
          </li>

          <li class={styles.listItem}>
            <h2 class={styles.heading}>
              <a class={styles.link} href="/events/">
                events
              </a>
            </h2>
          </li>

          <li class={styles.listItem}>
            <h2 class={styles.heading}>
              <a class={styles.link} href="/contact/">
                contact
              </a>
            </h2>
          </li>
        </ul>
      </nav>
    );
  }
}

customElements.define("as-navigation", Navigation);
