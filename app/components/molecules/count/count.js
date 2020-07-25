class Count extends ComponentBase {

  VIEW = 'app/components/molecules/count/count.html';
  STYLES = 'app/components/molecules/count/count.css';

  itemsCount;

  constructor() {
    super();
    this.init();
  }

  async init() {
    await super.init();
    this.subscribeToProducts();
  }

  async subscribeToProducts() {
    this.setCount(stateService.itemsCount);

    stateService.onChange.itemsCount(itemsCount => this.setCount(itemsCount));
  }

  async setCount(count) {
    this.itemsCount = count;
    let el = await super.getElements('count');
    el.innerHTML = count;
  }
}

customElements.define('d-count', Count);