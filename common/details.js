/**
 *  details所有页面公共抽出js
 */
const ifAgree = function (e) {
	let opinion=''
	switch (e) {
		case 'Y':
			opinion = '同意'
			break
	
		case 'N':
			opinion = '不同意'
			break
	}
	return opinion
}
/**
 * @param {Object} type 区分审批的type
 */
const baseUrl = function (type) {
	let url=''
	switch (type) {
		case '0':
			url = '/oa/oatravel'
			break
		case '1':
			url = '/oa/oaLeave'
			break
		case '200':
			url = '/oa/oaOutgoing'
			break
		case '210':
			url = '/oa/oaSupplyCard'
			break
		case '220':
			url = '/oa/oaOvertime'
			break
		case '3':
		case 'GC-9':
			url = '/oa/oaReimbursement'
			break
		case '2':
			url = '/oa/oapurchase'
			break
		case '5':
			url = '/oa/oaSealApply'
			break
		case '4':
			url = '/oa/oaCarApply'
			break
		case '180':
			url = '/oa/oaBankGuarantee'
			break
		case '140':
			url = '/oa/oaMargin'
			break
		case '150':
		case 'GC-21':
			url = '/oa/oaBorrowMoney'
			break
		case '280':
			url = '/oa/oaInterest'
			break
		case '290':
			url = '/oa/oaRefund'
			break
		case '160':
			url = '/oa/oaReceivables'
			break
		case '170':
			url = '/oa/oaPayment'
			break
		case '190':
			url = '/oa/oaBankAccount'
			break
		case '41':
			url = '/oa/oaCarRepair'
			break
		case '22':
			url = '/oa/oaGoodsReceive'
			break
		case '250':
			url = '/oa/oaMeeting'
			break
		case '6':
			url = '/oa/oaInformation'
			break
		case '230':
			url = '/oa/oaPersonTrain'
			break
		case '240':
			url = '/oa/oaDeptTrain'
			break
		case 'GC-15':
		case 'GC-16':
		case 'GC-17':
			url = '/oa/sysProCostBill'
			break
		case 'GC-18':
		case 'GC-19':
		case 'GC-20':
			url = '/oa/sysProInvoice'
			break
		case 'GC-25':
		    url='oa/sysProPurchase'
			break
		case 'GC-1':
		case 'GC-11':
		case 'GC-12':
			url = '/oa/sysProPayment'
			break
		case 'GC-3':
			url = '/oa/sysProDebit'
			break
		case 'GC-2':
			url = '/oa/sysProReceivables'
			break
		case 'GC-24':
			url = '/oa/oaProjectGoodsReceive'
			break
		case '130':
			url = '/oa/oaCertificatesLogout'
			break
		case '120':
			url = '/oa/oaCertificatesTransfer'
			break
		case '100':
			url = '/oa/oaCertificatesBorrow'
			break
		case '110':
			url = '/oa/oaCertificatesBack'
			break
		case 'GC-6':
			url = '/oa/sysProPrepaidTax'
			break
		case 'GC-7':
		case 'GC-8':
			url = '/oa/sysProPerformance'
			break
		case 'GC-22':
			url = '/oa/sysProRepairMoney'
			break
		case 'GC-23':
			url = '/oa/sysProOrganizationPlan'
			break
		case '8':
			url = '/oa/oaContract'
			break
		case '10':
			url = '/business/jyTender'
			break
		case '270':
			url = '/oa/oaWinBidTurnOver'
			break
		case '370':
		case '380':
			url = '/oa/oaLaborContractRenewal'
			break
		case '55':
			url = '/oa/oaSealReturn'
			break
		case '340':
			url = '/oa/oaSealBorrow'
			break
		case '390':
			url = '/oa/sysProReceipt'
			break
		case '400':
			url = '/oa/oaPaymentOweContract'
			break
		case 'GC-10':
			url = '/oa/sysProCrossCertifice'
			break
		case '360':
			url = '/oa/oaInternalFundTransfer'
			break
	}
	return url
}
/**
 * @param {Object} service
 * @param {Object} baseUrl
 * @param {Object} opinion
 * @param {Object} isLeaderPass
 * @param {Object} taskId
 * @param {Object} callback
 */
const yes=function(service,baseUrl,opinion,isLeaderPass,taskId,callback){
	console.log(taskId)
	service.urlRequestPost(baseUrl+'/completeCurTask',{"opinion": opinion,"isLeaderPass":isLeaderPass,"taskId":taskId},null,function(res){
		console.log('返回', res);
		callback(res)
	})
	
}

// website
let websiteUrl=''
/**
 * 导出
 */
export default {
    ifAgree,
	yes,
	baseUrl,
	websiteUrl
}