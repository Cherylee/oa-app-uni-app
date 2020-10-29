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
				<view class="title"><span class="red">*</span>补登起始时间</view>
				<input class="hidden" name="supplyStart"   v-model="formData.supplyStart"/>
				<e-picker class="uni-input" mode="dateTime" :showValue="(formData.supplyStart?formData.supplyStart:dateStart)"  @change="changeStart">{{(formData.supplyStart?formData.supplyStart:dateStart)}}</e-picker>
				<!-- <input class="uni-input" name="goOutStart" focus placeholder="外出起始时间" /> -->
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>补登结束日期</view>
				<input class="hidden" name="supplyEnd"   v-model="formData.supplyEnd"/>
				<e-picker class="uni-input" mode="dateTime" :showValue="(formData.supplyEnd?formData.supplyEnd:dateEnd)"  @change="changeEnd">{{(formData.supplyEnd?formData.supplyEnd:dateEnd)}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>补登天数</view>
				<input class="uni-input" name="supplyDays"  disabled="true"    placeholder="补登天数" v-model="formData.supplyDays"/>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">事由</view>
				<input class="uni-input" name="reason" v-model="formData.reason"   placeholder="事由" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">备注</view>
				<input class="uni-input" name="remark"  v-model="formData.remark"  placeholder="备注" />
			</view>
			<view>
				<view class="uni-list list-pd filebox">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-head">
								<view class="uni-uploader-title"><text class="filetitlee">附件:</text>(点击可预览选好的图片)</view>
								<view class="uni-uploader-info">{{imageList.length}}/9</view>
							</view>
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-for="(image,index) in imageList" :key="index" class="uni-uploader_close">
										<view class="uni-uploader__file uni-uploader_close">
											<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
											<view class="closeBtn" @tap="deleImage(index)">
												<text class="closeB"/> X </text>
											</view>
										</view>
									</block>
									<view class="uni-uploader__input-box">
										<view class="uni-uploader__input" @tap="chooseImage"></view>
									</view>
								</view>
							</view>
						</view>
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
	import graceChecker from '@/common/graceChecker.js'
	import ePicker from '@/components/e-picker/e-picker.vue';
	import uniProcess from '@/components/uni-processList/nui-processList.vue';
	import permision from "@/common/permission.js"
	import dPicker from '@/components/d-picker/d-picker.vue';
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			ePicker,
			uniProcess
		},
		data() {
			return {
				mid:'',
				edit:'',
				user:{},
				formData:{
					id:'',
					userName:'',
					applyCompanyId:'',
					applyDeptId:'',
					supplyStart:service.getDate('dateTime'),
					supplyEnd:service.getDate('dateTime'),
					supplyDays:0,
					reason:'',
					remark:'',
					status:''
				},
				baseUrl:'oa/oaSupplyCard',
				addUrl:'oa/oaSupplyCard/add',
				saveUrl:'oa/oaSupplyCard/saveDraft',
				editUrl:'oa/oaSupplyCard/modifyOaSupplyCard',
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
				//附件
				attachmentList:[],
				title: 'choose/previewImage',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 1,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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
				this.urlRequestGet(this.baseUrl+'/phoneEdit/'+this.mid,'text/html;charset=UTF-8',function(res){
					service.listAssign(this_.formData,res.data)
					this_.procInstId=res.data.procInstId
				})
				//图片返显
				this.urlRequestPost('oa/oaAttachment/selectAttachByObjectId',{"objId": this.mid},null,function(res){
					for(let i in res.data.data){
						this_.imageList.push(this.websiteUrl+res.data.data[i].attachmentName)
						this_.attachmentList.push({
							'objectId':this_.id,
							'attachmentName':res.data.data[i].attachmentName,
							'fileName':res.data.data[i].fileNamess
						})
					}
					
				})
			}
		},
		onReady() {
			let this_=this
		},
		methods: {
			// 提交和保存
			submit(flag){
				let this_=this
				let url = ''
				let data={}
				//定义表单规则			
				let rule = [
				    {name:"supplyStart", checkType : "notnull", checkRule:"",  errorMsg:"开始时间必填"},
				    {name:"supplyEnd", checkType : "notnull", checkRule:"",  errorMsg:"结束时间必填"},
				    {name:"supplyDays", checkType : "notnull", checkRule:"",  errorMsg:"时长必填"}
				];
				data.oaSupplyCard=this.formData
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
						case '2':
						     url=this.editUrl
							 this.loading1=true
							 break
					}
					this.urlRequestPost(url,data,'application/json;charset=UTF-8',function(res){
						console.log(res)
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
				this.formData.supplyStart=e
				this.showValue = e
				this.dateStart = e
				this.getTimeLimit(this.dateStart,this.dateEnd)
			},
			changeEnd: function(e) {
				this.formData.supplyEnd=e
				this.showValue = e
				this.dateEnd = e
				this.getTimeLimit(this.dateStart,this.dateEnd)
			},
			getTimeLimit(start,end){
				let this_=this
				let dataTime={}
				dataTime.startTime=start
				dataTime.endTime=end
				this.urlRequestPost(this.baseUrl+'/calculateDays',JSON.stringify(dataTime),'application/json;charset=UTF-8',function(res){
					if(res.data.retCode=='200'){
						console.log(res.data)
						this_.$set(this_.formData,'supplyDays',res.data.time)
					}else{
						uni.showToast({title:res.data.msg, icon:"none"});
					}
				})
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
					console.log(res)
					uni.showToast({title:res.data.msg, icon:"none"});
					if(res.data.code==0){
						this_.loading3=false
						uni.reLaunch({
						    url: '../../start/start'
						});
					}
					
				})
			},
			//附件
			chooseImage: async function() {
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
					//console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				var this_=this
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						// this.imageList = this.imageList.concat(res.tempFilePaths);
						var imageSrc = res.tempFilePaths
						for(let i in imageSrc){
							 uni.uploadFile({
								url:this.websiteUrl+'common/bootstrapFileInputUpload',
								filePath: imageSrc[i],
								fileType: 'image',
								name: 'data',
								success: (res) => {
									uni.showToast({
										title: '上传成功',
										icon: 'success',
										duration: 1000
									})
									let imgs =  {
										'attachmentName':JSON.parse(res.data).fileName,
										'fileName':JSON.parse(res.data).sourceFileName
										}
									this_.imageList.push(imageSrc[i])//用于回显图片预览
									this_.attachmentList.push(imgs)//用于上传
									//console.log(imgs)
								},
								fail: (err) => {
									//console.log('uploadImage fail', err);
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
			deleImage(index){
				let current=index
				this.imageList.splice(current,1)//回显删除
				this.attachmentList.splice(current,1)
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
				console.log(res)
				this.formData.applyDeptId = res.deptId
				this.formData.applyCompanyId = res.companyId
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
