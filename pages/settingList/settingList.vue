<template>
	<view>
		<view class="uni-list-cell "  v-for="(newsitem,index2) in newsList" :key="index2" >
			<view class="uni-media-list ">
				<view class="uni-media-list-body ">
					<view class="uni-media-list-text-top" @click="goDetail(newsitem)">{{ newsitem.companyName }}</view>
					<view class="uni-media-list-text-bottom ">
						<text>打卡点距离：{{ newsitem.distance }}</text>
						<text class="mini-text">{{ newsitem.createTime }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		    return {
				user:{ },
				newsList:[],
				tabBars: {
				    name: '打卡设置台账',
				    id: 'c001',
					url:'/oa/oaAttendanceConfig/list',
					pageNum:1
				}
			}
		},
	    onReady() {
			this.getList()
	    },
		methods: {
			/**
			 * @param {index} 第几个活页
			 * 获取活页里面的list数据
			 */
			getList() {
				this.serverList(this.tabBars.url)
			},
			/**
			 * 请求接口数据
			 */
			serverList(url){
				const this_=this
				this.urlRequestPost(url,'',null,function(res){
					console.log(res)
					if(res.data.rows.length!=0){
						let list = [];
						for (let i = 0; i < res.data.rows.length; i++) {
							let item =res.data.rows[i]
							list.push(item)
						}
						this_.newsList=list
					}else{
						this_.newsList.noneText='暂无数据!'
					}
					
					
				})
			},
			 /**
			  * @param {Object} e
			  */
			 goDetail(e) {
			 	let this_=this
				let id=''
			     if (this.navigateFlag) {
			         return;
			     }
			     this.navigateFlag = true;
				 uni.navigateTo({
				 	url: "../setting/setting?edit=1&id="+e.id,
				 });
			     setTimeout(() => {
			         this.navigateFlag = false;
			     }, 200)
			 }
			 
		}
	}
</script>

<style>
	.uni-list-cell{
		padding: 10upx 20upx;
	}
	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
