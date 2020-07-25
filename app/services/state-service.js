class StateService {
  subscribers = {
    cart: [],
    itemCount: []
  };

  _subTotal;
  _tax;
  _total;
  _products = [];
  _itemsCount;

  get cart() {
    return {
      subTotal: this.subTotal,
      tax: this.tax,
      total: this.total,
      products: this.products
    };
  }
  set cart(cart) {
    this._subTotal = cart.subTotal;
    this._tax = cart.tax;
    this._total = cart.total;
    this._products = cart.products;
    this.triggerUpdate();
  }

  get subTotal() {
    return this._subTotal;
  }
  set subTotal(subTotal) {
    this._subTotal = subTotal;
  }

  get tax() {
    return this._tax;
  }
  set tax(tax) {
    this._tax = tax;
  }

  get total() {
    return this._total;
  }
  set total(total) {
    this._total = total;
  }

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
    cart: callback => this.subscribers.cart.push(callback),
    itemsCount: callback => this.subscribers.itemCount.push(callback)
  }

  triggerUpdate() {
    this.subscribers.cart.forEach(callback => callback(this.cart));
    this.subscribers.itemCount.forEach(callback => callback(this.products.length));
  }
}

const stateService = new StateService();