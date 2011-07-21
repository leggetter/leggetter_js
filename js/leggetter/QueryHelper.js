leggetter.namespace("leggetter");

leggetter.QueryHelper = function() {
  this._query;
};
/** @private */
leggetter.QueryHelper._instance = null;

leggetter.QueryHelper.getInstance = function(){
  if( leggetter.QueryHelper._instance === null ) {
    leggetter.QueryHelper._instance = new leggetter.QueryHelper();
  }
  return leggetter.QueryHelper._instance;
};

leggetter.QueryHelper.prototype.getQueryValue = function(name, defaultValue) {
	if(this._query === undefined) {
		var i;
		var param;
		var params = document.location.search.split("&");
		params[0] = params[0].substring(1, params[0].length);
		var nameValues = {};
		for(i = 0, l = params.length; i < l; i=i+1) {
			param = params[i].split("=");
			nameValues[ param[0] ] = param[1];
		}

		this._query = nameValues;
	}
	var value = this._query[name];
	return (value?value:defaultValue);
};