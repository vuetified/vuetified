webpackJsonp([8],{"/jP/":function(t,e,n){(t.exports=n("FZ+f")(void 0)).push([t.i,"",""])},"4RzX":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list",t._l(t.items,function(e){return n("v-list-group",{key:e.title},[n("v-list-tile",{attrs:{slot:"item"},slot:"item"},[e.avatar?n("v-avatar",{attrs:{size:"25px"}},[n("img",{attrs:{src:e.avatar,alt:""}})]):n("v-list-tile-action",[n("v-icon",[t._v(t._s(e.action))])],1),t._v(" "),t.isDark?n("v-list-tile-content",[n("v-list-tile-title",{class:{"primary--text":e.active,"text--lighten-2":e.active}},[t._v(t._s(e.title))])],1):n("v-list-tile-content",[n("v-list-tile-title",{class:{"primary--text":e.active,"blue-grey--text":!e.active,"text--lighten-1":!e.active}},[t._v(t._s(e.title))])],1),t._v(" "),n("v-list-tile-action",[n("v-icon",{class:{"primary--text":!t.isDark,"white--text":t.isDark}},[t._v("keyboard_arrow_down")])],1)],1),t._v(" "),t._l(e.items,function(e){return n("v-link",{key:e.id,attrs:{dark:t.isDark,title:e.title,avatar:e.avatar,icon:e.action,href:e.href}})})],2)}))},staticRenderFns:[]}},"55du":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7/uR"),r=n.n(o);e.default={components:{VLink:r.a},props:{items:{type:Array,required:!0}},data:function(){return{dark:App.theme.dark}},methods:{loadview:function(t,e){this.$router.push({path:""+e.href})},hasAvatar:function(t){return void 0!==t.avatar},loadAvatar:function(t){return t||"https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"},isGroupActive:function(t){var e="",n="";void 0!==t.href&&(e=t.href.split("/")[1],n=window.location.pathname.split("/")[1],t.active=e===n)},isActive:function(t){void 0!==t.href&&(t.href===window.location.pathname?t.active=!0:t.active=!1)}},computed:{isDark:function(){return!0===this.dark}}}},"5F6O":function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("v-footer",{attrs:{dark:this.darkClass}},[e("v-spacer"),e("span",{staticClass:"primary--text"},[this._v("© "+this._s(this.year)+" "+this._s(this.domain)+" ® | "+this._s(this.trademark)+"™")]),e("v-spacer")],1)},staticRenderFns:[]}},"5t+f":function(t,e,n){var o=n("VU/8")(n("ldjn"),n("mOe1"),!1,null,null,null);t.exports=o.exports},"68cm":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("TuKa"),r=n("7/uR"),i=n.n(r);e.default={components:{VLink:i.a},mixins:[o.a],data:function(){return{footerClass:{"primary--text":!0}}},created:function(){var t=this;Bus.$on("footer-content-visible",function(e){t.contentVisible=e})}}},"7/uR":function(t,e,n){var o=n("VU/8")(n("obMv"),n("hJsB"),!1,function(t){n("ybsh")},"data-v-6edce990",null);t.exports=o.exports},"8SjZ":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main-layout",{class:[t.contentClass]},[n("v-container",{staticStyle:{"padding-top":"100px"},attrs:{fluid:"","grid-list-md":""}},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-breadcrumbs",{attrs:{light:""}},[n("v-icon",{attrs:{slot:"divider",color:"teal"},slot:"divider"},[t._v("\n          forward\n        ")]),t._v(" "),n("v-breadcrumbs-item",{attrs:{"active-class":"primary--text",disabled:!1,to:"/"}},[t._v("\n          Home\n        ")]),t._v(" "),n("v-breadcrumbs-item",{attrs:{disabled:!0}},[n("span",{staticClass:"blue-grey--text"},[t._v("Products")])])],1)],1),t._v(" "),n("v-layout",{attrs:{row:"",wrap:""}},t._l(t.products,function(e,o){return n("v-flex",{key:e.slug,attrs:{xs12:"",sm12:"",md3:"",lg3:"",xl3:"",index:o}},[n("v-card",[n("v-card-media",{attrs:{src:e.image,height:"200px"}},[n("v-container",{attrs:{"fill-height":"",fluid:""}},[n("v-layout",{attrs:{"fill-height":""}},[n("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[n("span",{staticClass:"body-2 white--text primary",domProps:{textContent:t._s(e.name)}})])],1)],1)],1),t._v(" "),n("v-card-actions",{staticClass:"accent"},[n("span",{staticClass:"body-2"},[t._v(t._s(t._f("currency")(e.price,t.currency)))]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{slot:"activator",flat:"",icon:"",color:"white"},nativeOn:{click:function(n){t.showProduct(e.slug)}},slot:"activator"},[n("v-icon",[t._v("fa-shopping-bag ")])],1)],1)],1)],1)})),t._v(" "),t.noPagination?n("v-layout",{attrs:{row:"",wrap:"",height:"50px"}}):n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("div",{staticClass:"text-xs-center"},[n("v-pagination",{attrs:{length:t.length,circle:""},model:{value:t.page,callback:function(e){t.page=t._n(e)},expression:"page"}})],1)]),t._v(" "),n("v-flex",{attrs:{xs12:"",height:"50px"}})],1)],1)],1)},staticRenderFns:[]}},AAlo:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("xvGj"),r=n.n(o);e.default={components:{CookieLaw:r.a}}},CZwO:function(t,e,n){var o=n("cqVg");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n("rjj0")("ec8cdfec",o,!0)},Dd8w:function(t,e,n){"use strict";e.__esModule=!0;var o=function(t){return t&&t.__esModule?t:{default:t}}(n("woOf"));e.default=o.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}},EP5y:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("Xxa5"),r=n.n(o),i=n("exGp"),a=n.n(i),s=n("Dd8w"),c=n.n(s),l=n("onlB"),u=n.n(l),d=n("TuKa"),f=n("NYxO"),p=Object(f.createNamespacedHelpers)("cart").mapGetters;e.default={components:{MainLayout:u.a},mixins:[d.a],props:{query:{type:Object,required:!0}},data:function(){return{contentClass:{grey:!0,"lighten-4":!0,"accent--text":!0},currency:"₱",products:[],links:{first:null,last:null,prev:null,next:null},meta:{current_page:1,from:0,last_page:0,path:null,per_page:0,to:0,total:0},page:1}},computed:c()({},p({getItems:"getItems"}),{length:function(){return Math.round(this.meta.total/this.meta.per_page)},noPagination:function(){return this.meta.total===this.meta.per_page||this.meta.per_page>this.meta.total}}),head:{title:function(){return{inner:"Products",separator:"-",complement:App.site.trademark}},meta:[{name:"application-name",content:App.site.trademark},{name:"description",content:App.site.description,id:"desc"},{property:"fb:app_id",content:App.site.fb_id},{property:"og:title",content:App.site.title},{property:"og:type",content:"website"},{property:"og:image",content:App.site.logo.url},{property:"og:description",content:App.site.description},{property:"og:site_name",content:App.site.trademark},{property:"og:locale",content:"en_US"},{property:"article:author",content:App.site.trademark}],link:[{rel:"canonical",href:window.location.href,id:"canonical"}]},watch:{products:{handler:function(){console.log("Products Array Updated")},deep:!0},page:function(t){this.page=t,this.$router.push({name:"product.index",query:{page:t}}),vm.$popup({message:"Product Page: "+this.page,backgroundColor:"#4db6ac",delay:5,color:"#fffffa"})},$route:"loadProducts"},created:function(){this.getProducts()},mounted:function(){this.page=parseInt(this.query.page)},methods:{showProduct:function(t){this.$router.push({name:"product.show",params:{slug:t}})},viewCart:function(){this.$router.push({name:"cart"})},getProducts:function(){var t=a()(r.a.mark(function t(){var e,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=this,n=e.$route.query.page||1,t.next=4,axios.get(route("api.product.index")+"/?page="+n).then(function(t){e.products=t.data.data,e.links=t.data.links,e.meta=t.data.meta}).catch(function(t){var e=t.errors,n=t.message;console.log(e),vm.$popup({message:n,backgroundColor:"#e57373",delay:5,color:"#fffffa"})});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),loadProducts:function(){var t=a()(r.a.mark(function t(){var e;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=this,t.next=3,axios.get(route("api.product.index")+"/?page="+e.page).then(function(t){e.products=t.data.data,e.links=t.data.links,e.meta=t.data.meta,vm.$popup({message:"Product Page: "+e.page,backgroundColor:"#4db6ac",delay:5,color:"#fffffa"})}).catch(function(t){var e=t.errors,n=t.message;console.log(e),vm.$popup({message:n,backgroundColor:"#e57373",delay:5,color:"#fffffa"})});case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}}},FMsd:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("Heog"),r=n.n(o),i=n("ockC"),a=n.n(i),s=n("5t+f"),c=n.n(s),l=n("Phfm"),u=n.n(l),d=n("oCdX"),f=n.n(d);e.default={components:{AppFooter:r.a,AppNavBar:a.a,LeftSideBar:c.a,FabButton:u.a,CookieLaw:f.a}}},Heog:function(t,e,n){var o=n("VU/8")(n("68cm"),n("5F6O"),!1,function(t){n("L5ba")},null,null);t.exports=o.exports},IpBO:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-speed-dial",{attrs:{top:t.top,bottom:t.bottom,right:t.right,left:t.left,direction:t.direction,hover:t.hover,transition:t.transition,absolute:t.absolute,fixed:t.fixed},model:{value:t.fab,callback:function(e){t.fab=e},expression:"fab"}},[n("v-btn",{class:[t.activeFab.class],attrs:{slot:"activator",dark:"",fab:"",hover:""},slot:"activator",model:{value:t.fab,callback:function(e){t.fab=e},expression:"fab"}},[n("v-icon",{staticClass:"white--text"},[t._v(t._s(t.activeFab.icon))]),t._v(" "),n("v-icon",{staticClass:"error--text"},[t._v("close")])],1),t._v(" "),t._l(t.buttons,function(e){return t.isVisible(e)?n("v-btn",{key:e.name,class:[e.class],attrs:{fab:"",dark:"",small:""},nativeOn:{click:function(n){t.navigate(e)}}},[n("v-icon",[t._v(t._s(e.icon))])],1):t._e()})],2)},staticRenderFns:[]}},L5ba:function(t,e,n){var o=n("gGBd");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n("rjj0")("7f4af8c2",o,!0)},Phfm:function(t,e,n){var o=n("VU/8")(n("Xf4s"),n("IpBO"),!1,null,null,null);t.exports=o.exports},R4wc:function(t,e,n){var o=n("kM2E");o(o.S+o.F,"Object",{assign:n("To3L")})},R6ZA:function(t,e,n){var o=n("VU/8")(n("55du"),n("4RzX"),!1,null,null,null);t.exports=o.exports},To3L:function(t,e,n){"use strict";var o=n("lktj"),r=n("1kS7"),i=n("NpIQ"),a=n("sB3e"),s=n("MU5D"),c=Object.assign;t.exports=!c||n("S82l")(function(){var t={},e={},n=Symbol(),o="abcdefghijklmnopqrst";return t[n]=7,o.split("").forEach(function(t){e[t]=t}),7!=c({},t)[n]||Object.keys(c({},e)).join("")!=o})?function(t,e){for(var n=a(t),c=arguments.length,l=1,u=r.f,d=i.f;c>l;)for(var f,p=s(arguments[l++]),v=u?o(p).concat(u(p)):o(p),h=v.length,m=0;h>m;)d.call(p,f=v[m++])&&(n[f]=p[f]);return n}:c},TuKa:function(t,e,n){"use strict";e.a={data:function(){return{darkClass:App.theme.dark,primaryClass:App.theme.primary,accentClass:App.theme.accent,secondaryClass:App.theme.secondary,infoClass:App.theme.info,warningClass:App.theme.warning,errorClass:App.theme.error,successClass:App.theme.success,toggleBarStyle:App.site.toggleBarStyle,titleStyle:App.site.titleStyle,navbarStyle:App.site.navbarStyle,footerStyle:App.site.footerStyle,sidebarStyle:App.site.sidebarStyle,domain:App.site.domain,year:(new Date).getFullYear(),trademark:App.site.trademark,logo:App.site.logo.url,logoStyle:{width:App.site.logo.width,height:App.site.logo.height},showLogo:App.site.logo.show,showIcon:App.site.icon.show,icon:App.site.icon.name?App.site.icon.name:null,iconColor:App.site.icon.color,title:App.site.trademark}},computed:{isDark:function(){return!0===this.darkClass}}}},V3tA:function(t,e,n){n("R4wc"),t.exports=n("FeBl").Object.assign},Xf4s:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("Dd8w"),r=n.n(o),i=n("NYxO"),a=Object(i.createNamespacedHelpers)("auth").mapGetters;e.default={data:function(){return{direction:"top",fixed:!0,fab:!1,hover:!1,top:!1,right:!0,bottom:!0,left:!1,absolute:!1,transition:"slide-y-reverse-transition",buttons:[{name:"home",href:"/",class:"indigo lighten-2",icon:"fa-home",requiresAuth:!1},{name:"dashboard",href:"/dashboard",class:"amber lighten-2",icon:"fa-shopping-bag",requiresAuth:!1},{name:"login",href:"/login",class:"success",icon:"fa-key",requiresAuth:!1},{name:"register",href:"/register",class:"info",icon:"fa-user-plus",requiresAuth:!1},{name:"logout",href:"/logout",class:"red lighten-2",icon:"fa-power-off",requiresAuth:!0},{name:"scroll-up",href:null,class:"blue-grey",icon:"flight_takeoff",requiresAuth:!1}],activeFab:{class:"primary",icon:"fa-rocket"}}},computed:r()({},a({getAuth:"getAuth"})),watch:{top:function(t){this.bottom=!t},right:function(t){this.left=!t},bottom:function(t){this.top=!t},left:function(t){this.right=!t}},methods:{navigate:function(t){var e=this;e.activeFab={class:t.class,icon:t.icon},setTimeout(function(){e.activeFab={class:"primary",icon:"fa-rocket"},null!==t.href?e.$router.push({path:""+t.href}):e.scrollToTop(300)},500)},scrollToTop:function(t){function e(i){(o+=Math.PI/(t/(i-r)))>=Math.PI&&window.scrollTo(0,0),0!==window.scrollY&&(window.scrollTo(0,Math.round(n+n*Math.cos(o))),r=i,window.requestAnimationFrame(e))}var n=window.scrollY/2,o=0,r=performance.now();window.requestAnimationFrame(e)},isVisible:function(t){return!1===t.requiresAuth&&"login"===t.name?!this.getAuth:!1===t.requiresAuth&&"register"===t.name?!this.getAuth:!0===t.requiresAuth?this.getAuth:!1===t.requiresAuth||void 0}}}},Z6W1:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("cookie-law",{attrs:{theme:"dark-lime","button-text":"Yes, I Understand This Site Uses Cookie."}},[e("div",{attrs:{slot:"message"},slot:"message"},[e("p",[this._v("This website uses cookies to ensure you get the best experience on our website.\n      "),e("span",[this._v("Read Our Cookie Terms and Usage For More Info:")]),this._v(" "),e("router-link",{attrs:{to:"/cookie-law-agreement"}},[this._v("Click here")])],1)])])},staticRenderFns:[]}},cqVg:function(t,e,n){(t.exports=n("FZ+f")(void 0)).push([t.i,"",""])},gGBd:function(t,e,n){(t.exports=n("FZ+f")(void 0)).push([t.i,"",""])},gMqU:function(t,e,n){var o=n("VU/8")(n("EP5y"),n("8SjZ"),!1,function(t){n("CZwO")},"data-v-0b515fc2",null);t.exports=o.exports},hJsB:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list-tile",{class:[{styleAvatar:t.avatarOn}],attrs:{avatar:t.avatarOn},nativeOn:{click:function(e){t.navigate(t.href)}}},[t.iconOn&&!t.avatarOn?n("v-list-tile-action",[n("v-icon",{style:{color:t.isActive?t.activeColor:t.iconColor,cursor:t.href?"pointer":""}},[t._v(t._s(t.icon))])],1):t._e(),t._v(" "),t.iconOn&&t.avatarOn?n("v-list-tile-avatar",[n("img",{attrs:{src:t.avatar,alt:""}})]):t._e(),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",{style:{color:t.isActive?t.activeColor:t.linkColor}},[n("span",{style:{cursor:t.href?"pointer":""}},[t._v(t._s(t.title))])])],1),t._v(" "),t.iconOn&&t.avatarOn?n("v-list-tile-action",[n("v-icon",{style:{color:t.isActive?t.activeColor:t.iconColor,cursor:t.href?"pointer":""}},[t._v(t._s(t.icon))])],1):t._e()],1)},staticRenderFns:[]}},hTDM:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-toolbar",{attrs:{color:"accent",dark:!t.isDark,dense:"",fixed:"","clipped-left":"",app:""}},[n("v-toolbar-side-icon",{nativeOn:{click:function(e){e.stopPropagation(),t.toggleDrawer()}}}),t._v(" "),t.extension?n("v-toolbar-title",{staticClass:"text-xs-center",attrs:{slot:"extension"},slot:"extension"},[t.showIcon?n("v-icon",{staticClass:"ml-3 hidden-md-and-down"},[t._v("\n      "+t._s(t.icon)+"\n    ")]):t._e(),t._v(" "),n("span",{staticClass:"hidden-md-and-down"},[t._v(t._s(t.title))])],1):n("v-toolbar-title",{staticClass:"text-xs-center"},[t.showIcon?n("v-icon",{staticClass:"ml-3 hidden-sm-and-down"},[t._v("\n      "+t._s(t.icon)+"\n    ")]):n("v-avatar",{staticClass:"hidden-sm-and-down",attrs:{slot:"activator",size:"50px"},slot:"activator"},[n("img",{attrs:{src:""+t.App.site.logo.url,alt:""}})]),t._v(" "),n("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.title))])],1),t._v(" "),n("v-spacer"),t._v(" "),t.showLogo?n("img",{staticClass:"hidden-md-and-up",style:[t.logoStyle],attrs:{src:t.logo,alt:"vuejs"}}):t._e(),t._v(" "),n("v-spacer"),t._v(" "),n("v-tooltip",{attrs:{left:""}},[n("v-btn",{attrs:{slot:"activator",flat:"",icon:"",color:"white"},on:{click:function(e){t.openCart()}},slot:"activator"},[n("v-badge",{attrs:{left:""}},[n("span",{attrs:{slot:"badge"},slot:"badge"},[t._v(t._s(t.count))]),t._v(" "),n("v-icon",[t._v("shopping_cart")])],1)],1),t._v(" "),n("span",[t._v("View | Cart")])],1)],1)},staticRenderFns:[]}},jguS:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("Dd8w"),r=n.n(o),i=n("TuKa"),a=n("NYxO"),s=Object(a.createNamespacedHelpers)("cart").mapState;e.default={mixins:[i.a],data:function(){return{extension:!1,count:0}},computed:r()({},s({getCount:"count"})),watch:{getCount:function(t){this.count=t}},created:function(){var t=this;Bus.$on("header-extension-visible",function(e){t.extension=e})},mounted:function(){this.count=this.getCount},methods:{openShoppingCart:function(){Bus.$emit("shopping-cart-open")},toggleDrawer:function(){Bus.$emit("toggleDrawer")},openCart:function(){this.$router.push({name:"cart"})}}}},kVW7:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("v-app",{attrs:{dark:this.App.theme.dark}},[e("left-side-bar"),this._v(" "),e("app-nav-bar"),this._v(" "),e("main",[e("v-container",{attrs:{transition:"slide-x-transition",fluid:"","pa-0":"","ma-0":""}},[this._t("default")],2)],1),this._v(" "),e("fab-button"),this._v(" "),e("cookie-law"),this._v(" "),e("app-footer")],1)},staticRenderFns:[]}},ldjn:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("Dd8w"),r=n.n(o),i=n("7/uR"),a=n.n(i),s=n("R6ZA"),c=n.n(s),l=n("TuKa"),u=n("NYxO"),d=Object(u.createNamespacedHelpers)("auth").mapGetters;e.default={components:{VLink:a.a,CategoryLink:c.a},mixins:[l.a],data:function(){return{drawer:!1,links:[],members:[],grouplinks:[]}},computed:r()({},d({getAuth:"getAuth",getMe:"getMe"})),mounted:function(){var t=this;Bus.$on("toggleDrawer",function(){t.drawer=!t.drawer}),t.fetchCategories(),t.fetchNavLinks()},methods:{fetchCategories:function(){this.grouplinks=App.grouplinks},fetchNavLinks:function(){this.links=App.menu}}}},mOe1:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-navigation-drawer",{staticClass:"secondary",attrs:{fixed:"",clipped:t.$vuetify.breakpoint.width>1264,"disable-resize-watcher":"","disable-route-watcher":"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",{attrs:{dense:""}},[t._l(t.links,function(e){return n("v-link",{key:e.id,attrs:{dark:t.darkClass,title:e.title,href:e.href,icon:e.action}})}),t._v(" "),n("v-link",{attrs:{dark:t.darkClass,title:"Company Profile",href:"/about",icon:"fa-building"}}),t._v(" "),n("v-link",{attrs:{dark:t.darkClass,title:"Support",href:"/support",icon:"fa-life-ring"}}),t._v(" "),n("v-link",{attrs:{dark:t.darkClass,title:"Products",href:"/products",icon:"fa-shopping-basket"}}),t._v(" "),n("v-link",{attrs:{dark:t.darkClass,title:"Categories",href:"/categories",icon:"fa-tag"}}),t._v(" "),n("category-link",{attrs:{dark:t.darkClass,items:t.grouplinks}}),t._v(" "),n("v-subheader",{class:{"blue-grey--text":!t.isDark,"text--lighten-1":!t.isDark,"white--text":t.isDark}},[t._v("Members Area")]),t._v(" "),t.getAuth&&t.getMe.isAdmin?n("v-link",{attrs:{dark:t.darkClass,title:"User Management",href:"/users",icon:"fa-users"}}):t._e(),t._v(" "),t.getAuth?n("v-link",{attrs:{dark:t.darkClass,title:"Dashboard",href:"/dashboard",icon:"dashboard"}}):t._e(),t._v(" "),t.getAuth?n("v-link",{attrs:{dark:t.darkClass,title:"Settings",href:"/settings",icon:"fa-cogs"}}):t._e(),t._v(" "),t.getAuth?n("v-link",{attrs:{dark:t.darkClass,title:"Logout",href:"/logout",icon:"power_settings_new"}}):t._e(),t._v(" "),t.getAuth?t._e():n("v-link",{attrs:{dark:t.darkClass,title:"Login",href:"/login",icon:"fa-key"}}),t._v(" "),t.getAuth?t._e():n("v-link",{attrs:{dark:t.darkClass,title:"Register",href:"/register",icon:"fa-user-plus"}})],2)],1)},staticRenderFns:[]}},nf7q:function(t,e,n){(t.exports=n("FZ+f")(void 0)).push([t.i,".styleAvatar[data-v-6edce990]{position:relative;margin-left:-55px}",""])},oCdX:function(t,e,n){var o=n("VU/8")(n("AAlo"),n("Z6W1"),!1,null,null,null);t.exports=o.exports},obMv:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{dark:{type:Boolean,default:function(){return App.theme.dark}},href:{type:String,required:!0},title:{type:String,required:!0},avatar:{type:String,default:function(){return""}},icon:{type:String,default:function(){return null}},iconColor:{type:String,default:function(){return this.dark?"#fafafa":"#78909C"}},linkColor:{type:String,default:function(){return this.dark?"#fafafa":"#78909C"}},activeColor:{type:String,default:function(){return"#4db6ac"}}},computed:{isActive:function(){return this.href===this.$route.path},isDark:function(){return!0===this.dark},avatarOn:function(){return!!this.avatar},iconOn:function(){return!!this.icon}},methods:{navigate:function(t){this.isURL(t)?window.open(t):this.$router.push({path:""+t})},isURL:function(t){var e=new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$","i");return t.length<2083&&e.test(t)}}}},ockC:function(t,e,n){var o=n("VU/8")(n("jguS"),n("hTDM"),!1,function(t){n("rTsB")},null,null);t.exports=o.exports},onlB:function(t,e,n){var o=n("VU/8")(n("FMsd"),n("kVW7"),!1,null,null,null);t.exports=o.exports},rTsB:function(t,e,n){var o=n("/jP/");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n("rjj0")("18158d65",o,!0)},rjj0:function(t,e,n){function o(t){for(var e=0;e<t.length;e++){var n=t[e],o=l[n.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](n.parts[r]);for(;r<n.parts.length;r++)o.parts.push(i(n.parts[r]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{var a=[];for(r=0;r<n.parts.length;r++)a.push(i(n.parts[r]));l[n.id]={id:n.id,refs:1,parts:a}}}}function r(){var t=document.createElement("style");return t.type="text/css",u.appendChild(t),t}function i(t){var e,n,o=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(o){if(p)return v;o.parentNode.removeChild(o)}if(h){var i=f++;o=d||(d=r()),e=a.bind(null,o,i,!1),n=a.bind(null,o,i,!0)}else o=r(),e=function(t,e){var n=e.css,o=e.media,r=e.sourceMap;o&&t.setAttribute("media",o);r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,o),n=function(){o.parentNode.removeChild(o)};return e(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;e(t=o)}else n()}}function a(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=m(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}var s="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!s)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n("tTVk"),l={},u=s&&(document.head||document.getElementsByTagName("head")[0]),d=null,f=0,p=!1,v=function(){},h="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n){p=n;var r=c(t,e);return o(r),function(e){for(var n=[],i=0;i<r.length;i++){var a=r[i];(s=l[a.id]).refs--,n.push(s)}e?o(r=c(t,e)):r=[];for(i=0;i<n.length;i++){var s;if(0===(s=n[i]).refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete l[s.id]}}}};var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},tTVk:function(t,e){t.exports=function(t,e){for(var n=[],o={},r=0;r<e.length;r++){var i=e[r],a=i[0],s={id:t+":"+r,css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(s):n.push(o[a]={id:a,parts:[s]})}return n}},woOf:function(t,e,n){t.exports={default:n("V3tA"),__esModule:!0}},xvGj:function(t,e,n){!function(e,n){t.exports=n()}(0,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){var o=!1,r=n(6)(n(7),n(8),function(t){o||n(1)},null,null);r.options.__file="/Users/jjuszczak/Projekte/Privat/vue-cookie-law/src/components/CookieLaw.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] CookieLaw.vue: functional components are not supported with templates, they should use render functions."),t.exports=r.exports},function(t,e,n){var o=n(2);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(4)("91c05312",o,!1)},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,"\n.Cookie {\n  position: fixed;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  z-index: 9999;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.Cookie > * {\n    margin: 0.9375rem 0;\n    -ms-flex-item-align: center;\n        align-self: center;\n}\n@media screen and (min-width: 48rem) {\n.Cookie {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-flow: row;\n              flex-flow: row;\n}\n.Cookie > * {\n        margin: 0;\n}\n}\n.Cookie--top {\n  top: 0;\n  left: 0;\n  right: 0;\n}\n.Cookie--bottom {\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.Cookie__buttons {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.Cookie__buttons > * {\n    margin: 0.3125rem 0;\n}\n@media screen and (min-width: 48rem) {\n.Cookie__buttons {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row;\n}\n.Cookie__buttons > * {\n        margin: 0 0.9375rem;\n}\n}\n.Cookie__button {\n  cursor: pointer;\n  -ms-flex-item-align: center;\n      align-self: center;\n}\n.Cookie--base {\n  background: #F1F1F1;\n  color: #232323;\n  padding: 1.250em;\n}\n.Cookie--base .Cookie__button {\n    background: #97D058;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 0;\n}\n.Cookie--base .Cookie__button:hover {\n      background: #7ebf36;\n}\n.Cookie--base--rounded {\n  background: #F1F1F1;\n  color: #232323;\n  padding: 1.250em;\n}\n.Cookie--base--rounded .Cookie__button {\n    background: #97D058;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 20px;\n}\n.Cookie--base--rounded .Cookie__button:hover {\n      background: #7ebf36;\n}\n.Cookie--blood-orange {\n  background: #424851;\n  color: #fff;\n  padding: 1.250em;\n}\n.Cookie--blood-orange .Cookie__button {\n    background: #E76A68;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 0;\n}\n.Cookie--blood-orange .Cookie__button:hover {\n      background: #e03f3c;\n}\n.Cookie--blood-orange--rounded {\n  background: #424851;\n  color: #fff;\n  padding: 1.250em;\n}\n.Cookie--blood-orange--rounded .Cookie__button {\n    background: #E76A68;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 20px;\n}\n.Cookie--blood-orange--rounded .Cookie__button:hover {\n      background: #e03f3c;\n}\n.Cookie--dark-lime {\n  background: #424851;\n  color: #fff;\n  padding: 1.250em;\n}\n.Cookie--dark-lime .Cookie__button {\n    background: #97D058;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 0;\n}\n.Cookie--dark-lime .Cookie__button:hover {\n      background: #7ebf36;\n}\n.Cookie--dark-lime--rounded {\n  background: #424851;\n  color: #fff;\n  padding: 1.250em;\n}\n.Cookie--dark-lime--rounded .Cookie__button {\n    background: #97D058;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 20px;\n}\n.Cookie--dark-lime--rounded .Cookie__button:hover {\n      background: #7ebf36;\n}\n.Cookie--royal {\n  background: #FBC227;\n  color: #232323;\n  padding: 1.250em;\n}\n.Cookie--royal .Cookie__button {\n    background: #726CEA;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 0;\n}\n.Cookie--royal .Cookie__button:hover {\n      background: #473fe4;\n}\n.Cookie--royal--rounded {\n  background: #FBC227;\n  color: #232323;\n  padding: 1.250em;\n}\n.Cookie--royal--rounded .Cookie__button {\n    background: #726CEA;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 20px;\n}\n.Cookie--royal--rounded .Cookie__button:hover {\n      background: #473fe4;\n}\n.slideFromTop-enter, .slideFromTop-leave-to {\n  -webkit-transform: translate(0px, -12.5em);\n          transform: translate(0px, -12.5em);\n}\n.slideFromTop-enter-to, .slideFromTop-leave {\n  -webkit-transform: translate(0px, 0px);\n          transform: translate(0px, 0px);\n}\n.slideFromBottom-enter, .slideFromBottom-leave-to {\n  -webkit-transform: translate(0px, 12.5em);\n          transform: translate(0px, 12.5em);\n}\n.slideFromBottom-enter-to, .slideFromBottom-leave {\n  -webkit-transform: translate(0px, 0px);\n          transform: translate(0px, 0px);\n}\n.slideFromBottom-enter-active,\n.slideFromBottom-leave-active,\n.slideFromTop-enter-active,\n.slideFromTop-leave-active {\n  -webkit-transition: -webkit-transform .4s ease-in;\n  transition: -webkit-transform .4s ease-in;\n  transition: transform .4s ease-in;\n  transition: transform .4s ease-in, -webkit-transform .4s ease-in;\n}\n.fade-enter-active, .fade-leave-active {\n  -webkit-transition: opacity .5s;\n  transition: opacity .5s;\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n",""])},function(t,e){function n(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var r=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(o),i=o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"});return[n].concat(i).concat([r]).join("\n")}return[n].join("\n")}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function o(t){for(var e=0;e<t.length;e++){var n=t[e],o=l[n.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](n.parts[r]);for(;r<n.parts.length;r++)o.parts.push(i(n.parts[r]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{var a=[];for(r=0;r<n.parts.length;r++)a.push(i(n.parts[r]));l[n.id]={id:n.id,refs:1,parts:a}}}}function r(){var t=document.createElement("style");return t.type="text/css",u.appendChild(t),t}function i(t){var e,n,o=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(o){if(p)return v;o.parentNode.removeChild(o)}if(h){var i=f++;o=d||(d=r()),e=a.bind(null,o,i,!1),n=a.bind(null,o,i,!0)}else o=r(),e=function(t,e){var n=e.css,o=e.media,r=e.sourceMap;o&&t.setAttribute("media",o);r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,o),n=function(){o.parentNode.removeChild(o)};return e(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;e(t=o)}else n()}}function a(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=m(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}var s="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!s)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(5),l={},u=s&&(document.head||document.getElementsByTagName("head")[0]),d=null,f=0,p=!1,v=function(){},h="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n){p=n;var r=c(t,e);return o(r),function(e){for(var n=[],i=0;i<r.length;i++){var a=r[i];(s=l[a.id]).refs--,n.push(s)}e?o(r=c(t,e)):r=[];for(i=0;i<n.length;i++){var s;if(0===(s=n[i]).refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete l[s.id]}}}};var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],o={},r=0;r<e.length;r++){var i=e[r],a=i[0],s={id:t+":"+r,css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(s):n.push(o[a]={id:a,parts:[s]})}return n}},function(t,e){t.exports=function(t,e,n,o,r){var i,a=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(i=t,a=t.default);var c="function"==typeof a?a.options:a;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns),o&&(c._scopeId=o);var l;if(r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=l):n&&(l=n),l){var u=c.functional,d=u?c.render:c.beforeCreate;u?c.render=function(t,e){return l.call(e),d(t,e)}:c.beforeCreate=d?[].concat(d,l):[l]}return{esModule:i,exports:a,options:c}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{buttonText:{type:String,default:"Got it!"},buttonLink:{type:String},buttonLinkText:{type:String,default:"More info"},message:{type:String,default:"This website uses cookies to ensure you get the best experience on our website."},theme:{type:String,default:"base"},position:{type:String,default:"bottom"},transitionName:{type:String,default:"slideFromBottom"},buttonClass:{type:String,default:"Cookie__button"}},data:function(){return{isOpen:!1}},computed:{containerPosition:function(){return"Cookie--"+this.position},cookieTheme:function(){return"Cookie--"+this.theme}},created:function(){!0==!this.getVisited()&&(this.isOpen=!0)},methods:{setVisited:function(){localStorage.setItem("cookie:accepted",!0)},getVisited:function(){return localStorage.getItem("cookie:accepted")},accept:function(){this.setVisited(),this.isOpen=!1,this.$emit("accept")}}}},function(t,e,n){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{appear:"",name:this.transitionName}},[this.isOpen?e("div",{staticClass:"Cookie",class:[this.containerPosition,this.cookieTheme]},[e("div",{staticClass:"Cookie__content"},[this._t("message",[this._v(this._s(this.message))])],2),this._v(" "),e("div",{staticClass:"Cookie__buttons"},[this.buttonLink?e("a",{class:this.buttonClass,attrs:{href:this.buttonLink}},[this._v(this._s(this.buttonLinkText))]):this._e(),this._v(" "),e("div",{class:this.buttonClass,on:{click:this.accept}},[this._v(this._s(this.buttonText))])])]):this._e()])},staticRenderFns:[]},t.exports.render._withStripped=!0}])})},ybsh:function(t,e,n){var o=n("nf7q");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n("rjj0")("28dfdc60",o,!0)}});