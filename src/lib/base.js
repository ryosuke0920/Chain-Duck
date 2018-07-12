"use strict";

export default class base
{
	constructor(){
	}
	each(list, callback){
		for( let i=0; i<list.length; i++){
			callback( list[i], i, list );
		}
	}
}
