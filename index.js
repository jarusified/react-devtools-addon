var { Cu, Cc, Ci } = require("chrome");
const { devtoolTabDefinition } = require('./reactAddOn');
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

XPCOMUtils.defineLazyModuleGetter(this, "gDevTools","resource:///modules/devtools/gDevTools.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "gDevToolsBrowser","resource:///modules/devtools/gDevTools.jsm");

startup();

function startup(){
	gDevTools.registerTool(devtoolTabDefinition);
}

function shutdown(){
	gDevTools.unregisterTool(devtoolTabDefinition);
}

exports.onUnLoad = function(){
	shutdown();
}