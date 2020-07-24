class RequestService {
  
  static resources = [
    'app/shared/theme.css',

    // 'app/components/component-base.js',
    'app/components/templates/layout.js',
    'app/components/molecules/count/count.js'
  ];

  static get(url) {

    return new Promise((resolve, reject) => {
    
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
              resolve(xhr.responseText);
          }
      }
      xhr.open('GET',  url, true);
      xhr.send(null);

    })
  }
  
  static includeFiles() {
    RequestService.resources.forEach(file => RequestService.createScript(file));
  }
  
  static createScript(path) {

    if (path.indexOf('.js') >= 0) {
      RequestService.add.script(path);
    } else if (path.indexOf('.css') >= 0) {
      RequestService.add.style(path);
    }
  }

  static add = {
    script: function(path) {
      
      let el = document.createElement('script');
      el.setAttribute('type', 'text/javascript');
      el.setAttribute('src', path);

      document.body.appendChild(el);
    },
    style: function(path) {
      
      let el = document.createElement('link');
      el.setAttribute('rel', 'stylesheet');
      el.setAttribute('href', path);

      document.head.appendChild(el);
    }
  }
}
