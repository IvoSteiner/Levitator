(() => {
  var H = Object.create,
    v = Object.defineProperty,
    N = Object.getPrototypeOf,
    V = Object.prototype.hasOwnProperty,
    z = Object.getOwnPropertyNames,
    q = Object.getOwnPropertyDescriptor;
  var W = (n) => v(n, "__esModule", { value: !0 });
  var D = (n, e) => () => (
    e || ((e = { exports: {} }), n(e.exports, e)), e.exports
  );
  var F = (n, e, o) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let r of z(e))
          !V.call(n, r) &&
            r !== "default" &&
            v(n, r, {
              get: () => e[r],
              enumerable: !(o = q(e, r)) || o.enumerable,
            });
      return n;
    },
    U = (n) =>
      F(
        W(
          v(
            n != null ? H(N(n)) : {},
            "default",
            n && n.__esModule && "default" in n
              ? { get: () => n.default, enumerable: !0 }
              : { value: n, enumerable: !0 }
          )
        ),
        n
      );
  var I = D((E, w) => {
    (function () {
      "use strict";
      function n() {
        var e = window,
          o = document;
        if (
          "scrollBehavior" in o.documentElement.style &&
          e.__forceSmoothScrollPolyfill__ !== !0
        )
          return;
        var r = e.HTMLElement || e.Element,
          i = 468,
          f = {
            scroll: e.scroll || e.scrollTo,
            scrollBy: e.scrollBy,
            elementScroll: r.prototype.scroll || b,
            scrollIntoView: r.prototype.scrollIntoView,
          },
          u =
            e.performance && e.performance.now
              ? e.performance.now.bind(e.performance)
              : Date.now;
        function c(t) {
          var l = ["MSIE ", "Trident/", "Edge/"];
          return new RegExp(l.join("|")).test(t);
        }
        var g = c(e.navigator.userAgent) ? 1 : 0;
        function b(t, l) {
          (this.scrollLeft = t), (this.scrollTop = l);
        }
        function M(t) {
          return 0.5 * (1 - Math.cos(Math.PI * t));
        }
        function m(t) {
          if (
            t === null ||
            typeof t != "object" ||
            t.behavior === void 0 ||
            t.behavior === "auto" ||
            t.behavior === "instant"
          )
            return !0;
          if (typeof t == "object" && t.behavior === "smooth") return !1;
          throw new TypeError(
            "behavior member of ScrollOptions " +
              t.behavior +
              " is not a valid value for enumeration ScrollBehavior."
          );
        }
        function O(t, l) {
          if (l === "Y") return t.clientHeight + g < t.scrollHeight;
          if (l === "X") return t.clientWidth + g < t.scrollWidth;
        }
        function T(t, l) {
          var s = e.getComputedStyle(t, null)["overflow" + l];
          return s === "auto" || s === "scroll";
        }
        function R(t) {
          var l = O(t, "Y") && T(t, "Y"),
            s = O(t, "X") && T(t, "X");
          return l || s;
        }
        function $(t) {
          for (; t !== o.body && R(t) === !1; ) t = t.parentNode || t.host;
          return t;
        }
        function S(t) {
          var l = u(),
            s,
            d,
            p,
            a = (l - t.startTime) / i;
          (a = a > 1 ? 1 : a),
            (s = M(a)),
            (d = t.startX + (t.x - t.startX) * s),
            (p = t.startY + (t.y - t.startY) * s),
            t.method.call(t.scrollable, d, p),
            (d !== t.x || p !== t.y) && e.requestAnimationFrame(S.bind(e, t));
        }
        function h(t, l, s) {
          var d,
            p,
            a,
            y,
            _ = u();
          t === o.body
            ? ((d = e),
              (p = e.scrollX || e.pageXOffset),
              (a = e.scrollY || e.pageYOffset),
              (y = f.scroll))
            : ((d = t), (p = t.scrollLeft), (a = t.scrollTop), (y = b)),
            S({
              scrollable: d,
              method: y,
              startTime: _,
              startX: p,
              startY: a,
              x: l,
              y: s,
            });
        }
        (e.scroll = e.scrollTo =
          function () {
            if (arguments[0] !== void 0) {
              if (m(arguments[0]) === !0) {
                f.scroll.call(
                  e,
                  arguments[0].left !== void 0
                    ? arguments[0].left
                    : typeof arguments[0] != "object"
                    ? arguments[0]
                    : e.scrollX || e.pageXOffset,
                  arguments[0].top !== void 0
                    ? arguments[0].top
                    : arguments[1] !== void 0
                    ? arguments[1]
                    : e.scrollY || e.pageYOffset
                );
                return;
              }
              h.call(
                e,
                o.body,
                arguments[0].left !== void 0
                  ? ~~arguments[0].left
                  : e.scrollX || e.pageXOffset,
                arguments[0].top !== void 0
                  ? ~~arguments[0].top
                  : e.scrollY || e.pageYOffset
              );
            }
          }),
          (e.scrollBy = function () {
            if (arguments[0] !== void 0) {
              if (m(arguments[0])) {
                f.scrollBy.call(
                  e,
                  arguments[0].left !== void 0
                    ? arguments[0].left
                    : typeof arguments[0] != "object"
                    ? arguments[0]
                    : 0,
                  arguments[0].top !== void 0
                    ? arguments[0].top
                    : arguments[1] !== void 0
                    ? arguments[1]
                    : 0
                );
                return;
              }
              h.call(
                e,
                o.body,
                ~~arguments[0].left + (e.scrollX || e.pageXOffset),
                ~~arguments[0].top + (e.scrollY || e.pageYOffset)
              );
            }
          }),
          (r.prototype.scroll = r.prototype.scrollTo =
            function () {
              if (arguments[0] !== void 0) {
                if (m(arguments[0]) === !0) {
                  if (
                    typeof arguments[0] == "number" &&
                    arguments[1] === void 0
                  )
                    throw new SyntaxError("Value could not be converted");
                  f.elementScroll.call(
                    this,
                    arguments[0].left !== void 0
                      ? ~~arguments[0].left
                      : typeof arguments[0] != "object"
                      ? ~~arguments[0]
                      : this.scrollLeft,
                    arguments[0].top !== void 0
                      ? ~~arguments[0].top
                      : arguments[1] !== void 0
                      ? ~~arguments[1]
                      : this.scrollTop
                  );
                  return;
                }
                var t = arguments[0].left,
                  l = arguments[0].top;
                h.call(
                  this,
                  this,
                  typeof t == "undefined" ? this.scrollLeft : ~~t,
                  typeof l == "undefined" ? this.scrollTop : ~~l
                );
              }
            }),
          (r.prototype.scrollBy = function () {
            if (arguments[0] !== void 0) {
              if (m(arguments[0]) === !0) {
                f.elementScroll.call(
                  this,
                  arguments[0].left !== void 0
                    ? ~~arguments[0].left + this.scrollLeft
                    : ~~arguments[0] + this.scrollLeft,
                  arguments[0].top !== void 0
                    ? ~~arguments[0].top + this.scrollTop
                    : ~~arguments[1] + this.scrollTop
                );
                return;
              }
              this.scroll({
                left: ~~arguments[0].left + this.scrollLeft,
                top: ~~arguments[0].top + this.scrollTop,
                behavior: arguments[0].behavior,
              });
            }
          }),
          (r.prototype.scrollIntoView = function () {
            if (m(arguments[0]) === !0) {
              f.scrollIntoView.call(
                this,
                arguments[0] === void 0 ? !0 : arguments[0]
              );
              return;
            }
            var t = $(this),
              l = t.getBoundingClientRect(),
              s = this.getBoundingClientRect();
            t !== o.body
              ? (h.call(
                  this,
                  t,
                  t.scrollLeft + s.left - l.left,
                  t.scrollTop + s.top - l.top
                ),
                e.getComputedStyle(t).position !== "fixed" &&
                  e.scrollBy({ left: l.left, top: l.top, behavior: "smooth" }))
              : e.scrollBy({ left: s.left, top: s.top, behavior: "smooth" });
          });
      }
      typeof E == "object" && typeof w != "undefined"
        ? (w.exports = { polyfill: n })
        : n();
    })();
  });
  function j(n) {
    n.magic(
      "range",
      () =>
        function (e, o, r = 1) {
          typeof o == "undefined" && ((o = e), (e = e ? 1 : 0));
          let i = e > o;
          i && ([e, o] = [o, e]);
          let f = Array.from({ length: (o - e) / r + 1 }, (u, c) => e + c * r);
          return i ? f.reverse() : f;
        }
    );
  }
  var Y = U(I());
  function X(n) {
    Y.default.polyfill(),
      n.magic(
        "scroll",
        () =>
          function (e, o = {}) {
            let r = e,
              i = o.offset ? parseInt(o.offset, 10) : 0;
            if (
              (delete o.offset,
              typeof e == "string" &&
                /^[0-9]+?/g.test(e) &&
                (e = parseInt(e, 10)),
              typeof e == "string" && (e = document.querySelector(e)),
              e instanceof Element &&
                (e = Math.floor(
                  e.getBoundingClientRect().top + window.pageYOffset
                )),
              Number.isInteger(e) && (e = { top: e - i, behavior: "smooth" }),
              typeof e != "object")
            )
              throw Error("Unsupported $scroll target: ", r);
            Object.assign(e, o), window.scroll(e);
          }
      );
  }
  function B(n) {
    let e = (o, r) => {
      if (r[0].length <= o.length) return o;
      let i = "\u2026";
      return (
        typeof r[2] != "undefined" && (i = r[2]),
        Object.prototype.hasOwnProperty.call(r[1], "ellipsis") &&
          (i = r[1].ellipsis),
        o + i
      );
    };
    n.magic(
      "truncate",
      () =>
        function (...o) {
          return typeof o[0] != "string" || !o[1]
            ? o[0]
            : typeof o[1] != "object"
            ? e(o[0].slice(0, o[1]), o)
            : Object.prototype.hasOwnProperty.call(o[1], "words") && o[1].words
            ? e(o[0].split(" ").splice(0, o[1].words).join(" "), o)
            : Object.prototype.hasOwnProperty.call(o[1], "characters") &&
              o[1].characters
            ? e(o[0].slice(0, o[1].characters), o)
            : o[0];
        }
    );
  }
  function L(n) {
    n.magic(
      "dbg",
      (e) =>
        function (...o) {
          let r = o.map((i) => n.raw(i));
          console.log(...r);
        }
    );
  }
  function x(n) {
    let e = n.reactive({ screensize: window.innerWidth }),
      o = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
      r =
        window.AlpineMagicHelpersConfig &&
        window.AlpineMagicHelpersConfig.breakpoints
          ? window.AlpineMagicHelpersConfig.breakpoints
          : o,
      i;
    window.addEventListener("resize", () => {
      clearTimeout(i),
        (i = setTimeout(() => {
          e.screensize = window.innerWidth;
        }, 150));
    }),
      n.magic("screen", (f) => (u) => {
        let c = e.screensize;
        if (Number.isInteger(u)) return u <= c;
        if (r[u] === void 0)
          throw Error(
            "Undefined $screen property: " +
              u +
              ". Supported properties: " +
              Object.keys(r).join(", ")
          );
        return r[u] <= c;
      });
  }
  function P(n) {
    n.magic(
      "interval",
      () =>
        function (...e) {
          if (typeof e[0] != "function") return e[0];
          let o = e[1],
            r = 0,
            i = !1;
          typeof e[1] == "object" &&
            (Object.prototype.hasOwnProperty.call(e[1], "timer") &&
              (o = e[1].timer),
            Object.prototype.hasOwnProperty.call(e[1], "delay") &&
              (r = e[1].delay),
            Object.prototype.hasOwnProperty.call(e[1], "forceInterval") &&
              (i = e[1].forceInterval));
          let f = null,
            u = !0,
            c = () => {
              let g = u ? o + r : o;
              (u = !1),
                (f = setTimeout(() => {
                  e[0].call(this), i ? c() : requestAnimationFrame(c);
                }, g));
            };
          n.effect(() => {
            this.autoIntervalTest == null || this.autoIntervalTest
              ? i
                ? c()
                : requestAnimationFrame(c)
              : clearTimeout(f);
          });
        }
    );
  }
  function C(n) {
    j(n), X(n), B(n), L(n), x(n), P(n);
  }
  document.addEventListener("alpine:initializing", () => {
    C(window.Alpine);
  });
})();
