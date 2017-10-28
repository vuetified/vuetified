webpackJsonp([4],{

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

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(793)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(795)
/* template */
var __vue_template__ = __webpack_require__(796)
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

/***/ 652:
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

/***/ 653:
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
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(667)
/* template */
var __vue_template__ = __webpack_require__(668)
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
var update = __webpack_require__(653)("0b1532a7", content, false);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_theme__ = __webpack_require__(652);
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
        }
    },
    methods: {
        navigate: function navigate(href) {
            this.$router.push({ path: '' + href });
        }
    }
});

/***/ }),

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-list-tile",
    {
      nativeOn: {
        click: function($event) {
          _vm.navigate(_vm.href)
        }
      }
    },
    [
      _vm.icon
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
     require("vue-hot-reload-api").rerender("data-v-6b411eb6", module.exports)
  }
}

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
var update = __webpack_require__(653)("3297ebe2", content, false);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_theme__ = __webpack_require__(652);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VLink_vue__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_VLink_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_GroupLink_vue__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_GroupLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_GroupLink_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MemberLink__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MemberLink___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_MemberLink__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_theme__ = __webpack_require__(652);
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
    components: {
        VLink: __WEBPACK_IMPORTED_MODULE_0__components_VLink_vue___default.a,
        GroupLink: __WEBPACK_IMPORTED_MODULE_1__components_GroupLink_vue___default.a,
        MemberLink: __WEBPACK_IMPORTED_MODULE_2__components_MemberLink___default.a
    },
    mounted: function mounted() {
        var self = this;
        Bus.$on('toggleDrawer', function () {
            self.drawer = !self.drawer;
        });
        self.fetchProducts();
        self.fetchCategories();
        self.fetchNavLinks();
    },

    methods: {
        fetchProducts: function fetchProducts() {
            // On Click Will Show The Product Page
            this.members = [{ picture: 28, name: 'Asus' }, { picture: 38, name: 'Apple' }, { picture: 48, name: 'Xbox' }];
        },
        fetchCategories: function fetchCategories() {
            this.grouplinks = App.grouplinks;
        },
        fetchNavLinks: function fetchNavLinks() {
            this.links = App.menu;
        },
        isMenuActive: function isMenuActive(href) {
            var itemsegment = '';
            var segment = '';
            if (href !== undefined) {
                itemsegment = href.split('/')[1];
                segment = window.location.pathname.split('/')[1];
                return itemsegment === segment;
            }
        },
        loadview: function loadview(href, view) {
            if (!this.isMenuActive(href)) {
                this.$router.push({ path: '' + href });
                Bus.$emit('load-view', view);
            } else {
                Bus.$emit('load-view', view);
            }
        }
    }

});

/***/ }),

/***/ 677:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(678)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(680)
/* template */
var __vue_template__ = __webpack_require__(681)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-401804bf"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\GroupLink.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] GroupLink.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-401804bf", Component.options)
  } else {
    hotAPI.reload("data-v-401804bf", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(679);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("09548af8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-401804bf\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./GroupLink.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-401804bf\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./GroupLink.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n.styleAvatar[data-v-401804bf] {\n  position: relative;\n  margin-left: -55px;\n}\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/components/GroupLink.vue"],"names":[],"mappings":";AAAA;EACE,mBAAmB;EACnB,mBAAmB;CAAE","file":"GroupLink.vue","sourcesContent":[".styleAvatar {\n  position: relative;\n  margin-left: -55px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 680:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['items'],
    data: function data() {
        return {
            dark: App.theme.dark
        };
    },
    methods: {
        loadview: function loadview(item, component) {
            if (!this.isGroupActive(item)) {
                this.$router.push({ path: '' + item.href });
            }
            Bus.$emit('load-view', component);
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
                return itemsegment === segment;
            }
        },
        isActive: function isActive(subItem) {
            if (subItem.href !== undefined) {
                return subItem.href === window.location.pathname;
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

/***/ 681:
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
        { key: item.title, attrs: { value: _vm.isGroupActive(item) } },
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
              _c(
                "v-list-tile-content",
                [
                  _c(
                    "v-list-tile-title",
                    {
                      class: {
                        "blue-grey--text": !_vm.isDark,
                        "text--lighten-1": !_vm.isDark
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
            return _c(
              "v-list-tile",
              {
                key: subItem.title,
                class: [{ styleAvatar: _vm.hasAvatar(subItem) }],
                staticStyle: { cursor: "pointer" },
                attrs: { avatar: subItem.avatar ? "avatar" : "" },
                nativeOn: {
                  click: function($event) {
                    $event.stopPropagation()
                    _vm.loadview(item, subItem.component)
                  }
                }
              },
              [
                subItem.avatar
                  ? _c("v-avatar", [
                      _c("img", {
                        attrs: { src: _vm.loadAvatar(subItem.avatar), alt: "" }
                      })
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "v-list-tile-content",
                  [
                    !_vm.isDark
                      ? _c("v-list-tile-title", [
                          _c(
                            "span",
                            {
                              class: {
                                "teal--text": _vm.isActive(subItem),
                                "text--lighten-2": _vm.isActive(subItem),
                                "blue-grey--text": !_vm.isActive(subItem),
                                "text--lighten-1": !_vm.isActive(subItem)
                              }
                            },
                            [_vm._v(_vm._s(subItem.title))]
                          )
                        ])
                      : _c("v-list-tile-title", [
                          _c(
                            "span",
                            {
                              class: {
                                "teal--text": _vm.isActive(subItem),
                                "text--lighten-2": _vm.isActive(subItem),
                                "white--text": !_vm.isActive(subItem)
                              }
                            },
                            [_vm._v(_vm._s(subItem.title))]
                          )
                        ])
                  ],
                  1
                ),
                _vm._v(" "),
                subItem.avatar
                  ? _c(
                      "v-list-tile-action",
                      [
                        _c(
                          "v-icon",
                          {
                            class: {
                              "teal--text": _vm.isActive(subItem),
                              "text--lighten-2": _vm.isActive(subItem)
                            }
                          },
                          [_vm._v(_vm._s(subItem.action))]
                        )
                      ],
                      1
                    )
                  : _c(
                      "v-list-tile-action",
                      [
                        _c(
                          "v-icon",
                          {
                            class: {
                              "teal--text": _vm.isActive(subItem),
                              "text--lighten-2": _vm.isActive(subItem)
                            }
                          },
                          [_vm._v(_vm._s(subItem.action))]
                        )
                      ],
                      1
                    )
              ],
              1
            )
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
     require("vue-hot-reload-api").rerender("data-v-401804bf", module.exports)
  }
}

/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(683)
/* template */
var __vue_template__ = __webpack_require__(684)
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
Component.options.__file = "resources\\assets\\js\\components\\MemberLink.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MemberLink.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d91f8f04", Component.options)
  } else {
    hotAPI.reload("data-v-d91f8f04", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_theme__ = __webpack_require__(652);
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
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_theme__["a" /* default */]],
    props: {
        dark: {
            type: Boolean,
            default: function _default() {
                return false;
            }
        },
        avatar: {
            type: String,
            required: true
        },
        name: {
            type: String
        }
    }
});

/***/ }),

/***/ 684:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-list-tile",
    { staticStyle: { cursor: "pointer" }, attrs: { avatar: "" } },
    [
      _c("v-list-tile-avatar", [
        _c("img", { attrs: { src: _vm.avatar, alt: "" } })
      ]),
      _vm._v(" "),
      _c("v-list-tile-title", {
        class: {
          "blue-grey--text": !_vm.isDark,
          "text--lighten-1": !_vm.isDark,
          "white--text": _vm.isDark
        },
        domProps: { textContent: _vm._s(_vm.name) }
      })
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
     require("vue-hot-reload-api").rerender("data-v-d91f8f04", module.exports)
  }
}

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
              title: "Tutorial",
              href: "/courses",
              icon: "school"
            }
          }),
          _vm._v(" "),
          _c("group-link", {
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
            [_vm._v("Featured Product")]
          ),
          _vm._v(" "),
          _c(
            "v-list",
            _vm._l(_vm.members, function(member) {
              return _c("member-link", {
                key: member.text,
                attrs: {
                  dark: _vm.darkClass,
                  name: member.name,
                  avatar:
                    "https://randomuser.me/api/portraits/men/" +
                    member.picture +
                    ".jpg"
                }
              })
            })
          ),
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
            [_vm._v("Top 3 Best Seller")]
          ),
          _vm._v(" "),
          _c(
            "v-list",
            _vm._l(_vm.members, function(member) {
              return _c("member-link", {
                key: member.text,
                attrs: {
                  name: member.name,
                  avatar:
                    "https://randomuser.me/api/portraits/men/" +
                    member.picture +
                    ".jpg"
                }
              })
            })
          ),
          _vm._v(" "),
          _c("v-link", {
            attrs: {
              dark: _vm.darkClass,
              title: "Logout",
              href: "/logout",
              icon: "power_settings_new"
            }
          }),
          _vm._v(" "),
          _c("v-link", {
            attrs: {
              dark: _vm.darkClass,
              title: "Settings",
              href: "/",
              icon: "settings"
            }
          })
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

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(794);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("53e99156", content, false);
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

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n.application--dark .table[data-v-c5205e8c] {\n    background-color: #F5F5F5 !important;\n    color: #103050 !important;\n}\n.application--dark .input-group:not(.input-group--error) label[data-v-c5205e8c] {\n    /* color: rgba(255,255,255,0.7); */\n}\n\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/pages/Dashboard.vue?697fd58e"],"names":[],"mappings":";AAyLA;IACA,qCAAA;IACA,0BAAA;CACA;AACA;IACA,mCAAA;CACA","file":"Dashboard.vue","sourcesContent":["<template>\n  <main-layout  :style=\"{ paddingTop: `100px`, backgroundColor: `white` }\">\n    <v-container  fluid>\n      <v-layout row wrap>\n        <!-- make a card to display this -->\n        <v-flex xs12 md4 text-xs-center>\n            <h3 class=\"primary--text\">Orders: {{ total }}</h3>\n        </v-flex>\n        <v-flex xs12 md4 text-xs-center>\n            <h3 class=\"primary--text\">Unpaid: {{ unpaid }} </h3>\n        </v-flex>\n        <v-flex xs12 md4 text-xs-center>\n            <h3 class=\"primary--text\">Paid: {{ paid }}</h3>\n        </v-flex>\n        <v-flex xs12 md4 text-xs-center>\n            <h3 class=\"primary--text\">On-Hold: {{ unsent }} </h3>\n        </v-flex>\n        <v-flex xs12 md4 text-xs-center>\n            <h3 class=\"primary--text\">On-Delivery: {{ sent }}</h3>\n        </v-flex>\n        <v-flex xs12 md4 text-xs-center>\n            <h3 class=\"primary--text\">Received: {{ received }} </h3>\n        </v-flex>\n      </v-layout>\n\n      <v-container fluid>\n\n            <v-data-table\n                :headers=\"headers\"\n                :items=\"items\"\n                :light=\"true\"\n            >\n            <template slot=\"items\" scope=\"props\">\n                <td class=\"title text-xs-left primary--text\">{{ props.item.id }}</td>\n                <td class=\"title text-xs-left primary--text\">{{ totalAmount(props.item) | currency(currency) }}</td>\n                <td class=\"title text-xs-left primary--text\">{{ props.item.payment.paid ? 'Paid' : 'Unpaid' }}</td>\n                <td class=\"title text-xs-left primary--text\">{{ props.item.shipment.sent ? 'On-Delivery' : 'On-Hold' }}</td>\n                <td class=\"title text-xs-left primary--text\">{{ props.item.shipment.received ? 'Received' : 'Not Yet' }}</td>\n                <td class=\"title text-xs-center\">\n                    <v-dialog v-model=\"dialog\" fullscreen transition=\"dialog-bottom-transition\" :overlay=\"false\">\n                        <v-btn flat icon color=\"accent\" slot=\"activator\" @click.native=\"setCurrentOrder(props.item)\">\n                            <v-icon>fa-edit</v-icon>\n                        </v-btn>\n                        <v-card :light=\"true\">\n                        <v-toolbar  color=\"primary\">\n                            <v-btn icon @click.native=\"dialog = false\" dark>\n                            <v-icon>close</v-icon>\n                            </v-btn>\n                            <v-spacer></v-spacer>\n                            <v-toolbar-title>Update Order No. {{ current_order.id }}</v-toolbar-title>\n                            <v-spacer></v-spacer>\n                            <v-toolbar-items>\n                            <v-btn dark flat @click.native=\"dialog = false\">Save</v-btn>\n                            </v-toolbar-items>\n                        </v-toolbar>\n                        <v-container fluid>\n                            <v-layout row wrap>\n                            <!-- View Cart -->\n                            <v-flex xs12 text-xs-center>\n                                <h3 class=\"primary--text\">View Cart Details</h3>\n                            </v-flex>\n                            <!-- Customer Details -->\n                            <v-flex xs12 text-xs-center>\n                                <h3 class=\"primary--text\">View Customer Details</h3>\n                            </v-flex>\n                            <!-- Shipping Details -->\n                            <v-flex xs12 text-xs-center>\n                                <h3 class=\"primary--text\">View Shipping Details</h3>\n                            </v-flex>\n                            <!-- Mode Of Payment -->\n                            <v-flex xs12 text-xs-center>\n                                <h3 class=\"primary--text\">View Mode Of Payment</h3>\n                            </v-flex>\n                            <!-- Upload Receipt -->\n                            <v-flex xs12 text-xs-center>\n                                <h3 class=\"primary--text\">Upload Receipt</h3>\n                            </v-flex>\n                            <!-- Update Status -->\n                            <v-flex xs12 text-xs-center>\n                                <h3 class=\"primary--text\">Update Status</h3>\n                            </v-flex>\n                        </v-layout>\n                        </v-container>\n                        </v-card>\n                    </v-dialog>\n                </td>\n                <td class=\"title text-xs-left\">\n                    <v-switch v-if=\"hasRole('admin')\"\n                        v-model=\"props.item.done\"\n                        color=\"red\"\n                        :light=\"true\"\n                        :disabled=\"!hasRole('admin')\"\n                        >\n                    </v-switch>\n                    <v-btn v-else flat icon color=\"red lighten-2\">\n                    <v-icon v-if=\"props.item.done\">fa-check-square-o</v-icon>\n                    <v-icon v-else>fa-square-o</v-icon>\n                    </v-btn>\n                </td>\n\n            </template>\n\n            <template slot=\"pageText\" scope=\"{ pageStart, pageStop }\">\n                From {{ pageStart }} to {{ pageStop }}\n            </template>\n\n            </v-data-table>\n      </v-container>\n      <!-- Table to View All Orders -->\n      <!-- Modal To Load Each Order Details -->\n    </v-container>\n  </main-layout>\n</template>\n\n<script>\nimport MainLayout from '../layouts/Main.vue'\nimport Theme from '../mixins/theme'\nimport Acl from '../mixins/acl'\n\nexport default {\n    mixins: [Theme, Acl],\n    data: () => ({\n        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },\n        currency: '₱',\n        dialog: false,\n        /* panels */\n        total: 0,\n        paid: 0,\n        sent: 0,\n        received: 0,\n        done: 0,\n        /* table */\n        headers: [\n            /* remove sort and value since we cant access dot anotation in item */\n            { text: 'Order No.', value: 'id', align: 'left', sortable: true },\n            { text: 'Amount', align: 'left', sortable: false },\n            { text: 'Paid', align: 'left', sortable: false },\n            { text: 'Sent', align: 'left', sortable: false },\n            { text: 'Received', align: 'left', sortable: false },\n            { text: 'Update', align: 'center', sortable: false },\n            { text: 'Completed', align: 'left', sortable: false }\n        ],\n        items: [],\n        /* current updated item */\n        current_order: {}\n    }),\n    computed: {\n        unpaid () {\n            return this.total - this.paid\n        },\n        unsent () {\n            return this.total - this.sent\n        }\n    },\n    components: {\n        MainLayout\n    },\n    mounted () {\n        this.fetchPanelStats()\n    },\n    methods: {\n        setCurrentOrder (order) {\n            this.current_order = order\n        },\n        fetchPanelStats () {\n            let self = this\n            axios.get(route('api.panel.stats')).then((response) => {\n                self.items = response.data.orders\n                self.total = response.data.total\n                self.sent = response.data.sent\n                self.paid = response.data.paid\n                self.received = response.data.received\n                self.done = response.data.done\n            })\n        },\n        totalAmount (item) {\n            let cart = JSON.parse(item.cart)\n            let total = parseFloat(cart.total) + parseFloat(item.shipment.shipping_fee)\n            return total.toFixed(2)\n        }\n    }\n}\n</script>\n\n<style scoped>\n.application--dark .table {\n    background-color: #F5F5F5 !important;\n    color: #103050 !important;\n}\n.application--dark .input-group:not(.input-group--error) label {\n    /* color: rgba(255,255,255,0.7); */\n}\n\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_Main_vue__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_Main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__layouts_Main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_theme__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_acl__ = __webpack_require__(804);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_theme__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_acl__["a" /* default */]],
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
            { text: 'Order No.', value: 'id', align: 'left', sortable: true }, { text: 'Amount', align: 'left', sortable: false }, { text: 'Paid', align: 'left', sortable: false }, { text: 'Sent', align: 'left', sortable: false }, { text: 'Received', align: 'left', sortable: false }, { text: 'Update', align: 'center', sortable: false }, { text: 'Completed', align: 'left', sortable: false }],
            items: [],
            /* current updated item */
            current_order: {}
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
    components: {
        MainLayout: __WEBPACK_IMPORTED_MODULE_0__layouts_Main_vue___default.a
    },
    mounted: function mounted() {
        this.fetchPanelStats();
    },

    methods: {
        setCurrentOrder: function setCurrentOrder(order) {
            this.current_order = order;
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
            var total = parseFloat(cart.total) + parseFloat(item.shipment.shipping_fee);
            return total.toFixed(2);
        }
    }
});

/***/ }),

/***/ 796:
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
          _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c(
                "v-flex",
                { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
                [
                  _c("h3", { staticClass: "primary--text" }, [
                    _vm._v("Orders: " + _vm._s(_vm.total))
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
                [
                  _c("h3", { staticClass: "primary--text" }, [
                    _vm._v("Unpaid: " + _vm._s(_vm.unpaid) + " ")
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
                [
                  _c("h3", { staticClass: "primary--text" }, [
                    _vm._v("Paid: " + _vm._s(_vm.paid))
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
                [
                  _c("h3", { staticClass: "primary--text" }, [
                    _vm._v("On-Hold: " + _vm._s(_vm.unsent) + " ")
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
                [
                  _c("h3", { staticClass: "primary--text" }, [
                    _vm._v("On-Delivery: " + _vm._s(_vm.sent))
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "", md4: "", "text-xs-center": "" } },
                [
                  _c("h3", { staticClass: "primary--text" }, [
                    _vm._v("Received: " + _vm._s(_vm.received) + " ")
                  ])
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c("v-data-table", {
                attrs: { headers: _vm.headers, items: _vm.items, light: true },
                scopedSlots: _vm._u([
                  {
                    key: "items",
                    fn: function(props) {
                      return [
                        _c(
                          "td",
                          { staticClass: "title text-xs-left primary--text" },
                          [_vm._v(_vm._s(props.item.id))]
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
                            _vm._v(
                              _vm._s(
                                props.item.payment.paid ? "Paid" : "Unpaid"
                              )
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "title text-xs-left primary--text" },
                          [
                            _vm._v(
                              _vm._s(
                                props.item.shipment.sent
                                  ? "On-Delivery"
                                  : "On-Hold"
                              )
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "title text-xs-left primary--text" },
                          [
                            _vm._v(
                              _vm._s(
                                props.item.shipment.received
                                  ? "Received"
                                  : "Not Yet"
                              )
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "title text-xs-center" },
                          [
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
                                  "v-btn",
                                  {
                                    attrs: {
                                      slot: "activator",
                                      flat: "",
                                      icon: "",
                                      color: "accent"
                                    },
                                    nativeOn: {
                                      click: function($event) {
                                        _vm.setCurrentOrder(props.item)
                                      }
                                    },
                                    slot: "activator"
                                  },
                                  [_c("v-icon", [_vm._v("fa-edit")])],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-card",
                                  { attrs: { light: true } },
                                  [
                                    _c(
                                      "v-toolbar",
                                      { attrs: { color: "primary" } },
                                      [
                                        _c(
                                          "v-btn",
                                          {
                                            attrs: { icon: "", dark: "" },
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
                                        _c("v-toolbar-title", [
                                          _vm._v(
                                            "Update Order No. " +
                                              _vm._s(_vm.current_order.id)
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("v-spacer"),
                                        _vm._v(" "),
                                        _c(
                                          "v-toolbar-items",
                                          [
                                            _c(
                                              "v-btn",
                                              {
                                                attrs: { dark: "", flat: "" },
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
                                          "v-layout",
                                          { attrs: { row: "", wrap: "" } },
                                          [
                                            _c(
                                              "v-flex",
                                              {
                                                attrs: {
                                                  xs12: "",
                                                  "text-xs-center": ""
                                                }
                                              },
                                              [
                                                _c(
                                                  "h3",
                                                  {
                                                    staticClass: "primary--text"
                                                  },
                                                  [_vm._v("View Cart Details")]
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-flex",
                                              {
                                                attrs: {
                                                  xs12: "",
                                                  "text-xs-center": ""
                                                }
                                              },
                                              [
                                                _c(
                                                  "h3",
                                                  {
                                                    staticClass: "primary--text"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "View Customer Details"
                                                    )
                                                  ]
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-flex",
                                              {
                                                attrs: {
                                                  xs12: "",
                                                  "text-xs-center": ""
                                                }
                                              },
                                              [
                                                _c(
                                                  "h3",
                                                  {
                                                    staticClass: "primary--text"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "View Shipping Details"
                                                    )
                                                  ]
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-flex",
                                              {
                                                attrs: {
                                                  xs12: "",
                                                  "text-xs-center": ""
                                                }
                                              },
                                              [
                                                _c(
                                                  "h3",
                                                  {
                                                    staticClass: "primary--text"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "View Mode Of Payment"
                                                    )
                                                  ]
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-flex",
                                              {
                                                attrs: {
                                                  xs12: "",
                                                  "text-xs-center": ""
                                                }
                                              },
                                              [
                                                _c(
                                                  "h3",
                                                  {
                                                    staticClass: "primary--text"
                                                  },
                                                  [_vm._v("Upload Receipt")]
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-flex",
                                              {
                                                attrs: {
                                                  xs12: "",
                                                  "text-xs-center": ""
                                                }
                                              },
                                              [
                                                _c(
                                                  "h3",
                                                  {
                                                    staticClass: "primary--text"
                                                  },
                                                  [_vm._v("Update Status")]
                                                )
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
                          "td",
                          { staticClass: "title text-xs-left" },
                          [
                            _vm.hasRole("admin")
                              ? _c("v-switch", {
                                  attrs: {
                                    color: "red",
                                    light: true,
                                    disabled: !_vm.hasRole("admin")
                                  },
                                  model: {
                                    value: props.item.done,
                                    callback: function($$v) {
                                      props.item.done = $$v
                                    },
                                    expression: "props.item.done"
                                  }
                                })
                              : _c(
                                  "v-btn",
                                  {
                                    attrs: {
                                      flat: "",
                                      icon: "",
                                      color: "red lighten-2"
                                    }
                                  },
                                  [
                                    props.item.done
                                      ? _c("v-icon", [
                                          _vm._v("fa-check-square-o")
                                        ])
                                      : _c("v-icon", [_vm._v("fa-square-o")])
                                  ],
                                  1
                                )
                          ],
                          1
                        )
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

/***/ }),

/***/ 804:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    methods: {
        hasRole: function hasRole(payload) {
            var me = this.$store.getters['auth/getMe'];
            return me.roles.includes(function (r) {
                return r === payload;
            });
        },
        hasPermission: function hasPermission(permission) {
            var me = this.$store.getters['auth/getMe'];
            return me.permissions.includes(function (p) {
                return p === permission;
            });
        },
        hasAnyPermission: function hasAnyPermission(permissions) {
            var me = this.$store.getters['auth/getMe'];
            return permissions.some(function (p) {
                return me.permissions.includes(p);
            });
        },
        hasAnyRole: function hasAnyRole(roles) {
            var me = this.$store.getters['auth/getMe'];
            return roles.some(function (r) {
                return me.roles.includes(r);
            });
        },
        hasAllRoles: function hasAllRoles(roles) {
            var me = this.$store.getters['auth/getMe'];
            return _.difference(roles, me.roles).length === 0;
        },
        hasAllPermissions: function hasAllPermissions(permissions) {
            var me = this.$store.getters['auth/getMe'];
            return _.difference(permissions, me.permissions).length === 0;
        }
    }
});

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9EYXNoYm9hcmQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbWl4aW5zL3RoZW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9sYXlvdXRzL01haW4udnVlIiwid2VicGFjazovLy9NYWluLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcEZvb3Rlci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlP2M0ZDYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlP2VjZjEiLCJ3ZWJwYWNrOi8vL0FwcEZvb3Rlci52dWUiLCJ3ZWJwYWNrOi8vL1ZMaW5rLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlP2Q5MWIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlPzYxMTIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBOYXZCYXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT83ZTJiIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT8xNDQxIiwid2VicGFjazovLy9BcHBOYXZCYXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT83MDhmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlIiwid2VicGFjazovLy9MZWZ0U2lkZUJhci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0dyb3VwTGluay52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0dyb3VwTGluay52dWU/MjBmOSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvR3JvdXBMaW5rLnZ1ZT83MTIzIiwid2VicGFjazovLy9Hcm91cExpbmsudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9Hcm91cExpbmsudnVlP2E2NDIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL01lbWJlckxpbmsudnVlIiwid2VicGFjazovLy9NZW1iZXJMaW5rLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvTWVtYmVyTGluay52dWU/ZDJkNiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0xlZnRTaWRlQmFyLnZ1ZT8yODUwIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9GYWJCdXR0b24udnVlIiwid2VicGFjazovLy9GYWJCdXR0b24udnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9GYWJCdXR0b24udnVlPzYwNTYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9Db29raWVMYXcudnVlIiwid2VicGFjazovLy9Db29raWVMYXcudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtY29va2llLWxhdy9kaXN0L3Z1ZS1jb29raWUtbGF3LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQ29va2llTGF3LnZ1ZT80Y2Y0Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9NYWluLnZ1ZT85N2MxIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZT8yNTc4Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZT8yYTY5Iiwid2VicGFjazovLy9EYXNoYm9hcmQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZT82NWZlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbWl4aW5zL2FjbC5qcyJdLCJuYW1lcyI6WyJkYXRhIiwiZGFya0NsYXNzIiwiQXBwIiwidGhlbWUiLCJkYXJrIiwicHJpbWFyeUNsYXNzIiwicHJpbWFyeSIsImFjY2VudENsYXNzIiwiYWNjZW50Iiwic2Vjb25kYXJ5Q2xhc3MiLCJzZWNvbmRhcnkiLCJpbmZvQ2xhc3MiLCJpbmZvIiwid2FybmluZ0NsYXNzIiwid2FybmluZyIsImVycm9yQ2xhc3MiLCJlcnJvciIsInN1Y2Nlc3NDbGFzcyIsInN1Y2Nlc3MiLCJ0b2dnbGVCYXJTdHlsZSIsInNpdGUiLCJ0aXRsZVN0eWxlIiwibmF2YmFyU3R5bGUiLCJmb290ZXJTdHlsZSIsInNpZGViYXJTdHlsZSIsImRvbWFpbiIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0cmFkZW1hcmsiLCJsb2dvIiwidXJsIiwibG9nb1N0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJzaG93TG9nbyIsInNob3ciLCJzaG93SWNvbiIsImljb24iLCJuYW1lIiwiaWNvbkNvbG9yIiwiY29sb3IiLCJ0aXRsZSIsImNvbXB1dGVkIiwiaXNEYXJrIiwibWV0aG9kcyIsImhhc1JvbGUiLCJwYXlsb2FkIiwibWUiLCIkc3RvcmUiLCJnZXR0ZXJzIiwicm9sZXMiLCJpbmNsdWRlcyIsInIiLCJoYXNQZXJtaXNzaW9uIiwicGVybWlzc2lvbiIsInBlcm1pc3Npb25zIiwicCIsImhhc0FueVBlcm1pc3Npb24iLCJzb21lIiwiaGFzQW55Um9sZSIsImhhc0FsbFJvbGVzIiwiXyIsImRpZmZlcmVuY2UiLCJsZW5ndGgiLCJoYXNBbGxQZXJtaXNzaW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdCQUFnQjtBQUNuRCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JB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QixFQUFFO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLDBDQUEwQyxFQUFFO0FBQ3RFO0FBQ0EsNEJBQTRCLCtCQUErQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLDBDQUEwQyxFQUFFO0FBQ3RFO0FBQ0EsNEJBQTRCLCtCQUErQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLDBDQUEwQyxFQUFFO0FBQ3RFO0FBQ0EsNEJBQTRCLCtCQUErQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLDBDQUEwQyxFQUFFO0FBQ3RFO0FBQ0EsNEJBQTRCLCtCQUErQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLDBDQUEwQyxFQUFFO0FBQ3RFO0FBQ0EsNEJBQTRCLCtCQUErQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLDBDQUEwQyxFQUFFO0FBQ3RFO0FBQ0EsNEJBQTRCLCtCQUErQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxZQUFZLEVBQUU7QUFDcEM7QUFDQTtBQUNBLHdCQUF3QixzREFBc0Q7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0RBQWtEO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0RBQWtEO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0RBQWtEO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0RBQWtEO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtEQUFrRDtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixzQ0FBc0M7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsU0FBUyxjQUFjLEVBQUU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFNBQVMsbUJBQW1CLEVBQUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QscUJBQXFCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELHFCQUFxQjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsU0FBUyxZQUFZLEVBQUU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFNBQVMsb0JBQW9CLEVBQUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG9DQUFvQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7QUMzZEEseURBQWU7QUFDWDRDLGFBQVM7QUFDTEMsZUFESyxtQkFDSUMsT0FESixFQUNhO0FBQ2QsZ0JBQUlDLEtBQUssS0FBS0MsTUFBTCxDQUFZQyxPQUFaLENBQW9CLFlBQXBCLENBQVQ7QUFDQSxtQkFBT0YsR0FBR0csS0FBSCxDQUFTQyxRQUFULENBQWtCO0FBQUEsdUJBQUtDLE1BQU1OLE9BQVg7QUFBQSxhQUFsQixDQUFQO0FBQ0gsU0FKSTtBQUtMTyxxQkFMSyx5QkFLVUMsVUFMVixFQUtzQjtBQUN2QixnQkFBSVAsS0FBSyxLQUFLQyxNQUFMLENBQVlDLE9BQVosQ0FBb0IsWUFBcEIsQ0FBVDtBQUNBLG1CQUFPRixHQUFHUSxXQUFILENBQWVKLFFBQWYsQ0FBd0I7QUFBQSx1QkFBS0ssTUFBTUYsVUFBWDtBQUFBLGFBQXhCLENBQVA7QUFDSCxTQVJJO0FBU0xHLHdCQVRLLDRCQVNhRixXQVRiLEVBUzBCO0FBQzNCLGdCQUFJUixLQUFLLEtBQUtDLE1BQUwsQ0FBWUMsT0FBWixDQUFvQixZQUFwQixDQUFUO0FBQ0EsbUJBQU9NLFlBQVlHLElBQVosQ0FBaUI7QUFBQSx1QkFBS1gsR0FBR1EsV0FBSCxDQUFlSixRQUFmLENBQXdCSyxDQUF4QixDQUFMO0FBQUEsYUFBakIsQ0FBUDtBQUNILFNBWkk7QUFhTEcsa0JBYkssc0JBYU9ULEtBYlAsRUFhYztBQUNmLGdCQUFJSCxLQUFLLEtBQUtDLE1BQUwsQ0FBWUMsT0FBWixDQUFvQixZQUFwQixDQUFUO0FBQ0EsbUJBQU9DLE1BQU1RLElBQU4sQ0FBVztBQUFBLHVCQUFLWCxHQUFHRyxLQUFILENBQVNDLFFBQVQsQ0FBa0JDLENBQWxCLENBQUw7QUFBQSxhQUFYLENBQVA7QUFDSCxTQWhCSTtBQWlCTFEsbUJBakJLLHVCQWlCUVYsS0FqQlIsRUFpQmU7QUFDaEIsZ0JBQUlILEtBQUssS0FBS0MsTUFBTCxDQUFZQyxPQUFaLENBQW9CLFlBQXBCLENBQVQ7QUFDQSxtQkFBT1ksRUFBRUMsVUFBRixDQUFhWixLQUFiLEVBQW9CSCxHQUFHRyxLQUF2QixFQUE4QmEsTUFBOUIsS0FBeUMsQ0FBaEQ7QUFDSCxTQXBCSTtBQXFCTEMseUJBckJLLDZCQXFCY1QsV0FyQmQsRUFxQjJCO0FBQzVCLGdCQUFJUixLQUFLLEtBQUtDLE1BQUwsQ0FBWUMsT0FBWixDQUFvQixZQUFwQixDQUFUO0FBQ0EsbUJBQU9ZLEVBQUVDLFVBQUYsQ0FBYVAsV0FBYixFQUEwQlIsR0FBR1EsV0FBN0IsRUFBMENRLE1BQTFDLEtBQXFELENBQTVEO0FBQ0g7QUF4Qkk7QUFERSxDQUFmLEUiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDE2IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1jNTIwNWU4Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Rhc2hib2FyZC52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vRGFzaGJvYXJkLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYzUyMDVlOGNcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9EYXNoYm9hcmQudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtYzUyMDVlOGNcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFnZXNcXFxcRGFzaGJvYXJkLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gRGFzaGJvYXJkLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1jNTIwNWU4Y1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWM1MjA1ZThjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0Rhc2hib2FyZC52dWVcbi8vIG1vZHVsZSBpZCA9IDY1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvKipcbiAqIEV4cG9ydCB0aGUgQW55IENvbXBvbmVudFxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZGFya0NsYXNzOiBBcHAudGhlbWUuZGFyayxcbiAgICAgICAgcHJpbWFyeUNsYXNzOiBBcHAudGhlbWUucHJpbWFyeSxcbiAgICAgICAgYWNjZW50Q2xhc3M6IEFwcC50aGVtZS5hY2NlbnQsXG4gICAgICAgIHNlY29uZGFyeUNsYXNzOiBBcHAudGhlbWUuc2Vjb25kYXJ5LFxuICAgICAgICBpbmZvQ2xhc3M6IEFwcC50aGVtZS5pbmZvLFxuICAgICAgICB3YXJuaW5nQ2xhc3M6IEFwcC50aGVtZS53YXJuaW5nLFxuICAgICAgICBlcnJvckNsYXNzOiBBcHAudGhlbWUuZXJyb3IsXG4gICAgICAgIHN1Y2Nlc3NDbGFzczogQXBwLnRoZW1lLnN1Y2Nlc3MsXG4gICAgICAgIHRvZ2dsZUJhclN0eWxlOiBBcHAuc2l0ZS50b2dnbGVCYXJTdHlsZSxcbiAgICAgICAgdGl0bGVTdHlsZTogQXBwLnNpdGUudGl0bGVTdHlsZSxcbiAgICAgICAgbmF2YmFyU3R5bGU6IEFwcC5zaXRlLm5hdmJhclN0eWxlLFxuICAgICAgICBmb290ZXJTdHlsZTogQXBwLnNpdGUuZm9vdGVyU3R5bGUsXG4gICAgICAgIHNpZGViYXJTdHlsZTogQXBwLnNpdGUuc2lkZWJhclN0eWxlLFxuICAgICAgICBkb21haW46IEFwcC5zaXRlLmRvbWFpbixcbiAgICAgICAgeWVhcjogKG5ldyBEYXRlKCkpLmdldEZ1bGxZZWFyKCksXG4gICAgICAgIHRyYWRlbWFyazogQXBwLnNpdGUudHJhZGVtYXJrLFxuICAgICAgICBsb2dvOiBBcHAuc2l0ZS5sb2dvLnVybCxcbiAgICAgICAgbG9nb1N0eWxlOiB7XG4gICAgICAgICAgICB3aWR0aDogQXBwLnNpdGUubG9nby53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogQXBwLnNpdGUubG9nby5oZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd0xvZ286IEFwcC5zaXRlLmxvZ28uc2hvdyxcbiAgICAgICAgc2hvd0ljb246IEFwcC5zaXRlLmljb24uc2hvdyxcbiAgICAgICAgaWNvbjogQXBwLnNpdGUuaWNvbi5uYW1lID8gQXBwLnNpdGUuaWNvbi5uYW1lIDogbnVsbCxcbiAgICAgICAgaWNvbkNvbG9yOiBBcHAuc2l0ZS5pY29uLmNvbG9yLFxuICAgICAgICB0aXRsZTogQXBwLnNpdGUudHJhZGVtYXJrXG4gICAgfSksXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgaXNEYXJrICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhcmtDbGFzcyA9PT0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21peGlucy90aGVtZS5qcyIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2NTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDE2IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiKTtcblxudmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2Fzc2lnbjIuZGVmYXVsdCB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanNcbi8vIG1vZHVsZSBpZCA9IDY1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTciLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE3IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE3IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE3IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1ZMaW5rLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmI0MTFlYjZcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vVkxpbmsudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXFZMaW5rLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gVkxpbmsudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTZiNDExZWI2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNmI0MTFlYjZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9WTGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDE2IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vTWFpbi52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LWU4ZjE0YWM0XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL01haW4udnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxsYXlvdXRzXFxcXE1haW4udnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBNYWluLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1lOGYxNGFjNFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWU4ZjE0YWM0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTWFpbi52dWVcbi8vIG1vZHVsZSBpZCA9IDY2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiPHRlbXBsYXRlPlxuIDx2LWFwcCA6ZGFyaz1cIkFwcC50aGVtZS5kYXJrXCIgIHN0YW5kYWxvbmUgdi1jbG9haz5cbiAgICA8bGVmdC1zaWRlLWJhcj48L2xlZnQtc2lkZS1iYXI+XG4gICAgPGFwcC1uYXYtYmFyPjwvYXBwLW5hdi1iYXI+XG4gICAgPG1haW4+XG4gICAgPCEtLSBhZGRlZCBmbHVpZCBhbmQgcGEtMCBtYS0wIGZvciBmdWxsIHNjcmVlbiBwYWdlcyAtLT5cbiAgICAgIDx2LWNvbnRhaW5lciB0cmFuc2l0aW9uPVwic2xpZGUteC10cmFuc2l0aW9uXCIgZmx1aWQgY2xhc3M9XCJwYS0wIG1hLTBcIj5cbiAgICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgICA8L3YtY29udGFpbmVyPlxuICAgIDwvbWFpbj5cbiAgICA8IS0tIDxzaG9wcGluZy1jYXJ0Pjwvc2hvcHBpbmctY2FydD4gLS0+XG4gICAgPGZhYi1idXR0b24+PC9mYWItYnV0dG9uPlxuICAgIDxjb29raWUtbGF3PjwvY29va2llLWxhdz5cbiAgICA8YXBwLWZvb3Rlcj48L2FwcC1mb290ZXI+XG4gIDwvdi1hcHA+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFwcEZvb3RlciBmcm9tICcuLi9wYXJ0aWFscy9BcHBGb290ZXIudnVlJ1xuaW1wb3J0IEFwcE5hdkJhciBmcm9tICcuLi9wYXJ0aWFscy9BcHBOYXZCYXIudnVlJ1xuaW1wb3J0IExlZnRTaWRlQmFyIGZyb20gJy4uL3BhcnRpYWxzL0xlZnRTaWRlQmFyLnZ1ZSdcbmltcG9ydCBGYWJCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9GYWJCdXR0b24udnVlJ1xuaW1wb3J0IENvb2tpZUxhdyBmcm9tICcuLi9wYXJ0aWFscy9Db29raWVMYXcudnVlJ1xuLy8gaW1wb3J0IFNob3BwaW5nQ2FydCBmcm9tICcuLi9wYXJ0aWFscy9TaG9wcGluZ0NhcnQudnVlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBBcHBGb290ZXIsXG4gICAgICAgIEFwcE5hdkJhcixcbiAgICAgICAgTGVmdFNpZGVCYXIsXG4gICAgICAgIEZhYkJ1dHRvbixcbiAgICAgICAgQ29va2llTGF3XG4gICAgICAgIC8vIFNob3BwaW5nQ2FydFxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIE1haW4udnVlP2ZkMzVlZTMwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05MTdhZTAwNFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBGb290ZXIudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0FwcEZvb3Rlci52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTkxN2FlMDA0XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0FwcEZvb3Rlci52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxwYXJ0aWFsc1xcXFxBcHBGb290ZXIudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBBcHBGb290ZXIudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTkxN2FlMDA0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtOTE3YWUwMDRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTE3YWUwMDRcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwRm9vdGVyLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMGIxNTMyYTdcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTE3YWUwMDRcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwRm9vdGVyLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05MTdhZTAwNFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBGb290ZXIudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTkxN2FlMDA0XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcEZvb3Rlci52dWVcbi8vIG1vZHVsZSBpZCA9IDY2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJBcHBGb290ZXIudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtOTE3YWUwMDRcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCI8dGVtcGxhdGU+XG48di1mb290ZXIgOmNsYXNzPVwiW2Zvb3RlckNsYXNzXVwiPlxuPHYtc3BhY2VyPjwvdi1zcGFjZXI+PHNwYW4+wqkge3sgeWVhciB9fSB7eyBkb21haW4gfX0gwq4gfCB7eyB0cmFkZW1hcmsgfX3ihKI8L3NwYW4+PHYtc3BhY2VyPjwvdi1zcGFjZXI+XG48L3YtZm9vdGVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBUaGVtZSBmcm9tICcuLi9taXhpbnMvdGhlbWUnXG5pbXBvcnQgVkxpbmsgZnJvbSAnLi4vY29tcG9uZW50cy9WTGluay52dWUnXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWl4aW5zOiBbVGhlbWVdLFxuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGZvb3RlckNsYXNzOiB7J3ByaW1hcnktLXRleHQnOiB0cnVlfVxuICAgIH0pLFxuICAgIGNyZWF0ZWQgKCkge1xuICAgICAgICAvKiBFbWl0IE9uIGEgQ2hpbGQgQ29tcG9uZW50IElmIFlvdSBXYW50IFRoaXMgVG8gQmUgVmlzaWJsZSAqL1xuICAgICAgICBCdXMuJG9uKCdmb290ZXItY29udGVudC12aXNpYmxlJywgKHZpc2liaWxpdHkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpc2libGUgPSB2aXNpYmlsaXR5XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIFZMaW5rXG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBBcHBGb290ZXIudnVlPzUyY2QyODEwIiwiPHRlbXBsYXRlPlxuICAgIDx2LWxpc3QtdGlsZSAgQGNsaWNrLm5hdGl2ZT1cIm5hdmlnYXRlKGhyZWYpXCI+XG4gICAgICAgICAgPHYtbGlzdC10aWxlLWFjdGlvbiB2LWlmPVwiaWNvblwiPlxuICAgICAgICAgICAgPHYtaWNvbiA6c3R5bGU9XCJ7Y29sb3I6IGlzQWN0aXZlID8gYWN0aXZlQ29sb3IgOiBpY29uQ29sb3IsIGN1cnNvcjogaHJlZiA/ICdwb2ludGVyJyA6ICcnfVwiPnt7IGljb24gfX08L3YtaWNvbj5cbiAgICAgICAgICA8L3YtbGlzdC10aWxlLWFjdGlvbj5cbiAgICAgICAgICA8di1saXN0LXRpbGUtY29udGVudD5cbiAgICAgICAgICAgIDx2LWxpc3QtdGlsZS10aXRsZSAgOnN0eWxlPVwie2NvbG9yOiBpc0FjdGl2ZSA/IGFjdGl2ZUNvbG9yIDogbGlua0NvbG9yfVwiPlxuICAgICAgICAgICAgICA8c3BhbiA6c3R5bGU9XCJ7Y3Vyc29yOiBocmVmID8gJ3BvaW50ZXInIDogJyd9XCI+e3sgdGl0bGUgIH19PC9zcGFuPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS10aXRsZT5cbiAgICAgICAgICA8L3YtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgPC92LWxpc3QtdGlsZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IHtcbiAgICAgICAgZGFyazoge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBBcHAudGhlbWUuZGFya1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBocmVmOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgICB9LFxuICAgICAgICBpY29uOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbkNvbG9yOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXJrID8gJyNmYWZhZmEnIDogJyM3ODkwOUMnIC8vIHdoaXRlIG9yIGJsdWUtZ3JleSBsaWdodGVuLTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbGlua0NvbG9yOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXJrID8gJyNmYWZhZmEnIDogJyM3ODkwOUMnIC8vIHdoaXRlIG9yIGJsdWUtZ3JleSBsaWdodGVuLTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWN0aXZlQ29sb3I6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnIzRkYjZhYycgLy8gdGVhbCBsaWdodGVuIDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgaXNBY3RpdmUgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHJlZiA9PT0gdGhpcy4kcm91dGUucGF0aFxuICAgICAgICB9LFxuICAgICAgICBpc0RhcmsgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGFyayA9PT0gdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIG5hdmlnYXRlIChocmVmKSB7XG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7IHBhdGg6IGAke2hyZWZ9YCB9KVxuICAgICAgICB9XG5cbiAgICB9XG59XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBWTGluay52dWU/MmJjOTM5OGUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1saXN0LXRpbGVcIixcbiAgICB7XG4gICAgICBuYXRpdmVPbjoge1xuICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgX3ZtLm5hdmlnYXRlKF92bS5ocmVmKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfdm0uaWNvblxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS1hY3Rpb25cIixcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLmlzQWN0aXZlID8gX3ZtLmFjdGl2ZUNvbG9yIDogX3ZtLmljb25Db2xvcixcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBfdm0uaHJlZiA/IFwicG9pbnRlclwiIDogXCJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmljb24pKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1saXN0LXRpbGUtY29udGVudFwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGlzdC10aWxlLXRpdGxlXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0eWxlOiB7IGNvbG9yOiBfdm0uaXNBY3RpdmUgPyBfdm0uYWN0aXZlQ29sb3IgOiBfdm0ubGlua0NvbG9yIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0eWxlOiB7IGN1cnNvcjogX3ZtLmhyZWYgPyBcInBvaW50ZXJcIiA6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0udGl0bGUpKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi02YjQxMWViNlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNmI0MTFlYjZcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlXG4vLyBtb2R1bGUgaWQgPSA2Njhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWZvb3RlclwiLFxuICAgIHsgY2xhc3M6IFtfdm0uZm9vdGVyQ2xhc3NdIH0sXG4gICAgW1xuICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgIF92bS5fdihcbiAgICAgICAgICBcIsKpIFwiICtcbiAgICAgICAgICAgIF92bS5fcyhfdm0ueWVhcikgK1xuICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgX3ZtLl9zKF92bS5kb21haW4pICtcbiAgICAgICAgICAgIFwiIMKuIHwgXCIgK1xuICAgICAgICAgICAgX3ZtLl9zKF92bS50cmFkZW1hcmspICtcbiAgICAgICAgICAgIFwi4oSiXCJcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICBfYyhcInYtc3BhY2VyXCIpXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTkxN2FlMDA0XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi05MTdhZTAwNFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LThkYTU2ODVhXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcE5hdkJhci52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQXBwTmF2QmFyLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOGRhNTY4NWFcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQXBwTmF2QmFyLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHBhcnRpYWxzXFxcXEFwcE5hdkJhci52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIEFwcE5hdkJhci52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtOGRhNTY4NWFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi04ZGE1Njg1YVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBOYXZCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi04ZGE1Njg1YVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBOYXZCYXIudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIzMjk3ZWJlMlwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi04ZGE1Njg1YVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBOYXZCYXIudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LThkYTU2ODVhXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcE5hdkJhci52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtOGRhNTY4NWFcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIkFwcE5hdkJhci52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi04ZGE1Njg1YVwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBOYXZCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsIjx0ZW1wbGF0ZT5cbiAgPHYtdG9vbGJhciA6c3R5bGU9XCJuYXZiYXJTdHlsZVwiIDpkYXJrPVwiIWlzRGFya1wiIGZpeGVkPlxuICAgIDx2LXRvb2xiYXItc2lkZS1pY29uIDpzdHlsZT1cInRvZ2dsZUJhclN0eWxlXCIgQGNsaWNrLm5hdGl2ZS5zdG9wPVwidG9nZ2xlRHJhd2VyKClcIj48L3YtdG9vbGJhci1zaWRlLWljb24+XG4gICAgICAgIDwhLS0gVGl0bGUgLS0+XG4gICAgICAgIDx2LXRvb2xiYXItdGl0bGUgdi1pZj1cImV4dGVuc2lvblwiIGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIiBzbG90PVwiZXh0ZW5zaW9uXCI+XG4gICAgICAgICAgICA8di1pY29uIDpzdHlsZT1cIntjb2xvcjogaWNvbkNvbG9yIH1cIiBjbGFzcz1cIm1sLTMgaGlkZGVuLW1kLWFuZC1kb3duXCIgdi1pZj1cInNob3dJY29uXCI+e3sgaWNvbiB9fTwvdi1pY29uPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWRkZW4tbWQtYW5kLWRvd25cIiA6c3R5bGU9XCJ0aXRsZVN0eWxlXCI+e3sgdGl0bGUgfX08L3NwYW4+XG4gICAgICAgIDwvdi10b29sYmFyLXRpdGxlPlxuICAgICAgICA8di10b29sYmFyLXRpdGxlIHYtZWxzZSBjbGFzcz1cInRleHQteHMtY2VudGVyXCI+XG4gICAgICAgICAgICA8di1pY29uIDpzdHlsZT1cIntjb2xvcjogaWNvbkNvbG9yIH1cIiBjbGFzcz1cIm1sLTMgaGlkZGVuLW1kLWFuZC1kb3duXCIgdi1pZj1cInNob3dJY29uXCI+e3sgaWNvbiB9fTwvdi1pY29uPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWRkZW4tbWQtYW5kLWRvd25cIiA6c3R5bGU9XCJ0aXRsZVN0eWxlXCI+e3sgdGl0bGUgfX08L3NwYW4+XG4gICAgICAgIDwvdi10b29sYmFyLXRpdGxlPlxuICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgPCEtLSBjZW50ZXIgbG9nbyAtLT5cbiAgICAgICAgPGltZyB2LWlmPVwic2hvd0xvZ29cIiAgIDpzcmM9XCJsb2dvXCIgOnN0eWxlPVwiW2xvZ29TdHlsZV1cIiAgYWx0PVwidnVlanNcIj5cbiAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgICAgIDwhLS0gQWRkIEhlcmUgQWxsIFlvdXIgTmF2IEljb25zIC0tPlxuXG4gICAgICAgIDx2LXRvb2x0aXAgbGVmdD5cbiAgICAgICAgPHYtYnRuIGZsYXQgaWNvbiBjb2xvcj1cImVycm9yXCIgc2xvdD1cImFjdGl2YXRvclwiIEBjbGljaz1cImVtcHR5Q2FydCgpXCIgdi1pZj1cImNvdW50ID4gMFwiPlxuICAgICAgICA8di1pY29uPnJlbW92ZV9zaG9wcGluZ19jYXJ0PC92LWljb24+XG4gICAgICAgIDwvdi1idG4+XG4gICAgICAgIDxzcGFuPkVtcHR5IHwgQ2FydDwvc3Bhbj5cbiAgICAgICAgPC92LXRvb2x0aXA+XG4gICAgICAgIDx2LXRvb2x0aXAgbGVmdD5cbiAgICAgICAgPHYtYnRuIGZsYXQgaWNvbiBjb2xvcj1cInByaW1hcnlcIiBzbG90PVwiYWN0aXZhdG9yXCIgQGNsaWNrPVwib3BlbkNhcnQoKVwiPlxuICAgICAgICA8di1iYWRnZSBsZWZ0PlxuICAgICAgICA8c3BhbiBzbG90PVwiYmFkZ2VcIj57eyBjb3VudCB9fTwvc3Bhbj5cbiAgICAgICAgPHYtaWNvbj5zaG9wcGluZ19jYXJ0PC92LWljb24+XG4gICAgICAgIDwvdi1iYWRnZT5cbiAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgPHNwYW4+VmlldyB8IENhcnQ8L3NwYW4+XG4gICAgICAgIDwvdi10b29sdGlwPlxuPC92LXRvb2xiYXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcbmltcG9ydCB7IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH0gZnJvbSAndnVleCdcbmNvbnN0IHsgbWFwU3RhdGUsIG1hcEFjdGlvbnMgfSA9IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzKCdjYXJ0JylcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG1peGluczogW1RoZW1lXSxcbiAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICBleHRlbnNpb246IGZhbHNlLFxuICAgICAgICBjb3VudDogMFxuICAgIH0pLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcFN0YXRlKHtcbiAgICAgICAgICAgIGdldENvdW50OiAnY291bnQnXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBjcmVhdGVkICgpIHtcbiAgICAgICAgLyogRW1pdCBPbiBhIENoaWxkIENvbXBvbmVudCBJZiBZb3UgV2FudCBUaGlzIFRvIEJlIFZpc2libGUgKi9cbiAgICAgICAgQnVzLiRvbignaGVhZGVyLWV4dGVuc2lvbi12aXNpYmxlJywgKHZpc2liaWxpdHkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uID0gdmlzaWJpbGl0eVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgbW91bnRlZCAoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICBzZWxmLmNvdW50ID0gc2VsZi5nZXRDb3VudFxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICAuLi5tYXBBY3Rpb25zKHtcbiAgICAgICAgICAgIGRlc3Ryb3lDYXJ0OiAnZGVzdHJveUNhcnQnXG4gICAgICAgIH0pLFxuICAgICAgICAvKiBVc2UgVnVldGlmeSBNb2RhbCAqL1xuICAgICAgICBvcGVuU2hvcHBpbmdDYXJ0ICgpIHtcbiAgICAgICAgICAgIEJ1cy4kZW1pdCgnc2hvcHBpbmctY2FydC1vcGVuJylcbiAgICAgICAgfSxcbiAgICAgICAgZW1wdHlDYXJ0ICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5kZXN0cm95Q2FydCgpXG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZURyYXdlciAoKSB7XG4gICAgICAgICAgICBCdXMuJGVtaXQoJ3RvZ2dsZURyYXdlcicpXG4gICAgICAgIH0sXG4gICAgICAgIC8qIFVzZXMgQ2FydCBSb3V0ZSAqL1xuICAgICAgICBvcGVuQ2FydCAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHsgbmFtZTogJ2NhcnQnIH0pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICAgIGdldENvdW50IChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLmNvdW50ID0gbmV3VmFsdWVcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQXBwTmF2QmFyLnZ1ZT8xNTBkMGZiMiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LXRvb2xiYXJcIixcbiAgICB7IHN0eWxlOiBfdm0ubmF2YmFyU3R5bGUsIGF0dHJzOiB7IGRhcms6ICFfdm0uaXNEYXJrLCBmaXhlZDogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXCJ2LXRvb2xiYXItc2lkZS1pY29uXCIsIHtcbiAgICAgICAgc3R5bGU6IF92bS50b2dnbGVCYXJTdHlsZSxcbiAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIF92bS50b2dnbGVEcmF3ZXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmV4dGVuc2lvblxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LXRvb2xiYXItdGl0bGVcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1jZW50ZXJcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgc2xvdDogXCJleHRlbnNpb25cIiB9LFxuICAgICAgICAgICAgICBzbG90OiBcImV4dGVuc2lvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0uc2hvd0ljb25cbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWwtMyBoaWRkZW4tbWQtYW5kLWRvd25cIixcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogX3ZtLmljb25Db2xvciB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5pY29uKSldXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJoaWRkZW4tbWQtYW5kLWRvd25cIiwgc3R5bGU6IF92bS50aXRsZVN0eWxlIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnRpdGxlKSldXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF9jKFxuICAgICAgICAgICAgXCJ2LXRvb2xiYXItdGl0bGVcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1jZW50ZXJcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0uc2hvd0ljb25cbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWwtMyBoaWRkZW4tbWQtYW5kLWRvd25cIixcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogX3ZtLmljb25Db2xvciB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5pY29uKSldXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJoaWRkZW4tbWQtYW5kLWRvd25cIiwgc3R5bGU6IF92bS50aXRsZVN0eWxlIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnRpdGxlKSldXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5zaG93TG9nb1xuICAgICAgICA/IF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgIHN0eWxlOiBbX3ZtLmxvZ29TdHlsZV0sXG4gICAgICAgICAgICBhdHRyczogeyBzcmM6IF92bS5sb2dvLCBhbHQ6IFwidnVlanNcIiB9XG4gICAgICAgICAgfSlcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtdG9vbHRpcFwiLFxuICAgICAgICB7IGF0dHJzOiB7IGxlZnQ6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLmNvdW50ID4gMFxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZXJyb3JcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uZW1wdHlDYXJ0KClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwicmVtb3ZlX3Nob3BwaW5nX2NhcnRcIildKV0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJFbXB0eSB8IENhcnRcIildKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtdG9vbHRpcFwiLFxuICAgICAgICB7IGF0dHJzOiB7IGxlZnQ6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIixcbiAgICAgICAgICAgICAgICBmbGF0OiBcIlwiLFxuICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgY29sb3I6IFwicHJpbWFyeVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgX3ZtLm9wZW5DYXJ0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1iYWRnZVwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgbGVmdDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgYXR0cnM6IHsgc2xvdDogXCJiYWRnZVwiIH0sIHNsb3Q6IFwiYmFkZ2VcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmNvdW50KSlcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJzaG9wcGluZ19jYXJ0XCIpXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJWaWV3IHwgQ2FydFwiKV0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtOGRhNTY4NWFcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LThkYTU2ODVhXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBOYXZCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0xlZnRTaWRlQmFyLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNGUxMjc3MTdcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vTGVmdFNpZGVCYXIudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxwYXJ0aWFsc1xcXFxMZWZ0U2lkZUJhci52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIExlZnRTaWRlQmFyLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00ZTEyNzcxN1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTRlMTI3NzE3XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0xlZnRTaWRlQmFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCI8dGVtcGxhdGU+XG4gIDx2LW5hdmlnYXRpb24tZHJhd2VyXG4gICAgICB0ZW1wb3JhcnlcbiAgICAgIGhpZGUtb3ZlcmxheVxuICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICBlbmFibGUtcmVzaXplLXdhdGNoZXJcbiAgICAgIHYtbW9kZWw9XCJkcmF3ZXJcIlxuICAgID5cbiAgICAgIDx2LWxpc3QgZGVuc2U+XG4gICAgICAgIDwhLS0gVi1Gb3IgTGlua3MgRnJvbSBNZW51IC0tPlxuICAgICAgICA8di1saW5rIDpkYXJrPVwiZGFya0NsYXNzXCIgdi1mb3I9XCJsaW5rIGluIGxpbmtzXCIgOmtleT1cImxpbmsuaWRcIiA6dGl0bGU9XCJsaW5rLnRpdGxlXCIgOmhyZWY9XCJsaW5rLmhyZWZcIiA6aWNvbj1cImxpbmsuYWN0aW9uXCI+PC92LWxpbms+XG4gICAgICAgIDwhLS0gSW5kaXZpZHVhbCBMaW5rIChDdXN0b20gQWRkaXRpb25hbCkgLS0+XG4gICAgICAgIDx2LWxpbmsgOmRhcms9XCJkYXJrQ2xhc3NcIiAgdGl0bGU9XCJUdXRvcmlhbFwiIDpocmVmPVwiJy9jb3Vyc2VzJ1wiICAgaWNvbj1cInNjaG9vbFwiPjwvdi1saW5rPlxuICAgICAgICA8IS0tIEV4cGFuZGFibGUgR3JvdXAgTGlua3MgZnJvbSBHcm91cCBMaW5rIC0tPlxuICAgICAgICA8Z3JvdXAtbGluayA6ZGFyaz1cImRhcmtDbGFzc1wiIDppdGVtcz1cImdyb3VwbGlua3NcIj48L2dyb3VwLWxpbms+XG4gICAgICAgIDx2LXN1YmhlYWRlciA6Y2xhc3M9XCJ7J2JsdWUtZ3JleS0tdGV4dCc6ICFpc0RhcmssICd0ZXh0LS1saWdodGVuLTEnOiAhaXNEYXJrLCAnd2hpdGUtLXRleHQnOiBpc0Rhcmt9XCI+RmVhdHVyZWQgUHJvZHVjdDwvdi1zdWJoZWFkZXI+XG4gICAgICAgIDwhLS0gRmVhdHVyZWQgUHJvZHVjdHMgLS0+XG4gICAgICAgIDx2LWxpc3Q+XG4gICAgICAgICAgPG1lbWJlci1saW5rIDpkYXJrPVwiZGFya0NsYXNzXCIgdi1mb3I9XCJtZW1iZXIgaW4gbWVtYmVyc1wiIDprZXk9XCJtZW1iZXIudGV4dFwiIDpuYW1lPVwibWVtYmVyLm5hbWVcIiA6YXZhdGFyPVwiYGh0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvcG9ydHJhaXRzL21lbi8ke21lbWJlci5waWN0dXJlfS5qcGdgXCI+PC9tZW1iZXItbGluaz5cbiAgICAgICAgPC92LWxpc3Q+XG4gICAgICAgIDx2LXN1YmhlYWRlciA6Y2xhc3M9XCJ7J2JsdWUtZ3JleS0tdGV4dCc6ICFpc0RhcmssICd0ZXh0LS1saWdodGVuLTEnOiAhaXNEYXJrLCAnd2hpdGUtLXRleHQnOiBpc0Rhcmt9XCI+VG9wIDMgQmVzdCBTZWxsZXI8L3Ytc3ViaGVhZGVyPlxuICAgICAgICA8IS0tIEJlc3QgU2VsbGVyIFByb2R1Y3RzIC0tPlxuICAgICAgICA8di1saXN0PlxuICAgICAgICAgIDxtZW1iZXItbGluayB2LWZvcj1cIm1lbWJlciBpbiBtZW1iZXJzXCIgOmtleT1cIm1lbWJlci50ZXh0XCIgOm5hbWU9XCJtZW1iZXIubmFtZVwiIDphdmF0YXI9XCJgaHR0cHM6Ly9yYW5kb211c2VyLm1lL2FwaS9wb3J0cmFpdHMvbWVuLyR7bWVtYmVyLnBpY3R1cmV9LmpwZ2BcIj48L21lbWJlci1saW5rPlxuICAgICAgICA8L3YtbGlzdD5cbiAgICAgICAgPHYtbGluayA6ZGFyaz1cImRhcmtDbGFzc1wiICB0aXRsZT1cIkxvZ291dFwiICA6aHJlZj1cIicvbG9nb3V0J1wiIGljb249XCJwb3dlcl9zZXR0aW5nc19uZXdcIj48L3YtbGluaz5cbiAgICAgICAgPHYtbGluayA6ZGFyaz1cImRhcmtDbGFzc1wiICB0aXRsZT1cIlNldHRpbmdzXCIgOmhyZWY9XCInLydcIiAgIGljb249XCJzZXR0aW5nc1wiPjwvdi1saW5rPlxuICAgICAgPC92LWxpc3Q+XG4gICAgPC92LW5hdmlnYXRpb24tZHJhd2VyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBWTGluayBmcm9tICcuLi9jb21wb25lbnRzL1ZMaW5rLnZ1ZSdcbmltcG9ydCBHcm91cExpbmsgZnJvbSAnLi4vY29tcG9uZW50cy9Hcm91cExpbmsudnVlJ1xuaW1wb3J0IE1lbWJlckxpbmsgZnJvbSAnLi4vY29tcG9uZW50cy9NZW1iZXJMaW5rJ1xuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcbmltcG9ydCB7IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH0gZnJvbSAndnVleCdcbmNvbnN0IHsgbWFwR2V0dGVycyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2F1dGgnKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWl4aW5zOiBbVGhlbWVdLFxuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGRyYXdlcjogZmFsc2UsXG4gICAgICAgIGxpbmtzOiBbXSwgLy8gc2l0ZSBuYXZpZ2F0aW9uIGxpbmtzXG4gICAgICAgIG1lbWJlcnM6IFtdLCAvLyBjaGFuZ2Ugd2l0aCBmZWF0dXJlZCBQcm9kdWN0c1xuICAgICAgICBncm91cGxpbmtzOiBbXSAvLyBwcm9kdWN0IGNhdGVnb3JpZXNcbiAgICB9KSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIFZMaW5rLFxuICAgICAgICBHcm91cExpbmssXG4gICAgICAgIE1lbWJlckxpbmtcbiAgICB9LFxuICAgIG1vdW50ZWQgKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgQnVzLiRvbigndG9nZ2xlRHJhd2VyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5kcmF3ZXIgPSAhc2VsZi5kcmF3ZXJcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZi5mZXRjaFByb2R1Y3RzKClcbiAgICAgICAgc2VsZi5mZXRjaENhdGVnb3JpZXMoKVxuICAgICAgICBzZWxmLmZldGNoTmF2TGlua3MoKVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBmZXRjaFByb2R1Y3RzICgpIHtcbiAgICAgICAgICAgIC8vIE9uIENsaWNrIFdpbGwgU2hvdyBUaGUgUHJvZHVjdCBQYWdlXG4gICAgICAgICAgICB0aGlzLm1lbWJlcnMgPSBbXG4gICAgICAgICAgICAgICAgeyBwaWN0dXJlOiAyOCwgbmFtZTogJ0FzdXMnIH0sXG4gICAgICAgICAgICAgICAgeyBwaWN0dXJlOiAzOCwgbmFtZTogJ0FwcGxlJyB9LFxuICAgICAgICAgICAgICAgIHsgcGljdHVyZTogNDgsIG5hbWU6ICdYYm94JyB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIGZldGNoQ2F0ZWdvcmllcyAoKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3VwbGlua3MgPSBBcHAuZ3JvdXBsaW5rc1xuICAgICAgICB9LFxuICAgICAgICBmZXRjaE5hdkxpbmtzICgpIHtcbiAgICAgICAgICAgIHRoaXMubGlua3MgPSBBcHAubWVudVxuICAgICAgICB9LFxuICAgICAgICBpc01lbnVBY3RpdmUgKGhyZWYpIHtcbiAgICAgICAgICAgIGxldCBpdGVtc2VnbWVudCA9ICcnXG4gICAgICAgICAgICBsZXQgc2VnbWVudCA9ICcnXG4gICAgICAgICAgICBpZiAoaHJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNlZ21lbnQgPSBocmVmLnNwbGl0KCcvJylbMV1cbiAgICAgICAgICAgICAgICBzZWdtZW50ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylbMV1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXNlZ21lbnQgPT09IHNlZ21lbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbG9hZHZpZXcgKGhyZWYsIHZpZXcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc01lbnVBY3RpdmUoaHJlZikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7IHBhdGg6IGAke2hyZWZ9YCB9KVxuICAgICAgICAgICAgICAgIEJ1cy4kZW1pdChgbG9hZC12aWV3YCwgdmlldylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgQnVzLiRlbWl0KGBsb2FkLXZpZXdgLCB2aWV3KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBMZWZ0U2lkZUJhci52dWU/NzZiNThjZTgiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQwMTgwNGJmXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vR3JvdXBMaW5rLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9Hcm91cExpbmsudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi00MDE4MDRiZlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0dyb3VwTGluay52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi00MDE4MDRiZlwiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXEdyb3VwTGluay52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIEdyb3VwTGluay52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNDAxODA0YmZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi00MDE4MDRiZlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0dyb3VwTGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQwMTgwNGJmXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vR3JvdXBMaW5rLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMDk1NDhhZjhcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDAxODA0YmZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9Hcm91cExpbmsudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQwMTgwNGJmXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vR3JvdXBMaW5rLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi00MDE4MDRiZlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9Hcm91cExpbmsudnVlXG4vLyBtb2R1bGUgaWQgPSA2Nzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uc3R5bGVBdmF0YXJbZGF0YS12LTQwMTgwNGJmXSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW4tbGVmdDogLTU1cHg7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDOi9Vc2Vycy91cmlhaC9zaXRlcy93d3cvc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvR3JvdXBMaW5rLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxtQkFBbUI7RUFDbkIsbUJBQW1CO0NBQUVcIixcImZpbGVcIjpcIkdyb3VwTGluay52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnN0eWxlQXZhdGFyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbi1sZWZ0OiAtNTVweDsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi00MDE4MDRiZlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9Hcm91cExpbmsudnVlXG4vLyBtb2R1bGUgaWQgPSA2Nzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsIjx0ZW1wbGF0ZT5cbiAgICA8di1saXN0PlxuICAgICAgICA8di1saXN0LWdyb3VwIHYtZm9yPVwiaXRlbSBpbiBpdGVtc1wiIDp2YWx1ZT1cImlzR3JvdXBBY3RpdmUoaXRlbSlcIiB2LWJpbmQ6a2V5PVwiaXRlbS50aXRsZVwiPlxuICAgICAgICA8di1saXN0LXRpbGUgc2xvdD1cIml0ZW1cIj5cbiAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1hY3Rpb24gdi1pZj1cIiFpdGVtLmF2YXRhclwiPlxuICAgICAgICAgICAgPHYtaWNvbj57eyBpdGVtLmFjdGlvbiB9fTwvdi1pY29uPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1hY3Rpb24+XG4gICAgICAgICAgICA8di1hdmF0YXIgc2l6ZT1cIjI1cHhcIiB2LWVsc2U+XG4gICAgICAgICAgICAgICAgPGltZyA6c3JjPVwiaXRlbS5hdmF0YXJcIiBhbHQ9XCJcIj5cbiAgICAgICAgICAgIDwvdi1hdmF0YXI+XG4gICAgICAgICAgICA8di1saXN0LXRpbGUtY29udGVudD5cbiAgICAgICAgICAgIDx2LWxpc3QtdGlsZS10aXRsZSA6Y2xhc3M9XCJ7J2JsdWUtZ3JleS0tdGV4dCc6ICFpc0RhcmssICd0ZXh0LS1saWdodGVuLTEnOiAhaXNEYXJrfVwiPnt7IGl0ZW0udGl0bGUgfX08L3YtbGlzdC10aWxlLXRpdGxlPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLWFjdGlvbj5cbiAgICAgICAgICAgIDx2LWljb24gOmNsYXNzPVwieydwcmltYXJ5LS10ZXh0JzogIWlzRGFyaywgJ3doaXRlLS10ZXh0JzogaXNEYXJrfVwiPmtleWJvYXJkX2Fycm93X2Rvd248L3YtaWNvbj5cbiAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtYWN0aW9uPlxuICAgICAgICA8L3YtbGlzdC10aWxlPlxuICAgICAgICA8IS0tIGhyZWYgSGVyZSAtLT5cbiAgICAgICAgPHYtbGlzdC10aWxlIEBjbGljay5uYXRpdmUuc3RvcD1cImxvYWR2aWV3KGl0ZW0sc3ViSXRlbS5jb21wb25lbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVwiW3sgc3R5bGVBdmF0YXI6IGhhc0F2YXRhcihzdWJJdGVtKSB9XVwiXG4gICAgICAgICAgICAgICAgICAgIDphdmF0YXI9XCJzdWJJdGVtLmF2YXRhciA/ICdhdmF0YXInIDogJydcIlxuICAgICAgICAgICAgICAgICAgICB2LWZvcj1cInN1Ykl0ZW0gaW4gaXRlbS5pdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgIDprZXk9XCJzdWJJdGVtLnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtcIlxuICAgICAgICA+XG4gICAgICAgICAgICAgPHYtYXZhdGFyIHYtaWY9XCJzdWJJdGVtLmF2YXRhclwiPlxuICAgICAgICAgICAgICAgIDxpbWcgOnNyYz1cImxvYWRBdmF0YXIoc3ViSXRlbS5hdmF0YXIpXCIgYWx0PVwiXCI+XG4gICAgICAgICAgICA8L3YtYXZhdGFyPlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgICAgPHYtbGlzdC10aWxlLXRpdGxlICB2LWlmPVwiIWlzRGFya1wiPlxuICAgICAgICAgICAgICAgICA8c3BhbiA6Y2xhc3M9XCJ7J3RlYWwtLXRleHQnOiBpc0FjdGl2ZShzdWJJdGVtKSwgJ3RleHQtLWxpZ2h0ZW4tMic6IGlzQWN0aXZlKHN1Ykl0ZW0pLCAnYmx1ZS1ncmV5LS10ZXh0JzogIWlzQWN0aXZlKHN1Ykl0ZW0pLCAndGV4dC0tbGlnaHRlbi0xJzogIWlzQWN0aXZlKHN1Ykl0ZW0pfVwiPnt7IHN1Ykl0ZW0udGl0bGUgfX08L3NwYW4+XG4gICAgICAgICAgICAgPC92LWxpc3QtdGlsZS10aXRsZT5cbiAgICAgICAgICAgICA8di1saXN0LXRpbGUtdGl0bGUgIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgPHNwYW4gOmNsYXNzPVwieyd0ZWFsLS10ZXh0JzogaXNBY3RpdmUoc3ViSXRlbSksICd0ZXh0LS1saWdodGVuLTInOiBpc0FjdGl2ZShzdWJJdGVtKSwgJ3doaXRlLS10ZXh0JzogIWlzQWN0aXZlKHN1Ykl0ZW0pIH1cIj57eyBzdWJJdGVtLnRpdGxlIH19PC9zcGFuPlxuICAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtdGl0bGU+XG4gICAgICAgICAgICA8L3YtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgICAgPHYtbGlzdC10aWxlLWFjdGlvbiB2LWlmPVwic3ViSXRlbS5hdmF0YXJcIj5cbiAgICAgICAgICAgICAgICA8di1pY29uIDpjbGFzcz1cInsndGVhbC0tdGV4dCc6IGlzQWN0aXZlKHN1Ykl0ZW0pLCAndGV4dC0tbGlnaHRlbi0yJzogaXNBY3RpdmUoc3ViSXRlbSl9XCI+e3sgc3ViSXRlbS5hY3Rpb24gfX08L3YtaWNvbj5cbiAgICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1hY3Rpb24+XG4gICAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1hY3Rpb24gdi1lbHNlPlxuICAgICAgICAgICAgICAgIDx2LWljb24gOmNsYXNzPVwieyd0ZWFsLS10ZXh0JzogaXNBY3RpdmUoc3ViSXRlbSksICd0ZXh0LS1saWdodGVuLTInOiBpc0FjdGl2ZShzdWJJdGVtKX1cIj57eyBzdWJJdGVtLmFjdGlvbiB9fTwvdi1pY29uPlxuICAgICAgICAgICAgICA8L3YtbGlzdC10aWxlLWFjdGlvbj5cbiAgICAgICAgPC92LWxpc3QtdGlsZT5cbiAgICAgICAgPC92LWxpc3QtZ3JvdXA+XG4gICAgPC92LWxpc3Q+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiBbJ2l0ZW1zJ10sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZGFyazogQXBwLnRoZW1lLmRhcmtcbiAgICB9KSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGxvYWR2aWV3IChpdGVtLCBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0dyb3VwQWN0aXZlKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goeyBwYXRoOiBgJHtpdGVtLmhyZWZ9YCB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQnVzLiRlbWl0KGBsb2FkLXZpZXdgLCBjb21wb25lbnQpXG4gICAgICAgIH0sXG4gICAgICAgIGhhc0F2YXRhciAoc3ViSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHN1Ykl0ZW0uYXZhdGFyICE9PSB1bmRlZmluZWRcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZEF2YXRhciAoYXZhdGFyKSB7XG4gICAgICAgICAgICByZXR1cm4gYXZhdGFyIHx8ICdodHRwczovL2F2YXRhcnMwLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzkwNjQwNjY/dj00JnM9NDYwJ1xuICAgICAgICB9LFxuICAgICAgICBpc0dyb3VwQWN0aXZlIChpdGVtKSB7XG4gICAgICAgICAgICBsZXQgaXRlbXNlZ21lbnQgPSAnJ1xuICAgICAgICAgICAgbGV0IHNlZ21lbnQgPSAnJ1xuICAgICAgICAgICAgaWYgKGl0ZW0uaHJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNlZ21lbnQgPSBpdGVtLmhyZWYuc3BsaXQoJy8nKVsxXVxuICAgICAgICAgICAgICAgIHNlZ21lbnQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVsxXVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtc2VnbWVudCA9PT0gc2VnbWVudFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0FjdGl2ZSAoc3ViSXRlbSkge1xuICAgICAgICAgICAgaWYgKHN1Ykl0ZW0uaHJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Ykl0ZW0uaHJlZiA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGlzRGFyayAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXJrID09PSB0cnVlXG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuICAgIC5zdHlsZUF2YXRhciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC01NXB4O1xuICAgIH1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gR3JvdXBMaW5rLnZ1ZT82M2Q1ZWY1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxpc3RcIixcbiAgICBfdm0uX2woX3ZtLml0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICByZXR1cm4gX2MoXG4gICAgICAgIFwidi1saXN0LWdyb3VwXCIsXG4gICAgICAgIHsga2V5OiBpdGVtLnRpdGxlLCBhdHRyczogeyB2YWx1ZTogX3ZtLmlzR3JvdXBBY3RpdmUoaXRlbSkgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGlzdC10aWxlXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHNsb3Q6IFwiaXRlbVwiIH0sIHNsb3Q6IFwiaXRlbVwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICFpdGVtLmF2YXRhclxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1saXN0LXRpbGUtYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KF92bS5fcyhpdGVtLmFjdGlvbikpXSldLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBfYyhcInYtYXZhdGFyXCIsIHsgYXR0cnM6IHsgc2l6ZTogXCIyNXB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHsgYXR0cnM6IHsgc3JjOiBpdGVtLmF2YXRhciwgYWx0OiBcIlwiIH0gfSlcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGlzdC10aWxlLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1ZS1ncmV5LS10ZXh0XCI6ICFfdm0uaXNEYXJrLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LS1saWdodGVuLTFcIjogIV92bS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKGl0ZW0udGl0bGUpKV1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS1hY3Rpb25cIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInByaW1hcnktLXRleHRcIjogIV92bS5pc0RhcmssXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndoaXRlLS10ZXh0XCI6IF92bS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJrZXlib2FyZF9hcnJvd19kb3duXCIpXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uX2woaXRlbS5pdGVtcywgZnVuY3Rpb24oc3ViSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICBcInYtbGlzdC10aWxlXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IHN1Ykl0ZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgY2xhc3M6IFt7IHN0eWxlQXZhdGFyOiBfdm0uaGFzQXZhdGFyKHN1Ykl0ZW0pIH1dLFxuICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGN1cnNvcjogXCJwb2ludGVyXCIgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBhdmF0YXI6IHN1Ykl0ZW0uYXZhdGFyID8gXCJhdmF0YXJcIiA6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmxvYWR2aWV3KGl0ZW0sIHN1Ykl0ZW0uY29tcG9uZW50KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHN1Ykl0ZW0uYXZhdGFyXG4gICAgICAgICAgICAgICAgICA/IF9jKFwidi1hdmF0YXJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogX3ZtLmxvYWRBdmF0YXIoc3ViSXRlbS5hdmF0YXIpLCBhbHQ6IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcInYtbGlzdC10aWxlLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgIV92bS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwidi1saXN0LXRpbGUtdGl0bGVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlYWwtLXRleHRcIjogX3ZtLmlzQWN0aXZlKHN1Ykl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMlwiOiBfdm0uaXNBY3RpdmUoc3ViSXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1ZS1ncmV5LS10ZXh0XCI6ICFfdm0uaXNBY3RpdmUoc3ViSXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC0tbGlnaHRlbi0xXCI6ICFfdm0uaXNBY3RpdmUoc3ViSXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHN1Ykl0ZW0udGl0bGUpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IF9jKFwidi1saXN0LXRpbGUtdGl0bGVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlYWwtLXRleHRcIjogX3ZtLmlzQWN0aXZlKHN1Ykl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMlwiOiBfdm0uaXNBY3RpdmUoc3ViSXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2hpdGUtLXRleHRcIjogIV92bS5pc0FjdGl2ZShzdWJJdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3Moc3ViSXRlbS50aXRsZSkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5hdmF0YXJcbiAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS1hY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlYWwtLXRleHRcIjogX3ZtLmlzQWN0aXZlKHN1Ykl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LS1saWdodGVuLTJcIjogX3ZtLmlzQWN0aXZlKHN1Ykl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhzdWJJdGVtLmFjdGlvbikpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidi1saXN0LXRpbGUtYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZWFsLS10ZXh0XCI6IF92bS5pc0FjdGl2ZShzdWJJdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC0tbGlnaHRlbi0yXCI6IF92bS5pc0FjdGl2ZShzdWJJdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3Moc3ViSXRlbS5hY3Rpb24pKV1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMlxuICAgICAgKVxuICAgIH0pXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTQwMTgwNGJmXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi00MDE4MDRiZlwiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0dyb3VwTGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vTWVtYmVyTGluay52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LWQ5MWY4ZjA0XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL01lbWJlckxpbmsudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXE1lbWJlckxpbmsudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBNZW1iZXJMaW5rLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1kOTFmOGYwNFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWQ5MWY4ZjA0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvTWVtYmVyTGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiPHRlbXBsYXRlPlxuICAgIDx2LWxpc3QtdGlsZSBhdmF0YXIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtcIj5cbiAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1hdmF0YXI+XG4gICAgICAgICAgICAgIDxpbWcgOnNyYz1cImF2YXRhclwiIGFsdD1cIlwiPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1hdmF0YXI+XG4gICAgICAgICAgICA8di1saXN0LXRpbGUtdGl0bGUgdi10ZXh0PVwibmFtZVwiIDpjbGFzcz1cInsnYmx1ZS1ncmV5LS10ZXh0JzogIWlzRGFyaywgJ3RleHQtLWxpZ2h0ZW4tMSc6ICFpc0RhcmssICd3aGl0ZS0tdGV4dCc6IGlzRGFya31cIj48L3YtbGlzdC10aWxlLXRpdGxlPlxuICAgIDwvdi1saXN0LXRpbGU+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtaXhpbnM6IFtUaGVtZV0sXG4gICAgcHJvcHM6IHtcbiAgICAgICAgZGFyazoge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gTWVtYmVyTGluay52dWU/NjQ0NzIwN2EiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1saXN0LXRpbGVcIixcbiAgICB7IHN0YXRpY1N0eWxlOiB7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgYXR0cnM6IHsgYXZhdGFyOiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcInYtbGlzdC10aWxlLWF2YXRhclwiLCBbXG4gICAgICAgIF9jKFwiaW1nXCIsIHsgYXR0cnM6IHsgc3JjOiBfdm0uYXZhdGFyLCBhbHQ6IFwiXCIgfSB9KVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ2LWxpc3QtdGlsZS10aXRsZVwiLCB7XG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgXCJibHVlLWdyZXktLXRleHRcIjogIV92bS5pc0RhcmssXG4gICAgICAgICAgXCJ0ZXh0LS1saWdodGVuLTFcIjogIV92bS5pc0RhcmssXG4gICAgICAgICAgXCJ3aGl0ZS0tdGV4dFwiOiBfdm0uaXNEYXJrXG4gICAgICAgIH0sXG4gICAgICAgIGRvbVByb3BzOiB7IHRleHRDb250ZW50OiBfdm0uX3MoX3ZtLm5hbWUpIH1cbiAgICAgIH0pXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LWQ5MWY4ZjA0XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi1kOTFmOGYwNFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9NZW1iZXJMaW5rLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1uYXZpZ2F0aW9uLWRyYXdlclwiLFxuICAgIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHRlbXBvcmFyeTogXCJcIixcbiAgICAgICAgXCJoaWRlLW92ZXJsYXlcIjogXCJcIixcbiAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgXCJlbmFibGUtcmVzaXplLXdhdGNoZXJcIjogXCJcIlxuICAgICAgfSxcbiAgICAgIG1vZGVsOiB7XG4gICAgICAgIHZhbHVlOiBfdm0uZHJhd2VyLFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgX3ZtLmRyYXdlciA9ICQkdlxuICAgICAgICB9LFxuICAgICAgICBleHByZXNzaW9uOiBcImRyYXdlclwiXG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxpc3RcIixcbiAgICAgICAgeyBhdHRyczogeyBkZW5zZTogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfdm0uX2woX3ZtLmxpbmtzLCBmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gX2MoXCJ2LWxpbmtcIiwge1xuICAgICAgICAgICAgICBrZXk6IGxpbmsuaWQsXG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgICB0aXRsZTogbGluay50aXRsZSxcbiAgICAgICAgICAgICAgICBocmVmOiBsaW5rLmhyZWYsXG4gICAgICAgICAgICAgICAgaWNvbjogbGluay5hY3Rpb25cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIGRhcms6IF92bS5kYXJrQ2xhc3MsXG4gICAgICAgICAgICAgIHRpdGxlOiBcIlR1dG9yaWFsXCIsXG4gICAgICAgICAgICAgIGhyZWY6IFwiL2NvdXJzZXNcIixcbiAgICAgICAgICAgICAgaWNvbjogXCJzY2hvb2xcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJncm91cC1saW5rXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IGRhcms6IF92bS5kYXJrQ2xhc3MsIGl0ZW1zOiBfdm0uZ3JvdXBsaW5rcyB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1zdWJoZWFkZXJcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBcImJsdWUtZ3JleS0tdGV4dFwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMVwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICBcIndoaXRlLS10ZXh0XCI6IF92bS5pc0RhcmtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJGZWF0dXJlZCBQcm9kdWN0XCIpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1saXN0XCIsXG4gICAgICAgICAgICBfdm0uX2woX3ZtLm1lbWJlcnMsIGZ1bmN0aW9uKG1lbWJlcikge1xuICAgICAgICAgICAgICByZXR1cm4gX2MoXCJtZW1iZXItbGlua1wiLCB7XG4gICAgICAgICAgICAgICAga2V5OiBtZW1iZXIudGV4dCxcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIG5hbWU6IG1lbWJlci5uYW1lLFxuICAgICAgICAgICAgICAgICAgYXZhdGFyOlxuICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvcG9ydHJhaXRzL21lbi9cIiArXG4gICAgICAgICAgICAgICAgICAgIG1lbWJlci5waWN0dXJlICtcbiAgICAgICAgICAgICAgICAgICAgXCIuanBnXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1zdWJoZWFkZXJcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBcImJsdWUtZ3JleS0tdGV4dFwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMVwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICBcIndoaXRlLS10ZXh0XCI6IF92bS5pc0RhcmtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJUb3AgMyBCZXN0IFNlbGxlclwiKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGlzdFwiLFxuICAgICAgICAgICAgX3ZtLl9sKF92bS5tZW1iZXJzLCBmdW5jdGlvbihtZW1iZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFwibWVtYmVyLWxpbmtcIiwge1xuICAgICAgICAgICAgICAgIGtleTogbWVtYmVyLnRleHQsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IG1lbWJlci5uYW1lLFxuICAgICAgICAgICAgICAgICAgYXZhdGFyOlxuICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvcG9ydHJhaXRzL21lbi9cIiArXG4gICAgICAgICAgICAgICAgICAgIG1lbWJlci5waWN0dXJlICtcbiAgICAgICAgICAgICAgICAgICAgXCIuanBnXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInYtbGlua1wiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBkYXJrOiBfdm0uZGFya0NsYXNzLFxuICAgICAgICAgICAgICB0aXRsZTogXCJMb2dvdXRcIixcbiAgICAgICAgICAgICAgaHJlZjogXCIvbG9nb3V0XCIsXG4gICAgICAgICAgICAgIGljb246IFwicG93ZXJfc2V0dGluZ3NfbmV3XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIGRhcms6IF92bS5kYXJrQ2xhc3MsXG4gICAgICAgICAgICAgIHRpdGxlOiBcIlNldHRpbmdzXCIsXG4gICAgICAgICAgICAgIGhyZWY6IFwiL1wiLFxuICAgICAgICAgICAgICBpY29uOiBcInNldHRpbmdzXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAyXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTRlMTI3NzE3XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi00ZTEyNzcxN1wiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2ODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA3IDggOSAxMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0ZhYkJ1dHRvbi52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTA2NTk4MjgyXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0ZhYkJ1dHRvbi52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGNvbXBvbmVudHNcXFxcRmFiQnV0dG9uLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gRmFiQnV0dG9uLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0wNjU5ODI4MlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTA2NTk4MjgyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvRmFiQnV0dG9uLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCI8dGVtcGxhdGU+XG4gIDx2LXNwZWVkLWRpYWxcbiAgICAgIHYtbW9kZWw9XCJmYWJcIlxuICAgICAgOnRvcD1cInRvcFwiXG4gICAgICA6Ym90dG9tPVwiYm90dG9tXCJcbiAgICAgIDpyaWdodD1cInJpZ2h0XCJcbiAgICAgIDpsZWZ0PVwibGVmdFwiXG4gICAgICA6ZGlyZWN0aW9uPVwiZGlyZWN0aW9uXCJcbiAgICAgIDpob3Zlcj1cImhvdmVyXCJcbiAgICAgIDp0cmFuc2l0aW9uPVwidHJhbnNpdGlvblwiXG4gICAgICA6YWJzb2x1dGU9XCJhYnNvbHV0ZVwiXG4gICAgICA6Zml4ZWQ9XCJmaXhlZFwiXG4gICAgPlxuICAgICAgPHYtYnRuXG4gICAgICAgIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICA6Y2xhc3M9XCJbYWN0aXZlRmFiLmNsYXNzXVwiXG4gICAgICAgIGRhcmtcbiAgICAgICAgZmFiXG4gICAgICAgIGhvdmVyXG4gICAgICAgIHYtbW9kZWw9XCJmYWJcIlxuICAgICAgPlxuICAgICAgICA8di1pY29uIGNsYXNzPVwid2hpdGUtLXRleHRcIj57eyBhY3RpdmVGYWIuaWNvbiB9fTwvdi1pY29uPlxuICAgICAgICA8di1pY29uIGNsYXNzPVwiZXJyb3ItLXRleHRcIj5jbG9zZTwvdi1pY29uPlxuICAgICAgPC92LWJ0bj5cbiAgICAgIDx2LWJ0blxuICAgICAgICB2LWZvcj1cImJ1dHRvbiBpbiBidXR0b25zXCIgOmtleT1cImJ1dHRvbi5uYW1lXCJcbiAgICAgICAgdi1pZj1cImlzVmlzaWJsZShidXR0b24pXCJcbiAgICAgICAgZmFiXG4gICAgICAgIGRhcmtcbiAgICAgICAgc21hbGxcbiAgICAgICAgOmNsYXNzPVwiW2J1dHRvbi5jbGFzc11cIlxuICAgICAgICBAY2xpY2submF0aXZlPVwibmF2aWdhdGUoYnV0dG9uKVwiXG4gICAgICA+XG4gICAgICAgIDx2LWljb24+e3sgYnV0dG9uLmljb24gfX08L3YtaWNvbj5cbiAgICAgIDwvdi1idG4+XG4gICAgPC92LXNwZWVkLWRpYWw+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfSBmcm9tICd2dWV4J1xuY29uc3QgeyBtYXBHZXR0ZXJzIH0gPSBjcmVhdGVOYW1lc3BhY2VkSGVscGVycygnYXV0aCcpXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZGlyZWN0aW9uOiAndG9wJyxcbiAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgIGZhYjogZmFsc2UsXG4gICAgICAgIGhvdmVyOiBmYWxzZSxcbiAgICAgICAgdG9wOiBmYWxzZSxcbiAgICAgICAgcmlnaHQ6IHRydWUsXG4gICAgICAgIGJvdHRvbTogdHJ1ZSxcbiAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgIGFic29sdXRlOiBmYWxzZSxcbiAgICAgICAgdHJhbnNpdGlvbjogJ3NsaWRlLXktcmV2ZXJzZS10cmFuc2l0aW9uJyxcbiAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgeyBuYW1lOiAnaG9tZScsIGhyZWY6ICcvJywgY2xhc3M6ICdpbmRpZ28gbGlnaHRlbi0yJywgaWNvbjogJ2ZhLWhvbWUnLCByZXF1aXJlc0F1dGg6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkYXNoYm9hcmQnLCBocmVmOiAnL2Rhc2hib2FyZCcsIGNsYXNzOiAnYW1iZXIgbGlnaHRlbi0yJywgaWNvbjogJ2ZhLXNob3BwaW5nLWJhZycsIHJlcXVpcmVzQXV0aDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvZ2luJywgaHJlZjogJy9sb2dpbicsIGNsYXNzOiAnc3VjY2VzcycsIGljb246ICdmYS1rZXknLCByZXF1aXJlc0F1dGg6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdyZWdpc3RlcicsIGhyZWY6ICcvcmVnaXN0ZXInLCBjbGFzczogJ2luZm8nLCBpY29uOiAnZmEtdXNlci1wbHVzJywgcmVxdWlyZXNBdXRoOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbG9nb3V0JywgaHJlZjogJy9sb2dvdXQnLCBjbGFzczogJ3JlZCBsaWdodGVuLTInLCBpY29uOiAnZmEtcG93ZXItb2ZmJywgcmVxdWlyZXNBdXRoOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdzY3JvbGwtdXAnLCBocmVmOiBudWxsLCBjbGFzczogJ2JsdWUtZ3JleScsIGljb246ICdmbGlnaHRfdGFrZW9mZicsIHJlcXVpcmVzQXV0aDogZmFsc2UgfVxuICAgICAgICBdLFxuICAgICAgICBhY3RpdmVGYWI6IHtcbiAgICAgICAgICAgICdjbGFzcyc6ICdwcmltYXJ5JywgaWNvbjogJ2ZhLXJvY2tldCdcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcEdldHRlcnMoe1xuICAgICAgICAgICAgZ2V0QXV0aDogJ2dldEF1dGgnXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgICB0b3AgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5ib3R0b20gPSAhdmFsXG4gICAgICAgIH0sXG4gICAgICAgIHJpZ2h0ICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdCA9ICF2YWxcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMudG9wID0gIXZhbFxuICAgICAgICB9LFxuICAgICAgICBsZWZ0ICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMucmlnaHQgPSAhdmFsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbmF2aWdhdGUgKGJ1dHRvbikge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLmFjdGl2ZUZhYiA9IHsgY2xhc3M6IGJ1dHRvbi5jbGFzcywgaWNvbjogYnV0dG9uLmljb24gfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmFjdGl2ZUZhYiA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogJ3ByaW1hcnknLCBpY29uOiAnZmEtcm9ja2V0J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmhyZWYgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kcm91dGVyLnB1c2goeyBwYXRoOiBgJHtidXR0b24uaHJlZn1gIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxUb1RvcCgzMDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKVxuICAgICAgICB9LFxuICAgICAgICBzY3JvbGxUb1RvcCAoc2Nyb2xsRHVyYXRpb24pIHtcbiAgICAgICAgICAgIHZhciBjb3NQYXJhbWV0ZXIgPSB3aW5kb3cuc2Nyb2xsWSAvIDJcbiAgICAgICAgICAgIHZhciBzY3JvbGxDb3VudCA9IDBcbiAgICAgICAgICAgIHZhciBvbGRUaW1lc3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzdGVwIChuZXdUaW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxDb3VudCArPSBNYXRoLlBJIC8gKHNjcm9sbER1cmF0aW9uIC8gKG5ld1RpbWVzdGFtcCAtIG9sZFRpbWVzdGFtcCkpXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbENvdW50ID49IE1hdGguUEkpIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA9PT0gMCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIE1hdGgucm91bmQoY29zUGFyYW1ldGVyICsgY29zUGFyYW1ldGVyICogTWF0aC5jb3Moc2Nyb2xsQ291bnQpKSlcbiAgICAgICAgICAgICAgICBvbGRUaW1lc3RhbXAgPSBuZXdUaW1lc3RhbXBcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcClcbiAgICAgICAgfSxcbiAgICAgICAgaXNWaXNpYmxlIChidXR0b24pIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5yZXF1aXJlc0F1dGggPT09IGZhbHNlICYmIGJ1dHRvbi5uYW1lID09PSAnbG9naW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzZWxmLmdldEF1dGhcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYnV0dG9uLnJlcXVpcmVzQXV0aCA9PT0gZmFsc2UgJiYgYnV0dG9uLm5hbWUgPT09ICdyZWdpc3RlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXNlbGYuZ2V0QXV0aFxuICAgICAgICAgICAgfSBlbHNlIGlmIChidXR0b24ucmVxdWlyZXNBdXRoID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuZ2V0QXV0aFxuICAgICAgICAgICAgfSBlbHNlIGlmIChidXR0b24ucmVxdWlyZXNBdXRoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBGYWJCdXR0b24udnVlPzRlY2VmNzIyIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtc3BlZWQtZGlhbFwiLFxuICAgIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHRvcDogX3ZtLnRvcCxcbiAgICAgICAgYm90dG9tOiBfdm0uYm90dG9tLFxuICAgICAgICByaWdodDogX3ZtLnJpZ2h0LFxuICAgICAgICBsZWZ0OiBfdm0ubGVmdCxcbiAgICAgICAgZGlyZWN0aW9uOiBfdm0uZGlyZWN0aW9uLFxuICAgICAgICBob3ZlcjogX3ZtLmhvdmVyLFxuICAgICAgICB0cmFuc2l0aW9uOiBfdm0udHJhbnNpdGlvbixcbiAgICAgICAgYWJzb2x1dGU6IF92bS5hYnNvbHV0ZSxcbiAgICAgICAgZml4ZWQ6IF92bS5maXhlZFxuICAgICAgfSxcbiAgICAgIG1vZGVsOiB7XG4gICAgICAgIHZhbHVlOiBfdm0uZmFiLFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgX3ZtLmZhYiA9ICQkdlxuICAgICAgICB9LFxuICAgICAgICBleHByZXNzaW9uOiBcImZhYlwiXG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3M6IFtfdm0uYWN0aXZlRmFiLmNsYXNzXSxcbiAgICAgICAgICBhdHRyczogeyBzbG90OiBcImFjdGl2YXRvclwiLCBkYXJrOiBcIlwiLCBmYWI6IFwiXCIsIGhvdmVyOiBcIlwiIH0sXG4gICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIixcbiAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgdmFsdWU6IF92bS5mYWIsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgIF92bS5mYWIgPSAkJHZcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleHByZXNzaW9uOiBcImZhYlwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBzdGF0aWNDbGFzczogXCJ3aGl0ZS0tdGV4dFwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmFjdGl2ZUZhYi5pY29uKSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgc3RhdGljQ2xhc3M6IFwiZXJyb3ItLXRleHRcIiB9LCBbX3ZtLl92KFwiY2xvc2VcIildKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5fbChfdm0uYnV0dG9ucywgZnVuY3Rpb24oYnV0dG9uKSB7XG4gICAgICAgIHJldHVybiBfdm0uaXNWaXNpYmxlKGJ1dHRvbilcbiAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IGJ1dHRvbi5uYW1lLFxuICAgICAgICAgICAgICAgIGNsYXNzOiBbYnV0dG9uLmNsYXNzXSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBmYWI6IFwiXCIsIGRhcms6IFwiXCIsIHNtYWxsOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLm5hdmlnYXRlKGJ1dHRvbilcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KF92bS5fcyhidXR0b24uaWNvbikpXSldLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgfSlcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtMDY1OTgyODJcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTA2NTk4MjgyXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0ZhYkJ1dHRvbi52dWVcbi8vIG1vZHVsZSBpZCA9IDY4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQ29va2llTGF3LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzM2MzE0ODBcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQ29va2llTGF3LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFydGlhbHNcXFxcQ29va2llTGF3LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gQ29va2llTGF3LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi03MzYzMTQ4MFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTczNjMxNDgwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0Nvb2tpZUxhdy52dWVcbi8vIG1vZHVsZSBpZCA9IDY4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiPHRlbXBsYXRlPlxuPGNvb2tpZS1sYXcgdGhlbWU9XCJkYXJrLWxpbWVcIiBidXR0b25UZXh0PVwiWWVzLCBJIFVuZGVyc3RhbmQgVGhpcyBTaXRlIFVzZXMgQ29va2llLlwiPlxuICAgICAgICA8ZGl2IHNsb3Q9XCJtZXNzYWdlXCI+XG4gICAgICAgICAgICA8cD5UaGlzIHdlYnNpdGUgdXNlcyBjb29raWVzIHRvIGVuc3VyZSB5b3UgZ2V0IHRoZSBiZXN0IGV4cGVyaWVuY2Ugb24gb3VyIHdlYnNpdGUuXG4gICAgICAgICAgICAgICAgPHNwYW4+UmVhZCBPdXIgQ29va2llIFRlcm1zIGFuZCBVc2FnZSBGb3IgTW9yZSBJbmZvOjwvc3Bhbj4gPHJvdXRlci1saW5rIHRvPVwiL2Nvb2tpZS1sYXctYWdyZWVtZW50XCI+Q2xpY2sgaGVyZTwvcm91dGVyLWxpbms+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuPC9jb29raWUtbGF3PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBDb29raWVMYXcgZnJvbSAndnVlLWNvb2tpZS1sYXcnXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY29tcG9uZW50czogeyBDb29raWVMYXcgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQ29va2llTGF3LnZ1ZT84ZTI3OGQ0MiIsIi8qIVxuICogdnVlLWNvb2tpZS1sYXcgdjEuMy4wXG4gKiAoYykgMjAxNyBKYWt1YiBKdXN6Y3phayA8amFrdWJAcG9zdGVvLmRlPlxuICogXG4gKi9cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQ29va2llTGF3XCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkNvb2tpZUxhd1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJDb29raWVMYXdcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG59XG52YXIgQ29tcG9uZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KShcbiAgLyogc2NyaXB0ICovXG4gIF9fd2VicGFja19yZXF1aXJlX18oNyksXG4gIC8qIHRlbXBsYXRlICovXG4gIF9fd2VicGFja19yZXF1aXJlX18oOCksXG4gIC8qIHN0eWxlcyAqL1xuICBpbmplY3RTdHlsZSxcbiAgLyogc2NvcGVJZCAqL1xuICBudWxsLFxuICAvKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbiAgbnVsbFxuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCIvVXNlcnMvamp1c3pjemFrL1Byb2pla3RlL1ByaXZhdC92dWUtY29va2llLWxhdy9zcmMvY29tcG9uZW50cy9Db29raWVMYXcudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBDb29raWVMYXcudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKGZhbHNlKSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi04NjNmZDk3ZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTg2M2ZkOTdlXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmksIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpKFwiOTFjMDUzMTJcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYoZmFsc2UpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3tcXFwibWluaW1pemVcXFwiOmZhbHNlLFxcXCJzb3VyY2VNYXBcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTg2M2ZkOTdlXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/e1xcXCJzb3VyY2VNYXBcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Nvb2tpZUxhdy52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/e1xcXCJtaW5pbWl6ZVxcXCI6ZmFsc2UsXFxcInNvdXJjZU1hcFxcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtODYzZmQ5N2VcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz97XFxcInNvdXJjZU1hcFxcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ29va2llTGF3LnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cbi8qKiovIH0pLFxuLyogMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmksIFwiXFxuLkNvb2tpZSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgei1pbmRleDogOTk5OTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBiYXNlbGluZTtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogYmFzZWxpbmU7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLkNvb2tpZSA+ICoge1xcbiAgICBtYXJnaW46IDAuOTM3NXJlbSAwO1xcbiAgICAtbXMtZmxleC1pdGVtLWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQ4cmVtKSB7XFxuLkNvb2tpZSB7XFxuICAgICAgLXdlYmtpdC1ib3gtb3JpZW50OiBob3Jpem9udGFsO1xcbiAgICAgIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgICAgICAtbXMtZmxleC1mbG93OiByb3c7XFxuICAgICAgICAgICAgICBmbGV4LWZsb3c6IHJvdztcXG59XFxuLkNvb2tpZSA+ICoge1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbn1cXG59XFxuLkNvb2tpZS0tdG9wIHtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG59XFxuLkNvb2tpZS0tYm90dG9tIHtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG59XFxuLkNvb2tpZV9fYnV0dG9ucyB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLkNvb2tpZV9fYnV0dG9ucyA+ICoge1xcbiAgICBtYXJnaW46IDAuMzEyNXJlbSAwO1xcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0OHJlbSkge1xcbi5Db29raWVfX2J1dHRvbnMge1xcbiAgICAgIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gICAgICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbn1cXG4uQ29va2llX19idXR0b25zID4gKiB7XFxuICAgICAgICBtYXJnaW46IDAgMC45Mzc1cmVtO1xcbn1cXG59XFxuLkNvb2tpZV9fYnV0dG9uIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIC1tcy1mbGV4LWl0ZW0tYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcbi5Db29raWUtLWJhc2Uge1xcbiAgYmFja2dyb3VuZDogI0YxRjFGMTtcXG4gIGNvbG9yOiAjMjMyMzIzO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tYmFzZSAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjOTdEMDU4O1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uQ29va2llLS1iYXNlIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzdlYmYzNjtcXG59XFxuLkNvb2tpZS0tYmFzZS0tcm91bmRlZCB7XFxuICBiYWNrZ3JvdW5kOiAjRjFGMUYxO1xcbiAgY29sb3I6ICMyMzIzMjM7XFxuICBwYWRkaW5nOiAxLjI1MGVtO1xcbn1cXG4uQ29va2llLS1iYXNlLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICM5N0QwNTg7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxufVxcbi5Db29raWUtLWJhc2UtLXJvdW5kZWQgLkNvb2tpZV9fYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjN2ViZjM2O1xcbn1cXG4uQ29va2llLS1ibG9vZC1vcmFuZ2Uge1xcbiAgYmFja2dyb3VuZDogIzQyNDg1MTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tYmxvb2Qtb3JhbmdlIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICNFNzZBNjg7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDA7XFxufVxcbi5Db29raWUtLWJsb29kLW9yYW5nZSAuQ29va2llX19idXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNlMDNmM2M7XFxufVxcbi5Db29raWUtLWJsb29kLW9yYW5nZS0tcm91bmRlZCB7XFxuICBiYWNrZ3JvdW5kOiAjNDI0ODUxO1xcbiAgY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAxLjI1MGVtO1xcbn1cXG4uQ29va2llLS1ibG9vZC1vcmFuZ2UtLXJvdW5kZWQgLkNvb2tpZV9fYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZDogI0U3NkE2ODtcXG4gICAgcGFkZGluZzogMC42MjVlbSAzLjEyNWVtO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG59XFxuLkNvb2tpZS0tYmxvb2Qtb3JhbmdlLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogI2UwM2YzYztcXG59XFxuLkNvb2tpZS0tZGFyay1saW1lIHtcXG4gIGJhY2tncm91bmQ6ICM0MjQ4NTE7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLWRhcmstbGltZSAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjOTdEMDU4O1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uQ29va2llLS1kYXJrLWxpbWUgLkNvb2tpZV9fYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjN2ViZjM2O1xcbn1cXG4uQ29va2llLS1kYXJrLWxpbWUtLXJvdW5kZWQge1xcbiAgYmFja2dyb3VuZDogIzQyNDg1MTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tZGFyay1saW1lLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICM5N0QwNTg7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxufVxcbi5Db29raWUtLWRhcmstbGltZS0tcm91bmRlZCAuQ29va2llX19idXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICM3ZWJmMzY7XFxufVxcbi5Db29raWUtLXJveWFsIHtcXG4gIGJhY2tncm91bmQ6ICNGQkMyMjc7XFxuICBjb2xvcjogIzIzMjMyMztcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLXJveWFsIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICM3MjZDRUE7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDA7XFxufVxcbi5Db29raWUtLXJveWFsIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzQ3M2ZlNDtcXG59XFxuLkNvb2tpZS0tcm95YWwtLXJvdW5kZWQge1xcbiAgYmFja2dyb3VuZDogI0ZCQzIyNztcXG4gIGNvbG9yOiAjMjMyMzIzO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tcm95YWwtLXJvdW5kZWQgLkNvb2tpZV9fYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZDogIzcyNkNFQTtcXG4gICAgcGFkZGluZzogMC42MjVlbSAzLjEyNWVtO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG59XFxuLkNvb2tpZS0tcm95YWwtLXJvdW5kZWQgLkNvb2tpZV9fYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjNDczZmU0O1xcbn1cXG4uc2xpZGVGcm9tVG9wLWVudGVyLCAuc2xpZGVGcm9tVG9wLWxlYXZlLXRvIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAtMTIuNWVtKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAtMTIuNWVtKTtcXG59XFxuLnNsaWRlRnJvbVRvcC1lbnRlci10bywgLnNsaWRlRnJvbVRvcC1sZWF2ZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAwcHgpO1xcbn1cXG4uc2xpZGVGcm9tQm90dG9tLWVudGVyLCAuc2xpZGVGcm9tQm90dG9tLWxlYXZlLXRvIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAxMi41ZW0pO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDEyLjVlbSk7XFxufVxcbi5zbGlkZUZyb21Cb3R0b20tZW50ZXItdG8sIC5zbGlkZUZyb21Cb3R0b20tbGVhdmUge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG59XFxuLnNsaWRlRnJvbUJvdHRvbS1lbnRlci1hY3RpdmUsXFxuLnNsaWRlRnJvbUJvdHRvbS1sZWF2ZS1hY3RpdmUsXFxuLnNsaWRlRnJvbVRvcC1lbnRlci1hY3RpdmUsXFxuLnNsaWRlRnJvbVRvcC1sZWF2ZS1hY3RpdmUge1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAuNHMgZWFzZS1pbjtcXG4gIHRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIC40cyBlYXNlLWluO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC40cyBlYXNlLWluO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC40cyBlYXNlLWluLCAtd2Via2l0LXRyYW5zZm9ybSAuNHMgZWFzZS1pbjtcXG59XFxuLmZhZGUtZW50ZXItYWN0aXZlLCAuZmFkZS1sZWF2ZS1hY3RpdmUge1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IC41cztcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjVzO1xcbn1cXG4uZmFkZS1lbnRlciwgLmZhZGUtbGVhdmUtdG8ge1xcbiAgb3BhY2l0eTogMDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cbi8qKiovIH0pLFxuLyogNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGxpc3QgZm9ybWF0IHByb2R1Y2VkIGJ5IGNzcy1sb2FkZXIgaW50byBzb21ldGhpbmdcbiAqIGVhc2llciB0byBtYW5pcHVsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGlkOiBwYXJlbnRJZCArICc6JyArIGksXG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzXG59XG5cblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyB0aGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG4vKioqLyB9KSxcbi8qIDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgcHJvcHM6IHtcbiAgICBidXR0b25UZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnR290IGl0ISdcbiAgICB9LFxuICAgIGJ1dHRvbkxpbms6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgYnV0dG9uTGlua1RleHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdNb3JlIGluZm8nXG4gICAgfSxcbiAgICBtZXNzYWdlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnVGhpcyB3ZWJzaXRlIHVzZXMgY29va2llcyB0byBlbnN1cmUgeW91IGdldCB0aGUgYmVzdCBleHBlcmllbmNlIG9uIG91ciB3ZWJzaXRlLidcbiAgICB9LFxuICAgIHRoZW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYmFzZSdcbiAgICB9LFxuXG4gICAgcG9zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdib3R0b20nXG4gICAgfSxcblxuICAgIHRyYW5zaXRpb25OYW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnc2xpZGVGcm9tQm90dG9tJ1xuICAgIH0sXG4gICAgYnV0dG9uQ2xhc3M6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdDb29raWVfX2J1dHRvbidcbiAgICB9XG4gIH0sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzT3BlbjogZmFsc2VcbiAgICB9O1xuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY29udGFpbmVyUG9zaXRpb246IGZ1bmN0aW9uIGNvbnRhaW5lclBvc2l0aW9uKCkge1xuICAgICAgcmV0dXJuICdDb29raWUtLScgKyB0aGlzLnBvc2l0aW9uO1xuICAgIH0sXG4gICAgY29va2llVGhlbWU6IGZ1bmN0aW9uIGNvb2tpZVRoZW1lKCkge1xuICAgICAgcmV0dXJuICdDb29raWUtLScgKyB0aGlzLnRoZW1lO1xuICAgIH1cbiAgfSxcbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCgpIHtcbiAgICBpZiAoIXRoaXMuZ2V0VmlzaXRlZCgpID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBzZXRWaXNpdGVkOiBmdW5jdGlvbiBzZXRWaXNpdGVkKCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Nvb2tpZTphY2NlcHRlZCcsIHRydWUpO1xuICAgIH0sXG4gICAgZ2V0VmlzaXRlZDogZnVuY3Rpb24gZ2V0VmlzaXRlZCgpIHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29va2llOmFjY2VwdGVkJyk7XG4gICAgfSxcbiAgICBhY2NlcHQ6IGZ1bmN0aW9uIGFjY2VwdCgpIHtcbiAgICAgIHRoaXMuc2V0VmlzaXRlZCgpO1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKiovIH0pLFxuLyogOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ3RyYW5zaXRpb24nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwiYXBwZWFyXCI6IFwiXCIsXG4gICAgICBcIm5hbWVcIjogX3ZtLnRyYW5zaXRpb25OYW1lXG4gICAgfVxuICB9LCBbKF92bS5pc09wZW4pID8gX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJDb29raWVcIixcbiAgICBjbGFzczogW192bS5jb250YWluZXJQb3NpdGlvbiwgX3ZtLmNvb2tpZVRoZW1lXVxuICB9LCBbX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJDb29raWVfX2NvbnRlbnRcIlxuICB9LCBbX3ZtLl90KFwibWVzc2FnZVwiLCBbX3ZtLl92KF92bS5fcyhfdm0ubWVzc2FnZSkpXSldLCAyKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJDb29raWVfX2J1dHRvbnNcIlxuICB9LCBbKF92bS5idXR0b25MaW5rKSA/IF9jKCdhJywge1xuICAgIGNsYXNzOiBfdm0uYnV0dG9uQ2xhc3MsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwiaHJlZlwiOiBfdm0uYnV0dG9uTGlua1xuICAgIH1cbiAgfSwgW192bS5fdihfdm0uX3MoX3ZtLmJ1dHRvbkxpbmtUZXh0KSldKSA6IF92bS5fZSgpLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgIGNsYXNzOiBfdm0uYnV0dG9uQ2xhc3MsXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogX3ZtLmFjY2VwdFxuICAgIH1cbiAgfSwgW192bS5fdihfdm0uX3MoX3ZtLmJ1dHRvblRleHQpKV0pXSldKSA6IF92bS5fZSgpXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKGZhbHNlKSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTg2M2ZkOTdlXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1jb29raWUtbGF3L2Rpc3QvdnVlLWNvb2tpZS1sYXcuanNcbi8vIG1vZHVsZSBpZCA9IDY5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImNvb2tpZS1sYXdcIixcbiAgICB7XG4gICAgICBhdHRyczoge1xuICAgICAgICB0aGVtZTogXCJkYXJrLWxpbWVcIixcbiAgICAgICAgYnV0dG9uVGV4dDogXCJZZXMsIEkgVW5kZXJzdGFuZCBUaGlzIFNpdGUgVXNlcyBDb29raWUuXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgYXR0cnM6IHsgc2xvdDogXCJtZXNzYWdlXCIgfSwgc2xvdDogXCJtZXNzYWdlXCIgfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcInBcIixcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgIFwiVGhpcyB3ZWJzaXRlIHVzZXMgY29va2llcyB0byBlbnN1cmUgeW91IGdldCB0aGUgYmVzdCBleHBlcmllbmNlIG9uIG91ciB3ZWJzaXRlLlxcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgIF92bS5fdihcIlJlYWQgT3VyIENvb2tpZSBUZXJtcyBhbmQgVXNhZ2UgRm9yIE1vcmUgSW5mbzpcIilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwicm91dGVyLWxpbmtcIiwgeyBhdHRyczogeyB0bzogXCIvY29va2llLWxhdy1hZ3JlZW1lbnRcIiB9IH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFwiQ2xpY2sgaGVyZVwiKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTczNjMxNDgwXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi03MzYzMTQ4MFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQ29va2llTGF3LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNyA4IDkgMTAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1hcHBcIixcbiAgICB7IGF0dHJzOiB7IGRhcms6IF92bS5BcHAudGhlbWUuZGFyaywgc3RhbmRhbG9uZTogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXCJsZWZ0LXNpZGUtYmFyXCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYXBwLW5hdi1iYXJcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwibWFpblwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInBhLTAgbWEtMFwiLFxuICAgICAgICAgICAgICBhdHRyczogeyB0cmFuc2l0aW9uOiBcInNsaWRlLXgtdHJhbnNpdGlvblwiLCBmbHVpZDogXCJcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdChcImRlZmF1bHRcIildLFxuICAgICAgICAgICAgMlxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImZhYi1idXR0b25cIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJjb29raWUtbGF3XCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYXBwLWZvb3RlclwiKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1lOGYxNGFjNFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtZThmMTRhYzRcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTWFpbi52dWVcbi8vIG1vZHVsZSBpZCA9IDY5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDcgOCA5IDEwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWM1MjA1ZThjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vRGFzaGJvYXJkLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiNTNlOTkxNTZcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYzUyMDVlOGNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9EYXNoYm9hcmQudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWM1MjA1ZThjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vRGFzaGJvYXJkLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1jNTIwNWU4Y1wiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0Rhc2hib2FyZC52dWVcbi8vIG1vZHVsZSBpZCA9IDc5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmFwcGxpY2F0aW9uLS1kYXJrIC50YWJsZVtkYXRhLXYtYzUyMDVlOGNdIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y1RjVGNSAhaW1wb3J0YW50O1xcbiAgICBjb2xvcjogIzEwMzA1MCAhaW1wb3J0YW50O1xcbn1cXG4uYXBwbGljYXRpb24tLWRhcmsgLmlucHV0LWdyb3VwOm5vdCguaW5wdXQtZ3JvdXAtLWVycm9yKSBsYWJlbFtkYXRhLXYtYzUyMDVlOGNdIHtcXG4gICAgLyogY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC43KTsgKi9cXG59XFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkM6L1VzZXJzL3VyaWFoL3NpdGVzL3d3dy9zaG9wL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZT82OTdmZDU4ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBeUxBO0lBQ0EscUNBQUE7SUFDQSwwQkFBQTtDQUNBO0FBQ0E7SUFDQSxtQ0FBQTtDQUNBXCIsXCJmaWxlXCI6XCJEYXNoYm9hcmQudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjx0ZW1wbGF0ZT5cXG4gIDxtYWluLWxheW91dCAgOnN0eWxlPVxcXCJ7IHBhZGRpbmdUb3A6IGAxMDBweGAsIGJhY2tncm91bmRDb2xvcjogYHdoaXRlYCB9XFxcIj5cXG4gICAgPHYtY29udGFpbmVyICBmbHVpZD5cXG4gICAgICA8di1sYXlvdXQgcm93IHdyYXA+XFxuICAgICAgICA8IS0tIG1ha2UgYSBjYXJkIHRvIGRpc3BsYXkgdGhpcyAtLT5cXG4gICAgICAgIDx2LWZsZXggeHMxMiBtZDQgdGV4dC14cy1jZW50ZXI+XFxuICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJwcmltYXJ5LS10ZXh0XFxcIj5PcmRlcnM6IHt7IHRvdGFsIH19PC9oMz5cXG4gICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgPHYtZmxleCB4czEyIG1kNCB0ZXh0LXhzLWNlbnRlcj5cXG4gICAgICAgICAgICA8aDMgY2xhc3M9XFxcInByaW1hcnktLXRleHRcXFwiPlVucGFpZDoge3sgdW5wYWlkIH19IDwvaDM+XFxuICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgIDx2LWZsZXggeHMxMiBtZDQgdGV4dC14cy1jZW50ZXI+XFxuICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJwcmltYXJ5LS10ZXh0XFxcIj5QYWlkOiB7eyBwYWlkIH19PC9oMz5cXG4gICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgPHYtZmxleCB4czEyIG1kNCB0ZXh0LXhzLWNlbnRlcj5cXG4gICAgICAgICAgICA8aDMgY2xhc3M9XFxcInByaW1hcnktLXRleHRcXFwiPk9uLUhvbGQ6IHt7IHVuc2VudCB9fSA8L2gzPlxcbiAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICA8di1mbGV4IHhzMTIgbWQ0IHRleHQteHMtY2VudGVyPlxcbiAgICAgICAgICAgIDxoMyBjbGFzcz1cXFwicHJpbWFyeS0tdGV4dFxcXCI+T24tRGVsaXZlcnk6IHt7IHNlbnQgfX08L2gzPlxcbiAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICA8di1mbGV4IHhzMTIgbWQ0IHRleHQteHMtY2VudGVyPlxcbiAgICAgICAgICAgIDxoMyBjbGFzcz1cXFwicHJpbWFyeS0tdGV4dFxcXCI+UmVjZWl2ZWQ6IHt7IHJlY2VpdmVkIH19IDwvaDM+XFxuICAgICAgICA8L3YtZmxleD5cXG4gICAgICA8L3YtbGF5b3V0PlxcblxcbiAgICAgIDx2LWNvbnRhaW5lciBmbHVpZD5cXG5cXG4gICAgICAgICAgICA8di1kYXRhLXRhYmxlXFxuICAgICAgICAgICAgICAgIDpoZWFkZXJzPVxcXCJoZWFkZXJzXFxcIlxcbiAgICAgICAgICAgICAgICA6aXRlbXM9XFxcIml0ZW1zXFxcIlxcbiAgICAgICAgICAgICAgICA6bGlnaHQ9XFxcInRydWVcXFwiXFxuICAgICAgICAgICAgPlxcbiAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVxcXCJpdGVtc1xcXCIgc2NvcGU9XFxcInByb3BzXFxcIj5cXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFxcXCI+e3sgcHJvcHMuaXRlbS5pZCB9fTwvdGQ+XFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcXFwiPnt7IHRvdGFsQW1vdW50KHByb3BzLml0ZW0pIHwgY3VycmVuY3koY3VycmVuY3kpIH19PC90ZD5cXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFxcXCI+e3sgcHJvcHMuaXRlbS5wYXltZW50LnBhaWQgPyAnUGFpZCcgOiAnVW5wYWlkJyB9fTwvdGQ+XFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcXFwiPnt7IHByb3BzLml0ZW0uc2hpcG1lbnQuc2VudCA/ICdPbi1EZWxpdmVyeScgOiAnT24tSG9sZCcgfX08L3RkPlxcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XFxcIj57eyBwcm9wcy5pdGVtLnNoaXBtZW50LnJlY2VpdmVkID8gJ1JlY2VpdmVkJyA6ICdOb3QgWWV0JyB9fTwvdGQ+XFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGl0bGUgdGV4dC14cy1jZW50ZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtZGlhbG9nIHYtbW9kZWw9XFxcImRpYWxvZ1xcXCIgZnVsbHNjcmVlbiB0cmFuc2l0aW9uPVxcXCJkaWFsb2ctYm90dG9tLXRyYW5zaXRpb25cXFwiIDpvdmVybGF5PVxcXCJmYWxzZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGZsYXQgaWNvbiBjb2xvcj1cXFwiYWNjZW50XFxcIiBzbG90PVxcXCJhY3RpdmF0b3JcXFwiIEBjbGljay5uYXRpdmU9XFxcInNldEN1cnJlbnRPcmRlcihwcm9wcy5pdGVtKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24+ZmEtZWRpdDwvdi1pY29uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtY2FyZCA6bGlnaHQ9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRvb2xiYXIgIGNvbG9yPVxcXCJwcmltYXJ5XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGljb24gQGNsaWNrLm5hdGl2ZT1cXFwiZGlhbG9nID0gZmFsc2VcXFwiIGRhcms+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24+Y2xvc2U8L3YtaWNvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRvb2xiYXItdGl0bGU+VXBkYXRlIE9yZGVyIE5vLiB7eyBjdXJyZW50X29yZGVyLmlkIH19PC92LXRvb2xiYXItdGl0bGU+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10b29sYmFyLWl0ZW1zPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gZGFyayBmbGF0IEBjbGljay5uYXRpdmU9XFxcImRpYWxvZyA9IGZhbHNlXFxcIj5TYXZlPC92LWJ0bj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRvb2xiYXItaXRlbXM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRvb2xiYXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtY29udGFpbmVyIGZsdWlkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gVmlldyBDYXJ0IC0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcInByaW1hcnktLXRleHRcXFwiPlZpZXcgQ2FydCBEZXRhaWxzPC9oMz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gQ3VzdG9tZXIgRGV0YWlscyAtLT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHRleHQteHMtY2VudGVyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJwcmltYXJ5LS10ZXh0XFxcIj5WaWV3IEN1c3RvbWVyIERldGFpbHM8L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBTaGlwcGluZyBEZXRhaWxzIC0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcInByaW1hcnktLXRleHRcXFwiPlZpZXcgU2hpcHBpbmcgRGV0YWlsczwvaDM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIE1vZGUgT2YgUGF5bWVudCAtLT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHRleHQteHMtY2VudGVyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJwcmltYXJ5LS10ZXh0XFxcIj5WaWV3IE1vZGUgT2YgUGF5bWVudDwvaDM+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIFVwbG9hZCBSZWNlaXB0IC0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcInByaW1hcnktLXRleHRcXFwiPlVwbG9hZCBSZWNlaXB0PC9oMz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gVXBkYXRlIFN0YXR1cyAtLT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHRleHQteHMtY2VudGVyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJwcmltYXJ5LS10ZXh0XFxcIj5VcGRhdGUgU3RhdHVzPC9oMz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtY29udGFpbmVyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LWRpYWxvZz5cXG4gICAgICAgICAgICAgICAgPC90ZD5cXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJ0aXRsZSB0ZXh0LXhzLWxlZnRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtc3dpdGNoIHYtaWY9XFxcImhhc1JvbGUoJ2FkbWluJylcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cXFwicHJvcHMuaXRlbS5kb25lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVxcXCJyZWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmxpZ2h0PVxcXCJ0cnVlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cXFwiIWhhc1JvbGUoJ2FkbWluJylcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LXN3aXRjaD5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biB2LWVsc2UgZmxhdCBpY29uIGNvbG9yPVxcXCJyZWQgbGlnaHRlbi0yXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24gdi1pZj1cXFwicHJvcHMuaXRlbS5kb25lXFxcIj5mYS1jaGVjay1zcXVhcmUtbzwvdi1pY29uPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiB2LWVsc2U+ZmEtc3F1YXJlLW88L3YtaWNvbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgICAgICAgIDwvdGQ+XFxuXFxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cXG5cXG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cXFwicGFnZVRleHRcXFwiIHNjb3BlPVxcXCJ7IHBhZ2VTdGFydCwgcGFnZVN0b3AgfVxcXCI+XFxuICAgICAgICAgICAgICAgIEZyb20ge3sgcGFnZVN0YXJ0IH19IHRvIHt7IHBhZ2VTdG9wIH19XFxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cXG5cXG4gICAgICAgICAgICA8L3YtZGF0YS10YWJsZT5cXG4gICAgICA8L3YtY29udGFpbmVyPlxcbiAgICAgIDwhLS0gVGFibGUgdG8gVmlldyBBbGwgT3JkZXJzIC0tPlxcbiAgICAgIDwhLS0gTW9kYWwgVG8gTG9hZCBFYWNoIE9yZGVyIERldGFpbHMgLS0+XFxuICAgIDwvdi1jb250YWluZXI+XFxuICA8L21haW4tbGF5b3V0PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5pbXBvcnQgTWFpbkxheW91dCBmcm9tICcuLi9sYXlvdXRzL01haW4udnVlJ1xcbmltcG9ydCBUaGVtZSBmcm9tICcuLi9taXhpbnMvdGhlbWUnXFxuaW1wb3J0IEFjbCBmcm9tICcuLi9taXhpbnMvYWNsJ1xcblxcbmV4cG9ydCBkZWZhdWx0IHtcXG4gICAgbWl4aW5zOiBbVGhlbWUsIEFjbF0sXFxuICAgIGRhdGE6ICgpID0+ICh7XFxuICAgICAgICBjb250ZW50Q2xhc3M6IHsgJ2dyZXknOiB0cnVlLCAnbGlnaHRlbi00JzogdHJ1ZSwgJ2FjY2VudC0tdGV4dCc6IHRydWUgfSxcXG4gICAgICAgIGN1cnJlbmN5OiAn4oKxJyxcXG4gICAgICAgIGRpYWxvZzogZmFsc2UsXFxuICAgICAgICAvKiBwYW5lbHMgKi9cXG4gICAgICAgIHRvdGFsOiAwLFxcbiAgICAgICAgcGFpZDogMCxcXG4gICAgICAgIHNlbnQ6IDAsXFxuICAgICAgICByZWNlaXZlZDogMCxcXG4gICAgICAgIGRvbmU6IDAsXFxuICAgICAgICAvKiB0YWJsZSAqL1xcbiAgICAgICAgaGVhZGVyczogW1xcbiAgICAgICAgICAgIC8qIHJlbW92ZSBzb3J0IGFuZCB2YWx1ZSBzaW5jZSB3ZSBjYW50IGFjY2VzcyBkb3QgYW5vdGF0aW9uIGluIGl0ZW0gKi9cXG4gICAgICAgICAgICB7IHRleHQ6ICdPcmRlciBOby4nLCB2YWx1ZTogJ2lkJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IHRydWUgfSxcXG4gICAgICAgICAgICB7IHRleHQ6ICdBbW91bnQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcXG4gICAgICAgICAgICB7IHRleHQ6ICdQYWlkJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH0sXFxuICAgICAgICAgICAgeyB0ZXh0OiAnU2VudCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiBmYWxzZSB9LFxcbiAgICAgICAgICAgIHsgdGV4dDogJ1JlY2VpdmVkJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH0sXFxuICAgICAgICAgICAgeyB0ZXh0OiAnVXBkYXRlJywgYWxpZ246ICdjZW50ZXInLCBzb3J0YWJsZTogZmFsc2UgfSxcXG4gICAgICAgICAgICB7IHRleHQ6ICdDb21wbGV0ZWQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfVxcbiAgICAgICAgXSxcXG4gICAgICAgIGl0ZW1zOiBbXSxcXG4gICAgICAgIC8qIGN1cnJlbnQgdXBkYXRlZCBpdGVtICovXFxuICAgICAgICBjdXJyZW50X29yZGVyOiB7fVxcbiAgICB9KSxcXG4gICAgY29tcHV0ZWQ6IHtcXG4gICAgICAgIHVucGFpZCAoKSB7XFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG90YWwgLSB0aGlzLnBhaWRcXG4gICAgICAgIH0sXFxuICAgICAgICB1bnNlbnQgKCkge1xcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvdGFsIC0gdGhpcy5zZW50XFxuICAgICAgICB9XFxuICAgIH0sXFxuICAgIGNvbXBvbmVudHM6IHtcXG4gICAgICAgIE1haW5MYXlvdXRcXG4gICAgfSxcXG4gICAgbW91bnRlZCAoKSB7XFxuICAgICAgICB0aGlzLmZldGNoUGFuZWxTdGF0cygpXFxuICAgIH0sXFxuICAgIG1ldGhvZHM6IHtcXG4gICAgICAgIHNldEN1cnJlbnRPcmRlciAob3JkZXIpIHtcXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRfb3JkZXIgPSBvcmRlclxcbiAgICAgICAgfSxcXG4gICAgICAgIGZldGNoUGFuZWxTdGF0cyAoKSB7XFxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICAgICAgYXhpb3MuZ2V0KHJvdXRlKCdhcGkucGFuZWwuc3RhdHMnKSkudGhlbigocmVzcG9uc2UpID0+IHtcXG4gICAgICAgICAgICAgICAgc2VsZi5pdGVtcyA9IHJlc3BvbnNlLmRhdGEub3JkZXJzXFxuICAgICAgICAgICAgICAgIHNlbGYudG90YWwgPSByZXNwb25zZS5kYXRhLnRvdGFsXFxuICAgICAgICAgICAgICAgIHNlbGYuc2VudCA9IHJlc3BvbnNlLmRhdGEuc2VudFxcbiAgICAgICAgICAgICAgICBzZWxmLnBhaWQgPSByZXNwb25zZS5kYXRhLnBhaWRcXG4gICAgICAgICAgICAgICAgc2VsZi5yZWNlaXZlZCA9IHJlc3BvbnNlLmRhdGEucmVjZWl2ZWRcXG4gICAgICAgICAgICAgICAgc2VsZi5kb25lID0gcmVzcG9uc2UuZGF0YS5kb25lXFxuICAgICAgICAgICAgfSlcXG4gICAgICAgIH0sXFxuICAgICAgICB0b3RhbEFtb3VudCAoaXRlbSkge1xcbiAgICAgICAgICAgIGxldCBjYXJ0ID0gSlNPTi5wYXJzZShpdGVtLmNhcnQpXFxuICAgICAgICAgICAgbGV0IHRvdGFsID0gcGFyc2VGbG9hdChjYXJ0LnRvdGFsKSArIHBhcnNlRmxvYXQoaXRlbS5zaGlwbWVudC5zaGlwcGluZ19mZWUpXFxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsLnRvRml4ZWQoMilcXG4gICAgICAgIH1cXG4gICAgfVxcbn1cXG48L3NjcmlwdD5cXG5cXG48c3R5bGUgc2NvcGVkPlxcbi5hcHBsaWNhdGlvbi0tZGFyayAudGFibGUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1ICFpbXBvcnRhbnQ7XFxuICAgIGNvbG9yOiAjMTAzMDUwICFpbXBvcnRhbnQ7XFxufVxcbi5hcHBsaWNhdGlvbi0tZGFyayAuaW5wdXQtZ3JvdXA6bm90KC5pbnB1dC1ncm91cC0tZXJyb3IpIGxhYmVsIHtcXG4gICAgLyogY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC43KTsgKi9cXG59XFxuXFxuPC9zdHlsZT5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtYzUyMDVlOGNcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9EYXNoYm9hcmQudnVlXG4vLyBtb2R1bGUgaWQgPSA3OTRcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiPHRlbXBsYXRlPlxuICA8bWFpbi1sYXlvdXQgIDpzdHlsZT1cInsgcGFkZGluZ1RvcDogYDEwMHB4YCwgYmFja2dyb3VuZENvbG9yOiBgd2hpdGVgIH1cIj5cbiAgICA8di1jb250YWluZXIgIGZsdWlkPlxuICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICA8IS0tIG1ha2UgYSBjYXJkIHRvIGRpc3BsYXkgdGhpcyAtLT5cbiAgICAgICAgPHYtZmxleCB4czEyIG1kNCB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cInByaW1hcnktLXRleHRcIj5PcmRlcnM6IHt7IHRvdGFsIH19PC9oMz5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMiBtZDQgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCI+VW5wYWlkOiB7eyB1bnBhaWQgfX0gPC9oMz5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMiBtZDQgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCI+UGFpZDoge3sgcGFpZCB9fTwvaDM+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTIgbWQ0IHRleHQteHMtY2VudGVyPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiPk9uLUhvbGQ6IHt7IHVuc2VudCB9fSA8L2gzPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyIG1kNCB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cInByaW1hcnktLXRleHRcIj5Pbi1EZWxpdmVyeToge3sgc2VudCB9fTwvaDM+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTIgbWQ0IHRleHQteHMtY2VudGVyPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiPlJlY2VpdmVkOiB7eyByZWNlaXZlZCB9fSA8L2gzPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgIDx2LWNvbnRhaW5lciBmbHVpZD5cblxuICAgICAgICAgICAgPHYtZGF0YS10YWJsZVxuICAgICAgICAgICAgICAgIDpoZWFkZXJzPVwiaGVhZGVyc1wiXG4gICAgICAgICAgICAgICAgOml0ZW1zPVwiaXRlbXNcIlxuICAgICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJpdGVtc1wiIHNjb3BlPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPnt7IHByb3BzLml0ZW0uaWQgfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+e3sgdG90YWxBbW91bnQocHJvcHMuaXRlbSkgfCBjdXJyZW5jeShjdXJyZW5jeSkgfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+e3sgcHJvcHMuaXRlbS5wYXltZW50LnBhaWQgPyAnUGFpZCcgOiAnVW5wYWlkJyB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj57eyBwcm9wcy5pdGVtLnNoaXBtZW50LnNlbnQgPyAnT24tRGVsaXZlcnknIDogJ09uLUhvbGQnIH19PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPnt7IHByb3BzLml0ZW0uc2hpcG1lbnQucmVjZWl2ZWQgPyAnUmVjZWl2ZWQnIDogJ05vdCBZZXQnIH19PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8di1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiIGZ1bGxzY3JlZW4gdHJhbnNpdGlvbj1cImRpYWxvZy1ib3R0b20tdHJhbnNpdGlvblwiIDpvdmVybGF5PVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJhY2NlbnRcIiBzbG90PVwiYWN0aXZhdG9yXCIgQGNsaWNrLm5hdGl2ZT1cInNldEN1cnJlbnRPcmRlcihwcm9wcy5pdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24+ZmEtZWRpdDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNhcmQgOmxpZ2h0PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdG9vbGJhciAgY29sb3I9XCJwcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGljb24gQGNsaWNrLm5hdGl2ZT1cImRpYWxvZyA9IGZhbHNlXCIgZGFyaz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uPmNsb3NlPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10b29sYmFyLXRpdGxlPlVwZGF0ZSBPcmRlciBOby4ge3sgY3VycmVudF9vcmRlci5pZCB9fTwvdi10b29sYmFyLXRpdGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRvb2xiYXItaXRlbXM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGRhcmsgZmxhdCBAY2xpY2submF0aXZlPVwiZGlhbG9nID0gZmFsc2VcIj5TYXZlPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtdG9vbGJhci1pdGVtcz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10b29sYmFyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtY29udGFpbmVyIGZsdWlkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIFZpZXcgQ2FydCAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByaW1hcnktLXRleHRcIj5WaWV3IENhcnQgRGV0YWlsczwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBDdXN0b21lciBEZXRhaWxzIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiPlZpZXcgQ3VzdG9tZXIgRGV0YWlsczwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBTaGlwcGluZyBEZXRhaWxzIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiPlZpZXcgU2hpcHBpbmcgRGV0YWlsczwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBNb2RlIE9mIFBheW1lbnQgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHRleHQteHMtY2VudGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCI+VmlldyBNb2RlIE9mIFBheW1lbnQ8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gVXBsb2FkIFJlY2VpcHQgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHRleHQteHMtY2VudGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCI+VXBsb2FkIFJlY2VpcHQ8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gVXBkYXRlIFN0YXR1cyAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByaW1hcnktLXRleHRcIj5VcGRhdGUgU3RhdHVzPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1kaWFsb2c+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtc3dpdGNoIHYtaWY9XCJoYXNSb2xlKCdhZG1pbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwcm9wcy5pdGVtLmRvbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCIhaGFzUm9sZSgnYWRtaW4nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1zd2l0Y2g+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biB2LWVsc2UgZmxhdCBpY29uIGNvbG9yPVwicmVkIGxpZ2h0ZW4tMlwiPlxuICAgICAgICAgICAgICAgICAgICA8di1pY29uIHYtaWY9XCJwcm9wcy5pdGVtLmRvbmVcIj5mYS1jaGVjay1zcXVhcmUtbzwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8di1pY29uIHYtZWxzZT5mYS1zcXVhcmUtbzwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwicGFnZVRleHRcIiBzY29wZT1cInsgcGFnZVN0YXJ0LCBwYWdlU3RvcCB9XCI+XG4gICAgICAgICAgICAgICAgRnJvbSB7eyBwYWdlU3RhcnQgfX0gdG8ge3sgcGFnZVN0b3AgfX1cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDwvdi1kYXRhLXRhYmxlPlxuICAgICAgPC92LWNvbnRhaW5lcj5cbiAgICAgIDwhLS0gVGFibGUgdG8gVmlldyBBbGwgT3JkZXJzIC0tPlxuICAgICAgPCEtLSBNb2RhbCBUbyBMb2FkIEVhY2ggT3JkZXIgRGV0YWlscyAtLT5cbiAgICA8L3YtY29udGFpbmVyPlxuICA8L21haW4tbGF5b3V0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNYWluTGF5b3V0IGZyb20gJy4uL2xheW91dHMvTWFpbi52dWUnXG5pbXBvcnQgVGhlbWUgZnJvbSAnLi4vbWl4aW5zL3RoZW1lJ1xuaW1wb3J0IEFjbCBmcm9tICcuLi9taXhpbnMvYWNsJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWl4aW5zOiBbVGhlbWUsIEFjbF0sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgY29udGVudENsYXNzOiB7ICdncmV5JzogdHJ1ZSwgJ2xpZ2h0ZW4tNCc6IHRydWUsICdhY2NlbnQtLXRleHQnOiB0cnVlIH0sXG4gICAgICAgIGN1cnJlbmN5OiAn4oKxJyxcbiAgICAgICAgZGlhbG9nOiBmYWxzZSxcbiAgICAgICAgLyogcGFuZWxzICovXG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgICBwYWlkOiAwLFxuICAgICAgICBzZW50OiAwLFxuICAgICAgICByZWNlaXZlZDogMCxcbiAgICAgICAgZG9uZTogMCxcbiAgICAgICAgLyogdGFibGUgKi9cbiAgICAgICAgaGVhZGVyczogW1xuICAgICAgICAgICAgLyogcmVtb3ZlIHNvcnQgYW5kIHZhbHVlIHNpbmNlIHdlIGNhbnQgYWNjZXNzIGRvdCBhbm90YXRpb24gaW4gaXRlbSAqL1xuICAgICAgICAgICAgeyB0ZXh0OiAnT3JkZXIgTm8uJywgdmFsdWU6ICdpZCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdBbW91bnQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1BhaWQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1NlbnQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1JlY2VpdmVkJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdVcGRhdGUnLCBhbGlnbjogJ2NlbnRlcicsIHNvcnRhYmxlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnQ29tcGxldGVkJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH1cbiAgICAgICAgXSxcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAvKiBjdXJyZW50IHVwZGF0ZWQgaXRlbSAqL1xuICAgICAgICBjdXJyZW50X29yZGVyOiB7fVxuICAgIH0pLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIHVucGFpZCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3RhbCAtIHRoaXMucGFpZFxuICAgICAgICB9LFxuICAgICAgICB1bnNlbnQgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG90YWwgLSB0aGlzLnNlbnRcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBNYWluTGF5b3V0XG4gICAgfSxcbiAgICBtb3VudGVkICgpIHtcbiAgICAgICAgdGhpcy5mZXRjaFBhbmVsU3RhdHMoKVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBzZXRDdXJyZW50T3JkZXIgKG9yZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRfb3JkZXIgPSBvcmRlclxuICAgICAgICB9LFxuICAgICAgICBmZXRjaFBhbmVsU3RhdHMgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBheGlvcy5nZXQocm91dGUoJ2FwaS5wYW5lbC5zdGF0cycpKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuaXRlbXMgPSByZXNwb25zZS5kYXRhLm9yZGVyc1xuICAgICAgICAgICAgICAgIHNlbGYudG90YWwgPSByZXNwb25zZS5kYXRhLnRvdGFsXG4gICAgICAgICAgICAgICAgc2VsZi5zZW50ID0gcmVzcG9uc2UuZGF0YS5zZW50XG4gICAgICAgICAgICAgICAgc2VsZi5wYWlkID0gcmVzcG9uc2UuZGF0YS5wYWlkXG4gICAgICAgICAgICAgICAgc2VsZi5yZWNlaXZlZCA9IHJlc3BvbnNlLmRhdGEucmVjZWl2ZWRcbiAgICAgICAgICAgICAgICBzZWxmLmRvbmUgPSByZXNwb25zZS5kYXRhLmRvbmVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsQW1vdW50IChpdGVtKSB7XG4gICAgICAgICAgICBsZXQgY2FydCA9IEpTT04ucGFyc2UoaXRlbS5jYXJ0KVxuICAgICAgICAgICAgbGV0IHRvdGFsID0gcGFyc2VGbG9hdChjYXJ0LnRvdGFsKSArIHBhcnNlRmxvYXQoaXRlbS5zaGlwbWVudC5zaGlwcGluZ19mZWUpXG4gICAgICAgICAgICByZXR1cm4gdG90YWwudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4uYXBwbGljYXRpb24tLWRhcmsgLnRhYmxlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1ICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6ICMxMDMwNTAgIWltcG9ydGFudDtcbn1cbi5hcHBsaWNhdGlvbi0tZGFyayAuaW5wdXQtZ3JvdXA6bm90KC5pbnB1dC1ncm91cC0tZXJyb3IpIGxhYmVsIHtcbiAgICAvKiBjb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjcpOyAqL1xufVxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIERhc2hib2FyZC52dWU/Njk3ZmQ1OGUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwibWFpbi1sYXlvdXRcIixcbiAgICB7IHN0eWxlOiB7IHBhZGRpbmdUb3A6IFwiMTAwcHhcIiwgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBtZDQ6IFwiXCIsIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJoM1wiLCB7IHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIk9yZGVyczogXCIgKyBfdm0uX3MoX3ZtLnRvdGFsKSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgbWQ0OiBcIlwiLCBcInRleHQteHMtY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiaDNcIiwgeyBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJVbnBhaWQ6IFwiICsgX3ZtLl9zKF92bS51bnBhaWQpICsgXCIgXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIG1kNDogXCJcIiwgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImgzXCIsIHsgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiUGFpZDogXCIgKyBfdm0uX3MoX3ZtLnBhaWQpKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBtZDQ6IFwiXCIsIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJoM1wiLCB7IHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIk9uLUhvbGQ6IFwiICsgX3ZtLl9zKF92bS51bnNlbnQpICsgXCIgXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIG1kNDogXCJcIiwgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImgzXCIsIHsgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiT24tRGVsaXZlcnk6IFwiICsgX3ZtLl9zKF92bS5zZW50KSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgbWQ0OiBcIlwiLCBcInRleHQteHMtY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiaDNcIiwgeyBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJSZWNlaXZlZDogXCIgKyBfdm0uX3MoX3ZtLnJlY2VpdmVkKSArIFwiIFwiKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyBmbHVpZDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi1kYXRhLXRhYmxlXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczogeyBoZWFkZXJzOiBfdm0uaGVhZGVycywgaXRlbXM6IF92bS5pdGVtcywgbGlnaHQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIml0ZW1zXCIsXG4gICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihwcm9wcykge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MocHJvcHMuaXRlbS5pZCkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwiY3VycmVuY3lcIikoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRvdGFsQW1vdW50KHByb3BzLml0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW5jeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLnBheW1lbnQucGFpZCA/IFwiUGFpZFwiIDogXCJVbnBhaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5zaGlwbWVudC5zZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIk9uLURlbGl2ZXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiT24tSG9sZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLnNoaXBtZW50LnJlY2VpdmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIlJlY2VpdmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiTm90IFlldFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1jZW50ZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZGlhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbHNjcmVlbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBcImRpYWxvZy1ib3R0b20tdHJhbnNpdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5kaWFsb2csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRpYWxvZyA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJkaWFsb2dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiYWNjZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNldEN1cnJlbnRPcmRlcihwcm9wcy5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJmYS1lZGl0XCIpXSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGxpZ2h0OiB0cnVlIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2xiYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBjb2xvcjogXCJwcmltYXJ5XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGljb246IFwiXCIsIGRhcms6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlhbG9nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImNsb3NlXCIpXSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRvb2xiYXItdGl0bGVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVwZGF0ZSBPcmRlciBOby4gXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uY3VycmVudF9vcmRlci5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10b29sYmFyLWl0ZW1zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBkYXJrOiBcIlwiLCBmbGF0OiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRpYWxvZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJTYXZlXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhzMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiVmlldyBDYXJ0IERldGFpbHNcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhzMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWaWV3IEN1c3RvbWVyIERldGFpbHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4czEyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHQteHMtY2VudGVyXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImgzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVmlldyBTaGlwcGluZyBEZXRhaWxzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHMxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZpZXcgTW9kZSBPZiBQYXltZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHMxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJVcGxvYWQgUmVjZWlwdFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHMxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJVcGRhdGUgU3RhdHVzXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmhhc1JvbGUoXCJhZG1pblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInYtc3dpdGNoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwicmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhX3ZtLmhhc1JvbGUoXCJhZG1pblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcy5pdGVtLmRvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uZG9uZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicHJvcHMuaXRlbS5kb25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJyZWQgbGlnaHRlbi0yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwidi1pY29uXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcImZhLWNoZWNrLXNxdWFyZS1vXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiZmEtc3F1YXJlLW9cIildKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJwYWdlVGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VTdGFydCA9IHJlZi5wYWdlU3RhcnRcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFnZVN0b3AgPSByZWYucGFnZVN0b3BcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgRnJvbSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHBhZ2VTdGFydCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIHRvIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MocGFnZVN0b3ApICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1jNTIwNWU4Y1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtYzUyMDVlOGNcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzk2XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGhhc1JvbGUgKHBheWxvYWQpIHtcbiAgICAgICAgICAgIGxldCBtZSA9IHRoaXMuJHN0b3JlLmdldHRlcnNbJ2F1dGgvZ2V0TWUnXVxuICAgICAgICAgICAgcmV0dXJuIG1lLnJvbGVzLmluY2x1ZGVzKHIgPT4gciA9PT0gcGF5bG9hZClcbiAgICAgICAgfSxcbiAgICAgICAgaGFzUGVybWlzc2lvbiAocGVybWlzc2lvbikge1xuICAgICAgICAgICAgbGV0IG1lID0gdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXV0aC9nZXRNZSddXG4gICAgICAgICAgICByZXR1cm4gbWUucGVybWlzc2lvbnMuaW5jbHVkZXMocCA9PiBwID09PSBwZXJtaXNzaW9uKVxuICAgICAgICB9LFxuICAgICAgICBoYXNBbnlQZXJtaXNzaW9uIChwZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgbGV0IG1lID0gdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXV0aC9nZXRNZSddXG4gICAgICAgICAgICByZXR1cm4gcGVybWlzc2lvbnMuc29tZShwID0+IG1lLnBlcm1pc3Npb25zLmluY2x1ZGVzKHApKVxuICAgICAgICB9LFxuICAgICAgICBoYXNBbnlSb2xlIChyb2xlcykge1xuICAgICAgICAgICAgbGV0IG1lID0gdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXV0aC9nZXRNZSddXG4gICAgICAgICAgICByZXR1cm4gcm9sZXMuc29tZShyID0+IG1lLnJvbGVzLmluY2x1ZGVzKHIpKVxuICAgICAgICB9LFxuICAgICAgICBoYXNBbGxSb2xlcyAocm9sZXMpIHtcbiAgICAgICAgICAgIGxldCBtZSA9IHRoaXMuJHN0b3JlLmdldHRlcnNbJ2F1dGgvZ2V0TWUnXVxuICAgICAgICAgICAgcmV0dXJuIF8uZGlmZmVyZW5jZShyb2xlcywgbWUucm9sZXMpLmxlbmd0aCA9PT0gMFxuICAgICAgICB9LFxuICAgICAgICBoYXNBbGxQZXJtaXNzaW9ucyAocGVybWlzc2lvbnMpIHtcbiAgICAgICAgICAgIGxldCBtZSA9IHRoaXMuJHN0b3JlLmdldHRlcnNbJ2F1dGgvZ2V0TWUnXVxuICAgICAgICAgICAgcmV0dXJuIF8uZGlmZmVyZW5jZShwZXJtaXNzaW9ucywgbWUucGVybWlzc2lvbnMpLmxlbmd0aCA9PT0gMFxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9taXhpbnMvYWNsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==