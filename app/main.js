const add = {
  script: function(element) {
    document.body.appendChild(element);
  },
  style: function(element) {

  }
}

function createScript(path) {
  let el = document.createElement('script');
  el.setAttribute('type', 'text/javascript');
  el.setAttribute('src', path);
  add.script(el);
}

function includeFiles() {
  files.forEach(file => createScript(file));
}

(function () {
  console.log(' ::>> Logging method');
  includeFiles();


})();
