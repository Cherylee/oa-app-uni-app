<template>
	<view class="uni-common-mt">
		<form>
			<input class="hidden" v-model="formData.id" />
			<view class="uni-form-item uni-row">
				<view class="title">申请人</view>
				<input class="uni-input" v-model="formData.userName" placeholder="申请人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">申请公司</view>
				<d-picker class="uni-input" v-if="formData.companyId" :companyId="formData.companyId" :deptId="formData.deptId" @getDeptV="getDeptV"></d-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目</view>
				<input class="uni-input" @click="togglePopup('center', 'popup')" v-model="formData.projectName" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">预计有效期至</view>
				<e-picker class="uni-input" mode="date" :showValue="formData.expectValidityDate" @change="changeStart">{{formData.expectValidityDate}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">工程所在地</view>
				<input class="uni-input" name="remark" v-model="formData.projectLoc" placeholder="工程所在地" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>开具金额</view>
				<input class="uni-input" @input="Upcase()" placeholder="开具金额" v-model="formData.amount" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>开具金额大写</view>
				<input class="uni-input" disabled v-model="formData.moneyUpper" placeholder="开具金额大写" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目竣工验收日期</view>
				<e-picker class="uni-input" mode="date" :showValue="formData.projectCompleteDate" @change="changeEnd">{{formData.projectCompleteDate}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目结算审计日期</view>
				<e-picker class="uni-input" mode="date" :showValue="formData.projectSettlementDate" @change="changeEnd1">{{formData.projectSettlementDate}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目缺陷责任期</view>
				<input class="uni-input" v-model="formData.projectDefectPeriod" placeholder="项目缺陷责任期" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目负责人</view>
				<input class="uni-input" v-model="formData.projectManager" placeholder="项目负责人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目结算金额</view>
				<input class="uni-input" v-model="formData.projectSettlementAmount" placeholder="项目结算金额" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">项目保修金额</view>
				<input class="uni-input" v-model="formData.projectRepairAmount" placeholder="项目保修金额" />
			</view>

			<uni-uploader :imageList="fileList" :os="os" @attachmentList="getAttachmentList"></uni-uploader>

			<view class="button-sp-area">
				<button class="mini-btn" type="info" size="mini" :loading="loading1" @click="submit('0')" v-if="formData.status=='99'||formData.status==''">保存草稿</button>
				<button class="mini-btn" type="primary" @click="submit('1')" :loading="loading2" v-if="formData.status=='99'||formData.status==''"
				 size="mini">提交</button>
				<button class="mini-btn" type="primary" @click="submit('2')" v-if="formData.status=='3'" size="mini">提交</button>
				<button class="mini-btn cui-btn-2" type="info" :loading="loading3" @click="urge()" v-if="formData.status!=''&&formData.status!='2'&&formData.status!='16'&&formData.status!='99'"
				 size="mini">催办</button>
				<button class="mini-btn cui-btn-1" type="info" v-if="formData.status!='99'&&formData.status!=''" size="mini" @click="send()">抄送</button>
			</view>
			<uni-process :baseUrl="baseUrl" :procInstId="procInstId" :mid="mid" v-if="edit=='1'&&procInstId"></uni-process>
		</form>
		<!-- 项目弹框 popupData-->
		<uni-popup :show="showpopup" :type="type" :mask-click="false">
			<uni-relation-popup :setPopup="popupData" @getData="getData" @popupState="popupState"></uni-relation-popup>
		</uni-popup>
	</view>

</template>

<script>
	import service from '@/service.js';
	import graceChecker from '@/common/graceChecker.js'
	import ePicker from '@/components/e-picker/e-picker.vue';
	import dPicker from '@/components/d-picker/d-picker.vue';
	import permision from "@/common/permission.js";
	import uniProcess from '@/components/uni-processList/nui-processList.vue';
	import upload from '@/components/uni-uploader/uni-uploader.vue';
	import uniRelationPopup from '@/components/uni-relation-popup/uni-relation-popup.vue';
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			ePicker,
			uniProcess,
			upload,
			dPicker,
			uniRelationPopup
		},
		data() {
			return {
				mid: '',
				edit: '0',
				user: {},
				os: false,
				formData: {
					id: '',
					userName: '',
					projectId: '',
					projectName: '',
					companyId: '',
					companyName: '',
					deptId: '',
					deptName: '',
					expectValidityDate: service.getDate('date'),
					amount: 0,
					moneyUpper: '',
					projectLoc: '',
					projectCompleteDate: service.getDate('date'),
					projectSettlementDate: service.getDate('date'),
					projectDefectPeriod: '',
					projectManager: '',
					projectSettlementAmount: '',
					projectRepairAmount: '',
					remark: '',
					status: ''
				},
				baseUrl: 'oa/sysProRepairMoney',
				addUrl: 'oa/sysProRepairMoney/add',
				saveUrl: 'oa/sysProRepairMoney/saveDraft',
				editUrl: 'oa/sysProRepairMoney/submitDraft',
				flag: false,
				index: 0,
				dateStart: service.getDate('dateTime'),
				loading1: false,
				loading2: false,
				loading3: false,
				procInstId: '',
				// //附件
				fileList: [],
				attachmentList: [],

				// 弹框
				type: '',
				showpopup: false,
				// 合同弹框
				popupData: {
					'titile': '工程',
					'selectType': 'radio',
					'url': 'oa/oaProject/phoneList',
					'popupType': 'project'
				}
			}
		},
		computed: mapState(['name', 'deptId', 'companyId', 'hasLogin']),
		onLoad(e) {
			this.edit = e.edit || '0'
			this.mid = e.id || ''
			let this_ = this
			//用户信息
			if (this.edit == '0') {
				this.$set(this.formData, 'userName', this.name)
				this.$set(this.formData, 'companyId', this.companyId)
				this.$set(this.formData, 'deptId', this.deptId)
			}
			//编辑页面信息
			if (this.edit == '1') {
				this.urlRequestGet(this.baseUrl + '/phoneEdit/' + this.mid, 'text/html;charset=UTF-8', function(res) {
					console.log(res)
					service.listAssign(this_.formData, res.data)
					this_.procInstId = res.data.procInstId
				})

				//图片返显
				this.urlRequestPost('oa/oaAttachment/selectAttachByObjectId', {
					"objId": this.mid
				}, null, function(res) {
					for (let i in res.data.data) {
						this_.fileList.push(this_.websiteUrl + res.data.data[i].attachmentName)
						this_.attachmentList.push({
							'objectId': this_.id,
							'attachmentName': res.data.data[i].attachmentName,
							'fileName': res.data.data[i].fileNamess
						})
					}

				})

			}


		},
		methods: {
			// 提交和保存
			submit(flag) {
				let this_ = this
				let url = ''
				let data = {}
				//定义表单规则			
				let rule = [{
						name: "amount",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "金额必填"
					},
					{
						name: "moneyUpper",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "大写必填"
					},
					{
						name: "projectName",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "工程必填"
					}
				];

				data = this.formData
				data.attachmentList = this.attachmentList
				//进行表单检查
				let checkRes = graceChecker.check(this.formData, rule);
				if (checkRes) {
					switch (flag) {
						case '1': //1代表的是提交
							url = this.addUrl
							this.loading2 = true
							break
						case '0': //0代表的是保存
							url = this.saveUrl
							this.loading1 = true
							break
						case '2': 
							url = this.editUrl
							this.loading1 = true
							break
					}
					this.urlRequestPost(url, data, 'application/json;charset=UTF-8', function(res) {
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
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			//大写转换
			Upcase() {
				let this_ = this
				this.urlRequestGet('common/converMoneyToCN/' + this.formData.amount, null, function(res) {
					this_.$set(this_.formData, 'moneyUpper', res.data.msg)
				})
			},
			// 弹框
			togglePopup(type, open, flag) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break
					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.popupData.titile = '工程'
				this.popupData.selectType = 'radio'
				this.popupData.url = 'oa/oaProject/phoneList'
				this.popupData.popupType = 'project'

				this.type = type
				this['show' + open] = true
			},
			//取消弹窗
			cancel(type, flag) {
				this['show' + type] = false
			},
			//弹窗变动监听
			change(e) {
				if (!e.show) {
					this.showdetail = false
				}
			},
			//部门回传
			getDeptV(res) {
				this.formData.deptId = res.deptId
				this.formData.companyId = res.companyId
			},
			// 附件回传
			getAttachmentList(res) {
				this.attachmentList = res
			},
			// 合同回传
			getData(res) {
				if (res[0].popupType) {
					this.$set(this.formData, 'projectId', res[0].id)
					this.$set(this.formData, 'projectName', res[0].projectName)
				}
			},
			popupState(res) {
				this.showpopup = res
			},
			changeStart: function(e) {
				this.formData.expectValidityDate = e
			},
			changeEnd: function(e) {
				this.formData.projectCompleteDate = e
			},
			changeEnd1: function(e) {
				this.formData.projectSettlementDate = e
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
