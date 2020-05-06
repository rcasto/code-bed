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

export default class CodeBed extends HTMLElement {

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

/*
  Register or associate the web component
  with a <code-bed></code-bed> element
*/
try {
  customElements.define('code-bed', CodeBed);
} catch(err) {
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#Exceptions
  console.error(err);
}