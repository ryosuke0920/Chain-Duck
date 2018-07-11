"use strict";
import controller from "/lib/controller.js";
import commentModel from "/lib/commentModel.js";
import commentView from "/lib/commentView.js";
/*
backgroundとやり取りするインタフェースを提供する。
viewの呼び出しに応じて制御結果を返す。
modelを使用して分岐を明瞭にする。
*/
export default class commentController extends controller
{
	constructor(){
		super();
		this.commentModel = new commentModel();
		this.commentView = new commentView(this, this.commentModel);
		console.log("commentController constructor");
	}
	init(){
		this.commentView.init();
	}
}
