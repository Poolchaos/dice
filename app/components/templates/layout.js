class Layout extends ComponentBase {

  VIEW = 'app/components/templates/layout.html';
  STYLES = 'app/components/templates/layout.css';

  constructor() {
    super();
    super.init();
  }
}

customElements.define('d-layout', Layout);
