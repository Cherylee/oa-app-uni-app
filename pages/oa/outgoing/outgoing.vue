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
				<d-picker class="uni-input" v-if="formData.applyCompanyId" :companyId="formData.applyCompanyId" :deptId="formData.applyDeptId" @getDeptV="getDeptV"></d-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>外出起始时间</view>
				<input class="hidden" name="goOutStart"   v-model="formData.goOutStart"/>
				<e-picker class="uni-input" mode="dateTime" :showValue="(formData.goOutStart?formData.goOutStart:dateStart)"  @change="changeStart">{{(formData.goOutStart?formData.goOutStart:dateStart)}}</e-picker>
				<!-- <input class="uni-input" name="goOutStart" focus placeholder="外出起始时间" /> -->
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>外出结束时间</view>
				<input class="hidden" name="goOutEnd"   v-model="formData.goOutEnd"/>
				<e-picker class="uni-input" mode="dateTime" :showValue="(formData.goOutEnd?formData.goOutEnd:dateEnd)"  @change="changeEnd">{{(formData.goOutEnd?formData.goOutEnd:dateEnd)}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>外出时长</view>
				<input class="uni-input" name="goOutHour"  disabled="true"    placeholder="外出时长" v-model="formData.goOutHour"/>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>外出事由</view>
				<input class="uni-input" name="reason" v-model="formData.reason"   placeholder="外出事由" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">备注</view>
				<input class="uni-input" name="remark"  v-model="formData.remark"  placeholder="备注" />
			</view>
			<uni-uploader  :imageList="fileList" :os="os" @attachmentList="getAttachmentList"></uni-uploader>
			<view class="button-sp-area">
				<button class="mini-btn" type="info" size="mini" :loading="loading1" @click="submit('0')" v-if="formData.status=='99'||formData.status==''">保存草稿</button>
				<button class="mini-btn" type="primary" @click="submit('1')" :loading="loading2" v-if="formData.status=='99'||formData.status==''"  size="mini">提交</button>
				<button class="mini-btn" type="primary" @click="submit('2')" v-if="formData.status=='3'"  size="mini">提交</button>
				<button class="mini-btn cui-btn-2" type="info" :loading="loading3" @click="urge()"   v-if="formData.status!=''&&formData.status!='2'&&formData.status!='16'&&formData.status!='99'"  size="mini">催办</button>
				<button class="mini-btn cui-btn-1" type="info"  v-if="formData.status!='99'&&formData.status!=''"  size="mini" @click="send()">抄送</button>
			</view>
		</form>
		<uni-process :baseUrl="baseUrl" :procInstId="procInstId" :mid="mid" v-if="edit=='1'&&procInstId"></uni-process>
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
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			ePicker,
			uniProcess,
			upload
		},
		data() {
			return {
				mid:'',
				edit:'',
				user:{},
				os:false,
				formData:{
					id:'',
					userName:'',
					applyCompanyId:'',
					applyDeptId:'',
					goOutStart:service.getDate('dateTime'),
					goOutEnd:service.getDate('dateTime'),
					goOutHour:0,
					reason:'',
					remark:'',
					status:''
				},
				baseUrl:'oa/oaOutgoing',
				addUrl:'oa/oaOutgoing/add',
				saveUrl:'oa/oaOutgoing/saveDraft',
				editUrl:'oa/oaOutgoing/modifyOaOutgoing',
				submitDraftUrl:'oa/oaOutgoing/submitDraft',
				flag:false,
				index: 0,
				date: service.getDate('dateTime'),
				dateStart:service.getDate('dateTime'),
				dateEnd:service.getDate('dateTime'),
				timeLimit:'',
				loading1:false,
				loading2:false,
				loading3:false,
				procInstId:'',
				// //附件
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
				this.$set(this.formData, 'userName', this.name)
				this.$set(this.formData, 'applyCompanyId', this.companyId)
				this.$set(this.formData, 'applyDeptId', this.deptId)
			}
			//编辑页面信息
			if(this.edit=='1'){
				this.urlRequestGet('oa/oaOutgoing/phoneEdit/'+this.mid,'text/html;charset=UTF-8',function(res){
					console.log(res.data)
					service.listAssign(this_.formData,res.data)
					this_.procInstId=res.data.procInstId
				})
				//图片返显
				this.urlRequestPost('oa/oaAttachment/selectAttachByObjectId',{"objId": this.mid},null,function(res){
					for(let i in res.data.data){
						this_.fileList.push(this.websiteUrl+res.data.data[i].attachmentName)
						this_.attachmentList.push({
							'objectId':this_.id,
							'attachmentName':res.data.data[i].attachmentName,
							'fileName':res.data.data[i].fileNamess
						})
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
				    {name:"goOutStart", checkType : "notnull", checkRule:"",  errorMsg:"开始时间必填"},
				    {name:"goOutEnd", checkType : "notnull", checkRule:"",  errorMsg:"结束时间必填"},
				    {name:"goOutHour", checkType : "notnull", checkRule:"",  errorMsg:"时长必填"},
					{name:"reason", checkType : "notnull", checkRule:"",  errorMsg:"理由必填"}
				];
				data.oaOutgoing=this.formData
				data.attachmentList=this.attachmentList
				//进行表单检查
				let checkRes = graceChecker.check(this.formData, rule);
				if(checkRes){
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
			changeStart: function(e) {
				this.formData.goOutStart=e
				this.showValue = e
				this.dateStart = e
				this.getTimeLimit(this.dateStart,this.dateEnd)
			},
			changeEnd: function(e) {
				this.formData.goOutEnd=e
				this.showValue = e
				this.dateEnd = e
				this.getTimeLimit(this.dateStart,this.dateEnd)
			},
			getTimeLimit(start,end){
				let this_=this
				let dataTime={}
				dataTime.startTime=start
				dataTime.endTime=end
				this.urlRequestPost('oa/oaOutgoing/calculateHours',JSON.stringify(dataTime),'application/json;charset=UTF-8',function(res){
					if(res.data.retCode=='200'){
						this_.$set(this_.formData,'goOutHour',res.data.time)
					}else{
						uni.showToast({title:res.data.msg, icon:"none"});
					}
				})
			},
			//部门回传
			getDeptV(res) {
				console.log(res)
				this.formData.applyDeptId = res.deptId
				this.formData.applyCompanyId = res.companyId
			},
			send(){
				uni.navigateTo({
				    url: "../../send/send?id="+this.mid+"&url="+this.baseUrl,
				});
			},
			urge(){
				var this_=this
				this.loading3=true
				this.urlRequestGet(this.baseUrl+'/urge/'+this.mid,null,function(res){
					//this_.formData.leaveDays=res.data.hours
					uni.showToast({title:res.data.msg, icon:"none"});
					if(res.data.code==0){
						this_.loading3=false
						uni.reLaunch({
						    url: '../../start/start'
						});
					}
					
				})
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
	.cell-pd {
		padding: 22upx 30upx;
	}
	
	.list-pd {
		margin-top: 50upx;
	}
	.uni-uploader_close{
		position: relative;
	}
	.closeBtn{
		position: absolute;
		top: 0upx;
		right: 0upx;
		width: 40upx;
		height: 45upx;
		background: rgba(255,255,255,0.5);
		text-align: center;
	}
	.closeB{
		margin: 0 auto;
		color: #FFFFFF;
		font-size: 28upx;
		line-height: 40upx;
	}
</style>
