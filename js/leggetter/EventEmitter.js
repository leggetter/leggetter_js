leggetter.namespace("leggetter");

leggetter.EventEmitter = function() {
  this._listeners = {}
};

leggetter.EventEmitter.prototype.bind = function(eventName, handler) {
  if(!this._listeners[eventName]){
    this._listeners[eventName] = [];
  }
  this._listeners[eventName].push(handler);
};

leggetter.EventEmitter.prototype.trigger = function(eventName) {
  var args = Array.prototype.slice.call(arguments);
  args = args.slice(1);
  var listeners = this._listeners[eventName];
  for(var i = 0, l = listeners.length; i < l; ++i) {
    try {
      var listener = listeners[i];
      listener.apply(listener, args);
    }
    catch(e) {
      if(console){
        console.log("Error in Event listener: " + e);
      }
    }
  }
};