(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/oa/reimbursement/reimbursement","components/d-picker/d-picker"],{"09d9":function(t,e,i){"use strict";i.r(e);var a=i("8ebb"),n=i("65e1");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("cfba");var o,s=i("f0c5"),u=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=u.exports},"23a5":function(t,e,i){"use strict";var a=i("d192"),n=i.n(a);n.a},2451:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{companyId:{type:[Number,String],default:1949},deptId:{type:[Number,String],default:1949}},data:function(){return{returnData:{},company:[],multiArray:[["百川"],[],[]],multiArrayId:[["100"],[],[]],multiIndex:[0,0,0]}},created:function(){var t=this;this.urlRequestGet("system/dept/list?parentId=100","text/html;charset=UTF-8",(function(e){if(e.statusCode="200"){t.company=e.data;var i=[],a=[],n=0,r=0;for(var o in t.company)t.company[o].deptId==t.companyId&&(n=o),i.push(t.company[o].deptName),a.push(t.company[o].deptId);t.multiArray[1]=i,t.multiArrayId[1]=a,t.showDeptDetail(n,r,t.deptId),t.returnData.companyId=t.companyId,t.$emit("getDeptV",t.returnData)}}))},methods:{bindMultiPickerColumnChange:function(t){this.multiIndex[t.detail.column]=t.detail.value,1==t.detail.column&&(this.showDeptDetail(t.detail.value,0),this.returnData.companyId=this.multiArrayId[1][t.detail.value],this.$emit("getDeptV",this.returnData)),2==t.detail.column&&(this.returnData.deptId=this.multiArrayId[2][t.detail.value],this.$emit("getDeptV",this.returnData)),this.$forceUpdate()},showDeptDetail:function(t,e,i){var a=this;this.urlRequestGet("system/dept/list?parentId="+this.company[t].deptId,"text/html;charset=UTF-8",(function(n){if(200==n.statusCode){var r=[],o=[],s=e;for(var u in n.data)n.data[u].deptId==i&&(s=u),r.push(n.data[u].deptName),o.push(n.data[u].deptId);a.multiArray[2]=r,a.multiArrayId[2]=o,a.multiArray.splice(0,0),a.multiArrayId.splice(0,0),a.returnData.deptId=a.multiArrayId[2][s],a.$emit("getDeptV",a.returnData),a.multiIndex[1]=t,a.multiIndex[2]=s}}))}}};e.default=a},"2d4a":function(t,e,i){"use strict";i.r(e);var a=i("ec57"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},6112:function(t,e,i){},"65e1":function(t,e,i){"use strict";i.r(e);var a=i("2451"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},"7d85":function(t,e,i){"use strict";i.r(e);var a=i("984a"),n=i("2d4a");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("23a5");var o,s=i("f0c5"),u=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=u.exports},"7f01":function(t,e,i){"use strict";(function(t){i("8485");a(i("66fd"));var e=a(i("7d85"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"8ebb":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"984a":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var a={dPicker:function(){return Promise.resolve().then(i.bind(null,"09d9"))},uniIcons:function(){return Promise.all([i.e("common/vendor"),i.e("components/uni-icons/uni-icons")]).then(i.bind(null,"1581"))},uniPopup:function(){return i.e("components/uni-popup/uni-popup").then(i.bind(null,"d441"))}},n=function(){var t=this,e=t.$createElement,i=(t._self._c,0!=t.reimDetail.length?t.__map(t.reimDetail,(function(e,i){var a=t.__get_orig(e),n=t.getDictV(t.remitypes,e.reimbursementType),r=t.getDictV(t.relationTypeList,e.relationType);return{$orig:a,m0:n,m1:r}})):null),a=t.getDictV(t.remitypes,t.details.reimbursementType),n=t.returnIndex(t.relationTypeList,t.formData.relationType);t.$mp.data=Object.assign({},{$root:{l0:i,m2:a,m3:n}})},r=[]},cfba:function(t,e,i){"use strict";var a=i("6112"),n=i.n(a);n.a},d192:function(t,e,i){},ec57:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=u(i("a34a")),n=u(i("05b7")),r=u(i("541c")),o=u(i("bac4")),s=(u(i("09d9")),i("2f62"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e,i,a,n,r,o){try{var s=t[r](o),u=s.value}catch(c){return void i(c)}s.done?e(u):Promise.resolve(u).then(a,n)}function l(t){return function(){var e=this,i=arguments;return new Promise((function(a,n){var r=t.apply(e,i);function o(t){c(r,a,n,o,s,"next",t)}function s(t){c(r,a,n,o,s,"throw",t)}o(void 0)}))}}var d=[["camera"],["album"],["camera","album"]],h=[["compressed"],["original"],["compressed","original"]],m=function(){Promise.all([i.e("common/vendor"),i.e("components/uni-icons/uni-icons")]).then(function(){return resolve(i("1581"))}.bind(null,i)).catch(i.oe)},p=function(){i.e("components/uni-processList/nui-processList").then(function(){return resolve(i("8947"))}.bind(null,i)).catch(i.oe)},f={components:{uniProcess:p,uniIcons:m},data:function(){return{id:"",edit:"",user:{},os:!1,formData:{mid:"",userName:"",companyId:"",deptId:"",code:"",projectId:"",title:"",money:null,moneyUpcase:"",receiver:"",receiverAccount:"",receiverOpenBank:"",actualMoney:0,actualMoneyUpcase:"",status:""},baseUrl:"oa/oaReimbursement",addUrl:"oa/oaReimbursement/add",saveUrl:"oa/oaReimbursement/saveDraft",editUrl:"oa/oaReimbursement/modifyReimbursement",flag:!1,index:0,date:n.default.getDate("dateTime"),loading1:!1,loading2:!1,loading3:!1,procInstId:"",borrowdata:[],borrowLists:[],tiptext:"加载中.....",isLoading:!1,pageSize:3,pageNum:1,total:0,reimDetail:[],details:{reimbursementReason:"",reimbursementType:"",money:null,relationType:"oatravel",relationId:""},remitypes:[],current:0,currentP:0,projects:{data:[],pageNum:1,isLoading:!1,refreshText:"",loadingText:"加载更多...",noneText:"加载中.....",total:0,pageSize:10},type:"",showborrow:!1,showdetail:!1,showtype:!1,showproject:!1,showlink:!1,attachmentList:[],title:"choose/previewImage",imageList:[],imageListDetail:[],sourceTypeIndex:2,sourceType:["拍照","相册","拍照或相册"],sizeTypeIndex:0,sizeType:["压缩","原图","压缩或原图"],countIndex:8,count:[1,2,3,4,5,6,7,8,9],cutPayment:[],linkForm:{data:[],pageNum:1,isLoading:!1,refreshText:"",loadingText:"加载更多...",noneText:"加载中.....",total:0,pageSize:10},currentRelation:0,relationTypeList:[],index1:0,receiverList:[]}},computed:(0,s.mapState)(["name","deptId","companyId","hasLogin"]),onLoad:function(t){this.edit=t.edit||"0",this.mid=t.id||"";var e=this;"0"==this.edit&&(this.$set(this.formData,"userName",this.name),this.$set(this.formData,"companyId",this.companyId),this.$set(this.formData,"deptId",this.deptId)),"1"==this.edit&&(this.urlRequestGet(this.baseUrl+"/phoneEdit/"+this.mid,"text/html;charset=UTF-8",(function(t){n.default.listAssign(e.formData,t.data),e.procInstId=t.data.procInstId})),this.urlRequestPost("oa/oaBorrowMoney/getBorrowMoneyByOther",{tableColumn:"borrow_id",tableName:"oa_reimbursement_borrow",tableMid:"reimbursement_id",midValue:this.mid},"application/json;charset=UTF-8",(function(t){for(var i in t.data.rows)e.borrowLists.push(t.data.rows[i])})),this.urlRequestPost("oa/oaAttachment/selectAttachByObjectId",{objId:this.mid},null,(function(t){for(var i in t.data.data)e.imageList.push(t.data.data[i].attachmentUrl),e.attachmentList.push({objectId:e.id,attachmentName:t.data.data[i].attachmentName,fileName:t.data.data[i].fileName})})),this.urlRequestPost("oa/oaReimbursementCut/phoneList",{parentId:this.mid},"application/json;charset=UTF-8",(function(t){for(var i in t.data.rows)e.cutPayment.push(t.data.rows[i])})),this.urlRequestPost("oa/oaReimbursementDetail/list",{parentId:this.mid},null,(function(t){for(var i in t.data.rows)e.reimDetail.push(t.data.rows[i])}))),this.getBorrowList(),this.dictValue("oa_reimbursement_type").then((function(t){e.remitypes=t.data})),this.dictValue("oa_reimbursement_link").then((function(t){e.relationTypeList=t.data})),this.getLinksList()},methods:{submit:function(e){var i=this,a="",n={},o=[{name:"money",checkType:"notnull",checkRule:"",errorMsg:"报销金额必填"},{name:"moneyUpcase",checkType:"notnull",checkRule:"",errorMsg:"金额大写必填"}];n.oaReimbursement=this.formData,n.attachmentList=this.attachmentList,n.detailList=this.reimDetail,n.relationList=this.borrowLists;var s=r.default.check(this.formData,o);if(s){switch(e){case"1":a=this.addUrl,this.loading2=!0;break;case"0":a=this.saveUrl,this.loading1=!0;break;case"2":a=this.editUrl,this.loading1=!0;break}this.urlRequestPost(a,n,"application/json;charset=UTF-8",(function(e){i.loading1=!1,i.loading2=!1,t.showToast({title:e.data.msg,icon:"none"}),"0"==e.data.code&&t.reLaunch({url:"../../start/start"})})),this.urlRequestPost("oa/oaPayeeAccountInformation/phoneAdd",{payee:i.formData.receiver,account:i.formData.receiverAccount,openingBank:i.formData.receiverOpenBank},"application/json;charset=UTF-8",(function(t){console.log(t)}))}else t.showToast({title:r.default.error,icon:"none"})},send:function(){t.navigateTo({url:"../../send/send?id="+this.mid+"&url="+this.baseUrl})},urge:function(){var e=this;this.loading3=!0,this.urlRequestGet(this.baseUrl+"/urge/"+this.mid,null,(function(i){t.showToast({title:i.data.msg,icon:"none"}),0==i.data.code&&(e.loading3=!1,t.reLaunch({url:"../../start/start"}))}))},Upcase:function(){var t=this;this.urlRequestGet("common/converMoneyToCN/"+this.formData.money,null,(function(e){t.$set(t.formData,"moneyUpcase",e.data.msg)}))},togglePopup:function(t,e){switch(t){case"top":this.content="顶部弹出 popup";break;case"bottom":this.content="底部弹出 popup";break;case"center":this.content="居中弹出 popup";break}"detail"==e&&(this.details={reimbursementReason:"",reimbursementType:"",money:null,relationType:"",relationId:""},this.imageListDetail=[]),this.type=t,this["show"+e]=!0},gotoFile:function(e){console.log(e),t.showLoading({title:"加载中"}),t.downloadFile({url:e,success:function(e){t.hideLoading();var i=e.tempFilePath;t.openDocument({filePath:i,success:function(e){t.hideLoading(),console.log("打开文档成功")}})}})},cancel:function(t,e){this["show"+t]=!1,"1"==e?(this.$set(this.formData,"projectId",this.projects.data[this.currentP].id),this.$set(this.formData,"title",this.projects.data[this.currentP].projectName)):"2"==e?this.reimDetail.push(this.details):"3"==e?this.$set(this.details,"reimbursementType",this.remitypes[this.current].dictValue):"4"==e&&this.$set(this.details,"relationId",this.linkForm.data[this.currentRelation].id)},ifadd:function(t){var e=!1;for(var i in this.borrowLists)t==this.borrowLists[i].id&&(e=!0);return e},change:function(t){t.show||(this.showborrow=!1,this.showdetail=!1,this.showtype=!1,this.showproject=!1,this.showlink=!1)},checkboxChange:function(t){for(var e=this.projects.data,i=t.target.value,a=0;a<e.length;a++)if(e[a].id===i){this.currentP=a;break}},radioChange:function(t){for(var e=0;e<this.remitypes.length;e++)if(this.remitypes[e].dictValue===t.target.value){this.current=e;break}},relationRadioChange:function(t){for(var e=0;e<this.remitypes.length;e++)if(this.linkForm.data[e].id===t.target.value){this.currentRelation=e;break}},relationTypeChange:function(t){this.index1=t.target.value,this.details.relationType=this.relationTypeList[this.index1].dictValue,this.getLinksList()},getBorrowList:function(){var t=this;this.urlRequestPost("oa/oaProject/phoneList",{pageSize:this.projects.pageSize,pageNum:this.projects.pageNum},null,(function(e){var i=t.projects.data,a=[];for(var n in e.data.rows)a.push(e.data.rows[n]);t.projects.pageNum<=1?t.projects.data=a:t.projects.data=i.concat(a),t.projects.total=e.data.total}))},borrowlower:function(t){var e=this;setTimeout((function(){var t=Math.ceil(e.projects.total/e.projects.pageSize);e.projects.pageNum<t?(e.projects.pageNum++,e.getBorrowList()):e.projects.noneText="没有数据了！"}),500)},getLinksList:function(){var t=this,e="oa/";"jyTender"==this.details.relationType&&(e="business/"),this.urlRequestPost(e+this.details.relationType+"/list",{pageSize:this.linkForm.pageSize,pageNum:this.linkForm.pageNum},null,(function(e){console.log(e);var i=t.linkForm.data,a=[];for(var n in e.data.rows)a.push(e.data.rows[n]);t.linkForm.pageNum<=1?t.linkForm.data=a:t.linkForm.data=i.concat(a),t.linkForm.total=e.data.total}))},borrowlowerLinks:function(t){var e=this;setTimeout((function(){var t=Math.ceil(e.linkForm.total/e.linkForm.pageSize);e.linkForm.pageNum<t?(e.linkForm.pageNum++,e.getLinksList()):e.linkForm.noneText="没有数据了！"}),500)},dele:function(t,e){"1"==e?this.borrowLists.splice(t,1):"2"==e&&this.reimDetail.splice(t,1)},getDictV:function(t,e){var i="";for(var a in t)t[a].dictValue==e&&(i=t[a].dictLabel);return i},returnIndex:function(t,e){var i="";for(var a in t)t[a].dictValue==e&&(i=a);return i},chooseImage:function(){var e=l(a.default.mark((function e(i){var n,r,o,s=this;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=0,e.t0=i,e.next="0"===e.t0?4:"1"===e.t0?6:8;break;case 4:return n=this.imageList.length+this.count[this.countIndex]>9?9-this.imageList.length:this.count[this.countIndex],e.abrupt("break",8);case 6:return n=this.imageListDetail.length+this.count[this.countIndex]>9?9-this.imageListDetail.length:this.count[this.countIndex],e.abrupt("break",8);case 8:if(9!==this.imageList.length){e.next=14;break}return e.next=11,this.isFullImg();case 11:if(r=e.sent,r){e.next=14;break}return e.abrupt("return");case 14:o=this,t.chooseImage({sourceType:d[this.sourceTypeIndex],sizeType:h[this.sizeTypeIndex],count:n,success:function(e){var a=e.tempFilePaths,n=function(e){t.uploadFile({url:o.websiteUrl+"common/bootstrapFileInputUpload",filePath:a[e],fileType:"image",name:"data",success:function(n){t.showToast({title:"上传成功",icon:"success",duration:1e3});var r={attachmentName:JSON.parse(n.data).fileName,fileName:JSON.parse(n.data).sourceFileName};"0"==i?(o.imageList.push(a[e]),o.attachmentList.push(r)):(o.imageListDetail.push(a[e]),o.details.attachmentList.push(r))},fail:function(e){t.showModal({content:e.errMsg,showCancel:!1})}})};for(var r in a)n(r)},fail:function(e){t.getSetting({success:function(e){var i=!1;switch(s.sourceTypeIndex){case 0:i=e.authSetting["scope.camera"];break;case 1:i=e.authSetting["scope.album"];break;case 2:i=e.authSetting["scope.album"]&&e.authSetting["scope.camera"];break;default:break}i||t.showModal({title:"授权失败",content:"Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限",success:function(e){e.confirm&&t.openSetting()}})}})}});case 16:case"end":return e.stop()}}),e,this)})));function i(t){return e.apply(this,arguments)}return i}(),isFullImg:function(){var e=this;return new Promise((function(i){t.showModal({content:"已经有9张图片了,是否清空现有图片？",success:function(t){t.confirm?(e.imageList=[],i(!0)):i(!1)},fail:function(){i(!1)}})}))},previewImage:function(e){var i=e.target.dataset.src;t.previewImage({current:i,urls:this.imageList})},deleImage:function(t){var e=t;this.imageList.splice(e,1),this.attachmentList.splice(e,1)},checkPermission:function(e){var i=this;return l(a.default.mark((function n(){var r,s;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=e?e-1:i.sourceTypeIndex,!o.default.isIOS){a.next=7;break}return a.next=4,o.default.requestIOS(d[r][0]);case 4:a.t0=a.sent,a.next=10;break;case 7:return a.next=9,o.default.requestAndroid(0===r?"android.permission.CAMERA":"android.permission.READ_EXTERNAL_STORAGE");case 9:a.t0=a.sent;case 10:return s=a.t0,null===s||1===s?s=1:t.showModal({content:"没有开启权限",confirmText:"设置",success:function(t){t.confirm&&o.default.gotoAppSetting()}}),a.abrupt("return",s);case 13:case"end":return a.stop()}}),n)})))()},getDeptV:function(t){console.log(t),this.formData.deptId=t.deptId,this.formData.companyId=t.companyId},onBackPress:function(){if(this.showborrow||this.showdetail||this.showtype||this.showproject)return this.showborrow=!1,this.showdetail=!1,this.showtype=!1,this.showproject=!1,!0},getReceiverList:function(){var t=this;this.urlRequestPost("oa/oaPayeeAccountInformation/list",{payee:t.formData.receiver},null,(function(e){console.log(e),t.receiverList=e.data}))},choicePayee:function(t){this.formData.receiver=this.receiverList[t].payee,this.formData.receiverAccount=this.receiverList[t].account,this.formData.receiverOpenBank=this.receiverList[t].openingBank,this.receiverList=[]}}};e.default=f}).call(this,i("543d")["default"])}},[["7f01","common/runtime","common/vendor"]]]);