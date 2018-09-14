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
		this.model = new commentModel();
		this.model.init();
		this.view = new commentView();
		this.view.init( this.model );
		this.onActivateBinded = this.onActivated.bind(this);
		this.onUpdatedBinded = this.onUpdated.bind(this)
	}
	setCommentModel(model){
		this.model = model;
	}
	getCommentModel(){
		return this.model;
	}
	setCommentView(view){
		this.view = view;
	}
	getCommentView(){
		return this.view;
	}
	openWindow(){
		let p = this.model.getActiveURL();
		return p.then( this.openOrUpdateWindow.bind(this) ).catch(e=>console.error(e));
	}
	openOrUpdateWindow(url){
		url = this.model.convertURL(url);
		if(this.view.hasWindow()){
			return this.view.updateWindow(url).catch(e=>console.error(e));
		}
		return this.view.openWindow(url).then( this.onOpenedWindow.bind(this) ).catch(e=>console.error(e));
	}
	onOpenedWindow(){
		browser.tabs.onActivated.addListener( this.onActivateBinded );
		browser.tabs.onUpdated.addListener( this.onUpdatedBinded );
		this.view.addOnCloseCallback( this.onClosedWindow.bind(this) );
	}
	onClosedWindow(){
		browser.tabs.onActivated.removeListener( this.onActivateBinded );
		browser.tabs.onUpdated.removeListener( this.onUpdatedBinded );
		this.view.clearOnCloseCallback();
	}
	onActivated(activeInfo){
		if( !this.view.hasWindow()) return;
		if( this.view.isSameWindow(activeInfo.windowId, activeInfo.tabId) ) return;
		let p = this.model.getActiveURL();
		return p.then( this.updateWindow.bind(this) ).catch(e=>console.error(e));
	}
	updateWindow(url){
		if( !this.view.hasWindow()) return;
		url = this.model.convertURL(url);
		if( this.view.isSameURL(url) ) return;
		return this.view.updateWindow(url).catch(e=>console.error(e));;
	}
	onUpdated(tabId, changeInfo, tab){
		if( !changeInfo.hasOwnProperty("url") ) return;
		if( !this.view.hasWindow() ) return;
		if( this.view.isSameWindow(tab.windowId, tabId) ) return;
		let url = this.model.convertURL(changeInfo.url);
		if( this.view.isSameURL(url) ) return;
		return this.view.updateWindow(url).catch(e=>console.error(e));;
	}
}
