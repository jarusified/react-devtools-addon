"use strict";

const { Cu, Ci } = require("chrome");
const { Panel } = require("dev/panel.js");
const { Class } = require("sdk/core/heritage");
const { Tool } = require("dev/toolbox");

var tabs  = require("sdk/tabs");
var mod   = require("sdk/page-mod");
var self  = require("sdk/self");

const ReactPanel = Class(
{
  extends: Panel,

  label: "React",
  tooltip: "My panel tooltip",
  icon: "./icon-16.png",
  url: "./index.html",

  initialize: function(options) {

  },

  dispose: function() {

  },

  setup: function(options) {
    console.log("MyPanel.setup" + options.debuggee);

    this.debuggee = options.debuggee;

  },

  onReady: function() {
    console.log("MyPanel.onReady " + this.debuggee);
  }
});
// test url 
var pageUrl = self.data.url("https://facebook.github.io/react/");

var pageMod = mod.PageMod({
  include: pageUrl,
  contentScriptFile: self.data.url("inspector.js"),
  onMessage: function(contentScriptMessage){
  	//detect the react environment 
  	if(contentScriptMessage=="react"){
  		const ReactTool = new Tool({
  			name: "ReactTool",
  			panels: {
    			myPanel: ReactPanel
  			}	
		});
  	}
  }
});


tabs.open(pageUrl);