(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/oa/supplyCard/supplyCard","components/d-picker/d-picker"],{"09d9":function(t,e,a){"use strict";a.r(e);var n=a("8ebb"),i=a("65e1");for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);a("cfba");var r,o=a("f0c5"),u=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=u.exports},2451:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{companyId:{type:[Number,String],default:1949},deptId:{type:[Number,String],default:1949}},data:function(){return{returnData:{},company:[],multiArray:[["百川"],[],[]],multiArrayId:[["100"],[],[]],multiIndex:[0,0,0]}},created:function(){var t=this;this.urlRequestGet("system/dept/list?parentId=100","text/html;charset=UTF-8",(function(e){if(e.statusCode="200"){t.company=e.data;var a=[],n=[],i=0,s=0;for(var r in t.company)t.company[r].deptId==t.companyId&&(i=r),a.push(t.company[r].deptName),n.push(t.company[r].deptId);t.multiArray[1]=a,t.multiArrayId[1]=n,t.showDeptDetail(i,s,t.deptId),t.returnData.companyId=t.companyId,t.$emit("getDeptV",t.returnData)}}))},methods:{bindMultiPickerColumnChange:function(t){this.multiIndex[t.detail.column]=t.detail.value,1==t.detail.column&&(this.showDeptDetail(t.detail.value,0),this.returnData.companyId=this.multiArrayId[1][t.detail.value],this.$emit("getDeptV",this.returnData)),2==t.detail.column&&(this.returnData.deptId=this.multiArrayId[2][t.detail.value],this.$emit("getDeptV",this.returnData)),this.$forceUpdate()},showDeptDetail:function(t,e,a){var n=this;this.urlRequestGet("system/dept/list?parentId="+this.company[t].deptId,"text/html;charset=UTF-8",(function(i){if(200==i.statusCode){var s=[],r=[],o=e;for(var u in i.data)i.data[u].deptId==a&&(o=u),s.push(i.data[u].deptName),r.push(i.data[u].deptId);n.multiArray[2]=s,n.multiArrayId[2]=r,n.multiArray.splice(0,0),n.multiArrayId.splice(0,0),n.returnData.deptId=n.multiArrayId[2][o],n.$emit("getDeptV",n.returnData),n.multiIndex[1]=t,n.multiIndex[2]=o}}))}}};e.default=n},6112:function(t,e,a){},"65e1":function(t,e,a){"use strict";a.r(e);var n=a("2451"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},"68f3":function(t,e,a){"use strict";a.r(e);var n=a("8354"),i=a("bad9");for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);a("c752");var r,o=a("f0c5"),u=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=u.exports},"80df":function(t,e,a){"use strict";(function(t){a("8485");n(a("66fd"));var e=n(a("68f3"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},8354:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return n}));var n={dPicker:function(){return Promise.resolve().then(a.bind(null,"09d9"))},ePicker:function(){return Promise.all([a.e("common/vendor"),a.e("components/e-picker/e-picker")]).then(a.bind(null,"d113"))}},i=function(){var t=this,e=t.$createElement;t._self._c},s=[]},"8ebb":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},s=[]},b0ad:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=u(a("a34a")),i=u(a("05b7")),s=u(a("541c")),r=u(a("bac4")),o=(u(a("09d9")),a("2f62"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e,a,n,i,s,r){try{var o=t[s](r),u=o.value}catch(c){return void a(c)}o.done?e(u):Promise.resolve(u).then(n,i)}function d(t){return function(){var e=this,a=arguments;return new Promise((function(n,i){var s=t.apply(e,a);function r(t){c(s,n,i,r,o,"next",t)}function o(t){c(s,n,i,r,o,"throw",t)}r(void 0)}))}}var l=[["camera"],["album"],["camera","album"]],p=[["compressed"],["original"],["compressed","original"]],f=function(){Promise.all([a.e("common/vendor"),a.e("components/e-picker/e-picker")]).then(function(){return resolve(a("d113"))}.bind(null,a)).catch(a.oe)},m=function(){a.e("components/uni-processList/nui-processList").then(function(){return resolve(a("8947"))}.bind(null,a)).catch(a.oe)},h={components:{ePicker:f,uniProcess:m},data:function(){return{mid:"",edit:"",user:{},formData:{id:"",userName:"",applyCompanyId:"",applyDeptId:"",supplyStart:i.default.getDate("dateTime"),supplyEnd:i.default.getDate("dateTime"),supplyDays:0,reason:"",remark:"",status:""},baseUrl:"oa/oaSupplyCard",addUrl:"oa/oaSupplyCard/add",saveUrl:"oa/oaSupplyCard/saveDraft",editUrl:"oa/oaSupplyCard/modifyOaSupplyCard",flag:!1,index:0,date:i.default.getDate("dateTime"),dateStart:i.default.getDate("dateTime"),dateEnd:i.default.getDate("dateTime"),timeLimit:"",loading1:!1,loading2:!1,loading3:!1,procInstId:"",attachmentList:[],title:"choose/previewImage",imageList:[],sourceTypeIndex:2,sourceType:["拍照","相册","拍照或相册"],sizeTypeIndex:1,sizeType:["压缩","原图","压缩或原图"],countIndex:8,count:[1,2,3,4,5,6,7,8,9]}},computed:(0,o.mapState)(["name","deptId","companyId","hasLogin"]),onLoad:function(t){this.edit=t.edit||"0",this.mid=t.id||"";var e=this;"0"==this.edit&&(this.$set(this.formData,"userName",this.name),this.$set(this.formData,"applyCompanyId",this.companyId),this.$set(this.formData,"applyDeptId",this.deptId)),"1"==this.edit&&(this.urlRequestGet(this.baseUrl+"/phoneEdit/"+this.mid,"text/html;charset=UTF-8",(function(t){i.default.listAssign(e.formData,t.data),e.procInstId=t.data.procInstId})),this.urlRequestPost("oa/oaAttachment/selectAttachByObjectId",{objId:this.mid},null,(function(t){for(var a in t.data.data)e.imageList.push(this.websiteUrl+t.data.data[a].attachmentName),e.attachmentList.push({objectId:e.id,attachmentName:t.data.data[a].attachmentName,fileName:t.data.data[a].fileNamess})})))},onReady:function(){},methods:{submit:function(e){var a=this,n="",i={},r=[{name:"supplyStart",checkType:"notnull",checkRule:"",errorMsg:"开始时间必填"},{name:"supplyEnd",checkType:"notnull",checkRule:"",errorMsg:"结束时间必填"},{name:"supplyDays",checkType:"notnull",checkRule:"",errorMsg:"时长必填"}];i.oaSupplyCard=this.formData,i.attachmentList=this.attachmentList;var o=s.default.check(this.formData,r);if(o){switch(e){case"1":n=this.addUrl,this.loading2=!0;break;case"0":n=this.saveUrl,this.loading1=!0;break;case"2":n=this.editUrl,this.loading1=!0;break}this.urlRequestPost(n,i,"application/json;charset=UTF-8",(function(e){console.log(e),a.loading1=!1,a.loading2=!1,t.showToast({title:e.data.msg,icon:"none"}),"0"==e.data.code&&t.reLaunch({url:"../../start/start"})}))}else t.showToast({title:s.default.error,icon:"none"})},changeStart:function(t){this.formData.supplyStart=t,this.showValue=t,this.dateStart=t,this.getTimeLimit(this.dateStart,this.dateEnd)},changeEnd:function(t){this.formData.supplyEnd=t,this.showValue=t,this.dateEnd=t,this.getTimeLimit(this.dateStart,this.dateEnd)},getTimeLimit:function(e,a){var n=this,i={};i.startTime=e,i.endTime=a,this.urlRequestPost(this.baseUrl+"/calculateDays",JSON.stringify(i),"application/json;charset=UTF-8",(function(e){"200"==e.data.retCode?(console.log(e.data),n.$set(n.formData,"supplyDays",e.data.time)):t.showToast({title:e.data.msg,icon:"none"})}))},send:function(){t.navigateTo({url:"../../send/send?id="+this.mid+"&url="+this.baseUrl})},urge:function(){var e=this;this.loading3=!0,this.urlRequestGet(this.baseUrl+"/urge/"+this.mid,null,(function(a){console.log(a),t.showToast({title:a.data.msg,icon:"none"}),0==a.data.code&&(e.loading3=!1,t.reLaunch({url:"../../start/start"}))}))},chooseImage:function(){var e=d(n.default.mark((function e(){var a,i,s=this;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(9!==this.imageList.length){e.next=6;break}return e.next=3,this.isFullImg();case 3:if(a=e.sent,a){e.next=6;break}return e.abrupt("return");case 6:i=this,t.chooseImage({sourceType:l[this.sourceTypeIndex],sizeType:p[this.sizeTypeIndex],count:this.imageList.length+this.count[this.countIndex]>9?9-this.imageList.length:this.count[this.countIndex],success:function(e){var a=e.tempFilePaths,n=function(e){t.uploadFile({url:s.websiteUrl+"common/bootstrapFileInputUpload",filePath:a[e],fileType:"image",name:"data",success:function(n){t.showToast({title:"上传成功",icon:"success",duration:1e3});var s={attachmentName:JSON.parse(n.data).fileName,fileName:JSON.parse(n.data).sourceFileName};i.imageList.push(a[e]),i.attachmentList.push(s)},fail:function(e){t.showModal({content:e.errMsg,showCancel:!1})}})};for(var r in a)n(r)},fail:function(e){t.getSetting({success:function(e){var a=!1;switch(s.sourceTypeIndex){case 0:a=e.authSetting["scope.camera"];break;case 1:a=e.authSetting["scope.album"];break;case 2:a=e.authSetting["scope.album"]&&e.authSetting["scope.camera"];break;default:break}a||t.showModal({title:"授权失败",content:"Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限",success:function(e){e.confirm&&t.openSetting()}})}})}});case 8:case"end":return e.stop()}}),e,this)})));function a(){return e.apply(this,arguments)}return a}(),isFullImg:function(){var e=this;return new Promise((function(a){t.showModal({content:"已经有9张图片了,是否清空现有图片？",success:function(t){t.confirm?(e.imageList=[],a(!0)):a(!1)},fail:function(){a(!1)}})}))},previewImage:function(e){var a=e.target.dataset.src;t.previewImage({current:a,urls:this.imageList})},deleImage:function(t){var e=t;this.imageList.splice(e,1),this.attachmentList.splice(e,1)},checkPermission:function(e){var a=this;return d(n.default.mark((function i(){var s,o;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s=e?e-1:a.sourceTypeIndex,!r.default.isIOS){n.next=7;break}return n.next=4,r.default.requestIOS(l[s][0]);case 4:n.t0=n.sent,n.next=10;break;case 7:return n.next=9,r.default.requestAndroid(0===s?"android.permission.CAMERA":"android.permission.READ_EXTERNAL_STORAGE");case 9:n.t0=n.sent;case 10:return o=n.t0,null===o||1===o?o=1:t.showModal({content:"没有开启权限",confirmText:"设置",success:function(t){t.confirm&&r.default.gotoAppSetting()}}),n.abrupt("return",o);case 13:case"end":return n.stop()}}),i)})))()},getDeptV:function(t){console.log(t),this.formData.applyDeptId=t.deptId,this.formData.applyCompanyId=t.companyId}}};e.default=h}).call(this,a("543d")["default"])},bad9:function(t,e,a){"use strict";a.r(e);var n=a("b0ad"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},c752:function(t,e,a){"use strict";var n=a("f8d9"),i=a.n(n);i.a},cfba:function(t,e,a){"use strict";var n=a("6112"),i=a.n(n);i.a},f8d9:function(t,e,a){}},[["80df","common/runtime","common/vendor"]]]);