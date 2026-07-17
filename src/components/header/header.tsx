import styles from "./header.module.css";
import "../navigation/navigation.tsx";

export default class Header extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    return (
      <header class={styles.container}>
        <div class={styles.innerContainer}>
          <h1 class={styles.logo}>
            <a title="Home Page" href="/">
              Analog Studios
            </a>
          </h1>
          <as-navigation></as-navigation>
        </div>
      </header>
    );
  }
}

customElements.define("as-header", Header);
