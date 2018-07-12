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
	constructor(){
		super();
	}
	init(controller, model){
		this.commentController = controller;
		this.commentModel = model;
		this.body = document.querySelector("body");
		this.tabSelector = document.querySelector("#tabSelector");
		Promise.resolve().then(
			this.makeTabSelector.bind(this)
		).then(()=>{
			this.tabSelector.addEventListener("change", this.changedTabSelector);
			this.showBody();
		});
	}
	showBody(){
		this.show(this.body);
	}
	makeTabSelector(){
		this.removeChildren(this.tabSelector);
		return this.commentModel.eachTabs((tab,index,list)=>{
			this.tabSelector.appendChild(this.makeTabSelectorOption(tab));
		});
	}
	makeTabSelectorOption(tab){
		let option = document.createElement("option");
		option.innerText = tab.title||tab.url;
		option.value = tab.id;
		option.selected = tab.active;
		return option;
	}
	changedTabSelector(e){
		console.log(e);
	}
	activateTab(tabId){
		this.selectTabSelectorOption(tabId)
		console.log("update comment too.");
	}
	selectTabSelectorOption(tabId){
		let list = this.tabSelector.querySelectorAll("option");
		this.each(list,(node)=>{
			if( node.value == tabId ){
				node.selected = true;
			}
			else {
				node.selected = false;
			}
		});
	}
	removeTab(tabId){
		this.removeTabSelectorOption(tabId)
		console.log("remove comment cache? too.");
	}
	removeTabSelectorOption(tabId){
		let list = this.tabSelector.querySelectorAll("option[value=\""+tabId+"\"]");
		this.each(list,(node)=>{
			node.remove();
		});
	}
}
