<template>
	<view class="d-picker">
		<picker class="picker" mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
			<view>{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
		</picker>
	</view>
</template>

<script>
	export default {
		props: {
			companyId: {
				type: [Number, String],
				default: 1949
			},
			deptId: {
				type: [Number, String],
				default: 1949
			}
		},
		data() {
			return {
				returnData:{},
				company:[],
				multiArray: [
					['董事会'],
					[],
					[]
				],
				multiArrayId: [
					['166'],
					[],
					[]
				],
				multiIndex: [0, 0, 0],
			}
		},
		created() {
			let this_=this
			// 公司集合
			this.urlRequestGet('system/dept/list?parentId=166','text/html;charset=UTF-8',function(res){
				if(res.statusCode='200'){
					this_.company=res.data;
					let companyList=[]
					let companyIdList=[]
					let initId=0
					let initId1=0
					for (let i in this_.company) {
						if(this_.company[i].deptId==this_.companyId){
							initId=i
						}
						companyList.push(this_.company[i].deptName)
						companyIdList.push(this_.company[i].deptId)
					}
					this_.multiArray[1]=companyList
					this_.multiArrayId[1]=companyIdList
					//默认展示的是当前用户的公司
					this_.showDeptDetail(initId,initId1,this_.deptId)
					this_.returnData.companyId=this_.companyId
					this_.$emit("getDeptV",this_.returnData)
				}
			})
		},
		methods:{
			bindMultiPickerColumnChange: function(e) {
				this.multiIndex[e.detail.column] = e.detail.value
				if(e.detail.column==1){
					this.showDeptDetail(e.detail.value,0)
					this.returnData.companyId=this.multiArrayId[1][e.detail.value]
					this.$emit("getDeptV",this.returnData)
				}
				if(e.detail.column==2){
					this.returnData.deptId=this.multiArrayId[2][e.detail.value]
					this.$emit("getDeptV",this.returnData)
				}
				this.$forceUpdate()
			},
			showDeptDetail(index,index1,deptId){
				var this_=this
				this.urlRequestGet('system/dept/list?parentId='+this.company[index].deptId,'text/html;charset=UTF-8',function(res){
					if(res.statusCode==200){
						let list=[]
						let listId=[]
						let initId=index1
						for (let i in res.data) {
							if(res.data[i].deptId==deptId){
								initId=i
							}
							list.push(res.data[i].deptName)
							listId.push(res.data[i].deptId)
						}
						this_.multiArray[2]=list
						this_.multiArrayId[2]=listId
						this_.multiArray.splice(0,0)
						this_.multiArrayId.splice(0,0)
						this_.returnData.deptId=this_.multiArrayId[2][initId]
						this_.$emit("getDeptV",this_.returnData)
						//默认展示
						this_.multiIndex[1]=index
						this_.multiIndex[2]=initId
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/css/oa.css");
</style>
