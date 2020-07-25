let http = require('http');
let fs = require('fs');
let port = 9000;


function requestHandler(req, res) {

  let	content = '';
  let fileName = req.url === '/' ? null : req.url
  let localFolder = __dirname;

  if (fileName && fileName.includes('.css')) {
    res.setHeader('Content-Type', 'text/css');
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