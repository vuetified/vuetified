webpackJsonp([19],{

/***/ 631:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(701)
/* template */
var __vue_template__ = __webpack_require__(702)
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
Component.options.__file = "resources\\assets\\js\\pages\\ResetPassword.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ResetPassword.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8fde7da0", Component.options)
  } else {
    hotAPI.reload("data-v-8fde7da0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


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
var toObject = __webpack_require__(311);
var IObject = __webpack_require__(312);
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

/***/ 701:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    mapGetters = _createNamespacedHelp.mapGetters,
    mapActions = _createNamespacedHelp.mapActions;

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['token'],
    data: function data() {
        return {
            passwordResetForm: new AppForm(App.forms.passwordResetForm),
            password_visible: false,
            rules: {
                password: {
                    required: function required(value) {
                        return !!value || 'Password is Required.';
                    },
                    min: function min(value) {
                        return value.length > 5 || 'Password is Below 6 Characters';
                    }
                },
                password_confirmation: function password_confirmation(value, password) {
                    return value === password || 'Password Confirmation is Does Not Match.';
                },

                username: {
                    required: function required(value) {
                        return !!value || 'Email is Required.';
                    },
                    email: function email(value) {
                        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(value) || 'Invalid e-mail.';
                    }
                }

            }
        };
    },
    computed: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({
        icon: function icon() {
            return this.password_visible ? 'visibility' : 'visibility_off';
        }
    }, mapGetters({
        getAuth: 'getAuth'
    })),
    mounted: function mounted() {
        var self = this;
        /* Make Sure We Only Load Reset Password Page If Not Authenticated */
        if (self.getAuth) {
            /* nextick make sure our modal wount be visible before redirect */
            return self.$nextTick(function () {
                return self.$router.go(-1);
            });
        }
        /* Show Reset Password Modal */
        self.$modal.show('reset-password');
        self.passwordResetForm.token = self.token;
    },

    methods: __WEBPACK_IMPORTED_MODULE_0_C_Users_uriah_sites_www_shop_node_modules_babel_runtime_helpers_extends___default()({}, mapActions({
        reset: 'passwordreset'
    }), {
        goHome: function goHome() {
            var self = this;
            self.$modal.hide('reset-password');
            self.$nextTick(function () {
                return self.$router.push({ name: 'home' });
            });
        },
        redirectBack: function redirectBack() {
            var self = this;
            self.$modal.hide('reset-password');
            return self.$nextTick(function () {
                return self.$router.go(-1);
            });
        },
        resetPassword: function resetPassword() {
            var self = this;
            self.reset(self.passwordResetForm);
        }
    })
});

/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal",
    {
      attrs: {
        name: "reset-password",
        adaptive: true,
        width: "100%",
        height: "100%",
        clickToClose: false
      }
    },
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
                  attrs: { icon: "" },
                  nativeOn: {
                    click: function($event) {
                      _vm.redirectBack()
                    }
                  }
                },
                [
                  _c("v-icon", { staticClass: "primary--text" }, [
                    _vm._v("arrow_back")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-toolbar-title",
                { staticClass: "text-xs-center primary--text" },
                [_vm._v("Reset Password")]
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
                        _vm._v("fa-home")
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
              _c("v-container", { attrs: { fluid: "" } }, [
                _c(
                  "form",
                  {
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        _vm.resetPassword()
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
                              staticClass: "primary--text",
                              attrs: {
                                name: "username",
                                label: "Email",
                                rules: [
                                  _vm.rules.username.required,
                                  _vm.rules.username.email
                                ],
                                "prepend-icon": "email",
                                counter: "60"
                              },
                              model: {
                                value: _vm.passwordResetForm.username,
                                callback: function($$v) {
                                  _vm.passwordResetForm.username = $$v
                                },
                                expression: "passwordResetForm.username"
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
                                name: "password",
                                label: "New Password",
                                min: "8",
                                "append-icon": _vm.icon,
                                "append-icon-cb": function() {
                                  return (_vm.password_visible = !_vm.password_visible)
                                },
                                type: !_vm.password_visible
                                  ? "password"
                                  : "text",
                                rules: [
                                  _vm.rules.password.required,
                                  _vm.rules.password.min
                                ],
                                "prepend-icon": "fa-key",
                                counter: "60"
                              },
                              model: {
                                value: _vm.passwordResetForm.password,
                                callback: function($$v) {
                                  _vm.passwordResetForm.password = $$v
                                },
                                expression: "passwordResetForm.password"
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
                                label: "Confirm New Password",
                                "append-icon": _vm.icon,
                                "append-icon-cb": function() {
                                  return (_vm.password_visible = !_vm.password_visible)
                                },
                                type: !_vm.password_visible
                                  ? "password"
                                  : "text",
                                rules: [
                                  function(value) {
                                    return (
                                      value ===
                                        _vm.passwordResetForm.password ||
                                      "Password Confirmation is Does Not Match."
                                    )
                                  }
                                ],
                                "prepend-icon": "fa-copy",
                                counter: "60"
                              },
                              model: {
                                value:
                                  _vm.passwordResetForm.password_confirmation,
                                callback: function($$v) {
                                  _vm.passwordResetForm.password_confirmation = $$v
                                },
                                expression:
                                  "passwordResetForm.password_confirmation"
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
                              primary: !_vm.passwordResetForm.busy,
                              error: _vm.passwordResetForm.busy
                            },
                            attrs: {
                              loading: _vm.passwordResetForm.busy,
                              disabled: _vm.passwordResetForm.busy,
                              type: "submit",
                              block: ""
                            }
                          },
                          [_vm._v("Reset Password")]
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
     require("vue-hot-reload-api").rerender("data-v-8fde7da0", module.exports)
  }
}

/***/ })

});