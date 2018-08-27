"use strict";
import appModel from "/lib/app/appModel.js";
export default class commentModel extends appModel
{
	constructor(){
		super();
		console.log("hello");
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
