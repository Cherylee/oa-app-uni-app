<template>
	<view class="tender">
		<!-- <view class="tenderAn-top">
			<view >添加</view>
			<view class="sousu"><i class="iconfont icon-sousu"></i></view>
		</view> -->
		<view class="tender-list">
			<view class="list-content" v-for="(item,index) in tenderList">
				<view class="content" >
					<p class='content-title'>工程名称:<a href="#" v-on:click="goContent(item.tenderId)">{{item.projectName}}</a></p>
					
					<view>
						<p class="content-left">投标状态:<span class="content-strue">{{getDictV(tenderType,item.status)}}</span></p>
						<p class="content-right">委托人:<span>{{item.consignor}}</span></p>
						<p class="content-left">开标时间:<span>{{item.openTenderDate}}</span></p>
						<p class="content-right">建造师:<span>{{item.builderName}}</span></p>
						
					</view>
				</view>
				<view class="content-bottom">
					<view class="bottom-time">{{item.createTime}}</view>
					<view v-if="item.gid==''||item.gid==null" class="content-button" v-on:click="goBond(item.tenderId)">申请保证金</view>
				</view>
			</view>
			<view class="example-body">
				<uni-pagination :current="current" :total="total" title="标题文字" @change="change" />
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tenderList:[],
				tenderType:[]  ,//投标状态字典，
				total: 0,
				current: 1
			}
		},
		onLoad() {
			this.getData(1)
		},
		methods:{
			getData(p){
				let this_=this
				this.urlRequestPost('/business/jyTenderNotice/phoneList',{
					'pageSize': 10,
					'pageNum': p,
					'orderBy': 'create_time desc',
				},null,function(res){
					this_.tenderList=res.data.rows
					this_.total = res.data.total
				})
				this.dictValue('business_bidstatus').then(res => {
					this_.tenderType = res.data
				})
			},
			goContent(id){
				uni.navigateTo({
					url:"./tenderContent/tenderContent?id="+id
				})
			},
			goBond(id){
				uni.navigateTo({
					url:"../bond/bond?edit=0&&id="+id
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
			change(e) {
				this.current = e.current
				this.getData(this.current)
			}
		}
	}
</script>

<style>

	.sousu{
		width: 80upx;
		height: 80upx;
		border-radius: 20upx;
		text-align: center;
		position: relative;
		background-color: #23c6c8;
	}
	.sousu .iconfont{
		font-size: 50upx;
		line-height: 80upx;
		font-weight: bold;
		color: #FFFFFF;
	}
	.list-content{
		height: auto;
		padding-bottom: 70upx;
		border-bottom: 1upx solid #EEEEEE;
		width: 96%;
		margin-left: 2%;
	}
	.content{
		padding: 40upx 0upx 0upx 0upx;
		line-height: 60upx;
	}
	.content-title{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 30upx;
	}
	.content-strue{
		background-color: #AAAAAA;
		color: #FFFFFF;
		border-radius: 40upx;
		padding: 0 20upx;
	}
	span{
		margin-left: 15upx;
	}
	.content-left{
		width: 50%;
		float: left;
	}
	.content-right{
		width: 50%;
		float: right;
	} 
	.content-left span,.content-right span{
		font-size: 30upx;
	}
	.content-title a{
		text-decoration:none;
		margin-left: 15upx;
	}
	.content-bottom{
		width: 100%;
	}
	.bottom-time{
		float: left;
		height: 50upx;
		line-height: 50upx;
		font-size: 26upx;
		color: #808080;
	}
	.content-button{
		width: 86px;
		height:50upx;
		text-align: center;
		color: #FFFFFF;
		background-color: #f7a54a;
		line-height: 50upx;
		border-radius: 10upx;
		box-shadow: 2upx 2upx 3upx #808080;
		float: right;
	}
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
		padding: 30upx 0;
	}
</style>
