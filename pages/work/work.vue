<template>
	<view class="">
		<view v-for="(option,index1) in menus" v-if="option.menusList.length!=0">
			<view class="title"><text>{{option.menuName}}</text></view>
			<uni-grid :column="4" :show-border="false" :square="false">
				<uni-grid-item style="padding-bottom: 0;" v-for="(item,index) in option.menusList" :hor="0" :ver="0" marker="badge"
				 type="error" text="12" :key="index">
					<view :style="{background:item.color}" class="rediu" @click="gotoAdd(index1,index)">
						<!-- <uni-icons :type="item.name" color="#ffffff" size="30" /> -->
						<i :class="item.name" style="color: #FFFFFF;"></i>
					</view>
					<text class="text">{{item.text}}</text>
				</uni-grid-item>
			</uni-grid>
		</view>

		<view v-if="!menus" class="work-no-peim">
			<i class="iconfont icon-tupianjiazaishibai02"></i>
			<view>您还没有任何操作权限哦！</view>
			<view>请联系管理员为您配置相对应的权限~</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	export default {
		components: {
			uniGrid,
			uniIcons,
			uniGridItem
		},
		data() {
			return {
				user: {},
				checked: false,
				menus: []
			}
		},
		onLoad() {
			let this_ = this
			this.urlRequestPost('/phoneIndexData', '', null, function(res) {
				if (res.data.menus) {
					for (let i in res.data.menus) {
						if (res.data.menus[i].menuType == 'M' && res.data.menus[i].remark) {
							this_.menus.push({
								'menuName': res.data.menus[i].menuName,
								'remark': res.data.menus[i].remark,
								'menuId': res.data.menus[i].menuId,
								'menusList': []
							})
						}
					}
					
					for (let i in res.data.menus) {
						for (let a in this_.menus) {
							if (res.data.menus[i].parentId == this_.menus[a].menuId) { //人力资源
								let data = {
									name: 'iconfont ' + res.data.menus[i].perms,
									text: res.data.menus[i].menuName,
									url: '..' + res.data.menus[i].url,
									color: res.data.menus[i].remark
								}
								this_.menus[a].menusList.push(data)
							}
						}

					}
					console.log(this_.menus)
				}

			})
		},
		methods: {
			gotoAdd(index1, index2) {
				uni.navigateTo({
					url: this.menus[index1].menusList[index2].url + "?edit=0",
				});

			}
		}
	}
</script>

<style>
	@import url("../../common/myFont.css");

	.work-no-peim {
		text-align: center;
		padding: 50upx 0;
		color: #BCBCBC;
	}

	.work-no-peim .iconfont {
		font-size: 80upx;
		position: relative;
		left: 0;
		color: #BCBCBC;
	}

	.text {
		padding: 0 20upx;
		text-align: center;
		color: #777;
		font-size: 24upx;

	}

	.rediu {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		text-align: center;
		position: relative;
	}

	.color {
		background: #1AAD19;
	}

	.iconfont {
		position: absolute;
		font-size: 50upx;
		left: 50%;
		top: 5upx;
		margin-left: -25upx;
	}

	/* title */
	.title {
		font-size: 28upx;
		text-align: left;
		padding-left: 32upx;
		padding-bottom: 20upx;
		padding-top: 40upx;
		position: relative;
	}

	.title text {
		color: #555555;
		font-weight: bold;
		padding-left: 20upx;
	}

	.title text::after {
		content: ' ';
		position: absolute;
		width: 8upx;
		height: 32upx;
		background-color: #4CA2FF;
		left: 32upx;
		top: 50%;
		margin-top: -5upx;

	}
</style>
