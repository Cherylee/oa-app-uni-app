(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/oa/purchase/purchase","components/d-picker/d-picker"],{"09d9":function(t,e,n){"use strict";n.r(e);var a=n("8ebb"),i=n("65e1");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("cfba");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=u.exports},2451:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{companyId:{type:[Number,String],default:1949},deptId:{type:[Number,String],default:1949}},data:function(){return{returnData:{},company:[],multiArray:[["百川"],[],[]],multiArrayId:[["100"],[],[]],multiIndex:[0,0,0]}},created:function(){var t=this;this.urlRequestGet("system/dept/list?parentId=100","text/html;charset=UTF-8",(function(e){if(e.statusCode="200"){t.company=e.data;var n=[],a=[],i=0,r=0;for(var o in t.company)t.company[o].deptId==t.companyId&&(i=o),n.push(t.company[o].deptName),a.push(t.company[o].deptId);t.multiArray[1]=n,t.multiArrayId[1]=a,t.showDeptDetail(i,r,t.deptId),t.returnData.companyId=t.companyId,t.$emit("getDeptV",t.returnData)}}))},methods:{bindMultiPickerColumnChange:function(t){this.multiIndex[t.detail.column]=t.detail.value,1==t.detail.column&&(this.showDeptDetail(t.detail.value,0),this.returnData.companyId=this.multiArrayId[1][t.detail.value],this.$emit("getDeptV",this.returnData)),2==t.detail.column&&(this.returnData.deptId=this.multiArrayId[2][t.detail.value],this.$emit("getDeptV",this.returnData)),this.$forceUpdate()},showDeptDetail:function(t,e,n){var a=this;this.urlRequestGet("system/dept/list?parentId="+this.company[t].deptId,"text/html;charset=UTF-8",(function(i){if(200==i.statusCode){var r=[],o=[],s=e;for(var u in i.data)i.data[u].deptId==n&&(s=u),r.push(i.data[u].deptName),o.push(i.data[u].deptId);a.multiArray[2]=r,a.multiArrayId[2]=o,a.multiArray.splice(0,0),a.multiArrayId.splice(0,0),a.returnData.deptId=a.multiArrayId[2][s],a.$emit("getDeptV",a.returnData),a.multiIndex[1]=t,a.multiIndex[2]=s}}))}}};e.default=a},"366a":function(t,e,n){},"3a7c":function(t,e,n){"use strict";n.r(e);var a=n("6364"),i=n("63dc");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("8ff9");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=u.exports},6112:function(t,e,n){},6364:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={dPicker:function(){return Promise.resolve().then(n.bind(null,"09d9"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"1581"))},uniPopup:function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"d441"))},ePicker:function(){return Promise.all([n.e("common/vendor"),n.e("components/e-picker/e-picker")]).then(n.bind(null,"d113"))}},i=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"63dc":function(t,e,n){"use strict";n.r(e);var a=n("9858"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},"65e1":function(t,e,n){"use strict";n.r(e);var a=n("2451"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},"89f7":function(t,e,n){"use strict";(function(t){n("8485");a(n("66fd"));var e=a(n("3a7c"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"8ebb":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"8ff9":function(t,e,n){"use strict";var a=n("366a"),i=n.n(a);i.a},9858:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("05b7")),i=o(n("541c")),r=(o(n("09d9")),n("2f62"));function o(t){return t&&t.__esModule?t:{default:t}}var s=function(){Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(function(){return resolve(n("1581"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/uni-processList/nui-processList").then(function(){return resolve(n("8947"))}.bind(null,n)).catch(n.oe)},c={components:{uniProcess:u,uniIcons:s},data:function(){return{mid:"",edit:"",user:{},formData:{id:"",userName:"",companyId:"",deptId:"",title:"",reason:"",remark:"",type:"",status:""},baseUrl:"oa/oapurchase",addUrl:"oa/oapurchase/add",saveUrl:"oa/oapurchase/saveDraft",editUrl:"oa/oapurchase/edit",flag:!1,purchaseType:[],index:0,date:a.default.getDate("dateTime"),loading1:!1,loading2:!1,loading3:!1,procInstId:"",reimDetail:[],details:{reimbursementReason:"",reimbursementType:"",money:null,file:[]},type:"",showdetail:!1}},computed:(0,r.mapState)(["name","deptId","companyId","hasLogin"]),onLoad:function(t){this.edit=t.edit||"0",this.mid=t.id||"";var e=this;"0"==this.edit&&(this.$set(this.formData,"userName",this.name),this.$set(this.formData,"companyId",this.companyId),this.$set(this.formData,"deptId",this.deptId)),this.dictValue("oa_purchase_type").then((function(t){e.purchaseType=t.data})),"1"==this.edit&&(this.urlRequestGet(this.baseUrl+"/phoneEdit/"+this.mid,"text/html;charset=UTF-8",(function(t){console.log(t),a.default.listAssign(e.formData,t.data),e.procInstId=t.data.procInstId})),this.urlRequestPost("oa/oaPurchaseDetail/list",{purchaseId:this.mid},null,(function(t){for(var n in console.log(t),t.data.rows)e.reimDetail.push(t.data.rows[n])})))},methods:{submit:function(e){var n=this,a="",r={},o=[{name:"reason",checkType:"notnull",checkRule:"",errorMsg:"事由必填"}];r.oaPurchase=this.formData,r.oaPurchaseDetailList=this.reimDetail;var s=i.default.check(this.formData,o);if(s){switch(e){case"1":a=this.addUrl,this.loading2=!0;break;case"0":a=this.saveUrl,this.loading1=!0;break;case"2":a=this.editUrl,this.loading1=!0;break}this.urlRequestPost(a,r,"application/json;charset=UTF-8",(function(e){n.loading1=!1,n.loading2=!1,t.showToast({title:e.data.msg,icon:"none"}),"0"==e.data.code&&t.reLaunch({url:"../../start/start"})}))}else t.showToast({title:i.default.error,icon:"none"})},send:function(){t.navigateTo({url:"../../send/send?id="+this.mid+"&url="+this.baseUrl})},urge:function(){var e=this;this.loading3=!0,this.urlRequestGet(this.baseUrl+"/urge/"+this.mid,null,(function(n){t.showToast({title:n.data.msg,icon:"none"}),0==n.data.code&&(e.loading3=!1,t.reLaunch({url:"../../start/start"}))}))},togglePopup:function(t,e){switch(t){case"top":this.content="顶部弹出 popup";break;case"bottom":this.content="底部弹出 popup";break;case"center":this.content="居中弹出 popup";break}this.type=t,this["show"+e]=!0},cancel:function(t,e){this["show"+t]=!1,"1"==e&&this.reimDetail.push(this.details)},change:function(t){t.show||(this.showdetail=!1)},dele:function(t,e){this.reimDetail.splice(t,1)},getDictV:function(t,e){var n="";for(var a in t)t[a].dictValue==e&&(n=t[a].dictLabel);return n},bindPickerChange:function(t){this.index=t.target.value,this.formData.type=t.target.value},changeStart:function(t){this.details.useTime=t,this.showValue=t,this.date=t},getDeptV:function(t){this.formData.deptId=t.deptId,this.formData.companyId=t.companyId},onBackPress:function(){if(this.showdetail)return this.showdetail=!1,!0}}};e.default=c}).call(this,n("543d")["default"])},cfba:function(t,e,n){"use strict";var a=n("6112"),i=n.n(a);i.a}},[["89f7","common/runtime","common/vendor"]]]);