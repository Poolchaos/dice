class RequestModel {
  additionalComment = null;
  products = null;
  subTotal = null;
  tax = null;
  total = null;

  constructor(data) {
    this.mapProperties(data);

    return {
      additionalComment: this.additionalComment,
      products: this.products,
      subTotal: this.subTotal,
      tax: this.tax,
      total: this.total
    }
  }
  
  async mapProperties(data) {
    for (let prop in this) {
      if (prop === 'products') {
        data[prop] = this.mapProducts(data[prop]);
      }
      if (prop && data[prop] !== null) {
        this[prop] = data[prop];
      }
    }
  }

  mapProducts(products) {
    return products.map(product => {
       return {
        id: product.id,
        price: product.price,
        quantity: product.quantity
       };
    });
  }
}