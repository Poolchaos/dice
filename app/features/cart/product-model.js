class ProductModel {
  id = null;
  name = null;
  price = null;
  quantity = null;
  image = null;

  constructor(data) {
    this.mapProperties(data);

    return {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      image: this.image
    }
  }
  
  mapProperties(data) {
    for (let prop in this) {
      if (prop && data[prop]) {
        this[prop] = data[prop];
      }
    }
  }
}