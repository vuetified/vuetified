webpackJsonp([6],{

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
  __webpack_require__(772)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(774)
/* template */
var __vue_template__ = __webpack_require__(805)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9fc134e0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\pages\\Checkout.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Checkout.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9fc134e0", Component.options)
  } else {
    hotAPI.reload("data-v-9fc134e0", Component.options)
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

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(696)
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

/***/ 696:
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

/***/ 772:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(773);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("63ed1380", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9fc134e0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Checkout.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9fc134e0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Checkout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 773:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n.stepper .stepper__step--inactive  .stepper__step__step[data-v-9fc134e0] {\n    color: #BA9A5A;\n}\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/pages/Checkout.vue?6ce032a7"],"names":[],"mappings":";AAkIA;IACA,eAAA;CACA","file":"Checkout.vue","sourcesContent":["<template>\n<modal-layout>\n    <!-- Start ToolBar Slot -->\n    <v-toolbar class=\"accent\" slot=\"toolbar\">\n        <!-- Arrow Back -->\n        <v-btn flat icon color=\"error\" @click.native=\"redirectBack()\">\n            <v-icon>fa-times</v-icon>\n        </v-btn>\n\n        <v-spacer></v-spacer>\n        <!-- Modal Title -->\n        <v-toolbar-title class=\"text-xs-center primary--text\">\n            Checkout Order Form\n        </v-toolbar-title>\n\n        <v-spacer></v-spacer>\n\n    </v-toolbar>\n    <!-- End ToolBar Slot -->\n\n    <!-- Start Content Slot -->\n    <v-stepper v-model=\"step\">\n\n        <v-stepper-header>\n\n            <template v-for=\"(active,key) in getActiveSteps\">\n\n                <v-stepper-step\n                :key=\"key\"\n                :step=\"parseInt(key + 1)\"\n                :complete=\"parseInt(step) > parseInt(key + 1)\"\n                :rules=\"[() => getActiveSteps[key].validated]\"\n                >\n                    <span class=\"primary--text\">{{ active.title }}</span>\n                    <small class=\"info--text\">{{ active.subtitle }}</small>\n                </v-stepper-step>\n\n                <v-divider :key=\"key\" v-if=\"parseInt(key + 1) !== getActiveSteps.length\">\n                </v-divider>\n\n            </template>\n\n        </v-stepper-header>\n\n        <v-stepper-content\n            :step=\"parseInt(key + 1)\"\n            v-for=\"(active,key) in getActiveSteps\"\n            :key=\"key\"\n        >\n            <v-card style=\"min-height: 600px;\">\n                <component :is=\"active.component\">\n                </component>\n            </v-card>\n\n        </v-stepper-content>\n\n    </v-stepper>\n    <!-- End Content Slot -->\n\n    <!-- Start Footer Slot -->\n    <v-footer :class=\"[footerClass]\" fixed slot=\"footer\">\n    <v-spacer></v-spacer>\n    <span>© {{ year }} {{ domain }} ® | {{ trademark }}™</span>\n    <v-spacer></v-spacer>\n    </v-footer>\n    <!-- End Footer Slot -->\n\n</modal-layout>\n</template>\n\n<script>\nimport ModalLayout from '../layouts/ModalLayout.vue'\nimport OrderDetails from '../components/checkout/order-details.vue'\nimport ShippingDetails from '../components/checkout/shipping-details.vue'\nimport CustomerDetails from '../components/checkout/customer-details.vue'\nimport ModeOfPayment from '../components/checkout/mode-of-payment.vue'\nimport SuccessOrder from '../components/checkout/success-order.vue'\nimport DeliveryMethod from '../components/checkout/delivery-method.vue'\nimport Theme from '../mixins/theme'\nimport { createNamespacedHelpers } from 'vuex'\nconst { mapGetters, mapMutations } = createNamespacedHelpers('wizard')\n\nexport default {\n    mixins: [Theme],\n    components: {\n        ModalLayout,\n        OrderDetails,\n        ShippingDetails,\n        CustomerDetails,\n        ModeOfPayment,\n        SuccessOrder,\n        DeliveryMethod\n    },\n    data: () => ({\n        footerClass: {'primary--text': true, 'accent': true}\n    }),\n    computed: {\n        ...mapGetters([\n            'getActiveSteps',\n            'getStep'\n        ]),\n        step: {\n            get () {\n                return this.getStep\n            },\n            set (value) {\n                this.setStep(value)\n            }\n        }\n    },\n    methods: {\n        ...mapMutations([\n            'setStep',\n            'setSteps'\n        ]),\n        redirectBack () {\n            let self = this\n            self.$router.push({path: '/cart'})\n        }\n    },\n    mounted () {\n        let self = this\n        /* redirect if no Item in the Cart */\n        if (self.$store.getters['cart/getCount'] === 0) {\n            self.$router.push({path: '/'})\n        }\n    }\n}\n</script>\n<style scoped>\n.stepper .stepper__step--inactive  .stepper__step__step {\n    color: #BA9A5A;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout_vue__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_checkout_order_details_vue__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_checkout_order_details_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_checkout_order_details_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_checkout_shipping_details_vue__ = __webpack_require__(780);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_checkout_shipping_details_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_checkout_shipping_details_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_checkout_customer_details_vue__ = __webpack_require__(785);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_checkout_customer_details_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_checkout_customer_details_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_checkout_mode_of_payment_vue__ = __webpack_require__(790);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_checkout_mode_of_payment_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_checkout_mode_of_payment_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_checkout_success_order_vue__ = __webpack_require__(795);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_checkout_success_order_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_checkout_success_order_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_checkout_delivery_method_vue__ = __webpack_require__(800);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_checkout_delivery_method_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_checkout_delivery_method_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_theme__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_vuex__ = __webpack_require__(90);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_9_vuex__["createNamespacedHelpers"])('wizard'),
    mapGetters = _createNamespacedHelp.mapGetters,
    mapMutations = _createNamespacedHelp.mapMutations;

/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_8__mixins_theme__["a" /* default */]],
    components: {
        ModalLayout: __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout_vue___default.a,
        OrderDetails: __WEBPACK_IMPORTED_MODULE_2__components_checkout_order_details_vue___default.a,
        ShippingDetails: __WEBPACK_IMPORTED_MODULE_3__components_checkout_shipping_details_vue___default.a,
        CustomerDetails: __WEBPACK_IMPORTED_MODULE_4__components_checkout_customer_details_vue___default.a,
        ModeOfPayment: __WEBPACK_IMPORTED_MODULE_5__components_checkout_mode_of_payment_vue___default.a,
        SuccessOrder: __WEBPACK_IMPORTED_MODULE_6__components_checkout_success_order_vue___default.a,
        DeliveryMethod: __WEBPACK_IMPORTED_MODULE_7__components_checkout_delivery_method_vue___default.a
    },
    data: function data() {
        return {
            footerClass: { 'primary--text': true, 'accent': true }
        };
    },
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapGetters(['getActiveSteps', 'getStep']), {
        step: {
            get: function get() {
                return this.getStep;
            },
            set: function set(value) {
                this.setStep(value);
            }
        }
    }),
    methods: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapMutations(['setStep', 'setSteps']), {
        redirectBack: function redirectBack() {
            var self = this;
            self.$router.push({ path: '/cart' });
        }
    }),
    mounted: function mounted() {
        var self = this;
        /* redirect if no Item in the Cart */
        if (self.$store.getters['cart/getCount'] === 0) {
            self.$router.push({ path: '/' });
        }
    }
});

/***/ }),

/***/ 775:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(776)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(778)
/* template */
var __vue_template__ = __webpack_require__(779)
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
Component.options.__file = "resources\\assets\\js\\components\\checkout\\order-details.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order-details.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65316a64", Component.options)
  } else {
    hotAPI.reload("data-v-65316a64", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(777);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("4b04a9c2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-65316a64\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-details.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-65316a64\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-details.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"order-details.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(90);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["createNamespacedHelpers"])('checkout'),
    mapActions = _createNamespacedHelp.mapActions,
    mapState = _createNamespacedHelp.mapState;

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            checkOutForm: new AppForm(App.forms.checkOutForm)
        };
    },
    computed: __WEBPACK_IMPORTED_MODULE_2_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapState({
        customer_details: function customer_details(state) {
            return state.customer_details;
        },
        shipping_details: function shipping_details(state) {
            return state.shipping_details;
        },
        courier: function courier(state) {
            return state.courier;
        },
        mop: function mop(state) {
            return state.mop;
        }
    }), {
        items: {
            get: function get() {
                return this.$store.getters['cart/getItems'];
            },
            set: function set(value) {
                this.$store.commit('cart/setItems', value);
            }
        },
        subtotal: {
            get: function get() {
                return this.$store.getters['cart/getSubTotal'];
            },
            set: function set(value) {
                this.$store.commit('cart/setSubTotal', value);
            }
        },
        tax: {
            get: function get() {
                return this.$store.getters['cart/getTax'];
            },
            set: function set(value) {
                this.$store.commit('cart/setTax', value);
            }
        },
        total: {
            get: function get() {
                return this.$store.getters['cart/getTotal'];
            },
            set: function set(value) {
                this.$store.commit('cart/setTotal', value);
            }
        },
        current: {
            get: function get() {
                return this.$store.getters['wizard/getCurrent'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setCurrent', value);
            }
        },
        step: {
            get: function get() {
                return this.$store.getters['wizard/getStep'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setStep', value);
            }
        },

        next: {
            get: function get() {
                return this.$store.getters['wizard/getNext'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setNext', value);
            }
        },
        previous: {
            get: function get() {
                return this.$store.getters['wizard/getPrevious'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setPrevious', value);
            }
        },
        steps: function steps() {
            return this.$store.getters['wizard/getActiveSteps'];
        },
        total_amount: function total_amount() {
            var total = this.total;
            var fee = 0;
            if (this.courier && this.courier.details.rate) {
                total = this.parseNumber(total);
                fee = parseFloat(this.courier.details.rate);
                return (total + fee).toFixed(2);
            } else {
                return total;
            }
        }
    }),
    methods: __WEBPACK_IMPORTED_MODULE_2_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({
        parseNumber: function parseNumber(str) {
            var strg = str || '';
            var decimal = '.';
            strg = strg.replace(/[^0-9$.,]/g, '');
            if (strg.indexOf(',') > strg.indexOf('.')) decimal = ',';
            if ((strg.match(new RegExp('\\' + decimal, 'g')) || []).length > 1) decimal = '';
            if (decimal != '' && strg.length - strg.indexOf(decimal) - 1 == 3 && strg.indexOf('0' + decimal) !== 0) decimal = '';
            strg = strg.replace(new RegExp('[^0-9$' + decimal + ']', 'g'), '');
            strg = strg.replace(',', '.');
            return parseFloat(strg);
        }
    }, mapActions(['checkout']), {
        paypalcallback: function paypalcallback() {
            console.log('paying with paypal');
        },
        bitcoincallback: function bitcoincallback() {
            console.log('paying with bitcoin');
        },
        stripecallback: function stripecallback() {
            console.log('paying with stripe');
        },
        submit: function () {
            var _ref = __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
                var self, count, validated;
                return __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                self = this;
                                // set Customer Details

                                if (_.find(self.steps, { 'component': 'customer-details', 'active': true }) !== undefined) {
                                    self.checkOutForm.customer_details = self.customer_details;
                                }
                                // set Delivery Method
                                if (_.find(self.steps, { 'component': 'delivery-method', 'active': true }) !== undefined) {
                                    self.checkOutForm.courier = self.courier;
                                }
                                // set Shipping Details
                                if (_.find(self.steps, { 'component': 'shipping-details', 'active': true }) !== undefined) {
                                    self.checkOutForm.shipping_details = self.shipping_details;
                                } else {
                                    // No Shipment
                                    delete self.checkOutForm.shipping_details;
                                    delete self.checkOutForm.shipping_fee;
                                }
                                if (_.find(self.steps, { 'component': 'mode-of-payment', 'active': true }) !== undefined) {
                                    self.checkOutForm.mop = self.mop;
                                }
                                // set Cart
                                self.checkOutForm.cart.items = self.items;
                                self.checkOutForm.cart.subtotal = self.subtotal;
                                self.checkOutForm.cart.tax = self.tax;
                                self.checkOutForm.cart.total = self.total;
                                // check if all active steps are validated
                                count = self.steps.length;
                                validated = _.filter(self.steps, { 'validated': true }).length;
                                // Usual Error is if any of the step is not validated form object is not new up

                                if (!(count === validated)) {
                                    _context.next = 20;
                                    break;
                                }

                                _context.next = 14;
                                return self.checkout(self.checkOutForm);

                            case 14:
                                _context.next = 16;
                                return this.$store.dispatch('cart/resetCart');

                            case 16:
                                _context.next = 18;
                                return this.$store.dispatch('wizard/resetWizard');

                            case 18:
                                _context.next = 21;
                                break;

                            case 20:
                                // if by chance not all steps are validated , show an error message
                                self.$popup({ message: 'Checkout Form Has An Error', backgroundColor: '#e57373', delay: 5, color: '#fffffa' });

                            case 21:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function submit() {
                return _ref.apply(this, arguments);
            }

            return submit;
        }(),
        back: function back() {
            var self = this;
            self.$validator.validateAll();
            self.setValidated();
            self.$store.dispatch('wizard/move', self.previous);
        },
        setValidated: function setValidated() {
            if (!this.errors.any()) {
                this.current.validated = true;
            } else {
                this.current.validated = false;
            }
            this.$store.commit('wizard/setStepValidated', this.current);
        }
    })
});

/***/ }),

/***/ 779:
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
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md12: "", lg12: "", xl12: "" } },
            [
              _c("v-text-field", {
                staticClass: "primary--text",
                attrs: {
                  label: "Total Price",
                  readonly: "",
                  "prepend-icon": "fa-shopping-bag"
                },
                model: {
                  value: _vm.subtotal,
                  callback: function($$v) {
                    _vm.subtotal = $$v
                  },
                  expression: "subtotal"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      parseFloat(_vm.tax) > 0
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
                      label: "Tax",
                      readonly: "",
                      "prepend-icon": "fa-percent"
                    },
                    model: {
                      value: _vm.tax,
                      callback: function($$v) {
                        _vm.tax = $$v
                      },
                      expression: "tax"
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
      _vm.courier && _vm.courier.details.rate > 0
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
                      label: "Shipping Fee",
                      value: _vm.courier.details.rate,
                      readonly: "",
                      "prepend-icon": "local_shipping"
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
                staticClass: "primary--text",
                attrs: {
                  label: "Total Amount",
                  value: _vm.total_amount,
                  readonly: "",
                  "prepend-icon": "fa-money"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.courier && _vm.courier.slug === "paypal"
        ? _c(
            "v-btn",
            {
              class: {
                primary: !_vm.checkOutForm.busy,
                error: _vm.checkOutForm.busy
              },
              attrs: {
                loading: _vm.checkOutForm.busy,
                disabled: _vm.errors.any()
              },
              nativeOn: {
                click: function($event) {
                  _vm.paypalcallback()
                }
              }
            },
            [
              _vm._v("Pay Via Paypal "),
              _c("v-icon", { attrs: { right: "", dark: "" } }, [
                _vm._v("fa-paypal")
              ])
            ],
            1
          )
        : _vm.courier && _vm.courier.slug === "bitcoin"
          ? _c(
              "v-btn",
              {
                class: {
                  primary: !_vm.checkOutForm.busy,
                  error: _vm.checkOutForm.busy
                },
                attrs: {
                  loading: _vm.checkOutForm.busy,
                  disabled: _vm.errors.any()
                },
                nativeOn: {
                  click: function($event) {
                    _vm.bitcoincallback()
                  }
                }
              },
              [
                _vm._v("Pay Via Bitcoin "),
                _c("v-icon", { attrs: { right: "", dark: "" } }, [
                  _vm._v("fa-btc")
                ])
              ],
              1
            )
          : _vm.courier && _vm.courier.slug === "credit-card"
            ? _c(
                "v-btn",
                {
                  class: {
                    primary: !_vm.checkOutForm.busy,
                    error: _vm.checkOutForm.busy
                  },
                  attrs: {
                    loading: _vm.checkOutForm.busy,
                    disabled: _vm.errors.any()
                  },
                  nativeOn: {
                    click: function($event) {
                      _vm.stripecallback()
                    }
                  }
                },
                [
                  _vm._v("Pay Via Stripe "),
                  _c("v-icon", { attrs: { right: "", dark: "" } }, [
                    _vm._v("fa-cc-stripe")
                  ])
                ],
                1
              )
            : _c(
                "v-btn",
                {
                  class: {
                    primary: !_vm.checkOutForm.busy,
                    error: _vm.checkOutForm.busy
                  },
                  attrs: {
                    loading: _vm.checkOutForm.busy,
                    disabled: _vm.errors.any()
                  },
                  nativeOn: {
                    click: function($event) {
                      _vm.submit()
                    }
                  }
                },
                [
                  _vm._v("Submit "),
                  _c("v-icon", { attrs: { right: "", dark: "" } }, [
                    _vm._v("send")
                  ])
                ],
                1
              ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          attrs: { disabled: _vm.errors.any(), outline: "", color: "primary" },
          nativeOn: {
            click: function($event) {
              _vm.back()
            }
          }
        },
        [_vm._v("Back")]
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
     require("vue-hot-reload-api").rerender("data-v-65316a64", module.exports)
  }
}

/***/ }),

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(781)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(783)
/* template */
var __vue_template__ = __webpack_require__(784)
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
Component.options.__file = "resources\\assets\\js\\components\\checkout\\shipping-details.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] shipping-details.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10e7f312", Component.options)
  } else {
    hotAPI.reload("data-v-10e7f312", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 781:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(782);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("35699f45", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-10e7f312\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./shipping-details.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-10e7f312\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./shipping-details.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"shipping-details.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 783:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["createNamespacedHelpers"])('checkout'),
    mapState = _createNamespacedHelp.mapState,
    mapMutations = _createNamespacedHelp.mapMutations;

/* harmony default export */ __webpack_exports__["default"] = ({
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapState({
        shipping_details: function shipping_details(state) {
            return state.shipping_details;
        }
    }), {
        current: {
            get: function get() {
                return this.$store.getters['wizard/getCurrent'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setCurrent', value);
            }
        },
        step: {
            get: function get() {
                return this.$store.getters['wizard/getStep'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setStep', value);
            }
        },

        next: {
            get: function get() {
                return this.$store.getters['wizard/getNext'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setNext', value);
            }
        },
        previous: {
            get: function get() {
                return this.$store.getters['wizard/getPrevious'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setPrevious', value);
            }
        }
    }),
    methods: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapMutations(['setShippingDetails']), {
        forward: function forward() {
            var self = this;
            self.$validator.validateAll();
            self.setValidated();
            self.$store.dispatch('wizard/move', self.next);
            self.setShippingDetails(self.shipping_details);
        },
        back: function back() {
            var self = this;
            self.$validator.validateAll();
            self.setValidated();
            self.$store.dispatch('wizard/move', self.previous);
            self.setShippingDetails(self.shipping_details);
        },
        setValidated: function setValidated() {
            if (!this.errors.any()) {
                this.current.validated = true;
            } else {
                this.current.validated = false;
            }
            this.$store.commit('wizard/setStepValidated', this.current);
        }
    })
});

/***/ }),

/***/ 784:
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
                    "prepend-icon": "fa-address-book"
                  },
                  model: {
                    value: _vm.shipping_details.address_1,
                    callback: function($$v) {
                      _vm.shipping_details.address_1 = $$v
                    },
                    expression: "shipping_details.address_1"
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
                    "prepend-icon": "fa-address-book-o "
                  },
                  model: {
                    value: _vm.shipping_details.address_2,
                    callback: function($$v) {
                      _vm.shipping_details.address_2 = $$v
                    },
                    expression: "shipping_details.address_2"
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
                    "prepend-icon": "location_city"
                  },
                  model: {
                    value: _vm.shipping_details.city,
                    callback: function($$v) {
                      _vm.shipping_details.city = $$v
                    },
                    expression: "shipping_details.city"
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
                    "prepend-icon": "fa-fa"
                  },
                  model: {
                    value: _vm.shipping_details.country,
                    callback: function($$v) {
                      _vm.shipping_details.country = $$v
                    },
                    expression: "shipping_details.country"
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
                    "prepend-icon": "markunread_mailbox"
                  },
                  model: {
                    value: _vm.shipping_details.zip_code,
                    callback: function($$v) {
                      _vm.shipping_details.zip_code = $$v
                    },
                    expression: "shipping_details.zip_code"
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
                    "prepend-icon": "place"
                  },
                  model: {
                    value: _vm.shipping_details.state_province,
                    callback: function($$v) {
                      _vm.shipping_details.state_province = $$v
                    },
                    expression: "shipping_details.state_province"
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
            attrs: { color: "primary" },
            nativeOn: {
              click: function($event) {
                _vm.forward()
              }
            }
          },
          [_vm._v("Continue")]
        ),
        _vm._v(" "),
        _c(
          "v-btn",
          {
            attrs: { outline: "", color: "primary" },
            nativeOn: {
              click: function($event) {
                _vm.back()
              }
            }
          },
          [_vm._v("Back")]
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
     require("vue-hot-reload-api").rerender("data-v-10e7f312", module.exports)
  }
}

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(786)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(788)
/* template */
var __vue_template__ = __webpack_require__(789)
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
Component.options.__file = "resources\\assets\\js\\components\\checkout\\customer-details.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] customer-details.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6506657c", Component.options)
  } else {
    hotAPI.reload("data-v-6506657c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(787);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("1196f034", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6506657c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./customer-details.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6506657c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./customer-details.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"customer-details.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 788:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["createNamespacedHelpers"])('checkout'),
    mapState = _createNamespacedHelp.mapState,
    mapMutations = _createNamespacedHelp.mapMutations;

/* harmony default export */ __webpack_exports__["default"] = ({
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapState({
        customer_details: function customer_details(state) {
            return state.customer_details;
        }
    }), {
        current: {
            get: function get() {
                return this.$store.getters['wizard/getCurrent'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setCurrent', value);
            }
        },
        step: {
            get: function get() {
                return this.$store.getters['wizard/getStep'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setStep', value);
            }
        },

        next: {
            get: function get() {
                return this.$store.getters['wizard/getNext'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setNext', value);
            }
        },
        previous: {
            get: function get() {
                return this.$store.getters['wizard/getPrevious'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setPrevious', value);
            }
        }

    }),
    methods: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapMutations(['setCustomerDetails']), {
        forward: function forward() {
            var self = this;
            self.$validator.validateAll();
            self.setValidated();
            self.$store.dispatch('wizard/move', this.next);
            self.setCustomerDetails(self.customer_details);
        },
        setValidated: function setValidated() {
            if (!this.errors.any()) {
                this.current.validated = true;
            } else {
                this.current.validated = false;
            }
            this.$store.commit('wizard/setStepValidated', this.current);
        },
        viewCart: function viewCart() {
            var self = this;
            return self.$nextTick(function () {
                return self.$router.push({ name: 'cart' });
            });
        }
    })
});

/***/ }),

/***/ 789:
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
                    name: "first_name",
                    label: "First Name",
                    "data-vv-name": "first_name",
                    "error-messages": _vm.errors.collect("first_name"),
                    "prepend-icon": "fa-id-card"
                  },
                  model: {
                    value: _vm.customer_details.first_name,
                    callback: function($$v) {
                      _vm.customer_details.first_name = $$v
                    },
                    expression: "customer_details.first_name"
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
                    "prepend-icon": "fa-id-card-o"
                  },
                  model: {
                    value: _vm.customer_details.last_name,
                    callback: function($$v) {
                      _vm.customer_details.last_name = $$v
                    },
                    expression: "customer_details.last_name"
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
                    "prepend-icon": "email"
                  },
                  model: {
                    value: _vm.customer_details.email,
                    callback: function($$v) {
                      _vm.customer_details.email = $$v
                    },
                    expression: "customer_details.email"
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
                    "prepend-icon": "fa-phone"
                  },
                  model: {
                    value: _vm.customer_details.contact_no,
                    callback: function($$v) {
                      _vm.customer_details.contact_no = $$v
                    },
                    expression: "customer_details.contact_no"
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
            attrs: { color: "primary" },
            nativeOn: {
              click: function($event) {
                _vm.forward()
              }
            }
          },
          [_vm._v("Continue")]
        ),
        _vm._v(" "),
        _c(
          "v-btn",
          {
            attrs: { outline: "", color: "primary" },
            nativeOn: {
              click: function($event) {
                _vm.viewCart()
              }
            }
          },
          [_vm._v("Update Cart")]
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
     require("vue-hot-reload-api").rerender("data-v-6506657c", module.exports)
  }
}

/***/ }),

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(791)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(793)
/* template */
var __vue_template__ = __webpack_require__(794)
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
Component.options.__file = "resources\\assets\\js\\components\\checkout\\mode-of-payment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mode-of-payment.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-07a2445b", Component.options)
  } else {
    hotAPI.reload("data-v-07a2445b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(792);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("79a67c0c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-07a2445b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mode-of-payment.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-07a2445b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mode-of-payment.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"mode-of-payment.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 793:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["createNamespacedHelpers"])('checkout'),
    mapMutations = _createNamespacedHelp.mapMutations,
    mapActions = _createNamespacedHelp.mapActions,
    mapGetters = _createNamespacedHelp.mapGetters;

/* harmony default export */ __webpack_exports__["default"] = ({
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapGetters(['getModeOfPayment', 'getGateways']), {
        mop: {
            get: function get() {
                return this.getModeOfPayment;
            },
            set: function set(value) {
                this.setModeOfPayment(value);
            }
        },
        current: {
            get: function get() {
                return this.$store.getters['wizard/getCurrent'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setCurrent', value);
            }
        },
        step: {
            get: function get() {
                return this.$store.getters['wizard/getStep'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setStep', value);
            }
        },

        next: {
            get: function get() {
                return this.$store.getters['wizard/getNext'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setNext', value);
            }
        },
        previous: {
            get: function get() {
                return this.$store.getters['wizard/getPrevious'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setPrevious', value);
            }
        }

    }),
    created: function created() {
        if (this.getGateways.length < 1) {
            this.fetchGateways();
        }
    },

    methods: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapMutations(['setModeOfPayment']), mapActions(['fetchGateways']), {
        forward: function forward() {
            var self = this;
            self.$validator.validateAll();
            self.setValidated();
            self.$store.dispatch('wizard/move', self.next);
        },
        back: function back() {
            var self = this;
            self.$validator.validateAll();
            self.setValidated();
            self.$store.dispatch('wizard/move', self.previous);
        },
        setValidated: function setValidated() {
            if (!this.errors.any()) {
                this.current.validated = true;
            } else {
                this.current.validated = false;
            }
            this.$store.commit('wizard/setStepValidated', this.current);
        }
    })
});

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { attrs: { flat: "" } },
    [
      _c(
        "v-card-text",
        [
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c("v-flex", { attrs: { xs12: "" } }, [
                    _c(
                      "form",
                      [
                        _c("v-select", {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: "required",
                              expression: "'required'"
                            }
                          ],
                          attrs: {
                            label: "Select",
                            items: _vm.getGateways,
                            "item-text": "name",
                            "item-value": "slug",
                            "max-height": "400",
                            hint: "Payment Options",
                            "persistent-hint": "",
                            "data-vv-name": "mop",
                            "return-object": true,
                            "error-messages": _vm.errors.collect("mop"),
                            "prepend-icon": "fa-money"
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "selection",
                              fn: function(data) {
                                return [
                                  _c(
                                    "v-chip",
                                    {
                                      key: JSON.stringify(data.item),
                                      attrs: { selected: data.selected },
                                      on: {
                                        input: function($event) {
                                          data.parent.selectItem(data.item)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-avatar", [
                                        _c("img", {
                                          attrs: { src: data.item.avatar }
                                        })
                                      ]),
                                      _vm._v(
                                        "\n                " +
                                          _vm._s(data.item.name) +
                                          "\n                "
                                      )
                                    ],
                                    1
                                  )
                                ]
                              }
                            },
                            {
                              key: "item",
                              fn: function(data) {
                                return [
                                  typeof data.item !== "object"
                                    ? [
                                        _c("v-list-tile-content", {
                                          domProps: {
                                            textContent: _vm._s(data.item)
                                          }
                                        })
                                      ]
                                    : [
                                        _c("v-list-tile-avatar", [
                                          _c("img", {
                                            attrs: { src: data.item.avatar }
                                          })
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-tile-content",
                                          [
                                            _c("v-list-tile-title", {
                                              domProps: {
                                                innerHTML: _vm._s(
                                                  data.item.name
                                                )
                                              }
                                            }),
                                            _vm._v(" "),
                                            _c("v-list-tile-sub-title", {
                                              domProps: {
                                                innerHTML: _vm._s(
                                                  data.item.group
                                                )
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      ]
                                ]
                              }
                            }
                          ]),
                          model: {
                            value: _vm.mop,
                            callback: function($$v) {
                              _vm.mop = $$v
                            },
                            expression: "mop"
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { color: "primary" },
                            nativeOn: {
                              click: function($event) {
                                _vm.forward()
                              }
                            }
                          },
                          [_vm._v("Continue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { outline: "", color: "primary" },
                            nativeOn: {
                              click: function($event) {
                                _vm.back()
                              }
                            }
                          },
                          [_vm._v("Back")]
                        )
                      ],
                      1
                    )
                  ])
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
     require("vue-hot-reload-api").rerender("data-v-07a2445b", module.exports)
  }
}

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(796)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(798)
/* template */
var __vue_template__ = __webpack_require__(799)
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
Component.options.__file = "resources\\assets\\js\\components\\checkout\\success-order.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] success-order.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6257c025", Component.options)
  } else {
    hotAPI.reload("data-v-6257c025", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(797);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("602e6f4e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6257c025\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./success-order.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6257c025\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./success-order.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"success-order.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 798:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['email'],
    data: function data() {
        return {};
    },
    methods: {
        login: function login() {
            console.log('Logining In To Customer Dashboard');
        }
    }
});

/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-card", {
    staticClass: "grey lighten-1 mb-5",
    attrs: { height: "200px" }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6257c025", module.exports)
  }
}

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(801)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(803)
/* template */
var __vue_template__ = __webpack_require__(804)
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
Component.options.__file = "resources\\assets\\js\\components\\checkout\\delivery-method.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] delivery-method.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6985428a", Component.options)
  } else {
    hotAPI.reload("data-v-6985428a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(802);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("175bf86c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6985428a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./delivery-method.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6985428a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./delivery-method.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"delivery-method.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 803:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["createNamespacedHelpers"])('checkout'),
    mapMutations = _createNamespacedHelp.mapMutations,
    mapActions = _createNamespacedHelp.mapActions,
    mapGetters = _createNamespacedHelp.mapGetters;

/* harmony default export */ __webpack_exports__["default"] = ({
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapGetters(['getDeliveryMethod', 'getCouriers']), {
        courier: {
            get: function get() {
                return this.getDeliveryMethod;
            },
            set: function set(value) {
                this.setDeliveryMethod(value);
            }
        },
        current: {
            get: function get() {
                return this.$store.getters['wizard/getCurrent'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setCurrent', value);
            }
        },
        step: {
            get: function get() {
                return this.$store.getters['wizard/getStep'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setStep', value);
            }
        },

        next: {
            get: function get() {
                return this.$store.getters['wizard/getNext'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setNext', value);
            }
        },
        previous: {
            get: function get() {
                return this.$store.getters['wizard/getPrevious'];
            },
            set: function set(value) {
                this.$store.commit('wizard/setPrevious', value);
            }
        }

    }),
    created: function created() {
        if (this.getCouriers.length < 1) {
            this.fetchCouriers();
        }
    },

    methods: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapMutations(['setDeliveryMethod']), mapActions(['fetchCouriers']), {
        forward: function forward() {
            var self = this;
            self.$validator.validateAll();
            self.setValidated();
            self.setActiveSteps();
            self.$store.dispatch('wizard/move', self.next);
        },
        back: function back() {
            var self = this;
            self.$validator.validateAll();
            self.setValidated();
            self.setActiveSteps();
            self.$store.dispatch('wizard/move', self.previous);
        },
        setValidated: function setValidated() {
            if (!this.errors.any()) {
                this.current.validated = true;
            } else {
                this.current.validated = false;
            }
            this.$store.commit('wizard/setStepValidated', this.current);
        },
        setActiveSteps: function setActiveSteps() {
            var pickup = _.filter(this.getCouriers, _.iteratee(['group', 'Pick Up Location']));
            var meetup = _.filter(this.getCouriers, _.iteratee(['group', 'Meet Up']));
            var payload = {
                component: 'shipping-details',
                active: true
            };
            var filter = pickup.concat(meetup);
            if (_.includes(filter, this.courier)) {
                payload.active = false;
                this.$store.commit('wizard/setStepStatus', payload);
            } else {
                this.$store.commit('wizard/setStepStatus', payload);
            }
        }
    })
});

/***/ }),

/***/ 804:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { attrs: { flat: "" } },
    [
      _c(
        "v-card-text",
        [
          _c(
            "v-container",
            { attrs: { fluid: "" } },
            [
              _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c("v-flex", { attrs: { xs12: "" } }, [
                    _c(
                      "form",
                      [
                        _c("v-select", {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: "required",
                              expression: "'required'"
                            }
                          ],
                          attrs: {
                            label: "Select",
                            items: _vm.getCouriers,
                            "item-text": "name",
                            "item-value": "slug",
                            "cache-items": true,
                            "max-height": "400",
                            hint: "How Do You Want to Receive The Products?",
                            "persistent-hint": "",
                            "data-vv-name": "courier",
                            "return-object": true,
                            "error-messages": _vm.errors.collect("courier"),
                            "prepend-icon": "local_shipping"
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "selection",
                              fn: function(data) {
                                return [
                                  _c(
                                    "v-chip",
                                    {
                                      key: JSON.stringify(data.item),
                                      attrs: { selected: data.selected },
                                      on: {
                                        input: function($event) {
                                          data.parent.selectItem(data.item)
                                        }
                                      }
                                    },
                                    [
                                      _c("v-avatar", [
                                        _c("img", {
                                          attrs: { src: data.item.avatar }
                                        })
                                      ]),
                                      _vm._v(
                                        "\n                " +
                                          _vm._s(data.item.name) +
                                          "\n                "
                                      )
                                    ],
                                    1
                                  )
                                ]
                              }
                            },
                            {
                              key: "item",
                              fn: function(data) {
                                return [
                                  typeof data.item !== "object"
                                    ? [
                                        _c("v-list-tile-content", {
                                          domProps: {
                                            textContent: _vm._s(data.item)
                                          }
                                        })
                                      ]
                                    : [
                                        _c("v-list-tile-avatar", [
                                          _c("img", {
                                            attrs: { src: data.item.avatar }
                                          })
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "v-list-tile-content",
                                          [
                                            _c("v-list-tile-title", {
                                              domProps: {
                                                innerHTML: _vm._s(
                                                  data.item.name
                                                )
                                              }
                                            }),
                                            _vm._v(" "),
                                            _c("v-list-tile-sub-title", {
                                              domProps: {
                                                innerHTML: _vm._s(
                                                  data.item.group
                                                )
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      ]
                                ]
                              }
                            }
                          ]),
                          model: {
                            value: _vm.courier,
                            callback: function($$v) {
                              _vm.courier = $$v
                            },
                            expression: "courier"
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { color: "primary" },
                            nativeOn: {
                              click: function($event) {
                                _vm.forward()
                              }
                            }
                          },
                          [_vm._v("Continue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            attrs: { outline: "", color: "primary" },
                            nativeOn: {
                              click: function($event) {
                                _vm.back()
                              }
                            }
                          },
                          [_vm._v("Back")]
                        )
                      ],
                      1
                    )
                  ])
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
     require("vue-hot-reload-api").rerender("data-v-6985428a", module.exports)
  }
}

/***/ }),

/***/ 805:
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
              attrs: { flat: "", icon: "", color: "error" },
              nativeOn: {
                click: function($event) {
                  _vm.redirectBack()
                }
              }
            },
            [_c("v-icon", [_vm._v("fa-times")])],
            1
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-toolbar-title",
            { staticClass: "text-xs-center primary--text" },
            [_vm._v("\n            Checkout Order Form\n        ")]
          ),
          _vm._v(" "),
          _c("v-spacer")
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-stepper",
        {
          model: {
            value: _vm.step,
            callback: function($$v) {
              _vm.step = $$v
            },
            expression: "step"
          }
        },
        [
          _c(
            "v-stepper-header",
            [
              _vm._l(_vm.getActiveSteps, function(active, key) {
                return [
                  _c(
                    "v-stepper-step",
                    {
                      key: key,
                      attrs: {
                        step: parseInt(key + 1),
                        complete: parseInt(_vm.step) > parseInt(key + 1),
                        rules: [
                          function() {
                            return _vm.getActiveSteps[key].validated
                          }
                        ]
                      }
                    },
                    [
                      _c("span", { staticClass: "primary--text" }, [
                        _vm._v(_vm._s(active.title))
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "info--text" }, [
                        _vm._v(_vm._s(active.subtitle))
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  parseInt(key + 1) !== _vm.getActiveSteps.length
                    ? _c("v-divider", { key: key })
                    : _vm._e()
                ]
              })
            ],
            2
          ),
          _vm._v(" "),
          _vm._l(_vm.getActiveSteps, function(active, key) {
            return _c(
              "v-stepper-content",
              { key: key, attrs: { step: parseInt(key + 1) } },
              [
                _c(
                  "v-card",
                  { staticStyle: { "min-height": "600px" } },
                  [_c(active.component, { tag: "component" })],
                  1
                )
              ],
              1
            )
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "v-footer",
        {
          class: [_vm.footerClass],
          attrs: { slot: "footer", fixed: "" },
          slot: "footer"
        },
        [
          _c("v-spacer"),
          _vm._v(" "),
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
          _vm._v(" "),
          _c("v-spacer")
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
     require("vue-hot-reload-api").rerender("data-v-9fc134e0", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9DaGVja291dC52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21peGlucy90aGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9sYXlvdXRzL01vZGFsTGF5b3V0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTW9kYWxMYXlvdXQudnVlP2M3MDUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9DaGVja291dC52dWU/MWU0MyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NoZWNrb3V0LnZ1ZT83YTlhIiwid2VicGFjazovLy9DaGVja291dC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L29yZGVyLWRldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9vcmRlci1kZXRhaWxzLnZ1ZT9jNzM2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9vcmRlci1kZXRhaWxzLnZ1ZT9kNGE2Iiwid2VicGFjazovLy9vcmRlci1kZXRhaWxzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvb3JkZXItZGV0YWlscy52dWU/ZDYzMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc2hpcHBpbmctZGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3NoaXBwaW5nLWRldGFpbHMudnVlP2RmMTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3NoaXBwaW5nLWRldGFpbHMudnVlPzEwZGYiLCJ3ZWJwYWNrOi8vL3NoaXBwaW5nLWRldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9zaGlwcGluZy1kZXRhaWxzLnZ1ZT9jOWE4Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9jdXN0b21lci1kZXRhaWxzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvY3VzdG9tZXItZGV0YWlscy52dWU/Y2YyOCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvY3VzdG9tZXItZGV0YWlscy52dWU/ZmYzNSIsIndlYnBhY2s6Ly8vY3VzdG9tZXItZGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L2N1c3RvbWVyLWRldGFpbHMudnVlPzhhNTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L21vZGUtb2YtcGF5bWVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L21vZGUtb2YtcGF5bWVudC52dWU/NWE1NSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvbW9kZS1vZi1wYXltZW50LnZ1ZT9hNTRjIiwid2VicGFjazovLy9tb2RlLW9mLXBheW1lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9tb2RlLW9mLXBheW1lbnQudnVlPzk2NTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3N1Y2Nlc3Mtb3JkZXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9zdWNjZXNzLW9yZGVyLnZ1ZT9hNTFjIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9zdWNjZXNzLW9yZGVyLnZ1ZT9jNTc1Iiwid2VicGFjazovLy9zdWNjZXNzLW9yZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc3VjY2Vzcy1vcmRlci52dWU/YWIzNCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvZGVsaXZlcnktbWV0aG9kLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvZGVsaXZlcnktbWV0aG9kLnZ1ZT9hZTk5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9kZWxpdmVyeS1tZXRob2QudnVlP2M0Y2MiLCJ3ZWJwYWNrOi8vL2RlbGl2ZXJ5LW1ldGhvZC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L2RlbGl2ZXJ5LW1ldGhvZC52dWU/NmZjMCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NoZWNrb3V0LnZ1ZT9iMjFlIl0sIm5hbWVzIjpbImRhdGEiLCJkYXJrQ2xhc3MiLCJBcHAiLCJ0aGVtZSIsImRhcmsiLCJwcmltYXJ5Q2xhc3MiLCJwcmltYXJ5IiwiYWNjZW50Q2xhc3MiLCJhY2NlbnQiLCJzZWNvbmRhcnlDbGFzcyIsInNlY29uZGFyeSIsImluZm9DbGFzcyIsImluZm8iLCJ3YXJuaW5nQ2xhc3MiLCJ3YXJuaW5nIiwiZXJyb3JDbGFzcyIsImVycm9yIiwic3VjY2Vzc0NsYXNzIiwic3VjY2VzcyIsInRvZ2dsZUJhclN0eWxlIiwic2l0ZSIsInRpdGxlU3R5bGUiLCJuYXZiYXJTdHlsZSIsImZvb3RlclN0eWxlIiwic2lkZWJhclN0eWxlIiwiZG9tYWluIiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRyYWRlbWFyayIsImxvZ28iLCJ1cmwiLCJsb2dvU3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsInNob3dMb2dvIiwic2hvdyIsInNob3dJY29uIiwiaWNvbiIsIm5hbWUiLCJpY29uQ29sb3IiLCJjb2xvciIsInRpdGxlIiwiY29tcHV0ZWQiLCJpc0RhcmsiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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LGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw4Q0FBOEM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxrQ0FBa0MsK0JBQStCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0QkFBNEI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFdBQVc7QUFDbEQ7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQW1CLDBCQUEwQixFQUFFO0FBQzlEO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixlQUFlLHdCQUF3QixFQUFFO0FBQzVELHlDQUF5QyxtQkFBbUI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDRCQUE0QjtBQUM5QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiI2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDYzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTIgMTciLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTlmYzEzNGUwXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ2hlY2tvdXQudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0NoZWNrb3V0LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOWZjMTM0ZTBcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9DaGVja291dC52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi05ZmMxMzRlMFwiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxwYWdlc1xcXFxDaGVja291dC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIENoZWNrb3V0LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi05ZmMxMzRlMFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTlmYzEzNGUwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NoZWNrb3V0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjUwXG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2NTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDEyIDE3IiwiLyoqXG4gKiBFeHBvcnQgdGhlIEFueSBDb21wb25lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGRhcmtDbGFzczogQXBwLnRoZW1lLmRhcmssXG4gICAgICAgIHByaW1hcnlDbGFzczogQXBwLnRoZW1lLnByaW1hcnksXG4gICAgICAgIGFjY2VudENsYXNzOiBBcHAudGhlbWUuYWNjZW50LFxuICAgICAgICBzZWNvbmRhcnlDbGFzczogQXBwLnRoZW1lLnNlY29uZGFyeSxcbiAgICAgICAgaW5mb0NsYXNzOiBBcHAudGhlbWUuaW5mbyxcbiAgICAgICAgd2FybmluZ0NsYXNzOiBBcHAudGhlbWUud2FybmluZyxcbiAgICAgICAgZXJyb3JDbGFzczogQXBwLnRoZW1lLmVycm9yLFxuICAgICAgICBzdWNjZXNzQ2xhc3M6IEFwcC50aGVtZS5zdWNjZXNzLFxuICAgICAgICB0b2dnbGVCYXJTdHlsZTogQXBwLnNpdGUudG9nZ2xlQmFyU3R5bGUsXG4gICAgICAgIHRpdGxlU3R5bGU6IEFwcC5zaXRlLnRpdGxlU3R5bGUsXG4gICAgICAgIG5hdmJhclN0eWxlOiBBcHAuc2l0ZS5uYXZiYXJTdHlsZSxcbiAgICAgICAgZm9vdGVyU3R5bGU6IEFwcC5zaXRlLmZvb3RlclN0eWxlLFxuICAgICAgICBzaWRlYmFyU3R5bGU6IEFwcC5zaXRlLnNpZGViYXJTdHlsZSxcbiAgICAgICAgZG9tYWluOiBBcHAuc2l0ZS5kb21haW4sXG4gICAgICAgIHllYXI6IChuZXcgRGF0ZSgpKS5nZXRGdWxsWWVhcigpLFxuICAgICAgICB0cmFkZW1hcms6IEFwcC5zaXRlLnRyYWRlbWFyayxcbiAgICAgICAgbG9nbzogQXBwLnNpdGUubG9nby51cmwsXG4gICAgICAgIGxvZ29TdHlsZToge1xuICAgICAgICAgICAgd2lkdGg6IEFwcC5zaXRlLmxvZ28ud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IEFwcC5zaXRlLmxvZ28uaGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dMb2dvOiBBcHAuc2l0ZS5sb2dvLnNob3csXG4gICAgICAgIHNob3dJY29uOiBBcHAuc2l0ZS5pY29uLnNob3csXG4gICAgICAgIGljb246IEFwcC5zaXRlLmljb24ubmFtZSA/IEFwcC5zaXRlLmljb24ubmFtZSA6IG51bGwsXG4gICAgICAgIGljb25Db2xvcjogQXBwLnNpdGUuaWNvbi5jb2xvcixcbiAgICAgICAgdGl0bGU6IEFwcC5zaXRlLnRyYWRlbWFya1xuICAgIH0pLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGlzRGFyayAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXJrQ2xhc3MgPT09IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9taXhpbnMvdGhlbWUuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvYXNzaWduXCIpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfYXNzaWduMi5kZWZhdWx0IHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qc1xuLy8gbW9kdWxlIGlkID0gNjU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTMgMTQgMTUgMTYgMTgiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMyAxNCAxNSAxNiAxOCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTMgMTQgMTUgMTYgMTgiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDY1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEzIDE0IDE1IDE2IDE4IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTMgMTQgMTUgMTYgMTgiLCIvKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGxpc3QgZm9ybWF0IHByb2R1Y2VkIGJ5IGNzcy1sb2FkZXIgaW50byBzb21ldGhpbmdcbiAqIGVhc2llciB0byBtYW5pcHVsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGlkOiBwYXJlbnRJZCArICc6JyArIGksXG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDY2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTIgMTciLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IG51bGxcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LWQ3MjE5ODNjXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL01vZGFsTGF5b3V0LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcbGF5b3V0c1xcXFxNb2RhbExheW91dC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIE1vZGFsTGF5b3V0LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1kNzIxOTgzY1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWQ3MjE5ODNjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTW9kYWxMYXlvdXQudnVlXG4vLyBtb2R1bGUgaWQgPSA2OTVcbi8vIG1vZHVsZSBjaHVua3MgPSA2IDExIDEyIDEzIDE0IDE1IDE2IDE3IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcInYtYXBwXCIsIHsgYXR0cnM6IHsgc3RhbmRhbG9uZTogXCJcIiB9IH0sIFtcbiAgICBfYyhcbiAgICAgIFwibWFpblwiLFxuICAgICAgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicGEtMCBtYS0wIHdoaXRlXCIsXG4gICAgICAgICAgICBhdHRyczogeyB0cmFuc2l0aW9uOiBcInNsaWRlLXgtdHJhbnNpdGlvblwiLCBmbHVpZDogXCJcIiB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyBmbGF0OiB0cnVlIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF92bS5fdChcInRvb2xiYXJcIiksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfdm0uX3QoXCJkZWZhdWx0XCIpLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX3ZtLl90KFwiZm9vdGVyXCIpXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDJcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1kNzIxOTgzY1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtZDcyMTk4M2NcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTW9kYWxMYXlvdXQudnVlXG4vLyBtb2R1bGUgaWQgPSA2OTZcbi8vIG1vZHVsZSBjaHVua3MgPSA2IDExIDEyIDEzIDE0IDE1IDE2IDE3IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTlmYzEzNGUwXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ2hlY2tvdXQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI2M2VkMTM4MFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05ZmMxMzRlMFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0NoZWNrb3V0LnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05ZmMxMzRlMFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0NoZWNrb3V0LnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi05ZmMxMzRlMFwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NoZWNrb3V0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzcyXG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uc3RlcHBlciAuc3RlcHBlcl9fc3RlcC0taW5hY3RpdmUgIC5zdGVwcGVyX19zdGVwX19zdGVwW2RhdGEtdi05ZmMxMzRlMF0ge1xcbiAgICBjb2xvcjogI0JBOUE1QTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkM6L1VzZXJzL3VyaWFoL3NpdGVzL3d3dy9zaG9wL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvQ2hlY2tvdXQudnVlPzZjZTAzMmE3XCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFrSUE7SUFDQSxlQUFBO0NBQ0FcIixcImZpbGVcIjpcIkNoZWNrb3V0LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI8dGVtcGxhdGU+XFxuPG1vZGFsLWxheW91dD5cXG4gICAgPCEtLSBTdGFydCBUb29sQmFyIFNsb3QgLS0+XFxuICAgIDx2LXRvb2xiYXIgY2xhc3M9XFxcImFjY2VudFxcXCIgc2xvdD1cXFwidG9vbGJhclxcXCI+XFxuICAgICAgICA8IS0tIEFycm93IEJhY2sgLS0+XFxuICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVxcXCJlcnJvclxcXCIgQGNsaWNrLm5hdGl2ZT1cXFwicmVkaXJlY3RCYWNrKClcXFwiPlxcbiAgICAgICAgICAgIDx2LWljb24+ZmEtdGltZXM8L3YtaWNvbj5cXG4gICAgICAgIDwvdi1idG4+XFxuXFxuICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cXG4gICAgICAgIDwhLS0gTW9kYWwgVGl0bGUgLS0+XFxuICAgICAgICA8di10b29sYmFyLXRpdGxlIGNsYXNzPVxcXCJ0ZXh0LXhzLWNlbnRlciBwcmltYXJ5LS10ZXh0XFxcIj5cXG4gICAgICAgICAgICBDaGVja291dCBPcmRlciBGb3JtXFxuICAgICAgICA8L3YtdG9vbGJhci10aXRsZT5cXG5cXG4gICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxcblxcbiAgICA8L3YtdG9vbGJhcj5cXG4gICAgPCEtLSBFbmQgVG9vbEJhciBTbG90IC0tPlxcblxcbiAgICA8IS0tIFN0YXJ0IENvbnRlbnQgU2xvdCAtLT5cXG4gICAgPHYtc3RlcHBlciB2LW1vZGVsPVxcXCJzdGVwXFxcIj5cXG5cXG4gICAgICAgIDx2LXN0ZXBwZXItaGVhZGVyPlxcblxcbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cXFwiKGFjdGl2ZSxrZXkpIGluIGdldEFjdGl2ZVN0ZXBzXFxcIj5cXG5cXG4gICAgICAgICAgICAgICAgPHYtc3RlcHBlci1zdGVwXFxuICAgICAgICAgICAgICAgIDprZXk9XFxcImtleVxcXCJcXG4gICAgICAgICAgICAgICAgOnN0ZXA9XFxcInBhcnNlSW50KGtleSArIDEpXFxcIlxcbiAgICAgICAgICAgICAgICA6Y29tcGxldGU9XFxcInBhcnNlSW50KHN0ZXApID4gcGFyc2VJbnQoa2V5ICsgMSlcXFwiXFxuICAgICAgICAgICAgICAgIDpydWxlcz1cXFwiWygpID0+IGdldEFjdGl2ZVN0ZXBzW2tleV0udmFsaWRhdGVkXVxcXCJcXG4gICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInByaW1hcnktLXRleHRcXFwiPnt7IGFjdGl2ZS50aXRsZSB9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDxzbWFsbCBjbGFzcz1cXFwiaW5mby0tdGV4dFxcXCI+e3sgYWN0aXZlLnN1YnRpdGxlIH19PC9zbWFsbD5cXG4gICAgICAgICAgICAgICAgPC92LXN0ZXBwZXItc3RlcD5cXG5cXG4gICAgICAgICAgICAgICAgPHYtZGl2aWRlciA6a2V5PVxcXCJrZXlcXFwiIHYtaWY9XFxcInBhcnNlSW50KGtleSArIDEpICE9PSBnZXRBY3RpdmVTdGVwcy5sZW5ndGhcXFwiPlxcbiAgICAgICAgICAgICAgICA8L3YtZGl2aWRlcj5cXG5cXG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxcblxcbiAgICAgICAgPC92LXN0ZXBwZXItaGVhZGVyPlxcblxcbiAgICAgICAgPHYtc3RlcHBlci1jb250ZW50XFxuICAgICAgICAgICAgOnN0ZXA9XFxcInBhcnNlSW50KGtleSArIDEpXFxcIlxcbiAgICAgICAgICAgIHYtZm9yPVxcXCIoYWN0aXZlLGtleSkgaW4gZ2V0QWN0aXZlU3RlcHNcXFwiXFxuICAgICAgICAgICAgOmtleT1cXFwia2V5XFxcIlxcbiAgICAgICAgPlxcbiAgICAgICAgICAgIDx2LWNhcmQgc3R5bGU9XFxcIm1pbi1oZWlnaHQ6IDYwMHB4O1xcXCI+XFxuICAgICAgICAgICAgICAgIDxjb21wb25lbnQgOmlzPVxcXCJhY3RpdmUuY29tcG9uZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPC9jb21wb25lbnQ+XFxuICAgICAgICAgICAgPC92LWNhcmQ+XFxuXFxuICAgICAgICA8L3Ytc3RlcHBlci1jb250ZW50PlxcblxcbiAgICA8L3Ytc3RlcHBlcj5cXG4gICAgPCEtLSBFbmQgQ29udGVudCBTbG90IC0tPlxcblxcbiAgICA8IS0tIFN0YXJ0IEZvb3RlciBTbG90IC0tPlxcbiAgICA8di1mb290ZXIgOmNsYXNzPVxcXCJbZm9vdGVyQ2xhc3NdXFxcIiBmaXhlZCBzbG90PVxcXCJmb290ZXJcXFwiPlxcbiAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cXG4gICAgPHNwYW4+wqkge3sgeWVhciB9fSB7eyBkb21haW4gfX0gwq4gfCB7eyB0cmFkZW1hcmsgfX3ihKI8L3NwYW4+XFxuICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxcbiAgICA8L3YtZm9vdGVyPlxcbiAgICA8IS0tIEVuZCBGb290ZXIgU2xvdCAtLT5cXG5cXG48L21vZGFsLWxheW91dD5cXG48L3RlbXBsYXRlPlxcblxcbjxzY3JpcHQ+XFxuaW1wb3J0IE1vZGFsTGF5b3V0IGZyb20gJy4uL2xheW91dHMvTW9kYWxMYXlvdXQudnVlJ1xcbmltcG9ydCBPcmRlckRldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9jaGVja291dC9vcmRlci1kZXRhaWxzLnZ1ZSdcXG5pbXBvcnQgU2hpcHBpbmdEZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tvdXQvc2hpcHBpbmctZGV0YWlscy52dWUnXFxuaW1wb3J0IEN1c3RvbWVyRGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrb3V0L2N1c3RvbWVyLWRldGFpbHMudnVlJ1xcbmltcG9ydCBNb2RlT2ZQYXltZW50IGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tvdXQvbW9kZS1vZi1wYXltZW50LnZ1ZSdcXG5pbXBvcnQgU3VjY2Vzc09yZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tvdXQvc3VjY2Vzcy1vcmRlci52dWUnXFxuaW1wb3J0IERlbGl2ZXJ5TWV0aG9kIGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tvdXQvZGVsaXZlcnktbWV0aG9kLnZ1ZSdcXG5pbXBvcnQgVGhlbWUgZnJvbSAnLi4vbWl4aW5zL3RoZW1lJ1xcbmltcG9ydCB7IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH0gZnJvbSAndnVleCdcXG5jb25zdCB7IG1hcEdldHRlcnMsIG1hcE11dGF0aW9ucyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ3dpemFyZCcpXFxuXFxuZXhwb3J0IGRlZmF1bHQge1xcbiAgICBtaXhpbnM6IFtUaGVtZV0sXFxuICAgIGNvbXBvbmVudHM6IHtcXG4gICAgICAgIE1vZGFsTGF5b3V0LFxcbiAgICAgICAgT3JkZXJEZXRhaWxzLFxcbiAgICAgICAgU2hpcHBpbmdEZXRhaWxzLFxcbiAgICAgICAgQ3VzdG9tZXJEZXRhaWxzLFxcbiAgICAgICAgTW9kZU9mUGF5bWVudCxcXG4gICAgICAgIFN1Y2Nlc3NPcmRlcixcXG4gICAgICAgIERlbGl2ZXJ5TWV0aG9kXFxuICAgIH0sXFxuICAgIGRhdGE6ICgpID0+ICh7XFxuICAgICAgICBmb290ZXJDbGFzczogeydwcmltYXJ5LS10ZXh0JzogdHJ1ZSwgJ2FjY2VudCc6IHRydWV9XFxuICAgIH0pLFxcbiAgICBjb21wdXRlZDoge1xcbiAgICAgICAgLi4ubWFwR2V0dGVycyhbXFxuICAgICAgICAgICAgJ2dldEFjdGl2ZVN0ZXBzJyxcXG4gICAgICAgICAgICAnZ2V0U3RlcCdcXG4gICAgICAgIF0pLFxcbiAgICAgICAgc3RlcDoge1xcbiAgICAgICAgICAgIGdldCAoKSB7XFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0ZXBcXG4gICAgICAgICAgICB9LFxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGVwKHZhbHVlKVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfSxcXG4gICAgbWV0aG9kczoge1xcbiAgICAgICAgLi4ubWFwTXV0YXRpb25zKFtcXG4gICAgICAgICAgICAnc2V0U3RlcCcsXFxuICAgICAgICAgICAgJ3NldFN0ZXBzJ1xcbiAgICAgICAgXSksXFxuICAgICAgICByZWRpcmVjdEJhY2sgKCkge1xcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xcbiAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHtwYXRoOiAnL2NhcnQnfSlcXG4gICAgICAgIH1cXG4gICAgfSxcXG4gICAgbW91bnRlZCAoKSB7XFxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcXG4gICAgICAgIC8qIHJlZGlyZWN0IGlmIG5vIEl0ZW0gaW4gdGhlIENhcnQgKi9cXG4gICAgICAgIGlmIChzZWxmLiRzdG9yZS5nZXR0ZXJzWydjYXJ0L2dldENvdW50J10gPT09IDApIHtcXG4gICAgICAgICAgICBzZWxmLiRyb3V0ZXIucHVzaCh7cGF0aDogJy8nfSlcXG4gICAgICAgIH1cXG4gICAgfVxcbn1cXG48L3NjcmlwdD5cXG48c3R5bGUgc2NvcGVkPlxcbi5zdGVwcGVyIC5zdGVwcGVyX19zdGVwLS1pbmFjdGl2ZSAgLnN0ZXBwZXJfX3N0ZXBfX3N0ZXAge1xcbiAgICBjb2xvcjogI0JBOUE1QTtcXG59XFxuPC9zdHlsZT5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtOWZjMTM0ZTBcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9DaGVja291dC52dWVcbi8vIG1vZHVsZSBpZCA9IDc3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCI8dGVtcGxhdGU+XG48bW9kYWwtbGF5b3V0PlxuICAgIDwhLS0gU3RhcnQgVG9vbEJhciBTbG90IC0tPlxuICAgIDx2LXRvb2xiYXIgY2xhc3M9XCJhY2NlbnRcIiBzbG90PVwidG9vbGJhclwiPlxuICAgICAgICA8IS0tIEFycm93IEJhY2sgLS0+XG4gICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJlcnJvclwiIEBjbGljay5uYXRpdmU9XCJyZWRpcmVjdEJhY2soKVwiPlxuICAgICAgICAgICAgPHYtaWNvbj5mYS10aW1lczwvdi1pY29uPlxuICAgICAgICA8L3YtYnRuPlxuXG4gICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICA8IS0tIE1vZGFsIFRpdGxlIC0tPlxuICAgICAgICA8di10b29sYmFyLXRpdGxlIGNsYXNzPVwidGV4dC14cy1jZW50ZXIgcHJpbWFyeS0tdGV4dFwiPlxuICAgICAgICAgICAgQ2hlY2tvdXQgT3JkZXIgRm9ybVxuICAgICAgICA8L3YtdG9vbGJhci10aXRsZT5cblxuICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cblxuICAgIDwvdi10b29sYmFyPlxuICAgIDwhLS0gRW5kIFRvb2xCYXIgU2xvdCAtLT5cblxuICAgIDwhLS0gU3RhcnQgQ29udGVudCBTbG90IC0tPlxuICAgIDx2LXN0ZXBwZXIgdi1tb2RlbD1cInN0ZXBcIj5cblxuICAgICAgICA8di1zdGVwcGVyLWhlYWRlcj5cblxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVwiKGFjdGl2ZSxrZXkpIGluIGdldEFjdGl2ZVN0ZXBzXCI+XG5cbiAgICAgICAgICAgICAgICA8di1zdGVwcGVyLXN0ZXBcbiAgICAgICAgICAgICAgICA6a2V5PVwia2V5XCJcbiAgICAgICAgICAgICAgICA6c3RlcD1cInBhcnNlSW50KGtleSArIDEpXCJcbiAgICAgICAgICAgICAgICA6Y29tcGxldGU9XCJwYXJzZUludChzdGVwKSA+IHBhcnNlSW50KGtleSArIDEpXCJcbiAgICAgICAgICAgICAgICA6cnVsZXM9XCJbKCkgPT4gZ2V0QWN0aXZlU3RlcHNba2V5XS52YWxpZGF0ZWRdXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiPnt7IGFjdGl2ZS50aXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNtYWxsIGNsYXNzPVwiaW5mby0tdGV4dFwiPnt7IGFjdGl2ZS5zdWJ0aXRsZSB9fTwvc21hbGw+XG4gICAgICAgICAgICAgICAgPC92LXN0ZXBwZXItc3RlcD5cblxuICAgICAgICAgICAgICAgIDx2LWRpdmlkZXIgOmtleT1cImtleVwiIHYtaWY9XCJwYXJzZUludChrZXkgKyAxKSAhPT0gZ2V0QWN0aXZlU3RlcHMubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgPC92LWRpdmlkZXI+XG5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgPC92LXN0ZXBwZXItaGVhZGVyPlxuXG4gICAgICAgIDx2LXN0ZXBwZXItY29udGVudFxuICAgICAgICAgICAgOnN0ZXA9XCJwYXJzZUludChrZXkgKyAxKVwiXG4gICAgICAgICAgICB2LWZvcj1cIihhY3RpdmUsa2V5KSBpbiBnZXRBY3RpdmVTdGVwc1wiXG4gICAgICAgICAgICA6a2V5PVwia2V5XCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHYtY2FyZCBzdHlsZT1cIm1pbi1oZWlnaHQ6IDYwMHB4O1wiPlxuICAgICAgICAgICAgICAgIDxjb21wb25lbnQgOmlzPVwiYWN0aXZlLmNvbXBvbmVudFwiPlxuICAgICAgICAgICAgICAgIDwvY29tcG9uZW50PlxuICAgICAgICAgICAgPC92LWNhcmQ+XG5cbiAgICAgICAgPC92LXN0ZXBwZXItY29udGVudD5cblxuICAgIDwvdi1zdGVwcGVyPlxuICAgIDwhLS0gRW5kIENvbnRlbnQgU2xvdCAtLT5cblxuICAgIDwhLS0gU3RhcnQgRm9vdGVyIFNsb3QgLS0+XG4gICAgPHYtZm9vdGVyIDpjbGFzcz1cIltmb290ZXJDbGFzc11cIiBmaXhlZCBzbG90PVwiZm9vdGVyXCI+XG4gICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgPHNwYW4+wqkge3sgeWVhciB9fSB7eyBkb21haW4gfX0gwq4gfCB7eyB0cmFkZW1hcmsgfX3ihKI8L3NwYW4+XG4gICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgPC92LWZvb3Rlcj5cbiAgICA8IS0tIEVuZCBGb290ZXIgU2xvdCAtLT5cblxuPC9tb2RhbC1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1vZGFsTGF5b3V0IGZyb20gJy4uL2xheW91dHMvTW9kYWxMYXlvdXQudnVlJ1xuaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrb3V0L29yZGVyLWRldGFpbHMudnVlJ1xuaW1wb3J0IFNoaXBwaW5nRGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrb3V0L3NoaXBwaW5nLWRldGFpbHMudnVlJ1xuaW1wb3J0IEN1c3RvbWVyRGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrb3V0L2N1c3RvbWVyLWRldGFpbHMudnVlJ1xuaW1wb3J0IE1vZGVPZlBheW1lbnQgZnJvbSAnLi4vY29tcG9uZW50cy9jaGVja291dC9tb2RlLW9mLXBheW1lbnQudnVlJ1xuaW1wb3J0IFN1Y2Nlc3NPcmRlciBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrb3V0L3N1Y2Nlc3Mtb3JkZXIudnVlJ1xuaW1wb3J0IERlbGl2ZXJ5TWV0aG9kIGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tvdXQvZGVsaXZlcnktbWV0aG9kLnZ1ZSdcbmltcG9ydCBUaGVtZSBmcm9tICcuLi9taXhpbnMvdGhlbWUnXG5pbXBvcnQgeyBjcmVhdGVOYW1lc3BhY2VkSGVscGVycyB9IGZyb20gJ3Z1ZXgnXG5jb25zdCB7IG1hcEdldHRlcnMsIG1hcE11dGF0aW9ucyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ3dpemFyZCcpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtaXhpbnM6IFtUaGVtZV0sXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBNb2RhbExheW91dCxcbiAgICAgICAgT3JkZXJEZXRhaWxzLFxuICAgICAgICBTaGlwcGluZ0RldGFpbHMsXG4gICAgICAgIEN1c3RvbWVyRGV0YWlscyxcbiAgICAgICAgTW9kZU9mUGF5bWVudCxcbiAgICAgICAgU3VjY2Vzc09yZGVyLFxuICAgICAgICBEZWxpdmVyeU1ldGhvZFxuICAgIH0sXG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZm9vdGVyQ2xhc3M6IHsncHJpbWFyeS0tdGV4dCc6IHRydWUsICdhY2NlbnQnOiB0cnVlfVxuICAgIH0pLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcEdldHRlcnMoW1xuICAgICAgICAgICAgJ2dldEFjdGl2ZVN0ZXBzJyxcbiAgICAgICAgICAgICdnZXRTdGVwJ1xuICAgICAgICBdKSxcbiAgICAgICAgc3RlcDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGVwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RlcCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICAuLi5tYXBNdXRhdGlvbnMoW1xuICAgICAgICAgICAgJ3NldFN0ZXAnLFxuICAgICAgICAgICAgJ3NldFN0ZXBzJ1xuICAgICAgICBdKSxcbiAgICAgICAgcmVkaXJlY3RCYWNrICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi4kcm91dGVyLnB1c2goe3BhdGg6ICcvY2FydCd9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtb3VudGVkICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIC8qIHJlZGlyZWN0IGlmIG5vIEl0ZW0gaW4gdGhlIENhcnQgKi9cbiAgICAgICAgaWYgKHNlbGYuJHN0b3JlLmdldHRlcnNbJ2NhcnQvZ2V0Q291bnQnXSA9PT0gMCkge1xuICAgICAgICAgICAgc2VsZi4kcm91dGVyLnB1c2goe3BhdGg6ICcvJ30pXG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cbjxzdHlsZSBzY29wZWQ+XG4uc3RlcHBlciAuc3RlcHBlcl9fc3RlcC0taW5hY3RpdmUgIC5zdGVwcGVyX19zdGVwX19zdGVwIHtcbiAgICBjb2xvcjogI0JBOUE1QTtcbn1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQ2hlY2tvdXQudnVlPzZjZTAzMmE3IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02NTMxNmE2NFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9vcmRlci1kZXRhaWxzLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9vcmRlci1kZXRhaWxzLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjUzMTZhNjRcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vb3JkZXItZGV0YWlscy52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXGNoZWNrb3V0XFxcXG9yZGVyLWRldGFpbHMudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBvcmRlci1kZXRhaWxzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi02NTMxNmE2NFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTY1MzE2YTY0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvb3JkZXItZGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDc3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjUzMTZhNjRcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vb3JkZXItZGV0YWlscy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjRiMDRhOWMyXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTY1MzE2YTY0XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL29yZGVyLWRldGFpbHMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTY1MzE2YTY0XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL29yZGVyLWRldGFpbHMudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTY1MzE2YTY0XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvb3JkZXItZGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDc3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIm9yZGVyLWRldGFpbHMudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNjUzMTZhNjRcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9vcmRlci1kZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzc3XG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsIjx0ZW1wbGF0ZT5cbjxkaXY+XG4gICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICBsYWJlbD1cIlRvdGFsIFByaWNlXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInN1YnRvdGFsXCJcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtc2hvcHBpbmctYmFnXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdyB2LWlmPVwicGFyc2VGbG9hdCh0YXgpID4gMFwiPlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiVGF4XCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInRheFwiXG4gICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLXBlcmNlbnRcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93IHYtaWY9XCJjb3VyaWVyICYmIGNvdXJpZXIuZGV0YWlscy5yYXRlID4gMFwiPlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJTaGlwcGluZyBGZWVcIlxuICAgICAgICAgICAgICA6dmFsdWU9XCJjb3VyaWVyLmRldGFpbHMucmF0ZVwiXG4gICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImxvY2FsX3NoaXBwaW5nXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiVG90YWwgQW1vdW50XCJcbiAgICAgICAgICAgICAgOnZhbHVlPVwidG90YWxfYW1vdW50XCJcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtbW9uZXlcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1idG4gdi1pZj1cImNvdXJpZXIgJiYgY291cmllci5zbHVnID09PSdwYXlwYWwnXCIgQGNsaWNrLm5hdGl2ZT1cInBheXBhbGNhbGxiYWNrKClcIiA6bG9hZGluZz1cImNoZWNrT3V0Rm9ybS5idXN5XCIgOmRpc2FibGVkPVwiZXJyb3JzLmFueSgpXCIgIDpjbGFzcz1cIntwcmltYXJ5OiAhY2hlY2tPdXRGb3JtLmJ1c3ksIGVycm9yOiBjaGVja091dEZvcm0uYnVzeX1cIj5QYXkgVmlhIFBheXBhbCA8di1pY29uIHJpZ2h0IGRhcms+ZmEtcGF5cGFsPC92LWljb24+PC92LWJ0bj5cbiAgICAgICAgPHYtYnRuIHYtZWxzZS1pZj1cImNvdXJpZXIgJiYgY291cmllci5zbHVnID09PSdiaXRjb2luJ1wiIEBjbGljay5uYXRpdmU9XCJiaXRjb2luY2FsbGJhY2soKVwiIDpsb2FkaW5nPVwiY2hlY2tPdXRGb3JtLmJ1c3lcIiA6ZGlzYWJsZWQ9XCJlcnJvcnMuYW55KClcIiAgOmNsYXNzPVwie3ByaW1hcnk6ICFjaGVja091dEZvcm0uYnVzeSwgZXJyb3I6IGNoZWNrT3V0Rm9ybS5idXN5fVwiPlBheSBWaWEgQml0Y29pbiA8di1pY29uIHJpZ2h0IGRhcms+ZmEtYnRjPC92LWljb24+PC92LWJ0bj5cbiAgICAgICAgPHYtYnRuIHYtZWxzZS1pZj1cImNvdXJpZXIgJiYgY291cmllci5zbHVnID09PSdjcmVkaXQtY2FyZCdcIiBAY2xpY2submF0aXZlPVwic3RyaXBlY2FsbGJhY2soKVwiIDpsb2FkaW5nPVwiY2hlY2tPdXRGb3JtLmJ1c3lcIiA6ZGlzYWJsZWQ9XCJlcnJvcnMuYW55KClcIiAgOmNsYXNzPVwie3ByaW1hcnk6ICFjaGVja091dEZvcm0uYnVzeSwgZXJyb3I6IGNoZWNrT3V0Rm9ybS5idXN5fVwiPlBheSBWaWEgU3RyaXBlIDx2LWljb24gcmlnaHQgZGFyaz5mYS1jYy1zdHJpcGU8L3YtaWNvbj48L3YtYnRuPlxuICAgICAgICA8di1idG4gdi1lbHNlIEBjbGljay5uYXRpdmU9XCJzdWJtaXQoKVwiIDpsb2FkaW5nPVwiY2hlY2tPdXRGb3JtLmJ1c3lcIiA6ZGlzYWJsZWQ9XCJlcnJvcnMuYW55KClcIiAgOmNsYXNzPVwie3ByaW1hcnk6ICFjaGVja091dEZvcm0uYnVzeSwgZXJyb3I6IGNoZWNrT3V0Rm9ybS5idXN5fVwiPlN1Ym1pdCA8di1pY29uIHJpZ2h0IGRhcms+c2VuZDwvdi1pY29uPjwvdi1idG4+XG4gICAgICAgIDx2LWJ0biA6ZGlzYWJsZWQ9XCJlcnJvcnMuYW55KClcIiBvdXRsaW5lIGNvbG9yPVwicHJpbWFyeVwiIEBjbGljay5uYXRpdmU9XCJiYWNrKClcIj5CYWNrPC92LWJ0bj5cbjwvZGl2PlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfSBmcm9tICd2dWV4J1xuY29uc3QgeyBtYXBBY3Rpb25zLCBtYXBTdGF0ZSB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2NoZWNrb3V0JylcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIGNoZWNrT3V0Rm9ybTogbmV3IEFwcEZvcm0oQXBwLmZvcm1zLmNoZWNrT3V0Rm9ybSlcbiAgICB9KSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICAuLi5tYXBTdGF0ZSh7XG4gICAgICAgICAgICBjdXN0b21lcl9kZXRhaWxzOiBzdGF0ZSA9PiBzdGF0ZS5jdXN0b21lcl9kZXRhaWxzLFxuICAgICAgICAgICAgc2hpcHBpbmdfZGV0YWlsczogc3RhdGUgPT4gc3RhdGUuc2hpcHBpbmdfZGV0YWlscyxcbiAgICAgICAgICAgIGNvdXJpZXI6IHN0YXRlID0+IHN0YXRlLmNvdXJpZXIsXG4gICAgICAgICAgICBtb3A6IHN0YXRlID0+IHN0YXRlLm1vcFxuICAgICAgICB9KSxcbiAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ2NhcnQvZ2V0SXRlbXMnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2NhcnQvc2V0SXRlbXMnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3VidG90YWw6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ2NhcnQvZ2V0U3ViVG90YWwnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2NhcnQvc2V0U3ViVG90YWwnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGF4OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWydjYXJ0L2dldFRheCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnY2FydC9zZXRUYXgnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ2NhcnQvZ2V0VG90YWwnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2NhcnQvc2V0VG90YWwnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3VycmVudDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldEN1cnJlbnQnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRDdXJyZW50JywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRTdGVwJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG5leHQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXROZXh0J11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0TmV4dCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcmV2aW91czoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldFByZXZpb3VzJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0UHJldmlvdXMnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3RlcHMgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRBY3RpdmVTdGVwcyddXG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsX2Ftb3VudCAoKSB7XG4gICAgICAgICAgICBsZXQgdG90YWwgPSB0aGlzLnRvdGFsXG4gICAgICAgICAgICBsZXQgZmVlID0gMFxuICAgICAgICAgICAgaWYgKHRoaXMuY291cmllciAmJiB0aGlzLmNvdXJpZXIuZGV0YWlscy5yYXRlKSB7XG4gICAgICAgICAgICAgICAgdG90YWwgPSB0aGlzLnBhcnNlTnVtYmVyKHRvdGFsKVxuICAgICAgICAgICAgICAgIGZlZSA9IHBhcnNlRmxvYXQodGhpcy5jb3VyaWVyLmRldGFpbHMucmF0ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRvdGFsICsgZmVlKS50b0ZpeGVkKDIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHBhcnNlTnVtYmVyIChzdHIpIHtcbiAgICAgICAgICAgIHZhciBzdHJnID0gc3RyIHx8ICcnXG4gICAgICAgICAgICB2YXIgZGVjaW1hbCA9ICcuJ1xuICAgICAgICAgICAgc3RyZyA9IHN0cmcucmVwbGFjZSgvW14wLTkkLixdL2csICcnKVxuICAgICAgICAgICAgaWYgKHN0cmcuaW5kZXhPZignLCcpID4gc3RyZy5pbmRleE9mKCcuJykpIGRlY2ltYWwgPSAnLCdcbiAgICAgICAgICAgIGlmICgoc3RyZy5tYXRjaChuZXcgUmVnRXhwKCdcXFxcJyArIGRlY2ltYWwsICdnJykpIHx8IFtdKS5sZW5ndGggPiAxKSBkZWNpbWFsID0gJydcbiAgICAgICAgICAgIGlmIChkZWNpbWFsICE9ICcnICYmIChzdHJnLmxlbmd0aCAtIHN0cmcuaW5kZXhPZihkZWNpbWFsKSAtIDEgPT0gMykgJiYgc3RyZy5pbmRleE9mKCcwJyArIGRlY2ltYWwpICE9PSAwKSBkZWNpbWFsID0gJydcbiAgICAgICAgICAgIHN0cmcgPSBzdHJnLnJlcGxhY2UobmV3IFJlZ0V4cCgnW14wLTkkJyArIGRlY2ltYWwgKyAnXScsICdnJyksICcnKVxuICAgICAgICAgICAgc3RyZyA9IHN0cmcucmVwbGFjZSgnLCcsICcuJylcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0cmcpXG4gICAgICAgIH0sXG4gICAgICAgIC4uLm1hcEFjdGlvbnMoW1xuICAgICAgICAgICAgJ2NoZWNrb3V0J1xuICAgICAgICBdKSxcbiAgICAgICAgcGF5cGFsY2FsbGJhY2sgKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BheWluZyB3aXRoIHBheXBhbCcpXG4gICAgICAgIH0sXG4gICAgICAgIGJpdGNvaW5jYWxsYmFjayAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGF5aW5nIHdpdGggYml0Y29pbicpXG4gICAgICAgIH0sXG4gICAgICAgIHN0cmlwZWNhbGxiYWNrICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXlpbmcgd2l0aCBzdHJpcGUnKVxuICAgICAgICB9LFxuICAgICAgICBhc3luYyBzdWJtaXQgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICAvLyBzZXQgQ3VzdG9tZXIgRGV0YWlsc1xuICAgICAgICAgICAgaWYgKF8uZmluZChzZWxmLnN0ZXBzLCB7ICdjb21wb25lbnQnOiAnY3VzdG9tZXItZGV0YWlscycsICdhY3RpdmUnOiB0cnVlIH0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNoZWNrT3V0Rm9ybS5jdXN0b21lcl9kZXRhaWxzID0gc2VsZi5jdXN0b21lcl9kZXRhaWxzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzZXQgRGVsaXZlcnkgTWV0aG9kXG4gICAgICAgICAgICBpZiAoXy5maW5kKHNlbGYuc3RlcHMsIHsgJ2NvbXBvbmVudCc6ICdkZWxpdmVyeS1tZXRob2QnLCAnYWN0aXZlJzogdHJ1ZSB9KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGVja091dEZvcm0uY291cmllciA9IHNlbGYuY291cmllclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0IFNoaXBwaW5nIERldGFpbHNcbiAgICAgICAgICAgIGlmIChfLmZpbmQoc2VsZi5zdGVwcywgeyAnY29tcG9uZW50JzogJ3NoaXBwaW5nLWRldGFpbHMnLCAnYWN0aXZlJzogdHJ1ZSB9KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGVja091dEZvcm0uc2hpcHBpbmdfZGV0YWlscyA9IHNlbGYuc2hpcHBpbmdfZGV0YWlsc1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBObyBTaGlwbWVudFxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLmNoZWNrT3V0Rm9ybS5zaGlwcGluZ19kZXRhaWxzXG4gICAgICAgICAgICAgICAgZGVsZXRlIHNlbGYuY2hlY2tPdXRGb3JtLnNoaXBwaW5nX2ZlZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF8uZmluZChzZWxmLnN0ZXBzLCB7ICdjb21wb25lbnQnOiAnbW9kZS1vZi1wYXltZW50JywgJ2FjdGl2ZSc6IHRydWUgfSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuY2hlY2tPdXRGb3JtLm1vcCA9IHNlbGYubW9wXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzZXQgQ2FydFxuICAgICAgICAgICAgc2VsZi5jaGVja091dEZvcm0uY2FydC5pdGVtcyA9IHNlbGYuaXRlbXNcbiAgICAgICAgICAgIHNlbGYuY2hlY2tPdXRGb3JtLmNhcnQuc3VidG90YWwgPSBzZWxmLnN1YnRvdGFsXG4gICAgICAgICAgICBzZWxmLmNoZWNrT3V0Rm9ybS5jYXJ0LnRheCA9IHNlbGYudGF4XG4gICAgICAgICAgICBzZWxmLmNoZWNrT3V0Rm9ybS5jYXJ0LnRvdGFsID0gc2VsZi50b3RhbFxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgYWxsIGFjdGl2ZSBzdGVwcyBhcmUgdmFsaWRhdGVkXG4gICAgICAgICAgICBsZXQgY291bnQgPSBzZWxmLnN0ZXBzLmxlbmd0aFxuICAgICAgICAgICAgbGV0IHZhbGlkYXRlZCA9IF8uZmlsdGVyKHNlbGYuc3RlcHMsIHsgJ3ZhbGlkYXRlZCc6IHRydWUgfSkubGVuZ3RoXG4gICAgICAgICAgICAvLyBVc3VhbCBFcnJvciBpcyBpZiBhbnkgb2YgdGhlIHN0ZXAgaXMgbm90IHZhbGlkYXRlZCBmb3JtIG9iamVjdCBpcyBub3QgbmV3IHVwXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IHZhbGlkYXRlZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHNlbGYuY2hlY2tvdXQoc2VsZi5jaGVja091dEZvcm0pXG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgY2FydFxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdjYXJ0L3Jlc2V0Q2FydCcpXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgd2l6YXJkXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3dpemFyZC9yZXNldFdpemFyZCcpXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgY2hlY2tvdXQgaXMgYWxyZWFkeSBpbnNpZGUgZGlzcGF0Y2ggY2hlY2tvdXRcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgYnkgY2hhbmNlIG5vdCBhbGwgc3RlcHMgYXJlIHZhbGlkYXRlZCAsIHNob3cgYW4gZXJyb3IgbWVzc2FnZVxuICAgICAgICAgICAgICAgIHNlbGYuJHBvcHVwKHsgbWVzc2FnZTogJ0NoZWNrb3V0IEZvcm0gSGFzIEFuIEVycm9yJywgYmFja2dyb3VuZENvbG9yOiAnI2U1NzM3MycsIGRlbGF5OiA1LCBjb2xvcjogJyNmZmZmZmEnIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmFjayAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuJHZhbGlkYXRvci52YWxpZGF0ZUFsbCgpXG4gICAgICAgICAgICBzZWxmLnNldFZhbGlkYXRlZCgpXG4gICAgICAgICAgICBzZWxmLiRzdG9yZS5kaXNwYXRjaCgnd2l6YXJkL21vdmUnLCBzZWxmLnByZXZpb3VzKVxuICAgICAgICB9LFxuICAgICAgICBzZXRWYWxpZGF0ZWQgKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVycm9ycy5hbnkoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC52YWxpZGF0ZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC52YWxpZGF0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcFZhbGlkYXRlZCcsIHRoaXMuY3VycmVudClcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gb3JkZXItZGV0YWlscy52dWU/NDQxZmY0OWUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVG90YWwgUHJpY2VcIixcbiAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1zaG9wcGluZy1iYWdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc3VidG90YWwsXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5zdWJ0b3RhbCA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic3VidG90YWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIHBhcnNlRmxvYXQoX3ZtLnRheCkgPiAwXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUYXhcIixcbiAgICAgICAgICAgICAgICAgICAgICByZWFkb25seTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLXBlcmNlbnRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0udGF4LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS50YXggPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwidGF4XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmNvdXJpZXIgJiYgX3ZtLmNvdXJpZXIuZGV0YWlscy5yYXRlID4gMFxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2hpcHBpbmcgRmVlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jb3VyaWVyLmRldGFpbHMucmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICByZWFkb25seTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImxvY2FsX3NoaXBwaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVG90YWwgQW1vdW50XCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnRvdGFsX2Ftb3VudCxcbiAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1tb25leVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmNvdXJpZXIgJiYgX3ZtLmNvdXJpZXIuc2x1ZyA9PT0gXCJwYXlwYWxcIlxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgIHByaW1hcnk6ICFfdm0uY2hlY2tPdXRGb3JtLmJ1c3ksXG4gICAgICAgICAgICAgICAgZXJyb3I6IF92bS5jaGVja091dEZvcm0uYnVzeVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5jaGVja091dEZvcm0uYnVzeSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmVycm9ycy5hbnkoKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5wYXlwYWxjYWxsYmFjaygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0uX3YoXCJQYXkgVmlhIFBheXBhbCBcIiksXG4gICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgcmlnaHQ6IFwiXCIsIGRhcms6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiZmEtcGF5cGFsXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uY291cmllciAmJiBfdm0uY291cmllci5zbHVnID09PSBcImJpdGNvaW5cIlxuICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICBwcmltYXJ5OiAhX3ZtLmNoZWNrT3V0Rm9ybS5idXN5LFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IF92bS5jaGVja091dEZvcm0uYnVzeVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5jaGVja091dEZvcm0uYnVzeSxcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uZXJyb3JzLmFueSgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0uYml0Y29pbmNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCJQYXkgVmlhIEJpdGNvaW4gXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgcmlnaHQ6IFwiXCIsIGRhcms6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCJmYS1idGNcIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBfdm0uY291cmllciAmJiBfdm0uY291cmllci5zbHVnID09PSBcImNyZWRpdC1jYXJkXCJcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6ICFfdm0uY2hlY2tPdXRGb3JtLmJ1c3ksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBfdm0uY2hlY2tPdXRGb3JtLmJ1c3lcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBfdm0uY2hlY2tPdXRGb3JtLmJ1c3ksXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uZXJyb3JzLmFueSgpXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5zdHJpcGVjYWxsYmFjaygpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIlBheSBWaWEgU3RyaXBlIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgcmlnaHQ6IFwiXCIsIGRhcms6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcImZhLWNjLXN0cmlwZVwiKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogIV92bS5jaGVja091dEZvcm0uYnVzeSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IF92bS5jaGVja091dEZvcm0uYnVzeVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5jaGVja091dEZvcm0uYnVzeSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5lcnJvcnMuYW55KClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLnN1Ym1pdCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIlN1Ym1pdCBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IHJpZ2h0OiBcIlwiLCBkYXJrOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJzZW5kXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRyczogeyBkaXNhYmxlZDogX3ZtLmVycm9ycy5hbnkoKSwgb3V0bGluZTogXCJcIiwgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgX3ZtLmJhY2soKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW192bS5fdihcIkJhY2tcIildXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTY1MzE2YTY0XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02NTMxNmE2NFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9vcmRlci1kZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzc5XG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTBlN2YzMTJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vc2hpcHBpbmctZGV0YWlscy52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vc2hpcHBpbmctZGV0YWlscy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTEwZTdmMzEyXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3NoaXBwaW5nLWRldGFpbHMudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcY29tcG9uZW50c1xcXFxjaGVja291dFxcXFxzaGlwcGluZy1kZXRhaWxzLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gc2hpcHBpbmctZGV0YWlscy52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMTBlN2YzMTJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0xMGU3ZjMxMlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3NoaXBwaW5nLWRldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA3ODBcbi8vIG1vZHVsZSBjaHVua3MgPSA2IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTEwZTdmMzEyXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3NoaXBwaW5nLWRldGFpbHMudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIzNTY5OWY0NVwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0xMGU3ZjMxMlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9zaGlwcGluZy1kZXRhaWxzLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0xMGU3ZjMxMlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9zaGlwcGluZy1kZXRhaWxzLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0xMGU3ZjMxMlwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3NoaXBwaW5nLWRldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA3ODFcbi8vIG1vZHVsZSBjaHVua3MgPSA2IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJzaGlwcGluZy1kZXRhaWxzLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTEwZTdmMzEyXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc2hpcHBpbmctZGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDc4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCI8dGVtcGxhdGU+XG48di1jb250YWluZXIgZmx1aWQ+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJhZGRyZXNzXzFcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkFkZHJlc3MgMVwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJzaGlwcGluZ19kZXRhaWxzLmFkZHJlc3NfMVwiXG4gICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJhZGRyZXNzXzFcIlxuICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnYWRkcmVzc18xJylcIlxuICAgICAgICAgICAgICBwcmVwZW5kLWljb249XCJmYS1hZGRyZXNzLWJvb2tcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImFkZHJlc3NfMlwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiQWRkcmVzcyAyXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18yXCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImFkZHJlc3NfMlwiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdhZGRyZXNzXzInKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWFkZHJlc3MtYm9vay1vIFwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJjaXR5XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJDaXR5XCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNoaXBwaW5nX2RldGFpbHMuY2l0eVwiXG4gICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJjaXR5XCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2NpdHknKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImxvY2F0aW9uX2NpdHlcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImNvdW50cnlcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkNvdW50cnlcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2hpcHBpbmdfZGV0YWlscy5jb3VudHJ5XCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImNvdW50cnlcIlxuICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnY291bnRyeScpXCJcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtZmFcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgbmFtZT1cInppcF9jb2RlXCJcbiAgICAgICAgICAgIGxhYmVsPVwiWmlwIENvZGVcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInNoaXBwaW5nX2RldGFpbHMuemlwX2NvZGVcIlxuICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiemlwX2NvZGVcIlxuICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ3ppcF9jb2RlJylcIlxuICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwibWFya3VucmVhZF9tYWlsYm94XCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgIG5hbWU9XCJzdGF0ZV9wcm92aW5jZVwiXG4gICAgICAgICAgICBsYWJlbD1cIlN0YXRlIHwgUHJvdmluY2VcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInNoaXBwaW5nX2RldGFpbHMuc3RhdGVfcHJvdmluY2VcIlxuICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgZGF0YS12di1uYW1lPVwic3RhdGVfcHJvdmluY2VcIlxuICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ3N0YXRlX3Byb3ZpbmNlJylcIlxuICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwicGxhY2VcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1idG4gY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cImZvcndhcmQoKVwiPkNvbnRpbnVlPC92LWJ0bj5cbiAgICAgICAgPHYtYnRuIG91dGxpbmUgY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cImJhY2soKVwiPkJhY2s8L3YtYnRuPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L3YtY29udGFpbmVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH0gZnJvbSAndnVleCdcbmNvbnN0IHsgbWFwU3RhdGUsIG1hcE11dGF0aW9ucyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2NoZWNrb3V0JylcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcFN0YXRlKHtcbiAgICAgICAgICAgIHNoaXBwaW5nX2RldGFpbHM6IHN0YXRlID0+IHN0YXRlLnNoaXBwaW5nX2RldGFpbHNcbiAgICAgICAgfSksXG4gICAgICAgIGN1cnJlbnQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRDdXJyZW50J11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0Q3VycmVudCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0U3RlcCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFN0ZXAnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0TmV4dCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldE5leHQnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJldmlvdXM6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRQcmV2aW91cyddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFByZXZpb3VzJywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgLi4ubWFwTXV0YXRpb25zKFtcbiAgICAgICAgICAgICdzZXRTaGlwcGluZ0RldGFpbHMnXG4gICAgICAgIF0pLFxuICAgICAgICBmb3J3YXJkICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi4kdmFsaWRhdG9yLnZhbGlkYXRlQWxsKClcbiAgICAgICAgICAgIHNlbGYuc2V0VmFsaWRhdGVkKClcbiAgICAgICAgICAgIHNlbGYuJHN0b3JlLmRpc3BhdGNoKCd3aXphcmQvbW92ZScsIHNlbGYubmV4dClcbiAgICAgICAgICAgIHNlbGYuc2V0U2hpcHBpbmdEZXRhaWxzKHNlbGYuc2hpcHBpbmdfZGV0YWlscylcbiAgICAgICAgfSxcbiAgICAgICAgYmFjayAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuJHZhbGlkYXRvci52YWxpZGF0ZUFsbCgpXG4gICAgICAgICAgICBzZWxmLnNldFZhbGlkYXRlZCgpXG4gICAgICAgICAgICBzZWxmLiRzdG9yZS5kaXNwYXRjaCgnd2l6YXJkL21vdmUnLCBzZWxmLnByZXZpb3VzKVxuICAgICAgICAgICAgc2VsZi5zZXRTaGlwcGluZ0RldGFpbHMoc2VsZi5zaGlwcGluZ19kZXRhaWxzKVxuICAgICAgICB9LFxuICAgICAgICBzZXRWYWxpZGF0ZWQgKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVycm9ycy5hbnkoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC52YWxpZGF0ZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC52YWxpZGF0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcFZhbGlkYXRlZCcsIHRoaXMuY3VycmVudClcbiAgICAgICAgfVxuXG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzaGlwcGluZy1kZXRhaWxzLnZ1ZT9mMDhhNGVlZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJ2LWNvbnRhaW5lclwiLCB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSwgW1xuICAgIF9jKFxuICAgICAgXCJmb3JtXCIsXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWRkcmVzc18xXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFkZHJlc3MgMVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImFkZHJlc3NfMVwiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImFkZHJlc3NfMVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1hZGRyZXNzLWJvb2tcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzEsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzEgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzaGlwcGluZ19kZXRhaWxzLmFkZHJlc3NfMVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfG1heDoyNTVcIixcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFkZHJlc3NfMlwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJBZGRyZXNzIDJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJhZGRyZXNzXzJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJhZGRyZXNzXzJcIiksXG4gICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtYWRkcmVzcy1ib29rLW8gXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18yLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLnNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18yID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXR5XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNpdHlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJjaXR5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiY2l0eVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJsb2NhdGlvbl9jaXR5XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNoaXBwaW5nX2RldGFpbHMuY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5zaGlwcGluZ19kZXRhaWxzLmNpdHkgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzaGlwcGluZ19kZXRhaWxzLmNpdHlcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb3VudHJ5XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNvdW50cnlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJjb3VudHJ5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiY291bnRyeVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1mYVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaGlwcGluZ19kZXRhaWxzLmNvdW50cnksXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uc2hpcHBpbmdfZGV0YWlscy5jb3VudHJ5ID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2hpcHBpbmdfZGV0YWlscy5jb3VudHJ5XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6aXBfY29kZVwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJaaXAgQ29kZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcInppcF9jb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiemlwX2NvZGVcIiksXG4gICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwibWFya3VucmVhZF9tYWlsYm94XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNoaXBwaW5nX2RldGFpbHMuemlwX2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uc2hpcHBpbmdfZGV0YWlscy56aXBfY29kZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNoaXBwaW5nX2RldGFpbHMuemlwX2NvZGVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXRlX3Byb3ZpbmNlXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0YXRlIHwgUHJvdmluY2VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJzdGF0ZV9wcm92aW5jZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcInN0YXRlX3Byb3ZpbmNlXCIpLFxuICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcInBsYWNlXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNoaXBwaW5nX2RldGFpbHMuc3RhdGVfcHJvdmluY2UsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uc2hpcHBpbmdfZGV0YWlscy5zdGF0ZV9wcm92aW5jZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNoaXBwaW5nX2RldGFpbHMuc3RhdGVfcHJvdmluY2VcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF92bS5mb3J3YXJkKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW192bS5fdihcIkNvbnRpbnVlXCIpXVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgYXR0cnM6IHsgb3V0bGluZTogXCJcIiwgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLmJhY2soKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwiQmFja1wiKV1cbiAgICAgICAgKVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0xMGU3ZjMxMlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMTBlN2YzMTJcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc2hpcHBpbmctZGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDc4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTY1MDY2NTdjXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2N1c3RvbWVyLWRldGFpbHMudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL2N1c3RvbWVyLWRldGFpbHMudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi02NTA2NjU3Y1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9jdXN0b21lci1kZXRhaWxzLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGNvbXBvbmVudHNcXFxcY2hlY2tvdXRcXFxcY3VzdG9tZXItZGV0YWlscy52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIGN1c3RvbWVyLWRldGFpbHMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTY1MDY2NTdjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNjUwNjY1N2NcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9jdXN0b21lci1kZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzg1XG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02NTA2NjU3Y1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9jdXN0b21lci1kZXRhaWxzLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMTE5NmYwMzRcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjUwNjY1N2NcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vY3VzdG9tZXItZGV0YWlscy52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjUwNjY1N2NcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vY3VzdG9tZXItZGV0YWlscy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNjUwNjY1N2NcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9jdXN0b21lci1kZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzg2XG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwiY3VzdG9tZXItZGV0YWlscy52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi02NTA2NjU3Y1wiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L2N1c3RvbWVyLWRldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA3ODdcbi8vIG1vZHVsZSBjaHVua3MgPSA2IiwiPHRlbXBsYXRlPlxuPHYtY29udGFpbmVyIGZsdWlkPlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICBuYW1lPVwiZmlyc3RfbmFtZVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiRmlyc3QgTmFtZVwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJjdXN0b21lcl9kZXRhaWxzLmZpcnN0X25hbWVcIlxuICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiZmlyc3RfbmFtZVwiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdmaXJzdF9uYW1lJylcIlxuICAgICAgICAgICAgICBwcmVwZW5kLWljb249XCJmYS1pZC1jYXJkXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJsYXN0X25hbWVcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkxhc3QgTmFtZVwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJjdXN0b21lcl9kZXRhaWxzLmxhc3RfbmFtZVwiXG4gICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJsYXN0X25hbWVcIlxuICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnbGFzdF9uYW1lJylcIlxuICAgICAgICAgICAgICBwcmVwZW5kLWljb249XCJmYS1pZC1jYXJkLW9cIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiRW1haWxcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwiY3VzdG9tZXJfZGV0YWlscy5lbWFpbFwiXG4gICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8ZW1haWwnXCJcbiAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnZW1haWwnKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImVtYWlsXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgIG5hbWU9XCJjb250YWN0X25vXCJcbiAgICAgICAgICAgIGxhYmVsPVwiQ29udGFjdCBOby5cIlxuICAgICAgICAgICAgdi1tb2RlbD1cImN1c3RvbWVyX2RldGFpbHMuY29udGFjdF9ub1wiXG4gICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG51bWVyaWMnXCJcbiAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImNvbnRhY3Rfbm9cIlxuICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2NvbnRhY3Rfbm8nKVwiXG4gICAgICAgICAgICBwcmVwZW5kLWljb249XCJmYS1waG9uZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWJ0biBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2submF0aXZlPVwiZm9yd2FyZCgpXCI+Q29udGludWU8L3YtYnRuPlxuICAgICAgICA8di1idG4gb3V0bGluZSBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2submF0aXZlPVwidmlld0NhcnQoKVwiPlVwZGF0ZSBDYXJ0PC92LWJ0bj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC92LWNvbnRhaW5lcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBjcmVhdGVOYW1lc3BhY2VkSGVscGVycyB9IGZyb20gJ3Z1ZXgnXG5jb25zdCB7IG1hcFN0YXRlLCBtYXBNdXRhdGlvbnMgfSA9IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzKCdjaGVja291dCcpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb21wdXRlZDoge1xuICAgICAgICAuLi5tYXBTdGF0ZSh7XG4gICAgICAgICAgICBjdXN0b21lcl9kZXRhaWxzOiBzdGF0ZSA9PiBzdGF0ZS5jdXN0b21lcl9kZXRhaWxzXG4gICAgICAgIH0pLFxuICAgICAgICBjdXJyZW50OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0Q3VycmVudCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldEN1cnJlbnQnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3RlcDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldFN0ZXAnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRTdGVwJywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbmV4dDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldE5leHQnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXROZXh0JywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0UHJldmlvdXMnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRQcmV2aW91cycsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgLi4ubWFwTXV0YXRpb25zKFtcbiAgICAgICAgICAgICdzZXRDdXN0b21lckRldGFpbHMnXG4gICAgICAgIF0pLFxuICAgICAgICBmb3J3YXJkICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi4kdmFsaWRhdG9yLnZhbGlkYXRlQWxsKClcbiAgICAgICAgICAgIHNlbGYuc2V0VmFsaWRhdGVkKClcbiAgICAgICAgICAgIHNlbGYuJHN0b3JlLmRpc3BhdGNoKCd3aXphcmQvbW92ZScsIHRoaXMubmV4dClcbiAgICAgICAgICAgIHNlbGYuc2V0Q3VzdG9tZXJEZXRhaWxzKHNlbGYuY3VzdG9tZXJfZGV0YWlscylcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsaWRhdGVkICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5lcnJvcnMuYW55KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQudmFsaWRhdGVkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQudmFsaWRhdGVkID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFN0ZXBWYWxpZGF0ZWQnLCB0aGlzLmN1cnJlbnQpXG4gICAgICAgIH0sXG4gICAgICAgIHZpZXdDYXJ0ICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuJG5leHRUaWNrKCgpID0+IHNlbGYuJHJvdXRlci5wdXNoKHsgbmFtZTogJ2NhcnQnIH0pKVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjdXN0b21lci1kZXRhaWxzLnZ1ZT8yYWQzNmY1MSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJ2LWNvbnRhaW5lclwiLCB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSwgW1xuICAgIF9jKFxuICAgICAgXCJmb3JtXCIsXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlyc3RfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJGaXJzdCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiZmlyc3RfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImZpcnN0X25hbWVcIiksXG4gICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtaWQtY2FyZFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXN0b21lcl9kZXRhaWxzLmZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VzdG9tZXJfZGV0YWlscy5maXJzdF9uYW1lID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiY3VzdG9tZXJfZGV0YWlscy5maXJzdF9uYW1lXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGFzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxhc3QgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImxhc3RfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImxhc3RfbmFtZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1pZC1jYXJkLW9cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY3VzdG9tZXJfZGV0YWlscy5sYXN0X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VzdG9tZXJfZGV0YWlscy5sYXN0X25hbWUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjdXN0b21lcl9kZXRhaWxzLmxhc3RfbmFtZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfGVtYWlsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8ZW1haWwnXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImVtYWlsXCIpLFxuICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmN1c3RvbWVyX2RldGFpbHMuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VzdG9tZXJfZGV0YWlscy5lbWFpbCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImN1c3RvbWVyX2RldGFpbHMuZW1haWxcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bnVtZXJpYydcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb250YWN0X25vXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNvbnRhY3QgTm8uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiY29udGFjdF9ub1wiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImNvbnRhY3Rfbm9cIiksXG4gICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtcGhvbmVcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY3VzdG9tZXJfZGV0YWlscy5jb250YWN0X25vLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1c3RvbWVyX2RldGFpbHMuY29udGFjdF9ubyA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImN1c3RvbWVyX2RldGFpbHMuY29udGFjdF9ub1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLmZvcndhcmQoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwiQ29udGludWVcIildXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhdHRyczogeyBvdXRsaW5lOiBcIlwiLCBjb2xvcjogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdm0udmlld0NhcnQoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwiVXBkYXRlIENhcnRcIildXG4gICAgICAgIClcbiAgICAgIF0sXG4gICAgICAxXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNjUwNjY1N2NcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTY1MDY2NTdjXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L2N1c3RvbWVyLWRldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA3ODlcbi8vIG1vZHVsZSBjaHVua3MgPSA2IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wN2EyNDQ1YlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9tb2RlLW9mLXBheW1lbnQudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL21vZGUtb2YtcGF5bWVudC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTA3YTI0NDViXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL21vZGUtb2YtcGF5bWVudC52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXGNoZWNrb3V0XFxcXG1vZGUtb2YtcGF5bWVudC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIG1vZGUtb2YtcGF5bWVudC52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMDdhMjQ0NWJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0wN2EyNDQ1YlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L21vZGUtb2YtcGF5bWVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDdhMjQ0NWJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbW9kZS1vZi1wYXltZW50LnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiNzlhNjdjMGNcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDdhMjQ0NWJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbW9kZS1vZi1wYXltZW50LnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wN2EyNDQ1YlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9tb2RlLW9mLXBheW1lbnQudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTA3YTI0NDViXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvbW9kZS1vZi1wYXltZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzkxXG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwibW9kZS1vZi1wYXltZW50LnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTA3YTI0NDViXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvbW9kZS1vZi1wYXltZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzkyXG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsIjx0ZW1wbGF0ZT5cbjx2LWNhcmQgZmxhdD5cbiAgICA8di1jYXJkLXRleHQ+XG4gICAgPHYtY29udGFpbmVyIGZsdWlkPlxuICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgPHYtc2VsZWN0XG4gICAgICAgICAgICBsYWJlbD1cIlNlbGVjdFwiXG4gICAgICAgICAgICB2LWJpbmQ6aXRlbXM9XCJnZXRHYXRld2F5c1wiXG4gICAgICAgICAgICB2LW1vZGVsPVwibW9wXCJcbiAgICAgICAgICAgIGl0ZW0tdGV4dD1cIm5hbWVcIlxuICAgICAgICAgICAgaXRlbS12YWx1ZT1cInNsdWdcIlxuICAgICAgICAgICAgbWF4LWhlaWdodD1cIjQwMFwiXG4gICAgICAgICAgICBoaW50PVwiUGF5bWVudCBPcHRpb25zXCJcbiAgICAgICAgICAgIHBlcnNpc3RlbnQtaGludFxuICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgZGF0YS12di1uYW1lPVwibW9wXCJcbiAgICAgICAgICAgIDpyZXR1cm4tb2JqZWN0PVwidHJ1ZVwiXG4gICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnbW9wJylcIlxuICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtbW9uZXlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJzZWxlY3Rpb25cIiBzY29wZT1cImRhdGFcIj5cbiAgICAgICAgICAgICAgICA8di1jaGlwXG4gICAgICAgICAgICAgICAgQGlucHV0PVwiZGF0YS5wYXJlbnQuc2VsZWN0SXRlbShkYXRhLml0ZW0pXCJcbiAgICAgICAgICAgICAgICA6c2VsZWN0ZWQ9XCJkYXRhLnNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICA6a2V5PVwiSlNPTi5zdHJpbmdpZnkoZGF0YS5pdGVtKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx2LWF2YXRhcj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyA6c3JjPVwiZGF0YS5pdGVtLmF2YXRhclwiPlxuICAgICAgICAgICAgICAgIDwvdi1hdmF0YXI+XG4gICAgICAgICAgICAgICAge3sgZGF0YS5pdGVtLm5hbWUgfX1cbiAgICAgICAgICAgICAgICA8L3YtY2hpcD5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cIml0ZW1cIiBzY29wZT1cImRhdGFcIj5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cInR5cGVvZiBkYXRhLml0ZW0gIT09ICdvYmplY3QnXCI+XG4gICAgICAgICAgICAgICAgPHYtbGlzdC10aWxlLWNvbnRlbnQgdi10ZXh0PVwiZGF0YS5pdGVtXCI+PC92LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICA8di1saXN0LXRpbGUtYXZhdGFyPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHYtYmluZDpzcmM9XCJkYXRhLml0ZW0uYXZhdGFyXCIvPlxuICAgICAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtYXZhdGFyPlxuICAgICAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8di1saXN0LXRpbGUtdGl0bGUgdi1odG1sPVwiZGF0YS5pdGVtLm5hbWVcIj48L3YtbGlzdC10aWxlLXRpdGxlPlxuICAgICAgICAgICAgICAgICAgICA8di1saXN0LXRpbGUtc3ViLXRpdGxlIHYtaHRtbD1cImRhdGEuaXRlbS5ncm91cFwiPjwvdi1saXN0LXRpbGUtc3ViLXRpdGxlPlxuICAgICAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtY29udGVudD5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvdi1zZWxlY3Q+XG4gICAgICAgICAgICA8di1idG4gY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cImZvcndhcmQoKVwiPkNvbnRpbnVlPC92LWJ0bj5cbiAgICAgICAgICAgIDx2LWJ0biBvdXRsaW5lIGNvbG9yPVwicHJpbWFyeVwiIEBjbGljay5uYXRpdmU9XCJiYWNrKClcIj5CYWNrPC92LWJ0bj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgPC92LWNvbnRhaW5lcj5cbiAgICA8L3YtY2FyZC10ZXh0PlxuPC92LWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfSBmcm9tICd2dWV4J1xuY29uc3QgeyBtYXBNdXRhdGlvbnMsIG1hcEFjdGlvbnMsIG1hcEdldHRlcnMgfSA9IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzKCdjaGVja291dCcpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb21wdXRlZDoge1xuICAgICAgICAuLi5tYXBHZXR0ZXJzKFtcbiAgICAgICAgICAgICdnZXRNb2RlT2ZQYXltZW50JyxcbiAgICAgICAgICAgICdnZXRHYXRld2F5cydcbiAgICAgICAgXSksXG4gICAgICAgIG1vcDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRNb2RlT2ZQYXltZW50XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9kZU9mUGF5bWVudCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3VycmVudDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldEN1cnJlbnQnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRDdXJyZW50JywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRTdGVwJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG5leHQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXROZXh0J11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0TmV4dCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcmV2aW91czoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldFByZXZpb3VzJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0UHJldmlvdXMnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICBjcmVhdGVkICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0R2F0ZXdheXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaEdhdGV3YXlzKClcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICAuLi5tYXBNdXRhdGlvbnMoW1xuICAgICAgICAgICAgJ3NldE1vZGVPZlBheW1lbnQnXG4gICAgICAgIF0pLFxuICAgICAgICAuLi5tYXBBY3Rpb25zKFtcbiAgICAgICAgICAgICdmZXRjaEdhdGV3YXlzJ1xuICAgICAgICBdKSxcbiAgICAgICAgZm9yd2FyZCAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuJHZhbGlkYXRvci52YWxpZGF0ZUFsbCgpXG4gICAgICAgICAgICBzZWxmLnNldFZhbGlkYXRlZCgpXG4gICAgICAgICAgICBzZWxmLiRzdG9yZS5kaXNwYXRjaCgnd2l6YXJkL21vdmUnLCBzZWxmLm5leHQpXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2sgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLiR2YWxpZGF0b3IudmFsaWRhdGVBbGwoKVxuICAgICAgICAgICAgc2VsZi5zZXRWYWxpZGF0ZWQoKVxuICAgICAgICAgICAgc2VsZi4kc3RvcmUuZGlzcGF0Y2goJ3dpemFyZC9tb3ZlJywgc2VsZi5wcmV2aW91cylcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsaWRhdGVkICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5lcnJvcnMuYW55KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQudmFsaWRhdGVkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQudmFsaWRhdGVkID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFN0ZXBWYWxpZGF0ZWQnLCB0aGlzLmN1cnJlbnQpXG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIG1vZGUtb2YtcGF5bWVudC52dWU/NzM3ZTRjMmEiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1jYXJkXCIsXG4gICAgeyBhdHRyczogeyBmbGF0OiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWNhcmQtdGV4dFwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zZWxlY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IF92bS5nZXRHYXRld2F5cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW0tdGV4dFwiOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW0tdmFsdWVcIjogXCJzbHVnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXgtaGVpZ2h0XCI6IFwiNDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGludDogXCJQYXltZW50IE9wdGlvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwibW9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXR1cm4tb2JqZWN0XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJtb3BcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1tb25leVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJzZWxlY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY2hpcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IEpTT04uc3RyaW5naWZ5KGRhdGEuaXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNlbGVjdGVkOiBkYXRhLnNlbGVjdGVkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wYXJlbnQuc2VsZWN0SXRlbShkYXRhLml0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtYXZhdGFyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzcmM6IGRhdGEuaXRlbS5hdmF0YXIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKGRhdGEuaXRlbS5uYW1lKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcIml0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGRhdGEuaXRlbSAhPT0gXCJvYmplY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWxpc3QtdGlsZS1jb250ZW50XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBfdm0uX3MoZGF0YS5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1saXN0LXRpbGUtYXZhdGFyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBkYXRhLml0ZW0uYXZhdGFyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1saXN0LXRpbGUtY29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtbGlzdC10aWxlLXRpdGxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaXRlbS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWxpc3QtdGlsZS1zdWItdGl0bGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pdGVtLmdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5tb3AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm1vcCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJtb3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmZvcndhcmQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIkNvbnRpbnVlXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgb3V0bGluZTogXCJcIiwgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmJhY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIkJhY2tcIildXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTA3YTI0NDViXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0wN2EyNDQ1YlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9tb2RlLW9mLXBheW1lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3OTRcbi8vIG1vZHVsZSBjaHVua3MgPSA2IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02MjU3YzAyNVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9zdWNjZXNzLW9yZGVyLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9zdWNjZXNzLW9yZGVyLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjI1N2MwMjVcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vc3VjY2Vzcy1vcmRlci52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXGNoZWNrb3V0XFxcXHN1Y2Nlc3Mtb3JkZXIudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBzdWNjZXNzLW9yZGVyLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi02MjU3YzAyNVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTYyNTdjMDI1XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc3VjY2Vzcy1vcmRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDc5NVxuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjI1N2MwMjVcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vc3VjY2Vzcy1vcmRlci52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjYwMmU2ZjRlXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTYyNTdjMDI1XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3N1Y2Nlc3Mtb3JkZXIudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTYyNTdjMDI1XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3N1Y2Nlc3Mtb3JkZXIudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTYyNTdjMDI1XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc3VjY2Vzcy1vcmRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDc5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcInN1Y2Nlc3Mtb3JkZXIudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNjI1N2MwMjVcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9zdWNjZXNzLW9yZGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzk3XG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsIjx0ZW1wbGF0ZT5cbiAgPHYtY2FyZCBjbGFzcz1cImdyZXkgbGlnaHRlbi0xIG1iLTVcIiBoZWlnaHQ9XCIyMDBweFwiPjwvdi1jYXJkPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczogWydlbWFpbCddLFxuICAgIGRhdGE6ICgpID0+ICh7XG5cbiAgICB9KSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGxvZ2luICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbmluZyBJbiBUbyBDdXN0b21lciBEYXNoYm9hcmQnKVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzdWNjZXNzLW9yZGVyLnZ1ZT8xMTVhNjQ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJ2LWNhcmRcIiwge1xuICAgIHN0YXRpY0NsYXNzOiBcImdyZXkgbGlnaHRlbi0xIG1iLTVcIixcbiAgICBhdHRyczogeyBoZWlnaHQ6IFwiMjAwcHhcIiB9XG4gIH0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi02MjU3YzAyNVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNjI1N2MwMjVcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc3VjY2Vzcy1vcmRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDc5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTY5ODU0MjhhXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2RlbGl2ZXJ5LW1ldGhvZC52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vZGVsaXZlcnktbWV0aG9kLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjk4NTQyOGFcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vZGVsaXZlcnktbWV0aG9kLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGNvbXBvbmVudHNcXFxcY2hlY2tvdXRcXFxcZGVsaXZlcnktbWV0aG9kLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gZGVsaXZlcnktbWV0aG9kLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi02OTg1NDI4YVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTY5ODU0MjhhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvZGVsaXZlcnktbWV0aG9kLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODAwXG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02OTg1NDI4YVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9kZWxpdmVyeS1tZXRob2QudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIxNzViZjg2Y1wiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02OTg1NDI4YVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9kZWxpdmVyeS1tZXRob2QudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTY5ODU0MjhhXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2RlbGl2ZXJ5LW1ldGhvZC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNjk4NTQyOGFcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9kZWxpdmVyeS1tZXRob2QudnVlXG4vLyBtb2R1bGUgaWQgPSA4MDFcbi8vIG1vZHVsZSBjaHVua3MgPSA2IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJkZWxpdmVyeS1tZXRob2QudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNjk4NTQyOGFcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9kZWxpdmVyeS1tZXRob2QudnVlXG4vLyBtb2R1bGUgaWQgPSA4MDJcbi8vIG1vZHVsZSBjaHVua3MgPSA2IiwiPHRlbXBsYXRlPlxuPHYtY2FyZCBmbGF0PlxuICAgIDx2LWNhcmQtdGV4dD5cbiAgICA8di1jb250YWluZXIgZmx1aWQ+XG4gICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICA8di1zZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPVwiU2VsZWN0XCJcbiAgICAgICAgICAgIHYtYmluZDppdGVtcz1cImdldENvdXJpZXJzXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJjb3VyaWVyXCJcbiAgICAgICAgICAgIGl0ZW0tdGV4dD1cIm5hbWVcIlxuICAgICAgICAgICAgaXRlbS12YWx1ZT1cInNsdWdcIlxuICAgICAgICAgICAgOmNhY2hlLWl0ZW1zPVwidHJ1ZVwiXG4gICAgICAgICAgICBtYXgtaGVpZ2h0PVwiNDAwXCJcbiAgICAgICAgICAgIGhpbnQ9XCJIb3cgRG8gWW91IFdhbnQgdG8gUmVjZWl2ZSBUaGUgUHJvZHVjdHM/XCJcbiAgICAgICAgICAgIHBlcnNpc3RlbnQtaGludFxuICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiY291cmllclwiXG4gICAgICAgICAgICA6cmV0dXJuLW9iamVjdD1cInRydWVcIlxuICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2NvdXJpZXInKVwiXG4gICAgICAgICAgICBwcmVwZW5kLWljb249XCJsb2NhbF9zaGlwcGluZ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cInNlbGVjdGlvblwiIHNjb3BlPVwiZGF0YVwiPlxuICAgICAgICAgICAgICAgIDx2LWNoaXBcbiAgICAgICAgICAgICAgICBAaW5wdXQ9XCJkYXRhLnBhcmVudC5zZWxlY3RJdGVtKGRhdGEuaXRlbSlcIlxuICAgICAgICAgICAgICAgIDpzZWxlY3RlZD1cImRhdGEuc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgIDprZXk9XCJKU09OLnN0cmluZ2lmeShkYXRhLml0ZW0pXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHYtYXZhdGFyPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIDpzcmM9XCJkYXRhLml0ZW0uYXZhdGFyXCI+XG4gICAgICAgICAgICAgICAgPC92LWF2YXRhcj5cbiAgICAgICAgICAgICAgICB7eyBkYXRhLml0ZW0ubmFtZSB9fVxuICAgICAgICAgICAgICAgIDwvdi1jaGlwPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwiaXRlbVwiIHNjb3BlPVwiZGF0YVwiPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwidHlwZW9mIGRhdGEuaXRlbSAhPT0gJ29iamVjdCdcIj5cbiAgICAgICAgICAgICAgICA8di1saXN0LXRpbGUtY29udGVudCB2LXRleHQ9XCJkYXRhLml0ZW1cIj48L3YtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1hdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgdi1iaW5kOnNyYz1cImRhdGEuaXRlbS5hdmF0YXJcIi8+XG4gICAgICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1hdmF0YXI+XG4gICAgICAgICAgICAgICAgPHYtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDx2LWxpc3QtdGlsZS10aXRsZSB2LWh0bWw9XCJkYXRhLml0ZW0ubmFtZVwiPjwvdi1saXN0LXRpbGUtdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1zdWItdGl0bGUgdi1odG1sPVwiZGF0YS5pdGVtLmdyb3VwXCI+PC92LWxpc3QtdGlsZS1zdWItdGl0bGU+XG4gICAgICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC92LXNlbGVjdD5cbiAgICAgICAgICAgIDx2LWJ0biBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2submF0aXZlPVwiZm9yd2FyZCgpXCI+Q29udGludWU8L3YtYnRuPlxuICAgICAgICAgICAgPHYtYnRuIG91dGxpbmUgY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cImJhY2soKVwiPkJhY2s8L3YtYnRuPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICA8L3YtY29udGFpbmVyPlxuICAgIDwvdi1jYXJkLXRleHQ+XG48L3YtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBjcmVhdGVOYW1lc3BhY2VkSGVscGVycyB9IGZyb20gJ3Z1ZXgnXG5jb25zdCB7IG1hcE11dGF0aW9ucywgbWFwQWN0aW9ucywgbWFwR2V0dGVycyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2NoZWNrb3V0JylcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcEdldHRlcnMoW1xuICAgICAgICAgICAgJ2dldERlbGl2ZXJ5TWV0aG9kJyxcbiAgICAgICAgICAgICdnZXRDb3VyaWVycydcbiAgICAgICAgXSksXG4gICAgICAgIGNvdXJpZXI6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVsaXZlcnlNZXRob2RcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREZWxpdmVyeU1ldGhvZCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3VycmVudDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldEN1cnJlbnQnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRDdXJyZW50JywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRTdGVwJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG5leHQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXROZXh0J11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0TmV4dCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcmV2aW91czoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldFByZXZpb3VzJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0UHJldmlvdXMnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICBjcmVhdGVkICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0Q291cmllcnMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaENvdXJpZXJzKClcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICAuLi5tYXBNdXRhdGlvbnMoW1xuICAgICAgICAgICAgJ3NldERlbGl2ZXJ5TWV0aG9kJ1xuICAgICAgICBdKSxcbiAgICAgICAgLi4ubWFwQWN0aW9ucyhbXG4gICAgICAgICAgICAnZmV0Y2hDb3VyaWVycydcbiAgICAgICAgXSksXG4gICAgICAgIGZvcndhcmQgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLiR2YWxpZGF0b3IudmFsaWRhdGVBbGwoKVxuICAgICAgICAgICAgc2VsZi5zZXRWYWxpZGF0ZWQoKVxuICAgICAgICAgICAgc2VsZi5zZXRBY3RpdmVTdGVwcygpXG4gICAgICAgICAgICBzZWxmLiRzdG9yZS5kaXNwYXRjaCgnd2l6YXJkL21vdmUnLCBzZWxmLm5leHQpXG4gICAgICAgIH0sXG4gICAgICAgIGJhY2sgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLiR2YWxpZGF0b3IudmFsaWRhdGVBbGwoKVxuICAgICAgICAgICAgc2VsZi5zZXRWYWxpZGF0ZWQoKVxuICAgICAgICAgICAgc2VsZi5zZXRBY3RpdmVTdGVwcygpXG4gICAgICAgICAgICBzZWxmLiRzdG9yZS5kaXNwYXRjaCgnd2l6YXJkL21vdmUnLCBzZWxmLnByZXZpb3VzKVxuICAgICAgICB9LFxuICAgICAgICBzZXRWYWxpZGF0ZWQgKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVycm9ycy5hbnkoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC52YWxpZGF0ZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC52YWxpZGF0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcFZhbGlkYXRlZCcsIHRoaXMuY3VycmVudClcbiAgICAgICAgfSxcbiAgICAgICAgc2V0QWN0aXZlU3RlcHMgKCkge1xuICAgICAgICAgICAgbGV0IHBpY2t1cCA9IF8uZmlsdGVyKHRoaXMuZ2V0Q291cmllcnMsIF8uaXRlcmF0ZWUoWydncm91cCcsICdQaWNrIFVwIExvY2F0aW9uJ10pKVxuICAgICAgICAgICAgbGV0IG1lZXR1cCA9IF8uZmlsdGVyKHRoaXMuZ2V0Q291cmllcnMsIF8uaXRlcmF0ZWUoWydncm91cCcsICdNZWV0IFVwJ10pKVxuICAgICAgICAgICAgbGV0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiAnc2hpcHBpbmctZGV0YWlscycsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsdGVyID0gcGlja3VwLmNvbmNhdChtZWV0dXApXG4gICAgICAgICAgICBpZiAoXy5pbmNsdWRlcyhmaWx0ZXIsIHRoaXMuY291cmllcikpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcFN0YXR1cycsIHBheWxvYWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFN0ZXBTdGF0dXMnLCBwYXlsb2FkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGRlbGl2ZXJ5LW1ldGhvZC52dWU/MjNjNWFhMTgiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1jYXJkXCIsXG4gICAgeyBhdHRyczogeyBmbGF0OiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWNhcmQtdGV4dFwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zZWxlY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IF92bS5nZXRDb3VyaWVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW0tdGV4dFwiOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW0tdmFsdWVcIjogXCJzbHVnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYWNoZS1pdGVtc1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4LWhlaWdodFwiOiBcIjQwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiSG93IERvIFlvdSBXYW50IHRvIFJlY2VpdmUgVGhlIFByb2R1Y3RzP1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGVyc2lzdGVudC1oaW50XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJjb3VyaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXR1cm4tb2JqZWN0XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJjb3VyaWVyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwibG9jYWxfc2hpcHBpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwic2VsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNoaXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBKU09OLnN0cmluZ2lmeShkYXRhLml0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzZWxlY3RlZDogZGF0YS5zZWxlY3RlZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucGFyZW50LnNlbGVjdEl0ZW0oZGF0YS5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWF2YXRhclwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBkYXRhLml0ZW0uYXZhdGFyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhkYXRhLml0ZW0ubmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJpdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBkYXRhLml0ZW0gIT09IFwib2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1saXN0LXRpbGUtY29udGVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogX3ZtLl9zKGRhdGEuaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtbGlzdC10aWxlLWF2YXRhclwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogZGF0YS5pdGVtLmF2YXRhciB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtbGlzdC10aWxlLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWxpc3QtdGlsZS10aXRsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLml0ZW0ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1saXN0LXRpbGUtc3ViLXRpdGxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaXRlbS5ncm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY291cmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uY291cmllciA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjb3VyaWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5mb3J3YXJkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJDb250aW51ZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG91dGxpbmU6IFwiXCIsIGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5iYWNrKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJCYWNrXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi02OTg1NDI4YVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNjk4NTQyOGFcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvZGVsaXZlcnktbWV0aG9kLnZ1ZVxuLy8gbW9kdWxlIGlkID0gODA0XG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJtb2RhbC1sYXlvdXRcIixcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LXRvb2xiYXJcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJhY2NlbnRcIiwgYXR0cnM6IHsgc2xvdDogXCJ0b29sYmFyXCIgfSwgc2xvdDogXCJ0b29sYmFyXCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczogeyBmbGF0OiBcIlwiLCBpY29uOiBcIlwiLCBjb2xvcjogXCJlcnJvclwiIH0sXG4gICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgX3ZtLnJlZGlyZWN0QmFjaygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJmYS10aW1lc1wiKV0pXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LXRvb2xiYXItdGl0bGVcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1jZW50ZXIgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgQ2hlY2tvdXQgT3JkZXIgRm9ybVxcbiAgICAgICAgXCIpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1zdGVwcGVyXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgdmFsdWU6IF92bS5zdGVwLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICBfdm0uc3RlcCA9ICQkdlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4cHJlc3Npb246IFwic3RlcFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtc3RlcHBlci1oZWFkZXJcIixcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS5nZXRBY3RpdmVTdGVwcywgZnVuY3Rpb24oYWN0aXZlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1zdGVwcGVyLXN0ZXBcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiBwYXJzZUludChrZXkgKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBwYXJzZUludChfdm0uc3RlcCkgPiBwYXJzZUludChrZXkgKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uZ2V0QWN0aXZlU3RlcHNba2V5XS52YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKGFjdGl2ZS50aXRsZSkpXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInNtYWxsXCIsIHsgc3RhdGljQ2xhc3M6IFwiaW5mby0tdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoYWN0aXZlLnN1YnRpdGxlKSlcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KGtleSArIDEpICE9PSBfdm0uZ2V0QWN0aXZlU3RlcHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJ2LWRpdmlkZXJcIiwgeyBrZXk6IGtleSB9KVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDJcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLl9sKF92bS5nZXRBY3RpdmVTdGVwcywgZnVuY3Rpb24oYWN0aXZlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgXCJ2LXN0ZXBwZXItY29udGVudFwiLFxuICAgICAgICAgICAgICB7IGtleToga2V5LCBhdHRyczogeyBzdGVwOiBwYXJzZUludChrZXkgKyAxKSB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAgICB7IHN0YXRpY1N0eWxlOiB7IFwibWluLWhlaWdodFwiOiBcIjYwMHB4XCIgfSB9LFxuICAgICAgICAgICAgICAgICAgW19jKGFjdGl2ZS5jb21wb25lbnQsIHsgdGFnOiBcImNvbXBvbmVudFwiIH0pXSxcbiAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAyXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtZm9vdGVyXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzczogW192bS5mb290ZXJDbGFzc10sXG4gICAgICAgICAgYXR0cnM6IHsgc2xvdDogXCJmb290ZXJcIiwgZml4ZWQ6IFwiXCIgfSxcbiAgICAgICAgICBzbG90OiBcImZvb3RlclwiXG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgXCLCqSBcIiArXG4gICAgICAgICAgICAgICAgX3ZtLl9zKF92bS55ZWFyKSArXG4gICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uZG9tYWluKSArXG4gICAgICAgICAgICAgICAgXCIgwq4gfCBcIiArXG4gICAgICAgICAgICAgICAgX3ZtLl9zKF92bS50cmFkZW1hcmspICtcbiAgICAgICAgICAgICAgICBcIuKEolwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtOWZjMTM0ZTBcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTlmYzEzNGUwXCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NoZWNrb3V0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gODA1XG4vLyBtb2R1bGUgY2h1bmtzID0gNiJdLCJzb3VyY2VSb290IjoiIn0=