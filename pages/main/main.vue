<template>
	<view class="main">

		<view class="main-tabBars">
			<view class="uni-flex uni-row ">
				<view v-for="(tab,index) in tabBars" style="-webkit-flex: 1;flex: 1; text-align: center;" :key="tab.id" class="uni-tab-item"
				 :id="tab.id" :data-current="index" @click="ontabtap">
					<view class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">
						{{tab.name}}
						<view class="qipao" v-if="tab.num>0">{{tab.num}}</view>
					</view>
				</view>
			</view>
			<view class="line-h"></view>
		</view>

		<!-- <view class="header">
			<view class="input-view">
				<uni-icons type="search" size="22" color="#666666" />
				<input confirm-type="search" class="input" type="text" placeholder="输入搜索关键词" @confirm="confirm">
			</view>
		</view> -->
		<view style="height: 80upx;"></view>
		<swiper :current="tabIndex" class="swiper-box" :style="{height:swiperHeight[tabIndex]+'upx'}" :duration="300" @change="ontabchange">
			<swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
				<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y="true" @scrolltolower="loadMore(index1)"
				 :lower-threshold="250">
					<view class="loading-more" v-if="tab.isLoading || tab.data.length == 0">
						<text class="loading-more-text">{{tab.noneText}}</text>
					</view>
					<view class="uni-list-cell " v-for="(newsitem,index2) in tab.data" :key="newsitem.idx" @close="close(index1,index2)">
						<view class="uni-media-list ">
							<view class="uni-media-list-body ">
								<view class="uni-media-list-text-top" v-if="index1==0||index1==3" @click="goDetail(newsitem)">{{ newsitem.title }}</view>
								<view class="uni-media-list-text-top" v-else @click="goDetail(newsitem)">{{getDictV(dictProType,newsitem.type)}}<text
									 :style="newsitem.hisFlag=='0'?{'color':'red'}:{'color':'black'}">{{newsitem.hisFlag=='0'?'(未审批)':'(已审批)'}}</text></view>
								<view class="uni-media-list-text-bottom ">
									<text>发起人：{{ newsitem.userName }}</text>
									<text>{{ newsitem.createTime }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="loading-more" v-if="tab.isLoading || tab.data.length >9 ">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 右侧抽屉 -->
		<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
			<uni-list>
				<uni-list-item :show-arrow="false" :title="name" :note="deptName" />
				<uni-list-item title="个人中心" @click="goDetailPage('../user/user')" />
				<uni-list-item title="退出登陆" @click="logOut()" />
				<!-- <uni-list-item class="last-list-item" :show-badge="true" title="Item3" badge-text="12" /> -->
			</uni-list>
			<view class="close">
				<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70" @click="hide"><text
					 class="word-btn-white">关闭</text></view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	// 缓存每页最多
	const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;

	export default {
		components: {
			uniIcons,
			uniDrawer,
			uniList,
			uniListItem
		},
		data() {
			return {
				user: {},
				newsList: [],
				cacheTab: [],
				tabIndex: 0,
				tabBars: [{
					name: '催办',
					id: 'c001',
					url: '/system/sysUrge/phoneList',
					detailUrl: './detail/sysUrge',
					pageNum: 1,
					num: 0
				}, {
					name: '我审批过',
					id: 'c002',
					url: '/oa/task/phoneList',
					detailUrl: './detail/task',
					pageNum: 1,
					num: 0
				}, {
					name: '待办任务',
					id: 'c003',
					url: '/oa/task/phoneLastTaskList',
					detailUrl: './detail/lastTask',
					pageNum: 1,
					num: 0
				}, {
					name: '抄送我',
					id: 'c004',
					url: '/system/sysCopy/phoneList',
					detailUrl: './detail/sysCopy',
					pageNum: 1,
					num: 0
				}],
				scrollInto: "",
				showTips: false,
				navigateFlag: false,
				pulling: false,
				refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg==",
				showRight: false,
				showLeft: false,
				dictProType: [],
				// 气泡
				copyNum: 0,
				lastTaskNum: 0,
				urgeNum: 0,
				taskNum: 0,
				swiperHeight: [100, 100, 100, 100]
			}
		},
		computed: mapState(['name', 'deptName', 'company', 'hasLogin']),
		onReady() {
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
				this.getList(0);
			}, 350)
			let this_ = this
			/**
			 * 字典数据-审批类型
			 */
			this.dictValue('oa_examine_type').then(res => {
				this_.dictProType = res
			})
			// 气泡
			this.urlRequestPost('oa/task/getUndelDataNum', '', null, function(res) {
				if (res.data.code == '0') {
					for (let i in this_.tabBars) {
						switch (this_.tabBars[i].id) {
							case 'c001':
								this_.tabBars[i].num = res.data.data.urgeNum
								break
							case 'c002':
								this_.tabBars[i].num = res.data.data.taskNum
								break
							case 'c003':
								this_.tabBars[i].num = res.data.data.lastTaskNum
								break
							case 'c004':
								this_.tabBars[i].num = res.data.data.copyNum
								break
						}

					}
				}
			})

		},
		methods: {
			...mapMutations(['logout']),
			/**
			 * @param {index} 第几个活页
			 * 获取活页里面的list数据
			 */
			getList(index) {
				// console.log(index)
				this.serverList(this.tabBars[index].url, index)
			},
			/**
			 * 请求接口数据
			 */
			serverList(url, index) {
				let activeTab = this.newsList[index];
				const this_ = this
				this.urlRequestPost(url, {
					'pageSize': this.newsList[index].pageSize,
					'pageNum': this.tabBars[index].pageNum,
					'orderBy': 'create_time desc'
				}, null, function(res) {
					if (res.data.rows && res.data.rows.length != 0) {
						// console.log(this_.newsList[this_.tabIndex])
						this_.newsList[this_.tabIndex].noneText = '加载中.....'
						let list = [];
						for (let i = 0; i < res.data.rows.length; i++) {
							let item = res.data.rows[i]
							// if(index=='1'||index=='2'){
							// 	item.typeV=this_.getDictV(this_.dictProType,res.data.rows[i].type)
							// }
							item.idx = this_.newGuid();
							list.push(item);
						}
						if (this_.tabBars[index].pageNum <= 1) {
							activeTab.data = list;
						} else {
							activeTab.data = activeTab.data.concat(list);
						}
						if (res.data.total < 10) {
							this_.swiperHeight[this_.tabIndex] = parseInt(res.data.total) * 150
						} else if (res.data.total == 10) {
							this_.swiperHeight[this_.tabIndex] = 1600
							this_.newsList[this_.tabIndex].loadingText = '没有数据了'
						} else {
							this_.swiperHeight[this_.tabIndex] = 150 * this_.newsList[index].pageSize
						}
						// console.log(this_.newsList[this_.tabIndex])
						this_.newsList[index].total = res.data.total

					} else {
						this_.newsList[this_.tabIndex].noneText = '暂无数据'
					}


				})
			},
			/**
			 * @param {Object} e
			 */
			goDetail(e) {
				// console.log(e)
				let this_ = this
				if (this.navigateFlag) {
					return;
				}
				// console.log(e)
				this.navigateFlag = true;

				if (this_.tabIndex == '0') {

					uni.navigateTo({
						url: '../main/details/details?id=' + e.id + '&&index=' + this_.tabIndex,
					});

				} else if (this_.tabIndex == '1' || this_.tabIndex == '2') {

					uni.navigateTo({
						url: '../main/details/details?type=' + e.type + '&&id=' + e.id + '&&taskId=' + e.taskId + '&&index=' + this_.tabIndex,
					});
				} else {
					uni.navigateTo({
						url: '../main/details/details?id=' + e.id + '&&index=' + this_.tabIndex,
					});
				}

				setTimeout(() => {
					this.navigateFlag = false;
				}, 200)
			},
			close(index1, index2) {
				uni.showModal({
					content: '是否删除本条信息？',
					success: (res) => {
						if (res.confirm) {
							this.newsList[index1].data.splice(index2, 1);
						}
					}
				})
			},
			loadMore(e) {
				setTimeout(() => {
					let uPageNum = Math.ceil(this.newsList[this.tabIndex].total / this.newsList[this.tabIndex].pageSize)
					if (this.tabBars[this.tabIndex].pageNum < uPageNum) {
						// console.log(uPageNum)
						this.tabBars[this.tabIndex].pageNum++
						this.getList(this.tabIndex);
					} else {
						this.newsList[this.tabIndex].loadingText = '没有数据了！'
					}

				}, 500)
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			},
			switchTab(index) {
				// console.log('...')
				// console.log(index)
				if (this.newsList[index].data.length === 0) {
					this.getList(index);
				}

				if (this.tabIndex === index) {
					return;
				}

				//缓存 tabId
				if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
					let isExist = this.cacheTab.indexOf(this.tabIndex);
					if (isExist < 0) {
						this.cacheTab.push(this.tabIndex);
						// console.log("cache index:: " + this.tabIndex);
					}
				}

				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;

				//释放 tabId
				if (this.cacheTab.length > MAX_CACHE_PAGE) {
					let cacheIndex = this.cacheTab[0];
					this.clearTabData(cacheIndex);
					this.cacheTab.splice(0, 1);
				}
			},
			clearTabData(e) {
				this.newsList[e].data.length = 0;
				this.newsList[e].loadingText = "加载更多...";
			},
			refreshData() {},
			onrefresh(e) {
				var tab = this.newsList[this.tabIndex];
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
				var tab = this.newsList[this.tabIndex];
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
			/**
			 * 修改导航栏buttons
			 * index[number] 修改的buttons 下标索引，最右边索引为0
			 * show[boolean] 显示还是隐藏角标或者红点
			 * text[string] 需要修改的角标的text 内容 ，如果定义redDot 此参数无效 ，如果定义badgeText请设置具体，如果不用输入
			 */
			setStyle(index, show, text) {
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				if (show) {
					if (index === 0) {
						currentWebview.showTitleNViewButtonRedDot({
							index: index,
							text: text
						})
					} else {
						currentWebview.setTitleNViewButtonBadge({
							index: index,
							text: text
						})
					}
				} else {
					if (index === 0) {

						currentWebview.hideTitleNViewButtonRedDot({
							index: index
						})
					} else {
						currentWebview.removeTitleNViewButtonBadge({
							index: index
						})
					}
				}

				// #endif
			},
			show(e) {
				// console.log("show", e);
				if (e === 'left') {
					this.showLeft = true
				} else {
					this.showRight = true
				}
			},
			hide() {
				console.log("hide");
				this.showLeft = false
				this.showRight = false
			},
			closeDrawer(e) {
				if (e === 'left') {
					this.showLeft = false
				} else {
					this.showRight = false
				}
			},
			confirm() {},
			logOut() {
				let this_ = this
				this.logout()
				uni.showLoading({
					title: '加载中'
				});
				this.urlRequestPost('/logout', '', null, function(res) {
					uni.hideLoading();
					uni.reLaunch({
						url: '../login/login'
					});
				})
			},
			goDetailPage(e) {
				if (this.navigateFlag) {
					return;
				}
				this.navigateFlag = true;
				if (typeof e === 'string') {
					uni.navigateTo({
						url: e
					})
				} else {
					uni.navigateTo({
						url: e.url
					})
				}
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200)
			},
			getDictV(type, value) {
				let dictV = ''
				for (let i in type.data) {
					if (type.data[i].dictValue == value) {
						dictV = type.data[i].dictLabel
					}
				}
				return dictV
			}
		},
		onNavigationBarButtonTap(e) {
			// uni.showToast({
			// 	title: e.index === 0 ? '你点了个人中心按钮' : '你点了消息按钮', 
			// 	icon: 'none'
			// });
			// console.log(e.index)
			if (e.index === 0) {
				this.showRight = !this.showRight
				this.show('right')
			}
			// 取消红点或者角标 
			this.setStyle(e.index, false);
		},
		onBackPress() {
			if (this.showRight || this.showLeft) {
				this.hide()
				return true
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
	}

	/* #endif */
	.main {
		width: 100%;
		/* background-color: #09BB07; */
	}

	.tabs {
		flex: 1;
		overflow: hidden;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
		height: 100%;
		width: 100%;
		display: flex;
		background-color: #09BB07;
	}

	.scroll-h {
		width: 100%;
		height: 80upx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
    	border-bottom-style: solid;
    	border-bottom-width: 1px; */
	}

	.main-tabBars {
		position: fixed;
		width: 100%;
		z-index: 10;
		background-color: #FFFFFF;
	}

	.line-h {
		height: 1upx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		padding-left: 15upx;
		padding-right: 15upx;
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

	.swiper-box {
		/* padding-top: 80upx; */
		/* height: 1500upx; */
	}

	.swiper-item {
		/* flex: 1; */
		/* height: 1500upx; */
		flex-direction: row;
		/* background-color: #DD524D; */

	}

	.scroll-v {
		/* flex: 1; */
		/* #ifndef MP-ALIPAY */
		/* flex-direction: column; */
		/* #endif */
		height: 100%;
		/* height: 1500upx; */
		/* background-color: #000000; */
	}

	.uni-list-cell {
		height: 150upx;
	}

	.list-view {
		position: relative;
		-webkit-overflow-scrolling: touch;
		width: 100%;
		height: 100%;
		max-height: inherit;
	}

	.update-tips {
		position: absolute;
		left: 0;
		top: 41px;
		right: 0;
		padding-top: 5px;
		padding-bottom: 5px;
		background-color: #FDDD9B;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.update-tips-text {
		font-size: 14px;
		color: #ffffff;
	}

	.refresh {
		width: 750upx;
		height: 64px;
		justify-content: center;
	}

	.refresh-view {
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.refresh-icon {
		width: 30px;
		height: 30px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}

	.refresh-icon-active {
		transform: rotate(180deg);
	}

	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}

	.loading-text {
		margin-left: 2px;
		font-size: 16px;
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

	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 28rpx;
		background-color: transparent;
	}

	.close {
		padding: 30rpx;
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

	/* 气泡 */
	.uni-tab-item-title {
		position: relative;
	}

	.qipao {
		position: absolute;
		top: 0;
		right: 0;
		width: 30upx;
		height: 30upx;
		border-radius: 100%;
		background-color: #FF3333;
		line-height: 30upx;
		text-align: center;
		font-size: 16upx;
		color: #FFFFFF;
	}
</style>
