<template>
	<view class="popup-concent">
		<!-- 印章信息 -->
		<view v-if="type=='oaSeal'">
			<view>印章名称：{{data.sealName}}</view>
			<view>印章类型：{{getDictV(sealType,data.type)}}</view>
		</view>
		<!-- 收款单数据 -->
		<view v-if="type=='oaReceivables'">
			<view>编号：{{data.code}}</view>
			<view>项目：{{data.projectName}}</view>
			<view>收款金额：{{data.money}}元</view>
			<view>申请日期：{{data.applyDate}}</view>
		</view>
		<!-- 借款单数据 -->
		<view v-if="type=='oaBorrowMoney'">
			<view>编号：{{data.code}}</view>
			<view>收款金额：{{data.borrowAmount}}元</view>
			<view>申请日期：{{data.applyTime}}</view>
		</view>
		<!-- 投标公告信息 -->
		<view v-if="type=='TB-0'">
			<view>工程名称：{{data.projectName}}</view>
			<view>委托人：{{data.consignor}}</view>
			<view>申请日期：{{data.openTenderDate}}</view>
		</view>
		<!-- 工程 -->
		<view v-if="type=='project'">
			<view>工程名称：{{data.projectName}}</view>
			<view>申请日期：{{data.createTime}}</view>
		</view>
		<!-- 合同 -->
		<view v-if="type=='contract'">
			<view>合同名称：{{data.contractName}}</view>
			<view>合同类型：{{getDictV(contractType1,data.type1)}}</view>
			<view>申请日期：{{data.createTime}}</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	export default{
		props:[
			"setData",
			"setType"],
		data(){
			return{
				data:{},
				type:'',
				//印章类型
				sealType:[],
				contractType1:[]
			}
		},
		created() {
			var this_=this
			this_.data=this_.setData
			this_.type=this_.setType
			//印章类型
			this.dictValue('oa_seal_type').then(res => {
				// console.log(res)
				this_.sealType=res.data
			})
			//印章类型
			this.dictValue('oa_contract_type1').then(res => {
				// console.log(res)
				this_.contractType1=res.data
			})
		},
		methods:{
			/**
			 * 字典回显
			 */
			
		}
	}
</script>

<style>
</style>
