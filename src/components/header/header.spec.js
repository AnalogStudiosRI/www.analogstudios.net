import { expect } from '@esm-bundle/chai';
import './header.js';

describe('Header Component', () => {
  let header;

  beforeEach(async () => {
    header = document.createElement('app-header');

    document.body.appendChild(header);

    await header.updateComplete;
  });

  afterEach(() => {
    header.remove();
    header = null;
  });

  describe('Default Behavior', () => {
    it('should not be null', () => {
      expect(header).not.equal('<app-header></app-header>');
      expect(header.shadowRoot.querySelectorAll('header').length).equal(1);
    });

    it('should have expected heading', () => {
      const elements = header.shadowRoot.querySelectorAll('h1');

      expect(elements.length).equal(1);
    });

    it('should have expected greeting text', () => {
      const text = header.shadowRoot.querySelector('h1').textContent;

      expect(text).equal('Welcome to Analog Studios!');
    });
  });

});