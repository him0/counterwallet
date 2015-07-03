// Initiallize
globals = Alloy.Globals;
globals.windows = new Array();
globals.requires = new Array();

/*
On iOS, all relative paths are currently interpreted as relative to the Resources directory,
not to the current context. This is a known issue that will be addressed in a future release.
http://docs.appcelerator.com/titanium/3.0/#!/api/Titanium.Filesystem
*/
/*
var w = Ti.Filesystem.getFile('window').getDirectoryListing();
for( var i = 0; i < w.length; i++ ){
	var file = w[i].substr(0, w[i].indexOf('.'));
	globals.windows[file] = require('window/' + file);
}

var r = Ti.Filesystem.getFile('require').getDirectoryListing();
for( var i = 0; i < r.length; i++ ){
	var file = r[i].substr(0, r[i].indexOf('.'));
	globals.requires[file] = require('require/' + file);
}
*/
var w = new Array(
	'assetholders.js',
	'assetinfo.js',
	'createtoken.js',
	'history.js',
	'login.js',
	'newwallet.js',
	'order.js',
	'receive.js',
	'send.js',
	'settings.js',
	'top.js',
	'webview.js'
);
for( var i = 0; i < w.length; i++ ){
	var file = w[i].substr(0, w[i].indexOf('.'));
	globals.windows[file] = require('window/' + file);
}
var r = new Array(
	'auth.js',
	'bitcore.js',
	'cache.js',
	'inputverify.js',
	'layer.js',
	'network.js',
	'tiker.js',
	'util.js',
	'webview.js'
);
for( var i = 0; i < r.length; i++ ){
	var file = r[i].substr(0, r[i].indexOf('.'));
	globals.requires[file] = require('require/' + file);
}

var_dump = function(_var, _level) {
	var dumped_text = "";
	if(!_level) _level = 0;
	var level_padding = "";
	for(var j=0; j<_level+1; j++) level_padding += "    ";
	if(typeof(_var) == 'object'){
	    for(var item in _var){
			var value = _var[item];
			if(typeof(value) == 'object') {
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += var_dump(value, _level+1);
			} else {
				dumped_text += level_padding +"'"+ item +"' => \""+ value +"\"\n";
			}
		}
  	}
  	else dumped_text = "===>"+ _var +"<===("+ typeof(_var) +")";
	return dumped_text;
};

String.prototype.format = function(arg){
    var rep_fn = null;
    if( typeof arg == 'object' ) rep_fn = function(m, k) { return arg[k]; }; else { var args = arguments; rep_fn = function(m, k) { return args[ parseInt(k) ]; }; }
    return this.replace( /\{(\w+)\}/g, rep_fn );
};

Number.prototype.toFixed2 = function(){
	return this.toFixed(10).replace(/0+$/, '').replace(/\.$/, '');
};