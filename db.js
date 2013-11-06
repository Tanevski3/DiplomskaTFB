/*Database operations go here*/
// configuration processing

// database manipulation
config.couchDb.delete = function(__pathToDocument, __callbackResult){

    var d = dmn.create();
    d.on('error', function(err){
        console.log('Error message intercepted from domain: %s: %s.', err.name, err.message);
    });

    d.run(function(){

    if( !isUndefinedOrNull(__pathToDocument) && !isUndefinedOrNull(__callbackResult) ){

        var options = {  
        host: config.couchDb.hostname,
        port: config.couchDb.port,
        path: __pathToDocument,
        auth: config.couchDb.user +':' + config.couchDb.pass,
        headers: { "Content-Type": "application/json"},
        method: 'DELETE' 
      };   
        var _deleteReq = http.get(options, function(_deleteRes) {  
            _deleteRes.setEncoding('utf-8');
            console.log("Got response from database with code: " + _deleteRes.statusCode + ' and headers '+ JSON.stringify(_deleteRes.headers) +'\n');   
            _deleteRes.on('data', __callbackResult );   
        }).on('error', function(e) {  
            console.log("Got error: " + e.message);   
        }); 

       }

    });

};

config.couchDb.post = function(__postData,__pathToDocument, __callbackResult){


    var d = dmn.create();
    d.on('error', function(err){
        console.log('Error message intercepted from domain:' + 
            '\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
    });

    d.run(function(){

    if( !isUndefinedOrNull(__postData) && !isUndefinedOrNull(__callbackResult) && !isUndefinedOrNull(__postData) ){
        __postData = querystring.stringify(__postData);

        var options = {  
        host: config.couchDb.hostname,
        port: config.couchDb.port,
        path: __pathToDocument,
        auth: config.couchDb.user +':' + config.couchDb.pass,
        headers: { "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": __postData.length },
        method: 'POST' 
      };   
        var _postReq = http.get(options, function(_postRes) {  
            _postRes.setEncoding('utf-8');
            console.log("Got response from database with code: " + _postRes.statusCode + ' and headers '+ JSON.stringify(_postRes.headers) +'\n');   
            _postRes.on('data', __callbackResult );   
        }).on('error', function(e) {  
            console.log("Got error: " + e.message);   
        }); 

        // post the data
        _postReq.write(__postData);
        _postReq.end();

       }

    });

};

config.couchDb.put = function(__postData,__pathToDocument, __callbackResult){

    var d = dmn.create();
    d.on('error', function(err){
        console.log('Error message intercepted from domain:' + 
            '\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
    });

    d.run(function(){

    if(!isUndefinedOrNull(__postData) && !isUndefinedOrNull(__pathToDocument) && !isUndefinedOrNull(__callbackResult) ){
        __postData = querystring.stringify(__postData);

        var options = {  
        host: config.couchDb.hostname,
        port: config.couchDb.port,
        path: __pathToDocument,
        auth: config.couchDb.user +':' + config.couchDb.pass,
        headers: { "Content-Type": "application/json"},
        method: 'PUT' 
      };   
        var _putReq = http.get(options, function(_putRes) {  
            _putRes.setEncoding('utf-8');
            console.log("Got response from database with code: " + _putRes.statusCode + ' and headers '+ JSON.stringify(_putRes.headers) +'\n');   
            _putRes.on('data', __callbackResult );   
        }).on('error', function(e) {  
            console.log("Got error: " + e.message);   
        }); 

        // post the data
        _putReq.write(__postData);
        _putReq.end();

       }

    });

};

config.couchDb.get = function(__pathToDocument, __callbackResult){

    if( !isUndefinedOrNull(__pathToDocument) && !isUndefinedOrNull(__callbackResult) ){
    var _getReq = {};
    var d = dmn.create();
    var __final = '';
    d.on('error', function(err){
        console.log('Error message intercepted from domain:' + 
            '\n %s: %s. \nFile: %s.\nCaller: %s.\nLine number: %s',err.name, err.message, err.fileName,err.caller, err.lineNumber);
    });

    d.run(function(){

        var options = {  
        host: config.couchDb.hostname,
        port: config.couchDb.port,
        path: __pathToDocument,
        auth: config.couchDb.user +':' + config.couchDb.pass,
        headers: { "Content-Type": "application/json"},
        method: 'GET' 
        };   
        _getReq = http.get(options, function(_getRes) {  
            _getRes.setEncoding('utf-8');
            console.log("Got response from database with code: " + _getRes.statusCode + ' and headers '+ JSON.stringify(_getRes.headers) +'\n');
            return _getRes;      
       });


});
    
}
    return _getReq;
};

module.exports.couchDb = config.couchDb;
// database manipulation
/*Database operations go here*/