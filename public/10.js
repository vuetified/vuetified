webpackJsonp([10],{

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(737)
/* template */
var __vue_template__ = __webpack_require__(741)
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
Component.options.__file = "resources\\assets\\js\\components\\Cart.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Cart.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-faa94d2c", Component.options)
  } else {
    hotAPI.reload("data-v-faa94d2c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 651:
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
var getKeys = __webpack_require__(89);
var gOPS = __webpack_require__(130);
var pIE = __webpack_require__(90);
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

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = null
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

/***/ 692:
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

/***/ 693:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(694), __esModule: true };

/***/ }),

/***/ 694:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(695);
module.exports = __webpack_require__(31).Object.values;


/***/ }),

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(60);
var $values = __webpack_require__(696)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ 696:
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(89);
var toIObject = __webpack_require__(53);
var isEnum = __webpack_require__(90).f;
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

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Basket_vue__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Basket_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Basket_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(88);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["createNamespacedHelpers"])('cart'),
    mapGetters = _createNamespacedHelp.mapGetters;

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            count: 0
        };
    },
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapGetters({
        getCount: 'getCount'
    }), {
        isDark: function isDark() {
            return this.dark === true;
        }
    }),
    components: {
        ModalLayout: __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout___default.a,
        Basket: __WEBPACK_IMPORTED_MODULE_2__Basket_vue___default.a
    },
    mounted: function mounted() {
        var self = this;
        self.count = self.getCount;
    },

    methods: {
        redirectBack: function redirectBack() {
            var self = this;
            self.$router.push({ path: self.$store.state.route.from.fullPath });
        },
        checkout: function checkout() {
            var self = this;
            return self.$nextTick(function () {
                return self.$router.push({ name: 'checkout' });
            });
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

/***/ 738:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(739)
/* template */
var __vue_template__ = __webpack_require__(740)
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
Component.options.__file = "resources\\assets\\js\\components\\Basket.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Basket.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a58b090", Component.options)
  } else {
    hotAPI.reload("data-v-7a58b090", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(88);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    mapActions = _createNamespacedHelp.mapActions,
    mapGetters = _createNamespacedHelp.mapGetters;

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            currency: '₱',
            /* Table Specific */
            search: '',
            selected: [],
            headers: [{ text: 'Name', value: 'name', align: 'left', sortable: true }, { text: 'Qty', value: 'qty', align: 'left', sortable: true }, { text: 'Price', value: 'price', align: 'left', sortable: true }, { text: 'Amount', value: 'subtotal', align: 'left', sortable: true }, { text: 'Update', align: 'center', sortable: false }, { text: 'Delete', align: 'center', sortable: false }],
            /* Cart Specific */
            items: [],
            tax: 0,
            subtotal: 0,
            total: 0,
            count: 0,
            maxCount: function maxCount(v) {
                return parseInt(v) <= 999 || 'Max Qty is 999';
            },
            /* current updated item */
            tmp: ''
        };
    },

    computed: __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapGetters({
        getItems: 'getItems',
        getTax: 'getTax',
        getSubTotal: 'getSubTotal',
        getTotal: 'getTotal',
        getCount: 'getCount'
    }), {
        avatarSize: function avatarSize() {
            return this.size + 'px';
        },
        isDark: function isDark() {
            return this.dark === true;
        }
    }),
    mounted: function mounted() {
        var self = this;
        self.items = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values___default()(self.getItems);
        self.selected = self.items;
        self.tax = self.getTax;
        self.subtotal = self.getSubTotal;
        self.total = self.getTotal;
        self.count = self.getCount;
    },

    methods: __WEBPACK_IMPORTED_MODULE_1_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapActions({
        removeItem: 'removeItem', /* params: product.id , request: rowId */
        destroyCart: 'destroyCart',
        updateItem: 'updateItem' /* params: product.id and product.qty, request: rowId and qty */
    }), {
        updateCartItem: function updateCartItem(tmp) {
            if (tmp.qty > 999) {
                tmp.qty = 999;
            }
            var payload = { qty: tmp.qty, id: tmp.id };

            this.updateItem(payload);
        },
        emptyCart: function emptyCart() {
            var self = this;
            self.destroyCart();
        },
        removeFromCart: function removeFromCart(id) {
            var self = this;
            self.removeItem(id);
        },
        closeCart: function closeCart() {
            Bus.$emit('close-cart');
        }
    }),
    watch: {
        getTax: function getTax(newValue) {
            var self = this;
            self.tax = newValue;
        },
        getCount: function getCount(newValue) {
            var self = this;
            self.count = newValue;
        },
        getItems: function getItems(newValue) {
            var self = this;
            self.items = __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_core_js_object_values___default()(newValue);
        },
        getSubTotal: function getSubTotal(newValue) {
            var self = this;
            self.subtotal = newValue;
        },
        getTotal: function getTotal(newValue) {
            var self = this;
            self.total = newValue;
        }
    }
});

/***/ }),

/***/ 740:
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
        "v-container",
        { attrs: { fluid: "" } },
        [
          _c(
            "v-card-title",
            [
              _c(
                "v-tooltip",
                { attrs: { top: "" } },
                [
                  _vm.count > 0
                    ? _c(
                        "v-btn",
                        {
                          attrs: {
                            slot: "activator",
                            flat: "",
                            icon: "",
                            color: "red lighten-2"
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
                  _c("span", [_vm._v("Empty Cart")])
                ],
                1
              ),
              _vm._v(" "),
              _vm.items.length > 0
                ? _c("v-text-field", {
                    attrs: {
                      "append-icon": "search",
                      label: "Search For Product In Cart",
                      "single-line": ""
                    },
                    model: {
                      value: _vm.search,
                      callback: function($$v) {
                        _vm.search = $$v
                      },
                      expression: "search"
                    }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("v-data-table", {
            attrs: {
              headers: _vm.headers,
              items: _vm.items,
              search: _vm.search,
              "selected-key": "id",
              "select-all": ""
            },
            scopedSlots: _vm._u([
              {
                key: "items",
                fn: function(props) {
                  return [
                    _c(
                      "td",
                      [
                        _c("v-checkbox", {
                          attrs: { color: "primary", "hide-details": "" },
                          model: {
                            value: props.selected,
                            callback: function($$v) {
                              props.selected = $$v
                            },
                            expression: "props.selected"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      { staticClass: "title text-xs-left primary--text" },
                      [_vm._v(_vm._s(props.item.name))]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      { staticClass: "title text-xs-left primary--text" },
                      [_vm._v(_vm._s(props.item.qty))]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      { staticClass: "title text-xs-left primary--text" },
                      [
                        _vm._v(
                          _vm._s(
                            _vm._f("currency")(props.item.price, _vm.currency)
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
                            _vm._f("currency")(
                              props.item.subtotal,
                              _vm.currency
                            )
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
                          "v-edit-dialog",
                          {
                            attrs: { large: "", lazy: "" },
                            on: {
                              open: function($event) {
                                _vm.tmp = props.item
                              },
                              save: function($event) {
                                _vm.updateCartItem(_vm.tmp)
                              }
                            }
                          },
                          [
                            _c(
                              "v-btn",
                              { attrs: { flat: "", color: "teal lighten-2" } },
                              [_c("v-icon", [_vm._v("fa-edit")])],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "mt-3 text-xs-center title primary--text",
                                attrs: { slot: "input" },
                                slot: "input"
                              },
                              [_vm._v("Update Qty")]
                            ),
                            _vm._v(" "),
                            _c("v-text-field", {
                              attrs: {
                                slot: "input",
                                label: "Edit",
                                "single-line": "",
                                counter: "",
                                autofocus: "",
                                rules: [_vm.maxCount]
                              },
                              slot: "input",
                              model: {
                                value: _vm.tmp.qty,
                                callback: function($$v) {
                                  _vm.tmp.qty = $$v
                                },
                                expression: "tmp.qty"
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
                      { staticClass: "title text-xs-center" },
                      [
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
                                _vm.removeFromCart(props.item.id)
                              }
                            }
                          },
                          [_c("v-icon", [_vm._v("delete_forever")])],
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
                      "\n                From " +
                        _vm._s(pageStart) +
                        " to " +
                        _vm._s(pageStop) +
                        "\n            "
                    )
                  ]
                }
              }
            ]),
            model: {
              value: _vm.selected,
              callback: function($$v) {
                _vm.selected = $$v
              },
              expression: "selected"
            }
          }),
          _vm._v(" "),
          _c(
            "v-flex",
            { staticClass: "text-xs-right", attrs: { xs12: "" } },
            [
              _c(
                "v-chip",
                {
                  staticClass: "red lighten-2 white--text title",
                  attrs: { label: "" }
                },
                [
                  _c("v-icon", { attrs: { left: "" } }, [_vm._v("fa-percent")]),
                  _vm._v(
                    " Tax : " +
                      _vm._s(_vm.currency) +
                      " " +
                      _vm._s(_vm.tax) +
                      "\n                "
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
            { staticClass: "text-xs-right", attrs: { xs12: "" } },
            [
              _c(
                "v-chip",
                { staticClass: "info white--text title", attrs: { label: "" } },
                [
                  _c("v-icon", { attrs: { left: "" } }, [
                    _vm._v("shopping_basket")
                  ]),
                  _vm._v(
                    " Subtotal : " +
                      _vm._s(_vm.currency) +
                      " " +
                      _vm._s(_vm.subtotal) +
                      "\n                "
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
            { staticClass: "text-xs-right", attrs: { xs12: "" } },
            [
              _c(
                "v-chip",
                {
                  staticClass: "primary white--text title",
                  attrs: { label: "" }
                },
                [
                  _c("v-icon", { attrs: { left: "" } }, [_vm._v("fa-money")]),
                  _vm._v(
                    " Total : " +
                      _vm._s(_vm.currency) +
                      " " +
                      _vm._s(_vm.total) +
                      "\n                "
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
     require("vue-hot-reload-api").rerender("data-v-7a58b090", module.exports)
  }
}

/***/ }),

/***/ 741:
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
            [_vm._v("Shopping Cart")]
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-toolbar-items",
            [
              _vm.count > 0
                ? _c(
                    "v-btn",
                    {
                      attrs: { color: "success", flat: "" },
                      nativeOn: {
                        click: function($event) {
                          _vm.checkout()
                        }
                      }
                    },
                    [
                      _vm._v("Checkout"),
                      _c("v-icon", { attrs: { right: "" } }, [
                        _vm._v("payment")
                      ])
                    ],
                    1
                  )
                : _c(
                    "v-btn",
                    {
                      attrs: { flat: "", color: "primary" },
                      nativeOn: {
                        click: function($event) {
                          _vm.redirectBack()
                        }
                      }
                    },
                    [_vm._v("Close")]
                  )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("basket")
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
     require("vue-hot-reload-api").rerender("data-v-faa94d2c", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvQ2FydC52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTW9kYWxMYXlvdXQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9Nb2RhbExheW91dC52dWU/YzcwNSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC92YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvdmFsdWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC10by1hcnJheS5qcyIsIndlYnBhY2s6Ly8vQ2FydC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0Jhc2tldC52dWUiLCJ3ZWJwYWNrOi8vL0Jhc2tldC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0Jhc2tldC52dWU/YzQ5YiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvQ2FydC52dWU/ZjZiMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFvTDtBQUNwTDtBQUNBLDhDQUFrSjtBQUNsSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNEQUFzRCxJQUFJO0FBQ3pJLG1DQUFtQzs7QUFFbkM7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7O0FDdkNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7OztBQ3RCQSxrQkFBa0IseUQ7Ozs7Ozs7QUNBbEI7QUFDQTs7Ozs7Ozs7QUNEQTtBQUNBOztBQUVBLDBDQUEwQyxtQ0FBc0M7Ozs7Ozs7OztBQ0hoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsVUFBVSxFQUFFO0FBQ2hELG1CQUFtQixzQ0FBc0M7QUFDekQsQ0FBQyxxQ0FBcUM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7Ozs7Ozs7O0FDakNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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cUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxvQ0FBb0MsU0FBUyxZQUFZLEVBQUU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw2QkFBNkI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiIxMC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0NhcnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1mYWE5NGQyY1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9DYXJ0LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcY29tcG9uZW50c1xcXFxDYXJ0LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gQ2FydC52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtZmFhOTRkMmNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi1mYWE5NGQyY1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcnQudnVlXG4vLyBtb2R1bGUgaWQgPSA2NDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCAxMCAxMSAxMiAxMyAxNSAxNiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDY1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDEwIDExIDEyIDEzIDE1IDE2IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCAxMCAxMSAxMiAxMyAxNSAxNiIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggMTAgMTEgMTIgMTMgMTUgMTYiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCAxMCAxMSAxMiAxMyAxNSAxNiIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gbnVsbFxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZDcyMTk4M2NcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vTW9kYWxMYXlvdXQudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxsYXlvdXRzXFxcXE1vZGFsTGF5b3V0LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gTW9kYWxMYXlvdXQudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LWQ3MjE5ODNjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtZDcyMTk4M2NcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9Nb2RhbExheW91dC52dWVcbi8vIG1vZHVsZSBpZCA9IDY5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAgMTEgMTIgMTMgMTQiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwidi1hcHBcIiwgeyBhdHRyczogeyBzdGFuZGFsb25lOiBcIlwiIH0gfSwgW1xuICAgIF9jKFxuICAgICAgXCJtYWluXCIsXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwYS0wIG1hLTAgd2hpdGVcIixcbiAgICAgICAgICAgIGF0dHJzOiB7IHRyYW5zaXRpb246IFwic2xpZGUteC10cmFuc2l0aW9uXCIsIGZsdWlkOiBcIlwiIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IGZsYXQ6IHRydWUgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX3ZtLl90KFwidG9vbGJhclwiKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF92bS5fdChcImRlZmF1bHRcIiksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfdm0uX3QoXCJmb290ZXJcIilcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICBdLFxuICAgICAgMVxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LWQ3MjE5ODNjXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi1kNzIxOTgzY1wiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvbGF5b3V0cy9Nb2RhbExheW91dC52dWVcbi8vIG1vZHVsZSBpZCA9IDY5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAgMTEgMTIgMTMgMTQiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3ZhbHVlc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvdmFsdWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2OTNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMTAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QudmFsdWVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDY5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAxMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC12YWx1ZXMtZW50cmllc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkdmFsdWVzID0gcmVxdWlyZSgnLi9fb2JqZWN0LXRvLWFycmF5JykoZmFsc2UpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoaXQpIHtcbiAgICByZXR1cm4gJHZhbHVlcyhpdCk7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDY5NVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAxMCIsInZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgaXNFbnVtID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpc0VudHJpZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KGl0KTtcbiAgICB2YXIga2V5cyA9IGdldEtleXMoTyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaSkgaWYgKGlzRW51bS5jYWxsKE8sIGtleSA9IGtleXNbaSsrXSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGlzRW50cmllcyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA2OTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMTAiLCI8dGVtcGxhdGU+XG48bW9kYWwtbGF5b3V0PlxuICAgIDx2LXRvb2xiYXIgY2xhc3M9XCJhY2NlbnRcIiBzbG90PVwidG9vbGJhclwiPlxuICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cInJlZGlyZWN0QmFjaygpXCI+XG4gICAgICAgIDx2LWljb24+YXJyb3dfYmFjazwvdi1pY29uPlxuICAgIDwvdi1idG4+XG4gICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgPHYtdG9vbGJhci10aXRsZSBjbGFzcz1cInRleHQteHMtY2VudGVyIHByaW1hcnktLXRleHRcIj5TaG9wcGluZyBDYXJ0PC92LXRvb2xiYXItdGl0bGU+XG4gICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgPHYtdG9vbGJhci1pdGVtcz5cbiAgICAgICAgPCEtLSBJZiBUaGVyZSBpcyBubyBVc2VyIEFjY291bnQgTG9naW4gWWV0IFJlZGlyZWN0IHRvIEF1dGhlbnRpY2F0aW9uIFBhZ2UgLS0+XG4gICAgICAgIDx2LWJ0biBjb2xvcj1cInN1Y2Nlc3NcIiBmbGF0IEBjbGljay5uYXRpdmU9XCJjaGVja291dCgpXCIgdi1pZj1cImNvdW50ID4gMFwiPkNoZWNrb3V0PHYtaWNvbiByaWdodD5wYXltZW50PC92LWljb24+PC92LWJ0bj5cbiAgICAgICAgPHYtYnRuICBmbGF0ICBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2submF0aXZlPVwicmVkaXJlY3RCYWNrKClcIiB2LWVsc2U+Q2xvc2U8L3YtYnRuPlxuICAgIDwvdi10b29sYmFyLWl0ZW1zPlxuICAgIDwvdi10b29sYmFyPlxuICAgIDxiYXNrZXQ+PC9iYXNrZXQ+XG48L21vZGFsLWxheW91dD5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxuaW1wb3J0IE1vZGFsTGF5b3V0IGZyb20gJy4uL2xheW91dHMvTW9kYWxMYXlvdXQnXG5pbXBvcnQgQmFza2V0IGZyb20gJy4vQmFza2V0LnZ1ZSdcbmltcG9ydCB7IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH0gZnJvbSAndnVleCdcbmNvbnN0IHsgbWFwR2V0dGVycyB9ID0gY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMoJ2NhcnQnKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YTogKCkgPT4gKHtcbiAgICAgICAgY291bnQ6IDBcbiAgICB9KSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICAuLi5tYXBHZXR0ZXJzKHtcbiAgICAgICAgICAgIGdldENvdW50OiAnZ2V0Q291bnQnXG4gICAgICAgIH0pLFxuICAgICAgICBpc0RhcmsgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGFyayA9PT0gdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIE1vZGFsTGF5b3V0LFxuICAgICAgICBCYXNrZXRcbiAgICB9LFxuICAgIG1vdW50ZWQgKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgc2VsZi5jb3VudCA9IHNlbGYuZ2V0Q291bnRcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgcmVkaXJlY3RCYWNrICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi4kcm91dGVyLnB1c2goe3BhdGg6IHNlbGYuJHN0b3JlLnN0YXRlLnJvdXRlLmZyb20uZnVsbFBhdGh9KVxuICAgICAgICB9LFxuICAgICAgICBjaGVja291dCAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHJldHVybiBzZWxmLiRuZXh0VGljaygoKSA9PiBzZWxmLiRyb3V0ZXIucHVzaCh7IG5hbWU6ICdjaGVja291dCcgfSkpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICAgIGdldENvdW50IChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLmNvdW50ID0gbmV3VmFsdWVcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIENhcnQudnVlPzBmMWE5ZTM2IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQmFza2V0LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtN2E1OGIwOTBcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQmFza2V0LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcY29tcG9uZW50c1xcXFxCYXNrZXQudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBCYXNrZXQudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTdhNThiMDkwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtN2E1OGIwOTBcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9CYXNrZXQudnVlXG4vLyBtb2R1bGUgaWQgPSA3Mzhcbi8vIG1vZHVsZSBjaHVua3MgPSAxMCIsIjx0ZW1wbGF0ZT5cbjx2LWNhcmQgZmxhdD5cbiAgICAgICAgPHYtY29udGFpbmVyIGZsdWlkPlxuXG4gICAgICAgICAgICA8di1jYXJkLXRpdGxlPlxuXG4gICAgICAgICAgICA8di10b29sdGlwIHRvcD5cbiAgICAgICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJyZWQgbGlnaHRlbi0yXCIgc2xvdD1cImFjdGl2YXRvclwiIEBjbGljaz1cImVtcHR5Q2FydCgpXCIgdi1pZj1cImNvdW50ID4gMFwiPlxuICAgICAgICAgICAgPHYtaWNvbj5yZW1vdmVfc2hvcHBpbmdfY2FydDwvdi1pY29uPlxuICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgIDxzcGFuPkVtcHR5IENhcnQ8L3NwYW4+XG4gICAgICAgICAgICA8L3YtdG9vbHRpcD5cblxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgIHYtaWY9XCJpdGVtcy5sZW5ndGggPiAwXCJcbiAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cInNlYXJjaFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJTZWFyY2ggRm9yIFByb2R1Y3QgSW4gQ2FydFwiXG4gICAgICAgICAgICAgICAgc2luZ2xlLWxpbmVcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2VhcmNoXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cblxuICAgICAgICAgICAgPC92LWNhcmQtdGl0bGU+XG5cbiAgICAgICAgICAgIDx2LWRhdGEtdGFibGVcbiAgICAgICAgICAgICAgICA6aGVhZGVycz1cImhlYWRlcnNcIlxuICAgICAgICAgICAgICAgIDppdGVtcz1cIml0ZW1zXCJcbiAgICAgICAgICAgICAgICA6c2VhcmNoPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkLWtleT1cImlkXCJcbiAgICAgICAgICAgICAgICBzZWxlY3QtYWxsXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cIml0ZW1zXCIgc2NvcGU9XCJwcm9wc1wiPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgPHYtY2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgaGlkZS1kZXRhaWxzXG4gICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwcm9wcy5zZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC92LWNoZWNrYm94PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj57eyBwcm9wcy5pdGVtLm5hbWUgfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+e3sgcHJvcHMuaXRlbS5xdHkgfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+e3sgcHJvcHMuaXRlbS5wcmljZSB8IGN1cnJlbmN5KGN1cnJlbmN5KSB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj57eyBwcm9wcy5pdGVtLnN1YnRvdGFsIHwgY3VycmVuY3koY3VycmVuY3kpIH19PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWNlbnRlclwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDx2LWVkaXQtZGlhbG9nXG4gICAgICAgICAgICAgICAgICAgIEBvcGVuPVwidG1wID0gcHJvcHMuaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgIEBzYXZlPVwidXBkYXRlQ2FydEl0ZW0odG1wKVwiXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgIGxhenlcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gZmxhdCBjb2xvcj1cInRlYWwgbGlnaHRlbi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+ZmEtZWRpdDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJpbnB1dFwiIGNsYXNzPVwibXQtMyB0ZXh0LXhzLWNlbnRlciB0aXRsZSBwcmltYXJ5LS10ZXh0XCI+VXBkYXRlIFF0eTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICAgICAgc2xvdD1cImlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJFZGl0XCJcbiAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInRtcC5xdHlcIlxuICAgICAgICAgICAgICAgICAgICBzaW5nbGUtbGluZVxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgICAgICA6cnVsZXM9XCJbbWF4Q291bnRdXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L3YtdGV4dC1maWVsZD5cblxuICAgICAgICAgICAgICAgICAgICA8L3YtZWRpdC1kaWFsb2c+XG5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJyZWQgbGlnaHRlbi0yXCIgQGNsaWNrLm5hdGl2ZT1cInJlbW92ZUZyb21DYXJ0KHByb3BzLml0ZW0uaWQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+ZGVsZXRlX2ZvcmV2ZXI8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuXG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cInBhZ2VUZXh0XCIgc2NvcGU9XCJ7IHBhZ2VTdGFydCwgcGFnZVN0b3AgfVwiPlxuICAgICAgICAgICAgICAgIEZyb20ge3sgcGFnZVN0YXJ0IH19IHRvIHt7IHBhZ2VTdG9wIH19XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgICAgICA8L3YtZGF0YS10YWJsZT5cblxuICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwidGV4dC14cy1yaWdodFwiPlxuICAgICAgICAgICAgICAgICA8di1jaGlwIGxhYmVsIGNsYXNzPVwicmVkIGxpZ2h0ZW4tMiB3aGl0ZS0tdGV4dCB0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8di1pY29uIGxlZnQ+ZmEtcGVyY2VudDwvdi1pY29uPiBUYXggOiB7eyBjdXJyZW5jeSB9fSB7eyB0YXggfX1cbiAgICAgICAgICAgICAgICA8L3YtY2hpcD5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LXhzLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPHYtY2hpcCBsYWJlbCBjbGFzcz1cImluZm8gd2hpdGUtLXRleHQgdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBsZWZ0PnNob3BwaW5nX2Jhc2tldDwvdi1pY29uPiBTdWJ0b3RhbCA6IHt7IGN1cnJlbmN5IH19IHt7IHN1YnRvdGFsIH19XG4gICAgICAgICAgICAgICAgPC92LWNoaXA+XG4gICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwidGV4dC14cy1yaWdodFwiPlxuICAgICAgICAgICAgICAgIDx2LWNoaXAgbGFiZWwgY2xhc3M9XCJwcmltYXJ5IHdoaXRlLS10ZXh0IHRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24gbGVmdD5mYS1tb25leTwvdi1pY29uPiBUb3RhbCA6IHt7IGN1cnJlbmN5IH19IHt7IHRvdGFsIH19XG4gICAgICAgICAgICAgICAgPC92LWNoaXA+XG4gICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8L3YtY29udGFpbmVyPlxuXG4gICAgICA8L3YtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBjcmVhdGVOYW1lc3BhY2VkSGVscGVycyB9IGZyb20gJ3Z1ZXgnXG5jb25zdCB7IG1hcEFjdGlvbnMsIG1hcEdldHRlcnMgfSA9IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzKCdjYXJ0JylcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGEgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3VycmVuY3k6ICfigrEnLFxuICAgICAgICAgICAgLyogVGFibGUgU3BlY2lmaWMgKi9cbiAgICAgICAgICAgIHNlYXJjaDogJycsXG4gICAgICAgICAgICBzZWxlY3RlZDogW10sXG4gICAgICAgICAgICBoZWFkZXJzOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTmFtZScsIHZhbHVlOiAnbmFtZScsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnUXR5JywgdmFsdWU6ICdxdHknLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1ByaWNlJywgdmFsdWU6ICdwcmljZScsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnQW1vdW50JywgdmFsdWU6ICdzdWJ0b3RhbCcsIGFsaWduOiAnbGVmdCcsIHNvcnRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnVXBkYXRlJywgYWxpZ246ICdjZW50ZXInLCBzb3J0YWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZWxldGUnLCBhbGlnbjogJ2NlbnRlcicsIHNvcnRhYmxlOiBmYWxzZSB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgLyogQ2FydCBTcGVjaWZpYyAqL1xuICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgdGF4OiAwLFxuICAgICAgICAgICAgc3VidG90YWw6IDAsXG4gICAgICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICAgICAgbWF4Q291bnQ6ICh2KSA9PiBwYXJzZUludCh2KSA8PSA5OTkgfHwgJ01heCBRdHkgaXMgOTk5JyxcbiAgICAgICAgICAgIC8qIGN1cnJlbnQgdXBkYXRlZCBpdGVtICovXG4gICAgICAgICAgICB0bXA6ICcnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIC4uLm1hcEdldHRlcnMoe1xuICAgICAgICAgICAgZ2V0SXRlbXM6ICdnZXRJdGVtcycsXG4gICAgICAgICAgICBnZXRUYXg6ICdnZXRUYXgnLFxuICAgICAgICAgICAgZ2V0U3ViVG90YWw6ICdnZXRTdWJUb3RhbCcsXG4gICAgICAgICAgICBnZXRUb3RhbDogJ2dldFRvdGFsJyxcbiAgICAgICAgICAgIGdldENvdW50OiAnZ2V0Q291bnQnXG4gICAgICAgIH0pLFxuICAgICAgICBhdmF0YXJTaXplICgpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnNpemV9cHhgXG4gICAgICAgIH0sXG4gICAgICAgIGlzRGFyayAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXJrID09PSB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vdW50ZWQgKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgc2VsZi5pdGVtcyA9IE9iamVjdC52YWx1ZXMoc2VsZi5nZXRJdGVtcylcbiAgICAgICAgc2VsZi5zZWxlY3RlZCA9IHNlbGYuaXRlbXNcbiAgICAgICAgc2VsZi50YXggPSBzZWxmLmdldFRheFxuICAgICAgICBzZWxmLnN1YnRvdGFsID0gc2VsZi5nZXRTdWJUb3RhbFxuICAgICAgICBzZWxmLnRvdGFsID0gc2VsZi5nZXRUb3RhbFxuICAgICAgICBzZWxmLmNvdW50ID0gc2VsZi5nZXRDb3VudFxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICAuLi5tYXBBY3Rpb25zKHtcbiAgICAgICAgICAgIHJlbW92ZUl0ZW06ICdyZW1vdmVJdGVtJywgLyogcGFyYW1zOiBwcm9kdWN0LmlkICwgcmVxdWVzdDogcm93SWQgKi9cbiAgICAgICAgICAgIGRlc3Ryb3lDYXJ0OiAnZGVzdHJveUNhcnQnLFxuICAgICAgICAgICAgdXBkYXRlSXRlbTogJ3VwZGF0ZUl0ZW0nIC8qIHBhcmFtczogcHJvZHVjdC5pZCBhbmQgcHJvZHVjdC5xdHksIHJlcXVlc3Q6IHJvd0lkIGFuZCBxdHkgKi9cbiAgICAgICAgfSksXG4gICAgICAgIHVwZGF0ZUNhcnRJdGVtICh0bXApIHtcbiAgICAgICAgICAgIGlmICh0bXAucXR5ID4gOTk5KSB7XG4gICAgICAgICAgICAgICAgdG1wLnF0eSA9IDk5OVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBheWxvYWQgPSB7cXR5OiB0bXAucXR5LCBpZDogdG1wLmlkfVxuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUl0ZW0ocGF5bG9hZClcbiAgICAgICAgfSxcbiAgICAgICAgZW1wdHlDYXJ0ICgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5kZXN0cm95Q2FydCgpXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUZyb21DYXJ0IChpZCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLnJlbW92ZUl0ZW0oaWQpXG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlQ2FydCAoKSB7XG4gICAgICAgICAgICBCdXMuJGVtaXQoJ2Nsb3NlLWNhcnQnKVxuICAgICAgICB9XG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgICBnZXRUYXggKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYudGF4ID0gbmV3VmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q291bnQgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuY291bnQgPSBuZXdWYWx1ZVxuICAgICAgICB9LFxuICAgICAgICBnZXRJdGVtcyAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgc2VsZi5pdGVtcyA9IE9iamVjdC52YWx1ZXMobmV3VmFsdWUpXG4gICAgICAgIH0sXG4gICAgICAgIGdldFN1YlRvdGFsIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLnN1YnRvdGFsID0gbmV3VmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VG90YWwgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYudG90YWwgPSBuZXdWYWx1ZVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gQmFza2V0LnZ1ZT8zYmZjNWE5YSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWNhcmRcIixcbiAgICB7IGF0dHJzOiB7IGZsYXQ6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY2FyZC10aXRsZVwiLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdG9wOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0uY291bnQgPiAwXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwicmVkIGxpZ2h0ZW4tMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmVtcHR5Q2FydCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJyZW1vdmVfc2hvcHBpbmdfY2FydFwiKV0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJFbXB0eSBDYXJ0XCIpXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX3ZtLml0ZW1zLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICA/IF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2VhcmNoIEZvciBQcm9kdWN0IEluIENhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInNpbmdsZS1saW5lXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNlYXJjaCxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VhcmNoID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ2LWRhdGEtdGFibGVcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgaGVhZGVyczogX3ZtLmhlYWRlcnMsXG4gICAgICAgICAgICAgIGl0ZW1zOiBfdm0uaXRlbXMsXG4gICAgICAgICAgICAgIHNlYXJjaDogX3ZtLnNlYXJjaCxcbiAgICAgICAgICAgICAgXCJzZWxlY3RlZC1rZXlcIjogXCJpZFwiLFxuICAgICAgICAgICAgICBcInNlbGVjdC1hbGxcIjogXCJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBcIml0ZW1zXCIsXG4gICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWNoZWNrYm94XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwicHJpbWFyeVwiLCBcImhpZGUtZGV0YWlsc1wiOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByb3BzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLnNlbGVjdGVkID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInByb3BzLnNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHByb3BzLml0ZW0ubmFtZSkpXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MocHJvcHMuaXRlbS5xdHkpKV1cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcImN1cnJlbmN5XCIpKHByb3BzLml0ZW0ucHJpY2UsIF92bS5jdXJyZW5jeSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcImN1cnJlbmN5XCIpKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5zdWJ0b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW5jeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1jZW50ZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZWRpdC1kaWFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGxhcmdlOiBcIlwiLCBsYXp5OiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG1wID0gcHJvcHMuaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmU6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udXBkYXRlQ2FydEl0ZW0oX3ZtLnRtcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgZmxhdDogXCJcIiwgY29sb3I6IFwidGVhbCBsaWdodGVuLTJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLWVkaXRcIildKV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtdC0zIHRleHQteHMtY2VudGVyIHRpdGxlIHByaW1hcnktLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc2xvdDogXCJpbnB1dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJVcGRhdGUgUXR5XCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkVkaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaW5nbGUtbGluZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvZm9jdXM6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGVzOiBbX3ZtLm1heENvdW50XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0udG1wLnF0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50bXAucXR5ID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwidG1wLnF0eVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcInJlZCBsaWdodGVuLTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJlbW92ZUZyb21DYXJ0KHByb3BzLml0ZW0uaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImRlbGV0ZV9mb3JldmVyXCIpXSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IFwicGFnZVRleHRcIixcbiAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcGFnZVN0YXJ0ID0gcmVmLnBhZ2VTdGFydFxuICAgICAgICAgICAgICAgICAgdmFyIHBhZ2VTdG9wID0gcmVmLnBhZ2VTdG9wXG4gICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgRnJvbSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MocGFnZVN0YXJ0KSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiB0byBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MocGFnZVN0b3ApICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNlbGVjdGVkLFxuICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkID0gJCR2XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLXJpZ2h0XCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2hpcFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInJlZCBsaWdodGVuLTIgd2hpdGUtLXRleHQgdGl0bGVcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGxhYmVsOiBcIlwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgbGVmdDogXCJcIiB9IH0sIFtfdm0uX3YoXCJmYS1wZXJjZW50XCIpXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgIFwiIFRheCA6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmN1cnJlbmN5KSArXG4gICAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0udGF4KSArXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLXJpZ2h0XCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2hpcFwiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaW5mbyB3aGl0ZS0tdGV4dCB0aXRsZVwiLCBhdHRyczogeyBsYWJlbDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyBsZWZ0OiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJzaG9wcGluZ19iYXNrZXRcIilcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICBcIiBTdWJ0b3RhbCA6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmN1cnJlbmN5KSArXG4gICAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uc3VidG90YWwpICtcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtcmlnaHRcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1jaGlwXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpbWFyeSB3aGl0ZS0tdGV4dCB0aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgbGFiZWw6IFwiXCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyBsZWZ0OiBcIlwiIH0gfSwgW192bS5fdihcImZhLW1vbmV5XCIpXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgIFwiIFRvdGFsIDogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uY3VycmVuY3kpICtcbiAgICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS50b3RhbCkgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTdhNThiMDkwXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi03YTU4YjA5MFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9CYXNrZXQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxMCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJtb2RhbC1sYXlvdXRcIixcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LXRvb2xiYXJcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJhY2NlbnRcIiwgYXR0cnM6IHsgc2xvdDogXCJ0b29sYmFyXCIgfSwgc2xvdDogXCJ0b29sYmFyXCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczogeyBmbGF0OiBcIlwiLCBpY29uOiBcIlwiLCBjb2xvcjogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBfdm0ucmVkaXJlY3RCYWNrKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImFycm93X2JhY2tcIildKV0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi10b29sYmFyLXRpdGxlXCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyIHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgW192bS5fdihcIlNob3BwaW5nIENhcnRcIildXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi10b29sYmFyLWl0ZW1zXCIsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5jb3VudCA+IDBcbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJzdWNjZXNzXCIsIGZsYXQ6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uY2hlY2tvdXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIkNoZWNrb3V0XCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgcmlnaHQ6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJwYXltZW50XCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGZsYXQ6IFwiXCIsIGNvbG9yOiBcInByaW1hcnlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5yZWRpcmVjdEJhY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIkNsb3NlXCIpXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJiYXNrZXRcIilcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtZmFhOTRkMmNcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWZhYTk0ZDJjXCIsXCJoYXNTY29wZWRcIjpmYWxzZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxMCJdLCJzb3VyY2VSb290IjoiIn0=