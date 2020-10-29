<template>
	<view class="tender">
		<view>
			<button class="btn mini-btn " style="width: 50%;margin-top: 25upx;font-size: 14upx;background-color: #00aaff;color: #FFFFFF;" v-on:click="goTenderAdd()">添加招标信息</button>
		</view>
		<view class="tender-list" v-if="tenderList">
			<view class="list-content" v-for="(item,index) in tenderList" :key="index">
				<view class="content">
					<text class='content-title'>标题:<a href="#" >{{item.title}}</a></text>
					<text class='content-title'>项目名称:<a href="#" >{{item.projName}}</a></text>
					<view class="content-sub">
						<text>招标类型:{{item.tenderProjType}}</text>
						<text>发布时间:{{item.sendTime}}</text>
					</view>
					<text>公式类型:{{item.publicTypeName}}</text>
					<text>投标类型:<span :class="item.tenderType?'content-strue':''">{{getDictV(tenderType,item.tenderType)}}</span></text>
				</view>
				<view class="content-bottom">
					<view class="bottom-time">{{item.createTime}}</view>
					<view v-if="item.gid==''||item.gid==null" class="content-button" v-on:click="goTender(item.id)">投标申请</view>
				</view>
			</view>

			<view class="example-body">
				<uni-pagination :current="current" :total="total" title="标题文字" @change="change" />
			</view>
		</view>

		<view class="noneDetailText" v-else>
			<image src="../../../static/img/loading.gif" class="loading-icon"></image>
			<text>加载中...</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tenderList: [],
				tenderType: [], //投标状态字典
				total: 0,
				current: 1
			}
		},
		onLoad() {
			let this_ = this
			this.getData(1)
			this.dictValue('jy_tender_type').then(res => {
				this_.tenderType = res.data
			})
		},
		methods: {
			getData(p) {
				let this_ = this
				this.urlRequestPost('/business/jyConstructInfo/phoneList', {
					'pageSize': 10,
					'pageNum': p,
					'orderBy': 'create_time desc'
				}, 'application/json;charset=UTF-8', function(res) {
					this_.tenderList = res.data.rows
					this_.total = res.data.total
				})
			},
			goContent(id) {
				uni.navigateTo({
					url: "./tenderContent/tenderContent?id=" + id
				})
			},
			goTender(id) {
				uni.navigateTo({
					url: "../tender/tender?edit=0&&id=" + id
				})
			},
			goTenderAdd(){
				uni.navigateTo({
					url: "../constructInfoAdd/constructInfoAdd"
				})
			},
			goWebview(url) {
				uni.navigateTo({
					url: "../tenderAnment/tenderContent/tenderWebview?url=" + url
				})
			},
			change(e) {
				console.log(e)
				this.current = e.current
				this.getData(this.current)
			}

		}
	}
</script>

<style>
	.sousu {
		width: 80upx;
		height: 80upx;
		border-radius: 20upx;
		text-align: center;
		position: relative;
		background-color: #23c6c8;
	}

	.sousu .iconfont {
		font-size: 50upx;
		line-height: 80upx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.list-content {
		height: auto;
		padding-bottom: 70upx;
		border-bottom: 1upx solid #EEEEEE;
		width: 96%;
		margin-left: 2%;
	}

	.content {
		padding: 40upx 0upx 0upx 0upx;
		line-height: 60upx;
	}

	.content-title {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 30upx;
	}

	.content-strue {
		background-color: #AAAAAA;
		color: #FFFFFF;
		border-radius: 40upx;
		padding: 0 20upx;
	}

	span {
		margin-left: 15upx;
	}

	.content-sub {
		display: flex;
		justify-content: space-between;
	}

	.content-left span,
	.content-right span {
		font-size: 30upx;
	}

	.content-title a {
		text-decoration: none;
		margin-left: 15upx;
	}

	.content-bottom {
		width: 100%;
	}

	.bottom-time {
		float: left;
		height: 50upx;
		line-height: 50upx;
		font-size: 26upx;
		color: #808080;
	}

	.content-button {
		width: 86px;
		height: 50upx;
		text-align: center;
		color: #FFFFFF;
		background-color: #f7a54a;
		line-height: 50upx;
		border-radius: 10upx;
		box-shadow: 2upx 2upx 3upx #808080;
		float: right;
	}

	.noneDetailText {
		text-align: center;
	}

	/* 加载 */
	.loading-icon {
		width: 80upx;
		height: 80upx;
		display: block;
		margin: 150upx auto;
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
