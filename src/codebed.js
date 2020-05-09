import {
  triggerCodePenEmbedReload,
  loadCodePenEmbedScript,
  codepenEmbedAttributes,
  codepenEmbedContainerClass,
  codepenEmbedClass
} from './codepenUtil';
import {
  copyAttributes,
  createTemplateFromString,
  createIntersectionObserver
} from './domUtil';

// https://blog.codepen.io/documentation/embedded-pens/#the-embed-code-0
const embedTemplateContent = `
  <div class="code-bed-no-pen">No CodePen connected</div>
`;

const templateContent = `
  <style>
    .code-bed-embed-container {
      display: flex;
      flex-direction: column;
    }
    .code-bed-embed-container .code-bed-no-pen {
      margin: auto;
    }
  </style>
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

    this.intersectionObserver =
      createIntersectionObserver(intersections => this.onIntersectionUpdates(intersections));

    this.codepenEmbedContainerElem = null;
    this.codepenEmbedElem = null;
  }
  get codePenHeight() {
    // Note: The default fallback 300, is the default height of
    // CodePen embeds not specifying a height
    return this.getAttribute('data-height') || '300';
  }
  get codePenSlugHash() {
    return this.getAttribute('data-slug-hash') || '';
  }
  onIntersectionUpdates(intersections) {
    const lastIntersectionRecord = intersections[intersections.length - 1];

    if (lastIntersectionRecord?.isIntersecting) {
        this.reloadCodePenEmbed();
    }
  }
  resetEmbedContent() {
    if (!this.codepenEmbedContainerElem) {
      return;
    }

    this.codepenEmbedContainerElem.textContent = '';
    this.codepenEmbedContainerElem.style.height = `${this.codePenHeight}px`;
  
    const embedTemplateClone = embedTemplate.content.cloneNode(true);
    this.codepenEmbedContainerElem.appendChild(embedTemplateClone);
    
    this.codepenEmbedElem = this.codepenEmbedContainerElem.querySelector('div');

    // If there is a code pen hash, add a special class
    // including this hash to allow individual triggering
    // or loading of it when it comes into view
    if (this.codePenSlugHash) {
      const codePenSlugHash = this.codePenSlugHash ?
        `-${this.codePenSlugHash}` : '';
      this.codepenEmbedElem.classList.add(`${codepenEmbedClass}${codePenSlugHash}`);
    }

    copyAttributes(this, this.codepenEmbedElem, codepenEmbedAttributes);
  }
  reloadCodePenEmbed() {
    if (!this.codepenEmbedContainerElem) {
      return;
    }

    loadCodePenEmbedScript()
      .then(() => triggerCodePenEmbedReload(this.codePenSlugHash))
      // Would probably want to handle this better later
      .catch(err => {
        this.codepenEmbedElem.textContent = 'An error occurred while loading the CodePen';
        console.error(err);
      });
  }
  connectedCallback() {
    // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks
    if (!this.isConnected) {
      return;
    }

    const templateClone = template.content.cloneNode(true);
    this.appendChild(templateClone);

    this.codepenEmbedContainerElem = this.querySelector(`.${codepenEmbedContainerClass}`);
    this.resetEmbedContent();

    /*
      If the intersection observer API is supported then we will
      let that trigger the loading of the CodePen embed, when the
      CodePen embed container elem is brought into view.

      If the intersection observer API is not supported, then we will
      immediately load the CodePen.
    */
    if (this.intersectionObserver) {
      this.intersectionObserver.observe(this.codepenEmbedContainerElem);
    } else {
      this.reloadCodePenEmbed();
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.resetEmbedContent();
    this.reloadCodePenEmbed();
  }
  disconnectedCallback() {
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(this.codepenEmbedContainerElem);
    }

    this.codepenEmbedContainerElem = null;
    this.codepenEmbedElem = null;
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