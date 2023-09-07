// https://d3js.org/d3-time/ v3.1.0 Copyright 2010-2022 Mike Bostock
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports, require("d3-array"))
    : "function" == typeof define && define.amd
    ? define(["exports", "d3-array"], t)
    : t(
        ((e = "undefined" != typeof globalThis ? globalThis : e || self).d3 =
          e.d3 || {}),
        e.d3
      );
})(this, function (e, t) {
  "use strict";
  const n = new Date(),
    s = new Date();
  function r(e, t, a, u) {
    function i(t) {
      return e((t = 0 === arguments.length ? new Date() : new Date(+t))), t;
    }
    return (
      (i.floor = (t) => (e((t = new Date(+t))), t)),
      (i.ceil = (n) => (e((n = new Date(n - 1))), t(n, 1), e(n), n)),
      (i.round = (e) => {
        const t = i(e),
          n = i.ceil(e);
        return e - t < n - e ? t : n;
      }),
      (i.offset = (e, n) => (
        t((e = new Date(+e)), null == n ? 1 : Math.floor(n)), e
      )),
      (i.range = (n, s, r) => {
        const a = [];
        if (
          ((n = i.ceil(n)),
          (r = null == r ? 1 : Math.floor(r)),
          !(n < s && r > 0))
        )
          return a;
        let u;
        do {
          a.push((u = new Date(+n))), t(n, r), e(n);
        } while (u < n && n < s);
        return a;
      }),
      (i.filter = (n) =>
        r(
          (t) => {
            if (t >= t) for (; e(t), !n(t); ) t.setTime(t - 1);
          },
          (e, s) => {
            if (e >= e)
              if (s < 0) for (; ++s <= 0; ) for (; t(e, -1), !n(e); );
              else for (; --s >= 0; ) for (; t(e, 1), !n(e); );
          }
        )),
      a &&
        ((i.count = (t, r) => (
          n.setTime(+t), s.setTime(+r), e(n), e(s), Math.floor(a(n, s))
        )),
        (i.every = (e) => (
          (e = Math.floor(e)),
          isFinite(e) && e > 0
            ? e > 1
              ? i.filter(
                  u ? (t) => u(t) % e == 0 : (t) => i.count(0, t) % e == 0
                )
              : i
            : null
        ))),
      i
    );
  }
  const a = r(
    () => {},
    (e, t) => {
      e.setTime(+e + t);
    },
    (e, t) => t - e
  );
  a.every = (e) => (
    (e = Math.floor(e)),
    isFinite(e) && e > 0
      ? e > 1
        ? r(
            (t) => {
              t.setTime(Math.floor(t / e) * e);
            },
            (t, n) => {
              t.setTime(+t + n * e);
            },
            (t, n) => (n - t) / e
          )
        : a
      : null
  );
  const u = a.range,
    i = 1e3,
    o = 6e4,
    l = 36e5,
    c = 864e5,
    g = 6048e5,
    T = 2592e6,
    d = 31536e6,
    f = r(
      (e) => {
        e.setTime(e - e.getMilliseconds());
      },
      (e, t) => {
        e.setTime(+e + t * i);
      },
      (e, t) => (t - e) / i,
      (e) => e.getUTCSeconds()
    ),
    m = f.range,
    y = r(
      (e) => {
        e.setTime(e - e.getMilliseconds() - e.getSeconds() * i);
      },
      (e, t) => {
        e.setTime(+e + t * o);
      },
      (e, t) => (t - e) / o,
      (e) => e.getMinutes()
    ),
    M = y.range,
    h = r(
      (e) => {
        e.setUTCSeconds(0, 0);
      },
      (e, t) => {
        e.setTime(+e + t * o);
      },
      (e, t) => (t - e) / o,
      (e) => e.getUTCMinutes()
    ),
    C = h.range,
    U = r(
      (e) => {
        e.setTime(
          e - e.getMilliseconds() - e.getSeconds() * i - e.getMinutes() * o
        );
      },
      (e, t) => {
        e.setTime(+e + t * l);
      },
      (e, t) => (t - e) / l,
      (e) => e.getHours()
    ),
    D = U.range,
    F = r(
      (e) => {
        e.setUTCMinutes(0, 0, 0);
      },
      (e, t) => {
        e.setTime(+e + t * l);
      },
      (e, t) => (t - e) / l,
      (e) => e.getUTCHours()
    ),
    Y = F.range,
    S = r(
      (e) => e.setHours(0, 0, 0, 0),
      (e, t) => e.setDate(e.getDate() + t),
      (e, t) =>
        (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * o) / c,
      (e) => e.getDate() - 1
    ),
    H = S.range,
    p = r(
      (e) => {
        e.setUTCHours(0, 0, 0, 0);
      },
      (e, t) => {
        e.setUTCDate(e.getUTCDate() + t);
      },
      (e, t) => (t - e) / c,
      (e) => e.getUTCDate() - 1
    ),
    v = p.range,
    k = r(
      (e) => {
        e.setUTCHours(0, 0, 0, 0);
      },
      (e, t) => {
        e.setUTCDate(e.getUTCDate() + t);
      },
      (e, t) => (t - e) / c,
      (e) => Math.floor(e / c)
    ),
    w = k.range;
  function W(e) {
    return r(
      (t) => {
        t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)),
          t.setHours(0, 0, 0, 0);
      },
      (e, t) => {
        e.setDate(e.getDate() + 7 * t);
      },
      (e, t) =>
        (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * o) / g
    );
  }
  const x = W(0),
    b = W(1),
    z = W(2),
    O = W(3),
    I = W(4),
    j = W(5),
    q = W(6),
    A = x.range,
    B = b.range,
    E = z.range,
    G = O.range,
    J = I.range,
    K = j.range,
    L = q.range;
  function N(e) {
    return r(
      (t) => {
        t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)),
          t.setUTCHours(0, 0, 0, 0);
      },
      (e, t) => {
        e.setUTCDate(e.getUTCDate() + 7 * t);
      },
      (e, t) => (t - e) / g
    );
  }
  const P = N(0),
    Q = N(1),
    R = N(2),
    V = N(3),
    X = N(4),
    Z = N(5),
    $ = N(6),
    _ = P.range,
    ee = Q.range,
    te = R.range,
    ne = V.range,
    se = X.range,
    re = Z.range,
    ae = $.range,
    ue = r(
      (e) => {
        e.setDate(1), e.setHours(0, 0, 0, 0);
      },
      (e, t) => {
        e.setMonth(e.getMonth() + t);
      },
      (e, t) =>
        t.getMonth() - e.getMonth() + 12 * (t.getFullYear() - e.getFullYear()),
      (e) => e.getMonth()
    ),
    ie = ue.range,
    oe = r(
      (e) => {
        e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
      },
      (e, t) => {
        e.setUTCMonth(e.getUTCMonth() + t);
      },
      (e, t) =>
        t.getUTCMonth() -
        e.getUTCMonth() +
        12 * (t.getUTCFullYear() - e.getUTCFullYear()),
      (e) => e.getUTCMonth()
    ),
    le = oe.range,
    ce = r(
      (e) => {
        e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
      },
      (e, t) => {
        e.setFullYear(e.getFullYear() + t);
      },
      (e, t) => t.getFullYear() - e.getFullYear(),
      (e) => e.getFullYear()
    );
  ce.every = (e) =>
    isFinite((e = Math.floor(e))) && e > 0
      ? r(
          (t) => {
            t.setFullYear(Math.floor(t.getFullYear() / e) * e),
              t.setMonth(0, 1),
              t.setHours(0, 0, 0, 0);
          },
          (t, n) => {
            t.setFullYear(t.getFullYear() + n * e);
          }
        )
      : null;
  const ge = ce.range,
    Te = r(
      (e) => {
        e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
      },
      (e, t) => {
        e.setUTCFullYear(e.getUTCFullYear() + t);
      },
      (e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
      (e) => e.getUTCFullYear()
    );
  Te.every = (e) =>
    isFinite((e = Math.floor(e))) && e > 0
      ? r(
          (t) => {
            t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e),
              t.setUTCMonth(0, 1),
              t.setUTCHours(0, 0, 0, 0);
          },
          (t, n) => {
            t.setUTCFullYear(t.getUTCFullYear() + n * e);
          }
        )
      : null;
  const de = Te.range;
  function fe(e, n, s, r, u, m) {
    const y = [
      [f, 1, i],
      [f, 5, 5e3],
      [f, 15, 15e3],
      [f, 30, 3e4],
      [m, 1, o],
      [m, 5, 3e5],
      [m, 15, 9e5],
      [m, 30, 18e5],
      [u, 1, l],
      [u, 3, 108e5],
      [u, 6, 216e5],
      [u, 12, 432e5],
      [r, 1, c],
      [r, 2, 1728e5],
      [s, 1, g],
      [n, 1, T],
      [n, 3, 7776e6],
      [e, 1, d],
    ];
    function M(n, s, r) {
      const u = Math.abs(s - n) / r,
        i = t.bisector(([, , e]) => e).right(y, u);
      if (i === y.length) return e.every(t.tickStep(n / d, s / d, r));
      if (0 === i) return a.every(Math.max(t.tickStep(n, s, r), 1));
      const [o, l] = y[u / y[i - 1][2] < y[i][2] / u ? i - 1 : i];
      return o.every(l);
    }
    return [
      function (e, t, n) {
        const s = t < e;
        s && ([e, t] = [t, e]);
        const r = n && "function" == typeof n.range ? n : M(e, t, n),
          a = r ? r.range(e, +t + 1) : [];
        return s ? a.reverse() : a;
      },
      M,
    ];
  }
  const [me, ye] = fe(Te, oe, P, k, F, h),
    [Me, he] = fe(ce, ue, x, S, U, y);
  (e.timeDay = S),
    (e.timeDays = H),
    (e.timeFriday = j),
    (e.timeFridays = K),
    (e.timeHour = U),
    (e.timeHours = D),
    (e.timeInterval = r),
    (e.timeMillisecond = a),
    (e.timeMilliseconds = u),
    (e.timeMinute = y),
    (e.timeMinutes = M),
    (e.timeMonday = b),
    (e.timeMondays = B),
    (e.timeMonth = ue),
    (e.timeMonths = ie),
    (e.timeSaturday = q),
    (e.timeSaturdays = L),
    (e.timeSecond = f),
    (e.timeSeconds = m),
    (e.timeSunday = x),
    (e.timeSundays = A),
    (e.timeThursday = I),
    (e.timeThursdays = J),
    (e.timeTickInterval = he),
    (e.timeTicks = Me),
    (e.timeTuesday = z),
    (e.timeTuesdays = E),
    (e.timeWednesday = O),
    (e.timeWednesdays = G),
    (e.timeWeek = x),
    (e.timeWeeks = A),
    (e.timeYear = ce),
    (e.timeYears = ge),
    (e.unixDay = k),
    (e.unixDays = w),
    (e.utcDay = p),
    (e.utcDays = v),
    (e.utcFriday = Z),
    (e.utcFridays = re),
    (e.utcHour = F),
    (e.utcHours = Y),
    (e.utcMillisecond = a),
    (e.utcMilliseconds = u),
    (e.utcMinute = h),
    (e.utcMinutes = C),
    (e.utcMonday = Q),
    (e.utcMondays = ee),
    (e.utcMonth = oe),
    (e.utcMonths = le),
    (e.utcSaturday = $),
    (e.utcSaturdays = ae),
    (e.utcSecond = f),
    (e.utcSeconds = m),
    (e.utcSunday = P),
    (e.utcSundays = _),
    (e.utcThursday = X),
    (e.utcThursdays = se),
    (e.utcTickInterval = ye),
    (e.utcTicks = me),
    (e.utcTuesday = R),
    (e.utcTuesdays = te),
    (e.utcWednesday = V),
    (e.utcWednesdays = ne),
    (e.utcWeek = P),
    (e.utcWeeks = _),
    (e.utcYear = Te),
    (e.utcYears = de);
});
