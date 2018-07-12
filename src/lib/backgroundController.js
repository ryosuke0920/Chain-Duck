"use strict";
import controller from "/lib/controller.js";

const DEFAULT_COMMENT_WINDOW_WIDHT = 250 * 3;

export default class backgroundController extends controller
{
	constructor(){
		super();
	}
	init(){
		browser.browserAction.onClicked.addListener(this.browserActionBehavior.bind(this));
	}
	browserActionBehavior(e){
		let p = browser.sidebarAction.open();
	}
}
