"use strict";
import view from "/lib/view.js";
import commentModel from "/lib/commentModel.js";
/*
UI関連
イベントはコントローラーを呼び出す。
必要があればmodelから値を取り出して、UIに反映する。
*/
export default class commentView extends view
{
	constructor(controller, model){
		super();
		console.log("commentView constructor");
		this.commentController = controller;
		this.commentModel = model;
	}
	init(){
		console.log("commentView init");
		this.makeTabSelector();
	}
	makeTabSelector(){
		this.commentModel.eachTabs((tab,i,list)=>{
			console.log(tab,i,list);
		});
	}
}
