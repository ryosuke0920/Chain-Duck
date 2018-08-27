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
		this.setCommentConstroller(new commentController());
		this.getCommentConstroller().init();
	}
	setCommentConstroller(obj){
		this.commentController=obj;
	}
	getCommentConstroller(){
		return this.commentController;
	}
	browserActionBehavior(e){
		this.getCommentConstroller().openWindow();
	}
}
