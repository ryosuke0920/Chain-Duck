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
		console.log("openWindow");
		let model = this.getCommentModel();
		let p = model.getActiveURL();
		return p.then( this.openOrUpdateWindow.bind(this) ).catch( (e)=>{ console.error(e); });
	}
	openOrUpdateWindow(url){
		console.log("openOrUpdateWindow");
		let view = this.getCommentView();
		if(view.hasWindow()){
			return view.updateWindow(url);
		}
		return view.openWindow(url).then( this.onOpenedWindow.bind(this) );
	}
	onOpenedWindow(){
		console.log("onOpenedWindow");
		browser.tabs.onActivated.addListener( this.onActivated.bind(this) );
		browser.tabs.onUpdated.addListener( this.onUpdated.bind(this) );
		let view = this.getCommentView();
		view.addOnCloseEventListener( this.onClosedWindow.bind(this) );
	}
	onClosedWindow(){
		console.log("onClosedWindow");
		browser.tabs.onActivated.removeListener( this.onActivated.bind(this) );
		browser.tabs.onUpdated.removeListener( this.onUpdated.bind(this) );
		let view = this.getCommentView();
		view.removeOnCloseEventListener( this.onClosedWindow.bind(this) );
	}
	onRemovedWindow(windowId){
		console.log("onRemovedWindow windowId="+windowId);
		let view = this.getCommentView();
		return view.removeWindow(windowId);
	}
	onActivated(activeInfo){
		console.log("onActivated");
		console.log(activeInfo);
		let view = this.getCommentView();
		if( !view.hasWindow()) return;
		if( view.isSameWindow(activeInfo.windowId, activeInfo.tabId) ) return;
		let model = this.getCommentModel();
		let p = model.getActiveURL();
		return p.then( this.updateWindow.bind(this) ).catch( (e)=>{ console.error(e); });
	}
	updateWindow(url){
		console.log("updateWindow");
		let view = this.getCommentView();
		if( !view.hasWindow()) return;
		let model = this.getCommentModel();
		url = model.convertURL(url);
		if( view.isSameURL(url) ) return;
		return view.updateWindow(url);
	}
	onUpdated(tabId, changeInfo, tab){
		console.log("onUpdated changeInfo.status="+changeInfo.status+", url="+changeInfo.url);
		//console.log(tabId);
		//console.log(changeInfo);
		//console.log(tab);
		if( !changeInfo.hasOwnProperty("url") ) return;
		let view = this.getCommentView();
		if( !view.hasWindow() ) return;
		if( view.isSameWindow(tab.windowId, tabId) ) return;
		let model = this.getCommentModel();
		let url = model.convertURL(changeInfo.url);
		if( view.isSameURL(url) ) return;
		return view.updateWindow( model.convertURL(url) );
	}
}
