let http = require('http');
let fs = require('fs');
let port = 9000;


function requestHandler(req, res) {

  let	content = '';
  let fileName = req.url === '/' ? null : req.url
  let localFolder = __dirname;

  if (fileName) {
    if (fileName.includes('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if(fileName.includes('.json')) {
      res.setHeader('Content-Type', 'application/json');
    }
  }

    content = localFolder + (fileName || '/index.html');

    fs.readFile(content, function(err,contents) {
      if (!err) {
        res.end(contents);
      }
    });
};
 
http.createServer(requestHandler)
  .listen(port);

console.log('Server started. Listening on ', port);