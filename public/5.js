webpackJsonp([5],{

/***/ 633:
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

/***/ 639:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(711)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(713)
/* template */
var __vue_template__ = __webpack_require__(714)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4c5b9ee6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\pages\\Categories.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Categories.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c5b9ee6", Component.options)
  } else {
    hotAPI.reload("data-v-4c5b9ee6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 652:
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

var listToStyles = __webpack_require__(660)

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

/***/ 653:
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

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(655);

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

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(656), __esModule: true };

/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(657);
module.exports = __webpack_require__(31).Object.assign;


/***/ }),

/***/ 657:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(60);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(658) });


/***/ }),

/***/ 658:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(91);
var gOPS = __webpack_require__(132);
var pIE = __webpack_require__(92);
var toObject = __webpack_require__(312);
var IObject = __webpack_require__(311);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(67)(function () {
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

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(851)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(667)
/* template */
var __vue_template__ = __webpack_require__(853)
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

/***/ 660:
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

/***/ 661:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(662)
/* template */
var __vue_template__ = __webpack_require__(693)
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

/***/ 662:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AppFooter_vue__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AppFooter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_AppFooter_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_AppNavBar_vue__ = __webpack_require__(670);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_AppNavBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__partials_AppNavBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_LeftSideBar_vue__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_LeftSideBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__partials_LeftSideBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_FabButton_vue__ = __webpack_require__(686);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_FabButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_FabButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__partials_CookieLaw_vue__ = __webpack_require__(689);
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

/***/ 663:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(664)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(666)
/* template */
var __vue_template__ = __webpack_require__(669)
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

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(665);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(652)("0b1532a7", content, false);
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

/***/ 665:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AppFooter.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_theme__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VLink_vue__ = __webpack_require__(659);
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

/***/ 667:
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
            this.$router.push({ path: '' + href });
        }
    }
});

/***/ }),

/***/ 669:
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

/***/ 670:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(671)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(673)
/* template */
var __vue_template__ = __webpack_require__(674)
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

/***/ 671:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(672);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(652)("3297ebe2", content, false);
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

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AppNavBar.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_theme__ = __webpack_require__(653);
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
//
//
//
//
//
//
//




var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["createNamespacedHelpers"])('cart'),
    mapState = _createNamespacedHelp.mapState,
    mapActions = _createNamespacedHelp.mapActions;

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

    methods: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapActions({
        destroyCart: 'destroyCart'
    }), {
        /* Use Vuetify Modal */
        openShoppingCart: function openShoppingCart() {
            Bus.$emit('shopping-cart-open');
        },
        emptyCart: function emptyCart() {
            var self = this;
            self.destroyCart();
        },
        toggleDrawer: function toggleDrawer() {
            Bus.$emit('toggleDrawer');
        },

        /* Uses Cart Route */
        openCart: function openCart() {
            var self = this;
            self.$router.push({ name: 'cart' });
        }
    }),
    watch: {
        getCount: function getCount(newValue) {
            var self = this;
            self.count = newValue;
        }
    }
});

/***/ }),

/***/ 674:
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
          _vm.count > 0
            ? _c(
                "v-btn",
                {
                  attrs: {
                    slot: "activator",
                    flat: "",
                    icon: "",
                    color: "error"
                  },
                  on: {
                    click: function($event) {
                      _vm.emptyCart()
                    }
                  },
                  slot: "activator"
                },
                [_c("v-icon", [_vm._v("remove_shopping_cart")])],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c("span", [_vm._v("Empty | Cart")])
        ],
        1
      ),
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

/***/ 675:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(676)
/* template */
var __vue_template__ = __webpack_require__(685)
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

/***/ 676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VLink_vue__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_VLink_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_CategoryLink_vue__ = __webpack_require__(839);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_CategoryLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_CategoryLink_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_theme__ = __webpack_require__(653);
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
        getAuth: 'getAuth'
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

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-navigation-drawer",
    {
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

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(687)
/* template */
var __vue_template__ = __webpack_require__(688)
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

/***/ 687:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(654);
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

/***/ 688:
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

/***/ 689:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(690)
/* template */
var __vue_template__ = __webpack_require__(692)
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

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_cookie_law__ = __webpack_require__(691);
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

/***/ 691:
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

/***/ 692:
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

/***/ 693:
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

/***/ 711:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(712);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(652)("2108a71c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4c5b9ee6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Categories.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4c5b9ee6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Categories.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 712:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n.breadcrumbs li[data-v-4c5b9ee6]:not(:last-child):after {\n    color: #009688;\n    content: attr(data-divider);\n    vertical-align: middle;\n}\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/pages/Categories.vue?7a43c93b"],"names":[],"mappings":";AAgMA;IACA,eAAA;IACA,4BAAA;IACA,uBAAA;CACA","file":"Categories.vue","sourcesContent":["<template>\n  <main-layout :class=\"[contentClass]\">\n      <v-container fluid grid-list-md style=\"padding-top:100px;\">\n        <v-layout row wrap>\n            <v-breadcrumbs icons divider=\"forward\">\n                <v-breadcrumbs-item\n                active-class=\"primary--text\"\n                :disabled=\"false\"\n                to=\"/\"\n                >\n                    Home\n                </v-breadcrumbs-item>\n                <v-breadcrumbs-item\n                :disabled=\"true\"\n                >\n                    Categories\n                </v-breadcrumbs-item>\n            </v-breadcrumbs>\n        </v-layout>\n        <v-layout row wrap style=\"padding-top:100px;\">\n          <v-flex\n            xs12 sm12 md4 lg4 xl4\n            v-for=\"(category,index) in categories\"\n            :key=\"category.slug\" :index=\"index\"\n          >\n            <v-card :dark=\"true\">\n            <clazy-load :src=\"category.image\">\n                <transition name=\"fade\" slot=\"image\">\n                    <v-card-media\n                        :src=\"category.image\"\n                        height=\"200px\"\n                    >\n                        <v-container fill-height fluid>\n                            <v-layout fill-height>\n                                <v-flex xs12 align-end flexbox>\n                                <span class=\"headline\" v-text=\"category.name\"></span>\n                                </v-flex>\n                            </v-layout>\n                        </v-container>\n                    </v-card-media>\n                </transition>\n                <transition name=\"fade\" slot=\"placeholder\">\n                    <v-card-media\n                    src=\"/img/Bars.svg\"\n                    height=\"200px\"\n                    width=\"200px\"\n                    >\n                        <v-container fill-height fluid>\n                            <v-layout fill-height>\n                                <v-flex xs12 align-end flexbox>\n                                    <span class=\"headline\" v-text=\"category.name\"></span>\n                                </v-flex>\n                            </v-layout>\n                        </v-container>\n                    </v-card-media>\n                </transition>\n              </clazy-load>\n              <v-card-actions class=\"accent\">\n                <span class=\"body-2\">View Product List</span>\n                <v-spacer></v-spacer>\n                <v-btn flat icon color=\"primary\" slot=\"activator\" @click=\"showCategory(category.slug)\">\n                <v-icon>fa-list</v-icon>\n                </v-btn>\n                <!-- Add Other Action buttons Here -->\n              </v-card-actions>\n            </v-card>\n          </v-flex>\n        </v-layout>\n        <v-layout v-if=\"!noPagination\" row wrap>\n            <v-flex xs12>\n                <div class=\"text-xs-center\">\n                    <v-pagination\n                    :length=\"length\"\n                    v-model=\"page\"\n                    circle\n                    >\n                    </v-pagination>\n                </div>\n            </v-flex>\n            <v-flex xs12>\n                <v-card flat class=\"grey lighten-4\" height=\"50px\"></v-card>\n            </v-flex>\n        </v-layout>\n        <!-- If No Pagination Then Add 50px Height -->\n        <v-layout v-else row wrap>\n            <v-flex xs12>\n                <v-card flat class=\"grey lighten-4\" height=\"50px\"></v-card>\n            </v-flex>\n        </v-layout>\n      </v-container>\n    </v-flex>\n  </v-layout>\n  </main-layout>\n</template>\n\n<script>\nimport MainLayout from '../layouts/Main.vue'\nimport Theme from '../mixins/theme'\n\nexport default {\n    props: ['query'],\n    mixins: [Theme],\n    data: () => ({\n        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },\n        categories: [],\n        links: {\n            first: null,\n            last: null,\n            prev: null,\n            next: null\n        },\n        meta: {\n            current_page: 1,\n            from: 0,\n            last_page: 0,\n            path: null,\n            per_page: 0,\n            to: 0,\n            total: 0\n        },\n        page: 1\n    }),\n    computed: {\n        length () {\n            let self = this\n            return Math.round(self.meta.total / (self.meta.per_page))\n        },\n        noPagination () {\n            let self = this\n            return self.meta.total === self.meta.per_page\n        }\n    },\n    created () {\n        let self = this\n        self.getCategories()\n    },\n    mounted () {\n        let self = this\n        self.page = parseInt(self.query.page)\n    },\n    methods: {\n        async getCategories () {\n            let self = this\n            let page = self.$route.query.page || 1\n            await axios.get(`${route('api.category.index')}?page=${page}`).then((response) => {\n                self.categories = response.data.data\n                self.links = response.data.links\n                self.meta = response.data.meta\n                // vm.$popup({ message: `Category Page: ${page}`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n            }).catch(({errors, message}) => {\n                console.log(errors)\n                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n            })\n        },\n        async loadCategories () {\n            let self = this\n            await axios.get(`${route('api.category.index')}?page=${self.page}`).then((response) => {\n                self.categories = response.data.data\n                self.links = response.data.links\n                self.meta = response.data.meta\n                // vm.$popup({ message: `Category Page: ${self.page}`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n            }).catch(({errors, message}) => {\n                console.log(errors)\n                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n            })\n        },\n        showCategory (slug) {\n            let self = this\n            self.$router.push({ name: 'category.show', params: { slug: slug } })\n        }\n    },\n    components: {\n        MainLayout\n    },\n    watch: {\n        page (newValue) {\n            let self = this\n            self.page = newValue\n            self.$router.push({ name: 'category.index', query: { page: newValue } })\n        },\n        categories: {\n            handler: function () {\n                console.log('Categories Array Updated')\n            },\n            deep: true\n        },\n        '$route': 'loadCategories'\n    }\n}\n</script>\n\n<style scoped>\n.breadcrumbs li:not(:last-child):after {\n    color: #009688;\n    content: attr(data-divider);\n    vertical-align: middle;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_theme__ = __webpack_require__(653);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    props: ['query'],
    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_theme__["a" /* default */]],
    data: function data() {
        return {
            contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
            categories: [],
            links: {
                first: null,
                last: null,
                prev: null,
                next: null
            },
            meta: {
                current_page: 1,
                from: 0,
                last_page: 0,
                path: null,
                per_page: 0,
                to: 0,
                total: 0
            },
            page: 1
        };
    },
    computed: {
        length: function length() {
            var self = this;
            return Math.round(self.meta.total / self.meta.per_page);
        },
        noPagination: function noPagination() {
            var self = this;
            return self.meta.total === self.meta.per_page;
        }
    },
    created: function created() {
        var self = this;
        self.getCategories();
    },
    mounted: function mounted() {
        var self = this;
        self.page = parseInt(self.query.page);
    },

    methods: {
        getCategories: function () {
            var _ref = __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
                var self, page;
                return __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                self = this;
                                page = self.$route.query.page || 1;
                                _context.next = 4;
                                return axios.get(route('api.category.index') + '?page=' + page).then(function (response) {
                                    self.categories = response.data.data;
                                    self.links = response.data.links;
                                    self.meta = response.data.meta;
                                    // vm.$popup({ message: `Category Page: ${page}`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
                                }).catch(function (_ref2) {
                                    var errors = _ref2.errors,
                                        message = _ref2.message;

                                    console.log(errors);
                                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                                });

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getCategories() {
                return _ref.apply(this, arguments);
            }

            return getCategories;
        }(),
        loadCategories: function () {
            var _ref3 = __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2() {
                var self;
                return __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                self = this;
                                _context2.next = 3;
                                return axios.get(route('api.category.index') + '?page=' + self.page).then(function (response) {
                                    self.categories = response.data.data;
                                    self.links = response.data.links;
                                    self.meta = response.data.meta;
                                    // vm.$popup({ message: `Category Page: ${self.page}`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
                                }).catch(function (_ref4) {
                                    var errors = _ref4.errors,
                                        message = _ref4.message;

                                    console.log(errors);
                                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
                                });

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function loadCategories() {
                return _ref3.apply(this, arguments);
            }

            return loadCategories;
        }(),
        showCategory: function showCategory(slug) {
            var self = this;
            self.$router.push({ name: 'category.show', params: { slug: slug } });
        }
    },
    components: {
        MainLayout: __WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue___default.a
    },
    watch: {
        page: function page(newValue) {
            var self = this;
            self.page = newValue;
            self.$router.push({ name: 'category.index', query: { page: newValue } });
        },

        categories: {
            handler: function handler() {
                console.log('Categories Array Updated');
            },
            deep: true
        },
        '$route': 'loadCategories'
    }
});

/***/ }),

/***/ 714:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main-layout",
    { class: [_vm.contentClass] },
    [
      _c(
        "v-container",
        {
          staticStyle: { "padding-top": "100px" },
          attrs: { fluid: "", "grid-list-md": "" }
        },
        [
          _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c(
                "v-breadcrumbs",
                { attrs: { icons: "", divider: "forward" } },
                [
                  _c(
                    "v-breadcrumbs-item",
                    {
                      attrs: {
                        "active-class": "primary--text",
                        disabled: false,
                        to: "/"
                      }
                    },
                    [_vm._v("\n                  Home\n              ")]
                  ),
                  _vm._v(" "),
                  _c("v-breadcrumbs-item", { attrs: { disabled: true } }, [
                    _vm._v("\n                  Categories\n              ")
                  ])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-layout",
            {
              staticStyle: { "padding-top": "100px" },
              attrs: { row: "", wrap: "" }
            },
            _vm._l(_vm.categories, function(category, index) {
              return _c(
                "v-flex",
                {
                  key: category.slug,
                  attrs: {
                    xs12: "",
                    sm12: "",
                    md4: "",
                    lg4: "",
                    xl4: "",
                    index: index
                  }
                },
                [
                  _c(
                    "v-card",
                    { attrs: { dark: true } },
                    [
                      _c(
                        "clazy-load",
                        { attrs: { src: category.image } },
                        [
                          _c(
                            "transition",
                            {
                              attrs: { slot: "image", name: "fade" },
                              slot: "image"
                            },
                            [
                              _c(
                                "v-card-media",
                                {
                                  attrs: {
                                    src: category.image,
                                    height: "200px"
                                  }
                                },
                                [
                                  _c(
                                    "v-container",
                                    { attrs: { "fill-height": "", fluid: "" } },
                                    [
                                      _c(
                                        "v-layout",
                                        { attrs: { "fill-height": "" } },
                                        [
                                          _c(
                                            "v-flex",
                                            {
                                              attrs: {
                                                xs12: "",
                                                "align-end": "",
                                                flexbox: ""
                                              }
                                            },
                                            [
                                              _c("span", {
                                                staticClass: "headline",
                                                domProps: {
                                                  textContent: _vm._s(
                                                    category.name
                                                  )
                                                }
                                              })
                                            ]
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
                          ),
                          _vm._v(" "),
                          _c(
                            "transition",
                            {
                              attrs: { slot: "placeholder", name: "fade" },
                              slot: "placeholder"
                            },
                            [
                              _c(
                                "v-card-media",
                                {
                                  attrs: {
                                    src: "/img/Bars.svg",
                                    height: "200px",
                                    width: "200px"
                                  }
                                },
                                [
                                  _c(
                                    "v-container",
                                    { attrs: { "fill-height": "", fluid: "" } },
                                    [
                                      _c(
                                        "v-layout",
                                        { attrs: { "fill-height": "" } },
                                        [
                                          _c(
                                            "v-flex",
                                            {
                                              attrs: {
                                                xs12: "",
                                                "align-end": "",
                                                flexbox: ""
                                              }
                                            },
                                            [
                                              _c("span", {
                                                staticClass: "headline",
                                                domProps: {
                                                  textContent: _vm._s(
                                                    category.name
                                                  )
                                                }
                                              })
                                            ]
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
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        { staticClass: "accent" },
                        [
                          _c("span", { staticClass: "body-2" }, [
                            _vm._v("View Product List")
                          ]),
                          _vm._v(" "),
                          _c("v-spacer"),
                          _vm._v(" "),
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
                                  _vm.showCategory(category.slug)
                                }
                              },
                              slot: "activator"
                            },
                            [_c("v-icon", [_vm._v("fa-list")])],
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
            })
          ),
          _vm._v(" "),
          !_vm.noPagination
            ? _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c("v-flex", { attrs: { xs12: "" } }, [
                    _c(
                      "div",
                      { staticClass: "text-xs-center" },
                      [
                        _c("v-pagination", {
                          attrs: { length: _vm.length, circle: "" },
                          model: {
                            value: _vm.page,
                            callback: function($$v) {
                              _vm.page = $$v
                            },
                            expression: "page"
                          }
                        })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    { attrs: { xs12: "" } },
                    [
                      _c("v-card", {
                        staticClass: "grey lighten-4",
                        attrs: { flat: "", height: "50px" }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            : _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c(
                    "v-flex",
                    { attrs: { xs12: "" } },
                    [
                      _c("v-card", {
                        staticClass: "grey lighten-4",
                        attrs: { flat: "", height: "50px" }
                      })
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
     require("vue-hot-reload-api").rerender("data-v-4c5b9ee6", module.exports)
  }
}

/***/ }),

/***/ 839:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(842)
/* template */
var __vue_template__ = __webpack_require__(854)
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

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VLink_vue__ = __webpack_require__(659);
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

/***/ 851:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(852);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(652)("906b2d72", content, false);
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

/***/ 852:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n.styleAvatar[data-v-6b411eb6] {\n  position: relative;\n  margin-left: -55px;\n}\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/components/VLink.vue"],"names":[],"mappings":";AAAA;EACE,mBAAmB;EACnB,mBAAmB;CAAE","file":"VLink.vue","sourcesContent":[".styleAvatar {\n  position: relative;\n  margin-left: -55px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 853:
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

/***/ 854:
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

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9DYXRlZ29yaWVzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbWl4aW5zL3RoZW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL1ZMaW5rLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9NYWluLnZ1ZSIsIndlYnBhY2s6Ly8vTWFpbi52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZT9jNGQ2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZT9lY2YxIiwid2VicGFjazovLy9BcHBGb290ZXIudnVlIiwid2VicGFjazovLy9WTGluay52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlPzYxMTIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBOYXZCYXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT83ZTJiIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT8xNDQxIiwid2VicGFjazovLy9BcHBOYXZCYXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT83MDhmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlIiwid2VicGFjazovLy9MZWZ0U2lkZUJhci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9MZWZ0U2lkZUJhci52dWU/Mjg1MCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvRmFiQnV0dG9uLnZ1ZSIsIndlYnBhY2s6Ly8vRmFiQnV0dG9uLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvRmFiQnV0dG9uLnZ1ZT82MDU2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQ29va2llTGF3LnZ1ZSIsIndlYnBhY2s6Ly8vQ29va2llTGF3LnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLWNvb2tpZS1sYXcvZGlzdC92dWUtY29va2llLWxhdy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0Nvb2tpZUxhdy52dWU/NGNmNCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTWFpbi52dWU/OTdjMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NhdGVnb3JpZXMudnVlP2QxYjMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9DYXRlZ29yaWVzLnZ1ZT8wY2NlIiwid2VicGFjazovLy9DYXRlZ29yaWVzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NhdGVnb3JpZXMudnVlPzdmYjIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhdGVnb3J5TGluay52dWUiLCJ3ZWJwYWNrOi8vL0NhdGVnb3J5TGluay52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL1ZMaW5rLnZ1ZT8xZjk1Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9WTGluay52dWU/ZDk3OSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlPzMxOWQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhdGVnb3J5TGluay52dWU/ZTJmZCJdLCJuYW1lcyI6WyJkYXRhIiwiZGFya0NsYXNzIiwiQXBwIiwidGhlbWUiLCJkYXJrIiwicHJpbWFyeUNsYXNzIiwicHJpbWFyeSIsImFjY2VudENsYXNzIiwiYWNjZW50Iiwic2Vjb25kYXJ5Q2xhc3MiLCJzZWNvbmRhcnkiLCJpbmZvQ2xhc3MiLCJpbmZvIiwid2FybmluZ0NsYXNzIiwid2FybmluZyIsImVycm9yQ2xhc3MiLCJlcnJvciIsInN1Y2Nlc3NDbGFzcyIsInN1Y2Nlc3MiLCJ0b2dnbGVCYXJTdHlsZSIsInNpdGUiLCJ0aXRsZVN0eWxlIiwibmF2YmFyU3R5bGUiLCJmb290ZXJTdHlsZSIsInNpZGViYXJTdHlsZSIsImRvbWFpbiIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0cmFkZW1hcmsiLCJsb2dvIiwidXJsIiwibG9nb1N0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJzaG93TG9nbyIsInNob3ciLCJzaG93SWNvbiIsImljb24iLCJuYW1lIiwiaWNvbkNvbG9yIiwiY29sb3IiLCJ0aXRsZSIsImNvbXB1dGVkIiwiaXNEYXJrIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FBQ25ELElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGNBQWM7O0FBRWxFO0FBQ0E7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBLHlCQUFrTTtBQUNsTTtBQUNBO0FBQ0E7QUFDQSw0Q0FBb0w7QUFDcEw7QUFDQSw4Q0FBaUo7QUFDako7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxzREFBc0QsSUFBSTtBQUN6SSxtQ0FBbUM7O0FB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Y2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNjMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxNiIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNGM1YjllZTZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9DYXRlZ29yaWVzLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9DYXRlZ29yaWVzLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNGM1YjllZTZcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9DYXRlZ29yaWVzLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTRjNWI5ZWU2XCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHBhZ2VzXFxcXENhdGVnb3JpZXMudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBDYXRlZ29yaWVzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00YzViOWVlNlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTRjNWI5ZWU2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NhdGVnb3JpZXMudnVlXG4vLyBtb2R1bGUgaWQgPSA2Mzlcbi8vIG1vZHVsZSBjaHVua3MgPSA1IiwiLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuICBNb2RpZmllZCBieSBFdmFuIFlvdSBAeXl4OTkwODAzXG4qL1xuXG52YXIgaGFzRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG5cbmlmICh0eXBlb2YgREVCVUcgIT09ICd1bmRlZmluZWQnICYmIERFQlVHKSB7XG4gIGlmICghaGFzRG9jdW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3Z1ZS1zdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudC4gJyArXG4gICAgXCJVc2UgeyB0YXJnZXQ6ICdub2RlJyB9IGluIHlvdXIgV2VicGFjayBjb25maWcgdG8gaW5kaWNhdGUgYSBzZXJ2ZXItcmVuZGVyaW5nIGVudmlyb25tZW50LlwiXG4gICkgfVxufVxuXG52YXIgbGlzdFRvU3R5bGVzID0gcmVxdWlyZSgnLi9saXN0VG9TdHlsZXMnKVxuXG4vKlxudHlwZSBTdHlsZU9iamVjdCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgcGFydHM6IEFycmF5PFN0eWxlT2JqZWN0UGFydD5cbn1cblxudHlwZSBTdHlsZU9iamVjdFBhcnQgPSB7XG4gIGNzczogc3RyaW5nO1xuICBtZWRpYTogc3RyaW5nO1xuICBzb3VyY2VNYXA6ID9zdHJpbmdcbn1cbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHsvKlxuICBbaWQ6IG51bWJlcl06IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIHJlZnM6IG51bWJlcixcbiAgICBwYXJ0czogQXJyYXk8KG9iaj86IFN0eWxlT2JqZWN0UGFydCkgPT4gdm9pZD5cbiAgfVxuKi99XG5cbnZhciBoZWFkID0gaGFzRG9jdW1lbnQgJiYgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSlcbnZhciBzaW5nbGV0b25FbGVtZW50ID0gbnVsbFxudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwXG52YXIgaXNQcm9kdWN0aW9uID0gZmFsc2VcbnZhciBub29wID0gZnVuY3Rpb24gKCkge31cblxuLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4vLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG52YXIgaXNPbGRJRSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9tc2llIFs2LTldXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSlcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFyZW50SWQsIGxpc3QsIF9pc1Byb2R1Y3Rpb24pIHtcbiAgaXNQcm9kdWN0aW9uID0gX2lzUHJvZHVjdGlvblxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIGxpc3QpXG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgICAgZG9tU3R5bGUucmVmcy0tXG4gICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSlcbiAgICB9XG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbmV3TGlzdClcbiAgICAgIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXVxuICAgICAgaWYgKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKClcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMgLyogQXJyYXk8U3R5bGVPYmplY3Q+ICovKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pXG4gICAgICB9XG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIGlmIChkb21TdHlsZS5wYXJ0cy5sZW5ndGggPiBpdGVtLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5sZW5ndGggPSBpdGVtLnBhcnRzLmxlbmd0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHsgaWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0cyB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAoKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJ1xuICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcbiAgcmV0dXJuIHN0eWxlRWxlbWVudFxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICB2YXIgdXBkYXRlLCByZW1vdmVcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlW2RhdGEtdnVlLXNzci1pZH49XCInICsgb2JqLmlkICsgJ1wiXScpXG5cbiAgaWYgKHN0eWxlRWxlbWVudCkge1xuICAgIGlmIChpc1Byb2R1Y3Rpb24pIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGFuZCBpbiBwcm9kdWN0aW9uIG1vZGUuXG4gICAgICAvLyBzaW1wbHkgZG8gbm90aGluZy5cbiAgICAgIHJldHVybiBub29wXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGJ1dCBpbiBkZXYgbW9kZS5cbiAgICAgIC8vIGZvciBzb21lIHJlYXNvbiBDaHJvbWUgY2FuJ3QgaGFuZGxlIHNvdXJjZSBtYXAgaW4gc2VydmVyLXJlbmRlcmVkXG4gICAgICAvLyBzdHlsZSB0YWdzIC0gc291cmNlIG1hcHMgaW4gPHN0eWxlPiBvbmx5IHdvcmtzIGlmIHRoZSBzdHlsZSB0YWcgaXNcbiAgICAgIC8vIGNyZWF0ZWQgYW5kIGluc2VydGVkIGR5bmFtaWNhbGx5LiBTbyB3ZSByZW1vdmUgdGhlIHNlcnZlciByZW5kZXJlZFxuICAgICAgLy8gc3R5bGVzIGFuZCBpbmplY3QgbmV3IG9uZXMuXG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzT2xkSUUpIHtcbiAgICAvLyB1c2Ugc2luZ2xldG9uIG1vZGUgZm9yIElFOS5cbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrK1xuICAgIHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSlcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSlcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKVxuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBtdWx0aS1zdHlsZS10YWcgbW9kZSBpbiBhbGwgb3RoZXIgY2FzZXNcbiAgICBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShvYmopXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcbiAgICAgICAgICBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuICAgICAgICAgIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKVxuICAgIH1cbiAgfVxufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFN0b3JlID0gW11cblxuICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudFxuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpXG4gIH1cbn0pKClcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLmNzc1xuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKVxuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKVxuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXNcbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSlcbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZUVsZW1lbnQsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzc1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWFcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXBcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKVxuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIHNvdXJjZU1hcC5zb3VyY2VzWzBdICsgJyAqLydcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArICcgKi8nXG4gIH1cblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcbi8vIG1vZHVsZSBpZCA9IDY1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTYiLCIvKipcbiAqIEV4cG9ydCB0aGUgQW55IENvbXBvbmVudFxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZGFya0NsYXNzOiBBcHAudGhlbWUuZGFyayxcbiAgICAgICAgcHJpbWFyeUNsYXNzOiBBcHAudGhlbWUucHJpbWFyeSxcbiAgICAgICAgYWNjZW50Q2xhc3M6IEFwcC50aGVtZS5hY2NlbnQsXG4gICAgICAgIHNlY29uZGFyeUNsYXNzOiBBcHAudGhlbWUuc2Vjb25kYXJ5LFxuICAgICAgICBpbmZvQ2xhc3M6IEFwcC50aGVtZS5pbmZvLFxuICAgICAgICB3YXJuaW5nQ2xhc3M6IEFwcC50aGVtZS53YXJuaW5nLFxuICAgICAgICBlcnJvckNsYXNzOiBBcHAudGhlbWUuZXJyb3IsXG4gICAgICAgIHN1Y2Nlc3NDbGFzczogQXBwLnRoZW1lLnN1Y2Nlc3MsXG4gICAgICAgIHRvZ2dsZUJhclN0eWxlOiBBcHAuc2l0ZS50b2dnbGVCYXJTdHlsZSxcbiAgICAgICAgdGl0bGVTdHlsZTogQXBwLnNpdGUudGl0bGVTdHlsZSxcbiAgICAgICAgbmF2YmFyU3R5bGU6IEFwcC5zaXRlLm5hdmJhclN0eWxlLFxuICAgICAgICBmb290ZXJTdHlsZTogQXBwLnNpdGUuZm9vdGVyU3R5bGUsXG4gICAgICAgIHNpZGViYXJTdHlsZTogQXBwLnNpdGUuc2lkZWJhclN0eWxlLFxuICAgICAgICBkb21haW46IEFwcC5zaXRlLmRvbWFpbixcbiAgICAgICAgeWVhcjogKG5ldyBEYXRlKCkpLmdldEZ1bGxZZWFyKCksXG4gICAgICAgIHRyYWRlbWFyazogQXBwLnNpdGUudHJhZGVtYXJrLFxuICAgICAgICBsb2dvOiBBcHAuc2l0ZS5sb2dvLnVybCxcbiAgICAgICAgbG9nb1N0eWxlOiB7XG4gICAgICAgICAgICB3aWR0aDogQXBwLnNpdGUubG9nby53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogQXBwLnNpdGUubG9nby5oZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd0xvZ286IEFwcC5zaXRlLmxvZ28uc2hvdyxcbiAgICAgICAgc2hvd0ljb246IEFwcC5zaXRlLmljb24uc2hvdyxcbiAgICAgICAgaWNvbjogQXBwLnNpdGUuaWNvbi5uYW1lID8gQXBwLnNpdGUuaWNvbi5uYW1lIDogbnVsbCxcbiAgICAgICAgaWNvbkNvbG9yOiBBcHAuc2l0ZS5pY29uLmNvbG9yLFxuICAgICAgICB0aXRsZTogQXBwLnNpdGUudHJhZGVtYXJrXG4gICAgfSksXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgaXNEYXJrICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhcmtDbGFzcyA9PT0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21peGlucy90aGVtZS5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE3IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDY1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTciLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTZiNDExZWI2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vVkxpbmsudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1ZMaW5rLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmI0MTFlYjZcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9WTGluay52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi02YjQxMWViNlwiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXFZMaW5rLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gVkxpbmsudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTZiNDExZWI2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNmI0MTFlYjZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9WTGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDE2IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vTWFpbi52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LWU4ZjE0YWM0XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL01haW4udnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxsYXlvdXRzXFxcXE1haW4udnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBNYWluLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1lOGYxNGFjNFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWU4ZjE0YWM0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTWFpbi52dWVcbi8vIG1vZHVsZSBpZCA9IDY2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiPHRlbXBsYXRlPlxuIDx2LWFwcCA6ZGFyaz1cIkFwcC50aGVtZS5kYXJrXCIgIHN0YW5kYWxvbmUgdi1jbG9haz5cbiAgICA8bGVmdC1zaWRlLWJhcj48L2xlZnQtc2lkZS1iYXI+XG4gICAgPGFwcC1uYXYtYmFyPjwvYXBwLW5hdi1iYXI+XG4gICAgPG1haW4+XG4gICAgPCEtLSBhZGRlZCBmbHVpZCBhbmQgcGEtMCBtYS0wIGZvciBmdWxsIHNjcmVlbiBwYWdlcyAtLT5cbiAgICAgIDx2LWNvbnRhaW5lciB0cmFuc2l0aW9uPVwic2xpZGUteC10cmFuc2l0aW9uXCIgZmx1aWQgY2xhc3M9XCJwYS0wIG1hLTBcIj5cbiAgICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgICA8L3YtY29udGFpbmVyPlxuICAgIDwvbWFpbj5cbiAgICA8IS0tIDxzaG9wcGluZy1jYXJ0Pjwvc2hvcHBpbmctY2FydD4gLS0+XG4gICAgPGZhYi1idXR0b24+PC9mYWItYnV0dG9uPlxuICAgIDxjb29raWUtbGF3PjwvY29va2llLWxhdz5cbiAgICA8YXBwLWZvb3Rlcj48L2FwcC1mb290ZXI+XG4gIDwvdi1hcHA+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFwcEZvb3RlciBmcm9tICcuLi9wYXJ0aWFscy9BcHBGb290ZXIudnVlJ1xuaW1wb3J0IEFwcE5hdkJhciBmcm9tICcuLi9wYXJ0aWFscy9BcHBOYXZCYXIudnVlJ1xuaW1wb3J0IExlZnRTaWRlQmFyIGZyb20gJy4uL3BhcnRpYWxzL0xlZnRTaWRlQmFyLnZ1ZSdcbmltcG9ydCBGYWJCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9GYWJCdXR0b24udnVlJ1xuaW1wb3J0IENvb2tpZUxhdyBmcm9tICcuLi9wYXJ0aWFscy9Db29raWVMYXcudnVlJ1xuLy8gaW1wb3J0IFNob3BwaW5nQ2FydCBmcm9tICcuLi9wYXJ0aWFscy9TaG9wcGluZ0NhcnQudnVlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBBcHBGb290ZXIsXG4gICAgICAgIEFwcE5hdkJhcixcbiAgICAgICAgTGVmdFNpZGVCYXIsXG4gICAgICAgIEZhYkJ1dHRvbixcbiAgICAgICAgQ29va2llTGF3XG4gICAgICAgIC8vIFNob3BwaW5nQ2FydFxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIE1haW4udnVlP2ZkMzVlZTMwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05MTdhZTAwNFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBGb290ZXIudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0FwcEZvb3Rlci52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTkxN2FlMDA0XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0FwcEZvb3Rlci52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxwYXJ0aWFsc1xcXFxBcHBGb290ZXIudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBBcHBGb290ZXIudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTkxN2FlMDA0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtOTE3YWUwMDRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTE3YWUwMDRcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwRm9vdGVyLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMGIxNTMyYTdcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTE3YWUwMDRcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwRm9vdGVyLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05MTdhZTAwNFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBGb290ZXIudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTkxN2FlMDA0XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcEZvb3Rlci52dWVcbi8vIG1vZHVsZSBpZCA9IDY2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJBcHBGb290ZXIudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtOTE3YWUwMDRcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCI8dGVtcGxhdGU+XG48di1mb290ZXIgOmNsYXNzPVwiW2Zvb3RlckNsYXNzXVwiPlxuPHYtc3BhY2VyPjwvdi1zcGFjZXI+PHNwYW4+wqkge3sgeWVhciB9fSB7eyBkb21haW4gfX0gwq4gfCB7eyB0cmFkZW1hcmsgfX3ihKI8L3NwYW4+PHYtc3BhY2VyPjwvdi1zcGFjZXI+XG48L3YtZm9vdGVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBUaGVtZSBmcm9tICcuLi9taXhpbnMvdGhlbWUnXG5pbXBvcnQgVkxpbmsgZnJvbSAnLi4vY29tcG9uZW50cy9WTGluay52dWUnXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWl4aW5zOiBbVGhlbWVdLFxuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGZvb3RlckNsYXNzOiB7J3ByaW1hcnktLXRleHQnOiB0cnVlfVxuICAgIH0pLFxuICAgIGNyZWF0ZWQgKCkge1xuICAgICAgICAvKiBFbWl0IE9uIGEgQ2hpbGQgQ29tcG9uZW50IElmIFlvdSBXYW50IFRoaXMgVG8gQmUgVmlzaWJsZSAqL1xuICAgICAgICBCdXMuJG9uKCdmb290ZXItY29udGVudC12aXNpYmxlJywgKHZpc2liaWxpdHkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpc2libGUgPSB2aXNpYmlsaXR5XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIFZMaW5rXG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBBcHBGb290ZXIudnVlPzUyY2QyODEwIiwiPHRlbXBsYXRlPlxuICAgIDx2LWxpc3QtdGlsZSA6YXZhdGFyPVwiYXZhdGFyT25cIiAgQGNsaWNrLm5hdGl2ZT1cIm5hdmlnYXRlKGhyZWYpXCIgOmNsYXNzPVwiW3sgc3R5bGVBdmF0YXI6IGF2YXRhck9uIH1dXCI+XG4gICAgICAgICAgPHYtbGlzdC10aWxlLWFjdGlvbiB2LWlmPVwiaWNvbk9uICYmICFhdmF0YXJPblwiPlxuICAgICAgICAgICAgPHYtaWNvbiA6c3R5bGU9XCJ7Y29sb3I6IGlzQWN0aXZlID8gYWN0aXZlQ29sb3IgOiBpY29uQ29sb3IsIGN1cnNvcjogaHJlZiA/ICdwb2ludGVyJyA6ICcnfVwiPnt7IGljb24gfX08L3YtaWNvbj5cbiAgICAgICAgICA8L3YtbGlzdC10aWxlLWFjdGlvbj5cbiAgICAgICAgICA8di1saXN0LXRpbGUtYXZhdGFyIHYtaWY9XCJpY29uT24gJiYgYXZhdGFyT25cIj5cbiAgICAgICAgICAgICAgPGltZyA6c3JjPVwiYXZhdGFyXCIgYWx0PVwiXCI+XG4gICAgICAgICAgICA8L3YtbGlzdC10aWxlLWF2YXRhcj5cbiAgICAgICAgICA8di1saXN0LXRpbGUtY29udGVudD5cbiAgICAgICAgICAgIDx2LWxpc3QtdGlsZS10aXRsZSAgOnN0eWxlPVwie2NvbG9yOiBpc0FjdGl2ZSA/IGFjdGl2ZUNvbG9yIDogbGlua0NvbG9yfVwiPlxuICAgICAgICAgICAgICA8c3BhbiA6c3R5bGU9XCJ7Y3Vyc29yOiBocmVmID8gJ3BvaW50ZXInIDogJyd9XCI+e3sgdGl0bGUgIH19PC9zcGFuPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS10aXRsZT5cbiAgICAgICAgICA8L3YtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgPHYtbGlzdC10aWxlLWFjdGlvbiB2LWlmPVwiaWNvbk9uICYmIGF2YXRhck9uXCI+XG4gICAgICAgICAgICA8di1pY29uIDpzdHlsZT1cIntjb2xvcjogaXNBY3RpdmUgPyBhY3RpdmVDb2xvciA6IGljb25Db2xvciwgY3Vyc29yOiBocmVmID8gJ3BvaW50ZXInIDogJyd9XCI+e3sgaWNvbiB9fTwvdi1pY29uPlxuICAgICAgICAgIDwvdi1saXN0LXRpbGUtYWN0aW9uPlxuICAgIDwvdi1saXN0LXRpbGU+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiB7XG4gICAgICAgIGRhcms6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXBwLnRoZW1lLmRhcmtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaHJlZjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICAgICAgfSxcbiAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaWNvbjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgICAgIH0sXG4gICAgICAgIGljb25Db2xvcjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGFyayA/ICcjZmFmYWZhJyA6ICcjNzg5MDlDJyAvLyB3aGl0ZSBvciBibHVlLWdyZXkgbGlnaHRlbi0xXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGxpbmtDb2xvcjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGFyayA/ICcjZmFmYWZhJyA6ICcjNzg5MDlDJyAvLyB3aGl0ZSBvciBibHVlLWdyZXkgbGlnaHRlbi0xXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFjdGl2ZUNvbG9yOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyM0ZGI2YWMnIC8vIHRlYWwgbGlnaHRlbiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGlzQWN0aXZlICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhyZWYgPT09IHRoaXMuJHJvdXRlLnBhdGhcbiAgICAgICAgfSxcbiAgICAgICAgaXNEYXJrICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhcmsgPT09IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgYXZhdGFyT24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5hdmF0YXJcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbk9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIXRoaXMuaWNvblxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIG5hdmlnYXRlIChocmVmKSB7XG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7IHBhdGg6IGAke2hyZWZ9YCB9KVxuICAgICAgICB9XG5cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuICAgIC5zdHlsZUF2YXRhciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC01NXB4O1xuICAgIH1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gVkxpbmsudnVlPzYxYzg2OWJkIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtZm9vdGVyXCIsXG4gICAgeyBjbGFzczogW192bS5mb290ZXJDbGFzc10gfSxcbiAgICBbXG4gICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgX3ZtLl92KFxuICAgICAgICAgIFwiwqkgXCIgK1xuICAgICAgICAgICAgX3ZtLl9zKF92bS55ZWFyKSArXG4gICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICBfdm0uX3MoX3ZtLmRvbWFpbikgK1xuICAgICAgICAgICAgXCIgwq4gfCBcIiArXG4gICAgICAgICAgICBfdm0uX3MoX3ZtLnRyYWRlbWFyaykgK1xuICAgICAgICAgICAgXCLihKJcIlxuICAgICAgICApXG4gICAgICBdKSxcbiAgICAgIF9jKFwidi1zcGFjZXJcIilcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtOTE3YWUwMDRcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTkxN2FlMDA0XCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2Njlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOGRhNTY4NWFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwTmF2QmFyLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9BcHBOYXZCYXIudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi04ZGE1Njg1YVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9BcHBOYXZCYXIudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFydGlhbHNcXFxcQXBwTmF2QmFyLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gQXBwTmF2QmFyLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi04ZGE1Njg1YVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LThkYTU2ODVhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcE5hdkJhci52dWVcbi8vIG1vZHVsZSBpZCA9IDY3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LThkYTU2ODVhXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcE5hdkJhci52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjMyOTdlYmUyXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LThkYTU2ODVhXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcE5hdkJhci52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOGRhNTY4NWFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwTmF2QmFyLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi04ZGE1Njg1YVwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBOYXZCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwiQXBwTmF2QmFyLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LThkYTU2ODVhXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcE5hdkJhci52dWVcbi8vIG1vZHVsZSBpZCA9IDY3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiPHRlbXBsYXRlPlxuICA8di10b29sYmFyIDpzdHlsZT1cIm5hdmJhclN0eWxlXCIgOmRhcms9XCIhaXNEYXJrXCIgZml4ZWQ+XG4gICAgPHYtdG9vbGJhci1zaWRlLWljb24gOnN0eWxlPVwidG9nZ2xlQmFyU3R5bGVcIiBAY2xpY2submF0aXZlLnN0b3A9XCJ0b2dnbGVEcmF3ZXIoKVwiPjwvdi10b29sYmFyLXNpZGUtaWNvbj5cbiAgICAgICAgPCEtLSBUaXRsZSAtLT5cbiAgICAgICAgPHYtdG9vbGJhci10aXRsZSB2LWlmPVwiZXh0ZW5zaW9uXCIgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlclwiIHNsb3Q9XCJleHRlbnNpb25cIj5cbiAgICAgICAgICAgIDx2LWljb24gOnN0eWxlPVwie2NvbG9yOiBpY29uQ29sb3IgfVwiIGNsYXNzPVwibWwtMyBoaWRkZW4tbWQtYW5kLWRvd25cIiB2LWlmPVwic2hvd0ljb25cIj57eyBpY29uIH19PC92LWljb24+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGRlbi1tZC1hbmQtZG93blwiIDpzdHlsZT1cInRpdGxlU3R5bGVcIj57eyB0aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgPC92LXRvb2xiYXItdGl0bGU+XG4gICAgICAgIDx2LXRvb2xiYXItdGl0bGUgdi1lbHNlIGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIj5cbiAgICAgICAgICAgIDx2LWljb24gOnN0eWxlPVwie2NvbG9yOiBpY29uQ29sb3IgfVwiIGNsYXNzPVwibWwtMyBoaWRkZW4tbWQtYW5kLWRvd25cIiB2LWlmPVwic2hvd0ljb25cIj57eyBpY29uIH19PC92LWljb24+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGRlbi1tZC1hbmQtZG93blwiIDpzdHlsZT1cInRpdGxlU3R5bGVcIj57eyB0aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgPC92LXRvb2xiYXItdGl0bGU+XG4gICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICA8IS0tIGNlbnRlciBsb2dvIC0tPlxuICAgICAgICA8aW1nIHYtaWY9XCJzaG93TG9nb1wiICAgOnNyYz1cImxvZ29cIiA6c3R5bGU9XCJbbG9nb1N0eWxlXVwiICBhbHQ9XCJ2dWVqc1wiPlxuICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgPCEtLSBBZGQgSGVyZSBBbGwgWW91ciBOYXYgSWNvbnMgLS0+XG5cbiAgICAgICAgPHYtdG9vbHRpcCBsZWZ0PlxuICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVwiZXJyb3JcIiBzbG90PVwiYWN0aXZhdG9yXCIgQGNsaWNrPVwiZW1wdHlDYXJ0KClcIiB2LWlmPVwiY291bnQgPiAwXCI+XG4gICAgICAgIDx2LWljb24+cmVtb3ZlX3Nob3BwaW5nX2NhcnQ8L3YtaWNvbj5cbiAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgPHNwYW4+RW1wdHkgfCBDYXJ0PC9zcGFuPlxuICAgICAgICA8L3YtdG9vbHRpcD5cbiAgICAgICAgPHYtdG9vbHRpcCBsZWZ0PlxuICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVwicHJpbWFyeVwiIHNsb3Q9XCJhY3RpdmF0b3JcIiBAY2xpY2s9XCJvcGVuQ2FydCgpXCI+XG4gICAgICAgIDx2LWJhZGdlIGxlZnQ+XG4gICAgICAgIDxzcGFuIHNsb3Q9XCJiYWRnZVwiPnt7IGNvdW50IH19PC9zcGFuPlxuICAgICAgICA8di1pY29uPnNob3BwaW5nX2NhcnQ8L3YtaWNvbj5cbiAgICAgICAgPC92LWJhZGdlPlxuICAgICAgICA8L3YtYnRuPlxuICAgICAgICA8c3Bhbj5WaWV3IHwgQ2FydDwvc3Bhbj5cbiAgICAgICAgPC92LXRvb2x0aXA+XG48L3YtdG9vbGJhcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgVGhlbWUgZnJvbSAnLi4vbWl4aW5zL3RoZW1lJ1xuaW1wb3J0IHsgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfSBmcm9tICd2dWV4J1xuY29uc3QgeyBtYXBTdGF0ZSwgbWFwQWN0aW9ucyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2NhcnQnKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWl4aW5zOiBbVGhlbWVdLFxuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGV4dGVuc2lvbjogZmFsc2UsXG4gICAgICAgIGNvdW50OiAwXG4gICAgfSksXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgLi4ubWFwU3RhdGUoe1xuICAgICAgICAgICAgZ2V0Q291bnQ6ICdjb3VudCdcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGNyZWF0ZWQgKCkge1xuICAgICAgICAvKiBFbWl0IE9uIGEgQ2hpbGQgQ29tcG9uZW50IElmIFlvdSBXYW50IFRoaXMgVG8gQmUgVmlzaWJsZSAqL1xuICAgICAgICBCdXMuJG9uKCdoZWFkZXItZXh0ZW5zaW9uLXZpc2libGUnLCAodmlzaWJpbGl0eSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRlbnNpb24gPSB2aXNpYmlsaXR5XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBtb3VudGVkICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIHNlbGYuY291bnQgPSBzZWxmLmdldENvdW50XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIC4uLm1hcEFjdGlvbnMoe1xuICAgICAgICAgICAgZGVzdHJveUNhcnQ6ICdkZXN0cm95Q2FydCdcbiAgICAgICAgfSksXG4gICAgICAgIC8qIFVzZSBWdWV0aWZ5IE1vZGFsICovXG4gICAgICAgIG9wZW5TaG9wcGluZ0NhcnQgKCkge1xuICAgICAgICAgICAgQnVzLiRlbWl0KCdzaG9wcGluZy1jYXJ0LW9wZW4nKVxuICAgICAgICB9LFxuICAgICAgICBlbXB0eUNhcnQgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLmRlc3Ryb3lDYXJ0KClcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlRHJhd2VyICgpIHtcbiAgICAgICAgICAgIEJ1cy4kZW1pdCgndG9nZ2xlRHJhd2VyJylcbiAgICAgICAgfSxcbiAgICAgICAgLyogVXNlcyBDYXJ0IFJvdXRlICovXG4gICAgICAgIG9wZW5DYXJ0ICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi4kcm91dGVyLnB1c2goeyBuYW1lOiAnY2FydCcgfSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgZ2V0Q291bnQgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuY291bnQgPSBuZXdWYWx1ZVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBBcHBOYXZCYXIudnVlPzE1MGQwZmIyIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtdG9vbGJhclwiLFxuICAgIHsgc3R5bGU6IF92bS5uYXZiYXJTdHlsZSwgYXR0cnM6IHsgZGFyazogIV92bS5pc0RhcmssIGZpeGVkOiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcInYtdG9vbGJhci1zaWRlLWljb25cIiwge1xuICAgICAgICBzdHlsZTogX3ZtLnRvZ2dsZUJhclN0eWxlLFxuICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgX3ZtLnRvZ2dsZURyYXdlcigpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uZXh0ZW5zaW9uXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtdG9vbGJhci10aXRsZVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlclwiLFxuICAgICAgICAgICAgICBhdHRyczogeyBzbG90OiBcImV4dGVuc2lvblwiIH0sXG4gICAgICAgICAgICAgIHNsb3Q6IFwiZXh0ZW5zaW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5zaG93SWNvblxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtbC0zIGhpZGRlbi1tZC1hbmQtZG93blwiLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGNvbG9yOiBfdm0uaWNvbkNvbG9yIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmljb24pKV1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImhpZGRlbi1tZC1hbmQtZG93blwiLCBzdHlsZTogX3ZtLnRpdGxlU3R5bGUgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0udGl0bGUpKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX2MoXG4gICAgICAgICAgICBcInYtdG9vbGJhci10aXRsZVwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlclwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5zaG93SWNvblxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtbC0zIGhpZGRlbi1tZC1hbmQtZG93blwiLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGNvbG9yOiBfdm0uaWNvbkNvbG9yIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmljb24pKV1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImhpZGRlbi1tZC1hbmQtZG93blwiLCBzdHlsZTogX3ZtLnRpdGxlU3R5bGUgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0udGl0bGUpKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLnNob3dMb2dvXG4gICAgICAgID8gX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgc3R5bGU6IFtfdm0ubG9nb1N0eWxlXSxcbiAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogX3ZtLmxvZ28sIGFsdDogXCJ2dWVqc1wiIH1cbiAgICAgICAgICB9KVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi10b29sdGlwXCIsXG4gICAgICAgIHsgYXR0cnM6IHsgbGVmdDogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfdm0uY291bnQgPiAwXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgICAgICBmbGF0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJlcnJvclwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5lbXB0eUNhcnQoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJyZW1vdmVfc2hvcHBpbmdfY2FydFwiKV0pXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInNwYW5cIiwgW192bS5fdihcIkVtcHR5IHwgQ2FydFwiKV0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi10b29sdGlwXCIsXG4gICAgICAgIHsgYXR0cnM6IHsgbGVmdDogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICBjb2xvcjogXCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBfdm0ub3BlbkNhcnQoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJhZGdlXCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyBsZWZ0OiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBhdHRyczogeyBzbG90OiBcImJhZGdlXCIgfSwgc2xvdDogXCJiYWRnZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uY291bnQpKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgW192bS5fdihcInNob3BwaW5nX2NhcnRcIildKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInNwYW5cIiwgW192bS5fdihcIlZpZXcgfCBDYXJ0XCIpXSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi04ZGE1Njg1YVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtOGRhNTY4NWFcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcE5hdkJhci52dWVcbi8vIG1vZHVsZSBpZCA9IDY3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vTGVmdFNpZGVCYXIudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi00ZTEyNzcxN1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9MZWZ0U2lkZUJhci52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHBhcnRpYWxzXFxcXExlZnRTaWRlQmFyLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gTGVmdFNpZGVCYXIudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTRlMTI3NzE3XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNGUxMjc3MTdcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsIjx0ZW1wbGF0ZT5cbiAgPHYtbmF2aWdhdGlvbi1kcmF3ZXJcbiAgICAgIHRlbXBvcmFyeVxuICAgICAgaGlkZS1vdmVybGF5XG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgIGVuYWJsZS1yZXNpemUtd2F0Y2hlclxuICAgICAgdi1tb2RlbD1cImRyYXdlclwiXG4gICAgPlxuICAgICAgPHYtbGlzdCBkZW5zZT5cbiAgICAgICAgPCEtLSBWLUZvciBMaW5rcyBGcm9tIE1lbnUgLS0+XG4gICAgICAgIDx2LWxpbmsgOmRhcms9XCJkYXJrQ2xhc3NcIiB2LWZvcj1cImxpbmsgaW4gbGlua3NcIiA6a2V5PVwibGluay5pZFwiIDp0aXRsZT1cImxpbmsudGl0bGVcIiA6aHJlZj1cImxpbmsuaHJlZlwiIDppY29uPVwibGluay5hY3Rpb25cIj48L3YtbGluaz5cbiAgICAgICAgPCEtLSBJbmRpdmlkdWFsIExpbmsgKEN1c3RvbSBBZGRpdGlvbmFsKSAtLT5cbiAgICAgICAgPHYtbGluayA6ZGFyaz1cImRhcmtDbGFzc1wiICB0aXRsZT1cIlByb2R1Y3RzXCIgOmhyZWY9XCInL3Byb2R1Y3RzJ1wiICAgaWNvbj1cImZhLXNob3BwaW5nLWJhc2tldFwiPjwvdi1saW5rPlxuICAgICAgICA8di1saW5rIDpkYXJrPVwiZGFya0NsYXNzXCIgIHRpdGxlPVwiQ2F0ZWdvcmllc1wiIDpocmVmPVwiJy9jYXRlZ29yaWVzJ1wiICAgaWNvbj1cImZhLXRhZ1wiPjwvdi1saW5rPlxuICAgICAgICA8IS0tIEV4cGFuZGFibGUgR3JvdXAgTGlua3MgZnJvbSBHcm91cCBMaW5rIC0tPlxuICAgICAgICA8Y2F0ZWdvcnktbGluayA6ZGFyaz1cImRhcmtDbGFzc1wiIDppdGVtcz1cImdyb3VwbGlua3NcIj48L2NhdGVnb3J5LWxpbms+XG4gICAgICAgIDx2LXN1YmhlYWRlciA6Y2xhc3M9XCJ7J2JsdWUtZ3JleS0tdGV4dCc6ICFpc0RhcmssICd0ZXh0LS1saWdodGVuLTEnOiAhaXNEYXJrLCAnd2hpdGUtLXRleHQnOiBpc0Rhcmt9XCI+TWVtYmVycyBBcmVhPC92LXN1YmhlYWRlcj5cbiAgICAgICAgPHYtbGluayB2LWlmPVwiZ2V0QXV0aFwiIDpkYXJrPVwiZGFya0NsYXNzXCIgIHRpdGxlPVwiRGFzaGJvYXJkXCIgIDpocmVmPVwiJy9kYXNoYm9hcmQnXCIgaWNvbj1cImRhc2hib2FyZFwiPjwvdi1saW5rPlxuICAgICAgICA8di1saW5rIHYtaWY9XCJnZXRBdXRoXCIgOmRhcms9XCJkYXJrQ2xhc3NcIiAgdGl0bGU9XCJMb2dvdXRcIiAgOmhyZWY9XCInL2xvZ291dCdcIiBpY29uPVwicG93ZXJfc2V0dGluZ3NfbmV3XCI+PC92LWxpbms+XG5cbiAgICAgICAgPHYtbGluayB2LWlmPVwiIWdldEF1dGhcIiA6ZGFyaz1cImRhcmtDbGFzc1wiICB0aXRsZT1cIkxvZ2luXCIgIDpocmVmPVwiJy9sb2dpbidcIiBpY29uPVwiZmEta2V5XCI+PC92LWxpbms+XG4gICAgICAgIDx2LWxpbmsgdi1pZj1cIiFnZXRBdXRoXCIgOmRhcms9XCJkYXJrQ2xhc3NcIiAgdGl0bGU9XCJSZWdpc3RlclwiICA6aHJlZj1cIicvcmVnaXN0ZXInXCIgaWNvbj1cImZhLXVzZXItcGx1c1wiPjwvdi1saW5rPlxuICAgICAgPC92LWxpc3Q+XG4gICAgPC92LW5hdmlnYXRpb24tZHJhd2VyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBWTGluayBmcm9tICcuLi9jb21wb25lbnRzL1ZMaW5rLnZ1ZSdcbmltcG9ydCBDYXRlZ29yeUxpbmsgZnJvbSAnLi4vY29tcG9uZW50cy9DYXRlZ29yeUxpbmsudnVlJ1xuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcbmltcG9ydCB7IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH0gZnJvbSAndnVleCdcbmNvbnN0IHsgbWFwR2V0dGVycyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2F1dGgnKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWl4aW5zOiBbVGhlbWVdLFxuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGRyYXdlcjogZmFsc2UsXG4gICAgICAgIGxpbmtzOiBbXSwgLy8gc2l0ZSBuYXZpZ2F0aW9uIGxpbmtzXG4gICAgICAgIG1lbWJlcnM6IFtdLCAvLyBjaGFuZ2Ugd2l0aCBmZWF0dXJlZCBQcm9kdWN0c1xuICAgICAgICBncm91cGxpbmtzOiBbXSAvLyBwcm9kdWN0IGNhdGVnb3JpZXNcbiAgICB9KSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICAuLi5tYXBHZXR0ZXJzKHtcbiAgICAgICAgICAgIGdldEF1dGg6ICdnZXRBdXRoJ1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBWTGluayxcbiAgICAgICAgQ2F0ZWdvcnlMaW5rXG4gICAgfSxcbiAgICBtb3VudGVkICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAgIEJ1cy4kb24oJ3RvZ2dsZURyYXdlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuZHJhd2VyID0gIXNlbGYuZHJhd2VyXG4gICAgICAgIH0pXG4gICAgICAgIHNlbGYuZmV0Y2hDYXRlZ29yaWVzKClcbiAgICAgICAgc2VsZi5mZXRjaE5hdkxpbmtzKClcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgZmV0Y2hDYXRlZ29yaWVzICgpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBsaW5rcyA9IEFwcC5ncm91cGxpbmtzXG4gICAgICAgIH0sXG4gICAgICAgIGZldGNoTmF2TGlua3MgKCkge1xuICAgICAgICAgICAgdGhpcy5saW5rcyA9IEFwcC5tZW51XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gTGVmdFNpZGVCYXIudnVlP2ZmOGIxOWRhIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtbmF2aWdhdGlvbi1kcmF3ZXJcIixcbiAgICB7XG4gICAgICBhdHRyczoge1xuICAgICAgICB0ZW1wb3Jhcnk6IFwiXCIsXG4gICAgICAgIFwiaGlkZS1vdmVybGF5XCI6IFwiXCIsXG4gICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgIFwiZW5hYmxlLXJlc2l6ZS13YXRjaGVyXCI6IFwiXCJcbiAgICAgIH0sXG4gICAgICBtb2RlbDoge1xuICAgICAgICB2YWx1ZTogX3ZtLmRyYXdlcixcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgIF92bS5kcmF3ZXIgPSAkJHZcbiAgICAgICAgfSxcbiAgICAgICAgZXhwcmVzc2lvbjogXCJkcmF3ZXJcIlxuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1saXN0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgZGVuc2U6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLl9sKF92bS5saW5rcywgZnVuY3Rpb24obGluaykge1xuICAgICAgICAgICAgcmV0dXJuIF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgICAga2V5OiBsaW5rLmlkLFxuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIGRhcms6IF92bS5kYXJrQ2xhc3MsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGxpbmsudGl0bGUsXG4gICAgICAgICAgICAgICAgaHJlZjogbGluay5ocmVmLFxuICAgICAgICAgICAgICAgIGljb246IGxpbmsuYWN0aW9uXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInYtbGlua1wiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBkYXJrOiBfdm0uZGFya0NsYXNzLFxuICAgICAgICAgICAgICB0aXRsZTogXCJQcm9kdWN0c1wiLFxuICAgICAgICAgICAgICBocmVmOiBcIi9wcm9kdWN0c1wiLFxuICAgICAgICAgICAgICBpY29uOiBcImZhLXNob3BwaW5nLWJhc2tldFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInYtbGlua1wiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBkYXJrOiBfdm0uZGFya0NsYXNzLFxuICAgICAgICAgICAgICB0aXRsZTogXCJDYXRlZ29yaWVzXCIsXG4gICAgICAgICAgICAgIGhyZWY6IFwiL2NhdGVnb3JpZXNcIixcbiAgICAgICAgICAgICAgaWNvbjogXCJmYS10YWdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJjYXRlZ29yeS1saW5rXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IGRhcms6IF92bS5kYXJrQ2xhc3MsIGl0ZW1zOiBfdm0uZ3JvdXBsaW5rcyB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1zdWJoZWFkZXJcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBcImJsdWUtZ3JleS0tdGV4dFwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMVwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICBcIndoaXRlLS10ZXh0XCI6IF92bS5pc0RhcmtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJNZW1iZXJzIEFyZWFcIildXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5nZXRBdXRoXG4gICAgICAgICAgICA/IF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRhc2hib2FyZFwiLFxuICAgICAgICAgICAgICAgICAgaHJlZjogXCIvZGFzaGJvYXJkXCIsXG4gICAgICAgICAgICAgICAgICBpY29uOiBcImRhc2hib2FyZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5nZXRBdXRoXG4gICAgICAgICAgICA/IF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxvZ291dFwiLFxuICAgICAgICAgICAgICAgICAgaHJlZjogXCIvbG9nb3V0XCIsXG4gICAgICAgICAgICAgICAgICBpY29uOiBcInBvd2VyX3NldHRpbmdzX25ld1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICFfdm0uZ2V0QXV0aFxuICAgICAgICAgICAgPyBfYyhcInYtbGlua1wiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGRhcms6IF92bS5kYXJrQ2xhc3MsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJMb2dpblwiLFxuICAgICAgICAgICAgICAgICAgaHJlZjogXCIvbG9naW5cIixcbiAgICAgICAgICAgICAgICAgIGljb246IFwiZmEta2V5XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgIV92bS5nZXRBdXRoXG4gICAgICAgICAgICA/IF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlJlZ2lzdGVyXCIsXG4gICAgICAgICAgICAgICAgICBocmVmOiBcIi9yZWdpc3RlclwiLFxuICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS11c2VyLXBsdXNcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSxcbiAgICAgICAgMlxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi00ZTEyNzcxN1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNGUxMjc3MTdcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0xlZnRTaWRlQmFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9GYWJCdXR0b24udnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0wNjU5ODI4MlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9GYWJCdXR0b24udnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXEZhYkJ1dHRvbi52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIEZhYkJ1dHRvbi52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMDY1OTgyODJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0wNjU5ODI4MlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0ZhYkJ1dHRvbi52dWVcbi8vIG1vZHVsZSBpZCA9IDY4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiPHRlbXBsYXRlPlxuICA8di1zcGVlZC1kaWFsXG4gICAgICB2LW1vZGVsPVwiZmFiXCJcbiAgICAgIDp0b3A9XCJ0b3BcIlxuICAgICAgOmJvdHRvbT1cImJvdHRvbVwiXG4gICAgICA6cmlnaHQ9XCJyaWdodFwiXG4gICAgICA6bGVmdD1cImxlZnRcIlxuICAgICAgOmRpcmVjdGlvbj1cImRpcmVjdGlvblwiXG4gICAgICA6aG92ZXI9XCJob3ZlclwiXG4gICAgICA6dHJhbnNpdGlvbj1cInRyYW5zaXRpb25cIlxuICAgICAgOmFic29sdXRlPVwiYWJzb2x1dGVcIlxuICAgICAgOmZpeGVkPVwiZml4ZWRcIlxuICAgID5cbiAgICAgIDx2LWJ0blxuICAgICAgICBzbG90PVwiYWN0aXZhdG9yXCJcbiAgICAgICAgOmNsYXNzPVwiW2FjdGl2ZUZhYi5jbGFzc11cIlxuICAgICAgICBkYXJrXG4gICAgICAgIGZhYlxuICAgICAgICBob3ZlclxuICAgICAgICB2LW1vZGVsPVwiZmFiXCJcbiAgICAgID5cbiAgICAgICAgPHYtaWNvbiBjbGFzcz1cIndoaXRlLS10ZXh0XCI+e3sgYWN0aXZlRmFiLmljb24gfX08L3YtaWNvbj5cbiAgICAgICAgPHYtaWNvbiBjbGFzcz1cImVycm9yLS10ZXh0XCI+Y2xvc2U8L3YtaWNvbj5cbiAgICAgIDwvdi1idG4+XG4gICAgICA8di1idG5cbiAgICAgICAgdi1mb3I9XCJidXR0b24gaW4gYnV0dG9uc1wiIDprZXk9XCJidXR0b24ubmFtZVwiXG4gICAgICAgIHYtaWY9XCJpc1Zpc2libGUoYnV0dG9uKVwiXG4gICAgICAgIGZhYlxuICAgICAgICBkYXJrXG4gICAgICAgIHNtYWxsXG4gICAgICAgIDpjbGFzcz1cIltidXR0b24uY2xhc3NdXCJcbiAgICAgICAgQGNsaWNrLm5hdGl2ZT1cIm5hdmlnYXRlKGJ1dHRvbilcIlxuICAgICAgPlxuICAgICAgICA8di1pY29uPnt7IGJ1dHRvbi5pY29uIH19PC92LWljb24+XG4gICAgICA8L3YtYnRuPlxuICAgIDwvdi1zcGVlZC1kaWFsPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH0gZnJvbSAndnVleCdcbmNvbnN0IHsgbWFwR2V0dGVycyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2F1dGgnKVxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGRpcmVjdGlvbjogJ3RvcCcsXG4gICAgICAgIGZpeGVkOiB0cnVlLFxuICAgICAgICBmYWI6IGZhbHNlLFxuICAgICAgICBob3ZlcjogZmFsc2UsXG4gICAgICAgIHRvcDogZmFsc2UsXG4gICAgICAgIHJpZ2h0OiB0cnVlLFxuICAgICAgICBib3R0b206IHRydWUsXG4gICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICBhYnNvbHV0ZTogZmFsc2UsXG4gICAgICAgIHRyYW5zaXRpb246ICdzbGlkZS15LXJldmVyc2UtdHJhbnNpdGlvbicsXG4gICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2hvbWUnLCBocmVmOiAnLycsIGNsYXNzOiAnaW5kaWdvIGxpZ2h0ZW4tMicsIGljb246ICdmYS1ob21lJywgcmVxdWlyZXNBdXRoOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZGFzaGJvYXJkJywgaHJlZjogJy9kYXNoYm9hcmQnLCBjbGFzczogJ2FtYmVyIGxpZ2h0ZW4tMicsIGljb246ICdmYS1zaG9wcGluZy1iYWcnLCByZXF1aXJlc0F1dGg6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb2dpbicsIGhyZWY6ICcvbG9naW4nLCBjbGFzczogJ3N1Y2Nlc3MnLCBpY29uOiAnZmEta2V5JywgcmVxdWlyZXNBdXRoOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmVnaXN0ZXInLCBocmVmOiAnL3JlZ2lzdGVyJywgY2xhc3M6ICdpbmZvJywgaWNvbjogJ2ZhLXVzZXItcGx1cycsIHJlcXVpcmVzQXV0aDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvZ291dCcsIGhyZWY6ICcvbG9nb3V0JywgY2xhc3M6ICdyZWQgbGlnaHRlbi0yJywgaWNvbjogJ2ZhLXBvd2VyLW9mZicsIHJlcXVpcmVzQXV0aDogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnc2Nyb2xsLXVwJywgaHJlZjogbnVsbCwgY2xhc3M6ICdibHVlLWdyZXknLCBpY29uOiAnZmxpZ2h0X3Rha2VvZmYnLCByZXF1aXJlc0F1dGg6IGZhbHNlIH1cbiAgICAgICAgXSxcbiAgICAgICAgYWN0aXZlRmFiOiB7XG4gICAgICAgICAgICAnY2xhc3MnOiAncHJpbWFyeScsIGljb246ICdmYS1yb2NrZXQnXG4gICAgICAgIH1cbiAgICB9KSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICAuLi5tYXBHZXR0ZXJzKHtcbiAgICAgICAgICAgIGdldEF1dGg6ICdnZXRBdXRoJ1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgdG9wICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuYm90dG9tID0gIXZhbFxuICAgICAgICB9LFxuICAgICAgICByaWdodCAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSAhdmFsXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbSAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLnRvcCA9ICF2YWxcbiAgICAgICAgfSxcbiAgICAgICAgbGVmdCAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0ID0gIXZhbFxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIG5hdmlnYXRlIChidXR0b24pIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5hY3RpdmVGYWIgPSB7IGNsYXNzOiBidXR0b24uY2xhc3MsIGljb246IGJ1dHRvbi5pY29uIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5hY3RpdmVGYWIgPSB7XG4gICAgICAgICAgICAgICAgICAgICdjbGFzcyc6ICdwcmltYXJ5JywgaWNvbjogJ2ZhLXJvY2tldCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5ocmVmICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHsgcGF0aDogYCR7YnV0dG9uLmhyZWZ9YCB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsVG9Ub3AoMzAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMClcbiAgICAgICAgfSxcbiAgICAgICAgc2Nyb2xsVG9Ub3AgKHNjcm9sbER1cmF0aW9uKSB7XG4gICAgICAgICAgICB2YXIgY29zUGFyYW1ldGVyID0gd2luZG93LnNjcm9sbFkgLyAyXG4gICAgICAgICAgICB2YXIgc2Nyb2xsQ291bnQgPSAwXG4gICAgICAgICAgICB2YXIgb2xkVGltZXN0YW1wID0gcGVyZm9ybWFuY2Uubm93KClcblxuICAgICAgICAgICAgZnVuY3Rpb24gc3RlcCAobmV3VGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsQ291bnQgKz0gTWF0aC5QSSAvIChzY3JvbGxEdXJhdGlvbiAvIChuZXdUaW1lc3RhbXAgLSBvbGRUaW1lc3RhbXApKVxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxDb3VudCA+PSBNYXRoLlBJKSB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgPT09IDApIHJldHVyblxuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBNYXRoLnJvdW5kKGNvc1BhcmFtZXRlciArIGNvc1BhcmFtZXRlciAqIE1hdGguY29zKHNjcm9sbENvdW50KSkpXG4gICAgICAgICAgICAgICAgb2xkVGltZXN0YW1wID0gbmV3VGltZXN0YW1wXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApXG4gICAgICAgIH0sXG4gICAgICAgIGlzVmlzaWJsZSAoYnV0dG9uKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGlmIChidXR0b24ucmVxdWlyZXNBdXRoID09PSBmYWxzZSAmJiBidXR0b24ubmFtZSA9PT0gJ2xvZ2luJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAhc2VsZi5nZXRBdXRoXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJ1dHRvbi5yZXF1aXJlc0F1dGggPT09IGZhbHNlICYmIGJ1dHRvbi5uYW1lID09PSAncmVnaXN0ZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzZWxmLmdldEF1dGhcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYnV0dG9uLnJlcXVpcmVzQXV0aCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmdldEF1dGhcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYnV0dG9uLnJlcXVpcmVzQXV0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gRmFiQnV0dG9uLnZ1ZT80ZWNlZjcyMiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LXNwZWVkLWRpYWxcIixcbiAgICB7XG4gICAgICBhdHRyczoge1xuICAgICAgICB0b3A6IF92bS50b3AsXG4gICAgICAgIGJvdHRvbTogX3ZtLmJvdHRvbSxcbiAgICAgICAgcmlnaHQ6IF92bS5yaWdodCxcbiAgICAgICAgbGVmdDogX3ZtLmxlZnQsXG4gICAgICAgIGRpcmVjdGlvbjogX3ZtLmRpcmVjdGlvbixcbiAgICAgICAgaG92ZXI6IF92bS5ob3ZlcixcbiAgICAgICAgdHJhbnNpdGlvbjogX3ZtLnRyYW5zaXRpb24sXG4gICAgICAgIGFic29sdXRlOiBfdm0uYWJzb2x1dGUsXG4gICAgICAgIGZpeGVkOiBfdm0uZml4ZWRcbiAgICAgIH0sXG4gICAgICBtb2RlbDoge1xuICAgICAgICB2YWx1ZTogX3ZtLmZhYixcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgIF92bS5mYWIgPSAkJHZcbiAgICAgICAgfSxcbiAgICAgICAgZXhwcmVzc2lvbjogXCJmYWJcIlxuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1idG5cIixcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiBbX3ZtLmFjdGl2ZUZhYi5jbGFzc10sXG4gICAgICAgICAgYXR0cnM6IHsgc2xvdDogXCJhY3RpdmF0b3JcIiwgZGFyazogXCJcIiwgZmFiOiBcIlwiLCBob3ZlcjogXCJcIiB9LFxuICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgIHZhbHVlOiBfdm0uZmFiLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICBfdm0uZmFiID0gJCR2XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJmYWJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgc3RhdGljQ2xhc3M6IFwid2hpdGUtLXRleHRcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5hY3RpdmVGYWIuaWNvbikpXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IHN0YXRpY0NsYXNzOiBcImVycm9yLS10ZXh0XCIgfSwgW192bS5fdihcImNsb3NlXCIpXSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uX2woX3ZtLmJ1dHRvbnMsIGZ1bmN0aW9uKGJ1dHRvbikge1xuICAgICAgICByZXR1cm4gX3ZtLmlzVmlzaWJsZShidXR0b24pXG4gICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBidXR0b24ubmFtZSxcbiAgICAgICAgICAgICAgICBjbGFzczogW2J1dHRvbi5jbGFzc10sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgZmFiOiBcIlwiLCBkYXJrOiBcIlwiLCBzbWFsbDogXCJcIiB9LFxuICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5uYXZpZ2F0ZShidXR0b24pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihfdm0uX3MoYnV0dG9uLmljb24pKV0pXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgIH0pXG4gICAgXSxcbiAgICAyXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTA2NTk4MjgyXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0wNjU5ODI4MlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9GYWJCdXR0b24udnVlXG4vLyBtb2R1bGUgaWQgPSA2ODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0Nvb2tpZUxhdy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTczNjMxNDgwXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0Nvb2tpZUxhdy52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHBhcnRpYWxzXFxcXENvb2tpZUxhdy52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIENvb2tpZUxhdy52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNzM2MzE0ODBcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi03MzYzMTQ4MFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9Db29raWVMYXcudnVlXG4vLyBtb2R1bGUgaWQgPSA2ODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsIjx0ZW1wbGF0ZT5cbjxjb29raWUtbGF3IHRoZW1lPVwiZGFyay1saW1lXCIgYnV0dG9uVGV4dD1cIlllcywgSSBVbmRlcnN0YW5kIFRoaXMgU2l0ZSBVc2VzIENvb2tpZS5cIj5cbiAgICAgICAgPGRpdiBzbG90PVwibWVzc2FnZVwiPlxuICAgICAgICAgICAgPHA+VGhpcyB3ZWJzaXRlIHVzZXMgY29va2llcyB0byBlbnN1cmUgeW91IGdldCB0aGUgYmVzdCBleHBlcmllbmNlIG9uIG91ciB3ZWJzaXRlLlxuICAgICAgICAgICAgICAgIDxzcGFuPlJlYWQgT3VyIENvb2tpZSBUZXJtcyBhbmQgVXNhZ2UgRm9yIE1vcmUgSW5mbzo8L3NwYW4+IDxyb3V0ZXItbGluayB0bz1cIi9jb29raWUtbGF3LWFncmVlbWVudFwiPkNsaWNrIGhlcmU8L3JvdXRlci1saW5rPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbjwvY29va2llLWxhdz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQ29va2llTGF3IGZyb20gJ3Z1ZS1jb29raWUtbGF3J1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNvbXBvbmVudHM6IHsgQ29va2llTGF3IH1cbn1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIENvb2tpZUxhdy52dWU/OGUyNzhkNDIiLCIvKiFcbiAqIHZ1ZS1jb29raWUtbGF3IHYxLjMuMFxuICogKGMpIDIwMTcgSmFrdWIgSnVzemN6YWsgPGpha3ViQHBvc3Rlby5kZT5cbiAqIFxuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkNvb2tpZUxhd1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJDb29raWVMYXdcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQ29va2llTGF3XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgX193ZWJwYWNrX3JlcXVpcmVfXygxKVxufVxudmFyIENvbXBvbmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNikoXG4gIC8qIHNjcmlwdCAqL1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgbnVsbCxcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiL1VzZXJzL2pqdXN6Y3phay9Qcm9qZWt0ZS9Qcml2YXQvdnVlLWNvb2tpZS1sYXcvc3JjL2NvbXBvbmVudHMvQ29va2llTGF3LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gQ29va2llTGF3LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChmYWxzZSkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtODYzZmQ5N2VcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi04NjNmZDk3ZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KShcIjkxYzA1MzEyXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKGZhbHNlKSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz97XFxcIm1pbmltaXplXFxcIjpmYWxzZSxcXFwic291cmNlTWFwXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi04NjNmZDk3ZVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3tcXFwic291cmNlTWFwXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9Db29raWVMYXcudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3tcXFwibWluaW1pemVcXFwiOmZhbHNlLFxcXCJzb3VyY2VNYXBcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTg2M2ZkOTdlXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/e1xcXCJzb3VyY2VNYXBcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Nvb2tpZUxhdy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG4vKioqLyB9KSxcbi8qIDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pLCBcIlxcbi5Db29raWUge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHotaW5kZXg6IDk5OTk7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAtd2Via2l0LWJveC1hbGlnbjogYmFzZWxpbmU7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGJhc2VsaW5lO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5Db29raWUgPiAqIHtcXG4gICAgbWFyZ2luOiAwLjkzNzVyZW0gMDtcXG4gICAgLW1zLWZsZXgtaXRlbS1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0OHJlbSkge1xcbi5Db29raWUge1xcbiAgICAgIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gICAgICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAgICAgLW1zLWZsZXgtZmxvdzogcm93O1xcbiAgICAgICAgICAgICAgZmxleC1mbG93OiByb3c7XFxufVxcbi5Db29raWUgPiAqIHtcXG4gICAgICAgIG1hcmdpbjogMDtcXG59XFxufVxcbi5Db29raWUtLXRvcCB7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxufVxcbi5Db29raWUtLWJvdHRvbSB7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxufVxcbi5Db29raWVfX2J1dHRvbnMge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5Db29raWVfX2J1dHRvbnMgPiAqIHtcXG4gICAgbWFyZ2luOiAwLjMxMjVyZW0gMDtcXG59XFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDhyZW0pIHtcXG4uQ29va2llX19idXR0b25zIHtcXG4gICAgICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxuICAgICAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuLkNvb2tpZV9fYnV0dG9ucyA+ICoge1xcbiAgICAgICAgbWFyZ2luOiAwIDAuOTM3NXJlbTtcXG59XFxufVxcbi5Db29raWVfX2J1dHRvbiB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICAtbXMtZmxleC1pdGVtLWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG4uQ29va2llLS1iYXNlIHtcXG4gIGJhY2tncm91bmQ6ICNGMUYxRjE7XFxuICBjb2xvcjogIzIzMjMyMztcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLWJhc2UgLkNvb2tpZV9fYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZDogIzk3RDA1ODtcXG4gICAgcGFkZGluZzogMC42MjVlbSAzLjEyNWVtO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLkNvb2tpZS0tYmFzZSAuQ29va2llX19idXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICM3ZWJmMzY7XFxufVxcbi5Db29raWUtLWJhc2UtLXJvdW5kZWQge1xcbiAgYmFja2dyb3VuZDogI0YxRjFGMTtcXG4gIGNvbG9yOiAjMjMyMzIzO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tYmFzZS0tcm91bmRlZCAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjOTdEMDU4O1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbn1cXG4uQ29va2llLS1iYXNlLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzdlYmYzNjtcXG59XFxuLkNvb2tpZS0tYmxvb2Qtb3JhbmdlIHtcXG4gIGJhY2tncm91bmQ6ICM0MjQ4NTE7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLWJsb29kLW9yYW5nZSAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjRTc2QTY4O1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uQ29va2llLS1ibG9vZC1vcmFuZ2UgLkNvb2tpZV9fYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZTAzZjNjO1xcbn1cXG4uQ29va2llLS1ibG9vZC1vcmFuZ2UtLXJvdW5kZWQge1xcbiAgYmFja2dyb3VuZDogIzQyNDg1MTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tYmxvb2Qtb3JhbmdlLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICNFNzZBNjg7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxufVxcbi5Db29raWUtLWJsb29kLW9yYW5nZS0tcm91bmRlZCAuQ29va2llX19idXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNlMDNmM2M7XFxufVxcbi5Db29raWUtLWRhcmstbGltZSB7XFxuICBiYWNrZ3JvdW5kOiAjNDI0ODUxO1xcbiAgY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAxLjI1MGVtO1xcbn1cXG4uQ29va2llLS1kYXJrLWxpbWUgLkNvb2tpZV9fYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZDogIzk3RDA1ODtcXG4gICAgcGFkZGluZzogMC42MjVlbSAzLjEyNWVtO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLkNvb2tpZS0tZGFyay1saW1lIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzdlYmYzNjtcXG59XFxuLkNvb2tpZS0tZGFyay1saW1lLS1yb3VuZGVkIHtcXG4gIGJhY2tncm91bmQ6ICM0MjQ4NTE7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLWRhcmstbGltZS0tcm91bmRlZCAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjOTdEMDU4O1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbn1cXG4uQ29va2llLS1kYXJrLWxpbWUtLXJvdW5kZWQgLkNvb2tpZV9fYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjN2ViZjM2O1xcbn1cXG4uQ29va2llLS1yb3lhbCB7XFxuICBiYWNrZ3JvdW5kOiAjRkJDMjI3O1xcbiAgY29sb3I6ICMyMzIzMjM7XFxuICBwYWRkaW5nOiAxLjI1MGVtO1xcbn1cXG4uQ29va2llLS1yb3lhbCAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjNzI2Q0VBO1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uQ29va2llLS1yb3lhbCAuQ29va2llX19idXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICM0NzNmZTQ7XFxufVxcbi5Db29raWUtLXJveWFsLS1yb3VuZGVkIHtcXG4gIGJhY2tncm91bmQ6ICNGQkMyMjc7XFxuICBjb2xvcjogIzIzMjMyMztcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLXJveWFsLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICM3MjZDRUE7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxufVxcbi5Db29raWUtLXJveWFsLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzQ3M2ZlNDtcXG59XFxuLnNsaWRlRnJvbVRvcC1lbnRlciwgLnNsaWRlRnJvbVRvcC1sZWF2ZS10byB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgLTEyLjVlbSk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgLTEyLjVlbSk7XFxufVxcbi5zbGlkZUZyb21Ub3AtZW50ZXItdG8sIC5zbGlkZUZyb21Ub3AtbGVhdmUge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG59XFxuLnNsaWRlRnJvbUJvdHRvbS1lbnRlciwgLnNsaWRlRnJvbUJvdHRvbS1sZWF2ZS10byB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMTIuNWVtKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAxMi41ZW0pO1xcbn1cXG4uc2xpZGVGcm9tQm90dG9tLWVudGVyLXRvLCAuc2xpZGVGcm9tQm90dG9tLWxlYXZlIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAwcHgpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxufVxcbi5zbGlkZUZyb21Cb3R0b20tZW50ZXItYWN0aXZlLFxcbi5zbGlkZUZyb21Cb3R0b20tbGVhdmUtYWN0aXZlLFxcbi5zbGlkZUZyb21Ub3AtZW50ZXItYWN0aXZlLFxcbi5zbGlkZUZyb21Ub3AtbGVhdmUtYWN0aXZlIHtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gLjRzIGVhc2UtaW47XFxuICB0cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAuNHMgZWFzZS1pbjtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNHMgZWFzZS1pbjtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNHMgZWFzZS1pbiwgLXdlYmtpdC10cmFuc2Zvcm0gLjRzIGVhc2UtaW47XFxufVxcbi5mYWRlLWVudGVyLWFjdGl2ZSwgLmZhZGUtbGVhdmUtYWN0aXZlIHtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAuNXM7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC41cztcXG59XFxuLmZhZGUtZW50ZXIsIC5mYWRlLWxlYXZlLXRvIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG4vKioqLyB9KSxcbi8qIDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cbi8qKiovIH0pLFxuLyogNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vKiBnbG9iYWxzIF9fVlVFX1NTUl9DT05URVhUX18gKi9cblxuLy8gdGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgcmF3U2NyaXB0RXhwb3J0cyxcbiAgY29tcGlsZWRUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICB2YXIgZnVuY3Rpb25hbCA9IG9wdGlvbnMuZnVuY3Rpb25hbFxuICAgIHZhciBleGlzdGluZyA9IGZ1bmN0aW9uYWxcbiAgICAgID8gb3B0aW9ucy5yZW5kZXJcbiAgICAgIDogb3B0aW9ucy5iZWZvcmVDcmVhdGVcbiAgICBpZiAoIWZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nXG4gICAgICAgID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKVxuICAgICAgICA6IFtob29rXVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBleGlzdGluZyhoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuLyoqKi8gfSksXG4vKiA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIHByb3BzOiB7XG4gICAgYnV0dG9uVGV4dDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ0dvdCBpdCEnXG4gICAgfSxcbiAgICBidXR0b25MaW5rOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIGJ1dHRvbkxpbmtUZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnTW9yZSBpbmZvJ1xuICAgIH0sXG4gICAgbWVzc2FnZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ1RoaXMgd2Vic2l0ZSB1c2VzIGNvb2tpZXMgdG8gZW5zdXJlIHlvdSBnZXQgdGhlIGJlc3QgZXhwZXJpZW5jZSBvbiBvdXIgd2Vic2l0ZS4nXG4gICAgfSxcbiAgICB0aGVtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2Jhc2UnXG4gICAgfSxcblxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYm90dG9tJ1xuICAgIH0sXG5cbiAgICB0cmFuc2l0aW9uTmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3NsaWRlRnJvbUJvdHRvbSdcbiAgICB9LFxuICAgIGJ1dHRvbkNsYXNzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnQ29va2llX19idXR0b24nXG4gICAgfVxuICB9LFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc09wZW46IGZhbHNlXG4gICAgfTtcbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbnRhaW5lclBvc2l0aW9uOiBmdW5jdGlvbiBjb250YWluZXJQb3NpdGlvbigpIHtcbiAgICAgIHJldHVybiAnQ29va2llLS0nICsgdGhpcy5wb3NpdGlvbjtcbiAgICB9LFxuICAgIGNvb2tpZVRoZW1lOiBmdW5jdGlvbiBjb29raWVUaGVtZSgpIHtcbiAgICAgIHJldHVybiAnQ29va2llLS0nICsgdGhpcy50aGVtZTtcbiAgICB9XG4gIH0sXG4gIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQoKSB7XG4gICAgaWYgKCF0aGlzLmdldFZpc2l0ZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgc2V0VmlzaXRlZDogZnVuY3Rpb24gc2V0VmlzaXRlZCgpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb29raWU6YWNjZXB0ZWQnLCB0cnVlKTtcbiAgICB9LFxuICAgIGdldFZpc2l0ZWQ6IGZ1bmN0aW9uIGdldFZpc2l0ZWQoKSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Nvb2tpZTphY2NlcHRlZCcpO1xuICAgIH0sXG4gICAgYWNjZXB0OiBmdW5jdGlvbiBhY2NlcHQoKSB7XG4gICAgICB0aGlzLnNldFZpc2l0ZWQoKTtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCd0cmFuc2l0aW9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImFwcGVhclwiOiBcIlwiLFxuICAgICAgXCJuYW1lXCI6IF92bS50cmFuc2l0aW9uTmFtZVxuICAgIH1cbiAgfSwgWyhfdm0uaXNPcGVuKSA/IF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiQ29va2llXCIsXG4gICAgY2xhc3M6IFtfdm0uY29udGFpbmVyUG9zaXRpb24sIF92bS5jb29raWVUaGVtZV1cbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiQ29va2llX19jb250ZW50XCJcbiAgfSwgW192bS5fdChcIm1lc3NhZ2VcIiwgW192bS5fdihfdm0uX3MoX3ZtLm1lc3NhZ2UpKV0pXSwgMiksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiQ29va2llX19idXR0b25zXCJcbiAgfSwgWyhfdm0uYnV0dG9uTGluaykgPyBfYygnYScsIHtcbiAgICBjbGFzczogX3ZtLmJ1dHRvbkNsYXNzLFxuICAgIGF0dHJzOiB7XG4gICAgICBcImhyZWZcIjogX3ZtLmJ1dHRvbkxpbmtcbiAgICB9XG4gIH0sIFtfdm0uX3YoX3ZtLl9zKF92bS5idXR0b25MaW5rVGV4dCkpXSkgOiBfdm0uX2UoKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBjbGFzczogX3ZtLmJ1dHRvbkNsYXNzLFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IF92bS5hY2NlcHRcbiAgICB9XG4gIH0sIFtfdm0uX3YoX3ZtLl9zKF92bS5idXR0b25UZXh0KSldKV0pXSkgOiBfdm0uX2UoKV0pXG59LHN0YXRpY1JlbmRlckZuczogW119XG5tb2R1bGUuZXhwb3J0cy5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbmlmIChmYWxzZSkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi04NjNmZDk3ZVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtY29va2llLWxhdy9kaXN0L3Z1ZS1jb29raWUtbGF3LmpzXG4vLyBtb2R1bGUgaWQgPSA2OTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJjb29raWUtbGF3XCIsXG4gICAge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgdGhlbWU6IFwiZGFyay1saW1lXCIsXG4gICAgICAgIGJ1dHRvblRleHQ6IFwiWWVzLCBJIFVuZGVyc3RhbmQgVGhpcyBTaXRlIFVzZXMgQ29va2llLlwiXG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcImRpdlwiLCB7IGF0dHJzOiB7IHNsb3Q6IFwibWVzc2FnZVwiIH0sIHNsb3Q6IFwibWVzc2FnZVwiIH0sIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJwXCIsXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICBcIlRoaXMgd2Vic2l0ZSB1c2VzIGNvb2tpZXMgdG8gZW5zdXJlIHlvdSBnZXQgdGhlIGJlc3QgZXhwZXJpZW5jZSBvbiBvdXIgd2Vic2l0ZS5cXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXCJSZWFkIE91ciBDb29raWUgVGVybXMgYW5kIFVzYWdlIEZvciBNb3JlIEluZm86XCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcInJvdXRlci1saW5rXCIsIHsgYXR0cnM6IHsgdG86IFwiL2Nvb2tpZS1sYXctYWdyZWVtZW50XCIgfSB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihcIkNsaWNrIGhlcmVcIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi03MzYzMTQ4MFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNzM2MzE0ODBcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0Nvb2tpZUxhdy52dWVcbi8vIG1vZHVsZSBpZCA9IDY5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtYXBwXCIsXG4gICAgeyBhdHRyczogeyBkYXJrOiBfdm0uQXBwLnRoZW1lLmRhcmssIHN0YW5kYWxvbmU6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFwibGVmdC1zaWRlLWJhclwiKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImFwcC1uYXYtYmFyXCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcIm1haW5cIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwYS0wIG1hLTBcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgdHJhbnNpdGlvbjogXCJzbGlkZS14LXRyYW5zaXRpb25cIiwgZmx1aWQ6IFwiXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3QoXCJkZWZhdWx0XCIpXSxcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJmYWItYnV0dG9uXCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiY29va2llLWxhd1wiKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImFwcC1mb290ZXJcIilcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtZThmMTRhYzRcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWU4ZjE0YWM0XCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9sYXlvdXRzL01haW4udnVlXG4vLyBtb2R1bGUgaWQgPSA2OTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00YzViOWVlNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0NhdGVnb3JpZXMudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIyMTA4YTcxY1wiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00YzViOWVlNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0NhdGVnb3JpZXMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTRjNWI5ZWU2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ2F0ZWdvcmllcy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNGM1YjllZTZcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9DYXRlZ29yaWVzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzExXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uYnJlYWRjcnVtYnMgbGlbZGF0YS12LTRjNWI5ZWU2XTpub3QoOmxhc3QtY2hpbGQpOmFmdGVyIHtcXG4gICAgY29sb3I6ICMwMDk2ODg7XFxuICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1kaXZpZGVyKTtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkM6L1VzZXJzL3VyaWFoL3NpdGVzL3d3dy9zaG9wL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvQ2F0ZWdvcmllcy52dWU/N2E0M2M5M2JcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQWdNQTtJQUNBLGVBQUE7SUFDQSw0QkFBQTtJQUNBLHVCQUFBO0NBQ0FcIixcImZpbGVcIjpcIkNhdGVnb3JpZXMudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjx0ZW1wbGF0ZT5cXG4gIDxtYWluLWxheW91dCA6Y2xhc3M9XFxcIltjb250ZW50Q2xhc3NdXFxcIj5cXG4gICAgICA8di1jb250YWluZXIgZmx1aWQgZ3JpZC1saXN0LW1kIHN0eWxlPVxcXCJwYWRkaW5nLXRvcDoxMDBweDtcXFwiPlxcbiAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxcbiAgICAgICAgICAgIDx2LWJyZWFkY3J1bWJzIGljb25zIGRpdmlkZXI9XFxcImZvcndhcmRcXFwiPlxcbiAgICAgICAgICAgICAgICA8di1icmVhZGNydW1icy1pdGVtXFxuICAgICAgICAgICAgICAgIGFjdGl2ZS1jbGFzcz1cXFwicHJpbWFyeS0tdGV4dFxcXCJcXG4gICAgICAgICAgICAgICAgOmRpc2FibGVkPVxcXCJmYWxzZVxcXCJcXG4gICAgICAgICAgICAgICAgdG89XFxcIi9cXFwiXFxuICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgIEhvbWVcXG4gICAgICAgICAgICAgICAgPC92LWJyZWFkY3J1bWJzLWl0ZW0+XFxuICAgICAgICAgICAgICAgIDx2LWJyZWFkY3J1bWJzLWl0ZW1cXG4gICAgICAgICAgICAgICAgOmRpc2FibGVkPVxcXCJ0cnVlXFxcIlxcbiAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICBDYXRlZ29yaWVzXFxuICAgICAgICAgICAgICAgIDwvdi1icmVhZGNydW1icy1pdGVtPlxcbiAgICAgICAgICAgIDwvdi1icmVhZGNydW1icz5cXG4gICAgICAgIDwvdi1sYXlvdXQ+XFxuICAgICAgICA8di1sYXlvdXQgcm93IHdyYXAgc3R5bGU9XFxcInBhZGRpbmctdG9wOjEwMHB4O1xcXCI+XFxuICAgICAgICAgIDx2LWZsZXhcXG4gICAgICAgICAgICB4czEyIHNtMTIgbWQ0IGxnNCB4bDRcXG4gICAgICAgICAgICB2LWZvcj1cXFwiKGNhdGVnb3J5LGluZGV4KSBpbiBjYXRlZ29yaWVzXFxcIlxcbiAgICAgICAgICAgIDprZXk9XFxcImNhdGVnb3J5LnNsdWdcXFwiIDppbmRleD1cXFwiaW5kZXhcXFwiXFxuICAgICAgICAgID5cXG4gICAgICAgICAgICA8di1jYXJkIDpkYXJrPVxcXCJ0cnVlXFxcIj5cXG4gICAgICAgICAgICA8Y2xhenktbG9hZCA6c3JjPVxcXCJjYXRlZ29yeS5pbWFnZVxcXCI+XFxuICAgICAgICAgICAgICAgIDx0cmFuc2l0aW9uIG5hbWU9XFxcImZhZGVcXFwiIHNsb3Q9XFxcImltYWdlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtbWVkaWFcXG4gICAgICAgICAgICAgICAgICAgICAgICA6c3JjPVxcXCJjYXRlZ29yeS5pbWFnZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XFxcIjIwMHB4XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmaWxsLWhlaWdodCBmbHVpZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IGZpbGwtaGVpZ2h0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGFsaWduLWVuZCBmbGV4Ym94PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImhlYWRsaW5lXFxcIiB2LXRleHQ9XFxcImNhdGVnb3J5Lm5hbWVcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jb250YWluZXI+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZC1tZWRpYT5cXG4gICAgICAgICAgICAgICAgPC90cmFuc2l0aW9uPlxcbiAgICAgICAgICAgICAgICA8dHJhbnNpdGlvbiBuYW1lPVxcXCJmYWRlXFxcIiBzbG90PVxcXCJwbGFjZWhvbGRlclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1jYXJkLW1lZGlhXFxuICAgICAgICAgICAgICAgICAgICBzcmM9XFxcIi9pbWcvQmFycy5zdmdcXFwiXFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XFxcIjIwMHB4XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9XFxcIjIwMHB4XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmaWxsLWhlaWdodCBmbHVpZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IGZpbGwtaGVpZ2h0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGFsaWduLWVuZCBmbGV4Ym94PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJoZWFkbGluZVxcXCIgdi10ZXh0PVxcXCJjYXRlZ29yeS5uYW1lXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtY29udGFpbmVyPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQtbWVkaWE+XFxuICAgICAgICAgICAgICAgIDwvdHJhbnNpdGlvbj5cXG4gICAgICAgICAgICAgIDwvY2xhenktbG9hZD5cXG4gICAgICAgICAgICAgIDx2LWNhcmQtYWN0aW9ucyBjbGFzcz1cXFwiYWNjZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImJvZHktMlxcXCI+VmlldyBQcm9kdWN0IExpc3Q8L3NwYW4+XFxuICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxcbiAgICAgICAgICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVxcXCJwcmltYXJ5XFxcIiBzbG90PVxcXCJhY3RpdmF0b3JcXFwiIEBjbGljaz1cXFwic2hvd0NhdGVnb3J5KGNhdGVnb3J5LnNsdWcpXFxcIj5cXG4gICAgICAgICAgICAgICAgPHYtaWNvbj5mYS1saXN0PC92LWljb24+XFxuICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgIDwhLS0gQWRkIE90aGVyIEFjdGlvbiBidXR0b25zIEhlcmUgLS0+XFxuICAgICAgICAgICAgICA8L3YtY2FyZC1hY3Rpb25zPlxcbiAgICAgICAgICAgIDwvdi1jYXJkPlxcbiAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgIDwvdi1sYXlvdXQ+XFxuICAgICAgICA8di1sYXlvdXQgdi1pZj1cXFwiIW5vUGFnaW5hdGlvblxcXCIgcm93IHdyYXA+XFxuICAgICAgICAgICAgPHYtZmxleCB4czEyPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0ZXh0LXhzLWNlbnRlclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1wYWdpbmF0aW9uXFxuICAgICAgICAgICAgICAgICAgICA6bGVuZ3RoPVxcXCJsZW5ndGhcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJwYWdlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgY2lyY2xlXFxuICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtcGFnaW5hdGlvbj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgPHYtZmxleCB4czEyPlxcbiAgICAgICAgICAgICAgICA8di1jYXJkIGZsYXQgY2xhc3M9XFxcImdyZXkgbGlnaHRlbi00XFxcIiBoZWlnaHQ9XFxcIjUwcHhcXFwiPjwvdi1jYXJkPlxcbiAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgPC92LWxheW91dD5cXG4gICAgICAgIDwhLS0gSWYgTm8gUGFnaW5hdGlvbiBUaGVuIEFkZCA1MHB4IEhlaWdodCAtLT5cXG4gICAgICAgIDx2LWxheW91dCB2LWVsc2Ugcm93IHdyYXA+XFxuICAgICAgICAgICAgPHYtZmxleCB4czEyPlxcbiAgICAgICAgICAgICAgICA8di1jYXJkIGZsYXQgY2xhc3M9XFxcImdyZXkgbGlnaHRlbi00XFxcIiBoZWlnaHQ9XFxcIjUwcHhcXFwiPjwvdi1jYXJkPlxcbiAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgPC92LWxheW91dD5cXG4gICAgICA8L3YtY29udGFpbmVyPlxcbiAgICA8L3YtZmxleD5cXG4gIDwvdi1sYXlvdXQ+XFxuICA8L21haW4tbGF5b3V0PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5pbXBvcnQgTWFpbkxheW91dCBmcm9tICcuLi9sYXlvdXRzL01haW4udnVlJ1xcbmltcG9ydCBUaGVtZSBmcm9tICcuLi9taXhpbnMvdGhlbWUnXFxuXFxuZXhwb3J0IGRlZmF1bHQge1xcbiAgICBwcm9wczogWydxdWVyeSddLFxcbiAgICBtaXhpbnM6IFtUaGVtZV0sXFxuICAgIGRhdGE6ICgpID0+ICh7XFxuICAgICAgICBjb250ZW50Q2xhc3M6IHsgJ2dyZXknOiB0cnVlLCAnbGlnaHRlbi00JzogdHJ1ZSwgJ2FjY2VudC0tdGV4dCc6IHRydWUgfSxcXG4gICAgICAgIGNhdGVnb3JpZXM6IFtdLFxcbiAgICAgICAgbGlua3M6IHtcXG4gICAgICAgICAgICBmaXJzdDogbnVsbCxcXG4gICAgICAgICAgICBsYXN0OiBudWxsLFxcbiAgICAgICAgICAgIHByZXY6IG51bGwsXFxuICAgICAgICAgICAgbmV4dDogbnVsbFxcbiAgICAgICAgfSxcXG4gICAgICAgIG1ldGE6IHtcXG4gICAgICAgICAgICBjdXJyZW50X3BhZ2U6IDEsXFxuICAgICAgICAgICAgZnJvbTogMCxcXG4gICAgICAgICAgICBsYXN0X3BhZ2U6IDAsXFxuICAgICAgICAgICAgcGF0aDogbnVsbCxcXG4gICAgICAgICAgICBwZXJfcGFnZTogMCxcXG4gICAgICAgICAgICB0bzogMCxcXG4gICAgICAgICAgICB0b3RhbDogMFxcbiAgICAgICAgfSxcXG4gICAgICAgIHBhZ2U6IDFcXG4gICAgfSksXFxuICAgIGNvbXB1dGVkOiB7XFxuICAgICAgICBsZW5ndGggKCkge1xcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHNlbGYubWV0YS50b3RhbCAvIChzZWxmLm1ldGEucGVyX3BhZ2UpKVxcbiAgICAgICAgfSxcXG4gICAgICAgIG5vUGFnaW5hdGlvbiAoKSB7XFxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICAgICAgcmV0dXJuIHNlbGYubWV0YS50b3RhbCA9PT0gc2VsZi5tZXRhLnBlcl9wYWdlXFxuICAgICAgICB9XFxuICAgIH0sXFxuICAgIGNyZWF0ZWQgKCkge1xcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICBzZWxmLmdldENhdGVnb3JpZXMoKVxcbiAgICB9LFxcbiAgICBtb3VudGVkICgpIHtcXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xcbiAgICAgICAgc2VsZi5wYWdlID0gcGFyc2VJbnQoc2VsZi5xdWVyeS5wYWdlKVxcbiAgICB9LFxcbiAgICBtZXRob2RzOiB7XFxuICAgICAgICBhc3luYyBnZXRDYXRlZ29yaWVzICgpIHtcXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcXG4gICAgICAgICAgICBsZXQgcGFnZSA9IHNlbGYuJHJvdXRlLnF1ZXJ5LnBhZ2UgfHwgMVxcbiAgICAgICAgICAgIGF3YWl0IGF4aW9zLmdldChgJHtyb3V0ZSgnYXBpLmNhdGVnb3J5LmluZGV4Jyl9P3BhZ2U9JHtwYWdlfWApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XFxuICAgICAgICAgICAgICAgIHNlbGYuY2F0ZWdvcmllcyA9IHJlc3BvbnNlLmRhdGEuZGF0YVxcbiAgICAgICAgICAgICAgICBzZWxmLmxpbmtzID0gcmVzcG9uc2UuZGF0YS5saW5rc1xcbiAgICAgICAgICAgICAgICBzZWxmLm1ldGEgPSByZXNwb25zZS5kYXRhLm1ldGFcXG4gICAgICAgICAgICAgICAgLy8gdm0uJHBvcHVwKHsgbWVzc2FnZTogYENhdGVnb3J5IFBhZ2U6ICR7cGFnZX1gLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICB9KS5jYXRjaCgoe2Vycm9ycywgbWVzc2FnZX0pID0+IHtcXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICB9KVxcbiAgICAgICAgfSxcXG4gICAgICAgIGFzeW5jIGxvYWRDYXRlZ29yaWVzICgpIHtcXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcXG4gICAgICAgICAgICBhd2FpdCBheGlvcy5nZXQoYCR7cm91dGUoJ2FwaS5jYXRlZ29yeS5pbmRleCcpfT9wYWdlPSR7c2VsZi5wYWdlfWApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XFxuICAgICAgICAgICAgICAgIHNlbGYuY2F0ZWdvcmllcyA9IHJlc3BvbnNlLmRhdGEuZGF0YVxcbiAgICAgICAgICAgICAgICBzZWxmLmxpbmtzID0gcmVzcG9uc2UuZGF0YS5saW5rc1xcbiAgICAgICAgICAgICAgICBzZWxmLm1ldGEgPSByZXNwb25zZS5kYXRhLm1ldGFcXG4gICAgICAgICAgICAgICAgLy8gdm0uJHBvcHVwKHsgbWVzc2FnZTogYENhdGVnb3J5IFBhZ2U6ICR7c2VsZi5wYWdlfWAsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcnMpXFxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxcbiAgICAgICAgICAgIH0pXFxuICAgICAgICB9LFxcbiAgICAgICAgc2hvd0NhdGVnb3J5IChzbHVnKSB7XFxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICAgICAgc2VsZi4kcm91dGVyLnB1c2goeyBuYW1lOiAnY2F0ZWdvcnkuc2hvdycsIHBhcmFtczogeyBzbHVnOiBzbHVnIH0gfSlcXG4gICAgICAgIH1cXG4gICAgfSxcXG4gICAgY29tcG9uZW50czoge1xcbiAgICAgICAgTWFpbkxheW91dFxcbiAgICB9LFxcbiAgICB3YXRjaDoge1xcbiAgICAgICAgcGFnZSAobmV3VmFsdWUpIHtcXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcXG4gICAgICAgICAgICBzZWxmLnBhZ2UgPSBuZXdWYWx1ZVxcbiAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHsgbmFtZTogJ2NhdGVnb3J5LmluZGV4JywgcXVlcnk6IHsgcGFnZTogbmV3VmFsdWUgfSB9KVxcbiAgICAgICAgfSxcXG4gICAgICAgIGNhdGVnb3JpZXM6IHtcXG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoKSB7XFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYXRlZ29yaWVzIEFycmF5IFVwZGF0ZWQnKVxcbiAgICAgICAgICAgIH0sXFxuICAgICAgICAgICAgZGVlcDogdHJ1ZVxcbiAgICAgICAgfSxcXG4gICAgICAgICckcm91dGUnOiAnbG9hZENhdGVnb3JpZXMnXFxuICAgIH1cXG59XFxuPC9zY3JpcHQ+XFxuXFxuPHN0eWxlIHNjb3BlZD5cXG4uYnJlYWRjcnVtYnMgbGk6bm90KDpsYXN0LWNoaWxkKTphZnRlciB7XFxuICAgIGNvbG9yOiAjMDA5Njg4O1xcbiAgICBjb250ZW50OiBhdHRyKGRhdGEtZGl2aWRlcik7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcbjwvc3R5bGU+XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTRjNWI5ZWU2XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvQ2F0ZWdvcmllcy52dWVcbi8vIG1vZHVsZSBpZCA9IDcxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDUiLCI8dGVtcGxhdGU+XG4gIDxtYWluLWxheW91dCA6Y2xhc3M9XCJbY29udGVudENsYXNzXVwiPlxuICAgICAgPHYtY29udGFpbmVyIGZsdWlkIGdyaWQtbGlzdC1tZCBzdHlsZT1cInBhZGRpbmctdG9wOjEwMHB4O1wiPlxuICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICA8di1icmVhZGNydW1icyBpY29ucyBkaXZpZGVyPVwiZm9yd2FyZFwiPlxuICAgICAgICAgICAgICAgIDx2LWJyZWFkY3J1bWJzLWl0ZW1cbiAgICAgICAgICAgICAgICBhY3RpdmUtY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgdG89XCIvXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIEhvbWVcbiAgICAgICAgICAgICAgICA8L3YtYnJlYWRjcnVtYnMtaXRlbT5cbiAgICAgICAgICAgICAgICA8di1icmVhZGNydW1icy1pdGVtXG4gICAgICAgICAgICAgICAgOmRpc2FibGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBDYXRlZ29yaWVzXG4gICAgICAgICAgICAgICAgPC92LWJyZWFkY3J1bWJzLWl0ZW0+XG4gICAgICAgICAgICA8L3YtYnJlYWRjcnVtYnM+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3cgd3JhcCBzdHlsZT1cInBhZGRpbmctdG9wOjEwMHB4O1wiPlxuICAgICAgICAgIDx2LWZsZXhcbiAgICAgICAgICAgIHhzMTIgc20xMiBtZDQgbGc0IHhsNFxuICAgICAgICAgICAgdi1mb3I9XCIoY2F0ZWdvcnksaW5kZXgpIGluIGNhdGVnb3JpZXNcIlxuICAgICAgICAgICAgOmtleT1cImNhdGVnb3J5LnNsdWdcIiA6aW5kZXg9XCJpbmRleFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHYtY2FyZCA6ZGFyaz1cInRydWVcIj5cbiAgICAgICAgICAgIDxjbGF6eS1sb2FkIDpzcmM9XCJjYXRlZ29yeS5pbWFnZVwiPlxuICAgICAgICAgICAgICAgIDx0cmFuc2l0aW9uIG5hbWU9XCJmYWRlXCIgc2xvdD1cImltYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtbWVkaWFcbiAgICAgICAgICAgICAgICAgICAgICAgIDpzcmM9XCJjYXRlZ29yeS5pbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIyMDBweFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmaWxsLWhlaWdodCBmbHVpZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgZmlsbC1oZWlnaHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBhbGlnbi1lbmQgZmxleGJveD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWFkbGluZVwiIHYtdGV4dD1cImNhdGVnb3J5Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZC1tZWRpYT5cbiAgICAgICAgICAgICAgICA8L3RyYW5zaXRpb24+XG4gICAgICAgICAgICAgICAgPHRyYW5zaXRpb24gbmFtZT1cImZhZGVcIiBzbG90PVwicGxhY2Vob2xkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtY2FyZC1tZWRpYVxuICAgICAgICAgICAgICAgICAgICBzcmM9XCIvaW1nL0JhcnMuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMjAwcHhcIlxuICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjIwMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtY29udGFpbmVyIGZpbGwtaGVpZ2h0IGZsdWlkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCBmaWxsLWhlaWdodD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGFsaWduLWVuZCBmbGV4Ym94PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWFkbGluZVwiIHYtdGV4dD1cImNhdGVnb3J5Lm5hbWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZC1tZWRpYT5cbiAgICAgICAgICAgICAgICA8L3RyYW5zaXRpb24+XG4gICAgICAgICAgICAgIDwvY2xhenktbG9hZD5cbiAgICAgICAgICAgICAgPHYtY2FyZC1hY3Rpb25zIGNsYXNzPVwiYWNjZW50XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJib2R5LTJcIj5WaWV3IFByb2R1Y3QgTGlzdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVwicHJpbWFyeVwiIHNsb3Q9XCJhY3RpdmF0b3JcIiBAY2xpY2s9XCJzaG93Q2F0ZWdvcnkoY2F0ZWdvcnkuc2x1ZylcIj5cbiAgICAgICAgICAgICAgICA8di1pY29uPmZhLWxpc3Q8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDwhLS0gQWRkIE90aGVyIEFjdGlvbiBidXR0b25zIEhlcmUgLS0+XG4gICAgICAgICAgICAgIDwvdi1jYXJkLWFjdGlvbnM+XG4gICAgICAgICAgICA8L3YtY2FyZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHYtaWY9XCIhbm9QYWdpbmF0aW9uXCIgcm93IHdyYXA+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQteHMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LXBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgOmxlbmd0aD1cImxlbmd0aFwiXG4gICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgY2lyY2xlXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC92LXBhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICA8di1jYXJkIGZsYXQgY2xhc3M9XCJncmV5IGxpZ2h0ZW4tNFwiIGhlaWdodD1cIjUwcHhcIj48L3YtY2FyZD5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8IS0tIElmIE5vIFBhZ2luYXRpb24gVGhlbiBBZGQgNTBweCBIZWlnaHQgLS0+XG4gICAgICAgIDx2LWxheW91dCB2LWVsc2Ugcm93IHdyYXA+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICAgICAgPHYtY2FyZCBmbGF0IGNsYXNzPVwiZ3JleSBsaWdodGVuLTRcIiBoZWlnaHQ9XCI1MHB4XCI+PC92LWNhcmQ+XG4gICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgIDwvdi1jb250YWluZXI+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDwvbWFpbi1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1haW5MYXlvdXQgZnJvbSAnLi4vbGF5b3V0cy9NYWluLnZ1ZSdcbmltcG9ydCBUaGVtZSBmcm9tICcuLi9taXhpbnMvdGhlbWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogWydxdWVyeSddLFxuICAgIG1peGluczogW1RoZW1lXSxcbiAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICBjb250ZW50Q2xhc3M6IHsgJ2dyZXknOiB0cnVlLCAnbGlnaHRlbi00JzogdHJ1ZSwgJ2FjY2VudC0tdGV4dCc6IHRydWUgfSxcbiAgICAgICAgY2F0ZWdvcmllczogW10sXG4gICAgICAgIGxpbmtzOiB7XG4gICAgICAgICAgICBmaXJzdDogbnVsbCxcbiAgICAgICAgICAgIGxhc3Q6IG51bGwsXG4gICAgICAgICAgICBwcmV2OiBudWxsLFxuICAgICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICBjdXJyZW50X3BhZ2U6IDEsXG4gICAgICAgICAgICBmcm9tOiAwLFxuICAgICAgICAgICAgbGFzdF9wYWdlOiAwLFxuICAgICAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgICAgIHBlcl9wYWdlOiAwLFxuICAgICAgICAgICAgdG86IDAsXG4gICAgICAgICAgICB0b3RhbDogMFxuICAgICAgICB9LFxuICAgICAgICBwYWdlOiAxXG4gICAgfSksXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgbGVuZ3RoICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoc2VsZi5tZXRhLnRvdGFsIC8gKHNlbGYubWV0YS5wZXJfcGFnZSkpXG4gICAgICAgIH0sXG4gICAgICAgIG5vUGFnaW5hdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHJldHVybiBzZWxmLm1ldGEudG90YWwgPT09IHNlbGYubWV0YS5wZXJfcGFnZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVkICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIHNlbGYuZ2V0Q2F0ZWdvcmllcygpXG4gICAgfSxcbiAgICBtb3VudGVkICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIHNlbGYucGFnZSA9IHBhcnNlSW50KHNlbGYucXVlcnkucGFnZSlcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgYXN5bmMgZ2V0Q2F0ZWdvcmllcyAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGxldCBwYWdlID0gc2VsZi4kcm91dGUucXVlcnkucGFnZSB8fCAxXG4gICAgICAgICAgICBhd2FpdCBheGlvcy5nZXQoYCR7cm91dGUoJ2FwaS5jYXRlZ29yeS5pbmRleCcpfT9wYWdlPSR7cGFnZX1gKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuY2F0ZWdvcmllcyA9IHJlc3BvbnNlLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIHNlbGYubGlua3MgPSByZXNwb25zZS5kYXRhLmxpbmtzXG4gICAgICAgICAgICAgICAgc2VsZi5tZXRhID0gcmVzcG9uc2UuZGF0YS5tZXRhXG4gICAgICAgICAgICAgICAgLy8gdm0uJHBvcHVwKHsgbWVzc2FnZTogYENhdGVnb3J5IFBhZ2U6ICR7cGFnZX1gLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9ycylcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGxvYWRDYXRlZ29yaWVzICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgYXdhaXQgYXhpb3MuZ2V0KGAke3JvdXRlKCdhcGkuY2F0ZWdvcnkuaW5kZXgnKX0/cGFnZT0ke3NlbGYucGFnZX1gKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuY2F0ZWdvcmllcyA9IHJlc3BvbnNlLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIHNlbGYubGlua3MgPSByZXNwb25zZS5kYXRhLmxpbmtzXG4gICAgICAgICAgICAgICAgc2VsZi5tZXRhID0gcmVzcG9uc2UuZGF0YS5tZXRhXG4gICAgICAgICAgICAgICAgLy8gdm0uJHBvcHVwKHsgbWVzc2FnZTogYENhdGVnb3J5IFBhZ2U6ICR7c2VsZi5wYWdlfWAsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgfSkuY2F0Y2goKHtlcnJvcnMsIG1lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd0NhdGVnb3J5IChzbHVnKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHsgbmFtZTogJ2NhdGVnb3J5LnNob3cnLCBwYXJhbXM6IHsgc2x1Zzogc2x1ZyB9IH0pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgTWFpbkxheW91dFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgcGFnZSAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5wYWdlID0gbmV3VmFsdWVcbiAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHsgbmFtZTogJ2NhdGVnb3J5LmluZGV4JywgcXVlcnk6IHsgcGFnZTogbmV3VmFsdWUgfSB9KVxuICAgICAgICB9LFxuICAgICAgICBjYXRlZ29yaWVzOiB7XG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhdGVnb3JpZXMgQXJyYXkgVXBkYXRlZCcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVlcDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICAnJHJvdXRlJzogJ2xvYWRDYXRlZ29yaWVzJ1xuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLmJyZWFkY3J1bWJzIGxpOm5vdCg6bGFzdC1jaGlsZCk6YWZ0ZXIge1xuICAgIGNvbG9yOiAjMDA5Njg4O1xuICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1kaXZpZGVyKTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDYXRlZ29yaWVzLnZ1ZT83YTQzYzkzYiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJtYWluLWxheW91dFwiLFxuICAgIHsgY2xhc3M6IFtfdm0uY29udGVudENsYXNzXSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNTdHlsZTogeyBcInBhZGRpbmctdG9wXCI6IFwiMTAwcHhcIiB9LFxuICAgICAgICAgIGF0dHJzOiB7IGZsdWlkOiBcIlwiLCBcImdyaWQtbGlzdC1tZFwiOiBcIlwiIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnJlYWRjcnVtYnNcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGljb25zOiBcIlwiLCBkaXZpZGVyOiBcImZvcndhcmRcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1icmVhZGNydW1icy1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RpdmUtY2xhc3NcIjogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB0bzogXCIvXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgICBIb21lXFxuICAgICAgICAgICAgICBcIildXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1icmVhZGNydW1icy1pdGVtXCIsIHsgYXR0cnM6IHsgZGlzYWJsZWQ6IHRydWUgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIlxcbiAgICAgICAgICAgICAgICAgIENhdGVnb3JpZXNcXG4gICAgICAgICAgICAgIFwiKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IFwicGFkZGluZy10b3BcIjogXCIxMDBweFwiIH0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3ZtLl9sKF92bS5jYXRlZ29yaWVzLCBmdW5jdGlvbihjYXRlZ29yeSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAga2V5OiBjYXRlZ29yeS5zbHVnLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgeHMxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc20xMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbWQ0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsZzQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHhsNDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBkYXJrOiB0cnVlIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGF6eS1sb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHNyYzogY2F0ZWdvcnkuaW1hZ2UgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zaXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzbG90OiBcImltYWdlXCIsIG5hbWU6IFwiZmFkZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1tZWRpYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogY2F0ZWdvcnkuaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMjAwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBcImZpbGwtaGVpZ2h0XCI6IFwiXCIsIGZsdWlkOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgXCJmaWxsLWhlaWdodFwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4czEyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbGlnbi1lbmRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhib3g6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zaXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzbG90OiBcInBsYWNlaG9sZGVyXCIsIG5hbWU6IFwiZmFkZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1tZWRpYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCIvaW1nL0JhcnMuc3ZnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMjAwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjIwMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgXCJmaWxsLWhlaWdodFwiOiBcIlwiLCBmbHVpZDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IFwiZmlsbC1oZWlnaHRcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHMxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWxpZ24tZW5kXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4Ym94OiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRsaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1hY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImFjY2VudFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImJvZHktMlwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJWaWV3IFByb2R1Y3QgTGlzdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2hvd0NhdGVnb3J5KGNhdGVnb3J5LnNsdWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLWxpc3RcIildKV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAhX3ZtLm5vUGFnaW5hdGlvblxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtcGFnaW5hdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGxlbmd0aDogX3ZtLmxlbmd0aCwgY2lyY2xlOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5wYWdlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1jYXJkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImdyZXkgbGlnaHRlbi00XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBmbGF0OiBcIlwiLCBoZWlnaHQ6IFwiNTBweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1jYXJkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImdyZXkgbGlnaHRlbi00XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBmbGF0OiBcIlwiLCBoZWlnaHQ6IFwiNTBweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi00YzViOWVlNlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNGM1YjllZTZcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvQ2F0ZWdvcmllcy52dWVcbi8vIG1vZHVsZSBpZCA9IDcxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDUiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9DYXRlZ29yeUxpbmsudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi00ODY3MDI2MlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9DYXRlZ29yeUxpbmsudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXENhdGVnb3J5TGluay52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIENhdGVnb3J5TGluay52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNDg2NzAyNjJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi00ODY3MDI2MlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhdGVnb3J5TGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDgzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiPHRlbXBsYXRlPlxuICAgIDx2LWxpc3Q+XG4gICAgICAgIDx2LWxpc3QtZ3JvdXAgdi1mb3I9XCJpdGVtIGluIGl0ZW1zXCIgdi1iaW5kOmtleT1cIml0ZW0udGl0bGVcIj5cbiAgICAgICAgPHYtbGlzdC10aWxlIHNsb3Q9XCJpdGVtXCI+XG4gICAgICAgICAgICA8di1saXN0LXRpbGUtYWN0aW9uIHYtaWY9XCIhaXRlbS5hdmF0YXJcIj5cbiAgICAgICAgICAgIDx2LWljb24+e3sgaXRlbS5hY3Rpb24gfX08L3YtaWNvbj5cbiAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtYWN0aW9uPlxuICAgICAgICAgICAgPHYtYXZhdGFyIHNpemU9XCIyNXB4XCIgdi1lbHNlPlxuICAgICAgICAgICAgICAgIDxpbWcgOnNyYz1cIml0ZW0uYXZhdGFyXCIgYWx0PVwiXCI+XG4gICAgICAgICAgICA8L3YtYXZhdGFyPlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLWNvbnRlbnQgdi1pZj1cIiFpc0RhcmtcIj5cbiAgICAgICAgICAgIDx2LWxpc3QtdGlsZS10aXRsZSA6Y2xhc3M9XCJ7J3ByaW1hcnktLXRleHQnOiBpdGVtLmFjdGl2ZSwnYmx1ZS1ncmV5LS10ZXh0JzogIWl0ZW0uYWN0aXZlLCAndGV4dC0tbGlnaHRlbi0xJzogIWl0ZW0uYWN0aXZlfVwiPnt7IGl0ZW0udGl0bGUgfX08L3YtbGlzdC10aWxlLXRpdGxlPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLWNvbnRlbnQgdi1lbHNlPlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLXRpdGxlIDpjbGFzcz1cInsncHJpbWFyeS0tdGV4dCc6IGl0ZW0uYWN0aXZlLCAndGV4dC0tbGlnaHRlbi0yJzogaXRlbS5hY3RpdmV9XCI+e3sgaXRlbS50aXRsZSB9fTwvdi1saXN0LXRpbGUtdGl0bGU+XG4gICAgICAgICAgICA8L3YtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgICA8di1saXN0LXRpbGUtYWN0aW9uPlxuICAgICAgICAgICAgPHYtaWNvbiA6Y2xhc3M9XCJ7J3ByaW1hcnktLXRleHQnOiAhaXNEYXJrLCAnd2hpdGUtLXRleHQnOiBpc0Rhcmt9XCI+a2V5Ym9hcmRfYXJyb3dfZG93bjwvdi1pY29uPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1hY3Rpb24+XG4gICAgICAgIDwvdi1saXN0LXRpbGU+XG4gICAgICAgIDwhLS0gU3ViIE1lbnUgTGlua3MgLS0+XG4gICAgICAgIDx2LWxpbmsgOmRhcms9XCJpc0RhcmtcIiB2LWZvcj1cInN1Ykl0ZW0gaW4gaXRlbS5pdGVtc1wiIDprZXk9XCJzdWJJdGVtLmlkXCIgOnRpdGxlPVwic3ViSXRlbS50aXRsZVwiIDphdmF0YXI9XCJzdWJJdGVtLmF2YXRhclwiIDppY29uPVwic3ViSXRlbS5hY3Rpb25cIiA6aHJlZj1cInN1Ykl0ZW0uaHJlZlwiPjwvdi1saW5rPlxuICAgICAgICA8L3YtbGlzdC1ncm91cD5cbiAgICA8L3YtbGlzdD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgVkxpbmsgZnJvbSAnLi4vY29tcG9uZW50cy9WTGluay52dWUnXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFsnaXRlbXMnXSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIFZMaW5rXG4gICAgfSxcbiAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICBkYXJrOiBBcHAudGhlbWUuZGFya1xuICAgIH0pLFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbG9hZHZpZXcgKGl0ZW0sIHN1Ykl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHsgcGF0aDogYCR7c3ViSXRlbS5ocmVmfWAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgaGFzQXZhdGFyIChzdWJJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ViSXRlbS5hdmF0YXIgIT09IHVuZGVmaW5lZFxuICAgICAgICB9LFxuICAgICAgICBsb2FkQXZhdGFyIChhdmF0YXIpIHtcbiAgICAgICAgICAgIHJldHVybiBhdmF0YXIgfHwgJ2h0dHBzOi8vYXZhdGFyczAuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvOTA2NDA2Nj92PTQmcz00NjAnXG4gICAgICAgIH0sXG4gICAgICAgIGlzR3JvdXBBY3RpdmUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGxldCBpdGVtc2VnbWVudCA9ICcnXG4gICAgICAgICAgICBsZXQgc2VnbWVudCA9ICcnXG4gICAgICAgICAgICBpZiAoaXRlbS5ocmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtc2VnbWVudCA9IGl0ZW0uaHJlZi5zcGxpdCgnLycpWzFdXG4gICAgICAgICAgICAgICAgc2VnbWVudCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzFdXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zZWdtZW50ID09PSBzZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzQWN0aXZlIChzdWJJdGVtKSB7XG4gICAgICAgICAgICBpZiAoc3ViSXRlbS5ocmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViSXRlbS5ocmVmID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViSXRlbS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViSXRlbS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgaXNEYXJrICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhcmsgPT09IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQ2F0ZWdvcnlMaW5rLnZ1ZT9mYTQ3YzE1MCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02YjQxMWViNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1ZMaW5rLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiOTA2YjJkNzJcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmI0MTFlYjZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9WTGluay52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmI0MTFlYjZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9WTGluay52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNmI0MTFlYjZcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlXG4vLyBtb2R1bGUgaWQgPSA4NTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uc3R5bGVBdmF0YXJbZGF0YS12LTZiNDExZWI2XSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW4tbGVmdDogLTU1cHg7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDOi9Vc2Vycy91cmlhaC9zaXRlcy93d3cvc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLG1CQUFtQjtFQUNuQixtQkFBbUI7Q0FBRVwiLFwiZmlsZVwiOlwiVkxpbmsudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5zdHlsZUF2YXRhciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW4tbGVmdDogLTU1cHg7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNmI0MTFlYjZcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlXG4vLyBtb2R1bGUgaWQgPSA4NTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxpc3QtdGlsZVwiLFxuICAgIHtcbiAgICAgIGNsYXNzOiBbeyBzdHlsZUF2YXRhcjogX3ZtLmF2YXRhck9uIH1dLFxuICAgICAgYXR0cnM6IHsgYXZhdGFyOiBfdm0uYXZhdGFyT24gfSxcbiAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICBfdm0ubmF2aWdhdGUoX3ZtLmhyZWYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF92bS5pY29uT24gJiYgIV92bS5hdmF0YXJPblxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS1hY3Rpb25cIixcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLmlzQWN0aXZlID8gX3ZtLmFjdGl2ZUNvbG9yIDogX3ZtLmljb25Db2xvcixcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBfdm0uaHJlZiA/IFwicG9pbnRlclwiIDogXCJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmljb24pKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmljb25PbiAmJiBfdm0uYXZhdGFyT25cbiAgICAgICAgPyBfYyhcInYtbGlzdC10aWxlLWF2YXRhclwiLCBbXG4gICAgICAgICAgICBfYyhcImltZ1wiLCB7IGF0dHJzOiB7IHNyYzogX3ZtLmF2YXRhciwgYWx0OiBcIlwiIH0gfSlcbiAgICAgICAgICBdKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGlzdC10aWxlLWNvbnRlbnRcIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS10aXRsZVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogX3ZtLmlzQWN0aXZlID8gX3ZtLmFjdGl2ZUNvbG9yIDogX3ZtLmxpbmtDb2xvciB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdHlsZTogeyBjdXJzb3I6IF92bS5ocmVmID8gXCJwb2ludGVyXCIgOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnRpdGxlKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmljb25PbiAmJiBfdm0uYXZhdGFyT25cbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1saXN0LXRpbGUtYWN0aW9uXCIsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IF92bS5pc0FjdGl2ZSA/IF92bS5hY3RpdmVDb2xvciA6IF92bS5pY29uQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogX3ZtLmhyZWYgPyBcInBvaW50ZXJcIiA6IFwiXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5pY29uKSldXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTZiNDExZWI2XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02YjQxMWViNlwiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL1ZMaW5rLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1saXN0XCIsXG4gICAgX3ZtLl9sKF92bS5pdGVtcywgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgcmV0dXJuIF9jKFxuICAgICAgICBcInYtbGlzdC1ncm91cFwiLFxuICAgICAgICB7IGtleTogaXRlbS50aXRsZSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGlzdC10aWxlXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHNsb3Q6IFwiaXRlbVwiIH0sIHNsb3Q6IFwiaXRlbVwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICFpdGVtLmF2YXRhclxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1saXN0LXRpbGUtYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KF92bS5fcyhpdGVtLmFjdGlvbikpXSldLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBfYyhcInYtYXZhdGFyXCIsIHsgYXR0cnM6IHsgc2l6ZTogXCIyNXB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHsgYXR0cnM6IHsgc3JjOiBpdGVtLmF2YXRhciwgYWx0OiBcIlwiIH0gfSlcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAhX3ZtLmlzRGFya1xuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1saXN0LXRpbGUtY29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtbGlzdC10aWxlLXRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmltYXJ5LS10ZXh0XCI6IGl0ZW0uYWN0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1ZS1ncmV5LS10ZXh0XCI6ICFpdGVtLmFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMVwiOiAhaXRlbS5hY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKGl0ZW0udGl0bGUpKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtbGlzdC10aWxlLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpbWFyeS0tdGV4dFwiOiBpdGVtLmFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMlwiOiBpdGVtLmFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoaXRlbS50aXRsZSkpXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS1hY3Rpb25cIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInByaW1hcnktLXRleHRcIjogIV92bS5pc0RhcmssXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndoaXRlLS10ZXh0XCI6IF92bS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJrZXlib2FyZF9hcnJvd19kb3duXCIpXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uX2woaXRlbS5pdGVtcywgZnVuY3Rpb24oc3ViSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgICAga2V5OiBzdWJJdGVtLmlkLFxuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIGRhcms6IF92bS5pc0RhcmssXG4gICAgICAgICAgICAgICAgdGl0bGU6IHN1Ykl0ZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgYXZhdGFyOiBzdWJJdGVtLmF2YXRhcixcbiAgICAgICAgICAgICAgICBpY29uOiBzdWJJdGVtLmFjdGlvbixcbiAgICAgICAgICAgICAgICBocmVmOiBzdWJJdGVtLmhyZWZcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAyXG4gICAgICApXG4gICAgfSlcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNDg2NzAyNjJcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTQ4NjcwMjYyXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhdGVnb3J5TGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDg1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIl0sInNvdXJjZVJvb3QiOiIifQ==