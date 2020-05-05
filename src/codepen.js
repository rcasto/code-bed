// https://blog.codepen.io/documentation/embedded-pens/#the-embed-code-0
const templateContent = `
  <div class="codepen-container">
    <div class="codepen-component-embed"></div>
  </div>
`;

// https://blog.codepen.io/documentation/embedded-pens/#override-attributes-5
const codepenEmbedAttributes = [
  "data-theme-id",
  "data-slug-hash",
  "data-user",
  "data-default-tab",
  "data-height",
  "data-show-tab-bar",
  "data-animations",
  "data-border",
  "data-border-color",
  "data-tab-bar-color",
  "data-tab-link-color",
  "data-active-tab-color",
  "data-active-link-color",
  "data-link-logo-color",
  "data-class",
  "data-custom-css-url",
  "data-preview"
];

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

function copyAttributes(fromElem, toElem, attrs) {
  attrs
    .forEach(attr => {
      const attrValue = fromElem.getAttribute(attr);
      if (typeof attrValue === 'string') {
        toElem.setAttribute(attr, attrValue);
      }
    });
}

export default class CodePen extends HTMLElement {

  static get observedAttributes() {
    return codepenEmbedAttributes;
  }

  constructor() {
    super();

    this.codepenEmbedElem = null;
  }
  resetContent() {
    const templateClone = template.content.cloneNode(true);

    this.textContent = '';

    this.appendChild(templateClone);
    this.codepenEmbedElem = this.querySelector('.codepen-component-embed');
  }
  // https://blog.codepen.io/documentation/embedded-pens/#delayed-embeds-6
  initCodePenEmbedScript() {
    if (hasCodePenEmbedScriptLoaded()) {
      return;
    }

    const codepenScriptElem = document.createElement('script');
    codepenScriptElem.addEventListener('load', () => {
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

    this.resetContent();
    copyAttributes(this, this.codepenEmbedElem, codepenEmbedAttributes);

    this.initCodePenEmbedScript();
  }
  attributeChangedCallback() {
    console.log('attribute changed');

    this.resetContent();
    copyAttributes(this, this.codepenEmbedElem, codepenEmbedAttributes);
    triggerCodePenEmbedReload();
  }
  disconnectedCallback() {
    console.log('disconnected');
  }
}