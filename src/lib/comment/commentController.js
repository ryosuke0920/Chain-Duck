"use strict";
import * as C from "/etc/const.js";
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
		this.updateQueue = [];
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
		if(this.view.hasWindow()){
			let p = this.view.foregroundWindow();
			if( !this.model.isAllowedURL(url) ) return;
			if( this.model.isDeniedURL(url) ) return;
			url = this.model.convertURL(url);
			return p.then( ()=>{ return this.view.updateWindow(url)} ).catch(e=>console.error(e));
		}
		if( !this.model.isAllowedURL(url) || this.model.isDeniedURL(url) ) {
			return this.view.openPlainWindow().then( this.onOpenedWindow.bind(this) ).catch(e=>console.error(e));
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
		return p.then((url)=>{return this.updateWindow(url)}).catch(e=>console.error(e));
	}
	updateWindow(url){
		if( !this.model.isAllowedURL(url) ) return;
		if( this.model.isDeniedURL(url) ) return;
		url = this.model.convertURL(url);
		return this.queueUpdateWindow(url);
	}
	queueUpdateWindow(url){
		return new Promise((resolve, reject)=>{
			this.addUpdateQueue();
			setTimeout(()=>{
				this.removeUpdateQueue();
				if( !this.view.hasWindow()) return;
				if( this.view.isSameURL(url) ) return;
				if(this.hasUpdateQueue()){
					resolve();
					return;
				}
				this.view.updateWindow(url).then(resolve, reject);
			}, C.UPDATE_WAIT_TIME);
		});

	}
	onUpdated(tabId, changeInfo, tab){
		if( !changeInfo.hasOwnProperty("url") ) return;
		if( !this.view.hasWindow() ) return;
		if( this.view.isSameWindow(tab.windowId, tabId) ) return;
		let url = changeInfo.url;
		if( !this.model.isAllowedURL(url) ) return;
		if( this.model.isDeniedURL(url) ) return;
		url = this.model.convertURL(url);
		return this.queueUpdateWindow(url).catch(e=>console.error(e));
	}
	hasUpdateQueue(){
		return 0 < this.updateQueue.length;
	}
	addUpdateQueue(){
		this.updateQueue.push(1);
	}
	removeUpdateQueue(){
		this.updateQueue.shift();
	}
}
