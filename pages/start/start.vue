<template>
	<view class="start">
		<view class="start-tabBars">
			<view class="uni-flex uni-row ">
				<view v-for="(tab,index) in tabBars" style="-webkit-flex: 1;flex: 1; text-align: center;" :key="tab.id" class="uni-tab-item"
				 :id="tab.id" :data-current="index" @click="ontabtap(index)">
					<view class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">
						{{tab.name}}
					</view>
				</view>

			</view>
			<view class="line-h"></view>
		</view>
		<view style="height: 80upx;"></view>
		<swiper :current="tabIndex" :duration="300" class="swiperClass" @change="updateCurrent" :style="{height:swiperHeight[tabIndex]+'upx'}">
			<swiper-item v-for="(tab,index) in newsList" :key="tab.id" class="swiper-item">
				<scroll-view class="scroll-v list" lower-threshold="200" enableBackToTop="true" scroll-y="true" @scrolltolower="loadMore"
				 :lower-threshold="50">
					<view class="loading-more" v-if="tab.isLoading || tab.data.length == 0">
						<text class="loading-more-text">{{tab.noneText}}</text>
					</view>
					<view class="uni-list-cell " v-for="(newsitem,index2) in tab.data" :key="newsitem.idx" @close="close(index2)">
						<view class="uni-media-list ">
							<view class="uni-media-list-body ">
								<view class="uni-media-list-text-top" @click="goDetail(newsitem)">{{ getDictV(dictProType,newsitem.type) }}<text
									 class="active-text">({{getDictV(statusV,newsitem.status)}})</text></view>
								<view class="uni-media-list-text-bottom ">
									<text>发起人：{{ newsitem.userName }}</text>
									<text class="mini-text">{{ newsitem.createTime }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="loading-more" v-if="tab.isLoading || tab.data.length > 9">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// 缓存每页最多
	const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;
	export default {
		data() {
			return {
				user: {},
				newsList: [],
				scrollInto: "",
				navigateFlag: false,
				pulling: false,
				refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg==",
				dictProType: [],
				statusV: [],
				tabIndex: 0,
				tabBars: [{
					name: '已申请',
					id: 'c001',
					url: '/oa/MyApplied/phoneList',
					pageNum: 1,
					status: ''
				}, {
					name: '草稿',
					id: 'c002',
					url: '/oa/MyApplied/phoneUserDraftList',
					pageNum: 1,
					status: '99'
				}],
				swiperHeight: [100, 100],
			}
		},
		onLoad() {
			setTimeout(() => {
				this.tabBars.forEach((tabBar) => {

					this.newsList.push({
						data: [],
						isLoading: false,
						refreshText: "",
						loadingText: '加载更多...',
						noneText: '加载中.....',
						total: 0,
						pageSize: 10
					});
				});
				this.getList();
				console.log(this.newsList)
			}, 350)
			/**
			 * 请求登陆以后的数据
			 */
			let this_ = this
			this.urlRequestPost('/phoneIndexData', '', null, function(res) {
				if (res.statusCode == '200') {
					this_.user = res.data.user
				}

			})
			/**
			 * 字典数据-审批类型
			 */
			this.dictValue('oa_examine_type').then(res => {
				this_.dictProType = res
			})
			this.dictValue('oa_leave_status').then(res => {
				this_.statusV = res
			})

		},
		methods: {
			/**
			 * @param {index} 第几个活页
			 * 获取活页里面的list数据
			 */
			getList() {
				this.serverList(this.tabBars[0].url, 0)
			},
			ontabtap(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.tabBars[index].pageNum = 1;
				this.serverList(this.tabBars[index].url, index);
			},
			/**
			 * 请求接口数据
			 */
			serverList(url, index) {
				let activeTab = this.newsList[index];
				const this_ = this
				console.log(activeTab)
				this.urlRequestPost(url, {
					'pageSize': this.newsList[index].pageSize,
					'pageNum': this.tabBars[index].pageNum,
					'orderBy': 'create_time desc',
				}, null, function(res) {
					if (res.data.rows && res.data.rows.length != 0) {
						this_.newsList[this_.tabIndex].noneText = '加载中.....'
						let list = [];

						for (let i = 0; i < res.data.rows.length; i++) {
							let item = res.data.rows[i]
							item.idx = this_.newGuid();
							list.push(item);
						}
						if (this_.tabBars[index].pageNum <= 1) {
							activeTab.data = list;
						} else {
							activeTab.data = activeTab.data.concat(list);
						}
						if (res.data.total > 9) {
							this_.swiperHeight[this_.tabIndex] = 180 * this_.newsList[index].pageSize
						} else if (res.data.total == 10) {
							this_.swiperHeight[this_.tabIndex] = 1600
							this_.newsList[this_.tabIndex].loadingText = '没有数据了'
						} else {
							this_.swiperHeight[this_.tabIndex] = parseInt(res.data.total) * 180
						}
						this_.newsList[index].total = res.data.total

					} else {
						this_.newsList[this_.tabIndex].noneText = '暂无数据!'
					}


				})
			},
			loadMore() {
				setTimeout(() => {
					let uPageNum = Math.ceil(this.newsList[this.tabIndex].total / this.newsList[this.tabIndex].pageSize)
					if (this.tabBars[this.tabIndex].pageNum < uPageNum) {
						this.tabBars[this.tabIndex].pageNum++
						this.serverList(this.tabBars[this.tabIndex].url, this.tabIndex);
					} else {
						this.newsList[this.tabIndex].loadingText = '没有数据了！'
					}

				}, 500)
			},
			/**
			 * @param {Object} e
			 */
			goDetail(e) {
				let this_ = this
				let url = ''
				let id = ''
				if (this.navigateFlag) {
					return;
				}
				this.navigateFlag = true;
				switch (e.type) {
					case '1':
					case '11':
					case '12': //请假申请
						url = '../oa/leave/leave'
						break
					case '0': //出差申请
						url = '../oa/travel/travel'
						break
					case '200': //外出申请
						url = '../oa/outgoing/outgoing'
						break
					case '210': //补卡申请
						url = '../oa/supplyCard/supplyCard'
						break
					case '220': //加班申请
						url = '../oa/overtime/overtime'
						break
					case '3': //报销申请
					case 'GC-9':
						url = '../oa/reimbursement/reimbursement'
						break
					case '2':
					case '21': //采购申请
						url = '../oa/purchase/purchase'
						break
					case '5':
					case '51':
					case '52':
					case '53':
					case '54': //用印申请
						url = '../oa/sealApply/sealApply'
						break
					case '4':
					case '41': //用车申请
						url = '../oa/carApply/carApply'
						break
					case 'GC-1':
					case 'GC-11':
					case 'GC-12': //用车申请
						url = '../oa/sysProPayment/sysProPayment'
						break
					case '140': //投标保证金
						url = '../oa/bond/bond'
						break
					case 'GC-1':
					case 'GC-11':
					case 'GC-12': //项目付款
						url = '../oa/sysProPayment/sysProPayment'
						break
					case '170': //财务付款
						url = '../oa/oaPayment/oaPayment'
						break
					case 'GC-21':
					case '150': //项目借款
						url = '../oa/loan/loan'
						break
					case 'GC-22': //项目保修金
						url = '../oa/sysProRepairMoney/sysProRepairMoney'
						break
					case 'GC-2': //项目收款
						url = '../oa/sysProReceivables/sysProReceivables'
						break
					case '160': //OA收款
						url = '../oa/oaReceivables/oaReceivables'
						break
					case '10': //OA收款
						url = '../oa/tender/tender'
						break
					default:
						url = '../oa/building/building'
						break
				}
				uni.navigateTo({
					url: url + "?edit=1&id=" + e.id,
				});
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200)
			},
			clearTabData(e) {
				this.newsList[index].data.length = 0;
				this.newsList[index].loadingText = "加载更多...";
			},
			refreshData() {},
			onrefresh(e) {
				var tab = this.newsList[index];
				if (!tab.refreshFlag) {
					return;
				}
				tab.refreshing = true;
				tab.refreshText = "正在刷新...";

				setTimeout(() => {
					this.refreshData();
					this.pulling = true;
					tab.refreshing = false;
					tab.refreshFlag = false;
					tab.refreshText = "已刷新";
					setTimeout(() => { // TODO fix ios和Android 动画时间相反问题
						this.pulling = false;
					}, 500);
				}, 2000);
			},
			onpullingdown(e) {
				var tab = this.newsList[index];
				if (tab.refreshing || this.pulling) {
					return;
				}
				if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
					tab.refreshFlag = true;
					tab.refreshText = "释放立即刷新";
				} else {
					tab.refreshFlag = false;
					tab.refreshText = "下拉可以刷新";
				}
			},
			newGuid() {
				let s4 = function() {
					return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
				}
				return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
			},
			getDictV(type, value) {
				let dictV = ''
				for (let i in type.data) {
					if (type.data[i].dictValue == value) {
						dictV = type.data[i].dictLabel
					}
				}
				return dictV
			},
			updateCurrent(e) {
				this.tabIndex = e.detail.current || e.target.current
				setTimeout(() => { // TODO fix ios和Android 动画时间相反问题
					this.serverList(this.tabBars[this.tabIndex].url, this.tabIndex);
				}, 500);

			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
		background: #f8f8f8;
	}

	.start {
		width: 100%;
	}

	/* #endif */
	.scroll-v {
		/* flex: 1;
		width: 100%; */
		/* height: 1800upx; */
		height: 100%;
	}

	.start-tabBars {
		position: fixed;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 10;
	}

	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}

	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
	}

	.loading-more-text {
		font-size: 28upx;
		color: #999;
	}


	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}

	.uni-media-list-text-top {
		height: 74upx;
		font-size: 28upx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.mini-text {
		color: #a7a7a7;
	}

	.active-text {
		color: #0FAEFF;
	}

	.uni-media-list {
		width: 100%;
		padding: 35upx 30upx;
	}

	.uni-list-cell::after {
		width: 100%;
		left: 0;
	}

	.uni-list-cell {
		height: 180upx;
	}

	.line-h {
		height: 1upx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		background-color: #FFFFFF;
		padding-left: 45upx;
		padding-right: 45upx;
		padding-bottom: 15upx;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30upx;
		height: 65upx;
		line-height: 65upx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		border: 1upx solid #cbcbcb;
	}

	.uni-tab-item-title-active {
		color: #007AFF;
		border: 1upx solid #007AFF
	}

	.swiperClass {
		/* margin-top: 80upx; */
	}
</style>
