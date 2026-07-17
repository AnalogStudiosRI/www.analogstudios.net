import type { Artist } from "#services/artists.ts";
import type { Album } from "#services/albums.ts";
import { slugifyer } from "#services/util.ts";
// TODO: CSS Module Scripts do not work with SSR pages

interface Details {
  imagePath: string;
  headingText: string;
  bodyText: string;
  imageAltText: string;
  link: string;
}

function modelAlbum(album: Album) {
  return {
    imagePath: album ? album.imageUrl : "",
    headingText: album ? album.title : "",
    bodyText: album ? album.description : "",
    imageAltText: album ? album.title : "",
    link: album ? `/albums/${slugifyer(album.title)}/` : "#",
  };
}

function modelArtist(artist: Artist) {
  return {
    imagePath: artist ? artist.imageUrl : "",
    headingText: artist ? artist.name : "",
    bodyText: artist ? artist.bio : "",
    imageAltText: artist ? artist.name : "",
    link: artist ? `/artists/${slugifyer(artist.name)}/` : "#",
  };
}

export class CardComponent extends HTMLElement {
  #details: Details | undefined;

  connectedCallback() {
    this.#details = JSON.parse(this.getAttribute("details") ?? "{}");
    this.render();
  }

  render() {
    if (!this.#details) {
      return;
    }

    const { imagePath, imageAltText, bodyText, headingText, link } = this.#details;
    const detailsHeadingLink = !link
      ? headingText
      : `
        <a href="${link}" title="Visit ${headingText}">
          ${headingText}
        </a>
      `;

    // TODO: # private references don't work with WCC?
    return (
      <div class="container as-card">
        <div class="row">
          {/* why doesn't col-xs-12 work here */}
          <div class="col-xs-12">
            <div class="card-row hidden-sm-down">
              <div class="media">
                <div class="media-left">
                  <img class="media-object" src={imagePath} alt={imageAltText} />
                </div>

                <div class="media-body">
                  <h3 class="media-heading">{detailsHeadingLink}</h3>
                  <p>{bodyText}</p>
                </div>
              </div>
            </div>

            <a href={link} title={`Visit ${headingText}`}>
              <div class="card-row hidden-md-up">
                <h3>{headingText}</h3>
                <img src={imagePath} alt={imageAltText} />
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

customElements.define("as-card", CardComponent);

export { modelAlbum, modelArtist, type Details };
