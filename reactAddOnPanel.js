"use strict";

const { Cu, Ci } = require("chrome");
const { Panel } = require("dev/panel");
const { Class } = require("sdk/core/heritage");
const { Tool } = require("dev/toolbox");

var tabs  = require("sdk/tabs");
var mod   = require("sdk/page-mod");
var self  = require("sdk/self");

const ReactPanel = Class({
  extends: Panel,

  label: "React",
  tooltip: "My panel tooltip",
  icon: "./icon-16.png",
  url: "./index.html",

  initialize: function(options) {
    console.log("there there");

  },

  dispose: function() {
    console.log("MyPanel.destroy " + this.debuggee);
    this.debuggee=null;
    console.log("MyPanel.destroy " + this.debuggee);

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

var pageMod = mod.PageMod({
  include: "*",
  contentScriptFile: self.data.url("inspector.js"),
  contentScriptWhen: "ready",
  onMessage: function(contentScriptMessage){
  	if(contentScriptMessage=="react"){
  		const ReactTool = new Tool({
  			name: "ReactTool",
  			panels: {
    			myPanel: ReactPanel
  			},
      });
  	}
  }
});


