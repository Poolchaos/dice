class StateService {
  subscribers = {
    products: [],
    itemCount: []
  };
  _products = [];
  _itemsCount;

  get products() {
    return this._products;
  }

  set products(products) {
    this._products = products;
    this._itemsCount = products.length;

    this.subscribers.products.forEach(callback => callback(products));
    this.subscribers.itemCount.forEach(callback => callback(products.length));
  }

  get itemCount() {
    return this._itemsCount;
  }

  onChange = {
    products: callback => this.subscribers.products.push(callback),
    itemsCount: callback => this.subscribers.itemCount.push(callback)
  }
}

const stateService = new StateService();