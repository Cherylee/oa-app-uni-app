(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/settingList/settingList"],{"058a":function(t,n,e){},"58a7":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{user:{},newsList:[],tabBars:{name:"打卡设置台账",id:"c001",url:"/oa/oaAttendanceConfig/list",pageNum:1}}},onReady:function(){this.getList()},methods:{getList:function(){this.serverList(this.tabBars.url)},serverList:function(t){var n=this;this.urlRequestPost(t,"",null,(function(t){if(console.log(t),0!=t.data.rows.length){for(var e=[],a=0;a<t.data.rows.length;a++){var i=t.data.rows[a];e.push(i)}n.newsList=e}else n.newsList.noneText="暂无数据!"}))},goDetail:function(n){var e=this;this.navigateFlag||(this.navigateFlag=!0,t.navigateTo({url:"../setting/setting?edit=1&id="+n.id}),setTimeout((function(){e.navigateFlag=!1}),200))}}};n.default=e}).call(this,e("543d")["default"])},"90e2":function(t,n,e){"use strict";(function(t){e("8485");a(e("66fd"));var n=a(e("c169"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},a0ac:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}));var i=function(){var t=this,n=t.$createElement;t._self._c},u=[]},a584:function(t,n,e){"use strict";var a=e("058a"),i=e.n(a);i.a},c169:function(t,n,e){"use strict";e.r(n);var a=e("a0ac"),i=e("efac");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("a584");var s,r=e("f0c5"),o=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);n["default"]=o.exports},efac:function(t,n,e){"use strict";e.r(n);var a=e("58a7"),i=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=i.a}},[["90e2","common/runtime","common/vendor"]]]);