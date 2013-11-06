var server = require('./server.js');
server.init();

var s = server.session;
var c = server.config;
var db = server.couchDb;

/*Rooting code goes here*/
server.on('/', function(req, res) {
var finalData = '';
var mdl = {};

db.get('/electronix_items/_design/category/_view/getAllCategories?group=true').on('error',function(){
}).on('data', function(data){
	finalData += data;
}).on('end', function(){
	mdl.categories = JSON.parse(finalData).rows;
	res.render('/web/index.htm', mdl);
});

});

server.on('/index', function(req, res) {

/*http.get("http://127.0.0.1:5984", function(res1) {
  console.log("Got response: " + res1.statusCode);
  console.log(res1);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});*/
	res.render('/web/index.htm');
});

server.on('/file_upload',function(req, res){
	res.render('/web/file_upload.htm');
});

server.on('/upload',function(req, res){
	var mdl = {};
	res.render('/web/file_upload.htm',mdl);
});

server.on('/admin',function(req, res){
	res.render('/web/admin.htm');
});


server.on('error', function(req, res) {
	res.render('/web/404.htm');
});

/*Rooting code goes here*/