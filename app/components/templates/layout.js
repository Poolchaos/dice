class Layout extends HTMLElement {

  static view = 'app/components/templates/layout.html';
  static styles = 'app/components/templates/layout.css';

  constructor() {
    super();
    console.log(' ::>> Root component created ');

    this.init();
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
    this.shadow = this.attachShadow({mode: 'closed'});
    this.loadView();
    this.addStyles();
  }

  async loadView() {
    let template = await RequestService.get(Layout.view);
    this.shadow.innerHTML = template;
  }

  async addStyles() {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', Layout.styles);

    let styles = await RequestService.get(Layout.styles);
    link.innerHTML += styles;
    this.shadow.appendChild(link);
  }
}

customElements.define('d-layout', Layout);
