// https://d3js.org/d3-time-format/ v4.1.0 Copyright 2010-2021 Mike Bostock
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports, require("d3-time"))
    : "function" == typeof define && define.amd
    ? define(["exports", "d3-time"], t)
    : t(
        ((e = "undefined" != typeof globalThis ? globalThis : e || self).d3 =
          e.d3 || {}),
        e.d3
      );
})(this, function (e, t) {
  "use strict";
  function n(e) {
    if (0 <= e.y && e.y < 100) {
      var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
      return t.setFullYear(e.y), t;
    }
    return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
  }
  function r(e) {
    if (0 <= e.y && e.y < 100) {
      var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
      return t.setUTCFullYear(e.y), t;
    }
    return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
  }
  function u(e, t, n) {
    return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
  }
  function i(e) {
    var i = e.dateTime,
      c = e.date,
      a = e.time,
      f = e.periods,
      l = e.days,
      s = e.shortDays,
      g = e.months,
      G = e.shortMonths,
      ge = d(f),
      pe = y(f),
      we = d(l),
      Se = y(l),
      Ye = d(s),
      Fe = y(s),
      Le = d(g),
      He = y(g),
      Ae = d(G),
      Ze = y(G),
      be = {
        a: function (e) {
          return s[e.getDay()];
        },
        A: function (e) {
          return l[e.getDay()];
        },
        b: function (e) {
          return G[e.getMonth()];
        },
        B: function (e) {
          return g[e.getMonth()];
        },
        c: null,
        d: W,
        e: W,
        f: J,
        g: R,
        G: K,
        H: V,
        I: j,
        j: q,
        L: I,
        m: O,
        M: Q,
        p: function (e) {
          return f[+(e.getHours() >= 12)];
        },
        q: function (e) {
          return 1 + ~~(e.getMonth() / 3);
        },
        Q: Ue,
        s: xe,
        S: X,
        u: N,
        U: B,
        V: _,
        w: $,
        W: z,
        x: null,
        X: null,
        y: E,
        Y: k,
        Z: ee,
        "%": Ce,
      },
      Pe = {
        a: function (e) {
          return s[e.getUTCDay()];
        },
        A: function (e) {
          return l[e.getUTCDay()];
        },
        b: function (e) {
          return G[e.getUTCMonth()];
        },
        B: function (e) {
          return g[e.getUTCMonth()];
        },
        c: null,
        d: te,
        e: te,
        f: ce,
        g: ve,
        G: Me,
        H: ne,
        I: re,
        j: ue,
        L: ie,
        m: oe,
        M: ae,
        p: function (e) {
          return f[+(e.getUTCHours() >= 12)];
        },
        q: function (e) {
          return 1 + ~~(e.getUTCMonth() / 3);
        },
        Q: Ue,
        s: xe,
        S: fe,
        u: le,
        U: se,
        V: de,
        w: ye,
        W: he,
        x: null,
        X: null,
        y: me,
        Y: Te,
        Z: De,
        "%": Ce,
      },
      We = {
        a: function (e, t, n) {
          var r = Ye.exec(t.slice(n));
          return r ? ((e.w = Fe.get(r[0].toLowerCase())), n + r[0].length) : -1;
        },
        A: function (e, t, n) {
          var r = we.exec(t.slice(n));
          return r ? ((e.w = Se.get(r[0].toLowerCase())), n + r[0].length) : -1;
        },
        b: function (e, t, n) {
          var r = Ae.exec(t.slice(n));
          return r ? ((e.m = Ze.get(r[0].toLowerCase())), n + r[0].length) : -1;
        },
        B: function (e, t, n) {
          var r = Le.exec(t.slice(n));
          return r ? ((e.m = He.get(r[0].toLowerCase())), n + r[0].length) : -1;
        },
        c: function (e, t, n) {
          return qe(e, i, t, n);
        },
        d: w,
        e: w,
        f: A,
        g: C,
        G: D,
        H: Y,
        I: Y,
        j: S,
        L: H,
        m: p,
        M: F,
        p: function (e, t, n) {
          var r = ge.exec(t.slice(n));
          return r ? ((e.p = pe.get(r[0].toLowerCase())), n + r[0].length) : -1;
        },
        q: x,
        Q: b,
        s: P,
        S: L,
        u: m,
        U: v,
        V: T,
        w: h,
        W: M,
        x: function (e, t, n) {
          return qe(e, c, t, n);
        },
        X: function (e, t, n) {
          return qe(e, a, t, n);
        },
        y: C,
        Y: D,
        Z: U,
        "%": Z,
      };
    function Ve(e, t) {
      return function (n) {
        var r,
          u,
          i,
          c = [],
          a = -1,
          f = 0,
          l = e.length;
        for (n instanceof Date || (n = new Date(+n)); ++a < l; )
          37 === e.charCodeAt(a) &&
            (c.push(e.slice(f, a)),
            null != (u = o[(r = e.charAt(++a))])
              ? (r = e.charAt(++a))
              : (u = "e" === r ? " " : "0"),
            (i = t[r]) && (r = i(n, u)),
            c.push(r),
            (f = a + 1));
        return c.push(e.slice(f, a)), c.join("");
      };
    }
    function je(e, i) {
      return function (c) {
        var o,
          a,
          f = u(1900, void 0, 1);
        if (qe(f, e, (c += ""), 0) != c.length) return null;
        if ("Q" in f) return new Date(f.Q);
        if ("s" in f) return new Date(1e3 * f.s + ("L" in f ? f.L : 0));
        if (
          (i && !("Z" in f) && (f.Z = 0),
          "p" in f && (f.H = (f.H % 12) + 12 * f.p),
          void 0 === f.m && (f.m = "q" in f ? f.q : 0),
          "V" in f)
        ) {
          if (f.V < 1 || f.V > 53) return null;
          "w" in f || (f.w = 1),
            "Z" in f
              ? ((a = (o = r(u(f.y, 0, 1))).getUTCDay()),
                (o = a > 4 || 0 === a ? t.utcMonday.ceil(o) : t.utcMonday(o)),
                (o = t.utcDay.offset(o, 7 * (f.V - 1))),
                (f.y = o.getUTCFullYear()),
                (f.m = o.getUTCMonth()),
                (f.d = o.getUTCDate() + ((f.w + 6) % 7)))
              : ((a = (o = n(u(f.y, 0, 1))).getDay()),
                (o = a > 4 || 0 === a ? t.timeMonday.ceil(o) : t.timeMonday(o)),
                (o = t.timeDay.offset(o, 7 * (f.V - 1))),
                (f.y = o.getFullYear()),
                (f.m = o.getMonth()),
                (f.d = o.getDate() + ((f.w + 6) % 7)));
        } else ("W" in f || "U" in f) && ("w" in f || (f.w = "u" in f ? f.u % 7 : "W" in f ? 1 : 0), (a = "Z" in f ? r(u(f.y, 0, 1)).getUTCDay() : n(u(f.y, 0, 1)).getDay()), (f.m = 0), (f.d = "W" in f ? ((f.w + 6) % 7) + 7 * f.W - ((a + 5) % 7) : f.w + 7 * f.U - ((a + 6) % 7)));
        return "Z" in f
          ? ((f.H += (f.Z / 100) | 0), (f.M += f.Z % 100), r(f))
          : n(f);
      };
    }
    function qe(e, t, n, r) {
      for (var u, i, c = 0, a = t.length, f = n.length; c < a; ) {
        if (r >= f) return -1;
        if (37 === (u = t.charCodeAt(c++))) {
          if (
            ((u = t.charAt(c++)),
            !(i = We[u in o ? t.charAt(c++) : u]) || (r = i(e, n, r)) < 0)
          )
            return -1;
        } else if (u != n.charCodeAt(r++)) return -1;
      }
      return r;
    }
    return (
      (be.x = Ve(c, be)),
      (be.X = Ve(a, be)),
      (be.c = Ve(i, be)),
      (Pe.x = Ve(c, Pe)),
      (Pe.X = Ve(a, Pe)),
      (Pe.c = Ve(i, Pe)),
      {
        format: function (e) {
          var t = Ve((e += ""), be);
          return (
            (t.toString = function () {
              return e;
            }),
            t
          );
        },
        parse: function (e) {
          var t = je((e += ""), !1);
          return (
            (t.toString = function () {
              return e;
            }),
            t
          );
        },
        utcFormat: function (e) {
          var t = Ve((e += ""), Pe);
          return (
            (t.toString = function () {
              return e;
            }),
            t
          );
        },
        utcParse: function (e) {
          var t = je((e += ""), !0);
          return (
            (t.toString = function () {
              return e;
            }),
            t
          );
        },
      }
    );
  }
  var c,
    o = { "-": "", _: " ", 0: "0" },
    a = /^\s*\d+/,
    f = /^%/,
    l = /[\\^$*+?|[\]().{}]/g;
  function s(e, t, n) {
    var r = e < 0 ? "-" : "",
      u = (r ? -e : e) + "",
      i = u.length;
    return r + (i < n ? new Array(n - i + 1).join(t) + u : u);
  }
  function g(e) {
    return e.replace(l, "\\$&");
  }
  function d(e) {
    return new RegExp("^(?:" + e.map(g).join("|") + ")", "i");
  }
  function y(e) {
    return new Map(e.map((e, t) => [e.toLowerCase(), t]));
  }
  function h(e, t, n) {
    var r = a.exec(t.slice(n, n + 1));
    return r ? ((e.w = +r[0]), n + r[0].length) : -1;
  }
  function m(e, t, n) {
    var r = a.exec(t.slice(n, n + 1));
    return r ? ((e.u = +r[0]), n + r[0].length) : -1;
  }
  function v(e, t, n) {
    var r = a.exec(t.slice(n, n + 2));
    return r ? ((e.U = +r[0]), n + r[0].length) : -1;
  }
  function T(e, t, n) {
    var r = a.exec(t.slice(n, n + 2));
    return r ? ((e.V = +r[0]), n + r[0].length) : -1;
  }
  function M(e, t, n) {
    var r = a.exec(t.slice(n, n + 2));
    return r ? ((e.W = +r[0]), n + r[0].length) : -1;
  }
  function D(e, t, n) {
    var r = a.exec(t.slice(n, n + 4));
    return r ? ((e.y = +r[0]), n + r[0].length) : -1;
  }
  function C(e, t, n) {
    var r = a.exec(t.slice(n, n + 2));
    return r
      ? ((e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), n + r[0].length)
      : -1;
  }
  function U(e, t, n) {
    var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
    return r
      ? ((e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00"))), n + r[0].length)
      : -1;
  }
  function x(e, t, n) {
    var r = a.exec(t.slice(n, n + 1));
    return r ? ((e.q = 3 * r[0] - 3), n + r[0].length) : -1;
  }
  function p(e, t, n) {
    var r = a.exec(t.slice(n, n + 2));
    return r ? ((e.m = r[0] - 1), n + r[0].length) : -1;
  }
  function w(e, t, n) {
    var r = a.exec(t.slice(n, n + 2));
    return r ? ((e.d = +r[0]), n + r[0].length) : -1;
  }
  function S(e, t, n) {
    var r = a.exec(t.slice(n, n + 3));
    return r ? ((e.m = 0), (e.d = +r[0]), n + r[0].length) : -1;
  }
  function Y(e, t, n) {
    var r = a.exec(t.slice(n, n + 2));
    return r ? ((e.H = +r[0]), n + r[0].length) : -1;
  }
  function F(e, t, n) {
    var r = a.exec(t.slice(n, n + 2));
    return r ? ((e.M = +r[0]), n + r[0].length) : -1;
  }
  function L(e, t, n) {
    var r = a.exec(t.slice(n, n + 2));
    return r ? ((e.S = +r[0]), n + r[0].length) : -1;
  }
  function H(e, t, n) {
    var r = a.exec(t.slice(n, n + 3));
    return r ? ((e.L = +r[0]), n + r[0].length) : -1;
  }
  function A(e, t, n) {
    var r = a.exec(t.slice(n, n + 6));
    return r ? ((e.L = Math.floor(r[0] / 1e3)), n + r[0].length) : -1;
  }
  function Z(e, t, n) {
    var r = f.exec(t.slice(n, n + 1));
    return r ? n + r[0].length : -1;
  }
  function b(e, t, n) {
    var r = a.exec(t.slice(n));
    return r ? ((e.Q = +r[0]), n + r[0].length) : -1;
  }
  function P(e, t, n) {
    var r = a.exec(t.slice(n));
    return r ? ((e.s = +r[0]), n + r[0].length) : -1;
  }
  function W(e, t) {
    return s(e.getDate(), t, 2);
  }
  function V(e, t) {
    return s(e.getHours(), t, 2);
  }
  function j(e, t) {
    return s(e.getHours() % 12 || 12, t, 2);
  }
  function q(e, n) {
    return s(1 + t.timeDay.count(t.timeYear(e), e), n, 3);
  }
  function I(e, t) {
    return s(e.getMilliseconds(), t, 3);
  }
  function J(e, t) {
    return I(e, t) + "000";
  }
  function O(e, t) {
    return s(e.getMonth() + 1, t, 2);
  }
  function Q(e, t) {
    return s(e.getMinutes(), t, 2);
  }
  function X(e, t) {
    return s(e.getSeconds(), t, 2);
  }
  function N(e) {
    var t = e.getDay();
    return 0 === t ? 7 : t;
  }
  function B(e, n) {
    return s(t.timeSunday.count(t.timeYear(e) - 1, e), n, 2);
  }
  function G(e) {
    var n = e.getDay();
    return n >= 4 || 0 === n ? t.timeThursday(e) : t.timeThursday.ceil(e);
  }
  function _(e, n) {
    return (
      (e = G(e)),
      s(
        t.timeThursday.count(t.timeYear(e), e) + (4 === t.timeYear(e).getDay()),
        n,
        2
      )
    );
  }
  function $(e) {
    return e.getDay();
  }
  function z(e, n) {
    return s(t.timeMonday.count(t.timeYear(e) - 1, e), n, 2);
  }
  function E(e, t) {
    return s(e.getFullYear() % 100, t, 2);
  }
  function R(e, t) {
    return s((e = G(e)).getFullYear() % 100, t, 2);
  }
  function k(e, t) {
    return s(e.getFullYear() % 1e4, t, 4);
  }
  function K(e, n) {
    var r = e.getDay();
    return s(
      (e =
        r >= 4 || 0 === r
          ? t.timeThursday(e)
          : t.timeThursday.ceil(e)).getFullYear() % 1e4,
      n,
      4
    );
  }
  function ee(e) {
    var t = e.getTimezoneOffset();
    return (
      (t > 0 ? "-" : ((t *= -1), "+")) +
      s((t / 60) | 0, "0", 2) +
      s(t % 60, "0", 2)
    );
  }
  function te(e, t) {
    return s(e.getUTCDate(), t, 2);
  }
  function ne(e, t) {
    return s(e.getUTCHours(), t, 2);
  }
  function re(e, t) {
    return s(e.getUTCHours() % 12 || 12, t, 2);
  }
  function ue(e, n) {
    return s(1 + t.utcDay.count(t.utcYear(e), e), n, 3);
  }
  function ie(e, t) {
    return s(e.getUTCMilliseconds(), t, 3);
  }
  function ce(e, t) {
    return ie(e, t) + "000";
  }
  function oe(e, t) {
    return s(e.getUTCMonth() + 1, t, 2);
  }
  function ae(e, t) {
    return s(e.getUTCMinutes(), t, 2);
  }
  function fe(e, t) {
    return s(e.getUTCSeconds(), t, 2);
  }
  function le(e) {
    var t = e.getUTCDay();
    return 0 === t ? 7 : t;
  }
  function se(e, n) {
    return s(t.utcSunday.count(t.utcYear(e) - 1, e), n, 2);
  }
  function ge(e) {
    var n = e.getUTCDay();
    return n >= 4 || 0 === n ? t.utcThursday(e) : t.utcThursday.ceil(e);
  }
  function de(e, n) {
    return (
      (e = ge(e)),
      s(
        t.utcThursday.count(t.utcYear(e), e) + (4 === t.utcYear(e).getUTCDay()),
        n,
        2
      )
    );
  }
  function ye(e) {
    return e.getUTCDay();
  }
  function he(e, n) {
    return s(t.utcMonday.count(t.utcYear(e) - 1, e), n, 2);
  }
  function me(e, t) {
    return s(e.getUTCFullYear() % 100, t, 2);
  }
  function ve(e, t) {
    return s((e = ge(e)).getUTCFullYear() % 100, t, 2);
  }
  function Te(e, t) {
    return s(e.getUTCFullYear() % 1e4, t, 4);
  }
  function Me(e, n) {
    var r = e.getUTCDay();
    return s(
      (e =
        r >= 4 || 0 === r
          ? t.utcThursday(e)
          : t.utcThursday.ceil(e)).getUTCFullYear() % 1e4,
      n,
      4
    );
  }
  function De() {
    return "+0000";
  }
  function Ce() {
    return "%";
  }
  function Ue(e) {
    return +e;
  }
  function xe(e) {
    return Math.floor(+e / 1e3);
  }
  function pe(t) {
    return (
      (c = i(t)),
      (e.timeFormat = c.format),
      (e.timeParse = c.parse),
      (e.utcFormat = c.utcFormat),
      (e.utcParse = c.utcParse),
      c
    );
  }
  (e.timeFormat = void 0),
    (e.timeParse = void 0),
    (e.utcFormat = void 0),
    (e.utcParse = void 0),
    pe({
      dateTime: "%x, %X",
      date: "%-m/%-d/%Y",
      time: "%-I:%M:%S %p",
      periods: ["AM", "PM"],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      shortMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    });
  var we = "%Y-%m-%dT%H:%M:%S.%LZ";
  var Se = Date.prototype.toISOString
    ? function (e) {
        return e.toISOString();
      }
    : e.utcFormat(we);
  var Ye = +new Date("2000-01-01T00:00:00.000Z")
    ? function (e) {
        var t = new Date(e);
        return isNaN(t) ? null : t;
      }
    : e.utcParse(we);
  (e.isoFormat = Se),
    (e.isoParse = Ye),
    (e.timeFormatDefaultLocale = pe),
    (e.timeFormatLocale = i),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
