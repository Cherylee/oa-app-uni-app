(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reg/reg"],{"0f9b":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("289b"));function a(t){return t&&t.__esModule?t:{default:t}}var u=function(){return n.e("components/m-input").then(n.bind(null,"ff4d"))},i={components:{mInput:u},data:function(){return{account:"",password:"",email:""}},methods:{register:function(){if(this.account.length<5)t.showToast({icon:"none",title:"账号最短为 5 个字符"});else if(this.password.length<6)t.showToast({icon:"none",title:"密码最短为 6 个字符"});else if(this.email.length<3||!~this.email.indexOf("@"))t.showToast({icon:"none",title:"邮箱地址不合法"});else{var e={account:this.account,password:this.password,email:this.email};o.default.addUser(e),t.showToast({title:"注册成功"}),t.navigateBack({delta:1})}}}};e.default=i}).call(this,n("6e42")["default"])},"12e8":function(t,e,n){"use strict";n.r(e);var o=n("e8d2"),a=n("c420");for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);var i=n("2877"),s=Object(i["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=s.exports},"715f":function(t,e,n){"use strict";(function(t){n("161f"),n("921b");o(n("66fd"));var e=o(n("12e8"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},c420:function(t,e,n){"use strict";n.r(e);var o=n("0f9b"),a=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);e["default"]=a.a},e8d2:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})}},[["715f","common/runtime","common/vendor"]]]);