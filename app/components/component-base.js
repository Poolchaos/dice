class ComponentBase extends HTMLElement {

  SHARED_STYLES = 'app/shared/theme.css';

  constructor() {
    super();
  }
  
  connectedCallback() {
    console.log(`Not implemented in '${this.tagName.toLowerCase()}'. Create connectedCallback() to override.`);
  }

  disconnectedCallback() {
    console.log(`Not implemented in '${this.tagName.toLowerCase()}'. Create disconnectedCallback() to override.`);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log(`Not implemented in '${this.tagName.toLowerCase()}'. Create attributeChangedCallback() to override.`, { attrName, oldVal, newVal });
  }

  init() {
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.loadView();
  }

  async loadView() {
    if (!this.VIEW) {
      console.error('No view has been specified');
      return;
    }
    let template = await RequestService.get(this.VIEW);
    this.shadow.innerHTML = template;
    this.addStyles();
  }

  async addStyles() {
    if (!this.STYLES) {
      console.warn('No styles has been specified');
      return;
    }
    this.createLink(this.SHARED_STYLES);
    this.createLink(this.STYLES);
  }

  createLink(path) {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', path);
    this.shadow.appendChild(link);
  }
}
