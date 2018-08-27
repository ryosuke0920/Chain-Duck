"use strict";
import appController from "/lib/app/appController.js";
import commentModel from "/lib/comment/commentModel.js";
import commentView from "/lib/comment/commentView.js";
export default class commentController extends appController
{
	constructor(){
		super();
	}
	init(){
		this.setCommentModel( new commentModel() );
		this.getCommentModel().init();
		this.setCommentView( new commentView() );
		this.getCommentView().init();
		browser.windows.onRemoved.addListener( this.onRemovedWindow.bind(this) );
	}
	setCommentModel(obj){
		this.commentModel = obj;
	}
	getCommentModel(obj){
		return this.commentModel;
	}
	setCommentView(obj){
		this.commentView = obj;
	}
	getCommentView(obj){
		return this.commentView;
	}
	openWindow(){
		let model = this.getCommentModel();
		let p = model.getActiveURL();
		return p.then( this.onGetActiveURL.bind(this) ).catch( (e)=>{ console.error(e); });
	}
	onGetActiveURL(url){
		let view = this.getCommentView();
		return view.openWindow(url);
	}
	onRemovedWindow(id){
		let view = this.getCommentView();
		return view.removeWindow(id);
	}
}

/*
		browser.tabs.onActivated.addListener( this.avtivatedTab.bind(this) )
		browser.tabs.onMoved.addListener( this.movedTab.bind(this) )
		browser.tabs.onCreated.addListener( this.createdTab.bind(this) );
		browser.tabs.onRemoved.addListener( this.removedTab.bind(this) );
		browser.tabs.onAttached.addListener( this.attachedTab.bind(this) )
		browser.tabs.onDetached.addListener( this.detachedTab.bind(this) )
		browser.tabs.onUpdated.addListener( this.updatedTab.bind(this) )
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
*/
