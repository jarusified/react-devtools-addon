Object.defineProperty(window,'__REACT_DEVTOOLS_GLOBAL_HOOK__',{
	value:{
		inject: function(runtime) {
			this._reactRuntime=runtime;
		},
		getSelectedInstance: null,
		Overlay:null
	}
});

document.addEventListener("DOMContentLoaded",function(event){
	if((typeof React == 'object' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != 'undefined')){
		self.postMessage("react");
		ReactInternals = __REACT_DEVTOOLS_GLOBAL_HOOK__._reactRuntime;
		console.log("react");

	}
	else{
		console.log("not react");
	}	
});
