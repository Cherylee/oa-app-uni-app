(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/work/work"],{"0b68":function(n,e,t){},"2de0":function(n,e,t){"use strict";t.d(e,"b",(function(){return i})),t.d(e,"c",(function(){return r})),t.d(e,"a",(function(){return u}));var u={uniGrid:function(){return t.e("components/uni-grid/uni-grid").then(t.bind(null,"dfdf"))},uniGridItem:function(){return t.e("components/uni-grid-item/uni-grid-item").then(t.bind(null,"4302"))}},i=function(){var n=this,e=n.$createElement;n._self._c},r=[]},"679f":function(n,e,t){"use strict";t.r(e);var u=t("9171"),i=t.n(u);for(var r in u)"default"!==r&&function(n){t.d(e,n,(function(){return u[n]}))}(r);e["default"]=i.a},"7fe0":function(n,e,t){"use strict";(function(n){t("8485");u(t("66fd"));var e=u(t("e7ea"));function u(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},9171:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=function(){t.e("components/uni-grid/uni-grid").then(function(){return resolve(t("dfdf"))}.bind(null,t)).catch(t.oe)},i=function(){t.e("components/uni-grid-item/uni-grid-item").then(function(){return resolve(t("4302"))}.bind(null,t)).catch(t.oe)},r=function(){Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(function(){return resolve(t("1581"))}.bind(null,t)).catch(t.oe)},o={components:{uniGrid:u,uniIcons:r,uniGridItem:i},data:function(){return{user:{},checked:!1,menus:[]}},onLoad:function(){var n=this;this.urlRequestPost("/phoneIndexData","",null,(function(e){if(e.data.menus){for(var t in e.data.menus)"M"==e.data.menus[t].menuType&&e.data.menus[t].remark&&n.menus.push({menuName:e.data.menus[t].menuName,remark:e.data.menus[t].remark,menuId:e.data.menus[t].menuId,menusList:[]});for(var u in e.data.menus)for(var i in n.menus)if(e.data.menus[u].parentId==n.menus[i].menuId){var r={name:"iconfont "+e.data.menus[u].perms,text:e.data.menus[u].menuName,url:".."+e.data.menus[u].url,color:e.data.menus[u].remark};n.menus[i].menusList.push(r)}console.log(n.menus)}}))},methods:{gotoAdd:function(e,t){n.navigateTo({url:this.menus[e].menusList[t].url+"?edit=0"})}}};e.default=o}).call(this,t("543d")["default"])},e7ea:function(n,e,t){"use strict";t.r(e);var u=t("2de0"),i=t("679f");for(var r in i)"default"!==r&&function(n){t.d(e,n,(function(){return i[n]}))}(r);t("fd6b");var o,a=t("f0c5"),d=Object(a["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);e["default"]=d.exports},fd6b:function(n,e,t){"use strict";var u=t("0b68"),i=t.n(u);i.a}},[["7fe0","common/runtime","common/vendor"]]]);