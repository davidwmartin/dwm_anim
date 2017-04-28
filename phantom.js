// Node stuff
// var phantom = require('phantom');

var webPage = require('webpage');
var page = webPage.create();

page.viewportSize = { width: 1024, height: 768 };

page.open("http://localhost:6969", function start(status) {
  if (status !== 'success'){
    console.log(status);
  }
  else{
    page.render('frame.jpeg', {format: 'jpeg', quality: '100'});
    console.log('weeeeee');
    phantom.exit();
  }
});


// page.onError = function(msg, trace) {

//   var msgStack = ['ERROR: ' + msg];

//   if (trace && trace.length) {
//     msgStack.push('TRACE:');
//     trace.forEach(function(t) {
//       msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
//     });
//   }

//   console.error(msgStack.join('\n'));

// };

// var url = "localhost:9000/phantom.html";

// phantom.create(function(error, ph){
//   ph.createPage(function(err, page){
//     page.open(url ,function(err, status){
//       // do something
//       console.log('phantommmmmm');
//     });
//   });
// });
