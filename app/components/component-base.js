class ComponentBase extends HTMLElement {

  SHARED_STYLES = 'app/shared/theme.css';
  shadow;
  rootElement;

  constructor() {
    super();
    super.class = 'wrapper';
  }
  
  connectedCallback() {
    console.log(`connectedCallback not implemented in '${this.tagName.toLowerCase()}'. Create connectedCallback() to override.`);
  }

  disconnectedCallback() {
    console.log(`disconnectedCallback nNot implemented in '${this.tagName.toLowerCase()}'. Create disconnectedCallback() to override.`);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log(`attributeChangedCallback nNot implemented in '${this.tagName.toLowerCase()}'. Create attributeChangedCallback() to override.`, { attrName, oldVal, newVal });
  }

  async init() {
    this.shadow = this.attachShadow({ mode: 'open' });
    await this.loadView();
  }

  async loadView() {
    if (!this.VIEW) {
      console.warn('No view has been specified');
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
    this.rootElement = this.shadow.children[0];
  }

  createLink(path) {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', path);
    this.shadow.appendChild(link);
  }

  getElements(selector) {
    return this.rootElement;
  }
}
