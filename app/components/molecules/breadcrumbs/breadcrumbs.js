class Breadcrumbs extends ComponentBase {

  VIEW = 'app/components/molecules/breadcrumbs/breadcrumbs.html';
  STYLES = 'app/components/molecules/breadcrumbs/breadcrumbs.css';

  routes = [
    { name: 'Home',     route: 'home' },
    { name: 'Checkout', route: 'checkout' }
  ];

  constructor() {
    super();
  }
  
  connectedCallback() {
    this.init();
  }

  async init() {
    await super.init();
    this.generateBreadcrumbs();
  }

  createLinkNode(route) {
    let link = document.createElement('a');
    link.addEventListener('click', () => {
      console.log('Navigate to not existent route due to routes not being implemented:', route.name);
    });
    link.text = route.name;

    return link;
  }

  generateBreadcrumbs() {
    this.routes.forEach(route => {
      let node = this.createLinkNode(route);
      node.className = 'breadcrumb__link';
      let arrow = document.createElement('div');
      arrow.className = 'breadcrumb__arrow';

      let breadcrumbs = super.getElements('breadcrumb');
      if (breadcrumbs) {
        breadcrumbs.appendChild(node);
        breadcrumbs.appendChild(arrow);
      }
    });
  }
}

customElements.define('d-breadcrumbs', Breadcrumbs);
