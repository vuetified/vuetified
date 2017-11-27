webpackJsonp([18],{

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

/***/ 647:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(891)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(893)
/* template */
var __vue_template__ = __webpack_require__(894)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6ba62439"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\pages\\NotFound.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] NotFound.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ba62439", Component.options)
  } else {
    hotAPI.reload("data-v-6ba62439", Component.options)
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

var listToStyles = __webpack_require__(656)

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

/***/ 656:
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

/***/ 687:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = null
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
Component.options.__file = "resources\\assets\\js\\layouts\\ModalLayout.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ModalLayout.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d721983c", Component.options)
  } else {
    hotAPI.reload("data-v-d721983c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-app", { attrs: { standalone: "" } }, [
    _c(
      "main",
      [
        _c(
          "v-container",
          {
            staticClass: "pa-0 ma-0 white",
            attrs: { transition: "slide-x-transition", fluid: "" }
          },
          [
            _c(
              "v-card",
              { attrs: { flat: true } },
              [
                _vm._t("toolbar"),
                _vm._v(" "),
                _vm._t("default"),
                _vm._v(" "),
                _vm._t("footer")
              ],
              2
            )
          ],
          1
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
     require("vue-hot-reload-api").rerender("data-v-d721983c", module.exports)
  }
}

/***/ }),

/***/ 891:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(892);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(648)("64cd1cdb", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6ba62439\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NotFound.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6ba62439\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NotFound.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 892:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(626)(undefined);
// imports


// module
exports.push([module.i, "\n.cls-1[data-v-6ba62439] {\n  fill: #ffc541;\n}\n.cls-2[data-v-6ba62439] {\n  fill: #4e4066;\n}\n.cls-3[data-v-6ba62439] {\n  fill: #6f5b92;\n}\n.cls-4[data-v-6ba62439] {\n  fill: #f78d5e;\n}\n.cls-5[data-v-6ba62439] {\n  fill: #fa976c;\n}\n.cls-6[data-v-6ba62439],\n.cls-7[data-v-6ba62439],\n.cls-8[data-v-6ba62439] {\n  fill: #b65c32;\n}\n.cls-10[data-v-6ba62439],\n.cls-6[data-v-6ba62439] {\n  opacity: 0.6;\n}\n.cls-7[data-v-6ba62439] {\n  opacity: 0.4;\n}\n.cls-9[data-v-6ba62439] {\n  fill: #f4b73b;\n}\n.cls-11[data-v-6ba62439] {\n  fill: #f9c358;\n}\n.cls-12[data-v-6ba62439] {\n  fill: #9b462c;\n}\n.cls-13[data-v-6ba62439] {\n  fill: #aa512e;\n}\n.cls-14[data-v-6ba62439] {\n  fill: #7d6aa5;\n}\n\n/* animations */\n.wheel[data-v-6ba62439] {\n  animation: wheel-rotate-data-v-6ba62439 6s ease infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n@keyframes wheel-rotate-data-v-6ba62439 {\n50% {\n    transform: rotate(360deg);\n    animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);\n}\n100% {\n    transform: rotate(960deg)\n}\n}\n.clock-hand-1[data-v-6ba62439] {\n  animation: clock-rotate-data-v-6ba62439 3s linear infinite;\n  transform-origin: bottom;\n  transform-box: fill-box;\n}\n.clock-hand-2[data-v-6ba62439] {\n  animation: clock-rotate-data-v-6ba62439 6s linear infinite;\n  transform-origin: bottom;\n  transform-box: fill-box;\n}\n@keyframes clock-rotate-data-v-6ba62439 {\n100% {\n    transform: rotate(360deg)\n}\n}\n#box-top[data-v-6ba62439] {\n  animation: box-top-anim-data-v-6ba62439 2s linear infinite;\n  transform-origin: right top;\n  transform-box: fill-box;\n}\n@keyframes box-top-anim-data-v-6ba62439 {\n50% {\n    transform: rotate(-5deg)\n}\n}\n#umbrella[data-v-6ba62439] {\n  animation: umbrella-anim-data-v-6ba62439 6s linear infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n@keyframes umbrella-anim-data-v-6ba62439 {\n25% {\n    transform: translateY(10px) rotate(5deg);\n}\n75% {\n    transform: rotate(-5deg);\n}\n}\n#cup[data-v-6ba62439] {\n  animation: cup-rotate-data-v-6ba62439 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;\n  transform-origin: top left;\n  transform-box: fill-box;\n}\n@keyframes cup-rotate-data-v-6ba62439 {\n50% {\n    transform: rotate(-5deg)\n}\n}\n#pillow[data-v-6ba62439] {\n  animation: pillow-anim-data-v-6ba62439 3s linear infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n@keyframes pillow-anim-data-v-6ba62439 {\n25% {\n    transform: rotate(10deg) translateY(5px)\n}\n75% {\n    transform: rotate(-10deg)\n}\n}\n#stripe[data-v-6ba62439] {\n  animation: stripe-anim-data-v-6ba62439 3s linear infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n@keyframes stripe-anim-data-v-6ba62439 {\n25% {\n    transform: translate(10px, 0) rotate(-10deg)\n}\n75% {\n    transform: translateX(10px)\n}\n}\n#bike[data-v-6ba62439] {\n  animation: bike-anim-data-v-6ba62439 6s ease infinite;\n}\n@keyframes bike-anim-data-v-6ba62439 {\n0% {\n    transform: translateX(-1300px)\n}\n50% {\n    transform: translateX(0);\n    animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);\n}\n100% {\n    transform: translateX(1300px)\n}\n}\n#rucksack[data-v-6ba62439] {\n  animation: ruck-anim-data-v-6ba62439 3s linear infinite;\n  transform-origin: top;\n  transform-box: fill-box;\n}\n@keyframes ruck-anim-data-v-6ba62439 {\n50% {\n    transform: rotate(5deg)\n}\n}\n.circle[data-v-6ba62439] {\n  animation: circle-anim-data-v-6ba62439 ease infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n  perspective: 0px;\n}\n.circle.c1[data-v-6ba62439] {\n  animation-duration: 2s\n}\n.circle.c2[data-v-6ba62439] {\n  animation-duration: 3s\n}\n.circle.c3[data-v-6ba62439] {\n  animation-duration: 1s\n}\n.circle.c4[data-v-6ba62439] {\n  animation-duration: 1s\n}\n.circle.c5[data-v-6ba62439] {\n  animation-duration: 2s\n}\n.circle.c6[data-v-6ba62439] {\n  animation-duration: 3s\n}\n@keyframes circle-anim-data-v-6ba62439 {\n50% {\n    transform: scale(.2) rotateX(360deg) rotateY(360deg)\n}\n}\n.four[data-v-6ba62439],\n#ou[data-v-6ba62439] {\n  animation: four-anim-data-v-6ba62439 cubic-bezier(0.39, 0.575, 0.565, 1) infinite;\n}\n.four.a[data-v-6ba62439] {\n  transform-origin: bottom left;\n  animation-duration: 3s;\n  transform-box: fill-box;\n}\n.four.b[data-v-6ba62439] {\n  transform-origin: bottom right;\n  animation-duration: 3s;\n  transform-box: fill-box;\n}\n#ou[data-v-6ba62439] {\n  animation-duration: 6s;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n@keyframes four-anim-data-v-6ba62439 {\n50% {\n    transform: scale(.98)\n}\n}\n", ""]);

// exports


/***/ }),

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_ModalLayout__ = __webpack_require__(687);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_ModalLayout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__layouts_ModalLayout__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    components: {
        ModalLayout: __WEBPACK_IMPORTED_MODULE_0__layouts_ModalLayout___default.a
    },
    mounted: function mounted() {
        // let self = this
    },

    methods: {
        redirectBack: function redirectBack() {
            var self = this;
            self.$router.go(-2);
        },
        goHome: function goHome() {
            var self = this;
            self.$router.push({ name: 'home' });
        },
        goShop: function goShop() {
            var self = this;
            self.$router.push({ name: 'product.index' });
        }
    }
});

/***/ }),

/***/ 894:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-layout",
    [
      _c(
        "v-toolbar",
        { staticClass: "accent", attrs: { slot: "toolbar" }, slot: "toolbar" },
        [
          _c(
            "v-btn",
            {
              attrs: { flat: "", icon: "", color: "primary" },
              nativeOn: {
                click: function($event) {
                  _vm.redirectBack()
                }
              }
            },
            [_c("v-icon", [_vm._v("arrow_back")])],
            1
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-toolbar-title",
            { staticClass: "text-xs-center primary--text" },
            [_vm._v("PAGE NOT FOUND")]
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
                  staticClass: "primary--text",
                  attrs: { flat: "" },
                  nativeOn: {
                    click: function($event) {
                      _vm.goHome()
                    }
                  }
                },
                [
                  _c("v-icon", { attrs: { right: "", dark: "" } }, [
                    _vm._v("home")
                  ])
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
        "v-card-text",
        { staticStyle: { "padding-top": "100px" } },
        [
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c(
                "v-layout",
                { attrs: { row: "" } },
                [
                  _c(
                    "v-flex",
                    {
                      attrs: {
                        x12: "",
                        sm12: "",
                        md4: "",
                        "offset-md4": "",
                        lg4: "",
                        "offset-lg4": "",
                        xl4: "",
                        "offset-xl4": ""
                      }
                    },
                    [
                      _c("div", { staticClass: "wrapper" }, [
                        _c(
                          "svg",
                          {
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              viewBox: "0 0 1920 1080"
                            }
                          },
                          [
                            _c("title", [_vm._v("404")]),
                            _vm._v(" "),
                            _c(
                              "g",
                              {
                                attrs: {
                                  id: "Layer_12 yellow-back-fig",
                                  "data-name": "Layer 12"
                                }
                              },
                              [
                                _c("path", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    d:
                                      "M600.87,872H156a4,4,0,0,0-3.78,4.19h0a4,4,0,0,0,3.78,4.19H600.87a4,4,0,0,0,3.78-4.19h0A4,4,0,0,0,600.87,872Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("rect", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    x: "680.91",
                                    y: "871.98",
                                    width: "513.38",
                                    height: "8.39",
                                    rx: "4.19",
                                    ry: "4.19"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    d:
                                      "M1480,876.17h0c0,2.32,2.37,4.19,5.3,4.19h350.61c2.93,0,5.3-1.88,5.3-4.19h0c0-2.32-2.37-4.19-5.3-4.19H1485.26C1482.33,872,1480,873.86,1480,876.17Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("rect", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    x: "492.21",
                                    y: "920.64",
                                    width: "249.8",
                                    height: "8.39",
                                    rx: "4.19",
                                    ry: "4.19"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    d:
                                      "M1549.14,924.84h0a4.19,4.19,0,0,0-4.19-4.19H1067.46a14.66,14.66,0,0,1,.35,3.21v1A4.19,4.19,0,0,0,1072,929h472.94A4.19,4.19,0,0,0,1549.14,924.84Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    d:
                                      "M865.5,924.84h0a4.19,4.19,0,0,0,4.19,4.19h82.37a12.28,12.28,0,0,1-.19-2v-2.17a4.19,4.19,0,0,0-4.19-4.19h-78A4.19,4.19,0,0,0,865.5,924.84Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("rect", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    x: "915.6",
                                    y: "981.47",
                                    width: "54.72",
                                    height: "8.39",
                                    rx: "4.19",
                                    ry: "4.19"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    d:
                                      "M730.33,985.67h0c0,2.32,4.23,4.19,9.44,4.19h104.3c5.22,0,9.44-1.88,9.44-4.19h0c0-2.32-4.23-4.19-9.44-4.19H739.78C734.56,981.47,730.33,983.35,730.33,985.67Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("rect", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    x: "997.06",
                                    y: "981.47",
                                    width: "78.11",
                                    height: "8.39",
                                    rx: "4.19",
                                    ry: "4.19"
                                  }
                                }),
                                _vm._v(" "),
                                _c("g", { attrs: { id: "round-conf" } }, [
                                  _c("path", {
                                    staticClass: "cls-1 circle c1",
                                    attrs: {
                                      d:
                                        "M536.41,155.14a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,536.41,155.14Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,536.41,183.81Z"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-1 circle c2",
                                    attrs: {
                                      d:
                                        "M1345.09,82.44a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,1345.09,82.44Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,1345.09,111.12Z"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-1 circle c3",
                                    attrs: {
                                      d:
                                        "M70.12,363A17.77,17.77,0,1,0,87.89,380.8,17.77,17.77,0,0,0,70.12,363Zm0,28.68A10.9,10.9,0,1,1,81,380.8,10.9,10.9,0,0,1,70.12,391.7Z"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-1 circle c4",
                                    attrs: {
                                      d:
                                        "M170.47,751.82a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,170.47,751.82Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,170.47,780.5Z"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-1 circle c5",
                                    attrs: {
                                      d:
                                        "M1457.34,762.73a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,1457.34,762.73Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,1457.34,791.4Z"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-1 circle c6",
                                    attrs: {
                                      d:
                                        "M1829.15,407.49a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,1829.15,407.49Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,1829.15,436.17Z"
                                    }
                                  })
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "g",
                              {
                                attrs: {
                                  id: "fortyfour",
                                  "data-name": "Layer 2"
                                }
                              },
                              [
                                _c("g", { staticClass: "four a" }, [
                                  _c("rect", {
                                    staticClass: "cls-2",
                                    attrs: {
                                      x: "233.74",
                                      y: "391.14",
                                      width: "120.71",
                                      height: "466.29",
                                      rx: "57.1",
                                      ry: "57.1",
                                      transform:
                                        "translate(918.39 330.19) rotate(90)"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("rect", {
                                    staticClass: "cls-3",
                                    attrs: {
                                      x: "333.83",
                                      y: "475.1",
                                      width: "120.71",
                                      height: "396.88",
                                      rx: "60.36",
                                      ry: "60.36"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("rect", {
                                    staticClass: "cls-3",
                                    attrs: {
                                      x: "197.13",
                                      y: "122.89",
                                      width: "120.71",
                                      height: "604.75",
                                      rx: "60.36",
                                      ry: "60.36",
                                      transform:
                                        "translate(290.49 -70.78) rotate(35)"
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _c("g", { staticClass: "four b" }, [
                                  _c("rect", {
                                    staticClass: "cls-2",
                                    attrs: {
                                      x: "1558.84",
                                      y: "391.91",
                                      width: "120.71",
                                      height: "466.29",
                                      rx: "57.1",
                                      ry: "57.1",
                                      transform:
                                        "translate(2244.26 -994.14) rotate(90)"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("rect", {
                                    staticClass: "cls-3",
                                    attrs: {
                                      x: "1658.92",
                                      y: "475.87",
                                      width: "120.71",
                                      height: "396.88",
                                      rx: "60.36",
                                      ry: "60.36"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("rect", {
                                    staticClass: "cls-3",
                                    attrs: {
                                      x: "1522.22",
                                      y: "123.66",
                                      width: "120.71",
                                      height: "604.75",
                                      rx: "60.36",
                                      ry: "60.36",
                                      transform:
                                        "translate(530.57 -830.68) rotate(35)"
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-3",
                                  attrs: {
                                    id: "ou",
                                    d:
                                      "M956.54,168.2c-194.34,0-351.89,157.55-351.89,351.89S762.19,872,956.54,872s351.89-157.55,351.89-351.89S1150.88,168.2,956.54,168.2Zm0,584.49c-128.46,0-232.6-104.14-232.6-232.6s104.14-232.6,232.6-232.6,232.6,104.14,232.6,232.6S1085,752.69,956.54,752.69Z"
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "g",
                              {
                                attrs: {
                                  id: "umbrella",
                                  "data-name": "Layer 3"
                                }
                              },
                              [
                                _c("g", [
                                  _c("circle", {
                                    staticClass: "cls-4",
                                    attrs: {
                                      cx: "1187.53",
                                      cy: "240.3",
                                      r: "7.66",
                                      transform:
                                        "translate(236.36 990.8) rotate(-49.71)"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("g", [
                                    _c("path", {
                                      staticClass: "cls-5",
                                      attrs: {
                                        d:
                                          "M1219.56,359.67l55,100.52c32.7-48.48-6.87-142.43-91.75-214.38-84.41-71.55-183-95.33-225.81-56l114.21,44.14Z"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("path", {
                                      staticClass: "cls-6",
                                      attrs: {
                                        d:
                                          "M1182.79,245.81c-84.41-71.55-183-95.33-225.81-56l114.21,44.14Z"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("polygon", {
                                      staticClass: "cls-7",
                                      attrs: {
                                        points:
                                          "1182.79 245.81 1071.19 233.91 1219.56 359.67 1182.79 245.81"
                                      }
                                    })
                                  ]),
                                  _vm._v(" "),
                                  _c("polygon", {
                                    staticClass: "cls-8",
                                    attrs: {
                                      points:
                                        "1180.91 409.02 1274.54 460.19 1219.56 359.67 1071.19 233.91 956.98 189.76 1021.95 274.29 1180.91 409.02"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("g", [
                                    _c("rect", {
                                      staticClass: "cls-4",
                                      attrs: {
                                        x: "997.45",
                                        y: "358.35",
                                        width: "175.58",
                                        height: "5.1",
                                        transform:
                                          "translate(108.21 955.38) rotate(-49.71)"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("rect", {
                                      staticClass: "cls-4",
                                      attrs: {
                                        x: "1028.09",
                                        y: "399.36",
                                        width: "21.46",
                                        height: "32.27",
                                        rx: "10.73",
                                        ry: "10.73",
                                        transform:
                                          "translate(515.04 -573.16) rotate(40.29)"
                                      }
                                    })
                                  ])
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "g",
                              {
                                attrs: { id: "pillow", "data-name": "Layer 4" }
                              },
                              [
                                _c("path", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    d:
                                      "M754,627.07c7,.54,12.92-2.82,13.35-7.59s-4.95-9.24-12-9.87a18.55,18.55,0,0,0-2.17,0l-74.9-81.64c0-.1,0-.19,0-.29,0-7.09-4-12.83-8.8-12.81s-8.75,5.77-8.73,12.87c0,0,0,.09,0,.13l-50.21,46.07h-.09c-7.06-.63-13.14,2.77-13.57,7.59s4.87,9.16,11.85,9.84l76.08,82.92s0,0,0,.06c0,7.09,4,12.83,8.8,12.81s8.65-5.66,8.71-12.65Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-9",
                                  attrs: {
                                    d:
                                      "M669.46,514.82c-4.77-.83-8.75,5.77-8.73,12.87,0,0,0,.09,0,.13l-50.21,46.07h-.09c-7.06-.63-13.14,2.77-13.57,7.59s4.87,9.16,11.85,9.84l76.08,82.92s0,0,0,.06c0,7.09,4,12.83,8.8,12.81s8.65-5.66,8.71-12.65C570.55,573,702.07,520.47,669.46,514.82Z"
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "g",
                              { attrs: { id: "cup", "data-name": "Layer 7" } },
                              [
                                _c("polygon", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    points:
                                      "1173.69 748.21 1140.52 715.42 1195.79 647.35 1241.13 692.16 1173.69 748.21"
                                  }
                                }),
                                _vm._v(" "),
                                _c("polygon", {
                                  staticClass: "cls-8",
                                  attrs: {
                                    points:
                                      "1173.69 748.21 1140.52 715.42 1143.93 711.27 1177.81 744.75 1173.69 748.21"
                                  }
                                }),
                                _vm._v(" "),
                                _c("polygon", {
                                  staticClass: "cls-5",
                                  attrs: {
                                    points:
                                      "1194.68 731.46 1157.04 694.24 1183.8 661.7 1226.91 704.32 1194.68 731.46"
                                  }
                                }),
                                _vm._v(" "),
                                _c("g", { staticClass: "cls-10" }, [
                                  _c("path", {
                                    staticClass: "cls-8",
                                    attrs: {
                                      d:
                                        "M1176.32,667.78h0a4.19,4.19,0,0,1,4.19,4.19v33.54a0,0,0,0,1,0,0h-8.38a0,0,0,0,1,0,0V672a4.19,4.19,0,0,1,4.19-4.19Z",
                                      transform:
                                        "translate(822.53 -628.67) rotate(44.67)"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-8",
                                    attrs: {
                                      d:
                                        "M1172.73,709.7l23.58-23.85a4.19,4.19,0,0,1,5.92,0h0a4.19,4.19,0,0,1,0,5.92l-23.58,23.85Z"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-8",
                                    attrs: {
                                      d:
                                        "M1185.11,722.09l23.58-23.85a4.19,4.19,0,0,1,5.92,0h0a4.19,4.19,0,0,1,0,5.92L1191.06,728Z"
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-5",
                                  attrs: {
                                    d:
                                      "M1197.85,660.5h45.69a5.7,5.7,0,0,1,5.7,5.7v8.32a0,0,0,0,1,0,0h-57.09a0,0,0,0,1,0,0v-8.32A5.7,5.7,0,0,1,1197.85,660.5Z",
                                    transform:
                                      "translate(829.53 -667.66) rotate(45)"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-8",
                                  attrs: {
                                    d:
                                      "M1191.49,664.74h53.94a5.25,5.25,0,0,1,5.25,5.25v4.79a0,0,0,0,1,0,0h-64.44a0,0,0,0,1,0,0V670a5.25,5.25,0,0,1,5.25-5.25Z",
                                    transform:
                                      "translate(822.83 -663.17) rotate(44.67)"
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "g",
                              {
                                attrs: { id: "clock", "data-name": "Layer 8" }
                              },
                              [
                                _c("circle", {
                                  staticClass: "cls-5",
                                  attrs: {
                                    cx: "847.7",
                                    cy: "247.59",
                                    r: "74.66",
                                    transform:
                                      "translate(-32.91 314.05) rotate(-20.6)"
                                  }
                                }),
                                _vm._v(" "),
                                _c("circle", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    cx: "847.7",
                                    cy: "247.59",
                                    r: "63.44",
                                    transform:
                                      "translate(-32.91 314.05) rotate(-20.6)"
                                  }
                                }),
                                _vm._v(" "),
                                _c("rect", {
                                  staticClass: "cls-3 clock-hand-1",
                                  attrs: {
                                    x: "845",
                                    y: "189.5",
                                    width: "6.04",
                                    height: "58",
                                    rx: "3.02",
                                    ry: "3.02"
                                  }
                                }),
                                _vm._v(" "),
                                _c("rect", {
                                  staticClass: "cls-3 clock-hand-2",
                                  attrs: {
                                    x: "845",
                                    y: "209.5",
                                    width: "6.04",
                                    height: "38",
                                    rx: "3.02",
                                    ry: "3.02",
                                    transform:
                                      "translate(1611.22 -230.4) rotate(130.4)"
                                  }
                                }),
                                _vm._v(" "),
                                _c("circle", {
                                  staticClass: "cls-3",
                                  attrs: {
                                    cx: "847.7",
                                    cy: "247.59",
                                    transform:
                                      "translate(-32.91 314.05) rotate(-20.6)",
                                    r: "3"
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "g",
                              { attrs: { id: "box", "data-name": "Layer 9" } },
                              [
                                _c("g", { attrs: { id: "box-top" } }, [
                                  _c("polygon", {
                                    staticClass: "cls-8",
                                    attrs: {
                                      points:
                                        "569.71 382.28 653.74 329.39 747.13 320.1 679.2 369.85 569.71 382.28"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("polygon", {
                                    staticClass: "cls-5",
                                    attrs: {
                                      points:
                                        "691.95 367.2 570.87 392.34 565.32 383.35 687.8 357.45 691.95 367.2"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("polygon", {
                                    staticClass: "cls-5",
                                    attrs: {
                                      points:
                                        "661.54 337.48 570.87 392.34 562.42 378.92 652.25 322.38 658.12 321.34 661.54 337.48"
                                    }
                                  }),
                                  _c("polygon", {
                                    staticClass: "cls-7",
                                    attrs: {
                                      points:
                                        "661.54 337.48 570.87 392.34 562.42 378.92 652.25 322.38 658.12 321.34 661.54 337.48"
                                    }
                                  }),
                                  _c("polygon", {
                                    staticClass: "cls-5",
                                    attrs: {
                                      points:
                                        "747.13 320.1 661.54 337.48 652.25 322.38 738.4 307.1 747.13 320.1"
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-5",
                                  attrs: {
                                    d:
                                      "M588.28,420.26s3.44,5.2,5.19,8l43.1,68.48,158.81-100-43.1-68.48q-2.63-4.17-5.47-8Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-7",
                                  attrs: {
                                    d:
                                      "M588.28,420.26s3.44,5.2,5.19,8l43.1,68.48,158.81-100-43.1-68.48q-2.63-4.17-5.47-8Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("rect", {
                                  staticClass: "cls-5",
                                  attrs: {
                                    x: "693.73",
                                    y: "335.51",
                                    width: "83.99",
                                    height: "90.58",
                                    transform:
                                      "translate(-89.78 450.43) rotate(-32.19)"
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "g",
                              {
                                attrs: {
                                  id: "rucksack",
                                  "data-name": "Layer 6"
                                }
                              },
                              [
                                _c("g", { attrs: { id: "stripe" } }, [
                                  _c("path", {
                                    staticClass: "cls-12",
                                    attrs: {
                                      d:
                                        "M1200.32,473.91h0a13.74,13.74,0,0,0-18.41,7.44l-55,129.86a14.82,14.82,0,0,0,7.13,19.21h0a13.74,13.74,0,0,0,18.41-7.44l55-129.86A14.82,14.82,0,0,0,1200.32,473.91Z"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-13",
                                    attrs: {
                                      d:
                                        "M1202.18,606.34h0a14,14,0,0,0-16.18-11.8l-48.83,9c-7.59,1.4-12.66,9-11.31,16.89h0a14,14,0,0,0,16.18,11.8l48.83-9C1198.46,621.82,1203.53,614.26,1202.18,606.34Z"
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-8",
                                  attrs: {
                                    d:
                                      "M1300.86,603l-122.93,22.74-15.44-90.91c-5.75-33.86,15.89-66.17,48.34-72.18l11.58-2.08c32.45-6,57.26,17.66,63,51.51Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-1",
                                  attrs: {
                                    d:
                                      "M1307,601.91l-112.32,20.78-15.9-93.61c-5.5-32.36,15.19-63.25,46.2-69h0c31-5.74,60.62,15.85,66.12,48.21Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-8",
                                  attrs: {
                                    d:
                                      "M1296.76,603.8,1215,618.92l-4.89-28.77c-2.11-12.42,5.83-24.27,17.73-26.47l38.67-7.15c11.9-2.2,23.26,6.08,25.37,18.5Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-5",
                                  attrs: {
                                    d:
                                      "M1296.76,603.8l-73.41,13.58-4.92-29c-2-11.62,5.45-22.72,16.6-24.78l33.07-6.12c11.14-2.06,21.77,5.69,23.75,17.32Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-4",
                                  attrs: {
                                    d:
                                      "M1231.77,469.69l-13.42,2.48a10.25,10.25,0,0,0-8,11.92l2.38,14a9.9,9.9,0,0,0,11.42,8.33l13.42-2.48a10.25,10.25,0,0,0,8-11.92l-2.38-14A9.9,9.9,0,0,0,1231.77,469.69Zm7.17,20.84a6.39,6.39,0,0,1-5,7.43l-8.36,1.55a6.17,6.17,0,0,1-7.12-5.19l-1.48-8.73a6.39,6.39,0,0,1,5-7.43l8.36-1.55a6.17,6.17,0,0,1,7.12,5.19Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-14",
                                  attrs: {
                                    d:
                                      "M1233.74,471.13l-13.42,2.48a10.25,10.25,0,0,0-8,11.92l2.38,14a9.9,9.9,0,0,0,11.42,8.33l13.42-2.48a10.25,10.25,0,0,0,8-11.92l-2.38-14A9.9,9.9,0,0,0,1233.74,471.13Zm7.17,20.84a6.39,6.39,0,0,1-5,7.43l-8.36,1.55a6.17,6.17,0,0,1-7.12-5.19L1219,487a6.39,6.39,0,0,1,5-7.43l8.36-1.55a6.17,6.17,0,0,1,7.12,5.19Z"
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "g",
                              { attrs: { id: "bike", "data-name": "Layer 5" } },
                              [
                                _c("path", {
                                  staticClass: "cls-8 wheel",
                                  attrs: {
                                    d:
                                      "M1139.82,780.44a76.59,76.59,0,1,0-57.9,91.53A76.59,76.59,0,0,0,1139.82,780.44Zm-28.12,6.33a47.59,47.59,0,0,1,.83,15.8c-30.14-6.28-47.68-21.65-54.39-52.52A47.73,47.73,0,0,1,1111.69,786.77Zm-70.46-30.9c10.35,26.88,10.14,50.4-13.73,70.77a47.67,47.67,0,0,1,13.73-70.77Zm34.35,88a47.55,47.55,0,0,1-34.94-5.62c16.8-20.36,41.71-25.94,67.09-19.46A47.66,47.66,0,0,1,1075.58,843.85Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-8 wheel",
                                  attrs: {
                                    d:
                                      "M864.89,789.69a76.59,76.59,0,1,0-66.13,85.78A76.59,76.59,0,0,0,864.89,789.69Zm-28.59,3.7a47.59,47.59,0,0,1-.64,15.81c-29.43-9-45.47-26-49.3-57.33A47.73,47.73,0,0,1,836.3,793.39ZM769,756.1c7.82,27.72,5.43,51.12-20.22,69.2A47.67,47.67,0,0,1,769,756.1Zm26.06,90.78a47.55,47.55,0,0,1-34.27-8.83c18.61-18.72,43.93-22,68.6-13.16A47.66,47.66,0,0,1,795.06,846.88Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("g", [
                                  _c("rect", {
                                    staticClass: "cls-1",
                                    attrs: {
                                      x: "871.39",
                                      y: "693.37",
                                      width: "12.87",
                                      height: "53.21",
                                      transform:
                                        "translate(-165.97 273.38) rotate(-16.19)"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-5",
                                    attrs: {
                                      d:
                                        "M813.93,679.35c-3.72-5.2,2.24-18.5,9.16-16.13,33.43,11.46,73.85,10.45,73.85,10.45,8.84.15,14.44,10.34,7.27,15.48-14.36,8.79-33.13,17-56.35,9.76C830.17,693.41,819.83,687.6,813.93,679.35Z"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-7",
                                    attrs: {
                                      d:
                                        "M813.93,679.35c-3.72-5.2,2.24-18.5,9.16-16.13,33.43,11.46,73.85,10.45,73.85,10.45,8.84.15,14.44,10.34,7.27,15.48-14.36,8.79-33.13,17-56.35,9.76C830.17,693.41,819.83,687.6,813.93,679.35Z"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-5",
                                    attrs: {
                                      d:
                                        "M817.15,680.06c-3.59-5,1.69-16.51,8.37-14.22,32.3,11.09,71.41,7.83,71.41,7.83,8.54.14,17.45,9.94,7.43,15.88-13.87,8.51-32,16.44-54.44,9.44C832.84,693.67,822.85,688,817.15,680.06Z"
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _c("g", [
                                  _c("circle", {
                                    staticClass: "cls-9",
                                    attrs: {
                                      cx: "1022.66",
                                      cy: "599.55",
                                      r: "11.57",
                                      transform:
                                        "translate(-4.86 8.38) rotate(-0.47)"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("path", {
                                    staticClass: "cls-1",
                                    attrs: {
                                      d:
                                        "M1069.76,792.37l-34.89-96.74,1.93-.8-1.71-4.15-1.74.72-13.26-36.76,1.27-.42-2.25-6.76,5.94-2-2.57-7.72-9.7,3.22c-11.55-22.55,2-36.33,15-41.86l-5.57-8.81c-23,10.29-29.61,28.75-19.53,54l-9.38,3.12,2.56,7.72,5.47-1.82,2.25,6.76,2.36-.78,13.62,37.76-2.35,1,1.71,4.15,2.16-.89,34.65,96.09a7.47,7.47,0,0,0,9.56,4.49h0A7.47,7.47,0,0,0,1069.76,792.37Z"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("circle", {
                                    staticClass: "cls-11",
                                    attrs: {
                                      cx: "1027.9",
                                      cy: "587.94",
                                      r: "12.99",
                                      transform:
                                        "translate(-4.77 8.42) rotate(-0.47)"
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-5",
                                  attrs: {
                                    d:
                                      "M1021.29,654l-17.73,6.15,1.72,5.59-31.41,82.36c-19.35,32.53-66.3,36.72-75.56,16.68l-7.09-21.5L879,747.1l3.28,10.09-94.65,33.95c-11.49,2.29-11.85,15.79-2.61,17.84,0,0,39.11,3.66,103,9.5a92.75,92.75,0,0,0,40.89-5.29c44.32-16.56,57.73-50.67,57.73-50.67l26.82-67.26a1.37,1.37,0,0,1,2.53,0l1.42,3.33,17.75-7.62Z"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  staticClass: "cls-7",
                                  attrs: {
                                    d:
                                      "M1021.29,654l-17.73,6.15,1.72,5.59-31.41,82.36c-19.35,32.53-66.3,36.72-75.56,16.68l-7.09-21.5L879,747.1l3.28,10.09-94.65,33.95c-11.49,2.29-11.85,15.79-2.61,17.84,0,0,39.11,3.66,103,9.5a92.75,92.75,0,0,0,40.89-5.29c44.32-16.56,57.73-50.67,57.73-50.67l26.82-67.26a1.37,1.37,0,0,1,2.53,0l1.42,3.33,17.75-7.62Z"
                                  }
                                })
                              ]
                            )
                          ]
                        )
                      ])
                    ]
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
                    {
                      attrs: {
                        xs12: "",
                        sm12: "",
                        md4: "",
                        "offset-md4": "",
                        lg4: "",
                        "offset-lg4": "",
                        xl4: "",
                        "offset-xl4": ""
                      }
                    },
                    [
                      _c(
                        "v-card-actions",
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "info--text info",
                              attrs: { block: "", flat: "" },
                              nativeOn: {
                                click: function($event) {
                                  _vm.goHome()
                                }
                              }
                            },
                            [_vm._v("Back To HomePage")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "primary--text primary",
                              attrs: { block: "", flat: "" },
                              nativeOn: {
                                click: function($event) {
                                  _vm.goShop()
                                }
                              }
                            },
                            [_vm._v("Continue Shopping")]
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
     require("vue-hot-reload-api").rerender("data-v-6ba62439", module.exports)
  }
}

/***/ })

});