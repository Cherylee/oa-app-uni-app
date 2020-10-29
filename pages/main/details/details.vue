<template>
	<view class="uni-padding-wrap">
		<view v-if="ifPc">
			<view v-if="type=='8'&&vo.oaContract" class="contract-top">
				<view class="detail-text"><span>合同流水号：</span>{{vo.oaContract.serialNum}}</view>
				<view class="detail-text"><span>审核节点：</span>{{vo.nodeName?vo.nodeName:'审核通过'}}</view>
				<view class="detail-text">
					<span>当前处理人：</span>
					<text v-if="vo.disposeUserList!=null" v-for="(item,index) in vo.disposeUserList" :key="index">
						{{item.userName?item.userName:''}}
					</text>
				</view>
				<text class="detail-text"><span>效力状态：</span>{{vo.effectStatus}}</text>
			</view>
			<uni-details :options="approveData" :attachmentUrl="attachmentUrl" :flag="type" :user="user"></uni-details>
			<view class="processList-box" v-if="procInstId">
				<view class="example-body">
					<uni-steps :options="processList" active-color="#333333" :active="active" direction="column" />
				</view>
			</view>
			<view v-if="type!='8'&&type!='10'">
				<view class="button-sp-area" v-if="!taskId">
					<button v-if="index=='0'||index=='2'" class="mini-btn" type="primary" size="mini" @click="ifAgree('Y')">同意</button>
					<button v-if="index=='0'||index=='2'" class="mini-btn" type="warn" size="mini" @click="ifAgree('N')">不同意</button>
					<button class="mini-btn" type="default" size="mini" @click="send()">抄送</button>
				</view>
				<uni-popup :show="showtip" type="center" :mask-click="false" @change="change">
					<view class="uni-tip">
						<text class="uni-tip-title">{{opinion}}</text>
						<view class="uni-form-item uni-column">
							<input class="uni-input" focus placeholder="自动获得焦点" :value="opinion" />
						</view>
						<scroll-view v-if="type=='3'||type=='170'" class="uni-tip-content" style="height: 450upx;" scroll-y="true">
							<!-- 报销 -->
							<view v-if="type=='3'">
								<view v-for="(list,index) in reimList" :key="index" style="background-color: #efefef;margin: 0upx 0 30upx 0;padding: 20upx;">
									<view>报销事由：{{list.reimbursementReason}}</view>
									<view>报销金额：{{list.money}}</view>
									<view>报销类型：{{list.reimbursementType}}</view>
									<view class="uni-form-item uni-column">
										<input class="uni-input" focus placeholder="实际金额" v-model="list.actualMoney" />
									</view>
									<view class="uni-form-item uni-column">
										<input class="uni-input" focus placeholder="原因" v-model="list.remark" />
									</view>
								</view>
							</view>
							<!-- 付款 paymentList-->
							<view v-if="type=='170'">
								<view v-for="(list,index) in reimList" :key="index" style="background-color: #efefef;margin: 0upx 0 30upx 0;padding: 20upx;">
									<view>付款事由：{{list.paymentReason}}</view>
									<view>付款金额：{{list.money}}</view>
									<view>付款类型：{{list.payType}}</view>
									<view class="uni-form-item uni-column">
										<input class="uni-input" focus placeholder="实际金额" v-model="list.actualMoney" />
									</view>
									<view class="uni-form-item uni-column">
										<input class="uni-input" focus placeholder="原因" v-model="list.reason" />
									</view>
								</view>

							</view>
						</scroll-view>
						<view class="uni-tip-group-button">
							<button class="uni-tip-button uni-tip-button1" @click="cancel('tip','cancel')">取消</button>
							<button class="uni-tip-button uni-tip-button2" @click="cancel('tip','yes')" :loading="loading1">确定</button>
						</view>
					</view>
				</uni-popup>
			</view>

			<view v-if="type=='8'&&vo.hisNodeList&&vo.oaContract" class="contract-item">
				<h3>主管部门审核</h3>
				<view v-for="(item,i1) in vo.hisNodeList.key0" :key="i1" class="contract-items">
					<view>
						<text>主管部门审核:</text>
						<text>{{item.userName}}</text>
					</view>
					<view class="contract-row">
						<text>审核意见:</text>
						<text v-if="item.message">{{item.message}}</text>
						<view class="opinion-text" v-else>
							<view v-if="vo.nodeFlag=='key0'&&vo.curUser.userId==item.userId">
								<text>{{opinionCont}}</text>
								<view class="opinion-btn" v-if="index=='0'||index=='2'">
									<button class="mini-btn" v-if="!opinionCont" type="primary" size="mini" @click="showComment()">输入审核意见</button>
									<button class="mini-btn" v-if="opinionCont" type="primary" size="mini" @click="ifAgreeContract('Y',item.pass=='C'?'1':'0',item)">同意</button>
									<button class="mini-btn" v-if="opinionCont" type="warn" size="mini" @click="ifAgreeContract('N',item.pass=='C'?'1':'0',item)">驳回</button>
								</view>
							</view>
							<view v-else>待审核</view>
						</view>
					</view>
					<view>
						<text>审核日期:</text>
						<text>{{item.startTime}}</text>
					</view>
				</view>
				<h3>相关部门审核</h3>
				<view v-if="vo.hisNodeList.key1.length== 0" class="contract-items">
					<view>
						<text>部门审核人员:</text>
						<text>{{vo.contractNode.staffName}}</text>
					</view>
					<view>
						<text>审核意见:</text>
						<text></text>
					</view>
					<view>
						<text>审核时间:</text>
						<text></text>
					</view>
				</view>
				<view v-else v-for="(item,i2) in vo.hisNodeList.key1" :key="'idx'+i2" class="contract-items">
					<view>
						<text>部门审核人员:</text>
						<text>{{item.userName}}</text>
					</view>
					<view class="contract-row">
						<text>审核意见:</text>
						<text v-if="item.message">{{item.message}}</text>
						<span class="opinion-text" v-else>
							<view v-if="vo.nodeFlag=='key1'&&vo.curUser.userId==item.userId">
								<text>{{opinionCont}}</text>
								<view class="opinion-btn" v-if="index=='0'||index=='2'">
									<button class="mini-btn" v-if="!opinionCont" type="primary" size="mini" @click="showComment()">输入审核意见</button>
									<button class="mini-btn" v-if="opinionCont" type="primary" size="mini" @click="ifAgreeContract('Y',item.pass=='C'?'1':'0',item)">同意</button>
									<button class="mini-btn" v-if="opinionCont" type="warn" size="mini" @click="ifAgreeContract('N',item.pass=='C'?'1':'0',item)">驳回</button>
								</view>
							</view>
							<view v-else>待审核</view>
						</span>
					</view>
					<view>
						<text>审核时间:</text>
						<text>{{item.startTime}}</text>
					</view>
					<view>
						<text>申请人:</text>
						<text>
							<span v-if="item.pass=='U'">{{vo.oaContract.applier}}</span>
							<span v-if="item.pass=='N'&&vo.curUser.userId == vo.oaContract.proposer">{{vo.oaContract.applier}}</span>
						</text>
					</view>
					<view>
						<text>回复意见:</text>
						<view v-if="item.pass=='N'">
							<text v-if="item.replyOpinion">{{item.replyOpinion}}</text>
							<view v-else class="replay-box">
								<input v-if="vo.curUser.userId == vo.oaContract.proposer" type="text" v-model="replyOpinion" placeholder="输入回复意见"
								 class="uni-input replay-input" />
								<button v-if="vo.curUser.userId == vo.oaContract.proposer" class="replay-btn" type="primary" size="mini" @click="ifRetContract(item)">回复</button>
							</view>
						</view>
						<text v-if="item.pass=='U'">{{item.replyOpinion}}</text>
					</view>
				</view>
				<h3>总经理裁决</h3>
				<view v-if="vo.hisNodeList.key3.length== 0">
					<view>
						<text>总经理裁决:</text>
						<text>{{vo.contractNode.managerName}}</text>
					</view>
					<view>
						<text>审核意见:</text>
						<text></text>
					</view>
					<view>
						<text>审核日期:</text>
						<text></text>
					</view>
				</view>
				<view v-else v-for="(item,i3) in vo.hisNodeList.key3" :key="'index'+i3" class="contract-items">
					<view>
						<text>总经理裁决:</text>
						<text>{{item.userName}}</text>
					</view>
					<view class="contract-row">
						<text>审核意见:</text>
						<text v-if="item.message">{{item.message}}</text>
						<view class="opinion-text" v-else>
							<view v-if="vo.nodeFlag=='key3'&&vo.curUser.userId==item.userId">
								<text>{{opinionCont}}</text>
								<view class="opinion-btn" v-if="index=='0'||index=='2'">
									<button class="mini-btn" v-if="!opinionCont" type="primary" size="mini" @click="showComment()">输入审核意见</button>
									<button class="mini-btn" v-if="opinionCont" type="primary" size="mini" @click="ifAgreeContract('Y','0',item)">同意</button>
									<button class="mini-btn" v-if="opinionCont" type="warn" size="mini" @click="ifAgreeContract('N','0',item)">驳回</button>
								</view>
							</view>
							<view v-else>待审核</view>
						</view>
					</view>
					<view>
						<text>审核日期:</text>
						<text>{{item.startTime}}</text>
					</view>
				</view>
				<h3>法务签发</h3>
				<view v-if="vo.hisNodeList.key2.length== 0">
					<view>
						<text>法务签发:</text>
						<text>{{vo.contractNode.legalIssueName}}</text>
					</view>
					<view>
						<text>审核意见:</text>
						<text></text>
					</view>
					<view>
						<text>审核日期:</text>
						<text></text>
					</view>
				</view>
				<view v-else v-for="(item,i4) in vo.hisNodeList.key2" :key="'info'+i4" class="contract-items">
					<view>
						<text>法务签发:</text>
						<text>{{item.userName}}</text>
					</view>
					<view class="contract-row">
						<text>审核意见:</text>
						<text v-if="item.message">{{item.message}}</text>
						<view class="opinion-text" v-else>
							<view v-if="vo.nodeFlag=='key2'&&vo.curUser.userId==item.userId">
								<text>{{opinionCont}}</text>
								<view class="opinion-btn" v-if="index=='0'||index=='2'">
									<button class="mini-btn" v-if="!opinionCont" type="primary" size="mini" @click="showComment()">输入审核意见</button>
									<button class="mini-btn" v-if="opinionCont" type="primary" size="mini" @click="ifAgreeContract('Y','0',item)">同意</button>
									<button class="mini-btn" v-if="opinionCont" type="warn" size="mini" @click="ifAgreeContract('N','0',item)">驳回</button>
								</view>
							</view>
							<view v-else>待审核</view>
						</view>
					</view>
					<view>
						<text>审核日期:</text>
						<text>{{item.startTime}}</text>
					</view>
				</view>
				<h3>申请人签署</h3>
				<view v-if="vo.hisNodeList.key5.length== 0" class="contract-items">
					<view>
						<text>申请人:</text>
						<text>{{vo.oaContract.applier}}</text>
					</view>
					<view>
						<text>请确认对方已签章或我方先签章:</text>
						<text></text>
					</view>
				</view>
				<view v-else v-for="(item,i5) in vo.hisNodeList.key5" :key="'key'+i5" class="contract-items">
					<view>
						<text>申请人:</text>
						<text>{{vo.oaContract.applier}}</text>
					</view>
					<view>
						<text>请确认对方已签章或我方先签章:</text>
						<view v-if="item.message">{{item.message}}</view>
						<view v-else>
							<view v-if="vo.nodeFlag=='key5'&&vo.curUser.userId==item.userId">
								<view class="qian-btn" v-if="index=='0'||index=='2'">
									<button type="primary" size="mini" @click="selectApplier()">签署</button>
								</view>
							</view>
							<view v-else>待签署</view>
						</view>
					</view>
				</view>
				<h3>法务复核</h3>
				<view v-if="vo.hisNodeList.key6.length== 0" class="contract-items">
					<view>
						<text>法务:</text>
						<text>{{vo.contractNode.legalSealName}}</text>
					</view>
					<view>
						<text>用印:</text>
						<text></text>
					</view>
				</view>
				<view v-else v-for="(item,i6) in vo.hisNodeList.key6" :key="'mig'+i6" class="contract-items">
					<view>
						<text>法务:</text>
						<text>{{item.userName}}</text>
					</view>
					<view class="contract-row">
						<text>用印:</text>
						<text v-if="item.message">{{item.message}}</text>
						<view class="opinion-text" v-else>
							<view v-if="vo.nodeFlag=='key6'&&vo.curUser.userId==item.userId">
								<text>{{opinionCont}}</text>
								<view class="opinion-btn" v-if="index=='0'||index=='2'">
									<button class="mini-btn" v-if="!opinionCont" type="primary" size="mini" @click="showComment()">输入审核意见</button>
									<button class="mini-btn" v-if="opinionCont" type="primary" size="mini" @click="ifAgreeContract('Y','0',item)">同意</button>
									<button class="mini-btn" v-if="opinionCont" type="warn" size="mini" @click="ifAgreeContract('N','0',item)">驳回</button>
								</view>
							</view>
							<view v-else>待复核</view>
						</view>
					</view>
				</view>
				<h3>综合部用印</h3>
				<view v-if="vo.hisNodeList.key6.length== 0" class="contract-items">
					<view>
						<text>综合部:</text>
						<text>{{vo.contractNode.comdeptSealName}}</text>
					</view>
					<view>
						<text>用印:</text>
						<text></text>
					</view>
				</view>
				<view v-else v-for="(item,i7) in vo.hisNodeList.key7" :key="'mo'+i7" class="contract-items">
					<view>
						<text>综合部:</text>
						<text>{{item.userName}}</text>
					</view>
					<view class="contract-row">
						<text>用印:</text>
						<text v-if="item.message">{{item.message}}</text>
						<view class="opinion-text" v-else>
							<view v-if="vo.nodeFlag=='key7'&&vo.curUser.userId==item.userId">
								<text>{{opinionCont}}</text>
								<view class="opinion-btn" v-if="index=='0'||index=='2'">
									<button class="mini-btn" v-if="!opinionCont" type="primary" size="mini" @click="showComment()">输入审核意见</button>
									<button class="mini-btn" v-if="opinionCont" type="primary" size="mini" @click="ifAgreeContract('Y','0',item)">同意</button>
									<button class="mini-btn" v-if="opinionCont" type="warn" size="mini" @click="ifAgreeContract('N','0',item)">驳回</button>
								</view>
							</view>
							<view v-else>待审核</view>
						</view>
					</view>
				</view>
				<h3>归档</h3>
				<view class="contract-items">
					<view>
						<text>签署日期:</text>
						<text>{{vo.oaContract.createTime}}</text>
					</view>
					<view>
						<text>合同生效日:</text>
						<text>{{vo.oaContract.effectDate}}</text>
					</view>
					<view>
						<text>合同失效日:</text>
						<text>{{vo.oaContract.expirationDate}}</text>
					</view>
					<view v-for="(item,i8) in vo.hisNodeList.key8" :key="'mok'+i8">
						<view>
							<text>归档人员:</text>
							<text>{{vo.contractNode.archivingName}}</text>
						</view>
						<view class="contract-row">
							<text>归档:</text>
							<view class="opinion-text">
								<view v-if="vo.nodeFlag=='key8'&&vo.curUser.userId==item.userId">
									<view class="opinion-btn" v-if="index=='0'||index=='2'">
										<button class="mini-btn" type="primary" size="mini" @click="showGui()">归档</button>
									</view>
								</view>
								<view v-else>{{vo.oaContract.effectDate?'已归档':'待归档'}}</view>
							</view>
						</view>
					</view>

				</view>
				<!--  -->
			</view>

			<view v-if="type=='10'&&vo.hisNodeList">
				<h3>副经理审核</h3>
				<view v-for="(item,i1) in vo.hisNodeList.key0" :key="i1" class="contract-items">
					<view>
						<text>副经理审核:</text>
						<text>{{item.userName}}</text>
					</view>
					<view class="contract-row">
						<text>审核意见:</text>
						<text v-if="item.message">{{item.message}}</text>
						<view class="opinion-text" v-else>
							<view v-if="vo.nodeFlag=='key0'&&vo.curUser.userId==item.userId">
								<text>{{opinionCont}}</text>
								<view class="opinion-btn" v-if="index=='0'||index=='2'">
									<button class="mini-btn" v-if="!opinionCont" type="primary" size="mini" @click="showComment()">输入审核意见</button>
									<button class="mini-btn" v-if="opinionCont" type="primary" size="mini" @click="ifAgreeTender('Y','0',item)">同意</button>
									<button class="mini-btn" v-if="opinionCont" type="warn" size="mini" @click="ifAgreeTender('N','0',item)">驳回</button>
								</view>
							</view>
							<view v-else>待审核</view>
						</view>
					</view>
					<view>
						<text>审核日期:</text>
						<text>{{item.startTime}}</text>
					</view>
				</view>
				<h3>经理审核</h3>
				<view v-for="(item,i1) in vo.hisNodeList.key1" :key="i1" class="contract-items">
					<view>
						<text>经理审核:</text>
						<text>{{item.userName}}</text>
					</view>
					<view class="contract-row">
						<text>审核意见:</text>
						<text v-if="item.message">{{item.message}}</text>
						<view class="opinion-text" v-else>
							<view v-if="vo.nodeFlag=='key1'&&vo.curUser.userId==item.userId">
								<text>{{opinionCont}}</text>
								<view class="opinion-btn" v-if="index=='0'||index=='2'">
									<button class="mini-btn" v-if="!opinionCont" type="primary" size="mini" @click="showComment()">输入审核意见</button>
									<button class="mini-btn" v-if="opinionCont" type="primary" size="mini" @click="ifAgreeTender('Y','0',item)">同意</button>
									<button class="mini-btn" v-if="opinionCont" type="warn" size="mini" @click="ifAgreeTender('N','0',item)">驳回</button>
								</view>
							</view>
							<view v-else>待审核</view>
						</view>
					</view>
					<view>
						<text>审核日期:</text>
						<text>{{item.startTime}}</text>
					</view>
				</view>
			</view>

			<uni-popup :show="showcont" type="center" :mask-click="false" @change="change">
				<view class="uni-tip">
					<text class="uni-tip-title">输入意见</text>
					<view class="uni-tip-content">
						<view class="uni-form-item uni-column">
							<input class="uni-input" focus placeholder="自动获得焦点" v-model="opinionCont" />
						</view>

					</view>
					<view class="uni-tip-group-button">
						<button class="uni-tip-button uni-tip-button1" @click="cancelCont('cont','cancel')">取消</button>
						<button class="uni-tip-button uni-tip-button2" @click="cancelCont('cont','yes')">确定</button>
					</view>
				</view>
			</uni-popup>
			<uni-popup :show="showqian" type="center" :mask-click="false" @change="change">
				<view class="uni-tip">
					<text class="uni-tip-title">签章方式</text>
					<view class="uni-tip-content">
						<view class="uni-form-item uni-column">
							<picker class="picker picker-qian" @change="addApplierFunc" :value="index3" :range="addApplier" range-key="dictLabel">
								<view class="uni-input picker-qian">{{(addApplier[index3]?addApplier[index3]:{}).dictLabel}}</view>
							</picker>

						</view>

					</view>
					<view class="uni-tip-group-button">
						<button class="uni-tip-button uni-tip-button1" @click="cancelqian('qian','cancel')">取消</button>
						<button class="uni-tip-button uni-tip-button2" @click="cancelqian('qian','yes')">签署</button>
					</view>
				</view>
			</uni-popup>
			<!-- 归档 -->
			<uni-popup :show="showgui" type="center" :mask-click="false" @change="change">
				<view class="uni-tip">
					<text class="uni-tip-title">归档</text>
					<view class="uni-tip-content">
						<view class="uni-form-item uni-row">
							<view class="title">合同生效日</view>
							<e-picker class="uni-input" mode="date" :showValue="effectDate" @change="changeStart">{{effectDate}}</e-picker>
						</view>
						<view class="uni-form-item uni-row">
							<view class="title">合同失效日</view>
							<e-picker class="uni-input" mode="date" :showValue="expirationDate" @change="changeEnd">{{expirationDate}}</e-picker>
						</view>

					</view>
					<view class="uni-tip-group-button">
						<button class="uni-tip-button uni-tip-button1" @click="cancelgui('gui','cancel')">取消</button>
						<button class="uni-tip-button uni-tip-button2" @click="cancelgui('gui','yes')">归档</button>
					</view>
				</view>
			</uni-popup>
			<view v-if="index=='2'&&type!=='8'">
				<view class="lastBox" v-for="(item,index) in lastList" :key="index">
					<view><text class="la-title">用户名称：</text>{{(item.node?item.node:{}).userName}}</view>
					<view v-if="item.comment"><text class="la-title">留言：</text>{{item.comment}}</view>
					<view v-else class="inputbox"><text class="la-title">留言：</text><input class="uni-input" focus placeholder="留言"
						 v-model="content[index]" /></view>
					<view><text class="la-title">附件：</text></view>
					<view class="button-sp-area" v-if="(item.node?item.node:{}).flag==true">
						<button class="mini-btn" type="primary" size="mini" @click="lastNode(index)">确认</button>
					</view>
				</view>

			</view>
		</view>
		<view class="noneDetailText" v-else>
			<image src="../../../static/img/loading.gif" class="loading-icon"></image>
			<text>加载中...</text>
		</view>


	</view>
</template>
<script>
	import service from '@/service.js';
	import details from '@/common/details.js';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniDetails from '@/components/nui-details/nui-details.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			uniIcons,
			uniPopup,
			uniSteps,
			uniDetails
		},
		data() {
			return {
				user: {},
				active: null,
				showtip: false,
				showcont: false,
				showqian: false,
				showgui: false,
				baseUrl: '',
				isLeaderPass: '',
				opinion: '',
				opinionCont: '',
				type: '',
				id: '',
				index: '',
				taskId: '',
				procInstId: '',
				approveData: {},
				attachmentUrl: [],
				processList: [],
				lastList: [],
				content: [],
				loading1: false,
				loading2: false,
				// 报销
				reim: {
					reason: '',
					money: 0
				},
				reimList: [],
				paymentList: [],
				// 付款
				pay: {
					reason: '',
					money: 0
				},
				// 判断是否有配置
				ifPc: false,
				// 合同
				vo: {},
				formdata: {},
				formdata1: {}, //流程外
				formdata2: {}, //回复意见
				replyOpinion: '',
				addApplier: [{
					'dictLabel': '对方先签署原件已寄回公司'
				}, {
					'dictLabel': '我方先签署'
				}],
				index3: 0,
				effectDate: service.getDate('date'),
				expirationDate: service.getDate('date'),
				// 经营管理
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad(e) {
			this.type = e.type || '';
			this.id = e.id || '';
			this.taskId = e.taskId || '';
			this.index = e.index || '';
			let this_ = this
			let detailUrl = ''
			let header = ''
			if (e.index == '0') { //催办
				detailUrl = 'system/sysUrge/setMapToPhone/' + e.id
				header = 'application/json;charset=UTF-8'
			} else if (e.index == '3') { //抄送
				detailUrl = 'system/sysCopy/setMapToPhone/' + e.id
				header = 'application/json;charset=UTF-8'
			} else { //审批，任务
				detailUrl = 'oa/task/queryEventDetail/' + e.type + '/' + e.id + '/' + e.taskId
				header = ''

			}
			/**
			 * 详情页面数据接口
			 */
			// console.log(detailUrl)
			this.urlRequestGet(detailUrl, header, function(res) {
				console.log(res)
				if (res.data.phoneData && this_.type != '8' && this_.type != '10') { //请求成功
					this_.approveData = res.data.phoneData
					this_.type = res.data.phoneData.taskType
					//流程---区分（催办的id不是当前这条数据的id）
					let pro_id = ''
					if (this_.index == '0' || this_.index == '3') { //如果是(催办)点进来的，id赋值给后台传过来的id
						pro_id = res.data.phoneData.id
						this_.id = res.data.phoneData.id
						if (res.data.phoneData.taskType == '1') {
							pro_id = res.data.phoneData.leaveId
						}
					} else { //如果不是(催办)点进来的，直接用URl带过来的id
						pro_id = this_.id
					}
					//流程
					this_.procInstId = res.data.phoneData.procInstId
					this_.processListFun(res.data.phoneData.taskType, pro_id);
					this_.user = res.data.user;
					if (e.index == '2') { //任务
						this_.urlRequestPost('oa/oaProcExeNode/selectNodeVoTableInfo', {
							"actDefineId": res.data.phoneData.actDefineId,
							'objId': this_.id
						}, null, function(res) {
							this_.lastList = res.data.rows
						})
					}
					// 如果手机端还没配置，就提示到pc查看
					if (details.baseUrl(this_.type)) {
						this_.ifPc = true
					} else {
						this_.ifPc = false
					}
					/**  附件
					 */
					this_.urlRequestPost('/oa/oaAttachment/selectAttachByObjectId', {
						"objId": pro_id,
						"sourceTable": res.data.phoneData.tableName
					}, null, function(res) {
						this_.attachmentUrl = res.data.data
					})
				} else if (this_.type == '8') {
					if (res.data.vo) {
						this_.ifPc = true
						this_.vo = res.data.vo
						this_.type = this_.vo.oaContract.taskType
						this_.approveData = this_.vo.oaContract
						//提交的数据  流程内
						if (this_.vo.taskUserMapList != null) {
							for (let i in this_.vo.taskUserMapList) {
								if (this_.vo.taskUserMapList[i] != null) {
									if (this_.vo.taskUserMapList[i].assignee == this_.vo.curUser.userId) {
										this_.formdata.taskId = this_.vo.taskUserMapList[i].taskId
										this_.formdata.procInstId = this_.vo.taskUserMapList[i].procInstId
									}
								}
							}
						}
						if (this_.vo.nodeFlag == 'key1') {
							this_.formdata.nodeFlag = 'key1'
						}
						//流程---区分（催办的id不是当前这条数据的id）
						let pro_id = ''
						if (this_.index == '0' || this_.index == '3') { //如果是(催办)点进来的，id赋值给后台传过来的id
							pro_id = res.data.phoneData.id
							this_.id = res.data.phoneData.id
						} else { //如果不是(催办)点进来的，直接用URl带过来的id
							pro_id = this_.id
						}
						/**  附件
						 */
						this_.urlRequestPost('/oa/oaAttachment/selectAttachByObjectId', {
							"objId": pro_id
						}, null, function(res) {
							this_.attachmentUrl = res.data.data
						})
					} else {
						this_.ifPc = false
					}
				} else if (this_.type == '10') {
					if (res.data) {
						this_.ifPc = true
						this_.vo = res.data.vo
						// this_.type = this_.vo.phoneData.taskType
						this_.approveData = res.data.vo.jyTender
						// console.log(this_.approveData)
						this_.formdata.taskId = res.data.vo.curDealMap.taskId

					} else {
						this_.ifPc = false
					}
				}
			});


		},
		methods: {
			/**
			 *  流程
			 */
			processListFun(type, id) {
				let this_ = this
				this.urlRequestPost(details.baseUrl(type) + '/processList', {
					"procInstId": this.procInstId,
					"id": id
				}, "application/json;charset=UTF-8", function(res) {
					this_.processList = res.data.rows
				})
			},
			/**
			 * 同意 不同意
			 */
			ifAgree(e) {
				this.opinion = details.ifAgree(e)
				this['showtip'] = true
				this.isLeaderPass = e
				var this_ = this
				this.reimList=[]
				if (this.type == '3') {
					this.urlRequestPost('oa/oaReimbursementDetail/list', {
						"parentId": this.id
					}, null, function(res) {
						for (var i = 0; i < res.data.rows.length; i++) {
							this_.reimList.push(res.data.rows[i])
						}
					})
				}
				if (this.type == '170') {
					this.urlRequestPost('oa/oaPaymentDetail/list', {
						"parentId": this.id
					}, null, function(res) {
						console.log(res)
						for (var i = 0; i < res.data.rows.length; i++) {
							this_.reimList.push(res.data.rows[i])
						}
					})
				}

			},
			showComment() {
				this['showcont'] = true
			},
			ifAgreeContract(flag, submit, data) {
				let this_ = this
				uni.showLoading({
					title: '提交审核意见中'
				});
				if (submit == '0') { //流程内提交
					this.formdata.pass = flag
					this.formdata.opinion = this.opinionCont
					this.urlRequestPost('oa/oaContract/completeCurTask', this.formdata, null, function(res) {
						uni.hideLoading();
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
						uni.redirectTo({
							url: '../../main/details/details?type=' + this_.type + '&&id=' + this_.id + '&&taskId=' + this_.taskId +
								'&&index=' + this_.index,
						});
					})
				} else { //流程外
					this.formdata1.id = data.commentId
					this.formdata1.taskId = data.taskId
					this.formdata1.procInstId = data.procInstId
					this.formdata1.pass = flag
					this.formdata1.auditOpinion = this.opinionCont
					this.formdata1.isAudit = 'Y'
					this.urlRequestPost('oa/oaContractComment/edit', this.formdata1, null, function(res) {
						uni.hideLoading();
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
						uni.redirectTo({
							url: '../../main/details/details?type=' + this_.type + '&&id=' + this_.id + '&&taskId=' + this_.taskId +
								'&&index=' + this_.index,
						});
					})
				}

			},
			// 投标申请的审核
			ifAgreeTender(flag, submit, data) {
				let this_ = this
				uni.showLoading({
					title: '提交审核意见中'
				});
				this.formdata.pass = flag
				this.formdata.opinion = this.opinionCont
				this.urlRequestPost('business/jyTender/completeCurUserTask', this.formdata, null, function(res) {
					uni.hideLoading();
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					});
					uni.redirectTo({
						url: '../../main/details/details?type=' + this_.type + '&&id=' + this_.id + '&&taskId=' + this_.taskId +
							'&&index=' + this_.index,
					});
				})

			},
			/**
			 * 操作 弹框按钮
			 */
			cancel(type, flag) {
				if (flag == 'yes') {
					let this_ = this;
					this_.loading1 = true
					this_.urlRequestPost(details.baseUrl(this.type) + '/completeCurTask', {
						"opinion": this.opinion,
						"isLeaderPass": this.isLeaderPass,
						"taskId": this.taskId,
						"id": this.id,
						"reason": this.reim.reason,
						"money": this.reim.money,
						"moneyDeatil": JSON.stringify(this.reimList)
					}, null, function(res) {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
						if (res.data.code == '0') {
							uni.reLaunch({
								url: '../../main/main'
							});
						}
						this_.loading1 = false
						this['showtip'] = false
					})
				} else {
					this['showtip'] = false
				}
			},
			cancelCont(type, flag) {
				this['showcont'] = false
				if (flag == 'cancel') {
					this.formdata.opinion = ''
					this.formdata1.auditOpinion = ''
				}

			},
			cancelqian(type, flag) {
				this['showqian'] = false
				if (flag == 'yes') {
					uni.showLoading({
						title: '提交审核意见中'
					});
					let this_ = this;
					this.formdata.opinion = this.addApplier[this.index3].dictLabel
					this.urlRequestPost('oa/oaContract/completeCurTask', this.formdata, null, function(res) {
						uni.hideLoading();
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
						uni.redirectTo({
							url: '../../main/details/details?type=' + this_.type + '&&id=' + this_.id + '&&taskId=' + this_.taskId +
								'&&index=' + this_.index,
						});
					})
				}
			},
			cancelgui(type, flag) {
				this['showgui'] = false
				if (flag == 'yes') {
					this.formdata.effectDate = this.effectDate
					this.formdata.expirationDate = this.expirationDate
					uni.showLoading({
						title: '归档中'
					});
					let this_ = this;
					this.urlRequestPost('oa/oaContract/completeCurTask', this.formdata, null, function(res) {
						uni.hideLoading();
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
						uni.redirectTo({
							url: '../../main/details/details?type=' + this_.type + '&&id=' + this_.id + '&&taskId=' + this_.taskId +
								'&&index=' + this_.index,
						});
					})
				}
			},
			ifRetContract(d) {
				this.formdata2.taskId = d.taskId
				this.formdata2.procInstId = d.procInstId
				this.formdata2.id = d.commentId
				this.formdata2.isAudit = 'N'
				this.formdata2.replyOpinion = this.replyOpinion
				uni.showLoading({
					title: '提交回复意见中'
				});
				let this_ = this
				this.urlRequestPost('oa/oaContractComment/edit', this.formdata2, null, function(res) {
					uni.hideLoading();
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					});
					uni.redirectTo({
						url: '../../main/details/details?type=' + this_.type + '&&id=' + this_.id + '&&taskId=' + this_.taskId +
							'&&index=' + this_.index,
					});
				})
			},
			addApplierFunc(e) {
				this.index3 = e.target.value

			},
			selectApplier() {
				this['showqian'] = true
			},
			showGui() {
				this['showgui'] = true
			},
			changeStart(e) {
				this.effectDate = e
			},
			changeEnd(e) {
				this.expirationDate = e
			},
			change(e) {
				if (!e.show) {
					this.showtip = false
					this.showcont = false
					this.showqian = false
				}
			},
			send() {
				uni.navigateTo({
					url: "../../send/send?id=" + this.id + "&url=" + details.baseUrl(this.type),
				});
			},
			lastNode(index) {
				let data = {}
				data.parentId = this.id
				data.userId = this.lastList[index].node.userId
				data.content = this.content[index]
				data.attachmentList = []
				let this_ = this
				this.urlRequestPost(details.baseUrl(this.type) + '/insertExeComment', data, "application/json;charset=UTF-8",
					function(res) {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
						if (res.data.code == 0) {
							uni.reLaunch({
								url: '../../main/main'
							});
						}
					})
			}
		},
		onBackPress() {
			if (this.showtip) {
				this.showtip = false
				return true
			}
		}
	}
</script>
<style>
	@import url("@/common/myFont.css");

	.contract-top {
		background-color: #FFFFFF;
		border-bottom: 10upx solid #EEEEEE;
		padding: 20upx;
	}

	.contract-item {
		/* border-top: 10upx solid #EEEEEE; */
		margin-bottom: 30upx;
		padding-bottom: 30upx;
		padding-top: 30upx;
	}

	.opinion-btn {
		display: flex;
	}

	.contract-row {
		display: flex;
	}

	.qian-btn {
		display: flex;
	}

	.contract-items {
		/* background-color: #EEEEEE; */
		border-bottom: 2upx solid #EEEEEE;
		padding: 10upx;
	}

	.picker-qian {
		width: 90%;
		margin: 0 auto;
	}

	.replay-box {
		display: flex;
		align-items: stretch
	}

	.replay-btn {
		border: 0rpx;
		border-radius: 0;
		height: auto;
		margin: 0;
	}

	.clockSet_icon {
		display: block;
		font-size: 150upx;
		color: #e1e1e1;
		margin: 0 auto;
		margin-top: 150upx;
	}

	.image {
		width: 200upx;
		margin: 40upx 0;
	}

	.processList-box {
		margin-top: 25upx;
		padding: 10px 0;
		background-color: #F8F8F8;
	}

	button {
		margin-top: 30upx;
		margin-bottom: 30upx;
	}

	.button-sp-area {
		display: flex;
		justify-content: center
	}

	.mini-btn {
		/* flex: 1; */
		margin-right: 10upx;
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
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-top: 20px;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
		border-radius: 0 0 0 0;
		border: 0px;
		color: #FFFFFF;
	}

	.uni-tip-button1 {
		background-color: #CCCCCC;
	}

	.uni-tip-button2 {
		background-color: #4CA2FF;
	}

	.title {
		padding: 10upx 25upx;
	}

	.uni-icon-clear,
	.uni-icon-eye {
		color: #999;
	}

	.uni-input {
		background: #F7F7F7;
		border: 1upx solid #CCCCCC;
	}

	/* 最后节点操作 */
	.lastBox {
		margin-top: 30upx;
		padding: 20upx 32upx;
		/* background: #F7F7F7; */
		margin-bottom: 30upx;
		border: 1upx solid #F7F7F7;
	}

	.la-title {
		color: #666666;
		display: inline-block;
	}

	.uni-input {
		display: inline-block;
		background-color: #F7F7F7;
	}

	.inputbox {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 15upx 0;
	}

	.noneDetailText {
		text-align: center;
	}

	/* 加载 */
	.loading-icon {
		width: 80upx;
		height: 80upx;
		display: block;
		margin: 150upx auto;
	}
</style>
