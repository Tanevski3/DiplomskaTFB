var server = require('./server.js'),
querystring = require('querystring'),
os = require('os');

server.init();

var session = server.session;
var c = server.config;
var db = server.couchDb;
var sr = server.srv;

var io = require('socket.io').listen(sr);
 
io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        io.sockets.emit("message_to_client",{ message: data["message"] });
    });
});

/******************INDEX****************/
function index(req, res){
	var finalData = '';
var mdl = {};
mdl.dbHostname = db.hostname;
mdl.dbPort = db.port;
db.get('/electronix_items/_design/category/_view/getAllCategories?group=true').on('error',function(){
}).on('data', function(data){
finalData += data;
}).on('end', function(){

mdl.categories = JSON.parse(finalData).rows;
if(req.query.category){
var newData = '';
var got = db.get('/electronix_items/_design/items_by_category/_view/getItemsByCategory?key="'+ querystring.escape(req.query.category) + '"');
got.on('data', function(data){
newData += data;
});
got.on('end', function(){
mdl.items = JSON.parse(newData).rows;
mdl.hostname = os.hostname().toString();
res.render('/web/index.htm', mdl);
});
}else if(req.query.search){
var newData = '';
var got = db.get('/electronix_items/_design/items/_view/getAllItems');
got.on('data', function(data){
newData += data;
});
got.on('end', function(){
var newItems = JSON.parse(newData).rows;
mdl.items = [];
for(var i = 0; i< newItems.length; i++ ){
	if(newItems[i].value.title.indexOf(req.query.search) !== -1 || newItems[i].value.description.indexOf(req.query.search) !== -1){
		mdl.items.push(newItems[i]);
	}
}
if(mdl.items.length < 1){
	mdl.noItemsFound = 'Sorry, no items with name "' + req.query.search  +'" could be found.';
	console.log('i got here');
	}

mdl.hostname = os.hostname().toString();
res.render('/web/index.htm', mdl);
});
}
else{
var _newData = '';
var got = db.get('/electronix_items/_design/items_by_category/_view/getItemsByCategory');
got.on('data',function(itemsData){
_newData += itemsData;
});
got.on('end',function(){
mdl.items = JSON.parse(_newData).rows;
mdl.hostname = os.hostname().toString();
res.render('/web/index.htm', mdl);
});
}

});
}
/******************INDEX****************/

// '/'
server.on('/', function(request, response) {
	index(request,response);

});
// '/'

// '/index'
server.on('/index', function(request, response) {

	index(request,response);

});
// '/index'

server.on('/file_upload',function(req, res){
	res.render('/web/file_upload.htm');
});

server.on('/upload',function(req, res){
	res.render('/web/file_upload.htm');
});

server.on('/admin',function(req, res){

var mdl = {};

	if(req.body){
		if(req.body.logout){
			session.clear();
			console.log('session clear got called YEYAAAA');
			mdl.errorMessage = "";
			res.render('/web/admin.htm',mdl);
			return;
		}else{
			mdl.errorMessage = "";
			res.render('/web/admin.htm',mdl);
			return;
		}
	} else{

	if(session.getAttribute('user')){
		var mdl = {};
		mdl.user = session.getAttribute('user');
		res.render('/web/panel.htm', mdl);
		return;
	}


	mdl.errorMessage = "";
	res.render('/web/admin.htm',mdl);
	return;

	}

});

server.on('/detail',function(req, res){
	if(req.query._id){
		var mdl = {};
		var finalData = '';
		mdl.dbHostname = db.hostname;
		mdl.dbPort = db.port;
		db.get('/electronix_items/_design/category/_view/getAllCategories?group=true').on('error',function(){
		}).on('data', function(data){
		finalData += data;
		}).on('end', function(){
		   mdl.categories = JSON.parse(finalData).rows;
		   var itemData = '';
		   var got = db.get('/electronix_items/_design/item/_view/getItemById?key="' + querystring.escape(req.query._id) + '"');
		   got.on('data',function(_data){
		   		itemData += _data;
		   });
		   got.on('end', function(){
		   		mdl.item = JSON.parse(itemData).rows[0];
				res.render('/web/detail.htm', mdl);
		   });
		});
		
	}
	else{
		res.render('/web/404.htm');
	}
});
server.on('/panel',function(req,res){
		var mdl = {};

		mdl.user = session.getAttribute('user');

	if(mdl.user && mdl.user.isActive){
		res.render('/web/panel.htm', mdl);
		return;
	}

	if(req.body){
		if(req.body.username && req.body.password){


			var got = db.get('/electronix_users/_design/user/_view/getUserByUsername?key="' + querystring.escape(req.body.username) +'"');
			var userData = '';
			got.on('data', function(d){
				userData += d;
			});
			got.on('end', function(){
				var parsedData = JSON.parse(userData).rows;
				if(parsedData.length > 0){
					if(parsedData[0].key === req.body.username){
						mdl.user = parsedData[0].value;

						session.setAttribute('user', mdl.user);
						res.render('/web/panel.htm', mdl);
						return;
					}
					else{
						mdl.errorMessage = "Such user could not be found. Check username or password."
						res.render('/web/admin.htm', mdl);
						return;
					}
				}
				else{
					mdl.errorMessage = "Such user could not be found. Check username or password."
					res.render('/web/admin.htm', mdl);
					return;
				}
			});

		}else{
		mdl.errorMessage = "Such user could not be found. Check username or password."
		res.render('/web/admin.htm',mdl);
		return;
	  }
	}else{
		mdl.errorMessage = "Access denied you must login first."
		res.render('/web/admin.htm',mdl);
		return;
	}

})
server.on('error', function(req, res) {
	res.render('/web/404.htm');
});

server.on('/about', function(req, res) {

		var mdl = {};
		var finalData = '';
		
		db.get('/electronix_items/_design/category/_view/getAllCategories?group=true').on('error',function(){
		}).on('data', function(data){
		finalData += data;
		}).on('end', function(){
		   mdl.categories = JSON.parse(finalData).rows;
		   var aboutData = '';

		   var got = db.get('/electronix_items/_design/about/_view/getAbout');
		   got.on('data',function(_data){
		   		aboutData += _data;
		   });

		   got.on('end', function(){
		   		mdl.about = JSON.parse(aboutData).rows[0].key;
				res.render('/web/about.htm', mdl);
				return;
		   });
		});

});

server.on('/contact', function(req, res) {

		var mdl = {};
		var finalData = '';
		
		db.get('/electronix_items/_design/category/_view/getAllCategories?group=true').on('error',function(){
		}).on('data', function(data){
		finalData += data;
		}).on('end', function(){
		   mdl.categories = JSON.parse(finalData).rows;

			res.render('/web/contact.htm', mdl);
			return;
		});
});

server.on('/panel_categories', function(req, res){


		var mdl = {};
		var finalData = '';

	if(session.getAttribute('user')){
		if(req.query.newCategory){

		}
		mdl.user = session.getAttribute('user');
				db.get('/electronix_items/category').on('error',function(){
		}).on('data', function(data){
		finalData += data;
		}).on('end', function(){
		   mdl.category = JSON.parse(finalData);

			res.render('/web/panel_categories.htm', mdl);
			return;
		});
		return;
	}else{
		mdl.errorMessage = "Access denied: you must login first!";
		res.render('/web/admin.htm',mdl);
	}


});


server.on('/panel_items', function(req, res){

		var mdl = {};
		var finalData = '';
		var categoryData = '';

	if(session.getAttribute('user')){

		var itemSize = '';
		db.get('/electronix_items/_design/items/_view/getItemsLength').on('data', function(data){
			itemSize +=data;
		}).on('end', function(){

			mdl.itemSize = Number(JSON.parse(itemSize).rows[0]['value']);

		if(req.query.skip){
			if(!isNaN(req.query.skip)){
		   		mdl.skip =  Number(req.query.skip);
			}else{
				mdl.skip= 0;
			}

		mdl.user = session.getAttribute('user');
				db.get('/electronix_items/_design/items/_view/getAllItems?skip=' + mdl.skip*10 + '&limit=10').on('error',function(){
		}).on('data', function(data){
		finalData += data;
		}).on('end', function(){
		   	mdl.items = JSON.parse(finalData).rows;
					db.get('/electronix_items/category').on('error',function(){
		}).on('data', function(data){
		categoryData += data;
		}).on('end', function(){
		   mdl.categories = JSON.parse(categoryData)['categories'];
			res.render('/web/panel_items.htm', mdl);
			return;
		});

		});
		return;
		}else{
		mdl.user = session.getAttribute('user');
				db.get('/electronix_items/_design/items/_view/getAllItems?skip=0&limit=10').on('error',function(){
		}).on('data', function(data){
		finalData += data;
		}).on('end', function(){
		   	mdl.items = JSON.parse(finalData).rows;
					db.get('/electronix_items/category').on('error',function(){
		}).on('data', function(data){
		categoryData += data;
		}).on('end', function(){
		   mdl.categories = JSON.parse(categoryData)['categories'];

		   mdl.skip = 0;
			res.render('/web/panel_items.htm', mdl);
			return;
		});

		});
		return;
		}

	});
	}else{
		mdl.errorMessage = "Access denied: you must login first!";
		res.render('/web/admin.htm',mdl);
	}


});

server.on('/panel_users', function(req, res){

		var mdl = {};
		var finalData = '';

	if(session.getAttribute('user')){

		var userSize = '';
		db.get('/electronix_users/_design/users/_view/getUsersLength').on('data', function(data){
			userSize +=data;
		}).on('end', function(){

			mdl.userSize = Number(JSON.parse(userSize).rows[0]['value']);

		if(req.query.skip){

			if(!isNaN(req.query.skip)){
		   		mdl.skip =  Number(req.query.skip);
			}else{
				mdl.skip= 0;
			}

		mdl.user = session.getAttribute('user');
				db.get('/electronix_users/_design/user/_view/getUserByUsername?skip=' + mdl.skip*10 + '&limit=10').on('error',function(){
		}).on('data', function(data){
		finalData += data;
		}).on('end', function(){
		   	mdl.users = JSON.parse(finalData).rows;

			res.render('/web/panel_users.htm', mdl);
			return;
		});

		}
		else{

		mdl.user = session.getAttribute('user');
				db.get('/electronix_users/_design/user/_view/getUserByUsername?skip=0&limit=10').on('error',function(){
		}).on('data', function(data){
		finalData += data;
		}).on('end', function(){
		   	mdl.users = JSON.parse(finalData).rows;
		   	mdl.skip= 0;
			res.render('/web/panel_users.htm', mdl);
			return;
		});
		return;
		}

		});
		

	}else{
		mdl.errorMessage = "Access denied: you must login first!";
		res.render('/web/admin.htm',mdl);
	}

});

server.on('/panel_about', function(req, res){

		var mdl = {};
		var finalData = '';

	if(session.getAttribute('user')){
		if(req.query.newCategory){

		}
		mdl.user = session.getAttribute('user');
				db.get('/electronix_items/about').on('error',function(){
		}).on('data', function(data){
		finalData += data;
		}).on('end', function(){
		   mdl.about = JSON.parse(finalData);

			res.render('/web/panel_about.htm', mdl);
			return;
		});
		return;
	}else{
		mdl.errorMessage = "Access denied: you must login first!";
		res.render('/web/admin.htm',mdl);
	}


});
/*Rooting code goes here*/