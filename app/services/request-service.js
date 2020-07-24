class RequestService {
  static FILE_TYPES = { JS: 'js', CSS: 'css' };
  static RESOURCES = [
    { path: 'app/shared/theme.css', type: 'css' },

    // 'app/components/component-base.js',
    { path: 'app/components/templates/layout.js', tageName: 'z-layout', type: 'js' },
    { path: 'app/components/molecules/count/count.js', tagName: 'z-count', type: 'js' }
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
    RequestService.RESOURCES.forEach(file => RequestService.loadResource(file));
  }
  
  static loadResource(file) {

    if (file.type === RequestService.FILE_TYPES.JS) {
      RequestService.add.script(file.path);

    } else if (file.type === RequestService.FILE_TYPES.CSS) {
      RequestService.add.style(file.path);
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
