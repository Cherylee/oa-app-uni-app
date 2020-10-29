<template>
	<view class="uni-common-mt">
		<form>
			<input class="hidden" v-model="formData.id" />
			<view class="uni-form-item uni-row">
				<view class="title">标题</view>
				<input class="uni-input"  v-model="formData.title" placeholder="标题"/>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目名称</view>
				<input class="uni-input" v-model="formData.projName" placeholder="项目名称"/>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">相关标段包名称</view>
				<input class="uni-input" v-model="formData.bidName" placeholder="相关标段包名称"/>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">招标类型</view>
				<picker class="picker" @change="bindPickerChange1" :value="p_index" :range="tenderProjType" range-key="dictLabel">
					<view class="uni-input">{{(tenderProjType[p_index]?tenderProjType[p_index]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">发布时间</view>
				<e-picker class="uni-input" mode="date" :showValue="formData.sendTime" @change="changeEnd1">{{formData.sendTime}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">招标项目编号</view>
				<input class="uni-input" v-model="formData.tenderProjCode" placeholder="招标项目编号" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">中标人</view>
				<input class="uni-input" v-model="formData.winBidderName" placeholder="中标人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">中标价</view>
				<input class="uni-input" v-model="formData.bidAmount" placeholder="中标价" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">公示类型</view>
				<input class="uni-input" v-model="formData.publicTypeName" placeholder="公示类型" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">详情链接地址</view>
				<input class="uni-input" v-model="formData.detailUrl" placeholder="详情链接地址" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">投标类型</view>
				<picker class="picker" @change="bindPickerChange3" :value="t_index" :range="tenderType" range-key="dictLabel">
					<view class="uni-input">{{(tenderType[t_index]?tenderType[t_index]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">保证金归属人</view>
				<input class="uni-input" v-model="formData.ownerName" placeholder="保证金归属人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">业主</view>
				<input class="uni-input" v-model="formData.tendeRagencyName" placeholder="业主" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">来源平台</view>
				<input class="uni-input" v-model="formData.sourcePlatform" placeholder="来源平台" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">备注</view>
				<input class="uni-input" v-model="formData.remark" placeholder="备注" />
			</view>
		</form>
		<view class="button-sp-area">
			<button class="mini-btn" type="primary" @tap="submit('1')" :loading="loading2" v-if="formData.status=='99'||formData.status==''" size="mini">提交</button>
		    <button class="mini-btn" type="primary" @click="submit('2')" v-if="formData.status=='3'"  :loading="loading1" size="mini">提交</button>
		</view>
		<uni-process :baseUrl="baseUrl" :procInstId="procInstId" :mid="mid" v-if="edit=='1'&&procInstId"></uni-process>

	</view>

</template>

<script>
	import service from '@/service.js';
	import graceChecker from '@/common/graceChecker.js'
	import ePicker from '@/components/e-picker/e-picker.vue';
	import dPicker from '@/components/d-picker/d-picker.vue';
	import mPicker from '@/components/m-picker/m-picker.vue';
	import permision from "@/common/permission.js";
	import uniProcess from '@/components/uni-processList/nui-processList.vue';
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			ePicker,
			uniProcess,
			dPicker,
			mPicker
		},
		data() {
			return {
				mid: '',
				edit: '0',
				user: {},
				os: false,
				formData: {
					id: '',
					title: '',
					projName: '',
					bidName: '',
					tenderProjType: 0,
					sendTime: service.getDate('date'),
					tenderProjCode: '',
					winBidderName: '',
					bidAmount: '',
					publicTypeName: '',
					detailUrl: '',
					tenderType: 0,
					ownerName: '',
					tendeRagencyName: '',
					sourcePlatform: '',
					remark: '',
					status: ''
				},
				baseUrl: 'business/jyConstructInfo',
				addUrl: 'business/jyConstructInfo/add',
				editUrl:'business/jyConstructInfo/edit',
				flag: false,
				index: 0,
				dateStart: service.getDate('dateTime'),
				loading1: false,
				loading2: false,
				loading3: false,
				procInstId: '',
				// 字典
				tenderProjType: [],
				p_index: 0,
				biddingWay: [],
				b_index: 0,
				tenderType: [],
				t_index: 0

			}
		},
		computed: mapState(['name', 'deptId', 'companyId', 'hasLogin']),
		onLoad(e) {
			this.edit = e.edit || '0'
			let this_ = this
			//字典
			this.dictValue('business_engineer_type').then(res => {
				this_.tenderProjType = res.data
			})
			this.dictValue('bidding_way').then(res => {
				this_.publicTypeName = res.data
			})
			this.dictValue('jy_tender_type').then(res => {
				this_.tenderType = res.data
			})
			//编辑页面信息
			if (this.edit == '1') {
				this.urlRequestGet(this.baseUrl + '/phoneEdit/' + this.mid, 'text/html;charset=UTF-8', function(res) {
					console.log(res)
					service.listAssign(this_.formData, res.data)
					this_.p_index=this_.returnIndex(this_.tenderProjType,this_.formData.tenderProjType)
					this_.b_index=this_.returnIndex(this_.biddingWay,this_.formData.biddingWay)
					this_.t_index=this_.returnIndex(this_.tenderType,this_.formData.tenderType)
					this_.procInstId = res.data.procInstId
				})
			}
		},
		methods: {
			// 提交和保存
			submit(flag) {
				let this_ = this
				let data = {}
				data = this.formData
				let url=''
				switch(flag){
					case '1'://1代表的是提交
					     url=this.addUrl
						 this.loading2=true
						 break
					case '2'://2代表的是驳回保存
					     url=this.editUrl
						 this.loading1=true
						 break
				}
				this.urlRequestPost(url, data, null, function(res) {
					this_.loading1 = false
					this_.loading2 = false
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					});
					if (res.data.code == '0') {
						uni.navigateTo({
							url: '../constructInfo/constructInfo'
						});
					}
				})

			},
			bindPickerChange1(e) {
				this.p_index = e.detail.value
				this.formData.tenderProjType = this.tenderProjType[this.p_index].dictValue
			},
			bindPickerChange2(e) {
				this.b_index = e.detail.value
				this.formData.biddingWay = this.biddingWay[this.b_index].dictValue
			},
			bindPickerChange3(e) {
				this.t_index = e.detail.value
				this.formData.tenderType = this.tenderType[this.t_index].dictValue
			},
			
			changeEnd: function(e) {
				this.formData.filesSubmitDate = e
			},
			changeEnd1: function(e) {
				this.formData.sendTime = e
			}
		}
	}
</script>
<style>
	@import url("../../../static/css/oa.css");

	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	}

	.uni-uploader_close {
		position: relative;
	}

	.closeBtn {
		position: absolute;
		top: 0upx;
		right: 0upx;
		width: 40upx;
		height: 45upx;
		background: rgba(255, 255, 255, 0.5);
		text-align: center;
	}
</style>
