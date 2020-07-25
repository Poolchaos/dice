class Cart extends ComponentBase {

  static get observedAttributes() { return ['cart']; }

  VIEW = 'app/components/organisms/cart/cart.html';
  STYLES = 'app/components/organisms/cart/cart.css';
  ROW_TEMPLATE = 'app/components/organisms/cart/templates/table-row.html';

  cart;
  
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  constructor() {
    super();
    this.init();
  }

  async init() {
    await super.init();
    cartService.getCart();
  }

  async attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'cart') {

      this.cart = JSON.parse(newVal);
      this.renderTotal();

      if (oldVal) {
        this.updateRenderedItems();
      } else {
        this.renderCartItems();
      }
      this.checkForItems();
    }
  }

  renderTotal() {
    if (this.cart) {
      const subTotal = this.formatter.format(this.cart.subTotal);
      const tax = this.formatter.format(this.cart.tax);
      const total = this.formatter.format(this.cart.total);
      this.renderContent('subTotal', subTotal);
      this.renderContent('tax', tax);
      this.renderContent('total', total);
    }
  }

  renderContent(selector, value) {
    let element = super.getElements(selector);
    if (element) {
      element.innerHTML = value;
    }
  }

  updateRenderedItems() {
    const ids = this.cart.products.map(item => item.id);
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

  async renderCartItems() {
    let rows = [];
    let rowHTMLString = await RequestService.get(this.ROW_TEMPLATE);
    this.cart.products.forEach(product => rows.push(this.createRow(rowHTMLString, product)));

    let table = super.getElements('cartTable');
    if (table) {
      Promise.all(rows.map(row => table.innerHTML += row))
        .then(() => this.addClickListeners());
    }
  }

  createRow(rowHTMLString, product) {
    for (let prop in product) {
      let value = product[prop];

      if (prop === 'price') {
        value = this.formatter.format(value);
      }

      rowHTMLString = rowHTMLString.replace(new RegExp(`{{${prop}}}`, 'g'), value);
    }
    return rowHTMLString;
  }

  addClickListeners() {
    this.addUpdateQuantityListeners();
    this.addRemoveButtonListeners();
    this.addCheckoutListener();
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
    if (input.value) {
      cartService.updateItem(productId, parseInt(input.value));
    } else {
      console.warn('The quantity needs a value and should be a integer.');
    }
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

  addCheckoutListener() {
    let button = super.getElements('checkout');
    button.addEventListener('click', () => this.checkout());
  }

  checkout() {
    let cart = this.cart;
    let commentElement = super.getElements('comments');
    const sanitized = this.sanitize(commentElement.value);
    const additionalComment = commentElement.value;
    cart.additionalComment = additionalComment;

    cartService.checkout(cart);
  }

  sanitize(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  checkForItems() {
    let emptyListNotifier = super.getElements('emptyList');
    
    if (this.cart.products.length > 0) {
      if (!emptyListNotifier.className.includes(' hidden')) {
        emptyListNotifier.className += ' hidden';
      }
      
    } else {
      emptyListNotifier.className = emptyListNotifier.className.replace(' hidden', '');
    }
  }
}

customElements.define('d-cart', Cart);
