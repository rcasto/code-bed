// https://blog.codepen.io/documentation/embedded-pens/#the-embed-code-0
const templateContent = `
  <div class="codepen-container">
    <p
      class="codepen-component-embed"
      data-height="300"
      data-theme-id="light"
      data-default-tab="js,result"
      data-user="Mamboleoo"
      data-slug-hash="wVGGzV"
      style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
      data-pen-title="Walkers - How to">
    </p>
  </div>
`;
// <slot name="codepen-fallback"></slot>

const template = document.createElement('template');
template.innerHTML = templateContent;

function triggerCodePenEmbedReload() {
  if (!hasCodePenEmbedScriptLoaded()) {
    return;
  }

  window.__CPEmbed('.codepen-component-embed');
}

function hasCodePenEmbedScriptLoaded() {
  return typeof window.__CPEmbed === 'function';
}

export default class CodePen extends HTMLElement {
  // https://blog.codepen.io/documentation/embedded-pens/#override-attributes-5
  static get observedAttributes() {
    return [
      'data-slug-hash'
    ];
  }

  constructor() {
    super();

    this.codepenEmbedElem = null;
  }
  // https://blog.codepen.io/documentation/embedded-pens/#delayed-embeds-6
  initCodePenEmbedScript() {
    if (hasCodePenEmbedScriptLoaded()) {
      return;
    }

    const codepenScriptElem = document.createElement('script');
    codepenScriptElem.addEventListener('load', () => {
      console.log('codepen embed script loaded');
      triggerCodePenEmbedReload();
    });
    codepenScriptElem.src = 'https://static.codepen.io/assets/embed/ei.js';
    codepenScriptElem.async = true;

    this.appendChild(codepenScriptElem);
  }
  connectedCallback() {
    // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks
    if (!this.isConnected) {
      return;
    }

    const templateClone = template.content.cloneNode(true);

    this.appendChild(templateClone);
    this.initCodePenEmbedScript();

    this.codepenEmbedElem = this.querySelector('.codepen-component-embed');
  }
  attributeChangedCallback() {
    console.log('attribute changed');

    this.codepenEmbedElem.setAttribute('data-slug-hash', this.getAttribute('data-slug-hash'));

    triggerCodePenEmbedReload();
  }
  disconnectedCallback() {
    console.log('disconnected');
  }
}