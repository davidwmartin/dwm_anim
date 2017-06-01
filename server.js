////////

var http = require('http'),
		fs = require('fs'), 
		path = require('path'), 
    request = require('request'),
    webpack = require('webpack');

// TODO -- move server reqs into different folder? or subfolders of /modules ? (for organizational / clarity purposes)
var saveFrame = require('./modules/save-frame.js');




/****** 
**** SIMPLE HTTP SERVER
******/
// Simple Tutorial: https://www.sitepoint.com/creating-a-http-server-in-node-js/ 
// stackoverflow help: http://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http

var port = 6969;

var server = http.createServer(function(request, response){

	console.log('mmm connection');


  // if animation frontend POSTs data (b64 png "frames"), export / save them to disk
  if (request.method == 'POST'){
    console.log('new POST');
    ////
    var reqComplete = [];
    request.on('data', function(chunk) {
      reqComplete.push(chunk);
    }).on('end', function() {
      reqComplete = Buffer.concat(reqComplete).toString();
      saveFrame(reqComplete);
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end();
    });
  }
  // else serve the site -- currently assuming single entry point. swap animations by changing what animation object is required in index.js
  else {
  	var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './serve/index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
              // TODO: 404
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
  }
});


// listen on designated port
server.listen(port);
console.log("listenin' post established");



