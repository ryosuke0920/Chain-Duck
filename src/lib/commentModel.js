"use strict";
import model from "/lib/model.js";
/*
ビジネスロジック全般
もっぱらviewかcontrollerに支配される。
*/
export default class commentModel extends model
{
	constructor(){
		super();
		console.log("commentModel constructor");
	}
	eachTabs(callback){
		console.log(browser.tabs);
		let list = [1,2,3,4,5];
		this.each( list, callback );
	}
}
