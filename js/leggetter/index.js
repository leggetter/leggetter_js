if(typeof leggetter === "undefined"){
  leggetter = {};
}

leggetter.namespace = function(namespace) {
  var parts = namespace.split(".");
  var context = window;
  for(var i = 0, l = parts.length; i < l; ++i) {
    var name = parts[i];
    if(!context[name]) {
      context[name] = {};      
    }
    context = context[name];
  }
  return context;
};

leggetter._loadedDependencies = {};

leggetter.depends = function(dependencies) {
  // for(var i = 0, l = dependencies.length; i < l; ++i) {
  //     leggetter._checkDependencyLoaded( dependencies[i] );
  //   }
};

// leggetter._checkDependencyLoaded = function(dependency) {
//   if(dependency.src && !leggetter._loadedDependencies[dependency.src]) {
//     // for xhtml+xml served content, fall back to DOM methods
//     if(!dependency.type || dependency.type == "text/javascript") {
//       var script = document.createElement('script');
//       script.type = 'text/javascript';
//       script.src = dependency.src;
//       document.getElementsByTagName('head')[0].appendChild(script);
//     } else {
//       var style = document.createElement('link');
//       style.rel = 'stylesheet';
//       style.href = dependency.src;
//       document.getElementsByTagName('head')[0].appendChild(style);
//     }
//     leggetter._loadedDependencies[dependency.src] = dependency;
//   }
// };

leggetter.extend = function(subclass, superclass){
    var firstInheritance = true;

    // see if the base classes prototype is currently empty
    for (var x in subclass.prototype) {
        firstInheritance = false;
        break;
    }

    if (firstInheritance) {
        // single inheritance
        var intermediateClass = new Function();

        // instead of inheriting directly from the super class and causing the constructor to be fired with zero
        // arguments, we use an intermediate class with the same prototype as the super class so that the object
        // constructor is avoided altogether
        intermediateClass.prototype = superclass.prototype;
        subclass["prototype"] = new intermediateClass(); // don't use fSubClass.prototype to keep jsdoc happy
    }
    else {
        // multiple inheritance
        for (x in superclass.prototype) {
            subclass.prototype[x] = superclass.prototype[x];
        }
    }
};