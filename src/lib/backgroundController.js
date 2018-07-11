"use strict";
import controller from "/lib/controller.js";

const DEFAULT_COMMENT_WINDOW_WIDHT = 250 * 3;

export default class backgroundController extends controller
{
	constructor(){
		super();
		console.log("backgroundController constructor");
	}
	init(){
		console.log("init");
		browser.browserAction.onClicked.addListener(this.browserActionBehavior.bind(this));
	}
	browserActionBehavior(e){
		console.log("browserAction");
		if( this.commentWindowId ) {
			browser.windows.get( this.commentWindowId ).then((commentWindow)=>{
				console.log(commentWindow);
				browser.windows.remove(commentWindow.id);
			}).catch((e)=>{
				console.log(e);
				console.log("already closed.");
			});
			this.commentWindowId = undefined;
		}
		let data = {
		  "type": "normal",
		  "url": "/comment/comment.html",
		  "width": DEFAULT_COMMENT_WINDOW_WIDHT,
			"left": screen.width - DEFAULT_COMMENT_WINDOW_WIDHT,
		  "height": screen.height
		};
		browser.windows.create(data).then((commentWindow)=>{
			this.commentWindowId = commentWindow.id;
		});
	}
}
