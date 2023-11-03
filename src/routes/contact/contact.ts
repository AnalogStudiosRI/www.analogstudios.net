import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import contactCss from './contact.css?type=css';

@customElement('as-route-contact')
export class ContactRouteComponent extends LitElement {

  connectedCallback(): void {
    super.connectedCallback();

    ga('set', 'page', '/contact');
    ga('send', 'pageview');
  }

  /* eslint-disable indent */
  protected render(): TemplateResult {

    return html`
      <style>
        ${contactCss}
      </style>

      <div class="as-route-contact">    
        <h2 class="header">Contact Us</h2>
        <p>Analog Studios is located in Newport RI and run by Owen Buckley and Dave Flamand.  Please use the contact form below to send us a message!</p>
        
        <form name="contact" method="post">

          <label for="subject">Subject</label>
          <input name="subject" type="text" required/>

          <label for="email">Email</label>
          <input name="email" type="email" required/>

          <label for="message">Message:</label>
          <textarea name="message" required></textarea>

          <!-- Netlify hidden form for the contact page -->
          <input type="hidden" name="form-name" value="contact" />

          <button class="btn" type="submit">Send</button>
        </form>

      </div>
    `;
    /* eslint-enable indent */
  }
}