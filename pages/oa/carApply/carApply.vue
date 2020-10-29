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
				<view class="title"><span class="red">*</span>出发时间</view>
				<input class="hidden" name="applyTimeFrom"   v-model="formData.applyTimeFrom"/>
				<e-picker class="uni-input" mode="dateTime" :showValue="(formData.applyTimeFrom?formData.applyTimeFrom:dateStart)"  @change="changeStart">{{(formData.applyTimeFrom?formData.applyTimeFrom:dateStart)}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>返回时间</view>
				<input class="hidden" name="applyTimeTo"   v-model="formData.applyTimeTo"/>
				<e-picker class="uni-input" mode="dateTime" :showValue="(formData.applyTimeTo?formData.applyTimeTo:dateEnd)"  @change="changeEnd">{{(formData.applyTimeTo?formData.applyTimeTo:dateEnd)}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>车牌号</view>
				<input class="hidden" name="carNo"  v-model="formData.carNo" />
				<input class="uni-input" name="carDetail" v-model="carDetail" @input="carDetailFun()" placeholder="车牌号"  />
				<button class=" carbtn " @tap="togglePopup('center', 'car')">选择车辆</button>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">用车时长</view>
				<input class="uni-input" name="carUsed"  disabled="true"    placeholder="用车时长" v-model="formData.carUsed"/>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">驾驶员信息</view>
				<input class="uni-input" name="driverInfo"  v-model="formData.driverInfo"    placeholder="驾驶员信息" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>乘客信息</view>
				<input class="uni-input" name="passengerInfo"  v-model="formData.passengerInfo"    placeholder="乘客信息" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>乘车地点</view>
				<input class="uni-input" name="ridePlace"  v-model="formData.ridePlace"    placeholder="乘车地点" />
			</view>
			
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>用车事由</view>
				<input class="uni-input" name="applyReason"  v-model="formData.applyReason"    placeholder="用车事由" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>目的地</view>
				<input class="uni-input" name="destination"  v-model="formData.destination"    placeholder="目的地" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">里程开始数</view>
				<input class="uni-input" name="mileageStart"  v-model="formData.mileageStart"    placeholder="里程开始数" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">里程终止数</view>
				<input class="uni-input" name="mileageEnd"  v-model="formData.mileageEnd"   placeholder="里程终止数" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">行驶里程数</view>
				<input class="uni-input" name="mileage"  v-model="formData.mileage"   placeholder="行驶里程数" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">指定司机</view>
				<input class="uni-input" name="designatedDriver"  v-model="formData.designatedDriver"   placeholder="指定司机" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">备注</view>
				<input class="uni-input" name="remark"  v-model="formData.remark"   placeholder="备注" />
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
		<!-- 印章弹窗 -->
		<uni-popup :show="showcar" :type="type" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">选择车辆</text>
				<scroll-view scroll-y="true" class="uni-tip-content" @scrolltolower="carlower">
					<view class="loading-more" v-if="cardata.length==0"><text class="loading-more-text">暂无车辆！</text></view>
					<view class="uni-list" v-else>
						<radio-group @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in cardata" :key="item.id" :style="{'background':item.disabled?'#f7f7f7':'none'}">
								<view>
									<radio :value="item.id" :checked="index === currentP" />
								</view>
								<view >
									<view>品牌：{{item.carBrad}}</view>
									<view>车身颜色：{{item.bodyColor}}</view>
									<view>车牌号：{{item.carNo}}</view>
									<view>归属人：{{item.userName}}</view>
									<!-- <view>部门：{{item.borrowAmount}}</view>
									<view>申请时间：{{item.applyTime}}</view> -->
								</view>
							</label>
						</radio-group>
					</view>
					<view class="loading-more" v-if="isLoading || total > 3">
						<text class="loading-more-text">{{tiptext}}</text>
					</view>
				</scroll-view>
				
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('car')">取消</text>
					<text class="uni-tip-button" @click="cancel('car','1')">确定</text>
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
			uniIcons,
			dPicker
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
					applyTimeFrom:service.getDate('dateTime'),
					applyTimeTo:service.getDate('dateTime'),
					carNo:'',
					carUsed:0,
					driverInfo:'',
					passengerInfo:'',
					ridePlace:'',
					applyReason:'',
					destination:'',
					mileageStart:'',
					mileageEnd:'',
					mileage:'',
					designatedDriver:'',
					remark:'',
					status:''
				},
				carDetail:'',//车辆详情信息展示
				baseUrl:'oa/oaCarApply',
				addUrl:'oa/oaCarApply/add',
				saveUrl:'oa/oaCarApply/saveDraft',
				editUrl:'oa/oaCarApply/edit',
				flag:false,
				// 当前时间
				date: service.getDate('dateTime'),
				dateStart:service.getDate('dateTime'),
				dateEnd:service.getDate('dateTime'),
				timeLimit:'',
				//车辆
				cardata:[],
				carLists:[],
				tiptext:'加载中.....',
				isLoading:false,
				pageSize:3,
				pageNum:1,
				total:0,
				currentP:0,
				// 按钮
				loading1:false,
				loading2:false,
				loading3:false,
				// 流程
				procInstId:'',
				//弹框
				type: '',
				showcar:false
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
			//编辑页面信息
			if(this.edit=='1'){
				this.urlRequestGet(this.baseUrl+'/phoneEdit/'+this.mid,'text/html;charset=UTF-8',function(res){
					console.log(res)
					service.listAssign(this_.formData,res.data)
					this_.procInstId=res.data.procInstId
					// console.log(this_.procInstId)
					this_.carDetail=res.data.carNo
				})
			}
			//获取印章列表
			this.getCarList()
				
		},
		methods: {
			// 提交和保存
			submit(flag){
				let this_=this
				let url = ''
				let data={}
				//定义表单规则			
				let rule = [
				    {name:"applyTimeFrom", checkType : "notnull", checkRule:"",  errorMsg:"出发时间必填"},
				    {name:"applyTimeTo", checkType : "notnull", checkRule:"",  errorMsg:"返回时间必填"},
				    {name:"carNo", checkType : "notnull", checkRule:"",  errorMsg:"车牌号必填"},
				    {name:"passengerInfo", checkType : "notnull", checkRule:"",  errorMsg:"乘客信息必填"},
				    {name:"ridePlace", checkType : "notnull", checkRule:"",  errorMsg:"乘车地点必填"},
				    {name:"applyReason", checkType : "notnull", checkRule:"",  errorMsg:"用车事由必填"},
				    {name:"destination", checkType : "notnull", checkRule:"",  errorMsg:"目的地必填"}
				];
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
					console.log(this.formData)
					this.urlRequestPost(url,this.formData,null,function(res){
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
			changeStart: function(e) {
				this.formData.applyTimeFrom=e
				this.showValue = e
				this.dateStart = e
				this.getTimeLimit(this.dateStart,this.dateEnd)
			},
			changeEnd: function(e) {
				this.formData.applyTimeTo=e
				this.showValue = e
				this.dateEnd = e
				this.getTimeLimit(this.dateStart,this.dateEnd)
			},
			getTimeLimit(start,end){
				let this_=this
				let dataTime={}
				dataTime.startTime=start
				dataTime.endTime=end
				this.urlRequestPost(this.baseUrl+'/calculateHour',JSON.stringify(dataTime),'application/json;charset=UTF-8',function(res){
					console.log(res)
					if(res.data.code==0){
						this_.$set(this_.formData,'carUsed',res.data.msg)
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
				if(flag=='1'){//确认按钮事件
					this.$set(this.formData,'carNo',this.cardata[this.currentP].carNo)
					this.carDetail=this.cardata[this.currentP].carBrad+'-'+this.cardata[this.currentP].bodyColor+'-'+this.cardata[this.currentP].carNo
					console.log(this.cardata)
				}
			},
			//判断是否已经添加过了
			ifadd(id){
				let blo=false
				for (let i in this.sealdata) {
					if(id==this.sealdata[i].id){
						blo=true
					}
				}
				return blo
			},
			//弹窗变动监听
			change(e) {
				// console.log('是否打开:' + e)
				if (!e.show) {
					this.showcar = false
				}
			},
			//报销类型多选框监听
			radioChange(evt) {
				// console.log(evt.target.value)
				for (let i = 0; i < this.cardata.length; i++) {
					if (this.cardata[i].id === evt.target.value) {
						this.currentP = i;
						break;
					}
				}
			},
			/**
			 * @param {Object} e借款单
			 */
			getCarList(){
				let this_=this
				//借款单信息
				this.urlRequestPost('oa/oaCar/phoneList',{'pageSize':this.pageSize,'pageNum':this.pageNum},null,function(res){
					console.log(res)
					let activeTab =this_.cardata
					let list = [];
					for(let a in res.data.rows){
						list.push(res.data.rows[a]);
					}
					if(this_.pageNum<=1){
						this_.cardata = list;
					}else{
						this_.cardata = activeTab.concat(list);
					}
					this_.total=res.data.total
				})
			},
			//借款单下滑至底部监听
			carlower(e){
				// console.log(this.total)
				setTimeout(() => {
					let uPageNum=Math.ceil(this.total/this.pageSize)
					// console.log(uPageNum)
					if(this.pageNum<uPageNum){
						// console.log(uPageNum)
						this.pageNum++
						this.getCarList();
					}else{
						this.tiptext='没有数据了！'
					}
					
				}, 500)
			},
			carDetailFun(){
				this.formData.carNo=this.carDetail
			},
			//部门回传
			getDeptV(res) {
				this.formData.deptId = res.deptId
				this.formData.companyId = res.companyId
			}
			
		}
	}
</script>

<style>
	@import url("../../../static/css/oa.css");
	.carbtn{
		font-size: 28upx;
		border-radius: 0;
		border: 0;
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
			height:550upx;
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
