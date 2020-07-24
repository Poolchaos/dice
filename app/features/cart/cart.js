class Cart extends ComponentBase {

  VIEW = 'app/features/cart/cart.html';
  STYLES = 'app/features/cart/cart.css';

  products = [
    { id: '434556256', name: 'Jet Ski',     price: '1500',  quantity: 1, image: 'https://picsum.photos/seed/picsum/80/100' },
    { id: '345245865', name: 'Bubble Wrap', price: '440',   quantity: 1, image: 'https://picsum.photos/seed/picsum/60/100' },
    { id: '987123654', name: 'Crock-Pot',   price: '55',    quantity: 1, image: 'https://picsum.photos/seed/picsum/60/100' }
  ];

  constructor() {
    super();
    this.init();
  }

  async init() {
    await super.init();
    this.renderCardItems();
  }

  renderCardItems() {
    let rows = [];
    this.products.forEach(item => rows.push(this.createRow(item)));

    let table = super.getElements('cartTable');
    if (table) {
      rows.forEach(row => table.appendChild(row));
    }
  }

  createRow(item) {
    let row = document.createElement('div');
    row.setAttribute('class', 'container-small row rounded');
    this.addColsToRow(row, item);
    // todo: set some row identifier for edit and remove
    return row;
  }

  addColsToRow(row, item) {
    let empty = this.genEmptyColumn();
    let name = this.genNameColumn(item);
    let price = this.genPriceColumn(item);
    let quantity = this.genQuantityColumn(item);
    let remove = this.genRemoveColumn(row);

    row.appendChild(empty);
    row.appendChild(name);
    row.appendChild(price);
    row.appendChild(quantity);
    row.appendChild(remove);
  }

  genEmptyColumn(item) {
    return document.createElement('div');
  }

  genNameColumn(item) {
    let col = document.createElement('div');

    let image = this.genImage(item.image);
    image.setAttribute('width', '80');
    image.setAttribute('height', '100');

    let name = document.createElement('div');
    name.innerHTML = item.name;

    let id = document.createElement('div');
    id.className = 'label';
    id.innerHTML = item.id;
    
    col.appendChild(image);
    col.appendChild(name);
    col.appendChild(id);
    return col;
  }

  genPriceColumn(item) {
    let col = document.createElement('div');
    let price = document.createTextNode(item.price);
    col.setAttribute('class', 'h-centered');
    
    col.appendChild(price);
    return col;
  }

  genQuantityColumn(item) {
    let col = document.createElement('div');

    let count = document.createElement('div');
    count.setAttribute('class', 'count container-small centered rounded black-bg');
    count.innerHTML = item.quantity;

    let update = document.createElement('span');
    update.setAttribute('class', 'label underlined hoverable');
    update.innerHTML = 'Update';
    
    col.appendChild(count);
    col.appendChild(update);
    return col;
  }

  genRemoveColumn(row) {
    let col = document.createElement('div');
    let remove = document.createElement('div');
    remove.setAttribute('class', 'remove hoverable centered');
    remove.addEventListener('click', () => {
      row.parentElement.removeChild(row);
    });
    
    col.appendChild(remove);
    return col;
  }

  genImage(path) {
    let image = document.createElement('image');
    image.setAttribute('src', path);
    return image;
  }
}

customElements.define('d-cart', Cart);
