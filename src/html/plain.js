document.addEventListener("DOMContentLoaded", onLoad);
function onLoad(e){
	let c = [{
		"selector": "#title,title",
		"key": "extensionName"
	},{
		"selector": "#description1",
		"key": "description1"
	},{
		"selector": "#description2",
		"key": "description2"
	},{
		"selector": "#description3",
		"key": "description3"
	}];
	for(let i=0; i<c.length; i++){
		let obj = c[i];
		let list = document.querySelectorAll(obj.selector);
		for(let j=0; j<list.length; j++){
			list[j].innerText = browser.i18n.getMessage(obj.key);
		}
	}
}
