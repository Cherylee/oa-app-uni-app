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
				<d-picker class="uni-input" :companyId="formData.companyId" :deptId="formData.deptId" @getDeptV="getDeptV"></d-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">申请日期</view>
				<e-picker class="uni-input" mode="dateTime" :showValue="(formData.applyTimeFrom?formData.applyTimeFrom:dateStart)"  @change="changeStart">{{(formData.applyTimeFrom?formData.applyTimeFrom:dateStart)}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">投标公司</view>
				<input class="uni-input"  name="tenderCompany" placeholder="投标公司" v-model="formData.tenderCompany" />
				<picker   class=" carbtn " mode="multiSelector" @columnchange="updateReason" :value="reasonIndex" :range="reasonLise">
					<view class="uni-input">选择公司</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">保证金类型</view>
				<picker class="picker" @change="marginTypeChange" :value="marginTypeIndex" :range="marginTypeList" range-key="dictLabel">
					<view class="uni-input">{{(marginTypeList[marginTypeIndex]?marginTypeList[marginTypeIndex]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">转账方式</view>
				<picker class="picker" @change="transferMethodChange" :value="transferMethodIndex" :range="transferMethodList" range-key="dictLabel">
					<view class="uni-input">{{(transferMethodList[transferMethodIndex]?transferMethodList[transferMethodIndex]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">关联收款单</view>
				<input class="uni-input" disabled v-model="formData.receiptCode" @tap="togglePopup('center','oa/oaReceivables/phoneList','oaReceivables','radio','收款单')" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">工程名称</view>
				<input class="uni-input" disabled v-model="formData.projectName" @tap="togglePopup('center','business/jyTenderNotice/phoneList','TB-0','radio','工程')" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">投标方式</view>
				<picker class="picker" @change="tenderTypeChange" :value="tenderTypeIndex" :range="tenderTypeList" range-key="dictLabel">
					<view class="uni-input">{{(tenderTypeList[tenderTypeIndex]?tenderTypeList[tenderTypeIndex]:{}).dictLabel}}</view>
				</picker>
				
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">到账截止时间</view>
				<e-picker class="uni-input" mode="dateTime" :showValue="(formData.endArrivalTime?formData.endArrivalTime:dateEnd)"  @change="changeEnd">{{(formData.endArrivalTime?formData.endArrivalTime:dateEnd)}}</e-picker>
				
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">保证金总金额</view>
				<input class="uni-input" name="marginTotalMoney" type="number" v-model="formData.marginTotalMoney" @input="Upcase()"  placeholder="保证金总金额" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">金额大写</view>
				<input class="uni-input" name="totalMoneyUpcase" v-model="formData.totalMoneyUpcase"   placeholder="金额大写" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">转账说明</view>
				<input class="uni-input" name="transferDesc" v-model="formData.transferDesc"   placeholder="转账说明" />
			</view>
			
			<view class="biaoti title"> 款项来源人明细</view>
			<view class="uni-form-item uni-row">
				<view class="title">款项来源人</view>
				<input class="uni-input" name="sourceOfPayment" v-model="formData.sourceOfPayment"   placeholder="款项来源人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">来源人开户行</view>
				<input class="uni-input" name="sourceOfAccount" v-model="formData.sourceOfAccount"   placeholder="来源人开户行" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">来源人账号</view>
				<input class="uni-input" name="sourceOpenBank" v-model="formData.sourceOpenBank"   placeholder="来源人账号" />
			</view>
			
			<view  class="biaoti title"> 保证金收款明细</view>
			<view class="uni-form-item uni-row">
				<view class="title">收款人</view>
				<input class="uni-input" name="collectOfPayment" v-model="formData.collectOfPayment"   placeholder="收款人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">收款人账号</view>
				<input class="uni-input" name="collectOfAccount" v-model="formData.collectOfAccount"   placeholder="收款人账号" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">收款开户行</view>
				<input class="uni-input" name="collectOpenBank" v-model="formData.collectOpenBank"   placeholder="收款开户行" />
			</view>
			<!-- 附件 -->
			<uni-uploader  :imageList="fileList" :os="os" @attachmentList="getAttachmentList"></uni-uploader>
			
			<view class="button-sp-area">
				<button class="mini-btn" type="info" size="mini" :loading="loading1" @click="submit('0')" v-if="formData.applyStatus=='99'||formData.applyStatus==''">保存草稿</button>
				<button class="mini-btn" type="primary" @click="submit('1')" :loading="loading2" v-if="formData.applyStatus=='99'||formData.applyStatus==''"  size="mini">提交</button>
				<button class="mini-btn" type="primary" @click="submitHandler('2')" v-if="formData.applyStatus=='3'"  size="mini">提交</button>
				<button class="mini-btn cui-btn-2" type="info" :loading="loading3" @click="urge()"   v-if="formData.applyStatus!=''&&formData.applyStatus!='2'&&formData.applyStatus!='16'&&formData.applyStatus!='99'"  size="mini">催办</button>
				<button class="mini-btn cui-btn-1" type="info"  v-if="formData.applyStatus!='99'&&formData.applyStatus!=''"  size="mini" @click="send()">抄送</button>
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
	import uniRelationPopup from '@/components/uni-relation-popup/uni-relation-popup.vue';
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
				edit:'',
				user:{},
				procInstId:'',
				formData:{
					id:'',
					userName:'',
					companyId:'',
					applyDeptId:'',
					deptId:'',
					applyTimeFrom:service.getDate('dateTime'),//申请日期
					tenderCompany:'',//投标公司
					marginType:'',//保证金类型
					transferMethod:'',//转账方式
					receiptId:'',//关联收款单
					receiptCode:'',
					projectId:'',//工程名称
					projectName:'',
					tenderType:'',//投标方式 
					endArrivalTime:service.getDate('dateTime'),//到账截止时间
					marginTotalMoney:'',//保证金总金额
					totalMoneyUpcase:'',//保证金总金额大写
					transferDesc:'',//转账说明
					sourceOfPayment:'',//款项来源人
					sourceOfAccount:'',//来源人开户行
					sourceOpenBank:'',//来源人账号
					collectOfPayment:'',//收款人
					collectOfAccount:'',//收款人账号
					collectOpenBank:'',//收款开户行
					status:'',
					applyStatus:''
				},
				
				baseUrl:'oa/oaMargin',
				addUrl:'oa/oaMargin/add',
				saveUrl:'oa/oaMargin/saveDraft',
				
				tenderDate:{},//投标详情
				marginTypeList:[],//保证金类型列表
				marginTypeIndex:0,
				transferMethodList:[],//转账方式
				transferMethodIndex:0,
				tenderTypeList:[],//投标方式
				tenderTypeIndex:0,
				dateStart:service.getDate('dateTime'),
				dateEnd:service.getDate('dateTime'),
				// 部门
				company:[],
				//投标公司
				reasonLise: [
					['百川'],
					[],
				],
				reasonId: [
					['100'],
					[],
				],
				reasonIndex:[0,0],
				
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
				os:false,
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
			this.$set(this.formData,'companyId',this.companyId)
			this.$set(this.formData,'deptId',this.deptId)
			this.$set(this.formData,'userName',this.name)
			// 公司集合
			this_.urlRequestGet('system/dept/list?parentId=100','text/html;charset=UTF-8',function(res){
				if(res.statusCode='200'){
					this_.company=res.data;
					let companyList=[]
					let companyIdList=[]
					for (let i in this_.company) {
						companyList.push(this_.company[i].deptName)
						companyIdList.push(this_.company[i].deptId)
					}
					this_.reasonLise[1]=companyList
					this_.reasonId[1]=companyIdList
				}
			})
			
			if(this.edit=='0'||this.edit==''){
				//获取投标公告信息
				this_.urlRequestGet('/business/jyTender/toPhoneJyTenderExamine/'+e.id,null,function(res){
					this_.tenderDate=res.data.jyTender
					this_.formData.projectName=this_.tenderDate.projectName
				})
			}
			
			
			//保证金类型字典
			this.dictValue('oa_jy_margin_type').then(res => {
				this_.marginTypeList=res.data
				
			})
			//转账方式类型字典
			this.dictValue('oa_margin_tansfer').then(res => {
				this_.transferMethodList=res.data
				
			})
			
			//投标方式类型字典
			this.dictValue('business_project_type').then(res => {
				this_.tenderTypeList=res.data
				
			})
			
			//编辑页面信息
			if(this.edit=='1'){
				this.urlRequestGet('oa/oaMargin/phoneEdit/'+this.mid,'text/html;charset=UTF-8',function(res){
					service.listAssign(this_.formData,res.data)
					this_.formData.applyStatus=res.data.applyStatus
					this_.procInstId=res.data.procInstId
					if(this_.formData.marginType==0){
						//转账方式字典
						this_.dictValue('oa_margin_tansfer').then(res => {
							this_.transferMethodList=res.data
						})
					}else if(this_.formData.marginType==1){
						this_.dictValue('oa_margin_guarantee').then(res => {
							this_.transferMethodList=res.data
						})
					}
				})
				//图片返显
				this.urlRequestPost('oa/oaAttachment/selectAttachByObjectId',{"objId": this.mid},null,function(res){
					console.log(res.data.data)
					for(let i in res.data.data){
						this_.fileList.push(this_.websiteUrl+res.data.data[i].attachmentName)
						this_.attachmentList.push({
							'objectId':this_.id,
							'attachmentName':res.data.data[i].attachmentName,
							'fileName':res.data.data[i].fileNamess
						})
					}
					
				})
			}else{
				this_.formData.marginType=0
				this_.formData.transferMethod=0
				this_.formData.tenderType=0
			}
		},
		methods:{
			// 提交和保存
			submit(flag){
				let this_=this
				let url = ''
				let data={}
				data['oaMargin']=this.formData
				data.attachmentList=this.attachmentList
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
				this.formData.applyTimeFrom=e
			},
			
			//到账截至时间选择
			changeEnd:function(e){
				this.formData.endArrivalTime=e
			},

			// 选择投标公司
			updateReason: function(e){
				this.reasonIndex[e.detail.column] = e.detail.value
				this.formData.tenderCompany=this.reasonLise[this.reasonIndex[0]]+','+this.reasonLise[1][this.reasonIndex[1]]
				this.$forceUpdate()
			},
			/**
			 * 字典回显
			 */
			getDictV(type,value){
				let dictV=''
				for(let i in type){
					if(type[i].dictValue==value){
						dictV=type[i].dictLabel
					}
				}
				return dictV
			},
			//部门回传
			getDeptV(res){
				this.formData.deptId=res.deptId
				this.formData.companyId=res.companyId
			},
			//保证金类型
			marginTypeChange: function(e) {
				this.marginTypeIndex = e.target.value
				// 保证金类型赋值
				this.formData.marginType=e.target.value
				this.transferMethodIndex=0
				console.log(e.target.value)
				if(e.target.value==0){
					//转账方式字典
					this.dictValue('oa_margin_tansfer').then(res => {
						this.transferMethodList=res.data
					})
				}else if(e.target.value==1){
					this.dictValue('oa_margin_guarantee').then(res => {
						this.transferMethodList=res.data
					})
				}
			},
			//转账方式类型
			transferMethodChange: function(e){
				this.transferMethodIndex = e.target.value
				// 转账方式类型赋值
				this.formData.transferMethod=e.target.value
			},
			//投标方式类型
			tenderTypeChange: function(e){
				this.tenderTypeIndex = e.target.value
				// 投标方式类型赋值
				this.formData.tenderType=e.target.value
			},
			//大写转换
			Upcase(){
				let this_=this
				this.urlRequestGet('common/converMoneyToCN/'+this.formData.marginTotalMoney,null,function(res){
					this_.$set(this_.formData,'totalMoneyUpcase',res.data.msg)
				})
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
			//获取弹窗数据数据
			getData:function(res){
				if(res[0].popupType=='oaReceivables'){
					this.formData.receiptId=res[0].id
					this.formData.receiptCode=res[0].code
				}
				if(res[0].popupType=='TB-0'){
					this.formData.projectId=res[0].id
					this.formData.projectName=res[0].projectName
				}
			},
			// 附件回传
			getAttachmentList(res){
				this.attachmentList=res
			}
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
