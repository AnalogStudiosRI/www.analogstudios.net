declare global {
  namespace JSX {
    interface IntrinsicElements {
      "as-quick-links": {
        links: Link[];
        label: string;
      };
    }
  }
}

interface Link {
  route: string;
  label: string;
}

export default class QuickLinks extends HTMLElement {
  links: Link[] = [];
  label: string = "";

  connectedCallback() {
    this.links = JSON.parse(this.getAttribute("links") ?? "[]");
    this.label = this.getAttribute("label") ?? "Select Option";

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.render();
    }
  }

  // TODO: figure out why this is not working and enable the feature
  selectOption(event: Event) {
    const selectedLink = this.links.find(
      (link) => link.route === (event.target as HTMLSelectElement).value,
    );

    if (selectedLink) {
      window.location.href = selectedLink.route;
    } else {
      console.warn(
        "Selected option does not have a corresponding link:",
        (event.target as HTMLSelectElement).value,
      );
    }
  }

  render() {
    const { links } = this;
    const optionsListHtml = [{ route: "default", label: this.label }, ...links]
      .map((link) => {
        return `<option value="${link.route}">${link.label}</option>`;
      })
      .join("\n");

    return (
      <select name="quick-links-dropdown" onchange={this.selectOption}>
        {optionsListHtml}
      </select>
    );
  }
}

customElements.define("as-quick-links", QuickLinks);
