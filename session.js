/*var session_fs =  require('fs');*/

var _session = {};
/*var _roles = [ 'admin', 'user' ];
var _sessionTimeout = 300;*/

/*function User(val){
    var value = val;
   	var role = 'user';

    this.__defineGetter__("value", function(){
        return value;
    });
   
    this.__defineSetter__("value", function(val){
        value = val;
    });

    this.__defineGetter__("role", function(){
        return role;
    });
   
    this.__defineSetter__("role", function(val){
        value = val;
    });
};*/
var session = {

	/*users = [],

	roles = {
		admin: 'admin',
		user:  'user'
	},*/

	setAttribute: function(name, value){
		if(name !== 'undefined' && value !== 'undefined'){
			if(!_session.hasOwnproperty(name)){
				this.__defineSetter__(name, function(value){
    				this[name] = value;
				});
			_session[name] = value;
			}
		}
	},

	getAttribute: function(name){
		if(name !== 'undefined'){
			if(_session.hasOwnproperty(name)){
				this.__defineGetter__(name, function(){
        			return this[name];
    			});
				return _session[name];
			}
			else
				return null;
			}
		else
			return null;
	},

	removeAttribute: function(name){
		if(name !== 'undefined'){
			if(_session.hasOwnproperty(name)){
				delete this[name];
				delete _session[name];
		}
		else
			return null;
		}
		else
			return null
	},

	clear: function(){
		_session = null;
	}

};

module.exports = session;

/*function(_sessionTimeout){
	var currentDate = new Date().getMilliseconds()/1000;

}*/
