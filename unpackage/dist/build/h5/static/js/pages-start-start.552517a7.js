(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-start-start"],{"0db5":function(t,e,a){"use strict";var i,s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"start"},[a("v-uni-scroll-view",{staticClass:"scroll-v list",attrs:{"lower-threshold":"200",enableBackToTop:"true","scroll-y":"true"},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.loadMore.apply(void 0,arguments)}}},[t.newsList.isLoading||0==t.newsList.data.length?a("v-uni-view",{staticClass:"loading-more"},[a("v-uni-text",{staticClass:"loading-more-text"},[t._v(t._s(t.newsList.noneText))])],1):t._e(),t._l(t.newsList.data,(function(e,i){return a("v-uni-view",{key:e.idx,staticClass:"uni-list-cell ",on:{close:function(e){arguments[0]=e=t.$handleEvent(e),t.close(i)}}},[a("v-uni-view",{staticClass:"uni-media-list "},[a("v-uni-view",{staticClass:"uni-media-list-body "},[a("v-uni-view",{staticClass:"uni-media-list-text-top",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.goDetail(e)}}},[t._v(t._s(t.getDictV(t.dictProType,e.type))),a("v-uni-text",{staticClass:"active-text"},[t._v("("+t._s(t.getDictV(t.statusV,e.status))+")")])],1),a("v-uni-view",{staticClass:"uni-media-list-text-bottom "},[a("v-uni-text",[t._v("发起人："+t._s(e.userName))]),a("v-uni-text",{staticClass:"mini-text"},[t._v(t._s(e.createTime))])],1)],1)],1)],1)})),t.newsList.isLoading||t.newsList.data.length>9?a("v-uni-view",{staticClass:"loading-more"},[a("v-uni-text",{staticClass:"loading-more-text"},[t._v(t._s(t.newsList.loadingText))])],1):t._e()],2)],1)},n=[];a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}))},1792:function(t,e,a){"use strict";a.r(e);var i=a("2af0"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=s.a},"2af0":function(t,e,a){"use strict";a("99af"),a("d3b7"),a("25f0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{user:{},newsList:{data:[],isLoading:!1,refreshText:"",loadingText:"加载更多...",noneText:"加载中.....",total:0,pageSize:10},tabBars:{name:"催办",id:"c001",url:"/oa/MyApplied/phoneList",pageNum:1},scrollInto:"",navigateFlag:!1,pulling:!1,refreshIcon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg==",dictProType:[],statusV:[]}},onReady:function(){var t=this;this.urlRequestPost("/phoneIndexData","",null,(function(e){console.log(e),(e.statusCode="200")&&(t.user=e.data.user)})),this.dictValue("oa_examine_type").then((function(e){t.dictProType=e})),this.dictValue("oa_leave_status").then((function(e){t.statusV=e})),this.getList()},methods:{getList:function(){this.serverList(this.tabBars.url)},serverList:function(t){var e=this.newsList,a=this;console.log("start"),this.urlRequestPost(t,{pageSize:this.newsList.pageSize,pageNum:this.tabBars.pageNum,orderBy:"create_time desc"},null,(function(t){if(0!=t.data.rows.length){a.newsList.noneText="加载中.....";for(var i=[],s=0;s<t.data.rows.length;s++){var n=t.data.rows[s];n.idx=a.newGuid(),i.push(n)}a.tabBars.pageNum<=1?e.data=i:e.data=e.data.concat(i),a.newsList.total=t.data.total,console.log(a.newsList.data)}else a.newsList.noneText="暂无数据!"}))},loadMore:function(){var t=this;setTimeout((function(){console.log("..."),console.log(t.newsList.total);var e=Math.ceil(t.newsList.total/t.newsList.pageSize);console.log(e),t.tabBars.pageNum<e?(t.tabBars.pageNum++,t.getList()):t.newsList.loadingText="没有数据了！"}),500)},goDetail:function(t){var e=this,a="";if(!this.navigateFlag){switch(this.navigateFlag=!0,t.type){case"1":case"11":case"12":a="../oa/leave/leave";break;case"0":a="../oa/travel/travel";break;case"200":a="../oa/outgoing/outgoing";break;case"210":a="../oa/supplyCard/supplyCard";break;case"220":a="../oa/overtime/overtime";break;case"3":a="../oa/reimbursement/reimbursement";break;case"2":case"21":a="../oa/purchase/purchase";break;case"5":case"51":case"52":case"53":case"54":a="../oa/sealApply/sealApply";break;case"4":case"41":a="../oa/carApply/carApply";break}uni.navigateTo({url:a+"?edit=1&id="+t.id}),setTimeout((function(){e.navigateFlag=!1}),200)}},clearTabData:function(t){this.newsList.data.length=0,this.newsList.loadingText="加载更多..."},refreshData:function(){},onrefresh:function(t){var e=this,a=this.newsList;a.refreshFlag&&(a.refreshing=!0,a.refreshText="正在刷新...",setTimeout((function(){e.refreshData(),e.pulling=!0,a.refreshing=!1,a.refreshFlag=!1,a.refreshText="已刷新",setTimeout((function(){e.pulling=!1}),500)}),2e3))},onpullingdown:function(t){var e=this.newsList;e.refreshing||this.pulling||(Math.abs(t.pullingDistance)>Math.abs(t.viewHeight)?(e.refreshFlag=!0,e.refreshText="释放立即刷新"):(e.refreshFlag=!1,e.refreshText="下拉可以刷新"))},newGuid:function(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return(t()+t()+"-"+t()+"-4"+t().substr(0,3)+"-"+t()+"-"+t()+t()+t()).toUpperCase()},getDictV:function(t,e){var a="";for(var i in t.data)t.data[i].dictValue==e&&(a=t.data[i].dictLabel);return a}}};e.default=i},"2ebf":function(t,e,a){"use strict";var i=a("8ea2"),s=a.n(i);s.a},"8ea2":function(t,e,a){var i=a("cd3e");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=a("4f06").default;s("d2f5786e",i,!0,{sourceMap:!1,shadowMode:!1})},b249:function(t,e,a){"use strict";a.r(e);var i=a("0db5"),s=a("1792");for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);a("2ebf");var o,r=a("f0c5"),l=Object(r["a"])(s["default"],i["b"],i["c"],!1,null,"c8080ab0",null,!1,i["a"],o);e["default"]=l.exports},cd3e:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,"\nuni-page-body[data-v-c8080ab0]{width:100%;min-height:100%;display:-webkit-box;display:-webkit-flex;display:flex;background:#f8f8f8}.start[data-v-c8080ab0]{width:100%;height:%?1800?%}\n.scroll-v[data-v-c8080ab0]{-webkit-box-flex:1;-webkit-flex:1;flex:1;width:100%;height:%?1800?%}.loading-icon[data-v-c8080ab0]{width:20px;height:20px;margin-right:5px;color:#999}.loading-more[data-v-c8080ab0]{-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding-top:10px;padding-bottom:10px;text-align:center}.loading-more-text[data-v-c8080ab0]{font-size:%?28?%;color:#999}.uni-media-list-body[data-v-c8080ab0]{height:auto;-webkit-justify-content:space-around;justify-content:space-around}.uni-media-list-text-top[data-v-c8080ab0]{height:%?74?%;font-size:%?28?%;overflow:hidden}.uni-media-list-text-bottom[data-v-c8080ab0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.mini-text[data-v-c8080ab0]{color:#a7a7a7}.active-text[data-v-c8080ab0]{color:#0faeff}.uni-media-list[data-v-c8080ab0]{width:100%;padding:%?35?% %?30?%}.uni-list-cell[data-v-c8080ab0]::after{width:100%;left:0}.uni-list-cell[data-v-c8080ab0]{height:%?180?%}body.?%PAGE?%[data-v-c8080ab0]{background:#f8f8f8}",""]),t.exports=e}}]);