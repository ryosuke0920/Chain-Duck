"use strict";
import * as C from "/etc/const.js";
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
		if(!url.search) return url.origin + url.pathname;
		let bottom = [];
		this.each(C.PARAMETER_FILTER, (filter)=>{
			if( !url.href.match(filter.regex) ) return;
			let temp = url.search.substr(1).split("&"); // "substr" removes top of "?"
			let get = {};
			this.each(temp, (str)=>{
				let list = str.split("=");
				get[list[0]] = list[1];
			});
			this.each(filter.keys, (key)=>{
				if( get.hasOwnProperty(key) ) bottom.push( key + "=" + get[key] );
			});
			return false;
		});
		if( bottom.length <= 0 ) return url.origin + url.pathname;
		return url.origin + url.pathname + "?" + bottom.join("&");
	}
	makeLocationURL(url){
		return C.TWITTER_URL + encodeURIComponent(url);
	}
}
