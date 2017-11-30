webpackJsonp([2],{

/***/ 626:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 644:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(832)
}
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(834)
/* template */
var __vue_template__ = __webpack_require__(861)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c5205e8c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\pages\\Dashboard.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Dashboard.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c5205e8c", Component.options)
  } else {
    hotAPI.reload("data-v-c5205e8c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 648:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(657)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 649:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(652);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ 650:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Export the Any Component
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            darkClass: App.theme.dark,
            primaryClass: App.theme.primary,
            accentClass: App.theme.accent,
            secondaryClass: App.theme.secondary,
            infoClass: App.theme.info,
            warningClass: App.theme.warning,
            errorClass: App.theme.error,
            successClass: App.theme.success,
            toggleBarStyle: App.site.toggleBarStyle,
            titleStyle: App.site.titleStyle,
            navbarStyle: App.site.navbarStyle,
            footerStyle: App.site.footerStyle,
            sidebarStyle: App.site.sidebarStyle,
            domain: App.site.domain,
            year: new Date().getFullYear(),
            trademark: App.site.trademark,
            logo: App.site.logo.url,
            logoStyle: {
                width: App.site.logo.width,
                height: App.site.logo.height
            },
            showLogo: App.site.logo.show,
            showIcon: App.site.icon.show,
            icon: App.site.icon.name ? App.site.icon.name : null,
            iconColor: App.site.icon.color,
            title: App.site.trademark
        };
    },
    computed: {
        isDark: function isDark() {
            return this.darkClass === true;
        }
    }

});

/***/ }),

/***/ 651:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(664)
}
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(666)
/* template */
var __vue_template__ = __webpack_require__(667)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6b411eb6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\VLink.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VLink.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b411eb6", Component.options)
  } else {
    hotAPI.reload("data-v-6b411eb6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(653), __esModule: true };

/***/ }),

/***/ 653:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(654);
module.exports = __webpack_require__(31).Object.assign;


/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(60);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(655) });


/***/ }),

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(91);
var gOPS = __webpack_require__(132);
var pIE = __webpack_require__(92);
var toObject = __webpack_require__(312);
var IObject = __webpack_require__(313);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(69)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ 656:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    methods: {
        isLoggedIn: function isLoggedIn() {
            return !!this.$store.getters['auth/getMe'];
        },

        /* string */
        hasRole: function hasRole(payload) {
            var me = this.$store.getters['auth/getMe'];
            return _.includes(me.roles, payload);
        },

        /* string */
        hasPermission: function hasPermission(payload) {
            var me = this.$store.getters['auth/getMe'];
            return _.includes(me.permissions, payload);
        },

        /* array */
        hasAnyPermission: function hasAnyPermission(permissions) {
            var me = this.$store.getters['auth/getMe'];
            return permissions.some(function (p) {
                return me.permissions.includes(p);
            });
        },

        /* array */
        hasAnyRole: function hasAnyRole(roles) {
            var me = this.$store.getters['auth/getMe'];
            return roles.some(function (r) {
                return me.roles.includes(r);
            });
        },

        /* array */
        hasAllRoles: function hasAllRoles(roles) {
            var me = this.$store.getters['auth/getMe'];
            return _.difference(roles, me.roles).length === 0;
        },

        /* array */
        hasAllPermissions: function hasAllPermissions(permissions) {
            var me = this.$store.getters['auth/getMe'];
            return _.difference(permissions, me.permissions).length === 0;
        },

        /* string */
        can: function can(permission) {
            return this.$store.getters['auth/getMe'].can[permission];
        }
    }
});

/***/ }),

/***/ 657:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 658:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(659)
/* template */
var __vue_template__ = __webpack_require__(687)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\layouts\\Main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e8f14ac4", Component.options)
  } else {
    hotAPI.reload("data-v-e8f14ac4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AppFooter_vue__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AppFooter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_AppFooter_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_AppNavBar_vue__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_AppNavBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__partials_AppNavBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_LeftSideBar_vue__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_LeftSideBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__partials_LeftSideBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_FabButton_vue__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_FabButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_FabButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__partials_CookieLaw_vue__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__partials_CookieLaw_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__partials_CookieLaw_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






// import ShoppingCart from '../partials/ShoppingCart.vue'

/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        AppFooter: __WEBPACK_IMPORTED_MODULE_0__partials_AppFooter_vue___default.a,
        AppNavBar: __WEBPACK_IMPORTED_MODULE_1__partials_AppNavBar_vue___default.a,
        LeftSideBar: __WEBPACK_IMPORTED_MODULE_2__partials_LeftSideBar_vue___default.a,
        FabButton: __WEBPACK_IMPORTED_MODULE_3__components_FabButton_vue___default.a,
        CookieLaw: __WEBPACK_IMPORTED_MODULE_4__partials_CookieLaw_vue___default.a
        // ShoppingCart
    }
});

/***/ }),

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(661)
}
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(663)
/* template */
var __vue_template__ = __webpack_require__(668)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\partials\\AppFooter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AppFooter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-917ae004", Component.options)
  } else {
    hotAPI.reload("data-v-917ae004", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 661:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(662);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(648)("0b1532a7", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-917ae004\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AppFooter.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-917ae004\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AppFooter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 662:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(626)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AppFooter.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_theme__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VLink_vue__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_VLink_vue__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_theme__["a" /* default */]],
    data: function data() {
        return {
            footerClass: { 'primary--text': true }
        };
    },
    created: function created() {
        var _this = this;

        /* Emit On a Child Component If You Want This To Be Visible */
        Bus.$on('footer-content-visible', function (visibility) {
            _this.contentVisible = visibility;
        });
    },

    components: {
        VLink: __WEBPACK_IMPORTED_MODULE_1__components_VLink_vue___default.a
    }
});

/***/ }),

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(665);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(648)("906b2d72", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6b411eb6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VLink.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6b411eb6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VLink.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 665:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(626)(true);
// imports


// module
exports.push([module.i, "\n.styleAvatar[data-v-6b411eb6] {\n  position: relative;\n  margin-left: -55px;\n}\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/components/VLink.vue"],"names":[],"mappings":";AAAA;EACE,mBAAmB;EACnB,mBAAmB;CAAE","file":"VLink.vue","sourcesContent":[".styleAvatar {\n  position: relative;\n  margin-left: -55px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        dark: {
            type: Boolean,
            default: function _default() {
                return App.theme.dark;
            }
        },
        href: {
            type: String
        },
        title: {
            type: String
        },
        avatar: {
            type: String,
            default: function _default() {
                return '';
            }
        },
        icon: {
            type: String
        },
        iconColor: {
            type: String,
            default: function _default() {
                return this.dark ? '#fafafa' : '#78909C'; // white or blue-grey lighten-1
            }
        },
        linkColor: {
            type: String,
            default: function _default() {
                return this.dark ? '#fafafa' : '#78909C'; // white or blue-grey lighten-1
            }
        },
        activeColor: {
            type: String,
            default: function _default() {
                return '#4db6ac'; // teal lighten 2
            }
        }
    },
    computed: {
        isActive: function isActive() {
            return this.href === this.$route.path;
        },
        isDark: function isDark() {
            return this.dark === true;
        },
        avatarOn: function avatarOn() {
            return !!this.avatar;
        },
        iconOn: function iconOn() {
            return !!this.icon;
        }
    },
    methods: {
        navigate: function navigate(href) {
            var self = this;
            /* if valid url */
            if (self.isURL(href)) {
                window.open(href);
            } else {
                /* when using vue router path */
                this.$router.push({ path: '' + href });
            }
        },
        isURL: function isURL(str) {
            var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
            var url = new RegExp(urlRegex, 'i');
            return str.length < 2083 && url.test(str);
        }
    }
});

/***/ }),

/***/ 667:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-list-tile",
    {
      class: [{ styleAvatar: _vm.avatarOn }],
      attrs: { avatar: _vm.avatarOn },
      nativeOn: {
        click: function($event) {
          _vm.navigate(_vm.href)
        }
      }
    },
    [
      _vm.iconOn && !_vm.avatarOn
        ? _c(
            "v-list-tile-action",
            [
              _c(
                "v-icon",
                {
                  style: {
                    color: _vm.isActive ? _vm.activeColor : _vm.iconColor,
                    cursor: _vm.href ? "pointer" : ""
                  }
                },
                [_vm._v(_vm._s(_vm.icon))]
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.iconOn && _vm.avatarOn
        ? _c("v-list-tile-avatar", [
            _c("img", { attrs: { src: _vm.avatar, alt: "" } })
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-list-tile-content",
        [
          _c(
            "v-list-tile-title",
            {
              style: { color: _vm.isActive ? _vm.activeColor : _vm.linkColor }
            },
            [
              _c("span", { style: { cursor: _vm.href ? "pointer" : "" } }, [
                _vm._v(_vm._s(_vm.title))
              ])
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.iconOn && _vm.avatarOn
        ? _c(
            "v-list-tile-action",
            [
              _c(
                "v-icon",
                {
                  style: {
                    color: _vm.isActive ? _vm.activeColor : _vm.iconColor,
                    cursor: _vm.href ? "pointer" : ""
                  }
                },
                [_vm._v(_vm._s(_vm.icon))]
              )
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6b411eb6", module.exports)
  }
}

/***/ }),

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-footer",
    { class: [_vm.footerClass] },
    [
      _c("v-spacer"),
      _c("span", [
        _vm._v(
          "© " +
            _vm._s(_vm.year) +
            " " +
            _vm._s(_vm.domain) +
            " ® | " +
            _vm._s(_vm.trademark) +
            "™"
        )
      ]),
      _c("v-spacer")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-917ae004", module.exports)
  }
}

/***/ }),

/***/ 669:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(670)
}
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(672)
/* template */
var __vue_template__ = __webpack_require__(673)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\partials\\AppNavBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AppNavBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8da5685a", Component.options)
  } else {
    hotAPI.reload("data-v-8da5685a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 670:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(671);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(648)("3297ebe2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8da5685a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AppNavBar.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8da5685a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AppNavBar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 671:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(626)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AppNavBar.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_theme__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(90);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["createNamespacedHelpers"])('cart'),
    mapState = _createNamespacedHelp.mapState;

/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_theme__["a" /* default */]],
    data: function data() {
        return {
            extension: false,
            count: 0
        };
    },
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapState({
        getCount: 'count'
    })),
    created: function created() {
        var _this = this;

        /* Emit On a Child Component If You Want This To Be Visible */
        Bus.$on('header-extension-visible', function (visibility) {
            _this.extension = visibility;
        });
    },
    mounted: function mounted() {
        var self = this;
        self.count = self.getCount;
    },

    methods: {
        /* Use Vuetify Modal */
        openShoppingCart: function openShoppingCart() {
            Bus.$emit('shopping-cart-open');
        },
        toggleDrawer: function toggleDrawer() {
            Bus.$emit('toggleDrawer');
        },

        /* Uses Cart Route */
        openCart: function openCart() {
            var self = this;
            self.$router.push({ name: 'cart' });
        }
    },
    watch: {
        getCount: function getCount(newValue) {
            var self = this;
            self.count = newValue;
        }
    }
});

/***/ }),

/***/ 673:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-toolbar",
    { style: _vm.navbarStyle, attrs: { dark: !_vm.isDark, fixed: "" } },
    [
      _c("v-toolbar-side-icon", {
        style: _vm.toggleBarStyle,
        nativeOn: {
          click: function($event) {
            $event.stopPropagation()
            _vm.toggleDrawer()
          }
        }
      }),
      _vm._v(" "),
      _vm.extension
        ? _c(
            "v-toolbar-title",
            {
              staticClass: "text-xs-center",
              attrs: { slot: "extension" },
              slot: "extension"
            },
            [
              _vm.showIcon
                ? _c(
                    "v-icon",
                    {
                      staticClass: "ml-3 hidden-md-and-down",
                      style: { color: _vm.iconColor }
                    },
                    [_vm._v(_vm._s(_vm.icon))]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "hidden-md-and-down", style: _vm.titleStyle },
                [_vm._v(_vm._s(_vm.title))]
              )
            ],
            1
          )
        : _c(
            "v-toolbar-title",
            { staticClass: "text-xs-center" },
            [
              _vm.showIcon
                ? _c(
                    "v-icon",
                    {
                      staticClass: "ml-3 hidden-md-and-down",
                      style: { color: _vm.iconColor }
                    },
                    [_vm._v(_vm._s(_vm.icon))]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "hidden-md-and-down", style: _vm.titleStyle },
                [_vm._v(_vm._s(_vm.title))]
              )
            ],
            1
          ),
      _vm._v(" "),
      _c("v-spacer"),
      _vm._v(" "),
      _vm.showLogo
        ? _c("img", {
            style: [_vm.logoStyle],
            attrs: { src: _vm.logo, alt: "vuejs" }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("v-spacer"),
      _vm._v(" "),
      _c(
        "v-tooltip",
        { attrs: { left: "" } },
        [
          _c(
            "v-btn",
            {
              attrs: {
                slot: "activator",
                flat: "",
                icon: "",
                color: "primary"
              },
              on: {
                click: function($event) {
                  _vm.openCart()
                }
              },
              slot: "activator"
            },
            [
              _c(
                "v-badge",
                { attrs: { left: "" } },
                [
                  _c("span", { attrs: { slot: "badge" }, slot: "badge" }, [
                    _vm._v(_vm._s(_vm.count))
                  ]),
                  _vm._v(" "),
                  _c("v-icon", [_vm._v("shopping_cart")])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("span", [_vm._v("View | Cart")])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8da5685a", module.exports)
  }
}

/***/ }),

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(675)
/* template */
var __vue_template__ = __webpack_require__(679)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\partials\\LeftSideBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] LeftSideBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e127717", Component.options)
  } else {
    hotAPI.reload("data-v-4e127717", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VLink_vue__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_VLink_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_CategoryLink_vue__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_CategoryLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_CategoryLink_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_theme__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(90);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_4_vuex__["createNamespacedHelpers"])('auth'),
    mapGetters = _createNamespacedHelp.mapGetters;

/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_theme__["a" /* default */]],
    data: function data() {
        return {
            drawer: false,
            links: [], // site navigation links
            members: [], // change with featured Products
            grouplinks: [] // product categories
        };
    },
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapGetters({
        getAuth: 'getAuth',
        getMe: 'getMe'
    })),
    components: {
        VLink: __WEBPACK_IMPORTED_MODULE_1__components_VLink_vue___default.a,
        CategoryLink: __WEBPACK_IMPORTED_MODULE_2__components_CategoryLink_vue___default.a
    },
    mounted: function mounted() {
        var self = this;
        Bus.$on('toggleDrawer', function () {
            self.drawer = !self.drawer;
        });
        self.fetchCategories();
        self.fetchNavLinks();
    },

    methods: {
        fetchCategories: function fetchCategories() {
            this.grouplinks = App.grouplinks;
        },
        fetchNavLinks: function fetchNavLinks() {
            this.links = App.menu;
        }
    }

});

/***/ }),

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(677)
/* template */
var __vue_template__ = __webpack_require__(678)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\CategoryLink.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CategoryLink.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-48670262", Component.options)
  } else {
    hotAPI.reload("data-v-48670262", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VLink_vue__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_VLink_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['items'],
    components: {
        VLink: __WEBPACK_IMPORTED_MODULE_0__components_VLink_vue___default.a
    },
    data: function data() {
        return {
            dark: App.theme.dark
        };
    },
    methods: {
        loadview: function loadview(item, subItem) {
            this.$router.push({ path: '' + subItem.href });
        },
        hasAvatar: function hasAvatar(subItem) {
            return subItem.avatar !== undefined;
        },
        loadAvatar: function loadAvatar(avatar) {
            return avatar || 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460';
        },
        isGroupActive: function isGroupActive(item) {
            var itemsegment = '';
            var segment = '';
            if (item.href !== undefined) {
                itemsegment = item.href.split('/')[1];
                segment = window.location.pathname.split('/')[1];
                if (itemsegment === segment) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            }
        },
        isActive: function isActive(subItem) {
            if (subItem.href !== undefined) {
                if (subItem.href === window.location.pathname) {
                    subItem.active = true;
                } else {
                    subItem.active = false;
                }
            }
        }
    },
    computed: {
        isDark: function isDark() {
            return this.dark === true;
        }
    }

});

/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-list",
    _vm._l(_vm.items, function(item) {
      return _c(
        "v-list-group",
        { key: item.title },
        [
          _c(
            "v-list-tile",
            { attrs: { slot: "item" }, slot: "item" },
            [
              !item.avatar
                ? _c(
                    "v-list-tile-action",
                    [_c("v-icon", [_vm._v(_vm._s(item.action))])],
                    1
                  )
                : _c("v-avatar", { attrs: { size: "25px" } }, [
                    _c("img", { attrs: { src: item.avatar, alt: "" } })
                  ]),
              _vm._v(" "),
              !_vm.isDark
                ? _c(
                    "v-list-tile-content",
                    [
                      _c(
                        "v-list-tile-title",
                        {
                          class: {
                            "primary--text": item.active,
                            "blue-grey--text": !item.active,
                            "text--lighten-1": !item.active
                          }
                        },
                        [_vm._v(_vm._s(item.title))]
                      )
                    ],
                    1
                  )
                : _c(
                    "v-list-tile-content",
                    [
                      _c(
                        "v-list-tile-title",
                        {
                          class: {
                            "primary--text": item.active,
                            "text--lighten-2": item.active
                          }
                        },
                        [_vm._v(_vm._s(item.title))]
                      )
                    ],
                    1
                  ),
              _vm._v(" "),
              _c(
                "v-list-tile-action",
                [
                  _c(
                    "v-icon",
                    {
                      class: {
                        "primary--text": !_vm.isDark,
                        "white--text": _vm.isDark
                      }
                    },
                    [_vm._v("keyboard_arrow_down")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm._l(item.items, function(subItem) {
            return _c("v-link", {
              key: subItem.id,
              attrs: {
                dark: _vm.isDark,
                title: subItem.title,
                avatar: subItem.avatar,
                icon: subItem.action,
                href: subItem.href
              }
            })
          })
        ],
        2
      )
    })
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-48670262", module.exports)
  }
}

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-navigation-drawer",
    {
      staticClass: "accent",
      attrs: {
        temporary: "",
        "hide-overlay": "",
        height: "100%",
        "enable-resize-watcher": ""
      },
      model: {
        value: _vm.drawer,
        callback: function($$v) {
          _vm.drawer = $$v
        },
        expression: "drawer"
      }
    },
    [
      _c(
        "v-list",
        { attrs: { dense: "" } },
        [
          _vm._l(_vm.links, function(link) {
            return _c("v-link", {
              key: link.id,
              attrs: {
                dark: _vm.darkClass,
                title: link.title,
                href: link.href,
                icon: link.action
              }
            })
          }),
          _vm._v(" "),
          _c("v-link", {
            attrs: {
              dark: _vm.darkClass,
              title: "Company Profile",
              href: "/about",
              icon: "fa-building"
            }
          }),
          _vm._v(" "),
          _c("v-link", {
            attrs: {
              dark: _vm.darkClass,
              title: "Support",
              href: "/support",
              icon: "fa-life-ring"
            }
          }),
          _vm._v(" "),
          _c("v-link", {
            attrs: {
              dark: _vm.darkClass,
              title: "Products",
              href: "/products",
              icon: "fa-shopping-basket"
            }
          }),
          _vm._v(" "),
          _c("v-link", {
            attrs: {
              dark: _vm.darkClass,
              title: "Categories",
              href: "/categories",
              icon: "fa-tag"
            }
          }),
          _vm._v(" "),
          _c("category-link", {
            attrs: { dark: _vm.darkClass, items: _vm.grouplinks }
          }),
          _vm._v(" "),
          _c(
            "v-subheader",
            {
              class: {
                "blue-grey--text": !_vm.isDark,
                "text--lighten-1": !_vm.isDark,
                "white--text": _vm.isDark
              }
            },
            [_vm._v("Members Area")]
          ),
          _vm._v(" "),
          _vm.getAuth && _vm.getMe.isAdmin
            ? _c("v-link", {
                attrs: {
                  dark: _vm.darkClass,
                  title: "User Management",
                  href: "/users",
                  icon: "fa-users"
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.getAuth
            ? _c("v-link", {
                attrs: {
                  dark: _vm.darkClass,
                  title: "Dashboard",
                  href: "/dashboard",
                  icon: "dashboard"
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.getAuth
            ? _c("v-link", {
                attrs: {
                  dark: _vm.darkClass,
                  title: "Settings",
                  href: "/settings",
                  icon: "fa-cogs"
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.getAuth
            ? _c("v-link", {
                attrs: {
                  dark: _vm.darkClass,
                  title: "Logout",
                  href: "/logout",
                  icon: "power_settings_new"
                }
              })
            : _vm._e(),
          _vm._v(" "),
          !_vm.getAuth
            ? _c("v-link", {
                attrs: {
                  dark: _vm.darkClass,
                  title: "Login",
                  href: "/login",
                  icon: "fa-key"
                }
              })
            : _vm._e(),
          _vm._v(" "),
          !_vm.getAuth
            ? _c("v-link", {
                attrs: {
                  dark: _vm.darkClass,
                  title: "Register",
                  href: "/register",
                  icon: "fa-user-plus"
                }
              })
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4e127717", module.exports)
  }
}

/***/ }),

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(681)
/* template */
var __vue_template__ = __webpack_require__(682)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\FabButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FabButton.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06598282", Component.options)
  } else {
    hotAPI.reload("data-v-06598282", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(90);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["createNamespacedHelpers"])('auth'),
    mapGetters = _createNamespacedHelp.mapGetters;

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            direction: 'top',
            fixed: true,
            fab: false,
            hover: false,
            top: false,
            right: true,
            bottom: true,
            left: false,
            absolute: false,
            transition: 'slide-y-reverse-transition',
            buttons: [{ name: 'home', href: '/', class: 'indigo lighten-2', icon: 'fa-home', requiresAuth: false }, { name: 'dashboard', href: '/dashboard', class: 'amber lighten-2', icon: 'fa-shopping-bag', requiresAuth: false }, { name: 'login', href: '/login', class: 'success', icon: 'fa-key', requiresAuth: false }, { name: 'register', href: '/register', class: 'info', icon: 'fa-user-plus', requiresAuth: false }, { name: 'logout', href: '/logout', class: 'red lighten-2', icon: 'fa-power-off', requiresAuth: true }, { name: 'scroll-up', href: null, class: 'blue-grey', icon: 'flight_takeoff', requiresAuth: false }],
            activeFab: {
                'class': 'primary', icon: 'fa-rocket'
            }
        };
    },
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapGetters({
        getAuth: 'getAuth'
    })),
    watch: {
        top: function top(val) {
            this.bottom = !val;
        },
        right: function right(val) {
            this.left = !val;
        },
        bottom: function bottom(val) {
            this.top = !val;
        },
        left: function left(val) {
            this.right = !val;
        }
    },
    methods: {
        navigate: function navigate(button) {
            var self = this;
            self.activeFab = { class: button.class, icon: button.icon };

            setTimeout(function () {
                self.activeFab = {
                    'class': 'primary', icon: 'fa-rocket'
                };
                if (button.href !== null) {
                    self.$router.push({ path: '' + button.href });
                } else {
                    self.scrollToTop(300);
                }
            }, 500);
        },
        scrollToTop: function scrollToTop(scrollDuration) {
            var cosParameter = window.scrollY / 2;
            var scrollCount = 0;
            var oldTimestamp = performance.now();

            function step(newTimestamp) {
                scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
                if (scrollCount >= Math.PI) window.scrollTo(0, 0);
                if (window.scrollY === 0) return;
                window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
                oldTimestamp = newTimestamp;
                window.requestAnimationFrame(step);
            }

            window.requestAnimationFrame(step);
        },
        isVisible: function isVisible(button) {
            var self = this;
            if (button.requiresAuth === false && button.name === 'login') {
                return !self.getAuth;
            } else if (button.requiresAuth === false && button.name === 'register') {
                return !self.getAuth;
            } else if (button.requiresAuth === true) {
                return self.getAuth;
            } else if (button.requiresAuth === false) {
                return true;
            }
        }
    }
});

/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-speed-dial",
    {
      attrs: {
        top: _vm.top,
        bottom: _vm.bottom,
        right: _vm.right,
        left: _vm.left,
        direction: _vm.direction,
        hover: _vm.hover,
        transition: _vm.transition,
        absolute: _vm.absolute,
        fixed: _vm.fixed
      },
      model: {
        value: _vm.fab,
        callback: function($$v) {
          _vm.fab = $$v
        },
        expression: "fab"
      }
    },
    [
      _c(
        "v-btn",
        {
          class: [_vm.activeFab.class],
          attrs: { slot: "activator", dark: "", fab: "", hover: "" },
          slot: "activator",
          model: {
            value: _vm.fab,
            callback: function($$v) {
              _vm.fab = $$v
            },
            expression: "fab"
          }
        },
        [
          _c("v-icon", { staticClass: "white--text" }, [
            _vm._v(_vm._s(_vm.activeFab.icon))
          ]),
          _vm._v(" "),
          _c("v-icon", { staticClass: "error--text" }, [_vm._v("close")])
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.buttons, function(button) {
        return _vm.isVisible(button)
          ? _c(
              "v-btn",
              {
                key: button.name,
                class: [button.class],
                attrs: { fab: "", dark: "", small: "" },
                nativeOn: {
                  click: function($event) {
                    _vm.navigate(button)
                  }
                }
              },
              [_c("v-icon", [_vm._v(_vm._s(button.icon))])],
              1
            )
          : _vm._e()
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-06598282", module.exports)
  }
}

/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(684)
/* template */
var __vue_template__ = __webpack_require__(686)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\partials\\CookieLaw.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CookieLaw.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-73631480", Component.options)
  } else {
    hotAPI.reload("data-v-73631480", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 684:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_cookie_law__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_cookie_law___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_cookie_law__);
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    components: { CookieLaw: __WEBPACK_IMPORTED_MODULE_0_vue_cookie_law___default.a }
});

/***/ }),

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

/*!
 * vue-cookie-law v1.3.0
 * (c) 2017 Jakub Juszczak <jakub@posteo.de>
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("CookieLaw", [], factory);
	else if(typeof exports === 'object')
		exports["CookieLaw"] = factory();
	else
		root["CookieLaw"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(8),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/jjuszczak/Projekte/Privat/vue-cookie-law/src/components/CookieLaw.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CookieLaw.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-863fd97e", Component.options)
  } else {
    hotAPI.reload("data-v-863fd97e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("91c05312", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-863fd97e\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CookieLaw.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-863fd97e\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CookieLaw.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n.Cookie {\n  position: fixed;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  z-index: 9999;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.Cookie > * {\n    margin: 0.9375rem 0;\n    -ms-flex-item-align: center;\n        align-self: center;\n}\n@media screen and (min-width: 48rem) {\n.Cookie {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-flow: row;\n              flex-flow: row;\n}\n.Cookie > * {\n        margin: 0;\n}\n}\n.Cookie--top {\n  top: 0;\n  left: 0;\n  right: 0;\n}\n.Cookie--bottom {\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.Cookie__buttons {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.Cookie__buttons > * {\n    margin: 0.3125rem 0;\n}\n@media screen and (min-width: 48rem) {\n.Cookie__buttons {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row;\n}\n.Cookie__buttons > * {\n        margin: 0 0.9375rem;\n}\n}\n.Cookie__button {\n  cursor: pointer;\n  -ms-flex-item-align: center;\n      align-self: center;\n}\n.Cookie--base {\n  background: #F1F1F1;\n  color: #232323;\n  padding: 1.250em;\n}\n.Cookie--base .Cookie__button {\n    background: #97D058;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 0;\n}\n.Cookie--base .Cookie__button:hover {\n      background: #7ebf36;\n}\n.Cookie--base--rounded {\n  background: #F1F1F1;\n  color: #232323;\n  padding: 1.250em;\n}\n.Cookie--base--rounded .Cookie__button {\n    background: #97D058;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 20px;\n}\n.Cookie--base--rounded .Cookie__button:hover {\n      background: #7ebf36;\n}\n.Cookie--blood-orange {\n  background: #424851;\n  color: #fff;\n  padding: 1.250em;\n}\n.Cookie--blood-orange .Cookie__button {\n    background: #E76A68;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 0;\n}\n.Cookie--blood-orange .Cookie__button:hover {\n      background: #e03f3c;\n}\n.Cookie--blood-orange--rounded {\n  background: #424851;\n  color: #fff;\n  padding: 1.250em;\n}\n.Cookie--blood-orange--rounded .Cookie__button {\n    background: #E76A68;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 20px;\n}\n.Cookie--blood-orange--rounded .Cookie__button:hover {\n      background: #e03f3c;\n}\n.Cookie--dark-lime {\n  background: #424851;\n  color: #fff;\n  padding: 1.250em;\n}\n.Cookie--dark-lime .Cookie__button {\n    background: #97D058;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 0;\n}\n.Cookie--dark-lime .Cookie__button:hover {\n      background: #7ebf36;\n}\n.Cookie--dark-lime--rounded {\n  background: #424851;\n  color: #fff;\n  padding: 1.250em;\n}\n.Cookie--dark-lime--rounded .Cookie__button {\n    background: #97D058;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 20px;\n}\n.Cookie--dark-lime--rounded .Cookie__button:hover {\n      background: #7ebf36;\n}\n.Cookie--royal {\n  background: #FBC227;\n  color: #232323;\n  padding: 1.250em;\n}\n.Cookie--royal .Cookie__button {\n    background: #726CEA;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 0;\n}\n.Cookie--royal .Cookie__button:hover {\n      background: #473fe4;\n}\n.Cookie--royal--rounded {\n  background: #FBC227;\n  color: #232323;\n  padding: 1.250em;\n}\n.Cookie--royal--rounded .Cookie__button {\n    background: #726CEA;\n    padding: 0.625em 3.125em;\n    color: #fff;\n    border-radius: 20px;\n}\n.Cookie--royal--rounded .Cookie__button:hover {\n      background: #473fe4;\n}\n.slideFromTop-enter, .slideFromTop-leave-to {\n  -webkit-transform: translate(0px, -12.5em);\n          transform: translate(0px, -12.5em);\n}\n.slideFromTop-enter-to, .slideFromTop-leave {\n  -webkit-transform: translate(0px, 0px);\n          transform: translate(0px, 0px);\n}\n.slideFromBottom-enter, .slideFromBottom-leave-to {\n  -webkit-transform: translate(0px, 12.5em);\n          transform: translate(0px, 12.5em);\n}\n.slideFromBottom-enter-to, .slideFromBottom-leave {\n  -webkit-transform: translate(0px, 0px);\n          transform: translate(0px, 0px);\n}\n.slideFromBottom-enter-active,\n.slideFromBottom-leave-active,\n.slideFromTop-enter-active,\n.slideFromTop-leave-active {\n  -webkit-transition: -webkit-transform .4s ease-in;\n  transition: -webkit-transform .4s ease-in;\n  transition: transform .4s ease-in;\n  transition: transform .4s ease-in, -webkit-transform .4s ease-in;\n}\n.fade-enter-active, .fade-leave-active {\n  -webkit-transition: opacity .5s;\n  transition: opacity .5s;\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(5)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    buttonText: {
      type: String,
      default: 'Got it!'
    },
    buttonLink: {
      type: String
    },
    buttonLinkText: {
      type: String,
      default: 'More info'
    },
    message: {
      type: String,
      default: 'This website uses cookies to ensure you get the best experience on our website.'
    },
    theme: {
      type: String,
      default: 'base'
    },

    position: {
      type: String,
      default: 'bottom'
    },

    transitionName: {
      type: String,
      default: 'slideFromBottom'
    },
    buttonClass: {
      type: String,
      default: 'Cookie__button'
    }
  },
  data: function data() {
    return {
      isOpen: false
    };
  },

  computed: {
    containerPosition: function containerPosition() {
      return 'Cookie--' + this.position;
    },
    cookieTheme: function cookieTheme() {
      return 'Cookie--' + this.theme;
    }
  },
  created: function created() {
    if (!this.getVisited() === true) {
      this.isOpen = true;
    }
  },

  methods: {
    setVisited: function setVisited() {
      localStorage.setItem('cookie:accepted', true);
    },
    getVisited: function getVisited() {
      return localStorage.getItem('cookie:accepted');
    },
    accept: function accept() {
      this.setVisited();
      this.isOpen = false;
    }
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "appear": "",
      "name": _vm.transitionName
    }
  }, [(_vm.isOpen) ? _c('div', {
    staticClass: "Cookie",
    class: [_vm.containerPosition, _vm.cookieTheme]
  }, [_c('div', {
    staticClass: "Cookie__content"
  }, [_vm._t("message", [_vm._v(_vm._s(_vm.message))])], 2), _vm._v(" "), _c('div', {
    staticClass: "Cookie__buttons"
  }, [(_vm.buttonLink) ? _c('a', {
    class: _vm.buttonClass,
    attrs: {
      "href": _vm.buttonLink
    }
  }, [_vm._v(_vm._s(_vm.buttonLinkText))]) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.buttonClass,
    on: {
      "click": _vm.accept
    }
  }, [_vm._v(_vm._s(_vm.buttonText))])])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-863fd97e", module.exports)
  }
}

/***/ })
/******/ ]);
});

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "cookie-law",
    {
      attrs: {
        theme: "dark-lime",
        buttonText: "Yes, I Understand This Site Uses Cookie."
      }
    },
    [
      _c("div", { attrs: { slot: "message" }, slot: "message" }, [
        _c(
          "p",
          [
            _vm._v(
              "This website uses cookies to ensure you get the best experience on our website.\n                "
            ),
            _c("span", [
              _vm._v("Read Our Cookie Terms and Usage For More Info:")
            ]),
            _vm._v(" "),
            _c("router-link", { attrs: { to: "/cookie-law-agreement" } }, [
              _vm._v("Click here")
            ])
          ],
          1
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-73631480", module.exports)
  }
}

/***/ }),

/***/ 687:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    { attrs: { dark: _vm.App.theme.dark, standalone: "" } },
    [
      _c("left-side-bar"),
      _vm._v(" "),
      _c("app-nav-bar"),
      _vm._v(" "),
      _c(
        "main",
        [
          _c(
            "v-container",
            {
              staticClass: "pa-0 ma-0",
              attrs: { transition: "slide-x-transition", fluid: "" }
            },
            [_vm._t("default")],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("fab-button"),
      _vm._v(" "),
      _c("cookie-law"),
      _vm._v(" "),
      _c("app-footer")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e8f14ac4", module.exports)
  }
}

/***/ }),

/***/ 690:
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Image Compressor v0.5.2
 * https://github.com/xkeshi/image-compressor
 *
 * Copyright (c) 2017 Xkeshi
 * Released under the MIT license
 *
 * Date: 2017-10-09T02:40:37.129Z
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ImageCompressor = factory());
}(this, (function () { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var canvasToBlob = createCommonjsModule(function (module) {
/*
 * JavaScript Canvas to Blob
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on stackoverflow user Stoive's code snippet:
 * http://stackoverflow.com/q/4998908
 */

/* global atob, Blob, define */

(function (window) {
  'use strict';

  var CanvasPrototype =
    window.HTMLCanvasElement && window.HTMLCanvasElement.prototype;
  var hasBlobConstructor =
    window.Blob &&
    (function () {
      try {
        return Boolean(new Blob())
      } catch (e) {
        return false
      }
    })();
  var hasArrayBufferViewSupport =
    hasBlobConstructor &&
    window.Uint8Array &&
    (function () {
      try {
        return new Blob([new Uint8Array(100)]).size === 100
      } catch (e) {
        return false
      }
    })();
  var BlobBuilder =
    window.BlobBuilder ||
    window.WebKitBlobBuilder ||
    window.MozBlobBuilder ||
    window.MSBlobBuilder;
  var dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;
  var dataURLtoBlob =
    (hasBlobConstructor || BlobBuilder) &&
    window.atob &&
    window.ArrayBuffer &&
    window.Uint8Array &&
    function (dataURI) {
      var matches,
        mediaType,
        isBase64,
        dataString,
        byteString,
        arrayBuffer,
        intArray,
        i,
        bb;
      // Parse the dataURI components as per RFC 2397
      matches = dataURI.match(dataURIPattern);
      if (!matches) {
        throw new Error('invalid data URI')
      }
      // Default to text/plain;charset=US-ASCII
      mediaType = matches[2]
        ? matches[1]
        : 'text/plain' + (matches[3] || ';charset=US-ASCII');
      isBase64 = !!matches[4];
      dataString = dataURI.slice(matches[0].length);
      if (isBase64) {
        // Convert base64 to raw binary data held in a string:
        byteString = atob(dataString);
      } else {
        // Convert base64/URLEncoded data component to raw binary:
        byteString = decodeURIComponent(dataString);
      }
      // Write the bytes of the string to an ArrayBuffer:
      arrayBuffer = new ArrayBuffer(byteString.length);
      intArray = new Uint8Array(arrayBuffer);
      for (i = 0; i < byteString.length; i += 1) {
        intArray[i] = byteString.charCodeAt(i);
      }
      // Write the ArrayBuffer (or ArrayBufferView) to a blob:
      if (hasBlobConstructor) {
        return new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], {
          type: mediaType
        })
      }
      bb = new BlobBuilder();
      bb.append(arrayBuffer);
      return bb.getBlob(mediaType)
    };
  if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
    if (CanvasPrototype.mozGetAsFile) {
      CanvasPrototype.toBlob = function (callback, type, quality) {
        var self = this;
        setTimeout(function () {
          if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
            callback(dataURLtoBlob(self.toDataURL(type, quality)));
          } else {
            callback(self.mozGetAsFile('blob', type));
          }
        });
      };
    } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
      CanvasPrototype.toBlob = function (callback, type, quality) {
        var self = this;
        setTimeout(function () {
          callback(dataURLtoBlob(self.toDataURL(type, quality)));
        });
      };
    }
  }
  if (false) {
    undefined(function () {
      return dataURLtoBlob
    });
  } else if ('object' === 'object' && module.exports) {
    module.exports = dataURLtoBlob;
  } else {
    window.dataURLtoBlob = dataURLtoBlob;
  }
})(window);
});

/* globals Blob */
'use strict';
var toString = Object.prototype.toString;

var isBlob = function (x) {
	return x instanceof Blob || toString.call(x) === '[object Blob]';
};

var DEFAULTS = {
  /**
   * Indicates if read the image's Exif Orientation information,
   * and then rotate or flip the image automatically.
   * @type {boolean}
   */
  checkOrientation: true,

  /**
   * The max width of the output image.
   * @type {number}
   */
  maxWidth: Infinity,

  /**
   * The max height of the output image.
   * @type {number}
   */
  maxHeight: Infinity,

  /**
   * The min width of the output image.
   * @type {number}
   */
  minWidth: 0,

  /**
   * The min height of the output image.
   * @type {number}
   */
  minHeight: 0,

  /**
   * The width of the output image.
   * If not specified, the natural width of the source image will be used.
   * @type {number}
   */
  width: undefined,

  /**
   * The height of the output image.
   * If not specified, the natural height of the source image will be used.
   * @type {number}
   */
  height: undefined,

  /**
   * The quality of the output image.
   * It must be a number between `0` and `1`,
   * and only available for `image/jpeg` and `image/webp` images.
   * Check out {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob canvas.toBlob}.
   * @type {number}
   */
  quality: 0.8,

  /**
   * The mime type of the output image.
   * By default, the original mime type of the source image file will be used.
   * @type {string}
   */
  mimeType: 'auto',

  /**
   * PNG files over this value (5M by default) will be converted to JPEGs.
   * To disable this, just set the value to `Infinity`.
   * Check out {@link https://github.com/xkeshi/image-compressor/issues/2 #2}.
   * @type {number}
   */
  convertSize: 5000000,

  /**
   * The success callback for the image compressing process.
   * @type {Function}
   * @param {File} file - The compressed image File object.
   * @example
   * function (file) { console.log(file) }
   */
  success: null,

  /**
   * The error callback for the image compressing process.
   * @type {Function}
   * @param {Error} err - An Error object.
   * @example
   * function (err) { console.log(err.message) }
   */
  error: null
};

var REGEXP_IMAGE_TYPE = /^image\/.+$/;

/**
 * Check if the given value is a mime type of image.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given is a mime type of image, else `false`.
 */
function isImageType(value) {
  return REGEXP_IMAGE_TYPE.test(value);
}

/**
 * Convert image type to extension.
 * @param {string} value - The image type to convert.
 * @param {boolean} [includeDot=true] - Include a leading dot or not.
 * @returns {boolean} Returns the image extension.
 */
function imageTypeToExtension(value) {
  var includeDot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var extension = isImageType(value) ? value.substr(6) : '';

  if (extension === 'jpeg') {
    extension = 'jpg';
  }

  if (extension && includeDot) {
    extension = '.' + extension;
  }

  return extension;
}

var fromCharCode = String.fromCharCode;

/**
 * Get string from char code in data view.
 * @param {DataView} dataView - The data view for read.
 * @param {number} start - The start index.
 * @param {number} length - The read length.
 * @returns {string} The read result.
 */

function getStringFromCharCode(dataView, start, length) {
  var str = '';
  var i = void 0;

  length += start;

  for (i = start; i < length; i += 1) {
    str += fromCharCode(dataView.getUint8(i));
  }

  return str;
}

var _window$1 = window;
var btoa = _window$1.btoa;

/**
 * Transform array buffer to Data URL.
 * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
 * @param {string} mimeType - The mime type of the Data URL.
 * @returns {string} The result Data URL.
 */

function arrayBufferToDataURL(arrayBuffer, mimeType) {
  var uint8 = new Uint8Array(arrayBuffer);
  var length = uint8.length;

  var data = '';
  var i = void 0;

  // TypedArray.prototype.forEach is not supported in some browsers.
  for (i = 0; i < length; i += 1) {
    data += fromCharCode(uint8[i]);
  }

  return 'data:' + mimeType + ';base64,' + btoa(data);
}

/**
 * Get orientation value from given array buffer.
 * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
 * @returns {number} The read orientation value.
 */
function getOrientation(arrayBuffer) {
  var dataView = new DataView(arrayBuffer);
  var orientation = void 0;
  var littleEndian = void 0;
  var app1Start = void 0;
  var ifdStart = void 0;

  // Only handle JPEG image (start by 0xFFD8)
  if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
    var length = dataView.byteLength;
    var offset = 2;

    while (offset < length) {
      if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
        app1Start = offset;
        break;
      }

      offset += 1;
    }
  }

  if (app1Start) {
    var exifIDCode = app1Start + 4;
    var tiffOffset = app1Start + 10;

    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
      var endianness = dataView.getUint16(tiffOffset);

      littleEndian = endianness === 0x4949;

      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
            var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

            if (firstIFDOffset >= 0x00000008) {
              ifdStart = tiffOffset + firstIFDOffset;
            }
          }
        }
    }
  }

  if (ifdStart) {
    var _length = dataView.getUint16(ifdStart, littleEndian);
    var _offset = void 0;
    var i = void 0;

    for (i = 0; i < _length; i += 1) {
      _offset = ifdStart + i * 12 + 2;

      if (dataView.getUint16(_offset, littleEndian) === 0x0112 /* Orientation */) {
          // 8 is the offset of the current tag's value
          _offset += 8;

          // Get the original orientation value
          orientation = dataView.getUint16(_offset, littleEndian);

          // Override the orientation with its default value
          dataView.setUint16(_offset, 1, littleEndian);
          break;
        }
    }
  }

  return orientation;
}

/**
 * Parse Exif Orientation value.
 * @param {number} orientation - The orientation to parse.
 * @returns {Object} The parsed result.
 */
function parseOrientation(orientation) {
  var rotate = 0;
  var scaleX = 1;
  var scaleY = 1;

  switch (orientation) {
    // Flip horizontal
    case 2:
      scaleX = -1;
      break;

    // Rotate left 180°
    case 3:
      rotate = -180;
      break;

    // Flip vertical
    case 4:
      scaleY = -1;
      break;

    // Flip vertical and rotate right 90°
    case 5:
      rotate = 90;
      scaleY = -1;
      break;

    // Rotate right 90°
    case 6:
      rotate = 90;
      break;

    // Flip horizontal and rotate right 90°
    case 7:
      rotate = 90;
      scaleX = -1;
      break;

    // Rotate left 90°
    case 8:
      rotate = -90;
      break;

    default:
  }

  return {
    rotate: rotate,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _window = window;
var ArrayBuffer$1 = _window.ArrayBuffer;
var FileReader = _window.FileReader;

var URL = window.URL || window.webkitURL;
var REGEXP_EXTENSION = /\.\w+$/;

/**
 * Creates a new image compressor.
 * @class
 */

var ImageCompressor = function () {
  /**
   * The constructor of ImageCompressor.
   * @param {File|Blob} file - The target image file for compressing.
   * @param {Object} [options] - The options for compressing.
   */
  function ImageCompressor(file, options) {
    classCallCheck(this, ImageCompressor);

    this.result = null;

    if (file) {
      this.compress(file, options);
    }
  }

  /**
   * The main compress method.
   * @param {File|Blob} file - The target image file for compressing.
   * @param {Object} [options] - The options for compressing.
   * @returns {Promise} - A Promise instance.
   */


  createClass(ImageCompressor, [{
    key: 'compress',
    value: function compress(file, options) {
      var _this = this;

      var image = new Image();

      options = _extends({}, DEFAULTS, options);

      if (!ArrayBuffer$1) {
        options.checkOrientation = false;
      }

      return new Promise(function (resolve, reject) {
        if (!isBlob(file)) {
          reject(new Error('The first argument must be a File or Blob object.'));
          return;
        }

        var mimeType = file.type;

        if (!isImageType(mimeType)) {
          reject(new Error('The first argument must be an image File or Blob object.'));
          return;
        }

        if (!URL && !FileReader) {
          reject(new Error('The current browser does not support image compression.'));
          return;
        }

        if (URL && !options.checkOrientation) {
          resolve(URL.createObjectURL(file));
        } else if (FileReader) {
          var reader = new FileReader();
          var checkOrientation = options.checkOrientation && mimeType === 'image/jpeg';

          reader.onload = function (_ref) {
            var target = _ref.target;
            var result = target.result;


            resolve(checkOrientation ? _extends({
              url: arrayBufferToDataURL(result, mimeType)
            }, parseOrientation(getOrientation(result))) : {
              url: result
            });
          };
          reader.onabort = reject;
          reader.onerror = reject;

          if (checkOrientation) {
            reader.readAsArrayBuffer(file);
          } else {
            reader.readAsDataURL(file);
          }
        }
      }).then(function (data) {
        return new Promise(function (resolve, reject) {
          image.onload = function () {
            return resolve(_extends({}, data, {
              naturalWidth: image.naturalWidth,
              naturalHeight: image.naturalHeight
            }));
          };
          image.onabort = reject;
          image.onerror = reject;
          image.alt = file.name;
          image.src = data.url;
        });
      }).then(function (_ref2) {
        var naturalWidth = _ref2.naturalWidth,
            naturalHeight = _ref2.naturalHeight,
            _ref2$rotate = _ref2.rotate,
            rotate = _ref2$rotate === undefined ? 0 : _ref2$rotate,
            _ref2$scaleX = _ref2.scaleX,
            scaleX = _ref2$scaleX === undefined ? 1 : _ref2$scaleX,
            _ref2$scaleY = _ref2.scaleY,
            scaleY = _ref2$scaleY === undefined ? 1 : _ref2$scaleY;
        return new Promise(function (resolve) {
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          var aspectRatio = naturalWidth / naturalHeight;
          var maxWidth = Math.max(options.maxWidth, 0) || Infinity;
          var maxHeight = Math.max(options.maxHeight, 0) || Infinity;
          var minWidth = Math.max(options.minWidth, 0) || 0;
          var minHeight = Math.max(options.minHeight, 0) || 0;
          var width = naturalWidth;
          var height = naturalHeight;

          if (maxWidth < Infinity && maxHeight < Infinity) {
            if (maxHeight * aspectRatio > maxWidth) {
              maxHeight = maxWidth / aspectRatio;
            } else {
              maxWidth = maxHeight * aspectRatio;
            }
          } else if (maxWidth < Infinity) {
            maxHeight = maxWidth / aspectRatio;
          } else if (maxHeight < Infinity) {
            maxWidth = maxHeight * aspectRatio;
          }

          if (minWidth > 0 && minHeight > 0) {
            if (minHeight * aspectRatio > minWidth) {
              minHeight = minWidth / aspectRatio;
            } else {
              minWidth = minHeight * aspectRatio;
            }
          } else if (minWidth > 0) {
            minHeight = minWidth / aspectRatio;
          } else if (minHeight > 0) {
            minWidth = minHeight * aspectRatio;
          }

          if (options.width > 0) {
            var _options = options;
            width = _options.width;

            height = width / aspectRatio;
          } else if (options.height > 0) {
            var _options2 = options;
            height = _options2.height;

            width = height * aspectRatio;
          }

          width = Math.min(Math.max(width, minWidth), maxWidth);
          height = Math.min(Math.max(height, minHeight), maxHeight);

          var destX = -width / 2;
          var destY = -height / 2;
          var destWidth = width;
          var destHeight = height;

          if (Math.abs(rotate) % 180 === 90) {
            var _width$height = {
              width: height,
              height: width
            };
            width = _width$height.width;
            height = _width$height.height;
          }

          canvas.width = width;
          canvas.height = height;

          // Override the default fill color (#000, black)
          context.fillStyle = 'transparent';
          context.fillRect(0, 0, width, height);
          context.save();
          context.translate(width / 2, height / 2);
          context.rotate(rotate * Math.PI / 180);
          context.scale(scaleX, scaleY);
          context.drawImage(image, Math.floor(destX), Math.floor(destY), Math.floor(destWidth), Math.floor(destHeight));
          context.restore();

          if (!isImageType(options.mimeType)) {
            options.mimeType = file.type;
          }

          // Converts PNG files over the `convertSize` to JPEGs.
          if (file.size > options.convertSize && options.mimeType === 'image/png') {
            options.mimeType = 'image/jpeg';
          }

          if (canvas.toBlob) {
            canvas.toBlob(resolve, options.mimeType, options.quality);
          } else {
            resolve(canvasToBlob(canvas.toDataURL(options.mimeType, options.quality)));
          }
        });
      }).then(function (result) {
        if (URL) {
          URL.revokeObjectURL(image.src);
        }

        if (result) {
          // Returns original file if the result is greater than it and without size related options
          if (result.size > file.size && !(options.width > 0 || options.height > 0 || options.maxWidth < Infinity || options.maxHeight < Infinity || options.minWidth > 0 || options.minHeight > 0)) {
            result = file;
          } else {
            var date = new Date();

            result.lastModified = date.getTime();
            result.lastModifiedDate = date;
            result.name = file.name;

            // Convert the extension to match its type
            if (result.name && result.type !== file.type) {
              result.name = result.name.replace(REGEXP_EXTENSION, imageTypeToExtension(result.type));
            }
          }
        } else {
          // Returns original file if the result is null in some cases.
          result = file;
        }

        _this.result = result;

        if (options.success) {
          options.success(result);
        }

        return Promise.resolve(result);
      }).catch(function (err) {
        if (!options.error) {
          throw err;
        }

        options.error(err);
      });
    }
  }]);
  return ImageCompressor;
}();

return ImageCompressor;

})));


/***/ }),

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Name: vue-upload-component
 * Version: 2.6.3
 * Author: LianYue
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueUploadComponent = factory());
}(this, (function () { 'use strict';

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var InputFile = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('input', { attrs: { "type": "file", "name": _vm.$parent.name, "id": _vm.$parent.inputId || _vm.$parent.name, "accept": _vm.$parent.accept, "webkitdirectory": _vm.$parent.directory && _vm.$parent.features.directory, "directory": _vm.$parent.directory && _vm.$parent.features.directory, "multiple": _vm.$parent.multiple && _vm.$parent.features.html5 }, on: { "change": _vm.change } });
  }, staticRenderFns: [],
  methods: {
    change: function change(e) {
      this.$destroy();
      this.$parent.addInputFile(e.target);
      // eslint-disable-next-line
      new this.constructor({
        parent: this.$parent,
        el: this.$el
      });
    }
  }
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = " .file-uploads { overflow: hidden; position: relative; text-align: center; display: inline-block; } .file-uploads.file-uploads-html4 input[type=\"file\"] { opacity: 0; font-size: 20em; z-index: 1; top: 0; left: 0; right: 0; bottom: 0; position: absolute; width: 100%; height: 100%; } .file-uploads.file-uploads-html5 input[type=\"file\"] { overflow: hidden; position: fixed; width: 1px; height: 1px; z-index: -1; opacity: 0; } ";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var FileUpload = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('label', { class: _vm.className }, [_vm._t("default"), _vm._v(" "), _c('input-file')], 2);
  }, staticRenderFns: [],
  components: {
    InputFile: InputFile
  },
  props: {
    inputId: {
      type: String
    },

    name: {
      type: String,
      default: 'file'
    },

    accept: {
      type: String
    },

    multiple: {
      type: Boolean
    },

    addIndex: {
      type: [Boolean, Number]
    },

    directory: {
      type: Boolean
    },

    postAction: {
      type: String
    },

    putAction: {
      type: String
    },

    headers: {
      type: Object,
      default: Object
    },

    data: {
      type: Object,
      default: Object
    },

    timeout: {
      type: Number,
      default: 0
    },

    drop: {
      default: false
    },

    dropDirectory: {
      type: Boolean,
      default: true
    },

    size: {
      type: Number,
      default: 0
    },

    extensions: {
      default: Array
    },

    value: {
      type: Array,
      default: Array
    },

    thread: {
      type: Number,
      default: 1
    }
  },

  data: function data() {
    return {
      files: this.value,
      features: {
        html5: true,
        directory: false,
        drag: false
      },

      active: false,
      dropActive: false,

      uploading: 0,

      destroy: false
    };
  },


  /**
   * mounted
   * @return {[type]} [description]
   */
  mounted: function mounted() {
    var input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;

    // html5 特征
    if (window.FormData && input.files) {
      // 上传目录特征
      if (typeof input.webkitdirectory === 'boolean' || typeof input.directory === 'boolean') {
        this.features.directory = true;
      }

      // 拖拽特征
      if (this.features.html5 && typeof input.ondrop !== 'undefined') {
        this.features.drop = true;
      }
    } else {
      this.features.html5 = false;
    }

    // files 定位缓存
    this.maps = {};

    this.$nextTick(function () {

      // 更新下父级
      if (this.$parent) {
        this.$parent.$forceUpdate();
      }

      // 拖拽渲染
      this.watchDrop(this.drop);
    });
  },


  /**
   * beforeDestroy
   * @return {[type]} [description]
   */
  beforeDestroy: function beforeDestroy() {
    // 已销毁
    this.destroy = true;

    // 设置成不激活
    this.active = false;
  },


  computed: {
    /**
     * uploading 正在上传的线程
     * @return {[type]} [description]
     */

    /**
     * uploaded 文件列表是否全部已上传
     * @return {[type]} [description]
     */
    uploaded: function uploaded() {
      var file = void 0;
      for (var i = 0; i < this.files.length; i++) {
        file = this.files[i];
        if (file.fileObject && !file.error && !file.success) {
          return false;
        }
      }
      return true;
    },
    className: function className() {
      return ['file-uploads', this.features.html5 ? 'file-uploads-html5' : 'file-uploads-html4', this.features.directory && this.directory ? 'file-uploads-directory' : undefined, this.features.drop && this.drop ? 'file-uploads-drop' : undefined];
    }
  },

  watch: {
    active: function active(_active) {
      this.watchActive(_active);
    },
    dropActive: function dropActive() {
      if (this.$parent) {
        this.$parent.$forceUpdate();
      }
    },
    drop: function drop(value) {
      this.watchDrop(value);
    },
    value: function value(files) {
      if (this.files === files) {
        return;
      }
      this.files = files;

      var oldMaps = this.maps;

      // 重写 maps 缓存
      this.maps = {};
      for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];
        this.maps[file.id] = file;
      }

      // add, update
      for (var key in this.maps) {
        var newFile = this.maps[key];
        var oldFile = oldMaps[key];
        if (newFile !== oldFile) {
          this.emitFile(newFile, oldFile);
        }
      }

      // delete
      for (var _key in oldMaps) {
        if (!this.maps[_key]) {
          this.emitFile(undefined, oldMaps[_key]);
        }
      }
    }
  },

  methods: {

    // 清空
    clear: function clear() {
      if (this.files.length) {
        var files = this.files;
        this.files = [];

        // 定位
        this.maps = {};

        // 事件
        this.emitInput();
        for (var i = 0; i < files.length; i++) {
          this.emitFile(undefined, files[i]);
        }
      }
      return true;
    },


    // 选择
    get: function get(id) {
      if (!id) {
        return false;
      }

      if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) === 'object') {
        return this.maps[id.id] || false;
      }

      return this.maps[id] || false;
    },


    // 添加
    add: function add(_files) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.addIndex;

      var files = _files;
      var isArray = files instanceof Array;

      // 不是数组整理成数组
      if (!isArray) {
        files = [files];
      }

      // 遍历规范对象
      var addFiles = [];
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (this.features.html5 && file instanceof Blob) {
          file = {
            file: file,
            size: file.size,
            name: file.webkitRelativePath || file.relativePath || file.name || 'unknown',
            type: file.type
          };
        }
        var fileObject = false;
        if (file.fileObject === false) {
          // false
        } else if (file.fileObject) {
          fileObject = true;
        } else if (typeof Element !== 'undefined' && file.el instanceof Element) {
          fileObject = true;
        } else if (typeof Blob !== 'undefined' && file.file instanceof Blob) {
          fileObject = true;
        }
        if (fileObject) {
          file = _extends({
            fileObject: true,
            size: -1,
            name: 'Filename',
            type: '',
            active: false,
            error: '',
            success: false,
            putAction: this.putAction,
            postAction: this.postAction,
            timeout: this.timeout
          }, file, {
            response: {},

            progress: '0.00', // 只读
            speed: 0 // 只读
            // xhr: false,                // 只读
            // iframe: false,             // 只读
          });

          file.data = _extends({}, this.data, file.data ? file.data : {});

          file.headers = _extends({}, this.headers, file.headers ? file.headers : {});
        }

        // 必须包含 id
        if (!file.id) {
          file.id = Math.random().toString(36).substr(2);
        }

        if (this.emitFilter(file, undefined)) {
          continue;
        }

        addFiles.push(file);

        // 只允许单个文件
        if (!this.multiple) {
          break;
        }
      }

      // 没有文件
      if (!addFiles.length) {
        return false;
      }

      // 只允许单个文件 删除所有
      if (!this.multiple) {
        this.clear();
      }

      // 添加进去 files
      var newFiles = void 0;
      if (index === true || index === 0) {
        newFiles = addFiles.concat(this.files);
      } else if (index) {
        newFiles = addFiles.concat([]);
        newFiles.splice(index, 0, addFiles);
      } else {
        newFiles = this.files.concat(addFiles);
      }

      this.files = newFiles;

      // 定位
      for (var _i = 0; _i < addFiles.length; _i++) {
        var _file2 = addFiles[_i];
        this.maps[_file2.id] = _file2;
      }

      // 事件
      this.emitInput();
      for (var _i2 = 0; _i2 < addFiles.length; _i2++) {
        this.emitFile(addFiles[_i2], undefined);
      }

      return isArray ? addFiles : addFiles[0];
    },


    // 添加表单文件
    addInputFile: function addInputFile(el) {
      var files = [];
      if (el.files) {
        for (var i = 0; i < el.files.length; i++) {
          var file = el.files[i];
          files.push({
            size: file.size,
            name: file.webkitRelativePath || file.relativePath || file.name,
            type: file.type,
            file: file,
            el: el
          });
        }
      } else {
        files.push({
          name: el.value.replace(/^.*?([^\/\\\r\n]+)$/, '$1'),
          el: el
        });
      }
      return this.add(files);
    },


    // 添加 DataTransfer
    addDataTransfer: function addDataTransfer(dataTransfer) {
      var _this = this;

      var files = [];
      if (dataTransfer.items && dataTransfer.items.length) {
        var items = [];
        for (var i = 0; i < dataTransfer.items.length; i++) {
          var item = dataTransfer.items[i];
          if (item.getAsEntry) {
            item = item.getAsEntry();
          } else if (item.webkitGetAsEntry) {
            item = item.webkitGetAsEntry();
          } else {
            item = item.getAsFile();
          }
          if (item) {
            items.push(item);
          }
        }

        return new Promise(function (resolve, reject) {
          var forEach = function forEach(i) {
            var item = items[i];
            // 结束 或者已有文件了
            if (!item || !_this.multiple && files.length) {
              return resolve(_this.add(files));
            }
            _this.getEntry(item).then(function (results) {
              files.push.apply(files, _toConsumableArray(results));
              forEach(i + 1);
            });
          };
          forEach(0);
        });
      }

      if (dataTransfer.files.length) {
        for (var _i3 = 0; _i3 < dataTransfer.files.length; _i3++) {
          files.push(dataTransfer.files[_i3]);
          if (!this.multiple) {
            break;
          }
        }
        return Promise.resolve(this.add(files));
      }

      return Promise.resolve([]);
    },


    // 获得 entry
    getEntry: function getEntry(entry) {
      var _this2 = this;

      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return new Promise(function (resolve, reject) {
        if (entry.isFile) {
          entry.file(function (file) {
            resolve([{
              size: file.size,
              name: path + file.name,
              type: file.type,
              file: file
            }]);
          });
        } else if (entry.isDirectory && _this2.dropDirectory) {
          entry.createReader().readEntries(function (entries) {
            var files = [];
            var forEach = function forEach(i) {
              if (!entries[i] || files.length && !_this2.multiple) {
                return resolve(files);
              }
              _this2.getEntry(entries[i], path + entry.name + '/').then(function (results) {
                files.push.apply(files, _toConsumableArray(results));
                forEach(i + 1);
              });
            };
            forEach(0);
          });
        } else {
          resolve([]);
        }
      });
    },
    replace: function replace(id1, id2) {
      var file1 = this.get(id1);
      var file2 = this.get(id2);
      if (!file1 || !file2 || file1 === file2) {
        return false;
      }
      var files = this.files.concat([]);
      var index1 = files.indexOf(file1);
      var index2 = files.indexOf(file2);
      if (index1 === -1 || index2 === -1) {
        return false;
      }
      files[index1] = file2;
      files[index2] = file1;
      this.files = files;
      this.emitInput();
      return true;
    },


    // 移除
    remove: function remove(id) {
      var file = this.get(id);
      if (file) {
        if (this.emitFilter(undefined, file)) {
          return false;
        }
        var files = this.files.concat([]);
        var index = files.indexOf(file);
        if (index === -1) {
          console.error('remove', file);
          return false;
        }
        files.splice(index, 1);
        this.files = files;

        // 定位
        delete this.maps[file.id];

        // 事件
        this.emitInput();
        this.emitFile(undefined, file);
      }
      return file;
    },


    // 更新
    update: function update(id, data) {
      var file = this.get(id);
      if (file) {
        var newFile = _extends({}, file, data);
        // 停用必须加上错误
        if (file.fileObject && file.active && !newFile.active && !newFile.error && !newFile.success) {
          newFile.error = 'abort';
        }

        if (this.emitFilter(newFile, file)) {
          return false;
        }

        var files = this.files.concat([]);
        var index = files.indexOf(file);
        if (index === -1) {
          console.error('update', file);
          return false;
        }
        files.splice(index, 1, newFile);
        this.files = files;

        // 删除  旧定位 写入 新定位 （已便支持修改id)
        delete this.maps[file.id];
        this.maps[newFile.id] = newFile;

        // 事件
        this.emitInput();
        this.emitFile(newFile, file);
        return newFile;
      }
      return false;
    },


    // 预处理 事件 过滤器
    emitFilter: function emitFilter(newFile, oldFile) {
      var isPrevent = false;
      this.$emit('input-filter', newFile, oldFile, function () {
        isPrevent = true;
        return isPrevent;
      });
      return isPrevent;
    },


    // 处理后 事件 分发
    emitFile: function emitFile(newFile, oldFile) {
      this.$emit('input-file', newFile, oldFile);
      if (newFile && newFile.fileObject && newFile.active && (!oldFile || !oldFile.active)) {
        this.uploading++;
        // 激活
        this.$nextTick(function () {
          var _this3 = this;

          setTimeout(function () {
            _this3.upload(newFile).then(function () {
              // eslint-disable-next-line
              newFile = _this3.get(newFile);
              if (newFile && newFile.fileObject) {
                _this3.update(newFile, {
                  active: false,
                  success: !newFile.error
                });
              }
            }).catch(function (e) {
              _this3.update(newFile, {
                active: false,
                success: false,
                error: e.code || e.error || e.message || e
              });
            });
          }, parseInt(Math.random() * 50 + 50, 10));
        });
      } else if ((!newFile || !newFile.fileObject || !newFile.active) && oldFile && oldFile.fileObject && oldFile.active) {
        // 停止
        this.uploading--;
      }

      // 自动延续激活
      if (this.active && (Boolean(newFile) !== Boolean(oldFile) || newFile.active !== oldFile.active)) {
        this.watchActive(true);
      }
    },
    emitInput: function emitInput() {
      this.$emit('input', this.files);
    },


    // 上传
    upload: function upload(id) {
      var file = this.get(id);

      // 被删除
      if (!file) {
        return Promise.reject('not_exists');
      }

      // 不是文件对象
      if (!file.fileObject) {
        return Promise.reject('file_object');
      }

      // 有错误直接响应
      if (file.error) {
        return Promise.reject(file.error);
      }

      // 已完成直接响应
      if (file.success) {
        return Promise.resolve(file);
      }

      // 后缀
      var extensions = this.extensions;
      if (extensions && (extensions.length || typeof extensions.length === 'undefined')) {
        if ((typeof extensions === 'undefined' ? 'undefined' : _typeof(extensions)) !== 'object' || !(extensions instanceof RegExp)) {
          if (typeof extensions === 'string') {
            extensions = extensions.split(',').map(function (value) {
              return value.trim();
            }).filter(function (value) {
              return value;
            });
          }
          extensions = new RegExp('\\.(' + extensions.join('|').replace(/\./g, '\\.') + ')$', 'i');
        }
        if (file.name.search(extensions) === -1) {
          return Promise.reject('extension');
        }
      }

      // 大小
      if (this.size > 0 && file.size >= 0 && file.size > this.size) {
        return Promise.reject('size');
      }

      if (this.features.html5 && file.putAction) {
        return this.uploadPut(file);
      } else if (this.features.html5) {
        return this.uploadHtml5(file);
      } else {
        return this.uploadHtml4(file);
      }
    },
    uploadPut: function uploadPut(file) {
      var querys = [];
      var value = void 0;
      for (var key in file.data) {
        value = file.data[key];
        if (value !== null && value !== undefined) {
          querys.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
      }
      var queryString = querys.length ? (file.putAction.indexOf('?') === -1 ? '?' : '&') + querys.join('&') : '';
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', file.putAction + queryString);
      return this.uploadXhr(xhr, file, file.file);
    },
    uploadHtml5: function uploadHtml5(file) {
      var form = new window.FormData();
      var value = void 0;
      for (var key in file.data) {
        value = file.data[key];
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toString !== 'function') {
          if (value instanceof File) {
            form.append(key, value, value.name);
          } else {
            form.append(key, JSON.stringify(value));
          }
        } else if (value !== null && value !== undefined) {
          form.append(key, value);
        }
      }
      form.append(this.name, file.file, file.file.filename || file.name);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', file.postAction);
      return this.uploadXhr(xhr, file, form);
    },
    uploadXhr: function uploadXhr(xhr, _file, body) {
      var _this4 = this;

      var file = _file;
      var speedTime = 0;
      var speedLoaded = 0;

      // 进度条
      xhr.upload.onprogress = function (e) {
        // 还未开始上传 已删除 未激活
        file = _this4.get(file);
        if (!e.lengthComputable || !file || !file.fileObject || !file.active) {
          return;
        }

        // 进度 速度 每秒更新一次
        var speedTime2 = Math.round(Date.now() / 1000);
        if (speedTime2 === speedTime) {
          return;
        }
        speedTime = speedTime2;

        file = _this4.update(file, {
          progress: (e.loaded / e.total * 100).toFixed(2),
          speed: e.loaded - speedLoaded
        });
        speedLoaded = e.loaded;
      };

      // 检查激活状态
      var interval = setInterval(function () {
        file = _this4.get(file);
        if (file && file.fileObject && !file.success && !file.error && file.active) {
          return;
        }

        if (interval) {
          clearInterval(interval);
          interval = false;
        }

        try {
          xhr.abort();
          xhr.timeout = 1;
        } catch (e) {}
      }, 100);

      return new Promise(function (resolve, reject) {
        var complete = void 0;
        var fn = function fn(e) {
          // 已经处理过了
          if (complete) {
            return;
          }
          complete = true;
          if (interval) {
            clearInterval(interval);
            interval = false;
          }

          file = _this4.get(file);

          // 不存在直接响应
          if (!file) {
            return reject('not_exists');
          }

          // 不是文件对象
          if (!file.fileObject) {
            return reject('file_object');
          }

          // 有错误自动响应
          if (file.error) {
            return reject(file.error);
          }

          // 未激活
          if (!file.active) {
            return reject('abort');
          }

          // 已完成 直接相应
          if (file.success) {
            return resolve(file);
          }

          var data = {};

          switch (e.type) {
            case 'timeout':
            case 'abort':
              data.error = e.type;
              break;
            case 'error':
              if (!xhr.status) {
                data.error = 'network';
              } else if (xhr.status >= 500) {
                data.error = 'server';
              } else if (xhr.status >= 400) {
                data.error = 'denied';
              }
              break;
            default:
              if (xhr.status >= 500) {
                data.error = 'server';
              } else if (xhr.status >= 400) {
                data.error = 'denied';
              } else {
                data.progress = '100.00';
              }
          }

          if (xhr.responseText) {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (contentType && contentType.indexOf('/json') !== -1) {
              data.response = JSON.parse(xhr.responseText);
            } else {
              data.response = xhr.responseText;
            }
          }

          // 更新
          file = _this4.update(file, data);

          // 相应错误
          if (file.error) {
            return reject(file.error);
          }

          // 响应
          return resolve(file);
        };

        // 事件
        xhr.onload = fn;
        xhr.onerror = fn;
        xhr.onabort = fn;
        xhr.ontimeout = fn;

        // 超时
        if (file.timeout) {
          xhr.timeout = file.timeout;
        }

        // headers
        for (var key in file.headers) {
          xhr.setRequestHeader(key, file.headers[key]);
        }

        // 更新 xhr
        file = _this4.update(file, { xhr: xhr });

        // 开始上传
        xhr.send(body);
      });
    },
    uploadHtml4: function uploadHtml4(_file) {
      var _this5 = this;

      var file = _file;
      var onKeydown = function onKeydown(e) {
        if (e.keyCode === 27) {
          e.preventDefault();
        }
      };

      var iframe = document.createElement('iframe');
      iframe.id = 'upload-iframe-' + file.id;
      iframe.name = 'upload-iframe-' + file.id;
      iframe.src = 'about:blank';
      iframe.setAttribute('style', 'width:1px;height:1px;top:-999em;position:absolute; margin-top:-999em;');

      var form = document.createElement('form');

      form.action = file.postAction;

      form.name = 'upload-form-' + file.id;

      form.setAttribute('method', 'POST');
      form.setAttribute('target', 'upload-iframe-' + file.id);
      form.setAttribute('enctype', 'multipart/form-data');

      var value = void 0;
      var input = void 0;
      for (var key in file.data) {
        value = file.data[key];
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toString !== 'function') {
          value = JSON.stringify(value);
        }
        if (value !== null && value !== undefined) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          form.appendChild(input);
        }
      }
      form.appendChild(file.el);

      document.body.appendChild(iframe).appendChild(form);

      var getResponseData = function getResponseData() {
        var doc = void 0;
        try {
          if (iframe.contentWindow) {
            doc = iframe.contentWindow.document;
          }
        } catch (err) {}
        if (!doc) {
          try {
            doc = iframe.contentDocument ? iframe.contentDocument : iframe.document;
          } catch (err) {
            doc = iframe.document;
          }
        }
        if (doc && doc.body) {
          return doc.body.innerHTML;
        }
        return null;
      };

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          file = _this5.update(file, { iframe: iframe });

          // 不存在
          if (!file) {
            return reject('not_exists');
          }

          // 定时检查
          var interval = setInterval(function () {
            file = _this5.get(file);
            if (file && file.fileObject && !file.success && !file.error && file.active) {
              return;
            }

            if (interval) {
              clearInterval(interval);
              interval = false;
            }

            iframe.onabort({ type: file ? 'abort' : 'not_exists' });
          }, 100);

          var complete = void 0;
          var fn = function fn(e) {
            // 已经处理过了
            if (complete) {
              return;
            }
            complete = true;

            if (interval) {
              clearInterval(interval);
              interval = false;
            }

            // 关闭 esc 事件
            document.body.removeEventListener('keydown', onKeydown);

            file = _this5.get(file);

            // 不存在直接响应
            if (!file) {
              return reject('not_exists');
            }

            // 不是文件对象
            if (!file.fileObject) {
              return reject('file_object');
            }

            // 有错误自动响应
            if (file.error) {
              return reject(file.error);
            }

            // 未激活
            if (!file.active) {
              return reject('abort');
            }

            // 已完成 直接相应
            if (file.success) {
              return resolve(file);
            }

            var response = getResponseData();
            var data = {};
            switch (e.type) {
              case 'abort':
                data.error = 'abort';
                break;
              case 'error':
                if (file.error) {
                  data.error = file.error;
                } else if (response === null) {
                  data.error = 'network';
                } else {
                  data.error = 'denied';
                }
                break;
              default:
                if (file.error) {
                  data.error = file.error;
                } else if (data === null) {
                  data.error = 'network';
                } else {
                  data.progress = '100.00';
                }
            }

            if (response !== null) {
              if (response && response.substr(0, 1) === '{' && response.substr(response.length - 1, 1) === '}') {
                try {
                  response = JSON.parse(response);
                } catch (err) {}
              }
              data.response = response;
            }

            // 更新
            file = _this5.update(file, data);

            if (file.error) {
              return reject(file.error);
            }

            // 响应
            return resolve(file);
          };

          // 添加事件
          iframe.onload = fn;
          iframe.onerror = fn;
          iframe.onabort = fn;

          // 禁止 esc 键
          document.body.addEventListener('keydown', onKeydown);

          // 提交
          form.submit();
        }, 50);
      }).then(function (res) {
        iframe.parentNode && iframe.parentNode.removeChild(iframe);
        return res;
      }).catch(function (res) {
        iframe.parentNode && iframe.parentNode.removeChild(iframe);
        return res;
      });
    },
    watchActive: function watchActive(active) {
      var file = void 0;
      var index = 0;
      while (file = this.files[index]) {
        index++;
        if (!file.fileObject) {
          // 不是文件对象
        } else if (active && !this.destroy) {
          if (this.uploading >= this.thread || this.uploading && !this.features.html5) {
            break;
          }
          if (!file.active && !file.error && !file.success) {
            this.update(file, { active: true });
          }
        } else {
          if (file.active) {
            this.update(file, { active: false });
          }
        }
      }
      if (this.uploading === 0) {
        this.active = false;
      }
    },
    watchDrop: function watchDrop(_el) {
      var el = _el;
      if (!this.features.drop) {
        return;
      }

      // 移除挂载
      if (this.dropElement) {
        try {
          document.removeEventListener('dragenter', this.onDragenter, false);
          document.removeEventListener('dragleave', this.onDragleave, false);
          this.dropElement.removeEventListener('dragover', this.onDragover, false);
          this.dropElement.removeEventListener('drop', this.onDrop, false);
        } catch (e) {}
      }

      if (!el) {
        el = false;
      } else if (typeof el === 'string') {
        el = document.querySelector(el) || this.$root.$el.querySelector(el);
      } else if (el === true) {
        el = this.$parent.$el;
      }

      this.dropElement = el;

      if (this.dropElement) {
        document.addEventListener('dragenter', this.onDragenter, false);
        document.addEventListener('dragleave', this.onDragleave, false);
        this.dropElement.addEventListener('dragover', this.onDragover, false);
        this.dropElement.addEventListener('drop', this.onDrop, false);
      }
    },
    onDragenter: function onDragenter(e) {
      e.preventDefault();
      if (!this.dropActive) {
        this.dropActive = true;
      }
    },
    onDragleave: function onDragleave(e) {
      e.preventDefault();
      if (e.target.nodeName === 'HTML' || e.screenX === 0 && e.screenY === 0 && e.screenY === 0 && !e.fromElement && e.offsetX < 0) {
        this.dropActive = false;
      }
    },
    onDragover: function onDragover(e) {
      e.preventDefault();
    },
    onDrop: function onDrop(e) {
      e.preventDefault();
      this.dropActive = false;
      this.addDataTransfer(e.dataTransfer);
    }
  }
};

var FileUpload$1 = Object.freeze({
	default: FileUpload
});

var require$$0 = ( FileUpload$1 && FileUpload ) || FileUpload$1;

var src = require$$0;

return src;

})));
//# sourceMappingURL=vue-upload-component.js.map


/***/ }),

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(693), __esModule: true };

/***/ }),

/***/ 693:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(694);
module.exports = __webpack_require__(31).Object.values;


/***/ }),

/***/ 694:
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(60);
var $values = __webpack_require__(695)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(91);
var toIObject = __webpack_require__(53);
var isEnum = __webpack_require__(92).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),

/***/ 832:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(833);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(648)("53e99156", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c5205e8c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c5205e8c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(626)(true);
// imports


// module
exports.push([module.i, "\nthead.datatable__progress[data-v-c5205e8c] {\n    display: none;\n}\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/pages/Dashboard.vue?8993ad46"],"names":[],"mappings":";AAwbA;IACA,cAAA;CACA","file":"Dashboard.vue","sourcesContent":["<template>\n  <main-layout  :style=\"{ paddingTop: `100px`, backgroundColor: `white` }\">\n    <v-container  fluid>\n      <dash-panels :unpaid=\"unpaid\" :paid=\"paid\" :sent=\"sent\" :received=\"received\" :total=\"total\" :unsent=\"unsent\" :done=\"done\"></dash-panels>\n      <v-container fluid>\n\n            <v-data-table\n                :headers=\"headers\"\n                :items=\"items\"\n                light\n                expand\n            >\n            <template slot=\"items\" scope=\"props\">\n            <tr>\n                <td class=\"title text-xs-left primary--text\">\n                    <v-btn color=\"primary\" icon @click=\"props.expanded = !props.expanded\"><v-icon>shopping_basket</v-icon></v-btn>\n                    {{ props.item.id }}\n                </td>\n                <td class=\"title text-xs-left primary--text\">{{ totalAmount(props.item) | currency(currency) }}</td>\n\n                <td class=\"title text-xs-left primary--text\">\n                    <v-switch\n                        :label=\"`${props.item.payment.paid ? 'Paid' : 'Unpaid'}`\"\n                        v-model=\"props.item.payment.paid\"\n                        color=\"teal darken-4\"\n                        light\n                        :disabled=\"!hasRole('admin')\"\n                        @change=\"togglePaid(props.item)\"\n                        >\n                    </v-switch>\n                </td>\n\n                <td class=\"title text-xs-left primary--text\">\n                    <v-switch\n                        :label=\"`${props.item.shipment.sent ? 'Sent' : 'On-Hold'}`\"\n                        v-model=\"props.item.shipment.sent\"\n                        color=\"cyan\"\n                        light\n                        :disabled=\"!hasRole('admin')\"\n                        @change=\"toggleSent(props.item)\"\n                        v-if=\"props.item.shipment\"\n                        >\n                    </v-switch>\n                </td>\n                <td class=\"title text-xs-left primary--text\">\n                    <v-switch\n                        :label=\"`${props.item.shipment.received ? 'Received' : 'Pending'}`\"\n                        v-model=\"props.item.shipment.received\"\n                        color=\"light-green\"\n                        light\n                        @change=\"toggleReceived(props.item)\"\n                        v-if=\"props.item.shipment\"\n                        >\n                    </v-switch>\n                </td>\n                <td class=\"title text-xs-left primary--text\">\n                    <v-switch\n                        :label=\"`${props.item.done ? 'Completed' : 'On-Progress'}`\"\n                        v-model=\"props.item.done\"\n                        color=\"teal lighten-2\"\n                        light\n                        :disabled=\"!hasRole('admin')\"\n                        @change=\"toggleDone(props.item)\"\n                        >\n                    </v-switch>\n                </td>\n                <td class=\"title text-xs-center\">\n                    <v-btn :disabled=\"!can('edit_order')\"  flat icon color=\"accent\" @click.native=\"setCurrentOrder(props.item)\">\n                        <v-icon>fa-edit</v-icon>\n                    </v-btn>\n                    <v-btn :disabled=\"!can('delete_order')\" flat icon color=\"error\" @click.native=\"deleteOrder(props.item)\">\n                        <v-icon>fa-trash</v-icon>\n                    </v-btn>\n                </td>\n            </tr>\n            </template>\n\n            <template slot=\"expand\" scope=\"props\">\n                <v-data-table\n                    :items=\"getItems(props.item.cart)\"\n                    hide-actions\n                    light\n                    >\n                    <template slot=\"headers\" scope=\"orders\">\n                            <th class=\"text-xs-left\">Product</th>\n                            <th class=\"text-xs-left\">Qty</th>\n                            <th class=\"text-xs-left\">Price</th>\n                            <th class=\"text-xs-left\">Tax</th>\n                            <th class=\"text-xs-left\">Subtotal</th>\n                    </template>\n                        <template slot=\"items\" scope=\"orders\">\n                        <td class=\"text-xs-left\"><span class=\"primary--text\">{{ orders.item.name }}</span>\n                            <span v-if=\"orders.item.options !== {}\">\n                                <span  class=\"info--text caption\" v-for=\"(option,key) in orders.item.options\" :key=\"key\">({{ option }})</span>\n                            </span>\n                        </td>\n                        <td class=\"text-xs-left\">{{ orders.item.qty }}</td>\n                        <td class=\"text-xs-left\">{{ orders.item.price | currency(currency) }}</td>\n                        <td class=\"text-xs-left\">{{ parseFloat(orders.item.tax).toFixed(2) | currency(currency) }}</td>\n                        <td class=\"text-xs-left\">{{ orders.item.subtotal | currency(currency) }}</td>\n                        </template>\n                </v-data-table>\n            </template>\n\n            <template slot=\"pageText\" scope=\"{ pageStart, pageStop }\">\n                From {{ pageStart }} to {{ pageStop }}\n            </template>\n\n            </v-data-table>\n            <v-dialog v-model=\"dialog\" fullscreen transition=\"dialog-bottom-transition\" :overlay=\"false\">\n                <v-card :light=\"true\">\n                <v-toolbar  color=\"accent\">\n                    <v-btn icon @click.native=\"dialog = false\" class=\"error--text\">\n                    <v-icon>close</v-icon>\n                    </v-btn>\n                    <v-spacer></v-spacer>\n                    <v-toolbar-title class=\"primary--text\">Update Order No. {{ current_order.id }}</v-toolbar-title>\n                    <v-spacer></v-spacer>\n                    <v-toolbar-items>\n                    <v-btn  flat @click.native=\"dialog = false\" class=\"info--text\">Save</v-btn>\n                    </v-toolbar-items>\n                </v-toolbar>\n                <v-container fluid>\n                    <v-tabs v-model=\"active.name\">\n                        <v-tabs-bar class=\"accent\">\n                        <v-tabs-item\n                        v-for=\"(tab,key) in tabs\"\n                        :key=\"key\"\n                        :href=\"'#' + tab.name\"\n                        ripple\n                        >\n                        {{tab.name}}\n                        </v-tabs-item>\n                        <v-tabs-slider color=\"primary\"></v-tabs-slider>\n                        </v-tabs-bar>\n                        <v-tabs-items>\n                            <v-tabs-content\n                            v-for=\"(tab, key) in tabs\"\n                            :key=\"key\"\n                            :id=\"tab.name\"\n                            >\n                            <v-card flat :light=\"true\">\n                                <component :is=\"tab.component\" :tab=\"tab\" :order=\"current_order\">\n                                </component>\n                            </v-card>\n                            </v-tabs-content>\n                        </v-tabs-items>\n                    </v-tabs>\n                </v-layout>\n                </v-container>\n                </v-card>\n            </v-dialog>\n      </v-container>\n    </v-container>\n  </main-layout>\n</template>\n\n<script>\nimport MainLayout from '../layouts/Main.vue'\nimport Theme from '../mixins/theme'\nimport Acl from '../mixins/acl'\nimport DashPanels from '../partials/DashPanels.vue'\nimport CustomerDetails from '../components/dashboard/CustomerDetails.vue'\nimport PaymentDetails from '../components/dashboard/PaymentDetails.vue'\nimport ShippingDetails from '../components/dashboard/ShippingDetails.vue'\nimport ShipmentDetails from '../components/dashboard/ShipmentDetails.vue'\nimport FileUploader from '../components/dashboard/FileUploader.vue'\n\nexport default {\n    mixins: [Theme, Acl],\n    components: {\n        MainLayout,\n        DashPanels,\n        CustomerDetails,\n        PaymentDetails,\n        ShippingDetails,\n        ShipmentDetails,\n        FileUploader\n    },\n    data: () => ({\n        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },\n        currency: '₱',\n        dialog: false,\n        /* panels */\n        total: 0,\n        paid: 0,\n        sent: 0,\n        received: 0,\n        done: 0,\n        /* table */\n        headers: [\n            /* remove sort and value since we cant access dot anotation in item */\n            { text: 'Order No.', value: 'id', align: 'left', sortable: true },\n            { text: 'Amount', align: 'left', sortable: false },\n            { text: 'Paid', align: 'left', sortable: false },\n            { text: 'Sent', align: 'left', sortable: false },\n            { text: 'Received', align: 'left', sortable: false },\n            { text: 'Completed', align: 'left', sortable: false },\n            { text: 'Actions', align: 'center', sortable: false }\n        ],\n        items: [],\n        /* current updated item */\n        current_order: {},\n        /* tabs */\n        tabs: [\n            {name: 'customer details', component: 'customer-details'},\n            {name: 'shipping details', component: 'shipping-details'},\n            {name: 'payment details', component: 'payment-details'},\n            {name: 'shipment details', component: 'shipment-details'},\n            {name: 'upload receipt', component: 'file-uploader'}\n        ],\n        active: {\n            name: 'customer details'\n        },\n        toggleForm: new AppForm(App.forms.toggleForm)\n\n    }),\n    computed: {\n        unpaid () {\n            return this.total - this.paid\n        },\n        unsent () {\n            return this.total - this.sent\n        }\n    },\n    mounted () {\n        let self = this\n        self.fetchPanelStats()\n        Bus.$on('file-uploaded', (response) => {\n            let index = _.findIndex(self.items, { id: response.order.id })\n            self.$set(self.items, index, response.order)\n            self.current_order = response.order\n        })\n    },\n    methods: {\n        deleteOrder (order) {\n            let self = this\n            if (self.can('delete_order') || self.hasRole('admin')) {\n                axios.post(route('api.order.destroy', {order: order.id})).then(() => {\n                    self.total = self.total - 1\n                    if (self.total < 0) {\n                        self.total = 0\n                    }\n                    if (order.payment.paid) {\n                        self.paid = self.paid - 1\n                        if (self.paid < 0) {\n                            self.paid = 0\n                        }\n                    }\n                    if (order.shipment.sent) {\n                        self.sent = self.sent - 1\n                        if (self.sent < 0) {\n                            self.sent = 0\n                        }\n                    }\n                    if (order.shipment.received) {\n                        self.received = self.received - 1\n                        if (self.received < 0) {\n                            self.received = 0\n                        }\n                    }\n                    if (order.done) {\n                        self.done = self.done - 1\n                        if (self.done < 0) {\n                            self.done = 0\n                        }\n                    }\n                    let index = _.findIndex(self.items, { id: order.id })\n                    self.$delete(self.items, index)\n                    vm.$popup({ message: `Order#${order.id} Deleted!`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n                }).catch(({errors, message}) => {\n                    if (errors) {\n                        console.log(errors)\n                    }\n                    if (message) {\n                        console.log(message)\n                    }\n                })\n            } else {\n                vm.$popup({ message: 'Action Not Authorized!', backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n            }\n        },\n        resetToggleForm () {\n            this.toggleForm = new AppForm(App.forms.toggleForm)\n        },\n        togglePaid (order) {\n            let self = this\n            self.toggleForm.toggle = order.payment.paid\n            App.post(route('api.toggle.paid', {order: order.id}), self.toggleForm).then(({message}) => {\n                if (order.payment.paid) {\n                    this.paid = this.paid + 1\n                } else {\n                    this.paid = this.paid - 1\n                }\n                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n            }).catch(({errors, message}) => {\n                if (errors) {\n                    console.log(errors)\n                }\n                if (message) {\n                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n                }\n                order.payment.paid = !order.payment.paid\n            })\n        },\n        toggleSent (order) {\n            let self = this\n            self.toggleForm.toggle = order.shipment.sent\n            App.post(route('api.toggle.sent', {order: order.id}), self.toggleForm).then(({message}) => {\n                if (order.shipment.sent) {\n                    this.sent = this.sent + 1\n                } else {\n                    this.sent = this.sent - 1\n                }\n                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n            }).catch(({errors, message}) => {\n                if (errors) {\n                    console.log(errors)\n                }\n                if (message) {\n                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n                }\n                order.shipment.sent = !order.shipment.sent\n            })\n        },\n        toggleReceived (order) {\n            let self = this\n            self.toggleForm.toggle = order.shipment.received\n            App.post(route('api.toggle.received', {order: order.id}), self.toggleForm).then(({message}) => {\n                if (order.shipment.received) {\n                    this.received = this.received + 1\n                } else {\n                    this.received = this.received - 1\n                }\n                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n            }).catch(({errors, message}) => {\n                if (errors) {\n                    console.log(errors)\n                }\n                if (message) {\n                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n                }\n                order.shipment.received = !order.shipment.received\n            })\n            console.log('toggle received', order.shipment.received)\n        },\n        toggleDone (order) {\n            let self = this\n            self.toggleForm.toggle = order.done\n            App.post(route('api.toggle.done', {order: order.id}), self.toggleForm).then(({message}) => {\n                if (order.done) {\n                    this.done = this.done + 1\n                } else {\n                    this.done = this.done - 1\n                }\n                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n            }).catch(({errors, message}) => {\n                if (errors) {\n                    console.log(errors)\n                }\n                if (message) {\n                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n                }\n                order.done = !order.done\n            })\n        },\n        parseNumber (str) {\n            var strg = str || ''\n            var decimal = '.'\n            strg = strg.replace(/[^0-9$.,]/g, '')\n            if (strg.indexOf(',') > strg.indexOf('.')) decimal = ','\n            if ((strg.match(new RegExp('\\\\' + decimal, 'g')) || []).length > 1) decimal = ''\n            if (decimal !== '' && (strg.length - strg.indexOf(decimal) - 1 == 3) && strg.indexOf('0' + decimal) !== 0) decimal = ''\n            strg = strg.replace(new RegExp('[^0-9$' + decimal + ']', 'g'), '')\n            strg = strg.replace(',', '.')\n            return parseFloat(strg)\n        },\n        getCart (cart) {\n            return JSON.parse(cart)\n        },\n        getItems (cart) {\n            return Object.values(JSON.parse(cart)['items'])\n        },\n        setCurrentOrder (order) {\n            this.dialog = true\n            this.current_order = order\n            Bus.$emit('set-order', this.current_order)\n            /* Check for Shipment Type if Meet Up Or Pick Up Remove Shipping Details From Tabs */\n            let customer = Object.assign({name: 'customer details', component: 'customer-details'}, JSON.parse(this.current_order.customer_details))\n            let shipping = Object.assign({name: 'shipping details', component: 'shipping-details'}, JSON.parse(this.current_order.shipping_details))\n            let uploads = Object.assign({name: 'upload receipt', component: 'file-uploader'})\n            this.tabs = [\n                customer,\n                shipping\n            ]\n            let payment = null\n            if (this.current_order.payment) {\n                payment = Object.assign({name: 'payment details', component: 'payment-details'}, this.current_order.payment)\n                this.tabs.push(payment)\n            }\n            let shipment = null\n            if (this.current_order.shipment) {\n                shipment = Object.assign({name: 'shipment details', component: 'shipment-details'}, this.current_order.shipment)\n                this.tabs.push(shipment)\n            }\n            this.tabs.push(uploads)\n        },\n        fetchPanelStats () {\n            let self = this\n            axios.get(route('api.panel.stats')).then((response) => {\n                self.items = response.data.orders\n                self.total = response.data.total\n                self.sent = response.data.sent\n                self.paid = response.data.paid\n                self.received = response.data.received\n                self.done = response.data.done\n            })\n        },\n        totalAmount (item) {\n            let cart = JSON.parse(item.cart)\n            let total = null\n            if (item.shipment) {\n                total = this.parseNumber(cart.total) + parseFloat(item.shipment.shipping_fee)\n            } else {\n                total = this.parseNumber(cart.total)\n            }\n            return total.toFixed(2)\n        }\n    },\n    watch: {\n        items: {\n            handler: function () {\n            },\n            deep: true\n        }\n    }\n}\n</script>\n\n<style scoped>\nthead.datatable__progress {\n    display: none;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_theme__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_acl__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__partials_DashPanels_vue__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__partials_DashPanels_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__partials_DashPanels_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_dashboard_CustomerDetails_vue__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_dashboard_CustomerDetails_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_dashboard_CustomerDetails_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_dashboard_PaymentDetails_vue__ = __webpack_require__(843);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_dashboard_PaymentDetails_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_dashboard_PaymentDetails_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_dashboard_ShippingDetails_vue__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_dashboard_ShippingDetails_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_dashboard_ShippingDetails_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_dashboard_ShipmentDetails_vue__ = __webpack_require__(853);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_dashboard_ShipmentDetails_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_dashboard_ShipmentDetails_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_dashboard_FileUploader_vue__ = __webpack_require__(858);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_dashboard_FileUploader_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_dashboard_FileUploader_vue__);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_theme__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_acl__["a" /* default */]],
    components: {
        MainLayout: __WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue___default.a,
        DashPanels: __WEBPACK_IMPORTED_MODULE_5__partials_DashPanels_vue___default.a,
        CustomerDetails: __WEBPACK_IMPORTED_MODULE_6__components_dashboard_CustomerDetails_vue___default.a,
        PaymentDetails: __WEBPACK_IMPORTED_MODULE_7__components_dashboard_PaymentDetails_vue___default.a,
        ShippingDetails: __WEBPACK_IMPORTED_MODULE_8__components_dashboard_ShippingDetails_vue___default.a,
        ShipmentDetails: __WEBPACK_IMPORTED_MODULE_9__components_dashboard_ShipmentDetails_vue___default.a,
        FileUploader: __WEBPACK_IMPORTED_MODULE_10__components_dashboard_FileUploader_vue___default.a
    },
    data: function data() {
        return {
            contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
            currency: '₱',
            dialog: false,
            /* panels */
            total: 0,
            paid: 0,
            sent: 0,
            received: 0,
            done: 0,
            /* table */
            headers: [
            /* remove sort and value since we cant access dot anotation in item */
            { text: 'Order No.', value: 'id', align: 'left', sortable: true }, { text: 'Amount', align: 'left', sortable: false }, { text: 'Paid', align: 'left', sortable: false }, { text: 'Sent', align: 'left', sortable: false }, { text: 'Received', align: 'left', sortable: false }, { text: 'Completed', align: 'left', sortable: false }, { text: 'Actions', align: 'center', sortable: false }],
            items: [],
            /* current updated item */
            current_order: {},
            /* tabs */
            tabs: [{ name: 'customer details', component: 'customer-details' }, { name: 'shipping details', component: 'shipping-details' }, { name: 'payment details', component: 'payment-details' }, { name: 'shipment details', component: 'shipment-details' }, { name: 'upload receipt', component: 'file-uploader' }],
            active: {
                name: 'customer details'
            },
            toggleForm: new AppForm(App.forms.toggleForm)

        };
    },
    computed: {
        unpaid: function unpaid() {
            return this.total - this.paid;
        },
        unsent: function unsent() {
            return this.total - this.sent;
        }
    },
    mounted: function mounted() {
        var self = this;
        self.fetchPanelStats();
        Bus.$on('file-uploaded', function (response) {
            var index = _.findIndex(self.items, { id: response.order.id });
            self.$set(self.items, index, response.order);
            self.current_order = response.order;
        });
    },

    methods: {
        deleteOrder: function deleteOrder(order) {
            var self = this;
            if (self.can('delete_order') || self.hasRole('admin')) {
                axios.post(route('api.order.destroy', { order: order.id })).then(function () {
                    self.total = self.total - 1;
                    if (self.total < 0) {
                        self.total = 0;
                    }
                    if (order.payment.paid) {
                        self.paid = self.paid - 1;
                        if (self.paid < 0) {
                            self.paid = 0;
                        }
                    }
                    if (order.shipment.sent) {
                        self.sent = self.sent - 1;
                        if (self.sent < 0) {
                            self.sent = 0;
                        }
                    }
                    if (order.shipment.received) {
                        self.received = self.received - 1;
                        if (self.received < 0) {
                            self.received = 0;
                        }
                    }
                    if (order.done) {
                        self.done = self.done - 1;
                        if (self.done < 0) {
                            self.done = 0;
                        }
                    }
                    var index = _.findIndex(self.items, { id: order.id });
                    self.$delete(self.items, index);
                    vm.$popup({ message: 'Order#' + order.id + ' Deleted!', backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' });
                }).catch(function (_ref) {
                    var errors = _ref.errors,
                        message = _ref.message;

                    if (errors) {
                        console.log(errors);
                    }
                    if (message) {
                        console.log(message);
                    }
                });
            } else {
                vm.$popup({ message: 'Action Not Authorized!', backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
            }
        },
        resetToggleForm: function resetToggleForm() {
            this.toggleForm = new AppForm(App.forms.toggleForm);
        },
        togglePaid: function togglePaid(order) {
            var _this = this;

            var self = this;
            self.toggleForm.toggle = order.payment.paid;
            App.post(route('api.toggle.paid', { order: order.id }), self.toggleForm).then(function (_ref2) {
                var message = _ref2.message;

                if (order.payment.paid) {
                    _this.paid = _this.paid + 1;
                } else {
                    _this.paid = _this.paid - 1;
                }
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' });
            }).catch(function (_ref3) {
                var errors = _ref3.errors,
                    message = _ref3.message;

                if (errors) {
                    console.log(errors);
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                }
                order.payment.paid = !order.payment.paid;
            });
        },
        toggleSent: function toggleSent(order) {
            var _this2 = this;

            var self = this;
            self.toggleForm.toggle = order.shipment.sent;
            App.post(route('api.toggle.sent', { order: order.id }), self.toggleForm).then(function (_ref4) {
                var message = _ref4.message;

                if (order.shipment.sent) {
                    _this2.sent = _this2.sent + 1;
                } else {
                    _this2.sent = _this2.sent - 1;
                }
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' });
            }).catch(function (_ref5) {
                var errors = _ref5.errors,
                    message = _ref5.message;

                if (errors) {
                    console.log(errors);
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                }
                order.shipment.sent = !order.shipment.sent;
            });
        },
        toggleReceived: function toggleReceived(order) {
            var _this3 = this;

            var self = this;
            self.toggleForm.toggle = order.shipment.received;
            App.post(route('api.toggle.received', { order: order.id }), self.toggleForm).then(function (_ref6) {
                var message = _ref6.message;

                if (order.shipment.received) {
                    _this3.received = _this3.received + 1;
                } else {
                    _this3.received = _this3.received - 1;
                }
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' });
            }).catch(function (_ref7) {
                var errors = _ref7.errors,
                    message = _ref7.message;

                if (errors) {
                    console.log(errors);
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                }
                order.shipment.received = !order.shipment.received;
            });
            console.log('toggle received', order.shipment.received);
        },
        toggleDone: function toggleDone(order) {
            var _this4 = this;

            var self = this;
            self.toggleForm.toggle = order.done;
            App.post(route('api.toggle.done', { order: order.id }), self.toggleForm).then(function (_ref8) {
                var message = _ref8.message;

                if (order.done) {
                    _this4.done = _this4.done + 1;
                } else {
                    _this4.done = _this4.done - 1;
                }
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' });
            }).catch(function (_ref9) {
                var errors = _ref9.errors,
                    message = _ref9.message;

                if (errors) {
                    console.log(errors);
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                }
                order.done = !order.done;
            });
        },
        parseNumber: function parseNumber(str) {
            var strg = str || '';
            var decimal = '.';
            strg = strg.replace(/[^0-9$.,]/g, '');
            if (strg.indexOf(',') > strg.indexOf('.')) decimal = ',';
            if ((strg.match(new RegExp('\\' + decimal, 'g')) || []).length > 1) decimal = '';
            if (decimal !== '' && strg.length - strg.indexOf(decimal) - 1 == 3 && strg.indexOf('0' + decimal) !== 0) decimal = '';
            strg = strg.replace(new RegExp('[^0-9$' + decimal + ']', 'g'), '');
            strg = strg.replace(',', '.');
            return parseFloat(strg);
        },
        getCart: function getCart(cart) {
            return JSON.parse(cart);
        },
        getItems: function getItems(cart) {
            return __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values___default()(JSON.parse(cart)['items']);
        },
        setCurrentOrder: function setCurrentOrder(order) {
            this.dialog = true;
            this.current_order = order;
            Bus.$emit('set-order', this.current_order);
            /* Check for Shipment Type if Meet Up Or Pick Up Remove Shipping Details From Tabs */
            var customer = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default()({ name: 'customer details', component: 'customer-details' }, JSON.parse(this.current_order.customer_details));
            var shipping = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default()({ name: 'shipping details', component: 'shipping-details' }, JSON.parse(this.current_order.shipping_details));
            var uploads = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default()({ name: 'upload receipt', component: 'file-uploader' });
            this.tabs = [customer, shipping];
            var payment = null;
            if (this.current_order.payment) {
                payment = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default()({ name: 'payment details', component: 'payment-details' }, this.current_order.payment);
                this.tabs.push(payment);
            }
            var shipment = null;
            if (this.current_order.shipment) {
                shipment = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default()({ name: 'shipment details', component: 'shipment-details' }, this.current_order.shipment);
                this.tabs.push(shipment);
            }
            this.tabs.push(uploads);
        },
        fetchPanelStats: function fetchPanelStats() {
            var self = this;
            axios.get(route('api.panel.stats')).then(function (response) {
                self.items = response.data.orders;
                self.total = response.data.total;
                self.sent = response.data.sent;
                self.paid = response.data.paid;
                self.received = response.data.received;
                self.done = response.data.done;
            });
        },
        totalAmount: function totalAmount(item) {
            var cart = JSON.parse(item.cart);
            var total = null;
            if (item.shipment) {
                total = this.parseNumber(cart.total) + parseFloat(item.shipment.shipping_fee);
            } else {
                total = this.parseNumber(cart.total);
            }
            return total.toFixed(2);
        }
    },
    watch: {
        items: {
            handler: function handler() {},
            deep: true
        }
    }
});

/***/ }),

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(836)
/* template */
var __vue_template__ = __webpack_require__(837)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\partials\\DashPanels.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DashPanels.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d81657a2", Component.options)
  } else {
    hotAPI.reload("data-v-d81657a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['unpaid', 'paid', 'sent', 'received', 'total', 'unsent', 'done']
});

/***/ }),

/***/ 837:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "", "align-center": "" } },
        [
          _c("v-flex", { attrs: { xs12: "", "text-xs-right": "" } }, [
            _c("h5", { staticClass: "primary--text" }, [
              _vm._v(
                "\n        Total Orders: " + _vm._s(_vm.total) + "\n        "
              )
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "", "align-center": "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
            [
              _c(
                "v-card",
                {
                  staticClass: "ma-1",
                  attrs: { color: "blue-grey", height: "110px" }
                },
                [
                  _c(
                    "v-card-text",
                    { staticClass: "title pa-5" },
                    [
                      _c(
                        "v-icon",
                        { attrs: { large: "", color: "amber lighten-2" } },
                        [_vm._v("confirmation_number")]
                      ),
                      _vm._v(
                        " Unpaid: " + _vm._s(_vm.unpaid) + "\n            "
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
            [
              _c(
                "v-card",
                {
                  staticClass: "ma-1",
                  attrs: { color: "red lighten-2", height: "110px" }
                },
                [
                  _c(
                    "v-card-text",
                    { staticClass: "title pa-5" },
                    [
                      _c(
                        "v-icon",
                        { attrs: { large: "", color: "red darken-4" } },
                        [_vm._v("do_not_disturb")]
                      ),
                      _vm._v(
                        " On-Hold: " + _vm._s(_vm.unsent) + "\n            "
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
            [
              _c(
                "v-card",
                {
                  staticClass: "ma-1",
                  attrs: { color: "cyan", height: "110px" }
                },
                [
                  _c(
                    "v-card-text",
                    { staticClass: "title pa-5" },
                    [
                      _c("v-icon", { attrs: { large: "", color: "amber" } }, [
                        _vm._v("local_shipping")
                      ]),
                      _vm._v(" Sent: " + _vm._s(_vm.sent) + "\n            ")
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
            [
              _c(
                "v-card",
                {
                  staticClass: "ma-1",
                  attrs: { color: "teal lighten-2", height: "110px" }
                },
                [
                  _c(
                    "v-card-text",
                    { staticClass: "title pa-5" },
                    [
                      _c("v-icon", { attrs: { large: "", color: "lime" } }, [
                        _vm._v("local_mall")
                      ]),
                      _vm._v(" Done: " + _vm._s(_vm.done) + "\n            ")
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
            [
              _c(
                "v-card",
                {
                  staticClass: "ma-1",
                  attrs: { color: "light-green", height: "110px" }
                },
                [
                  _c(
                    "v-card-text",
                    { staticClass: "title pa-5" },
                    [
                      _c("v-icon", { attrs: { large: "", color: "teal" } }, [
                        _vm._v("beenhere")
                      ]),
                      _vm._v(
                        " Received: " + _vm._s(_vm.received) + "\n            "
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
            [
              _c(
                "v-card",
                {
                  staticClass: "ma-1",
                  attrs: { color: "teal darken-4", height: "110px" }
                },
                [
                  _c(
                    "v-card-text",
                    { staticClass: "title pa-5" },
                    [
                      _c(
                        "v-icon",
                        { attrs: { large: "", color: "green lighten-2" } },
                        [_vm._v("local_atm")]
                      ),
                      _vm._v(" Paid: " + _vm._s(_vm.paid) + "\n            ")
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d81657a2", module.exports)
  }
}

/***/ }),

/***/ 838:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(839)
}
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(841)
/* template */
var __vue_template__ = __webpack_require__(842)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\dashboard\\CustomerDetails.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CustomerDetails.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e4558af", Component.options)
  } else {
    hotAPI.reload("data-v-2e4558af", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(840);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(648)("b6fcc66a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e4558af\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CustomerDetails.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e4558af\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CustomerDetails.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 840:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(626)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"CustomerDetails.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_json_stringify__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_json_stringify__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['tab', 'order'],
    data: function data() {
        return {
            customerForm: new AppForm(App.forms.customerForm)
        };
    },
    watch: {
        tab: function tab(newValue) {
            this.customerForm.customer_details.first_name = newValue.first_name;
            this.customerForm.customer_details.last_name = newValue.last_name;
            this.customerForm.customer_details.email = newValue.email;
            this.customerForm.customer_details.contact_no = newValue.contact_no;
        }
    },
    methods: {
        submit: function submit() {
            console.log('form submitted');
            var self = this;
            self.customerForm.busy = true;
            App.post(route('api.orders.customer_details', { order: self.order.id }), self.customerForm).then(function (_ref) {
                var message = _ref.message;

                self.customerForm.busy = false;
                self.order.customer_details = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_json_stringify___default()(self.customerForm.customer_details);
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' });
            }).catch(function (_ref2) {
                var errors = _ref2.errors,
                    message = _ref2.message;

                if (errors) {
                    console.log(errors);
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                }
                self.customerForm.busy = false;
            });
        }
    }

});

/***/ }),

/***/ 842:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { fluid: "" } },
    [
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|max:255",
                    expression: "'required|max:255'"
                  }
                ],
                staticClass: "primary--text",
                attrs: {
                  name: "first_name",
                  label: "First Name",
                  "data-vv-name": "first_name",
                  "error-messages": _vm.errors.collect("first_name"),
                  "prepend-icon": "fa-id-card",
                  light: true
                },
                model: {
                  value: _vm.customerForm.customer_details.first_name,
                  callback: function($$v) {
                    _vm.customerForm.customer_details.first_name = $$v
                  },
                  expression: "customerForm.customer_details.first_name"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|max:255",
                    expression: "'required|max:255'"
                  }
                ],
                staticClass: "primary--text",
                attrs: {
                  name: "last_name",
                  label: "Last Name",
                  "data-vv-name": "last_name",
                  "error-messages": _vm.errors.collect("last_name"),
                  "prepend-icon": "fa-id-card-o",
                  light: true
                },
                model: {
                  value: _vm.customerForm.customer_details.last_name,
                  callback: function($$v) {
                    _vm.customerForm.customer_details.last_name = $$v
                  },
                  expression: "customerForm.customer_details.last_name"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|email",
                    expression: "'required|email'"
                  }
                ],
                staticClass: "primary--text",
                attrs: {
                  name: "email",
                  label: "Email",
                  "data-vv-name": "email",
                  "error-messages": _vm.errors.collect("email"),
                  "prepend-icon": "email",
                  light: true
                },
                model: {
                  value: _vm.customerForm.customer_details.email,
                  callback: function($$v) {
                    _vm.customerForm.customer_details.email = $$v
                  },
                  expression: "customerForm.customer_details.email"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|numeric",
                    expression: "'required|numeric'"
                  }
                ],
                staticClass: "primary--text",
                attrs: {
                  name: "contact_no",
                  label: "Contact No.",
                  "data-vv-name": "contact_no",
                  "error-messages": _vm.errors.collect("contact_no"),
                  "prepend-icon": "fa-phone",
                  light: true
                },
                model: {
                  value: _vm.customerForm.customer_details.contact_no,
                  callback: function($$v) {
                    _vm.customerForm.customer_details.contact_no = $$v
                  },
                  expression: "customerForm.customer_details.contact_no"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "white--text",
          class: {
            primary: !_vm.customerForm.busy,
            error: _vm.customerForm.busy
          },
          attrs: {
            light: "",
            color: "primary",
            loading: _vm.customerForm.busy,
            disabled: _vm.errors.any()
          },
          nativeOn: {
            click: function($event) {
              _vm.submit()
            }
          }
        },
        [_vm._v("Update")]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2e4558af", module.exports)
  }
}

/***/ }),

/***/ 843:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(844)
}
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(846)
/* template */
var __vue_template__ = __webpack_require__(847)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\dashboard\\PaymentDetails.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PaymentDetails.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23fa1801", Component.options)
  } else {
    hotAPI.reload("data-v-23fa1801", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 844:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(845);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(648)("6fe572b1", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-23fa1801\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PaymentDetails.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-23fa1801\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PaymentDetails.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 845:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(626)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"PaymentDetails.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['tab', 'order'],
    data: function data() {
        return {
            dialog: false,
            paymentForm: new AppForm(App.forms.paymentForm)
        };
    },
    watch: {
        tab: function tab(newValue) {
            this.paymentForm.id = newValue.id;
            this.paymentForm.date_paid = newValue.date_paid ? moment(newValue.date_paid).format('YYYY-MM-DD') : null;
            this.paymentForm.transaction_no = newValue.transaction_no;
            this.paymentForm.account_name = newValue.account_name;
            this.paymentForm.account_no = newValue.account_no;
            this.paymentForm.amount = newValue.amount;
            this.paymentForm.currency = newValue.currency;
            this.paymentForm.gateway = newValue.gateway;
        }
    },
    methods: {
        viewAttachment: function viewAttachment(path) {
            window.open(path);
        },
        toProperCase: function toProperCase(key) {
            var newStr = key.replace(/_/g, ' ');
            return newStr.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        },
        submit: function submit() {
            var self = this;
            self.paymentForm.busy = true;
            App.post(route('api.orders.payment_details', { order: self.order.id }), self.paymentForm).then(function (_ref) {
                var message = _ref.message;

                self.paymentForm.busy = false;
                // edit the array of orders by passing the whole object of each order
                self.order.payment.transaction_no = self.paymentForm.transaction_no;
                self.order.payment.account_name = self.paymentForm.account_name;
                self.order.payment.account_no = self.paymentForm.account_no;
                self.order.payment.amount = self.paymentForm.amount;
                self.order.payment.currency = self.paymentForm.currency;
                self.order.payment.date_paid = self.paymentForm.date_paid;
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' });
            }).catch(function (_ref2) {
                var errors = _ref2.errors,
                    message = _ref2.message;

                if (errors) {
                    console.log(errors);
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                }
                self.paymentForm.busy = false;
            });
        }
    }

});

/***/ }),

/***/ 847:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { fluid: "" } },
    [
      _vm.paymentForm.gateway
        ? _c(
            "v-layout",
            { attrs: { row: "" } },
            [
              _c("v-flex", { attrs: { xs12: "", "text-xs-center": "" } }, [
                _c("p", { staticClass: "subheader primary--text" }, [
                  _vm._v("Gateway Details:")
                ])
              ])
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.paymentForm.gateway
        ? _c(
            "v-layout",
            { attrs: { row: "" } },
            [
              _c(
                "v-flex",
                { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
                [
                  _c("v-text-field", {
                    staticClass: "primary--text",
                    attrs: {
                      name: "mop",
                      label: "Mode Of Payment",
                      readonly: "",
                      light: true
                    },
                    model: {
                      value: _vm.paymentForm.gateway.name,
                      callback: function($$v) {
                        _vm.paymentForm.gateway.name = $$v
                      },
                      expression: "paymentForm.gateway.name"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.paymentForm.gateway
        ? _c(
            "div",
            _vm._l(_vm.paymentForm.gateway.details, function(
              value,
              key,
              index
            ) {
              return _c(
                "v-layout",
                { key: key, attrs: { row: "", index: index } },
                [
                  _c(
                    "v-flex",
                    {
                      attrs: {
                        xs12: "",
                        sm12: "",
                        md12: "",
                        lg12: "",
                        xl12: ""
                      }
                    },
                    [
                      _c("v-text-field", {
                        staticClass: "primary--text",
                        attrs: {
                          name: "key",
                          label: _vm.toProperCase(key),
                          value: value,
                          readonly: "",
                          light: true
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            })
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c("v-flex", { attrs: { xs12: "", "text-xs-center": "" } }, [
            _c("p", { staticClass: "subheader primary--text" }, [
              _vm._v("Payment Details:")
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _vm.order.receipt
        ? _c(
            "v-layout",
            { attrs: { row: "" } },
            [
              _c(
                "v-flex",
                { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
                [
                  _c("v-text-field", {
                    staticClass: "primary--text",
                    attrs: {
                      label: "Receipt",
                      "prepend-icon": "fa-file",
                      "append-icon": "fa-download",
                      "append-icon-cb": function() {
                        return _vm.viewAttachment(_vm.order.receipt)
                      },
                      hint: "View Receipt",
                      "persistent-hint": "",
                      light: true,
                      readonly: ""
                    },
                    model: {
                      value: _vm.order.receipt,
                      callback: function($$v) {
                        _vm.order.receipt = $$v
                      },
                      expression: "order.receipt"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|max:255",
                    expression: "'required|max:255'"
                  }
                ],
                staticClass: "primary--text",
                attrs: {
                  name: "transaction_no",
                  label: "Transaction No",
                  "data-vv-name": "Transaction No",
                  "error-messages": _vm.errors.collect("Transaction No"),
                  "prepend-icon": "fa-hashtag",
                  light: true
                },
                model: {
                  value: _vm.paymentForm.transaction_no,
                  callback: function($$v) {
                    _vm.paymentForm.transaction_no = $$v
                  },
                  expression: "paymentForm.transaction_no"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c(
                "v-dialog",
                {
                  attrs: {
                    persistent: "",
                    lazy: "",
                    "full-width": "",
                    light: ""
                  },
                  model: {
                    value: _vm.dialog,
                    callback: function($$v) {
                      _vm.dialog = $$v
                    },
                    expression: "dialog"
                  }
                },
                [
                  _c("v-text-field", {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: "required",
                        expression: "'required'"
                      }
                    ],
                    attrs: {
                      slot: "activator",
                      label: "Date Paid",
                      "prepend-icon": "event",
                      "data-vv-name": "Date Paid",
                      "error-messages": _vm.errors.collect("Date Paid"),
                      light: "",
                      readonly: ""
                    },
                    slot: "activator",
                    model: {
                      value: _vm.paymentForm.date_paid,
                      callback: function($$v) {
                        _vm.paymentForm.date_paid = $$v
                      },
                      expression: "paymentForm.date_paid"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-date-picker", {
                    attrs: { scrollable: "", actions: "", light: "" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(ref) {
                          var save = ref.save
                          var cancel = ref.cancel
                          return [
                            _c(
                              "v-card-actions",
                              [
                                _c("v-spacer"),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { flat: "", color: "primary" },
                                    on: { click: cancel }
                                  },
                                  [_vm._v("Cancel")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { flat: "", color: "primary" },
                                    on: { click: save }
                                  },
                                  [_vm._v("OK")]
                                )
                              ],
                              1
                            )
                          ]
                        }
                      }
                    ]),
                    model: {
                      value: _vm.paymentForm.date_paid,
                      callback: function($$v) {
                        _vm.paymentForm.date_paid = $$v
                      },
                      expression: "paymentForm.date_paid"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|max:255",
                    expression: "'required|max:255'"
                  }
                ],
                staticClass: "primary--text",
                attrs: {
                  name: "account_name",
                  label: "Account Name",
                  "data-vv-name": "Account Name",
                  "error-messages": _vm.errors.collect("Account Name"),
                  "prepend-icon": "fa-id-card",
                  light: true
                },
                model: {
                  value: _vm.paymentForm.account_name,
                  callback: function($$v) {
                    _vm.paymentForm.account_name = $$v
                  },
                  expression: "paymentForm.account_name"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|max:255",
                    expression: "'required|max:255'"
                  }
                ],
                staticClass: "primary--text",
                attrs: {
                  name: "account_no",
                  label: "Account No.",
                  "data-vv-name": "Account No",
                  "error-messages": _vm.errors.collect("Account No"),
                  "prepend-icon": "fa-credit-card",
                  light: true
                },
                model: {
                  value: _vm.paymentForm.account_no,
                  callback: function($$v) {
                    _vm.paymentForm.account_no = $$v
                  },
                  expression: "paymentForm.account_no"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|min_value:1",
                    expression: "'required|min_value:1'"
                  }
                ],
                staticClass: "primary--text",
                attrs: {
                  name: "amount",
                  label: "Amount",
                  "data-vv-name": "amount",
                  "error-messages": _vm.errors.collect("amount"),
                  "prepend-icon": "fa-money",
                  hint: "Amount You Paid",
                  "persistent-hint": "",
                  light: true
                },
                model: {
                  value: _vm.paymentForm.amount,
                  callback: function($$v) {
                    _vm.paymentForm.amount = _vm._n($$v)
                  },
                  expression: "paymentForm.amount"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required",
                    expression: "'required'"
                  }
                ],
                staticClass: "primary--text",
                attrs: {
                  name: "currency",
                  label: "Currency",
                  "data-vv-name": "currency",
                  "error-messages": _vm.errors.collect("currency"),
                  "prepend-icon": "fa-usd",
                  hint: "Currency Of Your Payment",
                  "persistent-hint": "",
                  light: true
                },
                model: {
                  value: _vm.paymentForm.currency,
                  callback: function($$v) {
                    _vm.paymentForm.currency = $$v
                  },
                  expression: "paymentForm.currency"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "white--text",
          class: {
            primary: !_vm.paymentForm.busy,
            error: _vm.paymentForm.busy
          },
          attrs: {
            light: "",
            color: "primary",
            loading: _vm.paymentForm.busy,
            disabled: _vm.errors.any()
          },
          nativeOn: {
            click: function($event) {
              _vm.submit()
            }
          }
        },
        [_vm._v("Update")]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-23fa1801", module.exports)
  }
}

/***/ }),

/***/ 848:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(849)
}
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(851)
/* template */
var __vue_template__ = __webpack_require__(852)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\dashboard\\ShippingDetails.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ShippingDetails.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-40f638df", Component.options)
  } else {
    hotAPI.reload("data-v-40f638df", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 849:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(850);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(648)("44313b78", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-40f638df\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShippingDetails.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-40f638df\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShippingDetails.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 850:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(626)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ShippingDetails.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_json_stringify__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_json_stringify__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['tab', 'order'],
    data: function data() {
        return {
            addressForm: new AppForm(App.forms.addressForm)
        };
    },
    watch: {
        tab: function tab(newValue) {
            this.shipping_details = newValue;
            this.addressForm.shipping_details.address_1 = newValue.address_1;
            this.addressForm.shipping_details.address_2 = newValue.address_2;
            this.addressForm.shipping_details.city = newValue.city;
            this.addressForm.shipping_details.country = newValue.country;
            this.addressForm.shipping_details.zip_code = newValue.zip_code;
            this.addressForm.shipping_details.state_province = newValue.state_province;
        }
    },
    methods: {
        submit: function submit() {
            console.log('form submitted');
            var self = this;
            self.addressForm.busy = true;
            App.post(route('api.orders.shipping_details', { order: self.order.id }), self.addressForm).then(function (_ref) {
                var message = _ref.message;

                self.addressForm.busy = false;
                self.order.shipping_details = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_json_stringify___default()(self.addressForm.shipping_details);
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' });
            }).catch(function (_ref2) {
                var errors = _ref2.errors,
                    message = _ref2.message;

                if (errors) {
                    console.log(errors);
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                }
                self.addressForm.busy = false;
            });
        }
    }

});

/***/ }),

/***/ 852:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-container", { attrs: { fluid: "" } }, [
    _c(
      "form",
      [
        _c(
          "v-layout",
          { attrs: { row: "" } },
          [
            _c(
              "v-flex",
              { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
              [
                _c("v-text-field", {
                  directives: [
                    {
                      name: "validate",
                      rawName: "v-validate",
                      value: "required|max:255",
                      expression: "'required|max:255'"
                    }
                  ],
                  staticClass: "primary--text",
                  attrs: {
                    name: "address_1",
                    label: "Address 1",
                    "data-vv-name": "address_1",
                    "error-messages": _vm.errors.collect("address_1"),
                    "prepend-icon": "fa-address-book",
                    light: true
                  },
                  model: {
                    value: _vm.addressForm.shipping_details.address_1,
                    callback: function($$v) {
                      _vm.addressForm.shipping_details.address_1 = $$v
                    },
                    expression: "addressForm.shipping_details.address_1"
                  }
                })
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-layout",
          { attrs: { row: "" } },
          [
            _c(
              "v-flex",
              { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
              [
                _c("v-text-field", {
                  directives: [
                    {
                      name: "validate",
                      rawName: "v-validate",
                      value: "required|max:255",
                      expression: "'required|max:255'"
                    }
                  ],
                  staticClass: "primary--text",
                  attrs: {
                    name: "address_2",
                    label: "Address 2",
                    "data-vv-name": "address_2",
                    "error-messages": _vm.errors.collect("address_2"),
                    "prepend-icon": "fa-address-book-o",
                    light: true
                  },
                  model: {
                    value: _vm.addressForm.shipping_details.address_2,
                    callback: function($$v) {
                      _vm.addressForm.shipping_details.address_2 = $$v
                    },
                    expression: "addressForm.shipping_details.address_2"
                  }
                })
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-layout",
          { attrs: { row: "" } },
          [
            _c(
              "v-flex",
              { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
              [
                _c("v-text-field", {
                  directives: [
                    {
                      name: "validate",
                      rawName: "v-validate",
                      value: "required|max:255",
                      expression: "'required|max:255'"
                    }
                  ],
                  staticClass: "primary--text",
                  attrs: {
                    name: "city",
                    label: "City",
                    "data-vv-name": "city",
                    "error-messages": _vm.errors.collect("city"),
                    "prepend-icon": "location_city",
                    light: true
                  },
                  model: {
                    value: _vm.addressForm.shipping_details.city,
                    callback: function($$v) {
                      _vm.addressForm.shipping_details.city = $$v
                    },
                    expression: "addressForm.shipping_details.city"
                  }
                })
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-layout",
          { attrs: { row: "" } },
          [
            _c(
              "v-flex",
              { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
              [
                _c("v-text-field", {
                  directives: [
                    {
                      name: "validate",
                      rawName: "v-validate",
                      value: "required|max:255",
                      expression: "'required|max:255'"
                    }
                  ],
                  staticClass: "primary--text",
                  attrs: {
                    name: "country",
                    label: "Country",
                    "data-vv-name": "country",
                    "error-messages": _vm.errors.collect("country"),
                    "prepend-icon": "fa-fa",
                    light: true
                  },
                  model: {
                    value: _vm.addressForm.shipping_details.country,
                    callback: function($$v) {
                      _vm.addressForm.shipping_details.country = $$v
                    },
                    expression: "addressForm.shipping_details.country"
                  }
                })
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-layout",
          { attrs: { row: "" } },
          [
            _c(
              "v-flex",
              { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
              [
                _c("v-text-field", {
                  directives: [
                    {
                      name: "validate",
                      rawName: "v-validate",
                      value: "required",
                      expression: "'required'"
                    }
                  ],
                  staticClass: "primary--text",
                  attrs: {
                    name: "zip_code",
                    label: "Zip Code",
                    "data-vv-name": "zip_code",
                    "error-messages": _vm.errors.collect("zip_code"),
                    "prepend-icon": "markunread_mailbox",
                    light: true
                  },
                  model: {
                    value: _vm.addressForm.shipping_details.zip_code,
                    callback: function($$v) {
                      _vm.addressForm.shipping_details.zip_code = $$v
                    },
                    expression: "addressForm.shipping_details.zip_code"
                  }
                })
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-layout",
          { attrs: { row: "" } },
          [
            _c(
              "v-flex",
              { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
              [
                _c("v-text-field", {
                  directives: [
                    {
                      name: "validate",
                      rawName: "v-validate",
                      value: "required",
                      expression: "'required'"
                    }
                  ],
                  staticClass: "primary--text",
                  attrs: {
                    name: "state_province",
                    label: "State | Province",
                    "data-vv-name": "state_province",
                    "error-messages": _vm.errors.collect("state_province"),
                    "prepend-icon": "place",
                    light: true
                  },
                  model: {
                    value: _vm.addressForm.shipping_details.state_province,
                    callback: function($$v) {
                      _vm.addressForm.shipping_details.state_province = $$v
                    },
                    expression: "addressForm.shipping_details.state_province"
                  }
                })
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-btn",
          {
            staticClass: "white--text",
            class: {
              primary: !_vm.addressForm.busy,
              error: _vm.addressForm.busy
            },
            attrs: {
              light: "",
              color: "primary",
              loading: _vm.addressForm.busy,
              disabled: _vm.errors.any()
            },
            nativeOn: {
              click: function($event) {
                _vm.submit()
              }
            }
          },
          [_vm._v("Update")]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-40f638df", module.exports)
  }
}

/***/ }),

/***/ 853:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(854)
}
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(856)
/* template */
var __vue_template__ = __webpack_require__(857)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\dashboard\\ShipmentDetails.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ShipmentDetails.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ff23973", Component.options)
  } else {
    hotAPI.reload("data-v-0ff23973", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 854:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(855);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(648)("7a31cbbf", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0ff23973\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShipmentDetails.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0ff23973\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShipmentDetails.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 855:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(626)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ShipmentDetails.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_acl__ = __webpack_require__(656);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_acl__["a" /* default */]],
    props: ['tab', 'order'],
    data: function data() {
        return {
            modal1: false,
            modal2: false,
            shipmentForm: new AppForm(App.forms.shipmentForm)
        };
    },
    watch: {
        tab: function tab(newValue) {
            this.shipmentForm.id = newValue.id;
            this.shipmentForm.courier = newValue.courier;
            this.shipmentForm.shipping_fee = newValue.shipping_fee;
            this.shipmentForm.currency = newValue.currency;
            this.shipmentForm.tracking_no = newValue.tracking_no;
            this.shipmentForm.sent = newValue.sent;
            this.shipmentForm.date_sent = newValue.date_sent ? moment(newValue.date_sent).format('YYYY-MM-DD') : null;
            this.shipmentForm.received = newValue.received;
            this.shipmentForm.date_received = newValue.date_received ? moment(newValue.date_received).format('YYYY-MM-DD') : null;
        }
    },
    methods: {
        showSentModal: function showSentModal() {
            if (this.hasRole('admin')) {
                this.modal1 = true;
            }
        },
        showReceivedModal: function showReceivedModal() {
            if (this.can('edit_order') | this.hasRole('admin')) {
                this.modal2 = true;
            }
        },
        toProperCase: function toProperCase(key) {
            var newStr = key.replace(/_/g, ' ');
            return newStr.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        },
        submit: function submit() {
            var self = this;
            self.shipmentForm.busy = true;
            App.post(route('api.orders.shipment_details', { order: self.order.id }), self.shipmentForm).then(function (_ref) {
                var message = _ref.message;

                self.shipmentForm.busy = false;
                // edit the array of orders by passing the whole object of each order
                self.order.shipment.tracking_no = self.shipmentForm.tracking_no;
                self.order.shipment.sent = self.shipmentForm.sent;
                self.order.shipment.date_sent = self.shipmentForm.date_sent;
                self.order.shipment.received = self.shipmentForm.received;
                self.order.shipment.date_received = self.shipmentForm.date_received;
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' });
            }).catch(function (_ref2) {
                var errors = _ref2.errors,
                    message = _ref2.message;

                if (errors) {
                    console.log(errors);
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                }
                self.shipmentForm.busy = false;
            });
        }
    }

});

/***/ }),

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { fluid: "" } },
    [
      _vm.shipmentForm.courier
        ? _c(
            "v-layout",
            { attrs: { row: "" } },
            [
              _c("v-flex", { attrs: { xs12: "", "text-xs-center": "" } }, [
                _c("p", { staticClass: "subheader primary--text" }, [
                  _vm._v("Delivery Method:")
                ])
              ])
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.shipmentForm.courier
        ? _c(
            "v-layout",
            { attrs: { row: "" } },
            [
              _c(
                "v-flex",
                { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
                [
                  _c("v-text-field", {
                    staticClass: "primary--text",
                    attrs: {
                      name: "mop",
                      label: "Mode Of Payment",
                      readonly: "",
                      light: true
                    },
                    model: {
                      value: _vm.shipmentForm.courier.name,
                      callback: function($$v) {
                        _vm.shipmentForm.courier.name = $$v
                      },
                      expression: "shipmentForm.courier.name"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.shipmentForm.courier
        ? _c(
            "div",
            _vm._l(_vm.shipmentForm.courier.details, function(
              value,
              key,
              index
            ) {
              return _c(
                "v-layout",
                { key: key, attrs: { row: "", index: index } },
                [
                  _c(
                    "v-flex",
                    {
                      attrs: {
                        xs12: "",
                        sm12: "",
                        md12: "",
                        lg12: "",
                        xl12: ""
                      }
                    },
                    [
                      _c("v-text-field", {
                        staticClass: "primary--text",
                        attrs: {
                          name: "key",
                          label: _vm.toProperCase(key),
                          value: value,
                          readonly: "",
                          light: true
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            })
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c("v-flex", { attrs: { xs12: "", "text-xs-center": "" } }, [
            _c("p", { staticClass: "subheader primary--text" }, [
              _vm._v("Shipment Status:")
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|max:255",
                    expression: "'required|max:255'"
                  }
                ],
                staticClass: "primary--text",
                attrs: {
                  name: "tracking_no",
                  label: "Tracking No",
                  "data-vv-name": "Tracking No",
                  "error-messages": _vm.errors.collect("Tracking No"),
                  "prepend-icon": "fa-truck",
                  light: true,
                  disabled: !_vm.hasRole("admin")
                },
                model: {
                  value: _vm.shipmentForm.tracking_no,
                  callback: function($$v) {
                    _vm.shipmentForm.tracking_no = $$v
                  },
                  expression: "shipmentForm.tracking_no"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required",
                    expression: "'required'"
                  }
                ],
                attrs: {
                  label: "Date Sent",
                  "prepend-icon": "event",
                  "data-vv-name": "Date Sent",
                  "error-messages": _vm.errors.collect("Date Sent"),
                  light: "",
                  readonly: ""
                },
                on: { click: _vm.showSentModal },
                model: {
                  value: _vm.shipmentForm.date_sent,
                  callback: function($$v) {
                    _vm.shipmentForm.date_sent = $$v
                  },
                  expression: "shipmentForm.date_sent"
                }
              }),
              _vm._v(" "),
              _c(
                "v-dialog",
                {
                  attrs: {
                    persistent: "",
                    lazy: "",
                    "full-width": "",
                    light: ""
                  },
                  model: {
                    value: _vm.modal1,
                    callback: function($$v) {
                      _vm.modal1 = $$v
                    },
                    expression: "modal1"
                  }
                },
                [
                  _c("v-date-picker", {
                    attrs: { scrollable: "", actions: "", light: "" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(ref) {
                          var save = ref.save
                          var cancel = ref.cancel
                          return [
                            _c(
                              "v-card-actions",
                              [
                                _c("v-spacer"),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { flat: "", color: "primary" },
                                    on: { click: cancel }
                                  },
                                  [_vm._v("Cancel")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { flat: "", color: "primary" },
                                    on: { click: save }
                                  },
                                  [_vm._v("OK")]
                                )
                              ],
                              1
                            )
                          ]
                        }
                      }
                    ]),
                    model: {
                      value: _vm.shipmentForm.date_sent,
                      callback: function($$v) {
                        _vm.shipmentForm.date_sent = $$v
                      },
                      expression: "shipmentForm.date_sent"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-checkbox", {
                attrs: {
                  disabled: !_vm.hasRole("admin"),
                  label: "Sent",
                  light: ""
                },
                model: {
                  value: _vm.shipmentForm.sent,
                  callback: function($$v) {
                    _vm.shipmentForm.sent = $$v
                  },
                  expression: "shipmentForm.sent"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required",
                    expression: "'required'"
                  }
                ],
                attrs: {
                  label: "Date Received",
                  "prepend-icon": "event",
                  "data-vv-name": "Date Received",
                  "error-messages": _vm.errors.collect("Date Received"),
                  light: "",
                  readonly: ""
                },
                on: { click: _vm.showReceivedModal },
                model: {
                  value: _vm.shipmentForm.date_received,
                  callback: function($$v) {
                    _vm.shipmentForm.date_received = $$v
                  },
                  expression: "shipmentForm.date_received"
                }
              }),
              _vm._v(" "),
              _c(
                "v-dialog",
                {
                  attrs: {
                    persistent: "",
                    lazy: "",
                    "full-width": "",
                    light: ""
                  },
                  model: {
                    value: _vm.modal2,
                    callback: function($$v) {
                      _vm.modal2 = $$v
                    },
                    expression: "modal2"
                  }
                },
                [
                  _c("v-date-picker", {
                    attrs: { scrollable: "", actions: "", light: "" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(ref) {
                          var save = ref.save
                          var cancel = ref.cancel
                          return [
                            _c(
                              "v-card-actions",
                              [
                                _c("v-spacer"),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { flat: "", color: "primary" },
                                    on: { click: cancel }
                                  },
                                  [_vm._v("Cancel")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { flat: "", color: "primary" },
                                    on: { click: save }
                                  },
                                  [_vm._v("OK")]
                                )
                              ],
                              1
                            )
                          ]
                        }
                      }
                    ]),
                    model: {
                      value: _vm.shipmentForm.date_received,
                      callback: function($$v) {
                        _vm.shipmentForm.date_received = $$v
                      },
                      expression: "shipmentForm.date_received"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-checkbox", {
                attrs: {
                  disabled: !_vm.can("edit_order") || !_vm.hasRole("admin"),
                  label: "Received",
                  light: ""
                },
                model: {
                  value: _vm.shipmentForm.received,
                  callback: function($$v) {
                    _vm.shipmentForm.received = $$v
                  },
                  expression: "shipmentForm.received"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "white--text",
          class: {
            primary: !_vm.shipmentForm.busy,
            error: _vm.shipmentForm.busy
          },
          attrs: {
            light: "",
            color: "primary",
            loading: _vm.shipmentForm.busy,
            disabled: _vm.errors.any()
          },
          nativeOn: {
            click: function($event) {
              _vm.submit()
            }
          }
        },
        [_vm._v("Update")]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0ff23973", module.exports)
  }
}

/***/ }),

/***/ 858:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(311)
/* script */
var __vue_script__ = __webpack_require__(859)
/* template */
var __vue_template__ = __webpack_require__(860)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\dashboard\\FileUploader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FileUploader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d1cc6ef", Component.options)
  } else {
    hotAPI.reload("data-v-0d1cc6ef", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xkeshi_image_compressor__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xkeshi_image_compressor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__xkeshi_image_compressor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_upload_component__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_upload_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_upload_component__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['tab', 'order'],
    components: {
        FileUpload: __WEBPACK_IMPORTED_MODULE_1_vue_upload_component___default.a
    },
    mounted: function mounted() {
        var self = this;
        /* Set Put URL Empty (optional) */
        self.putAction = '';
        /* Set Request Name */
        self.name = 'file';
        /* Set File Upload to Single */
        self.multiple = false;
        /* Add Passport Access Token */
        self.headers['Authorization'] = 'Bearer ' + this.$cookie.get('access_token');
        /* change post URL */
        /* Hack For Missing Order On FileUploader Component */
        Bus.$on('set-order', function (order) {
            self.postAction = route('api.media.receiptUploader', { order: order.id });
        });
    },
    data: function data() {
        return {
            th: [{ text: 'Thumb', value: 'thumb', align: 'left', sortable: true }, { text: 'Name', value: 'name', align: 'left', sortable: true }, { text: 'Size', value: 'size', align: 'left', sortable: true }, { text: 'Progress', value: 'progress', align: 'left', sortable: true }, { text: 'Status', value: 'speed', align: 'left', sortable: true }, { text: 'Actions', align: 'center', sortable: false }],
            files: [],
            /* file config */
            accept: 'image/png,image/gif,image/jpeg,image/webp',
            extensions: 'gif,jpg,jpeg,png,webp',
            minSize: 1024,
            size: 1024 * 1024 * 10,
            multiple: true,
            directory: false,
            drop: true,
            dropDirectory: true,
            addIndex: false,
            thread: 3,
            name: 'file',
            postAction: '/uploads/post',
            putAction: '/uploads/put',
            headers: {
                'X-Csrf-Token': App.csrfToken,
                /* added access token */
                'Authorization': ''
            },
            data: {
                '_csrf_token': App.csrfToken
            },
            autoCompress: 1024 * 1024,
            uploadAuto: false,
            /* file option */
            isOption: false,
            /* file name validation */
            maxInput: function maxInput(v) {
                return v.length <= 30 || 'Input too long!';
            },
            /* file per page */
            perPageData: [10, 25, 50, { text: 'All', value: -1 }]
        };
    },

    methods: {
        progress: function progress(props) {
            return Math.round(props);
        },
        remove: function remove(file) {
            this.$refs.upload.remove(file);
        },
        inputFilter: function inputFilter(newFile, oldFile, prevent) {
            var _this = this;

            if (newFile && !oldFile) {
                // Before adding a file
                // 添加文件前

                // Filter system files or hide files
                // 过滤系统文件 和隐藏文件
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                    return prevent();
                }

                // Filter php html js file
                // 过滤 php html js 文件
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                    return prevent();
                }

                // Automatic compression
                // 自动压缩
                if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
                    newFile.error = 'compressing';
                    var imageCompressor = new __WEBPACK_IMPORTED_MODULE_0__xkeshi_image_compressor___default.a(null, {
                        convertSize: Infinity,
                        maxWidth: 512,
                        maxHeight: 512
                    });
                    imageCompressor.compress(newFile.file).then(function (file) {
                        _this.$refs.upload.update(newFile, { error: '', file: file, size: file.size, type: file.type });
                    }).catch(function (err) {
                        _this.$refs.upload.update(newFile, { error: err.message || 'compress' });
                    });
                }
            }

            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                // Create a blob field
                // 创建 blob 字段
                newFile.blob = '';
                var URL = window.URL || window.webkitURL;
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file);
                }

                // Thumbnails
                // 缩略图
                newFile.thumb = '';
                if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                    newFile.thumb = newFile.blob;
                }
            }
        },


        // add, update, remove File Event
        inputFile: function inputFile(newFile, oldFile) {
            if (newFile && oldFile) {
                if (newFile.active && !oldFile.active) {
                    // beforeSend

                    // min size
                    if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
                        this.$refs.upload.update(newFile, { error: 'size' });
                    }
                }

                if (newFile.progress !== oldFile.progress) {}

                if (newFile.error && !oldFile.error) {
                    if (newFile.response.message) {
                        vm.$popup({ message: newFile.response.message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                    } else {
                        vm.$popup({ message: 'Server Error', backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                    }
                }

                if (newFile.success && !oldFile.success) {
                    Bus.$emit('file-uploaded', newFile.response.order);
                    vm.$popup({ message: newFile.response.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' });
                }
            }

            if (!newFile && oldFile) {
                // remove
                if (oldFile.success && oldFile.response.id) {
                    // $.ajax({
                    //   type: 'DELETE',
                    //   url: '/upload/delete?id=' + oldFile.response.id,
                    // })
                }
            }

            // Automatically activate upload
            if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                if (this.uploadAuto && !this.$refs.upload.active) {
                    this.$refs.upload.active = true;
                }
            }
        }
    }
});

/***/ }),

/***/ 860:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { fluid: "" } },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            { attrs: { color: "blue", flat: "" } },
            [
              _c(
                "file-upload",
                {
                  ref: "upload",
                  staticStyle: { cursor: "pointer", margin: "10px" },
                  attrs: {
                    "post-action": _vm.postAction,
                    "put-action": _vm.putAction,
                    extensions: _vm.extensions,
                    accept: _vm.accept,
                    multiple: _vm.multiple,
                    directory: _vm.directory,
                    size: _vm.size || 0,
                    thread:
                      _vm.thread < 1 ? 1 : _vm.thread > 5 ? 5 : _vm.thread,
                    headers: _vm.headers,
                    data: _vm.data,
                    drop: _vm.drop,
                    "drop-directory": _vm.dropDirectory,
                    "add-index": _vm.addIndex
                  },
                  on: {
                    "input-filter": _vm.inputFilter,
                    "input-file": _vm.inputFile
                  },
                  model: {
                    value: _vm.files,
                    callback: function($$v) {
                      _vm.files = $$v
                    },
                    expression: "files"
                  }
                },
                [_vm._v("\n                Choose Files\n                ")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { flat: "", icon: "", color: "amber lighten-2" },
              nativeOn: {
                click: function($event) {
                  _vm.isOption = !_vm.isOption
                }
              }
            },
            [_c("v-icon", [_vm._v("fa-cog")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      !_vm.isOption
        ? _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c("v-data-table", {
                attrs: {
                  headers: _vm.th,
                  items: _vm.files,
                  light: true,
                  "no-data-text":
                    "Click `Choose Files` Button To Upload Files.",
                  "rows-per-page-items": _vm.perPageData
                },
                scopedSlots: _vm._u([
                  {
                    key: "items",
                    fn: function(props) {
                      return [
                        _c(
                          "td",
                          { staticClass: "title text-xs-left primary--text" },
                          [
                            props.item.thumb
                              ? _c("img", {
                                  attrs: {
                                    src: props.item.thumb,
                                    width: "40",
                                    height: "auto"
                                  }
                                })
                              : _c("span", [_vm._v("No Image")])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "title text-xs-left primary--text" },
                          [
                            _c(
                              "v-edit-dialog",
                              { attrs: { large: "", lazy: "" } },
                              [
                                _c("span", { staticClass: "primary--text" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm._f("truncate")(props.item.name, 20)
                                    )
                                  )
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "mt-3 text-xs-center title primary--text",
                                    attrs: { slot: "input" },
                                    slot: "input"
                                  },
                                  [_vm._v("Update Name")]
                                ),
                                _vm._v(" "),
                                _c("v-text-field", {
                                  attrs: {
                                    slot: "input",
                                    label: "Edit",
                                    "single-line": "",
                                    counter: "",
                                    autofocus: "",
                                    rules: [_vm.maxInput]
                                  },
                                  slot: "input",
                                  model: {
                                    value: props.item.name,
                                    callback: function($$v) {
                                      props.item.name = $$v
                                    },
                                    expression: "props.item.name"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "title text-xs-left primary--text" },
                          [
                            _vm._v(
                              _vm._s(_vm._f("formatSize")(props.item.size))
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "title text-xs-left primary--text" },
                          [
                            props.item.active || props.item.progress !== "0.00"
                              ? _c(
                                  "v-progress-circular",
                                  {
                                    attrs: {
                                      size: 45,
                                      width: 5,
                                      rotate: 360,
                                      value: _vm.progress(props.item.progress),
                                      color: "teal"
                                    }
                                  },
                                  [
                                    _c("span", { staticClass: "caption" }, [
                                      _vm._v(
                                        _vm._s(
                                          _vm.progress(props.item.progress)
                                        )
                                      )
                                    ])
                                  ]
                                )
                              : _vm._e()
                          ],
                          1
                        ),
                        _vm._v(" "),
                        props.item.error
                          ? _c(
                              "td",
                              {
                                staticClass: "title text-xs-left primary--text"
                              },
                              [_vm._v(_vm._s(props.item.error))]
                            )
                          : props.item.success
                            ? _c(
                                "td",
                                {
                                  staticClass:
                                    "title text-xs-left primary--text"
                                },
                                [_vm._v("success")]
                              )
                            : props.item.active
                              ? _c(
                                  "td",
                                  {
                                    staticClass:
                                      "title text-xs-left primary--text"
                                  },
                                  [_vm._v("active")]
                                )
                              : _c("td", {
                                  staticClass:
                                    "title text-xs-left primary--text"
                                }),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "title text-xs-center primary--text" },
                          [
                            props.item.active
                              ? _c(
                                  "v-btn",
                                  {
                                    attrs: {
                                      flat: "",
                                      icon: "",
                                      color: "red darken-4"
                                    },
                                    nativeOn: {
                                      click: function($event) {
                                        props.item.active
                                          ? _vm.$refs.upload.update(
                                              props.item,
                                              { error: "cancel" }
                                            )
                                          : false
                                      }
                                    }
                                  },
                                  [_c("v-icon", [_vm._v("fa-times")])],
                                  1
                                )
                              : props.item.error &&
                                props.item.error !== "compressing" &&
                                _vm.$refs.upload.features.html5
                                ? _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        flat: "",
                                        icon: "",
                                        color: "info"
                                      },
                                      nativeOn: {
                                        click: function($event) {
                                          _vm.$refs.upload.update(props.item, {
                                            active: true,
                                            error: "",
                                            progress: "0.00"
                                          })
                                        }
                                      }
                                    },
                                    [_c("v-icon", [_vm._v("fa-refresh")])],
                                    1
                                  )
                                : _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        flat: "",
                                        icon: "",
                                        color: "blue"
                                      },
                                      nativeOn: {
                                        click: function($event) {
                                          props.item.success ||
                                          props.item.error === "compressing"
                                            ? false
                                            : _vm.$refs.upload.update(
                                                props.item,
                                                { active: true }
                                              )
                                        }
                                      }
                                    },
                                    [_c("v-icon", [_vm._v("fa-upload")])],
                                    1
                                  ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                attrs: {
                                  flat: "",
                                  icon: "",
                                  color: "red lighten-2"
                                },
                                nativeOn: {
                                  click: function($event) {
                                    _vm.remove(props.item)
                                  }
                                }
                              },
                              [_c("v-icon", [_vm._v("fa-trash")])],
                              1
                            )
                          ],
                          1
                        )
                      ]
                    }
                  }
                ])
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.isOption
        ? _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.files.length > 0,
                      expression: "files.length > 0"
                    }
                  ],
                  attrs: { color: "teal lighten-2" },
                  nativeOn: {
                    click: function($event) {
                      _vm.$refs.upload.active = true
                    }
                  }
                },
                [
                  _vm._v("Start Upload "),
                  _c("v-icon", { attrs: { right: "" } }, [_vm._v("play_arrow")])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.$refs.upload && _vm.$refs.upload.active,
                      expression: "$refs.upload && $refs.upload.active"
                    }
                  ],
                  attrs: { color: "error" },
                  nativeOn: {
                    click: function($event) {
                      _vm.$refs.upload.active = false
                    }
                  }
                },
                [
                  _vm._v("Stop Upload "),
                  _c("v-icon", { attrs: { right: "" } }, [_vm._v("stop")])
                ],
                1
              ),
              _vm._v(" "),
              _vm.$refs.upload &&
              !_vm.$refs.upload.active &&
              _vm.files.length > 0
                ? _c(
                    "v-btn",
                    {
                      attrs: { color: "red lighten-2" },
                      nativeOn: {
                        click: function($event) {
                          _vm.files = []
                        }
                      }
                    },
                    [
                      _vm._v("Remove All Files "),
                      _c("v-icon", { attrs: { right: "" } }, [
                        _vm._v("fa-times")
                      ])
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("v-spacer")
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.isOption
        ? _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-text-field", {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: "required",
                        expression: "'required'"
                      }
                    ],
                    attrs: {
                      "append-icon": "fa-file-code-o ",
                      label: "Accept",
                      color: "info",
                      light: true,
                      hint: "Allow upload mime type",
                      "persistent-hint": "",
                      "error-messages": _vm.errors.collect("mime-type"),
                      "data-vv-name": "mime-type"
                    },
                    model: {
                      value: _vm.accept,
                      callback: function($$v) {
                        _vm.accept = $$v
                      },
                      expression: "accept"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-text-field", {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: "required",
                        expression: "'required'"
                      }
                    ],
                    attrs: {
                      "append-icon": "fa-cogs",
                      label: "Extensions",
                      color: "info",
                      light: true,
                      hint: "Allow upload file extension",
                      "persistent-hint": "",
                      "error-messages": _vm.errors.collect("extension"),
                      "data-vv-name": "extension"
                    },
                    model: {
                      value: _vm.extensions,
                      callback: function($$v) {
                        _vm.extensions = $$v
                      },
                      expression: "extensions"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "append-icon": "http",
                      label: "Put Url",
                      color: "info",
                      light: true,
                      hint:
                        "Disabled if Empty, After the shutdown, use the POST method to upload",
                      "persistent-hint": ""
                    },
                    model: {
                      value: _vm.putAction,
                      callback: function($$v) {
                        _vm.putAction = $$v
                      },
                      expression: "putAction"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-text-field", {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: "required",
                        expression: "'required'"
                      }
                    ],
                    attrs: {
                      "append-icon": "http",
                      label: "Post Url",
                      color: "info",
                      light: true,
                      hint: "Default Post URL",
                      "persistent-hint": "",
                      "error-messages": _vm.errors.collect("post-url"),
                      "data-vv-name": "post-url"
                    },
                    model: {
                      value: _vm.postAction,
                      callback: function($$v) {
                        _vm.postAction = $$v
                      },
                      expression: "postAction"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-text-field", {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: "required|numeric|min_value:1",
                        expression: "'required|numeric|min_value:1'"
                      }
                    ],
                    attrs: {
                      "append-icon": "fa-cubes",
                      label: "Thread",
                      color: "info",
                      light: true,
                      hint:
                        "Also upload the number of files at the same time (number of threads)",
                      "persistent-hint": "",
                      "error-messages": _vm.errors.collect("thread"),
                      "data-vv-name": "thread"
                    },
                    model: {
                      value: _vm.thread,
                      callback: function($$v) {
                        _vm.thread = $$v
                      },
                      expression: "thread"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-text-field", {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: "required",
                        expression: "'required'"
                      }
                    ],
                    attrs: {
                      "append-icon": "trending_up",
                      label: "Max size",
                      color: "info",
                      light: true,
                      hint: "Size Unit in byte",
                      "persistent-hint": "",
                      "error-messages": _vm.errors.collect("max-size"),
                      "data-vv-name": "max-size"
                    },
                    model: {
                      value: _vm.size,
                      callback: function($$v) {
                        _vm.size = _vm._n($$v)
                      },
                      expression: "size"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-text-field", {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: "required",
                        expression: "'required'"
                      }
                    ],
                    attrs: {
                      "append-icon": "trending_down",
                      label: "Min size",
                      color: "info",
                      light: true,
                      hint: "Size Unit in byte",
                      "persistent-hint": "",
                      "error-messages": _vm.errors.collect("min-size"),
                      "data-vv-name": "min-size"
                    },
                    model: {
                      value: _vm.minSize,
                      callback: function($$v) {
                        _vm.minSize = _vm._n($$v)
                      },
                      expression: "minSize"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-text-field", {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: "required",
                        expression: "'required'"
                      }
                    ],
                    attrs: {
                      "append-icon": "fa-compress",
                      label: "Automatically compress",
                      color: "info",
                      light: true,
                      "error-messages": _vm.errors.collect("auto-compress"),
                      "data-vv-name": "auto-compress"
                    },
                    model: {
                      value: _vm.autoCompress,
                      callback: function($$v) {
                        _vm.autoCompress = _vm._n($$v)
                      },
                      expression: "autoCompress"
                    }
                  }),
                  _vm._v(" "),
                  _vm.autoCompress > 0
                    ? _c("p", { staticClass: "grey--text caption" }, [
                        _vm._v(
                          "More than " +
                            _vm._s(_vm._f("formatSize")(_vm.autoCompress)) +
                            " files are automatically compressed"
                        )
                      ])
                    : _c("p", { staticClass: "grey--text caption" }, [
                        _vm._v("Set up automatic compression")
                      ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-checkbox", {
                    attrs: {
                      label: "Drag and drop upload: " + _vm.drop.toString(),
                      light: ""
                    },
                    model: {
                      value: _vm.drop,
                      callback: function($$v) {
                        _vm.drop = $$v
                      },
                      expression: "drop"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-checkbox", {
                    attrs: {
                      label:
                        "Not checked, filter the dragged folder: " +
                        _vm.dropDirectory.toString(),
                      light: ""
                    },
                    model: {
                      value: _vm.dropDirectory,
                      callback: function($$v) {
                        _vm.dropDirectory = $$v
                      },
                      expression: "dropDirectory"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-checkbox", {
                    attrs: {
                      label:
                        "Automatically activate upload: " +
                        _vm.uploadAuto.toString(),
                      light: ""
                    },
                    model: {
                      value: _vm.uploadAuto,
                      callback: function($$v) {
                        _vm.uploadAuto = $$v
                      },
                      expression: "uploadAuto"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0d1cc6ef", module.exports)
  }
}

/***/ }),

/***/ 861:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main-layout",
    { style: { paddingTop: "100px", backgroundColor: "white" } },
    [
      _c(
        "v-container",
        { attrs: { fluid: "" } },
        [
          _c("dash-panels", {
            attrs: {
              unpaid: _vm.unpaid,
              paid: _vm.paid,
              sent: _vm.sent,
              received: _vm.received,
              total: _vm.total,
              unsent: _vm.unsent,
              done: _vm.done
            }
          }),
          _vm._v(" "),
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c("v-data-table", {
                attrs: {
                  headers: _vm.headers,
                  items: _vm.items,
                  light: "",
                  expand: ""
                },
                scopedSlots: _vm._u([
                  {
                    key: "items",
                    fn: function(props) {
                      return [
                        _c("tr", [
                          _c(
                            "td",
                            { staticClass: "title text-xs-left primary--text" },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { color: "primary", icon: "" },
                                  on: {
                                    click: function($event) {
                                      props.expanded = !props.expanded
                                    }
                                  }
                                },
                                [_c("v-icon", [_vm._v("shopping_basket")])],
                                1
                              ),
                              _vm._v(
                                "\n                  " +
                                  _vm._s(props.item.id) +
                                  "\n              "
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "td",
                            { staticClass: "title text-xs-left primary--text" },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm._f("currency")(
                                    _vm.totalAmount(props.item),
                                    _vm.currency
                                  )
                                )
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "td",
                            { staticClass: "title text-xs-left primary--text" },
                            [
                              _c("v-switch", {
                                attrs: {
                                  label:
                                    "" +
                                    (props.item.payment.paid
                                      ? "Paid"
                                      : "Unpaid"),
                                  color: "teal darken-4",
                                  light: "",
                                  disabled: !_vm.hasRole("admin")
                                },
                                on: {
                                  change: function($event) {
                                    _vm.togglePaid(props.item)
                                  }
                                },
                                model: {
                                  value: props.item.payment.paid,
                                  callback: function($$v) {
                                    props.item.payment.paid = $$v
                                  },
                                  expression: "props.item.payment.paid"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "td",
                            { staticClass: "title text-xs-left primary--text" },
                            [
                              props.item.shipment
                                ? _c("v-switch", {
                                    attrs: {
                                      label:
                                        "" +
                                        (props.item.shipment.sent
                                          ? "Sent"
                                          : "On-Hold"),
                                      color: "cyan",
                                      light: "",
                                      disabled: !_vm.hasRole("admin")
                                    },
                                    on: {
                                      change: function($event) {
                                        _vm.toggleSent(props.item)
                                      }
                                    },
                                    model: {
                                      value: props.item.shipment.sent,
                                      callback: function($$v) {
                                        props.item.shipment.sent = $$v
                                      },
                                      expression: "props.item.shipment.sent"
                                    }
                                  })
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "td",
                            { staticClass: "title text-xs-left primary--text" },
                            [
                              props.item.shipment
                                ? _c("v-switch", {
                                    attrs: {
                                      label:
                                        "" +
                                        (props.item.shipment.received
                                          ? "Received"
                                          : "Pending"),
                                      color: "light-green",
                                      light: ""
                                    },
                                    on: {
                                      change: function($event) {
                                        _vm.toggleReceived(props.item)
                                      }
                                    },
                                    model: {
                                      value: props.item.shipment.received,
                                      callback: function($$v) {
                                        props.item.shipment.received = $$v
                                      },
                                      expression: "props.item.shipment.received"
                                    }
                                  })
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "td",
                            { staticClass: "title text-xs-left primary--text" },
                            [
                              _c("v-switch", {
                                attrs: {
                                  label:
                                    "" +
                                    (props.item.done
                                      ? "Completed"
                                      : "On-Progress"),
                                  color: "teal lighten-2",
                                  light: "",
                                  disabled: !_vm.hasRole("admin")
                                },
                                on: {
                                  change: function($event) {
                                    _vm.toggleDone(props.item)
                                  }
                                },
                                model: {
                                  value: props.item.done,
                                  callback: function($$v) {
                                    props.item.done = $$v
                                  },
                                  expression: "props.item.done"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "td",
                            { staticClass: "title text-xs-center" },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    disabled: !_vm.can("edit_order"),
                                    flat: "",
                                    icon: "",
                                    color: "accent"
                                  },
                                  nativeOn: {
                                    click: function($event) {
                                      _vm.setCurrentOrder(props.item)
                                    }
                                  }
                                },
                                [_c("v-icon", [_vm._v("fa-edit")])],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    disabled: !_vm.can("delete_order"),
                                    flat: "",
                                    icon: "",
                                    color: "error"
                                  },
                                  nativeOn: {
                                    click: function($event) {
                                      _vm.deleteOrder(props.item)
                                    }
                                  }
                                },
                                [_c("v-icon", [_vm._v("fa-trash")])],
                                1
                              )
                            ],
                            1
                          )
                        ])
                      ]
                    }
                  },
                  {
                    key: "expand",
                    fn: function(props) {
                      return [
                        _c("v-data-table", {
                          attrs: {
                            items: _vm.getItems(props.item.cart),
                            "hide-actions": "",
                            light: ""
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "headers",
                              fn: function(orders) {
                                return [
                                  _c("th", { staticClass: "text-xs-left" }, [
                                    _vm._v("Product")
                                  ]),
                                  _vm._v(" "),
                                  _c("th", { staticClass: "text-xs-left" }, [
                                    _vm._v("Qty")
                                  ]),
                                  _vm._v(" "),
                                  _c("th", { staticClass: "text-xs-left" }, [
                                    _vm._v("Price")
                                  ]),
                                  _vm._v(" "),
                                  _c("th", { staticClass: "text-xs-left" }, [
                                    _vm._v("Tax")
                                  ]),
                                  _vm._v(" "),
                                  _c("th", { staticClass: "text-xs-left" }, [
                                    _vm._v("Subtotal")
                                  ])
                                ]
                              }
                            },
                            {
                              key: "items",
                              fn: function(orders) {
                                return [
                                  _c("td", { staticClass: "text-xs-left" }, [
                                    _c(
                                      "span",
                                      { staticClass: "primary--text" },
                                      [_vm._v(_vm._s(orders.item.name))]
                                    ),
                                    _vm._v(" "),
                                    orders.item.options !== {}
                                      ? _c(
                                          "span",
                                          _vm._l(orders.item.options, function(
                                            option,
                                            key
                                          ) {
                                            return _c(
                                              "span",
                                              {
                                                key: key,
                                                staticClass:
                                                  "info--text caption"
                                              },
                                              [
                                                _vm._v(
                                                  "(" + _vm._s(option) + ")"
                                                )
                                              ]
                                            )
                                          })
                                        )
                                      : _vm._e()
                                  ]),
                                  _vm._v(" "),
                                  _c("td", { staticClass: "text-xs-left" }, [
                                    _vm._v(_vm._s(orders.item.qty))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", { staticClass: "text-xs-left" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("currency")(
                                          orders.item.price,
                                          _vm.currency
                                        )
                                      )
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("td", { staticClass: "text-xs-left" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("currency")(
                                          parseFloat(orders.item.tax).toFixed(
                                            2
                                          ),
                                          _vm.currency
                                        )
                                      )
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("td", { staticClass: "text-xs-left" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("currency")(
                                          orders.item.subtotal,
                                          _vm.currency
                                        )
                                      )
                                    )
                                  ])
                                ]
                              }
                            }
                          ])
                        })
                      ]
                    }
                  },
                  {
                    key: "pageText",
                    fn: function(ref) {
                      var pageStart = ref.pageStart
                      var pageStop = ref.pageStop
                      return [
                        _vm._v(
                          "\n              From " +
                            _vm._s(pageStart) +
                            " to " +
                            _vm._s(pageStop) +
                            "\n          "
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c(
                "v-dialog",
                {
                  attrs: {
                    fullscreen: "",
                    transition: "dialog-bottom-transition",
                    overlay: false
                  },
                  model: {
                    value: _vm.dialog,
                    callback: function($$v) {
                      _vm.dialog = $$v
                    },
                    expression: "dialog"
                  }
                },
                [
                  _c(
                    "v-card",
                    { attrs: { light: true } },
                    [
                      _c(
                        "v-toolbar",
                        { attrs: { color: "accent" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "error--text",
                              attrs: { icon: "" },
                              nativeOn: {
                                click: function($event) {
                                  _vm.dialog = false
                                }
                              }
                            },
                            [_c("v-icon", [_vm._v("close")])],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-toolbar-title",
                            { staticClass: "primary--text" },
                            [
                              _vm._v(
                                "Update Order No. " +
                                  _vm._s(_vm.current_order.id)
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-toolbar-items",
                            [
                              _c(
                                "v-btn",
                                {
                                  staticClass: "info--text",
                                  attrs: { flat: "" },
                                  nativeOn: {
                                    click: function($event) {
                                      _vm.dialog = false
                                    }
                                  }
                                },
                                [_vm._v("Save")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-container",
                        { attrs: { fluid: "" } },
                        [
                          _c(
                            "v-tabs",
                            {
                              model: {
                                value: _vm.active.name,
                                callback: function($$v) {
                                  _vm.active.name = $$v
                                },
                                expression: "active.name"
                              }
                            },
                            [
                              _c(
                                "v-tabs-bar",
                                { staticClass: "accent" },
                                [
                                  _vm._l(_vm.tabs, function(tab, key) {
                                    return _c(
                                      "v-tabs-item",
                                      {
                                        key: key,
                                        attrs: {
                                          href: "#" + tab.name,
                                          ripple: ""
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n                      " +
                                            _vm._s(tab.name) +
                                            "\n                      "
                                        )
                                      ]
                                    )
                                  }),
                                  _vm._v(" "),
                                  _c("v-tabs-slider", {
                                    attrs: { color: "primary" }
                                  })
                                ],
                                2
                              ),
                              _vm._v(" "),
                              _c(
                                "v-tabs-items",
                                _vm._l(_vm.tabs, function(tab, key) {
                                  return _c(
                                    "v-tabs-content",
                                    { key: key, attrs: { id: tab.name } },
                                    [
                                      _c(
                                        "v-card",
                                        { attrs: { flat: "", light: true } },
                                        [
                                          _c(tab.component, {
                                            tag: "component",
                                            attrs: {
                                              tab: tab,
                                              order: _vm.current_order
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  )
                                })
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c5205e8c", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9EYXNoYm9hcmQudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbWl4aW5zL3RoZW1lLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9WTGluay52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbWl4aW5zL2FjbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9NYWluLnZ1ZSIsIndlYnBhY2s6Ly8vTWFpbi52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZT9jNGQ2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZT9lY2YxIiwid2VicGFjazovLy9BcHBGb290ZXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9WTGluay52dWU/MWY5NSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlP2Q5NzkiLCJ3ZWJwYWNrOi8vL1ZMaW5rLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlPzMxOWQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlPzYxMTIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBOYXZCYXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT83ZTJiIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT8xNDQxIiwid2VicGFjazovLy9BcHBOYXZCYXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT83MDhmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlIiwid2VicGFjazovLy9MZWZ0U2lkZUJhci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhdGVnb3J5TGluay52dWUiLCJ3ZWJwYWNrOi8vL0NhdGVnb3J5TGluay52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhdGVnb3J5TGluay52dWU/ZTJmZCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0xlZnRTaWRlQmFyLnZ1ZT8yODUwIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9GYWJCdXR0b24udnVlIiwid2VicGFjazovLy9GYWJCdXR0b24udnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9GYWJCdXR0b24udnVlPzYwNTYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9Db29raWVMYXcudnVlIiwid2VicGFjazovLy9Db29raWVMYXcudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtY29va2llLWxhdy9kaXN0L3Z1ZS1jb29raWUtbGF3LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQ29va2llTGF3LnZ1ZT80Y2Y0Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9NYWluLnZ1ZT85N2MxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AeGtlc2hpL2ltYWdlLWNvbXByZXNzb3IvZGlzdC9pbWFnZS1jb21wcmVzc29yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtdXBsb2FkLWNvbXBvbmVudC9kaXN0L3Z1ZS11cGxvYWQtY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3ZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZT8yNTc4Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZT8yYTY5Iiwid2VicGFjazovLy9EYXNoYm9hcmQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvRGFzaFBhbmVscy52dWUiLCJ3ZWJwYWNrOi8vL0Rhc2hQYW5lbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvRGFzaFBhbmVscy52dWU/ODhiZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL0N1c3RvbWVyRGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9DdXN0b21lckRldGFpbHMudnVlPzE4ZjMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9DdXN0b21lckRldGFpbHMudnVlPzJmMjUiLCJ3ZWJwYWNrOi8vL0N1c3RvbWVyRGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9DdXN0b21lckRldGFpbHMudnVlP2JlNGYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9QYXltZW50RGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9QYXltZW50RGV0YWlscy52dWU/OGQ3MCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1BheW1lbnREZXRhaWxzLnZ1ZT84OTAwIiwid2VicGFjazovLy9QYXltZW50RGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9QYXltZW50RGV0YWlscy52dWU/ZWU3OCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBwaW5nRGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwcGluZ0RldGFpbHMudnVlPzFlODkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwcGluZ0RldGFpbHMudnVlP2Q5YTMiLCJ3ZWJwYWNrOi8vL1NoaXBwaW5nRGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwcGluZ0RldGFpbHMudnVlPzZjNjYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwbWVudERldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcG1lbnREZXRhaWxzLnZ1ZT83ZDdjIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcG1lbnREZXRhaWxzLnZ1ZT83ZDBmIiwid2VicGFjazovLy9TaGlwbWVudERldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcG1lbnREZXRhaWxzLnZ1ZT9kZWFjIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvRmlsZVVwbG9hZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vRmlsZVVwbG9hZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL0ZpbGVVcGxvYWRlci52dWU/ZmMyMCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0Rhc2hib2FyZC52dWU/NjVmZSJdLCJuYW1lcyI6WyJkYXRhIiwiZGFya0NsYXNzIiwiQXBwIiwidGhlbWUiLCJkYXJrIiwicHJpbWFyeUNsYXNzIiwicHJpbWFyeSIsImFjY2VudENsYXNzIiwiYWNjZW50Iiwic2Vjb25kYXJ5Q2xhc3MiLCJzZWNvbmRhcnkiLCJpbmZvQ2xhc3MiLCJpbmZvIiwid2FybmluZ0NsYXNzIiwid2FybmluZyIsImVycm9yQ2xhc3MiLCJlcnJvciIsInN1Y2Nlc3NDbGFzcyIsInN1Y2Nlc3MiLCJ0b2dnbGVCYXJTdHlsZSIsInNpdGUiLCJ0aXRsZVN0eWxlIiwibmF2YmFyU3R5bGUiLCJmb290ZXJTdHlsZSIsInNpZGViYXJTdHlsZSIsImRvbWFpbiIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0cmFkZW1hcmsiLCJsb2dvIiwidXJsIiwibG9nb1N0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJzaG93TG9nbyIsInNob3ciLCJzaG93SWNvbiIsImljb24iLCJuYW1lIiwiaWNvbkNvbG9yIiwiY29sb3IiLCJ0aXRsZSIsImNvbXB1dGVkIiwiaXNEYXJrIiwibWV0aG9kcyIsImlzTG9nZ2VkSW4iLCIkc3RvcmUiLCJnZXR0ZXJzIiwiaGFzUm9sZSIsInBheWxvYWQiLCJtZSIsIl8iLCJpbmNsdWRlcyIsInJvbGVzIiwiaGFzUGVybWlzc2lvbiIsInBlcm1pc3Npb25zIiwiaGFzQW55UGVybWlzc2lvbiIsInNvbWUiLCJwIiwiaGFzQW55Um9sZSIsInIiLCJoYXNBbGxSb2xlcyIsImRpZmZlcmVuY2UiLCJsZW5ndGgiLCJoYXNBbGxQZXJtaXNzaW9ucyIs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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsd0JBQXdCO0FBQzNELEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtB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QVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsYUFBYTtBQUNiLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztB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O0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsVUFBVSxFQUFFO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxtREFBbUQsRUFBRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsVUFBVSxFQUFFO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxtREFBbUQsRUFBRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDOU1BO0FBQ0E7QUFDQTtBQUNBLHlCQUFzTTtBQUN0TTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTLFVBQVUsRUFBRTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVMsbURBQW1ELEVBQUU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTLFVBQVUsRUFBRTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVMsbURBQW1ELEVBQUU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTLFVBQVUsRUFBRTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVMsbURBQW1ELEVBQUU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxp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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDE4IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1jNTIwNWU4Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Rhc2hib2FyZC52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vRGFzaGJvYXJkLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYzUyMDVlOGNcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9EYXNoYm9hcmQudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtYzUyMDVlOGNcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFnZXNcXFxcRGFzaGJvYXJkLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gRGFzaGJvYXJkLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1jNTIwNWU4Y1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWM1MjA1ZThjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0Rhc2hib2FyZC52dWVcbi8vIG1vZHVsZSBpZCA9IDY0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gNjQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxOCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE5IiwiLyoqXG4gKiBFeHBvcnQgdGhlIEFueSBDb21wb25lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGRhcmtDbGFzczogQXBwLnRoZW1lLmRhcmssXG4gICAgICAgIHByaW1hcnlDbGFzczogQXBwLnRoZW1lLnByaW1hcnksXG4gICAgICAgIGFjY2VudENsYXNzOiBBcHAudGhlbWUuYWNjZW50LFxuICAgICAgICBzZWNvbmRhcnlDbGFzczogQXBwLnRoZW1lLnNlY29uZGFyeSxcbiAgICAgICAgaW5mb0NsYXNzOiBBcHAudGhlbWUuaW5mbyxcbiAgICAgICAgd2FybmluZ0NsYXNzOiBBcHAudGhlbWUud2FybmluZyxcbiAgICAgICAgZXJyb3JDbGFzczogQXBwLnRoZW1lLmVycm9yLFxuICAgICAgICBzdWNjZXNzQ2xhc3M6IEFwcC50aGVtZS5zdWNjZXNzLFxuICAgICAgICB0b2dnbGVCYXJTdHlsZTogQXBwLnNpdGUudG9nZ2xlQmFyU3R5bGUsXG4gICAgICAgIHRpdGxlU3R5bGU6IEFwcC5zaXRlLnRpdGxlU3R5bGUsXG4gICAgICAgIG5hdmJhclN0eWxlOiBBcHAuc2l0ZS5uYXZiYXJTdHlsZSxcbiAgICAgICAgZm9vdGVyU3R5bGU6IEFwcC5zaXRlLmZvb3RlclN0eWxlLFxuICAgICAgICBzaWRlYmFyU3R5bGU6IEFwcC5zaXRlLnNpZGViYXJTdHlsZSxcbiAgICAgICAgZG9tYWluOiBBcHAuc2l0ZS5kb21haW4sXG4gICAgICAgIHllYXI6IChuZXcgRGF0ZSgpKS5nZXRGdWxsWWVhcigpLFxuICAgICAgICB0cmFkZW1hcms6IEFwcC5zaXRlLnRyYWRlbWFyayxcbiAgICAgICAgbG9nbzogQXBwLnNpdGUubG9nby51cmwsXG4gICAgICAgIGxvZ29TdHlsZToge1xuICAgICAgICAgICAgd2lkdGg6IEFwcC5zaXRlLmxvZ28ud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IEFwcC5zaXRlLmxvZ28uaGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dMb2dvOiBBcHAuc2l0ZS5sb2dvLnNob3csXG4gICAgICAgIHNob3dJY29uOiBBcHAuc2l0ZS5pY29uLnNob3csXG4gICAgICAgIGljb246IEFwcC5zaXRlLmljb24ubmFtZSA/IEFwcC5zaXRlLmljb24ubmFtZSA6IG51bGwsXG4gICAgICAgIGljb25Db2xvcjogQXBwLnNpdGUuaWNvbi5jb2xvcixcbiAgICAgICAgdGl0bGU6IEFwcC5zaXRlLnRyYWRlbWFya1xuICAgIH0pLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGlzRGFyayAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXJrQ2xhc3MgPT09IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9taXhpbnMvdGhlbWUuanMiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTZiNDExZWI2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vVkxpbmsudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1ZMaW5rLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmI0MTFlYjZcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9WTGluay52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi02YjQxMWViNlwiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXFZMaW5rLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gVkxpbmsudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTZiNDExZWI2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNmI0MTFlYjZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9WTGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDcgOCA5IDEwIDExIDEyIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOSIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOSIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDY1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTkiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgbWV0aG9kczoge1xuICAgICAgICBpc0xvZ2dlZEluICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIXRoaXMuJHN0b3JlLmdldHRlcnNbJ2F1dGgvZ2V0TWUnXVxuICAgICAgICB9LFxuICAgICAgICAvKiBzdHJpbmcgKi9cbiAgICAgICAgaGFzUm9sZSAocGF5bG9hZCkge1xuICAgICAgICAgICAgbGV0IG1lID0gdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXV0aC9nZXRNZSddXG4gICAgICAgICAgICByZXR1cm4gXy5pbmNsdWRlcyhtZS5yb2xlcywgcGF5bG9hZClcbiAgICAgICAgfSxcbiAgICAgICAgLyogc3RyaW5nICovXG4gICAgICAgIGhhc1Blcm1pc3Npb24gKHBheWxvYWQpIHtcbiAgICAgICAgICAgIGxldCBtZSA9IHRoaXMuJHN0b3JlLmdldHRlcnNbJ2F1dGgvZ2V0TWUnXVxuICAgICAgICAgICAgcmV0dXJuIF8uaW5jbHVkZXMobWUucGVybWlzc2lvbnMsIHBheWxvYWQpXG4gICAgICAgIH0sXG4gICAgICAgIC8qIGFycmF5ICovXG4gICAgICAgIGhhc0FueVBlcm1pc3Npb24gKHBlcm1pc3Npb25zKSB7XG4gICAgICAgICAgICBsZXQgbWUgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzWydhdXRoL2dldE1lJ11cbiAgICAgICAgICAgIHJldHVybiBwZXJtaXNzaW9ucy5zb21lKHAgPT4gbWUucGVybWlzc2lvbnMuaW5jbHVkZXMocCkpXG4gICAgICAgIH0sXG4gICAgICAgIC8qIGFycmF5ICovXG4gICAgICAgIGhhc0FueVJvbGUgKHJvbGVzKSB7XG4gICAgICAgICAgICBsZXQgbWUgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzWydhdXRoL2dldE1lJ11cbiAgICAgICAgICAgIHJldHVybiByb2xlcy5zb21lKHIgPT4gbWUucm9sZXMuaW5jbHVkZXMocikpXG4gICAgICAgIH0sXG4gICAgICAgIC8qIGFycmF5ICovXG4gICAgICAgIGhhc0FsbFJvbGVzIChyb2xlcykge1xuICAgICAgICAgICAgbGV0IG1lID0gdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXV0aC9nZXRNZSddXG4gICAgICAgICAgICByZXR1cm4gXy5kaWZmZXJlbmNlKHJvbGVzLCBtZS5yb2xlcykubGVuZ3RoID09PSAwXG4gICAgICAgIH0sXG4gICAgICAgIC8qIGFycmF5ICovXG4gICAgICAgIGhhc0FsbFBlcm1pc3Npb25zIChwZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgbGV0IG1lID0gdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXV0aC9nZXRNZSddXG4gICAgICAgICAgICByZXR1cm4gXy5kaWZmZXJlbmNlKHBlcm1pc3Npb25zLCBtZS5wZXJtaXNzaW9ucykubGVuZ3RoID09PSAwXG4gICAgICAgIH0sXG4gICAgICAgIC8qIHN0cmluZyAqL1xuICAgICAgICBjYW4gKHBlcm1pc3Npb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWydhdXRoL2dldE1lJ10uY2FuW3Blcm1pc3Npb25dXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21peGlucy9hY2wuanMiLCIvKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGxpc3QgZm9ybWF0IHByb2R1Y2VkIGJ5IGNzcy1sb2FkZXIgaW50byBzb21ldGhpbmdcbiAqIGVhc2llciB0byBtYW5pcHVsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGlkOiBwYXJlbnRJZCArICc6JyArIGksXG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDY1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTgiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9NYWluLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZThmMTRhYzRcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vTWFpbi52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGxheW91dHNcXFxcTWFpbi52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIE1haW4udnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LWU4ZjE0YWM0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtZThmMTRhYzRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9NYWluLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCI8dGVtcGxhdGU+XG4gPHYtYXBwIDpkYXJrPVwiQXBwLnRoZW1lLmRhcmtcIiAgc3RhbmRhbG9uZSB2LWNsb2FrPlxuICAgIDxsZWZ0LXNpZGUtYmFyPjwvbGVmdC1zaWRlLWJhcj5cbiAgICA8YXBwLW5hdi1iYXI+PC9hcHAtbmF2LWJhcj5cbiAgICA8bWFpbj5cbiAgICA8IS0tIGFkZGVkIGZsdWlkIGFuZCBwYS0wIG1hLTAgZm9yIGZ1bGwgc2NyZWVuIHBhZ2VzIC0tPlxuICAgICAgPHYtY29udGFpbmVyIHRyYW5zaXRpb249XCJzbGlkZS14LXRyYW5zaXRpb25cIiBmbHVpZCBjbGFzcz1cInBhLTAgbWEtMFwiPlxuICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgIDwvdi1jb250YWluZXI+XG4gICAgPC9tYWluPlxuICAgIDwhLS0gPHNob3BwaW5nLWNhcnQ+PC9zaG9wcGluZy1jYXJ0PiAtLT5cbiAgICA8ZmFiLWJ1dHRvbj48L2ZhYi1idXR0b24+XG4gICAgPGNvb2tpZS1sYXc+PC9jb29raWUtbGF3PlxuICAgIDxhcHAtZm9vdGVyPjwvYXBwLWZvb3Rlcj5cbiAgPC92LWFwcD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQXBwRm9vdGVyIGZyb20gJy4uL3BhcnRpYWxzL0FwcEZvb3Rlci52dWUnXG5pbXBvcnQgQXBwTmF2QmFyIGZyb20gJy4uL3BhcnRpYWxzL0FwcE5hdkJhci52dWUnXG5pbXBvcnQgTGVmdFNpZGVCYXIgZnJvbSAnLi4vcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlJ1xuaW1wb3J0IEZhYkJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL0ZhYkJ1dHRvbi52dWUnXG5pbXBvcnQgQ29va2llTGF3IGZyb20gJy4uL3BhcnRpYWxzL0Nvb2tpZUxhdy52dWUnXG4vLyBpbXBvcnQgU2hvcHBpbmdDYXJ0IGZyb20gJy4uL3BhcnRpYWxzL1Nob3BwaW5nQ2FydC52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEFwcEZvb3RlcixcbiAgICAgICAgQXBwTmF2QmFyLFxuICAgICAgICBMZWZ0U2lkZUJhcixcbiAgICAgICAgRmFiQnV0dG9uLFxuICAgICAgICBDb29raWVMYXdcbiAgICAgICAgLy8gU2hvcHBpbmdDYXJ0XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gTWFpbi52dWU/ZmQzNWVlMzAiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTkxN2FlMDA0XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcEZvb3Rlci52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQXBwRm9vdGVyLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTE3YWUwMDRcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQXBwRm9vdGVyLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHBhcnRpYWxzXFxcXEFwcEZvb3Rlci52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIEFwcEZvb3Rlci52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtOTE3YWUwMDRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi05MTdhZTAwNFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNiA3IDggOSAxMCAxMSAxMiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05MTdhZTAwNFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBGb290ZXIudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIwYjE1MzJhN1wiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05MTdhZTAwNFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBGb290ZXIudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTkxN2FlMDA0XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcEZvb3Rlci52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtOTE3YWUwMDRcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIkFwcEZvb3Rlci52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi05MTdhZTAwNFwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNiA3IDggOSAxMCAxMSAxMiIsIjx0ZW1wbGF0ZT5cbjx2LWZvb3RlciA6Y2xhc3M9XCJbZm9vdGVyQ2xhc3NdXCI+XG48di1zcGFjZXI+PC92LXNwYWNlcj48c3Bhbj7CqSB7eyB5ZWFyIH19IHt7IGRvbWFpbiB9fSDCriB8IHt7IHRyYWRlbWFyayB9feKEojwvc3Bhbj48di1zcGFjZXI+PC92LXNwYWNlcj5cbjwvdi1mb290ZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcbmltcG9ydCBWTGluayBmcm9tICcuLi9jb21wb25lbnRzL1ZMaW5rLnZ1ZSdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtaXhpbnM6IFtUaGVtZV0sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZm9vdGVyQ2xhc3M6IHsncHJpbWFyeS0tdGV4dCc6IHRydWV9XG4gICAgfSksXG4gICAgY3JlYXRlZCAoKSB7XG4gICAgICAgIC8qIEVtaXQgT24gYSBDaGlsZCBDb21wb25lbnQgSWYgWW91IFdhbnQgVGhpcyBUbyBCZSBWaXNpYmxlICovXG4gICAgICAgIEJ1cy4kb24oJ2Zvb3Rlci1jb250ZW50LXZpc2libGUnLCAodmlzaWJpbGl0eSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50VmlzaWJsZSA9IHZpc2liaWxpdHlcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgVkxpbmtcbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEFwcEZvb3Rlci52dWU/NTJjZDI4MTAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmI0MTFlYjZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9WTGluay52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjkwNmIyZDcyXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTZiNDExZWI2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vVkxpbmsudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTZiNDExZWI2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vVkxpbmsudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTZiNDExZWI2XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL1ZMaW5rLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLnN0eWxlQXZhdGFyW2RhdGEtdi02YjQxMWViNl0ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luLWxlZnQ6IC01NXB4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovVXNlcnMvdXJpYWgvc2l0ZXMvd3d3L3Nob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL1ZMaW5rLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxtQkFBbUI7RUFDbkIsbUJBQW1CO0NBQUVcIixcImZpbGVcIjpcIlZMaW5rLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuc3R5bGVBdmF0YXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luLWxlZnQ6IC01NXB4OyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTZiNDExZWI2XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL1ZMaW5rLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCI8dGVtcGxhdGU+XG4gICAgPHYtbGlzdC10aWxlIDphdmF0YXI9XCJhdmF0YXJPblwiICBAY2xpY2submF0aXZlPVwibmF2aWdhdGUoaHJlZilcIiA6Y2xhc3M9XCJbeyBzdHlsZUF2YXRhcjogYXZhdGFyT24gfV1cIj5cbiAgICAgICAgICA8di1saXN0LXRpbGUtYWN0aW9uIHYtaWY9XCJpY29uT24gJiYgIWF2YXRhck9uXCI+XG4gICAgICAgICAgICA8di1pY29uIDpzdHlsZT1cIntjb2xvcjogaXNBY3RpdmUgPyBhY3RpdmVDb2xvciA6IGljb25Db2xvciwgY3Vyc29yOiBocmVmID8gJ3BvaW50ZXInIDogJyd9XCI+e3sgaWNvbiB9fTwvdi1pY29uPlxuICAgICAgICAgIDwvdi1saXN0LXRpbGUtYWN0aW9uPlxuICAgICAgICAgIDx2LWxpc3QtdGlsZS1hdmF0YXIgdi1pZj1cImljb25PbiAmJiBhdmF0YXJPblwiPlxuICAgICAgICAgICAgICA8aW1nIDpzcmM9XCJhdmF0YXJcIiBhbHQ9XCJcIj5cbiAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtYXZhdGFyPlxuICAgICAgICAgIDx2LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLXRpdGxlICA6c3R5bGU9XCJ7Y29sb3I6IGlzQWN0aXZlID8gYWN0aXZlQ29sb3IgOiBsaW5rQ29sb3J9XCI+XG4gICAgICAgICAgICAgIDxzcGFuIDpzdHlsZT1cIntjdXJzb3I6IGhyZWYgPyAncG9pbnRlcicgOiAnJ31cIj57eyB0aXRsZSAgfX08L3NwYW4+XG4gICAgICAgICAgICA8L3YtbGlzdC10aWxlLXRpdGxlPlxuICAgICAgICAgIDwvdi1saXN0LXRpbGUtY29udGVudD5cbiAgICAgICAgICA8di1saXN0LXRpbGUtYWN0aW9uIHYtaWY9XCJpY29uT24gJiYgYXZhdGFyT25cIj5cbiAgICAgICAgICAgIDx2LWljb24gOnN0eWxlPVwie2NvbG9yOiBpc0FjdGl2ZSA/IGFjdGl2ZUNvbG9yIDogaWNvbkNvbG9yLCBjdXJzb3I6IGhyZWYgPyAncG9pbnRlcicgOiAnJ31cIj57eyBpY29uIH19PC92LWljb24+XG4gICAgICAgICAgPC92LWxpc3QtdGlsZS1hY3Rpb24+XG4gICAgPC92LWxpc3QtdGlsZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IHtcbiAgICAgICAgZGFyazoge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBBcHAudGhlbWUuZGFya1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBocmVmOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgICB9LFxuICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpY29uOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbkNvbG9yOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXJrID8gJyNmYWZhZmEnIDogJyM3ODkwOUMnIC8vIHdoaXRlIG9yIGJsdWUtZ3JleSBsaWdodGVuLTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbGlua0NvbG9yOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXJrID8gJyNmYWZhZmEnIDogJyM3ODkwOUMnIC8vIHdoaXRlIG9yIGJsdWUtZ3JleSBsaWdodGVuLTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWN0aXZlQ29sb3I6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnIzRkYjZhYycgLy8gdGVhbCBsaWdodGVuIDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgaXNBY3RpdmUgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHJlZiA9PT0gdGhpcy4kcm91dGUucGF0aFxuICAgICAgICB9LFxuICAgICAgICBpc0RhcmsgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGFyayA9PT0gdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBhdmF0YXJPbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLmF2YXRhclxuICAgICAgICB9LFxuICAgICAgICBpY29uT24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5pY29uXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbmF2aWdhdGUgKGhyZWYpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgLyogaWYgdmFsaWQgdXJsICovXG4gICAgICAgICAgICBpZiAoc2VsZi5pc1VSTChocmVmKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGhyZWYpXG4gICAgICAgICAgICB9IGVsc2UgeyAvKiB3aGVuIHVzaW5nIHZ1ZSByb3V0ZXIgcGF0aCAqL1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHsgcGF0aDogYCR7aHJlZn1gIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzVVJMIChzdHIpIHtcbiAgICAgICAgICAgIHZhciB1cmxSZWdleCA9ICdeKD8hbWFpbHRvOikoPzooPzpodHRwfGh0dHBzfGZ0cCk6Ly8pKD86XFxcXFMrKD86OlxcXFxTKik/QCk/KD86KD86KD86WzEtOV1cXFxcZD98MVxcXFxkXFxcXGR8MlswMV1cXFxcZHwyMlswLTNdKSg/OlxcXFwuKD86MT9cXFxcZHsxLDJ9fDJbMC00XVxcXFxkfDI1WzAtNV0pKXsyfSg/OlxcXFwuKD86WzAtOV1cXFxcZD98MVxcXFxkXFxcXGR8MlswLTRdXFxcXGR8MjVbMC00XSkpfCg/Oig/OlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XSstPykqW2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldKykoPzpcXFxcLig/OlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XSstPykqW2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldKykqKD86XFxcXC4oPzpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZl17Mix9KSkpfGxvY2FsaG9zdCkoPzo6XFxcXGR7Miw1fSk/KD86KC98XFxcXD98IylbXlxcXFxzXSopPyQnXG4gICAgICAgICAgICB2YXIgdXJsID0gbmV3IFJlZ0V4cCh1cmxSZWdleCwgJ2knKVxuICAgICAgICAgICAgcmV0dXJuIHN0ci5sZW5ndGggPCAyMDgzICYmIHVybC50ZXN0KHN0cilcbiAgICAgICAgfVxuXG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbiAgICAuc3R5bGVBdmF0YXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNTVweDtcbiAgICB9XG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFZMaW5rLnZ1ZT83ZjQ3Y2ZhYyIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxpc3QtdGlsZVwiLFxuICAgIHtcbiAgICAgIGNsYXNzOiBbeyBzdHlsZUF2YXRhcjogX3ZtLmF2YXRhck9uIH1dLFxuICAgICAgYXR0cnM6IHsgYXZhdGFyOiBfdm0uYXZhdGFyT24gfSxcbiAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICBfdm0ubmF2aWdhdGUoX3ZtLmhyZWYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF92bS5pY29uT24gJiYgIV92bS5hdmF0YXJPblxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS1hY3Rpb25cIixcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLmlzQWN0aXZlID8gX3ZtLmFjdGl2ZUNvbG9yIDogX3ZtLmljb25Db2xvcixcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBfdm0uaHJlZiA/IFwicG9pbnRlclwiIDogXCJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmljb24pKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmljb25PbiAmJiBfdm0uYXZhdGFyT25cbiAgICAgICAgPyBfYyhcInYtbGlzdC10aWxlLWF2YXRhclwiLCBbXG4gICAgICAgICAgICBfYyhcImltZ1wiLCB7IGF0dHJzOiB7IHNyYzogX3ZtLmF2YXRhciwgYWx0OiBcIlwiIH0gfSlcbiAgICAgICAgICBdKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGlzdC10aWxlLWNvbnRlbnRcIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS10aXRsZVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogX3ZtLmlzQWN0aXZlID8gX3ZtLmFjdGl2ZUNvbG9yIDogX3ZtLmxpbmtDb2xvciB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdHlsZTogeyBjdXJzb3I6IF92bS5ocmVmID8gXCJwb2ludGVyXCIgOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnRpdGxlKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmljb25PbiAmJiBfdm0uYXZhdGFyT25cbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1saXN0LXRpbGUtYWN0aW9uXCIsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IF92bS5pc0FjdGl2ZSA/IF92bS5hY3RpdmVDb2xvciA6IF92bS5pY29uQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogX3ZtLmhyZWYgPyBcInBvaW50ZXJcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5pY29uKSldXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTZiNDExZWI2XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02YjQxMWViNlwiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL1ZMaW5rLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1mb290ZXJcIixcbiAgICB7IGNsYXNzOiBbX3ZtLmZvb3RlckNsYXNzXSB9LFxuICAgIFtcbiAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgXCLCqSBcIiArXG4gICAgICAgICAgICBfdm0uX3MoX3ZtLnllYXIpICtcbiAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgIF92bS5fcyhfdm0uZG9tYWluKSArXG4gICAgICAgICAgICBcIiDCriB8IFwiICtcbiAgICAgICAgICAgIF92bS5fcyhfdm0udHJhZGVtYXJrKSArXG4gICAgICAgICAgICBcIuKEolwiXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgX2MoXCJ2LXNwYWNlclwiKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi05MTdhZTAwNFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtOTE3YWUwMDRcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcEZvb3Rlci52dWVcbi8vIG1vZHVsZSBpZCA9IDY2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDcgOCA5IDEwIDExIDEyIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi04ZGE1Njg1YVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBOYXZCYXIudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0FwcE5hdkJhci52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LThkYTU2ODVhXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0FwcE5hdkJhci52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxwYXJ0aWFsc1xcXFxBcHBOYXZCYXIudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBBcHBOYXZCYXIudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LThkYTU2ODVhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtOGRhNTY4NWFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOGRhNTY4NWFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwTmF2QmFyLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMzI5N2ViZTJcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOGRhNTY4NWFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwTmF2QmFyLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi04ZGE1Njg1YVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBOYXZCYXIudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LThkYTU2ODVhXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcE5hdkJhci52dWVcbi8vIG1vZHVsZSBpZCA9IDY3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDcgOCA5IDEwIDExIDEyIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJBcHBOYXZCYXIudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtOGRhNTY4NWFcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCI8dGVtcGxhdGU+XG4gIDx2LXRvb2xiYXIgOnN0eWxlPVwibmF2YmFyU3R5bGVcIiA6ZGFyaz1cIiFpc0RhcmtcIiBmaXhlZD5cbiAgICA8di10b29sYmFyLXNpZGUtaWNvbiA6c3R5bGU9XCJ0b2dnbGVCYXJTdHlsZVwiIEBjbGljay5uYXRpdmUuc3RvcD1cInRvZ2dsZURyYXdlcigpXCI+PC92LXRvb2xiYXItc2lkZS1pY29uPlxuICAgICAgICA8IS0tIFRpdGxlIC0tPlxuICAgICAgICA8di10b29sYmFyLXRpdGxlIHYtaWY9XCJleHRlbnNpb25cIiBjbGFzcz1cInRleHQteHMtY2VudGVyXCIgc2xvdD1cImV4dGVuc2lvblwiPlxuICAgICAgICAgICAgPHYtaWNvbiA6c3R5bGU9XCJ7Y29sb3I6IGljb25Db2xvciB9XCIgY2xhc3M9XCJtbC0zIGhpZGRlbi1tZC1hbmQtZG93blwiIHYtaWY9XCJzaG93SWNvblwiPnt7IGljb24gfX08L3YtaWNvbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGlkZGVuLW1kLWFuZC1kb3duXCIgOnN0eWxlPVwidGl0bGVTdHlsZVwiPnt7IHRpdGxlIH19PC9zcGFuPlxuICAgICAgICA8L3YtdG9vbGJhci10aXRsZT5cbiAgICAgICAgPHYtdG9vbGJhci10aXRsZSB2LWVsc2UgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlclwiPlxuICAgICAgICAgICAgPHYtaWNvbiA6c3R5bGU9XCJ7Y29sb3I6IGljb25Db2xvciB9XCIgY2xhc3M9XCJtbC0zIGhpZGRlbi1tZC1hbmQtZG93blwiIHYtaWY9XCJzaG93SWNvblwiPnt7IGljb24gfX08L3YtaWNvbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGlkZGVuLW1kLWFuZC1kb3duXCIgOnN0eWxlPVwidGl0bGVTdHlsZVwiPnt7IHRpdGxlIH19PC9zcGFuPlxuICAgICAgICA8L3YtdG9vbGJhci10aXRsZT5cbiAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgICAgIDwhLS0gY2VudGVyIGxvZ28gLS0+XG4gICAgICAgIDxpbWcgdi1pZj1cInNob3dMb2dvXCIgICA6c3JjPVwibG9nb1wiIDpzdHlsZT1cIltsb2dvU3R5bGVdXCIgIGFsdD1cInZ1ZWpzXCI+XG4gICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICA8IS0tIEFkZCBIZXJlIEFsbCBZb3VyIE5hdiBJY29ucyAtLT5cbiAgICAgICAgPHYtdG9vbHRpcCBsZWZ0PlxuICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVwicHJpbWFyeVwiIHNsb3Q9XCJhY3RpdmF0b3JcIiBAY2xpY2s9XCJvcGVuQ2FydCgpXCI+XG4gICAgICAgIDx2LWJhZGdlIGxlZnQ+XG4gICAgICAgIDxzcGFuIHNsb3Q9XCJiYWRnZVwiPnt7IGNvdW50IH19PC9zcGFuPlxuICAgICAgICA8di1pY29uPnNob3BwaW5nX2NhcnQ8L3YtaWNvbj5cbiAgICAgICAgPC92LWJhZGdlPlxuICAgICAgICA8L3YtYnRuPlxuICAgICAgICA8c3Bhbj5WaWV3IHwgQ2FydDwvc3Bhbj5cbiAgICAgICAgPC92LXRvb2x0aXA+XG48L3YtdG9vbGJhcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgVGhlbWUgZnJvbSAnLi4vbWl4aW5zL3RoZW1lJ1xuaW1wb3J0IHsgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfSBmcm9tICd2dWV4J1xuY29uc3QgeyBtYXBTdGF0ZSB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2NhcnQnKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWl4aW5zOiBbVGhlbWVdLFxuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGV4dGVuc2lvbjogZmFsc2UsXG4gICAgICAgIGNvdW50OiAwXG4gICAgfSksXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgLi4ubWFwU3RhdGUoe1xuICAgICAgICAgICAgZ2V0Q291bnQ6ICdjb3VudCdcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGNyZWF0ZWQgKCkge1xuICAgICAgICAvKiBFbWl0IE9uIGEgQ2hpbGQgQ29tcG9uZW50IElmIFlvdSBXYW50IFRoaXMgVG8gQmUgVmlzaWJsZSAqL1xuICAgICAgICBCdXMuJG9uKCdoZWFkZXItZXh0ZW5zaW9uLXZpc2libGUnLCAodmlzaWJpbGl0eSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRlbnNpb24gPSB2aXNpYmlsaXR5XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBtb3VudGVkICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIHNlbGYuY291bnQgPSBzZWxmLmdldENvdW50XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIC8qIFVzZSBWdWV0aWZ5IE1vZGFsICovXG4gICAgICAgIG9wZW5TaG9wcGluZ0NhcnQgKCkge1xuICAgICAgICAgICAgQnVzLiRlbWl0KCdzaG9wcGluZy1jYXJ0LW9wZW4nKVxuICAgICAgICB9LFxuICAgICAgICB0b2dnbGVEcmF3ZXIgKCkge1xuICAgICAgICAgICAgQnVzLiRlbWl0KCd0b2dnbGVEcmF3ZXInKVxuICAgICAgICB9LFxuICAgICAgICAvKiBVc2VzIENhcnQgUm91dGUgKi9cbiAgICAgICAgb3BlbkNhcnQgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLiRyb3V0ZXIucHVzaCh7IG5hbWU6ICdjYXJ0JyB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgICBnZXRDb3VudCAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5jb3VudCA9IG5ld1ZhbHVlXG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEFwcE5hdkJhci52dWU/N2FjYTNiY2EiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi10b29sYmFyXCIsXG4gICAgeyBzdHlsZTogX3ZtLm5hdmJhclN0eWxlLCBhdHRyczogeyBkYXJrOiAhX3ZtLmlzRGFyaywgZml4ZWQ6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFwidi10b29sYmFyLXNpZGUtaWNvblwiLCB7XG4gICAgICAgIHN0eWxlOiBfdm0udG9nZ2xlQmFyU3R5bGUsXG4gICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICBfdm0udG9nZ2xlRHJhd2VyKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5leHRlbnNpb25cbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi10b29sYmFyLXRpdGxlXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHNsb3Q6IFwiZXh0ZW5zaW9uXCIgfSxcbiAgICAgICAgICAgICAgc2xvdDogXCJleHRlbnNpb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLnNob3dJY29uXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1sLTMgaGlkZGVuLW1kLWFuZC1kb3duXCIsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgY29sb3I6IF92bS5pY29uQ29sb3IgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uaWNvbikpXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaGlkZGVuLW1kLWFuZC1kb3duXCIsIHN0eWxlOiBfdm0udGl0bGVTdHlsZSB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS50aXRsZSkpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfYyhcbiAgICAgICAgICAgIFwidi10b29sYmFyLXRpdGxlXCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLnNob3dJY29uXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1sLTMgaGlkZGVuLW1kLWFuZC1kb3duXCIsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgY29sb3I6IF92bS5pY29uQ29sb3IgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uaWNvbikpXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaGlkZGVuLW1kLWFuZC1kb3duXCIsIHN0eWxlOiBfdm0udGl0bGVTdHlsZSB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS50aXRsZSkpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uc2hvd0xvZ29cbiAgICAgICAgPyBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICBzdHlsZTogW192bS5sb2dvU3R5bGVdLFxuICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBfdm0ubG9nbywgYWx0OiBcInZ1ZWpzXCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LXRvb2x0aXBcIixcbiAgICAgICAgeyBhdHRyczogeyBsZWZ0OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBcInByaW1hcnlcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5vcGVuQ2FydCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtYmFkZ2VcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGxlZnQ6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IGF0dHJzOiB7IHNsb3Q6IFwiYmFkZ2VcIiB9LCBzbG90OiBcImJhZGdlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5jb3VudCkpXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwic2hvcHBpbmdfY2FydFwiKV0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwic3BhblwiLCBbX3ZtLl92KFwiVmlldyB8IENhcnRcIildKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LThkYTU2ODVhXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi04ZGE1Njg1YVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9MZWZ0U2lkZUJhci52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTRlMTI3NzE3XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0xlZnRTaWRlQmFyLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFydGlhbHNcXFxcTGVmdFNpZGVCYXIudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBMZWZ0U2lkZUJhci52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNGUxMjc3MTdcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi00ZTEyNzcxN1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9MZWZ0U2lkZUJhci52dWVcbi8vIG1vZHVsZSBpZCA9IDY3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDcgOCA5IDEwIDExIDEyIiwiPHRlbXBsYXRlPlxyXG4gIDx2LW5hdmlnYXRpb24tZHJhd2VyXHJcbiAgICAgIHRlbXBvcmFyeVxyXG4gICAgICBoaWRlLW92ZXJsYXlcclxuICAgICAgaGVpZ2h0PVwiMTAwJVwiXHJcbiAgICAgIGVuYWJsZS1yZXNpemUtd2F0Y2hlclxyXG4gICAgICB2LW1vZGVsPVwiZHJhd2VyXCJcclxuICAgICAgY2xhc3M9XCJhY2NlbnRcIlxyXG4gICAgPlxyXG4gICAgICA8di1saXN0IGRlbnNlPlxyXG4gICAgICAgIDwhLS0gVi1Gb3IgTGlua3MgRnJvbSBNZW51IC0tPlxyXG4gICAgICAgIDx2LWxpbmsgOmRhcms9XCJkYXJrQ2xhc3NcIiB2LWZvcj1cImxpbmsgaW4gbGlua3NcIiA6a2V5PVwibGluay5pZFwiIDp0aXRsZT1cImxpbmsudGl0bGVcIiA6aHJlZj1cImxpbmsuaHJlZlwiIDppY29uPVwibGluay5hY3Rpb25cIj48L3YtbGluaz5cclxuICAgICAgICA8IS0tIEluZGl2aWR1YWwgTGluayAoQ3VzdG9tIEFkZGl0aW9uYWwpIC0tPlxyXG4gICAgICAgIDx2LWxpbmsgOmRhcms9XCJkYXJrQ2xhc3NcIiAgdGl0bGU9XCJDb21wYW55IFByb2ZpbGVcIiA6aHJlZj1cIicvYWJvdXQnXCIgICBpY29uPVwiZmEtYnVpbGRpbmdcIj48L3YtbGluaz5cclxuICAgICAgICA8di1saW5rIDpkYXJrPVwiZGFya0NsYXNzXCIgIHRpdGxlPVwiU3VwcG9ydFwiIDpocmVmPVwiJy9zdXBwb3J0J1wiICAgaWNvbj1cImZhLWxpZmUtcmluZ1wiPjwvdi1saW5rPlxyXG4gICAgICAgIDx2LWxpbmsgOmRhcms9XCJkYXJrQ2xhc3NcIiAgdGl0bGU9XCJQcm9kdWN0c1wiIDpocmVmPVwiJy9wcm9kdWN0cydcIiAgIGljb249XCJmYS1zaG9wcGluZy1iYXNrZXRcIj48L3YtbGluaz5cclxuICAgICAgICA8di1saW5rIDpkYXJrPVwiZGFya0NsYXNzXCIgIHRpdGxlPVwiQ2F0ZWdvcmllc1wiIDpocmVmPVwiJy9jYXRlZ29yaWVzJ1wiICAgaWNvbj1cImZhLXRhZ1wiPjwvdi1saW5rPlxyXG4gICAgICAgIDwhLS0gRXhwYW5kYWJsZSBHcm91cCBMaW5rcyBmcm9tIEdyb3VwIExpbmsgLS0+XHJcbiAgICAgICAgPGNhdGVnb3J5LWxpbmsgOmRhcms9XCJkYXJrQ2xhc3NcIiA6aXRlbXM9XCJncm91cGxpbmtzXCI+PC9jYXRlZ29yeS1saW5rPlxyXG4gICAgICAgIDx2LXN1YmhlYWRlciA6Y2xhc3M9XCJ7J2JsdWUtZ3JleS0tdGV4dCc6ICFpc0RhcmssICd0ZXh0LS1saWdodGVuLTEnOiAhaXNEYXJrLCAnd2hpdGUtLXRleHQnOiBpc0Rhcmt9XCI+TWVtYmVycyBBcmVhPC92LXN1YmhlYWRlcj5cclxuICAgICAgICA8IS0tIEFkbWluIE9ubHkgQWNjZXNzaWJsZSAtLT5cclxuICAgICAgICA8di1saW5rIHYtaWY9XCJnZXRBdXRoICYmIGdldE1lLmlzQWRtaW5cIiA6ZGFyaz1cImRhcmtDbGFzc1wiICB0aXRsZT1cIlVzZXIgTWFuYWdlbWVudFwiICA6aHJlZj1cIicvdXNlcnMnXCIgaWNvbj1cImZhLXVzZXJzXCI+PC92LWxpbms+XHJcbiAgICAgICAgPCEtLSBOb3JtYWwgVXNlciBMaW5rcyAtLT5cclxuICAgICAgICA8di1saW5rIHYtaWY9XCJnZXRBdXRoXCIgOmRhcms9XCJkYXJrQ2xhc3NcIiAgdGl0bGU9XCJEYXNoYm9hcmRcIiAgOmhyZWY9XCInL2Rhc2hib2FyZCdcIiBpY29uPVwiZGFzaGJvYXJkXCI+PC92LWxpbms+XHJcbiAgICAgICAgPHYtbGluayB2LWlmPVwiZ2V0QXV0aFwiIDpkYXJrPVwiZGFya0NsYXNzXCIgIHRpdGxlPVwiU2V0dGluZ3NcIiAgOmhyZWY9XCInL3NldHRpbmdzJ1wiIGljb249XCJmYS1jb2dzXCI+PC92LWxpbms+XHJcbiAgICAgICAgPHYtbGluayB2LWlmPVwiZ2V0QXV0aFwiIDpkYXJrPVwiZGFya0NsYXNzXCIgIHRpdGxlPVwiTG9nb3V0XCIgIDpocmVmPVwiJy9sb2dvdXQnXCIgaWNvbj1cInBvd2VyX3NldHRpbmdzX25ld1wiPjwvdi1saW5rPlxyXG4gICAgICAgIDwhLS0gR3Vlc3QgTGlua3MgLS0+XHJcbiAgICAgICAgPHYtbGluayB2LWlmPVwiIWdldEF1dGhcIiA6ZGFyaz1cImRhcmtDbGFzc1wiICB0aXRsZT1cIkxvZ2luXCIgIDpocmVmPVwiJy9sb2dpbidcIiBpY29uPVwiZmEta2V5XCI+PC92LWxpbms+XHJcbiAgICAgICAgPHYtbGluayB2LWlmPVwiIWdldEF1dGhcIiA6ZGFyaz1cImRhcmtDbGFzc1wiICB0aXRsZT1cIlJlZ2lzdGVyXCIgIDpocmVmPVwiJy9yZWdpc3RlcidcIiBpY29uPVwiZmEtdXNlci1wbHVzXCI+PC92LWxpbms+XHJcbiAgICAgIDwvdi1saXN0PlxyXG4gICAgPC92LW5hdmlnYXRpb24tZHJhd2VyPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IFZMaW5rIGZyb20gJy4uL2NvbXBvbmVudHMvVkxpbmsudnVlJ1xyXG5pbXBvcnQgQ2F0ZWdvcnlMaW5rIGZyb20gJy4uL2NvbXBvbmVudHMvQ2F0ZWdvcnlMaW5rLnZ1ZSdcclxuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcclxuaW1wb3J0IHsgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfSBmcm9tICd2dWV4J1xyXG5jb25zdCB7IG1hcEdldHRlcnMgfSA9IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzKCdhdXRoJylcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG1peGluczogW1RoZW1lXSxcclxuICAgIGRhdGE6ICgpID0+ICh7XHJcbiAgICAgICAgZHJhd2VyOiBmYWxzZSxcclxuICAgICAgICBsaW5rczogW10sIC8vIHNpdGUgbmF2aWdhdGlvbiBsaW5rc1xyXG4gICAgICAgIG1lbWJlcnM6IFtdLCAvLyBjaGFuZ2Ugd2l0aCBmZWF0dXJlZCBQcm9kdWN0c1xyXG4gICAgICAgIGdyb3VwbGlua3M6IFtdIC8vIHByb2R1Y3QgY2F0ZWdvcmllc1xyXG4gICAgfSksXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICAgIC4uLm1hcEdldHRlcnMoe1xyXG4gICAgICAgICAgICBnZXRBdXRoOiAnZ2V0QXV0aCcsXHJcbiAgICAgICAgICAgIGdldE1lOiAnZ2V0TWUnXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgICAgVkxpbmssXHJcbiAgICAgICAgQ2F0ZWdvcnlMaW5rXHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgICAgQnVzLiRvbigndG9nZ2xlRHJhd2VyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLmRyYXdlciA9ICFzZWxmLmRyYXdlclxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc2VsZi5mZXRjaENhdGVnb3JpZXMoKVxyXG4gICAgICAgIHNlbGYuZmV0Y2hOYXZMaW5rcygpXHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGZldGNoQ2F0ZWdvcmllcyAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBsaW5rcyA9IEFwcC5ncm91cGxpbmtzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmZXRjaE5hdkxpbmtzICgpIHtcclxuICAgICAgICAgICAgdGhpcy5saW5rcyA9IEFwcC5tZW51XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuPC9zY3JpcHQ+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBMZWZ0U2lkZUJhci52dWU/MTMwMTk1Y2YiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9DYXRlZ29yeUxpbmsudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi00ODY3MDI2MlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9DYXRlZ29yeUxpbmsudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXENhdGVnb3J5TGluay52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIENhdGVnb3J5TGluay52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNDg2NzAyNjJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi00ODY3MDI2MlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhdGVnb3J5TGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDcgOCA5IDEwIDExIDEyIiwiPHRlbXBsYXRlPlxuICAgIDx2LWxpc3Q+XG4gICAgICAgIDx2LWxpc3QtZ3JvdXAgdi1mb3I9XCJpdGVtIGluIGl0ZW1zXCIgdi1iaW5kOmtleT1cIml0ZW0udGl0bGVcIj5cbiAgICAgICAgPHYtbGlzdC10aWxlIHNsb3Q9XCJpdGVtXCI+XG4gICAgICAgICAgICA8di1saXN0LXRpbGUtYWN0aW9uIHYtaWY9XCIhaXRlbS5hdmF0YXJcIj5cbiAgICAgICAgICAgIDx2LWljb24+e3sgaXRlbS5hY3Rpb24gfX08L3YtaWNvbj5cbiAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtYWN0aW9uPlxuICAgICAgICAgICAgPHYtYXZhdGFyIHNpemU9XCIyNXB4XCIgdi1lbHNlPlxuICAgICAgICAgICAgICAgIDxpbWcgOnNyYz1cIml0ZW0uYXZhdGFyXCIgYWx0PVwiXCI+XG4gICAgICAgICAgICA8L3YtYXZhdGFyPlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLWNvbnRlbnQgdi1pZj1cIiFpc0RhcmtcIj5cbiAgICAgICAgICAgIDx2LWxpc3QtdGlsZS10aXRsZSA6Y2xhc3M9XCJ7J3ByaW1hcnktLXRleHQnOiBpdGVtLmFjdGl2ZSwnYmx1ZS1ncmV5LS10ZXh0JzogIWl0ZW0uYWN0aXZlLCAndGV4dC0tbGlnaHRlbi0xJzogIWl0ZW0uYWN0aXZlfVwiPnt7IGl0ZW0udGl0bGUgfX08L3YtbGlzdC10aWxlLXRpdGxlPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLWNvbnRlbnQgdi1lbHNlPlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLXRpdGxlIDpjbGFzcz1cInsncHJpbWFyeS0tdGV4dCc6IGl0ZW0uYWN0aXZlLCAndGV4dC0tbGlnaHRlbi0yJzogaXRlbS5hY3RpdmV9XCI+e3sgaXRlbS50aXRsZSB9fTwvdi1saXN0LXRpbGUtdGl0bGU+XG4gICAgICAgICAgICA8L3YtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgICA8di1saXN0LXRpbGUtYWN0aW9uPlxuICAgICAgICAgICAgPHYtaWNvbiA6Y2xhc3M9XCJ7J3ByaW1hcnktLXRleHQnOiAhaXNEYXJrLCAnd2hpdGUtLXRleHQnOiBpc0Rhcmt9XCI+a2V5Ym9hcmRfYXJyb3dfZG93bjwvdi1pY29uPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1hY3Rpb24+XG4gICAgICAgIDwvdi1saXN0LXRpbGU+XG4gICAgICAgIDwhLS0gU3ViIE1lbnUgTGlua3MgLS0+XG4gICAgICAgIDx2LWxpbmsgOmRhcms9XCJpc0RhcmtcIiB2LWZvcj1cInN1Ykl0ZW0gaW4gaXRlbS5pdGVtc1wiIDprZXk9XCJzdWJJdGVtLmlkXCIgOnRpdGxlPVwic3ViSXRlbS50aXRsZVwiIDphdmF0YXI9XCJzdWJJdGVtLmF2YXRhclwiIDppY29uPVwic3ViSXRlbS5hY3Rpb25cIiA6aHJlZj1cInN1Ykl0ZW0uaHJlZlwiPjwvdi1saW5rPlxuICAgICAgICA8L3YtbGlzdC1ncm91cD5cbiAgICA8L3YtbGlzdD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgVkxpbmsgZnJvbSAnLi4vY29tcG9uZW50cy9WTGluay52dWUnXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFsnaXRlbXMnXSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIFZMaW5rXG4gICAgfSxcbiAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICBkYXJrOiBBcHAudGhlbWUuZGFya1xuICAgIH0pLFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbG9hZHZpZXcgKGl0ZW0sIHN1Ykl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHsgcGF0aDogYCR7c3ViSXRlbS5ocmVmfWAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgaGFzQXZhdGFyIChzdWJJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ViSXRlbS5hdmF0YXIgIT09IHVuZGVmaW5lZFxuICAgICAgICB9LFxuICAgICAgICBsb2FkQXZhdGFyIChhdmF0YXIpIHtcbiAgICAgICAgICAgIHJldHVybiBhdmF0YXIgfHwgJ2h0dHBzOi8vYXZhdGFyczAuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvOTA2NDA2Nj92PTQmcz00NjAnXG4gICAgICAgIH0sXG4gICAgICAgIGlzR3JvdXBBY3RpdmUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGxldCBpdGVtc2VnbWVudCA9ICcnXG4gICAgICAgICAgICBsZXQgc2VnbWVudCA9ICcnXG4gICAgICAgICAgICBpZiAoaXRlbS5ocmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtc2VnbWVudCA9IGl0ZW0uaHJlZi5zcGxpdCgnLycpWzFdXG4gICAgICAgICAgICAgICAgc2VnbWVudCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzFdXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zZWdtZW50ID09PSBzZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzQWN0aXZlIChzdWJJdGVtKSB7XG4gICAgICAgICAgICBpZiAoc3ViSXRlbS5ocmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViSXRlbS5ocmVmID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViSXRlbS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViSXRlbS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgaXNEYXJrICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhcmsgPT09IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQ2F0ZWdvcnlMaW5rLnZ1ZT9mYTQ3YzE1MCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxpc3RcIixcbiAgICBfdm0uX2woX3ZtLml0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICByZXR1cm4gX2MoXG4gICAgICAgIFwidi1saXN0LWdyb3VwXCIsXG4gICAgICAgIHsga2V5OiBpdGVtLnRpdGxlIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1saXN0LXRpbGVcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgc2xvdDogXCJpdGVtXCIgfSwgc2xvdDogXCJpdGVtXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgIWl0ZW0uYXZhdGFyXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS1hY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoX3ZtLl9zKGl0ZW0uYWN0aW9uKSldKV0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF9jKFwidi1hdmF0YXJcIiwgeyBhdHRyczogeyBzaXplOiBcIjI1cHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwgeyBhdHRyczogeyBzcmM6IGl0ZW0uYXZhdGFyLCBhbHQ6IFwiXCIgfSB9KVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICFfdm0uaXNEYXJrXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1saXN0LXRpbGUtdGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByaW1hcnktLXRleHRcIjogaXRlbS5hY3RpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJibHVlLWdyZXktLXRleHRcIjogIWl0ZW0uYWN0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC0tbGlnaHRlbi0xXCI6ICFpdGVtLmFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoaXRlbS50aXRsZSkpXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1saXN0LXRpbGUtY29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtbGlzdC10aWxlLXRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmltYXJ5LS10ZXh0XCI6IGl0ZW0uYWN0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC0tbGlnaHRlbi0yXCI6IGl0ZW0uYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhpdGVtLnRpdGxlKSldXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGlzdC10aWxlLWFjdGlvblwiLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpbWFyeS0tdGV4dFwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2hpdGUtLXRleHRcIjogX3ZtLmlzRGFya1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW192bS5fdihcImtleWJvYXJkX2Fycm93X2Rvd25cIildXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5fbChpdGVtLml0ZW1zLCBmdW5jdGlvbihzdWJJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gX2MoXCJ2LWxpbmtcIiwge1xuICAgICAgICAgICAgICBrZXk6IHN1Ykl0ZW0uaWQsXG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgZGFyazogX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICB0aXRsZTogc3ViSXRlbS50aXRsZSxcbiAgICAgICAgICAgICAgICBhdmF0YXI6IHN1Ykl0ZW0uYXZhdGFyLFxuICAgICAgICAgICAgICAgIGljb246IHN1Ykl0ZW0uYWN0aW9uLFxuICAgICAgICAgICAgICAgIGhyZWY6IHN1Ykl0ZW0uaHJlZlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDJcbiAgICAgIClcbiAgICB9KVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi00ODY3MDI2MlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNDg2NzAyNjJcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvQ2F0ZWdvcnlMaW5rLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1uYXZpZ2F0aW9uLWRyYXdlclwiLFxuICAgIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcImFjY2VudFwiLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgdGVtcG9yYXJ5OiBcIlwiLFxuICAgICAgICBcImhpZGUtb3ZlcmxheVwiOiBcIlwiLFxuICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICBcImVuYWJsZS1yZXNpemUtd2F0Y2hlclwiOiBcIlwiXG4gICAgICB9LFxuICAgICAgbW9kZWw6IHtcbiAgICAgICAgdmFsdWU6IF92bS5kcmF3ZXIsXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICBfdm0uZHJhd2VyID0gJCR2XG4gICAgICAgIH0sXG4gICAgICAgIGV4cHJlc3Npb246IFwiZHJhd2VyXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGlzdFwiLFxuICAgICAgICB7IGF0dHJzOiB7IGRlbnNlOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF92bS5fbChfdm0ubGlua3MsIGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgICAgICAgIHJldHVybiBfYyhcInYtbGlua1wiLCB7XG4gICAgICAgICAgICAgIGtleTogbGluay5pZCxcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBkYXJrOiBfdm0uZGFya0NsYXNzLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBsaW5rLnRpdGxlLFxuICAgICAgICAgICAgICAgIGhyZWY6IGxpbmsuaHJlZixcbiAgICAgICAgICAgICAgICBpY29uOiBsaW5rLmFjdGlvblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ2LWxpbmtcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgdGl0bGU6IFwiQ29tcGFueSBQcm9maWxlXCIsXG4gICAgICAgICAgICAgIGhyZWY6IFwiL2Fib3V0XCIsXG4gICAgICAgICAgICAgIGljb246IFwiZmEtYnVpbGRpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ2LWxpbmtcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgdGl0bGU6IFwiU3VwcG9ydFwiLFxuICAgICAgICAgICAgICBocmVmOiBcIi9zdXBwb3J0XCIsXG4gICAgICAgICAgICAgIGljb246IFwiZmEtbGlmZS1yaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIGRhcms6IF92bS5kYXJrQ2xhc3MsXG4gICAgICAgICAgICAgIHRpdGxlOiBcIlByb2R1Y3RzXCIsXG4gICAgICAgICAgICAgIGhyZWY6IFwiL3Byb2R1Y3RzXCIsXG4gICAgICAgICAgICAgIGljb246IFwiZmEtc2hvcHBpbmctYmFza2V0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIGRhcms6IF92bS5kYXJrQ2xhc3MsXG4gICAgICAgICAgICAgIHRpdGxlOiBcIkNhdGVnb3JpZXNcIixcbiAgICAgICAgICAgICAgaHJlZjogXCIvY2F0ZWdvcmllc1wiLFxuICAgICAgICAgICAgICBpY29uOiBcImZhLXRhZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImNhdGVnb3J5LWxpbmtcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgZGFyazogX3ZtLmRhcmtDbGFzcywgaXRlbXM6IF92bS5ncm91cGxpbmtzIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LXN1YmhlYWRlclwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgIFwiYmx1ZS1ncmV5LS10ZXh0XCI6ICFfdm0uaXNEYXJrLFxuICAgICAgICAgICAgICAgIFwidGV4dC0tbGlnaHRlbi0xXCI6ICFfdm0uaXNEYXJrLFxuICAgICAgICAgICAgICAgIFwid2hpdGUtLXRleHRcIjogX3ZtLmlzRGFya1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihcIk1lbWJlcnMgQXJlYVwiKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLmdldEF1dGggJiYgX3ZtLmdldE1lLmlzQWRtaW5cbiAgICAgICAgICAgID8gX2MoXCJ2LWxpbmtcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBkYXJrOiBfdm0uZGFya0NsYXNzLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVXNlciBNYW5hZ2VtZW50XCIsXG4gICAgICAgICAgICAgICAgICBocmVmOiBcIi91c2Vyc1wiLFxuICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS11c2Vyc1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5nZXRBdXRoXG4gICAgICAgICAgICA/IF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRhc2hib2FyZFwiLFxuICAgICAgICAgICAgICAgICAgaHJlZjogXCIvZGFzaGJvYXJkXCIsXG4gICAgICAgICAgICAgICAgICBpY29uOiBcImRhc2hib2FyZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5nZXRBdXRoXG4gICAgICAgICAgICA/IF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNldHRpbmdzXCIsXG4gICAgICAgICAgICAgICAgICBocmVmOiBcIi9zZXR0aW5nc1wiLFxuICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jb2dzXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLmdldEF1dGhcbiAgICAgICAgICAgID8gX2MoXCJ2LWxpbmtcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBkYXJrOiBfdm0uZGFya0NsYXNzLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTG9nb3V0XCIsXG4gICAgICAgICAgICAgICAgICBocmVmOiBcIi9sb2dvdXRcIixcbiAgICAgICAgICAgICAgICAgIGljb246IFwicG93ZXJfc2V0dGluZ3NfbmV3XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgIV92bS5nZXRBdXRoXG4gICAgICAgICAgICA/IF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxvZ2luXCIsXG4gICAgICAgICAgICAgICAgICBocmVmOiBcIi9sb2dpblwiLFxuICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1rZXlcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAhX3ZtLmdldEF1dGhcbiAgICAgICAgICAgID8gX2MoXCJ2LWxpbmtcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBkYXJrOiBfdm0uZGFya0NsYXNzLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUmVnaXN0ZXJcIixcbiAgICAgICAgICAgICAgICAgIGhyZWY6IFwiL3JlZ2lzdGVyXCIsXG4gICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXVzZXItcGx1c1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdLFxuICAgICAgICAyXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTRlMTI3NzE3XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi00ZTEyNzcxN1wiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2Nzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNiA3IDggOSAxMCAxMSAxMiIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0ZhYkJ1dHRvbi52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTA2NTk4MjgyXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0ZhYkJ1dHRvbi52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGNvbXBvbmVudHNcXFxcRmFiQnV0dG9uLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gRmFiQnV0dG9uLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0wNjU5ODI4MlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTA2NTk4MjgyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvRmFiQnV0dG9uLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCI8dGVtcGxhdGU+XG4gIDx2LXNwZWVkLWRpYWxcbiAgICAgIHYtbW9kZWw9XCJmYWJcIlxuICAgICAgOnRvcD1cInRvcFwiXG4gICAgICA6Ym90dG9tPVwiYm90dG9tXCJcbiAgICAgIDpyaWdodD1cInJpZ2h0XCJcbiAgICAgIDpsZWZ0PVwibGVmdFwiXG4gICAgICA6ZGlyZWN0aW9uPVwiZGlyZWN0aW9uXCJcbiAgICAgIDpob3Zlcj1cImhvdmVyXCJcbiAgICAgIDp0cmFuc2l0aW9uPVwidHJhbnNpdGlvblwiXG4gICAgICA6YWJzb2x1dGU9XCJhYnNvbHV0ZVwiXG4gICAgICA6Zml4ZWQ9XCJmaXhlZFwiXG4gICAgPlxuICAgICAgPHYtYnRuXG4gICAgICAgIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICA6Y2xhc3M9XCJbYWN0aXZlRmFiLmNsYXNzXVwiXG4gICAgICAgIGRhcmtcbiAgICAgICAgZmFiXG4gICAgICAgIGhvdmVyXG4gICAgICAgIHYtbW9kZWw9XCJmYWJcIlxuICAgICAgPlxuICAgICAgICA8di1pY29uIGNsYXNzPVwid2hpdGUtLXRleHRcIj57eyBhY3RpdmVGYWIuaWNvbiB9fTwvdi1pY29uPlxuICAgICAgICA8di1pY29uIGNsYXNzPVwiZXJyb3ItLXRleHRcIj5jbG9zZTwvdi1pY29uPlxuICAgICAgPC92LWJ0bj5cbiAgICAgIDx2LWJ0blxuICAgICAgICB2LWZvcj1cImJ1dHRvbiBpbiBidXR0b25zXCIgOmtleT1cImJ1dHRvbi5uYW1lXCJcbiAgICAgICAgdi1pZj1cImlzVmlzaWJsZShidXR0b24pXCJcbiAgICAgICAgZmFiXG4gICAgICAgIGRhcmtcbiAgICAgICAgc21hbGxcbiAgICAgICAgOmNsYXNzPVwiW2J1dHRvbi5jbGFzc11cIlxuICAgICAgICBAY2xpY2submF0aXZlPVwibmF2aWdhdGUoYnV0dG9uKVwiXG4gICAgICA+XG4gICAgICAgIDx2LWljb24+e3sgYnV0dG9uLmljb24gfX08L3YtaWNvbj5cbiAgICAgIDwvdi1idG4+XG4gICAgPC92LXNwZWVkLWRpYWw+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfSBmcm9tICd2dWV4J1xuY29uc3QgeyBtYXBHZXR0ZXJzIH0gPSBjcmVhdGVOYW1lc3BhY2VkSGVscGVycygnYXV0aCcpXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZGlyZWN0aW9uOiAndG9wJyxcbiAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgIGZhYjogZmFsc2UsXG4gICAgICAgIGhvdmVyOiBmYWxzZSxcbiAgICAgICAgdG9wOiBmYWxzZSxcbiAgICAgICAgcmlnaHQ6IHRydWUsXG4gICAgICAgIGJvdHRvbTogdHJ1ZSxcbiAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgIGFic29sdXRlOiBmYWxzZSxcbiAgICAgICAgdHJhbnNpdGlvbjogJ3NsaWRlLXktcmV2ZXJzZS10cmFuc2l0aW9uJyxcbiAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgeyBuYW1lOiAnaG9tZScsIGhyZWY6ICcvJywgY2xhc3M6ICdpbmRpZ28gbGlnaHRlbi0yJywgaWNvbjogJ2ZhLWhvbWUnLCByZXF1aXJlc0F1dGg6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkYXNoYm9hcmQnLCBocmVmOiAnL2Rhc2hib2FyZCcsIGNsYXNzOiAnYW1iZXIgbGlnaHRlbi0yJywgaWNvbjogJ2ZhLXNob3BwaW5nLWJhZycsIHJlcXVpcmVzQXV0aDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvZ2luJywgaHJlZjogJy9sb2dpbicsIGNsYXNzOiAnc3VjY2VzcycsIGljb246ICdmYS1rZXknLCByZXF1aXJlc0F1dGg6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdyZWdpc3RlcicsIGhyZWY6ICcvcmVnaXN0ZXInLCBjbGFzczogJ2luZm8nLCBpY29uOiAnZmEtdXNlci1wbHVzJywgcmVxdWlyZXNBdXRoOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbG9nb3V0JywgaHJlZjogJy9sb2dvdXQnLCBjbGFzczogJ3JlZCBsaWdodGVuLTInLCBpY29uOiAnZmEtcG93ZXItb2ZmJywgcmVxdWlyZXNBdXRoOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdzY3JvbGwtdXAnLCBocmVmOiBudWxsLCBjbGFzczogJ2JsdWUtZ3JleScsIGljb246ICdmbGlnaHRfdGFrZW9mZicsIHJlcXVpcmVzQXV0aDogZmFsc2UgfVxuICAgICAgICBdLFxuICAgICAgICBhY3RpdmVGYWI6IHtcbiAgICAgICAgICAgICdjbGFzcyc6ICdwcmltYXJ5JywgaWNvbjogJ2ZhLXJvY2tldCdcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcEdldHRlcnMoe1xuICAgICAgICAgICAgZ2V0QXV0aDogJ2dldEF1dGgnXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgICB0b3AgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5ib3R0b20gPSAhdmFsXG4gICAgICAgIH0sXG4gICAgICAgIHJpZ2h0ICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdCA9ICF2YWxcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMudG9wID0gIXZhbFxuICAgICAgICB9LFxuICAgICAgICBsZWZ0ICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMucmlnaHQgPSAhdmFsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbmF2aWdhdGUgKGJ1dHRvbikge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLmFjdGl2ZUZhYiA9IHsgY2xhc3M6IGJ1dHRvbi5jbGFzcywgaWNvbjogYnV0dG9uLmljb24gfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmFjdGl2ZUZhYiA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogJ3ByaW1hcnknLCBpY29uOiAnZmEtcm9ja2V0J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmhyZWYgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kcm91dGVyLnB1c2goeyBwYXRoOiBgJHtidXR0b24uaHJlZn1gIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxUb1RvcCgzMDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKVxuICAgICAgICB9LFxuICAgICAgICBzY3JvbGxUb1RvcCAoc2Nyb2xsRHVyYXRpb24pIHtcbiAgICAgICAgICAgIHZhciBjb3NQYXJhbWV0ZXIgPSB3aW5kb3cuc2Nyb2xsWSAvIDJcbiAgICAgICAgICAgIHZhciBzY3JvbGxDb3VudCA9IDBcbiAgICAgICAgICAgIHZhciBvbGRUaW1lc3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzdGVwIChuZXdUaW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxDb3VudCArPSBNYXRoLlBJIC8gKHNjcm9sbER1cmF0aW9uIC8gKG5ld1RpbWVzdGFtcCAtIG9sZFRpbWVzdGFtcCkpXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbENvdW50ID49IE1hdGguUEkpIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA9PT0gMCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIE1hdGgucm91bmQoY29zUGFyYW1ldGVyICsgY29zUGFyYW1ldGVyICogTWF0aC5jb3Moc2Nyb2xsQ291bnQpKSlcbiAgICAgICAgICAgICAgICBvbGRUaW1lc3RhbXAgPSBuZXdUaW1lc3RhbXBcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcClcbiAgICAgICAgfSxcbiAgICAgICAgaXNWaXNpYmxlIChidXR0b24pIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5yZXF1aXJlc0F1dGggPT09IGZhbHNlICYmIGJ1dHRvbi5uYW1lID09PSAnbG9naW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzZWxmLmdldEF1dGhcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYnV0dG9uLnJlcXVpcmVzQXV0aCA9PT0gZmFsc2UgJiYgYnV0dG9uLm5hbWUgPT09ICdyZWdpc3RlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXNlbGYuZ2V0QXV0aFxuICAgICAgICAgICAgfSBlbHNlIGlmIChidXR0b24ucmVxdWlyZXNBdXRoID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuZ2V0QXV0aFxuICAgICAgICAgICAgfSBlbHNlIGlmIChidXR0b24ucmVxdWlyZXNBdXRoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBGYWJCdXR0b24udnVlPzRlY2VmNzIyIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtc3BlZWQtZGlhbFwiLFxuICAgIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHRvcDogX3ZtLnRvcCxcbiAgICAgICAgYm90dG9tOiBfdm0uYm90dG9tLFxuICAgICAgICByaWdodDogX3ZtLnJpZ2h0LFxuICAgICAgICBsZWZ0OiBfdm0ubGVmdCxcbiAgICAgICAgZGlyZWN0aW9uOiBfdm0uZGlyZWN0aW9uLFxuICAgICAgICBob3ZlcjogX3ZtLmhvdmVyLFxuICAgICAgICB0cmFuc2l0aW9uOiBfdm0udHJhbnNpdGlvbixcbiAgICAgICAgYWJzb2x1dGU6IF92bS5hYnNvbHV0ZSxcbiAgICAgICAgZml4ZWQ6IF92bS5maXhlZFxuICAgICAgfSxcbiAgICAgIG1vZGVsOiB7XG4gICAgICAgIHZhbHVlOiBfdm0uZmFiLFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgX3ZtLmZhYiA9ICQkdlxuICAgICAgICB9LFxuICAgICAgICBleHByZXNzaW9uOiBcImZhYlwiXG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3M6IFtfdm0uYWN0aXZlRmFiLmNsYXNzXSxcbiAgICAgICAgICBhdHRyczogeyBzbG90OiBcImFjdGl2YXRvclwiLCBkYXJrOiBcIlwiLCBmYWI6IFwiXCIsIGhvdmVyOiBcIlwiIH0sXG4gICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIixcbiAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgdmFsdWU6IF92bS5mYWIsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgIF92bS5mYWIgPSAkJHZcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleHByZXNzaW9uOiBcImZhYlwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBzdGF0aWNDbGFzczogXCJ3aGl0ZS0tdGV4dFwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmFjdGl2ZUZhYi5pY29uKSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgc3RhdGljQ2xhc3M6IFwiZXJyb3ItLXRleHRcIiB9LCBbX3ZtLl92KFwiY2xvc2VcIildKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5fbChfdm0uYnV0dG9ucywgZnVuY3Rpb24oYnV0dG9uKSB7XG4gICAgICAgIHJldHVybiBfdm0uaXNWaXNpYmxlKGJ1dHRvbilcbiAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IGJ1dHRvbi5uYW1lLFxuICAgICAgICAgICAgICAgIGNsYXNzOiBbYnV0dG9uLmNsYXNzXSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBmYWI6IFwiXCIsIGRhcms6IFwiXCIsIHNtYWxsOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLm5hdmlnYXRlKGJ1dHRvbilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KF92bS5fcyhidXR0b24uaWNvbikpXSldLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgfSlcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtMDY1OTgyODJcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTA2NTk4MjgyXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0ZhYkJ1dHRvbi52dWVcbi8vIG1vZHVsZSBpZCA9IDY4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDcgOCA5IDEwIDExIDEyIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQ29va2llTGF3LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzM2MzE0ODBcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQ29va2llTGF3LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFydGlhbHNcXFxcQ29va2llTGF3LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gQ29va2llTGF3LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi03MzYzMTQ4MFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTczNjMxNDgwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0Nvb2tpZUxhdy52dWVcbi8vIG1vZHVsZSBpZCA9IDY4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDcgOCA5IDEwIDExIDEyIiwiPHRlbXBsYXRlPlxuPGNvb2tpZS1sYXcgdGhlbWU9XCJkYXJrLWxpbWVcIiBidXR0b25UZXh0PVwiWWVzLCBJIFVuZGVyc3RhbmQgVGhpcyBTaXRlIFVzZXMgQ29va2llLlwiPlxuICAgICAgICA8ZGl2IHNsb3Q9XCJtZXNzYWdlXCI+XG4gICAgICAgICAgICA8cD5UaGlzIHdlYnNpdGUgdXNlcyBjb29raWVzIHRvIGVuc3VyZSB5b3UgZ2V0IHRoZSBiZXN0IGV4cGVyaWVuY2Ugb24gb3VyIHdlYnNpdGUuXG4gICAgICAgICAgICAgICAgPHNwYW4+UmVhZCBPdXIgQ29va2llIFRlcm1zIGFuZCBVc2FnZSBGb3IgTW9yZSBJbmZvOjwvc3Bhbj4gPHJvdXRlci1saW5rIHRvPVwiL2Nvb2tpZS1sYXctYWdyZWVtZW50XCI+Q2xpY2sgaGVyZTwvcm91dGVyLWxpbms+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuPC9jb29raWUtbGF3PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBDb29raWVMYXcgZnJvbSAndnVlLWNvb2tpZS1sYXcnXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY29tcG9uZW50czogeyBDb29raWVMYXcgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQ29va2llTGF3LnZ1ZT84ZTI3OGQ0MiIsIi8qIVxuICogdnVlLWNvb2tpZS1sYXcgdjEuMy4wXG4gKiAoYykgMjAxNyBKYWt1YiBKdXN6Y3phayA8amFrdWJAcG9zdGVvLmRlPlxuICogXG4gKi9cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQ29va2llTGF3XCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkNvb2tpZUxhd1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJDb29raWVMYXdcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG59XG52YXIgQ29tcG9uZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KShcbiAgLyogc2NyaXB0ICovXG4gIF9fd2VicGFja19yZXF1aXJlX18oNyksXG4gIC8qIHRlbXBsYXRlICovXG4gIF9fd2VicGFja19yZXF1aXJlX18oOCksXG4gIC8qIHN0eWxlcyAqL1xuICBpbmplY3RTdHlsZSxcbiAgLyogc2NvcGVJZCAqL1xuICBudWxsLFxuICAvKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbiAgbnVsbFxuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCIvVXNlcnMvamp1c3pjemFrL1Byb2pla3RlL1ByaXZhdC92dWUtY29va2llLWxhdy9zcmMvY29tcG9uZW50cy9Db29raWVMYXcudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBDb29raWVMYXcudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKGZhbHNlKSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi04NjNmZDk3ZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTg2M2ZkOTdlXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmksIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpKFwiOTFjMDUzMTJcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYoZmFsc2UpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3tcXFwibWluaW1pemVcXFwiOmZhbHNlLFxcXCJzb3VyY2VNYXBcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTg2M2ZkOTdlXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/e1xcXCJzb3VyY2VNYXBcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Nvb2tpZUxhdy52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/e1xcXCJtaW5pbWl6ZVxcXCI6ZmFsc2UsXFxcInNvdXJjZU1hcFxcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtODYzZmQ5N2VcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz97XFxcInNvdXJjZU1hcFxcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ29va2llTGF3LnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cbi8qKiovIH0pLFxuLyogMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmksIFwiXFxuLkNvb2tpZSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgei1pbmRleDogOTk5OTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBiYXNlbGluZTtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogYmFzZWxpbmU7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLkNvb2tpZSA+ICoge1xcbiAgICBtYXJnaW46IDAuOTM3NXJlbSAwO1xcbiAgICAtbXMtZmxleC1pdGVtLWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQ4cmVtKSB7XFxuLkNvb2tpZSB7XFxuICAgICAgLXdlYmtpdC1ib3gtb3JpZW50OiBob3Jpem9udGFsO1xcbiAgICAgIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgICAgICAtbXMtZmxleC1mbG93OiByb3c7XFxuICAgICAgICAgICAgICBmbGV4LWZsb3c6IHJvdztcXG59XFxuLkNvb2tpZSA+ICoge1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbn1cXG59XFxuLkNvb2tpZS0tdG9wIHtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG59XFxuLkNvb2tpZS0tYm90dG9tIHtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG59XFxuLkNvb2tpZV9fYnV0dG9ucyB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLkNvb2tpZV9fYnV0dG9ucyA+ICoge1xcbiAgICBtYXJnaW46IDAuMzEyNXJlbSAwO1xcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0OHJlbSkge1xcbi5Db29raWVfX2J1dHRvbnMge1xcbiAgICAgIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gICAgICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbn1cXG4uQ29va2llX19idXR0b25zID4gKiB7XFxuICAgICAgICBtYXJnaW46IDAgMC45Mzc1cmVtO1xcbn1cXG59XFxuLkNvb2tpZV9fYnV0dG9uIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIC1tcy1mbGV4LWl0ZW0tYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcbi5Db29raWUtLWJhc2Uge1xcbiAgYmFja2dyb3VuZDogI0YxRjFGMTtcXG4gIGNvbG9yOiAjMjMyMzIzO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tYmFzZSAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjOTdEMDU4O1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uQ29va2llLS1iYXNlIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzdlYmYzNjtcXG59XFxuLkNvb2tpZS0tYmFzZS0tcm91bmRlZCB7XFxuICBiYWNrZ3JvdW5kOiAjRjFGMUYxO1xcbiAgY29sb3I6ICMyMzIzMjM7XFxuICBwYWRkaW5nOiAxLjI1MGVtO1xcbn1cXG4uQ29va2llLS1iYXNlLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICM5N0QwNTg7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxufVxcbi5Db29raWUtLWJhc2UtLXJvdW5kZWQgLkNvb2tpZV9fYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjN2ViZjM2O1xcbn1cXG4uQ29va2llLS1ibG9vZC1vcmFuZ2Uge1xcbiAgYmFja2dyb3VuZDogIzQyNDg1MTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tYmxvb2Qtb3JhbmdlIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICNFNzZBNjg7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDA7XFxufVxcbi5Db29raWUtLWJsb29kLW9yYW5nZSAuQ29va2llX19idXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNlMDNmM2M7XFxufVxcbi5Db29raWUtLWJsb29kLW9yYW5nZS0tcm91bmRlZCB7XFxuICBiYWNrZ3JvdW5kOiAjNDI0ODUxO1xcbiAgY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAxLjI1MGVtO1xcbn1cXG4uQ29va2llLS1ibG9vZC1vcmFuZ2UtLXJvdW5kZWQgLkNvb2tpZV9fYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZDogI0U3NkE2ODtcXG4gICAgcGFkZGluZzogMC42MjVlbSAzLjEyNWVtO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG59XFxuLkNvb2tpZS0tYmxvb2Qtb3JhbmdlLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogI2UwM2YzYztcXG59XFxuLkNvb2tpZS0tZGFyay1saW1lIHtcXG4gIGJhY2tncm91bmQ6ICM0MjQ4NTE7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLWRhcmstbGltZSAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjOTdEMDU4O1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uQ29va2llLS1kYXJrLWxpbWUgLkNvb2tpZV9fYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjN2ViZjM2O1xcbn1cXG4uQ29va2llLS1kYXJrLWxpbWUtLXJvdW5kZWQge1xcbiAgYmFja2dyb3VuZDogIzQyNDg1MTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tZGFyay1saW1lLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICM5N0QwNTg7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxufVxcbi5Db29raWUtLWRhcmstbGltZS0tcm91bmRlZCAuQ29va2llX19idXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICM3ZWJmMzY7XFxufVxcbi5Db29raWUtLXJveWFsIHtcXG4gIGJhY2tncm91bmQ6ICNGQkMyMjc7XFxuICBjb2xvcjogIzIzMjMyMztcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLXJveWFsIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICM3MjZDRUE7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDA7XFxufVxcbi5Db29raWUtLXJveWFsIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzQ3M2ZlNDtcXG59XFxuLkNvb2tpZS0tcm95YWwtLXJvdW5kZWQge1xcbiAgYmFja2dyb3VuZDogI0ZCQzIyNztcXG4gIGNvbG9yOiAjMjMyMzIzO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tcm95YWwtLXJvdW5kZWQgLkNvb2tpZV9fYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZDogIzcyNkNFQTtcXG4gICAgcGFkZGluZzogMC42MjVlbSAzLjEyNWVtO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG59XFxuLkNvb2tpZS0tcm95YWwtLXJvdW5kZWQgLkNvb2tpZV9fYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjNDczZmU0O1xcbn1cXG4uc2xpZGVGcm9tVG9wLWVudGVyLCAuc2xpZGVGcm9tVG9wLWxlYXZlLXRvIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAtMTIuNWVtKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAtMTIuNWVtKTtcXG59XFxuLnNsaWRlRnJvbVRvcC1lbnRlci10bywgLnNsaWRlRnJvbVRvcC1sZWF2ZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAwcHgpO1xcbn1cXG4uc2xpZGVGcm9tQm90dG9tLWVudGVyLCAuc2xpZGVGcm9tQm90dG9tLWxlYXZlLXRvIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAxMi41ZW0pO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDEyLjVlbSk7XFxufVxcbi5zbGlkZUZyb21Cb3R0b20tZW50ZXItdG8sIC5zbGlkZUZyb21Cb3R0b20tbGVhdmUge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG59XFxuLnNsaWRlRnJvbUJvdHRvbS1lbnRlci1hY3RpdmUsXFxuLnNsaWRlRnJvbUJvdHRvbS1sZWF2ZS1hY3RpdmUsXFxuLnNsaWRlRnJvbVRvcC1lbnRlci1hY3RpdmUsXFxuLnNsaWRlRnJvbVRvcC1sZWF2ZS1hY3RpdmUge1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAuNHMgZWFzZS1pbjtcXG4gIHRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIC40cyBlYXNlLWluO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC40cyBlYXNlLWluO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC40cyBlYXNlLWluLCAtd2Via2l0LXRyYW5zZm9ybSAuNHMgZWFzZS1pbjtcXG59XFxuLmZhZGUtZW50ZXItYWN0aXZlLCAuZmFkZS1sZWF2ZS1hY3RpdmUge1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IC41cztcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjVzO1xcbn1cXG4uZmFkZS1lbnRlciwgLmZhZGUtbGVhdmUtdG8ge1xcbiAgb3BhY2l0eTogMDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cbi8qKiovIH0pLFxuLyogNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGxpc3QgZm9ybWF0IHByb2R1Y2VkIGJ5IGNzcy1sb2FkZXIgaW50byBzb21ldGhpbmdcbiAqIGVhc2llciB0byBtYW5pcHVsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGlkOiBwYXJlbnRJZCArICc6JyArIGksXG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzXG59XG5cblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyB0aGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG4vKioqLyB9KSxcbi8qIDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgcHJvcHM6IHtcbiAgICBidXR0b25UZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnR290IGl0ISdcbiAgICB9LFxuICAgIGJ1dHRvbkxpbms6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgYnV0dG9uTGlua1RleHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdNb3JlIGluZm8nXG4gICAgfSxcbiAgICBtZXNzYWdlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnVGhpcyB3ZWJzaXRlIHVzZXMgY29va2llcyB0byBlbnN1cmUgeW91IGdldCB0aGUgYmVzdCBleHBlcmllbmNlIG9uIG91ciB3ZWJzaXRlLidcbiAgICB9LFxuICAgIHRoZW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYmFzZSdcbiAgICB9LFxuXG4gICAgcG9zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdib3R0b20nXG4gICAgfSxcblxuICAgIHRyYW5zaXRpb25OYW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnc2xpZGVGcm9tQm90dG9tJ1xuICAgIH0sXG4gICAgYnV0dG9uQ2xhc3M6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdDb29raWVfX2J1dHRvbidcbiAgICB9XG4gIH0sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzT3BlbjogZmFsc2VcbiAgICB9O1xuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY29udGFpbmVyUG9zaXRpb246IGZ1bmN0aW9uIGNvbnRhaW5lclBvc2l0aW9uKCkge1xuICAgICAgcmV0dXJuICdDb29raWUtLScgKyB0aGlzLnBvc2l0aW9uO1xuICAgIH0sXG4gICAgY29va2llVGhlbWU6IGZ1bmN0aW9uIGNvb2tpZVRoZW1lKCkge1xuICAgICAgcmV0dXJuICdDb29raWUtLScgKyB0aGlzLnRoZW1lO1xuICAgIH1cbiAgfSxcbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCgpIHtcbiAgICBpZiAoIXRoaXMuZ2V0VmlzaXRlZCgpID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBzZXRWaXNpdGVkOiBmdW5jdGlvbiBzZXRWaXNpdGVkKCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Nvb2tpZTphY2NlcHRlZCcsIHRydWUpO1xuICAgIH0sXG4gICAgZ2V0VmlzaXRlZDogZnVuY3Rpb24gZ2V0VmlzaXRlZCgpIHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29va2llOmFjY2VwdGVkJyk7XG4gICAgfSxcbiAgICBhY2NlcHQ6IGZ1bmN0aW9uIGFjY2VwdCgpIHtcbiAgICAgIHRoaXMuc2V0VmlzaXRlZCgpO1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKiovIH0pLFxuLyogOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ3RyYW5zaXRpb24nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwiYXBwZWFyXCI6IFwiXCIsXG4gICAgICBcIm5hbWVcIjogX3ZtLnRyYW5zaXRpb25OYW1lXG4gICAgfVxuICB9LCBbKF92bS5pc09wZW4pID8gX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJDb29raWVcIixcbiAgICBjbGFzczogW192bS5jb250YWluZXJQb3NpdGlvbiwgX3ZtLmNvb2tpZVRoZW1lXVxuICB9LCBbX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJDb29raWVfX2NvbnRlbnRcIlxuICB9LCBbX3ZtLl90KFwibWVzc2FnZVwiLCBbX3ZtLl92KF92bS5fcyhfdm0ubWVzc2FnZSkpXSldLCAyKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJDb29raWVfX2J1dHRvbnNcIlxuICB9LCBbKF92bS5idXR0b25MaW5rKSA/IF9jKCdhJywge1xuICAgIGNsYXNzOiBfdm0uYnV0dG9uQ2xhc3MsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwiaHJlZlwiOiBfdm0uYnV0dG9uTGlua1xuICAgIH1cbiAgfSwgW192bS5fdihfdm0uX3MoX3ZtLmJ1dHRvbkxpbmtUZXh0KSldKSA6IF92bS5fZSgpLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgIGNsYXNzOiBfdm0uYnV0dG9uQ2xhc3MsXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogX3ZtLmFjY2VwdFxuICAgIH1cbiAgfSwgW192bS5fdihfdm0uX3MoX3ZtLmJ1dHRvblRleHQpKV0pXSldKSA6IF92bS5fZSgpXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKGZhbHNlKSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTg2M2ZkOTdlXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1jb29raWUtbGF3L2Rpc3QvdnVlLWNvb2tpZS1sYXcuanNcbi8vIG1vZHVsZSBpZCA9IDY4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDcgOCA5IDEwIDExIDEyIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImNvb2tpZS1sYXdcIixcbiAgICB7XG4gICAgICBhdHRyczoge1xuICAgICAgICB0aGVtZTogXCJkYXJrLWxpbWVcIixcbiAgICAgICAgYnV0dG9uVGV4dDogXCJZZXMsIEkgVW5kZXJzdGFuZCBUaGlzIFNpdGUgVXNlcyBDb29raWUuXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgYXR0cnM6IHsgc2xvdDogXCJtZXNzYWdlXCIgfSwgc2xvdDogXCJtZXNzYWdlXCIgfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcInBcIixcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgIFwiVGhpcyB3ZWJzaXRlIHVzZXMgY29va2llcyB0byBlbnN1cmUgeW91IGdldCB0aGUgYmVzdCBleHBlcmllbmNlIG9uIG91ciB3ZWJzaXRlLlxcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgIF92bS5fdihcIlJlYWQgT3VyIENvb2tpZSBUZXJtcyBhbmQgVXNhZ2UgRm9yIE1vcmUgSW5mbzpcIilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwicm91dGVyLWxpbmtcIiwgeyBhdHRyczogeyB0bzogXCIvY29va2llLWxhdy1hZ3JlZW1lbnRcIiB9IH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFwiQ2xpY2sgaGVyZVwiKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTczNjMxNDgwXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi03MzYzMTQ4MFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQ29va2llTGF3LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgNyA4IDkgMTAgMTEgMTIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1hcHBcIixcbiAgICB7IGF0dHJzOiB7IGRhcms6IF92bS5BcHAudGhlbWUuZGFyaywgc3RhbmRhbG9uZTogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXCJsZWZ0LXNpZGUtYmFyXCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYXBwLW5hdi1iYXJcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwibWFpblwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInBhLTAgbWEtMFwiLFxuICAgICAgICAgICAgICBhdHRyczogeyB0cmFuc2l0aW9uOiBcInNsaWRlLXgtdHJhbnNpdGlvblwiLCBmbHVpZDogXCJcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdChcImRlZmF1bHRcIildLFxuICAgICAgICAgICAgMlxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImZhYi1idXR0b25cIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJjb29raWUtbGF3XCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYXBwLWZvb3RlclwiKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1lOGYxNGFjNFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtZThmMTRhYzRcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTWFpbi52dWVcbi8vIG1vZHVsZSBpZCA9IDY4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDcgOCA5IDEwIDExIDEyIiwiLyohXG4gKiBJbWFnZSBDb21wcmVzc29yIHYwLjUuMlxuICogaHR0cHM6Ly9naXRodWIuY29tL3hrZXNoaS9pbWFnZS1jb21wcmVzc29yXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IFhrZXNoaVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNy0xMC0wOVQwMjo0MDozNy4xMjlaXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLkltYWdlQ29tcHJlc3NvciA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gY3JlYXRlQ29tbW9uanNNb2R1bGUoZm4sIG1vZHVsZSkge1xuXHRyZXR1cm4gbW9kdWxlID0geyBleHBvcnRzOiB7fSB9LCBmbihtb2R1bGUsIG1vZHVsZS5leHBvcnRzKSwgbW9kdWxlLmV4cG9ydHM7XG59XG5cbnZhciBjYW52YXNUb0Jsb2IgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlKSB7XG4vKlxuICogSmF2YVNjcmlwdCBDYW52YXMgdG8gQmxvYlxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1DYW52YXMtdG8tQmxvYlxuICpcbiAqIENvcHlyaWdodCAyMDEyLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBCYXNlZCBvbiBzdGFja292ZXJmbG93IHVzZXIgU3RvaXZlJ3MgY29kZSBzbmlwcGV0OlxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3EvNDk5ODkwOFxuICovXG5cbi8qIGdsb2JhbCBhdG9iLCBCbG9iLCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBDYW52YXNQcm90b3R5cGUgPVxuICAgIHdpbmRvdy5IVE1MQ2FudmFzRWxlbWVudCAmJiB3aW5kb3cuSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlO1xuICB2YXIgaGFzQmxvYkNvbnN0cnVjdG9yID1cbiAgICB3aW5kb3cuQmxvYiAmJlxuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihuZXcgQmxvYigpKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpO1xuICB2YXIgaGFzQXJyYXlCdWZmZXJWaWV3U3VwcG9ydCA9XG4gICAgaGFzQmxvYkNvbnN0cnVjdG9yICYmXG4gICAgd2luZG93LlVpbnQ4QXJyYXkgJiZcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtuZXcgVWludDhBcnJheSgxMDApXSkuc2l6ZSA9PT0gMTAwXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCk7XG4gIHZhciBCbG9iQnVpbGRlciA9XG4gICAgd2luZG93LkJsb2JCdWlsZGVyIHx8XG4gICAgd2luZG93LldlYktpdEJsb2JCdWlsZGVyIHx8XG4gICAgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8XG4gICAgd2luZG93Lk1TQmxvYkJ1aWxkZXI7XG4gIHZhciBkYXRhVVJJUGF0dGVybiA9IC9eZGF0YTooKC4qPykoO2NoYXJzZXQ9Lio/KT8pKDtiYXNlNjQpPywvO1xuICB2YXIgZGF0YVVSTHRvQmxvYiA9XG4gICAgKGhhc0Jsb2JDb25zdHJ1Y3RvciB8fCBCbG9iQnVpbGRlcikgJiZcbiAgICB3aW5kb3cuYXRvYiAmJlxuICAgIHdpbmRvdy5BcnJheUJ1ZmZlciAmJlxuICAgIHdpbmRvdy5VaW50OEFycmF5ICYmXG4gICAgZnVuY3Rpb24gKGRhdGFVUkkpIHtcbiAgICAgIHZhciBtYXRjaGVzLFxuICAgICAgICBtZWRpYVR5cGUsXG4gICAgICAgIGlzQmFzZTY0LFxuICAgICAgICBkYXRhU3RyaW5nLFxuICAgICAgICBieXRlU3RyaW5nLFxuICAgICAgICBhcnJheUJ1ZmZlcixcbiAgICAgICAgaW50QXJyYXksXG4gICAgICAgIGksXG4gICAgICAgIGJiO1xuICAgICAgLy8gUGFyc2UgdGhlIGRhdGFVUkkgY29tcG9uZW50cyBhcyBwZXIgUkZDIDIzOTdcbiAgICAgIG1hdGNoZXMgPSBkYXRhVVJJLm1hdGNoKGRhdGFVUklQYXR0ZXJuKTtcbiAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZGF0YSBVUkknKVxuICAgICAgfVxuICAgICAgLy8gRGVmYXVsdCB0byB0ZXh0L3BsYWluO2NoYXJzZXQ9VVMtQVNDSUlcbiAgICAgIG1lZGlhVHlwZSA9IG1hdGNoZXNbMl1cbiAgICAgICAgPyBtYXRjaGVzWzFdXG4gICAgICAgIDogJ3RleHQvcGxhaW4nICsgKG1hdGNoZXNbM10gfHwgJztjaGFyc2V0PVVTLUFTQ0lJJyk7XG4gICAgICBpc0Jhc2U2NCA9ICEhbWF0Y2hlc1s0XTtcbiAgICAgIGRhdGFTdHJpbmcgPSBkYXRhVVJJLnNsaWNlKG1hdGNoZXNbMF0ubGVuZ3RoKTtcbiAgICAgIGlmIChpc0Jhc2U2NCkge1xuICAgICAgICAvLyBDb252ZXJ0IGJhc2U2NCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZzpcbiAgICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVN0cmluZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnk6XG4gICAgICAgIGJ5dGVTdHJpbmcgPSBkZWNvZGVVUklDb21wb25lbnQoZGF0YVN0cmluZyk7XG4gICAgICB9XG4gICAgICAvLyBXcml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhbiBBcnJheUJ1ZmZlcjpcbiAgICAgIGFycmF5QnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICAgIGludEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaW50QXJyYXlbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICB9XG4gICAgICAvLyBXcml0ZSB0aGUgQXJyYXlCdWZmZXIgKG9yIEFycmF5QnVmZmVyVmlldykgdG8gYSBibG9iOlxuICAgICAgaWYgKGhhc0Jsb2JDb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW2hhc0FycmF5QnVmZmVyVmlld1N1cHBvcnQgPyBpbnRBcnJheSA6IGFycmF5QnVmZmVyXSwge1xuICAgICAgICAgIHR5cGU6IG1lZGlhVHlwZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgYmIgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcbiAgICAgIGJiLmFwcGVuZChhcnJheUJ1ZmZlcik7XG4gICAgICByZXR1cm4gYmIuZ2V0QmxvYihtZWRpYVR5cGUpXG4gICAgfTtcbiAgaWYgKHdpbmRvdy5IVE1MQ2FudmFzRWxlbWVudCAmJiAhQ2FudmFzUHJvdG90eXBlLnRvQmxvYikge1xuICAgIGlmIChDYW52YXNQcm90b3R5cGUubW96R2V0QXNGaWxlKSB7XG4gICAgICBDYW52YXNQcm90b3R5cGUudG9CbG9iID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0eXBlLCBxdWFsaXR5KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHF1YWxpdHkgJiYgQ2FudmFzUHJvdG90eXBlLnRvRGF0YVVSTCAmJiBkYXRhVVJMdG9CbG9iKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhVVJMdG9CbG9iKHNlbGYudG9EYXRhVVJMKHR5cGUsIHF1YWxpdHkpKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHNlbGYubW96R2V0QXNGaWxlKCdibG9iJywgdHlwZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoQ2FudmFzUHJvdG90eXBlLnRvRGF0YVVSTCAmJiBkYXRhVVJMdG9CbG9iKSB7XG4gICAgICBDYW52YXNQcm90b3R5cGUudG9CbG9iID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0eXBlLCBxdWFsaXR5KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FsbGJhY2soZGF0YVVSTHRvQmxvYihzZWxmLnRvRGF0YVVSTCh0eXBlLCBxdWFsaXR5KSkpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2YgdW5kZWZpbmVkID09PSAnZnVuY3Rpb24nICYmIHVuZGVmaW5lZC5hbWQpIHtcbiAgICB1bmRlZmluZWQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGRhdGFVUkx0b0Jsb2JcbiAgICB9KTtcbiAgfSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRhdGFVUkx0b0Jsb2I7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmRhdGFVUkx0b0Jsb2IgPSBkYXRhVVJMdG9CbG9iO1xuICB9XG59KSh3aW5kb3cpO1xufSk7XG5cbi8qIGdsb2JhbHMgQmxvYiAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQmxvYiA9IGZ1bmN0aW9uICh4KSB7XG5cdHJldHVybiB4IGluc3RhbmNlb2YgQmxvYiB8fCB0b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBCbG9iXSc7XG59O1xuXG52YXIgREVGQVVMVFMgPSB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgcmVhZCB0aGUgaW1hZ2UncyBFeGlmIE9yaWVudGF0aW9uIGluZm9ybWF0aW9uLFxuICAgKiBhbmQgdGhlbiByb3RhdGUgb3IgZmxpcCB0aGUgaW1hZ2UgYXV0b21hdGljYWxseS5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBjaGVja09yaWVudGF0aW9uOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBUaGUgbWF4IHdpZHRoIG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBtYXhXaWR0aDogSW5maW5pdHksXG5cbiAgLyoqXG4gICAqIFRoZSBtYXggaGVpZ2h0IG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBtYXhIZWlnaHQ6IEluZmluaXR5LFxuXG4gIC8qKlxuICAgKiBUaGUgbWluIHdpZHRoIG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBtaW5XaWR0aDogMCxcblxuICAvKipcbiAgICogVGhlIG1pbiBoZWlnaHQgb2YgdGhlIG91dHB1dCBpbWFnZS5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIG1pbkhlaWdodDogMCxcblxuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIHRoZSBuYXR1cmFsIHdpZHRoIG9mIHRoZSBzb3VyY2UgaW1hZ2Ugd2lsbCBiZSB1c2VkLlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgd2lkdGg6IHVuZGVmaW5lZCxcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgb3V0cHV0IGltYWdlLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgbmF0dXJhbCBoZWlnaHQgb2YgdGhlIHNvdXJjZSBpbWFnZSB3aWxsIGJlIHVzZWQuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBoZWlnaHQ6IHVuZGVmaW5lZCxcblxuICAvKipcbiAgICogVGhlIHF1YWxpdHkgb2YgdGhlIG91dHB1dCBpbWFnZS5cbiAgICogSXQgbXVzdCBiZSBhIG51bWJlciBiZXR3ZWVuIGAwYCBhbmQgYDFgLFxuICAgKiBhbmQgb25seSBhdmFpbGFibGUgZm9yIGBpbWFnZS9qcGVnYCBhbmQgYGltYWdlL3dlYnBgIGltYWdlcy5cbiAgICogQ2hlY2sgb3V0IHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTENhbnZhc0VsZW1lbnQvdG9CbG9iIGNhbnZhcy50b0Jsb2J9LlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgcXVhbGl0eTogMC44LFxuXG4gIC8qKlxuICAgKiBUaGUgbWltZSB0eXBlIG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIEJ5IGRlZmF1bHQsIHRoZSBvcmlnaW5hbCBtaW1lIHR5cGUgb2YgdGhlIHNvdXJjZSBpbWFnZSBmaWxlIHdpbGwgYmUgdXNlZC5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG1pbWVUeXBlOiAnYXV0bycsXG5cbiAgLyoqXG4gICAqIFBORyBmaWxlcyBvdmVyIHRoaXMgdmFsdWUgKDVNIGJ5IGRlZmF1bHQpIHdpbGwgYmUgY29udmVydGVkIHRvIEpQRUdzLlxuICAgKiBUbyBkaXNhYmxlIHRoaXMsIGp1c3Qgc2V0IHRoZSB2YWx1ZSB0byBgSW5maW5pdHlgLlxuICAgKiBDaGVjayBvdXQge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS94a2VzaGkvaW1hZ2UtY29tcHJlc3Nvci9pc3N1ZXMvMiAjMn0uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBjb252ZXJ0U2l6ZTogNTAwMDAwMCxcblxuICAvKipcbiAgICogVGhlIHN1Y2Nlc3MgY2FsbGJhY2sgZm9yIHRoZSBpbWFnZSBjb21wcmVzc2luZyBwcm9jZXNzLlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqIEBwYXJhbSB7RmlsZX0gZmlsZSAtIFRoZSBjb21wcmVzc2VkIGltYWdlIEZpbGUgb2JqZWN0LlxuICAgKiBAZXhhbXBsZVxuICAgKiBmdW5jdGlvbiAoZmlsZSkgeyBjb25zb2xlLmxvZyhmaWxlKSB9XG4gICAqL1xuICBzdWNjZXNzOiBudWxsLFxuXG4gIC8qKlxuICAgKiBUaGUgZXJyb3IgY2FsbGJhY2sgZm9yIHRoZSBpbWFnZSBjb21wcmVzc2luZyBwcm9jZXNzLlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqIEBwYXJhbSB7RXJyb3J9IGVyciAtIEFuIEVycm9yIG9iamVjdC5cbiAgICogQGV4YW1wbGVcbiAgICogZnVuY3Rpb24gKGVycikgeyBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSkgfVxuICAgKi9cbiAgZXJyb3I6IG51bGxcbn07XG5cbnZhciBSRUdFWFBfSU1BR0VfVFlQRSA9IC9eaW1hZ2VcXC8uKyQvO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIG1pbWUgdHlwZSBvZiBpbWFnZS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGdpdmVuIGlzIGEgbWltZSB0eXBlIG9mIGltYWdlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW1hZ2VUeXBlKHZhbHVlKSB7XG4gIHJldHVybiBSRUdFWFBfSU1BR0VfVFlQRS50ZXN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGltYWdlIHR5cGUgdG8gZXh0ZW5zaW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIGltYWdlIHR5cGUgdG8gY29udmVydC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luY2x1ZGVEb3Q9dHJ1ZV0gLSBJbmNsdWRlIGEgbGVhZGluZyBkb3Qgb3Igbm90LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdGhlIGltYWdlIGV4dGVuc2lvbi5cbiAqL1xuZnVuY3Rpb24gaW1hZ2VUeXBlVG9FeHRlbnNpb24odmFsdWUpIHtcbiAgdmFyIGluY2x1ZGVEb3QgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG5cbiAgdmFyIGV4dGVuc2lvbiA9IGlzSW1hZ2VUeXBlKHZhbHVlKSA/IHZhbHVlLnN1YnN0cig2KSA6ICcnO1xuXG4gIGlmIChleHRlbnNpb24gPT09ICdqcGVnJykge1xuICAgIGV4dGVuc2lvbiA9ICdqcGcnO1xuICB9XG5cbiAgaWYgKGV4dGVuc2lvbiAmJiBpbmNsdWRlRG90KSB7XG4gICAgZXh0ZW5zaW9uID0gJy4nICsgZXh0ZW5zaW9uO1xuICB9XG5cbiAgcmV0dXJuIGV4dGVuc2lvbjtcbn1cblxudmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbi8qKlxuICogR2V0IHN0cmluZyBmcm9tIGNoYXIgY29kZSBpbiBkYXRhIHZpZXcuXG4gKiBAcGFyYW0ge0RhdGFWaWV3fSBkYXRhVmlldyAtIFRoZSBkYXRhIHZpZXcgZm9yIHJlYWQuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBUaGUgc3RhcnQgaW5kZXguXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gVGhlIHJlYWQgbGVuZ3RoLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlYWQgcmVzdWx0LlxuICovXG5cbmZ1bmN0aW9uIGdldFN0cmluZ0Zyb21DaGFyQ29kZShkYXRhVmlldywgc3RhcnQsIGxlbmd0aCkge1xuICB2YXIgc3RyID0gJyc7XG4gIHZhciBpID0gdm9pZCAwO1xuXG4gIGxlbmd0aCArPSBzdGFydDtcblxuICBmb3IgKGkgPSBzdGFydDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgc3RyICs9IGZyb21DaGFyQ29kZShkYXRhVmlldy5nZXRVaW50OChpKSk7XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG52YXIgX3dpbmRvdyQxID0gd2luZG93O1xudmFyIGJ0b2EgPSBfd2luZG93JDEuYnRvYTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gYXJyYXkgYnVmZmVyIHRvIERhdGEgVVJMLlxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgLSBUaGUgYXJyYXkgYnVmZmVyIHRvIHRyYW5zZm9ybS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtaW1lVHlwZSAtIFRoZSBtaW1lIHR5cGUgb2YgdGhlIERhdGEgVVJMLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlc3VsdCBEYXRhIFVSTC5cbiAqL1xuXG5mdW5jdGlvbiBhcnJheUJ1ZmZlclRvRGF0YVVSTChhcnJheUJ1ZmZlciwgbWltZVR5cGUpIHtcbiAgdmFyIHVpbnQ4ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuICB2YXIgbGVuZ3RoID0gdWludDgubGVuZ3RoO1xuXG4gIHZhciBkYXRhID0gJyc7XG4gIHZhciBpID0gdm9pZCAwO1xuXG4gIC8vIFR5cGVkQXJyYXkucHJvdG90eXBlLmZvckVhY2ggaXMgbm90IHN1cHBvcnRlZCBpbiBzb21lIGJyb3dzZXJzLlxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBkYXRhICs9IGZyb21DaGFyQ29kZSh1aW50OFtpXSk7XG4gIH1cblxuICByZXR1cm4gJ2RhdGE6JyArIG1pbWVUeXBlICsgJztiYXNlNjQsJyArIGJ0b2EoZGF0YSk7XG59XG5cbi8qKlxuICogR2V0IG9yaWVudGF0aW9uIHZhbHVlIGZyb20gZ2l2ZW4gYXJyYXkgYnVmZmVyLlxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgLSBUaGUgYXJyYXkgYnVmZmVyIHRvIHJlYWQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgcmVhZCBvcmllbnRhdGlvbiB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0T3JpZW50YXRpb24oYXJyYXlCdWZmZXIpIHtcbiAgdmFyIGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGFycmF5QnVmZmVyKTtcbiAgdmFyIG9yaWVudGF0aW9uID0gdm9pZCAwO1xuICB2YXIgbGl0dGxlRW5kaWFuID0gdm9pZCAwO1xuICB2YXIgYXBwMVN0YXJ0ID0gdm9pZCAwO1xuICB2YXIgaWZkU3RhcnQgPSB2b2lkIDA7XG5cbiAgLy8gT25seSBoYW5kbGUgSlBFRyBpbWFnZSAoc3RhcnQgYnkgMHhGRkQ4KVxuICBpZiAoZGF0YVZpZXcuZ2V0VWludDgoMCkgPT09IDB4RkYgJiYgZGF0YVZpZXcuZ2V0VWludDgoMSkgPT09IDB4RDgpIHtcbiAgICB2YXIgbGVuZ3RoID0gZGF0YVZpZXcuYnl0ZUxlbmd0aDtcbiAgICB2YXIgb2Zmc2V0ID0gMjtcblxuICAgIHdoaWxlIChvZmZzZXQgPCBsZW5ndGgpIHtcbiAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50OChvZmZzZXQpID09PSAweEZGICYmIGRhdGFWaWV3LmdldFVpbnQ4KG9mZnNldCArIDEpID09PSAweEUxKSB7XG4gICAgICAgIGFwcDFTdGFydCA9IG9mZnNldDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIG9mZnNldCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcHAxU3RhcnQpIHtcbiAgICB2YXIgZXhpZklEQ29kZSA9IGFwcDFTdGFydCArIDQ7XG4gICAgdmFyIHRpZmZPZmZzZXQgPSBhcHAxU3RhcnQgKyAxMDtcblxuICAgIGlmIChnZXRTdHJpbmdGcm9tQ2hhckNvZGUoZGF0YVZpZXcsIGV4aWZJRENvZGUsIDQpID09PSAnRXhpZicpIHtcbiAgICAgIHZhciBlbmRpYW5uZXNzID0gZGF0YVZpZXcuZ2V0VWludDE2KHRpZmZPZmZzZXQpO1xuXG4gICAgICBsaXR0bGVFbmRpYW4gPSBlbmRpYW5uZXNzID09PSAweDQ5NDk7XG5cbiAgICAgIGlmIChsaXR0bGVFbmRpYW4gfHwgZW5kaWFubmVzcyA9PT0gMHg0RDREIC8qIGJpZ0VuZGlhbiAqLykge1xuICAgICAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50MTYodGlmZk9mZnNldCArIDIsIGxpdHRsZUVuZGlhbikgPT09IDB4MDAyQSkge1xuICAgICAgICAgICAgdmFyIGZpcnN0SUZET2Zmc2V0ID0gZGF0YVZpZXcuZ2V0VWludDMyKHRpZmZPZmZzZXQgKyA0LCBsaXR0bGVFbmRpYW4pO1xuXG4gICAgICAgICAgICBpZiAoZmlyc3RJRkRPZmZzZXQgPj0gMHgwMDAwMDAwOCkge1xuICAgICAgICAgICAgICBpZmRTdGFydCA9IHRpZmZPZmZzZXQgKyBmaXJzdElGRE9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaWZkU3RhcnQpIHtcbiAgICB2YXIgX2xlbmd0aCA9IGRhdGFWaWV3LmdldFVpbnQxNihpZmRTdGFydCwgbGl0dGxlRW5kaWFuKTtcbiAgICB2YXIgX29mZnNldCA9IHZvaWQgMDtcbiAgICB2YXIgaSA9IHZvaWQgMDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBfbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIF9vZmZzZXQgPSBpZmRTdGFydCArIGkgKiAxMiArIDI7XG5cbiAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50MTYoX29mZnNldCwgbGl0dGxlRW5kaWFuKSA9PT0gMHgwMTEyIC8qIE9yaWVudGF0aW9uICovKSB7XG4gICAgICAgICAgLy8gOCBpcyB0aGUgb2Zmc2V0IG9mIHRoZSBjdXJyZW50IHRhZydzIHZhbHVlXG4gICAgICAgICAgX29mZnNldCArPSA4O1xuXG4gICAgICAgICAgLy8gR2V0IHRoZSBvcmlnaW5hbCBvcmllbnRhdGlvbiB2YWx1ZVxuICAgICAgICAgIG9yaWVudGF0aW9uID0gZGF0YVZpZXcuZ2V0VWludDE2KF9vZmZzZXQsIGxpdHRsZUVuZGlhbik7XG5cbiAgICAgICAgICAvLyBPdmVycmlkZSB0aGUgb3JpZW50YXRpb24gd2l0aCBpdHMgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgIGRhdGFWaWV3LnNldFVpbnQxNihfb2Zmc2V0LCAxLCBsaXR0bGVFbmRpYW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9yaWVudGF0aW9uO1xufVxuXG4vKipcbiAqIFBhcnNlIEV4aWYgT3JpZW50YXRpb24gdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcn0gb3JpZW50YXRpb24gLSBUaGUgb3JpZW50YXRpb24gdG8gcGFyc2UuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcGFyc2VkIHJlc3VsdC5cbiAqL1xuZnVuY3Rpb24gcGFyc2VPcmllbnRhdGlvbihvcmllbnRhdGlvbikge1xuICB2YXIgcm90YXRlID0gMDtcbiAgdmFyIHNjYWxlWCA9IDE7XG4gIHZhciBzY2FsZVkgPSAxO1xuXG4gIHN3aXRjaCAob3JpZW50YXRpb24pIHtcbiAgICAvLyBGbGlwIGhvcml6b250YWxcbiAgICBjYXNlIDI6XG4gICAgICBzY2FsZVggPSAtMTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gUm90YXRlIGxlZnQgMTgwwrBcbiAgICBjYXNlIDM6XG4gICAgICByb3RhdGUgPSAtMTgwO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBGbGlwIHZlcnRpY2FsXG4gICAgY2FzZSA0OlxuICAgICAgc2NhbGVZID0gLTE7XG4gICAgICBicmVhaztcblxuICAgIC8vIEZsaXAgdmVydGljYWwgYW5kIHJvdGF0ZSByaWdodCA5MMKwXG4gICAgY2FzZSA1OlxuICAgICAgcm90YXRlID0gOTA7XG4gICAgICBzY2FsZVkgPSAtMTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gUm90YXRlIHJpZ2h0IDkwwrBcbiAgICBjYXNlIDY6XG4gICAgICByb3RhdGUgPSA5MDtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gRmxpcCBob3Jpem9udGFsIGFuZCByb3RhdGUgcmlnaHQgOTDCsFxuICAgIGNhc2UgNzpcbiAgICAgIHJvdGF0ZSA9IDkwO1xuICAgICAgc2NhbGVYID0gLTE7XG4gICAgICBicmVhaztcblxuICAgIC8vIFJvdGF0ZSBsZWZ0IDkwwrBcbiAgICBjYXNlIDg6XG4gICAgICByb3RhdGUgPSAtOTA7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJvdGF0ZTogcm90YXRlLFxuICAgIHNjYWxlWDogc2NhbGVYLFxuICAgIHNjYWxlWTogc2NhbGVZXG4gIH07XG59XG5cbnZhciBhc3luY0dlbmVyYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQXdhaXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jR2VuZXJhdG9yKGdlbikge1xuICAgIHZhciBmcm9udCwgYmFjaztcblxuICAgIGZ1bmN0aW9uIHNlbmQoa2V5LCBhcmcpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIGFyZzogYXJnLFxuICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgICAgICAgcmVqZWN0OiByZWplY3QsXG4gICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChiYWNrKSB7XG4gICAgICAgICAgYmFjayA9IGJhY2submV4dCA9IHJlcXVlc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnJvbnQgPSBiYWNrID0gcmVxdWVzdDtcbiAgICAgICAgICByZXN1bWUoa2V5LCBhcmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXN1bWUoa2V5LCBhcmcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBnZW5ba2V5XShhcmcpO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXdhaXRWYWx1ZSkge1xuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZS52YWx1ZSkudGhlbihmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICByZXN1bWUoXCJuZXh0XCIsIGFyZyk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgcmVzdW1lKFwidGhyb3dcIiwgYXJnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXR0bGUocmVzdWx0LmRvbmUgPyBcInJldHVyblwiIDogXCJub3JtYWxcIiwgcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNldHRsZShcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dGxlKHR5cGUsIHZhbHVlKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInJldHVyblwiOlxuICAgICAgICAgIGZyb250LnJlc29sdmUoe1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJ0aHJvd1wiOlxuICAgICAgICAgIGZyb250LnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBmcm9udC5yZXNvbHZlKHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGZyb250ID0gZnJvbnQubmV4dDtcblxuICAgICAgaWYgKGZyb250KSB7XG4gICAgICAgIHJlc3VtZShmcm9udC5rZXksIGZyb250LmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWNrID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbnZva2UgPSBzZW5kO1xuXG4gICAgaWYgKHR5cGVvZiBnZW4ucmV0dXJuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMucmV0dXJuID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHtcbiAgICBBc3luY0dlbmVyYXRvci5wcm90b3R5cGVbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfVxuXG4gIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB0aGlzLl9pbnZva2UoXCJuZXh0XCIsIGFyZyk7XG4gIH07XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLnRocm93ID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB0aGlzLl9pbnZva2UoXCJ0aHJvd1wiLCBhcmcpO1xuICB9O1xuXG4gIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcInJldHVyblwiLCBhcmcpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgd3JhcDogZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFzeW5jR2VuZXJhdG9yKGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGF3YWl0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBuZXcgQXdhaXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cblxuXG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuXG5cblxuXG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgX3dpbmRvdyA9IHdpbmRvdztcbnZhciBBcnJheUJ1ZmZlciQxID0gX3dpbmRvdy5BcnJheUJ1ZmZlcjtcbnZhciBGaWxlUmVhZGVyID0gX3dpbmRvdy5GaWxlUmVhZGVyO1xuXG52YXIgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xudmFyIFJFR0VYUF9FWFRFTlNJT04gPSAvXFwuXFx3KyQvO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW1hZ2UgY29tcHJlc3Nvci5cbiAqIEBjbGFzc1xuICovXG5cbnZhciBJbWFnZUNvbXByZXNzb3IgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3Igb2YgSW1hZ2VDb21wcmVzc29yLlxuICAgKiBAcGFyYW0ge0ZpbGV8QmxvYn0gZmlsZSAtIFRoZSB0YXJnZXQgaW1hZ2UgZmlsZSBmb3IgY29tcHJlc3NpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucyBmb3IgY29tcHJlc3NpbmcuXG4gICAqL1xuICBmdW5jdGlvbiBJbWFnZUNvbXByZXNzb3IoZmlsZSwgb3B0aW9ucykge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEltYWdlQ29tcHJlc3Nvcik7XG5cbiAgICB0aGlzLnJlc3VsdCA9IG51bGw7XG5cbiAgICBpZiAoZmlsZSkge1xuICAgICAgdGhpcy5jb21wcmVzcyhmaWxlLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1haW4gY29tcHJlc3MgbWV0aG9kLlxuICAgKiBAcGFyYW0ge0ZpbGV8QmxvYn0gZmlsZSAtIFRoZSB0YXJnZXQgaW1hZ2UgZmlsZSBmb3IgY29tcHJlc3NpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucyBmb3IgY29tcHJlc3NpbmcuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgUHJvbWlzZSBpbnN0YW5jZS5cbiAgICovXG5cblxuICBjcmVhdGVDbGFzcyhJbWFnZUNvbXByZXNzb3IsIFt7XG4gICAga2V5OiAnY29tcHJlc3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wcmVzcyhmaWxlLCBvcHRpb25zKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBERUZBVUxUUywgb3B0aW9ucyk7XG5cbiAgICAgIGlmICghQXJyYXlCdWZmZXIkMSkge1xuICAgICAgICBvcHRpb25zLmNoZWNrT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKCFpc0Jsb2IoZmlsZSkpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIEZpbGUgb3IgQmxvYiBvYmplY3QuJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtaW1lVHlwZSA9IGZpbGUudHlwZTtcblxuICAgICAgICBpZiAoIWlzSW1hZ2VUeXBlKG1pbWVUeXBlKSkge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGFuIGltYWdlIEZpbGUgb3IgQmxvYiBvYmplY3QuJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghVVJMICYmICFGaWxlUmVhZGVyKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignVGhlIGN1cnJlbnQgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGltYWdlIGNvbXByZXNzaW9uLicpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVJMICYmICFvcHRpb25zLmNoZWNrT3JpZW50YXRpb24pIHtcbiAgICAgICAgICByZXNvbHZlKFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkpO1xuICAgICAgICB9IGVsc2UgaWYgKEZpbGVSZWFkZXIpIHtcbiAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICB2YXIgY2hlY2tPcmllbnRhdGlvbiA9IG9wdGlvbnMuY2hlY2tPcmllbnRhdGlvbiAmJiBtaW1lVHlwZSA9PT0gJ2ltYWdlL2pwZWcnO1xuXG4gICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gX3JlZi50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGFyZ2V0LnJlc3VsdDtcblxuXG4gICAgICAgICAgICByZXNvbHZlKGNoZWNrT3JpZW50YXRpb24gPyBfZXh0ZW5kcyh7XG4gICAgICAgICAgICAgIHVybDogYXJyYXlCdWZmZXJUb0RhdGFVUkwocmVzdWx0LCBtaW1lVHlwZSlcbiAgICAgICAgICAgIH0sIHBhcnNlT3JpZW50YXRpb24oZ2V0T3JpZW50YXRpb24ocmVzdWx0KSkpIDoge1xuICAgICAgICAgICAgICB1cmw6IHJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZWFkZXIub25hYm9ydCA9IHJlamVjdDtcbiAgICAgICAgICByZWFkZXIub25lcnJvciA9IHJlamVjdDtcblxuICAgICAgICAgIGlmIChjaGVja09yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF9leHRlbmRzKHt9LCBkYXRhLCB7XG4gICAgICAgICAgICAgIG5hdHVyYWxXaWR0aDogaW1hZ2UubmF0dXJhbFdpZHRoLFxuICAgICAgICAgICAgICBuYXR1cmFsSGVpZ2h0OiBpbWFnZS5uYXR1cmFsSGVpZ2h0XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbWFnZS5vbmFib3J0ID0gcmVqZWN0O1xuICAgICAgICAgIGltYWdlLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgICAgaW1hZ2UuYWx0ID0gZmlsZS5uYW1lO1xuICAgICAgICAgIGltYWdlLnNyYyA9IGRhdGEudXJsO1xuICAgICAgICB9KTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgIHZhciBuYXR1cmFsV2lkdGggPSBfcmVmMi5uYXR1cmFsV2lkdGgsXG4gICAgICAgICAgICBuYXR1cmFsSGVpZ2h0ID0gX3JlZjIubmF0dXJhbEhlaWdodCxcbiAgICAgICAgICAgIF9yZWYyJHJvdGF0ZSA9IF9yZWYyLnJvdGF0ZSxcbiAgICAgICAgICAgIHJvdGF0ZSA9IF9yZWYyJHJvdGF0ZSA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYyJHJvdGF0ZSxcbiAgICAgICAgICAgIF9yZWYyJHNjYWxlWCA9IF9yZWYyLnNjYWxlWCxcbiAgICAgICAgICAgIHNjYWxlWCA9IF9yZWYyJHNjYWxlWCA9PT0gdW5kZWZpbmVkID8gMSA6IF9yZWYyJHNjYWxlWCxcbiAgICAgICAgICAgIF9yZWYyJHNjYWxlWSA9IF9yZWYyLnNjYWxlWSxcbiAgICAgICAgICAgIHNjYWxlWSA9IF9yZWYyJHNjYWxlWSA9PT0gdW5kZWZpbmVkID8gMSA6IF9yZWYyJHNjYWxlWTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgdmFyIGFzcGVjdFJhdGlvID0gbmF0dXJhbFdpZHRoIC8gbmF0dXJhbEhlaWdodDtcbiAgICAgICAgICB2YXIgbWF4V2lkdGggPSBNYXRoLm1heChvcHRpb25zLm1heFdpZHRoLCAwKSB8fCBJbmZpbml0eTtcbiAgICAgICAgICB2YXIgbWF4SGVpZ2h0ID0gTWF0aC5tYXgob3B0aW9ucy5tYXhIZWlnaHQsIDApIHx8IEluZmluaXR5O1xuICAgICAgICAgIHZhciBtaW5XaWR0aCA9IE1hdGgubWF4KG9wdGlvbnMubWluV2lkdGgsIDApIHx8IDA7XG4gICAgICAgICAgdmFyIG1pbkhlaWdodCA9IE1hdGgubWF4KG9wdGlvbnMubWluSGVpZ2h0LCAwKSB8fCAwO1xuICAgICAgICAgIHZhciB3aWR0aCA9IG5hdHVyYWxXaWR0aDtcbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gbmF0dXJhbEhlaWdodDtcblxuICAgICAgICAgIGlmIChtYXhXaWR0aCA8IEluZmluaXR5ICYmIG1heEhlaWdodCA8IEluZmluaXR5KSB7XG4gICAgICAgICAgICBpZiAobWF4SGVpZ2h0ICogYXNwZWN0UmF0aW8gPiBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICBtYXhIZWlnaHQgPSBtYXhXaWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWF4V2lkdGggPSBtYXhIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG1heFdpZHRoIDwgSW5maW5pdHkpIHtcbiAgICAgICAgICAgIG1heEhlaWdodCA9IG1heFdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgfSBlbHNlIGlmIChtYXhIZWlnaHQgPCBJbmZpbml0eSkge1xuICAgICAgICAgICAgbWF4V2lkdGggPSBtYXhIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobWluV2lkdGggPiAwICYmIG1pbkhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIGlmIChtaW5IZWlnaHQgKiBhc3BlY3RSYXRpbyA+IG1pbldpZHRoKSB7XG4gICAgICAgICAgICAgIG1pbkhlaWdodCA9IG1pbldpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtaW5XaWR0aCA9IG1pbkhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobWluV2lkdGggPiAwKSB7XG4gICAgICAgICAgICBtaW5IZWlnaHQgPSBtaW5XaWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWluSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgbWluV2lkdGggPSBtaW5IZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob3B0aW9ucy53aWR0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBfb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB3aWR0aCA9IF9vcHRpb25zLndpZHRoO1xuXG4gICAgICAgICAgICBoZWlnaHQgPSB3aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICB2YXIgX29wdGlvbnMyID0gb3B0aW9ucztcbiAgICAgICAgICAgIGhlaWdodCA9IF9vcHRpb25zMi5oZWlnaHQ7XG5cbiAgICAgICAgICAgIHdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2lkdGggPSBNYXRoLm1pbihNYXRoLm1heCh3aWR0aCwgbWluV2lkdGgpLCBtYXhXaWR0aCk7XG4gICAgICAgICAgaGVpZ2h0ID0gTWF0aC5taW4oTWF0aC5tYXgoaGVpZ2h0LCBtaW5IZWlnaHQpLCBtYXhIZWlnaHQpO1xuXG4gICAgICAgICAgdmFyIGRlc3RYID0gLXdpZHRoIC8gMjtcbiAgICAgICAgICB2YXIgZGVzdFkgPSAtaGVpZ2h0IC8gMjtcbiAgICAgICAgICB2YXIgZGVzdFdpZHRoID0gd2lkdGg7XG4gICAgICAgICAgdmFyIGRlc3RIZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgICBpZiAoTWF0aC5hYnMocm90YXRlKSAlIDE4MCA9PT0gOTApIHtcbiAgICAgICAgICAgIHZhciBfd2lkdGgkaGVpZ2h0ID0ge1xuICAgICAgICAgICAgICB3aWR0aDogaGVpZ2h0LFxuICAgICAgICAgICAgICBoZWlnaHQ6IHdpZHRoXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2lkdGggPSBfd2lkdGgkaGVpZ2h0LndpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gX3dpZHRoJGhlaWdodC5oZWlnaHQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICAgIC8vIE92ZXJyaWRlIHRoZSBkZWZhdWx0IGZpbGwgY29sb3IgKCMwMDAsIGJsYWNrKVxuICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgY29udGV4dC5yb3RhdGUocm90YXRlICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgICAgY29udGV4dC5zY2FsZShzY2FsZVgsIHNjYWxlWSk7XG4gICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIE1hdGguZmxvb3IoZGVzdFgpLCBNYXRoLmZsb29yKGRlc3RZKSwgTWF0aC5mbG9vcihkZXN0V2lkdGgpLCBNYXRoLmZsb29yKGRlc3RIZWlnaHQpKTtcbiAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcblxuICAgICAgICAgIGlmICghaXNJbWFnZVR5cGUob3B0aW9ucy5taW1lVHlwZSkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubWltZVR5cGUgPSBmaWxlLnR5cGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ29udmVydHMgUE5HIGZpbGVzIG92ZXIgdGhlIGBjb252ZXJ0U2l6ZWAgdG8gSlBFR3MuXG4gICAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IG9wdGlvbnMuY29udmVydFNpemUgJiYgb3B0aW9ucy5taW1lVHlwZSA9PT0gJ2ltYWdlL3BuZycpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubWltZVR5cGUgPSAnaW1hZ2UvanBlZyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNhbnZhcy50b0Jsb2IpIHtcbiAgICAgICAgICAgIGNhbnZhcy50b0Jsb2IocmVzb2x2ZSwgb3B0aW9ucy5taW1lVHlwZSwgb3B0aW9ucy5xdWFsaXR5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShjYW52YXNUb0Jsb2IoY2FudmFzLnRvRGF0YVVSTChvcHRpb25zLm1pbWVUeXBlLCBvcHRpb25zLnF1YWxpdHkpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBpZiAoVVJMKSB7XG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChpbWFnZS5zcmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIC8vIFJldHVybnMgb3JpZ2luYWwgZmlsZSBpZiB0aGUgcmVzdWx0IGlzIGdyZWF0ZXIgdGhhbiBpdCBhbmQgd2l0aG91dCBzaXplIHJlbGF0ZWQgb3B0aW9uc1xuICAgICAgICAgIGlmIChyZXN1bHQuc2l6ZSA+IGZpbGUuc2l6ZSAmJiAhKG9wdGlvbnMud2lkdGggPiAwIHx8IG9wdGlvbnMuaGVpZ2h0ID4gMCB8fCBvcHRpb25zLm1heFdpZHRoIDwgSW5maW5pdHkgfHwgb3B0aW9ucy5tYXhIZWlnaHQgPCBJbmZpbml0eSB8fCBvcHRpb25zLm1pbldpZHRoID4gMCB8fCBvcHRpb25zLm1pbkhlaWdodCA+IDApKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmaWxlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5sYXN0TW9kaWZpZWQgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHJlc3VsdC5sYXN0TW9kaWZpZWREYXRlID0gZGF0ZTtcbiAgICAgICAgICAgIHJlc3VsdC5uYW1lID0gZmlsZS5uYW1lO1xuXG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBleHRlbnNpb24gdG8gbWF0Y2ggaXRzIHR5cGVcbiAgICAgICAgICAgIGlmIChyZXN1bHQubmFtZSAmJiByZXN1bHQudHlwZSAhPT0gZmlsZS50eXBlKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUucmVwbGFjZShSRUdFWFBfRVhURU5TSU9OLCBpbWFnZVR5cGVUb0V4dGVuc2lvbihyZXN1bHQudHlwZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBSZXR1cm5zIG9yaWdpbmFsIGZpbGUgaWYgdGhlIHJlc3VsdCBpcyBudWxsIGluIHNvbWUgY2FzZXMuXG4gICAgICAgICAgcmVzdWx0ID0gZmlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLnJlc3VsdCA9IHJlc3VsdDtcblxuICAgICAgICBpZiAob3B0aW9ucy5zdWNjZXNzKSB7XG4gICAgICAgICAgb3B0aW9ucy5zdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5lcnJvcikge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSW1hZ2VDb21wcmVzc29yO1xufSgpO1xuXG5yZXR1cm4gSW1hZ2VDb21wcmVzc29yO1xuXG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHhrZXNoaS9pbWFnZS1jb21wcmVzc29yL2Rpc3QvaW1hZ2UtY29tcHJlc3Nvci5qc1xuLy8gbW9kdWxlIGlkID0gNjkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyohXG4gKiBOYW1lOiB2dWUtdXBsb2FkLWNvbXBvbmVudFxuICogVmVyc2lvbjogMi42LjNcbiAqIEF1dGhvcjogTGlhbll1ZVxuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwuVnVlVXBsb2FkQ29tcG9uZW50ID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLFxuICAgICAgICBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXG4gICAgICAgIGNzcyA9IFwiXCI7c3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgfWhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG59KSgpO1xuXG52YXIgSW5wdXRGaWxlID0geyByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3ZtID0gdGhpczt2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oO3JldHVybiBfYygnaW5wdXQnLCB7IGF0dHJzOiB7IFwidHlwZVwiOiBcImZpbGVcIiwgXCJuYW1lXCI6IF92bS4kcGFyZW50Lm5hbWUsIFwiaWRcIjogX3ZtLiRwYXJlbnQuaW5wdXRJZCB8fCBfdm0uJHBhcmVudC5uYW1lLCBcImFjY2VwdFwiOiBfdm0uJHBhcmVudC5hY2NlcHQsIFwid2Via2l0ZGlyZWN0b3J5XCI6IF92bS4kcGFyZW50LmRpcmVjdG9yeSAmJiBfdm0uJHBhcmVudC5mZWF0dXJlcy5kaXJlY3RvcnksIFwiZGlyZWN0b3J5XCI6IF92bS4kcGFyZW50LmRpcmVjdG9yeSAmJiBfdm0uJHBhcmVudC5mZWF0dXJlcy5kaXJlY3RvcnksIFwibXVsdGlwbGVcIjogX3ZtLiRwYXJlbnQubXVsdGlwbGUgJiYgX3ZtLiRwYXJlbnQuZmVhdHVyZXMuaHRtbDUgfSwgb246IHsgXCJjaGFuZ2VcIjogX3ZtLmNoYW5nZSB9IH0pO1xuICB9LCBzdGF0aWNSZW5kZXJGbnM6IFtdLFxuICBtZXRob2RzOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiBjaGFuZ2UoZSkge1xuICAgICAgdGhpcy4kZGVzdHJveSgpO1xuICAgICAgdGhpcy4kcGFyZW50LmFkZElucHV0RmlsZShlLnRhcmdldCk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtcbiAgICAgICAgcGFyZW50OiB0aGlzLiRwYXJlbnQsXG4gICAgICAgIGVsOiB0aGlzLiRlbFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4oZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLFxuICAgICAgICBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXG4gICAgICAgIGNzcyA9IFwiIC5maWxlLXVwbG9hZHMgeyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7IHRleHQtYWxpZ246IGNlbnRlcjsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9IC5maWxlLXVwbG9hZHMuZmlsZS11cGxvYWRzLWh0bWw0IGlucHV0W3R5cGU9XFxcImZpbGVcXFwiXSB7IG9wYWNpdHk6IDA7IGZvbnQtc2l6ZTogMjBlbTsgei1pbmRleDogMTsgdG9wOiAwOyBsZWZ0OiAwOyByaWdodDogMDsgYm90dG9tOiAwOyBwb3NpdGlvbjogYWJzb2x1dGU7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IH0gLmZpbGUtdXBsb2Fkcy5maWxlLXVwbG9hZHMtaHRtbDUgaW5wdXRbdHlwZT1cXFwiZmlsZVxcXCJdIHsgb3ZlcmZsb3c6IGhpZGRlbjsgcG9zaXRpb246IGZpeGVkOyB3aWR0aDogMXB4OyBoZWlnaHQ6IDFweDsgei1pbmRleDogLTE7IG9wYWNpdHk6IDA7IH0gXCI7c3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgfWhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG59KSgpO1xuXG52YXIgRmlsZVVwbG9hZCA9IHsgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF92bSA9IHRoaXM7dmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaDtyZXR1cm4gX2MoJ2xhYmVsJywgeyBjbGFzczogX3ZtLmNsYXNzTmFtZSB9LCBbX3ZtLl90KFwiZGVmYXVsdFwiKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2lucHV0LWZpbGUnKV0sIDIpO1xuICB9LCBzdGF0aWNSZW5kZXJGbnM6IFtdLFxuICBjb21wb25lbnRzOiB7XG4gICAgSW5wdXRGaWxlOiBJbnB1dEZpbGVcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBpbnB1dElkOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuXG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2ZpbGUnXG4gICAgfSxcblxuICAgIGFjY2VwdDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcblxuICAgIG11bHRpcGxlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuXG4gICAgfSxcblxuICAgIGFkZEluZGV4OiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgTnVtYmVyXVxuICAgIH0sXG5cbiAgICBkaXJlY3Rvcnk6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW5cbiAgICB9LFxuXG4gICAgcG9zdEFjdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcblxuICAgIHB1dEFjdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcblxuICAgIGhlYWRlcnM6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6IE9iamVjdFxuICAgIH0sXG5cbiAgICBkYXRhOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICBkZWZhdWx0OiBPYmplY3RcbiAgICB9LFxuXG4gICAgdGltZW91dDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBkcm9wOiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG5cbiAgICBkcm9wRGlyZWN0b3J5OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG5cbiAgICBzaXplOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgIGRlZmF1bHQ6IEFycmF5XG4gICAgfSxcblxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6IEFycmF5XG4gICAgfSxcblxuICAgIHRocmVhZDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMVxuICAgIH1cbiAgfSxcblxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmaWxlczogdGhpcy52YWx1ZSxcbiAgICAgIGZlYXR1cmVzOiB7XG4gICAgICAgIGh0bWw1OiB0cnVlLFxuICAgICAgICBkaXJlY3Rvcnk6IGZhbHNlLFxuICAgICAgICBkcmFnOiBmYWxzZVxuICAgICAgfSxcblxuICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgIGRyb3BBY3RpdmU6IGZhbHNlLFxuXG4gICAgICB1cGxvYWRpbmc6IDAsXG5cbiAgICAgIGRlc3Ryb3k6IGZhbHNlXG4gICAgfTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBtb3VudGVkXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LnR5cGUgPSAnZmlsZSc7XG4gICAgaW5wdXQubXVsdGlwbGUgPSB0cnVlO1xuXG4gICAgLy8gaHRtbDUg54m55b6BXG4gICAgaWYgKHdpbmRvdy5Gb3JtRGF0YSAmJiBpbnB1dC5maWxlcykge1xuICAgICAgLy8g5LiK5Lyg55uu5b2V54m55b6BXG4gICAgICBpZiAodHlwZW9mIGlucHV0LndlYmtpdGRpcmVjdG9yeSA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBpbnB1dC5kaXJlY3RvcnkgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLmZlYXR1cmVzLmRpcmVjdG9yeSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIOaLluaLveeJueW+gVxuICAgICAgaWYgKHRoaXMuZmVhdHVyZXMuaHRtbDUgJiYgdHlwZW9mIGlucHV0Lm9uZHJvcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5mZWF0dXJlcy5kcm9wID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mZWF0dXJlcy5odG1sNSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGZpbGVzIOWumuS9jee8k+WtmFxuICAgIHRoaXMubWFwcyA9IHt9O1xuXG4gICAgdGhpcy4kbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyDmm7TmlrDkuIvniLbnuqdcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LiRmb3JjZVVwZGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyDmi5bmi73muLLmn5NcbiAgICAgIHRoaXMud2F0Y2hEcm9wKHRoaXMuZHJvcCk7XG4gICAgfSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogYmVmb3JlRGVzdHJveVxuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIGJlZm9yZURlc3Ryb3k6IGZ1bmN0aW9uIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgLy8g5bey6ZSA5q+BXG4gICAgdGhpcy5kZXN0cm95ID0gdHJ1ZTtcblxuICAgIC8vIOiuvue9ruaIkOS4jea/gOa0u1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH0sXG5cblxuICBjb21wdXRlZDoge1xuICAgIC8qKlxuICAgICAqIHVwbG9hZGluZyDmraPlnKjkuIrkvKDnmoTnur/nqItcbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIHVwbG9hZGVkIOaWh+S7tuWIl+ihqOaYr+WQpuWFqOmDqOW3suS4iuS8oFxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHVwbG9hZGVkOiBmdW5jdGlvbiB1cGxvYWRlZCgpIHtcbiAgICAgIHZhciBmaWxlID0gdm9pZCAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZpbGUgPSB0aGlzLmZpbGVzW2ldO1xuICAgICAgICBpZiAoZmlsZS5maWxlT2JqZWN0ICYmICFmaWxlLmVycm9yICYmICFmaWxlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgY2xhc3NOYW1lOiBmdW5jdGlvbiBjbGFzc05hbWUoKSB7XG4gICAgICByZXR1cm4gWydmaWxlLXVwbG9hZHMnLCB0aGlzLmZlYXR1cmVzLmh0bWw1ID8gJ2ZpbGUtdXBsb2Fkcy1odG1sNScgOiAnZmlsZS11cGxvYWRzLWh0bWw0JywgdGhpcy5mZWF0dXJlcy5kaXJlY3RvcnkgJiYgdGhpcy5kaXJlY3RvcnkgPyAnZmlsZS11cGxvYWRzLWRpcmVjdG9yeScgOiB1bmRlZmluZWQsIHRoaXMuZmVhdHVyZXMuZHJvcCAmJiB0aGlzLmRyb3AgPyAnZmlsZS11cGxvYWRzLWRyb3AnIDogdW5kZWZpbmVkXTtcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBhY3RpdmU6IGZ1bmN0aW9uIGFjdGl2ZShfYWN0aXZlKSB7XG4gICAgICB0aGlzLndhdGNoQWN0aXZlKF9hY3RpdmUpO1xuICAgIH0sXG4gICAgZHJvcEFjdGl2ZTogZnVuY3Rpb24gZHJvcEFjdGl2ZSgpIHtcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQpIHtcbiAgICAgICAgdGhpcy4kcGFyZW50LiRmb3JjZVVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZHJvcDogZnVuY3Rpb24gZHJvcCh2YWx1ZSkge1xuICAgICAgdGhpcy53YXRjaERyb3AodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGZpbGVzKSB7XG4gICAgICBpZiAodGhpcy5maWxlcyA9PT0gZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuXG4gICAgICB2YXIgb2xkTWFwcyA9IHRoaXMubWFwcztcblxuICAgICAgLy8g6YeN5YaZIG1hcHMg57yT5a2YXG4gICAgICB0aGlzLm1hcHMgPSB7fTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZmlsZSA9IHRoaXMuZmlsZXNbaV07XG4gICAgICAgIHRoaXMubWFwc1tmaWxlLmlkXSA9IGZpbGU7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCwgdXBkYXRlXG4gICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5tYXBzKSB7XG4gICAgICAgIHZhciBuZXdGaWxlID0gdGhpcy5tYXBzW2tleV07XG4gICAgICAgIHZhciBvbGRGaWxlID0gb2xkTWFwc1trZXldO1xuICAgICAgICBpZiAobmV3RmlsZSAhPT0gb2xkRmlsZSkge1xuICAgICAgICAgIHRoaXMuZW1pdEZpbGUobmV3RmlsZSwgb2xkRmlsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gZGVsZXRlXG4gICAgICBmb3IgKHZhciBfa2V5IGluIG9sZE1hcHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcHNbX2tleV0pIHtcbiAgICAgICAgICB0aGlzLmVtaXRGaWxlKHVuZGVmaW5lZCwgb2xkTWFwc1tfa2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuXG4gICAgLy8g5riF56m6XG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgaWYgKHRoaXMuZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBmaWxlcyA9IHRoaXMuZmlsZXM7XG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcblxuICAgICAgICAvLyDlrprkvY1cbiAgICAgICAgdGhpcy5tYXBzID0ge307XG5cbiAgICAgICAgLy8g5LqL5Lu2XG4gICAgICAgIHRoaXMuZW1pdElucHV0KCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmVtaXRGaWxlKHVuZGVmaW5lZCwgZmlsZXNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG5cbiAgICAvLyDpgInmi6lcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldChpZCkge1xuICAgICAgaWYgKCFpZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICgodHlwZW9mIGlkID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihpZCkpID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2lkLmlkXSB8fCBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMubWFwc1tpZF0gfHwgZmFsc2U7XG4gICAgfSxcblxuXG4gICAgLy8g5re75YqgXG4gICAgYWRkOiBmdW5jdGlvbiBhZGQoX2ZpbGVzKSB7XG4gICAgICB2YXIgaW5kZXggPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRoaXMuYWRkSW5kZXg7XG5cbiAgICAgIHZhciBmaWxlcyA9IF9maWxlcztcbiAgICAgIHZhciBpc0FycmF5ID0gZmlsZXMgaW5zdGFuY2VvZiBBcnJheTtcblxuICAgICAgLy8g5LiN5piv5pWw57uE5pW055CG5oiQ5pWw57uEXG4gICAgICBpZiAoIWlzQXJyYXkpIHtcbiAgICAgICAgZmlsZXMgPSBbZmlsZXNdO1xuICAgICAgfVxuXG4gICAgICAvLyDpgY3ljobop4TojIPlr7nosaFcbiAgICAgIHZhciBhZGRGaWxlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZmlsZSA9IGZpbGVzW2ldO1xuICAgICAgICBpZiAodGhpcy5mZWF0dXJlcy5odG1sNSAmJiBmaWxlIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgIGZpbGUgPSB7XG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgc2l6ZTogZmlsZS5zaXplLFxuICAgICAgICAgICAgbmFtZTogZmlsZS53ZWJraXRSZWxhdGl2ZVBhdGggfHwgZmlsZS5yZWxhdGl2ZVBhdGggfHwgZmlsZS5uYW1lIHx8ICd1bmtub3duJyxcbiAgICAgICAgICAgIHR5cGU6IGZpbGUudHlwZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZpbGVPYmplY3QgPSBmYWxzZTtcbiAgICAgICAgaWYgKGZpbGUuZmlsZU9iamVjdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAvLyBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKGZpbGUuZmlsZU9iamVjdCkge1xuICAgICAgICAgIGZpbGVPYmplY3QgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlLmVsIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgIGZpbGVPYmplY3QgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlLmZpbGUgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgZmlsZU9iamVjdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbGVPYmplY3QpIHtcbiAgICAgICAgICBmaWxlID0gX2V4dGVuZHMoe1xuICAgICAgICAgICAgZmlsZU9iamVjdDogdHJ1ZSxcbiAgICAgICAgICAgIHNpemU6IC0xLFxuICAgICAgICAgICAgbmFtZTogJ0ZpbGVuYW1lJyxcbiAgICAgICAgICAgIHR5cGU6ICcnLFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiAnJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgcHV0QWN0aW9uOiB0aGlzLnB1dEFjdGlvbixcbiAgICAgICAgICAgIHBvc3RBY3Rpb246IHRoaXMucG9zdEFjdGlvbixcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMudGltZW91dFxuICAgICAgICAgIH0sIGZpbGUsIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiB7fSxcblxuICAgICAgICAgICAgcHJvZ3Jlc3M6ICcwLjAwJywgLy8g5Y+q6K+7XG4gICAgICAgICAgICBzcGVlZDogMCAvLyDlj6ror7tcbiAgICAgICAgICAgIC8vIHhocjogZmFsc2UsICAgICAgICAgICAgICAgIC8vIOWPquivu1xuICAgICAgICAgICAgLy8gaWZyYW1lOiBmYWxzZSwgICAgICAgICAgICAgLy8g5Y+q6K+7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmaWxlLmRhdGEgPSBfZXh0ZW5kcyh7fSwgdGhpcy5kYXRhLCBmaWxlLmRhdGEgPyBmaWxlLmRhdGEgOiB7fSk7XG5cbiAgICAgICAgICBmaWxlLmhlYWRlcnMgPSBfZXh0ZW5kcyh7fSwgdGhpcy5oZWFkZXJzLCBmaWxlLmhlYWRlcnMgPyBmaWxlLmhlYWRlcnMgOiB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlv4XpobvljIXlkKsgaWRcbiAgICAgICAgaWYgKCFmaWxlLmlkKSB7XG4gICAgICAgICAgZmlsZS5pZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVtaXRGaWx0ZXIoZmlsZSwgdW5kZWZpbmVkKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkRmlsZXMucHVzaChmaWxlKTtcblxuICAgICAgICAvLyDlj6rlhYHorrjljZXkuKrmlofku7ZcbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8g5rKh5pyJ5paH5Lu2XG4gICAgICBpZiAoIWFkZEZpbGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIOWPquWFgeiuuOWNleS4quaWh+S7tiDliKDpmaTmiYDmnIlcbiAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIOa3u+WKoOi/m+WOuyBmaWxlc1xuICAgICAgdmFyIG5ld0ZpbGVzID0gdm9pZCAwO1xuICAgICAgaWYgKGluZGV4ID09PSB0cnVlIHx8IGluZGV4ID09PSAwKSB7XG4gICAgICAgIG5ld0ZpbGVzID0gYWRkRmlsZXMuY29uY2F0KHRoaXMuZmlsZXMpO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCkge1xuICAgICAgICBuZXdGaWxlcyA9IGFkZEZpbGVzLmNvbmNhdChbXSk7XG4gICAgICAgIG5ld0ZpbGVzLnNwbGljZShpbmRleCwgMCwgYWRkRmlsZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3RmlsZXMgPSB0aGlzLmZpbGVzLmNvbmNhdChhZGRGaWxlcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlsZXMgPSBuZXdGaWxlcztcblxuICAgICAgLy8g5a6a5L2NXG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYWRkRmlsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBfZmlsZTIgPSBhZGRGaWxlc1tfaV07XG4gICAgICAgIHRoaXMubWFwc1tfZmlsZTIuaWRdID0gX2ZpbGUyO1xuICAgICAgfVxuXG4gICAgICAvLyDkuovku7ZcbiAgICAgIHRoaXMuZW1pdElucHV0KCk7XG4gICAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBhZGRGaWxlcy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICAgIHRoaXMuZW1pdEZpbGUoYWRkRmlsZXNbX2kyXSwgdW5kZWZpbmVkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlzQXJyYXkgPyBhZGRGaWxlcyA6IGFkZEZpbGVzWzBdO1xuICAgIH0sXG5cblxuICAgIC8vIOa3u+WKoOihqOWNleaWh+S7tlxuICAgIGFkZElucHV0RmlsZTogZnVuY3Rpb24gYWRkSW5wdXRGaWxlKGVsKSB7XG4gICAgICB2YXIgZmlsZXMgPSBbXTtcbiAgICAgIGlmIChlbC5maWxlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZpbGUgPSBlbC5maWxlc1tpXTtcbiAgICAgICAgICBmaWxlcy5wdXNoKHtcbiAgICAgICAgICAgIHNpemU6IGZpbGUuc2l6ZSxcbiAgICAgICAgICAgIG5hbWU6IGZpbGUud2Via2l0UmVsYXRpdmVQYXRoIHx8IGZpbGUucmVsYXRpdmVQYXRoIHx8IGZpbGUubmFtZSxcbiAgICAgICAgICAgIHR5cGU6IGZpbGUudHlwZSxcbiAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICBlbDogZWxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlsZXMucHVzaCh7XG4gICAgICAgICAgbmFtZTogZWwudmFsdWUucmVwbGFjZSgvXi4qPyhbXlxcL1xcXFxcXHJcXG5dKykkLywgJyQxJyksXG4gICAgICAgICAgZWw6IGVsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYWRkKGZpbGVzKTtcbiAgICB9LFxuXG5cbiAgICAvLyDmt7vliqAgRGF0YVRyYW5zZmVyXG4gICAgYWRkRGF0YVRyYW5zZmVyOiBmdW5jdGlvbiBhZGREYXRhVHJhbnNmZXIoZGF0YVRyYW5zZmVyKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgZmlsZXMgPSBbXTtcbiAgICAgIGlmIChkYXRhVHJhbnNmZXIuaXRlbXMgJiYgZGF0YVRyYW5zZmVyLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhVHJhbnNmZXIuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFUcmFuc2Zlci5pdGVtc1tpXTtcbiAgICAgICAgICBpZiAoaXRlbS5nZXRBc0VudHJ5KSB7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5nZXRBc0VudHJ5KCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtLndlYmtpdEdldEFzRW50cnkpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLndlYmtpdEdldEFzRW50cnkoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0uZ2V0QXNGaWxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgdmFyIGZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGkpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgICAvLyDnu5PmnZ8g5oiW6ICF5bey5pyJ5paH5Lu25LqGXG4gICAgICAgICAgICBpZiAoIWl0ZW0gfHwgIV90aGlzLm11bHRpcGxlICYmIGZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpcy5hZGQoZmlsZXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmdldEVudHJ5KGl0ZW0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgZmlsZXMucHVzaC5hcHBseShmaWxlcywgX3RvQ29uc3VtYWJsZUFycmF5KHJlc3VsdHMpKTtcbiAgICAgICAgICAgICAgZm9yRWFjaChpICsgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGZvckVhY2goMCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBkYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoOyBfaTMrKykge1xuICAgICAgICAgIGZpbGVzLnB1c2goZGF0YVRyYW5zZmVyLmZpbGVzW19pM10pO1xuICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5hZGQoZmlsZXMpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgfSxcblxuXG4gICAgLy8g6I635b6XIGVudHJ5XG4gICAgZ2V0RW50cnk6IGZ1bmN0aW9uIGdldEVudHJ5KGVudHJ5KSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHBhdGggPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICcnO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoZW50cnkuaXNGaWxlKSB7XG4gICAgICAgICAgZW50cnkuZmlsZShmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgICAgcmVzb2x2ZShbe1xuICAgICAgICAgICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICAgICAgICAgIG5hbWU6IHBhdGggKyBmaWxlLm5hbWUsXG4gICAgICAgICAgICAgIHR5cGU6IGZpbGUudHlwZSxcbiAgICAgICAgICAgICAgZmlsZTogZmlsZVxuICAgICAgICAgICAgfV0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5ICYmIF90aGlzMi5kcm9wRGlyZWN0b3J5KSB7XG4gICAgICAgICAgZW50cnkuY3JlYXRlUmVhZGVyKCkucmVhZEVudHJpZXMoZnVuY3Rpb24gKGVudHJpZXMpIHtcbiAgICAgICAgICAgIHZhciBmaWxlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGkpIHtcbiAgICAgICAgICAgICAgaWYgKCFlbnRyaWVzW2ldIHx8IGZpbGVzLmxlbmd0aCAmJiAhX3RoaXMyLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZmlsZXMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF90aGlzMi5nZXRFbnRyeShlbnRyaWVzW2ldLCBwYXRoICsgZW50cnkubmFtZSArICcvJykudGhlbihmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGZpbGVzLnB1c2guYXBwbHkoZmlsZXMsIF90b0NvbnN1bWFibGVBcnJheShyZXN1bHRzKSk7XG4gICAgICAgICAgICAgICAgZm9yRWFjaChpICsgMSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvckVhY2goMCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShpZDEsIGlkMikge1xuICAgICAgdmFyIGZpbGUxID0gdGhpcy5nZXQoaWQxKTtcbiAgICAgIHZhciBmaWxlMiA9IHRoaXMuZ2V0KGlkMik7XG4gICAgICBpZiAoIWZpbGUxIHx8ICFmaWxlMiB8fCBmaWxlMSA9PT0gZmlsZTIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIGZpbGVzID0gdGhpcy5maWxlcy5jb25jYXQoW10pO1xuICAgICAgdmFyIGluZGV4MSA9IGZpbGVzLmluZGV4T2YoZmlsZTEpO1xuICAgICAgdmFyIGluZGV4MiA9IGZpbGVzLmluZGV4T2YoZmlsZTIpO1xuICAgICAgaWYgKGluZGV4MSA9PT0gLTEgfHwgaW5kZXgyID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBmaWxlc1tpbmRleDFdID0gZmlsZTI7XG4gICAgICBmaWxlc1tpbmRleDJdID0gZmlsZTE7XG4gICAgICB0aGlzLmZpbGVzID0gZmlsZXM7XG4gICAgICB0aGlzLmVtaXRJbnB1dCgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuXG4gICAgLy8g56e76ZmkXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoaWQpIHtcbiAgICAgIHZhciBmaWxlID0gdGhpcy5nZXQoaWQpO1xuICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZW1pdEZpbHRlcih1bmRlZmluZWQsIGZpbGUpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaWxlcyA9IHRoaXMuZmlsZXMuY29uY2F0KFtdKTtcbiAgICAgICAgdmFyIGluZGV4ID0gZmlsZXMuaW5kZXhPZihmaWxlKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlbW92ZScsIGZpbGUpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLmZpbGVzID0gZmlsZXM7XG5cbiAgICAgICAgLy8g5a6a5L2NXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1hcHNbZmlsZS5pZF07XG5cbiAgICAgICAgLy8g5LqL5Lu2XG4gICAgICAgIHRoaXMuZW1pdElucHV0KCk7XG4gICAgICAgIHRoaXMuZW1pdEZpbGUodW5kZWZpbmVkLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaWxlO1xuICAgIH0sXG5cblxuICAgIC8vIOabtOaWsFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGlkLCBkYXRhKSB7XG4gICAgICB2YXIgZmlsZSA9IHRoaXMuZ2V0KGlkKTtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgIHZhciBuZXdGaWxlID0gX2V4dGVuZHMoe30sIGZpbGUsIGRhdGEpO1xuICAgICAgICAvLyDlgZznlKjlv4XpobvliqDkuIrplJnor69cbiAgICAgICAgaWYgKGZpbGUuZmlsZU9iamVjdCAmJiBmaWxlLmFjdGl2ZSAmJiAhbmV3RmlsZS5hY3RpdmUgJiYgIW5ld0ZpbGUuZXJyb3IgJiYgIW5ld0ZpbGUuc3VjY2Vzcykge1xuICAgICAgICAgIG5ld0ZpbGUuZXJyb3IgPSAnYWJvcnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZW1pdEZpbHRlcihuZXdGaWxlLCBmaWxlKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmaWxlcyA9IHRoaXMuZmlsZXMuY29uY2F0KFtdKTtcbiAgICAgICAgdmFyIGluZGV4ID0gZmlsZXMuaW5kZXhPZihmaWxlKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZScsIGZpbGUpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmaWxlcy5zcGxpY2UoaW5kZXgsIDEsIG5ld0ZpbGUpO1xuICAgICAgICB0aGlzLmZpbGVzID0gZmlsZXM7XG5cbiAgICAgICAgLy8g5Yig6ZmkICDml6flrprkvY0g5YaZ5YWlIOaWsOWumuS9jSDvvIjlt7Lkvr/mlK/mjIHkv67mlLlpZClcbiAgICAgICAgZGVsZXRlIHRoaXMubWFwc1tmaWxlLmlkXTtcbiAgICAgICAgdGhpcy5tYXBzW25ld0ZpbGUuaWRdID0gbmV3RmlsZTtcblxuICAgICAgICAvLyDkuovku7ZcbiAgICAgICAgdGhpcy5lbWl0SW5wdXQoKTtcbiAgICAgICAgdGhpcy5lbWl0RmlsZShuZXdGaWxlLCBmaWxlKTtcbiAgICAgICAgcmV0dXJuIG5ld0ZpbGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuXG4gICAgLy8g6aKE5aSE55CGIOS6i+S7tiDov4fmu6TlmahcbiAgICBlbWl0RmlsdGVyOiBmdW5jdGlvbiBlbWl0RmlsdGVyKG5ld0ZpbGUsIG9sZEZpbGUpIHtcbiAgICAgIHZhciBpc1ByZXZlbnQgPSBmYWxzZTtcbiAgICAgIHRoaXMuJGVtaXQoJ2lucHV0LWZpbHRlcicsIG5ld0ZpbGUsIG9sZEZpbGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXNQcmV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGlzUHJldmVudDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGlzUHJldmVudDtcbiAgICB9LFxuXG5cbiAgICAvLyDlpITnkIblkI4g5LqL5Lu2IOWIhuWPkVxuICAgIGVtaXRGaWxlOiBmdW5jdGlvbiBlbWl0RmlsZShuZXdGaWxlLCBvbGRGaWxlKSB7XG4gICAgICB0aGlzLiRlbWl0KCdpbnB1dC1maWxlJywgbmV3RmlsZSwgb2xkRmlsZSk7XG4gICAgICBpZiAobmV3RmlsZSAmJiBuZXdGaWxlLmZpbGVPYmplY3QgJiYgbmV3RmlsZS5hY3RpdmUgJiYgKCFvbGRGaWxlIHx8ICFvbGRGaWxlLmFjdGl2ZSkpIHtcbiAgICAgICAgdGhpcy51cGxvYWRpbmcrKztcbiAgICAgICAgLy8g5r+A5rS7XG4gICAgICAgIHRoaXMuJG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMzLnVwbG9hZChuZXdGaWxlKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICAgIG5ld0ZpbGUgPSBfdGhpczMuZ2V0KG5ld0ZpbGUpO1xuICAgICAgICAgICAgICBpZiAobmV3RmlsZSAmJiBuZXdGaWxlLmZpbGVPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBfdGhpczMudXBkYXRlKG5ld0ZpbGUsIHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOiAhbmV3RmlsZS5lcnJvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICBfdGhpczMudXBkYXRlKG5ld0ZpbGUsIHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlLmNvZGUgfHwgZS5lcnJvciB8fCBlLm1lc3NhZ2UgfHwgZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiA1MCArIDUwLCAxMCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoKCFuZXdGaWxlIHx8ICFuZXdGaWxlLmZpbGVPYmplY3QgfHwgIW5ld0ZpbGUuYWN0aXZlKSAmJiBvbGRGaWxlICYmIG9sZEZpbGUuZmlsZU9iamVjdCAmJiBvbGRGaWxlLmFjdGl2ZSkge1xuICAgICAgICAvLyDlgZzmraJcbiAgICAgICAgdGhpcy51cGxvYWRpbmctLTtcbiAgICAgIH1cblxuICAgICAgLy8g6Ieq5Yqo5bu257ut5r+A5rS7XG4gICAgICBpZiAodGhpcy5hY3RpdmUgJiYgKEJvb2xlYW4obmV3RmlsZSkgIT09IEJvb2xlYW4ob2xkRmlsZSkgfHwgbmV3RmlsZS5hY3RpdmUgIT09IG9sZEZpbGUuYWN0aXZlKSkge1xuICAgICAgICB0aGlzLndhdGNoQWN0aXZlKHRydWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZW1pdElucHV0OiBmdW5jdGlvbiBlbWl0SW5wdXQoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHRoaXMuZmlsZXMpO1xuICAgIH0sXG5cblxuICAgIC8vIOS4iuS8oFxuICAgIHVwbG9hZDogZnVuY3Rpb24gdXBsb2FkKGlkKSB7XG4gICAgICB2YXIgZmlsZSA9IHRoaXMuZ2V0KGlkKTtcblxuICAgICAgLy8g6KKr5Yig6ZmkXG4gICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdub3RfZXhpc3RzJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIOS4jeaYr+aWh+S7tuWvueixoVxuICAgICAgaWYgKCFmaWxlLmZpbGVPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdmaWxlX29iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICAvLyDmnInplJnor6/nm7TmjqXlk43lupRcbiAgICAgIGlmIChmaWxlLmVycm9yKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChmaWxlLmVycm9yKTtcbiAgICAgIH1cblxuICAgICAgLy8g5bey5a6M5oiQ55u05o6l5ZON5bqUXG4gICAgICBpZiAoZmlsZS5zdWNjZXNzKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmlsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIOWQjue8gFxuICAgICAgdmFyIGV4dGVuc2lvbnMgPSB0aGlzLmV4dGVuc2lvbnM7XG4gICAgICBpZiAoZXh0ZW5zaW9ucyAmJiAoZXh0ZW5zaW9ucy5sZW5ndGggfHwgdHlwZW9mIGV4dGVuc2lvbnMubGVuZ3RoID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgZXh0ZW5zaW9ucyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoZXh0ZW5zaW9ucykpICE9PSAnb2JqZWN0JyB8fCAhKGV4dGVuc2lvbnMgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBleHRlbnNpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnMuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBleHRlbnNpb25zID0gbmV3IFJlZ0V4cCgnXFxcXC4oJyArIGV4dGVuc2lvbnMuam9pbignfCcpLnJlcGxhY2UoL1xcLi9nLCAnXFxcXC4nKSArICcpJCcsICdpJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbGUubmFtZS5zZWFyY2goZXh0ZW5zaW9ucykgPT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdleHRlbnNpb24nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyDlpKflsI9cbiAgICAgIGlmICh0aGlzLnNpemUgPiAwICYmIGZpbGUuc2l6ZSA+PSAwICYmIGZpbGUuc2l6ZSA+IHRoaXMuc2l6ZSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ3NpemUnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZmVhdHVyZXMuaHRtbDUgJiYgZmlsZS5wdXRBY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkUHV0KGZpbGUpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmZlYXR1cmVzLmh0bWw1KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZEh0bWw1KGZpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkSHRtbDQoZmlsZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB1cGxvYWRQdXQ6IGZ1bmN0aW9uIHVwbG9hZFB1dChmaWxlKSB7XG4gICAgICB2YXIgcXVlcnlzID0gW107XG4gICAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gZmlsZS5kYXRhKSB7XG4gICAgICAgIHZhbHVlID0gZmlsZS5kYXRhW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcXVlcnlzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHF1ZXJ5U3RyaW5nID0gcXVlcnlzLmxlbmd0aCA/IChmaWxlLnB1dEFjdGlvbi5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHF1ZXJ5cy5qb2luKCcmJykgOiAnJztcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vcGVuKCdQVVQnLCBmaWxlLnB1dEFjdGlvbiArIHF1ZXJ5U3RyaW5nKTtcbiAgICAgIHJldHVybiB0aGlzLnVwbG9hZFhocih4aHIsIGZpbGUsIGZpbGUuZmlsZSk7XG4gICAgfSxcbiAgICB1cGxvYWRIdG1sNTogZnVuY3Rpb24gdXBsb2FkSHRtbDUoZmlsZSkge1xuICAgICAgdmFyIGZvcm0gPSBuZXcgd2luZG93LkZvcm1EYXRhKCk7XG4gICAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gZmlsZS5kYXRhKSB7XG4gICAgICAgIHZhbHVlID0gZmlsZS5kYXRhW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSAmJiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICAgICAgICBmb3JtLmFwcGVuZChrZXksIHZhbHVlLCB2YWx1ZS5uYW1lKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9ybS5hcHBlbmQoa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm9ybS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvcm0uYXBwZW5kKHRoaXMubmFtZSwgZmlsZS5maWxlLCBmaWxlLmZpbGUuZmlsZW5hbWUgfHwgZmlsZS5uYW1lKTtcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vcGVuKCdQT1NUJywgZmlsZS5wb3N0QWN0aW9uKTtcbiAgICAgIHJldHVybiB0aGlzLnVwbG9hZFhocih4aHIsIGZpbGUsIGZvcm0pO1xuICAgIH0sXG4gICAgdXBsb2FkWGhyOiBmdW5jdGlvbiB1cGxvYWRYaHIoeGhyLCBfZmlsZSwgYm9keSkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHZhciBmaWxlID0gX2ZpbGU7XG4gICAgICB2YXIgc3BlZWRUaW1lID0gMDtcbiAgICAgIHZhciBzcGVlZExvYWRlZCA9IDA7XG5cbiAgICAgIC8vIOi/m+W6puadoVxuICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8g6L+Y5pyq5byA5aeL5LiK5LygIOW3suWIoOmZpCDmnKrmv4DmtLtcbiAgICAgICAgZmlsZSA9IF90aGlzNC5nZXQoZmlsZSk7XG4gICAgICAgIGlmICghZS5sZW5ndGhDb21wdXRhYmxlIHx8ICFmaWxlIHx8ICFmaWxlLmZpbGVPYmplY3QgfHwgIWZpbGUuYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6L+b5bqmIOmAn+W6piDmr4/np5Lmm7TmlrDkuIDmrKFcbiAgICAgICAgdmFyIHNwZWVkVGltZTIgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgaWYgKHNwZWVkVGltZTIgPT09IHNwZWVkVGltZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzcGVlZFRpbWUgPSBzcGVlZFRpbWUyO1xuXG4gICAgICAgIGZpbGUgPSBfdGhpczQudXBkYXRlKGZpbGUsIHtcbiAgICAgICAgICBwcm9ncmVzczogKGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMCkudG9GaXhlZCgyKSxcbiAgICAgICAgICBzcGVlZDogZS5sb2FkZWQgLSBzcGVlZExvYWRlZFxuICAgICAgICB9KTtcbiAgICAgICAgc3BlZWRMb2FkZWQgPSBlLmxvYWRlZDtcbiAgICAgIH07XG5cbiAgICAgIC8vIOajgOafpea/gOa0u+eKtuaAgVxuICAgICAgdmFyIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBmaWxlID0gX3RoaXM0LmdldChmaWxlKTtcbiAgICAgICAgaWYgKGZpbGUgJiYgZmlsZS5maWxlT2JqZWN0ICYmICFmaWxlLnN1Y2Nlc3MgJiYgIWZpbGUuZXJyb3IgJiYgZmlsZS5hY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW50ZXJ2YWwpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICBpbnRlcnZhbCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgICB4aHIudGltZW91dCA9IDE7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9LCAxMDApO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgY29tcGxldGUgPSB2b2lkIDA7XG4gICAgICAgIHZhciBmbiA9IGZ1bmN0aW9uIGZuKGUpIHtcbiAgICAgICAgICAvLyDlt7Lnu4/lpITnkIbov4fkuoZcbiAgICAgICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICBpbnRlcnZhbCA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZpbGUgPSBfdGhpczQuZ2V0KGZpbGUpO1xuXG4gICAgICAgICAgLy8g5LiN5a2Y5Zyo55u05o6l5ZON5bqUXG4gICAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdub3RfZXhpc3RzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5LiN5piv5paH5Lu25a+56LGhXG4gICAgICAgICAgaWYgKCFmaWxlLmZpbGVPYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoJ2ZpbGVfb2JqZWN0Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5pyJ6ZSZ6K+v6Ieq5Yqo5ZON5bqUXG4gICAgICAgICAgaWYgKGZpbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZmlsZS5lcnJvcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5pyq5r+A5rS7XG4gICAgICAgICAgaWYgKCFmaWxlLmFjdGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnYWJvcnQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyDlt7LlrozmiJAg55u05o6l55u45bqUXG4gICAgICAgICAgaWYgKGZpbGUuc3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZmlsZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRhdGEgPSB7fTtcblxuICAgICAgICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICd0aW1lb3V0JzpcbiAgICAgICAgICAgIGNhc2UgJ2Fib3J0JzpcbiAgICAgICAgICAgICAgZGF0YS5lcnJvciA9IGUudHlwZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgIGlmICgheGhyLnN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRhdGEuZXJyb3IgPSAnbmV0d29yayc7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoeGhyLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ3NlcnZlcic7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoeGhyLnN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ2RlbmllZCc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ3NlcnZlcic7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoeGhyLnN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ2RlbmllZCc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YS5wcm9ncmVzcyA9ICcxMDAuMDAnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQpIHtcbiAgICAgICAgICAgIHZhciBjb250ZW50VHlwZSA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgICAgICAgICBpZiAoY29udGVudFR5cGUgJiYgY29udGVudFR5cGUuaW5kZXhPZignL2pzb24nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgZGF0YS5yZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkYXRhLnJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyDmm7TmlrBcbiAgICAgICAgICBmaWxlID0gX3RoaXM0LnVwZGF0ZShmaWxlLCBkYXRhKTtcblxuICAgICAgICAgIC8vIOebuOW6lOmUmeivr1xuICAgICAgICAgIGlmIChmaWxlLmVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGZpbGUuZXJyb3IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIOWTjeW6lFxuICAgICAgICAgIHJldHVybiByZXNvbHZlKGZpbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOS6i+S7tlxuICAgICAgICB4aHIub25sb2FkID0gZm47XG4gICAgICAgIHhoci5vbmVycm9yID0gZm47XG4gICAgICAgIHhoci5vbmFib3J0ID0gZm47XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmbjtcblxuICAgICAgICAvLyDotoXml7ZcbiAgICAgICAgaWYgKGZpbGUudGltZW91dCkge1xuICAgICAgICAgIHhoci50aW1lb3V0ID0gZmlsZS50aW1lb3V0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGVhZGVyc1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZmlsZS5oZWFkZXJzKSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBmaWxlLmhlYWRlcnNba2V5XSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmm7TmlrAgeGhyXG4gICAgICAgIGZpbGUgPSBfdGhpczQudXBkYXRlKGZpbGUsIHsgeGhyOiB4aHIgfSk7XG5cbiAgICAgICAgLy8g5byA5aeL5LiK5LygXG4gICAgICAgIHhoci5zZW5kKGJvZHkpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGxvYWRIdG1sNDogZnVuY3Rpb24gdXBsb2FkSHRtbDQoX2ZpbGUpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB2YXIgZmlsZSA9IF9maWxlO1xuICAgICAgdmFyIG9uS2V5ZG93biA9IGZ1bmN0aW9uIG9uS2V5ZG93bihlKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBpZnJhbWUuaWQgPSAndXBsb2FkLWlmcmFtZS0nICsgZmlsZS5pZDtcbiAgICAgIGlmcmFtZS5uYW1lID0gJ3VwbG9hZC1pZnJhbWUtJyArIGZpbGUuaWQ7XG4gICAgICBpZnJhbWUuc3JjID0gJ2Fib3V0OmJsYW5rJztcbiAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3dpZHRoOjFweDtoZWlnaHQ6MXB4O3RvcDotOTk5ZW07cG9zaXRpb246YWJzb2x1dGU7IG1hcmdpbi10b3A6LTk5OWVtOycpO1xuXG4gICAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcblxuICAgICAgZm9ybS5hY3Rpb24gPSBmaWxlLnBvc3RBY3Rpb247XG5cbiAgICAgIGZvcm0ubmFtZSA9ICd1cGxvYWQtZm9ybS0nICsgZmlsZS5pZDtcblxuICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsICdQT1NUJyk7XG4gICAgICBmb3JtLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ3VwbG9hZC1pZnJhbWUtJyArIGZpbGUuaWQpO1xuICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2VuY3R5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpO1xuXG4gICAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gICAgICB2YXIgaW5wdXQgPSB2b2lkIDA7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gZmlsZS5kYXRhKSB7XG4gICAgICAgIHZhbHVlID0gZmlsZS5kYXRhW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSAmJiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICBpbnB1dC50eXBlID0gJ2hpZGRlbic7XG4gICAgICAgICAgaW5wdXQubmFtZSA9IGtleTtcbiAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9ybS5hcHBlbmRDaGlsZChmaWxlLmVsKTtcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICB2YXIgZ2V0UmVzcG9uc2VEYXRhID0gZnVuY3Rpb24gZ2V0UmVzcG9uc2VEYXRhKCkge1xuICAgICAgICB2YXIgZG9jID0gdm9pZCAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgZG9jID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRvYyA9IGlmcmFtZS5jb250ZW50RG9jdW1lbnQgPyBpZnJhbWUuY29udGVudERvY3VtZW50IDogaWZyYW1lLmRvY3VtZW50O1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgZG9jID0gaWZyYW1lLmRvY3VtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9jICYmIGRvYy5ib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIGRvYy5ib2R5LmlubmVySFRNTDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZpbGUgPSBfdGhpczUudXBkYXRlKGZpbGUsIHsgaWZyYW1lOiBpZnJhbWUgfSk7XG5cbiAgICAgICAgICAvLyDkuI3lrZjlnKhcbiAgICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoJ25vdF9leGlzdHMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyDlrprml7bmo4Dmn6VcbiAgICAgICAgICB2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmaWxlID0gX3RoaXM1LmdldChmaWxlKTtcbiAgICAgICAgICAgIGlmIChmaWxlICYmIGZpbGUuZmlsZU9iamVjdCAmJiAhZmlsZS5zdWNjZXNzICYmICFmaWxlLmVycm9yICYmIGZpbGUuYWN0aXZlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGludGVydmFsKSB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICBpbnRlcnZhbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZnJhbWUub25hYm9ydCh7IHR5cGU6IGZpbGUgPyAnYWJvcnQnIDogJ25vdF9leGlzdHMnIH0pO1xuICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICB2YXIgY29tcGxldGUgPSB2b2lkIDA7XG4gICAgICAgICAgdmFyIGZuID0gZnVuY3Rpb24gZm4oZSkge1xuICAgICAgICAgICAgLy8g5bey57uP5aSE55CG6L+H5LqGXG4gICAgICAgICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcGxldGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgIGludGVydmFsID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIOWFs+mXrSBlc2Mg5LqL5Lu2XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pO1xuXG4gICAgICAgICAgICBmaWxlID0gX3RoaXM1LmdldChmaWxlKTtcblxuICAgICAgICAgICAgLy8g5LiN5a2Y5Zyo55u05o6l5ZON5bqUXG4gICAgICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnbm90X2V4aXN0cycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDkuI3mmK/mlofku7blr7nosaFcbiAgICAgICAgICAgIGlmICghZmlsZS5maWxlT2JqZWN0KSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ2ZpbGVfb2JqZWN0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIOaciemUmeivr+iHquWKqOWTjeW6lFxuICAgICAgICAgICAgaWYgKGZpbGUuZXJyb3IpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChmaWxlLmVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g5pyq5r+A5rS7XG4gICAgICAgICAgICBpZiAoIWZpbGUuYWN0aXZlKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ2Fib3J0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIOW3suWujOaIkCDnm7TmjqXnm7jlupRcbiAgICAgICAgICAgIGlmIChmaWxlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZmlsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IGdldFJlc3BvbnNlRGF0YSgpO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ2Fib3J0JzpcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ2Fib3J0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgIGlmIChmaWxlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gZmlsZS5lcnJvcjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ25ldHdvcmsnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ2RlbmllZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChmaWxlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gZmlsZS5lcnJvcjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGRhdGEuZXJyb3IgPSAnbmV0d29yayc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGRhdGEucHJvZ3Jlc3MgPSAnMTAwLjAwJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3Vic3RyKDAsIDEpID09PSAneycgJiYgcmVzcG9uc2Uuc3Vic3RyKHJlc3BvbnNlLmxlbmd0aCAtIDEsIDEpID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGF0YS5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDmm7TmlrBcbiAgICAgICAgICAgIGZpbGUgPSBfdGhpczUudXBkYXRlKGZpbGUsIGRhdGEpO1xuXG4gICAgICAgICAgICBpZiAoZmlsZS5lcnJvcikge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGZpbGUuZXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDlk43lupRcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGZpbGUpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyDmt7vliqDkuovku7ZcbiAgICAgICAgICBpZnJhbWUub25sb2FkID0gZm47XG4gICAgICAgICAgaWZyYW1lLm9uZXJyb3IgPSBmbjtcbiAgICAgICAgICBpZnJhbWUub25hYm9ydCA9IGZuO1xuXG4gICAgICAgICAgLy8g56aB5q2iIGVzYyDplK5cbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleWRvd24pO1xuXG4gICAgICAgICAgLy8g5o+Q5LqkXG4gICAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgfSwgNTApO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmcmFtZS5wYXJlbnROb2RlICYmIGlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmcmFtZS5wYXJlbnROb2RlICYmIGlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHdhdGNoQWN0aXZlOiBmdW5jdGlvbiB3YXRjaEFjdGl2ZShhY3RpdmUpIHtcbiAgICAgIHZhciBmaWxlID0gdm9pZCAwO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIHdoaWxlIChmaWxlID0gdGhpcy5maWxlc1tpbmRleF0pIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgaWYgKCFmaWxlLmZpbGVPYmplY3QpIHtcbiAgICAgICAgICAvLyDkuI3mmK/mlofku7blr7nosaFcbiAgICAgICAgfSBlbHNlIGlmIChhY3RpdmUgJiYgIXRoaXMuZGVzdHJveSkge1xuICAgICAgICAgIGlmICh0aGlzLnVwbG9hZGluZyA+PSB0aGlzLnRocmVhZCB8fCB0aGlzLnVwbG9hZGluZyAmJiAhdGhpcy5mZWF0dXJlcy5odG1sNSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZmlsZS5hY3RpdmUgJiYgIWZpbGUuZXJyb3IgJiYgIWZpbGUuc3VjY2Vzcykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoZmlsZSwgeyBhY3RpdmU6IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChmaWxlLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoZmlsZSwgeyBhY3RpdmU6IGZhbHNlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMudXBsb2FkaW5nID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICB3YXRjaERyb3A6IGZ1bmN0aW9uIHdhdGNoRHJvcChfZWwpIHtcbiAgICAgIHZhciBlbCA9IF9lbDtcbiAgICAgIGlmICghdGhpcy5mZWF0dXJlcy5kcm9wKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8g56e76Zmk5oyC6L29XG4gICAgICBpZiAodGhpcy5kcm9wRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIHRoaXMub25EcmFnZW50ZXIsIGZhbHNlKTtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLm9uRHJhZ2xlYXZlLCBmYWxzZSk7XG4gICAgICAgICAgdGhpcy5kcm9wRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMub25EcmFnb3ZlciwgZmFsc2UpO1xuICAgICAgICAgIHRoaXMuZHJvcEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMub25Ecm9wLCBmYWxzZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9XG5cbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgZWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpIHx8IHRoaXMuJHJvb3QuJGVsLnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgICAgfSBlbHNlIGlmIChlbCA9PT0gdHJ1ZSkge1xuICAgICAgICBlbCA9IHRoaXMuJHBhcmVudC4kZWw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJvcEVsZW1lbnQgPSBlbDtcblxuICAgICAgaWYgKHRoaXMuZHJvcEVsZW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcy5vbkRyYWdlbnRlciwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLm9uRHJhZ2xlYXZlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZHJvcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLm9uRHJhZ292ZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5kcm9wRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5vbkRyb3AsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uRHJhZ2VudGVyOiBmdW5jdGlvbiBvbkRyYWdlbnRlcihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoIXRoaXMuZHJvcEFjdGl2ZSkge1xuICAgICAgICB0aGlzLmRyb3BBY3RpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgb25EcmFnbGVhdmU6IGZ1bmN0aW9uIG9uRHJhZ2xlYXZlKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChlLnRhcmdldC5ub2RlTmFtZSA9PT0gJ0hUTUwnIHx8IGUuc2NyZWVuWCA9PT0gMCAmJiBlLnNjcmVlblkgPT09IDAgJiYgZS5zY3JlZW5ZID09PSAwICYmICFlLmZyb21FbGVtZW50ICYmIGUub2Zmc2V0WCA8IDApIHtcbiAgICAgICAgdGhpcy5kcm9wQWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBvbkRyYWdvdmVyOiBmdW5jdGlvbiBvbkRyYWdvdmVyKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIG9uRHJvcDogZnVuY3Rpb24gb25Ecm9wKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZHJvcEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5hZGREYXRhVHJhbnNmZXIoZS5kYXRhVHJhbnNmZXIpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIEZpbGVVcGxvYWQkMSA9IE9iamVjdC5mcmVlemUoe1xuXHRkZWZhdWx0OiBGaWxlVXBsb2FkXG59KTtcblxudmFyIHJlcXVpcmUkJDAgPSAoIEZpbGVVcGxvYWQkMSAmJiBGaWxlVXBsb2FkICkgfHwgRmlsZVVwbG9hZCQxO1xuXG52YXIgc3JjID0gcmVxdWlyZSQkMDtcblxucmV0dXJuIHNyYztcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZ1ZS11cGxvYWQtY29tcG9uZW50LmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXVwbG9hZC1jb21wb25lbnQvZGlzdC92dWUtdXBsb2FkLWNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gNjkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3ZhbHVlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAxMyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC52YWx1ZXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3ZhbHVlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjkzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAxMyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC12YWx1ZXMtZW50cmllc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkdmFsdWVzID0gcmVxdWlyZSgnLi9fb2JqZWN0LXRvLWFycmF5JykoZmFsc2UpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoaXQpIHtcbiAgICByZXR1cm4gJHZhbHVlcyhpdCk7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDY5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMTMiLCJ2YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGlzRW51bSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXNFbnRyaWVzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdChpdCk7XG4gICAgdmFyIGtleXMgPSBnZXRLZXlzKE8pO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChPLCBrZXkgPSBrZXlzW2krK10pKSB7XG4gICAgICByZXN1bHQucHVzaChpc0VudHJpZXMgPyBba2V5LCBPW2tleV1dIDogT1trZXldKTtcbiAgICB9IHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC10by1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gNjk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMiAxMyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1jNTIwNWU4Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Rhc2hib2FyZC52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjUzZTk5MTU2XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWM1MjA1ZThjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vRGFzaGJvYXJkLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1jNTIwNWU4Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Rhc2hib2FyZC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtYzUyMDVlOGNcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9EYXNoYm9hcmQudnVlXG4vLyBtb2R1bGUgaWQgPSA4MzJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbnRoZWFkLmRhdGF0YWJsZV9fcHJvZ3Jlc3NbZGF0YS12LWM1MjA1ZThjXSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDOi9Vc2Vycy91cmlhaC9zaXRlcy93d3cvc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0Rhc2hib2FyZC52dWU/ODk5M2FkNDZcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQXdiQTtJQUNBLGNBQUE7Q0FDQVwiLFwiZmlsZVwiOlwiRGFzaGJvYXJkLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI8dGVtcGxhdGU+XFxuICA8bWFpbi1sYXlvdXQgIDpzdHlsZT1cXFwieyBwYWRkaW5nVG9wOiBgMTAwcHhgLCBiYWNrZ3JvdW5kQ29sb3I6IGB3aGl0ZWAgfVxcXCI+XFxuICAgIDx2LWNvbnRhaW5lciAgZmx1aWQ+XFxuICAgICAgPGRhc2gtcGFuZWxzIDp1bnBhaWQ9XFxcInVucGFpZFxcXCIgOnBhaWQ9XFxcInBhaWRcXFwiIDpzZW50PVxcXCJzZW50XFxcIiA6cmVjZWl2ZWQ9XFxcInJlY2VpdmVkXFxcIiA6dG90YWw9XFxcInRvdGFsXFxcIiA6dW5zZW50PVxcXCJ1bnNlbnRcXFwiIDpkb25lPVxcXCJkb25lXFxcIj48L2Rhc2gtcGFuZWxzPlxcbiAgICAgIDx2LWNvbnRhaW5lciBmbHVpZD5cXG5cXG4gICAgICAgICAgICA8di1kYXRhLXRhYmxlXFxuICAgICAgICAgICAgICAgIDpoZWFkZXJzPVxcXCJoZWFkZXJzXFxcIlxcbiAgICAgICAgICAgICAgICA6aXRlbXM9XFxcIml0ZW1zXFxcIlxcbiAgICAgICAgICAgICAgICBsaWdodFxcbiAgICAgICAgICAgICAgICBleHBhbmRcXG4gICAgICAgICAgICA+XFxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XFxcIml0ZW1zXFxcIiBzY29wZT1cXFwicHJvcHNcXFwiPlxcbiAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1idG4gY29sb3I9XFxcInByaW1hcnlcXFwiIGljb24gQGNsaWNrPVxcXCJwcm9wcy5leHBhbmRlZCA9ICFwcm9wcy5leHBhbmRlZFxcXCI+PHYtaWNvbj5zaG9wcGluZ19iYXNrZXQ8L3YtaWNvbj48L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAge3sgcHJvcHMuaXRlbS5pZCB9fVxcbiAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XFxcIj57eyB0b3RhbEFtb3VudChwcm9wcy5pdGVtKSB8IGN1cnJlbmN5KGN1cnJlbmN5KSB9fTwvdGQ+XFxuXFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtc3dpdGNoXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVxcXCJgJHtwcm9wcy5pdGVtLnBheW1lbnQucGFpZCA/ICdQYWlkJyA6ICdVbnBhaWQnfWBcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cXFwicHJvcHMuaXRlbS5wYXltZW50LnBhaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XFxcInRlYWwgZGFya2VuLTRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XFxcIiFoYXNSb2xlKCdhZG1pbicpXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjaGFuZ2U9XFxcInRvZ2dsZVBhaWQocHJvcHMuaXRlbSlcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LXN3aXRjaD5cXG4gICAgICAgICAgICAgICAgPC90ZD5cXG5cXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1zd2l0Y2hcXG4gICAgICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XFxcImAke3Byb3BzLml0ZW0uc2hpcG1lbnQuc2VudCA/ICdTZW50JyA6ICdPbi1Ib2xkJ31gXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInByb3BzLml0ZW0uc2hpcG1lbnQuc2VudFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cXFwiY3lhblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cXFwiIWhhc1JvbGUoJ2FkbWluJylcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cXFwidG9nZ2xlU2VudChwcm9wcy5pdGVtKVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVxcXCJwcm9wcy5pdGVtLnNoaXBtZW50XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1zd2l0Y2g+XFxuICAgICAgICAgICAgICAgIDwvdGQ+XFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtc3dpdGNoXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVxcXCJgJHtwcm9wcy5pdGVtLnNoaXBtZW50LnJlY2VpdmVkID8gJ1JlY2VpdmVkJyA6ICdQZW5kaW5nJ31gXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInByb3BzLml0ZW0uc2hpcG1lbnQucmVjZWl2ZWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XFxcImxpZ2h0LWdyZWVuXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0XFxuICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cXFwidG9nZ2xlUmVjZWl2ZWQocHJvcHMuaXRlbSlcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cXFwicHJvcHMuaXRlbS5zaGlwbWVudFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICA8L3Ytc3dpdGNoPlxcbiAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2LXN3aXRjaFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cXFwiYCR7cHJvcHMuaXRlbS5kb25lID8gJ0NvbXBsZXRlZCcgOiAnT24tUHJvZ3Jlc3MnfWBcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cXFwicHJvcHMuaXRlbS5kb25lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVxcXCJ0ZWFsIGxpZ2h0ZW4tMlxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cXFwiIWhhc1JvbGUoJ2FkbWluJylcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cXFwidG9nZ2xlRG9uZShwcm9wcy5pdGVtKVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICA8L3Ytc3dpdGNoPlxcbiAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcInRpdGxlIHRleHQteHMtY2VudGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biA6ZGlzYWJsZWQ9XFxcIiFjYW4oJ2VkaXRfb3JkZXInKVxcXCIgIGZsYXQgaWNvbiBjb2xvcj1cXFwiYWNjZW50XFxcIiBAY2xpY2submF0aXZlPVxcXCJzZXRDdXJyZW50T3JkZXIocHJvcHMuaXRlbSlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24+ZmEtZWRpdDwvdi1pY29uPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biA6ZGlzYWJsZWQ9XFxcIiFjYW4oJ2RlbGV0ZV9vcmRlcicpXFxcIiBmbGF0IGljb24gY29sb3I9XFxcImVycm9yXFxcIiBAY2xpY2submF0aXZlPVxcXCJkZWxldGVPcmRlcihwcm9wcy5pdGVtKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5mYS10cmFzaDwvdi1pY29uPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cXG4gICAgICAgICAgICAgICAgPC90ZD5cXG4gICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XFxuXFxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XFxcImV4cGFuZFxcXCIgc2NvcGU9XFxcInByb3BzXFxcIj5cXG4gICAgICAgICAgICAgICAgPHYtZGF0YS10YWJsZVxcbiAgICAgICAgICAgICAgICAgICAgOml0ZW1zPVxcXCJnZXRJdGVtcyhwcm9wcy5pdGVtLmNhcnQpXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgaGlkZS1hY3Rpb25zXFxuICAgICAgICAgICAgICAgICAgICBsaWdodFxcbiAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XFxcImhlYWRlcnNcXFwiIHNjb3BlPVxcXCJvcmRlcnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XFxcInRleHQteHMtbGVmdFxcXCI+UHJvZHVjdDwvdGg+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cXFwidGV4dC14cy1sZWZ0XFxcIj5RdHk8L3RoPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XFxcInRleHQteHMtbGVmdFxcXCI+UHJpY2U8L3RoPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XFxcInRleHQteHMtbGVmdFxcXCI+VGF4PC90aD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVxcXCJ0ZXh0LXhzLWxlZnRcXFwiPlN1YnRvdGFsPC90aD5cXG4gICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XFxcIml0ZW1zXFxcIiBzY29wZT1cXFwib3JkZXJzXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcInRleHQteHMtbGVmdFxcXCI+PHNwYW4gY2xhc3M9XFxcInByaW1hcnktLXRleHRcXFwiPnt7IG9yZGVycy5pdGVtLm5hbWUgfX08L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaWY9XFxcIm9yZGVycy5pdGVtLm9wdGlvbnMgIT09IHt9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICBjbGFzcz1cXFwiaW5mby0tdGV4dCBjYXB0aW9uXFxcIiB2LWZvcj1cXFwiKG9wdGlvbixrZXkpIGluIG9yZGVycy5pdGVtLm9wdGlvbnNcXFwiIDprZXk9XFxcImtleVxcXCI+KHt7IG9wdGlvbiB9fSk8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGV4dC14cy1sZWZ0XFxcIj57eyBvcmRlcnMuaXRlbS5xdHkgfX08L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGV4dC14cy1sZWZ0XFxcIj57eyBvcmRlcnMuaXRlbS5wcmljZSB8IGN1cnJlbmN5KGN1cnJlbmN5KSB9fTwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJ0ZXh0LXhzLWxlZnRcXFwiPnt7IHBhcnNlRmxvYXQob3JkZXJzLml0ZW0udGF4KS50b0ZpeGVkKDIpIHwgY3VycmVuY3koY3VycmVuY3kpIH19PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcInRleHQteHMtbGVmdFxcXCI+e3sgb3JkZXJzLml0ZW0uc3VidG90YWwgfCBjdXJyZW5jeShjdXJyZW5jeSkgfX08L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XFxuICAgICAgICAgICAgICAgIDwvdi1kYXRhLXRhYmxlPlxcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XFxuXFxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XFxcInBhZ2VUZXh0XFxcIiBzY29wZT1cXFwieyBwYWdlU3RhcnQsIHBhZ2VTdG9wIH1cXFwiPlxcbiAgICAgICAgICAgICAgICBGcm9tIHt7IHBhZ2VTdGFydCB9fSB0byB7eyBwYWdlU3RvcCB9fVxcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XFxuXFxuICAgICAgICAgICAgPC92LWRhdGEtdGFibGU+XFxuICAgICAgICAgICAgPHYtZGlhbG9nIHYtbW9kZWw9XFxcImRpYWxvZ1xcXCIgZnVsbHNjcmVlbiB0cmFuc2l0aW9uPVxcXCJkaWFsb2ctYm90dG9tLXRyYW5zaXRpb25cXFwiIDpvdmVybGF5PVxcXCJmYWxzZVxcXCI+XFxuICAgICAgICAgICAgICAgIDx2LWNhcmQgOmxpZ2h0PVxcXCJ0cnVlXFxcIj5cXG4gICAgICAgICAgICAgICAgPHYtdG9vbGJhciAgY29sb3I9XFxcImFjY2VudFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1idG4gaWNvbiBAY2xpY2submF0aXZlPVxcXCJkaWFsb2cgPSBmYWxzZVxcXCIgY2xhc3M9XFxcImVycm9yLS10ZXh0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+Y2xvc2U8L3YtaWNvbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cXG4gICAgICAgICAgICAgICAgICAgIDx2LXRvb2xiYXItdGl0bGUgY2xhc3M9XFxcInByaW1hcnktLXRleHRcXFwiPlVwZGF0ZSBPcmRlciBOby4ge3sgY3VycmVudF9vcmRlci5pZCB9fTwvdi10b29sYmFyLXRpdGxlPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XFxuICAgICAgICAgICAgICAgICAgICA8di10b29sYmFyLWl0ZW1zPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuICBmbGF0IEBjbGljay5uYXRpdmU9XFxcImRpYWxvZyA9IGZhbHNlXFxcIiBjbGFzcz1cXFwiaW5mby0tdGV4dFxcXCI+U2F2ZTwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtdG9vbGJhci1pdGVtcz5cXG4gICAgICAgICAgICAgICAgPC92LXRvb2xiYXI+XFxuICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmbHVpZD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LXRhYnMgdi1tb2RlbD1cXFwiYWN0aXZlLm5hbWVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYnMtYmFyIGNsYXNzPVxcXCJhY2NlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYnMtaXRlbVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVxcXCIodGFiLGtleSkgaW4gdGFic1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVxcXCJrZXlcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmhyZWY9XFxcIicjJyArIHRhYi5uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpcHBsZVxcbiAgICAgICAgICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgICAgICB7e3RhYi5uYW1lfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFicy1pdGVtPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYnMtc2xpZGVyIGNvbG9yPVxcXCJwcmltYXJ5XFxcIj48L3YtdGFicy1zbGlkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRhYnMtYmFyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYnMtaXRlbXM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYnMtY29udGVudFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cXFwiKHRhYiwga2V5KSBpbiB0YWJzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVxcXCJrZXlcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppZD1cXFwidGFiLm5hbWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtY2FyZCBmbGF0IDpsaWdodD1cXFwidHJ1ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29tcG9uZW50IDppcz1cXFwidGFiLmNvbXBvbmVudFxcXCIgOnRhYj1cXFwidGFiXFxcIiA6b3JkZXI9XFxcImN1cnJlbnRfb3JkZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9jb21wb25lbnQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFicy1jb250ZW50PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10YWJzLWl0ZW1zPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LXRhYnM+XFxuICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XFxuICAgICAgICAgICAgICAgIDwvdi1jb250YWluZXI+XFxuICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxcbiAgICAgICAgICAgIDwvdi1kaWFsb2c+XFxuICAgICAgPC92LWNvbnRhaW5lcj5cXG4gICAgPC92LWNvbnRhaW5lcj5cXG4gIDwvbWFpbi1sYXlvdXQ+XFxuPC90ZW1wbGF0ZT5cXG5cXG48c2NyaXB0PlxcbmltcG9ydCBNYWluTGF5b3V0IGZyb20gJy4uL2xheW91dHMvTWFpbi52dWUnXFxuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcXG5pbXBvcnQgQWNsIGZyb20gJy4uL21peGlucy9hY2wnXFxuaW1wb3J0IERhc2hQYW5lbHMgZnJvbSAnLi4vcGFydGlhbHMvRGFzaFBhbmVscy52dWUnXFxuaW1wb3J0IEN1c3RvbWVyRGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL2Rhc2hib2FyZC9DdXN0b21lckRldGFpbHMudnVlJ1xcbmltcG9ydCBQYXltZW50RGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL2Rhc2hib2FyZC9QYXltZW50RGV0YWlscy52dWUnXFxuaW1wb3J0IFNoaXBwaW5nRGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwcGluZ0RldGFpbHMudnVlJ1xcbmltcG9ydCBTaGlwbWVudERldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcG1lbnREZXRhaWxzLnZ1ZSdcXG5pbXBvcnQgRmlsZVVwbG9hZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZGFzaGJvYXJkL0ZpbGVVcGxvYWRlci52dWUnXFxuXFxuZXhwb3J0IGRlZmF1bHQge1xcbiAgICBtaXhpbnM6IFtUaGVtZSwgQWNsXSxcXG4gICAgY29tcG9uZW50czoge1xcbiAgICAgICAgTWFpbkxheW91dCxcXG4gICAgICAgIERhc2hQYW5lbHMsXFxuICAgICAgICBDdXN0b21lckRldGFpbHMsXFxuICAgICAgICBQYXltZW50RGV0YWlscyxcXG4gICAgICAgIFNoaXBwaW5nRGV0YWlscyxcXG4gICAgICAgIFNoaXBtZW50RGV0YWlscyxcXG4gICAgICAgIEZpbGVVcGxvYWRlclxcbiAgICB9LFxcbiAgICBkYXRhOiAoKSA9PiAoe1xcbiAgICAgICAgY29udGVudENsYXNzOiB7ICdncmV5JzogdHJ1ZSwgJ2xpZ2h0ZW4tNCc6IHRydWUsICdhY2NlbnQtLXRleHQnOiB0cnVlIH0sXFxuICAgICAgICBjdXJyZW5jeTogJ+KCsScsXFxuICAgICAgICBkaWFsb2c6IGZhbHNlLFxcbiAgICAgICAgLyogcGFuZWxzICovXFxuICAgICAgICB0b3RhbDogMCxcXG4gICAgICAgIHBhaWQ6IDAsXFxuICAgICAgICBzZW50OiAwLFxcbiAgICAgICAgcmVjZWl2ZWQ6IDAsXFxuICAgICAgICBkb25lOiAwLFxcbiAgICAgICAgLyogdGFibGUgKi9cXG4gICAgICAgIGhlYWRlcnM6IFtcXG4gICAgICAgICAgICAvKiByZW1vdmUgc29ydCBhbmQgdmFsdWUgc2luY2Ugd2UgY2FudCBhY2Nlc3MgZG90IGFub3RhdGlvbiBpbiBpdGVtICovXFxuICAgICAgICAgICAgeyB0ZXh0OiAnT3JkZXIgTm8uJywgdmFsdWU6ICdpZCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiB0cnVlIH0sXFxuICAgICAgICAgICAgeyB0ZXh0OiAnQW1vdW50JywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH0sXFxuICAgICAgICAgICAgeyB0ZXh0OiAnUGFpZCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiBmYWxzZSB9LFxcbiAgICAgICAgICAgIHsgdGV4dDogJ1NlbnQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcXG4gICAgICAgICAgICB7IHRleHQ6ICdSZWNlaXZlZCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiBmYWxzZSB9LFxcbiAgICAgICAgICAgIHsgdGV4dDogJ0NvbXBsZXRlZCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiBmYWxzZSB9LFxcbiAgICAgICAgICAgIHsgdGV4dDogJ0FjdGlvbnMnLCBhbGlnbjogJ2NlbnRlcicsIHNvcnRhYmxlOiBmYWxzZSB9XFxuICAgICAgICBdLFxcbiAgICAgICAgaXRlbXM6IFtdLFxcbiAgICAgICAgLyogY3VycmVudCB1cGRhdGVkIGl0ZW0gKi9cXG4gICAgICAgIGN1cnJlbnRfb3JkZXI6IHt9LFxcbiAgICAgICAgLyogdGFicyAqL1xcbiAgICAgICAgdGFiczogW1xcbiAgICAgICAgICAgIHtuYW1lOiAnY3VzdG9tZXIgZGV0YWlscycsIGNvbXBvbmVudDogJ2N1c3RvbWVyLWRldGFpbHMnfSxcXG4gICAgICAgICAgICB7bmFtZTogJ3NoaXBwaW5nIGRldGFpbHMnLCBjb21wb25lbnQ6ICdzaGlwcGluZy1kZXRhaWxzJ30sXFxuICAgICAgICAgICAge25hbWU6ICdwYXltZW50IGRldGFpbHMnLCBjb21wb25lbnQ6ICdwYXltZW50LWRldGFpbHMnfSxcXG4gICAgICAgICAgICB7bmFtZTogJ3NoaXBtZW50IGRldGFpbHMnLCBjb21wb25lbnQ6ICdzaGlwbWVudC1kZXRhaWxzJ30sXFxuICAgICAgICAgICAge25hbWU6ICd1cGxvYWQgcmVjZWlwdCcsIGNvbXBvbmVudDogJ2ZpbGUtdXBsb2FkZXInfVxcbiAgICAgICAgXSxcXG4gICAgICAgIGFjdGl2ZToge1xcbiAgICAgICAgICAgIG5hbWU6ICdjdXN0b21lciBkZXRhaWxzJ1xcbiAgICAgICAgfSxcXG4gICAgICAgIHRvZ2dsZUZvcm06IG5ldyBBcHBGb3JtKEFwcC5mb3Jtcy50b2dnbGVGb3JtKVxcblxcbiAgICB9KSxcXG4gICAgY29tcHV0ZWQ6IHtcXG4gICAgICAgIHVucGFpZCAoKSB7XFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG90YWwgLSB0aGlzLnBhaWRcXG4gICAgICAgIH0sXFxuICAgICAgICB1bnNlbnQgKCkge1xcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvdGFsIC0gdGhpcy5zZW50XFxuICAgICAgICB9XFxuICAgIH0sXFxuICAgIG1vdW50ZWQgKCkge1xcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICBzZWxmLmZldGNoUGFuZWxTdGF0cygpXFxuICAgICAgICBCdXMuJG9uKCdmaWxlLXVwbG9hZGVkJywgKHJlc3BvbnNlKSA9PiB7XFxuICAgICAgICAgICAgbGV0IGluZGV4ID0gXy5maW5kSW5kZXgoc2VsZi5pdGVtcywgeyBpZDogcmVzcG9uc2Uub3JkZXIuaWQgfSlcXG4gICAgICAgICAgICBzZWxmLiRzZXQoc2VsZi5pdGVtcywgaW5kZXgsIHJlc3BvbnNlLm9yZGVyKVxcbiAgICAgICAgICAgIHNlbGYuY3VycmVudF9vcmRlciA9IHJlc3BvbnNlLm9yZGVyXFxuICAgICAgICB9KVxcbiAgICB9LFxcbiAgICBtZXRob2RzOiB7XFxuICAgICAgICBkZWxldGVPcmRlciAob3JkZXIpIHtcXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcXG4gICAgICAgICAgICBpZiAoc2VsZi5jYW4oJ2RlbGV0ZV9vcmRlcicpIHx8IHNlbGYuaGFzUm9sZSgnYWRtaW4nKSkge1xcbiAgICAgICAgICAgICAgICBheGlvcy5wb3N0KHJvdXRlKCdhcGkub3JkZXIuZGVzdHJveScsIHtvcmRlcjogb3JkZXIuaWR9KSkudGhlbigoKSA9PiB7XFxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRvdGFsID0gc2VsZi50b3RhbCAtIDFcXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnRvdGFsIDwgMCkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudG90YWwgPSAwXFxuICAgICAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXIucGF5bWVudC5wYWlkKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wYWlkID0gc2VsZi5wYWlkIC0gMVxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnBhaWQgPCAwKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGFpZCA9IDBcXG4gICAgICAgICAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXIuc2hpcG1lbnQuc2VudCkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VudCA9IHNlbGYuc2VudCAtIDFcXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZW50IDwgMCkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbnQgPSAwXFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLnNoaXBtZW50LnJlY2VpdmVkKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWNlaXZlZCA9IHNlbGYucmVjZWl2ZWQgLSAxXFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYucmVjZWl2ZWQgPCAwKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVjZWl2ZWQgPSAwXFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLmRvbmUpIHtcXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRvbmUgPSBzZWxmLmRvbmUgLSAxXFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuZG9uZSA8IDApIHtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kb25lID0gMFxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IF8uZmluZEluZGV4KHNlbGYuaXRlbXMsIHsgaWQ6IG9yZGVyLmlkIH0pXFxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRkZWxldGUoc2VsZi5pdGVtcywgaW5kZXgpXFxuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBgT3JkZXIjJHtvcmRlci5pZH0gRGVsZXRlZCFgLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKHtlcnJvcnMsIG1lc3NhZ2V9KSA9PiB7XFxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICB9KVxcbiAgICAgICAgICAgIH0gZWxzZSB7XFxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6ICdBY3Rpb24gTm90IEF1dGhvcml6ZWQhJywgYmFja2dyb3VuZENvbG9yOiAnI2U1NzM3MycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXFxuICAgICAgICAgICAgfVxcbiAgICAgICAgfSxcXG4gICAgICAgIHJlc2V0VG9nZ2xlRm9ybSAoKSB7XFxuICAgICAgICAgICAgdGhpcy50b2dnbGVGb3JtID0gbmV3IEFwcEZvcm0oQXBwLmZvcm1zLnRvZ2dsZUZvcm0pXFxuICAgICAgICB9LFxcbiAgICAgICAgdG9nZ2xlUGFpZCAob3JkZXIpIHtcXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcXG4gICAgICAgICAgICBzZWxmLnRvZ2dsZUZvcm0udG9nZ2xlID0gb3JkZXIucGF5bWVudC5wYWlkXFxuICAgICAgICAgICAgQXBwLnBvc3Qocm91dGUoJ2FwaS50b2dnbGUucGFpZCcsIHtvcmRlcjogb3JkZXIuaWR9KSwgc2VsZi50b2dnbGVGb3JtKS50aGVuKCh7bWVzc2FnZX0pID0+IHtcXG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLnBheW1lbnQucGFpZCkge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWlkID0gdGhpcy5wYWlkICsgMVxcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWlkID0gdGhpcy5wYWlkIC0gMVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcnMpXFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcXG4gICAgICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIG9yZGVyLnBheW1lbnQucGFpZCA9ICFvcmRlci5wYXltZW50LnBhaWRcXG4gICAgICAgICAgICB9KVxcbiAgICAgICAgfSxcXG4gICAgICAgIHRvZ2dsZVNlbnQgKG9yZGVyKSB7XFxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICAgICAgc2VsZi50b2dnbGVGb3JtLnRvZ2dsZSA9IG9yZGVyLnNoaXBtZW50LnNlbnRcXG4gICAgICAgICAgICBBcHAucG9zdChyb3V0ZSgnYXBpLnRvZ2dsZS5zZW50Jywge29yZGVyOiBvcmRlci5pZH0pLCBzZWxmLnRvZ2dsZUZvcm0pLnRoZW4oKHttZXNzYWdlfSkgPT4ge1xcbiAgICAgICAgICAgICAgICBpZiAob3JkZXIuc2hpcG1lbnQuc2VudCkge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ID0gdGhpcy5zZW50ICsgMVxcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ID0gdGhpcy5zZW50IC0gMVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcnMpXFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcXG4gICAgICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIG9yZGVyLnNoaXBtZW50LnNlbnQgPSAhb3JkZXIuc2hpcG1lbnQuc2VudFxcbiAgICAgICAgICAgIH0pXFxuICAgICAgICB9LFxcbiAgICAgICAgdG9nZ2xlUmVjZWl2ZWQgKG9yZGVyKSB7XFxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICAgICAgc2VsZi50b2dnbGVGb3JtLnRvZ2dsZSA9IG9yZGVyLnNoaXBtZW50LnJlY2VpdmVkXFxuICAgICAgICAgICAgQXBwLnBvc3Qocm91dGUoJ2FwaS50b2dnbGUucmVjZWl2ZWQnLCB7b3JkZXI6IG9yZGVyLmlkfSksIHNlbGYudG9nZ2xlRm9ybSkudGhlbigoe21lc3NhZ2V9KSA9PiB7XFxuICAgICAgICAgICAgICAgIGlmIChvcmRlci5zaGlwbWVudC5yZWNlaXZlZCkge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlZCA9IHRoaXMucmVjZWl2ZWQgKyAxXFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVkID0gdGhpcy5yZWNlaXZlZCAtIDFcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICB9KS5jYXRjaCgoe2Vycm9ycywgbWVzc2FnZX0pID0+IHtcXG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XFxuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICBvcmRlci5zaGlwbWVudC5yZWNlaXZlZCA9ICFvcmRlci5zaGlwbWVudC5yZWNlaXZlZFxcbiAgICAgICAgICAgIH0pXFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvZ2dsZSByZWNlaXZlZCcsIG9yZGVyLnNoaXBtZW50LnJlY2VpdmVkKVxcbiAgICAgICAgfSxcXG4gICAgICAgIHRvZ2dsZURvbmUgKG9yZGVyKSB7XFxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICAgICAgc2VsZi50b2dnbGVGb3JtLnRvZ2dsZSA9IG9yZGVyLmRvbmVcXG4gICAgICAgICAgICBBcHAucG9zdChyb3V0ZSgnYXBpLnRvZ2dsZS5kb25lJywge29yZGVyOiBvcmRlci5pZH0pLCBzZWxmLnRvZ2dsZUZvcm0pLnRoZW4oKHttZXNzYWdlfSkgPT4ge1xcbiAgICAgICAgICAgICAgICBpZiAob3JkZXIuZG9uZSkge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb25lID0gdGhpcy5kb25lICsgMVxcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb25lID0gdGhpcy5kb25lIC0gMVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcnMpXFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcXG4gICAgICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIG9yZGVyLmRvbmUgPSAhb3JkZXIuZG9uZVxcbiAgICAgICAgICAgIH0pXFxuICAgICAgICB9LFxcbiAgICAgICAgcGFyc2VOdW1iZXIgKHN0cikge1xcbiAgICAgICAgICAgIHZhciBzdHJnID0gc3RyIHx8ICcnXFxuICAgICAgICAgICAgdmFyIGRlY2ltYWwgPSAnLidcXG4gICAgICAgICAgICBzdHJnID0gc3RyZy5yZXBsYWNlKC9bXjAtOSQuLF0vZywgJycpXFxuICAgICAgICAgICAgaWYgKHN0cmcuaW5kZXhPZignLCcpID4gc3RyZy5pbmRleE9mKCcuJykpIGRlY2ltYWwgPSAnLCdcXG4gICAgICAgICAgICBpZiAoKHN0cmcubWF0Y2gobmV3IFJlZ0V4cCgnXFxcXFxcXFwnICsgZGVjaW1hbCwgJ2cnKSkgfHwgW10pLmxlbmd0aCA+IDEpIGRlY2ltYWwgPSAnJ1xcbiAgICAgICAgICAgIGlmIChkZWNpbWFsICE9PSAnJyAmJiAoc3RyZy5sZW5ndGggLSBzdHJnLmluZGV4T2YoZGVjaW1hbCkgLSAxID09IDMpICYmIHN0cmcuaW5kZXhPZignMCcgKyBkZWNpbWFsKSAhPT0gMCkgZGVjaW1hbCA9ICcnXFxuICAgICAgICAgICAgc3RyZyA9IHN0cmcucmVwbGFjZShuZXcgUmVnRXhwKCdbXjAtOSQnICsgZGVjaW1hbCArICddJywgJ2cnKSwgJycpXFxuICAgICAgICAgICAgc3RyZyA9IHN0cmcucmVwbGFjZSgnLCcsICcuJylcXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHJnKVxcbiAgICAgICAgfSxcXG4gICAgICAgIGdldENhcnQgKGNhcnQpIHtcXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShjYXJ0KVxcbiAgICAgICAgfSxcXG4gICAgICAgIGdldEl0ZW1zIChjYXJ0KSB7XFxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXMoSlNPTi5wYXJzZShjYXJ0KVsnaXRlbXMnXSlcXG4gICAgICAgIH0sXFxuICAgICAgICBzZXRDdXJyZW50T3JkZXIgKG9yZGVyKSB7XFxuICAgICAgICAgICAgdGhpcy5kaWFsb2cgPSB0cnVlXFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50X29yZGVyID0gb3JkZXJcXG4gICAgICAgICAgICBCdXMuJGVtaXQoJ3NldC1vcmRlcicsIHRoaXMuY3VycmVudF9vcmRlcilcXG4gICAgICAgICAgICAvKiBDaGVjayBmb3IgU2hpcG1lbnQgVHlwZSBpZiBNZWV0IFVwIE9yIFBpY2sgVXAgUmVtb3ZlIFNoaXBwaW5nIERldGFpbHMgRnJvbSBUYWJzICovXFxuICAgICAgICAgICAgbGV0IGN1c3RvbWVyID0gT2JqZWN0LmFzc2lnbih7bmFtZTogJ2N1c3RvbWVyIGRldGFpbHMnLCBjb21wb25lbnQ6ICdjdXN0b21lci1kZXRhaWxzJ30sIEpTT04ucGFyc2UodGhpcy5jdXJyZW50X29yZGVyLmN1c3RvbWVyX2RldGFpbHMpKVxcbiAgICAgICAgICAgIGxldCBzaGlwcGluZyA9IE9iamVjdC5hc3NpZ24oe25hbWU6ICdzaGlwcGluZyBkZXRhaWxzJywgY29tcG9uZW50OiAnc2hpcHBpbmctZGV0YWlscyd9LCBKU09OLnBhcnNlKHRoaXMuY3VycmVudF9vcmRlci5zaGlwcGluZ19kZXRhaWxzKSlcXG4gICAgICAgICAgICBsZXQgdXBsb2FkcyA9IE9iamVjdC5hc3NpZ24oe25hbWU6ICd1cGxvYWQgcmVjZWlwdCcsIGNvbXBvbmVudDogJ2ZpbGUtdXBsb2FkZXInfSlcXG4gICAgICAgICAgICB0aGlzLnRhYnMgPSBbXFxuICAgICAgICAgICAgICAgIGN1c3RvbWVyLFxcbiAgICAgICAgICAgICAgICBzaGlwcGluZ1xcbiAgICAgICAgICAgIF1cXG4gICAgICAgICAgICBsZXQgcGF5bWVudCA9IG51bGxcXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50X29yZGVyLnBheW1lbnQpIHtcXG4gICAgICAgICAgICAgICAgcGF5bWVudCA9IE9iamVjdC5hc3NpZ24oe25hbWU6ICdwYXltZW50IGRldGFpbHMnLCBjb21wb25lbnQ6ICdwYXltZW50LWRldGFpbHMnfSwgdGhpcy5jdXJyZW50X29yZGVyLnBheW1lbnQpXFxuICAgICAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHBheW1lbnQpXFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIGxldCBzaGlwbWVudCA9IG51bGxcXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50X29yZGVyLnNoaXBtZW50KSB7XFxuICAgICAgICAgICAgICAgIHNoaXBtZW50ID0gT2JqZWN0LmFzc2lnbih7bmFtZTogJ3NoaXBtZW50IGRldGFpbHMnLCBjb21wb25lbnQ6ICdzaGlwbWVudC1kZXRhaWxzJ30sIHRoaXMuY3VycmVudF9vcmRlci5zaGlwbWVudClcXG4gICAgICAgICAgICAgICAgdGhpcy50YWJzLnB1c2goc2hpcG1lbnQpXFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHVwbG9hZHMpXFxuICAgICAgICB9LFxcbiAgICAgICAgZmV0Y2hQYW5lbFN0YXRzICgpIHtcXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcXG4gICAgICAgICAgICBheGlvcy5nZXQocm91dGUoJ2FwaS5wYW5lbC5zdGF0cycpKS50aGVuKChyZXNwb25zZSkgPT4ge1xcbiAgICAgICAgICAgICAgICBzZWxmLml0ZW1zID0gcmVzcG9uc2UuZGF0YS5vcmRlcnNcXG4gICAgICAgICAgICAgICAgc2VsZi50b3RhbCA9IHJlc3BvbnNlLmRhdGEudG90YWxcXG4gICAgICAgICAgICAgICAgc2VsZi5zZW50ID0gcmVzcG9uc2UuZGF0YS5zZW50XFxuICAgICAgICAgICAgICAgIHNlbGYucGFpZCA9IHJlc3BvbnNlLmRhdGEucGFpZFxcbiAgICAgICAgICAgICAgICBzZWxmLnJlY2VpdmVkID0gcmVzcG9uc2UuZGF0YS5yZWNlaXZlZFxcbiAgICAgICAgICAgICAgICBzZWxmLmRvbmUgPSByZXNwb25zZS5kYXRhLmRvbmVcXG4gICAgICAgICAgICB9KVxcbiAgICAgICAgfSxcXG4gICAgICAgIHRvdGFsQW1vdW50IChpdGVtKSB7XFxuICAgICAgICAgICAgbGV0IGNhcnQgPSBKU09OLnBhcnNlKGl0ZW0uY2FydClcXG4gICAgICAgICAgICBsZXQgdG90YWwgPSBudWxsXFxuICAgICAgICAgICAgaWYgKGl0ZW0uc2hpcG1lbnQpIHtcXG4gICAgICAgICAgICAgICAgdG90YWwgPSB0aGlzLnBhcnNlTnVtYmVyKGNhcnQudG90YWwpICsgcGFyc2VGbG9hdChpdGVtLnNoaXBtZW50LnNoaXBwaW5nX2ZlZSlcXG4gICAgICAgICAgICB9IGVsc2Uge1xcbiAgICAgICAgICAgICAgICB0b3RhbCA9IHRoaXMucGFyc2VOdW1iZXIoY2FydC50b3RhbClcXG4gICAgICAgICAgICB9XFxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsLnRvRml4ZWQoMilcXG4gICAgICAgIH1cXG4gICAgfSxcXG4gICAgd2F0Y2g6IHtcXG4gICAgICAgIGl0ZW1zOiB7XFxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkge1xcbiAgICAgICAgICAgIH0sXFxuICAgICAgICAgICAgZGVlcDogdHJ1ZVxcbiAgICAgICAgfVxcbiAgICB9XFxufVxcbjwvc2NyaXB0PlxcblxcbjxzdHlsZSBzY29wZWQ+XFxudGhlYWQuZGF0YXRhYmxlX19wcm9ncmVzcyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcbjwvc3R5bGU+XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWM1MjA1ZThjXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIjx0ZW1wbGF0ZT5cbiAgPG1haW4tbGF5b3V0ICA6c3R5bGU9XCJ7IHBhZGRpbmdUb3A6IGAxMDBweGAsIGJhY2tncm91bmRDb2xvcjogYHdoaXRlYCB9XCI+XG4gICAgPHYtY29udGFpbmVyICBmbHVpZD5cbiAgICAgIDxkYXNoLXBhbmVscyA6dW5wYWlkPVwidW5wYWlkXCIgOnBhaWQ9XCJwYWlkXCIgOnNlbnQ9XCJzZW50XCIgOnJlY2VpdmVkPVwicmVjZWl2ZWRcIiA6dG90YWw9XCJ0b3RhbFwiIDp1bnNlbnQ9XCJ1bnNlbnRcIiA6ZG9uZT1cImRvbmVcIj48L2Rhc2gtcGFuZWxzPlxuICAgICAgPHYtY29udGFpbmVyIGZsdWlkPlxuXG4gICAgICAgICAgICA8di1kYXRhLXRhYmxlXG4gICAgICAgICAgICAgICAgOmhlYWRlcnM9XCJoZWFkZXJzXCJcbiAgICAgICAgICAgICAgICA6aXRlbXM9XCJpdGVtc1wiXG4gICAgICAgICAgICAgICAgbGlnaHRcbiAgICAgICAgICAgICAgICBleHBhbmRcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwiaXRlbXNcIiBzY29wZT1cInByb3BzXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwicHJpbWFyeVwiIGljb24gQGNsaWNrPVwicHJvcHMuZXhwYW5kZWQgPSAhcHJvcHMuZXhwYW5kZWRcIj48di1pY29uPnNob3BwaW5nX2Jhc2tldDwvdi1pY29uPjwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgIHt7IHByb3BzLml0ZW0uaWQgfX1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+e3sgdG90YWxBbW91bnQocHJvcHMuaXRlbSkgfCBjdXJyZW5jeShjdXJyZW5jeSkgfX08L3RkPlxuXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtc3dpdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XCJgJHtwcm9wcy5pdGVtLnBheW1lbnQucGFpZCA/ICdQYWlkJyA6ICdVbnBhaWQnfWBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLml0ZW0ucGF5bWVudC5wYWlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwidGVhbCBkYXJrZW4tNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiIWhhc1JvbGUoJ2FkbWluJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cInRvZ2dsZVBhaWQocHJvcHMuaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L3Ytc3dpdGNoPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICA8di1zd2l0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cImAke3Byb3BzLml0ZW0uc2hpcG1lbnQuc2VudCA/ICdTZW50JyA6ICdPbi1Ib2xkJ31gXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwcm9wcy5pdGVtLnNoaXBtZW50LnNlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJjeWFuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCIhaGFzUm9sZSgnYWRtaW4nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlPVwidG9nZ2xlU2VudChwcm9wcy5pdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwicHJvcHMuaXRlbS5zaGlwbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1zd2l0Y2g+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICA8di1zd2l0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cImAke3Byb3BzLml0ZW0uc2hpcG1lbnQucmVjZWl2ZWQgPyAnUmVjZWl2ZWQnIDogJ1BlbmRpbmcnfWBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLml0ZW0uc2hpcG1lbnQucmVjZWl2ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJsaWdodC1ncmVlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cInRvZ2dsZVJlY2VpdmVkKHByb3BzLml0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJwcm9wcy5pdGVtLnNoaXBtZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC92LXN3aXRjaD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LXN3aXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwiYCR7cHJvcHMuaXRlbS5kb25lID8gJ0NvbXBsZXRlZCcgOiAnT24tUHJvZ3Jlc3MnfWBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLml0ZW0uZG9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cInRlYWwgbGlnaHRlbi0yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCIhaGFzUm9sZSgnYWRtaW4nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlPVwidG9nZ2xlRG9uZShwcm9wcy5pdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1zd2l0Y2g+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gOmRpc2FibGVkPVwiIWNhbignZWRpdF9vcmRlcicpXCIgIGZsYXQgaWNvbiBjb2xvcj1cImFjY2VudFwiIEBjbGljay5uYXRpdmU9XCJzZXRDdXJyZW50T3JkZXIocHJvcHMuaXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24+ZmEtZWRpdDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gOmRpc2FibGVkPVwiIWNhbignZGVsZXRlX29yZGVyJylcIiBmbGF0IGljb24gY29sb3I9XCJlcnJvclwiIEBjbGljay5uYXRpdmU9XCJkZWxldGVPcmRlcihwcm9wcy5pdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5mYS10cmFzaDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJleHBhbmRcIiBzY29wZT1cInByb3BzXCI+XG4gICAgICAgICAgICAgICAgPHYtZGF0YS10YWJsZVxuICAgICAgICAgICAgICAgICAgICA6aXRlbXM9XCJnZXRJdGVtcyhwcm9wcy5pdGVtLmNhcnQpXCJcbiAgICAgICAgICAgICAgICAgICAgaGlkZS1hY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJoZWFkZXJzXCIgc2NvcGU9XCJvcmRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ0ZXh0LXhzLWxlZnRcIj5Qcm9kdWN0PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ0ZXh0LXhzLWxlZnRcIj5RdHk8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInRleHQteHMtbGVmdFwiPlByaWNlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ0ZXh0LXhzLWxlZnRcIj5UYXg8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInRleHQteHMtbGVmdFwiPlN1YnRvdGFsPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwiaXRlbXNcIiBzY29wZT1cIm9yZGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGV4dC14cy1sZWZ0XCI+PHNwYW4gY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCI+e3sgb3JkZXJzLml0ZW0ubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWlmPVwib3JkZXJzLml0ZW0ub3B0aW9ucyAhPT0ge31cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gIGNsYXNzPVwiaW5mby0tdGV4dCBjYXB0aW9uXCIgdi1mb3I9XCIob3B0aW9uLGtleSkgaW4gb3JkZXJzLml0ZW0ub3B0aW9uc1wiIDprZXk9XCJrZXlcIj4oe3sgb3B0aW9uIH19KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGV4dC14cy1sZWZ0XCI+e3sgb3JkZXJzLml0ZW0ucXR5IH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRleHQteHMtbGVmdFwiPnt7IG9yZGVycy5pdGVtLnByaWNlIHwgY3VycmVuY3koY3VycmVuY3kpIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRleHQteHMtbGVmdFwiPnt7IHBhcnNlRmxvYXQob3JkZXJzLml0ZW0udGF4KS50b0ZpeGVkKDIpIHwgY3VycmVuY3koY3VycmVuY3kpIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRleHQteHMtbGVmdFwiPnt7IG9yZGVycy5pdGVtLnN1YnRvdGFsIHwgY3VycmVuY3koY3VycmVuY3kpIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC92LWRhdGEtdGFibGU+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cInBhZ2VUZXh0XCIgc2NvcGU9XCJ7IHBhZ2VTdGFydCwgcGFnZVN0b3AgfVwiPlxuICAgICAgICAgICAgICAgIEZyb20ge3sgcGFnZVN0YXJ0IH19IHRvIHt7IHBhZ2VTdG9wIH19XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgICAgICA8L3YtZGF0YS10YWJsZT5cbiAgICAgICAgICAgIDx2LWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nXCIgZnVsbHNjcmVlbiB0cmFuc2l0aW9uPVwiZGlhbG9nLWJvdHRvbS10cmFuc2l0aW9uXCIgOm92ZXJsYXk9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICAgIDx2LWNhcmQgOmxpZ2h0PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDx2LXRvb2xiYXIgIGNvbG9yPVwiYWNjZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biBpY29uIEBjbGljay5uYXRpdmU9XCJkaWFsb2cgPSBmYWxzZVwiIGNsYXNzPVwiZXJyb3ItLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5jbG9zZTwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgICAgICAgICAgICAgPHYtdG9vbGJhci10aXRsZSBjbGFzcz1cInByaW1hcnktLXRleHRcIj5VcGRhdGUgT3JkZXIgTm8uIHt7IGN1cnJlbnRfb3JkZXIuaWQgfX08L3YtdG9vbGJhci10aXRsZT5cbiAgICAgICAgICAgICAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgICAgICAgICAgICAgICAgIDx2LXRvb2xiYXItaXRlbXM+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biAgZmxhdCBAY2xpY2submF0aXZlPVwiZGlhbG9nID0gZmFsc2VcIiBjbGFzcz1cImluZm8tLXRleHRcIj5TYXZlPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgPC92LXRvb2xiYXItaXRlbXM+XG4gICAgICAgICAgICAgICAgPC92LXRvb2xiYXI+XG4gICAgICAgICAgICAgICAgPHYtY29udGFpbmVyIGZsdWlkPlxuICAgICAgICAgICAgICAgICAgICA8di10YWJzIHYtbW9kZWw9XCJhY3RpdmUubmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGFicy1iYXIgY2xhc3M9XCJhY2NlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYnMtaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIodGFiLGtleSkgaW4gdGFic1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwia2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpocmVmPVwiJyMnICsgdGFiLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3RhYi5uYW1lfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10YWJzLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di10YWJzLXNsaWRlciBjb2xvcj1cInByaW1hcnlcIj48L3YtdGFicy1zbGlkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFicy1iYXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di10YWJzLWl0ZW1zPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYnMtY29udGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKHRhYiwga2V5KSBpbiB0YWJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwia2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XCJ0YWIubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNhcmQgZmxhdCA6bGlnaHQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb21wb25lbnQgOmlzPVwidGFiLmNvbXBvbmVudFwiIDp0YWI9XCJ0YWJcIiA6b3JkZXI9XCJjdXJyZW50X29yZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvY29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10YWJzLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFicy1pdGVtcz5cbiAgICAgICAgICAgICAgICAgICAgPC92LXRhYnM+XG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgICAgICA8L3YtY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICAgICAgPC92LWRpYWxvZz5cbiAgICAgIDwvdi1jb250YWluZXI+XG4gICAgPC92LWNvbnRhaW5lcj5cbiAgPC9tYWluLWxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTWFpbkxheW91dCBmcm9tICcuLi9sYXlvdXRzL01haW4udnVlJ1xuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcbmltcG9ydCBBY2wgZnJvbSAnLi4vbWl4aW5zL2FjbCdcbmltcG9ydCBEYXNoUGFuZWxzIGZyb20gJy4uL3BhcnRpYWxzL0Rhc2hQYW5lbHMudnVlJ1xuaW1wb3J0IEN1c3RvbWVyRGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL2Rhc2hib2FyZC9DdXN0b21lckRldGFpbHMudnVlJ1xuaW1wb3J0IFBheW1lbnREZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvZGFzaGJvYXJkL1BheW1lbnREZXRhaWxzLnZ1ZSdcbmltcG9ydCBTaGlwcGluZ0RldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcHBpbmdEZXRhaWxzLnZ1ZSdcbmltcG9ydCBTaGlwbWVudERldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcG1lbnREZXRhaWxzLnZ1ZSdcbmltcG9ydCBGaWxlVXBsb2FkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9kYXNoYm9hcmQvRmlsZVVwbG9hZGVyLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG1peGluczogW1RoZW1lLCBBY2xdLFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgTWFpbkxheW91dCxcbiAgICAgICAgRGFzaFBhbmVscyxcbiAgICAgICAgQ3VzdG9tZXJEZXRhaWxzLFxuICAgICAgICBQYXltZW50RGV0YWlscyxcbiAgICAgICAgU2hpcHBpbmdEZXRhaWxzLFxuICAgICAgICBTaGlwbWVudERldGFpbHMsXG4gICAgICAgIEZpbGVVcGxvYWRlclxuICAgIH0sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgY29udGVudENsYXNzOiB7ICdncmV5JzogdHJ1ZSwgJ2xpZ2h0ZW4tNCc6IHRydWUsICdhY2NlbnQtLXRleHQnOiB0cnVlIH0sXG4gICAgICAgIGN1cnJlbmN5OiAn4oKxJyxcbiAgICAgICAgZGlhbG9nOiBmYWxzZSxcbiAgICAgICAgLyogcGFuZWxzICovXG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgICBwYWlkOiAwLFxuICAgICAgICBzZW50OiAwLFxuICAgICAgICByZWNlaXZlZDogMCxcbiAgICAgICAgZG9uZTogMCxcbiAgICAgICAgLyogdGFibGUgKi9cbiAgICAgICAgaGVhZGVyczogW1xuICAgICAgICAgICAgLyogcmVtb3ZlIHNvcnQgYW5kIHZhbHVlIHNpbmNlIHdlIGNhbnQgYWNjZXNzIGRvdCBhbm90YXRpb24gaW4gaXRlbSAqL1xuICAgICAgICAgICAgeyB0ZXh0OiAnT3JkZXIgTm8uJywgdmFsdWU6ICdpZCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdBbW91bnQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1BhaWQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1NlbnQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1JlY2VpdmVkJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdDb21wbGV0ZWQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0FjdGlvbnMnLCBhbGlnbjogJ2NlbnRlcicsIHNvcnRhYmxlOiBmYWxzZSB9XG4gICAgICAgIF0sXG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgLyogY3VycmVudCB1cGRhdGVkIGl0ZW0gKi9cbiAgICAgICAgY3VycmVudF9vcmRlcjoge30sXG4gICAgICAgIC8qIHRhYnMgKi9cbiAgICAgICAgdGFiczogW1xuICAgICAgICAgICAge25hbWU6ICdjdXN0b21lciBkZXRhaWxzJywgY29tcG9uZW50OiAnY3VzdG9tZXItZGV0YWlscyd9LFxuICAgICAgICAgICAge25hbWU6ICdzaGlwcGluZyBkZXRhaWxzJywgY29tcG9uZW50OiAnc2hpcHBpbmctZGV0YWlscyd9LFxuICAgICAgICAgICAge25hbWU6ICdwYXltZW50IGRldGFpbHMnLCBjb21wb25lbnQ6ICdwYXltZW50LWRldGFpbHMnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnc2hpcG1lbnQgZGV0YWlscycsIGNvbXBvbmVudDogJ3NoaXBtZW50LWRldGFpbHMnfSxcbiAgICAgICAgICAgIHtuYW1lOiAndXBsb2FkIHJlY2VpcHQnLCBjb21wb25lbnQ6ICdmaWxlLXVwbG9hZGVyJ31cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aXZlOiB7XG4gICAgICAgICAgICBuYW1lOiAnY3VzdG9tZXIgZGV0YWlscydcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlRm9ybTogbmV3IEFwcEZvcm0oQXBwLmZvcm1zLnRvZ2dsZUZvcm0pXG5cbiAgICB9KSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICB1bnBhaWQgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG90YWwgLSB0aGlzLnBhaWRcbiAgICAgICAgfSxcbiAgICAgICAgdW5zZW50ICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvdGFsIC0gdGhpcy5zZW50XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vdW50ZWQgKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgc2VsZi5mZXRjaFBhbmVsU3RhdHMoKVxuICAgICAgICBCdXMuJG9uKCdmaWxlLXVwbG9hZGVkJywgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleChzZWxmLml0ZW1zLCB7IGlkOiByZXNwb25zZS5vcmRlci5pZCB9KVxuICAgICAgICAgICAgc2VsZi4kc2V0KHNlbGYuaXRlbXMsIGluZGV4LCByZXNwb25zZS5vcmRlcilcbiAgICAgICAgICAgIHNlbGYuY3VycmVudF9vcmRlciA9IHJlc3BvbnNlLm9yZGVyXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGRlbGV0ZU9yZGVyIChvcmRlcikge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBpZiAoc2VsZi5jYW4oJ2RlbGV0ZV9vcmRlcicpIHx8IHNlbGYuaGFzUm9sZSgnYWRtaW4nKSkge1xuICAgICAgICAgICAgICAgIGF4aW9zLnBvc3Qocm91dGUoJ2FwaS5vcmRlci5kZXN0cm95Jywge29yZGVyOiBvcmRlci5pZH0pKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50b3RhbCA9IHNlbGYudG90YWwgLSAxXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnRvdGFsIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50b3RhbCA9IDBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXIucGF5bWVudC5wYWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBhaWQgPSBzZWxmLnBhaWQgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5wYWlkIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGFpZCA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXIuc2hpcG1lbnQuc2VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZW50ID0gc2VsZi5zZW50IC0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VudCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbnQgPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLnNoaXBtZW50LnJlY2VpdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY2VpdmVkID0gc2VsZi5yZWNlaXZlZCAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnJlY2VpdmVkIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVjZWl2ZWQgPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZG9uZSA9IHNlbGYuZG9uZSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmRvbmUgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kb25lID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IF8uZmluZEluZGV4KHNlbGYuaXRlbXMsIHsgaWQ6IG9yZGVyLmlkIH0pXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGRlbGV0ZShzZWxmLml0ZW1zLCBpbmRleClcbiAgICAgICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogYE9yZGVyIyR7b3JkZXIuaWR9IERlbGV0ZWQhYCwgYmFja2dyb3VuZENvbG9yOiAnIzRkYjZhYycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKHtlcnJvcnMsIG1lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6ICdBY3Rpb24gTm90IEF1dGhvcml6ZWQhJywgYmFja2dyb3VuZENvbG9yOiAnI2U1NzM3MycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlc2V0VG9nZ2xlRm9ybSAoKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUZvcm0gPSBuZXcgQXBwRm9ybShBcHAuZm9ybXMudG9nZ2xlRm9ybSlcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlUGFpZCAob3JkZXIpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi50b2dnbGVGb3JtLnRvZ2dsZSA9IG9yZGVyLnBheW1lbnQucGFpZFxuICAgICAgICAgICAgQXBwLnBvc3Qocm91dGUoJ2FwaS50b2dnbGUucGFpZCcsIHtvcmRlcjogb3JkZXIuaWR9KSwgc2VsZi50b2dnbGVGb3JtKS50aGVuKCh7bWVzc2FnZX0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3JkZXIucGF5bWVudC5wYWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFpZCA9IHRoaXMucGFpZCArIDFcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhaWQgPSB0aGlzLnBhaWQgLSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgfSkuY2F0Y2goKHtlcnJvcnMsIG1lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcnMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcmRlci5wYXltZW50LnBhaWQgPSAhb3JkZXIucGF5bWVudC5wYWlkXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0b2dnbGVTZW50IChvcmRlcikge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLnRvZ2dsZUZvcm0udG9nZ2xlID0gb3JkZXIuc2hpcG1lbnQuc2VudFxuICAgICAgICAgICAgQXBwLnBvc3Qocm91dGUoJ2FwaS50b2dnbGUuc2VudCcsIHtvcmRlcjogb3JkZXIuaWR9KSwgc2VsZi50b2dnbGVGb3JtKS50aGVuKCh7bWVzc2FnZX0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3JkZXIuc2hpcG1lbnQuc2VudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbnQgPSB0aGlzLnNlbnQgKyAxXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ID0gdGhpcy5zZW50IC0gMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3JkZXIuc2hpcG1lbnQuc2VudCA9ICFvcmRlci5zaGlwbWVudC5zZW50XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0b2dnbGVSZWNlaXZlZCAob3JkZXIpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi50b2dnbGVGb3JtLnRvZ2dsZSA9IG9yZGVyLnNoaXBtZW50LnJlY2VpdmVkXG4gICAgICAgICAgICBBcHAucG9zdChyb3V0ZSgnYXBpLnRvZ2dsZS5yZWNlaXZlZCcsIHtvcmRlcjogb3JkZXIuaWR9KSwgc2VsZi50b2dnbGVGb3JtKS50aGVuKCh7bWVzc2FnZX0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3JkZXIuc2hpcG1lbnQucmVjZWl2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlZCA9IHRoaXMucmVjZWl2ZWQgKyAxXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlZCA9IHRoaXMucmVjZWl2ZWQgLSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgfSkuY2F0Y2goKHtlcnJvcnMsIG1lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcnMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcmRlci5zaGlwbWVudC5yZWNlaXZlZCA9ICFvcmRlci5zaGlwbWVudC5yZWNlaXZlZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0b2dnbGUgcmVjZWl2ZWQnLCBvcmRlci5zaGlwbWVudC5yZWNlaXZlZClcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlRG9uZSAob3JkZXIpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi50b2dnbGVGb3JtLnRvZ2dsZSA9IG9yZGVyLmRvbmVcbiAgICAgICAgICAgIEFwcC5wb3N0KHJvdXRlKCdhcGkudG9nZ2xlLmRvbmUnLCB7b3JkZXI6IG9yZGVyLmlkfSksIHNlbGYudG9nZ2xlRm9ybSkudGhlbigoe21lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb25lID0gdGhpcy5kb25lICsgMVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRoaXMuZG9uZSAtIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnIzRkYjZhYycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICB9KS5jYXRjaCgoe2Vycm9ycywgbWVzc2FnZX0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9ycylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnI2U1NzM3MycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9yZGVyLmRvbmUgPSAhb3JkZXIuZG9uZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgcGFyc2VOdW1iZXIgKHN0cikge1xuICAgICAgICAgICAgdmFyIHN0cmcgPSBzdHIgfHwgJydcbiAgICAgICAgICAgIHZhciBkZWNpbWFsID0gJy4nXG4gICAgICAgICAgICBzdHJnID0gc3RyZy5yZXBsYWNlKC9bXjAtOSQuLF0vZywgJycpXG4gICAgICAgICAgICBpZiAoc3RyZy5pbmRleE9mKCcsJykgPiBzdHJnLmluZGV4T2YoJy4nKSkgZGVjaW1hbCA9ICcsJ1xuICAgICAgICAgICAgaWYgKChzdHJnLm1hdGNoKG5ldyBSZWdFeHAoJ1xcXFwnICsgZGVjaW1hbCwgJ2cnKSkgfHwgW10pLmxlbmd0aCA+IDEpIGRlY2ltYWwgPSAnJ1xuICAgICAgICAgICAgaWYgKGRlY2ltYWwgIT09ICcnICYmIChzdHJnLmxlbmd0aCAtIHN0cmcuaW5kZXhPZihkZWNpbWFsKSAtIDEgPT0gMykgJiYgc3RyZy5pbmRleE9mKCcwJyArIGRlY2ltYWwpICE9PSAwKSBkZWNpbWFsID0gJydcbiAgICAgICAgICAgIHN0cmcgPSBzdHJnLnJlcGxhY2UobmV3IFJlZ0V4cCgnW14wLTkkJyArIGRlY2ltYWwgKyAnXScsICdnJyksICcnKVxuICAgICAgICAgICAgc3RyZyA9IHN0cmcucmVwbGFjZSgnLCcsICcuJylcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0cmcpXG4gICAgICAgIH0sXG4gICAgICAgIGdldENhcnQgKGNhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGNhcnQpXG4gICAgICAgIH0sXG4gICAgICAgIGdldEl0ZW1zIChjYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhKU09OLnBhcnNlKGNhcnQpWydpdGVtcyddKVxuICAgICAgICB9LFxuICAgICAgICBzZXRDdXJyZW50T3JkZXIgKG9yZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZyA9IHRydWVcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF9vcmRlciA9IG9yZGVyXG4gICAgICAgICAgICBCdXMuJGVtaXQoJ3NldC1vcmRlcicsIHRoaXMuY3VycmVudF9vcmRlcilcbiAgICAgICAgICAgIC8qIENoZWNrIGZvciBTaGlwbWVudCBUeXBlIGlmIE1lZXQgVXAgT3IgUGljayBVcCBSZW1vdmUgU2hpcHBpbmcgRGV0YWlscyBGcm9tIFRhYnMgKi9cbiAgICAgICAgICAgIGxldCBjdXN0b21lciA9IE9iamVjdC5hc3NpZ24oe25hbWU6ICdjdXN0b21lciBkZXRhaWxzJywgY29tcG9uZW50OiAnY3VzdG9tZXItZGV0YWlscyd9LCBKU09OLnBhcnNlKHRoaXMuY3VycmVudF9vcmRlci5jdXN0b21lcl9kZXRhaWxzKSlcbiAgICAgICAgICAgIGxldCBzaGlwcGluZyA9IE9iamVjdC5hc3NpZ24oe25hbWU6ICdzaGlwcGluZyBkZXRhaWxzJywgY29tcG9uZW50OiAnc2hpcHBpbmctZGV0YWlscyd9LCBKU09OLnBhcnNlKHRoaXMuY3VycmVudF9vcmRlci5zaGlwcGluZ19kZXRhaWxzKSlcbiAgICAgICAgICAgIGxldCB1cGxvYWRzID0gT2JqZWN0LmFzc2lnbih7bmFtZTogJ3VwbG9hZCByZWNlaXB0JywgY29tcG9uZW50OiAnZmlsZS11cGxvYWRlcid9KVxuICAgICAgICAgICAgdGhpcy50YWJzID0gW1xuICAgICAgICAgICAgICAgIGN1c3RvbWVyLFxuICAgICAgICAgICAgICAgIHNoaXBwaW5nXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICBsZXQgcGF5bWVudCA9IG51bGxcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRfb3JkZXIucGF5bWVudCkge1xuICAgICAgICAgICAgICAgIHBheW1lbnQgPSBPYmplY3QuYXNzaWduKHtuYW1lOiAncGF5bWVudCBkZXRhaWxzJywgY29tcG9uZW50OiAncGF5bWVudC1kZXRhaWxzJ30sIHRoaXMuY3VycmVudF9vcmRlci5wYXltZW50KVxuICAgICAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHBheW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgc2hpcG1lbnQgPSBudWxsXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50X29yZGVyLnNoaXBtZW50KSB7XG4gICAgICAgICAgICAgICAgc2hpcG1lbnQgPSBPYmplY3QuYXNzaWduKHtuYW1lOiAnc2hpcG1lbnQgZGV0YWlscycsIGNvbXBvbmVudDogJ3NoaXBtZW50LWRldGFpbHMnfSwgdGhpcy5jdXJyZW50X29yZGVyLnNoaXBtZW50KVxuICAgICAgICAgICAgICAgIHRoaXMudGFicy5wdXNoKHNoaXBtZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50YWJzLnB1c2godXBsb2FkcylcbiAgICAgICAgfSxcbiAgICAgICAgZmV0Y2hQYW5lbFN0YXRzICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgYXhpb3MuZ2V0KHJvdXRlKCdhcGkucGFuZWwuc3RhdHMnKSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLml0ZW1zID0gcmVzcG9uc2UuZGF0YS5vcmRlcnNcbiAgICAgICAgICAgICAgICBzZWxmLnRvdGFsID0gcmVzcG9uc2UuZGF0YS50b3RhbFxuICAgICAgICAgICAgICAgIHNlbGYuc2VudCA9IHJlc3BvbnNlLmRhdGEuc2VudFxuICAgICAgICAgICAgICAgIHNlbGYucGFpZCA9IHJlc3BvbnNlLmRhdGEucGFpZFxuICAgICAgICAgICAgICAgIHNlbGYucmVjZWl2ZWQgPSByZXNwb25zZS5kYXRhLnJlY2VpdmVkXG4gICAgICAgICAgICAgICAgc2VsZi5kb25lID0gcmVzcG9uc2UuZGF0YS5kb25lXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0b3RhbEFtb3VudCAoaXRlbSkge1xuICAgICAgICAgICAgbGV0IGNhcnQgPSBKU09OLnBhcnNlKGl0ZW0uY2FydClcbiAgICAgICAgICAgIGxldCB0b3RhbCA9IG51bGxcbiAgICAgICAgICAgIGlmIChpdGVtLnNoaXBtZW50KSB7XG4gICAgICAgICAgICAgICAgdG90YWwgPSB0aGlzLnBhcnNlTnVtYmVyKGNhcnQudG90YWwpICsgcGFyc2VGbG9hdChpdGVtLnNoaXBtZW50LnNoaXBwaW5nX2ZlZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG90YWwgPSB0aGlzLnBhcnNlTnVtYmVyKGNhcnQudG90YWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG90YWwudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZXA6IHRydWVcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxudGhlYWQuZGF0YXRhYmxlX19wcm9ncmVzcyB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gRGFzaGJvYXJkLnZ1ZT84OTkzYWQ0NiIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0Rhc2hQYW5lbHMudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1kODE2NTdhMlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9EYXNoUGFuZWxzLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFydGlhbHNcXFxcRGFzaFBhbmVscy52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIERhc2hQYW5lbHMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LWQ4MTY1N2EyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtZDgxNjU3YTJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvRGFzaFBhbmVscy52dWVcbi8vIG1vZHVsZSBpZCA9IDgzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCI8dGVtcGxhdGU+XG48ZGl2PlxuICAgIDx2LWxheW91dCByb3cgd3JhcCBhbGlnbi1jZW50ZXI+XG4gICAgICAgIDx2LWZsZXggeHMxMiB0ZXh0LXhzLXJpZ2h0PlxuICAgICAgICA8aDUgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCI+XG4gICAgICAgIFRvdGFsIE9yZGVyczoge3sgdG90YWwgfX1cbiAgICAgICAgPC9oNT5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgPC92LWxheW91dD5cbiAgICA8di1sYXlvdXQgcm93IHdyYXAgYWxpZ24tY2VudGVyPlxuICAgIDwhLS0gbWFrZSBhIGNhcmQgdG8gZGlzcGxheSB0aGlzIC0tPlxuICAgIDx2LWZsZXggeHMxMiBtZDQgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgIDx2LWNhcmQgY29sb3I9XCJibHVlLWdyZXlcIiBjbGFzcz1cIm1hLTFcIiBoZWlnaHQ9XCIxMTBweFwiPlxuICAgICAgICAgICAgPHYtY2FyZC10ZXh0IGNsYXNzPVwidGl0bGUgcGEtNVwiPlxuICAgICAgICAgICAgICAgIDx2LWljb24gbGFyZ2UgY29sb3I9XCJhbWJlciBsaWdodGVuLTJcIj5jb25maXJtYXRpb25fbnVtYmVyPC92LWljb24+IFVucGFpZDoge3sgdW5wYWlkIH19XG4gICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxuICAgICAgICA8L3YtY2FyZD5cbiAgICA8L3YtZmxleD5cbiAgICA8di1mbGV4IHhzMTIgbWQ0IHRleHQteHMtY2VudGVyPlxuICAgICAgICA8di1jYXJkIGNvbG9yPVwicmVkIGxpZ2h0ZW4tMlwiIGNsYXNzPVwibWEtMVwiIGhlaWdodD1cIjExMHB4XCI+XG4gICAgICAgICAgICA8di1jYXJkLXRleHQgY2xhc3M9XCJ0aXRsZSBwYS01XCI+XG4gICAgICAgICAgICAgICAgPHYtaWNvbiBsYXJnZSBjb2xvcj1cInJlZCBkYXJrZW4tNFwiPmRvX25vdF9kaXN0dXJiPC92LWljb24+IE9uLUhvbGQ6IHt7IHVuc2VudCB9fVxuICAgICAgICAgICAgPC92LWNhcmQtdGV4dD5cbiAgICAgICAgPC92LWNhcmQ+XG4gICAgPC92LWZsZXg+XG4gICAgPHYtZmxleCB4czEyIG1kNCB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgPHYtY2FyZCBjb2xvcj1cImN5YW5cIiBjbGFzcz1cIm1hLTFcIiBoZWlnaHQ9XCIxMTBweFwiPlxuICAgICAgICAgICAgPHYtY2FyZC10ZXh0IGNsYXNzPVwidGl0bGUgcGEtNVwiPlxuICAgICAgICAgICAgICAgIDx2LWljb24gbGFyZ2UgY29sb3I9XCJhbWJlclwiPmxvY2FsX3NoaXBwaW5nPC92LWljb24+IFNlbnQ6IHt7IHNlbnQgfX1cbiAgICAgICAgICAgIDwvdi1jYXJkLXRleHQ+XG4gICAgICAgIDwvdi1jYXJkPlxuICAgIDwvdi1mbGV4PlxuICAgIDx2LWZsZXggeHMxMiBtZDQgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgIDx2LWNhcmQgY29sb3I9XCJ0ZWFsIGxpZ2h0ZW4tMlwiIGNsYXNzPVwibWEtMVwiIGhlaWdodD1cIjExMHB4XCI+XG4gICAgICAgICAgICAgICAgPHYtY2FyZC10ZXh0IGNsYXNzPVwidGl0bGUgcGEtNVwiPlxuICAgICAgICAgICAgICAgIDx2LWljb24gbGFyZ2UgY29sb3I9XCJsaW1lXCI+bG9jYWxfbWFsbDwvdi1pY29uPiBEb25lOiB7eyBkb25lIH19XG4gICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxuICAgICAgICA8L3YtY2FyZD5cbiAgICA8L3YtZmxleD5cbiAgICA8di1mbGV4IHhzMTIgbWQ0IHRleHQteHMtY2VudGVyPlxuICAgICAgICA8di1jYXJkIGNvbG9yPVwibGlnaHQtZ3JlZW5cIiBjbGFzcz1cIm1hLTFcIiBoZWlnaHQ9XCIxMTBweFwiPlxuICAgICAgICAgICAgPHYtY2FyZC10ZXh0IGNsYXNzPVwidGl0bGUgcGEtNVwiPlxuICAgICAgICAgICAgICAgIDx2LWljb24gbGFyZ2UgY29sb3I9XCJ0ZWFsXCI+YmVlbmhlcmU8L3YtaWNvbj4gUmVjZWl2ZWQ6IHt7IHJlY2VpdmVkIH19XG4gICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxuICAgICAgICA8L3YtY2FyZD5cbiAgICA8L3YtZmxleD5cbiAgICA8di1mbGV4IHhzMTIgbWQ0IHRleHQteHMtY2VudGVyPlxuICAgICAgICA8di1jYXJkIGNvbG9yPVwidGVhbCBkYXJrZW4tNFwiIGNsYXNzPVwibWEtMVwiIGhlaWdodD1cIjExMHB4XCI+XG4gICAgICAgICAgICA8di1jYXJkLXRleHQgY2xhc3M9XCJ0aXRsZSBwYS01XCI+XG4gICAgICAgICAgICAgICAgPHYtaWNvbiBsYXJnZSBjb2xvcj1cImdyZWVuIGxpZ2h0ZW4tMlwiPmxvY2FsX2F0bTwvdi1pY29uPiBQYWlkOiB7eyBwYWlkIH19XG4gICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxuICAgICAgICA8L3YtY2FyZD5cbiAgICA8L3YtZmxleD5cbiAgICA8L3YtbGF5b3V0PlxuPC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFsndW5wYWlkJywgJ3BhaWQnLCAnc2VudCcsICdyZWNlaXZlZCcsICd0b3RhbCcsICd1bnNlbnQnLCAnZG9uZSddXG59XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBEYXNoUGFuZWxzLnZ1ZT9lZmNlMDRkNiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiwgXCJhbGlnbi1jZW50ZXJcIjogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwidGV4dC14cy1yaWdodFwiOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgX2MoXCJoNVwiLCB7IHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgVG90YWwgT3JkZXJzOiBcIiArIF92bS5fcyhfdm0udG90YWwpICsgXCJcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiwgXCJhbGlnbi1jZW50ZXJcIjogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIG1kNDogXCJcIiwgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYS0xXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJibHVlLWdyZXlcIiwgaGVpZ2h0OiBcIjExMHB4XCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSBwYS01XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgbGFyZ2U6IFwiXCIsIGNvbG9yOiBcImFtYmVyIGxpZ2h0ZW4tMlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJjb25maXJtYXRpb25fbnVtYmVyXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgVW5wYWlkOiBcIiArIF92bS5fcyhfdm0udW5wYWlkKSArIFwiXFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBtZDQ6IFwiXCIsIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWEtMVwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwicmVkIGxpZ2h0ZW4tMlwiLCBoZWlnaHQ6IFwiMTEwcHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHBhLTVcIiB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBsYXJnZTogXCJcIiwgY29sb3I6IFwicmVkIGRhcmtlbi00XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcImRvX25vdF9kaXN0dXJiXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgT24tSG9sZDogXCIgKyBfdm0uX3MoX3ZtLnVuc2VudCkgKyBcIlxcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgbWQ0OiBcIlwiLCBcInRleHQteHMtY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1hLTFcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcImN5YW5cIiwgaGVpZ2h0OiBcIjExMHB4XCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSBwYS01XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgbGFyZ2U6IFwiXCIsIGNvbG9yOiBcImFtYmVyXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJsb2NhbF9zaGlwcGluZ1wiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBTZW50OiBcIiArIF92bS5fcyhfdm0uc2VudCkgKyBcIlxcbiAgICAgICAgICAgIFwiKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgbWQ0OiBcIlwiLCBcInRleHQteHMtY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1hLTFcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInRlYWwgbGlnaHRlbi0yXCIsIGhlaWdodDogXCIxMTBweFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgcGEtNVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IGxhcmdlOiBcIlwiLCBjb2xvcjogXCJsaW1lXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJsb2NhbF9tYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIERvbmU6IFwiICsgX3ZtLl9zKF92bS5kb25lKSArIFwiXFxuICAgICAgICAgICAgXCIpXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBtZDQ6IFwiXCIsIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWEtMVwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwibGlnaHQtZ3JlZW5cIiwgaGVpZ2h0OiBcIjExMHB4XCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSBwYS01XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgbGFyZ2U6IFwiXCIsIGNvbG9yOiBcInRlYWxcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcImJlZW5oZXJlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgUmVjZWl2ZWQ6IFwiICsgX3ZtLl9zKF92bS5yZWNlaXZlZCkgKyBcIlxcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgbWQ0OiBcIlwiLCBcInRleHQteHMtY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1hLTFcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInRlYWwgZGFya2VuLTRcIiwgaGVpZ2h0OiBcIjExMHB4XCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSBwYS01XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgbGFyZ2U6IFwiXCIsIGNvbG9yOiBcImdyZWVuIGxpZ2h0ZW4tMlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJsb2NhbF9hdG1cIildXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgUGFpZDogXCIgKyBfdm0uX3MoX3ZtLnBhaWQpICsgXCJcXG4gICAgICAgICAgICBcIilcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1kODE2NTdhMlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtZDgxNjU3YTJcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0Rhc2hQYW5lbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4Mzdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yZTQ1NThhZlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9DdXN0b21lckRldGFpbHMudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0N1c3RvbWVyRGV0YWlscy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTJlNDU1OGFmXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0N1c3RvbWVyRGV0YWlscy52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXGRhc2hib2FyZFxcXFxDdXN0b21lckRldGFpbHMudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBDdXN0b21lckRldGFpbHMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTJlNDU1OGFmXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMmU0NTU4YWZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvQ3VzdG9tZXJEZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yZTQ1NThhZlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9DdXN0b21lckRldGFpbHMudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCJiNmZjYzY2YVwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yZTQ1NThhZlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9DdXN0b21lckRldGFpbHMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTJlNDU1OGFmXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0N1c3RvbWVyRGV0YWlscy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtMmU0NTU4YWZcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvQ3VzdG9tZXJEZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwiQ3VzdG9tZXJEZXRhaWxzLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTJlNDU1OGFmXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL0N1c3RvbWVyRGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDg0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCI8dGVtcGxhdGU+XG48di1jb250YWluZXIgZmx1aWQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImZpcnN0X25hbWVcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkZpcnN0IE5hbWVcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwiY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuZmlyc3RfbmFtZVwiXG4gICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJmaXJzdF9uYW1lXCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2ZpcnN0X25hbWUnKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWlkLWNhcmRcIlxuICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJsYXN0X25hbWVcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkxhc3QgTmFtZVwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJjdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5sYXN0X25hbWVcIlxuICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwibGFzdF9uYW1lXCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2xhc3RfbmFtZScpXCJcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtaWQtY2FyZC1vXCJcbiAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJFbWFpbFwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJjdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5lbWFpbFwiXG4gICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8ZW1haWwnXCJcbiAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnZW1haWwnKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImVtYWlsXCJcbiAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICBuYW1lPVwiY29udGFjdF9ub1wiXG4gICAgICAgICAgICBsYWJlbD1cIkNvbnRhY3QgTm8uXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJjdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5jb250YWN0X25vXCJcbiAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bnVtZXJpYydcIlxuICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiY29udGFjdF9ub1wiXG4gICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnY29udGFjdF9ubycpXCJcbiAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLXBob25lXCJcbiAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1idG4gbGlnaHQgY29sb3I9XCJwcmltYXJ5XCIgOmxvYWRpbmc9XCJjdXN0b21lckZvcm0uYnVzeVwiIDpkaXNhYmxlZD1cImVycm9ycy5hbnkoKVwiICBAY2xpY2submF0aXZlPVwic3VibWl0KClcIiA6Y2xhc3M9XCJ7cHJpbWFyeTogIWN1c3RvbWVyRm9ybS5idXN5LCBlcnJvcjogY3VzdG9tZXJGb3JtLmJ1c3l9XCIgY2xhc3M9XCJ3aGl0ZS0tdGV4dFwiPlVwZGF0ZTwvdi1idG4+XG48L3YtY29udGFpbmVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogWyd0YWInLCAnb3JkZXInXSxcbiAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICBjdXN0b21lckZvcm06IG5ldyBBcHBGb3JtKEFwcC5mb3Jtcy5jdXN0b21lckZvcm0pXG4gICAgfSksXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgdGFiIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5maXJzdF9uYW1lID0gbmV3VmFsdWUuZmlyc3RfbmFtZVxuICAgICAgICAgICAgdGhpcy5jdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5sYXN0X25hbWUgPSBuZXdWYWx1ZS5sYXN0X25hbWVcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuZW1haWwgPSBuZXdWYWx1ZS5lbWFpbFxuICAgICAgICAgICAgdGhpcy5jdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5jb250YWN0X25vID0gbmV3VmFsdWUuY29udGFjdF9ub1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHN1Ym1pdCAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybSBzdWJtaXR0ZWQnKVxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLmN1c3RvbWVyRm9ybS5idXN5ID0gdHJ1ZVxuICAgICAgICAgICAgQXBwLnBvc3Qocm91dGUoJ2FwaS5vcmRlcnMuY3VzdG9tZXJfZGV0YWlscycsIHtvcmRlcjogc2VsZi5vcmRlci5pZH0pLCBzZWxmLmN1c3RvbWVyRm9ybSkudGhlbigoe21lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5jdXN0b21lckZvcm0uYnVzeSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgc2VsZi5vcmRlci5jdXN0b21lcl9kZXRhaWxzID0gSlNPTi5zdHJpbmdpZnkoc2VsZi5jdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscylcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5jdXN0b21lckZvcm0uYnVzeSA9IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEN1c3RvbWVyRGV0YWlscy52dWU/N2MyNWE3ZjQiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1jb250YWluZXJcIixcbiAgICB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaXJzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJGaXJzdCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImZpcnN0X25hbWVcIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiZmlyc3RfbmFtZVwiKSxcbiAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtaWQtY2FyZFwiLFxuICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmN1c3RvbWVyRm9ybS5jdXN0b21lcl9kZXRhaWxzLmZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5jdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5maXJzdF9uYW1lID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5maXJzdF9uYW1lXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXN0X25hbWVcIixcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxhc3QgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJsYXN0X25hbWVcIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwibGFzdF9uYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1pZC1jYXJkLW9cIixcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5sYXN0X25hbWUsXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5jdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5sYXN0X25hbWUgPSAkJHZcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImN1c3RvbWVyRm9ybS5jdXN0b21lcl9kZXRhaWxzLmxhc3RfbmFtZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8ZW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8ZW1haWwnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRW1haWxcIixcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiZW1haWxcIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiZW1haWxcIiksXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImVtYWlsXCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuZW1haWwsXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5jdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5lbWFpbCA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuZW1haWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfG51bWVyaWNcIixcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bnVtZXJpYydcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbnRhY3Rfbm9cIixcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNvbnRhY3QgTm8uXCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImNvbnRhY3Rfbm9cIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiY29udGFjdF9ub1wiKSxcbiAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtcGhvbmVcIixcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5jb250YWN0X25vLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0uY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuY29udGFjdF9ubyA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuY29udGFjdF9ub1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1idG5cIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIndoaXRlLS10ZXh0XCIsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIHByaW1hcnk6ICFfdm0uY3VzdG9tZXJGb3JtLmJ1c3ksXG4gICAgICAgICAgICBlcnJvcjogX3ZtLmN1c3RvbWVyRm9ybS5idXN5XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgbGlnaHQ6IFwiXCIsXG4gICAgICAgICAgICBjb2xvcjogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICBsb2FkaW5nOiBfdm0uY3VzdG9tZXJGb3JtLmJ1c3ksXG4gICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmVycm9ycy5hbnkoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgX3ZtLnN1Ym1pdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl92KFwiVXBkYXRlXCIpXVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0yZTQ1NThhZlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMmU0NTU4YWZcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL0N1c3RvbWVyRGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDg0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTIzZmExODAxXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1BheW1lbnREZXRhaWxzLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9QYXltZW50RGV0YWlscy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTIzZmExODAxXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1BheW1lbnREZXRhaWxzLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGNvbXBvbmVudHNcXFxcZGFzaGJvYXJkXFxcXFBheW1lbnREZXRhaWxzLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gUGF5bWVudERldGFpbHMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTIzZmExODAxXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMjNmYTE4MDFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvUGF5bWVudERldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4NDNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTIzZmExODAxXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1BheW1lbnREZXRhaWxzLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiNmZlNTcyYjFcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMjNmYTE4MDFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vUGF5bWVudERldGFpbHMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTIzZmExODAxXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1BheW1lbnREZXRhaWxzLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0yM2ZhMTgwMVwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9QYXltZW50RGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDg0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIlBheW1lbnREZXRhaWxzLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTIzZmExODAxXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1BheW1lbnREZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIjx0ZW1wbGF0ZT5cbjx2LWNvbnRhaW5lciBmbHVpZD5cbiAgPHYtbGF5b3V0IHJvdyB2LWlmPVwicGF5bWVudEZvcm0uZ2F0ZXdheVwiPlxuICAgIDx2LWZsZXggeHMxMiB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgPHAgY2xhc3M9XCJzdWJoZWFkZXIgcHJpbWFyeS0tdGV4dFwiPkdhdGV3YXkgRGV0YWlsczo8L3A+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDx2LWxheW91dCByb3cgdi1pZj1cInBheW1lbnRGb3JtLmdhdGV3YXlcIj5cbiAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgIG5hbWU9XCJtb3BcIlxuICAgICAgbGFiZWw9XCJNb2RlIE9mIFBheW1lbnRcIlxuICAgICAgdi1tb2RlbD1cInBheW1lbnRGb3JtLmdhdGV3YXkubmFtZVwiXG4gICAgICByZWFkb25seVxuICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDxkaXYgdi1pZj1cInBheW1lbnRGb3JtLmdhdGV3YXlcIj5cbiAgICA8di1sYXlvdXQgcm93IHYtZm9yPVwiKHZhbHVlLGtleSxpbmRleCkgaW4gcGF5bWVudEZvcm0uZ2F0ZXdheS5kZXRhaWxzXCIgOmtleT1cImtleVwiIDppbmRleD1cImluZGV4XCI+XG4gICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICBuYW1lPVwia2V5XCJcbiAgICAgIDpsYWJlbD1cInRvUHJvcGVyQ2FzZShrZXkpXCJcbiAgICAgIDp2YWx1ZT1cInZhbHVlXCJcbiAgICAgIHJlYWRvbmx5XG4gICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICA8L3YtZmxleD5cbiAgPC92LWxheW91dD5cbiAgPC9kaXY+XG4gIDx2LWxheW91dCByb3c+XG4gICAgPHYtZmxleCB4czEyIHRleHQteHMtY2VudGVyPlxuICAgICAgICA8cCBjbGFzcz1cInN1YmhlYWRlciBwcmltYXJ5LS10ZXh0XCI+UGF5bWVudCBEZXRhaWxzOjwvcD5cbiAgICA8L3YtZmxleD5cbiAgPC92LWxheW91dD5cbiAgPHYtbGF5b3V0IHJvdyB2LWlmPVwib3JkZXIucmVjZWlwdFwiPlxuICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICA8di10ZXh0LWZpZWxkXG4gICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgbGFiZWw9XCJSZWNlaXB0XCJcbiAgICAgIHYtbW9kZWw9XCJvcmRlci5yZWNlaXB0XCJcbiAgICAgIHByZXBlbmQtaWNvbj1cImZhLWZpbGVcIlxuICAgICAgYXBwZW5kLWljb249XCJmYS1kb3dubG9hZFwiXG4gICAgICA6YXBwZW5kLWljb24tY2I9XCIoKSA9PiAodmlld0F0dGFjaG1lbnQob3JkZXIucmVjZWlwdCkpXCJcbiAgICAgIGhpbnQ9XCJWaWV3IFJlY2VpcHRcIlxuICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgIHJlYWRvbmx5XG4gICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDx2LWxheW91dCByb3c+XG4gICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgbmFtZT1cInRyYW5zYWN0aW9uX25vXCJcbiAgICAgICAgbGFiZWw9XCJUcmFuc2FjdGlvbiBOb1wiXG4gICAgICAgIHYtbW9kZWw9XCJwYXltZW50Rm9ybS50cmFuc2FjdGlvbl9ub1wiXG4gICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICBkYXRhLXZ2LW5hbWU9XCJUcmFuc2FjdGlvbiBOb1wiXG4gICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdUcmFuc2FjdGlvbiBObycpXCJcbiAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtaGFzaHRhZ1wiXG4gICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgIDwvdi1mbGV4PlxuICA8L3YtbGF5b3V0PlxuICA8di1sYXlvdXQgcm93PlxuICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgPHYtZGlhbG9nXG4gICAgcGVyc2lzdGVudFxuICAgIHYtbW9kZWw9XCJkaWFsb2dcIlxuICAgIGxhenlcbiAgICBmdWxsLXdpZHRoXG4gICAgbGlnaHRcbiAgICA+XG4gICAgPHYtdGV4dC1maWVsZFxuICAgIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgIGxhYmVsPVwiRGF0ZSBQYWlkXCJcbiAgICB2LW1vZGVsPVwicGF5bWVudEZvcm0uZGF0ZV9wYWlkXCJcbiAgICBwcmVwZW5kLWljb249XCJldmVudFwiXG4gICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgIGRhdGEtdnYtbmFtZT1cIkRhdGUgUGFpZFwiXG4gICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ0RhdGUgUGFpZCcpXCJcbiAgICBsaWdodFxuICAgIHJlYWRvbmx5XG4gICAgPlxuICAgIDwvdi10ZXh0LWZpZWxkPlxuICAgIDx2LWRhdGUtcGlja2VyIHYtbW9kZWw9XCJwYXltZW50Rm9ybS5kYXRlX3BhaWRcIiBzY3JvbGxhYmxlIGFjdGlvbnMgbGlnaHQ+XG4gICAgICA8dGVtcGxhdGUgc2NvcGU9XCJ7IHNhdmUsIGNhbmNlbCB9XCI+XG4gICAgICAgIDx2LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgICA8di1idG4gZmxhdCBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2s9XCJjYW5jZWxcIj5DYW5jZWw8L3YtYnRuPlxuICAgICAgICAgIDx2LWJ0biBmbGF0IGNvbG9yPVwicHJpbWFyeVwiIEBjbGljaz1cInNhdmVcIj5PSzwvdi1idG4+XG4gICAgICAgIDwvdi1jYXJkLWFjdGlvbnM+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvdi1kYXRlLXBpY2tlcj5cbiAgICA8L3YtZGlhbG9nPlxuICAgIDwvdi1mbGV4PlxuICA8L3YtbGF5b3V0PlxuICA8di1sYXlvdXQgcm93PlxuICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgbmFtZT1cImFjY291bnRfbmFtZVwiXG4gICAgICAgIGxhYmVsPVwiQWNjb3VudCBOYW1lXCJcbiAgICAgICAgdi1tb2RlbD1cInBheW1lbnRGb3JtLmFjY291bnRfbmFtZVwiXG4gICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICBkYXRhLXZ2LW5hbWU9XCJBY2NvdW50IE5hbWVcIlxuICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnQWNjb3VudCBOYW1lJylcIlxuICAgICAgICBwcmVwZW5kLWljb249XCJmYS1pZC1jYXJkXCJcbiAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDx2LWxheW91dCByb3c+XG4gICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICBuYW1lPVwiYWNjb3VudF9ub1wiXG4gICAgICAgIGxhYmVsPVwiQWNjb3VudCBOby5cIlxuICAgICAgICB2LW1vZGVsPVwicGF5bWVudEZvcm0uYWNjb3VudF9ub1wiXG4gICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICBkYXRhLXZ2LW5hbWU9XCJBY2NvdW50IE5vXCJcbiAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ0FjY291bnQgTm8nKVwiXG4gICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWNyZWRpdC1jYXJkXCJcbiAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDx2LWxheW91dCByb3c+XG4gICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgbmFtZT1cImFtb3VudFwiXG4gICAgICAgIGxhYmVsPVwiQW1vdW50XCJcbiAgICAgICAgdi1tb2RlbC5udW1iZXI9XCJwYXltZW50Rm9ybS5hbW91bnRcIlxuICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG1pbl92YWx1ZToxJ1wiXG4gICAgICAgIGRhdGEtdnYtbmFtZT1cImFtb3VudFwiXG4gICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdhbW91bnQnKVwiXG4gICAgICAgIHByZXBlbmQtaWNvbj1cImZhLW1vbmV5XCJcbiAgICAgICAgaGludD1cIkFtb3VudCBZb3UgUGFpZFwiXG4gICAgICBwZXJzaXN0ZW50LWhpbnRcbiAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDx2LWxheW91dCByb3c+XG4gICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICBuYW1lPVwiY3VycmVuY3lcIlxuICAgICAgbGFiZWw9XCJDdXJyZW5jeVwiXG4gICAgICB2LW1vZGVsPVwicGF5bWVudEZvcm0uY3VycmVuY3lcIlxuICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgZGF0YS12di1uYW1lPVwiY3VycmVuY3lcIlxuICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2N1cnJlbmN5JylcIlxuICAgICAgcHJlcGVuZC1pY29uPVwiZmEtdXNkXCJcbiAgICAgIGhpbnQ9XCJDdXJyZW5jeSBPZiBZb3VyIFBheW1lbnRcIlxuICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICA8L3YtZmxleD5cbiAgPC92LWxheW91dD5cbiAgPHYtYnRuIGxpZ2h0IGNvbG9yPVwicHJpbWFyeVwiIDpsb2FkaW5nPVwicGF5bWVudEZvcm0uYnVzeVwiIDpkaXNhYmxlZD1cImVycm9ycy5hbnkoKVwiICBAY2xpY2submF0aXZlPVwic3VibWl0KClcIiA6Y2xhc3M9XCJ7cHJpbWFyeTogIXBheW1lbnRGb3JtLmJ1c3ksIGVycm9yOiBwYXltZW50Rm9ybS5idXN5fVwiIGNsYXNzPVwid2hpdGUtLXRleHRcIj5VcGRhdGU8L3YtYnRuPlxuPC92LWNvbnRhaW5lcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFsndGFiJywgJ29yZGVyJ10sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZGlhbG9nOiBmYWxzZSxcbiAgICAgICAgcGF5bWVudEZvcm06IG5ldyBBcHBGb3JtKEFwcC5mb3Jtcy5wYXltZW50Rm9ybSlcbiAgICB9KSxcbiAgICB3YXRjaDoge1xuICAgICAgICB0YWIgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnBheW1lbnRGb3JtLmlkID0gbmV3VmFsdWUuaWRcbiAgICAgICAgICAgIHRoaXMucGF5bWVudEZvcm0uZGF0ZV9wYWlkID0gbmV3VmFsdWUuZGF0ZV9wYWlkID8gbW9tZW50KG5ld1ZhbHVlLmRhdGVfcGFpZCkuZm9ybWF0KCdZWVlZLU1NLUREJykgOiBudWxsXG4gICAgICAgICAgICB0aGlzLnBheW1lbnRGb3JtLnRyYW5zYWN0aW9uX25vID0gbmV3VmFsdWUudHJhbnNhY3Rpb25fbm9cbiAgICAgICAgICAgIHRoaXMucGF5bWVudEZvcm0uYWNjb3VudF9uYW1lID0gbmV3VmFsdWUuYWNjb3VudF9uYW1lXG4gICAgICAgICAgICB0aGlzLnBheW1lbnRGb3JtLmFjY291bnRfbm8gPSBuZXdWYWx1ZS5hY2NvdW50X25vXG4gICAgICAgICAgICB0aGlzLnBheW1lbnRGb3JtLmFtb3VudCA9IG5ld1ZhbHVlLmFtb3VudFxuICAgICAgICAgICAgdGhpcy5wYXltZW50Rm9ybS5jdXJyZW5jeSA9IG5ld1ZhbHVlLmN1cnJlbmN5XG4gICAgICAgICAgICB0aGlzLnBheW1lbnRGb3JtLmdhdGV3YXkgPSBuZXdWYWx1ZS5nYXRld2F5XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgdmlld0F0dGFjaG1lbnQgKHBhdGgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHBhdGgpXG4gICAgICAgIH0sXG4gICAgICAgIHRvUHJvcGVyQ2FzZSAoa2V5KSB7XG4gICAgICAgICAgICBsZXQgbmV3U3RyID0ga2V5LnJlcGxhY2UoL18vZywgJyAnKVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0ci5yZXBsYWNlKC9cXHdcXFMqL2csIGZ1bmN0aW9uICh0eHQpIHsgcmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKSB9KVxuICAgICAgICB9LFxuICAgICAgICBzdWJtaXQgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLnBheW1lbnRGb3JtLmJ1c3kgPSB0cnVlXG4gICAgICAgICAgICBBcHAucG9zdChyb3V0ZSgnYXBpLm9yZGVycy5wYXltZW50X2RldGFpbHMnLCB7b3JkZXI6IHNlbGYub3JkZXIuaWR9KSwgc2VsZi5wYXltZW50Rm9ybSkudGhlbigoe21lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5wYXltZW50Rm9ybS5idXN5ID0gZmFsc2VcbiAgICAgICAgICAgICAgICAvLyBlZGl0IHRoZSBhcnJheSBvZiBvcmRlcnMgYnkgcGFzc2luZyB0aGUgd2hvbGUgb2JqZWN0IG9mIGVhY2ggb3JkZXJcbiAgICAgICAgICAgICAgICBzZWxmLm9yZGVyLnBheW1lbnQudHJhbnNhY3Rpb25fbm8gPSBzZWxmLnBheW1lbnRGb3JtLnRyYW5zYWN0aW9uX25vXG4gICAgICAgICAgICAgICAgc2VsZi5vcmRlci5wYXltZW50LmFjY291bnRfbmFtZSA9IHNlbGYucGF5bWVudEZvcm0uYWNjb3VudF9uYW1lXG4gICAgICAgICAgICAgICAgc2VsZi5vcmRlci5wYXltZW50LmFjY291bnRfbm8gPSBzZWxmLnBheW1lbnRGb3JtLmFjY291bnRfbm9cbiAgICAgICAgICAgICAgICBzZWxmLm9yZGVyLnBheW1lbnQuYW1vdW50ID0gc2VsZi5wYXltZW50Rm9ybS5hbW91bnRcbiAgICAgICAgICAgICAgICBzZWxmLm9yZGVyLnBheW1lbnQuY3VycmVuY3kgPSBzZWxmLnBheW1lbnRGb3JtLmN1cnJlbmN5XG4gICAgICAgICAgICAgICAgc2VsZi5vcmRlci5wYXltZW50LmRhdGVfcGFpZCA9IHNlbGYucGF5bWVudEZvcm0uZGF0ZV9wYWlkXG4gICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnIzRkYjZhYycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICB9KS5jYXRjaCgoe2Vycm9ycywgbWVzc2FnZX0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9ycylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnI2U1NzM3MycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYucGF5bWVudEZvcm0uYnVzeSA9IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gUGF5bWVudERldGFpbHMudnVlPzNjNjBiOTY2IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtY29udGFpbmVyXCIsXG4gICAgeyBhdHRyczogeyBmbHVpZDogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX3ZtLnBheW1lbnRGb3JtLmdhdGV3YXlcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiLCBcInRleHQteHMtY2VudGVyXCI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwic3ViaGVhZGVyIHByaW1hcnktLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCJHYXRld2F5IERldGFpbHM6XCIpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5wYXltZW50Rm9ybS5nYXRld2F5XG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vcFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk1vZGUgT2YgUGF5bWVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYXltZW50Rm9ybS5nYXRld2F5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnBheW1lbnRGb3JtLmdhdGV3YXkubmFtZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXltZW50Rm9ybS5nYXRld2F5Lm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0ucGF5bWVudEZvcm0uZ2F0ZXdheVxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIF92bS5fbChfdm0ucGF5bWVudEZvcm0uZ2F0ZXdheS5kZXRhaWxzLCBmdW5jdGlvbihcbiAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgIHsga2V5OiBrZXksIGF0dHJzOiB7IHJvdzogXCJcIiwgaW5kZXg6IGluZGV4IH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4czEyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc20xMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1kMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZzEyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeGwxMjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2V5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBfdm0udG9Qcm9wZXJDYXNlKGtleSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcInN1YmhlYWRlciBwcmltYXJ5LS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXCJQYXltZW50IERldGFpbHM6XCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLm9yZGVyLnJlY2VpcHRcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlJlY2VpcHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLWZpbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwiZmEtZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uLWNiXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS52aWV3QXR0YWNobWVudChfdm0ub3JkZXIucmVjZWlwdClcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiVmlldyBSZWNlaXB0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJwZXJzaXN0ZW50LWhpbnRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICByZWFkb25seTogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ub3JkZXIucmVjZWlwdCxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0ub3JkZXIucmVjZWlwdCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJvcmRlci5yZWNlaXB0XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHJhbnNhY3Rpb25fbm9cIixcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlRyYW5zYWN0aW9uIE5vXCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcIlRyYW5zYWN0aW9uIE5vXCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIlRyYW5zYWN0aW9uIE5vXCIpLFxuICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1oYXNodGFnXCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGF5bWVudEZvcm0udHJhbnNhY3Rpb25fbm8sXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5wYXltZW50Rm9ybS50cmFuc2FjdGlvbl9ubyA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGF5bWVudEZvcm0udHJhbnNhY3Rpb25fbm9cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1kaWFsb2dcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBwZXJzaXN0ZW50OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsYXp5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBcImZ1bGwtd2lkdGhcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmRpYWxvZyxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5kaWFsb2cgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJkaWFsb2dcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRlIFBhaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImV2ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJEYXRlIFBhaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIkRhdGUgUGFpZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICByZWFkb25seTogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGF5bWVudEZvcm0uZGF0ZV9wYWlkLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5wYXltZW50Rm9ybS5kYXRlX3BhaWQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGF5bWVudEZvcm0uZGF0ZV9wYWlkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWRhdGUtcGlja2VyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc2Nyb2xsYWJsZTogXCJcIiwgYWN0aW9uczogXCJcIiwgbGlnaHQ6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNhdmUgPSByZWYuc2F2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FuY2VsID0gcmVmLmNhbmNlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtYWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZmxhdDogXCJcIiwgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogY2FuY2VsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJDYW5jZWxcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBmbGF0OiBcIlwiLCBjb2xvcjogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBzYXZlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJPS1wiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGF5bWVudEZvcm0uZGF0ZV9wYWlkLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5wYXltZW50Rm9ybS5kYXRlX3BhaWQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGF5bWVudEZvcm0uZGF0ZV9wYWlkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNjb3VudF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJBY2NvdW50IE5hbWVcIixcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiQWNjb3VudCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIkFjY291bnQgTmFtZVwiKSxcbiAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtaWQtY2FyZFwiLFxuICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBheW1lbnRGb3JtLmFjY291bnRfbmFtZSxcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnBheW1lbnRGb3JtLmFjY291bnRfbmFtZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGF5bWVudEZvcm0uYWNjb3VudF9uYW1lXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY2NvdW50X25vXCIsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJBY2NvdW50IE5vLlwiLFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJBY2NvdW50IE5vXCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIkFjY291bnQgTm9cIiksXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLWNyZWRpdC1jYXJkXCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGF5bWVudEZvcm0uYWNjb3VudF9ubyxcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnBheW1lbnRGb3JtLmFjY291bnRfbm8gPSAkJHZcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBheW1lbnRGb3JtLmFjY291bnRfbm9cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfG1pbl92YWx1ZToxXCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1pbl92YWx1ZToxJ1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYW1vdW50XCIsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJBbW91bnRcIixcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiYW1vdW50XCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImFtb3VudFwiKSxcbiAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtbW9uZXlcIixcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiQW1vdW50IFlvdSBQYWlkXCIsXG4gICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBheW1lbnRGb3JtLmFtb3VudCxcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnBheW1lbnRGb3JtLmFtb3VudCA9IF92bS5fbigkJHYpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXltZW50Rm9ybS5hbW91bnRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3VycmVuY3lcIixcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkN1cnJlbmN5XCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImN1cnJlbmN5XCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImN1cnJlbmN5XCIpLFxuICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS11c2RcIixcbiAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiQ3VycmVuY3kgT2YgWW91ciBQYXltZW50XCIsXG4gICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBheW1lbnRGb3JtLmN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0ucGF5bWVudEZvcm0uY3VycmVuY3kgPSAkJHZcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBheW1lbnRGb3JtLmN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwid2hpdGUtLXRleHRcIixcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgcHJpbWFyeTogIV92bS5wYXltZW50Rm9ybS5idXN5LFxuICAgICAgICAgICAgZXJyb3I6IF92bS5wYXltZW50Rm9ybS5idXN5XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgbGlnaHQ6IFwiXCIsXG4gICAgICAgICAgICBjb2xvcjogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICBsb2FkaW5nOiBfdm0ucGF5bWVudEZvcm0uYnVzeSxcbiAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uZXJyb3JzLmFueSgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICBfdm0uc3VibWl0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfdm0uX3YoXCJVcGRhdGVcIildXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTIzZmExODAxXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0yM2ZhMTgwMVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvUGF5bWVudERldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4NDdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00MGY2MzhkZlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9TaGlwcGluZ0RldGFpbHMudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1NoaXBwaW5nRGV0YWlscy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTQwZjYzOGRmXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1NoaXBwaW5nRGV0YWlscy52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXGRhc2hib2FyZFxcXFxTaGlwcGluZ0RldGFpbHMudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBTaGlwcGluZ0RldGFpbHMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTQwZjYzOGRmXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNDBmNjM4ZGZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcHBpbmdEZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00MGY2MzhkZlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9TaGlwcGluZ0RldGFpbHMudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI0NDMxM2I3OFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00MGY2MzhkZlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9TaGlwcGluZ0RldGFpbHMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQwZjYzOGRmXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1NoaXBwaW5nRGV0YWlscy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNDBmNjM4ZGZcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcHBpbmdEZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwiU2hpcHBpbmdEZXRhaWxzLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTQwZjYzOGRmXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBwaW5nRGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDg1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCI8dGVtcGxhdGU+XG48di1jb250YWluZXIgZmx1aWQ+XG4gICAgPGZvcm0+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImFkZHJlc3NfMVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiQWRkcmVzcyAxXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18xXCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImFkZHJlc3NfMVwiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdhZGRyZXNzXzEnKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWFkZHJlc3MtYm9va1wiXG4gICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImFkZHJlc3NfMlwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiQWRkcmVzcyAyXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18yXCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImFkZHJlc3NfMlwiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdhZGRyZXNzXzInKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWFkZHJlc3MtYm9vay1vXCJcbiAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJjaXR5XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJDaXR5XCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuY2l0eVwiXG4gICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJjaXR5XCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2NpdHknKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImxvY2F0aW9uX2NpdHlcIlxuICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJjb3VudHJ5XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJDb3VudHJ5XCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuY291bnRyeVwiXG4gICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJjb3VudHJ5XCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2NvdW50cnknKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWZhXCJcbiAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICBuYW1lPVwiemlwX2NvZGVcIlxuICAgICAgICAgICAgbGFiZWw9XCJaaXAgQ29kZVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwiYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy56aXBfY29kZVwiXG4gICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJ6aXBfY29kZVwiXG4gICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnemlwX2NvZGUnKVwiXG4gICAgICAgICAgICBwcmVwZW5kLWljb249XCJtYXJrdW5yZWFkX21haWxib3hcIlxuICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICBuYW1lPVwic3RhdGVfcHJvdmluY2VcIlxuICAgICAgICAgICAgbGFiZWw9XCJTdGF0ZSB8IFByb3ZpbmNlXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJhZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLnN0YXRlX3Byb3ZpbmNlXCJcbiAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cInN0YXRlX3Byb3ZpbmNlXCJcbiAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdzdGF0ZV9wcm92aW5jZScpXCJcbiAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cInBsYWNlXCJcbiAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1idG4gbGlnaHQgY29sb3I9XCJwcmltYXJ5XCIgOmxvYWRpbmc9XCJhZGRyZXNzRm9ybS5idXN5XCIgOmRpc2FibGVkPVwiZXJyb3JzLmFueSgpXCIgIEBjbGljay5uYXRpdmU9XCJzdWJtaXQoKVwiIDpjbGFzcz1cIntwcmltYXJ5OiAhYWRkcmVzc0Zvcm0uYnVzeSwgZXJyb3I6IGFkZHJlc3NGb3JtLmJ1c3l9XCIgY2xhc3M9XCJ3aGl0ZS0tdGV4dFwiPlVwZGF0ZTwvdi1idG4+XG4gICAgICAgIDwvZm9ybT5cbjwvdi1jb250YWluZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiBbJ3RhYicsICdvcmRlciddLFxuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGFkZHJlc3NGb3JtOiBuZXcgQXBwRm9ybShBcHAuZm9ybXMuYWRkcmVzc0Zvcm0pXG4gICAgfSksXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgdGFiIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zaGlwcGluZ19kZXRhaWxzID0gbmV3VmFsdWVcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzEgPSBuZXdWYWx1ZS5hZGRyZXNzXzFcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzIgPSBuZXdWYWx1ZS5hZGRyZXNzXzJcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5jaXR5ID0gbmV3VmFsdWUuY2l0eVxuICAgICAgICAgICAgdGhpcy5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmNvdW50cnkgPSBuZXdWYWx1ZS5jb3VudHJ5XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuemlwX2NvZGUgPSBuZXdWYWx1ZS56aXBfY29kZVxuICAgICAgICAgICAgdGhpcy5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLnN0YXRlX3Byb3ZpbmNlID0gbmV3VmFsdWUuc3RhdGVfcHJvdmluY2VcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBzdWJtaXQgKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm0gc3VibWl0dGVkJylcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5hZGRyZXNzRm9ybS5idXN5ID0gdHJ1ZVxuICAgICAgICAgICAgQXBwLnBvc3Qocm91dGUoJ2FwaS5vcmRlcnMuc2hpcHBpbmdfZGV0YWlscycsIHtvcmRlcjogc2VsZi5vcmRlci5pZH0pLCBzZWxmLmFkZHJlc3NGb3JtKS50aGVuKCh7bWVzc2FnZX0pID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmFkZHJlc3NGb3JtLmJ1c3kgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHNlbGYub3JkZXIuc2hpcHBpbmdfZGV0YWlscyA9IEpTT04uc3RyaW5naWZ5KHNlbGYuYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscylcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRyZXNzRm9ybS5idXN5ID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gU2hpcHBpbmdEZXRhaWxzLnZ1ZT81Y2MyNzlmYiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJ2LWNvbnRhaW5lclwiLCB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSwgW1xuICAgIF9jKFxuICAgICAgXCJmb3JtXCIsXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWRkcmVzc18xXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFkZHJlc3MgMVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImFkZHJlc3NfMVwiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImFkZHJlc3NfMVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1hZGRyZXNzLWJvb2tcIixcbiAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18xLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18xID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzFcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhZGRyZXNzXzJcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQWRkcmVzcyAyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiYWRkcmVzc18yXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiYWRkcmVzc18yXCIpLFxuICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLWFkZHJlc3MtYm9vay1vXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmFkZHJlc3NfMixcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmFkZHJlc3NfMiA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18yXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2l0eVwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDaXR5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiY2l0eVwiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImNpdHlcIiksXG4gICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwibG9jYXRpb25fY2l0eVwiLFxuICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5jaXR5LFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuY2l0eSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuY2l0eVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfG1heDoyNTVcIixcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvdW50cnlcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ291bnRyeVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImNvdW50cnlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJjb3VudHJ5XCIpLFxuICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLWZhXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmNvdW50cnksXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5jb3VudHJ5ID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5jb3VudHJ5XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6aXBfY29kZVwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJaaXAgQ29kZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcInppcF9jb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiemlwX2NvZGVcIiksXG4gICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwibWFya3VucmVhZF9tYWlsYm94XCIsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLnppcF9jb2RlLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuemlwX2NvZGUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJhZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLnppcF9jb2RlXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0ZV9wcm92aW5jZVwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGF0ZSB8IFByb3ZpbmNlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwic3RhdGVfcHJvdmluY2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJzdGF0ZV9wcm92aW5jZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJwbGFjZVwiLFxuICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5zdGF0ZV9wcm92aW5jZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLnN0YXRlX3Byb3ZpbmNlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5zdGF0ZV9wcm92aW5jZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwid2hpdGUtLXRleHRcIixcbiAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgIHByaW1hcnk6ICFfdm0uYWRkcmVzc0Zvcm0uYnVzeSxcbiAgICAgICAgICAgICAgZXJyb3I6IF92bS5hZGRyZXNzRm9ybS5idXN5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgbGlnaHQ6IFwiXCIsXG4gICAgICAgICAgICAgIGNvbG9yOiBcInByaW1hcnlcIixcbiAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmFkZHJlc3NGb3JtLmJ1c3ksXG4gICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uZXJyb3JzLmFueSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF92bS5zdWJtaXQoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwiVXBkYXRlXCIpXVxuICAgICAgICApXG4gICAgICBdLFxuICAgICAgMVxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTQwZjYzOGRmXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi00MGY2MzhkZlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcHBpbmdEZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMGZmMjM5NzNcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vU2hpcG1lbnREZXRhaWxzLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TaGlwbWVudERldGFpbHMudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0wZmYyMzk3M1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TaGlwbWVudERldGFpbHMudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcY29tcG9uZW50c1xcXFxkYXNoYm9hcmRcXFxcU2hpcG1lbnREZXRhaWxzLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gU2hpcG1lbnREZXRhaWxzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0wZmYyMzk3M1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTBmZjIzOTczXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBtZW50RGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDg1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMGZmMjM5NzNcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vU2hpcG1lbnREZXRhaWxzLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiN2EzMWNiYmZcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMGZmMjM5NzNcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vU2hpcG1lbnREZXRhaWxzLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wZmYyMzk3M1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9TaGlwbWVudERldGFpbHMudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTBmZjIzOTczXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBtZW50RGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDg1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIlNoaXBtZW50RGV0YWlscy52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0wZmYyMzk3M1wiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwbWVudERldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4NTVcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiPHRlbXBsYXRlPlxuPHYtY29udGFpbmVyIGZsdWlkPlxuICAgICAgICA8di1sYXlvdXQgcm93IHYtaWY9XCJzaGlwbWVudEZvcm0uY291cmllclwiPlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHRleHQteHMtY2VudGVyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3ViaGVhZGVyIHByaW1hcnktLXRleHRcIj5EZWxpdmVyeSBNZXRob2Q6PC9wPlxuICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3cgdi1pZj1cInNoaXBtZW50Rm9ybS5jb3VyaWVyXCI+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICBuYW1lPVwibW9wXCJcbiAgICAgICAgICAgIGxhYmVsPVwiTW9kZSBPZiBQYXltZW50XCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJzaGlwbWVudEZvcm0uY291cmllci5uYW1lXCJcbiAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPGRpdiB2LWlmPVwic2hpcG1lbnRGb3JtLmNvdXJpZXJcIj5cbiAgICAgICAgICAgIDx2LWxheW91dCByb3cgdi1mb3I9XCIodmFsdWUsa2V5LGluZGV4KSBpbiBzaGlwbWVudEZvcm0uY291cmllci5kZXRhaWxzXCIgOmtleT1cImtleVwiIDppbmRleD1cImluZGV4XCI+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICBuYW1lPVwia2V5XCJcbiAgICAgICAgICAgIDpsYWJlbD1cInRvUHJvcGVyQ2FzZShrZXkpXCJcbiAgICAgICAgICAgIDp2YWx1ZT1cInZhbHVlXCJcbiAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzdWJoZWFkZXIgcHJpbWFyeS0tdGV4dFwiPlNoaXBtZW50IFN0YXR1czo8L3A+XG4gICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPCEtLSByZWFkIE9ubHkgaWYgbm90IGFkbWluIC0tPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICBuYW1lPVwidHJhY2tpbmdfbm9cIlxuICAgICAgICAgICAgICBsYWJlbD1cIlRyYWNraW5nIE5vXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNoaXBtZW50Rm9ybS50cmFja2luZ19ub1wiXG4gICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJUcmFja2luZyBOb1wiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdUcmFja2luZyBObycpXCJcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtdHJ1Y2tcIlxuICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgOmRpc2FibGVkPVwiIWhhc1JvbGUoJ2FkbWluJylcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgIEBjbGljaz1cInNob3dTZW50TW9kYWxcIlxuICAgICAgICAgICAgbGFiZWw9XCJEYXRlIFNlbnRcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInNoaXBtZW50Rm9ybS5kYXRlX3NlbnRcIlxuICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZXZlbnRcIlxuICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiRGF0ZSBTZW50XCJcbiAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdEYXRlIFNlbnQnKVwiXG4gICAgICAgICAgICBsaWdodFxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgICAgPHYtZGlhbG9nXG4gICAgICAgICAgICBwZXJzaXN0ZW50XG4gICAgICAgICAgICB2LW1vZGVsPVwibW9kYWwxXCJcbiAgICAgICAgICAgIGxhenlcbiAgICAgICAgICAgIGZ1bGwtd2lkdGhcbiAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICA+XG5cbiAgICAgICAgICAgIDx2LWRhdGUtcGlja2VyIHYtbW9kZWw9XCJzaGlwbWVudEZvcm0uZGF0ZV9zZW50XCIgc2Nyb2xsYWJsZSBhY3Rpb25zIGxpZ2h0PlxuICAgICAgICAgICAgPHRlbXBsYXRlIHNjb3BlPVwieyBzYXZlLCBjYW5jZWwgfVwiPlxuICAgICAgICAgICAgICAgIDx2LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgICAgICAgICA8di1idG4gZmxhdCBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2s9XCJjYW5jZWxcIj5DYW5jZWw8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDx2LWJ0biBmbGF0IGNvbG9yPVwicHJpbWFyeVwiIEBjbGljaz1cInNhdmVcIj5PSzwvdi1idG4+XG4gICAgICAgICAgICAgICAgPC92LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3YtZGF0ZS1waWNrZXI+XG4gICAgICAgICAgICA8L3YtZGlhbG9nPlxuICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtY2hlY2tib3ggOmRpc2FibGVkPVwiIWhhc1JvbGUoJ2FkbWluJylcIiB2LWJpbmQ6bGFiZWw9XCJgU2VudGBcIiB2LW1vZGVsPVwic2hpcG1lbnRGb3JtLnNlbnRcIiBsaWdodD48L3YtY2hlY2tib3g+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgQGNsaWNrPVwic2hvd1JlY2VpdmVkTW9kYWxcIlxuICAgICAgICAgICAgbGFiZWw9XCJEYXRlIFJlY2VpdmVkXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJzaGlwbWVudEZvcm0uZGF0ZV9yZWNlaXZlZFwiXG4gICAgICAgICAgICBwcmVwZW5kLWljb249XCJldmVudFwiXG4gICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJEYXRlIFJlY2VpdmVkXCJcbiAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdEYXRlIFJlY2VpdmVkJylcIlxuICAgICAgICAgICAgbGlnaHRcbiAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICAgIDx2LWRpYWxvZ1xuICAgICAgICAgICAgcGVyc2lzdGVudFxuICAgICAgICAgICAgdi1tb2RlbD1cIm1vZGFsMlwiXG4gICAgICAgICAgICBsYXp5XG4gICAgICAgICAgICBmdWxsLXdpZHRoXG4gICAgICAgICAgICBsaWdodFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPHYtZGF0ZS1waWNrZXIgdi1tb2RlbD1cInNoaXBtZW50Rm9ybS5kYXRlX3JlY2VpdmVkXCIgc2Nyb2xsYWJsZSBhY3Rpb25zIGxpZ2h0PlxuICAgICAgICAgICAgPHRlbXBsYXRlIHNjb3BlPVwieyBzYXZlLCBjYW5jZWwgfVwiPlxuICAgICAgICAgICAgICAgIDx2LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgICAgICAgICA8di1idG4gZmxhdCBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2s9XCJjYW5jZWxcIj5DYW5jZWw8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDx2LWJ0biBmbGF0IGNvbG9yPVwicHJpbWFyeVwiIEBjbGljaz1cInNhdmVcIj5PSzwvdi1idG4+XG4gICAgICAgICAgICAgICAgPC92LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3YtZGF0ZS1waWNrZXI+XG4gICAgICAgICAgICA8L3YtZGlhbG9nPlxuICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LWNoZWNrYm94IDpkaXNhYmxlZD1cIiFjYW4oJ2VkaXRfb3JkZXInKSB8fCAhaGFzUm9sZSgnYWRtaW4nKVwiIHYtYmluZDpsYWJlbD1cImBSZWNlaXZlZGBcIiB2LW1vZGVsPVwic2hpcG1lbnRGb3JtLnJlY2VpdmVkXCIgbGlnaHQ+PC92LWNoZWNrYm94PlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1idG4gbGlnaHQgY29sb3I9XCJwcmltYXJ5XCIgOmxvYWRpbmc9XCJzaGlwbWVudEZvcm0uYnVzeVwiIDpkaXNhYmxlZD1cImVycm9ycy5hbnkoKVwiICBAY2xpY2submF0aXZlPVwic3VibWl0KClcIiA6Y2xhc3M9XCJ7cHJpbWFyeTogIXNoaXBtZW50Rm9ybS5idXN5LCBlcnJvcjogc2hpcG1lbnRGb3JtLmJ1c3l9XCIgY2xhc3M9XCJ3aGl0ZS0tdGV4dFwiPlVwZGF0ZTwvdi1idG4+XG48L3YtY29udGFpbmVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBBY2wgZnJvbSAnLi4vLi4vbWl4aW5zL2FjbCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG1peGluczogW0FjbF0sXG4gICAgcHJvcHM6IFsndGFiJywgJ29yZGVyJ10sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgbW9kYWwxOiBmYWxzZSxcbiAgICAgICAgbW9kYWwyOiBmYWxzZSxcbiAgICAgICAgc2hpcG1lbnRGb3JtOiBuZXcgQXBwRm9ybShBcHAuZm9ybXMuc2hpcG1lbnRGb3JtKVxuICAgIH0pLFxuICAgIHdhdGNoOiB7XG4gICAgICAgIHRhYiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRGb3JtLmlkID0gbmV3VmFsdWUuaWRcbiAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRGb3JtLmNvdXJpZXIgPSBuZXdWYWx1ZS5jb3VyaWVyXG4gICAgICAgICAgICB0aGlzLnNoaXBtZW50Rm9ybS5zaGlwcGluZ19mZWUgPSBuZXdWYWx1ZS5zaGlwcGluZ19mZWVcbiAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRGb3JtLmN1cnJlbmN5ID0gbmV3VmFsdWUuY3VycmVuY3lcbiAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRGb3JtLnRyYWNraW5nX25vID0gbmV3VmFsdWUudHJhY2tpbmdfbm9cbiAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRGb3JtLnNlbnQgPSBuZXdWYWx1ZS5zZW50XG4gICAgICAgICAgICB0aGlzLnNoaXBtZW50Rm9ybS5kYXRlX3NlbnQgPSBuZXdWYWx1ZS5kYXRlX3NlbnQgPyBtb21lbnQobmV3VmFsdWUuZGF0ZV9zZW50KS5mb3JtYXQoJ1lZWVktTU0tREQnKSA6IG51bGxcbiAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRGb3JtLnJlY2VpdmVkID0gbmV3VmFsdWUucmVjZWl2ZWRcbiAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRGb3JtLmRhdGVfcmVjZWl2ZWQgPSBuZXdWYWx1ZS5kYXRlX3JlY2VpdmVkID8gbW9tZW50KG5ld1ZhbHVlLmRhdGVfcmVjZWl2ZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpIDogbnVsbFxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNob3dTZW50TW9kYWwgKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzUm9sZSgnYWRtaW4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kYWwxID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzaG93UmVjZWl2ZWRNb2RhbCAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYW4oJ2VkaXRfb3JkZXInKSB8IHRoaXMuaGFzUm9sZSgnYWRtaW4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kYWwyID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0b1Byb3BlckNhc2UgKGtleSkge1xuICAgICAgICAgICAgbGV0IG5ld1N0ciA9IGtleS5yZXBsYWNlKC9fL2csICcgJylcbiAgICAgICAgICAgIHJldHVybiBuZXdTdHIucmVwbGFjZSgvXFx3XFxTKi9nLCBmdW5jdGlvbiAodHh0KSB7IHJldHVybiB0eHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eHQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkgfSlcbiAgICAgICAgfSxcbiAgICAgICAgc3VibWl0ICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5zaGlwbWVudEZvcm0uYnVzeSA9IHRydWVcbiAgICAgICAgICAgIEFwcC5wb3N0KHJvdXRlKCdhcGkub3JkZXJzLnNoaXBtZW50X2RldGFpbHMnLCB7b3JkZXI6IHNlbGYub3JkZXIuaWR9KSwgc2VsZi5zaGlwbWVudEZvcm0pLnRoZW4oKHttZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuc2hpcG1lbnRGb3JtLmJ1c3kgPSBmYWxzZVxuICAgICAgICAgICAgICAgIC8vIGVkaXQgdGhlIGFycmF5IG9mIG9yZGVycyBieSBwYXNzaW5nIHRoZSB3aG9sZSBvYmplY3Qgb2YgZWFjaCBvcmRlclxuICAgICAgICAgICAgICAgIHNlbGYub3JkZXIuc2hpcG1lbnQudHJhY2tpbmdfbm8gPSBzZWxmLnNoaXBtZW50Rm9ybS50cmFja2luZ19ub1xuICAgICAgICAgICAgICAgIHNlbGYub3JkZXIuc2hpcG1lbnQuc2VudCA9IHNlbGYuc2hpcG1lbnRGb3JtLnNlbnRcbiAgICAgICAgICAgICAgICBzZWxmLm9yZGVyLnNoaXBtZW50LmRhdGVfc2VudCA9IHNlbGYuc2hpcG1lbnRGb3JtLmRhdGVfc2VudFxuICAgICAgICAgICAgICAgIHNlbGYub3JkZXIuc2hpcG1lbnQucmVjZWl2ZWQgPSBzZWxmLnNoaXBtZW50Rm9ybS5yZWNlaXZlZFxuICAgICAgICAgICAgICAgIHNlbGYub3JkZXIuc2hpcG1lbnQuZGF0ZV9yZWNlaXZlZCA9IHNlbGYuc2hpcG1lbnRGb3JtLmRhdGVfcmVjZWl2ZWRcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5zaGlwbWVudEZvcm0uYnVzeSA9IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gU2hpcG1lbnREZXRhaWxzLnZ1ZT8yMWE5YTY1MiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF92bS5zaGlwbWVudEZvcm0uY291cmllclxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJzdWJoZWFkZXIgcHJpbWFyeS0tdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIkRlbGl2ZXJ5IE1ldGhvZDpcIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLnNoaXBtZW50Rm9ybS5jb3VyaWVyXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vcFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk1vZGUgT2YgUGF5bWVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaGlwbWVudEZvcm0uY291cmllci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zaGlwbWVudEZvcm0uY291cmllci5uYW1lID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNoaXBtZW50Rm9ybS5jb3VyaWVyLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uc2hpcG1lbnRGb3JtLmNvdXJpZXJcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICBfdm0uX2woX3ZtLnNoaXBtZW50Rm9ybS5jb3VyaWVyLmRldGFpbHMsIGZ1bmN0aW9uKFxuICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICBpbmRleFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBrZXk6IGtleSwgYXR0cnM6IHsgcm93OiBcIlwiLCBpbmRleDogaW5kZXggfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhzMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbTEyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWQxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxnMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB4bDEyOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrZXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF92bS50b1Byb3BlckNhc2Uoa2V5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkb25seTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwic3ViaGVhZGVyIHByaW1hcnktLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihcIlNoaXBtZW50IFN0YXR1czpcIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0cmFja2luZ19ub1wiLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVHJhY2tpbmcgTm9cIixcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiVHJhY2tpbmcgTm9cIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiVHJhY2tpbmcgTm9cIiksXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLXRydWNrXCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhX3ZtLmhhc1JvbGUoXCJhZG1pblwiKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2hpcG1lbnRGb3JtLnRyYWNraW5nX25vLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0uc2hpcG1lbnRGb3JtLnRyYWNraW5nX25vID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzaGlwbWVudEZvcm0udHJhY2tpbmdfbm9cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGF0ZSBTZW50XCIsXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImV2ZW50XCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcIkRhdGUgU2VudFwiLFxuICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJEYXRlIFNlbnRcIiksXG4gICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjogeyBjbGljazogX3ZtLnNob3dTZW50TW9kYWwgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaGlwbWVudEZvcm0uZGF0ZV9zZW50LFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0uc2hpcG1lbnRGb3JtLmRhdGVfc2VudCA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2hpcG1lbnRGb3JtLmRhdGVfc2VudFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWRpYWxvZ1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhenk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZnVsbC13aWR0aFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ubW9kYWwxLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLm1vZGFsMSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIm1vZGFsMVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtZGF0ZS1waWNrZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzY3JvbGxhYmxlOiBcIlwiLCBhY3Rpb25zOiBcIlwiLCBsaWdodDogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZSA9IHJlZi5zYXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYW5jZWwgPSByZWYuY2FuY2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1hY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBmbGF0OiBcIlwiLCBjb2xvcjogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBjYW5jZWwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIkNhbmNlbFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGZsYXQ6IFwiXCIsIGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IHNhdmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIk9LXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaGlwbWVudEZvcm0uZGF0ZV9zZW50LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zaGlwbWVudEZvcm0uZGF0ZV9zZW50ID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNoaXBtZW50Rm9ybS5kYXRlX3NlbnRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtY2hlY2tib3hcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIV92bS5oYXNSb2xlKFwiYWRtaW5cIiksXG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJTZW50XCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogXCJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2hpcG1lbnRGb3JtLnNlbnQsXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5zaGlwbWVudEZvcm0uc2VudCA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2hpcG1lbnRGb3JtLnNlbnRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGF0ZSBSZWNlaXZlZFwiLFxuICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJldmVudFwiLFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJEYXRlIFJlY2VpdmVkXCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIkRhdGUgUmVjZWl2ZWRcIiksXG4gICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjogeyBjbGljazogX3ZtLnNob3dSZWNlaXZlZE1vZGFsIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2hpcG1lbnRGb3JtLmRhdGVfcmVjZWl2ZWQsXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5zaGlwbWVudEZvcm0uZGF0ZV9yZWNlaXZlZCA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2hpcG1lbnRGb3JtLmRhdGVfcmVjZWl2ZWRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1kaWFsb2dcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBwZXJzaXN0ZW50OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsYXp5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBcImZ1bGwtd2lkdGhcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLm1vZGFsMixcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5tb2RhbDIgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJtb2RhbDJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWRhdGUtcGlja2VyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc2Nyb2xsYWJsZTogXCJcIiwgYWN0aW9uczogXCJcIiwgbGlnaHQ6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNhdmUgPSByZWYuc2F2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FuY2VsID0gcmVmLmNhbmNlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtYWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZmxhdDogXCJcIiwgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogY2FuY2VsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJDYW5jZWxcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBmbGF0OiBcIlwiLCBjb2xvcjogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBzYXZlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJPS1wiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2hpcG1lbnRGb3JtLmRhdGVfcmVjZWl2ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNoaXBtZW50Rm9ybS5kYXRlX3JlY2VpdmVkID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNoaXBtZW50Rm9ybS5kYXRlX3JlY2VpdmVkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LWNoZWNrYm94XCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0uY2FuKFwiZWRpdF9vcmRlclwiKSB8fCAhX3ZtLmhhc1JvbGUoXCJhZG1pblwiKSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlJlY2VpdmVkXCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogXCJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2hpcG1lbnRGb3JtLnJlY2VpdmVkLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0uc2hpcG1lbnRGb3JtLnJlY2VpdmVkID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzaGlwbWVudEZvcm0ucmVjZWl2ZWRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJ3aGl0ZS0tdGV4dFwiLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBwcmltYXJ5OiAhX3ZtLnNoaXBtZW50Rm9ybS5idXN5LFxuICAgICAgICAgICAgZXJyb3I6IF92bS5zaGlwbWVudEZvcm0uYnVzeVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgY29sb3I6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgbG9hZGluZzogX3ZtLnNoaXBtZW50Rm9ybS5idXN5LFxuICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5lcnJvcnMuYW55KClcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgIF92bS5zdWJtaXQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW192bS5fdihcIlVwZGF0ZVwiKV1cbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtMGZmMjM5NzNcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTBmZjIzOTczXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwbWVudERldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4NTdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vRmlsZVVwbG9hZGVyLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMGQxY2M2ZWZcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vRmlsZVVwbG9hZGVyLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcY29tcG9uZW50c1xcXFxkYXNoYm9hcmRcXFxcRmlsZVVwbG9hZGVyLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gRmlsZVVwbG9hZGVyLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0wZDFjYzZlZlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTBkMWNjNmVmXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL0ZpbGVVcGxvYWRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDg1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCI8dGVtcGxhdGU+XG5cbjx2LWNvbnRhaW5lciBmbHVpZD5cbiAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwiYmx1ZVwiIGZsYXQ+XG4gICAgICAgICAgICA8ZmlsZS11cGxvYWRcbiAgICAgICAgICAgICAgICA6cG9zdC1hY3Rpb249XCJwb3N0QWN0aW9uXCJcbiAgICAgICAgICAgICAgICA6cHV0LWFjdGlvbj1cInB1dEFjdGlvblwiXG4gICAgICAgICAgICAgICAgOmV4dGVuc2lvbnM9XCJleHRlbnNpb25zXCJcbiAgICAgICAgICAgICAgICA6YWNjZXB0PVwiYWNjZXB0XCJcbiAgICAgICAgICAgICAgICA6bXVsdGlwbGU9XCJtdWx0aXBsZVwiXG4gICAgICAgICAgICAgICAgOmRpcmVjdG9yeT1cImRpcmVjdG9yeVwiXG4gICAgICAgICAgICAgICAgOnNpemU9XCJzaXplIHx8IDBcIlxuICAgICAgICAgICAgICAgIDp0aHJlYWQ9XCJ0aHJlYWQgPCAxID8gMSA6ICh0aHJlYWQgPiA1ID8gNSA6IHRocmVhZClcIlxuICAgICAgICAgICAgICAgIDpoZWFkZXJzPVwiaGVhZGVyc1wiXG4gICAgICAgICAgICAgICAgOmRhdGE9XCJkYXRhXCJcbiAgICAgICAgICAgICAgICA6ZHJvcD1cImRyb3BcIlxuICAgICAgICAgICAgICAgIDpkcm9wLWRpcmVjdG9yeT1cImRyb3BEaXJlY3RvcnlcIlxuICAgICAgICAgICAgICAgIDphZGQtaW5kZXg9XCJhZGRJbmRleFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImZpbGVzXCJcbiAgICAgICAgICAgICAgICBAaW5wdXQtZmlsdGVyPVwiaW5wdXRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgIEBpbnB1dC1maWxlPVwiaW5wdXRGaWxlXCJcbiAgICAgICAgICAgICAgICByZWY9XCJ1cGxvYWRcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7bWFyZ2luOjEwcHg7XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQ2hvb3NlIEZpbGVzXG4gICAgICAgICAgICAgICAgPC9maWxlLXVwbG9hZD5cbiAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgPHYtYnRuIGZsYXQgaWNvbiBjb2xvcj1cImFtYmVyIGxpZ2h0ZW4tMlwiIEBjbGljay5uYXRpdmU9XCJpc09wdGlvbiA9ICFpc09wdGlvblwiPlxuICAgICAgICAgICAgPHYtaWNvbj5mYS1jb2c8L3YtaWNvbj5cbiAgICAgICAgPC92LWJ0bj5cbiAgICA8L3YtbGF5b3V0PlxuICAgIDx2LWxheW91dCByb3cgd3JhcCB2LWlmPVwiIWlzT3B0aW9uXCI+XG4gICAgICAgIDx2LWRhdGEtdGFibGVcbiAgICAgICAgICAgICAgICA6aGVhZGVycz1cInRoXCJcbiAgICAgICAgICAgICAgICA6aXRlbXM9XCJmaWxlc1wiXG4gICAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgbm8tZGF0YS10ZXh0PVwiQ2xpY2sgYENob29zZSBGaWxlc2AgQnV0dG9uIFRvIFVwbG9hZCBGaWxlcy5cIlxuICAgICAgICAgICAgICAgIDpyb3dzLXBlci1wYWdlLWl0ZW1zPVwicGVyUGFnZURhdGFcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJpdGVtc1wiIHNjb3BlPVwicHJvcHNcIj5cblxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgdi1pZj1cInByb3BzLml0ZW0udGh1bWJcIiA6c3JjPVwicHJvcHMuaXRlbS50aHVtYlwiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCJhdXRvXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1lbHNlPk5vIEltYWdlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtZWRpdC1kaWFsb2dcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgbGF6eVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiPnt7IHByb3BzLml0ZW0ubmFtZSB8IHRydW5jYXRlKDIwKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzbG90PVwiaW5wdXRcIiBjbGFzcz1cIm10LTMgdGV4dC14cy1jZW50ZXIgdGl0bGUgcHJpbWFyeS0tdGV4dFwiPlVwZGF0ZSBOYW1lPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgICAgICBzbG90PVwiaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkVkaXRcIlxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMuaXRlbS5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlLWxpbmVcbiAgICAgICAgICAgICAgICAgICAgY291bnRlclxuICAgICAgICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgICAgICAgOnJ1bGVzPVwiW21heElucHV0XVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC92LXRleHQtZmllbGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgPC92LWVkaXQtZGlhbG9nPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj57eyBwcm9wcy5pdGVtLnNpemUgfCBmb3JtYXRTaXplIH19PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICA8di1wcm9ncmVzcy1jaXJjdWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgOnNpemU9XCI0NVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6d2lkdGg9XCI1XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpyb3RhdGU9XCIzNjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOnZhbHVlPVwicHJvZ3Jlc3MocHJvcHMuaXRlbS5wcm9ncmVzcylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJwcm9wcy5pdGVtLmFjdGl2ZSB8fCBwcm9wcy5pdGVtLnByb2dyZXNzICE9PSAnMC4wMCdcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FwdGlvblwiPnt7IHByb2dyZXNzKHByb3BzLml0ZW0ucHJvZ3Jlc3MpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3YtcHJvZ3Jlc3MtY2lyY3VsYXI+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8IS0tIHN0YXR1cyAtLT5cbiAgICAgICAgICAgICAgICA8dGQgdi1pZj1cInByb3BzLml0ZW0uZXJyb3JcIiBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+e3twcm9wcy5pdGVtLmVycm9yfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCB2LWVsc2UtaWY9XCJwcm9wcy5pdGVtLnN1Y2Nlc3NcIiBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+c3VjY2VzczwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIHYtZWxzZS1pZj1cInByb3BzLml0ZW0uYWN0aXZlXCIgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPmFjdGl2ZTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIHYtZWxzZSBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+PC90ZD5cblxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtY2VudGVyIHByaW1hcnktLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGZsYXQgaWNvbiBjb2xvcj1cInJlZCBkYXJrZW4tNFwiIHYtaWY9XCJwcm9wcy5pdGVtLmFjdGl2ZVwiIEBjbGljay5uYXRpdmU9XCJwcm9wcy5pdGVtLmFjdGl2ZSA/ICRyZWZzLnVwbG9hZC51cGRhdGUocHJvcHMuaXRlbSwge2Vycm9yOiAnY2FuY2VsJ30pIDogZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5mYS10aW1lczwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVwiaW5mb1wiIHYtZWxzZS1pZj1cInByb3BzLml0ZW0uZXJyb3IgJiYgcHJvcHMuaXRlbS5lcnJvciAhPT0gJ2NvbXByZXNzaW5nJyAmJiAkcmVmcy51cGxvYWQuZmVhdHVyZXMuaHRtbDVcIiBAY2xpY2submF0aXZlPVwiJHJlZnMudXBsb2FkLnVwZGF0ZShwcm9wcy5pdGVtLCB7YWN0aXZlOiB0cnVlLCBlcnJvcjogJycsIHByb2dyZXNzOiAnMC4wMCd9KVwiPlxuICAgICAgICAgICAgICAgICAgICA8di1pY29uPmZhLXJlZnJlc2g8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGZsYXQgaWNvbiBjb2xvcj1cImJsdWVcIiB2LWVsc2UgQGNsaWNrLm5hdGl2ZT1cInByb3BzLml0ZW0uc3VjY2VzcyB8fCBwcm9wcy5pdGVtLmVycm9yID09PSAnY29tcHJlc3NpbmcnID8gZmFsc2UgOiAkcmVmcy51cGxvYWQudXBkYXRlKHByb3BzLml0ZW0sIHthY3RpdmU6IHRydWV9KVwiPlxuICAgICAgICAgICAgICAgICAgICA8di1pY29uPmZhLXVwbG9hZDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVwicmVkIGxpZ2h0ZW4tMlwiIEBjbGljay5uYXRpdmU9XCJyZW1vdmUocHJvcHMuaXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5mYS10cmFzaDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgICAgICA8L3YtZGF0YS10YWJsZT5cblxuICAgIDwvdi1sYXlvdXQ+XG4gICAgPHYtbGF5b3V0IHJvdyB3cmFwIHYtaWY9XCIhaXNPcHRpb25cIj5cbiAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgICAgIDx2LWJ0biBjb2xvcj1cInRlYWwgbGlnaHRlbi0yXCIgdi1zaG93PVwiZmlsZXMubGVuZ3RoID4gMFwiIEBjbGljay5uYXRpdmU9XCIkcmVmcy51cGxvYWQuYWN0aXZlID0gdHJ1ZVwiPlN0YXJ0IFVwbG9hZCA8di1pY29uIHJpZ2h0PnBsYXlfYXJyb3c8L3YtaWNvbj48L3YtYnRuPlxuICAgICAgICA8di1idG4gY29sb3I9XCJlcnJvclwiIHYtc2hvdz1cIiRyZWZzLnVwbG9hZCAmJiAkcmVmcy51cGxvYWQuYWN0aXZlXCIgQGNsaWNrLm5hdGl2ZT1cIiRyZWZzLnVwbG9hZC5hY3RpdmUgPSBmYWxzZVwiPlN0b3AgVXBsb2FkIDx2LWljb24gcmlnaHQ+c3RvcDwvdi1pY29uPjwvdi1idG4+XG4gICAgICAgIDx2LWJ0biBjb2xvcj1cInJlZCBsaWdodGVuLTJcIiB2LWlmPVwiJHJlZnMudXBsb2FkICYmICEkcmVmcy51cGxvYWQuYWN0aXZlICYmIGZpbGVzLmxlbmd0aCA+IDBcIiBAY2xpY2submF0aXZlPVwiZmlsZXMgPSBbXVwiPlJlbW92ZSBBbGwgRmlsZXMgPHYtaWNvbiByaWdodD5mYS10aW1lczwvdi1pY29uPjwvdi1idG4+XG4gICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgIDwvdi1sYXlvdXQ+XG4gICAgPHYtbGF5b3V0IHJvdyB3cmFwIHYtaWY9XCJpc09wdGlvblwiPlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJmYS1maWxlLWNvZGUtbyBcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiQWNjZXB0XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYWNjZXB0XCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGhpbnQ9XCJBbGxvdyB1cGxvYWQgbWltZSB0eXBlXCJcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50LWhpbnRcbiAgICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ21pbWUtdHlwZScpXCJcbiAgICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJtaW1lLXR5cGVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwiZmEtY29nc1wiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJFeHRlbnNpb25zXCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZXh0ZW5zaW9uc1wiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBoaW50PVwiQWxsb3cgdXBsb2FkIGZpbGUgZXh0ZW5zaW9uXCJcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50LWhpbnRcbiAgICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2V4dGVuc2lvbicpXCJcbiAgICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJleHRlbnNpb25cIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwiaHR0cFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJQdXQgVXJsXCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwicHV0QWN0aW9uXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGhpbnQ9XCJEaXNhYmxlZCBpZiBFbXB0eSwgQWZ0ZXIgdGhlIHNodXRkb3duLCB1c2UgdGhlIFBPU1QgbWV0aG9kIHRvIHVwbG9hZFwiXG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJodHRwXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlBvc3QgVXJsXCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwicG9zdEFjdGlvblwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBoaW50PVwiRGVmYXVsdCBQb3N0IFVSTFwiXG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdwb3N0LXVybCcpXCJcbiAgICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJwb3N0LXVybFwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJmYS1jdWJlc1wiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJUaHJlYWRcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ0aHJlYWRcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgaGludD1cIkFsc28gdXBsb2FkIHRoZSBudW1iZXIgb2YgZmlsZXMgYXQgdGhlIHNhbWUgdGltZSAobnVtYmVyIG9mIHRocmVhZHMpXCJcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50LWhpbnRcbiAgICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG51bWVyaWN8bWluX3ZhbHVlOjEnXCJcbiAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgndGhyZWFkJylcIlxuICAgICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cInRocmVhZFwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJ0cmVuZGluZ191cFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJNYXggc2l6ZVwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbC5udW1iZXI9XCJzaXplXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGhpbnQ9XCJTaXplIFVuaXQgaW4gYnl0ZVwiXG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdtYXgtc2l6ZScpXCJcbiAgICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJtYXgtc2l6ZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJ0cmVuZGluZ19kb3duXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIk1pbiBzaXplXCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsLm51bWJlcj1cIm1pblNpemVcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgaGludD1cIlNpemUgVW5pdCBpbiBieXRlXCJcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50LWhpbnRcbiAgICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ21pbi1zaXplJylcIlxuICAgICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cIm1pbi1zaXplXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cImZhLWNvbXByZXNzXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIkF1dG9tYXRpY2FsbHkgY29tcHJlc3NcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWwubnVtYmVyPVwiYXV0b0NvbXByZXNzXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnYXV0by1jb21wcmVzcycpXCJcbiAgICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJhdXRvLWNvbXByZXNzXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZ3JleS0tdGV4dCBjYXB0aW9uXCIgdi1pZj1cImF1dG9Db21wcmVzcyA+IDBcIj5Nb3JlIHRoYW4ge3thdXRvQ29tcHJlc3MgfCBmb3JtYXRTaXplfX0gZmlsZXMgYXJlIGF1dG9tYXRpY2FsbHkgY29tcHJlc3NlZDwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZ3JleS0tdGV4dCBjYXB0aW9uXCIgdi1lbHNlPlNldCB1cCBhdXRvbWF0aWMgY29tcHJlc3Npb248L3A+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di1jaGVja2JveCB2LWJpbmQ6bGFiZWw9XCJgRHJhZyBhbmQgZHJvcCB1cGxvYWQ6ICR7ZHJvcC50b1N0cmluZygpfWBcIiB2LW1vZGVsPVwiZHJvcFwiIGxpZ2h0Pjwvdi1jaGVja2JveD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LWNoZWNrYm94IHYtYmluZDpsYWJlbD1cImBOb3QgY2hlY2tlZCwgZmlsdGVyIHRoZSBkcmFnZ2VkIGZvbGRlcjogJHtkcm9wRGlyZWN0b3J5LnRvU3RyaW5nKCl9YFwiIHYtbW9kZWw9XCJkcm9wRGlyZWN0b3J5XCIgbGlnaHQ+PC92LWNoZWNrYm94PlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtY2hlY2tib3ggdi1iaW5kOmxhYmVsPVwiYEF1dG9tYXRpY2FsbHkgYWN0aXZhdGUgdXBsb2FkOiAke3VwbG9hZEF1dG8udG9TdHJpbmcoKX1gXCIgdi1tb2RlbD1cInVwbG9hZEF1dG9cIiBsaWdodD48L3YtY2hlY2tib3g+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgIDwvdi1sYXlvdXQ+XG48L3YtY29udGFpbmVyPlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEltYWdlQ29tcHJlc3NvciBmcm9tICdAeGtlc2hpL2ltYWdlLWNvbXByZXNzb3InXG5pbXBvcnQgRmlsZVVwbG9hZCBmcm9tICd2dWUtdXBsb2FkLWNvbXBvbmVudCdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogWyd0YWInLCAnb3JkZXInXSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEZpbGVVcGxvYWRcbiAgICB9LFxuICAgIG1vdW50ZWQgKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgLyogU2V0IFB1dCBVUkwgRW1wdHkgKG9wdGlvbmFsKSAqL1xuICAgICAgICBzZWxmLnB1dEFjdGlvbiA9ICcnXG4gICAgICAgIC8qIFNldCBSZXF1ZXN0IE5hbWUgKi9cbiAgICAgICAgc2VsZi5uYW1lID0gJ2ZpbGUnXG4gICAgICAgIC8qIFNldCBGaWxlIFVwbG9hZCB0byBTaW5nbGUgKi9cbiAgICAgICAgc2VsZi5tdWx0aXBsZSA9IGZhbHNlXG4gICAgICAgIC8qIEFkZCBQYXNzcG9ydCBBY2Nlc3MgVG9rZW4gKi9cbiAgICAgICAgc2VsZi5oZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7dGhpcy4kY29va2llLmdldCgnYWNjZXNzX3Rva2VuJyl9YFxuICAgICAgICAvKiBjaGFuZ2UgcG9zdCBVUkwgKi9cbiAgICAgICAgLyogSGFjayBGb3IgTWlzc2luZyBPcmRlciBPbiBGaWxlVXBsb2FkZXIgQ29tcG9uZW50ICovXG4gICAgICAgIEJ1cy4kb24oJ3NldC1vcmRlcicsIChvcmRlcikgPT4ge1xuICAgICAgICAgICAgc2VsZi5wb3N0QWN0aW9uID0gcm91dGUoJ2FwaS5tZWRpYS5yZWNlaXB0VXBsb2FkZXInLCB7b3JkZXI6IG9yZGVyLmlkfSlcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGRhdGEgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGg6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdUaHVtYicsIHZhbHVlOiAndGh1bWInLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ05hbWUnLCB2YWx1ZTogJ25hbWUnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1NpemUnLCB2YWx1ZTogJ3NpemUnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1Byb2dyZXNzJywgdmFsdWU6ICdwcm9ncmVzcycsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnU3RhdHVzJywgdmFsdWU6ICdzcGVlZCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnQWN0aW9ucycsIGFsaWduOiAnY2VudGVyJywgc29ydGFibGU6IGZhbHNlIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBmaWxlczogW10sXG4gICAgICAgICAgICAvKiBmaWxlIGNvbmZpZyAqL1xuICAgICAgICAgICAgYWNjZXB0OiAnaW1hZ2UvcG5nLGltYWdlL2dpZixpbWFnZS9qcGVnLGltYWdlL3dlYnAnLFxuICAgICAgICAgICAgZXh0ZW5zaW9uczogJ2dpZixqcGcsanBlZyxwbmcsd2VicCcsXG4gICAgICAgICAgICBtaW5TaXplOiAxMDI0LFxuICAgICAgICAgICAgc2l6ZTogMTAyNCAqIDEwMjQgKiAxMCxcbiAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiBmYWxzZSxcbiAgICAgICAgICAgIGRyb3A6IHRydWUsXG4gICAgICAgICAgICBkcm9wRGlyZWN0b3J5OiB0cnVlLFxuICAgICAgICAgICAgYWRkSW5kZXg6IGZhbHNlLFxuICAgICAgICAgICAgdGhyZWFkOiAzLFxuICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgcG9zdEFjdGlvbjogJy91cGxvYWRzL3Bvc3QnLFxuICAgICAgICAgICAgcHV0QWN0aW9uOiAnL3VwbG9hZHMvcHV0JyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnWC1Dc3JmLVRva2VuJzogQXBwLmNzcmZUb2tlbixcbiAgICAgICAgICAgICAgICAvKiBhZGRlZCBhY2Nlc3MgdG9rZW4gKi9cbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICdfY3NyZl90b2tlbic6IEFwcC5jc3JmVG9rZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvQ29tcHJlc3M6IDEwMjQgKiAxMDI0LFxuICAgICAgICAgICAgdXBsb2FkQXV0bzogZmFsc2UsXG4gICAgICAgICAgICAvKiBmaWxlIG9wdGlvbiAqL1xuICAgICAgICAgICAgaXNPcHRpb246IGZhbHNlLFxuICAgICAgICAgICAgLyogZmlsZSBuYW1lIHZhbGlkYXRpb24gKi9cbiAgICAgICAgICAgIG1heElucHV0OiAodikgPT4gdi5sZW5ndGggPD0gMzAgfHwgJ0lucHV0IHRvbyBsb25nIScsXG4gICAgICAgICAgICAvKiBmaWxlIHBlciBwYWdlICovXG4gICAgICAgICAgICBwZXJQYWdlRGF0YTogWzEwLCAyNSwgNTAsIHsgdGV4dDogJ0FsbCcsIHZhbHVlOiAtMSB9XVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHByb2dyZXNzIChwcm9wcykge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQocHJvcHMpXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZSAoZmlsZSkge1xuICAgICAgICAgICAgdGhpcy4kcmVmcy51cGxvYWQucmVtb3ZlKGZpbGUpXG4gICAgICAgIH0sXG4gICAgICAgIGlucHV0RmlsdGVyIChuZXdGaWxlLCBvbGRGaWxlLCBwcmV2ZW50KSB7XG4gICAgICAgICAgICBpZiAobmV3RmlsZSAmJiAhb2xkRmlsZSkge1xuICAgICAgICAgICAgICAgIC8vIEJlZm9yZSBhZGRpbmcgYSBmaWxlXG4gICAgICAgICAgICAgICAgLy8g5re75Yqg5paH5Lu25YmNXG5cbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgc3lzdGVtIGZpbGVzIG9yIGhpZGUgZmlsZXNcbiAgICAgICAgICAgICAgICAvLyDov4fmu6Tns7vnu5/mlofku7Yg5ZKM6ZqQ6JeP5paH5Lu2XG4gICAgICAgICAgICAgICAgaWYgKC8oXFwvfF4pKFRodW1ic1xcLmRifGRlc2t0b3BcXC5pbml8XFwuLispJC8udGVzdChuZXdGaWxlLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ZW50KClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgcGhwIGh0bWwganMgZmlsZVxuICAgICAgICAgICAgICAgIC8vIOi/h+a7pCBwaHAgaHRtbCBqcyDmlofku7ZcbiAgICAgICAgICAgICAgICBpZiAoL1xcLihwaHA1P3xodG1sP3xqc3g/KSQvaS50ZXN0KG5ld0ZpbGUubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZlbnQoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEF1dG9tYXRpYyBjb21wcmVzc2lvblxuICAgICAgICAgICAgICAgIC8vIOiHquWKqOWOi+e8qVxuICAgICAgICAgICAgICAgIGlmIChuZXdGaWxlLmZpbGUgJiYgbmV3RmlsZS50eXBlLnN1YnN0cigwLCA2KSA9PT0gJ2ltYWdlLycgJiYgdGhpcy5hdXRvQ29tcHJlc3MgPiAwICYmIHRoaXMuYXV0b0NvbXByZXNzIDwgbmV3RmlsZS5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbGUuZXJyb3IgPSAnY29tcHJlc3NpbmcnXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlQ29tcHJlc3NvciA9IG5ldyBJbWFnZUNvbXByZXNzb3IobnVsbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydFNpemU6IEluZmluaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IDUxMixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodDogNTEyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGltYWdlQ29tcHJlc3Nvci5jb21wcmVzcyhuZXdGaWxlLmZpbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMudXBsb2FkLnVwZGF0ZShuZXdGaWxlLCB7IGVycm9yOiAnJywgZmlsZSwgc2l6ZTogZmlsZS5zaXplLCB0eXBlOiBmaWxlLnR5cGUgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMudXBsb2FkLnVwZGF0ZShuZXdGaWxlLCB7IGVycm9yOiBlcnIubWVzc2FnZSB8fCAnY29tcHJlc3MnIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0ZpbGUgJiYgKCFvbGRGaWxlIHx8IG5ld0ZpbGUuZmlsZSAhPT0gb2xkRmlsZS5maWxlKSkge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIGJsb2IgZmllbGRcbiAgICAgICAgICAgICAgICAvLyDliJvlu7ogYmxvYiDlrZfmrrVcbiAgICAgICAgICAgICAgICBuZXdGaWxlLmJsb2IgPSAnJ1xuICAgICAgICAgICAgICAgIGxldCBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkxcbiAgICAgICAgICAgICAgICBpZiAoVVJMICYmIFVSTC5jcmVhdGVPYmplY3RVUkwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RmlsZS5ibG9iID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXdGaWxlLmZpbGUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVGh1bWJuYWlsc1xuICAgICAgICAgICAgICAgIC8vIOe8qeeVpeWbvlxuICAgICAgICAgICAgICAgIG5ld0ZpbGUudGh1bWIgPSAnJ1xuICAgICAgICAgICAgICAgIGlmIChuZXdGaWxlLmJsb2IgJiYgbmV3RmlsZS50eXBlLnN1YnN0cigwLCA2KSA9PT0gJ2ltYWdlLycpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RmlsZS50aHVtYiA9IG5ld0ZpbGUuYmxvYlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBhZGQsIHVwZGF0ZSwgcmVtb3ZlIEZpbGUgRXZlbnRcbiAgICAgICAgaW5wdXRGaWxlIChuZXdGaWxlLCBvbGRGaWxlKSB7XG4gICAgICAgICAgICBpZiAobmV3RmlsZSAmJiBvbGRGaWxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0ZpbGUuYWN0aXZlICYmICFvbGRGaWxlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBiZWZvcmVTZW5kXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWluIHNpemVcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0ZpbGUuc2l6ZSA+PSAwICYmIHRoaXMubWluU2l6ZSA+IDAgJiYgbmV3RmlsZS5zaXplIDwgdGhpcy5taW5TaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZC51cGRhdGUobmV3RmlsZSwgeyBlcnJvcjogJ3NpemUnIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3RmlsZS5wcm9ncmVzcyAhPT0gb2xkRmlsZS5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXdGaWxlLmVycm9yICYmICFvbGRGaWxlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdGaWxlLnJlc3BvbnNlLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG5ld0ZpbGUucmVzcG9uc2UubWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnI2U1NzM3MycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiAnU2VydmVyIEVycm9yJywgYmFja2dyb3VuZENvbG9yOiAnI2U1NzM3MycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3RmlsZS5zdWNjZXNzICYmICFvbGRGaWxlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgQnVzLiRlbWl0KCdmaWxlLXVwbG9hZGVkJywgbmV3RmlsZS5yZXNwb25zZS5vcmRlcilcbiAgICAgICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbmV3RmlsZS5yZXNwb25zZS5tZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbmV3RmlsZSAmJiBvbGRGaWxlKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlXG4gICAgICAgICAgICAgICAgaWYgKG9sZEZpbGUuc3VjY2VzcyAmJiBvbGRGaWxlLnJlc3BvbnNlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgdHlwZTogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgdXJsOiAnL3VwbG9hZC9kZWxldGU/aWQ9JyArIG9sZEZpbGUucmVzcG9uc2UuaWQsXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IGFjdGl2YXRlIHVwbG9hZFxuICAgICAgICAgICAgaWYgKEJvb2xlYW4obmV3RmlsZSkgIT09IEJvb2xlYW4ob2xkRmlsZSkgfHwgb2xkRmlsZS5lcnJvciAhPT0gbmV3RmlsZS5lcnJvcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVwbG9hZEF1dG8gJiYgIXRoaXMuJHJlZnMudXBsb2FkLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZC5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gRmlsZVVwbG9hZGVyLnZ1ZT8wNTE3M2RmNSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sb3I6IFwiYmx1ZVwiLCBmbGF0OiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJmaWxlLXVwbG9hZFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHJlZjogXCJ1cGxvYWRcIixcbiAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGN1cnNvcjogXCJwb2ludGVyXCIsIG1hcmdpbjogXCIxMHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwicG9zdC1hY3Rpb25cIjogX3ZtLnBvc3RBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIFwicHV0LWFjdGlvblwiOiBfdm0ucHV0QWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBfdm0uZXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0OiBfdm0uYWNjZXB0LFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZTogX3ZtLm11bHRpcGxlLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IF92bS5kaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IF92bS5zaXplIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgIHRocmVhZDpcbiAgICAgICAgICAgICAgICAgICAgICBfdm0udGhyZWFkIDwgMSA/IDEgOiBfdm0udGhyZWFkID4gNSA/IDUgOiBfdm0udGhyZWFkLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfdm0uaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogX3ZtLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGRyb3A6IF92bS5kcm9wLFxuICAgICAgICAgICAgICAgICAgICBcImRyb3AtZGlyZWN0b3J5XCI6IF92bS5kcm9wRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICBcImFkZC1pbmRleFwiOiBfdm0uYWRkSW5kZXhcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBcImlucHV0LWZpbHRlclwiOiBfdm0uaW5wdXRGaWx0ZXIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW5wdXQtZmlsZVwiOiBfdm0uaW5wdXRGaWxlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5maWxlcyxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5maWxlcyA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZpbGVzXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgQ2hvb3NlIEZpbGVzXFxuICAgICAgICAgICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7IGZsYXQ6IFwiXCIsIGljb246IFwiXCIsIGNvbG9yOiBcImFtYmVyIGxpZ2h0ZW4tMlwiIH0sXG4gICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgX3ZtLmlzT3B0aW9uID0gIV92bS5pc09wdGlvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiZmEtY29nXCIpXSldLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAhX3ZtLmlzT3B0aW9uXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi1kYXRhLXRhYmxlXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaGVhZGVyczogX3ZtLnRoLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IF92bS5maWxlcyxcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgXCJuby1kYXRhLXRleHRcIjpcbiAgICAgICAgICAgICAgICAgICAgXCJDbGljayBgQ2hvb3NlIEZpbGVzYCBCdXR0b24gVG8gVXBsb2FkIEZpbGVzLlwiLFxuICAgICAgICAgICAgICAgICAgXCJyb3dzLXBlci1wYWdlLWl0ZW1zXCI6IF92bS5wZXJQYWdlRGF0YVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJpdGVtc1wiLFxuICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLnRodW1iXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBwcm9wcy5pdGVtLnRodW1iLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCJhdXRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFwic3BhblwiLCBbX3ZtLl92KFwiTm8gSW1hZ2VcIildKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZWRpdC1kaWFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgbGFyZ2U6IFwiXCIsIGxhenk6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwidHJ1bmNhdGVcIikocHJvcHMuaXRlbS5uYW1lLCAyMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm10LTMgdGV4dC14cy1jZW50ZXIgdGl0bGUgcHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc2xvdDogXCJpbnB1dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJVcGRhdGUgTmFtZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJFZGl0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpbmdsZS1saW5lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2ZvY3VzOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXM6IFtfdm0ubWF4SW5wdXRdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcy5pdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0ubmFtZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicHJvcHMuaXRlbS5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uX2YoXCJmb3JtYXRTaXplXCIpKHByb3BzLml0ZW0uc2l6ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5hY3RpdmUgfHwgcHJvcHMuaXRlbS5wcm9ncmVzcyAhPT0gXCIwLjAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXByb2dyZXNzLWNpcmN1bGFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogNDUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGU6IDM2MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wcm9ncmVzcyhwcm9wcy5pdGVtLnByb2dyZXNzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwidGVhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJjYXB0aW9uXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnByb2dyZXNzKHByb3BzLml0ZW0ucHJvZ3Jlc3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHByb3BzLml0ZW0uZXJyb3IpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvcHMuaXRlbS5zdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcInN1Y2Nlc3NcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcm9wcy5pdGVtLmFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcImFjdGl2ZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcInRkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtY2VudGVyIHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5hY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcInJlZCBkYXJrZW4tNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF92bS4kcmVmcy51cGxvYWQudXBkYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBlcnJvcjogXCJjYW5jZWxcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJmYS10aW1lc1wiKV0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvcHMuaXRlbS5lcnJvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLmVycm9yICE9PSBcImNvbXByZXNzaW5nXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRyZWZzLnVwbG9hZC5mZWF0dXJlcy5odG1sNVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJpbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHJlZnMudXBsb2FkLnVwZGF0ZShwcm9wcy5pdGVtLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBcIjAuMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLXJlZnJlc2hcIildKV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJibHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLnN1Y2Nlc3MgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uZXJyb3IgPT09IFwiY29tcHJlc3NpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLiRyZWZzLnVwbG9hZC51cGRhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3RpdmU6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLXVwbG9hZFwiKV0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcInJlZCBsaWdodGVuLTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZW1vdmUocHJvcHMuaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLXRyYXNoXCIpXSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAhX3ZtLmlzT3B0aW9uXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZmlsZXMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZpbGVzLmxlbmd0aCA+IDBcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwidGVhbCBsaWdodGVuLTJcIiB9LFxuICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS4kcmVmcy51cGxvYWQuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCJTdGFydCBVcGxvYWQgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyByaWdodDogXCJcIiB9IH0sIFtfdm0uX3YoXCJwbGF5X2Fycm93XCIpXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS4kcmVmcy51cGxvYWQgJiYgX3ZtLiRyZWZzLnVwbG9hZC5hY3RpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIkcmVmcy51cGxvYWQgJiYgJHJlZnMudXBsb2FkLmFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJlcnJvclwiIH0sXG4gICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLiRyZWZzLnVwbG9hZC5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCJTdG9wIFVwbG9hZCBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IHJpZ2h0OiBcIlwiIH0gfSwgW192bS5fdihcInN0b3BcIildKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0uJHJlZnMudXBsb2FkICYmXG4gICAgICAgICAgICAgICFfdm0uJHJlZnMudXBsb2FkLmFjdGl2ZSAmJlxuICAgICAgICAgICAgICBfdm0uZmlsZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInJlZCBsaWdodGVuLTJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5maWxlcyA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiUmVtb3ZlIEFsbCBGaWxlcyBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyByaWdodDogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcImZhLXRpbWVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIilcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5pc09wdGlvblxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcImZhLWZpbGUtY29kZS1vIFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFjY2VwdFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIkFsbG93IHVwbG9hZCBtaW1lIHR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwibWltZS10eXBlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwibWltZS10eXBlXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmFjY2VwdCxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uYWNjZXB0ID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImFjY2VwdFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwiZmEtY29nc1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkV4dGVuc2lvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJpbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgaGludDogXCJBbGxvdyB1cGxvYWQgZmlsZSBleHRlbnNpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiZXh0ZW5zaW9uXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiZXh0ZW5zaW9uXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmV4dGVuc2lvbnMgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZXh0ZW5zaW9uc1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcImh0dHBcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQdXQgVXJsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBcIkRpc2FibGVkIGlmIEVtcHR5LCBBZnRlciB0aGUgc2h1dGRvd24sIHVzZSB0aGUgUE9TVCBtZXRob2QgdG8gdXBsb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJwZXJzaXN0ZW50LWhpbnRcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucHV0QWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5wdXRBY3Rpb24gPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicHV0QWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kLWljb25cIjogXCJodHRwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG9zdCBVcmxcIixcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJpbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgaGludDogXCJEZWZhdWx0IFBvc3QgVVJMXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJwZXJzaXN0ZW50LWhpbnRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcInBvc3QtdXJsXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwicG9zdC11cmxcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucG9zdEFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0ucG9zdEFjdGlvbiA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwb3N0QWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bnVtZXJpY3xtaW5fdmFsdWU6MVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bnVtZXJpY3xtaW5fdmFsdWU6MSdcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwiZmEtY3ViZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUaHJlYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJpbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgaGludDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQWxzbyB1cGxvYWQgdGhlIG51bWJlciBvZiBmaWxlcyBhdCB0aGUgc2FtZSB0aW1lIChudW1iZXIgb2YgdGhyZWFkcylcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwidGhyZWFkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwidGhyZWFkXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnRocmVhZCxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0udGhyZWFkID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInRocmVhZFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwidHJlbmRpbmdfdXBcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJNYXggc2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIlNpemUgVW5pdCBpbiBieXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJwZXJzaXN0ZW50LWhpbnRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIm1heC1zaXplXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwibWF4LXNpemVcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2l6ZSA9IF92bS5fbigkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNpemVcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcInRyZW5kaW5nX2Rvd25cIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJNaW4gc2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIlNpemUgVW5pdCBpbiBieXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJwZXJzaXN0ZW50LWhpbnRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIm1pbi1zaXplXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwibWluLXNpemVcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ubWluU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0ubWluU2l6ZSA9IF92bS5fbigkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIm1pblNpemVcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcImZhLWNvbXByZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQXV0b21hdGljYWxseSBjb21wcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImF1dG8tY29tcHJlc3NcIiksXG4gICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJhdXRvLWNvbXByZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmF1dG9Db21wcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uYXV0b0NvbXByZXNzID0gX3ZtLl9uKCQkdilcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYXV0b0NvbXByZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLmF1dG9Db21wcmVzcyA+IDBcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJncmV5LS10ZXh0IGNhcHRpb25cIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiTW9yZSB0aGFuIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLl9mKFwiZm9ybWF0U2l6ZVwiKShfdm0uYXV0b0NvbXByZXNzKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIGZpbGVzIGFyZSBhdXRvbWF0aWNhbGx5IGNvbXByZXNzZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIDogX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiZ3JleS0tdGV4dCBjYXB0aW9uXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiU2V0IHVwIGF1dG9tYXRpYyBjb21wcmVzc2lvblwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtY2hlY2tib3hcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRyYWcgYW5kIGRyb3AgdXBsb2FkOiBcIiArIF92bS5kcm9wLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmRyb3AsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRyb3AgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZHJvcFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtY2hlY2tib3hcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOlxuICAgICAgICAgICAgICAgICAgICAgICAgXCJOb3QgY2hlY2tlZCwgZmlsdGVyIHRoZSBkcmFnZ2VkIGZvbGRlcjogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRyb3BEaXJlY3RvcnkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZHJvcERpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uZHJvcERpcmVjdG9yeSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJkcm9wRGlyZWN0b3J5XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1jaGVja2JveFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6XG4gICAgICAgICAgICAgICAgICAgICAgICBcIkF1dG9tYXRpY2FsbHkgYWN0aXZhdGUgdXBsb2FkOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0udXBsb2FkQXV0by50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS51cGxvYWRBdXRvLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS51cGxvYWRBdXRvID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInVwbG9hZEF1dG9cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0wZDFjYzZlZlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMGQxY2M2ZWZcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL0ZpbGVVcGxvYWRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDg2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwibWFpbi1sYXlvdXRcIixcbiAgICB7IHN0eWxlOiB7IHBhZGRpbmdUb3A6IFwiMTAwcHhcIiwgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJkYXNoLXBhbmVsc1wiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICB1bnBhaWQ6IF92bS51bnBhaWQsXG4gICAgICAgICAgICAgIHBhaWQ6IF92bS5wYWlkLFxuICAgICAgICAgICAgICBzZW50OiBfdm0uc2VudCxcbiAgICAgICAgICAgICAgcmVjZWl2ZWQ6IF92bS5yZWNlaXZlZCxcbiAgICAgICAgICAgICAgdG90YWw6IF92bS50b3RhbCxcbiAgICAgICAgICAgICAgdW5zZW50OiBfdm0udW5zZW50LFxuICAgICAgICAgICAgICBkb25lOiBfdm0uZG9uZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LWRhdGEtdGFibGVcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfdm0uaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBfdm0uaXRlbXMsXG4gICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgIGV4cGFuZDogXCJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJpdGVtc1wiLFxuICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwicHJpbWFyeVwiLCBpY29uOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuZXhwYW5kZWQgPSAhcHJvcHMuZXhwYW5kZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwic2hvcHBpbmdfYmFza2V0XCIpXSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MocHJvcHMuaXRlbS5pZCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwiY3VycmVuY3lcIikoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG90YWxBbW91bnQocHJvcHMuaXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVuY3lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtc3dpdGNoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3BzLml0ZW0ucGF5bWVudC5wYWlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJQYWlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlVucGFpZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJ0ZWFsIGRhcmtlbi00XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0uaGFzUm9sZShcImFkbWluXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b2dnbGVQYWlkKHByb3BzLml0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcy5pdGVtLnBheW1lbnQucGFpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLnBheW1lbnQucGFpZCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwcm9wcy5pdGVtLnBheW1lbnQucGFpZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLnNoaXBtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJ2LXN3aXRjaFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJvcHMuaXRlbS5zaGlwbWVudC5zZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiU2VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiT24tSG9sZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiY3lhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0uaGFzUm9sZShcImFkbWluXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG9nZ2xlU2VudChwcm9wcy5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByb3BzLml0ZW0uc2hpcG1lbnQuc2VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uc2hpcG1lbnQuc2VudCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInByb3BzLml0ZW0uc2hpcG1lbnQuc2VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5zaGlwbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwidi1zd2l0Y2hcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3BzLml0ZW0uc2hpcG1lbnQucmVjZWl2ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJSZWNlaXZlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiUGVuZGluZ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwibGlnaHQtZ3JlZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b2dnbGVSZWNlaXZlZChwcm9wcy5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByb3BzLml0ZW0uc2hpcG1lbnQucmVjZWl2ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLnNoaXBtZW50LnJlY2VpdmVkID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicHJvcHMuaXRlbS5zaGlwbWVudC5yZWNlaXZlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXN3aXRjaFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5pdGVtLmRvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIkNvbXBsZXRlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJPbi1Qcm9ncmVzc1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJ0ZWFsIGxpZ2h0ZW4tMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhX3ZtLmhhc1JvbGUoXCJhZG1pblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG9nZ2xlRG9uZShwcm9wcy5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcHJvcHMuaXRlbS5kb25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uZG9uZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwcm9wcy5pdGVtLmRvbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIV92bS5jYW4oXCJlZGl0X29yZGVyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJhY2NlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNldEN1cnJlbnRPcmRlcihwcm9wcy5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJmYS1lZGl0XCIpXSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0uY2FuKFwiZGVsZXRlX29yZGVyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJlcnJvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGVsZXRlT3JkZXIocHJvcHMuaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiZmEtdHJhc2hcIildKV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJleHBhbmRcIixcbiAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1kYXRhLXRhYmxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogX3ZtLmdldEl0ZW1zKHByb3BzLml0ZW0uY2FydCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoaWRlLWFjdGlvbnNcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaGVhZGVyc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKG9yZGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGhcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWxlZnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJQcm9kdWN0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRoXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1sZWZ0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiUXR5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRoXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1sZWZ0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiUHJpY2VcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGhcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWxlZnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJUYXhcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGhcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWxlZnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJTdWJ0b3RhbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJpdGVtc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKG9yZGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWxlZnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKG9yZGVycy5pdGVtLm5hbWUpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJzLml0ZW0ub3B0aW9ucyAhPT0ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKG9yZGVycy5pdGVtLm9wdGlvbnMsIGZ1bmN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluZm8tLXRleHQgY2FwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiKFwiICsgX3ZtLl9zKG9wdGlvbikgKyBcIilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWxlZnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKG9yZGVycy5pdGVtLnF0eSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1sZWZ0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwiY3VycmVuY3lcIikoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcnMuaXRlbS5wcmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW5jeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtbGVmdFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcImN1cnJlbmN5XCIpKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdChvcmRlcnMuaXRlbS50YXgpLnRvRml4ZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVuY3lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWxlZnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJjdXJyZW5jeVwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVycy5pdGVtLnN1YnRvdGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbmN5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwicGFnZVRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBwYWdlU3RhcnQgPSByZWYucGFnZVN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VTdG9wID0gcmVmLnBhZ2VTdG9wXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgIEZyb20gXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhwYWdlU3RhcnQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiB0byBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHBhZ2VTdG9wKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWRpYWxvZ1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW46IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IFwiZGlhbG9nLWJvdHRvbS10cmFuc2l0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5kaWFsb2csXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlhbG9nID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZGlhbG9nXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGxpZ2h0OiB0cnVlIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2xiYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sb3I6IFwiYWNjZW50XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZXJyb3ItLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGljb246IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlhbG9nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJjbG9zZVwiKV0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10b29sYmFyLXRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXBkYXRlIE9yZGVyIE5vLiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5jdXJyZW50X29yZGVyLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2xiYXItaXRlbXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5mby0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGZsYXQ6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlhbG9nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJTYXZlXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtdGFic1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uYWN0aXZlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uYWN0aXZlLm5hbWUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJhY3RpdmUubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRhYnMtYmFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYWNjZW50XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0udGFicywgZnVuY3Rpb24odGFiLCBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRhYnMtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6IFwiI1wiICsgdGFiLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaXBwbGU6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyh0YWIubmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRhYnMtc2xpZGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInByaW1hcnlcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRhYnMtaXRlbXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJzLCBmdW5jdGlvbih0YWIsIGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10YWJzLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBrZXksIGF0dHJzOiB7IGlkOiB0YWIubmFtZSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBmbGF0OiBcIlwiLCBsaWdodDogdHJ1ZSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ModGFiLmNvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6IFwiY29tcG9uZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiOiB0YWIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IF92bS5jdXJyZW50X29yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1jNTIwNWU4Y1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtYzUyMDVlOGNcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiJdLCJzb3VyY2VSb290IjoiIn0=