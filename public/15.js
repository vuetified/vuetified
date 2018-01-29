webpackJsonp([15],{

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(316)
/* script */
var __vue_script__ = __webpack_require__(708)
/* template */
var __vue_template__ = __webpack_require__(709)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\pages\\Register.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0bc8e89a", Component.options)
  } else {
    hotAPI.reload("data-v-0bc8e89a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(659);

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

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(660), __esModule: true };

/***/ }),

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(661);
module.exports = __webpack_require__(31).Object.assign;


/***/ }),

/***/ 661:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(62);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(662) });


/***/ }),

/***/ 662:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(91);
var gOPS = __webpack_require__(131);
var pIE = __webpack_require__(92);
var toObject = __webpack_require__(317);
var IObject = __webpack_require__(318);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(68)(function () {
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

/***/ 694:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(316)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(695)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\layouts\\ModalLayout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5774f095", Component.options)
  } else {
    hotAPI.reload("data-v-5774f095", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 695:
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
    require("vue-hot-reload-api")      .rerender("data-v-5774f095", module.exports)
  }
}

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout__);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var _createNamespacedHelp = Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["createNamespacedHelpers"])('auth'),
    mapActions = _createNamespacedHelp.mapActions,
    mapGetters = _createNamespacedHelp.mapGetters;

/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        ModalLayout: __WEBPACK_IMPORTED_MODULE_1__layouts_ModalLayout___default.a
    },
    data: function data() {
        return {
            registerForm: new AppForm(App.forms.registerForm),
            password_visible: false

        };
    },
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapGetters({
        getAuth: 'getAuth'
    }), {
        icon: function icon() {
            return this.password_visible ? 'visibility' : 'visibility_off';
        }
    }),
    head: {
        title: function title() {
            return {
                inner: 'Register',
                separator: '-',
                complement: App.site.trademark
            };
        },
        // Meta tags
        meta: [{ name: 'application-name', content: App.site.trademark }, { name: 'description', content: App.site.description, id: 'desc' }, // id to replace intead of create element
        // Facebook / Open Graph
        { property: 'fb:app_id', content: App.site.fb_id }, { property: 'og:title', content: App.site.title }, { property: 'og:type', content: 'website' }, { property: 'og:image', content: App.site.logo.url }, { property: 'og:description', content: App.site.description }, { property: 'og:site_name', content: App.site.trademark }, { property: 'og:locale', content: 'en_US' }, { property: 'article:author', content: App.site.trademark }],
        // link tags
        link: [{ rel: 'canonical', href: window.location.href, id: 'canonical' }]

    },
    mounted: function mounted() {
        var self = this;
        /* Make Sure We Only Load Registration Page If Not Authenticated */
        if (self.getAuth) {
            /* nextick make sure our modal would not be visible before redirect */
            return self.$nextTick(function () {
                return self.$router.go(-1);
            });
        }
        self.registerForm.role = 'customer';
        self.registerForm.sponsor_id = self.$store.getters['referral/getSponsor']['user_id'];
    },

    methods: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapActions({
        submit: 'register'
    }), {
        goHome: function goHome() {
            var self = this;
            self.$nextTick(function () {
                return self.$router.push({ name: 'home' });
            });
        },
        goToLogin: function goToLogin() {
            var self = this;
            self.$nextTick(function () {
                return self.$router.push({ name: 'login' });
            });
        },
        redirectBack: function redirectBack() {
            var self = this;
            return self.$nextTick(function () {
                return self.$router.go(-1);
            });
        },
        register: function register() {
            var self = this;
            self.$validator.validateAll();
            if (!self.errors.any()) {
                self.submit(self.registerForm);
            }
        }
    })
});

/***/ }),

/***/ 709:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-layout",
    [
      _c(
        "v-card",
        { attrs: { flat: true } },
        [
          _c(
            "v-toolbar",
            { staticClass: "accent" },
            [
              _c(
                "v-btn",
                {
                  attrs: { flat: "", icon: "", color: "white" },
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
                { staticClass: "text-xs-center white--text" },
                [_vm._v("Registration Page")]
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
                      attrs: { flat: "", color: "white" },
                      nativeOn: {
                        click: function($event) {
                          _vm.goHome()
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("fa-home")])],
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
              _c("v-container", { attrs: { fluid: "" } }, [
                _c(
                  "form",
                  {
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        _vm.register()
                      }
                    }
                  },
                  [
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
                                name: "name",
                                label: "Full Name",
                                "data-vv-name": "name",
                                "error-messages": _vm.errors.collect("name"),
                                counter: "255",
                                "prepend-icon": "fa-user"
                              },
                              model: {
                                value: _vm.registerForm.name,
                                callback: function($$v) {
                                  _vm.$set(_vm.registerForm, "name", $$v)
                                },
                                expression: "registerForm.name"
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
                                counter: "255"
                              },
                              model: {
                                value: _vm.registerForm.username,
                                callback: function($$v) {
                                  _vm.$set(_vm.registerForm, "username", $$v)
                                },
                                expression: "registerForm.username"
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
                            _c("v-text-field", {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate",
                                  value:
                                    "required|min:6|confirmed:password_confirmation",
                                  expression:
                                    "'required|min:6|confirmed:password_confirmation'"
                                }
                              ],
                              staticClass: "primary--text",
                              attrs: {
                                name: "password",
                                label: "Password",
                                "append-icon": _vm.icon,
                                "append-icon-cb": function() {
                                  return (_vm.password_visible = !_vm.password_visible)
                                },
                                type: !_vm.password_visible
                                  ? "password"
                                  : "text",
                                "data-vv-name": "password",
                                "error-messages": _vm.errors.collect(
                                  "password"
                                ),
                                "prepend-icon": "fa-key",
                                counter: "255"
                              },
                              model: {
                                value: _vm.registerForm.password,
                                callback: function($$v) {
                                  _vm.$set(_vm.registerForm, "password", $$v)
                                },
                                expression: "registerForm.password"
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
                            _c("v-text-field", {
                              staticClass: "primary--text",
                              attrs: {
                                name: "password_confirmation",
                                label: "Confirm Password",
                                "append-icon": _vm.icon,
                                "append-icon-cb": function() {
                                  return (_vm.password_visible = !_vm.password_visible)
                                },
                                type: !_vm.password_visible
                                  ? "password"
                                  : "text",
                                "prepend-icon": "fa-copy",
                                counter: "255"
                              },
                              model: {
                                value: _vm.registerForm.password_confirmation,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.registerForm,
                                    "password_confirmation",
                                    $$v
                                  )
                                },
                                expression: "registerForm.password_confirmation"
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
                          "v-btn",
                          {
                            class: {
                              primary: !_vm.registerForm.busy,
                              error: _vm.registerForm.busy
                            },
                            attrs: {
                              loading: _vm.registerForm.busy,
                              disabled: _vm.errors.any(),
                              type: "submit",
                              block: ""
                            }
                          },
                          [_vm._v("\n              Register\n            ")]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            staticClass: "white--text",
                            attrs: {
                              block: "",
                              flat: "",
                              color: "teal lighten-2"
                            },
                            nativeOn: {
                              click: function($event) {
                                _vm.goToLogin()
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n              Already Have An Account? Go Login\n            "
                            )
                          ]
                        )
                      ],
                      1
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0bc8e89a", module.exports)
  }
}

/***/ })

});