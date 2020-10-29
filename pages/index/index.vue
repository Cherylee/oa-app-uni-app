<template>
	<view>
		<uni-card title="通知发文" isShadow>
			<view v-if="infoList.length==0" class="none-text">暂无数据</view>
			<view v-else class="list-card" v-for="(item,index) in infoList" :key="index">
				<view>内容：{{item.title}}</view>
				<view class="list-card-foot"><text class="active-color">{{item.attachmentUrl}}</text><text>{{item.createTime}}</text></view>
			</view>
		</uni-card>
		<uni-card title="投标公告栏" isShadow>
			<view v-if="tenderList.length==0" class="none-text">暂无数据</view>
			<view v-else class="list-card" v-for="(item,index) in tenderList" :key="index">
				<view>工程：{{item.projectName}}</view>
				<view class="list-card-foot"><text>委托人:{{item.consignor}}</text><text>建造师：{{item.builderName}}</text></view>
				<view class="list-card-foot"><text>状态:{{getDictV(tenderStatus,item.status)}}</text><text>{{item.createTime}}</text></view>
			</view>
		</uni-card>
		<uni-card title="中标公告栏" isShadow>
			<view v-if="winTenderList.length==0" class="none-text">暂无数据</view>
			<view v-else class="list-card" v-for="(item,index) in winTenderList" :key="index">
				<view>工程：{{item.projectName}}</view>
				<view class="list-card-foot"><text>中标造价:{{item.winBidAmount}}</text><text>{{item.createTime}}</text></view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	import service from '@/service.js';
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				infoList: [],
				tenderList: [],
				winTenderList: [],
				hasSetText: false,
				tenderStatus:[]
			}
		},
		computed: mapState(['name', 'deptName', 'companyName', 'hasLogin']),
		onLoad() {
			this.getInfoList()
			this.getTenderList()
			this.getTenderWinList()
			this.hasSetText = !this.hasSetText;
			uni.setNavigationBarTitle({
				title: this.hasSetText ? this.companyName : "公司名称"
			})
			// 字典
			this.dictValue('business_bidstatus').then(res => {
				this.tenderStatus = res.data
			})
			
		},
		methods: {
			getInfoList() {
				var this_ = this
				this.urlRequestPost('/oa/oaInformation/phoneList', {}, null, function(res) {
					this_.infoList = res.data.rows
				})
				
			},
			getTenderList() {
				var this_ = this
				this.urlRequestPost('/business/jyTenderNotice/phoneList', {}, null, function(res) {
					this_.tenderList = res.data.rows
				})
			},
			getTenderWinList() {
				var this_ = this
				this.urlRequestPost('/business/jyWinTenderNotice/phoneList', {}, 'text/html;charset=UTF-8', function(res) {
					this_.winTenderList = res.data.rows
				})
			}
		}
	}
</script>

<style>
	.list-card {
		border-bottom: 1upx solid #dfdfdf;
		padding: 20upx 0 20upx 0;
	}
	.list-card:first-child{
		padding-top: 0;
	}
	.list-card:last-child{
		border-bottom: 1upx solid #FFFFFF;
	}

	.list-card .list-card-foot {
		display: flex;
		justify-content: space-between;
		color: #808080;
		font-size: 26upx;
	}

	.list-card .list-card-foot text.active-color {
		color: #007AFF;
	}

	.none-text {
		text-align: center;
	}
</style>
