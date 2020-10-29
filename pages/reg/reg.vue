<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">昵称：</text>
				<m-input type="text" focus  v-model="userName" placeholder="请输入姓名"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input type="text" focus  v-model="loginName" placeholder="请输入账号,账号格式为英文字母"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				userName:'',
				loginName: '',
				password: ''
			}
		},
		methods: {
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.userName.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '昵称最短为 3 个字符'
					});
					return;
				}
				if (this.loginName.length < 5) {
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

				const data = {
						userName: this.userName,
						loginName: this.loginName,
						password: this.password
					
				}

				this.urlRequestPost('system/user/register', data, 'application/json;charset=UTF-8', function(res) {
					if (res.data.code == '0') {
						uni.showLoading({
						    title: '注册成功'
						});
						setTimeout(function () {
						    uni.hideLoading();
							uni.reLaunch({
							    url: '/pages/login/login'
							});
						}, 2000);
						
						
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg,
						});
					}
				})


			}
		}
	}
</script>

<style>

</style>
