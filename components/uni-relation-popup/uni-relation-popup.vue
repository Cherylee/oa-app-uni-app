<template>
	<view class="popup">
		<text class="uni-popup-title">选择{{popupData.titile}}</text>
		<scroll-view scroll-y="true" class="uni-popup-content" @scrolltolower="seallower">
			<view class="loading-more" v-if="data.length==0"><text class="loading-more-text">暂无{{popupData.titile}}！</text></view>
			<view class="uni-list" v-else>
				<radio-group v-if="popupData.selectType=='radio'" @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in data" :key="item.id" :style="{'background':item.disabled?'#f7f7f7':'none'}">
						<view>
							<radio :value="index.toString()"/>
						</view>
						<view >
							<popup-list-content :setData="item" :setType="popupData.popupType"></popup-list-content>
						</view>
					</label>
				</radio-group>
				<checkbox-group v-if="popupData.selectType=='checkbox'"  @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in data" :key="item.id" :style="{'background':item.disabled?'#f7f7f7':'none'}">
						<view>
							<checkbox :value="index.toString()"/>
						</view>
						<view >
							<popup-list-content :setData="item" :setType="popupData.popupType"></popup-list-content>
						</view>
					</label>
				</checkbox-group>
			</view>
			<view class="loading-more" v-if="isLoading || total > 3">
				<text class="loading-more-text">{{tiptext}}</text>
			</view>
		</scroll-view>
		<view class="popup-bottom">
			<text class="popup-button" @click="navBackM('0')" >取消</text>
			<text class="popup-button"  @click="navBackM('1')" >确定</text>
		</view>
	</view>
</template>

<script>
	import popupListContent from "@/components/uni-relation-popup/popup-list-content/popup-list-content.vue";
	export default {
		components: {
			popupListContent
		},
		props:["setPopup"],		
		data() {
			return { 
				loading1:false,
				data:[],
				popupData:{},
				selectData:{},
				//显示参数
				tiptext:'加载中.....',
				isLoading:false,
				pageSize:3,
				pageNum:1,
				total:0,
				currentP:0,
			}
		},
		created:function(){
			var this_=this
			this_.popupData=this_.setPopup
			this.urlRequestPost(this_.popupData.url,{'pageSize':this.pageSize,'pageNum':this.pageNum},null,function(res){
				if(res.data.rows){
					this_.data=res.data.rows
					this_.total=res.data.total
				}
			})			
		},
		methods: {
			//下滑至底部监听
			seallower(e){
				setTimeout(() => {
					let uPageNum=Math.ceil(this.total/this.pageSize)
					if(this.pageNum<uPageNum){
						this.pageNum++
						this.getSealList();
					}else{
						this.tiptext='没有数据了！'
					}
					
				}, 500)
			},
			getSealList(){
				let this_=this
				//获取数据
				this.urlRequestPost(this_.popupData.url,{'pageSize':this.pageSize,'pageNum':this.pageNum},null,function(res){
					let activeTab =this_.data
					let list = [];
					for(let a in res.data.rows){
						list.push(res.data.rows[a]);
					}
					if(this_.pageNum<=1){
						
						this_.data = list;
					}else{
						this_.data = activeTab.concat(list);
					}
					this_.total=res.data.total
				})
			},
			//单选框事件监听
			radioChange(evt) {
				this.selectData[0]=this.data[parseInt(evt.target.value)]
				this.selectData[0].popupType = this.popupData.popupType
			},
			//多选框事件监听
			checkboxChange(evt){
				var list =[]
				for (let i in evt.target.value) {
					var number = parseInt(evt.target.value[i])
					this.data[number].popupType= this.popupData.popupType
					list.push(this.data[number])
				}
				this.selectData=list
			},
			//确定或者取消
			navBackM(flag){
				if(flag=='1'){
					this.$emit('getData',this.selectData)
					this.$emit('popupState',false)
				}else{
					this.$emit('popupState',false)
				}
				
			},	
		}
	}
</script>

<style>
	@import url("../../static/css/oa.css");
	.popup{
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		width: 300px;
		background-color: #fff;
		border-radius: 10px;
	}
	.uni-popup-title {
		width: 100%;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}
	.uni-popup-content {
		font-size: 14px;
		color: #666;
		height:550upx;
	}
	.popup-bottom{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding-top: 20px;
		border-top: 1upx solid #DDDDDD;
	}
	.popup-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}
	.uni-list-cell {
		justify-content: flex-start
	}
</style>
