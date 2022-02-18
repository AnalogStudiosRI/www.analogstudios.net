import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Details } from './card.model.ts';
import '../card/card.ts';

@customElement('app-card-list')
export class CardListComponent extends LitElement {
  @property({ type: Array }) details: Array<Details> = [];

  protected render(): TemplateResult {
    const { details } = this;

    if (!details) {
      return html``;
    }

    return html`
      ${
        details.map((detail) => {
          return html`
            <app-card .details=${detail}></app-card>
          `;
        })
      }
    `;
  }
}