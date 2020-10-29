<template>
	<view class="d-picker">
		<picker class="picker" mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
			<view>{{edit=='1'?subName:multiArray[1][multiIndex[1]]}}</view>
		</picker>
	</view>
</template>

<script>
	export default {
		props: {
			edit: {
				type: [Number, String],
				default: 0
			},
			subId: {
				type: [Number, String],
				default: 0
			},
			subName: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				returnData:{},
				company:[],
				multiArray: [
					[],
					[]
				],
				multiArrayId: [
					[],
					[]
				],
				multiIndex: [0, 0],
			}
		},
		created() {
			let this_=this
			// 集合
			this.urlRequestGet('system/sysCredentialsType/list?parentId=1','text/html;charset=UTF-8',function(res){
				if(res.statusCode='200'){
					this_.company=res.data;
					let companyList=[]
					let companyList1=[]
					let init=0
					for (let i in this_.company) {
						companyList.push(this_.company[i].typeName)
						companyList1.push(this_.company[i].typeId)
					}
					this_.multiArray[0]=companyList
					this_.multiArrayId[0]=companyList1
					//默认展示的是当前用户的公司
					this_.showDeptDetail(0,0)
					this_.returnData.mainId=this_.mainId
					this_.$emit("getDeptV",this_.returnData)
				}
			})
		},
		methods:{
			bindMultiPickerColumnChange: function(e) {
				this.multiIndex[e.detail.column] = e.detail.value
				if(e.detail.column==0){
					this.showDeptDetail(e.detail.value,0)
					this.returnData.mainId=this.multiArrayId[0][e.detail.value]
					this.$emit("getDeptV",this.returnData)
				}
				if(e.detail.column==1){
					this.returnData.subId=this.multiArrayId[1][e.detail.value]
					this.returnData.subName=this.multiArray[1][e.detail.value]
					this.$emit("getDeptV",this.returnData)
				}
				this.$forceUpdate()
			},
			showDeptDetail(index,index1){
				var this_=this
				this.urlRequestGet('system/sysCredentialsType/list?parentId='+this.company[index].typeId,'text/html;charset=UTF-8',function(res){
					if(res.data){
						let list=[]
						let listId=[]
						let init=0
						for (let i in res.data) {
							if(res.data[i].typeId==this_.subId){
								init=i
								
							}else{
								init=index1
							}
							list.push(res.data[i].typeName)
							listId.push(res.data[i].typeId)
						}
						this_.multiArray[1]=list
						this_.multiArrayId[1]=listId
						this_.multiArray.splice(0,0)
						this_.multiArrayId.splice(0,0)
						this_.returnData.subId=this_.multiArrayId[1][index]
						this_.returnData.subName=this_.multiArray[1][index]
						this_.$emit("getDeptV",this_.returnData)
						//默认展示
						this_.multiIndex[0]=index
						this_.multiIndex[1]=init
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/css/oa.css");
</style>
