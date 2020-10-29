<template>
	<view class="nui-details">
		<!-- 出差 -->
		<view class="detail-box" v-if="flag=='0'">
			<text class="detail-text"><span>申请人：</span>{{user.userName}}</text>
			<text><span>所属部门：</span>{{(user.dept?user.dept:{}).deptName}}</text>
			<text class="detail-text"><span>出差起始日期：</span>{{options.applyTimeFrom}}</text>
			<text class="detail-text"><span>出差结束日期：</span>{{options.applyTimeTo}}</text>
			<text class="detail-text"><span>出差天数：</span>{{options.applyDays}}</text>
			<text class="detail-text"><span>出差原因：</span>{{options.applyReason}}</text>
			<text class="detail-text"><span>是否公司购票：</span>{{getDictV(sys_yes_no,options.isCompanyTicket)}}</text>
			<text class="detail-text"><span>是否借款：</span>{{getDictV(sys_yes_no,options.isBorrowMoney)}}</text>
			<text class="detail-text"><span>乘坐交通工具：</span>{{getDictV(oa_travel_tool,options.vehicle)}}</text>
			<text class="detail-text"><span>预算：</span>{{options.budget}}</text>
			<text class="detail-text"><span>出差目的地：</span>{{options.travelDestination}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
		</view>
		<!-- 请假 -->
		<view class="detail-box" v-if="flag=='1'||flag=='11'">
			<text class="detail-text"><span>申请人：</span>{{user.userName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{(user.dept?user.dept:{}).deptName}}</text>
			<text class="detail-text"><span>请假起始日期：</span>{{options.applyTimeFrom}}</text>
			<text class="detail-text"><span>请假结束日期：</span>{{options.applyTimeTo}}</text>
			<text class="detail-text"><span>请假时数：</span>{{options.leaveDays}}</text>
			<text class="detail-text"><span>请假类别：</span>{{getDictV(oa_leave_type,options.leaveType)}}</text>
			<text class="detail-text"><span>剩余年假时数：</span>{{options.yearHoliday}}</text>
			<text class="detail-text"><span>请假原因：</span>{{options.leaveReason}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
		</view>
		<!-- 外出 -->
		<view class="detail-box" v-if="flag=='200'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.applyCompanyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.applyDeptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>外出起始日期：</span>{{options.goOutStart}}</text>
			<text class="detail-text"><span>预计结束日期：</span>{{options.goOutEnd}}</text>
			<text class="detail-text"><span>外出时长：</span>{{options.goOutHour}}</text>
			<text class="detail-text"><span>外出事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 补卡 -->
		<view class="detail-box" v-if="flag=='210'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.applyCompanyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.applyDeptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>补登起始日期：</span>{{options.supplyStart}}</text>
			<text class="detail-text"><span>补登结束日期：</span>{{options.supplyEnd}}</text>
			<text class="detail-text"><span>补登天数：</span>{{options.supplyDays}}</text>
			<text class="detail-text"><span>事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 加班 -->
		<view class="detail-box" v-if="flag=='220'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.applyCompanyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.applyDeptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>加班起始日期：</span>{{options.workStart}}</text>
			<text class="detail-text"><span>加班结束日期：</span>{{options.workEnd}}</text>
			<text class="detail-text"><span>加班时长：</span>{{options.workHour}}</text>
			<text class="detail-text"><span>加班事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
		</view>
		<!-- 报销 -->
		<view class="detail-box" v-if="flag=='3'||flag=='GC-9'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>项目：</span>{{options.title}}</text>
			<text class="detail-text"><span>报销金额：</span>{{options.money}}</text>
			<text class="detail-text"><span>金额大写：</span>{{options.moneyUpcase}}</text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">报销明细</view>
				<view v-if="reimDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in reimDetail" :key="index1" class="borrowitem">
						<view>报销事由：{{item.reimbursementReason}}</view>
						<view>报销类型：{{getDictV(remitypes,item.reimbursementType)}}</view>
						<view>报销金额：{{item.money}}</view>
						<view>实际金额：{{item.actualMoney}}</view>
						<view>原因：{{item.remark}}</view>
						<view>关联其他模块：{{getDictV(remiLinks,item.relationType)}}</view>
						<view>关联其他模块表单：{{item.relationId}}</view>
					</view>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">扣款明细</view>
				<view v-if="borrowLists.length!=0" class="borrowBox">
					<view v-for="(item,index2) in borrowLists" :key="index2" class="borrowitem">
						<view>审批人：{{item.userName}}</view>
						<view>扣款事由：{{item.reason}}</view>
						<view>扣款金额：{{item.money}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 采购 -->
		<view class="detail-box" v-if="flag=='2'||flag=='21'||flag=='23'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text" v-if="options.dept"><span>所属部门：</span>{{options.dept.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>标题：</span>{{options.title}}</text>
			<text class="detail-text"><span>申购事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>申请类别：</span>{{getDictV(purchaseType,options.type)}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<view class="borrow">
				<view class="borrowtitle">物资明细</view>
				<view v-if="purchaseDetail.length!=0" class="borrowBox">
					<view v-for="(item,index) in purchaseDetail" :key="index" class="borrowitem">
						<view>物资名称：{{item.goodsName}}</view>
						<view>数量：{{item.num}} 单位：{{item.unit}} 单价：{{item.price}} 规格型号：{{item.brand}}</view>
						<view>使用时间：{{item.useTime}}</view>
						<view>备注：{{item.remark}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 用印 -->
		<view class="detail-box" v-if="flag=='5'||flag=='51'||flag=='52'||flag=='53'||flag=='54'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>操作类型：</span>{{getDictV(optType,options.optType)}}</text>
			<text class="detail-text"><span>印章名称：</span>{{options.sealName}}</text>
			<text class="detail-text"><span>印章类型：</span>{{getDictV(sealType,options.type)}}</text>
			<text class="detail-text"><span>申请事由：</span>{{options.reason}}</text>
			<view v-show="options.optType=='0'">
				<text class="detail-text"><span>刻制印章规格：</span>{{options.stampSpec}}</text>
				<text class="detail-text"><span>印章刻制材料：</span>{{options.stampMaterial}}</text>
			</view>
			<view v-show="options.optType!='0'&&options.optType!='5'">
				<text class="detail-text"><span>文件数量：</span>{{options.fileNum}}</text>
				<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
					<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
						<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
						<text class="text file-text">{{file.fileName}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 用车 -->
		<view class="detail-box" v-if="flag=='4'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>出发时间：</span>{{options.applyTimeFrom}}</text>
			<text class="detail-text"><span>返回时间：</span>{{options.applyTimeTo}}</text>
			<text class="detail-text"><span>用车时长：</span>{{options.carUsed}}</text>
			<text class="detail-text"><span>驾驶员信息：</span>{{options.driverInfo}}</text>
			<text class="detail-text"><span>乘客信息：</span>{{options.passengerInfo}}</text>
			<text class="detail-text"><span>乘车地点：</span>{{options.ridePlace}}</text>
			<text class="detail-text"><span>用车事由：</span>{{options.applyReason}}</text>
			<text class="detail-text"><span>目的地：</span>{{options.destination}}</text>
			<text class="detail-text"><span>里程开始数：</span>{{options.mileageStart}}</text>
			<text class="detail-text"><span>里程终止数：</span>{{options.mileageEnd}}</text>
			<text class="detail-text"><span>行驶里程数：</span>{{options.mileage}}</text>
			<text class="detail-text"><span>指定司机：</span>{{options.designatedDriver}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>

		</view>
		<!-- 银行保函 -->
		<view class="detail-box" v-if="flag=='180'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text" v-if="options.dept"><span>所属部门：</span>{{options.dept.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>关联模块：</span>{{getDictV(bankGuaLinks,options.relaType)}}</text>
			<text class="detail-text" v-if="options.relaType=='1'"><span>工程合同：</span>{{options.contractName}}</text>
			<text class="detail-text" v-if="options.relaType=='2'"><span>项目：</span>{{options.projectName}}</text>
			<text class="detail-text" v-if="options.relaType=='3'"><span>申请单：</span>{{options.tenderName}}</text>
			<text class="detail-text"><span>开具有效期：</span>{{options.expectDate}}</text>
			<text class="detail-text"><span>保函开具金额：</span>{{options.amount}}</text>
			<text class="detail-text"><span>保函金额大写：</span>{{options.amountUpcase}}</text>
			<text class="detail-text"><span>保函类型：</span>{{getDictV(bankGuaType,options.guaranteeType)}}</text>
			<text class="detail-text"><span>保函开具押金：</span>{{options.deposit}}</text>
			<text class="detail-text"><span>是否注销：</span>{{getDictV(sys_yes_no,options.logoutStatus)}}</text>
			<text class="detail-text"><span>项目性质：</span>{{getDictV(projectType,options.projectType)}}</text>
			<text class="detail-text"><span>最迟拿到时间：</span>{{options.latestDate}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 保证金 -->
		<view class="detail-box" v-if="flag=='140'||flag=='145'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>转账方式：</span>{{getDictV(transferMethod,options.transferMethod)}}</text>
			<text class="detail-text"><span>关联收款单：</span>{{options.receiptCode}}</text>
			<text class="detail-text"><span>工程名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>投标方式：</span>{{getDictV(projectType,options.tenderType)}}</text>
			<text class="detail-text"><span>到账截止时间：</span>{{options.endArrivalTime}}</text>
			<text class="detail-text"><span>保证金总金额：</span>{{options.marginTotalMoney}}</text>
			<text class="detail-text"><span>保证金总金额（大写）：</span>{{options.totalMoneyUpcase}}</text>
			<text class="detail-text"><span>转账说明：</span>{{options.transferDesc}}</text>
			<text class="detail-text"><span>款项来源人：</span>{{options.sourceOfPayment}}</text>
			<text class="detail-text"><span>收款人：</span>{{options.collectOfPayment}}</text>
			<text class="detail-text"><span>来源人账号：</span>{{options.sourceOfAccount}}</text>
			<text class="detail-text"><span>收款人账号：</span>{{options.collectOfAccount}}</text>
			<text class="detail-text"><span>来源人开户行：</span>{{options.sourceOpenBank}}</text>
			<text class="detail-text"><span>收款开户行：</span>{{options.collectOpenBank}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 借款申请 -->
		<view class="detail-box" v-if="flag=='150'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>借款类型：</span>{{getDictV(borrowType,options.borrowType)}}</text>
			<text class="detail-text"><span>收款账号：</span>{{options.receiveAccount}}</text>
			<text class="detail-text"><span>预计归还时间：</span>{{options.preBackDate}}</text>
			<text class="detail-text"><span>借款事由：</span>{{options.borrowReason}}</text>
			<text class="detail-text"><span>借款金额：</span>{{options.borrowAmount}}</text>
			<text class="detail-text"><span>借款金额（大写）：</span>{{options.amountUpcase}}</text>
			<text class="detail-text"><span>起息日：</span>{{options.interestDate}}</text>
			<text class="detail-text"><span>利率：</span>{{options.rate}}</text>
			<text class="detail-text"><span>收款方式：</span>{{getDictV(receiptWay,options.receiptWay)}}</text>
			<text class="detail-text"><span>已收利息：</span>{{options.alreadyReceiptInterest}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>

		</view>
		<!-- 利息申请 -->
		<view class="detail-box" v-if="flag=='280'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>借款类型：</span>{{getDictV(borrowType,options.borrowType)}}</text>
			<text class="detail-text"><span>借款金额：</span>{{options.borrowAmount}}</text>
			<text class="detail-text"><span>借款金额（大写）：</span>{{options.amountUpcase}}</text>
			<text class="detail-text"><span>利息所属期：</span>{{options.interestPeriod}}</text>
			<text class="detail-text"><span>应收利息：</span>{{options.interestPeriod}}</text>
			<text class="detail-text"><span>利率：</span>{{options.rate}}</text>
			<text class="detail-text"><span>收款方式：</span>{{getDictV(receiptWay,options.receiptWay)}}</text>
			<text class="detail-text"><span>已收利息：</span>{{options.alreadyReceiptInterest}}</text>
			<text class="detail-text"><span>收款日期：</span>{{options.receiptDate}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 还款申请 -->
		<view class="detail-box" v-if="flag=='290'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>借款类型：</span>{{getDictV(borrowType,options.borrowType)}}</text>
			<text class="detail-text"><span>借款金额：</span>{{options.borrowAmount}}</text>
			<text class="detail-text"><span>借款金额（大写）：</span>{{options.amountUpcase}}</text>
			<text class="detail-text"><span>还款日期：</span>{{options.refundDate}}</text>
			<text class="detail-text"><span>未归还金额：</span>{{options.outstandAmount}}</text>
			<text class="detail-text"><span>还款金额：</span>{{options.refundAmount}}</text>
			<text class="detail-text"><span>还款金额大写：</span>{{options.refundAmountUpcase}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 收款申请 -->
		<view class="detail-box" v-if="flag=='160'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>收款事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>收款日期：</span>{{options.receivablesDate}}</text>
			<text class="detail-text"><span>收款金额：</span>{{options.money}}</text>
			<text class="detail-text"><span>收款金额（大写）：</span>{{options.moneyUpcase}}</text>
			<text class="detail-text"><span>款项来源人：</span>{{options.payee}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">收款明细</view>
				<view v-if="receiDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in receiDetail" :key="index1" class="borrowitem">
						<view>收款类型：{{getDictV(receivableType,item.receivableType)}}</view>
						<view>收款金额：{{item.receivableCost}}</view>
						<view>备注：{{item.remark}}</view>
					</view>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">冲抵借款</view>
				<view v-if="borroDetail.length!=0" class="borrowBox">
					<view v-for="(item,index2) in borroDetail" :key="index2" class="borrowitem">
						<view>借款编号：{{item.code}}</view>
						<view>借款用途：{{item.borrowReason}}</view>
						<view>借款金额：{{item.borrowAmount}}</view>
						<view>冲抵金额：{{item.offsetAmount}}</view>
						<view>剩余可冲抵金额：{{item.borrowMoney}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 付款申请 -->
		<view class="detail-box" v-if="flag=='170'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>支付日期：</span>{{options.payDate}}</text>
			<text class="detail-text"><span>付款金额：</span>{{options.money}}</text>
			<text class="detail-text"><span>付款金额（大写）：</span>{{options.moneyUpcase}}</text>
			<text class="detail-text"><span>付款方式：</span>{{getDictV(payType,options.payType)}}</text>
			<text class="detail-text"><span>到账截止日期：</span>{{options.expirationDate}}</text>
			<text class="detail-text"><span>是否代收代付：</span>{{getDictV(sys_yes_no,options.isAgent)}}</text>
			<text class="detail-text"><span>关联收款：</span>{{options.receivablesName}}</text>
			<text class="detail-text"><span>是否委托关联公司代付：</span>{{getDictV(sys_yes_no,options.companyPay)}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>实际付款金额：</span>{{options.actualMoney}}</text>
			<text class="detail-text"><span>实际付款金额大写：</span>{{options.actualMoneyUpcase}}</text>
			<text class="detail-text"><span>关联公司：</span>{{options.company}}</text>
			<text class="detail-text"><span>金额：</span>{{options.companyPayMoney}}</text>
			<text class="detail-text"><span>关联公司：</span>{{options.company}}</text>
			<text class="detail-text"><span>关联公司账号：</span>{{options.companyAccount}}</text>
			<text class="detail-text"><span>关联公司开户行：</span>{{options.companyOpenBank}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">付款明细</view>
				<view v-if="payDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in payDetail" :key="index1" class="borrowitem">
						<view>付款类型：{{getDictV(payType,item.payType)}}</view>
						<view>付款事由：{{item.paymentReason}}</view>
						<view>付款金额：{{item.money}}</view>
						<view>收款人：{{item.payee}}</view>
						<view>收款人账号：{{item.payeeAccount}}</view>
						<view>收款人开户行：{{item.payeeOpenBank}}</view>
						<view>付款方：{{item.drawee}}</view>
						<view>关联发票：{{getDictV(relationBillType,item.relationBillType)}}</view>
						<view>欠票金额：{{item.oweBillMoney}}</view>
						<view>收票截止日期：{{item.billExpirationDate}}</view>
						<view>发票：{{item.relationBillName}}</view>
						<view>关联合同：{{getDictV(relationContractType,item.relationContractType)}}</view>
						<view>欠合同金额：{{item.oweContractMoney}}</view>
						<view>补合同截止日期：{{item.contractExpirationDate}}</view>
						<view>合同：{{item.relationContractName}}</view>
						<view>实际付款金额：<text class="red">{{item.actualMoney}}</text></view>
						<view>原因：<text class="red">{{item.reason}}</text></view>
					</view>
				</view>
			</view>
			<!-- <view class="borrow">
				<view class="borrowtitle">扣款明细</view>
				<view v-if="cutDetail.length!=0" class="borrowBox">
					<view v-for="(item,index2) in cutDetail" :key="index2" class="borrowitem">
						<view>审批人：{{item.userName}}</view>
						<view>扣款事由：{{item.reason}}</view>
						<view>扣款金额：{{item.money}}</view>
					</view>
				</view>
			</view> -->
		</view>
		<!-- 银行账户 -->
		<view class="detail-box" v-if="flag=='190'">
			<text class="detail-text"><span>类型：</span>{{getDictV(bankType,options.type)}}</text>
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>账户类型：</span>{{getDictV(accountType,options.accountType)}}</text>
			<text class="detail-text"><span>印鉴保管人：</span>{{options.keeper}}</text>
			<text class="detail-text"><span>开户所在地：</span>{{options.area}}</text>
			<text class="detail-text"><span>开户所在银行：</span>{{options.bankName}}</text>
			<text class="detail-text"><span>开户理由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>营业执照取得时间：</span>{{options.licenseTime}}</text>
			<text class="detail-text"><span>账户预留印鉴：</span>{{options.reserveSeal}}</text>
			<text class="detail-text"><span>项目部联系人：</span>{{options.projectDeptLinkman}}</text>
			<text class="detail-text"><span>项目部联系电话：</span>{{options.projectDeptPhone}}</text>
			<text class="detail-text"><span>业主是否指定银行：</span>{{getDictV(sys_yes_no,options.projectDeptAppoint)}}</text>
			<text class="detail-text"><span>指定银行联系电话：</span>{{options.projectDeptAppointPhone}}</text>
			<text class="detail-text"><span>银行账户名称：</span>{{options.accountName}}</text>
			<text class="detail-text"><span>银行账号：</span>{{options.accountNo}}</text>
			<text class="detail-text"><span>最迟办结时间：</span>{{options.openAccountDate}}</text>
			<text class="detail-text"><span>短信通知：</span>{{options.smsMessage}}</text>
			<text class="detail-text"><span>客户经理电话：</span>{{options.accountManagerPhone}}</text>
			<text class="detail-text" v-if="options.type=='1'"><span>销户时关联的开户：</span>{{options.openId}}</text>
			<text class="detail-text" v-if="options.type=='1'"><span>销户原因：</span>{{options.reason}}</text>
			<text class="detail-text"><span>对账方式：</span>{{getDictV(accountCheckingType,options.accountCheckingType)}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>开户材料：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 车辆维修 -->
		<view class="detail-box" v-if="flag=='41'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<!-- <text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text> -->
			<!-- <text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text> -->
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>车牌号：</span>{{options.carNo}}</text>
			<text class="detail-text"><span>上次维修日期：</span>{{options.lastRepairDate}}</text>
			<text class="detail-text"><span>维修地点：</span>{{options.repairLocation}}</text>
			<text class="detail-text"><span>维修类型：</span>{{getDictV(repairType,options.repairType)}}</text>
			<text class="detail-text"><span>情况说明：</span>{{options.situationDesc}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<view class="borrow">
				<view class="borrowtitle">维修明细</view>
				<view v-if="repairDetail.length!=0" class="borrowBox">
					<view v-for="(item,index) in repairDetail" :key="index" class="borrowitem">
						<view>维修保养项目：{{item.repairItem}}</view>
						<view>预算：{{item.preMoney}}</view>
						<view>备注：{{item.remark}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 物资领用 -->
		<view class="detail-box" v-if="flag=='22'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.deptName}}</text>
			<!-- <text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text> -->
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>物资类型：</span>{{getDictV(goodsType,options.goodsType)}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">物资明细</view>
				<view v-if="goosDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in goosDetail" :key="index1" class="borrowitem">
						<view>物资类型：{{getDictV(goodsType,options.goodsType)}}</view>
						<view>物资名称：{{item.goodsName}}</view>
						<view>物资数量：{{item.totalStock}}</view>
						<view>领用数量：{{item.useStock}}</view>
						<view>单位：{{item.unit}}</view>
						<view>单价：{{item.price}}</view>
						<view>规格型号：{{item.brand}}</view>
						<view>入库日期：{{item.inDate}}</view>
						<view>备注：{{item.remark}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 会议申请 -->
		<view class="detail-box" v-if="flag=='250'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.applyCompanyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.applyDeptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>会议开始时间：</span>{{options.meetTimeStart}}</text>
			<text class="detail-text"><span>会议结束时间：</span>{{options.meetTimeEnd}}</text>
			<text class="detail-text"><span>会议地点：</span>{{getDictV(meetArea,options.meetArea)}}</text>
			<text class="detail-text"><span>使用设备：</span>{{getDictVs(useMachine,options.useMachine)}}</text>
			<text class="detail-text"><span>抄送人：</span>{{options.copyPerson}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>会议原因或内容：</span>{{options.reason}}</text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">参加培训人员</view>
				<view v-if="meetingDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in meetingDetail" :key="index1" class="borrowitem">
						<view>学员姓名：{{item.userName}}</view>
						<view>职位：{{item.userPosition}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 信息发布 -->
		<view class="detail-box" v-if="flag=='6'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text" v-if="options.dept"><span>所属部门：</span>{{options.dept.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>缓急等级：</span>{{getDictV(urgencyGrade,options.urgencyGrade)}}</text>
			<text class="detail-text"><span>秘密等级：</span>{{getDictVs(infoType,options.secretGrade)}}</text>
			<text class="detail-text"><span>类别：</span>{{getDictVs(secretGrade,options.type)}}</text>
			<text class="detail-text"><span>标题：</span>{{options.title}}</text>
			<view>
				<text class="detail-text"><span>内容：</span></text>
				<view class="text-box">{{options.remark}}</view>
			</view>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">查收部门</view>
				<view v-if="infoDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in infoDetail" :key="index1" class="borrowitem">
						<view>部门名称：{{item.deptName}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 员工培训 培训报告-->
		<view class="detail-box" v-if="flag=='230'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.applyCompanyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.applyDeptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>培训开始时间：</span>{{options.trainTimeStart}}</text>
			<text class="detail-text"><span>培训结束时间：</span>{{options.trainTimeEnd}}</text>
			<text class="detail-text"><span>培训地点：</span>{{options.trainArea}}</text>
			<text class="detail-text"><span>培训机构：</span>{{options.trainOrg}}</text>
			<text class="detail-text"><span>培训类别：</span>{{options.trainType}}</text>
			<text class="detail-text"><span>事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>标题：</span>{{options.title}}</text>
			<view>
				<text class="detail-text"><span>培训内容：</span></text>
				<view class="text-box">{{options.trainContent}}</view>
			</view>
		</view>
		<!-- 部门培训  培训申请-->
		<view class="detail-box" v-if="flag=='240'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.applyCompanyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.applyDeptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>培训开始时间：</span>{{options.trainTimeStart}}</text>
			<text class="detail-text"><span>培训结束时间：</span>{{options.trainTimeEnd}}</text>
			<text class="detail-text"><span>培训地点：</span>{{options.trainArea}}</text>
			<text class="detail-text"><span>培训机构：</span>{{options.trainOrg}}</text>
			<text class="detail-text"><span>培训类别：</span>{{options.trainType}}</text>
			<text class="detail-text"><span>课程费用：</span>{{options.courseFee}}</text>
			<text class="detail-text"><span>考试费用：</span>{{options.courseFee}}</text>
			<text class="detail-text"><span>往返交通费：</span>{{options.trafficFee}}</text>
			<text class="detail-text"><span>酒店住宿费：</span>{{options.roomFee}}</text>
			<text class="detail-text"><span>其他费用：</span>{{options.otherFee}}</text>
			<text class="detail-text"><span>总计费用：</span>{{options.totalFee}}</text>
			<text class="detail-text"><span>人均费用：</span>{{options.personFee}}</text>
			<text class="detail-text"><span>费用承担：</span>{{options.feeBear}}</text>
			<text class="detail-text"><span>合同期限：</span>{{options.contractTerm}}</text>
			<text class="detail-text"><span>合同状况：</span>{{options.contractSign}}</text>
			<text class="detail-text"><span>培训事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>培训课题：</span>{{options.title}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<view>
				<text class="detail-text"><span>培训内容：</span></text>
				<view class="text-box">{{options.trainContent}}</view>
			</view>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">学员名单</view>
				<view v-if="trainDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in trainDetail" :key="index1" class="borrowitem">
						<view>学员姓名：{{item.userName}}</view>
						<view>职位：{{item.userPosition}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 成本票 进项-->
		<view class="detail-box" v-if="flag=='GC-15'||flag=='GC-16'||flag=='GC-17'">
			<text class="detail-text"><span>申请人：</span>{{options.proposerName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>关联工程：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>开票类型：</span>{{getDictV(payWay,options.billType)}}</text>
			<text class="detail-text"><span>不含税开票金额：</span>{{options.invoiceTaxAmount}}</text>
			<text class="detail-text"><span>税额：</span>{{options.taxAmount}}</text>
			<text class="detail-text detail-text1">销售方信息</text>
			<text class="detail-text"><span>销售公司名称：</span>{{options.saleCompanyName}}</text>
			<text class="detail-text"><span>付款方式：</span>{{getDictV(payWay,options.payWay)}}</text>
			<text class="detail-text"><span>纳税人识别号：</span>{{options.taxpayerId}}</text>
			<text class="detail-text"><span>销售方地址：</span>{{options.saleLocation}}</text>
			<text class="detail-text"><span>是否签字：</span>{{getDictV(sys_yes_no,options.signed)}}</text>
			<text class="detail-text"><span>销售方电话：</span>{{options.salePhone}}</text>
			<text class="detail-text"><span>开户行：</span>{{options.bankName}}</text>
			<text class="detail-text"><span>银行账号：</span>{{options.bankAccount}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<view class="borrow">
				<view class="borrowtitle">发票明细</view>
				<view v-if="costDetail.length!=0" class="borrowBox">
					<view v-for="(item,index) in costDetail" :key="index" class="borrowitem">
						<view>发票号码：{{item.billCode}}</view>
						<view>开票日期：{{item.billDate}}</view>
						<view>发票内容：{{item.billText}}</view>
						<view>发票金额：{{item.billAmount}}</view>
						<view>税额：{{item.tax}}</view>
						<view>关联合同id：{{item.contractId}}</view>
						<view>关联其他模块：</view>
						<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
							<view v-for="(file,index1) in item.attachmentList" :key="index1" style="width: 280upx;padding: 0 10px;" class="uni-center">
								<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
								<text class="text file-text">{{file.fileName}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 工程发票 销项-->
		<view class="detail-box" v-if="flag=='GC-18'||flag=='GC-19'||flag=='GC-20'">
			<text class="detail-text"><span>申请人：</span>{{options.proposerName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyDate}}</text>
			<text class="detail-text"><span>关联工程：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>工程地点：</span>{{options.projectLoc}}</text>
			<text class="detail-text"><span>建设单位：</span>{{options.constructUnit}}</text>
			<text class="detail-text"><span>开票类型：</span>{{getDictV(billType,options.constructUnit)}}</text>
			<text class="detail-text"><span>开票金额：</span>{{options.billAmount}}</text>
			<text class="detail-text"><span>税率：</span>{{options.taxRate}}</text>
			<text class="detail-text"><span>不含税开票金额：</span>{{options.invoiceTaxAmount}}</text>
			<text class="detail-text"><span>税额：</span>{{options.taxAmount}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text detail-text1">开票信息</text>
			<text class="detail-text"><span>开票公司名称：</span>{{options.billCompanyName}}</text>
			<text class="detail-text"><span>纳税人识别号：</span>{{options.taxpayerId}}</text>
			<text class="detail-text"><span>纳税人识别号：</span>{{options.taxpayerId}}</text>
			<text class="detail-text"><span>地址：</span>{{options.billLoc}}</text>
			<text class="detail-text"><span>电话：</span>{{options.billPhone}}</text>
			<text class="detail-text"><span>开户行：</span>{{options.bankName}}</text>
			<text class="detail-text"><span>银行账号：</span>{{options.bankAccount}}</text>
			<text class="detail-text"><span>发票领取方式：</span>{{getDictV(invoiceTakeWay,options.invoiceTakeWay)}}</text>
			<text class="detail-text" v-if="options.invoiceTakeWay=='1'"><span>收件人：</span>{{options.receiver}}</text>
			<text class="detail-text" v-if="options.invoiceTakeWay=='1'"><span>地址：</span>{{options.sendLoc}}</text>
			<text class="detail-text" v-if="options.invoiceTakeWay=='1'"><span>电话：</span>{{options.sendPhone}}</text>
			<text class="detail-text" v-if="options.invoiceTakeWay=='1'"><span>付款方式：</span>{{getDictV(freight,options.freight)}}</text>
			<view class="borrow">
				<view class="borrowtitle">缴税记录</view>
				<view v-if="invoiceDetail.length!=0" class="borrowBox">
					<view v-for="(item,index) in invoiceDetail" :key="index" class="borrowitem">
						<view>发票号码：{{item.code}}</view>
						<view>申请日期：{{item.applyTime}}</view>
						<view>税额总计：{{item.totalTax}}</view>
						<view>销售金额：{{item.billAmount}}</view>
						<view>已开票金额：{{item.invoicedAmount}}</view>
						<view>本次开票金额：{{item.billAmount}}</view>
						<view>剩余开票金额：{{item.restBillAmount}}</view>
					</view>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">发票明细</view>
				<view v-if="invoiceBillDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in invoiceBillDetail" :key="index1" class="borrowitem">
						<view>发票号码：{{item.billCode}}</view>
						<view>开票日期：{{item.billDate}}</view>
						<view>发票金额：{{item.billAmount}}</view>
						<view>税额：{{item.taxAmount}}</view>
						<view>价税合计：{{parseFloat(item.billAmount) +parseFloat(item.taxAmount)}}</view>
						<view>关联其他模块：</view>
						<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
							<view v-for="(file,index2) in item.attachmentList" :key="index2" style="width: 280upx;padding: 0 10px;" class="uni-center">
								<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
								<text class="text">{{file.fileName}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 工程 采购 -->
		<view class="detail-box" v-if="flag=='GC-25'">
			<text class="detail-text"><span>申请人：</span>{{options.proposerName}}</text>
			<!-- <text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text> -->
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>标题：</span>{{options.title}}</text>
			<text class="detail-text"><span>工程名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>采购类型：</span>{{getDictV(sysPurchaseType,options.purchaseType)}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<view class="borrow">
				<view class="borrowtitle">物资明细</view>
				<view v-if="sysProPurchaseDetail.length!=0" class="borrowBox">
					<view v-for="(item,index) in sysProPurchaseDetail" :key="index" class="borrowitem">
						<view>物资名称：{{item.goodsName}}</view>
						<view>数量：{{item.num}} 单位：{{item.unit}} 单价：{{item.price}} 规格型号：{{item.brand}}</view>
						<view>使用时间：{{item.useTime}}</view>
						<view>备注：{{item.remark}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 工程 付款申请 -->
		<view class="detail-box" v-if="flag=='GC-1'||flag=='GC-11'||flag=='GC-12'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>申请类型：</span>{{getDictV(payTypePro,options.payType)}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.proName}}</text>
			<text class="detail-text"><span>支付日期：</span>{{options.paymentDate}}</text>
			<text class="detail-text"><span>支出总金额：</span>{{options.amount}}</text>
			<text class="detail-text"><span>金额大写：</span>{{options.moneyUpper}}</text>
			<text class="detail-text"><span>付款事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">付款明细</view>
				<view v-if="payDetailPro.length!=0" class="borrowBox">
					<view v-for="(item,index1) in payDetailPro" :key="index1" class="borrowitem">
						<view>合同id：{{item.contractId}}</view>
						<view>发票id：{{item.billId}}</view>
						<view>合同类型：{{item.contractType}}</view>
						<view>发票类型：{{item.billType}}</view>
						<view>付款金额：{{item.amount}}</view>
						<view>收款人：{{item.receivePerson}}</view>
						<view>收款人账号：{{item.receivePersonAccount}}</view>
						<view>收款人开户行：{{item.receivePersonOpenBank}}</view>
						<view>工程大类：{{item.proCategory}}</view>
						<view>工程小类：{{item.detailCategory}}</view>
						<view>付款事由：{{item.reason}}</view>
						<view>备注：{{item.remark}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 工程 扣款申请 -->
		<view class="detail-box" v-if="flag=='GC-3'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>扣款类型：</span>{{getDictV(debitType,options.type)}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.proName}}</text>
			<text class="detail-text"><span>扣款总金额：</span>{{options.amount}}</text>
			<text class="detail-text"><span>金额大写：</span>{{options.moneyUpper}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">发票明细</view>
				<view v-if="payDetailPro.length!=0" class="borrowBox">
					<view v-for="(item,index1) in payDetailPro" :key="index1" class="borrowitem">
						<view>款项类别：{{getDictV(debitBillType,item.billType)}}</view>
						<view>款项小类：{{item.detailType}}</view>
						<view>扣款金额：{{item.amount}}</view>
						<view>扣款事由：{{item.reason}}</view>
						<view>备注：{{item.remark}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 工程 收款申请 -->
		<view class="detail-box" v-if="flag=='GC-2'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>扣款类型：</span>{{getDictV(paymentTypePro,options.paymentType)}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.proName}}</text>
			<text class="detail-text"><span>款项用途：</span>{{options.moneyPurpost}}</text>
			<text class="detail-text"><span>交款日期：</span>{{options.paymentDate}}</text>
			<text class="detail-text"><span>交款人：</span>{{options.paymentPeople}}</text>
			<text class="detail-text"><span>收款金额：</span>{{options.amount}}</text>
			<text class="detail-text"><span>金额大写：</span>{{options.moneyUpper}}</text>
			<text class="detail-text"><span>收款事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<hr>
			<text class="detail-text">款项来源人</text>
			<text class="detail-text"><span>款项来源人：</span>{{options.moneySourcePeople}}</text>
			<text class="detail-text"><span>款项来源人账号：</span>{{options.moneySourceAccount}}</text>
			<text class="detail-text"><span>款项来源人开户行：</span>{{options.meoneySourceOpenBank}}</text>
			<text class="detail-text">收款人</text>
			<text class="detail-text"><span>收款人：</span>{{options.moneyEndPeople}}</text>
			<text class="detail-text"><span>收款人账号：</span>{{options.moneyEndAccount}}</text>
			<text class="detail-text"><span>收款人开户行：</span>{{options.meoneyEndOpenBank}}</text>
			<hr>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 工程 物资领用申请 -->
		<view class="detail-box" v-if="flag=='GC-24'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<!-- <text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text> -->
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>物资类型：</span>{{getDictV(goodsTypePro,options.goodsType)}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.proName}}</text>
			<text class="detail-text"><span>关联合同：</span>{{options.contractName}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">领用物资</view>
				<view v-if="goosDetailPro.length!=0" class="borrowBox">
					<view v-for="(item,index1) in goosDetailPro" :key="index1" class="borrowitem">
						<view>物资类型：{{getDictV(goodsTypePro,item.goodsTypePro)}}</view>
						<view>物资名称：{{item.goodsName}}</view>
						<view>物资数量：{{item.totalStock}}</view>
						<view>领用数量：{{item.useStock}}</view>
						<view>单位：{{item.unit}}/单价：{{item.price}}/规格型号：{{item.brand}}</view>
						<view>入库日期：{{item.inDate}}</view>
						<view>备注：{{item.remark}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 证件转出注销 -->
		<view class="detail-box" v-if="flag=='130'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.applyCompanyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.applyDeptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>办理类型：</span>{{getDictV(handleType,options.handleType)}}</text>
			<text class="detail-text"><span>是否会转回：</span>{{getDictV(sys_yes_no,options.canRotation)}}</text>
			<text class="detail-text"><span>接收单位：</span>{{options.receiveCompany}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">证件明细</view>
				<view v-if="logoutDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in logoutDetail" :key="index1" class="borrowitem">
						<view>证件名称：{{item.name}}</view>
						<view>证件编号：{{item.code}}</view>
						<view>发证日期：{{item.holdDate}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 证件调配 -->
		<view class="detail-box" v-if="flag=='120'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.applyCompanyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.applyDeptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>投标申请单：</span>{{options.tenderName}}</text>
			<text class="detail-text"><span>所属项目：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>调证开始日期：</span>{{options.transferStartDate}}</text>
			<text class="detail-text"><span>调证事由：</span>{{options.transferReason}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="borrow">
				<view class="borrowtitle">证件明细</view>
				<view v-if="transferDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in transferDetail" :key="index1" class="borrowitem">
						<view>证件名称：{{item.name}}</view>
						<view>证件编号：{{item.code}}</view>
						<view>发证日期：{{item.holdDate}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 借证申请 -->
		<view class="detail-box" v-if="flag=='100'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.applyCompanyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.applyDeptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>投标申请单：</span>{{options.tenderName}}</text>
			<text class="detail-text"><span>所属项目：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>预计归还日期：</span>{{options.preBackTime}}</text>
			<text class="detail-text"><span>借证事由：</span>{{options.borrowReason}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="borrow">
				<view class="borrowtitle">证件明细</view>
				<view v-if="certBorrowDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in certBorrowDetail" :key="index1" class="borrowitem">
						<view>证件名称：{{item.name}}</view>
						<view>证件编号：{{item.code}}</view>
						<view>发证日期：{{item.holdDate}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 还证申请 -->
		<view class="detail-box" v-if="flag=='110'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.applyCompanyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.applyDeptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>快递单号：</span>{{options.courierNumber}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<view class="borrow">
				<view class="borrowtitle">证件明细</view>
				<view v-if="certBackDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in certBackDetail" :key="index1" class="borrowitem">
						<view>证件名称：{{item.name}}</view>
						<view>证件编号：{{item.code}}</view>
						<view>发证日期：{{item.holdDate}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 预缴税金 -->
		<view class="detail-box" v-if="flag=='GC-6'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>工程名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>报验证：</span>{{options.crossCertificeId}}</text>
			<text class="detail-text"><span>税额总计：</span>{{options.totalTax}}</text>
			<text class="detail-text"><span>税务机关：</span>{{options.taxationBureau}}</text>
			<text class="detail-text"><span>销售金额：</span>{{options.salesAmount}}</text>
			<text class="detail-text"><span>税票数量：</span>{{options.taxReceiptNum}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">税额明细</view>
				<view v-if="taxDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in taxDetail" :key="index1" class="borrowitem">
						<view>税种：{{getDictV(taxType,item.taxType)}}</view>
						<view>税率：{{item.taxRate}}</view>
						<view>税额：{{item.taxAmount}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 借业绩 还业绩-->
		<view class="detail-box" v-if="flag=='GC-7'||flag=='GC-8'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>工程名称：</span>{{options.proName}}</text>
			<text class="detail-text"><span>还业绩审批状态：</span>{{options.performaceStatus}}</text>
			<text class="detail-text"><span>预计归还日期：</span>{{options.expectBackDate}}</text>
			<text class="detail-text"><span>借业绩事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>证明材料：</span>{{options.prove}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 项目保修金-->
		<view class="detail-box" v-if="flag=='GC-22'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>工程名称：</span>{{options.proName}}</text>
			<text class="detail-text"><span>预计有效期至：</span>{{options.expectValidityDate}}</text>
			<text class="detail-text"><span>工程所在地：</span>{{options.projectLoc}}</text>
			<text class="detail-text"><span>开具金额：</span>{{options.amount}}</text>
			<text class="detail-text"><span>开具金额大写：</span>{{options.moneyUpper}}</text>
			<text class="detail-text"><span>项目竣工验收日期：</span>{{options.projectCompleteDate}}</text>
			<text class="detail-text"><span>项目结算审计日期：</span>{{options.projectSettlementDate}}</text>
			<text class="detail-text"><span>项目缺陷责任期：</span>{{options.projectDefectPeriod}}</text>
			<text class="detail-text"><span>项目负责人：</span>{{options.projectManager}}</text>
			<text class="detail-text"><span>项目结算金额：</span>{{options.projectSettlementAmount}}</text>
			<text class="detail-text"><span>项目保修金额：</span>{{options.projectRepairAmount}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 施工组织方-->
		<view class="detail-box" v-if="flag=='GC-23'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>工程名称：</span>{{options.proName}}</text>
			<text class="detail-text"><span>方案名称：</span>{{options.projectPointManager}}</text>
			<text class="detail-text"><span>项目驻点负责人：</span>{{options.projectLoc}}</text>
			<text class="detail-text"><span>项目负责人：</span>{{options.projectManager}}</text>
			<text class="detail-text"><span>合作方名字：</span>{{options.partnerName}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 制度申请-->
		<view class="detail-box" v-if="flag=='260'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>制度名称：</span>{{options.rulesName}}</text>
			<text class="detail-text"><span>制度编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>版次：</span>{{options.version}}</text>
			<text class="detail-text"><span>发布部门：</span>{{options.publishDeptName}}</text>
			<text class="detail-text"><span>发布日期：</span>{{options.publishDate}}</text>
			<text class="detail-text"><span>秘密等级：</span>{{getDictV(secretLevel,options.secretLevel)}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">税额明细</view>
				<view v-if="ruleDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in ruleDetail" :key="index1" class="borrowitem">
						<view>部门名称：{{item.deptName}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 合同申请-->
		<view class="detail-box" v-if="flag=='8'">
			<h3>合同申请</h3>
			<text class="detail-text"><span>申请人：</span>{{options.applier}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>合同类型：</span>{{getDictV(oaContractType1,options.type1)}}</text>
			<text class="detail-text"><span>合同类型2：</span>{{getDictV(oaContractType2,options.type2)}}</text>
			<text class="detail-text"><span>我方单位名称：</span>{{options.ourUnitName}}</text>
			<text class="detail-text"><span>用印类型：</span>{{options.useSealType}}</text>
			<text class="detail-text"><span>合同金额：</span>{{options.contractAmount}}</text>
			<text class="detail-text"><span>合同金额大写：</span>{{options.amountUpper}}</text>
			<text class="detail-text"><span>工程名称：</span>{{options.projectName}}</text>
			<text class="detail-text" v-if="options.type1==2"><span>关联移交单：</span>{{options.winBidId}}</text>
			<text class="detail-text"><span>税率(%)：</span>{{options.rate}}</text>
			<text class="detail-text"><span>合同名称：</span>{{options.contractName}}</text>
			<text class="detail-text"><span>签约方名称：</span>{{options.signingParties}}</text>
			<text class="detail-text"><span>付款方式：</span>{{getDictV(contractPayType,options.payType)}}</text>
			<text class="detail-text"><span>合同签订日期：</span>{{options.contractTime}}</text>
			<text class="detail-text"><span>第三方名称：</span>{{options.thirdPartyName}}</text>
			<text class="detail-text"><span>第三方负责人：</span>{{options.thirdPartPerson}}</text>
			<text class="detail-text"><span>签约背景/备注说明：</span>{{options.remark}}</text>
			<text class="detail-text" v-if="options.type1==3"><span>关联工程合同名称：</span>{{options.relProjectContractName}}</text>
			<text class="detail-text" v-if="options.contractType==2"><span>补充协议附件：</span>{{options.supplementaryDoc}}</text>
			<text class="detail-text" v-if="options.contractType==2"><span>签约背景/备注说明：</span>{{options.remark2}}</text>
			<text class="detail-text"><span>合同附件：</span></text>
			<view v-if="options.contractType=='2'" class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-if="file6.length!='0'" v-for="(file,index) in file6" :key="index" style="width: 280upx;padding: 0 10px;"
				 class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view v-else class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-if="file1.length!='0'" v-for="(file,index) in file1" :key="index" style="width: 280upx;padding: 0 10px;"
				 class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>

			<text class="detail-text"><span>资质证明附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-if="file2.length!='0'" v-for="(file,index) in file2" :key="index" style="width: 280upx;padding: 0 10px;"
				 class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<text class="detail-text"><span>相关部门审核附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-if="file3.length!='0'" v-for="(file,index) in file3" :key="index" style="width: 280upx;padding: 0 10px;"
				 class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<text class="detail-text"><span>法务签发附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-if="file4.length!='0'" v-for="(file,index) in file4" :key="index" style="width: 280upx;padding: 0 10px;"
				 class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<text class="detail-text"><span>归档附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-if="file5.length!='0'" v-for="(file,index) in file5" :key="index" style="width: 280upx;padding: 0 10px;"
				 class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 投标申请-->
		<view class="detail-box" v-if="flag=='10'">
			<h3>投标申请</h3>
			<text class="detail-text"><span>申请人：</span>{{options.applier}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>投标方式：</span>{{getDictV(tenderType,options.tenderType)}}</text>
			<text class="detail-text"><span>工程类型：</span>{{getDictV(proType,options.proType)}}</text>
			<text class="detail-text"><span>投资总额：</span>{{options.investAmount}}</text>
			<text class="detail-text"><span>开标时间：</span>{{options.openTenderDate}}</text>
			<text class="detail-text"><span>建安费：</span>{{options.biddingDesignCost}}</text>
			<text class="detail-text"><span>保证金：</span>{{options.deposit}}</text>
			<text class="detail-text"><span>资质要求：</span>{{options.qualifications}}</text>
			<text class="detail-text"><span>业绩要求：</span>{{options.kpiRequire}}</text>
			<text class="detail-text"><span>评标办法：</span>{{options.evaluationMethod}}</text>
			<text class="detail-text"><span>项目规模：</span>{{options.projectScale}}</text>
			<text class="detail-text"><span>工期：</span>{{options.timeLimit}}</text>
			<text class="detail-text"><span>建设单位：</span>{{options.constructUnit}}</text>
			<text class="detail-text"><span>招标公告网址：</span>{{options.tenderDoc}}</text>
			<text class="detail-text"><span>负责人要求：</span>{{options.builderName}}</text>
			<text class="detail-text"><span>工程名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>

		</view>
		<!-- 中标项目移交单-->
		<view class="detail-box" v-if="flag=='270'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>中标公告网址：</span>{{options.winBidUrl}}</text>
			<text class="detail-text"><span>方式：</span>{{getDictV(wintype,options.type)}}</text>
			<text class="detail-text"><span>建设单位：</span>{{options.constructUnit}}</text>
			<text class="detail-text"><span>中标单位：</span>{{options.winUnit}}</text>
			<text class="detail-text"><span>中标日期：</span>{{options.winBidTime}}</text>
			<text class="detail-text"><span>建造师：</span>{{options.buildPerson}}</text>
			<text class="detail-text"><span>工程类型：</span>{{getDictV(proType,options.proType)}}</text>
			<text class="detail-text"><span>资质要求：</span>{{options.qualifications}}</text>
			<text class="detail-text"><span>中标价：</span>{{options.winBidMoney}}</text>
			<text class="detail-text"><span>工期：</span>{{options.timeLimit}}</text>
			<text class="detail-text"><span>履约担保金额：</span>{{options.performanceAmount}}</text>
			<text class="detail-text"><span>履约担保方式：</span>{{options.performanceWay}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 劳动合同续签 -->
		<view class="detail-box" v-if="flag=='370'||flag=='380'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>续签人员姓名：</span>{{options.renewalName}}</text>
			<text class="detail-text"><span>合同起始日期：</span>{{options.contractTimeFrom}}</text>
			<text class="detail-text"><span>合同结束日期：</span>{{options.contractTimeTo}}</text>
			<text class="detail-text"><span>合同续签年限从：</span>{{options.renewalTimeFrom}}</text>
			<text class="detail-text"><span>合同续签年限到：</span>{{options.renewalTimeTo}}</text>
			<text class="detail-text"><span>自我评价：</span>{{options.selfAssessment}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
		</view>
		<!-- 还印 -->
		<view class="detail-box" v-if="flag=='55'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>快递单号：</span>{{options.invoiceNum}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">还印明细</view>
				<view v-if="returnSealDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in returnSealDetail" :key="index1" class="borrowitem">
						<view>印章名称：{{item.sealName}}</view>
						<view>印章类型：{{getDictV(sealType,item.sealType)}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 借印 -->
		<view class="detail-box" v-if="flag=='340'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.createTime}}</text>
			<text class="detail-text"><span>申请事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>借印数量：</span>{{options.borrowCount}}</text>
			<text class="detail-text"><span>还印数量：</span>{{options.returnCount}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
			<text class="detail-text"><span>附件：</span></text>
			<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
				<view v-for="(file,index) in attachmentUrl" :key="index" style="width: 280upx;padding: 0 10px;" class="uni-center">
					<uni-icons type="paperclip" size="40" @tap="gotoFile(file.attachmentUrl)" />
					<text class="text file-text">{{file.fileName}}</text>
				</view>
			</view>
			<view class="borrow">
				<view class="borrowtitle">借印明细</view>
				<view v-if="borrowSealDetail.length!=0" class="borrowBox">
					<view v-for="(item,index1) in borrowSealDetail" :key="index1" class="borrowitem">
						<view>印章名称：{{item.sealName}}</view>
						<view>印章类型：{{getDictV(sealType,item.sealType)}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 收据 -->
		<view class="detail-box" v-if="flag=='GC-14'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>收款单位：</span>{{options.receiptUnit}}</text>
			<text class="detail-text"><span>摘要：</span>{{options.description}}</text>
			<text class="detail-text"><span>金额：</span>{{options.amount}}</text>
			<text class="detail-text"><span>金额大写：</span>{{options.moneyUpper}}</text>
			<text class="detail-text"><span>盖章类型：</span>{{getDictV(sealType,options.sealType)}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
		</view>
		<!-- 欠发票  核销发票 -->
		<view class="detail-box" v-if="flag=='390'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>支付单据编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>收款人（开票方）：</span>{{options.payee}}</text>
			<text class="detail-text"><span>收票方：</span>{{options.drawee}}</text>
			<text class="detail-text"><span>金额：</span>{{options.money}}</text>
			<text class="detail-text"><span>收票截止日期：</span>{{options.billExpirationDate}}</text>
			<text class="detail-text"><span>关联发票：</span>{{options.costBillName}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
		</view>
		<!-- 欠合同  关联合同 -->
		<view class="detail-box" v-if="flag=='400'">
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>支付单据编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.projectName}}</text>
			<text class="detail-text"><span>收款人（开票方）：</span>{{options.payee}}</text>
			<text class="detail-text"><span>收票方：</span>{{options.drawee}}</text>
			<text class="detail-text"><span>金额：</span>{{options.money}}</text>
			<text class="detail-text"><span>补合同截止日期：</span>{{options.contractExpirationDate}}</text>
			<text class="detail-text"><span>关联合同：</span>{{options.contractName}}</text>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
		</view>
		<!-- 跨区涉税报验证 -->
		<view class="detail-box" v-if="flag=='GC-10'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>项目名称：</span>{{options.proName}}</text>
			<text class="detail-text"><span>工程地点：</span>{{options.address}}</text>
			<text class="detail-text"><span>建设单位：</span>{{options.constructUnit}}</text>
			<text class="detail-text"><span>押金：</span>{{options.calshPledge}}</text>
			<text class="detail-text"><span>开具金额：</span>{{options.amount}}</text>
			<text class="detail-text"><span>金额大写：</span>{{options.moneyUpper}}</text>
			<text class="detail-text"><span>核销情况：</span>{{getDictV(crossChargeOff,options.chargeOff)}}</text>
			<text class="detail-text"><span>收件方式：</span>{{getDictV(crossReceiveWay,options.receiveWay)}}</text>
			<view v-if="options.receiveWay == '1'">
				<text class="detail-text"><span>邮寄地址：</span>{{options.postAddress}}</text>
				<text class="detail-text"><span>电话：</span>{{options.postPhone}}</text>
				<text class="detail-text"><span>收件人：</span>{{options.receiver}}</text>
				<text class="detail-text"><span>付款方式：</span>{{getDictV(crossPayType,options.payType)}}</text>
			</view>
			<text class="detail-text"><span>备注：</span>{{options.remark}}</text>
		</view>
		<!-- 内部资金调拨单 -->
		<view class="detail-box" v-if="flag=='360'">
			<text class="detail-text"><span>编号：</span>{{options.code}}</text>
			<text class="detail-text"><span>申请人：</span>{{options.userName}}</text>
			<text class="detail-text"><span>所属公司：</span>{{options.companyName}}</text>
			<text class="detail-text"><span>所属部门：</span>{{options.deptName}}</text>
			<text class="detail-text"><span>申请日期：</span>{{options.applyTime}}</text>
			<text class="detail-text"><span>付款类型：</span>{{options.payType}}</text>
			<text class="detail-text"><span>付款人：</span>{{options.payee}}</text>
			<text class="detail-text"><span>付款账号：</span>{{options.payeeAccount}}</text>
			<text class="detail-text"><span>付款开户行：</span>{{options.payeeOpenBank}}</text>
			<text class="detail-text"><span>收款人：</span>{{options.receivabler}}</text>
			<text class="detail-text"><span>收款人账号：</span>{{options.receivablerAccount}}</text>
			<text class="detail-text"><span>收款人开户行：</span>{{options.receivablerOpenBank}}</text>
			<text class="detail-text"><span>付款事由：</span>{{options.reason}}</text>
			<text class="detail-text"><span>付款金额：</span>{{options.money}}</text>
			<text class="detail-text"><span>金额大写：</span>{{options.moneyUpper}}</text>
		</view>
	</view>
</template>
<script>
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniIcons
		},
		name: 'UniDetails',
		props: {
			options: {
				type: Object,
				default () {
					return {}
				}
			}, // 数据
			attachmentUrl: {
				type: Array,
				default () {
					return []
				}
			}, // 数据
			flag: {
				type: String,
				default: '0'
			},
			user: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				// 附件地址集合
				fileList: [],
				sys_yes_no: [],
				//出差
				oa_travel_tool: [],
				//请假
				oa_leave_type: [],
				//采购
				purchaseType: [],
				purchaseDetail: [],
				//报销
				reimDetail: [],
				borrowLists: [],
				remitypes: [],
				remiLinks: [],
				//印章
				/**操作类型**/
				optType: [],
				index: 0,
				/**印章类型**/
				sealType: [],
				indexT: 0,
				// 银行保函
				bankGuaLinks: [],
				bankGuaType: [],
				projectType: [],
				// 保证金
				transferMethod: [],
				// 借款
				borrowType: [],
				receiptWay: [],
				// 收款
				receiDetail: [],
				borroDetail: [],
				receivableType: [],
				// 付款
				payType: [],
				relationBillType: [],
				relationContractType: [],
				payDetail: [],
				cutDetail: [],
				// 银行账户
				accountType: [],
				accountCheckingType: [],
				bankType: [],
				// 车辆维修
				repairType: [],
				repairDetail: [],
				// 物资领用
				goodsType: [],
				goosDetail: [],
				// 会议申请
				useMachine: [],
				meetArea: [],
				meetingDetail: [],
				// 信息发布
				urgencyGrade: [],
				secretGrade: [],
				infoType: [],
				infoDetail: [],
				// 部门培训
				trainDetail: [],
				feeBear: [],
				contractSign: [],
				// 工程  ---成本票
				payWay: [],
				billType: [],
				costDetail: [],
				// 工程  ----- 工程发票
				invoiceTakeWay: [],
				freight: [],
				invoiceDetail: [],
				invoiceBillDetail: [],
				// 工程 ------- 采购
				sysPurchaseType: [],
				sysProPurchaseDetail: [],
				// 工程 ---------付款
				payTypePro: [],
				payDetailPro: [],
				//工程  扣款
				debitType: [],
				debitBillType: [],
				debitDetail: [],
				// 工程---收款
				paymentTypePro: [],
				// 工程----物资领用
				goodsTypePro: [],
				goosDetailPro: [],
				// 证件转出注销
				handleType: [],
				logoutDetail: [],
				// 证件调配
				transferDetail: [],
				// 借证申请
				certBorrowDetail: [],
				// 还证申请
				certBackDetail: [],
				// 预缴税金
				taxType: [],
				taxDetail: [],
				// 现行制度
				secretLevel: [],
				ruleDetail: [],
				//合同
				file1: [],
				file2: [],
				file3: [],
				file4: [],
				file5: [],
				file6: [],
				oaContractType1: [],
				oaContractType2: [],
				contractPayType: [],
				// 投标申请
				tenderType: [],
				proType: [],
				// 中标项目移交单
				wintype: [],
				// 还印
				returnSealDetail: [],
				// 借印
				borrowSealDetail: [],
				//跨区涉税报验证
				crossReceiveWay: [],
				crossPayType: [],
				crossChargeOff: []
			}
		},
		mounted() {
			var this_ = this

			if (this.flag == '8') { //合同
				for (let i in this.attachmentUrl) {
					if (this.attachmentUrl[i].type == '0') { //合同附件
						this.file1.push(this.attachmentUrl[i])
					} else if (this.attachmentUrl[i].type == '1') { //资质证明
						this.file2.push(this.attachmentUrl[i])
					} else if (this.attachmentUrl[i].type == '3') { //相关部门
						this.file3.push(this.attachmentUrl[i])
					} else if (this.attachmentUrl[i].type == '4') { //法务签发
						this.file4.push(this.attachmentUrl[i])
					} else if (this.attachmentUrl[i].type == '5') { //归档
						this.file5.push(this.attachmentUrl[i])
					} else if (this.attachmentUrl[i].type == '6') { //补充协议
						this.file6.push(this.attachmentUrl[i])
					}
				}

			}
			if (this.flag == '170') {
				this.dictValue('oa_payment_type').then(res => {
					this_.payType = res.data
				})
				this.dictValue('oa_payment_link').then(res => {
					this_.relationBillType = res.data
				})
				this.dictValue('oa_payment_linkC').then(res => {
					this_.relationContractType = res.data
				})
				// 付款明细
				this.urlRequestPost('oa/oaPaymentDetail/list', {
					'parentId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.payDetail.push(res.data.rows[i])
					}
				})
				// // 扣款明细
				// this.urlRequestPost('oa/oaPaymentCut/list', {
				// 	'parentId': this.options.id
				// }, null, function(res) {
				// 	for (let i in res.data.rows) {
				// 		this_.cutDetail.push(res.data.rows[i])
				// 	}
				// })

			}
			// 字典
			this.dictValue('sys_yes_no').then(res => {
				this_.sys_yes_no = res.data
			})
			this.dictValue('oa_travel_tool').then(res => {
				this_.oa_travel_tool = res.data
			})
			this.dictValue('oa_leave_type').then(res => {
				this_.oa_leave_type = res.data
			})

			//采购
			this.dictValue('oa_purchase_type').then(res => {
				this_.purchaseType = res.data
			})
			if (this.flag == '2' || this.flag == '21') {
				//明细表
				this.urlRequestPost('oa/oaPurchaseDetail/list', {
					'purchaseId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.purchaseDetail.push(res.data.rows[i])
					}
				})
			}
			//报销
			if (this.flag == '3') {
				//明细表
				this.urlRequestPost('oa/oaReimbursementDetail/list', {
					'parentId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.reimDetail.push(res.data.rows[i])
					}
				})
				//扣款明细
				this.urlRequestPost('oa/oaReimbursementCut', {
					'parentId': this.options.id
				}, "application/json;charset=UTF-8", function(res) {
					for (let i in res.data.rows) {
						this_.borrowLists.push(res.data.rows[i])
					}
				})
				//字典
				this.dictValue('oa_reimbursement_type').then(res => {
					this_.remitypes = res.data
				})
				this.dictValue('oa_reimbursement_link').then(res => {
					this_.remiLinks = res.data
				})
			}
			// 用印
			//印章类型
			this.dictValue('oa_seal_type').then(res => {
				this_.sealType = res.data
			})
			if (this.flag == '5' || this.flag == '51' || this.flag == '52' || this.flag == '53' || this.flag == '54') {
				//操作类型
				this.dictValue('oa_seal_eng_discard').then(res => {
					this_.optType = res.data
				})


			}
			// 银行保函
			if (this.flag == '180') {
				//关联模块
				this.dictValue('oa_bankGua_links').then(res => {
					this_.bankGuaLinks = res.data
				})
				// 保函类型
				this.dictValue('oa_bankGuarantee_type').then(res => {
					this_.bankGuaType = res.data
				})
				// 项目性质
				this.dictValue('business_project_type').then(res => {
					this_.projectType = res.data
				})


			}
			// 保证金
			if (this.flag == '140' || this.flag == '145') {
				//关联模块
				this.dictValue('oa_jy_margin_transferMethod').then(res => {
					this_.transferMethod = res.data
				})


			}
			// 借款
			this.dictValue('oa_borrow_type').then(res => {
				this_.borrowType = res.data
			})
			this.dictValue('oa_borrow_time_type').then(res => {
				this_.receiptWay = res.data
			})
			// 收款
			if (this.flag == '160') {
				// 收款明细
				this.urlRequestPost('oa/oaReceivables/detailList', {
					'mainId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.receiDetail.push(res.data.rows[i])
					}
				})
				// 冲抵借款
				this.urlRequestPost('oa/oaBorrowMoney/getBorrowMoneyByOther', {
					'midValue': this.options.id,
					"tableColumn": "borrow_id",
					"tableName": "oa_receivables_borrow",
					"tableMid": "receivables_id"
				}, "application/json;charset=UTF-8", function(res) {
					for (let i in res.data.rows) {
						this_.borroDetail.push(res.data.rows[i])
					}
				})

				this.dictValue('oa_receivable_type').then(res => {
					this_.receivableType = res.data
				})


			}
			// 付款

			// 银行账户
			if (this.flag == '180') {
				this.dictValue('oa_bankAccount_type').then(res => {
					this_.accountType = res.data
				})
				this.dictValue('oa_checking_type').then(res => {
					this_.accountCheckingType = res.data
				})
				this.dictValue('oa_bank_type').then(res => {
					this_.bankType = res.data
				})
			}
			// 车两维修
			this.dictValue('oa_car_repair_type').then(res => {
				this_.repairType = res.data
			})
			if (this.flag == '41') {
				// 维修明细
				this.urlRequestGet("oa/oaCarRepairDetail/detailListByMid?repairId=" + this.options.id, null, function(res) {
					for (let i in res.data.rows) {
						this_.repairDetail.push(res.data.rows[i])
					}
				})
			}
			// 物资领用
			this.dictValue('oa_goods_type').then(res => {
				this_.goodsType = res.data
			})
			if (this.flag == '22') {
				// 物资明细
				this.urlRequestGet("oa/oaGoodsReceiveDetail/selectDetailsByReceiveId?receiveId=" + this.options.id, null, function(
					res) {
					for (let i in res.data.rows) {
						this_.goosDetail.push(res.data.rows[i])
					}
				})
			}
			// 会议申请
			this.dictValue('oa_meeting_machine').then(res => {
				this_.useMachine = res.data
			})
			this.dictValue('oa_meeting_site').then(res => {
				this_.meetArea = res.data
			})
			if (this.flag == '250') {
				// 人员明细
				this.urlRequestPost('oa/oaMeetingPerson/list', {
					'meetingId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.meetingDetail.push(res.data.rows[i])
					}
				})
			}
			// 信息发布
			this.dictValue('oa_information_type').then(res => {
				this_.infoType = res.data
			})
			this.dictValue('oa_secret_grade').then(res => {
				this_.secretGrade = res.data
			})
			this.dictValue('oa_urgency_grade').then(res => {
				this_.urgencyGrade = res.data
			})
			if (this.flag == '6') {
				// 查收部门明细
				this.urlRequestPost('oa/oaInfoDept/list', {
					'infoId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.infoDetail.push(res.data.rows[i])
					}
				})
			}
			// 部门培训
			this.dictValue('oa_deptTrainCost_take').then(res => {
				this_.feeBear = res.data
			})
			this.dictValue('oa_deptTainContract_status').then(res => {
				this_.contractSign = res.data
			})
			if (this.flag == '240') {
				// 学员
				this.urlRequestPost('oa/oaDeptTrainPerson/list', {
					'deptTrainId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.trainDetail.push(res.data.rows[i])
					}
				})
			}
			// 工程---成本票
			this.dictValue('sysPro_pay_type').then(res => {
				this_.payWay = res.data
			})
			this.dictValue('sys_pro_invoice_type').then(res => {
				this_.billType = res.data
			})
			if (this.flag == 'GC-15') {
				// 发票明细
				this.urlRequestPost('oa/sysProCostBillDetail/list', {
					'mainId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.costDetail.push(res.data.rows[i])
					}
				})
			}
			// 工程---工程发票
			this.dictValue('sys_pro_cross_receiveWay').then(res => {
				this_.invoiceTakeWay = res.data
			})
			this.dictValue('sys_pro_cross_payType').then(res => {
				this_.freight = res.data
			})
			if (this.flag == 'GC-18' || this.flag == 'GC-19' || this.flag == 'GC-20') {
				let query1 = {}
				let query2 = {}
				switch (this.options.billStatus) {
					case '0':
						query1.mainId = this.options.id;
						query1.status = '0';
						query2.mainId = this.options.id;
						break
					default:
						query1.optMainId = this.options.id;
						query1.status = this.options.billStatus;
						query2.mainId = this.options.parentId;
						break
				}

				// 发票明细
				this.urlRequestPost('oa/sysProInvoiceDetail/list', query1, null, function(res) {
					for (let i in res.data.rows) {
						this_.invoiceBillDetail.push(res.data.rows[i])
					}
				})
				// 缴税明细
				this.urlRequestPost('oa/sysProInvoicePayTax/list', query2, null, function(res) {
					for (let i in res.data.rows) {
						this_.invoiceDetail.push(res.data.rows[i])
					}
				})
			}
			// 工程---采购
			this.dictValue('sys_pro_purchase_type').then(res => {
				this_.sysPurchaseType = res.data
			})
			if (this.flag == 'GC-25') {
				// 发票明细
				this.urlRequestPost('oa/sysProPurchaseDetail/list', {
					'purchaseId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.sysProPurchaseDetail.push(res.data.rows[i])
					}
				})
			}
			// 工程---付款
			this.dictValue('sys_pro_pay_type').then(res => {
				this_.payTypePro = res.data
			})
			if (this.flag == 'GC-1' || this.flag == 'GC-11' || this.flag == 'GC-12') {
				// 付款明细
				this.urlRequestPost('oa/sysProPaymentDetail/list', {
					'parentId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.payDetailPro.push(res.data.rows[i])
					}
				})
			}
			// 工程---付款
			this.dictValue('sys_debit_bill_type').then(res => {
				this_.debitType = res.data
			})
			this.dictValue('sys_debit_type').then(res => {
				this_.debitBillType = res.data
			})
			if (this.flag == 'GC-3') {
				// 发票明细
				this.urlRequestPost('oa/sysProDebitDetail/list', {
					'parentId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.debitDetail.push(res.data.rows[i])
					}
				})
			}
			// 工程---收款
			this.dictValue('sys_pro_payment_type').then(res => {
				this_.paymentTypePro = res.data
			})
			// 工程---物资领用
			this.dictValue('oa_project_goods_type').then(res => {
				this_.goodsType = res.data
			})
			if (this.flag == 'GC-24') {
				// 领用明细
				this.urlRequestGet("oa/oaProjectGoodsReceiveDetail/selectDetailsByReceiveId?receiveId=" + this.options.id, null,
					function(
						res) {
						for (let i in res.data.rows) {
							this_.goosDetailPro.push(res.data.rows[i])
						}
					})
			}
			// 证件转出注销
			this.dictValue('oa_cerificates_handle_type').then(res => {
				this_.handleType = res.data
			})
			if (this.flag == '130') {
				// 证件明细
				this.urlRequestGet("oa/oaCertificatesDetail/selectDetailByMId/" + this.options.id, null, function(res) {
					for (let i in res.data.rows) {
						this_.logoutDetail.push(res.data.rows[i])
					}
				})
			}
			// 证件调配
			if (this.flag == '120') {
				// 证件明细
				this.urlRequestGet("oa/oaCertificatesDetail/selectDetailByMId/" + this.options.id, null, function(res) {
					for (let i in res.data.rows) {
						this_.transferDetail.push(res.data.rows[i])
					}
				})
			}
			// 借证申请
			if (this.flag == '100') {
				// 证件明细
				this.urlRequestGet("oa/oaCertificatesDetail/selectDetailByMId/" + this.options.id, null, function(res) {
					for (let i in res.data.rows) {
						this_.certBorrowDetail.push(res.data.rows[i])
					}
				})
			}
			// 还证申请
			if (this.flag == '110') {
				// 证件明细
				this.urlRequestGet("oa/oaCertificatesDetail/selectDetailByMId/" + this.options.id, null, function(res) {
					for (let i in res.data.rows) {
						this_.certBackDetail.push(res.data.rows[i])
					}
				})
			}
			// 预缴税金
			this.dictValue('sys_pro_tax_type').then(res => {
				this_.taxType = res.data
			})
			if (this.flag == 'GC-6') {
				// 证件明细
				this.urlRequestPost('oa/sysProPrepaidTax/detailList', {
					'parentId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.taxDetail.push(res.data.rows[i])
					}
				})

			}
			// 现行制度
			this.dictValue('oa_secret_grade').then(res => {
				this_.secretGrade = res.data
			})
			if (this.flag == '260') {
				// 证件明细
				this.urlRequestPost('oa/oaRulesDept/list', {
					'parentId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.ruleDetail.push(res.data.rows[i])
					}
				})

			}
			// 合同
			this.dictValue('oa_contract_type1').then(res => {
				this_.oaContractType1 = res.data
			})
			this.dictValue('oa_contract_relation').then(res => {
				for (var i = 0; i < res.data.length; i++) {
					if (res.data[i].dictLabel == this_.options.type1) {
						this.dictValue(res.data[i].dictValue).then(res => {
							this_.oaContractType2 = res.data
						})
					}
				}
			})

			this.dictValue('oa_contact_payway').then(res => {
				this_.contractPayType = res.data
			})
			// 投标申请
			this.dictValue('business_project_type').then(res => {
				this_.tenderType = res.data
			})
			this.dictValue('business_engineer_type').then(res => {
				this_.proType = res.data
			})
			// 还印

			if (this.flag == '55') {
				this.urlRequestPost('oa/oaSealReturnDetail/list', {
					'mainId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.returnSealDetail.push(res.data.rows[i])
					}

				})

			}
			// 借印
			if (this.flag == '340') {
				this.urlRequestPost('oa/oaSealBorrowDetail/list', {
					'mainId': this.options.id
				}, null, function(res) {
					for (let i in res.data.rows) {
						this_.borrowSealDetail.push(res.data.rows[i])
					}

				})

			}
			// 跨区涉税报验证
			this.dictValue('sys_pro_cross_receiveWay').then(res => {
				this_.crossReceiveWay = res.data
			})
			this.dictValue('sys_pro_cross_payType').then(res => {
				this_.crossPayType = res.data
			})
			this.dictValue('sys_pro_cross_chargeOff').then(res => {
				this_.crossChargeOff = res.data
			})

		},
		methods: {
			change(e) {
				let {
					index
				} = e.detail
			},
			getDictV(type, value) {
				let dictV = ''
				for (let i in type) {
					if (type[i].dictValue == value) {
						dictV = type[i].dictLabel
					}
				}
				return dictV
			},
			getDictVs(type, value) {
				let dictV = []
				for (let i in type) {
					for (let a in value) {
						if (type[i].dictValue == value[a]) {
							dictV.push(type[i].dictLabel)
						}
					}

				}
				return dictV + ''
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
							}
						});
					}
				});
			}
		}
	}
</script>
<style>
	.detail-box {
		padding-top: 10upx;
	}

	.borrowtitle {
		font-size: 28upx;
		background: #F8F8F8;
		text-align: center;
		border-bottom: 1upx solid #CCCCCC;
		padding: 20upx;
	}

	.borrow {
		margin-bottom: 20upx;
	}

	.borrowbtn {
		margin: 0 auto;
	}

	.borrowBox {
		margin: 0 auto;
	}

	.borrowitem {
		border-bottom: 1upx solid #e2e2e2;
		padding: 20upx 20upx;
		background: #F8F8F8;
	}

	.detail-text {
		display: block;
	}

	.detail-text1 {
		font-size: 32upx;
		font-weight: bold;
	}

	.text-box {
		padding: 0 10upx 50upx 10upx;
		word-wrap: break-word;
		word-break: normal;
	}

	.file-text {
		width: 280upx;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.red {
		color: #F76260;
	}
</style>
