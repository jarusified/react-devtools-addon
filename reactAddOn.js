const { Class } = require("sdk/core/heritage");
const self      = require("sdk/self");
const tabs      = require('reactAddOnPanel');
var Promise = require("sdk/core/promise.js");


exports.devtoolTabDefinition ={
  	id: "React-Devtool",
    url: self.data.url("index.html"),
    label: "React",
    tooltip: "React Devtools",

    isTargetSupported: function(target) {
      return target.isLocalTab;
    },

    build: function(iframeWindow, toolbox) {
      console.log("building");
      var reactDevtools = ReactDevtools.initialize(iframeWindow, toolbox);
      return Promise.resolve(ReactDevtools);
    }
};


let reactDevtools = Class({
	initialize: function(iframeWindow,toolbox){
		console.log("initiate");
		this.iframeParent = iframeWindow;
		this.iframeWindow = iframeWindow.document.querySelector("iframe");
		this.toolbox      = toolbox;
		this.targetTabId = tabs.activeTab.id;


    	this._onTargetTabLoad = this._handleTargetTabLoad.bind(this);
    	tabs.on("reactAttach", this._onTargetTabLoad);

    	tabs.attachExistentWorkersByTabId(tabs.activeTab.id);

    	return this;
	},
	destroy: function () {
    	console.log("destroy");
    	tabs.removeListener("reactAttach", this._onTargetTabLoad);
  	},
  	 _handleTargetTabLoad: function({ tabId: tabId, worker: worker }) {
    	if (this.targetTabId !== tabId) {
      		return;
    	}

    	tabs.sendToWorkersByTabId(tabId, "injectReactDebug", null);

    	this.iframeWindow.contentWindow.location.reload(true);
  	},
	_sendToTargetTab: function(msg) {

    	this.mqTargetTab = this.mqTargetTab || [];

	    if (msg) {
    	  this.mqTargetTab.push(msg);
    	}

    	if (tabs.hasWorkersByTabId(this.targetTabId)) {
      		let nextMsg;
      		while ((nextMsg = this.mqTargetTab.shift())) {
        		tabs.sendToWorkersByTabId(this.targetTabId, "reactDevTool", nextMsg);
      		}
    	}
  	}
});


