/**
 * @param {Object} type
 */
const getDate=function(type) {
	var time =''
	let myDate = new Date;
	let year = myDate.getFullYear(); //获取当前年
	let mon = myDate.getMonth() + 1; //获取当前月
	if (mon < 10) {
		mon = "0" + mon;
	}
	let date = myDate.getDate(); //获取当前日
	if (date < 10) {
		date = "0" + date;
	}
	let h = myDate.getHours();//获取当前小时数(0-23)
	if (h < 10) {
		h = "0" + h;
	}
	let m = myDate.getMinutes();//获取当前分钟数(0-59)
	if (m < 10) {
		m = "0" + m;
	}
	let s = myDate.getSeconds();//获取当前秒
	if (s < 10) {
		s = "0" + s;
	}
	
	switch(type){
		case 'date':
		     time=year + "-" + mon + "-" + date
	         break;
	    case 'dateTime':
		     time=year + "-" + mon + "-" + date+' '+h+':'+m+':'+s
		     break;
		case 'time':
		     time=h+':'+m+':'+s
		     break;
	}
	return time;
}
/**
 * 对象赋值
 */
const listAssign=function(arrA, arrB){
	return Object.keys(arrA).forEach(key => {
		if(arrB.hasOwnProperty(key)) {
			arrA[key] = arrB[key]
		}
	})
}
function setBadge(num) {
	plus.runtime.setBadgeNumber(num);
}

// console.log(user)
/**
 * 导出
 */
export default {
	getDate,
	listAssign,
	setBadge
}
