<template>
	<view class="uni-common-mt">
		<form>
			<input class="hidden" v-model="formData.id" v-if="edit=='1'" />
			<view class="uni-form-item uni-row">
				<view class="title">申请公司</view>
				<input class="" class="uni-input" name="companyName" v-model="companyName">
				<!-- <picker  class="picker" mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
					<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
				</picker> -->
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>打卡次数</view>
				<view class="uni-input">
					<picker class="picker" mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<text>{{multiArray[0][multiIndex[0]]}}</text>
					</picker>
				</view>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>上午：上班时间</view>
				<e-picker class="uni-input" mode="time" :showValue="(formData.workTime?formData.workTime:dateStart)" @change="changeStart">{{(formData.workTime?formData.workTime:dateStart)}}</e-picker>
				<!-- <input class="uni-input" name="goOutStart" focus placeholder="外出起始时间" /> -->
			</view>
			<view class="uni-form-item uni-row" v-if="multiArray[0][multiIndex[0]]==4">
				<view class="title">上午：下班时间</view>
				<e-picker class="uni-input" mode="time" :showValue="(formData.morningOffTime?formData.morningOffTime:dateStart)"
				 @change="changeStart1">{{(formData.morningOffTime?formData.morningOffTime:dateStart)}}</e-picker>
				<!-- <input class="uni-input" name="goOutStart" focus placeholder="外出起始时间" /> -->
			</view>
			<view class="uni-form-item uni-row" v-if="multiArray[0][multiIndex[0]]==3||multiArray[0][multiIndex[0]]==4">
				<view class="title">下午：上班时间</view>
				<e-picker class="uni-input" mode="time" :showValue="(formData.afternoonWorkTime?formData.afternoonWorkTime:dateEnd)"
				 @change="changeEnd1">{{(formData.afternoonWorkTime?formData.afternoonWorkTime:dateEnd)}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>下午：下班时间</view>
				<e-picker class="uni-input" mode="time" :showValue="(formData.offTime?formData.offTime:dateEnd)" @change="changeEnd">{{(formData.offTime?formData.offTime:dateEnd)}}</e-picker>
			</view>

			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>打卡到公司距离</view>
				<input class="uni-input" name="distance" placeholder="打卡到公司距离" v-model="formData.distance" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">经度</view>
				<input class="uni-input" name="longitude" v-model="formData.longitude" placeholder="经度" @tap="getMap()" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">纬度</view>
				<input class="uni-input" name="latitude" v-model="formData.latitude" placeholder="纬度" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">备注</view>
				<input class="uni-input" name="remark" v-model="formData.remark" placeholder="备注" />
			</view>
			<view class="button-sp-area">
				<button class="mini-btn" type="primary" @click="submit('1')" :loading="loading1" v-if="edit=='0'" size="mini">提交</button>
				<button class="mini-btn" type="primary" @click="submit('2')" :loading="loading2" else size="mini">更新</button>
			</view>
		</form>
	</view>
</template>

<script>
	import service from '@/service.js';
	import graceChecker from '@/common/graceChecker.js'
	import ePicker from '@/components/e-picker/e-picker.vue';
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			ePicker
		},
		data() {
			return {
				id: '',
				edit: '',
				user: {},
				formData: {
					id: '',
					userName: '',
					companyId: '',
					deptId: '',
					workTime: '08:30:00',
					offTime: '17:30:00',
					distance: 0,
					punchTimes: 2,
					morningOffTime: '12:00:00',
					afternoonWorkTime: '14:00:00',
					latitude: '',
					longitude: '',
					remark: ''
				},
				baseUrl: 'oa/oaAttendanceConfig',
				addUrl: 'oa/oaAttendanceConfig/add',
				editUrl: 'oa/oaAttendanceConfig/edit',
				flag: false,
				index: 0,
				date: service.getDate('time'),
				dateStart: service.getDate('time'),
				dateEnd: service.getDate('time'),
				timeLimit: '',
				company: [],
				multiArray: [
					['2', '3', '4'],
				],
				// baseUrlList: ['http://192.168.1.101:8081/',
				// ],
				multiIndex: [0],
				loading1: false,
				loading2: false,
				loading3: false,
				procInstId: ''
			}
		},
		computed: mapState(['name', 'deptId', 'companyId', 'companyName', 'hasLogin']),
		onLoad(e) {
			this.edit = e.edit || ''
			this.id = e.id || ''
			let this_ = this
			//编辑页面信息
			if (this.edit == '1') {
				this.urlRequestGet(this.baseUrl + '/detail/' + this.id, 'text/html;charset=UTF-8', function(res) {
					console.log(res)
					service.listAssign(this_.formData, res.data)
					var index = this_.getIndex(this_.multiArray[0],this_.formData.punchTimes)
					console.log(index)
					this_.multiIndex[0] = index
					// this_.multiArray[0][this_.multiIndex[0]] = this_.formData.punchTimes
				})
			}

		},
		onReady() {
			let this_ = this
		},
		methods: {
			getIndex(arr, item) {
				for (var i in arr) {
					if (arr[i] == item) {
						return i;
					};
				};
			},
			//地图
			getMap() {
				var this_ = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						this_.formData.longitude = res.longitude
						this_.formData.latitude = res.latitude
					}
				});
			},
			// 提交和保存
			submit(flag) {
				this.formData.deptId = this.deptId
				this.formData.companyId = this.companyId
				let this_ = this
				//定义表单规则			
				let rule = [{
						name: "distance",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "打卡距离必填"
					},
					{
						name: "latitude",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "纬度必填"
					},
					{
						name: "longitude",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "经度必填"
					},
					{
						name: "punchTimes",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "打卡次数必填"
					}
				];
				let url = ''
				switch (flag) {
					case '1':
						url = this.addUrl
						break
					case '2':
						url = this.editUrl
						break
				}
				//进行表单检查
				let checkRes = graceChecker.check(this.formData, rule);
				if (checkRes) {
					this.urlRequestPost(url, this.formData, null, function(res) {
						this_.loading1 = false
						this_.loading2 = false
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
						if (res.data.code == '0') {
							uni.reLaunch({
								url: '../clock/clock'
							});
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			changeStart: function(e) {
				this.formData.workTime = e
				this.showValue = e
				this.dateStart = e
			},
			changeStart1: function(e) {
				this.formData.morningOffTime = e
				this.showValue = e
				this.dateStart = e
			},
			changeEnd: function(e) {
				this.formData.offTime = e
				this.showValue = e
				this.dateEnd = e
			},
			changeEnd1: function(e) {
				this.formData.afternoonWorkTime = e
				this.showValue = e
				this.dateEnd = e
			},
			bindMultiPickerColumnChange(e) {
				this.multiIndex[e.detail.column] = e.detail.value
				this.formData.punchTimes = this.multiArray[0][this.multiIndex[0]]
				this.$forceUpdate()
			}
		}
	}
</script>

<style>
	@import url("../../static/css/oa.css");
</style>
