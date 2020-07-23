class RequestService {
  static get(url) {

    return new Promise((resolve, reject) => {
      
    
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
              console.log(xhr.responseText);
              resolve(xhr.responseText);
          }
      }
      xhr.open('GET',  url, true);
      xhr.send(null);

    })
  }
}
