class RequestService {
  static RESOURCES = {
    CSS: [
      'app/shared/theme.css',
      'app/shared/globals.css'
    ],
    JS: [ // todo: think of naming
      { path: 'app/components/index.json',  config: true },
      { path: 'app/features/index.json',    config: true }

    ]
  };

  static get(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            if (url.includes('.json')) {
              resolve(JSON.parse(xhr.responseText));
              return;
            }
            resolve(xhr.responseText);
          }
      }
      xhr.open('GET',  url, true);
      xhr.send(null);
    });
  }
  
  static loadResources() {
    RequestService.RESOURCES.CSS.forEach(file => RequestService.add.style(file));
    RequestService.RESOURCES.JS.forEach(file => RequestService.loadJSResource(file));
  }
  
  static loadJSResource(file) {

    if (file.config) {
      RequestService.getConfigResource(file.path);
    } else {
      RequestService.add.script(file);
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

  static async getConfigResource(path) {
    const resources = await RequestService.get(path);
    // const resources = JSON.parse(resp);
    
    if (Array.isArray(resources)) {
      resources.forEach(entry => RequestService.loadJSResource(entry));
    }
  }
}
