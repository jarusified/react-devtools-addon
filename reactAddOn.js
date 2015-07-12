"use strict";

try { Cu.import("resource://gre/modules/commonjs/promise/core.js"); } catch(e) {}
try { Cu.import("resource://gre/modules/commonjs/sdk/core/promise.js"); } catch(e) {}


const { Cu } = require("chrome");
const { gDevtools } = Cu.import("resource:///modules/devtools/gDevTools.jsm");
const self = require("sdk/self");
var tabs = require("sdk/tabs");
var workers = require("sdk/content/worker");
var Promise = require("sdk/core/promise");
var ReactDevtools = require('./reactAddOnPanel');


var devtoolTabDefinition ={
  id: "React-Devtool",
    url: self.data.url("index.html"),
    label: "React",
    tooltip: "React Devtools",

    isTargetSupported: function(target) {
      return target.isLocalTab;
    },

    build: function(iframeWindow, toolbox) {
      console.log("building");
      ReactDevtools.initialize(iframeWindow, toolbox);
      return Promise.resolve(ReactDevtools);
    }
};


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
	},
	onToolboxReady: function(event,toolbox){
		console.log("asd");
		gDevTools.registerTool(devtoolTabDefinition);
	},
	onToolboxDestroy:function(event,target){
		gDevTools.unregisterTool(devtoolTabDefinition);
	},
	onToolboxClosed:function(event,target){
		gDevTools.unregisterTool(devtoolTabDefinition);
	}
}



exports.reactAddOn=reactAddOn;