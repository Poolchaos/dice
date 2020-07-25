class App {
  products = [];

  constructor() {
    RequestService.loadResources();
    this.subscribeToDataChanges();
  }

  subscribeToDataChanges() {
    stateService.onChange.products(products => {
      this.products = products;
      console.log(' products => ', products);
      this.bindProducts();
    });
  }

  bindProducts() {
    let count = document.querySelector('d-count');
    if (count) {
      console.log(' ::>> setCount', this.products.length);
      count.setAttribute('items-count', this.products.length);
    }
    let cart = document.querySelector('d-cart');
    if (cart) {
      cart.setAttribute('products', JSON.stringify(this.products));
    }
  }
}

const app = new App();