"use strict";

const { reactAddOn } = require('./reactAddOn');
const { reactPanel } = require('./reactAddOnPanel');

exports.start=function start(options,callback){
	reactAddOn.initialize.apply(reactAddOn, [options]);
}

exports.onUnload = function onUnload(reason){
	reactAddOn.shutdown(reason);
}


