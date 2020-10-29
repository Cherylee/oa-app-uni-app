<template>
    <view class="content">
        <view class="example-box">
        	<uni-card :is-shadow="true" :title="user.loginName" mode="title" :thumbnail="avatar" :extra="user.phonenumber" >
        		<view>
        			<view class="content-box">
        				<text class="content-box-text"><text class="text">部门：</text>{{(user.dept?user.dept:{}).deptName}} </text>
						<text class="content-box-text"><text  class="text">邮箱地址：</text>{{user.email}}</text>
						<text class="content-box-text"><text  class="text">创建时间：</text>{{user.createTime}} </text>
						<text class="content-box-text"><text  class="text">性别：</text>{{user.sex}} </text>
        			</view>
        		</view>
        	</uni-card>
			
        </view>
    </view>
</template>

<script>
    import uniSection from '@/components/uni-section/uni-section.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

    export default {
		components: {
			uniSection,
			uniList,
			uniCard,
			uniListItem
		},
		data() {
		    return {
				user:{},
				avatar:''
			}
		},
		onReady() {
			/**
			 * 请求登陆以后的数据
			 */
			let this_=this
			this.urlRequestPost('/phoneIndexData','',null,function(res){
				if(res.statusCode='200'){
					this_.user=res.data.user
					//用户头像
					if(res.data.user.avatar==''){
						if(res.data.user.avatar=='0'){//男性
							this_.avatar='../../static/img/qq0.jpg'
						}else{//女性
							this_.avatar='../../static/img/qq1.jpg'
						}
					}else{
						this_.avatar=this_.websiteUrl+'profile/avatar/'+res.data.user.avatar
					}
				}
			})
			
		},
        methods: {
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
            bindLogout() {
                this.logout();
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
            }
        }
    }
</script>

<style> 
	.content-box-text{
		display: block;
		line-height: inherit;
		padding: 20upx 30upx;
		color: #888888;
	}
	.text{
		color: #333333;
	}
</style>
