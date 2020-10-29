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
				<d-picker class="uni-input" :companyId="formData.companyId" :deptId="formData.deptId" @getDeptV="getDeptV"></d-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>项目</view>
				<input class="uni-input" @click="togglePopup('center', 'popup','2')" v-model="formData.projectName" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">收款日期</view>
				<e-picker class="uni-input" mode="dateTime" :showValue="formData.receivablesDate" @change="changeStart">{{formData.receivablesDate}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>收款金额</view>
				<input class="uni-input" @input="Upcase()" placeholder="收款金额" v-model="formData.money" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>金额大写</view>
				<input class="uni-input" disabled v-model="formData.moneyUpcase" placeholder="金额大写" />
			</view>

			<view class="uni-form-item uni-row">
				<view class="title">收款事由</view>
				<input class="uni-input" v-model="formData.reason" placeholder="收款事由" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">款项来源人</view>
				<input class="uni-input" v-model="formData.payee" placeholder="款项来源人" />
			</view>

			<uni-uploader :imageList="fileList" :os="os" @attachmentList="getAttachmentList"></uni-uploader>
			<view class="borrow">
				<button class="mini-btn borrowbtn" type="info" @click="togglePopup('center', 'detail','0')">收款明细</button>
				<view v-if="detailList.length!=0" class="borrowBox">
					<view v-for="(item,index) in detailList" :key="index" class="borrowitem">
						<view v-if="item.receivableType">收款类型：{{getDictV(receivableType,item.receivableType)}}</view>
						<view v-if="item.paymentType">款项类别：{{getDictV(paymentType,item.paymentType)}}</view>
						<view v-if="item.moneyPurpost">款项用途：{{moneyPurpostList[index]}}</view>
						<view>收款金额：{{item.receivableCost}}</view>
						<view>备注：{{item.remark}}</view>
						<uni-icons class="btnclose" type="close" color="#cccccc" size="40" @tap="dele(index,'1')" />
					</view>
				</view>
			</view>
			<br>
			<view class="borrow">
				<button class="mini-btn borrowbtn" type="info" @click="togglePopup('center', 'popup','1')">抵扣借款单</button>
				<view v-if="borrowsList.length!=0" class="borrowBox">
					<view v-for="(item,index) in borrowsList" :key="index" class="borrowitem">
						<view>借款编号：{{item.code}}</view>
						<view>借款用途：{{item.borrowReason}}</view>
						<view>借款金额：{{item.borrowAmount}}</view>
						<view>冲抵金额：{{item.offsetAmount}}</view>
						<view>剩余可冲抵金额：{{item.borrowMoney}}</view>
						<uni-icons class="btnclose" type="close" color="#cccccc" size="40" @tap="dele(index,'2')" />
					</view>
				</view>
			</view>

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

		<!-- 明细弹框 -->
		<uni-popup :show="showdetail" :type="type" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">明细记录</text>
				<scroll-view scroll-y="" class="uni-tip-content uni-tip-content-detail">
					<form>
						<view class="uni-form-item uni-row" v-if="!formData.projectId">
							<view class="title">收款类型</view>
							<picker class="picker" @change="receivableTypeFunc" :value="index1" :range="receivableType" range-key="dictLabel">
								<view class="uni-input">{{(receivableType[index1]?receivableType[index1]:{}).dictLabel}}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-row" v-if="formData.projectId">
							<view class="title">款项类别</view>
							<picker class="picker" @change="paymentTypeFunc" :value="index2" :range="paymentType" range-key="dictLabel">
								<view class="uni-input">{{(paymentType[index2]?paymentType[index2]:{}).dictLabel}}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-row" v-if="formData.projectId">
							<view class="title">款项用途</view>
							<picker class="picker" @change="moneyPurpostFunc" :value="index3" :range="moneyPurpost" range-key="dictLabel">
								<view class="uni-input">{{(moneyPurpost[index3]?moneyPurpost[index3]:{}).dictLabel}}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">收款金额</view>
							<input class="uni-input" placeholder="收款金额" v-model="details.receivableCost" />
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">备注</view>
							<input class="uni-input" placeholder="备注" v-model="details.remark" />
						</view>

					</form>
				</scroll-view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @tap="cancel('detail')">取消</text>
					<text class="uni-tip-button" @tap="cancel('detail','1')">确定</text>
				</view>
			</view>
		</uni-popup>
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
					receivablesDate: service.getDate('dateTime'),
					money: 0,
					moneyUpcase: '',
					payee: '',
					reason: '',
					remark: '',
					status: ''
				},
				details: {
					receivableType: '',
					paymentType: '',
					moneyPurpost:'',
					receivableCost: '',
					remark: ''
				},
				borrows: {
					code: '',
					borrowReason: '',
					borrowAmount: '',
					offsetAmount: '',
					borrowMoney: ''
				},
				detailList: [],
				borrowsList: [],
				baseUrl: 'oa/oaReceivables',
				addUrl: 'oa/oaReceivables/add',
				saveUrl: 'oa/oaReceivables/saveDraft',
				editUrl: 'oa/oaReceivables/modifyOaReceivables',
				flag: false,
				index: 0,
				dateStart: service.getDate('dateTime'),
				loading1: false,
				loading2: false,
				loading3: false,
				procInstId: '',
				// 附件
				fileList: [],
				attachmentList: [],
				// 字典
				index1: 0,
				receivableType: [],
				index2: 0,
				paymentType:[],
				paymentTypeList: [],
				index3: 0,
				moneyPurpost: [],
				moneyPurpostList: [],
				// 弹框
				showdetail: false,
				type: '',
				showpopup: false,
				// 合同弹框
				popupData: {
					'titile': '工程',
					'selectType': 'radio',
					'url': 'oa/oaProject/list',
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
			this.dictValue('oa_receivable_type').then(res => {
				this_.receivableType = res.data
			})
			this.dictValue('sys_pro_payment_type').then(res => {
				this_.paymentType = res.data
			})
			this.dictValue('sys_pro_payment_type_relation').then(res => {
				this_.paymentTypeList = res.data
			})

			//编辑页面信息
			if (this.edit == '1') {
				this.urlRequestGet(this.baseUrl + '/phoneEdit/' + this.mid, 'text/html;charset=UTF-8', function(res) {
					service.listAssign(this_.formData, res.data)
					this_.index1 = this_.returnIndex(this_.receivableType, this_.formData.receivableType)
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
				//明细记录
				this.urlRequestPost('oa/oaReceivables/detailList', {
					'mainId': this.mid
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.detailList.push(res.data.rows[i])
					}
					for (let i in this_.detailList){
						let number = this_.paymentTypeList.findIndex(item => item.dictLabel == this_.detailList[i].paymentType)
						let moneyPurpostName = this_.paymentTypeList[number].dictValue
						this_.dictValue(moneyPurpostName).then(res => {
							this_.moneyPurpostList.push(this_.getDictV(res.data,this_.detailList[i].moneyPurpost))
						})
					}
				})
				//关联的借款单
				this.urlRequestPost('oa/oaBorrowMoney/getPhoneBorrowMoneyByOther', {
					"tableColumn": "borrow_id",
					"tableName": "oa_receivables_borrow",
					"tableMid": "receivables_id",
					"midValue": this.mid
				}, null, function(res) {
					console.log(res)
					for (let i in res.data.rows) {
						this_.borrowsList.push(res.data.rows[i])

					}
				})
			}

		},
		methods: {
			test(u){
				console.log(this.detailList)
				console.log(u)
			},
			// 提交和保存
			submit(flag) {
				let this_ = this
				let url = ''
				let data = {}
				//定义表单规则			
				let rule = [{
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

				data.oaReceivables = this.formData
				data.receiveDetailList = this.detailList
				data.relationList = this.borrowsList
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
						case '2': //0代表的是保存
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
					console.log(res.data)
					this_.$set(this_.formData, 'moneyUpcase', res.data.msg)
				})
			},
			receivableTypeFunc(e) {
				this.index1 = e.target.value
				this.details.receivableType = this.receivableType[this.index1].dictValue
			},
			paymentTypeFunc(e) {
				this.index2 = e.target.value
				this.details.paymentType = this.paymentType[this.index2].dictValue
				let number = this.paymentTypeList.findIndex(item => item.dictLabel == this.details.paymentType)
				let moneyPurpostName = this.paymentTypeList[number].dictValue
				this.dictValue(moneyPurpostName).then(res => {
					this.moneyPurpost = res.data
				})
			},
			moneyPurpostFunc(e) {
				this.index3 = e.target.value
				this.details.moneyPurpost = this.moneyPurpost[this.index3].dictValue
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
						receivableType: 0,
						receivableCost: '',
						remark: ''
					}
				}
				if (flag == '2') { //项目弹窗
					this.popupData.titile = '工程'
					this.popupData.selectType = 'radio'
					this.popupData.url = 'oa/oaProject/phoneList'
					this.popupData.popupType = 'project'
				}
				if (flag == '1') { //借款单
					this.popupData.titile = '借款'
					this.popupData.selectType = 'checkbox'
					this.popupData.url = 'oa/oaBorrowMoney/phoneList'
					this.popupData.popupType = 'oaBorrowMoney'
				}
				this.type = type
				this['show' + open] = true
			},
			//取消弹窗
			cancel(type, flag) {
				this['show' + type] = false
				if (flag == '1') {
					this.detailList.push(this.details)
					this.formData.money = parseFloat(this.formData.money) + parseFloat(this.details.receivableCost)
					console.log(this.formData.money)
					this.Upcase(this.formData.money)
					let number = this.paymentTypeList.findIndex(item => item.dictLabel == this.details.paymentType)
					let moneyPurpostName = this.paymentTypeList[number].dictValue
					this.dictValue(moneyPurpostName).then(res => {
						this.moneyPurpostList.push(this.getDictV(res.data,this.details.moneyPurpost))
					})
				}

			},
			dele(index, flag) {
				if (flag == '1') {
					this.formData.money = parseFloat(this.formData.money) - parseFloat(this.detailList[index].receivableCost)
					this.Upcase(this.formData.money)
					this.detailList.splice(index, 1);
					this.moneyPurpostList.splice(index,1);
				} else {
					this.borrowsList.splice(index, 1);
				}

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

			// 弹框回传
			getData(res) {
				if (res[0].popupType) {
					if (res[0].popupType == 'project') {
						this.$set(this.formData, 'projectId', res[0].id)
						this.$set(this.formData, 'projectName', res[0].projectName)
						this.detailList = []
						this.moneyPurpostList = []
					} else if (res[0].popupType == 'oaBorrowMoney') {
						for (let i in res) {
							if(this.ifAdd(res[i].id,this.borrowsList)!=true){
								res[i].borrowId=res[i].id
								this.borrowsList.push(res[i])
							}
						}
					}
				}
			},
			ifAdd(id,list){
				let bool=false
				for (let i in list) {
					if(list[i].id==id){
						bool=true
					}
				}
				return bool
			},
			popupState(res) {
				this.showpopup = res
			},
			changeStart: function(e) {
				this.formData.receivablesDate = e
			},
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
		height: 480upx;
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
</style>
