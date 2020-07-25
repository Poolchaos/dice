class RequestService {
  static RESOURCES = {
    CSS: [
      'app/assets/styles/theme.css',
      'app/assets/styles/globals.css'
    ],
    CONFIG: [
      { path: 'app/components/index.json', config: true },
      'app/error/error-handler.js'
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

  static delete(url, data) {
    // delete implementation here
  }

  static put(url, data) {
    // update implementation here
  }
  
  static loadResources() {
    RequestService.RESOURCES.CSS.forEach(file => RequestService.add.style(file));
    RequestService.RESOURCES.CONFIG.forEach(file => RequestService.loadJSResource(file));
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
    
    if (Array.isArray(resources)) {
      resources.forEach(entry => RequestService.loadJSResource(entry));
    }
  }
}
