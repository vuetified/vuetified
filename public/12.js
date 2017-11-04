webpackJsonp([12],{

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

/***/ 647:
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
Component.options.__file = "resources\\assets\\js\\pages\\UploadReceipt.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] UploadReceipt.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-90a022c6", Component.options)
  } else {
    hotAPI.reload("data-v-90a022c6", Component.options)
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

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(758);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(653)("384d3dd8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-90a022c6\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UploadReceipt.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-90a022c6\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UploadReceipt.vue");
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

exports = module.exports = __webpack_require__(633)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"UploadReceipt.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_ModalLayout_vue__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_ModalLayout_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__layouts_ModalLayout_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Uploads_vue__ = __webpack_require__(760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Uploads_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Uploads_vue__);
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
        Layout: __WEBPACK_IMPORTED_MODULE_0__layouts_ModalLayout_vue___default.a,
        Uploads: __WEBPACK_IMPORTED_MODULE_1__components_Uploads_vue___default.a
    },
    created: function created() {
        // initialized our data value here to be passed on child component
        this.link = '' + route('api.media.uploads', { order: 9 });
    },

    data: function data() {
        return {
            /* url needed by upload component */
            link: ''
        };
    }
});

/***/ }),

/***/ 760:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(310)
/* script */
var __vue_script__ = __webpack_require__(761)
/* template */
var __vue_template__ = __webpack_require__(764)
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
Component.options.__file = "resources\\assets\\js\\components\\Uploads.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Uploads.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5721c990", Component.options)
  } else {
    hotAPI.reload("data-v-5721c990", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xkeshi_image_compressor__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xkeshi_image_compressor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__xkeshi_image_compressor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_upload_component__ = __webpack_require__(763);
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
    props: ['fileKey', 'putUrl', 'postUrl'],
    components: {
        FileUpload: __WEBPACK_IMPORTED_MODULE_1_vue_upload_component___default.a
    },
    mounted: function mounted() {
        this.postAction = this.postUrl ? this.postUrl : ' /uploads/post';
        this.putAction = this.putUrl ? this.putUrl : null;
        this.name = this.fileKey ? this.fileKey : 'file';
        this.headers['Authorization'] = 'Bearer ' + vm.$cookie.get('access_token');
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

/***/ 762:
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

/***/ 763:
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

/***/ 764:
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
     require("vue-hot-reload-api").rerender("data-v-5721c990", module.exports)
  }
}

/***/ }),

/***/ 765:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "layout",
    [_c("uploads", { attrs: { "file-key": "file", "post-url": _vm.link } })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-90a022c6", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9VcGxvYWRSZWNlaXB0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9sYXlvdXRzL01vZGFsTGF5b3V0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTW9kYWxMYXlvdXQudnVlP2M3MDUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9VcGxvYWRSZWNlaXB0LnZ1ZT83NDA3Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvVXBsb2FkUmVjZWlwdC52dWU/OWNlNSIsIndlYnBhY2s6Ly8vVXBsb2FkUmVjZWlwdC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL1VwbG9hZHMudnVlIiwid2VicGFjazovLy9VcGxvYWRzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHhrZXNoaS9pbWFnZS1jb21wcmVzc29yL2Rpc3QvaW1hZ2UtY29tcHJlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXVwbG9hZC1jb21wb25lbnQvZGlzdC92dWUtdXBsb2FkLWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvVXBsb2Fkcy52dWU/MDU3ZiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1VwbG9h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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxhQUFhO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7O0FBTUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUFRRDtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QixhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwyQkFBMkI7O0FBRTNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsQ0FBQzs7Ozs7Ozs7QUN6MkJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMscUJBQXFCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVELGlCQUFpQjtBQUNqQixtQkFBbUIsNEJBQTRCLDRCQUE0QixvQkFBb0IsU0FBUywwVUFBMFUsT0FBTyx1QkFBdUIsRUFBRTtBQUNsZCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUEsbURBQW1ELGdCQUFnQixzQkFBc0IsT0FBTywyQkFBMkIsMEJBQTBCLHlEQUF5RCwyQkFBMkIsRUFBRSxFQUFFLEVBQUUsZUFBZTs7QUFFOVAsb0dBQW9HLG1CQUFtQixFQUFFLG1CQUFtQiw4SEFBOEg7O0FBRTFRLGtDQUFrQywwQkFBMEIsMENBQTBDLGdCQUFnQixPQUFPLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxPQUFPLHdCQUF3QixFQUFFOztBQUVqTTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0Isb0JBQW9CLG9CQUFvQix1QkFBdUIsRUFBRSx3REFBd0QsWUFBWSxpQkFBaUIsWUFBWSxRQUFRLFNBQVMsVUFBVSxXQUFXLG9CQUFvQixhQUFhLGNBQWMsRUFBRSx3REFBd0Qsa0JBQWtCLGlCQUFpQixZQUFZLGFBQWEsYUFBYSxZQUFZLEVBQUUsR0FBRyx3QkFBd0I7QUFDcGQ7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVELGtCQUFrQjtBQUNsQixtQkFBbUIsNEJBQTRCLDRCQUE0QixvQkFBb0IsdUJBQXVCO0FBQ3RILEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCx3QkFBd0I7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWCxpQ0FBaUMsdUNBQXVDOztBQUV4RSxvQ0FBb0MsZ0RBQWdEO0FBQ3BGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQixzQkFBc0I7QUFDNUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLCtCQUErQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQSx5QkFBeUIsaUNBQWlDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGFBQWE7QUFDYixXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxXQUFXOztBQUUvQztBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxXQUFXLFdBQVcsa0JBQWtCLG1CQUFtQjs7QUFFekc7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxpQkFBaUI7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsc0NBQXNDO0FBQ2xFLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRCxtREFBbUQ7QUFDN0c7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixlQUFlO0FBQzlDO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0JBQStCLGdCQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBLENBQUM7QUFDRDs7Ozs7Ozs7QUM3ckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssU0FBUyxZQUFZLEVBQUU7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLG9CQUFvQixFQUFFO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsMEJBQTBCLEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxvQ0FBb0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwrQ0FBK0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxvQkFBb0IsRUFBRTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0RBQWtEO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtEQUFrRDtBQUM3RTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsU0FBUyxzQkFBc0IsRUFBRTtBQUNoRTtBQUNBLDRDQUE0QywrQkFBK0I7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGdCQUFnQjtBQUM1RDtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0RBQWtEO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrREFBa0Q7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0EsZ0RBQWdELHlCQUF5QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG9EQUFvRDtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsb0JBQW9CLEVBQUU7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwwQkFBMEI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVMsWUFBWSxFQUFFO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixpQkFBaUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVMsWUFBWSxFQUFFO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHlCQUF5QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxvQ0FBb0MsU0FBUyxZQUFZLEVBQUU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsb0JBQW9CLEVBQUU7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsV0FBVyxFQUFFO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsV0FBVyxFQUFFO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsV0FBVyxFQUFFO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsV0FBVyxFQUFFO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsV0FBVyxFQUFFO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUyxXQUFXLEVBQUU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUyxXQUFXLEVBQUU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUyxXQUFXLEVBQUU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSwrQkFBK0Isb0NBQW9DO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixvQ0FBb0M7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLFdBQVcsRUFBRTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsV0FBVyxFQUFFO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsV0FBVyxFQUFFO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7QUN6eEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLDJDQUEyQyxFQUFFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNjMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMiAxNyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTBhMDIyYzZcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vVXBsb2FkUmVjZWlwdC52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJ2dWUtYXBwXFxcIl19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vVXBsb2FkUmVjZWlwdC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTkwYTAyMmM2XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1VwbG9hZFJlY2VpcHQudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFnZXNcXFxcVXBsb2FkUmVjZWlwdC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIFVwbG9hZFJlY2VpcHQudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTkwYTAyMmM2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtOTBhMDIyYzZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvVXBsb2FkUmVjZWlwdC52dWVcbi8vIG1vZHVsZSBpZCA9IDY0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEyIiwiLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuICBNb2RpZmllZCBieSBFdmFuIFlvdSBAeXl4OTkwODAzXG4qL1xuXG52YXIgaGFzRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG5cbmlmICh0eXBlb2YgREVCVUcgIT09ICd1bmRlZmluZWQnICYmIERFQlVHKSB7XG4gIGlmICghaGFzRG9jdW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3Z1ZS1zdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudC4gJyArXG4gICAgXCJVc2UgeyB0YXJnZXQ6ICdub2RlJyB9IGluIHlvdXIgV2VicGFjayBjb25maWcgdG8gaW5kaWNhdGUgYSBzZXJ2ZXItcmVuZGVyaW5nIGVudmlyb25tZW50LlwiXG4gICkgfVxufVxuXG52YXIgbGlzdFRvU3R5bGVzID0gcmVxdWlyZSgnLi9saXN0VG9TdHlsZXMnKVxuXG4vKlxudHlwZSBTdHlsZU9iamVjdCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgcGFydHM6IEFycmF5PFN0eWxlT2JqZWN0UGFydD5cbn1cblxudHlwZSBTdHlsZU9iamVjdFBhcnQgPSB7XG4gIGNzczogc3RyaW5nO1xuICBtZWRpYTogc3RyaW5nO1xuICBzb3VyY2VNYXA6ID9zdHJpbmdcbn1cbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHsvKlxuICBbaWQ6IG51bWJlcl06IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIHJlZnM6IG51bWJlcixcbiAgICBwYXJ0czogQXJyYXk8KG9iaj86IFN0eWxlT2JqZWN0UGFydCkgPT4gdm9pZD5cbiAgfVxuKi99XG5cbnZhciBoZWFkID0gaGFzRG9jdW1lbnQgJiYgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSlcbnZhciBzaW5nbGV0b25FbGVtZW50ID0gbnVsbFxudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwXG52YXIgaXNQcm9kdWN0aW9uID0gZmFsc2VcbnZhciBub29wID0gZnVuY3Rpb24gKCkge31cblxuLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4vLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG52YXIgaXNPbGRJRSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9tc2llIFs2LTldXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSlcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFyZW50SWQsIGxpc3QsIF9pc1Byb2R1Y3Rpb24pIHtcbiAgaXNQcm9kdWN0aW9uID0gX2lzUHJvZHVjdGlvblxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIGxpc3QpXG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgICAgZG9tU3R5bGUucmVmcy0tXG4gICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSlcbiAgICB9XG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbmV3TGlzdClcbiAgICAgIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXVxuICAgICAgaWYgKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKClcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMgLyogQXJyYXk8U3R5bGVPYmplY3Q+ICovKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pXG4gICAgICB9XG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIGlmIChkb21TdHlsZS5wYXJ0cy5sZW5ndGggPiBpdGVtLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5sZW5ndGggPSBpdGVtLnBhcnRzLmxlbmd0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHsgaWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0cyB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAoKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJ1xuICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcbiAgcmV0dXJuIHN0eWxlRWxlbWVudFxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICB2YXIgdXBkYXRlLCByZW1vdmVcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlW2RhdGEtdnVlLXNzci1pZH49XCInICsgb2JqLmlkICsgJ1wiXScpXG5cbiAgaWYgKHN0eWxlRWxlbWVudCkge1xuICAgIGlmIChpc1Byb2R1Y3Rpb24pIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGFuZCBpbiBwcm9kdWN0aW9uIG1vZGUuXG4gICAgICAvLyBzaW1wbHkgZG8gbm90aGluZy5cbiAgICAgIHJldHVybiBub29wXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGJ1dCBpbiBkZXYgbW9kZS5cbiAgICAgIC8vIGZvciBzb21lIHJlYXNvbiBDaHJvbWUgY2FuJ3QgaGFuZGxlIHNvdXJjZSBtYXAgaW4gc2VydmVyLXJlbmRlcmVkXG4gICAgICAvLyBzdHlsZSB0YWdzIC0gc291cmNlIG1hcHMgaW4gPHN0eWxlPiBvbmx5IHdvcmtzIGlmIHRoZSBzdHlsZSB0YWcgaXNcbiAgICAgIC8vIGNyZWF0ZWQgYW5kIGluc2VydGVkIGR5bmFtaWNhbGx5LiBTbyB3ZSByZW1vdmUgdGhlIHNlcnZlciByZW5kZXJlZFxuICAgICAgLy8gc3R5bGVzIGFuZCBpbmplY3QgbmV3IG9uZXMuXG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzT2xkSUUpIHtcbiAgICAvLyB1c2Ugc2luZ2xldG9uIG1vZGUgZm9yIElFOS5cbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrK1xuICAgIHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSlcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSlcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKVxuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBtdWx0aS1zdHlsZS10YWcgbW9kZSBpbiBhbGwgb3RoZXIgY2FzZXNcbiAgICBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShvYmopXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcbiAgICAgICAgICBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuICAgICAgICAgIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKVxuICAgIH1cbiAgfVxufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFN0b3JlID0gW11cblxuICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudFxuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpXG4gIH1cbn0pKClcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLmNzc1xuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKVxuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKVxuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXNcbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSlcbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZUVsZW1lbnQsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzc1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWFcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXBcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKVxuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIHNvdXJjZU1hcC5zb3VyY2VzWzBdICsgJyAqLydcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArICcgKi8nXG4gIH1cblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcbi8vIG1vZHVsZSBpZCA9IDY1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTIgMTciLCIvKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGxpc3QgZm9ybWF0IHByb2R1Y2VkIGJ5IGNzcy1sb2FkZXIgaW50byBzb21ldGhpbmdcbiAqIGVhc2llciB0byBtYW5pcHVsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGlkOiBwYXJlbnRJZCArICc6JyArIGksXG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDY2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTIgMTciLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IG51bGxcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LWQ3MjE5ODNjXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL01vZGFsTGF5b3V0LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcbGF5b3V0c1xcXFxNb2RhbExheW91dC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIE1vZGFsTGF5b3V0LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1kNzIxOTgzY1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWQ3MjE5ODNjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTW9kYWxMYXlvdXQudnVlXG4vLyBtb2R1bGUgaWQgPSA2OTVcbi8vIG1vZHVsZSBjaHVua3MgPSA2IDExIDEyIDEzIDE0IDE1IDE2IDE3IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcInYtYXBwXCIsIHsgYXR0cnM6IHsgc3RhbmRhbG9uZTogXCJcIiB9IH0sIFtcbiAgICBfYyhcbiAgICAgIFwibWFpblwiLFxuICAgICAgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicGEtMCBtYS0wIHdoaXRlXCIsXG4gICAgICAgICAgICBhdHRyczogeyB0cmFuc2l0aW9uOiBcInNsaWRlLXgtdHJhbnNpdGlvblwiLCBmbHVpZDogXCJcIiB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyBmbGF0OiB0cnVlIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF92bS5fdChcInRvb2xiYXJcIiksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfdm0uX3QoXCJkZWZhdWx0XCIpLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX3ZtLl90KFwiZm9vdGVyXCIpXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDJcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1kNzIxOTgzY1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtZDcyMTk4M2NcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2xheW91dHMvTW9kYWxMYXlvdXQudnVlXG4vLyBtb2R1bGUgaWQgPSA2OTZcbi8vIG1vZHVsZSBjaHVua3MgPSA2IDExIDEyIDEzIDE0IDE1IDE2IDE3IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTkwYTAyMmM2XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1VwbG9hZFJlY2VpcHQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIzODRkM2RkOFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05MGEwMjJjNlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9VcGxvYWRSZWNlaXB0LnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05MGEwMjJjNlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9VcGxvYWRSZWNlaXB0LnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi05MGEwMjJjNlwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9VcGxvYWRSZWNlaXB0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIlVwbG9hZFJlY2VpcHQudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtOTBhMDIyYzZcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvVXBsb2FkUmVjZWlwdC52dWVcbi8vIG1vZHVsZSBpZCA9IDc1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEyIiwiPHRlbXBsYXRlPlxuICA8bGF5b3V0PlxuICAgICAgPCEtLSBhZGQgdG8gdGFiIC0tPlxuICAgICAgPHVwbG9hZHMgZmlsZS1rZXk9XCJmaWxlXCIgOnBvc3QtdXJsPVwibGlua1wiPlxuICAgICAgPC91cGxvYWRzPlxuICA8L2xheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTGF5b3V0IGZyb20gJy4uL2xheW91dHMvTW9kYWxMYXlvdXQudnVlJ1xuaW1wb3J0IFVwbG9hZHMgZnJvbSAnLi4vY29tcG9uZW50cy9VcGxvYWRzLnZ1ZSdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIExheW91dCxcbiAgICAgICAgVXBsb2Fkc1xuICAgIH0sXG4gICAgY3JlYXRlZCAoKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemVkIG91ciBkYXRhIHZhbHVlIGhlcmUgdG8gYmUgcGFzc2VkIG9uIGNoaWxkIGNvbXBvbmVudFxuICAgICAgICB0aGlzLmxpbmsgPSBgJHtyb3V0ZSgnYXBpLm1lZGlhLnVwbG9hZHMnLCB7b3JkZXI6IDl9KX1gXG4gICAgfSxcbiAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICAvKiB1cmwgbmVlZGVkIGJ5IHVwbG9hZCBjb21wb25lbnQgKi9cbiAgICAgICAgbGluazogJydcbiAgICB9KVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBVcGxvYWRSZWNlaXB0LnZ1ZT83NjNhZWI4ZiIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwidnVlLWFwcFxcXCJdfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1VwbG9hZHMudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi01NzIxYzk5MFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9VcGxvYWRzLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcY29tcG9uZW50c1xcXFxVcGxvYWRzLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gVXBsb2Fkcy52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNTcyMWM5OTBcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi01NzIxYzk5MFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL1VwbG9hZHMudnVlXG4vLyBtb2R1bGUgaWQgPSA3NjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiIsIjx0ZW1wbGF0ZT5cblxuPHYtY29udGFpbmVyIGZsdWlkPlxuICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgICAgICAgICA8di1idG4gY29sb3I9XCJibHVlXCIgZmxhdD5cbiAgICAgICAgICAgIDxmaWxlLXVwbG9hZFxuICAgICAgICAgICAgICAgIDpwb3N0LWFjdGlvbj1cInBvc3RBY3Rpb25cIlxuICAgICAgICAgICAgICAgIDpwdXQtYWN0aW9uPVwicHV0QWN0aW9uXCJcbiAgICAgICAgICAgICAgICA6ZXh0ZW5zaW9ucz1cImV4dGVuc2lvbnNcIlxuICAgICAgICAgICAgICAgIDphY2NlcHQ9XCJhY2NlcHRcIlxuICAgICAgICAgICAgICAgIDptdWx0aXBsZT1cIm11bHRpcGxlXCJcbiAgICAgICAgICAgICAgICA6ZGlyZWN0b3J5PVwiZGlyZWN0b3J5XCJcbiAgICAgICAgICAgICAgICA6c2l6ZT1cInNpemUgfHwgMFwiXG4gICAgICAgICAgICAgICAgOnRocmVhZD1cInRocmVhZCA8IDEgPyAxIDogKHRocmVhZCA+IDUgPyA1IDogdGhyZWFkKVwiXG4gICAgICAgICAgICAgICAgOmhlYWRlcnM9XCJoZWFkZXJzXCJcbiAgICAgICAgICAgICAgICA6ZGF0YT1cImRhdGFcIlxuICAgICAgICAgICAgICAgIDpkcm9wPVwiZHJvcFwiXG4gICAgICAgICAgICAgICAgOmRyb3AtZGlyZWN0b3J5PVwiZHJvcERpcmVjdG9yeVwiXG4gICAgICAgICAgICAgICAgOmFkZC1pbmRleD1cImFkZEluZGV4XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZmlsZXNcIlxuICAgICAgICAgICAgICAgIEBpbnB1dC1maWx0ZXI9XCJpbnB1dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgQGlucHV0LWZpbGU9XCJpbnB1dEZpbGVcIlxuICAgICAgICAgICAgICAgIHJlZj1cInVwbG9hZFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJjdXJzb3I6cG9pbnRlcjttYXJnaW46MTBweDtcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBDaG9vc2UgRmlsZXNcbiAgICAgICAgICAgICAgICA8L2ZpbGUtdXBsb2FkPlxuICAgICAgICA8L3YtYnRuPlxuICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVwiYW1iZXIgbGlnaHRlbi0yXCIgQGNsaWNrLm5hdGl2ZT1cImlzT3B0aW9uID0gIWlzT3B0aW9uXCI+XG4gICAgICAgICAgICA8di1pY29uPmZhLWNvZzwvdi1pY29uPlxuICAgICAgICA8L3YtYnRuPlxuICAgIDwvdi1sYXlvdXQ+XG4gICAgPHYtbGF5b3V0IHJvdyB3cmFwIHYtaWY9XCIhaXNPcHRpb25cIj5cbiAgICAgICAgPHYtZGF0YS10YWJsZVxuICAgICAgICAgICAgICAgIDpoZWFkZXJzPVwidGhcIlxuICAgICAgICAgICAgICAgIDppdGVtcz1cImZpbGVzXCJcbiAgICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBuby1kYXRhLXRleHQ9XCJDbGljayBgQ2hvb3NlIEZpbGVzYCBCdXR0b24gVG8gVXBsb2FkIEZpbGVzLlwiXG4gICAgICAgICAgICAgICAgOnJvd3MtcGVyLXBhZ2UtaXRlbXM9XCJwZXJQYWdlRGF0YVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cIml0ZW1zXCIgc2NvcGU9XCJwcm9wc1wiPlxuXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyB2LWlmPVwicHJvcHMuaXRlbS50aHVtYlwiIDpzcmM9XCJwcm9wcy5pdGVtLnRodW1iXCIgd2lkdGg9XCI0MFwiIGhlaWdodD1cImF1dG9cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWVsc2U+Tm8gSW1hZ2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICA8di1lZGl0LWRpYWxvZ1xuICAgICAgICAgICAgICAgICAgICBsYXJnZVxuICAgICAgICAgICAgICAgICAgICBsYXp5XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCI+e3sgcHJvcHMuaXRlbS5uYW1lIHwgdHJ1bmNhdGUoMjApIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHNsb3Q9XCJpbnB1dFwiIGNsYXNzPVwibXQtMyB0ZXh0LXhzLWNlbnRlciB0aXRsZSBwcmltYXJ5LS10ZXh0XCI+VXBkYXRlIE5hbWU8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgICAgIHNsb3Q9XCJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRWRpdFwiXG4gICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwcm9wcy5pdGVtLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBzaW5nbGUtbGluZVxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgICAgICA6cnVsZXM9XCJbbWF4SW5wdXRdXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L3YtdGV4dC1maWVsZD5cblxuICAgICAgICAgICAgICAgICAgICA8L3YtZWRpdC1kaWFsb2c+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiPnt7IHByb3BzLml0ZW0uc2l6ZSB8IGZvcm1hdFNpemUgfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LXByb2dyZXNzLWNpcmN1bGFyXG4gICAgICAgICAgICAgICAgICAgICAgICA6c2l6ZT1cIjQ1XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDp3aWR0aD1cIjVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOnJvdGF0ZT1cIjM2MFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6dmFsdWU9XCJwcm9ncmVzcyhwcm9wcy5pdGVtLnByb2dyZXNzKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cInRlYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInByb3BzLml0ZW0uYWN0aXZlIHx8IHByb3BzLml0ZW0ucHJvZ3Jlc3MgIT09ICcwLjAwJ1wiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXB0aW9uXCI+e3sgcHJvZ3Jlc3MocHJvcHMuaXRlbS5wcm9ncmVzcykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1wcm9ncmVzcy1jaXJjdWxhcj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwhLS0gc3RhdHVzIC0tPlxuICAgICAgICAgICAgICAgIDx0ZCB2LWlmPVwicHJvcHMuaXRlbS5lcnJvclwiIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj57e3Byb3BzLml0ZW0uZXJyb3J9fTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIHYtZWxzZS1pZj1cInByb3BzLml0ZW0uc3VjY2Vzc1wiIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj5zdWNjZXNzPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgdi1lbHNlLWlmPVwicHJvcHMuaXRlbS5hY3RpdmVcIiBjbGFzcz1cInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCI+YWN0aXZlPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgdi1lbHNlIGNsYXNzPVwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIj48L3RkPlxuXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGUgdGV4dC14cy1jZW50ZXIgcHJpbWFyeS0tdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVwicmVkIGRhcmtlbi00XCIgdi1pZj1cInByb3BzLml0ZW0uYWN0aXZlXCIgQGNsaWNrLm5hdGl2ZT1cInByb3BzLml0ZW0uYWN0aXZlID8gJHJlZnMudXBsb2FkLnVwZGF0ZShwcm9wcy5pdGVtLCB7ZXJyb3I6ICdjYW5jZWwnfSkgOiBmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICA8di1pY29uPmZhLXRpbWVzPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJpbmZvXCIgdi1lbHNlLWlmPVwicHJvcHMuaXRlbS5lcnJvciAmJiBwcm9wcy5pdGVtLmVycm9yICE9PSAnY29tcHJlc3NpbmcnICYmICRyZWZzLnVwbG9hZC5mZWF0dXJlcy5odG1sNVwiIEBjbGljay5uYXRpdmU9XCIkcmVmcy51cGxvYWQudXBkYXRlKHByb3BzLml0ZW0sIHthY3RpdmU6IHRydWUsIGVycm9yOiAnJywgcHJvZ3Jlc3M6ICcwLjAwJ30pXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+ZmEtcmVmcmVzaDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gZmxhdCBpY29uIGNvbG9yPVwiYmx1ZVwiIHYtZWxzZSBAY2xpY2submF0aXZlPVwicHJvcHMuaXRlbS5zdWNjZXNzIHx8IHByb3BzLml0ZW0uZXJyb3IgPT09ICdjb21wcmVzc2luZycgPyBmYWxzZSA6ICRyZWZzLnVwbG9hZC51cGRhdGUocHJvcHMuaXRlbSwge2FjdGl2ZTogdHJ1ZX0pXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+ZmEtdXBsb2FkPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biBmbGF0IGljb24gY29sb3I9XCJyZWQgbGlnaHRlbi0yXCIgQGNsaWNrLm5hdGl2ZT1cInJlbW92ZShwcm9wcy5pdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICA8di1pY29uPmZhLXRyYXNoPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDwvdi1kYXRhLXRhYmxlPlxuXG4gICAgPC92LWxheW91dD5cbiAgICA8di1sYXlvdXQgcm93IHdyYXAgdi1pZj1cIiFpc09wdGlvblwiPlxuICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgPHYtYnRuIGNvbG9yPVwidGVhbCBsaWdodGVuLTJcIiB2LXNob3c9XCJmaWxlcy5sZW5ndGggPiAwXCIgQGNsaWNrLm5hdGl2ZT1cIiRyZWZzLnVwbG9hZC5hY3RpdmUgPSB0cnVlXCI+U3RhcnQgVXBsb2FkIDx2LWljb24gcmlnaHQ+cGxheV9hcnJvdzwvdi1pY29uPjwvdi1idG4+XG4gICAgICAgIDx2LWJ0biBjb2xvcj1cImVycm9yXCIgdi1zaG93PVwiJHJlZnMudXBsb2FkICYmICRyZWZzLnVwbG9hZC5hY3RpdmVcIiBAY2xpY2submF0aXZlPVwiJHJlZnMudXBsb2FkLmFjdGl2ZSA9IGZhbHNlXCI+U3RvcCBVcGxvYWQgPHYtaWNvbiByaWdodD5zdG9wPC92LWljb24+PC92LWJ0bj5cbiAgICAgICAgPHYtYnRuIGNvbG9yPVwicmVkIGxpZ2h0ZW4tMlwiIHYtaWY9XCIkcmVmcy51cGxvYWQgJiYgISRyZWZzLnVwbG9hZC5hY3RpdmUgJiYgZmlsZXMubGVuZ3RoID4gMFwiIEBjbGljay5uYXRpdmU9XCJmaWxlcyA9IFtdXCI+UmVtb3ZlIEFsbCBGaWxlcyA8di1pY29uIHJpZ2h0PmZhLXRpbWVzPC92LWljb24+PC92LWJ0bj5cbiAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgPC92LWxheW91dD5cbiAgICA8di1sYXlvdXQgcm93IHdyYXAgdi1pZj1cImlzT3B0aW9uXCI+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cImZhLWZpbGUtY29kZS1vIFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJBY2NlcHRcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJhY2NlcHRcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgaGludD1cIkFsbG93IHVwbG9hZCBtaW1lIHR5cGVcIlxuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQtaGludFxuICAgICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnbWltZS10eXBlJylcIlxuICAgICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cIm1pbWUtdHlwZVwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJmYS1jb2dzXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIkV4dGVuc2lvbnNcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJleHRlbnNpb25zXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGhpbnQ9XCJBbGxvdyB1cGxvYWQgZmlsZSBleHRlbnNpb25cIlxuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQtaGludFxuICAgICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnZXh0ZW5zaW9uJylcIlxuICAgICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImV4dGVuc2lvblwiXG4gICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJodHRwXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlB1dCBVcmxcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwdXRBY3Rpb25cIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgaGludD1cIkRpc2FibGVkIGlmIEVtcHR5LCBBZnRlciB0aGUgc2h1dGRvd24sIHVzZSB0aGUgUE9TVCBtZXRob2QgdG8gdXBsb2FkXCJcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50LWhpbnRcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cImh0dHBcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiUG9zdCBVcmxcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwb3N0QWN0aW9uXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICAgICAgICAgIDpsaWdodD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGhpbnQ9XCJEZWZhdWx0IFBvc3QgVVJMXCJcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50LWhpbnRcbiAgICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ3Bvc3QtdXJsJylcIlxuICAgICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cInBvc3QtdXJsXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cImZhLWN1YmVzXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlRocmVhZFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInRocmVhZFwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBoaW50PVwiQWxzbyB1cGxvYWQgdGhlIG51bWJlciBvZiBmaWxlcyBhdCB0aGUgc2FtZSB0aW1lIChudW1iZXIgb2YgdGhyZWFkcylcIlxuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQtaGludFxuICAgICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWR8bnVtZXJpY3xtaW5fdmFsdWU6MSdcIlxuICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCd0aHJlYWQnKVwiXG4gICAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwidGhyZWFkXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cInRyZW5kaW5nX3VwXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIk1heCBzaXplXCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsLm51bWJlcj1cInNpemVcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgaGludD1cIlNpemUgVW5pdCBpbiBieXRlXCJcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50LWhpbnRcbiAgICAgICAgICAgICAgICB2LXZhbGlkYXRlPVwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgOmVycm9yLW1lc3NhZ2VzPVwiZXJyb3JzLmNvbGxlY3QoJ21heC1zaXplJylcIlxuICAgICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cIm1heC1zaXplXCJcbiAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cInRyZW5kaW5nX2Rvd25cIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiTWluIHNpemVcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWwubnVtYmVyPVwibWluU2l6ZVwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJpbmZvXCJcbiAgICAgICAgICAgICAgICA6bGlnaHQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBoaW50PVwiU2l6ZSBVbml0IGluIGJ5dGVcIlxuICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQtaGludFxuICAgICAgICAgICAgICAgIHYtdmFsaWRhdGU9XCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICA6ZXJyb3ItbWVzc2FnZXM9XCJlcnJvcnMuY29sbGVjdCgnbWluLXNpemUnKVwiXG4gICAgICAgICAgICAgICAgZGF0YS12di1uYW1lPVwibWluLXNpemVcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwiZmEtY29tcHJlc3NcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiQXV0b21hdGljYWxseSBjb21wcmVzc1wiXG4gICAgICAgICAgICAgICAgdi1tb2RlbC5udW1iZXI9XCJhdXRvQ29tcHJlc3NcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwiaW5mb1wiXG4gICAgICAgICAgICAgICAgOmxpZ2h0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgdi12YWxpZGF0ZT1cIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgIDplcnJvci1tZXNzYWdlcz1cImVycm9ycy5jb2xsZWN0KCdhdXRvLWNvbXByZXNzJylcIlxuICAgICAgICAgICAgICAgIGRhdGEtdnYtbmFtZT1cImF1dG8tY29tcHJlc3NcIlxuICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJncmV5LS10ZXh0IGNhcHRpb25cIiB2LWlmPVwiYXV0b0NvbXByZXNzID4gMFwiPk1vcmUgdGhhbiB7e2F1dG9Db21wcmVzcyB8IGZvcm1hdFNpemV9fSBmaWxlcyBhcmUgYXV0b21hdGljYWxseSBjb21wcmVzc2VkPC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJncmV5LS10ZXh0IGNhcHRpb25cIiB2LWVsc2U+U2V0IHVwIGF1dG9tYXRpYyBjb21wcmVzc2lvbjwvcD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LWNoZWNrYm94IHYtYmluZDpsYWJlbD1cImBEcmFnIGFuZCBkcm9wIHVwbG9hZDogJHtkcm9wLnRvU3RyaW5nKCl9YFwiIHYtbW9kZWw9XCJkcm9wXCIgbGlnaHQ+PC92LWNoZWNrYm94PlxuICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgPHYtY2hlY2tib3ggdi1iaW5kOmxhYmVsPVwiYE5vdCBjaGVja2VkLCBmaWx0ZXIgdGhlIGRyYWdnZWQgZm9sZGVyOiAke2Ryb3BEaXJlY3RvcnkudG9TdHJpbmcoKX1gXCIgdi1tb2RlbD1cImRyb3BEaXJlY3RvcnlcIiBsaWdodD48L3YtY2hlY2tib3g+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di1jaGVja2JveCB2LWJpbmQ6bGFiZWw9XCJgQXV0b21hdGljYWxseSBhY3RpdmF0ZSB1cGxvYWQ6ICR7dXBsb2FkQXV0by50b1N0cmluZygpfWBcIiB2LW1vZGVsPVwidXBsb2FkQXV0b1wiIGxpZ2h0Pjwvdi1jaGVja2JveD5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgPC92LWxheW91dD5cbjwvdi1jb250YWluZXI+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgSW1hZ2VDb21wcmVzc29yIGZyb20gJ0B4a2VzaGkvaW1hZ2UtY29tcHJlc3NvcidcbmltcG9ydCBGaWxlVXBsb2FkIGZyb20gJ3Z1ZS11cGxvYWQtY29tcG9uZW50J1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiBbJ2ZpbGVLZXknLCAncHV0VXJsJywgJ3Bvc3RVcmwnXSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEZpbGVVcGxvYWRcbiAgICB9LFxuICAgIG1vdW50ZWQgKCkge1xuICAgICAgICB0aGlzLnBvc3RBY3Rpb24gPSB0aGlzLnBvc3RVcmwgPyB0aGlzLnBvc3RVcmwgOiAnIC91cGxvYWRzL3Bvc3QnXG4gICAgICAgIHRoaXMucHV0QWN0aW9uID0gdGhpcy5wdXRVcmwgPyB0aGlzLnB1dFVybCA6IG51bGxcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5maWxlS2V5ID8gdGhpcy5maWxlS2V5IDogJ2ZpbGUnXG4gICAgICAgIHRoaXMuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke3ZtLiRjb29raWUuZ2V0KCdhY2Nlc3NfdG9rZW4nKX1gXG4gICAgfSxcbiAgICBkYXRhICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRoOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnVGh1bWInLCB2YWx1ZTogJ3RodW1iJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdOYW1lJywgdmFsdWU6ICduYW1lJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdTaXplJywgdmFsdWU6ICdzaXplJywgYWxpZ246ICdsZWZ0Jywgc29ydGFibGU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdQcm9ncmVzcycsIHZhbHVlOiAncHJvZ3Jlc3MnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1N0YXR1cycsIHZhbHVlOiAnc3BlZWQnLCBhbGlnbjogJ2xlZnQnLCBzb3J0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0FjdGlvbnMnLCBhbGlnbjogJ2NlbnRlcicsIHNvcnRhYmxlOiBmYWxzZSB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZmlsZXM6IFtdLFxuICAgICAgICAgICAgLyogZmlsZSBjb25maWcgKi9cbiAgICAgICAgICAgIGFjY2VwdDogJ2ltYWdlL3BuZyxpbWFnZS9naWYsaW1hZ2UvanBlZyxpbWFnZS93ZWJwJyxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6ICdnaWYsanBnLGpwZWcscG5nLHdlYnAnLFxuICAgICAgICAgICAgbWluU2l6ZTogMTAyNCxcbiAgICAgICAgICAgIHNpemU6IDEwMjQgKiAxMDI0ICogMTAsXG4gICAgICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICAgICAgICAgIGRpcmVjdG9yeTogZmFsc2UsXG4gICAgICAgICAgICBkcm9wOiB0cnVlLFxuICAgICAgICAgICAgZHJvcERpcmVjdG9yeTogdHJ1ZSxcbiAgICAgICAgICAgIGFkZEluZGV4OiBmYWxzZSxcbiAgICAgICAgICAgIHRocmVhZDogMyxcbiAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAgIHBvc3RBY3Rpb246ICcvdXBsb2Fkcy9wb3N0JyxcbiAgICAgICAgICAgIHB1dEFjdGlvbjogJy91cGxvYWRzL3B1dCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ1gtQ3NyZi1Ub2tlbic6IEFwcC5jc3JmVG9rZW4sXG4gICAgICAgICAgICAgICAgLyogYWRkZWQgYWNjZXNzIHRva2VuICovXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAnX2NzcmZfdG9rZW4nOiBBcHAuY3NyZlRva2VuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b0NvbXByZXNzOiAxMDI0ICogMTAyNCxcbiAgICAgICAgICAgIHVwbG9hZEF1dG86IGZhbHNlLFxuICAgICAgICAgICAgLyogZmlsZSBvcHRpb24gKi9cbiAgICAgICAgICAgIGlzT3B0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIC8qIGZpbGUgbmFtZSB2YWxpZGF0aW9uICovXG4gICAgICAgICAgICBtYXhJbnB1dDogKHYpID0+IHYubGVuZ3RoIDw9IDMwIHx8ICdJbnB1dCB0b28gbG9uZyEnLFxuICAgICAgICAgICAgLyogZmlsZSBwZXIgcGFnZSAqL1xuICAgICAgICAgICAgcGVyUGFnZURhdGE6IFsxMCwgMjUsIDUwLCB7IHRleHQ6ICdBbGwnLCB2YWx1ZTogLTEgfV1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBwcm9ncmVzcyAocHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHByb3BzKVxuICAgICAgICB9LFxuICAgICAgICByZW1vdmUgKGZpbGUpIHtcbiAgICAgICAgICAgIHRoaXMuJHJlZnMudXBsb2FkLnJlbW92ZShmaWxlKVxuICAgICAgICB9LFxuICAgICAgICBpbnB1dEZpbHRlciAobmV3RmlsZSwgb2xkRmlsZSwgcHJldmVudCkge1xuICAgICAgICAgICAgaWYgKG5ld0ZpbGUgJiYgIW9sZEZpbGUpIHtcbiAgICAgICAgICAgICAgICAvLyBCZWZvcmUgYWRkaW5nIGEgZmlsZVxuICAgICAgICAgICAgICAgIC8vIOa3u+WKoOaWh+S7tuWJjVxuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIHN5c3RlbSBmaWxlcyBvciBoaWRlIGZpbGVzXG4gICAgICAgICAgICAgICAgLy8g6L+H5ruk57O757uf5paH5Lu2IOWSjOmakOiXj+aWh+S7tlxuICAgICAgICAgICAgICAgIGlmICgvKFxcL3xeKShUaHVtYnNcXC5kYnxkZXNrdG9wXFwuaW5pfFxcLi4rKSQvLnRlc3QobmV3RmlsZS5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldmVudCgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIHBocCBodG1sIGpzIGZpbGVcbiAgICAgICAgICAgICAgICAvLyDov4fmu6QgcGhwIGh0bWwganMg5paH5Lu2XG4gICAgICAgICAgICAgICAgaWYgKC9cXC4ocGhwNT98aHRtbD98anN4PykkL2kudGVzdChuZXdGaWxlLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ZW50KClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBdXRvbWF0aWMgY29tcHJlc3Npb25cbiAgICAgICAgICAgICAgICAvLyDoh6rliqjljovnvKlcbiAgICAgICAgICAgICAgICBpZiAobmV3RmlsZS5maWxlICYmIG5ld0ZpbGUudHlwZS5zdWJzdHIoMCwgNikgPT09ICdpbWFnZS8nICYmIHRoaXMuYXV0b0NvbXByZXNzID4gMCAmJiB0aGlzLmF1dG9Db21wcmVzcyA8IG5ld0ZpbGUuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdGaWxlLmVycm9yID0gJ2NvbXByZXNzaW5nJ1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZUNvbXByZXNzb3IgPSBuZXcgSW1hZ2VDb21wcmVzc29yKG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRTaXplOiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiA1MTIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IDUxMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBpbWFnZUNvbXByZXNzb3IuY29tcHJlc3MobmV3RmlsZS5maWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZC51cGRhdGUobmV3RmlsZSwgeyBlcnJvcjogJycsIGZpbGUsIHNpemU6IGZpbGUuc2l6ZSwgdHlwZTogZmlsZS50eXBlIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZC51cGRhdGUobmV3RmlsZSwgeyBlcnJvcjogZXJyLm1lc3NhZ2UgfHwgJ2NvbXByZXNzJyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdGaWxlICYmICghb2xkRmlsZSB8fCBuZXdGaWxlLmZpbGUgIT09IG9sZEZpbGUuZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBibG9iIGZpZWxkXG4gICAgICAgICAgICAgICAgLy8g5Yib5bu6IGJsb2Ig5a2X5q61XG4gICAgICAgICAgICAgICAgbmV3RmlsZS5ibG9iID0gJydcbiAgICAgICAgICAgICAgICBsZXQgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMXG4gICAgICAgICAgICAgICAgaWYgKFVSTCAmJiBVUkwuY3JlYXRlT2JqZWN0VVJMKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbGUuYmxvYiA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3RmlsZS5maWxlKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFRodW1ibmFpbHNcbiAgICAgICAgICAgICAgICAvLyDnvKnnlaXlm75cbiAgICAgICAgICAgICAgICBuZXdGaWxlLnRodW1iID0gJydcbiAgICAgICAgICAgICAgICBpZiAobmV3RmlsZS5ibG9iICYmIG5ld0ZpbGUudHlwZS5zdWJzdHIoMCwgNikgPT09ICdpbWFnZS8nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbGUudGh1bWIgPSBuZXdGaWxlLmJsb2JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gYWRkLCB1cGRhdGUsIHJlbW92ZSBGaWxlIEV2ZW50XG4gICAgICAgIGlucHV0RmlsZSAobmV3RmlsZSwgb2xkRmlsZSkge1xuICAgICAgICAgICAgaWYgKG5ld0ZpbGUgJiYgb2xkRmlsZSkge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZVxuXG4gICAgICAgICAgICAgICAgaWYgKG5ld0ZpbGUuYWN0aXZlICYmICFvbGRGaWxlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBiZWZvcmVTZW5kXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWluIHNpemVcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0ZpbGUuc2l6ZSA+PSAwICYmIHRoaXMubWluU2l6ZSA+IDAgJiYgbmV3RmlsZS5zaXplIDwgdGhpcy5taW5TaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZC51cGRhdGUobmV3RmlsZSwgeyBlcnJvcjogJ3NpemUnIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3RmlsZS5wcm9ncmVzcyAhPT0gb2xkRmlsZS5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBwcm9ncmVzc1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXdGaWxlLmVycm9yICYmICFvbGRGaWxlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5ld0ZpbGUuc3VjY2VzcyAmJiAhb2xkRmlsZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbmV3RmlsZSAmJiBvbGRGaWxlKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlXG4gICAgICAgICAgICAgICAgaWYgKG9sZEZpbGUuc3VjY2VzcyAmJiBvbGRGaWxlLnJlc3BvbnNlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgdHlwZTogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgdXJsOiAnL3VwbG9hZC9kZWxldGU/aWQ9JyArIG9sZEZpbGUucmVzcG9uc2UuaWQsXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IGFjdGl2YXRlIHVwbG9hZFxuICAgICAgICAgICAgaWYgKEJvb2xlYW4obmV3RmlsZSkgIT09IEJvb2xlYW4ob2xkRmlsZSkgfHwgb2xkRmlsZS5lcnJvciAhPT0gbmV3RmlsZS5lcnJvcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVwbG9hZEF1dG8gJiYgIXRoaXMuJHJlZnMudXBsb2FkLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZC5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gVXBsb2Fkcy52dWU/YmFiZjA0MGUiLCIvKiFcbiAqIEltYWdlIENvbXByZXNzb3IgdjAuNS4yXG4gKiBodHRwczovL2dpdGh1Yi5jb20veGtlc2hpL2ltYWdlLWNvbXByZXNzb3JcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgWGtlc2hpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE3LTEwLTA5VDAyOjQwOjM3LjEyOVpcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwuSW1hZ2VDb21wcmVzc29yID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjcmVhdGVDb21tb25qc01vZHVsZShmbiwgbW9kdWxlKSB7XG5cdHJldHVybiBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH0sIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0cztcbn1cblxudmFyIGNhbnZhc1RvQmxvYiA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUpIHtcbi8qXG4gKiBKYXZhU2NyaXB0IENhbnZhcyB0byBCbG9iXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LUNhbnZhcy10by1CbG9iXG4gKlxuICogQ29weXJpZ2h0IDIwMTIsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIEJhc2VkIG9uIHN0YWNrb3ZlcmZsb3cgdXNlciBTdG9pdmUncyBjb2RlIHNuaXBwZXQ6XG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcS80OTk4OTA4XG4gKi9cblxuLyogZ2xvYmFsIGF0b2IsIEJsb2IsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKHdpbmRvdykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIENhbnZhc1Byb3RvdHlwZSA9XG4gICAgd2luZG93LkhUTUxDYW52YXNFbGVtZW50ICYmIHdpbmRvdy5IVE1MQ2FudmFzRWxlbWVudC5wcm90b3R5cGU7XG4gIHZhciBoYXNCbG9iQ29uc3RydWN0b3IgPVxuICAgIHdpbmRvdy5CbG9iICYmXG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKG5ldyBCbG9iKCkpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCk7XG4gIHZhciBoYXNBcnJheUJ1ZmZlclZpZXdTdXBwb3J0ID1cbiAgICBoYXNCbG9iQ29uc3RydWN0b3IgJiZcbiAgICB3aW5kb3cuVWludDhBcnJheSAmJlxuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IEJsb2IoW25ldyBVaW50OEFycmF5KDEwMCldKS5zaXplID09PSAxMDBcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKTtcbiAgdmFyIEJsb2JCdWlsZGVyID1cbiAgICB3aW5kb3cuQmxvYkJ1aWxkZXIgfHxcbiAgICB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHxcbiAgICB3aW5kb3cuTW96QmxvYkJ1aWxkZXIgfHxcbiAgICB3aW5kb3cuTVNCbG9iQnVpbGRlcjtcbiAgdmFyIGRhdGFVUklQYXR0ZXJuID0gL15kYXRhOigoLio/KSg7Y2hhcnNldD0uKj8pPykoO2Jhc2U2NCk/LC87XG4gIHZhciBkYXRhVVJMdG9CbG9iID1cbiAgICAoaGFzQmxvYkNvbnN0cnVjdG9yIHx8IEJsb2JCdWlsZGVyKSAmJlxuICAgIHdpbmRvdy5hdG9iICYmXG4gICAgd2luZG93LkFycmF5QnVmZmVyICYmXG4gICAgd2luZG93LlVpbnQ4QXJyYXkgJiZcbiAgICBmdW5jdGlvbiAoZGF0YVVSSSkge1xuICAgICAgdmFyIG1hdGNoZXMsXG4gICAgICAgIG1lZGlhVHlwZSxcbiAgICAgICAgaXNCYXNlNjQsXG4gICAgICAgIGRhdGFTdHJpbmcsXG4gICAgICAgIGJ5dGVTdHJpbmcsXG4gICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICBpbnRBcnJheSxcbiAgICAgICAgaSxcbiAgICAgICAgYmI7XG4gICAgICAvLyBQYXJzZSB0aGUgZGF0YVVSSSBjb21wb25lbnRzIGFzIHBlciBSRkMgMjM5N1xuICAgICAgbWF0Y2hlcyA9IGRhdGFVUkkubWF0Y2goZGF0YVVSSVBhdHRlcm4pO1xuICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBkYXRhIFVSSScpXG4gICAgICB9XG4gICAgICAvLyBEZWZhdWx0IHRvIHRleHQvcGxhaW47Y2hhcnNldD1VUy1BU0NJSVxuICAgICAgbWVkaWFUeXBlID0gbWF0Y2hlc1syXVxuICAgICAgICA/IG1hdGNoZXNbMV1cbiAgICAgICAgOiAndGV4dC9wbGFpbicgKyAobWF0Y2hlc1szXSB8fCAnO2NoYXJzZXQ9VVMtQVNDSUknKTtcbiAgICAgIGlzQmFzZTY0ID0gISFtYXRjaGVzWzRdO1xuICAgICAgZGF0YVN0cmluZyA9IGRhdGFVUkkuc2xpY2UobWF0Y2hlc1swXS5sZW5ndGgpO1xuICAgICAgaWYgKGlzQmFzZTY0KSB7XG4gICAgICAgIC8vIENvbnZlcnQgYmFzZTY0IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nOlxuICAgICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhU3RyaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeTpcbiAgICAgICAgYnl0ZVN0cmluZyA9IGRlY29kZVVSSUNvbXBvbmVudChkYXRhU3RyaW5nKTtcbiAgICAgIH1cbiAgICAgIC8vIFdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGFuIEFycmF5QnVmZmVyOlxuICAgICAgYXJyYXlCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICAgICAgaW50QXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcik7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpbnRBcnJheVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdyaXRlIHRoZSBBcnJheUJ1ZmZlciAob3IgQXJyYXlCdWZmZXJWaWV3KSB0byBhIGJsb2I6XG4gICAgICBpZiAoaGFzQmxvYkNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmxvYihbaGFzQXJyYXlCdWZmZXJWaWV3U3VwcG9ydCA/IGludEFycmF5IDogYXJyYXlCdWZmZXJdLCB7XG4gICAgICAgICAgdHlwZTogbWVkaWFUeXBlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBiYiA9IG5ldyBCbG9iQnVpbGRlcigpO1xuICAgICAgYmIuYXBwZW5kKGFycmF5QnVmZmVyKTtcbiAgICAgIHJldHVybiBiYi5nZXRCbG9iKG1lZGlhVHlwZSlcbiAgICB9O1xuICBpZiAod2luZG93LkhUTUxDYW52YXNFbGVtZW50ICYmICFDYW52YXNQcm90b3R5cGUudG9CbG9iKSB7XG4gICAgaWYgKENhbnZhc1Byb3RvdHlwZS5tb3pHZXRBc0ZpbGUpIHtcbiAgICAgIENhbnZhc1Byb3RvdHlwZS50b0Jsb2IgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHR5cGUsIHF1YWxpdHkpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAocXVhbGl0eSAmJiBDYW52YXNQcm90b3R5cGUudG9EYXRhVVJMICYmIGRhdGFVUkx0b0Jsb2IpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGFVUkx0b0Jsb2Ioc2VsZi50b0RhdGFVUkwodHlwZSwgcXVhbGl0eSkpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soc2VsZi5tb3pHZXRBc0ZpbGUoJ2Jsb2InLCB0eXBlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChDYW52YXNQcm90b3R5cGUudG9EYXRhVVJMICYmIGRhdGFVUkx0b0Jsb2IpIHtcbiAgICAgIENhbnZhc1Byb3RvdHlwZS50b0Jsb2IgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHR5cGUsIHF1YWxpdHkpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjayhkYXRhVVJMdG9CbG9iKHNlbGYudG9EYXRhVVJMKHR5cGUsIHF1YWxpdHkpKSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVvZiB1bmRlZmluZWQgPT09ICdmdW5jdGlvbicgJiYgdW5kZWZpbmVkLmFtZCkge1xuICAgIHVuZGVmaW5lZChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZGF0YVVSTHRvQmxvYlxuICAgIH0pO1xuICB9IGVsc2UgaWYgKCdvYmplY3QnID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZGF0YVVSTHRvQmxvYjtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuZGF0YVVSTHRvQmxvYiA9IGRhdGFVUkx0b0Jsb2I7XG4gIH1cbn0pKHdpbmRvdyk7XG59KTtcblxuLyogZ2xvYmFscyBCbG9iICovXG4ndXNlIHN0cmljdCc7XG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG52YXIgaXNCbG9iID0gZnVuY3Rpb24gKHgpIHtcblx0cmV0dXJuIHggaW5zdGFuY2VvZiBCbG9iIHx8IHRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn07XG5cbnZhciBERUZBVUxUUyA9IHtcbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiByZWFkIHRoZSBpbWFnZSdzIEV4aWYgT3JpZW50YXRpb24gaW5mb3JtYXRpb24sXG4gICAqIGFuZCB0aGVuIHJvdGF0ZSBvciBmbGlwIHRoZSBpbWFnZSBhdXRvbWF0aWNhbGx5LlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIGNoZWNrT3JpZW50YXRpb246IHRydWUsXG5cbiAgLyoqXG4gICAqIFRoZSBtYXggd2lkdGggb2YgdGhlIG91dHB1dCBpbWFnZS5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIG1heFdpZHRoOiBJbmZpbml0eSxcblxuICAvKipcbiAgICogVGhlIG1heCBoZWlnaHQgb2YgdGhlIG91dHB1dCBpbWFnZS5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIG1heEhlaWdodDogSW5maW5pdHksXG5cbiAgLyoqXG4gICAqIFRoZSBtaW4gd2lkdGggb2YgdGhlIG91dHB1dCBpbWFnZS5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIG1pbldpZHRoOiAwLFxuXG4gIC8qKlxuICAgKiBUaGUgbWluIGhlaWdodCBvZiB0aGUgb3V0cHV0IGltYWdlLlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgbWluSGVpZ2h0OiAwLFxuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIG91dHB1dCBpbWFnZS5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgdGhlIG5hdHVyYWwgd2lkdGggb2YgdGhlIHNvdXJjZSBpbWFnZSB3aWxsIGJlIHVzZWQuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICB3aWR0aDogdW5kZWZpbmVkLFxuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBvdXRwdXQgaW1hZ2UuXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIHRoZSBuYXR1cmFsIGhlaWdodCBvZiB0aGUgc291cmNlIGltYWdlIHdpbGwgYmUgdXNlZC5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIGhlaWdodDogdW5kZWZpbmVkLFxuXG4gIC8qKlxuICAgKiBUaGUgcXVhbGl0eSBvZiB0aGUgb3V0cHV0IGltYWdlLlxuICAgKiBJdCBtdXN0IGJlIGEgbnVtYmVyIGJldHdlZW4gYDBgIGFuZCBgMWAsXG4gICAqIGFuZCBvbmx5IGF2YWlsYWJsZSBmb3IgYGltYWdlL2pwZWdgIGFuZCBgaW1hZ2Uvd2VicGAgaW1hZ2VzLlxuICAgKiBDaGVjayBvdXQge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MQ2FudmFzRWxlbWVudC90b0Jsb2IgY2FudmFzLnRvQmxvYn0uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBxdWFsaXR5OiAwLjgsXG5cbiAgLyoqXG4gICAqIFRoZSBtaW1lIHR5cGUgb2YgdGhlIG91dHB1dCBpbWFnZS5cbiAgICogQnkgZGVmYXVsdCwgdGhlIG9yaWdpbmFsIG1pbWUgdHlwZSBvZiB0aGUgc291cmNlIGltYWdlIGZpbGUgd2lsbCBiZSB1c2VkLlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbWltZVR5cGU6ICdhdXRvJyxcblxuICAvKipcbiAgICogUE5HIGZpbGVzIG92ZXIgdGhpcyB2YWx1ZSAoNU0gYnkgZGVmYXVsdCkgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gSlBFR3MuXG4gICAqIFRvIGRpc2FibGUgdGhpcywganVzdCBzZXQgdGhlIHZhbHVlIHRvIGBJbmZpbml0eWAuXG4gICAqIENoZWNrIG91dCB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3hrZXNoaS9pbWFnZS1jb21wcmVzc29yL2lzc3Vlcy8yICMyfS5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIGNvbnZlcnRTaXplOiA1MDAwMDAwLFxuXG4gIC8qKlxuICAgKiBUaGUgc3VjY2VzcyBjYWxsYmFjayBmb3IgdGhlIGltYWdlIGNvbXByZXNzaW5nIHByb2Nlc3MuXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICogQHBhcmFtIHtGaWxlfSBmaWxlIC0gVGhlIGNvbXByZXNzZWQgaW1hZ2UgRmlsZSBvYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqIGZ1bmN0aW9uIChmaWxlKSB7IGNvbnNvbGUubG9nKGZpbGUpIH1cbiAgICovXG4gIHN1Y2Nlc3M6IG51bGwsXG5cbiAgLyoqXG4gICAqIFRoZSBlcnJvciBjYWxsYmFjayBmb3IgdGhlIGltYWdlIGNvbXByZXNzaW5nIHByb2Nlc3MuXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyIC0gQW4gRXJyb3Igb2JqZWN0LlxuICAgKiBAZXhhbXBsZVxuICAgKiBmdW5jdGlvbiAoZXJyKSB7IGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKSB9XG4gICAqL1xuICBlcnJvcjogbnVsbFxufTtcblxudmFyIFJFR0VYUF9JTUFHRV9UWVBFID0gL15pbWFnZVxcLy4rJC87XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgbWltZSB0eXBlIG9mIGltYWdlLlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gaXMgYSBtaW1lIHR5cGUgb2YgaW1hZ2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbWFnZVR5cGUodmFsdWUpIHtcbiAgcmV0dXJuIFJFR0VYUF9JTUFHRV9UWVBFLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnQgaW1hZ2UgdHlwZSB0byBleHRlbnNpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBUaGUgaW1hZ2UgdHlwZSB0byBjb252ZXJ0LlxuICogQHBhcmFtIHtib29sZWFufSBbaW5jbHVkZURvdD10cnVlXSAtIEluY2x1ZGUgYSBsZWFkaW5nIGRvdCBvciBub3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0aGUgaW1hZ2UgZXh0ZW5zaW9uLlxuICovXG5mdW5jdGlvbiBpbWFnZVR5cGVUb0V4dGVuc2lvbih2YWx1ZSkge1xuICB2YXIgaW5jbHVkZURvdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICB2YXIgZXh0ZW5zaW9uID0gaXNJbWFnZVR5cGUodmFsdWUpID8gdmFsdWUuc3Vic3RyKDYpIDogJyc7XG5cbiAgaWYgKGV4dGVuc2lvbiA9PT0gJ2pwZWcnKSB7XG4gICAgZXh0ZW5zaW9uID0gJ2pwZyc7XG4gIH1cblxuICBpZiAoZXh0ZW5zaW9uICYmIGluY2x1ZGVEb3QpIHtcbiAgICBleHRlbnNpb24gPSAnLicgKyBleHRlbnNpb247XG4gIH1cblxuICByZXR1cm4gZXh0ZW5zaW9uO1xufVxuXG52YXIgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblxuLyoqXG4gKiBHZXQgc3RyaW5nIGZyb20gY2hhciBjb2RlIGluIGRhdGEgdmlldy5cbiAqIEBwYXJhbSB7RGF0YVZpZXd9IGRhdGFWaWV3IC0gVGhlIGRhdGEgdmlldyBmb3IgcmVhZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCAtIFRoZSBzdGFydCBpbmRleC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgcmVhZCBsZW5ndGguXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcmVhZCByZXN1bHQuXG4gKi9cblxuZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbUNoYXJDb2RlKGRhdGFWaWV3LCBzdGFydCwgbGVuZ3RoKSB7XG4gIHZhciBzdHIgPSAnJztcbiAgdmFyIGkgPSB2b2lkIDA7XG5cbiAgbGVuZ3RoICs9IHN0YXJ0O1xuXG4gIGZvciAoaSA9IHN0YXJ0OyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzdHIgKz0gZnJvbUNoYXJDb2RlKGRhdGFWaWV3LmdldFVpbnQ4KGkpKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbnZhciBfd2luZG93JDEgPSB3aW5kb3c7XG52YXIgYnRvYSA9IF93aW5kb3ckMS5idG9hO1xuXG4vKipcbiAqIFRyYW5zZm9ybSBhcnJheSBidWZmZXIgdG8gRGF0YSBVUkwuXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciAtIFRoZSBhcnJheSBidWZmZXIgdG8gdHJhbnNmb3JtLlxuICogQHBhcmFtIHtzdHJpbmd9IG1pbWVUeXBlIC0gVGhlIG1pbWUgdHlwZSBvZiB0aGUgRGF0YSBVUkwuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcmVzdWx0IERhdGEgVVJMLlxuICovXG5cbmZ1bmN0aW9uIGFycmF5QnVmZmVyVG9EYXRhVVJMKGFycmF5QnVmZmVyLCBtaW1lVHlwZSkge1xuICB2YXIgdWludDggPSBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcik7XG4gIHZhciBsZW5ndGggPSB1aW50OC5sZW5ndGg7XG5cbiAgdmFyIGRhdGEgPSAnJztcbiAgdmFyIGkgPSB2b2lkIDA7XG5cbiAgLy8gVHlwZWRBcnJheS5wcm90b3R5cGUuZm9yRWFjaCBpcyBub3Qgc3VwcG9ydGVkIGluIHNvbWUgYnJvd3NlcnMuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGRhdGEgKz0gZnJvbUNoYXJDb2RlKHVpbnQ4W2ldKTtcbiAgfVxuXG4gIHJldHVybiAnZGF0YTonICsgbWltZVR5cGUgKyAnO2Jhc2U2NCwnICsgYnRvYShkYXRhKTtcbn1cblxuLyoqXG4gKiBHZXQgb3JpZW50YXRpb24gdmFsdWUgZnJvbSBnaXZlbiBhcnJheSBidWZmZXIuXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciAtIFRoZSBhcnJheSBidWZmZXIgdG8gcmVhZC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSByZWFkIG9yaWVudGF0aW9uIHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRPcmllbnRhdGlvbihhcnJheUJ1ZmZlcikge1xuICB2YXIgZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoYXJyYXlCdWZmZXIpO1xuICB2YXIgb3JpZW50YXRpb24gPSB2b2lkIDA7XG4gIHZhciBsaXR0bGVFbmRpYW4gPSB2b2lkIDA7XG4gIHZhciBhcHAxU3RhcnQgPSB2b2lkIDA7XG4gIHZhciBpZmRTdGFydCA9IHZvaWQgMDtcblxuICAvLyBPbmx5IGhhbmRsZSBKUEVHIGltYWdlIChzdGFydCBieSAweEZGRDgpXG4gIGlmIChkYXRhVmlldy5nZXRVaW50OCgwKSA9PT0gMHhGRiAmJiBkYXRhVmlldy5nZXRVaW50OCgxKSA9PT0gMHhEOCkge1xuICAgIHZhciBsZW5ndGggPSBkYXRhVmlldy5ieXRlTGVuZ3RoO1xuICAgIHZhciBvZmZzZXQgPSAyO1xuXG4gICAgd2hpbGUgKG9mZnNldCA8IGxlbmd0aCkge1xuICAgICAgaWYgKGRhdGFWaWV3LmdldFVpbnQ4KG9mZnNldCkgPT09IDB4RkYgJiYgZGF0YVZpZXcuZ2V0VWludDgob2Zmc2V0ICsgMSkgPT09IDB4RTEpIHtcbiAgICAgICAgYXBwMVN0YXJ0ID0gb2Zmc2V0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgb2Zmc2V0ICs9IDE7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFwcDFTdGFydCkge1xuICAgIHZhciBleGlmSURDb2RlID0gYXBwMVN0YXJ0ICsgNDtcbiAgICB2YXIgdGlmZk9mZnNldCA9IGFwcDFTdGFydCArIDEwO1xuXG4gICAgaWYgKGdldFN0cmluZ0Zyb21DaGFyQ29kZShkYXRhVmlldywgZXhpZklEQ29kZSwgNCkgPT09ICdFeGlmJykge1xuICAgICAgdmFyIGVuZGlhbm5lc3MgPSBkYXRhVmlldy5nZXRVaW50MTYodGlmZk9mZnNldCk7XG5cbiAgICAgIGxpdHRsZUVuZGlhbiA9IGVuZGlhbm5lc3MgPT09IDB4NDk0OTtcblxuICAgICAgaWYgKGxpdHRsZUVuZGlhbiB8fCBlbmRpYW5uZXNzID09PSAweDRENEQgLyogYmlnRW5kaWFuICovKSB7XG4gICAgICAgICAgaWYgKGRhdGFWaWV3LmdldFVpbnQxNih0aWZmT2Zmc2V0ICsgMiwgbGl0dGxlRW5kaWFuKSA9PT0gMHgwMDJBKSB7XG4gICAgICAgICAgICB2YXIgZmlyc3RJRkRPZmZzZXQgPSBkYXRhVmlldy5nZXRVaW50MzIodGlmZk9mZnNldCArIDQsIGxpdHRsZUVuZGlhbik7XG5cbiAgICAgICAgICAgIGlmIChmaXJzdElGRE9mZnNldCA+PSAweDAwMDAwMDA4KSB7XG4gICAgICAgICAgICAgIGlmZFN0YXJ0ID0gdGlmZk9mZnNldCArIGZpcnN0SUZET2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpZmRTdGFydCkge1xuICAgIHZhciBfbGVuZ3RoID0gZGF0YVZpZXcuZ2V0VWludDE2KGlmZFN0YXJ0LCBsaXR0bGVFbmRpYW4pO1xuICAgIHZhciBfb2Zmc2V0ID0gdm9pZCAwO1xuICAgIHZhciBpID0gdm9pZCAwO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IF9sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgX29mZnNldCA9IGlmZFN0YXJ0ICsgaSAqIDEyICsgMjtcblxuICAgICAgaWYgKGRhdGFWaWV3LmdldFVpbnQxNihfb2Zmc2V0LCBsaXR0bGVFbmRpYW4pID09PSAweDAxMTIgLyogT3JpZW50YXRpb24gKi8pIHtcbiAgICAgICAgICAvLyA4IGlzIHRoZSBvZmZzZXQgb2YgdGhlIGN1cnJlbnQgdGFnJ3MgdmFsdWVcbiAgICAgICAgICBfb2Zmc2V0ICs9IDg7XG5cbiAgICAgICAgICAvLyBHZXQgdGhlIG9yaWdpbmFsIG9yaWVudGF0aW9uIHZhbHVlXG4gICAgICAgICAgb3JpZW50YXRpb24gPSBkYXRhVmlldy5nZXRVaW50MTYoX29mZnNldCwgbGl0dGxlRW5kaWFuKTtcblxuICAgICAgICAgIC8vIE92ZXJyaWRlIHRoZSBvcmllbnRhdGlvbiB3aXRoIGl0cyBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgZGF0YVZpZXcuc2V0VWludDE2KF9vZmZzZXQsIDEsIGxpdHRsZUVuZGlhbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3JpZW50YXRpb247XG59XG5cbi8qKlxuICogUGFyc2UgRXhpZiBPcmllbnRhdGlvbiB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcmllbnRhdGlvbiAtIFRoZSBvcmllbnRhdGlvbiB0byBwYXJzZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBwYXJzZWQgcmVzdWx0LlxuICovXG5mdW5jdGlvbiBwYXJzZU9yaWVudGF0aW9uKG9yaWVudGF0aW9uKSB7XG4gIHZhciByb3RhdGUgPSAwO1xuICB2YXIgc2NhbGVYID0gMTtcbiAgdmFyIHNjYWxlWSA9IDE7XG5cbiAgc3dpdGNoIChvcmllbnRhdGlvbikge1xuICAgIC8vIEZsaXAgaG9yaXpvbnRhbFxuICAgIGNhc2UgMjpcbiAgICAgIHNjYWxlWCA9IC0xO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBSb3RhdGUgbGVmdCAxODDCsFxuICAgIGNhc2UgMzpcbiAgICAgIHJvdGF0ZSA9IC0xODA7XG4gICAgICBicmVhaztcblxuICAgIC8vIEZsaXAgdmVydGljYWxcbiAgICBjYXNlIDQ6XG4gICAgICBzY2FsZVkgPSAtMTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gRmxpcCB2ZXJ0aWNhbCBhbmQgcm90YXRlIHJpZ2h0IDkwwrBcbiAgICBjYXNlIDU6XG4gICAgICByb3RhdGUgPSA5MDtcbiAgICAgIHNjYWxlWSA9IC0xO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBSb3RhdGUgcmlnaHQgOTDCsFxuICAgIGNhc2UgNjpcbiAgICAgIHJvdGF0ZSA9IDkwO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBGbGlwIGhvcml6b250YWwgYW5kIHJvdGF0ZSByaWdodCA5MMKwXG4gICAgY2FzZSA3OlxuICAgICAgcm90YXRlID0gOTA7XG4gICAgICBzY2FsZVggPSAtMTtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gUm90YXRlIGxlZnQgOTDCsFxuICAgIGNhc2UgODpcbiAgICAgIHJvdGF0ZSA9IC05MDtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcm90YXRlOiByb3RhdGUsXG4gICAgc2NhbGVYOiBzY2FsZVgsXG4gICAgc2NhbGVZOiBzY2FsZVlcbiAgfTtcbn1cblxudmFyIGFzeW5jR2VuZXJhdG9yID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBd2FpdFZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gQXN5bmNHZW5lcmF0b3IoZ2VuKSB7XG4gICAgdmFyIGZyb250LCBiYWNrO1xuXG4gICAgZnVuY3Rpb24gc2VuZChrZXksIGFyZykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgYXJnOiBhcmcsXG4gICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgICByZWplY3Q6IHJlamVjdCxcbiAgICAgICAgICBuZXh0OiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGJhY2spIHtcbiAgICAgICAgICBiYWNrID0gYmFjay5uZXh0ID0gcmVxdWVzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcm9udCA9IGJhY2sgPSByZXF1ZXN0O1xuICAgICAgICAgIHJlc3VtZShrZXksIGFyZyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc3VtZShrZXksIGFyZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGdlbltrZXldKGFyZyk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBd2FpdFZhbHVlKSB7XG4gICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlLnZhbHVlKS50aGVuKGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHJlc3VtZShcIm5leHRcIiwgYXJnKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICByZXN1bWUoXCJ0aHJvd1wiLCBhcmcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldHRsZShyZXN1bHQuZG9uZSA/IFwicmV0dXJuXCIgOiBcIm5vcm1hbFwiLCByZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2V0dGxlKFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR0bGUodHlwZSwgdmFsdWUpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwicmV0dXJuXCI6XG4gICAgICAgICAgZnJvbnQucmVzb2x2ZSh7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInRocm93XCI6XG4gICAgICAgICAgZnJvbnQucmVqZWN0KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGZyb250LnJlc29sdmUoe1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZG9uZTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZnJvbnQgPSBmcm9udC5uZXh0O1xuXG4gICAgICBpZiAoZnJvbnQpIHtcbiAgICAgICAgcmVzdW1lKGZyb250LmtleSwgZnJvbnQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhY2sgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2ludm9rZSA9IHNlbmQ7XG5cbiAgICBpZiAodHlwZW9mIGdlbi5yZXR1cm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5yZXR1cm4gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuYXN5bmNJdGVyYXRvcikge1xuICAgIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcIm5leHRcIiwgYXJnKTtcbiAgfTtcblxuICBBc3luY0dlbmVyYXRvci5wcm90b3R5cGUudGhyb3cgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcInRocm93XCIsIGFyZyk7XG4gIH07XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKFwicmV0dXJuXCIsIGFyZyk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICB3cmFwOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNHZW5lcmF0b3IoZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgYXdhaXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBBd2FpdFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuXG5cblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG5cblxuXG5cblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbnZhciBfd2luZG93ID0gd2luZG93O1xudmFyIEFycmF5QnVmZmVyJDEgPSBfd2luZG93LkFycmF5QnVmZmVyO1xudmFyIEZpbGVSZWFkZXIgPSBfd2luZG93LkZpbGVSZWFkZXI7XG5cbnZhciBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkw7XG52YXIgUkVHRVhQX0VYVEVOU0lPTiA9IC9cXC5cXHcrJC87XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpbWFnZSBjb21wcmVzc29yLlxuICogQGNsYXNzXG4gKi9cblxudmFyIEltYWdlQ29tcHJlc3NvciA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBvZiBJbWFnZUNvbXByZXNzb3IuXG4gICAqIEBwYXJhbSB7RmlsZXxCbG9ifSBmaWxlIC0gVGhlIHRhcmdldCBpbWFnZSBmaWxlIGZvciBjb21wcmVzc2luZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zIGZvciBjb21wcmVzc2luZy5cbiAgICovXG4gIGZ1bmN0aW9uIEltYWdlQ29tcHJlc3NvcihmaWxlLCBvcHRpb25zKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgSW1hZ2VDb21wcmVzc29yKTtcblxuICAgIHRoaXMucmVzdWx0ID0gbnVsbDtcblxuICAgIGlmIChmaWxlKSB7XG4gICAgICB0aGlzLmNvbXByZXNzKGZpbGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWFpbiBjb21wcmVzcyBtZXRob2QuXG4gICAqIEBwYXJhbSB7RmlsZXxCbG9ifSBmaWxlIC0gVGhlIHRhcmdldCBpbWFnZSBmaWxlIGZvciBjb21wcmVzc2luZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFRoZSBvcHRpb25zIGZvciBjb21wcmVzc2luZy5cbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBQcm9taXNlIGluc3RhbmNlLlxuICAgKi9cblxuXG4gIGNyZWF0ZUNsYXNzKEltYWdlQ29tcHJlc3NvciwgW3tcbiAgICBrZXk6ICdjb21wcmVzcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXByZXNzKGZpbGUsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICBvcHRpb25zID0gX2V4dGVuZHMoe30sIERFRkFVTFRTLCBvcHRpb25zKTtcblxuICAgICAgaWYgKCFBcnJheUJ1ZmZlciQxKSB7XG4gICAgICAgIG9wdGlvbnMuY2hlY2tPcmllbnRhdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoIWlzQmxvYihmaWxlKSkge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgRmlsZSBvciBCbG9iIG9iamVjdC4nKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1pbWVUeXBlID0gZmlsZS50eXBlO1xuXG4gICAgICAgIGlmICghaXNJbWFnZVR5cGUobWltZVR5cGUpKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYW4gaW1hZ2UgRmlsZSBvciBCbG9iIG9iamVjdC4nKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFVUkwgJiYgIUZpbGVSZWFkZXIpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdUaGUgY3VycmVudCBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgaW1hZ2UgY29tcHJlc3Npb24uJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVUkwgJiYgIW9wdGlvbnMuY2hlY2tPcmllbnRhdGlvbikge1xuICAgICAgICAgIHJlc29sdmUoVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoRmlsZVJlYWRlcikge1xuICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgIHZhciBjaGVja09yaWVudGF0aW9uID0gb3B0aW9ucy5jaGVja09yaWVudGF0aW9uICYmIG1pbWVUeXBlID09PSAnaW1hZ2UvanBlZyc7XG5cbiAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBfcmVmLnRhcmdldDtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQucmVzdWx0O1xuXG5cbiAgICAgICAgICAgIHJlc29sdmUoY2hlY2tPcmllbnRhdGlvbiA/IF9leHRlbmRzKHtcbiAgICAgICAgICAgICAgdXJsOiBhcnJheUJ1ZmZlclRvRGF0YVVSTChyZXN1bHQsIG1pbWVUeXBlKVxuICAgICAgICAgICAgfSwgcGFyc2VPcmllbnRhdGlvbihnZXRPcmllbnRhdGlvbihyZXN1bHQpKSkgOiB7XG4gICAgICAgICAgICAgIHVybDogcmVzdWx0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlYWRlci5vbmFib3J0ID0gcmVqZWN0O1xuICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICAgICAgaWYgKGNoZWNrT3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX2V4dGVuZHMoe30sIGRhdGEsIHtcbiAgICAgICAgICAgICAgbmF0dXJhbFdpZHRoOiBpbWFnZS5uYXR1cmFsV2lkdGgsXG4gICAgICAgICAgICAgIG5hdHVyYWxIZWlnaHQ6IGltYWdlLm5hdHVyYWxIZWlnaHRcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGltYWdlLm9uYWJvcnQgPSByZWplY3Q7XG4gICAgICAgICAgaW1hZ2Uub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgICBpbWFnZS5hbHQgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgaW1hZ2Uuc3JjID0gZGF0YS51cmw7XG4gICAgICAgIH0pO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgICAgdmFyIG5hdHVyYWxXaWR0aCA9IF9yZWYyLm5hdHVyYWxXaWR0aCxcbiAgICAgICAgICAgIG5hdHVyYWxIZWlnaHQgPSBfcmVmMi5uYXR1cmFsSGVpZ2h0LFxuICAgICAgICAgICAgX3JlZjIkcm90YXRlID0gX3JlZjIucm90YXRlLFxuICAgICAgICAgICAgcm90YXRlID0gX3JlZjIkcm90YXRlID09PSB1bmRlZmluZWQgPyAwIDogX3JlZjIkcm90YXRlLFxuICAgICAgICAgICAgX3JlZjIkc2NhbGVYID0gX3JlZjIuc2NhbGVYLFxuICAgICAgICAgICAgc2NhbGVYID0gX3JlZjIkc2NhbGVYID09PSB1bmRlZmluZWQgPyAxIDogX3JlZjIkc2NhbGVYLFxuICAgICAgICAgICAgX3JlZjIkc2NhbGVZID0gX3JlZjIuc2NhbGVZLFxuICAgICAgICAgICAgc2NhbGVZID0gX3JlZjIkc2NhbGVZID09PSB1bmRlZmluZWQgPyAxIDogX3JlZjIkc2NhbGVZO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICB2YXIgYXNwZWN0UmF0aW8gPSBuYXR1cmFsV2lkdGggLyBuYXR1cmFsSGVpZ2h0O1xuICAgICAgICAgIHZhciBtYXhXaWR0aCA9IE1hdGgubWF4KG9wdGlvbnMubWF4V2lkdGgsIDApIHx8IEluZmluaXR5O1xuICAgICAgICAgIHZhciBtYXhIZWlnaHQgPSBNYXRoLm1heChvcHRpb25zLm1heEhlaWdodCwgMCkgfHwgSW5maW5pdHk7XG4gICAgICAgICAgdmFyIG1pbldpZHRoID0gTWF0aC5tYXgob3B0aW9ucy5taW5XaWR0aCwgMCkgfHwgMDtcbiAgICAgICAgICB2YXIgbWluSGVpZ2h0ID0gTWF0aC5tYXgob3B0aW9ucy5taW5IZWlnaHQsIDApIHx8IDA7XG4gICAgICAgICAgdmFyIHdpZHRoID0gbmF0dXJhbFdpZHRoO1xuICAgICAgICAgIHZhciBoZWlnaHQgPSBuYXR1cmFsSGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKG1heFdpZHRoIDwgSW5maW5pdHkgJiYgbWF4SGVpZ2h0IDwgSW5maW5pdHkpIHtcbiAgICAgICAgICAgIGlmIChtYXhIZWlnaHQgKiBhc3BlY3RSYXRpbyA+IG1heFdpZHRoKSB7XG4gICAgICAgICAgICAgIG1heEhlaWdodCA9IG1heFdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtYXhXaWR0aCA9IG1heEhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobWF4V2lkdGggPCBJbmZpbml0eSkge1xuICAgICAgICAgICAgbWF4SGVpZ2h0ID0gbWF4V2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9IGVsc2UgaWYgKG1heEhlaWdodCA8IEluZmluaXR5KSB7XG4gICAgICAgICAgICBtYXhXaWR0aCA9IG1heEhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtaW5XaWR0aCA+IDAgJiYgbWluSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgaWYgKG1pbkhlaWdodCAqIGFzcGVjdFJhdGlvID4gbWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgbWluSGVpZ2h0ID0gbWluV2lkdGggLyBhc3BlY3RSYXRpbztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1pbldpZHRoID0gbWluSGVpZ2h0ICogYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChtaW5XaWR0aCA+IDApIHtcbiAgICAgICAgICAgIG1pbkhlaWdodCA9IG1pbldpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgfSBlbHNlIGlmIChtaW5IZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICBtaW5XaWR0aCA9IG1pbkhlaWdodCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvcHRpb25zLndpZHRoID4gMCkge1xuICAgICAgICAgICAgdmFyIF9vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgIHdpZHRoID0gX29wdGlvbnMud2lkdGg7XG5cbiAgICAgICAgICAgIGhlaWdodCA9IHdpZHRoIC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIHZhciBfb3B0aW9uczIgPSBvcHRpb25zO1xuICAgICAgICAgICAgaGVpZ2h0ID0gX29wdGlvbnMyLmhlaWdodDtcblxuICAgICAgICAgICAgd2lkdGggPSBoZWlnaHQgKiBhc3BlY3RSYXRpbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aWR0aCA9IE1hdGgubWluKE1hdGgubWF4KHdpZHRoLCBtaW5XaWR0aCksIG1heFdpZHRoKTtcbiAgICAgICAgICBoZWlnaHQgPSBNYXRoLm1pbihNYXRoLm1heChoZWlnaHQsIG1pbkhlaWdodCksIG1heEhlaWdodCk7XG5cbiAgICAgICAgICB2YXIgZGVzdFggPSAtd2lkdGggLyAyO1xuICAgICAgICAgIHZhciBkZXN0WSA9IC1oZWlnaHQgLyAyO1xuICAgICAgICAgIHZhciBkZXN0V2lkdGggPSB3aWR0aDtcbiAgICAgICAgICB2YXIgZGVzdEhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICAgIGlmIChNYXRoLmFicyhyb3RhdGUpICUgMTgwID09PSA5MCkge1xuICAgICAgICAgICAgdmFyIF93aWR0aCRoZWlnaHQgPSB7XG4gICAgICAgICAgICAgIHdpZHRoOiBoZWlnaHQsXG4gICAgICAgICAgICAgIGhlaWdodDogd2lkdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aWR0aCA9IF93aWR0aCRoZWlnaHQud2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSBfd2lkdGgkaGVpZ2h0LmhlaWdodDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgICAgLy8gT3ZlcnJpZGUgdGhlIGRlZmF1bHQgZmlsbCBjb2xvciAoIzAwMCwgYmxhY2spXG4gICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgY29udGV4dC50cmFuc2xhdGUod2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICAgICAgICBjb250ZXh0LnJvdGF0ZShyb3RhdGUgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgICBjb250ZXh0LnNjYWxlKHNjYWxlWCwgc2NhbGVZKTtcbiAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgTWF0aC5mbG9vcihkZXN0WCksIE1hdGguZmxvb3IoZGVzdFkpLCBNYXRoLmZsb29yKGRlc3RXaWR0aCksIE1hdGguZmxvb3IoZGVzdEhlaWdodCkpO1xuICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgICAgICAgaWYgKCFpc0ltYWdlVHlwZShvcHRpb25zLm1pbWVUeXBlKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5taW1lVHlwZSA9IGZpbGUudHlwZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDb252ZXJ0cyBQTkcgZmlsZXMgb3ZlciB0aGUgYGNvbnZlcnRTaXplYCB0byBKUEVHcy5cbiAgICAgICAgICBpZiAoZmlsZS5zaXplID4gb3B0aW9ucy5jb252ZXJ0U2l6ZSAmJiBvcHRpb25zLm1pbWVUeXBlID09PSAnaW1hZ2UvcG5nJykge1xuICAgICAgICAgICAgb3B0aW9ucy5taW1lVHlwZSA9ICdpbWFnZS9qcGVnJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY2FudmFzLnRvQmxvYikge1xuICAgICAgICAgICAgY2FudmFzLnRvQmxvYihyZXNvbHZlLCBvcHRpb25zLm1pbWVUeXBlLCBvcHRpb25zLnF1YWxpdHkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKGNhbnZhc1RvQmxvYihjYW52YXMudG9EYXRhVVJMKG9wdGlvbnMubWltZVR5cGUsIG9wdGlvbnMucXVhbGl0eSkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIGlmIChVUkwpIHtcbiAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGltYWdlLnNyYyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgLy8gUmV0dXJucyBvcmlnaW5hbCBmaWxlIGlmIHRoZSByZXN1bHQgaXMgZ3JlYXRlciB0aGFuIGl0IGFuZCB3aXRob3V0IHNpemUgcmVsYXRlZCBvcHRpb25zXG4gICAgICAgICAgaWYgKHJlc3VsdC5zaXplID4gZmlsZS5zaXplICYmICEob3B0aW9ucy53aWR0aCA+IDAgfHwgb3B0aW9ucy5oZWlnaHQgPiAwIHx8IG9wdGlvbnMubWF4V2lkdGggPCBJbmZpbml0eSB8fCBvcHRpb25zLm1heEhlaWdodCA8IEluZmluaXR5IHx8IG9wdGlvbnMubWluV2lkdGggPiAwIHx8IG9wdGlvbnMubWluSGVpZ2h0ID4gMCkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZpbGU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgcmVzdWx0Lmxhc3RNb2RpZmllZCA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgcmVzdWx0Lmxhc3RNb2RpZmllZERhdGUgPSBkYXRlO1xuICAgICAgICAgICAgcmVzdWx0Lm5hbWUgPSBmaWxlLm5hbWU7XG5cbiAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIGV4dGVuc2lvbiB0byBtYXRjaCBpdHMgdHlwZVxuICAgICAgICAgICAgaWYgKHJlc3VsdC5uYW1lICYmIHJlc3VsdC50eXBlICE9PSBmaWxlLnR5cGUpIHtcbiAgICAgICAgICAgICAgcmVzdWx0Lm5hbWUgPSByZXN1bHQubmFtZS5yZXBsYWNlKFJFR0VYUF9FWFRFTlNJT04sIGltYWdlVHlwZVRvRXh0ZW5zaW9uKHJlc3VsdC50eXBlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJldHVybnMgb3JpZ2luYWwgZmlsZSBpZiB0aGUgcmVzdWx0IGlzIG51bGwgaW4gc29tZSBjYXNlcy5cbiAgICAgICAgICByZXN1bHQgPSBmaWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMucmVzdWx0ID0gcmVzdWx0O1xuXG4gICAgICAgIGlmIChvcHRpb25zLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5lcnJvcihlcnIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBJbWFnZUNvbXByZXNzb3I7XG59KCk7XG5cbnJldHVybiBJbWFnZUNvbXByZXNzb3I7XG5cbn0pKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AeGtlc2hpL2ltYWdlLWNvbXByZXNzb3IvZGlzdC9pbWFnZS1jb21wcmVzc29yLmpzXG4vLyBtb2R1bGUgaWQgPSA3NjJcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiIsIi8qIVxuICogTmFtZTogdnVlLXVwbG9hZC1jb21wb25lbnRcbiAqIFZlcnNpb246IDIuNi4zXG4gKiBBdXRob3I6IExpYW5ZdWVcbiAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLlZ1ZVVwbG9hZENvbXBvbmVudCA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgICAgICBjc3MgPSBcIlwiO3N0eWxlLnR5cGUgPSAndGV4dC9jc3MnO2lmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxufSkoKTtcblxudmFyIElucHV0RmlsZSA9IHsgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF92bSA9IHRoaXM7dmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaDtyZXR1cm4gX2MoJ2lucHV0JywgeyBhdHRyczogeyBcInR5cGVcIjogXCJmaWxlXCIsIFwibmFtZVwiOiBfdm0uJHBhcmVudC5uYW1lLCBcImlkXCI6IF92bS4kcGFyZW50LmlucHV0SWQgfHwgX3ZtLiRwYXJlbnQubmFtZSwgXCJhY2NlcHRcIjogX3ZtLiRwYXJlbnQuYWNjZXB0LCBcIndlYmtpdGRpcmVjdG9yeVwiOiBfdm0uJHBhcmVudC5kaXJlY3RvcnkgJiYgX3ZtLiRwYXJlbnQuZmVhdHVyZXMuZGlyZWN0b3J5LCBcImRpcmVjdG9yeVwiOiBfdm0uJHBhcmVudC5kaXJlY3RvcnkgJiYgX3ZtLiRwYXJlbnQuZmVhdHVyZXMuZGlyZWN0b3J5LCBcIm11bHRpcGxlXCI6IF92bS4kcGFyZW50Lm11bHRpcGxlICYmIF92bS4kcGFyZW50LmZlYXR1cmVzLmh0bWw1IH0sIG9uOiB7IFwiY2hhbmdlXCI6IF92bS5jaGFuZ2UgfSB9KTtcbiAgfSwgc3RhdGljUmVuZGVyRm5zOiBbXSxcbiAgbWV0aG9kczoge1xuICAgIGNoYW5nZTogZnVuY3Rpb24gY2hhbmdlKGUpIHtcbiAgICAgIHRoaXMuJGRlc3Ryb3koKTtcbiAgICAgIHRoaXMuJHBhcmVudC5hZGRJbnB1dEZpbGUoZS50YXJnZXQpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7XG4gICAgICAgIHBhcmVudDogdGhpcy4kcGFyZW50LFxuICAgICAgICBlbDogdGhpcy4kZWxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgICAgICBjc3MgPSBcIiAuZmlsZS11cGxvYWRzIHsgb3ZlcmZsb3c6IGhpZGRlbjsgcG9zaXRpb246IHJlbGF0aXZlOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgfSAuZmlsZS11cGxvYWRzLmZpbGUtdXBsb2Fkcy1odG1sNCBpbnB1dFt0eXBlPVxcXCJmaWxlXFxcIl0geyBvcGFjaXR5OiAwOyBmb250LXNpemU6IDIwZW07IHotaW5kZXg6IDE7IHRvcDogMDsgbGVmdDogMDsgcmlnaHQ6IDA7IGJvdHRvbTogMDsgcG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB9IC5maWxlLXVwbG9hZHMuZmlsZS11cGxvYWRzLWh0bWw1IGlucHV0W3R5cGU9XFxcImZpbGVcXFwiXSB7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiBmaXhlZDsgd2lkdGg6IDFweDsgaGVpZ2h0OiAxcHg7IHotaW5kZXg6IC0xOyBvcGFjaXR5OiAwOyB9IFwiO3N0eWxlLnR5cGUgPSAndGV4dC9jc3MnO2lmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxufSkoKTtcblxudmFyIEZpbGVVcGxvYWQgPSB7IHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdm0gPSB0aGlzO3ZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2g7cmV0dXJuIF9jKCdsYWJlbCcsIHsgY2xhc3M6IF92bS5jbGFzc05hbWUgfSwgW192bS5fdChcImRlZmF1bHRcIiksIF92bS5fdihcIiBcIiksIF9jKCdpbnB1dC1maWxlJyldLCAyKTtcbiAgfSwgc3RhdGljUmVuZGVyRm5zOiBbXSxcbiAgY29tcG9uZW50czoge1xuICAgIElucHV0RmlsZTogSW5wdXRGaWxlXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgaW5wdXRJZDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcblxuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdmaWxlJ1xuICAgIH0sXG5cbiAgICBhY2NlcHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG5cbiAgICBtdWx0aXBsZToge1xuICAgICAgdHlwZTogQm9vbGVhblxuICAgIH0sXG5cbiAgICBhZGRJbmRleDoge1xuICAgICAgdHlwZTogW0Jvb2xlYW4sIE51bWJlcl1cbiAgICB9LFxuXG4gICAgZGlyZWN0b3J5OiB7XG4gICAgICB0eXBlOiBCb29sZWFuXG4gICAgfSxcblxuICAgIHBvc3RBY3Rpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG5cbiAgICBwdXRBY3Rpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG5cbiAgICBoZWFkZXJzOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICBkZWZhdWx0OiBPYmplY3RcbiAgICB9LFxuXG4gICAgZGF0YToge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgZGVmYXVsdDogT2JqZWN0XG4gICAgfSxcblxuICAgIHRpbWVvdXQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgZHJvcDoge1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuXG4gICAgZHJvcERpcmVjdG9yeToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuXG4gICAgc2l6ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBleHRlbnNpb25zOiB7XG4gICAgICBkZWZhdWx0OiBBcnJheVxuICAgIH0sXG5cbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiBBcnJheVxuICAgIH0sXG5cbiAgICB0aHJlYWQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDFcbiAgICB9XG4gIH0sXG5cbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZXM6IHRoaXMudmFsdWUsXG4gICAgICBmZWF0dXJlczoge1xuICAgICAgICBodG1sNTogdHJ1ZSxcbiAgICAgICAgZGlyZWN0b3J5OiBmYWxzZSxcbiAgICAgICAgZHJhZzogZmFsc2VcbiAgICAgIH0sXG5cbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICBkcm9wQWN0aXZlOiBmYWxzZSxcblxuICAgICAgdXBsb2FkaW5nOiAwLFxuXG4gICAgICBkZXN0cm95OiBmYWxzZVxuICAgIH07XG4gIH0sXG5cblxuICAvKipcbiAgICogbW91bnRlZFxuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC50eXBlID0gJ2ZpbGUnO1xuICAgIGlucHV0Lm11bHRpcGxlID0gdHJ1ZTtcblxuICAgIC8vIGh0bWw1IOeJueW+gVxuICAgIGlmICh3aW5kb3cuRm9ybURhdGEgJiYgaW5wdXQuZmlsZXMpIHtcbiAgICAgIC8vIOS4iuS8oOebruW9leeJueW+gVxuICAgICAgaWYgKHR5cGVvZiBpbnB1dC53ZWJraXRkaXJlY3RvcnkgPT09ICdib29sZWFuJyB8fCB0eXBlb2YgaW5wdXQuZGlyZWN0b3J5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5mZWF0dXJlcy5kaXJlY3RvcnkgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyDmi5bmi73nibnlvoFcbiAgICAgIGlmICh0aGlzLmZlYXR1cmVzLmh0bWw1ICYmIHR5cGVvZiBpbnB1dC5vbmRyb3AgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuZmVhdHVyZXMuZHJvcCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmVhdHVyZXMuaHRtbDUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBmaWxlcyDlrprkvY3nvJPlrZhcbiAgICB0aGlzLm1hcHMgPSB7fTtcblxuICAgIHRoaXMuJG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8g5pu05paw5LiL54i257qnXG4gICAgICBpZiAodGhpcy4kcGFyZW50KSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC4kZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cblxuICAgICAgLy8g5ouW5ou95riy5p+TXG4gICAgICB0aGlzLndhdGNoRHJvcCh0aGlzLmRyb3ApO1xuICAgIH0pO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIGJlZm9yZURlc3Ryb3lcbiAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBiZWZvcmVEZXN0cm95OiBmdW5jdGlvbiBiZWZvcmVEZXN0cm95KCkge1xuICAgIC8vIOW3sumUgOavgVxuICAgIHRoaXMuZGVzdHJveSA9IHRydWU7XG5cbiAgICAvLyDorr7nva7miJDkuI3mv4DmtLtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9LFxuXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICAvKipcbiAgICAgKiB1cGxvYWRpbmcg5q2j5Zyo5LiK5Lyg55qE57q/56iLXG4gICAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiB1cGxvYWRlZCDmlofku7bliJfooajmmK/lkKblhajpg6jlt7LkuIrkvKBcbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICB1cGxvYWRlZDogZnVuY3Rpb24gdXBsb2FkZWQoKSB7XG4gICAgICB2YXIgZmlsZSA9IHZvaWQgMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmaWxlID0gdGhpcy5maWxlc1tpXTtcbiAgICAgICAgaWYgKGZpbGUuZmlsZU9iamVjdCAmJiAhZmlsZS5lcnJvciAmJiAhZmlsZS5zdWNjZXNzKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGNsYXNzTmFtZTogZnVuY3Rpb24gY2xhc3NOYW1lKCkge1xuICAgICAgcmV0dXJuIFsnZmlsZS11cGxvYWRzJywgdGhpcy5mZWF0dXJlcy5odG1sNSA/ICdmaWxlLXVwbG9hZHMtaHRtbDUnIDogJ2ZpbGUtdXBsb2Fkcy1odG1sNCcsIHRoaXMuZmVhdHVyZXMuZGlyZWN0b3J5ICYmIHRoaXMuZGlyZWN0b3J5ID8gJ2ZpbGUtdXBsb2Fkcy1kaXJlY3RvcnknIDogdW5kZWZpbmVkLCB0aGlzLmZlYXR1cmVzLmRyb3AgJiYgdGhpcy5kcm9wID8gJ2ZpbGUtdXBsb2Fkcy1kcm9wJyA6IHVuZGVmaW5lZF07XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgYWN0aXZlOiBmdW5jdGlvbiBhY3RpdmUoX2FjdGl2ZSkge1xuICAgICAgdGhpcy53YXRjaEFjdGl2ZShfYWN0aXZlKTtcbiAgICB9LFxuICAgIGRyb3BBY3RpdmU6IGZ1bmN0aW9uIGRyb3BBY3RpdmUoKSB7XG4gICAgICBpZiAodGhpcy4kcGFyZW50KSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC4kZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRyb3A6IGZ1bmN0aW9uIGRyb3AodmFsdWUpIHtcbiAgICAgIHRoaXMud2F0Y2hEcm9wKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShmaWxlcykge1xuICAgICAgaWYgKHRoaXMuZmlsZXMgPT09IGZpbGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsZXMgPSBmaWxlcztcblxuICAgICAgdmFyIG9sZE1hcHMgPSB0aGlzLm1hcHM7XG5cbiAgICAgIC8vIOmHjeWGmSBtYXBzIOe8k+WtmFxuICAgICAgdGhpcy5tYXBzID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZpbGUgPSB0aGlzLmZpbGVzW2ldO1xuICAgICAgICB0aGlzLm1hcHNbZmlsZS5pZF0gPSBmaWxlO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGQsIHVwZGF0ZVxuICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMubWFwcykge1xuICAgICAgICB2YXIgbmV3RmlsZSA9IHRoaXMubWFwc1trZXldO1xuICAgICAgICB2YXIgb2xkRmlsZSA9IG9sZE1hcHNba2V5XTtcbiAgICAgICAgaWYgKG5ld0ZpbGUgIT09IG9sZEZpbGUpIHtcbiAgICAgICAgICB0aGlzLmVtaXRGaWxlKG5ld0ZpbGUsIG9sZEZpbGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGRlbGV0ZVxuICAgICAgZm9yICh2YXIgX2tleSBpbiBvbGRNYXBzKSB7XG4gICAgICAgIGlmICghdGhpcy5tYXBzW19rZXldKSB7XG4gICAgICAgICAgdGhpcy5lbWl0RmlsZSh1bmRlZmluZWQsIG9sZE1hcHNbX2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcblxuICAgIC8vIOa4heepulxuICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIGlmICh0aGlzLmZpbGVzLmxlbmd0aCkge1xuICAgICAgICB2YXIgZmlsZXMgPSB0aGlzLmZpbGVzO1xuICAgICAgICB0aGlzLmZpbGVzID0gW107XG5cbiAgICAgICAgLy8g5a6a5L2NXG4gICAgICAgIHRoaXMubWFwcyA9IHt9O1xuXG4gICAgICAgIC8vIOS6i+S7tlxuICAgICAgICB0aGlzLmVtaXRJbnB1dCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5lbWl0RmlsZSh1bmRlZmluZWQsIGZpbGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuXG4gICAgLy8g6YCJ5oupXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoaWQpIHtcbiAgICAgIGlmICghaWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHR5cGVvZiBpZCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoaWQpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpZC5pZF0gfHwgZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLm1hcHNbaWRdIHx8IGZhbHNlO1xuICAgIH0sXG5cblxuICAgIC8vIOa3u+WKoFxuICAgIGFkZDogZnVuY3Rpb24gYWRkKF9maWxlcykge1xuICAgICAgdmFyIGluZGV4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB0aGlzLmFkZEluZGV4O1xuXG4gICAgICB2YXIgZmlsZXMgPSBfZmlsZXM7XG4gICAgICB2YXIgaXNBcnJheSA9IGZpbGVzIGluc3RhbmNlb2YgQXJyYXk7XG5cbiAgICAgIC8vIOS4jeaYr+aVsOe7hOaVtOeQhuaIkOaVsOe7hFxuICAgICAgaWYgKCFpc0FycmF5KSB7XG4gICAgICAgIGZpbGVzID0gW2ZpbGVzXTtcbiAgICAgIH1cblxuICAgICAgLy8g6YGN5Y6G6KeE6IyD5a+56LGhXG4gICAgICB2YXIgYWRkRmlsZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZpbGUgPSBmaWxlc1tpXTtcbiAgICAgICAgaWYgKHRoaXMuZmVhdHVyZXMuaHRtbDUgJiYgZmlsZSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICBmaWxlID0ge1xuICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgIHNpemU6IGZpbGUuc2l6ZSxcbiAgICAgICAgICAgIG5hbWU6IGZpbGUud2Via2l0UmVsYXRpdmVQYXRoIHx8IGZpbGUucmVsYXRpdmVQYXRoIHx8IGZpbGUubmFtZSB8fCAndW5rbm93bicsXG4gICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaWxlT2JqZWN0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmaWxlLmZpbGVPYmplY3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgLy8gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlLmZpbGVPYmplY3QpIHtcbiAgICAgICAgICBmaWxlT2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZS5lbCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgICAgICBmaWxlT2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZS5maWxlIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgIGZpbGVPYmplY3QgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWxlT2JqZWN0KSB7XG4gICAgICAgICAgZmlsZSA9IF9leHRlbmRzKHtcbiAgICAgICAgICAgIGZpbGVPYmplY3Q6IHRydWUsXG4gICAgICAgICAgICBzaXplOiAtMSxcbiAgICAgICAgICAgIG5hbWU6ICdGaWxlbmFtZScsXG4gICAgICAgICAgICB0eXBlOiAnJyxcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogJycsXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIHB1dEFjdGlvbjogdGhpcy5wdXRBY3Rpb24sXG4gICAgICAgICAgICBwb3N0QWN0aW9uOiB0aGlzLnBvc3RBY3Rpb24sXG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXRcbiAgICAgICAgICB9LCBmaWxlLCB7XG4gICAgICAgICAgICByZXNwb25zZToge30sXG5cbiAgICAgICAgICAgIHByb2dyZXNzOiAnMC4wMCcsIC8vIOWPquivu1xuICAgICAgICAgICAgc3BlZWQ6IDAgLy8g5Y+q6K+7XG4gICAgICAgICAgICAvLyB4aHI6IGZhbHNlLCAgICAgICAgICAgICAgICAvLyDlj6ror7tcbiAgICAgICAgICAgIC8vIGlmcmFtZTogZmFsc2UsICAgICAgICAgICAgIC8vIOWPquivu1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZmlsZS5kYXRhID0gX2V4dGVuZHMoe30sIHRoaXMuZGF0YSwgZmlsZS5kYXRhID8gZmlsZS5kYXRhIDoge30pO1xuXG4gICAgICAgICAgZmlsZS5oZWFkZXJzID0gX2V4dGVuZHMoe30sIHRoaXMuaGVhZGVycywgZmlsZS5oZWFkZXJzID8gZmlsZS5oZWFkZXJzIDoge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5b+F6aG75YyF5ZCrIGlkXG4gICAgICAgIGlmICghZmlsZS5pZCkge1xuICAgICAgICAgIGZpbGUuaWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lbWl0RmlsdGVyKGZpbGUsIHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEZpbGVzLnB1c2goZmlsZSk7XG5cbiAgICAgICAgLy8g5Y+q5YWB6K645Y2V5Liq5paH5Lu2XG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIOayoeacieaWh+S7tlxuICAgICAgaWYgKCFhZGRGaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyDlj6rlhYHorrjljZXkuKrmlofku7Yg5Yig6Zmk5omA5pyJXG4gICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgfVxuXG4gICAgICAvLyDmt7vliqDov5vljrsgZmlsZXNcbiAgICAgIHZhciBuZXdGaWxlcyA9IHZvaWQgMDtcbiAgICAgIGlmIChpbmRleCA9PT0gdHJ1ZSB8fCBpbmRleCA9PT0gMCkge1xuICAgICAgICBuZXdGaWxlcyA9IGFkZEZpbGVzLmNvbmNhdCh0aGlzLmZpbGVzKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXgpIHtcbiAgICAgICAgbmV3RmlsZXMgPSBhZGRGaWxlcy5jb25jYXQoW10pO1xuICAgICAgICBuZXdGaWxlcy5zcGxpY2UoaW5kZXgsIDAsIGFkZEZpbGVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0ZpbGVzID0gdGhpcy5maWxlcy5jb25jYXQoYWRkRmlsZXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpbGVzID0gbmV3RmlsZXM7XG5cbiAgICAgIC8vIOWumuS9jVxuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFkZEZpbGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgX2ZpbGUyID0gYWRkRmlsZXNbX2ldO1xuICAgICAgICB0aGlzLm1hcHNbX2ZpbGUyLmlkXSA9IF9maWxlMjtcbiAgICAgIH1cblxuICAgICAgLy8g5LqL5Lu2XG4gICAgICB0aGlzLmVtaXRJbnB1dCgpO1xuICAgICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgYWRkRmlsZXMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgICB0aGlzLmVtaXRGaWxlKGFkZEZpbGVzW19pMl0sIHVuZGVmaW5lZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpc0FycmF5ID8gYWRkRmlsZXMgOiBhZGRGaWxlc1swXTtcbiAgICB9LFxuXG5cbiAgICAvLyDmt7vliqDooajljZXmlofku7ZcbiAgICBhZGRJbnB1dEZpbGU6IGZ1bmN0aW9uIGFkZElucHV0RmlsZShlbCkge1xuICAgICAgdmFyIGZpbGVzID0gW107XG4gICAgICBpZiAoZWwuZmlsZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBmaWxlID0gZWwuZmlsZXNbaV07XG4gICAgICAgICAgZmlsZXMucHVzaCh7XG4gICAgICAgICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICAgICAgICBuYW1lOiBmaWxlLndlYmtpdFJlbGF0aXZlUGF0aCB8fCBmaWxlLnJlbGF0aXZlUGF0aCB8fCBmaWxlLm5hbWUsXG4gICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGUsXG4gICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgZWw6IGVsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbGVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGVsLnZhbHVlLnJlcGxhY2UoL14uKj8oW15cXC9cXFxcXFxyXFxuXSspJC8sICckMScpLFxuICAgICAgICAgIGVsOiBlbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFkZChmaWxlcyk7XG4gICAgfSxcblxuXG4gICAgLy8g5re75YqgIERhdGFUcmFuc2ZlclxuICAgIGFkZERhdGFUcmFuc2ZlcjogZnVuY3Rpb24gYWRkRGF0YVRyYW5zZmVyKGRhdGFUcmFuc2Zlcikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIGZpbGVzID0gW107XG4gICAgICBpZiAoZGF0YVRyYW5zZmVyLml0ZW1zICYmIGRhdGFUcmFuc2Zlci5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVRyYW5zZmVyLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhVHJhbnNmZXIuaXRlbXNbaV07XG4gICAgICAgICAgaWYgKGl0ZW0uZ2V0QXNFbnRyeSkge1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0uZ2V0QXNFbnRyeSgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS53ZWJraXRHZXRBc0VudHJ5KSB7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS53ZWJraXRHZXRBc0VudHJ5KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLmdldEFzRmlsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHZhciBmb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgLy8g57uT5p2fIOaIluiAheW3suacieaWh+S7tuS6hlxuICAgICAgICAgICAgaWYgKCFpdGVtIHx8ICFfdGhpcy5tdWx0aXBsZSAmJiBmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuYWRkKGZpbGVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5nZXRFbnRyeShpdGVtKS50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgIGZpbGVzLnB1c2guYXBwbHkoZmlsZXMsIF90b0NvbnN1bWFibGVBcnJheShyZXN1bHRzKSk7XG4gICAgICAgICAgICAgIGZvckVhY2goaSArIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmb3JFYWNoKDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aDsgX2kzKyspIHtcbiAgICAgICAgICBmaWxlcy5wdXNoKGRhdGFUcmFuc2Zlci5maWxlc1tfaTNdKTtcbiAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuYWRkKGZpbGVzKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgIH0sXG5cblxuICAgIC8vIOiOt+W+lyBlbnRyeVxuICAgIGdldEVudHJ5OiBmdW5jdGlvbiBnZXRFbnRyeShlbnRyeSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBwYXRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnJztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKGVudHJ5LmlzRmlsZSkge1xuICAgICAgICAgIGVudHJ5LmZpbGUoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICAgIHJlc29sdmUoW3tcbiAgICAgICAgICAgICAgc2l6ZTogZmlsZS5zaXplLFxuICAgICAgICAgICAgICBuYW1lOiBwYXRoICsgZmlsZS5uYW1lLFxuICAgICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGUsXG4gICAgICAgICAgICAgIGZpbGU6IGZpbGVcbiAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChlbnRyeS5pc0RpcmVjdG9yeSAmJiBfdGhpczIuZHJvcERpcmVjdG9yeSkge1xuICAgICAgICAgIGVudHJ5LmNyZWF0ZVJlYWRlcigpLnJlYWRFbnRyaWVzKGZ1bmN0aW9uIChlbnRyaWVzKSB7XG4gICAgICAgICAgICB2YXIgZmlsZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBmb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChpKSB7XG4gICAgICAgICAgICAgIGlmICghZW50cmllc1tpXSB8fCBmaWxlcy5sZW5ndGggJiYgIV90aGlzMi5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGZpbGVzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBfdGhpczIuZ2V0RW50cnkoZW50cmllc1tpXSwgcGF0aCArIGVudHJ5Lm5hbWUgKyAnLycpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBmaWxlcy5wdXNoLmFwcGx5KGZpbGVzLCBfdG9Db25zdW1hYmxlQXJyYXkocmVzdWx0cykpO1xuICAgICAgICAgICAgICAgIGZvckVhY2goaSArIDEpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3JFYWNoKDApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoaWQxLCBpZDIpIHtcbiAgICAgIHZhciBmaWxlMSA9IHRoaXMuZ2V0KGlkMSk7XG4gICAgICB2YXIgZmlsZTIgPSB0aGlzLmdldChpZDIpO1xuICAgICAgaWYgKCFmaWxlMSB8fCAhZmlsZTIgfHwgZmlsZTEgPT09IGZpbGUyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBmaWxlcyA9IHRoaXMuZmlsZXMuY29uY2F0KFtdKTtcbiAgICAgIHZhciBpbmRleDEgPSBmaWxlcy5pbmRleE9mKGZpbGUxKTtcbiAgICAgIHZhciBpbmRleDIgPSBmaWxlcy5pbmRleE9mKGZpbGUyKTtcbiAgICAgIGlmIChpbmRleDEgPT09IC0xIHx8IGluZGV4MiA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZmlsZXNbaW5kZXgxXSA9IGZpbGUyO1xuICAgICAgZmlsZXNbaW5kZXgyXSA9IGZpbGUxO1xuICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuICAgICAgdGhpcy5lbWl0SW5wdXQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cblxuICAgIC8vIOenu+mZpFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGlkKSB7XG4gICAgICB2YXIgZmlsZSA9IHRoaXMuZ2V0KGlkKTtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgIGlmICh0aGlzLmVtaXRGaWx0ZXIodW5kZWZpbmVkLCBmaWxlKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlsZXMgPSB0aGlzLmZpbGVzLmNvbmNhdChbXSk7XG4gICAgICAgIHZhciBpbmRleCA9IGZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdyZW1vdmUnLCBmaWxlKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuXG4gICAgICAgIC8vIOWumuS9jVxuICAgICAgICBkZWxldGUgdGhpcy5tYXBzW2ZpbGUuaWRdO1xuXG4gICAgICAgIC8vIOS6i+S7tlxuICAgICAgICB0aGlzLmVtaXRJbnB1dCgpO1xuICAgICAgICB0aGlzLmVtaXRGaWxlKHVuZGVmaW5lZCwgZmlsZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlsZTtcbiAgICB9LFxuXG5cbiAgICAvLyDmm7TmlrBcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShpZCwgZGF0YSkge1xuICAgICAgdmFyIGZpbGUgPSB0aGlzLmdldChpZCk7XG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICB2YXIgbmV3RmlsZSA9IF9leHRlbmRzKHt9LCBmaWxlLCBkYXRhKTtcbiAgICAgICAgLy8g5YGc55So5b+F6aG75Yqg5LiK6ZSZ6K+vXG4gICAgICAgIGlmIChmaWxlLmZpbGVPYmplY3QgJiYgZmlsZS5hY3RpdmUgJiYgIW5ld0ZpbGUuYWN0aXZlICYmICFuZXdGaWxlLmVycm9yICYmICFuZXdGaWxlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBuZXdGaWxlLmVycm9yID0gJ2Fib3J0JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVtaXRGaWx0ZXIobmV3RmlsZSwgZmlsZSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlsZXMgPSB0aGlzLmZpbGVzLmNvbmNhdChbXSk7XG4gICAgICAgIHZhciBpbmRleCA9IGZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCd1cGRhdGUnLCBmaWxlKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZmlsZXMuc3BsaWNlKGluZGV4LCAxLCBuZXdGaWxlKTtcbiAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuXG4gICAgICAgIC8vIOWIoOmZpCAg5pen5a6a5L2NIOWGmeWFpSDmlrDlrprkvY0g77yI5bey5L6/5pSv5oyB5L+u5pS5aWQpXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1hcHNbZmlsZS5pZF07XG4gICAgICAgIHRoaXMubWFwc1tuZXdGaWxlLmlkXSA9IG5ld0ZpbGU7XG5cbiAgICAgICAgLy8g5LqL5Lu2XG4gICAgICAgIHRoaXMuZW1pdElucHV0KCk7XG4gICAgICAgIHRoaXMuZW1pdEZpbGUobmV3RmlsZSwgZmlsZSk7XG4gICAgICAgIHJldHVybiBuZXdGaWxlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cblxuICAgIC8vIOmihOWkhOeQhiDkuovku7Yg6L+H5ruk5ZmoXG4gICAgZW1pdEZpbHRlcjogZnVuY3Rpb24gZW1pdEZpbHRlcihuZXdGaWxlLCBvbGRGaWxlKSB7XG4gICAgICB2YXIgaXNQcmV2ZW50ID0gZmFsc2U7XG4gICAgICB0aGlzLiRlbWl0KCdpbnB1dC1maWx0ZXInLCBuZXdGaWxlLCBvbGRGaWxlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlzUHJldmVudCA9IHRydWU7XG4gICAgICAgIHJldHVybiBpc1ByZXZlbnQ7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBpc1ByZXZlbnQ7XG4gICAgfSxcblxuXG4gICAgLy8g5aSE55CG5ZCOIOS6i+S7tiDliIblj5FcbiAgICBlbWl0RmlsZTogZnVuY3Rpb24gZW1pdEZpbGUobmV3RmlsZSwgb2xkRmlsZSkge1xuICAgICAgdGhpcy4kZW1pdCgnaW5wdXQtZmlsZScsIG5ld0ZpbGUsIG9sZEZpbGUpO1xuICAgICAgaWYgKG5ld0ZpbGUgJiYgbmV3RmlsZS5maWxlT2JqZWN0ICYmIG5ld0ZpbGUuYWN0aXZlICYmICghb2xkRmlsZSB8fCAhb2xkRmlsZS5hY3RpdmUpKSB7XG4gICAgICAgIHRoaXMudXBsb2FkaW5nKys7XG4gICAgICAgIC8vIOa/gOa0u1xuICAgICAgICB0aGlzLiRuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzMy51cGxvYWQobmV3RmlsZSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgICBuZXdGaWxlID0gX3RoaXMzLmdldChuZXdGaWxlKTtcbiAgICAgICAgICAgICAgaWYgKG5ld0ZpbGUgJiYgbmV3RmlsZS5maWxlT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMzLnVwZGF0ZShuZXdGaWxlLCB7XG4gICAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgc3VjY2VzczogIW5ld0ZpbGUuZXJyb3JcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgX3RoaXMzLnVwZGF0ZShuZXdGaWxlLCB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZS5jb2RlIHx8IGUuZXJyb3IgfHwgZS5tZXNzYWdlIHx8IGVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCBwYXJzZUludChNYXRoLnJhbmRvbSgpICogNTAgKyA1MCwgMTApKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKCghbmV3RmlsZSB8fCAhbmV3RmlsZS5maWxlT2JqZWN0IHx8ICFuZXdGaWxlLmFjdGl2ZSkgJiYgb2xkRmlsZSAmJiBvbGRGaWxlLmZpbGVPYmplY3QgJiYgb2xkRmlsZS5hY3RpdmUpIHtcbiAgICAgICAgLy8g5YGc5q2iXG4gICAgICAgIHRoaXMudXBsb2FkaW5nLS07XG4gICAgICB9XG5cbiAgICAgIC8vIOiHquWKqOW7tue7rea/gOa0u1xuICAgICAgaWYgKHRoaXMuYWN0aXZlICYmIChCb29sZWFuKG5ld0ZpbGUpICE9PSBCb29sZWFuKG9sZEZpbGUpIHx8IG5ld0ZpbGUuYWN0aXZlICE9PSBvbGRGaWxlLmFjdGl2ZSkpIHtcbiAgICAgICAgdGhpcy53YXRjaEFjdGl2ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVtaXRJbnB1dDogZnVuY3Rpb24gZW1pdElucHV0KCkge1xuICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB0aGlzLmZpbGVzKTtcbiAgICB9LFxuXG5cbiAgICAvLyDkuIrkvKBcbiAgICB1cGxvYWQ6IGZ1bmN0aW9uIHVwbG9hZChpZCkge1xuICAgICAgdmFyIGZpbGUgPSB0aGlzLmdldChpZCk7XG5cbiAgICAgIC8vIOiiq+WIoOmZpFxuICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnbm90X2V4aXN0cycpO1xuICAgICAgfVxuXG4gICAgICAvLyDkuI3mmK/mlofku7blr7nosaFcbiAgICAgIGlmICghZmlsZS5maWxlT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnZmlsZV9vYmplY3QnKTtcbiAgICAgIH1cblxuICAgICAgLy8g5pyJ6ZSZ6K+v55u05o6l5ZON5bqUXG4gICAgICBpZiAoZmlsZS5lcnJvcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZmlsZS5lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIC8vIOW3suWujOaIkOebtOaOpeWTjeW6lFxuICAgICAgaWYgKGZpbGUuc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZpbGUpO1xuICAgICAgfVxuXG4gICAgICAvLyDlkI7nvIBcbiAgICAgIHZhciBleHRlbnNpb25zID0gdGhpcy5leHRlbnNpb25zO1xuICAgICAgaWYgKGV4dGVuc2lvbnMgJiYgKGV4dGVuc2lvbnMubGVuZ3RoIHx8IHR5cGVvZiBleHRlbnNpb25zLmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgIGlmICgodHlwZW9mIGV4dGVuc2lvbnMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGV4dGVuc2lvbnMpKSAhPT0gJ29iamVjdCcgfHwgIShleHRlbnNpb25zIGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgZXh0ZW5zaW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnMgPSBleHRlbnNpb25zLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXh0ZW5zaW9ucyA9IG5ldyBSZWdFeHAoJ1xcXFwuKCcgKyBleHRlbnNpb25zLmpvaW4oJ3wnKS5yZXBsYWNlKC9cXC4vZywgJ1xcXFwuJykgKyAnKSQnLCAnaScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWxlLm5hbWUuc2VhcmNoKGV4dGVuc2lvbnMpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnZXh0ZW5zaW9uJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8g5aSn5bCPXG4gICAgICBpZiAodGhpcy5zaXplID4gMCAmJiBmaWxlLnNpemUgPj0gMCAmJiBmaWxlLnNpemUgPiB0aGlzLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdzaXplJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmZlYXR1cmVzLmh0bWw1ICYmIGZpbGUucHV0QWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZFB1dChmaWxlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5mZWF0dXJlcy5odG1sNSkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRIdG1sNShmaWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZEh0bWw0KGZpbGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXBsb2FkUHV0OiBmdW5jdGlvbiB1cGxvYWRQdXQoZmlsZSkge1xuICAgICAgdmFyIHF1ZXJ5cyA9IFtdO1xuICAgICAgdmFyIHZhbHVlID0gdm9pZCAwO1xuICAgICAgZm9yICh2YXIga2V5IGluIGZpbGUuZGF0YSkge1xuICAgICAgICB2YWx1ZSA9IGZpbGUuZGF0YVtrZXldO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHF1ZXJ5cy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBxdWVyeVN0cmluZyA9IHF1ZXJ5cy5sZW5ndGggPyAoZmlsZS5wdXRBY3Rpb24uaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBxdWVyeXMuam9pbignJicpIDogJyc7XG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignUFVUJywgZmlsZS5wdXRBY3Rpb24gKyBxdWVyeVN0cmluZyk7XG4gICAgICByZXR1cm4gdGhpcy51cGxvYWRYaHIoeGhyLCBmaWxlLCBmaWxlLmZpbGUpO1xuICAgIH0sXG4gICAgdXBsb2FkSHRtbDU6IGZ1bmN0aW9uIHVwbG9hZEh0bWw1KGZpbGUpIHtcbiAgICAgIHZhciBmb3JtID0gbmV3IHdpbmRvdy5Gb3JtRGF0YSgpO1xuICAgICAgdmFyIHZhbHVlID0gdm9pZCAwO1xuICAgICAgZm9yICh2YXIga2V5IGluIGZpbGUuZGF0YSkge1xuICAgICAgICB2YWx1ZSA9IGZpbGUuZGF0YVtrZXldO1xuICAgICAgICBpZiAodmFsdWUgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgICAgICAgZm9ybS5hcHBlbmQoa2V5LCB2YWx1ZSwgdmFsdWUubmFtZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZvcm0uYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3JtLmFwcGVuZCh0aGlzLm5hbWUsIGZpbGUuZmlsZSwgZmlsZS5maWxlLmZpbGVuYW1lIHx8IGZpbGUubmFtZSk7XG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignUE9TVCcsIGZpbGUucG9zdEFjdGlvbik7XG4gICAgICByZXR1cm4gdGhpcy51cGxvYWRYaHIoeGhyLCBmaWxlLCBmb3JtKTtcbiAgICB9LFxuICAgIHVwbG9hZFhocjogZnVuY3Rpb24gdXBsb2FkWGhyKHhociwgX2ZpbGUsIGJvZHkpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgZmlsZSA9IF9maWxlO1xuICAgICAgdmFyIHNwZWVkVGltZSA9IDA7XG4gICAgICB2YXIgc3BlZWRMb2FkZWQgPSAwO1xuXG4gICAgICAvLyDov5vluqbmnaFcbiAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIOi/mOacquW8gOWni+S4iuS8oCDlt7LliKDpmaQg5pyq5r+A5rS7XG4gICAgICAgIGZpbGUgPSBfdGhpczQuZ2V0KGZpbGUpO1xuICAgICAgICBpZiAoIWUubGVuZ3RoQ29tcHV0YWJsZSB8fCAhZmlsZSB8fCAhZmlsZS5maWxlT2JqZWN0IHx8ICFmaWxlLmFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOi/m+W6piDpgJ/luqYg5q+P56eS5pu05paw5LiA5qyhXG4gICAgICAgIHZhciBzcGVlZFRpbWUyID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgIGlmIChzcGVlZFRpbWUyID09PSBzcGVlZFRpbWUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3BlZWRUaW1lID0gc3BlZWRUaW1lMjtcblxuICAgICAgICBmaWxlID0gX3RoaXM0LnVwZGF0ZShmaWxlLCB7XG4gICAgICAgICAgcHJvZ3Jlc3M6IChlLmxvYWRlZCAvIGUudG90YWwgKiAxMDApLnRvRml4ZWQoMiksXG4gICAgICAgICAgc3BlZWQ6IGUubG9hZGVkIC0gc3BlZWRMb2FkZWRcbiAgICAgICAgfSk7XG4gICAgICAgIHNwZWVkTG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgICB9O1xuXG4gICAgICAvLyDmo4Dmn6Xmv4DmtLvnirbmgIFcbiAgICAgIHZhciBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZmlsZSA9IF90aGlzNC5nZXQoZmlsZSk7XG4gICAgICAgIGlmIChmaWxlICYmIGZpbGUuZmlsZU9iamVjdCAmJiAhZmlsZS5zdWNjZXNzICYmICFmaWxlLmVycm9yICYmIGZpbGUuYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGludGVydmFsKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgaW50ZXJ2YWwgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgICAgeGhyLnRpbWVvdXQgPSAxO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfSwgMTAwKTtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlID0gdm9pZCAwO1xuICAgICAgICB2YXIgZm4gPSBmdW5jdGlvbiBmbihlKSB7XG4gICAgICAgICAgLy8g5bey57uP5aSE55CG6L+H5LqGXG4gICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgaW50ZXJ2YWwgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmaWxlID0gX3RoaXM0LmdldChmaWxlKTtcblxuICAgICAgICAgIC8vIOS4jeWtmOWcqOebtOaOpeWTjeW6lFxuICAgICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnbm90X2V4aXN0cycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIOS4jeaYr+aWh+S7tuWvueixoVxuICAgICAgICAgIGlmICghZmlsZS5maWxlT2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdmaWxlX29iamVjdCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIOaciemUmeivr+iHquWKqOWTjeW6lFxuICAgICAgICAgIGlmIChmaWxlLmVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGZpbGUuZXJyb3IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIOacqua/gOa0u1xuICAgICAgICAgIGlmICghZmlsZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoJ2Fib3J0Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5bey5a6M5oiQIOebtOaOpeebuOW6lFxuICAgICAgICAgIGlmIChmaWxlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGZpbGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBkYXRhID0ge307XG5cbiAgICAgICAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAndGltZW91dCc6XG4gICAgICAgICAgICBjYXNlICdhYm9ydCc6XG4gICAgICAgICAgICAgIGRhdGEuZXJyb3IgPSBlLnR5cGU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICBpZiAoIXhoci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ25ldHdvcmsnO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdzZXJ2ZXInO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdkZW5pZWQnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdzZXJ2ZXInO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdkZW5pZWQnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEucHJvZ3Jlc3MgPSAnMTAwLjAwJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0KSB7XG4gICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlICYmIGNvbnRlbnRUeXBlLmluZGV4T2YoJy9qc29uJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgIGRhdGEucmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGF0YS5yZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5pu05pawXG4gICAgICAgICAgZmlsZSA9IF90aGlzNC51cGRhdGUoZmlsZSwgZGF0YSk7XG5cbiAgICAgICAgICAvLyDnm7jlupTplJnor69cbiAgICAgICAgICBpZiAoZmlsZS5lcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChmaWxlLmVycm9yKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyDlk43lupRcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShmaWxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyDkuovku7ZcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZuO1xuICAgICAgICB4aHIub25lcnJvciA9IGZuO1xuICAgICAgICB4aHIub25hYm9ydCA9IGZuO1xuICAgICAgICB4aHIub250aW1lb3V0ID0gZm47XG5cbiAgICAgICAgLy8g6LaF5pe2XG4gICAgICAgIGlmIChmaWxlLnRpbWVvdXQpIHtcbiAgICAgICAgICB4aHIudGltZW91dCA9IGZpbGUudGltZW91dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhlYWRlcnNcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGZpbGUuaGVhZGVycykge1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgZmlsZS5oZWFkZXJzW2tleV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5pu05pawIHhoclxuICAgICAgICBmaWxlID0gX3RoaXM0LnVwZGF0ZShmaWxlLCB7IHhocjogeGhyIH0pO1xuXG4gICAgICAgIC8vIOW8gOWni+S4iuS8oFxuICAgICAgICB4aHIuc2VuZChib2R5KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBsb2FkSHRtbDQ6IGZ1bmN0aW9uIHVwbG9hZEh0bWw0KF9maWxlKSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgdmFyIGZpbGUgPSBfZmlsZTtcbiAgICAgIHZhciBvbktleWRvd24gPSBmdW5jdGlvbiBvbktleWRvd24oZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgaWZyYW1lLmlkID0gJ3VwbG9hZC1pZnJhbWUtJyArIGZpbGUuaWQ7XG4gICAgICBpZnJhbWUubmFtZSA9ICd1cGxvYWQtaWZyYW1lLScgKyBmaWxlLmlkO1xuICAgICAgaWZyYW1lLnNyYyA9ICdhYm91dDpibGFuayc7XG4gICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzdHlsZScsICd3aWR0aDoxcHg7aGVpZ2h0OjFweDt0b3A6LTk5OWVtO3Bvc2l0aW9uOmFic29sdXRlOyBtYXJnaW4tdG9wOi05OTllbTsnKTtcblxuICAgICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cbiAgICAgIGZvcm0uYWN0aW9uID0gZmlsZS5wb3N0QWN0aW9uO1xuXG4gICAgICBmb3JtLm5hbWUgPSAndXBsb2FkLWZvcm0tJyArIGZpbGUuaWQ7XG5cbiAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCAnUE9TVCcpO1xuICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICd1cGxvYWQtaWZyYW1lLScgKyBmaWxlLmlkKTtcbiAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdlbmN0eXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKTtcblxuICAgICAgdmFyIHZhbHVlID0gdm9pZCAwO1xuICAgICAgdmFyIGlucHV0ID0gdm9pZCAwO1xuICAgICAgZm9yICh2YXIga2V5IGluIGZpbGUuZGF0YSkge1xuICAgICAgICB2YWx1ZSA9IGZpbGUuZGF0YVtrZXldO1xuICAgICAgICBpZiAodmFsdWUgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgaW5wdXQudHlwZSA9ICdoaWRkZW4nO1xuICAgICAgICAgIGlucHV0Lm5hbWUgPSBrZXk7XG4gICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoZmlsZS5lbCk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgICAgdmFyIGdldFJlc3BvbnNlRGF0YSA9IGZ1bmN0aW9uIGdldFJlc3BvbnNlRGF0YSgpIHtcbiAgICAgICAgdmFyIGRvYyA9IHZvaWQgMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgIGRvYyA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuICAgICAgICBpZiAoIWRvYykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkb2MgPSBpZnJhbWUuY29udGVudERvY3VtZW50ID8gaWZyYW1lLmNvbnRlbnREb2N1bWVudCA6IGlmcmFtZS5kb2N1bWVudDtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGRvYyA9IGlmcmFtZS5kb2N1bWVudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvYyAmJiBkb2MuYm9keSkge1xuICAgICAgICAgIHJldHVybiBkb2MuYm9keS5pbm5lckhUTUw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmaWxlID0gX3RoaXM1LnVwZGF0ZShmaWxlLCB7IGlmcmFtZTogaWZyYW1lIH0pO1xuXG4gICAgICAgICAgLy8g5LiN5a2Y5ZyoXG4gICAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdub3RfZXhpc3RzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5a6a5pe25qOA5p+lXG4gICAgICAgICAgdmFyIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZmlsZSA9IF90aGlzNS5nZXQoZmlsZSk7XG4gICAgICAgICAgICBpZiAoZmlsZSAmJiBmaWxlLmZpbGVPYmplY3QgJiYgIWZpbGUuc3VjY2VzcyAmJiAhZmlsZS5lcnJvciAmJiBmaWxlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgaW50ZXJ2YWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWZyYW1lLm9uYWJvcnQoeyB0eXBlOiBmaWxlID8gJ2Fib3J0JyA6ICdub3RfZXhpc3RzJyB9KTtcbiAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgdmFyIGNvbXBsZXRlID0gdm9pZCAwO1xuICAgICAgICAgIHZhciBmbiA9IGZ1bmN0aW9uIGZuKGUpIHtcbiAgICAgICAgICAgIC8vIOW3sue7j+WkhOeQhui/h+S6hlxuICAgICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBsZXRlID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKGludGVydmFsKSB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICBpbnRlcnZhbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDlhbPpl60gZXNjIOS6i+S7tlxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKTtcblxuICAgICAgICAgICAgZmlsZSA9IF90aGlzNS5nZXQoZmlsZSk7XG5cbiAgICAgICAgICAgIC8vIOS4jeWtmOWcqOebtOaOpeWTjeW6lFxuICAgICAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ25vdF9leGlzdHMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g5LiN5piv5paH5Lu25a+56LGhXG4gICAgICAgICAgICBpZiAoIWZpbGUuZmlsZU9iamVjdCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdmaWxlX29iamVjdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDmnInplJnor6/oh6rliqjlk43lupRcbiAgICAgICAgICAgIGlmIChmaWxlLmVycm9yKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoZmlsZS5lcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIOacqua/gOa0u1xuICAgICAgICAgICAgaWYgKCFmaWxlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdhYm9ydCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDlt7LlrozmiJAg55u05o6l55u45bqUXG4gICAgICAgICAgICBpZiAoZmlsZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGZpbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBnZXRSZXNwb25zZURhdGEoKTtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgICAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgICAgICAgICBjYXNlICdhYm9ydCc6XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdhYm9ydCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9IGZpbGUuZXJyb3I7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICduZXR3b3JrJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9ICdkZW5pZWQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoZmlsZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgZGF0YS5lcnJvciA9IGZpbGUuZXJyb3I7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBkYXRhLmVycm9yID0gJ25ldHdvcmsnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkYXRhLnByb2dyZXNzID0gJzEwMC4wMCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN1YnN0cigwLCAxKSA9PT0gJ3snICYmIHJlc3BvbnNlLnN1YnN0cihyZXNwb25zZS5sZW5ndGggLSAxLCAxKSA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRhdGEucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g5pu05pawXG4gICAgICAgICAgICBmaWxlID0gX3RoaXM1LnVwZGF0ZShmaWxlLCBkYXRhKTtcblxuICAgICAgICAgICAgaWYgKGZpbGUuZXJyb3IpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChmaWxlLmVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g5ZON5bqUXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShmaWxlKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8g5re75Yqg5LqL5Lu2XG4gICAgICAgICAgaWZyYW1lLm9ubG9hZCA9IGZuO1xuICAgICAgICAgIGlmcmFtZS5vbmVycm9yID0gZm47XG4gICAgICAgICAgaWZyYW1lLm9uYWJvcnQgPSBmbjtcblxuICAgICAgICAgIC8vIOemgeatoiBlc2Mg6ZSuXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKTtcblxuICAgICAgICAgIC8vIOaPkOS6pFxuICAgICAgICAgIGZvcm0uc3VibWl0KCk7XG4gICAgICAgIH0sIDUwKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZnJhbWUucGFyZW50Tm9kZSAmJiBpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZnJhbWUucGFyZW50Tm9kZSAmJiBpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB3YXRjaEFjdGl2ZTogZnVuY3Rpb24gd2F0Y2hBY3RpdmUoYWN0aXZlKSB7XG4gICAgICB2YXIgZmlsZSA9IHZvaWQgMDtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB3aGlsZSAoZmlsZSA9IHRoaXMuZmlsZXNbaW5kZXhdKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIGlmICghZmlsZS5maWxlT2JqZWN0KSB7XG4gICAgICAgICAgLy8g5LiN5piv5paH5Lu25a+56LGhXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlICYmICF0aGlzLmRlc3Ryb3kpIHtcbiAgICAgICAgICBpZiAodGhpcy51cGxvYWRpbmcgPj0gdGhpcy50aHJlYWQgfHwgdGhpcy51cGxvYWRpbmcgJiYgIXRoaXMuZmVhdHVyZXMuaHRtbDUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWZpbGUuYWN0aXZlICYmICFmaWxlLmVycm9yICYmICFmaWxlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGZpbGUsIHsgYWN0aXZlOiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZmlsZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGZpbGUsIHsgYWN0aXZlOiBmYWxzZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnVwbG9hZGluZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgd2F0Y2hEcm9wOiBmdW5jdGlvbiB3YXRjaERyb3AoX2VsKSB7XG4gICAgICB2YXIgZWwgPSBfZWw7XG4gICAgICBpZiAoIXRoaXMuZmVhdHVyZXMuZHJvcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIOenu+mZpOaMgui9vVxuICAgICAgaWYgKHRoaXMuZHJvcEVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzLm9uRHJhZ2VudGVyLCBmYWxzZSk7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5vbkRyYWdsZWF2ZSwgZmFsc2UpO1xuICAgICAgICAgIHRoaXMuZHJvcEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLm9uRHJhZ292ZXIsIGZhbHNlKTtcbiAgICAgICAgICB0aGlzLmRyb3BFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLm9uRHJvcCwgZmFsc2UpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuXG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgIGVsID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKSB8fCB0aGlzLiRyb290LiRlbC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwgPT09IHRydWUpIHtcbiAgICAgICAgZWwgPSB0aGlzLiRwYXJlbnQuJGVsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyb3BFbGVtZW50ID0gZWw7XG5cbiAgICAgIGlmICh0aGlzLmRyb3BFbGVtZW50KSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIHRoaXMub25EcmFnZW50ZXIsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5vbkRyYWdsZWF2ZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmRyb3BFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5vbkRyYWdvdmVyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZHJvcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMub25Ecm9wLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvbkRyYWdlbnRlcjogZnVuY3Rpb24gb25EcmFnZW50ZXIoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCF0aGlzLmRyb3BBY3RpdmUpIHtcbiAgICAgICAgdGhpcy5kcm9wQWN0aXZlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uRHJhZ2xlYXZlOiBmdW5jdGlvbiBvbkRyYWdsZWF2ZShlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoZS50YXJnZXQubm9kZU5hbWUgPT09ICdIVE1MJyB8fCBlLnNjcmVlblggPT09IDAgJiYgZS5zY3JlZW5ZID09PSAwICYmIGUuc2NyZWVuWSA9PT0gMCAmJiAhZS5mcm9tRWxlbWVudCAmJiBlLm9mZnNldFggPCAwKSB7XG4gICAgICAgIHRoaXMuZHJvcEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgb25EcmFnb3ZlcjogZnVuY3Rpb24gb25EcmFnb3ZlcihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSxcbiAgICBvbkRyb3A6IGZ1bmN0aW9uIG9uRHJvcChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmRyb3BBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuYWRkRGF0YVRyYW5zZmVyKGUuZGF0YVRyYW5zZmVyKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBGaWxlVXBsb2FkJDEgPSBPYmplY3QuZnJlZXplKHtcblx0ZGVmYXVsdDogRmlsZVVwbG9hZFxufSk7XG5cbnZhciByZXF1aXJlJCQwID0gKCBGaWxlVXBsb2FkJDEgJiYgRmlsZVVwbG9hZCApIHx8IEZpbGVVcGxvYWQkMTtcblxudmFyIHNyYyA9IHJlcXVpcmUkJDA7XG5cbnJldHVybiBzcmM7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12dWUtdXBsb2FkLWNvbXBvbmVudC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS11cGxvYWQtY29tcG9uZW50L2Rpc3QvdnVlLXVwbG9hZC1jb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDc2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEyIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtY29udGFpbmVyXCIsXG4gICAgeyBhdHRyczogeyBmbHVpZDogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyBjb2xvcjogXCJibHVlXCIsIGZsYXQ6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImZpbGUtdXBsb2FkXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgcmVmOiBcInVwbG9hZFwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgY3Vyc29yOiBcInBvaW50ZXJcIiwgbWFyZ2luOiBcIjEwcHhcIiB9LFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJwb3N0LWFjdGlvblwiOiBfdm0ucG9zdEFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgXCJwdXQtYWN0aW9uXCI6IF92bS5wdXRBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6IF92bS5leHRlbnNpb25zLFxuICAgICAgICAgICAgICAgICAgICBhY2NlcHQ6IF92bS5hY2NlcHQsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxlOiBfdm0ubXVsdGlwbGUsXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeTogX3ZtLmRpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogX3ZtLnNpemUgfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhyZWFkOlxuICAgICAgICAgICAgICAgICAgICAgIF92bS50aHJlYWQgPCAxID8gMSA6IF92bS50aHJlYWQgPiA1ID8gNSA6IF92bS50aHJlYWQsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IF92bS5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBfdm0uZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgZHJvcDogX3ZtLmRyb3AsXG4gICAgICAgICAgICAgICAgICAgIFwiZHJvcC1kaXJlY3RvcnlcIjogX3ZtLmRyb3BEaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIFwiYWRkLWluZGV4XCI6IF92bS5hZGRJbmRleFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiaW5wdXQtZmlsdGVyXCI6IF92bS5pbnB1dEZpbHRlcixcbiAgICAgICAgICAgICAgICAgICAgXCJpbnB1dC1maWxlXCI6IF92bS5pbnB1dEZpbGVcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmZpbGVzLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmZpbGVzID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZmlsZXNcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgICAgICBDaG9vc2UgRmlsZXNcXG4gICAgICAgICAgICAgICAgXCIpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHsgZmxhdDogXCJcIiwgaWNvbjogXCJcIiwgY29sb3I6IFwiYW1iZXIgbGlnaHRlbi0yXCIgfSxcbiAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBfdm0uaXNPcHRpb24gPSAhX3ZtLmlzT3B0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJmYS1jb2dcIildKV0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICFfdm0uaXNPcHRpb25cbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LWRhdGEtdGFibGVcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfdm0udGgsXG4gICAgICAgICAgICAgICAgICBpdGVtczogX3ZtLmZpbGVzLFxuICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICBcIm5vLWRhdGEtdGV4dFwiOlxuICAgICAgICAgICAgICAgICAgICBcIkNsaWNrIGBDaG9vc2UgRmlsZXNgIEJ1dHRvbiBUbyBVcGxvYWQgRmlsZXMuXCIsXG4gICAgICAgICAgICAgICAgICBcInJvd3MtcGVyLXBhZ2UtaXRlbXNcIjogX3ZtLnBlclBhZ2VEYXRhXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIml0ZW1zXCIsXG4gICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihwcm9wcykge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRpdGxlIHRleHQteHMtbGVmdCBwcmltYXJ5LS10ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0udGh1bWJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHByb3BzLml0ZW0udGh1bWIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI0MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcImF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJObyBJbWFnZVwiKV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1lZGl0LWRpYWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBsYXJnZTogXCJcIiwgbGF6eTogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJ0cnVuY2F0ZVwiKShwcm9wcy5pdGVtLm5hbWUsIDIwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibXQtMyB0ZXh0LXhzLWNlbnRlciB0aXRsZSBwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzbG90OiBcImlucHV0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIlVwZGF0ZSBOYW1lXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkVkaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2luZ2xlLWxpbmVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvZm9jdXM6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlczogW192bS5tYXhJbnB1dF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByb3BzLml0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5uYW1lID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwcm9wcy5pdGVtLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5fZihcImZvcm1hdFNpemVcIikocHJvcHMuaXRlbS5zaXplKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLmFjdGl2ZSB8fCBwcm9wcy5pdGVtLnByb2dyZXNzICE9PSBcIjAuMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtcHJvZ3Jlc3MtY2lyY3VsYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplOiA0NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZTogMzYwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnByb2dyZXNzKHByb3BzLml0ZW0ucHJvZ3Jlc3MpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJ0ZWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcHRpb25cIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucHJvZ3Jlc3MocHJvcHMuaXRlbS5wcm9ncmVzcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5lcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MocHJvcHMuaXRlbS5lcnJvcikpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcm9wcy5pdGVtLnN1Y2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGUgdGV4dC14cy1sZWZ0IHByaW1hcnktLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwic3VjY2Vzc1wiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHByb3BzLml0ZW0uYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiYWN0aXZlXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFwidGRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZSB0ZXh0LXhzLWxlZnQgcHJpbWFyeS0tdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGl0bGUgdGV4dC14cy1jZW50ZXIgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5pdGVtLmFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwicmVkIGRhcmtlbi00XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5hY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLiRyZWZzLnVwbG9hZC51cGRhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGVycm9yOiBcImNhbmNlbFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImZhLXRpbWVzXCIpXSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcm9wcy5pdGVtLmVycm9yICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uZXJyb3IgIT09IFwiY29tcHJlc3NpbmdcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHJlZnMudXBsb2FkLmZlYXR1cmVzLmh0bWw1XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kcmVmcy51cGxvYWQudXBkYXRlKHByb3BzLml0ZW0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IFwiMC4wMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiZmEtcmVmcmVzaFwiKV0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImJsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0uc3VjY2VzcyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXRlbS5lcnJvciA9PT0gXCJjb21wcmVzc2luZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uJHJlZnMudXBsb2FkLnVwZGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLml0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGl2ZTogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiZmEtdXBsb2FkXCIpXSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwicmVkIGxpZ2h0ZW4tMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJlbW92ZShwcm9wcy5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiZmEtdHJhc2hcIildKV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICFfdm0uaXNPcHRpb25cbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5maWxlcy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZmlsZXMubGVuZ3RoID4gMFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJ0ZWFsIGxpZ2h0ZW4tMlwiIH0sXG4gICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLiRyZWZzLnVwbG9hZC5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIlN0YXJ0IFVwbG9hZCBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IHJpZ2h0OiBcIlwiIH0gfSwgW192bS5fdihcInBsYXlfYXJyb3dcIildKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzaG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLiRyZWZzLnVwbG9hZCAmJiBfdm0uJHJlZnMudXBsb2FkLmFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIiRyZWZzLnVwbG9hZCAmJiAkcmVmcy51cGxvYWQuYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcImVycm9yXCIgfSxcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uJHJlZnMudXBsb2FkLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIlN0b3AgVXBsb2FkIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgcmlnaHQ6IFwiXCIgfSB9LCBbX3ZtLl92KFwic3RvcFwiKV0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS4kcmVmcy51cGxvYWQgJiZcbiAgICAgICAgICAgICAgIV92bS4kcmVmcy51cGxvYWQuYWN0aXZlICYmXG4gICAgICAgICAgICAgIF92bS5maWxlcy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwicmVkIGxpZ2h0ZW4tMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmZpbGVzID0gW11cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJSZW1vdmUgQWxsIEZpbGVzIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IHJpZ2h0OiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiZmEtdGltZXNcIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJ2LXNwYWNlclwiKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmlzT3B0aW9uXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwiZmEtZmlsZS1jb2RlLW8gXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQWNjZXB0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiQWxsb3cgdXBsb2FkIG1pbWUgdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwicGVyc2lzdGVudC1oaW50XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJtaW1lLXR5cGVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJtaW1lLXR5cGVcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uYWNjZXB0LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hY2NlcHQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYWNjZXB0XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kLWljb25cIjogXCJmYS1jb2dzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRXh0ZW5zaW9uc1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIkFsbG93IHVwbG9hZCBmaWxlIGV4dGVuc2lvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwicGVyc2lzdGVudC1oaW50XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJleHRlbnNpb25cIiksXG4gICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJleHRlbnNpb25cIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uZXh0ZW5zaW9ucyA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJleHRlbnNpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwiaHR0cFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlB1dCBVcmxcIixcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJpbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgaGludDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRGlzYWJsZWQgaWYgRW1wdHksIEFmdGVyIHRoZSBzaHV0ZG93biwgdXNlIHRoZSBQT1NUIG1ldGhvZCB0byB1cGxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wdXRBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnB1dEFjdGlvbiA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwdXRBY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIncmVxdWlyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcImh0dHBcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb3N0IFVybFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIkRlZmF1bHQgUG9zdCBVUkxcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwicG9zdC11cmxcIiksXG4gICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJwb3N0LXVybFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wb3N0QWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5wb3N0QWN0aW9uID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBvc3RBY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJyZXF1aXJlZHxudW1lcmljfG1pbl92YWx1ZToxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZHxudW1lcmljfG1pbl92YWx1ZToxJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kLWljb25cIjogXCJmYS1jdWJlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlRocmVhZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBoaW50OlxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBbHNvIHVwbG9hZCB0aGUgbnVtYmVyIG9mIGZpbGVzIGF0IHRoZSBzYW1lIHRpbWUgKG51bWJlciBvZiB0aHJlYWRzKVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwicGVyc2lzdGVudC1oaW50XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJlcnJvci1tZXNzYWdlc1wiOiBfdm0uZXJyb3JzLmNvbGxlY3QoXCJ0aHJlYWRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJ0aHJlYWRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0udGhyZWFkLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS50aHJlYWQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwidGhyZWFkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi12YWxpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiJ3JlcXVpcmVkJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kLWljb25cIjogXCJ0cmVuZGluZ191cFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk1heCBzaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiU2l6ZSBVbml0IGluIGJ5dGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwibWF4LXNpemVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJtYXgtc2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zaXplLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zaXplID0gX3ZtLl9uKCQkdilcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwidHJlbmRpbmdfZG93blwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk1pbiBzaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiU2l6ZSBVbml0IGluIGJ5dGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInBlcnNpc3RlbnQtaGludFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwibWluLXNpemVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LW5hbWVcIjogXCJtaW4tc2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5taW5TaXplLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5taW5TaXplID0gX3ZtLl9uKCQkdilcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwibWluU2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdmFsaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIidyZXF1aXJlZCdcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwiZmEtY29tcHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJBdXRvbWF0aWNhbGx5IGNvbXByZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3ItbWVzc2FnZXNcIjogX3ZtLmVycm9ycy5jb2xsZWN0KFwiYXV0by1jb21wcmVzc1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtdnYtbmFtZVwiOiBcImF1dG8tY29tcHJlc3NcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uYXV0b0NvbXByZXNzLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hdXRvQ29tcHJlc3MgPSBfdm0uX24oJCR2KVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJhdXRvQ29tcHJlc3NcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfdm0uYXV0b0NvbXByZXNzID4gMFxuICAgICAgICAgICAgICAgICAgICA/IF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImdyZXktLXRleHQgY2FwdGlvblwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNb3JlIHRoYW4gXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uX2YoXCJmb3JtYXRTaXplXCIpKF92bS5hdXRvQ29tcHJlc3MpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgZmlsZXMgYXJlIGF1dG9tYXRpY2FsbHkgY29tcHJlc3NlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgOiBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJncmV5LS10ZXh0IGNhcHRpb25cIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJTZXQgdXAgYXV0b21hdGljIGNvbXByZXNzaW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1jaGVja2JveFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRHJhZyBhbmQgZHJvcCB1cGxvYWQ6IFwiICsgX3ZtLmRyb3AudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZHJvcCxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uZHJvcCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJkcm9wXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1jaGVja2JveFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6XG4gICAgICAgICAgICAgICAgICAgICAgICBcIk5vdCBjaGVja2VkLCBmaWx0ZXIgdGhlIGRyYWdnZWQgZm9sZGVyOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uZHJvcERpcmVjdG9yeS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5kcm9wRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kcm9wRGlyZWN0b3J5ID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImRyb3BEaXJlY3RvcnlcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWNoZWNrYm94XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQXV0b21hdGljYWxseSBhY3RpdmF0ZSB1cGxvYWQ6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS51cGxvYWRBdXRvLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnVwbG9hZEF1dG8sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnVwbG9hZEF1dG8gPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwidXBsb2FkQXV0b1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTU3MjFjOTkwXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi01NzIxYzk5MFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9VcGxvYWRzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwibGF5b3V0XCIsXG4gICAgW19jKFwidXBsb2Fkc1wiLCB7IGF0dHJzOiB7IFwiZmlsZS1rZXlcIjogXCJmaWxlXCIsIFwicG9zdC11cmxcIjogX3ZtLmxpbmsgfSB9KV0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi05MGEwMjJjNlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtOTBhMDIyYzZcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1VwbG9hZFJlY2VpcHQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiJdLCJzb3VyY2VSb290IjoiIn0=