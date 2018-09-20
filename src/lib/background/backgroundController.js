"use strict";
import * as C from "/etc/const.js";
import appController from "/lib/app/appController.js";
import commentController from "/lib/comment/commentController.js";
export default class backgroundController extends appController
{
	constructor(){
		super();
	}
	init(){
		browser.browserAction.onClicked.addListener(this.browserActionBehavior.bind(this));
		this.controller = new commentController();
		this.controller.init();
	}
	setCommentConstroller(obj){
		this.controller=obj;
	}
	getCommentConstroller(){
		return this.controller;
	}
	browserActionBehavior(e){
		this.controller.openWindow();
	}
}
