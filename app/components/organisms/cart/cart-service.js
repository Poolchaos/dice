class CartService {

  cartRoute = 'app/_mock-data/cart.json';
  
  async getCart() {
    stateService.cart = await RequestService.get(this.cartRoute);
  }

  async removeCartItem(productId) {
    // stateService.products = await RequestService.delete(productId);

    // Mock delete
    let subTotal = 0;
    const tax = stateService.tax;

    const products = stateService.products.filter(item => {
      if (item.id === productId) {
        return false;
      }
      subTotal += item.price;
      return true;
    });
    const total = subTotal + tax;
    stateService.cart = {
      subTotal,
      tax,
      total,
      products
    };
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