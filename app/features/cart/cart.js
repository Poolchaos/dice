class Cart extends ComponentBase {

  VIEW = 'app/features/cart/cart.html';
  STYLES = 'app/features/cart/cart.css';
  ROW_TEMPLATE = 'app/features/cart/templates/table-row.html';

  constructor() {
    super();
    this.init();
  }

  async init() {
    await super.init();
    this.getCart();
  }

  async getCart() {
    // todo: implement state management
    this.products = await cartService.getCart();
    this.renderCardItems();
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
