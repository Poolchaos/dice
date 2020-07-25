class Cart extends ComponentBase {

  VIEW = 'app/features/cart/cart.html';
  STYLES = 'app/features/cart/cart.css';
  ROW_TEMPLATE = 'app/features/cart/templates/table-row.html';

  products = [
    { id: '434556256', name: 'Jet Ski',     price: '1500',  quantity: 1, image: 'https://picsum.photos/seed/picsum/80/80' },
    { id: '345245865', name: 'Bubble Wrap', price: '440',   quantity: 1, image: 'https://picsum.photos/seed/picsum/80/80' },
    { id: '987123654', name: 'Crock-Pot',   price: '55',    quantity: 1, image: 'https://picsum.photos/seed/picsum/80/80' }
  ];

  constructor() {
    super();
    this.init();
  }

  async init() {
    await super.init();
    this.renderCardItems();
  }

  async renderCardItems() {
    let template = await RequestService.get(this.ROW_TEMPLATE);
    console.log(' ::>> template >>>> ', template);

    let rows = [];
    this.products.forEach(product => rows.push(this.createRow(template, product)));

    let table = super.getElements('cartTable');
    if (table) {
      rows.forEach(row => table.innerHTML += row);
    }
  }

  createRow(template, product) {
    template = template.replace('{{id}}', product.id);
    template = template.replace('{{name}}', product.name);
    template = template.replace('{{price}}', product.price);
    template = template.replace('{{quantity}}', product.quantity);
    template = template.replace('{{image}}', product.image);
    return template;
  }
}

customElements.define('d-cart', Cart);
