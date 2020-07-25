class App {
  cart;

  constructor() {
    RequestService.loadResources();
    this.subscribeToDataChanges();
  }

  subscribeToDataChanges() {
    stateService.onChange.cart(cart => {
      this.cart = cart;
      this.bindCount();
      this.bindProducts();
    });
  }
  
  bindCount() {
    let count = document.querySelector('d-count');
    if (count) {
      count.setAttribute('items-count', this.cart.products.length);
    }
  }

  bindProducts() {
    let cart = document.querySelector('d-cart');
    if (cart) {
      cart.setAttribute('cart', JSON.stringify(this.cart));
    }
  }
}

const app = new App();