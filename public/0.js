webpackJsonp([0],{

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

/***/ 651:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(806)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(808)
/* template */
var __vue_template__ = __webpack_require__(832)
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

var listToStyles = __webpack_require__(661)

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

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(656);

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

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(657), __esModule: true };

/***/ }),

/***/ 657:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(658);
module.exports = __webpack_require__(31).Object.assign;


/***/ }),

/***/ 658:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(60);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(659) });


/***/ }),

/***/ 659:
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

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(668)
/* template */
var __vue_template__ = __webpack_require__(669)
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

/***/ 661:
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

/***/ 662:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(663)
/* template */
var __vue_template__ = __webpack_require__(694)
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

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AppFooter_vue__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AppFooter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_AppFooter_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_AppNavBar_vue__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_AppNavBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__partials_AppNavBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_LeftSideBar_vue__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_LeftSideBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__partials_LeftSideBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_FabButton_vue__ = __webpack_require__(687);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_FabButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_FabButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__partials_CookieLaw_vue__ = __webpack_require__(690);
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

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(665)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(667)
/* template */
var __vue_template__ = __webpack_require__(670)
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

/***/ 665:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(666);
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

/***/ 666:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AppFooter.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_theme__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VLink_vue__ = __webpack_require__(660);
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

/***/ 668:
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

/***/ 669:
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

/***/ 670:
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

/***/ 671:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(672)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(674)
/* template */
var __vue_template__ = __webpack_require__(675)
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

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(673);
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

/***/ 673:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AppNavBar.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_theme__ = __webpack_require__(654);
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

/***/ 675:
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

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(677)
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

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VLink_vue__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_VLink_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_GroupLink_vue__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_GroupLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_GroupLink_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MemberLink__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MemberLink___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_MemberLink__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_theme__ = __webpack_require__(654);
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

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(679)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(681)
/* template */
var __vue_template__ = __webpack_require__(682)
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

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(680);
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

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n.styleAvatar[data-v-401804bf] {\n  position: relative;\n  margin-left: -55px;\n}\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/components/GroupLink.vue"],"names":[],"mappings":";AAAA;EACE,mBAAmB;EACnB,mBAAmB;CAAE","file":"GroupLink.vue","sourcesContent":[".styleAvatar {\n  position: relative;\n  margin-left: -55px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 681:
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

/***/ 682:
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

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(684)
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

/***/ 684:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_theme__ = __webpack_require__(654);
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

/***/ 685:
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

/***/ 686:
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

/***/ 687:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(688)
/* template */
var __vue_template__ = __webpack_require__(689)
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

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(655);
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

/***/ 689:
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

/***/ 690:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(691)
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

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_cookie_law__ = __webpack_require__(692);
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

/***/ 692:
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

/***/ 693:
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

/***/ 694:
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

/***/ 697:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(698), __esModule: true };

/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(699);
module.exports = __webpack_require__(31).Object.values;


/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(60);
var $values = __webpack_require__(700)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ 700:
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

/***/ 703:
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

/***/ 704:
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

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    methods: {
        hasRole: function hasRole(payload) {
            var me = this.$store.getters['auth/getMe'];
            return _.includes(me.roles, payload);
        },
        hasPermission: function hasPermission(payload) {
            var me = this.$store.getters['auth/getMe'];
            return _.includes(me.permissions, payload);
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
        },
        can: function can(permission) {
            return this.$store.getters['auth/getMe'].can[permission];
        }
    }
});

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(807);
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

/***/ 807:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\nthead.datatable__progress[data-v-c5205e8c] {\n    display: none;\n}\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/pages/Dashboard.vue?387dc855"],"names":[],"mappings":";AAsaA;IACA,cAAA;CACA","file":"Dashboard.vue","sourcesContent":["<template>\n  <main-layout  :style=\"{ paddingTop: `100px`, backgroundColor: `white` }\">\n    <v-container  fluid>\n      <dash-panels :unpaid=\"unpaid\" :paid=\"paid\" :sent=\"sent\" :received=\"received\" :total=\"total\" :unsent=\"unsent\" :done=\"done\"></dash-panels>\n      <v-container fluid>\n\n            <v-data-table\n                :headers=\"headers\"\n                :items=\"items\"\n                light\n            >\n            <template slot=\"items\" scope=\"props\">\n            <tr>\n                <td class=\"title text-xs-left primary--text\">\n                    <v-btn color=\"primary\" icon @click=\"props.expanded = !props.expanded\"><v-icon>shopping_basket</v-icon></v-btn>\n                    {{ props.item.id }}\n                </td>\n                <td class=\"title text-xs-left primary--text\">{{ totalAmount(props.item) | currency(currency) }}</td>\n\n                <td class=\"title text-xs-left primary--text\">\n                    <v-switch\n                        :label=\"`${props.item.payment.paid ? 'Paid' : 'Unpaid'}`\"\n                        v-model=\"props.item.payment.paid\"\n                        color=\"teal darken-4\"\n                        light\n                        :disabled=\"!hasRole('admin')\"\n                        @change=\"togglePaid(props.item)\"\n                        >\n                    </v-switch>\n                </td>\n\n                <td class=\"title text-xs-left primary--text\">\n                    <v-switch\n                        :label=\"`${props.item.shipment.sent ? 'Sent' : 'On-Hold'}`\"\n                        v-model=\"props.item.shipment.sent\"\n                        color=\"cyan\"\n                        light\n                        :disabled=\"!hasRole('admin')\"\n                        @change=\"toggleSent(props.item)\"\n                        >\n                    </v-switch>\n                </td>\n                <td class=\"title text-xs-left primary--text\">\n                    <v-switch\n                        :label=\"`${props.item.shipment.received ? 'Received' : 'Pending'}`\"\n                        v-model=\"props.item.shipment.received\"\n                        color=\"light-green\"\n                        light\n                        @change=\"toggleReceived(props.item)\"\n                        >\n                    </v-switch>\n                </td>\n                <td class=\"title text-xs-left primary--text\">\n                    <v-switch\n                        :label=\"`${props.item.done ? 'Completed' : 'On-Progress'}`\"\n                        v-model=\"props.item.done\"\n                        color=\"teal lighten-2\"\n                        light\n                        :disabled=\"!hasRole('admin')\"\n                        @change=\"toggleDone(props.item)\"\n                        >\n                    </v-switch>\n                </td>\n                <td class=\"title text-xs-center\">\n                    <v-btn :disabled=\"!can('edit_order')\"  flat icon color=\"accent\" @click.native=\"setCurrentOrder(props.item)\">\n                        <v-icon>fa-edit</v-icon>\n                    </v-btn>\n                    <v-btn :disabled=\"!can('delete_order')\" flat icon color=\"error\" @click.native=\"deleteOrder(props.item)\">\n                        <v-icon>fa-trash</v-icon>\n                    </v-btn>\n                </td>\n            </tr>\n            </template>\n\n            <template slot=\"expand\" scope=\"props\">\n                <v-data-table\n                    :items=\"getItems(props.item.cart)\"\n                    hide-actions\n                    light\n                    >\n                    <template slot=\"headers\" scope=\"orders\">\n                            <th class=\"text-xs-left\">Product</th>\n                            <th class=\"text-xs-left\">Qty</th>\n                            <th class=\"text-xs-left\">Price</th>\n                            <th class=\"text-xs-left\">Tax</th>\n                            <th class=\"text-xs-left\">Subtotal</th>\n                    </template>\n                        <template slot=\"items\" scope=\"orders\">\n                        <td class=\"text-xs-left\">{{ orders.item.name }}</td>\n                        <td class=\"text-xs-left\">{{ orders.item.qty }}</td>\n                        <td class=\"text-xs-left\">{{ orders.item.price | currency(currency) }}</td>\n                        <td class=\"text-xs-left\">{{ parseFloat(orders.item.tax).toFixed(2) | currency(currency) }}</td>\n                        <td class=\"text-xs-left\">{{ orders.item.subtotal | currency(currency) }}</td>\n                        </template>\n                </v-data-table>\n            </template>\n\n            <template slot=\"pageText\" scope=\"{ pageStart, pageStop }\">\n                From {{ pageStart }} to {{ pageStop }}\n            </template>\n\n            </v-data-table>\n            <v-dialog v-model=\"dialog\" fullscreen transition=\"dialog-bottom-transition\" :overlay=\"false\">\n                <v-card :light=\"true\">\n                <v-toolbar  color=\"accent\">\n                    <v-btn icon @click.native=\"dialog = false\" class=\"error--text\">\n                    <v-icon>close</v-icon>\n                    </v-btn>\n                    <v-spacer></v-spacer>\n                    <v-toolbar-title class=\"primary--text\">Update Order No. {{ current_order.id }}</v-toolbar-title>\n                    <v-spacer></v-spacer>\n                    <v-toolbar-items>\n                    <v-btn  flat @click.native=\"dialog = false\" class=\"info--text\">Save</v-btn>\n                    </v-toolbar-items>\n                </v-toolbar>\n                <v-container fluid>\n                    <v-tabs v-model=\"active.name\">\n                        <v-tabs-bar class=\"accent\">\n                        <v-tabs-item\n                        v-for=\"(tab,key) in tabs\"\n                        :key=\"key\"\n                        :href=\"'#' + tab.name\"\n                        ripple\n                        >\n                        {{tab.name}}\n                        </v-tabs-item>\n                        <v-tabs-slider color=\"primary\"></v-tabs-slider>\n                        </v-tabs-bar>\n                        <v-tabs-items>\n                            <v-tabs-content\n                            v-for=\"(tab, key) in tabs\"\n                            :key=\"key\"\n                            :id=\"tab.name\"\n                            >\n                            <v-card flat :light=\"true\">\n                                <component :is=\"tab.component\" :tab=\"tab\" :order=\"current_order\">\n                                </component>\n                            </v-card>\n                            </v-tabs-content>\n                        </v-tabs-items>\n                    </v-tabs>\n                </v-layout>\n                </v-container>\n                </v-card>\n            </v-dialog>\n      </v-container>\n    </v-container>\n  </main-layout>\n</template>\n\n<script>\nimport MainLayout from '../layouts/Main.vue'\nimport Theme from '../mixins/theme'\nimport Acl from '../mixins/acl'\nimport DashPanels from '../partials/DashPanels.vue'\nimport CustomerDetails from '../components/dashboard/CustomerDetails.vue'\nimport PaymentDetails from '../components/dashboard/PaymentDetails.vue'\nimport ShippingDetails from '../components/dashboard/ShippingDetails.vue'\nimport ShipmentDetails from '../components/dashboard/ShipmentDetails.vue'\nimport FileUploader from '../components/dashboard/FileUploader.vue'\n\nexport default {\n    mixins: [Theme, Acl],\n    components: {\n        MainLayout,\n        DashPanels,\n        CustomerDetails,\n        PaymentDetails,\n        ShippingDetails,\n        ShipmentDetails,\n        FileUploader\n    },\n    data: () => ({\n        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },\n        currency: '₱',\n        dialog: false,\n        /* panels */\n        total: 0,\n        paid: 0,\n        sent: 0,\n        received: 0,\n        done: 0,\n        /* table */\n        headers: [\n            /* remove sort and value since we cant access dot anotation in item */\n            { text: 'Order No.', value: 'id', align: 'left', sortable: true },\n            { text: 'Amount', align: 'left', sortable: false },\n            { text: 'Paid', align: 'left', sortable: false },\n            { text: 'Sent', align: 'left', sortable: false },\n            { text: 'Received', align: 'left', sortable: false },\n            { text: 'Completed', align: 'left', sortable: false },\n            { text: 'Actions', align: 'center', sortable: false }\n        ],\n        items: [],\n        /* current updated item */\n        current_order: {},\n        /* tabs */\n        tabs: [\n            {name: 'customer details', component: 'customer-details'},\n            {name: 'shipping details', component: 'shipping-details'},\n            {name: 'payment details', component: 'payment-details'},\n            {name: 'shipment details', component: 'shipment-details'},\n            {name: 'upload receipt', component: 'file-uploader'}\n        ],\n        active: {\n            name: 'customer details'\n        },\n        toggleForm: new AppForm(App.forms.toggleForm)\n\n    }),\n    computed: {\n        unpaid () {\n            return this.total - this.paid\n        },\n        unsent () {\n            return this.total - this.sent\n        }\n    },\n    mounted () {\n        this.fetchPanelStats()\n    },\n    methods: {\n        deleteOrder (order) {\n            let self = this\n            if (self.can('delete_order') || self.hasRole('admin')) {\n                axios.post(route('api.order.destroy', {order: order.id})).then(() => {\n                    self.total = self.total - 1\n                    if (self.total < 0) {\n                        self.total = 0\n                    }\n                    if (order.payment.paid) {\n                        self.paid = self.paid - 1\n                        if (self.paid < 0) {\n                            self.paid = 0\n                        }\n                    }\n                    if (order.shipment.sent) {\n                        self.sent = self.sent - 1\n                        if (self.sent < 0) {\n                            self.sent = 0\n                        }\n                    }\n                    if (order.shipment.received) {\n                        self.received = self.received - 1\n                        if (self.received < 0) {\n                            self.received = 0\n                        }\n                    }\n                    if (order.done) {\n                        self.done = self.done - 1\n                        if (self.done < 0) {\n                            self.done = 0\n                        }\n                    }\n                    let index = _.findIndex(self.items, { id: order.id })\n                    self.$delete(self.items, index)\n                    vm.$popup({ message: `Order#${order.id} Deleted!`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n                }).catch(({errors, message}) => {\n                    if (errors) {\n                        console.log(errors)\n                    }\n                    if (message) {\n                        console.log(message)\n                    }\n                })\n            } else {\n                vm.$popup({ message: 'Action Not Authorized!', backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n            }\n        },\n        resetToggleForm () {\n            this.toggleForm = new AppForm(App.forms.toggleForm)\n        },\n        togglePaid (order) {\n            let self = this\n            self.toggleForm.toggle = order.payment.paid\n            App.post(route('api.toggle.paid', {order: order.id}), self.toggleForm).then(({message}) => {\n                if (order.payment.paid) {\n                    this.paid = this.paid + 1\n                } else {\n                    this.paid = this.paid - 1\n                }\n                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n            }).catch(({errors, message}) => {\n                if (errors) {\n                    console.log(errors)\n                }\n                if (message) {\n                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n                }\n                order.payment.paid = !order.payment.paid\n            })\n        },\n        toggleSent (order) {\n            let self = this\n            self.toggleForm.toggle = order.shipment.sent\n            App.post(route('api.toggle.sent', {order: order.id}), self.toggleForm).then(({message}) => {\n                if (order.shipment.sent) {\n                    this.sent = this.sent + 1\n                } else {\n                    this.sent = this.sent - 1\n                }\n                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n            }).catch(({errors, message}) => {\n                if (errors) {\n                    console.log(errors)\n                }\n                if (message) {\n                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n                }\n                order.shipment.sent = !order.shipment.sent\n            })\n        },\n        toggleReceived (order) {\n            let self = this\n            self.toggleForm.toggle = order.shipment.received\n            App.post(route('api.toggle.received', {order: order.id}), self.toggleForm).then(({message}) => {\n                if (order.shipment.received) {\n                    this.received = this.received + 1\n                } else {\n                    this.received = this.received - 1\n                }\n                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n            }).catch(({errors, message}) => {\n                if (errors) {\n                    console.log(errors)\n                }\n                if (message) {\n                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n                }\n                order.shipment.received = !order.shipment.received\n            })\n            console.log('toggle received', order.shipment.received)\n        },\n        toggleDone (order) {\n            let self = this\n            self.toggleForm.toggle = order.done\n            App.post(route('api.toggle.done', {order: order.id}), self.toggleForm).then(({message}) => {\n                if (order.done) {\n                    this.done = this.done + 1\n                } else {\n                    this.done = this.done - 1\n                }\n                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })\n            }).catch(({errors, message}) => {\n                if (errors) {\n                    console.log(errors)\n                }\n                if (message) {\n                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })\n                }\n                order.done = !order.done\n            })\n        },\n        parseNumber (str) {\n            var strg = str || ''\n            var decimal = '.'\n            strg = strg.replace(/[^0-9$.,]/g, '')\n            if (strg.indexOf(',') > strg.indexOf('.')) decimal = ','\n            if ((strg.match(new RegExp('\\\\' + decimal, 'g')) || []).length > 1) decimal = ''\n            if (decimal !== '' && (strg.length - strg.indexOf(decimal) - 1 == 3) && strg.indexOf('0' + decimal) !== 0) decimal = ''\n            strg = strg.replace(new RegExp('[^0-9$' + decimal + ']', 'g'), '')\n            strg = strg.replace(',', '.')\n            return parseFloat(strg)\n        },\n        getCart (cart) {\n            return JSON.parse(cart)\n        },\n        getItems (cart) {\n            return Object.values(JSON.parse(cart)['items'])\n        },\n        setCurrentOrder (order) {\n            this.dialog = true\n            this.current_order = order\n            let fileUploader = {\n                requestKey: 'file',\n                multiple: false,\n                putUrl: ``,\n                postUrl: `${route('api.media.receiptUploader', {order: this.current_order.id})}`\n            }\n            /* Check for Shipment Type if Meet Up Or Pick Up Remove Shipping Details From Tabs */\n            let customer = Object.assign({name: 'customer details', component: 'customer-details'}, JSON.parse(this.current_order.customer_details))\n            let shipping = Object.assign({name: 'shipping details', component: 'shipping-details'}, JSON.parse(this.current_order.shipping_details))\n            let payment = Object.assign({name: 'payment details', component: 'payment-details'}, this.current_order.payment)\n            let shipment = Object.assign({name: 'shipment details', component: 'shipment-details'}, this.current_order.shipment)\n            let uploads = Object.assign({name: 'upload receipt', component: 'file-uploader'}, fileUploader)\n            this.tabs = [\n                customer,\n                shipping,\n                payment,\n                shipment,\n                uploads\n            ]\n        },\n        fetchPanelStats () {\n            let self = this\n            axios.get(route('api.panel.stats')).then((response) => {\n                self.items = response.data.orders\n                self.total = response.data.total\n                self.sent = response.data.sent\n                self.paid = response.data.paid\n                self.received = response.data.received\n                self.done = response.data.done\n            })\n        },\n        totalAmount (item) {\n            let cart = JSON.parse(item.cart)\n            let total = this.parseNumber(cart.total) + parseFloat(item.shipment.shipping_fee)\n            return total.toFixed(2)\n        }\n    },\n    watch: {\n        items: {\n            handler: function () {\n                console.log('items changed')\n            },\n            deep: true\n        }\n    }\n}\n</script>\n\n<style scoped>\nthead.datatable__progress {\n    display: none;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 808:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__layouts_Main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_theme__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_acl__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__partials_DashPanels_vue__ = __webpack_require__(809);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__partials_DashPanels_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__partials_DashPanels_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_dashboard_CustomerDetails_vue__ = __webpack_require__(812);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_dashboard_CustomerDetails_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_dashboard_CustomerDetails_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_dashboard_PaymentDetails_vue__ = __webpack_require__(817);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_dashboard_PaymentDetails_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_dashboard_PaymentDetails_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_dashboard_ShippingDetails_vue__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_dashboard_ShippingDetails_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_dashboard_ShippingDetails_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_dashboard_ShipmentDetails_vue__ = __webpack_require__(827);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_dashboard_ShipmentDetails_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_dashboard_ShipmentDetails_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_dashboard_FileUploader_vue__ = __webpack_require__(840);
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
        this.fetchPanelStats();
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
            var fileUploader = {
                requestKey: 'file',
                multiple: false,
                putUrl: '',
                postUrl: '' + route('api.media.receiptUploader', { order: this.current_order.id })
                /* Check for Shipment Type if Meet Up Or Pick Up Remove Shipping Details From Tabs */
            };var customer = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default()({ name: 'customer details', component: 'customer-details' }, JSON.parse(this.current_order.customer_details));
            var shipping = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default()({ name: 'shipping details', component: 'shipping-details' }, JSON.parse(this.current_order.shipping_details));
            var payment = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default()({ name: 'payment details', component: 'payment-details' }, this.current_order.payment);
            var shipment = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default()({ name: 'shipment details', component: 'shipment-details' }, this.current_order.shipment);
            var uploads = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_assign___default()({ name: 'upload receipt', component: 'file-uploader' }, fileUploader);
            this.tabs = [customer, shipping, payment, shipment, uploads];
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
            var total = this.parseNumber(cart.total) + parseFloat(item.shipment.shipping_fee);
            return total.toFixed(2);
        }
    },
    watch: {
        items: {
            handler: function handler() {
                console.log('items changed');
            },
            deep: true
        }
    }
});

/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(810)
/* template */
var __vue_template__ = __webpack_require__(811)
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

/***/ 810:
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

/***/ 811:
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

/***/ 812:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(813)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(815)
/* template */
var __vue_template__ = __webpack_require__(816)
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

/***/ 813:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(814);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("b6fcc66a", content, false);
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

/***/ 814:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"CustomerDetails.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_json_stringify__ = __webpack_require__(313);
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

/***/ 816:
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

/***/ 817:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(818)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(820)
/* template */
var __vue_template__ = __webpack_require__(821)
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

/***/ 818:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(819);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("6fe572b1", content, false);
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

/***/ 819:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"PaymentDetails.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 820:
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

/***/ 821:
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

/***/ 822:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(823)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(825)
/* template */
var __vue_template__ = __webpack_require__(826)
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

/***/ 823:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(824);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("44313b78", content, false);
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

/***/ 824:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ShippingDetails.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_json_stringify__ = __webpack_require__(313);
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

/***/ 826:
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

/***/ 827:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(828)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(830)
/* template */
var __vue_template__ = __webpack_require__(831)
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

/***/ 828:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(829);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("7a31cbbf", content, false);
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

/***/ 829:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ShipmentDetails.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 830:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_acl__ = __webpack_require__(706);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ 831:
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

/***/ 832:
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
                attrs: { headers: _vm.headers, items: _vm.items, light: "" },
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
                              _c("v-switch", {
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
                                    _vm._v(_vm._s(orders.item.name))
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

/***/ }),

/***/ 840:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(841)
/* template */
var __vue_template__ = __webpack_require__(842)
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

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xkeshi_image_compressor__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xkeshi_image_compressor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__xkeshi_image_compressor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_upload_component__ = __webpack_require__(704);
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
        this.prepareTab();
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
        prepareTab: function prepareTab() {
            this.postAction = this.tab.postUrl ? this.tab.postUrl : ' /uploads/post';
            this.putAction = this.tab.putUrl ? this.tab.putUrl : null;
            this.name = this.tab.requestKey ? this.tab.requestKey : 'file';
            this.multiple = !!this.tab.multiple;
            this.headers['Authorization'] = 'Bearer ' + this.$cookie.get('access_token');
        },
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
                // update

                if (newFile.active && !oldFile.active) {
                    // beforeSend

                    // min size
                    if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
                        this.$refs.upload.update(newFile, { error: 'size' });
                    }
                }

                if (newFile.progress !== oldFile.progress) {
                    // progress
                }

                if (newFile.error && !oldFile.error) {
                    // error
                }

                if (newFile.success && !oldFile.success) {
                    // success
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

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9EYXNoYm9hcmQudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9taXhpbnMvdGhlbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9sYXlvdXRzL01haW4udnVlIiwid2VicGFjazovLy9NYWluLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcEZvb3Rlci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlP2M0ZDYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlP2VjZjEiLCJ3ZWJwYWNrOi8vL0FwcEZvb3Rlci52dWUiLCJ3ZWJwYWNrOi8vL1ZMaW5rLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVkxpbmsudnVlP2Q5MWIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlPzYxMTIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBOYXZCYXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT83ZTJiIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT8xNDQxIiwid2VicGFjazovLy9BcHBOYXZCYXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZT83MDhmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlIiwid2VicGFjazovLy9MZWZ0U2lkZUJhci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0dyb3VwTGluay52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0dyb3VwTGluay52dWU/MjBmOSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvR3JvdXBMaW5rLnZ1ZT83MTIzIiwid2VicGFjazovLy9Hcm91cExpbmsudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9Hcm91cExpbmsudnVlP2E2NDIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL01lbWJlckxpbmsudnVlIiwid2VicGFjazovLy9NZW1iZXJMaW5rLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvTWVtYmVyTGluay52dWU/ZDJkNiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0xlZnRTaWRlQmFyLnZ1ZT8yODUwIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9GYWJCdXR0b24udnVlIiwid2VicGFjazovLy9GYWJCdXR0b24udnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9GYWJCdXR0b24udnVlPzYwNTYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9Db29raWVMYXcudnVlIiwid2VicGFjazovLy9Db29raWVMYXcudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtY29va2llLWxhdy9kaXN0L3Z1ZS1jb29raWUtbGF3LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQ29va2llTGF3LnZ1ZT80Y2Y0Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9NYWluLnZ1ZT85N2MxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3ZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AeGtlc2hpL2ltYWdlLWNvbXByZXNzb3IvZGlzdC9pbWFnZS1jb21wcmVzc29yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtdXBsb2FkLWNvbXBvbmVudC9kaXN0L3Z1ZS11cGxvYWQtY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbWl4aW5zL2FjbC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0Rhc2hib2FyZC52dWU/MjU3OCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0Rhc2hib2FyZC52dWU/MmE2OSIsIndlYnBhY2s6Ly8vRGFzaGJvYXJkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0Rhc2hQYW5lbHMudnVlIiwid2VicGFjazovLy9EYXNoUGFuZWxzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0Rhc2hQYW5lbHMudnVlPzg4YmUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9DdXN0b21lckRldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvQ3VzdG9tZXJEZXRhaWxzLnZ1ZT8xOGYzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvQ3VzdG9tZXJEZXRhaWxzLnZ1ZT8yZjI1Iiwid2VicGFjazovLy9DdXN0b21lckRldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvQ3VzdG9tZXJEZXRhaWxzLnZ1ZT9iZTRmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvUGF5bWVudERldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvUGF5bWVudERldGFpbHMudnVlPzhkNzAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9QYXltZW50RGV0YWlscy52dWU/ODkwMCIsIndlYnBhY2s6Ly8vUGF5bWVudERldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvUGF5bWVudERldGFpbHMudnVlP2VlNzgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwcGluZ0RldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcHBpbmdEZXRhaWxzLnZ1ZT8xZTg5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcHBpbmdEZXRhaWxzLnZ1ZT9kOWEzIiwid2VicGFjazovLy9TaGlwcGluZ0RldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcHBpbmdEZXRhaWxzLnZ1ZT82YzY2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcG1lbnREZXRhaWxzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBtZW50RGV0YWlscy52dWU/N2Q3YyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBtZW50RGV0YWlscy52dWU/N2QwZiIsIndlYnBhY2s6Ly8vU2hpcG1lbnREZXRhaWxzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBtZW50RGV0YWlscy52dWU/ZGVhYyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0Rhc2hib2FyZC52dWU/NjVmZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL0ZpbGVVcGxvYWRlci52dWUiLCJ3ZWJwYWNrOi8vL0ZpbGVVcGxvYWRlci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9GaWxlVXBsb2FkZXIudnVlP2ZjMjAiXSwibmFtZXMiOlsiZGF0YSIsImRhcmtDbGFzcyIsIkFwcCIsInRoZW1lIiwiZGFyayIsInByaW1hcnlDbGFzcyIsInByaW1hcnkiLCJhY2NlbnRDbGFzcyIsImFjY2VudCIsInNlY29uZGFyeUNsYXNzIiwic2Vjb25kYXJ5IiwiaW5mb0NsYXNzIiwiaW5mbyIsIndhcm5pbmdDbGFzcyIsIndhcm5pbmciLCJlcnJvckNsYXNzIiwiZXJyb3IiLCJzdWNjZXNzQ2xhc3MiLCJzdWNjZXNzIiwidG9nZ2xlQmFyU3R5bGUiLCJzaXRlIiwidGl0bGVTdHlsZSIsIm5hdmJhclN0eWxlIiwiZm9vdGVyU3R5bGUiLCJzaWRlYmFyU3R5bGUiLCJkb21haW4iLCJ5ZWFyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwidHJhZGVtYXJrIiwibG9nbyIsInVybCIsImxvZ29TdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2hvd0xvZ28iLCJzaG93Iiwic2hvd0ljb24iLCJpY29uIiwibmFtZSIsImljb25Db2xvciIsImNvbG9yIiwidGl0bGUiLCJjb21wdXRlZCIsImlzRGFyayIsIm1ldGhvZHMiLCJoYXNSb2xlIiwicGF5bG9hZCIsIm1lIiwiJHN0b3JlIiwiZ2V0dGVycyIsIl8iLCJpbmNsdWRlcyIsInJvbGVzIiwiaGFzUGVybWlzc2lvbiIsInBlcm1pc3Npb25zIiwiaGFzQW55UGVybWlzc2lvbiIsInNvbWUiLCJwIiwiaGFzQW55Um9sZSIsInIiLCJoYXNBbGxSb2xlcyIsImRpZmZlcmVuY2UiLCJsZW5ndGgiLCJoYXNBbGxQZXJtaXNzaW9ucyIsImNhbiIsInBlcm1pc3Npb24iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnQkFBZ0I7QUFDbkQsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9CQUFvQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsY0FBYzs7QUFFbEU7QUFDQTs7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0EseUJBQWtNO0FBQ2xNO0FBQ0E7QUFDQTtBQUNBLDRDQUFvTDtBQUNwTDtBQUNBLDhDQUFpSjtBQUNqSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNEQUFzRCxJQUFJO0FBQ3pJLG1DQUFtQzs7QUFFbkM7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBLGdCQUFnQixtQkFBbUIsYUFBYSwwQkFBMEI7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0Es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OztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxXQUFXOztBQUUvQztBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsVUFBVSxFQUFFO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxtREFBbUQsRUFBRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsVUFBVSxFQUFFO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxtREFBbUQsRUFBRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLFVBQVUsRUFBRTtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsbURBQW1ELEVBQUU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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RTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVMsbURBQW1ELEVBQUU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTLFVBQVUsRUFBRTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVMsbURBQW1ELEVBQUU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTLFVBQVUsRUFBRTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVMsbURBQW1ELEVBQUU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTLFVBQVUsRUFBRTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVMsbURBQW1ELEVBQUU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLFdBQVcsRUFBRTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNjMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNSA2IDggMTcgMjIgMjMgMjQgMjUgMjYiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWM1MjA1ZThjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vRGFzaGJvYXJkLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9EYXNoYm9hcmQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1jNTIwNWU4Y1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0Rhc2hib2FyZC52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi1jNTIwNWU4Y1wiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxwYWdlc1xcXFxEYXNoYm9hcmQudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBEYXNoYm9hcmQudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LWM1MjA1ZThjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtYzUyMDVlOGNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2NTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDYgOCAxNyAyMiAyMyAyNCAyNSAyNiIsIi8qKlxuICogRXhwb3J0IHRoZSBBbnkgQ29tcG9uZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICBkYXJrQ2xhc3M6IEFwcC50aGVtZS5kYXJrLFxuICAgICAgICBwcmltYXJ5Q2xhc3M6IEFwcC50aGVtZS5wcmltYXJ5LFxuICAgICAgICBhY2NlbnRDbGFzczogQXBwLnRoZW1lLmFjY2VudCxcbiAgICAgICAgc2Vjb25kYXJ5Q2xhc3M6IEFwcC50aGVtZS5zZWNvbmRhcnksXG4gICAgICAgIGluZm9DbGFzczogQXBwLnRoZW1lLmluZm8sXG4gICAgICAgIHdhcm5pbmdDbGFzczogQXBwLnRoZW1lLndhcm5pbmcsXG4gICAgICAgIGVycm9yQ2xhc3M6IEFwcC50aGVtZS5lcnJvcixcbiAgICAgICAgc3VjY2Vzc0NsYXNzOiBBcHAudGhlbWUuc3VjY2VzcyxcbiAgICAgICAgdG9nZ2xlQmFyU3R5bGU6IEFwcC5zaXRlLnRvZ2dsZUJhclN0eWxlLFxuICAgICAgICB0aXRsZVN0eWxlOiBBcHAuc2l0ZS50aXRsZVN0eWxlLFxuICAgICAgICBuYXZiYXJTdHlsZTogQXBwLnNpdGUubmF2YmFyU3R5bGUsXG4gICAgICAgIGZvb3RlclN0eWxlOiBBcHAuc2l0ZS5mb290ZXJTdHlsZSxcbiAgICAgICAgc2lkZWJhclN0eWxlOiBBcHAuc2l0ZS5zaWRlYmFyU3R5bGUsXG4gICAgICAgIGRvbWFpbjogQXBwLnNpdGUuZG9tYWluLFxuICAgICAgICB5ZWFyOiAobmV3IERhdGUoKSkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgdHJhZGVtYXJrOiBBcHAuc2l0ZS50cmFkZW1hcmssXG4gICAgICAgIGxvZ286IEFwcC5zaXRlLmxvZ28udXJsLFxuICAgICAgICBsb2dvU3R5bGU6IHtcbiAgICAgICAgICAgIHdpZHRoOiBBcHAuc2l0ZS5sb2dvLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBBcHAuc2l0ZS5sb2dvLmhlaWdodFxuICAgICAgICB9LFxuICAgICAgICBzaG93TG9nbzogQXBwLnNpdGUubG9nby5zaG93LFxuICAgICAgICBzaG93SWNvbjogQXBwLnNpdGUuaWNvbi5zaG93LFxuICAgICAgICBpY29uOiBBcHAuc2l0ZS5pY29uLm5hbWUgPyBBcHAuc2l0ZS5pY29uLm5hbWUgOiBudWxsLFxuICAgICAgICBpY29uQ29sb3I6IEFwcC5zaXRlLmljb24uY29sb3IsXG4gICAgICAgIHRpdGxlOiBBcHAuc2l0ZS50cmFkZW1hcmtcbiAgICB9KSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBpc0RhcmsgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGFya0NsYXNzID09PSB0cnVlXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbWl4aW5zL3RoZW1lLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiKTtcblxudmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2Fzc2lnbjIuZGVmYXVsdCB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanNcbi8vIG1vZHVsZSBpZCA9IDY1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgNiA4IDEzIDE0IDE1IDE2IDE4IDIyIDIzIDI0IDI1IDI2IDI3IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNSA2IDggMTMgMTQgMTUgMTYgMTggMjIgMjMgMjQgMjUgMjYgMjciLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDY1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgNiA4IDEzIDE0IDE1IDE2IDE4IDIyIDIzIDI0IDI1IDI2IDI3IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDYgOCAxMyAxNCAxNSAxNiAxOCAyMiAyMyAyNCAyNSAyNiAyNyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDY1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgNiA4IDEzIDE0IDE1IDE2IDE4IDIyIDIzIDI0IDI1IDI2IDI3IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vVkxpbmsudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi02YjQxMWViNlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9WTGluay52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGNvbXBvbmVudHNcXFxcVkxpbmsudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBWTGluay52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNmI0MTFlYjZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi02YjQxMWViNlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL1ZMaW5rLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNSA4IDIyIDIzIDI0IDI1IDI2IiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDYgOCAxNyAyMiAyMyAyNCAyNSAyNiIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL01haW4udnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1lOGYxNGFjNFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9NYWluLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcbGF5b3V0c1xcXFxNYWluLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gTWFpbi52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtZThmMTRhYzRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi1lOGYxNGFjNFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9sYXlvdXRzL01haW4udnVlXG4vLyBtb2R1bGUgaWQgPSA2NjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDggMjIgMjMgMjQgMjUgMjYiLCI8dGVtcGxhdGU+XG4gPHYtYXBwIDpkYXJrPVwiQXBwLnRoZW1lLmRhcmtcIiAgc3RhbmRhbG9uZSB2LWNsb2FrPlxuICAgIDxsZWZ0LXNpZGUtYmFyPjwvbGVmdC1zaWRlLWJhcj5cbiAgICA8YXBwLW5hdi1iYXI+PC9hcHAtbmF2LWJhcj5cbiAgICA8bWFpbj5cbiAgICA8IS0tIGFkZGVkIGZsdWlkIGFuZCBwYS0wIG1hLTAgZm9yIGZ1bGwgc2NyZWVuIHBhZ2VzIC0tPlxuICAgICAgPHYtY29udGFpbmVyIHRyYW5zaXRpb249XCJzbGlkZS14LXRyYW5zaXRpb25cIiBmbHVpZCBjbGFzcz1cInBhLTAgbWEtMFwiPlxuICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgIDwvdi1jb250YWluZXI+XG4gICAgPC9tYWluPlxuICAgIDwhLS0gPHNob3BwaW5nLWNhcnQ+PC9zaG9wcGluZy1jYXJ0PiAtLT5cbiAgICA8ZmFiLWJ1dHRvbj48L2ZhYi1idXR0b24+XG4gICAgPGNvb2tpZS1sYXc+PC9jb29raWUtbGF3PlxuICAgIDxhcHAtZm9vdGVyPjwvYXBwLWZvb3Rlcj5cbiAgPC92LWFwcD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQXBwRm9vdGVyIGZyb20gJy4uL3BhcnRpYWxzL0FwcEZvb3Rlci52dWUnXG5pbXBvcnQgQXBwTmF2QmFyIGZyb20gJy4uL3BhcnRpYWxzL0FwcE5hdkJhci52dWUnXG5pbXBvcnQgTGVmdFNpZGVCYXIgZnJvbSAnLi4vcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlJ1xuaW1wb3J0IEZhYkJ1dHRvbiBmcm9tICcuLi9jb21wb25lbnRzL0ZhYkJ1dHRvbi52dWUnXG5pbXBvcnQgQ29va2llTGF3IGZyb20gJy4uL3BhcnRpYWxzL0Nvb2tpZUxhdy52dWUnXG4vLyBpbXBvcnQgU2hvcHBpbmdDYXJ0IGZyb20gJy4uL3BhcnRpYWxzL1Nob3BwaW5nQ2FydC52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEFwcEZvb3RlcixcbiAgICAgICAgQXBwTmF2QmFyLFxuICAgICAgICBMZWZ0U2lkZUJhcixcbiAgICAgICAgRmFiQnV0dG9uLFxuICAgICAgICBDb29raWVMYXdcbiAgICAgICAgLy8gU2hvcHBpbmdDYXJ0XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gTWFpbi52dWU/ZmQzNWVlMzAiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTkxN2FlMDA0XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcEZvb3Rlci52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQXBwRm9vdGVyLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTE3YWUwMDRcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQXBwRm9vdGVyLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHBhcnRpYWxzXFxcXEFwcEZvb3Rlci52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIEFwcEZvb3Rlci52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtOTE3YWUwMDRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi05MTdhZTAwNFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBGb290ZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDggMjIgMjMgMjQgMjUgMjYiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTE3YWUwMDRcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwRm9vdGVyLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMGIxNTMyYTdcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTE3YWUwMDRcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwRm9vdGVyLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05MTdhZTAwNFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBGb290ZXIudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTkxN2FlMDA0XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcEZvb3Rlci52dWVcbi8vIG1vZHVsZSBpZCA9IDY2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgOCAyMiAyMyAyNCAyNSAyNiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwiQXBwRm9vdGVyLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTkxN2FlMDA0XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0FwcEZvb3Rlci52dWVcbi8vIG1vZHVsZSBpZCA9IDY2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgOCAyMiAyMyAyNCAyNSAyNiIsIjx0ZW1wbGF0ZT5cbjx2LWZvb3RlciA6Y2xhc3M9XCJbZm9vdGVyQ2xhc3NdXCI+XG48di1zcGFjZXI+PC92LXNwYWNlcj48c3Bhbj7CqSB7eyB5ZWFyIH19IHt7IGRvbWFpbiB9fSDCriB8IHt7IHRyYWRlbWFyayB9feKEojwvc3Bhbj48di1zcGFjZXI+PC92LXNwYWNlcj5cbjwvdi1mb290ZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcbmltcG9ydCBWTGluayBmcm9tICcuLi9jb21wb25lbnRzL1ZMaW5rLnZ1ZSdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtaXhpbnM6IFtUaGVtZV0sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZm9vdGVyQ2xhc3M6IHsncHJpbWFyeS0tdGV4dCc6IHRydWV9XG4gICAgfSksXG4gICAgY3JlYXRlZCAoKSB7XG4gICAgICAgIC8qIEVtaXQgT24gYSBDaGlsZCBDb21wb25lbnQgSWYgWW91IFdhbnQgVGhpcyBUbyBCZSBWaXNpYmxlICovXG4gICAgICAgIEJ1cy4kb24oJ2Zvb3Rlci1jb250ZW50LXZpc2libGUnLCAodmlzaWJpbGl0eSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50VmlzaWJsZSA9IHZpc2liaWxpdHlcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgVkxpbmtcbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEFwcEZvb3Rlci52dWU/NTJjZDI4MTAiLCI8dGVtcGxhdGU+XG4gICAgPHYtbGlzdC10aWxlICBAY2xpY2submF0aXZlPVwibmF2aWdhdGUoaHJlZilcIj5cbiAgICAgICAgICA8di1saXN0LXRpbGUtYWN0aW9uIHYtaWY9XCJpY29uXCI+XG4gICAgICAgICAgICA8di1pY29uIDpzdHlsZT1cIntjb2xvcjogaXNBY3RpdmUgPyBhY3RpdmVDb2xvciA6IGljb25Db2xvciwgY3Vyc29yOiBocmVmID8gJ3BvaW50ZXInIDogJyd9XCI+e3sgaWNvbiB9fTwvdi1pY29uPlxuICAgICAgICAgIDwvdi1saXN0LXRpbGUtYWN0aW9uPlxuICAgICAgICAgIDx2LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLXRpdGxlICA6c3R5bGU9XCJ7Y29sb3I6IGlzQWN0aXZlID8gYWN0aXZlQ29sb3IgOiBsaW5rQ29sb3J9XCI+XG4gICAgICAgICAgICAgIDxzcGFuIDpzdHlsZT1cIntjdXJzb3I6IGhyZWYgPyAncG9pbnRlcicgOiAnJ31cIj57eyB0aXRsZSAgfX08L3NwYW4+XG4gICAgICAgICAgICA8L3YtbGlzdC10aWxlLXRpdGxlPlxuICAgICAgICAgIDwvdi1saXN0LXRpbGUtY29udGVudD5cbiAgICA8L3YtbGlzdC10aWxlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczoge1xuICAgICAgICBkYXJrOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFwcC50aGVtZS5kYXJrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGhyZWY6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgICB9LFxuICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgICAgIH0sXG4gICAgICAgIGljb246IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgICB9LFxuICAgICAgICBpY29uQ29sb3I6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhcmsgPyAnI2ZhZmFmYScgOiAnIzc4OTA5QycgLy8gd2hpdGUgb3IgYmx1ZS1ncmV5IGxpZ2h0ZW4tMVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsaW5rQ29sb3I6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhcmsgPyAnI2ZhZmFmYScgOiAnIzc4OTA5QycgLy8gd2hpdGUgb3IgYmx1ZS1ncmV5IGxpZ2h0ZW4tMVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhY3RpdmVDb2xvcjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcjNGRiNmFjJyAvLyB0ZWFsIGxpZ2h0ZW4gMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBpc0FjdGl2ZSAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ocmVmID09PSB0aGlzLiRyb3V0ZS5wYXRoXG4gICAgICAgIH0sXG4gICAgICAgIGlzRGFyayAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXJrID09PSB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbmF2aWdhdGUgKGhyZWYpIHtcbiAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHsgcGF0aDogYCR7aHJlZn1gIH0pXG4gICAgICAgIH1cblxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFZMaW5rLnZ1ZT8yYmM5Mzk4ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxpc3QtdGlsZVwiLFxuICAgIHtcbiAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICBfdm0ubmF2aWdhdGUoX3ZtLmhyZWYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF92bS5pY29uXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGlzdC10aWxlLWFjdGlvblwiLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtaWNvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBfdm0uaXNBY3RpdmUgPyBfdm0uYWN0aXZlQ29sb3IgOiBfdm0uaWNvbkNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IF92bS5ocmVmID8gXCJwb2ludGVyXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uaWNvbikpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxpc3QtdGlsZS1jb250ZW50XCIsXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1saXN0LXRpbGUtdGl0bGVcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHsgY29sb3I6IF92bS5pc0FjdGl2ZSA/IF92bS5hY3RpdmVDb2xvciA6IF92bS5saW5rQ29sb3IgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3R5bGU6IHsgY3Vyc29yOiBfdm0uaHJlZiA/IFwicG9pbnRlclwiIDogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS50aXRsZSkpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTZiNDExZWI2XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02YjQxMWViNlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9WTGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgOCAyMiAyMyAyNCAyNSAyNiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWZvb3RlclwiLFxuICAgIHsgY2xhc3M6IFtfdm0uZm9vdGVyQ2xhc3NdIH0sXG4gICAgW1xuICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgIF92bS5fdihcbiAgICAgICAgICBcIsKpIFwiICtcbiAgICAgICAgICAgIF92bS5fcyhfdm0ueWVhcikgK1xuICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgX3ZtLl9zKF92bS5kb21haW4pICtcbiAgICAgICAgICAgIFwiIMKuIHwgXCIgK1xuICAgICAgICAgICAgX3ZtLl9zKF92bS50cmFkZW1hcmspICtcbiAgICAgICAgICAgIFwi4oSiXCJcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICBfYyhcInYtc3BhY2VyXCIpXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTkxN2FlMDA0XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi05MTdhZTAwNFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwRm9vdGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNSA4IDIyIDIzIDI0IDI1IDI2IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi04ZGE1Njg1YVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9BcHBOYXZCYXIudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0FwcE5hdkJhci52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LThkYTU2ODVhXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0FwcE5hdkJhci52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxwYXJ0aWFsc1xcXFxBcHBOYXZCYXIudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBBcHBOYXZCYXIudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LThkYTU2ODVhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtOGRhNTY4NWFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNSA4IDIyIDIzIDI0IDI1IDI2IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LThkYTU2ODVhXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcE5hdkJhci52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjMyOTdlYmUyXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LThkYTU2ODVhXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcE5hdkJhci52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOGRhNTY4NWFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXBwTmF2QmFyLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi04ZGE1Njg1YVwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBOYXZCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDggMjIgMjMgMjQgMjUgMjYiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIkFwcE5hdkJhci52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi04ZGE1Njg1YVwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9BcHBOYXZCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDggMjIgMjMgMjQgMjUgMjYiLCI8dGVtcGxhdGU+XG4gIDx2LXRvb2xiYXIgOnN0eWxlPVwibmF2YmFyU3R5bGVcIiA6ZGFyaz1cIiFpc0RhcmtcIiBmaXhlZD5cbiAgICA8di10b29sYmFyLXNpZGUtaWNvbiA6c3R5bGU9XCJ0b2dnbGVCYXJTdHlsZVwiIEBjbGljay5uYXRpdmUuc3RvcD1cInRvZ2dsZURyYXdlcigpXCI+PC92LXRvb2xiYXItc2lkZS1pY29uPlxuICAgICAgICA8IS0tIFRpdGxlIC0tPlxuICAgICAgICA8di10b29sYmFyLXRpdGxlIHYtaWY9XCJleHRlbnNpb25cIiBjbGFzcz1cInRleHQteHMtY2VudGVyXCIgc2xvdD1cImV4dGVuc2lvblwiPlxuICAgICAgICAgICAgPHYtaWNvbiA6c3R5bGU9XCJ7Y29sb3I6IGljb25Db2xvciB9XCIgY2xhc3M9XCJtbC0zIGhpZGRlbi1tZC1hbmQtZG93blwiIHYtaWY9XCJzaG93SWNvblwiPnt7IGljb24gfX08L3YtaWNvbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGlkZGVuLW1kLWFuZC1kb3duXCIgOnN0eWxlPVwidGl0bGVTdHlsZVwiPnt7IHRpdGxlIH19PC9zcGFuPlxuICAgICAgICA8L3YtdG9vbGJhci10aXRsZT5cbiAgICAgICAgPHYtdG9vbGJhci10aXRsZSB2LWVsc2UgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlclwiPlxuICAgICAgICAgICAgPHYtaWNvbiA6c3R5bGU9XCJ7Y29sb3I6IGljb25Db2xvciB9XCIgY2xhc3M9XCJtbC0zIGhpZGRlbi1tZC1hbmQtZG93blwiIHYtaWY9XCJzaG93SWNvblwiPnt7IGljb24gfX08L3YtaWNvbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGlkZGVuLW1kLWFuZC1kb3duXCIgOnN0eWxlPVwidGl0bGVTdHlsZVwiPnt7IHRpdGxlIH19PC9zcGFuPlxuICAgICAgICA8L3YtdG9vbGJhci10aXRsZT5cbiAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgICAgIDwhLS0gY2VudGVyIGxvZ28gLS0+XG4gICAgICAgIDxpbWcgdi1pZj1cInNob3dMb2dvXCIgICA6c3JjPVwibG9nb1wiIDpzdHlsZT1cIltsb2dvU3R5bGVdXCIgIGFsdD1cInZ1ZWpzXCI+XG4gICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICA8IS0tIEFkZCBIZXJlIEFsbCBZb3VyIE5hdiBJY29ucyAtLT5cblxuICAgICAgICA8di10b29sdGlwIGxlZnQ+XG4gICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJlcnJvclwiIHNsb3Q9XCJhY3RpdmF0b3JcIiBAY2xpY2s9XCJlbXB0eUNhcnQoKVwiIHYtaWY9XCJjb3VudCA+IDBcIj5cbiAgICAgICAgPHYtaWNvbj5yZW1vdmVfc2hvcHBpbmdfY2FydDwvdi1pY29uPlxuICAgICAgICA8L3YtYnRuPlxuICAgICAgICA8c3Bhbj5FbXB0eSB8IENhcnQ8L3NwYW4+XG4gICAgICAgIDwvdi10b29sdGlwPlxuICAgICAgICA8di10b29sdGlwIGxlZnQ+XG4gICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJwcmltYXJ5XCIgc2xvdD1cImFjdGl2YXRvclwiIEBjbGljaz1cIm9wZW5DYXJ0KClcIj5cbiAgICAgICAgPHYtYmFkZ2UgbGVmdD5cbiAgICAgICAgPHNwYW4gc2xvdD1cImJhZGdlXCI+e3sgY291bnQgfX08L3NwYW4+XG4gICAgICAgIDx2LWljb24+c2hvcHBpbmdfY2FydDwvdi1pY29uPlxuICAgICAgICA8L3YtYmFkZ2U+XG4gICAgICAgIDwvdi1idG4+XG4gICAgICAgIDxzcGFuPlZpZXcgfCBDYXJ0PC9zcGFuPlxuICAgICAgICA8L3YtdG9vbHRpcD5cbjwvdi10b29sYmFyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBUaGVtZSBmcm9tICcuLi9taXhpbnMvdGhlbWUnXG5pbXBvcnQgeyBjcmVhdGVOYW1lc3BhY2VkSGVscGVycyB9IGZyb20gJ3Z1ZXgnXG5jb25zdCB7IG1hcFN0YXRlLCBtYXBBY3Rpb25zIH0gPSBjcmVhdGVOYW1lc3BhY2VkSGVscGVycygnY2FydCcpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtaXhpbnM6IFtUaGVtZV0sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZXh0ZW5zaW9uOiBmYWxzZSxcbiAgICAgICAgY291bnQ6IDBcbiAgICB9KSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICAuLi5tYXBTdGF0ZSh7XG4gICAgICAgICAgICBnZXRDb3VudDogJ2NvdW50J1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgY3JlYXRlZCAoKSB7XG4gICAgICAgIC8qIEVtaXQgT24gYSBDaGlsZCBDb21wb25lbnQgSWYgWW91IFdhbnQgVGhpcyBUbyBCZSBWaXNpYmxlICovXG4gICAgICAgIEJ1cy4kb24oJ2hlYWRlci1leHRlbnNpb24tdmlzaWJsZScsICh2aXNpYmlsaXR5KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4dGVuc2lvbiA9IHZpc2liaWxpdHlcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIG1vdW50ZWQgKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgc2VsZi5jb3VudCA9IHNlbGYuZ2V0Q291bnRcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgLi4ubWFwQWN0aW9ucyh7XG4gICAgICAgICAgICBkZXN0cm95Q2FydDogJ2Rlc3Ryb3lDYXJ0J1xuICAgICAgICB9KSxcbiAgICAgICAgLyogVXNlIFZ1ZXRpZnkgTW9kYWwgKi9cbiAgICAgICAgb3BlblNob3BwaW5nQ2FydCAoKSB7XG4gICAgICAgICAgICBCdXMuJGVtaXQoJ3Nob3BwaW5nLWNhcnQtb3BlbicpXG4gICAgICAgIH0sXG4gICAgICAgIGVtcHR5Q2FydCAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuZGVzdHJveUNhcnQoKVxuICAgICAgICB9LFxuICAgICAgICB0b2dnbGVEcmF3ZXIgKCkge1xuICAgICAgICAgICAgQnVzLiRlbWl0KCd0b2dnbGVEcmF3ZXInKVxuICAgICAgICB9LFxuICAgICAgICAvKiBVc2VzIENhcnQgUm91dGUgKi9cbiAgICAgICAgb3BlbkNhcnQgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLiRyb3V0ZXIucHVzaCh7IG5hbWU6ICdjYXJ0JyB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgICBnZXRDb3VudCAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5jb3VudCA9IG5ld1ZhbHVlXG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEFwcE5hdkJhci52dWU/MTUwZDBmYjIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi10b29sYmFyXCIsXG4gICAgeyBzdHlsZTogX3ZtLm5hdmJhclN0eWxlLCBhdHRyczogeyBkYXJrOiAhX3ZtLmlzRGFyaywgZml4ZWQ6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFwidi10b29sYmFyLXNpZGUtaWNvblwiLCB7XG4gICAgICAgIHN0eWxlOiBfdm0udG9nZ2xlQmFyU3R5bGUsXG4gICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICBfdm0udG9nZ2xlRHJhd2VyKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5leHRlbnNpb25cbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi10b29sYmFyLXRpdGxlXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHNsb3Q6IFwiZXh0ZW5zaW9uXCIgfSxcbiAgICAgICAgICAgICAgc2xvdDogXCJleHRlbnNpb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLnNob3dJY29uXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1sLTMgaGlkZGVuLW1kLWFuZC1kb3duXCIsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgY29sb3I6IF92bS5pY29uQ29sb3IgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uaWNvbikpXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaGlkZGVuLW1kLWFuZC1kb3duXCIsIHN0eWxlOiBfdm0udGl0bGVTdHlsZSB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS50aXRsZSkpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfYyhcbiAgICAgICAgICAgIFwidi10b29sYmFyLXRpdGxlXCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLnNob3dJY29uXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1sLTMgaGlkZGVuLW1kLWFuZC1kb3duXCIsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgY29sb3I6IF92bS5pY29uQ29sb3IgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uaWNvbikpXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaGlkZGVuLW1kLWFuZC1kb3duXCIsIHN0eWxlOiBfdm0udGl0bGVTdHlsZSB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS50aXRsZSkpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uc2hvd0xvZ29cbiAgICAgICAgPyBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICBzdHlsZTogW192bS5sb2dvU3R5bGVdLFxuICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBfdm0ubG9nbywgYWx0OiBcInZ1ZWpzXCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LXRvb2x0aXBcIixcbiAgICAgICAgeyBhdHRyczogeyBsZWZ0OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF92bS5jb3VudCA+IDBcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImVycm9yXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmVtcHR5Q2FydCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcInJlbW92ZV9zaG9wcGluZ19jYXJ0XCIpXSldLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwic3BhblwiLCBbX3ZtLl92KFwiRW1wdHkgfCBDYXJ0XCIpXSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LXRvb2x0aXBcIixcbiAgICAgICAgeyBhdHRyczogeyBsZWZ0OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBcInByaW1hcnlcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5vcGVuQ2FydCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtYmFkZ2VcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGxlZnQ6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IGF0dHJzOiB7IHNsb3Q6IFwiYmFkZ2VcIiB9LCBzbG90OiBcImJhZGdlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5jb3VudCkpXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwic2hvcHBpbmdfY2FydFwiKV0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwic3BhblwiLCBbX3ZtLl92KFwiVmlldyB8IENhcnRcIildKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LThkYTU2ODVhXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi04ZGE1Njg1YVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvQXBwTmF2QmFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNSA4IDIyIDIzIDI0IDI1IDI2IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vTGVmdFNpZGVCYXIudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi00ZTEyNzcxN1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9MZWZ0U2lkZUJhci52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHBhcnRpYWxzXFxcXExlZnRTaWRlQmFyLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gTGVmdFNpZGVCYXIudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTRlMTI3NzE3XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNGUxMjc3MTdcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDggMjIgMjMgMjQgMjUgMjYiLCI8dGVtcGxhdGU+XG4gIDx2LW5hdmlnYXRpb24tZHJhd2VyXG4gICAgICB0ZW1wb3JhcnlcbiAgICAgIGhpZGUtb3ZlcmxheVxuICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICBlbmFibGUtcmVzaXplLXdhdGNoZXJcbiAgICAgIHYtbW9kZWw9XCJkcmF3ZXJcIlxuICAgID5cbiAgICAgIDx2LWxpc3QgZGVuc2U+XG4gICAgICAgIDwhLS0gVi1Gb3IgTGlua3MgRnJvbSBNZW51IC0tPlxuICAgICAgICA8di1saW5rIDpkYXJrPVwiZGFya0NsYXNzXCIgdi1mb3I9XCJsaW5rIGluIGxpbmtzXCIgOmtleT1cImxpbmsuaWRcIiA6dGl0bGU9XCJsaW5rLnRpdGxlXCIgOmhyZWY9XCJsaW5rLmhyZWZcIiA6aWNvbj1cImxpbmsuYWN0aW9uXCI+PC92LWxpbms+XG4gICAgICAgIDwhLS0gSW5kaXZpZHVhbCBMaW5rIChDdXN0b20gQWRkaXRpb25hbCkgLS0+XG4gICAgICAgIDx2LWxpbmsgOmRhcms9XCJkYXJrQ2xhc3NcIiAgdGl0bGU9XCJUdXRvcmlhbFwiIDpocmVmPVwiJy9jb3Vyc2VzJ1wiICAgaWNvbj1cInNjaG9vbFwiPjwvdi1saW5rPlxuICAgICAgICA8IS0tIEV4cGFuZGFibGUgR3JvdXAgTGlua3MgZnJvbSBHcm91cCBMaW5rIC0tPlxuICAgICAgICA8Z3JvdXAtbGluayA6ZGFyaz1cImRhcmtDbGFzc1wiIDppdGVtcz1cImdyb3VwbGlua3NcIj48L2dyb3VwLWxpbms+XG4gICAgICAgIDx2LXN1YmhlYWRlciA6Y2xhc3M9XCJ7J2JsdWUtZ3JleS0tdGV4dCc6ICFpc0RhcmssICd0ZXh0LS1saWdodGVuLTEnOiAhaXNEYXJrLCAnd2hpdGUtLXRleHQnOiBpc0Rhcmt9XCI+RmVhdHVyZWQgUHJvZHVjdDwvdi1zdWJoZWFkZXI+XG4gICAgICAgIDwhLS0gRmVhdHVyZWQgUHJvZHVjdHMgLS0+XG4gICAgICAgIDx2LWxpc3Q+XG4gICAgICAgICAgPG1lbWJlci1saW5rIDpkYXJrPVwiZGFya0NsYXNzXCIgdi1mb3I9XCJtZW1iZXIgaW4gbWVtYmVyc1wiIDprZXk9XCJtZW1iZXIudGV4dFwiIDpuYW1lPVwibWVtYmVyLm5hbWVcIiA6YXZhdGFyPVwiYGh0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvcG9ydHJhaXRzL21lbi8ke21lbWJlci5waWN0dXJlfS5qcGdgXCI+PC9tZW1iZXItbGluaz5cbiAgICAgICAgPC92LWxpc3Q+XG4gICAgICAgIDx2LXN1YmhlYWRlciA6Y2xhc3M9XCJ7J2JsdWUtZ3JleS0tdGV4dCc6ICFpc0RhcmssICd0ZXh0LS1saWdodGVuLTEnOiAhaXNEYXJrLCAnd2hpdGUtLXRleHQnOiBpc0Rhcmt9XCI+VG9wIDMgQmVzdCBTZWxsZXI8L3Ytc3ViaGVhZGVyPlxuICAgICAgICA8IS0tIEJlc3QgU2VsbGVyIFByb2R1Y3RzIC0tPlxuICAgICAgICA8di1saXN0PlxuICAgICAgICAgIDxtZW1iZXItbGluayB2LWZvcj1cIm1lbWJlciBpbiBtZW1iZXJzXCIgOmtleT1cIm1lbWJlci50ZXh0XCIgOm5hbWU9XCJtZW1iZXIubmFtZVwiIDphdmF0YXI9XCJgaHR0cHM6Ly9yYW5kb211c2VyLm1lL2FwaS9wb3J0cmFpdHMvbWVuLyR7bWVtYmVyLnBpY3R1cmV9LmpwZ2BcIj48L21lbWJlci1saW5rPlxuICAgICAgICA8L3YtbGlzdD5cbiAgICAgICAgPHYtbGluayA6ZGFyaz1cImRhcmtDbGFzc1wiICB0aXRsZT1cIkxvZ291dFwiICA6aHJlZj1cIicvbG9nb3V0J1wiIGljb249XCJwb3dlcl9zZXR0aW5nc19uZXdcIj48L3YtbGluaz5cbiAgICAgICAgPHYtbGluayA6ZGFyaz1cImRhcmtDbGFzc1wiICB0aXRsZT1cIlNldHRpbmdzXCIgOmhyZWY9XCInLydcIiAgIGljb249XCJzZXR0aW5nc1wiPjwvdi1saW5rPlxuICAgICAgPC92LWxpc3Q+XG4gICAgPC92LW5hdmlnYXRpb24tZHJhd2VyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBWTGluayBmcm9tICcuLi9jb21wb25lbnRzL1ZMaW5rLnZ1ZSdcbmltcG9ydCBHcm91cExpbmsgZnJvbSAnLi4vY29tcG9uZW50cy9Hcm91cExpbmsudnVlJ1xuaW1wb3J0IE1lbWJlckxpbmsgZnJvbSAnLi4vY29tcG9uZW50cy9NZW1iZXJMaW5rJ1xuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcbmltcG9ydCB7IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH0gZnJvbSAndnVleCdcbmNvbnN0IHsgbWFwR2V0dGVycyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2F1dGgnKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWl4aW5zOiBbVGhlbWVdLFxuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGRyYXdlcjogZmFsc2UsXG4gICAgICAgIGxpbmtzOiBbXSwgLy8gc2l0ZSBuYXZpZ2F0aW9uIGxpbmtzXG4gICAgICAgIG1lbWJlcnM6IFtdLCAvLyBjaGFuZ2Ugd2l0aCBmZWF0dXJlZCBQcm9kdWN0c1xuICAgICAgICBncm91cGxpbmtzOiBbXSAvLyBwcm9kdWN0IGNhdGVnb3JpZXNcbiAgICB9KSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIFZMaW5rLFxuICAgICAgICBHcm91cExpbmssXG4gICAgICAgIE1lbWJlckxpbmtcbiAgICB9LFxuICAgIG1vdW50ZWQgKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICAgQnVzLiRvbigndG9nZ2xlRHJhd2VyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5kcmF3ZXIgPSAhc2VsZi5kcmF3ZXJcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZi5mZXRjaFByb2R1Y3RzKClcbiAgICAgICAgc2VsZi5mZXRjaENhdGVnb3JpZXMoKVxuICAgICAgICBzZWxmLmZldGNoTmF2TGlua3MoKVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBmZXRjaFByb2R1Y3RzICgpIHtcbiAgICAgICAgICAgIC8vIE9uIENsaWNrIFdpbGwgU2hvdyBUaGUgUHJvZHVjdCBQYWdlXG4gICAgICAgICAgICB0aGlzLm1lbWJlcnMgPSBbXG4gICAgICAgICAgICAgICAgeyBwaWN0dXJlOiAyOCwgbmFtZTogJ0FzdXMnIH0sXG4gICAgICAgICAgICAgICAgeyBwaWN0dXJlOiAzOCwgbmFtZTogJ0FwcGxlJyB9LFxuICAgICAgICAgICAgICAgIHsgcGljdHVyZTogNDgsIG5hbWU6ICdYYm94JyB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIGZldGNoQ2F0ZWdvcmllcyAoKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3VwbGlua3MgPSBBcHAuZ3JvdXBsaW5rc1xuICAgICAgICB9LFxuICAgICAgICBmZXRjaE5hdkxpbmtzICgpIHtcbiAgICAgICAgICAgIHRoaXMubGlua3MgPSBBcHAubWVudVxuICAgICAgICB9LFxuICAgICAgICBpc01lbnVBY3RpdmUgKGhyZWYpIHtcbiAgICAgICAgICAgIGxldCBpdGVtc2VnbWVudCA9ICcnXG4gICAgICAgICAgICBsZXQgc2VnbWVudCA9ICcnXG4gICAgICAgICAgICBpZiAoaHJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNlZ21lbnQgPSBocmVmLnNwbGl0KCcvJylbMV1cbiAgICAgICAgICAgICAgICBzZWdtZW50ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylbMV1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXNlZ21lbnQgPT09IHNlZ21lbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbG9hZHZpZXcgKGhyZWYsIHZpZXcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc01lbnVBY3RpdmUoaHJlZikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7IHBhdGg6IGAke2hyZWZ9YCB9KVxuICAgICAgICAgICAgICAgIEJ1cy4kZW1pdChgbG9hZC12aWV3YCwgdmlldylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgQnVzLiRlbWl0KGBsb2FkLXZpZXdgLCB2aWV3KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBMZWZ0U2lkZUJhci52dWU/NzZiNThjZTgiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQwMTgwNGJmXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vR3JvdXBMaW5rLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9Hcm91cExpbmsudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi00MDE4MDRiZlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0dyb3VwTGluay52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi00MDE4MDRiZlwiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXEdyb3VwTGluay52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIEdyb3VwTGluay52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNDAxODA0YmZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi00MDE4MDRiZlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0dyb3VwTGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgOCAyMiAyMyAyNCAyNSAyNiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00MDE4MDRiZlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0dyb3VwTGluay52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjA5NTQ4YWY4XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQwMTgwNGJmXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vR3JvdXBMaW5rLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00MDE4MDRiZlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0dyb3VwTGluay52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNDAxODA0YmZcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvR3JvdXBMaW5rLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNSA4IDIyIDIzIDI0IDI1IDI2IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5zdHlsZUF2YXRhcltkYXRhLXYtNDAxODA0YmZdIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbi1sZWZ0OiAtNTVweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkM6L1VzZXJzL3VyaWFoL3NpdGVzL3d3dy9zaG9wL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9Hcm91cExpbmsudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLG1CQUFtQjtFQUNuQixtQkFBbUI7Q0FBRVwiLFwiZmlsZVwiOlwiR3JvdXBMaW5rLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuc3R5bGVBdmF0YXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luLWxlZnQ6IC01NXB4OyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTQwMTgwNGJmXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0dyb3VwTGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgOCAyMiAyMyAyNCAyNSAyNiIsIjx0ZW1wbGF0ZT5cbiAgICA8di1saXN0PlxuICAgICAgICA8di1saXN0LWdyb3VwIHYtZm9yPVwiaXRlbSBpbiBpdGVtc1wiIDp2YWx1ZT1cImlzR3JvdXBBY3RpdmUoaXRlbSlcIiB2LWJpbmQ6a2V5PVwiaXRlbS50aXRsZVwiPlxuICAgICAgICA8di1saXN0LXRpbGUgc2xvdD1cIml0ZW1cIj5cbiAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1hY3Rpb24gdi1pZj1cIiFpdGVtLmF2YXRhclwiPlxuICAgICAgICAgICAgPHYtaWNvbj57eyBpdGVtLmFjdGlvbiB9fTwvdi1pY29uPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1hY3Rpb24+XG4gICAgICAgICAgICA8di1hdmF0YXIgc2l6ZT1cIjI1cHhcIiB2LWVsc2U+XG4gICAgICAgICAgICAgICAgPGltZyA6c3JjPVwiaXRlbS5hdmF0YXJcIiBhbHQ9XCJcIj5cbiAgICAgICAgICAgIDwvdi1hdmF0YXI+XG4gICAgICAgICAgICA8di1saXN0LXRpbGUtY29udGVudD5cbiAgICAgICAgICAgIDx2LWxpc3QtdGlsZS10aXRsZSA6Y2xhc3M9XCJ7J2JsdWUtZ3JleS0tdGV4dCc6ICFpc0RhcmssICd0ZXh0LS1saWdodGVuLTEnOiAhaXNEYXJrfVwiPnt7IGl0ZW0udGl0bGUgfX08L3YtbGlzdC10aWxlLXRpdGxlPlxuICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLWFjdGlvbj5cbiAgICAgICAgICAgIDx2LWljb24gOmNsYXNzPVwieydwcmltYXJ5LS10ZXh0JzogIWlzRGFyaywgJ3doaXRlLS10ZXh0JzogaXNEYXJrfVwiPmtleWJvYXJkX2Fycm93X2Rvd248L3YtaWNvbj5cbiAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtYWN0aW9uPlxuICAgICAgICA8L3YtbGlzdC10aWxlPlxuICAgICAgICA8IS0tIGhyZWYgSGVyZSAtLT5cbiAgICAgICAgPHYtbGlzdC10aWxlIEBjbGljay5uYXRpdmUuc3RvcD1cImxvYWR2aWV3KGl0ZW0sc3ViSXRlbS5jb21wb25lbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVwiW3sgc3R5bGVBdmF0YXI6IGhhc0F2YXRhcihzdWJJdGVtKSB9XVwiXG4gICAgICAgICAgICAgICAgICAgIDphdmF0YXI9XCJzdWJJdGVtLmF2YXRhciA/ICdhdmF0YXInIDogJydcIlxuICAgICAgICAgICAgICAgICAgICB2LWZvcj1cInN1Ykl0ZW0gaW4gaXRlbS5pdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgIDprZXk9XCJzdWJJdGVtLnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtcIlxuICAgICAgICA+XG4gICAgICAgICAgICAgPHYtYXZhdGFyIHYtaWY9XCJzdWJJdGVtLmF2YXRhclwiPlxuICAgICAgICAgICAgICAgIDxpbWcgOnNyYz1cImxvYWRBdmF0YXIoc3ViSXRlbS5hdmF0YXIpXCIgYWx0PVwiXCI+XG4gICAgICAgICAgICA8L3YtYXZhdGFyPlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgICAgPHYtbGlzdC10aWxlLXRpdGxlICB2LWlmPVwiIWlzRGFya1wiPlxuICAgICAgICAgICAgICAgICA8c3BhbiA6Y2xhc3M9XCJ7J3RlYWwtLXRleHQnOiBpc0FjdGl2ZShzdWJJdGVtKSwgJ3RleHQtLWxpZ2h0ZW4tMic6IGlzQWN0aXZlKHN1Ykl0ZW0pLCAnYmx1ZS1ncmV5LS10ZXh0JzogIWlzQWN0aXZlKHN1Ykl0ZW0pLCAndGV4dC0tbGlnaHRlbi0xJzogIWlzQWN0aXZlKHN1Ykl0ZW0pfVwiPnt7IHN1Ykl0ZW0udGl0bGUgfX08L3NwYW4+XG4gICAgICAgICAgICAgPC92LWxpc3QtdGlsZS10aXRsZT5cbiAgICAgICAgICAgICA8di1saXN0LXRpbGUtdGl0bGUgIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgPHNwYW4gOmNsYXNzPVwieyd0ZWFsLS10ZXh0JzogaXNBY3RpdmUoc3ViSXRlbSksICd0ZXh0LS1saWdodGVuLTInOiBpc0FjdGl2ZShzdWJJdGVtKSwgJ3doaXRlLS10ZXh0JzogIWlzQWN0aXZlKHN1Ykl0ZW0pIH1cIj57eyBzdWJJdGVtLnRpdGxlIH19PC9zcGFuPlxuICAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtdGl0bGU+XG4gICAgICAgICAgICA8L3YtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgICAgPHYtbGlzdC10aWxlLWFjdGlvbiB2LWlmPVwic3ViSXRlbS5hdmF0YXJcIj5cbiAgICAgICAgICAgICAgICA8di1pY29uIDpjbGFzcz1cInsndGVhbC0tdGV4dCc6IGlzQWN0aXZlKHN1Ykl0ZW0pLCAndGV4dC0tbGlnaHRlbi0yJzogaXNBY3RpdmUoc3ViSXRlbSl9XCI+e3sgc3ViSXRlbS5hY3Rpb24gfX08L3YtaWNvbj5cbiAgICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1hY3Rpb24+XG4gICAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1hY3Rpb24gdi1lbHNlPlxuICAgICAgICAgICAgICAgIDx2LWljb24gOmNsYXNzPVwieyd0ZWFsLS10ZXh0JzogaXNBY3RpdmUoc3ViSXRlbSksICd0ZXh0LS1saWdodGVuLTInOiBpc0FjdGl2ZShzdWJJdGVtKX1cIj57eyBzdWJJdGVtLmFjdGlvbiB9fTwvdi1pY29uPlxuICAgICAgICAgICAgICA8L3YtbGlzdC10aWxlLWFjdGlvbj5cbiAgICAgICAgPC92LWxpc3QtdGlsZT5cbiAgICAgICAgPC92LWxpc3QtZ3JvdXA+XG4gICAgPC92LWxpc3Q+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiBbJ2l0ZW1zJ10sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZGFyazogQXBwLnRoZW1lLmRhcmtcbiAgICB9KSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGxvYWR2aWV3IChpdGVtLCBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0dyb3VwQWN0aXZlKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goeyBwYXRoOiBgJHtpdGVtLmhyZWZ9YCB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQnVzLiRlbWl0KGBsb2FkLXZpZXdgLCBjb21wb25lbnQpXG4gICAgICAgIH0sXG4gICAgICAgIGhhc0F2YXRhciAoc3ViSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHN1Ykl0ZW0uYXZhdGFyICE9PSB1bmRlZmluZWRcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZEF2YXRhciAoYXZhdGFyKSB7XG4gICAgICAgICAgICByZXR1cm4gYXZhdGFyIHx8ICdodHRwczovL2F2YXRhcnMwLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzkwNjQwNjY/dj00JnM9NDYwJ1xuICAgICAgICB9LFxuICAgICAgICBpc0dyb3VwQWN0aXZlIChpdGVtKSB7XG4gICAgICAgICAgICBsZXQgaXRlbXNlZ21lbnQgPSAnJ1xuICAgICAgICAgICAgbGV0IHNlZ21lbnQgPSAnJ1xuICAgICAgICAgICAgaWYgKGl0ZW0uaHJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNlZ21lbnQgPSBpdGVtLmhyZWYuc3BsaXQoJy8nKVsxXVxuICAgICAgICAgICAgICAgIHNlZ21lbnQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVsxXVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtc2VnbWVudCA9PT0gc2VnbWVudFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0FjdGl2ZSAoc3ViSXRlbSkge1xuICAgICAgICAgICAgaWYgKHN1Ykl0ZW0uaHJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Ykl0ZW0uaHJlZiA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGlzRGFyayAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXJrID09PSB0cnVlXG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuICAgIC5zdHlsZUF2YXRhciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC01NXB4O1xuICAgIH1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gR3JvdXBMaW5rLnZ1ZT82M2Q1ZWY1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxpc3RcIixcbiAgICBfdm0uX2woX3ZtLml0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICByZXR1cm4gX2MoXG4gICAgICAgIFwidi1saXN0LWdyb3VwXCIsXG4gICAgICAgIHsga2V5OiBpdGVtLnRpdGxlLCBhdHRyczogeyB2YWx1ZTogX3ZtLmlzR3JvdXBBY3RpdmUoaXRlbSkgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGlzdC10aWxlXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHNsb3Q6IFwiaXRlbVwiIH0sIHNsb3Q6IFwiaXRlbVwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICFpdGVtLmF2YXRhclxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1saXN0LXRpbGUtYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KF92bS5fcyhpdGVtLmFjdGlvbikpXSldLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBfYyhcInYtYXZhdGFyXCIsIHsgYXR0cnM6IHsgc2l6ZTogXCIyNXB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHsgYXR0cnM6IHsgc3JjOiBpdGVtLmF2YXRhciwgYWx0OiBcIlwiIH0gfSlcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGlzdC10aWxlLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1ZS1ncmV5LS10ZXh0XCI6ICFfdm0uaXNEYXJrLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LS1saWdodGVuLTFcIjogIV92bS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKGl0ZW0udGl0bGUpKV1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS1hY3Rpb25cIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInByaW1hcnktLXRleHRcIjogIV92bS5pc0RhcmssXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndoaXRlLS10ZXh0XCI6IF92bS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJrZXlib2FyZF9hcnJvd19kb3duXCIpXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uX2woaXRlbS5pdGVtcywgZnVuY3Rpb24oc3ViSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICBcInYtbGlzdC10aWxlXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IHN1Ykl0ZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgY2xhc3M6IFt7IHN0eWxlQXZhdGFyOiBfdm0uaGFzQXZhdGFyKHN1Ykl0ZW0pIH1dLFxuICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGN1cnNvcjogXCJwb2ludGVyXCIgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBhdmF0YXI6IHN1Ykl0ZW0uYXZhdGFyID8gXCJhdmF0YXJcIiA6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmxvYWR2aWV3KGl0ZW0sIHN1Ykl0ZW0uY29tcG9uZW50KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHN1Ykl0ZW0uYXZhdGFyXG4gICAgICAgICAgICAgICAgICA/IF9jKFwidi1hdmF0YXJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogX3ZtLmxvYWRBdmF0YXIoc3ViSXRlbS5hdmF0YXIpLCBhbHQ6IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcInYtbGlzdC10aWxlLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgIV92bS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwidi1saXN0LXRpbGUtdGl0bGVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlYWwtLXRleHRcIjogX3ZtLmlzQWN0aXZlKHN1Ykl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMlwiOiBfdm0uaXNBY3RpdmUoc3ViSXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmx1ZS1ncmV5LS10ZXh0XCI6ICFfdm0uaXNBY3RpdmUoc3ViSXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC0tbGlnaHRlbi0xXCI6ICFfdm0uaXNBY3RpdmUoc3ViSXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHN1Ykl0ZW0udGl0bGUpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IF9jKFwidi1saXN0LXRpbGUtdGl0bGVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlYWwtLXRleHRcIjogX3ZtLmlzQWN0aXZlKHN1Ykl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMlwiOiBfdm0uaXNBY3RpdmUoc3ViSXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2hpdGUtLXRleHRcIjogIV92bS5pc0FjdGl2ZShzdWJJdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3Moc3ViSXRlbS50aXRsZSkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5hdmF0YXJcbiAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2LWxpc3QtdGlsZS1hY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlYWwtLXRleHRcIjogX3ZtLmlzQWN0aXZlKHN1Ykl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LS1saWdodGVuLTJcIjogX3ZtLmlzQWN0aXZlKHN1Ykl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhzdWJJdGVtLmFjdGlvbikpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidi1saXN0LXRpbGUtYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZWFsLS10ZXh0XCI6IF92bS5pc0FjdGl2ZShzdWJJdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC0tbGlnaHRlbi0yXCI6IF92bS5pc0FjdGl2ZShzdWJJdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3Moc3ViSXRlbS5hY3Rpb24pKV1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMlxuICAgICAgKVxuICAgIH0pXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTQwMTgwNGJmXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi00MDE4MDRiZlwiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0dyb3VwTGluay52dWVcbi8vIG1vZHVsZSBpZCA9IDY4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgOCAyMiAyMyAyNCAyNSAyNiIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL01lbWJlckxpbmsudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1kOTFmOGYwNFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9NZW1iZXJMaW5rLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcY29tcG9uZW50c1xcXFxNZW1iZXJMaW5rLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gTWVtYmVyTGluay52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtZDkxZjhmMDRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi1kOTFmOGYwNFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL01lbWJlckxpbmsudnVlXG4vLyBtb2R1bGUgaWQgPSA2ODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDggMjIgMjMgMjQgMjUgMjYiLCI8dGVtcGxhdGU+XG4gICAgPHYtbGlzdC10aWxlIGF2YXRhciBzdHlsZT1cImN1cnNvcjpwb2ludGVyO1wiPlxuICAgICAgICAgICAgPHYtbGlzdC10aWxlLWF2YXRhcj5cbiAgICAgICAgICAgICAgPGltZyA6c3JjPVwiYXZhdGFyXCIgYWx0PVwiXCI+XG4gICAgICAgICAgICA8L3YtbGlzdC10aWxlLWF2YXRhcj5cbiAgICAgICAgICAgIDx2LWxpc3QtdGlsZS10aXRsZSB2LXRleHQ9XCJuYW1lXCIgOmNsYXNzPVwieydibHVlLWdyZXktLXRleHQnOiAhaXNEYXJrLCAndGV4dC0tbGlnaHRlbi0xJzogIWlzRGFyaywgJ3doaXRlLS10ZXh0JzogaXNEYXJrfVwiPjwvdi1saXN0LXRpbGUtdGl0bGU+XG4gICAgPC92LWxpc3QtdGlsZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgVGhlbWUgZnJvbSAnLi4vbWl4aW5zL3RoZW1lJ1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIG1peGluczogW1RoZW1lXSxcbiAgICBwcm9wczoge1xuICAgICAgICBkYXJrOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGF2YXRhcjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBNZW1iZXJMaW5rLnZ1ZT82NDQ3MjA3YSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxpc3QtdGlsZVwiLFxuICAgIHsgc3RhdGljU3R5bGU6IHsgY3Vyc29yOiBcInBvaW50ZXJcIiB9LCBhdHRyczogeyBhdmF0YXI6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFwidi1saXN0LXRpbGUtYXZhdGFyXCIsIFtcbiAgICAgICAgX2MoXCJpbWdcIiwgeyBhdHRyczogeyBzcmM6IF92bS5hdmF0YXIsIGFsdDogXCJcIiB9IH0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcInYtbGlzdC10aWxlLXRpdGxlXCIsIHtcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICBcImJsdWUtZ3JleS0tdGV4dFwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMVwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICBcIndoaXRlLS10ZXh0XCI6IF92bS5pc0RhcmtcbiAgICAgICAgfSxcbiAgICAgICAgZG9tUHJvcHM6IHsgdGV4dENvbnRlbnQ6IF92bS5fcyhfdm0ubmFtZSkgfVxuICAgICAgfSlcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtZDkxZjhmMDRcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWQ5MWY4ZjA0XCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL01lbWJlckxpbmsudnVlXG4vLyBtb2R1bGUgaWQgPSA2ODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDggMjIgMjMgMjQgMjUgMjYiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1uYXZpZ2F0aW9uLWRyYXdlclwiLFxuICAgIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHRlbXBvcmFyeTogXCJcIixcbiAgICAgICAgXCJoaWRlLW92ZXJsYXlcIjogXCJcIixcbiAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgXCJlbmFibGUtcmVzaXplLXdhdGNoZXJcIjogXCJcIlxuICAgICAgfSxcbiAgICAgIG1vZGVsOiB7XG4gICAgICAgIHZhbHVlOiBfdm0uZHJhd2VyLFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgX3ZtLmRyYXdlciA9ICQkdlxuICAgICAgICB9LFxuICAgICAgICBleHByZXNzaW9uOiBcImRyYXdlclwiXG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxpc3RcIixcbiAgICAgICAgeyBhdHRyczogeyBkZW5zZTogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfdm0uX2woX3ZtLmxpbmtzLCBmdW5jdGlvbihsaW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gX2MoXCJ2LWxpbmtcIiwge1xuICAgICAgICAgICAgICBrZXk6IGxpbmsuaWQsXG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgICB0aXRsZTogbGluay50aXRsZSxcbiAgICAgICAgICAgICAgICBocmVmOiBsaW5rLmhyZWYsXG4gICAgICAgICAgICAgICAgaWNvbjogbGluay5hY3Rpb25cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIGRhcms6IF92bS5kYXJrQ2xhc3MsXG4gICAgICAgICAgICAgIHRpdGxlOiBcIlR1dG9yaWFsXCIsXG4gICAgICAgICAgICAgIGhyZWY6IFwiL2NvdXJzZXNcIixcbiAgICAgICAgICAgICAgaWNvbjogXCJzY2hvb2xcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJncm91cC1saW5rXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IGRhcms6IF92bS5kYXJrQ2xhc3MsIGl0ZW1zOiBfdm0uZ3JvdXBsaW5rcyB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1zdWJoZWFkZXJcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBcImJsdWUtZ3JleS0tdGV4dFwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMVwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICBcIndoaXRlLS10ZXh0XCI6IF92bS5pc0RhcmtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJGZWF0dXJlZCBQcm9kdWN0XCIpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1saXN0XCIsXG4gICAgICAgICAgICBfdm0uX2woX3ZtLm1lbWJlcnMsIGZ1bmN0aW9uKG1lbWJlcikge1xuICAgICAgICAgICAgICByZXR1cm4gX2MoXCJtZW1iZXItbGlua1wiLCB7XG4gICAgICAgICAgICAgICAga2V5OiBtZW1iZXIudGV4dCxcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgZGFyazogX3ZtLmRhcmtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIG5hbWU6IG1lbWJlci5uYW1lLFxuICAgICAgICAgICAgICAgICAgYXZhdGFyOlxuICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvcG9ydHJhaXRzL21lbi9cIiArXG4gICAgICAgICAgICAgICAgICAgIG1lbWJlci5waWN0dXJlICtcbiAgICAgICAgICAgICAgICAgICAgXCIuanBnXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1zdWJoZWFkZXJcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBcImJsdWUtZ3JleS0tdGV4dFwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICBcInRleHQtLWxpZ2h0ZW4tMVwiOiAhX3ZtLmlzRGFyayxcbiAgICAgICAgICAgICAgICBcIndoaXRlLS10ZXh0XCI6IF92bS5pc0RhcmtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJUb3AgMyBCZXN0IFNlbGxlclwiKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGlzdFwiLFxuICAgICAgICAgICAgX3ZtLl9sKF92bS5tZW1iZXJzLCBmdW5jdGlvbihtZW1iZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFwibWVtYmVyLWxpbmtcIiwge1xuICAgICAgICAgICAgICAgIGtleTogbWVtYmVyLnRleHQsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IG1lbWJlci5uYW1lLFxuICAgICAgICAgICAgICAgICAgYXZhdGFyOlxuICAgICAgICAgICAgICAgICAgICBcImh0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvcG9ydHJhaXRzL21lbi9cIiArXG4gICAgICAgICAgICAgICAgICAgIG1lbWJlci5waWN0dXJlICtcbiAgICAgICAgICAgICAgICAgICAgXCIuanBnXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInYtbGlua1wiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBkYXJrOiBfdm0uZGFya0NsYXNzLFxuICAgICAgICAgICAgICB0aXRsZTogXCJMb2dvdXRcIixcbiAgICAgICAgICAgICAgaHJlZjogXCIvbG9nb3V0XCIsXG4gICAgICAgICAgICAgIGljb246IFwicG93ZXJfc2V0dGluZ3NfbmV3XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1saW5rXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIGRhcms6IF92bS5kYXJrQ2xhc3MsXG4gICAgICAgICAgICAgIHRpdGxlOiBcIlNldHRpbmdzXCIsXG4gICAgICAgICAgICAgIGhyZWY6IFwiL1wiLFxuICAgICAgICAgICAgICBpY29uOiBcInNldHRpbmdzXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAyXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTRlMTI3NzE3XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi00ZTEyNzcxN1wiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFydGlhbHMvTGVmdFNpZGVCYXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2ODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDggMjIgMjMgMjQgMjUgMjYiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9GYWJCdXR0b24udnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0wNjU5ODI4MlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9GYWJCdXR0b24udnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXEZhYkJ1dHRvbi52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIEZhYkJ1dHRvbi52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMDY1OTgyODJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0wNjU5ODI4MlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0ZhYkJ1dHRvbi52dWVcbi8vIG1vZHVsZSBpZCA9IDY4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgOCAyMiAyMyAyNCAyNSAyNiIsIjx0ZW1wbGF0ZT5cbiAgPHYtc3BlZWQtZGlhbFxuICAgICAgdi1tb2RlbD1cImZhYlwiXG4gICAgICA6dG9wPVwidG9wXCJcbiAgICAgIDpib3R0b209XCJib3R0b21cIlxuICAgICAgOnJpZ2h0PVwicmlnaHRcIlxuICAgICAgOmxlZnQ9XCJsZWZ0XCJcbiAgICAgIDpkaXJlY3Rpb249XCJkaXJlY3Rpb25cIlxuICAgICAgOmhvdmVyPVwiaG92ZXJcIlxuICAgICAgOnRyYW5zaXRpb249XCJ0cmFuc2l0aW9uXCJcbiAgICAgIDphYnNvbHV0ZT1cImFic29sdXRlXCJcbiAgICAgIDpmaXhlZD1cImZpeGVkXCJcbiAgICA+XG4gICAgICA8di1idG5cbiAgICAgICAgc2xvdD1cImFjdGl2YXRvclwiXG4gICAgICAgIDpjbGFzcz1cIlthY3RpdmVGYWIuY2xhc3NdXCJcbiAgICAgICAgZGFya1xuICAgICAgICBmYWJcbiAgICAgICAgaG92ZXJcbiAgICAgICAgdi1tb2RlbD1cImZhYlwiXG4gICAgICA+XG4gICAgICAgIDx2LWljb24gY2xhc3M9XCJ3aGl0ZS0tdGV4dFwiPnt7IGFjdGl2ZUZhYi5pY29uIH19PC92LWljb24+XG4gICAgICAgIDx2LWljb24gY2xhc3M9XCJlcnJvci0tdGV4dFwiPmNsb3NlPC92LWljb24+XG4gICAgICA8L3YtYnRuPlxuICAgICAgPHYtYnRuXG4gICAgICAgIHYtZm9yPVwiYnV0dG9uIGluIGJ1dHRvbnNcIiA6a2V5PVwiYnV0dG9uLm5hbWVcIlxuICAgICAgICB2LWlmPVwiaXNWaXNpYmxlKGJ1dHRvbilcIlxuICAgICAgICBmYWJcbiAgICAgICAgZGFya1xuICAgICAgICBzbWFsbFxuICAgICAgICA6Y2xhc3M9XCJbYnV0dG9uLmNsYXNzXVwiXG4gICAgICAgIEBjbGljay5uYXRpdmU9XCJuYXZpZ2F0ZShidXR0b24pXCJcbiAgICAgID5cbiAgICAgICAgPHYtaWNvbj57eyBidXR0b24uaWNvbiB9fTwvdi1pY29uPlxuICAgICAgPC92LWJ0bj5cbiAgICA8L3Ytc3BlZWQtZGlhbD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBjcmVhdGVOYW1lc3BhY2VkSGVscGVycyB9IGZyb20gJ3Z1ZXgnXG5jb25zdCB7IG1hcEdldHRlcnMgfSA9IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzKCdhdXRoJylcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICBkaXJlY3Rpb246ICd0b3AnLFxuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZmFiOiBmYWxzZSxcbiAgICAgICAgaG92ZXI6IGZhbHNlLFxuICAgICAgICB0b3A6IGZhbHNlLFxuICAgICAgICByaWdodDogdHJ1ZSxcbiAgICAgICAgYm90dG9tOiB0cnVlLFxuICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgYWJzb2x1dGU6IGZhbHNlLFxuICAgICAgICB0cmFuc2l0aW9uOiAnc2xpZGUteS1yZXZlcnNlLXRyYW5zaXRpb24nLFxuICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdob21lJywgaHJlZjogJy8nLCBjbGFzczogJ2luZGlnbyBsaWdodGVuLTInLCBpY29uOiAnZmEtaG9tZScsIHJlcXVpcmVzQXV0aDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2Rhc2hib2FyZCcsIGhyZWY6ICcvZGFzaGJvYXJkJywgY2xhc3M6ICdhbWJlciBsaWdodGVuLTInLCBpY29uOiAnZmEtc2hvcHBpbmctYmFnJywgcmVxdWlyZXNBdXRoOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbG9naW4nLCBocmVmOiAnL2xvZ2luJywgY2xhc3M6ICdzdWNjZXNzJywgaWNvbjogJ2ZhLWtleScsIHJlcXVpcmVzQXV0aDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JlZ2lzdGVyJywgaHJlZjogJy9yZWdpc3RlcicsIGNsYXNzOiAnaW5mbycsIGljb246ICdmYS11c2VyLXBsdXMnLCByZXF1aXJlc0F1dGg6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb2dvdXQnLCBocmVmOiAnL2xvZ291dCcsIGNsYXNzOiAncmVkIGxpZ2h0ZW4tMicsIGljb246ICdmYS1wb3dlci1vZmYnLCByZXF1aXJlc0F1dGg6IHRydWUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3Njcm9sbC11cCcsIGhyZWY6IG51bGwsIGNsYXNzOiAnYmx1ZS1ncmV5JywgaWNvbjogJ2ZsaWdodF90YWtlb2ZmJywgcmVxdWlyZXNBdXRoOiBmYWxzZSB9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGl2ZUZhYjoge1xuICAgICAgICAgICAgJ2NsYXNzJzogJ3ByaW1hcnknLCBpY29uOiAnZmEtcm9ja2V0J1xuICAgICAgICB9XG4gICAgfSksXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgLi4ubWFwR2V0dGVycyh7XG4gICAgICAgICAgICBnZXRBdXRoOiAnZ2V0QXV0aCdcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICAgIHRvcCAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSA9ICF2YWxcbiAgICAgICAgfSxcbiAgICAgICAgcmlnaHQgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gIXZhbFxuICAgICAgICB9LFxuICAgICAgICBib3R0b20gKHZhbCkge1xuICAgICAgICAgICAgdGhpcy50b3AgPSAhdmFsXG4gICAgICAgIH0sXG4gICAgICAgIGxlZnQgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5yaWdodCA9ICF2YWxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBuYXZpZ2F0ZSAoYnV0dG9uKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuYWN0aXZlRmFiID0geyBjbGFzczogYnV0dG9uLmNsYXNzLCBpY29uOiBidXR0b24uaWNvbiB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuYWN0aXZlRmFiID0ge1xuICAgICAgICAgICAgICAgICAgICAnY2xhc3MnOiAncHJpbWFyeScsIGljb246ICdmYS1yb2NrZXQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChidXR0b24uaHJlZiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRyb3V0ZXIucHVzaCh7IHBhdGg6IGAke2J1dHRvbi5ocmVmfWAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbFRvVG9wKDMwMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApXG4gICAgICAgIH0sXG4gICAgICAgIHNjcm9sbFRvVG9wIChzY3JvbGxEdXJhdGlvbikge1xuICAgICAgICAgICAgdmFyIGNvc1BhcmFtZXRlciA9IHdpbmRvdy5zY3JvbGxZIC8gMlxuICAgICAgICAgICAgdmFyIHNjcm9sbENvdW50ID0gMFxuICAgICAgICAgICAgdmFyIG9sZFRpbWVzdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpXG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN0ZXAgKG5ld1RpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgIHNjcm9sbENvdW50ICs9IE1hdGguUEkgLyAoc2Nyb2xsRHVyYXRpb24gLyAobmV3VGltZXN0YW1wIC0gb2xkVGltZXN0YW1wKSlcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsQ291bnQgPj0gTWF0aC5QSSkgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID09PSAwKSByZXR1cm5cbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgTWF0aC5yb3VuZChjb3NQYXJhbWV0ZXIgKyBjb3NQYXJhbWV0ZXIgKiBNYXRoLmNvcyhzY3JvbGxDb3VudCkpKVxuICAgICAgICAgICAgICAgIG9sZFRpbWVzdGFtcCA9IG5ld1RpbWVzdGFtcFxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKVxuICAgICAgICB9LFxuICAgICAgICBpc1Zpc2libGUgKGJ1dHRvbikge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBpZiAoYnV0dG9uLnJlcXVpcmVzQXV0aCA9PT0gZmFsc2UgJiYgYnV0dG9uLm5hbWUgPT09ICdsb2dpbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXNlbGYuZ2V0QXV0aFxuICAgICAgICAgICAgfSBlbHNlIGlmIChidXR0b24ucmVxdWlyZXNBdXRoID09PSBmYWxzZSAmJiBidXR0b24ubmFtZSA9PT0gJ3JlZ2lzdGVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAhc2VsZi5nZXRBdXRoXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJ1dHRvbi5yZXF1aXJlc0F1dGggPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5nZXRBdXRoXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJ1dHRvbi5yZXF1aXJlc0F1dGggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEZhYkJ1dHRvbi52dWU/NGVjZWY3MjIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1zcGVlZC1kaWFsXCIsXG4gICAge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgdG9wOiBfdm0udG9wLFxuICAgICAgICBib3R0b206IF92bS5ib3R0b20sXG4gICAgICAgIHJpZ2h0OiBfdm0ucmlnaHQsXG4gICAgICAgIGxlZnQ6IF92bS5sZWZ0LFxuICAgICAgICBkaXJlY3Rpb246IF92bS5kaXJlY3Rpb24sXG4gICAgICAgIGhvdmVyOiBfdm0uaG92ZXIsXG4gICAgICAgIHRyYW5zaXRpb246IF92bS50cmFuc2l0aW9uLFxuICAgICAgICBhYnNvbHV0ZTogX3ZtLmFic29sdXRlLFxuICAgICAgICBmaXhlZDogX3ZtLmZpeGVkXG4gICAgICB9LFxuICAgICAgbW9kZWw6IHtcbiAgICAgICAgdmFsdWU6IF92bS5mYWIsXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICBfdm0uZmFiID0gJCR2XG4gICAgICAgIH0sXG4gICAgICAgIGV4cHJlc3Npb246IFwiZmFiXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzczogW192bS5hY3RpdmVGYWIuY2xhc3NdLFxuICAgICAgICAgIGF0dHJzOiB7IHNsb3Q6IFwiYWN0aXZhdG9yXCIsIGRhcms6IFwiXCIsIGZhYjogXCJcIiwgaG92ZXI6IFwiXCIgfSxcbiAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICB2YWx1ZTogX3ZtLmZhYixcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgX3ZtLmZhYiA9ICQkdlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZmFiXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IHN0YXRpY0NsYXNzOiBcIndoaXRlLS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uYWN0aXZlRmFiLmljb24pKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBzdGF0aWNDbGFzczogXCJlcnJvci0tdGV4dFwiIH0sIFtfdm0uX3YoXCJjbG9zZVwiKV0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLl9sKF92bS5idXR0b25zLCBmdW5jdGlvbihidXR0b24pIHtcbiAgICAgICAgcmV0dXJuIF92bS5pc1Zpc2libGUoYnV0dG9uKVxuICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleTogYnV0dG9uLm5hbWUsXG4gICAgICAgICAgICAgICAgY2xhc3M6IFtidXR0b24uY2xhc3NdLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IGZhYjogXCJcIiwgZGFyazogXCJcIiwgc21hbGw6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0ubmF2aWdhdGUoYnV0dG9uKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoX3ZtLl9zKGJ1dHRvbi5pY29uKSldKV0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICB9KVxuICAgIF0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0wNjU5ODI4MlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMDY1OTgyODJcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvRmFiQnV0dG9uLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNSA4IDIyIDIzIDI0IDI1IDI2IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQ29va2llTGF3LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzM2MzE0ODBcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQ29va2llTGF3LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFydGlhbHNcXFxcQ29va2llTGF3LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gQ29va2llTGF3LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi03MzYzMTQ4MFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTczNjMxNDgwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0Nvb2tpZUxhdy52dWVcbi8vIG1vZHVsZSBpZCA9IDY5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgOCAyMiAyMyAyNCAyNSAyNiIsIjx0ZW1wbGF0ZT5cbjxjb29raWUtbGF3IHRoZW1lPVwiZGFyay1saW1lXCIgYnV0dG9uVGV4dD1cIlllcywgSSBVbmRlcnN0YW5kIFRoaXMgU2l0ZSBVc2VzIENvb2tpZS5cIj5cbiAgICAgICAgPGRpdiBzbG90PVwibWVzc2FnZVwiPlxuICAgICAgICAgICAgPHA+VGhpcyB3ZWJzaXRlIHVzZXMgY29va2llcyB0byBlbnN1cmUgeW91IGdldCB0aGUgYmVzdCBleHBlcmllbmNlIG9uIG91ciB3ZWJzaXRlLlxuICAgICAgICAgICAgICAgIDxzcGFuPlJlYWQgT3VyIENvb2tpZSBUZXJtcyBhbmQgVXNhZ2UgRm9yIE1vcmUgSW5mbzo8L3NwYW4+IDxyb3V0ZXItbGluayB0bz1cIi9jb29raWUtbGF3LWFncmVlbWVudFwiPkNsaWNrIGhlcmU8L3JvdXRlci1saW5rPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbjwvY29va2llLWxhdz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQ29va2llTGF3IGZyb20gJ3Z1ZS1jb29raWUtbGF3J1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNvbXBvbmVudHM6IHsgQ29va2llTGF3IH1cbn1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIENvb2tpZUxhdy52dWU/OGUyNzhkNDIiLCIvKiFcbiAqIHZ1ZS1jb29raWUtbGF3IHYxLjMuMFxuICogKGMpIDIwMTcgSmFrdWIgSnVzemN6YWsgPGpha3ViQHBvc3Rlby5kZT5cbiAqIFxuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkNvb2tpZUxhd1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJDb29raWVMYXdcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQ29va2llTGF3XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgX193ZWJwYWNrX3JlcXVpcmVfXygxKVxufVxudmFyIENvbXBvbmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNikoXG4gIC8qIHNjcmlwdCAqL1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgbnVsbCxcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiL1VzZXJzL2pqdXN6Y3phay9Qcm9qZWt0ZS9Qcml2YXQvdnVlLWNvb2tpZS1sYXcvc3JjL2NvbXBvbmVudHMvQ29va2llTGF3LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gQ29va2llTGF3LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChmYWxzZSkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtODYzZmQ5N2VcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi04NjNmZDk3ZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KShcIjkxYzA1MzEyXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKGZhbHNlKSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz97XFxcIm1pbmltaXplXFxcIjpmYWxzZSxcXFwic291cmNlTWFwXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi04NjNmZDk3ZVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6ZmFsc2V9IS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3tcXFwic291cmNlTWFwXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9Db29raWVMYXcudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3tcXFwibWluaW1pemVcXFwiOmZhbHNlLFxcXCJzb3VyY2VNYXBcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTg2M2ZkOTdlXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjpmYWxzZX0hLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/e1xcXCJzb3VyY2VNYXBcXFwiOmZhbHNlfSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Nvb2tpZUxhdy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG4vKioqLyB9KSxcbi8qIDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pLCBcIlxcbi5Db29raWUge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHotaW5kZXg6IDk5OTk7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAtd2Via2l0LWJveC1hbGlnbjogYmFzZWxpbmU7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGJhc2VsaW5lO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5Db29raWUgPiAqIHtcXG4gICAgbWFyZ2luOiAwLjkzNzVyZW0gMDtcXG4gICAgLW1zLWZsZXgtaXRlbS1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0OHJlbSkge1xcbi5Db29raWUge1xcbiAgICAgIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gICAgICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAgICAgLW1zLWZsZXgtZmxvdzogcm93O1xcbiAgICAgICAgICAgICAgZmxleC1mbG93OiByb3c7XFxufVxcbi5Db29raWUgPiAqIHtcXG4gICAgICAgIG1hcmdpbjogMDtcXG59XFxufVxcbi5Db29raWUtLXRvcCB7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxufVxcbi5Db29raWUtLWJvdHRvbSB7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxufVxcbi5Db29raWVfX2J1dHRvbnMge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5Db29raWVfX2J1dHRvbnMgPiAqIHtcXG4gICAgbWFyZ2luOiAwLjMxMjVyZW0gMDtcXG59XFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDhyZW0pIHtcXG4uQ29va2llX19idXR0b25zIHtcXG4gICAgICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxuICAgICAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuLkNvb2tpZV9fYnV0dG9ucyA+ICoge1xcbiAgICAgICAgbWFyZ2luOiAwIDAuOTM3NXJlbTtcXG59XFxufVxcbi5Db29raWVfX2J1dHRvbiB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICAtbXMtZmxleC1pdGVtLWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG4uQ29va2llLS1iYXNlIHtcXG4gIGJhY2tncm91bmQ6ICNGMUYxRjE7XFxuICBjb2xvcjogIzIzMjMyMztcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLWJhc2UgLkNvb2tpZV9fYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZDogIzk3RDA1ODtcXG4gICAgcGFkZGluZzogMC42MjVlbSAzLjEyNWVtO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLkNvb2tpZS0tYmFzZSAuQ29va2llX19idXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICM3ZWJmMzY7XFxufVxcbi5Db29raWUtLWJhc2UtLXJvdW5kZWQge1xcbiAgYmFja2dyb3VuZDogI0YxRjFGMTtcXG4gIGNvbG9yOiAjMjMyMzIzO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tYmFzZS0tcm91bmRlZCAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjOTdEMDU4O1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbn1cXG4uQ29va2llLS1iYXNlLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzdlYmYzNjtcXG59XFxuLkNvb2tpZS0tYmxvb2Qtb3JhbmdlIHtcXG4gIGJhY2tncm91bmQ6ICM0MjQ4NTE7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLWJsb29kLW9yYW5nZSAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjRTc2QTY4O1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uQ29va2llLS1ibG9vZC1vcmFuZ2UgLkNvb2tpZV9fYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZTAzZjNjO1xcbn1cXG4uQ29va2llLS1ibG9vZC1vcmFuZ2UtLXJvdW5kZWQge1xcbiAgYmFja2dyb3VuZDogIzQyNDg1MTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogMS4yNTBlbTtcXG59XFxuLkNvb2tpZS0tYmxvb2Qtb3JhbmdlLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICNFNzZBNjg7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxufVxcbi5Db29raWUtLWJsb29kLW9yYW5nZS0tcm91bmRlZCAuQ29va2llX19idXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNlMDNmM2M7XFxufVxcbi5Db29raWUtLWRhcmstbGltZSB7XFxuICBiYWNrZ3JvdW5kOiAjNDI0ODUxO1xcbiAgY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAxLjI1MGVtO1xcbn1cXG4uQ29va2llLS1kYXJrLWxpbWUgLkNvb2tpZV9fYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZDogIzk3RDA1ODtcXG4gICAgcGFkZGluZzogMC42MjVlbSAzLjEyNWVtO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLkNvb2tpZS0tZGFyay1saW1lIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzdlYmYzNjtcXG59XFxuLkNvb2tpZS0tZGFyay1saW1lLS1yb3VuZGVkIHtcXG4gIGJhY2tncm91bmQ6ICM0MjQ4NTE7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLWRhcmstbGltZS0tcm91bmRlZCAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjOTdEMDU4O1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbn1cXG4uQ29va2llLS1kYXJrLWxpbWUtLXJvdW5kZWQgLkNvb2tpZV9fYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjN2ViZjM2O1xcbn1cXG4uQ29va2llLS1yb3lhbCB7XFxuICBiYWNrZ3JvdW5kOiAjRkJDMjI3O1xcbiAgY29sb3I6ICMyMzIzMjM7XFxuICBwYWRkaW5nOiAxLjI1MGVtO1xcbn1cXG4uQ29va2llLS1yb3lhbCAuQ29va2llX19idXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiAjNzI2Q0VBO1xcbiAgICBwYWRkaW5nOiAwLjYyNWVtIDMuMTI1ZW07XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG4uQ29va2llLS1yb3lhbCAuQ29va2llX19idXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICM0NzNmZTQ7XFxufVxcbi5Db29raWUtLXJveWFsLS1yb3VuZGVkIHtcXG4gIGJhY2tncm91bmQ6ICNGQkMyMjc7XFxuICBjb2xvcjogIzIzMjMyMztcXG4gIHBhZGRpbmc6IDEuMjUwZW07XFxufVxcbi5Db29raWUtLXJveWFsLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6ICM3MjZDRUE7XFxuICAgIHBhZGRpbmc6IDAuNjI1ZW0gMy4xMjVlbTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxufVxcbi5Db29raWUtLXJveWFsLS1yb3VuZGVkIC5Db29raWVfX2J1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzQ3M2ZlNDtcXG59XFxuLnNsaWRlRnJvbVRvcC1lbnRlciwgLnNsaWRlRnJvbVRvcC1sZWF2ZS10byB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgLTEyLjVlbSk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgLTEyLjVlbSk7XFxufVxcbi5zbGlkZUZyb21Ub3AtZW50ZXItdG8sIC5zbGlkZUZyb21Ub3AtbGVhdmUge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcXG59XFxuLnNsaWRlRnJvbUJvdHRvbS1lbnRlciwgLnNsaWRlRnJvbUJvdHRvbS1sZWF2ZS10byB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMTIuNWVtKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAxMi41ZW0pO1xcbn1cXG4uc2xpZGVGcm9tQm90dG9tLWVudGVyLXRvLCAuc2xpZGVGcm9tQm90dG9tLWxlYXZlIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAwcHgpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCk7XFxufVxcbi5zbGlkZUZyb21Cb3R0b20tZW50ZXItYWN0aXZlLFxcbi5zbGlkZUZyb21Cb3R0b20tbGVhdmUtYWN0aXZlLFxcbi5zbGlkZUZyb21Ub3AtZW50ZXItYWN0aXZlLFxcbi5zbGlkZUZyb21Ub3AtbGVhdmUtYWN0aXZlIHtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gLjRzIGVhc2UtaW47XFxuICB0cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAuNHMgZWFzZS1pbjtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNHMgZWFzZS1pbjtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuNHMgZWFzZS1pbiwgLXdlYmtpdC10cmFuc2Zvcm0gLjRzIGVhc2UtaW47XFxufVxcbi5mYWRlLWVudGVyLWFjdGl2ZSwgLmZhZGUtbGVhdmUtYWN0aXZlIHtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAuNXM7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC41cztcXG59XFxuLmZhZGUtZW50ZXIsIC5mYWRlLWxlYXZlLXRvIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG4vKioqLyB9KSxcbi8qIDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cbi8qKiovIH0pLFxuLyogNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vKiBnbG9iYWxzIF9fVlVFX1NTUl9DT05URVhUX18gKi9cblxuLy8gdGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgcmF3U2NyaXB0RXhwb3J0cyxcbiAgY29tcGlsZWRUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICB2YXIgZnVuY3Rpb25hbCA9IG9wdGlvbnMuZnVuY3Rpb25hbFxuICAgIHZhciBleGlzdGluZyA9IGZ1bmN0aW9uYWxcbiAgICAgID8gb3B0aW9ucy5yZW5kZXJcbiAgICAgIDogb3B0aW9ucy5iZWZvcmVDcmVhdGVcbiAgICBpZiAoIWZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nXG4gICAgICAgID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKVxuICAgICAgICA6IFtob29rXVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBleGlzdGluZyhoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuLyoqKi8gfSksXG4vKiA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIHByb3BzOiB7XG4gICAgYnV0dG9uVGV4dDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ0dvdCBpdCEnXG4gICAgfSxcbiAgICBidXR0b25MaW5rOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIGJ1dHRvbkxpbmtUZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnTW9yZSBpbmZvJ1xuICAgIH0sXG4gICAgbWVzc2FnZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ1RoaXMgd2Vic2l0ZSB1c2VzIGNvb2tpZXMgdG8gZW5zdXJlIHlvdSBnZXQgdGhlIGJlc3QgZXhwZXJpZW5jZSBvbiBvdXIgd2Vic2l0ZS4nXG4gICAgfSxcbiAgICB0aGVtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2Jhc2UnXG4gICAgfSxcblxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYm90dG9tJ1xuICAgIH0sXG5cbiAgICB0cmFuc2l0aW9uTmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3NsaWRlRnJvbUJvdHRvbSdcbiAgICB9LFxuICAgIGJ1dHRvbkNsYXNzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnQ29va2llX19idXR0b24nXG4gICAgfVxuICB9LFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc09wZW46IGZhbHNlXG4gICAgfTtcbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbnRhaW5lclBvc2l0aW9uOiBmdW5jdGlvbiBjb250YWluZXJQb3NpdGlvbigpIHtcbiAgICAgIHJldHVybiAnQ29va2llLS0nICsgdGhpcy5wb3NpdGlvbjtcbiAgICB9LFxuICAgIGNvb2tpZVRoZW1lOiBmdW5jdGlvbiBjb29raWVUaGVtZSgpIHtcbiAgICAgIHJldHVybiAnQ29va2llLS0nICsgdGhpcy50aGVtZTtcbiAgICB9XG4gIH0sXG4gIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQoKSB7XG4gICAgaWYgKCF0aGlzLmdldFZpc2l0ZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgc2V0VmlzaXRlZDogZnVuY3Rpb24gc2V0VmlzaXRlZCgpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb29raWU6YWNjZXB0ZWQnLCB0cnVlKTtcbiAgICB9LFxuICAgIGdldFZpc2l0ZWQ6IGZ1bmN0aW9uIGdldFZpc2l0ZWQoKSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Nvb2tpZTphY2NlcHRlZCcpO1xuICAgIH0sXG4gICAgYWNjZXB0OiBmdW5jdGlvbiBhY2NlcHQoKSB7XG4gICAgICB0aGlzLnNldFZpc2l0ZWQoKTtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCd0cmFuc2l0aW9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImFwcGVhclwiOiBcIlwiLFxuICAgICAgXCJuYW1lXCI6IF92bS50cmFuc2l0aW9uTmFtZVxuICAgIH1cbiAgfSwgWyhfdm0uaXNPcGVuKSA/IF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiQ29va2llXCIsXG4gICAgY2xhc3M6IFtfdm0uY29udGFpbmVyUG9zaXRpb24sIF92bS5jb29raWVUaGVtZV1cbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiQ29va2llX19jb250ZW50XCJcbiAgfSwgW192bS5fdChcIm1lc3NhZ2VcIiwgW192bS5fdihfdm0uX3MoX3ZtLm1lc3NhZ2UpKV0pXSwgMiksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiQ29va2llX19idXR0b25zXCJcbiAgfSwgWyhfdm0uYnV0dG9uTGluaykgPyBfYygnYScsIHtcbiAgICBjbGFzczogX3ZtLmJ1dHRvbkNsYXNzLFxuICAgIGF0dHJzOiB7XG4gICAgICBcImhyZWZcIjogX3ZtLmJ1dHRvbkxpbmtcbiAgICB9XG4gIH0sIFtfdm0uX3YoX3ZtLl9zKF92bS5idXR0b25MaW5rVGV4dCkpXSkgOiBfdm0uX2UoKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBjbGFzczogX3ZtLmJ1dHRvbkNsYXNzLFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IF92bS5hY2NlcHRcbiAgICB9XG4gIH0sIFtfdm0uX3YoX3ZtLl9zKF92bS5idXR0b25UZXh0KSldKV0pXSkgOiBfdm0uX2UoKV0pXG59LHN0YXRpY1JlbmRlckZuczogW119XG5tb2R1bGUuZXhwb3J0cy5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbmlmIChmYWxzZSkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi04NjNmZDk3ZVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtY29va2llLWxhdy9kaXN0L3Z1ZS1jb29raWUtbGF3LmpzXG4vLyBtb2R1bGUgaWQgPSA2OTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDggMjIgMjMgMjQgMjUgMjYiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiY29va2llLWxhd1wiLFxuICAgIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHRoZW1lOiBcImRhcmstbGltZVwiLFxuICAgICAgICBidXR0b25UZXh0OiBcIlllcywgSSBVbmRlcnN0YW5kIFRoaXMgU2l0ZSBVc2VzIENvb2tpZS5cIlxuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBhdHRyczogeyBzbG90OiBcIm1lc3NhZ2VcIiB9LCBzbG90OiBcIm1lc3NhZ2VcIiB9LCBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwicFwiLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgXCJUaGlzIHdlYnNpdGUgdXNlcyBjb29raWVzIHRvIGVuc3VyZSB5b3UgZ2V0IHRoZSBiZXN0IGV4cGVyaWVuY2Ugb24gb3VyIHdlYnNpdGUuXFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFwiUmVhZCBPdXIgQ29va2llIFRlcm1zIGFuZCBVc2FnZSBGb3IgTW9yZSBJbmZvOlwiKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJyb3V0ZXItbGlua1wiLCB7IGF0dHJzOiB7IHRvOiBcIi9jb29raWUtbGF3LWFncmVlbWVudFwiIH0gfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXCJDbGljayBoZXJlXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNzM2MzE0ODBcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTczNjMxNDgwXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9Db29raWVMYXcudnVlXG4vLyBtb2R1bGUgaWQgPSA2OTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA1IDggMjIgMjMgMjQgMjUgMjYiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1hcHBcIixcbiAgICB7IGF0dHJzOiB7IGRhcms6IF92bS5BcHAudGhlbWUuZGFyaywgc3RhbmRhbG9uZTogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXCJsZWZ0LXNpZGUtYmFyXCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYXBwLW5hdi1iYXJcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwibWFpblwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInBhLTAgbWEtMFwiLFxuICAgICAgICAgICAgICBhdHRyczogeyB0cmFuc2l0aW9uOiBcInNsaWRlLXgtdHJhbnNpdGlvblwiLCBmbHVpZDogXCJcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdChcImRlZmF1bHRcIildLFxuICAgICAgICAgICAgMlxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImZhYi1idXR0b25cIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJjb29raWUtbGF3XCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYXBwLWZvb3RlclwiKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1lOGYxNGFjNFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtZThmMTRhYzRcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTWFpbi52dWVcbi8vIG1vZHVsZSBpZCA9IDY5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDUgOCAyMiAyMyAyNCAyNSAyNiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvdmFsdWVzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC92YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDY5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDI3IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnZhbHVlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvdmFsdWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2OThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgMyAyNyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC12YWx1ZXMtZW50cmllc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkdmFsdWVzID0gcmVxdWlyZSgnLi9fb2JqZWN0LXRvLWFycmF5JykoZmFsc2UpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoaXQpIHtcbiAgICByZXR1cm4gJHZhbHVlcyhpdCk7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDY5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDI3IiwidmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBpc0VudW0gPSByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlzRW50cmllcykge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoaXQpO1xuICAgIHZhciBrZXlzID0gZ2V0S2V5cyhPKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoTywga2V5ID0ga2V5c1tpKytdKSkge1xuICAgICAgcmVzdWx0LnB1c2goaXNFbnRyaWVzID8gW2tleSwgT1trZXldXSA6IE9ba2V5XSk7XG4gICAgfSByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtdG8tYXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDcwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiAzIDI3IiwiLyohXG4gKiBJbWFnZSBDb21wcmVzc29yIHYwLjUuMlxuICogaHR0cHM6Ly9naXRodWIuY29tL3hrZXNoaS9pbWFnZS1jb21wcmVzc29yXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IFhrZXNoaVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNy0xMC0wOVQwMjo0MDozNy4xMjlaXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLkltYWdlQ29tcHJlc3NvciA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gY3JlYXRlQ29tbW9uanNNb2R1bGUoZm4sIG1vZHVsZSkge1xuXHRyZXR1cm4gbW9kdWxlID0geyBleHBvcnRzOiB7fSB9LCBmbihtb2R1bGUsIG1vZHVsZS5leHBvcnRzKSwgbW9kdWxlLmV4cG9ydHM7XG59XG5cbnZhciBjYW52YXNUb0Jsb2IgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlKSB7XG4vKlxuICogSmF2YVNjcmlwdCBDYW52YXMgdG8gQmxvYlxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1DYW52YXMtdG8tQmxvYlxuICpcbiAqIENvcHlyaWdodCAyMDEyLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBCYXNlZCBvbiBzdGFja292ZXJmbG93IHVzZXIgU3RvaXZlJ3MgY29kZSBzbmlwcGV0OlxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3EvNDk5ODkwOFxuICovXG5cbi8qIGdsb2JhbCBhdG9iLCBCbG9iLCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBDYW52YXNQcm90b3R5cGUgPVxuICAgIHdpbmRvdy5IVE1MQ2FudmFzRWxlbWVudCAmJiB3aW5kb3cuSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlO1xuICB2YXIgaGFzQmxvYkNvbnN0cnVjdG9yID1cbiAgICB3aW5kb3cuQmxvYiAmJlxuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihuZXcgQmxvYigpKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpO1xuICB2YXIgaGFzQXJyYXlCdWZmZXJWaWV3U3VwcG9ydCA9XG4gICAgaGFzQmxvYkNvbnN0cnVjdG9yICYmXG4gICAgd2luZG93LlVpbnQ4QXJyYXkgJiZcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtuZXcgVWludDhBcnJheSgxMDApXSkuc2l6ZSA9PT0gMTAwXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCk7XG4gIHZhciBCbG9iQnVpbGRlciA9XG4gICAgd2luZG93LkJsb2JCdWlsZGVyIHx8XG4gICAgd2luZG93LldlYktpdEJsb2JCdWlsZGVyIHx8XG4gICAgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8XG4gICAgd2luZG93Lk1TQmxvYkJ1aWxkZXI7XG4gIHZhciBkYXRhVVJJUGF0dGVybiA9IC9eZGF0YTooKC4qPykoO2NoYXJzZXQ9Lio/KT8pKDtiYXNlNjQpPywvO1xuICB2YXIgZGF0YVVSTHRvQmxvYiA9XG4gICAgKGhhc0Jsb2JDb25zdHJ1Y3RvciB8fCBCbG9iQnVpbGRlcikgJiZcbiAgICB3aW5kb3cuYXRvYiAmJlxuICAgIHdpbmRvdy5BcnJheUJ1ZmZlciAmJlxuICAgIHdpbmRvdy5VaW50OEFycmF5ICYmXG4gICAgZnVuY3Rpb24gKGRhdGFVUkkpIHtcbiAgICAgIHZhciBtYXRjaGVzLFxuICAgICAgICBtZWRpYVR5cGUsXG4gICAgICAgIGlzQmFzZTY0LFxuICAgICAgICBkYXRhU3RyaW5nLFxuICAgICAgICBieXRlU3RyaW5nLFxuICAgICAgICBhcnJheUJ1ZmZlcixcbiAgICAgICAgaW50QXJyYXksXG4gICAgICAgIGksXG4gICAgICAgIGJiO1xuICAgICAgLy8gUGFyc2UgdGhlIGRhdGFVUkkgY29tcG9uZW50cyBhcyBwZXIgUkZDIDIzOTdcbiAgICAgIG1hdGNoZXMgPSBkYXRhVVJJLm1hdGNoKGRhdGFVUklQYXR0ZXJuKTtcbiAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZGF0YSBVUkknKVxuICAgICAgfVxuICAgICAgLy8gRGVmYXVsdCB0byB0ZXh0L3BsYWluO2NoYXJzZXQ9VVMtQVNDSUlcbiAgICAgIG1lZGlhVHlwZSA9IG1hdGNoZXNbMl1cbiAgICAgICAgPyBtYXRjaGVzWzFdXG4gICAgICAgIDogJ3RleHQvcGxhaW4nICsgKG1hdGNoZXNbM10gfHwgJztjaGFyc2V0PVVTLUFTQ0lJJyk7XG4gICAgICBpc0Jhc2U2NCA9ICEhbWF0Y2hlc1s0XTtcbiAgICAgIGRhdGFTdHJpbmcgPSBkYXRhVVJJLnNsaWNlKG1hdGNoZXNbMF0ubGVuZ3RoKTtcbiAgICAgIGlmIChpc0Jhc2U2NCkge1xuICAgICAgICAvLyBDb252ZXJ0IGJhc2U2NCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZzpcbiAgICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVN0cmluZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnk6XG4gICAgICAgIGJ5dGVTdHJpbmcgPSBkZWNvZGVVUklDb21wb25lbnQoZGF0YVN0cmluZyk7XG4gICAgICB9XG4gICAgICAvLyBXcml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhbiBBcnJheUJ1ZmZlcjpcbiAgICAgIGFycmF5QnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICAgIGludEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaW50QXJyYXlbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICB9XG4gICAgICAvLyBXcml0ZSB0aGUgQXJyYXlCdWZmZXIgKG9yIEFycmF5QnVmZmVyVmlldykgdG8gYSBibG9iOlxuICAgICAgaWYgKGhhc0Jsb2JDb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW2hhc0FycmF5QnVmZmVyVmlld1N1cHBvcnQgPyBpbnRBcnJheSA6IGFycmF5QnVmZmVyXSwge1xuICAgICAgICAgIHR5cGU6IG1lZGlhVHlwZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgYmIgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcbiAgICAgIGJiLmFwcGVuZChhcnJheUJ1ZmZlcik7XG4gICAgICByZXR1cm4gYmIuZ2V0QmxvYihtZWRpYVR5cGUpXG4gICAgfTtcbiAgaWYgKHdpbmRvdy5IVE1MQ2FudmFzRWxlbWVudCAmJiAhQ2FudmFzUHJvdG90eXBlLnRvQmxvYikge1xuICAgIGlmIChDYW52YXNQcm90b3R5cGUubW96R2V0QXNGaWxlKSB7XG4gICAgICBDYW52YXNQcm90b3R5cGUudG9CbG9iID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0eXBlLCBxdWFsaXR5KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHF1YWxpdHkgJiYgQ2FudmFzUHJvdG90eXBlLnRvRGF0YVVSTCAmJiBkYXRhVVJMdG9CbG9iKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhVVJMdG9CbG9iKHNlbGYudG9EYXRhVVJMKHR5cGUsIHF1YWxpdHkpKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHNlbGYubW96R2V0QXNGaWxlKCdibG9iJywgdHlwZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoQ2FudmFzUHJvdG90eXBlLnRvRGF0YVVSTCAmJiBkYXRhVVJMdG9CbG9iKSB7XG4gICAgICBDYW52YXNQcm90b3R5cGUudG9CbG9iID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0eXBlLCBxdWFsaXR5KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FsbGJhY2soZGF0YVVSTHRvQmxvYihzZWxmLnRvRGF0YVVSTCh0eXBlLCBxdWFsaXR5KSkpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2YgdW5kZWZpbmVkID09PSAnZnVuY3Rpb24nICYmIHVuZGVmaW5lZC5hbWQpIHtcbiAgICB1bmRlZmluZWQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGRhdGFVUkx0b0Jsb2JcbiAgICB9KTtcbiAgfSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRhdGFVUkx0b0Jsb2I7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmRhdGFVUkx0b0Jsb2IgPSBkYXRhVVJMdG9CbG9iO1xuICB9XG59KSh3aW5kb3cpO1xufSk7XG5cbi8qIGdsb2JhbHMgQmxvYiAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQmxvYiA9IGZ1bmN0aW9uICh4KSB7XG5cdHJldHVybiB4IGluc3RhbmNlb2YgQmxvYiB8fCB0b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBCbG9iXSc7XG59O1xuXG52YXIgREVGQVVMVFMgPSB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgcmVhZCB0aGUgaW1hZ2UncyBFeGlmIE9yaWVudGF0aW9uIGluZm9ybWF0aW9uLFxuICAgKiBhbmQgdGhlbiByb3RhdGUgb3IgZmxpcCB0aGUgaW1hZ2UgYXV0b21hdGljYWxseS5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBjaGVja09yaWVudGF0aW9uOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBUaGUgbWF4IHdpZHRoIG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBtYXhXaWR0aDogSW5maW5pdHksXG5cbiAgLyoqXG4gICAqIFRoZSBtYXggaGVpZ2h0IG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBtYXhIZWlnaHQ6IEluZmluaXR5LFxuXG4gIC8qKlxuICAgKiBUaGUgbWluIHdpZHRoIG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBtaW5XaWR0aDogMCxcblxuICAvKipcbiAgICogVGhlIG1pbiBoZWlnaHQgb2YgdGhlIG91dHB1dCBpbWFnZS5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIG1pbkhlaWdodDogMCxcblxuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIHRoZSBuYXR1cmFsIHdpZHRoIG9mIHRoZSBzb3VyY2UgaW1hZ2Ugd2lsbCBiZSB1c2VkLlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgd2lkdGg6IHVuZGVmaW5lZCxcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgb3V0cHV0IGltYWdlLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgbmF0dXJhbCBoZWlnaHQgb2YgdGhlIHNvdXJjZSBpbWFnZSB3aWxsIGJlIHVzZWQuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBoZWlnaHQ6IHVuZGVmaW5lZCxcblxuICAvKipcbiAgICogVGhlIHF1YWxpdHkgb2YgdGhlIG91dHB1dCBpbWFnZS5cbiAgICogSXQgbXVzdCBiZSBhIG51bWJlciBiZXR3ZWVuIGAwYCBhbmQgYDFgLFxuICAgKiBhbmQgb25seSBhdmFpbGFibGUgZm9yIGBpbWFnZS9qcGVnYCBhbmQgYGltYWdlL3dlYnBgIGltYWdlcy5cbiAgICogQ2hlY2sgb3V0IHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTENhbnZhc0VsZW1lbnQvdG9CbG9iIGNhbnZhcy50b0Jsb2J9LlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgcXVhbGl0eTogMC44LFxuXG4gIC8qKlxuICAgKiBUaGUgbWltZSB0eXBlIG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIEJ5IGRlZmF1bHQsIHRoZSBvcmlnaW5hbCBtaW1lIHR5cGUgb2YgdGhlIHNvdXJjZSBpbWFnZSBmaWxlIHdpbGwgYmUgdXNlZC5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIG1pbWVUeXBlOiAnYXV0bycsXG5cbiAgLyoqXG4gICAqIFBORyBmaWxlcyBvdmVyIHRoaXMgdmFsdWUgKDVNIGJ5IGRlZmF1bHQpIHdpbGwgYmUgY29udmVydGVkIHRvIEpQRUdzLlxuICAgKiBUbyBkaXNhYmxlIHRoaXMsIGp1c3Qgc2V0IHRoZSB2YWx1ZSB0byBgSW5maW5pdHlgLlxuICAgKiBDaGVjayBvdXQge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS94a2VzaGkvaW1hZ2UtY29tcHJlc3Nvci9pc3N1ZXMvMiAjMn0uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBjb252ZXJ0U2l6ZTogNTAwMDAwMCxcblxuICAvKipcbiAgICogVGhlIHN1Y2Nlc3MgY2FsbGJhY2sgZm9yIHRoZSBpbWFnZSBjb21wcmVzc2luZyBwcm9jZXNzLlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqIEBwYXJhbSB7RmlsZX0gZmlsZSAtIFRoZSBjb21wcmVzc2VkIGltYWdlIEZpbGUgb2JqZWN0LlxuICAgKiBAZXhhbXBsZVxuICAgKiBmdW5jdGlvbiAoZmlsZSkgeyBjb25zb2xlLmxvZyhmaWxlKSB9XG4gICAqL1xuICBzdWNjZXNzOiBudWxsLFxuXG4gIC8qKlxuICAgKiBUaGUgZXJyb3IgY2FsbGJhY2sgZm9yIHRoZSBpbWFnZSBjb21wcmVzc2luZyBwcm9jZXNzLlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqIEBwYXJhbSB7RXJyb3J9IGVyciAtIEFuIEVycm9yIG9iamVjdC5cbiAgICogQGV4YW1wbGVcbiAgICogZnVuY3Rpb24gKGVycikgeyBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSkgfVxuICAgKi9cbiAgZXJyb3I6IG51bGxcbn07XG5cbnZhciBSRUdFWFBfSU1BR0VfVFlQRSA9IC9eaW1hZ2VcXC8uKyQvO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIG1pbWUgdHlwZSBvZiBpbWFnZS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGdpdmVuIGlzIGEgbWltZSB0eXBlIG9mIGltYWdlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW1hZ2VUeXBlKHZhbHVlKSB7XG4gIHJldHVybiBSRUdFWFBfSU1BR0VfVFlQRS50ZXN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGltYWdlIHR5cGUgdG8gZXh0ZW5zaW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIGltYWdlIHR5cGUgdG8gY29udmVydC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luY2x1ZGVEb3Q9dHJ1ZV0gLSBJbmNsdWRlIGEgbGVhZGluZyBkb3Qgb3Igbm90LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdGhlIGltYWdlIGV4dGVuc2lvbi5cbiAqL1xuZnVuY3Rpb24gaW1hZ2VUeXBlVG9FeHRlbnNpb24odmFsdWUpIHtcbiAgdmFyIGluY2x1ZGVEb3QgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG5cbiAgdmFyIGV4dGVuc2lvbiA9IGlzSW1hZ2VUeXBlKHZhbHVlKSA/IHZhbHVlLnN1YnN0cig2KSA6ICcnO1xuXG4gIGlmIChleHRlbnNpb24gPT09ICdqcGVnJykge1xuICAgIGV4dGVuc2lvbiA9ICdqcGcnO1xuICB9XG5cbiAgaWYgKGV4dGVuc2lvbiAmJiBpbmNsdWRlRG90KSB7XG4gICAgZXh0ZW5zaW9uID0gJy4nICsgZXh0ZW5zaW9uO1xuICB9XG5cbiAgcmV0dXJuIGV4dGVuc2lvbjtcbn1cblxudmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbi8qKlxuICogR2V0IHN0cmluZyBmcm9tIGNoYXIgY29kZSBpbiBkYXRhIHZpZXcuXG4gKiBAcGFyYW0ge0RhdGFWaWV3fSBkYXRhVmlldyAtIFRoZSBkYXRhIHZpZXcgZm9yIHJlYWQuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBUaGUgc3RhcnQgaW5kZXguXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gVGhlIHJlYWQgbGVuZ3RoLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlYWQgcmVzdWx0LlxuICovXG5cbmZ1bmN0aW9uIGdldFN0cmluZ0Zyb21DaGFyQ29kZShkYXRhVmlldywgc3RhcnQsIGxlbmd0aCkge1xuICB2YXIgc3RyID0gJyc7XG4gIHZhciBpID0gdm9pZCAwO1xuXG4gIGxlbmd0aCArPSBzdGFydDtcblxuICBmb3IgKGkgPSBzdGFydDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgc3RyICs9IGZyb21DaGFyQ29kZShkYXRhVmlldy5nZXRVaW50OChpKSk7XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG52YXIgX3dpbmRvdyQxID0gd2luZG93O1xudmFyIGJ0b2EgPSBfd2luZG93JDEuYnRvYTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gYXJyYXkgYnVmZmVyIHRvIERhdGEgVVJMLlxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgLSBUaGUgYXJyYXkgYnVmZmVyIHRvIHRyYW5zZm9ybS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtaW1lVHlwZSAtIFRoZSBtaW1lIHR5cGUgb2YgdGhlIERhdGEgVVJMLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlc3VsdCBEYXRhIFVSTC5cbiAqL1xuXG5mdW5jdGlvbiBhcnJheUJ1ZmZlclRvRGF0YVVSTChhcnJheUJ1ZmZlciwgbWltZVR5cGUpIHtcbiAgdmFyIHVpbnQ4ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuICB2YXIgbGVuZ3RoID0gdWludDgubGVuZ3RoO1xuXG4gIHZhciBkYXRhID0gJyc7XG4gIHZhciBpID0gdm9pZCAwO1xuXG4gIC8vIFR5cGVkQXJyYXkucHJvdG90eXBlLmZvckVhY2ggaXMgbm90IHN1cHBvcnRlZCBpbiBzb21lIGJyb3dzZXJzLlxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBkYXRhICs9IGZyb21DaGFyQ29kZSh1aW50OFtpXSk7XG4gIH1cblxuICByZXR1cm4gJ2RhdGE6JyArIG1pbWVUeXBlICsgJztiYXNlNjQsJyArIGJ0b2EoZGF0YSk7XG59XG5cbi8qKlxuICogR2V0IG9yaWVudGF0aW9uIHZhbHVlIGZyb20gZ2l2ZW4gYXJyYXkgYnVmZmVyLlxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgLSBUaGUgYXJyYXkgYnVmZmVyIHRvIHJlYWQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgcmVhZCBvcmllbnRhdGlvbiB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0T3JpZW50YXRpb24oYXJyYXlCdWZmZXIpIHtcbiAgdmFyIGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGFycmF5QnVmZmVyKTtcbiAgdmFyIG9yaWVudGF0aW9uID0gdm9pZCAwO1xuICB2YXIgbGl0dGxlRW5kaWFuID0gdm9pZCAwO1xuICB2YXIgYXBwMVN0YXJ0ID0gdm9pZCAwO1xuICB2YXIgaWZkU3RhcnQgPSB2b2lkIDA7XG5cbiAgLy8gT25seSBoYW5kbGUgSlBFRyBpbWFnZSAoc3RhcnQgYnkgMHhGRkQ4KVxuICBpZiAoZGF0YVZpZXcuZ2V0VWludDgoMCkgPT09IDB4RkYgJiYgZGF0YVZpZXcuZ2V0VWludDgoMSkgPT09IDB4RDgpIHtcbiAgICB2YXIgbGVuZ3RoID0gZGF0YVZpZXcuYnl0ZUxlbmd0aDtcbiAgICB2YXIgb2Zmc2V0ID0gMjtcblxuICAgIHdoaWxlIChvZmZzZXQgPCBsZW5ndGgpIHtcbiAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50OChvZmZzZXQpID09PSAweEZGICYmIGRhdGFWaWV3LmdldFVpbnQ4KG9mZnNldCArIDEpID09PSAweEUxKSB7XG4gICAgICAgIGFwcDFTdGFydCA9IG9mZnNldDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIG9mZnNldCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcHAxU3RhcnQpIHtcbiAgICB2YXIgZXhpZklEQ29kZSA9IGFwcDFTdGFydCArIDQ7XG4gICAgdmFyIHRpZmZPZmZzZXQgPSBhcHAxU3RhcnQgKyAxMDtcblxuICAgIGlmIChnZXRTdHJpbmdGcm9tQ2hhckNvZGUoZGF0YVZpZXcsIGV4aWZJRENvZGUsIDQpID09PSAnRXhpZicpIHtcbiAgICAgIHZhciBlbmRpYW5uZXNzID0gZGF0YVZpZXcuZ2V0VWludDE2KHRpZmZPZmZzZXQpO1xuXG4gICAgICBsaXR0bGVFbmRpYW4gPSBlbmRpYW5uZXNzID09PSAweDQ5NDk7XG5cbiAgICAgIGlmIChsaXR0bGVFbmRpYW4gfHwgZW5kaWFubmVzcyA9PT0gMHg0RDREIC8qIGJpZ0VuZGlhbiAqLykge1xuICAgICAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50MTYodGlmZk9mZnNldCArIDIsIGxpdHRsZUVuZGlhbikgPT09IDB4MDAyQSkge1xuICAgICAgICAgICAgdmFyIGZpcnN0SUZET2Zmc2V0ID0gZGF0YVZpZXcuZ2V0VWludDMyKHRpZmZPZmZzZXQgKyA0LCBsaXR0bGVFbmRpYW4pO1xuXG4gICAgICAgICAgICBpZiAoZmlyc3RJRkRPZmZzZXQgPj0gMHgwMDAwMDAwOCkge1xuICAgICAgICAgICAgICBpZmRTdGFydCA9IHRpZmZPZmZzZXQgKyBmaXJzdElGRE9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaWZkU3RhcnQpIHtcbiAgICB2YXIgX2xlbmd0aCA9IGRhdGFWaWV3LmdldFVpbnQxNihpZmRTdGFydCwgbGl0dGxlRW5kaWFuKTtcbiAgICB2YXIgX29mZnNldCA9IHZvaWQgMDtcbiAgICB2YXIgaSA9IHZvaWQgMDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBfbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIF9vZmZzZXQgPSBpZmRTdGFydCArIGkgKiAxMiArIDI7XG5cbiAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50MTYoX29mZnNldCwgbGl0dGxlRW5kaWFuKSA9PT0gMHgwMTEyIC8qIE9yaWVudGF0aW9uICovKSB7XG4gICAgICAgICAgLy8gOCBpcyB0aGUgb2Zmc2V0IG9mIHRoZSBjdXJyZW50IHRhZydzIHZhbHVlXG4gICAgICAgICAgX29mZnNldCArPSA4O1xuXG4gICAgICAgICAgLy8gR2V0IHRoZSBvcmlnaW5hbCBvcmllbnRhdGlvbiB2YWx1ZVxuICAgICAgICAgIG9yaWVudGF0aW9uID0gZGF0YVZpZXcuZ2V0VWludDE2KF9vZmZzZXQsIGxpdHRsZUVuZGlhbik7XG5cbiAgICAgICAgICAvLyBPdmVycmlkZSB0aGUgb3JpZW50YXRpb24gd2l0aCBpdHMgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgIGRhdGFWaWV3LnNldFVpbnQxNihfb2Zmc2V0LCAxLCBsaXR0bGVFbmRpYW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9yaWVudGF0aW9uO1xufVxuXG4vKipcbiAqIFBhcnNlIEV4aWYgT3JpZW50YXRpb24gdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcn0gb3JpZW50YXRpb24gLSBUaGUgb3JpZW50YXRpb24gdG8gcGFyc2UuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcGFyc2VkIHJlc3VsdC5cbiAqL1xuZnVuY3Rpb24gcGFyc2VPcmllbnRhdGlvbihvcmllbnRhdGlvbikge1xuICB2YXIgcm90YXRlID0gMDtcbiAgdmFyIHNjYWxlWCA9IDE7XG4gIHZhciBzY2FsZVkgPSAxO1xuXG4gIHN3aXRjaCAob3JpZW50YXRpb24pIHtcbiAgICAvLyBGbGlwIGhvcml6b250YWxcbiAgICBjYXNlIDI6XG4gICAgICBzY2FsZVggPSAtMTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gUm90YXRlIGxlZnQgMTgwwrBcbiAgICBjYXNlIDM6XG4gICAgICByb3RhdGUgPSAtMTgwO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBGbGlwIHZlcnRpY2FsXG4gICAgY2FzZSA0OlxuICAgICAgc2NhbGVZID0gLTE7XG4gICAgICBicmVhaztcblxuICAgIC8vIEZsaXAgdmVydGljYWwgYW5kIHJvdGF0ZSByaWdodCA5MMKwXG4gICAgY2FzZSA1OlxuICAgICAgcm90YXRlID0gOTA7XG4gICAgICBzY2FsZVkgPSAtMTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gUm90YXRlIHJpZ2h0IDkwwrBcbiAgICBjYXNlIDY6XG4gICAgICByb3RhdGUgPSA5MDtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gRmxpcCBob3Jpem9udGFsIGFuZCByb3RhdGUgcmlnaHQgOTDCsFxuICAgIGNhc2UgNzpcbiAgICAgIHJvdGF0ZSA9IDkwO1xuICAgICAgc2NhbGVYID0gLTE7XG4gICAgICBicmVhaztcblxuICAgIC8vIFJvdGF0ZSBsZWZ0IDkwwrBcbiAgICBjYXNlIDg6XG4gICAgICByb3RhdGUgPSAtOTA7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJvdGF0ZTogcm90YXRlLFxuICAgIHNjYWxlWDogc2NhbGVYLFxuICAgIHNjYWxlWTogc2NhbGVZXG4gIH07XG59XG5cbnZhciBhc3luY0dlbmVyYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQXdhaXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jR2VuZXJhdG9yKGdlbikge1xuICAgIHZhciBmcm9udCwgYmFjaztcblxuICAgIGZ1bmN0aW9uIHNlbmQoa2V5LCBhcmcpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIGFyZzogYXJnLFxuICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgICAgICAgcmVqZWN0OiByZWplY3QsXG4gICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChiYWNrKSB7XG4gICAgICAgICAgYmFjayA9IGJhY2submV4dCA9IHJlcXVlc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnJvbnQgPSBiYWNrID0gcmVxdWVzdDtcbiAgICAgICAgICByZXN1bWUoa2V5LCBhcmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXN1bWUoa2V5LCBhcmcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBnZW5ba2V5XShhcmcpO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXdhaXRWYWx1ZSkge1xuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZS52YWx1ZSkudGhlbihmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICByZXN1bWUoXCJuZXh0XCIsIGFyZyk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgcmVzdW1lKFwidGhyb3dcIiwgYXJnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXR0bGUocmVzdWx0LmRvbmUgPyBcInJldHVyblwiIDogXCJub3JtYWxcIiwgcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNldHRsZShcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dGxlKHR5cGUsIHZhbHVlKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInJldHVyblwiOlxuICAgICAgICAgIGZyb250LnJlc29sdmUoe1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJ0aHJvd1wiOlxuICAgICAgICAgIGZyb250LnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBmcm9udC5yZXNvbHZlKHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGZyb250ID0gZnJvbnQubmV4dDtcblxuICAgICAgaWYgKGZyb250KSB7XG4gICAgICAgIHJlc3VtZShmcm9udC5rZXksIGZyb250LmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWNrID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbnZva2UgPSBzZW5kO1xuXG4gICAgaWYgKHR5cGVvZiBnZW4ucmV0dXJuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMucmV0dXJuID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHtcbiAgICBBc3luY0dlbmVyYXRvci5wcm90b3R5cGVbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfVxuXG4gIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB0aGlzLl9pbnZva2UoXCJuZXh0XCIsIGFyZyk7XG4gIH07XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLnRocm93ID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB0aGlzLl9pbnZva2UoXCJ0aHJvd1wiLCBhcmcpO1xuICB9O1xuXG4gIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcInJldHVyblwiLCBhcmcpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgd3JhcDogZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFzeW5jR2VuZXJhdG9yKGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGF3YWl0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBuZXcgQXdhaXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cblxuXG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuXG5cblxuXG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgX3dpbmRvdyA9IHdpbmRvdztcbnZhciBBcnJheUJ1ZmZlciQxID0gX3dpbmRvdy5BcnJheUJ1ZmZlcjtcbnZhciBGaWxlUmVhZGVyID0gX3dpbmRvdy5GaWxlUmVhZGVyO1xuXG52YXIgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xudmFyIFJFR0VYUF9FWFRFTlNJT04gPSAvXFwuXFx3KyQvO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW1hZ2UgY29tcHJlc3Nvci5cbiAqIEBjbGFzc1xuICovXG5cbnZhciBJbWFnZUNvbXByZXNzb3IgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3Igb2YgSW1hZ2VDb21wcmVzc29yLlxuICAgKiBAcGFyYW0ge0ZpbGV8QmxvYn0gZmlsZSAtIFRoZSB0YXJnZXQgaW1hZ2UgZmlsZSBmb3IgY29tcHJlc3NpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucyBmb3IgY29tcHJlc3NpbmcuXG4gICAqL1xuICBmdW5jdGlvbiBJbWFnZUNvbXByZXNzb3IoZmlsZSwgb3B0aW9ucykge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEltYWdlQ29tcHJlc3Nvcik7XG5cbiAgICB0aGlzLnJlc3VsdCA9IG51bGw7XG5cbiAgICBpZiAoZmlsZSkge1xuICAgICAgdGhpcy5jb21wcmVzcyhmaWxlLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1haW4gY29tcHJlc3MgbWV0aG9kLlxuICAgKiBAcGFyYW0ge0ZpbGV8QmxvYn0gZmlsZSAtIFRoZSB0YXJnZXQgaW1hZ2UgZmlsZSBmb3IgY29tcHJlc3NpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgb3B0aW9ucyBmb3IgY29tcHJlc3NpbmcuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgUHJvbWlzZSBpbnN0YW5jZS5cbiAgICovXG5cblxuICBjcmVhdGVDbGFzcyhJbWFnZUNvbXByZXNzb3IsIFt7XG4gICAga2V5OiAnY29tcHJlc3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wcmVzcyhmaWxlLCBvcHRpb25zKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBERUZBVUxUUywgb3B0aW9ucyk7XG5cbiAgICAgIGlmICghQXJyYXlCdWZmZXIkMSkge1xuICAgICAgICBvcHRpb25zLmNoZWNrT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKCFpc0Jsb2IoZmlsZSkpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIEZpbGUgb3IgQmxvYiBvYmplY3QuJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtaW1lVHlwZSA9IGZpbGUudHlwZTtcblxuICAgICAgICBpZiAoIWlzSW1hZ2VUeXBlKG1pbWVUeXBlKSkge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGFuIGltYWdlIEZpbGUgb3IgQmxvYiBvYmplY3QuJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghVVJMICYmICFGaWxlUmVhZGVyKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignVGhlIGN1cnJlbnQgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGltYWdlIGNvbXByZXNzaW9uLicpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVJMICYmICFvcHRpb25zLmNoZWNrT3JpZW50YXRpb24pIHtcbiAgICAgICAgICByZXNvbHZlKFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkpO1xuICAgICAgICB9IGVsc2UgaWYgKEZpbGVSZWFkZXIpIHtcbiAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICB2YXIgY2hlY2tPcmllbnRhdGlvbiA9IG9wdGlvbnMuY2hlY2tPcmllbnRhdGlvbiAmJiBtaW1lVHlwZSA9PT0gJ2ltYWdlL2pwZWcnO1xuXG4gICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gX3JlZi50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGFyZ2V0LnJlc3VsdDtcblxuXG4gICAgICAgICAgICByZXNvbHZlKGNoZWNrT3JpZW50YXRpb24gPyBfZXh0ZW5kcyh7XG4gICAgICAgICAgICAgIHVybDogYXJyYXlCdWZmZXJUb0RhdGFVUkwocmVzdWx0LCBtaW1lVHlwZSlcbiAgICAgICAgICAgIH0sIHBhcnNlT3JpZW50YXRpb24oZ2V0T3JpZW50YXRpb24ocmVzdWx0KSkpIDoge1xuICAgICAgICAgICAgICB1cmw6IHJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZWFkZXIub25hYm9ydCA9IHJlamVjdDtcbiAgICAgICAgICByZWFkZXIub25lcnJvciA9IHJlamVjdDtcblxuICAgICAgICAgIGlmIChjaGVja09yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF9leHRlbmRzKHt9LCBkYXRhLCB7XG4gICAgICAgICAgICAgIG5hdHVyYWxXaWR0aDogaW1hZ2UubmF0dXJhbFdpZHRoLFxuICAgICAgICAgICAgICBuYXR1cmFsSGVpZ2h0OiBpbWFnZS5uYXR1cmFsSGVpZ2h0XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbWFnZS5vbmFib3J0ID0gcmVqZWN0O1xuICAgICAgICAgIGltYWdlLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgICAgaW1hZ2UuYWx0ID0gZmlsZS5uYW1lO1xuICAgICAgICAgIGltYWdlLnNyYyA9IGRhdGEudXJsO1xuICAgICAgICB9KTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgIHZhciBuYXR1cmFsV2lkdGggPSBfcmVmMi5uYXR1cmFsV2lkdGgsXG4gICAgICAgICAgICBuYXR1cmFsSGVpZ2h0ID0gX3JlZjIubmF0dXJhbEhlaWdodCxcbiAgICAgICAgICAgIF9yZWYyJHJvdGF0ZSA9IF9yZWYyLnJvdGF0ZSxcbiAgICAgICAgICAgIHJvdGF0ZSA9IF9yZWYyJHJvdGF0ZSA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYyJHJvdGF0ZSxcbiAgICAgICAgICAgIF9yZWYyJHNjYWxlWCA9IF9yZWYyLnNjYWxlWCxcbiAgICAgICAgICAgIHNjYWxlWCA9IF9yZWYyJHNjYWxlWCA9PT0gdW5kZWZpbmVkID8gMSA6IF9yZWYyJHNjYWxlWCxcbiAgICAgICAgICAgIF9yZWYyJHNjYWxlWSA9IF9yZWYyLnNjYWxlWSxcbiAgICAgICAgICAgIHNjYWxlWSA9IF9yZWYyJHNjYWxlWSA9PT0gdW5kZWZpbmVkID8gMSA6IF9yZWYyJHNjYWxlWTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgdmFyIGFzcGVjdFJhdGlvID0gbmF0dXJhbFdpZHRoIC8gbmF0dXJhbEhlaWdodDtcbiAgICAgICAgICB2YXIgbWF4V2lkdGggPSBNYXRoLm1heChvcHRpb25zLm1heFdpZHRoLCAwKSB8fCBJbmZpbml0eTtcbiAgICAgICAgICB2YXIgbWF4SGVpZ2h0ID0gTWF0aC5tYXgob3B0aW9ucy5tYXhIZWlnaHQsIDApIHx8IEluZmluaXR5O1xuICAgICAgICAgIHZhciBtaW5XaWR0aCA9IE1hdGgubWF4KG9wdGlvbnMubWluV2lkdGgsIDApIHx8IDA7XG4gICAgICAgICAgdmFyIG1pbkhlaWdodCA9IE1hdGgubWF4KG9wdGlvbnMubWluSGVpZ2h0LCAwKSB8fCAwO1xuICAgICAgICAgIHZhciB3aWR0aCA9IG5hdHVyYWxXaWR0aDtcbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gbmF0dXJhbEhlaWdodDtcblxuICAgICAgICAgIGlmIChtYXhXaWR0aCA8IEluZmluaXR5ICYmIG1heEhlaWdodCA8IEluZmluaXR5KSB7XG4gICAgICAgICAgICBpZiAobWF4SGVpZ2h0ICogYXNwZWN0UmF0aW8gPiBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICBtYXhIZWlnaHQgPSBtYXhXaWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWF4V2lkdGggPSBtYXhIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG1heFdpZHRoIDwgSW5maW5pdHkpIHtcbiAgICAgICAgICAgIG1heEhlaWdodCA9IG1heFdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgfSBlbHNlIGlmIChtYXhIZWlnaHQgPCBJbmZpbml0eSkge1xuICAgICAgICAgICAgbWF4V2lkdGggPSBtYXhIZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobWluV2lkdGggPiAwICYmIG1pbkhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIGlmIChtaW5IZWlnaHQgKiBhc3BlY3RSYXRpbyA+IG1pbldpZHRoKSB7XG4gICAgICAgICAgICAgIG1pbkhlaWdodCA9IG1pbldpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtaW5XaWR0aCA9IG1pbkhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobWluV2lkdGggPiAwKSB7XG4gICAgICAgICAgICBtaW5IZWlnaHQgPSBtaW5XaWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH0gZWxzZSBpZiAobWluSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgbWluV2lkdGggPSBtaW5IZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob3B0aW9ucy53aWR0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBfb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB3aWR0aCA9IF9vcHRpb25zLndpZHRoO1xuXG4gICAgICAgICAgICBoZWlnaHQgPSB3aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICB2YXIgX29wdGlvbnMyID0gb3B0aW9ucztcbiAgICAgICAgICAgIGhlaWdodCA9IF9vcHRpb25zMi5oZWlnaHQ7XG5cbiAgICAgICAgICAgIHdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2lkdGggPSBNYXRoLm1pbihNYXRoLm1heCh3aWR0aCwgbWluV2lkdGgpLCBtYXhXaWR0aCk7XG4gICAgICAgICAgaGVpZ2h0ID0gTWF0aC5taW4oTWF0aC5tYXgoaGVpZ2h0LCBtaW5IZWlnaHQpLCBtYXhIZWlnaHQpO1xuXG4gICAgICAgICAgdmFyIGRlc3RYID0gLXdpZHRoIC8gMjtcbiAgICAgICAgICB2YXIgZGVzdFkgPSAtaGVpZ2h0IC8gMjtcbiAgICAgICAgICB2YXIgZGVzdFdpZHRoID0gd2lkdGg7XG4gICAgICAgICAgdmFyIGRlc3RIZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgICBpZiAoTWF0aC5hYnMocm90YXRlKSAlIDE4MCA9PT0gOTApIHtcbiAgICAgICAgICAgIHZhciBfd2lkdGgkaGVpZ2h0ID0ge1xuICAgICAgICAgICAgICB3aWR0aDogaGVpZ2h0LFxuICAgICAgICAgICAgICBoZWlnaHQ6IHdpZHRoXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2lkdGggPSBfd2lkdGgkaGVpZ2h0LndpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gX3dpZHRoJGhlaWdodC5oZWlnaHQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICAgIC8vIE92ZXJyaWRlIHRoZSBkZWZhdWx0IGZpbGwgY29sb3IgKCMwMDAsIGJsYWNrKVxuICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgY29udGV4dC5yb3RhdGUocm90YXRlICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgICAgY29udGV4dC5zY2FsZShzY2FsZVgsIHNjYWxlWSk7XG4gICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIE1hdGguZmxvb3IoZGVzdFgpLCBNYXRoLmZsb29yKGRlc3RZKSwgTWF0aC5mbG9vcihkZXN0V2lkdGgpLCBNYXRoLmZsb29yKGRlc3RIZWlnaHQpKTtcbiAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcblxuICAgICAgICAgIGlmICghaXNJbWFnZVR5cGUob3B0aW9ucy5taW1lVHlwZSkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubWltZVR5cGUgPSBmaWxlLnR5cGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ29udmVydHMgUE5HIGZpbGVzIG92ZXIgdGhlIGBjb252ZXJ0U2l6ZWAgdG8gSlBFR3MuXG4gICAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IG9wdGlvbnMuY29udmVydFNpemUgJiYgb3B0aW9ucy5taW1lVHlwZSA9PT0gJ2ltYWdlL3BuZycpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubWltZVR5cGUgPSAnaW1hZ2UvanBlZyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNhbnZhcy50b0Jsb2IpIHtcbiAgICAgICAgICAgIGNhbnZhcy50b0Jsb2IocmVzb2x2ZSwgb3B0aW9ucy5taW1lVHlwZSwgb3B0aW9ucy5xdWFsaXR5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShjYW52YXNUb0Jsb2IoY2FudmFzLnRvRGF0YVVSTChvcHRpb25zLm1pbWVUeXBlLCBvcHRpb25zLnF1YWxpdHkpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBpZiAoVVJMKSB7XG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChpbWFnZS5zcmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIC8vIFJldHVybnMgb3JpZ2luYWwgZmlsZSBpZiB0aGUgcmVzdWx0IGlzIGdyZWF0ZXIgdGhhbiBpdCBhbmQgd2l0aG91dCBzaXplIHJlbGF0ZWQgb3B0aW9uc1xuICAgICAgICAgIGlmIChyZXN1bHQuc2l6ZSA+IGZpbGUuc2l6ZSAmJiAhKG9wdGlvbnMud2lkdGggPiAwIHx8IG9wdGlvbnMuaGVpZ2h0ID4gMCB8fCBvcHRpb25zLm1heFdpZHRoIDwgSW5maW5pdHkgfHwgb3B0aW9ucy5tYXhIZWlnaHQgPCBJbmZpbml0eSB8fCBvcHRpb25zLm1pbldpZHRoID4gMCB8fCBvcHRpb25zLm1pbkhlaWdodCA+IDApKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmaWxlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5sYXN0TW9kaWZpZWQgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHJlc3VsdC5sYXN0TW9kaWZpZWREYXRlID0gZGF0ZTtcbiAgICAgICAgICAgIHJlc3VsdC5uYW1lID0gZmlsZS5uYW1lO1xuXG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBleHRlbnNpb24gdG8gbWF0Y2ggaXRzIHR5cGVcbiAgICAgICAgICAgIGlmIChyZXN1bHQubmFtZSAmJiByZXN1bHQudHlwZSAhPT0gZmlsZS50eXBlKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUucmVwbGFjZShSRUdFWFBfRVhURU5TSU9OLCBpbWFnZVR5cGVUb0V4dGVuc2lvbihyZXN1bHQudHlwZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBSZXR1cm5zIG9yaWdpbmFsIGZpbGUgaWYgdGhlIHJlc3VsdCBpcyBudWxsIGluIHNvbWUgY2FzZXMuXG4gICAgICAgICAgcmVzdWx0ID0gZmlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLnJlc3VsdCA9IHJlc3VsdDtcblxuICAgICAgICBpZiAob3B0aW9ucy5zdWNjZXNzKSB7XG4gICAgICAgICAgb3B0aW9ucy5zdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5lcnJvcikge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSW1hZ2VDb21wcmVzc29yO1xufSgpO1xuXG5yZXR1cm4gSW1hZ2VDb21wcmVzc29yO1xuXG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHhrZXNoaS9pbWFnZS1jb21wcmVzc29yL2Rpc3QvaW1hZ2UtY29tcHJlc3Nvci5qc1xuLy8gbW9kdWxlIGlkID0gNzAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogTmFtZTogdnVlLXVwbG9hZC1jb21wb25lbnRcbiAqIFZlcnNpb246IDIuNi4zXG4gKiBBdXRob3I6IExpYW5ZdWVcbiAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLlZ1ZVVwbG9hZENvbXBvbmVudCA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgICAgICBjc3MgPSBcIlwiO3N0eWxlLnR5cGUgPSAndGV4dC9jc3MnO2lmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxufSkoKTtcblxudmFyIElucHV0RmlsZSA9IHsgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF92bSA9IHRoaXM7dmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaDtyZXR1cm4gX2MoJ2lucHV0JywgeyBhdHRyczogeyBcInR5cGVcIjogXCJmaWxlXCIsIFwibmFtZVwiOiBfdm0uJHBhcmVudC5uYW1lLCBcImlkXCI6IF92bS4kcGFyZW50LmlucHV0SWQgfHwgX3ZtLiRwYXJlbnQubmFtZSwgXCJhY2NlcHRcIjogX3ZtLiRwYXJlbnQuYWNjZXB0LCBcIndlYmtpdGRpcmVjdG9yeVwiOiBfdm0uJHBhcmVudC5kaXJlY3RvcnkgJiYgX3ZtLiRwYXJlbnQuZmVhdHVyZXMuZGlyZWN0b3J5LCBcImRpcmVjdG9yeVwiOiBfdm0uJHBhcmVudC5kaXJlY3RvcnkgJiYgX3ZtLiRwYXJlbnQuZmVhdHVyZXMuZGlyZWN0b3J5LCBcIm11bHRpcGxlXCI6IF92bS4kcGFyZW50Lm11bHRpcGxlICYmIF92bS4kcGFyZW50LmZlYXR1cmVzLmh0bWw1IH0sIG9uOiB7IFwiY2hhbmdlXCI6IF92bS5jaGFuZ2UgfSB9KTtcbiAgfSwgc3RhdGljUmVuZGVyRm5zOiBbXSxcbiAgbWV0aG9kczoge1xuICAgIGNoYW5nZTogZnVuY3Rpb24gY2hhbmdlKGUpIHtcbiAgICAgIHRoaXMuJGRlc3Ryb3koKTtcbiAgICAgIHRoaXMuJHBhcmVudC5hZGRJbnB1dEZpbGUoZS50YXJnZXQpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7XG4gICAgICAgIHBhcmVudDogdGhpcy4kcGFyZW50LFxuICAgICAgICBlbDogdGhpcy4kZWxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgICAgICBjc3MgPSBcIiAuZmlsZS11cGxvYWRzIHsgb3ZlcmZsb3c6IGhpZGRlbjsgcG9zaXRpb246IHJlbGF0aXZlOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgfSAuZmlsZS11cGxvYWRzLmZpbGUtdXBsb2Fkcy1odG1sNCBpbnB1dFt0eXBlPVxcXCJmaWxlXFxcIl0geyBvcGFjaXR5OiAwOyBmb250LXNpemU6IDIwZW07IHotaW5kZXg6IDE7IHRvcDogMDsgbGVmdDogMDsgcmlnaHQ6IDA7IGJvdHRvbTogMDsgcG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB9IC5maWxlLXVwbG9hZHMuZmlsZS11cGxvYWRzLWh0bWw1IGlucHV0W3R5cGU9XFxcImZpbGVcXFwiXSB7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiBmaXhlZDsgd2lkdGg6IDFweDsgaGVpZ2h0OiAxcHg7IHotaW5kZXg6IC0xOyBvcGFjaXR5OiAwOyB9IFwiO3N0eWxlLnR5cGUgPSAndGV4dC9jc3MnO2lmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxufSkoKTtcblxudmFyIEZpbGVVcGxvYWQgPSB7IHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdm0gPSB0aGlzO3ZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2g7cmV0dXJuIF9jKCdsYWJlbCcsIHsgY2xhc3M6IF92bS5jbGFzc05hbWUgfSwgW192bS5fdChcImRlZmF1bHRcIiksIF92bS5fdihcIiBcIiksIF9jKCdpbnB1dC1maWxlJyldLCAyKTtcbiAgfSwgc3RhdGljUmVuZGVyRm5zOiBbXSxcbiAgY29tcG9uZW50czoge1xuICAgIElucHV0RmlsZTogSW5wdXRGaWxlXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgaW5wdXRJZDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcblxuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdmaWxlJ1xuICAgIH0sXG5cbiAgICBhY2NlcHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG5cbiAgICBtdWx0aXBsZToge1xuICAgICAgdHlwZTogQm9vbGVhblxuICAgIH0sXG5cbiAgICBhZGRJbmRleDoge1xuICAgICAgdHlwZTogW0Jvb2xlYW4sIE51bWJlcl1cbiAgICB9LFxuXG4gICAgZGlyZWN0b3J5OiB7XG4gICAgICB0eXBlOiBCb29sZWFuXG4gICAgfSxcblxuICAgIHBvc3RBY3Rpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG5cbiAgICBwdXRBY3Rpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG5cbiAgICBoZWFkZXJzOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICBkZWZhdWx0OiBPYmplY3RcbiAgICB9LFxuXG4gICAgZGF0YToge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgZGVmYXVsdDogT2JqZWN0XG4gICAgfSxcblxuICAgIHRpbWVvdXQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgZHJvcDoge1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuXG4gICAgZHJvcERpcmVjdG9yeToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuXG4gICAgc2l6ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBleHRlbnNpb25zOiB7XG4gICAgICBkZWZhdWx0OiBBcnJheVxuICAgIH0sXG5cbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiBBcnJheVxuICAgIH0sXG5cbiAgICB0aHJlYWQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDFcbiAgICB9XG4gIH0sXG5cbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZXM6IHRoaXMudmFsdWUsXG4gICAgICBmZWF0dXJlczoge1xuICAgICAgICBodG1sNTogdHJ1ZSxcbiAgICAgICAgZGlyZWN0b3J5OiBmYWxzZSxcbiAgICAgICAgZHJhZzogZmFsc2VcbiAgICAgIH0sXG5cbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICBkcm9wQWN0aXZlOiBmYWxzZSxcblxuICAgICAgdXBsb2FkaW5nOiAwLFxuXG4gICAgICBkZXN0cm95OiBmYWxzZVxuICAgIH07XG4gIH0sXG5cblxuICAvKipcbiAgICogbW91bnRlZFxuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC50eXBlID0gJ2ZpbGUnO1xuICAgIGlucHV0Lm11bHRpcGxlID0gdHJ1ZTtcblxuICAgIC8vIGh0bWw1IOeJueW+gVxuICAgIGlmICh3aW5kb3cuRm9ybURhdGEgJiYgaW5wdXQuZmlsZXMpIHtcbiAgICAgIC8vIOS4iuS8oOebruW9leeJueW+gVxuICAgICAgaWYgKHR5cGVvZiBpbnB1dC53ZWJraXRkaXJlY3RvcnkgPT09ICdib29sZWFuJyB8fCB0eXBlb2YgaW5wdXQuZGlyZWN0b3J5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5mZWF0dXJlcy5kaXJlY3RvcnkgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyDmi5bmi73nibnlvoFcbiAgICAgIGlmICh0aGlzLmZlYXR1cmVzLmh0bWw1ICYmIHR5cGVvZiBpbnB1dC5vbmRyb3AgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuZmVhdHVyZXMuZHJvcCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmVhdHVyZXMuaHRtbDUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBmaWxlcyDlrprkvY3nvJPlrZhcbiAgICB0aGlzLm1hcHMgPSB7fTtcblxuICAgIHRoaXMuJG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8g5pu05paw5LiL54i257qnXG4gICAgICBpZiAodGhpcy4kcGFyZW50KSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC4kZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cblxuICAgICAgLy8g5ouW5ou95riy5p+TXG4gICAgICB0aGlzLndhdGNoRHJvcCh0aGlzLmRyb3ApO1xuICAgIH0pO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIGJlZm9yZURlc3Ryb3lcbiAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBiZWZvcmVEZXN0cm95OiBmdW5jdGlvbiBiZWZvcmVEZXN0cm95KCkge1xuICAgIC8vIOW3sumUgOavgVxuICAgIHRoaXMuZGVzdHJveSA9IHRydWU7XG5cbiAgICAvLyDorr7nva7miJDkuI3mv4DmtLtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9LFxuXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICAvKipcbiAgICAgKiB1cGxvYWRpbmcg5q2j5Zyo5LiK5Lyg55qE57q/56iLXG4gICAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiB1cGxvYWRlZCDmlofku7bliJfooajmmK/lkKblhajpg6jlt7LkuIrkvKBcbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICB1cGxvYWRlZDogZnVuY3Rpb24gdXBsb2FkZWQoKSB7XG4gICAgICB2YXIgZmlsZSA9IHZvaWQgMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmaWxlID0gdGhpcy5maWxlc1tpXTtcbiAgICAgICAgaWYgKGZpbGUuZmlsZU9iamVjdCAmJiAhZmlsZS5lcnJvciAmJiAhZmlsZS5zdWNjZXNzKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGNsYXNzTmFtZTogZnVuY3Rpb24gY2xhc3NOYW1lKCkge1xuICAgICAgcmV0dXJuIFsnZmlsZS11cGxvYWRzJywgdGhpcy5mZWF0dXJlcy5odG1sNSA/ICdmaWxlLXVwbG9hZHMtaHRtbDUnIDogJ2ZpbGUtdXBsb2Fkcy1odG1sNCcsIHRoaXMuZmVhdHVyZXMuZGlyZWN0b3J5ICYmIHRoaXMuZGlyZWN0b3J5ID8gJ2ZpbGUtdXBsb2Fkcy1kaXJlY3RvcnknIDogdW5kZWZpbmVkLCB0aGlzLmZlYXR1cmVzLmRyb3AgJiYgdGhpcy5kcm9wID8gJ2ZpbGUtdXBsb2Fkcy1kcm9wJyA6IHVuZGVmaW5lZF07XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgYWN0aXZlOiBmdW5jdGlvbiBhY3RpdmUoX2FjdGl2ZSkge1xuICAgICAgdGhpcy53YXRjaEFjdGl2ZShfYWN0aXZlKTtcbiAgICB9LFxuICAgIGRyb3BBY3RpdmU6IGZ1bmN0aW9uIGRyb3BBY3RpdmUoKSB7XG4gICAgICBpZiAodGhpcy4kcGFyZW50KSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC4kZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRyb3A6IGZ1bmN0aW9uIGRyb3AodmFsdWUpIHtcbiAgICAgIHRoaXMud2F0Y2hEcm9wKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmaWxlcykge1xuICAgICAgaWYgKHRoaXMuZmlsZXMgPT09IGZpbGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsZXMgPSBmaWxlcztcblxuICAgICAgdmFyIG9sZE1hcHMgPSB0aGlzLm1hcHM7XG5cbiAgICAgIC8vIOmHjeWGmSBtYXBzIOe8k+WtmFxuICAgICAgdGhpcy5tYXBzID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZpbGUgPSB0aGlzLmZpbGVzW2ldO1xuICAgICAgICB0aGlzLm1hcHNbZmlsZS5pZF0gPSBmaWxlO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGQsIHVwZGF0ZVxuICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMubWFwcykge1xuICAgICAgICB2YXIgbmV3RmlsZSA9IHRoaXMubWFwc1trZXldO1xuICAgICAgICB2YXIgb2xkRmlsZSA9IG9sZE1hcHNba2V5XTtcbiAgICAgICAgaWYgKG5ld0ZpbGUgIT09IG9sZEZpbGUpIHtcbiAgICAgICAgICB0aGlzLmVtaXRGaWxlKG5ld0ZpbGUsIG9sZEZpbGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGRlbGV0ZVxuICAgICAgZm9yICh2YXIgX2tleSBpbiBvbGRNYXBzKSB7XG4gICAgICAgIGlmICghdGhpcy5tYXBzW19rZXldKSB7XG4gICAgICAgICAgdGhpcy5lbWl0RmlsZSh1bmRlZmluZWQsIG9sZE1hcHNbX2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcblxuICAgIC8vIOa4heepulxuICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIGlmICh0aGlzLmZpbGVzLmxlbmd0aCkge1xuICAgICAgICB2YXIgZmlsZXMgPSB0aGlzLmZpbGVzO1xuICAgICAgICB0aGlzLmZpbGVzID0gW107XG5cbiAgICAgICAgLy8g5a6a5L2NXG4gICAgICAgIHRoaXMubWFwcyA9IHt9O1xuXG4gICAgICAgIC8vIOS6i+S7tlxuICAgICAgICB0aGlzLmVtaXRJbnB1dCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5lbWl0RmlsZSh1bmRlZmluZWQsIGZpbGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuXG4gICAgLy8g6YCJ5oupXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoaWQpIHtcbiAgICAgIGlmICghaWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHR5cGVvZiBpZCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoaWQpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpZC5pZF0gfHwgZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLm1hcHNbaWRdIHx8IGZhbHNlO1xuICAgIH0sXG5cblxuICAgIC8vIOa3u+WKoFxuICAgIGFkZDogZnVuY3Rpb24gYWRkKF9maWxlcykge1xuICAgICAgdmFyIGluZGV4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB0aGlzLmFkZEluZGV4O1xuXG4gICAgICB2YXIgZmlsZXMgPSBfZmlsZXM7XG4gICAgICB2YXIgaXNBcnJheSA9IGZpbGVzIGluc3RhbmNlb2YgQXJyYXk7XG5cbiAgICAgIC8vIOS4jeaYr+aVsOe7hOaVtOeQhuaIkOaVsOe7hFxuICAgICAgaWYgKCFpc0FycmF5KSB7XG4gICAgICAgIGZpbGVzID0gW2ZpbGVzXTtcbiAgICAgIH1cblxuICAgICAgLy8g6YGN5Y6G6KeE6IyD5a+56LGhXG4gICAgICB2YXIgYWRkRmlsZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZpbGUgPSBmaWxlc1tpXTtcbiAgICAgICAgaWYgKHRoaXMuZmVhdHVyZXMuaHRtbDUgJiYgZmlsZSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICBmaWxlID0ge1xuICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgIHNpemU6IGZpbGUuc2l6ZSxcbiAgICAgICAgICAgIG5hbWU6IGZpbGUud2Via2l0UmVsYXRpdmVQYXRoIHx8IGZpbGUucmVsYXRpdmVQYXRoIHx8IGZpbGUubmFtZSB8fCAndW5rbm93bicsXG4gICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaWxlT2JqZWN0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmaWxlLmZpbGVPYmplY3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgLy8gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlLmZpbGVPYmplY3QpIHtcbiAgICAgICAgICBmaWxlT2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZS5lbCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgICAgICBmaWxlT2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZS5maWxlIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgIGZpbGVPYmplY3QgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWxlT2JqZWN0KSB7XG4gICAgICAgICAgZmlsZSA9IF9leHRlbmRzKHtcbiAgICAgICAgICAgIGZpbGVPYmplY3Q6IHRydWUsXG4gICAgICAgICAgICBzaXplOiAtMSxcbiAgICAgICAgICAgIG5hbWU6ICdGaWxlbmFtZScsXG4gICAgICAgICAgICB0eXBlOiAnJyxcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogJycsXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIHB1dEFjdGlvbjogdGhpcy5wdXRBY3Rpb24sXG4gICAgICAgICAgICBwb3N0QWN0aW9uOiB0aGlzLnBvc3RBY3Rpb24sXG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXRcbiAgICAgICAgICB9LCBmaWxlLCB7XG4gICAgICAgICAgICByZXNwb25zZToge30sXG5cbiAgICAgICAgICAgIHByb2dyZXNzOiAnMC4wMCcsIC8vIOWPquivu1xuICAgICAgICAgICAgc3BlZWQ6IDAgLy8g5Y+q6K+7XG4gICAgICAgICAgICAvLyB4aHI6IGZhbHNlLCAgICAgICAgICAgICAgICAvLyDlj6ror7tcbiAgICAgICAgICAgIC8vIGlmcmFtZTogZmFsc2UsICAgICAgICAgICAgIC8vIOWPquivu1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZmlsZS5kYXRhID0gX2V4dGVuZHMoe30sIHRoaXMuZGF0YSwgZmlsZS5kYXRhID8gZmlsZS5kYXRhIDoge30pO1xuXG4gICAgICAgICAgZmlsZS5oZWFkZXJzID0gX2V4dGVuZHMoe30sIHRoaXMuaGVhZGVycywgZmlsZS5oZWFkZXJzID8gZmlsZS5oZWFkZXJzIDoge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5b+F6aG75YyF5ZCrIGlkXG4gICAgICAgIGlmICghZmlsZS5pZCkge1xuICAgICAgICAgIGZpbGUuaWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lbWl0RmlsdGVyKGZpbGUsIHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEZpbGVzLnB1c2goZmlsZSk7XG5cbiAgICAgICAgLy8g5Y+q5YWB6K645Y2V5Liq5paH5Lu2XG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIOayoeacieaWh+S7tlxuICAgICAgaWYgKCFhZGRGaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyDlj6rlhYHorrjljZXkuKrmlofku7Yg5Yig6Zmk5omA5pyJXG4gICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgfVxuXG4gICAgICAvLyDmt7vliqDov5vljrsgZmlsZXNcbiAgICAgIHZhciBuZXdGaWxlcyA9IHZvaWQgMDtcbiAgICAgIGlmIChpbmRleCA9PT0gdHJ1ZSB8fCBpbmRleCA9PT0gMCkge1xuICAgICAgICBuZXdGaWxlcyA9IGFkZEZpbGVzLmNvbmNhdCh0aGlzLmZpbGVzKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXgpIHtcbiAgICAgICAgbmV3RmlsZXMgPSBhZGRGaWxlcy5jb25jYXQoW10pO1xuICAgICAgICBuZXdGaWxlcy5zcGxpY2UoaW5kZXgsIDAsIGFkZEZpbGVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0ZpbGVzID0gdGhpcy5maWxlcy5jb25jYXQoYWRkRmlsZXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpbGVzID0gbmV3RmlsZXM7XG5cbiAgICAgIC8vIOWumuS9jVxuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFkZEZpbGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgX2ZpbGUyID0gYWRkRmlsZXNbX2ldO1xuICAgICAgICB0aGlzLm1hcHNbX2ZpbGUyLmlkXSA9IF9maWxlMjtcbiAgICAgIH1cblxuICAgICAgLy8g5LqL5Lu2XG4gICAgICB0aGlzLmVtaXRJbnB1dCgpO1xuICAgICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgYWRkRmlsZXMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgICB0aGlzLmVtaXRGaWxlKGFkZEZpbGVzW19pMl0sIHVuZGVmaW5lZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpc0FycmF5ID8gYWRkRmlsZXMgOiBhZGRGaWxlc1swXTtcbiAgICB9LFxuXG5cbiAgICAvLyDmt7vliqDooajljZXmlofku7ZcbiAgICBhZGRJbnB1dEZpbGU6IGZ1bmN0aW9uIGFkZElucHV0RmlsZShlbCkge1xuICAgICAgdmFyIGZpbGVzID0gW107XG4gICAgICBpZiAoZWwuZmlsZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBmaWxlID0gZWwuZmlsZXNbaV07XG4gICAgICAgICAgZmlsZXMucHVzaCh7XG4gICAgICAgICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICAgICAgICBuYW1lOiBmaWxlLndlYmtpdFJlbGF0aXZlUGF0aCB8fCBmaWxlLnJlbGF0aXZlUGF0aCB8fCBmaWxlLm5hbWUsXG4gICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGUsXG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgZWw6IGVsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbGVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGVsLnZhbHVlLnJlcGxhY2UoL14uKj8oW15cXC9cXFxcXFxyXFxuXSspJC8sICckMScpLFxuICAgICAgICAgIGVsOiBlbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFkZChmaWxlcyk7XG4gICAgfSxcblxuXG4gICAgLy8g5re75YqgIERhdGFUcmFuc2ZlclxuICAgIGFkZERhdGFUcmFuc2ZlcjogZnVuY3Rpb24gYWRkRGF0YVRyYW5zZmVyKGRhdGFUcmFuc2Zlcikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIGZpbGVzID0gW107XG4gICAgICBpZiAoZGF0YVRyYW5zZmVyLml0ZW1zICYmIGRhdGFUcmFuc2Zlci5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVRyYW5zZmVyLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhVHJhbnNmZXIuaXRlbXNbaV07XG4gICAgICAgICAgaWYgKGl0ZW0uZ2V0QXNFbnRyeSkge1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0uZ2V0QXNFbnRyeSgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS53ZWJraXRHZXRBc0VudHJ5KSB7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS53ZWJraXRHZXRBc0VudHJ5KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLmdldEFzRmlsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHZhciBmb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgLy8g57uT5p2fIOaIluiAheW3suacieaWh+S7tuS6hlxuICAgICAgICAgICAgaWYgKCFpdGVtIHx8ICFfdGhpcy5tdWx0aXBsZSAmJiBmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuYWRkKGZpbGVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5nZXRFbnRyeShpdGVtKS50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgIGZpbGVzLnB1c2guYXBwbHkoZmlsZXMsIF90b0NvbnN1bWFibGVBcnJheShyZXN1bHRzKSk7XG4gICAgICAgICAgICAgIGZvckVhY2goaSArIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmb3JFYWNoKDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aDsgX2kzKyspIHtcbiAgICAgICAgICBmaWxlcy5wdXNoKGRhdGFUcmFuc2Zlci5maWxlc1tfaTNdKTtcbiAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuYWRkKGZpbGVzKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgIH0sXG5cblxuICAgIC8vIOiOt+W+lyBlbnRyeVxuICAgIGdldEVudHJ5OiBmdW5jdGlvbiBnZXRFbnRyeShlbnRyeSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBwYXRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnJztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKGVudHJ5LmlzRmlsZSkge1xuICAgICAgICAgIGVudHJ5LmZpbGUoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICAgIHJlc29sdmUoW3tcbiAgICAgICAgICAgICAgc2l6ZTogZmlsZS5zaXplLFxuICAgICAgICAgICAgICBuYW1lOiBwYXRoICsgZmlsZS5uYW1lLFxuICAgICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGUsXG4gICAgICAgICAgICAgIGZpbGU6IGZpbGVcbiAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChlbnRyeS5pc0RpcmVjdG9yeSAmJiBfdGhpczIuZHJvcERpcmVjdG9yeSkge1xuICAgICAgICAgIGVudHJ5LmNyZWF0ZVJlYWRlcigpLnJlYWRFbnRyaWVzKGZ1bmN0aW9uIChlbnRyaWVzKSB7XG4gICAgICAgICAgICB2YXIgZmlsZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBmb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChpKSB7XG4gICAgICAgICAgICAgIGlmICghZW50cmllc1tpXSB8fCBmaWxlcy5sZW5ndGggJiYgIV90aGlzMi5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGZpbGVzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBfdGhpczIuZ2V0RW50cnkoZW50cmllc1tpXSwgcGF0aCArIGVudHJ5Lm5hbWUgKyAnLycpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBmaWxlcy5wdXNoLmFwcGx5KGZpbGVzLCBfdG9Db25zdW1hYmxlQXJyYXkocmVzdWx0cykpO1xuICAgICAgICAgICAgICAgIGZvckVhY2goaSArIDEpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3JFYWNoKDApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoaWQxLCBpZDIpIHtcbiAgICAgIHZhciBmaWxlMSA9IHRoaXMuZ2V0KGlkMSk7XG4gICAgICB2YXIgZmlsZTIgPSB0aGlzLmdldChpZDIpO1xuICAgICAgaWYgKCFmaWxlMSB8fCAhZmlsZTIgfHwgZmlsZTEgPT09IGZpbGUyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBmaWxlcyA9IHRoaXMuZmlsZXMuY29uY2F0KFtdKTtcbiAgICAgIHZhciBpbmRleDEgPSBmaWxlcy5pbmRleE9mKGZpbGUxKTtcbiAgICAgIHZhciBpbmRleDIgPSBmaWxlcy5pbmRleE9mKGZpbGUyKTtcbiAgICAgIGlmIChpbmRleDEgPT09IC0xIHx8IGluZGV4MiA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZmlsZXNbaW5kZXgxXSA9IGZpbGUyO1xuICAgICAgZmlsZXNbaW5kZXgyXSA9IGZpbGUxO1xuICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuICAgICAgdGhpcy5lbWl0SW5wdXQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cblxuICAgIC8vIOenu+mZpFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGlkKSB7XG4gICAgICB2YXIgZmlsZSA9IHRoaXMuZ2V0KGlkKTtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgIGlmICh0aGlzLmVtaXRGaWx0ZXIodW5kZWZpbmVkLCBmaWxlKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlsZXMgPSB0aGlzLmZpbGVzLmNvbmNhdChbXSk7XG4gICAgICAgIHZhciBpbmRleCA9IGZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdyZW1vdmUnLCBmaWxlKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuXG4gICAgICAgIC8vIOWumuS9jVxuICAgICAgICBkZWxldGUgdGhpcy5tYXBzW2ZpbGUuaWRdO1xuXG4gICAgICAgIC8vIOS6i+S7tlxuICAgICAgICB0aGlzLmVtaXRJbnB1dCgpO1xuICAgICAgICB0aGlzLmVtaXRGaWxlKHVuZGVmaW5lZCwgZmlsZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlsZTtcbiAgICB9LFxuXG5cbiAgICAvLyDmm7TmlrBcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShpZCwgZGF0YSkge1xuICAgICAgdmFyIGZpbGUgPSB0aGlzLmdldChpZCk7XG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICB2YXIgbmV3RmlsZSA9IF9leHRlbmRzKHt9LCBmaWxlLCBkYXRhKTtcbiAgICAgICAgLy8g5YGc55So5b+F6aG75Yqg5LiK6ZSZ6K+vXG4gICAgICAgIGlmIChmaWxlLmZpbGVPYmplY3QgJiYgZmlsZS5hY3RpdmUgJiYgIW5ld0ZpbGUuYWN0aXZlICYmICFuZXdGaWxlLmVycm9yICYmICFuZXdGaWxlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBuZXdGaWxlLmVycm9yID0gJ2Fib3J0JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVtaXRGaWx0ZXIobmV3RmlsZSwgZmlsZSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlsZXMgPSB0aGlzLmZpbGVzLmNvbmNhdChbXSk7XG4gICAgICAgIHZhciBpbmRleCA9IGZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCd1cGRhdGUnLCBmaWxlKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZmlsZXMuc3BsaWNlKGluZGV4LCAxLCBuZXdGaWxlKTtcbiAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuXG4gICAgICAgIC8vIOWIoOmZpCAg5pen5a6a5L2NIOWGmeWFpSDmlrDlrprkvY0g77yI5bey5L6/5pSv5oyB5L+u5pS5aWQpXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1hcHNbZmlsZS5pZF07XG4gICAgICAgIHRoaXMubWFwc1tuZXdGaWxlLmlkXSA9IG5ld0ZpbGU7XG5cbiAgICAgICAgLy8g5LqL5Lu2XG4gICAgICAgIHRoaXMuZW1pdElucHV0KCk7XG4gICAgICAgIHRoaXMuZW1pdEZpbGUobmV3RmlsZSwgZmlsZSk7XG4gICAgICAgIHJldHVybiBuZXdGaWxlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cblxuICAgIC8vIOmihOWkhOeQhiDkuovku7Yg6L+H5ruk5ZmoXG4gICAgZW1pdEZpbHRlcjogZnVuY3Rpb24gZW1pdEZpbHRlcihuZXdGaWxlLCBvbGRGaWxlKSB7XG4gICAgICB2YXIgaXNQcmV2ZW50ID0gZmFsc2U7XG4gICAgICB0aGlzLiRlbWl0KCdpbnB1dC1maWx0ZXInLCBuZXdGaWxlLCBvbGRGaWxlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlzUHJldmVudCA9IHRydWU7XG4gICAgICAgIHJldHVybiBpc1ByZXZlbnQ7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBpc1ByZXZlbnQ7XG4gICAgfSxcblxuXG4gICAgLy8g5aSE55CG5ZCOIOS6i+S7tiDliIblj5FcbiAgICBlbWl0RmlsZTogZnVuY3Rpb24gZW1pdEZpbGUobmV3RmlsZSwgb2xkRmlsZSkge1xuICAgICAgdGhpcy4kZW1pdCgnaW5wdXQtZmlsZScsIG5ld0ZpbGUsIG9sZEZpbGUpO1xuICAgICAgaWYgKG5ld0ZpbGUgJiYgbmV3RmlsZS5maWxlT2JqZWN0ICYmIG5ld0ZpbGUuYWN0aXZlICYmICghb2xkRmlsZSB8fCAhb2xkRmlsZS5hY3RpdmUpKSB7XG4gICAgICAgIHRoaXMudXBsb2FkaW5nKys7XG4gICAgICAgIC8vIOa/gOa0u1xuICAgICAgICB0aGlzLiRuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzMy51cGxvYWQobmV3RmlsZSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgICBuZXdGaWxlID0gX3RoaXMzLmdldChuZXdGaWxlKTtcbiAgICAgICAgICAgICAgaWYgKG5ld0ZpbGUgJiYgbmV3RmlsZS5maWxlT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMzLnVwZGF0ZShuZXdGaWxlLCB7XG4gICAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgc3VjY2VzczogIW5ld0ZpbGUuZXJyb3JcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgX3RoaXMzLnVwZGF0ZShuZXdGaWxlLCB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZS5jb2RlIHx8IGUuZXJyb3IgfHwgZS5tZXNzYWdlIHx8IGVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCBwYXJzZUludChNYXRoLnJhbmRvbSgpICogNTAgKyA1MCwgMTApKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKCghbmV3RmlsZSB8fCAhbmV3RmlsZS5maWxlT2JqZWN0IHx8ICFuZXdGaWxlLmFjdGl2ZSkgJiYgb2xkRmlsZSAmJiBvbGRGaWxlLmZpbGVPYmplY3QgJiYgb2xkRmlsZS5hY3RpdmUpIHtcbiAgICAgICAgLy8g5YGc5q2iXG4gICAgICAgIHRoaXMudXBsb2FkaW5nLS07XG4gICAgICB9XG5cbiAgICAgIC8vIOiHquWKqOW7tue7rea/gOa0u1xuICAgICAgaWYgKHRoaXMuYWN0aXZlICYmIChCb29sZWFuKG5ld0ZpbGUpICE9PSBCb29sZWFuKG9sZEZpbGUpIHx8IG5ld0ZpbGUuYWN0aXZlICE9PSBvbGRGaWxlLmFjdGl2ZSkpIHtcbiAgICAgICAgdGhpcy53YXRjaEFjdGl2ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVtaXRJbnB1dDogZnVuY3Rpb24gZW1pdElucHV0KCkge1xuICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB0aGlzLmZpbGVzKTtcbiAgICB9LFxuXG5cbiAgICAvLyDkuIrkvKBcbiAgICB1cGxvYWQ6IGZ1bmN0aW9uIHVwbG9hZChpZCkge1xuICAgICAgdmFyIGZpbGUgPSB0aGlzLmdldChpZCk7XG5cbiAgICAgIC8vIOiiq+WIoOmZpFxuICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnbm90X2V4aXN0cycpO1xuICAgICAgfVxuXG4gICAgICAvLyDkuI3mmK/mlofku7blr7nosaFcbiAgICAgIGlmICghZmlsZS5maWxlT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnZmlsZV9vYmplY3QnKTtcbiAgICAgIH1cblxuICAgICAgLy8g5pyJ6ZSZ6K+v55u05o6l5ZON5bqUXG4gICAgICBpZiAoZmlsZS5lcnJvcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZmlsZS5lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIC8vIOW3suWujOaIkOebtOaOpeWTjeW6lFxuICAgICAgaWYgKGZpbGUuc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZpbGUpO1xuICAgICAgfVxuXG4gICAgICAvLyDlkI7nvIBcbiAgICAgIHZhciBleHRlbnNpb25zID0gdGhpcy5leHRlbnNpb25zO1xuICAgICAgaWYgKGV4dGVuc2lvbnMgJiYgKGV4dGVuc2lvbnMubGVuZ3RoIHx8IHR5cGVvZiBleHRlbnNpb25zLmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgIGlmICgodHlwZW9mIGV4dGVuc2lvbnMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGV4dGVuc2lvbnMpKSAhPT0gJ29iamVjdCcgfHwgIShleHRlbnNpb25zIGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgZXh0ZW5zaW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnMgPSBleHRlbnNpb25zLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXh0ZW5zaW9ucyA9IG5ldyBSZWdFeHAoJ1xcXFwuKCcgKyBleHRlbnNpb25zLmpvaW4oJ3wnKS5yZXBsYWNlKC9cXC4vZywgJ1xcXFwuJykgKyAnKSQnLCAnaScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWxlLm5hbWUuc2VhcmNoKGV4dGVuc2lvbnMpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnZXh0ZW5zaW9uJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8g5aSn5bCPXG4gICAgICBpZiAodGhpcy5zaXplID4gMCAmJiBmaWxlLnNpemUgPj0gMCAmJiBmaWxlLnNpemUgPiB0aGlzLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdzaXplJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmZlYXR1cmVzLmh0bWw1ICYmIGZpbGUucHV0QWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZFB1dChmaWxlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5mZWF0dXJlcy5odG1sNSkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRIdG1sNShmaWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZEh0bWw0KGZpbGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXBsb2FkUHV0OiBmdW5jdGlvbiB1cGxvYWRQdXQoZmlsZSkge1xuICAgICAgdmFyIHF1ZXJ5cyA9IFtdO1xuICAgICAgdmFyIHZhbHVlID0gdm9pZCAwO1xuICAgICAgZm9yICh2YXIga2V5IGluIGZpbGUuZGF0YSkge1xuICAgICAgICB2YWx1ZSA9IGZpbGUuZGF0YVtrZXldO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHF1ZXJ5cy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBxdWVyeVN0cmluZyA9IHF1ZXJ5cy5sZW5ndGggPyAoZmlsZS5wdXRBY3Rpb24uaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBxdWVyeXMuam9pbignJicpIDogJyc7XG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignUFVUJywgZmlsZS5wdXRBY3Rpb24gKyBxdWVyeVN0cmluZyk7XG4gICAgICByZXR1cm4gdGhpcy51cGxvYWRYaHIoeGhyLCBmaWxlLCBmaWxlLmZpbGUpO1xuICAgIH0sXG4gICAgdXBsb2FkSHRtbDU6IGZ1bmN0aW9uIHVwbG9hZEh0bWw1KGZpbGUpIHtcbiAgICAgIHZhciBmb3JtID0gbmV3IHdpbmRvdy5Gb3JtRGF0YSgpO1xuICAgICAgdmFyIHZhbHVlID0gdm9pZCAwO1xuICAgICAgZm9yICh2YXIga2V5IGluIGZpbGUuZGF0YSkge1xuICAgICAgICB2YWx1ZSA9IGZpbGUuZGF0YVtrZXldO1xuICAgICAgICBpZiAodmFsdWUgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgICAgICAgZm9ybS5hcHBlbmQoa2V5LCB2YWx1ZSwgdmFsdWUubmFtZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZvcm0uYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3JtLmFwcGVuZCh0aGlzLm5hbWUsIGZpbGUuZmlsZSwgZmlsZS5maWxlLmZpbGVuYW1lIHx8IGZpbGUubmFtZSk7XG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignUE9TVCcsIGZpbGUucG9zdEFjdGlvbik7XG4gICAgICByZXR1cm4gdGhpcy51cGxvYWRYaHIoeGhyLCBmaWxlLCBmb3JtKTtcbiAgICB9LFxuICAgIHVwbG9hZFhocjogZnVuY3Rpb24gdXBsb2FkWGhyKHhociwgX2ZpbGUsIGJvZHkpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgZmlsZSA9IF9maWxlO1xuICAgICAgdmFyIHNwZWVkVGltZSA9IDA7XG4gICAgICB2YXIgc3BlZWRMb2FkZWQgPSAwO1xuXG4gICAgICAvLyDov5vluqbmnaFcbiAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIOi/mOacquW8gOWni+S4iuS8oCDlt7LliKDpmaQg5pyq5r+A5rS7XG4gICAgICAgIGZpbGUgPSBfdGhpczQuZ2V0KGZpbGUpO1xuICAgICAgICBpZiAoIWUubGVuZ3RoQ29tcHV0YWJsZSB8fCAhZmlsZSB8fCAhZmlsZS5maWxlT2JqZWN0IHx8ICFmaWxlLmFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOi/m+W6piDpgJ/luqYg5q+P56eS5pu05paw5LiA5qyhXG4gICAgICAgIHZhciBzcGVlZFRpbWUyID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgIGlmIChzcGVlZFRpbWUyID09PSBzcGVlZFRpbWUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3BlZWRUaW1lID0gc3BlZWRUaW1lMjtcblxuICAgICAgICBmaWxlID0gX3RoaXM0LnVwZGF0ZShmaWxlLCB7XG4gICAgICAgICAgcHJvZ3Jlc3M6IChlLmxvYWRlZCAvIGUudG90YWwgKiAxMDApLnRvRml4ZWQoMiksXG4gICAgICAgICAgc3BlZWQ6IGUubG9hZGVkIC0gc3BlZWRMb2FkZWRcbiAgICAgICAgfSk7XG4gICAgICAgIHNwZWVkTG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgICB9O1xuXG4gICAgICAvLyDmo4Dmn6Xmv4DmtLvnirbmgIFcbiAgICAgIHZhciBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZmlsZSA9IF90aGlzNC5nZXQoZmlsZSk7XG4gICAgICAgIGlmIChmaWxlICYmIGZpbGUuZmlsZU9iamVjdCAmJiAhZmlsZS5zdWNjZXNzICYmICFmaWxlLmVycm9yICYmIGZpbGUuYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGludGVydmFsKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgaW50ZXJ2YWwgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgICAgeGhyLnRpbWVvdXQgPSAxO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfSwgMTAwKTtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlID0gdm9pZCAwO1xuICAgICAgICB2YXIgZm4gPSBmdW5jdGlvbiBmbihlKSB7XG4gICAgICAgICAgLy8g5bey57uP5aSE55CG6L+H5LqGXG4gICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgaW50ZXJ2YWwgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmaWxlID0gX3RoaXM0LmdldChmaWxlKTtcblxuICAgICAgICAgIC8vIOS4jeWtmOWcqOebtOaOpeWTjeW6lFxuICAgICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnbm90X2V4aXN0cycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIOS4jeaYr+aWh+S7tuWvueixoVxuICAgICAgICAgIGlmICghZmlsZS5maWxlT2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdmaWxlX29iamVjdCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIOaciemUmeivr+iHquWKqOWTjeW6lFxuICAgICAgICAgIGlmIChmaWxlLmVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGZpbGUuZXJyb3IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIOacqua/gOa0u1xuICAgICAgICAgIGlmICghZmlsZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoJ2Fib3J0Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5bey5a6M5oiQIOebtOaOpeebuOW6lFxuICAgICAgICAgIGlmIChmaWxlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGZpbGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBkYXRhID0ge307XG5cbiAgICAgICAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAndGltZW91dCc6XG4gICAgICAgICAgICBjYXNlICdhYm9ydCc6XG4gICAgICAgICAgICAgIGRhdGEuZXJyb3IgPSBlLnR5cGU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICBpZiAoIXhoci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ25ldHdvcmsnO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdzZXJ2ZXInO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdkZW5pZWQnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdzZXJ2ZXInO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdkZW5pZWQnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEucHJvZ3Jlc3MgPSAnMTAwLjAwJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0KSB7XG4gICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlICYmIGNvbnRlbnRUeXBlLmluZGV4T2YoJy9qc29uJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgIGRhdGEucmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGF0YS5yZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5pu05pawXG4gICAgICAgICAgZmlsZSA9IF90aGlzNC51cGRhdGUoZmlsZSwgZGF0YSk7XG5cbiAgICAgICAgICAvLyDnm7jlupTplJnor69cbiAgICAgICAgICBpZiAoZmlsZS5lcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChmaWxlLmVycm9yKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyDlk43lupRcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShmaWxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyDkuovku7ZcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZuO1xuICAgICAgICB4aHIub25lcnJvciA9IGZuO1xuICAgICAgICB4aHIub25hYm9ydCA9IGZuO1xuICAgICAgICB4aHIub250aW1lb3V0ID0gZm47XG5cbiAgICAgICAgLy8g6LaF5pe2XG4gICAgICAgIGlmIChmaWxlLnRpbWVvdXQpIHtcbiAgICAgICAgICB4aHIudGltZW91dCA9IGZpbGUudGltZW91dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhlYWRlcnNcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGZpbGUuaGVhZGVycykge1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgZmlsZS5oZWFkZXJzW2tleV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5pu05pawIHhoclxuICAgICAgICBmaWxlID0gX3RoaXM0LnVwZGF0ZShmaWxlLCB7IHhocjogeGhyIH0pO1xuXG4gICAgICAgIC8vIOW8gOWni+S4iuS8oFxuICAgICAgICB4aHIuc2VuZChib2R5KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBsb2FkSHRtbDQ6IGZ1bmN0aW9uIHVwbG9hZEh0bWw0KF9maWxlKSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgdmFyIGZpbGUgPSBfZmlsZTtcbiAgICAgIHZhciBvbktleWRvd24gPSBmdW5jdGlvbiBvbktleWRvd24oZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgaWZyYW1lLmlkID0gJ3VwbG9hZC1pZnJhbWUtJyArIGZpbGUuaWQ7XG4gICAgICBpZnJhbWUubmFtZSA9ICd1cGxvYWQtaWZyYW1lLScgKyBmaWxlLmlkO1xuICAgICAgaWZyYW1lLnNyYyA9ICdhYm91dDpibGFuayc7XG4gICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzdHlsZScsICd3aWR0aDoxcHg7aGVpZ2h0OjFweDt0b3A6LTk5OWVtO3Bvc2l0aW9uOmFic29sdXRlOyBtYXJnaW4tdG9wOi05OTllbTsnKTtcblxuICAgICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cbiAgICAgIGZvcm0uYWN0aW9uID0gZmlsZS5wb3N0QWN0aW9uO1xuXG4gICAgICBmb3JtLm5hbWUgPSAndXBsb2FkLWZvcm0tJyArIGZpbGUuaWQ7XG5cbiAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCAnUE9TVCcpO1xuICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICd1cGxvYWQtaWZyYW1lLScgKyBmaWxlLmlkKTtcbiAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdlbmN0eXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKTtcblxuICAgICAgdmFyIHZhbHVlID0gdm9pZCAwO1xuICAgICAgdmFyIGlucHV0ID0gdm9pZCAwO1xuICAgICAgZm9yICh2YXIga2V5IGluIGZpbGUuZGF0YSkge1xuICAgICAgICB2YWx1ZSA9IGZpbGUuZGF0YVtrZXldO1xuICAgICAgICBpZiAodmFsdWUgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgaW5wdXQudHlwZSA9ICdoaWRkZW4nO1xuICAgICAgICAgIGlucHV0Lm5hbWUgPSBrZXk7XG4gICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoZmlsZS5lbCk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgICAgdmFyIGdldFJlc3BvbnNlRGF0YSA9IGZ1bmN0aW9uIGdldFJlc3BvbnNlRGF0YSgpIHtcbiAgICAgICAgdmFyIGRvYyA9IHZvaWQgMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgIGRvYyA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuICAgICAgICBpZiAoIWRvYykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkb2MgPSBpZnJhbWUuY29udGVudERvY3VtZW50ID8gaWZyYW1lLmNvbnRlbnREb2N1bWVudCA6IGlmcmFtZS5kb2N1bWVudDtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGRvYyA9IGlmcmFtZS5kb2N1bWVudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvYyAmJiBkb2MuYm9keSkge1xuICAgICAgICAgIHJldHVybiBkb2MuYm9keS5pbm5lckhUTUw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmaWxlID0gX3RoaXM1LnVwZGF0ZShmaWxlLCB7IGlmcmFtZTogaWZyYW1lIH0pO1xuXG4gICAgICAgICAgLy8g5LiN5a2Y5ZyoXG4gICAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdub3RfZXhpc3RzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5a6a5pe25qOA5p+lXG4gICAgICAgICAgdmFyIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZmlsZSA9IF90aGlzNS5nZXQoZmlsZSk7XG4gICAgICAgICAgICBpZiAoZmlsZSAmJiBmaWxlLmZpbGVPYmplY3QgJiYgIWZpbGUuc3VjY2VzcyAmJiAhZmlsZS5lcnJvciAmJiBmaWxlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgaW50ZXJ2YWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWZyYW1lLm9uYWJvcnQoeyB0eXBlOiBmaWxlID8gJ2Fib3J0JyA6ICdub3RfZXhpc3RzJyB9KTtcbiAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgdmFyIGNvbXBsZXRlID0gdm9pZCAwO1xuICAgICAgICAgIHZhciBmbiA9IGZ1bmN0aW9uIGZuKGUpIHtcbiAgICAgICAgICAgIC8vIOW3sue7j+WkhOeQhui/h+S6hlxuICAgICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBsZXRlID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKGludGVydmFsKSB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICBpbnRlcnZhbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDlhbPpl60gZXNjIOS6i+S7tlxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKTtcblxuICAgICAgICAgICAgZmlsZSA9IF90aGlzNS5nZXQoZmlsZSk7XG5cbiAgICAgICAgICAgIC8vIOS4jeWtmOWcqOebtOaOpeWTjeW6lFxuICAgICAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ25vdF9leGlzdHMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g5LiN5piv5paH5Lu25a+56LGhXG4gICAgICAgICAgICBpZiAoIWZpbGUuZmlsZU9iamVjdCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdmaWxlX29iamVjdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDmnInplJnor6/oh6rliqjlk43lupRcbiAgICAgICAgICAgIGlmIChmaWxlLmVycm9yKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoZmlsZS5lcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIOacqua/gOa0u1xuICAgICAgICAgICAgaWYgKCFmaWxlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdhYm9ydCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDlt7LlrozmiJAg55u05o6l55u45bqUXG4gICAgICAgICAgICBpZiAoZmlsZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGZpbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBnZXRSZXNwb25zZURhdGEoKTtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgICAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgICAgICAgICBjYXNlICdhYm9ydCc6XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdhYm9ydCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9IGZpbGUuZXJyb3I7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICduZXR3b3JrJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdkZW5pZWQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9IGZpbGUuZXJyb3I7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ25ldHdvcmsnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkYXRhLnByb2dyZXNzID0gJzEwMC4wMCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN1YnN0cigwLCAxKSA9PT0gJ3snICYmIHJlc3BvbnNlLnN1YnN0cihyZXNwb25zZS5sZW5ndGggLSAxLCAxKSA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRhdGEucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g5pu05pawXG4gICAgICAgICAgICBmaWxlID0gX3RoaXM1LnVwZGF0ZShmaWxlLCBkYXRhKTtcblxuICAgICAgICAgICAgaWYgKGZpbGUuZXJyb3IpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChmaWxlLmVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g5ZON5bqUXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShmaWxlKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8g5re75Yqg5LqL5Lu2XG4gICAgICAgICAgaWZyYW1lLm9ubG9hZCA9IGZuO1xuICAgICAgICAgIGlmcmFtZS5vbmVycm9yID0gZm47XG4gICAgICAgICAgaWZyYW1lLm9uYWJvcnQgPSBmbjtcblxuICAgICAgICAgIC8vIOemgeatoiBlc2Mg6ZSuXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKTtcblxuICAgICAgICAgIC8vIOaPkOS6pFxuICAgICAgICAgIGZvcm0uc3VibWl0KCk7XG4gICAgICAgIH0sIDUwKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZnJhbWUucGFyZW50Tm9kZSAmJiBpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZnJhbWUucGFyZW50Tm9kZSAmJiBpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB3YXRjaEFjdGl2ZTogZnVuY3Rpb24gd2F0Y2hBY3RpdmUoYWN0aXZlKSB7XG4gICAgICB2YXIgZmlsZSA9IHZvaWQgMDtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB3aGlsZSAoZmlsZSA9IHRoaXMuZmlsZXNbaW5kZXhdKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIGlmICghZmlsZS5maWxlT2JqZWN0KSB7XG4gICAgICAgICAgLy8g5LiN5piv5paH5Lu25a+56LGhXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlICYmICF0aGlzLmRlc3Ryb3kpIHtcbiAgICAgICAgICBpZiAodGhpcy51cGxvYWRpbmcgPj0gdGhpcy50aHJlYWQgfHwgdGhpcy51cGxvYWRpbmcgJiYgIXRoaXMuZmVhdHVyZXMuaHRtbDUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWZpbGUuYWN0aXZlICYmICFmaWxlLmVycm9yICYmICFmaWxlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGZpbGUsIHsgYWN0aXZlOiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZmlsZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGZpbGUsIHsgYWN0aXZlOiBmYWxzZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnVwbG9hZGluZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgd2F0Y2hEcm9wOiBmdW5jdGlvbiB3YXRjaERyb3AoX2VsKSB7XG4gICAgICB2YXIgZWwgPSBfZWw7XG4gICAgICBpZiAoIXRoaXMuZmVhdHVyZXMuZHJvcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIOenu+mZpOaMgui9vVxuICAgICAgaWYgKHRoaXMuZHJvcEVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzLm9uRHJhZ2VudGVyLCBmYWxzZSk7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5vbkRyYWdsZWF2ZSwgZmFsc2UpO1xuICAgICAgICAgIHRoaXMuZHJvcEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLm9uRHJhZ292ZXIsIGZhbHNlKTtcbiAgICAgICAgICB0aGlzLmRyb3BFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLm9uRHJvcCwgZmFsc2UpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuXG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgIGVsID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKSB8fCB0aGlzLiRyb290LiRlbC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwgPT09IHRydWUpIHtcbiAgICAgICAgZWwgPSB0aGlzLiRwYXJlbnQuJGVsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyb3BFbGVtZW50ID0gZWw7XG5cbiAgICAgIGlmICh0aGlzLmRyb3BFbGVtZW50KSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIHRoaXMub25EcmFnZW50ZXIsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5vbkRyYWdsZWF2ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmRyb3BFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5vbkRyYWdvdmVyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZHJvcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMub25Ecm9wLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvbkRyYWdlbnRlcjogZnVuY3Rpb24gb25EcmFnZW50ZXIoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCF0aGlzLmRyb3BBY3RpdmUpIHtcbiAgICAgICAgdGhpcy5kcm9wQWN0aXZlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uRHJhZ2xlYXZlOiBmdW5jdGlvbiBvbkRyYWdsZWF2ZShlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoZS50YXJnZXQubm9kZU5hbWUgPT09ICdIVE1MJyB8fCBlLnNjcmVlblggPT09IDAgJiYgZS5zY3JlZW5ZID09PSAwICYmIGUuc2NyZWVuWSA9PT0gMCAmJiAhZS5mcm9tRWxlbWVudCAmJiBlLm9mZnNldFggPCAwKSB7XG4gICAgICAgIHRoaXMuZHJvcEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgb25EcmFnb3ZlcjogZnVuY3Rpb24gb25EcmFnb3ZlcihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSxcbiAgICBvbkRyb3A6IGZ1bmN0aW9uIG9uRHJvcChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmRyb3BBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuYWRkRGF0YVRyYW5zZmVyKGUuZGF0YVRyYW5zZmVyKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBGaWxlVXBsb2FkJDEgPSBPYmplY3QuZnJlZXplKHtcblx0ZGVmYXVsdDogRmlsZVVwbG9hZFxufSk7XG5cbnZhciByZXF1aXJlJCQwID0gKCBGaWxlVXBsb2FkJDEgJiYgRmlsZVVwbG9hZCApIHx8IEZpbGVVcGxvYWQkMTtcblxudmFyIHNyYyA9IHJlcXVpcmUkJDA7XG5cbnJldHVybiBzcmM7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12dWUtdXBsb2FkLWNvbXBvbmVudC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS11cGxvYWQtY29tcG9uZW50L2Rpc3QvdnVlLXVwbG9hZC1jb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDcwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgbWV0aG9kczoge1xuICAgICAgICBoYXNSb2xlIChwYXlsb2FkKSB7XG4gICAgICAgICAgICBsZXQgbWUgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzWydhdXRoL2dldE1lJ11cbiAgICAgICAgICAgIHJldHVybiBfLmluY2x1ZGVzKG1lLnJvbGVzLCBwYXlsb2FkKVxuICAgICAgICB9LFxuICAgICAgICBoYXNQZXJtaXNzaW9uIChwYXlsb2FkKSB7XG4gICAgICAgICAgICBsZXQgbWUgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzWydhdXRoL2dldE1lJ11cbiAgICAgICAgICAgIHJldHVybiBfLmluY2x1ZGVzKG1lLnBlcm1pc3Npb25zLCBwYXlsb2FkKVxuICAgICAgICB9LFxuICAgICAgICBoYXNBbnlQZXJtaXNzaW9uIChwZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgbGV0IG1lID0gdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXV0aC9nZXRNZSddXG4gICAgICAgICAgICByZXR1cm4gcGVybWlzc2lvbnMuc29tZShwID0+IG1lLnBlcm1pc3Npb25zLmluY2x1ZGVzKHApKVxuICAgICAgICB9LFxuICAgICAgICBoYXNBbnlSb2xlIChyb2xlcykge1xuICAgICAgICAgICAgbGV0IG1lID0gdGhpcy4kc3RvcmUuZ2V0dGVyc1snYXV0aC9nZXRNZSddXG4gICAgICAgICAgICByZXR1cm4gcm9sZXMuc29tZShyID0+IG1lLnJvbGVzLmluY2x1ZGVzKHIpKVxuICAgICAgICB9LFxuICAgICAgICBoYXNBbGxSb2xlcyAocm9sZXMpIHtcbiAgICAgICAgICAgIGxldCBtZSA9IHRoaXMuJHN0b3JlLmdldHRlcnNbJ2F1dGgvZ2V0TWUnXVxuICAgICAgICAgICAgcmV0dXJuIF8uZGlmZmVyZW5jZShyb2xlcywgbWUucm9sZXMpLmxlbmd0aCA9PT0gMFxuICAgICAgICB9LFxuICAgICAgICBoYXNBbGxQZXJtaXNzaW9ucyAocGVybWlzc2lvbnMpIHtcbiAgICAgICAgICAgIGxldCBtZSA9IHRoaXMuJHN0b3JlLmdldHRlcnNbJ2F1dGgvZ2V0TWUnXVxuICAgICAgICAgICAgcmV0dXJuIF8uZGlmZmVyZW5jZShwZXJtaXNzaW9ucywgbWUucGVybWlzc2lvbnMpLmxlbmd0aCA9PT0gMFxuICAgICAgICB9LFxuICAgICAgICBjYW4gKHBlcm1pc3Npb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWydhdXRoL2dldE1lJ10uY2FuW3Blcm1pc3Npb25dXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21peGlucy9hY2wuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYzUyMDVlOGNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9EYXNoYm9hcmQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI1M2U5OTE1NlwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1jNTIwNWU4Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Rhc2hib2FyZC52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYzUyMDVlOGNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9EYXNoYm9hcmQudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWM1MjA1ZThjXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG50aGVhZC5kYXRhdGFibGVfX3Byb2dyZXNzW2RhdGEtdi1jNTIwNWU4Y10ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovVXNlcnMvdXJpYWgvc2l0ZXMvd3d3L3Nob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9EYXNoYm9hcmQudnVlPzM4N2RjODU1XCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFzYUE7SUFDQSxjQUFBO0NBQ0FcIixcImZpbGVcIjpcIkRhc2hib2FyZC52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiPHRlbXBsYXRlPlxcbiAgPG1haW4tbGF5b3V0ICA6c3R5bGU9XFxcInsgcGFkZGluZ1RvcDogYDEwMHB4YCwgYmFja2dyb3VuZENvbG9yOiBgd2hpdGVgIH1cXFwiPlxcbiAgICA8di1jb250YWluZXIgIGZsdWlkPlxcbiAgICAgIDxkYXNoLXBhbmVscyA6dW5wYWlkPVxcXCJ1bnBhaWRcXFwiIDpwYWlkPVxcXCJwYWlkXFxcIiA6c2VudD1cXFwic2VudFxcXCIgOnJlY2VpdmVkPVxcXCJyZWNlaXZlZFxcXCIgOnRvdGFsPVxcXCJ0b3RhbFxcXCIgOnVuc2VudD1cXFwidW5zZW50XFxcIiA6ZG9uZT1cXFwiZG9uZVxcXCI+PC9kYXNoLXBhbmVscz5cXG4gICAgICA8di1jb250YWluZXIgZmx1aWQ+XFxuXFxuICAgICAgICAgICAgPHYtZGF0YS10YWJsZVxcbiAgICAgICAgICAgICAgICA6aGVhZGVycz1cXFwiaGVhZGVyc1xcXCJcXG4gICAgICAgICAgICAgICAgOml0ZW1zPVxcXCJpdGVtc1xcXCJcXG4gICAgICAgICAgICAgICAgbGlnaHRcXG4gICAgICAgICAgICA+XFxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XFxcIml0ZW1zXFxcIiBzY29wZT1cXFwicHJvcHNcXFwiPlxcbiAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1idG4gY29sb3I9XFxcInByaW1hcnlcXFwiIGljb24gQGNsaWNrPVxcXCJwcm9wcy5leHBhbmRlZCA9ICFwcm9wcy5leHBhbmRlZFxcXCI+PHYtaWNvbj5zaG9wcGluZ19iYXNrZXQ8L3YtaWNvbj48L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAge3sgcHJvcHMuaXRlbS5pZCB9fVxcbiAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XFxcIj57eyB0b3RhbEFtb3VudChwcm9wcy5pdGVtKSB8IGN1cnJlbmN5KGN1cnJlbmN5KSB9fTwvdGQ+XFxuXFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtc3dpdGNoXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVxcXCJgJHtwcm9wcy5pdGVtLnBheW1lbnQucGFpZCA/ICdQYWlkJyA6ICdVbnBhaWQnfWBcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cXFwicHJvcHMuaXRlbS5wYXltZW50LnBhaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XFxcInRlYWwgZGFya2VuLTRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XFxcIiFoYXNSb2xlKCdhZG1pbicpXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjaGFuZ2U9XFxcInRvZ2dsZVBhaWQocHJvcHMuaXRlbSlcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LXN3aXRjaD5cXG4gICAgICAgICAgICAgICAgPC90ZD5cXG5cXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1zd2l0Y2hcXG4gICAgICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XFxcImAke3Byb3BzLml0ZW0uc2hpcG1lbnQuc2VudCA/ICdTZW50JyA6ICdPbi1Ib2xkJ31gXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInByb3BzLml0ZW0uc2hpcG1lbnQuc2VudFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cXFwiY3lhblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cXFwiIWhhc1JvbGUoJ2FkbWluJylcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cXFwidG9nZ2xlU2VudChwcm9wcy5pdGVtKVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICA8L3Ytc3dpdGNoPlxcbiAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx2LXN3aXRjaFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cXFwiYCR7cHJvcHMuaXRlbS5zaGlwbWVudC5yZWNlaXZlZCA/ICdSZWNlaXZlZCcgOiAnUGVuZGluZyd9YFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJwcm9wcy5pdGVtLnNoaXBtZW50LnJlY2VpdmVkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVxcXCJsaWdodC1ncmVlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodFxcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjaGFuZ2U9XFxcInRvZ2dsZVJlY2VpdmVkKHByb3BzLml0ZW0pXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1zd2l0Y2g+XFxuICAgICAgICAgICAgICAgIDwvdGQ+XFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtc3dpdGNoXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVxcXCJgJHtwcm9wcy5pdGVtLmRvbmUgPyAnQ29tcGxldGVkJyA6ICdPbi1Qcm9ncmVzcyd9YFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJwcm9wcy5pdGVtLmRvbmVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XFxcInRlYWwgbGlnaHRlbi0yXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0XFxuICAgICAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVxcXCIhaGFzUm9sZSgnYWRtaW4nKVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlPVxcXCJ0b2dnbGVEb25lKHByb3BzLml0ZW0pXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1zd2l0Y2g+XFxuICAgICAgICAgICAgICAgIDwvdGQ+XFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGl0bGUgdGV4dC14cy1jZW50ZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIDpkaXNhYmxlZD1cXFwiIWNhbignZWRpdF9vcmRlcicpXFxcIiAgZmxhdCBpY29uIGNvbG9yPVxcXCJhY2NlbnRcXFwiIEBjbGljay5uYXRpdmU9XFxcInNldEN1cnJlbnRPcmRlcihwcm9wcy5pdGVtKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5mYS1lZGl0PC92LWljb24+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIDpkaXNhYmxlZD1cXFwiIWNhbignZGVsZXRlX29yZGVyJylcXFwiIGZsYXQgaWNvbiBjb2xvcj1cXFwiZXJyb3JcXFwiIEBjbGljay5uYXRpdmU9XFxcImRlbGV0ZU9yZGVyKHByb3BzLml0ZW0pXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uPmZhLXRyYXNoPC92LWljb24+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cXG5cXG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cXFwiZXhwYW5kXFxcIiBzY29wZT1cXFwicHJvcHNcXFwiPlxcbiAgICAgICAgICAgICAgICA8di1kYXRhLXRhYmxlXFxuICAgICAgICAgICAgICAgICAgICA6aXRlbXM9XFxcImdldEl0ZW1zKHByb3BzLml0ZW0uY2FydClcXFwiXFxuICAgICAgICAgICAgICAgICAgICBoaWRlLWFjdGlvbnNcXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0XFxuICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cXFwiaGVhZGVyc1xcXCIgc2NvcGU9XFxcIm9yZGVyc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cXFwidGV4dC14cy1sZWZ0XFxcIj5Qcm9kdWN0PC90aD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVxcXCJ0ZXh0LXhzLWxlZnRcXFwiPlF0eTwvdGg+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cXFwidGV4dC14cy1sZWZ0XFxcIj5QcmljZTwvdGg+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cXFwidGV4dC14cy1sZWZ0XFxcIj5UYXg8L3RoPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XFxcInRleHQteHMtbGVmdFxcXCI+U3VidG90YWw8L3RoPlxcbiAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cXFwiaXRlbXNcXFwiIHNjb3BlPVxcXCJvcmRlcnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGV4dC14cy1sZWZ0XFxcIj57eyBvcmRlcnMuaXRlbS5uYW1lIH19PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcInRleHQteHMtbGVmdFxcXCI+e3sgb3JkZXJzLml0ZW0ucXR5IH19PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcInRleHQteHMtbGVmdFxcXCI+e3sgb3JkZXJzLml0ZW0ucHJpY2UgfCBjdXJyZW5jeShjdXJyZW5jeSkgfX08L3RkPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwidGV4dC14cy1sZWZ0XFxcIj57eyBwYXJzZUZsb2F0KG9yZGVycy5pdGVtLnRheCkudG9GaXhlZCgyKSB8IGN1cnJlbmN5KGN1cnJlbmN5KSB9fTwvdGQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJ0ZXh0LXhzLWxlZnRcXFwiPnt7IG9yZGVycy5pdGVtLnN1YnRvdGFsIHwgY3VycmVuY3koY3VycmVuY3kpIH19PC90ZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxcbiAgICAgICAgICAgICAgICA8L3YtZGF0YS10YWJsZT5cXG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxcblxcbiAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVxcXCJwYWdlVGV4dFxcXCIgc2NvcGU9XFxcInsgcGFnZVN0YXJ0LCBwYWdlU3RvcCB9XFxcIj5cXG4gICAgICAgICAgICAgICAgRnJvbSB7eyBwYWdlU3RhcnQgfX0gdG8ge3sgcGFnZVN0b3AgfX1cXG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxcblxcbiAgICAgICAgICAgIDwvdi1kYXRhLXRhYmxlPlxcbiAgICAgICAgICAgIDx2LWRpYWxvZyB2LW1vZGVsPVxcXCJkaWFsb2dcXFwiIGZ1bGxzY3JlZW4gdHJhbnNpdGlvbj1cXFwiZGlhbG9nLWJvdHRvbS10cmFuc2l0aW9uXFxcIiA6b3ZlcmxheT1cXFwiZmFsc2VcXFwiPlxcbiAgICAgICAgICAgICAgICA8di1jYXJkIDpsaWdodD1cXFwidHJ1ZVxcXCI+XFxuICAgICAgICAgICAgICAgIDx2LXRvb2xiYXIgIGNvbG9yPVxcXCJhY2NlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGljb24gQGNsaWNrLm5hdGl2ZT1cXFwiZGlhbG9nID0gZmFsc2VcXFwiIGNsYXNzPVxcXCJlcnJvci0tdGV4dFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8di1pY29uPmNsb3NlPC92LWljb24+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XFxuICAgICAgICAgICAgICAgICAgICA8di10b29sYmFyLXRpdGxlIGNsYXNzPVxcXCJwcmltYXJ5LS10ZXh0XFxcIj5VcGRhdGUgT3JkZXIgTm8uIHt7IGN1cnJlbnRfb3JkZXIuaWQgfX08L3YtdG9vbGJhci10aXRsZT5cXG4gICAgICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxcbiAgICAgICAgICAgICAgICAgICAgPHYtdG9vbGJhci1pdGVtcz5cXG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biAgZmxhdCBAY2xpY2submF0aXZlPVxcXCJkaWFsb2cgPSBmYWxzZVxcXCIgY2xhc3M9XFxcImluZm8tLXRleHRcXFwiPlNhdmU8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAgPC92LXRvb2xiYXItaXRlbXM+XFxuICAgICAgICAgICAgICAgIDwvdi10b29sYmFyPlxcbiAgICAgICAgICAgICAgICA8di1jb250YWluZXIgZmx1aWQ+XFxuICAgICAgICAgICAgICAgICAgICA8di10YWJzIHYtbW9kZWw9XFxcImFjdGl2ZS5uYW1lXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di10YWJzLWJhciBjbGFzcz1cXFwiYWNjZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di10YWJzLWl0ZW1cXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cXFwiKHRhYixrZXkpIGluIHRhYnNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cXFwia2V5XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpocmVmPVxcXCInIycgKyB0YWIubmFtZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICByaXBwbGVcXG4gICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAge3t0YWIubmFtZX19XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRhYnMtaXRlbT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di10YWJzLXNsaWRlciBjb2xvcj1cXFwicHJpbWFyeVxcXCI+PC92LXRhYnMtc2xpZGVyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10YWJzLWJhcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di10YWJzLWl0ZW1zPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10YWJzLWNvbnRlbnRcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XFxcIih0YWIsIGtleSkgaW4gdGFic1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cXFwia2V5XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aWQ9XFxcInRhYi5uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNhcmQgZmxhdCA6bGlnaHQ9XFxcInRydWVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvbXBvbmVudCA6aXM9XFxcInRhYi5jb21wb25lbnRcXFwiIDp0YWI9XFxcInRhYlxcXCIgOm9yZGVyPVxcXCJjdXJyZW50X29yZGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvY29tcG9uZW50PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZD5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRhYnMtY29udGVudD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFicy1pdGVtcz5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi10YWJzPlxcbiAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxcbiAgICAgICAgICAgICAgICA8L3YtY29udGFpbmVyPlxcbiAgICAgICAgICAgICAgICA8L3YtY2FyZD5cXG4gICAgICAgICAgICA8L3YtZGlhbG9nPlxcbiAgICAgIDwvdi1jb250YWluZXI+XFxuICAgIDwvdi1jb250YWluZXI+XFxuICA8L21haW4tbGF5b3V0PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5pbXBvcnQgTWFpbkxheW91dCBmcm9tICcuLi9sYXlvdXRzL01haW4udnVlJ1xcbmltcG9ydCBUaGVtZSBmcm9tICcuLi9taXhpbnMvdGhlbWUnXFxuaW1wb3J0IEFjbCBmcm9tICcuLi9taXhpbnMvYWNsJ1xcbmltcG9ydCBEYXNoUGFuZWxzIGZyb20gJy4uL3BhcnRpYWxzL0Rhc2hQYW5lbHMudnVlJ1xcbmltcG9ydCBDdXN0b21lckRldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9kYXNoYm9hcmQvQ3VzdG9tZXJEZXRhaWxzLnZ1ZSdcXG5pbXBvcnQgUGF5bWVudERldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9kYXNoYm9hcmQvUGF5bWVudERldGFpbHMudnVlJ1xcbmltcG9ydCBTaGlwcGluZ0RldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcHBpbmdEZXRhaWxzLnZ1ZSdcXG5pbXBvcnQgU2hpcG1lbnREZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBtZW50RGV0YWlscy52dWUnXFxuaW1wb3J0IEZpbGVVcGxvYWRlciBmcm9tICcuLi9jb21wb25lbnRzL2Rhc2hib2FyZC9GaWxlVXBsb2FkZXIudnVlJ1xcblxcbmV4cG9ydCBkZWZhdWx0IHtcXG4gICAgbWl4aW5zOiBbVGhlbWUsIEFjbF0sXFxuICAgIGNvbXBvbmVudHM6IHtcXG4gICAgICAgIE1haW5MYXlvdXQsXFxuICAgICAgICBEYXNoUGFuZWxzLFxcbiAgICAgICAgQ3VzdG9tZXJEZXRhaWxzLFxcbiAgICAgICAgUGF5bWVudERldGFpbHMsXFxuICAgICAgICBTaGlwcGluZ0RldGFpbHMsXFxuICAgICAgICBTaGlwbWVudERldGFpbHMsXFxuICAgICAgICBGaWxlVXBsb2FkZXJcXG4gICAgfSxcXG4gICAgZGF0YTogKCkgPT4gKHtcXG4gICAgICAgIGNvbnRlbnRDbGFzczogeyAnZ3JleSc6IHRydWUsICdsaWdodGVuLTQnOiB0cnVlLCAnYWNjZW50LS10ZXh0JzogdHJ1ZSB9LFxcbiAgICAgICAgY3VycmVuY3k6ICfigrEnLFxcbiAgICAgICAgZGlhbG9nOiBmYWxzZSxcXG4gICAgICAgIC8qIHBhbmVscyAqL1xcbiAgICAgICAgdG90YWw6IDAsXFxuICAgICAgICBwYWlkOiAwLFxcbiAgICAgICAgc2VudDogMCxcXG4gICAgICAgIHJlY2VpdmVkOiAwLFxcbiAgICAgICAgZG9uZTogMCxcXG4gICAgICAgIC8qIHRhYmxlICovXFxuICAgICAgICBoZWFkZXJzOiBbXFxuICAgICAgICAgICAgLyogcmVtb3ZlIHNvcnQgYW5kIHZhbHVlIHNpbmNlIHdlIGNhbnQgYWNjZXNzIGRvdCBhbm90YXRpb24gaW4gaXRlbSAqL1xcbiAgICAgICAgICAgIHsgdGV4dDogJ09yZGVyIE5vLicsIHZhbHVlOiAnaWQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxcbiAgICAgICAgICAgIHsgdGV4dDogJ0Ftb3VudCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiBmYWxzZSB9LFxcbiAgICAgICAgICAgIHsgdGV4dDogJ1BhaWQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcXG4gICAgICAgICAgICB7IHRleHQ6ICdTZW50JywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH0sXFxuICAgICAgICAgICAgeyB0ZXh0OiAnUmVjZWl2ZWQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcXG4gICAgICAgICAgICB7IHRleHQ6ICdDb21wbGV0ZWQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogZmFsc2UgfSxcXG4gICAgICAgICAgICB7IHRleHQ6ICdBY3Rpb25zJywgYWxpZ246ICdjZW50ZXInLCBzb3J0YWJsZTogZmFsc2UgfVxcbiAgICAgICAgXSxcXG4gICAgICAgIGl0ZW1zOiBbXSxcXG4gICAgICAgIC8qIGN1cnJlbnQgdXBkYXRlZCBpdGVtICovXFxuICAgICAgICBjdXJyZW50X29yZGVyOiB7fSxcXG4gICAgICAgIC8qIHRhYnMgKi9cXG4gICAgICAgIHRhYnM6IFtcXG4gICAgICAgICAgICB7bmFtZTogJ2N1c3RvbWVyIGRldGFpbHMnLCBjb21wb25lbnQ6ICdjdXN0b21lci1kZXRhaWxzJ30sXFxuICAgICAgICAgICAge25hbWU6ICdzaGlwcGluZyBkZXRhaWxzJywgY29tcG9uZW50OiAnc2hpcHBpbmctZGV0YWlscyd9LFxcbiAgICAgICAgICAgIHtuYW1lOiAncGF5bWVudCBkZXRhaWxzJywgY29tcG9uZW50OiAncGF5bWVudC1kZXRhaWxzJ30sXFxuICAgICAgICAgICAge25hbWU6ICdzaGlwbWVudCBkZXRhaWxzJywgY29tcG9uZW50OiAnc2hpcG1lbnQtZGV0YWlscyd9LFxcbiAgICAgICAgICAgIHtuYW1lOiAndXBsb2FkIHJlY2VpcHQnLCBjb21wb25lbnQ6ICdmaWxlLXVwbG9hZGVyJ31cXG4gICAgICAgIF0sXFxuICAgICAgICBhY3RpdmU6IHtcXG4gICAgICAgICAgICBuYW1lOiAnY3VzdG9tZXIgZGV0YWlscydcXG4gICAgICAgIH0sXFxuICAgICAgICB0b2dnbGVGb3JtOiBuZXcgQXBwRm9ybShBcHAuZm9ybXMudG9nZ2xlRm9ybSlcXG5cXG4gICAgfSksXFxuICAgIGNvbXB1dGVkOiB7XFxuICAgICAgICB1bnBhaWQgKCkge1xcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvdGFsIC0gdGhpcy5wYWlkXFxuICAgICAgICB9LFxcbiAgICAgICAgdW5zZW50ICgpIHtcXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3RhbCAtIHRoaXMuc2VudFxcbiAgICAgICAgfVxcbiAgICB9LFxcbiAgICBtb3VudGVkICgpIHtcXG4gICAgICAgIHRoaXMuZmV0Y2hQYW5lbFN0YXRzKClcXG4gICAgfSxcXG4gICAgbWV0aG9kczoge1xcbiAgICAgICAgZGVsZXRlT3JkZXIgKG9yZGVyKSB7XFxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICAgICAgaWYgKHNlbGYuY2FuKCdkZWxldGVfb3JkZXInKSB8fCBzZWxmLmhhc1JvbGUoJ2FkbWluJykpIHtcXG4gICAgICAgICAgICAgICAgYXhpb3MucG9zdChyb3V0ZSgnYXBpLm9yZGVyLmRlc3Ryb3knLCB7b3JkZXI6IG9yZGVyLmlkfSkpLnRoZW4oKCkgPT4ge1xcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50b3RhbCA9IHNlbGYudG90YWwgLSAxXFxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi50b3RhbCA8IDApIHtcXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRvdGFsID0gMFxcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLnBheW1lbnQucGFpZCkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGFpZCA9IHNlbGYucGFpZCAtIDFcXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5wYWlkIDwgMCkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBhaWQgPSAwXFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLnNoaXBtZW50LnNlbnQpIHtcXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbnQgPSBzZWxmLnNlbnQgLSAxXFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VudCA8IDApIHtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZW50ID0gMFxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlci5zaGlwbWVudC5yZWNlaXZlZCkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVjZWl2ZWQgPSBzZWxmLnJlY2VpdmVkIC0gMVxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnJlY2VpdmVkIDwgMCkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY2VpdmVkID0gMFxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlci5kb25lKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kb25lID0gc2VsZi5kb25lIC0gMVxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmRvbmUgPCAwKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZG9uZSA9IDBcXG4gICAgICAgICAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleChzZWxmLml0ZW1zLCB7IGlkOiBvcmRlci5pZCB9KVxcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZGVsZXRlKHNlbGYuaXRlbXMsIGluZGV4KVxcbiAgICAgICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogYE9yZGVyIyR7b3JkZXIuaWR9IERlbGV0ZWQhYCwgYmFja2dyb3VuZENvbG9yOiAnIzRkYjZhYycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXFxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9ycylcXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSlcXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgfSlcXG4gICAgICAgICAgICB9IGVsc2Uge1xcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiAnQWN0aW9uIE5vdCBBdXRob3JpemVkIScsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH0sXFxuICAgICAgICByZXNldFRvZ2dsZUZvcm0gKCkge1xcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRm9ybSA9IG5ldyBBcHBGb3JtKEFwcC5mb3Jtcy50b2dnbGVGb3JtKVxcbiAgICAgICAgfSxcXG4gICAgICAgIHRvZ2dsZVBhaWQgKG9yZGVyKSB7XFxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICAgICAgc2VsZi50b2dnbGVGb3JtLnRvZ2dsZSA9IG9yZGVyLnBheW1lbnQucGFpZFxcbiAgICAgICAgICAgIEFwcC5wb3N0KHJvdXRlKCdhcGkudG9nZ2xlLnBhaWQnLCB7b3JkZXI6IG9yZGVyLmlkfSksIHNlbGYudG9nZ2xlRm9ybSkudGhlbigoe21lc3NhZ2V9KSA9PiB7XFxuICAgICAgICAgICAgICAgIGlmIChvcmRlci5wYXltZW50LnBhaWQpIHtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFpZCA9IHRoaXMucGFpZCArIDFcXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFpZCA9IHRoaXMucGFpZCAtIDFcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICB9KS5jYXRjaCgoe2Vycm9ycywgbWVzc2FnZX0pID0+IHtcXG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XFxuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICBvcmRlci5wYXltZW50LnBhaWQgPSAhb3JkZXIucGF5bWVudC5wYWlkXFxuICAgICAgICAgICAgfSlcXG4gICAgICAgIH0sXFxuICAgICAgICB0b2dnbGVTZW50IChvcmRlcikge1xcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlRm9ybS50b2dnbGUgPSBvcmRlci5zaGlwbWVudC5zZW50XFxuICAgICAgICAgICAgQXBwLnBvc3Qocm91dGUoJ2FwaS50b2dnbGUuc2VudCcsIHtvcmRlcjogb3JkZXIuaWR9KSwgc2VsZi50b2dnbGVGb3JtKS50aGVuKCh7bWVzc2FnZX0pID0+IHtcXG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLnNoaXBtZW50LnNlbnQpIHtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VudCA9IHRoaXMuc2VudCArIDFcXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VudCA9IHRoaXMuc2VudCAtIDFcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICB9KS5jYXRjaCgoe2Vycm9ycywgbWVzc2FnZX0pID0+IHtcXG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XFxuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICBvcmRlci5zaGlwbWVudC5zZW50ID0gIW9yZGVyLnNoaXBtZW50LnNlbnRcXG4gICAgICAgICAgICB9KVxcbiAgICAgICAgfSxcXG4gICAgICAgIHRvZ2dsZVJlY2VpdmVkIChvcmRlcikge1xcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlRm9ybS50b2dnbGUgPSBvcmRlci5zaGlwbWVudC5yZWNlaXZlZFxcbiAgICAgICAgICAgIEFwcC5wb3N0KHJvdXRlKCdhcGkudG9nZ2xlLnJlY2VpdmVkJywge29yZGVyOiBvcmRlci5pZH0pLCBzZWxmLnRvZ2dsZUZvcm0pLnRoZW4oKHttZXNzYWdlfSkgPT4ge1xcbiAgICAgICAgICAgICAgICBpZiAob3JkZXIuc2hpcG1lbnQucmVjZWl2ZWQpIHtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZWQgPSB0aGlzLnJlY2VpdmVkICsgMVxcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlZCA9IHRoaXMucmVjZWl2ZWQgLSAxXFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnIzRkYjZhYycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXFxuICAgICAgICAgICAgfSkuY2F0Y2goKHtlcnJvcnMsIG1lc3NhZ2V9KSA9PiB7XFxuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9ycylcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xcbiAgICAgICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnI2U1NzM3MycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgb3JkZXIuc2hpcG1lbnQucmVjZWl2ZWQgPSAhb3JkZXIuc2hpcG1lbnQucmVjZWl2ZWRcXG4gICAgICAgICAgICB9KVxcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0b2dnbGUgcmVjZWl2ZWQnLCBvcmRlci5zaGlwbWVudC5yZWNlaXZlZClcXG4gICAgICAgIH0sXFxuICAgICAgICB0b2dnbGVEb25lIChvcmRlcikge1xcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlRm9ybS50b2dnbGUgPSBvcmRlci5kb25lXFxuICAgICAgICAgICAgQXBwLnBvc3Qocm91dGUoJ2FwaS50b2dnbGUuZG9uZScsIHtvcmRlcjogb3JkZXIuaWR9KSwgc2VsZi50b2dnbGVGb3JtKS50aGVuKCh7bWVzc2FnZX0pID0+IHtcXG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLmRvbmUpIHtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRoaXMuZG9uZSArIDFcXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRoaXMuZG9uZSAtIDFcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICB9KS5jYXRjaCgoe2Vycm9ycywgbWVzc2FnZX0pID0+IHtcXG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XFxuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICBvcmRlci5kb25lID0gIW9yZGVyLmRvbmVcXG4gICAgICAgICAgICB9KVxcbiAgICAgICAgfSxcXG4gICAgICAgIHBhcnNlTnVtYmVyIChzdHIpIHtcXG4gICAgICAgICAgICB2YXIgc3RyZyA9IHN0ciB8fCAnJ1xcbiAgICAgICAgICAgIHZhciBkZWNpbWFsID0gJy4nXFxuICAgICAgICAgICAgc3RyZyA9IHN0cmcucmVwbGFjZSgvW14wLTkkLixdL2csICcnKVxcbiAgICAgICAgICAgIGlmIChzdHJnLmluZGV4T2YoJywnKSA+IHN0cmcuaW5kZXhPZignLicpKSBkZWNpbWFsID0gJywnXFxuICAgICAgICAgICAgaWYgKChzdHJnLm1hdGNoKG5ldyBSZWdFeHAoJ1xcXFxcXFxcJyArIGRlY2ltYWwsICdnJykpIHx8IFtdKS5sZW5ndGggPiAxKSBkZWNpbWFsID0gJydcXG4gICAgICAgICAgICBpZiAoZGVjaW1hbCAhPT0gJycgJiYgKHN0cmcubGVuZ3RoIC0gc3RyZy5pbmRleE9mKGRlY2ltYWwpIC0gMSA9PSAzKSAmJiBzdHJnLmluZGV4T2YoJzAnICsgZGVjaW1hbCkgIT09IDApIGRlY2ltYWwgPSAnJ1xcbiAgICAgICAgICAgIHN0cmcgPSBzdHJnLnJlcGxhY2UobmV3IFJlZ0V4cCgnW14wLTkkJyArIGRlY2ltYWwgKyAnXScsICdnJyksICcnKVxcbiAgICAgICAgICAgIHN0cmcgPSBzdHJnLnJlcGxhY2UoJywnLCAnLicpXFxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc3RyZylcXG4gICAgICAgIH0sXFxuICAgICAgICBnZXRDYXJ0IChjYXJ0KSB7XFxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY2FydClcXG4gICAgICAgIH0sXFxuICAgICAgICBnZXRJdGVtcyAoY2FydCkge1xcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKEpTT04ucGFyc2UoY2FydClbJ2l0ZW1zJ10pXFxuICAgICAgICB9LFxcbiAgICAgICAgc2V0Q3VycmVudE9yZGVyIChvcmRlcikge1xcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nID0gdHJ1ZVxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF9vcmRlciA9IG9yZGVyXFxuICAgICAgICAgICAgbGV0IGZpbGVVcGxvYWRlciA9IHtcXG4gICAgICAgICAgICAgICAgcmVxdWVzdEtleTogJ2ZpbGUnLFxcbiAgICAgICAgICAgICAgICBtdWx0aXBsZTogZmFsc2UsXFxuICAgICAgICAgICAgICAgIHB1dFVybDogYGAsXFxuICAgICAgICAgICAgICAgIHBvc3RVcmw6IGAke3JvdXRlKCdhcGkubWVkaWEucmVjZWlwdFVwbG9hZGVyJywge29yZGVyOiB0aGlzLmN1cnJlbnRfb3JkZXIuaWR9KX1gXFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIC8qIENoZWNrIGZvciBTaGlwbWVudCBUeXBlIGlmIE1lZXQgVXAgT3IgUGljayBVcCBSZW1vdmUgU2hpcHBpbmcgRGV0YWlscyBGcm9tIFRhYnMgKi9cXG4gICAgICAgICAgICBsZXQgY3VzdG9tZXIgPSBPYmplY3QuYXNzaWduKHtuYW1lOiAnY3VzdG9tZXIgZGV0YWlscycsIGNvbXBvbmVudDogJ2N1c3RvbWVyLWRldGFpbHMnfSwgSlNPTi5wYXJzZSh0aGlzLmN1cnJlbnRfb3JkZXIuY3VzdG9tZXJfZGV0YWlscykpXFxuICAgICAgICAgICAgbGV0IHNoaXBwaW5nID0gT2JqZWN0LmFzc2lnbih7bmFtZTogJ3NoaXBwaW5nIGRldGFpbHMnLCBjb21wb25lbnQ6ICdzaGlwcGluZy1kZXRhaWxzJ30sIEpTT04ucGFyc2UodGhpcy5jdXJyZW50X29yZGVyLnNoaXBwaW5nX2RldGFpbHMpKVxcbiAgICAgICAgICAgIGxldCBwYXltZW50ID0gT2JqZWN0LmFzc2lnbih7bmFtZTogJ3BheW1lbnQgZGV0YWlscycsIGNvbXBvbmVudDogJ3BheW1lbnQtZGV0YWlscyd9LCB0aGlzLmN1cnJlbnRfb3JkZXIucGF5bWVudClcXG4gICAgICAgICAgICBsZXQgc2hpcG1lbnQgPSBPYmplY3QuYXNzaWduKHtuYW1lOiAnc2hpcG1lbnQgZGV0YWlscycsIGNvbXBvbmVudDogJ3NoaXBtZW50LWRldGFpbHMnfSwgdGhpcy5jdXJyZW50X29yZGVyLnNoaXBtZW50KVxcbiAgICAgICAgICAgIGxldCB1cGxvYWRzID0gT2JqZWN0LmFzc2lnbih7bmFtZTogJ3VwbG9hZCByZWNlaXB0JywgY29tcG9uZW50OiAnZmlsZS11cGxvYWRlcid9LCBmaWxlVXBsb2FkZXIpXFxuICAgICAgICAgICAgdGhpcy50YWJzID0gW1xcbiAgICAgICAgICAgICAgICBjdXN0b21lcixcXG4gICAgICAgICAgICAgICAgc2hpcHBpbmcsXFxuICAgICAgICAgICAgICAgIHBheW1lbnQsXFxuICAgICAgICAgICAgICAgIHNoaXBtZW50LFxcbiAgICAgICAgICAgICAgICB1cGxvYWRzXFxuICAgICAgICAgICAgXVxcbiAgICAgICAgfSxcXG4gICAgICAgIGZldGNoUGFuZWxTdGF0cyAoKSB7XFxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICAgICAgYXhpb3MuZ2V0KHJvdXRlKCdhcGkucGFuZWwuc3RhdHMnKSkudGhlbigocmVzcG9uc2UpID0+IHtcXG4gICAgICAgICAgICAgICAgc2VsZi5pdGVtcyA9IHJlc3BvbnNlLmRhdGEub3JkZXJzXFxuICAgICAgICAgICAgICAgIHNlbGYudG90YWwgPSByZXNwb25zZS5kYXRhLnRvdGFsXFxuICAgICAgICAgICAgICAgIHNlbGYuc2VudCA9IHJlc3BvbnNlLmRhdGEuc2VudFxcbiAgICAgICAgICAgICAgICBzZWxmLnBhaWQgPSByZXNwb25zZS5kYXRhLnBhaWRcXG4gICAgICAgICAgICAgICAgc2VsZi5yZWNlaXZlZCA9IHJlc3BvbnNlLmRhdGEucmVjZWl2ZWRcXG4gICAgICAgICAgICAgICAgc2VsZi5kb25lID0gcmVzcG9uc2UuZGF0YS5kb25lXFxuICAgICAgICAgICAgfSlcXG4gICAgICAgIH0sXFxuICAgICAgICB0b3RhbEFtb3VudCAoaXRlbSkge1xcbiAgICAgICAgICAgIGxldCBjYXJ0ID0gSlNPTi5wYXJzZShpdGVtLmNhcnQpXFxuICAgICAgICAgICAgbGV0IHRvdGFsID0gdGhpcy5wYXJzZU51bWJlcihjYXJ0LnRvdGFsKSArIHBhcnNlRmxvYXQoaXRlbS5zaGlwbWVudC5zaGlwcGluZ19mZWUpXFxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsLnRvRml4ZWQoMilcXG4gICAgICAgIH1cXG4gICAgfSxcXG4gICAgd2F0Y2g6IHtcXG4gICAgICAgIGl0ZW1zOiB7XFxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkge1xcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaXRlbXMgY2hhbmdlZCcpXFxuICAgICAgICAgICAgfSxcXG4gICAgICAgICAgICBkZWVwOiB0cnVlXFxuICAgICAgICB9XFxuICAgIH1cXG59XFxuPC9zY3JpcHQ+XFxuXFxuPHN0eWxlIHNjb3BlZD5cXG50aGVhZC5kYXRhdGFibGVfX3Byb2dyZXNzIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuPC9zdHlsZT5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtYzUyMDVlOGNcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9EYXNoYm9hcmQudnVlXG4vLyBtb2R1bGUgaWQgPSA4MDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuICA8bWFpbi1sYXlvdXQgIDpzdHlsZT1cInsgcGFkZGluZ1RvcDogYDEwMHB4YCwgYmFja2dyb3VuZENvbG9yOiBgd2hpdGVgIH1cIj5cbiAgICA8di1jb250YWluZXIgIGZsdWlkPlxuICAgICAgPGRhc2gtcGFuZWxzIDp1bnBhaWQ9XCJ1bnBhaWRcIiA6cGFpZD1cInBhaWRcIiA6c2VudD1cInNlbnRcIiA6cmVjZWl2ZWQ9XCJyZWNlaXZlZFwiIDp0b3RhbD1cInRvdGFsXCIgOnVuc2VudD1cInVuc2VudFwiIDpkb25lPVwiZG9uZVwiPjwvZGFzaC1wYW5lbHM+XG4gICAgICA8di1jb250YWluZXIgZmx1aWQ+XG5cbiAgICAgICAgICAgIDx2LWRhdGEtdGFibGVcbiAgICAgICAgICAgICAgICA6aGVhZGVycz1cImhlYWRlcnNcIlxuICAgICAgICAgICAgICAgIDppdGVtcz1cIml0ZW1zXCJcbiAgICAgICAgICAgICAgICBsaWdodFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJpdGVtc1wiIHNjb3BlPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gY29sb3I9XCJwcmltYXJ5XCIgaWNvbiBAY2xpY2s9XCJwcm9wcy5leHBhbmRlZCA9ICFwcm9wcy5leHBhbmRlZFwiPjx2LWljb24+c2hvcHBpbmdfYmFza2V0PC92LWljb24+PC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAge3sgcHJvcHMuaXRlbS5pZCB9fVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj57eyB0b3RhbEFtb3VudChwcm9wcy5pdGVtKSB8IGN1cnJlbmN5KGN1cnJlbmN5KSB9fTwvdGQ+XG5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICA8di1zd2l0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cImAke3Byb3BzLml0ZW0ucGF5bWVudC5wYWlkID8gJ1BhaWQnIDogJ1VucGFpZCd9YFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMuaXRlbS5wYXltZW50LnBhaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJ0ZWFsIGRhcmtlbi00XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCIhaGFzUm9sZSgnYWRtaW4nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlPVwidG9nZ2xlUGFpZChwcm9wcy5pdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1zd2l0Y2g+XG4gICAgICAgICAgICAgICAgPC90ZD5cblxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LXN3aXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwiYCR7cHJvcHMuaXRlbS5zaGlwbWVudC5zZW50ID8gJ1NlbnQnIDogJ09uLUhvbGQnfWBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLml0ZW0uc2hpcG1lbnQuc2VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImN5YW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cIiFoYXNSb2xlKCdhZG1pbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCJ0b2dnbGVTZW50KHByb3BzLml0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC92LXN3aXRjaD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LXN3aXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwiYCR7cHJvcHMuaXRlbS5zaGlwbWVudC5yZWNlaXZlZCA/ICdSZWNlaXZlZCcgOiAnUGVuZGluZyd9YFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMuaXRlbS5zaGlwbWVudC5yZWNlaXZlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImxpZ2h0LWdyZWVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlPVwidG9nZ2xlUmVjZWl2ZWQocHJvcHMuaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L3Ytc3dpdGNoPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtc3dpdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICA6bGFiZWw9XCJgJHtwcm9wcy5pdGVtLmRvbmUgPyAnQ29tcGxldGVkJyA6ICdPbi1Qcm9ncmVzcyd9YFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMuaXRlbS5kb25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwidGVhbCBsaWdodGVuLTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cIiFoYXNSb2xlKCdhZG1pbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCJ0b2dnbGVEb25lKHByb3BzLml0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC92LXN3aXRjaD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biA6ZGlzYWJsZWQ9XCIhY2FuKCdlZGl0X29yZGVyJylcIiAgZmxhdCBpY29uIGNvbG9yPVwiYWNjZW50XCIgQGNsaWNrLm5hdGl2ZT1cInNldEN1cnJlbnRPcmRlcihwcm9wcy5pdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5mYS1lZGl0PC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biA6ZGlzYWJsZWQ9XCIhY2FuKCdkZWxldGVfb3JkZXInKVwiIGZsYXQgaWNvbiBjb2xvcj1cImVycm9yXCIgQGNsaWNrLm5hdGl2ZT1cImRlbGV0ZU9yZGVyKHByb3BzLml0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uPmZhLXRyYXNoPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cImV4cGFuZFwiIHNjb3BlPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgICA8di1kYXRhLXRhYmxlXG4gICAgICAgICAgICAgICAgICAgIDppdGVtcz1cImdldEl0ZW1zKHByb3BzLml0ZW0uY2FydClcIlxuICAgICAgICAgICAgICAgICAgICBoaWRlLWFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgbGlnaHRcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cImhlYWRlcnNcIiBzY29wZT1cIm9yZGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInRleHQteHMtbGVmdFwiPlByb2R1Y3Q8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInRleHQteHMtbGVmdFwiPlF0eTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwidGV4dC14cy1sZWZ0XCI+UHJpY2U8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInRleHQteHMtbGVmdFwiPlRheDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwidGV4dC14cy1sZWZ0XCI+U3VidG90YWw8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJpdGVtc1wiIHNjb3BlPVwib3JkZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LXhzLWxlZnRcIj57eyBvcmRlcnMuaXRlbS5uYW1lIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRleHQteHMtbGVmdFwiPnt7IG9yZGVycy5pdGVtLnF0eSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LXhzLWxlZnRcIj57eyBvcmRlcnMuaXRlbS5wcmljZSB8IGN1cnJlbmN5KGN1cnJlbmN5KSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LXhzLWxlZnRcIj57eyBwYXJzZUZsb2F0KG9yZGVycy5pdGVtLnRheCkudG9GaXhlZCgyKSB8IGN1cnJlbmN5KGN1cnJlbmN5KSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LXhzLWxlZnRcIj57eyBvcmRlcnMuaXRlbS5zdWJ0b3RhbCB8IGN1cnJlbmN5KGN1cnJlbmN5KSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvdi1kYXRhLXRhYmxlPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJwYWdlVGV4dFwiIHNjb3BlPVwieyBwYWdlU3RhcnQsIHBhZ2VTdG9wIH1cIj5cbiAgICAgICAgICAgICAgICBGcm9tIHt7IHBhZ2VTdGFydCB9fSB0byB7eyBwYWdlU3RvcCB9fVxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPC92LWRhdGEtdGFibGU+XG4gICAgICAgICAgICA8di1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiIGZ1bGxzY3JlZW4gdHJhbnNpdGlvbj1cImRpYWxvZy1ib3R0b20tdHJhbnNpdGlvblwiIDpvdmVybGF5PVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgICA8di1jYXJkIDpsaWdodD1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8di10b29sYmFyICBjb2xvcj1cImFjY2VudFwiPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gaWNvbiBAY2xpY2submF0aXZlPVwiZGlhbG9nID0gZmFsc2VcIiBjbGFzcz1cImVycm9yLS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+Y2xvc2U8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgICAgICAgICAgICAgICAgIDx2LXRvb2xiYXItdGl0bGUgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCI+VXBkYXRlIE9yZGVyIE5vLiB7eyBjdXJyZW50X29yZGVyLmlkIH19PC92LXRvb2xiYXItdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICAgICAgICAgICAgICA8di10b29sYmFyLWl0ZW1zPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gIGZsYXQgQGNsaWNrLm5hdGl2ZT1cImRpYWxvZyA9IGZhbHNlXCIgY2xhc3M9XCJpbmZvLS10ZXh0XCI+U2F2ZTwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgIDwvdi10b29sYmFyLWl0ZW1zPlxuICAgICAgICAgICAgICAgIDwvdi10b29sYmFyPlxuICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBmbHVpZD5cbiAgICAgICAgICAgICAgICAgICAgPHYtdGFicyB2LW1vZGVsPVwiYWN0aXZlLm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYnMtYmFyIGNsYXNzPVwiYWNjZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di10YWJzLWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKHRhYixrZXkpIGluIHRhYnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6aHJlZj1cIicjJyArIHRhYi5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3t0YWIubmFtZX19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFicy1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGFicy1zbGlkZXIgY29sb3I9XCJwcmltYXJ5XCI+PC92LXRhYnMtc2xpZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRhYnMtYmFyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGFicy1pdGVtcz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10YWJzLWNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIih0YWIsIGtleSkgaW4gdGFic1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlkPVwidGFiLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1jYXJkIGZsYXQgOmxpZ2h0PVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29tcG9uZW50IDppcz1cInRhYi5jb21wb25lbnRcIiA6dGFiPVwidGFiXCIgOm9yZGVyPVwiY3VycmVudF9vcmRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2NvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFicy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRhYnMtaXRlbXM+XG4gICAgICAgICAgICAgICAgICAgIDwvdi10YWJzPlxuICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICAgICAgPC92LWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZD5cbiAgICAgICAgICAgIDwvdi1kaWFsb2c+XG4gICAgICA8L3YtY29udGFpbmVyPlxuICAgIDwvdi1jb250YWluZXI+XG4gIDwvbWFpbi1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1haW5MYXlvdXQgZnJvbSAnLi4vbGF5b3V0cy9NYWluLnZ1ZSdcbmltcG9ydCBUaGVtZSBmcm9tICcuLi9taXhpbnMvdGhlbWUnXG5pbXBvcnQgQWNsIGZyb20gJy4uL21peGlucy9hY2wnXG5pbXBvcnQgRGFzaFBhbmVscyBmcm9tICcuLi9wYXJ0aWFscy9EYXNoUGFuZWxzLnZ1ZSdcbmltcG9ydCBDdXN0b21lckRldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9kYXNoYm9hcmQvQ3VzdG9tZXJEZXRhaWxzLnZ1ZSdcbmltcG9ydCBQYXltZW50RGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL2Rhc2hib2FyZC9QYXltZW50RGV0YWlscy52dWUnXG5pbXBvcnQgU2hpcHBpbmdEZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBwaW5nRGV0YWlscy52dWUnXG5pbXBvcnQgU2hpcG1lbnREZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBtZW50RGV0YWlscy52dWUnXG5pbXBvcnQgRmlsZVVwbG9hZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvZGFzaGJvYXJkL0ZpbGVVcGxvYWRlci52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtaXhpbnM6IFtUaGVtZSwgQWNsXSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIE1haW5MYXlvdXQsXG4gICAgICAgIERhc2hQYW5lbHMsXG4gICAgICAgIEN1c3RvbWVyRGV0YWlscyxcbiAgICAgICAgUGF5bWVudERldGFpbHMsXG4gICAgICAgIFNoaXBwaW5nRGV0YWlscyxcbiAgICAgICAgU2hpcG1lbnREZXRhaWxzLFxuICAgICAgICBGaWxlVXBsb2FkZXJcbiAgICB9LFxuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGNvbnRlbnRDbGFzczogeyAnZ3JleSc6IHRydWUsICdsaWdodGVuLTQnOiB0cnVlLCAnYWNjZW50LS10ZXh0JzogdHJ1ZSB9LFxuICAgICAgICBjdXJyZW5jeTogJ+KCsScsXG4gICAgICAgIGRpYWxvZzogZmFsc2UsXG4gICAgICAgIC8qIHBhbmVscyAqL1xuICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgcGFpZDogMCxcbiAgICAgICAgc2VudDogMCxcbiAgICAgICAgcmVjZWl2ZWQ6IDAsXG4gICAgICAgIGRvbmU6IDAsXG4gICAgICAgIC8qIHRhYmxlICovXG4gICAgICAgIGhlYWRlcnM6IFtcbiAgICAgICAgICAgIC8qIHJlbW92ZSBzb3J0IGFuZCB2YWx1ZSBzaW5jZSB3ZSBjYW50IGFjY2VzcyBkb3QgYW5vdGF0aW9uIGluIGl0ZW0gKi9cbiAgICAgICAgICAgIHsgdGV4dDogJ09yZGVyIE5vLicsIHZhbHVlOiAnaWQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnQW1vdW50JywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdQYWlkJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdTZW50JywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdSZWNlaXZlZCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnQ29tcGxldGVkJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdBY3Rpb25zJywgYWxpZ246ICdjZW50ZXInLCBzb3J0YWJsZTogZmFsc2UgfVxuICAgICAgICBdLFxuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIC8qIGN1cnJlbnQgdXBkYXRlZCBpdGVtICovXG4gICAgICAgIGN1cnJlbnRfb3JkZXI6IHt9LFxuICAgICAgICAvKiB0YWJzICovXG4gICAgICAgIHRhYnM6IFtcbiAgICAgICAgICAgIHtuYW1lOiAnY3VzdG9tZXIgZGV0YWlscycsIGNvbXBvbmVudDogJ2N1c3RvbWVyLWRldGFpbHMnfSxcbiAgICAgICAgICAgIHtuYW1lOiAnc2hpcHBpbmcgZGV0YWlscycsIGNvbXBvbmVudDogJ3NoaXBwaW5nLWRldGFpbHMnfSxcbiAgICAgICAgICAgIHtuYW1lOiAncGF5bWVudCBkZXRhaWxzJywgY29tcG9uZW50OiAncGF5bWVudC1kZXRhaWxzJ30sXG4gICAgICAgICAgICB7bmFtZTogJ3NoaXBtZW50IGRldGFpbHMnLCBjb21wb25lbnQ6ICdzaGlwbWVudC1kZXRhaWxzJ30sXG4gICAgICAgICAgICB7bmFtZTogJ3VwbG9hZCByZWNlaXB0JywgY29tcG9uZW50OiAnZmlsZS11cGxvYWRlcid9XG4gICAgICAgIF0sXG4gICAgICAgIGFjdGl2ZToge1xuICAgICAgICAgICAgbmFtZTogJ2N1c3RvbWVyIGRldGFpbHMnXG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZUZvcm06IG5ldyBBcHBGb3JtKEFwcC5mb3Jtcy50b2dnbGVGb3JtKVxuXG4gICAgfSksXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgdW5wYWlkICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvdGFsIC0gdGhpcy5wYWlkXG4gICAgICAgIH0sXG4gICAgICAgIHVuc2VudCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3RhbCAtIHRoaXMuc2VudFxuICAgICAgICB9XG4gICAgfSxcbiAgICBtb3VudGVkICgpIHtcbiAgICAgICAgdGhpcy5mZXRjaFBhbmVsU3RhdHMoKVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBkZWxldGVPcmRlciAob3JkZXIpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgaWYgKHNlbGYuY2FuKCdkZWxldGVfb3JkZXInKSB8fCBzZWxmLmhhc1JvbGUoJ2FkbWluJykpIHtcbiAgICAgICAgICAgICAgICBheGlvcy5wb3N0KHJvdXRlKCdhcGkub3JkZXIuZGVzdHJveScsIHtvcmRlcjogb3JkZXIuaWR9KSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudG90YWwgPSBzZWxmLnRvdGFsIC0gMVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi50b3RhbCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudG90YWwgPSAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLnBheW1lbnQucGFpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wYWlkID0gc2VsZi5wYWlkIC0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYucGFpZCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBhaWQgPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLnNoaXBtZW50LnNlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VudCA9IHNlbGYuc2VudCAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnNlbnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZW50ID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlci5zaGlwbWVudC5yZWNlaXZlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWNlaXZlZCA9IHNlbGYucmVjZWl2ZWQgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5yZWNlaXZlZCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY2VpdmVkID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmRlci5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRvbmUgPSBzZWxmLmRvbmUgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5kb25lIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZG9uZSA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleChzZWxmLml0ZW1zLCB7IGlkOiBvcmRlci5pZCB9KVxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRkZWxldGUoc2VsZi5pdGVtcywgaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IGBPcmRlciMke29yZGVyLmlkfSBEZWxldGVkIWAsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcnMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiAnQWN0aW9uIE5vdCBBdXRob3JpemVkIScsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZXNldFRvZ2dsZUZvcm0gKCkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVGb3JtID0gbmV3IEFwcEZvcm0oQXBwLmZvcm1zLnRvZ2dsZUZvcm0pXG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZVBhaWQgKG9yZGVyKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlRm9ybS50b2dnbGUgPSBvcmRlci5wYXltZW50LnBhaWRcbiAgICAgICAgICAgIEFwcC5wb3N0KHJvdXRlKCdhcGkudG9nZ2xlLnBhaWQnLCB7b3JkZXI6IG9yZGVyLmlkfSksIHNlbGYudG9nZ2xlRm9ybSkudGhlbigoe21lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLnBheW1lbnQucGFpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhaWQgPSB0aGlzLnBhaWQgKyAxXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWlkID0gdGhpcy5wYWlkIC0gMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3JkZXIucGF5bWVudC5wYWlkID0gIW9yZGVyLnBheW1lbnQucGFpZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlU2VudCAob3JkZXIpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi50b2dnbGVGb3JtLnRvZ2dsZSA9IG9yZGVyLnNoaXBtZW50LnNlbnRcbiAgICAgICAgICAgIEFwcC5wb3N0KHJvdXRlKCdhcGkudG9nZ2xlLnNlbnQnLCB7b3JkZXI6IG9yZGVyLmlkfSksIHNlbGYudG9nZ2xlRm9ybSkudGhlbigoe21lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLnNoaXBtZW50LnNlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ID0gdGhpcy5zZW50ICsgMVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VudCA9IHRoaXMuc2VudCAtIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnIzRkYjZhYycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICB9KS5jYXRjaCgoe2Vycm9ycywgbWVzc2FnZX0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9ycylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnI2U1NzM3MycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9yZGVyLnNoaXBtZW50LnNlbnQgPSAhb3JkZXIuc2hpcG1lbnQuc2VudFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlUmVjZWl2ZWQgKG9yZGVyKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlRm9ybS50b2dnbGUgPSBvcmRlci5zaGlwbWVudC5yZWNlaXZlZFxuICAgICAgICAgICAgQXBwLnBvc3Qocm91dGUoJ2FwaS50b2dnbGUucmVjZWl2ZWQnLCB7b3JkZXI6IG9yZGVyLmlkfSksIHNlbGYudG9nZ2xlRm9ybSkudGhlbigoe21lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLnNoaXBtZW50LnJlY2VpdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZWQgPSB0aGlzLnJlY2VpdmVkICsgMVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZWQgPSB0aGlzLnJlY2VpdmVkIC0gMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3JkZXIuc2hpcG1lbnQucmVjZWl2ZWQgPSAhb3JkZXIuc2hpcG1lbnQucmVjZWl2ZWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndG9nZ2xlIHJlY2VpdmVkJywgb3JkZXIuc2hpcG1lbnQucmVjZWl2ZWQpXG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZURvbmUgKG9yZGVyKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlRm9ybS50b2dnbGUgPSBvcmRlci5kb25lXG4gICAgICAgICAgICBBcHAucG9zdChyb3V0ZSgnYXBpLnRvZ2dsZS5kb25lJywge29yZGVyOiBvcmRlci5pZH0pLCBzZWxmLnRvZ2dsZUZvcm0pLnRoZW4oKHttZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcmRlci5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRoaXMuZG9uZSArIDFcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbmUgPSB0aGlzLmRvbmUgLSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgfSkuY2F0Y2goKHtlcnJvcnMsIG1lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcnMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcmRlci5kb25lID0gIW9yZGVyLmRvbmVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHBhcnNlTnVtYmVyIChzdHIpIHtcbiAgICAgICAgICAgIHZhciBzdHJnID0gc3RyIHx8ICcnXG4gICAgICAgICAgICB2YXIgZGVjaW1hbCA9ICcuJ1xuICAgICAgICAgICAgc3RyZyA9IHN0cmcucmVwbGFjZSgvW14wLTkkLixdL2csICcnKVxuICAgICAgICAgICAgaWYgKHN0cmcuaW5kZXhPZignLCcpID4gc3RyZy5pbmRleE9mKCcuJykpIGRlY2ltYWwgPSAnLCdcbiAgICAgICAgICAgIGlmICgoc3RyZy5tYXRjaChuZXcgUmVnRXhwKCdcXFxcJyArIGRlY2ltYWwsICdnJykpIHx8IFtdKS5sZW5ndGggPiAxKSBkZWNpbWFsID0gJydcbiAgICAgICAgICAgIGlmIChkZWNpbWFsICE9PSAnJyAmJiAoc3RyZy5sZW5ndGggLSBzdHJnLmluZGV4T2YoZGVjaW1hbCkgLSAxID09IDMpICYmIHN0cmcuaW5kZXhPZignMCcgKyBkZWNpbWFsKSAhPT0gMCkgZGVjaW1hbCA9ICcnXG4gICAgICAgICAgICBzdHJnID0gc3RyZy5yZXBsYWNlKG5ldyBSZWdFeHAoJ1teMC05JCcgKyBkZWNpbWFsICsgJ10nLCAnZycpLCAnJylcbiAgICAgICAgICAgIHN0cmcgPSBzdHJnLnJlcGxhY2UoJywnLCAnLicpXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHJnKVxuICAgICAgICB9LFxuICAgICAgICBnZXRDYXJ0IChjYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShjYXJ0KVxuICAgICAgICB9LFxuICAgICAgICBnZXRJdGVtcyAoY2FydCkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXMoSlNPTi5wYXJzZShjYXJ0KVsnaXRlbXMnXSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Q3VycmVudE9yZGVyIChvcmRlcikge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2cgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRfb3JkZXIgPSBvcmRlclxuICAgICAgICAgICAgbGV0IGZpbGVVcGxvYWRlciA9IHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0S2V5OiAnZmlsZScsXG4gICAgICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHB1dFVybDogYGAsXG4gICAgICAgICAgICAgICAgcG9zdFVybDogYCR7cm91dGUoJ2FwaS5tZWRpYS5yZWNlaXB0VXBsb2FkZXInLCB7b3JkZXI6IHRoaXMuY3VycmVudF9vcmRlci5pZH0pfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIENoZWNrIGZvciBTaGlwbWVudCBUeXBlIGlmIE1lZXQgVXAgT3IgUGljayBVcCBSZW1vdmUgU2hpcHBpbmcgRGV0YWlscyBGcm9tIFRhYnMgKi9cbiAgICAgICAgICAgIGxldCBjdXN0b21lciA9IE9iamVjdC5hc3NpZ24oe25hbWU6ICdjdXN0b21lciBkZXRhaWxzJywgY29tcG9uZW50OiAnY3VzdG9tZXItZGV0YWlscyd9LCBKU09OLnBhcnNlKHRoaXMuY3VycmVudF9vcmRlci5jdXN0b21lcl9kZXRhaWxzKSlcbiAgICAgICAgICAgIGxldCBzaGlwcGluZyA9IE9iamVjdC5hc3NpZ24oe25hbWU6ICdzaGlwcGluZyBkZXRhaWxzJywgY29tcG9uZW50OiAnc2hpcHBpbmctZGV0YWlscyd9LCBKU09OLnBhcnNlKHRoaXMuY3VycmVudF9vcmRlci5zaGlwcGluZ19kZXRhaWxzKSlcbiAgICAgICAgICAgIGxldCBwYXltZW50ID0gT2JqZWN0LmFzc2lnbih7bmFtZTogJ3BheW1lbnQgZGV0YWlscycsIGNvbXBvbmVudDogJ3BheW1lbnQtZGV0YWlscyd9LCB0aGlzLmN1cnJlbnRfb3JkZXIucGF5bWVudClcbiAgICAgICAgICAgIGxldCBzaGlwbWVudCA9IE9iamVjdC5hc3NpZ24oe25hbWU6ICdzaGlwbWVudCBkZXRhaWxzJywgY29tcG9uZW50OiAnc2hpcG1lbnQtZGV0YWlscyd9LCB0aGlzLmN1cnJlbnRfb3JkZXIuc2hpcG1lbnQpXG4gICAgICAgICAgICBsZXQgdXBsb2FkcyA9IE9iamVjdC5hc3NpZ24oe25hbWU6ICd1cGxvYWQgcmVjZWlwdCcsIGNvbXBvbmVudDogJ2ZpbGUtdXBsb2FkZXInfSwgZmlsZVVwbG9hZGVyKVxuICAgICAgICAgICAgdGhpcy50YWJzID0gW1xuICAgICAgICAgICAgICAgIGN1c3RvbWVyLFxuICAgICAgICAgICAgICAgIHNoaXBwaW5nLFxuICAgICAgICAgICAgICAgIHBheW1lbnQsXG4gICAgICAgICAgICAgICAgc2hpcG1lbnQsXG4gICAgICAgICAgICAgICAgdXBsb2Fkc1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBmZXRjaFBhbmVsU3RhdHMgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBheGlvcy5nZXQocm91dGUoJ2FwaS5wYW5lbC5zdGF0cycpKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuaXRlbXMgPSByZXNwb25zZS5kYXRhLm9yZGVyc1xuICAgICAgICAgICAgICAgIHNlbGYudG90YWwgPSByZXNwb25zZS5kYXRhLnRvdGFsXG4gICAgICAgICAgICAgICAgc2VsZi5zZW50ID0gcmVzcG9uc2UuZGF0YS5zZW50XG4gICAgICAgICAgICAgICAgc2VsZi5wYWlkID0gcmVzcG9uc2UuZGF0YS5wYWlkXG4gICAgICAgICAgICAgICAgc2VsZi5yZWNlaXZlZCA9IHJlc3BvbnNlLmRhdGEucmVjZWl2ZWRcbiAgICAgICAgICAgICAgICBzZWxmLmRvbmUgPSByZXNwb25zZS5kYXRhLmRvbmVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsQW1vdW50IChpdGVtKSB7XG4gICAgICAgICAgICBsZXQgY2FydCA9IEpTT04ucGFyc2UoaXRlbS5jYXJ0KVxuICAgICAgICAgICAgbGV0IHRvdGFsID0gdGhpcy5wYXJzZU51bWJlcihjYXJ0LnRvdGFsKSArIHBhcnNlRmxvYXQoaXRlbS5zaGlwbWVudC5zaGlwcGluZ19mZWUpXG4gICAgICAgICAgICByZXR1cm4gdG90YWwudG9GaXhlZCgyKVxuICAgICAgICB9XG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdGVtcyBjaGFuZ2VkJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWVwOiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbnRoZWFkLmRhdGF0YWJsZV9fcHJvZ3Jlc3Mge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIERhc2hib2FyZC52dWU/Mzg3ZGM4NTUiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9EYXNoUGFuZWxzLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZDgxNjU3YTJcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vRGFzaFBhbmVscy52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHBhcnRpYWxzXFxcXERhc2hQYW5lbHMudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBEYXNoUGFuZWxzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1kODE2NTdhMlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWQ4MTY1N2EyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhcnRpYWxzL0Rhc2hQYW5lbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4MDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuPGRpdj5cbiAgICA8di1sYXlvdXQgcm93IHdyYXAgYWxpZ24tY2VudGVyPlxuICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1yaWdodD5cbiAgICAgICAgPGg1IGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiPlxuICAgICAgICBUb3RhbCBPcmRlcnM6IHt7IHRvdGFsIH19XG4gICAgICAgIDwvaDU+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgIDwvdi1sYXlvdXQ+XG4gICAgPHYtbGF5b3V0IHJvdyB3cmFwIGFsaWduLWNlbnRlcj5cbiAgICA8IS0tIG1ha2UgYSBjYXJkIHRvIGRpc3BsYXkgdGhpcyAtLT5cbiAgICA8di1mbGV4IHhzMTIgbWQ0IHRleHQteHMtY2VudGVyPlxuICAgICAgICA8di1jYXJkIGNvbG9yPVwiYmx1ZS1ncmV5XCIgY2xhc3M9XCJtYS0xXCIgaGVpZ2h0PVwiMTEwcHhcIj5cbiAgICAgICAgICAgIDx2LWNhcmQtdGV4dCBjbGFzcz1cInRpdGxlIHBhLTVcIj5cbiAgICAgICAgICAgICAgICA8di1pY29uIGxhcmdlIGNvbG9yPVwiYW1iZXIgbGlnaHRlbi0yXCI+Y29uZmlybWF0aW9uX251bWJlcjwvdi1pY29uPiBVbnBhaWQ6IHt7IHVucGFpZCB9fVxuICAgICAgICAgICAgPC92LWNhcmQtdGV4dD5cbiAgICAgICAgPC92LWNhcmQ+XG4gICAgPC92LWZsZXg+XG4gICAgPHYtZmxleCB4czEyIG1kNCB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgPHYtY2FyZCBjb2xvcj1cInJlZCBsaWdodGVuLTJcIiBjbGFzcz1cIm1hLTFcIiBoZWlnaHQ9XCIxMTBweFwiPlxuICAgICAgICAgICAgPHYtY2FyZC10ZXh0IGNsYXNzPVwidGl0bGUgcGEtNVwiPlxuICAgICAgICAgICAgICAgIDx2LWljb24gbGFyZ2UgY29sb3I9XCJyZWQgZGFya2VuLTRcIj5kb19ub3RfZGlzdHVyYjwvdi1pY29uPiBPbi1Ib2xkOiB7eyB1bnNlbnQgfX1cbiAgICAgICAgICAgIDwvdi1jYXJkLXRleHQ+XG4gICAgICAgIDwvdi1jYXJkPlxuICAgIDwvdi1mbGV4PlxuICAgIDx2LWZsZXggeHMxMiBtZDQgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgIDx2LWNhcmQgY29sb3I9XCJjeWFuXCIgY2xhc3M9XCJtYS0xXCIgaGVpZ2h0PVwiMTEwcHhcIj5cbiAgICAgICAgICAgIDx2LWNhcmQtdGV4dCBjbGFzcz1cInRpdGxlIHBhLTVcIj5cbiAgICAgICAgICAgICAgICA8di1pY29uIGxhcmdlIGNvbG9yPVwiYW1iZXJcIj5sb2NhbF9zaGlwcGluZzwvdi1pY29uPiBTZW50OiB7eyBzZW50IH19XG4gICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxuICAgICAgICA8L3YtY2FyZD5cbiAgICA8L3YtZmxleD5cbiAgICA8di1mbGV4IHhzMTIgbWQ0IHRleHQteHMtY2VudGVyPlxuICAgICAgICA8di1jYXJkIGNvbG9yPVwidGVhbCBsaWdodGVuLTJcIiBjbGFzcz1cIm1hLTFcIiBoZWlnaHQ9XCIxMTBweFwiPlxuICAgICAgICAgICAgICAgIDx2LWNhcmQtdGV4dCBjbGFzcz1cInRpdGxlIHBhLTVcIj5cbiAgICAgICAgICAgICAgICA8di1pY29uIGxhcmdlIGNvbG9yPVwibGltZVwiPmxvY2FsX21hbGw8L3YtaWNvbj4gRG9uZToge3sgZG9uZSB9fVxuICAgICAgICAgICAgPC92LWNhcmQtdGV4dD5cbiAgICAgICAgPC92LWNhcmQ+XG4gICAgPC92LWZsZXg+XG4gICAgPHYtZmxleCB4czEyIG1kNCB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgPHYtY2FyZCBjb2xvcj1cImxpZ2h0LWdyZWVuXCIgY2xhc3M9XCJtYS0xXCIgaGVpZ2h0PVwiMTEwcHhcIj5cbiAgICAgICAgICAgIDx2LWNhcmQtdGV4dCBjbGFzcz1cInRpdGxlIHBhLTVcIj5cbiAgICAgICAgICAgICAgICA8di1pY29uIGxhcmdlIGNvbG9yPVwidGVhbFwiPmJlZW5oZXJlPC92LWljb24+IFJlY2VpdmVkOiB7eyByZWNlaXZlZCB9fVxuICAgICAgICAgICAgPC92LWNhcmQtdGV4dD5cbiAgICAgICAgPC92LWNhcmQ+XG4gICAgPC92LWZsZXg+XG4gICAgPHYtZmxleCB4czEyIG1kNCB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgPHYtY2FyZCBjb2xvcj1cInRlYWwgZGFya2VuLTRcIiBjbGFzcz1cIm1hLTFcIiBoZWlnaHQ9XCIxMTBweFwiPlxuICAgICAgICAgICAgPHYtY2FyZC10ZXh0IGNsYXNzPVwidGl0bGUgcGEtNVwiPlxuICAgICAgICAgICAgICAgIDx2LWljb24gbGFyZ2UgY29sb3I9XCJncmVlbiBsaWdodGVuLTJcIj5sb2NhbF9hdG08L3YtaWNvbj4gUGFpZDoge3sgcGFpZCB9fVxuICAgICAgICAgICAgPC92LWNhcmQtdGV4dD5cbiAgICAgICAgPC92LWNhcmQ+XG4gICAgPC92LWZsZXg+XG4gICAgPC92LWxheW91dD5cbjwvZGl2PlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiBbJ3VucGFpZCcsICdwYWlkJywgJ3NlbnQnLCAncmVjZWl2ZWQnLCAndG90YWwnLCAndW5zZW50JywgJ2RvbmUnXVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gRGFzaFBhbmVscy52dWU/ZWZjZTA0ZDYiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIsIFwiYWxpZ24tY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiLCBcInRleHQteHMtcmlnaHRcIjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgIF9jKFwiaDVcIiwgeyBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgXCJcXG4gICAgICAgIFRvdGFsIE9yZGVyczogXCIgKyBfdm0uX3MoX3ZtLnRvdGFsKSArIFwiXFxuICAgICAgICBcIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIsIFwiYWxpZ24tY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBtZDQ6IFwiXCIsIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWEtMVwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwiYmx1ZS1ncmV5XCIsIGhlaWdodDogXCIxMTBweFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgcGEtNVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGxhcmdlOiBcIlwiLCBjb2xvcjogXCJhbWJlciBsaWdodGVuLTJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiY29uZmlybWF0aW9uX251bWJlclwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFVucGFpZDogXCIgKyBfdm0uX3MoX3ZtLnVucGFpZCkgKyBcIlxcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgbWQ0OiBcIlwiLCBcInRleHQteHMtY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1hLTFcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInJlZCBsaWdodGVuLTJcIiwgaGVpZ2h0OiBcIjExMHB4XCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSBwYS01XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgbGFyZ2U6IFwiXCIsIGNvbG9yOiBcInJlZCBkYXJrZW4tNFwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJkb19ub3RfZGlzdHVyYlwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIE9uLUhvbGQ6IFwiICsgX3ZtLl9zKF92bS51bnNlbnQpICsgXCJcXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIG1kNDogXCJcIiwgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYS0xXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJjeWFuXCIsIGhlaWdodDogXCIxMTBweFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgcGEtNVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IGxhcmdlOiBcIlwiLCBjb2xvcjogXCJhbWJlclwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwibG9jYWxfc2hpcHBpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgU2VudDogXCIgKyBfdm0uX3MoX3ZtLnNlbnQpICsgXCJcXG4gICAgICAgICAgICBcIilcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIG1kNDogXCJcIiwgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYS0xXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJ0ZWFsIGxpZ2h0ZW4tMlwiLCBoZWlnaHQ6IFwiMTEwcHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHBhLTVcIiB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyBsYXJnZTogXCJcIiwgY29sb3I6IFwibGltZVwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwibG9jYWxfbWFsbFwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBEb25lOiBcIiArIF92bS5fcyhfdm0uZG9uZSkgKyBcIlxcbiAgICAgICAgICAgIFwiKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgbWQ0OiBcIlwiLCBcInRleHQteHMtY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1hLTFcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcImxpZ2h0LWdyZWVuXCIsIGhlaWdodDogXCIxMTBweFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgcGEtNVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IGxhcmdlOiBcIlwiLCBjb2xvcjogXCJ0ZWFsXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJiZWVuaGVyZVwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFJlY2VpdmVkOiBcIiArIF92bS5fcyhfdm0ucmVjZWl2ZWQpICsgXCJcXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIG1kNDogXCJcIiwgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYS0xXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJ0ZWFsIGRhcmtlbi00XCIsIGhlaWdodDogXCIxMTBweFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgcGEtNVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGxhcmdlOiBcIlwiLCBjb2xvcjogXCJncmVlbiBsaWdodGVuLTJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwibG9jYWxfYXRtXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFBhaWQ6IFwiICsgX3ZtLl9zKF92bS5wYWlkKSArIFwiXFxuICAgICAgICAgICAgXCIpXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtZDgxNjU3YTJcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWQ4MTY1N2EyXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYXJ0aWFscy9EYXNoUGFuZWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMmU0NTU4YWZcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ3VzdG9tZXJEZXRhaWxzLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9DdXN0b21lckRldGFpbHMudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yZTQ1NThhZlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9DdXN0b21lckRldGFpbHMudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcY29tcG9uZW50c1xcXFxkYXNoYm9hcmRcXFxcQ3VzdG9tZXJEZXRhaWxzLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gQ3VzdG9tZXJEZXRhaWxzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0yZTQ1NThhZlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTJlNDU1OGFmXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL0N1c3RvbWVyRGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDgxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMmU0NTU4YWZcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ3VzdG9tZXJEZXRhaWxzLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiYjZmY2M2NmFcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMmU0NTU4YWZcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ3VzdG9tZXJEZXRhaWxzLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yZTQ1NThhZlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9DdXN0b21lckRldGFpbHMudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTJlNDU1OGFmXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL0N1c3RvbWVyRGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDgxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIkN1c3RvbWVyRGV0YWlscy52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0yZTQ1NThhZlwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9DdXN0b21lckRldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4MTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuPHYtY29udGFpbmVyIGZsdWlkPlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJmaXJzdF9uYW1lXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJGaXJzdCBOYW1lXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImN1c3RvbWVyRm9ybS5jdXN0b21lcl9kZXRhaWxzLmZpcnN0X25hbWVcIlxuICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiZmlyc3RfbmFtZVwiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdmaXJzdF9uYW1lJylcIlxuICAgICAgICAgICAgICBwcmVwZW5kLWljb249XCJmYS1pZC1jYXJkXCJcbiAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICBuYW1lPVwibGFzdF9uYW1lXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJMYXN0IE5hbWVcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwiY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMubGFzdF9uYW1lXCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImxhc3RfbmFtZVwiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdsYXN0X25hbWUnKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWlkLWNhcmQtb1wiXG4gICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiRW1haWxcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwiY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuZW1haWxcIlxuICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfGVtYWlsJ1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2VtYWlsJylcIlxuICAgICAgICAgICAgICBwcmVwZW5kLWljb249XCJlbWFpbFwiXG4gICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgbmFtZT1cImNvbnRhY3Rfbm9cIlxuICAgICAgICAgICAgbGFiZWw9XCJDb250YWN0IE5vLlwiXG4gICAgICAgICAgICB2LW1vZGVsPVwiY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuY29udGFjdF9ub1wiXG4gICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG51bWVyaWMnXCJcbiAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImNvbnRhY3Rfbm9cIlxuICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2NvbnRhY3Rfbm8nKVwiXG4gICAgICAgICAgICBwcmVwZW5kLWljb249XCJmYS1waG9uZVwiXG4gICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtYnRuIGxpZ2h0IGNvbG9yPVwicHJpbWFyeVwiIDpsb2FkaW5nPVwiY3VzdG9tZXJGb3JtLmJ1c3lcIiA6ZGlzYWJsZWQ9XCJlcnJvcnMuYW55KClcIiAgQGNsaWNrLm5hdGl2ZT1cInN1Ym1pdCgpXCIgOmNsYXNzPVwie3ByaW1hcnk6ICFjdXN0b21lckZvcm0uYnVzeSwgZXJyb3I6IGN1c3RvbWVyRm9ybS5idXN5fVwiIGNsYXNzPVwid2hpdGUtLXRleHRcIj5VcGRhdGU8L3YtYnRuPlxuPC92LWNvbnRhaW5lcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFsndGFiJywgJ29yZGVyJ10sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgY3VzdG9tZXJGb3JtOiBuZXcgQXBwRm9ybShBcHAuZm9ybXMuY3VzdG9tZXJGb3JtKVxuICAgIH0pLFxuICAgIHdhdGNoOiB7XG4gICAgICAgIHRhYiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuZmlyc3RfbmFtZSA9IG5ld1ZhbHVlLmZpcnN0X25hbWVcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMubGFzdF9uYW1lID0gbmV3VmFsdWUubGFzdF9uYW1lXG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyRm9ybS5jdXN0b21lcl9kZXRhaWxzLmVtYWlsID0gbmV3VmFsdWUuZW1haWxcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuY29udGFjdF9ubyA9IG5ld1ZhbHVlLmNvbnRhY3Rfbm9cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBzdWJtaXQgKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm0gc3VibWl0dGVkJylcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5jdXN0b21lckZvcm0uYnVzeSA9IHRydWVcbiAgICAgICAgICAgIEFwcC5wb3N0KHJvdXRlKCdhcGkub3JkZXJzLmN1c3RvbWVyX2RldGFpbHMnLCB7b3JkZXI6IHNlbGYub3JkZXIuaWR9KSwgc2VsZi5jdXN0b21lckZvcm0pLnRoZW4oKHttZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuY3VzdG9tZXJGb3JtLmJ1c3kgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHNlbGYub3JkZXIuY3VzdG9tZXJfZGV0YWlscyA9IEpTT04uc3RyaW5naWZ5KHNlbGYuY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMpXG4gICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnIzRkYjZhYycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICB9KS5jYXRjaCgoe2Vycm9ycywgbWVzc2FnZX0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9ycylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdm0uJHBvcHVwKHsgbWVzc2FnZTogbWVzc2FnZSwgYmFja2dyb3VuZENvbG9yOiAnI2U1NzM3MycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuY3VzdG9tZXJGb3JtLmJ1c3kgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDdXN0b21lckRldGFpbHMudnVlPzdjMjVhN2Y0IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtY29udGFpbmVyXCIsXG4gICAgeyBhdHRyczogeyBmbHVpZDogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlyc3RfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRmlyc3QgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJmaXJzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImZpcnN0X25hbWVcIiksXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLWlkLWNhcmRcIixcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5maXJzdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0uY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuZmlyc3RfbmFtZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuZmlyc3RfbmFtZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGFzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJMYXN0IE5hbWVcIixcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwibGFzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImxhc3RfbmFtZVwiKSxcbiAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtaWQtY2FyZC1vXCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMubGFzdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0uY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMubGFzdF9uYW1lID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjdXN0b21lckZvcm0uY3VzdG9tZXJfZGV0YWlscy5sYXN0X25hbWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfGVtYWlsXCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfGVtYWlsJ1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW1haWxcIixcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkVtYWlsXCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImVtYWlsXCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImVtYWlsXCIpLFxuICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmN1c3RvbWVyRm9ybS5jdXN0b21lcl9kZXRhaWxzLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0uY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuZW1haWwgPSAkJHZcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImN1c3RvbWVyRm9ybS5jdXN0b21lcl9kZXRhaWxzLmVtYWlsXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG51bWVyaWMnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb250YWN0X25vXCIsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJDb250YWN0IE5vLlwiLFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJjb250YWN0X25vXCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImNvbnRhY3Rfbm9cIiksXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLXBob25lXCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY3VzdG9tZXJGb3JtLmN1c3RvbWVyX2RldGFpbHMuY29udGFjdF9ubyxcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmN1c3RvbWVyRm9ybS5jdXN0b21lcl9kZXRhaWxzLmNvbnRhY3Rfbm8gPSAkJHZcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImN1c3RvbWVyRm9ybS5jdXN0b21lcl9kZXRhaWxzLmNvbnRhY3Rfbm9cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJ3aGl0ZS0tdGV4dFwiLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBwcmltYXJ5OiAhX3ZtLmN1c3RvbWVyRm9ybS5idXN5LFxuICAgICAgICAgICAgZXJyb3I6IF92bS5jdXN0b21lckZvcm0uYnVzeVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgY29sb3I6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgbG9hZGluZzogX3ZtLmN1c3RvbWVyRm9ybS5idXN5LFxuICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5lcnJvcnMuYW55KClcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgIF92bS5zdWJtaXQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW192bS5fdihcIlVwZGF0ZVwiKV1cbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtMmU0NTU4YWZcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTJlNDU1OGFmXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9DdXN0b21lckRldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4MTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yM2ZhMTgwMVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9QYXltZW50RGV0YWlscy52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vUGF5bWVudERldGFpbHMudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yM2ZhMTgwMVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9QYXltZW50RGV0YWlscy52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXGRhc2hib2FyZFxcXFxQYXltZW50RGV0YWlscy52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIFBheW1lbnREZXRhaWxzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0yM2ZhMTgwMVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTIzZmExODAxXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1BheW1lbnREZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yM2ZhMTgwMVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9QYXltZW50RGV0YWlscy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjZmZTU3MmIxXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTIzZmExODAxXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1BheW1lbnREZXRhaWxzLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yM2ZhMTgwMVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9QYXltZW50RGV0YWlscy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtMjNmYTE4MDFcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvUGF5bWVudERldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4MThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJQYXltZW50RGV0YWlscy52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0yM2ZhMTgwMVwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9QYXltZW50RGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDgxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCI8dGVtcGxhdGU+XG48di1jb250YWluZXIgZmx1aWQ+XG4gIDx2LWxheW91dCByb3cgdi1pZj1cInBheW1lbnRGb3JtLmdhdGV3YXlcIj5cbiAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgIDxwIGNsYXNzPVwic3ViaGVhZGVyIHByaW1hcnktLXRleHRcIj5HYXRld2F5IERldGFpbHM6PC9wPlxuICAgIDwvdi1mbGV4PlxuICA8L3YtbGF5b3V0PlxuICA8di1sYXlvdXQgcm93IHYtaWY9XCJwYXltZW50Rm9ybS5nYXRld2F5XCI+XG4gICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICBuYW1lPVwibW9wXCJcbiAgICAgIGxhYmVsPVwiTW9kZSBPZiBQYXltZW50XCJcbiAgICAgIHYtbW9kZWw9XCJwYXltZW50Rm9ybS5nYXRld2F5Lm5hbWVcIlxuICAgICAgcmVhZG9ubHlcbiAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgIDwvdi1mbGV4PlxuICA8L3YtbGF5b3V0PlxuICA8ZGl2IHYtaWY9XCJwYXltZW50Rm9ybS5nYXRld2F5XCI+XG4gICAgPHYtbGF5b3V0IHJvdyB2LWZvcj1cIih2YWx1ZSxrZXksaW5kZXgpIGluIHBheW1lbnRGb3JtLmdhdGV3YXkuZGV0YWlsc1wiIDprZXk9XCJrZXlcIiA6aW5kZXg9XCJpbmRleFwiPlxuICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICA8di10ZXh0LWZpZWxkXG4gICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgbmFtZT1cImtleVwiXG4gICAgICA6bGFiZWw9XCJ0b1Byb3BlckNhc2Uoa2V5KVwiXG4gICAgICA6dmFsdWU9XCJ2YWx1ZVwiXG4gICAgICByZWFkb25seVxuICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDwvZGl2PlxuICA8di1sYXlvdXQgcm93PlxuICAgIDx2LWZsZXggeHMxMiB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgPHAgY2xhc3M9XCJzdWJoZWFkZXIgcHJpbWFyeS0tdGV4dFwiPlBheW1lbnQgRGV0YWlsczo8L3A+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDx2LWxheW91dCByb3c+XG4gICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgbmFtZT1cInRyYW5zYWN0aW9uX25vXCJcbiAgICAgICAgbGFiZWw9XCJUcmFuc2FjdGlvbiBOb1wiXG4gICAgICAgIHYtbW9kZWw9XCJwYXltZW50Rm9ybS50cmFuc2FjdGlvbl9ub1wiXG4gICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICBkYXRhLXZ2LW5hbWU9XCJUcmFuc2FjdGlvbiBOb1wiXG4gICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdUcmFuc2FjdGlvbiBObycpXCJcbiAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtaGFzaHRhZ1wiXG4gICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgIDwvdi1mbGV4PlxuICA8L3YtbGF5b3V0PlxuICA8di1sYXlvdXQgcm93PlxuICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgPHYtZGlhbG9nXG4gICAgcGVyc2lzdGVudFxuICAgIHYtbW9kZWw9XCJkaWFsb2dcIlxuICAgIGxhenlcbiAgICBmdWxsLXdpZHRoXG4gICAgbGlnaHRcbiAgICA+XG4gICAgPHYtdGV4dC1maWVsZFxuICAgIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgIGxhYmVsPVwiRGF0ZSBQYWlkXCJcbiAgICB2LW1vZGVsPVwicGF5bWVudEZvcm0uZGF0ZV9wYWlkXCJcbiAgICBwcmVwZW5kLWljb249XCJldmVudFwiXG4gICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgIGRhdGEtdnYtbmFtZT1cIkRhdGUgUGFpZFwiXG4gICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ0RhdGUgUGFpZCcpXCJcbiAgICBsaWdodFxuICAgIHJlYWRvbmx5XG4gICAgPlxuICAgIDwvdi10ZXh0LWZpZWxkPlxuICAgIDx2LWRhdGUtcGlja2VyIHYtbW9kZWw9XCJwYXltZW50Rm9ybS5kYXRlX3BhaWRcIiBzY3JvbGxhYmxlIGFjdGlvbnMgbGlnaHQ+XG4gICAgICA8dGVtcGxhdGUgc2NvcGU9XCJ7IHNhdmUsIGNhbmNlbCB9XCI+XG4gICAgICAgIDx2LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgICA8di1idG4gZmxhdCBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2s9XCJjYW5jZWxcIj5DYW5jZWw8L3YtYnRuPlxuICAgICAgICAgIDx2LWJ0biBmbGF0IGNvbG9yPVwicHJpbWFyeVwiIEBjbGljaz1cInNhdmVcIj5PSzwvdi1idG4+XG4gICAgICAgIDwvdi1jYXJkLWFjdGlvbnM+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvdi1kYXRlLXBpY2tlcj5cbiAgICA8L3YtZGlhbG9nPlxuICAgIDwvdi1mbGV4PlxuICA8L3YtbGF5b3V0PlxuICA8di1sYXlvdXQgcm93PlxuICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgbmFtZT1cImFjY291bnRfbmFtZVwiXG4gICAgICAgIGxhYmVsPVwiQWNjb3VudCBOYW1lXCJcbiAgICAgICAgdi1tb2RlbD1cInBheW1lbnRGb3JtLmFjY291bnRfbmFtZVwiXG4gICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICBkYXRhLXZ2LW5hbWU9XCJBY2NvdW50IE5hbWVcIlxuICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnQWNjb3VudCBOYW1lJylcIlxuICAgICAgICBwcmVwZW5kLWljb249XCJmYS1pZC1jYXJkXCJcbiAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDx2LWxheW91dCByb3c+XG4gICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICBuYW1lPVwiYWNjb3VudF9ub1wiXG4gICAgICAgIGxhYmVsPVwiQWNjb3VudCBOby5cIlxuICAgICAgICB2LW1vZGVsPVwicGF5bWVudEZvcm0uYWNjb3VudF9ub1wiXG4gICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICBkYXRhLXZ2LW5hbWU9XCJBY2NvdW50IE5vXCJcbiAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ0FjY291bnQgTm8nKVwiXG4gICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWNyZWRpdC1jYXJkXCJcbiAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDx2LWxheW91dCByb3c+XG4gICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgbmFtZT1cImFtb3VudFwiXG4gICAgICAgIGxhYmVsPVwiQW1vdW50XCJcbiAgICAgICAgdi1tb2RlbC5udW1iZXI9XCJwYXltZW50Rm9ybS5hbW91bnRcIlxuICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG1pbl92YWx1ZToxJ1wiXG4gICAgICAgIGRhdGEtdnYtbmFtZT1cImFtb3VudFwiXG4gICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdhbW91bnQnKVwiXG4gICAgICAgIHByZXBlbmQtaWNvbj1cImZhLW1vbmV5XCJcbiAgICAgICAgaGludD1cIkFtb3VudCBZb3UgUGFpZFwiXG4gICAgICBwZXJzaXN0ZW50LWhpbnRcbiAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgPC92LWZsZXg+XG4gIDwvdi1sYXlvdXQ+XG4gIDx2LWxheW91dCByb3c+XG4gICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICBuYW1lPVwiY3VycmVuY3lcIlxuICAgICAgbGFiZWw9XCJDdXJyZW5jeVwiXG4gICAgICB2LW1vZGVsPVwicGF5bWVudEZvcm0uY3VycmVuY3lcIlxuICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgZGF0YS12di1uYW1lPVwiY3VycmVuY3lcIlxuICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2N1cnJlbmN5JylcIlxuICAgICAgcHJlcGVuZC1pY29uPVwiZmEtdXNkXCJcbiAgICAgIGhpbnQ9XCJDdXJyZW5jeSBPZiBZb3VyIFBheW1lbnRcIlxuICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICA8L3YtZmxleD5cbiAgPC92LWxheW91dD5cbiAgPHYtYnRuIGxpZ2h0IGNvbG9yPVwicHJpbWFyeVwiIDpsb2FkaW5nPVwicGF5bWVudEZvcm0uYnVzeVwiIDpkaXNhYmxlZD1cImVycm9ycy5hbnkoKVwiICBAY2xpY2submF0aXZlPVwic3VibWl0KClcIiA6Y2xhc3M9XCJ7cHJpbWFyeTogIXBheW1lbnRGb3JtLmJ1c3ksIGVycm9yOiBwYXltZW50Rm9ybS5idXN5fVwiIGNsYXNzPVwid2hpdGUtLXRleHRcIj5VcGRhdGU8L3YtYnRuPlxuPC92LWNvbnRhaW5lcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFsndGFiJywgJ29yZGVyJ10sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZGlhbG9nOiBmYWxzZSxcbiAgICAgICAgcGF5bWVudEZvcm06IG5ldyBBcHBGb3JtKEFwcC5mb3Jtcy5wYXltZW50Rm9ybSlcbiAgICB9KSxcbiAgICB3YXRjaDoge1xuICAgICAgICB0YWIgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnBheW1lbnRGb3JtLmlkID0gbmV3VmFsdWUuaWRcbiAgICAgICAgICAgIHRoaXMucGF5bWVudEZvcm0uZGF0ZV9wYWlkID0gbmV3VmFsdWUuZGF0ZV9wYWlkID8gbW9tZW50KG5ld1ZhbHVlLmRhdGVfcGFpZCkuZm9ybWF0KCdZWVlZLU1NLUREJykgOiBudWxsXG4gICAgICAgICAgICB0aGlzLnBheW1lbnRGb3JtLnRyYW5zYWN0aW9uX25vID0gbmV3VmFsdWUudHJhbnNhY3Rpb25fbm9cbiAgICAgICAgICAgIHRoaXMucGF5bWVudEZvcm0uYWNjb3VudF9uYW1lID0gbmV3VmFsdWUuYWNjb3VudF9uYW1lXG4gICAgICAgICAgICB0aGlzLnBheW1lbnRGb3JtLmFjY291bnRfbm8gPSBuZXdWYWx1ZS5hY2NvdW50X25vXG4gICAgICAgICAgICB0aGlzLnBheW1lbnRGb3JtLmFtb3VudCA9IG5ld1ZhbHVlLmFtb3VudFxuICAgICAgICAgICAgdGhpcy5wYXltZW50Rm9ybS5jdXJyZW5jeSA9IG5ld1ZhbHVlLmN1cnJlbmN5XG4gICAgICAgICAgICB0aGlzLnBheW1lbnRGb3JtLmdhdGV3YXkgPSBuZXdWYWx1ZS5nYXRld2F5XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgdG9Qcm9wZXJDYXNlIChrZXkpIHtcbiAgICAgICAgICAgIGxldCBuZXdTdHIgPSBrZXkucmVwbGFjZSgvXy9nLCAnICcpXG4gICAgICAgICAgICByZXR1cm4gbmV3U3RyLnJlcGxhY2UoL1xcd1xcUyovZywgZnVuY3Rpb24gKHR4dCkgeyByZXR1cm4gdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHN1Ym1pdCAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYucGF5bWVudEZvcm0uYnVzeSA9IHRydWVcbiAgICAgICAgICAgIEFwcC5wb3N0KHJvdXRlKCdhcGkub3JkZXJzLnBheW1lbnRfZGV0YWlscycsIHtvcmRlcjogc2VsZi5vcmRlci5pZH0pLCBzZWxmLnBheW1lbnRGb3JtKS50aGVuKCh7bWVzc2FnZX0pID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLnBheW1lbnRGb3JtLmJ1c3kgPSBmYWxzZVxuICAgICAgICAgICAgICAgIC8vIGVkaXQgdGhlIGFycmF5IG9mIG9yZGVycyBieSBwYXNzaW5nIHRoZSB3aG9sZSBvYmplY3Qgb2YgZWFjaCBvcmRlclxuICAgICAgICAgICAgICAgIHNlbGYub3JkZXIucGF5bWVudC50cmFuc2FjdGlvbl9ubyA9IHNlbGYucGF5bWVudEZvcm0udHJhbnNhY3Rpb25fbm9cbiAgICAgICAgICAgICAgICBzZWxmLm9yZGVyLnBheW1lbnQuYWNjb3VudF9uYW1lID0gc2VsZi5wYXltZW50Rm9ybS5hY2NvdW50X25hbWVcbiAgICAgICAgICAgICAgICBzZWxmLm9yZGVyLnBheW1lbnQuYWNjb3VudF9ubyA9IHNlbGYucGF5bWVudEZvcm0uYWNjb3VudF9ub1xuICAgICAgICAgICAgICAgIHNlbGYub3JkZXIucGF5bWVudC5hbW91bnQgPSBzZWxmLnBheW1lbnRGb3JtLmFtb3VudFxuICAgICAgICAgICAgICAgIHNlbGYub3JkZXIucGF5bWVudC5jdXJyZW5jeSA9IHNlbGYucGF5bWVudEZvcm0uY3VycmVuY3lcbiAgICAgICAgICAgICAgICBzZWxmLm9yZGVyLnBheW1lbnQuZGF0ZV9wYWlkID0gc2VsZi5wYXltZW50Rm9ybS5kYXRlX3BhaWRcbiAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjNGRiNmFjJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKCh7ZXJyb3JzLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB2bS4kcG9wdXAoeyBtZXNzYWdlOiBtZXNzYWdlLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5wYXltZW50Rm9ybS5idXN5ID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBQYXltZW50RGV0YWlscy52dWU/MTA5NGVmYmUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1jb250YWluZXJcIixcbiAgICB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfdm0ucGF5bWVudEZvcm0uZ2F0ZXdheVxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJzdWJoZWFkZXIgcHJpbWFyeS0tdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIkdhdGV3YXkgRGV0YWlsczpcIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLnBheW1lbnRGb3JtLmdhdGV3YXlcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTW9kZSBPZiBQYXltZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBheW1lbnRGb3JtLmdhdGV3YXkubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0ucGF5bWVudEZvcm0uZ2F0ZXdheS5uYW1lID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBheW1lbnRGb3JtLmdhdGV3YXkubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5wYXltZW50Rm9ybS5nYXRld2F5XG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgX3ZtLl9sKF92bS5wYXltZW50Rm9ybS5nYXRld2F5LmRldGFpbHMsIGZ1bmN0aW9uKFxuICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICBpbmRleFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBrZXk6IGtleSwgYXR0cnM6IHsgcm93OiBcIlwiLCBpbmRleDogaW5kZXggfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhzMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbTEyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWQxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxnMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB4bDEyOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrZXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IF92bS50b1Byb3BlckNhc2Uoa2V5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkb25seTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwic3ViaGVhZGVyIHByaW1hcnktLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihcIlBheW1lbnQgRGV0YWlsczpcIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0cmFuc2FjdGlvbl9ub1wiLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVHJhbnNhY3Rpb24gTm9cIixcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiVHJhbnNhY3Rpb24gTm9cIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiVHJhbnNhY3Rpb24gTm9cIiksXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLWhhc2h0YWdcIixcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYXltZW50Rm9ybS50cmFuc2FjdGlvbl9ubyxcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnBheW1lbnRGb3JtLnRyYW5zYWN0aW9uX25vID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXltZW50Rm9ybS50cmFuc2FjdGlvbl9ub1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWRpYWxvZ1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhenk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZnVsbC13aWR0aFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZGlhbG9nLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmRpYWxvZyA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImRpYWxvZ1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRhdGUgUGFpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZXZlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcIkRhdGUgUGFpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiRGF0ZSBQYWlkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYXltZW50Rm9ybS5kYXRlX3BhaWQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnBheW1lbnRGb3JtLmRhdGVfcGFpZCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXltZW50Rm9ybS5kYXRlX3BhaWRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInYtZGF0ZS1waWNrZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzY3JvbGxhYmxlOiBcIlwiLCBhY3Rpb25zOiBcIlwiLCBsaWdodDogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZSA9IHJlZi5zYXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYW5jZWwgPSByZWYuY2FuY2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1hY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBmbGF0OiBcIlwiLCBjb2xvcjogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBjYW5jZWwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIkNhbmNlbFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGZsYXQ6IFwiXCIsIGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IHNhdmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIk9LXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYXltZW50Rm9ybS5kYXRlX3BhaWQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnBheW1lbnRGb3JtLmRhdGVfcGFpZCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXltZW50Rm9ybS5kYXRlX3BhaWRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY2NvdW50X25hbWVcIixcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFjY291bnQgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJBY2NvdW50IE5hbWVcIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiQWNjb3VudCBOYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1pZC1jYXJkXCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGF5bWVudEZvcm0uYWNjb3VudF9uYW1lLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0ucGF5bWVudEZvcm0uYWNjb3VudF9uYW1lID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXltZW50Rm9ybS5hY2NvdW50X25hbWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfG1heDoyNTVcIixcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcImFjY291bnRfbm9cIixcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFjY291bnQgTm8uXCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcIkFjY291bnQgTm9cIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiQWNjb3VudCBOb1wiKSxcbiAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtY3JlZGl0LWNhcmRcIixcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYXltZW50Rm9ybS5hY2NvdW50X25vLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0ucGF5bWVudEZvcm0uYWNjb3VudF9ubyA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGF5bWVudEZvcm0uYWNjb3VudF9ub1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWluX3ZhbHVlOjFcIixcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWluX3ZhbHVlOjEnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJhbW91bnRcIixcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFtb3VudFwiLFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJhbW91bnRcIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiYW1vdW50XCIpLFxuICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1tb25leVwiLFxuICAgICAgICAgICAgICAgICAgaGludDogXCJBbW91bnQgWW91IFBhaWRcIixcbiAgICAgICAgICAgICAgICAgIFwicGVyc2lzdGVudC1oaW50XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGF5bWVudEZvcm0uYW1vdW50LFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0ucGF5bWVudEZvcm0uYW1vdW50ID0gX3ZtLl9uKCQkdilcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBheW1lbnRGb3JtLmFtb3VudFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJjdXJyZW5jeVwiLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ3VycmVuY3lcIixcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiY3VycmVuY3lcIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiY3VycmVuY3lcIiksXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLXVzZFwiLFxuICAgICAgICAgICAgICAgICAgaGludDogXCJDdXJyZW5jeSBPZiBZb3VyIFBheW1lbnRcIixcbiAgICAgICAgICAgICAgICAgIFwicGVyc2lzdGVudC1oaW50XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGF5bWVudEZvcm0uY3VycmVuY3ksXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5wYXltZW50Rm9ybS5jdXJyZW5jeSA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGF5bWVudEZvcm0uY3VycmVuY3lcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJ3aGl0ZS0tdGV4dFwiLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBwcmltYXJ5OiAhX3ZtLnBheW1lbnRGb3JtLmJ1c3ksXG4gICAgICAgICAgICBlcnJvcjogX3ZtLnBheW1lbnRGb3JtLmJ1c3lcbiAgICAgICAgICB9LFxuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgIGNvbG9yOiBcInByaW1hcnlcIixcbiAgICAgICAgICAgIGxvYWRpbmc6IF92bS5wYXltZW50Rm9ybS5idXN5LFxuICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5lcnJvcnMuYW55KClcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgIF92bS5zdWJtaXQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW192bS5fdihcIlVwZGF0ZVwiKV1cbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtMjNmYTE4MDFcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTIzZmExODAxXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9QYXltZW50RGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDgyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQwZjYzOGRmXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1NoaXBwaW5nRGV0YWlscy52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU2hpcHBpbmdEZXRhaWxzLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDBmNjM4ZGZcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vU2hpcHBpbmdEZXRhaWxzLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGNvbXBvbmVudHNcXFxcZGFzaGJvYXJkXFxcXFNoaXBwaW5nRGV0YWlscy52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIFNoaXBwaW5nRGV0YWlscy52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNDBmNjM4ZGZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi00MGY2MzhkZlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwcGluZ0RldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4MjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQwZjYzOGRmXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1NoaXBwaW5nRGV0YWlscy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjQ0MzEzYjc4XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQwZjYzOGRmXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1NoaXBwaW5nRGV0YWlscy52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDBmNjM4ZGZcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vU2hpcHBpbmdEZXRhaWxzLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi00MGY2MzhkZlwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwcGluZ0RldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4MjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJTaGlwcGluZ0RldGFpbHMudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNDBmNjM4ZGZcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcHBpbmdEZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIjx0ZW1wbGF0ZT5cbjx2LWNvbnRhaW5lciBmbHVpZD5cbiAgICA8Zm9ybT5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICBuYW1lPVwiYWRkcmVzc18xXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJBZGRyZXNzIDFcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzFcIlxuICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiYWRkcmVzc18xXCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2FkZHJlc3NfMScpXCJcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtYWRkcmVzcy1ib29rXCJcbiAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICBuYW1lPVwiYWRkcmVzc18yXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJBZGRyZXNzIDJcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzJcIlxuICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiYWRkcmVzc18yXCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2FkZHJlc3NfMicpXCJcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtYWRkcmVzcy1ib29rLW9cIlxuICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImNpdHlcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkNpdHlcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5jaXR5XCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImNpdHlcIlxuICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnY2l0eScpXCJcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwibG9jYXRpb25fY2l0eVwiXG4gICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImNvdW50cnlcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkNvdW50cnlcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5jb3VudHJ5XCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImNvdW50cnlcIlxuICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnY291bnRyeScpXCJcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtZmFcIlxuICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgIG5hbWU9XCJ6aXBfY29kZVwiXG4gICAgICAgICAgICBsYWJlbD1cIlppcCBDb2RlXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJhZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLnppcF9jb2RlXCJcbiAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cInppcF9jb2RlXCJcbiAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCd6aXBfY29kZScpXCJcbiAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cIm1hcmt1bnJlYWRfbWFpbGJveFwiXG4gICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgIG5hbWU9XCJzdGF0ZV9wcm92aW5jZVwiXG4gICAgICAgICAgICBsYWJlbD1cIlN0YXRlIHwgUHJvdmluY2VcIlxuICAgICAgICAgICAgdi1tb2RlbD1cImFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuc3RhdGVfcHJvdmluY2VcIlxuICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgZGF0YS12di1uYW1lPVwic3RhdGVfcHJvdmluY2VcIlxuICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ3N0YXRlX3Byb3ZpbmNlJylcIlxuICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwicGxhY2VcIlxuICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWJ0biBsaWdodCBjb2xvcj1cInByaW1hcnlcIiA6bG9hZGluZz1cImFkZHJlc3NGb3JtLmJ1c3lcIiA6ZGlzYWJsZWQ9XCJlcnJvcnMuYW55KClcIiAgQGNsaWNrLm5hdGl2ZT1cInN1Ym1pdCgpXCIgOmNsYXNzPVwie3ByaW1hcnk6ICFhZGRyZXNzRm9ybS5idXN5LCBlcnJvcjogYWRkcmVzc0Zvcm0uYnVzeX1cIiBjbGFzcz1cIndoaXRlLS10ZXh0XCI+VXBkYXRlPC92LWJ0bj5cbiAgICAgICAgPC9mb3JtPlxuPC92LWNvbnRhaW5lcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFsndGFiJywgJ29yZGVyJ10sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgYWRkcmVzc0Zvcm06IG5ldyBBcHBGb3JtKEFwcC5mb3Jtcy5hZGRyZXNzRm9ybSlcbiAgICB9KSxcbiAgICB3YXRjaDoge1xuICAgICAgICB0YWIgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBwaW5nX2RldGFpbHMgPSBuZXdWYWx1ZVxuICAgICAgICAgICAgdGhpcy5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmFkZHJlc3NfMSA9IG5ld1ZhbHVlLmFkZHJlc3NfMVxuICAgICAgICAgICAgdGhpcy5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmFkZHJlc3NfMiA9IG5ld1ZhbHVlLmFkZHJlc3NfMlxuICAgICAgICAgICAgdGhpcy5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmNpdHkgPSBuZXdWYWx1ZS5jaXR5XG4gICAgICAgICAgICB0aGlzLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuY291bnRyeSA9IG5ld1ZhbHVlLmNvdW50cnlcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy56aXBfY29kZSA9IG5ld1ZhbHVlLnppcF9jb2RlXG4gICAgICAgICAgICB0aGlzLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuc3RhdGVfcHJvdmluY2UgPSBuZXdWYWx1ZS5zdGF0ZV9wcm92aW5jZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHN1Ym1pdCAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybSBzdWJtaXR0ZWQnKVxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLmFkZHJlc3NGb3JtLmJ1c3kgPSB0cnVlXG4gICAgICAgICAgICBBcHAucG9zdChyb3V0ZSgnYXBpLm9yZGVycy5zaGlwcGluZ19kZXRhaWxzJywge29yZGVyOiBzZWxmLm9yZGVyLmlkfSksIHNlbGYuYWRkcmVzc0Zvcm0pLnRoZW4oKHttZXNzYWdlfSkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkcmVzc0Zvcm0uYnVzeSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgc2VsZi5vcmRlci5zaGlwcGluZ19kZXRhaWxzID0gSlNPTi5zdHJpbmdpZnkoc2VsZi5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzKVxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgfSkuY2F0Y2goKHtlcnJvcnMsIG1lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcnMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmFkZHJlc3NGb3JtLmJ1c3kgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBTaGlwcGluZ0RldGFpbHMudnVlPzVjYzI3OWZiIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcInYtY29udGFpbmVyXCIsIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LCBbXG4gICAgX2MoXG4gICAgICBcImZvcm1cIixcbiAgICAgIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhZGRyZXNzXzFcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQWRkcmVzcyAxXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiYWRkcmVzc18xXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiYWRkcmVzc18xXCIpLFxuICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLWFkZHJlc3MtYm9va1wiLFxuICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzEsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzEgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJhZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmFkZHJlc3NfMVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfG1heDoyNTVcIixcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFkZHJlc3NfMlwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJBZGRyZXNzIDJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJhZGRyZXNzXzJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJhZGRyZXNzXzJcIiksXG4gICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtYWRkcmVzcy1ib29rLW9cIixcbiAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18yLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18yID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXR5XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNpdHlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJjaXR5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiY2l0eVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJsb2NhdGlvbl9jaXR5XCIsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmNpdHksXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5jaXR5ID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy5jaXR5XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY291bnRyeVwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDb3VudHJ5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiY291bnRyeVwiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImNvdW50cnlcIiksXG4gICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtZmFcIixcbiAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuY291bnRyeSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmNvdW50cnkgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJhZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLmNvdW50cnlcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInppcF9jb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlppcCBDb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiemlwX2NvZGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJ6aXBfY29kZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJtYXJrdW5yZWFkX21haWxib3hcIixcbiAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuemlwX2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uYWRkcmVzc0Zvcm0uc2hpcHBpbmdfZGV0YWlscy56aXBfY29kZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuemlwX2NvZGVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXRlX3Byb3ZpbmNlXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0YXRlIHwgUHJvdmluY2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJzdGF0ZV9wcm92aW5jZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcInN0YXRlX3Byb3ZpbmNlXCIpLFxuICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcInBsYWNlXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5hZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLnN0YXRlX3Byb3ZpbmNlLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmFkZHJlc3NGb3JtLnNoaXBwaW5nX2RldGFpbHMuc3RhdGVfcHJvdmluY2UgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJhZGRyZXNzRm9ybS5zaGlwcGluZ19kZXRhaWxzLnN0YXRlX3Byb3ZpbmNlXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ3aGl0ZS0tdGV4dFwiLFxuICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgcHJpbWFyeTogIV92bS5hZGRyZXNzRm9ybS5idXN5LFxuICAgICAgICAgICAgICBlcnJvcjogX3ZtLmFkZHJlc3NGb3JtLmJ1c3lcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgY29sb3I6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgICBsb2FkaW5nOiBfdm0uYWRkcmVzc0Zvcm0uYnVzeSxcbiAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5lcnJvcnMuYW55KClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLnN1Ym1pdCgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCJVcGRhdGVcIildXG4gICAgICAgIClcbiAgICAgIF0sXG4gICAgICAxXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNDBmNjM4ZGZcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTQwZjYzOGRmXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9TaGlwcGluZ0RldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA4MjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wZmYyMzk3M1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9TaGlwbWVudERldGFpbHMudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1NoaXBtZW50RGV0YWlscy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTBmZjIzOTczXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1NoaXBtZW50RGV0YWlscy52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXGRhc2hib2FyZFxcXFxTaGlwbWVudERldGFpbHMudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBTaGlwbWVudERldGFpbHMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTBmZjIzOTczXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMGZmMjM5NzNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcG1lbnREZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wZmYyMzk3M1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9TaGlwbWVudERldGFpbHMudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI3YTMxY2JiZlwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wZmYyMzk3M1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9TaGlwbWVudERldGFpbHMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTBmZjIzOTczXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1NoaXBtZW50RGV0YWlscy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtMGZmMjM5NzNcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9kYXNoYm9hcmQvU2hpcG1lbnREZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwiU2hpcG1lbnREZXRhaWxzLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTBmZjIzOTczXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBtZW50RGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDgyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCI8dGVtcGxhdGU+XG48di1jb250YWluZXIgZmx1aWQ+XG4gICAgICAgIDx2LWxheW91dCByb3cgdi1pZj1cInNoaXBtZW50Rm9ybS5jb3VyaWVyXCI+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzdWJoZWFkZXIgcHJpbWFyeS0tdGV4dFwiPkRlbGl2ZXJ5IE1ldGhvZDo8L3A+XG4gICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdyB2LWlmPVwic2hpcG1lbnRGb3JtLmNvdXJpZXJcIj5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgIG5hbWU9XCJtb3BcIlxuICAgICAgICAgICAgbGFiZWw9XCJNb2RlIE9mIFBheW1lbnRcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInNoaXBtZW50Rm9ybS5jb3VyaWVyLm5hbWVcIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8ZGl2IHYtaWY9XCJzaGlwbWVudEZvcm0uY291cmllclwiPlxuICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB2LWZvcj1cIih2YWx1ZSxrZXksaW5kZXgpIGluIHNoaXBtZW50Rm9ybS5jb3VyaWVyLmRldGFpbHNcIiA6a2V5PVwia2V5XCIgOmluZGV4PVwiaW5kZXhcIj5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgIG5hbWU9XCJrZXlcIlxuICAgICAgICAgICAgOmxhYmVsPVwidG9Qcm9wZXJDYXNlKGtleSlcIlxuICAgICAgICAgICAgOnZhbHVlPVwidmFsdWVcIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiB0ZXh0LXhzLWNlbnRlcj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN1YmhlYWRlciBwcmltYXJ5LS10ZXh0XCI+U2hpcG1lbnQgU3RhdHVzOjwvcD5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8IS0tIHJlYWQgT25seSBpZiBub3QgYWRtaW4gLS0+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJ0cmFja2luZ19ub1wiXG4gICAgICAgICAgICAgIGxhYmVsPVwiVHJhY2tpbmcgTm9cIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2hpcG1lbnRGb3JtLnRyYWNraW5nX25vXCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cIlRyYWNraW5nIE5vXCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ1RyYWNraW5nIE5vJylcIlxuICAgICAgICAgICAgICBwcmVwZW5kLWljb249XCJmYS10cnVja1wiXG4gICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCIhaGFzUm9sZSgnYWRtaW4nKVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgQGNsaWNrPVwic2hvd1NlbnRNb2RhbFwiXG4gICAgICAgICAgICBsYWJlbD1cIkRhdGUgU2VudFwiXG4gICAgICAgICAgICB2LW1vZGVsPVwic2hpcG1lbnRGb3JtLmRhdGVfc2VudFwiXG4gICAgICAgICAgICBwcmVwZW5kLWljb249XCJldmVudFwiXG4gICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJEYXRlIFNlbnRcIlxuICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ0RhdGUgU2VudCcpXCJcbiAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgICA8di1kaWFsb2dcbiAgICAgICAgICAgIHBlcnNpc3RlbnRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJtb2RhbDFcIlxuICAgICAgICAgICAgbGF6eVxuICAgICAgICAgICAgZnVsbC13aWR0aFxuICAgICAgICAgICAgbGlnaHRcbiAgICAgICAgICAgID5cblxuICAgICAgICAgICAgPHYtZGF0ZS1waWNrZXIgdi1tb2RlbD1cInNoaXBtZW50Rm9ybS5kYXRlX3NlbnRcIiBzY3JvbGxhYmxlIGFjdGlvbnMgbGlnaHQ+XG4gICAgICAgICAgICA8dGVtcGxhdGUgc2NvcGU9XCJ7IHNhdmUsIGNhbmNlbCB9XCI+XG4gICAgICAgICAgICAgICAgPHYtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICAgICAgICAgIDx2LWJ0biBmbGF0IGNvbG9yPVwicHJpbWFyeVwiIEBjbGljaz1cImNhbmNlbFwiPkNhbmNlbDwvdi1idG4+XG4gICAgICAgICAgICAgICAgPHYtYnRuIGZsYXQgY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrPVwic2F2ZVwiPk9LPC92LWJ0bj5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvdi1kYXRlLXBpY2tlcj5cbiAgICAgICAgICAgIDwvdi1kaWFsb2c+XG4gICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di1jaGVja2JveCA6ZGlzYWJsZWQ9XCIhaGFzUm9sZSgnYWRtaW4nKVwiIHYtYmluZDpsYWJlbD1cImBTZW50YFwiIHYtbW9kZWw9XCJzaGlwbWVudEZvcm0uc2VudFwiIGxpZ2h0Pjwvdi1jaGVja2JveD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICBAY2xpY2s9XCJzaG93UmVjZWl2ZWRNb2RhbFwiXG4gICAgICAgICAgICBsYWJlbD1cIkRhdGUgUmVjZWl2ZWRcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInNoaXBtZW50Rm9ybS5kYXRlX3JlY2VpdmVkXCJcbiAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImV2ZW50XCJcbiAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cIkRhdGUgUmVjZWl2ZWRcIlxuICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ0RhdGUgUmVjZWl2ZWQnKVwiXG4gICAgICAgICAgICBsaWdodFxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgICAgPHYtZGlhbG9nXG4gICAgICAgICAgICBwZXJzaXN0ZW50XG4gICAgICAgICAgICB2LW1vZGVsPVwibW9kYWwyXCJcbiAgICAgICAgICAgIGxhenlcbiAgICAgICAgICAgIGZ1bGwtd2lkdGhcbiAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8di1kYXRlLXBpY2tlciB2LW1vZGVsPVwic2hpcG1lbnRGb3JtLmRhdGVfcmVjZWl2ZWRcIiBzY3JvbGxhYmxlIGFjdGlvbnMgbGlnaHQ+XG4gICAgICAgICAgICA8dGVtcGxhdGUgc2NvcGU9XCJ7IHNhdmUsIGNhbmNlbCB9XCI+XG4gICAgICAgICAgICAgICAgPHYtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICAgICAgICAgIDx2LWJ0biBmbGF0IGNvbG9yPVwicHJpbWFyeVwiIEBjbGljaz1cImNhbmNlbFwiPkNhbmNlbDwvdi1idG4+XG4gICAgICAgICAgICAgICAgPHYtYnRuIGZsYXQgY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrPVwic2F2ZVwiPk9LPC92LWJ0bj5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvdi1kYXRlLXBpY2tlcj5cbiAgICAgICAgICAgIDwvdi1kaWFsb2c+XG4gICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtY2hlY2tib3ggOmRpc2FibGVkPVwiIWNhbignZWRpdF9vcmRlcicpIHx8ICFoYXNSb2xlKCdhZG1pbicpXCIgdi1iaW5kOmxhYmVsPVwiYFJlY2VpdmVkYFwiIHYtbW9kZWw9XCJzaGlwbWVudEZvcm0ucmVjZWl2ZWRcIiBsaWdodD48L3YtY2hlY2tib3g+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWJ0biBsaWdodCBjb2xvcj1cInByaW1hcnlcIiA6bG9hZGluZz1cInNoaXBtZW50Rm9ybS5idXN5XCIgOmRpc2FibGVkPVwiZXJyb3JzLmFueSgpXCIgIEBjbGljay5uYXRpdmU9XCJzdWJtaXQoKVwiIDpjbGFzcz1cIntwcmltYXJ5OiAhc2hpcG1lbnRGb3JtLmJ1c3ksIGVycm9yOiBzaGlwbWVudEZvcm0uYnVzeX1cIiBjbGFzcz1cIndoaXRlLS10ZXh0XCI+VXBkYXRlPC92LWJ0bj5cbjwvdi1jb250YWluZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFjbCBmcm9tICcuLi8uLi9taXhpbnMvYWNsJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWl4aW5zOiBbQWNsXSxcbiAgICBwcm9wczogWyd0YWInLCAnb3JkZXInXSxcbiAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICBtb2RhbDE6IGZhbHNlLFxuICAgICAgICBtb2RhbDI6IGZhbHNlLFxuICAgICAgICBzaGlwbWVudEZvcm06IG5ldyBBcHBGb3JtKEFwcC5mb3Jtcy5zaGlwbWVudEZvcm0pXG4gICAgfSksXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgdGFiIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zaGlwbWVudEZvcm0uaWQgPSBuZXdWYWx1ZS5pZFxuICAgICAgICAgICAgdGhpcy5zaGlwbWVudEZvcm0uY291cmllciA9IG5ld1ZhbHVlLmNvdXJpZXJcbiAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRGb3JtLnNoaXBwaW5nX2ZlZSA9IG5ld1ZhbHVlLnNoaXBwaW5nX2ZlZVxuICAgICAgICAgICAgdGhpcy5zaGlwbWVudEZvcm0uY3VycmVuY3kgPSBuZXdWYWx1ZS5jdXJyZW5jeVxuICAgICAgICAgICAgdGhpcy5zaGlwbWVudEZvcm0udHJhY2tpbmdfbm8gPSBuZXdWYWx1ZS50cmFja2luZ19ub1xuICAgICAgICAgICAgdGhpcy5zaGlwbWVudEZvcm0uc2VudCA9IG5ld1ZhbHVlLnNlbnRcbiAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRGb3JtLmRhdGVfc2VudCA9IG5ld1ZhbHVlLmRhdGVfc2VudCA/IG1vbWVudChuZXdWYWx1ZS5kYXRlX3NlbnQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpIDogbnVsbFxuICAgICAgICAgICAgdGhpcy5zaGlwbWVudEZvcm0ucmVjZWl2ZWQgPSBuZXdWYWx1ZS5yZWNlaXZlZFxuICAgICAgICAgICAgdGhpcy5zaGlwbWVudEZvcm0uZGF0ZV9yZWNlaXZlZCA9IG5ld1ZhbHVlLmRhdGVfcmVjZWl2ZWQgPyBtb21lbnQobmV3VmFsdWUuZGF0ZV9yZWNlaXZlZCkuZm9ybWF0KCdZWVlZLU1NLUREJykgOiBudWxsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgc2hvd1NlbnRNb2RhbCAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNSb2xlKCdhZG1pbicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbDEgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dSZWNlaXZlZE1vZGFsICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbignZWRpdF9vcmRlcicpIHwgdGhpcy5oYXNSb2xlKCdhZG1pbicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbDIgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRvUHJvcGVyQ2FzZSAoa2V5KSB7XG4gICAgICAgICAgICBsZXQgbmV3U3RyID0ga2V5LnJlcGxhY2UoL18vZywgJyAnKVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0ci5yZXBsYWNlKC9cXHdcXFMqL2csIGZ1bmN0aW9uICh0eHQpIHsgcmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKSB9KVxuICAgICAgICB9LFxuICAgICAgICBzdWJtaXQgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLnNoaXBtZW50Rm9ybS5idXN5ID0gdHJ1ZVxuICAgICAgICAgICAgQXBwLnBvc3Qocm91dGUoJ2FwaS5vcmRlcnMuc2hpcG1lbnRfZGV0YWlscycsIHtvcmRlcjogc2VsZi5vcmRlci5pZH0pLCBzZWxmLnNoaXBtZW50Rm9ybSkudGhlbigoe21lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5zaGlwbWVudEZvcm0uYnVzeSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgLy8gZWRpdCB0aGUgYXJyYXkgb2Ygb3JkZXJzIGJ5IHBhc3NpbmcgdGhlIHdob2xlIG9iamVjdCBvZiBlYWNoIG9yZGVyXG4gICAgICAgICAgICAgICAgc2VsZi5vcmRlci5zaGlwbWVudC50cmFja2luZ19ubyA9IHNlbGYuc2hpcG1lbnRGb3JtLnRyYWNraW5nX25vXG4gICAgICAgICAgICAgICAgc2VsZi5vcmRlci5zaGlwbWVudC5zZW50ID0gc2VsZi5zaGlwbWVudEZvcm0uc2VudFxuICAgICAgICAgICAgICAgIHNlbGYub3JkZXIuc2hpcG1lbnQuZGF0ZV9zZW50ID0gc2VsZi5zaGlwbWVudEZvcm0uZGF0ZV9zZW50XG4gICAgICAgICAgICAgICAgc2VsZi5vcmRlci5zaGlwbWVudC5yZWNlaXZlZCA9IHNlbGYuc2hpcG1lbnRGb3JtLnJlY2VpdmVkXG4gICAgICAgICAgICAgICAgc2VsZi5vcmRlci5zaGlwbWVudC5kYXRlX3JlY2VpdmVkID0gc2VsZi5zaGlwbWVudEZvcm0uZGF0ZV9yZWNlaXZlZFxuICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyM0ZGI2YWMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgfSkuY2F0Y2goKHtlcnJvcnMsIG1lc3NhZ2V9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcnMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZtLiRwb3B1cCh7IG1lc3NhZ2U6IG1lc3NhZ2UsIGJhY2tncm91bmRDb2xvcjogJyNlNTczNzMnLCBkZWxheTogNSwgY29sb3I6ICcjZmZmZmZhJyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnNoaXBtZW50Rm9ybS5idXN5ID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBTaGlwbWVudERldGFpbHMudnVlPzIxYTlhNjUyIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtY29udGFpbmVyXCIsXG4gICAgeyBhdHRyczogeyBmbHVpZDogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX3ZtLnNoaXBtZW50Rm9ybS5jb3VyaWVyXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcInN1YmhlYWRlciBwcmltYXJ5LS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiRGVsaXZlcnkgTWV0aG9kOlwiKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uc2hpcG1lbnRGb3JtLmNvdXJpZXJcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTW9kZSBPZiBQYXltZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNoaXBtZW50Rm9ybS5jb3VyaWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNoaXBtZW50Rm9ybS5jb3VyaWVyLm5hbWUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2hpcG1lbnRGb3JtLmNvdXJpZXIubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5zaGlwbWVudEZvcm0uY291cmllclxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIF92bS5fbChfdm0uc2hpcG1lbnRGb3JtLmNvdXJpZXIuZGV0YWlscywgZnVuY3Rpb24oXG4gICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgIGluZGV4XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICB7IGtleToga2V5LCBhdHRyczogeyByb3c6IFwiXCIsIGluZGV4OiBpbmRleCB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgeHMxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZDEyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGcxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHhsMTI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtleVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogX3ZtLnRvUHJvcGVyQ2FzZShrZXkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiLCBcInRleHQteHMtY2VudGVyXCI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJzdWJoZWFkZXIgcHJpbWFyeS0tdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFwiU2hpcG1lbnQgU3RhdHVzOlwiKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfG1heDoyNTVcIixcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcInRyYWNraW5nX25vXCIsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJUcmFja2luZyBOb1wiLFxuICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJUcmFja2luZyBOb1wiLFxuICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJUcmFja2luZyBOb1wiKSxcbiAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtdHJ1Y2tcIixcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0uaGFzUm9sZShcImFkbWluXCIpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaGlwbWVudEZvcm0udHJhY2tpbmdfbm8sXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5zaGlwbWVudEZvcm0udHJhY2tpbmdfbm8gPSAkJHZcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNoaXBtZW50Rm9ybS50cmFja2luZ19ub1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRlIFNlbnRcIixcbiAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZXZlbnRcIixcbiAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiRGF0ZSBTZW50XCIsXG4gICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIkRhdGUgU2VudFwiKSxcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IFwiXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBfdm0uc2hvd1NlbnRNb2RhbCB9LFxuICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNoaXBtZW50Rm9ybS5kYXRlX3NlbnQsXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5zaGlwbWVudEZvcm0uZGF0ZV9zZW50ID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzaGlwbWVudEZvcm0uZGF0ZV9zZW50XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZGlhbG9nXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcGVyc2lzdGVudDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGF6eTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmdWxsLXdpZHRoXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5tb2RhbDEsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ubW9kYWwxID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwibW9kYWwxXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1kYXRlLXBpY2tlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNjcm9sbGFibGU6IFwiXCIsIGFjdGlvbnM6IFwiXCIsIGxpZ2h0OiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzYXZlID0gcmVmLnNhdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbmNlbCA9IHJlZi5jYW5jZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLWFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGZsYXQ6IFwiXCIsIGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IGNhbmNlbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiQ2FuY2VsXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZmxhdDogXCJcIiwgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogc2F2ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiT0tcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNoaXBtZW50Rm9ybS5kYXRlX3NlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNoaXBtZW50Rm9ybS5kYXRlX3NlbnQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2hpcG1lbnRGb3JtLmRhdGVfc2VudFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi1jaGVja2JveFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhX3ZtLmhhc1JvbGUoXCJhZG1pblwiKSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNlbnRcIixcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaGlwbWVudEZvcm0uc2VudCxcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnNoaXBtZW50Rm9ybS5zZW50ID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzaGlwbWVudEZvcm0uc2VudFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXRlIFJlY2VpdmVkXCIsXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImV2ZW50XCIsXG4gICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcIkRhdGUgUmVjZWl2ZWRcIixcbiAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiRGF0ZSBSZWNlaXZlZFwiKSxcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IFwiXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBfdm0uc2hvd1JlY2VpdmVkTW9kYWwgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaGlwbWVudEZvcm0uZGF0ZV9yZWNlaXZlZCxcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnNoaXBtZW50Rm9ybS5kYXRlX3JlY2VpdmVkID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzaGlwbWVudEZvcm0uZGF0ZV9yZWNlaXZlZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWRpYWxvZ1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhenk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZnVsbC13aWR0aFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ubW9kYWwyLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLm1vZGFsMiA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIm1vZGFsMlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtZGF0ZS1waWNrZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzY3JvbGxhYmxlOiBcIlwiLCBhY3Rpb25zOiBcIlwiLCBsaWdodDogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZSA9IHJlZi5zYXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYW5jZWwgPSByZWYuY2FuY2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1hY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBmbGF0OiBcIlwiLCBjb2xvcjogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBjYW5jZWwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIkNhbmNlbFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGZsYXQ6IFwiXCIsIGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IHNhdmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIk9LXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaGlwbWVudEZvcm0uZGF0ZV9yZWNlaXZlZCxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2hpcG1lbnRGb3JtLmRhdGVfcmVjZWl2ZWQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2hpcG1lbnRGb3JtLmRhdGVfcmVjZWl2ZWRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtY2hlY2tib3hcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIV92bS5jYW4oXCJlZGl0X29yZGVyXCIpIHx8ICFfdm0uaGFzUm9sZShcImFkbWluXCIpLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUmVjZWl2ZWRcIixcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaGlwbWVudEZvcm0ucmVjZWl2ZWQsXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5zaGlwbWVudEZvcm0ucmVjZWl2ZWQgPSAkJHZcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNoaXBtZW50Rm9ybS5yZWNlaXZlZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1idG5cIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIndoaXRlLS10ZXh0XCIsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIHByaW1hcnk6ICFfdm0uc2hpcG1lbnRGb3JtLmJ1c3ksXG4gICAgICAgICAgICBlcnJvcjogX3ZtLnNoaXBtZW50Rm9ybS5idXN5XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgbGlnaHQ6IFwiXCIsXG4gICAgICAgICAgICBjb2xvcjogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICBsb2FkaW5nOiBfdm0uc2hpcG1lbnRGb3JtLmJ1c3ksXG4gICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmVycm9ycy5hbnkoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgX3ZtLnN1Ym1pdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl92KFwiVXBkYXRlXCIpXVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0wZmYyMzk3M1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMGZmMjM5NzNcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL1NoaXBtZW50RGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDgzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwibWFpbi1sYXlvdXRcIixcbiAgICB7IHN0eWxlOiB7IHBhZGRpbmdUb3A6IFwiMTAwcHhcIiwgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJkYXNoLXBhbmVsc1wiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICB1bnBhaWQ6IF92bS51bnBhaWQsXG4gICAgICAgICAgICAgIHBhaWQ6IF92bS5wYWlkLFxuICAgICAgICAgICAgICBzZW50OiBfdm0uc2VudCxcbiAgICAgICAgICAgICAgcmVjZWl2ZWQ6IF92bS5yZWNlaXZlZCxcbiAgICAgICAgICAgICAgdG90YWw6IF92bS50b3RhbCxcbiAgICAgICAgICAgICAgdW5zZW50OiBfdm0udW5zZW50LFxuICAgICAgICAgICAgICBkb25lOiBfdm0uZG9uZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LWRhdGEtdGFibGVcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7IGhlYWRlcnM6IF92bS5oZWFkZXJzLCBpdGVtczogX3ZtLml0ZW1zLCBsaWdodDogXCJcIiB9LFxuICAgICAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaXRlbXNcIixcbiAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInByaW1hcnlcIiwgaWNvbjogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLmV4cGFuZGVkID0gIXByb3BzLmV4cGFuZGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcInNob3BwaW5nX2Jhc2tldFwiKV0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHByb3BzLml0ZW0uaWQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcImN1cnJlbmN5XCIpKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRvdGFsQW1vdW50KHByb3BzLml0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbmN5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXN3aXRjaFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5pdGVtLnBheW1lbnQucGFpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiUGFpZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJVbnBhaWRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwidGVhbCBkYXJrZW4tNFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhX3ZtLmhhc1JvbGUoXCJhZG1pblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG9nZ2xlUGFpZChwcm9wcy5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcHJvcHMuaXRlbS5wYXltZW50LnBhaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5wYXltZW50LnBhaWQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicHJvcHMuaXRlbS5wYXltZW50LnBhaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXN3aXRjaFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5pdGVtLnNoaXBtZW50LnNlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIlNlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiT24tSG9sZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJjeWFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0uaGFzUm9sZShcImFkbWluXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b2dnbGVTZW50KHByb3BzLml0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcy5pdGVtLnNoaXBtZW50LnNlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5zaGlwbWVudC5zZW50ID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInByb3BzLml0ZW0uc2hpcG1lbnQuc2VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtc3dpdGNoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3BzLml0ZW0uc2hpcG1lbnQucmVjZWl2ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIlJlY2VpdmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlBlbmRpbmdcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwibGlnaHQtZ3JlZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG9nZ2xlUmVjZWl2ZWQocHJvcHMuaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByb3BzLml0ZW0uc2hpcG1lbnQucmVjZWl2ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5zaGlwbWVudC5yZWNlaXZlZCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwcm9wcy5pdGVtLnNoaXBtZW50LnJlY2VpdmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zd2l0Y2hcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJvcHMuaXRlbS5kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJDb21wbGV0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiT24tUHJvZ3Jlc3NcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwidGVhbCBsaWdodGVuLTJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIV92bS5oYXNSb2xlKFwiYWRtaW5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRvZ2dsZURvbmUocHJvcHMuaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByb3BzLml0ZW0uZG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLmRvbmUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicHJvcHMuaXRlbS5kb25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1jZW50ZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0uY2FuKFwiZWRpdF9vcmRlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiYWNjZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZXRDdXJyZW50T3JkZXIocHJvcHMuaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiZmEtZWRpdFwiKV0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhX3ZtLmNhbihcImRlbGV0ZV9vcmRlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZXJyb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRlbGV0ZU9yZGVyKHByb3BzLml0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLXRyYXNoXCIpXSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiZXhwYW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihwcm9wcykge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtZGF0YS10YWJsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IF92bS5nZXRJdGVtcyhwcm9wcy5pdGVtLmNhcnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGlkZS1hY3Rpb25zXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImhlYWRlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihvcmRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRoXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1sZWZ0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiUHJvZHVjdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtbGVmdFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIlF0eVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtbGVmdFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIlByaWNlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRoXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1sZWZ0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiVGF4XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRoXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1sZWZ0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiU3VidG90YWxcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaXRlbXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihvcmRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1sZWZ0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhvcmRlcnMuaXRlbS5uYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWxlZnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKG9yZGVycy5pdGVtLnF0eSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1sZWZ0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwiY3VycmVuY3lcIikoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcnMuaXRlbS5wcmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW5jeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtbGVmdFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcImN1cnJlbmN5XCIpKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdChvcmRlcnMuaXRlbS50YXgpLnRvRml4ZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVuY3lcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWxlZnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJjdXJyZW5jeVwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVycy5pdGVtLnN1YnRvdGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbmN5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwicGFnZVRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBwYWdlU3RhcnQgPSByZWYucGFnZVN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VTdG9wID0gcmVmLnBhZ2VTdG9wXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgIEZyb20gXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhwYWdlU3RhcnQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiB0byBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHBhZ2VTdG9wKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWRpYWxvZ1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW46IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IFwiZGlhbG9nLWJvdHRvbS10cmFuc2l0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5kaWFsb2csXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlhbG9nID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZGlhbG9nXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGxpZ2h0OiB0cnVlIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2xiYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sb3I6IFwiYWNjZW50XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZXJyb3ItLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGljb246IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlhbG9nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJjbG9zZVwiKV0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10b29sYmFyLXRpdGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXBkYXRlIE9yZGVyIE5vLiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5jdXJyZW50X29yZGVyLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2xiYXItaXRlbXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5mby0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGZsYXQ6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlhbG9nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJTYXZlXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtdGFic1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uYWN0aXZlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uYWN0aXZlLm5hbWUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJhY3RpdmUubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRhYnMtYmFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYWNjZW50XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0udGFicywgZnVuY3Rpb24odGFiLCBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRhYnMtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6IFwiI1wiICsgdGFiLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaXBwbGU6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyh0YWIubmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRhYnMtc2xpZGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInByaW1hcnlcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRhYnMtaXRlbXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJzLCBmdW5jdGlvbih0YWIsIGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10YWJzLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBrZXksIGF0dHJzOiB7IGlkOiB0YWIubmFtZSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBmbGF0OiBcIlwiLCBsaWdodDogdHJ1ZSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ModGFiLmNvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6IFwiY29tcG9uZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiOiB0YWIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IF92bS5jdXJyZW50X29yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1jNTIwNWU4Y1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtYzUyMDVlOGNcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvRGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0ZpbGVVcGxvYWRlci52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTBkMWNjNmVmXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0ZpbGVVcGxvYWRlci52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGNvbXBvbmVudHNcXFxcZGFzaGJvYXJkXFxcXEZpbGVVcGxvYWRlci52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIEZpbGVVcGxvYWRlci52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMGQxY2M2ZWZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0wZDFjYzZlZlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Rhc2hib2FyZC9GaWxlVXBsb2FkZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA4NDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuXG48di1jb250YWluZXIgZmx1aWQ+XG4gICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgICAgIDx2LWJ0biBjb2xvcj1cImJsdWVcIiBmbGF0PlxuICAgICAgICAgICAgPGZpbGUtdXBsb2FkXG4gICAgICAgICAgICAgICAgOnBvc3QtYWN0aW9uPVwicG9zdEFjdGlvblwiXG4gICAgICAgICAgICAgICAgOnB1dC1hY3Rpb249XCJwdXRBY3Rpb25cIlxuICAgICAgICAgICAgICAgIDpleHRlbnNpb25zPVwiZXh0ZW5zaW9uc1wiXG4gICAgICAgICAgICAgICAgOmFjY2VwdD1cImFjY2VwdFwiXG4gICAgICAgICAgICAgICAgOm11bHRpcGxlPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgICAgIDpkaXJlY3Rvcnk9XCJkaXJlY3RvcnlcIlxuICAgICAgICAgICAgICAgIDpzaXplPVwic2l6ZSB8fCAwXCJcbiAgICAgICAgICAgICAgICA6dGhyZWFkPVwidGhyZWFkIDwgMSA/IDEgOiAodGhyZWFkID4gNSA/IDUgOiB0aHJlYWQpXCJcbiAgICAgICAgICAgICAgICA6aGVhZGVycz1cImhlYWRlcnNcIlxuICAgICAgICAgICAgICAgIDpkYXRhPVwiZGF0YVwiXG4gICAgICAgICAgICAgICAgOmRyb3A9XCJkcm9wXCJcbiAgICAgICAgICAgICAgICA6ZHJvcC1kaXJlY3Rvcnk9XCJkcm9wRGlyZWN0b3J5XCJcbiAgICAgICAgICAgICAgICA6YWRkLWluZGV4PVwiYWRkSW5kZXhcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJmaWxlc1wiXG4gICAgICAgICAgICAgICAgQGlucHV0LWZpbHRlcj1cImlucHV0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICBAaW5wdXQtZmlsZT1cImlucHV0RmlsZVwiXG4gICAgICAgICAgICAgICAgcmVmPVwidXBsb2FkXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImN1cnNvcjpwb2ludGVyO21hcmdpbjoxMHB4O1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIENob29zZSBGaWxlc1xuICAgICAgICAgICAgICAgIDwvZmlsZS11cGxvYWQ+XG4gICAgICAgIDwvdi1idG4+XG4gICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJhbWJlciBsaWdodGVuLTJcIiBAY2xpY2submF0aXZlPVwiaXNPcHRpb24gPSAhaXNPcHRpb25cIj5cbiAgICAgICAgICAgIDx2LWljb24+ZmEtY29nPC92LWljb24+XG4gICAgICAgIDwvdi1idG4+XG4gICAgPC92LWxheW91dD5cbiAgICA8di1sYXlvdXQgcm93IHdyYXAgdi1pZj1cIiFpc09wdGlvblwiPlxuICAgICAgICA8di1kYXRhLXRhYmxlXG4gICAgICAgICAgICAgICAgOmhlYWRlcnM9XCJ0aFwiXG4gICAgICAgICAgICAgICAgOml0ZW1zPVwiZmlsZXNcIlxuICAgICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgICAgIG5vLWRhdGEtdGV4dD1cIkNsaWNrIGBDaG9vc2UgRmlsZXNgIEJ1dHRvbiBUbyBVcGxvYWQgRmlsZXMuXCJcbiAgICAgICAgICAgICAgICA6cm93cy1wZXItcGFnZS1pdGVtcz1cInBlclBhZ2VEYXRhXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwiaXRlbXNcIiBzY29wZT1cInByb3BzXCI+XG5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHYtaWY9XCJwcm9wcy5pdGVtLnRodW1iXCIgOnNyYz1cInByb3BzLml0ZW0udGh1bWJcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiYXV0b1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtZWxzZT5ObyBJbWFnZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWVkaXQtZGlhbG9nXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgIGxhenlcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaW1hcnktLXRleHRcIj57eyBwcm9wcy5pdGVtLm5hbWUgfCB0cnVuY2F0ZSgyMCkgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc2xvdD1cImlucHV0XCIgY2xhc3M9XCJtdC0zIHRleHQteHMtY2VudGVyIHRpdGxlIHByaW1hcnktLXRleHRcIj5VcGRhdGUgTmFtZTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICAgICAgc2xvdD1cImlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJFZGl0XCJcbiAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLml0ZW0ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZS1saW5lXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgICAgICAgIDpydWxlcz1cIlttYXhJbnB1dF1cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvdi10ZXh0LWZpZWxkPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvdi1lZGl0LWRpYWxvZz5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+e3sgcHJvcHMuaXRlbS5zaXplIHwgZm9ybWF0U2l6ZSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtcHJvZ3Jlc3MtY2lyY3VsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpzaXplPVwiNDVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOndpZHRoPVwiNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6cm90YXRlPVwiMzYwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDp2YWx1ZT1cInByb2dyZXNzKHByb3BzLml0ZW0ucHJvZ3Jlc3MpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwidGVhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwicHJvcHMuaXRlbS5hY3RpdmUgfHwgcHJvcHMuaXRlbS5wcm9ncmVzcyAhPT0gJzAuMDAnXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhcHRpb25cIj57eyBwcm9ncmVzcyhwcm9wcy5pdGVtLnByb2dyZXNzKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LXByb2dyZXNzLWNpcmN1bGFyPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPCEtLSBzdGF0dXMgLS0+XG4gICAgICAgICAgICAgICAgPHRkIHYtaWY9XCJwcm9wcy5pdGVtLmVycm9yXCIgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPnt7cHJvcHMuaXRlbS5lcnJvcn19PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgdi1lbHNlLWlmPVwicHJvcHMuaXRlbS5zdWNjZXNzXCIgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPnN1Y2Nlc3M8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCB2LWVsc2UtaWY9XCJwcm9wcy5pdGVtLmFjdGl2ZVwiIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj5hY3RpdmU8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCB2LWVsc2UgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPjwvdGQ+XG5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWNlbnRlciBwcmltYXJ5LS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJyZWQgZGFya2VuLTRcIiB2LWlmPVwicHJvcHMuaXRlbS5hY3RpdmVcIiBAY2xpY2submF0aXZlPVwicHJvcHMuaXRlbS5hY3RpdmUgPyAkcmVmcy51cGxvYWQudXBkYXRlKHByb3BzLml0ZW0sIHtlcnJvcjogJ2NhbmNlbCd9KSA6IGZhbHNlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+ZmEtdGltZXM8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGZsYXQgaWNvbiBjb2xvcj1cImluZm9cIiB2LWVsc2UtaWY9XCJwcm9wcy5pdGVtLmVycm9yICYmIHByb3BzLml0ZW0uZXJyb3IgIT09ICdjb21wcmVzc2luZycgJiYgJHJlZnMudXBsb2FkLmZlYXR1cmVzLmh0bWw1XCIgQGNsaWNrLm5hdGl2ZT1cIiRyZWZzLnVwbG9hZC51cGRhdGUocHJvcHMuaXRlbSwge2FjdGl2ZTogdHJ1ZSwgZXJyb3I6ICcnLCBwcm9ncmVzczogJzAuMDAnfSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5mYS1yZWZyZXNoPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJibHVlXCIgdi1lbHNlIEBjbGljay5uYXRpdmU9XCJwcm9wcy5pdGVtLnN1Y2Nlc3MgfHwgcHJvcHMuaXRlbS5lcnJvciA9PT0gJ2NvbXByZXNzaW5nJyA/IGZhbHNlIDogJHJlZnMudXBsb2FkLnVwZGF0ZShwcm9wcy5pdGVtLCB7YWN0aXZlOiB0cnVlfSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5mYS11cGxvYWQ8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGZsYXQgaWNvbiBjb2xvcj1cInJlZCBsaWdodGVuLTJcIiBAY2xpY2submF0aXZlPVwicmVtb3ZlKHByb3BzLml0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+ZmEtdHJhc2g8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPC92LWRhdGEtdGFibGU+XG5cbiAgICA8L3YtbGF5b3V0PlxuICAgIDx2LWxheW91dCByb3cgd3JhcCB2LWlmPVwiIWlzT3B0aW9uXCI+XG4gICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICA8di1idG4gY29sb3I9XCJ0ZWFsIGxpZ2h0ZW4tMlwiIHYtc2hvdz1cImZpbGVzLmxlbmd0aCA+IDBcIiBAY2xpY2submF0aXZlPVwiJHJlZnMudXBsb2FkLmFjdGl2ZSA9IHRydWVcIj5TdGFydCBVcGxvYWQgPHYtaWNvbiByaWdodD5wbGF5X2Fycm93PC92LWljb24+PC92LWJ0bj5cbiAgICAgICAgPHYtYnRuIGNvbG9yPVwiZXJyb3JcIiB2LXNob3c9XCIkcmVmcy51cGxvYWQgJiYgJHJlZnMudXBsb2FkLmFjdGl2ZVwiIEBjbGljay5uYXRpdmU9XCIkcmVmcy51cGxvYWQuYWN0aXZlID0gZmFsc2VcIj5TdG9wIFVwbG9hZCA8di1pY29uIHJpZ2h0PnN0b3A8L3YtaWNvbj48L3YtYnRuPlxuICAgICAgICA8di1idG4gY29sb3I9XCJyZWQgbGlnaHRlbi0yXCIgdi1pZj1cIiRyZWZzLnVwbG9hZCAmJiAhJHJlZnMudXBsb2FkLmFjdGl2ZSAmJiBmaWxlcy5sZW5ndGggPiAwXCIgQGNsaWNrLm5hdGl2ZT1cImZpbGVzID0gW11cIj5SZW1vdmUgQWxsIEZpbGVzIDx2LWljb24gcmlnaHQ+ZmEtdGltZXM8L3YtaWNvbj48L3YtYnRuPlxuICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICA8L3YtbGF5b3V0PlxuICAgIDx2LWxheW91dCByb3cgd3JhcCB2LWlmPVwiaXNPcHRpb25cIj5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwiZmEtZmlsZS1jb2RlLW8gXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIkFjY2VwdFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImFjY2VwdFwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBoaW50PVwiQWxsb3cgdXBsb2FkIG1pbWUgdHlwZVwiXG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdtaW1lLXR5cGUnKVwiXG4gICAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwibWltZS10eXBlXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cImZhLWNvZ3NcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiRXh0ZW5zaW9uc1wiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImV4dGVuc2lvbnNcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgaGludD1cIkFsbG93IHVwbG9hZCBmaWxlIGV4dGVuc2lvblwiXG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdleHRlbnNpb24nKVwiXG4gICAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiZXh0ZW5zaW9uXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cImh0dHBcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiUHV0IFVybFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInB1dEFjdGlvblwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBoaW50PVwiRGlzYWJsZWQgaWYgRW1wdHksIEFmdGVyIHRoZSBzaHV0ZG93biwgdXNlIHRoZSBQT1NUIG1ldGhvZCB0byB1cGxvYWRcIlxuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQtaGludFxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwiaHR0cFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJQb3N0IFVybFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInBvc3RBY3Rpb25cIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgaGludD1cIkRlZmF1bHQgUG9zdCBVUkxcIlxuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQtaGludFxuICAgICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgncG9zdC11cmwnKVwiXG4gICAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwicG9zdC11cmxcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwiZmEtY3ViZXNcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiVGhyZWFkXCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwidGhyZWFkXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGhpbnQ9XCJBbHNvIHVwbG9hZCB0aGUgbnVtYmVyIG9mIGZpbGVzIGF0IHRoZSBzYW1lIHRpbWUgKG51bWJlciBvZiB0aHJlYWRzKVwiXG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxudW1lcmljfG1pbl92YWx1ZToxJ1wiXG4gICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ3RocmVhZCcpXCJcbiAgICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJ0aHJlYWRcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwidHJlbmRpbmdfdXBcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiTWF4IHNpemVcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWwubnVtYmVyPVwic2l6ZVwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBoaW50PVwiU2l6ZSBVbml0IGluIGJ5dGVcIlxuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQtaGludFxuICAgICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnbWF4LXNpemUnKVwiXG4gICAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwibWF4LXNpemVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwidHJlbmRpbmdfZG93blwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJNaW4gc2l6ZVwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbC5udW1iZXI9XCJtaW5TaXplXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGhpbnQ9XCJTaXplIFVuaXQgaW4gYnl0ZVwiXG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdtaW4tc2l6ZScpXCJcbiAgICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJtaW4tc2l6ZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJmYS1jb21wcmVzc1wiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJBdXRvbWF0aWNhbGx5IGNvbXByZXNzXCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsLm51bWJlcj1cImF1dG9Db21wcmVzc1wiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2F1dG8tY29tcHJlc3MnKVwiXG4gICAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiYXV0by1jb21wcmVzc1wiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImdyZXktLXRleHQgY2FwdGlvblwiIHYtaWY9XCJhdXRvQ29tcHJlc3MgPiAwXCI+TW9yZSB0aGFuIHt7YXV0b0NvbXByZXNzIHwgZm9ybWF0U2l6ZX19IGZpbGVzIGFyZSBhdXRvbWF0aWNhbGx5IGNvbXByZXNzZWQ8L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImdyZXktLXRleHQgY2FwdGlvblwiIHYtZWxzZT5TZXQgdXAgYXV0b21hdGljIGNvbXByZXNzaW9uPC9wPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtY2hlY2tib3ggdi1iaW5kOmxhYmVsPVwiYERyYWcgYW5kIGRyb3AgdXBsb2FkOiAke2Ryb3AudG9TdHJpbmcoKX1gXCIgdi1tb2RlbD1cImRyb3BcIiBsaWdodD48L3YtY2hlY2tib3g+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di1jaGVja2JveCB2LWJpbmQ6bGFiZWw9XCJgTm90IGNoZWNrZWQsIGZpbHRlciB0aGUgZHJhZ2dlZCBmb2xkZXI6ICR7ZHJvcERpcmVjdG9yeS50b1N0cmluZygpfWBcIiB2LW1vZGVsPVwiZHJvcERpcmVjdG9yeVwiIGxpZ2h0Pjwvdi1jaGVja2JveD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LWNoZWNrYm94IHYtYmluZDpsYWJlbD1cImBBdXRvbWF0aWNhbGx5IGFjdGl2YXRlIHVwbG9hZDogJHt1cGxvYWRBdXRvLnRvU3RyaW5nKCl9YFwiIHYtbW9kZWw9XCJ1cGxvYWRBdXRvXCIgbGlnaHQ+PC92LWNoZWNrYm94PlxuICAgICAgICA8L3YtZmxleD5cbiAgICA8L3YtbGF5b3V0PlxuPC92LWNvbnRhaW5lcj5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBJbWFnZUNvbXByZXNzb3IgZnJvbSAnQHhrZXNoaS9pbWFnZS1jb21wcmVzc29yJ1xuaW1wb3J0IEZpbGVVcGxvYWQgZnJvbSAndnVlLXVwbG9hZC1jb21wb25lbnQnXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFsndGFiJywgJ29yZGVyJ10sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBGaWxlVXBsb2FkXG4gICAgfSxcbiAgICBtb3VudGVkICgpIHtcbiAgICAgICAgdGhpcy5wcmVwYXJlVGFiKClcbiAgICB9LFxuICAgIGRhdGEgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGg6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdUaHVtYicsIHZhbHVlOiAndGh1bWInLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ05hbWUnLCB2YWx1ZTogJ25hbWUnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1NpemUnLCB2YWx1ZTogJ3NpemUnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1Byb2dyZXNzJywgdmFsdWU6ICdwcm9ncmVzcycsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnU3RhdHVzJywgdmFsdWU6ICdzcGVlZCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnQWN0aW9ucycsIGFsaWduOiAnY2VudGVyJywgc29ydGFibGU6IGZhbHNlIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBmaWxlczogW10sXG4gICAgICAgICAgICAvKiBmaWxlIGNvbmZpZyAqL1xuICAgICAgICAgICAgYWNjZXB0OiAnaW1hZ2UvcG5nLGltYWdlL2dpZixpbWFnZS9qcGVnLGltYWdlL3dlYnAnLFxuICAgICAgICAgICAgZXh0ZW5zaW9uczogJ2dpZixqcGcsanBlZyxwbmcsd2VicCcsXG4gICAgICAgICAgICBtaW5TaXplOiAxMDI0LFxuICAgICAgICAgICAgc2l6ZTogMTAyNCAqIDEwMjQgKiAxMCxcbiAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiBmYWxzZSxcbiAgICAgICAgICAgIGRyb3A6IHRydWUsXG4gICAgICAgICAgICBkcm9wRGlyZWN0b3J5OiB0cnVlLFxuICAgICAgICAgICAgYWRkSW5kZXg6IGZhbHNlLFxuICAgICAgICAgICAgdGhyZWFkOiAzLFxuICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgcG9zdEFjdGlvbjogJy91cGxvYWRzL3Bvc3QnLFxuICAgICAgICAgICAgcHV0QWN0aW9uOiAnL3VwbG9hZHMvcHV0JyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnWC1Dc3JmLVRva2VuJzogQXBwLmNzcmZUb2tlbixcbiAgICAgICAgICAgICAgICAvKiBhZGRlZCBhY2Nlc3MgdG9rZW4gKi9cbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICdfY3NyZl90b2tlbic6IEFwcC5jc3JmVG9rZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvQ29tcHJlc3M6IDEwMjQgKiAxMDI0LFxuICAgICAgICAgICAgdXBsb2FkQXV0bzogZmFsc2UsXG4gICAgICAgICAgICAvKiBmaWxlIG9wdGlvbiAqL1xuICAgICAgICAgICAgaXNPcHRpb246IGZhbHNlLFxuICAgICAgICAgICAgLyogZmlsZSBuYW1lIHZhbGlkYXRpb24gKi9cbiAgICAgICAgICAgIG1heElucHV0OiAodikgPT4gdi5sZW5ndGggPD0gMzAgfHwgJ0lucHV0IHRvbyBsb25nIScsXG4gICAgICAgICAgICAvKiBmaWxlIHBlciBwYWdlICovXG4gICAgICAgICAgICBwZXJQYWdlRGF0YTogWzEwLCAyNSwgNTAsIHsgdGV4dDogJ0FsbCcsIHZhbHVlOiAtMSB9XVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHByZXBhcmVUYWIgKCkge1xuICAgICAgICAgICAgdGhpcy5wb3N0QWN0aW9uID0gdGhpcy50YWIucG9zdFVybCA/IHRoaXMudGFiLnBvc3RVcmwgOiAnIC91cGxvYWRzL3Bvc3QnXG4gICAgICAgICAgICB0aGlzLnB1dEFjdGlvbiA9IHRoaXMudGFiLnB1dFVybCA/IHRoaXMudGFiLnB1dFVybCA6IG51bGxcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMudGFiLnJlcXVlc3RLZXkgPyB0aGlzLnRhYi5yZXF1ZXN0S2V5IDogJ2ZpbGUnXG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlID0gISF0aGlzLnRhYi5tdWx0aXBsZVxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7dGhpcy4kY29va2llLmdldCgnYWNjZXNzX3Rva2VuJyl9YFxuICAgICAgICB9LFxuICAgICAgICBwcm9ncmVzcyAocHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHByb3BzKVxuICAgICAgICB9LFxuICAgICAgICByZW1vdmUgKGZpbGUpIHtcbiAgICAgICAgICAgIHRoaXMuJHJlZnMudXBsb2FkLnJlbW92ZShmaWxlKVxuICAgICAgICB9LFxuICAgICAgICBpbnB1dEZpbHRlciAobmV3RmlsZSwgb2xkRmlsZSwgcHJldmVudCkge1xuICAgICAgICAgICAgaWYgKG5ld0ZpbGUgJiYgIW9sZEZpbGUpIHtcbiAgICAgICAgICAgICAgICAvLyBCZWZvcmUgYWRkaW5nIGEgZmlsZVxuICAgICAgICAgICAgICAgIC8vIOa3u+WKoOaWh+S7tuWJjVxuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIHN5c3RlbSBmaWxlcyBvciBoaWRlIGZpbGVzXG4gICAgICAgICAgICAgICAgLy8g6L+H5ruk57O757uf5paH5Lu2IOWSjOmakOiXj+aWh+S7tlxuICAgICAgICAgICAgICAgIGlmICgvKFxcL3xeKShUaHVtYnNcXC5kYnxkZXNrdG9wXFwuaW5pfFxcLi4rKSQvLnRlc3QobmV3RmlsZS5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldmVudCgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIHBocCBodG1sIGpzIGZpbGVcbiAgICAgICAgICAgICAgICAvLyDov4fmu6QgcGhwIGh0bWwganMg5paH5Lu2XG4gICAgICAgICAgICAgICAgaWYgKC9cXC4ocGhwNT98aHRtbD98anN4PykkL2kudGVzdChuZXdGaWxlLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ZW50KClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBdXRvbWF0aWMgY29tcHJlc3Npb25cbiAgICAgICAgICAgICAgICAvLyDoh6rliqjljovnvKlcbiAgICAgICAgICAgICAgICBpZiAobmV3RmlsZS5maWxlICYmIG5ld0ZpbGUudHlwZS5zdWJzdHIoMCwgNikgPT09ICdpbWFnZS8nICYmIHRoaXMuYXV0b0NvbXByZXNzID4gMCAmJiB0aGlzLmF1dG9Db21wcmVzcyA8IG5ld0ZpbGUuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdGaWxlLmVycm9yID0gJ2NvbXByZXNzaW5nJ1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZUNvbXByZXNzb3IgPSBuZXcgSW1hZ2VDb21wcmVzc29yKG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRTaXplOiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiA1MTIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IDUxMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBpbWFnZUNvbXByZXNzb3IuY29tcHJlc3MobmV3RmlsZS5maWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZC51cGRhdGUobmV3RmlsZSwgeyBlcnJvcjogJycsIGZpbGUsIHNpemU6IGZpbGUuc2l6ZSwgdHlwZTogZmlsZS50eXBlIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZC51cGRhdGUobmV3RmlsZSwgeyBlcnJvcjogZXJyLm1lc3NhZ2UgfHwgJ2NvbXByZXNzJyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdGaWxlICYmICghb2xkRmlsZSB8fCBuZXdGaWxlLmZpbGUgIT09IG9sZEZpbGUuZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBibG9iIGZpZWxkXG4gICAgICAgICAgICAgICAgLy8g5Yib5bu6IGJsb2Ig5a2X5q61XG4gICAgICAgICAgICAgICAgbmV3RmlsZS5ibG9iID0gJydcbiAgICAgICAgICAgICAgICBsZXQgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMXG4gICAgICAgICAgICAgICAgaWYgKFVSTCAmJiBVUkwuY3JlYXRlT2JqZWN0VVJMKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbGUuYmxvYiA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3RmlsZS5maWxlKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFRodW1ibmFpbHNcbiAgICAgICAgICAgICAgICAvLyDnvKnnlaXlm75cbiAgICAgICAgICAgICAgICBuZXdGaWxlLnRodW1iID0gJydcbiAgICAgICAgICAgICAgICBpZiAobmV3RmlsZS5ibG9iICYmIG5ld0ZpbGUudHlwZS5zdWJzdHIoMCwgNikgPT09ICdpbWFnZS8nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbGUudGh1bWIgPSBuZXdGaWxlLmJsb2JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gYWRkLCB1cGRhdGUsIHJlbW92ZSBGaWxlIEV2ZW50XG4gICAgICAgIGlucHV0RmlsZSAobmV3RmlsZSwgb2xkRmlsZSkge1xuICAgICAgICAgICAgaWYgKG5ld0ZpbGUgJiYgb2xkRmlsZSkge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZVxuXG4gICAgICAgICAgICAgICAgaWYgKG5ld0ZpbGUuYWN0aXZlICYmICFvbGRGaWxlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBiZWZvcmVTZW5kXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWluIHNpemVcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0ZpbGUuc2l6ZSA+PSAwICYmIHRoaXMubWluU2l6ZSA+IDAgJiYgbmV3RmlsZS5zaXplIDwgdGhpcy5taW5TaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZC51cGRhdGUobmV3RmlsZSwgeyBlcnJvcjogJ3NpemUnIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3RmlsZS5wcm9ncmVzcyAhPT0gb2xkRmlsZS5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBwcm9ncmVzc1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXdGaWxlLmVycm9yICYmICFvbGRGaWxlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5ld0ZpbGUuc3VjY2VzcyAmJiAhb2xkRmlsZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbmV3RmlsZSAmJiBvbGRGaWxlKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlXG4gICAgICAgICAgICAgICAgaWYgKG9sZEZpbGUuc3VjY2VzcyAmJiBvbGRGaWxlLnJlc3BvbnNlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgdHlwZTogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgdXJsOiAnL3VwbG9hZC9kZWxldGU/aWQ9JyArIG9sZEZpbGUucmVzcG9uc2UuaWQsXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IGFjdGl2YXRlIHVwbG9hZFxuICAgICAgICAgICAgaWYgKEJvb2xlYW4obmV3RmlsZSkgIT09IEJvb2xlYW4ob2xkRmlsZSkgfHwgb2xkRmlsZS5lcnJvciAhPT0gbmV3RmlsZS5lcnJvcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVwbG9hZEF1dG8gJiYgIXRoaXMuJHJlZnMudXBsb2FkLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZC5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gRmlsZVVwbG9hZGVyLnZ1ZT8xZmM5ZWQwZiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sb3I6IFwiYmx1ZVwiLCBmbGF0OiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJmaWxlLXVwbG9hZFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHJlZjogXCJ1cGxvYWRcIixcbiAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGN1cnNvcjogXCJwb2ludGVyXCIsIG1hcmdpbjogXCIxMHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwicG9zdC1hY3Rpb25cIjogX3ZtLnBvc3RBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIFwicHV0LWFjdGlvblwiOiBfdm0ucHV0QWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBfdm0uZXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0OiBfdm0uYWNjZXB0LFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZTogX3ZtLm11bHRpcGxlLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IF92bS5kaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IF92bS5zaXplIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgIHRocmVhZDpcbiAgICAgICAgICAgICAgICAgICAgICBfdm0udGhyZWFkIDwgMSA/IDEgOiBfdm0udGhyZWFkID4gNSA/IDUgOiBfdm0udGhyZWFkLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfdm0uaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogX3ZtLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGRyb3A6IF92bS5kcm9wLFxuICAgICAgICAgICAgICAgICAgICBcImRyb3AtZGlyZWN0b3J5XCI6IF92bS5kcm9wRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICBcImFkZC1pbmRleFwiOiBfdm0uYWRkSW5kZXhcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBcImlucHV0LWZpbHRlclwiOiBfdm0uaW5wdXRGaWx0ZXIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW5wdXQtZmlsZVwiOiBfdm0uaW5wdXRGaWxlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5maWxlcyxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5maWxlcyA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZpbGVzXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgQ2hvb3NlIEZpbGVzXFxuICAgICAgICAgICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7IGZsYXQ6IFwiXCIsIGljb246IFwiXCIsIGNvbG9yOiBcImFtYmVyIGxpZ2h0ZW4tMlwiIH0sXG4gICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgX3ZtLmlzT3B0aW9uID0gIV92bS5pc09wdGlvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiZmEtY29nXCIpXSldLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAhX3ZtLmlzT3B0aW9uXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi1kYXRhLXRhYmxlXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaGVhZGVyczogX3ZtLnRoLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IF92bS5maWxlcyxcbiAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgXCJuby1kYXRhLXRleHRcIjpcbiAgICAgICAgICAgICAgICAgICAgXCJDbGljayBgQ2hvb3NlIEZpbGVzYCBCdXR0b24gVG8gVXBsb2FkIEZpbGVzLlwiLFxuICAgICAgICAgICAgICAgICAgXCJyb3dzLXBlci1wYWdlLWl0ZW1zXCI6IF92bS5wZXJQYWdlRGF0YVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJpdGVtc1wiLFxuICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLnRodW1iXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBwcm9wcy5pdGVtLnRodW1iLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCJhdXRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFwic3BhblwiLCBbX3ZtLl92KFwiTm8gSW1hZ2VcIildKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZWRpdC1kaWFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgbGFyZ2U6IFwiXCIsIGxhenk6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwidHJ1bmNhdGVcIikocHJvcHMuaXRlbS5uYW1lLCAyMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm10LTMgdGV4dC14cy1jZW50ZXIgdGl0bGUgcHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc2xvdDogXCJpbnB1dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJVcGRhdGUgTmFtZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJFZGl0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpbmdsZS1saW5lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2ZvY3VzOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXM6IFtfdm0ubWF4SW5wdXRdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcy5pdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0ubmFtZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicHJvcHMuaXRlbS5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uX2YoXCJmb3JtYXRTaXplXCIpKHByb3BzLml0ZW0uc2l6ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5hY3RpdmUgfHwgcHJvcHMuaXRlbS5wcm9ncmVzcyAhPT0gXCIwLjAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXByb2dyZXNzLWNpcmN1bGFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogNDUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGU6IDM2MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wcm9ncmVzcyhwcm9wcy5pdGVtLnByb2dyZXNzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwidGVhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJjYXB0aW9uXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnByb2dyZXNzKHByb3BzLml0ZW0ucHJvZ3Jlc3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHByb3BzLml0ZW0uZXJyb3IpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvcHMuaXRlbS5zdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcInN1Y2Nlc3NcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcm9wcy5pdGVtLmFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcImFjdGl2ZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcInRkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtY2VudGVyIHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5hY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcInJlZCBkYXJrZW4tNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF92bS4kcmVmcy51cGxvYWQudXBkYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBlcnJvcjogXCJjYW5jZWxcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJmYS10aW1lc1wiKV0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvcHMuaXRlbS5lcnJvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLmVycm9yICE9PSBcImNvbXByZXNzaW5nXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRyZWZzLnVwbG9hZC5mZWF0dXJlcy5odG1sNVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJpbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHJlZnMudXBsb2FkLnVwZGF0ZShwcm9wcy5pdGVtLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBcIjAuMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLXJlZnJlc2hcIildKV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJibHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLnN1Y2Nlc3MgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uZXJyb3IgPT09IFwiY29tcHJlc3NpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLiRyZWZzLnVwbG9hZC51cGRhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3RpdmU6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLXVwbG9hZFwiKV0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcInJlZCBsaWdodGVuLTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZW1vdmUocHJvcHMuaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLXRyYXNoXCIpXSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAhX3ZtLmlzT3B0aW9uXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZmlsZXMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZpbGVzLmxlbmd0aCA+IDBcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwidGVhbCBsaWdodGVuLTJcIiB9LFxuICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS4kcmVmcy51cGxvYWQuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCJTdGFydCBVcGxvYWQgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyByaWdodDogXCJcIiB9IH0sIFtfdm0uX3YoXCJwbGF5X2Fycm93XCIpXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS4kcmVmcy51cGxvYWQgJiYgX3ZtLiRyZWZzLnVwbG9hZC5hY3RpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIkcmVmcy51cGxvYWQgJiYgJHJlZnMudXBsb2FkLmFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJlcnJvclwiIH0sXG4gICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLiRyZWZzLnVwbG9hZC5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCJTdG9wIFVwbG9hZCBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IHJpZ2h0OiBcIlwiIH0gfSwgW192bS5fdihcInN0b3BcIildKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0uJHJlZnMudXBsb2FkICYmXG4gICAgICAgICAgICAgICFfdm0uJHJlZnMudXBsb2FkLmFjdGl2ZSAmJlxuICAgICAgICAgICAgICBfdm0uZmlsZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInJlZCBsaWdodGVuLTJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5maWxlcyA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiUmVtb3ZlIEFsbCBGaWxlcyBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyByaWdodDogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcImZhLXRpbWVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIilcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5pc09wdGlvblxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcImZhLWZpbGUtY29kZS1vIFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFjY2VwdFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIkFsbG93IHVwbG9hZCBtaW1lIHR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwibWltZS10eXBlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwibWltZS10eXBlXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmFjY2VwdCxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uYWNjZXB0ID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImFjY2VwdFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwiZmEtY29nc1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkV4dGVuc2lvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJpbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgaGludDogXCJBbGxvdyB1cGxvYWQgZmlsZSBleHRlbnNpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiZXh0ZW5zaW9uXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiZXh0ZW5zaW9uXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmV4dGVuc2lvbnMgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZXh0ZW5zaW9uc1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcImh0dHBcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQdXQgVXJsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBcIkRpc2FibGVkIGlmIEVtcHR5LCBBZnRlciB0aGUgc2h1dGRvd24sIHVzZSB0aGUgUE9TVCBtZXRob2QgdG8gdXBsb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJwZXJzaXN0ZW50LWhpbnRcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucHV0QWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5wdXRBY3Rpb24gPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicHV0QWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kLWljb25cIjogXCJodHRwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG9zdCBVcmxcIixcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJpbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgaGludDogXCJEZWZhdWx0IFBvc3QgVVJMXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJwZXJzaXN0ZW50LWhpbnRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcInBvc3QtdXJsXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwicG9zdC11cmxcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucG9zdEFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0ucG9zdEFjdGlvbiA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwb3N0QWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bnVtZXJpY3xtaW5fdmFsdWU6MVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bnVtZXJpY3xtaW5fdmFsdWU6MSdcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwiZmEtY3ViZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUaHJlYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJpbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgaGludDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQWxzbyB1cGxvYWQgdGhlIG51bWJlciBvZiBmaWxlcyBhdCB0aGUgc2FtZSB0aW1lIChudW1iZXIgb2YgdGhyZWFkcylcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwidGhyZWFkXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwidGhyZWFkXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnRocmVhZCxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0udGhyZWFkID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInRocmVhZFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwidHJlbmRpbmdfdXBcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJNYXggc2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIlNpemUgVW5pdCBpbiBieXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJwZXJzaXN0ZW50LWhpbnRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIm1heC1zaXplXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwibWF4LXNpemVcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2l6ZSA9IF92bS5fbigkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNpemVcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcInRyZW5kaW5nX2Rvd25cIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJNaW4gc2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIlNpemUgVW5pdCBpbiBieXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJwZXJzaXN0ZW50LWhpbnRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIm1pbi1zaXplXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwibWluLXNpemVcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ubWluU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0ubWluU2l6ZSA9IF92bS5fbigkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIm1pblNpemVcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcImZhLWNvbXByZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQXV0b21hdGljYWxseSBjb21wcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImF1dG8tY29tcHJlc3NcIiksXG4gICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJhdXRvLWNvbXByZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmF1dG9Db21wcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uYXV0b0NvbXByZXNzID0gX3ZtLl9uKCQkdilcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYXV0b0NvbXByZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLmF1dG9Db21wcmVzcyA+IDBcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJncmV5LS10ZXh0IGNhcHRpb25cIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiTW9yZSB0aGFuIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLl9mKFwiZm9ybWF0U2l6ZVwiKShfdm0uYXV0b0NvbXByZXNzKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIGZpbGVzIGFyZSBhdXRvbWF0aWNhbGx5IGNvbXByZXNzZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIDogX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwiZ3JleS0tdGV4dCBjYXB0aW9uXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiU2V0IHVwIGF1dG9tYXRpYyBjb21wcmVzc2lvblwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtY2hlY2tib3hcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRyYWcgYW5kIGRyb3AgdXBsb2FkOiBcIiArIF92bS5kcm9wLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmRyb3AsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRyb3AgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZHJvcFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtY2hlY2tib3hcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOlxuICAgICAgICAgICAgICAgICAgICAgICAgXCJOb3QgY2hlY2tlZCwgZmlsdGVyIHRoZSBkcmFnZ2VkIGZvbGRlcjogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRyb3BEaXJlY3RvcnkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZHJvcERpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uZHJvcERpcmVjdG9yeSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJkcm9wRGlyZWN0b3J5XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1jaGVja2JveFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6XG4gICAgICAgICAgICAgICAgICAgICAgICBcIkF1dG9tYXRpY2FsbHkgYWN0aXZhdGUgdXBsb2FkOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0udXBsb2FkQXV0by50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS51cGxvYWRBdXRvLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS51cGxvYWRBdXRvID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInVwbG9hZEF1dG9cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0wZDFjYzZlZlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMGQxY2M2ZWZcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZGFzaGJvYXJkL0ZpbGVVcGxvYWRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDg0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9