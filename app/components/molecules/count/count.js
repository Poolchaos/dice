class Count extends ComponentBase {

  view = 'app/components/molecules/count/count.html';
  styles = 'app/components/molecules/count/count.css';

  constructor() {
    super();
    super.init();
    console.log({ el: this });
    super.style.width = '100%';
  }
}

customElements.define('d-count', Count);