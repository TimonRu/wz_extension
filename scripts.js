var black_list = ['','',''];
var white_list = ['','',''];
var almost_white_list = ['','',''];
var grey_list = ['','',''];

var countwhite = 0;
var countblack = 0;
var cnsltxt = "";

window.onload = function () {
	setTimeout(function () {
		let list_of_order = document.getElementsByClassName("normal-top");
		if (list_of_order.length > 0) {
			console.log("Запуск скрипта:", "\n","Количество активных заказов", list_of_order.length);
			let white_orders = [];
			let black_orders = [];
			let grey_orders = [];
			let repeat_orders = {};
			for (let index = 0; index < list_of_order.length; index++) {
				// console.log(index+1,list_of_order[index].querySelector('div.text-wrapper').innerHTML);
				let text1 = list_of_order[index].querySelector('div.text-wrapper').innerHTML.toLowerCase();
				let text2 = list_of_order[index].querySelector('div.external-links-wrapper').innerHTML.toLowerCase();
				let txt = text1 + "\n" + text2;
				let white_check = check_lists(txt,white_list);
					if (white_check) {white_orders.push(text1);} 
				let black_check = check_lists(txt,black_list);
					if (black_check) {black_orders.push(text1);} 
				let grey_check = check_lists(txt,grey_list);
					if (grey_check) {grey_orders.push(text1);}
				if (text1 in repeat_orders) {repeat_orders[text1] = repeat_orders[text1] + 1;} else {repeat_orders[text1] = 1;}
			}
			for (const key in repeat_orders) {
				if (Object.hasOwnProperty.call(repeat_orders, key)) {
					if (repeat_orders[key] > 1) {
						console.log("###", key, repeat_orders[key]);
						if (black_orders.indexOf(repeat_orders[key]) == -1) {
							let bo_do = black_orders.length;
							black_orders.push(repeat_orders[key]);
							console.log(bo_do,black_orders.length);
						}
					}
				}
			}
			console.log("Белые");
				console.table(white_orders);
			console.log("Черные");
				console.table(black_orders);
			console.log("Серые");
				console.table(grey_orders);

			for (let index = 0; index < list_of_order.length; index++) {
				let text1 = list_of_order[index].querySelector('div.text-wrapper').innerHTML.toLowerCase();
				let white_check = check_lists(text1,white_orders);
					if (white_check) {list_of_order[index].parentElement.parentElement.style.backgroundColor = "#99F";countwhite++;}
				let black_check = check_lists(text1,black_orders);
					if (black_check) {
						let alink = list_of_order[index].querySelector('input');
						alink.click();
						countblack++;
					} 
				let grey_check = check_lists(text1,grey_orders);
					if (grey_check) {list_of_order[index].parentElement.parentElement.style.backgroundColor = "#CCC";}
			}
				if (countblack > 0) {
					var linka = document.getElementsByClassName('wz-button linklike remove-orders-button');
					for (var k = 0; k < linka.length; k++) { linka[k].click(); }
				}
				if (countwhite > 0) { cnsltxt = cnsltxt + 'белых  : ' + countwhite; }
				if (countblack > 0) { cnsltxt = cnsltxt + '\nчерных : ' + countblack; }
				if ((countwhite > 0) || (countblack > 0)) { console.log(cnsltxt); }
				console.log("Макрос завершен");
		}
	}, 2222);
}

function check_lists(text,list){
	let check = false;
	for (let i = 0; i < list.length; i++) {if (text.indexOf(list[i]) !== -1) { check = true;}}
	return check;
}
