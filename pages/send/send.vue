<template>
	<view>
		<view class="col1">请选择公司</view>
		<view class="col2">
			<input class="hidden" v-model="companyId">
			<input class="hidden"  v-model="deptId">
			<picker  class="picker" mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
				<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
			</picker>
		</view>
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in userList" :key="item.userId">
					<view>
						<checkbox :value="item.userId+''" :checked="item.checked" />
					</view>
					<view>{{item.userName}}</view>
				</label>
			</checkbox-group>
		</view>
		<view class="btnBox">
			<button class="mini-btn" type="primary" size="mini" :loading="loading1" @click="submit()">抄送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		    return {
				id:'',
				baseUrl:'',
				userList:[],
				companyId:'',
				deptId:'',
				company:[],
				multiArray: [
					['百川'],
					[],
					[]
				],
				multiArrayId: [
					['100'],
					[],
					[]
				],
				multiIndex: [0, 0, 0],
				loading1:false
			}
	    },
		onLoad(e) {
			this.id=e.id || ''
			this.baseUrl=e.url || ''
		},
		onReady() {
			let this_=this
			// 公司集合
			this.urlRequestGet('system/dept/list?parentId=100','text/html;charset=UTF-8',function(res){
				if(res.statusCode='200'){
					console.log(res.data)
					this_.company=res.data;
					let companyList=[]
					let companyIdList=[]
					for (let i in this_.company) {
						companyList.push(this_.company[i].deptName)
						companyIdList.push(this_.company[i].deptId)
					}
					this_.multiArray[1]=companyList
					this_.multiArrayId[1]=companyIdList
					//默认展示的是当前用户的公司
					this_.showDeptDetail(0)
				}
			})
			
		},
		methods:{
			checkboxChange: function (e) {
				var items = this.userList,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values[0] == item.userId){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			bindMultiPickerColumnChange: function(e) {
				var this_=this
				this.multiIndex[e.detail.column] = e.detail.value
				if(e.detail.column==1){
					this.showDeptDetail(e.detail.value)
					//this.multiIndex.splice(2, 1, 0)
				}
				if(e.detail.column==2){
					this.deptId=this_.multiArrayId[2][e.detail.value]
					this_.showUserList(this.deptId)
				}
				this.$forceUpdate();
				
			},
			showDeptDetail(index){
				let this_=this
				this.urlRequestGet('system/dept/list?parentId='+this.company[index].deptId,'text/html;charset=UTF-8',function(res){
					if(res.statusCode='200'){
						let list=[]
						let listId=[]
						console.log(res.data)
						for (let i in res.data) {
							list.push(res.data[i].deptName)
							listId.push(res.data[i].deptId)
						}
						this_.multiArray[2]=list
						this_.multiArrayId[2]=listId
						this_.multiArray.splice(0,0)
						this_.multiArrayId.splice(0,0)
						//默认展示
						this_.companyId=this_.multiArrayId[1][this_.multiIndex[1]]
						this_.deptId=this_.multiArrayId[2][0]
						this_.multiIndex[1]=index
						//this_.multiIndex.splice(2, 1, 0)
						console.log(this_.deptId)
						this_.showUserList(this_.deptId)
						
					}
				})
			},
			showUserList(deptId){
				let this_=this
				this.urlRequestPost('system/user/phoneList',{'deptId':deptId},null,function(res){
					console.log(res)
					this_.userList=res.data
					for (let i in this_.userList) {
						this_.userList[i].checked = false;
					}
				})
			},
			 submit(){
				 let this_=this
				 let selectUser=[]
				 for (let i in this.userList) {
				 	if(this.userList[i].checked==true){
						selectUser.push(this.userList[i])
					}
				 }
				 console.log(this.baseUrl)
				 console.log(this.id)
				 this.urlRequestPost(this.baseUrl+'/copy',{'id':this.id,'copyUserList':selectUser},'application/json;charset=UTF-8',function(res){
					 uni.showToast({title:res.data.msg, icon:"none"});
					 if(res.data.code=='0'){
						 uni.reLaunch({
						     url: "../start/start",
						 });
					 }
				 })
			}
		}
	}
	
</script>

<style>
	.col1{
		padding: 25upx 35upx 0 35upx;
		font-size: 32upx;
		
	}
	.col2{
		padding: 15upx 35upx;
		background-color: #F8F8F8;
		color: #6D6D72;
		border-bottom: 1upx solid #EEEEEE;
	}
	.picker{
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	.hidden{
		display: none;
	}
	.uni-list-cell {
		justify-content: flex-start
	}
	.btnBox{
		text-align: center;
		padding-top: 38upx;
	}
</style>
