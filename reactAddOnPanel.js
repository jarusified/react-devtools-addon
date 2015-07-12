"use strict";

const { Cu, Ci } = require("chrome");
const { Panel } = require("dev/panel");
const { Class } = require("sdk/core/heritage");
const { Tool } = require("dev/toolbox");

var tabs  = require("sdk/tabs");
var mod   = require("sdk/page-mod");
var self  = require("sdk/self");
var index = require("./index");


let ReactDevtools = {
  initialize: function (iframeWindow, toolbox) {
    console.debug("initialize");
    this.iframeWindow = iframeWindow.document.querySelector("iframe");
    this.toolbox = toolbox;

    this.iframeWindow.setAttribute("src", self.data.url("data/index.html"));
  },
    
  destroy : function() {
    log('destroyin...');
    this.iframeWindow.setAttribute('src', 'about:blank');
  }   
};
// test url 

var pageMod = mod.PageMod({
  include: "*",
  contentScriptFile: self.data.url("inspector.js"),
  contentScriptWhen: "ready",
  onMessage: function(contentScriptMessage){
  	if(contentScriptMessage=="react"){
      index.start();
  	}
  }
});


