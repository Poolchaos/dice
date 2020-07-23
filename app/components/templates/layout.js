class Layout extends ComponentBase {

  view = 'app/components/templates/layout.html';
  styles = 'app/components/templates/layout.css';

  constructor() {
    super();
    console.log(' ::>> Root component created ');
    super.init();
  }

}

customElements.define('d-layout', Layout);
