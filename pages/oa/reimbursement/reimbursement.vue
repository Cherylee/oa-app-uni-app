<template>

	<view class="uni-common-mt">
		<form>
			<input class="hidden" v-model="formData.id" v-if="edit=='1'" />
			<view class="uni-form-item uni-row">
				<view class="title">申请人</view>
				<input class="uni-input" v-model="formData.userName" placeholder="申请人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">申请公司</view>
				<d-picker class="uni-input" v-if="formData.companyId" :companyId="formData.companyId" :deptId="formData.deptId"
				 @getDeptV="getDeptV"></d-picker>
			</view>

			<view class="uni-form-item uni-row">
				<view class="title">项目</view>
				<input class="hidden" v-model="formData.projectId" />
				<input class="uni-input" name="title" v-model="formData.title" @tap="togglePopup('center', 'borrow')" placeholder="项目" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>报销金额</view>
				<input class="uni-input" name="money" disabled="disabled" type="number" v-model="formData.money" @input="Upcase()"
				 placeholder="报销金额" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>金额大写</view>
				<input class="uni-input" name="moneyUpcase" disabled="disabled" v-model="formData.moneyUpcase" placeholder="金额大写" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">报销人</view>
				<input class="uni-input" name="receiver" v-model="formData.receiver" placeholder="报销人" @input="getReceiverList" />
			</view>
			<scroll-view scroll-y="" style="height: 180upx; text-align: center; background-color: #F7F7F7;" v-if="receiverList.length>0">
				<view v-for="(item,index) in receiverList" :key="index" @click="choicePayee(index)" class="payee-item">
					{{ item.payee }}
				</view>
			</scroll-view>
			<view class="uni-form-item uni-row">
				<view class="title">收款账号</view>
				<input class="uni-input" name="receiverAccount" v-model="formData.receiverAccount" placeholder="收款账号" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">收款开户行</view>
				<input class="uni-input" name="receiverOpenBank" v-model="formData.receiverOpenBank" placeholder="收款开户行" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">实际报销金额</view>
				<input class="uni-input" name="actualMoney" disabled="true" v-model="formData.actualMoney" placeholder="实际报销金额" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">金额大写</view>
				<input class="uni-input" name="actualMoneyUpcase" disabled="true" v-model="formData.actualMoneyUpcase" placeholder="金额大写" />
			</view>
			<view>
				
				<view class=" list-pd filebox">
					<view class=" cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-head">
								<view class="uni-uploader-title"><text class="filetitlee">附件:</text>(点击可预览选好的图片)</view>
								<view class="uni-uploader-info">{{imageList.length}}/9</view>
							</view>
							
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block class="uni-uploader_close" v-for="(image,index) in imageList" :key="index">
										
										<view v-if="!os" class="uni-uploader__file uni-uploader_close">
											<image webp="true" class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
											<view class="closeBtn" @tap.native.stop="deleImage(index)">
												<text class="closeB" /> X </text>
											</view>
										</view>
										<view v-else class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
											<view style="width: 280upx;padding: 0 10px;" class="uni-center">
												<uni-icons type="paperclip" size="40" @tap="gotoFile(image)" />
											</view>
										</view>
									</block>

									<view class="uni-uploader__input-box">
										<view class="uni-uploader__input" @tap="chooseImage('0')"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="borrow">
				<button class="mini-btn borrowbtn" type="info" @click="togglePopup('center', 'detail')">报销明细</button>
				<view v-if="reimDetail.length!=0" class="borrowBox">
					<view v-for="(item,index) in reimDetail" :key="index" class="borrowitem">
						<view>报销事由：{{item.reimbursementReason}}</view>
						<view>报销类型：{{getDictV(remitypes,item.reimbursementType)}}</view>
						<view>报销金额：{{item.money}}</view>
						<view>关联表单类型：{{getDictV(relationTypeList,item.relationType)}}</view>
						<view>关联表单：{{item.relationId}}</view>
						<uni-icons class="btnclose" type="close" color="#cccccc" size="40" @tap="dele(index,'2')" />
					</view>
				</view>
			</view>
			<!-- <view class="borrow">
				<button class="mini-btn borrowbtn" type="info"  @click="togglePopup('center', 'borrow')">选择借款单</button>
				<view v-if="borrowLists.length!=0" class="borrowBox">
					<view v-for="(item,index) in borrowLists" :key="index" class="borrowitem">
						<view>编号：{{item.code}}</view>
						<view>项目：{{item.projectName}}</view>
						<view>借款金额：{{item.borrowAmount}}</view>
						<view>申请时间：{{item.applyTime}}</view>
						<uni-icons class="btnclose" type="close" color="#cccccc"  size="40" @tap="dele(index,'1')"/>
					</view>
				</view>
			</view> -->
			<view class="borrow" v-if="edit=='1'">
				<view class="borrowtitle">扣款明细</view>
				<view v-if="cutPayment.length!=0" class="borrowBox">
					<view v-for="(item,index) in cutPayment" :key="index" class="borrowitem">
						<view>审批人：{{item.userName}}</view>
						<view>扣款事由：{{item.reason}}</view>
						<view>扣款金额：{{item.money}}</view>
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
		</form>
		<uni-process :baseUrl="baseUrl" :procInstId="procInstId" :mid="mid" v-if="edit=='1'&&procInstId"></uni-process>
		<!-- 选择项目弹窗 -->
		<uni-popup :show="showborrow" :type="type" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">选择项目</text>
				<scroll-view scroll-y="true" class="uni-tip-content" @scrolltolower="borrowlower">
					<view class="loading-more" v-if="projects.data.length==0"><text class="loading-more-text">暂无项目！</text></view>
					<view class="uni-list" v-else>
						<radio-group @change="checkboxChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in projects.data" :key="item.id">
								<view>
									<radio :value="item.id" :checked="index === currentP" />
								</view>
								<view>
									<view>项目编号：{{item.code}}</view>
									<view>负责人：{{item.managerName}}</view>
									<view>项目名称：{{item.projectName}}</view>
									<view>项目名称：{{item.projectName}}</view>
								</view>
							</label>
						</radio-group>
					</view>
					<view class="loading-more" v-if="projects.isLoading || projects.total > projects.pageSize">
						<text class="loading-more-text">{{projects.noneText}}</text>
					</view>
				</scroll-view>

				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @tap="cancel('borrow')">取消</text>
					<text class="uni-tip-button" @tap="cancel('borrow','1')">确定</text>
				</view>
			</view>
		</uni-popup>
		<!-- 报销明细弹窗 -->
		<uni-popup :show="showdetail" :type="type" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">报销明细</text>
				<view class="uni-tip-content uni-tip-content-detail">
					<form>
						<view class="uni-form-item uni-row">
							<view class="title">事由</view>
							<input class="uni-input" placeholder="事由" name="reimbursementReason" v-model="details.reimbursementReason" />
						</view>
						<view class="uni-form-item uni-row">
							<view class="title"><span class="red">*</span>报销类型</view>
							<input class="hidden" placeholder="报销类型" name="reimbursementType" v-model="details.reimbursementType" />
							<view class="uni-input" @tap="togglePopup('center', 'type')">{{getDictV(remitypes,details.reimbursementType)}}</view>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">报销金额</view>
							<input class="uni-input" placeholder="报销金额" name="money" v-model="details.money" />
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">关联表单类型</view>
							<input class="uni-input hidden" placeholder="关联表单类型" name="relationType" v-model="details.relationType" />
							<picker class="picker" @change="relationTypeChange" :value="returnIndex(relationTypeList,formData.relationType)"
							 :range="relationTypeList" range-key="dictLabel">
								<view class="uni-input">{{(relationTypeList[index1]?relationTypeList[index1]:{}).dictLabel}}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">关联表单</view>
							<input class="uni-input" @tap="togglePopup('center', 'link')" v-model="details.relationId" />
						</view>
					</form>
				</view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @tap="cancel('detail')">取消</text>
					<text class="uni-tip-button" @tap="cancel('detail','2')">确定</text>
				</view>
			</view>
		</uni-popup>
		<!-- 报销类型弹窗 -->
		<uni-popup :show="showtype" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">选择报销类型</text>
				<scroll-view scroll-y="true" class="uni-tip-content">
					<view class="uni-list">
						<radio-group @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in remitypes" :key="item.dictValue">
								<view>
									<radio :value="item.dictValue" :checked="index === current" />
								</view>
								<view>
									<view>标签：{{item.dictLabel}}</view>
									<view>备注：{{item.remark}}</view>
									<view>键值：{{item.dictValue}}</view>
								</view>
							</label>
						</radio-group>
					</view>
				</scroll-view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @tap="cancel('type')">取消</text>
					<text class="uni-tip-button" @tap="cancel('type','3')">确定</text>
				</view>
			</view>
		</uni-popup>
		<!-- 关联表单弹窗 -->
		<uni-popup :show="showlink" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">选择关联表单</text>
				<scroll-view scroll-y="true" class="uni-tip-content" @scrolltolower="borrowlowerLinks">
					<view class="loading-more" v-if="linkForm.data.length==0"><text class="loading-more-text">暂无数据！</text></view>
					<view class="uni-list" v-else>
						<radio-group @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in linkForm.data" :key="item.id">
								<view>
									<radio :value="item.id" :checked="index === currentRelation" />
								</view>
								<view v-if="details.relationType=='oatravel'">
									<view>出差天数：{{item.applyDays}}</view>
									<view>出差原因：{{item.applyReason}}</view>
									<view>乘坐交通工具：{{item.vehicle}}</view>
								</view>
								<view v-if="details.relationType=='oaOutgoing'">
									<view>外出起始时间：{{item.goOutStart}}</view>
									<view>外出结束时间：{{item.goOutEnd}}</view>
									<view>外出时长：{{item.goOutHour}}</view>
									<view>外出事由：{{item.reason}}</view>
								</view>
								<view v-if="details.relationType=='oaOvertime'">
									<view>加班起始日期：{{item.workStart}}</view>
									<view>加班结束日期：{{item.workEnd}}</view>
									<view>加班时长：{{item.workHour}}</view>
									<view>加班事由：{{item.reason}}</view>
								</view>
								<view v-if="details.relationType=='jyTender'">
									<view>工程名称：{{item.projectName}}</view>
									<view>申请人：{{item.applier}}</view>
									<view>开标时间：{{item.openTenderDate}}</view>
								</view>
							</label>
						</radio-group>
					</view>
					<view class="loading-more" v-if="linkForm.isLoading || linkForm.total > linkForm.pageSize">
						<text class="loading-more-text">{{linkForm.noneText}}</text>
					</view>
				</scroll-view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @tap="cancel('link')">取消</text>
					<text class="uni-tip-button" @tap="cancel('link','4')">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	import service from '@/service.js';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import graceChecker from '@/common/graceChecker.js'
	import uniProcess from '@/components/uni-processList/nui-processList.vue';
	import permision from "@/common/permission.js"
	import dPicker from '@/components/d-picker/d-picker.vue';
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			uniProcess,
			uniIcons
		},
		data() {
			return {
				id: '',
				edit: '',
				user: {},
				os: false,
				// 基本数据
				formData: {
					mid: '',
					userName: '',
					companyId: '',
					deptId: '',
					code: '',
					projectId: '',
					title: '',
					money: 0,
					moneyUpcase: '',
					receiver: '',
					receiverAccount: '',
					receiverOpenBank: '',
					actualMoney: 0,
					actualMoneyUpcase: '',
					status: ''
				},
				baseUrl: 'oa/oaReimbursement',
				addUrl: 'oa/oaReimbursement/add',
				saveUrl: 'oa/oaReimbursement/saveDraft',
				editUrl: 'oa/oaReimbursement/modifyReimbursement',
				flag: false,
				index: 0,
				// 当前时间
				date: service.getDate('dateTime'),
				// 按钮
				loading1: false,
				loading2: false,
				loading3: false,
				// 流程
				procInstId: '',
				//借款单
				borrowdata: [],
				borrowLists: [],
				tiptext: '加载中.....',
				isLoading: false,
				pageSize: 3,
				pageNum: 1,
				total: 0,
				//报销明细
				reimDetail: [],
				details: {
					reimbursementReason: '',
					reimbursementType: '',
					money: null,
					relationType: 'oatravel',
					relationId: ''
				},
				//报销类型
				remitypes: [],
				current: 0,
				//项目
				currentP: 0,
				projects: {
					data: [],
					pageNum: 1,
					isLoading: false,
					refreshText: "",
					loadingText: '加载更多...',
					noneText: '加载中.....',
					total: 0,
					pageSize: 10
				},
				//弹框
				type: '',
				showborrow: false,
				showdetail: false,
				showtype: false,
				showproject: false,
				showlink: false,
				//附件
				attachmentList: [],
				title: 'choose/previewImage',
				imageList: [],
				imageListDetail: [], //用于存放明细的附件
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 0,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				// 扣款明细
				cutPayment: [],
				// 关联表单
				linkForm: {
					data: [],
					pageNum: 1,
					isLoading: false,
					refreshText: "",
					loadingText: '加载更多...',
					noneText: '加载中.....',
					total: 0,
					pageSize: 10
				},
				currentRelation: 0,
				// 字典
				relationTypeList: [],
				index1: 0,
				receiverList: []
			}
		},
		computed: mapState(['name', 'deptId', 'companyId', 'hasLogin']),
		onLoad(e) {
			this.edit = e.edit || '0'
			this.mid = e.id || ''
			let this_ = this
			// // 获取os
			// #ifdef APP-PLUS
			plus.os.name === 'iOS' ? this.os = true : this.os = false
			// #endif
			//用户信息
			if (this.edit == '0') {
				this.$set(this.formData, 'userName', this.name)
				this.$set(this.formData, 'companyId', this.companyId)
				this.$set(this.formData, 'deptId', this.deptId)
			}
			//编辑页面信息
			if (this.edit == '1') {
				this.urlRequestGet(this.baseUrl + '/phoneEdit/' + this.mid, 'text/html;charset=UTF-8', function(res) {
					service.listAssign(this_.formData, res.data)
					this_.procInstId = res.data.procInstId
				})

				//借款单
				this.urlRequestPost('oa/oaBorrowMoney/getBorrowMoneyByOther', {
					"tableColumn": "borrow_id",
					"tableName": "oa_reimbursement_borrow",
					"tableMid": "reimbursement_id",
					"midValue": this.mid
				}, 'application/json;charset=UTF-8', function(res) {
					for (let i in res.data.rows) {
						this_.borrowLists.push(res.data.rows[i])
					}
				})
				//图片返显
				
				this.urlRequestPost('oa/oaAttachment/selectAttachByObjectId', {
					"objId": this.mid
				}, null, function(res) {
					for (let i in res.data.data) {
						this_.imageList.push(res.data.data[i].attachmentUrl)
						this_.attachmentList.push({
							'objectId': this_.id,
							'attachmentName': res.data.data[i].attachmentName,
							'fileName': res.data.data[i].fileName
						})
					}
					console.log(this_.imageList)
				})
				
				// 扣款明细
				//扣款明细
				this.urlRequestPost('oa/oaReimbursementCut/phoneList', {
					'parentId': this.mid
				}, "application/json;charset=UTF-8", function(res) {
					
					for (let i in res.data.rows) {
						this_.cutPayment.push(res.data.rows[i])
					}
				})
				//报销明细
				this.urlRequestPost('oa/oaReimbursementDetail/list', {
					'parentId': this.mid
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.reimDetail.push(res.data.rows[i])
					}
				})
			}

			//获取借款申请列表
			this.getBorrowList()
			//获取报销类型
			this.dictValue('oa_reimbursement_type').then(res => {
				this_.remitypes = res.data
			})
			//获取关联表单类型
			this.dictValue('oa_reimbursement_link').then(res => {
				this_.relationTypeList = res.data
			})
			// 关联的表单
			this.getLinksList()
		},
		methods: {
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
						errorMsg: "报销金额必填"
					},
					{
						name: "moneyUpcase",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "金额大写必填"
					}
				];
				data.oaReimbursement = this.formData
				data.attachmentList = this.attachmentList
				data.detailList = this.reimDetail
				data.relationList = this.borrowLists
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
					this.urlRequestPost('oa/oaPayeeAccountInformation/phoneAdd', {
						"payee": this_.formData.receiver,
						"account": this_.formData.receiverAccount,
						"openingBank": this_.formData.receiverOpenBank
					}, 'application/json;charset=UTF-8', function(res) {
						console.log(res)
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			/**
			 * 抄送
			 */
			send() {
				uni.navigateTo({
					url: "../../send/send?id=" + this.mid + "&url=" + this.baseUrl,
				});
			},
			/**
			 * 催办
			 */
			urge() {
				var this_ = this
				this.loading3 = true
				this.urlRequestGet(this.baseUrl + '/urge/' + this.mid, null, function(res) {
					//this_.formData.leaveDays=res.data.hours
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					});
					if (res.data.code == 0) {
						this_.loading3 = false
						uni.reLaunch({
							url: '../../start/start'
						});
					}

				})
			},
			//大写转换
			Upcase() {
				let this_ = this
				this.urlRequestGet('common/converMoneyToCN/' + this.formData.money, null, function(res) {
					this_.$set(this_.formData, 'moneyUpcase', res.data.msg)
					// this_.formData.moneyUpcase=res.msg
				})
			},
			// 弹框
			togglePopup(type, open) {
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
						reimbursementReason: '',
						reimbursementType: '',
						money: null,
						relationType: '',
						relationId: ''
					}
					this.imageListDetail = []
				}
				this.type = type
				this['show' + open] = true
			},
			// 预览附件
			gotoFile(f) {
				console.log(f)
				uni.showLoading({
					title: '加载中'
				});
				uni.downloadFile({
					url: f,
					success: function(res) {
						uni.hideLoading();
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							success: function(res) {
								uni.hideLoading();
								console.log('打开文档成功');
							}
						});
					}
				});
			},
			//取消弹窗
			cancel(type, flag) {

				if (flag == '1') { //项目的确认按钮事件
					this['show' + type] = false
					this.$set(this.formData, 'projectId', this.projects.data[this.currentP].id)
					this.$set(this.formData, 'title', this.projects.data[this.currentP].projectName)
				} else if (flag == '2') { //报销详情的确认按钮事件
					if (this.details.money == null) {
						uni.showToast({
							title: '报销类型必填',
							icon: 'success',
							duration: 1000
						})
					} else {
						this['show' + type] = false
						this.formData.money = parseFloat(this.formData.money) + parseFloat(this.details.money)
						this.Upcase(this.formData.money)
						this.reimDetail.push(this.details)
					}

				} else if (flag == '3') { //报销类型的确认按钮事件
					this['show' + type] = false
					this.$set(this.details, 'reimbursementType', this.remitypes[this.current].dictValue)
					// this.details.reimbursementType=this.remitypes[this.current].dictValue
				} else if (flag == '4') {
					this['show' + type] = false
					this.$set(this.details, 'relationId', this.linkForm.data[this.currentRelation].id)
				}else{
					this['show' + type] = false
				}
			},
			//判断是否已经添加过了
			ifadd(id) {
				let blo = false
				for (let i in this.borrowLists) {
					if (id == this.borrowLists[i].id) {
						blo = true
					}
				}
				return blo
			},
			//弹窗变动监听
			change(e) {
				if (!e.show) {
					this.showborrow = false
					this.showdetail = false
					this.showtype = false
					this.showproject = false
					this.showlink = false
				}
			},
			//借款申请多选框监听
			checkboxChange: function(e) {
				var items = this.projects.data,
					values = e.target.value;

				for (let i = 0; i < items.length; i++) {
					if (items[i].id === values) {
						this.currentP = i;
						break;
					}
				}
			},
			//报销类型多选框监听
			radioChange(evt) {
				for (let i = 0; i < this.remitypes.length; i++) {
					if (this.remitypes[i].dictValue === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			//关联表单单选监听
			relationRadioChange(evt) {
				for (let i = 0; i < this.remitypes.length; i++) {
					if (this.linkForm.data[i].id === evt.target.value) {
						this.currentRelation = i;
						break;
					}
				}
			},
			// 选择关联表单类型
			relationTypeChange(e) {
				this.index1 = e.target.value
				this.details.relationType = this.relationTypeList[this.index1].dictValue
				this.getLinksList()
			},
			/**
			 * @param {Object} 工程项目
			 */
			getBorrowList() {
				let this_ = this
				//工程项目
				this.urlRequestPost('oa/oaProject/phoneList', {
					'pageSize': this.projects.pageSize,
					'pageNum': this.projects.pageNum
				}, null, function(res) {
					let activeTab = this_.projects.data
					// this_.borrowdata=res.data.rows
					let list = [];
					for (let a in res.data.rows) {
						list.push(res.data.rows[a]);
					}
					if (this_.projects.pageNum <= 1) {
						this_.projects.data = list;
					} else {
						this_.projects.data = activeTab.concat(list);
					}
					this_.projects.total = res.data.total
				})
			},
			//下滑至底部监听
			borrowlower(e) {
				setTimeout(() => {
					let uPageNum = Math.ceil(this.projects.total / this.projects.pageSize)
					if (this.projects.pageNum < uPageNum) {
						this.projects.pageNum++
						this.getBorrowList();
					} else {
						this.projects.noneText = '没有数据了！'
					}

				}, 500)
			},
			/**
			 * @param {Object} 关联表单
			 */
			getLinksList() {
				let this_ = this
				let url_link = 'oa/'
				if (this.details.relationType == 'jyTender') {
					url_link = 'business/'
				}
				//表单
				this.urlRequestPost(url_link + this.details.relationType + '/list', {
					'pageSize': this.linkForm.pageSize,
					'pageNum': this.linkForm.pageNum
				}, null, function(res) {
					let activeTab = this_.linkForm.data
					let list = [];
					for (let a in res.data.rows) {
						list.push(res.data.rows[a]);
					}
					if (this_.linkForm.pageNum <= 1) {
						this_.linkForm.data = list;
					} else {
						this_.linkForm.data = activeTab.concat(list);
					}
					this_.linkForm.total = res.data.total
				})
			},
			//下滑至底部监听
			borrowlowerLinks(e) {
				setTimeout(() => {
					let uPageNum = Math.ceil(this.linkForm.total / this.linkForm.pageSize)
					if (this.linkForm.pageNum < uPageNum) {
						this.linkForm.pageNum++
						this.getLinksList();
					} else {
						this.linkForm.noneText = '没有数据了！'
					}

				}, 500)
			},
			//删除监听
			dele(index, flag) {
				if (flag == '1') { //删除已选择的借款单
					this.borrowLists.splice(index, 1);
				} else if (flag == '2') { //删除已报销明细
					this.formData.money = parseFloat(this.formData.money) - parseFloat(this.reimDetail[index].money)
					this.Upcase(this.formData.money)
					this.reimDetail.splice(index, 1);
				}

			},
			/**
			 * 字典回显
			 */
			getDictV(type, value) {
				let dictV = ''
				for (let i in type) {
					if (type[i].dictValue == value) {
						dictV = type[i].dictLabel
					}
				}
				return dictV
			},
			returnIndex(n, v) {
				var index = ''
				for (let i in n) {
					if (n[i].dictValue == v) {
						index = i
					}
				}
				return index
			},
			//附件
			chooseImage: async function(flag) {
				let count = 0
				switch (flag) {
					case '0':
						count = this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex]
						break
					case '1':
						count = this.imageListDetail.length + this.count[this.countIndex] > 9 ? 9 - this.imageListDetail.length : this.count[
							this.countIndex]
						break
				}
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif

				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					if (!isContinue) {
						return;
					}
				}
				var this_ = this
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: count,
					success: (res) => {
						// this.imageList = this.imageList.concat(res.tempFilePaths);
						var imageSrc = res.tempFilePaths
						for (let i in imageSrc) {
							uni.uploadFile({
								url: 'http://192.168.1.110:8081/common/bootstrapFileInputUpload',
								filePath: imageSrc[i],
								fileType: 'image',
								name: 'data',
								success: (res) => {
									uni.showToast({
										title: '上传成功',
										icon: 'success',
										duration: 1000
									})
									let imgs = {
										'attachmentName': JSON.parse(res.data).fileName,
										'fileName': JSON.parse(res.data).sourceFileName
									}
									if (flag == '0') {
										this_.imageList.push(imageSrc[i]) //用于回显图片预览
										this_.attachmentList.push(imgs) //用于上传
									} else {
										this_.imageListDetail.push(imageSrc[i]) //用于回显图片预览
										this_.details.attachmentList.push(imgs) //用于上传
									}

								},
								fail: (err) => {
									uni.showModal({
										content: err.errMsg,
										showCancel: false
									});
								}
							});
						}


					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			//图片已满
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			//预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			//删除图片
			deleImage(index) {
				let current = index
				this.imageList.splice(current, 1) //回显删除
				this.attachmentList.splice(current, 1)
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
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
			//部门回传
			getDeptV(res) {
				this.formData.deptId = res.deptId
				this.formData.companyId = res.companyId
			},
			onBackPress() {
				if (this.showborrow || this.showdetail || this.showtype || this.showproject) {
					this.showborrow = false
					this.showdetail = false
					this.showtype = false
					this.showproject = false
					return true
				}
			},
			//模糊搜索结果
			getReceiverList() {
				const this_ = this
				this.urlRequestPost('oa/oaPayeeAccountInformation/list', {
					"payee": this_.formData.receiver
				}, null, function(res) {
					console.log(res)
					this_.receiverList = res.data
				})
			},
			//选择模糊搜索结果
			choicePayee(index) {
				this.formData.receiver = this.receiverList[index].payee
				this.formData.receiverAccount = this.receiverList[index].account
				this.formData.receiverOpenBank = this.receiverList[index].openingBank
				this.receiverList = []
			}

		}
	}
</script>

<style>
	@import url("../../../static/css/oa.css");

	.borrow {
		margin-bottom: 20upx;
	}

	.borrowbtn {
		width: 90%;
		margin: 0 auto;
	}

	.borrowBox {
		width: 90%;
		margin: 0 auto;
		margin-top: 15upx;
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

	.uni-list-cell {
		justify-content: flex-start
	}

	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
	}

	.loading-more-text {
		font-size: 28upx;
		color: #999;
	}

	.disabled {
		background-color: #EBEBEB;
	}

	/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		width: 300px;
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
		height: 650upx;
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

	/* //附件 */
	.list-pd {
		width: 100%;
	}

	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {}

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

	/*  */
	.borrowtitle {
		font-size: 28upx;
		background: #F8F8F8;
		text-align: center;
		border-bottom: 1upx solid #CCCCCC;
		padding: 20upx;
	}

	.borrow {
		margin-bottom: 20upx;
	}
</style>
