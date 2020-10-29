<template>
	<view class="uni-common-mt">
		<form>
			<input class="hidden" v-model="formData.id"/>
			<view class="uni-form-item uni-row">
				<view class="title">申请人</view>
				<input class="uni-input" v-model="formData.userName" placeholder="申请人" />
			</view>
			<view class="uni-form-item uni-row">
				<view class="title">申请公司</view>
				<d-picker class="uni-input" v-if="formData.companyId" :companyId="formData.companyId" :deptId="formData.deptId" @getDeptV="getDeptV"></d-picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>操作类型</view>
				<input class="hidden" name="optType" v-model="formData.optType" />
				<picker class="picker" @change="bindPickerChange" :value="index" :range="optType" range-key="dictLabel">
					<view class="uni-input">{{(optType[index]?optType[index]:{}).dictLabel}}</view>
				</picker>
			</view>
			<view class="uni-form-item uni-row">
				<view class="title"><span class="red">*</span>申请事由</view>
				<input class="uni-input" name="reason" v-model="formData.reason" placeholder="申请事由" />
			</view>
			<view class="useSealK" v-show="formData.optType=='0'">
				<view class="uni-form-item uni-row">
					<view class="title">刻制印章规格</view>
					<input class="uni-input" name="stampSpec" v-model="formData.stampSpec" placeholder="刻制印章规格" />
				</view>
				<view class="uni-form-item uni-row">
					<view class="title">印章刻制材料</view>
					<input class="uni-input" name="stampMaterial" v-model="formData.stampMaterial" placeholder="印章刻制材料" />
				</view>
			</view>

			<view class="useSeal" v-show="formData.optType=='2'||formData.optType=='3'||formData.optType=='4'">

				<view class="uni-form-item uni-row">
					<view class="title">文件数量</view>
					<input class="uni-input" name="fileNum" type="number" v-model="formData.fileNum" placeholder="文件数量" />
				</view>
				<view>
					<view class="uni-list list-pd filebox">
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
			</view>
			<view class="borrow">
				<button class="mini-btn borrowbtn" type="info" @click="togglePopup('center', 'popup','0')">印章明细</button>
				<view v-if="detailList.length!=0" class="borrowBox">
					<view v-for="(item,index) in detailList" :key="index" class="borrowitem">
						<view>印章名称：{{item.sealName}}</view>
						<view>印章类型：{{getDictV(sealType,item.type)}}</view>
						<uni-icons class="btnclose" type="close" color="#cccccc" size="20" @tap="dele(index,'2')" />
					</view>
				</view>
			</view>
			<view class="button-sp-area">
				<button class="mini-btn" type="info" size="mini" :loading="loading1" @click="submit('0')" v-if="formData.status=='99'||formData.status==''">保存草稿</button>
				<button class="mini-btn" type="primary" @click="submit('1')" :loading="loading2" v-if="formData.status=='99'||formData.status==''"
				 size="mini">提交</button>
				<button class="mini-btn" type="primary" @click="submit('2')" v-if="formData.status=='3'" size="mini">提交</button>
				<button class="mini-btn cui-btn-2" type="info" :loading="loading3" @click="urge()" v-if="formData.status!=''&&formData.status!='2'&&formData.status!='16'&&formData.status!='99'"
				 size="mini">催办</button>
				<button class="mini-btn cui-btn-1" type="info" v-if="formData.status!='99'&&formData.status!=''" size="mini" @click="send()">抄送</button>
			</view>
		</form>
		<uni-process :baseUrl="baseUrl" :procInstId="procInstId" :mid="mid" v-if="edit=='1'&&procInstId"></uni-process>
		<!-- 印章弹窗 -->
		<uni-popup :show="showpopup" :type="type" :mask-click="false">
			<uni-relation-popup :setPopup="popupData" @getData="getData" @popupState="popupState"></uni-relation-popup>
		</uni-popup>
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
	import service from '@/service.js';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import dPicker from '@/components/d-picker/d-picker.vue';
	import graceChecker from '@/common/graceChecker.js'
	import uniProcess from '@/components/uni-processList/nui-processList.vue';
	import permision from "@/common/permission.js"
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			uniProcess,
			uniIcons
		},
		data() {
			return {
				mid: '',
				edit: '',
				user: {},
				os: false,
				// 基本数据
				formData: {
					id: '',
					userName: '',
					companyId: '',
					deptId: '',
					optType: '0',
					sealName: '',
					sealId: '',
					type: '0',
					reason: '',
					fileNum: '',
					stampSpec: '',
					stampMaterial: '',
					remark: '',
					status: ''
				},
				details: {
					sealId: '',
					sealName: '',
					type: '',
				},
				detailList: [],
				baseUrl: 'oa/oaSealApply',
				addUrl: 'oa/oaSealApply/add',
				saveUrl: 'oa/oaSealApply/saveDraft',
				editUrl: 'oa/oaSealApply/edit',
				flag: false,
				// 当前时间
				date: service.getDate('dateTime'),
				//操作类型
				optType: [],
				index: 0,
				//印章类型
				sealType: [],
				indexT: 0,
				//印章
				sealdata: [],
				sealLists: [],
				tiptext: '加载中.....',
				isLoading: false,
				pageSize: 3,
				pageNum: 1,
				total: 0,
				currentP: 0,
				// 按钮
				loading1: false,
				loading2: false,
				loading3: false,
				// 流程
				procInstId: '',
				//弹框
				type: '',
				showseal: false,
				//附件
				attachmentList: [],
				title: 'choose/previewImage',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 1,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				showpopup: false,
				// 印章弹框
				popupData: {
					'titile': '印章',
					'selectType': 'checkbox',
					'url': 'oa/oaSeal/list',
					'popupType': 'oaSeal'
				}
			}
		},
		computed: mapState(['name', 'deptId', 'companyId', 'hasLogin']),
		onLoad(e) {
			this.edit = e.edit || '0'
			this.mid = e.id || ''
			let this_ = this
			//用户信息
			if (this.edit == '0') {
				this.$set(this.formData, 'userName', this.name)
				this.$set(this.formData, 'companyId', this.companyId)
				this.$set(this.formData, 'deptId', this.deptId)
			}
			//操作类型
			this.dictValue('oa_seal_eng_discard').then(res => {
				// console.log(res)
				this_.optType = res.data
			})
			//印章类型
			this.dictValue('oa_seal_type').then(res => {
				// console.log(res)
				this_.sealType = res.data
			})
			//编辑页面信息
			if (this.edit == '1') {
				this.urlRequestGet(this.baseUrl + '/phoneEdit/' + this.mid, 'text/html;charset=UTF-8', function(res) {
					service.listAssign(this_.formData, res.data)
					this_.procInstId = res.data.procInstId
					//默认选项
					this_.index = this_.returnIndex(this_.optType, this_.formData.optType)
					this_.indexT = this_.returnIndex(this_.sealType, this_.formData.type)
				})
				//图片返显
				this.urlRequestPost('oa/oaAttachment/selectAttachByObjectId', {
					"objId": this.mid
				}, null, function(res) {
					for (let i in res.data.data) {
						this_.imageList.push(this_.websiteUrl + res.data.data[i].attachmentName)
						this_.attachmentList.push({
							'objectId': this_.id,
							'attachmentName': res.data.data[i].attachmentName,
							'fileName': res.data.data[i].fileNamess
						})
					}					
				})
				//明细记录
				this.urlRequestPost('oa/oaSealApplyDetail/list', {
					'mainId': this.mid
				}, null, function(res) {
					console.log(res)
					for (let i in res.data.rows) {
						this_.detailList.push(res.data.rows[i])
						
					}
				})
			}
			//获取印章列表
			this.getSealList()

		},
		methods: {
			// 提交和保存
			submit(flag) {
				let this_ = this
				let url = ''
				let data = {}
				//定义表单规则			
				let rule = [
					{
						name: "reason",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "事由必填"
					}
				];
				data.attachmentList = this.attachmentList
				data.oaSealApply = this.formData
				data.detailList = this.detailList
				//进行表单检查
				let checkRes = graceChecker.check(this.formData, rule);
				if (checkRes) {
					// console.log(this.formData)
					switch (flag) {
						case '1': //1代表的是提交
							url = this.addUrl
							this.loading2 = true
							break
						case '0': //0代表的是保存
							url = this.saveUrl
							this.loading1 = true
							break
						case '2':
							url = this.editUrl
							this.loading1 = true
							break
					}
					this.urlRequestPost(url, data, 'application/json;charset=UTF-8', function(res) {
						// console.log(res)
						this_.loading1 = false
						this_.loading2 = false
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
						if (res.data.code == '0') {
							uni.reLaunch({
								url: '../../start/start'
							});
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			/**
			 * 抄送
			 */
			send() {
				uni.navigateTo({
					url: "../../send/send?id=" + this.mid + "&url=" + this.baseUrl,
				});
			},
			/**
			 * 催办
			 */
			urge() {
				var this_ = this
				this.loading3 = true
				this.urlRequestGet(this.baseUrl + '/urge/' + this.mid, null, function(res) {
					//this_.formData.leaveDays=res.data.hours
					// console.log(res)
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					});
					if (res.data.code == 0) {
						this_.loading3 = false
						uni.reLaunch({
							url: '../../start/start'
						});
					}

				})
			},
			/**
			 * 字典回显
			 */
			getDictV(type, value) {
				let dictV = ''
				for (let i in type) {
					if (type[i].dictValue == value) {
						dictV = type[i].dictLabel
					}
				}
				return dictV
			},
			//使用时间
			changeStart: function(e) {
				this.details.useTime = e
				this.showValue = e
				this.date = e
			},
			//操作类型
			bindPickerChange: function(e) {
				this.index = e.target.value
				// 操作类型赋值
				this.formData.optType = e.target.value
			},
			bindPickerChangeType(e) {
				this.indexT = e.target.value
				// 操作类型赋值
				this.formData.type = e.target.value
			},
			// 弹框
			togglePopup(type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break

					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				this['show' + open] = true
			},
			//取消弹窗
			cancel(type, flag) {
				this['show' + type] = false
				if (flag == '1') { //印章的确认按钮事件
					this.$set(this.formData, 'sealName', this.sealdata[this.currentP].sealName)
					this.$set(this.formData, 'sealId', this.sealdata[this.currentP].id)
					console.log(this.sealdata)
				}
			},
			//判断是否已经添加过了
			ifadd(id) {
				let blo = false
				for (let i in this.sealdata) {
					if (id == this.sealdata[i].id) {
						blo = true
					}
				}
				return blo
			},
			//弹窗变动监听
			change(e) {
				// console.log('是否打开:' + e)
				if (!e.show) {
					this.showseal = false
				}
			},
			//报销类型多选框监听
			radioChange(evt) {
				// console.log(evt.target.value)
				for (let i = 0; i < this.sealdata.length; i++) {
					if (this.sealdata[i].id === evt.target.value) {
						this.currentP = i;
						break;
					}
				}
			},
			/**
			 * @param {Object} e借款单
			 */
			getSealList() {
				let this_ = this
				//借款单信息
				this.urlRequestPost('oa/oaSeal/phoneList', {
					'pageSize': this.pageSize,
					'pageNum': this.pageNum
				}, null, function(res) {
					console.log(res)
					let activeTab = this_.sealdata
					let list = [];
					for (let a in res.data.rows) {
						list.push(res.data.rows[a]);
					}
					if (this_.pageNum <= 1) {
						this_.sealdata = list;
					} else {
						this_.sealdata = activeTab.concat(list);
					}
					this_.total = res.data.total
				})
			},
			//借款单下滑至底部监听
			seallower(e) {
				// console.log(this.total)
				setTimeout(() => {
					let uPageNum = Math.ceil(this.total / this.pageSize)
					// console.log(uPageNum)
					if (this.pageNum < uPageNum) {
						// console.log(uPageNum)
						this.pageNum++
						this.getSealList();
					} else {
						this.tiptext = '没有数据了！'
					}

				}, 500)
			},
			returnIndex(n, v) {
				var index = ''
				for (let i in n) {
					if (n[i].dictValue == v) {
						index = i
					}
				}
				return index
			},
			// 合同回传
			getData(res) {
				console.log(res)
				if (res[0].popupType) {
					for(var i in res){
						this.detailList.push({
							'sealId':res[i].id,
							'sealName':res[i].sealName,
							'type':res[i].type
						})
					}
				}
			},
			popupState(res) {
				this.showpopup = res
			},
			dele(index) {
				this.detailList.splice(index, 1);
			},
			//部门回传
			getDeptV(res) {
				this.formData.deptId = res.deptId
				this.formData.companyId = res.companyId
			},
			// 预览附件
			gotoFile(f) {
				uni.showLoading({
					title: '加载中'
				});
				uni.downloadFile({
					url: f,
					success: function(res) {
						uni.hideLoading();
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							success: function(res) {
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
				var this_ = this
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						// this.imageList = this.imageList.concat(res.tempFilePaths);
						var imageSrc = res.tempFilePaths
						for (let i in imageSrc) {
							uni.uploadFile({
								url: this_.websiteUrl + 'common/bootstrapFileInputUpload',
								filePath: imageSrc[i],
								fileType: 'image',
								name: 'data',
								success: (res) => {
									uni.showToast({
										title: '上传成功',
										icon: 'success',
										duration: 1000
									})
									let imgs = {
										'attachmentName': JSON.parse(res.data).fileName,
										'fileName': JSON.parse(res.data).sourceFileName
									}
									this_.imageList.push(imageSrc[i]) //用于回显图片预览
									this_.attachmentList.push(imgs) //用于上传
									//console.log(imgs)
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
			deleImage(index) {
				let current = index
				this.imageList.splice(current, 1) //回显删除
				this.attachmentList.splice(current, 1)
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
			},
			/**
			 * @param {Object} e部门
			 */
			bindMultiPickerColumnChange: function(e) {
				this.multiIndex[e.detail.column] = e.detail.value
				if (e.detail.column == 1) {
					this.showDeptDetail(e.detail.value)
					//this.multiIndex.splice(2, 1, 0)
				}
				if (e.detail.column == 2) {
					this.formData.applyDeptId = this_.multiArrayId[2][e.detail.value]
				}
				this.$forceUpdate()
			},
			showDeptDetail(index) {
				var this_ = this
				this.urlRequestGet('system/dept/list?parentId=' + this.company[index].deptId, 'text/html;charset=UTF-8', function(
					res) {
					// console.log(res)
					//uni.showToast({title:res.errMsg, icon:"none"});
					if (res.statusCode == 200) {
						let list = []
						let listId = []

						for (let i in res.data) {
							list.push(res.data[i].deptName)
							listId.push(res.data[i].deptId)
						}
						this_.multiArray[2] = list
						this_.multiArrayId[2] = listId
						this_.multiArray.splice(0, 0)
						this_.multiArrayId.splice(0, 0)
						this_.user.companyId = this_.multiArrayId[1][this_.multiIndex[1]]
						this_.user.deptId = this_.multiArrayId[2][this_.multiIndex[2]]
						//默认展示
						// this_.formData.companyId=this_.multiArrayId[1][this_.multiIndex[1]]
						// this_.formData.deptId=this_.multiArrayId[2][0]
						this_.multiIndex[1] = index
						//this_.multiIndex.splice(2, 1, 0)

					}
				})
			}

		}
	}
</script>

<style>
	@import url("../../../static/css/oa.css");

	.uni-list-cell {
		justify-content: flex-start
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

	/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		width: 300px;
		background-color: #fff;
		border-radius: 10px;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		/* padding: 15px;
	*/
		font-size: 14px;
		color: #666;
		height: 550upx;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding-top: 20px;
		border-top: 1upx solid #DDDDDD;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}

	/* //附件 */
	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	}

	.uni-uploader_close {
		position: relative;
	}

	.closeBtn {
		position: absolute;
		top: 0upx;
		right: 0upx;
		width: 40upx;
		height: 45upx;
		background: rgba(255, 255, 255, 0.5);
		text-align: center;
	}

	.closeB {
		margin: 0 auto;
		color: #FFFFFF;
		font-size: 28upx;
		line-height: 40upx;
	}
	/* 明细 */
	.borrowbtn {
		width: 90%;
		margin: 0 auto;
	}
	
	.borrowBox {
		width: 90%;
		margin: 15upx auto;
	}
	
	.borrowitem {
		border-bottom: 1upx solid #e2e2e2;
		padding: 20upx 20upx;
		background: #F8F8F8;
		position: relative;
	}
	
	.btnclose {
		position: absolute;
		right: 0;
		bottom: 0;
	}
</style>
