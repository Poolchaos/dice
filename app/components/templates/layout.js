class Layout extends HTMLElement {

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
    this.createSlot('header');
    this.createSlot('content');
    this.addStyles();
  }

  createSlot(name) {
    let wrapper = document.createElement('div');
    wrapper.setAttribute('class', name);

    let slot = document.createElement('slot');
    slot.setAttribute('name', name);

    wrapper.appendChild(slot);
    this.shadow.appendChild(wrapper);
  }

  addStyles() {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', Layout.styles);
    this.shadow.appendChild(link);
  }
}

customElements.define('d-layout', Layout);
