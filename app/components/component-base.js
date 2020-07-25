class ComponentBase extends HTMLElement {

  THEME_STYLES = 'app/shared/theme.css';
  SHARED_STYLES = 'app/shared/globals.css';
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
    this.createLink(this.THEME_STYLES);
    this.createLink(this.STYLES);
    this.rootElement = this.shadow.children[0];
  }

  createLink(path) {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', path);
    this.shadow.appendChild(link);
  }

  getElements(id, className) {
    let children = this.shadow.children;

    for(var child of children) {
      
      if (id && child.id === id) {
        return child;
      }

      let elements;
      if (id) {
        elements = child.querySelector('#' + id)
      } else if (className) {
        elements = child.querySelectorAll('.' + className)
      }

      if (elements) {
        return elements;
      }
    }
    console.warn(`Element with selector '${id}' not found.`);
  }

  getParent(element, className) {
    if (className && element.className.includes(className)) {
      return element;
    }
    return this.getParent(element.parentNode, className);
  }
}
