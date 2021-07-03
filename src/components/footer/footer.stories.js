import './footer';
import { html } from 'lit';

export default {
  title: 'Example/Footer'
};

export const Static = () => html`
  <footer>This is a footer!</footer>
`;

export const CustomElement = () => html`
  <app-footer></app-footer>
`;