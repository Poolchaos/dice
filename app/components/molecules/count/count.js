class Count extends ComponentBase {

  VIEW = 'app/components/molecules/count/count.html';
  STYLES = 'app/components/molecules/count/count.css';

  constructor() {
    super();
    super.init();
    super.style.width = '100%';
  }
}

customElements.define('d-count', Count);