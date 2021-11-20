import { expect } from '@esm-bundle/chai';
import './greeting.ts';

describe('Greeting Component', () => {
  let greeting;

  beforeEach(async () => {
    greeting = document.createElement('app-greeting');

    document.body.appendChild(greeting);

    await greeting.updateComplete;
  });

  afterEach(() => {
    greeting.remove();
    greeting = null;
  });

  describe('Default Behavior', () => {
    it('should not be null', () => {
      expect(greeting).not.equal(undefined);
      expect(document.querySelectorAll('app-greeting').length).equal(1);
    });

    it('should have expected copyright elements', () => {
      const elements = greeting.shadowRoot.querySelectorAll('p');

      expect(elements.length).equal(1);
    });

    it('should have expected default text', () => {
      const text = greeting.shadowRoot.querySelector('p').textContent;

      expect(text).equal('Hello, Somebody!');
    });
  });

  describe('Custom Name', () => {
    beforeEach(async () => {
      greeting.setAttribute('name', 'World');

      await greeting.updateComplete;
    });

    it('should have expected custom text', () => {
      const text = greeting.shadowRoot.querySelector('p').textContent;

      expect(text).equal('Hello, World!');
    });
  });

});