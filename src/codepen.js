const templateContent = `
  <style>
    .codepen-container { }
  </style>
  <div class="codepen-container"></div>
`;

const template = document.createElement('template');
template.innerHTML = templateContent;

export default class CodePen extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
  }
  connectedCallback() {
    // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks
    if (!this.isConnected) {
      return;
    }

    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    const templateClone = template.content.cloneNode(true);

    shadowRoot.appendChild(templateClone);
  }
  attributeChangedCallback() {
    console.log('attribute changed');
  }
  disconnectedCallback() {
    console.log('disconnected');
  }
}