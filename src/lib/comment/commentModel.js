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
}

/*
getCurrentWindowTabs(){
	return browser.tabs.query({"currentWindow": true});
}
getCurrentWindowActiveTabs(){
	return browser.tabs.query({
		"active": true,
		"currentWindow": true
	});
}
eachCurrentWindowTabs(callback){
	return this.getCurrentWindowTabs().then((tabs)=>{
		this.each( tabs, callback );
	});
}
getCurrentWindowActiveTabURL(){
	return this.getCurrentWindowActiveTabs().then((tabs)=>{
		console.log(tabs);
		return tabs[0].url;
	});
}
loadCurrentWindowTabComment(){
	return this.getCurrentWindowActiveTabURL().then((url)=>{
		url = this.convertURL(url);
		return this.apiLoadComment(url);
	}).then((list)=>{
		return [1,2,3];
	});
}
convertURL(url){
	let index;
	index = url.indexOf("#");
	if( index > 0 ) url = url.substr(0,index);
	index = url.indexOf("?");
	if( index > 0 ) url = url.substr(0,index);
	url = url.toLowerCase();
	console.log(url)
	return url;
}
apiLoadComment(url){

}
*/
