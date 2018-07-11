"use strict";
import controller from "/lib/controller.js";

export default class backgroundController extends controller
{
	constructor(){
		super();
		console.log("backgroundController constructor");
	}
	init(){
		console.log("init");
	}
}
