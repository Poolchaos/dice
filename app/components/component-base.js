class ComponentBase extends HTMLElement {

  constructor() {
    super();
  }
  
  connectedCallback() {
    console.log(' ::>> connectedCallback ');
  }

  disconnectedCallback() {
    console.log(' ::>> disconnectedCallback ');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log(' ::>> attributeChangedCallback ', { attrName, oldVal, newVal });
  }

  init() {
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.loadView();
  }

  async loadView() {
    console.log(' ::>> this >>>> ', { this: this });
    if (!this.view) {
      console.error('No view has been specified');
      return;
    }
    let template = await RequestService.get(this.view);
    this.shadow.innerHTML = template;
    this.addStyles();
  }

  async addStyles() {
    if (!this.styles) {
      console.warn('No styles has been specified');
      return;
    }
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', this.styles);
    this.shadow.appendChild(link);
  }
}