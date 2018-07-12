"use strict";
import controller from "/lib/base/controller.js";
import commentModel from "/lib/comment/commentModel.js";
import commentView from "/lib/comment/commentView.js";
/*
backgroundとやり取りするインタフェースを提供する。
viewの呼び出しに応じて制御結果を返す。
modelを使用して分岐を明瞭にする。
*/
export default class commentController extends controller
{
	constructor(){
		super();
	}
	init(){
		this.commentModel = new commentModel();
		this.commentView = new commentView(this, this.commentModel);
		this.commentView.init(this, this.commentModel);
		browser.tabs.onActivated.addListener( this.avtivatedTab.bind(this) )
		browser.tabs.onMoved.addListener( this.movedTab.bind(this) )
		browser.tabs.onCreated.addListener( this.createdTab.bind(this) );
		browser.tabs.onRemoved.addListener( this.removedTab.bind(this) );
		browser.tabs.onAttached.addListener( this.attachedTab.bind(this) )
		browser.tabs.onDetached.addListener( this.detachedTab.bind(this) )
		browser.tabs.onUpdated.addListener( this.updatedTab.bind(this) )
	}
	avtivatedTab(e){
		console.log("avtivatedTab");
		console.log(e);
		this.commentView.activateTab(e.tabId)
	}
	movedTab(tabId){
		console.log("movedTab");
		console.log(tabId);
		this.commentView.makeTabSelector();
	}
	createdTab(e){
		console.log("createdTab");
		console.log(e);
		this.commentView.makeTabSelector();
	}
	removedTab(tabId){
		console.log("removedTab");
		console.log(tabId);
		this.commentView.removeTab(tabId)
	}
	attachedTab(tabId){
		console.log("onAttached");
		console.log(tabId);
		this.commentView.makeTabSelector();
	}
	detachedTab(tabId){
		console.log("onDettached");
		console.log(tabId);
		this.commentView.removeTab(tabId);
	}
	updatedTab(tabId){
		console.log("updatedTab");
		console.log(tabId);
		/* 指定ページの更新のみ */
	}
}
