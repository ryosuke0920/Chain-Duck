"use strict";
import * as C from "/etc/const.js";
import appView from "/lib/app/appView.js";
import commentModel from "/lib/comment/commentModel.js";
export default class commentView extends appView
{
	constructor(){
		super();
	}
	init(model){
		this.model = model;
		this.onCloseEvent = [];
		browser.windows.onRemoved.addListener( this.onRemoveWindow.bind(this) ) ;
	}
	setCommentModel(model){
		this.model = model;
	}
	getCommentModel(){
		return this.model;
	}
	setWindow(win){
		this.window = win;
	}
	getWindow(){
		return this.window;
	}
	hasWindow(){
		return !!this.getWindow();
	}
	isSameWindow(windowId, tabId){
		if(!this.hasWindow()) return false;
		let win = this.getWindow();
		if(windowId != win.id) return false;
		if(tabId != win.tabs[0].id) return false;
		return true;
	}
	setQueryURL(url){
		this.queryURL = url;
	}
	getQueryURL(){
		return this.queryURL;
	}
	isSameURL(url){
		return this.getQueryURL() == url;
	}
	addOnCloseCallback(callback){
		this.onCloseEvent.push(callback);
	}
	clearOnCloseCallback(){
		this.onCloseEvent = [];
	}
	getOnCloseEventListener(){
		return this.onCloseEvent;
	}
	openPlainWindow(){
		let url = browser.runtime.getURL("/html/plain.html");
		this.setQueryURL(url);
		let options = this.makeWindowOption();
		options.url = url;
		let p = browser.windows.create(options);
		return p.then( this.onOpenWindow.bind(this) );
	}
	openWindow(url){
		this.setQueryURL(url);
		url = this.model.makeLocationURL(url);
		let options = this.makeWindowOption();
		options.url = url;
		let p = browser.windows.create(options);
		return p.then( this.onOpenWindow.bind(this) );
	}
	makeWindowOption(){
		return {
			"type": "popup",
			"titlePreface": browser.i18n.getMessage("extensionName") + " - ",
			"top": C.COMMENT_WINDOW_MARGIN,
			"left": window.screen.width - C.COMMENT_WINDOW_WIDTH - C.COMMENT_WINDOW_MARGIN,
			"height": window.screen.height - (C.COMMENT_WINDOW_MARGIN * 2),
			"width": C.COMMENT_WINDOW_WIDTH
		};
	}
	onOpenWindow(win){
		this.setWindow(win);
	}
	onRemoveWindow(windowId){
		if( !this.hasWindow() ) return;
		let win = this.getWindow();
		if( win.id == windowId ){
			this.setWindow();
			this.each( this.getOnCloseEventListener(), (callback)=>{
				callback(windowId);
			});
		}
	}
	foregroundWindow(){
		let win = this.getWindow();
		return browser.windows.update(win.id, {"focused": true});
	}
	updateWindow(url){
		this.setQueryURL(url);
		let win = this.getWindow();
		let p = browser.tabs.query({
			"windowId": win.id
		});
		return p.then( this.onGotTabs.bind(this) );
	}
	onGotTabs(tabs){
		let url = this.model.makeLocationURL(this.getQueryURL());
		let tabId = tabs[0].id;
		return browser.tabs.update(tabId, {"url": url});
	}
}
