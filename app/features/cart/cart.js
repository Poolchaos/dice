class Cart extends ComponentBase {

  static get observedAttributes() { return ['products']; }

  VIEW = 'app/features/cart/cart.html';
  STYLES = 'app/features/cart/cart.css';
  ROW_TEMPLATE = 'app/features/cart/templates/table-row.html';

  products = [];

  constructor() {
    super();
    this.init();
  }

  async init() {
    await super.init();
    cartService.getCart();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'products') {
      if (typeof newVal === 'string' && newVal.length > 0)
      this.products = JSON.parse(newVal);
      this.renderCardItems();
    }
  }

  async renderCardItems() {
    let rows = [];
    let rowHTMLString = await RequestService.get(this.ROW_TEMPLATE);
    this.products.forEach(product => rows.push(this.createRow(rowHTMLString, product)));

    let table = super.getElements('cartTable');
    if (table) {
      Promise.all(rows.map(row => table.innerHTML += row))
        .then(() => {
          let buttons = super.getElements(null, 'remove');
          // todo: add click events
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              
            });
          });
        });
    }
  }

  createRow(rowHTMLString, product) {
    for (let prop in product) {
      rowHTMLString = rowHTMLString.replace(`{{${prop}}}`, product[prop]);
    }
    return rowHTMLString;
  }
}

customElements.define('d-cart', Cart);
