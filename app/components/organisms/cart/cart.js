class Cart extends ComponentBase {

  static get observedAttributes() { return ['products']; }

  VIEW = 'app/components/organisms/cart/cart.html';
  STYLES = 'app/components/organisms/cart/cart.css';
  ROW_TEMPLATE = 'app/components/organisms/cart/templates/table-row.html';

  products = [];

  constructor() {
    super();
    this.init();
  }

  async init() {
    await super.init();
    cartService.getCart();
  }

  async attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'products') {
      this.products = JSON.parse(newVal);

      if (oldVal) {
        this.updateRenderedItems();
      } else {
        this.renderCardItems();
      }
    }
  }

  updateRenderedItems() {
    const ids = this.products.map(item => item.id);
    const elements = super.getElements(null, 'row-template');
    
    if (elements) {
      elements.forEach(element => {
        const productId = element.getAttribute('data-id');

        if (!ids.includes(productId)) {
          element.parentNode.removeChild(element)
        }
      });
    }
  }

  async renderCardItems() {
    let rows = [];
    let rowHTMLString = await RequestService.get(this.ROW_TEMPLATE);
    this.products.forEach(product => rows.push(this.createRow(rowHTMLString, product)));

    let table = super.getElements('cartTable');
    if (table) {
      Promise.all(rows.map(row => table.innerHTML += row))
        .then(() => this.addClickListeners());
    }
  }

  createRow(rowHTMLString, product) {
    for (let prop in product) {
      rowHTMLString = rowHTMLString.replace(new RegExp(`{{${prop}}}`, 'g'), product[prop]);
    }
    return rowHTMLString;
  }

  addClickListeners() {
    this.addUpdateQuantityListeners();
    this.addRemoveButtonListeners();
  }

  addUpdateQuantityListeners() {
    let updateLinks = super.getElements(null, 'update');
    updateLinks.forEach(link => {
      link.addEventListener('click', () => this.updateCount(link));
    });
  }

  updateCount(link) {
    const productId = link.getAttribute('data-id');
    let input = link.parentNode.querySelector('input');
    cartService.updateItem(productId, parseInt(input.value));
  }

  addRemoveButtonListeners() {
    let buttons = super.getElements(null, 'remove');
    buttons.forEach(button => {
      button.addEventListener('click', () => this.removeItem(button));
    });
  }

  removeItem(button) {
    const productId = button.getAttribute('data-id');
    cartService.removeCartItem(productId);
  }
}

customElements.define('d-cart', Cart);
