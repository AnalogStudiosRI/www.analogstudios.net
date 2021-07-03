import { expect } from '@esm-bundle/chai';
import './footer.js';

describe('Footer Component', () => {
  let footer;

  beforeEach(async () => {
    footer = document.createElement('app-footer');

    document.body.appendChild(footer);

    await footer.updateComplete;
  });

  afterEach(() => {
    footer.remove();
    footer = null;
  });

  describe('Default Behavior', () => {
    it('should not be null', () => {
      expect(footer).not.equal('<app-footer></app-footer>');
      expect(footer.shadowRoot.querySelectorAll('footer').length).equal(1);
    });

    it('should have expected copyright elements', () => {
      const elements = footer.shadowRoot.querySelectorAll('h5');

      expect(elements.length).equal(1);
    });

    it('should have expected copyright text', () => {
      const text = footer.shadowRoot.querySelectorAll('h5')[0].textContent;
      const currentYear = new Date().getFullYear();

      expect(text).equal(`© 2007 - ${currentYear} Analog Studios`);
    });
  });

});