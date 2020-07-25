class CartService {

  productsRoute = 'app/_mock-data/cart.json';
  
  async getCart() {
    return await RequestService.get(this.productsRoute);
  }
}

const cartService = new CartService();