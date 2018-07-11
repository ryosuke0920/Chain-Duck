"use strict";
import controller from "/lib/controller.js";

export default class commentController extends controller
{
	constructor(){
		super();
		console.log("commentController constructor");
	}
	init(){
		console.log("init");
	}
}
