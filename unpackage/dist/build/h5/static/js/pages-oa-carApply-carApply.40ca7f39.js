(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-oa-carApply-carApply"],{"09fe":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".uni-popup[data-v-33b3e770]{position:fixed;\ntop:var(--window-top);\n\n\nbottom:0;left:0;right:0;overflow:hidden}.uni-popup__mask[data-v-33b3e770]{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,.4);opacity:0}.mask-ani[data-v-33b3e770]{-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:.2s;transition-duration:.2s}.uni-top-mask[data-v-33b3e770]{opacity:1}.uni-bottom-mask[data-v-33b3e770]{opacity:1}.uni-center-mask[data-v-33b3e770]{opacity:1}.uni-popup__wrapper[data-v-33b3e770]{\ndisplay:block;\nposition:absolute}.top[data-v-33b3e770]{top:0;left:0;right:0;-webkit-transform:translateY(-500px);transform:translateY(-500px)}.bottom[data-v-33b3e770]{bottom:0;left:0;right:0;-webkit-transform:translateY(500px);transform:translateY(500px)}.center[data-v-33b3e770]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;\nbottom:0;left:0;right:0;top:0;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-transform:scale(1.2);transform:scale(1.2);opacity:0}.uni-popup__wrapper-box[data-v-33b3e770]{\ndisplay:block;\nposition:relative}.content-ani[data-v-33b3e770]{\n\t\t/* transition: transform 0.3s;\n */-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-transition-duration:.2s;transition-duration:.2s}.uni-top-content[data-v-33b3e770]{-webkit-transform:translateY(0);transform:translateY(0)}.uni-bottom-content[data-v-33b3e770]{-webkit-transform:translateY(0);transform:translateY(0)}.uni-center-content[data-v-33b3e770]{-webkit-transform:scale(1);transform:scale(1);opacity:1}",""]),t.exports=e},"10d1":function(t,e,a){"use strict";var i,n=a("da84"),r=a("e2cc"),o=a("f183"),s=a("6d61"),u=a("acac"),l=a("861d"),c=a("69f3").enforce,d=a("7f9a"),f=!n.ActiveXObject&&"ActiveXObject"in n,p=Object.isExtensible,m=function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}},v=t.exports=s("WeakMap",m,u);if(d&&f){i=u.getConstructor(m,"WeakMap",!0),o.REQUIRED=!0;var h=v.prototype,b=h["delete"],g=h.has,w=h.get,y=h.set;r(h,{delete:function(t){if(l(t)&&!p(t)){var e=c(this);return e.frozen||(e.frozen=new i),b.call(this,t)||e.frozen["delete"](t)}return b.call(this,t)},has:function(t){if(l(t)&&!p(t)){var e=c(this);return e.frozen||(e.frozen=new i),g.call(this,t)||e.frozen.has(t)}return g.call(this,t)},get:function(t){if(l(t)&&!p(t)){var e=c(this);return e.frozen||(e.frozen=new i),g.call(this,t)?w.call(this,t):e.frozen.get(t)}return w.call(this,t)},set:function(t,e){if(l(t)&&!p(t)){var a=c(this);a.frozen||(a.frozen=new i),g.call(this,t)?y.call(this,t,e):a.frozen.set(t,e)}else y.call(this,t,e);return this}})}},"13a2":function(t,e,a){"use strict";function i(t,e){for(var a=t%4==0&&t%100!=0&&t%400!=0,i=[31,a?29:28,31,30,31,30,31,31,30,31,30,31],n=[],o=0;o<i[e-1];o++)n.push(r(o+1)+"日");return n}function n(t){var e=[],a=1,i=13,n="月";t>2&&(a=0,3==t&&(i=24,n="时"),t>3&&(i=60,4==t&&(n="分"),5==t&&(n="秒")));for(var o=a;o<i;o++)e.push(r(o)+n);return e}function r(t){return t>9?t:"0"+t}function o(t,e){if("date"!=t&&"dateTime"!=t&&"time"!=t)throw Error("mode无"+t+"该选项配置");if("date"==t&&10!=e.length||"time"==t&&8!=e.length||"dateTime"==t&&19!=e.length)throw Error("'showValue'有误，请根据当前mode 正确设置格式")}function s(t,e){var a=r(parseInt(t[0])),i=r(parseInt(t[1])),n=r(parseInt(t[2])),o=r(parseInt(t[3])),s=r(parseInt(t[4])),u=r(parseInt(t[5]));return"date"==e?a+"-"+i+"-"+n:"dateTime"==e?a+"-"+i+"-"+n+" "+o+":"+s+":"+u:a+":"+i+":"+n}function u(t){var e=new Date;switch(t){case"dateTime":return e.getFullYear()+"-"+r(e.getMonth()+1)+"-"+r(e.getDate())+" "+r(e.getHours())+":"+r(e.getMinutes())+":"+r(e.getSeconds());case"time":return r(e.getHours())+":"+r(e.getMinutes())+":"+r(e.getSeconds());default:return e.getFullYear()+"-"+r(e.getMonth()+1)+"-"+r(e.getDate())}}a("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.getDayArr=i,e.getArr=n,e.checkShowValue=o,e.getDateTimeValue=s,e.getLocalTime=u},2601:function(t,e,a){"use strict";var i=a("ee27");a("99af"),a("a434"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("05b7")),r=i(a("1581")),o=i(a("541c")),s=i(a("8947")),u={components:{uniProcess:s.default,uniIcons:r.default},data:function(){return{id:"",edit:"",user:{},formData:{id:"",userName:"",companyId:"",deptId:"",applyTimeFrom:n.default.getDate("dateTime"),applyTimeTo:n.default.getDate("dateTime"),carNo:"",carUsed:0,driverInfo:"",passengerInfo:"",ridePlace:"",applyReason:"",destination:"",mileageStart:"",mileageEnd:"",mileage:"",designatedDriver:"",remark:"",status:""},carDetail:"",baseUrl:"oa/oaCarApply",addUrl:"oa/oaCarApply/add",saveUrl:"oa/oaCarApply/saveDraft",flag:!1,date:n.default.getDate("dateTime"),dateStart:n.default.getDate("dateTime"),dateEnd:n.default.getDate("dateTime"),timeLimit:"",cardata:[],carLists:[],tiptext:"加载中.....",isLoading:!1,pageSize:3,pageNum:1,total:0,currentP:0,company:[],multiArray:[["百川"],[],[]],multiArrayId:[["100"],[],[]],multiIndex:[0,0,0],loading1:!1,loading2:!1,loading3:!1,procInstId:"",type:"",showcar:!1}},onLoad:function(t){this.edit=t.edit||"",this.id=t.id||"";var e=this;this.urlRequestPost("/phoneIndexData","",null,(function(t){(t.statusCode="200")&&(e.user=t.data.user,e.$set(e.formData,"companyId",t.data.user.companyId),e.$set(e.formData,"deptId",t.data.user.deptId),e.urlRequestGet("system/dept/list?parentId=100","text/html;charset=UTF-8",(function(t){if(t.statusCode="200"){e.company=t.data;var a=[],i=[],n=0;for(var r in e.company)e.company[r].deptId==e.user.companyId&&(n=r),a.push(e.company[r].deptName),i.push(e.company[r].deptId);e.multiArray[1]=a,e.multiArrayId[1]=i,e.showDeptDetail(n)}})))})),"1"==this.edit&&this.urlRequestGet(this.baseUrl+"/phoneEdit/"+this.id,"text/html;charset=UTF-8",(function(t){console.log(t),n.default.listAssign(e.formData,t.data),e.procInstId=t.data.procInstId,e.carDetail=t.data.carNo})),this.getCarList()},methods:{submit:function(t){var e=this,a="",i=[{name:"applyTimeFrom",checkType:"notnull",checkRule:"",errorMsg:"出发时间必填"},{name:"applyTimeTo",checkType:"notnull",checkRule:"",errorMsg:"返回时间必填"},{name:"carNo",checkType:"notnull",checkRule:"",errorMsg:"车牌号必填"},{name:"passengerInfo",checkType:"notnull",checkRule:"",errorMsg:"乘客信息必填"},{name:"ridePlace",checkType:"notnull",checkRule:"",errorMsg:"乘车地点必填"},{name:"applyReason",checkType:"notnull",checkRule:"",errorMsg:"用车事由必填"},{name:"destination",checkType:"notnull",checkRule:"",errorMsg:"目的地必填"}],n=o.default.check(this.formData,i);if(n){switch(t){case"1":a=this.addUrl,this.loading2=!0;break;case"0":a=this.saveUrl,this.loading1=!0;break}console.log(this.formData),this.urlRequestPost(a,this.formData,null,(function(t){e.loading1=!1,e.loading2=!1,uni.showToast({title:t.data.msg,icon:"none"}),"0"==t.data.code&&uni.reLaunch({url:"../../start/start"})}))}else uni.showToast({title:o.default.error,icon:"none"})},send:function(){uni.navigateTo({url:"../../send/send?id="+this.id+"&url="+this.baseUrl})},urge:function(){var t=this;this.loading3=!0,this.urlRequestGet(this.baseUrl+"/urge/"+this.id,null,(function(e){uni.showToast({title:e.data.msg,icon:"none"}),0==e.data.code&&(t.loading3=!1,uni.reLaunch({url:"../../start/start"}))}))},getDictV:function(t,e){var a="";for(var i in t)t[i].dictValue==e&&(a=t[i].dictLabel);return a},changeStart:function(t){this.formData.applyTimeFrom=t,this.showValue=t,this.dateStart=t,this.getTimeLimit(this.dateStart,this.dateEnd)},changeEnd:function(t){this.formData.applyTimeTo=t,this.showValue=t,this.dateEnd=t,this.getTimeLimit(this.dateStart,this.dateEnd)},getTimeLimit:function(t,e){var a=this,i={};i.startTime=t,i.endTime=e,this.urlRequestPost(this.baseUrl+"/calculateHour",JSON.stringify(i),"application/json;charset=UTF-8",(function(t){console.log(t),0==t.data.code&&a.$set(a.formData,"carUsed",t.data.msg)}))},togglePopup:function(t,e){switch(t){case"top":this.content="顶部弹出 popup";break;case"bottom":this.content="底部弹出 popup";break;case"center":this.content="居中弹出 popup";break}this.type=t,this["show"+e]=!0},cancel:function(t,e){this["show"+t]=!1,"1"==e&&(this.$set(this.formData,"carNo",this.cardata[this.currentP].carNo),this.carDetail=this.cardata[this.currentP].carBrad+"-"+this.cardata[this.currentP].bodyColor+"-"+this.cardata[this.currentP].carNo,console.log(this.cardata))},ifadd:function(t){var e=!1;for(var a in this.sealdata)t==this.sealdata[a].id&&(e=!0);return e},change:function(t){t.show||(this.showcar=!1)},radioChange:function(t){for(var e=0;e<this.cardata.length;e++)if(this.cardata[e].id===t.target.value){this.currentP=e;break}},getCarList:function(){var t=this;this.urlRequestPost("oa/oaCar/phoneList",{pageSize:this.pageSize,pageNum:this.pageNum},null,(function(e){console.log(e);var a=t.cardata,i=[];for(var n in e.data.rows)i.push(e.data.rows[n]);t.pageNum<=1?t.cardata=i:t.cardata=a.concat(i),t.total=e.data.total}))},carlower:function(t){var e=this;setTimeout((function(){var t=Math.ceil(e.total/e.pageSize);e.pageNum<t?(e.pageNum++,e.getCarList()):e.tiptext="没有数据了！"}),500)},carDetailFun:function(){this.formData.carNo=this.carDetail},bindMultiPickerColumnChange:function(t){this.multiIndex[t.detail.column]=t.detail.value,1==t.detail.column&&this.showDeptDetail(t.detail.value),2==t.detail.column&&(this.formData.applyDeptId=this_.multiArrayId[2][t.detail.value]),this.$forceUpdate()},showDeptDetail:function(t){var e=this;this.urlRequestGet("system/dept/list?parentId="+this.company[t].deptId,"text/html;charset=UTF-8",(function(a){if(200==a.statusCode){var i=[],n=[];for(var r in a.data)i.push(a.data[r].deptName),n.push(a.data[r].deptId);e.multiArray[2]=i,e.multiArrayId[2]=n,e.multiArray.splice(0,0),e.multiArrayId.splice(0,0),e.user.companyId=e.multiArrayId[1][e.multiIndex[1]],e.user.deptId=e.multiArrayId[2][e.multiIndex[2]],e.multiIndex[1]=t}}))}}};e.default=u},"2d19":function(t,e,a){"use strict";a.r(e);var i=a("d9d5"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},"4a46":function(t,e,a){a("e260"),a("e439"),a("d3b7"),a("3ca3"),a("10d1"),a("ddb0");var i=a("62f5");function n(){if("function"!==typeof WeakMap)return null;var t=new WeakMap;return n=function(){return t},t}function r(t){if(t&&t.__esModule)return t;if(null===t||"object"!==i(t)&&"function"!==typeof t)return{default:t};var e=n();if(e&&e.has(t))return e.get(t);var a={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var s=r?Object.getOwnPropertyDescriptor(t,o):null;s&&(s.get||s.set)?Object.defineProperty(a,o,s):a[o]=t[o]}return a["default"]=t,e&&e.set(t,a),a}t.exports=r},"4b6a":function(t,e,a){"use strict";var i=a("b518"),n=a.n(i);n.a},"53bc":function(t,e,a){"use strict";var i=a("d7ff"),n=a.n(i);n.a},"569d":function(t,e,a){"use strict";var i={ePicker:a("d113").default,uniPopup:a("d441").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni-common-mt"},[a("v-uni-form",["1"==t.edit?a("v-uni-input",{staticClass:"hidden",model:{value:t.formData.id,callback:function(e){t.$set(t.formData,"id",e)},expression:"formData.id"}}):t._e(),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("申请人")]),"0"==t.edit?a("v-uni-input",{staticClass:"uni-input",attrs:{placeholder:"申请人"},model:{value:t.user.userName,callback:function(e){t.$set(t.user,"userName",e)},expression:"user.userName"}}):t._e(),"1"==t.edit?a("v-uni-input",{staticClass:"uni-input",attrs:{placeholder:"申请人"},model:{value:t.formData.userName,callback:function(e){t.$set(t.formData,"userName",e)},expression:"formData.userName"}}):t._e()],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("申请公司")]),a("v-uni-input",{staticClass:"hidden",attrs:{name:"companyId"},model:{value:t.formData.companyId,callback:function(e){t.$set(t.formData,"companyId",e)},expression:"formData.companyId"}}),a("v-uni-input",{staticClass:"hidden",attrs:{name:"deptId"},model:{value:t.formData.deptId,callback:function(e){t.$set(t.formData,"deptId",e)},expression:"formData.deptId"}}),a("v-uni-picker",{staticClass:"picker",attrs:{mode:"multiSelector",value:t.multiIndex,range:t.multiArray},on:{columnchange:function(e){arguments[0]=e=t.$handleEvent(e),t.bindMultiPickerColumnChange.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"uni-input"},[t._v(t._s(t.multiArray[0][t.multiIndex[0]])+"，"+t._s(t.multiArray[1][t.multiIndex[1]])+"，"+t._s(t.multiArray[2][t.multiIndex[2]]))])],1)],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("出发时间")]),a("v-uni-input",{staticClass:"hidden",attrs:{name:"applyTimeFrom"},model:{value:t.formData.applyTimeFrom,callback:function(e){t.$set(t.formData,"applyTimeFrom",e)},expression:"formData.applyTimeFrom"}}),a("e-picker",{staticClass:"uni-input",attrs:{mode:"dateTime",showValue:t.formData.applyTimeFrom?t.formData.applyTimeFrom:t.dateStart},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStart.apply(void 0,arguments)}}},[t._v(t._s(t.formData.applyTimeFrom?t.formData.applyTimeFrom:t.dateStart))])],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("返回时间")]),a("v-uni-input",{staticClass:"hidden",attrs:{name:"applyTimeTo"},model:{value:t.formData.applyTimeTo,callback:function(e){t.$set(t.formData,"applyTimeTo",e)},expression:"formData.applyTimeTo"}}),a("e-picker",{staticClass:"uni-input",attrs:{mode:"dateTime",showValue:t.formData.applyTimeTo?t.formData.applyTimeTo:t.dateEnd},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.changeEnd.apply(void 0,arguments)}}},[t._v(t._s(t.formData.applyTimeTo?t.formData.applyTimeTo:t.dateEnd))])],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("车牌号")]),a("v-uni-input",{staticClass:"hidden",attrs:{name:"carNo"},model:{value:t.formData.carNo,callback:function(e){t.$set(t.formData,"carNo",e)},expression:"formData.carNo"}}),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"carDetail",placeholder:"车牌号"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.carDetailFun()}},model:{value:t.carDetail,callback:function(e){t.carDetail=e},expression:"carDetail"}}),a("v-uni-button",{staticClass:" carbtn ",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.togglePopup("center","car")}}},[t._v("选择车辆")])],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("用车时长")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"carUsed",disabled:"true",placeholder:"用车时长"},model:{value:t.formData.carUsed,callback:function(e){t.$set(t.formData,"carUsed",e)},expression:"formData.carUsed"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("驾驶员信息")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"driverInfo",placeholder:"驾驶员信息"},model:{value:t.formData.driverInfo,callback:function(e){t.$set(t.formData,"driverInfo",e)},expression:"formData.driverInfo"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("乘客信息")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"passengerInfo",placeholder:"乘客信息"},model:{value:t.formData.passengerInfo,callback:function(e){t.$set(t.formData,"passengerInfo",e)},expression:"formData.passengerInfo"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("乘车地点")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"ridePlace",placeholder:"乘车地点"},model:{value:t.formData.ridePlace,callback:function(e){t.$set(t.formData,"ridePlace",e)},expression:"formData.ridePlace"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("用车事由")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"applyReason",placeholder:"用车事由"},model:{value:t.formData.applyReason,callback:function(e){t.$set(t.formData,"applyReason",e)},expression:"formData.applyReason"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("目的地")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"destination",placeholder:"目的地"},model:{value:t.formData.destination,callback:function(e){t.$set(t.formData,"destination",e)},expression:"formData.destination"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("里程开始数")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"mileageStart",placeholder:"里程开始数"},model:{value:t.formData.mileageStart,callback:function(e){t.$set(t.formData,"mileageStart",e)},expression:"formData.mileageStart"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("里程终止数")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"mileageEnd",placeholder:"里程终止数"},model:{value:t.formData.mileageEnd,callback:function(e){t.$set(t.formData,"mileageEnd",e)},expression:"formData.mileageEnd"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("行驶里程数")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"mileage",placeholder:"行驶里程数"},model:{value:t.formData.mileage,callback:function(e){t.$set(t.formData,"mileage",e)},expression:"formData.mileage"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("指定司机")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"designatedDriver",placeholder:"指定司机"},model:{value:t.formData.designatedDriver,callback:function(e){t.$set(t.formData,"designatedDriver",e)},expression:"formData.designatedDriver"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("备注")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"remark",placeholder:"备注"},model:{value:t.formData.remark,callback:function(e){t.$set(t.formData,"remark",e)},expression:"formData.remark"}})],1),a("v-uni-view",{staticClass:"button-sp-area"},["99"==t.formData.status||""==t.formData.status?a("v-uni-button",{staticClass:"mini-btn",attrs:{type:"info",size:"mini",loading:t.loading1},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit("0")}}},[t._v("保存草稿")]):t._e(),"99"==t.formData.status||""==t.formData.status?a("v-uni-button",{staticClass:"mini-btn",attrs:{type:"primary",loading:t.loading2,size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit("1")}}},[t._v("提交")]):t._e(),"3"==t.formData.status?a("v-uni-button",{staticClass:"mini-btn",attrs:{type:"primary",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submitHandler("2")}}},[t._v("提交")]):t._e(),""!=t.formData.status&&"2"!=t.formData.status&&"16"!=t.formData.status&&"99"!=t.formData.status?a("v-uni-button",{staticClass:"mini-btn cui-btn-2",attrs:{type:"info",loading:t.loading3,size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.urge()}}},[t._v("催办")]):t._e(),"99"!=t.formData.status&&""!=t.formData.status?a("v-uni-button",{staticClass:"mini-btn cui-btn-1",attrs:{type:"info",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.send()}}},[t._v("抄送")]):t._e()],1)],1),"1"==t.edit&&t.procInstId?a("uni-process",{attrs:{baseUrl:t.baseUrl,procInstId:t.procInstId,id:t.id}}):t._e(),a("uni-popup",{attrs:{show:t.showcar,type:t.type,"mask-click":!1},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"uni-tip"},[a("v-uni-text",{staticClass:"uni-tip-title"},[t._v("选择车辆")]),a("v-uni-scroll-view",{staticClass:"uni-tip-content",attrs:{"scroll-y":"true"},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.carlower.apply(void 0,arguments)}}},[0==t.cardata.length?a("v-uni-view",{staticClass:"loading-more"},[a("v-uni-text",{staticClass:"loading-more-text"},[t._v("暂无车辆！")])],1):a("v-uni-view",{staticClass:"uni-list"},[a("v-uni-radio-group",{on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.radioChange.apply(void 0,arguments)}}},t._l(t.cardata,(function(e,i){return a("v-uni-label",{key:e.id,staticClass:"uni-list-cell uni-list-cell-pd",style:{background:e.disabled?"#f7f7f7":"none"}},[a("v-uni-view",[a("v-uni-radio",{attrs:{value:e.id,checked:i===t.currentP}})],1),a("v-uni-view",[a("v-uni-view",[t._v("品牌："+t._s(e.carBrad))]),a("v-uni-view",[t._v("车身颜色："+t._s(e.bodyColor))]),a("v-uni-view",[t._v("车牌号："+t._s(e.carNo))]),a("v-uni-view",[t._v("归属人："+t._s(e.userName))])],1)],1)})),1)],1),t.isLoading||t.total>3?a("v-uni-view",{staticClass:"loading-more"},[a("v-uni-text",{staticClass:"loading-more-text"},[t._v(t._s(t.tiptext))])],1):t._e()],1),a("v-uni-view",{staticClass:"uni-tip-group-button"},[a("v-uni-text",{staticClass:"uni-tip-button",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cancel("car")}}},[t._v("取消")]),a("v-uni-text",{staticClass:"uni-tip-button",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cancel("car","1")}}},[t._v("确定")])],1)],1)],1)],1)},r=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return i}))},"588d":function(t,e,a){"use strict";a.r(e);var i=a("b471"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},"61d4":function(t,e,a){"use strict";a.r(e);var i=a("2601"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},"62f5":function(t,e,a){function i(e){return"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?t.exports=i=function(t){return typeof t}:t.exports=i=function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(e)}a("a4d3"),a("e01a"),a("d28b"),a("e260"),a("d3b7"),a("3ca3"),a("ddb0"),t.exports=i},"6d61":function(t,e,a){"use strict";var i=a("23e7"),n=a("da84"),r=a("94ca"),o=a("6eeb"),s=a("f183"),u=a("2266"),l=a("19aa"),c=a("861d"),d=a("d039"),f=a("1c7e"),p=a("d44e"),m=a("7156");t.exports=function(t,e,a){var v=-1!==t.indexOf("Map"),h=-1!==t.indexOf("Weak"),b=v?"set":"add",g=n[t],w=g&&g.prototype,y=g,k={},x=function(t){var e=w[t];o(w,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(h&&!c(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return h&&!c(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(h&&!c(t))&&e.call(this,0===t?0:t)}:function(t,a){return e.call(this,0===t?0:t,a),this})};if(r(t,"function"!=typeof g||!(h||w.forEach&&!d((function(){(new g).entries().next()})))))y=a.getConstructor(e,t,v,b),s.REQUIRED=!0;else if(r(t,!0)){var D=new y,C=D[b](h?{}:-0,1)!=D,_=d((function(){D.has(1)})),I=f((function(t){new g(t)})),T=!h&&d((function(){var t=new g,e=5;while(e--)t[b](e,e);return!t.has(-0)}));I||(y=e((function(e,a){l(e,y,t);var i=m(new g,e,y);return void 0!=a&&u(a,i[b],i,v),i})),y.prototype=w,w.constructor=y),(_||T)&&(x("delete"),x("has"),v&&x("get")),(T||C)&&x(b),h&&w.clear&&delete w.clear}return k[t]=y,i({global:!0,forced:y!=g},k),p(y,t),h||a.setStrong(y,t,v),y}},7307:function(t,e,a){"use strict";var i,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"e-picker"},[a("v-uni-picker",{attrs:{mode:"multiSelector",range:t.range,value:t.value},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)},columnchange:function(e){arguments[0]=e=t.$handleEvent(e),t.columnchange.apply(void 0,arguments)}}},[t._t("default")],2)],1)},r=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return i}))},acac:function(t,e,a){"use strict";var i=a("e2cc"),n=a("f183").getWeakData,r=a("825a"),o=a("861d"),s=a("19aa"),u=a("2266"),l=a("b727"),c=a("5135"),d=a("69f3"),f=d.set,p=d.getterFor,m=l.find,v=l.findIndex,h=0,b=function(t){return t.frozen||(t.frozen=new g)},g=function(){this.entries=[]},w=function(t,e){return m(t.entries,(function(t){return t[0]===e}))};g.prototype={get:function(t){var e=w(this,t);if(e)return e[1]},has:function(t){return!!w(this,t)},set:function(t,e){var a=w(this,t);a?a[1]=e:this.entries.push([t,e])},delete:function(t){var e=v(this.entries,(function(e){return e[0]===t}));return~e&&this.entries.splice(e,1),!!~e}},t.exports={getConstructor:function(t,e,a,l){var d=t((function(t,i){s(t,d,e),f(t,{type:e,id:h++,frozen:void 0}),void 0!=i&&u(i,t[l],t,a)})),m=p(e),v=function(t,e,a){var i=m(t),o=n(r(e),!0);return!0===o?b(i).set(e,a):o[i.id]=a,t};return i(d.prototype,{delete:function(t){var e=m(this);if(!o(t))return!1;var a=n(t);return!0===a?b(e)["delete"](t):a&&c(a,e.id)&&delete a[e.id]},has:function(t){var e=m(this);if(!o(t))return!1;var a=n(t);return!0===a?b(e).has(t):a&&c(a,e.id)}}),i(d.prototype,a?{get:function(t){var e=m(this);if(o(t)){var a=n(t);return!0===a?b(e).get(t):a?a[e.id]:void 0}},set:function(t,e){return v(this,t,e)}}:{add:function(t){return v(this,t,!0)}}),d}}},b471:function(t,e,a){"use strict";var i=a("4a46");a("c975"),a("d81d"),a("a9e3"),a("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,r=i(a("13a2")),o={name:"EPicker",data:function(){return{range:[],value:[]}},props:{mode:{type:String,default:"date"},showValue:String,startYear:{type:[Number,String],default:1949},endYear:{type:[String,Number],default:(new Date).getFullYear()}},watch:{showValue:function(t){this.init()}},created:function(){this.init()},methods:{init:function(){var t;this.range=[],this.value=[],n=r.getLocalTime(this.mode),this.showValue&&(n=this.showValue),r.checkShowValue(this.mode,n),t="dateTime"==this.mode?6:3;for(var e=0;e<t;e++)this.range.push([]),this.value.push(0),this.setColumns(e)},setColumns:function(t){var e=this.mode;if("time"!=e){var a=n.substring(0,4),i=n.substring(5,7),o=n.substring(8,10);switch(t){case 0:for(var s=+this.startYear,u=+this.endYear,l=s;l<u+1;l++)this.range[t].push(l+"年");this.value[t]=this.range[t].indexOf(a+"年");break;case 1:this.range[t]=r.getArr(1),this.value[t]=this.range[t].indexOf(i+"月");break;case 2:this.range[t]=r.getDayArr(+a,+i),this.value[t]=this.range[t].indexOf(o+"日");break;case 3:var c=n.substring(11,13);this.range[t]=r.getArr(3),this.value[t]=this.range[t].indexOf(c+"时");break;case 4:var d=n.substring(14,16);this.range[t]=r.getArr(4),this.value[t]=this.range[t].indexOf(d+"分");break;case 5:var f=n.substring(17,19);this.range[t]=r.getArr(5),this.value[t]=this.range[t].indexOf(f+"秒");break}}else switch(t){case 0:var p=n.substring(0,2);this.range[t]=r.getArr(3),this.value[t]=this.range[t].indexOf(p+"时");break;case 1:var m=n.substring(3,5);this.range[t]=r.getArr(4),this.value[t]=this.range[t].indexOf(m+"分");break;case 2:var v=n.substring(6,8);this.range[t]=r.getArr(5),this.value[t]=this.range[t].indexOf(v+"秒");break}this.$forceUpdate()},columnchange:function(t){if("time"!=this.mode){var e=t.detail.column,a=t.detail.value;1!=e&&e||(this.value[e]=a);var i=parseInt(this.range[0][this.value[0]]),n=parseInt(this.range[1][this.value[1]]);this.range[2]=r.getDayArr(i,n),this.$forceUpdate()}},change:function(t){var e=this,a=t.detail.value,i=a.map((function(t,a){return e.range[a][t]}));console.log(i),this.$emit("change",r.getDateTimeValue(i,this.mode))}}};e.default=o},b518:function(t,e,a){var i=a("eb7b");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("5ade16f0",i,!0,{sourceMap:!1,shadowMode:!1})},b9e3:function(t,e,a){"use strict";a.r(e);var i=a("569d"),n=a("61d4");for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("4b6a");var o,s=a("f0c5"),u=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"36665f4b",null,!1,i["a"],o);e["default"]=u.exports},bb2f:function(t,e,a){var i=a("d039");t.exports=!i((function(){return Object.isExtensible(Object.preventExtensions({}))}))},d113:function(t,e,a){"use strict";a.r(e);var i=a("7307"),n=a("588d");for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);var o,s=a("f0c5"),u=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);e["default"]=u.exports},d441:function(t,e,a){"use strict";a.r(e);var i=a("fa5f"),n=a("2d19");for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("53bc");var o,s=a("f0c5"),u=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"33b3e770",null,!1,i["a"],o);e["default"]=u.exports},d7ff:function(t,e,a){var i=a("09fe");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("0176588c",i,!0,{sourceMap:!1,shadowMode:!1})},d9d5:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"UniPopup",props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},maskClick:{type:Boolean,default:!0},show:{type:Boolean,default:!0}},data:function(){return{ani:"",showPopup:!1}},watch:{show:function(t){t?this.open():this.close()}},created:function(){},methods:{clear:function(){},open:function(){var t=this;this.$emit("change",{show:!0}),this.showPopup=!0,this.$nextTick((function(){setTimeout((function(){t.ani="uni-"+t.type}),100)}))},close:function(t){var e=this;!this.maskClick&&t||(this.$emit("change",{show:!1}),this.ani="",this.$nextTick((function(){setTimeout((function(){e.showPopup=!1}),300)})))}}};e.default=i},eb7b:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".uni-input[data-v-36665f4b],.title[data-v-36665f4b]{padding:7px 12px;background:#f7f7f7}.title[data-v-36665f4b]{font-weight:700}.picker[data-v-36665f4b]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.hidden[data-v-36665f4b]{display:none}.button-sp-area[data-v-36665f4b]{margin:30px auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.mini-btn[data-v-36665f4b]{margin-right:%?10?%;margin:0 %?5?%}.cui-btn-1[data-v-36665f4b]{background-color:#0a98d5;color:#fff}.cui-btn-2[data-v-36665f4b]{background-color:#fa0;color:#fff}.textTile[data-v-36665f4b]{\r\n\t\t/*borde r-left:3px solid #007AFF;\r\n\t\tline-height: 18px;\r\n\t\tpaddin g-left: 10px;*/margin:20px 0 10px 0;margib-left:20px;color:#999;text-align:center}.red[data-v-36665f4b]{color:#f33}.filetitlee[data-v-36665f4b]{font-weight:700}.carbtn[data-v-36665f4b]{font-size:%?28?%;border-radius:0;border:0}.uni-list-cell[data-v-36665f4b]{-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.loading-more[data-v-36665f4b]{-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding-top:10px;padding-bottom:10px;text-align:center}.loading-more-text[data-v-36665f4b]{font-size:%?28?%;color:#999}\r\n\t/* 提示窗口 */.uni-tip[data-v-36665f4b]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;\r\npadding:15px;width:300px;background-color:#fff;border-radius:10px}.uni-tip-title[data-v-36665f4b]{text-align:center;font-weight:700;font-size:16px;color:#333}.uni-tip-content[data-v-36665f4b]{\r\n\t\t/* padding: 15px;\r\n*/font-size:14px;color:#666;height:%?550?%}.uni-tip-group-button[data-v-36665f4b]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\r\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;padding-top:20px;border-top:%?1?% solid #ddd}.uni-tip-button[data-v-36665f4b]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;font-size:14px;color:#3b4144}",""]),t.exports=e},f183:function(t,e,a){var i=a("d012"),n=a("861d"),r=a("5135"),o=a("9bf2").f,s=a("90e3"),u=a("bb2f"),l=s("meta"),c=0,d=Object.isExtensible||function(){return!0},f=function(t){o(t,l,{value:{objectID:"O"+ ++c,weakData:{}}})},p=function(t,e){if(!n(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!r(t,l)){if(!d(t))return"F";if(!e)return"E";f(t)}return t[l].objectID},m=function(t,e){if(!r(t,l)){if(!d(t))return!0;if(!e)return!1;f(t)}return t[l].weakData},v=function(t){return u&&h.REQUIRED&&d(t)&&!r(t,l)&&f(t),t},h=t.exports={REQUIRED:!1,fastKey:p,getWeakData:m,onFreeze:v};i[l]=!0},fa5f:function(t,e,a){"use strict";var i,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.showPopup?a("v-uni-view",{staticClass:"uni-popup",on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"uni-popup__mask",class:[t.ani+"-mask",t.animation?"mask-ani":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close(!0)}}}),a("v-uni-view",{staticClass:"uni-popup__wrapper",class:[t.type,t.ani+"-content",t.animation?"content-ani":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close(!0)}}},[a("v-uni-view",{staticClass:"uni-popup__wrapper-box",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[t._t("default")],2)],1)],1):t._e()},r=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return i}))}}]);