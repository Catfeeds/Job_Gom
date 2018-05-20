"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t) {
  function e(i) {
    if (n[i]) return n[i].exports;var r = n[i] = { i: i, l: !1, exports: {} };return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports;
  }var n = {};e.m = t, e.c = n, e.i = function (t) {
    return t;
  }, e.d = function (t, n, i) {
    e.o(t, n) || Object.defineProperty(t, n, { configurable: !1, enumerable: !0, get: i });
  }, e.n = function (t) {
    var n = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };return e.d(n, "a", n), n;
  }, e.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, e.p = "/dist/", e(e.s = 35);
}([function (t, e, n) {
  "use strict";
  function i(t) {
    return "[object Array]" === A.call(t);
  }function r(t) {
    return "[object ArrayBuffer]" === A.call(t);
  }function o(t) {
    return "undefined" != typeof FormData && t instanceof FormData;
  }function a(t) {
    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && t.buffer instanceof ArrayBuffer;
  }function s(t) {
    return "string" == typeof t;
  }function c(t) {
    return "number" == typeof t;
  }function l(t) {
    return void 0 === t;
  }function u(t) {
    return null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
  }function f(t) {
    return "[object Date]" === A.call(t);
  }function d(t) {
    return "[object File]" === A.call(t);
  }function p(t) {
    return "[object Blob]" === A.call(t);
  }function h(t) {
    return "[object Function]" === A.call(t);
  }function v(t) {
    return u(t) && h(t.pipe);
  }function m(t) {
    return "undefined" != typeof URLSearchParams && t instanceof URLSearchParams;
  }function g(t) {
    return t.replace(/^\s*/, "").replace(/\s*$/, "");
  }function y() {
    return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;
  }function _(t, e) {
    if (null !== t && void 0 !== t) if ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && (t = [t]), i(t)) for (var n = 0, r = t.length; n < r; n++) {
      e.call(null, t[n], n, t);
    } else for (var o in t) {
      Object.prototype.hasOwnProperty.call(t, o) && e.call(null, t[o], o, t);
    }
  }function b() {
    function t(t, n) {
      "object" == _typeof(e[n]) && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? e[n] = b(e[n], t) : e[n] = t;
    }for (var e = {}, n = 0, i = arguments.length; n < i; n++) {
      _(arguments[n], t);
    }return e;
  }function w(t, e, n) {
    return _(e, function (e, i) {
      t[i] = n && "function" == typeof e ? C(e, n) : e;
    }), t;
  }var C = n(7),
      x = n(36),
      A = Object.prototype.toString;t.exports = { isArray: i, isArrayBuffer: r, isBuffer: x, isFormData: o, isArrayBufferView: a, isString: s, isNumber: c, isObject: u, isUndefined: l, isDate: f, isFile: d, isBlob: p, isFunction: h, isStream: v, isURLSearchParams: m, isStandardBrowserEnv: y, forEach: _, merge: b, extend: w, trim: g };
}, function (t, e, n) {
  "use strict";
  (function (e) {
    function i(t, e) {
      !r.isUndefined(t) && r.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e);
    }var r = n(0),
        o = n(29),
        a = { "Content-Type": "application/x-www-form-urlencoded" },
        s = { adapter: function () {
        var t;return "undefined" != typeof XMLHttpRequest ? t = n(3) : void 0 !== e && (t = n(3)), t;
      }(), transformRequest: [function (t, e) {
        return o(e, "Content-Type"), r.isFormData(t) || r.isArrayBuffer(t) || r.isBuffer(t) || r.isStream(t) || r.isFile(t) || r.isBlob(t) ? t : r.isArrayBufferView(t) ? t.buffer : r.isURLSearchParams(t) ? (i(e, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : r.isObject(t) ? (i(e, "application/json;charset=utf-8"), JSON.stringify(t)) : t;
      }], transformResponse: [function (t) {
        if ("string" == typeof t) try {
          t = JSON.parse(t);
        } catch (t) {}return t;
      }], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, validateStatus: function validateStatus(t) {
        return t >= 200 && t < 300;
      } };s.headers = { common: { Accept: "application/json, text/plain, */*" } }, r.forEach(["delete", "get", "head"], function (t) {
      s.headers[t] = {};
    }), r.forEach(["post", "put", "patch"], function (t) {
      s.headers[t] = r.merge(a);
    }), t.exports = s;
  }).call(e, n(8));
}, function (t, e) {
  var n;n = function () {
    return this;
  }();try {
    n = n || Function("return this")() || (0, eval)("this");
  } catch (t) {
    "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (n = window);
  }t.exports = n;
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = n(21),
      o = n(24),
      a = n(30),
      s = n(28),
      c = n(6),
      l = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || n(23);t.exports = function (t) {
    return new Promise(function (e, u) {
      var f = t.data,
          d = t.headers;i.isFormData(f) && delete d["Content-Type"];var p = new XMLHttpRequest(),
          h = "onreadystatechange",
          v = !1;if ("undefined" == typeof window || !window.XDomainRequest || "withCredentials" in p || s(t.url) || (p = new window.XDomainRequest(), h = "onload", v = !0, p.onprogress = function () {}, p.ontimeout = function () {}), t.auth) {
        var m = t.auth.username || "",
            g = t.auth.password || "";d.Authorization = "Basic " + l(m + ":" + g);
      }if (p.open(t.method.toUpperCase(), o(t.url, t.params, t.paramsSerializer), !0), p.timeout = t.timeout, p[h] = function () {
        if (p && (4 === p.readyState || v) && (0 !== p.status || p.responseURL && 0 === p.responseURL.indexOf("file:"))) {
          var n = "getAllResponseHeaders" in p ? a(p.getAllResponseHeaders()) : null,
              i = t.responseType && "text" !== t.responseType ? p.response : p.responseText,
              o = { data: i, status: 1223 === p.status ? 204 : p.status, statusText: 1223 === p.status ? "No Content" : p.statusText, headers: n, config: t, request: p };r(e, u, o), p = null;
        }
      }, p.onerror = function () {
        u(c("Network Error", t, null, p)), p = null;
      }, p.ontimeout = function () {
        u(c("timeout of " + t.timeout + "ms exceeded", t, "ECONNABORTED", p)), p = null;
      }, i.isStandardBrowserEnv()) {
        var y = n(26),
            _ = (t.withCredentials || s(t.url)) && t.xsrfCookieName ? y.read(t.xsrfCookieName) : void 0;_ && (d[t.xsrfHeaderName] = _);
      }if ("setRequestHeader" in p && i.forEach(d, function (t, e) {
        void 0 === f && "content-type" === e.toLowerCase() ? delete d[e] : p.setRequestHeader(e, t);
      }), t.withCredentials && (p.withCredentials = !0), t.responseType) try {
        p.responseType = t.responseType;
      } catch (e) {
        if ("json" !== t.responseType) throw e;
      }"function" == typeof t.onDownloadProgress && p.addEventListener("progress", t.onDownloadProgress), "function" == typeof t.onUploadProgress && p.upload && p.upload.addEventListener("progress", t.onUploadProgress), t.cancelToken && t.cancelToken.promise.then(function (t) {
        p && (p.abort(), u(t), p = null);
      }), void 0 === f && (f = null), p.send(f);
    });
  };
}, function (t, e, n) {
  "use strict";
  function i(t) {
    this.message = t;
  }i.prototype.toString = function () {
    return "Cancel" + (this.message ? ": " + this.message : "");
  }, i.prototype.__CANCEL__ = !0, t.exports = i;
}, function (t, e, n) {
  "use strict";
  t.exports = function (t) {
    return !(!t || !t.__CANCEL__);
  };
}, function (t, e, n) {
  "use strict";
  var i = n(20);t.exports = function (t, e, n, r, o) {
    var a = new Error(t);return i(a, e, n, r, o);
  };
}, function (t, e, n) {
  "use strict";
  t.exports = function (t, e) {
    return function () {
      for (var n = new Array(arguments.length), i = 0; i < n.length; i++) {
        n[i] = arguments[i];
      }return t.apply(e, n);
    };
  };
}, function (t, e) {
  function n() {
    throw new Error("setTimeout has not been defined");
  }function i() {
    throw new Error("clearTimeout has not been defined");
  }function r(t) {
    if (u === setTimeout) return setTimeout(t, 0);if ((u === n || !u) && setTimeout) return u = setTimeout, setTimeout(t, 0);try {
      return u(t, 0);
    } catch (e) {
      try {
        return u.call(null, t, 0);
      } catch (e) {
        return u.call(this, t, 0);
      }
    }
  }function o(t) {
    if (f === clearTimeout) return clearTimeout(t);if ((f === i || !f) && clearTimeout) return f = clearTimeout, clearTimeout(t);try {
      return f(t);
    } catch (e) {
      try {
        return f.call(null, t);
      } catch (e) {
        return f.call(this, t);
      }
    }
  }function a() {
    v && p && (v = !1, p.length ? h = p.concat(h) : m = -1, h.length && s());
  }function s() {
    if (!v) {
      var t = r(a);v = !0;for (var e = h.length; e;) {
        for (p = h, h = []; ++m < e;) {
          p && p[m].run();
        }m = -1, e = h.length;
      }p = null, v = !1, o(t);
    }
  }function c(t, e) {
    this.fun = t, this.array = e;
  }function l() {}var u,
      f,
      d = t.exports = {};!function () {
    try {
      u = "function" == typeof setTimeout ? setTimeout : n;
    } catch (t) {
      u = n;
    }try {
      f = "function" == typeof clearTimeout ? clearTimeout : i;
    } catch (t) {
      f = i;
    }
  }();var p,
      h = [],
      v = !1,
      m = -1;d.nextTick = function (t) {
    var e = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {
      e[n - 1] = arguments[n];
    }h.push(new c(t, e)), 1 !== h.length || v || r(s);
  }, c.prototype.run = function () {
    this.fun.apply(null, this.array);
  }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = l, d.addListener = l, d.once = l, d.off = l, d.removeListener = l, d.removeAllListeners = l, d.emit = l, d.prependListener = l, d.prependOnceListener = l, d.listeners = function (t) {
    return [];
  }, d.binding = function (t) {
    throw new Error("process.binding is not supported");
  }, d.cwd = function () {
    return "/";
  }, d.chdir = function (t) {
    throw new Error("process.chdir is not supported");
  }, d.umask = function () {
    return 0;
  };
}, function (t, e, n) {
  "use strict";
  var i = String.prototype.replace,
      r = /%20/g;t.exports = { default: "RFC3986", formatters: { RFC1738: function RFC1738(t) {
        return i.call(t, r, "+");
      }, RFC3986: function RFC3986(t) {
        return t;
      } }, RFC1738: "RFC1738", RFC3986: "RFC3986" };
}, function (t, e, n) {
  "use strict";
  var i = Object.prototype.hasOwnProperty,
      r = function () {
    for (var t = [], e = 0; e < 256; ++e) {
      t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
    }return t;
  }(),
      o = function o(t) {
    for (var e; t.length;) {
      var n = t.pop();if (e = n.obj[n.prop], Array.isArray(e)) {
        for (var i = [], r = 0; r < e.length; ++r) {
          void 0 !== e[r] && i.push(e[r]);
        }n.obj[n.prop] = i;
      }
    }return e;
  };e.arrayToObject = function (t, e) {
    for (var n = e && e.plainObjects ? Object.create(null) : {}, i = 0; i < t.length; ++i) {
      void 0 !== t[i] && (n[i] = t[i]);
    }return n;
  }, e.merge = function (t, n, r) {
    if (!n) return t;if ("object" != (typeof n === "undefined" ? "undefined" : _typeof(n))) {
      if (Array.isArray(t)) t.push(n);else {
        if ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t))) return [t, n];(r.plainObjects || r.allowPrototypes || !i.call(Object.prototype, n)) && (t[n] = !0);
      }return t;
    }if ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t))) return [t].concat(n);var o = t;return Array.isArray(t) && !Array.isArray(n) && (o = e.arrayToObject(t, r)), Array.isArray(t) && Array.isArray(n) ? (n.forEach(function (n, o) {
      i.call(t, o) ? t[o] && "object" == _typeof(t[o]) ? t[o] = e.merge(t[o], n, r) : t.push(n) : t[o] = n;
    }), t) : Object.keys(n).reduce(function (t, o) {
      var a = n[o];return i.call(t, o) ? t[o] = e.merge(t[o], a, r) : t[o] = a, t;
    }, o);
  }, e.assign = function (t, e) {
    return Object.keys(e).reduce(function (t, n) {
      return t[n] = e[n], t;
    }, t);
  }, e.decode = function (t) {
    try {
      return decodeURIComponent(t.replace(/\+/g, " "));
    } catch (e) {
      return t;
    }
  }, e.encode = function (t) {
    if (0 === t.length) return t;for (var e = "string" == typeof t ? t : String(t), n = "", i = 0; i < e.length; ++i) {
      var o = e.charCodeAt(i);45 === o || 46 === o || 95 === o || 126 === o || o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122 ? n += e.charAt(i) : o < 128 ? n += r[o] : o < 2048 ? n += r[192 | o >> 6] + r[128 | 63 & o] : o < 55296 || o >= 57344 ? n += r[224 | o >> 12] + r[128 | o >> 6 & 63] + r[128 | 63 & o] : (i += 1, o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(i)), n += r[240 | o >> 18] + r[128 | o >> 12 & 63] + r[128 | o >> 6 & 63] + r[128 | 63 & o]);
    }return n;
  }, e.compact = function (t) {
    for (var e = [{ obj: { o: t }, prop: "o" }], n = [], i = 0; i < e.length; ++i) {
      for (var r = e[i], a = r.obj[r.prop], s = Object.keys(a), c = 0; c < s.length; ++c) {
        var l = s[c],
            u = a[l];"object" == (typeof u === "undefined" ? "undefined" : _typeof(u)) && null !== u && -1 === n.indexOf(u) && (e.push({ obj: a, prop: l }), n.push(u));
      }
    }return o(e);
  }, e.isRegExp = function (t) {
    return "[object RegExp]" === Object.prototype.toString.call(t);
  }, e.isBuffer = function (t) {
    return null !== t && void 0 !== t && !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
  };
}, function (t, e, n) {
  (function (e) {
    !function (e, n) {
      t.exports = n();
    }(0, function () {
      "use strict";
      function t(t) {
        if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t);
      }var n = ("undefined" != typeof window ? window : void 0 !== e || "undefined" != typeof self && self, function (t, e) {
        return e = { exports: {} }, t(e, e.exports), e.exports;
      }(function (t, e) {
        !function (e, n) {
          t.exports = n();
        }(0, function () {
          function t(t, e, n, i, r, o) {
            if (!/^[1-8]$/.test(e)) throw new Error("orientation should be [1-8]");null == n && (n = 0), null == i && (i = 0), null == r && (r = t.width), null == o && (o = t.height);var a = document.createElement("canvas"),
                s = a.getContext("2d");switch (a.width = r, a.height = o, s.save(), +e) {case 1:
                break;case 2:
                s.translate(r, 0), s.scale(-1, 1);break;case 3:
                s.translate(r, o), s.rotate(1 * Math.PI);break;case 4:
                s.translate(0, o), s.scale(1, -1);break;case 5:
                a.width = o, a.height = r, s.rotate(.5 * Math.PI), s.scale(1, -1);break;case 6:
                a.width = o, a.height = r, s.rotate(.5 * Math.PI), s.translate(0, -o);break;case 7:
                a.width = o, a.height = r, s.rotate(1.5 * Math.PI), s.translate(-r, o), s.scale(1, -1);break;case 8:
                a.width = o, a.height = r, s.translate(0, r), s.rotate(1.5 * Math.PI);}return s.drawImage(t, n, i, r, o), s.restore(), a;
          }return { drawImage: t };
        });
      })),
          i = { onePointCoord: function onePointCoord(t, e) {
          var n = e.canvas,
              i = e.quality,
              r = n.getBoundingClientRect(),
              o = t.clientX,
              a = t.clientY;return { x: (o - r.left) * i, y: (a - r.top) * i };
        }, getPointerCoords: function getPointerCoords(t, e) {
          var n = void 0;return n = t.touches && t.touches[0] ? t.touches[0] : t.changedTouches && t.changedTouches[0] ? t.changedTouches[0] : t, this.onePointCoord(n, e);
        }, getPinchDistance: function getPinchDistance(t, e) {
          var n = t.touches[0],
              i = t.touches[1],
              r = this.onePointCoord(n, e),
              o = this.onePointCoord(i, e);return Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2));
        }, getPinchCenterCoord: function getPinchCenterCoord(t, e) {
          var n = t.touches[0],
              i = t.touches[1],
              r = this.onePointCoord(n, e),
              o = this.onePointCoord(i, e);return { x: (r.x + o.x) / 2, y: (r.y + o.y) / 2 };
        }, imageLoaded: function imageLoaded(t) {
          return t.complete && 0 !== t.naturalWidth;
        }, rAFPolyfill: function rAFPolyfill() {
          if ("undefined" != typeof document && "undefined" != typeof window) {
            for (var t = 0, e = ["webkit", "moz"], n = 0; n < e.length && !window.requestAnimationFrame; ++n) {
              window.requestAnimationFrame = window[e[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[n] + "CancelAnimationFrame"] || window[e[n] + "CancelRequestAnimationFrame"];
            }window.requestAnimationFrame || (window.requestAnimationFrame = function (e) {
              var n = new Date().getTime(),
                  i = Math.max(0, 16.7 - (n - t)),
                  r = window.setTimeout(function () {
                e(n + i);
              }, i);return t = n + i, r;
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
              clearTimeout(t);
            }), Array.isArray = function (t) {
              return "[object Array]" === Object.prototype.toString.call(t);
            };
          }
        }, toBlobPolyfill: function toBlobPolyfill() {
          if ("undefined" != typeof document && "undefined" != typeof window && HTMLCanvasElement) {
            var t, e, n;HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", { value: function value(i, r, o) {
                t = atob(this.toDataURL(r, o).split(",")[1]), e = t.length, n = new Uint8Array(e);for (var a = 0; a < e; a++) {
                  n[a] = t.charCodeAt(a);
                }i(new Blob([n], { type: r || "image/png" }));
              } });
          }
        }, eventHasFile: function eventHasFile(t) {
          var e = t.dataTransfer || t.originalEvent.dataTransfer;if (e.types) for (var n = 0, i = e.types.length; n < i; n++) {
            if ("Files" == e.types[n]) return !0;
          }return !1;
        }, getFileOrientation: function getFileOrientation(t) {
          var e = new DataView(t);if (65496 != e.getUint16(0, !1)) return -2;for (var n = e.byteLength, i = 2; i < n;) {
            var r = e.getUint16(i, !1);if (i += 2, 65505 == r) {
              if (1165519206 != e.getUint32(i += 2, !1)) return -1;var o = 18761 == e.getUint16(i += 6, !1);i += e.getUint32(i + 4, o);var a = e.getUint16(i, o);i += 2;for (var s = 0; s < a; s++) {
                if (274 == e.getUint16(i + 12 * s, o)) return e.getUint16(i + 12 * s + 8, o);
              }
            } else {
              if (65280 != (65280 & r)) break;i += e.getUint16(i, !1);
            }
          }return -1;
        }, base64ToArrayBuffer: function base64ToArrayBuffer(t) {
          t = t.replace(/^data:([^;]+);base64,/gim, "");for (var e = atob(t), n = e.length, i = new Uint8Array(n), r = 0; r < n; r++) {
            i[r] = e.charCodeAt(r);
          }return i.buffer;
        }, getRotatedImage: function getRotatedImage(t, e) {
          var i = n.drawImage(t, e),
              r = new Image();return r.src = i.toDataURL(), r;
        }, flipX: function flipX(t) {
          return t % 2 == 0 ? t - 1 : t + 1;
        }, flipY: function flipY(t) {
          return { 1: 4, 4: 1, 2: 3, 3: 2, 5: 8, 8: 5, 6: 7, 7: 6 }[t];
        }, rotate90: function rotate90(t) {
          return { 1: 6, 2: 7, 3: 8, 4: 5, 5: 2, 6: 3, 7: 4, 8: 1 }[t];
        }, numberValid: function numberValid(t) {
          return "number" == typeof t && !isNaN(t);
        } };Number.isInteger = Number.isInteger || function (t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
      };var r = String;"undefined" != typeof window && window.Image && (r = [String, Image]);var o = { value: Object, width: { type: Number, default: 200, validator: function validator(t) {
            return t > 0;
          } }, height: { type: Number, default: 200, validator: function validator(t) {
            return t > 0;
          } }, placeholder: { type: String, default: "Choose an image" }, placeholderColor: { default: "#606060" }, placeholderFontSize: { type: Number, default: 0, validator: function validator(t) {
            return t >= 0;
          } }, canvasColor: { default: "transparent" }, quality: { type: Number, default: 2, validator: function validator(t) {
            return t > 0;
          } }, zoomSpeed: { default: 3, type: Number, validator: function validator(t) {
            return t > 0;
          } }, accept: String, fileSizeLimit: { type: Number, default: 0, validator: function validator(t) {
            return t >= 0;
          } }, disabled: Boolean, disableDragAndDrop: Boolean, disableClickToChoose: Boolean, disableDragToMove: Boolean, disableScrollToZoom: Boolean, disablePinchToZoom: Boolean, disableRotation: Boolean, reverseScrollToZoom: Boolean, preventWhiteSpace: Boolean, showRemoveButton: { type: Boolean, default: !0 }, removeButtonColor: { type: String, default: "red" }, removeButtonSize: { type: Number }, initialImage: r, initialSize: { type: String, default: "cover", validator: function validator(t) {
            return "cover" === t || "contain" === t || "natural" === t;
          } }, initialPosition: { type: String, default: "center", validator: function validator(t) {
            var e = ["center", "top", "bottom", "left", "right"];return t.split(" ").every(function (t) {
              return e.indexOf(t) >= 0;
            }) || /^-?\d+% -?\d+%$/.test(t);
          } }, inputAttrs: Object, showLoading: Boolean, loadingSize: { type: Number, default: 20 }, loadingColor: { type: String, default: "#606060" }, replaceDrop: Boolean },
          a = { INIT_EVENT: "init", FILE_CHOOSE_EVENT: "file-choose", FILE_SIZE_EXCEED_EVENT: "file-size-exceed", FILE_TYPE_MISMATCH_EVENT: "file-type-mismatch", NEW_IMAGE: "new-image", NEW_IMAGE_DRAWN: "new-image-drawn", IMAGE_REMOVE_EVENT: "image-remove", MOVE_EVENT: "move", ZOOM_EVENT: "zoom", DRAW: "draw", INITIAL_IMAGE_LOADED_EVENT: "initial-image-loaded", LOADING_START: "loading-start", LOADING_END: "loading-end" },
          s = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return typeof t === "undefined" ? "undefined" : _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
      },
          c = { render: function render() {
          var t = this,
              e = t.$createElement,
              n = t._self._c || e;return n("div", { ref: "wrapper", class: "croppa-container " + (t.img ? "croppa--has-target" : "") + " " + (t.disabled ? "croppa--disabled" : "") + " " + (t.disableClickToChoose ? "croppa--disabled-cc" : "") + " " + (t.disableDragToMove && t.disableScrollToZoom ? "croppa--disabled-mz" : "") + " " + (t.fileDraggedOver ? "croppa--dropzone" : ""), on: { dragenter: function dragenter(e) {
                e.stopPropagation(), e.preventDefault(), t._handleDragEnter(e);
              }, dragleave: function dragleave(e) {
                e.stopPropagation(), e.preventDefault(), t._handleDragLeave(e);
              }, dragover: function dragover(e) {
                e.stopPropagation(), e.preventDefault(), t._handleDragOver(e);
              }, drop: function drop(e) {
                e.stopPropagation(), e.preventDefault(), t._handleDrop(e);
              } } }, [n("input", t._b({ ref: "fileInput", staticStyle: { height: "1px", width: "1px", overflow: "hidden", "margin-left": "-99999px", position: "absolute" }, attrs: { type: "file", accept: t.accept, disabled: t.disabled }, on: { change: t._handleInputChange } }, "input", t.inputAttrs)), n("div", { staticClass: "slots", staticStyle: { width: "0", height: "0", visibility: "hidden" } }, [t._t("initial"), t._t("placeholder")], 2), n("canvas", { ref: "canvas", on: { click: function click(e) {
                e.stopPropagation(), e.preventDefault(), t._handleClick(e);
              }, touchstart: function touchstart(e) {
                e.stopPropagation(), t._handlePointerStart(e);
              }, mousedown: function mousedown(e) {
                e.stopPropagation(), e.preventDefault(), t._handlePointerStart(e);
              }, pointerstart: function pointerstart(e) {
                e.stopPropagation(), e.preventDefault(), t._handlePointerStart(e);
              }, touchend: function touchend(e) {
                e.stopPropagation(), e.preventDefault(), t._handlePointerEnd(e);
              }, touchcancel: function touchcancel(e) {
                e.stopPropagation(), e.preventDefault(), t._handlePointerEnd(e);
              }, mouseup: function mouseup(e) {
                e.stopPropagation(), e.preventDefault(), t._handlePointerEnd(e);
              }, pointerend: function pointerend(e) {
                e.stopPropagation(), e.preventDefault(), t._handlePointerEnd(e);
              }, pointercancel: function pointercancel(e) {
                e.stopPropagation(), e.preventDefault(), t._handlePointerEnd(e);
              }, touchmove: function touchmove(e) {
                e.stopPropagation(), t._handlePointerMove(e);
              }, mousemove: function mousemove(e) {
                e.stopPropagation(), e.preventDefault(), t._handlePointerMove(e);
              }, pointermove: function pointermove(e) {
                e.stopPropagation(), e.preventDefault(), t._handlePointerMove(e);
              }, pointerleave: function pointerleave(e) {
                e.stopPropagation(), e.preventDefault(), t._handlePointerLeave(e);
              }, DOMMouseScroll: function DOMMouseScroll(e) {
                e.stopPropagation(), t._handleWheel(e);
              }, wheel: function wheel(e) {
                e.stopPropagation(), t._handleWheel(e);
              }, mousewheel: function mousewheel(e) {
                e.stopPropagation(), t._handleWheel(e);
              } } }), t.showRemoveButton && t.img ? n("svg", { staticClass: "icon icon-remove", style: "top: -" + t.height / 40 + "px; right: -" + t.width / 40 + "px", attrs: { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: t.removeButtonSize || t.width / 10, height: t.removeButtonSize || t.width / 10 }, on: { click: t.remove } }, [n("path", { attrs: { d: "M511.921231 0C229.179077 0 0 229.257846 0 512 0 794.702769 229.179077 1024 511.921231 1024 794.781538 1024 1024 794.702769 1024 512 1024 229.257846 794.781538 0 511.921231 0ZM732.041846 650.633846 650.515692 732.081231C650.515692 732.081231 521.491692 593.683692 511.881846 593.683692 502.429538 593.683692 373.366154 732.081231 373.366154 732.081231L291.761231 650.633846C291.761231 650.633846 430.316308 523.500308 430.316308 512.196923 430.316308 500.696615 291.761231 373.523692 291.761231 373.523692L373.366154 291.918769C373.366154 291.918769 503.453538 430.395077 511.881846 430.395077 520.349538 430.395077 650.515692 291.918769 650.515692 291.918769L732.041846 373.523692C732.041846 373.523692 593.447385 502.547692 593.447385 512.196923 593.447385 521.412923 732.041846 650.633846 732.041846 650.633846Z", fill: t.removeButtonColor } })]) : t._e(), t.showLoading && t.loading ? n("div", { staticClass: "sk-fading-circle", style: t.loadingStyle }, t._l(12, function (e) {
            return n("div", { key: e, class: "sk-circle" + e + " sk-circle" }, [n("div", { staticClass: "sk-circle-indicator", style: { backgroundColor: t.loadingColor } })]);
          })) : t._e(), t._t("default")], 2);
        }, staticRenderFns: [], model: { prop: "value", event: a.INIT_EVENT }, props: o, data: function data() {
          return { canvas: null, ctx: null, originalImage: null, img: null, dragging: !1, lastMovingCoord: null, imgData: { width: 0, height: 0, startX: 0, startY: 0 }, fileDraggedOver: !1, tabStart: 0, scrolling: !1, pinching: !1, rotating: !1, pinchDistance: 0, supportTouch: !1, pointerMoved: !1, pointerStartCoord: null, naturalWidth: 0, naturalHeight: 0, scaleRatio: null, orientation: 1, userMetadata: null, imageSet: !1, currentPointerCoord: null, currentIsInitial: !1, loading: !1 };
        }, computed: { outputWidth: function outputWidth() {
            return this.width * this.quality;
          }, outputHeight: function outputHeight() {
            return this.height * this.quality;
          }, computedPlaceholderFontSize: function computedPlaceholderFontSize() {
            return this.placeholderFontSize * this.quality;
          }, aspectRatio: function aspectRatio() {
            return this.naturalWidth / this.naturalHeight;
          }, loadingStyle: function loadingStyle() {
            return { width: this.loadingSize + "px", height: this.loadingSize + "px", right: "15px", bottom: "10px" };
          } }, mounted: function mounted() {
          this._initialize(), i.rAFPolyfill(), i.toBlobPolyfill(), this.supportDetection().basic || console.warn("Your browser does not support vue-croppa functionality.");
        }, watch: { outputWidth: function outputWidth() {
            this.onDimensionChange();
          }, outputHeight: function outputHeight() {
            this.onDimensionChange();
          }, canvasColor: function canvasColor() {
            this.img ? this._draw() : this._setPlaceholders();
          }, placeholder: function placeholder() {
            this.img || this._setPlaceholders();
          }, placeholderColor: function placeholderColor() {
            this.img || this._setPlaceholders();
          }, computedPlaceholderFontSize: function computedPlaceholderFontSize() {
            this.img || this._setPlaceholders();
          }, preventWhiteSpace: function preventWhiteSpace(t) {
            t && (this.imageSet = !1), this._placeImage();
          }, scaleRatio: function scaleRatio(t, e) {
            if (this.img && i.numberValid(t)) {
              var n = 1;i.numberValid(e) && 0 !== e && (n = t / e);var r = this.currentPointerCoord || { x: this.imgData.startX + this.imgData.width / 2, y: this.imgData.startY + this.imgData.height / 2 };if (this.imgData.width = this.naturalWidth * t, this.imgData.height = this.naturalHeight * t, this.preventWhiteSpace && (this._preventZoomingToWhiteSpace(), this._preventMovingToWhiteSpace()), !this.userMetadata && this.imageSet && !this.rotating) {
                var o = (n - 1) * (r.x - this.imgData.startX),
                    a = (n - 1) * (r.y - this.imgData.startY);this.imgData.startX = this.imgData.startX - o, this.imgData.startY = this.imgData.startY - a;
              }
            }
          }, "imgData.width": function imgDataWidth(t, e) {
            i.numberValid(t) && (this.scaleRatio = t / this.naturalWidth, this.hasImage() && Math.abs(t - e) > 1e-5 * t && (this.$emit(a.ZOOM_EVENT), this._draw()));
          }, "imgData.height": function imgDataHeight(t) {
            i.numberValid(t) && (this.scaleRatio = t / this.naturalHeight);
          }, loading: function loading(t) {
            t ? this.$emit(a.LOADING_START) : this.$emit(a.LOADING_END);
          } }, methods: { getCanvas: function getCanvas() {
            return this.canvas;
          }, getContext: function getContext() {
            return this.ctx;
          }, getChosenFile: function getChosenFile() {
            return this.$refs.fileInput.files[0];
          }, move: function move(t) {
            if (t) {
              var e = this.imgData.startX,
                  n = this.imgData.startY;this.imgData.startX += t.x, this.imgData.startY += t.y, this.preventWhiteSpace && this._preventMovingToWhiteSpace(), this.imgData.startX === e && this.imgData.startY === n || (this.$emit(a.MOVE_EVENT), this._draw());
            }
          }, moveUpwards: function moveUpwards() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;this.move({ x: 0, y: -t });
          }, moveDownwards: function moveDownwards() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;this.move({ x: 0, y: t });
          }, moveLeftwards: function moveLeftwards() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;this.move({ x: -t, y: 0 });
          }, moveRightwards: function moveRightwards() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;this.move({ x: t, y: 0 });
          }, zoom: function zoom() {
            var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                n = this.zoomSpeed * e,
                i = 1e-5 * this.outputWidth * n,
                r = 1;t ? r = 1 + i : this.imgData.width > 10 && (r = 1 - i), this.scaleRatio *= r;
          }, zoomIn: function zoomIn() {
            this.zoom(!0);
          }, zoomOut: function zoomOut() {
            this.zoom(!1);
          }, rotate: function rotate() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;this.disableRotation || this.disabled || (t = parseInt(t), (isNaN(t) || t > 3 || t < -3) && (console.warn("Invalid argument for rotate() method. It should one of the integers from -3 to 3."), t = 1), this._rotateByStep(t));
          }, flipX: function flipX() {
            this.disableRotation || this.disabled || this._setOrientation(2);
          }, flipY: function flipY() {
            this.disableRotation || this.disabled || this._setOrientation(4);
          }, refresh: function refresh() {
            this.$nextTick(this._initialize);
          }, hasImage: function hasImage() {
            return !!this.imageSet;
          }, applyMetadata: function applyMetadata(t) {
            if (t) {
              this.userMetadata = t;var e = t.orientation || this.orientation || 1;this._setOrientation(e, !0);
            }
          }, generateDataUrl: function generateDataUrl(t, e) {
            return this.hasImage() ? this.canvas.toDataURL(t, e) : "";
          }, generateBlob: function generateBlob(t, e, n) {
            if (!this.hasImage()) return void t(null);this.canvas.toBlob(t, e, n);
          }, promisedBlob: function promisedBlob() {
            for (var t = this, e = arguments.length, n = Array(e), i = 0; i < e; i++) {
              n[i] = arguments[i];
            }return "undefined" == typeof Promise ? void console.warn("No Promise support. Please add Promise polyfill if you want to use this method.") : new Promise(function (e, i) {
              try {
                t.generateBlob.apply(t, [function (t) {
                  e(t);
                }].concat(n));
              } catch (t) {
                i(t);
              }
            });
          }, getMetadata: function getMetadata() {
            if (!this.hasImage()) return {};var t = this.imgData;return { startX: t.startX, startY: t.startY, scale: this.scaleRatio, orientation: this.orientation };
          }, supportDetection: function supportDetection() {
            if ("undefined" != typeof window) {
              var t = document.createElement("div");return { basic: window.requestAnimationFrame && window.File && window.FileReader && window.FileList && window.Blob, dnd: "ondragstart" in t && "ondrop" in t };
            }
          }, chooseFile: function chooseFile() {
            this.$refs.fileInput.click();
          }, remove: function remove() {
            this._setPlaceholders();var t = null != this.img;this.originalImage = null, this.img = null, this.$refs.fileInput.value = "", this.imgData = { width: 0, height: 0, startX: 0, startY: 0 }, this.orientation = 1, this.scaleRatio = null, this.userMetadata = null, this.imageSet = !1, this.loading = !1, t && this.$emit(a.IMAGE_REMOVE_EVENT);
          }, _initialize: function _initialize() {
            this.canvas = this.$refs.canvas, this._setSize(), this.canvas.style.backgroundColor = this.canvasColor && "default" != this.canvasColor ? "string" == typeof this.canvasColor ? this.canvasColor : "" : "transparent", this.ctx = this.canvas.getContext("2d"), this.originalImage = null, this.img = null, this.imageSet = !1, this._setInitial(), this.$emit(a.INIT_EVENT, this);
          }, _setSize: function _setSize() {
            this.canvas.width = this.outputWidth, this.canvas.height = this.outputHeight, this.canvas.style.width = this.width + "px", this.canvas.style.height = this.height + "px";
          }, _rotateByStep: function _rotateByStep(t) {
            var e = 1;switch (t) {case 1:
                e = 6;break;case 2:
                e = 3;break;case 3:case -1:
                e = 8;break;case -2:
                e = 3;break;case -3:
                e = 6;}this._setOrientation(e);
          }, _setImagePlaceholder: function _setImagePlaceholder() {
            var t = this,
                e = void 0;if (this.$slots.placeholder && this.$slots.placeholder[0]) {
              var n = this.$slots.placeholder[0],
                  r = n.tag,
                  o = n.elm;"img" == r && o && (e = o);
            }if (e) {
              var a = function a() {
                t.ctx.drawImage(e, 0, 0, t.outputWidth, t.outputHeight);
              };i.imageLoaded(e) ? a() : e.onload = a;
            }
          }, _setTextPlaceholder: function _setTextPlaceholder() {
            var t = this.ctx;t.textBaseline = "middle", t.textAlign = "center";var e = this.outputWidth * (2 / 3) / this.placeholder.length,
                n = this.computedPlaceholderFontSize && 0 != this.computedPlaceholderFontSize ? this.computedPlaceholderFontSize : e;t.font = n + "px sans-serif", t.fillStyle = this.placeholderColor && "default" != this.placeholderColor ? this.placeholderColor : "#606060", t.fillText(this.placeholder, this.outputWidth / 2, this.outputHeight / 2);
          }, _setPlaceholders: function _setPlaceholders() {
            this._paintBackground(), this._setImagePlaceholder(), this._setTextPlaceholder();
          }, _setInitial: function _setInitial() {
            var t = this,
                e = void 0,
                n = void 0;if (this.$slots.initial && this.$slots.initial[0]) {
              var r = this.$slots.initial[0],
                  o = r.tag,
                  a = r.elm;"img" == o && a && (n = a);
            }if (this.initialImage && "string" == typeof this.initialImage ? (e = this.initialImage, n = new Image(), /^data:/.test(e) || /^blob:/.test(e) || n.setAttribute("crossOrigin", "anonymous"), n.src = e) : "object" === s(this.initialImage) && this.initialImage instanceof Image && (n = this.initialImage), !e && !n) return void this._setPlaceholders();this.currentIsInitial = !0, i.imageLoaded(n) ? this._onload(n, +n.dataset.exifOrientation, !0) : (this.loading = !0, n.onload = function () {
              t._onload(n, +n.dataset.exifOrientation, !0);
            }, n.onerror = function () {
              t._setPlaceholders();
            });
          }, _onload: function _onload(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                n = arguments[2];this.originalImage = t, this.img = t, isNaN(e) && (e = 1), this._setOrientation(e), n && this.$emit(a.INITIAL_IMAGE_LOADED_EVENT);
          }, _handleClick: function _handleClick() {
            this.hasImage() || this.disableClickToChoose || this.disabled || this.supportTouch || this.chooseFile();
          }, _handleInputChange: function _handleInputChange() {
            var t = this.$refs.fileInput;if (t.files.length) {
              var e = t.files[0];this._onNewFileIn(e);
            }
          }, _onNewFileIn: function _onNewFileIn(t) {
            var e = this;if (this.currentIsInitial = !1, this.loading = !0, this.$emit(a.FILE_CHOOSE_EVENT, t), !this._fileSizeIsValid(t)) throw this.loading = !1, this.$emit(a.FILE_SIZE_EXCEED_EVENT, t), new Error("File size exceeds limit which is " + this.fileSizeLimit + " bytes.");if (!this._fileTypeIsValid(t)) {
              this.loading = !1, this.$emit(a.FILE_TYPE_MISMATCH_EVENT, t);var n = t.type || t.name.toLowerCase().split(".").pop();throw new Error("File type (" + n + ") does not match what you specified (" + this.accept + ").");
            }if ("undefined" != typeof window && void 0 !== window.FileReader) {
              var r = new FileReader();r.onload = function (t) {
                var n = t.target.result,
                    r = 1;try {
                  r = i.getFileOrientation(i.base64ToArrayBuffer(n));
                } catch (t) {}r < 1 && (r = 1);var o = new Image();o.src = n, o.onload = function () {
                  e._onload(o, r), e.$emit(a.NEW_IMAGE);
                };
              }, r.readAsDataURL(t);
            }
          }, _fileSizeIsValid: function _fileSizeIsValid(t) {
            return !!t && (!this.fileSizeLimit || 0 == this.fileSizeLimit || t.size < this.fileSizeLimit);
          }, _fileTypeIsValid: function _fileTypeIsValid(t) {
            if (!this.accepct) return !0;for (var e = this.accept, n = e.replace(/\/.*$/, ""), i = e.split(","), r = 0, o = i.length; r < o; r++) {
              var a = i[r],
                  s = a.trim();if ("." == s.charAt(0)) {
                if (t.name.toLowerCase().split(".").pop() === s.toLowerCase().slice(1)) return !0;
              } else if (/\/\*$/.test(s)) {
                var c = t.type.replace(/\/.*$/, "");if (c === n) return !0;
              } else if (t.type === a) return !0;
            }return !1;
          }, _placeImage: function _placeImage(t) {
            if (this.img) {
              var e = this.imgData;if (this.naturalWidth = this.img.naturalWidth, this.naturalHeight = this.img.naturalHeight, e.startX = i.numberValid(e.startX) ? e.startX : 0, e.startY = i.numberValid(e.startY) ? e.startY : 0, this.preventWhiteSpace ? this._aspectFill() : this.imageSet ? (this.imgData.width = this.naturalWidth * this.scaleRatio, this.imgData.height = this.naturalHeight * this.scaleRatio) : "contain" == this.initialSize ? this._aspectFit() : "natural" == this.initialSize ? this._naturalSize() : this._aspectFill(), !this.imageSet && (/top/.test(this.initialPosition) ? e.startY = 0 : /bottom/.test(this.initialPosition) && (e.startY = this.outputHeight - e.height), /left/.test(this.initialPosition) ? e.startX = 0 : /right/.test(this.initialPosition) && (e.startX = this.outputWidth - e.width), /^-?\d+% -?\d+%$/.test(this.initialPosition))) {
                var n = /^(-?\d+)% (-?\d+)%$/.exec(this.initialPosition),
                    r = +n[1] / 100,
                    o = +n[2] / 100;e.startX = r * (this.outputWidth - e.width), e.startY = o * (this.outputHeight - e.height);
              }t && this._applyMetadata(), t && this.preventWhiteSpace ? this.zoom(!1, 0) : (this.move({ x: 0, y: 0 }), this._draw());
            }
          }, _aspectFill: function _aspectFill() {
            var t = this.naturalWidth,
                e = this.naturalHeight,
                n = this.outputWidth / this.outputHeight,
                i = void 0;this.aspectRatio > n ? (i = e / this.outputHeight, this.imgData.width = t / i, this.imgData.height = this.outputHeight, this.imgData.startX = -(this.imgData.width - this.outputWidth) / 2, this.imgData.startY = 0) : (i = t / this.outputWidth, this.imgData.height = e / i, this.imgData.width = this.outputWidth, this.imgData.startY = -(this.imgData.height - this.outputHeight) / 2, this.imgData.startX = 0);
          }, _aspectFit: function _aspectFit() {
            var t = this.naturalWidth,
                e = this.naturalHeight,
                n = this.outputWidth / this.outputHeight,
                i = void 0;this.aspectRatio > n ? (i = t / this.outputWidth, this.imgData.height = e / i, this.imgData.width = this.outputWidth, this.imgData.startY = -(this.imgData.height - this.outputHeight) / 2) : (i = e / this.outputHeight, this.imgData.width = t / i, this.imgData.height = this.outputHeight, this.imgData.startX = -(this.imgData.width - this.outputWidth) / 2);
          }, _naturalSize: function _naturalSize() {
            var t = this.naturalWidth,
                e = this.naturalHeight;this.imgData.width = t, this.imgData.height = e, this.imgData.startX = -(this.imgData.width - this.outputWidth) / 2, this.imgData.startY = -(this.imgData.height - this.outputHeight) / 2;
          }, _handlePointerStart: function _handlePointerStart(t) {
            this.supportTouch = !0, this.pointerMoved = !1;var e = i.getPointerCoords(t, this);if (this.pointerStartCoord = e, !this.disabled) {
              if (!this.hasImage() && !this.disableClickToChoose) return void (this.tabStart = new Date().valueOf());if (!(t.which && t.which > 1)) {
                if (!t.touches || 1 === t.touches.length) {
                  this.dragging = !0, this.pinching = !1;var n = i.getPointerCoords(t, this);this.lastMovingCoord = n;
                }t.touches && 2 === t.touches.length && !this.disablePinchToZoom && (this.dragging = !1, this.pinching = !0, this.pinchDistance = i.getPinchDistance(t, this));for (var r = ["mouseup", "touchend", "touchcancel", "pointerend", "pointercancel"], o = 0, a = r.length; o < a; o++) {
                  var s = r[o];document.addEventListener(s, this._handlePointerEnd);
                }
              }
            }
          }, _handlePointerEnd: function _handlePointerEnd(t) {
            var e = 0;if (this.pointerStartCoord) {
              var n = i.getPointerCoords(t, this);e = Math.sqrt(Math.pow(n.x - this.pointerStartCoord.x, 2) + Math.pow(n.y - this.pointerStartCoord.y, 2)) || 0;
            }if (!this.disabled) {
              if (!this.hasImage() && !this.disableClickToChoose) {
                var r = new Date().valueOf();return e < 100 && r - this.tabStart < 500 && this.supportTouch && this.chooseFile(), void (this.tabStart = 0);
              }this.dragging = !1, this.pinching = !1, this.pinchDistance = 0, this.lastMovingCoord = null, this.pointerMoved = !1, this.pointerStartCoord = null;
            }
          }, _handlePointerMove: function _handlePointerMove(t) {
            if (this.pointerMoved = !0, this.hasImage()) {
              var e = i.getPointerCoords(t, this);if (this.currentPointerCoord = e, !this.disabled && !this.disableDragToMove) {
                if (t.preventDefault(), !t.touches || 1 === t.touches.length) {
                  if (!this.dragging) return;this.lastMovingCoord && this.move({ x: e.x - this.lastMovingCoord.x, y: e.y - this.lastMovingCoord.y }), this.lastMovingCoord = e;
                }if (t.touches && 2 === t.touches.length && !this.disablePinchToZoom) {
                  if (!this.pinching) return;var n = i.getPinchDistance(t, this),
                      r = n - this.pinchDistance;this.zoom(r > 0, 1), this.pinchDistance = n;
                }
              }
            }
          }, _handlePointerLeave: function _handlePointerLeave() {
            this.currentPointerCoord = null;
          }, _handleWheel: function _handleWheel(t) {
            var e = this;this.disabled || this.disableScrollToZoom || !this.hasImage() || (t.preventDefault(), this.scrolling = !0, t.wheelDelta < 0 || t.deltaY > 0 || t.detail > 0 ? this.zoom(this.reverseScrollToZoom) : (t.wheelDelta > 0 || t.deltaY < 0 || t.detail < 0) && this.zoom(!this.reverseScrollToZoom), this.$nextTick(function () {
              e.scrolling = !1;
            }));
          }, _handleDragEnter: function _handleDragEnter(t) {
            this.disabled || this.disableDragAndDrop || !i.eventHasFile(t) || this.hasImage() && !this.replaceDrop || (this.fileDraggedOver = !0);
          }, _handleDragLeave: function _handleDragLeave(t) {
            this.fileDraggedOver && i.eventHasFile(t) && (this.fileDraggedOver = !1);
          }, _handleDragOver: function _handleDragOver(t) {}, _handleDrop: function _handleDrop(t) {
            if (this.fileDraggedOver && i.eventHasFile(t)) {
              this.hasImage() && this.replaceDrop && this.remove(), this.fileDraggedOver = !1;var e = void 0,
                  n = t.dataTransfer;if (n) {
                if (n.items) for (var r = 0, o = n.items.length; r < o; r++) {
                  var a = n.items[r];if ("file" == a.kind) {
                    e = a.getAsFile();break;
                  }
                } else e = n.files[0];e && this._onNewFileIn(e);
              }
            }
          }, _preventMovingToWhiteSpace: function _preventMovingToWhiteSpace() {
            this.imgData.startX > 0 && (this.imgData.startX = 0), this.imgData.startY > 0 && (this.imgData.startY = 0), this.outputWidth - this.imgData.startX > this.imgData.width && (this.imgData.startX = -(this.imgData.width - this.outputWidth)), this.outputHeight - this.imgData.startY > this.imgData.height && (this.imgData.startY = -(this.imgData.height - this.outputHeight));
          }, _preventZoomingToWhiteSpace: function _preventZoomingToWhiteSpace() {
            this.imgData.width < this.outputWidth && (this.scaleRatio = this.outputWidth / this.naturalWidth), this.imgData.height < this.outputHeight && (this.scaleRatio = this.outputHeight / this.naturalHeight);
          }, _setOrientation: function _setOrientation() {
            var t = this,
                e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 6,
                n = arguments[1],
                r = n;if (e > 1 || r) {
              if (!this.img) return;this.rotating = !0;var o = i.getRotatedImage(r ? this.originalImage : this.img, e);o.onload = function () {
                t.img = o, t._placeImage(n);
              };
            } else this._placeImage(n);this.orientation = 2 == e ? i.flipX(this.orientation) : 4 == e ? i.flipY(this.orientation) : 6 == e ? i.rotate90(this.orientation) : 3 == e ? i.rotate90(i.rotate90(this.orientation)) : 8 == e ? i.rotate90(i.rotate90(i.rotate90(this.orientation))) : e, r && (this.orientation = e);
          }, _paintBackground: function _paintBackground() {
            var t = this.canvasColor && "default" != this.canvasColor ? this.canvasColor : "transparent";this.ctx.fillStyle = t, this.ctx.clearRect(0, 0, this.outputWidth, this.outputHeight), this.ctx.fillRect(0, 0, this.outputWidth, this.outputHeight);
          }, _draw: function _draw() {
            var t = this;this.$nextTick(function () {
              t.img && ("undefined" != typeof window && window.requestAnimationFrame ? requestAnimationFrame(t._drawFrame) : t._drawFrame());
            });
          }, _drawFrame: function _drawFrame() {
            this.loading = !1;var t = this.ctx,
                e = this.imgData,
                n = e.startX,
                i = e.startY,
                r = e.width,
                o = e.height;this._paintBackground(), t.drawImage(this.img, n, i, r, o), this.$emit(a.DRAW, t), this.imageSet || (this.imageSet = !0, this.$emit(a.NEW_IMAGE_DRAWN)), this.rotating = !1;
          }, _applyMetadata: function _applyMetadata() {
            var t = this;if (this.userMetadata) {
              var e = this.userMetadata,
                  n = e.startX,
                  r = e.startY,
                  o = e.scale;i.numberValid(n) && (this.imgData.startX = n), i.numberValid(r) && (this.imgData.startY = r), i.numberValid(o) && (this.scaleRatio = o), this.$nextTick(function () {
                t.userMetadata = null;
              });
            }
          }, onDimensionChange: function onDimensionChange() {
            this.img ? (this.preventWhiteSpace && (this.imageSet = !1), this._setSize(), this._placeImage()) : this._initialize();
          } } },
          l = Object.getOwnPropertySymbols,
          u = Object.prototype.hasOwnProperty,
          f = Object.prototype.propertyIsEnumerable,
          d = function () {
        try {
          if (!Object.assign) return !1;var t = new String("abc");if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;for (var e = {}, n = 0; n < 10; n++) {
            e["_" + String.fromCharCode(n)] = n;
          }if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
            return e[t];
          }).join("")) return !1;var i = {};return "abcdefghijklmnopqrst".split("").forEach(function (t) {
            i[t] = t;
          }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("");
        } catch (t) {
          return !1;
        }
      }() ? Object.assign : function (e, n) {
        for (var i, r, o = t(e), a = 1; a < arguments.length; a++) {
          i = Object(arguments[a]);for (var s in i) {
            u.call(i, s) && (o[s] = i[s]);
          }if (l) {
            r = l(i);for (var c = 0; c < r.length; c++) {
              f.call(i, r[c]) && (o[r[c]] = i[r[c]]);
            }
          }
        }return o;
      },
          p = { componentName: "croppa" };return { install: function install(t, e) {
          e = d({}, p, e);var n = Number(t.version.split(".")[0]);if (n < 2) throw new Error("vue-croppa supports vue version 2.0 and above. You are using Vue@" + n + ". Please upgrade to the latest version of Vue.");var i = e.componentName || "croppa";t.component(i, c);
        }, component: c };
    });
  }).call(e, n(2));
}, function (t, e, n) {
  var i, r;i = n(32);var o = n(45);r = i = i || {}, "object" != _typeof(i.default) && "function" != typeof i.default || (r = i = i.default), "function" == typeof r && (r = r.options), r.render = o.render, r.staticRenderFns = o.staticRenderFns, t.exports = i;
}, function (t, e, n) {
  "use strict";
  (function (t, n) {
    function i(t) {
      return void 0 === t || null === t;
    }function r(t) {
      return void 0 !== t && null !== t;
    }function o(t) {
      return !0 === t;
    }function a(t) {
      return !1 === t;
    }function s(t) {
      return "string" == typeof t || "number" == typeof t || "boolean" == typeof t;
    }function c(t) {
      return null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
    }function l(t) {
      return "[object Object]" === pi.call(t);
    }function u(t) {
      return "[object RegExp]" === pi.call(t);
    }function f(t) {
      var e = parseFloat(String(t));return e >= 0 && Math.floor(e) === e && isFinite(t);
    }function d(t) {
      return null == t ? "" : "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? JSON.stringify(t, null, 2) : String(t);
    }function p(t) {
      var e = parseFloat(t);return isNaN(e) ? t : e;
    }function h(t, e) {
      for (var n = Object.create(null), i = t.split(","), r = 0; r < i.length; r++) {
        n[i[r]] = !0;
      }return e ? function (t) {
        return n[t.toLowerCase()];
      } : function (t) {
        return n[t];
      };
    }function v(t, e) {
      if (t.length) {
        var n = t.indexOf(e);if (n > -1) return t.splice(n, 1);
      }
    }function m(t, e) {
      return vi.call(t, e);
    }function g(t) {
      var e = Object.create(null);return function (n) {
        return e[n] || (e[n] = t(n));
      };
    }function y(t, e) {
      function n(n) {
        var i = arguments.length;return i ? i > 1 ? t.apply(e, arguments) : t.call(e, n) : t.call(e);
      }return n._length = t.length, n;
    }function _(t, e) {
      e = e || 0;for (var n = t.length - e, i = new Array(n); n--;) {
        i[n] = t[n + e];
      }return i;
    }function b(t, e) {
      for (var n in e) {
        t[n] = e[n];
      }return t;
    }function w(t) {
      for (var e = {}, n = 0; n < t.length; n++) {
        t[n] && b(e, t[n]);
      }return e;
    }function C(t, e, n) {}function x(t, e) {
      if (t === e) return !0;var n = c(t),
          i = c(e);if (!n || !i) return !n && !i && String(t) === String(e);try {
        var r = Array.isArray(t),
            o = Array.isArray(e);if (r && o) return t.length === e.length && t.every(function (t, n) {
          return x(t, e[n]);
        });if (r || o) return !1;var a = Object.keys(t),
            s = Object.keys(e);return a.length === s.length && a.every(function (n) {
          return x(t[n], e[n]);
        });
      } catch (t) {
        return !1;
      }
    }function A(t, e) {
      for (var n = 0; n < t.length; n++) {
        if (x(t[n], e)) return n;
      }return -1;
    }function k(t) {
      var e = !1;return function () {
        e || (e = !0, t.apply(this, arguments));
      };
    }function O(t) {
      var e = (t + "").charCodeAt(0);return 36 === e || 95 === e;
    }function S(t, e, n, i) {
      Object.defineProperty(t, e, { value: n, enumerable: !!i, writable: !0, configurable: !0 });
    }function I(t) {
      if (!Si.test(t)) {
        var e = t.split(".");return function (t) {
          for (var n = 0; n < e.length; n++) {
            if (!t) return;t = t[e[n]];
          }return t;
        };
      }
    }function T(t) {
      return "function" == typeof t && /native code/.test(t.toString());
    }function D(t) {
      Xi.target && Yi.push(Xi.target), Xi.target = t;
    }function E() {
      Xi.target = Yi.pop();
    }function $(t) {
      return new Zi(void 0, void 0, void 0, String(t));
    }function j(t, e) {
      var n = t.componentOptions,
          i = new Zi(t.tag, t.data, t.children, t.text, t.elm, t.context, n, t.asyncFactory);return i.ns = t.ns, i.isStatic = t.isStatic, i.key = t.key, i.isComment = t.isComment, i.fnContext = t.fnContext, i.fnOptions = t.fnOptions, i.fnScopeId = t.fnScopeId, i.isCloned = !0, e && (t.children && (i.children = P(t.children, !0)), n && n.children && (n.children = P(n.children, !0))), i;
    }function P(t, e) {
      for (var n = t.length, i = new Array(n), r = 0; r < n; r++) {
        i[r] = j(t[r], e);
      }return i;
    }function N(t, e, n) {
      t.__proto__ = e;
    }function L(t, e, n) {
      for (var i = 0, r = n.length; i < r; i++) {
        var o = n[i];S(t, o, e[o]);
      }
    }function M(t, e) {
      if (c(t) && !(t instanceof Zi)) {
        var n;return m(t, "__ob__") && t.__ob__ instanceof ir ? n = t.__ob__ : nr.shouldConvert && !Ui() && (Array.isArray(t) || l(t)) && Object.isExtensible(t) && !t._isVue && (n = new ir(t)), e && n && n.vmCount++, n;
      }
    }function F(t, e, n, i, r) {
      var o = new Xi(),
          a = Object.getOwnPropertyDescriptor(t, e);if (!a || !1 !== a.configurable) {
        var s = a && a.get,
            c = a && a.set,
            l = !r && M(n);Object.defineProperty(t, e, { enumerable: !0, configurable: !0, get: function get() {
            var e = s ? s.call(t) : n;return Xi.target && (o.depend(), l && (l.dep.depend(), Array.isArray(e) && q(e))), e;
          }, set: function set(e) {
            var i = s ? s.call(t) : n;e === i || e !== e && i !== i || (c ? c.call(t, e) : n = e, l = !r && M(e), o.notify());
          } });
      }
    }function R(t, e, n) {
      if (Array.isArray(t) && f(e)) return t.length = Math.max(t.length, e), t.splice(e, 1, n), n;if (e in t && !(e in Object.prototype)) return t[e] = n, n;var i = t.__ob__;return t._isVue || i && i.vmCount ? n : i ? (F(i.value, e, n), i.dep.notify(), n) : (t[e] = n, n);
    }function B(t, e) {
      if (Array.isArray(t) && f(e)) return void t.splice(e, 1);var n = t.__ob__;t._isVue || n && n.vmCount || m(t, e) && (delete t[e], n && n.dep.notify());
    }function q(t) {
      for (var e = void 0, n = 0, i = t.length; n < i; n++) {
        e = t[n], e && e.__ob__ && e.__ob__.dep.depend(), Array.isArray(e) && q(e);
      }
    }function z(t, e) {
      if (!e) return t;for (var n, i, r, o = Object.keys(e), a = 0; a < o.length; a++) {
        n = o[a], i = t[n], r = e[n], m(t, n) ? l(i) && l(r) && z(i, r) : R(t, n, r);
      }return t;
    }function U(t, e, n) {
      return n ? function () {
        var i = "function" == typeof e ? e.call(n) : e,
            r = "function" == typeof t ? t.call(n) : t;return i ? z(i, r) : r;
      } : e ? t ? function () {
        return z("function" == typeof e ? e.call(this) : e, "function" == typeof t ? t.call(this) : t);
      } : e : t;
    }function H(t, e) {
      return e ? t ? t.concat(e) : Array.isArray(e) ? e : [e] : t;
    }function W(t, e, n, i) {
      var r = Object.create(t || null);return e ? b(r, e) : r;
    }function V(t, e) {
      var n = t.props;if (n) {
        var i,
            r,
            o,
            a = {};if (Array.isArray(n)) for (i = n.length; i--;) {
          "string" == typeof (r = n[i]) && (o = gi(r), a[o] = { type: null });
        } else if (l(n)) for (var s in n) {
          r = n[s], o = gi(s), a[o] = l(r) ? r : { type: r };
        }t.props = a;
      }
    }function G(t, e) {
      var n = t.inject,
          i = t.inject = {};if (Array.isArray(n)) for (var r = 0; r < n.length; r++) {
        i[n[r]] = { from: n[r] };
      } else if (l(n)) for (var o in n) {
        var a = n[o];i[o] = l(a) ? b({ from: o }, a) : { from: a };
      }
    }function X(t) {
      var e = t.directives;if (e) for (var n in e) {
        var i = e[n];"function" == typeof i && (e[n] = { bind: i, update: i });
      }
    }function Y(t, e, n) {
      function i(i) {
        var r = rr[i] || sr;c[i] = r(t[i], e[i], n, i);
      }"function" == typeof e && (e = e.options), V(e, n), G(e, n), X(e);var r = e.extends;if (r && (t = Y(t, r, n)), e.mixins) for (var o = 0, a = e.mixins.length; o < a; o++) {
        t = Y(t, e.mixins[o], n);
      }var s,
          c = {};for (s in t) {
        i(s);
      }for (s in e) {
        m(t, s) || i(s);
      }return c;
    }function Z(t, e, n, i) {
      if ("string" == typeof n) {
        var r = t[e];if (m(r, n)) return r[n];var o = gi(n);if (m(r, o)) return r[o];var a = yi(o);if (m(r, a)) return r[a];return r[n] || r[o] || r[a];
      }
    }function Q(t, e, n, i) {
      var r = e[t],
          o = !m(n, t),
          a = n[t];if (tt(Boolean, r.type) && (o && !m(r, "default") ? a = !1 : tt(String, r.type) || "" !== a && a !== bi(t) || (a = !0)), void 0 === a) {
        a = K(i, r, t);var s = nr.shouldConvert;nr.shouldConvert = !0, M(a), nr.shouldConvert = s;
      }return a;
    }function K(t, e, n) {
      if (m(e, "default")) {
        var i = e.default;return t && t.$options.propsData && void 0 === t.$options.propsData[n] && void 0 !== t._props[n] ? t._props[n] : "function" == typeof i && "Function" !== J(e.type) ? i.call(t) : i;
      }
    }function J(t) {
      var e = t && t.toString().match(/^\s*function (\w+)/);return e ? e[1] : "";
    }function tt(t, e) {
      if (!Array.isArray(e)) return J(e) === J(t);for (var n = 0, i = e.length; n < i; n++) {
        if (J(e[n]) === J(t)) return !0;
      }return !1;
    }function et(t, e, n) {
      if (e) for (var i = e; i = i.$parent;) {
        var r = i.$options.errorCaptured;if (r) for (var o = 0; o < r.length; o++) {
          try {
            var a = !1 === r[o].call(i, t, e, n);if (a) return;
          } catch (t) {
            nt(t, i, "errorCaptured hook");
          }
        }
      }nt(t, e, n);
    }function nt(t, e, n) {
      if (Oi.errorHandler) try {
        return Oi.errorHandler.call(null, t, e, n);
      } catch (t) {
        it(t, null, "config.errorHandler");
      }it(t, e, n);
    }function it(t, e, n) {
      if (!Ti && !Di || "undefined" == typeof console) throw t;console.error(t);
    }function rt() {
      lr = !1;var t = cr.slice(0);cr.length = 0;for (var e = 0; e < t.length; e++) {
        t[e]();
      }
    }function ot(t) {
      return t._withTask || (t._withTask = function () {
        ur = !0;var e = t.apply(null, arguments);return ur = !1, e;
      });
    }function at(t, e) {
      var n;if (cr.push(function () {
        if (t) try {
          t.call(e);
        } catch (t) {
          et(t, e, "nextTick");
        } else n && n(e);
      }), lr || (lr = !0, ur ? ar() : or()), !t && "undefined" != typeof Promise) return new Promise(function (t) {
        n = t;
      });
    }function st(t) {
      ct(t, vr), vr.clear();
    }function ct(t, e) {
      var n,
          i,
          r = Array.isArray(t);if ((r || c(t)) && !Object.isFrozen(t)) {
        if (t.__ob__) {
          var o = t.__ob__.dep.id;if (e.has(o)) return;e.add(o);
        }if (r) for (n = t.length; n--;) {
          ct(t[n], e);
        } else for (i = Object.keys(t), n = i.length; n--;) {
          ct(t[i[n]], e);
        }
      }
    }function lt(t) {
      function e() {
        var t = arguments,
            n = e.fns;if (!Array.isArray(n)) return n.apply(null, arguments);for (var i = n.slice(), r = 0; r < i.length; r++) {
          i[r].apply(null, t);
        }
      }return e.fns = t, e;
    }function ut(t, e, n, r, o) {
      var a, s, c, l;for (a in t) {
        s = t[a], c = e[a], l = mr(a), i(s) || (i(c) ? (i(s.fns) && (s = t[a] = lt(s)), n(l.name, s, l.once, l.capture, l.passive)) : s !== c && (c.fns = s, t[a] = c));
      }for (a in e) {
        i(t[a]) && (l = mr(a), r(l.name, e[a], l.capture));
      }
    }function ft(t, e, n) {
      function a() {
        n.apply(this, arguments), v(s.fns, a);
      }t instanceof Zi && (t = t.data.hook || (t.data.hook = {}));var s,
          c = t[e];i(c) ? s = lt([a]) : r(c.fns) && o(c.merged) ? (s = c, s.fns.push(a)) : s = lt([c, a]), s.merged = !0, t[e] = s;
    }function dt(t, e, n) {
      var o = e.options.props;if (!i(o)) {
        var a = {},
            s = t.attrs,
            c = t.props;if (r(s) || r(c)) for (var l in o) {
          var u = bi(l);pt(a, c, l, u, !0) || pt(a, s, l, u, !1);
        }return a;
      }
    }function pt(t, e, n, i, o) {
      if (r(e)) {
        if (m(e, n)) return t[n] = e[n], o || delete e[n], !0;if (m(e, i)) return t[n] = e[i], o || delete e[i], !0;
      }return !1;
    }function ht(t) {
      for (var e = 0; e < t.length; e++) {
        if (Array.isArray(t[e])) return Array.prototype.concat.apply([], t);
      }return t;
    }function vt(t) {
      return s(t) ? [$(t)] : Array.isArray(t) ? gt(t) : void 0;
    }function mt(t) {
      return r(t) && r(t.text) && a(t.isComment);
    }function gt(t, e) {
      var n,
          a,
          c,
          l,
          u = [];for (n = 0; n < t.length; n++) {
        a = t[n], i(a) || "boolean" == typeof a || (c = u.length - 1, l = u[c], Array.isArray(a) ? a.length > 0 && (a = gt(a, (e || "") + "_" + n), mt(a[0]) && mt(l) && (u[c] = $(l.text + a[0].text), a.shift()), u.push.apply(u, a)) : s(a) ? mt(l) ? u[c] = $(l.text + a) : "" !== a && u.push($(a)) : mt(a) && mt(l) ? u[c] = $(l.text + a.text) : (o(t._isVList) && r(a.tag) && i(a.key) && r(e) && (a.key = "__vlist" + e + "_" + n + "__"), u.push(a)));
      }return u;
    }function yt(t, e) {
      return (t.__esModule || Wi && "Module" === t[Symbol.toStringTag]) && (t = t.default), c(t) ? e.extend(t) : t;
    }function _t(t, e, n, i, r) {
      var o = Ki();return o.asyncFactory = t, o.asyncMeta = { data: e, context: n, children: i, tag: r }, o;
    }function bt(t, e, n) {
      if (o(t.error) && r(t.errorComp)) return t.errorComp;if (r(t.resolved)) return t.resolved;if (o(t.loading) && r(t.loadingComp)) return t.loadingComp;if (!r(t.contexts)) {
        var a = t.contexts = [n],
            s = !0,
            l = function l() {
          for (var t = 0, e = a.length; t < e; t++) {
            a[t].$forceUpdate();
          }
        },
            u = k(function (n) {
          t.resolved = yt(n, e), s || l();
        }),
            f = k(function (e) {
          r(t.errorComp) && (t.error = !0, l());
        }),
            d = t(u, f);return c(d) && ("function" == typeof d.then ? i(t.resolved) && d.then(u, f) : r(d.component) && "function" == typeof d.component.then && (d.component.then(u, f), r(d.error) && (t.errorComp = yt(d.error, e)), r(d.loading) && (t.loadingComp = yt(d.loading, e), 0 === d.delay ? t.loading = !0 : setTimeout(function () {
          i(t.resolved) && i(t.error) && (t.loading = !0, l());
        }, d.delay || 200)), r(d.timeout) && setTimeout(function () {
          i(t.resolved) && f(null);
        }, d.timeout))), s = !1, t.loading ? t.loadingComp : t.resolved;
      }t.contexts.push(n);
    }function wt(t) {
      return t.isComment && t.asyncFactory;
    }function Ct(t) {
      if (Array.isArray(t)) for (var e = 0; e < t.length; e++) {
        var n = t[e];if (r(n) && (r(n.componentOptions) || wt(n))) return n;
      }
    }function xt(t) {
      t._events = Object.create(null), t._hasHookEvent = !1;var e = t.$options._parentListeners;e && Ot(t, e);
    }function At(t, e, n) {
      n ? hr.$once(t, e) : hr.$on(t, e);
    }function kt(t, e) {
      hr.$off(t, e);
    }function Ot(t, e, n) {
      hr = t, ut(e, n || {}, At, kt, t), hr = void 0;
    }function St(t, e) {
      var n = {};if (!t) return n;for (var i = 0, r = t.length; i < r; i++) {
        var o = t[i],
            a = o.data;if (a && a.attrs && a.attrs.slot && delete a.attrs.slot, o.context !== e && o.fnContext !== e || !a || null == a.slot) (n.default || (n.default = [])).push(o);else {
          var s = o.data.slot,
              c = n[s] || (n[s] = []);"template" === o.tag ? c.push.apply(c, o.children) : c.push(o);
        }
      }for (var l in n) {
        n[l].every(It) && delete n[l];
      }return n;
    }function It(t) {
      return t.isComment && !t.asyncFactory || " " === t.text;
    }function Tt(t, e) {
      e = e || {};for (var n = 0; n < t.length; n++) {
        Array.isArray(t[n]) ? Tt(t[n], e) : e[t[n].key] = t[n].fn;
      }return e;
    }function Dt(t) {
      var e = t.$options,
          n = e.parent;if (n && !e.abstract) {
        for (; n.$options.abstract && n.$parent;) {
          n = n.$parent;
        }n.$children.push(t);
      }t.$parent = n, t.$root = n ? n.$root : t, t.$children = [], t.$refs = {}, t._watcher = null, t._inactive = null, t._directInactive = !1, t._isMounted = !1, t._isDestroyed = !1, t._isBeingDestroyed = !1;
    }function Et(t, e, n) {
      t.$el = e, t.$options.render || (t.$options.render = Ki), Lt(t, "beforeMount");var i;return i = function i() {
        t._update(t._render(), n);
      }, new kr(t, i, C, null, !0), n = !1, null == t.$vnode && (t._isMounted = !0, Lt(t, "mounted")), t;
    }function $t(t, e, n, i, r) {
      var o = !!(r || t.$options._renderChildren || i.data.scopedSlots || t.$scopedSlots !== di);if (t.$options._parentVnode = i, t.$vnode = i, t._vnode && (t._vnode.parent = i), t.$options._renderChildren = r, t.$attrs = i.data && i.data.attrs || di, t.$listeners = n || di, e && t.$options.props) {
        nr.shouldConvert = !1;for (var a = t._props, s = t.$options._propKeys || [], c = 0; c < s.length; c++) {
          var l = s[c];a[l] = Q(l, t.$options.props, e, t);
        }nr.shouldConvert = !0, t.$options.propsData = e;
      }if (n) {
        var u = t.$options._parentListeners;t.$options._parentListeners = n, Ot(t, n, u);
      }o && (t.$slots = St(r, i.context), t.$forceUpdate());
    }function jt(t) {
      for (; t && (t = t.$parent);) {
        if (t._inactive) return !0;
      }return !1;
    }function Pt(t, e) {
      if (e) {
        if (t._directInactive = !1, jt(t)) return;
      } else if (t._directInactive) return;if (t._inactive || null === t._inactive) {
        t._inactive = !1;for (var n = 0; n < t.$children.length; n++) {
          Pt(t.$children[n]);
        }Lt(t, "activated");
      }
    }function Nt(t, e) {
      if (!(e && (t._directInactive = !0, jt(t)) || t._inactive)) {
        t._inactive = !0;for (var n = 0; n < t.$children.length; n++) {
          Nt(t.$children[n]);
        }Lt(t, "deactivated");
      }
    }function Lt(t, e) {
      var n = t.$options[e];if (n) for (var i = 0, r = n.length; i < r; i++) {
        try {
          n[i].call(t);
        } catch (n) {
          et(n, t, e + " hook");
        }
      }t._hasHookEvent && t.$emit("hook:" + e);
    }function Mt() {
      xr = yr.length = _r.length = 0, br = {}, wr = Cr = !1;
    }function Ft() {
      Cr = !0;var t, e;for (yr.sort(function (t, e) {
        return t.id - e.id;
      }), xr = 0; xr < yr.length; xr++) {
        t = yr[xr], e = t.id, br[e] = null, t.run();
      }var n = _r.slice(),
          i = yr.slice();Mt(), qt(n), Rt(i), Hi && Oi.devtools && Hi.emit("flush");
    }function Rt(t) {
      for (var e = t.length; e--;) {
        var n = t[e],
            i = n.vm;i._watcher === n && i._isMounted && Lt(i, "updated");
      }
    }function Bt(t) {
      t._inactive = !1, _r.push(t);
    }function qt(t) {
      for (var e = 0; e < t.length; e++) {
        t[e]._inactive = !0, Pt(t[e], !0);
      }
    }function zt(t) {
      var e = t.id;if (null == br[e]) {
        if (br[e] = !0, Cr) {
          for (var n = yr.length - 1; n > xr && yr[n].id > t.id;) {
            n--;
          }yr.splice(n + 1, 0, t);
        } else yr.push(t);wr || (wr = !0, at(Ft));
      }
    }function Ut(t, e, n) {
      Or.get = function () {
        return this[e][n];
      }, Or.set = function (t) {
        this[e][n] = t;
      }, Object.defineProperty(t, n, Or);
    }function Ht(t) {
      t._watchers = [];var e = t.$options;e.props && Wt(t, e.props), e.methods && Qt(t, e.methods), e.data ? Vt(t) : M(t._data = {}, !0), e.computed && Xt(t, e.computed), e.watch && e.watch !== Fi && Kt(t, e.watch);
    }function Wt(t, e) {
      var n = t.$options.propsData || {},
          i = t._props = {},
          r = t.$options._propKeys = [],
          o = !t.$parent;nr.shouldConvert = o;for (var a in e) {
        !function (o) {
          r.push(o);var a = Q(o, e, n, t);F(i, o, a), o in t || Ut(t, "_props", o);
        }(a);
      }nr.shouldConvert = !0;
    }function Vt(t) {
      var e = t.$options.data;e = t._data = "function" == typeof e ? Gt(e, t) : e || {}, l(e) || (e = {});for (var n = Object.keys(e), i = t.$options.props, r = (t.$options.methods, n.length); r--;) {
        var o = n[r];i && m(i, o) || O(o) || Ut(t, "_data", o);
      }M(e, !0);
    }function Gt(t, e) {
      try {
        return t.call(e, e);
      } catch (t) {
        return et(t, e, "data()"), {};
      }
    }function Xt(t, e) {
      var n = t._computedWatchers = Object.create(null),
          i = Ui();for (var r in e) {
        var o = e[r],
            a = "function" == typeof o ? o : o.get;i || (n[r] = new kr(t, a || C, C, Sr)), r in t || Yt(t, r, o);
      }
    }function Yt(t, e, n) {
      var i = !Ui();"function" == typeof n ? (Or.get = i ? Zt(e) : n, Or.set = C) : (Or.get = n.get ? i && !1 !== n.cache ? Zt(e) : n.get : C, Or.set = n.set ? n.set : C), Object.defineProperty(t, e, Or);
    }function Zt(t) {
      return function () {
        var e = this._computedWatchers && this._computedWatchers[t];if (e) return e.dirty && e.evaluate(), Xi.target && e.depend(), e.value;
      };
    }function Qt(t, e) {
      t.$options.props;for (var n in e) {
        t[n] = null == e[n] ? C : y(e[n], t);
      }
    }function Kt(t, e) {
      for (var n in e) {
        var i = e[n];if (Array.isArray(i)) for (var r = 0; r < i.length; r++) {
          Jt(t, n, i[r]);
        } else Jt(t, n, i);
      }
    }function Jt(t, e, n, i) {
      return l(n) && (i = n, n = n.handler), "string" == typeof n && (n = t[n]), t.$watch(e, n, i);
    }function te(t) {
      var e = t.$options.provide;e && (t._provided = "function" == typeof e ? e.call(t) : e);
    }function ee(t) {
      var e = ne(t.$options.inject, t);e && (nr.shouldConvert = !1, Object.keys(e).forEach(function (n) {
        F(t, n, e[n]);
      }), nr.shouldConvert = !0);
    }function ne(t, e) {
      if (t) {
        for (var n = Object.create(null), i = Wi ? Reflect.ownKeys(t).filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        }) : Object.keys(t), r = 0; r < i.length; r++) {
          for (var o = i[r], a = t[o].from, s = e; s;) {
            if (s._provided && a in s._provided) {
              n[o] = s._provided[a];break;
            }s = s.$parent;
          }if (!s && "default" in t[o]) {
            var c = t[o].default;n[o] = "function" == typeof c ? c.call(e) : c;
          }
        }return n;
      }
    }function ie(t, e) {
      var n, i, o, a, s;if (Array.isArray(t) || "string" == typeof t) for (n = new Array(t.length), i = 0, o = t.length; i < o; i++) {
        n[i] = e(t[i], i);
      } else if ("number" == typeof t) for (n = new Array(t), i = 0; i < t; i++) {
        n[i] = e(i + 1, i);
      } else if (c(t)) for (a = Object.keys(t), n = new Array(a.length), i = 0, o = a.length; i < o; i++) {
        s = a[i], n[i] = e(t[s], s, i);
      }return r(n) && (n._isVList = !0), n;
    }function re(t, e, n, i) {
      var r,
          o = this.$scopedSlots[t];if (o) n = n || {}, i && (n = b(b({}, i), n)), r = o(n) || e;else {
        var a = this.$slots[t];a && (a._rendered = !0), r = a || e;
      }var s = n && n.slot;return s ? this.$createElement("template", { slot: s }, r) : r;
    }function oe(t) {
      return Z(this.$options, "filters", t, !0) || Ci;
    }function ae(t, e, n, i) {
      var r = Oi.keyCodes[e] || n;return r ? Array.isArray(r) ? -1 === r.indexOf(t) : r !== t : i ? bi(i) !== e : void 0;
    }function se(t, e, n, i, r) {
      if (n) if (c(n)) {
        Array.isArray(n) && (n = w(n));var o;for (var a in n) {
          !function (a) {
            if ("class" === a || "style" === a || hi(a)) o = t;else {
              var s = t.attrs && t.attrs.type;o = i || Oi.mustUseProp(e, s, a) ? t.domProps || (t.domProps = {}) : t.attrs || (t.attrs = {});
            }if (!(a in o) && (o[a] = n[a], r)) {
              (t.on || (t.on = {}))["update:" + a] = function (t) {
                n[a] = t;
              };
            }
          }(a);
        }
      } else ;return t;
    }function ce(t, e, n) {
      var i = arguments.length < 3,
          r = this.$options.staticRenderFns,
          o = i || n ? this._staticTrees || (this._staticTrees = []) : r.cached || (r.cached = []),
          a = o[t];return a && !e ? Array.isArray(a) ? P(a) : j(a) : (a = o[t] = r[t].call(this._renderProxy, null, this), ue(a, "__static__" + t, !1), a);
    }function le(t, e, n) {
      return ue(t, "__once__" + e + (n ? "_" + n : ""), !0), t;
    }function ue(t, e, n) {
      if (Array.isArray(t)) for (var i = 0; i < t.length; i++) {
        t[i] && "string" != typeof t[i] && fe(t[i], e + "_" + i, n);
      } else fe(t, e, n);
    }function fe(t, e, n) {
      t.isStatic = !0, t.key = e, t.isOnce = n;
    }function de(t, e) {
      if (e) if (l(e)) {
        var n = t.on = t.on ? b({}, t.on) : {};for (var i in e) {
          var r = n[i],
              o = e[i];n[i] = r ? [].concat(r, o) : o;
        }
      } else ;return t;
    }function pe(t) {
      t._o = le, t._n = p, t._s = d, t._l = ie, t._t = re, t._q = x, t._i = A, t._m = ce, t._f = oe, t._k = ae, t._b = se, t._v = $, t._e = Ki, t._u = Tt, t._g = de;
    }function he(t, e, n, i, r) {
      var a = r.options;this.data = t, this.props = e, this.children = n, this.parent = i, this.listeners = t.on || di, this.injections = ne(a.inject, i), this.slots = function () {
        return St(n, i);
      };var s = Object.create(i),
          c = o(a._compiled),
          l = !c;c && (this.$options = a, this.$slots = this.slots(), this.$scopedSlots = t.scopedSlots || di), a._scopeId ? this._c = function (t, e, n, r) {
        var o = Ce(s, t, e, n, r, l);return o && (o.fnScopeId = a._scopeId, o.fnContext = i), o;
      } : this._c = function (t, e, n, i) {
        return Ce(s, t, e, n, i, l);
      };
    }function ve(t, e, n, i, o) {
      var a = t.options,
          s = {},
          c = a.props;if (r(c)) for (var l in c) {
        s[l] = Q(l, c, e || di);
      } else r(n.attrs) && me(s, n.attrs), r(n.props) && me(s, n.props);var u = new he(n, s, o, i, t),
          f = a.render.call(null, u._c, u);return f instanceof Zi && (f.fnContext = i, f.fnOptions = a, n.slot && ((f.data || (f.data = {})).slot = n.slot)), f;
    }function me(t, e) {
      for (var n in e) {
        t[gi(n)] = e[n];
      }
    }function ge(t, e, n, a, s) {
      if (!i(t)) {
        var l = n.$options._base;if (c(t) && (t = l.extend(t)), "function" == typeof t) {
          var u;if (i(t.cid) && (u = t, void 0 === (t = bt(u, l, n)))) return _t(u, e, n, a, s);e = e || {}, Se(t), r(e.model) && we(t.options, e);var f = dt(e, t, s);if (o(t.options.functional)) return ve(t, f, e, n, a);var d = e.on;if (e.on = e.nativeOn, o(t.options.abstract)) {
            var p = e.slot;e = {}, p && (e.slot = p);
          }_e(e);var h = t.options.name || s;return new Zi("vue-component-" + t.cid + (h ? "-" + h : ""), e, void 0, void 0, void 0, n, { Ctor: t, propsData: f, listeners: d, tag: s, children: a }, u);
        }
      }
    }function ye(t, e, n, i) {
      var o = t.componentOptions,
          a = { _isComponent: !0, parent: e, propsData: o.propsData, _componentTag: o.tag, _parentVnode: t, _parentListeners: o.listeners, _renderChildren: o.children, _parentElm: n || null, _refElm: i || null },
          s = t.data.inlineTemplate;return r(s) && (a.render = s.render, a.staticRenderFns = s.staticRenderFns), new o.Ctor(a);
    }function _e(t) {
      t.hook || (t.hook = {});for (var e = 0; e < Tr.length; e++) {
        var n = Tr[e],
            i = t.hook[n],
            r = Ir[n];t.hook[n] = i ? be(r, i) : r;
      }
    }function be(t, e) {
      return function (n, i, r, o) {
        t(n, i, r, o), e(n, i, r, o);
      };
    }function we(t, e) {
      var n = t.model && t.model.prop || "value",
          i = t.model && t.model.event || "input";(e.props || (e.props = {}))[n] = e.model.value;var o = e.on || (e.on = {});r(o[i]) ? o[i] = [e.model.callback].concat(o[i]) : o[i] = e.model.callback;
    }function Ce(t, e, n, i, r, a) {
      return (Array.isArray(n) || s(n)) && (r = i, i = n, n = void 0), o(a) && (r = Er), xe(t, e, n, i, r);
    }function xe(t, e, n, i, o) {
      if (r(n) && r(n.__ob__)) return Ki();if (r(n) && r(n.is) && (e = n.is), !e) return Ki();Array.isArray(i) && "function" == typeof i[0] && (n = n || {}, n.scopedSlots = { default: i[0] }, i.length = 0), o === Er ? i = vt(i) : o === Dr && (i = ht(i));var a, s;if ("string" == typeof e) {
        var c;s = t.$vnode && t.$vnode.ns || Oi.getTagNamespace(e), a = Oi.isReservedTag(e) ? new Zi(Oi.parsePlatformTagName(e), n, i, void 0, void 0, t) : r(c = Z(t.$options, "components", e)) ? ge(c, n, t, i, e) : new Zi(e, n, i, void 0, void 0, t);
      } else a = ge(e, n, t, i);return r(a) ? (s && Ae(a, s), a) : Ki();
    }function Ae(t, e, n) {
      if (t.ns = e, "foreignObject" === t.tag && (e = void 0, n = !0), r(t.children)) for (var a = 0, s = t.children.length; a < s; a++) {
        var c = t.children[a];r(c.tag) && (i(c.ns) || o(n)) && Ae(c, e, n);
      }
    }function ke(t) {
      t._vnode = null, t._staticTrees = null;var e = t.$options,
          n = t.$vnode = e._parentVnode,
          i = n && n.context;t.$slots = St(e._renderChildren, i), t.$scopedSlots = di, t._c = function (e, n, i, r) {
        return Ce(t, e, n, i, r, !1);
      }, t.$createElement = function (e, n, i, r) {
        return Ce(t, e, n, i, r, !0);
      };var r = n && n.data;F(t, "$attrs", r && r.attrs || di, null, !0), F(t, "$listeners", e._parentListeners || di, null, !0);
    }function Oe(t, e) {
      var n = t.$options = Object.create(t.constructor.options);n.parent = e.parent, n.propsData = e.propsData, n._parentVnode = e._parentVnode, n._parentListeners = e._parentListeners, n._renderChildren = e._renderChildren, n._componentTag = e._componentTag, n._parentElm = e._parentElm, n._refElm = e._refElm, e.render && (n.render = e.render, n.staticRenderFns = e.staticRenderFns);
    }function Se(t) {
      var e = t.options;if (t.super) {
        var n = Se(t.super);if (n !== t.superOptions) {
          t.superOptions = n;var i = Ie(t);i && b(t.extendOptions, i), e = t.options = Y(n, t.extendOptions), e.name && (e.components[e.name] = t);
        }
      }return e;
    }function Ie(t) {
      var e,
          n = t.options,
          i = t.extendOptions,
          r = t.sealedOptions;for (var o in n) {
        n[o] !== r[o] && (e || (e = {}), e[o] = Te(n[o], i[o], r[o]));
      }return e;
    }function Te(t, e, n) {
      if (Array.isArray(t)) {
        var i = [];n = Array.isArray(n) ? n : [n], e = Array.isArray(e) ? e : [e];for (var r = 0; r < t.length; r++) {
          (e.indexOf(t[r]) >= 0 || n.indexOf(t[r]) < 0) && i.push(t[r]);
        }return i;
      }return t;
    }function De(t) {
      this._init(t);
    }function Ee(t) {
      t.use = function (t) {
        var e = this._installedPlugins || (this._installedPlugins = []);if (e.indexOf(t) > -1) return this;var n = _(arguments, 1);return n.unshift(this), "function" == typeof t.install ? t.install.apply(t, n) : "function" == typeof t && t.apply(null, n), e.push(t), this;
      };
    }function $e(t) {
      t.mixin = function (t) {
        return this.options = Y(this.options, t), this;
      };
    }function je(t) {
      t.cid = 0;var e = 1;t.extend = function (t) {
        t = t || {};var n = this,
            i = n.cid,
            r = t._Ctor || (t._Ctor = {});if (r[i]) return r[i];var o = t.name || n.options.name,
            a = function a(t) {
          this._init(t);
        };return a.prototype = Object.create(n.prototype), a.prototype.constructor = a, a.cid = e++, a.options = Y(n.options, t), a.super = n, a.options.props && Pe(a), a.options.computed && Ne(a), a.extend = n.extend, a.mixin = n.mixin, a.use = n.use, Ai.forEach(function (t) {
          a[t] = n[t];
        }), o && (a.options.components[o] = a), a.superOptions = n.options, a.extendOptions = t, a.sealedOptions = b({}, a.options), r[i] = a, a;
      };
    }function Pe(t) {
      var e = t.options.props;for (var n in e) {
        Ut(t.prototype, "_props", n);
      }
    }function Ne(t) {
      var e = t.options.computed;for (var n in e) {
        Yt(t.prototype, n, e[n]);
      }
    }function Le(t) {
      Ai.forEach(function (e) {
        t[e] = function (t, n) {
          return n ? ("component" === e && l(n) && (n.name = n.name || t, n = this.options._base.extend(n)), "directive" === e && "function" == typeof n && (n = { bind: n, update: n }), this.options[e + "s"][t] = n, n) : this.options[e + "s"][t];
        };
      });
    }function Me(t) {
      return t && (t.Ctor.options.name || t.tag);
    }function Fe(t, e) {
      return Array.isArray(t) ? t.indexOf(e) > -1 : "string" == typeof t ? t.split(",").indexOf(e) > -1 : !!u(t) && t.test(e);
    }function Re(t, e) {
      var n = t.cache,
          i = t.keys,
          r = t._vnode;for (var o in n) {
        var a = n[o];if (a) {
          var s = Me(a.componentOptions);s && !e(s) && Be(n, o, i, r);
        }
      }
    }function Be(t, e, n, i) {
      var r = t[e];!r || i && r.tag === i.tag || r.componentInstance.$destroy(), t[e] = null, v(n, e);
    }function qe(t) {
      for (var e = t.data, n = t, i = t; r(i.componentInstance);) {
        i = i.componentInstance._vnode, i.data && (e = ze(i.data, e));
      }for (; r(n = n.parent);) {
        n.data && (e = ze(e, n.data));
      }return Ue(e.staticClass, e.class);
    }function ze(t, e) {
      return { staticClass: He(t.staticClass, e.staticClass), class: r(t.class) ? [t.class, e.class] : e.class };
    }function Ue(t, e) {
      return r(t) || r(e) ? He(t, We(e)) : "";
    }function He(t, e) {
      return t ? e ? t + " " + e : t : e || "";
    }function We(t) {
      return Array.isArray(t) ? Ve(t) : c(t) ? Ge(t) : "string" == typeof t ? t : "";
    }function Ve(t) {
      for (var e, n = "", i = 0, o = t.length; i < o; i++) {
        r(e = We(t[i])) && "" !== e && (n && (n += " "), n += e);
      }return n;
    }function Ge(t) {
      var e = "";for (var n in t) {
        t[n] && (e && (e += " "), e += n);
      }return e;
    }function Xe(t) {
      return Yr(t) ? "svg" : "math" === t ? "math" : void 0;
    }function Ye(t) {
      if (!Ti) return !0;if (Zr(t)) return !1;if (t = t.toLowerCase(), null != Qr[t]) return Qr[t];var e = document.createElement(t);return t.indexOf("-") > -1 ? Qr[t] = e.constructor === window.HTMLUnknownElement || e.constructor === window.HTMLElement : Qr[t] = /HTMLUnknownElement/.test(e.toString());
    }function Ze(t) {
      if ("string" == typeof t) {
        var e = document.querySelector(t);return e || document.createElement("div");
      }return t;
    }function Qe(t, e) {
      var n = document.createElement(t);return "select" !== t ? n : (e.data && e.data.attrs && void 0 !== e.data.attrs.multiple && n.setAttribute("multiple", "multiple"), n);
    }function Ke(t, e) {
      return document.createElementNS(Gr[t], e);
    }function Je(t) {
      return document.createTextNode(t);
    }function tn(t) {
      return document.createComment(t);
    }function en(t, e, n) {
      t.insertBefore(e, n);
    }function nn(t, e) {
      t.removeChild(e);
    }function rn(t, e) {
      t.appendChild(e);
    }function on(t) {
      return t.parentNode;
    }function an(t) {
      return t.nextSibling;
    }function sn(t) {
      return t.tagName;
    }function cn(t, e) {
      t.textContent = e;
    }function ln(t, e, n) {
      t.setAttribute(e, n);
    }function un(t, e) {
      var n = t.data.ref;if (n) {
        var i = t.context,
            r = t.componentInstance || t.elm,
            o = i.$refs;e ? Array.isArray(o[n]) ? v(o[n], r) : o[n] === r && (o[n] = void 0) : t.data.refInFor ? Array.isArray(o[n]) ? o[n].indexOf(r) < 0 && o[n].push(r) : o[n] = [r] : o[n] = r;
      }
    }function fn(t, e) {
      return t.key === e.key && (t.tag === e.tag && t.isComment === e.isComment && r(t.data) === r(e.data) && dn(t, e) || o(t.isAsyncPlaceholder) && t.asyncFactory === e.asyncFactory && i(e.asyncFactory.error));
    }function dn(t, e) {
      if ("input" !== t.tag) return !0;var n,
          i = r(n = t.data) && r(n = n.attrs) && n.type,
          o = r(n = e.data) && r(n = n.attrs) && n.type;return i === o || Kr(i) && Kr(o);
    }function pn(t, e, n) {
      var i,
          o,
          a = {};for (i = e; i <= n; ++i) {
        o = t[i].key, r(o) && (a[o] = i);
      }return a;
    }function hn(t, e) {
      (t.data.directives || e.data.directives) && vn(t, e);
    }function vn(t, e) {
      var n,
          i,
          r,
          o = t === eo,
          a = e === eo,
          s = mn(t.data.directives, t.context),
          c = mn(e.data.directives, e.context),
          l = [],
          u = [];for (n in c) {
        i = s[n], r = c[n], i ? (r.oldValue = i.value, yn(r, "update", e, t), r.def && r.def.componentUpdated && u.push(r)) : (yn(r, "bind", e, t), r.def && r.def.inserted && l.push(r));
      }if (l.length) {
        var f = function f() {
          for (var n = 0; n < l.length; n++) {
            yn(l[n], "inserted", e, t);
          }
        };o ? ft(e, "insert", f) : f();
      }if (u.length && ft(e, "postpatch", function () {
        for (var n = 0; n < u.length; n++) {
          yn(u[n], "componentUpdated", e, t);
        }
      }), !o) for (n in s) {
        c[n] || yn(s[n], "unbind", t, t, a);
      }
    }function mn(t, e) {
      var n = Object.create(null);if (!t) return n;var i, r;for (i = 0; i < t.length; i++) {
        r = t[i], r.modifiers || (r.modifiers = ro), n[gn(r)] = r, r.def = Z(e.$options, "directives", r.name, !0);
      }return n;
    }function gn(t) {
      return t.rawName || t.name + "." + Object.keys(t.modifiers || {}).join(".");
    }function yn(t, e, n, i, r) {
      var o = t.def && t.def[e];if (o) try {
        o(n.elm, t, n, i, r);
      } catch (i) {
        et(i, n.context, "directive " + t.name + " " + e + " hook");
      }
    }function _n(t, e) {
      var n = e.componentOptions;if (!(r(n) && !1 === n.Ctor.options.inheritAttrs || i(t.data.attrs) && i(e.data.attrs))) {
        var o,
            a,
            s = e.elm,
            c = t.data.attrs || {},
            l = e.data.attrs || {};r(l.__ob__) && (l = e.data.attrs = b({}, l));for (o in l) {
          a = l[o], c[o] !== a && bn(s, o, a);
        }(ji || Ni) && l.value !== c.value && bn(s, "value", l.value);for (o in c) {
          i(l[o]) && (Hr(o) ? s.removeAttributeNS(Ur, Wr(o)) : qr(o) || s.removeAttribute(o));
        }
      }
    }function bn(t, e, n) {
      if (zr(e)) Vr(n) ? t.removeAttribute(e) : (n = "allowfullscreen" === e && "EMBED" === t.tagName ? "true" : e, t.setAttribute(e, n));else if (qr(e)) t.setAttribute(e, Vr(n) || "false" === n ? "false" : "true");else if (Hr(e)) Vr(n) ? t.removeAttributeNS(Ur, Wr(e)) : t.setAttributeNS(Ur, e, n);else if (Vr(n)) t.removeAttribute(e);else {
        if (ji && !Pi && "TEXTAREA" === t.tagName && "placeholder" === e && !t.__ieph) {
          var i = function i(e) {
            e.stopImmediatePropagation(), t.removeEventListener("input", i);
          };t.addEventListener("input", i), t.__ieph = !0;
        }t.setAttribute(e, n);
      }
    }function wn(t, e) {
      var n = e.elm,
          o = e.data,
          a = t.data;if (!(i(o.staticClass) && i(o.class) && (i(a) || i(a.staticClass) && i(a.class)))) {
        var s = qe(e),
            c = n._transitionClasses;r(c) && (s = He(s, We(c))), s !== n._prevClass && (n.setAttribute("class", s), n._prevClass = s);
      }
    }function Cn(t) {
      if (r(t[co])) {
        var e = ji ? "change" : "input";t[e] = [].concat(t[co], t[e] || []), delete t[co];
      }r(t[lo]) && (t.change = [].concat(t[lo], t.change || []), delete t[lo]);
    }function xn(t, e, n) {
      var i = Lr;return function r() {
        null !== t.apply(null, arguments) && kn(e, r, n, i);
      };
    }function An(t, e, n, i, r) {
      e = ot(e), n && (e = xn(e, t, i)), Lr.addEventListener(t, e, Ri ? { capture: i, passive: r } : i);
    }function kn(t, e, n, i) {
      (i || Lr).removeEventListener(t, e._withTask || e, n);
    }function On(t, e) {
      if (!i(t.data.on) || !i(e.data.on)) {
        var n = e.data.on || {},
            r = t.data.on || {};Lr = e.elm, Cn(n), ut(n, r, An, kn, e.context), Lr = void 0;
      }
    }function Sn(t, e) {
      if (!i(t.data.domProps) || !i(e.data.domProps)) {
        var n,
            o,
            a = e.elm,
            s = t.data.domProps || {},
            c = e.data.domProps || {};r(c.__ob__) && (c = e.data.domProps = b({}, c));for (n in s) {
          i(c[n]) && (a[n] = "");
        }for (n in c) {
          if (o = c[n], "textContent" === n || "innerHTML" === n) {
            if (e.children && (e.children.length = 0), o === s[n]) continue;1 === a.childNodes.length && a.removeChild(a.childNodes[0]);
          }if ("value" === n) {
            a._value = o;var l = i(o) ? "" : String(o);In(a, l) && (a.value = l);
          } else a[n] = o;
        }
      }
    }function In(t, e) {
      return !t.composing && ("OPTION" === t.tagName || Tn(t, e) || Dn(t, e));
    }function Tn(t, e) {
      var n = !0;try {
        n = document.activeElement !== t;
      } catch (t) {}return n && t.value !== e;
    }function Dn(t, e) {
      var n = t.value,
          i = t._vModifiers;return r(i) && i.number ? p(n) !== p(e) : r(i) && i.trim ? n.trim() !== e.trim() : n !== e;
    }function En(t) {
      var e = $n(t.style);return t.staticStyle ? b(t.staticStyle, e) : e;
    }function $n(t) {
      return Array.isArray(t) ? w(t) : "string" == typeof t ? po(t) : t;
    }function jn(t, e) {
      var n,
          i = {};if (e) for (var r = t; r.componentInstance;) {
        r = r.componentInstance._vnode, r.data && (n = En(r.data)) && b(i, n);
      }(n = En(t.data)) && b(i, n);for (var o = t; o = o.parent;) {
        o.data && (n = En(o.data)) && b(i, n);
      }return i;
    }function Pn(t, e) {
      var n = e.data,
          o = t.data;if (!(i(n.staticStyle) && i(n.style) && i(o.staticStyle) && i(o.style))) {
        var a,
            s,
            c = e.elm,
            l = o.staticStyle,
            u = o.normalizedStyle || o.style || {},
            f = l || u,
            d = $n(e.data.style) || {};e.data.normalizedStyle = r(d.__ob__) ? b({}, d) : d;var p = jn(e, !0);for (s in f) {
          i(p[s]) && mo(c, s, "");
        }for (s in p) {
          (a = p[s]) !== f[s] && mo(c, s, null == a ? "" : a);
        }
      }
    }function Nn(t, e) {
      if (e && (e = e.trim())) if (t.classList) e.indexOf(" ") > -1 ? e.split(/\s+/).forEach(function (e) {
        return t.classList.add(e);
      }) : t.classList.add(e);else {
        var n = " " + (t.getAttribute("class") || "") + " ";n.indexOf(" " + e + " ") < 0 && t.setAttribute("class", (n + e).trim());
      }
    }function Ln(t, e) {
      if (e && (e = e.trim())) if (t.classList) e.indexOf(" ") > -1 ? e.split(/\s+/).forEach(function (e) {
        return t.classList.remove(e);
      }) : t.classList.remove(e), t.classList.length || t.removeAttribute("class");else {
        for (var n = " " + (t.getAttribute("class") || "") + " ", i = " " + e + " "; n.indexOf(i) >= 0;) {
          n = n.replace(i, " ");
        }n = n.trim(), n ? t.setAttribute("class", n) : t.removeAttribute("class");
      }
    }function Mn(t) {
      if (t) {
        if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
          var e = {};return !1 !== t.css && b(e, bo(t.name || "v")), b(e, t), e;
        }return "string" == typeof t ? bo(t) : void 0;
      }
    }function Fn(t) {
      Io(function () {
        Io(t);
      });
    }function Rn(t, e) {
      var n = t._transitionClasses || (t._transitionClasses = []);n.indexOf(e) < 0 && (n.push(e), Nn(t, e));
    }function Bn(t, e) {
      t._transitionClasses && v(t._transitionClasses, e), Ln(t, e);
    }function qn(t, e, n) {
      var i = zn(t, e),
          r = i.type,
          o = i.timeout,
          a = i.propCount;if (!r) return n();var s = r === Co ? ko : So,
          c = 0,
          l = function l() {
        t.removeEventListener(s, u), n();
      },
          u = function u(e) {
        e.target === t && ++c >= a && l();
      };setTimeout(function () {
        c < a && l();
      }, o + 1), t.addEventListener(s, u);
    }function zn(t, e) {
      var n,
          i = window.getComputedStyle(t),
          r = i[Ao + "Delay"].split(", "),
          o = i[Ao + "Duration"].split(", "),
          a = Un(r, o),
          s = i[Oo + "Delay"].split(", "),
          c = i[Oo + "Duration"].split(", "),
          l = Un(s, c),
          u = 0,
          f = 0;return e === Co ? a > 0 && (n = Co, u = a, f = o.length) : e === xo ? l > 0 && (n = xo, u = l, f = c.length) : (u = Math.max(a, l), n = u > 0 ? a > l ? Co : xo : null, f = n ? n === Co ? o.length : c.length : 0), { type: n, timeout: u, propCount: f, hasTransform: n === Co && To.test(i[Ao + "Property"]) };
    }function Un(t, e) {
      for (; t.length < e.length;) {
        t = t.concat(t);
      }return Math.max.apply(null, e.map(function (e, n) {
        return Hn(e) + Hn(t[n]);
      }));
    }function Hn(t) {
      return 1e3 * Number(t.slice(0, -1));
    }function Wn(t, e) {
      var n = t.elm;r(n._leaveCb) && (n._leaveCb.cancelled = !0, n._leaveCb());var o = Mn(t.data.transition);if (!i(o) && !r(n._enterCb) && 1 === n.nodeType) {
        for (var a = o.css, s = o.type, l = o.enterClass, u = o.enterToClass, f = o.enterActiveClass, d = o.appearClass, h = o.appearToClass, v = o.appearActiveClass, m = o.beforeEnter, g = o.enter, y = o.afterEnter, _ = o.enterCancelled, b = o.beforeAppear, w = o.appear, C = o.afterAppear, x = o.appearCancelled, A = o.duration, O = gr, S = gr.$vnode; S && S.parent;) {
          S = S.parent, O = S.context;
        }var I = !O._isMounted || !t.isRootInsert;if (!I || w || "" === w) {
          var T = I && d ? d : l,
              D = I && v ? v : f,
              E = I && h ? h : u,
              $ = I ? b || m : m,
              j = I && "function" == typeof w ? w : g,
              P = I ? C || y : y,
              N = I ? x || _ : _,
              L = p(c(A) ? A.enter : A),
              M = !1 !== a && !Pi,
              F = Xn(j),
              R = n._enterCb = k(function () {
            M && (Bn(n, E), Bn(n, D)), R.cancelled ? (M && Bn(n, T), N && N(n)) : P && P(n), n._enterCb = null;
          });t.data.show || ft(t, "insert", function () {
            var e = n.parentNode,
                i = e && e._pending && e._pending[t.key];i && i.tag === t.tag && i.elm._leaveCb && i.elm._leaveCb(), j && j(n, R);
          }), $ && $(n), M && (Rn(n, T), Rn(n, D), Fn(function () {
            Rn(n, E), Bn(n, T), R.cancelled || F || (Gn(L) ? setTimeout(R, L) : qn(n, s, R));
          })), t.data.show && (e && e(), j && j(n, R)), M || F || R();
        }
      }
    }function Vn(t, e) {
      function n() {
        x.cancelled || (t.data.show || ((o.parentNode._pending || (o.parentNode._pending = {}))[t.key] = t), h && h(o), b && (Rn(o, u), Rn(o, d), Fn(function () {
          Rn(o, f), Bn(o, u), x.cancelled || w || (Gn(C) ? setTimeout(x, C) : qn(o, l, x));
        })), v && v(o, x), b || w || x());
      }var o = t.elm;r(o._enterCb) && (o._enterCb.cancelled = !0, o._enterCb());var a = Mn(t.data.transition);if (i(a) || 1 !== o.nodeType) return e();if (!r(o._leaveCb)) {
        var s = a.css,
            l = a.type,
            u = a.leaveClass,
            f = a.leaveToClass,
            d = a.leaveActiveClass,
            h = a.beforeLeave,
            v = a.leave,
            m = a.afterLeave,
            g = a.leaveCancelled,
            y = a.delayLeave,
            _ = a.duration,
            b = !1 !== s && !Pi,
            w = Xn(v),
            C = p(c(_) ? _.leave : _),
            x = o._leaveCb = k(function () {
          o.parentNode && o.parentNode._pending && (o.parentNode._pending[t.key] = null), b && (Bn(o, f), Bn(o, d)), x.cancelled ? (b && Bn(o, u), g && g(o)) : (e(), m && m(o)), o._leaveCb = null;
        });y ? y(n) : n();
      }
    }function Gn(t) {
      return "number" == typeof t && !isNaN(t);
    }function Xn(t) {
      if (i(t)) return !1;var e = t.fns;return r(e) ? Xn(Array.isArray(e) ? e[0] : e) : (t._length || t.length) > 1;
    }function Yn(t, e) {
      !0 !== e.data.show && Wn(e);
    }function Zn(t, e, n) {
      Qn(t, e, n), (ji || Ni) && setTimeout(function () {
        Qn(t, e, n);
      }, 0);
    }function Qn(t, e, n) {
      var i = e.value,
          r = t.multiple;if (!r || Array.isArray(i)) {
        for (var o, a, s = 0, c = t.options.length; s < c; s++) {
          if (a = t.options[s], r) o = A(i, Jn(a)) > -1, a.selected !== o && (a.selected = o);else if (x(Jn(a), i)) return void (t.selectedIndex !== s && (t.selectedIndex = s));
        }r || (t.selectedIndex = -1);
      }
    }function Kn(t, e) {
      return e.every(function (e) {
        return !x(e, t);
      });
    }function Jn(t) {
      return "_value" in t ? t._value : t.value;
    }function ti(t) {
      t.target.composing = !0;
    }function ei(t) {
      t.target.composing && (t.target.composing = !1, ni(t.target, "input"));
    }function ni(t, e) {
      var n = document.createEvent("HTMLEvents");n.initEvent(e, !0, !0), t.dispatchEvent(n);
    }function ii(t) {
      return !t.componentInstance || t.data && t.data.transition ? t : ii(t.componentInstance._vnode);
    }function ri(t) {
      var e = t && t.componentOptions;return e && e.Ctor.options.abstract ? ri(Ct(e.children)) : t;
    }function oi(t) {
      var e = {},
          n = t.$options;for (var i in n.propsData) {
        e[i] = t[i];
      }var r = n._parentListeners;for (var o in r) {
        e[gi(o)] = r[o];
      }return e;
    }function ai(t, e) {
      if (/\d-keep-alive$/.test(e.tag)) return t("keep-alive", { props: e.componentOptions.propsData });
    }function si(t) {
      for (; t = t.parent;) {
        if (t.data.transition) return !0;
      }
    }function ci(t, e) {
      return e.key === t.key && e.tag === t.tag;
    }function li(t) {
      t.elm._moveCb && t.elm._moveCb(), t.elm._enterCb && t.elm._enterCb();
    }function ui(t) {
      t.data.newPos = t.elm.getBoundingClientRect();
    }function fi(t) {
      var e = t.data.pos,
          n = t.data.newPos,
          i = e.left - n.left,
          r = e.top - n.top;if (i || r) {
        t.data.moved = !0;var o = t.elm.style;o.transform = o.WebkitTransform = "translate(" + i + "px," + r + "px)", o.transitionDuration = "0s";
      }
    } /*!
      * Vue.js v2.5.9
      * (c) 2014-2017 Evan You
      * Released under the MIT License.
      */
    var di = Object.freeze({}),
        pi = Object.prototype.toString,
        hi = (h("slot,component", !0), h("key,ref,slot,slot-scope,is")),
        vi = Object.prototype.hasOwnProperty,
        mi = /-(\w)/g,
        gi = g(function (t) {
      return t.replace(mi, function (t, e) {
        return e ? e.toUpperCase() : "";
      });
    }),
        yi = g(function (t) {
      return t.charAt(0).toUpperCase() + t.slice(1);
    }),
        _i = /\B([A-Z])/g,
        bi = g(function (t) {
      return t.replace(_i, "-$1").toLowerCase();
    }),
        wi = function wi(t, e, n) {
      return !1;
    },
        Ci = function Ci(t) {
      return t;
    },
        xi = "data-server-rendered",
        Ai = ["component", "directive", "filter"],
        ki = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured"],
        Oi = { optionMergeStrategies: Object.create(null), silent: !1, productionTip: !1, devtools: !1, performance: !1, errorHandler: null, warnHandler: null, ignoredElements: [], keyCodes: Object.create(null), isReservedTag: wi, isReservedAttr: wi, isUnknownElement: wi, getTagNamespace: C, parsePlatformTagName: Ci, mustUseProp: wi, _lifecycleHooks: ki },
        Si = /[^\w.$]/,
        Ii = "__proto__" in {},
        Ti = "undefined" != typeof window,
        Di = "undefined" != typeof WXEnvironment && !!WXEnvironment.platform,
        Ei = Di && WXEnvironment.platform.toLowerCase(),
        $i = Ti && window.navigator.userAgent.toLowerCase(),
        ji = $i && /msie|trident/.test($i),
        Pi = $i && $i.indexOf("msie 9.0") > 0,
        Ni = $i && $i.indexOf("edge/") > 0,
        Li = $i && $i.indexOf("android") > 0 || "android" === Ei,
        Mi = $i && /iphone|ipad|ipod|ios/.test($i) || "ios" === Ei,
        Fi = ($i && /chrome\/\d+/.test($i), {}.watch),
        Ri = !1;if (Ti) try {
      var Bi = {};Object.defineProperty(Bi, "passive", { get: function get() {
          Ri = !0;
        } }), window.addEventListener("test-passive", null, Bi);
    } catch (t) {}var qi,
        zi,
        Ui = function Ui() {
      return void 0 === qi && (qi = !Ti && void 0 !== t && "server" === t.process.env.VUE_ENV), qi;
    },
        Hi = Ti && window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
        Wi = "undefined" != typeof Symbol && T(Symbol) && "undefined" != typeof Reflect && T(Reflect.ownKeys);zi = "undefined" != typeof Set && T(Set) ? Set : function () {
      function t() {
        this.set = Object.create(null);
      }return t.prototype.has = function (t) {
        return !0 === this.set[t];
      }, t.prototype.add = function (t) {
        this.set[t] = !0;
      }, t.prototype.clear = function () {
        this.set = Object.create(null);
      }, t;
    }();var Vi = C,
        Gi = 0,
        Xi = function Xi() {
      this.id = Gi++, this.subs = [];
    };Xi.prototype.addSub = function (t) {
      this.subs.push(t);
    }, Xi.prototype.removeSub = function (t) {
      v(this.subs, t);
    }, Xi.prototype.depend = function () {
      Xi.target && Xi.target.addDep(this);
    }, Xi.prototype.notify = function () {
      for (var t = this.subs.slice(), e = 0, n = t.length; e < n; e++) {
        t[e].update();
      }
    }, Xi.target = null;var Yi = [],
        Zi = function Zi(t, e, n, i, r, o, a, s) {
      this.tag = t, this.data = e, this.children = n, this.text = i, this.elm = r, this.ns = void 0, this.context = o, this.fnContext = void 0, this.fnOptions = void 0, this.fnScopeId = void 0, this.key = e && e.key, this.componentOptions = a, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = s, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1;
    },
        Qi = { child: { configurable: !0 } };Qi.child.get = function () {
      return this.componentInstance;
    }, Object.defineProperties(Zi.prototype, Qi);var Ki = function Ki(t) {
      void 0 === t && (t = "");var e = new Zi();return e.text = t, e.isComment = !0, e;
    },
        Ji = Array.prototype,
        tr = Object.create(Ji);["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (t) {
      var e = Ji[t];S(tr, t, function () {
        for (var n = [], i = arguments.length; i--;) {
          n[i] = arguments[i];
        }var r,
            o = e.apply(this, n),
            a = this.__ob__;switch (t) {case "push":case "unshift":
            r = n;break;case "splice":
            r = n.slice(2);}return r && a.observeArray(r), a.dep.notify(), o;
      });
    });var er = Object.getOwnPropertyNames(tr),
        nr = { shouldConvert: !0 },
        ir = function ir(t) {
      if (this.value = t, this.dep = new Xi(), this.vmCount = 0, S(t, "__ob__", this), Array.isArray(t)) {
        (Ii ? N : L)(t, tr, er), this.observeArray(t);
      } else this.walk(t);
    };ir.prototype.walk = function (t) {
      for (var e = Object.keys(t), n = 0; n < e.length; n++) {
        F(t, e[n], t[e[n]]);
      }
    }, ir.prototype.observeArray = function (t) {
      for (var e = 0, n = t.length; e < n; e++) {
        M(t[e]);
      }
    };var rr = Oi.optionMergeStrategies;rr.data = function (t, e, n) {
      return n ? U(t, e, n) : e && "function" != typeof e ? t : U(t, e);
    }, ki.forEach(function (t) {
      rr[t] = H;
    }), Ai.forEach(function (t) {
      rr[t + "s"] = W;
    }), rr.watch = function (t, e, n, i) {
      if (t === Fi && (t = void 0), e === Fi && (e = void 0), !e) return Object.create(t || null);if (!t) return e;var r = {};b(r, t);for (var o in e) {
        var a = r[o],
            s = e[o];a && !Array.isArray(a) && (a = [a]), r[o] = a ? a.concat(s) : Array.isArray(s) ? s : [s];
      }return r;
    }, rr.props = rr.methods = rr.inject = rr.computed = function (t, e, n, i) {
      if (!t) return e;var r = Object.create(null);return b(r, t), e && b(r, e), r;
    }, rr.provide = U;var or,
        ar,
        sr = function sr(t, e) {
      return void 0 === e ? t : e;
    },
        cr = [],
        lr = !1,
        ur = !1;if (void 0 !== n && T(n)) ar = function ar() {
      n(rt);
    };else if ("undefined" == typeof MessageChannel || !T(MessageChannel) && "[object MessageChannelConstructor]" !== MessageChannel.toString()) ar = function ar() {
      setTimeout(rt, 0);
    };else {
      var fr = new MessageChannel(),
          dr = fr.port2;fr.port1.onmessage = rt, ar = function ar() {
        dr.postMessage(1);
      };
    }if ("undefined" != typeof Promise && T(Promise)) {
      var pr = Promise.resolve();or = function or() {
        pr.then(rt), Mi && setTimeout(C);
      };
    } else or = ar;var hr,
        vr = new zi(),
        mr = g(function (t) {
      var e = "&" === t.charAt(0);t = e ? t.slice(1) : t;var n = "~" === t.charAt(0);t = n ? t.slice(1) : t;var i = "!" === t.charAt(0);return t = i ? t.slice(1) : t, { name: t, once: n, capture: i, passive: e };
    }),
        gr = null,
        yr = [],
        _r = [],
        br = {},
        wr = !1,
        Cr = !1,
        xr = 0,
        Ar = 0,
        kr = function kr(t, e, n, i, r) {
      this.vm = t, r && (t._watcher = this), t._watchers.push(this), i ? (this.deep = !!i.deep, this.user = !!i.user, this.lazy = !!i.lazy, this.sync = !!i.sync) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = n, this.id = ++Ar, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new zi(), this.newDepIds = new zi(), this.expression = "", "function" == typeof e ? this.getter = e : (this.getter = I(e), this.getter || (this.getter = function () {})), this.value = this.lazy ? void 0 : this.get();
    };kr.prototype.get = function () {
      D(this);var t,
          e = this.vm;try {
        t = this.getter.call(e, e);
      } catch (t) {
        if (!this.user) throw t;et(t, e, 'getter for watcher "' + this.expression + '"');
      } finally {
        this.deep && st(t), E(), this.cleanupDeps();
      }return t;
    }, kr.prototype.addDep = function (t) {
      var e = t.id;this.newDepIds.has(e) || (this.newDepIds.add(e), this.newDeps.push(t), this.depIds.has(e) || t.addSub(this));
    }, kr.prototype.cleanupDeps = function () {
      for (var t = this, e = this.deps.length; e--;) {
        var n = t.deps[e];t.newDepIds.has(n.id) || n.removeSub(t);
      }var i = this.depIds;this.depIds = this.newDepIds, this.newDepIds = i, this.newDepIds.clear(), i = this.deps, this.deps = this.newDeps, this.newDeps = i, this.newDeps.length = 0;
    }, kr.prototype.update = function () {
      this.lazy ? this.dirty = !0 : this.sync ? this.run() : zt(this);
    }, kr.prototype.run = function () {
      if (this.active) {
        var t = this.get();if (t !== this.value || c(t) || this.deep) {
          var e = this.value;if (this.value = t, this.user) try {
            this.cb.call(this.vm, t, e);
          } catch (t) {
            et(t, this.vm, 'callback for watcher "' + this.expression + '"');
          } else this.cb.call(this.vm, t, e);
        }
      }
    }, kr.prototype.evaluate = function () {
      this.value = this.get(), this.dirty = !1;
    }, kr.prototype.depend = function () {
      for (var t = this, e = this.deps.length; e--;) {
        t.deps[e].depend();
      }
    }, kr.prototype.teardown = function () {
      var t = this;if (this.active) {
        this.vm._isBeingDestroyed || v(this.vm._watchers, this);for (var e = this.deps.length; e--;) {
          t.deps[e].removeSub(t);
        }this.active = !1;
      }
    };var Or = { enumerable: !0, configurable: !0, get: C, set: C },
        Sr = { lazy: !0 };pe(he.prototype);var Ir = { init: function init(t, e, n, i) {
        if (!t.componentInstance || t.componentInstance._isDestroyed) {
          (t.componentInstance = ye(t, gr, n, i)).$mount(e ? t.elm : void 0, e);
        } else if (t.data.keepAlive) {
          var r = t;Ir.prepatch(r, r);
        }
      }, prepatch: function prepatch(t, e) {
        var n = e.componentOptions;$t(e.componentInstance = t.componentInstance, n.propsData, n.listeners, e, n.children);
      }, insert: function insert(t) {
        var e = t.context,
            n = t.componentInstance;n._isMounted || (n._isMounted = !0, Lt(n, "mounted")), t.data.keepAlive && (e._isMounted ? Bt(n) : Pt(n, !0));
      }, destroy: function destroy(t) {
        var e = t.componentInstance;e._isDestroyed || (t.data.keepAlive ? Nt(e, !0) : e.$destroy());
      } },
        Tr = Object.keys(Ir),
        Dr = 1,
        Er = 2,
        $r = 0;!function (t) {
      t.prototype._init = function (t) {
        var e = this;e._uid = $r++, e._isVue = !0, t && t._isComponent ? Oe(e, t) : e.$options = Y(Se(e.constructor), t || {}, e), e._renderProxy = e, e._self = e, Dt(e), xt(e), ke(e), Lt(e, "beforeCreate"), ee(e), Ht(e), te(e), Lt(e, "created"), e.$options.el && e.$mount(e.$options.el);
      };
    }(De), function (t) {
      var e = {};e.get = function () {
        return this._data;
      };var n = {};n.get = function () {
        return this._props;
      }, Object.defineProperty(t.prototype, "$data", e), Object.defineProperty(t.prototype, "$props", n), t.prototype.$set = R, t.prototype.$delete = B, t.prototype.$watch = function (t, e, n) {
        var i = this;if (l(e)) return Jt(i, t, e, n);n = n || {}, n.user = !0;var r = new kr(i, t, e, n);return n.immediate && e.call(i, r.value), function () {
          r.teardown();
        };
      };
    }(De), function (t) {
      var e = /^hook:/;t.prototype.$on = function (t, n) {
        var i = this,
            r = this;if (Array.isArray(t)) for (var o = 0, a = t.length; o < a; o++) {
          i.$on(t[o], n);
        } else (r._events[t] || (r._events[t] = [])).push(n), e.test(t) && (r._hasHookEvent = !0);return r;
      }, t.prototype.$once = function (t, e) {
        function n() {
          i.$off(t, n), e.apply(i, arguments);
        }var i = this;return n.fn = e, i.$on(t, n), i;
      }, t.prototype.$off = function (t, e) {
        var n = this,
            i = this;if (!arguments.length) return i._events = Object.create(null), i;if (Array.isArray(t)) {
          for (var r = 0, o = t.length; r < o; r++) {
            n.$off(t[r], e);
          }return i;
        }var a = i._events[t];if (!a) return i;if (!e) return i._events[t] = null, i;if (e) for (var s, c = a.length; c--;) {
          if ((s = a[c]) === e || s.fn === e) {
            a.splice(c, 1);break;
          }
        }return i;
      }, t.prototype.$emit = function (t) {
        var e = this,
            n = e._events[t];if (n) {
          n = n.length > 1 ? _(n) : n;for (var i = _(arguments, 1), r = 0, o = n.length; r < o; r++) {
            try {
              n[r].apply(e, i);
            } catch (n) {
              et(n, e, 'event handler for "' + t + '"');
            }
          }
        }return e;
      };
    }(De), function (t) {
      t.prototype._update = function (t, e) {
        var n = this;n._isMounted && Lt(n, "beforeUpdate");var i = n.$el,
            r = n._vnode,
            o = gr;gr = n, n._vnode = t, r ? n.$el = n.__patch__(r, t) : (n.$el = n.__patch__(n.$el, t, e, !1, n.$options._parentElm, n.$options._refElm), n.$options._parentElm = n.$options._refElm = null), gr = o, i && (i.__vue__ = null), n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el);
      }, t.prototype.$forceUpdate = function () {
        var t = this;t._watcher && t._watcher.update();
      }, t.prototype.$destroy = function () {
        var t = this;if (!t._isBeingDestroyed) {
          Lt(t, "beforeDestroy"), t._isBeingDestroyed = !0;var e = t.$parent;!e || e._isBeingDestroyed || t.$options.abstract || v(e.$children, t), t._watcher && t._watcher.teardown();for (var n = t._watchers.length; n--;) {
            t._watchers[n].teardown();
          }t._data.__ob__ && t._data.__ob__.vmCount--, t._isDestroyed = !0, t.__patch__(t._vnode, null), Lt(t, "destroyed"), t.$off(), t.$el && (t.$el.__vue__ = null), t.$vnode && (t.$vnode.parent = null);
        }
      };
    }(De), function (t) {
      pe(t.prototype), t.prototype.$nextTick = function (t) {
        return at(t, this);
      }, t.prototype._render = function () {
        var t = this,
            e = t.$options,
            n = e.render,
            i = e._parentVnode;if (t._isMounted) for (var r in t.$slots) {
          var o = t.$slots[r];(o._rendered || o[0] && o[0].elm) && (t.$slots[r] = P(o, !0));
        }t.$scopedSlots = i && i.data.scopedSlots || di, t.$vnode = i;var a;try {
          a = n.call(t._renderProxy, t.$createElement);
        } catch (e) {
          et(e, t, "render"), a = t._vnode;
        }return a instanceof Zi || (a = Ki()), a.parent = i, a;
      };
    }(De);var jr = [String, RegExp, Array],
        Pr = { name: "keep-alive", abstract: !0, props: { include: jr, exclude: jr, max: [String, Number] }, created: function created() {
        this.cache = Object.create(null), this.keys = [];
      }, destroyed: function destroyed() {
        var t = this;for (var e in t.cache) {
          Be(t.cache, e, t.keys);
        }
      }, watch: { include: function include(t) {
          Re(this, function (e) {
            return Fe(t, e);
          });
        }, exclude: function exclude(t) {
          Re(this, function (e) {
            return !Fe(t, e);
          });
        } }, render: function render() {
        var t = this.$slots.default,
            e = Ct(t),
            n = e && e.componentOptions;if (n) {
          var i = Me(n),
              r = this,
              o = r.include,
              a = r.exclude;if (o && (!i || !Fe(o, i)) || a && i && Fe(a, i)) return e;var s = this,
              c = s.cache,
              l = s.keys,
              u = null == e.key ? n.Ctor.cid + (n.tag ? "::" + n.tag : "") : e.key;c[u] ? (e.componentInstance = c[u].componentInstance, v(l, u), l.push(u)) : (c[u] = e, l.push(u), this.max && l.length > parseInt(this.max) && Be(c, l[0], l, this._vnode)), e.data.keepAlive = !0;
        }return e || t && t[0];
      } },
        Nr = { KeepAlive: Pr };!function (t) {
      var e = {};e.get = function () {
        return Oi;
      }, Object.defineProperty(t, "config", e), t.util = { warn: Vi, extend: b, mergeOptions: Y, defineReactive: F }, t.set = R, t.delete = B, t.nextTick = at, t.options = Object.create(null), Ai.forEach(function (e) {
        t.options[e + "s"] = Object.create(null);
      }), t.options._base = t, b(t.options.components, Nr), Ee(t), $e(t), je(t), Le(t);
    }(De), Object.defineProperty(De.prototype, "$isServer", { get: Ui }), Object.defineProperty(De.prototype, "$ssrContext", { get: function get() {
        return this.$vnode && this.$vnode.ssrContext;
      } }), De.version = "2.5.9";var Lr,
        Mr,
        Fr = h("style,class"),
        Rr = h("input,textarea,option,select,progress"),
        Br = function Br(t, e, n) {
      return "value" === n && Rr(t) && "button" !== e || "selected" === n && "option" === t || "checked" === n && "input" === t || "muted" === n && "video" === t;
    },
        qr = h("contenteditable,draggable,spellcheck"),
        zr = h("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),
        Ur = "http://www.w3.org/1999/xlink",
        Hr = function Hr(t) {
      return ":" === t.charAt(5) && "xlink" === t.slice(0, 5);
    },
        Wr = function Wr(t) {
      return Hr(t) ? t.slice(6, t.length) : "";
    },
        Vr = function Vr(t) {
      return null == t || !1 === t;
    },
        Gr = { svg: "http://www.w3.org/2000/svg", math: "http://www.w3.org/1998/Math/MathML" },
        Xr = h("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),
        Yr = h("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0),
        Zr = function Zr(t) {
      return Xr(t) || Yr(t);
    },
        Qr = Object.create(null),
        Kr = h("text,number,password,search,email,tel,url"),
        Jr = Object.freeze({ createElement: Qe, createElementNS: Ke, createTextNode: Je, createComment: tn, insertBefore: en, removeChild: nn, appendChild: rn, parentNode: on, nextSibling: an, tagName: sn, setTextContent: cn, setAttribute: ln }),
        to = { create: function create(t, e) {
        un(e);
      }, update: function update(t, e) {
        t.data.ref !== e.data.ref && (un(t, !0), un(e));
      }, destroy: function destroy(t) {
        un(t, !0);
      } },
        eo = new Zi("", {}, []),
        no = ["create", "activate", "update", "remove", "destroy"],
        io = { create: hn, update: hn, destroy: function destroy(t) {
        hn(t, eo);
      } },
        ro = Object.create(null),
        oo = [to, io],
        ao = { create: _n, update: _n },
        so = { create: wn, update: wn },
        co = "__r",
        lo = "__c",
        uo = { create: On, update: On },
        fo = { create: Sn, update: Sn },
        po = g(function (t) {
      var e = {},
          n = /;(?![^(]*\))/g,
          i = /:(.+)/;return t.split(n).forEach(function (t) {
        if (t) {
          var n = t.split(i);n.length > 1 && (e[n[0].trim()] = n[1].trim());
        }
      }), e;
    }),
        ho = /^--/,
        vo = /\s*!important$/,
        mo = function mo(t, e, n) {
      if (ho.test(e)) t.style.setProperty(e, n);else if (vo.test(n)) t.style.setProperty(e, n.replace(vo, ""), "important");else {
        var i = yo(e);if (Array.isArray(n)) for (var r = 0, o = n.length; r < o; r++) {
          t.style[i] = n[r];
        } else t.style[i] = n;
      }
    },
        go = ["Webkit", "Moz", "ms"],
        yo = g(function (t) {
      if (Mr = Mr || document.createElement("div").style, "filter" !== (t = gi(t)) && t in Mr) return t;for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < go.length; n++) {
        var i = go[n] + e;if (i in Mr) return i;
      }
    }),
        _o = { create: Pn, update: Pn },
        bo = g(function (t) {
      return { enterClass: t + "-enter", enterToClass: t + "-enter-to", enterActiveClass: t + "-enter-active", leaveClass: t + "-leave", leaveToClass: t + "-leave-to", leaveActiveClass: t + "-leave-active" };
    }),
        wo = Ti && !Pi,
        Co = "transition",
        xo = "animation",
        Ao = "transition",
        ko = "transitionend",
        Oo = "animation",
        So = "animationend";wo && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (Ao = "WebkitTransition", ko = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (Oo = "WebkitAnimation", So = "webkitAnimationEnd"));var Io = Ti ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function (t) {
      return t();
    },
        To = /\b(transform|all)(,|$)/,
        Do = Ti ? { create: Yn, activate: Yn, remove: function remove(t, e) {
        !0 !== t.data.show ? Vn(t, e) : e();
      } } : {},
        Eo = [ao, so, uo, fo, _o, Do],
        $o = Eo.concat(oo),
        jo = function (t) {
      function e(t) {
        return new Zi(E.tagName(t).toLowerCase(), {}, [], void 0, t);
      }function n(t, e) {
        function n() {
          0 == --n.listeners && a(t);
        }return n.listeners = e, n;
      }function a(t) {
        var e = E.parentNode(t);r(e) && E.removeChild(e, t);
      }function c(t, e, n, i, a) {
        if (t.isRootInsert = !a, !l(t, e, n, i)) {
          var s = t.data,
              c = t.children,
              u = t.tag;r(u) ? (t.elm = t.ns ? E.createElementNS(t.ns, u) : E.createElement(u, t), g(t), p(t, c, e), r(s) && m(t, e), d(n, t.elm, i)) : o(t.isComment) ? (t.elm = E.createComment(t.text), d(n, t.elm, i)) : (t.elm = E.createTextNode(t.text), d(n, t.elm, i));
        }
      }function l(t, e, n, i) {
        var a = t.data;if (r(a)) {
          var s = r(t.componentInstance) && a.keepAlive;if (r(a = a.hook) && r(a = a.init) && a(t, !1, n, i), r(t.componentInstance)) return u(t, e), o(s) && f(t, e, n, i), !0;
        }
      }function u(t, e) {
        r(t.data.pendingInsert) && (e.push.apply(e, t.data.pendingInsert), t.data.pendingInsert = null), t.elm = t.componentInstance.$el, v(t) ? (m(t, e), g(t)) : (un(t), e.push(t));
      }function f(t, e, n, i) {
        for (var o, a = t; a.componentInstance;) {
          if (a = a.componentInstance._vnode, r(o = a.data) && r(o = o.transition)) {
            for (o = 0; o < T.activate.length; ++o) {
              T.activate[o](eo, a);
            }e.push(a);break;
          }
        }d(n, t.elm, i);
      }function d(t, e, n) {
        r(t) && (r(n) ? n.parentNode === t && E.insertBefore(t, e, n) : E.appendChild(t, e));
      }function p(t, e, n) {
        if (Array.isArray(e)) for (var i = 0; i < e.length; ++i) {
          c(e[i], n, t.elm, null, !0);
        } else s(t.text) && E.appendChild(t.elm, E.createTextNode(t.text));
      }function v(t) {
        for (; t.componentInstance;) {
          t = t.componentInstance._vnode;
        }return r(t.tag);
      }function m(t, e) {
        for (var n = 0; n < T.create.length; ++n) {
          T.create[n](eo, t);
        }S = t.data.hook, r(S) && (r(S.create) && S.create(eo, t), r(S.insert) && e.push(t));
      }function g(t) {
        var e;if (r(e = t.fnScopeId)) E.setAttribute(t.elm, e, "");else for (var n = t; n;) {
          r(e = n.context) && r(e = e.$options._scopeId) && E.setAttribute(t.elm, e, ""), n = n.parent;
        }r(e = gr) && e !== t.context && e !== t.fnContext && r(e = e.$options._scopeId) && E.setAttribute(t.elm, e, "");
      }function y(t, e, n, i, r, o) {
        for (; i <= r; ++i) {
          c(n[i], o, t, e);
        }
      }function _(t) {
        var e,
            n,
            i = t.data;if (r(i)) for (r(e = i.hook) && r(e = e.destroy) && e(t), e = 0; e < T.destroy.length; ++e) {
          T.destroy[e](t);
        }if (r(e = t.children)) for (n = 0; n < t.children.length; ++n) {
          _(t.children[n]);
        }
      }function b(t, e, n, i) {
        for (; n <= i; ++n) {
          var o = e[n];r(o) && (r(o.tag) ? (w(o), _(o)) : a(o.elm));
        }
      }function w(t, e) {
        if (r(e) || r(t.data)) {
          var i,
              o = T.remove.length + 1;for (r(e) ? e.listeners += o : e = n(t.elm, o), r(i = t.componentInstance) && r(i = i._vnode) && r(i.data) && w(i, e), i = 0; i < T.remove.length; ++i) {
            T.remove[i](t, e);
          }r(i = t.data.hook) && r(i = i.remove) ? i(t, e) : e();
        } else a(t.elm);
      }function C(t, e, n, o, a) {
        for (var s, l, u, f, d = 0, p = 0, h = e.length - 1, v = e[0], m = e[h], g = n.length - 1, _ = n[0], w = n[g], C = !a; d <= h && p <= g;) {
          i(v) ? v = e[++d] : i(m) ? m = e[--h] : fn(v, _) ? (A(v, _, o), v = e[++d], _ = n[++p]) : fn(m, w) ? (A(m, w, o), m = e[--h], w = n[--g]) : fn(v, w) ? (A(v, w, o), C && E.insertBefore(t, v.elm, E.nextSibling(m.elm)), v = e[++d], w = n[--g]) : fn(m, _) ? (A(m, _, o), C && E.insertBefore(t, m.elm, v.elm), m = e[--h], _ = n[++p]) : (i(s) && (s = pn(e, d, h)), l = r(_.key) ? s[_.key] : x(_, e, d, h), i(l) ? c(_, o, t, v.elm) : (u = e[l], fn(u, _) ? (A(u, _, o), e[l] = void 0, C && E.insertBefore(t, u.elm, v.elm)) : c(_, o, t, v.elm)), _ = n[++p]);
        }d > h ? (f = i(n[g + 1]) ? null : n[g + 1].elm, y(t, f, n, p, g, o)) : p > g && b(t, e, d, h);
      }function x(t, e, n, i) {
        for (var o = n; o < i; o++) {
          var a = e[o];if (r(a) && fn(t, a)) return o;
        }
      }function A(t, e, n, a) {
        if (t !== e) {
          var s = e.elm = t.elm;if (o(t.isAsyncPlaceholder)) return void (r(e.asyncFactory.resolved) ? O(t.elm, e, n) : e.isAsyncPlaceholder = !0);if (o(e.isStatic) && o(t.isStatic) && e.key === t.key && (o(e.isCloned) || o(e.isOnce))) return void (e.componentInstance = t.componentInstance);var c,
              l = e.data;r(l) && r(c = l.hook) && r(c = c.prepatch) && c(t, e);var u = t.children,
              f = e.children;if (r(l) && v(e)) {
            for (c = 0; c < T.update.length; ++c) {
              T.update[c](t, e);
            }r(c = l.hook) && r(c = c.update) && c(t, e);
          }i(e.text) ? r(u) && r(f) ? u !== f && C(s, u, f, n, a) : r(f) ? (r(t.text) && E.setTextContent(s, ""), y(s, null, f, 0, f.length - 1, n)) : r(u) ? b(s, u, 0, u.length - 1) : r(t.text) && E.setTextContent(s, "") : t.text !== e.text && E.setTextContent(s, e.text), r(l) && r(c = l.hook) && r(c = c.postpatch) && c(t, e);
        }
      }function k(t, e, n) {
        if (o(n) && r(t.parent)) t.parent.data.pendingInsert = e;else for (var i = 0; i < e.length; ++i) {
          e[i].data.hook.insert(e[i]);
        }
      }function O(t, e, n, i) {
        var a,
            s = e.tag,
            c = e.data,
            l = e.children;if (i = i || c && c.pre, e.elm = t, o(e.isComment) && r(e.asyncFactory)) return e.isAsyncPlaceholder = !0, !0;if (r(c) && (r(a = c.hook) && r(a = a.init) && a(e, !0), r(a = e.componentInstance))) return u(e, n), !0;if (r(s)) {
          if (r(l)) if (t.hasChildNodes()) {
            if (r(a = c) && r(a = a.domProps) && r(a = a.innerHTML)) {
              if (a !== t.innerHTML) return !1;
            } else {
              for (var f = !0, d = t.firstChild, h = 0; h < l.length; h++) {
                if (!d || !O(d, l[h], n, i)) {
                  f = !1;break;
                }d = d.nextSibling;
              }if (!f || d) return !1;
            }
          } else p(e, l, n);if (r(c)) {
            var v = !1;for (var g in c) {
              if (!$(g)) {
                v = !0, m(e, n);break;
              }
            }!v && c.class && st(c.class);
          }
        } else t.data !== e.text && (t.data = e.text);return !0;
      }var S,
          I,
          T = {},
          D = t.modules,
          E = t.nodeOps;for (S = 0; S < no.length; ++S) {
        for (T[no[S]] = [], I = 0; I < D.length; ++I) {
          r(D[I][no[S]]) && T[no[S]].push(D[I][no[S]]);
        }
      }var $ = h("attrs,class,staticClass,staticStyle,key");return function (t, n, a, s, l, u) {
        if (i(n)) return void (r(t) && _(t));var f = !1,
            d = [];if (i(t)) f = !0, c(n, d, l, u);else {
          var p = r(t.nodeType);if (!p && fn(t, n)) A(t, n, d, s);else {
            if (p) {
              if (1 === t.nodeType && t.hasAttribute(xi) && (t.removeAttribute(xi), a = !0), o(a) && O(t, n, d)) return k(n, d, !0), t;t = e(t);
            }var h = t.elm,
                m = E.parentNode(h);if (c(n, d, h._leaveCb ? null : m, E.nextSibling(h)), r(n.parent)) for (var g = n.parent, y = v(n); g;) {
              for (var w = 0; w < T.destroy.length; ++w) {
                T.destroy[w](g);
              }if (g.elm = n.elm, y) {
                for (var C = 0; C < T.create.length; ++C) {
                  T.create[C](eo, g);
                }var x = g.data.hook.insert;if (x.merged) for (var S = 1; S < x.fns.length; S++) {
                  x.fns[S]();
                }
              } else un(g);g = g.parent;
            }r(m) ? b(m, [t], 0, 0) : r(t.tag) && _(t);
          }
        }return k(n, d, f), n.elm;
      };
    }({ nodeOps: Jr, modules: $o });Pi && document.addEventListener("selectionchange", function () {
      var t = document.activeElement;t && t.vmodel && ni(t, "input");
    });var Po = { inserted: function inserted(t, e, n, i) {
        "select" === n.tag ? (i.elm && !i.elm._vOptions ? ft(n, "postpatch", function () {
          Po.componentUpdated(t, e, n);
        }) : Zn(t, e, n.context), t._vOptions = [].map.call(t.options, Jn)) : ("textarea" === n.tag || Kr(t.type)) && (t._vModifiers = e.modifiers, e.modifiers.lazy || (t.addEventListener("change", ei), Li || (t.addEventListener("compositionstart", ti), t.addEventListener("compositionend", ei)), Pi && (t.vmodel = !0)));
      }, componentUpdated: function componentUpdated(t, e, n) {
        if ("select" === n.tag) {
          Zn(t, e, n.context);var i = t._vOptions,
              r = t._vOptions = [].map.call(t.options, Jn);if (r.some(function (t, e) {
            return !x(t, i[e]);
          })) {
            (t.multiple ? e.value.some(function (t) {
              return Kn(t, r);
            }) : e.value !== e.oldValue && Kn(e.value, r)) && ni(t, "change");
          }
        }
      } },
        No = { bind: function bind(t, e, n) {
        var i = e.value;n = ii(n);var r = n.data && n.data.transition,
            o = t.__vOriginalDisplay = "none" === t.style.display ? "" : t.style.display;i && r ? (n.data.show = !0, Wn(n, function () {
          t.style.display = o;
        })) : t.style.display = i ? o : "none";
      }, update: function update(t, e, n) {
        var i = e.value;i !== e.oldValue && (n = ii(n), n.data && n.data.transition ? (n.data.show = !0, i ? Wn(n, function () {
          t.style.display = t.__vOriginalDisplay;
        }) : Vn(n, function () {
          t.style.display = "none";
        })) : t.style.display = i ? t.__vOriginalDisplay : "none");
      }, unbind: function unbind(t, e, n, i, r) {
        r || (t.style.display = t.__vOriginalDisplay);
      } },
        Lo = { model: Po, show: No },
        Mo = { name: String, appear: Boolean, css: Boolean, mode: String, type: String, enterClass: String, leaveClass: String, enterToClass: String, leaveToClass: String, enterActiveClass: String, leaveActiveClass: String, appearClass: String, appearActiveClass: String, appearToClass: String, duration: [Number, String, Object] },
        Fo = { name: "transition", props: Mo, abstract: !0, render: function render(t) {
        var e = this,
            n = this.$slots.default;if (n && (n = n.filter(function (t) {
          return t.tag || wt(t);
        }), n.length)) {
          var i = this.mode,
              r = n[0];if (si(this.$vnode)) return r;var o = ri(r);if (!o) return r;if (this._leaving) return ai(t, r);var a = "__transition-" + this._uid + "-";o.key = null == o.key ? o.isComment ? a + "comment" : a + o.tag : s(o.key) ? 0 === String(o.key).indexOf(a) ? o.key : a + o.key : o.key;var c = (o.data || (o.data = {})).transition = oi(this),
              l = this._vnode,
              u = ri(l);if (o.data.directives && o.data.directives.some(function (t) {
            return "show" === t.name;
          }) && (o.data.show = !0), u && u.data && !ci(o, u) && !wt(u) && (!u.componentInstance || !u.componentInstance._vnode.isComment)) {
            var f = u.data.transition = b({}, c);if ("out-in" === i) return this._leaving = !0, ft(f, "afterLeave", function () {
              e._leaving = !1, e.$forceUpdate();
            }), ai(t, r);if ("in-out" === i) {
              if (wt(o)) return l;var d,
                  p = function p() {
                d();
              };ft(c, "afterEnter", p), ft(c, "enterCancelled", p), ft(f, "delayLeave", function (t) {
                d = t;
              });
            }
          }return r;
        }
      } },
        Ro = b({ tag: String, moveClass: String }, Mo);delete Ro.mode;var Bo = { props: Ro, render: function render(t) {
        for (var e = this.tag || this.$vnode.data.tag || "span", n = Object.create(null), i = this.prevChildren = this.children, r = this.$slots.default || [], o = this.children = [], a = oi(this), s = 0; s < r.length; s++) {
          var c = r[s];if (c.tag) if (null != c.key && 0 !== String(c.key).indexOf("__vlist")) o.push(c), n[c.key] = c, (c.data || (c.data = {})).transition = a;else ;
        }if (i) {
          for (var l = [], u = [], f = 0; f < i.length; f++) {
            var d = i[f];d.data.transition = a, d.data.pos = d.elm.getBoundingClientRect(), n[d.key] ? l.push(d) : u.push(d);
          }this.kept = t(e, null, l), this.removed = u;
        }return t(e, null, o);
      }, beforeUpdate: function beforeUpdate() {
        this.__patch__(this._vnode, this.kept, !1, !0), this._vnode = this.kept;
      }, updated: function updated() {
        var t = this.prevChildren,
            e = this.moveClass || (this.name || "v") + "-move";t.length && this.hasMove(t[0].elm, e) && (t.forEach(li), t.forEach(ui), t.forEach(fi), this._reflow = document.body.offsetHeight, t.forEach(function (t) {
          if (t.data.moved) {
            var n = t.elm,
                i = n.style;Rn(n, e), i.transform = i.WebkitTransform = i.transitionDuration = "", n.addEventListener(ko, n._moveCb = function t(i) {
              i && !/transform$/.test(i.propertyName) || (n.removeEventListener(ko, t), n._moveCb = null, Bn(n, e));
            });
          }
        }));
      }, methods: { hasMove: function hasMove(t, e) {
          if (!wo) return !1;if (this._hasMove) return this._hasMove;var n = t.cloneNode();t._transitionClasses && t._transitionClasses.forEach(function (t) {
            Ln(n, t);
          }), Nn(n, e), n.style.display = "none", this.$el.appendChild(n);var i = zn(n);return this.$el.removeChild(n), this._hasMove = i.hasTransform;
        } } },
        qo = { Transition: Fo, TransitionGroup: Bo };De.config.mustUseProp = Br, De.config.isReservedTag = Zr, De.config.isReservedAttr = Fr, De.config.getTagNamespace = Xe, De.config.isUnknownElement = Ye, b(De.options.directives, Lo), b(De.options.components, qo), De.prototype.__patch__ = Ti ? jo : C, De.prototype.$mount = function (t, e) {
      return t = t && Ti ? Ze(t) : void 0, Et(this, t, e);
    }, De.nextTick(function () {
      Oi.devtools && Hi && Hi.emit("init", De);
    }, 0), e.a = De;
  }).call(e, n(2), n(41).setImmediate);
}, function (t, e, n) {
  t.exports = n(15);
}, function (t, e, n) {
  "use strict";
  function i(t) {
    var e = new a(t),
        n = o(a.prototype.request, e);return r.extend(n, a.prototype, e), r.extend(n, e), n;
  }var r = n(0),
      o = n(7),
      a = n(17),
      s = n(1),
      c = i(s);c.Axios = a, c.create = function (t) {
    return i(r.merge(s, t));
  }, c.Cancel = n(4), c.CancelToken = n(16), c.isCancel = n(5), c.all = function (t) {
    return Promise.all(t);
  }, c.spread = n(31), t.exports = c, t.exports.default = c;
}, function (t, e, n) {
  "use strict";
  function i(t) {
    if ("function" != typeof t) throw new TypeError("executor must be a function.");var e;this.promise = new Promise(function (t) {
      e = t;
    });var n = this;t(function (t) {
      n.reason || (n.reason = new r(t), e(n.reason));
    });
  }var r = n(4);i.prototype.throwIfRequested = function () {
    if (this.reason) throw this.reason;
  }, i.source = function () {
    var t;return { token: new i(function (e) {
        t = e;
      }), cancel: t };
  }, t.exports = i;
}, function (t, e, n) {
  "use strict";
  function i(t) {
    this.defaults = t, this.interceptors = { request: new a(), response: new a() };
  }var r = n(1),
      o = n(0),
      a = n(18),
      s = n(19);i.prototype.request = function (t) {
    "string" == typeof t && (t = o.merge({ url: arguments[0] }, arguments[1])), t = o.merge(r, this.defaults, { method: "get" }, t), t.method = t.method.toLowerCase();var e = [s, void 0],
        n = Promise.resolve(t);for (this.interceptors.request.forEach(function (t) {
      e.unshift(t.fulfilled, t.rejected);
    }), this.interceptors.response.forEach(function (t) {
      e.push(t.fulfilled, t.rejected);
    }); e.length;) {
      n = n.then(e.shift(), e.shift());
    }return n;
  }, o.forEach(["delete", "get", "head", "options"], function (t) {
    i.prototype[t] = function (e, n) {
      return this.request(o.merge(n || {}, { method: t, url: e }));
    };
  }), o.forEach(["post", "put", "patch"], function (t) {
    i.prototype[t] = function (e, n, i) {
      return this.request(o.merge(i || {}, { method: t, url: e, data: n }));
    };
  }), t.exports = i;
}, function (t, e, n) {
  "use strict";
  function i() {
    this.handlers = [];
  }var r = n(0);i.prototype.use = function (t, e) {
    return this.handlers.push({ fulfilled: t, rejected: e }), this.handlers.length - 1;
  }, i.prototype.eject = function (t) {
    this.handlers[t] && (this.handlers[t] = null);
  }, i.prototype.forEach = function (t) {
    r.forEach(this.handlers, function (e) {
      null !== e && t(e);
    });
  }, t.exports = i;
}, function (t, e, n) {
  "use strict";
  function i(t) {
    t.cancelToken && t.cancelToken.throwIfRequested();
  }var r = n(0),
      o = n(22),
      a = n(5),
      s = n(1),
      c = n(27),
      l = n(25);t.exports = function (t) {
    return i(t), t.baseURL && !c(t.url) && (t.url = l(t.baseURL, t.url)), t.headers = t.headers || {}, t.data = o(t.data, t.headers, t.transformRequest), t.headers = r.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers || {}), r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (e) {
      delete t.headers[e];
    }), (t.adapter || s.adapter)(t).then(function (e) {
      return i(t), e.data = o(e.data, e.headers, t.transformResponse), e;
    }, function (e) {
      return a(e) || (i(t), e && e.response && (e.response.data = o(e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e);
    });
  };
}, function (t, e, n) {
  "use strict";
  t.exports = function (t, e, n, i, r) {
    return t.config = e, n && (t.code = n), t.request = i, t.response = r, t;
  };
}, function (t, e, n) {
  "use strict";
  var i = n(6);t.exports = function (t, e, n) {
    var r = n.config.validateStatus;n.status && r && !r(n.status) ? e(i("Request failed with status code " + n.status, n.config, null, n.request, n)) : t(n);
  };
}, function (t, e, n) {
  "use strict";
  var i = n(0);t.exports = function (t, e, n) {
    return i.forEach(n, function (n) {
      t = n(t, e);
    }), t;
  };
}, function (t, e, n) {
  "use strict";
  function i() {
    this.message = "String contains an invalid character";
  }function r(t) {
    for (var e, n, r = String(t), a = "", s = 0, c = o; r.charAt(0 | s) || (c = "=", s % 1); a += c.charAt(63 & e >> 8 - s % 1 * 8)) {
      if ((n = r.charCodeAt(s += .75)) > 255) throw new i();e = e << 8 | n;
    }return a;
  }var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";i.prototype = new Error(), i.prototype.code = 5, i.prototype.name = "InvalidCharacterError", t.exports = r;
}, function (t, e, n) {
  "use strict";
  function i(t) {
    return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }var r = n(0);t.exports = function (t, e, n) {
    if (!e) return t;var o;if (n) o = n(e);else if (r.isURLSearchParams(e)) o = e.toString();else {
      var a = [];r.forEach(e, function (t, e) {
        null !== t && void 0 !== t && (r.isArray(t) && (e += "[]"), r.isArray(t) || (t = [t]), r.forEach(t, function (t) {
          r.isDate(t) ? t = t.toISOString() : r.isObject(t) && (t = JSON.stringify(t)), a.push(i(e) + "=" + i(t));
        }));
      }), o = a.join("&");
    }return o && (t += (-1 === t.indexOf("?") ? "?" : "&") + o), t;
  };
}, function (t, e, n) {
  "use strict";
  t.exports = function (t, e) {
    return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
  };
}, function (t, e, n) {
  "use strict";
  var i = n(0);t.exports = i.isStandardBrowserEnv() ? function () {
    return { write: function write(t, e, n, r, o, a) {
        var s = [];s.push(t + "=" + encodeURIComponent(e)), i.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), i.isString(r) && s.push("path=" + r), i.isString(o) && s.push("domain=" + o), !0 === a && s.push("secure"), document.cookie = s.join("; ");
      }, read: function read(t) {
        var e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));return e ? decodeURIComponent(e[3]) : null;
      }, remove: function remove(t) {
        this.write(t, "", Date.now() - 864e5);
      } };
  }() : function () {
    return { write: function write() {}, read: function read() {
        return null;
      }, remove: function remove() {} };
  }();
}, function (t, e, n) {
  "use strict";
  t.exports = function (t) {
    return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)
    );
  };
}, function (t, e, n) {
  "use strict";
  var i = n(0);t.exports = i.isStandardBrowserEnv() ? function () {
    function t(t) {
      var e = t;return n && (r.setAttribute("href", e), e = r.href), r.setAttribute("href", e), { href: r.href, protocol: r.protocol ? r.protocol.replace(/:$/, "") : "", host: r.host, search: r.search ? r.search.replace(/^\?/, "") : "", hash: r.hash ? r.hash.replace(/^#/, "") : "", hostname: r.hostname, port: r.port, pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname };
    }var e,
        n = /(msie|trident)/i.test(navigator.userAgent),
        r = document.createElement("a");return e = t(window.location.href), function (n) {
      var r = i.isString(n) ? t(n) : n;return r.protocol === e.protocol && r.host === e.host;
    };
  }() : function () {
    return function () {
      return !0;
    };
  }();
}, function (t, e, n) {
  "use strict";
  var i = n(0);t.exports = function (t, e) {
    i.forEach(t, function (n, i) {
      i !== e && i.toUpperCase() === e.toUpperCase() && (t[e] = n, delete t[i]);
    });
  };
}, function (t, e, n) {
  "use strict";
  var i = n(0),
      r = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];t.exports = function (t) {
    var e,
        n,
        o,
        a = {};return t ? (i.forEach(t.split("\n"), function (t) {
      if (o = t.indexOf(":"), e = i.trim(t.substr(0, o)).toLowerCase(), n = i.trim(t.substr(o + 1)), e) {
        if (a[e] && r.indexOf(e) >= 0) return;a[e] = "set-cookie" === e ? (a[e] ? a[e] : []).concat([n]) : a[e] ? a[e] + ", " + n : n;
      }
    }), a) : a;
  };
}, function (t, e, n) {
  "use strict";
  t.exports = function (t) {
    return function (e) {
      return t.apply(null, e);
    };
  };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var i = n(42),
      r = n.n(i),
      o = n(43),
      a = n.n(o);e.default = { name: "app", data: function data() {
      return { loading: !0, outer: !1 };
    }, methods: { loadingComplete: function loadingComplete(t) {
        this.loading = !t, this.outer = t;
      } }, components: { Loading: r.a, Outer: a.a } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { name: "loading", data: function data() {
      return { imagePath: $GLOBAL_CONFIG.pcimgpath + "/20171212/images/", imgArray: ["adjustBg.png", "adjustMan.png", "adjustWoman.png", "already.png", "also.png", "audioClose.png", "audioOpen.png", "back.png", "bg.jpg", "choice1.png", "choice2.png", "choice3.png", "choice4.png", "choiceBg.png", "choiceMan.png", "choicePic.jpg", "choiceWoman.png", "confirm.png", "continue.png", "cruelBg.png", "cruelMan.png", "cruelTitle.png", "cruelWoman.png", "current.png", "equip1.png", "equip2.png", "equip3.png", "equip4.png", "equipBg.png", "equipMan.png", "equipTitle.png", "equipWoman.png", "exchangeBg.png", "flame.png", "flameBg.png", "flameMan.png", "flameWoman.png", "friendBg.png", "friendMan.png", "friendWoman.png", "homeText.png", "import.png", "importNo.png", "infoBg.png", "loadImg.png", "loadImg2.png", "man.png", "manBtn.png", "manual.png", "more.png", "musicClose.png", "musicOpen.png", "numerical.png", "ok.png", "photoBtn.png", "photoMan.jpg", "photoWoman.jpg", "pitch1.png", "pitch2.png", "pitch3.png", "pitch4.png", "poster.png", "presentBg.png", "presentMan.png", "presentWoman.png", "resultBg.png", "resultMan.png", "resultWoman.png", "ruleBg.png", "ruleBtn.png", "share.png", "shareTitle.png", "stroll.png", "successfulBg.png", "temp.png", "time.png", "unclaimed.png", "vsenue.png", "warmBtn.png", "woman.png", "womanBtn.png"], loadPercent: 0 };
    }, created: function created() {
      var t = this;!function () {
        var e = t.imgArray.length,
            n = 0;t.imgArray.forEach(function (i, r) {
          var o = document.createElement("img");o.src = t.imagePath + i, o.onload = function () {
            n += 1, t.loadPercent = n / e * 100, t.loadPercent = t.loadPercent.toFixed(0), t.loadHeight = t.loadPercent + "%", t.loadPercent / 100 == 1 && t.$emit("complete", !0);
          };
        });
      }();
    }, props: { childLoading: Boolean } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var i = n(14),
      r = n.n(i),
      o = n(37),
      a = n.n(o),
      s = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
    return typeof t === "undefined" ? "undefined" : _typeof(t);
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
  },
      c = r.a.create({ timeout: 15e3, baseURL: $GLOBAL_CONFIG.activity_domain + "api" });e.default = { name: "outer", data: function data() {
      return { imagePath: $GLOBAL_CONFIG.pcimgpath + "/20171212/images/", shareAppShow: !0, outer: !0, home: !0, rule: !1, info: !1, adjust: !1, choice: !1, equip: !1, share: !1, banner: !1, poster: !1, sex: !0, faceUrl: "", nickname: { value: "", check: !1, disabled: "disabled" }, tool: { value: 1, array: [null, null, null, null], check: !0 }, cropper: { img: "", autoCrop: !0, autoCropWidth: 200, autoCropHeight: 200, fixedBox: !0 }, downImg: "#", modelSrc: null, bannerSrc: null, canvasSrc: null, CroppaOption: {}, imgUrl: null, initialImg: null, newFile: null, toastOnOff: !1, timer: 0, baseDataUA: null };
    }, created: function created() {}, watch: { "nickname.value": function nicknameValue(t, e) {
        t.length > 10 && (this.$refs.inputNickname.value = this.$refs.inputNickname.value.substring(0, 10));
      } }, methods: { Toast: function (t) {
        function e(e, n) {
          return t.apply(this, arguments);
        }return e.toString = function () {
          return t.toString();
        }, e;
      }(function (t, e) {
        this.msg = t, this.dom = this.createToast(), this.setContent(t), this.hide(e), Toast.prototype = { createToast: function createToast() {
            var t = document.createElement("div");t.style.position = "fixed", t.style.zIndex = 999, t.style.bottom = "20%", t.style.width = "100%", t.style.display = "-webkit-box;", t.style.display = "-webkit-flex;", t.style.display = "flex", t.style["-webkitBoxPack"] = "center", t.style["-webkitJustifyContent"] = "center", t.style.justifyContent = "center";var e = document.createElement("div");return e.style.maxWidth = "60px", e.style.padding = "10px", e.style.border = "1px solid #000", e.style.background = "#000", e.style.textAlign = "center", e.style.color = "#fff", e.style.fontSize = "12px", t.appendChild(e), document.body.appendChild(t), t;
          }, setContent: function setContent(t) {
            return this.dom.getElementsByTagName("div")[0].innerHTML = t, this;
          }, setSize: function setSize(t, e) {}, resetSize: function resetSize(t, e) {}, show: function show(t) {
            return this.dom.style.display = "-webkit-box;", this.dom.style.display = "-webkit-flex;", this.dom.style.display = "flex", "function" == typeof t && t.apply(this, arguments), this;
          }, hide: function hide(t, e) {
            var n = this;return setTimeout(function () {
              n.dom.style.display = "none";
            }, 1e3 * t), "function" == typeof e && e.apply(this, arguments), this;
          } };
      }), uploadCroppedImage: function uploadCroppedImage() {
        var t = this;this.CroppaOption.generateBlob(function (e) {
          t.modelSrc = e;
        }, "image/jpeg", .8);
      }, generateImage: function generateImage(t) {
        t.preventDefault(), t.stopPropagation();var e = this.CroppaOption.generateDataUrl("image/jpeg", .3);e && (this.modelSrc = e, this.adjust = !1, this.choice = !0);
      }, RuleShow: function RuleShow(t) {
        this.home = !t, this.rule = t;
      }, HomeShow: function HomeShow(t) {
        this.share = this.info = this.rule = !t, this.home = t;
      }, UAInof: function UAInof() {
        var t = window.navigator.userAgent.toLowerCase(),
            e = this;-1 !== t.indexOf("micromessenger") ? e.baseDataUA = "wx" : -1 !== t.indexOf("wechatmoments") ? e.baseDataUA = "pyq" : -1 !== t.indexOf("sina") ? e.baseDataUA = "wb" : -1 !== t.indexOf("qq") ? e.baseDataUA = "qq" : -1 !== t.indexOf("qzone") ? e.baseDataUA = "qqkj" : -1 !== t.indexOf("gome") ? e.baseDataUA = "gm" : e.baseDataUA = "wx";
      }, InfoShow: function InfoShow(t, e) {
        var n = this,
            i = this.$refs.inputNickname.value.replace(/\s+/gm, "");this.CroppaOption.refresh(), document.querySelector(".croppa-container").querySelector("input").value = "", $g.getUserInfo(function (e) {
          gomeClicki("send", "pageview", { location: "warm-a2" }), n.UAInof(), console.log("登录成功"), n.home = !t, n.choice = !t, n.info = t;
        }, function (t) {
          console.log("登录失败"), $g.login();
        }), e || (/^[\u4E00-\u9FA5aa-zA-Z1-9]{0,10}$/gi.test(i) ? i.length && i.length <= 10 ? (this.nickname.value = i, this.nickname.check = !0, this.nickname.disabled = !1) : (this.nickname.value = "", this.nickname.check = !1, this.nickname.disabled = "disabled") : (this.nickname.check = !1, this.nickname.disabled = "disabled"));
      }, EquipShow: function EquipShow(t) {
        var e = this,
            n = !!$g.system.android;-1 !== window.navigator.userAgent.toLowerCase().indexOf("micromessenger") && (wx.onMenuShareAppMessage({ title: sina_title, desc: sina_desc, link: link_login + "&cmpid=fx_wap_wx_yx_" + $GLOBAL_CONFIG.user_id, imgUrl: sina_img, trigger: function trigger(t) {}, success: function success(t) {
            game.shareover();
          }, cancel: function cancel(t) {}, fail: function fail(t) {} }), wx.onMenuShareTimeline({ title: sina_title, link: link_login + "&cmpid=fx_wap_pyq_yx_" + $GLOBAL_CONFIG.user_id, imgUrl: sina_img, trigger: function trigger(t) {}, success: function success(t) {
            game.shareover();
          }, cancel: function cancel(t) {}, fail: function fail(t) {} }), wx.onMenuShareQQ({ title: sina_title, desc: sina_desc, link: link_login + "&cmpid=fx_wap_qq_yx_" + $GLOBAL_CONFIG.user_id, imgUrl: sina_img, success: function success() {}, cancel: function cancel() {} }), wx.onMenuShareQZone({ title: sina_title, desc: sina_desc, link: link_login + "&cmpid=fx_wap_qqkj_yx_" + $GLOBAL_CONFIG.user_id, imgUrl: sina_img, success: function success() {}, cancel: function cancel() {} })), $g.env.app && n && (e.shareAppShow = !1), this.tool.check && (this.share = this.choice = !t, this.equip = t, this.sex = this.sex ? 1 : 0, c.post("upload", a.a.stringify({ content: this.modelSrc })).then(function (t) {
          e.faceUrl = t.data.data[0], t.data.success && c.post("save", a.a.stringify({ user_id: $GLOBAL_CONFIG.user_id, sex: e.sex, nick_name: e.nickname.value, icon: t.data.data[0], product_type: e.tool.value })).then(function (t) {});
        }));
      }, EquipShowOver: function EquipShowOver(t) {
        gomeClicki("send", "pageview", { location: "warm-a3" }), this.share = this.choice = !t, this.equip = t;
      }, ShareShow: function ShareShow(t) {
        var e = window.navigator.userAgent.toLowerCase(),
            n = this;if (-1 !== e.indexOf("micromessenger")) this.share = t;else if (-1 !== e.indexOf("gome")) {
          var i = i + "?cmpid=fx_wap_" + n.baseDataUA + "_yx_" + $GLOBAL_CONFIG.user_id,
              r = { title: qq_zone_title, shareDesc: qq_zone_desc, shareImageUrl: qq_zone_img, shareUrl: i, platform: ["WeiBo", "Wechat", "WechatMoments", "QQ", "QZone", "GomeMyFriends", "GomeMoments", "CopyLink"] };$g.callShareComp(r);
        } else this.setToast("请用浏览器自带分享功能分享");
      }, setToast: function setToast(t) {
        var e = this,
            n = document.getElementById("browser-share");clearTimeout(e.timer), console.log(this.toastOnOff), n ? this.toastOnOff && (n.style.display = "block", n.innerHTML = '<div style="margin:0 auto; max-width: 50%; padding: 20px; border: 1px solid rgb(0, 0, 0); background: rgba(0, 0, 0, 0.8); text-align: center; color: rgb(255, 255, 255); font-size: 12px;">' + t + "</div>", this.toastOnOff = !1) : $("body").append('<div id="browser-share" style="position: fixed; z-index: 999; bottom: 20%; width: 100%; display:-webkit-box;display:-webkit-flex;display: flex; -webkit-box-pack: center; justify-content: center;"><div style="margin: 0 auto; max-width: 55%; padding: 20px; border: 1px solid rgb(0, 0, 0); background: rgba(0, 0, 0, 0.8); text-align: center; color: rgb(255, 255, 255); font-size: 12px;">' + t + "</div></div>"), e.timer = setTimeout(function () {
          $("#browser-share").hide(), e.toastOnOff = !0;
        }, 2e3);
      }, adjustFile: function adjustFile(t, e) {
        var n = this,
            i = this.$refs.inputNickname.value.replace(/\s+/gm, "");/^[\u4E00-\u9FA5aa-zA-Z1-9]{0,10}$/gi.test(i) ? i.length ? i.length <= 10 ? (this.nickname.value = i, this.nickname.check = !0, this.nickname.disabled = !1) : (this.nickname.value = "", this.nickname.check = !1, this.nickname.disabled = "disabled", this.setToast("名字长度超过10位")) : (this.nickname.value = "", this.nickname.check = !1, this.nickname.disabled = "disabled", this.setToast("请填入昵称")) : (this.nickname.check = !1, this.nickname.disabled = "disabled", this.setToast("名字含有异常字符")), n.nickname.check && (document.querySelector(".croppa-container").querySelector("input").click(), document.querySelector(".croppa-container").querySelector("input").addEventListener("change", function (t) {
          var i = t.target.files[0];if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(t.target.value)) return n.setToast("头像只支持图片"), !1;var r = new FileReader();r.readAsDataURL(i), r.onload = function () {
            n.info = !e, n.adjust = e;
          };
        }));
      }, touchMan: function touchMan() {
        this.sex = !0;
      }, touchWoman: function touchWoman() {
        this.sex = !1;
      }, checkNickname: function checkNickname(t) {
        var e = this.$refs.inputNickname.value.replace(/\s+/gm, "");/^[\u4E00-\u9FA5aa-zA-Z1-9]{0,10}$/gi.test(e) ? e.length && e.length <= 10 ? (this.nickname.value = e, this.nickname.check = !0, this.nickname.disabled = !1) : (this.nickname.value = "", this.nickname.check = !1, this.nickname.disabled = "disabled") : (this.nickname.check = !1, this.nickname.disabled = "disabled");
      }, uploadImg: function uploadImg(t, e, n) {
        var i = this,
            r = t.target.files[0];if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(t.target.value)) return !1;var o = new FileReader();o.onload = function (t) {
          var n = void 0;n = "object" === s(t.target.result) ? window.URL.createObjectURL(new Blob([t.target.result])) : t.target.result, 1 === e && (i.cropper.img = n);
        }, o.readAsArrayBuffer(r), t.target.value = "", t.target.onchange = null, i.info = !n, i.adjust = n;
      }, finish: function finish(t, e) {
        var n = this;t.preventDefault(), t.stopPropagation(), this.$refs.cropper1.getCropData(function (t) {
          n.adjust = !1, n.choice = !0, n.modelSrc = t;
        });
      }, choiceTool: function choiceTool(t, e) {
        switch (e) {case 1:
            this.tool.value = 1, this.tool.check = !0;break;case 2:
            this.tool.value = 2, this.tool.check = !0;break;case 3:
            this.tool.value = 3, this.tool.check = !0;break;case 4:
            this.tool.value = 4, this.tool.check = !0;}
      }, setShare: function setShare() {
        var t = this,
            e = e + "?cmpid=fx_wap_" + t.baseDataUA + "_yx_" + $GLOBAL_CONFIG.user_id;!function () {
          $g.ready().then(function () {
            var t = { type: "share", icon: "file://share", shareInfo: { title: qq_zone_title, shareDesc: qq_zone_desc, shareImageUrl: qq_zone_img, shareUrl: e, platform: ["WeiBo", "Wechat", "WechatMoments", "QQ", "QZone", "GomeMyFriends", "GomeMoments", "CopyLink"] } };$g.env.app && $g.setHeadBar({ menus: { isShowCloseMenu: "Y", rightMenus: [t] } });
          });
        }();
      }, setShared: function setShared() {
        var t = this,
            e = e + "?cmpid=fx_wap_" + t.baseDataUA + "_yx_" + $GLOBAL_CONFIG.user_id,
            n = { title: qq_zone_title, shareDesc: qq_zone_desc, shareImageUrl: qq_zone_img, shareUrl: e, platform: ["WeiBo", "Wechat", "WechatMoments", "QQ", "QZone", "GomeMyFriends", "GomeMoments", "CopyLink"] };$g.callShareComp(n);
      }, createBanner: function createBanner(t) {
        function e() {
          var e = document.createElement("canvas");if (e.width = 640, e.height = 1008, e.getContext) {
            var r = function t(i) {
              var r = n.image.length;if (i < r) {
                var a = new Image();a.crossOrigin = "anonymous", 0 == i && (a.onerror = function () {
                  return l.fillStyle = "#fff", l.stokeStyle = "#dfdfdf", l.fillRect(20, 20, 100, 100), l.strokeRect(20, 20, 100, 100), l.font = "60px MicrosoftYaHei", l.textAlign = "center", l.textBaseline = "middle", l.fillStyle = "#333", l.fillText(n.error, l.measureText(n.error).width, 120), !1;
                }, a.onload = function () {
                  l.globalAlpha = 1, l.drawImage(a, 1, 0, 640, 1008, 0, 0, 640, 1008), t(i + 1);
                }, a.src = n.image[i]);
              } else l.globalAlpha = 1, l.font = "normal 28px MicrosoftYaHei", l.fillStyle = "#fff", l.textAlign = "center", l.fillText(n.name, e.width / 2 - l.measureText(n.name).width / 4, 139), l.fillText(n.detail1, l.measureText(n.detail1).width / 2 + 208, 189), l.fillText(n.detail2, l.measureText(n.detail2).width / 2 + 208, 239), o(0);
            },
                o = function t(e) {
              var i = n.resImage.length,
                  r = new Image();r.crossOrigin = "anonymous", e < i ? (0 == e && (r.onerror = function () {
                return l.clearRect(0, 0, 640, 1008), l.fillStyle = "#fff", l.stokeStyle = "#dfdfdf", l.fillRect(20, 20, 100, 100), l.strokeRect(20, 20, 100, 100), l.font = "60px MicrosoftYaHei", l.textAlign = "center", l.textBaseline = "middle", l.fillStyle = "#333", l.fillText(n.error, l.measureText(n.error).width, 120), !1;
              }, r.onload = function () {
                l.globalAlpha = 1, l.drawImage(r, 167, 431, 307, 365), t(e + 1);
              }), r.src = n.resImage[e]) : a(0);
            },
                a = function t(e) {
              var i = n.toolImage.length,
                  r = new Image();r.crossOrigin = "anonymous", e < i ? (0 == e ? (r.onerror = function () {
                return l.clearRect(0, 0, 640, 1008), l.fillStyle = "#fff", l.stokeStyle = "#dfdfdf", l.fillRect(20, 20, 100, 100), l.strokeRect(20, 20, 100, 100), l.font = "60px MicrosoftYaHei", l.textAlign = "center", l.textBaseline = "middle", l.fillStyle = "#333", l.fillText(n.error, l.measureText(n.error).width, 120), !1;
              }, r.onload = function () {
                l.globalAlpha = 1, l.drawImage(r, n.Xposition, n.Yposition, n.wSize, n.hSize), t(e + 1);
              }) : 1 == e ? r.onload = function () {
                l.globalAlpha = 1, l.drawImage(r, 178, 671, 133, 95), t(e + 1);
              } : 2 == e ? r.onload = function () {
                l.globalAlpha = 1, l.drawImage(r, 133, 647, 150, 233), t(e + 1);
              } : 3 == e && (r.onload = function () {
                l.globalAlpha = 1, l.drawImage(r, 369, 638, 139, 177), t(e + 1);
              }), r.src = n.toolImage[e]) : s();
            },
                s = function s() {
              var t = (n.codeImage.length, new Image());t.crossOrigin = "anonymous", t.onerror = function () {
                return l.clearRect(0, 0, 640, 1008), l.fillStyle = "#fff", l.stokeStyle = "#dfdfdf", l.fillRect(20, 20, 100, 100), l.strokeRect(20, 20, 100, 100), l.font = "60px MicrosoftYaHei", l.textAlign = "center", l.textBaseline = "middle", l.fillStyle = "#333", l.fillText(n.error, l.measureText(n.error).width, 120), !1;
              }, t.onload = function () {
                l.globalAlpha = 1, l.drawImage(t, e.width / 2 - 43, 863, 87, 87), l.font = "normal 14px MicrosoftYaHei", l.fillStyle = "#fff", l.textAlign = "center", l.fillText(n.codetalk, e.width / 2, 979), c();
              }, t.src = n.codeImage[0];
            },
                c = function c() {
              var n = e.toDataURL("image/jpeg", .4),
                  r = new Image();r.crossOrigin = "*", r.crossOrigin = "anonymous", r.src = n, r.style.width = "100%", r.style.height = "100vh", r.style.position = "absolute", r.style.zIndex = 99998, document.body.appendChild(r), i.banner = i.outer = t;
            },
                l = e.getContext("2d");l.save(), l.fillStyle = "#fff", l.fillRect(0, 0, e.width, e.height);!function t(e) {
              var o = n.faceImage.length;if (e < o) {
                var a = new Image();a.crossOrigin = "anonymous", 0 == e && (a.onerror = function () {}, a.onload = function () {
                  l.globalAlpha = 1, l.drawImage(a, 250, 521, 140, 140), t(e + 1);
                }, a.src = i.faceUrl);
              } else r(0);
            }(0);
          }
        }this.setShare();var n = { error: "生成封面图失败，请重新加载生成", name: "", detail1: "你给我的温暖，", detail2: "我都收在心里了", codetalk: "长按识别二维码    为ta送温暖", image: [this.imagePath + "banner/bg1.png"], faceImage: [], resImage: [], toolImage: [], codeImage: [$GLOBAL_CONFIG.activity_domain + "qrcode/urlcode?url=" + encodeURIComponent(link_login)], wSize: 0, hSize: 0, Xposition: 0, Yposition: 0 },
            i = this;!function () {
          switch (i.outer = i.equip = !t, i.poster = !0, n.name = i.nickname.value + ":", n.faceImage.push(i.modelSrc), i.sex ? n.resImage[0] = i.imagePath + "banner/body1.png" : n.resImage[0] = i.imagePath + "banner/body2.png", i.tool.value) {case 1:
              n.toolImage.push(i.imagePath + "banner/food1.png"), n.wSize = 139, n.hSize = 177, n.Xposition = 369, n.Yposition = 638;break;case 2:
              n.toolImage.push(i.imagePath + "banner/trousers1.png"), n.wSize = 150, n.hSize = 223, n.Xposition = 128, n.Yposition = 616;break;case 3:
              n.toolImage.push(i.imagePath + "banner/nuanbaby1.png"), n.wSize = 133, n.hSize = 95, n.Xposition = 178, n.Yposition = 671;break;case 4:
              n.toolImage.push(i.imagePath + "banner/shoes1.png"), n.wSize = 169, n.hSize = 112, n.Xposition = 345, n.Yposition = 730;}e();
        }(), CanvasRenderingContext2D.prototype.roundRect = function (t, e, n, i, r) {
          var o = Math.min(n, i);return r > o / 2 && (r = o / 2), this.beginPath(), this.moveTo(t + r, e), this.arcTo(t + n, e, t + n, e + i, r), this.arcTo(t + n, e + i, t, e + i, r), this.arcTo(t, e + i, t, e, r), this.arcTo(t, e, t + n, e, r), this.closePath(), this;
        };
      } }, props: { childOuter: Boolean } };
}, function (t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", { value: !0 });var i = n(13),
      r = n(12),
      o = n.n(r),
      a = n(11),
      s = n.n(a);new i.a({ el: "#app", render: function render(t) {
      return t(o.a);
    } }), i.a.use(s.a);
}, function (t, e) {
  function n(t) {
    return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t);
  }function i(t) {
    return "function" == typeof t.readFloatLE && "function" == typeof t.slice && n(t.slice(0, 0));
  } /*!
    * Determine if an object is a Buffer
    *
    * @author   Feross Aboukhadijeh <https://feross.org>
    * @license  MIT
    */
  t.exports = function (t) {
    return null != t && (n(t) || i(t) || !!t._isBuffer);
  };
}, function (t, e, n) {
  "use strict";
  var i = n(39),
      r = n(38),
      o = n(9);t.exports = { formats: o, parse: r, stringify: i };
}, function (t, e, n) {
  "use strict";
  var i = n(10),
      r = Object.prototype.hasOwnProperty,
      o = { allowDots: !1, allowPrototypes: !1, arrayLimit: 20, decoder: i.decode, delimiter: "&", depth: 5, parameterLimit: 1e3, plainObjects: !1, strictNullHandling: !1 },
      a = function a(t, e) {
    for (var n = {}, i = e.ignoreQueryPrefix ? t.replace(/^\?/, "") : t, a = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit, s = i.split(e.delimiter, a), c = 0; c < s.length; ++c) {
      var l,
          u,
          f = s[c],
          d = f.indexOf("]="),
          p = -1 === d ? f.indexOf("=") : d + 1;-1 === p ? (l = e.decoder(f, o.decoder), u = e.strictNullHandling ? null : "") : (l = e.decoder(f.slice(0, p), o.decoder), u = e.decoder(f.slice(p + 1), o.decoder)), r.call(n, l) ? n[l] = [].concat(n[l]).concat(u) : n[l] = u;
    }return n;
  },
      s = function s(t, e, n) {
    for (var i = e, r = t.length - 1; r >= 0; --r) {
      var o,
          a = t[r];if ("[]" === a) o = [], o = o.concat(i);else {
        o = n.plainObjects ? Object.create(null) : {};var s = "[" === a.charAt(0) && "]" === a.charAt(a.length - 1) ? a.slice(1, -1) : a,
            c = parseInt(s, 10);!isNaN(c) && a !== s && String(c) === s && c >= 0 && n.parseArrays && c <= n.arrayLimit ? (o = [], o[c] = i) : o[s] = i;
      }i = o;
    }return i;
  },
      c = function c(t, e, n) {
    if (t) {
      var i = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t,
          o = /(\[[^[\]]*])/,
          a = /(\[[^[\]]*])/g,
          c = o.exec(i),
          l = c ? i.slice(0, c.index) : i,
          u = [];if (l) {
        if (!n.plainObjects && r.call(Object.prototype, l) && !n.allowPrototypes) return;u.push(l);
      }for (var f = 0; null !== (c = a.exec(i)) && f < n.depth;) {
        if (f += 1, !n.plainObjects && r.call(Object.prototype, c[1].slice(1, -1)) && !n.allowPrototypes) return;u.push(c[1]);
      }return c && u.push("[" + i.slice(c.index) + "]"), s(u, e, n);
    }
  };t.exports = function (t, e) {
    var n = e ? i.assign({}, e) : {};if (null !== n.decoder && void 0 !== n.decoder && "function" != typeof n.decoder) throw new TypeError("Decoder has to be a function.");if (n.ignoreQueryPrefix = !0 === n.ignoreQueryPrefix, n.delimiter = "string" == typeof n.delimiter || i.isRegExp(n.delimiter) ? n.delimiter : o.delimiter, n.depth = "number" == typeof n.depth ? n.depth : o.depth, n.arrayLimit = "number" == typeof n.arrayLimit ? n.arrayLimit : o.arrayLimit, n.parseArrays = !1 !== n.parseArrays, n.decoder = "function" == typeof n.decoder ? n.decoder : o.decoder, n.allowDots = "boolean" == typeof n.allowDots ? n.allowDots : o.allowDots, n.plainObjects = "boolean" == typeof n.plainObjects ? n.plainObjects : o.plainObjects, n.allowPrototypes = "boolean" == typeof n.allowPrototypes ? n.allowPrototypes : o.allowPrototypes, n.parameterLimit = "number" == typeof n.parameterLimit ? n.parameterLimit : o.parameterLimit, n.strictNullHandling = "boolean" == typeof n.strictNullHandling ? n.strictNullHandling : o.strictNullHandling, "" === t || null === t || void 0 === t) return n.plainObjects ? Object.create(null) : {};for (var r = "string" == typeof t ? a(t, n) : t, s = n.plainObjects ? Object.create(null) : {}, l = Object.keys(r), u = 0; u < l.length; ++u) {
      var f = l[u],
          d = c(f, r[f], n);s = i.merge(s, d, n);
    }return i.compact(s);
  };
}, function (t, e, n) {
  "use strict";
  var i = n(10),
      r = n(9),
      o = { brackets: function brackets(t) {
      return t + "[]";
    }, indices: function indices(t, e) {
      return t + "[" + e + "]";
    }, repeat: function repeat(t) {
      return t;
    } },
      a = Date.prototype.toISOString,
      s = { delimiter: "&", encode: !0, encoder: i.encode, encodeValuesOnly: !1, serializeDate: function serializeDate(t) {
      return a.call(t);
    }, skipNulls: !1, strictNullHandling: !1 },
      c = function t(e, n, r, o, a, c, l, u, f, d, p, h) {
    var v = e;if ("function" == typeof l) v = l(n, v);else if (v instanceof Date) v = d(v);else if (null === v) {
      if (o) return c && !h ? c(n, s.encoder) : n;v = "";
    }if ("string" == typeof v || "number" == typeof v || "boolean" == typeof v || i.isBuffer(v)) {
      if (c) {
        return [p(h ? n : c(n, s.encoder)) + "=" + p(c(v, s.encoder))];
      }return [p(n) + "=" + p(String(v))];
    }var m = [];if (void 0 === v) return m;var g;if (Array.isArray(l)) g = l;else {
      var y = Object.keys(v);g = u ? y.sort(u) : y;
    }for (var _ = 0; _ < g.length; ++_) {
      var b = g[_];a && null === v[b] || (m = Array.isArray(v) ? m.concat(t(v[b], r(n, b), r, o, a, c, l, u, f, d, p, h)) : m.concat(t(v[b], n + (f ? "." + b : "[" + b + "]"), r, o, a, c, l, u, f, d, p, h)));
    }return m;
  };t.exports = function (t, e) {
    var n = t,
        a = e ? i.assign({}, e) : {};if (null !== a.encoder && void 0 !== a.encoder && "function" != typeof a.encoder) throw new TypeError("Encoder has to be a function.");var l = void 0 === a.delimiter ? s.delimiter : a.delimiter,
        u = "boolean" == typeof a.strictNullHandling ? a.strictNullHandling : s.strictNullHandling,
        f = "boolean" == typeof a.skipNulls ? a.skipNulls : s.skipNulls,
        d = "boolean" == typeof a.encode ? a.encode : s.encode,
        p = "function" == typeof a.encoder ? a.encoder : s.encoder,
        h = "function" == typeof a.sort ? a.sort : null,
        v = void 0 !== a.allowDots && a.allowDots,
        m = "function" == typeof a.serializeDate ? a.serializeDate : s.serializeDate,
        g = "boolean" == typeof a.encodeValuesOnly ? a.encodeValuesOnly : s.encodeValuesOnly;if (void 0 === a.format) a.format = r.default;else if (!Object.prototype.hasOwnProperty.call(r.formatters, a.format)) throw new TypeError("Unknown format option provided.");var y,
        _,
        b = r.formatters[a.format];"function" == typeof a.filter ? (_ = a.filter, n = _("", n)) : Array.isArray(a.filter) && (_ = a.filter, y = _);var w = [];if ("object" != (typeof n === "undefined" ? "undefined" : _typeof(n)) || null === n) return "";var C;C = a.arrayFormat in o ? a.arrayFormat : "indices" in a ? a.indices ? "indices" : "repeat" : "indices";var x = o[C];y || (y = Object.keys(n)), h && y.sort(h);for (var A = 0; A < y.length; ++A) {
      var k = y[A];f && null === n[k] || (w = w.concat(c(n[k], k, x, u, f, d ? p : null, _, h, v, m, b, g)));
    }var O = w.join(l),
        S = !0 === a.addQueryPrefix ? "?" : "";return O.length > 0 ? S + O : "";
  };
}, function (t, e, n) {
  (function (t, e) {
    !function (t, n) {
      "use strict";
      function i(t) {
        "function" != typeof t && (t = new Function("" + t));for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++) {
          e[n] = arguments[n + 1];
        }var i = { callback: t, args: e };return l[c] = i, s(c), c++;
      }function r(t) {
        delete l[t];
      }function o(t) {
        var e = t.callback,
            i = t.args;switch (i.length) {case 0:
            e();break;case 1:
            e(i[0]);break;case 2:
            e(i[0], i[1]);break;case 3:
            e(i[0], i[1], i[2]);break;default:
            e.apply(n, i);}
      }function a(t) {
        if (u) setTimeout(a, 0, t);else {
          var e = l[t];if (e) {
            u = !0;try {
              o(e);
            } finally {
              r(t), u = !1;
            }
          }
        }
      }if (!t.setImmediate) {
        var s,
            c = 1,
            l = {},
            u = !1,
            f = t.document,
            d = Object.getPrototypeOf && Object.getPrototypeOf(t);d = d && d.setTimeout ? d : t, "[object process]" === {}.toString.call(t.process) ? function () {
          s = function s(t) {
            e.nextTick(function () {
              a(t);
            });
          };
        }() : function () {
          if (t.postMessage && !t.importScripts) {
            var e = !0,
                n = t.onmessage;return t.onmessage = function () {
              e = !1;
            }, t.postMessage("", "*"), t.onmessage = n, e;
          }
        }() ? function () {
          var e = "setImmediate$" + Math.random() + "$",
              n = function n(_n2) {
            _n2.source === t && "string" == typeof _n2.data && 0 === _n2.data.indexOf(e) && a(+_n2.data.slice(e.length));
          };t.addEventListener ? t.addEventListener("message", n, !1) : t.attachEvent("onmessage", n), s = function s(n) {
            t.postMessage(e + n, "*");
          };
        }() : t.MessageChannel ? function () {
          var t = new MessageChannel();t.port1.onmessage = function (t) {
            a(t.data);
          }, s = function s(e) {
            t.port2.postMessage(e);
          };
        }() : f && "onreadystatechange" in f.createElement("script") ? function () {
          var t = f.documentElement;s = function s(e) {
            var n = f.createElement("script");n.onreadystatechange = function () {
              a(e), n.onreadystatechange = null, t.removeChild(n), n = null;
            }, t.appendChild(n);
          };
        }() : function () {
          s = function s(t) {
            setTimeout(a, 0, t);
          };
        }(), d.setImmediate = i, d.clearImmediate = r;
      }
    }("undefined" == typeof self ? void 0 === t ? this : t : self);
  }).call(e, n(2), n(8));
}, function (t, e, n) {
  function i(t, e) {
    this._id = t, this._clearFn = e;
  }var r = Function.prototype.apply;e.setTimeout = function () {
    return new i(r.call(setTimeout, window, arguments), clearTimeout);
  }, e.setInterval = function () {
    return new i(r.call(setInterval, window, arguments), clearInterval);
  }, e.clearTimeout = e.clearInterval = function (t) {
    t && t.close();
  }, i.prototype.unref = i.prototype.ref = function () {}, i.prototype.close = function () {
    this._clearFn.call(window, this._id);
  }, e.enroll = function (t, e) {
    clearTimeout(t._idleTimeoutId), t._idleTimeout = e;
  }, e.unenroll = function (t) {
    clearTimeout(t._idleTimeoutId), t._idleTimeout = -1;
  }, e._unrefActive = e.active = function (t) {
    clearTimeout(t._idleTimeoutId);var e = t._idleTimeout;e >= 0 && (t._idleTimeoutId = setTimeout(function () {
      t._onTimeout && t._onTimeout();
    }, e));
  }, n(40), e.setImmediate = setImmediate, e.clearImmediate = clearImmediate;
}, function (t, e, n) {
  var i, r;i = n(33);var o = n(44);r = i = i || {}, "object" != _typeof(i.default) && "function" != typeof i.default || (r = i = i.default), "function" == typeof r && (r = r.options), r.render = o.render, r.staticRenderFns = o.staticRenderFns, t.exports = i;
}, function (t, e, n) {
  var i, r;i = n(34);var o = n(46);r = i = i || {}, "object" != _typeof(i.default) && "function" != typeof i.default || (r = i = i.default), "function" == typeof r && (r = r.options), r.render = o.render, r.staticRenderFns = o.staticRenderFns, t.exports = i;
}, function (t, e) {
  t.exports = { render: function render() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { directives: [{ name: "show", rawName: "v-show", value: t.childLoading, expression: "childLoading" }], staticClass: "loading" }, [n("div", { staticClass: "loading-cont" }, [n("div", { staticClass: "cont-img" }, [n("div", { staticClass: "img-box", style: { height: t.loadPercent + "%" } }, [n("div", { staticClass: "box-up" })])]), t._v(" "), n("div", { staticClass: "percent" }, [n("span", [t._v(t._s(t.loadPercent))]), t._v("%")])])]);
    }, staticRenderFns: [] };
}, function (t, e) {
  t.exports = { render: function render() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { attrs: { id: "hostgame" } }, [n("Loading", { attrs: { "child-loading": t.loading }, on: { complete: t.loadingComplete } }), t._v(" "), n("Outer", { attrs: { "child-outer": t.outer } })], 1);
    }, staticRenderFns: [] };
}, function (t, e) {
  t.exports = { render: function render() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { directives: [{ name: "show", rawName: "v-show", value: t.childOuter && t.outer, expression: "childOuter&&outer" }], staticClass: "outer" }, [n("div", { directives: [{ name: "show", rawName: "v-show", value: t.home, expression: "home" }], staticClass: "home" }, [n("div", { staticClass: "home-text" }), t._v(" "), n("div", { staticClass: "home-btn" }, [n("a", { staticClass: "warmBtn", attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.InfoShow(!0, !0);
          } } }), n("a", { staticClass: "ruleBtn", attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.RuleShow(!0);
          } } })])]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.rule, expression: "rule" }], staticClass: "rule" }, [n("div", { staticClass: "bg" }, [n("div", { staticClass: "back" }, [n("a", { attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.HomeShow(!0);
          } } })]), t._v(" "), t._m(0, !1, !1)])]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.info, expression: "info" }], staticClass: "info" }, [n("div", { staticClass: "bg" }, [n("div", { staticClass: "back" }, [n("a", { attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.HomeShow(!0);
          } } })]), t._v(" "), n("div", { staticClass: "sex" }, [n("div", { staticClass: "sex-title" }, [t._v("请选择你的性别")]), t._v(" "), n("div", { staticClass: "sex-btn clearfix" }, [n("div", { staticClass: "man fl", on: { touchend: t.touchMan } }, [n("div", { class: [{ pitch: t.sex }, "head"] }, [n("img", { attrs: { src: t.imagePath + "man.png", alt: "" } })]), t._v(" "), t._m(1, !1, !1)]), t._v(" "), n("div", { staticClass: "woman fr", on: { touchend: t.touchWoman } }, [n("div", { class: [{ pitch: !t.sex }, "head"] }, [n("img", { attrs: { src: t.imagePath + "woman.png", alt: "" } })]), t._v(" "), t._m(2, !1, !1)])])]), t._v(" "), n("div", { staticClass: "nickname" }, [n("input", { ref: "inputNickname", class: { pitch: t.nickname.check }, attrs: { type: "text", maxlength: "10", name: "tname", placeholder: "输入昵称" }, on: { keyup: t.checkNickname, change: t.checkNickname } })]), t._v(" "), n("div", { staticClass: "picture", on: { touchend: function touchend(e) {
            t.adjustFile(e, !0);
          } } }, [n("div", { staticClass: "picturetitle" }, [t._v("请选择你的头像")]), t._v(" "), n("div", { staticClass: "head" }, [n("img", { directives: [{ name: "show", rawName: "v-show", value: !t.sex, expression: "!sex" }], staticClass: "head-woman", attrs: { src: t.imagePath + "photoWoman.jpg", alt: "" } }), n("img", { directives: [{ name: "show", rawName: "v-show", value: t.sex, expression: "sex" }], staticClass: "head-man", attrs: { src: t.imagePath + "photoMan.jpg", alt: "" } })]), t._v(" "), n("div", { staticClass: "picture-btn" }, [n("input", { staticStyle: { display: "block", width: "100%", height: "100%", opacity: "0", clip: "rect(0 0 0 0)" }, attrs: { type: "button", accept: "image/png, image/jpeg, image/gif, image/jpg", disabled: t.nickname.disabled } })])])])]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.adjust, expression: "adjust" }], staticClass: "adjust" }, [n("div", { staticClass: "bg" }, [n("div", { staticClass: "back" }), t._v(" "), n("div", { staticClass: "ocrop", staticStyle: { position: "absolute", top: "50%", left: "50%", margin: "-100px 0 0 -100px" } }, [n("croppa", { attrs: { width: 200, height: 200, "canvas-color": "transparent", "show-remove-button": !1, "show-loading": !0, "loading-size": 0 }, model: { value: t.CroppaOption, callback: function callback(e) {
            t.CroppaOption = e;
          }, expression: "CroppaOption" } })], 1), t._v(" "), n("div", { staticClass: "adjust-title" }, [t._v("调整你的头像位置")]), t._v(" "), n("div", { staticClass: "btn" }, [n("a", { attrs: { href: "javascript:;" }, on: { touchend: t.generateImage } })])])]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.choice, expression: "choice" }], staticClass: "choice" }, [n("div", { staticClass: "bg" }, [n("div", { staticClass: "back" }, [n("a", { attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.InfoShow(!0, !1);
          } } })]), t._v(" "), n("div", { staticClass: "choice-pic" }, [n("div", { staticClass: "pic" }, [n("img", { attrs: { src: t.modelSrc, alt: "" } })]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: !t.sex, expression: "!sex" }], staticClass: "choice-woman" }), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.sex, expression: "sex" }], staticClass: "choice-man" })]), t._v(" "), n("div", { staticClass: "choice-text" }, [n("span", [t._v(t._s(t.nickname.value))]), t._v("，选一个过冬吧？")]), t._v(" "), n("div", { staticClass: "choice-btn" }, [n("div", { staticClass: "btn choice1" }, [n("a", { class: [1 === t.tool.value ? "pitch-btn" : ""], attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.choiceTool(e, 1);
          } } })]), t._v(" "), n("div", { staticClass: "btn choice2" }, [n("a", { class: [2 === t.tool.value ? "pitch-btn" : ""], attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.choiceTool(e, 2);
          } } })]), t._v(" "), n("div", { staticClass: "btn choice3" }, [n("a", { class: [3 === t.tool.value ? "pitch-btn" : ""], attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.choiceTool(e, 3);
          } } })]), t._v(" "), n("div", { staticClass: "btn choice4" }, [n("a", { class: [4 === t.tool.value ? "pitch-btn" : ""], attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.choiceTool(e, 4);
          } } })])])]), t._v(" "), n("div", { staticClass: "ok-btn", on: { touchend: function touchend(e) {
            t.EquipShow(!0);
          } } })]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.equip, expression: "equip" }], staticClass: "equip" }, [n("div", { staticClass: "bg" }, [n("div", { staticClass: "equip-text" }, [n("span", { staticClass: "name" }, [t._v(t._s(t.nickname.value) + " ")]), n("br"), t._v("你给我的温暖，我都收在心里了")]), t._v(" "), n("div", { staticClass: "equip-pic" }, [n("div", { staticClass: "pic-head" }, [n("div", { staticClass: "pic" }, [n("img", { attrs: { src: t.modelSrc, alt: "" } })]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: !t.sex, expression: "!sex" }], staticClass: "head-woman" }), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.sex, expression: "sex" }], staticClass: "head-man" }), t._v(" "), n("div", { class: [1 != t.tool.value ? "hide" : "", "pic-equip1"] }), t._v(" "), n("div", { class: [2 != t.tool.value ? "hide" : "", "pic-equip2"] }), t._v(" "), n("div", { class: [3 != t.tool.value ? "hide" : "", "pic-equip3"] }), t._v(" "), n("div", { class: [4 != t.tool.value ? "hide" : "", "pic-equip4"] })]), t._v(" "), n("div", { staticClass: "pic-title" })])]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.shareAppShow, expression: "shareAppShow" }], staticClass: "equip-btn clearfix" }, [n("div", { staticClass: "poster btn" }, [n("a", { attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.createBanner(!0);
          } } })]), t._v(" "), n("div", { staticClass: "share btn" }, [n("a", { attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.ShareShow(!0);
          } } })])]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: !t.shareAppShow, expression: "!shareAppShow" }], staticClass: "android-btn btn" }, [n("a", { attrs: { href: "javascript:;" }, on: { touchend: function touchend(e) {
            t.ShareShow(!0);
          } } })])]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.share, expression: "share" }], staticClass: "shareWx", on: { touchend: function touchend(e) {
            t.EquipShowOver(!0);
          } } }, [n("div", { staticClass: "share-bg" }), t._v(" "), n("div", { staticClass: "share-title" })]), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.poster, expression: "poster" }], staticClass: "poster-hint" }, [n("div", { staticClass: "hint-bg" }), t._v(" "), n("div", { staticClass: "hint-text" }, [t._v("长按保存图片，去朋友圈发图求温暖吧！")])])]);
    }, staticRenderFns: [function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "rule-cont" }, [n("div", { staticClass: "cont-text" }, [n("p", [n("strong", [t._v("• 活动时间")])]), t._v(" "), n("p", [t._v("参与时间：2017.12.10 -2017.12.13")]), t._v(" "), n("p", [t._v("优惠券使用时间：2017.12.10 -2017.12.13")]), t._v(" "), n("p", [n("strong", [t._v("• 活动奖品兑换：")])]), t._v(" "), n("p", [t._v("50暖心值兑换2元优惠券（无门槛）")]), t._v(" "), n("p", [t._v("100暖心值兑换5元优惠券（无门槛）")]), t._v(" "), n("p", [t._v("150暖心值兑换121元优惠券（满500可使用）")]), t._v(" "), n("p", [t._v("注：每个ID不同面额各仅限一张，优惠券为红券，每笔支付订单限用一张，不可叠加使用）；数量有限先到先得，优惠券仅限全场自营购买使用；")]), t._v(" "), n("p", [n("strong", [t._v("• 活动内容：")])]), t._v(" "), n("p", [t._v("1.在活动期间，用户登录“取暖大作战”互动H5，通过邀请好友参与“送暖心值”互动小游戏，用户可获得相应的暖心值；")]), t._v(" "), n("p", [t._v("2.每个好友每次最高可送出40暖心值（好友对于每个用户ID，仅有一次“送暖心值”的机会），当用户暖心值累计分别达到三个不同等级，用户则有机会获得兑换优惠券的机会；")]), t._v(" "), n("p", [n("strong", [t._v("• 活动细则：")])]), t._v(" "), n("p", [t._v("1.临近活动时间，记得刷新页面；")]), t._v(" "), n("p", [t._v("2.本次活动严禁恶意刷奖行为，一经发现立即取消中奖资格，不予发奖 ；")]), t._v(" "), n("p", [t._v("3.互联网业务活动存在诸多不确定性，如因不可抗因素，例如活动中存在大面积作弊行为（如使用机器刷单等）、通讯线路故障、网络异常或计算机大规模瘫痪等原因致使活动难以继续开展的，国美有权取消、修改或暂停本活动；")]), t._v(" "), n("p", [t._v("4.用户参与此活动即视为理解并同意本活动细则，在法律允许范围内， 国美对本活动有最终解释权。")])])]);
    }, function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "btn" }, [n("a", { staticClass: "btn-man", attrs: { href: "javascript:;" } })]);
    }, function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "btn" }, [n("a", { staticClass: "btn-woman", attrs: { href: "javascript:;" } })]);
    }] };
}]);