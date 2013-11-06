// module requests
var http = require('http'),
qs = require('querystring'),
url = require('url'),
fs = require('fs'),
events = require ('events'),
dmn = require('domain'),
sesn = require('./session.js');
// module requests

// fields
var server = http.createServer();
var configFile;
var config;
var replied = false; // used to stop propagation in domains
// fields

module.exports = new events.EventEmitter();

module.exports.init = function(){

// Javascript subsets
JSON.__proto__.tryParse = function(string){ 

	var result;
	try{
	result = JSON.parse(string);
	}
	catch(err){
	result = null;
	}

	return result;
};

String.__proto__.contains = function(substring){

	if(substring !== 'undefined' && substring !== null){
		if(this !== '' && substring !== ''){
			if(this.indexOf(substring)!== -1)
				return true;
			else
				return false
		}else{
			return false;
		}
	}else{
		return false;
	}
}

String.__proto__.isEmpty = function(){

	if(this !== 'undefined' && this !== null){
		if(this !== ''){
				return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

// Javascript subsets

// functions
function isUndefinedOrNull(object){
	if(object === 'undefined' || object == null )
		return true;
	else 
		return false;
}
function validateConfig(cfg){

var valid = false; // used for overall validation

if(!isUndefinedOrNull(cfg)){

console.log('**Validation of configuration started**');

	if(cfg.hasOwnProperty('publicWebFolder')){
		
			if(cfg['publicWebFolder'].length > 0){
				if(/^\/|^..*/.test(cfg['publicWebFolder']) === true){
					valid = true;
					console.log('publicWebFolder validation: OK!');
				}
				else{
					valid = false;
					console.log('publicWebFolder validation: the value does not match the format. E.g. \'/web\' .');
				}
			}else{
				valid = false;
				console.log('publicWebFolder validation: no value could be read.');
			}

	}else{
		valid = false;
		console.log('publicWebFolder validation: such property could not be found');
	}
	if(cfg.hasOwnProperty('favicon')){

			if(cfg['favicon'].length > 0){
				if(/^.*\.ico$/.test(cfg['favicon']) === true){
					valid = true;
					console.log('favicon validation: OK!');
				}
				else{
					valid = false;
					console.log('favicon validation: the value does not match the format. E.g. \'/web/favicon.ico\' .');
				}
			}else{
				valid = false;
				console.log('favicon validation: no value could be read.');
			}
	}else{
		valid = false;
		console.log('favicon validation: such property could not be found.');
	}
	if(cfg.hasOwnProperty('page404')){

			if(cfg['page404'].length > 0){
				if(/^.*\.htm$/.test(cfg['page404']) === true){ //htm for now only but should change
					valid = true;
					console.log('page404 validation: OK!');
				}
				else{
					valid = false;
					console.log('page404 validation: the value does not match the format. E.g. \'/page404.htm\' .');
				}
			}else{
				valid = false;
				console.log('page404 validation: no value could be read.');
			}
	}else{
		valid = false;
		console.log('page404 validation: such property could not be found.');
	}
	if(!isUndefinedOrNull(cfg.session)){

      	if(cfg.session.hasOwnProperty('timeout')){

      		if(cfg.session['timeout'] > 0  && cfg.session['timeout'] < 60){
      			valid = true;
      			console.log('session.timeout validation: OK!');
      		}else{
      			valid = false;
      			console.log('session.timeout validation: value must be beetwen 1min - 59min.');
      		}

      }else{
      		valid = false;
      		console.log('session.timeout validation: such property could not be found.');
      }

	}else{
		valid = false;
		console.log('session validation: such property could not be found.');
	}
	
	if(cfg.hasOwnProperty('port')){

			if(cfg['port'].length > 0){
				if(/^\d{1,7}$/.test(cfg['port']) === true){
					valid = true;
					console.log('port validation: OK!');
				}
				else{
					valid = false;
					console.log('port validation: the value does not match the format. E.g. \'4040\' . ');
				}
			}else{
				valid = false;
				console.log('port validation: no value could be read.');
			}
	}else{
		valid = false;
		console.log('port validation: such property could not be found.');
	}

	if(cfg.hasOwnProperty('hostname')){

			if(cfg['hostname'].length > 0){
				if(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(cfg['hostname']) === true){
					valid = true;
					console.log('hostname validation: OK!');
				}
				else{
					valid = false;
					console.log('hostname validation: the value does not match the format. E.g. \'127.0.0.1\' . ');
				}
			}else{
				valid = false;
				console.log('hostname validation: no value could be read.');
			}
	}else{
		valid = false;
		console.log('hostname validation: such property could not be found.');
	}

	if(!isUndefinedOrNull(cfg.couchDb)){

      	if(cfg.couchDb.hasOwnProperty('hostname')){

      		if(cfg.couchDb['hostname'].length > 0){
      			if(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(cfg.couchDb['hostname']) === true){
					valid = true;
					console.log('couchDb.hostname validation: OK!');
				}
				else{
					valid = false;
					console.log('couchDb.hostname validation: the value does not match the format. E.g. \'127.0.0.1\' . ');
				}
      		}else{
      			valid = false;
      			console.log('couchDb.hostname validation: no value could be read.');
      		}

      }else{
      		valid = false;
      		console.log('couchDb.hostname validation: such property could not be found.');
      }

      if(cfg.couchDb.hasOwnProperty('port')){

      		if(cfg.couchDb['port'] > 0){
					valid = true;
					console.log('couchDb.port validation: OK!');
      		}else{
      			valid = false;
      			console.log('couchDb.port validation: no value could be read.');
      		}

      }else{
      		valid = false;
      		console.log('couchDb.port validation: such property could not be found.');
      }

      if(cfg.couchDb.hasOwnProperty('user')){

      		if(cfg.couchDb['user'].length > 0){
					valid = true;
					console.log('couchDb.user validation: OK!');
      		}else{
      			valid = false;
      			console.log('couchDb.user validation: no value could be read.');
      		}

      }else{
      		valid = false;
      		console.log('couchDb.user validation: such property could not be found.');
      }

      if(cfg.couchDb.hasOwnProperty('pass')){

      		if(cfg.couchDb['pass'].length > 0){
					valid = true;
					console.log('couchDb.pass validation: OK!');
      		}else{
      			valid = false;
      			console.log('couchDb.pass validation: no value could be read.');
      		}

      }else{
      		valid = false;
      		console.log('couchDb.pass validation: such property could not be found.');
      }

	}else{
		valid = false;
		console.log('couchDb validation: such property could not be found.');
	}
}
	if(valid){
		console.log('**********Validation went OK!**********');
	}
	else{
		console.log('???Validation failed please see above log for more details.???\n Process will now exit.');
		process.exit(0);
	}
	return valid;
}
// functions

// configuration processing
try{
	configFile = fs.readFileSync(__dirname + '/config.json','utf-8');
}
catch(err){
	console.log('A problem occured while trying to read config.json. Check path (use relative).\n%s: %s. Process will now exit.', err.name, err.message);
	process.exit(0);
}finally{
	//TODO: close stream here
}

if(!isUndefinedOrNull(configFile)){
	try{
		config = JSON.parse(configFile);
	}catch(err){
		console.log('A problem occured while trying to parse config.json. Check if json is valid.\n%s: %s. Process will now exit.', err.name, err.message);
		process.exit(0);
	}
}else{
	console.log('Could not read from configuration file. \'config.json\' is nul or empty. Process will now exit.');
	process.exit(0);
}

if(isUndefinedOrNull(config)){
	console.log('Could not initialize configuration. \'config\' is null or undefined. Process will now exit.');
	process.exit(0);
}
else{

if(validateConfig(config) === true){

// session timeout
setTimeout(function(){
	sesn.clear();
	console.log('Session has just been cleared ' + new Date().toUTCString());
}, config.session.timeout*60*1000);
// session timeout

module.exports.session = sesn; // exporting session
module.exports.config = config; // exporting config


// initiate requests listening
server.on('request',function (_request, _response) {

var d = dmn.create(); // domain will be created on each request

d.add(_request); // add request
d.add(_response); // add response
// don't forget to stop propagation - response
replied = false;

d.on('error',function(err){ //stopping it here
		if(!replied){
			replied = true;
			_response.writeHead(500);
			_response.end(err.message);
		}
		else {
		console.log('Error message intercepted from domain:' + 
			'\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
			_response.writeHead(500);
			_response.end(err.message);
		}
});

d.run(function(){
try{
parsedUrl = url.parse(_request.url.toString(), false, true);
}catch(err){
	console.log('Error occured during the parsing of the url' + 
			'\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
}
var reqUrl = parsedUrl.pathname;

console.log(reqUrl);
  if(reqUrl){
	  
	 if(reqUrl.indexOf('.css') != -1){
	  	  var css = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
	  	if(css){
	  	  _response.writeHead({
	  		  'Content-Type': 'text/css'});
	  	  css.pipe(_response);
 	 }else{
 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
 	 }
	 }else if(reqUrl.indexOf('.js') != -1){
		 var js = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(js){
	  	  _response.writeHead({
	  		  'Content-Type': 'text/js'});
	  	  js.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }

	 }else if(reqUrl.indexOf('.png') != -1){
	     var png = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(png){
		     _response.writeHead(200, {'Content-Type': 'image/png' });
		     png.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }

	 }else if(reqUrl.indexOf('.gif') != -1){
	     var gif = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(gif){
		     _response.writeHead(200, {'Content-Type': 'image/gif' });
		     gif.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }
	 }else if(reqUrl.indexOf('.jpeg') != -1){
	     var jpeg = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(jpeg){
		     _response.writeHead(200, {'Content-Type': 'image/jpeg' });
		     jpeg.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }
	 }else if(reqUrl.indexOf('.jpg') != -1){
	     var jpg = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(jpg){
		     _response.writeHead(200, {'Content-Type': 'image/jpg' });
		     jpg.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }
	 }else if(reqUrl.indexOf('.ico') != -1 && reqUrl.indexOf('favicon.ico') === -1){
	     var ico = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(ico){
		     _response.writeHead(200, {'Content-Type': 'image/x-icon'});
		     ico.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }
	 }else if(reqUrl.indexOf('.otf') != -1){
	     var otf = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(otf){
		     _response.writeHead(200, {'Content-Type': 'font/opentype' });
		     otf.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }
	 }else if(reqUrl.indexOf('.eot') != -1){
	     var eot = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(eot){
		     _response.writeHead(200, {'Content-Type': 'application/vnd.ms-fontobject' });
		     eot.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }
	 }else if(reqUrl.indexOf('.svg') != -1){
	     var svg = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(svg){
		     _response.writeHead(200, {'Content-Type': 'image/svg+xml',
		    	 				  'Content-Encoding': 'gzip' });
		     svg.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }
	 }else if(reqUrl.indexOf('.ttf') != -1){
	     var ttf = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(ttf){
		     _response.writeHead(200, {'Content-Type': 'application/octet-stream'});
		     ttf.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }
	 }else if(reqUrl.indexOf('.woff') != -1){
	     var woff = fs.createReadStream(__dirname + config.publicWebFolder + reqUrl);
		 if(woff){
		     _response.writeHead(200, {'Content-Type': 'application/font-woff'});
		     woff.pipe(_response);
	 	 }else{
	 		 console.log('Could not read file from ' + __dirname + config.publicWebFolder + reqUrl);
	 	 }
	 }
	 else{
			   if(reqUrl.indexOf('favicon.ico') === -1){
  				   if(reqUrl.indexOf('.htm')){
  				   	reqUrl = reqUrl.replace(/\.html*/,'');
  				   }
			   	  _response.render = function(__path, __model){
			   	  	try{
			  		if(!(__path.indexOf('/') === 0 || __path.indexOf('\\') === 0))
			  			__path =  "/" + __path;
  					}
  					catch(err){
  						console.log('An error has occured during __path ' +
	    	  						'.\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
  					}


			  			fs.readFile(__dirname + __path,'utf-8', d.intercept(function(__data) {
	    	  				/*if(err){
	    	  					console.log('Can\'t read file ' + __dirname + __path);
	    	  					console.log(err);
	    	  					throw err;
	    	  				}*/

	    	  			if(!isUndefinedOrNull(__model)){

	    	  			var squirlies;

	    	  			function out(input){
	    	  				try{
	    	  					if(!isUndefinedOrNull(input)){
     								squirlies.push(/*JSON.stringify(*/input/*)*/); // using stringify to pretty print object
     							}
     						}
     						catch(err){
     							console.log('An error has occured during function out(input) execution ' +
	    	  						'.\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
  							}
						}
						try{
	    	  				for(var m in __model){
	    	  					try{
	    	  					
	    	  						var _stringifiedM = JSON.stringify(__model[m]);
	    	  						eval('var ' + m + ' = ' + _stringifiedM + ';');
	    	  					}
	    	  					catch(err){
	    	  						console.log('An error has occured during the parsing of __model[m]' +
	    	  									'.\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
	    	  					}
	    	  				}
	    	  			}
	    	  			catch(err){
	    	  				console.log('An error has occured during the iterating of __model' +
	    	  									'.\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
	    	  			}

	    	  			var doubleSquirlyBracketRegEx = /\{\{([\s\S]+?)\}\}/; // be carefull when using global flag - not all regexes are found
	    	  			var squirlyBrackets;
						try{
							while ((squirlyBrackets = doubleSquirlyBracketRegEx.exec(__data)) !== null)
							{

								squirlies = new Array();
								try{
								eval(squirlyBrackets[0]);
  									/*var msg = "Found " + squirlyBrackets[0] + ".  ";
  									msg += "Next match starts at " + doubleSquirlyBracketRegEx.lastIndex;
  									console.log(msg);*/
  								__data = __data.replace(squirlyBrackets[0],squirlies.join('\n'));
  								}
  								catch(err){
	    	  						console.log('An error has occured during the evaluation with the function eval() ' +
	    	  									'.\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
	    	  					}
							}
						}
						catch(err){
	    	  				console.log('An error has occured during the execution of the \'while\' executon doubleSquirlyBracketRegEx.exec(__data) ' +
	    	  									'.\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
	    	  			}

						}
	    	  			_response.writeHead(200, {'Content-Type': 'text/html'});
	    	  			_response.end(__data);
			  		}));
  
			   	  };

			   	try{
		 		_request.href = parsedUrl.href;
		 		_request.protocol = parsedUrl.protocol;
		 		_request.host = parsedUrl.host;
		 		_request.auth = parsedUrl.auth;
		 		_request.hostname = parsedUrl.hostname;
		 		_request.port = parsedUrl.port;
		 		_request.pathname = parsedUrl.pathname;
		 		_request.search = parsedUrl.search;
		 		_request.path = parsedUrl.path;
		 		_request.query = parsedUrl.query;
		 		_request.hash = parsedUrl.hash;
		 		_request.upload = new events.EventEmitter();
		 		_request.body = null;
		 		}
		 		catch(err){
	    	  				console.log('An error has occured during the assigning of request properties ' +
	    	  									'.\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
	    	  	}

		 		switch(_request.method.toUpperCase()){
		 			case 'GET':
		 				if(module.exports.emit(reqUrl, _request, _response) === false){

							fs.readFile(__dirname + config.page404, d.intercept(function(err, data) {
								if(err){
	    	  						console.log('An error has occured during the reading of file ' +
	    	  									'.\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
	    	  					}
								_response.writeHead(200, {'Content-Type': 'text/html'});
	    	  					_response.end(data);
			  				}));
						}
		 			break;
		 			case 'POST':
		 			//http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js

		 			if(_request.headers['content-type'].indexOf(';') === -1)
		 			    var contentTypes = _request.headers['content-type'].split(';');
		 			else
		 			    contentTypes = [ _request.headers['content-type'] ];

		 			if(contentTypes[0] && contentTypes[0]==='multipart/form-data'){
		 			    
		 			_request.on('data', d.intercept(function (__chunk) {

		 			    if(!isUndefinedOrNull(__chunk)){

		 			        _request.upload.emit('file', __chunk)

						    _request.upload.emit('progress', __chunk.length)
								}
						}));

					_request.on('end', d.intercept(function () {

        				_request.upload.emit('end', uploadedSize);

        			}));

		 			}// if
		 			else{

		 			var bodyData = '';
		 			_request.on('data', d.intercept(function (__chunk) {
		 			    
            			bodyData += __chunk;
           			 		// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            				if (bodyData.length > 1e6) { 
                				// FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                			console.log('FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST');
                			_request.connection.destroy();
            				}
        			})); // _request.on('data'...

        			_request.on('end', d.intercept(function () {
        				_request.body = qs.parse(bodyData);
            			// use POST
	     				module.exports.emit(reqUrl, _request, _response);
        			}));

        		    }//else
		 			break;
		 			default:
		 			    console.log(_request.method.toUpperCase() + ' is not handled yet!');
		 			break;
		 		}

		 }
		 else{
		 		var favicon = fs.createReadStream(__dirname + config.favicon);
		 		if(favicon){
		     		_response.writeHead(200, {'Content-Type': 'application/ico'});
		    	favicon.pipe(_response);
	 	 		}else{
	 		 		console.log('Could not read file from ' + __dirname + config.favicon);
	 	 		}
		 }
     }
  }
}); // d.run() function ends here

 }).listen(config.port, config.hostname);

console.log('['+new Date().toUTCString()+']: '
		+ 'Server started and running at %s:%s', config.hostname, config.port);

server.on('error',function(err){
	console.log('['+new Date().toUTCString()+']:' +
		'\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
});

module.exports.on('error', function(err){
	console.log('module.exports message intercepted:' + 
		'\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
});

process.on('uncaughtException',function(err){
	console.log('uncaughtException intercepted:' + 
		'\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
});

}// configuration processing
else{
	console.log('Configuration validation resulted in failure process will now exit.');
	process.exit(0);
}

}


config.couchDb.delete = function(__pathToDocument){
var __deleteDbEmitter = {};

    if( !isUndefinedOrNull(__pathToDocument)){

    var __final = '';
	var __deleteDbEmitter = new events.EventEmitter();

        var options = {  
        host: config.couchDb.hostname,
        port: config.couchDb.port,
        path: __pathToDocument,
        auth: config.couchDb.user +':' + config.couchDb.pass,
        headers: { "Content-Type": "application/json"},
        method: 'GET' 
        };   
        http.get(options, function(_putRes) {  
            _deleteRes.setEncoding('utf-8');
            console.log("Got response from database with code: " + _deleteRes.statusCode + ' and headers '+ JSON.stringify(_deleteRes.headers) +'\n');
            _deleteRes.on('error', function(err){
            	__deleteDbEmitter.emit('error', err);
            }).on('data', function(__chunk){
            	__deleteDbEmitter.emit('data', __chunk);
            }).on('end',function(){
            	__deleteDbEmitter.emit('end');
            });   
        });

        return __deleteDbEmitter;  

}
		return null;
};

config.couchDb.post = function(__postData,__pathToDocument){
 var __postDbEmitter = {};

    if( !isUndefinedOrNull(__pathToDocument)){

    var __final = '';
	var __postDbEmitter = new events.EventEmitter();

        var options = {  
        host: config.couchDb.hostname,
        port: config.couchDb.port,
        path: __pathToDocument,
        auth: config.couchDb.user +':' + config.couchDb.pass,
        headers: { "Content-Type": "application/json"},
        method: 'GET' 
        };   
        http.get(options, function(_putRes) {  
            _postRes.setEncoding('utf-8');
            console.log("Got response from database with code: " + _postRes.statusCode + ' and headers '+ JSON.stringify(_postRes.headers) +'\n');
            _postRes.on('error', function(err){
            	__postDbEmitter.emit('error', err);
            }).on('data', function(__chunk){
            	__postDbEmitter.emit('data', __chunk);
            }).on('end',function(){
            	__postDbEmitter.emit('end');
            });   
        });

        return __postDbEmitter;  

}
		return null;
};

config.couchDb.put = function(__postData,__pathToDocument){

    var __putDbEmitter = {};

    if( !isUndefinedOrNull(__pathToDocument)){

    var __final = '';
	var __putDbEmitter = new events.EventEmitter();

        var options = {  
        host: config.couchDb.hostname,
        port: config.couchDb.port,
        path: __pathToDocument,
        auth: config.couchDb.user +':' + config.couchDb.pass,
        headers: { "Content-Type": "application/json"},
        method: 'GET' 
        };   
        http.get(options, function(_putRes) {  
            _putRes.setEncoding('utf-8');
            console.log("Got response from database with code: " + _putRes.statusCode + ' and headers '+ JSON.stringify(_putRes.headers) +'\n');
            _putRes.on('error', function(err){
            	__putDbEmitter.emit('error', err);
            }).on('data', function(__chunk){
            	__putDbEmitter.emit('data', __chunk);
            }).on('end',function(){
            	__putDbEmitter.emit('end');
            });   
        });

        return __putDbEmitter;  

}
		return null;
};

config.couchDb.get = function(__pathToDocument){

    var __getDbEmitter = {};

    if( !isUndefinedOrNull(__pathToDocument)){

    var __final = '';
	var __getDbEmitter = new events.EventEmitter();

        var options = {  
        host: config.couchDb.hostname,
        port: config.couchDb.port,
        path: __pathToDocument,
        auth: config.couchDb.user +':' + config.couchDb.pass,
        headers: { "Content-Type": "application/json"},
        method: 'GET' 
        };   
        http.get(options, function(_getRes) {  
            _getRes.setEncoding('utf-8');
            console.log("Got response from database with code: " + _getRes.statusCode + ' and headers '+ JSON.stringify(_getRes.headers) +'\n');
            _getRes.on('error', function(err){
            	__getDbEmitter.emit('error', err);
            }).on('data', function(__chunk){
            	__getDbEmitter.emit('data', __chunk);
            }).on('end',function(){
            	__getDbEmitter.emit('end');
            });   
        });

        return __getDbEmitter;  

}
		return null;
};

module.exports.couchDb = config.couchDb;
}; // module.exports ends here