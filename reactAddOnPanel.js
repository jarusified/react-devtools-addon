const { Class }  = require("sdk/core/heritage");
const { data }   = require("sdk/self");
const { PageMod }= require("sdk/page-mod");
const { emit, on, off, once } = require("sdk/event/core");
const { EventTarget } = require("sdk/event/target");
const  tabs  = require("sdk/tabs");

tabs.on('open',function(tab){
  console.log("open");
  emit(reactTabs,'open',tab);
});

tabs.on('activate',function(tab){
  console.log("activate");
  emit(reactTabs,'activate',tab);
});

tabs.on('ready',function(tab){
  console.log("ready");
  emit(reactTabs,'ready',tab);
});

let workers = new Set();
let workersByTabId = new Map();
let libraries = new Map();

const Tabs = Class({
  extends: EventTarget,
  get activeTab() tabs.activeTab,
  attachExistentWorkersByTabId: function (tabId) {
    var selectedWorkers = workersByTabId.get(tabId);
    if (selectedWorkers) {
      selectedWorkers.forEach((w) => {
        emit(this, "reactAttach", { tabId: tabId, worker: w });
      });
    }
  },
  hasWorkersByTabId: function (tabId) {
    let selectedWorkers = workersByTabId.get(tabId);
    if (!!selectedWorkers && selectedWorkers.size) {
      return true;
    } else {
      return false;
    }
  },
  sendToWorkersByTabId: function (tabId, name, msg) {
    var selectedWorkers = workersByTabId.get(tabId);
    if (selectedWorkers) {
      selectedWorkers.forEach((w) => {
        try {
          w.port.emit(name, msg);
        } catch(e) {
          console.error("EXCEPTION", e);
        }
      });
    }
  },
  getLibrariesByTabId: function (tabId) {
    return libraries.get(tabId);
  },
  destroy: function () {
    [...workers].
          map((w) => w.tab).
          filter((tab) => !!tab).
          sort().
          filter((tab, i, a) => (i == a.indexOf(tab))).
          forEach((tab) => {
            tab.destroy();
          });
  }
});

let reactTabs = Tabs();
module.exports = reactTabs;

let pageMod = PageMod({
  include:"*",
  attachTo: ["top","frame","existing"],
  contentScriptFile: data.url('inspector.js'),
  contentScriptWhen: "start",
  onAttach: function(worker){
    console.log("worker attached");
    workers.add(worker);
    let tabId = worker.tab.id;
    let workersSet = workersByTabId.get(tabId);
    if(!workersSet){
      workersSet = new Set();
      workersByTabId.set(tabId,workersSet);
    }
    workersSet.add(worker);
    //attachWorker(worker);
    emit(reactTabs,"reactAttach",{ tabId:tabId,worker:worker });

    /* worker events */
    worker.on("pagehide",function(){
      console.log("pagehide");
      workersSet.delete(worker);
    });
    worker.on("pageshow",function(){
      console.log("pageshow");
      workersSet.add(worker);
    });
    worker.once("detach",function(){
      console.log("detaching worker");
      workersSet.delete(worker);
      workers.delete(worker);
      libraries.delete(tabId);
      emit(reactTabs,"reactDetach",{ tabId:tabId, worker:worker });
    });
  },
  onMessage: function(contentScriptMessage){
    if(contentScriptMessage=="react"){
      
    }
  }
});
