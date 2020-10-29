<template>
	<view class="borrow">
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in data" :key="item.id">
					<view>
						<checkbox :value="item.id" :checked="item.checked" />
					</view>
					<view >
						<view>编号：{{item.code}}</view>
						<view>项目：{{item.projectName}}</view>
						<view>借款金额：{{item.borrowAmount}}</view>
						<view>申请时间：{{item.applyTime}}</view>
					</view>
				</label>
			</checkbox-group>
		</view>
		
		<view class="button-sp-area">
			<button class="mini-btn" type="primary" size="mini" :loading="loading1" @click="navBackM('1')" >确定</button>
			<button class="mini-btn" type="info" size="mini" :loading="loading1" @click="navBackM('0')" >取消</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return { 
				loading1:false,
				data:[]
			}
		},
		onLoad() {
			var this_=this
			this.urlRequestPost('oa/oaBorrowMoney/list','',null,function(res){
				console.log(res)
				this_.data=res.data.rows
				for (let i in this_.data) {
					this_.data[i].checked = false;
				}
			})
		},
		methods: {
			navBackM(flag){
				uni.navigateTo({
				    url:'../reimbursement'
				})
				if(flag=='1'){
					let selectData=[]
					for (let i in this.data) {
						if(this.data[i].checked==true){
							selectData.push(this.data[i])
						}
					}
					setTimeout(()=>{
					    uni.$emit('data',{data:selectData})
					},1000)
				}
				
			},
			checkboxChange: function (e) {
				var items = this.data,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values[0] == item.id){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
		}
	}
</script>

<style>
	@import url("../../../../static/css/oa.css");
	.uni-list-cell {
		justify-content: flex-start
	}
</style>
