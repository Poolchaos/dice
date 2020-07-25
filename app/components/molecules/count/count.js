class Count extends ComponentBase {

  static get observedAttributes() { return ['items-count']; }

  VIEW = 'app/components/molecules/count/count.html';
  STYLES = 'app/components/molecules/count/count.css';

  itemsCount;

  constructor() {
    super();
    this.init();
  }

  async init() {
    await super.init();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'items-count') {
      if (typeof newVal === 'string' && newVal.length > 0)
      this.setCount(newVal);
    }
  }

  async setCount(count) {
    let el = await super.getElements('count');
    el.innerHTML = count;
  }
}

customElements.define('d-count', Count);