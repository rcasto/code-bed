import {
  triggerCodePenEmbedReload,
  loadCodePenEmbedScript,
  codepenEmbedAttributes,
  codepenEmbedContainerClass,
  codepenEmbedClass
} from './codepenUtil';
import {
  copyAttributes,
  createTemplateFromString
} from './domUtil';

// https://blog.codepen.io/documentation/embedded-pens/#the-embed-code-0
const embedTemplateContent = `
  <div class="${codepenEmbedClass}">
    No CodePen connected
  </div>
`;

const templateContent = `
  <div>
    <div class="${codepenEmbedContainerClass}">
      ${embedTemplateContent}
    </div>
  </div>
`;

const template = createTemplateFromString(templateContent);
const embedTemplate = createTemplateFromString(embedTemplateContent);

export default class CodeBed extends HTMLElement {

  static get observedAttributes() {
    return codepenEmbedAttributes;
  }

  constructor() {
    super();

    this.codepenEmbedContainerElem = null;
    this.codepenEmbedElem = null;
  }
  reloadCodePenEmbed() {
    if (!this.codepenEmbedContainerElem) {
      return;
    }

    this.codepenEmbedContainerElem.textContent = '';
  
    const embedTemplateClone = embedTemplate.content.cloneNode(true);
    this.codepenEmbedContainerElem.appendChild(embedTemplateClone);
    
    this.codepenEmbedElem = this.codepenEmbedContainerElem.querySelector(`.${codepenEmbedClass}`);
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

    const templateClone = template.content.cloneNode(true);
    this.appendChild(templateClone);

    this.codepenEmbedContainerElem = this.querySelector(`.${codepenEmbedContainerClass}`);
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