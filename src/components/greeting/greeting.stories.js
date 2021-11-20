import { html } from 'lit';
import './greeting.ts';

export default {
  title: 'Components/Greeting'
};

export const Primary = () => html`
  <app-greeting></app-greeting>
`;

export const Custom = () => html`
  <app-greeting name="Owen"></app-greeting>
`;