<template>
	<view class="uni-common-mt">
		<form >
			<input class="hidden" v-model="formData.id"  v-if="edit=='1'"/>
			<view class="uni-form-item uni-row">
				<view class="title">申请人</view>
				<input class="uni-input" v-model="formData.userName" placeholder="申请人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">申请公司</view>
				<d-picker class="uni-input"  v-if="formData.companyId" :companyId="formData.companyId" :deptId="formData.deptId" @getDeptV="getDeptV"></d-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">标题</view>
				<input class="uni-input" name="title" v-model="formData.title"   placeholder="标题" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>申购事由</view>
				<input class="uni-input" name="reason"  v-model="formData.reason"   placeholder="申购事由" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>备注</view>
				<input class="uni-input" name="remark" v-model="formData.remark"   placeholder="备注" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">申请类别</view>
				<input class="hidden" name="type" v-model="formData.type"   placeholder="申请类别" />
				<picker class="picker" @change="bindPickerChange" :value="index" :range="purchaseType" range-key="dictLabel">
					<view class="uni-input">{{(purchaseType[index]?purchaseType[index]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="borrow">
				<button class="mini-btn borrowbtn" type="info"  @click="togglePopup('center', 'detail')">物资明细</button>
				<view v-if="reimDetail.length!=0" class="borrowBox">
					<view v-for="(item,index) in reimDetail" :key="index" class="borrowitem">
						<view>物资名称：{{item.goodsName}}</view>
						<view>数量：{{item.num}} 单位：{{item.unit}} 单价：{{item.price}} 规格型号：{{item.brand}}</view>
						<view>使用时间：{{item.useTime}}</view>
						<view>备注：{{item.remark}}</view>
						<uni-icons class="btnclose" type="close" color="#cccccc"  size="40" @tap="dele(index)"/>
					</view>
				</view>
			</view>
			<view class="button-sp-area">
				<button class="mini-btn" type="info" size="mini" :loading="loading1" @click="submit('0')" v-if="formData.status=='99'||formData.status==''">保存草稿</button>
				<button class="mini-btn" type="primary" @click="submit('1')" :loading="loading2" v-if="formData.status=='99'||formData.status==''"  size="mini">提交</button>
				<button class="mini-btn" type="primary" @click="submit('2')" v-if="formData.status=='3'"  size="mini">提交</button>
				<button class="mini-btn cui-btn-2" type="info" :loading="loading3" @click="urge()"   v-if="formData.status!=''&&formData.status!='2'&&formData.status!='16'&&formData.status!='99'"  size="mini">催办</button>
				<button class="mini-btn cui-btn-1" type="info"  v-if="formData.status!='99'&&formData.status!=''"  size="mini" @click="send()">抄送</button>
			</view>
		</form>
		<uni-process :baseUrl="baseUrl" :procInstId="procInstId" :mid="mid" v-if="edit=='1'&&procInstId"></uni-process>
		<!-- 物资明细弹窗 -->
		<uni-popup :show="showdetail" :type="type" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">物资明细</text>
				<view class="uni-tip-content uni-tip-content-detail">
					<form>
						<view class="uni-form-item uni-row">
							<view class="title">物资名称</view>
							<input class="uni-input" placeholder="物资名称" name="goodsName"  v-model="details.goodsName"/>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">数量</view>
							<input class="uni-input" placeholder="数量" type="number" name="num"   v-model="details.num"/>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">单位</view>
							<input class="uni-input" placeholder="单位" name="unit"  v-model="details.unit"/>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">单价</view>
							<input class="uni-input" placeholder="单价" name="price" type="number"  v-model="details.price"/>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">规格型号</view>
							<input class="uni-input" placeholder="规格型号" name="brand"  v-model="details.brand"/>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">使用时间</view>
							<input class="hidden" name="useTime"   v-model="details.useTime"/>
							<e-picker class="uni-input" mode="dateTime" :showValue="(details.useTime?details.useTime:date)"  @change="changeStart">{{(details.useTime?details.useTime:date)}}</e-picker>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">备注</view>
							<input class="uni-input" placeholder="备注" name="remark"  v-model="details.remark"/>
						</view>
					</form>
				</view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('detail')">取消</text>
					<text class="uni-tip-button" @click="cancel('detail','1')">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import service from '@/service.js';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import graceChecker from '@/common/graceChecker.js'
	import uniProcess from '@/components/uni-processList/nui-processList.vue';
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
				mid:'',
				edit:'',
				user:{},
				// 基本数据
				formData:{
					id:'',
					userName:'',
					companyId:'',
					deptId:'',
					title:'',
					reason:'',
					remark:'',
					type:'',
					status:''
				},
				baseUrl:'oa/oapurchase',
				addUrl:'oa/oapurchase/add',
				saveUrl:'oa/oapurchase/saveDraft',
				editUrl:'oa/oapurchase/edit',
				flag:false,
				//物资类别
				purchaseType: [],
				index: 0,
				// 当前时间
				date: service.getDate('dateTime'),
				
				// 按钮
				loading1:false,
				loading2:false,
				loading3:false,
				// 流程
				procInstId:'',
				//报销明细
				reimDetail:[],
				details:{
					reimbursementReason:'',
					reimbursementType:'',
					money:null,
					file:[]
				},
				//弹框
				type: '',
				showdetail:false,
			}
		},
		computed: mapState(['name', 'deptId', 'companyId', 'hasLogin']),
		onLoad(e) {
			this.edit=e.edit || '0'
			this.mid = e.id || ''
			let this_=this
			//用户信息
			if (this.edit == '0') {
				this.$set(this.formData, 'userName', this.name)
				this.$set(this.formData, 'companyId', this.companyId)
				this.$set(this.formData, 'deptId', this.deptId)
			}
			//字典信息
			this.dictValue('oa_purchase_type').then(res => {
				// console.log(res)
				this_.purchaseType=res.data
			})
			//编辑页面信息
			if(this.edit=='1'){
				this.urlRequestGet(this.baseUrl+'/phoneEdit/'+this.mid,'text/html;charset=UTF-8',function(res){
					console.log(res)
					service.listAssign(this_.formData,res.data)
					this_.procInstId=res.data.procInstId
					// console.log(this_.procInstId)
				})
				//明细表
				this.urlRequestPost('oa/oaPurchaseDetail/list',{'purchaseId':this.mid},null,function(res){
					console.log(res)
					for (let i in res.data.rows) {
						this_.reimDetail.push(res.data.rows[i])
					}
				})
			}
				
		},
		methods: {
			// 提交和保存
			submit(flag){
				let this_=this
				let url = ''
				let data={}
				//定义表单规则			
				let rule = [
				    {name:"reason", checkType : "notnull", checkRule:"",  errorMsg:"事由必填"}
				];
				data.oaPurchase=this.formData
				data.oaPurchaseDetailList=this.reimDetail
				//进行表单检查
				let checkRes = graceChecker.check(this.formData, rule);
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
						case '2':
						     url=this.editUrl
							 this.loading1=true
							 break
					}
					this.urlRequestPost(url,data,'application/json;charset=UTF-8',function(res){
						// console.log(res)
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
				this.type = type
				this['show' + open] = true
			},
			//取消弹窗
			cancel(type,flag) {
				
				this['show' + type] = false
				if(flag=='1'){
					this.reimDetail.push(this.details)
				}
				 
			},
			//弹窗变动监听
			change(e) {
				// console.log('是否打开:' + e)
				if (!e.show) {
					this.showdetail = false
				}
			},
			//删除监听
			dele(index,flag){
                this.reimDetail.splice(index, 1);				
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
			//物资类别
			bindPickerChange: function(e) {
				this.index = e.target.value
				// 物资类别赋值
				this.formData.type=e.target.value
			},
			//使用时间
			changeStart: function(e) {
				this.details.useTime=e
				this.showValue = e
				this.date = e
			},
			//部门回传
			getDeptV(res) {
				this.formData.deptId = res.deptId
				this.formData.companyId = res.companyId
			},
			onBackPress() {
				//console.log('showborrow', this.showborrow);
				//console.log('showdetail', this.showdetail);
				if (this.showdetail) {
					this.showdetail = false
					return true
				}
			}
			
		}
	}
</script>

<style>
	@import url("../../../static/css/oa.css");
	.borrow{
		margin-bottom: 20upx;
	}
	.borrowbtn{
		width: 90%;
		margin: 0 auto;
	}
	.borrowBox{
		width: 90%;
		margin: 0 auto;
		margin-top: 15upx;
	}
	.borrowitem{
		border-bottom: 1upx solid #e2e2e2;
		padding: 20upx 20upx;
		background: #F8F8F8;
		position: relative;
	}
	.btnclose{
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
			height:700upx;
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
</style>
