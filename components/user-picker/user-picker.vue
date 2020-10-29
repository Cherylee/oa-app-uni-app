<template>
	<view class="user-picker">

		<view class="col2">
			<input class="hidden" v-model="companyId">
			<input class="hidden"  v-model="deptId">
			<picker  class="picker" mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray" :disabled="disabled">
				<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
			</picker>
		</view>
		<scroll-view class="uni-list" :style="{height:swiperHeight+'upx'}"  enableBackToTop="true" scroll-y="true">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in userList" :key="item.userId">
					<view>
						<checkbox :value="item.userId+''" :checked="item.checked" :disabled="disabled"/>
					</view>
					<view>{{item.userName}}</view>
				</label>
			</checkbox-group>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:["setUserList","setDisabled"],	
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
	    		loading1:false,
				swiperHeight:'100',
				selectUser:[],
				userList2:[],
				disabled:false
	    	}
	    },
		watch:{
			setDisabled(val){
				const this_ = this
				this_.disabled=val
			}
		},
		onLoad(e) {
			this.id=e.id || ''
			this.baseUrl=e.url || ''
		},
		created:function(){
			let this_=this
			// 公司集合
			this.urlRequestGet('system/dept/list?parentId=100','text/html;charset=UTF-8',function(res){
				if(res.statusCode='200'){
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
	    methods: {
			//多选框事件监听
			checkboxChange(evt){
				var userData = {}
				var userIdList = []
				var userNameList= []
				for(var i in evt.target.value){
					for (let j in this.userList){
						this.userList[j].userId
						if(evt.target.value[i]==this.userList[j].userId){
							userNameList.push(this.userList[j].userName)
						}
					}
					userIdList.push(evt.target.value[i])
				}
				userData.userIdList =userIdList
				userData.userNameList = userNameList
				userData.deptId = this.deptId;
				userData.companyName = this.multiArray[1][this.multiIndex[1]]
				userData.deptName = this.multiArray[2][this.multiIndex[2]]
				userData.height = this.swiperHeight
				this.$emit('getUserList',userData)
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
						this_.showUserList(this_.deptId)
						
					}
				})
			},
			showUserList(deptId){
				let this_=this
				this.urlRequestPost('system/user/phoneList',{'deptId':deptId},null,function(res){
					this_.userList=res.data
					if(this_.userList.length>5){
						this_.swiperHeight=480
					}else if(this_.userList.length>0&&this_.userList.length<5){
						this_.swiperHeight=this_.userList.length*96
					}
					this_.$emit('getHeight',this_.swiperHeight)
					const userIdList = this_.userList2
					if(userIdList.length==0){
						for (let i in this_.userList) {
							this_.userList[i].checked = false;
						}
					}else{
						for (let j in userIdList){
							for(let k in userIdList[j].userIdList){
								for (let i in this_.userList) {
									if(userIdList[j].userIdList[k]==this_.userList[i].userId){
										this_.userList[i].checked = true;
									}
								}
							}
						}
					}
				})
			},
	     
	    }
	}
</script>

<style>
	.user-picker{
		width: 100%;
		margin-bottom: 20upx;
	}
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
	.uni-list{
		overflow: hidden;
	}
	.uni-list-cell-pd{
		height: 50upx;
		padding: 24upx 30upx;
	}
	.uni-list-cell {
		justify-content: flex-start
	}
	.btnBox{
		text-align: center;
		padding-top: 38upx;
	}
</style>
