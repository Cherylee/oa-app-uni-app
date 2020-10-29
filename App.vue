<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		methods: {
			...mapMutations(['login']),
			...mapMutations(['logout']),
			...mapMutations(['userINFO']),
		},
		onLaunch: function() {
			// #ifdef APP-PLUS
			// 检测升级
			console.log(plus.runtime.version)
			this.urlRequestPost('tool/oaPhoneVersion/getLastVersionInfo', {
				'version': plus.runtime.version
			}, null, function(res) {
				if (res.data.downloadUrl) {
					// 下载wgt文件
					var wgtUrl = res.data.downloadUrl; //下载文件地址（也可以从后台获取）
					plus.nativeUI.showWaiting("正在更新中，请稍后..");
					plus.downloader.createDownload(wgtUrl, {
						filename: "_doc/update/"
					}, function(d, status) {

						if (status == 200) {

							let path = d.filename

							// 安装wgt包 更新应用资源

							plus.nativeUI.showWaiting("正在更新中，请稍后...");

							plus.runtime.install(d.filename, {

								force: true

							}, function() {

								plus.nativeUI.closeWaiting();

								console.log("新版本文件成功！");

								plus.nativeUI.alert("软件应用更新完成！", function() {

									plus.runtime.restart(); //必须执行 plus.runtime.restart()，否则新的内容并不会生

								});

							}, function(e) {

								console.log(e)

								plus.nativeUI.closeWaiting();

								console.log("更新失败[" + e.code + "]：" + e.message);

								plus.nativeUI.alert("更新失败[" + e.code + "]：" + e.message);

							});

						} else {

							console.log("下载wgt失败！");

							plus.nativeUI.alert("下载wgt失败！");

						}

						plus.nativeUI.closeWaiting();

					}).start();

				}
			})
			// #endif
			let userinfo = uni.getStorageInfoSync('USERS_KEY') || ''
			let user = uni.getStorageInfoSync('USERS_INFO') || ''
			let this_ = this
			if (userinfo.currentSize != 0) {
				uni.getStorage({
					key: 'USERS_KEY',
					success: function(res) {
						this_.login(res.data)
					}
				})
				uni.getStorage({
					key: 'USERS_INFO',
					success: function(res) {
						this_.userINFO(res.data)
					}
				})

			} else {
				uni.reLaunch({
					url: 'pages/login/login'
				});
			}
			// 角标设置
			setInterval(function() {
				this_.urlRequestGet('/system/indexMarker', null, function(res) {
					let num = parseInt(res.data.data.copyNum) + parseInt(res.data.data.lastTaskNum) + parseInt(res.data.data.taskNum) + parseInt(res.data.data.urgeNum)
					// num=parseInt(Math.random()*10)+num
					plus.runtime.setBadgeNumber(num);
				})
			}, 2000)
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style>
	@import './static/css/uni.css';
	/* uni.scss */

	/*每个页面公共css */
	page {
		min-height: 100%;
		color: #555555;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #FFFFFF;
		padding: 20upx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}
</style>
