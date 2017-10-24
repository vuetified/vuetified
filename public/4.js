webpackJsonp([4],{

/***/ 632:
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
  __webpack_require__(753)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(755)
/* template */
var __vue_template__ = __webpack_require__(786)
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

var listToStyles = __webpack_require__(658)

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

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(653);

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

/***/ 653:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(654), __esModule: true };

/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(655);
module.exports = __webpack_require__(31).Object.assign;


/***/ }),

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(60);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(656) });


/***/ }),

/***/ 656:
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

/***/ 658:
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

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = null
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

/***/ 693:
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

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(754);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(651)("63ed1380", content, false);
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

/***/ 754:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(632)(true);
// imports


// module
exports.push([module.i, "\n.stepper .stepper__step--inactive  .stepper__step__step[data-v-9fc134e0] {\n    color: #BA9A5A;\n}\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/pages/Checkout.vue?6ce032a7"],"names":[],"mappings":";AAkIA;IACA,eAAA;CACA","file":"Checkout.vue","sourcesContent":["<template>\n<modal-layout>\n    <!-- Start ToolBar Slot -->\n    <v-toolbar class=\"accent\" slot=\"toolbar\">\n        <!-- Arrow Back -->\n        <v-btn flat icon color=\"error\" @click.native=\"redirectBack()\">\n            <v-icon>fa-times</v-icon>\n        </v-btn>\n\n        <v-spacer></v-spacer>\n        <!-- Modal Title -->\n        <v-toolbar-title class=\"text-xs-center primary--text\">\n            Checkout Order Form\n        </v-toolbar-title>\n\n        <v-spacer></v-spacer>\n\n    </v-toolbar>\n    <!-- End ToolBar Slot -->\n\n    <!-- Start Content Slot -->\n    <v-stepper v-model=\"step\">\n\n        <v-stepper-header>\n\n            <template v-for=\"(active,key) in getActiveSteps\">\n\n                <v-stepper-step\n                :key=\"key\"\n                :step=\"parseInt(key + 1)\"\n                :complete=\"parseInt(step) > parseInt(key + 1)\"\n                :rules=\"[() => getActiveSteps[key].validated]\"\n                >\n                    <span class=\"primary--text\">{{ active.title }}</span>\n                    <small class=\"info--text\">{{ active.subtitle }}</small>\n                </v-stepper-step>\n\n                <v-divider :key=\"key\" v-if=\"parseInt(key + 1) !== getActiveSteps.length\">\n                </v-divider>\n\n            </template>\n\n        </v-stepper-header>\n\n        <v-stepper-content\n            :step=\"parseInt(key + 1)\"\n            v-for=\"(active,key) in getActiveSteps\"\n            :key=\"key\"\n        >\n            <v-card style=\"min-height: 600px;\">\n                <component :is=\"active.component\">\n                </component>\n            </v-card>\n\n        </v-stepper-content>\n\n    </v-stepper>\n    <!-- End Content Slot -->\n\n    <!-- Start Footer Slot -->\n    <v-footer :class=\"[footerClass]\" fixed slot=\"footer\">\n    <v-spacer></v-spacer>\n    <span>© {{ year }} {{ domain }} ® | {{ trademark }}™</span>\n    <v-spacer></v-spacer>\n    </v-footer>\n    <!-- End Footer Slot -->\n\n</modal-layout>\n</template>\n\n<script>\nimport ModalLayout from '../layouts/ModalLayout.vue'\nimport OrderDetails from '../components/checkout/order-details.vue'\nimport ShippingDetails from '../components/checkout/shipping-details.vue'\nimport CustomerDetails from '../components/checkout/customer-details.vue'\nimport ModeOfPayment from '../components/checkout/mode-of-payment.vue'\nimport SuccessOrder from '../components/checkout/success-order.vue'\nimport DeliveryMethod from '../components/checkout/delivery-method.vue'\nimport Theme from '../mixins/theme'\nimport { createNamespacedHelpers } from 'vuex'\nconst { mapGetters, mapMutations } = createNamespacedHelpers('wizard')\n\nexport default {\n    mixins: [Theme],\n    components: {\n        ModalLayout,\n        OrderDetails,\n        ShippingDetails,\n        CustomerDetails,\n        ModeOfPayment,\n        SuccessOrder,\n        DeliveryMethod\n    },\n    data: () => ({\n        footerClass: {'primary--text': true, 'accent': true}\n    }),\n    computed: {\n        ...mapGetters([\n            'getActiveSteps',\n            'getStep'\n        ]),\n        step: {\n            get () {\n                return this.getStep\n            },\n            set (value) {\n                this.setStep(value)\n            }\n        }\n    },\n    methods: {\n        ...mapMutations([\n            'setStep',\n            'setSteps'\n        ]),\n        redirectBack () {\n            let self = this\n            self.$router.push({path: '/cart'})\n        }\n    },\n    mounted () {\n        let self = this\n        /* redirect if no Item in the Cart */\n        if (self.$store.getters['cart/getCount'] === 0) {\n            self.$router.push({path: '/'})\n        }\n    }\n}\n</script>\n<style scoped>\n.stepper .stepper__step--inactive  .stepper__step__step {\n    color: #BA9A5A;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout_vue__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_checkout_order_details_vue__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_checkout_order_details_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_checkout_order_details_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_checkout_shipping_details_vue__ = __webpack_require__(761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_checkout_shipping_details_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_checkout_shipping_details_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_checkout_customer_details_vue__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_checkout_customer_details_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_checkout_customer_details_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_checkout_mode_of_payment_vue__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_checkout_mode_of_payment_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_checkout_mode_of_payment_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_checkout_success_order_vue__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_checkout_success_order_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_checkout_success_order_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_checkout_delivery_method_vue__ = __webpack_require__(781);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_checkout_delivery_method_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_checkout_delivery_method_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_theme__ = __webpack_require__(650);
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

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(757)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(759)
/* template */
var __vue_template__ = __webpack_require__(760)
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

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(758);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(651)("4b04a9c2", content, false);
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

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(632)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"order-details.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(652);
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



var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["createNamespacedHelpers"])('checkout'),
    mapActions = _createNamespacedHelp.mapActions,
    mapState = _createNamespacedHelp.mapState;

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            checkOutForm: new AppForm(App.forms.checkOutForm)
        };
    },
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapState({
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
            var total = parseFloat(this.total);
            var fee = 0;
            if (this.courier && this.courier.details.rate) {
                fee = parseFloat(this.courier.details.rate);
            }
            return (total + fee).toFixed(2);
        }
    }),
    methods: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapActions(['checkout']), {
        paypalcallback: function paypalcallback() {
            console.log('paying with paypal');
        },
        bitcoincallback: function bitcoincallback() {
            console.log('paying with bitcoin');
        },
        stripecallback: function stripecallback() {
            console.log('paying with stripe');
        },
        submit: function submit() {
            var self = this;
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
            var count = self.steps.length;
            var validated = _.filter(self.steps, { 'validated': true }).length;
            // Usual Error is if any of the step is not validated form object is not new up
            if (count === validated) {
                self.checkout(self.checkOutForm);
                // empty cart
                this.$store.dispatch('cart/resetCart');
                // reset wizard
                this.$store.dispatch('wizard/resetWizard');
                // reset checkout is already inside dispatch checkout
                self.$router.push({ name: 'home' });
            } else {
                // if by chance not all steps are validated , show an error message
                self.$popup({ message: 'Checkout Form Has An Error', backgroundColor: '#e57373', delay: 5, color: '#fffffa' });
            }
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

/***/ 760:
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
      _vm.tax > 0
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

/***/ 761:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(762)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(764)
/* template */
var __vue_template__ = __webpack_require__(765)
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

/***/ 762:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(763);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(651)("35699f45", content, false);
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

/***/ 763:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(632)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"shipping-details.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 764:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(652);
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

/***/ 765:
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

/***/ 766:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(767)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(769)
/* template */
var __vue_template__ = __webpack_require__(770)
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

/***/ 767:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(768);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(651)("1196f034", content, false);
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

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(632)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"customer-details.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(652);
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

/***/ 770:
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

/***/ 771:
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
var __vue_template__ = __webpack_require__(775)
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

/***/ 772:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(773);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(651)("79a67c0c", content, false);
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

/***/ 773:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(632)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"mode-of-payment.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(652);
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

/***/ 775:
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
                            "error-messages": _vm.errors.collect("mop")
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

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(777)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(779)
/* template */
var __vue_template__ = __webpack_require__(780)
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

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(778);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(651)("602e6f4e", content, false);
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

/***/ 778:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(632)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"success-order.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 779:
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

/***/ 780:
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

/***/ 781:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(782)
}
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(784)
/* template */
var __vue_template__ = __webpack_require__(785)
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

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(783);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(651)("175bf86c", content, false);
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

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(632)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"delivery-method.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 784:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(652);
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
            if (_.includes(pickup, this.courier) | _.includes(meetup, this.courier)) {
                payload.active = false;
                this.$store.commit('wizard/setStepStatus', payload);
            } else {
                this.$store.commit('wizard/setStepStatus', payload);
            }
        }
    })
});

/***/ }),

/***/ 785:
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
                            "error-messages": _vm.errors.collect("courier")
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

/***/ 786:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9DaGVja291dC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9taXhpbnMvdGhlbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9sYXlvdXRzL01vZGFsTGF5b3V0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTW9kYWxMYXlvdXQudnVlP2M3MDUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9DaGVja291dC52dWU/MWU0MyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NoZWNrb3V0LnZ1ZT83YTlhIiwid2VicGFjazovLy9DaGVja291dC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L29yZGVyLWRldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9vcmRlci1kZXRhaWxzLnZ1ZT9jNzM2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9vcmRlci1kZXRhaWxzLnZ1ZT9kNGE2Iiwid2VicGFjazovLy9vcmRlci1kZXRhaWxzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvb3JkZXItZGV0YWlscy52dWU/ZDYzMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc2hpcHBpbmctZGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3NoaXBwaW5nLWRldGFpbHMudnVlP2RmMTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3NoaXBwaW5nLWRldGFpbHMudnVlPzEwZGYiLCJ3ZWJwYWNrOi8vL3NoaXBwaW5nLWRldGFpbHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9zaGlwcGluZy1kZXRhaWxzLnZ1ZT9jOWE4Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9jdXN0b21lci1kZXRhaWxzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvY3VzdG9tZXItZGV0YWlscy52dWU/Y2YyOCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvY3VzdG9tZXItZGV0YWlscy52dWU/ZmYzNSIsIndlYnBhY2s6Ly8vY3VzdG9tZXItZGV0YWlscy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L2N1c3RvbWVyLWRldGFpbHMudnVlPzhhNTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L21vZGUtb2YtcGF5bWVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L21vZGUtb2YtcGF5bWVudC52dWU/NWE1NSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvbW9kZS1vZi1wYXltZW50LnZ1ZT9hNTRjIiwid2VicGFjazovLy9tb2RlLW9mLXBheW1lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9tb2RlLW9mLXBheW1lbnQudnVlPzk2NTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3N1Y2Nlc3Mtb3JkZXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9zdWNjZXNzLW9yZGVyLnZ1ZT9hNTFjIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9zdWNjZXNzLW9yZGVyLnZ1ZT9jNTc1Iiwid2VicGFjazovLy9zdWNjZXNzLW9yZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc3VjY2Vzcy1vcmRlci52dWU/YWIzNCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvZGVsaXZlcnktbWV0aG9kLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvZGVsaXZlcnktbWV0aG9kLnZ1ZT9hZTk5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9kZWxpdmVyeS1tZXRob2QudnVlP2M0Y2MiLCJ3ZWJwYWNrOi8vL2RlbGl2ZXJ5LW1ldGhvZC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L2RlbGl2ZXJ5LW1ldGhvZC52dWU/NmZjMCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NoZWNrb3V0LnZ1ZT9iMjFlIl0sIm5hbWVzIjpbImRhdGEiLCJkYXJrQ2xhc3MiLCJBcHAiLCJ0aGVtZSIsImRhcmsiLCJwcmltYXJ5Q2xhc3MiLCJwcmltYXJ5IiwiYWNjZW50Q2xhc3MiLCJhY2NlbnQiLCJzZWNvbmRhcnlDbGFzcyIsInNlY29uZGFyeSIsImluZm9DbGFzcyIsImluZm8iLCJ3YXJuaW5nQ2xhc3MiLCJ3YXJuaW5nIiwiZXJyb3JDbGFzcyIsImVycm9yIiwic3VjY2Vzc0NsYXNzIiwic3VjY2VzcyIsInRvZ2dsZUJhclN0eWxlIiwic2l0ZSIsInRpdGxlU3R5bGUiLCJuYXZiYXJTdHlsZSIsImZvb3RlclN0eWxlIiwic2lkZWJhclN0eWxlIiwiZG9tYWluIiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRyYWRlbWFyayIsImxvZ28iLCJ1cmwiLCJsb2dvU3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsInNob3dMb2dvIiwic2hvdyIsInNob3dJY29uIiwiaWNvbiIsIm5hbWUiLCJpY29uQ29sb3IiLCJjb2xvciIsInRpdGxlIiwiY29tcHV0ZWQiLCJpc0RhcmsiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esa0NBQWtDLCtCQUErQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsNEJBQTRCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxXQUFXO0FBQ2xEO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFtQiwwQkFBMEIsRUFBRTtBQUM5RDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZSx3QkFBd0IsRUFBRTtBQUM1RCx5Q0FBeUMsbUJBQW1CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw0QkFBNEI7QUFDOUM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDE1IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05ZmMxMzRlMFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0NoZWNrb3V0LnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9DaGVja291dC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTlmYzEzNGUwXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQ2hlY2tvdXQudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtOWZjMTM0ZTBcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFnZXNcXFxcQ2hlY2tvdXQudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBDaGVja291dC52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtOWZjMTM0ZTBcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi05ZmMxMzRlMFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9DaGVja291dC52dWVcbi8vIG1vZHVsZSBpZCA9IDY0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvKipcbiAqIEV4cG9ydCB0aGUgQW55IENvbXBvbmVudFxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgZGFya0NsYXNzOiBBcHAudGhlbWUuZGFyayxcbiAgICAgICAgcHJpbWFyeUNsYXNzOiBBcHAudGhlbWUucHJpbWFyeSxcbiAgICAgICAgYWNjZW50Q2xhc3M6IEFwcC50aGVtZS5hY2NlbnQsXG4gICAgICAgIHNlY29uZGFyeUNsYXNzOiBBcHAudGhlbWUuc2Vjb25kYXJ5LFxuICAgICAgICBpbmZvQ2xhc3M6IEFwcC50aGVtZS5pbmZvLFxuICAgICAgICB3YXJuaW5nQ2xhc3M6IEFwcC50aGVtZS53YXJuaW5nLFxuICAgICAgICBlcnJvckNsYXNzOiBBcHAudGhlbWUuZXJyb3IsXG4gICAgICAgIHN1Y2Nlc3NDbGFzczogQXBwLnRoZW1lLnN1Y2Nlc3MsXG4gICAgICAgIHRvZ2dsZUJhclN0eWxlOiBBcHAuc2l0ZS50b2dnbGVCYXJTdHlsZSxcbiAgICAgICAgdGl0bGVTdHlsZTogQXBwLnNpdGUudGl0bGVTdHlsZSxcbiAgICAgICAgbmF2YmFyU3R5bGU6IEFwcC5zaXRlLm5hdmJhclN0eWxlLFxuICAgICAgICBmb290ZXJTdHlsZTogQXBwLnNpdGUuZm9vdGVyU3R5bGUsXG4gICAgICAgIHNpZGViYXJTdHlsZTogQXBwLnNpdGUuc2lkZWJhclN0eWxlLFxuICAgICAgICBkb21haW46IEFwcC5zaXRlLmRvbWFpbixcbiAgICAgICAgeWVhcjogKG5ldyBEYXRlKCkpLmdldEZ1bGxZZWFyKCksXG4gICAgICAgIHRyYWRlbWFyazogQXBwLnNpdGUudHJhZGVtYXJrLFxuICAgICAgICBsb2dvOiBBcHAuc2l0ZS5sb2dvLnVybCxcbiAgICAgICAgbG9nb1N0eWxlOiB7XG4gICAgICAgICAgICB3aWR0aDogQXBwLnNpdGUubG9nby53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogQXBwLnNpdGUubG9nby5oZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd0xvZ286IEFwcC5zaXRlLmxvZ28uc2hvdyxcbiAgICAgICAgc2hvd0ljb246IEFwcC5zaXRlLmljb24uc2hvdyxcbiAgICAgICAgaWNvbjogQXBwLnNpdGUuaWNvbi5uYW1lID8gQXBwLnNpdGUuaWNvbi5uYW1lIDogbnVsbCxcbiAgICAgICAgaWNvbkNvbG9yOiBBcHAuc2l0ZS5pY29uLmNvbG9yLFxuICAgICAgICB0aXRsZTogQXBwLnNpdGUudHJhZGVtYXJrXG4gICAgfSksXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgaXNEYXJrICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhcmtDbGFzcyA9PT0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21peGlucy90aGVtZS5qcyIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2NTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDE1IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiKTtcblxudmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2Fzc2lnbjIuZGVmYXVsdCB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanNcbi8vIG1vZHVsZSBpZCA9IDY1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMTYiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE2IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE2IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE2IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNiIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxNSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gbnVsbFxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZDcyMTk4M2NcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vTW9kYWxMYXlvdXQudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxsYXlvdXRzXFxcXE1vZGFsTGF5b3V0LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gTW9kYWxMYXlvdXQudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LWQ3MjE5ODNjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtZDcyMTk4M2NcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9Nb2RhbExheW91dC52dWVcbi8vIG1vZHVsZSBpZCA9IDY5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDQgMTAgMTEgMTIgMTMgMTQgMTUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwidi1hcHBcIiwgeyBhdHRyczogeyBzdGFuZGFsb25lOiBcIlwiIH0gfSwgW1xuICAgIF9jKFxuICAgICAgXCJtYWluXCIsXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwYS0wIG1hLTAgd2hpdGVcIixcbiAgICAgICAgICAgIGF0dHJzOiB7IHRyYW5zaXRpb246IFwic2xpZGUteC10cmFuc2l0aW9uXCIsIGZsdWlkOiBcIlwiIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IGZsYXQ6IHRydWUgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX3ZtLl90KFwidG9vbGJhclwiKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF92bS5fdChcImRlZmF1bHRcIiksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfdm0uX3QoXCJmb290ZXJcIilcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICBdLFxuICAgICAgMVxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LWQ3MjE5ODNjXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi1kNzIxOTgzY1wiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9Nb2RhbExheW91dC52dWVcbi8vIG1vZHVsZSBpZCA9IDY5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDQgMTAgMTEgMTIgMTMgMTQgMTUiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOWZjMTM0ZTBcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9DaGVja291dC52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjYzZWQxMzgwXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTlmYzEzNGUwXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ2hlY2tvdXQudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTlmYzEzNGUwXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ2hlY2tvdXQudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTlmYzEzNGUwXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvQ2hlY2tvdXQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NTNcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5zdGVwcGVyIC5zdGVwcGVyX19zdGVwLS1pbmFjdGl2ZSAgLnN0ZXBwZXJfX3N0ZXBfX3N0ZXBbZGF0YS12LTlmYzEzNGUwXSB7XFxuICAgIGNvbG9yOiAjQkE5QTVBO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovVXNlcnMvdXJpYWgvc2l0ZXMvd3d3L3Nob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9DaGVja291dC52dWU/NmNlMDMyYTdcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQWtJQTtJQUNBLGVBQUE7Q0FDQVwiLFwiZmlsZVwiOlwiQ2hlY2tvdXQudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjx0ZW1wbGF0ZT5cXG48bW9kYWwtbGF5b3V0PlxcbiAgICA8IS0tIFN0YXJ0IFRvb2xCYXIgU2xvdCAtLT5cXG4gICAgPHYtdG9vbGJhciBjbGFzcz1cXFwiYWNjZW50XFxcIiBzbG90PVxcXCJ0b29sYmFyXFxcIj5cXG4gICAgICAgIDwhLS0gQXJyb3cgQmFjayAtLT5cXG4gICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XFxcImVycm9yXFxcIiBAY2xpY2submF0aXZlPVxcXCJyZWRpcmVjdEJhY2soKVxcXCI+XFxuICAgICAgICAgICAgPHYtaWNvbj5mYS10aW1lczwvdi1pY29uPlxcbiAgICAgICAgPC92LWJ0bj5cXG5cXG4gICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxcbiAgICAgICAgPCEtLSBNb2RhbCBUaXRsZSAtLT5cXG4gICAgICAgIDx2LXRvb2xiYXItdGl0bGUgY2xhc3M9XFxcInRleHQteHMtY2VudGVyIHByaW1hcnktLXRleHRcXFwiPlxcbiAgICAgICAgICAgIENoZWNrb3V0IE9yZGVyIEZvcm1cXG4gICAgICAgIDwvdi10b29sYmFyLXRpdGxlPlxcblxcbiAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XFxuXFxuICAgIDwvdi10b29sYmFyPlxcbiAgICA8IS0tIEVuZCBUb29sQmFyIFNsb3QgLS0+XFxuXFxuICAgIDwhLS0gU3RhcnQgQ29udGVudCBTbG90IC0tPlxcbiAgICA8di1zdGVwcGVyIHYtbW9kZWw9XFxcInN0ZXBcXFwiPlxcblxcbiAgICAgICAgPHYtc3RlcHBlci1oZWFkZXI+XFxuXFxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVxcXCIoYWN0aXZlLGtleSkgaW4gZ2V0QWN0aXZlU3RlcHNcXFwiPlxcblxcbiAgICAgICAgICAgICAgICA8di1zdGVwcGVyLXN0ZXBcXG4gICAgICAgICAgICAgICAgOmtleT1cXFwia2V5XFxcIlxcbiAgICAgICAgICAgICAgICA6c3RlcD1cXFwicGFyc2VJbnQoa2V5ICsgMSlcXFwiXFxuICAgICAgICAgICAgICAgIDpjb21wbGV0ZT1cXFwicGFyc2VJbnQoc3RlcCkgPiBwYXJzZUludChrZXkgKyAxKVxcXCJcXG4gICAgICAgICAgICAgICAgOnJ1bGVzPVxcXCJbKCkgPT4gZ2V0QWN0aXZlU3RlcHNba2V5XS52YWxpZGF0ZWRdXFxcIlxcbiAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwicHJpbWFyeS0tdGV4dFxcXCI+e3sgYWN0aXZlLnRpdGxlIH19PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPHNtYWxsIGNsYXNzPVxcXCJpbmZvLS10ZXh0XFxcIj57eyBhY3RpdmUuc3VidGl0bGUgfX08L3NtYWxsPlxcbiAgICAgICAgICAgICAgICA8L3Ytc3RlcHBlci1zdGVwPlxcblxcbiAgICAgICAgICAgICAgICA8di1kaXZpZGVyIDprZXk9XFxcImtleVxcXCIgdi1pZj1cXFwicGFyc2VJbnQoa2V5ICsgMSkgIT09IGdldEFjdGl2ZVN0ZXBzLmxlbmd0aFxcXCI+XFxuICAgICAgICAgICAgICAgIDwvdi1kaXZpZGVyPlxcblxcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XFxuXFxuICAgICAgICA8L3Ytc3RlcHBlci1oZWFkZXI+XFxuXFxuICAgICAgICA8di1zdGVwcGVyLWNvbnRlbnRcXG4gICAgICAgICAgICA6c3RlcD1cXFwicGFyc2VJbnQoa2V5ICsgMSlcXFwiXFxuICAgICAgICAgICAgdi1mb3I9XFxcIihhY3RpdmUsa2V5KSBpbiBnZXRBY3RpdmVTdGVwc1xcXCJcXG4gICAgICAgICAgICA6a2V5PVxcXCJrZXlcXFwiXFxuICAgICAgICA+XFxuICAgICAgICAgICAgPHYtY2FyZCBzdHlsZT1cXFwibWluLWhlaWdodDogNjAwcHg7XFxcIj5cXG4gICAgICAgICAgICAgICAgPGNvbXBvbmVudCA6aXM9XFxcImFjdGl2ZS5jb21wb25lbnRcXFwiPlxcbiAgICAgICAgICAgICAgICA8L2NvbXBvbmVudD5cXG4gICAgICAgICAgICA8L3YtY2FyZD5cXG5cXG4gICAgICAgIDwvdi1zdGVwcGVyLWNvbnRlbnQ+XFxuXFxuICAgIDwvdi1zdGVwcGVyPlxcbiAgICA8IS0tIEVuZCBDb250ZW50IFNsb3QgLS0+XFxuXFxuICAgIDwhLS0gU3RhcnQgRm9vdGVyIFNsb3QgLS0+XFxuICAgIDx2LWZvb3RlciA6Y2xhc3M9XFxcIltmb290ZXJDbGFzc11cXFwiIGZpeGVkIHNsb3Q9XFxcImZvb3RlclxcXCI+XFxuICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxcbiAgICA8c3Bhbj7CqSB7eyB5ZWFyIH19IHt7IGRvbWFpbiB9fSDCriB8IHt7IHRyYWRlbWFyayB9feKEojwvc3Bhbj5cXG4gICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XFxuICAgIDwvdi1mb290ZXI+XFxuICAgIDwhLS0gRW5kIEZvb3RlciBTbG90IC0tPlxcblxcbjwvbW9kYWwtbGF5b3V0PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5pbXBvcnQgTW9kYWxMYXlvdXQgZnJvbSAnLi4vbGF5b3V0cy9Nb2RhbExheW91dC52dWUnXFxuaW1wb3J0IE9yZGVyRGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrb3V0L29yZGVyLWRldGFpbHMudnVlJ1xcbmltcG9ydCBTaGlwcGluZ0RldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9jaGVja291dC9zaGlwcGluZy1kZXRhaWxzLnZ1ZSdcXG5pbXBvcnQgQ3VzdG9tZXJEZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tvdXQvY3VzdG9tZXItZGV0YWlscy52dWUnXFxuaW1wb3J0IE1vZGVPZlBheW1lbnQgZnJvbSAnLi4vY29tcG9uZW50cy9jaGVja291dC9tb2RlLW9mLXBheW1lbnQudnVlJ1xcbmltcG9ydCBTdWNjZXNzT3JkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9jaGVja291dC9zdWNjZXNzLW9yZGVyLnZ1ZSdcXG5pbXBvcnQgRGVsaXZlcnlNZXRob2QgZnJvbSAnLi4vY29tcG9uZW50cy9jaGVja291dC9kZWxpdmVyeS1tZXRob2QudnVlJ1xcbmltcG9ydCBUaGVtZSBmcm9tICcuLi9taXhpbnMvdGhlbWUnXFxuaW1wb3J0IHsgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfSBmcm9tICd2dWV4J1xcbmNvbnN0IHsgbWFwR2V0dGVycywgbWFwTXV0YXRpb25zIH0gPSBjcmVhdGVOYW1lc3BhY2VkSGVscGVycygnd2l6YXJkJylcXG5cXG5leHBvcnQgZGVmYXVsdCB7XFxuICAgIG1peGluczogW1RoZW1lXSxcXG4gICAgY29tcG9uZW50czoge1xcbiAgICAgICAgTW9kYWxMYXlvdXQsXFxuICAgICAgICBPcmRlckRldGFpbHMsXFxuICAgICAgICBTaGlwcGluZ0RldGFpbHMsXFxuICAgICAgICBDdXN0b21lckRldGFpbHMsXFxuICAgICAgICBNb2RlT2ZQYXltZW50LFxcbiAgICAgICAgU3VjY2Vzc09yZGVyLFxcbiAgICAgICAgRGVsaXZlcnlNZXRob2RcXG4gICAgfSxcXG4gICAgZGF0YTogKCkgPT4gKHtcXG4gICAgICAgIGZvb3RlckNsYXNzOiB7J3ByaW1hcnktLXRleHQnOiB0cnVlLCAnYWNjZW50JzogdHJ1ZX1cXG4gICAgfSksXFxuICAgIGNvbXB1dGVkOiB7XFxuICAgICAgICAuLi5tYXBHZXR0ZXJzKFtcXG4gICAgICAgICAgICAnZ2V0QWN0aXZlU3RlcHMnLFxcbiAgICAgICAgICAgICdnZXRTdGVwJ1xcbiAgICAgICAgXSksXFxuICAgICAgICBzdGVwOiB7XFxuICAgICAgICAgICAgZ2V0ICgpIHtcXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RlcFxcbiAgICAgICAgICAgIH0sXFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0ZXAodmFsdWUpXFxuICAgICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICB9LFxcbiAgICBtZXRob2RzOiB7XFxuICAgICAgICAuLi5tYXBNdXRhdGlvbnMoW1xcbiAgICAgICAgICAgICdzZXRTdGVwJyxcXG4gICAgICAgICAgICAnc2V0U3RlcHMnXFxuICAgICAgICBdKSxcXG4gICAgICAgIHJlZGlyZWN0QmFjayAoKSB7XFxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICAgICAgc2VsZi4kcm91dGVyLnB1c2goe3BhdGg6ICcvY2FydCd9KVxcbiAgICAgICAgfVxcbiAgICB9LFxcbiAgICBtb3VudGVkICgpIHtcXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xcbiAgICAgICAgLyogcmVkaXJlY3QgaWYgbm8gSXRlbSBpbiB0aGUgQ2FydCAqL1xcbiAgICAgICAgaWYgKHNlbGYuJHN0b3JlLmdldHRlcnNbJ2NhcnQvZ2V0Q291bnQnXSA9PT0gMCkge1xcbiAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHtwYXRoOiAnLyd9KVxcbiAgICAgICAgfVxcbiAgICB9XFxufVxcbjwvc2NyaXB0PlxcbjxzdHlsZSBzY29wZWQ+XFxuLnN0ZXBwZXIgLnN0ZXBwZXJfX3N0ZXAtLWluYWN0aXZlICAuc3RlcHBlcl9fc3RlcF9fc3RlcCB7XFxuICAgIGNvbG9yOiAjQkE5QTVBO1xcbn1cXG48L3N0eWxlPlxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi05ZmMxMzRlMFwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL0NoZWNrb3V0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzU0XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIjx0ZW1wbGF0ZT5cbjxtb2RhbC1sYXlvdXQ+XG4gICAgPCEtLSBTdGFydCBUb29sQmFyIFNsb3QgLS0+XG4gICAgPHYtdG9vbGJhciBjbGFzcz1cImFjY2VudFwiIHNsb3Q9XCJ0b29sYmFyXCI+XG4gICAgICAgIDwhLS0gQXJyb3cgQmFjayAtLT5cbiAgICAgICAgPHYtYnRuIGZsYXQgaWNvbiBjb2xvcj1cImVycm9yXCIgQGNsaWNrLm5hdGl2ZT1cInJlZGlyZWN0QmFjaygpXCI+XG4gICAgICAgICAgICA8di1pY29uPmZhLXRpbWVzPC92LWljb24+XG4gICAgICAgIDwvdi1idG4+XG5cbiAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgICAgIDwhLS0gTW9kYWwgVGl0bGUgLS0+XG4gICAgICAgIDx2LXRvb2xiYXItdGl0bGUgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlciBwcmltYXJ5LS10ZXh0XCI+XG4gICAgICAgICAgICBDaGVja291dCBPcmRlciBGb3JtXG4gICAgICAgIDwvdi10b29sYmFyLXRpdGxlPlxuXG4gICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuXG4gICAgPC92LXRvb2xiYXI+XG4gICAgPCEtLSBFbmQgVG9vbEJhciBTbG90IC0tPlxuXG4gICAgPCEtLSBTdGFydCBDb250ZW50IFNsb3QgLS0+XG4gICAgPHYtc3RlcHBlciB2LW1vZGVsPVwic3RlcFwiPlxuXG4gICAgICAgIDx2LXN0ZXBwZXItaGVhZGVyPlxuXG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCIoYWN0aXZlLGtleSkgaW4gZ2V0QWN0aXZlU3RlcHNcIj5cblxuICAgICAgICAgICAgICAgIDx2LXN0ZXBwZXItc3RlcFxuICAgICAgICAgICAgICAgIDprZXk9XCJrZXlcIlxuICAgICAgICAgICAgICAgIDpzdGVwPVwicGFyc2VJbnQoa2V5ICsgMSlcIlxuICAgICAgICAgICAgICAgIDpjb21wbGV0ZT1cInBhcnNlSW50KHN0ZXApID4gcGFyc2VJbnQoa2V5ICsgMSlcIlxuICAgICAgICAgICAgICAgIDpydWxlcz1cIlsoKSA9PiBnZXRBY3RpdmVTdGVwc1trZXldLnZhbGlkYXRlZF1cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCI+e3sgYWN0aXZlLnRpdGxlIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c21hbGwgY2xhc3M9XCJpbmZvLS10ZXh0XCI+e3sgYWN0aXZlLnN1YnRpdGxlIH19PC9zbWFsbD5cbiAgICAgICAgICAgICAgICA8L3Ytc3RlcHBlci1zdGVwPlxuXG4gICAgICAgICAgICAgICAgPHYtZGl2aWRlciA6a2V5PVwia2V5XCIgdi1pZj1cInBhcnNlSW50KGtleSArIDEpICE9PSBnZXRBY3RpdmVTdGVwcy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICA8L3YtZGl2aWRlcj5cblxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICA8L3Ytc3RlcHBlci1oZWFkZXI+XG5cbiAgICAgICAgPHYtc3RlcHBlci1jb250ZW50XG4gICAgICAgICAgICA6c3RlcD1cInBhcnNlSW50KGtleSArIDEpXCJcbiAgICAgICAgICAgIHYtZm9yPVwiKGFjdGl2ZSxrZXkpIGluIGdldEFjdGl2ZVN0ZXBzXCJcbiAgICAgICAgICAgIDprZXk9XCJrZXlcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8di1jYXJkIHN0eWxlPVwibWluLWhlaWdodDogNjAwcHg7XCI+XG4gICAgICAgICAgICAgICAgPGNvbXBvbmVudCA6aXM9XCJhY3RpdmUuY29tcG9uZW50XCI+XG4gICAgICAgICAgICAgICAgPC9jb21wb25lbnQ+XG4gICAgICAgICAgICA8L3YtY2FyZD5cblxuICAgICAgICA8L3Ytc3RlcHBlci1jb250ZW50PlxuXG4gICAgPC92LXN0ZXBwZXI+XG4gICAgPCEtLSBFbmQgQ29udGVudCBTbG90IC0tPlxuXG4gICAgPCEtLSBTdGFydCBGb290ZXIgU2xvdCAtLT5cbiAgICA8di1mb290ZXIgOmNsYXNzPVwiW2Zvb3RlckNsYXNzXVwiIGZpeGVkIHNsb3Q9XCJmb290ZXJcIj5cbiAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICA8c3Bhbj7CqSB7eyB5ZWFyIH19IHt7IGRvbWFpbiB9fSDCriB8IHt7IHRyYWRlbWFyayB9feKEojwvc3Bhbj5cbiAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICA8L3YtZm9vdGVyPlxuICAgIDwhLS0gRW5kIEZvb3RlciBTbG90IC0tPlxuXG48L21vZGFsLWxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTW9kYWxMYXlvdXQgZnJvbSAnLi4vbGF5b3V0cy9Nb2RhbExheW91dC52dWUnXG5pbXBvcnQgT3JkZXJEZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tvdXQvb3JkZXItZGV0YWlscy52dWUnXG5pbXBvcnQgU2hpcHBpbmdEZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tvdXQvc2hpcHBpbmctZGV0YWlscy52dWUnXG5pbXBvcnQgQ3VzdG9tZXJEZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tvdXQvY3VzdG9tZXItZGV0YWlscy52dWUnXG5pbXBvcnQgTW9kZU9mUGF5bWVudCBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrb3V0L21vZGUtb2YtcGF5bWVudC52dWUnXG5pbXBvcnQgU3VjY2Vzc09yZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tvdXQvc3VjY2Vzcy1vcmRlci52dWUnXG5pbXBvcnQgRGVsaXZlcnlNZXRob2QgZnJvbSAnLi4vY29tcG9uZW50cy9jaGVja291dC9kZWxpdmVyeS1tZXRob2QudnVlJ1xuaW1wb3J0IFRoZW1lIGZyb20gJy4uL21peGlucy90aGVtZSdcbmltcG9ydCB7IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH0gZnJvbSAndnVleCdcbmNvbnN0IHsgbWFwR2V0dGVycywgbWFwTXV0YXRpb25zIH0gPSBjcmVhdGVOYW1lc3BhY2VkSGVscGVycygnd2l6YXJkJylcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG1peGluczogW1RoZW1lXSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIE1vZGFsTGF5b3V0LFxuICAgICAgICBPcmRlckRldGFpbHMsXG4gICAgICAgIFNoaXBwaW5nRGV0YWlscyxcbiAgICAgICAgQ3VzdG9tZXJEZXRhaWxzLFxuICAgICAgICBNb2RlT2ZQYXltZW50LFxuICAgICAgICBTdWNjZXNzT3JkZXIsXG4gICAgICAgIERlbGl2ZXJ5TWV0aG9kXG4gICAgfSxcbiAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICBmb290ZXJDbGFzczogeydwcmltYXJ5LS10ZXh0JzogdHJ1ZSwgJ2FjY2VudCc6IHRydWV9XG4gICAgfSksXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgLi4ubWFwR2V0dGVycyhbXG4gICAgICAgICAgICAnZ2V0QWN0aXZlU3RlcHMnLFxuICAgICAgICAgICAgJ2dldFN0ZXAnXG4gICAgICAgIF0pLFxuICAgICAgICBzdGVwOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0ZXBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGVwKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIC4uLm1hcE11dGF0aW9ucyhbXG4gICAgICAgICAgICAnc2V0U3RlcCcsXG4gICAgICAgICAgICAnc2V0U3RlcHMnXG4gICAgICAgIF0pLFxuICAgICAgICByZWRpcmVjdEJhY2sgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLiRyb3V0ZXIucHVzaCh7cGF0aDogJy9jYXJ0J30pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vdW50ZWQgKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgLyogcmVkaXJlY3QgaWYgbm8gSXRlbSBpbiB0aGUgQ2FydCAqL1xuICAgICAgICBpZiAoc2VsZi4kc3RvcmUuZ2V0dGVyc1snY2FydC9nZXRDb3VudCddID09PSAwKSB7XG4gICAgICAgICAgICBzZWxmLiRyb3V0ZXIucHVzaCh7cGF0aDogJy8nfSlcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZD5cbi5zdGVwcGVyIC5zdGVwcGVyX19zdGVwLS1pbmFjdGl2ZSAgLnN0ZXBwZXJfX3N0ZXBfX3N0ZXAge1xuICAgIGNvbG9yOiAjQkE5QTVBO1xufVxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBDaGVja291dC52dWU/NmNlMDMyYTciLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTY1MzE2YTY0XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL29yZGVyLWRldGFpbHMudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL29yZGVyLWRldGFpbHMudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi02NTMxNmE2NFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9vcmRlci1kZXRhaWxzLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGNvbXBvbmVudHNcXFxcY2hlY2tvdXRcXFxcb3JkZXItZGV0YWlscy52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIG9yZGVyLWRldGFpbHMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTY1MzE2YTY0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNjUzMTZhNjRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9vcmRlci1kZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzU2XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02NTMxNmE2NFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9vcmRlci1kZXRhaWxzLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiNGIwNGE5YzJcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjUzMTZhNjRcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vb3JkZXItZGV0YWlscy52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjUzMTZhNjRcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vb3JkZXItZGV0YWlscy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNjUzMTZhNjRcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9vcmRlci1kZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzU3XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwib3JkZXItZGV0YWlscy52dWVcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi02NTMxNmE2NFwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L29yZGVyLWRldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA3NThcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiPHRlbXBsYXRlPlxuPGRpdj5cbiAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiVG90YWwgUHJpY2VcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwic3VidG90YWxcIlxuICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICBwcmVwZW5kLWljb249XCJmYS1zaG9wcGluZy1iYWdcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93IHYtaWY9XCJ0YXggPiAwXCI+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJUYXhcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwidGF4XCJcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtcGVyY2VudFwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3cgdi1pZj1cImNvdXJpZXIgJiYgY291cmllci5kZXRhaWxzLnJhdGUgPiAwXCI+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICBsYWJlbD1cIlNoaXBwaW5nIEZlZVwiXG4gICAgICAgICAgICAgIDp2YWx1ZT1cImNvdXJpZXIuZGV0YWlscy5yYXRlXCJcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwibG9jYWxfc2hpcHBpbmdcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJUb3RhbCBBbW91bnRcIlxuICAgICAgICAgICAgICA6dmFsdWU9XCJ0b3RhbF9hbW91bnRcIlxuICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICBwcmVwZW5kLWljb249XCJmYS1tb25leVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWJ0biB2LWlmPVwiY291cmllciAmJiBjb3VyaWVyLnNsdWcgPT09J3BheXBhbCdcIiBAY2xpY2submF0aXZlPVwicGF5cGFsY2FsbGJhY2soKVwiIDpsb2FkaW5nPVwiY2hlY2tPdXRGb3JtLmJ1c3lcIiA6ZGlzYWJsZWQ9XCJlcnJvcnMuYW55KClcIiAgOmNsYXNzPVwie3ByaW1hcnk6ICFjaGVja091dEZvcm0uYnVzeSwgZXJyb3I6IGNoZWNrT3V0Rm9ybS5idXN5fVwiPlBheSBWaWEgUGF5cGFsIDx2LWljb24gcmlnaHQgZGFyaz5mYS1wYXlwYWw8L3YtaWNvbj48L3YtYnRuPlxuICAgICAgICA8di1idG4gdi1lbHNlLWlmPVwiY291cmllciAmJiBjb3VyaWVyLnNsdWcgPT09J2JpdGNvaW4nXCIgQGNsaWNrLm5hdGl2ZT1cImJpdGNvaW5jYWxsYmFjaygpXCIgOmxvYWRpbmc9XCJjaGVja091dEZvcm0uYnVzeVwiIDpkaXNhYmxlZD1cImVycm9ycy5hbnkoKVwiICA6Y2xhc3M9XCJ7cHJpbWFyeTogIWNoZWNrT3V0Rm9ybS5idXN5LCBlcnJvcjogY2hlY2tPdXRGb3JtLmJ1c3l9XCI+UGF5IFZpYSBCaXRjb2luIDx2LWljb24gcmlnaHQgZGFyaz5mYS1idGM8L3YtaWNvbj48L3YtYnRuPlxuICAgICAgICA8di1idG4gdi1lbHNlLWlmPVwiY291cmllciAmJiBjb3VyaWVyLnNsdWcgPT09J2NyZWRpdC1jYXJkJ1wiIEBjbGljay5uYXRpdmU9XCJzdHJpcGVjYWxsYmFjaygpXCIgOmxvYWRpbmc9XCJjaGVja091dEZvcm0uYnVzeVwiIDpkaXNhYmxlZD1cImVycm9ycy5hbnkoKVwiICA6Y2xhc3M9XCJ7cHJpbWFyeTogIWNoZWNrT3V0Rm9ybS5idXN5LCBlcnJvcjogY2hlY2tPdXRGb3JtLmJ1c3l9XCI+UGF5IFZpYSBTdHJpcGUgPHYtaWNvbiByaWdodCBkYXJrPmZhLWNjLXN0cmlwZTwvdi1pY29uPjwvdi1idG4+XG4gICAgICAgIDx2LWJ0biB2LWVsc2UgQGNsaWNrLm5hdGl2ZT1cInN1Ym1pdCgpXCIgOmxvYWRpbmc9XCJjaGVja091dEZvcm0uYnVzeVwiIDpkaXNhYmxlZD1cImVycm9ycy5hbnkoKVwiICA6Y2xhc3M9XCJ7cHJpbWFyeTogIWNoZWNrT3V0Rm9ybS5idXN5LCBlcnJvcjogY2hlY2tPdXRGb3JtLmJ1c3l9XCI+U3VibWl0IDx2LWljb24gcmlnaHQgZGFyaz5zZW5kPC92LWljb24+PC92LWJ0bj5cbiAgICAgICAgPHYtYnRuIDpkaXNhYmxlZD1cImVycm9ycy5hbnkoKVwiIG91dGxpbmUgY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cImJhY2soKVwiPkJhY2s8L3YtYnRuPlxuPC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBjcmVhdGVOYW1lc3BhY2VkSGVscGVycyB9IGZyb20gJ3Z1ZXgnXG5jb25zdCB7IG1hcEFjdGlvbnMsIG1hcFN0YXRlIH0gPSBjcmVhdGVOYW1lc3BhY2VkSGVscGVycygnY2hlY2tvdXQnKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgY2hlY2tPdXRGb3JtOiBuZXcgQXBwRm9ybShBcHAuZm9ybXMuY2hlY2tPdXRGb3JtKVxuICAgIH0pLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcFN0YXRlKHtcbiAgICAgICAgICAgIGN1c3RvbWVyX2RldGFpbHM6IHN0YXRlID0+IHN0YXRlLmN1c3RvbWVyX2RldGFpbHMsXG4gICAgICAgICAgICBzaGlwcGluZ19kZXRhaWxzOiBzdGF0ZSA9PiBzdGF0ZS5zaGlwcGluZ19kZXRhaWxzLFxuICAgICAgICAgICAgY291cmllcjogc3RhdGUgPT4gc3RhdGUuY291cmllcixcbiAgICAgICAgICAgIG1vcDogc3RhdGUgPT4gc3RhdGUubW9wXG4gICAgICAgIH0pLFxuICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snY2FydC9nZXRJdGVtcyddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnY2FydC9zZXRJdGVtcycsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snY2FydC9nZXRTdWJUb3RhbCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnY2FydC9zZXRTdWJUb3RhbCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0YXg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ2NhcnQvZ2V0VGF4J11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdjYXJ0L3NldFRheCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0b3RhbDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snY2FydC9nZXRUb3RhbCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnY2FydC9zZXRUb3RhbCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW50OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0Q3VycmVudCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldEN1cnJlbnQnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3RlcDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldFN0ZXAnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRTdGVwJywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbmV4dDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldE5leHQnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXROZXh0JywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0UHJldmlvdXMnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRQcmV2aW91cycsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdGVwcyAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldEFjdGl2ZVN0ZXBzJ11cbiAgICAgICAgfSxcbiAgICAgICAgdG90YWxfYW1vdW50ICgpIHtcbiAgICAgICAgICAgIGxldCB0b3RhbCA9IHBhcnNlRmxvYXQodGhpcy50b3RhbClcbiAgICAgICAgICAgIGxldCBmZWUgPSAwXG4gICAgICAgICAgICBpZiAodGhpcy5jb3VyaWVyICYmIHRoaXMuY291cmllci5kZXRhaWxzLnJhdGUpIHtcbiAgICAgICAgICAgICAgICBmZWUgPSBwYXJzZUZsb2F0KHRoaXMuY291cmllci5kZXRhaWxzLnJhdGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKHRvdGFsICsgZmVlKS50b0ZpeGVkKDIpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgLi4ubWFwQWN0aW9ucyhbXG4gICAgICAgICAgICAnY2hlY2tvdXQnXG4gICAgICAgIF0pLFxuICAgICAgICBwYXlwYWxjYWxsYmFjayAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGF5aW5nIHdpdGggcGF5cGFsJylcbiAgICAgICAgfSxcbiAgICAgICAgYml0Y29pbmNhbGxiYWNrICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXlpbmcgd2l0aCBiaXRjb2luJylcbiAgICAgICAgfSxcbiAgICAgICAgc3RyaXBlY2FsbGJhY2sgKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BheWluZyB3aXRoIHN0cmlwZScpXG4gICAgICAgIH0sXG4gICAgICAgIHN1Ym1pdCAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIC8vIHNldCBDdXN0b21lciBEZXRhaWxzXG4gICAgICAgICAgICBpZiAoXy5maW5kKHNlbGYuc3RlcHMsIHsgJ2NvbXBvbmVudCc6ICdjdXN0b21lci1kZXRhaWxzJywgJ2FjdGl2ZSc6IHRydWUgfSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuY2hlY2tPdXRGb3JtLmN1c3RvbWVyX2RldGFpbHMgPSBzZWxmLmN1c3RvbWVyX2RldGFpbHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCBEZWxpdmVyeSBNZXRob2RcbiAgICAgICAgICAgIGlmIChfLmZpbmQoc2VsZi5zdGVwcywgeyAnY29tcG9uZW50JzogJ2RlbGl2ZXJ5LW1ldGhvZCcsICdhY3RpdmUnOiB0cnVlIH0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNoZWNrT3V0Rm9ybS5jb3VyaWVyID0gc2VsZi5jb3VyaWVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzZXQgU2hpcHBpbmcgRGV0YWlsc1xuICAgICAgICAgICAgaWYgKF8uZmluZChzZWxmLnN0ZXBzLCB7ICdjb21wb25lbnQnOiAnc2hpcHBpbmctZGV0YWlscycsICdhY3RpdmUnOiB0cnVlIH0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNoZWNrT3V0Rm9ybS5zaGlwcGluZ19kZXRhaWxzID0gc2VsZi5zaGlwcGluZ19kZXRhaWxzXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIFNoaXBtZW50XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNlbGYuY2hlY2tPdXRGb3JtLnNoaXBwaW5nX2RldGFpbHNcbiAgICAgICAgICAgICAgICBkZWxldGUgc2VsZi5jaGVja091dEZvcm0uc2hpcHBpbmdfZmVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXy5maW5kKHNlbGYuc3RlcHMsIHsgJ2NvbXBvbmVudCc6ICdtb2RlLW9mLXBheW1lbnQnLCAnYWN0aXZlJzogdHJ1ZSB9KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGVja091dEZvcm0ubW9wID0gc2VsZi5tb3BcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCBDYXJ0XG4gICAgICAgICAgICBzZWxmLmNoZWNrT3V0Rm9ybS5jYXJ0Lml0ZW1zID0gc2VsZi5pdGVtc1xuICAgICAgICAgICAgc2VsZi5jaGVja091dEZvcm0uY2FydC5zdWJ0b3RhbCA9IHNlbGYuc3VidG90YWxcbiAgICAgICAgICAgIHNlbGYuY2hlY2tPdXRGb3JtLmNhcnQudGF4ID0gc2VsZi50YXhcbiAgICAgICAgICAgIHNlbGYuY2hlY2tPdXRGb3JtLmNhcnQudG90YWwgPSBzZWxmLnRvdGFsXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBhbGwgYWN0aXZlIHN0ZXBzIGFyZSB2YWxpZGF0ZWRcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHNlbGYuc3RlcHMubGVuZ3RoXG4gICAgICAgICAgICBsZXQgdmFsaWRhdGVkID0gXy5maWx0ZXIoc2VsZi5zdGVwcywgeyAndmFsaWRhdGVkJzogdHJ1ZSB9KS5sZW5ndGhcbiAgICAgICAgICAgIC8vIFVzdWFsIEVycm9yIGlzIGlmIGFueSBvZiB0aGUgc3RlcCBpcyBub3QgdmFsaWRhdGVkIGZvcm0gb2JqZWN0IGlzIG5vdCBuZXcgdXBcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gdmFsaWRhdGVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGVja291dChzZWxmLmNoZWNrT3V0Rm9ybSlcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBjYXJ0XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2NhcnQvcmVzZXRDYXJ0JylcbiAgICAgICAgICAgICAgICAvLyByZXNldCB3aXphcmRcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnd2l6YXJkL3Jlc2V0V2l6YXJkJylcbiAgICAgICAgICAgICAgICAvLyByZXNldCBjaGVja291dCBpcyBhbHJlYWR5IGluc2lkZSBkaXNwYXRjaCBjaGVja291dFxuICAgICAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHtuYW1lOiAnaG9tZSd9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBieSBjaGFuY2Ugbm90IGFsbCBzdGVwcyBhcmUgdmFsaWRhdGVkICwgc2hvdyBhbiBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICAgICAgc2VsZi4kcG9wdXAoeyBtZXNzYWdlOiAnQ2hlY2tvdXQgRm9ybSBIYXMgQW4gRXJyb3InLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZTU3MzczJywgZGVsYXk6IDUsIGNvbG9yOiAnI2ZmZmZmYScgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBiYWNrICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi4kdmFsaWRhdG9yLnZhbGlkYXRlQWxsKClcbiAgICAgICAgICAgIHNlbGYuc2V0VmFsaWRhdGVkKClcbiAgICAgICAgICAgIHNlbGYuJHN0b3JlLmRpc3BhdGNoKCd3aXphcmQvbW92ZScsIHNlbGYucHJldmlvdXMpXG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbGlkYXRlZCAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZXJyb3JzLmFueSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LnZhbGlkYXRlZCA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LnZhbGlkYXRlZCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRTdGVwVmFsaWRhdGVkJywgdGhpcy5jdXJyZW50KVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBvcmRlci1kZXRhaWxzLnZ1ZT8yNWI3OWFjNiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJUb3RhbCBQcmljZVwiLFxuICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLXNob3BwaW5nLWJhZ1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zdWJ0b3RhbCxcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnN1YnRvdGFsID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzdWJ0b3RhbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLnRheCA+IDBcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlRheFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZmEtcGVyY2VudFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS50YXgsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRheCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJ0YXhcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uY291cmllciAmJiBfdm0uY291cmllci5kZXRhaWxzLnJhdGUgPiAwXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTaGlwcGluZyBGZWVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmNvdXJpZXIuZGV0YWlscy5yYXRlLFxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwibG9jYWxfc2hpcHBpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJUb3RhbCBBbW91bnRcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0udG90YWxfYW1vdW50LFxuICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLW1vbmV5XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uY291cmllciAmJiBfdm0uY291cmllci5zbHVnID09PSBcInBheXBhbFwiXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgcHJpbWFyeTogIV92bS5jaGVja091dEZvcm0uYnVzeSxcbiAgICAgICAgICAgICAgICBlcnJvcjogX3ZtLmNoZWNrT3V0Rm9ybS5idXN5XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmNoZWNrT3V0Rm9ybS5idXN5LFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uZXJyb3JzLmFueSgpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgX3ZtLnBheXBhbGNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5fdihcIlBheSBWaWEgUGF5cGFsIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyByaWdodDogXCJcIiwgZGFyazogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCJmYS1wYXlwYWxcIilcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5jb3VyaWVyICYmIF92bS5jb3VyaWVyLnNsdWcgPT09IFwiYml0Y29pblwiXG4gICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgIHByaW1hcnk6ICFfdm0uY2hlY2tPdXRGb3JtLmJ1c3ksXG4gICAgICAgICAgICAgICAgICBlcnJvcjogX3ZtLmNoZWNrT3V0Rm9ybS5idXN5XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmNoZWNrT3V0Rm9ybS5idXN5LFxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5lcnJvcnMuYW55KClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5iaXRjb2luY2FsbGJhY2soKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF92bS5fdihcIlBheSBWaWEgQml0Y29pbiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyByaWdodDogXCJcIiwgZGFyazogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcImZhLWJ0Y1wiKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IF92bS5jb3VyaWVyICYmIF92bS5jb3VyaWVyLnNsdWcgPT09IFwiY3JlZGl0LWNhcmRcIlxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogIV92bS5jaGVja091dEZvcm0uYnVzeSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IF92bS5jaGVja091dEZvcm0uYnVzeVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5jaGVja091dEZvcm0uYnVzeSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5lcnJvcnMuYW55KClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLnN0cmlwZWNhbGxiYWNrKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiUGF5IFZpYSBTdHJpcGUgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyByaWdodDogXCJcIiwgZGFyazogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiZmEtY2Mtc3RyaXBlXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiAhX3ZtLmNoZWNrT3V0Rm9ybS5idXN5LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogX3ZtLmNoZWNrT3V0Rm9ybS5idXN5XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmNoZWNrT3V0Rm9ybS5idXN5LFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmVycm9ycy5hbnkoKVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uc3VibWl0KClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiU3VibWl0IFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgcmlnaHQ6IFwiXCIsIGRhcms6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcInNlbmRcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1idG5cIixcbiAgICAgICAge1xuICAgICAgICAgIGF0dHJzOiB7IGRpc2FibGVkOiBfdm0uZXJyb3JzLmFueSgpLCBvdXRsaW5lOiBcIlwiLCBjb2xvcjogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICBfdm0uYmFjaygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl92KFwiQmFja1wiKV1cbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNjUzMTZhNjRcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTY1MzE2YTY0XCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L29yZGVyLWRldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA3NjBcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0xMGU3ZjMxMlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9zaGlwcGluZy1kZXRhaWxzLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcInZ1ZS1hcHBcXFwiXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9zaGlwcGluZy1kZXRhaWxzLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTBlN2YzMTJcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vc2hpcHBpbmctZGV0YWlscy52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXGNoZWNrb3V0XFxcXHNoaXBwaW5nLWRldGFpbHMudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBzaGlwcGluZy1kZXRhaWxzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0xMGU3ZjMxMlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTEwZTdmMzEyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc2hpcHBpbmctZGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDc2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTBlN2YzMTJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vc2hpcHBpbmctZGV0YWlscy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjM1Njk5ZjQ1XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTEwZTdmMzEyXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3NoaXBwaW5nLWRldGFpbHMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTEwZTdmMzEyXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3NoaXBwaW5nLWRldGFpbHMudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTEwZTdmMzEyXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc2hpcHBpbmctZGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDc2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcInNoaXBwaW5nLWRldGFpbHMudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtMTBlN2YzMTJcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9zaGlwcGluZy1kZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzYzXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIjx0ZW1wbGF0ZT5cbjx2LWNvbnRhaW5lciBmbHVpZD5cbiAgICAgICAgPGZvcm0+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImFkZHJlc3NfMVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiQWRkcmVzcyAxXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18xXCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImFkZHJlc3NfMVwiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdhZGRyZXNzXzEnKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWFkZHJlc3MtYm9va1wiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICBuYW1lPVwiYWRkcmVzc18yXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJBZGRyZXNzIDJcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzJcIlxuICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiYWRkcmVzc18yXCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2FkZHJlc3NfMicpXCJcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZmEtYWRkcmVzcy1ib29rLW8gXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImNpdHlcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkNpdHlcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2hpcHBpbmdfZGV0YWlscy5jaXR5XCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImNpdHlcIlxuICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnY2l0eScpXCJcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwibG9jYXRpb25fY2l0eVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDEyICBsZzEyICB4bDEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICBuYW1lPVwiY291bnRyeVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiQ291bnRyeVwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJzaGlwcGluZ19kZXRhaWxzLmNvdW50cnlcIlxuICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiY291bnRyeVwiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdjb3VudHJ5JylcIlxuICAgICAgICAgICAgICBwcmVwZW5kLWljb249XCJmYS1mYVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICBuYW1lPVwiemlwX2NvZGVcIlxuICAgICAgICAgICAgbGFiZWw9XCJaaXAgQ29kZVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwic2hpcHBpbmdfZGV0YWlscy56aXBfY29kZVwiXG4gICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJ6aXBfY29kZVwiXG4gICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnemlwX2NvZGUnKVwiXG4gICAgICAgICAgICBwcmVwZW5kLWljb249XCJtYXJrdW5yZWFkX21haWxib3hcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgbmFtZT1cInN0YXRlX3Byb3ZpbmNlXCJcbiAgICAgICAgICAgIGxhYmVsPVwiU3RhdGUgfCBQcm92aW5jZVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwic2hpcHBpbmdfZGV0YWlscy5zdGF0ZV9wcm92aW5jZVwiXG4gICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJzdGF0ZV9wcm92aW5jZVwiXG4gICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnc3RhdGVfcHJvdmluY2UnKVwiXG4gICAgICAgICAgICBwcmVwZW5kLWljb249XCJwbGFjZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWJ0biBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2submF0aXZlPVwiZm9yd2FyZCgpXCI+Q29udGludWU8L3YtYnRuPlxuICAgICAgICA8di1idG4gb3V0bGluZSBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2submF0aXZlPVwiYmFjaygpXCI+QmFjazwvdi1idG4+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvdi1jb250YWluZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfSBmcm9tICd2dWV4J1xuY29uc3QgeyBtYXBTdGF0ZSwgbWFwTXV0YXRpb25zIH0gPSBjcmVhdGVOYW1lc3BhY2VkSGVscGVycygnY2hlY2tvdXQnKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgLi4ubWFwU3RhdGUoe1xuICAgICAgICAgICAgc2hpcHBpbmdfZGV0YWlsczogc3RhdGUgPT4gc3RhdGUuc2hpcHBpbmdfZGV0YWlsc1xuICAgICAgICB9KSxcbiAgICAgICAgY3VycmVudDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldEN1cnJlbnQnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRDdXJyZW50JywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRTdGVwJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG5leHQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXROZXh0J11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0TmV4dCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcmV2aW91czoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldFByZXZpb3VzJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0UHJldmlvdXMnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICAuLi5tYXBNdXRhdGlvbnMoW1xuICAgICAgICAgICAgJ3NldFNoaXBwaW5nRGV0YWlscydcbiAgICAgICAgXSksXG4gICAgICAgIGZvcndhcmQgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLiR2YWxpZGF0b3IudmFsaWRhdGVBbGwoKVxuICAgICAgICAgICAgc2VsZi5zZXRWYWxpZGF0ZWQoKVxuICAgICAgICAgICAgc2VsZi4kc3RvcmUuZGlzcGF0Y2goJ3dpemFyZC9tb3ZlJywgc2VsZi5uZXh0KVxuICAgICAgICAgICAgc2VsZi5zZXRTaGlwcGluZ0RldGFpbHMoc2VsZi5zaGlwcGluZ19kZXRhaWxzKVxuICAgICAgICB9LFxuICAgICAgICBiYWNrICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi4kdmFsaWRhdG9yLnZhbGlkYXRlQWxsKClcbiAgICAgICAgICAgIHNlbGYuc2V0VmFsaWRhdGVkKClcbiAgICAgICAgICAgIHNlbGYuJHN0b3JlLmRpc3BhdGNoKCd3aXphcmQvbW92ZScsIHNlbGYucHJldmlvdXMpXG4gICAgICAgICAgICBzZWxmLnNldFNoaXBwaW5nRGV0YWlscyhzZWxmLnNoaXBwaW5nX2RldGFpbHMpXG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbGlkYXRlZCAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZXJyb3JzLmFueSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LnZhbGlkYXRlZCA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LnZhbGlkYXRlZCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRTdGVwVmFsaWRhdGVkJywgdGhpcy5jdXJyZW50KVxuICAgICAgICB9XG5cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNoaXBwaW5nLWRldGFpbHMudnVlP2YwOGE0ZWVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcInYtY29udGFpbmVyXCIsIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LCBbXG4gICAgX2MoXG4gICAgICBcImZvcm1cIixcbiAgICAgIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhZGRyZXNzXzFcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQWRkcmVzcyAxXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiYWRkcmVzc18xXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiYWRkcmVzc18xXCIpLFxuICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLWFkZHJlc3MtYm9va1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaGlwcGluZ19kZXRhaWxzLmFkZHJlc3NfMSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5zaGlwcGluZ19kZXRhaWxzLmFkZHJlc3NfMSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNoaXBwaW5nX2RldGFpbHMuYWRkcmVzc18xXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8bWF4OjI1NVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkfG1heDoyNTUnXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWRkcmVzc18yXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFkZHJlc3MgMlwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImFkZHJlc3NfMlwiLFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcImFkZHJlc3NfMlwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1hZGRyZXNzLWJvb2stbyBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzIsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uc2hpcHBpbmdfZGV0YWlscy5hZGRyZXNzXzIgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzaGlwcGluZ19kZXRhaWxzLmFkZHJlc3NfMlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfG1heDoyNTVcIixcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpdHlcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ2l0eVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImNpdHlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJjaXR5XCIpLFxuICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImxvY2F0aW9uX2NpdHlcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2hpcHBpbmdfZGV0YWlscy5jaXR5LFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLnNoaXBwaW5nX2RldGFpbHMuY2l0eSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNoaXBwaW5nX2RldGFpbHMuY2l0eVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfG1heDoyNTVcIixcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvdW50cnlcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ291bnRyeVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImNvdW50cnlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJjb3VudHJ5XCIpLFxuICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLWZhXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNoaXBwaW5nX2RldGFpbHMuY291bnRyeSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5zaGlwcGluZ19kZXRhaWxzLmNvdW50cnkgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzaGlwcGluZ19kZXRhaWxzLmNvdW50cnlcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInppcF9jb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlppcCBDb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwiemlwX2NvZGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJ6aXBfY29kZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJtYXJrdW5yZWFkX21haWxib3hcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2hpcHBpbmdfZGV0YWlscy56aXBfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5zaGlwcGluZ19kZXRhaWxzLnppcF9jb2RlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2hpcHBpbmdfZGV0YWlscy56aXBfY29kZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdGVfcHJvdmluY2VcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhdGUgfCBQcm92aW5jZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcInN0YXRlX3Byb3ZpbmNlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwic3RhdGVfcHJvdmluY2VcIiksXG4gICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwicGxhY2VcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2hpcHBpbmdfZGV0YWlscy5zdGF0ZV9wcm92aW5jZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5zaGlwcGluZ19kZXRhaWxzLnN0YXRlX3Byb3ZpbmNlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2hpcHBpbmdfZGV0YWlscy5zdGF0ZV9wcm92aW5jZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLmZvcndhcmQoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwiQ29udGludWVcIildXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhdHRyczogeyBvdXRsaW5lOiBcIlwiLCBjb2xvcjogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdm0uYmFjaygpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCJCYWNrXCIpXVxuICAgICAgICApXG4gICAgICBdLFxuICAgICAgMVxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTEwZTdmMzEyXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0xMGU3ZjMxMlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9zaGlwcGluZy1kZXRhaWxzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzY1XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjUwNjY1N2NcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vY3VzdG9tZXItZGV0YWlscy52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vY3VzdG9tZXItZGV0YWlscy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTY1MDY2NTdjXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2N1c3RvbWVyLWRldGFpbHMudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcY29tcG9uZW50c1xcXFxjaGVja291dFxcXFxjdXN0b21lci1kZXRhaWxzLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gY3VzdG9tZXItZGV0YWlscy52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNjUwNjY1N2NcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi02NTA2NjU3Y1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L2N1c3RvbWVyLWRldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA3NjZcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTY1MDY2NTdjXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2N1c3RvbWVyLWRldGFpbHMudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIxMTk2ZjAzNFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02NTA2NjU3Y1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9jdXN0b21lci1kZXRhaWxzLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02NTA2NjU3Y1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9jdXN0b21lci1kZXRhaWxzLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi02NTA2NjU3Y1wiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L2N1c3RvbWVyLWRldGFpbHMudnVlXG4vLyBtb2R1bGUgaWQgPSA3Njdcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJjdXN0b21lci1kZXRhaWxzLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTY1MDY2NTdjXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvY3VzdG9tZXItZGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDc2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCI8dGVtcGxhdGU+XG48di1jb250YWluZXIgZmx1aWQ+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgIGNsYXNzPVwicHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJmaXJzdF9uYW1lXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJGaXJzdCBOYW1lXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImN1c3RvbWVyX2RldGFpbHMuZmlyc3RfbmFtZVwiXG4gICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJmaXJzdF9uYW1lXCJcbiAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ2ZpcnN0X25hbWUnKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWlkLWNhcmRcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImxhc3RfbmFtZVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiTGFzdCBOYW1lXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImN1c3RvbWVyX2RldGFpbHMubGFzdF9uYW1lXCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxtYXg6MjU1J1wiXG4gICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImxhc3RfbmFtZVwiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdsYXN0X25hbWUnKVwiXG4gICAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLWlkLWNhcmQtb1wiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQxMiAgbGcxMiAgeGwxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCJcbiAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJFbWFpbFwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJjdXN0b21lcl9kZXRhaWxzLmVtYWlsXCJcbiAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZHxlbWFpbCdcIlxuICAgICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdlbWFpbCcpXCJcbiAgICAgICAgICAgICAgcHJlcGVuZC1pY29uPVwiZW1haWxcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8di1sYXlvdXQgcm93PlxuICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMTIgIGxnMTIgIHhsMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICBjbGFzcz1cInByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgbmFtZT1cImNvbnRhY3Rfbm9cIlxuICAgICAgICAgICAgbGFiZWw9XCJDb250YWN0IE5vLlwiXG4gICAgICAgICAgICB2LW1vZGVsPVwiY3VzdG9tZXJfZGV0YWlscy5jb250YWN0X25vXCJcbiAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bnVtZXJpYydcIlxuICAgICAgICAgICAgZGF0YS12di1uYW1lPVwiY29udGFjdF9ub1wiXG4gICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnY29udGFjdF9ubycpXCJcbiAgICAgICAgICAgIHByZXBlbmQtaWNvbj1cImZhLXBob25lXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPHYtYnRuIGNvbG9yPVwicHJpbWFyeVwiIEBjbGljay5uYXRpdmU9XCJmb3J3YXJkKClcIj5Db250aW51ZTwvdi1idG4+XG4gICAgICAgIDx2LWJ0biBvdXRsaW5lIGNvbG9yPVwicHJpbWFyeVwiIEBjbGljay5uYXRpdmU9XCJ2aWV3Q2FydCgpXCI+VXBkYXRlIENhcnQ8L3YtYnRuPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L3YtY29udGFpbmVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH0gZnJvbSAndnVleCdcbmNvbnN0IHsgbWFwU3RhdGUsIG1hcE11dGF0aW9ucyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2NoZWNrb3V0JylcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcFN0YXRlKHtcbiAgICAgICAgICAgIGN1c3RvbWVyX2RldGFpbHM6IHN0YXRlID0+IHN0YXRlLmN1c3RvbWVyX2RldGFpbHNcbiAgICAgICAgfSksXG4gICAgICAgIGN1cnJlbnQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRDdXJyZW50J11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0Q3VycmVudCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0U3RlcCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFN0ZXAnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0TmV4dCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldE5leHQnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJldmlvdXM6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRQcmV2aW91cyddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFByZXZpb3VzJywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICAuLi5tYXBNdXRhdGlvbnMoW1xuICAgICAgICAgICAgJ3NldEN1c3RvbWVyRGV0YWlscydcbiAgICAgICAgXSksXG4gICAgICAgIGZvcndhcmQgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLiR2YWxpZGF0b3IudmFsaWRhdGVBbGwoKVxuICAgICAgICAgICAgc2VsZi5zZXRWYWxpZGF0ZWQoKVxuICAgICAgICAgICAgc2VsZi4kc3RvcmUuZGlzcGF0Y2goJ3dpemFyZC9tb3ZlJywgdGhpcy5uZXh0KVxuICAgICAgICAgICAgc2VsZi5zZXRDdXN0b21lckRldGFpbHMoc2VsZi5jdXN0b21lcl9kZXRhaWxzKVxuICAgICAgICB9LFxuICAgICAgICBzZXRWYWxpZGF0ZWQgKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVycm9ycy5hbnkoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC52YWxpZGF0ZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC52YWxpZGF0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcFZhbGlkYXRlZCcsIHRoaXMuY3VycmVudClcbiAgICAgICAgfSxcbiAgICAgICAgdmlld0NhcnQgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICByZXR1cm4gc2VsZi4kbmV4dFRpY2soKCkgPT4gc2VsZi4kcm91dGVyLnB1c2goeyBuYW1lOiAnY2FydCcgfSkpXG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGN1c3RvbWVyLWRldGFpbHMudnVlPzJhZDM2ZjUxIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcInYtY29udGFpbmVyXCIsIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LCBbXG4gICAgX2MoXG4gICAgICBcImZvcm1cIixcbiAgICAgIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaXJzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZpcnN0IE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJmaXJzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiZmlyc3RfbmFtZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1pZC1jYXJkXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmN1c3RvbWVyX2RldGFpbHMuZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5jdXN0b21lcl9kZXRhaWxzLmZpcnN0X25hbWUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjdXN0b21lcl9kZXRhaWxzLmZpcnN0X25hbWVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxtYXg6MjU1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWR8bWF4OjI1NSdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXN0X25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTGFzdCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di1uYW1lXCI6IFwibGFzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwibGFzdF9uYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICBcInByZXBlbmQtaWNvblwiOiBcImZhLWlkLWNhcmQtb1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXN0b21lcl9kZXRhaWxzLmxhc3RfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5jdXN0b21lcl9kZXRhaWxzLmxhc3RfbmFtZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImN1c3RvbWVyX2RldGFpbHMubGFzdF9uYW1lXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWR8ZW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxlbWFpbCdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJFbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImVtYWlsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiZW1haWxcIiksXG4gICAgICAgICAgICAgICAgICAgIFwicHJlcGVuZC1pY29uXCI6IFwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY3VzdG9tZXJfZGV0YWlscy5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5jdXN0b21lcl9kZXRhaWxzLmVtYWlsID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiY3VzdG9tZXJfZGV0YWlscy5lbWFpbFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkfG51bWVyaWNcIixcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxudW1lcmljJ1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbnRhY3Rfbm9cIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ29udGFjdCBOby5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJjb250YWN0X25vXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiY29udGFjdF9ub1wiKSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwZW5kLWljb25cIjogXCJmYS1waG9uZVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXN0b21lcl9kZXRhaWxzLmNvbnRhY3Rfbm8sXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VzdG9tZXJfZGV0YWlscy5jb250YWN0X25vID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiY3VzdG9tZXJfZGV0YWlscy5jb250YWN0X25vXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdm0uZm9yd2FyZCgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCJDb250aW51ZVwiKV1cbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IG91dGxpbmU6IFwiXCIsIGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF92bS52aWV3Q2FydCgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCJVcGRhdGUgQ2FydFwiKV1cbiAgICAgICAgKVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi02NTA2NjU3Y1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNjUwNjY1N2NcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvY3VzdG9tZXItZGV0YWlscy52dWVcbi8vIG1vZHVsZSBpZCA9IDc3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTA3YTI0NDViXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL21vZGUtb2YtcGF5bWVudC52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vbW9kZS1vZi1wYXltZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDdhMjQ0NWJcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vbW9kZS1vZi1wYXltZW50LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGNvbXBvbmVudHNcXFxcY2hlY2tvdXRcXFxcbW9kZS1vZi1wYXltZW50LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gbW9kZS1vZi1wYXltZW50LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0wN2EyNDQ1YlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTA3YTI0NDViXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvbW9kZS1vZi1wYXltZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzcxXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wN2EyNDQ1YlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9tb2RlLW9mLXBheW1lbnQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI3OWE2N2MwY1wiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wN2EyNDQ1YlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9tb2RlLW9mLXBheW1lbnQudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTA3YTI0NDViXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL21vZGUtb2YtcGF5bWVudC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtMDdhMjQ0NWJcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9tb2RlLW9mLXBheW1lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NzJcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJtb2RlLW9mLXBheW1lbnQudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtMDdhMjQ0NWJcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9tb2RlLW9mLXBheW1lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NzNcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiPHRlbXBsYXRlPlxuPHYtY2FyZCBmbGF0PlxuICAgIDx2LWNhcmQtdGV4dD5cbiAgICA8di1jb250YWluZXIgZmx1aWQ+XG4gICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICA8di1zZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPVwiU2VsZWN0XCJcbiAgICAgICAgICAgIHYtYmluZDppdGVtcz1cImdldEdhdGV3YXlzXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJtb3BcIlxuICAgICAgICAgICAgaXRlbS10ZXh0PVwibmFtZVwiXG4gICAgICAgICAgICBpdGVtLXZhbHVlPVwic2x1Z1wiXG4gICAgICAgICAgICBtYXgtaGVpZ2h0PVwiNDAwXCJcbiAgICAgICAgICAgIGhpbnQ9XCJQYXltZW50IE9wdGlvbnNcIlxuICAgICAgICAgICAgcGVyc2lzdGVudC1oaW50XG4gICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICBkYXRhLXZ2LW5hbWU9XCJtb3BcIlxuICAgICAgICAgICAgOnJldHVybi1vYmplY3Q9XCJ0cnVlXCJcbiAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdtb3AnKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cInNlbGVjdGlvblwiIHNjb3BlPVwiZGF0YVwiPlxuICAgICAgICAgICAgICAgIDx2LWNoaXBcbiAgICAgICAgICAgICAgICBAaW5wdXQ9XCJkYXRhLnBhcmVudC5zZWxlY3RJdGVtKGRhdGEuaXRlbSlcIlxuICAgICAgICAgICAgICAgIDpzZWxlY3RlZD1cImRhdGEuc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgIDprZXk9XCJKU09OLnN0cmluZ2lmeShkYXRhLml0ZW0pXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHYtYXZhdGFyPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIDpzcmM9XCJkYXRhLml0ZW0uYXZhdGFyXCI+XG4gICAgICAgICAgICAgICAgPC92LWF2YXRhcj5cbiAgICAgICAgICAgICAgICB7eyBkYXRhLml0ZW0ubmFtZSB9fVxuICAgICAgICAgICAgICAgIDwvdi1jaGlwPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwiaXRlbVwiIHNjb3BlPVwiZGF0YVwiPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwidHlwZW9mIGRhdGEuaXRlbSAhPT0gJ29iamVjdCdcIj5cbiAgICAgICAgICAgICAgICA8di1saXN0LXRpbGUtY29udGVudCB2LXRleHQ9XCJkYXRhLml0ZW1cIj48L3YtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1hdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgdi1iaW5kOnNyYz1cImRhdGEuaXRlbS5hdmF0YXJcIi8+XG4gICAgICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1hdmF0YXI+XG4gICAgICAgICAgICAgICAgPHYtbGlzdC10aWxlLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDx2LWxpc3QtdGlsZS10aXRsZSB2LWh0bWw9XCJkYXRhLml0ZW0ubmFtZVwiPjwvdi1saXN0LXRpbGUtdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1zdWItdGl0bGUgdi1odG1sPVwiZGF0YS5pdGVtLmdyb3VwXCI+PC92LWxpc3QtdGlsZS1zdWItdGl0bGU+XG4gICAgICAgICAgICAgICAgPC92LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC92LXNlbGVjdD5cbiAgICAgICAgICAgIDx2LWJ0biBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2submF0aXZlPVwiZm9yd2FyZCgpXCI+Q29udGludWU8L3YtYnRuPlxuICAgICAgICAgICAgPHYtYnRuIG91dGxpbmUgY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cImJhY2soKVwiPkJhY2s8L3YtYnRuPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICA8L3YtY29udGFpbmVyPlxuICAgIDwvdi1jYXJkLXRleHQ+XG48L3YtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBjcmVhdGVOYW1lc3BhY2VkSGVscGVycyB9IGZyb20gJ3Z1ZXgnXG5jb25zdCB7IG1hcE11dGF0aW9ucywgbWFwQWN0aW9ucywgbWFwR2V0dGVycyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2NoZWNrb3V0JylcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcEdldHRlcnMoW1xuICAgICAgICAgICAgJ2dldE1vZGVPZlBheW1lbnQnLFxuICAgICAgICAgICAgJ2dldEdhdGV3YXlzJ1xuICAgICAgICBdKSxcbiAgICAgICAgbW9wOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE1vZGVPZlBheW1lbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb2RlT2ZQYXltZW50KHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW50OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0Q3VycmVudCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldEN1cnJlbnQnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3RlcDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldFN0ZXAnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRTdGVwJywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbmV4dDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1snd2l6YXJkL2dldE5leHQnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXROZXh0JywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0UHJldmlvdXMnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3dpemFyZC9zZXRQcmV2aW91cycsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxuICAgIGNyZWF0ZWQgKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRHYXRld2F5cy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0aGlzLmZldGNoR2F0ZXdheXMoKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIC4uLm1hcE11dGF0aW9ucyhbXG4gICAgICAgICAgICAnc2V0TW9kZU9mUGF5bWVudCdcbiAgICAgICAgXSksXG4gICAgICAgIC4uLm1hcEFjdGlvbnMoW1xuICAgICAgICAgICAgJ2ZldGNoR2F0ZXdheXMnXG4gICAgICAgIF0pLFxuICAgICAgICBmb3J3YXJkICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi4kdmFsaWRhdG9yLnZhbGlkYXRlQWxsKClcbiAgICAgICAgICAgIHNlbGYuc2V0VmFsaWRhdGVkKClcbiAgICAgICAgICAgIHNlbGYuJHN0b3JlLmRpc3BhdGNoKCd3aXphcmQvbW92ZScsIHNlbGYubmV4dClcbiAgICAgICAgfSxcbiAgICAgICAgYmFjayAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuJHZhbGlkYXRvci52YWxpZGF0ZUFsbCgpXG4gICAgICAgICAgICBzZWxmLnNldFZhbGlkYXRlZCgpXG4gICAgICAgICAgICBzZWxmLiRzdG9yZS5kaXNwYXRjaCgnd2l6YXJkL21vdmUnLCBzZWxmLnByZXZpb3VzKVxuICAgICAgICB9LFxuICAgICAgICBzZXRWYWxpZGF0ZWQgKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVycm9ycy5hbnkoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC52YWxpZGF0ZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC52YWxpZGF0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcFZhbGlkYXRlZCcsIHRoaXMuY3VycmVudClcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbW9kZS1vZi1wYXltZW50LnZ1ZT81N2YxYTEzNyIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWNhcmRcIixcbiAgICB7IGF0dHJzOiB7IGZsYXQ6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtY2FyZC10ZXh0XCIsXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJmb3JtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXNlbGVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTZWxlY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogX3ZtLmdldEdhdGV3YXlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXRlbS10ZXh0XCI6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXRlbS12YWx1ZVwiOiBcInNsdWdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1heC1oZWlnaHRcIjogXCI0MDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIlBheW1lbnQgT3B0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGVyc2lzdGVudC1oaW50XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJtb3BcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJldHVybi1vYmplY3RcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVycm9yLW1lc3NhZ2VzXCI6IF92bS5lcnJvcnMuY29sbGVjdChcIm1vcFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwic2VsZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNoaXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBKU09OLnN0cmluZ2lmeShkYXRhLml0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzZWxlY3RlZDogZGF0YS5zZWxlY3RlZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucGFyZW50LnNlbGVjdEl0ZW0oZGF0YS5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWF2YXRhclwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBkYXRhLml0ZW0uYXZhdGFyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhkYXRhLml0ZW0ubmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJpdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBkYXRhLml0ZW0gIT09IFwib2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1saXN0LXRpbGUtY29udGVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogX3ZtLl9zKGRhdGEuaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtbGlzdC10aWxlLWF2YXRhclwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogZGF0YS5pdGVtLmF2YXRhciB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtbGlzdC10aWxlLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWxpc3QtdGlsZS10aXRsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLml0ZW0ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1saXN0LXRpbGUtc3ViLXRpdGxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaXRlbS5ncm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ubW9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5tb3AgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwibW9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5mb3J3YXJkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJDb250aW51ZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG91dGxpbmU6IFwiXCIsIGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5iYWNrKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJCYWNrXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0wN2EyNDQ1YlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMDdhMjQ0NWJcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvbW9kZS1vZi1wYXltZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzc1XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjI1N2MwMjVcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vc3VjY2Vzcy1vcmRlci52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vc3VjY2Vzcy1vcmRlci52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTYyNTdjMDI1XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3N1Y2Nlc3Mtb3JkZXIudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcY29tcG9uZW50c1xcXFxjaGVja291dFxcXFxzdWNjZXNzLW9yZGVyLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gc3VjY2Vzcy1vcmRlci52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNjI1N2MwMjVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi02MjU3YzAyNVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3N1Y2Nlc3Mtb3JkZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA3NzZcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTYyNTdjMDI1XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3N1Y2Nlc3Mtb3JkZXIudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI2MDJlNmY0ZVwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02MjU3YzAyNVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9zdWNjZXNzLW9yZGVyLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02MjU3YzAyNVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9zdWNjZXNzLW9yZGVyLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi02MjU3YzAyNVwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3N1Y2Nlc3Mtb3JkZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA3Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJzdWNjZXNzLW9yZGVyLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTYyNTdjMDI1XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvc3VjY2Vzcy1vcmRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDc3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCI8dGVtcGxhdGU+XG4gIDx2LWNhcmQgY2xhc3M9XCJncmV5IGxpZ2h0ZW4tMSBtYi01XCIgaGVpZ2h0PVwiMjAwcHhcIj48L3YtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJvcHM6IFsnZW1haWwnXSxcbiAgICBkYXRhOiAoKSA9PiAoe1xuXG4gICAgfSksXG4gICAgbWV0aG9kczoge1xuICAgICAgICBsb2dpbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9naW5pbmcgSW4gVG8gQ3VzdG9tZXIgRGFzaGJvYXJkJylcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3VjY2Vzcy1vcmRlci52dWU/MTE1YTY0NWUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwidi1jYXJkXCIsIHtcbiAgICBzdGF0aWNDbGFzczogXCJncmV5IGxpZ2h0ZW4tMSBtYi01XCIsXG4gICAgYXR0cnM6IHsgaGVpZ2h0OiBcIjIwMHB4XCIgfVxuICB9KVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNjI1N2MwMjVcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTYyNTdjMDI1XCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L3N1Y2Nlc3Mtb3JkZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA3ODBcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02OTg1NDI4YVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9kZWxpdmVyeS1tZXRob2QudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL2RlbGl2ZXJ5LW1ldGhvZC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTY5ODU0MjhhXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2RlbGl2ZXJ5LW1ldGhvZC52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxjb21wb25lbnRzXFxcXGNoZWNrb3V0XFxcXGRlbGl2ZXJ5LW1ldGhvZC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIGRlbGl2ZXJ5LW1ldGhvZC52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNjk4NTQyOGFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi02OTg1NDI4YVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2NoZWNrb3V0L2RlbGl2ZXJ5LW1ldGhvZC52dWVcbi8vIG1vZHVsZSBpZCA9IDc4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjk4NTQyOGFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vZGVsaXZlcnktbWV0aG9kLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMTc1YmY4NmNcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjk4NTQyOGFcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vZGVsaXZlcnktbWV0aG9kLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02OTg1NDI4YVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9kZWxpdmVyeS1tZXRob2QudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTY5ODU0MjhhXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvZGVsaXZlcnktbWV0aG9kLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzgyXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwiZGVsaXZlcnktbWV0aG9kLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTY5ODU0MjhhXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2hlY2tvdXQvZGVsaXZlcnktbWV0aG9kLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzgzXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIjx0ZW1wbGF0ZT5cbjx2LWNhcmQgZmxhdD5cbiAgICA8di1jYXJkLXRleHQ+XG4gICAgPHYtY29udGFpbmVyIGZsdWlkPlxuICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgPHYtc2VsZWN0XG4gICAgICAgICAgICBsYWJlbD1cIlNlbGVjdFwiXG4gICAgICAgICAgICB2LWJpbmQ6aXRlbXM9XCJnZXRDb3VyaWVyc1wiXG4gICAgICAgICAgICB2LW1vZGVsPVwiY291cmllclwiXG4gICAgICAgICAgICBpdGVtLXRleHQ9XCJuYW1lXCJcbiAgICAgICAgICAgIGl0ZW0tdmFsdWU9XCJzbHVnXCJcbiAgICAgICAgICAgIDpjYWNoZS1pdGVtcz1cInRydWVcIlxuICAgICAgICAgICAgbWF4LWhlaWdodD1cIjQwMFwiXG4gICAgICAgICAgICBoaW50PVwiSG93IERvIFlvdSBXYW50IHRvIFJlY2VpdmUgVGhlIFByb2R1Y3RzP1wiXG4gICAgICAgICAgICBwZXJzaXN0ZW50LWhpbnRcbiAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImNvdXJpZXJcIlxuICAgICAgICAgICAgOnJldHVybi1vYmplY3Q9XCJ0cnVlXCJcbiAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdjb3VyaWVyJylcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJzZWxlY3Rpb25cIiBzY29wZT1cImRhdGFcIj5cbiAgICAgICAgICAgICAgICA8di1jaGlwXG4gICAgICAgICAgICAgICAgQGlucHV0PVwiZGF0YS5wYXJlbnQuc2VsZWN0SXRlbShkYXRhLml0ZW0pXCJcbiAgICAgICAgICAgICAgICA6c2VsZWN0ZWQ9XCJkYXRhLnNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICA6a2V5PVwiSlNPTi5zdHJpbmdpZnkoZGF0YS5pdGVtKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx2LWF2YXRhcj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyA6c3JjPVwiZGF0YS5pdGVtLmF2YXRhclwiPlxuICAgICAgICAgICAgICAgIDwvdi1hdmF0YXI+XG4gICAgICAgICAgICAgICAge3sgZGF0YS5pdGVtLm5hbWUgfX1cbiAgICAgICAgICAgICAgICA8L3YtY2hpcD5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cIml0ZW1cIiBzY29wZT1cImRhdGFcIj5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cInR5cGVvZiBkYXRhLml0ZW0gIT09ICdvYmplY3QnXCI+XG4gICAgICAgICAgICAgICAgPHYtbGlzdC10aWxlLWNvbnRlbnQgdi10ZXh0PVwiZGF0YS5pdGVtXCI+PC92LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICA8di1saXN0LXRpbGUtYXZhdGFyPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHYtYmluZDpzcmM9XCJkYXRhLml0ZW0uYXZhdGFyXCIvPlxuICAgICAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtYXZhdGFyPlxuICAgICAgICAgICAgICAgIDx2LWxpc3QtdGlsZS1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8di1saXN0LXRpbGUtdGl0bGUgdi1odG1sPVwiZGF0YS5pdGVtLm5hbWVcIj48L3YtbGlzdC10aWxlLXRpdGxlPlxuICAgICAgICAgICAgICAgICAgICA8di1saXN0LXRpbGUtc3ViLXRpdGxlIHYtaHRtbD1cImRhdGEuaXRlbS5ncm91cFwiPjwvdi1saXN0LXRpbGUtc3ViLXRpdGxlPlxuICAgICAgICAgICAgICAgIDwvdi1saXN0LXRpbGUtY29udGVudD5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvdi1zZWxlY3Q+XG4gICAgICAgICAgICA8di1idG4gY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cImZvcndhcmQoKVwiPkNvbnRpbnVlPC92LWJ0bj5cbiAgICAgICAgICAgIDx2LWJ0biBvdXRsaW5lIGNvbG9yPVwicHJpbWFyeVwiIEBjbGljay5uYXRpdmU9XCJiYWNrKClcIj5CYWNrPC92LWJ0bj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgPC92LWNvbnRhaW5lcj5cbiAgICA8L3YtY2FyZC10ZXh0PlxuPC92LWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfSBmcm9tICd2dWV4J1xuY29uc3QgeyBtYXBNdXRhdGlvbnMsIG1hcEFjdGlvbnMsIG1hcEdldHRlcnMgfSA9IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzKCdjaGVja291dCcpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb21wdXRlZDoge1xuICAgICAgICAuLi5tYXBHZXR0ZXJzKFtcbiAgICAgICAgICAgICdnZXREZWxpdmVyeU1ldGhvZCcsXG4gICAgICAgICAgICAnZ2V0Q291cmllcnMnXG4gICAgICAgIF0pLFxuICAgICAgICBjb3VyaWVyOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERlbGl2ZXJ5TWV0aG9kXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGVsaXZlcnlNZXRob2QodmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRDdXJyZW50J11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0Q3VycmVudCcsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdGVwOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0U3RlcCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFN0ZXAnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzWyd3aXphcmQvZ2V0TmV4dCddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldE5leHQnLCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJldmlvdXM6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3dpemFyZC9nZXRQcmV2aW91cyddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFByZXZpb3VzJywgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgY3JlYXRlZCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldENvdXJpZXJzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hDb3VyaWVycygpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgLi4ubWFwTXV0YXRpb25zKFtcbiAgICAgICAgICAgICdzZXREZWxpdmVyeU1ldGhvZCdcbiAgICAgICAgXSksXG4gICAgICAgIC4uLm1hcEFjdGlvbnMoW1xuICAgICAgICAgICAgJ2ZldGNoQ291cmllcnMnXG4gICAgICAgIF0pLFxuICAgICAgICBmb3J3YXJkICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi4kdmFsaWRhdG9yLnZhbGlkYXRlQWxsKClcbiAgICAgICAgICAgIHNlbGYuc2V0VmFsaWRhdGVkKClcbiAgICAgICAgICAgIHNlbGYuc2V0QWN0aXZlU3RlcHMoKVxuICAgICAgICAgICAgc2VsZi4kc3RvcmUuZGlzcGF0Y2goJ3dpemFyZC9tb3ZlJywgc2VsZi5uZXh0KVxuICAgICAgICB9LFxuICAgICAgICBiYWNrICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi4kdmFsaWRhdG9yLnZhbGlkYXRlQWxsKClcbiAgICAgICAgICAgIHNlbGYuc2V0VmFsaWRhdGVkKClcbiAgICAgICAgICAgIHNlbGYuc2V0QWN0aXZlU3RlcHMoKVxuICAgICAgICAgICAgc2VsZi4kc3RvcmUuZGlzcGF0Y2goJ3dpemFyZC9tb3ZlJywgc2VsZi5wcmV2aW91cylcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsaWRhdGVkICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5lcnJvcnMuYW55KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQudmFsaWRhdGVkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQudmFsaWRhdGVkID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFN0ZXBWYWxpZGF0ZWQnLCB0aGlzLmN1cnJlbnQpXG4gICAgICAgIH0sXG4gICAgICAgIHNldEFjdGl2ZVN0ZXBzICgpIHtcbiAgICAgICAgICAgIGxldCBwaWNrdXAgPSBfLmZpbHRlcih0aGlzLmdldENvdXJpZXJzLCBfLml0ZXJhdGVlKFsnZ3JvdXAnLCAnUGljayBVcCBMb2NhdGlvbiddKSlcbiAgICAgICAgICAgIGxldCBtZWV0dXAgPSBfLmZpbHRlcih0aGlzLmdldENvdXJpZXJzLCBfLml0ZXJhdGVlKFsnZ3JvdXAnLCAnTWVldCBVcCddKSlcbiAgICAgICAgICAgIGxldCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogJ3NoaXBwaW5nLWRldGFpbHMnLFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF8uaW5jbHVkZXMocGlja3VwLCB0aGlzLmNvdXJpZXIpIHwgXy5pbmNsdWRlcyhtZWV0dXAsIHRoaXMuY291cmllcikpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCd3aXphcmQvc2V0U3RlcFN0YXR1cycsIHBheWxvYWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnd2l6YXJkL3NldFN0ZXBTdGF0dXMnLCBwYXlsb2FkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGRlbGl2ZXJ5LW1ldGhvZC52dWU/YzJmNTNkNzAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1jYXJkXCIsXG4gICAgeyBhdHRyczogeyBmbGF0OiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWNhcmQtdGV4dFwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGZsdWlkOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zZWxlY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IF92bS5nZXRDb3VyaWVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW0tdGV4dFwiOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW0tdmFsdWVcIjogXCJzbHVnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYWNoZS1pdGVtc1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4LWhlaWdodFwiOiBcIjQwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiSG93IERvIFlvdSBXYW50IHRvIFJlY2VpdmUgVGhlIFByb2R1Y3RzP1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGVyc2lzdGVudC1oaW50XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJjb3VyaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXR1cm4tb2JqZWN0XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJjb3VyaWVyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJzZWxlY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY2hpcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IEpTT04uc3RyaW5naWZ5KGRhdGEuaXRlbSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNlbGVjdGVkOiBkYXRhLnNlbGVjdGVkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wYXJlbnQuc2VsZWN0SXRlbShkYXRhLml0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtYXZhdGFyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzcmM6IGRhdGEuaXRlbS5hdmF0YXIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKGRhdGEuaXRlbS5uYW1lKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcIml0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGRhdGEuaXRlbSAhPT0gXCJvYmplY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWxpc3QtdGlsZS1jb250ZW50XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBfdm0uX3MoZGF0YS5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1saXN0LXRpbGUtYXZhdGFyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBkYXRhLml0ZW0uYXZhdGFyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1saXN0LXRpbGUtY29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtbGlzdC10aWxlLXRpdGxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaXRlbS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWxpc3QtdGlsZS1zdWItdGl0bGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pdGVtLmdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jb3VyaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jb3VyaWVyID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImNvdXJpZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmZvcndhcmQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIkNvbnRpbnVlXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgb3V0bGluZTogXCJcIiwgY29sb3I6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmJhY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIkJhY2tcIildXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTY5ODU0MjhhXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02OTg1NDI4YVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9jaGVja291dC9kZWxpdmVyeS1tZXRob2QudnVlXG4vLyBtb2R1bGUgaWQgPSA3ODVcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIm1vZGFsLWxheW91dFwiLFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtdG9vbGJhclwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImFjY2VudFwiLCBhdHRyczogeyBzbG90OiBcInRvb2xiYXJcIiB9LCBzbG90OiBcInRvb2xiYXJcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7IGZsYXQ6IFwiXCIsIGljb246IFwiXCIsIGNvbG9yOiBcImVycm9yXCIgfSxcbiAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBfdm0ucmVkaXJlY3RCYWNrKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLXRpbWVzXCIpXSldLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtdG9vbGJhci10aXRsZVwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlciBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICBDaGVja291dCBPcmRlciBGb3JtXFxuICAgICAgICBcIildXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1zcGFjZXJcIilcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LXN0ZXBwZXJcIixcbiAgICAgICAge1xuICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICB2YWx1ZTogX3ZtLnN0ZXAsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgIF92bS5zdGVwID0gJCR2XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzdGVwXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1zdGVwcGVyLWhlYWRlclwiLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0uX2woX3ZtLmdldEFjdGl2ZVN0ZXBzLCBmdW5jdGlvbihhY3RpdmUsIGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LXN0ZXBwZXItc3RlcFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHBhcnNlSW50KGtleSArIDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IHBhcnNlSW50KF92bS5zdGVwKSA+IHBhcnNlSW50KGtleSArIDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5nZXRBY3RpdmVTdGVwc1trZXldLnZhbGlkYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwicHJpbWFyeS0tdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoYWN0aXZlLnRpdGxlKSlcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwic21hbGxcIiwgeyBzdGF0aWNDbGFzczogXCJpbmZvLS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhhY3RpdmUuc3VidGl0bGUpKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoa2V5ICsgMSkgIT09IF92bS5nZXRBY3RpdmVTdGVwcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcInYtZGl2aWRlclwiLCB7IGtleToga2V5IH0pXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMlxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uX2woX3ZtLmdldEFjdGl2ZVN0ZXBzLCBmdW5jdGlvbihhY3RpdmUsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICBcInYtc3RlcHBlci1jb250ZW50XCIsXG4gICAgICAgICAgICAgIHsga2V5OiBrZXksIGF0dHJzOiB7IHN0ZXA6IHBhcnNlSW50KGtleSArIDEpIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICAgIHsgc3RhdGljU3R5bGU6IHsgXCJtaW4taGVpZ2h0XCI6IFwiNjAwcHhcIiB9IH0sXG4gICAgICAgICAgICAgICAgICBbX2MoYWN0aXZlLmNvbXBvbmVudCwgeyB0YWc6IFwiY29tcG9uZW50XCIgfSldLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDJcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1mb290ZXJcIixcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiBbX3ZtLmZvb3RlckNsYXNzXSxcbiAgICAgICAgICBhdHRyczogeyBzbG90OiBcImZvb3RlclwiLCBmaXhlZDogXCJcIiB9LFxuICAgICAgICAgIHNsb3Q6IFwiZm9vdGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICBcIsKpIFwiICtcbiAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLnllYXIpICtcbiAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5kb21haW4pICtcbiAgICAgICAgICAgICAgICBcIiDCriB8IFwiICtcbiAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLnRyYWRlbWFyaykgK1xuICAgICAgICAgICAgICAgIFwi4oSiXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1zcGFjZXJcIilcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi05ZmMxMzRlMFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtOWZjMTM0ZTBcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvQ2hlY2tvdXQudnVlXG4vLyBtb2R1bGUgaWQgPSA3ODZcbi8vIG1vZHVsZSBjaHVua3MgPSA0Il0sInNvdXJjZVJvb3QiOiIifQ==