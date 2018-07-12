"use strict";
import base from "/lib/base/base.js";

export default class view extends base
{
	constructor(){
		super();
	}
	removeChildren(node){
		while(node.lastChild) node.removeChild(node.lastChild);
	}
	show(node){
		node.classList.remove("hide");
	}
	hide(node){
		node.classList.add("hide");
	}
	applyI18n(list){
		this.each(list,(obj)=>{
			let list = document.querySelectorAll(obj.selector);
			this.each(list,(node)=>{
				node[obj.property] = browser.i18n.getMessage( obj.key );
			});
		});
	}
}
