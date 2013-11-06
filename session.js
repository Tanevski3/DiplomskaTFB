var _session = {};

var session = {

	setAttribute: function(name, value){

	if(_session){

		if( (name && name !== 'undefined') && (value && value !== 'undefined') ){
			if(!_session.hasOwnProperty(name)){
				this.__defineGetter__(name, function(){
        			return this[name];
    			});
				this.__defineSetter__(name, function(value){
    				this[name] = value;
				});
			_session[name] = value;
			}
		}

	}else
		return null;

	},

	getAttribute: function(name){

	if(_session){
		if(name && name !== 'undefined'){
			if(_session.hasOwnProperty(name)){
				/*this.__defineGetter__(name, function(){
        			return this[name];
    			});*/
				return _session[name];
			}
			else
				return null;
			}
		else
			return null;
	}else
		return null;
	
	},

	removeAttribute: function(name){

	if(_session){

		if(name !== 'undefined'){
			if(_session.hasOwnproperty(name)){
				delete this[name];
				delete _session[name];
		}
		else
			return null;
		}
		else
			return null;
	}
	else
		return null;
	},

	clear: function(){

		for(var sess in _session){
				delete this[sess];
				delete _session[sess];
		}
		//_session = null;
	}

};

module.exports = session;

/*function(_sessionTimeout){
	var currentDate = new Date().getMilliseconds()/1000;

}*/
