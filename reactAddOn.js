"use strict";

const { Cu } = require("chrome");
const { gDevtools } = Cu.import("resource:///modules/devtools/gDevTools.jsm");

var reactAddOn ={
	initialize: function(options){
		gDevTools.on("toolbox-ready", this.onToolboxReady);
    	gDevTools.on("toolbox-destroy", this.onToolboxDestroy);
    	gDevTools.on("toolbox-destroyed", this.onToolboxClosed);
	},
	shutdown: function(reason){
		gDevTools.off("toolbox-ready", this.onToolboxReady);
    	gDevTools.off("toolbox-destroy", this.onToolboxDestroy);
    	gDevTools.off("toolbox-destroyed", this.onToolboxClosed);
	}
}

exports.reactAddOn=reactAddOn;