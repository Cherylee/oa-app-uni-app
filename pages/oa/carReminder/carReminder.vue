<template>
	<view class="carReminder">
		<view>
			<view class="title">选择提醒人</view>
			<user-picker class="carReminder-user" @getUserList="getUserList" @getHeight="getHeight" :setUserList="userIdList" :setDisabled="disabled"></user-picker>
		</view>
		<view class="title">
			提醒人员
		</view>
		<scroll-view class="uni-list" :style="{height:scrollHeight+'upx'}" enableBackToTop="true" scroll-y="true">
			<view v-for="(item,index) in userIdList" :key="item.deptId">
				<view class="companyName">
					{{item.companyName}}>{{item.deptName}}
				</view>

				<view class="userNameList">
					<view v-for="(user,userIndex) in item.userNameList" :key="user" class="userName">
						{{user}}
					</view>
				</view>

			</view>
		</scroll-view>

		<view class="clockBox clockBox1 clockColor"  @click="updateSturs(1)">
			现在出发
		</view>
		<view class="clockBox clockBox2 clockColor"  @click="updateSturs(2)">
			{{content}}
		</view>
	</view>
</template>

<script>
	import userPicker from '@/components/user-picker/user-picker.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		components: {

			userPicker
		},
		data() {
			return {
				url:'oa/mail/userCarSendMail',
				data:{
					userIdList:[],
					flag:'',
				},
				user: {},
				userIdList: [],
				scrollHeight: '',
				//倒计时参数
				totalTime: 120,
				content: '我已到达',
				canClick: true,
				disabled:false,
			}
		},

		onLoad() {
			const this_ = this

		},
		methods: {
			getUserList: function(res) {
				if (this.userIdList.length == 0) {
					this.userIdList.push(res)
				}
				var result = this.userIdList.some(item => {
					if (item.deptId == res.deptId) {
						return true
					}
				})
				if (result) {
					for (var i in this.userIdList) {
						if (this.userIdList[i].deptId == res.deptId) {
							this.userIdList[i].userIdList = res.userIdList
							this.userIdList[i].userNameList = res.userNameList
							if(res.userIdList.length==0){
								this.userIdList.splice(i,1)
							}
						}
					}
				} else {
					this.userIdList.push(res)
				}
			},
			getHeight: function(res) {
				const this_ = this
				var number = res
				uni.getSystemInfo({
					success: function(ress) {
						this_.scrollHeight = (ress.windowHeight - 280 - parseInt(number) / 2) * 2
					}
				});
			},
			updateSturs(number) {
				if(number==1){
					this.disabled=true
					var arry = []
					for(var i in this.userIdList){
						arry = arry.concat(this.userIdList[i].userIdList)
					}
					this.data.userIdList = arry
					this.data.flag=0
					this.urlRequestPost(this.url,this.data,'application/json;charset=UTF-8',function(res){
						
					})
				}else if(number==2){
					if(this.canClick){
						var arry = []
						for(var i in this.userIdList){
							arry = arry.concat(this.userIdList[i].userIdList)
						}
						this.data.userIdList = arry
						this.data.flag=1
						this.urlRequestPost(this.url,this.data,'application/json;charset=UTF-8',function(res){
							
						})
					}
					this.daojishi(1)
					
				}
			},
			daojishi(num){
				if (!this.canClick) return
				this.canClick = false
				this.content = this.totalTime + 's'
				var clock = setInterval(() => {
						this.totalTime--
						this.content = this.totalTime + 's'
					if (this.totalTime < 0) {
						clearInterval(clock)
						this.content = '我已到达'
						this.totalTime = 120
						this.canClick = true //这里重新开启
					}
				}, 1000)
			}
		}
	}
</script>

<style>
	.clockBox {

		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		color: #FFFFFF;
		line-height: 200upx;
		text-align: center;
		font-size: 32upx;
		box-shadow: 8upx 13upx 8upx #999999;
		margin-bottom: 20upx;
		margin-top: 20upx;
	}

	.clockColor {
		background-color: #007AFF;
	}

	.clockColor2 {
		background-color: #B2B2B2;
	}

	.clockBox1 {
		float: left;
		margin-left: 80upx;
	}

	.clockBox2 {
		float: right;
		margin-right: 80upx;
	}

	.title {
		width: 100%;
		text-align: center;
		padding-top: 10upx;

	}

	.carReminder-user {
		width: 100%;
	}

	.bottom-button {
		position: fixed;
		width: 90%;
		left: 5%;
		bottom: 30upx;
		text-align: center;
		height: 80upx;
		color: #FFFFFF;
		line-height: 80upx;
		font-size: 32upx;
		margin: 0 auto;
		border-radius: 80upx;

	}

	.bottom-button-action1 {
		background-color: #ed5565;
	}

	.bottom-button-action2 {
		background-color: #B2B2B2;
	}

	.companyName {
		float: left;
		font-weight: bold;
		margin-left: 20upx;
		width: 100%;
	}

	.userNameList {
		margin-left: 30upx;
		font-weight: normal;

	}

	.userName {
		float: left;
		margin-left: 20upx;
	}
</style>
