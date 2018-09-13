"use strict";
import appModel from "/lib/app/appModel.js";
export default class commentModel extends appModel
{
	constructor(){
		super();
	}
	init(){}
	getActiveURL(){
		let p = browser.tabs.query({
			"active": true,
			"currentWindow": true
		});
		return p.then( this.onGetCurrentWindowTab.bind(this) );
	}
	onGetCurrentWindowTab(e){
		if(e.length<1) throw new Error("faild getActiveURL.");
		let activeTab = e[0];
		return activeTab.url;
	}
	convertURL(url){
		url = new URL(url);
		console.log(url);
		return url.origin+url.pathname;
	}
}
