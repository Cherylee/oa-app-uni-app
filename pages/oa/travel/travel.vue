<template>
	<view class="uni-common-mt">
		<form>
			<input class="hidden" v-model="formData.id"/>
			<view class="uni-form-item uni-row">
				<view class="title">申请人</view>
				<input class="uni-input" v-model="formData.proposer" placeholder="申请人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">申请公司</view>
				<d-picker class="uni-input" v-if="formData.companyId" :companyId="formData.companyId" :deptId="formData.deptId" @getDeptV="getDeptV"></d-picker>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>出差开始时间</view>
				<input class="hidden" name="applyTimeFrom"  v-model="formData.applyTimeFrom"/>
				<e-picker class="uni-input" mode="dateTime" :showValue="(formData.applyTimeFrom?formData.applyTimeFrom:dateStart)"  @change="changeStart">{{(formData.applyTimeFrom?formData.applyTimeFrom:dateStart)}}</e-picker>
				<!-- <input class="uni-input" name="goOutStart" focus placeholder="外出起始时间" /> -->
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>出差结束时间</view>
				<input class="hidden" name="applyTimeTo"  v-model="formData.applyTimeTo"/>
				<e-picker class="uni-input" mode="dateTime" :showValue="(formData.applyTimeTo?formData.applyTimeTo:dateEnd)"  @change="changeEnd">{{(formData.applyTimeTo?formData.applyTimeTo:dateEnd)}}</e-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>出差天数</view>
				<input class="uni-input" name="applyDays" v-model="formData.applyDays"  disabled="true"   placeholder="出差天数"/>
			</view>
			
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>出差事由</view>
				<input class="uni-input" name="applyReason" v-model="formData.applyReason"    placeholder="出差事由" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>是否公司购票</view>
				<input class="hidden" name="isCompanyTicket" v-model="formData.isCompanyTicket"/>
				<picker class="picker" @change="isCompanyTicket" :value="returnIndex(yes_no,formData.isCompanyTicket)" :range="yes_no" range-key="dictLabel">
					<view class="uni-input">{{(yes_no[index1]?yes_no[index1]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>是否借款</view>
				<input class="hidden" name="isBorrowMoney" v-model="formData.isBorrowMoney"/>
				<picker class="picker" @change="isBorrowMoney" :value="index2" :range="yes_no" range-key="dictLabel">
					<view class="uni-input">{{(yes_no[index2]?yes_no[index2]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>出差目的地</view>
				<input class="uni-input" name="travelDestination" v-model="formData.travelDestination" placeholder="出差目的地" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>乘坐交通工具</view>
				<input class="hidden" name="vehicle" v-model="formData.vehicle"/>
				<picker class="picker" @change="vehicle" :value="index3" :range="oa_travel_tool" range-key="dictLabel">
					<view class="uni-input">{{(oa_travel_tool[index3]?oa_travel_tool[index3]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">预算</view>
				<input class="uni-input" name="budget" v-model="formData.budget" type="number"    placeholder="预算" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">备注</view>
				<input class="uni-input" name="remark" v-model="formData.remark"    placeholder="备注" />
			</view>
			<view class="button-sp-area">
				<button class="mini-btn" type="info" size="mini" :loading="loading1" @click="submit('0')" v-if="formData.status=='99'||formData.status==''">保存草稿</button>
				<button class="mini-btn" type="primary" @click="submit('1')" :loading="loading2" v-if="formData.status=='99'||formData.status==''"  size="mini">提交</button>
				<button class="mini-btn" type="primary" @click="submit('2')" v-if="formData.status=='3'"  size="mini">提交</button>
				<button class="mini-btn cui-btn-2" type="info" :loading="loading3" @click="urge()"  v-if="formData.status!=''&&formData.status!='2'&&formData.status!='16'&&formData.status!='99'"  size="mini">催办</button>
				<button class="mini-btn cui-btn-1" type="info"  v-if="formData.status!='99'&&formData.status!=''"  size="mini" @click="send()">抄送</button>
			</view>
		</form>
		<uni-process :baseUrl="baseUrl" :procInstId="procInstId" :mid="mid" v-if="edit=='1'&&procInstId"></uni-process>
	</view>
</template>
<script>
	import service from '@/service.js';
	import graceChecker from '@/common/graceChecker.js'
	import dPicker from '@/components/d-picker/d-picker.vue';
	import ePicker from '@/components/e-picker/e-picker.vue';
	import uniProcess from '@/components/uni-processList/nui-processList.vue';
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
				edit:'0',
				mid:'',
				user:{},
				formData:{
					proposer:'',
					userName:'',
					companyId:'',
					deptId:'',
					applyTimeFrom:service.getDate('dateTime'),
					applyTimeTo:service.getDate('dateTime'),
					applyDays:'',
					applyReason:'',
					isCompanyTicket:'Y',
					isBorrowMoney:'Y',
					travelDestination:'',
					vehicle:'0',
					budget:0,
					remark:'',
					status:''
					
				},
				baseUrl:'oa/oatravel',
				addUrl:'oa/oatravel/add',
				saveUrl:'oa/oatravel/saveDraft',
				editUrl:'oa/oatravel/edit',
				yes_no: [],
				oa_travel_tool:[],
				index1: 0,
				index2: 0,
				index3: 0,
				date: service.getDate('dateTime'),
				dateStart:service.getDate('dateTime'),
				dateEnd:service.getDate('dateTime'),
				timeLimit:'',
				loading1:false,
				loading2:false,
				loading3:false,
				procInstId:''
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
				this.$set(this.formData, 'proposer', this.name)
			}
			//字典数据
			this.dictValue('oa_travel_tool').then(res => {
				this_.oa_travel_tool=res.data
			})
			this.dictValue('sys_yes_no').then(res => {
				this_.yes_no=res.data
			})
			//编辑页面信息
			if(this.edit=='1'){
				this.urlRequestGet('oa/oatravel/phoneEdit/'+this.mid,'text/html;charset=UTF-8',function(res){
					service.listAssign(this_.formData,res.data)
					this_.procInstId=res.data.procInstId
					this_.index1=this_.returnIndex(this_.yes_no,this_.formData.isCompanyTicket)
					this_.index2=this_.returnIndex(this_.yes_no,this_.formData.isBorrowMoney)
					this_.index3=this_.returnIndex(this_.oa_travel_tool,this_.formData.vehicle)
				})
				
			}
			
		},
		methods: {
			submit(flag){
				console.log(flag)
				let this_=this
				let url = ''
				//定义表单规则			
				let rule = [
				    {name:"applyTimeFrom", checkType : "notnull", checkRule:"",  errorMsg:"开始时间必填"},
				    {name:"applyTimeTo", checkType : "notnull", checkRule:"",  errorMsg:"结束时间必填"},
				    {name:"applyDays", checkType : "notnull", checkRule:"",  errorMsg:"时长必填"},
					{name:"applyReason", checkType : "notnull", checkRule:"",  errorMsg:"出差事由必填"},
					{name:"travelDestination", checkType : "notnull", checkRule:"",  errorMsg:"出差目的地必填"}
				];
				//进行表单检查
				var checkRes = graceChecker.check(this.formData, rule);
				if(checkRes){
					console.log(this.formData)
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
					this.urlRequestPost(url,this.formData,null,function(res){
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
			isCompanyTicket: function(e) {
				this.index1 = e.target.value
				this.formData.isCompanyTicket=this.yes_no[this.index1].dictValue
			},
			isBorrowMoney(e){
				this.index2 = e.target.value
				this.formData.isBorrowMoney=this.yes_no[this.index2].dictValue
			},
			vehicle(e){
				this.index3 = e.target.value
				this.formData.vehicle=this.oa_travel_tool[this.index3].dictValue
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
				this.urlRequestPost('oa/oatravel/calculateDays',JSON.stringify(dataTime),'application/json;charset=UTF-8',function(res){
					console.log(res)
					if(res.data.retCode=='200'){
						this_.$set(this_.formData,'applyDays',res.data.time)
					}else{
						this_.$set(this_.formData,'applyDays','')
						uni.showToast({title:res.data.msg, icon:"none"});
					}
				})
			},
			returnIndex(n,v){
				var index=''
				for (let i in n) {
					if(n[i].dictValue==v){
						index=i
					}
				}
				return index
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
			//部门回传
			getDeptV(res) {
				console.log(res)
				this.formData.deptId = res.deptId
				this.formData.companyId = res.companyId
			}
		}
	}
</script>

<style>
	@import url("../../../static/css/oa.css");
</style>

