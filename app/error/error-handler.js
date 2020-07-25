class ErrorHandler {
  constructor() {
    this.subscribeToErrors();
  }

  subscribeToErrors() {
    window.onerror = function(message, source, lineno, colno, error) {
      console.warn(' An error ocurred:', { message, source, lineno, colno, error });
    };
  }
}

const errorHandler = new ErrorHandler();