<template>
	<view class="nui-details">
		<view class="detail-box">
			<text class="detail-text"><span>申请人：</span>{{data.userName}}</text>
			<text><span>所属部门：</span>经营部</text>
			<text class="detail-text"><span>申请日期：</span>{{data.createTime}}</text>
			<text class="detail-text"><span>工程名称：</span>{{data.projectName}}</text>
			<text class="detail-text"><span>投标方式：</span>{{getDictV(bidtypeList,data.tenderType)}}</text>
			<text class="detail-text"><span>工程类型：</span>{{getDictV(engtypeList,data.proType)}}</text>
			<text class="detail-text"><span>开标时间：</span>{{data.openTenderDate}}</text>
			<text class="detail-text"><span>建设单位：</span>{{data.constructUnit}}</text>
			<text class="detail-text"><span>保证金：</span>{{data.deposit}}</text>
			<text class="detail-text"><span>工期：</span>{{data.timeLimit}}</text>
			<text class="detail-text"><span>招标公告网址：</span><a href="#">{{data.tenderDoc}}</a></text>
			<text class="detail-text"><span>负责人要求：</span>{{data.builderName}}</text>
			<text class="detail-text"><span>备注：</span>{{data.remark}}</text>
		</view>
		<view class="examine">
			<view class="examine-title">副经理审核</view>
			<view v-for="(item,index) in deputyManager" class="examine-content"> 
				<text class="examine-text"><span>副经理审核：</span>{{item.userName}}</text>
				<text class="examine-text"><span>审核意见：</span>{{item.message}}</text>
				<text class="examine-text"><span>审核时间：</span>{{item.startTime}}</text>
				<view v-if="index!=deputyManager.length-1" class="content-hr"></view>
			</view>
			<view class="examine-hr"></view>
			<view class="examine-title">经理审核</view>
			<view v-for="(item,index) in manager">
				<text class="examine-text"><span>副经理审核：</span>{{item.userName}}</text>
				<text class="examine-text"><span>审核意见：</span>{{item.message}}</text>
				<text class="examine-text"><span>审核时间：</span>{{item.startTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import {mapState} from 'vuex'
	export default{
		components: {
			uniSteps
		},
		data(){
			return{
				data:'',
				bidtypeList:[],//投标方式字典列表
				engtypeList:[],//工程类型字典
				baseUrl:'',
				manager:[],//经理审批
				deputyManager:[]//副经理审批
			}
		},
		
		onLoad(opt){
			const this_ =this
			this.urlRequestGet('/business/jyTender/toPhoneJyTenderExamine/'+opt.id,null,function(res){
				this_.data=res.data.jyTender
				this_.manager=res.data.hisNodeList.key1
				this_.deputyManager=res.data.hisNodeList.key0
				uni.setNavigationBarTitle({
					title:this_.data.projectName
				})
			})
			//投标方式字典
			this.dictValue('business_engineer_type').then(res => {
				this_.engtypeList = res.data
			})
			//工程类型字典
			this.dictValue('business_project_type').then(res => {
				this_.bidtypeList = res.data
			})
		},
		methods:{
			goWebview(url){
				uni.navigateTo({
					url:"./tenderWebview?url="+url
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
		}
	}
</script>

<style>
	.nui-details{
		width: 94%;
		margin-left: 3%;
	}
	.detail-box {
		padding-top: 50upx;
		color: #333333;
	}
	
	.borrowtitle {
		font-size: 28upx;
		background: #F8F8F8;
		text-align: center;
		border-bottom: 1upx solid #CCCCCC;
		padding: 20upx;
	}
	
	.borrow {
		margin-bottom: 20upx;
	}
	
	.borrowbtn {
		margin: 0 auto;
	}
	
	.borrowBox {
		margin: 0 auto;
	}
	
	.borrowitem {
		border-bottom: 1upx solid #e2e2e2;
		padding: 20upx 20upx;
		background: #F8F8F8;
	}
	
	.detail-text {
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.detail-text1{
		font-size: 32upx;
		font-weight: bold;
	}
	.text-box {
		padding: 0 10upx 50upx 10upx;
		word-wrap: break-word;
		word-break: normal;
	}
	.file-text{
		width: 280upx;display: block;overflow: hidden;text-overflow:ellipsis;
		white-space: nowrap;
	}
	a{
		text-decoration:none;
	}
	.processList-box{
		margin-top: 25upx;
		padding: 10px 0;
		background-color: #F8F8F8;
	}
	span{
		padding-right: 5upx;
	}
	.examine{
		color: #222222;
		background-color: #F0F0F0;
		border-radius: 12upx;
		padding: 15upx 20upx;
		margin-top: 30upx;
		margin-bottom: 30upx;
	}
	.examine-title{
		font-weight: bold;
		font-size: 30upx;
	}
	.examine-hr{
		width: 100%;
		height: 6upx;
		border-radius: 6upx;
		background-color: #FFFFFF;
		margin-bottom: 8upx;
	}
	.examine-content{
		margin-bottom: 10upx;
	}
	.examine-text{
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.content-hr{
		width: 80%;
		height: 1upx;
		background-color: #999999;
	}
</style>
