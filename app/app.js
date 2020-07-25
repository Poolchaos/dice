class App {
  products = [];

  constructor() {
    RequestService.loadResources();
    this.subscribeToDataChanges();
  }

  subscribeToDataChanges() {
    stateService.onChange.products(products => {
      this.products = products;
      this.bindCount();
      this.bindProducts();
    });
  }
  
  bindCount() {
    let count = document.querySelector('d-count');
    if (count) {
      count.setAttribute('items-count', this.products.length);
    }
  }

  bindProducts() {
    let cart = document.querySelector('d-cart');
    if (cart) {
      cart.setAttribute('products', JSON.stringify(this.products));
    }
  }
}

const app = new App();