var black_list = ['','',''];
var white_list = ['','',''];
var almost_white_list = ['','',''];
var grey_list = ['','',''];

var countwhite = 0;
var countblack = 0;
var cnsltxt = "";

window.onload = function(){setTimeout(function(){
	let mainlist = document.getElementsByClassName("sliding-down-panel");
	let tw =  document.getElementsByClassName("text-wrapper");
	console.log("Запуск скрипта:   "+ tw.length+"\n");
	let words = {};
	let big_wrds = {};
	for (let i = 0; i < mainlist.length; i++) {
		var task_htmltext = mainlist[i];
		if (task_htmltext.querySelector('h3.title') !== null) {
				task_title = task_htmltext.querySelector('h3.title').childNodes[0].childNodes[0].innerHTML.toLowerCase();
					grey_check(task_title,task_htmltext);
					white_check(task_title,task_htmltext);
					black_check(task_title,task_htmltext);
				if (task_title in words) {
					words[task_title] = words[task_title] + 1
				} else {
					words[task_title] = 1
				}
		}
	}
	for (const key in words) {
		if (Object.hasOwnProperty.call(words, key)) {if (words[key] > 1) {console.log("###",key, words[key]);big_wrds[key] = words[key];}}
	}
	let mnlst = document.getElementsByClassName("sliding-down-panel");
	for (let i = 0; i < mnlst.length; i++) {
		var task_htmltext = mnlst[i];
		if (task_htmltext.querySelector('h3.title') !== null) {
			task_title = task_htmltext.querySelector('h3.title').childNodes[0].childNodes[0].innerHTML.toLowerCase();
			if (task_title in big_wrds) {
				var gelem_input_elem = task_htmltext.querySelector('input');
				gelem_input_elem.click();
				countblack++;
			}
		}
	}
	if (countblack > 0 ) {
		var linka = document.getElementsByClassName('wz-button linklike remove-orders-button'); //	'link_more_all aRemoveSelected'
		for (var k = 0; k < linka.length; k++){linka[k].click();}
	}
	if (countwhite > 0) {cnsltxt = cnsltxt + 'белых  : ' + countwhite;}		
	if (countblack > 0) {cnsltxt = cnsltxt + '\nчерных : '+countblack;}	
	if ((countwhite > 0)||(countblack > 0)) {console.log(cnsltxt);}

	// console.log(JSON.stringify(words, null, 2));
	console.log("Макрос завершен");
}, 1500);}

function check(check_a,check_b){
	var checkphrase = false;
	for (var j = 0; j < check_b.length;j++){
		if (check_a.indexOf(check_b[j])!=-1) {
			checkphrase = true;
		}
	}
return checkphrase;
}
function white_check(text,a){
	var result = check(text,white_list);
	var b = a.childNodes[0].style.backgroundColor;
	if (result===true && b !== "#CCC") {
		a.childNodes[0].style.backgroundColor = "#99F";
		console.log(text);
		countwhite++;
	}
}
function black_check(text,a){
	var result = check(text, black_list);
	if (result===true) {
		var gelem_input_elem = a.querySelector('input');
		gelem_input_elem.click();
		countblack++;
	}
}
function grey_check(text,a){
	var result = check(text, grey_list);
	if (result === true) {var b = a.childNodes[0].style.backgroundColor = "#CCC";var gelem_input_elem = a.querySelector('input');gelem_input_elem.click();}  
}
