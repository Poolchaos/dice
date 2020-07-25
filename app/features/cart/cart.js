class Cart extends ComponentBase {

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
    this.subscribeToProducts();
  }

  async subscribeToProducts() {
    stateService.onChange.products(products => {
      this.products = products;
      this.renderCardItems();
    });

    cartService.getCart();
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
