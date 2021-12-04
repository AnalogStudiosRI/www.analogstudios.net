import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import contactCss from './contact.css?type=css';

@customElement('as-route-contact')
export class ContactRouteComponent extends LitElement {

  /* eslint-disable indent */
  protected render(): TemplateResult {

    return html`
      <style>
        ${contactCss}
      </style>

      <div class="as-route-contact">    
        <h2 class="header">Contact Us</h2>
        <p>Analog Studios is located in Newport RI and run by Owen Buckley and Dave Flamand.  Please use the contact form below to send us a message!</p>
        
        <form name="contact" method="POST" data-netlify="true">
          <label for="subject">Subject</label>
          <br/>
          <input id="subject" name="subject" type="text" required/>

          <br/>
          <br/>

          <label for="message">Message:</label>
          <br/>
          <textarea id="message" name="message" required></textarea>

          <br/>

          <input type="hidden" name="contact" value="contact" />

          <button class="btn" type="submit">Submit</button>
        </form>

      </div>
    `;
    /* eslint-enable indent */
  }
}