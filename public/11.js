webpackJsonp([11],{

/***/ 537:
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

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(685)
}
var normalizeComponent = __webpack_require__(258)
/* script */
var __vue_script__ = __webpack_require__(687)
/* template */
var __vue_template__ = __webpack_require__(688)
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

/***/ 556:
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

var listToStyles = __webpack_require__(558)

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

/***/ 558:
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

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(686);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(556)("128eef39", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6ba62439\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NotFound.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6ba62439\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NotFound.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(537)(true);
// imports


// module
exports.push([module.i, "\n.cls-1[data-v-6ba62439] {\n  fill: #ffc541;\n}\n.cls-2[data-v-6ba62439] {\n  fill: #4e4066;\n}\n.cls-3[data-v-6ba62439] {\n  fill: #6f5b92;\n}\n.cls-4[data-v-6ba62439] {\n  fill: #f78d5e;\n}\n.cls-5[data-v-6ba62439] {\n  fill: #fa976c;\n}\n.cls-6[data-v-6ba62439],\n.cls-7[data-v-6ba62439],\n.cls-8[data-v-6ba62439] {\n  fill: #b65c32;\n}\n.cls-10[data-v-6ba62439],\n.cls-6[data-v-6ba62439] {\n  opacity: 0.6;\n}\n.cls-7[data-v-6ba62439] {\n  opacity: 0.4;\n}\n.cls-9[data-v-6ba62439] {\n  fill: #f4b73b;\n}\n.cls-11[data-v-6ba62439] {\n  fill: #f9c358;\n}\n.cls-12[data-v-6ba62439] {\n  fill: #9b462c;\n}\n.cls-13[data-v-6ba62439] {\n  fill: #aa512e;\n}\n.cls-14[data-v-6ba62439] {\n  fill: #7d6aa5;\n}\n\n/* animations */\n.wheel[data-v-6ba62439] {\n  animation: wheel-rotate-data-v-6ba62439 6s ease infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n@keyframes wheel-rotate-data-v-6ba62439 {\n50% {\n    transform: rotate(360deg);\n    animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);\n}\n100% {\n    transform: rotate(960deg)\n}\n}\n.clock-hand-1[data-v-6ba62439] {\n  animation: clock-rotate-data-v-6ba62439 3s linear infinite;\n  transform-origin: bottom;\n  transform-box: fill-box;\n}\n.clock-hand-2[data-v-6ba62439] {\n  animation: clock-rotate-data-v-6ba62439 6s linear infinite;\n  transform-origin: bottom;\n  transform-box: fill-box;\n}\n@keyframes clock-rotate-data-v-6ba62439 {\n100% {\n    transform: rotate(360deg)\n}\n}\n#box-top[data-v-6ba62439] {\n  animation: box-top-anim-data-v-6ba62439 2s linear infinite;\n  transform-origin: right top;\n  transform-box: fill-box;\n}\n@keyframes box-top-anim-data-v-6ba62439 {\n50% {\n    transform: rotate(-5deg)\n}\n}\n#umbrella[data-v-6ba62439] {\n  animation: umbrella-anim-data-v-6ba62439 6s linear infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n@keyframes umbrella-anim-data-v-6ba62439 {\n25% {\n    transform: translateY(10px) rotate(5deg);\n}\n75% {\n    transform: rotate(-5deg);\n}\n}\n#cup[data-v-6ba62439] {\n  animation: cup-rotate-data-v-6ba62439 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;\n  transform-origin: top left;\n  transform-box: fill-box;\n}\n@keyframes cup-rotate-data-v-6ba62439 {\n50% {\n    transform: rotate(-5deg)\n}\n}\n#pillow[data-v-6ba62439] {\n  animation: pillow-anim-data-v-6ba62439 3s linear infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n@keyframes pillow-anim-data-v-6ba62439 {\n25% {\n    transform: rotate(10deg) translateY(5px)\n}\n75% {\n    transform: rotate(-10deg)\n}\n}\n#stripe[data-v-6ba62439] {\n  animation: stripe-anim-data-v-6ba62439 3s linear infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n@keyframes stripe-anim-data-v-6ba62439 {\n25% {\n    transform: translate(10px, 0) rotate(-10deg)\n}\n75% {\n    transform: translateX(10px)\n}\n}\n#bike[data-v-6ba62439] {\n  animation: bike-anim-data-v-6ba62439 6s ease infinite;\n}\n@keyframes bike-anim-data-v-6ba62439 {\n0% {\n    transform: translateX(-1300px)\n}\n50% {\n    transform: translateX(0);\n    animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);\n}\n100% {\n    transform: translateX(1300px)\n}\n}\n#rucksack[data-v-6ba62439] {\n  animation: ruck-anim-data-v-6ba62439 3s linear infinite;\n  transform-origin: top;\n  transform-box: fill-box;\n}\n@keyframes ruck-anim-data-v-6ba62439 {\n50% {\n    transform: rotate(5deg)\n}\n}\n.circle[data-v-6ba62439] {\n  animation: circle-anim-data-v-6ba62439 ease infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n  perspective: 0px;\n}\n.circle.c1[data-v-6ba62439] {\n  animation-duration: 2s\n}\n.circle.c2[data-v-6ba62439] {\n  animation-duration: 3s\n}\n.circle.c3[data-v-6ba62439] {\n  animation-duration: 1s\n}\n.circle.c4[data-v-6ba62439] {\n  animation-duration: 1s\n}\n.circle.c5[data-v-6ba62439] {\n  animation-duration: 2s\n}\n.circle.c6[data-v-6ba62439] {\n  animation-duration: 3s\n}\n@keyframes circle-anim-data-v-6ba62439 {\n50% {\n    transform: scale(.2) rotateX(360deg) rotateY(360deg)\n}\n}\n.four[data-v-6ba62439],\n#ou[data-v-6ba62439] {\n  animation: four-anim-data-v-6ba62439 cubic-bezier(0.39, 0.575, 0.565, 1) infinite;\n}\n.four.a[data-v-6ba62439] {\n  transform-origin: bottom left;\n  animation-duration: 3s;\n  transform-box: fill-box;\n}\n.four.b[data-v-6ba62439] {\n  transform-origin: bottom right;\n  animation-duration: 3s;\n  transform-box: fill-box;\n}\n#ou[data-v-6ba62439] {\n  animation-duration: 6s;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n@keyframes four-anim-data-v-6ba62439 {\n50% {\n    transform: scale(.98)\n}\n}\n", "", {"version":3,"sources":["C:/Users/uriah/sites/www/shop/resources/assets/js/pages/NotFound.vue?159b1aba"],"names":[],"mappings":";AA0LA;EACA,cAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;;;EAGA,cAAA;CACA;AAEA;;EAEA,aAAA;CACA;AAEA;EACA,aAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;EACA,cAAA;CACA;;AAEA,gBAAA;AAEA;EACA,yDAAA;EACA,yBAAA;EACA,wBAAA;CACA;AAEA;AACA;IACA,0BAAA;IACA,iEAAA;CACA;AACA;IACA,yBAAA;CACA;CACA;AAEA;EACA,2DAAA;EACA,yBAAA;EACA,wBAAA;CACA;AAEA;EACA,2DAAA;EACA,yBAAA;EACA,wBAAA;CACA;AAEA;AACA;IACA,yBAAA;CACA;CACA;AAEA;EACA,2DAAA;EACA,4BAAA;EACA,wBAAA;CACA;AAEA;AACA;IACA,wBAAA;CACA;CACA;AAEA;EACA,4DAAA;EACA,yBAAA;EACA,wBAAA;CACA;AAEA;AACA;IACA,yCAAA;CACA;AACA;IACA,yBAAA;CACA;CACA;AAEA;EACA,0FAAA;EACA,2BAAA;EACA,wBAAA;CACA;AAEA;AACA;IACA,wBAAA;CACA;CACA;AAEA;EACA,0DAAA;EACA,yBAAA;EACA,wBAAA;CACA;AAEA;AACA;IACA,wCAAA;CACA;AACA;IACA,yBAAA;CACA;CACA;AAEA;EACA,0DAAA;EACA,yBAAA;EACA,wBAAA;CACA;AAEA;AACA;IACA,4CAAA;CACA;AACA;IACA,2BAAA;CACA;CACA;AAEA;EACA,sDAAA;CACA;AAEA;AACA;IACA,8BAAA;CACA;AACA;IACA,yBAAA;IACA,+DAAA;CACA;AACA;IACA,6BAAA;CACA;CACA;AAEA;EACA,wDAAA;EACA,sBAAA;EACA,wBAAA;CACA;AAEA;AACA;IACA,uBAAA;CACA;CACA;AAEA;EACA,qDAAA;EACA,yBAAA;EACA,wBAAA;EACA,iBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;AACA;IACA,oDAAA;CACA;CACA;AAEA;;EAEA,kFAAA;CACA;AAEA;EACA,8BAAA;EACA,uBAAA;EACA,wBAAA;CACA;AAEA;EACA,+BAAA;EACA,uBAAA;EACA,wBAAA;CACA;AAEA;EACA,uBAAA;EACA,yBAAA;EACA,wBAAA;CACA;AAEA;AACA;IACA,qBAAA;CACA;CACA","file":"NotFound.vue","sourcesContent":["<template>\n<modal name=\"404-not-found\" :adaptive=\"true\" width=\"100%\" height=\"100%\" :clickToClose=\"false\">\n        <v-card :flat=\"true\">\n        <v-toolbar class=\"accent\">\n          <v-btn icon @click.native=\"redirectBack()\">\n            <v-icon class=\"primary--text\">arrow_back</v-icon>\n          </v-btn>\n          <v-spacer></v-spacer>\n          <v-toolbar-title class=\"text-xs-center primary--text\">PAGE NOT FOUND</v-toolbar-title>\n          <v-spacer></v-spacer>\n          <v-toolbar-items>\n            <v-btn class=\"primary--text\" flat @click.native=\"goHome()\"><v-icon right dark>home</v-icon></v-btn>\n          </v-toolbar-items>\n        </v-toolbar>\n        <v-card-text style=\"padding-top:100px;\">\n      <v-container fluid>\n        <v-layout row>\n          <v-flex x12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>\n            <div class=\"wrapper\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1920 1080\">\n                <title>404</title>\n                <g id=\"Layer_12 yellow-back-fig\" data-name=\"Layer 12\">\n                  <path class=\"cls-1\" d=\"M600.87,872H156a4,4,0,0,0-3.78,4.19h0a4,4,0,0,0,3.78,4.19H600.87a4,4,0,0,0,3.78-4.19h0A4,4,0,0,0,600.87,872Z\"/>\n                  <rect class=\"cls-1\" x=\"680.91\" y=\"871.98\" width=\"513.38\" height=\"8.39\" rx=\"4.19\" ry=\"4.19\"/>\n                  <path class=\"cls-1\" d=\"M1480,876.17h0c0,2.32,2.37,4.19,5.3,4.19h350.61c2.93,0,5.3-1.88,5.3-4.19h0c0-2.32-2.37-4.19-5.3-4.19H1485.26C1482.33,872,1480,873.86,1480,876.17Z\"/>\n                  <rect class=\"cls-1\" x=\"492.21\" y=\"920.64\" width=\"249.8\" height=\"8.39\" rx=\"4.19\" ry=\"4.19\"/>\n                  <path class=\"cls-1\" d=\"M1549.14,924.84h0a4.19,4.19,0,0,0-4.19-4.19H1067.46a14.66,14.66,0,0,1,.35,3.21v1A4.19,4.19,0,0,0,1072,929h472.94A4.19,4.19,0,0,0,1549.14,924.84Z\"/>\n                  <path class=\"cls-1\" d=\"M865.5,924.84h0a4.19,4.19,0,0,0,4.19,4.19h82.37a12.28,12.28,0,0,1-.19-2v-2.17a4.19,4.19,0,0,0-4.19-4.19h-78A4.19,4.19,0,0,0,865.5,924.84Z\"/>\n                  <rect class=\"cls-1\" x=\"915.6\" y=\"981.47\" width=\"54.72\" height=\"8.39\" rx=\"4.19\" ry=\"4.19\"/>\n                  <path class=\"cls-1\" d=\"M730.33,985.67h0c0,2.32,4.23,4.19,9.44,4.19h104.3c5.22,0,9.44-1.88,9.44-4.19h0c0-2.32-4.23-4.19-9.44-4.19H739.78C734.56,981.47,730.33,983.35,730.33,985.67Z\"/>\n                  <rect class=\"cls-1\" x=\"997.06\" y=\"981.47\" width=\"78.11\" height=\"8.39\" rx=\"4.19\" ry=\"4.19\"/>\n\n                <g id=\"round-conf\">\n                  <path class=\"cls-1 circle c1\" d=\"M536.41,155.14a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,536.41,155.14Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,536.41,183.81Z\"/>\n                  <path class=\"cls-1 circle c2\" d=\"M1345.09,82.44a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,1345.09,82.44Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,1345.09,111.12Z\"/>\n                  <path class=\"cls-1 circle c3\" d=\"M70.12,363A17.77,17.77,0,1,0,87.89,380.8,17.77,17.77,0,0,0,70.12,363Zm0,28.68A10.9,10.9,0,1,1,81,380.8,10.9,10.9,0,0,1,70.12,391.7Z\"/>\n                  <path class=\"cls-1 circle c4\" d=\"M170.47,751.82a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,170.47,751.82Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,170.47,780.5Z\"/>\n                  <path class=\"cls-1 circle c5\" d=\"M1457.34,762.73a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,1457.34,762.73Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,1457.34,791.4Z\"/>\n                  <path class=\"cls-1 circle c6\" d=\"M1829.15,407.49a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,1829.15,407.49Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,1829.15,436.17Z\"/>\n                  </g>\n                </g>\n                <g id=\"fortyfour\" data-name=\"Layer 2\">\n                  <g class=\"four a\">\n\n                    <rect class=\"cls-2\" x=\"233.74\" y=\"391.14\" width=\"120.71\" height=\"466.29\" rx=\"57.1\" ry=\"57.1\" transform=\"translate(918.39 330.19) rotate(90)\"/>\n\n                    <rect class=\"cls-3\" x=\"333.83\" y=\"475.1\" width=\"120.71\" height=\"396.88\" rx=\"60.36\" ry=\"60.36\"/>\n\n                    <rect class=\"cls-3\" x=\"197.13\" y=\"122.89\" width=\"120.71\" height=\"604.75\" rx=\"60.36\" ry=\"60.36\" transform=\"translate(290.49 -70.78) rotate(35)\"/>\n\n                  </g>\n                  <g class=\"four b\">\n\n                    <rect class=\"cls-2\" x=\"1558.84\" y=\"391.91\" width=\"120.71\" height=\"466.29\" rx=\"57.1\" ry=\"57.1\" transform=\"translate(2244.26 -994.14) rotate(90)\"/>\n\n                    <rect class=\"cls-3\" x=\"1658.92\" y=\"475.87\" width=\"120.71\" height=\"396.88\" rx=\"60.36\" ry=\"60.36\"/>\n\n                    <rect class=\"cls-3\" x=\"1522.22\" y=\"123.66\" width=\"120.71\" height=\"604.75\" rx=\"60.36\" ry=\"60.36\" transform=\"translate(530.57 -830.68) rotate(35)\"/>\n\n                  </g>\n                  <path class=\"cls-3\" id=\"ou\" d=\"M956.54,168.2c-194.34,0-351.89,157.55-351.89,351.89S762.19,872,956.54,872s351.89-157.55,351.89-351.89S1150.88,168.2,956.54,168.2Zm0,584.49c-128.46,0-232.6-104.14-232.6-232.6s104.14-232.6,232.6-232.6,232.6,104.14,232.6,232.6S1085,752.69,956.54,752.69Z\"/>\n                </g>\n                <g id=\"umbrella\" data-name=\"Layer 3\">\n                  <g>\n                    <circle class=\"cls-4\" cx=\"1187.53\" cy=\"240.3\" r=\"7.66\" transform=\"translate(236.36 990.8) rotate(-49.71)\"/>\n                    <g>\n                      <path class=\"cls-5\" d=\"M1219.56,359.67l55,100.52c32.7-48.48-6.87-142.43-91.75-214.38-84.41-71.55-183-95.33-225.81-56l114.21,44.14Z\"/>\n                      <path class=\"cls-6\" d=\"M1182.79,245.81c-84.41-71.55-183-95.33-225.81-56l114.21,44.14Z\"/>\n                      <polygon class=\"cls-7\" points=\"1182.79 245.81 1071.19 233.91 1219.56 359.67 1182.79 245.81\"/>\n                    </g>\n                    <polygon class=\"cls-8\" points=\"1180.91 409.02 1274.54 460.19 1219.56 359.67 1071.19 233.91 956.98 189.76 1021.95 274.29 1180.91 409.02\"/>\n                    <g>\n                      <rect class=\"cls-4\" x=\"997.45\" y=\"358.35\" width=\"175.58\" height=\"5.1\" transform=\"translate(108.21 955.38) rotate(-49.71)\"/>\n                      <rect class=\"cls-4\" x=\"1028.09\" y=\"399.36\" width=\"21.46\" height=\"32.27\" rx=\"10.73\" ry=\"10.73\" transform=\"translate(515.04 -573.16) rotate(40.29)\"/>\n                    </g>\n                  </g>\n                </g>\n                <g id=\"pillow\" data-name=\"Layer 4\">\n                  <path class=\"cls-1\" d=\"M754,627.07c7,.54,12.92-2.82,13.35-7.59s-4.95-9.24-12-9.87a18.55,18.55,0,0,0-2.17,0l-74.9-81.64c0-.1,0-.19,0-.29,0-7.09-4-12.83-8.8-12.81s-8.75,5.77-8.73,12.87c0,0,0,.09,0,.13l-50.21,46.07h-.09c-7.06-.63-13.14,2.77-13.57,7.59s4.87,9.16,11.85,9.84l76.08,82.92s0,0,0,.06c0,7.09,4,12.83,8.8,12.81s8.65-5.66,8.71-12.65Z\"/>\n                  <path class=\"cls-9\" d=\"M669.46,514.82c-4.77-.83-8.75,5.77-8.73,12.87,0,0,0,.09,0,.13l-50.21,46.07h-.09c-7.06-.63-13.14,2.77-13.57,7.59s4.87,9.16,11.85,9.84l76.08,82.92s0,0,0,.06c0,7.09,4,12.83,8.8,12.81s8.65-5.66,8.71-12.65C570.55,573,702.07,520.47,669.46,514.82Z\"/>\n                </g>\n                <g id=\"cup\" data-name=\"Layer 7\">\n                  <polygon class=\"cls-1\" points=\"1173.69 748.21 1140.52 715.42 1195.79 647.35 1241.13 692.16 1173.69 748.21\"/>\n                  <polygon class=\"cls-8\" points=\"1173.69 748.21 1140.52 715.42 1143.93 711.27 1177.81 744.75 1173.69 748.21\"/>\n                  <polygon class=\"cls-5\" points=\"1194.68 731.46 1157.04 694.24 1183.8 661.7 1226.91 704.32 1194.68 731.46\"/>\n                  <g class=\"cls-10\">\n                    <path class=\"cls-8\" d=\"M1176.32,667.78h0a4.19,4.19,0,0,1,4.19,4.19v33.54a0,0,0,0,1,0,0h-8.38a0,0,0,0,1,0,0V672a4.19,4.19,0,0,1,4.19-4.19Z\" transform=\"translate(822.53 -628.67) rotate(44.67)\"/>\n                    <path class=\"cls-8\" d=\"M1172.73,709.7l23.58-23.85a4.19,4.19,0,0,1,5.92,0h0a4.19,4.19,0,0,1,0,5.92l-23.58,23.85Z\"/>\n                    <path class=\"cls-8\" d=\"M1185.11,722.09l23.58-23.85a4.19,4.19,0,0,1,5.92,0h0a4.19,4.19,0,0,1,0,5.92L1191.06,728Z\"/>\n                  </g>\n                  <path class=\"cls-5\" d=\"M1197.85,660.5h45.69a5.7,5.7,0,0,1,5.7,5.7v8.32a0,0,0,0,1,0,0h-57.09a0,0,0,0,1,0,0v-8.32A5.7,5.7,0,0,1,1197.85,660.5Z\" transform=\"translate(829.53 -667.66) rotate(45)\"/>\n                  <path class=\"cls-8\" d=\"M1191.49,664.74h53.94a5.25,5.25,0,0,1,5.25,5.25v4.79a0,0,0,0,1,0,0h-64.44a0,0,0,0,1,0,0V670a5.25,5.25,0,0,1,5.25-5.25Z\" transform=\"translate(822.83 -663.17) rotate(44.67)\"/>\n                </g>\n                <g id=\"clock\" data-name=\"Layer 8\">\n\n                  <circle class=\"cls-5\" cx=\"847.7\" cy=\"247.59\" r=\"74.66\" transform=\"translate(-32.91 314.05) rotate(-20.6)\"/>\n                  <circle class=\"cls-1\" cx=\"847.7\" cy=\"247.59\" r=\"63.44\" transform=\"translate(-32.91 314.05) rotate(-20.6)\"/>\n                  <rect class=\"cls-3 clock-hand-1\" x=\"845\" y=\"189.5\" width=\"6.04\" height=\"58\" rx=\"3.02\" ry=\"3.02\" />\n                  <rect class=\"cls-3 clock-hand-2\" x=\"845\" y=\"209.5\" width=\"6.04\" height=\"38\" rx=\"3.02\" ry=\"3.02\" transform=\"translate(1611.22 -230.4) rotate(130.4)\"/>\n                      <circle class=\"cls-3\" cx=\"847.7\" cy=\"247.59\" transform=\"translate(-32.91 314.05) rotate(-20.6)\" r=\"3\" />\n                </g>\n                <g id=\"box\" data-name=\"Layer 9\">\n                  <g id=\"box-top\"><polygon class=\"cls-8\" points=\"569.71 382.28 653.74 329.39 747.13 320.1 679.2 369.85 569.71 382.28\"></polygon>\n                  <polygon class=\"cls-5\" points=\"691.95 367.2 570.87 392.34 565.32 383.35 687.8 357.45 691.95 367.2\"></polygon>\n\n                  <polygon class=\"cls-5\" points=\"661.54 337.48 570.87 392.34 562.42 378.92 652.25 322.38 658.12 321.34 661.54 337.48\"></polygon><polygon class=\"cls-7\" points=\"661.54 337.48 570.87 392.34 562.42 378.92 652.25 322.38 658.12 321.34 661.54 337.48\"></polygon><polygon class=\"cls-5\" points=\"747.13 320.1 661.54 337.48 652.25 322.38 738.4 307.1 747.13 320.1\"></polygon>\n                  </g>\n                    <path class=\"cls-5\" d=\"M588.28,420.26s3.44,5.2,5.19,8l43.1,68.48,158.81-100-43.1-68.48q-2.63-4.17-5.47-8Z\"></path>\n                    <path class=\"cls-7\" d=\"M588.28,420.26s3.44,5.2,5.19,8l43.1,68.48,158.81-100-43.1-68.48q-2.63-4.17-5.47-8Z\"></path>\n                  <rect class=\"cls-5\" x=\"693.73\" y=\"335.51\" width=\"83.99\" height=\"90.58\" transform=\"translate(-89.78 450.43) rotate(-32.19)\"></rect>\n                </g>\n\n                <g id=\"rucksack\" data-name=\"Layer 6\">\n                  <g id=\"stripe\"><path class=\"cls-12\" d=\"M1200.32,473.91h0a13.74,13.74,0,0,0-18.41,7.44l-55,129.86a14.82,14.82,0,0,0,7.13,19.21h0a13.74,13.74,0,0,0,18.41-7.44l55-129.86A14.82,14.82,0,0,0,1200.32,473.91Z\"/>\n                  <path class=\"cls-13\" d=\"M1202.18,606.34h0a14,14,0,0,0-16.18-11.8l-48.83,9c-7.59,1.4-12.66,9-11.31,16.89h0a14,14,0,0,0,16.18,11.8l48.83-9C1198.46,621.82,1203.53,614.26,1202.18,606.34Z\"/>\n                  </g>\n                  <path class=\"cls-8\" d=\"M1300.86,603l-122.93,22.74-15.44-90.91c-5.75-33.86,15.89-66.17,48.34-72.18l11.58-2.08c32.45-6,57.26,17.66,63,51.51Z\"/>\n                  <path class=\"cls-1\" d=\"M1307,601.91l-112.32,20.78-15.9-93.61c-5.5-32.36,15.19-63.25,46.2-69h0c31-5.74,60.62,15.85,66.12,48.21Z\"/>\n                  <path class=\"cls-8\" d=\"M1296.76,603.8,1215,618.92l-4.89-28.77c-2.11-12.42,5.83-24.27,17.73-26.47l38.67-7.15c11.9-2.2,23.26,6.08,25.37,18.5Z\"/>\n                  <path class=\"cls-5\" d=\"M1296.76,603.8l-73.41,13.58-4.92-29c-2-11.62,5.45-22.72,16.6-24.78l33.07-6.12c11.14-2.06,21.77,5.69,23.75,17.32Z\"/>\n                  <path class=\"cls-4\" d=\"M1231.77,469.69l-13.42,2.48a10.25,10.25,0,0,0-8,11.92l2.38,14a9.9,9.9,0,0,0,11.42,8.33l13.42-2.48a10.25,10.25,0,0,0,8-11.92l-2.38-14A9.9,9.9,0,0,0,1231.77,469.69Zm7.17,20.84a6.39,6.39,0,0,1-5,7.43l-8.36,1.55a6.17,6.17,0,0,1-7.12-5.19l-1.48-8.73a6.39,6.39,0,0,1,5-7.43l8.36-1.55a6.17,6.17,0,0,1,7.12,5.19Z\"/>\n                  <path class=\"cls-14\" d=\"M1233.74,471.13l-13.42,2.48a10.25,10.25,0,0,0-8,11.92l2.38,14a9.9,9.9,0,0,0,11.42,8.33l13.42-2.48a10.25,10.25,0,0,0,8-11.92l-2.38-14A9.9,9.9,0,0,0,1233.74,471.13Zm7.17,20.84a6.39,6.39,0,0,1-5,7.43l-8.36,1.55a6.17,6.17,0,0,1-7.12-5.19L1219,487a6.39,6.39,0,0,1,5-7.43l8.36-1.55a6.17,6.17,0,0,1,7.12,5.19Z\"/>\n                </g>\n                <g id=\"bike\" data-name=\"Layer 5\">\n                  <path class=\"cls-8 wheel\" d=\"M1139.82,780.44a76.59,76.59,0,1,0-57.9,91.53A76.59,76.59,0,0,0,1139.82,780.44Zm-28.12,6.33a47.59,47.59,0,0,1,.83,15.8c-30.14-6.28-47.68-21.65-54.39-52.52A47.73,47.73,0,0,1,1111.69,786.77Zm-70.46-30.9c10.35,26.88,10.14,50.4-13.73,70.77a47.67,47.67,0,0,1,13.73-70.77Zm34.35,88a47.55,47.55,0,0,1-34.94-5.62c16.8-20.36,41.71-25.94,67.09-19.46A47.66,47.66,0,0,1,1075.58,843.85Z\"/>\n                  <path class=\"cls-8 wheel\" d=\"M864.89,789.69a76.59,76.59,0,1,0-66.13,85.78A76.59,76.59,0,0,0,864.89,789.69Zm-28.59,3.7a47.59,47.59,0,0,1-.64,15.81c-29.43-9-45.47-26-49.3-57.33A47.73,47.73,0,0,1,836.3,793.39ZM769,756.1c7.82,27.72,5.43,51.12-20.22,69.2A47.67,47.67,0,0,1,769,756.1Zm26.06,90.78a47.55,47.55,0,0,1-34.27-8.83c18.61-18.72,43.93-22,68.6-13.16A47.66,47.66,0,0,1,795.06,846.88Z\"/>\n                  <g>\n                    <rect class=\"cls-1\" x=\"871.39\" y=\"693.37\" width=\"12.87\" height=\"53.21\" transform=\"translate(-165.97 273.38) rotate(-16.19)\"/>\n                    <path class=\"cls-5\" d=\"M813.93,679.35c-3.72-5.2,2.24-18.5,9.16-16.13,33.43,11.46,73.85,10.45,73.85,10.45,8.84.15,14.44,10.34,7.27,15.48-14.36,8.79-33.13,17-56.35,9.76C830.17,693.41,819.83,687.6,813.93,679.35Z\"/>\n                    <path class=\"cls-7\" d=\"M813.93,679.35c-3.72-5.2,2.24-18.5,9.16-16.13,33.43,11.46,73.85,10.45,73.85,10.45,8.84.15,14.44,10.34,7.27,15.48-14.36,8.79-33.13,17-56.35,9.76C830.17,693.41,819.83,687.6,813.93,679.35Z\"/>\n                    <path class=\"cls-5\" d=\"M817.15,680.06c-3.59-5,1.69-16.51,8.37-14.22,32.3,11.09,71.41,7.83,71.41,7.83,8.54.14,17.45,9.94,7.43,15.88-13.87,8.51-32,16.44-54.44,9.44C832.84,693.67,822.85,688,817.15,680.06Z\"/>\n                  </g>\n                  <g>\n                    <circle class=\"cls-9\" cx=\"1022.66\" cy=\"599.55\" r=\"11.57\" transform=\"translate(-4.86 8.38) rotate(-0.47)\"/>\n                    <path class=\"cls-1\" d=\"M1069.76,792.37l-34.89-96.74,1.93-.8-1.71-4.15-1.74.72-13.26-36.76,1.27-.42-2.25-6.76,5.94-2-2.57-7.72-9.7,3.22c-11.55-22.55,2-36.33,15-41.86l-5.57-8.81c-23,10.29-29.61,28.75-19.53,54l-9.38,3.12,2.56,7.72,5.47-1.82,2.25,6.76,2.36-.78,13.62,37.76-2.35,1,1.71,4.15,2.16-.89,34.65,96.09a7.47,7.47,0,0,0,9.56,4.49h0A7.47,7.47,0,0,0,1069.76,792.37Z\"/>\n                    <circle class=\"cls-11\" cx=\"1027.9\" cy=\"587.94\" r=\"12.99\" transform=\"translate(-4.77 8.42) rotate(-0.47)\"/>\n                  </g>\n                  <path class=\"cls-5\" d=\"M1021.29,654l-17.73,6.15,1.72,5.59-31.41,82.36c-19.35,32.53-66.3,36.72-75.56,16.68l-7.09-21.5L879,747.1l3.28,10.09-94.65,33.95c-11.49,2.29-11.85,15.79-2.61,17.84,0,0,39.11,3.66,103,9.5a92.75,92.75,0,0,0,40.89-5.29c44.32-16.56,57.73-50.67,57.73-50.67l26.82-67.26a1.37,1.37,0,0,1,2.53,0l1.42,3.33,17.75-7.62Z\"/>\n                  <path class=\"cls-7\" d=\"M1021.29,654l-17.73,6.15,1.72,5.59-31.41,82.36c-19.35,32.53-66.3,36.72-75.56,16.68l-7.09-21.5L879,747.1l3.28,10.09-94.65,33.95c-11.49,2.29-11.85,15.79-2.61,17.84,0,0,39.11,3.66,103,9.5a92.75,92.75,0,0,0,40.89-5.29c44.32-16.56,57.73-50.67,57.73-50.67l26.82-67.26a1.37,1.37,0,0,1,2.53,0l1.42,3.33,17.75-7.62Z\"/>\n                </g>\n              </svg>\n            </div>\n          </v-flex>\n        </v-layout>\n        <v-layout row>\n        <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>\n            <v-card-actions>\n            <v-btn @click.native=\"goHome()\" block flat class=\"info--text info\">Back To HomePage</v-btn>\n            <v-btn @click.native=\"goShop()\" block flat class=\"primary--text primary\">Continue Shopping</v-btn>\n            </v-card-actions>\n         </v-flex>\n        </v-layout>\n      </v-container>\n\n    </v-card-text>\n      </v-card>\n    </modal>\n</template>\n\n<script>\n\nexport default {\n    mounted () {\n        let self = this\n        self.$modal.show('404-not-found')\n    },\n    methods: {\n        redirectBack () {\n            let self = this\n            self.$modal.hide('404-not-found')\n            self.$router.go(-2)\n        },\n        goHome () {\n            let self = this\n            self.$modal.hide('404-not-found')\n            self.$router.push({name: 'home'})\n        },\n        goShop () {\n            let self = this\n            self.$modal.hide('404-not-found')\n            self.$router.push({name: 'product.index'})\n        }\n    }\n}\n</script>\n<style scoped>\n.cls-1 {\n  fill: #ffc541;\n}\n\n.cls-2 {\n  fill: #4e4066;\n}\n\n.cls-3 {\n  fill: #6f5b92;\n}\n\n.cls-4 {\n  fill: #f78d5e;\n}\n\n.cls-5 {\n  fill: #fa976c;\n}\n\n.cls-6,\n.cls-7,\n.cls-8 {\n  fill: #b65c32;\n}\n\n.cls-10,\n.cls-6 {\n  opacity: 0.6;\n}\n\n.cls-7 {\n  opacity: 0.4;\n}\n\n.cls-9 {\n  fill: #f4b73b;\n}\n\n.cls-11 {\n  fill: #f9c358;\n}\n\n.cls-12 {\n  fill: #9b462c;\n}\n\n.cls-13 {\n  fill: #aa512e;\n}\n\n.cls-14 {\n  fill: #7d6aa5;\n}\n\n/* animations */\n\n.wheel {\n  animation: wheel-rotate 6s ease infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n\n@keyframes wheel-rotate {\n  50% {\n    transform: rotate(360deg);\n    animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);\n  }\n  100% {\n    transform: rotate(960deg)\n  }\n}\n\n.clock-hand-1 {\n  animation: clock-rotate 3s linear infinite;\n  transform-origin: bottom;\n  transform-box: fill-box;\n}\n\n.clock-hand-2 {\n  animation: clock-rotate 6s linear infinite;\n  transform-origin: bottom;\n  transform-box: fill-box;\n}\n\n@keyframes clock-rotate {\n  100% {\n    transform: rotate(360deg)\n  }\n}\n\n#box-top {\n  animation: box-top-anim 2s linear infinite;\n  transform-origin: right top;\n  transform-box: fill-box;\n}\n\n@keyframes box-top-anim {\n  50% {\n    transform: rotate(-5deg)\n  }\n}\n\n#umbrella {\n  animation: umbrella-anim 6s linear infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n\n@keyframes umbrella-anim {\n  25% {\n    transform: translateY(10px) rotate(5deg);\n  }\n  75% {\n    transform: rotate(-5deg);\n  }\n}\n\n#cup {\n  animation: cup-rotate 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;\n  transform-origin: top left;\n  transform-box: fill-box;\n}\n\n@keyframes cup-rotate {\n  50% {\n    transform: rotate(-5deg)\n  }\n}\n\n#pillow {\n  animation: pillow-anim 3s linear infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n\n@keyframes pillow-anim {\n  25% {\n    transform: rotate(10deg) translateY(5px)\n  }\n  75% {\n    transform: rotate(-10deg)\n  }\n}\n\n#stripe {\n  animation: stripe-anim 3s linear infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n\n@keyframes stripe-anim {\n  25% {\n    transform: translate(10px, 0) rotate(-10deg)\n  }\n  75% {\n    transform: translateX(10px)\n  }\n}\n\n#bike {\n  animation: bike-anim 6s ease infinite;\n}\n\n@keyframes bike-anim {\n  0% {\n    transform: translateX(-1300px)\n  }\n  50% {\n    transform: translateX(0);\n    animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);\n  }\n  100% {\n    transform: translateX(1300px)\n  }\n}\n\n#rucksack {\n  animation: ruck-anim 3s linear infinite;\n  transform-origin: top;\n  transform-box: fill-box;\n}\n\n@keyframes ruck-anim {\n  50% {\n    transform: rotate(5deg)\n  }\n}\n\n.circle {\n  animation: circle-anim ease infinite;\n  transform-origin: center;\n  transform-box: fill-box;\n  perspective: 0px;\n}\n\n.circle.c1 {\n  animation-duration: 2s\n}\n\n.circle.c2 {\n  animation-duration: 3s\n}\n\n.circle.c3 {\n  animation-duration: 1s\n}\n\n.circle.c4 {\n  animation-duration: 1s\n}\n\n.circle.c5 {\n  animation-duration: 2s\n}\n\n.circle.c6 {\n  animation-duration: 3s\n}\n\n@keyframes circle-anim {\n  50% {\n    transform: scale(.2) rotateX(360deg) rotateY(360deg)\n  }\n}\n\n.four,\n#ou {\n  animation: four-anim cubic-bezier(0.39, 0.575, 0.565, 1) infinite;\n}\n\n.four.a {\n  transform-origin: bottom left;\n  animation-duration: 3s;\n  transform-box: fill-box;\n}\n\n.four.b {\n  transform-origin: bottom right;\n  animation-duration: 3s;\n  transform-box: fill-box;\n}\n\n#ou {\n  animation-duration: 6s;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n\n@keyframes four-anim {\n  50% {\n    transform: scale(.98)\n  }\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 687:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
    mounted: function mounted() {
        var self = this;
        self.$modal.show('404-not-found');
    },

    methods: {
        redirectBack: function redirectBack() {
            var self = this;
            self.$modal.hide('404-not-found');
            self.$router.go(-2);
        },
        goHome: function goHome() {
            var self = this;
            self.$modal.hide('404-not-found');
            self.$router.push({ name: 'home' });
        },
        goShop: function goShop() {
            var self = this;
            self.$modal.hide('404-not-found');
            self.$router.push({ name: 'product.index' });
        }
    }
};

/***/ }),

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal",
    {
      attrs: {
        name: "404-not-found",
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
                                    attrs: {
                                      id: "pillow",
                                      "data-name": "Layer 4"
                                    }
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
                                  {
                                    attrs: { id: "cup", "data-name": "Layer 7" }
                                  },
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
                                    attrs: {
                                      id: "clock",
                                      "data-name": "Layer 8"
                                    }
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
                                  {
                                    attrs: { id: "box", "data-name": "Layer 9" }
                                  },
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
                                  {
                                    attrs: {
                                      id: "bike",
                                      "data-name": "Layer 5"
                                    }
                                  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9Ob3RGb3VuZC52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvTm90Rm91bmQudnVlPzMyNDciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9Ob3RGb3VuZC52dWU/ZGE3ZiIsIndlYnBhY2s6Ly8vTm90Rm91bmQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvTm90Rm91bmQudnVlPzEzYTkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdCQUFnQjtBQUNuRCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxjQUFjOztBQUVsRTtBQUNBOzs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBa007QUFDbE07QUFDQTtBQUNBO0FBQ0EsNENBQThMO0FBQzlMO0FBQ0EsOENBQWlKO0FBQ2pKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxpQkFBaUI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBLFlBQVksdUJBQXVCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ROQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMxQkE7O0FBRUE7QUFDQSxxQ0FBa087QUFDbE87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdKQUFnSixpRkFBaUY7QUFDak8seUpBQXlKLGlGQUFpRjtBQUMxTztBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUNwQkE7QUFDQTs7O0FBR0E7QUFDQSxvREFBcUQsa0JBQWtCLEdBQUcsMkJBQTJCLGtCQUFrQixHQUFHLDJCQUEyQixrQkFBa0IsR0FBRywyQkFBMkIsa0JBQWtCLEdBQUcsMkJBQTJCLGtCQUFrQixHQUFHLCtFQUErRSxrQkFBa0IsR0FBRyxzREFBc0QsaUJBQWlCLEdBQUcsMkJBQTJCLGlCQUFpQixHQUFHLDJCQUEyQixrQkFBa0IsR0FBRyw0QkFBNEIsa0JBQWtCLEdBQUcsNEJBQTRCLGtCQUFrQixHQUFHLDRCQUE0QixrQkFBa0IsR0FBRyw0QkFBNEIsa0JBQWtCLEdBQUcsK0NBQStDLDZEQUE2RCw2QkFBNkIsNEJBQTRCLEdBQUcsMkNBQTJDLE9BQU8sZ0NBQWdDLHVFQUF1RSxHQUFHLFFBQVEsa0NBQWtDLEdBQUcsa0NBQWtDLCtEQUErRCw2QkFBNkIsNEJBQTRCLEdBQUcsa0NBQWtDLCtEQUErRCw2QkFBNkIsNEJBQTRCLEdBQUcsMkNBQTJDLFFBQVEsa0NBQWtDLEdBQUcsNkJBQTZCLCtEQUErRCxnQ0FBZ0MsNEJBQTRCLEdBQUcsMkNBQTJDLE9BQU8saUNBQWlDLEdBQUcsOEJBQThCLGdFQUFnRSw2QkFBNkIsNEJBQTRCLEdBQUcsNENBQTRDLE9BQU8sK0NBQStDLEdBQUcsT0FBTywrQkFBK0IsR0FBRyxHQUFHLHlCQUF5Qiw4RkFBOEYsK0JBQStCLDRCQUE0QixHQUFHLHlDQUF5QyxPQUFPLGlDQUFpQyxHQUFHLDRCQUE0Qiw4REFBOEQsNkJBQTZCLDRCQUE0QixHQUFHLDBDQUEwQyxPQUFPLGlEQUFpRCxPQUFPLGtDQUFrQyxHQUFHLDRCQUE0Qiw4REFBOEQsNkJBQTZCLDRCQUE0QixHQUFHLDBDQUEwQyxPQUFPLHFEQUFxRCxPQUFPLG9DQUFvQyxHQUFHLDBCQUEwQiwwREFBMEQsR0FBRyx3Q0FBd0MsTUFBTSx1Q0FBdUMsT0FBTywrQkFBK0IscUVBQXFFLEdBQUcsUUFBUSxzQ0FBc0MsR0FBRyw4QkFBOEIsNERBQTRELDBCQUEwQiw0QkFBNEIsR0FBRyx3Q0FBd0MsT0FBTyxnQ0FBZ0MsR0FBRyw0QkFBNEIseURBQXlELDZCQUE2Qiw0QkFBNEIscUJBQXFCLEdBQUcsK0JBQStCLDZCQUE2QiwrQkFBK0IsNkJBQTZCLCtCQUErQiw2QkFBNkIsK0JBQStCLDZCQUE2QiwrQkFBK0IsNkJBQTZCLCtCQUErQiw2QkFBNkIsMENBQTBDLE9BQU8sNkRBQTZELEdBQUcsaURBQWlELHNGQUFzRixHQUFHLDRCQUE0QixrQ0FBa0MsMkJBQTJCLDRCQUE0QixHQUFHLDRCQUE0QixtQ0FBbUMsMkJBQTJCLDRCQUE0QixHQUFHLHdCQUF3QiwyQkFBMkIsNkJBQTZCLDRCQUE0QixHQUFHLHdDQUF3QyxPQUFPLDhCQUE4QixHQUFHLFVBQVUsZ0lBQWdJLE1BQU0sVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLE9BQU8sVUFBVSxLQUFLLE1BQU0sVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxNQUFNLFdBQVcsS0FBSyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxNQUFNLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxLQUFLLHF4QkFBcXhCLGdqZkFBZ2pmLGtCQUFrQiwyRUFBMkUsaUJBQWlCLDJCQUEyQix3SEFBd0gsc0JBQXNCLDZHQUE2RyxhQUFhLFlBQVksc0JBQXNCLDZHQUE2RyxzQkFBc0IsWUFBWSxPQUFPLEdBQUcscUNBQXFDLGtCQUFrQixHQUFHLFlBQVksa0JBQWtCLEdBQUcsWUFBWSxrQkFBa0IsR0FBRyxZQUFZLGtCQUFrQixHQUFHLFlBQVksa0JBQWtCLEdBQUcsOEJBQThCLGtCQUFrQixHQUFHLHNCQUFzQixpQkFBaUIsR0FBRyxZQUFZLGlCQUFpQixHQUFHLFlBQVksa0JBQWtCLEdBQUcsYUFBYSxrQkFBa0IsR0FBRyxhQUFhLGtCQUFrQixHQUFHLGFBQWEsa0JBQWtCLEdBQUcsYUFBYSxrQkFBa0IsR0FBRyxnQ0FBZ0MsNkNBQTZDLDZCQUE2Qiw0QkFBNEIsR0FBRyw2QkFBNkIsU0FBUyxnQ0FBZ0MsdUVBQXVFLEtBQUssVUFBVSxvQ0FBb0MsR0FBRyxtQkFBbUIsK0NBQStDLDZCQUE2Qiw0QkFBNEIsR0FBRyxtQkFBbUIsK0NBQStDLDZCQUE2Qiw0QkFBNEIsR0FBRyw2QkFBNkIsVUFBVSxvQ0FBb0MsR0FBRyxjQUFjLCtDQUErQyxnQ0FBZ0MsNEJBQTRCLEdBQUcsNkJBQTZCLFNBQVMsbUNBQW1DLEdBQUcsZUFBZSxnREFBZ0QsNkJBQTZCLDRCQUE0QixHQUFHLDhCQUE4QixTQUFTLCtDQUErQyxLQUFLLFNBQVMsK0JBQStCLEtBQUssR0FBRyxVQUFVLDhFQUE4RSwrQkFBK0IsNEJBQTRCLEdBQUcsMkJBQTJCLFNBQVMsbUNBQW1DLEdBQUcsYUFBYSw4Q0FBOEMsNkJBQTZCLDRCQUE0QixHQUFHLDRCQUE0QixTQUFTLG1EQUFtRCxTQUFTLG9DQUFvQyxHQUFHLGFBQWEsOENBQThDLDZCQUE2Qiw0QkFBNEIsR0FBRyw0QkFBNEIsU0FBUyx1REFBdUQsU0FBUyxzQ0FBc0MsR0FBRyxXQUFXLDBDQUEwQyxHQUFHLDBCQUEwQixRQUFRLHlDQUF5QyxTQUFTLCtCQUErQixxRUFBcUUsS0FBSyxVQUFVLHdDQUF3QyxHQUFHLGVBQWUsNENBQTRDLDBCQUEwQiw0QkFBNEIsR0FBRywwQkFBMEIsU0FBUyxrQ0FBa0MsR0FBRyxhQUFhLHlDQUF5Qyw2QkFBNkIsNEJBQTRCLHFCQUFxQixHQUFHLGdCQUFnQiw2QkFBNkIsZ0JBQWdCLDZCQUE2QixnQkFBZ0IsNkJBQTZCLGdCQUFnQiw2QkFBNkIsZ0JBQWdCLDZCQUE2QixnQkFBZ0IsNkJBQTZCLDRCQUE0QixTQUFTLCtEQUErRCxHQUFHLGlCQUFpQixzRUFBc0UsR0FBRyxhQUFhLGtDQUFrQywyQkFBMkIsNEJBQTRCLEdBQUcsYUFBYSxtQ0FBbUMsMkJBQTJCLDRCQUE0QixHQUFHLFNBQVMsMkJBQTJCLDZCQUE2Qiw0QkFBNEIsR0FBRywwQkFBMEIsU0FBUyxnQ0FBZ0MsR0FBRywrQkFBK0I7O0FBRWh6MUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMwSkE7Ozs7Z0NBRUE7bUJBQ0E7eUJBQ0E7QUFDQTs7OzhDQUVBO3VCQUNBOzZCQUNBOzZCQUNBO0FBQ0E7a0NBQ0E7dUJBQ0E7NkJBQ0E7c0NBQ0E7QUFDQTtrQ0FDQTt1QkFDQTs2QkFDQTtzQ0FDQTtBQUVBO0FBaEJBO0FBTEEsRTs7Ozs7OztBQ2xLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUyxhQUFhLEVBQUU7QUFDakM7QUFDQTtBQUNBO0FBQ0EsYUFBYSx3QkFBd0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsV0FBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsZ0NBQWdDLCtCQUErQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4Q0FBOEM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFdBQVc7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLG9DQUFvQyxTQUFTLHNCQUFzQixFQUFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGVBQWUseUJBQXlCLEVBQUU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsWUFBWSxFQUFFO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTLFVBQVUsRUFBRTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EscUNBQXFDLHlCQUF5QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0EsNkNBQTZDLFNBQVMsbUJBQW1CLEVBQUU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSw2Q0FBNkMsd0JBQXdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSw2Q0FBNkMsd0JBQXdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QyxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSw2Q0FBNkMsd0JBQXdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDLG1DQUFtQztBQUNuQztBQUNBLDZDQUE2QyxTQUFTLGdCQUFnQixFQUFFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBLDZDQUE2QyxTQUFTLGVBQWUsRUFBRTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUyxVQUFVLEVBQUU7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNTM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmJhNjI0MzlcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9Ob3RGb3VuZC52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFtcXFwiZW52XFxcIl0sXFxcInN0YWdlLTJcXFwiXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9Ob3RGb3VuZC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTZiYTYyNDM5XFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vTm90Rm91bmQudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtNmJhNjI0MzlcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxccGFnZXNcXFxcTm90Rm91bmQudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBOb3RGb3VuZC52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNmJhNjI0MzlcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi02YmE2MjQzOVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9Ob3RGb3VuZC52dWVcbi8vIG1vZHVsZSBpZCA9IDU1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDExIiwiLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuICBNb2RpZmllZCBieSBFdmFuIFlvdSBAeXl4OTkwODAzXG4qL1xuXG52YXIgaGFzRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG5cbmlmICh0eXBlb2YgREVCVUcgIT09ICd1bmRlZmluZWQnICYmIERFQlVHKSB7XG4gIGlmICghaGFzRG9jdW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3Z1ZS1zdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudC4gJyArXG4gICAgXCJVc2UgeyB0YXJnZXQ6ICdub2RlJyB9IGluIHlvdXIgV2VicGFjayBjb25maWcgdG8gaW5kaWNhdGUgYSBzZXJ2ZXItcmVuZGVyaW5nIGVudmlyb25tZW50LlwiXG4gICkgfVxufVxuXG52YXIgbGlzdFRvU3R5bGVzID0gcmVxdWlyZSgnLi9saXN0VG9TdHlsZXMnKVxuXG4vKlxudHlwZSBTdHlsZU9iamVjdCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgcGFydHM6IEFycmF5PFN0eWxlT2JqZWN0UGFydD5cbn1cblxudHlwZSBTdHlsZU9iamVjdFBhcnQgPSB7XG4gIGNzczogc3RyaW5nO1xuICBtZWRpYTogc3RyaW5nO1xuICBzb3VyY2VNYXA6ID9zdHJpbmdcbn1cbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHsvKlxuICBbaWQ6IG51bWJlcl06IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIHJlZnM6IG51bWJlcixcbiAgICBwYXJ0czogQXJyYXk8KG9iaj86IFN0eWxlT2JqZWN0UGFydCkgPT4gdm9pZD5cbiAgfVxuKi99XG5cbnZhciBoZWFkID0gaGFzRG9jdW1lbnQgJiYgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSlcbnZhciBzaW5nbGV0b25FbGVtZW50ID0gbnVsbFxudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwXG52YXIgaXNQcm9kdWN0aW9uID0gZmFsc2VcbnZhciBub29wID0gZnVuY3Rpb24gKCkge31cblxuLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4vLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG52YXIgaXNPbGRJRSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9tc2llIFs2LTldXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSlcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFyZW50SWQsIGxpc3QsIF9pc1Byb2R1Y3Rpb24pIHtcbiAgaXNQcm9kdWN0aW9uID0gX2lzUHJvZHVjdGlvblxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIGxpc3QpXG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgICAgZG9tU3R5bGUucmVmcy0tXG4gICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSlcbiAgICB9XG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbmV3TGlzdClcbiAgICAgIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXVxuICAgICAgaWYgKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKClcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMgLyogQXJyYXk8U3R5bGVPYmplY3Q+ICovKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pXG4gICAgICB9XG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIGlmIChkb21TdHlsZS5wYXJ0cy5sZW5ndGggPiBpdGVtLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5sZW5ndGggPSBpdGVtLnBhcnRzLmxlbmd0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHsgaWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0cyB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAoKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJ1xuICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcbiAgcmV0dXJuIHN0eWxlRWxlbWVudFxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICB2YXIgdXBkYXRlLCByZW1vdmVcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlW2RhdGEtdnVlLXNzci1pZH49XCInICsgb2JqLmlkICsgJ1wiXScpXG5cbiAgaWYgKHN0eWxlRWxlbWVudCkge1xuICAgIGlmIChpc1Byb2R1Y3Rpb24pIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGFuZCBpbiBwcm9kdWN0aW9uIG1vZGUuXG4gICAgICAvLyBzaW1wbHkgZG8gbm90aGluZy5cbiAgICAgIHJldHVybiBub29wXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGJ1dCBpbiBkZXYgbW9kZS5cbiAgICAgIC8vIGZvciBzb21lIHJlYXNvbiBDaHJvbWUgY2FuJ3QgaGFuZGxlIHNvdXJjZSBtYXAgaW4gc2VydmVyLXJlbmRlcmVkXG4gICAgICAvLyBzdHlsZSB0YWdzIC0gc291cmNlIG1hcHMgaW4gPHN0eWxlPiBvbmx5IHdvcmtzIGlmIHRoZSBzdHlsZSB0YWcgaXNcbiAgICAgIC8vIGNyZWF0ZWQgYW5kIGluc2VydGVkIGR5bmFtaWNhbGx5LiBTbyB3ZSByZW1vdmUgdGhlIHNlcnZlciByZW5kZXJlZFxuICAgICAgLy8gc3R5bGVzIGFuZCBpbmplY3QgbmV3IG9uZXMuXG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzT2xkSUUpIHtcbiAgICAvLyB1c2Ugc2luZ2xldG9uIG1vZGUgZm9yIElFOS5cbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrK1xuICAgIHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSlcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSlcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKVxuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBtdWx0aS1zdHlsZS10YWcgbW9kZSBpbiBhbGwgb3RoZXIgY2FzZXNcbiAgICBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShvYmopXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcbiAgICAgICAgICBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuICAgICAgICAgIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKVxuICAgIH1cbiAgfVxufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFN0b3JlID0gW11cblxuICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudFxuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpXG4gIH1cbn0pKClcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLmNzc1xuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKVxuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKVxuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXNcbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSlcbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZUVsZW1lbnQsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzc1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWFcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXBcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKVxuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIHNvdXJjZU1hcC5zb3VyY2VzWzBdICsgJyAqLydcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArICcgKi8nXG4gIH1cblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcbi8vIG1vZHVsZSBpZCA9IDU1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEiLCIvKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGxpc3QgZm9ybWF0IHByb2R1Y2VkIGJ5IGNzcy1sb2FkZXIgaW50byBzb21ldGhpbmdcbiAqIGVhc2llciB0byBtYW5pcHVsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGlkOiBwYXJlbnRJZCArICc6JyArIGksXG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDU1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmJhNjI0MzlcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9Ob3RGb3VuZC52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjEyOGVlZjM5XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTZiYTYyNDM5XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vTm90Rm91bmQudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTZiYTYyNDM5XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vTm90Rm91bmQudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTZiYTYyNDM5XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvTm90Rm91bmQudnVlXG4vLyBtb2R1bGUgaWQgPSA2ODVcbi8vIG1vZHVsZSBjaHVua3MgPSAxMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uY2xzLTFbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBmaWxsOiAjZmZjNTQxO1xcbn1cXG4uY2xzLTJbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBmaWxsOiAjNGU0MDY2O1xcbn1cXG4uY2xzLTNbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBmaWxsOiAjNmY1YjkyO1xcbn1cXG4uY2xzLTRbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBmaWxsOiAjZjc4ZDVlO1xcbn1cXG4uY2xzLTVbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBmaWxsOiAjZmE5NzZjO1xcbn1cXG4uY2xzLTZbZGF0YS12LTZiYTYyNDM5XSxcXG4uY2xzLTdbZGF0YS12LTZiYTYyNDM5XSxcXG4uY2xzLThbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBmaWxsOiAjYjY1YzMyO1xcbn1cXG4uY2xzLTEwW2RhdGEtdi02YmE2MjQzOV0sXFxuLmNscy02W2RhdGEtdi02YmE2MjQzOV0ge1xcbiAgb3BhY2l0eTogMC42O1xcbn1cXG4uY2xzLTdbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBvcGFjaXR5OiAwLjQ7XFxufVxcbi5jbHMtOVtkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGZpbGw6ICNmNGI3M2I7XFxufVxcbi5jbHMtMTFbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBmaWxsOiAjZjljMzU4O1xcbn1cXG4uY2xzLTEyW2RhdGEtdi02YmE2MjQzOV0ge1xcbiAgZmlsbDogIzliNDYyYztcXG59XFxuLmNscy0xM1tkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGZpbGw6ICNhYTUxMmU7XFxufVxcbi5jbHMtMTRbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBmaWxsOiAjN2Q2YWE1O1xcbn1cXG5cXG4vKiBhbmltYXRpb25zICovXFxuLndoZWVsW2RhdGEtdi02YmE2MjQzOV0ge1xcbiAgYW5pbWF0aW9uOiB3aGVlbC1yb3RhdGUtZGF0YS12LTZiYTYyNDM5IDZzIGVhc2UgaW5maW5pdGU7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XFxuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcXG59XFxuQGtleWZyYW1lcyB3aGVlbC1yb3RhdGUtZGF0YS12LTZiYTYyNDM5IHtcXG41MCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC41NSwgMC4wODUsIDAuNjgsIDAuNTMpO1xcbn1cXG4xMDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTYwZGVnKVxcbn1cXG59XFxuLmNsb2NrLWhhbmQtMVtkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbjogY2xvY2stcm90YXRlLWRhdGEtdi02YmE2MjQzOSAzcyBsaW5lYXIgaW5maW5pdGU7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XFxuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcXG59XFxuLmNsb2NrLWhhbmQtMltkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbjogY2xvY2stcm90YXRlLWRhdGEtdi02YmE2MjQzOSA2cyBsaW5lYXIgaW5maW5pdGU7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XFxuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcXG59XFxuQGtleWZyYW1lcyBjbG9jay1yb3RhdGUtZGF0YS12LTZiYTYyNDM5IHtcXG4xMDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKVxcbn1cXG59XFxuI2JveC10b3BbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBhbmltYXRpb246IGJveC10b3AtYW5pbS1kYXRhLXYtNmJhNjI0MzkgMnMgbGluZWFyIGluZmluaXRlO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgdG9wO1xcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XFxufVxcbkBrZXlmcmFtZXMgYm94LXRvcC1hbmltLWRhdGEtdi02YmE2MjQzOSB7XFxuNTAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTVkZWcpXFxufVxcbn1cXG4jdW1icmVsbGFbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBhbmltYXRpb246IHVtYnJlbGxhLWFuaW0tZGF0YS12LTZiYTYyNDM5IDZzIGxpbmVhciBpbmZpbml0ZTtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcXG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xcbn1cXG5Aa2V5ZnJhbWVzIHVtYnJlbGxhLWFuaW0tZGF0YS12LTZiYTYyNDM5IHtcXG4yNSUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCkgcm90YXRlKDVkZWcpO1xcbn1cXG43NSUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNWRlZyk7XFxufVxcbn1cXG4jY3VwW2RhdGEtdi02YmE2MjQzOV0ge1xcbiAgYW5pbWF0aW9uOiBjdXAtcm90YXRlLWRhdGEtdi02YmE2MjQzOSAzcyBjdWJpYy1iZXppZXIoMC40NTUsIDAuMDMsIDAuNTE1LCAwLjk1NSkgaW5maW5pdGU7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgbGVmdDtcXG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xcbn1cXG5Aa2V5ZnJhbWVzIGN1cC1yb3RhdGUtZGF0YS12LTZiYTYyNDM5IHtcXG41MCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNWRlZylcXG59XFxufVxcbiNwaWxsb3dbZGF0YS12LTZiYTYyNDM5XSB7XFxuICBhbmltYXRpb246IHBpbGxvdy1hbmltLWRhdGEtdi02YmE2MjQzOSAzcyBsaW5lYXIgaW5maW5pdGU7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XFxuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcXG59XFxuQGtleWZyYW1lcyBwaWxsb3ctYW5pbS1kYXRhLXYtNmJhNjI0Mzkge1xcbjI1JSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDEwZGVnKSB0cmFuc2xhdGVZKDVweClcXG59XFxuNzUlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTEwZGVnKVxcbn1cXG59XFxuI3N0cmlwZVtkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbjogc3RyaXBlLWFuaW0tZGF0YS12LTZiYTYyNDM5IDNzIGxpbmVhciBpbmZpbml0ZTtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcXG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xcbn1cXG5Aa2V5ZnJhbWVzIHN0cmlwZS1hbmltLWRhdGEtdi02YmE2MjQzOSB7XFxuMjUlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTBweCwgMCkgcm90YXRlKC0xMGRlZylcXG59XFxuNzUlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwcHgpXFxufVxcbn1cXG4jYmlrZVtkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbjogYmlrZS1hbmltLWRhdGEtdi02YmE2MjQzOSA2cyBlYXNlIGluZmluaXRlO1xcbn1cXG5Aa2V5ZnJhbWVzIGJpa2UtYW5pbS1kYXRhLXYtNmJhNjI0Mzkge1xcbjAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMzAwcHgpXFxufVxcbjUwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNDcsIDAsIDAuNzQ1LCAwLjcxNSk7XFxufVxcbjEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTMwMHB4KVxcbn1cXG59XFxuI3J1Y2tzYWNrW2RhdGEtdi02YmE2MjQzOV0ge1xcbiAgYW5pbWF0aW9uOiBydWNrLWFuaW0tZGF0YS12LTZiYTYyNDM5IDNzIGxpbmVhciBpbmZpbml0ZTtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IHRvcDtcXG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xcbn1cXG5Aa2V5ZnJhbWVzIHJ1Y2stYW5pbS1kYXRhLXYtNmJhNjI0Mzkge1xcbjUwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDVkZWcpXFxufVxcbn1cXG4uY2lyY2xlW2RhdGEtdi02YmE2MjQzOV0ge1xcbiAgYW5pbWF0aW9uOiBjaXJjbGUtYW5pbS1kYXRhLXYtNmJhNjI0MzkgZWFzZSBpbmZpbml0ZTtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcXG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xcbiAgcGVyc3BlY3RpdmU6IDBweDtcXG59XFxuLmNpcmNsZS5jMVtkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMnNcXG59XFxuLmNpcmNsZS5jMltkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogM3NcXG59XFxuLmNpcmNsZS5jM1tkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMXNcXG59XFxuLmNpcmNsZS5jNFtkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMXNcXG59XFxuLmNpcmNsZS5jNVtkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMnNcXG59XFxuLmNpcmNsZS5jNltkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogM3NcXG59XFxuQGtleWZyYW1lcyBjaXJjbGUtYW5pbS1kYXRhLXYtNmJhNjI0Mzkge1xcbjUwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoLjIpIHJvdGF0ZVgoMzYwZGVnKSByb3RhdGVZKDM2MGRlZylcXG59XFxufVxcbi5mb3VyW2RhdGEtdi02YmE2MjQzOV0sXFxuI291W2RhdGEtdi02YmE2MjQzOV0ge1xcbiAgYW5pbWF0aW9uOiBmb3VyLWFuaW0tZGF0YS12LTZiYTYyNDM5IGN1YmljLWJlemllcigwLjM5LCAwLjU3NSwgMC41NjUsIDEpIGluZmluaXRlO1xcbn1cXG4uZm91ci5hW2RhdGEtdi02YmE2MjQzOV0ge1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogYm90dG9tIGxlZnQ7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDNzO1xcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XFxufVxcbi5mb3VyLmJbZGF0YS12LTZiYTYyNDM5XSB7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b20gcmlnaHQ7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDNzO1xcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XFxufVxcbiNvdVtkYXRhLXYtNmJhNjI0MzldIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNnM7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XFxuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcXG59XFxuQGtleWZyYW1lcyBmb3VyLWFuaW0tZGF0YS12LTZiYTYyNDM5IHtcXG41MCUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKC45OClcXG59XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDOi9Vc2Vycy91cmlhaC9zaXRlcy93d3cvc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL05vdEZvdW5kLnZ1ZT8xNTliMWFiYVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBMExBO0VBQ0EsY0FBQTtDQUNBO0FBRUE7RUFDQSxjQUFBO0NBQ0E7QUFFQTtFQUNBLGNBQUE7Q0FDQTtBQUVBO0VBQ0EsY0FBQTtDQUNBO0FBRUE7RUFDQSxjQUFBO0NBQ0E7QUFFQTs7O0VBR0EsY0FBQTtDQUNBO0FBRUE7O0VBRUEsYUFBQTtDQUNBO0FBRUE7RUFDQSxhQUFBO0NBQ0E7QUFFQTtFQUNBLGNBQUE7Q0FDQTtBQUVBO0VBQ0EsY0FBQTtDQUNBO0FBRUE7RUFDQSxjQUFBO0NBQ0E7QUFFQTtFQUNBLGNBQUE7Q0FDQTtBQUVBO0VBQ0EsY0FBQTtDQUNBOztBQUVBLGdCQUFBO0FBRUE7RUFDQSx5REFBQTtFQUNBLHlCQUFBO0VBQ0Esd0JBQUE7Q0FDQTtBQUVBO0FBQ0E7SUFDQSwwQkFBQTtJQUNBLGlFQUFBO0NBQ0E7QUFDQTtJQUNBLHlCQUFBO0NBQ0E7Q0FDQTtBQUVBO0VBQ0EsMkRBQUE7RUFDQSx5QkFBQTtFQUNBLHdCQUFBO0NBQ0E7QUFFQTtFQUNBLDJEQUFBO0VBQ0EseUJBQUE7RUFDQSx3QkFBQTtDQUNBO0FBRUE7QUFDQTtJQUNBLHlCQUFBO0NBQ0E7Q0FDQTtBQUVBO0VBQ0EsMkRBQUE7RUFDQSw0QkFBQTtFQUNBLHdCQUFBO0NBQ0E7QUFFQTtBQUNBO0lBQ0Esd0JBQUE7Q0FDQTtDQUNBO0FBRUE7RUFDQSw0REFBQTtFQUNBLHlCQUFBO0VBQ0Esd0JBQUE7Q0FDQTtBQUVBO0FBQ0E7SUFDQSx5Q0FBQTtDQUNBO0FBQ0E7SUFDQSx5QkFBQTtDQUNBO0NBQ0E7QUFFQTtFQUNBLDBGQUFBO0VBQ0EsMkJBQUE7RUFDQSx3QkFBQTtDQUNBO0FBRUE7QUFDQTtJQUNBLHdCQUFBO0NBQ0E7Q0FDQTtBQUVBO0VBQ0EsMERBQUE7RUFDQSx5QkFBQTtFQUNBLHdCQUFBO0NBQ0E7QUFFQTtBQUNBO0lBQ0Esd0NBQUE7Q0FDQTtBQUNBO0lBQ0EseUJBQUE7Q0FDQTtDQUNBO0FBRUE7RUFDQSwwREFBQTtFQUNBLHlCQUFBO0VBQ0Esd0JBQUE7Q0FDQTtBQUVBO0FBQ0E7SUFDQSw0Q0FBQTtDQUNBO0FBQ0E7SUFDQSwyQkFBQTtDQUNBO0NBQ0E7QUFFQTtFQUNBLHNEQUFBO0NBQ0E7QUFFQTtBQUNBO0lBQ0EsOEJBQUE7Q0FDQTtBQUNBO0lBQ0EseUJBQUE7SUFDQSwrREFBQTtDQUNBO0FBQ0E7SUFDQSw2QkFBQTtDQUNBO0NBQ0E7QUFFQTtFQUNBLHdEQUFBO0VBQ0Esc0JBQUE7RUFDQSx3QkFBQTtDQUNBO0FBRUE7QUFDQTtJQUNBLHVCQUFBO0NBQ0E7Q0FDQTtBQUVBO0VBQ0EscURBQUE7RUFDQSx5QkFBQTtFQUNBLHdCQUFBO0VBQ0EsaUJBQUE7Q0FDQTtBQUVBO0VBQ0Esc0JBQUE7Q0FDQTtBQUVBO0VBQ0Esc0JBQUE7Q0FDQTtBQUVBO0VBQ0Esc0JBQUE7Q0FDQTtBQUVBO0VBQ0Esc0JBQUE7Q0FDQTtBQUVBO0VBQ0Esc0JBQUE7Q0FDQTtBQUVBO0VBQ0Esc0JBQUE7Q0FDQTtBQUVBO0FBQ0E7SUFDQSxvREFBQTtDQUNBO0NBQ0E7QUFFQTs7RUFFQSxrRkFBQTtDQUNBO0FBRUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0Esd0JBQUE7Q0FDQTtBQUVBO0VBQ0EsK0JBQUE7RUFDQSx1QkFBQTtFQUNBLHdCQUFBO0NBQ0E7QUFFQTtFQUNBLHVCQUFBO0VBQ0EseUJBQUE7RUFDQSx3QkFBQTtDQUNBO0FBRUE7QUFDQTtJQUNBLHFCQUFBO0NBQ0E7Q0FDQVwiLFwiZmlsZVwiOlwiTm90Rm91bmQudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjx0ZW1wbGF0ZT5cXG48bW9kYWwgbmFtZT1cXFwiNDA0LW5vdC1mb3VuZFxcXCIgOmFkYXB0aXZlPVxcXCJ0cnVlXFxcIiB3aWR0aD1cXFwiMTAwJVxcXCIgaGVpZ2h0PVxcXCIxMDAlXFxcIiA6Y2xpY2tUb0Nsb3NlPVxcXCJmYWxzZVxcXCI+XFxuICAgICAgICA8di1jYXJkIDpmbGF0PVxcXCJ0cnVlXFxcIj5cXG4gICAgICAgIDx2LXRvb2xiYXIgY2xhc3M9XFxcImFjY2VudFxcXCI+XFxuICAgICAgICAgIDx2LWJ0biBpY29uIEBjbGljay5uYXRpdmU9XFxcInJlZGlyZWN0QmFjaygpXFxcIj5cXG4gICAgICAgICAgICA8di1pY29uIGNsYXNzPVxcXCJwcmltYXJ5LS10ZXh0XFxcIj5hcnJvd19iYWNrPC92LWljb24+XFxuICAgICAgICAgIDwvdi1idG4+XFxuICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxcbiAgICAgICAgICA8di10b29sYmFyLXRpdGxlIGNsYXNzPVxcXCJ0ZXh0LXhzLWNlbnRlciBwcmltYXJ5LS10ZXh0XFxcIj5QQUdFIE5PVCBGT1VORDwvdi10b29sYmFyLXRpdGxlPlxcbiAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cXG4gICAgICAgICAgPHYtdG9vbGJhci1pdGVtcz5cXG4gICAgICAgICAgICA8di1idG4gY2xhc3M9XFxcInByaW1hcnktLXRleHRcXFwiIGZsYXQgQGNsaWNrLm5hdGl2ZT1cXFwiZ29Ib21lKClcXFwiPjx2LWljb24gcmlnaHQgZGFyaz5ob21lPC92LWljb24+PC92LWJ0bj5cXG4gICAgICAgICAgPC92LXRvb2xiYXItaXRlbXM+XFxuICAgICAgICA8L3YtdG9vbGJhcj5cXG4gICAgICAgIDx2LWNhcmQtdGV4dCBzdHlsZT1cXFwicGFkZGluZy10b3A6MTAwcHg7XFxcIj5cXG4gICAgICA8di1jb250YWluZXIgZmx1aWQ+XFxuICAgICAgICA8di1sYXlvdXQgcm93PlxcbiAgICAgICAgICA8di1mbGV4IHgxMiBzbTEyIG1kNCBvZmZzZXQtbWQ0IGxnNCBvZmZzZXQtbGc0IHhsNCBvZmZzZXQteGw0PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndyYXBwZXJcXFwiPlxcbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgdmlld0JveD1cXFwiMCAwIDE5MjAgMTA4MFxcXCI+XFxuICAgICAgICAgICAgICAgIDx0aXRsZT40MDQ8L3RpdGxlPlxcbiAgICAgICAgICAgICAgICA8ZyBpZD1cXFwiTGF5ZXJfMTIgeWVsbG93LWJhY2stZmlnXFxcIiBkYXRhLW5hbWU9XFxcIkxheWVyIDEyXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTFcXFwiIGQ9XFxcIk02MDAuODcsODcySDE1NmE0LDQsMCwwLDAtMy43OCw0LjE5aDBhNCw0LDAsMCwwLDMuNzgsNC4xOUg2MDAuODdhNCw0LDAsMCwwLDMuNzgtNC4xOWgwQTQsNCwwLDAsMCw2MDAuODcsODcyWlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVxcXCJjbHMtMVxcXCIgeD1cXFwiNjgwLjkxXFxcIiB5PVxcXCI4NzEuOThcXFwiIHdpZHRoPVxcXCI1MTMuMzhcXFwiIGhlaWdodD1cXFwiOC4zOVxcXCIgcng9XFxcIjQuMTlcXFwiIHJ5PVxcXCI0LjE5XFxcIi8+XFxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy0xXFxcIiBkPVxcXCJNMTQ4MCw4NzYuMTdoMGMwLDIuMzIsMi4zNyw0LjE5LDUuMyw0LjE5aDM1MC42MWMyLjkzLDAsNS4zLTEuODgsNS4zLTQuMTloMGMwLTIuMzItMi4zNy00LjE5LTUuMy00LjE5SDE0ODUuMjZDMTQ4Mi4zMyw4NzIsMTQ4MCw4NzMuODYsMTQ4MCw4NzYuMTdaXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XFxcImNscy0xXFxcIiB4PVxcXCI0OTIuMjFcXFwiIHk9XFxcIjkyMC42NFxcXCIgd2lkdGg9XFxcIjI0OS44XFxcIiBoZWlnaHQ9XFxcIjguMzlcXFwiIHJ4PVxcXCI0LjE5XFxcIiByeT1cXFwiNC4xOVxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJjbHMtMVxcXCIgZD1cXFwiTTE1NDkuMTQsOTI0Ljg0aDBhNC4xOSw0LjE5LDAsMCwwLTQuMTktNC4xOUgxMDY3LjQ2YTE0LjY2LDE0LjY2LDAsMCwxLC4zNSwzLjIxdjFBNC4xOSw0LjE5LDAsMCwwLDEwNzIsOTI5aDQ3Mi45NEE0LjE5LDQuMTksMCwwLDAsMTU0OS4xNCw5MjQuODRaXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy0xXFxcIiBkPVxcXCJNODY1LjUsOTI0Ljg0aDBhNC4xOSw0LjE5LDAsMCwwLDQuMTksNC4xOWg4Mi4zN2ExMi4yOCwxMi4yOCwwLDAsMS0uMTktMnYtMi4xN2E0LjE5LDQuMTksMCwwLDAtNC4xOS00LjE5aC03OEE0LjE5LDQuMTksMCwwLDAsODY1LjUsOTI0Ljg0WlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVxcXCJjbHMtMVxcXCIgeD1cXFwiOTE1LjZcXFwiIHk9XFxcIjk4MS40N1xcXCIgd2lkdGg9XFxcIjU0LjcyXFxcIiBoZWlnaHQ9XFxcIjguMzlcXFwiIHJ4PVxcXCI0LjE5XFxcIiByeT1cXFwiNC4xOVxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJjbHMtMVxcXCIgZD1cXFwiTTczMC4zMyw5ODUuNjdoMGMwLDIuMzIsNC4yMyw0LjE5LDkuNDQsNC4xOWgxMDQuM2M1LjIyLDAsOS40NC0xLjg4LDkuNDQtNC4xOWgwYzAtMi4zMi00LjIzLTQuMTktOS40NC00LjE5SDczOS43OEM3MzQuNTYsOTgxLjQ3LDczMC4zMyw5ODMuMzUsNzMwLjMzLDk4NS42N1pcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cXFwiY2xzLTFcXFwiIHg9XFxcIjk5Ny4wNlxcXCIgeT1cXFwiOTgxLjQ3XFxcIiB3aWR0aD1cXFwiNzguMTFcXFwiIGhlaWdodD1cXFwiOC4zOVxcXCIgcng9XFxcIjQuMTlcXFwiIHJ5PVxcXCI0LjE5XFxcIi8+XFxuXFxuICAgICAgICAgICAgICAgIDxnIGlkPVxcXCJyb3VuZC1jb25mXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTEgY2lyY2xlIGMxXFxcIiBkPVxcXCJNNTM2LjQxLDE1NS4xNGExNy43NywxNy43NywwLDEsMCwxNy43NywxNy43N0ExNy43NywxNy43NywwLDAsMCw1MzYuNDEsMTU1LjE0Wm0wLDI4LjY4YTEwLjksMTAuOSwwLDEsMSwxMC45LTEwLjlBMTAuOSwxMC45LDAsMCwxLDUzNi40MSwxODMuODFaXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy0xIGNpcmNsZSBjMlxcXCIgZD1cXFwiTTEzNDUuMDksODIuNDRhMTcuNzcsMTcuNzcsMCwxLDAsMTcuNzcsMTcuNzdBMTcuNzcsMTcuNzcsMCwwLDAsMTM0NS4wOSw4Mi40NFptMCwyOC42OGExMC45LDEwLjksMCwxLDEsMTAuOS0xMC45QTEwLjksMTAuOSwwLDAsMSwxMzQ1LjA5LDExMS4xMlpcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTEgY2lyY2xlIGMzXFxcIiBkPVxcXCJNNzAuMTIsMzYzQTE3Ljc3LDE3Ljc3LDAsMSwwLDg3Ljg5LDM4MC44LDE3Ljc3LDE3Ljc3LDAsMCwwLDcwLjEyLDM2M1ptMCwyOC42OEExMC45LDEwLjksMCwxLDEsODEsMzgwLjgsMTAuOSwxMC45LDAsMCwxLDcwLjEyLDM5MS43WlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJjbHMtMSBjaXJjbGUgYzRcXFwiIGQ9XFxcIk0xNzAuNDcsNzUxLjgyYTE3Ljc3LDE3Ljc3LDAsMSwwLDE3Ljc3LDE3Ljc3QTE3Ljc3LDE3Ljc3LDAsMCwwLDE3MC40Nyw3NTEuODJabTAsMjguNjhhMTAuOSwxMC45LDAsMSwxLDEwLjktMTAuOUExMC45LDEwLjksMCwwLDEsMTcwLjQ3LDc4MC41WlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJjbHMtMSBjaXJjbGUgYzVcXFwiIGQ9XFxcIk0xNDU3LjM0LDc2Mi43M2ExNy43NywxNy43NywwLDEsMCwxNy43NywxNy43N0ExNy43NywxNy43NywwLDAsMCwxNDU3LjM0LDc2Mi43M1ptMCwyOC42OGExMC45LDEwLjksMCwxLDEsMTAuOS0xMC45QTEwLjksMTAuOSwwLDAsMSwxNDU3LjM0LDc5MS40WlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJjbHMtMSBjaXJjbGUgYzZcXFwiIGQ9XFxcIk0xODI5LjE1LDQwNy40OWExNy43NywxNy43NywwLDEsMCwxNy43NywxNy43N0ExNy43NywxNy43NywwLDAsMCwxODI5LjE1LDQwNy40OVptMCwyOC42OGExMC45LDEwLjksMCwxLDEsMTAuOS0xMC45QTEwLjksMTAuOSwwLDAsMSwxODI5LjE1LDQzNi4xN1pcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgICAgIDwvZz5cXG4gICAgICAgICAgICAgICAgPGcgaWQ9XFxcImZvcnR5Zm91clxcXCIgZGF0YS1uYW1lPVxcXCJMYXllciAyXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZyBjbGFzcz1cXFwiZm91ciBhXFxcIj5cXG5cXG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVxcXCJjbHMtMlxcXCIgeD1cXFwiMjMzLjc0XFxcIiB5PVxcXCIzOTEuMTRcXFwiIHdpZHRoPVxcXCIxMjAuNzFcXFwiIGhlaWdodD1cXFwiNDY2LjI5XFxcIiByeD1cXFwiNTcuMVxcXCIgcnk9XFxcIjU3LjFcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKDkxOC4zOSAzMzAuMTkpIHJvdGF0ZSg5MClcXFwiLz5cXG5cXG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVxcXCJjbHMtM1xcXCIgeD1cXFwiMzMzLjgzXFxcIiB5PVxcXCI0NzUuMVxcXCIgd2lkdGg9XFxcIjEyMC43MVxcXCIgaGVpZ2h0PVxcXCIzOTYuODhcXFwiIHJ4PVxcXCI2MC4zNlxcXCIgcnk9XFxcIjYwLjM2XFxcIi8+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cXFwiY2xzLTNcXFwiIHg9XFxcIjE5Ny4xM1xcXCIgeT1cXFwiMTIyLjg5XFxcIiB3aWR0aD1cXFwiMTIwLjcxXFxcIiBoZWlnaHQ9XFxcIjYwNC43NVxcXCIgcng9XFxcIjYwLjM2XFxcIiByeT1cXFwiNjAuMzZcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKDI5MC40OSAtNzAuNzgpIHJvdGF0ZSgzNSlcXFwiLz5cXG5cXG4gICAgICAgICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgICAgICAgPGcgY2xhc3M9XFxcImZvdXIgYlxcXCI+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cXFwiY2xzLTJcXFwiIHg9XFxcIjE1NTguODRcXFwiIHk9XFxcIjM5MS45MVxcXCIgd2lkdGg9XFxcIjEyMC43MVxcXCIgaGVpZ2h0PVxcXCI0NjYuMjlcXFwiIHJ4PVxcXCI1Ny4xXFxcIiByeT1cXFwiNTcuMVxcXCIgdHJhbnNmb3JtPVxcXCJ0cmFuc2xhdGUoMjI0NC4yNiAtOTk0LjE0KSByb3RhdGUoOTApXFxcIi8+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cXFwiY2xzLTNcXFwiIHg9XFxcIjE2NTguOTJcXFwiIHk9XFxcIjQ3NS44N1xcXCIgd2lkdGg9XFxcIjEyMC43MVxcXCIgaGVpZ2h0PVxcXCIzOTYuODhcXFwiIHJ4PVxcXCI2MC4zNlxcXCIgcnk9XFxcIjYwLjM2XFxcIi8+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cXFwiY2xzLTNcXFwiIHg9XFxcIjE1MjIuMjJcXFwiIHk9XFxcIjEyMy42NlxcXCIgd2lkdGg9XFxcIjEyMC43MVxcXCIgaGVpZ2h0PVxcXCI2MDQuNzVcXFwiIHJ4PVxcXCI2MC4zNlxcXCIgcnk9XFxcIjYwLjM2XFxcIiB0cmFuc2Zvcm09XFxcInRyYW5zbGF0ZSg1MzAuNTcgLTgzMC42OCkgcm90YXRlKDM1KVxcXCIvPlxcblxcbiAgICAgICAgICAgICAgICAgIDwvZz5cXG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTNcXFwiIGlkPVxcXCJvdVxcXCIgZD1cXFwiTTk1Ni41NCwxNjguMmMtMTk0LjM0LDAtMzUxLjg5LDE1Ny41NS0zNTEuODksMzUxLjg5Uzc2Mi4xOSw4NzIsOTU2LjU0LDg3MnMzNTEuODktMTU3LjU1LDM1MS44OS0zNTEuODlTMTE1MC44OCwxNjguMiw5NTYuNTQsMTY4LjJabTAsNTg0LjQ5Yy0xMjguNDYsMC0yMzIuNi0xMDQuMTQtMjMyLjYtMjMyLjZzMTA0LjE0LTIzMi42LDIzMi42LTIzMi42LDIzMi42LDEwNC4xNCwyMzIuNiwyMzIuNlMxMDg1LDc1Mi42OSw5NTYuNTQsNzUyLjY5WlxcXCIvPlxcbiAgICAgICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgICAgIDxnIGlkPVxcXCJ1bWJyZWxsYVxcXCIgZGF0YS1uYW1lPVxcXCJMYXllciAzXFxcIj5cXG4gICAgICAgICAgICAgICAgICA8Zz5cXG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XFxcImNscy00XFxcIiBjeD1cXFwiMTE4Ny41M1xcXCIgY3k9XFxcIjI0MC4zXFxcIiByPVxcXCI3LjY2XFxcIiB0cmFuc2Zvcm09XFxcInRyYW5zbGF0ZSgyMzYuMzYgOTkwLjgpIHJvdGF0ZSgtNDkuNzEpXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8Zz5cXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy01XFxcIiBkPVxcXCJNMTIxOS41NiwzNTkuNjdsNTUsMTAwLjUyYzMyLjctNDguNDgtNi44Ny0xNDIuNDMtOTEuNzUtMjE0LjM4LTg0LjQxLTcxLjU1LTE4My05NS4zMy0yMjUuODEtNTZsMTE0LjIxLDQ0LjE0WlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTZcXFwiIGQ9XFxcIk0xMTgyLjc5LDI0NS44MWMtODQuNDEtNzEuNTUtMTgzLTk1LjMzLTIyNS44MS01NmwxMTQuMjEsNDQuMTRaXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPVxcXCJjbHMtN1xcXCIgcG9pbnRzPVxcXCIxMTgyLjc5IDI0NS44MSAxMDcxLjE5IDIzMy45MSAxMjE5LjU2IDM1OS42NyAxMTgyLjc5IDI0NS44MVxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgPC9nPlxcbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9XFxcImNscy04XFxcIiBwb2ludHM9XFxcIjExODAuOTEgNDA5LjAyIDEyNzQuNTQgNDYwLjE5IDEyMTkuNTYgMzU5LjY3IDEwNzEuMTkgMjMzLjkxIDk1Ni45OCAxODkuNzYgMTAyMS45NSAyNzQuMjkgMTE4MC45MSA0MDkuMDJcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgIDxnPlxcbiAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cXFwiY2xzLTRcXFwiIHg9XFxcIjk5Ny40NVxcXCIgeT1cXFwiMzU4LjM1XFxcIiB3aWR0aD1cXFwiMTc1LjU4XFxcIiBoZWlnaHQ9XFxcIjUuMVxcXCIgdHJhbnNmb3JtPVxcXCJ0cmFuc2xhdGUoMTA4LjIxIDk1NS4zOCkgcm90YXRlKC00OS43MSlcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XFxcImNscy00XFxcIiB4PVxcXCIxMDI4LjA5XFxcIiB5PVxcXCIzOTkuMzZcXFwiIHdpZHRoPVxcXCIyMS40NlxcXCIgaGVpZ2h0PVxcXCIzMi4yN1xcXCIgcng9XFxcIjEwLjczXFxcIiByeT1cXFwiMTAuNzNcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKDUxNS4wNCAtNTczLjE2KSByb3RhdGUoNDAuMjkpXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgICAgICAgPC9nPlxcbiAgICAgICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgICAgIDxnIGlkPVxcXCJwaWxsb3dcXFwiIGRhdGEtbmFtZT1cXFwiTGF5ZXIgNFxcXCI+XFxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy0xXFxcIiBkPVxcXCJNNzU0LDYyNy4wN2M3LC41NCwxMi45Mi0yLjgyLDEzLjM1LTcuNTlzLTQuOTUtOS4yNC0xMi05Ljg3YTE4LjU1LDE4LjU1LDAsMCwwLTIuMTcsMGwtNzQuOS04MS42NGMwLS4xLDAtLjE5LDAtLjI5LDAtNy4wOS00LTEyLjgzLTguOC0xMi44MXMtOC43NSw1Ljc3LTguNzMsMTIuODdjMCwwLDAsLjA5LDAsLjEzbC01MC4yMSw0Ni4wN2gtLjA5Yy03LjA2LS42My0xMy4xNCwyLjc3LTEzLjU3LDcuNTlzNC44Nyw5LjE2LDExLjg1LDkuODRsNzYuMDgsODIuOTJzMCwwLDAsLjA2YzAsNy4wOSw0LDEyLjgzLDguOCwxMi44MXM4LjY1LTUuNjYsOC43MS0xMi42NVpcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTlcXFwiIGQ9XFxcIk02NjkuNDYsNTE0LjgyYy00Ljc3LS44My04Ljc1LDUuNzctOC43MywxMi44NywwLDAsMCwuMDksMCwuMTNsLTUwLjIxLDQ2LjA3aC0uMDljLTcuMDYtLjYzLTEzLjE0LDIuNzctMTMuNTcsNy41OXM0Ljg3LDkuMTYsMTEuODUsOS44NGw3Ni4wOCw4Mi45MnMwLDAsMCwuMDZjMCw3LjA5LDQsMTIuODMsOC44LDEyLjgxczguNjUtNS42Niw4LjcxLTEyLjY1QzU3MC41NSw1NzMsNzAyLjA3LDUyMC40Nyw2NjkuNDYsNTE0LjgyWlxcXCIvPlxcbiAgICAgICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgICAgIDxnIGlkPVxcXCJjdXBcXFwiIGRhdGEtbmFtZT1cXFwiTGF5ZXIgN1xcXCI+XFxuICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9XFxcImNscy0xXFxcIiBwb2ludHM9XFxcIjExNzMuNjkgNzQ4LjIxIDExNDAuNTIgNzE1LjQyIDExOTUuNzkgNjQ3LjM1IDEyNDEuMTMgNjkyLjE2IDExNzMuNjkgNzQ4LjIxXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9XFxcImNscy04XFxcIiBwb2ludHM9XFxcIjExNzMuNjkgNzQ4LjIxIDExNDAuNTIgNzE1LjQyIDExNDMuOTMgNzExLjI3IDExNzcuODEgNzQ0Ljc1IDExNzMuNjkgNzQ4LjIxXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9XFxcImNscy01XFxcIiBwb2ludHM9XFxcIjExOTQuNjggNzMxLjQ2IDExNTcuMDQgNjk0LjI0IDExODMuOCA2NjEuNyAxMjI2LjkxIDcwNC4zMiAxMTk0LjY4IDczMS40NlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxnIGNsYXNzPVxcXCJjbHMtMTBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy04XFxcIiBkPVxcXCJNMTE3Ni4zMiw2NjcuNzhoMGE0LjE5LDQuMTksMCwwLDEsNC4xOSw0LjE5djMzLjU0YTAsMCwwLDAsMSwwLDBoLTguMzhhMCwwLDAsMCwxLDAsMFY2NzJhNC4xOSw0LjE5LDAsMCwxLDQuMTktNC4xOVpcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKDgyMi41MyAtNjI4LjY3KSByb3RhdGUoNDQuNjcpXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLThcXFwiIGQ9XFxcIk0xMTcyLjczLDcwOS43bDIzLjU4LTIzLjg1YTQuMTksNC4xOSwwLDAsMSw1LjkyLDBoMGE0LjE5LDQuMTksMCwwLDEsMCw1LjkybC0yMy41OCwyMy44NVpcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJjbHMtOFxcXCIgZD1cXFwiTTExODUuMTEsNzIyLjA5bDIzLjU4LTIzLjg1YTQuMTksNC4xOSwwLDAsMSw1LjkyLDBoMGE0LjE5LDQuMTksMCwwLDEsMCw1LjkyTDExOTEuMDYsNzI4WlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDwvZz5cXG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTVcXFwiIGQ9XFxcIk0xMTk3Ljg1LDY2MC41aDQ1LjY5YTUuNyw1LjcsMCwwLDEsNS43LDUuN3Y4LjMyYTAsMCwwLDAsMSwwLDBoLTU3LjA5YTAsMCwwLDAsMSwwLDB2LTguMzJBNS43LDUuNywwLDAsMSwxMTk3Ljg1LDY2MC41WlxcXCIgdHJhbnNmb3JtPVxcXCJ0cmFuc2xhdGUoODI5LjUzIC02NjcuNjYpIHJvdGF0ZSg0NSlcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLThcXFwiIGQ9XFxcIk0xMTkxLjQ5LDY2NC43NGg1My45NGE1LjI1LDUuMjUsMCwwLDEsNS4yNSw1LjI1djQuNzlhMCwwLDAsMCwxLDAsMGgtNjQuNDRhMCwwLDAsMCwxLDAsMFY2NzBhNS4yNSw1LjI1LDAsMCwxLDUuMjUtNS4yNVpcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKDgyMi44MyAtNjYzLjE3KSByb3RhdGUoNDQuNjcpXFxcIi8+XFxuICAgICAgICAgICAgICAgIDwvZz5cXG4gICAgICAgICAgICAgICAgPGcgaWQ9XFxcImNsb2NrXFxcIiBkYXRhLW5hbWU9XFxcIkxheWVyIDhcXFwiPlxcblxcbiAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XFxcImNscy01XFxcIiBjeD1cXFwiODQ3LjdcXFwiIGN5PVxcXCIyNDcuNTlcXFwiIHI9XFxcIjc0LjY2XFxcIiB0cmFuc2Zvcm09XFxcInRyYW5zbGF0ZSgtMzIuOTEgMzE0LjA1KSByb3RhdGUoLTIwLjYpXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz1cXFwiY2xzLTFcXFwiIGN4PVxcXCI4NDcuN1xcXCIgY3k9XFxcIjI0Ny41OVxcXCIgcj1cXFwiNjMuNDRcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKC0zMi45MSAzMTQuMDUpIHJvdGF0ZSgtMjAuNilcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cXFwiY2xzLTMgY2xvY2staGFuZC0xXFxcIiB4PVxcXCI4NDVcXFwiIHk9XFxcIjE4OS41XFxcIiB3aWR0aD1cXFwiNi4wNFxcXCIgaGVpZ2h0PVxcXCI1OFxcXCIgcng9XFxcIjMuMDJcXFwiIHJ5PVxcXCIzLjAyXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVxcXCJjbHMtMyBjbG9jay1oYW5kLTJcXFwiIHg9XFxcIjg0NVxcXCIgeT1cXFwiMjA5LjVcXFwiIHdpZHRoPVxcXCI2LjA0XFxcIiBoZWlnaHQ9XFxcIjM4XFxcIiByeD1cXFwiMy4wMlxcXCIgcnk9XFxcIjMuMDJcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKDE2MTEuMjIgLTIzMC40KSByb3RhdGUoMTMwLjQpXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XFxcImNscy0zXFxcIiBjeD1cXFwiODQ3LjdcXFwiIGN5PVxcXCIyNDcuNTlcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKC0zMi45MSAzMTQuMDUpIHJvdGF0ZSgtMjAuNilcXFwiIHI9XFxcIjNcXFwiIC8+XFxuICAgICAgICAgICAgICAgIDwvZz5cXG4gICAgICAgICAgICAgICAgPGcgaWQ9XFxcImJveFxcXCIgZGF0YS1uYW1lPVxcXCJMYXllciA5XFxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZyBpZD1cXFwiYm94LXRvcFxcXCI+PHBvbHlnb24gY2xhc3M9XFxcImNscy04XFxcIiBwb2ludHM9XFxcIjU2OS43MSAzODIuMjggNjUzLjc0IDMyOS4zOSA3NDcuMTMgMzIwLjEgNjc5LjIgMzY5Ljg1IDU2OS43MSAzODIuMjhcXFwiPjwvcG9seWdvbj5cXG4gICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz1cXFwiY2xzLTVcXFwiIHBvaW50cz1cXFwiNjkxLjk1IDM2Ny4yIDU3MC44NyAzOTIuMzQgNTY1LjMyIDM4My4zNSA2ODcuOCAzNTcuNDUgNjkxLjk1IDM2Ny4yXFxcIj48L3BvbHlnb24+XFxuXFxuICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9XFxcImNscy01XFxcIiBwb2ludHM9XFxcIjY2MS41NCAzMzcuNDggNTcwLjg3IDM5Mi4zNCA1NjIuNDIgMzc4LjkyIDY1Mi4yNSAzMjIuMzggNjU4LjEyIDMyMS4zNCA2NjEuNTQgMzM3LjQ4XFxcIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9XFxcImNscy03XFxcIiBwb2ludHM9XFxcIjY2MS41NCAzMzcuNDggNTcwLjg3IDM5Mi4zNCA1NjIuNDIgMzc4LjkyIDY1Mi4yNSAzMjIuMzggNjU4LjEyIDMyMS4zNCA2NjEuNTQgMzM3LjQ4XFxcIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9XFxcImNscy01XFxcIiBwb2ludHM9XFxcIjc0Ny4xMyAzMjAuMSA2NjEuNTQgMzM3LjQ4IDY1Mi4yNSAzMjIuMzggNzM4LjQgMzA3LjEgNzQ3LjEzIDMyMC4xXFxcIj48L3BvbHlnb24+XFxuICAgICAgICAgICAgICAgICAgPC9nPlxcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy01XFxcIiBkPVxcXCJNNTg4LjI4LDQyMC4yNnMzLjQ0LDUuMiw1LjE5LDhsNDMuMSw2OC40OCwxNTguODEtMTAwLTQzLjEtNjguNDhxLTIuNjMtNC4xNy01LjQ3LThaXFxcIj48L3BhdGg+XFxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTdcXFwiIGQ9XFxcIk01ODguMjgsNDIwLjI2czMuNDQsNS4yLDUuMTksOGw0My4xLDY4LjQ4LDE1OC44MS0xMDAtNDMuMS02OC40OHEtMi42My00LjE3LTUuNDctOFpcXFwiPjwvcGF0aD5cXG4gICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cXFwiY2xzLTVcXFwiIHg9XFxcIjY5My43M1xcXCIgeT1cXFwiMzM1LjUxXFxcIiB3aWR0aD1cXFwiODMuOTlcXFwiIGhlaWdodD1cXFwiOTAuNThcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKC04OS43OCA0NTAuNDMpIHJvdGF0ZSgtMzIuMTkpXFxcIj48L3JlY3Q+XFxuICAgICAgICAgICAgICAgIDwvZz5cXG5cXG4gICAgICAgICAgICAgICAgPGcgaWQ9XFxcInJ1Y2tzYWNrXFxcIiBkYXRhLW5hbWU9XFxcIkxheWVyIDZcXFwiPlxcbiAgICAgICAgICAgICAgICAgIDxnIGlkPVxcXCJzdHJpcGVcXFwiPjxwYXRoIGNsYXNzPVxcXCJjbHMtMTJcXFwiIGQ9XFxcIk0xMjAwLjMyLDQ3My45MWgwYTEzLjc0LDEzLjc0LDAsMCwwLTE4LjQxLDcuNDRsLTU1LDEyOS44NmExNC44MiwxNC44MiwwLDAsMCw3LjEzLDE5LjIxaDBhMTMuNzQsMTMuNzQsMCwwLDAsMTguNDEtNy40NGw1NS0xMjkuODZBMTQuODIsMTQuODIsMCwwLDAsMTIwMC4zMiw0NzMuOTFaXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy0xM1xcXCIgZD1cXFwiTTEyMDIuMTgsNjA2LjM0aDBhMTQsMTQsMCwwLDAtMTYuMTgtMTEuOGwtNDguODMsOWMtNy41OSwxLjQtMTIuNjYsOS0xMS4zMSwxNi44OWgwYTE0LDE0LDAsMCwwLDE2LjE4LDExLjhsNDguODMtOUMxMTk4LjQ2LDYyMS44MiwxMjAzLjUzLDYxNC4yNiwxMjAyLjE4LDYwNi4zNFpcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy04XFxcIiBkPVxcXCJNMTMwMC44Niw2MDNsLTEyMi45MywyMi43NC0xNS40NC05MC45MWMtNS43NS0zMy44NiwxNS44OS02Ni4xNyw0OC4zNC03Mi4xOGwxMS41OC0yLjA4YzMyLjQ1LTYsNTcuMjYsMTcuNjYsNjMsNTEuNTFaXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy0xXFxcIiBkPVxcXCJNMTMwNyw2MDEuOTFsLTExMi4zMiwyMC43OC0xNS45LTkzLjYxYy01LjUtMzIuMzYsMTUuMTktNjMuMjUsNDYuMi02OWgwYzMxLTUuNzQsNjAuNjIsMTUuODUsNjYuMTIsNDguMjFaXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy04XFxcIiBkPVxcXCJNMTI5Ni43Niw2MDMuOCwxMjE1LDYxOC45MmwtNC44OS0yOC43N2MtMi4xMS0xMi40Miw1LjgzLTI0LjI3LDE3LjczLTI2LjQ3bDM4LjY3LTcuMTVjMTEuOS0yLjIsMjMuMjYsNi4wOCwyNS4zNywxOC41WlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJjbHMtNVxcXCIgZD1cXFwiTTEyOTYuNzYsNjAzLjhsLTczLjQxLDEzLjU4LTQuOTItMjljLTItMTEuNjIsNS40NS0yMi43MiwxNi42LTI0Ljc4bDMzLjA3LTYuMTJjMTEuMTQtMi4wNiwyMS43Nyw1LjY5LDIzLjc1LDE3LjMyWlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJjbHMtNFxcXCIgZD1cXFwiTTEyMzEuNzcsNDY5LjY5bC0xMy40MiwyLjQ4YTEwLjI1LDEwLjI1LDAsMCwwLTgsMTEuOTJsMi4zOCwxNGE5LjksOS45LDAsMCwwLDExLjQyLDguMzNsMTMuNDItMi40OGExMC4yNSwxMC4yNSwwLDAsMCw4LTExLjkybC0yLjM4LTE0QTkuOSw5LjksMCwwLDAsMTIzMS43Nyw0NjkuNjlabTcuMTcsMjAuODRhNi4zOSw2LjM5LDAsMCwxLTUsNy40M2wtOC4zNiwxLjU1YTYuMTcsNi4xNywwLDAsMS03LjEyLTUuMTlsLTEuNDgtOC43M2E2LjM5LDYuMzksMCwwLDEsNS03LjQzbDguMzYtMS41NWE2LjE3LDYuMTcsMCwwLDEsNy4xMiw1LjE5WlxcXCIvPlxcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVxcXCJjbHMtMTRcXFwiIGQ9XFxcIk0xMjMzLjc0LDQ3MS4xM2wtMTMuNDIsMi40OGExMC4yNSwxMC4yNSwwLDAsMC04LDExLjkybDIuMzgsMTRhOS45LDkuOSwwLDAsMCwxMS40Miw4LjMzbDEzLjQyLTIuNDhhMTAuMjUsMTAuMjUsMCwwLDAsOC0xMS45MmwtMi4zOC0xNEE5LjksOS45LDAsMCwwLDEyMzMuNzQsNDcxLjEzWm03LjE3LDIwLjg0YTYuMzksNi4zOSwwLDAsMS01LDcuNDNsLTguMzYsMS41NWE2LjE3LDYuMTcsMCwwLDEtNy4xMi01LjE5TDEyMTksNDg3YTYuMzksNi4zOSwwLDAsMSw1LTcuNDNsOC4zNi0xLjU1YTYuMTcsNi4xNywwLDAsMSw3LjEyLDUuMTlaXFxcIi8+XFxuICAgICAgICAgICAgICAgIDwvZz5cXG4gICAgICAgICAgICAgICAgPGcgaWQ9XFxcImJpa2VcXFwiIGRhdGEtbmFtZT1cXFwiTGF5ZXIgNVxcXCI+XFxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy04IHdoZWVsXFxcIiBkPVxcXCJNMTEzOS44Miw3ODAuNDRhNzYuNTksNzYuNTksMCwxLDAtNTcuOSw5MS41M0E3Ni41OSw3Ni41OSwwLDAsMCwxMTM5LjgyLDc4MC40NFptLTI4LjEyLDYuMzNhNDcuNTksNDcuNTksMCwwLDEsLjgzLDE1LjhjLTMwLjE0LTYuMjgtNDcuNjgtMjEuNjUtNTQuMzktNTIuNTJBNDcuNzMsNDcuNzMsMCwwLDEsMTExMS42OSw3ODYuNzdabS03MC40Ni0zMC45YzEwLjM1LDI2Ljg4LDEwLjE0LDUwLjQtMTMuNzMsNzAuNzdhNDcuNjcsNDcuNjcsMCwwLDEsMTMuNzMtNzAuNzdabTM0LjM1LDg4YTQ3LjU1LDQ3LjU1LDAsMCwxLTM0Ljk0LTUuNjJjMTYuOC0yMC4zNiw0MS43MS0yNS45NCw2Ny4wOS0xOS40NkE0Ny42Niw0Ny42NiwwLDAsMSwxMDc1LjU4LDg0My44NVpcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTggd2hlZWxcXFwiIGQ9XFxcIk04NjQuODksNzg5LjY5YTc2LjU5LDc2LjU5LDAsMSwwLTY2LjEzLDg1Ljc4QTc2LjU5LDc2LjU5LDAsMCwwLDg2NC44OSw3ODkuNjlabS0yOC41OSwzLjdhNDcuNTksNDcuNTksMCwwLDEtLjY0LDE1LjgxYy0yOS40My05LTQ1LjQ3LTI2LTQ5LjMtNTcuMzNBNDcuNzMsNDcuNzMsMCwwLDEsODM2LjMsNzkzLjM5Wk03NjksNzU2LjFjNy44MiwyNy43Miw1LjQzLDUxLjEyLTIwLjIyLDY5LjJBNDcuNjcsNDcuNjcsMCwwLDEsNzY5LDc1Ni4xWm0yNi4wNiw5MC43OGE0Ny41NSw0Ny41NSwwLDAsMS0zNC4yNy04LjgzYzE4LjYxLTE4LjcyLDQzLjkzLTIyLDY4LjYtMTMuMTZBNDcuNjYsNDcuNjYsMCwwLDEsNzk1LjA2LDg0Ni44OFpcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8Zz5cXG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVxcXCJjbHMtMVxcXCIgeD1cXFwiODcxLjM5XFxcIiB5PVxcXCI2OTMuMzdcXFwiIHdpZHRoPVxcXCIxMi44N1xcXCIgaGVpZ2h0PVxcXCI1My4yMVxcXCIgdHJhbnNmb3JtPVxcXCJ0cmFuc2xhdGUoLTE2NS45NyAyNzMuMzgpIHJvdGF0ZSgtMTYuMTkpXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTVcXFwiIGQ9XFxcIk04MTMuOTMsNjc5LjM1Yy0zLjcyLTUuMiwyLjI0LTE4LjUsOS4xNi0xNi4xMywzMy40MywxMS40Niw3My44NSwxMC40NSw3My44NSwxMC40NSw4Ljg0LjE1LDE0LjQ0LDEwLjM0LDcuMjcsMTUuNDgtMTQuMzYsOC43OS0zMy4xMywxNy01Ni4zNSw5Ljc2QzgzMC4xNyw2OTMuNDEsODE5LjgzLDY4Ny42LDgxMy45Myw2NzkuMzVaXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTdcXFwiIGQ9XFxcIk04MTMuOTMsNjc5LjM1Yy0zLjcyLTUuMiwyLjI0LTE4LjUsOS4xNi0xNi4xMywzMy40MywxMS40Niw3My44NSwxMC40NSw3My44NSwxMC40NSw4Ljg0LjE1LDE0LjQ0LDEwLjM0LDcuMjcsMTUuNDgtMTQuMzYsOC43OS0zMy4xMywxNy01Ni4zNSw5Ljc2QzgzMC4xNyw2OTMuNDEsODE5LjgzLDY4Ny42LDgxMy45Myw2NzkuMzVaXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTVcXFwiIGQ9XFxcIk04MTcuMTUsNjgwLjA2Yy0zLjU5LTUsMS42OS0xNi41MSw4LjM3LTE0LjIyLDMyLjMsMTEuMDksNzEuNDEsNy44Myw3MS40MSw3LjgzLDguNTQuMTQsMTcuNDUsOS45NCw3LjQzLDE1Ljg4LTEzLjg3LDguNTEtMzIsMTYuNDQtNTQuNDQsOS40NEM4MzIuODQsNjkzLjY3LDgyMi44NSw2ODgsODE3LjE1LDY4MC4wNlpcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgICAgICAgPGc+XFxuICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVxcXCJjbHMtOVxcXCIgY3g9XFxcIjEwMjIuNjZcXFwiIGN5PVxcXCI1OTkuNTVcXFwiIHI9XFxcIjExLjU3XFxcIiB0cmFuc2Zvcm09XFxcInRyYW5zbGF0ZSgtNC44NiA4LjM4KSByb3RhdGUoLTAuNDcpXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTFcXFwiIGQ9XFxcIk0xMDY5Ljc2LDc5Mi4zN2wtMzQuODktOTYuNzQsMS45My0uOC0xLjcxLTQuMTUtMS43NC43Mi0xMy4yNi0zNi43NiwxLjI3LS40Mi0yLjI1LTYuNzYsNS45NC0yLTIuNTctNy43Mi05LjcsMy4yMmMtMTEuNTUtMjIuNTUsMi0zNi4zMywxNS00MS44NmwtNS41Ny04LjgxYy0yMywxMC4yOS0yOS42MSwyOC43NS0xOS41Myw1NGwtOS4zOCwzLjEyLDIuNTYsNy43Miw1LjQ3LTEuODIsMi4yNSw2Ljc2LDIuMzYtLjc4LDEzLjYyLDM3Ljc2LTIuMzUsMSwxLjcxLDQuMTUsMi4xNi0uODksMzQuNjUsOTYuMDlhNy40Nyw3LjQ3LDAsMCwwLDkuNTYsNC40OWgwQTcuNDcsNy40NywwLDAsMCwxMDY5Ljc2LDc5Mi4zN1pcXFwiLz5cXG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XFxcImNscy0xMVxcXCIgY3g9XFxcIjEwMjcuOVxcXCIgY3k9XFxcIjU4Ny45NFxcXCIgcj1cXFwiMTIuOTlcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKC00Ljc3IDguNDIpIHJvdGF0ZSgtMC40NylcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XFxcImNscy01XFxcIiBkPVxcXCJNMTAyMS4yOSw2NTRsLTE3LjczLDYuMTUsMS43Miw1LjU5LTMxLjQxLDgyLjM2Yy0xOS4zNSwzMi41My02Ni4zLDM2LjcyLTc1LjU2LDE2LjY4bC03LjA5LTIxLjVMODc5LDc0Ny4xbDMuMjgsMTAuMDktOTQuNjUsMzMuOTVjLTExLjQ5LDIuMjktMTEuODUsMTUuNzktMi42MSwxNy44NCwwLDAsMzkuMTEsMy42NiwxMDMsOS41YTkyLjc1LDkyLjc1LDAsMCwwLDQwLjg5LTUuMjljNDQuMzItMTYuNTYsNTcuNzMtNTAuNjcsNTcuNzMtNTAuNjdsMjYuODItNjcuMjZhMS4zNywxLjM3LDAsMCwxLDIuNTMsMGwxLjQyLDMuMzMsMTcuNzUtNy42MlpcXFwiLz5cXG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cXFwiY2xzLTdcXFwiIGQ9XFxcIk0xMDIxLjI5LDY1NGwtMTcuNzMsNi4xNSwxLjcyLDUuNTktMzEuNDEsODIuMzZjLTE5LjM1LDMyLjUzLTY2LjMsMzYuNzItNzUuNTYsMTYuNjhsLTcuMDktMjEuNUw4NzksNzQ3LjFsMy4yOCwxMC4wOS05NC42NSwzMy45NWMtMTEuNDksMi4yOS0xMS44NSwxNS43OS0yLjYxLDE3Ljg0LDAsMCwzOS4xMSwzLjY2LDEwMyw5LjVhOTIuNzUsOTIuNzUsMCwwLDAsNDAuODktNS4yOWM0NC4zMi0xNi41Niw1Ny43My01MC42Nyw1Ny43My01MC42N2wyNi44Mi02Ny4yNmExLjM3LDEuMzcsMCwwLDEsMi41MywwbDEuNDIsMy4zMywxNy43NS03LjYyWlxcXCIvPlxcbiAgICAgICAgICAgICAgICA8L2c+XFxuICAgICAgICAgICAgICA8L3N2Zz5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICA8L3YtbGF5b3V0PlxcbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cXG4gICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kNCBvZmZzZXQtbWQ0IGxnNCBvZmZzZXQtbGc0IHhsNCBvZmZzZXQteGw0PlxcbiAgICAgICAgICAgIDx2LWNhcmQtYWN0aW9ucz5cXG4gICAgICAgICAgICA8di1idG4gQGNsaWNrLm5hdGl2ZT1cXFwiZ29Ib21lKClcXFwiIGJsb2NrIGZsYXQgY2xhc3M9XFxcImluZm8tLXRleHQgaW5mb1xcXCI+QmFjayBUbyBIb21lUGFnZTwvdi1idG4+XFxuICAgICAgICAgICAgPHYtYnRuIEBjbGljay5uYXRpdmU9XFxcImdvU2hvcCgpXFxcIiBibG9jayBmbGF0IGNsYXNzPVxcXCJwcmltYXJ5LS10ZXh0IHByaW1hcnlcXFwiPkNvbnRpbnVlIFNob3BwaW5nPC92LWJ0bj5cXG4gICAgICAgICAgICA8L3YtY2FyZC1hY3Rpb25zPlxcbiAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgPC92LWxheW91dD5cXG4gICAgICA8L3YtY29udGFpbmVyPlxcblxcbiAgICA8L3YtY2FyZC10ZXh0PlxcbiAgICAgIDwvdi1jYXJkPlxcbiAgICA8L21vZGFsPlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5cXG5leHBvcnQgZGVmYXVsdCB7XFxuICAgIG1vdW50ZWQgKCkge1xcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXFxuICAgICAgICBzZWxmLiRtb2RhbC5zaG93KCc0MDQtbm90LWZvdW5kJylcXG4gICAgfSxcXG4gICAgbWV0aG9kczoge1xcbiAgICAgICAgcmVkaXJlY3RCYWNrICgpIHtcXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcXG4gICAgICAgICAgICBzZWxmLiRtb2RhbC5oaWRlKCc0MDQtbm90LWZvdW5kJylcXG4gICAgICAgICAgICBzZWxmLiRyb3V0ZXIuZ28oLTIpXFxuICAgICAgICB9LFxcbiAgICAgICAgZ29Ib21lICgpIHtcXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcXG4gICAgICAgICAgICBzZWxmLiRtb2RhbC5oaWRlKCc0MDQtbm90LWZvdW5kJylcXG4gICAgICAgICAgICBzZWxmLiRyb3V0ZXIucHVzaCh7bmFtZTogJ2hvbWUnfSlcXG4gICAgICAgIH0sXFxuICAgICAgICBnb1Nob3AgKCkge1xcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xcbiAgICAgICAgICAgIHNlbGYuJG1vZGFsLmhpZGUoJzQwNC1ub3QtZm91bmQnKVxcbiAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHtuYW1lOiAncHJvZHVjdC5pbmRleCd9KVxcbiAgICAgICAgfVxcbiAgICB9XFxufVxcbjwvc2NyaXB0PlxcbjxzdHlsZSBzY29wZWQ+XFxuLmNscy0xIHtcXG4gIGZpbGw6ICNmZmM1NDE7XFxufVxcblxcbi5jbHMtMiB7XFxuICBmaWxsOiAjNGU0MDY2O1xcbn1cXG5cXG4uY2xzLTMge1xcbiAgZmlsbDogIzZmNWI5MjtcXG59XFxuXFxuLmNscy00IHtcXG4gIGZpbGw6ICNmNzhkNWU7XFxufVxcblxcbi5jbHMtNSB7XFxuICBmaWxsOiAjZmE5NzZjO1xcbn1cXG5cXG4uY2xzLTYsXFxuLmNscy03LFxcbi5jbHMtOCB7XFxuICBmaWxsOiAjYjY1YzMyO1xcbn1cXG5cXG4uY2xzLTEwLFxcbi5jbHMtNiB7XFxuICBvcGFjaXR5OiAwLjY7XFxufVxcblxcbi5jbHMtNyB7XFxuICBvcGFjaXR5OiAwLjQ7XFxufVxcblxcbi5jbHMtOSB7XFxuICBmaWxsOiAjZjRiNzNiO1xcbn1cXG5cXG4uY2xzLTExIHtcXG4gIGZpbGw6ICNmOWMzNTg7XFxufVxcblxcbi5jbHMtMTIge1xcbiAgZmlsbDogIzliNDYyYztcXG59XFxuXFxuLmNscy0xMyB7XFxuICBmaWxsOiAjYWE1MTJlO1xcbn1cXG5cXG4uY2xzLTE0IHtcXG4gIGZpbGw6ICM3ZDZhYTU7XFxufVxcblxcbi8qIGFuaW1hdGlvbnMgKi9cXG5cXG4ud2hlZWwge1xcbiAgYW5pbWF0aW9uOiB3aGVlbC1yb3RhdGUgNnMgZWFzZSBpbmZpbml0ZTtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcXG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHdoZWVsLXJvdGF0ZSB7XFxuICA1MCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC41NSwgMC4wODUsIDAuNjgsIDAuNTMpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDk2MGRlZylcXG4gIH1cXG59XFxuXFxuLmNsb2NrLWhhbmQtMSB7XFxuICBhbmltYXRpb246IGNsb2NrLXJvdGF0ZSAzcyBsaW5lYXIgaW5maW5pdGU7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XFxuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcXG59XFxuXFxuLmNsb2NrLWhhbmQtMiB7XFxuICBhbmltYXRpb246IGNsb2NrLXJvdGF0ZSA2cyBsaW5lYXIgaW5maW5pdGU7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XFxuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcXG59XFxuXFxuQGtleWZyYW1lcyBjbG9jay1yb3RhdGUge1xcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZylcXG4gIH1cXG59XFxuXFxuI2JveC10b3Age1xcbiAgYW5pbWF0aW9uOiBib3gtdG9wLWFuaW0gMnMgbGluZWFyIGluZmluaXRlO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgdG9wO1xcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XFxufVxcblxcbkBrZXlmcmFtZXMgYm94LXRvcC1hbmltIHtcXG4gIDUwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC01ZGVnKVxcbiAgfVxcbn1cXG5cXG4jdW1icmVsbGEge1xcbiAgYW5pbWF0aW9uOiB1bWJyZWxsYS1hbmltIDZzIGxpbmVhciBpbmZpbml0ZTtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcXG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHVtYnJlbGxhLWFuaW0ge1xcbiAgMjUlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpIHJvdGF0ZSg1ZGVnKTtcXG4gIH1cXG4gIDc1JSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC01ZGVnKTtcXG4gIH1cXG59XFxuXFxuI2N1cCB7XFxuICBhbmltYXRpb246IGN1cC1yb3RhdGUgM3MgY3ViaWMtYmV6aWVyKDAuNDU1LCAwLjAzLCAwLjUxNSwgMC45NTUpIGluZmluaXRlO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XFxuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcXG59XFxuXFxuQGtleWZyYW1lcyBjdXAtcm90YXRlIHtcXG4gIDUwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC01ZGVnKVxcbiAgfVxcbn1cXG5cXG4jcGlsbG93IHtcXG4gIGFuaW1hdGlvbjogcGlsbG93LWFuaW0gM3MgbGluZWFyIGluZmluaXRlO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XFxufVxcblxcbkBrZXlmcmFtZXMgcGlsbG93LWFuaW0ge1xcbiAgMjUlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTBkZWcpIHRyYW5zbGF0ZVkoNXB4KVxcbiAgfVxcbiAgNzUlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTEwZGVnKVxcbiAgfVxcbn1cXG5cXG4jc3RyaXBlIHtcXG4gIGFuaW1hdGlvbjogc3RyaXBlLWFuaW0gM3MgbGluZWFyIGluZmluaXRlO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XFxufVxcblxcbkBrZXlmcmFtZXMgc3RyaXBlLWFuaW0ge1xcbiAgMjUlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTBweCwgMCkgcm90YXRlKC0xMGRlZylcXG4gIH1cXG4gIDc1JSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMHB4KVxcbiAgfVxcbn1cXG5cXG4jYmlrZSB7XFxuICBhbmltYXRpb246IGJpa2UtYW5pbSA2cyBlYXNlIGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJpa2UtYW5pbSB7XFxuICAwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTMwMHB4KVxcbiAgfVxcbiAgNTAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40NywgMCwgMC43NDUsIDAuNzE1KTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTMwMHB4KVxcbiAgfVxcbn1cXG5cXG4jcnVja3NhY2sge1xcbiAgYW5pbWF0aW9uOiBydWNrLWFuaW0gM3MgbGluZWFyIGluZmluaXRlO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogdG9wO1xcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XFxufVxcblxcbkBrZXlmcmFtZXMgcnVjay1hbmltIHtcXG4gIDUwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDVkZWcpXFxuICB9XFxufVxcblxcbi5jaXJjbGUge1xcbiAgYW5pbWF0aW9uOiBjaXJjbGUtYW5pbSBlYXNlIGluZmluaXRlO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XFxuICBwZXJzcGVjdGl2ZTogMHB4O1xcbn1cXG5cXG4uY2lyY2xlLmMxIHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMnNcXG59XFxuXFxuLmNpcmNsZS5jMiB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDNzXFxufVxcblxcbi5jaXJjbGUuYzMge1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxc1xcbn1cXG5cXG4uY2lyY2xlLmM0IHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMXNcXG59XFxuXFxuLmNpcmNsZS5jNSB7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDJzXFxufVxcblxcbi5jaXJjbGUuYzYge1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAzc1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGNpcmNsZS1hbmltIHtcXG4gIDUwJSB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoLjIpIHJvdGF0ZVgoMzYwZGVnKSByb3RhdGVZKDM2MGRlZylcXG4gIH1cXG59XFxuXFxuLmZvdXIsXFxuI291IHtcXG4gIGFuaW1hdGlvbjogZm91ci1hbmltIGN1YmljLWJlemllcigwLjM5LCAwLjU3NSwgMC41NjUsIDEpIGluZmluaXRlO1xcbn1cXG5cXG4uZm91ci5hIHtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbSBsZWZ0O1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAzcztcXG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xcbn1cXG5cXG4uZm91ci5iIHtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbSByaWdodDtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogM3M7XFxuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcXG59XFxuXFxuI291IHtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNnM7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XFxuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcXG59XFxuXFxuQGtleWZyYW1lcyBmb3VyLWFuaW0ge1xcbiAgNTAlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSguOTgpXFxuICB9XFxufVxcbjwvc3R5bGU+XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTZiYTYyNDM5XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvTm90Rm91bmQudnVlXG4vLyBtb2R1bGUgaWQgPSA2ODZcbi8vIG1vZHVsZSBjaHVua3MgPSAxMSIsIjx0ZW1wbGF0ZT5cbjxtb2RhbCBuYW1lPVwiNDA0LW5vdC1mb3VuZFwiIDphZGFwdGl2ZT1cInRydWVcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgOmNsaWNrVG9DbG9zZT1cImZhbHNlXCI+XG4gICAgICAgIDx2LWNhcmQgOmZsYXQ9XCJ0cnVlXCI+XG4gICAgICAgIDx2LXRvb2xiYXIgY2xhc3M9XCJhY2NlbnRcIj5cbiAgICAgICAgICA8di1idG4gaWNvbiBAY2xpY2submF0aXZlPVwicmVkaXJlY3RCYWNrKClcIj5cbiAgICAgICAgICAgIDx2LWljb24gY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCI+YXJyb3dfYmFjazwvdi1pY29uPlxuICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG4gICAgICAgICAgPHYtdG9vbGJhci10aXRsZSBjbGFzcz1cInRleHQteHMtY2VudGVyIHByaW1hcnktLXRleHRcIj5QQUdFIE5PVCBGT1VORDwvdi10b29sYmFyLXRpdGxlPlxuICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICAgIDx2LXRvb2xiYXItaXRlbXM+XG4gICAgICAgICAgICA8di1idG4gY2xhc3M9XCJwcmltYXJ5LS10ZXh0XCIgZmxhdCBAY2xpY2submF0aXZlPVwiZ29Ib21lKClcIj48di1pY29uIHJpZ2h0IGRhcms+aG9tZTwvdi1pY29uPjwvdi1idG4+XG4gICAgICAgICAgPC92LXRvb2xiYXItaXRlbXM+XG4gICAgICAgIDwvdi10b29sYmFyPlxuICAgICAgICA8di1jYXJkLXRleHQgc3R5bGU9XCJwYWRkaW5nLXRvcDoxMDBweDtcIj5cbiAgICAgIDx2LWNvbnRhaW5lciBmbHVpZD5cbiAgICAgICAgPHYtbGF5b3V0IHJvdz5cbiAgICAgICAgICA8di1mbGV4IHgxMiBzbTEyIG1kNCBvZmZzZXQtbWQ0IGxnNCBvZmZzZXQtbGc0IHhsNCBvZmZzZXQteGw0PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDE5MjAgMTA4MFwiPlxuICAgICAgICAgICAgICAgIDx0aXRsZT40MDQ8L3RpdGxlPlxuICAgICAgICAgICAgICAgIDxnIGlkPVwiTGF5ZXJfMTIgeWVsbG93LWJhY2stZmlnXCIgZGF0YS1uYW1lPVwiTGF5ZXIgMTJcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTFcIiBkPVwiTTYwMC44Nyw4NzJIMTU2YTQsNCwwLDAsMC0zLjc4LDQuMTloMGE0LDQsMCwwLDAsMy43OCw0LjE5SDYwMC44N2E0LDQsMCwwLDAsMy43OC00LjE5aDBBNCw0LDAsMCwwLDYwMC44Nyw4NzJaXCIvPlxuICAgICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJjbHMtMVwiIHg9XCI2ODAuOTFcIiB5PVwiODcxLjk4XCIgd2lkdGg9XCI1MTMuMzhcIiBoZWlnaHQ9XCI4LjM5XCIgcng9XCI0LjE5XCIgcnk9XCI0LjE5XCIvPlxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtMVwiIGQ9XCJNMTQ4MCw4NzYuMTdoMGMwLDIuMzIsMi4zNyw0LjE5LDUuMyw0LjE5aDM1MC42MWMyLjkzLDAsNS4zLTEuODgsNS4zLTQuMTloMGMwLTIuMzItMi4zNy00LjE5LTUuMy00LjE5SDE0ODUuMjZDMTQ4Mi4zMyw4NzIsMTQ4MCw4NzMuODYsMTQ4MCw4NzYuMTdaXCIvPlxuICAgICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJjbHMtMVwiIHg9XCI0OTIuMjFcIiB5PVwiOTIwLjY0XCIgd2lkdGg9XCIyNDkuOFwiIGhlaWdodD1cIjguMzlcIiByeD1cIjQuMTlcIiByeT1cIjQuMTlcIi8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy0xXCIgZD1cIk0xNTQ5LjE0LDkyNC44NGgwYTQuMTksNC4xOSwwLDAsMC00LjE5LTQuMTlIMTA2Ny40NmExNC42NiwxNC42NiwwLDAsMSwuMzUsMy4yMXYxQTQuMTksNC4xOSwwLDAsMCwxMDcyLDkyOWg0NzIuOTRBNC4xOSw0LjE5LDAsMCwwLDE1NDkuMTQsOTI0Ljg0WlwiLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTFcIiBkPVwiTTg2NS41LDkyNC44NGgwYTQuMTksNC4xOSwwLDAsMCw0LjE5LDQuMTloODIuMzdhMTIuMjgsMTIuMjgsMCwwLDEtLjE5LTJ2LTIuMTdhNC4xOSw0LjE5LDAsMCwwLTQuMTktNC4xOWgtNzhBNC4xOSw0LjE5LDAsMCwwLDg2NS41LDkyNC44NFpcIi8+XG4gICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImNscy0xXCIgeD1cIjkxNS42XCIgeT1cIjk4MS40N1wiIHdpZHRoPVwiNTQuNzJcIiBoZWlnaHQ9XCI4LjM5XCIgcng9XCI0LjE5XCIgcnk9XCI0LjE5XCIvPlxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtMVwiIGQ9XCJNNzMwLjMzLDk4NS42N2gwYzAsMi4zMiw0LjIzLDQuMTksOS40NCw0LjE5aDEwNC4zYzUuMjIsMCw5LjQ0LTEuODgsOS40NC00LjE5aDBjMC0yLjMyLTQuMjMtNC4xOS05LjQ0LTQuMTlINzM5Ljc4QzczNC41Niw5ODEuNDcsNzMwLjMzLDk4My4zNSw3MzAuMzMsOTg1LjY3WlwiLz5cbiAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiY2xzLTFcIiB4PVwiOTk3LjA2XCIgeT1cIjk4MS40N1wiIHdpZHRoPVwiNzguMTFcIiBoZWlnaHQ9XCI4LjM5XCIgcng9XCI0LjE5XCIgcnk9XCI0LjE5XCIvPlxuXG4gICAgICAgICAgICAgICAgPGcgaWQ9XCJyb3VuZC1jb25mXCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy0xIGNpcmNsZSBjMVwiIGQ9XCJNNTM2LjQxLDE1NS4xNGExNy43NywxNy43NywwLDEsMCwxNy43NywxNy43N0ExNy43NywxNy43NywwLDAsMCw1MzYuNDEsMTU1LjE0Wm0wLDI4LjY4YTEwLjksMTAuOSwwLDEsMSwxMC45LTEwLjlBMTAuOSwxMC45LDAsMCwxLDUzNi40MSwxODMuODFaXCIvPlxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtMSBjaXJjbGUgYzJcIiBkPVwiTTEzNDUuMDksODIuNDRhMTcuNzcsMTcuNzcsMCwxLDAsMTcuNzcsMTcuNzdBMTcuNzcsMTcuNzcsMCwwLDAsMTM0NS4wOSw4Mi40NFptMCwyOC42OGExMC45LDEwLjksMCwxLDEsMTAuOS0xMC45QTEwLjksMTAuOSwwLDAsMSwxMzQ1LjA5LDExMS4xMlpcIi8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy0xIGNpcmNsZSBjM1wiIGQ9XCJNNzAuMTIsMzYzQTE3Ljc3LDE3Ljc3LDAsMSwwLDg3Ljg5LDM4MC44LDE3Ljc3LDE3Ljc3LDAsMCwwLDcwLjEyLDM2M1ptMCwyOC42OEExMC45LDEwLjksMCwxLDEsODEsMzgwLjgsMTAuOSwxMC45LDAsMCwxLDcwLjEyLDM5MS43WlwiLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTEgY2lyY2xlIGM0XCIgZD1cIk0xNzAuNDcsNzUxLjgyYTE3Ljc3LDE3Ljc3LDAsMSwwLDE3Ljc3LDE3Ljc3QTE3Ljc3LDE3Ljc3LDAsMCwwLDE3MC40Nyw3NTEuODJabTAsMjguNjhhMTAuOSwxMC45LDAsMSwxLDEwLjktMTAuOUExMC45LDEwLjksMCwwLDEsMTcwLjQ3LDc4MC41WlwiLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTEgY2lyY2xlIGM1XCIgZD1cIk0xNDU3LjM0LDc2Mi43M2ExNy43NywxNy43NywwLDEsMCwxNy43NywxNy43N0ExNy43NywxNy43NywwLDAsMCwxNDU3LjM0LDc2Mi43M1ptMCwyOC42OGExMC45LDEwLjksMCwxLDEsMTAuOS0xMC45QTEwLjksMTAuOSwwLDAsMSwxNDU3LjM0LDc5MS40WlwiLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTEgY2lyY2xlIGM2XCIgZD1cIk0xODI5LjE1LDQwNy40OWExNy43NywxNy43NywwLDEsMCwxNy43NywxNy43N0ExNy43NywxNy43NywwLDAsMCwxODI5LjE1LDQwNy40OVptMCwyOC42OGExMC45LDEwLjksMCwxLDEsMTAuOS0xMC45QTEwLjksMTAuOSwwLDAsMSwxODI5LjE1LDQzNi4xN1pcIi8+XG4gICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIGlkPVwiZm9ydHlmb3VyXCIgZGF0YS1uYW1lPVwiTGF5ZXIgMlwiPlxuICAgICAgICAgICAgICAgICAgPGcgY2xhc3M9XCJmb3VyIGFcIj5cblxuICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImNscy0yXCIgeD1cIjIzMy43NFwiIHk9XCIzOTEuMTRcIiB3aWR0aD1cIjEyMC43MVwiIGhlaWdodD1cIjQ2Ni4yOVwiIHJ4PVwiNTcuMVwiIHJ5PVwiNTcuMVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg5MTguMzkgMzMwLjE5KSByb3RhdGUoOTApXCIvPlxuXG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiY2xzLTNcIiB4PVwiMzMzLjgzXCIgeT1cIjQ3NS4xXCIgd2lkdGg9XCIxMjAuNzFcIiBoZWlnaHQ9XCIzOTYuODhcIiByeD1cIjYwLjM2XCIgcnk9XCI2MC4zNlwiLz5cblxuICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImNscy0zXCIgeD1cIjE5Ny4xM1wiIHk9XCIxMjIuODlcIiB3aWR0aD1cIjEyMC43MVwiIGhlaWdodD1cIjYwNC43NVwiIHJ4PVwiNjAuMzZcIiByeT1cIjYwLjM2XCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDI5MC40OSAtNzAuNzgpIHJvdGF0ZSgzNSlcIi8+XG5cbiAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgIDxnIGNsYXNzPVwiZm91ciBiXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJjbHMtMlwiIHg9XCIxNTU4Ljg0XCIgeT1cIjM5MS45MVwiIHdpZHRoPVwiMTIwLjcxXCIgaGVpZ2h0PVwiNDY2LjI5XCIgcng9XCI1Ny4xXCIgcnk9XCI1Ny4xXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDIyNDQuMjYgLTk5NC4xNCkgcm90YXRlKDkwKVwiLz5cblxuICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImNscy0zXCIgeD1cIjE2NTguOTJcIiB5PVwiNDc1Ljg3XCIgd2lkdGg9XCIxMjAuNzFcIiBoZWlnaHQ9XCIzOTYuODhcIiByeD1cIjYwLjM2XCIgcnk9XCI2MC4zNlwiLz5cblxuICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImNscy0zXCIgeD1cIjE1MjIuMjJcIiB5PVwiMTIzLjY2XCIgd2lkdGg9XCIxMjAuNzFcIiBoZWlnaHQ9XCI2MDQuNzVcIiByeD1cIjYwLjM2XCIgcnk9XCI2MC4zNlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg1MzAuNTcgLTgzMC42OCkgcm90YXRlKDM1KVwiLz5cblxuICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtM1wiIGlkPVwib3VcIiBkPVwiTTk1Ni41NCwxNjguMmMtMTk0LjM0LDAtMzUxLjg5LDE1Ny41NS0zNTEuODksMzUxLjg5Uzc2Mi4xOSw4NzIsOTU2LjU0LDg3MnMzNTEuODktMTU3LjU1LDM1MS44OS0zNTEuODlTMTE1MC44OCwxNjguMiw5NTYuNTQsMTY4LjJabTAsNTg0LjQ5Yy0xMjguNDYsMC0yMzIuNi0xMDQuMTQtMjMyLjYtMjMyLjZzMTA0LjE0LTIzMi42LDIzMi42LTIzMi42LDIzMi42LDEwNC4xNCwyMzIuNiwyMzIuNlMxMDg1LDc1Mi42OSw5NTYuNTQsNzUyLjY5WlwiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgaWQ9XCJ1bWJyZWxsYVwiIGRhdGEtbmFtZT1cIkxheWVyIDNcIj5cbiAgICAgICAgICAgICAgICAgIDxnPlxuICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVwiY2xzLTRcIiBjeD1cIjExODcuNTNcIiBjeT1cIjI0MC4zXCIgcj1cIjcuNjZcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMjM2LjM2IDk5MC44KSByb3RhdGUoLTQ5LjcxKVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGc+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtNVwiIGQ9XCJNMTIxOS41NiwzNTkuNjdsNTUsMTAwLjUyYzMyLjctNDguNDgtNi44Ny0xNDIuNDMtOTEuNzUtMjE0LjM4LTg0LjQxLTcxLjU1LTE4My05NS4zMy0yMjUuODEtNTZsMTE0LjIxLDQ0LjE0WlwiLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy02XCIgZD1cIk0xMTgyLjc5LDI0NS44MWMtODQuNDEtNzEuNTUtMTgzLTk1LjMzLTIyNS44MS01NmwxMTQuMjEsNDQuMTRaXCIvPlxuICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPVwiY2xzLTdcIiBwb2ludHM9XCIxMTgyLjc5IDI0NS44MSAxMDcxLjE5IDIzMy45MSAxMjE5LjU2IDM1OS42NyAxMTgyLjc5IDI0NS44MVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz1cImNscy04XCIgcG9pbnRzPVwiMTE4MC45MSA0MDkuMDIgMTI3NC41NCA0NjAuMTkgMTIxOS41NiAzNTkuNjcgMTA3MS4xOSAyMzMuOTEgOTU2Ljk4IDE4OS43NiAxMDIxLjk1IDI3NC4yOSAxMTgwLjkxIDQwOS4wMlwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGc+XG4gICAgICAgICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJjbHMtNFwiIHg9XCI5OTcuNDVcIiB5PVwiMzU4LjM1XCIgd2lkdGg9XCIxNzUuNThcIiBoZWlnaHQ9XCI1LjFcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMTA4LjIxIDk1NS4zOCkgcm90YXRlKC00OS43MSlcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJjbHMtNFwiIHg9XCIxMDI4LjA5XCIgeT1cIjM5OS4zNlwiIHdpZHRoPVwiMjEuNDZcIiBoZWlnaHQ9XCIzMi4yN1wiIHJ4PVwiMTAuNzNcIiByeT1cIjEwLjczXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDUxNS4wNCAtNTczLjE2KSByb3RhdGUoNDAuMjkpXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIGlkPVwicGlsbG93XCIgZGF0YS1uYW1lPVwiTGF5ZXIgNFwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtMVwiIGQ9XCJNNzU0LDYyNy4wN2M3LC41NCwxMi45Mi0yLjgyLDEzLjM1LTcuNTlzLTQuOTUtOS4yNC0xMi05Ljg3YTE4LjU1LDE4LjU1LDAsMCwwLTIuMTcsMGwtNzQuOS04MS42NGMwLS4xLDAtLjE5LDAtLjI5LDAtNy4wOS00LTEyLjgzLTguOC0xMi44MXMtOC43NSw1Ljc3LTguNzMsMTIuODdjMCwwLDAsLjA5LDAsLjEzbC01MC4yMSw0Ni4wN2gtLjA5Yy03LjA2LS42My0xMy4xNCwyLjc3LTEzLjU3LDcuNTlzNC44Nyw5LjE2LDExLjg1LDkuODRsNzYuMDgsODIuOTJzMCwwLDAsLjA2YzAsNy4wOSw0LDEyLjgzLDguOCwxMi44MXM4LjY1LTUuNjYsOC43MS0xMi42NVpcIi8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy05XCIgZD1cIk02NjkuNDYsNTE0LjgyYy00Ljc3LS44My04Ljc1LDUuNzctOC43MywxMi44NywwLDAsMCwuMDksMCwuMTNsLTUwLjIxLDQ2LjA3aC0uMDljLTcuMDYtLjYzLTEzLjE0LDIuNzctMTMuNTcsNy41OXM0Ljg3LDkuMTYsMTEuODUsOS44NGw3Ni4wOCw4Mi45MnMwLDAsMCwuMDZjMCw3LjA5LDQsMTIuODMsOC44LDEyLjgxczguNjUtNS42Niw4LjcxLTEyLjY1QzU3MC41NSw1NzMsNzAyLjA3LDUyMC40Nyw2NjkuNDYsNTE0LjgyWlwiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgaWQ9XCJjdXBcIiBkYXRhLW5hbWU9XCJMYXllciA3XCI+XG4gICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz1cImNscy0xXCIgcG9pbnRzPVwiMTE3My42OSA3NDguMjEgMTE0MC41MiA3MTUuNDIgMTE5NS43OSA2NDcuMzUgMTI0MS4xMyA2OTIuMTYgMTE3My42OSA3NDguMjFcIi8+XG4gICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz1cImNscy04XCIgcG9pbnRzPVwiMTE3My42OSA3NDguMjEgMTE0MC41MiA3MTUuNDIgMTE0My45MyA3MTEuMjcgMTE3Ny44MSA3NDQuNzUgMTE3My42OSA3NDguMjFcIi8+XG4gICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz1cImNscy01XCIgcG9pbnRzPVwiMTE5NC42OCA3MzEuNDYgMTE1Ny4wNCA2OTQuMjQgMTE4My44IDY2MS43IDEyMjYuOTEgNzA0LjMyIDExOTQuNjggNzMxLjQ2XCIvPlxuICAgICAgICAgICAgICAgICAgPGcgY2xhc3M9XCJjbHMtMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtOFwiIGQ9XCJNMTE3Ni4zMiw2NjcuNzhoMGE0LjE5LDQuMTksMCwwLDEsNC4xOSw0LjE5djMzLjU0YTAsMCwwLDAsMSwwLDBoLTguMzhhMCwwLDAsMCwxLDAsMFY2NzJhNC4xOSw0LjE5LDAsMCwxLDQuMTktNC4xOVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoODIyLjUzIC02MjguNjcpIHJvdGF0ZSg0NC42NylcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLThcIiBkPVwiTTExNzIuNzMsNzA5LjdsMjMuNTgtMjMuODVhNC4xOSw0LjE5LDAsMCwxLDUuOTIsMGgwYTQuMTksNC4xOSwwLDAsMSwwLDUuOTJsLTIzLjU4LDIzLjg1WlwiLz5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtOFwiIGQ9XCJNMTE4NS4xMSw3MjIuMDlsMjMuNTgtMjMuODVhNC4xOSw0LjE5LDAsMCwxLDUuOTIsMGgwYTQuMTksNC4xOSwwLDAsMSwwLDUuOTJMMTE5MS4wNiw3MjhaXCIvPlxuICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtNVwiIGQ9XCJNMTE5Ny44NSw2NjAuNWg0NS42OWE1LjcsNS43LDAsMCwxLDUuNyw1Ljd2OC4zMmEwLDAsMCwwLDEsMCwwaC01Ny4wOWEwLDAsMCwwLDEsMCwwdi04LjMyQTUuNyw1LjcsMCwwLDEsMTE5Ny44NSw2NjAuNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoODI5LjUzIC02NjcuNjYpIHJvdGF0ZSg0NSlcIi8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy04XCIgZD1cIk0xMTkxLjQ5LDY2NC43NGg1My45NGE1LjI1LDUuMjUsMCwwLDEsNS4yNSw1LjI1djQuNzlhMCwwLDAsMCwxLDAsMGgtNjQuNDRhMCwwLDAsMCwxLDAsMFY2NzBhNS4yNSw1LjI1LDAsMCwxLDUuMjUtNS4yNVpcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoODIyLjgzIC02NjMuMTcpIHJvdGF0ZSg0NC42NylcIi8+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDxnIGlkPVwiY2xvY2tcIiBkYXRhLW5hbWU9XCJMYXllciA4XCI+XG5cbiAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XCJjbHMtNVwiIGN4PVwiODQ3LjdcIiBjeT1cIjI0Ny41OVwiIHI9XCI3NC42NlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMzIuOTEgMzE0LjA1KSByb3RhdGUoLTIwLjYpXCIvPlxuICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz1cImNscy0xXCIgY3g9XCI4NDcuN1wiIGN5PVwiMjQ3LjU5XCIgcj1cIjYzLjQ0XCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC0zMi45MSAzMTQuMDUpIHJvdGF0ZSgtMjAuNilcIi8+XG4gICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImNscy0zIGNsb2NrLWhhbmQtMVwiIHg9XCI4NDVcIiB5PVwiMTg5LjVcIiB3aWR0aD1cIjYuMDRcIiBoZWlnaHQ9XCI1OFwiIHJ4PVwiMy4wMlwiIHJ5PVwiMy4wMlwiIC8+XG4gICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImNscy0zIGNsb2NrLWhhbmQtMlwiIHg9XCI4NDVcIiB5PVwiMjA5LjVcIiB3aWR0aD1cIjYuMDRcIiBoZWlnaHQ9XCIzOFwiIHJ4PVwiMy4wMlwiIHJ5PVwiMy4wMlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgxNjExLjIyIC0yMzAuNCkgcm90YXRlKDEzMC40KVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVwiY2xzLTNcIiBjeD1cIjg0Ny43XCIgY3k9XCIyNDcuNTlcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTMyLjkxIDMxNC4wNSkgcm90YXRlKC0yMC42KVwiIHI9XCIzXCIgLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPGcgaWQ9XCJib3hcIiBkYXRhLW5hbWU9XCJMYXllciA5XCI+XG4gICAgICAgICAgICAgICAgICA8ZyBpZD1cImJveC10b3BcIj48cG9seWdvbiBjbGFzcz1cImNscy04XCIgcG9pbnRzPVwiNTY5LjcxIDM4Mi4yOCA2NTMuNzQgMzI5LjM5IDc0Ny4xMyAzMjAuMSA2NzkuMiAzNjkuODUgNTY5LjcxIDM4Mi4yOFwiPjwvcG9seWdvbj5cbiAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPVwiY2xzLTVcIiBwb2ludHM9XCI2OTEuOTUgMzY3LjIgNTcwLjg3IDM5Mi4zNCA1NjUuMzIgMzgzLjM1IDY4Ny44IDM1Ny40NSA2OTEuOTUgMzY3LjJcIj48L3BvbHlnb24+XG5cbiAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPVwiY2xzLTVcIiBwb2ludHM9XCI2NjEuNTQgMzM3LjQ4IDU3MC44NyAzOTIuMzQgNTYyLjQyIDM3OC45MiA2NTIuMjUgMzIyLjM4IDY1OC4xMiAzMjEuMzQgNjYxLjU0IDMzNy40OFwiPjwvcG9seWdvbj48cG9seWdvbiBjbGFzcz1cImNscy03XCIgcG9pbnRzPVwiNjYxLjU0IDMzNy40OCA1NzAuODcgMzkyLjM0IDU2Mi40MiAzNzguOTIgNjUyLjI1IDMyMi4zOCA2NTguMTIgMzIxLjM0IDY2MS41NCAzMzcuNDhcIj48L3BvbHlnb24+PHBvbHlnb24gY2xhc3M9XCJjbHMtNVwiIHBvaW50cz1cIjc0Ny4xMyAzMjAuMSA2NjEuNTQgMzM3LjQ4IDY1Mi4yNSAzMjIuMzggNzM4LjQgMzA3LjEgNzQ3LjEzIDMyMC4xXCI+PC9wb2x5Z29uPlxuICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy01XCIgZD1cIk01ODguMjgsNDIwLjI2czMuNDQsNS4yLDUuMTksOGw0My4xLDY4LjQ4LDE1OC44MS0xMDAtNDMuMS02OC40OHEtMi42My00LjE3LTUuNDctOFpcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTdcIiBkPVwiTTU4OC4yOCw0MjAuMjZzMy40NCw1LjIsNS4xOSw4bDQzLjEsNjguNDgsMTU4LjgxLTEwMC00My4xLTY4LjQ4cS0yLjYzLTQuMTctNS40Ny04WlwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiY2xzLTVcIiB4PVwiNjkzLjczXCIgeT1cIjMzNS41MVwiIHdpZHRoPVwiODMuOTlcIiBoZWlnaHQ9XCI5MC41OFwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtODkuNzggNDUwLjQzKSByb3RhdGUoLTMyLjE5KVwiPjwvcmVjdD5cbiAgICAgICAgICAgICAgICA8L2c+XG5cbiAgICAgICAgICAgICAgICA8ZyBpZD1cInJ1Y2tzYWNrXCIgZGF0YS1uYW1lPVwiTGF5ZXIgNlwiPlxuICAgICAgICAgICAgICAgICAgPGcgaWQ9XCJzdHJpcGVcIj48cGF0aCBjbGFzcz1cImNscy0xMlwiIGQ9XCJNMTIwMC4zMiw0NzMuOTFoMGExMy43NCwxMy43NCwwLDAsMC0xOC40MSw3LjQ0bC01NSwxMjkuODZhMTQuODIsMTQuODIsMCwwLDAsNy4xMywxOS4yMWgwYTEzLjc0LDEzLjc0LDAsMCwwLDE4LjQxLTcuNDRsNTUtMTI5Ljg2QTE0LjgyLDE0LjgyLDAsMCwwLDEyMDAuMzIsNDczLjkxWlwiLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTEzXCIgZD1cIk0xMjAyLjE4LDYwNi4zNGgwYTE0LDE0LDAsMCwwLTE2LjE4LTExLjhsLTQ4LjgzLDljLTcuNTksMS40LTEyLjY2LDktMTEuMzEsMTYuODloMGExNCwxNCwwLDAsMCwxNi4xOCwxMS44bDQ4LjgzLTlDMTE5OC40Niw2MjEuODIsMTIwMy41Myw2MTQuMjYsMTIwMi4xOCw2MDYuMzRaXCIvPlxuICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtOFwiIGQ9XCJNMTMwMC44Niw2MDNsLTEyMi45MywyMi43NC0xNS40NC05MC45MWMtNS43NS0zMy44NiwxNS44OS02Ni4xNyw0OC4zNC03Mi4xOGwxMS41OC0yLjA4YzMyLjQ1LTYsNTcuMjYsMTcuNjYsNjMsNTEuNTFaXCIvPlxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtMVwiIGQ9XCJNMTMwNyw2MDEuOTFsLTExMi4zMiwyMC43OC0xNS45LTkzLjYxYy01LjUtMzIuMzYsMTUuMTktNjMuMjUsNDYuMi02OWgwYzMxLTUuNzQsNjAuNjIsMTUuODUsNjYuMTIsNDguMjFaXCIvPlxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtOFwiIGQ9XCJNMTI5Ni43Niw2MDMuOCwxMjE1LDYxOC45MmwtNC44OS0yOC43N2MtMi4xMS0xMi40Miw1LjgzLTI0LjI3LDE3LjczLTI2LjQ3bDM4LjY3LTcuMTVjMTEuOS0yLjIsMjMuMjYsNi4wOCwyNS4zNywxOC41WlwiLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTVcIiBkPVwiTTEyOTYuNzYsNjAzLjhsLTczLjQxLDEzLjU4LTQuOTItMjljLTItMTEuNjIsNS40NS0yMi43MiwxNi42LTI0Ljc4bDMzLjA3LTYuMTJjMTEuMTQtMi4wNiwyMS43Nyw1LjY5LDIzLjc1LDE3LjMyWlwiLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTRcIiBkPVwiTTEyMzEuNzcsNDY5LjY5bC0xMy40MiwyLjQ4YTEwLjI1LDEwLjI1LDAsMCwwLTgsMTEuOTJsMi4zOCwxNGE5LjksOS45LDAsMCwwLDExLjQyLDguMzNsMTMuNDItMi40OGExMC4yNSwxMC4yNSwwLDAsMCw4LTExLjkybC0yLjM4LTE0QTkuOSw5LjksMCwwLDAsMTIzMS43Nyw0NjkuNjlabTcuMTcsMjAuODRhNi4zOSw2LjM5LDAsMCwxLTUsNy40M2wtOC4zNiwxLjU1YTYuMTcsNi4xNywwLDAsMS03LjEyLTUuMTlsLTEuNDgtOC43M2E2LjM5LDYuMzksMCwwLDEsNS03LjQzbDguMzYtMS41NWE2LjE3LDYuMTcsMCwwLDEsNy4xMiw1LjE5WlwiLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTE0XCIgZD1cIk0xMjMzLjc0LDQ3MS4xM2wtMTMuNDIsMi40OGExMC4yNSwxMC4yNSwwLDAsMC04LDExLjkybDIuMzgsMTRhOS45LDkuOSwwLDAsMCwxMS40Miw4LjMzbDEzLjQyLTIuNDhhMTAuMjUsMTAuMjUsMCwwLDAsOC0xMS45MmwtMi4zOC0xNEE5LjksOS45LDAsMCwwLDEyMzMuNzQsNDcxLjEzWm03LjE3LDIwLjg0YTYuMzksNi4zOSwwLDAsMS01LDcuNDNsLTguMzYsMS41NWE2LjE3LDYuMTcsMCwwLDEtNy4xMi01LjE5TDEyMTksNDg3YTYuMzksNi4zOSwwLDAsMSw1LTcuNDNsOC4zNi0xLjU1YTYuMTcsNi4xNywwLDAsMSw3LjEyLDUuMTlaXCIvPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8ZyBpZD1cImJpa2VcIiBkYXRhLW5hbWU9XCJMYXllciA1XCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy04IHdoZWVsXCIgZD1cIk0xMTM5LjgyLDc4MC40NGE3Ni41OSw3Ni41OSwwLDEsMC01Ny45LDkxLjUzQTc2LjU5LDc2LjU5LDAsMCwwLDExMzkuODIsNzgwLjQ0Wm0tMjguMTIsNi4zM2E0Ny41OSw0Ny41OSwwLDAsMSwuODMsMTUuOGMtMzAuMTQtNi4yOC00Ny42OC0yMS42NS01NC4zOS01Mi41MkE0Ny43Myw0Ny43MywwLDAsMSwxMTExLjY5LDc4Ni43N1ptLTcwLjQ2LTMwLjljMTAuMzUsMjYuODgsMTAuMTQsNTAuNC0xMy43Myw3MC43N2E0Ny42Nyw0Ny42NywwLDAsMSwxMy43My03MC43N1ptMzQuMzUsODhhNDcuNTUsNDcuNTUsMCwwLDEtMzQuOTQtNS42MmMxNi44LTIwLjM2LDQxLjcxLTI1Ljk0LDY3LjA5LTE5LjQ2QTQ3LjY2LDQ3LjY2LDAsMCwxLDEwNzUuNTgsODQzLjg1WlwiLz5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLTggd2hlZWxcIiBkPVwiTTg2NC44OSw3ODkuNjlhNzYuNTksNzYuNTksMCwxLDAtNjYuMTMsODUuNzhBNzYuNTksNzYuNTksMCwwLDAsODY0Ljg5LDc4OS42OVptLTI4LjU5LDMuN2E0Ny41OSw0Ny41OSwwLDAsMS0uNjQsMTUuODFjLTI5LjQzLTktNDUuNDctMjYtNDkuMy01Ny4zM0E0Ny43Myw0Ny43MywwLDAsMSw4MzYuMyw3OTMuMzlaTTc2OSw3NTYuMWM3LjgyLDI3LjcyLDUuNDMsNTEuMTItMjAuMjIsNjkuMkE0Ny42Nyw0Ny42NywwLDAsMSw3NjksNzU2LjFabTI2LjA2LDkwLjc4YTQ3LjU1LDQ3LjU1LDAsMCwxLTM0LjI3LTguODNjMTguNjEtMTguNzIsNDMuOTMtMjIsNjguNi0xMy4xNkE0Ny42Niw0Ny42NiwwLDAsMSw3OTUuMDYsODQ2Ljg4WlwiLz5cbiAgICAgICAgICAgICAgICAgIDxnPlxuICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz1cImNscy0xXCIgeD1cIjg3MS4zOVwiIHk9XCI2OTMuMzdcIiB3aWR0aD1cIjEyLjg3XCIgaGVpZ2h0PVwiNTMuMjFcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTE2NS45NyAyNzMuMzgpIHJvdGF0ZSgtMTYuMTkpXCIvPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy01XCIgZD1cIk04MTMuOTMsNjc5LjM1Yy0zLjcyLTUuMiwyLjI0LTE4LjUsOS4xNi0xNi4xMywzMy40MywxMS40Niw3My44NSwxMC40NSw3My44NSwxMC40NSw4Ljg0LjE1LDE0LjQ0LDEwLjM0LDcuMjcsMTUuNDgtMTQuMzYsOC43OS0zMy4xMywxNy01Ni4zNSw5Ljc2QzgzMC4xNyw2OTMuNDEsODE5LjgzLDY4Ny42LDgxMy45Myw2NzkuMzVaXCIvPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy03XCIgZD1cIk04MTMuOTMsNjc5LjM1Yy0zLjcyLTUuMiwyLjI0LTE4LjUsOS4xNi0xNi4xMywzMy40MywxMS40Niw3My44NSwxMC40NSw3My44NSwxMC40NSw4Ljg0LjE1LDE0LjQ0LDEwLjM0LDcuMjcsMTUuNDgtMTQuMzYsOC43OS0zMy4xMywxNy01Ni4zNSw5Ljc2QzgzMC4xNyw2OTMuNDEsODE5LjgzLDY4Ny42LDgxMy45Myw2NzkuMzVaXCIvPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy01XCIgZD1cIk04MTcuMTUsNjgwLjA2Yy0zLjU5LTUsMS42OS0xNi41MSw4LjM3LTE0LjIyLDMyLjMsMTEuMDksNzEuNDEsNy44Myw3MS40MSw3LjgzLDguNTQuMTQsMTcuNDUsOS45NCw3LjQzLDE1Ljg4LTEzLjg3LDguNTEtMzIsMTYuNDQtNTQuNDQsOS40NEM4MzIuODQsNjkzLjY3LDgyMi44NSw2ODgsODE3LjE1LDY4MC4wNlpcIi8+XG4gICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICA8Zz5cbiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz1cImNscy05XCIgY3g9XCIxMDIyLjY2XCIgY3k9XCI1OTkuNTVcIiByPVwiMTEuNTdcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTQuODYgOC4zOCkgcm90YXRlKC0wLjQ3KVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtMVwiIGQ9XCJNMTA2OS43Niw3OTIuMzdsLTM0Ljg5LTk2Ljc0LDEuOTMtLjgtMS43MS00LjE1LTEuNzQuNzItMTMuMjYtMzYuNzYsMS4yNy0uNDItMi4yNS02Ljc2LDUuOTQtMi0yLjU3LTcuNzItOS43LDMuMjJjLTExLjU1LTIyLjU1LDItMzYuMzMsMTUtNDEuODZsLTUuNTctOC44MWMtMjMsMTAuMjktMjkuNjEsMjguNzUtMTkuNTMsNTRsLTkuMzgsMy4xMiwyLjU2LDcuNzIsNS40Ny0xLjgyLDIuMjUsNi43NiwyLjM2LS43OCwxMy42MiwzNy43Ni0yLjM1LDEsMS43MSw0LjE1LDIuMTYtLjg5LDM0LjY1LDk2LjA5YTcuNDcsNy40NywwLDAsMCw5LjU2LDQuNDloMEE3LjQ3LDcuNDcsMCwwLDAsMTA2OS43Niw3OTIuMzdaXCIvPlxuICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVwiY2xzLTExXCIgY3g9XCIxMDI3LjlcIiBjeT1cIjU4Ny45NFwiIHI9XCIxMi45OVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNC43NyA4LjQyKSByb3RhdGUoLTAuNDcpXCIvPlxuICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtNVwiIGQ9XCJNMTAyMS4yOSw2NTRsLTE3LjczLDYuMTUsMS43Miw1LjU5LTMxLjQxLDgyLjM2Yy0xOS4zNSwzMi41My02Ni4zLDM2LjcyLTc1LjU2LDE2LjY4bC03LjA5LTIxLjVMODc5LDc0Ny4xbDMuMjgsMTAuMDktOTQuNjUsMzMuOTVjLTExLjQ5LDIuMjktMTEuODUsMTUuNzktMi42MSwxNy44NCwwLDAsMzkuMTEsMy42NiwxMDMsOS41YTkyLjc1LDkyLjc1LDAsMCwwLDQwLjg5LTUuMjljNDQuMzItMTYuNTYsNTcuNzMtNTAuNjcsNTcuNzMtNTAuNjdsMjYuODItNjcuMjZhMS4zNywxLjM3LDAsMCwxLDIuNTMsMGwxLjQyLDMuMzMsMTcuNzUtNy42MlpcIi8+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy03XCIgZD1cIk0xMDIxLjI5LDY1NGwtMTcuNzMsNi4xNSwxLjcyLDUuNTktMzEuNDEsODIuMzZjLTE5LjM1LDMyLjUzLTY2LjMsMzYuNzItNzUuNTYsMTYuNjhsLTcuMDktMjEuNUw4NzksNzQ3LjFsMy4yOCwxMC4wOS05NC42NSwzMy45NWMtMTEuNDksMi4yOS0xMS44NSwxNS43OS0yLjYxLDE3Ljg0LDAsMCwzOS4xMSwzLjY2LDEwMyw5LjVhOTIuNzUsOTIuNzUsMCwwLDAsNDAuODktNS4yOWM0NC4zMi0xNi41Niw1Ny43My01MC42Nyw1Ny43My01MC42N2wyNi44Mi02Ny4yNmExLjM3LDEuMzcsMCwwLDEsMi41MywwbDEuNDIsMy4zMywxNy43NS03LjYyWlwiLz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDx2LWxheW91dCByb3c+XG4gICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kNCBvZmZzZXQtbWQ0IGxnNCBvZmZzZXQtbGc0IHhsNCBvZmZzZXQteGw0PlxuICAgICAgICAgICAgPHYtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgPHYtYnRuIEBjbGljay5uYXRpdmU9XCJnb0hvbWUoKVwiIGJsb2NrIGZsYXQgY2xhc3M9XCJpbmZvLS10ZXh0IGluZm9cIj5CYWNrIFRvIEhvbWVQYWdlPC92LWJ0bj5cbiAgICAgICAgICAgIDx2LWJ0biBAY2xpY2submF0aXZlPVwiZ29TaG9wKClcIiBibG9jayBmbGF0IGNsYXNzPVwicHJpbWFyeS0tdGV4dCBwcmltYXJ5XCI+Q29udGludWUgU2hvcHBpbmc8L3YtYnRuPlxuICAgICAgICAgICAgPC92LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgPC92LWNvbnRhaW5lcj5cblxuICAgIDwvdi1jYXJkLXRleHQ+XG4gICAgICA8L3YtY2FyZD5cbiAgICA8L21vZGFsPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG1vdW50ZWQgKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgc2VsZi4kbW9kYWwuc2hvdygnNDA0LW5vdC1mb3VuZCcpXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHJlZGlyZWN0QmFjayAoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHNlbGYuJG1vZGFsLmhpZGUoJzQwNC1ub3QtZm91bmQnKVxuICAgICAgICAgICAgc2VsZi4kcm91dGVyLmdvKC0yKVxuICAgICAgICB9LFxuICAgICAgICBnb0hvbWUgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLiRtb2RhbC5oaWRlKCc0MDQtbm90LWZvdW5kJylcbiAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHtuYW1lOiAnaG9tZSd9KVxuICAgICAgICB9LFxuICAgICAgICBnb1Nob3AgKCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBzZWxmLiRtb2RhbC5oaWRlKCc0MDQtbm90LWZvdW5kJylcbiAgICAgICAgICAgIHNlbGYuJHJvdXRlci5wdXNoKHtuYW1lOiAncHJvZHVjdC5pbmRleCd9KVxuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG48c3R5bGUgc2NvcGVkPlxuLmNscy0xIHtcbiAgZmlsbDogI2ZmYzU0MTtcbn1cblxuLmNscy0yIHtcbiAgZmlsbDogIzRlNDA2Njtcbn1cblxuLmNscy0zIHtcbiAgZmlsbDogIzZmNWI5Mjtcbn1cblxuLmNscy00IHtcbiAgZmlsbDogI2Y3OGQ1ZTtcbn1cblxuLmNscy01IHtcbiAgZmlsbDogI2ZhOTc2Yztcbn1cblxuLmNscy02LFxuLmNscy03LFxuLmNscy04IHtcbiAgZmlsbDogI2I2NWMzMjtcbn1cblxuLmNscy0xMCxcbi5jbHMtNiB7XG4gIG9wYWNpdHk6IDAuNjtcbn1cblxuLmNscy03IHtcbiAgb3BhY2l0eTogMC40O1xufVxuXG4uY2xzLTkge1xuICBmaWxsOiAjZjRiNzNiO1xufVxuXG4uY2xzLTExIHtcbiAgZmlsbDogI2Y5YzM1ODtcbn1cblxuLmNscy0xMiB7XG4gIGZpbGw6ICM5YjQ2MmM7XG59XG5cbi5jbHMtMTMge1xuICBmaWxsOiAjYWE1MTJlO1xufVxuXG4uY2xzLTE0IHtcbiAgZmlsbDogIzdkNmFhNTtcbn1cblxuLyogYW5pbWF0aW9ucyAqL1xuXG4ud2hlZWwge1xuICBhbmltYXRpb246IHdoZWVsLXJvdGF0ZSA2cyBlYXNlIGluZmluaXRlO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xufVxuXG5Aa2V5ZnJhbWVzIHdoZWVsLXJvdGF0ZSB7XG4gIDUwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC41NSwgMC4wODUsIDAuNjgsIDAuNTMpO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDk2MGRlZylcbiAgfVxufVxuXG4uY2xvY2staGFuZC0xIHtcbiAgYW5pbWF0aW9uOiBjbG9jay1yb3RhdGUgM3MgbGluZWFyIGluZmluaXRlO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xufVxuXG4uY2xvY2staGFuZC0yIHtcbiAgYW5pbWF0aW9uOiBjbG9jay1yb3RhdGUgNnMgbGluZWFyIGluZmluaXRlO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xufVxuXG5Aa2V5ZnJhbWVzIGNsb2NrLXJvdGF0ZSB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZylcbiAgfVxufVxuXG4jYm94LXRvcCB7XG4gIGFuaW1hdGlvbjogYm94LXRvcC1hbmltIDJzIGxpbmVhciBpbmZpbml0ZTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgdG9wO1xuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcbn1cblxuQGtleWZyYW1lcyBib3gtdG9wLWFuaW0ge1xuICA1MCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC01ZGVnKVxuICB9XG59XG5cbiN1bWJyZWxsYSB7XG4gIGFuaW1hdGlvbjogdW1icmVsbGEtYW5pbSA2cyBsaW5lYXIgaW5maW5pdGU7XG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XG59XG5cbkBrZXlmcmFtZXMgdW1icmVsbGEtYW5pbSB7XG4gIDI1JSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpIHJvdGF0ZSg1ZGVnKTtcbiAgfVxuICA3NSUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC01ZGVnKTtcbiAgfVxufVxuXG4jY3VwIHtcbiAgYW5pbWF0aW9uOiBjdXAtcm90YXRlIDNzIGN1YmljLWJlemllcigwLjQ1NSwgMC4wMywgMC41MTUsIDAuOTU1KSBpbmZpbml0ZTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xufVxuXG5Aa2V5ZnJhbWVzIGN1cC1yb3RhdGUge1xuICA1MCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC01ZGVnKVxuICB9XG59XG5cbiNwaWxsb3cge1xuICBhbmltYXRpb246IHBpbGxvdy1hbmltIDNzIGxpbmVhciBpbmZpbml0ZTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcbn1cblxuQGtleWZyYW1lcyBwaWxsb3ctYW5pbSB7XG4gIDI1JSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTBkZWcpIHRyYW5zbGF0ZVkoNXB4KVxuICB9XG4gIDc1JSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTEwZGVnKVxuICB9XG59XG5cbiNzdHJpcGUge1xuICBhbmltYXRpb246IHN0cmlwZS1hbmltIDNzIGxpbmVhciBpbmZpbml0ZTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcbn1cblxuQGtleWZyYW1lcyBzdHJpcGUtYW5pbSB7XG4gIDI1JSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTBweCwgMCkgcm90YXRlKC0xMGRlZylcbiAgfVxuICA3NSUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMHB4KVxuICB9XG59XG5cbiNiaWtlIHtcbiAgYW5pbWF0aW9uOiBiaWtlLWFuaW0gNnMgZWFzZSBpbmZpbml0ZTtcbn1cblxuQGtleWZyYW1lcyBiaWtlLWFuaW0ge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMzAwcHgpXG4gIH1cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNDcsIDAsIDAuNzQ1LCAwLjcxNSk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEzMDBweClcbiAgfVxufVxuXG4jcnVja3NhY2sge1xuICBhbmltYXRpb246IHJ1Y2stYW5pbSAzcyBsaW5lYXIgaW5maW5pdGU7XG4gIHRyYW5zZm9ybS1vcmlnaW46IHRvcDtcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XG59XG5cbkBrZXlmcmFtZXMgcnVjay1hbmltIHtcbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg1ZGVnKVxuICB9XG59XG5cbi5jaXJjbGUge1xuICBhbmltYXRpb246IGNpcmNsZS1hbmltIGVhc2UgaW5maW5pdGU7XG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcbiAgdHJhbnNmb3JtLWJveDogZmlsbC1ib3g7XG4gIHBlcnNwZWN0aXZlOiAwcHg7XG59XG5cbi5jaXJjbGUuYzEge1xuICBhbmltYXRpb24tZHVyYXRpb246IDJzXG59XG5cbi5jaXJjbGUuYzIge1xuICBhbmltYXRpb24tZHVyYXRpb246IDNzXG59XG5cbi5jaXJjbGUuYzMge1xuICBhbmltYXRpb24tZHVyYXRpb246IDFzXG59XG5cbi5jaXJjbGUuYzQge1xuICBhbmltYXRpb24tZHVyYXRpb246IDFzXG59XG5cbi5jaXJjbGUuYzUge1xuICBhbmltYXRpb24tZHVyYXRpb246IDJzXG59XG5cbi5jaXJjbGUuYzYge1xuICBhbmltYXRpb24tZHVyYXRpb246IDNzXG59XG5cbkBrZXlmcmFtZXMgY2lyY2xlLWFuaW0ge1xuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoLjIpIHJvdGF0ZVgoMzYwZGVnKSByb3RhdGVZKDM2MGRlZylcbiAgfVxufVxuXG4uZm91cixcbiNvdSB7XG4gIGFuaW1hdGlvbjogZm91ci1hbmltIGN1YmljLWJlemllcigwLjM5LCAwLjU3NSwgMC41NjUsIDEpIGluZmluaXRlO1xufVxuXG4uZm91ci5hIHtcbiAgdHJhbnNmb3JtLW9yaWdpbjogYm90dG9tIGxlZnQ7XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogM3M7XG4gIHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94O1xufVxuXG4uZm91ci5iIHtcbiAgdHJhbnNmb3JtLW9yaWdpbjogYm90dG9tIHJpZ2h0O1xuICBhbmltYXRpb24tZHVyYXRpb246IDNzO1xuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcbn1cblxuI291IHtcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA2cztcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICB0cmFuc2Zvcm0tYm94OiBmaWxsLWJveDtcbn1cblxuQGtleWZyYW1lcyBmb3VyLWFuaW0ge1xuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoLjk4KVxuICB9XG59XG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIE5vdEZvdW5kLnZ1ZT8xNTliMWFiYSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJtb2RhbFwiLFxuICAgIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIG5hbWU6IFwiNDA0LW5vdC1mb3VuZFwiLFxuICAgICAgICBhZGFwdGl2ZTogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICBjbGlja1RvQ2xvc2U6IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgeyBhdHRyczogeyBmbGF0OiB0cnVlIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LXRvb2xiYXJcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYWNjZW50XCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGljb246IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ucmVkaXJlY3RCYWNrKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJhcnJvd19iYWNrXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtdG9vbGJhci10aXRsZVwiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1jZW50ZXIgcHJpbWFyeS0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcIlBBR0UgTk9UIEZPVU5EXCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtdG9vbGJhci1pdGVtc1wiLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5LS10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZmxhdDogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5nb0hvbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgcmlnaHQ6IFwiXCIsIGRhcms6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJob21lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1jYXJkLXRleHRcIixcbiAgICAgICAgICAgIHsgc3RhdGljU3R5bGU6IHsgXCJwYWRkaW5nLXRvcFwiOiBcIjEwMHB4XCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyBmbHVpZDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbTEyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1kNDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9mZnNldC1tZDRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZzQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvZmZzZXQtbGc0XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeGw0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib2Zmc2V0LXhsNFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwid3JhcHBlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ZnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3Qm94OiBcIjAgMCAxOTIwIDEwODBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRpdGxlXCIsIFtfdm0uX3YoXCI0MDRcIildKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTGF5ZXJfMTIgeWVsbG93LWJhY2stZmlnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1uYW1lXCI6IFwiTGF5ZXIgMTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNNjAwLjg3LDg3MkgxNTZhNCw0LDAsMCwwLTMuNzgsNC4xOWgwYTQsNCwwLDAsMCwzLjc4LDQuMTlINjAwLjg3YTQsNCwwLDAsMCwzLjc4LTQuMTloMEE0LDQsMCwwLDAsNjAwLjg3LDg3MlpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInJlY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IFwiNjgwLjkxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogXCI4NzEuOThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI1MTMuMzhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiOC4zOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ4OiBcIjQuMTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeTogXCI0LjE5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNMTQ4MCw4NzYuMTdoMGMwLDIuMzIsMi4zNyw0LjE5LDUuMyw0LjE5aDM1MC42MWMyLjkzLDAsNS4zLTEuODgsNS4zLTQuMTloMGMwLTIuMzItMi4zNy00LjE5LTUuMy00LjE5SDE0ODUuMjZDMTQ4Mi4zMyw4NzIsMTQ4MCw4NzMuODYsMTQ4MCw4NzYuMTdaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBcIjQ5Mi4yMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFwiOTIwLjY0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMjQ5LjhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiOC4zOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ4OiBcIjQuMTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeTogXCI0LjE5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNMTU0OS4xNCw5MjQuODRoMGE0LjE5LDQuMTksMCwwLDAtNC4xOS00LjE5SDEwNjcuNDZhMTQuNjYsMTQuNjYsMCwwLDEsLjM1LDMuMjF2MUE0LjE5LDQuMTksMCwwLDAsMTA3Miw5MjloNDcyLjk0QTQuMTksNC4xOSwwLDAsMCwxNTQ5LjE0LDkyNC44NFpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBhdGhcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk04NjUuNSw5MjQuODRoMGE0LjE5LDQuMTksMCwwLDAsNC4xOSw0LjE5aDgyLjM3YTEyLjI4LDEyLjI4LDAsMCwxLS4xOS0ydi0yLjE3YTQuMTksNC4xOSwwLDAsMC00LjE5LTQuMTloLTc4QTQuMTksNC4xOSwwLDAsMCw4NjUuNSw5MjQuODRaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBcIjkxNS42XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogXCI5ODEuNDdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI1NC43MlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCI4LjM5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcng6IFwiNC4xOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ5OiBcIjQuMTlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBhdGhcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk03MzAuMzMsOTg1LjY3aDBjMCwyLjMyLDQuMjMsNC4xOSw5LjQ0LDQuMTloMTA0LjNjNS4yMiwwLDkuNDQtMS44OCw5LjQ0LTQuMTloMGMwLTIuMzItNC4yMy00LjE5LTkuNDQtNC4xOUg3MzkuNzhDNzM0LjU2LDk4MS40Nyw3MzAuMzMsOTgzLjM1LDczMC4zMyw5ODUuNjdaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBcIjk5Ny4wNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFwiOTgxLjQ3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNzguMTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiOC4zOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ4OiBcIjQuMTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeTogXCI0LjE5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJnXCIsIHsgYXR0cnM6IHsgaWQ6IFwicm91bmQtY29uZlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBhdGhcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy0xIGNpcmNsZSBjMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk01MzYuNDEsMTU1LjE0YTE3Ljc3LDE3Ljc3LDAsMSwwLDE3Ljc3LDE3Ljc3QTE3Ljc3LDE3Ljc3LDAsMCwwLDUzNi40MSwxNTUuMTRabTAsMjguNjhhMTAuOSwxMC45LDAsMSwxLDEwLjktMTAuOUExMC45LDEwLjksMCwwLDEsNTM2LjQxLDE4My44MVpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTEgY2lyY2xlIGMyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTEzNDUuMDksODIuNDRhMTcuNzcsMTcuNzcsMCwxLDAsMTcuNzcsMTcuNzdBMTcuNzcsMTcuNzcsMCwwLDAsMTM0NS4wOSw4Mi40NFptMCwyOC42OGExMC45LDEwLjksMCwxLDEsMTAuOS0xMC45QTEwLjksMTAuOSwwLDAsMSwxMzQ1LjA5LDExMS4xMlpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTEgY2lyY2xlIGMzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTcwLjEyLDM2M0ExNy43NywxNy43NywwLDEsMCw4Ny44OSwzODAuOCwxNy43NywxNy43NywwLDAsMCw3MC4xMiwzNjNabTAsMjguNjhBMTAuOSwxMC45LDAsMSwxLDgxLDM4MC44LDEwLjksMTAuOSwwLDAsMSw3MC4xMiwzOTEuN1pcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTEgY2lyY2xlIGM0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTE3MC40Nyw3NTEuODJhMTcuNzcsMTcuNzcsMCwxLDAsMTcuNzcsMTcuNzdBMTcuNzcsMTcuNzcsMCwwLDAsMTcwLjQ3LDc1MS44MlptMCwyOC42OGExMC45LDEwLjksMCwxLDEsMTAuOS0xMC45QTEwLjksMTAuOSwwLDAsMSwxNzAuNDcsNzgwLjVaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBhdGhcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy0xIGNpcmNsZSBjNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk0xNDU3LjM0LDc2Mi43M2ExNy43NywxNy43NywwLDEsMCwxNy43NywxNy43N0ExNy43NywxNy43NywwLDAsMCwxNDU3LjM0LDc2Mi43M1ptMCwyOC42OGExMC45LDEwLjksMCwxLDEsMTAuOS0xMC45QTEwLjksMTAuOSwwLDAsMSwxNDU3LjM0LDc5MS40WlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtMSBjaXJjbGUgYzZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNMTgyOS4xNSw0MDcuNDlhMTcuNzcsMTcuNzcsMCwxLDAsMTcuNzcsMTcuNzdBMTcuNzcsMTcuNzcsMCwwLDAsMTgyOS4xNSw0MDcuNDlabTAsMjguNjhhMTAuOSwxMC45LDAsMSwxLDEwLjktMTAuOUExMC45LDEwLjksMCwwLDEsMTgyOS4xNSw0MzYuMTdaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZm9ydHlmb3VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1uYW1lXCI6IFwiTGF5ZXIgMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImdcIiwgeyBzdGF0aWNDbGFzczogXCJmb3VyIGFcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicmVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogXCIyMzMuNzRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFwiMzkxLjE0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMjAuNzFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCI0NjYuMjlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ4OiBcIjU3LjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ5OiBcIjU3LjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUoOTE4LjM5IDMzMC4xOSkgcm90YXRlKDkwKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBcIjMzMy44M1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogXCI0NzUuMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTIwLjcxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMzk2Ljg4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeDogXCI2MC4zNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnk6IFwiNjAuMzZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicmVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogXCIxOTcuMTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFwiMTIyLjg5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMjAuNzFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCI2MDQuNzVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ4OiBcIjYwLjM2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeTogXCI2MC4zNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZSgyOTAuNDkgLTcwLjc4KSByb3RhdGUoMzUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImdcIiwgeyBzdGF0aWNDbGFzczogXCJmb3VyIGJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicmVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogXCIxNTU4Ljg0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBcIjM5MS45MVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTIwLjcxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiNDY2LjI5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeDogXCI1Ny4xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeTogXCI1Ny4xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlKDIyNDQuMjYgLTk5NC4xNCkgcm90YXRlKDkwKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBcIjE2NTguOTJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFwiNDc1Ljg3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMjAuNzFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIzOTYuODhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ4OiBcIjYwLjM2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeTogXCI2MC4zNlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBcIjE1MjIuMjJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFwiMTIzLjY2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMjAuNzFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCI2MDQuNzVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ4OiBcIjYwLjM2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeTogXCI2MC4zNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZSg1MzAuNTcgLTgzMC42OCkgcm90YXRlKDM1KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJvdVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk05NTYuNTQsMTY4LjJjLTE5NC4zNCwwLTM1MS44OSwxNTcuNTUtMzUxLjg5LDM1MS44OVM3NjIuMTksODcyLDk1Ni41NCw4NzJzMzUxLjg5LTE1Ny41NSwzNTEuODktMzUxLjg5UzExNTAuODgsMTY4LjIsOTU2LjU0LDE2OC4yWm0wLDU4NC40OWMtMTI4LjQ2LDAtMjMyLjYtMTA0LjE0LTIzMi42LTIzMi42czEwNC4xNC0yMzIuNiwyMzIuNi0yMzIuNiwyMzIuNiwxMDQuMTQsMjMyLjYsMjMyLjZTMTA4NSw3NTIuNjksOTU2LjU0LDc1Mi42OVpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidW1icmVsbGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLW5hbWVcIjogXCJMYXllciAzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZ1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiY2lyY2xlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtNFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeDogXCIxMTg3LjUzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeTogXCIyNDAuM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcjogXCI3LjY2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlKDIzNi4zNiA5OTAuOCkgcm90YXRlKC00OS43MSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZ1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy01XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTEyMTkuNTYsMzU5LjY3bDU1LDEwMC41MmMzMi43LTQ4LjQ4LTYuODctMTQyLjQzLTkxLjc1LTIxNC4zOC04NC40MS03MS41NS0xODMtOTUuMzMtMjI1LjgxLTU2bDExNC4yMSw0NC4xNFpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy02XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTExODIuNzksMjQ1LjgxYy04NC40MS03MS41NS0xODMtOTUuMzMtMjI1LjgxLTU2bDExNC4yMSw0NC4xNFpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwb2x5Z29uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy03XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIxMTgyLjc5IDI0NS44MSAxMDcxLjE5IDIzMy45MSAxMjE5LjU2IDM1OS42NyAxMTgyLjc5IDI0NS44MVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicG9seWdvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjExODAuOTEgNDA5LjAyIDEyNzQuNTQgNDYwLjE5IDEyMTkuNTYgMzU5LjY3IDEwNzEuMTkgMjMzLjkxIDk1Ni45OCAxODkuNzYgMTAyMS45NSAyNzQuMjkgMTE4MC45MSA0MDkuMDJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZ1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy00XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBcIjk5Ny40NVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBcIjM1OC4zNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxNzUuNThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjUuMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUoMTA4LjIxIDk1NS4zOCkgcm90YXRlKC00OS43MSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy00XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBcIjEwMjguMDlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogXCIzOTkuMzZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMjEuNDZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjMyLjI3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ4OiBcIjEwLjczXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ5OiBcIjEwLjczXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZSg1MTUuMDQgLTU3My4xNikgcm90YXRlKDQwLjI5KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwaWxsb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLW5hbWVcIjogXCJMYXllciA0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy0xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTc1NCw2MjcuMDdjNywuNTQsMTIuOTItMi44MiwxMy4zNS03LjU5cy00Ljk1LTkuMjQtMTItOS44N2ExOC41NSwxOC41NSwwLDAsMC0yLjE3LDBsLTc0LjktODEuNjRjMC0uMSwwLS4xOSwwLS4yOSwwLTcuMDktNC0xMi44My04LjgtMTIuODFzLTguNzUsNS43Ny04LjczLDEyLjg3YzAsMCwwLC4wOSwwLC4xM2wtNTAuMjEsNDYuMDdoLS4wOWMtNy4wNi0uNjMtMTMuMTQsMi43Ny0xMy41Nyw3LjU5czQuODcsOS4xNiwxMS44NSw5Ljg0bDc2LjA4LDgyLjkyczAsMCwwLC4wNmMwLDcuMDksNCwxMi44Myw4LjgsMTIuODFzOC42NS01LjY2LDguNzEtMTIuNjVaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNNjY5LjQ2LDUxNC44MmMtNC43Ny0uODMtOC43NSw1Ljc3LTguNzMsMTIuODcsMCwwLDAsLjA5LDAsLjEzbC01MC4yMSw0Ni4wN2gtLjA5Yy03LjA2LS42My0xMy4xNCwyLjc3LTEzLjU3LDcuNTlzNC44Nyw5LjE2LDExLjg1LDkuODRsNzYuMDgsODIuOTJzMCwwLDAsLjA2YzAsNy4wOSw0LDEyLjgzLDguOCwxMi44MXM4LjY1LTUuNjYsOC43MS0xMi42NUM1NzAuNTUsNTczLDcwMi4wNyw1MjAuNDcsNjY5LjQ2LDUxNC44MlpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwiY3VwXCIsIFwiZGF0YS1uYW1lXCI6IFwiTGF5ZXIgN1wiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicG9seWdvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy0xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIxMTczLjY5IDc0OC4yMSAxMTQwLjUyIDcxNS40MiAxMTk1Ljc5IDY0Ny4zNSAxMjQxLjEzIDY5Mi4xNiAxMTczLjY5IDc0OC4yMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicG9seWdvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy04XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIxMTczLjY5IDc0OC4yMSAxMTQwLjUyIDcxNS40MiAxMTQzLjkzIDcxMS4yNyAxMTc3LjgxIDc0NC43NSAxMTczLjY5IDc0OC4yMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicG9seWdvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy01XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIxMTk0LjY4IDczMS40NiAxMTU3LjA0IDY5NC4yNCAxMTgzLjggNjYxLjcgMTIyNi45MSA3MDQuMzIgMTE5NC42OCA3MzEuNDZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImdcIiwgeyBzdGF0aWNDbGFzczogXCJjbHMtMTBcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNMTE3Ni4zMiw2NjcuNzhoMGE0LjE5LDQuMTksMCwwLDEsNC4xOSw0LjE5djMzLjU0YTAsMCwwLDAsMSwwLDBoLTguMzhhMCwwLDAsMCwxLDAsMFY2NzJhNC4xOSw0LjE5LDAsMCwxLDQuMTktNC4xOVpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUoODIyLjUzIC02MjguNjcpIHJvdGF0ZSg0NC42NylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNMTE3Mi43Myw3MDkuN2wyMy41OC0yMy44NWE0LjE5LDQuMTksMCwwLDEsNS45MiwwaDBhNC4xOSw0LjE5LDAsMCwxLDAsNS45MmwtMjMuNTgsMjMuODVaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBhdGhcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy04XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTExODUuMTEsNzIyLjA5bDIzLjU4LTIzLjg1YTQuMTksNC4xOSwwLDAsMSw1LjkyLDBoMGE0LjE5LDQuMTksMCwwLDEsMCw1LjkyTDExOTEuMDYsNzI4WlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNMTE5Ny44NSw2NjAuNWg0NS42OWE1LjcsNS43LDAsMCwxLDUuNyw1Ljd2OC4zMmEwLDAsMCwwLDEsMCwwaC01Ny4wOWEwLDAsMCwwLDEsMCwwdi04LjMyQTUuNyw1LjcsMCwwLDEsMTE5Ny44NSw2NjAuNVpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZSg4MjkuNTMgLTY2Ny42Nikgcm90YXRlKDQ1KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy04XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTExOTEuNDksNjY0Ljc0aDUzLjk0YTUuMjUsNS4yNSwwLDAsMSw1LjI1LDUuMjV2NC43OWEwLDAsMCwwLDEsMCwwaC02NC40NGEwLDAsMCwwLDEsMCwwVjY3MGE1LjI1LDUuMjUsMCwwLDEsNS4yNS01LjI1WlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlKDgyMi44MyAtNjYzLjE3KSByb3RhdGUoNDQuNjcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImNsb2NrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1uYW1lXCI6IFwiTGF5ZXIgOFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImNpcmNsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy01XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3g6IFwiODQ3LjdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeTogXCIyNDcuNTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiBcIjc0LjY2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUoLTMyLjkxIDMxNC4wNSkgcm90YXRlKC0yMC42KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiY2lyY2xlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeDogXCI4NDcuN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5OiBcIjI0Ny41OVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHI6IFwiNjMuNDRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZSgtMzIuOTEgMzE0LjA1KSByb3RhdGUoLTIwLjYpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTMgY2xvY2staGFuZC0xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogXCI4NDVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBcIjE4OS41XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNi4wNFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCI1OFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ4OiBcIjMuMDJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeTogXCIzLjAyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTMgY2xvY2staGFuZC0yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogXCI4NDVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBcIjIwOS41XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNi4wNFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIzOFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ4OiBcIjMuMDJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByeTogXCIzLjAyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUoMTYxMS4yMiAtMjMwLjQpIHJvdGF0ZSgxMzAuNClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImNpcmNsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy0zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3g6IFwiODQ3LjdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeTogXCIyNDcuNTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZSgtMzIuOTEgMzE0LjA1KSByb3RhdGUoLTIwLjYpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcjogXCIzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGlkOiBcImJveFwiLCBcImRhdGEtbmFtZVwiOiBcIkxheWVyIDlcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImdcIiwgeyBhdHRyczogeyBpZDogXCJib3gtdG9wXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicG9seWdvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjU2OS43MSAzODIuMjggNjUzLjc0IDMyOS4zOSA3NDcuMTMgMzIwLjEgNjc5LjIgMzY5Ljg1IDU2OS43MSAzODIuMjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicG9seWdvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjY5MS45NSAzNjcuMiA1NzAuODcgMzkyLjM0IDU2NS4zMiAzODMuMzUgNjg3LjggMzU3LjQ1IDY5MS45NSAzNjcuMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwb2x5Z29uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiNjYxLjU0IDMzNy40OCA1NzAuODcgMzkyLjM0IDU2Mi40MiAzNzguOTIgNjUyLjI1IDMyMi4zOCA2NTguMTIgMzIxLjM0IDY2MS41NCAzMzcuNDhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicG9seWdvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjY2MS41NCAzMzcuNDggNTcwLjg3IDM5Mi4zNCA1NjIuNDIgMzc4LjkyIDY1Mi4yNSAzMjIuMzggNjU4LjEyIDMyMS4zNCA2NjEuNTQgMzM3LjQ4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBvbHlnb25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy01XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50czpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI3NDcuMTMgMzIwLjEgNjYxLjU0IDMzNy40OCA2NTIuMjUgMzIyLjM4IDczOC40IDMwNy4xIDc0Ny4xMyAzMjAuMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNNTg4LjI4LDQyMC4yNnMzLjQ0LDUuMiw1LjE5LDhsNDMuMSw2OC40OCwxNTguODEtMTAwLTQzLjEtNjguNDhxLTIuNjMtNC4xNy01LjQ3LThaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNNTg4LjI4LDQyMC4yNnMzLjQ0LDUuMiw1LjE5LDhsNDMuMSw2OC40OCwxNTguODEtMTAwLTQzLjEtNjguNDhxLTIuNjMtNC4xNy01LjQ3LThaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJyZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBcIjY5My43M1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFwiMzM1LjUxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiODMuOTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiOTAuNThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZSgtODkuNzggNDUwLjQzKSByb3RhdGUoLTMyLjE5KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJydWNrc2Fja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGEtbmFtZVwiOiBcIkxheWVyIDZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJnXCIsIHsgYXR0cnM6IHsgaWQ6IFwic3RyaXBlXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTEyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTEyMDAuMzIsNDczLjkxaDBhMTMuNzQsMTMuNzQsMCwwLDAtMTguNDEsNy40NGwtNTUsMTI5Ljg2YTE0LjgyLDE0LjgyLDAsMCwwLDcuMTMsMTkuMjFoMGExMy43NCwxMy43NCwwLDAsMCwxOC40MS03LjQ0bDU1LTEyOS44NkExNC44MiwxNC44MiwwLDAsMCwxMjAwLjMyLDQ3My45MVpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTEzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTEyMDIuMTgsNjA2LjM0aDBhMTQsMTQsMCwwLDAtMTYuMTgtMTEuOGwtNDguODMsOWMtNy41OSwxLjQtMTIuNjYsOS0xMS4zMSwxNi44OWgwYTE0LDE0LDAsMCwwLDE2LjE4LDExLjhsNDguODMtOUMxMTk4LjQ2LDYyMS44MiwxMjAzLjUzLDYxNC4yNiwxMjAyLjE4LDYwNi4zNFpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy04XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTEzMDAuODYsNjAzbC0xMjIuOTMsMjIuNzQtMTUuNDQtOTAuOTFjLTUuNzUtMzMuODYsMTUuODktNjYuMTcsNDguMzQtNzIuMThsMTEuNTgtMi4wOGMzMi40NS02LDU3LjI2LDE3LjY2LDYzLDUxLjUxWlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy0xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTEzMDcsNjAxLjkxbC0xMTIuMzIsMjAuNzgtMTUuOS05My42MWMtNS41LTMyLjM2LDE1LjE5LTYzLjI1LDQ2LjItNjloMGMzMS01Ljc0LDYwLjYyLDE1Ljg1LDY2LjEyLDQ4LjIxWlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy04XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTEyOTYuNzYsNjAzLjgsMTIxNSw2MTguOTJsLTQuODktMjguNzdjLTIuMTEtMTIuNDIsNS44My0yNC4yNywxNy43My0yNi40N2wzOC42Ny03LjE1YzExLjktMi4yLDIzLjI2LDYuMDgsMjUuMzcsMTguNVpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBhdGhcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk0xMjk2Ljc2LDYwMy44bC03My40MSwxMy41OC00LjkyLTI5Yy0yLTExLjYyLDUuNDUtMjIuNzIsMTYuNi0yNC43OGwzMy4wNy02LjEyYzExLjE0LTIuMDYsMjEuNzcsNS42OSwyMy43NSwxNy4zMlpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBhdGhcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtNFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk0xMjMxLjc3LDQ2OS42OWwtMTMuNDIsMi40OGExMC4yNSwxMC4yNSwwLDAsMC04LDExLjkybDIuMzgsMTRhOS45LDkuOSwwLDAsMCwxMS40Miw4LjMzbDEzLjQyLTIuNDhhMTAuMjUsMTAuMjUsMCwwLDAsOC0xMS45MmwtMi4zOC0xNEE5LjksOS45LDAsMCwwLDEyMzEuNzcsNDY5LjY5Wm03LjE3LDIwLjg0YTYuMzksNi4zOSwwLDAsMS01LDcuNDNsLTguMzYsMS41NWE2LjE3LDYuMTcsMCwwLDEtNy4xMi01LjE5bC0xLjQ4LTguNzNhNi4zOSw2LjM5LDAsMCwxLDUtNy40M2w4LjM2LTEuNTVhNi4xNyw2LjE3LDAsMCwxLDcuMTIsNS4xOVpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBhdGhcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtMTRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNMTIzMy43NCw0NzEuMTNsLTEzLjQyLDIuNDhhMTAuMjUsMTAuMjUsMCwwLDAtOCwxMS45MmwyLjM4LDE0YTkuOSw5LjksMCwwLDAsMTEuNDIsOC4zM2wxMy40Mi0yLjQ4YTEwLjI1LDEwLjI1LDAsMCwwLDgtMTEuOTJsLTIuMzgtMTRBOS45LDkuOSwwLDAsMCwxMjMzLjc0LDQ3MS4xM1ptNy4xNywyMC44NGE2LjM5LDYuMzksMCwwLDEtNSw3LjQzbC04LjM2LDEuNTVhNi4xNyw2LjE3LDAsMCwxLTcuMTItNS4xOUwxMjE5LDQ4N2E2LjM5LDYuMzksMCwwLDEsNS03LjQzbDguMzYtMS41NWE2LjE3LDYuMTcsMCwwLDEsNy4xMiw1LjE5WlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJiaWtlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1uYW1lXCI6IFwiTGF5ZXIgNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBhdGhcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtOCB3aGVlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk0xMTM5LjgyLDc4MC40NGE3Ni41OSw3Ni41OSwwLDEsMC01Ny45LDkxLjUzQTc2LjU5LDc2LjU5LDAsMCwwLDExMzkuODIsNzgwLjQ0Wm0tMjguMTIsNi4zM2E0Ny41OSw0Ny41OSwwLDAsMSwuODMsMTUuOGMtMzAuMTQtNi4yOC00Ny42OC0yMS42NS01NC4zOS01Mi41MkE0Ny43Myw0Ny43MywwLDAsMSwxMTExLjY5LDc4Ni43N1ptLTcwLjQ2LTMwLjljMTAuMzUsMjYuODgsMTAuMTQsNTAuNC0xMy43Myw3MC43N2E0Ny42Nyw0Ny42NywwLDAsMSwxMy43My03MC43N1ptMzQuMzUsODhhNDcuNTUsNDcuNTUsMCwwLDEtMzQuOTQtNS42MmMxNi44LTIwLjM2LDQxLjcxLTI1Ljk0LDY3LjA5LTE5LjQ2QTQ3LjY2LDQ3LjY2LDAsMCwxLDEwNzUuNTgsODQzLjg1WlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy04IHdoZWVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTg2NC44OSw3ODkuNjlhNzYuNTksNzYuNTksMCwxLDAtNjYuMTMsODUuNzhBNzYuNTksNzYuNTksMCwwLDAsODY0Ljg5LDc4OS42OVptLTI4LjU5LDMuN2E0Ny41OSw0Ny41OSwwLDAsMS0uNjQsMTUuODFjLTI5LjQzLTktNDUuNDctMjYtNDkuMy01Ny4zM0E0Ny43Myw0Ny43MywwLDAsMSw4MzYuMyw3OTMuMzlaTTc2OSw3NTYuMWM3LjgyLDI3LjcyLDUuNDMsNTEuMTItMjAuMjIsNjkuMkE0Ny42Nyw0Ny42NywwLDAsMSw3NjksNzU2LjFabTI2LjA2LDkwLjc4YTQ3LjU1LDQ3LjU1LDAsMCwxLTM0LjI3LTguODNjMTguNjEtMTguNzIsNDMuOTMtMjIsNjguNi0xMy4xNkE0Ny42Niw0Ny42NiwwLDAsMSw3OTUuMDYsODQ2Ljg4WlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZ1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicmVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogXCI4NzEuMzlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IFwiNjkzLjM3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMi44N1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjUzLjIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlKC0xNjUuOTcgMjczLjM4KSByb3RhdGUoLTE2LjE5KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbHMtNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk04MTMuOTMsNjc5LjM1Yy0zLjcyLTUuMiwyLjI0LTE4LjUsOS4xNi0xNi4xMywzMy40MywxMS40Niw3My44NSwxMC40NSw3My44NSwxMC40NSw4Ljg0LjE1LDE0LjQ0LDEwLjM0LDcuMjcsMTUuNDgtMTQuMzYsOC43OS0zMy4xMywxNy01Ni4zNSw5Ljc2QzgzMC4xNyw2OTMuNDEsODE5LjgzLDY4Ny42LDgxMy45Myw2NzkuMzVaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBhdGhcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy03XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTgxMy45Myw2NzkuMzVjLTMuNzItNS4yLDIuMjQtMTguNSw5LjE2LTE2LjEzLDMzLjQzLDExLjQ2LDczLjg1LDEwLjQ1LDczLjg1LDEwLjQ1LDguODQuMTUsMTQuNDQsMTAuMzQsNy4yNywxNS40OC0xNC4zNiw4Ljc5LTMzLjEzLDE3LTU2LjM1LDkuNzZDODMwLjE3LDY5My40MSw4MTkuODMsNjg3LjYsODEzLjkzLDY3OS4zNVpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNODE3LjE1LDY4MC4wNmMtMy41OS01LDEuNjktMTYuNTEsOC4zNy0xNC4yMiwzMi4zLDExLjA5LDcxLjQxLDcuODMsNzEuNDEsNy44Myw4LjU0LjE0LDE3LjQ1LDkuOTQsNy40MywxNS44OC0xMy44Nyw4LjUxLTMyLDE2LjQ0LTU0LjQ0LDkuNDRDODMyLjg0LDY5My42Nyw4MjIuODUsNjg4LDgxNy4xNSw2ODAuMDZaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImdcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImNpcmNsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3g6IFwiMTAyMi42NlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3k6IFwiNTk5LjU1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiBcIjExLjU3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlKC00Ljg2IDguMzgpIHJvdGF0ZSgtMC40NylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNMTA2OS43Niw3OTIuMzdsLTM0Ljg5LTk2Ljc0LDEuOTMtLjgtMS43MS00LjE1LTEuNzQuNzItMTMuMjYtMzYuNzYsMS4yNy0uNDItMi4yNS02Ljc2LDUuOTQtMi0yLjU3LTcuNzItOS43LDMuMjJjLTExLjU1LTIyLjU1LDItMzYuMzMsMTUtNDEuODZsLTUuNTctOC44MWMtMjMsMTAuMjktMjkuNjEsMjguNzUtMTkuNTMsNTRsLTkuMzgsMy4xMiwyLjU2LDcuNzIsNS40Ny0xLjgyLDIuMjUsNi43NiwyLjM2LS43OCwxMy42MiwzNy43Ni0yLjM1LDEsMS43MSw0LjE1LDIuMTYtLjg5LDM0LjY1LDk2LjA5YTcuNDcsNy40NywwLDAsMCw5LjU2LDQuNDloMEE3LjQ3LDcuNDcsMCwwLDAsMTA2OS43Niw3OTIuMzdaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImNpcmNsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTExXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN4OiBcIjEwMjcuOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3k6IFwiNTg3Ljk0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiBcIjEyLjk5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlKC00Ljc3IDguNDIpIHJvdGF0ZSgtMC40NylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicGF0aFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNscy01XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTTEwMjEuMjksNjU0bC0xNy43Myw2LjE1LDEuNzIsNS41OS0zMS40MSw4Mi4zNmMtMTkuMzUsMzIuNTMtNjYuMywzNi43Mi03NS41NiwxNi42OGwtNy4wOS0yMS41TDg3OSw3NDcuMWwzLjI4LDEwLjA5LTk0LjY1LDMzLjk1Yy0xMS40OSwyLjI5LTExLjg1LDE1Ljc5LTIuNjEsMTcuODQsMCwwLDM5LjExLDMuNjYsMTAzLDkuNWE5Mi43NSw5Mi43NSwwLDAsMCw0MC44OS01LjI5YzQ0LjMyLTE2LjU2LDU3LjczLTUwLjY3LDU3LjczLTUwLjY3bDI2LjgyLTY3LjI2YTEuMzcsMS4zNywwLDAsMSwyLjUzLDBsMS40MiwzLjMzLDE3Ljc1LTcuNjJaXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xzLTdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNMTAyMS4yOSw2NTRsLTE3LjczLDYuMTUsMS43Miw1LjU5LTMxLjQxLDgyLjM2Yy0xOS4zNSwzMi41My02Ni4zLDM2LjcyLTc1LjU2LDE2LjY4bC03LjA5LTIxLjVMODc5LDc0Ny4xbDMuMjgsMTAuMDktOTQuNjUsMzMuOTVjLTExLjQ5LDIuMjktMTEuODUsMTUuNzktMi42MSwxNy44NCwwLDAsMzkuMTEsMy42NiwxMDMsOS41YTkyLjc1LDkyLjc1LDAsMCwwLDQwLjg5LTUuMjljNDQuMzItMTYuNTYsNTcuNzMtNTAuNjcsNTcuNzMtNTAuNjdsMjYuODItNjcuMjZhMS4zNywxLjM3LDAsMCwxLDIuNTMsMGwxLjQyLDMuMzMsMTcuNzUtNy42MlpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhzMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc20xMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZDQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvZmZzZXQtbWQ0XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGc0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib2Zmc2V0LWxnNFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhsNDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9mZnNldC14bDRcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1hY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImluZm8tLXRleHQgaW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGJsb2NrOiBcIlwiLCBmbGF0OiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmdvSG9tZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiQmFjayBUbyBIb21lUGFnZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaW1hcnktLXRleHQgcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGJsb2NrOiBcIlwiLCBmbGF0OiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmdvU2hvcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiQ29udGludWUgU2hvcHBpbmdcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTZiYTYyNDM5XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02YmE2MjQzOVwiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9Ob3RGb3VuZC52dWVcbi8vIG1vZHVsZSBpZCA9IDY4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDExIl0sInNvdXJjZVJvb3QiOiIifQ==