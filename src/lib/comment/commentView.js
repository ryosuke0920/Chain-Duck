"use strict";
import * as C from "/etc/const.js";
import appView from "/lib/app/appView.js";
import commentModel from "/lib/comment/commentModel.js";
export default class commentView extends appView
{
	constructor(){
		super();
	}
	init(){
		this.onCloseEvent = [];
		browser.windows.onRemoved.addListener( this.onRemoveWindow.bind(this) ) ;
	}
	setCommentModel(obj){
		this.commentModel = obj;
	}
	getCommentModel(){
		return this.commentModel;
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
	setURL(url){
		this.url = url;
	}
	getURL(){
		return this.url;
	}
	isSameURL(url){
		return this.getURL() == url;
	}
	addOnCloseEventListener(callback){
		this.onCloseEvent.push(callback);
	}
	removeOnCloseEventListener(callback){
		console.log("removeOnCloseEventListener");
		console.log(this.onCloseEvent);
		this.onCloseEvent = this.onCloseEvent.filter( (e)=>{ return e != callback} );
		console.log(this.onCloseEvent);
	}
	getOnCloseEventListener(){
		return this.onCloseEvent;
	}
	openWindow(url){
		url = C.TWITTER_URL + encodeURI(url);
		console.log(url);
		this.setURL(url);
		let p = browser.windows.create({
			"url": url,
			"type": "popup" /* https://bugzilla.mozilla.org/show_bug.cgi?id=1380184 */
		});
		return p.then( this.onOpenWindow.bind(this) );
	}
	onOpenWindow(win){
		console.log(win);
		this.setWindow(win);
	}
	onRemoveWindow(windowId){
		console.log("onRemoveWindow");
		console.log(windowId);
		if( !this.hasWindow() ) return;
		let win = this.getWindow();
		console.log(win.id);
		if( win.id == windowId ){
			console.log("Set window undefined.");
			this.setWindow();
			this.each( this.getOnCloseEventListener(), (callback)=>{
				callback(windowId);
			});
		}
	}
	updateWindow(url){
		console.log("updateWindow");
		url = C.TWITTER_URL + encodeURI(url);
		this.setURL(url);
		console.log(url);
		let win = this.getWindow();
		console.log(win);
		let p = browser.tabs.query({
			"windowId": win.id
		});
		return p.then( this.onGotTabs.bind(this) );
	}
	onGotTabs(tabs){
		console.log(tabs);
		let tabId = tabs[0].id;
		let p = browser.tabs.update(
			tabId,
			{ "url": this.getURL() }
		);
		return p.catch( (e)=>{ console.error(e); } );
	}
}
