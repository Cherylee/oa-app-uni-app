(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-oa-leave-leave"],{"10d1":function(t,e,a){"use strict";var n,i=a("da84"),r=a("e2cc"),s=a("f183"),o=a("6d61"),u=a("acac"),l=a("861d"),c=a("69f3").enforce,d=a("7f9a"),f=!i.ActiveXObject&&"ActiveXObject"in i,p=Object.isExtensible,v=function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}},m=t.exports=o("WeakMap",v,u);if(d&&f){n=u.getConstructor(v,"WeakMap",!0),s.REQUIRED=!0;var h=m.prototype,g=h["delete"],b=h.has,y=h.get,D=h.set;r(h,{delete:function(t){if(l(t)&&!p(t)){var e=c(this);return e.frozen||(e.frozen=new n),g.call(this,t)||e.frozen["delete"](t)}return g.call(this,t)},has:function(t){if(l(t)&&!p(t)){var e=c(this);return e.frozen||(e.frozen=new n),b.call(this,t)||e.frozen.has(t)}return b.call(this,t)},get:function(t){if(l(t)&&!p(t)){var e=c(this);return e.frozen||(e.frozen=new n),b.call(this,t)?y.call(this,t):e.frozen.get(t)}return y.call(this,t)},set:function(t,e){if(l(t)&&!p(t)){var a=c(this);a.frozen||(a.frozen=new n),b.call(this,t)?D.call(this,t,e):a.frozen.set(t,e)}else D.call(this,t,e);return this}})}},"13a2":function(t,e,a){"use strict";function n(t,e){for(var a=t%4==0&&t%100!=0&&t%400!=0,n=[31,a?29:28,31,30,31,30,31,31,30,31,30,31],i=[],s=0;s<n[e-1];s++)i.push(r(s+1)+"日");return i}function i(t){var e=[],a=1,n=13,i="月";t>2&&(a=0,3==t&&(n=24,i="时"),t>3&&(n=60,4==t&&(i="分"),5==t&&(i="秒")));for(var s=a;s<n;s++)e.push(r(s)+i);return e}function r(t){return t>9?t:"0"+t}function s(t,e){if("date"!=t&&"dateTime"!=t&&"time"!=t)throw Error("mode无"+t+"该选项配置");if("date"==t&&10!=e.length||"time"==t&&8!=e.length||"dateTime"==t&&19!=e.length)throw Error("'showValue'有误，请根据当前mode 正确设置格式")}function o(t,e){var a=r(parseInt(t[0])),n=r(parseInt(t[1])),i=r(parseInt(t[2])),s=r(parseInt(t[3])),o=r(parseInt(t[4])),u=r(parseInt(t[5]));return"date"==e?a+"-"+n+"-"+i:"dateTime"==e?a+"-"+n+"-"+i+" "+s+":"+o+":"+u:a+":"+n+":"+i}function u(t){var e=new Date;switch(t){case"dateTime":return e.getFullYear()+"-"+r(e.getMonth()+1)+"-"+r(e.getDate())+" "+r(e.getHours())+":"+r(e.getMinutes())+":"+r(e.getSeconds());case"time":return r(e.getHours())+":"+r(e.getMinutes())+":"+r(e.getSeconds());default:return e.getFullYear()+"-"+r(e.getMonth()+1)+"-"+r(e.getDate())}}a("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.getDayArr=n,e.getArr=i,e.checkShowValue=s,e.getDateTimeValue=o,e.getLocalTime=u},"17e6":function(t,e,a){"use strict";var n={ePicker:a("d113").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni-common-mt"},[a("v-uni-form",["1"==t.edit?a("v-uni-input",{staticClass:"hidden",model:{value:t.formData.leaveId,callback:function(e){t.$set(t.formData,"leaveId",e)},expression:"formData.leaveId"}}):t._e(),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("申请人")]),a("v-uni-input",{staticClass:"uni-input",attrs:{focus:!0,placeholder:"申请人",value:t.user.userName}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("申请公司")]),a("v-uni-input",{staticClass:"hidden",attrs:{name:"applyCompanyId"},model:{value:t.formData.applyCompanyId,callback:function(e){t.$set(t.formData,"applyCompanyId",e)},expression:"formData.applyCompanyId"}}),a("v-uni-input",{staticClass:"hidden",attrs:{name:"deptId"},model:{value:t.formData.deptId,callback:function(e){t.$set(t.formData,"deptId",e)},expression:"formData.deptId"}}),a("v-uni-picker",{staticClass:"picker",attrs:{mode:"multiSelector",value:t.multiIndex,range:t.multiArray},on:{columnchange:function(e){arguments[0]=e=t.$handleEvent(e),t.bindMultiPickerColumnChange.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"uni-input"},[t._v(t._s(t.multiArray[0][t.multiIndex[0]])+"，"+t._s(t.multiArray[1][t.multiIndex[1]])+"，"+t._s(t.multiArray[2][t.multiIndex[2]]))])],1)],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("请假起始时间")]),a("v-uni-input",{staticClass:"hidden",attrs:{name:"applyTimeFrom",focus:!0},model:{value:t.formData.applyTimeFrom,callback:function(e){t.$set(t.formData,"applyTimeFrom",e)},expression:"formData.applyTimeFrom"}}),a("e-picker",{staticClass:"uni-input",attrs:{mode:"dateTime",showValue:t.formData.applyTimeFrom?t.formData.applyTimeFrom:t.dateStart},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.changeStart.apply(void 0,arguments)}}},[t._v(t._s(t.formData.applyTimeFrom?t.formData.applyTimeFrom:t.dateStart))])],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("请假结束时间")]),a("v-uni-input",{staticClass:"hidden",attrs:{name:"applyTimeTo",focus:!0},model:{value:t.formData.applyTimeTo,callback:function(e){t.$set(t.formData,"applyTimeTo",e)},expression:"formData.applyTimeTo"}}),a("e-picker",{staticClass:"uni-input",attrs:{mode:"dateTime",showValue:t.formData.applyTimeTo?t.formData.applyTimeTo:t.dateEnd},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.changeEnd.apply(void 0,arguments)}}},[t._v(t._s(t.formData.applyTimeTo?t.formData.applyTimeTo:t.dateEnd))])],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("请假时长")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"leaveDays",disabled:"true",focus:!0,placeholder:"请假时长"},model:{value:t.formData.leaveDays,callback:function(e){t.$set(t.formData,"leaveDays",e)},expression:"formData.leaveDays"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("请假类别")]),a("v-uni-input",{staticClass:"hidden",attrs:{name:"leaveType",focus:!0},model:{value:t.formData.leaveType,callback:function(e){t.$set(t.formData,"leaveType",e)},expression:"formData.leaveType"}}),a("v-uni-picker",{staticClass:"picker",attrs:{value:t.index,range:t.leaveType,"range-key":"dictLabel"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.bindPickerChange.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"uni-input"},[t._v(t._s((t.leaveType[t.index]?t.leaveType[t.index]:{}).dictLabel))])],1)],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("剩余年假")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"yearHoliday",focus:!0,placeholder:"剩余年假",disabled:"true"},model:{value:t.user.yearHoliday,callback:function(e){t.$set(t.user,"yearHoliday",e)},expression:"user.yearHoliday"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[a("span",{staticClass:"red"},[t._v("*")]),t._v("请假事由")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"leaveReason",focus:!0,placeholder:"请假事由"},model:{value:t.formData.leaveReason,callback:function(e){t.$set(t.formData,"leaveReason",e)},expression:"formData.leaveReason"}})],1),a("v-uni-view",{staticClass:"uni-form-item uni-row"},[a("v-uni-view",{staticClass:"title"},[t._v("备注")]),a("v-uni-input",{staticClass:"uni-input",attrs:{name:"remark",focus:!0,placeholder:"备注"},model:{value:t.formData.remark,callback:function(e){t.$set(t.formData,"remark",e)},expression:"formData.remark"}})],1),a("v-uni-view",{staticClass:"button-sp-area"},["99"==t.formData.status||""==t.formData.status?a("v-uni-button",{staticClass:"mini-btn",attrs:{type:"info",size:"mini",loading:t.loading1},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit("0")}}},[t._v("保存草稿")]):t._e(),"99"==t.formData.status||""==t.formData.status?a("v-uni-button",{staticClass:"mini-btn",attrs:{type:"primary",loading:t.loading2,size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit("1")}}},[t._v("提交")]):t._e(),"3"==t.formData.status?a("v-uni-button",{staticClass:"mini-btn",attrs:{type:"primary",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submitHandler("2")}}},[t._v("提交")]):t._e(),""!=t.formData.status&&"2"!=t.formData.status&&"16"!=t.formData.status&&"99"!=t.formData.status?a("v-uni-button",{staticClass:"mini-btn cui-btn-2",attrs:{type:"info",loading:t.loading3,size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.urge()}}},[t._v("催办")]):t._e(),"99"!=t.formData.status&&""!=t.formData.status?a("v-uni-button",{staticClass:"mini-btn cui-btn-1",attrs:{type:"info",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.send()}}},[t._v("抄送")]):t._e()],1)],1),"1"==t.edit&&t.procInstId?a("uni-process",{attrs:{baseUrl:t.baseUrl,procInstId:t.procInstId,id:t.id}}):t._e()],1)},r=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}))},2018:function(t,e,a){var n=a("9a9e");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("94c18724",n,!0,{sourceMap:!1,shadowMode:!1})},"4a46":function(t,e,a){a("e260"),a("e439"),a("d3b7"),a("3ca3"),a("10d1"),a("ddb0");var n=a("62f5");function i(){if("function"!==typeof WeakMap)return null;var t=new WeakMap;return i=function(){return t},t}function r(t){if(t&&t.__esModule)return t;if(null===t||"object"!==n(t)&&"function"!==typeof t)return{default:t};var e=i();if(e&&e.has(t))return e.get(t);var a={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in t)if(Object.prototype.hasOwnProperty.call(t,s)){var o=r?Object.getOwnPropertyDescriptor(t,s):null;o&&(o.get||o.set)?Object.defineProperty(a,s,o):a[s]=t[s]}return a["default"]=t,e&&e.set(t,a),a}t.exports=r},"588d":function(t,e,a){"use strict";a.r(e);var n=a("b471"),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},"62f5":function(t,e,a){function n(e){return"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}a("a4d3"),a("e01a"),a("d28b"),a("e260"),a("d3b7"),a("3ca3"),a("ddb0"),t.exports=n},"6d61":function(t,e,a){"use strict";var n=a("23e7"),i=a("da84"),r=a("94ca"),s=a("6eeb"),o=a("f183"),u=a("2266"),l=a("19aa"),c=a("861d"),d=a("d039"),f=a("1c7e"),p=a("d44e"),v=a("7156");t.exports=function(t,e,a){var m=-1!==t.indexOf("Map"),h=-1!==t.indexOf("Weak"),g=m?"set":"add",b=i[t],y=b&&b.prototype,D=b,w={},T=function(t){var e=y[t];s(y,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(h&&!c(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return h&&!c(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(h&&!c(t))&&e.call(this,0===t?0:t)}:function(t,a){return e.call(this,0===t?0:t,a),this})};if(r(t,"function"!=typeof b||!(h||y.forEach&&!d((function(){(new b).entries().next()})))))D=a.getConstructor(e,t,m,g),o.REQUIRED=!0;else if(r(t,!0)){var k=new D,x=k[g](h?{}:-0,1)!=k,C=d((function(){k.has(1)})),I=f((function(t){new b(t)})),_=!h&&d((function(){var t=new b,e=5;while(e--)t[g](e,e);return!t.has(-0)}));I||(D=e((function(e,a){l(e,D,t);var n=v(new b,e,D);return void 0!=a&&u(a,n[g],n,m),n})),D.prototype=y,y.constructor=D),(C||_)&&(T("delete"),T("has"),m&&T("get")),(_||x)&&T(g),h&&y.clear&&delete y.clear}return w[t]=D,n({global:!0,forced:D!=b},w),p(D,t),h||a.setStrong(D,t,m),D}},7307:function(t,e,a){"use strict";var n,i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"e-picker"},[a("v-uni-picker",{attrs:{mode:"multiSelector",range:t.range,value:t.value},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)},columnchange:function(e){arguments[0]=e=t.$handleEvent(e),t.columnchange.apply(void 0,arguments)}}},[t._t("default")],2)],1)},r=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}))},"742b":function(t,e,a){"use strict";a.r(e);var n=a("cf2e"),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},"9a9e":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,".uni-input[data-v-bb78d3c4],.title[data-v-bb78d3c4]{padding:7px 12px;background:#f7f7f7}.title[data-v-bb78d3c4]{font-weight:700}.picker[data-v-bb78d3c4]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.hidden[data-v-bb78d3c4]{display:none}.button-sp-area[data-v-bb78d3c4]{margin:30px auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.mini-btn[data-v-bb78d3c4]{margin-right:%?10?%;margin:0 %?5?%}.cui-btn-1[data-v-bb78d3c4]{background-color:#0a98d5;color:#fff}.cui-btn-2[data-v-bb78d3c4]{background-color:#fa0;color:#fff}.textTile[data-v-bb78d3c4]{\r\n\t\t/*borde r-left:3px solid #007AFF;\r\n\t\tline-height: 18px;\r\n\t\tpaddin g-left: 10px;*/margin:20px 0 10px 0;margib-left:20px;color:#999;text-align:center}.red[data-v-bb78d3c4]{color:#f33}.filetitlee[data-v-bb78d3c4]{font-weight:700}",""]),t.exports=e},acac:function(t,e,a){"use strict";var n=a("e2cc"),i=a("f183").getWeakData,r=a("825a"),s=a("861d"),o=a("19aa"),u=a("2266"),l=a("b727"),c=a("5135"),d=a("69f3"),f=d.set,p=d.getterFor,v=l.find,m=l.findIndex,h=0,g=function(t){return t.frozen||(t.frozen=new b)},b=function(){this.entries=[]},y=function(t,e){return v(t.entries,(function(t){return t[0]===e}))};b.prototype={get:function(t){var e=y(this,t);if(e)return e[1]},has:function(t){return!!y(this,t)},set:function(t,e){var a=y(this,t);a?a[1]=e:this.entries.push([t,e])},delete:function(t){var e=m(this.entries,(function(e){return e[0]===t}));return~e&&this.entries.splice(e,1),!!~e}},t.exports={getConstructor:function(t,e,a,l){var d=t((function(t,n){o(t,d,e),f(t,{type:e,id:h++,frozen:void 0}),void 0!=n&&u(n,t[l],t,a)})),v=p(e),m=function(t,e,a){var n=v(t),s=i(r(e),!0);return!0===s?g(n).set(e,a):s[n.id]=a,t};return n(d.prototype,{delete:function(t){var e=v(this);if(!s(t))return!1;var a=i(t);return!0===a?g(e)["delete"](t):a&&c(a,e.id)&&delete a[e.id]},has:function(t){var e=v(this);if(!s(t))return!1;var a=i(t);return!0===a?g(e).has(t):a&&c(a,e.id)}}),n(d.prototype,a?{get:function(t){var e=v(this);if(s(t)){var a=i(t);return!0===a?g(e).get(t):a?a[e.id]:void 0}},set:function(t,e){return m(this,t,e)}}:{add:function(t){return m(this,t,!0)}}),d}}},b471:function(t,e,a){"use strict";var n=a("4a46");a("c975"),a("d81d"),a("a9e3"),a("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i,r=n(a("13a2")),s={name:"EPicker",data:function(){return{range:[],value:[]}},props:{mode:{type:String,default:"date"},showValue:String,startYear:{type:[Number,String],default:1949},endYear:{type:[String,Number],default:(new Date).getFullYear()}},watch:{showValue:function(t){this.init()}},created:function(){this.init()},methods:{init:function(){var t;this.range=[],this.value=[],i=r.getLocalTime(this.mode),this.showValue&&(i=this.showValue),r.checkShowValue(this.mode,i),t="dateTime"==this.mode?6:3;for(var e=0;e<t;e++)this.range.push([]),this.value.push(0),this.setColumns(e)},setColumns:function(t){var e=this.mode;if("time"!=e){var a=i.substring(0,4),n=i.substring(5,7),s=i.substring(8,10);switch(t){case 0:for(var o=+this.startYear,u=+this.endYear,l=o;l<u+1;l++)this.range[t].push(l+"年");this.value[t]=this.range[t].indexOf(a+"年");break;case 1:this.range[t]=r.getArr(1),this.value[t]=this.range[t].indexOf(n+"月");break;case 2:this.range[t]=r.getDayArr(+a,+n),this.value[t]=this.range[t].indexOf(s+"日");break;case 3:var c=i.substring(11,13);this.range[t]=r.getArr(3),this.value[t]=this.range[t].indexOf(c+"时");break;case 4:var d=i.substring(14,16);this.range[t]=r.getArr(4),this.value[t]=this.range[t].indexOf(d+"分");break;case 5:var f=i.substring(17,19);this.range[t]=r.getArr(5),this.value[t]=this.range[t].indexOf(f+"秒");break}}else switch(t){case 0:var p=i.substring(0,2);this.range[t]=r.getArr(3),this.value[t]=this.range[t].indexOf(p+"时");break;case 1:var v=i.substring(3,5);this.range[t]=r.getArr(4),this.value[t]=this.range[t].indexOf(v+"分");break;case 2:var m=i.substring(6,8);this.range[t]=r.getArr(5),this.value[t]=this.range[t].indexOf(m+"秒");break}this.$forceUpdate()},columnchange:function(t){if("time"!=this.mode){var e=t.detail.column,a=t.detail.value;1!=e&&e||(this.value[e]=a);var n=parseInt(this.range[0][this.value[0]]),i=parseInt(this.range[1][this.value[1]]);this.range[2]=r.getDayArr(n,i),this.$forceUpdate()}},change:function(t){var e=this,a=t.detail.value,n=a.map((function(t,a){return e.range[a][t]}));console.log(n),this.$emit("change",r.getDateTimeValue(n,this.mode))}}};e.default=s},bb2f:function(t,e,a){var n=a("d039");t.exports=!n((function(){return Object.isExtensible(Object.preventExtensions({}))}))},c032:function(t,e,a){"use strict";var n=a("2018"),i=a.n(n);i.a},c1cc:function(t,e,a){"use strict";a.r(e);var n=a("17e6"),i=a("742b");for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);a("c032");var s,o=a("f0c5"),u=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"bb78d3c4",null,!1,n["a"],s);e["default"]=u.exports},cf2e:function(t,e,a){"use strict";var n=a("ee27");a("a434"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("05b7")),r=n(a("541c")),s=n(a("d113")),o=n(a("8947")),u={components:{ePicker:s.default,uniProcess:o.default},data:function(){return{id:"",edit:"",user:{},formData:{leaveId:"",applyCompanyId:"",deptId:"",applyTimeFrom:i.default.getDate("dateTime"),applyTimeTo:i.default.getDate("dateTime"),leaveDays:0,leaveType:"0",yearHoliday:0,leaveReason:"",remark:"",status:""},baseUrl:"oa/oaLeave",addUrl:"oa/oaLeave/add",saveUrl:"oa/oaLeave/saveDraft",leaveType:[],index:0,date:i.default.getDate("dateTime"),dateStart:i.default.getDate("dateTime"),dateEnd:i.default.getDate("dateTime"),timeLimit:"",company:[],multiArray:[["百川"],[],[]],multiArrayId:[["100"],[],[]],multiIndex:[0,0,0],loading1:!1,loading2:!1,loading3:!1,procInstId:""}},onLoad:function(t){this.edit=t.edit||"";var e=this;this.id=t.id||"",this.urlRequestPost("/phoneIndexData","",null,(function(t){(t.statusCode="200")&&(e.user=t.data.user,e.$set(e.formData,"applyCompanyId",t.data.user.companyId),e.$set(e.formData,"deptId",t.data.user.deptId),e.urlRequestGet("system/dept/list?parentId=100","text/html;charset=UTF-8",(function(t){if(t.statusCode="200"){e.company=t.data;var a=[],n=[],i=0;for(var r in e.company)e.company[r].deptId==e.user.companyId&&(i=r),a.push(e.company[r].deptName),n.push(e.company[r].deptId);e.multiArray[1]=a,e.multiArrayId[1]=n,e.showDeptDetail(i)}})))})),this.dictValue("oa_leave_type").then((function(t){e.leaveType=t.data})),"1"==this.edit&&this.urlRequestGet("oa/oaLeave/phoneEdit/"+this.id,"text/html;charset=UTF-8",(function(t){this.listAssign(e.formData,t.data),e.index=e.returnIndex(e.leaveType,e.formData.leaveType),e.procInstId=t.data.procInstId}))},onReady:function(){},methods:{submit:function(t){var e=this,a="",n=[{name:"applyTimeFrom",checkType:"notnull",checkRule:"",errorMsg:"开始时间必填"},{name:"applyTimeTo",checkType:"notnull",checkRule:"",errorMsg:"结束时间必填"},{name:"leaveDays",checkType:"notnull",checkRule:"",errorMsg:"时长必填"},{name:"leaveType",checkType:"notnull",checkRule:"",errorMsg:"类别必填"},{name:"leaveReason",checkType:"notnull",checkRule:"",errorMsg:"理由必填"}],i=r.default.check(this.formData,n);if(i){switch(t){case"1":a=this.addUrl,this.loading2=!0;break;case"0":a=this.saveUrl,this.loading1=!0;break}this.urlRequestPost(a,this.formData,null,(function(t){e.loading1=!1,e.loading2=!1,uni.showToast({title:t.data.msg,icon:"none"}),"0"==t.data.code&&uni.reLaunch({url:"../../start/start"})}))}else uni.showToast({title:r.default.error,icon:"none"})},bindPickerChange:function(t){this.index=t.target.value,this.formData.leaveType=t.target.value},changeStart:function(t){this.formData.applyTimeFrom=t,this.showValue=t,this.dateStart=t,this.getTimeLimit(this.dateStart,this.dateEnd)},changeEnd:function(t){this.formData.applyTimeTo=t,this.showValue=t,this.dateEnd=t,this.getTimeLimit(this.dateStart,this.dateEnd)},getTimeLimit:function(t,e){var a=this,n={};n.startTime=t,n.endTime=e,this.urlRequestPost("oa/oaLeave/calculateHour",JSON.stringify(n),"application/json;charset=UTF-8",(function(t){console.log(t),"200"==t.data.retCode?a.$set(a.formData,"leaveDays",t.data.hours):uni.showToast({title:t.data.msg,icon:"none"})}))},returnIndex:function(t,e){var a="";for(var n in t)t[n].dictValue==e&&(a=n);return a},send:function(){uni.navigateTo({url:"../../send/send?id="+this.id+"&url="+this.baseUrl})},urge:function(){var t=this;this.loading3=!0,this.urlRequestGet(this.baseUrl+"/urge/"+this.id,null,(function(e){uni.showToast({title:e.data.msg,icon:"none"}),0==e.data.code&&(t.loading3=!1,uni.reLaunch({url:"../../start/start"}))}))},bindMultiPickerColumnChange:function(t){this.multiIndex[t.detail.column]=t.detail.value,1==t.detail.column&&this.showDeptDetail(t.detail.value),2==t.detail.column&&(this.formData.deptId=this_.multiArrayId[2][t.detail.value]),this.$forceUpdate()},showDeptDetail:function(t){var e=this;this.urlRequestGet("system/dept/list?parentId="+this.company[t].deptId,"text/html;charset=UTF-8",(function(a){if(a.data.code="0"){var n=[],i=[];for(var r in a.data)n.push(a.data[r].deptName),i.push(a.data[r].deptId);e.multiArray[2]=n,e.multiArrayId[2]=i,e.multiArray.splice(0,0),e.multiArrayId.splice(0,0),e.multiIndex[1]=t}}))}}};e.default=u},d113:function(t,e,a){"use strict";a.r(e);var n=a("7307"),i=a("588d");for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);var s,o=a("f0c5"),u=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=u.exports},f183:function(t,e,a){var n=a("d012"),i=a("861d"),r=a("5135"),s=a("9bf2").f,o=a("90e3"),u=a("bb2f"),l=o("meta"),c=0,d=Object.isExtensible||function(){return!0},f=function(t){s(t,l,{value:{objectID:"O"+ ++c,weakData:{}}})},p=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!r(t,l)){if(!d(t))return"F";if(!e)return"E";f(t)}return t[l].objectID},v=function(t,e){if(!r(t,l)){if(!d(t))return!0;if(!e)return!1;f(t)}return t[l].weakData},m=function(t){return u&&h.REQUIRED&&d(t)&&!r(t,l)&&f(t),t},h=t.exports={REQUIRED:!1,fastKey:p,getWeakData:v,onFreeze:m};n[l]=!0}}]);