(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reg/reg"],{"01ab":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var a=function(){var t=this,n=t.$createElement;t._self._c},u=[]},"0832":function(t,n,e){"use strict";(function(t){e("8485");o(e("66fd"));var n=o(e("9439"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"1bb1":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(e("05b7"));function a(t){return t&&t.__esModule?t:{default:t}}var u=function(){e.e("components/m-input").then(function(){return resolve(e("81184"))}.bind(null,e)).catch(e.oe)},i={components:{mInput:u},data:function(){return{account:"",password:"",email:""}},methods:{register:function(){if(this.account.length<5)t.showToast({icon:"none",title:"账号最短为 5 个字符"});else if(this.password.length<6)t.showToast({icon:"none",title:"密码最短为 6 个字符"});else if(this.email.length<3||!~this.email.indexOf("@"))t.showToast({icon:"none",title:"邮箱地址不合法"});else{var n={account:this.account,password:this.password,email:this.email};o.default.addUser(n),t.showToast({title:"注册成功"}),t.navigateBack({delta:1})}}}};n.default=i}).call(this,e("543d")["default"])},"7be8":function(t,n,e){"use strict";e.r(n);var o=e("1bb1"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=a.a},9439:function(t,n,e){"use strict";e.r(n);var o=e("01ab"),a=e("7be8");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);var i,c=e("f0c5"),r=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=r.exports}},[["0832","common/runtime","common/vendor"]]]);