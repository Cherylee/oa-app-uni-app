<template>
	<view class="uni-common-mt">
		<form>
			<input class="hidden" v-model="formData.id" />
			<view class="uni-form-item uni-row">
				<view class="title">项目</view>
				<input class="uni-input" disabled="disabled" v-model="formData.projectName" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目规模</view>
				<input class="uni-input" v-model="formData.projectScale" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目编号</view>
				<input class="uni-input" disabled="disabled" v-model="formData.code" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">投标公告网址</view>
				<input class="uni-input" disabled="disabled" v-model="formData.tenderDoc" placeholder="投标公告网址" v-on:click="goWebview(formData.tenderDoc)" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">工程类型</view>
				<picker class="picker" @change="bindPickerChange1" :value="p_index" :range="proType" range-key="dictLabel">
					<view class="uni-input">{{(proType[p_index]?proType[p_index]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">建设单位</view>
				<input class="uni-input" v-model="formData.constructUnit" placeholder="建设单位" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">代建单位</view>
				<input class="uni-input" v-model="formData.replaceUnit" placeholder="代建单位" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">建设地点</view>
				<input class="uni-input" v-model="formData.constructionLoc" placeholder="建设地点" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">工期</view>
				<input class="uni-input" v-model="formData.timeLimit" placeholder="工期" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">投资总额</view>
				<input class="uni-input" v-model="formData.investAmount" placeholder="投资总额" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">建安费</view>
				<input class="uni-input" v-model="formData.biddingDesignCost" placeholder="建安费" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">招标内容</view>
				<input class="uni-input" v-model="formData.projectDesc" placeholder="招标内容" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">资质要求</view>
				<input class="uni-input" v-model="formData.qualifications" placeholder="资质要求" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">业绩要求</view>
				<input class="uni-input" v-model="formData.kpiRequire" placeholder="业绩要求" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">评标办法</view>
				<input class="uni-input" v-model="formData.evaluationMethod" placeholder="评标办法" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">投标保证金</view>
				<input class="uni-input" v-model="formData.deposit" placeholder="投标保证金" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">保证金提交截止时间</view>
				<e-picker class="uni-input" mode="date" :showValue="formData.depositSubmitDate" @change="changeStart">{{formData.depositSubmitDate}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">投标文件递交截止时间</view>
				<e-picker class="uni-input" mode="date" :showValue="formData.filesSubmitDate" @change="changeEnd">{{formData.filesSubmitDate}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>开标时间</view>
				<e-picker class="uni-input" mode="date" :showValue="formData.openTenderDate" @change="changeEnd1">{{formData.openTenderDate}}</e-picker>
			</view>

			<view class="uni-form-item uni-row">
				<view class="title">开标地点</view>
				<input class="uni-input" v-model="formData.biddingPlace" placeholder="开标地点" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">开标方式</view>
				<picker class="picker" @change="bindPickerChange2" :value="b_index" :range="biddingWay" range-key="dictLabel">
					<view class="uni-input">{{(biddingWay[b_index]?biddingWay[b_index]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目负责人要求</view>
				<m-picker class="uni-input"  :subName="formData.builderName" :edit="edit" @getDeptV="getDeptV"></m-picker>
				<!-- <input class="uni-input" v-model="formData.projectDefectPeriod" placeholder="项目负责人要求" /> -->
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">投标方式</view>
				<picker class="picker" @change="bindPickerChange3" :value="t_index" :range="tenderType" range-key="dictLabel">
					<view class="uni-input">{{(tenderType[t_index]?tenderType[t_index]:{}).dictLabel}}</view>
				</picker>
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
					projectName: '',
					projectScale: '',
					code: '',
					projectId: '',
					biddingInfoId: '',
					tenderDoc: '',
					proType: 0,
					constructUnit: '',
					replaceUnit: '',
					constructionLoc: '',
					timeLimit: '',
					investAmount: 0,
					biddingDesignCost: '',
					projectDesc: '',
					qualifications: '',
					kpiRequire: '',
					evaluationMethod: '',
					deposit: '',
					depositSubmitDate: service.getDate('date'),
					filesSubmitDate: service.getDate('date'),
					openTenderDate: service.getDate('date'),
					biddingPlace: '',
					biddingWay: '',
					projectDefectPeriod: '',
					builderId: '',
					builderName: null,
					tenderType: 0,
					remark: '',
					status: ''
				},
				baseUrl: 'business/jyTender',
				addUrl: 'business/jyTender/add',
				saveUrl: 'business/jyTender/saveDraft',
				editUrl:'business/jyTender/edit',
				flag: false,
				index: 0,
				dateStart: service.getDate('dateTime'),
				loading1: false,
				loading2: false,
				loading3: false,
				procInstId: '',
				// 字典
				proType: [],
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
			this.mid = e.id || ''
			let this_ = this
			this.urlRequestGet('business/jyTender/phoneAdd/' + this.mid, null, function(res) {
				console.log(res)
				if (res.data) {
					this_.formData.projectName = res.data.projName||''
					this_.formData.code = res.data.tenderProjCode||''
					this_.formData.projectId = res.data.bid||''
					this_.formData.tenderDoc = res.data.detailUrl||''
				}

			})
			//字典
			this.dictValue('business_engineer_type').then(res => {
				this_.proType = res.data
			})
			this.dictValue('bidding_way').then(res => {
				this_.biddingWay = res.data
			})
			this.dictValue('business_project_type').then(res => {
				this_.tenderType = res.data
			})
			//编辑页面信息
			if (this.edit == '1') {
				this.urlRequestGet(this.baseUrl + '/phoneEdit/' + this.mid, 'text/html;charset=UTF-8', function(res) {
					console.log(res)
					service.listAssign(this_.formData, res.data)
					this_.p_index=this_.returnIndex(this_.proType,this_.formData.proType)
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
				    case '0'://0代表的是保存
					     url=this.saveUrl
						 this.loading1=true
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
						uni.reLaunch({
							url: '../../start/start'
						});
					}
				})

			},
			goWebview(url) {
				uni.navigateTo({
					url: "../tenderAnment/tenderContent/tenderWebview?url=" + url
				})
			},
			//回传
			getDeptV(res) {
				this.formData.builderId = res.subId
				this.formData.builderName = res.subName
			},
			bindPickerChange1(e) {
				this.p_index = e.detail.value
				this.formData.proType = this.proType[this.p_index].dictValue
			},
			bindPickerChange2(e) {
				this.b_index = e.detail.value
				this.formData.biddingWay = this.biddingWay[this.b_index].dictValue
			},
			bindPickerChange3(e) {
				this.t_index = e.detail.value
				this.formData.tenderType = this.tenderType[this.t_index].dictValue
			},
			changeStart: function(e) {
				this.formData.depositSubmitDate = e
			},
			changeEnd: function(e) {
				this.formData.filesSubmitDate = e
			},
			changeEnd1: function(e) {
				this.formData.openTenderDate = e
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
