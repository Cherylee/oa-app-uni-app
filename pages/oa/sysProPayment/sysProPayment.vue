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
				<view class="title"><span class="red">*</span>项目</view>
				<input class="uni-input" @click="togglePopup('center', 'popup','2')" v-model="formData.projectName" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">支付日期</view>
				<input class="hidden" v-model="formData.payDate" />
				<e-picker class="uni-input" mode="dateTime" :showValue="formData.payDate" @change="changeStart">{{formData.payDate}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>付款金额</view>
				<input class="uni-input" disabled="disabled" placeholder="付款金额" v-model="formData.money" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>金额大写</view>
				<input class="uni-input" disabled v-model="formData.moneyUpcase" placeholder="金额大写" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">付款方</view>
				<input class="uni-input" v-model="formData.drawee" placeholder="付款方" />
			</view>
			<view class="uni-form-item uni-row" v-if="!formData.projectId">
				<view class="title">付款方式</view>
				<picker class="picker" @change="payTypeFunc" :value="index3" :range="payType"
				 range-key="dictLabel">
					<view class="uni-input">{{(payType[index3]?payType[index3]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row" v-if="formData.projectId">
				<view class="title">付款类型</view>
				<picker class="picker" @change="payTypeProjectFunc" :value="index7" :range="payTypeProject"
				 range-key="dictLabel">
					<view class="uni-input">{{(payTypeProject[index7]?payTypeProject[index7]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">到账截止日期</view>
				<e-picker class="uni-input" mode="date" :showValue="formData.expirationDate" @change="changeEnd">{{formData.expirationDate}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">是否代收代付</view>
				<picker class="picker" @change="isAgent" :value="index1" :range="yes_no" range-key="dictLabel">
					<view class="uni-input">{{(yes_no[index1]?yes_no[index1]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">关联收款</view>
				<input class="uni-input" v-model="formData.receivablesName" disabled="true" @click="togglePopup('center', 'popup','1')" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">是否委托关联公司代付</view>
				<picker class="picker" @change="companyPay" :value="index2" :range="yes_no"
				 range-key="dictLabel">
					<view class="uni-input">{{(yes_no[index2]?yes_no[index2]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">备注</view>
				<input class="uni-input" name="remark" v-model="formData.remark" placeholder="备注" />
			</view>

			<uni-uploader :imageList="fileList" :os="os" @attachmentList="getAttachmentList"></uni-uploader>
			<view class="borrow">
				<button class="mini-btn borrowbtn" type="info" @click="togglePopup('center', 'detail','0')">付款明细</button>
				<view v-if="detailList.length!=0" class="borrowBox">
					<view v-for="(item,index) in detailList" :key="index" class="borrowitem">
						<view>付款事由：{{item.paymentReason}}</view>
						<view>付款金额：{{item.money}}</view>
						<view v-if="item.payType">付款类型：{{getDictV(payType1,item.payType)}}</view>
						<view v-if="item.proCategory">工程大类：{{getDictV(proCategory,item.proCategory)}}</view>
						<view v-if="item.detailCategory">工程小类：{{item.detailCategory}}</view>
						<view>收款人：{{item.payee}}</view>
						<view>收款人账号：{{item.payeeAccount}}</view>
						<view>收款人开户行：{{item.payeeOpenBank}}</view>
						<view v-if="details.relationBillType=='0'">欠票金额：{{item.oweBillMoney}}</view>
						<view v-if="details.relationBillType=='0'">收票截止日期：{{item.billExpirationDate}}</view>
						<view v-if="details.relationContractType=='0'">欠合同金额：{{item.oweContractMoney}}</view>
						<view v-if="details.relationContractType=='0'">补合同截止日期：{{item.contractExpirationDate}}</view>
						<view v-if="details.relationBillType=='2'">发票：{{item.relationBillName}}</view>
						<view v-if="details.relationContractType=='2'">合同：{{item.relationContractName}}</view>
						<uni-icons class="btnclose" type="close" color="#cccccc" size="40" @tap="dele(index,'2')" />
					</view>
				</view>
			</view>
			<uni-process :baseUrl="baseUrl" :procInstId="procInstId" :mid="mid" v-if="edit=='1'&&procInstId"></uni-process>
			<view class="button-sp-area">
				<button class="mini-btn" type="info" size="mini" :loading="loading1" @click="submit('0')" v-if="formData.status=='99'||formData.status==''">保存草稿</button>
				<button class="mini-btn" type="primary" @click="submit('1')" :loading="loading2" v-if="formData.status=='99'||formData.status==''"
				 size="mini">提交</button>
				<button class="mini-btn" type="primary" @click="submit('2')" v-if="formData.status=='3'" size="mini">提交</button>
				<button class="mini-btn cui-btn-2" type="info" :loading="loading3" @click="urge()" v-if="formData.status!=''&&formData.status!='2'&&formData.status!='16'&&formData.status!='99'"
				 size="mini">催办</button>
				<button class="mini-btn cui-btn-1" type="info" v-if="formData.status!='99'&&formData.status!=''" size="mini" @click="send()">抄送</button>
			</view>
		</form>

		<!-- 明细弹框 -->
		<uni-popup :show="showdetail" :type="type" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">明细记录</text>
				<scroll-view scroll-y="" class="uni-tip-content uni-tip-content-detail">
					<form>
						<view class="uni-form-item uni-row">
							<view class="title">付款事由</view>
							<input class="uni-input" placeholder="付款事由" v-model="details.paymentReason" />
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">付款金额</view>
							<input class="uni-input" placeholder="付款金额" v-model="details.money" />
						</view>
						<view class="uni-form-item uni-row" v-if="!formData.projectId">
							<view class="title"><span class="red">*</span>付款类型</view>
							<picker class="picker" @change="payType1Func" :value="index4" :range="payType1"
							 range-key="dictLabel">
								<view class="uni-input">{{(payType1[index4]?payType1[index4]:{}).dictLabel}}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-row" v-if="formData.projectId">
							<view class="title"><span class="red">*</span>工程大类</view>
							<picker class="picker" @change="proCategoryFunc" :value="index8" :range="proCategory"
							 range-key="dictLabel">
								<view class="uni-input">{{(proCategory[index8]?proCategory[index8]:{}).dictLabel}}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-row" v-if="formData.projectId">
							<view class="title"><span class="red">*</span>工程小类</view>
							<picker class="picker" @change="detailCategoryFunc" :value="index9" :range="detailCategory"
							 range-key="dictLabel">
								<view class="uni-input">{{(detailCategory[index9]?detailCategory[index9]:{}).dictLabel}}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">收款人</view>
							<input class="uni-input" placeholder="收款人账号" v-model="details.payee" @input="getPayeeList"/>
						</view>
						<scroll-view scroll-y="" style="height: 180upx; text-align: center; background-color: #F7F7F7;" v-if="payeeList.length>0">
							<view v-for="(item,index) in payeeList" :key="index" @click="choicePayee(index)" class="payee-item">
								{{ item.payee }}
							</view>
						</scroll-view>
						<view class="uni-form-item uni-row">
							<view class="title">收款人账号</view>
							<input class="uni-input" placeholder="收款人开户行" v-model="details.payeeAccount" />
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">收款人开户行</view>
							<input class="uni-input" placeholder="收款人账号" v-model="details.payeeOpenBank" />
						</view>
						<view class="uni-form-item uni-row">
							<view class="title"><span class="red">*</span>关联发票</view>
							<picker class="picker" @change="relationBillTypeFunc" :value="index5"
							 :range="relationBillType" range-key="dictLabel">
								<view class="uni-input">{{(relationBillType[index5]?relationBillType[index5]:{}).dictLabel}}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-row" v-if="details.relationBillType=='0'">
							<view class="title">欠票金额</view>
							<input class="uni-input" placeholder="欠票金额" v-model="details.oweBillMoney" />
						</view>
						<view class="uni-form-item uni-row" v-if="details.relationBillType=='0'">
							<view class="title">收票截止日期</view>
							<e-picker class="uni-input" mode="date" :showValue="details.billExpirationDate" @change="changeEnd1">{{details.billExpirationDate}}</e-picker>
						</view>
						<view class="uni-form-item uni-row" v-if="details.relationBillType=='2'">
							<view class="title">发票</view>
							<input class="uni-input" @click="togglePopup('center', 'popup','3')" v-model="details.relationBillName" />
						</view>
						<view class="uni-form-item uni-row">
							<view class="title"><span class="red">*</span>关联合同</view>
							<picker class="picker" @change="relationContractTypeFunc" :value="index6"
							 :range="relationContractType" range-key="dictLabel">
								<view class="uni-input">{{(relationContractType[index6]?relationContractType[index6]:{}).dictLabel}}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-row" v-if="details.relationContractType=='0'">
							<view class="title">欠合同金额</view>
							<input class="uni-input" placeholder="欠合同金额" v-model="details.oweContractMoney" />
						</view>
						<view class="uni-form-item uni-row" v-if="details.relationContractType=='0'">
							<view class="title">补合同截止日期</view>
							<e-picker class="uni-input" mode="date" :showValue="details.contractExpirationDate" @change="changeEnd1">{{details.billExpirationDate}}</e-picker>
						</view>
						<view class="uni-form-item uni-row" v-if="details.relationContractType=='2'">
							<view class="title">合同</view>
							<input class="uni-input" @click="togglePopup('center', 'popup','4')" v-model="details.relationContractName" />
						</view>
					</form>
				</scroll-view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @tap="cancel('detail')">取消</text>
					<text class="uni-tip-button" @tap="cancel('detail','1')">确定</text>
				</view>
			</view>
		</uni-popup>
		<!-- 合同&&项目弹框 popupData-->
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
					payDate: service.getDate('dateTime'),
					money: 0,
					moneyUpcase: '',
					drawee: '',
					payType: '',
					expirationDate: service.getDate('date'),
					isAgent: 0,
					receivablesId: '',
					companyPay: 0,
					reason: '',
					remark: '',
					status: ''
				},
				details: {
					paymentReason: '',
					money: '',
					payType: '',
					proCategory: '',
					detailCategory: '',
					payee: '',
					payeeAccount: '',
					payeeOpenBank: '',
					relationBillType: 1,
					relationContractType: 1,
					oweBillMoney: 0,
					billExpirationDate: service.getDate('date'),
					oweContractMoney: 0,
					contractExpirationDate: service.getDate('date'),
					relationBill: '',
					relationBillName: '',
					relationContract: '',
					relationContractName: ''
				},
				detailList: [],
				baseUrl: 'oa/oaPayment',
				addUrl: 'oa/oaPayment/add',
				saveUrl: 'oa/oaPayment/saveDraft',
				editUrl: 'oa/oaPayment/modifyOaPayment',
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
				// 字典
				index1: 0,
				index2: 0,
				index3: 0,
				index4: 0,
				index5: 1,
				index6: 1,
				index7: 0,
				index8: 0,
				index9: 0,
				index10: 0,
				yes_no: [],
				payType: [],
				payTypeProject: [],
				payType1: [],
				proCategory: [],
				detailCategory: [],
				relationBillType: [],
				relationContractType: [],
				payeeList: [],
				// 弹框
				showdetail: false,
				type: '',
				showpopup: false,
				// 合同弹框
				popupData: {
					'titile': '收款',
					'selectType': 'radio',
					'url': 'oa/oaReceivables/list',
					'popupType': 'oaReceivables'
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
			this.dictValue('sys_yes_no').then(res => {
				this_.yes_no = res.data
			})
			this.dictValue('oa_payment_type').then(res => {
				this_.payType = res.data
			})
			this.dictValue('sys_pro_pay_type').then(res => {
				this_.payTypeProject = res.data
			})
			this.dictValue('oa_reimbursement_type').then(res => {
				this_.payType1 = res.data
			})
			this.dictValue('sys_payment_big_type').then(res => {
				this_.proCategory = res.data
			})
			this.dictValue('sys_payment_small_type5').then(res => {
				this_.detailCategory = res.data
			})
			this.dictValue('oa_payment_link').then(res => {
				this_.relationBillType = res.data
			})
			this.dictValue('oa_payment_linkC').then(res => {
				this_.relationContractType = res.data
			})
			
			//编辑页面信息
			if (this.edit == '1') {
				this.urlRequestGet(this.baseUrl + '/phoneEdit/' + this.mid, 'text/html;charset=UTF-8', function(res) {
					service.listAssign(this_.formData, res.data)
					console.log(this_.formData)
					this_.index1=this_.returnIndex(this_.yes_no,this_.formData.isAgent)
					this_.index2=this_.returnIndex(this_.yes_no,this_.formData.companyPay)
					this_.index3=this_.returnIndex(this_.payType,this_.formData.payType)
					this_.procInstId = res.data.procInstId
				})

				//图片返显
				this.urlRequestPost('oa/oaAttachment/selectAttachByObjectId', {
					"objId": this.mid
				}, null, function(res) {
					for (let i in res.data.data) {
						this_.fileList.push(res.data.data[i].attachmentUrl)
						this_.attachmentList.push({
							'objectId': this_.id,
							'attachmentName': res.data.data[i].attachmentName,
							'fileName': res.data.data[i].fileNamess
						})
					}

				})
				//明细记录
				this.urlRequestPost('oa/oaPaymentDetail/list', {
					'parentId': this.mid
				}, null, function(res) {
					console.log(res)
					for (let i in res.data.rows) {
						this_.detailList.push(res.data.rows[i])
						
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
						name: "projectId",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "项目必填"
					},
					{
						name: "money",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "金额必填"
					},
					{
						name: "moneyUpcase",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "大写必填"
					}
				];

				data.oaPayment = this.formData
				data.detailList = this.detailList
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
			Upcase(money) {
				let this_ = this
				this.urlRequestGet('common/converMoneyToCN/' + money, 'application/json;charset=UTF-8', function(res) {
					this_.$set(this_.formData, 'moneyUpcase', res.data.msg)
				})
			},
			isAgent(e) {
				this.index1 = e.target.value
				this.formData.isAgent = this.yes_no[this.index1].dictValue
			},
			companyPay(e) {
				this.index2 = e.target.value
				this.formData.companyPay = this.yes_no[this.index2].dictValue
			},
			payTypeFunc(e) {
				this.index3 = e.target.value
				this.formData.payType = this.payType[this.index3].dictValue
			},
			payTypeProjectFunc(e) {
				this.index7 = e.target.value
				this.formData.payType = this.payTypeProject[this.index7].dictValue
			},
			payType1Func(e) {
				this.index4 = e.target.value
				this.details.payType = this.payType1[this.index4].dictValue
			},
			proCategoryFunc(e) {
				this.index8 = e.target.value
				this.index9 = 0
				switch (this.index8) {
					case 0:
						this.dictValue('sys_payment_small_type5').then(res => {
							this.detailCategory = res.data
						})
						console.log(this.index8)
						break
					case 1:
						this.dictValue('sys_payment_small_type4').then(res => {
							this.detailCategory = res.data
						})
						console.log(this.index8)
						break
					case 2:
						this.dictValue('sys_payment_small_type3').then(res => {
							this.detailCategory = res.data
						})
						console.log(this.index8)
						break
					case 3:
						this.dictValue('sys_payment_small_type2').then(res => {
							this.detailCategory = res.data
						})
						console.log(this.index8)
						break
					case 4:
						this.dictValue('sys_payment_small_type1').then(res => {
							this.detailCategory = res.data
						})
						console.log(this.index8)
						break
				}
				this.details.proCategory = this.proCategory[this.index8].dictValue
			},
			detailCategoryFunc(e) {
				this.index9 = e.target.value
				this.details.detailCategory = this.detailCategory[this.index9].dictLabel
			},
			relationBillTypeFunc(e) {
				this.index5 = e.target.value
				this.details.relationBillType = this.relationBillType[this.index5].dictValue
				console.log(this.details.relationBillType)
			},
			relationContractTypeFunc(e) {
				this.index6 = e.target.value
				this.details.relationContractType = this.relationContractType[this.index6].dictValue
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
				if (open == 'detail') {
					this.details = {
						paymentReason: '',
						money: '',
						payType: '',
						payee: '',
						payeeAccount: '',
						payeeOpenBank: '',
						relationBillType: 1,
						relationContractType: 1,
						oweBillMoney: 0,
						billExpirationDate: service.getDate('date'),
						oweContractMoney: 0,
						contractExpirationDate: service.getDate('date'),
						relationBill: '',
						relationBillName: '',
						relationContract: '',
						relationContractName: ''
					}
				}
				if (flag == '2') { //项目弹窗
					this.popupData.titile = '工程'
					this.popupData.selectType = 'radio'
					this.popupData.url = 'oa/oaProject/phoneList'
					this.popupData.popupType = 'project'
				}
				if (flag == '1') { //收款弹窗
					this.popupData.titile = '收款'
					this.popupData.selectType = 'radio'
					this.popupData.url = 'oa/oaReceivables/phoneList'
					this.popupData.popupType = 'oaReceivables'
				}
				if (flag == '3') { //发票弹窗
					this.popupData.titile = '发票'
					this.popupData.selectType = 'radio'
					this.popupData.url = 'oa/sysProCostBill/phoneList'
					this.popupData.popupType = 'sysProCostBill'
				}
				if (flag == '4') { //合同弹窗
					this.popupData.titile = '合同'
					this.popupData.selectType = 'radio'
					this.popupData.url = 'oa/oaContract/phoneList'
					this.popupData.popupType = 'contract'
				}

				this.type = type
				this['show' + open] = true
			},
			//取消弹窗
			cancel(type, flag) {
				if (flag == '1') {
					if (this.formData.projectId) {
						if (this.details.proCategory && this.details.detailCategory){
							this.detailList.push(this.details)
							this.formData.money = parseFloat(this.formData.money) + parseFloat(this.details.money)
							this.Upcase(this.formData.money)
							this['show' + type] = false
							const this_ = this
							this.urlRequestPost('oa/oaPayeeAccountInformation/phoneAdd', {
								"payee": this_.details.payee,
								"account": this_.details.payeeAccount,
								"openingBank": this_.details.payeeOpenBank
							}, 'application/json;charset=UTF-8', function(res) {
								console.log(res)
							})
						}else {
							uni.showToast({
								title: '工程大类和工程小类必填',
								icon: "none"
							});
						}
					} else {
						this.detailList.push(this.details)
						this.formData.money = parseFloat(this.formData.money) + parseFloat(this.details.money)
						this.Upcase(this.formData.money)
						this['show' + type] = false
						const this_ = this
						this.urlRequestPost('oa/oaPayeeAccountInformation/phoneAdd', {
							"payee": this_.details.payee,
							"account": this_.details.payeeAccount,
							"openingBank": this_.details.payeeOpenBank
						}, 'application/json;charset=UTF-8', function(res) {
							console.log(res)
						})
					}
				} else {
					this['show' + type] = false
				}

			},
			dele(index) {
				this.formData.money = parseFloat(this.formData.money) - parseFloat(this.detailList[index].money)
				this.Upcase(this.formData.money)
				this.detailList.splice(index, 1);
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
					if (res[0].popupType == 'project') {
						this.$set(this.formData, 'projectId', res[0].id)
						this.$set(this.formData, 'projectName', res[0].projectName)
						this.detailList = []
					} else if (res[0].popupType == 'sysProCostBill') {
						this.$set(this.details, 'relationBill', res[0].id)
						this.$set(this.details, 'relationBillName', res[0].name)
					} else if (res[0].popupType == 'contract') {
						this.$set(this.details, 'relationContract', res[0].id)
						this.$set(this.details, 'relationContractName', res[0].contractName)
					} else if (res[0].popupType == 'oaReceivables') {
						this.$set(this.formData, 'receivablesId', res[0].id)
						this.$set(this.formData, 'receivablesName', res[0].code)
					}
				}
			},
			popupState(res) {
				this.showpopup = res
			},
			changeStart: function(e) {
				console.log(e)
				this.formData.payDate = e
			},
			changeEnd(e) {
				this.formData.expirationDate = e
			},
			changeEnd1(e) {
				this.details.billExpirationDate = e
			},
			//模糊搜索
			getPayeeList() {
				const this_ = this
				this.urlRequestPost('oa/oaPayeeAccountInformation/list', {
					"payee": this_.details.payee
				}, null, function(res) {
					this_.payeeList = res.data
				})
			},
			//选择模糊搜索结果
			choicePayee(index) {
				this.details.payee = this.payeeList[index].payee
				this.details.payeeAccount = this.payeeList[index].account
				this.details.payeeOpenBank = this.payeeList[index].openingBank
				this.payeeList = []
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

	.closeB {
		margin: 0 auto;
		color: #FFFFFF;
		font-size: 28upx;
		line-height: 40upx;
	}

	/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		width: 650upx;
		background-color: #fff;
		border-radius: 10px;
		z-index: 99999;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		/* padding: 15px;
	*/
		font-size: 14px;
		color: #666;
		height: 780upx;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding-top: 20px;
		border-top: 1upx solid #DDDDDD;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}

	/* 明细 */
	.borrowbtn {
		width: 90%;
		margin: 0 auto;
	}

	.borrowBox {
		width: 90%;
		margin: 15upx auto;
	}

	.borrowitem {
		border-bottom: 1upx solid #e2e2e2;
		padding: 20upx 20upx;
		background: #F8F8F8;
		position: relative;
	}

	.btnclose {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.payee-button{
		font-size: 15upx;
		height: auto;
		background-color: #f7a54a;
		color: #FFFFFF;
	}
	.payee-item{
		margin-bottom: 5upx;
		border-bottom: 4upx solid #FFFFFF;
	}
</style>
