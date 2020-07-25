class CartService {

  cartRoute = 'app/_mock-data/cart.json';
  
  async getCart() {
    stateService.cart = await RequestService.get(this.cartRoute);
  }

  async removeCartItem(productId) {
    // stateService.products = await RequestService.delete(productId);

    this.mockUpdate(true, null, productId);
  }

  async updateItem(productId, itemCount) {
    // stateService.products = await RequestService.put(productId, itemsCount);

    this.mockUpdate(null, true, productId, itemCount);
  }

  mockUpdate(remove, update, productId, itemCount) {
    let subTotal = 0;
    const tax = stateService.tax;
    let products;

    if (remove) {
      products = stateService.products.filter(item => {
        if (item.id === productId) {
          return false;
        }
        subTotal += (item.quantity * item.price);
        return true;
      });
    } else if (update) {
      
      products = stateService.products.map(item => {
        if (item.id === productId) {
          item.quantity = itemCount;
        }
        subTotal += (item.quantity * item.price);
        return item;
      });
    }
    
    const total = subTotal + tax;
    stateService.cart = {
      subTotal,
      tax,
      total,
      products
    };
  }
}

const cartService = new CartService();