<template>
	<view class="uploader">
		<view class="uni-list list-pd filebox ">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title"><text class="filetitlee">附件:</text>(点击可预览选好的图片)</view>
						<view class="uni-uploader-info">{{imageList.length}}/9</view>
					</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageList" :key="index" class="uni-uploader_close">
								<view v-if="!os" class="uni-uploader__file uni-uploader_close">
									<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
									<view class="closeBtn" @tap="deleImage(index)">
										<text class="closeB" /> X </text>
									</view>
								</view>
								<view v-else class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
									<view style="width: 280upx;padding: 0 10px;" class="uni-center">
										<uni-icons type="paperclip" size="40" @tap="gotoFile(image)" />
									</view>
								</view>
							</block>
							<view class="uni-uploader__input-box">
								<view class="uni-uploader__input" @tap="chooseImage"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		props: {
			imageList: {
				type: Array,
				default () {
					return []
				}
			},
			os: {
				type: Boolean,
				default () {
					return false
				}
			}, 
		},
		data() {
			return {
				//附件
				imageLists:[],
				attachmentList: [],
				title: 'choose/previewImage',
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 1,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		methods:{
			// 预览附件
			gotoFile(f) {
				uni.showLoading({
				    title: '加载中'
				});
				uni.downloadFile({
				  url: f,
				  success: function (res) {
					uni.hideLoading();
				    var filePath = res.tempFilePath;
				    uni.openDocument({
				      filePath: filePath,
				      success: function (res) {
						uni.hideLoading();
				        console.log('打开文档成功');
				      }
				    });
				  }
				});
			},
			//附件
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
			
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					//console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				var this_=this
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						// this.imageList = this.imageList.concat(res.tempFilePaths);
						uni.showLoading({
						    title: '加载中'
						});
						var imageSrc = res.tempFilePaths
						for(let i in imageSrc){
							 uni.uploadFile({
								url:this.websiteUrl+'common/bootstrapFileInputUpload',
								filePath: imageSrc[i],
								fileType: 'image',
								name: 'data',
								success: (res) => {
									uni.hideLoading();
									uni.showToast({
										title: '上传成功',
										icon: 'success',
										duration: 1000
									})
									let imgs =  {
										'attachmentName':JSON.parse(res.data).fileName,
										'fileName':JSON.parse(res.data).sourceFileName
										}
									this_.imageList.push(imageSrc[i])//用于回显图片预览
									this_.attachmentList.push(imgs)//用于上传
									this_.$emit("attachmentList",this_.attachmentList)
								},
								fail: (err) => {
									//console.log('uploadImage fail', err);
									uni.showModal({
										content: err.errMsg,
										showCancel: false
									});
								}
							});
						}
						
						
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			//图片已满
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			//预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			//删除图片
			deleImage(index){
				let current=index
				this.imageList.splice(current,1)//回显删除
				this.attachmentList.splice(current,1)
				this.$emit("attachmentList",this.attachmentList)
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');
			
				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
			
				return status;
			}
		}
	}
</script>

<style>
	.uni-uploader{
		padding: 20upx 0upx;
	}
	.uploader{
		margin: 30upx 0;
	}
</style>
