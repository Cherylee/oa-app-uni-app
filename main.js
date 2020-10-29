import Vue from 'vue'
import App from './App'

import store from './store'
import service from './service'
import member from './common/common.js'
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$member = member
Vue.prototype.websiteUrl = member;
// Vue.prototype.websiteUrl = 'http://192.168.1.110:8081/'

// post请求
Vue.prototype.urlRequestPost = function(url, param, contentType, callBack) {
	let way = 'POST'
	if (contentType) {
		contentType = contentType
	} else {
		contentType = 'application/x-www-form-urlencoded'
	}
	let this_ = this
	uni.request({
		url: this.$member.url + url,
		data: param,
		header: {
			'Content-Type': contentType, //自定义请求头信息
		},
		method: way,
		success: (res) => {
			if (res.data.timeOut == 'true') {
				uni.getStorage({
					key: 'USERS_KEY',
					success: function(res) {
						uni.request({
							url: this_.$member.url + '/login',
							header: {
								'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
							},
							data: res.data,
							method: 'POST',
							success: (res) => {
								if (res.data.code == '0') {} else {
									uni.showToast({
										icon: 'none',
										title: res.data.msg,
									});
								}
							}
						});
					}
				})

			} else {
				callBack(res)
			}
		}
	});
}
// get请求
Vue.prototype.urlRequestGet = function(url, contentType, callBack) {

	let way = 'GET'
	if (contentType) {
		contentType = contentType
	} else {
		contentType = 'application/x-www-form-urlencoded'
	}
	let token = "";
	uni.request({
		url: this.$member.url + url,
		header: {
			'Content-Type': contentType, //自定义请求头信息
		},
		method: way,
		success: (res) => {
			if (res.data.timeOut == 'true') {
				uni.getStorage({
					key: 'USERS_KEY',
					success: function(res) {
						this_.login(res.data)
						this.urlRequestPost('/login', res.data, null, function(res) {
							if (res.data.code == '0') {} else {
								uni.showToast({
									icon: 'none',
									title: res.data.msg,
								});
							}
						})
					}
				})

			} else {
				callBack(res)
			}
		}
	});
}
//字典                     
Vue.prototype.dictValue = function(dictType) {
	return new Promise((resolve, reject) => {
		this.urlRequestPost('system/dict/data/getDictData', {
			'dictType': dictType
		}, null, function(res) {
			resolve(res)
		})
	})
}
//字典                     
Vue.prototype.getDictV = function(type, value) {
	let dictV = ''
	for (let i in type) {
		if (type[i].dictValue == value) {
			dictV = type[i].dictLabel
		}
	}
	return dictV
}
// 回显字典index
Vue.prototype.returnIndex = function(n, v) {
	var index = ''
	for (let i in n) {
		if (n[i].dictValue == v) {
			index = i
		}
	}
	return index
}
Vue.prototype.formatDataTime = function(type, dataTime) {
	let time = ''
	switch (type) {
		case 'yyyy-MM-dd':
			time = dataTime.substring(0, 10)
			break
		case 'HH:mm:ss':
			time = dataTime.substring(11, 19)
			break
		case 'HH:mm':
			time = dataTime.substring(11, 16)
			break
	}
	return time
}



App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()
