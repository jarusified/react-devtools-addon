var js = (
  "Object.defineProperty(" +
    "window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {value: {" +
      "inject: function(runtime) { this._reactRuntime = runtime; }," +
      "getSelectedInstance: null," +
      "Overlay: null" +
    "}}" +
  ")"
);

var script = document.createElement('script');
script.textContent =js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

document.addEventListener("DOMContentLoaded",function(event){
	if(!(typeof React == 'object' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != 'undefined')){
		self.postMessage("react");
		console.log('sdf');
		ReactInternals = __REACT_DEVTOOLS_GLOBAL_HOOK__._reactRuntime;
		console.log(ReactInternals.mount);

	}
	else{
		console.log("not react");
	}	
});
