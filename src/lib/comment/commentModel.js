"use strict";
import model from "/lib/base/model.js";
/*
ビジネスロジック全般
もっぱらviewかcontrollerに支配される。
*/
export default class commentModel extends model
{
	constructor(){
		super();
	}
	eachTabs(callback){
		return this.getCurrentWindowTabs().then((tabs)=>{
			this.each( tabs, callback );
		});
	}
	getCurrentWindowTabs() {
	  return browser.tabs.query({"currentWindow": true});
	}
}
