<template>
	<view class="uni-common-mt">
		<form >
			<input class="hidden" v-model="formData.id"  v-if="edit==1"/>
			<view class="uni-form-item uni-row">
				<view class="title">申请人</view>
				<input class="uni-input" placeholder="申请人" v-model="formData.userName"/>
			</view>
			
			<view class="uni-form-item uni-row">
				<view class="title">申请公司</view>
				<d-picker class="uni-input"  v-if="formData.companyId" :companyId="formData.companyId" :deptId="formData.deptId" @getDeptV="getDeptV"></d-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">申请日期</view>
				<e-picker class="uni-input" mode="date" :showValue="(formData.applyTime)"  @change="changeStart">{{(formData.applyTime)}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">工程名称</view>
				<input class="uni-input" v-model="formData.projectName" disabled  @tap="togglePopup('center','/oa/oaProject/phoneList ','project','radio','工程')"/>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">借款类型</view>
				<picker class="picker" @change="borrowTypeChange" :value="borrowTypeIndex" :range="borrowTypeList" range-key="dictLabel">
					<view class="uni-input">{{(borrowTypeList[borrowTypeIndex]?borrowTypeList[borrowTypeIndex]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">借款人</view>
				<input class="uni-input" name="borrower" v-model="formData.borrower"   placeholder="借款人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">预计归还时间</view>
				<e-picker class="uni-input" mode="date" :showValue="(formData.preBackDate)"  @change="changePreBackDate">{{(formData.preBackDate)}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">收款人账号</view>
				<input class="uni-input" name="receiveAccount" v-model="formData.receiveAccount"   placeholder="收款人账号" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">借款事由</view>
				<input class="uni-input" name="borrowReason" v-model="formData.borrowReason"   placeholder="借款事由" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">借款金额</view>
				<input class="uni-input" name="borrowAmount" type="number" v-model="formData.borrowAmount" @input="Upcase()"  placeholder="借款金额" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">金额大写</view>
				<input class="uni-input" name="amountUpcase" v-model="formData.amountUpcase"   placeholder="金额大写" />
			</view>
			<view class="biaoti title"> 款项来源人明细</view>
			<view class="uni-form-item uni-row">
				<view class="title">起息日</view>
				<e-picker class="uni-input" mode="date" :showValue="(formData.interestDate)"  @change="changeInterestDate">{{(formData.interestDate)}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">利率</view>
				<input class="uni-input" name="rate" v-model="formData.rate"   placeholder="利率" type="number" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">收款方式</view>
				<picker class="picker" @change="receiptWayChange" :value="receiptWayIndex" :range="receiptWayList" range-key="dictLabel">
					<view class="uni-input">{{(receiptWayList[receiptWayIndex]?receiptWayList[receiptWayIndex]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">已收利息</view>
				<input class="uni-input" name="alreadyReceiptInterest" v-model="formData.alreadyReceiptInterest"   placeholder="已收利息" type="number" />
			</view>
			<uni-uploader  :imageList="fileList" :os="os" @attachmentList="getAttachmentList"></uni-uploader>
			<view class="button-sp-area">
				<button class="mini-btn" type="info" size="mini" :loading="loading1" @click="submit('0')" v-if="formData.status=='99'||formData.status==''">保存草稿</button>
				<button class="mini-btn" type="primary" @click="submit('1')" :loading="loading2" v-if="formData.status=='99'||formData.status==''"  size="mini">提交</button>
				<button class="mini-btn" type="primary" @click="submitHandler('2')" v-if="formData.status=='3'"  size="mini">提交</button>
				<button class="mini-btn cui-btn-2" type="info" :loading="loading3" @click="urge()"   v-if="formData.status!=''&&formData.status!='2'&&formData.status!='16'&&formData.status!='99'"  size="mini">催办</button>
				<button class="mini-btn cui-btn-1" type="info"  v-if="formData.status!='99'&&formData.status!=''"  size="mini" @click="send()">抄送</button>
			</view>
		</form>
		<uni-process :baseUrl="baseUrl" :procInstId="procInstId" :mid="mid" v-if="edit=='1'&&procInstId"></uni-process>
		<!-- 收款单弹窗 -->
		<uni-popup :show="popupState" :type="type" :mask-click="false" @change="change">
			<uni-relation-popup @popupState="updatePopupState" @getData="getData" :setPopup="popupData"></uni-relation-popup>
		</uni-popup>
	</view>
</template>

<script>
	import service from '@/service.js';
	import ePicker from '@/components/e-picker/e-picker.vue';
	import uniProcess from '@/components/uni-processList/nui-processList.vue';
	import uniRelationPopup from '@/components/uni-relation-popup/uni-relation-popup.vue'
	import upload from '@/components/uni-uploader/uni-uploader.vue';
	import dPicker from '@/components/d-picker/d-picker.vue';
	import graceChecker from '@/common/graceChecker.js'
	import {
		mapState
	} from 'vuex'
	export default{
		components: {
			ePicker,
			uniProcess,
			uniRelationPopup,
			upload,
			dPicker
		},
		data(){
			return{
				mid:'',
				edit:'0',
				user:{},
				os: false,
				procInstId:'',
				formData:{
					id:'',
					userName:'',
					companyId:'',
					deptId:'',
					applyTime:service.getDate('date'),//申请日期
					projectId:'',//关联项目
					projectName:'',
					borrowType:0,//借款类型
					borrower:'',//借款人
					preBackDate:service.getDate('date'),//预计归还时间
					receiveAccount:'',//收款人账号
					borrowReason:'',//借款事由
					borrowAmount:'',//借款金额
					amountUpcase:'',//金额大写
					interestDate:service.getDate('date'),//起息日
					rate:'',//利率
					receiptWay:0,//收款方式
					alreadyReceiptInterest:'',//已收利息
					status:''
				},
				
				baseUrl:'oa/oaBorrowMoney',
				addUrl:'oa/oaBorrowMoney/add',
				saveUrl:'oa/oaBorrowMoney/saveDraft',
				
				borrowTypeList:[],//借款类型列表
				borrowTypeIndex:0,
				receiptWayList:[],//付款方式
				receiptWayIndex:0,
				
				//弹框
				type: '',
				popupState:false,
				popupData:{
					url:'', //查询数据接口
					popupType:'',   //显示内容
					selectType:'',  //单选或者多选 radio 或 checkbox
					titile:''  //标题
				},
				// 按钮
				loading1:false,
				loading2:false,
				loading3:false,
				//附件
				fileList:[],
				attachmentList:[]
			}
		},
		computed: mapState(['name', 'deptId', 'companyId', 'hasLogin']),
		onLoad(e) {
			this.edit=e.edit || '0'
			this.mid = e.id || ''
			let this_=this
			//用户信息
			if (this.edit == '0') {
			this.$set(this.formData,'companyId',this.companyId)
			this.$set(this.formData,'deptId',this.deptId)
			this.$set(this.formData,'userName',this.name)
			}
			//编辑页面信息
			if(this.edit=='1'){
				this.urlRequestGet('oa/oaBorrowMoney/phoneEdit/'+this.mid,'text/html;charset=UTF-8',function(res){
					console.log(res)
					service.listAssign(this_.formData,res.data)
					this_.procInstId=res.data.procInstId
				})
				//图片返显
				this.urlRequestPost('oa/oaAttachment/selectAttachByObjectId',{"objId": this.mid},null,function(res){
					for(let i in res.data.data){
						this_.fileList.push(this_.websiteUrl+res.data.data[i].attachmentName)
						this_.attachmentList.push({
							'objectId':this_.id,
							'attachmentName':res.data.data[i].attachmentName,
							'fileName':res.data.data[i].fileNamess
						})
					}
					
				})
			}
			
			//借款类型字典
			this.dictValue('oa_borrow_type').then(res => {
				this_.borrowTypeList=res.data
			})
			
			//借款类型字典
			this.dictValue('oa_borrow_time_type').then(res => {
				this_.receiptWayList=res.data
			})
		},
		methods:{
			// 提交和保存
			submit(flag){
				let this_=this
				let url = ''
				let data={}
				data['oaBorrowMoney']=this.formData
				data['attachmentList']=this.attachmentList
				let rule = [
				];
				//进行表单检查
				let checkRes = graceChecker.check(this.formData, rule);
				console.log(data)
				if(checkRes){
					// console.log(this.formData)
					switch(flag){
						case '1'://1代表的是提交
						     url=this.addUrl
							 this.loading2=true
							 break
					    case '0'://0代表的是保存
						     url=this.saveUrl
							 this.loading1=true
							 break
					}
					this.urlRequestPost(url,data,'application/json;charset=UTF-8',function(res){
						this_.loading1=false
						this_.loading2=false
						uni.showToast({title:res.data.msg, icon:"none"});
						if(res.data.code=='0'){
							uni.reLaunch({
							    url: '../../start/start'
							});
						}
					})
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			/**
			 * 抄送
			 */
			send(){
				uni.navigateTo({
				    url: "../../send/send?id="+this.mid+"&url="+this.baseUrl,
				});
			},
			/**
			 * 催办
			 */
			urge(){
				var this_=this
				this.loading3=true
				this.urlRequestGet(this.baseUrl+'/urge/'+this.mid,null,function(res){
					//this_.formData.leaveDays=res.data.hours
					// console.log(res)
					uni.showToast({title:res.data.msg, icon:"none"});
					if(res.data.code==0){
						this_.loading3=false
						uni.reLaunch({
						    url: '../../start/start'
						});
					}
					
				})
			},
			
			//申请时间选择
			changeStart: function(e) {
				this.formData.applyTime=e
			},
			//预计归还时间选择
			changePreBackDate: function(e) {
				this.formData.preBackDate=e
			},
			//起息日时间选择
			changeInterestDate: function(e) {
				this.formData.interestDate=e
			},
			//部门回传
			getDeptV(res){
				this.formData.deptId=res.deptId
				this.formData.companyId=res.companyId
			},
			// 弹框
			togglePopup(type, url,popupType,selectType,titile) {
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
				this.type = type
				this.popupState = true
				this.popupData.url=url
				this.popupData.popupType=popupType
				this.popupData.selectType=selectType
				this.popupData.titile=titile
			},
			//弹窗变动监听
			change(e) {
				// console.log('是否打开:' + e)
				if (!e.show) {
					this.popupState = false
				}
			},
			//关闭弹窗
			updatePopupState: function(res) {
			   this.popupState = res;
			},
			//获取数据
			getData:function(res){
				this.formData.projectId=res[0].id
				this.formData.projectName=res[0].projectName
			},
			// 附件回传
			getAttachmentList(res){
				this.attachmentList=res
			},
			//借款类型
			borrowTypeChange: function(e) {
				this.borrowTypeIndex = e.target.value
				// 借款类型赋值
				this.formData.borrowType=e.target.value
			},
			//付款方式
			receiptWayChange: function(e) {
				this.receiptWayIndex = e.target.value
				// 付款方式赋值
				this.formData.receiptWay=e.target.value
			},
			//大写转换
			Upcase(){
				let this_=this
				this.urlRequestGet('common/converMoneyToCN/'+this.formData.borrowAmount,null,function(res){
					this_.$set(this_.formData,'amountUpcase',res.data.msg)
				})
			},
		}
	}
</script>

<style>
	@import url("../../../static/css/oa.css");
	.biaoti{
		width: a;
		text-align: center;
	}
	.carbtn{
		border-radius: 10upx;
		overflow: hidden;
		margin-right: 10upx;
		box-shadow: 0 0 2upx #888888
	}
</style>
