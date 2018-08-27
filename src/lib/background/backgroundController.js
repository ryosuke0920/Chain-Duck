"use strict";
import appController from "/lib/app/appController.js";

const DEFAULT_COMMENT_WINDOW_WIDHT = 250 * 3;

export default class backgroundController extends appController
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
