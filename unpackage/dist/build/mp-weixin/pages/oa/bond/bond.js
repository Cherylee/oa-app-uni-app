(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/oa/bond/bond"],{"0b83":function(t,e,a){"use strict";a.r(e);var n=a("e26c"),o=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=o.a},3847:function(t,e,a){},a5ad:function(t,e,a){"use strict";var n=a("3847"),o=a.n(n);o.a},a6f5:function(t,e,a){"use strict";(function(t){a("8485");n(a("66fd"));var e=n(a("a7b1"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},a7b1:function(t,e,a){"use strict";a.r(e);var n=a("d2d95"),o=a("0b83");for(var i in o)"default"!==i&&function(t){a.d(e,t,(function(){return o[t]}))}(i);a("a5ad");var r,s=a("f0c5"),u=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=u.exports},d2d95:function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var n={dPicker:function(){return a.e("components/d-picker/d-picker").then(a.bind(null,"09d9"))},ePicker:function(){return Promise.all([a.e("common/vendor"),a.e("components/e-picker/e-picker")]).then(a.bind(null,"d113"))},uniUploader:function(){return Promise.all([a.e("common/vendor"),a.e("components/uni-uploader/uni-uploader")]).then(a.bind(null,"d7c2"))},uniPopup:function(){return a.e("components/uni-popup/uni-popup").then(a.bind(null,"d441"))},uniRelationPopup:function(){return a.e("components/uni-relation-popup/uni-relation-popup").then(a.bind(null,"4f53"))}},o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},e26c:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r(a("05b7")),o=r(a("541c")),i=a("2f62");function r(t){return t&&t.__esModule?t:{default:t}}var s=function(){Promise.all([a.e("common/vendor"),a.e("components/e-picker/e-picker")]).then(function(){return resolve(a("d113"))}.bind(null,a)).catch(a.oe)},u=function(){a.e("components/uni-processList/nui-processList").then(function(){return resolve(a("8947"))}.bind(null,a)).catch(a.oe)},d=function(){a.e("components/uni-relation-popup/uni-relation-popup").then(function(){return resolve(a("4f53"))}.bind(null,a)).catch(a.oe)},c=function(){Promise.all([a.e("common/vendor"),a.e("components/uni-uploader/uni-uploader")]).then(function(){return resolve(a("d7c2"))}.bind(null,a)).catch(a.oe)},p=function(){a.e("components/d-picker/d-picker").then(function(){return resolve(a("09d9"))}.bind(null,a)).catch(a.oe)},l={components:{ePicker:s,uniProcess:u,uniRelationPopup:d,upload:c,dPicker:p},data:function(){return{mid:"",edit:"",user:{},procInstId:"",formData:{id:"",userName:"",companyId:"",applyDeptId:"",deptId:"",applyTimeFrom:n.default.getDate("dateTime"),tenderCompany:"",marginType:"",transferMethod:"",receiptId:"",receiptCode:"",projectId:"",projectName:"",tenderType:"",endArrivalTime:n.default.getDate("dateTime"),marginTotalMoney:"",totalMoneyUpcase:"",transferDesc:"",sourceOfPayment:"",sourceOfAccount:"",sourceOpenBank:"",collectOfPayment:"",collectOfAccount:"",collectOpenBank:"",status:"",applyStatus:""},baseUrl:"oa/oaMargin",addUrl:"oa/oaMargin/add",saveUrl:"oa/oaMargin/saveDraft",tenderDate:{},marginTypeList:[],marginTypeIndex:0,transferMethodList:[],transferMethodIndex:0,tenderTypeList:[],tenderTypeIndex:0,dateStart:n.default.getDate("dateTime"),dateEnd:n.default.getDate("dateTime"),company:[],reasonLise:[["百川"],[]],reasonId:[["100"],[]],reasonIndex:[0,0],type:"",popupState:!1,popupData:{url:"",popupType:"",selectType:"",titile:""},loading1:!1,loading2:!1,loading3:!1,os:!1,fileList:[],attachmentList:[]}},computed:(0,i.mapState)(["name","deptId","companyId","hasLogin"]),onLoad:function(t){this.edit=t.edit||"0",this.mid=t.id||"";var e=this;this.$set(this.formData,"companyId",this.companyId),this.$set(this.formData,"deptId",this.deptId),this.$set(this.formData,"userName",this.name),e.urlRequestGet("system/dept/list?parentId=100","text/html;charset=UTF-8",(function(t){if(t.statusCode="200"){e.company=t.data;var a=[],n=[];for(var o in e.company)a.push(e.company[o].deptName),n.push(e.company[o].deptId);e.reasonLise[1]=a,e.reasonId[1]=n}})),"0"!=this.edit&&""!=this.edit||e.urlRequestGet("/business/jyTender/toPhoneJyTenderExamine/"+t.id,null,(function(t){e.tenderDate=t.data.jyTender,e.formData.projectName=e.tenderDate.projectName})),this.dictValue("oa_jy_margin_type").then((function(t){e.marginTypeList=t.data})),this.dictValue("oa_margin_tansfer").then((function(t){e.transferMethodList=t.data})),this.dictValue("business_project_type").then((function(t){e.tenderTypeList=t.data})),"1"==this.edit?(this.urlRequestGet("oa/oaMargin/phoneEdit/"+this.mid,"text/html;charset=UTF-8",(function(t){n.default.listAssign(e.formData,t.data),e.formData.applyStatus=t.data.applyStatus,e.procInstId=t.data.procInstId,0==e.formData.marginType?e.dictValue("oa_margin_tansfer").then((function(t){e.transferMethodList=t.data})):1==e.formData.marginType&&e.dictValue("oa_margin_guarantee").then((function(t){e.transferMethodList=t.data}))})),this.urlRequestPost("oa/oaAttachment/selectAttachByObjectId",{objId:this.mid},null,(function(t){for(var a in console.log(t.data.data),t.data.data)e.fileList.push(e.websiteUrl+t.data.data[a].attachmentName),e.attachmentList.push({objectId:e.id,attachmentName:t.data.data[a].attachmentName,fileName:t.data.data[a].fileNamess})}))):(e.formData.marginType=0,e.formData.transferMethod=0,e.formData.tenderType=0)},methods:{submit:function(e){var a=this,n="",i={};i["oaMargin"]=this.formData,i.attachmentList=this.attachmentList;var r=[],s=o.default.check(this.formData,r);if(console.log(i),s){switch(e){case"1":n=this.addUrl,this.loading2=!0;break;case"0":n=this.saveUrl,this.loading1=!0;break}this.urlRequestPost(n,i,"application/json;charset=UTF-8",(function(e){a.loading1=!1,a.loading2=!1,t.showToast({title:e.data.msg,icon:"none"}),"0"==e.data.code&&t.reLaunch({url:"../../start/start"})}))}else t.showToast({title:o.default.error,icon:"none"})},send:function(){t.navigateTo({url:"../../send/send?id="+this.mid+"&url="+this.baseUrl})},urge:function(){var e=this;this.loading3=!0,this.urlRequestGet(this.baseUrl+"/urge/"+this.mid,null,(function(a){t.showToast({title:a.data.msg,icon:"none"}),0==a.data.code&&(e.loading3=!1,t.reLaunch({url:"../../start/start"}))}))},changeStart:function(t){this.formData.applyTimeFrom=t},changeEnd:function(t){this.formData.endArrivalTime=t},updateReason:function(t){this.reasonIndex[t.detail.column]=t.detail.value,this.formData.tenderCompany=this.reasonLise[this.reasonIndex[0]]+","+this.reasonLise[1][this.reasonIndex[1]],this.$forceUpdate()},getDictV:function(t,e){var a="";for(var n in t)t[n].dictValue==e&&(a=t[n].dictLabel);return a},getDeptV:function(t){this.formData.deptId=t.deptId,this.formData.companyId=t.companyId},marginTypeChange:function(t){var e=this;this.marginTypeIndex=t.target.value,this.formData.marginType=t.target.value,this.transferMethodIndex=0,console.log(t.target.value),0==t.target.value?this.dictValue("oa_margin_tansfer").then((function(t){e.transferMethodList=t.data})):1==t.target.value&&this.dictValue("oa_margin_guarantee").then((function(t){e.transferMethodList=t.data}))},transferMethodChange:function(t){this.transferMethodIndex=t.target.value,this.formData.transferMethod=t.target.value},tenderTypeChange:function(t){this.tenderTypeIndex=t.target.value,this.formData.tenderType=t.target.value},Upcase:function(){var t=this;this.urlRequestGet("common/converMoneyToCN/"+this.formData.marginTotalMoney,null,(function(e){t.$set(t.formData,"totalMoneyUpcase",e.data.msg)}))},togglePopup:function(t,e,a,n,o){switch(t){case"top":this.content="顶部弹出 popup";break;case"bottom":this.content="底部弹出 popup";break;case"center":this.content="居中弹出 popup";break}this.type=t,this.popupState=!0,this.popupData.url=e,this.popupData.popupType=a,this.popupData.selectType=n,this.popupData.titile=o},change:function(t){t.show||(this.popupState=!1)},updatePopupState:function(t){this.popupState=t},getData:function(t){"oaReceivables"==t[0].popupType&&(this.formData.receiptId=t[0].id,this.formData.receiptCode=t[0].code),"TB-0"==t[0].popupType&&(this.formData.projectId=t[0].id,this.formData.projectName=t[0].projectName)},getAttachmentList:function(t){this.attachmentList=t}}};e.default=l}).call(this,a("543d")["default"])}},[["a6f5","common/runtime","common/vendor"]]]);