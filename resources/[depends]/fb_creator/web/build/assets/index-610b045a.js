(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
    new MutationObserver(l => {
        for (const i of l)
            if (i.type === "childList")
                for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(l) {
        const i = {};
        return l.integrity && (i.integrity = l.integrity), l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy), l.crossOrigin === "use-credentials" ? i.credentials = "include" : l.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
    }

    function r(l) {
        if (l.ep) return;
        l.ep = !0;
        const i = n(l);
        fetch(l.href, i)
    }
})();

function gc(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var ns = {
        exports: {}
    },
    fl = {},
    rs = {
        exports: {}
    },
    M = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lr = Symbol.for("react.element"),
    yc = Symbol.for("react.portal"),
    vc = Symbol.for("react.fragment"),
    wc = Symbol.for("react.strict_mode"),
    _c = Symbol.for("react.profiler"),
    kc = Symbol.for("react.provider"),
    Sc = Symbol.for("react.context"),
    xc = Symbol.for("react.forward_ref"),
    Cc = Symbol.for("react.suspense"),
    Ec = Symbol.for("react.memo"),
    Nc = Symbol.for("react.lazy"),
    Ko = Symbol.iterator;

function Pc(e) {
    return e === null || typeof e != "object" ? null : (e = Ko && e[Ko] || e["@@iterator"], typeof e == "function" ? e : null)
}
var ls = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    },
    is = Object.assign,
    os = {};

function gn(e, t, n) {
    this.props = e, this.context = t, this.refs = os, this.updater = n || ls
}
gn.prototype.isReactComponent = {};
gn.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
};
gn.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
};

function us() {}
us.prototype = gn.prototype;

function Gi(e, t, n) {
    this.props = e, this.context = t, this.refs = os, this.updater = n || ls
}
var Zi = Gi.prototype = new us;
Zi.constructor = Gi;
is(Zi, gn.prototype);
Zi.isPureReactComponent = !0;
var Xo = Array.isArray,
    ss = Object.prototype.hasOwnProperty,
    Ji = {
        current: null
    },
    as = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function cs(e, t, n) {
    var r, l = {},
        i = null,
        o = null;
    if (t != null)
        for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) ss.call(t, r) && !as.hasOwnProperty(r) && (l[r] = t[r]);
    var u = arguments.length - 2;
    if (u === 1) l.children = n;
    else if (1 < u) {
        for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
        l.children = s
    }
    if (e && e.defaultProps)
        for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
    return {
        $$typeof: lr,
        type: e,
        key: i,
        ref: o,
        props: l,
        _owner: Ji.current
    }
}

function zc(e, t) {
    return {
        $$typeof: lr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}

function qi(e) {
    return typeof e == "object" && e !== null && e.$$typeof === lr
}

function Tc(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var Yo = /\/+/g;

function Ll(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? Tc("" + e.key) : t.toString(36)
}

function Lr(e, t, n, r, l) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var o = !1;
    if (e === null) o = !0;
    else switch (i) {
        case "string":
        case "number":
            o = !0;
            break;
        case "object":
            switch (e.$$typeof) {
                case lr:
                case yc:
                    o = !0
            }
    }
    if (o) return o = e, l = l(o), e = r === "" ? "." + Ll(o, 0) : r, Xo(l) ? (n = "", e != null && (n = e.replace(Yo, "$&/") + "/"), Lr(l, t, n, "", function(c) {
        return c
    })) : l != null && (qi(l) && (l = zc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Yo, "$&/") + "/") + e)), t.push(l)), 1;
    if (o = 0, r = r === "" ? "." : r + ":", Xo(e))
        for (var u = 0; u < e.length; u++) {
            i = e[u];
            var s = r + Ll(i, u);
            o += Lr(i, t, n, s, l)
        } else if (s = Pc(e), typeof s == "function")
            for (e = s.call(e), u = 0; !(i = e.next()).done;) i = i.value, s = r + Ll(i, u++), o += Lr(i, t, n, s, l);
        else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return o
}

function dr(e, t, n) {
    if (e == null) return e;
    var r = [],
        l = 0;
    return Lr(e, r, "", "", function(i) {
        return t.call(n, i, l++)
    }), r
}

function Lc(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(), t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n)
        }), e._status === -1 && (e._status = 0, e._result = t)
    }
    if (e._status === 1) return e._result.default;
    throw e._result
}
var ge = {
        current: null
    },
    Ir = {
        transition: null
    },
    Ic = {
        ReactCurrentDispatcher: ge,
        ReactCurrentBatchConfig: Ir,
        ReactCurrentOwner: Ji
    };

function ds() {
    throw Error("act(...) is not supported in production builds of React.")
}
M.Children = {
    map: dr,
    forEach: function(e, t, n) {
        dr(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return dr(e, function() {
            t++
        }), t
    },
    toArray: function(e) {
        return dr(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!qi(e)) throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
M.Component = gn;
M.Fragment = vc;
M.Profiler = _c;
M.PureComponent = Gi;
M.StrictMode = wc;
M.Suspense = Cc;
M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ic;
M.act = ds;
M.cloneElement = function(e, t, n) {
    if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = is({}, e.props),
        l = e.key,
        i = e.ref,
        o = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (i = t.ref, o = Ji.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
        for (s in t) ss.call(t, s) && !as.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s])
    }
    var s = arguments.length - 2;
    if (s === 1) r.children = n;
    else if (1 < s) {
        u = Array(s);
        for (var c = 0; c < s; c++) u[c] = arguments[c + 2];
        r.children = u
    }
    return {
        $$typeof: lr,
        type: e.type,
        key: l,
        ref: i,
        props: r,
        _owner: o
    }
};
M.createContext = function(e) {
    return e = {
        $$typeof: Sc,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    }, e.Provider = {
        $$typeof: kc,
        _context: e
    }, e.Consumer = e
};
M.createElement = cs;
M.createFactory = function(e) {
    var t = cs.bind(null, e);
    return t.type = e, t
};
M.createRef = function() {
    return {
        current: null
    }
};
M.forwardRef = function(e) {
    return {
        $$typeof: xc,
        render: e
    }
};
M.isValidElement = qi;
M.lazy = function(e) {
    return {
        $$typeof: Nc,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: Lc
    }
};
M.memo = function(e, t) {
    return {
        $$typeof: Ec,
        type: e,
        compare: t === void 0 ? null : t
    }
};
M.startTransition = function(e) {
    var t = Ir.transition;
    Ir.transition = {};
    try {
        e()
    } finally {
        Ir.transition = t
    }
};
M.unstable_act = ds;
M.useCallback = function(e, t) {
    return ge.current.useCallback(e, t)
};
M.useContext = function(e) {
    return ge.current.useContext(e)
};
M.useDebugValue = function() {};
M.useDeferredValue = function(e) {
    return ge.current.useDeferredValue(e)
};
M.useEffect = function(e, t) {
    return ge.current.useEffect(e, t)
};
M.useId = function() {
    return ge.current.useId()
};
M.useImperativeHandle = function(e, t, n) {
    return ge.current.useImperativeHandle(e, t, n)
};
M.useInsertionEffect = function(e, t) {
    return ge.current.useInsertionEffect(e, t)
};
M.useLayoutEffect = function(e, t) {
    return ge.current.useLayoutEffect(e, t)
};
M.useMemo = function(e, t) {
    return ge.current.useMemo(e, t)
};
M.useReducer = function(e, t, n) {
    return ge.current.useReducer(e, t, n)
};
M.useRef = function(e) {
    return ge.current.useRef(e)
};
M.useState = function(e) {
    return ge.current.useState(e)
};
M.useSyncExternalStore = function(e, t, n) {
    return ge.current.useSyncExternalStore(e, t, n)
};
M.useTransition = function() {
    return ge.current.useTransition()
};
M.version = "18.3.1";
rs.exports = M;
var Y = rs.exports;
const Dc = gc(Y);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rc = Y,
    Oc = Symbol.for("react.element"),
    Mc = Symbol.for("react.fragment"),
    Fc = Object.prototype.hasOwnProperty,
    jc = Rc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    $c = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function fs(e, t, n) {
    var r, l = {},
        i = null,
        o = null;
    n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
    for (r in t) Fc.call(t, r) && !$c.hasOwnProperty(r) && (l[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
    return {
        $$typeof: Oc,
        type: e,
        key: i,
        ref: o,
        props: l,
        _owner: jc.current
    }
}
fl.Fragment = Mc;
fl.jsx = fs;
fl.jsxs = fs;
ns.exports = fl;
var bi = ns.exports;
const pl = bi.Fragment,
    S = bi.jsx,
    U = bi.jsxs;
var ni = {},
    ps = {
        exports: {}
    },
    Pe = {},
    ms = {
        exports: {}
    },
    hs = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(x, I) {
        var D = x.length;
        x.push(I);
        e: for (; 0 < D;) {
            var $ = D - 1 >>> 1,
                X = x[$];
            if (0 < l(X, I)) x[$] = I, x[D] = X, D = $;
            else break e
        }
    }

    function n(x) {
        return x.length === 0 ? null : x[0]
    }

    function r(x) {
        if (x.length === 0) return null;
        var I = x[0],
            D = x.pop();
        if (D !== I) {
            x[0] = D;
            e: for (var $ = 0, X = x.length, it = X >>> 1; $ < it;) {
                var Pt = 2 * ($ + 1) - 1,
                    Tl = x[Pt],
                    zt = Pt + 1,
                    cr = x[zt];
                if (0 > l(Tl, D)) zt < X && 0 > l(cr, Tl) ? (x[$] = cr, x[zt] = D, $ = zt) : (x[$] = Tl, x[Pt] = D, $ = Pt);
                else if (zt < X && 0 > l(cr, D)) x[$] = cr, x[zt] = D, $ = zt;
                else break e
            }
        }
        return I
    }

    function l(x, I) {
        var D = x.sortIndex - I.sortIndex;
        return D !== 0 ? D : x.id - I.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var i = performance;
        e.unstable_now = function() {
            return i.now()
        }
    } else {
        var o = Date,
            u = o.now();
        e.unstable_now = function() {
            return o.now() - u
        }
    }
    var s = [],
        c = [],
        h = 1,
        m = null,
        p = 3,
        w = !1,
        _ = !1,
        k = !1,
        R = typeof setTimeout == "function" ? setTimeout : null,
        d = typeof clearTimeout == "function" ? clearTimeout : null,
        a = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

    function f(x) {
        for (var I = n(c); I !== null;) {
            if (I.callback === null) r(c);
            else if (I.startTime <= x) r(c), I.sortIndex = I.expirationTime, t(s, I);
            else break;
            I = n(c)
        }
    }

    function g(x) {
        if (k = !1, f(x), !_)
            if (n(s) !== null) _ = !0, Be(C);
            else {
                var I = n(c);
                I !== null && Ye(g, I.startTime - x)
            }
    }

    function C(x, I) {
        _ = !1, k && (k = !1, d(z), z = -1), w = !0;
        var D = p;
        try {
            for (f(I), m = n(s); m !== null && (!(m.expirationTime > I) || x && !L());) {
                var $ = m.callback;
                if (typeof $ == "function") {
                    m.callback = null, p = m.priorityLevel;
                    var X = $(m.expirationTime <= I);
                    I = e.unstable_now(), typeof X == "function" ? m.callback = X : m === n(s) && r(s), f(I)
                } else r(s);
                m = n(s)
            }
            if (m !== null) var it = !0;
            else {
                var Pt = n(c);
                Pt !== null && Ye(g, Pt.startTime - I), it = !1
            }
            return it
        } finally {
            m = null, p = D, w = !1
        }
    }
    var N = !1,
        P = null,
        z = -1,
        K = 5,
        O = -1;

    function L() {
        return !(e.unstable_now() - O < K)
    }

    function F() {
        if (P !== null) {
            var x = e.unstable_now();
            O = x;
            var I = !0;
            try {
                I = P(!0, x)
            } finally {
                I ? T() : (N = !1, P = null)
            }
        } else N = !1
    }
    var T;
    if (typeof a == "function") T = function() {
        a(F)
    };
    else if (typeof MessageChannel < "u") {
        var B = new MessageChannel,
            oe = B.port2;
        B.port1.onmessage = F, T = function() {
            oe.postMessage(null)
        }
    } else T = function() {
        R(F, 0)
    };

    function Be(x) {
        P = x, N || (N = !0, T())
    }

    function Ye(x, I) {
        z = R(function() {
            x(e.unstable_now())
        }, I)
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(x) {
        x.callback = null
    }, e.unstable_continueExecution = function() {
        _ || w || (_ = !0, Be(C))
    }, e.unstable_forceFrameRate = function(x) {
        0 > x || 125 < x ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : K = 0 < x ? Math.floor(1e3 / x) : 5
    }, e.unstable_getCurrentPriorityLevel = function() {
        return p
    }, e.unstable_getFirstCallbackNode = function() {
        return n(s)
    }, e.unstable_next = function(x) {
        switch (p) {
            case 1:
            case 2:
            case 3:
                var I = 3;
                break;
            default:
                I = p
        }
        var D = p;
        p = I;
        try {
            return x()
        } finally {
            p = D
        }
    }, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(x, I) {
        switch (x) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                x = 3
        }
        var D = p;
        p = x;
        try {
            return I()
        } finally {
            p = D
        }
    }, e.unstable_scheduleCallback = function(x, I, D) {
        var $ = e.unstable_now();
        switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? $ + D : $) : D = $, x) {
            case 1:
                var X = -1;
                break;
            case 2:
                X = 250;
                break;
            case 5:
                X = 1073741823;
                break;
            case 4:
                X = 1e4;
                break;
            default:
                X = 5e3
        }
        return X = D + X, x = {
            id: h++,
            callback: I,
            priorityLevel: x,
            startTime: D,
            expirationTime: X,
            sortIndex: -1
        }, D > $ ? (x.sortIndex = D, t(c, x), n(s) === null && x === n(c) && (k ? (d(z), z = -1) : k = !0, Ye(g, D - $))) : (x.sortIndex = X, t(s, x), _ || w || (_ = !0, Be(C))), x
    }, e.unstable_shouldYield = L, e.unstable_wrapCallback = function(x) {
        var I = p;
        return function() {
            var D = p;
            p = I;
            try {
                return x.apply(this, arguments)
            } finally {
                p = D
            }
        }
    }
})(hs);
ms.exports = hs;
var Ac = ms.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uc = Y,
    Ne = Ac;

function y(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var gs = new Set,
    Un = {};

function Vt(e, t) {
    an(e, t), an(e + "Capture", t)
}

function an(e, t) {
    for (Un[e] = t, e = 0; e < t.length; e++) gs.add(t[e])
}
var et = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    ri = Object.prototype.hasOwnProperty,
    Vc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Go = {},
    Zo = {};

function Bc(e) {
    return ri.call(Zo, e) ? !0 : ri.call(Go, e) ? !1 : Vc.test(e) ? Zo[e] = !0 : (Go[e] = !0, !1)
}

function Hc(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
        default:
            return !1
    }
}

function Wc(e, t, n, r) {
    if (t === null || typeof t > "u" || Hc(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
    }
    return !1
}

function ye(e, t, n, r, l, i, o) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o
}
var ae = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    ae[e] = new ye(e, 0, !1, e, null, !1, !1)
});
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"]
].forEach(function(e) {
    var t = e[0];
    ae[t] = new ye(t, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    ae[e] = new ye(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    ae[e] = new ye(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    ae[e] = new ye(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    ae[e] = new ye(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function(e) {
    ae[e] = new ye(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    ae[e] = new ye(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function(e) {
    ae[e] = new ye(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var eo = /[\-:]([a-z])/g;

function to(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(eo, to);
    ae[t] = new ye(t, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(eo, to);
    ae[t] = new ye(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(eo, to);
    ae[t] = new ye(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    ae[e] = new ye(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
ae.xlinkHref = new ye("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
    ae[e] = new ye(e, 1, !1, e.toLowerCase(), null, !0, !0)
});

function no(e, t, n, r) {
    var l = ae.hasOwnProperty(t) ? ae[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Wc(t, n, l, r) && (n = null), r || l === null ? Bc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var lt = Uc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    fr = Symbol.for("react.element"),
    Wt = Symbol.for("react.portal"),
    Qt = Symbol.for("react.fragment"),
    ro = Symbol.for("react.strict_mode"),
    li = Symbol.for("react.profiler"),
    ys = Symbol.for("react.provider"),
    vs = Symbol.for("react.context"),
    lo = Symbol.for("react.forward_ref"),
    ii = Symbol.for("react.suspense"),
    oi = Symbol.for("react.suspense_list"),
    io = Symbol.for("react.memo"),
    ut = Symbol.for("react.lazy"),
    ws = Symbol.for("react.offscreen"),
    Jo = Symbol.iterator;

function wn(e) {
    return e === null || typeof e != "object" ? null : (e = Jo && e[Jo] || e["@@iterator"], typeof e == "function" ? e : null)
}
var J = Object.assign,
    Il;

function Pn(e) {
    if (Il === void 0) try {
        throw Error()
    } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Il = t && t[1] || ""
    }
    return `
` + Il + e
}
var Dl = !1;

function Rl(e, t) {
    if (!e || Dl) return "";
    Dl = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                    throw Error()
                }, Object.defineProperty(t.prototype, "props", {
                    set: function() {
                        throw Error()
                    }
                }), typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (c) {
                    var r = c
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (c) {
                    r = c
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (c) {
                r = c
            }
            e()
        }
    } catch (c) {
        if (c && r && typeof c.stack == "string") {
            for (var l = c.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, u = i.length - 1; 1 <= o && 0 <= u && l[o] !== i[u];) u--;
            for (; 1 <= o && 0 <= u; o--, u--)
                if (l[o] !== i[u]) {
                    if (o !== 1 || u !== 1)
                        do
                            if (o--, u--, 0 > u || l[o] !== i[u]) {
                                var s = `
` + l[o].replace(" at new ", " at ");
                                return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s
                            } while (1 <= o && 0 <= u);
                    break
                }
        }
    } finally {
        Dl = !1, Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? Pn(e) : ""
}

function Qc(e) {
    switch (e.tag) {
        case 5:
            return Pn(e.type);
        case 16:
            return Pn("Lazy");
        case 13:
            return Pn("Suspense");
        case 19:
            return Pn("SuspenseList");
        case 0:
        case 2:
        case 15:
            return e = Rl(e.type, !1), e;
        case 11:
            return e = Rl(e.type.render, !1), e;
        case 1:
            return e = Rl(e.type, !0), e;
        default:
            return ""
    }
}

function ui(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case Qt:
            return "Fragment";
        case Wt:
            return "Portal";
        case li:
            return "Profiler";
        case ro:
            return "StrictMode";
        case ii:
            return "Suspense";
        case oi:
            return "SuspenseList"
    }
    if (typeof e == "object") switch (e.$$typeof) {
        case vs:
            return (e.displayName || "Context") + ".Consumer";
        case ys:
            return (e._context.displayName || "Context") + ".Provider";
        case lo:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case io:
            return t = e.displayName || null, t !== null ? t : ui(e.type) || "Memo";
        case ut:
            t = e._payload, e = e._init;
            try {
                return ui(e(t))
            } catch {}
    }
    return null
}

function Kc(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return ui(t);
        case 8:
            return t === ro ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t
    }
    return null
}

function St(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
    }
}

function _s(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}

function Xc(e) {
    var t = _s(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var l = n.get,
            i = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return l.call(this)
            },
            set: function(o) {
                r = "" + o, i.call(this, o)
            }
        }), Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }), {
            getValue: function() {
                return r
            },
            setValue: function(o) {
                r = "" + o
            },
            stopTracking: function() {
                e._valueTracker = null, delete e[t]
            }
        }
    }
}

function pr(e) {
    e._valueTracker || (e._valueTracker = Xc(e))
}

function ks(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return e && (r = _s(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
}

function Br(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}

function si(e, t) {
    var n = t.checked;
    return J({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}

function qo(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    n = St(t.value != null ? t.value : n), e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}

function Ss(e, t) {
    t = t.checked, t != null && no(e, "checked", t, !1)
}

function ai(e, t) {
    Ss(e, t);
    var n = St(t.value),
        r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? ci(e, t.type, n) : t.hasOwnProperty("defaultValue") && ci(e, t.type, St(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}

function bo(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n)
}

function ci(e, t, n) {
    (t !== "number" || Br(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var zn = Array.isArray;

function nn(e, t, n, r) {
    if (e = e.options, t) {
        t = {};
        for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
        for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + St(n), t = null, l = 0; l < e.length; l++) {
            if (e[l].value === n) {
                e[l].selected = !0, r && (e[l].defaultSelected = !0);
                return
            }
            t !== null || e[l].disabled || (t = e[l])
        }
        t !== null && (t.selected = !0)
    }
}

function di(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(y(91));
    return J({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}

function eu(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children, t = t.defaultValue, n != null) {
            if (t != null) throw Error(y(92));
            if (zn(n)) {
                if (1 < n.length) throw Error(y(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""), n = t
    }
    e._wrapperState = {
        initialValue: St(n)
    }
}

function xs(e, t) {
    var n = St(t.value),
        r = St(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r)
}

function tu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}

function Cs(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml"
    }
}

function fi(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Cs(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var mr, Es = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, l)
        })
    } : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
        for (mr = mr || document.createElement("div"), mr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = mr.firstChild; e.firstChild;) e.removeChild(e.firstChild);
        for (; t.firstChild;) e.appendChild(t.firstChild)
    }
});

function Vn(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var In = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    },
    Yc = ["Webkit", "ms", "Moz", "O"];
Object.keys(In).forEach(function(e) {
    Yc.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), In[t] = In[e]
    })
});

function Ns(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || In.hasOwnProperty(e) && In[e] ? ("" + t).trim() : t + "px"
}

function Ps(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                l = Ns(n, t[n], r);
            n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l
        }
}
var Gc = J({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});

function pi(e, t) {
    if (t) {
        if (Gc[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(y(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(y(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(y(61))
        }
        if (t.style != null && typeof t.style != "object") throw Error(y(62))
    }
}

function mi(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
    }
}
var hi = null;

function oo(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
}
var gi = null,
    rn = null,
    ln = null;

function nu(e) {
    if (e = ur(e)) {
        if (typeof gi != "function") throw Error(y(280));
        var t = e.stateNode;
        t && (t = vl(t), gi(e.stateNode, e.type, t))
    }
}

function zs(e) {
    rn ? ln ? ln.push(e) : ln = [e] : rn = e
}

function Ts() {
    if (rn) {
        var e = rn,
            t = ln;
        if (ln = rn = null, nu(e), t)
            for (e = 0; e < t.length; e++) nu(t[e])
    }
}

function Ls(e, t) {
    return e(t)
}

function Is() {}
var Ol = !1;

function Ds(e, t, n) {
    if (Ol) return e(t, n);
    Ol = !0;
    try {
        return Ls(e, t, n)
    } finally {
        Ol = !1, (rn !== null || ln !== null) && (Is(), Ts())
    }
}

function Bn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = vl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
            break e;
        default:
            e = !1
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(y(231, t, typeof n));
    return n
}
var yi = !1;
if (et) try {
    var _n = {};
    Object.defineProperty(_n, "passive", {
        get: function() {
            yi = !0
        }
    }), window.addEventListener("test", _n, _n), window.removeEventListener("test", _n, _n)
} catch {
    yi = !1
}

function Zc(e, t, n, r, l, i, o, u, s) {
    var c = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, c)
    } catch (h) {
        this.onError(h)
    }
}
var Dn = !1,
    Hr = null,
    Wr = !1,
    vi = null,
    Jc = {
        onError: function(e) {
            Dn = !0, Hr = e
        }
    };

function qc(e, t, n, r, l, i, o, u, s) {
    Dn = !1, Hr = null, Zc.apply(Jc, arguments)
}

function bc(e, t, n, r, l, i, o, u, s) {
    if (qc.apply(this, arguments), Dn) {
        if (Dn) {
            var c = Hr;
            Dn = !1, Hr = null
        } else throw Error(y(198));
        Wr || (Wr = !0, vi = c)
    }
}

function Bt(e) {
    var t = e,
        n = e;
    if (e.alternate)
        for (; t.return;) t = t.return;
    else {
        e = t;
        do t = e, t.flags & 4098 && (n = t.return), e = t.return; while (e)
    }
    return t.tag === 3 ? n : null
}

function Rs(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
    }
    return null
}

function ru(e) {
    if (Bt(e) !== e) throw Error(y(188))
}

function ed(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Bt(e), t === null) throw Error(y(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t;;) {
        var l = n.return;
        if (l === null) break;
        var i = l.alternate;
        if (i === null) {
            if (r = l.return, r !== null) {
                n = r;
                continue
            }
            break
        }
        if (l.child === i.child) {
            for (i = l.child; i;) {
                if (i === n) return ru(l), e;
                if (i === r) return ru(l), t;
                i = i.sibling
            }
            throw Error(y(188))
        }
        if (n.return !== r.return) n = l, r = i;
        else {
            for (var o = !1, u = l.child; u;) {
                if (u === n) {
                    o = !0, n = l, r = i;
                    break
                }
                if (u === r) {
                    o = !0, r = l, n = i;
                    break
                }
                u = u.sibling
            }
            if (!o) {
                for (u = i.child; u;) {
                    if (u === n) {
                        o = !0, n = i, r = l;
                        break
                    }
                    if (u === r) {
                        o = !0, r = i, n = l;
                        break
                    }
                    u = u.sibling
                }
                if (!o) throw Error(y(189))
            }
        }
        if (n.alternate !== r) throw Error(y(190))
    }
    if (n.tag !== 3) throw Error(y(188));
    return n.stateNode.current === n ? e : t
}

function Os(e) {
    return e = ed(e), e !== null ? Ms(e) : null
}

function Ms(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null;) {
        var t = Ms(e);
        if (t !== null) return t;
        e = e.sibling
    }
    return null
}
var Fs = Ne.unstable_scheduleCallback,
    lu = Ne.unstable_cancelCallback,
    td = Ne.unstable_shouldYield,
    nd = Ne.unstable_requestPaint,
    b = Ne.unstable_now,
    rd = Ne.unstable_getCurrentPriorityLevel,
    uo = Ne.unstable_ImmediatePriority,
    js = Ne.unstable_UserBlockingPriority,
    Qr = Ne.unstable_NormalPriority,
    ld = Ne.unstable_LowPriority,
    $s = Ne.unstable_IdlePriority,
    ml = null,
    Ke = null;

function id(e) {
    if (Ke && typeof Ke.onCommitFiberRoot == "function") try {
        Ke.onCommitFiberRoot(ml, e, void 0, (e.current.flags & 128) === 128)
    } catch {}
}
var Ae = Math.clz32 ? Math.clz32 : sd,
    od = Math.log,
    ud = Math.LN2;

function sd(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (od(e) / ud | 0) | 0
}
var hr = 64,
    gr = 4194304;

function Tn(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e
    }
}

function Kr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        l = e.suspendedLanes,
        i = e.pingedLanes,
        o = n & 268435455;
    if (o !== 0) {
        var u = o & ~l;
        u !== 0 ? r = Tn(u) : (i &= o, i !== 0 && (r = Tn(i)))
    } else o = n & ~l, o !== 0 ? r = Tn(o) : i !== 0 && (r = Tn(i));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
    if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
        for (e = e.entanglements, t &= r; 0 < t;) n = 31 - Ae(t), l = 1 << n, r |= e[n], t &= ~l;
    return r
}

function ad(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
    }
}

function cd(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i;) {
        var o = 31 - Ae(i),
            u = 1 << o,
            s = l[o];
        s === -1 ? (!(u & n) || u & r) && (l[o] = ad(u, t)) : s <= t && (e.expiredLanes |= u), i &= ~u
    }
}

function wi(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}

function As() {
    var e = hr;
    return hr <<= 1, !(hr & 4194240) && (hr = 64), e
}

function Ml(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t
}

function ir(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ae(t), e[t] = n
}

function dd(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n;) {
        var l = 31 - Ae(n),
            i = 1 << l;
        t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i
    }
}

function so(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n;) {
        var r = 31 - Ae(n),
            l = 1 << r;
        l & t | e[r] & t && (e[r] |= t), n &= ~l
    }
}
var A = 0;

function Us(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var Vs, ao, Bs, Hs, Ws, _i = !1,
    yr = [],
    mt = null,
    ht = null,
    gt = null,
    Hn = new Map,
    Wn = new Map,
    at = [],
    fd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

function iu(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            mt = null;
            break;
        case "dragenter":
        case "dragleave":
            ht = null;
            break;
        case "mouseover":
        case "mouseout":
            gt = null;
            break;
        case "pointerover":
        case "pointerout":
            Hn.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Wn.delete(t.pointerId)
    }
}

function kn(e, t, n, r, l, i) {
    return e === null || e.nativeEvent !== i ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l]
    }, t !== null && (t = ur(t), t !== null && ao(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e)
}

function pd(e, t, n, r, l) {
    switch (t) {
        case "focusin":
            return mt = kn(mt, e, t, n, r, l), !0;
        case "dragenter":
            return ht = kn(ht, e, t, n, r, l), !0;
        case "mouseover":
            return gt = kn(gt, e, t, n, r, l), !0;
        case "pointerover":
            var i = l.pointerId;
            return Hn.set(i, kn(Hn.get(i) || null, e, t, n, r, l)), !0;
        case "gotpointercapture":
            return i = l.pointerId, Wn.set(i, kn(Wn.get(i) || null, e, t, n, r, l)), !0
    }
    return !1
}

function Qs(e) {
    var t = It(e.target);
    if (t !== null) {
        var n = Bt(t);
        if (n !== null) {
            if (t = n.tag, t === 13) {
                if (t = Rs(n), t !== null) {
                    e.blockedOn = t, Ws(e.priority, function() {
                        Bs(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}

function Dr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
        var n = ki(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            hi = r, n.target.dispatchEvent(r), hi = null
        } else return t = ur(n), t !== null && ao(t), e.blockedOn = n, !1;
        t.shift()
    }
    return !0
}

function ou(e, t, n) {
    Dr(e) && n.delete(t)
}

function md() {
    _i = !1, mt !== null && Dr(mt) && (mt = null), ht !== null && Dr(ht) && (ht = null), gt !== null && Dr(gt) && (gt = null), Hn.forEach(ou), Wn.forEach(ou)
}

function Sn(e, t) {
    e.blockedOn === t && (e.blockedOn = null, _i || (_i = !0, Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, md)))
}

function Qn(e) {
    function t(l) {
        return Sn(l, e)
    }
    if (0 < yr.length) {
        Sn(yr[0], e);
        for (var n = 1; n < yr.length; n++) {
            var r = yr[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (mt !== null && Sn(mt, e), ht !== null && Sn(ht, e), gt !== null && Sn(gt, e), Hn.forEach(t), Wn.forEach(t), n = 0; n < at.length; n++) r = at[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < at.length && (n = at[0], n.blockedOn === null);) Qs(n), n.blockedOn === null && at.shift()
}
var on = lt.ReactCurrentBatchConfig,
    Xr = !0;

function hd(e, t, n, r) {
    var l = A,
        i = on.transition;
    on.transition = null;
    try {
        A = 1, co(e, t, n, r)
    } finally {
        A = l, on.transition = i
    }
}

function gd(e, t, n, r) {
    var l = A,
        i = on.transition;
    on.transition = null;
    try {
        A = 4, co(e, t, n, r)
    } finally {
        A = l, on.transition = i
    }
}

function co(e, t, n, r) {
    if (Xr) {
        var l = ki(e, t, n, r);
        if (l === null) Ql(e, t, r, Yr, n), iu(e, r);
        else if (pd(l, e, t, n, r)) r.stopPropagation();
        else if (iu(e, r), t & 4 && -1 < fd.indexOf(e)) {
            for (; l !== null;) {
                var i = ur(l);
                if (i !== null && Vs(i), i = ki(e, t, n, r), i === null && Ql(e, t, r, Yr, n), i === l) break;
                l = i
            }
            l !== null && r.stopPropagation()
        } else Ql(e, t, r, null, n)
    }
}
var Yr = null;

function ki(e, t, n, r) {
    if (Yr = null, e = oo(r), e = It(e), e !== null)
        if (t = Bt(e), t === null) e = null;
        else if (n = t.tag, n === 13) {
        if (e = Rs(t), e !== null) return e;
        e = null
    } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null
    } else t !== e && (e = null);
    return Yr = e, null
}

function Ks(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (rd()) {
                case uo:
                    return 1;
                case js:
                    return 4;
                case Qr:
                case ld:
                    return 16;
                case $s:
                    return 536870912;
                default:
                    return 16
            }
        default:
            return 16
    }
}
var dt = null,
    fo = null,
    Rr = null;

function Xs() {
    if (Rr) return Rr;
    var e, t = fo,
        n = t.length,
        r, l = "value" in dt ? dt.value : dt.textContent,
        i = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === l[i - r]; r++);
    return Rr = l.slice(e, 1 < r ? 1 - r : void 0)
}

function Or(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
}

function vr() {
    return !0
}

function uu() {
    return !1
}

function ze(e) {
    function t(n, r, l, i, o) {
        this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
        for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(i) : i[u]);
        return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? vr : uu, this.isPropagationStopped = uu, this
    }
    return J(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = vr)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = vr)
        },
        persist: function() {},
        isPersistent: vr
    }), t
}
var yn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    },
    po = ze(yn),
    or = J({}, yn, {
        view: 0,
        detail: 0
    }),
    yd = ze(or),
    Fl, jl, xn, hl = J({}, or, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: mo,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX" in e ? e.movementX : (e !== xn && (xn && e.type === "mousemove" ? (Fl = e.screenX - xn.screenX, jl = e.screenY - xn.screenY) : jl = Fl = 0, xn = e), Fl)
        },
        movementY: function(e) {
            return "movementY" in e ? e.movementY : jl
        }
    }),
    su = ze(hl),
    vd = J({}, hl, {
        dataTransfer: 0
    }),
    wd = ze(vd),
    _d = J({}, or, {
        relatedTarget: 0
    }),
    $l = ze(_d),
    kd = J({}, yn, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    Sd = ze(kd),
    xd = J({}, yn, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData
        }
    }),
    Cd = ze(xd),
    Ed = J({}, yn, {
        data: 0
    }),
    au = ze(Ed),
    Nd = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    },
    Pd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    },
    zd = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };

function Td(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = zd[e]) ? !!t[e] : !1
}

function mo() {
    return Td
}
var Ld = J({}, or, {
        key: function(e) {
            if (e.key) {
                var t = Nd[e.key] || e.key;
                if (t !== "Unidentified") return t
            }
            return e.type === "keypress" ? (e = Or(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Pd[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: mo,
        charCode: function(e) {
            return e.type === "keypress" ? Or(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? Or(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    }),
    Id = ze(Ld),
    Dd = J({}, hl, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }),
    cu = ze(Dd),
    Rd = J({}, or, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: mo
    }),
    Od = ze(Rd),
    Md = J({}, yn, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    Fd = ze(Md),
    jd = J({}, hl, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    }),
    $d = ze(jd),
    Ad = [9, 13, 27, 32],
    ho = et && "CompositionEvent" in window,
    Rn = null;
et && "documentMode" in document && (Rn = document.documentMode);
var Ud = et && "TextEvent" in window && !Rn,
    Ys = et && (!ho || Rn && 8 < Rn && 11 >= Rn),
    du = String.fromCharCode(32),
    fu = !1;

function Gs(e, t) {
    switch (e) {
        case "keyup":
            return Ad.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
    }
}

function Zs(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
}
var Kt = !1;

function Vd(e, t) {
    switch (e) {
        case "compositionend":
            return Zs(t);
        case "keypress":
            return t.which !== 32 ? null : (fu = !0, du);
        case "textInput":
            return e = t.data, e === du && fu ? null : e;
        default:
            return null
    }
}

function Bd(e, t) {
    if (Kt) return e === "compositionend" || !ho && Gs(e, t) ? (e = Xs(), Rr = fo = dt = null, Kt = !1, e) : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return Ys && t.locale !== "ko" ? null : t.data;
        default:
            return null
    }
}
var Hd = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};

function pu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Hd[e.type] : t === "textarea"
}

function Js(e, t, n, r) {
    zs(r), t = Gr(t, "onChange"), 0 < t.length && (n = new po("onChange", "change", null, n, r), e.push({
        event: n,
        listeners: t
    }))
}
var On = null,
    Kn = null;

function Wd(e) {
    sa(e, 0)
}

function gl(e) {
    var t = Gt(e);
    if (ks(t)) return e
}

function Qd(e, t) {
    if (e === "change") return t
}
var qs = !1;
if (et) {
    var Al;
    if (et) {
        var Ul = "oninput" in document;
        if (!Ul) {
            var mu = document.createElement("div");
            mu.setAttribute("oninput", "return;"), Ul = typeof mu.oninput == "function"
        }
        Al = Ul
    } else Al = !1;
    qs = Al && (!document.documentMode || 9 < document.documentMode)
}

function hu() {
    On && (On.detachEvent("onpropertychange", bs), Kn = On = null)
}

function bs(e) {
    if (e.propertyName === "value" && gl(Kn)) {
        var t = [];
        Js(t, Kn, e, oo(e)), Ds(Wd, t)
    }
}

function Kd(e, t, n) {
    e === "focusin" ? (hu(), On = t, Kn = n, On.attachEvent("onpropertychange", bs)) : e === "focusout" && hu()
}

function Xd(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return gl(Kn)
}

function Yd(e, t) {
    if (e === "click") return gl(t)
}

function Gd(e, t) {
    if (e === "input" || e === "change") return gl(t)
}

function Zd(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var Ve = typeof Object.is == "function" ? Object.is : Zd;

function Xn(e, t) {
    if (Ve(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!ri.call(t, l) || !Ve(e[l], t[l])) return !1
    }
    return !0
}

function gu(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e
}

function yu(e, t) {
    var n = gu(e);
    e = 0;
    for (var r; n;) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length, e <= t && r >= t) return {
                node: n,
                offset: t - e
            };
            e = r
        }
        e: {
            for (; n;) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = gu(n)
    }
}

function ea(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ea(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}

function ta() {
    for (var e = window, t = Br(); t instanceof e.HTMLIFrameElement;) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n) e = t.contentWindow;
        else break;
        t = Br(e.document)
    }
    return t
}

function go(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}

function Jd(e) {
    var t = ta(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && ea(n.ownerDocument.documentElement, n)) {
        if (r !== null && go(n)) {
            if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
                e = e.getSelection();
                var l = n.textContent.length,
                    i = Math.min(r.start, l);
                r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = yu(n, i);
                var o = yu(n, r);
                l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)))
            }
        }
        for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
            element: e,
            left: e.scrollLeft,
            top: e.scrollTop
        });
        for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
    }
}
var qd = et && "documentMode" in document && 11 >= document.documentMode,
    Xt = null,
    Si = null,
    Mn = null,
    xi = !1;

function vu(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    xi || Xt == null || Xt !== Br(r) || (r = Xt, "selectionStart" in r && go(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }), Mn && Xn(Mn, r) || (Mn = r, r = Gr(Si, "onSelect"), 0 < r.length && (t = new po("onSelect", "select", null, t, n), e.push({
        event: t,
        listeners: r
    }), t.target = Xt)))
}

function wr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
}
var Yt = {
        animationend: wr("Animation", "AnimationEnd"),
        animationiteration: wr("Animation", "AnimationIteration"),
        animationstart: wr("Animation", "AnimationStart"),
        transitionend: wr("Transition", "TransitionEnd")
    },
    Vl = {},
    na = {};
et && (na = document.createElement("div").style, "AnimationEvent" in window || (delete Yt.animationend.animation, delete Yt.animationiteration.animation, delete Yt.animationstart.animation), "TransitionEvent" in window || delete Yt.transitionend.transition);

function yl(e) {
    if (Vl[e]) return Vl[e];
    if (!Yt[e]) return e;
    var t = Yt[e],
        n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in na) return Vl[e] = t[n];
    return e
}
var ra = yl("animationend"),
    la = yl("animationiteration"),
    ia = yl("animationstart"),
    oa = yl("transitionend"),
    ua = new Map,
    wu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

function Ct(e, t) {
    ua.set(e, t), Vt(t, [e])
}
for (var Bl = 0; Bl < wu.length; Bl++) {
    var Hl = wu[Bl],
        bd = Hl.toLowerCase(),
        ef = Hl[0].toUpperCase() + Hl.slice(1);
    Ct(bd, "on" + ef)
}
Ct(ra, "onAnimationEnd");
Ct(la, "onAnimationIteration");
Ct(ia, "onAnimationStart");
Ct("dblclick", "onDoubleClick");
Ct("focusin", "onFocus");
Ct("focusout", "onBlur");
Ct(oa, "onTransitionEnd");
an("onMouseEnter", ["mouseout", "mouseover"]);
an("onMouseLeave", ["mouseout", "mouseover"]);
an("onPointerEnter", ["pointerout", "pointerover"]);
an("onPointerLeave", ["pointerout", "pointerover"]);
Vt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Vt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Vt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Vt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Vt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Vt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ln = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    tf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ln));

function _u(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, bc(r, t, void 0, e), e.currentTarget = null
}

function sa(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            l = r.event;
        r = r.listeners;
        e: {
            var i = void 0;
            if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                    var u = r[o],
                        s = u.instance,
                        c = u.currentTarget;
                    if (u = u.listener, s !== i && l.isPropagationStopped()) break e;
                    _u(l, u, c), i = s
                } else
                    for (o = 0; o < r.length; o++) {
                        if (u = r[o], s = u.instance, c = u.currentTarget, u = u.listener, s !== i && l.isPropagationStopped()) break e;
                        _u(l, u, c), i = s
                    }
        }
    }
    if (Wr) throw e = vi, Wr = !1, vi = null, e
}

function H(e, t) {
    var n = t[zi];
    n === void 0 && (n = t[zi] = new Set);
    var r = e + "__bubble";
    n.has(r) || (aa(t, e, 2, !1), n.add(r))
}

function Wl(e, t, n) {
    var r = 0;
    t && (r |= 4), aa(n, e, r, t)
}
var _r = "_reactListening" + Math.random().toString(36).slice(2);

function Yn(e) {
    if (!e[_r]) {
        e[_r] = !0, gs.forEach(function(n) {
            n !== "selectionchange" && (tf.has(n) || Wl(n, !1, e), Wl(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[_r] || (t[_r] = !0, Wl("selectionchange", !1, t))
    }
}

function aa(e, t, n, r) {
    switch (Ks(t)) {
        case 1:
            var l = hd;
            break;
        case 4:
            l = gd;
            break;
        default:
            l = co
    }
    n = l.bind(null, t, n, e), l = void 0, !yi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: l
    }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
        passive: l
    }) : e.addEventListener(t, n, !1)
}

function Ql(e, t, n, r, l) {
    var i = r;
    if (!(t & 1) && !(t & 2) && r !== null) e: for (;;) {
        if (r === null) return;
        var o = r.tag;
        if (o === 3 || o === 4) {
            var u = r.stateNode.containerInfo;
            if (u === l || u.nodeType === 8 && u.parentNode === l) break;
            if (o === 4)
                for (o = r.return; o !== null;) {
                    var s = o.tag;
                    if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
                    o = o.return
                }
            for (; u !== null;) {
                if (o = It(u), o === null) return;
                if (s = o.tag, s === 5 || s === 6) {
                    r = i = o;
                    continue e
                }
                u = u.parentNode
            }
        }
        r = r.return
    }
    Ds(function() {
        var c = i,
            h = oo(n),
            m = [];
        e: {
            var p = ua.get(e);
            if (p !== void 0) {
                var w = po,
                    _ = e;
                switch (e) {
                    case "keypress":
                        if (Or(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        w = Id;
                        break;
                    case "focusin":
                        _ = "focus", w = $l;
                        break;
                    case "focusout":
                        _ = "blur", w = $l;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        w = $l;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        w = su;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        w = wd;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        w = Od;
                        break;
                    case ra:
                    case la:
                    case ia:
                        w = Sd;
                        break;
                    case oa:
                        w = Fd;
                        break;
                    case "scroll":
                        w = yd;
                        break;
                    case "wheel":
                        w = $d;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        w = Cd;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        w = cu
                }
                var k = (t & 4) !== 0,
                    R = !k && e === "scroll",
                    d = k ? p !== null ? p + "Capture" : null : p;
                k = [];
                for (var a = c, f; a !== null;) {
                    f = a;
                    var g = f.stateNode;
                    if (f.tag === 5 && g !== null && (f = g, d !== null && (g = Bn(a, d), g != null && k.push(Gn(a, g, f)))), R) break;
                    a = a.return
                }
                0 < k.length && (p = new w(p, _, null, n, h), m.push({
                    event: p,
                    listeners: k
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (p = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", p && n !== hi && (_ = n.relatedTarget || n.fromElement) && (It(_) || _[tt])) break e;
                if ((w || p) && (p = h.window === h ? h : (p = h.ownerDocument) ? p.defaultView || p.parentWindow : window, w ? (_ = n.relatedTarget || n.toElement, w = c, _ = _ ? It(_) : null, _ !== null && (R = Bt(_), _ !== R || _.tag !== 5 && _.tag !== 6) && (_ = null)) : (w = null, _ = c), w !== _)) {
                    if (k = su, g = "onMouseLeave", d = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (k = cu, g = "onPointerLeave", d = "onPointerEnter", a = "pointer"), R = w == null ? p : Gt(w), f = _ == null ? p : Gt(_), p = new k(g, a + "leave", w, n, h), p.target = R, p.relatedTarget = f, g = null, It(h) === c && (k = new k(d, a + "enter", _, n, h), k.target = f, k.relatedTarget = R, g = k), R = g, w && _) t: {
                        for (k = w, d = _, a = 0, f = k; f; f = Ht(f)) a++;
                        for (f = 0, g = d; g; g = Ht(g)) f++;
                        for (; 0 < a - f;) k = Ht(k),
                        a--;
                        for (; 0 < f - a;) d = Ht(d),
                        f--;
                        for (; a--;) {
                            if (k === d || d !== null && k === d.alternate) break t;
                            k = Ht(k), d = Ht(d)
                        }
                        k = null
                    }
                    else k = null;
                    w !== null && ku(m, p, w, k, !1), _ !== null && R !== null && ku(m, R, _, k, !0)
                }
            }
            e: {
                if (p = c ? Gt(c) : window, w = p.nodeName && p.nodeName.toLowerCase(), w === "select" || w === "input" && p.type === "file") var C = Qd;
                else if (pu(p))
                    if (qs) C = Gd;
                    else {
                        C = Xd;
                        var N = Kd
                    }
                else(w = p.nodeName) && w.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (C = Yd);
                if (C && (C = C(e, c))) {
                    Js(m, C, n, h);
                    break e
                }
                N && N(e, p, c),
                e === "focusout" && (N = p._wrapperState) && N.controlled && p.type === "number" && ci(p, "number", p.value)
            }
            switch (N = c ? Gt(c) : window, e) {
                case "focusin":
                    (pu(N) || N.contentEditable === "true") && (Xt = N, Si = c, Mn = null);
                    break;
                case "focusout":
                    Mn = Si = Xt = null;
                    break;
                case "mousedown":
                    xi = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    xi = !1, vu(m, n, h);
                    break;
                case "selectionchange":
                    if (qd) break;
                case "keydown":
                case "keyup":
                    vu(m, n, h)
            }
            var P;
            if (ho) e: {
                switch (e) {
                    case "compositionstart":
                        var z = "onCompositionStart";
                        break e;
                    case "compositionend":
                        z = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        z = "onCompositionUpdate";
                        break e
                }
                z = void 0
            }
            else Kt ? Gs(e, n) && (z = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (z = "onCompositionStart");z && (Ys && n.locale !== "ko" && (Kt || z !== "onCompositionStart" ? z === "onCompositionEnd" && Kt && (P = Xs()) : (dt = h, fo = "value" in dt ? dt.value : dt.textContent, Kt = !0)), N = Gr(c, z), 0 < N.length && (z = new au(z, e, null, n, h), m.push({
                event: z,
                listeners: N
            }), P ? z.data = P : (P = Zs(n), P !== null && (z.data = P)))),
            (P = Ud ? Vd(e, n) : Bd(e, n)) && (c = Gr(c, "onBeforeInput"), 0 < c.length && (h = new au("onBeforeInput", "beforeinput", null, n, h), m.push({
                event: h,
                listeners: c
            }), h.data = P))
        }
        sa(m, t)
    })
}

function Gn(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}

function Gr(e, t) {
    for (var n = t + "Capture", r = []; e !== null;) {
        var l = e,
            i = l.stateNode;
        l.tag === 5 && i !== null && (l = i, i = Bn(e, n), i != null && r.unshift(Gn(e, i, l)), i = Bn(e, t), i != null && r.push(Gn(e, i, l))), e = e.return
    }
    return r
}

function Ht(e) {
    if (e === null) return null;
    do e = e.return; while (e && e.tag !== 5);
    return e || null
}

function ku(e, t, n, r, l) {
    for (var i = t._reactName, o = []; n !== null && n !== r;) {
        var u = n,
            s = u.alternate,
            c = u.stateNode;
        if (s !== null && s === r) break;
        u.tag === 5 && c !== null && (u = c, l ? (s = Bn(n, i), s != null && o.unshift(Gn(n, s, u))) : l || (s = Bn(n, i), s != null && o.push(Gn(n, s, u)))), n = n.return
    }
    o.length !== 0 && e.push({
        event: t,
        listeners: o
    })
}
var nf = /\r\n?/g,
    rf = /\u0000|\uFFFD/g;

function Su(e) {
    return (typeof e == "string" ? e : "" + e).replace(nf, `
`).replace(rf, "")
}

function kr(e, t, n) {
    if (t = Su(t), Su(e) !== t && n) throw Error(y(425))
}

function Zr() {}
var Ci = null,
    Ei = null;

function Ni(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var Pi = typeof setTimeout == "function" ? setTimeout : void 0,
    lf = typeof clearTimeout == "function" ? clearTimeout : void 0,
    xu = typeof Promise == "function" ? Promise : void 0,
    of = typeof queueMicrotask == "function" ? queueMicrotask : typeof xu < "u" ? function(e) {
        return xu.resolve(null).then(e).catch(uf)
    } : Pi;

function uf(e) {
    setTimeout(function() {
        throw e
    })
}

function Kl(e, t) {
    var n = t,
        r = 0;
    do {
        var l = n.nextSibling;
        if (e.removeChild(n), l && l.nodeType === 8)
            if (n = l.data, n === "/$") {
                if (r === 0) {
                    e.removeChild(l), Qn(t);
                    return
                }
                r--
            } else n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = l
    } while (n);
    Qn(t)
}

function yt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
            if (t === "/$") return null
        }
    }
    return e
}

function Cu(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--
            } else n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var vn = Math.random().toString(36).slice(2),
    Qe = "__reactFiber$" + vn,
    Zn = "__reactProps$" + vn,
    tt = "__reactContainer$" + vn,
    zi = "__reactEvents$" + vn,
    sf = "__reactListeners$" + vn,
    af = "__reactHandles$" + vn;

function It(e) {
    var t = e[Qe];
    if (t) return t;
    for (var n = e.parentNode; n;) {
        if (t = n[tt] || n[Qe]) {
            if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
                for (e = Cu(e); e !== null;) {
                    if (n = e[Qe]) return n;
                    e = Cu(e)
                }
            return t
        }
        e = n, n = e.parentNode
    }
    return null
}

function ur(e) {
    return e = e[Qe] || e[tt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}

function Gt(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(y(33))
}

function vl(e) {
    return e[Zn] || null
}
var Ti = [],
    Zt = -1;

function Et(e) {
    return {
        current: e
    }
}

function W(e) {
    0 > Zt || (e.current = Ti[Zt], Ti[Zt] = null, Zt--)
}

function V(e, t) {
    Zt++, Ti[Zt] = e.current, e.current = t
}
var xt = {},
    pe = Et(xt),
    _e = Et(!1),
    Ft = xt;

function cn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return xt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
        i;
    for (i in n) l[i] = t[i];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l
}

function ke(e) {
    return e = e.childContextTypes, e != null
}

function Jr() {
    W(_e), W(pe)
}

function Eu(e, t, n) {
    if (pe.current !== xt) throw Error(y(168));
    V(pe, t), V(_e, n)
}

function ca(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var l in r)
        if (!(l in t)) throw Error(y(108, Kc(e) || "Unknown", l));
    return J({}, n, r)
}

function qr(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || xt, Ft = pe.current, V(pe, e), V(_e, _e.current), !0
}

function Nu(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(y(169));
    n ? (e = ca(e, t, Ft), r.__reactInternalMemoizedMergedChildContext = e, W(_e), W(pe), V(pe, e)) : W(_e), V(_e, n)
}
var Ze = null,
    wl = !1,
    Xl = !1;

function da(e) {
    Ze === null ? Ze = [e] : Ze.push(e)
}

function cf(e) {
    wl = !0, da(e)
}

function Nt() {
    if (!Xl && Ze !== null) {
        Xl = !0;
        var e = 0,
            t = A;
        try {
            var n = Ze;
            for (A = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0); while (r !== null)
            }
            Ze = null, wl = !1
        } catch (l) {
            throw Ze !== null && (Ze = Ze.slice(e + 1)), Fs(uo, Nt), l
        } finally {
            A = t, Xl = !1
        }
    }
    return null
}
var Jt = [],
    qt = 0,
    br = null,
    el = 0,
    Te = [],
    Le = 0,
    jt = null,
    Je = 1,
    qe = "";

function Tt(e, t) {
    Jt[qt++] = el, Jt[qt++] = br, br = e, el = t
}

function fa(e, t, n) {
    Te[Le++] = Je, Te[Le++] = qe, Te[Le++] = jt, jt = e;
    var r = Je;
    e = qe;
    var l = 32 - Ae(r) - 1;
    r &= ~(1 << l), n += 1;
    var i = 32 - Ae(t) + l;
    if (30 < i) {
        var o = l - l % 5;
        i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Je = 1 << 32 - Ae(t) + l | n << l | r, qe = i + e
    } else Je = 1 << i | n << l | r, qe = e
}

function yo(e) {
    e.return !== null && (Tt(e, 1), fa(e, 1, 0))
}

function vo(e) {
    for (; e === br;) br = Jt[--qt], Jt[qt] = null, el = Jt[--qt], Jt[qt] = null;
    for (; e === jt;) jt = Te[--Le], Te[Le] = null, qe = Te[--Le], Te[Le] = null, Je = Te[--Le], Te[Le] = null
}
var Ee = null,
    Ce = null,
    Q = !1,
    $e = null;

function pa(e, t) {
    var n = Ie(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n)
}

function Pu(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ee = e, Ce = yt(t.firstChild), !0) : !1;
        case 6:
            return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ee = e, Ce = null, !0) : !1;
        case 13:
            return t = t.nodeType !== 8 ? null : t, t !== null ? (n = jt !== null ? {
                id: Je,
                overflow: qe
            } : null, e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824
            }, n = Ie(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ee = e, Ce = null, !0) : !1;
        default:
            return !1
    }
}

function Li(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}

function Ii(e) {
    if (Q) {
        var t = Ce;
        if (t) {
            var n = t;
            if (!Pu(e, t)) {
                if (Li(e)) throw Error(y(418));
                t = yt(n.nextSibling);
                var r = Ee;
                t && Pu(e, t) ? pa(r, n) : (e.flags = e.flags & -4097 | 2, Q = !1, Ee = e)
            }
        } else {
            if (Li(e)) throw Error(y(418));
            e.flags = e.flags & -4097 | 2, Q = !1, Ee = e
        }
    }
}

function zu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
    Ee = e
}

function Sr(e) {
    if (e !== Ee) return !1;
    if (!Q) return zu(e), Q = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ni(e.type, e.memoizedProps)), t && (t = Ce)) {
        if (Li(e)) throw ma(), Error(y(418));
        for (; t;) pa(e, t), t = yt(t.nextSibling)
    }
    if (zu(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(y(317));
        e: {
            for (e = e.nextSibling, t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Ce = yt(e.nextSibling);
                            break e
                        }
                        t--
                    } else n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            Ce = null
        }
    } else Ce = Ee ? yt(e.stateNode.nextSibling) : null;
    return !0
}

function ma() {
    for (var e = Ce; e;) e = yt(e.nextSibling)
}

function dn() {
    Ce = Ee = null, Q = !1
}

function wo(e) {
    $e === null ? $e = [e] : $e.push(e)
}
var df = lt.ReactCurrentBatchConfig;

function Cn(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner, n) {
                if (n.tag !== 1) throw Error(y(309));
                var r = n.stateNode
            }
            if (!r) throw Error(y(147, e));
            var l = r,
                i = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
                var u = l.refs;
                o === null ? delete u[i] : u[i] = o
            }, t._stringRef = i, t)
        }
        if (typeof e != "string") throw Error(y(284));
        if (!n._owner) throw Error(y(290, e))
    }
    return e
}

function xr(e, t) {
    throw e = Object.prototype.toString.call(t), Error(y(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}

function Tu(e) {
    var t = e._init;
    return t(e._payload)
}

function ha(e) {
    function t(d, a) {
        if (e) {
            var f = d.deletions;
            f === null ? (d.deletions = [a], d.flags |= 16) : f.push(a)
        }
    }

    function n(d, a) {
        if (!e) return null;
        for (; a !== null;) t(d, a), a = a.sibling;
        return null
    }

    function r(d, a) {
        for (d = new Map; a !== null;) a.key !== null ? d.set(a.key, a) : d.set(a.index, a), a = a.sibling;
        return d
    }

    function l(d, a) {
        return d = kt(d, a), d.index = 0, d.sibling = null, d
    }

    function i(d, a, f) {
        return d.index = f, e ? (f = d.alternate, f !== null ? (f = f.index, f < a ? (d.flags |= 2, a) : f) : (d.flags |= 2, a)) : (d.flags |= 1048576, a)
    }

    function o(d) {
        return e && d.alternate === null && (d.flags |= 2), d
    }

    function u(d, a, f, g) {
        return a === null || a.tag !== 6 ? (a = ei(f, d.mode, g), a.return = d, a) : (a = l(a, f), a.return = d, a)
    }

    function s(d, a, f, g) {
        var C = f.type;
        return C === Qt ? h(d, a, f.props.children, g, f.key) : a !== null && (a.elementType === C || typeof C == "object" && C !== null && C.$$typeof === ut && Tu(C) === a.type) ? (g = l(a, f.props), g.ref = Cn(d, a, f), g.return = d, g) : (g = Vr(f.type, f.key, f.props, null, d.mode, g), g.ref = Cn(d, a, f), g.return = d, g)
    }

    function c(d, a, f, g) {
        return a === null || a.tag !== 4 || a.stateNode.containerInfo !== f.containerInfo || a.stateNode.implementation !== f.implementation ? (a = ti(f, d.mode, g), a.return = d, a) : (a = l(a, f.children || []), a.return = d, a)
    }

    function h(d, a, f, g, C) {
        return a === null || a.tag !== 7 ? (a = Mt(f, d.mode, g, C), a.return = d, a) : (a = l(a, f), a.return = d, a)
    }

    function m(d, a, f) {
        if (typeof a == "string" && a !== "" || typeof a == "number") return a = ei("" + a, d.mode, f), a.return = d, a;
        if (typeof a == "object" && a !== null) {
            switch (a.$$typeof) {
                case fr:
                    return f = Vr(a.type, a.key, a.props, null, d.mode, f), f.ref = Cn(d, null, a), f.return = d, f;
                case Wt:
                    return a = ti(a, d.mode, f), a.return = d, a;
                case ut:
                    var g = a._init;
                    return m(d, g(a._payload), f)
            }
            if (zn(a) || wn(a)) return a = Mt(a, d.mode, f, null), a.return = d, a;
            xr(d, a)
        }
        return null
    }

    function p(d, a, f, g) {
        var C = a !== null ? a.key : null;
        if (typeof f == "string" && f !== "" || typeof f == "number") return C !== null ? null : u(d, a, "" + f, g);
        if (typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
                case fr:
                    return f.key === C ? s(d, a, f, g) : null;
                case Wt:
                    return f.key === C ? c(d, a, f, g) : null;
                case ut:
                    return C = f._init, p(d, a, C(f._payload), g)
            }
            if (zn(f) || wn(f)) return C !== null ? null : h(d, a, f, g, null);
            xr(d, f)
        }
        return null
    }

    function w(d, a, f, g, C) {
        if (typeof g == "string" && g !== "" || typeof g == "number") return d = d.get(f) || null, u(a, d, "" + g, C);
        if (typeof g == "object" && g !== null) {
            switch (g.$$typeof) {
                case fr:
                    return d = d.get(g.key === null ? f : g.key) || null, s(a, d, g, C);
                case Wt:
                    return d = d.get(g.key === null ? f : g.key) || null, c(a, d, g, C);
                case ut:
                    var N = g._init;
                    return w(d, a, f, N(g._payload), C)
            }
            if (zn(g) || wn(g)) return d = d.get(f) || null, h(a, d, g, C, null);
            xr(a, g)
        }
        return null
    }

    function _(d, a, f, g) {
        for (var C = null, N = null, P = a, z = a = 0, K = null; P !== null && z < f.length; z++) {
            P.index > z ? (K = P, P = null) : K = P.sibling;
            var O = p(d, P, f[z], g);
            if (O === null) {
                P === null && (P = K);
                break
            }
            e && P && O.alternate === null && t(d, P), a = i(O, a, z), N === null ? C = O : N.sibling = O, N = O, P = K
        }
        if (z === f.length) return n(d, P), Q && Tt(d, z), C;
        if (P === null) {
            for (; z < f.length; z++) P = m(d, f[z], g), P !== null && (a = i(P, a, z), N === null ? C = P : N.sibling = P, N = P);
            return Q && Tt(d, z), C
        }
        for (P = r(d, P); z < f.length; z++) K = w(P, d, z, f[z], g), K !== null && (e && K.alternate !== null && P.delete(K.key === null ? z : K.key), a = i(K, a, z), N === null ? C = K : N.sibling = K, N = K);
        return e && P.forEach(function(L) {
            return t(d, L)
        }), Q && Tt(d, z), C
    }

    function k(d, a, f, g) {
        var C = wn(f);
        if (typeof C != "function") throw Error(y(150));
        if (f = C.call(f), f == null) throw Error(y(151));
        for (var N = C = null, P = a, z = a = 0, K = null, O = f.next(); P !== null && !O.done; z++, O = f.next()) {
            P.index > z ? (K = P, P = null) : K = P.sibling;
            var L = p(d, P, O.value, g);
            if (L === null) {
                P === null && (P = K);
                break
            }
            e && P && L.alternate === null && t(d, P), a = i(L, a, z), N === null ? C = L : N.sibling = L, N = L, P = K
        }
        if (O.done) return n(d, P), Q && Tt(d, z), C;
        if (P === null) {
            for (; !O.done; z++, O = f.next()) O = m(d, O.value, g), O !== null && (a = i(O, a, z), N === null ? C = O : N.sibling = O, N = O);
            return Q && Tt(d, z), C
        }
        for (P = r(d, P); !O.done; z++, O = f.next()) O = w(P, d, z, O.value, g), O !== null && (e && O.alternate !== null && P.delete(O.key === null ? z : O.key), a = i(O, a, z), N === null ? C = O : N.sibling = O, N = O);
        return e && P.forEach(function(F) {
            return t(d, F)
        }), Q && Tt(d, z), C
    }

    function R(d, a, f, g) {
        if (typeof f == "object" && f !== null && f.type === Qt && f.key === null && (f = f.props.children), typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
                case fr:
                    e: {
                        for (var C = f.key, N = a; N !== null;) {
                            if (N.key === C) {
                                if (C = f.type, C === Qt) {
                                    if (N.tag === 7) {
                                        n(d, N.sibling), a = l(N, f.props.children), a.return = d, d = a;
                                        break e
                                    }
                                } else if (N.elementType === C || typeof C == "object" && C !== null && C.$$typeof === ut && Tu(C) === N.type) {
                                    n(d, N.sibling), a = l(N, f.props), a.ref = Cn(d, N, f), a.return = d, d = a;
                                    break e
                                }
                                n(d, N);
                                break
                            } else t(d, N);
                            N = N.sibling
                        }
                        f.type === Qt ? (a = Mt(f.props.children, d.mode, g, f.key), a.return = d, d = a) : (g = Vr(f.type, f.key, f.props, null, d.mode, g), g.ref = Cn(d, a, f), g.return = d, d = g)
                    }
                    return o(d);
                case Wt:
                    e: {
                        for (N = f.key; a !== null;) {
                            if (a.key === N)
                                if (a.tag === 4 && a.stateNode.containerInfo === f.containerInfo && a.stateNode.implementation === f.implementation) {
                                    n(d, a.sibling), a = l(a, f.children || []), a.return = d, d = a;
                                    break e
                                } else {
                                    n(d, a);
                                    break
                                }
                            else t(d, a);
                            a = a.sibling
                        }
                        a = ti(f, d.mode, g),
                        a.return = d,
                        d = a
                    }
                    return o(d);
                case ut:
                    return N = f._init, R(d, a, N(f._payload), g)
            }
            if (zn(f)) return _(d, a, f, g);
            if (wn(f)) return k(d, a, f, g);
            xr(d, f)
        }
        return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, a !== null && a.tag === 6 ? (n(d, a.sibling), a = l(a, f), a.return = d, d = a) : (n(d, a), a = ei(f, d.mode, g), a.return = d, d = a), o(d)) : n(d, a)
    }
    return R
}
var fn = ha(!0),
    ga = ha(!1),
    tl = Et(null),
    nl = null,
    bt = null,
    _o = null;

function ko() {
    _o = bt = nl = null
}

function So(e) {
    var t = tl.current;
    W(tl), e._currentValue = t
}

function Di(e, t, n) {
    for (; e !== null;) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
        e = e.return
    }
}

function un(e, t) {
    nl = e, _o = bt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (we = !0), e.firstContext = null)
}

function Re(e) {
    var t = e._currentValue;
    if (_o !== e)
        if (e = {
                context: e,
                memoizedValue: t,
                next: null
            }, bt === null) {
            if (nl === null) throw Error(y(308));
            bt = e, nl.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else bt = bt.next = e;
    return t
}
var Dt = null;

function xo(e) {
    Dt === null ? Dt = [e] : Dt.push(e)
}

function ya(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n, xo(t)) : (n.next = l.next, l.next = n), t.interleaved = n, nt(e, r)
}

function nt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var st = !1;

function Co(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}

function va(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}

function be(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}

function vt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, j & 2) {
        var l = r.pending;
        return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, nt(e, n)
    }
    return l = r.interleaved, l === null ? (t.next = t, xo(r)) : (t.next = l.next, l.next = t), r.interleaved = t, nt(e, n)
}

function Mr(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, so(e, n)
    }
}

function Lu(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
        var l = null,
            i = null;
        if (n = n.firstBaseUpdate, n !== null) {
            do {
                var o = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                i === null ? l = i = o : i = i.next = o, n = n.next
            } while (n !== null);
            i === null ? l = i = t : i = i.next = t
        } else l = i = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: i,
            shared: r.shared,
            effects: r.effects
        }, e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
}

function rl(e, t, n, r) {
    var l = e.updateQueue;
    st = !1;
    var i = l.firstBaseUpdate,
        o = l.lastBaseUpdate,
        u = l.shared.pending;
    if (u !== null) {
        l.shared.pending = null;
        var s = u,
            c = s.next;
        s.next = null, o === null ? i = c : o.next = c, o = s;
        var h = e.alternate;
        h !== null && (h = h.updateQueue, u = h.lastBaseUpdate, u !== o && (u === null ? h.firstBaseUpdate = c : u.next = c, h.lastBaseUpdate = s))
    }
    if (i !== null) {
        var m = l.baseState;
        o = 0, h = c = s = null, u = i;
        do {
            var p = u.lane,
                w = u.eventTime;
            if ((r & p) === p) {
                h !== null && (h = h.next = {
                    eventTime: w,
                    lane: 0,
                    tag: u.tag,
                    payload: u.payload,
                    callback: u.callback,
                    next: null
                });
                e: {
                    var _ = e,
                        k = u;
                    switch (p = t, w = n, k.tag) {
                        case 1:
                            if (_ = k.payload, typeof _ == "function") {
                                m = _.call(w, m, p);
                                break e
                            }
                            m = _;
                            break e;
                        case 3:
                            _.flags = _.flags & -65537 | 128;
                        case 0:
                            if (_ = k.payload, p = typeof _ == "function" ? _.call(w, m, p) : _, p == null) break e;
                            m = J({}, m, p);
                            break e;
                        case 2:
                            st = !0
                    }
                }
                u.callback !== null && u.lane !== 0 && (e.flags |= 64, p = l.effects, p === null ? l.effects = [u] : p.push(u))
            } else w = {
                eventTime: w,
                lane: p,
                tag: u.tag,
                payload: u.payload,
                callback: u.callback,
                next: null
            }, h === null ? (c = h = w, s = m) : h = h.next = w, o |= p;
            if (u = u.next, u === null) {
                if (u = l.shared.pending, u === null) break;
                p = u, u = p.next, p.next = null, l.lastBaseUpdate = p, l.shared.pending = null
            }
        } while (1);
        if (h === null && (s = m), l.baseState = s, l.firstBaseUpdate = c, l.lastBaseUpdate = h, t = l.shared.interleaved, t !== null) {
            l = t;
            do o |= l.lane, l = l.next; while (l !== t)
        } else i === null && (l.shared.lanes = 0);
        At |= o, e.lanes = o, e.memoizedState = m
    }
}

function Iu(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                l = r.callback;
            if (l !== null) {
                if (r.callback = null, r = n, typeof l != "function") throw Error(y(191, l));
                l.call(r)
            }
        }
}
var sr = {},
    Xe = Et(sr),
    Jn = Et(sr),
    qn = Et(sr);

function Rt(e) {
    if (e === sr) throw Error(y(174));
    return e
}

function Eo(e, t) {
    switch (V(qn, t), V(Jn, e), V(Xe, sr), e = t.nodeType, e) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : fi(null, "");
            break;
        default:
            e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = fi(t, e)
    }
    W(Xe), V(Xe, t)
}

function pn() {
    W(Xe), W(Jn), W(qn)
}

function wa(e) {
    Rt(qn.current);
    var t = Rt(Xe.current),
        n = fi(t, e.type);
    t !== n && (V(Jn, e), V(Xe, n))
}

function No(e) {
    Jn.current === e && (W(Xe), W(Jn))
}
var G = Et(0);

function ll(e) {
    for (var t = e; t !== null;) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t
        } else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue
        }
        if (t === e) break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === e) return null;
            t = t.return
        }
        t.sibling.return = t.return, t = t.sibling
    }
    return null
}
var Yl = [];

function Po() {
    for (var e = 0; e < Yl.length; e++) Yl[e]._workInProgressVersionPrimary = null;
    Yl.length = 0
}
var Fr = lt.ReactCurrentDispatcher,
    Gl = lt.ReactCurrentBatchConfig,
    $t = 0,
    Z = null,
    ne = null,
    le = null,
    il = !1,
    Fn = !1,
    bn = 0,
    ff = 0;

function ce() {
    throw Error(y(321))
}

function zo(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!Ve(e[n], t[n])) return !1;
    return !0
}

function To(e, t, n, r, l, i) {
    if ($t = i, Z = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Fr.current = e === null || e.memoizedState === null ? gf : yf, e = n(r, l), Fn) {
        i = 0;
        do {
            if (Fn = !1, bn = 0, 25 <= i) throw Error(y(301));
            i += 1, le = ne = null, t.updateQueue = null, Fr.current = vf, e = n(r, l)
        } while (Fn)
    }
    if (Fr.current = ol, t = ne !== null && ne.next !== null, $t = 0, le = ne = Z = null, il = !1, t) throw Error(y(300));
    return e
}

function Lo() {
    var e = bn !== 0;
    return bn = 0, e
}

function We() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return le === null ? Z.memoizedState = le = e : le = le.next = e, le
}

function Oe() {
    if (ne === null) {
        var e = Z.alternate;
        e = e !== null ? e.memoizedState : null
    } else e = ne.next;
    var t = le === null ? Z.memoizedState : le.next;
    if (t !== null) le = t, ne = e;
    else {
        if (e === null) throw Error(y(310));
        ne = e, e = {
            memoizedState: ne.memoizedState,
            baseState: ne.baseState,
            baseQueue: ne.baseQueue,
            queue: ne.queue,
            next: null
        }, le === null ? Z.memoizedState = le = e : le = le.next = e
    }
    return le
}

function er(e, t) {
    return typeof t == "function" ? t(e) : t
}

function Zl(e) {
    var t = Oe(),
        n = t.queue;
    if (n === null) throw Error(y(311));
    n.lastRenderedReducer = e;
    var r = ne,
        l = r.baseQueue,
        i = n.pending;
    if (i !== null) {
        if (l !== null) {
            var o = l.next;
            l.next = i.next, i.next = o
        }
        r.baseQueue = l = i, n.pending = null
    }
    if (l !== null) {
        i = l.next, r = r.baseState;
        var u = o = null,
            s = null,
            c = i;
        do {
            var h = c.lane;
            if (($t & h) === h) s !== null && (s = s.next = {
                lane: 0,
                action: c.action,
                hasEagerState: c.hasEagerState,
                eagerState: c.eagerState,
                next: null
            }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
            else {
                var m = {
                    lane: h,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                };
                s === null ? (u = s = m, o = r) : s = s.next = m, Z.lanes |= h, At |= h
            }
            c = c.next
        } while (c !== null && c !== i);
        s === null ? o = r : s.next = u, Ve(r, t.memoizedState) || (we = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = s, n.lastRenderedState = r
    }
    if (e = n.interleaved, e !== null) {
        l = e;
        do i = l.lane, Z.lanes |= i, At |= i, l = l.next; while (l !== e)
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}

function Jl(e) {
    var t = Oe(),
        n = t.queue;
    if (n === null) throw Error(y(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        l = n.pending,
        i = t.memoizedState;
    if (l !== null) {
        n.pending = null;
        var o = l = l.next;
        do i = e(i, o.action), o = o.next; while (o !== l);
        Ve(i, t.memoizedState) || (we = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i
    }
    return [i, r]
}

function _a() {}

function ka(e, t) {
    var n = Z,
        r = Oe(),
        l = t(),
        i = !Ve(r.memoizedState, l);
    if (i && (r.memoizedState = l, we = !0), r = r.queue, Io(Ca.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || le !== null && le.memoizedState.tag & 1) {
        if (n.flags |= 2048, tr(9, xa.bind(null, n, r, l, t), void 0, null), ie === null) throw Error(y(349));
        $t & 30 || Sa(n, t, l)
    }
    return l
}

function Sa(e, t, n) {
    e.flags |= 16384, e = {
        getSnapshot: t,
        value: n
    }, t = Z.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, Z.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
}

function xa(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Ea(t) && Na(e)
}

function Ca(e, t, n) {
    return n(function() {
        Ea(t) && Na(e)
    })
}

function Ea(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !Ve(e, n)
    } catch {
        return !0
    }
}

function Na(e) {
    var t = nt(e, 1);
    t !== null && Ue(t, e, 1, -1)
}

function Du(e) {
    var t = We();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: er,
        lastRenderedState: e
    }, t.queue = e, e = e.dispatch = hf.bind(null, Z, e), [t.memoizedState, e]
}

function tr(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    }, t = Z.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, Z.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e
}

function Pa() {
    return Oe().memoizedState
}

function jr(e, t, n, r) {
    var l = We();
    Z.flags |= e, l.memoizedState = tr(1 | t, n, void 0, r === void 0 ? null : r)
}

function _l(e, t, n, r) {
    var l = Oe();
    r = r === void 0 ? null : r;
    var i = void 0;
    if (ne !== null) {
        var o = ne.memoizedState;
        if (i = o.destroy, r !== null && zo(r, o.deps)) {
            l.memoizedState = tr(t, n, i, r);
            return
        }
    }
    Z.flags |= e, l.memoizedState = tr(1 | t, n, i, r)
}

function Ru(e, t) {
    return jr(8390656, 8, e, t)
}

function Io(e, t) {
    return _l(2048, 8, e, t)
}

function za(e, t) {
    return _l(4, 2, e, t)
}

function Ta(e, t) {
    return _l(4, 4, e, t)
}

function La(e, t) {
    if (typeof t == "function") return e = e(), t(e),
        function() {
            t(null)
        };
    if (t != null) return e = e(), t.current = e,
        function() {
            t.current = null
        }
}

function Ia(e, t, n) {
    return n = n != null ? n.concat([e]) : null, _l(4, 4, La.bind(null, t, e), n)
}

function Do() {}

function Da(e, t) {
    var n = Oe();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && zo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
}

function Ra(e, t) {
    var n = Oe();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && zo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
}

function Oa(e, t, n) {
    return $t & 21 ? (Ve(n, t) || (n = As(), Z.lanes |= n, At |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, we = !0), e.memoizedState = n)
}

function pf(e, t) {
    var n = A;
    A = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = Gl.transition;
    Gl.transition = {};
    try {
        e(!1), t()
    } finally {
        A = n, Gl.transition = r
    }
}

function Ma() {
    return Oe().memoizedState
}

function mf(e, t, n) {
    var r = _t(e);
    if (n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }, Fa(e)) ja(t, n);
    else if (n = ya(e, t, n, r), n !== null) {
        var l = he();
        Ue(n, e, r, l), $a(n, t, r)
    }
}

function hf(e, t, n) {
    var r = _t(e),
        l = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
    if (Fa(e)) ja(t, l);
    else {
        var i = e.alternate;
        if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
            var o = t.lastRenderedState,
                u = i(o, n);
            if (l.hasEagerState = !0, l.eagerState = u, Ve(u, o)) {
                var s = t.interleaved;
                s === null ? (l.next = l, xo(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
                return
            }
        } catch {} finally {}
        n = ya(e, t, l, r), n !== null && (l = he(), Ue(n, e, r, l), $a(n, t, r))
    }
}

function Fa(e) {
    var t = e.alternate;
    return e === Z || t !== null && t === Z
}

function ja(e, t) {
    Fn = il = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
}

function $a(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, so(e, n)
    }
}
var ol = {
        readContext: Re,
        useCallback: ce,
        useContext: ce,
        useEffect: ce,
        useImperativeHandle: ce,
        useInsertionEffect: ce,
        useLayoutEffect: ce,
        useMemo: ce,
        useReducer: ce,
        useRef: ce,
        useState: ce,
        useDebugValue: ce,
        useDeferredValue: ce,
        useTransition: ce,
        useMutableSource: ce,
        useSyncExternalStore: ce,
        useId: ce,
        unstable_isNewReconciler: !1
    },
    gf = {
        readContext: Re,
        useCallback: function(e, t) {
            return We().memoizedState = [e, t === void 0 ? null : t], e
        },
        useContext: Re,
        useEffect: Ru,
        useImperativeHandle: function(e, t, n) {
            return n = n != null ? n.concat([e]) : null, jr(4194308, 4, La.bind(null, t, e), n)
        },
        useLayoutEffect: function(e, t) {
            return jr(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            return jr(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var n = We();
            return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e
        },
        useReducer: function(e, t, n) {
            var r = We();
            return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t
            }, r.queue = e, e = e.dispatch = mf.bind(null, Z, e), [r.memoizedState, e]
        },
        useRef: function(e) {
            var t = We();
            return e = {
                current: e
            }, t.memoizedState = e
        },
        useState: Du,
        useDebugValue: Do,
        useDeferredValue: function(e) {
            return We().memoizedState = e
        },
        useTransition: function() {
            var e = Du(!1),
                t = e[0];
            return e = pf.bind(null, e[1]), We().memoizedState = e, [t, e]
        },
        useMutableSource: function() {},
        useSyncExternalStore: function(e, t, n) {
            var r = Z,
                l = We();
            if (Q) {
                if (n === void 0) throw Error(y(407));
                n = n()
            } else {
                if (n = t(), ie === null) throw Error(y(349));
                $t & 30 || Sa(r, t, n)
            }
            l.memoizedState = n;
            var i = {
                value: n,
                getSnapshot: t
            };
            return l.queue = i, Ru(Ca.bind(null, r, i, e), [e]), r.flags |= 2048, tr(9, xa.bind(null, r, i, n, t), void 0, null), n
        },
        useId: function() {
            var e = We(),
                t = ie.identifierPrefix;
            if (Q) {
                var n = qe,
                    r = Je;
                n = (r & ~(1 << 32 - Ae(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = bn++, 0 < n && (t += "H" + n.toString(32)), t += ":"
            } else n = ff++, t = ":" + t + "r" + n.toString(32) + ":";
            return e.memoizedState = t
        },
        unstable_isNewReconciler: !1
    },
    yf = {
        readContext: Re,
        useCallback: Da,
        useContext: Re,
        useEffect: Io,
        useImperativeHandle: Ia,
        useInsertionEffect: za,
        useLayoutEffect: Ta,
        useMemo: Ra,
        useReducer: Zl,
        useRef: Pa,
        useState: function() {
            return Zl(er)
        },
        useDebugValue: Do,
        useDeferredValue: function(e) {
            var t = Oe();
            return Oa(t, ne.memoizedState, e)
        },
        useTransition: function() {
            var e = Zl(er)[0],
                t = Oe().memoizedState;
            return [e, t]
        },
        useMutableSource: _a,
        useSyncExternalStore: ka,
        useId: Ma,
        unstable_isNewReconciler: !1
    },
    vf = {
        readContext: Re,
        useCallback: Da,
        useContext: Re,
        useEffect: Io,
        useImperativeHandle: Ia,
        useInsertionEffect: za,
        useLayoutEffect: Ta,
        useMemo: Ra,
        useReducer: Jl,
        useRef: Pa,
        useState: function() {
            return Jl(er)
        },
        useDebugValue: Do,
        useDeferredValue: function(e) {
            var t = Oe();
            return ne === null ? t.memoizedState = e : Oa(t, ne.memoizedState, e)
        },
        useTransition: function() {
            var e = Jl(er)[0],
                t = Oe().memoizedState;
            return [e, t]
        },
        useMutableSource: _a,
        useSyncExternalStore: ka,
        useId: Ma,
        unstable_isNewReconciler: !1
    };

function Fe(e, t) {
    if (e && e.defaultProps) {
        t = J({}, t), e = e.defaultProps;
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}

function Ri(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : J({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n)
}
var kl = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? Bt(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = he(),
            l = _t(e),
            i = be(r, l);
        i.payload = t, n != null && (i.callback = n), t = vt(e, i, l), t !== null && (Ue(t, e, l, r), Mr(t, e, l))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = he(),
            l = _t(e),
            i = be(r, l);
        i.tag = 1, i.payload = t, n != null && (i.callback = n), t = vt(e, i, l), t !== null && (Ue(t, e, l, r), Mr(t, e, l))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = he(),
            r = _t(e),
            l = be(n, r);
        l.tag = 2, t != null && (l.callback = t), t = vt(e, l, r), t !== null && (Ue(t, e, r, n), Mr(t, e, r))
    }
};

function Ou(e, t, n, r, l, i, o) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Xn(n, r) || !Xn(l, i) : !0
}

function Aa(e, t, n) {
    var r = !1,
        l = xt,
        i = t.contextType;
    return typeof i == "object" && i !== null ? i = Re(i) : (l = ke(t) ? Ft : pe.current, r = t.contextTypes, i = (r = r != null) ? cn(e, l) : xt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = kl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t
}

function Mu(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && kl.enqueueReplaceState(t, t.state, null)
}

function Oi(e, t, n, r) {
    var l = e.stateNode;
    l.props = n, l.state = e.memoizedState, l.refs = {}, Co(e);
    var i = t.contextType;
    typeof i == "object" && i !== null ? l.context = Re(i) : (i = ke(t) ? Ft : pe.current, l.context = cn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Ri(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && kl.enqueueReplaceState(l, l.state, null), rl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308)
}

function mn(e, t) {
    try {
        var n = "",
            r = t;
        do n += Qc(r), r = r.return; while (r);
        var l = n
    } catch (i) {
        l = `
Error generating stack: ` + i.message + `
` + i.stack
    }
    return {
        value: e,
        source: t,
        stack: l,
        digest: null
    }
}

function ql(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}

function Mi(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var wf = typeof WeakMap == "function" ? WeakMap : Map;

function Ua(e, t, n) {
    n = be(-1, n), n.tag = 3, n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        sl || (sl = !0, Qi = r), Mi(e, t)
    }, n
}

function Va(e, t, n) {
    n = be(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var l = t.value;
        n.payload = function() {
            return r(l)
        }, n.callback = function() {
            Mi(e, t)
        }
    }
    var i = e.stateNode;
    return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
        Mi(e, t), typeof r != "function" && (wt === null ? wt = new Set([this]) : wt.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: o !== null ? o : ""
        })
    }), n
}

function Fu(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new wf;
        var l = new Set;
        r.set(t, l)
    } else l = r.get(t), l === void 0 && (l = new Set, r.set(t, l));
    l.has(n) || (l.add(n), e = Rf.bind(null, e, t, n), t.then(e, e))
}

function ju(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
        e = e.return
    } while (e !== null);
    return null
}

function $u(e, t, n, r, l) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = be(-1, 1), t.tag = 2, vt(n, t, 1))), n.lanes |= 1), e)
}
var _f = lt.ReactCurrentOwner,
    we = !1;

function me(e, t, n, r) {
    t.child = e === null ? ga(t, null, n, r) : fn(t, e.child, n, r)
}

function Au(e, t, n, r, l) {
    n = n.render;
    var i = t.ref;
    return un(t, l), r = To(e, t, n, r, i, l), n = Lo(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, rt(e, t, l)) : (Q && n && yo(t), t.flags |= 1, me(e, t, r, l), t.child)
}

function Uu(e, t, n, r, l) {
    if (e === null) {
        var i = n.type;
        return typeof i == "function" && !Uo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Ba(e, t, i, r, l)) : (e = Vr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e)
    }
    if (i = e.child, !(e.lanes & l)) {
        var o = i.memoizedProps;
        if (n = n.compare, n = n !== null ? n : Xn, n(o, r) && e.ref === t.ref) return rt(e, t, l)
    }
    return t.flags |= 1, e = kt(i, r), e.ref = t.ref, e.return = t, t.child = e
}

function Ba(e, t, n, r, l) {
    if (e !== null) {
        var i = e.memoizedProps;
        if (Xn(i, r) && e.ref === t.ref)
            if (we = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (we = !0);
            else return t.lanes = e.lanes, rt(e, t, l)
    }
    return Fi(e, t, n, r, l)
}

function Ha(e, t, n) {
    var r = t.pendingProps,
        l = r.children,
        i = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1)) t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null
        }, V(tn, xe), xe |= n;
        else {
            if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null
            }, t.updateQueue = null, V(tn, xe), xe |= e, null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }, r = i !== null ? i.baseLanes : n, V(tn, xe), xe |= r
        }
    else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, V(tn, xe), xe |= r;
    return me(e, t, l, n), t.child
}

function Wa(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
}

function Fi(e, t, n, r, l) {
    var i = ke(n) ? Ft : pe.current;
    return i = cn(t, i), un(t, l), n = To(e, t, n, r, i, l), r = Lo(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, rt(e, t, l)) : (Q && r && yo(t), t.flags |= 1, me(e, t, n, l), t.child)
}

function Vu(e, t, n, r, l) {
    if (ke(n)) {
        var i = !0;
        qr(t)
    } else i = !1;
    if (un(t, l), t.stateNode === null) $r(e, t), Aa(t, n, r), Oi(t, n, r, l), r = !0;
    else if (e === null) {
        var o = t.stateNode,
            u = t.memoizedProps;
        o.props = u;
        var s = o.context,
            c = n.contextType;
        typeof c == "object" && c !== null ? c = Re(c) : (c = ke(n) ? Ft : pe.current, c = cn(t, c));
        var h = n.getDerivedStateFromProps,
            m = typeof h == "function" || typeof o.getSnapshotBeforeUpdate == "function";
        m || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || s !== c) && Mu(t, o, r, c), st = !1;
        var p = t.memoizedState;
        o.state = p, rl(t, r, o, l), s = t.memoizedState, u !== r || p !== s || _e.current || st ? (typeof h == "function" && (Ri(t, n, h, r), s = t.memoizedState), (u = st || Ou(t, n, u, r, p, s, c)) ? (m || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), o.props = r, o.state = s, o.context = c, r = u) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1)
    } else {
        o = t.stateNode, va(e, t), u = t.memoizedProps, c = t.type === t.elementType ? u : Fe(t.type, u), o.props = c, m = t.pendingProps, p = o.context, s = n.contextType, typeof s == "object" && s !== null ? s = Re(s) : (s = ke(n) ? Ft : pe.current, s = cn(t, s));
        var w = n.getDerivedStateFromProps;
        (h = typeof w == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== m || p !== s) && Mu(t, o, r, s), st = !1, p = t.memoizedState, o.state = p, rl(t, r, o, l);
        var _ = t.memoizedState;
        u !== m || p !== _ || _e.current || st ? (typeof w == "function" && (Ri(t, n, w, r), _ = t.memoizedState), (c = st || Ou(t, n, c, r, p, _, s) || !1) ? (h || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, _, s), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, _, s)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = _), o.props = r, o.state = _, o.context = s, r = c) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1)
    }
    return ji(e, t, n, r, i, l)
}

function ji(e, t, n, r, l, i) {
    Wa(e, t);
    var o = (t.flags & 128) !== 0;
    if (!r && !o) return l && Nu(t, n, !1), rt(e, t, i);
    r = t.stateNode, _f.current = t;
    var u = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && o ? (t.child = fn(t, e.child, null, i), t.child = fn(t, null, u, i)) : me(e, t, u, i), t.memoizedState = r.state, l && Nu(t, n, !0), t.child
}

function Qa(e) {
    var t = e.stateNode;
    t.pendingContext ? Eu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Eu(e, t.context, !1), Eo(e, t.containerInfo)
}

function Bu(e, t, n, r, l) {
    return dn(), wo(l), t.flags |= 256, me(e, t, n, r), t.child
}
var $i = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};

function Ai(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}

function Ka(e, t, n) {
    var r = t.pendingProps,
        l = G.current,
        i = !1,
        o = (t.flags & 128) !== 0,
        u;
    if ((u = o) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), V(G, l & 1), e === null) return Ii(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = {
        mode: "hidden",
        children: o
    }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = Cl(o, r, 0, null), e = Mt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Ai(n), t.memoizedState = $i, e) : Ro(t, o));
    if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return kf(e, t, o, r, u, l, n);
    if (i) {
        i = r.fallback, o = t.mode, l = e.child, u = l.sibling;
        var s = {
            mode: "hidden",
            children: r.children
        };
        return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = kt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? i = kt(u, i) : (i = Mt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Ai(n) : {
            baseLanes: o.baseLanes | n,
            cachePool: null,
            transitions: o.transitions
        }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = $i, r
    }
    return i = e.child, e = i.sibling, r = kt(i, {
        mode: "visible",
        children: r.children
    }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r
}

function Ro(e, t) {
    return t = Cl({
        mode: "visible",
        children: t
    }, e.mode, 0, null), t.return = e, e.child = t
}

function Cr(e, t, n, r) {
    return r !== null && wo(r), fn(t, e.child, null, n), e = Ro(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
}

function kf(e, t, n, r, l, i, o) {
    if (n) return t.flags & 256 ? (t.flags &= -257, r = ql(Error(y(422))), Cr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = Cl({
        mode: "visible",
        children: r.children
    }, l, 0, null), i = Mt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && fn(t, e.child, null, o), t.child.memoizedState = Ai(o), t.memoizedState = $i, i);
    if (!(t.mode & 1)) return Cr(e, t, o, null);
    if (l.data === "$!") {
        if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
        return r = u, i = Error(y(419)), r = ql(i, r, void 0), Cr(e, t, o, r)
    }
    if (u = (o & e.childLanes) !== 0, we || u) {
        if (r = ie, r !== null) {
            switch (o & -o) {
                case 4:
                    l = 2;
                    break;
                case 16:
                    l = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    l = 32;
                    break;
                case 536870912:
                    l = 268435456;
                    break;
                default:
                    l = 0
            }
            l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, nt(e, l), Ue(r, e, l, -1))
        }
        return Ao(), r = ql(Error(y(421))), Cr(e, t, o, r)
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Of.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, Ce = yt(l.nextSibling), Ee = t, Q = !0, $e = null, e !== null && (Te[Le++] = Je, Te[Le++] = qe, Te[Le++] = jt, Je = e.id, qe = e.overflow, jt = t), t = Ro(t, r.children), t.flags |= 4096, t)
}

function Hu(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Di(e.return, t, n)
}

function bl(e, t, n, r, l) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l)
}

function Xa(e, t, n) {
    var r = t.pendingProps,
        l = r.revealOrder,
        i = r.tail;
    if (me(e, t, r.children, n), r = G.current, r & 2) r = r & 1 | 2, t.flags |= 128;
    else {
        if (e !== null && e.flags & 128) e: for (e = t.child; e !== null;) {
            if (e.tag === 13) e.memoizedState !== null && Hu(e, n, t);
            else if (e.tag === 19) Hu(e, n, t);
            else if (e.child !== null) {
                e.child.return = e, e = e.child;
                continue
            }
            if (e === t) break e;
            for (; e.sibling === null;) {
                if (e.return === null || e.return === t) break e;
                e = e.return
            }
            e.sibling.return = e.return, e = e.sibling
        }
        r &= 1
    }
    if (V(G, r), !(t.mode & 1)) t.memoizedState = null;
    else switch (l) {
        case "forwards":
            for (n = t.child, l = null; n !== null;) e = n.alternate, e !== null && ll(e) === null && (l = n), n = n.sibling;
            n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), bl(t, !1, l, n, i);
            break;
        case "backwards":
            for (n = null, l = t.child, t.child = null; l !== null;) {
                if (e = l.alternate, e !== null && ll(e) === null) {
                    t.child = l;
                    break
                }
                e = l.sibling, l.sibling = n, n = l, l = e
            }
            bl(t, !0, n, null, i);
            break;
        case "together":
            bl(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
    }
    return t.child
}

function $r(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2)
}

function rt(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), At |= t.lanes, !(n & t.childLanes)) return null;
    if (e !== null && t.child !== e.child) throw Error(y(153));
    if (t.child !== null) {
        for (e = t.child, n = kt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = kt(e, e.pendingProps), n.return = t;
        n.sibling = null
    }
    return t.child
}

function Sf(e, t, n) {
    switch (t.tag) {
        case 3:
            Qa(t), dn();
            break;
        case 5:
            wa(t);
            break;
        case 1:
            ke(t.type) && qr(t);
            break;
        case 4:
            Eo(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                l = t.memoizedProps.value;
            V(tl, r._currentValue), r._currentValue = l;
            break;
        case 13:
            if (r = t.memoizedState, r !== null) return r.dehydrated !== null ? (V(G, G.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ka(e, t, n) : (V(G, G.current & 1), e = rt(e, t, n), e !== null ? e.sibling : null);
            V(G, G.current & 1);
            break;
        case 19:
            if (r = (n & t.childLanes) !== 0, e.flags & 128) {
                if (r) return Xa(e, t, n);
                t.flags |= 128
            }
            if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), V(G, G.current), r) break;
            return null;
        case 22:
        case 23:
            return t.lanes = 0, Ha(e, t, n)
    }
    return rt(e, t, n)
}
var Ya, Ui, Ga, Za;
Ya = function(e, t) {
    for (var n = t.child; n !== null;) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n, n = n.child;
            continue
        }
        if (n === t) break;
        for (; n.sibling === null;) {
            if (n.return === null || n.return === t) return;
            n = n.return
        }
        n.sibling.return = n.return, n = n.sibling
    }
};
Ui = function() {};
Ga = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        e = t.stateNode, Rt(Xe.current);
        var i = null;
        switch (n) {
            case "input":
                l = si(e, l), r = si(e, r), i = [];
                break;
            case "select":
                l = J({}, l, {
                    value: void 0
                }), r = J({}, r, {
                    value: void 0
                }), i = [];
                break;
            case "textarea":
                l = di(e, l), r = di(e, r), i = [];
                break;
            default:
                typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Zr)
        }
        pi(n, r);
        var o;
        n = null;
        for (c in l)
            if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
                if (c === "style") {
                    var u = l[c];
                    for (o in u) u.hasOwnProperty(o) && (n || (n = {}), n[o] = "")
                } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Un.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
        for (c in r) {
            var s = r[c];
            if (u = l?.[c], r.hasOwnProperty(c) && s !== u && (s != null || u != null))
                if (c === "style")
                    if (u) {
                        for (o in u) !u.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
                        for (o in s) s.hasOwnProperty(o) && u[o] !== s[o] && (n || (n = {}), n[o] = s[o])
                    } else n || (i || (i = []), i.push(c, n)), n = s;
            else c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (i = i || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (i = i || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Un.hasOwnProperty(c) ? (s != null && c === "onScroll" && H("scroll", e), i || u === s || (i = [])) : (i = i || []).push(c, s))
        }
        n && (i = i || []).push("style", n);
        var c = i;
        (t.updateQueue = c) && (t.flags |= 4)
    }
};
Za = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
};

function En(e, t) {
    if (!Q) switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
    }
}

function de(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var l = e.child; l !== null;) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
    else
        for (l = e.child; l !== null;) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t
}

function xf(e, t, n) {
    var r = t.pendingProps;
    switch (vo(t), t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return de(t), null;
        case 1:
            return ke(t.type) && Jr(), de(t), null;
        case 3:
            return r = t.stateNode, pn(), W(_e), W(pe), Po(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Sr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, $e !== null && (Yi($e), $e = null))), Ui(e, t), de(t), null;
        case 5:
            No(t);
            var l = Rt(qn.current);
            if (n = t.type, e !== null && t.stateNode != null) Ga(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(y(166));
                    return de(t), null
                }
                if (e = Rt(Xe.current), Sr(t)) {
                    r = t.stateNode, n = t.type;
                    var i = t.memoizedProps;
                    switch (r[Qe] = t, r[Zn] = i, e = (t.mode & 1) !== 0, n) {
                        case "dialog":
                            H("cancel", r), H("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            H("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (l = 0; l < Ln.length; l++) H(Ln[l], r);
                            break;
                        case "source":
                            H("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            H("error", r), H("load", r);
                            break;
                        case "details":
                            H("toggle", r);
                            break;
                        case "input":
                            qo(r, i), H("invalid", r);
                            break;
                        case "select":
                            r._wrapperState = {
                                wasMultiple: !!i.multiple
                            }, H("invalid", r);
                            break;
                        case "textarea":
                            eu(r, i), H("invalid", r)
                    }
                    pi(n, i), l = null;
                    for (var o in i)
                        if (i.hasOwnProperty(o)) {
                            var u = i[o];
                            o === "children" ? typeof u == "string" ? r.textContent !== u && (i.suppressHydrationWarning !== !0 && kr(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (i.suppressHydrationWarning !== !0 && kr(r.textContent, u, e), l = ["children", "" + u]) : Un.hasOwnProperty(o) && u != null && o === "onScroll" && H("scroll", r)
                        } switch (n) {
                        case "input":
                            pr(r), bo(r, i, !0);
                            break;
                        case "textarea":
                            pr(r), tu(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof i.onClick == "function" && (r.onclick = Zr)
                    }
                    r = l, t.updateQueue = r, r !== null && (t.flags |= 4)
                } else {
                    o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Cs(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, {
                        is: r.is
                    }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Qe] = t, e[Zn] = r, Ya(e, t, !1, !1), t.stateNode = e;
                    e: {
                        switch (o = mi(n, r), n) {
                            case "dialog":
                                H("cancel", e), H("close", e), l = r;
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                H("load", e), l = r;
                                break;
                            case "video":
                            case "audio":
                                for (l = 0; l < Ln.length; l++) H(Ln[l], e);
                                l = r;
                                break;
                            case "source":
                                H("error", e), l = r;
                                break;
                            case "img":
                            case "image":
                            case "link":
                                H("error", e), H("load", e), l = r;
                                break;
                            case "details":
                                H("toggle", e), l = r;
                                break;
                            case "input":
                                qo(e, r), l = si(e, r), H("invalid", e);
                                break;
                            case "option":
                                l = r;
                                break;
                            case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }, l = J({}, r, {
                                    value: void 0
                                }), H("invalid", e);
                                break;
                            case "textarea":
                                eu(e, r), l = di(e, r), H("invalid", e);
                                break;
                            default:
                                l = r
                        }
                        pi(n, l),
                        u = l;
                        for (i in u)
                            if (u.hasOwnProperty(i)) {
                                var s = u[i];
                                i === "style" ? Ps(e, s) : i === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Es(e, s)) : i === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Vn(e, s) : typeof s == "number" && Vn(e, "" + s) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Un.hasOwnProperty(i) ? s != null && i === "onScroll" && H("scroll", e) : s != null && no(e, i, s, o))
                            } switch (n) {
                            case "input":
                                pr(e), bo(e, r, !1);
                                break;
                            case "textarea":
                                pr(e), tu(e);
                                break;
                            case "option":
                                r.value != null && e.setAttribute("value", "" + St(r.value));
                                break;
                            case "select":
                                e.multiple = !!r.multiple, i = r.value, i != null ? nn(e, !!r.multiple, i, !1) : r.defaultValue != null && nn(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof l.onClick == "function" && (e.onclick = Zr)
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1
                        }
                    }
                    r && (t.flags |= 4)
                }
                t.ref !== null && (t.flags |= 512, t.flags |= 2097152)
            }
            return de(t), null;
        case 6:
            if (e && t.stateNode != null) Za(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null) throw Error(y(166));
                if (n = Rt(qn.current), Rt(Xe.current), Sr(t)) {
                    if (r = t.stateNode, n = t.memoizedProps, r[Qe] = t, (i = r.nodeValue !== n) && (e = Ee, e !== null)) switch (e.tag) {
                        case 3:
                            kr(r.nodeValue, n, (e.mode & 1) !== 0);
                            break;
                        case 5:
                            e.memoizedProps.suppressHydrationWarning !== !0 && kr(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                    i && (t.flags |= 4)
                } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Qe] = t, t.stateNode = r
            }
            return de(t), null;
        case 13:
            if (W(G), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (Q && Ce !== null && t.mode & 1 && !(t.flags & 128)) ma(), dn(), t.flags |= 98560, i = !1;
                else if (i = Sr(t), r !== null && r.dehydrated !== null) {
                    if (e === null) {
                        if (!i) throw Error(y(318));
                        if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(y(317));
                        i[Qe] = t
                    } else dn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
                    de(t), i = !1
                } else $e !== null && (Yi($e), $e = null), i = !0;
                if (!i) return t.flags & 65536 ? t : null
            }
            return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || G.current & 1 ? re === 0 && (re = 3) : Ao())), t.updateQueue !== null && (t.flags |= 4), de(t), null);
        case 4:
            return pn(), Ui(e, t), e === null && Yn(t.stateNode.containerInfo), de(t), null;
        case 10:
            return So(t.type._context), de(t), null;
        case 17:
            return ke(t.type) && Jr(), de(t), null;
        case 19:
            if (W(G), i = t.memoizedState, i === null) return de(t), null;
            if (r = (t.flags & 128) !== 0, o = i.rendering, o === null)
                if (r) En(i, !1);
                else {
                    if (re !== 0 || e !== null && e.flags & 128)
                        for (e = t.child; e !== null;) {
                            if (o = ll(e), o !== null) {
                                for (t.flags |= 128, En(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null;) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }), n = n.sibling;
                                return V(G, G.current & 1 | 2), t.child
                            }
                            e = e.sibling
                        }
                    i.tail !== null && b() > hn && (t.flags |= 128, r = !0, En(i, !1), t.lanes = 4194304)
                }
            else {
                if (!r)
                    if (e = ll(o), e !== null) {
                        if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), En(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !Q) return de(t), null
                    } else 2 * b() - i.renderingStartTime > hn && n !== 1073741824 && (t.flags |= 128, r = !0, En(i, !1), t.lanes = 4194304);
                i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o)
            }
            return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = b(), t.sibling = null, n = G.current, V(G, r ? n & 1 | 2 : n & 1), t) : (de(t), null);
        case 22:
        case 23:
            return $o(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? xe & 1073741824 && (de(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : de(t), null;
        case 24:
            return null;
        case 25:
            return null
    }
    throw Error(y(156, t.tag))
}

function Cf(e, t) {
    switch (vo(t), t.tag) {
        case 1:
            return ke(t.type) && Jr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
            return pn(), W(_e), W(pe), Po(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
            return No(t), null;
        case 13:
            if (W(G), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                if (t.alternate === null) throw Error(y(340));
                dn()
            }
            return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
            return W(G), null;
        case 4:
            return pn(), null;
        case 10:
            return So(t.type._context), null;
        case 22:
        case 23:
            return $o(), null;
        case 24:
            return null;
        default:
            return null
    }
}
var Er = !1,
    fe = !1,
    Ef = typeof WeakSet == "function" ? WeakSet : Set,
    E = null;

function en(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function") try {
            n(null)
        } catch (r) {
            q(e, t, r)
        } else n.current = null
}

function Vi(e, t, n) {
    try {
        n()
    } catch (r) {
        q(e, t, r)
    }
}
var Wu = !1;

function Nf(e, t) {
    if (Ci = Xr, e = ta(), go(e)) {
        if ("selectionStart" in e) var n = {
            start: e.selectionStart,
            end: e.selectionEnd
        };
        else e: {
            n = (n = e.ownerDocument) && n.defaultView || window;
            var r = n.getSelection && n.getSelection();
            if (r && r.rangeCount !== 0) {
                n = r.anchorNode;
                var l = r.anchorOffset,
                    i = r.focusNode;
                r = r.focusOffset;
                try {
                    n.nodeType, i.nodeType
                } catch {
                    n = null;
                    break e
                }
                var o = 0,
                    u = -1,
                    s = -1,
                    c = 0,
                    h = 0,
                    m = e,
                    p = null;
                t: for (;;) {
                    for (var w; m !== n || l !== 0 && m.nodeType !== 3 || (u = o + l), m !== i || r !== 0 && m.nodeType !== 3 || (s = o + r), m.nodeType === 3 && (o += m.nodeValue.length), (w = m.firstChild) !== null;) p = m, m = w;
                    for (;;) {
                        if (m === e) break t;
                        if (p === n && ++c === l && (u = o), p === i && ++h === r && (s = o), (w = m.nextSibling) !== null) break;
                        m = p, p = m.parentNode
                    }
                    m = w
                }
                n = u === -1 || s === -1 ? null : {
                    start: u,
                    end: s
                }
            } else n = null
        }
        n = n || {
            start: 0,
            end: 0
        }
    } else n = null;
    for (Ei = {
            focusedElem: e,
            selectionRange: n
        }, Xr = !1, E = t; E !== null;)
        if (t = E, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, E = e;
        else
            for (; E !== null;) {
                t = E;
                try {
                    var _ = t.alternate;
                    if (t.flags & 1024) switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (_ !== null) {
                                var k = _.memoizedProps,
                                    R = _.memoizedState,
                                    d = t.stateNode,
                                    a = d.getSnapshotBeforeUpdate(t.elementType === t.type ? k : Fe(t.type, k), R);
                                d.__reactInternalSnapshotBeforeUpdate = a
                            }
                            break;
                        case 3:
                            var f = t.stateNode.containerInfo;
                            f.nodeType === 1 ? f.textContent = "" : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(y(163))
                    }
                } catch (g) {
                    q(t, t.return, g)
                }
                if (e = t.sibling, e !== null) {
                    e.return = t.return, E = e;
                    break
                }
                E = t.return
            }
    return _ = Wu, Wu = !1, _
}

function jn(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
        var l = r = r.next;
        do {
            if ((l.tag & e) === e) {
                var i = l.destroy;
                l.destroy = void 0, i !== void 0 && Vi(t, n, i)
            }
            l = l.next
        } while (l !== r)
    }
}

function Sl(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}

function Bi(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}

function Ja(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Ja(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Qe], delete t[Zn], delete t[zi], delete t[sf], delete t[af])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
}

function qa(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}

function Qu(e) {
    e: for (;;) {
        for (; e.sibling === null;) {
            if (e.return === null || qa(e.return)) return null;
            e = e.return
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            e.child.return = e, e = e.child
        }
        if (!(e.flags & 2)) return e.stateNode
    }
}

function Hi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Zr));
    else if (r !== 4 && (e = e.child, e !== null))
        for (Hi(e, t, n), e = e.sibling; e !== null;) Hi(e, t, n), e = e.sibling
}

function Wi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null))
        for (Wi(e, t, n), e = e.sibling; e !== null;) Wi(e, t, n), e = e.sibling
}
var ue = null,
    je = !1;

function ot(e, t, n) {
    for (n = n.child; n !== null;) ba(e, t, n), n = n.sibling
}

function ba(e, t, n) {
    if (Ke && typeof Ke.onCommitFiberUnmount == "function") try {
        Ke.onCommitFiberUnmount(ml, n)
    } catch {}
    switch (n.tag) {
        case 5:
            fe || en(n, t);
        case 6:
            var r = ue,
                l = je;
            ue = null, ot(e, t, n), ue = r, je = l, ue !== null && (je ? (e = ue, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ue.removeChild(n.stateNode));
            break;
        case 18:
            ue !== null && (je ? (e = ue, n = n.stateNode, e.nodeType === 8 ? Kl(e.parentNode, n) : e.nodeType === 1 && Kl(e, n), Qn(e)) : Kl(ue, n.stateNode));
            break;
        case 4:
            r = ue, l = je, ue = n.stateNode.containerInfo, je = !0, ot(e, t, n), ue = r, je = l;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!fe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
                l = r = r.next;
                do {
                    var i = l,
                        o = i.destroy;
                    i = i.tag, o !== void 0 && (i & 2 || i & 4) && Vi(n, t, o), l = l.next
                } while (l !== r)
            }
            ot(e, t, n);
            break;
        case 1:
            if (!fe && (en(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
                r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
            } catch (u) {
                q(n, t, u)
            }
            ot(e, t, n);
            break;
        case 21:
            ot(e, t, n);
            break;
        case 22:
            n.mode & 1 ? (fe = (r = fe) || n.memoizedState !== null, ot(e, t, n), fe = r) : ot(e, t, n);
            break;
        default:
            ot(e, t, n)
    }
}

function Ku(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Ef), t.forEach(function(r) {
            var l = Mf.bind(null, e, r);
            n.has(r) || (n.add(r), r.then(l, l))
        })
    }
}

function Me(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var l = n[r];
            try {
                var i = e,
                    o = t,
                    u = o;
                e: for (; u !== null;) {
                    switch (u.tag) {
                        case 5:
                            ue = u.stateNode, je = !1;
                            break e;
                        case 3:
                            ue = u.stateNode.containerInfo, je = !0;
                            break e;
                        case 4:
                            ue = u.stateNode.containerInfo, je = !0;
                            break e
                    }
                    u = u.return
                }
                if (ue === null) throw Error(y(160));
                ba(i, o, l), ue = null, je = !1;
                var s = l.alternate;
                s !== null && (s.return = null), l.return = null
            } catch (c) {
                q(l, t, c)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null;) ec(t, e), t = t.sibling
}

function ec(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (Me(t, e), He(e), r & 4) {
                try {
                    jn(3, e, e.return), Sl(3, e)
                } catch (k) {
                    q(e, e.return, k)
                }
                try {
                    jn(5, e, e.return)
                } catch (k) {
                    q(e, e.return, k)
                }
            }
            break;
        case 1:
            Me(t, e), He(e), r & 512 && n !== null && en(n, n.return);
            break;
        case 5:
            if (Me(t, e), He(e), r & 512 && n !== null && en(n, n.return), e.flags & 32) {
                var l = e.stateNode;
                try {
                    Vn(l, "")
                } catch (k) {
                    q(e, e.return, k)
                }
            }
            if (r & 4 && (l = e.stateNode, l != null)) {
                var i = e.memoizedProps,
                    o = n !== null ? n.memoizedProps : i,
                    u = e.type,
                    s = e.updateQueue;
                if (e.updateQueue = null, s !== null) try {
                    u === "input" && i.type === "radio" && i.name != null && Ss(l, i), mi(u, o);
                    var c = mi(u, i);
                    for (o = 0; o < s.length; o += 2) {
                        var h = s[o],
                            m = s[o + 1];
                        h === "style" ? Ps(l, m) : h === "dangerouslySetInnerHTML" ? Es(l, m) : h === "children" ? Vn(l, m) : no(l, h, m, c)
                    }
                    switch (u) {
                        case "input":
                            ai(l, i);
                            break;
                        case "textarea":
                            xs(l, i);
                            break;
                        case "select":
                            var p = l._wrapperState.wasMultiple;
                            l._wrapperState.wasMultiple = !!i.multiple;
                            var w = i.value;
                            w != null ? nn(l, !!i.multiple, w, !1) : p !== !!i.multiple && (i.defaultValue != null ? nn(l, !!i.multiple, i.defaultValue, !0) : nn(l, !!i.multiple, i.multiple ? [] : "", !1))
                    }
                    l[Zn] = i
                } catch (k) {
                    q(e, e.return, k)
                }
            }
            break;
        case 6:
            if (Me(t, e), He(e), r & 4) {
                if (e.stateNode === null) throw Error(y(162));
                l = e.stateNode, i = e.memoizedProps;
                try {
                    l.nodeValue = i
                } catch (k) {
                    q(e, e.return, k)
                }
            }
            break;
        case 3:
            if (Me(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
                Qn(t.containerInfo)
            } catch (k) {
                q(e, e.return, k)
            }
            break;
        case 4:
            Me(t, e), He(e);
            break;
        case 13:
            Me(t, e), He(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Fo = b())), r & 4 && Ku(e);
            break;
        case 22:
            if (h = n !== null && n.memoizedState !== null, e.mode & 1 ? (fe = (c = fe) || h, Me(t, e), fe = c) : Me(t, e), He(e), r & 8192) {
                if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !h && e.mode & 1)
                    for (E = e, h = e.child; h !== null;) {
                        for (m = E = h; E !== null;) {
                            switch (p = E, w = p.child, p.tag) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    jn(4, p, p.return);
                                    break;
                                case 1:
                                    en(p, p.return);
                                    var _ = p.stateNode;
                                    if (typeof _.componentWillUnmount == "function") {
                                        r = p, n = p.return;
                                        try {
                                            t = r, _.props = t.memoizedProps, _.state = t.memoizedState, _.componentWillUnmount()
                                        } catch (k) {
                                            q(r, n, k)
                                        }
                                    }
                                    break;
                                case 5:
                                    en(p, p.return);
                                    break;
                                case 22:
                                    if (p.memoizedState !== null) {
                                        Yu(m);
                                        continue
                                    }
                            }
                            w !== null ? (w.return = p, E = w) : Yu(m)
                        }
                        h = h.sibling
                    }
                e: for (h = null, m = e;;) {
                    if (m.tag === 5) {
                        if (h === null) {
                            h = m;
                            try {
                                l = m.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (u = m.stateNode, s = m.memoizedProps.style, o = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = Ns("display", o))
                            } catch (k) {
                                q(e, e.return, k)
                            }
                        }
                    } else if (m.tag === 6) {
                        if (h === null) try {
                            m.stateNode.nodeValue = c ? "" : m.memoizedProps
                        } catch (k) {
                            q(e, e.return, k)
                        }
                    } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
                        m.child.return = m, m = m.child;
                        continue
                    }
                    if (m === e) break e;
                    for (; m.sibling === null;) {
                        if (m.return === null || m.return === e) break e;
                        h === m && (h = null), m = m.return
                    }
                    h === m && (h = null), m.sibling.return = m.return, m = m.sibling
                }
            }
            break;
        case 19:
            Me(t, e), He(e), r & 4 && Ku(e);
            break;
        case 21:
            break;
        default:
            Me(t, e), He(e)
    }
}

function He(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null;) {
                    if (qa(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(y(160))
            }
            switch (r.tag) {
                case 5:
                    var l = r.stateNode;
                    r.flags & 32 && (Vn(l, ""), r.flags &= -33);
                    var i = Qu(e);
                    Wi(e, i, l);
                    break;
                case 3:
                case 4:
                    var o = r.stateNode.containerInfo,
                        u = Qu(e);
                    Hi(e, u, o);
                    break;
                default:
                    throw Error(y(161))
            }
        }
        catch (s) {
            q(e, e.return, s)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}

function Pf(e, t, n) {
    E = e, tc(e)
}

function tc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; E !== null;) {
        var l = E,
            i = l.child;
        if (l.tag === 22 && r) {
            var o = l.memoizedState !== null || Er;
            if (!o) {
                var u = l.alternate,
                    s = u !== null && u.memoizedState !== null || fe;
                u = Er;
                var c = fe;
                if (Er = o, (fe = s) && !c)
                    for (E = l; E !== null;) o = E, s = o.child, o.tag === 22 && o.memoizedState !== null ? Gu(l) : s !== null ? (s.return = o, E = s) : Gu(l);
                for (; i !== null;) E = i, tc(i), i = i.sibling;
                E = l, Er = u, fe = c
            }
            Xu(e)
        } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, E = i) : Xu(e)
    }
}

function Xu(e) {
    for (; E !== null;) {
        var t = E;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772) switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        fe || Sl(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !fe)
                            if (n === null) r.componentDidMount();
                            else {
                                var l = t.elementType === t.type ? n.memoizedProps : Fe(t.type, n.memoizedProps);
                                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            } var i = t.updateQueue;
                        i !== null && Iu(t, i, r);
                        break;
                    case 3:
                        var o = t.updateQueue;
                        if (o !== null) {
                            if (n = null, t.child !== null) switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                            }
                            Iu(t, o, n)
                        }
                        break;
                    case 5:
                        var u = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = u;
                            var s = t.memoizedProps;
                            switch (t.type) {
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                    s.autoFocus && n.focus();
                                    break;
                                case "img":
                                    s.src && (n.src = s.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var c = t.alternate;
                            if (c !== null) {
                                var h = c.memoizedState;
                                if (h !== null) {
                                    var m = h.dehydrated;
                                    m !== null && Qn(m)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(y(163))
                }
                fe || t.flags & 512 && Bi(t)
            } catch (p) {
                q(t, t.return, p)
            }
        }
        if (t === e) {
            E = null;
            break
        }
        if (n = t.sibling, n !== null) {
            n.return = t.return, E = n;
            break
        }
        E = t.return
    }
}

function Yu(e) {
    for (; E !== null;) {
        var t = E;
        if (t === e) {
            E = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return, E = n;
            break
        }
        E = t.return
    }
}

function Gu(e) {
    for (; E !== null;) {
        var t = E;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        Sl(4, t)
                    } catch (s) {
                        q(t, n, s)
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var l = t.return;
                        try {
                            r.componentDidMount()
                        } catch (s) {
                            q(t, l, s)
                        }
                    }
                    var i = t.return;
                    try {
                        Bi(t)
                    } catch (s) {
                        q(t, i, s)
                    }
                    break;
                case 5:
                    var o = t.return;
                    try {
                        Bi(t)
                    } catch (s) {
                        q(t, o, s)
                    }
            }
        } catch (s) {
            q(t, t.return, s)
        }
        if (t === e) {
            E = null;
            break
        }
        var u = t.sibling;
        if (u !== null) {
            u.return = t.return, E = u;
            break
        }
        E = t.return
    }
}
var zf = Math.ceil,
    ul = lt.ReactCurrentDispatcher,
    Oo = lt.ReactCurrentOwner,
    De = lt.ReactCurrentBatchConfig,
    j = 0,
    ie = null,
    ee = null,
    se = 0,
    xe = 0,
    tn = Et(0),
    re = 0,
    nr = null,
    At = 0,
    xl = 0,
    Mo = 0,
    $n = null,
    ve = null,
    Fo = 0,
    hn = 1 / 0,
    Ge = null,
    sl = !1,
    Qi = null,
    wt = null,
    Nr = !1,
    ft = null,
    al = 0,
    An = 0,
    Ki = null,
    Ar = -1,
    Ur = 0;

function he() {
    return j & 6 ? b() : Ar !== -1 ? Ar : Ar = b()
}

function _t(e) {
    return e.mode & 1 ? j & 2 && se !== 0 ? se & -se : df.transition !== null ? (Ur === 0 && (Ur = As()), Ur) : (e = A, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ks(e.type)), e) : 1
}

function Ue(e, t, n, r) {
    if (50 < An) throw An = 0, Ki = null, Error(y(185));
    ir(e, n, r), (!(j & 2) || e !== ie) && (e === ie && (!(j & 2) && (xl |= n), re === 4 && ct(e, se)), Se(e, r), n === 1 && j === 0 && !(t.mode & 1) && (hn = b() + 500, wl && Nt()))
}

function Se(e, t) {
    var n = e.callbackNode;
    cd(e, t);
    var r = Kr(e, e === ie ? se : 0);
    if (r === 0) n !== null && lu(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
        if (n != null && lu(n), t === 1) e.tag === 0 ? cf(Zu.bind(null, e)) : da(Zu.bind(null, e)), of(function() {
            !(j & 6) && Nt()
        }), n = null;
        else {
            switch (Us(r)) {
                case 1:
                    n = uo;
                    break;
                case 4:
                    n = js;
                    break;
                case 16:
                    n = Qr;
                    break;
                case 536870912:
                    n = $s;
                    break;
                default:
                    n = Qr
            }
            n = ac(n, nc.bind(null, e))
        }
        e.callbackPriority = t, e.callbackNode = n
    }
}

function nc(e, t) {
    if (Ar = -1, Ur = 0, j & 6) throw Error(y(327));
    var n = e.callbackNode;
    if (sn() && e.callbackNode !== n) return null;
    var r = Kr(e, e === ie ? se : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = cl(e, r);
    else {
        t = r;
        var l = j;
        j |= 2;
        var i = lc();
        (ie !== e || se !== t) && (Ge = null, hn = b() + 500, Ot(e, t));
        do try {
            If();
            break
        } catch (u) {
            rc(e, u)
        }
        while (1);
        ko(), ul.current = i, j = l, ee !== null ? t = 0 : (ie = null, se = 0, t = re)
    }
    if (t !== 0) {
        if (t === 2 && (l = wi(e), l !== 0 && (r = l, t = Xi(e, l))), t === 1) throw n = nr, Ot(e, 0), ct(e, r), Se(e, b()), n;
        if (t === 6) ct(e, r);
        else {
            if (l = e.current.alternate, !(r & 30) && !Tf(l) && (t = cl(e, r), t === 2 && (i = wi(e), i !== 0 && (r = i, t = Xi(e, i))), t === 1)) throw n = nr, Ot(e, 0), ct(e, r), Se(e, b()), n;
            switch (e.finishedWork = l, e.finishedLanes = r, t) {
                case 0:
                case 1:
                    throw Error(y(345));
                case 2:
                    Lt(e, ve, Ge);
                    break;
                case 3:
                    if (ct(e, r), (r & 130023424) === r && (t = Fo + 500 - b(), 10 < t)) {
                        if (Kr(e, 0) !== 0) break;
                        if (l = e.suspendedLanes, (l & r) !== r) {
                            he(), e.pingedLanes |= e.suspendedLanes & l;
                            break
                        }
                        e.timeoutHandle = Pi(Lt.bind(null, e, ve, Ge), t);
                        break
                    }
                    Lt(e, ve, Ge);
                    break;
                case 4:
                    if (ct(e, r), (r & 4194240) === r) break;
                    for (t = e.eventTimes, l = -1; 0 < r;) {
                        var o = 31 - Ae(r);
                        i = 1 << o, o = t[o], o > l && (l = o), r &= ~i
                    }
                    if (r = l, r = b() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * zf(r / 1960)) - r, 10 < r) {
                        e.timeoutHandle = Pi(Lt.bind(null, e, ve, Ge), r);
                        break
                    }
                    Lt(e, ve, Ge);
                    break;
                case 5:
                    Lt(e, ve, Ge);
                    break;
                default:
                    throw Error(y(329))
            }
        }
    }
    return Se(e, b()), e.callbackNode === n ? nc.bind(null, e) : null
}

function Xi(e, t) {
    var n = $n;
    return e.current.memoizedState.isDehydrated && (Ot(e, t).flags |= 256), e = cl(e, t), e !== 2 && (t = ve, ve = n, t !== null && Yi(t)), e
}

function Yi(e) {
    ve === null ? ve = e : ve.push.apply(ve, e)
}

function Tf(e) {
    for (var t = e;;) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores, n !== null))
                for (var r = 0; r < n.length; r++) {
                    var l = n[r],
                        i = l.getSnapshot;
                    l = l.value;
                    try {
                        if (!Ve(i(), l)) return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
        else {
            if (t === e) break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e) return !0;
                t = t.return
            }
            t.sibling.return = t.return, t = t.sibling
        }
    }
    return !0
}

function ct(e, t) {
    for (t &= ~Mo, t &= ~xl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
        var n = 31 - Ae(t),
            r = 1 << n;
        e[n] = -1, t &= ~r
    }
}

function Zu(e) {
    if (j & 6) throw Error(y(327));
    sn();
    var t = Kr(e, 0);
    if (!(t & 1)) return Se(e, b()), null;
    var n = cl(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = wi(e);
        r !== 0 && (t = r, n = Xi(e, r))
    }
    if (n === 1) throw n = nr, Ot(e, 0), ct(e, t), Se(e, b()), n;
    if (n === 6) throw Error(y(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Lt(e, ve, Ge), Se(e, b()), null
}

function jo(e, t) {
    var n = j;
    j |= 1;
    try {
        return e(t)
    } finally {
        j = n, j === 0 && (hn = b() + 500, wl && Nt())
    }
}

function Ut(e) {
    ft !== null && ft.tag === 0 && !(j & 6) && sn();
    var t = j;
    j |= 1;
    var n = De.transition,
        r = A;
    try {
        if (De.transition = null, A = 1, e) return e()
    } finally {
        A = r, De.transition = n, j = t, !(j & 6) && Nt()
    }
}

function $o() {
    xe = tn.current, W(tn)
}

function Ot(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, lf(n)), ee !== null)
        for (n = ee.return; n !== null;) {
            var r = n;
            switch (vo(r), r.tag) {
                case 1:
                    r = r.type.childContextTypes, r != null && Jr();
                    break;
                case 3:
                    pn(), W(_e), W(pe), Po();
                    break;
                case 5:
                    No(r);
                    break;
                case 4:
                    pn();
                    break;
                case 13:
                    W(G);
                    break;
                case 19:
                    W(G);
                    break;
                case 10:
                    So(r.type._context);
                    break;
                case 22:
                case 23:
                    $o()
            }
            n = n.return
        }
    if (ie = e, ee = e = kt(e.current, null), se = xe = t, re = 0, nr = null, Mo = xl = At = 0, ve = $n = null, Dt !== null) {
        for (t = 0; t < Dt.length; t++)
            if (n = Dt[t], r = n.interleaved, r !== null) {
                n.interleaved = null;
                var l = r.next,
                    i = n.pending;
                if (i !== null) {
                    var o = i.next;
                    i.next = l, r.next = o
                }
                n.pending = r
            } Dt = null
    }
    return e
}

function rc(e, t) {
    do {
        var n = ee;
        try {
            if (ko(), Fr.current = ol, il) {
                for (var r = Z.memoizedState; r !== null;) {
                    var l = r.queue;
                    l !== null && (l.pending = null), r = r.next
                }
                il = !1
            }
            if ($t = 0, le = ne = Z = null, Fn = !1, bn = 0, Oo.current = null, n === null || n.return === null) {
                re = 1, nr = t, ee = null;
                break
            }
            e: {
                var i = e,
                    o = n.return,
                    u = n,
                    s = t;
                if (t = se, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
                    var c = s,
                        h = u,
                        m = h.tag;
                    if (!(h.mode & 1) && (m === 0 || m === 11 || m === 15)) {
                        var p = h.alternate;
                        p ? (h.updateQueue = p.updateQueue, h.memoizedState = p.memoizedState, h.lanes = p.lanes) : (h.updateQueue = null, h.memoizedState = null)
                    }
                    var w = ju(o);
                    if (w !== null) {
                        w.flags &= -257, $u(w, o, u, i, t), w.mode & 1 && Fu(i, c, t), t = w, s = c;
                        var _ = t.updateQueue;
                        if (_ === null) {
                            var k = new Set;
                            k.add(s), t.updateQueue = k
                        } else _.add(s);
                        break e
                    } else {
                        if (!(t & 1)) {
                            Fu(i, c, t), Ao();
                            break e
                        }
                        s = Error(y(426))
                    }
                } else if (Q && u.mode & 1) {
                    var R = ju(o);
                    if (R !== null) {
                        !(R.flags & 65536) && (R.flags |= 256), $u(R, o, u, i, t), wo(mn(s, u));
                        break e
                    }
                }
                i = s = mn(s, u),
                re !== 4 && (re = 2),
                $n === null ? $n = [i] : $n.push(i),
                i = o;do {
                    switch (i.tag) {
                        case 3:
                            i.flags |= 65536, t &= -t, i.lanes |= t;
                            var d = Ua(i, s, t);
                            Lu(i, d);
                            break e;
                        case 1:
                            u = s;
                            var a = i.type,
                                f = i.stateNode;
                            if (!(i.flags & 128) && (typeof a.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (wt === null || !wt.has(f)))) {
                                i.flags |= 65536, t &= -t, i.lanes |= t;
                                var g = Va(i, u, t);
                                Lu(i, g);
                                break e
                            }
                    }
                    i = i.return
                } while (i !== null)
            }
            oc(n)
        } catch (C) {
            t = C, ee === n && n !== null && (ee = n = n.return);
            continue
        }
        break
    } while (1)
}

function lc() {
    var e = ul.current;
    return ul.current = ol, e === null ? ol : e
}

function Ao() {
    (re === 0 || re === 3 || re === 2) && (re = 4), ie === null || !(At & 268435455) && !(xl & 268435455) || ct(ie, se)
}

function cl(e, t) {
    var n = j;
    j |= 2;
    var r = lc();
    (ie !== e || se !== t) && (Ge = null, Ot(e, t));
    do try {
        Lf();
        break
    } catch (l) {
        rc(e, l)
    }
    while (1);
    if (ko(), j = n, ul.current = r, ee !== null) throw Error(y(261));
    return ie = null, se = 0, re
}

function Lf() {
    for (; ee !== null;) ic(ee)
}

function If() {
    for (; ee !== null && !td();) ic(ee)
}

function ic(e) {
    var t = sc(e.alternate, e, xe);
    e.memoizedProps = e.pendingProps, t === null ? oc(e) : ee = t, Oo.current = null
}

function oc(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return, t.flags & 32768) {
            if (n = Cf(n, t), n !== null) {
                n.flags &= 32767, ee = n;
                return
            }
            if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
            else {
                re = 6, ee = null;
                return
            }
        } else if (n = xf(n, t, xe), n !== null) {
            ee = n;
            return
        }
        if (t = t.sibling, t !== null) {
            ee = t;
            return
        }
        ee = t = e
    } while (t !== null);
    re === 0 && (re = 5)
}

function Lt(e, t, n) {
    var r = A,
        l = De.transition;
    try {
        De.transition = null, A = 1, Df(e, t, n, r)
    } finally {
        De.transition = l, A = r
    }
    return null
}

function Df(e, t, n, r) {
    do sn(); while (ft !== null);
    if (j & 6) throw Error(y(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(y(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var i = n.lanes | n.childLanes;
    if (dd(e, i), e === ie && (ee = ie = null, se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Nr || (Nr = !0, ac(Qr, function() {
            return sn(), null
        })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
        i = De.transition, De.transition = null;
        var o = A;
        A = 1;
        var u = j;
        j |= 4, Oo.current = null, Nf(e, n), ec(n, e), Jd(Ei), Xr = !!Ci, Ei = Ci = null, e.current = n, Pf(n), nd(), j = u, A = o, De.transition = i
    } else e.current = n;
    if (Nr && (Nr = !1, ft = e, al = l), i = e.pendingLanes, i === 0 && (wt = null), id(n.stateNode), Se(e, b()), t !== null)
        for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, {
            componentStack: l.stack,
            digest: l.digest
        });
    if (sl) throw sl = !1, e = Qi, Qi = null, e;
    return al & 1 && e.tag !== 0 && sn(), i = e.pendingLanes, i & 1 ? e === Ki ? An++ : (An = 0, Ki = e) : An = 0, Nt(), null
}

function sn() {
    if (ft !== null) {
        var e = Us(al),
            t = De.transition,
            n = A;
        try {
            if (De.transition = null, A = 16 > e ? 16 : e, ft === null) var r = !1;
            else {
                if (e = ft, ft = null, al = 0, j & 6) throw Error(y(331));
                var l = j;
                for (j |= 4, E = e.current; E !== null;) {
                    var i = E,
                        o = i.child;
                    if (E.flags & 16) {
                        var u = i.deletions;
                        if (u !== null) {
                            for (var s = 0; s < u.length; s++) {
                                var c = u[s];
                                for (E = c; E !== null;) {
                                    var h = E;
                                    switch (h.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            jn(8, h, i)
                                    }
                                    var m = h.child;
                                    if (m !== null) m.return = h, E = m;
                                    else
                                        for (; E !== null;) {
                                            h = E;
                                            var p = h.sibling,
                                                w = h.return;
                                            if (Ja(h), h === c) {
                                                E = null;
                                                break
                                            }
                                            if (p !== null) {
                                                p.return = w, E = p;
                                                break
                                            }
                                            E = w
                                        }
                                }
                            }
                            var _ = i.alternate;
                            if (_ !== null) {
                                var k = _.child;
                                if (k !== null) {
                                    _.child = null;
                                    do {
                                        var R = k.sibling;
                                        k.sibling = null, k = R
                                    } while (k !== null)
                                }
                            }
                            E = i
                        }
                    }
                    if (i.subtreeFlags & 2064 && o !== null) o.return = i, E = o;
                    else e: for (; E !== null;) {
                        if (i = E, i.flags & 2048) switch (i.tag) {
                            case 0:
                            case 11:
                            case 15:
                                jn(9, i, i.return)
                        }
                        var d = i.sibling;
                        if (d !== null) {
                            d.return = i.return, E = d;
                            break e
                        }
                        E = i.return
                    }
                }
                var a = e.current;
                for (E = a; E !== null;) {
                    o = E;
                    var f = o.child;
                    if (o.subtreeFlags & 2064 && f !== null) f.return = o, E = f;
                    else e: for (o = a; E !== null;) {
                        if (u = E, u.flags & 2048) try {
                            switch (u.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Sl(9, u)
                            }
                        } catch (C) {
                            q(u, u.return, C)
                        }
                        if (u === o) {
                            E = null;
                            break e
                        }
                        var g = u.sibling;
                        if (g !== null) {
                            g.return = u.return, E = g;
                            break e
                        }
                        E = u.return
                    }
                }
                if (j = l, Nt(), Ke && typeof Ke.onPostCommitFiberRoot == "function") try {
                    Ke.onPostCommitFiberRoot(ml, e)
                } catch {}
                r = !0
            }
            return r
        } finally {
            A = n, De.transition = t
        }
    }
    return !1
}

function Ju(e, t, n) {
    t = mn(n, t), t = Ua(e, t, 1), e = vt(e, t, 1), t = he(), e !== null && (ir(e, 1, t), Se(e, t))
}

function q(e, t, n) {
    if (e.tag === 3) Ju(e, e, n);
    else
        for (; t !== null;) {
            if (t.tag === 3) {
                Ju(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (wt === null || !wt.has(r))) {
                    e = mn(n, e), e = Va(t, e, 1), t = vt(t, e, 1), e = he(), t !== null && (ir(t, 1, e), Se(t, e));
                    break
                }
            }
            t = t.return
        }
}

function Rf(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = he(), e.pingedLanes |= e.suspendedLanes & n, ie === e && (se & n) === n && (re === 4 || re === 3 && (se & 130023424) === se && 500 > b() - Fo ? Ot(e, 0) : Mo |= n), Se(e, t)
}

function uc(e, t) {
    t === 0 && (e.mode & 1 ? (t = gr, gr <<= 1, !(gr & 130023424) && (gr = 4194304)) : t = 1);
    var n = he();
    e = nt(e, t), e !== null && (ir(e, t, n), Se(e, n))
}

function Of(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), uc(e, n)
}

function Mf(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                l = e.memoizedState;
            l !== null && (n = l.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(y(314))
    }
    r !== null && r.delete(t), uc(e, n)
}
var sc;
sc = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || _e.current) we = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128)) return we = !1, Sf(e, t, n);
            we = !!(e.flags & 131072)
        }
    else we = !1, Q && t.flags & 1048576 && fa(t, el, t.index);
    switch (t.lanes = 0, t.tag) {
        case 2:
            var r = t.type;
            $r(e, t), e = t.pendingProps;
            var l = cn(t, pe.current);
            un(t, n), l = To(null, t, r, e, l, n);
            var i = Lo();
            return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ke(r) ? (i = !0, qr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Co(t), l.updater = kl, t.stateNode = l, l._reactInternals = t, Oi(t, r, e, n), t = ji(null, t, r, !0, i, n)) : (t.tag = 0, Q && i && yo(t), me(null, t, l, n), t = t.child), t;
        case 16:
            r = t.elementType;
            e: {
                switch ($r(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = jf(r), e = Fe(r, e), l) {
                    case 0:
                        t = Fi(null, t, r, e, n);
                        break e;
                    case 1:
                        t = Vu(null, t, r, e, n);
                        break e;
                    case 11:
                        t = Au(null, t, r, e, n);
                        break e;
                    case 14:
                        t = Uu(null, t, r, Fe(r.type, e), n);
                        break e
                }
                throw Error(y(306, r, ""))
            }
            return t;
        case 0:
            return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Fi(e, t, r, l, n);
        case 1:
            return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Vu(e, t, r, l, n);
        case 3:
            e: {
                if (Qa(t), e === null) throw Error(y(387));r = t.pendingProps,
                i = t.memoizedState,
                l = i.element,
                va(e, t),
                rl(t, r, null, n);
                var o = t.memoizedState;
                if (r = o.element, i.isDehydrated)
                    if (i = {
                            element: r,
                            isDehydrated: !1,
                            cache: o.cache,
                            pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                            transitions: o.transitions
                        }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
                        l = mn(Error(y(423)), t), t = Bu(e, t, r, n, l);
                        break e
                    } else if (r !== l) {
                    l = mn(Error(y(424)), t), t = Bu(e, t, r, n, l);
                    break e
                } else
                    for (Ce = yt(t.stateNode.containerInfo.firstChild), Ee = t, Q = !0, $e = null, n = ga(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
                else {
                    if (dn(), r === l) {
                        t = rt(e, t, n);
                        break e
                    }
                    me(e, t, r, n)
                }
                t = t.child
            }
            return t;
        case 5:
            return wa(t), e === null && Ii(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Ni(r, l) ? o = null : i !== null && Ni(r, i) && (t.flags |= 32), Wa(e, t), me(e, t, o, n), t.child;
        case 6:
            return e === null && Ii(t), null;
        case 13:
            return Ka(e, t, n);
        case 4:
            return Eo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = fn(t, null, r, n) : me(e, t, r, n), t.child;
        case 11:
            return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Au(e, t, r, l, n);
        case 7:
            return me(e, t, t.pendingProps, n), t.child;
        case 8:
            return me(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return me(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, V(tl, r._currentValue), r._currentValue = o, i !== null)
                    if (Ve(i.value, o)) {
                        if (i.children === l.children && !_e.current) {
                            t = rt(e, t, n);
                            break e
                        }
                    } else
                        for (i = t.child, i !== null && (i.return = t); i !== null;) {
                            var u = i.dependencies;
                            if (u !== null) {
                                o = i.child;
                                for (var s = u.firstContext; s !== null;) {
                                    if (s.context === r) {
                                        if (i.tag === 1) {
                                            s = be(-1, n & -n), s.tag = 2;
                                            var c = i.updateQueue;
                                            if (c !== null) {
                                                c = c.shared;
                                                var h = c.pending;
                                                h === null ? s.next = s : (s.next = h.next, h.next = s), c.pending = s
                                            }
                                        }
                                        i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), Di(i.return, n, t), u.lanes |= n;
                                        break
                                    }
                                    s = s.next
                                }
                            } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
                            else if (i.tag === 18) {
                                if (o = i.return, o === null) throw Error(y(341));
                                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Di(o, n, t), o = i.sibling
                            } else o = i.child;
                            if (o !== null) o.return = i;
                            else
                                for (o = i; o !== null;) {
                                    if (o === t) {
                                        o = null;
                                        break
                                    }
                                    if (i = o.sibling, i !== null) {
                                        i.return = o.return, o = i;
                                        break
                                    }
                                    o = o.return
                                }
                            i = o
                        }
                me(e, t, l.children, n),
                t = t.child
            }
            return t;
        case 9:
            return l = t.type, r = t.pendingProps.children, un(t, n), l = Re(l), r = r(l), t.flags |= 1, me(e, t, r, n), t.child;
        case 14:
            return r = t.type, l = Fe(r, t.pendingProps), l = Fe(r.type, l), Uu(e, t, r, l, n);
        case 15:
            return Ba(e, t, t.type, t.pendingProps, n);
        case 17:
            return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), $r(e, t), t.tag = 1, ke(r) ? (e = !0, qr(t)) : e = !1, un(t, n), Aa(t, r, l), Oi(t, r, l, n), ji(null, t, r, !0, e, n);
        case 19:
            return Xa(e, t, n);
        case 22:
            return Ha(e, t, n)
    }
    throw Error(y(156, t.tag))
};

function ac(e, t) {
    return Fs(e, t)
}

function Ff(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
}

function Ie(e, t, n, r) {
    return new Ff(e, t, n, r)
}

function Uo(e) {
    return e = e.prototype, !(!e || !e.isReactComponent)
}

function jf(e) {
    if (typeof e == "function") return Uo(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof, e === lo) return 11;
        if (e === io) return 14
    }
    return 2
}

function kt(e, t) {
    var n = e.alternate;
    return n === null ? (n = Ie(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
}

function Vr(e, t, n, r, l, i) {
    var o = 2;
    if (r = e, typeof e == "function") Uo(e) && (o = 1);
    else if (typeof e == "string") o = 5;
    else e: switch (e) {
        case Qt:
            return Mt(n.children, l, i, t);
        case ro:
            o = 8, l |= 8;
            break;
        case li:
            return e = Ie(12, n, t, l | 2), e.elementType = li, e.lanes = i, e;
        case ii:
            return e = Ie(13, n, t, l), e.elementType = ii, e.lanes = i, e;
        case oi:
            return e = Ie(19, n, t, l), e.elementType = oi, e.lanes = i, e;
        case ws:
            return Cl(n, l, i, t);
        default:
            if (typeof e == "object" && e !== null) switch (e.$$typeof) {
                case ys:
                    o = 10;
                    break e;
                case vs:
                    o = 9;
                    break e;
                case lo:
                    o = 11;
                    break e;
                case io:
                    o = 14;
                    break e;
                case ut:
                    o = 16, r = null;
                    break e
            }
            throw Error(y(130, e == null ? e : typeof e, ""))
    }
    return t = Ie(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t
}

function Mt(e, t, n, r) {
    return e = Ie(7, e, r, t), e.lanes = n, e
}

function Cl(e, t, n, r) {
    return e = Ie(22, e, r, t), e.elementType = ws, e.lanes = n, e.stateNode = {
        isHidden: !1
    }, e
}

function ei(e, t, n) {
    return e = Ie(6, e, null, t), e.lanes = n, e
}

function ti(e, t, n) {
    return t = Ie(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    }, t
}

function $f(e, t, n, r, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ml(0), this.expirationTimes = Ml(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ml(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null
}

function Vo(e, t, n, r, l, i, o, u, s) {
    return e = new $f(e, t, n, u, s), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Ie(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    }, Co(i), e
}

function Af(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Wt,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}

function cc(e) {
    if (!e) return xt;
    e = e._reactInternals;
    e: {
        if (Bt(e) !== e || e.tag !== 1) throw Error(y(170));
        var t = e;do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (ke(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }
            }
            t = t.return
        } while (t !== null);
        throw Error(y(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (ke(n)) return ca(e, n, t)
    }
    return t
}

function dc(e, t, n, r, l, i, o, u, s) {
    return e = Vo(n, r, !0, e, l, i, o, u, s), e.context = cc(null), n = e.current, r = he(), l = _t(n), i = be(r, l), i.callback = t ?? null, vt(n, i, l), e.current.lanes = l, ir(e, l, r), Se(e, r), e
}

function El(e, t, n, r) {
    var l = t.current,
        i = he(),
        o = _t(l);
    return n = cc(n), t.context === null ? t.context = n : t.pendingContext = n, t = be(i, o), t.payload = {
        element: e
    }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = vt(l, t, o), e !== null && (Ue(e, l, o, i), Mr(e, l, o)), o
}

function dl(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode
    }
}

function qu(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}

function Bo(e, t) {
    qu(e, t), (e = e.alternate) && qu(e, t)
}

function Uf() {
    return null
}
var fc = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
};

function Ho(e) {
    this._internalRoot = e
}
Nl.prototype.render = Ho.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(y(409));
    El(e, t, null, null)
};
Nl.prototype.unmount = Ho.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Ut(function() {
            El(null, e, null, null)
        }), t[tt] = null
    }
};

function Nl(e) {
    this._internalRoot = e
}
Nl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = Hs();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < at.length && t !== 0 && t < at[n].priority; n++);
        at.splice(n, 0, e), n === 0 && Qs(e)
    }
};

function Wo(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}

function Pl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}

function bu() {}

function Vf(e, t, n, r, l) {
    if (l) {
        if (typeof r == "function") {
            var i = r;
            r = function() {
                var c = dl(o);
                i.call(c)
            }
        }
        var o = dc(t, r, e, 0, null, !1, !1, "", bu);
        return e._reactRootContainer = o, e[tt] = o.current, Yn(e.nodeType === 8 ? e.parentNode : e), Ut(), o
    }
    for (; l = e.lastChild;) e.removeChild(l);
    if (typeof r == "function") {
        var u = r;
        r = function() {
            var c = dl(s);
            u.call(c)
        }
    }
    var s = Vo(e, 0, !1, null, null, !1, !1, "", bu);
    return e._reactRootContainer = s, e[tt] = s.current, Yn(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
        El(t, s, n, r)
    }), s
}

function zl(e, t, n, r, l) {
    var i = n._reactRootContainer;
    if (i) {
        var o = i;
        if (typeof l == "function") {
            var u = l;
            l = function() {
                var s = dl(o);
                u.call(s)
            }
        }
        El(t, o, e, l)
    } else o = Vf(n, t, e, l, r);
    return dl(o)
}
Vs = function(e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Tn(t.pendingLanes);
                n !== 0 && (so(t, n | 1), Se(t, b()), !(j & 6) && (hn = b() + 500, Nt()))
            }
            break;
        case 13:
            Ut(function() {
                var r = nt(e, 1);
                if (r !== null) {
                    var l = he();
                    Ue(r, e, 1, l)
                }
            }), Bo(e, 1)
    }
};
ao = function(e) {
    if (e.tag === 13) {
        var t = nt(e, 134217728);
        if (t !== null) {
            var n = he();
            Ue(t, e, 134217728, n)
        }
        Bo(e, 134217728)
    }
};
Bs = function(e) {
    if (e.tag === 13) {
        var t = _t(e),
            n = nt(e, t);
        if (n !== null) {
            var r = he();
            Ue(n, e, t, r)
        }
        Bo(e, t)
    }
};
Hs = function() {
    return A
};
Ws = function(e, t) {
    var n = A;
    try {
        return A = e, t()
    } finally {
        A = n
    }
};
gi = function(e, t, n) {
    switch (t) {
        case "input":
            if (ai(e, n), t = n.name, n.type === "radio" && t != null) {
                for (n = e; n.parentNode;) n = n.parentNode;
                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var l = vl(r);
                        if (!l) throw Error(y(90));
                        ks(r), ai(r, l)
                    }
                }
            }
            break;
        case "textarea":
            xs(e, n);
            break;
        case "select":
            t = n.value, t != null && nn(e, !!n.multiple, t, !1)
    }
};
Ls = jo;
Is = Ut;
var Bf = {
        usingClientEntryPoint: !1,
        Events: [ur, Gt, vl, zs, Ts, jo]
    },
    Nn = {
        findFiberByHostInstance: It,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom"
    },
    Hf = {
        bundleType: Nn.bundleType,
        version: Nn.version,
        rendererPackageName: Nn.rendererPackageName,
        rendererConfig: Nn.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: lt.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = Os(e), e === null ? null : e.stateNode
        },
        findFiberByHostInstance: Nn.findFiberByHostInstance || Uf,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Pr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pr.isDisabled && Pr.supportsFiber) try {
        ml = Pr.inject(Hf), Ke = Pr
    } catch {}
}
Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bf;
Pe.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Wo(t)) throw Error(y(200));
    return Af(e, t, null, n)
};
Pe.createRoot = function(e, t) {
    if (!Wo(e)) throw Error(y(299));
    var n = !1,
        r = "",
        l = fc;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Vo(e, 1, !1, null, null, n, !1, r, l), e[tt] = t.current, Yn(e.nodeType === 8 ? e.parentNode : e), new Ho(t)
};
Pe.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(y(188)) : (e = Object.keys(e).join(","), Error(y(268, e)));
    return e = Os(t), e = e === null ? null : e.stateNode, e
};
Pe.flushSync = function(e) {
    return Ut(e)
};
Pe.hydrate = function(e, t, n) {
    if (!Pl(t)) throw Error(y(200));
    return zl(null, e, t, !0, n)
};
Pe.hydrateRoot = function(e, t, n) {
    if (!Wo(e)) throw Error(y(405));
    var r = n != null && n.hydratedSources || null,
        l = !1,
        i = "",
        o = fc;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = dc(t, null, e, 1, n ?? null, l, !1, i, o), e[tt] = t.current, Yn(e), r)
        for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(n, l);
    return new Nl(t)
};
Pe.render = function(e, t, n) {
    if (!Pl(t)) throw Error(y(200));
    return zl(null, e, t, !1, n)
};
Pe.unmountComponentAtNode = function(e) {
    if (!Pl(e)) throw Error(y(40));
    return e._reactRootContainer ? (Ut(function() {
        zl(null, null, e, !1, function() {
            e._reactRootContainer = null, e[tt] = null
        })
    }), !0) : !1
};
Pe.unstable_batchedUpdates = jo;
Pe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Pl(n)) throw Error(y(200));
    if (e == null || e._reactInternals === void 0) throw Error(y(38));
    return zl(e, t, n, !1, r)
};
Pe.version = "18.3.1-next-f1338f8080-20240426";

function pc() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(pc)
    } catch (e) {
        console.error(e)
    }
}
pc(), ps.exports = Pe;
var Wf = ps.exports,
    es = Wf;
ni.createRoot = es.createRoot, ni.hydrateRoot = es.hydrateRoot;
const Qo = () => !window.invokeNative,
    Qf = () => {},
    ts = (e, t) => {
        const n = Y.useRef(Qf);
        Y.useEffect(() => {
            n.current = t
        }, [t]), Y.useEffect(() => {
            const r = l => {
                const {
                    action: i,
                    data: o
                } = l.data;
                n.current && i === e && n.current(o)
            };
            return window.addEventListener("message", r), () => window.removeEventListener("message", r)
        }, [e])
    };
async function te(e, t, n) {
    if (Qo()) return n ? (await new Promise(u => setTimeout(u, n.delay)), n.data) : await new Promise(u => u);
    const r = {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(t)
        },
        l = window.GetParentResourceName ? window.GetParentResourceName() : "iCreator";
    return await (await fetch(`https://${l}/${e}`, r)).json()
}
const pt = ({
    type: e = "default",
    title: t,
    placeholder: n,
    value: r,
    changeValue: l
}) => S(pl, {
    children: U("div", {
        className: "input__text_container",
        children: [S("div", {
            className: "title",
            children: t
        }), S("input", {
            style: {
                width: e === "date" ? "33.8vh" : "100%", 
                display: "block", 
                margin: "0 auto", 
                textAlign: e === "date" ? "center" : "left" 
            },
            type: e,
            value: r,
            className: "input__text",
            placeholder: n,
            onInput: i => l(i.target.value)
        })]
    })
});

const ar = ({
        title: e,
        defaultValue: t,
        buttonChoice: n,
        changeChoice: r
    }) => {
        const [l, i] = Y.useState(t || n[0].type), o = u => {
            i(u), r(u)
        };
        return S(pl, {
            children: U("div", {
                className: "button-choice-container-principal",
                children: [S("div", {
                    className: "title",
                    children: e
                }), S("div", {
                    className: "button-choice-container",
                    children: n.map(u => U("button", {
                        className: `button-choice-item ${l===u.type?"selected":""}`,
                        onClick: () => o(u.type),
                        children: [S("img", {
                            src: u.logo,
                            alt: `${u.label} logo`,
                            className: "button-logo"
                        }), S("span", {
                            children: u.label
                        })]
                    }, u.type))
                })]
            })
        })
    },
    v = {};
v.category = {
    identity: "Identité",
    parents: "Héritage",
    face: "Visage",
    appearance: "Appareance",
    clothes: "Vêtements",
    disease: "Carnet de santé"
};
v.actions = {
    save: "Valider",
    reset: "Annuler"
};
v.identity = {
    sex: "Sexe",
    male: "Homme",
    female: "Femme",
    lastname: "Prénom",
    firstname: "Nom",
    nationality: "Nationalité",
    birthdate: "Date de naissance"
};
v.parents = {
    parents: "Parents",
    dad: "Père",
    mom: "Mère",
    faceof: "Visage du",
    skin: "Mix de la peau",
    heritage: "Mix des visages"
};
v.appearance = {
    select_category: "Sélectionner une catégorie",
    select_variation: "Sélectionnez votre variante",
    hair: "Cheveux",
    beard: "Barbe",
    eyebrows: "Sourcils",
    makeup: "Maquillage",
    primary_color: "Choisissez votre couleur",
    secondary_color: "Choisissez votre couleur secondaire",
    opacity: "Opacité",
    height: "Taille"
};
v.clothes = {
    select_type_clothes: "Sélectionnez le type de vêtements",
    select_variation: "Sélectionnez votre variante",
    select_texture: "Sélectionnez votre texture",
    pants: "Pantalon",
    arms: "Bras",
    shirt: "T-Shirt",
    torso: "Torse",
    shoes: "Chaussures"
};
v.face = {
    select_cat: "Sélectionnez la catégorie",
    nose: "Nez",
    chin: "Menton",
    jaw: "Cou",
    cheeks: "Joue",
    eyes: "Yeux",
    nose_width: "Largeur du nez",
    nose_height: "Hauteur du nez",
    nose_tip_length: "Longueur du bout du nez",
    nose_bridge_depth: "Profondeur du pont nasal",
    height_of_the_tip: "Hauteur de la pointe",
    broken_nose: "Nez cassé",
    chin_height: "Hauteur du menton",
    chin_length: "Longueur du menton",
    chin_width: "Largeur du menton",
    chin_hole_size: "Taille du trou du menton",
    jaw_width: "Largeur de la mâchoire",
    jaw_height: "Hauteur de la mâchoire",
    neck_thickness: "Épaisseur du cou",
    cheekbone_height: "Hauteur des pommettes",
    cheekbone_width: "Largeur des pommettes",
    cheek_width: "Largeur des joues",
    eye_width: "Largeur des yeux",
    eye_color: "Couleur des yeux"
};
v.disease = {
    blood_group: "Groupe sanguin",
    specificity: "Spécificité",
    disease: "Maladie",
    allergies: "Allergies",
    addictions: "Dépendances"
};
v.notification = {
    cant_finish: "Enfin, vous devez au moins compléter la partie identité !",
    reset: "Réinitialisation de la création de personnage en cours..."
};
const Kf = ({
    data: e,
    onChange: t
}) => S(pl, {
    children: U("div", {
        className: "identity__component",
        children: [S(ar, {
            title: v.identity.sex,
            defaultValue: e.sexe,
            buttonChoice: [{
                type: "male",
                label: v.identity.male,
                logo: "../images/homme.72a6114de000dba3e65040fb14e940af.svg"
            }, {
                type: "female",
                label: v.identity.female,
                logo: "../images/femme.196b05a101e2d3b4c3332b26cf33b79a.svg"
            }],
            changeChoice: n => {
                t("sexe", n), te("change", {
                    type: "sex",
                    new: n === "male" ? 0 : 1
                })
            }
        }), S(pt, {
            type: "text",
            title: v.identity.lastname,
            placeholder: v.identity.lastname,
            value: e.lastname,
            changeValue: n => t("lastname", n)
        }), S(pt, {
            type: "text",
            title: v.identity.firstname,
            placeholder: v.identity.firstname,
            value: e.firstname,
            changeValue: n => t("firstname", n)
        }), S(pt, {
            type: "text",
            title: v.identity.nationality,
            placeholder: v.identity.nationality,
            value: e.nationality,
            changeValue: n => t("nationality", n)
        }), S(pt, {
            type: "date",
            title: v.identity.birthdate,
            placeholder: "",
            value: e.birthdate,
            changeValue: n => t("birthdate", n)
        })]
    })
});
const Xf = ({
    title: e,
    data: t,
    onChangeParent: n
}) => {
    const r = l => {
        l && n(l)
    };
    return U("div", {
        className: "visage__container",
        children: [U("div", {
            className: "title",
            children: [v.parents.faceof, " ", e]
        }), S("div", {
            className: "visage__container_wrapper",
            children: t.map(l => S("div", {
                onClick: () => r(l),
                className: `visage__item ${l.selected?"selected":""}`,
                children: S("img", {
                    src: `../images/parents/${l.nom}.${l.extension}`,
                    alt: l.nom
                })
            }, l.id))
        })]
    })
};
const rr = ({
    type: e,
    title: t,
    max: n,
    min: r,
    defaultValue: l,
    onChange: i
}) => {
    const [o, u] = Y.useState(l), s = Y.useRef(null), c = () => {
        u(r), i(r, e)
    };
    return Y.useEffect(() => {
        c()
    }, [e]), Y.useEffect(() => {
        if (s.current) {
            const m = s.current,
                p = Number(m.min),
                w = Number(m.max),
                _ = Number(m.value);
            m.style.backgroundSize = (_ - p) * 100 / (w - p) + "% 100%"
        }
    }, [o]), U("div", {
        className: "input__range_container",
        children: [S("div", {
            className: "title",
            children: t
        }), S("div", {
            className: "input__range",
            children: S("input", {
                type: "range",
                className: "input__range_item",
                min: r,
                max: n,
                value: o,
                onChange: m => {
                    const p = Number(m.target.value);
                    u(p), i(p, e)
                },
                ref: s
            })
        })]
    })
};
const Yf = ({
    selectedChoice: e,
    selectedParents: t,
    selectedParentsItem: n,
    handleChoiceChange: r,
    onChangeParent: l
}) => {
    const i = [{
        type: "dad",
        label: v.parents.dad,
        logo: "../images/buttons/dad.svg"
    }, {
        type: "mom",
        label: v.parents.mom,
        logo: "../images/buttons/mom.svg"
    }];

    function o(u) {
        const s = i.find(c => c.type === u);
        return s ? s.label : ""
    }
    return U("div", {
        className: "heritage__component",
        children: [S(ar, {
            title: v.parents.parents,
            defaultValue: e,
            buttonChoice: i,
            changeChoice: r
        }), S(Xf, {
            title: o(e),
            data: t,
            onChangeParent: l
        }), S(rr, {
            type: "skin_md_weight",
            title: v.parents.skin,
            min: 0,
            max: 100,
            defaultValue: 0,
            onChange: u => {
                te("change", {
                    type: "skin_md_weight",
                    new: u
                })
            }
        }), S(rr, {
            type: "face_md_weight",
            title: v.parents.heritage,
            min: 0,
            max: 100,
            defaultValue: 0,
            onChange: u => {
                te("change", {
                    type: "face_md_weight",
                    new: u
                })
            }
        })]
    })
};
const mc = ({ title: e, items: t, onItemSelect: n, currentCategory }) => {
    const [selectedItem, setSelectedItem] = Y.useState(null);
    Y.useEffect(() => {
        setSelectedItem(null); 
    }, [currentCategory]);

    const handleClick = (itemId, itemType) => {
        setSelectedItem(itemId);
        n(itemId, itemType); 
    };

    return U("div", {
        className: "item__list_container",
        children: [
            S("div", {
                className: "title",
                children: e
            }),
            S("div", {
                className: "item__list__container_wrapper",
                children: t.map(l => S("div", {
                    className: `item__list_item ${selectedItem === l.id ? 'selected' : ''}`,
                    onClick: () => handleClick(l.id, l.type),
                    children: S("img", {
                        src: `../images/${l.type}/${l.id}.png`,
                        alt: ""
                    })
                }, l.id))
            })
        ]
    });
};

const hc = ({
        type: e,
        title: t,
        handleFunct: n
    }) => {
        const [r, l] = Y.useState(null), [i, o] = Y.useState(!1), [u, s] = Y.useState(0), [c, h] = Y.useState(0), m = ["linear-gradient(rgb(28, 31, 33) 0%, rgb(28, 31, 33) 100%)", "linear-gradient(rgb(39, 42, 44) 0%, rgb(39, 42, 44) 100%)", "linear-gradient(rgb(49, 46, 44) 0%, rgb(49, 46, 44) 100%)", "linear-gradient(rgb(53, 38, 28) 0%, rgb(53, 38, 28) 100%)", "linear-gradient(rgb(75, 50, 31) 0%, rgb(75, 50, 31) 100%)", "linear-gradient(rgb(92, 59, 36) 0%, rgb(92, 59, 36) 100%)", "linear-gradient(rgb(109, 76, 53) 0%, rgb(109, 76, 53) 100%)", "linear-gradient(rgb(107, 80, 59) 0%, rgb(107, 80, 59) 100%)", "linear-gradient(rgb(118, 92, 69) 0%, rgb(118, 92, 69) 100%)", "linear-gradient(rgb(127, 104, 78) 0%, rgb(127, 104, 78) 100%)", "linear-gradient(rgb(153, 129, 93) 0%, rgb(153, 129, 93) 100%)", "linear-gradient(rgb(167, 147, 105) 0%, rgb(167, 147, 105) 100%)", "linear-gradient(rgb(175, 156, 112) 0%, rgb(175, 156, 112) 100%)", "linear-gradient(rgb(187, 160, 99) 0%, rgb(187, 160, 99) 100%)", "linear-gradient(rgb(214, 185, 123) 0%, rgb(214, 185, 123) 100%)", "linear-gradient(rgb(218, 195, 142) 0%, rgb(218, 195, 142) 100%)", "linear-gradient(rgb(159, 127, 89) 0%, rgb(159, 127, 89) 100%)", "linear-gradient(rgb(132, 80, 57) 0%, rgb(132, 80, 57) 100%)", "linear-gradient(rgb(104, 43, 31) 0%, rgb(104, 43, 31) 100%)", "linear-gradient(rgb(97, 18, 12) 0%, rgb(97, 18, 12) 100%)", "linear-gradient(rgb(100, 15, 10) 0%, rgb(100, 15, 10) 100%)", "linear-gradient(rgb(124, 20, 15) 0%, rgb(124, 20, 15) 100%)", "linear-gradient(rgb(160, 46, 25) 0%, rgb(160, 46, 25) 100%)", "linear-gradient(rgb(182, 75, 40) 0%, rgb(182, 75, 40) 100%)", "linear-gradient(rgb(162, 80, 47) 0%, rgb(162, 80, 47) 100%)", "linear-gradient(rgb(170, 78, 43) 0%, rgb(170, 78, 43) 100%)", "linear-gradient(rgb(98, 98, 98) 0%, rgb(98, 98, 98) 100%)", "linear-gradient(rgb(128, 128, 128) 0%, rgb(128, 128, 128) 100%)", "linear-gradient(rgb(170, 170, 170) 0%, rgb(170, 170, 170) 100%)", "linear-gradient(rgb(197, 197, 197) 0%, rgb(197, 197, 197) 100%)", "linear-gradient(rgb(70, 57, 85) 0%, rgb(70, 57, 85) 100%)", "linear-gradient(rgb(90, 63, 107) 0%, rgb(90, 63, 107) 100%)", "linear-gradient(rgb(118, 60, 118) 0%, rgb(118, 60, 118) 100%)", "linear-gradient(rgb(237, 116, 227) 0%, rgb(237, 116, 227) 100%)", "linear-gradient(rgb(235, 75, 147) 0%, rgb(235, 75, 147) 100%)", "linear-gradient(rgb(242, 153, 188) 0%, rgb(242, 153, 188) 100%)", "linear-gradient(rgb(4, 149, 158) 0%, rgb(4, 149, 158) 100%)", "linear-gradient(rgb(2, 95, 134) 0%, rgb(2, 95, 134) 100%)", "linear-gradient(rgb(2, 57, 116) 0%, rgb(2, 57, 116) 100%)", "linear-gradient(rgb(63, 161, 106) 0%, rgb(63, 161, 106) 100%)", "linear-gradient(rgb(33, 124, 97) 0%, rgb(33, 124, 97) 100%)", "linear-gradient(rgb(24, 92, 85) 0%, rgb(24, 92, 85) 100%)", "linear-gradient(rgb(182, 192, 52) 0%, rgb(182, 192, 52) 100%)", "linear-gradient(rgb(112, 169, 11) 0%, rgb(112, 169, 11) 100%)", "linear-gradient(rgb(67, 157, 19) 0%, rgb(67, 157, 19) 100%)", "linear-gradient(rgb(220, 184, 87) 0%, rgb(220, 184, 87) 100%)", "linear-gradient(rgb(229, 177, 3) 0%, rgb(229, 177, 3) 100%)", "linear-gradient(rgb(230, 145, 2) 0%, rgb(230, 145, 2) 100%)", "linear-gradient(rgb(242, 136, 49) 0%, rgb(242, 136, 49) 100%)", "linear-gradient(rgb(251, 128, 87) 0%, rgb(251, 128, 87) 100%)", "linear-gradient(rgb(226, 139, 88) 0%, rgb(226, 139, 88) 100%)", "linear-gradient(rgb(209, 89, 60) 0%, rgb(209, 89, 60) 100%)", "linear-gradient(rgb(206, 49, 32) 0%, rgb(206, 49, 32) 100%)", "linear-gradient(rgb(173, 9, 3) 0%, rgb(173, 9, 3) 100%)", "linear-gradient(rgb(136, 3, 2) 0%, rgb(136, 3, 2) 100%)", "linear-gradient(rgb(31, 24, 20) 0%, rgb(31, 24, 20) 100%)", "linear-gradient(rgb(41, 31, 25) 0%, rgb(41, 31, 25) 100%)", "linear-gradient(rgb(46, 34, 27) 0%, rgb(46, 34, 27) 100%)", "linear-gradient(rgb(55, 41, 30) 0%, rgb(55, 41, 30) 100%)", "linear-gradient(rgb(46, 34, 24) 0%, rgb(46, 34, 24) 100%)", "linear-gradient(rgb(35, 27, 21) 0%, rgb(35, 27, 21) 100%)", "linear-gradient(rgb(2, 2, 2) 0%, rgb(2, 2, 2) 100%)", "linear-gradient(rgb(112, 108, 102) 0%, rgb(112, 108, 102) 100%)", "linear-gradient(rgb(157, 122, 80) 0%, rgb(157, 122, 80) 100%)"], p = R => {
            i || (l(R), n(R, e))
        };
        return U("div", {
            className: "color__palette__container",
            children: [S("div", {
                className: "title",
                children: t
            }), S("div", {
                className: "color__palette__wrapper",
                style: {
                    cursor: "auto"
                },
                onPointerDown: R => {
                    const d = R.currentTarget;
                    o(!0), s(R.clientX), h(d.scrollLeft)
                },
                onPointerUp: () => {
                    o(!1)
                },
                onPointerMove: R => {
                    if (i) {
                        const d = R.currentTarget,
                            a = R.clientX - u;
                        d.scrollLeft = c - a
                    }
                },
                children: m.map((R, d) => S("div", {
                    className: `citem ${r===d?"selected":""}`,
                    style: {
                        background: R
                    },
                    onClick: () => p(d)
                }, d))
            })]
        })
    },
    Gf = ({
        data: e,
        onChange: t,
        CONFIG: n
    }) => {
        const r = n[e.selectedType],
            l = (i, o) => Array.from({
                length: i + 1
            }, (u, s) => ({
                id: s.toString(),
                type: o
            }));
        return U("div", {
            className: "appareance__component",
            children: [S(ar, {
                title: "Sélectionnez la catégorie",
                buttonChoice: [{
                    type: "hair_1",
                    label: v.appearance.hair,
                    logo: "../images/buttons/hair.svg"
                }, {
                    type: "beard_1",
                    label: v.appearance.beard,
                    logo: "../images/buttons/beard.svg"
                }, {
                    type: "eyebrows_1",
                    label: v.appearance.eyebrows,
                    logo: "../images/buttons/eyebrows.svg"
                }, {
                    type: "makeup_1",
                    label: v.appearance.makeup,
                    logo: "../images/makeup.svg"
                }],
                defaultValue: e.selectedType,
                changeChoice: i => t("selectedType", i, null)
            }), S(mc, {
                title: v.appearance.select_variation,
                items: l(r.max, e.selectedType),
                onItemSelect: (i, o) => te("change", {
                    type: o,
                    new: parseInt(i)
                })
            }), r.ranges.map(i => S(rr, {
                type: i.type,
                title: i.title,
                defaultValue: i.value,
                min: i.min,
                max: i.max,
                onChange: (o, u) => t(u, o, "ranges")
            }, i.type)), r.palettes.map(i => S(hc, {
                type: i.type,
                title: i.title,
                handleFunct: (o, u) => t(u, o, "palettes")
            }, i.type))]
        })
    };
const Zf = ({
    data: e,
    onChange: t,
    CONFIG: n
}) => {
    const l = (o => {
        const u = o;
        return u === "arms" ? u + "_2" : u.endsWith("_1") ? u.replace("_1", "_2") : u
    })(e.selectedType);
    return U("div", {
        className: "clothes__component",
        children: [S(ar, {
            title: "Sélectionner une catégorie",
            buttonChoice: [{
                type: "pants_1",
                label: "Pantalons",
                logo: "../images/buttons/pants.svg"
            }, {
                type: "arms",
                label: "Bras",
                logo: "../images/buttons/arms.svg"
            }, {
                type: "tshirt_1",
                label: "T-Shirt",
                logo: "../images/buttons/tshirt.svg"
            }, {
                type: "torso_1",
                label: "Torse",
                logo: "../images/buttons/torso.svg"
            }, {
                type: "shoes_1",
                label: "Chaussures",
                logo: "../images/buttons/shoes.svg"
            }],
            changeChoice: o => {
                t(o), te("change_camera", {
                    type: o
                })
            }
        }), S(mc, {
            title: "Choisissez votre variante",
            items: ((o, u) => Array.from({
                length: o + 1
            }, (s, c) => ({
                id: c.toString(),
                type: u
            })))(n[e.selectedType].max, e.selectedType),
            onItemSelect: (o, u) => te("change", {
                type: u,
                new: parseInt(o)
            })
        }), S(rr, {
            type: l,
            title: "Texture",
            defaultValue: n[l].value,
            min: n[l].min,
            max: n[l].max,
            onChange: (o, u) => te("change", {
                type: u,
                new: o
            })
        })]
    })
};
const Jf = ({
    data: e,
    onChange: t,
    CONFIG: n
}) => {
    const r = n[e.selectedType];
    return U("div", {
        className: "face__component",
        children: [S(ar, {
            title: v.face.select_cat,
            defaultValue: e.selectedType,
            buttonChoice: [{
                type: "nose",
                label: v.face.nose,
                logo: "../images/buttons/nose.svg"
            }, {
                type: "chin",
                label: v.face.chin,
                logo: "../images/buttons/chin.svg"
            }, {
                type: "jaw",
                label: v.face.jaw,
                logo: "../images/buttons/jaw.svg"
            }, {
                type: "cheeks",
                label: v.face.cheeks,
                logo: "../images/buttons/cheeks.svg"
            }, {
                type: "eyes",
                label: v.face.eyes,
                logo: "../images/buttons/eyes.svg",
                iconsSize: 50
            }],
            changeChoice: l => t("selectedType", l, null)
        }), r.ranges.map(l => S(rr, {
            type: l.type,
            title: l.title,
            defaultValue: l.value,
            min: l.min,
            max: l.max,
            onChange: (i, o) => t(o, i, "ranges")
        }, l.type)), r.palettes.map(l => S(hc, {
            type: l.type,
            title: l.title,
            handleFunct: (i, o) => t(o, i, "palettes")
        }, l.type))]
    })
};
const qf = ({
        options: e,
        selectedOption: t,
        onSelect: n
    }) => {
        const r = l => {
            const i = l.target.value;
            n(i)
        };
        return U("div", {
            className: "context-menu",
            children: [S("div", {
                className: "title",
                children: v.disease.blood_group
            }), S("select", {
                className: "select-input",
                value: t,
                onChange: r,
                children: e.map((l, i) => S("option", {
                    value: l,
                    children: l
                }, i))
            })]
        })
    },
    bf = ({
        data: e,
        onChange: t
    }) => U("div", {
        className: "disease__component",
        children: [S(qf, {
            options: ["A", "B", "AB", "O"],
            selectedOption: e.selectedOption,
            onSelect: n => t("selectedOption", n)
        }), S(pt, {
            value: e.specificity,
            title: v.disease.specificity,
            placeholder: v.disease.specificity,
            changeValue: n => t("specificity", n)
        }), S(pt, {
            value: e.disease,
            title: v.disease.disease,
            placeholder: v.disease.disease,
            changeValue: n => t("disease", n)
        }), S(pt, {
            value: e.allergies,
            title: v.disease.allergies,
            placeholder: v.disease.allergies,
            changeValue: n => t("allergies", n)
        }), S(pt, {
            value: e.addictions,
            title: v.disease.addictions,
            placeholder: v.disease.addictions,
            changeValue: n => t("addictions", n)
        })]
    }),
    zr = {
        dad: [{
            id: 0,
            nom: "Benjamin",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 1,
            nom: "Daniel",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 2,
            nom: "Joshua",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 3,
            nom: "Noah",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 4,
            nom: "Andrew",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 6,
            nom: "Alex",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 7,
            nom: "Isaac",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 8,
            nom: "Evan",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 9,
            nom: "Ethan",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 10,
            nom: "Vincent",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 11,
            nom: "Angel",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 12,
            nom: "Diego",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 13,
            nom: "Adrian",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 14,
            nom: "Gabriel",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 15,
            nom: "Michael",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 16,
            nom: "Santiago",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 17,
            nom: "Kevin",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 18,
            nom: "Louis",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 19,
            nom: "Samuel",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 20,
            nom: "Anthony",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 42,
            nom: "John",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 43,
            nom: "Niko",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 44,
            nom: "Claude",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 21,
            nom: "Hannah",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 22,
            nom: "Audrey",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 23,
            nom: "Jasmine",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 24,
            nom: "Giselle",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 25,
            nom: "Amelia",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 26,
            nom: "Isabella",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 27,
            nom: "Zoe",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 28,
            nom: "Ava",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 30,
            nom: "Violet",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 31,
            nom: "Sophia",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 33,
            nom: "Nicole",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 34,
            nom: "Ashley",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 35,
            nom: "Grace",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 37,
            nom: "Natalie",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 38,
            nom: "Olivia",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 39,
            nom: "Elizabeth",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 40,
            nom: "Charlotte",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 41,
            nom: "Emma",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 45,
            nom: "Misty",
            extension: "png",
            type: "mom",
            selected: !1
        }],
        mom: [{
            id: 21,
            nom: "Hannah",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 22,
            nom: "Audrey",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 23,
            nom: "Jasmine",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 24,
            nom: "Giselle",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 25,
            nom: "Amelia",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 26,
            nom: "Isabella",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 27,
            nom: "Zoe",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 28,
            nom: "Ava",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 30,
            nom: "Violet",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 31,
            nom: "Sophia",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 33,
            nom: "Nicole",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 34,
            nom: "Ashley",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 35,
            nom: "Grace",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 37,
            nom: "Natalie",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 38,
            nom: "Olivia",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 39,
            nom: "Elizabeth",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 40,
            nom: "Charlotte",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 41,
            nom: "Emma",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 45,
            nom: "Misty",
            extension: "png",
            type: "mom",
            selected: !1
        }, {
            id: 0,
            nom: "Benjamin",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 1,
            nom: "Daniel",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 2,
            nom: "Joshua",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 3,
            nom: "Noah",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 4,
            nom: "Andrew",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 6,
            nom: "Alex",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 7,
            nom: "Isaac",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 8,
            nom: "Evan",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 9,
            nom: "Ethan",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 10,
            nom: "Vincent",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 11,
            nom: "Angel",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 12,
            nom: "Diego",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 13,
            nom: "Adrian",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 14,
            nom: "Gabriel",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 15,
            nom: "Michael",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 16,
            nom: "Santiago",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 17,
            nom: "Kevin",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 18,
            nom: "Louis",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 19,
            nom: "Samuel",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 20,
            nom: "Anthony",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 42,
            nom: "John",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 43,
            nom: "Niko",
            extension: "webp",
            type: "dad",
            selected: !1
        }, {
            id: 44,
            nom: "Claude",
            extension: "webp",
            type: "dad",
            selected: !1
        }]
    },
    Tr = {
        appareance: {
            beard_1: {
                ranges: [{
                    type: "beard_2",
                    title: v.appearance.opacity,
                    value: 0,
                    min: 0,
                    max: 10
                }],
                palettes: [{
                    type: "beard_3",
                    title: v.appearance.primary_color
                }, {
                    type: "beard_4",
                    title: v.appearance.secondary_color
                }],
                value: 0,
                min: 0,
                max: 0
            },
            eyebrows_1: {
                ranges: [{
                    type: "eyebrows_2",
                    title: v.appearance.opacity,
                    value: 0,
                    min: 0,
                    max: 10
                }, {
                    type: "eyebrows_5",
                    title: v.appearance.height,
                    value: -10,
                    min: -10,
                    max: 10
                }],
                palettes: [{
                    type: "eyebrows_3",
                    title: v.appearance.primary_color
                }, {
                    type: "eyebrows_4",
                    title: v.appearance.secondary_color
                }],
                value: 0,
                min: 0,
                max: 0
            },
            makeup_1: {
                ranges: [{
                    type: "makeup_2",
                    title: v.appearance.opacity,
                    value: 0,
                    min: 0,
                    max: 10
                }],
                palettes: [{
                    type: "makeup_3",
                    title: v.appearance.primary_color
                }, {
                    type: "makeup_4",
                    title: v.appearance.secondary_color
                }],
                value: 0,
                min: 0,
                max: 0
            },
            hair_1: {
                ranges: [],
                palettes: [{
                    type: "hair_color_1",
                    title: v.appearance.primary_color
                }, {
                    type: "hair_color_2",
                    title: v.appearance.secondary_color
                }],
                value: 0,
                min: 0,
                max: 0
            }
        },
        clothes: {
            pants_1: {
                value: 0,
                min: 0,
                max: 15
            },
            arms: {
                value: 0,
                min: 0,
                max: 15
            },
            tshirt_1: {
                value: 0,
                min: 0,
                max: 15
            },
            torso_1: {
                value: 0,
                min: 0,
                max: 15
            },
            shoes_1: {
                value: 0,
                min: 0,
                max: 15
            },
            pants_2: {
                value: 0,
                min: 0,
                max: 15
            },
            arms_2: {
                value: 0,
                min: 0,
                max: 15
            },
            tshirt_2: {
                value: 0,
                min: 0,
                max: 15
            },
            torso_2: {
                value: 0,
                min: 0,
                max: 15
            },
            shoes_2: {
                value: 0,
                min: 0,
                max: 15
            }
        },
        face: {
            nose: {
                ranges: [{
                    type: "nose_1",
                    title: v.face.nose_width,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "nose_2",
                    title: v.face.nose_height,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "nose_3",
                    title: v.face.nose_tip_length,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "nose_4",
                    title: v.face.nose_bridge_depth,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "nose_5",
                    title: v.face.height_of_the_tip,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "nose_6",
                    title: v.face.broken_nose,
                    value: -10,
                    min: -10,
                    max: 10
                }],
                palettes: []
            },
            chin: {
                ranges: [{
                    type: "chin_1",
                    title: v.face.chin_height,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "chin_2",
                    title: v.face.chin_length,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "chin_3",
                    title: v.face.chin_width,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "chin_4",
                    title: v.face.chin_hole_size,
                    value: -10,
                    min: -10,
                    max: 10
                }],
                palettes: []
            },
            jaw: {
                ranges: [{
                    type: "jaw_1",
                    title: v.face.jaw_width,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "jaw_2",
                    title: v.face.jaw_height,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "neck_thickness",
                    title: v.face.neck_thickness,
                    value: -10,
                    min: -10,
                    max: 10
                }],
                palettes: []
            },
            cheeks: {
                ranges: [{
                    type: "cheeks_1",
                    title: v.face.cheekbone_height,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "cheeks_2",
                    title: v.face.cheekbone_width,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "cheeks_3",
                    title: v.face.cheek_width,
                    value: -10,
                    min: -10,
                    max: 10
                }],
                palettes: []
            },
            eyes: {
                ranges: [{
                    type: "eye_squint",
                    title: v.face.eye_width,
                    value: -10,
                    min: -10,
                    max: 10
                }, {
                    type: "eye_color",
                    title: v.face.eye_color,
                    value: 0,
                    min: 0,
                    max: 31
                }],
                palettes: []
            }
        }
    };

function ep() {
    const [e, t] = Y.useState(Qo());
    ts("setVisible", L => {
        t(L.visible || !1)
    });
    const n = (L, F) => {
            const T = {
                ...L
            };
            for (const oe in F) {
                const {
                    value: Be,
                    min: Ye,
                    max: x
                } = F[oe];
                for (const I in T.appearance) {
                    const D = T.appearance[I];
                    if (!D) continue;
                    const $ = D.ranges?.find(it => it.type === oe);
                    $ && ($.value = Be, $.min = Ye, $.max = x);
                    const X = D.palettes?.find(it => it.type === oe);
                    X && (X.value = Be)
                }
                T.clothes[oe] && (T.clothes[oe].value = Be, T.clothes[oe].min = Ye, T.clothes[oe].max = x);
                for (const I in T.face) {
                    const D = T.face[I];
                    if (!D) continue;
                    const $ = D.ranges?.find(X => X.type === oe);
                    $ && ($.value = Be, $.min = Ye, $.max = x)
                }
            }
            return ["beard_1", "eyebrows_1", "makeup_1", "hair_1"].forEach(oe => {
                if (F[oe]) {
                    const {
                        value: Be,
                        min: Ye,
                        max: x
                    } = F[oe];
                    T.appareance[oe] && (T.appareance[oe].value = Be, T.appareance[oe].min = Ye, T.appareance[oe].max = x)
                }
            }), T
        },
        [r, l] = Y.useState("Identity"),
        [i, o] = Y.useState({
            sexe: "male",
            lastname: "",
            firstname: "",
            nationality: "",
            birthdate: ""
        }),
        [u, s] = Y.useState({
            selectedChoice: "dad",
            selectedParents: zr.dad,
            selectedParentsItem: {
                dad: zr.dad[0],
                mom: zr.mom[0]
            }
        }),
        [c, h] = Y.useState({
            selectedType: "hair_1",
            ranges: {
                beard_2: 0,
                eyebrows_2: 0,
                eyebrows_5: -10,
                makeup_2: 0
            },
            palettes: {
                beard_3: 0,
                beard_4: 0,
                eyebrows_3: 0,
                eyebrows_4: 0,
                makeup_3: 0,
                makeup_4: 0,
                hair_color_1: 0,
                hair_color_2: 0
            }
        }),
        [m, p] = Y.useState({
            selectedType: "pants_1",
            selectedTexture: 10
        }),
        [w, _] = Y.useState({
            selectedType: "nose",
            ranges: {
                nose_1: -10,
                nose_2: -10,
                nose_3: -10,
                nose_4: -10,
                nose_5: -10,
                nose_6: -10,
                chin_1: -10,
                chin_2: -10,
                chin_3: -10,
                chin_4: -10,
                jaw_1: -10,
                jaw_2: -10,
                neck_thickness: -10,
                cheeks_1: -10,
                cheeks_2: -10,
                cheeks_3: -10,
                eye_squint: -10,
                eye_color: 0
            },
            palettes: {}
        }),
        [k, R] = Y.useState({
            specificity: "",
            disease: "",
            allergies: "",
            addictions: "",
            selectedOption: "A"
        });
    ts("setDatas", L => {
        n(Tr, L.data), o(F => {
            const T = {};
            for (let B in F) B === "sexe" ? T[B] = "male" : T[B] = "";
            return T
        }), R(F => {
            const T = {};
            for (let B in F) B === "selectedOption" ? T[B] = "A" : T[B] = "";
            return T
        })
    });
    const d = () => (i.lastname.length > 2, i.firstname.length > 2, i.nationality.length > 2, i.birthdate.length === 10),
        a = L => {
            L === "reset" && te("reset", v.notification.reset), L === "save" && d() ? te("save", {
                diseaseData: k,
                identityData: i
            }) : te("notif", v.notification.cant_finish)
        },
        f = L => {
            const F = u.selectedParentsItem[L];
            s(T => ({
                ...T,
                selectedChoice: L,
                selectedParents: zr[L].map(B => B.id === F.id ? {
                    ...B,
                    selected: !0
                } : {
                    ...B,
                    selected: !1
                })
            }))
        },
        g = L => {
            s(F => ({
                ...F,
                selectedParentsItem: {
                    ...F.selectedParentsItem,
                    [L.type]: L
                },
                selectedParents: F.selectedParents.map(T => T.id === L.id ? {
                    ...T,
                    selected: !0
                } : {
                    ...T,
                    selected: !1
                })
            })), te("change", {
                type: L.type,
                new: parseInt(L.id)
            })
        },
        C = (L, F) => {
            o(T => ({
                ...T,
                [L]: F
            }))
        },
        N = (L, F, T) => {
            if (te("change", {
                    type: L,
                    new: parseInt(F)
                }), T === null) {
                h(B => ({
                    ...B,
                    [L]: F
                }));
                return
            }
            if (T) {
                h(B => ({
                    ...B,
                    [T]: {
                        ...B[T],
                        [L]: F
                    }
                }));
                return
            }
        },
        P = L => {
            p(F => ({
                ...F,
                selectedType: L,
                selectedTexture: L === "arms" ? 15 : 10
            }))
        },
        z = (L, F, T) => {
            if (T === null) {
                _(B => ({
                    ...B,
                    [L]: F
                }));
                return
            }
            if (T) {
                _(B => ({
                    ...B,
                    [T]: {
                        ...B[T],
                        [L]: F
                    }
                })), te("change", {
                    type: L,
                    new: parseInt(F)
                });
                return
            }
        },
        K = (L, F) => {
            R(T => ({
                ...T,
                [L]: F
            }))
        },
        O = () => {
            switch (r) {
                case "Identity":
                    return S(Kf, {
                        data: i,
                        onChange: C
                    });
                case "Heritage":
                    return S(Yf, {
                        selectedChoice: u.selectedChoice,
                        selectedParents: u.selectedParents,
                        selectedParentsItem: u.selectedParentsItem,
                        handleChoiceChange: f,
                        onChangeParent: g
                    });
                case "Appareance":
                    return S(Gf, {
                        data: c,
                        onChange: N,
                        CONFIG: Tr.appareance
                    });
                case "Clothes":
                    return S(Zf, {
                        data: m,
                        onChange: P,
                        CONFIG: Tr.clothes
                    });
                case "Face":
                    return S(Jf, {
                        data: w,
                        onChange: z,
                        CONFIG: Tr.face
                    });
                default:
                    return S(bf, {
                        data: k,
                        onChange: K
                    })
            }
        };
    return S(pl, {
        children: e && U("div", {
            className: "creator",
            children: [U("div", {
                className: "left__side",
                children: [S("div", {
                    className: "server__logo",
                    children: S("img", {
                        src: "../images/logo.svg",
                        alt: "ovalife"
                    })
                }), S("div", {
                    className: "sidebar__container",
                    children: U("div", {
                        className: "sidebar__content",
                        children: [U("div", {
                            className: "sidebar__items",
                            children: [U("div", {
                                className: `item ${r==="Identity"?"selected":""}`,
                                onClick: () => {
                                    l("Identity"), te("change_camera", {
                                        type: "Identity"
                                    })
                                },
                                children: [S("img", {
                                    src: "../images/identity.svg",
                                    alt: "identity",
                                    style: {
                                        width: "25px"
                                    }
                                }), v.category.identity]
                            }), U("div", {
                                className: `item ${r==="Heritage"?"selected":""}`,
                                onClick: () => {
                                    l("Heritage"), te("change_camera", {
                                        type: "Heritage"
                                    })
                                },
                                children: [S("img", {
                                    src: "../images/heritage.svg",
                                    alt: "heritage",
                                    style: {
                                        width: "30px"
                                    }
                                }), v.category.parents]
                            }), U("div", {
                                className: `item ${r==="Face"?"selected":""}`,
                                onClick: () => {
                                    l("Face"), te("change_camera", {
                                        type: "Face"
                                    })
                                },
                                children: [S("img", {
                                    src: "../images/face.svg",
                                    alt: "face",
                                    style: {
                                        width: "20px"
                                    }
                                }), v.category.face]
                            }), U("div", {
                                className: `item ${r==="Appareance"?"selected":""}`,
                                onClick: () => {
                                    l("Appareance"), te("change_camera", {
                                        type: "Appareance"
                                    })
                                },
                                children: [S("img", {
                                    src: "../images/appearance.svg",
                                    alt: "appearance",
                                    style: {
                                        width: "20px"
                                    }
                                }), v.category.appearance]
                            }), U("div", {
                                className: `item ${r==="Clothes"?"selected":""}`,
                                onClick: () => {
                                    l("Clothes"), te("change_camera", {
                                        type: "Clothes"
                                    })
                                },
                                children: [S("img", {
                                    src: "../images/clothes.svg",
                                    alt: "clothes",
                                    style: {
                                        width: "25px"
                                    }
                                }), v.category.clothes]
                            }), U("div", {
                                className: `item ${r==="Disease"?"selected":""}`,
                                onClick: () => {
                                    l("Disease"), te("change_camera", {
                                        type: "Disease"
                                    })
                                },
                                children: [S("img", {
                                    src: "../images/sick.svg",
                                    alt: "sick",
                                    style: {
                                        width: "30px"
                                    }
                                }), v.category.disease]
                            })]
                        }), U("div", {
                            className: "sidebar__actions",
                            children: [U("div", {
                                className: "aitem red",
                                onClick: () => a("reset"),
                                children: [S("img", {
                                    src: "../images/ban-solid.svg",
                                    alt: "ban",
                                    style: {
                                        width: "15px"
                                    }
                                }), v.actions.reset]
                            }), U("div", {
                                className: "aitem green",
                                onClick: () => a("save"),
                                children: [S("img", {
                                    src: "../images/check-solid.svg",
                                    alt: "check",
                                    style: {
                                        width: "15px"
                                    }
                                }), v.actions.save]
                            })]
                        })]
                    })
                })]
            }), S("div", {
                className: "right__side",
                children: S("div", {
                    className: "right__side_content",
                    children: O()
                })
            })]
        })
    })
}
ni.createRoot(document.getElementById("root")).render(S(Dc.StrictMode, {
    children: S(ep, {})
}));
if (Qo()) {
    const e = document.getElementById("root");
    e.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")', e.style.backgroundSize = "cover", e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = "center"
}