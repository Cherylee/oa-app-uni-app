<template>
	<view>
		<navigator class="top-nav" v-if="ifClockSetPemi" url="/pages/setting/setting" open-type="navigate">
			<text><i class="iconfont icon-shezhi" style="color: #0FAEFF;"></i> 配置打卡参数</text>
		</navigator>
		<navigator class="top-nav" v-if="ifClockSetPemi" url="/pages/settingList/settingList" open-type="navigate">
			<text><i class="iconfont icon-taizhangguanli1" style="color: #0FAEFF;"></i> 配置台账</text>
		</navigator>
		<view class="clockSet" v-if="!clockSet">
			<i class="iconfont icon-tupianjiazaishibai02 clockSet_icon"></i>
			<text class="clockSet_text">请联系管理员配置您当前公司的打卡时间</text>
		</view>
		<view v-else>
			<view class="setClock">
				<view><i class="iconfont icon-yonghu" style="color: #0FAEFF;"></i> {{name}}</view>
				<view><i class="iconfont icon-gongsi" style="color: #0FAEFF;"></i> {{companyName}}-{{deptName}}</view>
				<!-- <view><text class="subtitle">设定距离：</text>{{range|dateFormat}}</view>
				<view><text class="subtitle">设定公司坐标：</text>{{companyLocation.lat}},{{companyLocation.lng}}</view>
				
				<view><text class="subtitle">相距：</text>{{distance|dateFormat}}</view> -->
			</view>
			<view style="background:#FFFFFF; padding:40rpx;">
				<block v-if="hasLocation === false">
					<view class="uni-center uni-common-mt">位置权限未开，无法获取当前位置</view>
				</block>
				<block v-if="hasLocation === true">
					<!-- 上午打卡 -->
					<block class="block-clock">
						<view><strong>上午</strong></text></view>
						<!--上午打卡 上班时间 -->
						<view>
							<view v-if="workStart"><text class="subtitle">上班时间：</text>{{workStart}}</view>
							<!-- 未打卡 -->
							<view class="radiu" v-if="!ifClockStart">
								<view class="clockBox" :class="{'clockColor':distance<=range,'clockNo':distance>range||ifClockStart1||ifClockEnd1||ifClockEnd}" @tap="clockFuc('0')">
									<text>打卡</text>
								</view>
								<view class="currentTime">{{time}}</view>
							</view>
							<!-- 已打卡 -->
							<view v-else class="textbox">
								<view>打卡时间：<text class="textbox-title">{{workTime}}</text></view>
								<view>
									<uni-icons type="location-filled" color="#007AFF" size="20" />
									<text style="color: #007AFF;">{{companyName}}-{{deptName}}</text>
								</view>

							</view>
						</view>
						<!--上午打卡 下班时间 -->
						<view v-if="punchTimes==3||punchTimes==4">
							<view><text class="subtitle">下班时间：</text>{{workStart1}}</view>
							<!-- 未打卡 -->
							<view class="radiu" v-if="!ifClockStart1">
								<view class="clockBox" :class="{'clockColor':distance<=range,'clockNo':distance>range}" @tap="clockFuc('3')">
									<text>打卡</text>
								</view>
								<view class="currentTime">{{time}}</view>
							</view>
							<!-- 已打卡 -->
							<view v-else class="textbox">
								<view>打卡时间：<text class="textbox-title">{{morningOffTime }}</text></view>
								<view>
									<uni-icons type="location-filled" color="#007AFF" size="20" />
									<text style="color: #007AFF;">{{companyName}}-{{deptName}}</text>
								</view>

							</view>
						</view>
					</block>
					<!-- 下午打卡 -->
					<block class="block-clock">
						<view><strong>下午</strong></text></view>
						<!-- 下午打卡 上班打卡-->
						<view v-if="punchTimes==4">
							<view><text class="subtitle">上班时间：</text>{{workEnd1}}</view>
							<!-- 未打卡 -->
							<view class="radiu" v-if="!ifClockEnd1">
								<view class="clockBox" :class="{'clockColor':distance<=range,'clockNo':distance>range}" @tap="clockFuc('4')">
									<text>打卡</text>
								</view>
								<view class="currentTime">{{time}}</view>
							</view>
							<!-- 已打卡 -->
							<view v-else class="textbox">
								<view class="textbox-title">打卡时间：{{afternoonWorkTime}}</view>
								<view>
									<uni-icons type="location-filled" color="#007AFF" size="20" />
									<text style="color: #007AFF;">{{companyName}}-{{deptName}}</text>
								</view>
							</view>
						</view>

						<!-- 下午打卡 下班打卡-->
						<view>
							<view><text class="subtitle">下班时间：</text>{{workEnd}}</view>
							<!-- 未打卡 -->
							<view class="radiu" v-if="!ifClockEnd">
								<view class="clockBox" :class="{'clockColor':distance<=range,'clockNo':distance>range}" @tap="clockFuc('1')">
									<text>打卡</text>
								</view>
								<view class="currentTime">{{time}}</view>
							</view>
							<!-- 已打卡 -->
							<view v-else class="textbox">
								<view class="textbox-title">打卡时间：{{closingTime}}</view>
								<view>
									<uni-icons type="location-filled" color="#007AFF" size="20" />
									<text style="color: #007AFF;">{{companyName}}-{{deptName}}</text>
								</view>
							</view>
						</view>
					</block>
				</block>
			</view>
			<!-- <view class="uni-btn-v">
				<button type="primary" @tap="getLocation">获取位置</button>
				<button @tap="clear">清空</button>
			</view> -->
			<uni-popup :show="type === 'showpopup'" mode="fixed" @hidePopup="togglePopup('')">
				<view class="popup-view">
					<text class="popup-title">需要用户授权位置权限</text>
					<view class="uni-flex popup-buttons">
						<button class="uni-flex-item" type="primary" open-type="openSetting" @tap="openSetting">设置</button>
						<button class="uni-flex-item" @tap="togglePopup('')">取消</button>
					</view>
				</view>
			</uni-popup>
			<view id="map">
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import {
		mapState
	} from 'vuex'
	// #ifdef APP-PLUS
	import permision from "@/common/permission.js"
	// #endif

	export default {
		components: {
			uniPopup,
			uniIcons
		},
		data() {
			return {
				id: '0',
				title: 'getLocation',
				hasLocation: false,
				location: {
					lng: 0,
					lat: 0
				},
				type: '',
				//设置
				companyLocation: {
					lng: 118.076981,
					lat: 24.634186
				},
				range: 1000,
				distance: 0,
				//颜色
				clockColor: true,
				//当前时间
				currentTime: service.getDate('dateTime'),
				time: service.getDate('time'),
				//打卡时间
				workTime: '',
				closingTime: '',
				//上班时间
				workStart: '',
				workStart1: '',
				workEnd: '',
				workEnd1: '',
				ifClockStart: false,
				ifClockStart1: false,
				ifClockEnd: false,
				ifClockEnd1: false,
				clockSet: false,
				// 是否有权限配置打卡参数
				ifClockSetPemi: false,
				// 打卡次数
				punchTimes: null,
				// 早上下班时间
				morningOffTime: '',
				// 下午上班时间
				afternoonWorkTime: ''
			}
		},
		computed: mapState(['userName', 'deptName', 'companyName', 'companyId', 'deptId', 'name', 'userId', 'hasLogin']),
		onLoad() {
			
			let this_ = this
			this.urlRequestPost('/phoneIndexData', '', null, function(res) {
				for (let i in res.data.menus) {
					if (res.data.menus[i].menuType == 'M' && res.data.menus[i].remark == 'clocksetting') { //配置权限
						this_.ifClockSetPemi = true
					}
				}
			})
			setInterval(this.getLocation, 5000);
			//定时器
			setInterval(() => {
				this.currentTime = service.getDate('dateTime')
				this.time = service.getDate('time')
			}, 1000);

		},
		onReady() {
			this.setting()
		},
		filters: {
			dateFormat(value) {
				return value + ' m '
			}
		},
		methods: {
			//设置的数据
			setting() {
				let this_ = this
				//打卡数据
				 this.urlRequestPost('oa/oaAttendance/selectOaAttendanceByUserId', {
					'userId': this.userId
				}, null, function(res) {
					console.log(res)
					if (res.data.code == 0) {
						if (res.data.data.workTime) {
							this_.ifClockStart = true
							this_.workTime = res.data.data.workTime
						}
						if (res.data.data.closingTime) {
							this_.ifClockEnd = true
							this_.ifClockStart = false
							this_.closingTime = res.data.data.closingTime
						}
						if (res.data.data.morningOffTime) {
							this_.ifClockStart1 = true
							this_.ifClockStart = false
							this_.morningOffTime = res.data.data.morningOffTime
						}
						if (res.data.data.afternoonWorkTime) {
							this_.ifClockEnd1 = true
							this_.ifClockStart = false
							this_.afternoonWorkTime = res.data.data.afternoonWorkTime
						}
						this_.id = res.data.data.id
					} else {
						uni.showToast({
							icon: 'none',
							title: '数据出错哦~',
						});
					}
				})
				// 设置参数
				 this.urlRequestPost('oa/oaAttendanceConfig/list', {
					'companyId': this.companyId
				}, null, function(res) {
					if (res.data.rows && res.data.rows.length != 0) {
						this_.companyLocation.lng = res.data.rows[0].longitude
						this_.companyLocation.lat = res.data.rows[0].latitude
						this_.range = res.data.rows[0].distance
						this_.workStart = res.data.rows[0].workTime
						this_.workEnd = res.data.rows[0].offTime
						this_.clockSet = true
						this_.punchTimes = res.data.rows[0].punchTimes
						this_.workStart1 = res.data.rows[0].morningOffTime
						this_.workEnd1 = res.data.rows[0].afternoonWorkTime
					}
					this_.getLocation()
				})
			},
			//打卡
			clockFuc(flag) { //flag 标记（0上班打卡，1下班打卡，2更新下班打卡，3上午下班，4下班打卡）
				uni.showLoading({
					title: '正在打卡~'
				});
				let this_ = this
				let clockData = {}
				clockData.companyId = this.companyId
				clockData.deptId = this.deptId
				clockData.userId = this.userId
				clockData.distance = this.distance
				clockData.longitude = this.location.lng
				clockData.latitude = this.location.lat
				clockData.flag = flag
				let url = ''
				switch (flag) {
					case '0':
						clockData.workTime = this.currentTime
						url = 'oa/oaAttendance/add'
						break;
					case '1':
						clockData.id = this.id
						clockData.closingTime = this.currentTime
						url = 'oa/oaAttendance/edit'
						break;
					case '3':
						clockData.id = this.id
						clockData.morningOffTime = this.currentTime
						url = 'oa/oaAttendance/edit'
						break;
					case '4':
						clockData.id = this.id
						clockData.afternoonWorkTime = this.currentTime
						url = 'oa/oaAttendance/edit'
						break;
				}
				if (this.distance > this.range||this.ifClockEnd||this.ifClockEnd1||this.ifClockStart1) {
					uni.showToast({
						icon: 'none',
						title: '未到指定打卡范围内！不能打卡哦~',
					});
				} else {
					this.urlRequestPost(url, clockData, null, function(res) {
						uni.hideLoading();
						if (res.data.code == '0') {
							uni.showToast({
								icon: 'none',
								title: '打卡成功',
							})
							switch (flag) {
								case '0': //上午上班打卡成功
									this_.ifClockStart = true
									this_.workTime = res.data.data.workTime
									this_.id = res.data.data.id
									console.log(res.data.data.id)
									break
								case '1': //下午下班打卡成功
									this_.ifClockEnd = true
									this_.ifClockStart = false
									this_.id = res.data.data.id
									this_.closingTime = res.data.data.closingTime
									break
								case '3': //上午下班打卡成功
									this_.ifClockStart1 = true
									this_.ifClockStart = false
									this_.id = res.data.data.id
									this_.morningOffTime = res.data.data.morningOffTime
									break
								case '4': //下午下班打卡成功
									this_.ifClockEnd1 = true
									this_.ifClockStart = false
									this_.afternoonWorkTime = res.data.data.afternoonWorkTime
									break
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.msg,
							})
						}

					})
				}

			},
			//弹窗
			togglePopup(type) {
				this.type = type;
			},
			showConfirm() {
				this.type = 'showpopup';
			},
			hideConfirm() {
				this.type = '';
			},
			async getLocation() {
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				if (status !== 1) {
					return;
				}
				// #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ
				let status = await this.getSetting();
				if (status === 2) {
					this.showConfirm();
					return;
				}
				// #endif

				this.doGetLocation();
			},
			doGetLocation() {
				uni.getLocation({
					'type': 'wgs84',
					'geocode': true,
					success: (res) => {
						this.hasLocation = true;
						//当前位置
						this.location.lng = res.longitude
						this.location.lat = res.latitude
						let map = new plus.maps.Map("map");
						let this_ = this
						plus.maps.Map.calculateDistance(new plus.maps.Point(this_.location.lng, this_.location.lat), new plus.maps.Point(
							this_.companyLocation.lng, this_.companyLocation.lat), function(event) {
							this_.distance = event.distance.toFixed(2); // 转换后的距离值
						}, function(e) {});
						// map.getUserLocation(function(state, point){
						// 	console.log(point)
						// 	this_.location.lng=point.longitude
						// 	this_.location.lat=point.latitude
						// 	plus.maps.Map.calculateDistance(new plus.maps.Point(this_.location.lng,this_.location.lat),new plus.maps.Point(this_.companyLocation.lng,this_.companyLocation.lat),function(event){
						// 			this_.distance = event.distance;  // 转换后的距离值
						// 		},function(e){
						// 	});
						// });
						// 获取距离 m
					},
					fail: (err) => {
						// #ifdef MP-BAIDU
						if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
							this.showConfirm();
						}
						// #endif
						// #ifndef MP-BAIDU
						if (err.errMsg.indexOf("auth deny") >= 0) {
							uni.showToast({
								title: "访问位置被拒绝"
							})
						} else {
							uni.showToast({
								title: '位置+' + err.errMsg
							})
						}
						// #endif
					}
				})
			},
			getSetting: function() {
				return new Promise((resolve, reject) => {
					uni.getSetting({
						success: (res) => {
							if (res.authSetting['scope.userLocation'] === undefined) {
								resolve(0);
								return;
							}
							if (res.authSetting['scope.userLocation']) {
								resolve(1);
							} else {
								resolve(2);
							}
						}
					});
				});
			},
			openSetting: function() {
				this.hideConfirm();
				uni.openSetting({
					success: (res) => {
						if (res.authSetting && res.authSetting['scope.userLocation']) {
							this.doGetLocation();
						}
					},
					fail: (err) => {}
				})
			},
			async checkPermission() {
				let status = permision.isIOS ? await permision.requestIOS('location') :
					await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');

				if (status === null || status === 1) {
					status = 1;
				} else if (status === 2) {
					uni.showModal({
						content: "系统定位已关闭",
						confirmText: "确定",
						showCancel: false,
						success: function(res) {}
					})
				} else if (status.code) {
					uni.showModal({
						content: status.message
					})
				} else {
					uni.showModal({
						content: "需要定位权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}

				return status;
			},
			clear: function() {
				this.hasLocation = false
			}
		}
	}
</script>

<style>
	@import url("../../common/myFont.css");

	/* 顶部打卡样式 */
	.top-nav {
		padding: 20upx 35upx;
		border-bottom: 1upx solid #EEEEEE;
	}

	.iconfont {
		margin-right: 10upx;
	}

	.clockSet {
		text-align: center;
	}

	.clockSet_icon {
		display: block;
		font-size: 150upx;
		color: #e1e1e1;
		margin: 0 auto;
		margin-top: 150upx;
	}

	.clockSet_text {
		display: block;
		color: #bcbcbc;
	}

	/* 设置 */
	.setClock {
		padding: 20upx 35upx;
		border-bottom: 1upx solid #EEEEEE;
		color: #3B4144;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.subtitle {
		color: #888888;
	}

	.currentTime {
		text-align: center;
	}

	.textbox {
		padding: 20upx 45upx;
		margin-bottom: 20upx;
	}

	.textbox-title {
		font-size: 36upx;
	}

	/* 提示框 */
	.popup-view {
		width: 500rpx;
	}

	.popup-title {
		font-size: 28upx;
		display: block;
		margin-bottom: 10px;
		text-align: center;
	}

	.popup-buttons button {
		margin-left: 4px;
		margin-right: 4px;
	}

	/* 打卡 */
	.radiu {
		margin-bottom: 100upx;
		color: #888888;
	}

	.clockBox {
		margin: 0 auto;
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		color: #FFFFFF;
		line-height: 200upx;
		text-align: center;
		font-size: 32upx;
		box-shadow: 8upx 13upx 8upx #999999;
		margin-bottom: 20upx;
	}

	.clockColor {
		background-color: #007AFF;
	}

	.clockNo {
		background-color: #B2B2B2;
	}
	.block-clock{
		background-color: #EEEEEE;
	}
</style>
