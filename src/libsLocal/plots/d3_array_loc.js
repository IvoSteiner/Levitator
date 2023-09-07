// https://d3js.org/d3-array/ v3.2.3 Copyright 2010-2023 Mike Bostock
!(function (t, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? n(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], n)
    : n(
        ((t = "undefined" != typeof globalThis ? globalThis : t || self).d3 =
          t.d3 || {})
      );
})(this, function (t) {
  "use strict";
  function n(t, n) {
    return null == t || null == n
      ? NaN
      : t < n
      ? -1
      : t > n
      ? 1
      : t >= n
      ? 0
      : NaN;
  }
  function r(t, n) {
    return null == t || null == n
      ? NaN
      : n < t
      ? -1
      : n > t
      ? 1
      : n >= t
      ? 0
      : NaN;
  }
  function e(t) {
    let e, f, i;
    function u(t, n, r = 0, o = t.length) {
      if (r < o) {
        if (0 !== e(n, n)) return o;
        do {
          const e = (r + o) >>> 1;
          f(t[e], n) < 0 ? (r = e + 1) : (o = e);
        } while (r < o);
      }
      return r;
    }
    return (
      2 !== t.length
        ? ((e = n), (f = (r, e) => n(t(r), e)), (i = (n, r) => t(n) - r))
        : ((e = t === n || t === r ? t : o), (f = t), (i = t)),
      {
        left: u,
        center: function (t, n, r = 0, e = t.length) {
          const o = u(t, n, r, e - 1);
          return o > r && i(t[o - 1], n) > -i(t[o], n) ? o - 1 : o;
        },
        right: function (t, n, r = 0, o = t.length) {
          if (r < o) {
            if (0 !== e(n, n)) return o;
            do {
              const e = (r + o) >>> 1;
              f(t[e], n) <= 0 ? (r = e + 1) : (o = e);
            } while (r < o);
          }
          return r;
        },
      }
    );
  }
  function o() {
    return 0;
  }
  function f(t) {
    return null === t ? NaN : +t;
  }
  function* i(t, n) {
    if (void 0 === n) for (let n of t) null != n && (n = +n) >= n && (yield n);
    else {
      let r = -1;
      for (let e of t) null != (e = n(e, ++r, t)) && (e = +e) >= e && (yield e);
    }
  }
  const u = e(n),
    l = u.right,
    c = u.left,
    s = e(f).center;
  var a = l;
  const h = p(g),
    d = p(function (t) {
      const n = g(t);
      return (t, r, e, o, f) => {
        n(t, r, (e <<= 2) + 0, (o <<= 2) + 0, (f <<= 2)),
          n(t, r, e + 1, o + 1, f),
          n(t, r, e + 2, o + 2, f),
          n(t, r, e + 3, o + 3, f);
      };
    });
  function p(t) {
    return function (n, r, e = r) {
      if (!((r = +r) >= 0)) throw new RangeError("invalid rx");
      if (!((e = +e) >= 0)) throw new RangeError("invalid ry");
      let { data: o, width: f, height: i } = n;
      if (!((f = Math.floor(f)) >= 0)) throw new RangeError("invalid width");
      if (!((i = Math.floor(void 0 !== i ? i : o.length / f)) >= 0))
        throw new RangeError("invalid height");
      if (!f || !i || (!r && !e)) return n;
      const u = r && t(r),
        l = e && t(e),
        c = o.slice();
      return (
        u && l
          ? (y(u, c, o, f, i),
            y(u, o, c, f, i),
            y(u, c, o, f, i),
            m(l, o, c, f, i),
            m(l, c, o, f, i),
            m(l, o, c, f, i))
          : u
          ? (y(u, o, c, f, i), y(u, c, o, f, i), y(u, o, c, f, i))
          : l && (m(l, o, c, f, i), m(l, c, o, f, i), m(l, o, c, f, i)),
        n
      );
    };
  }
  function y(t, n, r, e, o) {
    for (let f = 0, i = e * o; f < i; ) t(n, r, f, (f += e), 1);
  }
  function m(t, n, r, e, o) {
    for (let f = 0, i = e * o; f < e; ++f) t(n, r, f, f + i, e);
  }
  function g(t) {
    const n = Math.floor(t);
    if (n === t)
      return (function (t) {
        const n = 2 * t + 1;
        return (r, e, o, f, i) => {
          if (!((f -= i) >= o)) return;
          let u = t * e[o];
          const l = i * t;
          for (let t = o, n = o + l; t < n; t += i) u += e[Math.min(f, t)];
          for (let t = o, c = f; t <= c; t += i)
            (u += e[Math.min(f, t + l)]),
              (r[t] = u / n),
              (u -= e[Math.max(o, t - l)]);
        };
      })(t);
    const r = t - n,
      e = 2 * t + 1;
    return (t, o, f, i, u) => {
      if (!((i -= u) >= f)) return;
      let l = n * o[f];
      const c = u * n,
        s = c + u;
      for (let t = f, n = f + c; t < n; t += u) l += o[Math.min(i, t)];
      for (let n = f, a = i; n <= a; n += u)
        (l += o[Math.min(i, n + c)]),
          (t[n] =
            (l + r * (o[Math.max(f, n - s)] + o[Math.min(i, n + s)])) / e),
          (l -= o[Math.max(f, n - c)]);
    };
  }
  function v(t, n) {
    let r = 0;
    if (void 0 === n) for (let n of t) null != n && (n = +n) >= n && ++r;
    else {
      let e = -1;
      for (let o of t) null != (o = n(o, ++e, t)) && (o = +o) >= o && ++r;
    }
    return r;
  }
  function M(t) {
    return 0 | t.length;
  }
  function w(t) {
    return !(t > 0);
  }
  function b(t) {
    return "object" != typeof t || "length" in t ? t : Array.from(t);
  }
  function A(t, n) {
    let r,
      e = 0,
      o = 0,
      f = 0;
    if (void 0 === n)
      for (let n of t)
        null != n &&
          (n = +n) >= n &&
          ((r = n - o), (o += r / ++e), (f += r * (n - o)));
    else {
      let i = -1;
      for (let u of t)
        null != (u = n(u, ++i, t)) &&
          (u = +u) >= u &&
          ((r = u - o), (o += r / ++e), (f += r * (u - o)));
    }
    if (e > 1) return f / (e - 1);
  }
  function x(t, n) {
    const r = A(t, n);
    return r ? Math.sqrt(r) : r;
  }
  function N(t, n) {
    let r, e;
    if (void 0 === n)
      for (const n of t)
        null != n &&
          (void 0 === r
            ? n >= n && (r = e = n)
            : (r > n && (r = n), e < n && (e = n)));
    else {
      let o = -1;
      for (let f of t)
        null != (f = n(f, ++o, t)) &&
          (void 0 === r
            ? f >= f && (r = e = f)
            : (r > f && (r = f), e < f && (e = f)));
    }
    return [r, e];
  }
  class E {
    constructor() {
      (this._partials = new Float64Array(32)), (this._n = 0);
    }
    add(t) {
      const n = this._partials;
      let r = 0;
      for (let e = 0; e < this._n && e < 32; e++) {
        const o = n[e],
          f = t + o,
          i = Math.abs(t) < Math.abs(o) ? t - (f - o) : o - (f - t);
        i && (n[r++] = i), (t = f);
      }
      return (n[r] = t), (this._n = r + 1), this;
    }
    valueOf() {
      const t = this._partials;
      let n,
        r,
        e,
        o = this._n,
        f = 0;
      if (o > 0) {
        for (
          f = t[--o];
          o > 0 && ((n = f), (r = t[--o]), (f = n + r), (e = r - (f - n)), !e);

        );
        o > 0 &&
          ((e < 0 && t[o - 1] < 0) || (e > 0 && t[o - 1] > 0)) &&
          ((r = 2 * e), (n = f + r), r == n - f && (f = n));
      }
      return f;
    }
  }
  class InternMap extends Map {
    constructor(t, n = T) {
      if (
        (super(),
        Object.defineProperties(this, {
          _intern: { value: new Map() },
          _key: { value: n },
        }),
        null != t)
      )
        for (const [n, r] of t) this.set(n, r);
    }
    get(t) {
      return super.get(_(this, t));
    }
    has(t) {
      return super.has(_(this, t));
    }
    set(t, n) {
      return super.set(S(this, t), n);
    }
    delete(t) {
      return super.delete(k(this, t));
    }
  }
  class InternSet extends Set {
    constructor(t, n = T) {
      if (
        (super(),
        Object.defineProperties(this, {
          _intern: { value: new Map() },
          _key: { value: n },
        }),
        null != t)
      )
        for (const n of t) this.add(n);
    }
    has(t) {
      return super.has(_(this, t));
    }
    add(t) {
      return super.add(S(this, t));
    }
    delete(t) {
      return super.delete(k(this, t));
    }
  }
  function _({ _intern: t, _key: n }, r) {
    const e = n(r);
    return t.has(e) ? t.get(e) : r;
  }
  function S({ _intern: t, _key: n }, r) {
    const e = n(r);
    return t.has(e) ? t.get(e) : (t.set(e, r), r);
  }
  function k({ _intern: t, _key: n }, r) {
    const e = n(r);
    return t.has(e) && ((r = t.get(e)), t.delete(e)), r;
  }
  function T(t) {
    return null !== t && "object" == typeof t ? t.valueOf() : t;
  }
  function F(t) {
    return t;
  }
  function I(t, ...n) {
    return L(t, F, F, n);
  }
  function j(t, ...n) {
    return L(t, Array.from, F, n);
  }
  function q(t, n) {
    for (let r = 1, e = n.length; r < e; ++r)
      t = t.flatMap((t) => t.pop().map(([n, r]) => [...t, n, r]));
    return t;
  }
  function R(t, n, ...r) {
    return L(t, F, n, r);
  }
  function O(t, n, ...r) {
    return L(t, Array.from, n, r);
  }
  function U(t) {
    if (1 !== t.length) throw new Error("duplicate key");
    return t[0];
  }
  function L(t, n, r, e) {
    return (function t(o, f) {
      if (f >= e.length) return r(o);
      const i = new InternMap(),
        u = e[f++];
      let l = -1;
      for (const t of o) {
        const n = u(t, ++l, o),
          r = i.get(n);
        r ? r.push(t) : i.set(n, [t]);
      }
      for (const [n, r] of i) i.set(n, t(r, f));
      return n(i);
    })(t, 0);
  }
  function P(t, n) {
    return Array.from(n, (n) => t[n]);
  }
  function z(t, ...n) {
    if ("function" != typeof t[Symbol.iterator])
      throw new TypeError("values is not iterable");
    t = Array.from(t);
    let [r] = n;
    if ((r && 2 !== r.length) || n.length > 1) {
      const e = Uint32Array.from(t, (t, n) => n);
      return (
        n.length > 1
          ? ((n = n.map((n) => t.map(n))),
            e.sort((t, r) => {
              for (const e of n) {
                const n = D(e[t], e[r]);
                if (n) return n;
              }
            }))
          : ((r = t.map(r)), e.sort((t, n) => D(r[t], r[n]))),
        P(t, e)
      );
    }
    return t.sort(C(r));
  }
  function C(t = n) {
    if (t === n) return D;
    if ("function" != typeof t)
      throw new TypeError("compare is not a function");
    return (n, r) => {
      const e = t(n, r);
      return e || 0 === e ? e : (0 === t(r, r)) - (0 === t(n, n));
    };
  }
  function D(t, n) {
    return (
      (null == t || !(t >= t)) - (null == n || !(n >= n)) ||
      (t < n ? -1 : t > n ? 1 : 0)
    );
  }
  var G = Array.prototype.slice;
  function B(t) {
    return () => t;
  }
  const H = Math.sqrt(50),
    J = Math.sqrt(10),
    K = Math.sqrt(2);
  function Q(t, n, r) {
    const e = (n - t) / Math.max(0, r),
      o = Math.floor(Math.log10(e)),
      f = e / Math.pow(10, o),
      i = f >= H ? 10 : f >= J ? 5 : f >= K ? 2 : 1;
    let u, l, c;
    return (
      o < 0
        ? ((c = Math.pow(10, -o) / i),
          (u = Math.round(t * c)),
          (l = Math.round(n * c)),
          u / c < t && ++u,
          l / c > n && --l,
          (c = -c))
        : ((c = Math.pow(10, o) * i),
          (u = Math.round(t / c)),
          (l = Math.round(n / c)),
          u * c < t && ++u,
          l * c > n && --l),
      l < u && 0.5 <= r && r < 2 ? Q(t, n, 2 * r) : [u, l, c]
    );
  }
  function V(t, n, r) {
    if (!((r = +r) > 0)) return [];
    if ((t = +t) === (n = +n)) return [t];
    const e = n < t,
      [o, f, i] = e ? Q(n, t, r) : Q(t, n, r);
    if (!(f >= o)) return [];
    const u = f - o + 1,
      l = new Array(u);
    if (e)
      if (i < 0) for (let t = 0; t < u; ++t) l[t] = (f - t) / -i;
      else for (let t = 0; t < u; ++t) l[t] = (f - t) * i;
    else if (i < 0) for (let t = 0; t < u; ++t) l[t] = (o + t) / -i;
    else for (let t = 0; t < u; ++t) l[t] = (o + t) * i;
    return l;
  }
  function W(t, n, r) {
    return Q((t = +t), (n = +n), (r = +r))[2];
  }
  function X(t, n, r) {
    let e;
    for (;;) {
      const o = W(t, n, r);
      if (o === e || 0 === o || !isFinite(o)) return [t, n];
      o > 0
        ? ((t = Math.floor(t / o) * o), (n = Math.ceil(n / o) * o))
        : o < 0 && ((t = Math.ceil(t * o) / o), (n = Math.floor(n * o) / o)),
        (e = o);
    }
  }
  function Y(t) {
    return Math.max(1, Math.ceil(Math.log(v(t)) / Math.LN2) + 1);
  }
  function Z() {
    var t = F,
      n = N,
      r = Y;
    function e(e) {
      Array.isArray(e) || (e = Array.from(e));
      var o,
        f,
        i,
        u = e.length,
        l = new Array(u);
      for (o = 0; o < u; ++o) l[o] = t(e[o], o, e);
      var c = n(l),
        s = c[0],
        h = c[1],
        d = r(l, s, h);
      if (!Array.isArray(d)) {
        const t = h,
          r = +d;
        if (
          (n === N && ([s, h] = X(s, h, r)),
          (d = V(s, h, r))[0] <= s && (i = W(s, h, r)),
          d[d.length - 1] >= h)
        )
          if (t >= h && n === N) {
            const t = W(s, h, r);
            isFinite(t) &&
              (t > 0
                ? (h = (Math.floor(h / t) + 1) * t)
                : t < 0 && (h = (Math.ceil(h * -t) + 1) / -t));
          } else d.pop();
      }
      for (var p = d.length, y = 0, m = p; d[y] <= s; ) ++y;
      for (; d[m - 1] > h; ) --m;
      (y || m < p) && ((d = d.slice(y, m)), (p = m - y));
      var g,
        v = new Array(p + 1);
      for (o = 0; o <= p; ++o)
        ((g = v[o] = []).x0 = o > 0 ? d[o - 1] : s), (g.x1 = o < p ? d[o] : h);
      if (isFinite(i)) {
        if (i > 0)
          for (o = 0; o < u; ++o)
            null != (f = l[o]) &&
              s <= f &&
              f <= h &&
              v[Math.min(p, Math.floor((f - s) / i))].push(e[o]);
        else if (i < 0)
          for (o = 0; o < u; ++o)
            if (null != (f = l[o]) && s <= f && f <= h) {
              const t = Math.floor((s - f) * i);
              v[Math.min(p, t + (d[t] <= f))].push(e[o]);
            }
      } else for (o = 0; o < u; ++o) null != (f = l[o]) && s <= f && f <= h && v[a(d, f, 0, p)].push(e[o]);
      return v;
    }
    return (
      (e.value = function (n) {
        return arguments.length
          ? ((t = "function" == typeof n ? n : B(n)), e)
          : t;
      }),
      (e.domain = function (t) {
        return arguments.length
          ? ((n = "function" == typeof t ? t : B([t[0], t[1]])), e)
          : n;
      }),
      (e.thresholds = function (t) {
        return arguments.length
          ? ((r =
              "function" == typeof t ? t : B(Array.isArray(t) ? G.call(t) : t)),
            e)
          : r;
      }),
      e
    );
  }
  function $(t, n) {
    let r;
    if (void 0 === n)
      for (const n of t)
        null != n && (r < n || (void 0 === r && n >= n)) && (r = n);
    else {
      let e = -1;
      for (let o of t)
        null != (o = n(o, ++e, t)) &&
          (r < o || (void 0 === r && o >= o)) &&
          (r = o);
    }
    return r;
  }
  function tt(t, n) {
    let r,
      e = -1,
      o = -1;
    if (void 0 === n)
      for (const n of t)
        ++o,
          null != n &&
            (r < n || (void 0 === r && n >= n)) &&
            ((r = n), (e = o));
    else
      for (let f of t)
        null != (f = n(f, ++o, t)) &&
          (r < f || (void 0 === r && f >= f)) &&
          ((r = f), (e = o));
    return e;
  }
  function nt(t, n) {
    let r;
    if (void 0 === n)
      for (const n of t)
        null != n && (r > n || (void 0 === r && n >= n)) && (r = n);
    else {
      let e = -1;
      for (let o of t)
        null != (o = n(o, ++e, t)) &&
          (r > o || (void 0 === r && o >= o)) &&
          (r = o);
    }
    return r;
  }
  function rt(t, n) {
    let r,
      e = -1,
      o = -1;
    if (void 0 === n)
      for (const n of t)
        ++o,
          null != n &&
            (r > n || (void 0 === r && n >= n)) &&
            ((r = n), (e = o));
    else
      for (let f of t)
        null != (f = n(f, ++o, t)) &&
          (r > f || (void 0 === r && f >= f)) &&
          ((r = f), (e = o));
    return e;
  }
  function et(t, n, r = 0, e = 1 / 0, o) {
    if (
      ((n = Math.floor(n)),
      (r = Math.floor(Math.max(0, r))),
      (e = Math.floor(Math.min(t.length - 1, e))),
      !(r <= n && n <= e))
    )
      return t;
    for (o = void 0 === o ? D : C(o); e > r; ) {
      if (e - r > 600) {
        const f = e - r + 1,
          i = n - r + 1,
          u = Math.log(f),
          l = 0.5 * Math.exp((2 * u) / 3),
          c = 0.5 * Math.sqrt((u * l * (f - l)) / f) * (i - f / 2 < 0 ? -1 : 1);
        et(
          t,
          n,
          Math.max(r, Math.floor(n - (i * l) / f + c)),
          Math.min(e, Math.floor(n + ((f - i) * l) / f + c)),
          o
        );
      }
      const f = t[n];
      let i = r,
        u = e;
      for (ot(t, r, n), o(t[e], f) > 0 && ot(t, r, e); i < u; ) {
        for (ot(t, i, u), ++i, --u; o(t[i], f) < 0; ) ++i;
        for (; o(t[u], f) > 0; ) --u;
      }
      0 === o(t[r], f) ? ot(t, r, u) : (++u, ot(t, u, e)),
        u <= n && (r = u + 1),
        n <= u && (e = u - 1);
    }
    return t;
  }
  function ot(t, n, r) {
    const e = t[n];
    (t[n] = t[r]), (t[r] = e);
  }
  function ft(t, r = n) {
    let e,
      o = !1;
    if (1 === r.length) {
      let f;
      for (const i of t) {
        const t = r(i);
        (o ? n(t, f) > 0 : 0 === n(t, t)) && ((e = i), (f = t), (o = !0));
      }
    } else for (const n of t) (o ? r(n, e) > 0 : 0 === r(n, n)) && ((e = n), (o = !0));
    return e;
  }
  function it(t, n, r) {
    if ((e = (t = Float64Array.from(i(t, r))).length) && !isNaN((n = +n))) {
      if (n <= 0 || e < 2) return nt(t);
      if (n >= 1) return $(t);
      var e,
        o = (e - 1) * n,
        f = Math.floor(o),
        u = $(et(t, f).subarray(0, f + 1));
      return u + (nt(t.subarray(f + 1)) - u) * (o - f);
    }
  }
  function ut(t, n, r) {
    if ((e = (t = Float64Array.from(i(t, r))).length) && !isNaN((n = +n))) {
      if (n <= 0 || e < 2) return rt(t);
      if (n >= 1) return tt(t);
      var e,
        o = Math.floor((e - 1) * n),
        f = et(
          Uint32Array.from(t, (t, n) => n),
          o,
          0,
          e - 1,
          (n, r) => D(t[n], t[r])
        );
      return ft(f.subarray(0, o + 1), (n) => t[n]);
    }
  }
  function lt(t, n) {
    return [t, n];
  }
  function ct(t, r = n) {
    if (1 === r.length) return rt(t, r);
    let e,
      o = -1,
      f = -1;
    for (const n of t)
      ++f, (o < 0 ? 0 === r(n, n) : r(n, e) < 0) && ((e = n), (o = f));
    return o;
  }
  var st = at(Math.random);
  function at(t) {
    return function (n, r = 0, e = n.length) {
      let o = e - (r = +r);
      for (; o; ) {
        const e = (t() * o--) | 0,
          f = n[o + r];
        (n[o + r] = n[e + r]), (n[e + r] = f);
      }
      return n;
    };
  }
  function ht(t) {
    if (!(o = t.length)) return [];
    for (var n = -1, r = nt(t, dt), e = new Array(r); ++n < r; )
      for (var o, f = -1, i = (e[n] = new Array(o)); ++f < o; ) i[f] = t[f][n];
    return e;
  }
  function dt(t) {
    return t.length;
  }
  function pt(t) {
    return t instanceof InternSet ? t : new InternSet(t);
  }
  function yt(t, n) {
    const r = t[Symbol.iterator](),
      e = new Set();
    for (const t of n) {
      const n = mt(t);
      if (e.has(n)) continue;
      let o, f;
      for (; ({ value: o, done: f } = r.next()); ) {
        if (f) return !1;
        const t = mt(o);
        if ((e.add(t), Object.is(n, t))) break;
      }
    }
    return !0;
  }
  function mt(t) {
    return null !== t && "object" == typeof t ? t.valueOf() : t;
  }
  (t.Adder = E),
    (t.InternMap = InternMap),
    (t.InternSet = InternSet),
    (t.ascending = n),
    (t.bin = Z),
    (t.bisect = a),
    (t.bisectCenter = s),
    (t.bisectLeft = c),
    (t.bisectRight = l),
    (t.bisector = e),
    (t.blur = function (t, n) {
      if (!((n = +n) >= 0)) throw new RangeError("invalid r");
      let r = t.length;
      if (!((r = Math.floor(r)) >= 0)) throw new RangeError("invalid length");
      if (!r || !n) return t;
      const e = g(n),
        o = t.slice();
      return e(t, o, 0, r, 1), e(o, t, 0, r, 1), e(t, o, 0, r, 1), t;
    }),
    (t.blur2 = h),
    (t.blurImage = d),
    (t.count = v),
    (t.cross = function (...t) {
      const n =
          "function" == typeof t[t.length - 1] &&
          (function (t) {
            return (n) => t(...n);
          })(t.pop()),
        r = (t = t.map(b)).map(M),
        e = t.length - 1,
        o = new Array(e + 1).fill(0),
        f = [];
      if (e < 0 || r.some(w)) return f;
      for (;;) {
        f.push(o.map((n, r) => t[r][n]));
        let i = e;
        for (; ++o[i] === r[i]; ) {
          if (0 === i) return n ? f.map(n) : f;
          o[i--] = 0;
        }
      }
    }),
    (t.cumsum = function (t, n) {
      var r = 0,
        e = 0;
      return Float64Array.from(
        t,
        void 0 === n ? (t) => (r += +t || 0) : (o) => (r += +n(o, e++, t) || 0)
      );
    }),
    (t.descending = r),
    (t.deviation = x),
    (t.difference = function (t, ...n) {
      t = new InternSet(t);
      for (const r of n) for (const n of r) t.delete(n);
      return t;
    }),
    (t.disjoint = function (t, n) {
      const r = n[Symbol.iterator](),
        e = new InternSet();
      for (const n of t) {
        if (e.has(n)) return !1;
        let t, o;
        for (; ({ value: t, done: o } = r.next()) && !o; ) {
          if (Object.is(n, t)) return !1;
          e.add(t);
        }
      }
      return !0;
    }),
    (t.every = function (t, n) {
      if ("function" != typeof n) throw new TypeError("test is not a function");
      let r = -1;
      for (const e of t) if (!n(e, ++r, t)) return !1;
      return !0;
    }),
    (t.extent = N),
    (t.fcumsum = function (t, n) {
      const r = new E();
      let e = -1;
      return Float64Array.from(
        t,
        void 0 === n ? (t) => r.add(+t || 0) : (o) => r.add(+n(o, ++e, t) || 0)
      );
    }),
    (t.filter = function (t, n) {
      if ("function" != typeof n) throw new TypeError("test is not a function");
      const r = [];
      let e = -1;
      for (const o of t) n(o, ++e, t) && r.push(o);
      return r;
    }),
    (t.flatGroup = function (t, ...n) {
      return q(j(t, ...n), n);
    }),
    (t.flatRollup = function (t, n, ...r) {
      return q(O(t, n, ...r), r);
    }),
    (t.fsum = function (t, n) {
      const r = new E();
      if (void 0 === n) for (let n of t) (n = +n) && r.add(n);
      else {
        let e = -1;
        for (let o of t) (o = +n(o, ++e, t)) && r.add(o);
      }
      return +r;
    }),
    (t.greatest = ft),
    (t.greatestIndex = function (t, r = n) {
      if (1 === r.length) return tt(t, r);
      let e,
        o = -1,
        f = -1;
      for (const n of t)
        ++f, (o < 0 ? 0 === r(n, n) : r(n, e) > 0) && ((e = n), (o = f));
      return o;
    }),
    (t.group = I),
    (t.groupSort = function (t, r, e) {
      return (
        2 !== r.length
          ? z(R(t, r, e), ([t, r], [e, o]) => n(r, o) || n(t, e))
          : z(I(t, e), ([t, e], [o, f]) => r(e, f) || n(t, o))
      ).map(([t]) => t);
    }),
    (t.groups = j),
    (t.histogram = Z),
    (t.index = function (t, ...n) {
      return L(t, F, U, n);
    }),
    (t.indexes = function (t, ...n) {
      return L(t, Array.from, U, n);
    }),
    (t.intersection = function (t, ...n) {
      (t = new InternSet(t)), (n = n.map(pt));
      t: for (const r of t)
        for (const e of n)
          if (!e.has(r)) {
            t.delete(r);
            continue t;
          }
      return t;
    }),
    (t.least = function (t, r = n) {
      let e,
        o = !1;
      if (1 === r.length) {
        let f;
        for (const i of t) {
          const t = r(i);
          (o ? n(t, f) < 0 : 0 === n(t, t)) && ((e = i), (f = t), (o = !0));
        }
      } else
        for (const n of t)
          (o ? r(n, e) < 0 : 0 === r(n, n)) && ((e = n), (o = !0));
      return e;
    }),
    (t.leastIndex = ct),
    (t.map = function (t, n) {
      if ("function" != typeof t[Symbol.iterator])
        throw new TypeError("values is not iterable");
      if ("function" != typeof n)
        throw new TypeError("mapper is not a function");
      return Array.from(t, (r, e) => n(r, e, t));
    }),
    (t.max = $),
    (t.maxIndex = tt),
    (t.mean = function (t, n) {
      let r = 0,
        e = 0;
      if (void 0 === n)
        for (let n of t) null != n && (n = +n) >= n && (++r, (e += n));
      else {
        let o = -1;
        for (let f of t)
          null != (f = n(f, ++o, t)) && (f = +f) >= f && (++r, (e += f));
      }
      if (r) return e / r;
    }),
    (t.median = function (t, n) {
      return it(t, 0.5, n);
    }),
    (t.medianIndex = function (t, n) {
      return ut(t, 0.5, n);
    }),
    (t.merge = function (t) {
      return Array.from(
        (function* (t) {
          for (const n of t) yield* n;
        })(t)
      );
    }),
    (t.min = nt),
    (t.minIndex = rt),
    (t.mode = function (t, n) {
      const r = new InternMap();
      if (void 0 === n)
        for (let n of t) null != n && n >= n && r.set(n, (r.get(n) || 0) + 1);
      else {
        let e = -1;
        for (let o of t)
          null != (o = n(o, ++e, t)) && o >= o && r.set(o, (r.get(o) || 0) + 1);
      }
      let e,
        o = 0;
      for (const [t, n] of r) n > o && ((o = n), (e = t));
      return e;
    }),
    (t.nice = X),
    (t.pairs = function (t, n = lt) {
      const r = [];
      let e,
        o = !1;
      for (const f of t) o && r.push(n(e, f)), (e = f), (o = !0);
      return r;
    }),
    (t.permute = P),
    (t.quantile = it),
    (t.quantileIndex = ut),
    (t.quantileSorted = function (t, n, r = f) {
      if ((e = t.length) && !isNaN((n = +n))) {
        if (n <= 0 || e < 2) return +r(t[0], 0, t);
        if (n >= 1) return +r(t[e - 1], e - 1, t);
        var e,
          o = (e - 1) * n,
          i = Math.floor(o),
          u = +r(t[i], i, t);
        return u + (+r(t[i + 1], i + 1, t) - u) * (o - i);
      }
    }),
    (t.quickselect = et),
    (t.range = function (t, n, r) {
      (t = +t),
        (n = +n),
        (r =
          (o = arguments.length) < 2 ? ((n = t), (t = 0), 1) : o < 3 ? 1 : +r);
      for (
        var e = -1,
          o = 0 | Math.max(0, Math.ceil((n - t) / r)),
          f = new Array(o);
        ++e < o;

      )
        f[e] = t + e * r;
      return f;
    }),
    (t.rank = function (t, r = n) {
      if ("function" != typeof t[Symbol.iterator])
        throw new TypeError("values is not iterable");
      let e = Array.from(t);
      const o = new Float64Array(e.length);
      2 !== r.length && ((e = e.map(r)), (r = n));
      const f = (t, n) => r(e[t], e[n]);
      let i, u;
      return (
        (t = Uint32Array.from(e, (t, n) => n)).sort(
          r === n ? (t, n) => D(e[t], e[n]) : C(f)
        ),
        t.forEach((t, n) => {
          const r = f(t, void 0 === i ? t : i);
          r >= 0
            ? ((void 0 === i || r > 0) && ((i = t), (u = n)), (o[t] = u))
            : (o[t] = NaN);
        }),
        o
      );
    }),
    (t.reduce = function (t, n, r) {
      if ("function" != typeof n)
        throw new TypeError("reducer is not a function");
      const e = t[Symbol.iterator]();
      let o,
        f,
        i = -1;
      if (arguments.length < 3) {
        if ((({ done: o, value: r } = e.next()), o)) return;
        ++i;
      }
      for (; ({ done: o, value: f } = e.next()), !o; ) r = n(r, f, ++i, t);
      return r;
    }),
    (t.reverse = function (t) {
      if ("function" != typeof t[Symbol.iterator])
        throw new TypeError("values is not iterable");
      return Array.from(t).reverse();
    }),
    (t.rollup = R),
    (t.rollups = O),
    (t.scan = function (t, n) {
      const r = ct(t, n);
      return r < 0 ? void 0 : r;
    }),
    (t.shuffle = st),
    (t.shuffler = at),
    (t.some = function (t, n) {
      if ("function" != typeof n) throw new TypeError("test is not a function");
      let r = -1;
      for (const e of t) if (n(e, ++r, t)) return !0;
      return !1;
    }),
    (t.sort = z),
    (t.subset = function (t, n) {
      return yt(n, t);
    }),
    (t.sum = function (t, n) {
      let r = 0;
      if (void 0 === n) for (let n of t) (n = +n) && (r += n);
      else {
        let e = -1;
        for (let o of t) (o = +n(o, ++e, t)) && (r += o);
      }
      return r;
    }),
    (t.superset = yt),
    (t.thresholdFreedmanDiaconis = function (t, n, r) {
      const e = v(t),
        o = it(t, 0.75) - it(t, 0.25);
      return e && o ? Math.ceil((r - n) / (2 * o * Math.pow(e, -1 / 3))) : 1;
    }),
    (t.thresholdScott = function (t, n, r) {
      const e = v(t),
        o = x(t);
      return e && o ? Math.ceil(((r - n) * Math.cbrt(e)) / (3.49 * o)) : 1;
    }),
    (t.thresholdSturges = Y),
    (t.tickIncrement = W),
    (t.tickStep = function (t, n, r) {
      r = +r;
      const e = (n = +n) < (t = +t),
        o = e ? W(n, t, r) : W(t, n, r);
      return (e ? -1 : 1) * (o < 0 ? 1 / -o : o);
    }),
    (t.ticks = V),
    (t.transpose = ht),
    (t.union = function (...t) {
      const n = new InternSet();
      for (const r of t) for (const t of r) n.add(t);
      return n;
    }),
    (t.variance = A),
    (t.zip = function () {
      return ht(arguments);
    });
});
