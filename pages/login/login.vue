<template>
	<view class="content">
		<view class="icon-top">
			<i class="iconfont  icon-oabangong-copy"></i>
			<text class="text">施工单位办公管理系统</text>
		</view>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">公司：</text>
				<view class="m-input" >
					<picker class="picker" mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex"
					 :range="multiArray">
						<text style="line-height: 2.8em;">{{multiArray[0][multiIndex[0]]}}</text>
					</picker>
				</view>
				
			</view>
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
			<view class="res-right">没有账号？前往<text class="res-color" @tap="gotoReg">注册</text></view>
		</view>

		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '@/components/m-input.vue'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				multiArray: [
					['百川'],
				],
				baseUrlList: ['http://120.25.218.210:8084/ruoyi-admin/',
				],
				// baseUrlList: ['http://192.168.1.107:8081/',
				// ],
				multiIndex: [0],
				baseUrl:'http://192.168.1.101:8081/'
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			...mapMutations(['userINFO']),
			bindMultiPickerColumnChange(e) {
				this.multiIndex[e.detail.column] = e.detail.value
				this.$member.setMemberObj(this.baseUrlList[e.detail.value])
				this.$forceUpdate()
			},
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			gotoReg() {
				uni.reLaunch({
					url: '/pages/reg/reg'
				});
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					username: this.account,
					password: this.password,
					rememberMe: true
				};
				const this_ = this
				this.urlRequestPost('/login', data, null, function(res) {
					if (res.data.code == '0') {
						this_.toMain(data);
						this_.urlRequestPost('/phoneIndexData', '', null, function(res) {
							if (res.statusCode = '200') {
								let user = {
									companyId: res.data.user.company.deptId,
									companyName: res.data.user.company.deptName,
									deptId: res.data.user.deptId,
									deptName: res.data.user.dept.deptName,
									name: res.data.user.userName,
									userId: res.data.user.userId
								}
								this_.userINFO(user)
							}

						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg,
						});
					}
				})

			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							}
						});
					},
					fail: (err) => {}
				});
			},
			toMain(user) {
				
				this.login(user);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				uni.reLaunch({
					url: '../index/index'
				});

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
		}
	}
</script>

<style>
	@import url("../../common/myFont.css");

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}

	.icon-top {
		text-align: center;
	}

	.iconfont {
		font-size: 180upx;
		color: #0faeff;
		display: block;
	}

	.text {
		color: #555555;
		display: block;
		line-height: 35upx;
		font-size: 35upx;
		margin-top: -35upx;
	}

	.res-right {
		text-align: right;
		padding: 15rpx;
	}

	.res-color {
		color: #0FAEFF;
	}
</style>
