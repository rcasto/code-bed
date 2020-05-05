import {
  triggerCodePenEmbedReload,
  loadCodePenEmbedScript,
  copyAttributes,
  codepenEmbedAttributes,
  codepenEmbedClass
} from './util';

// https://blog.codepen.io/documentation/embedded-pens/#the-embed-code-0
const templateContent = `
  <div class="codepen-container">
    <div class="${codepenEmbedClass}">
      No CodePen connected
    </div>
  </div>
`;

const template = document.createElement('template');
template.innerHTML = templateContent;

export default class CodePen extends HTMLElement {

  static get observedAttributes() {
    return codepenEmbedAttributes;
  }

  constructor() {
    super();

    this.codepenEmbedElem = null;
  }
  reloadCodePenEmbed() {
    const templateClone = template.content.cloneNode(true);

    this.textContent = '';

    this.appendChild(templateClone);
    this.codepenEmbedElem = this.querySelector(`.${codepenEmbedClass}`);

    copyAttributes(this, this.codepenEmbedElem, codepenEmbedAttributes);

    loadCodePenEmbedScript()
      .then(triggerCodePenEmbedReload)
      // Would probably want to handle this better later
      .catch(console.error);
  }
  connectedCallback() {
    // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks
    if (!this.isConnected) {
      return;
    }

    this.reloadCodePenEmbed();
  }
  attributeChangedCallback() {
    this.reloadCodePenEmbed();
  }
}