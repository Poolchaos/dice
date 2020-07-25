class CartService {

  productsRoute = 'app/_mock-data/cart.json';
  
  async getCart() {
    stateService.products = await RequestService.get(this.productsRoute);
  }

  async removeCartItem(productId) {
    // stateService.products = await RequestService.delete(productId);

    // Mock delete
    stateService.products = stateService.products.filter(item =>
      item.id !== productId);
  }

  async updateItem(productId, itemCount) {
    // stateService.products = await RequestService.put(productId, itemsCount);

    // Mock update
    let products = stateService.products.map(item => {
      if (item.id === productId) {
        item.quantity = itemCount;
      }
      return item;
    });
    stateService.products = products;
  }
}

const cartService = new CartService();