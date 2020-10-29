<template>
	<view class="uni-process">
		<view class="processList-box">
			<view class="example-body">
			   <uni-steps :options="processList" active-color="#333333" :active="active" direction="column" />
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import uniSteps from '../../components/uni-steps/uni-steps.vue'
	export default {
		components: {
			uniSteps
		},
		name: 'UniProcess',
		props: {
			baseUrl:{
				type: String,
				default: '#1aad19'
			},
			procInstId:{
				type: String,
				default: '#1aad19'
			},
			mid:{
				type: String,
				default: '#1aad19'
			}
		},
		data() {
			return {
				processList:[],
				active:null
			}
		},
		mounted() {
			/**
			 *  流程
			 */
				let this_=this
				this.urlRequestPost(this.baseUrl+'/processList',{"procInstId": this.procInstId,"id":this.mid},"application/json;charset=UTF-8",function(res){
					this_.processList=res.data.rows
				})
		}
	}
</script>

<style>
	.processList-box{
		margin-top: 25upx;
		padding: 10px 0;
		background-color: #F8F8F8;
	}
</style>
