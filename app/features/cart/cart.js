class Cart extends ComponentBase {

  VIEW = 'app/features/cart/cart.html';
  STYLES = 'app/features/cart/cart.css';

  constructor() {
    super();
    super.init();
  }
}

customElements.define('d-cart', Cart);
