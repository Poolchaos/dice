class Count extends ComponentBase {

  VIEW = 'app/components/molecules/count.html';
  STYLES = 'app/components/molecules/count.css';

  constructor() {
    super();
    super.init();
  }
}

customElements.define('d-count', Count);