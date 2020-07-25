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
    this._products = products.map(product => new ProductModel(product));
    this._itemsCount = products.length;
    this.triggerUpdate();
  }

  get itemCount() {
    return this._itemsCount;
  }

  onChange = {
    products: callback => this.subscribers.products.push(callback),
    itemsCount: callback => this.subscribers.itemCount.push(callback)
  }

  triggerUpdate() {
    this.subscribers.products.forEach(callback => callback(this.products));
    this.subscribers.itemCount.forEach(callback => callback(this.products.length));
  }
}

const stateService = new StateService();