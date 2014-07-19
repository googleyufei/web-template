define("commons/all", function (require, exports, module) {
    var _ = require('underscore');
    window._ = _;
    window._.str = require("underscore-string");
    _.mixin(_.str);

    require('commons/json/1.0.3/json');
    window.moment = require('commons/moment/2.0.0/moment');
    require('commons/firebugx');
    window.webhelper = require('commons/webhelper');
    window.Handlebars = require('handlebars');
    window.Spinner = require("commons/spin");
});

// JSON.js
"object" != typeof JSON && (JSON = {}), function () {
    "use strict";
    function f(a) {
        return 10 > a ? "0" + a : a
    }

    function quote(a) {
        return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function (a) {
            var b = meta[a];
            return"string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function str(a, b) {
        var c, d, e, f, g, h = gap, i = b[a];
        switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
            case"string":
                return quote(i);
            case"number":
                return isFinite(i) ? String(i) : "null";
            case"boolean":
            case"null":
                return String(i);
            case"object":
                if (!i)return"null";
                if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                    for (f = i.length, c = 0; f > c; c += 1)g[c] = str(c, i) || "null";
                    return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]", gap = h, e
                }
                if (rep && "object" == typeof rep)for (f = rep.length, c = 0; f > c; c += 1)"string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e)); else for (d in i)Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}", gap = h, e
        }
    }

    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function (a, b, c) {
        var d;
        if (gap = "", indent = "", "number" == typeof c)for (d = 0; c > d; d += 1)indent += " "; else"string" == typeof c && (indent = c);
        if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length))throw new Error("JSON.stringify");
        return str("", {"": a})
    }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && "object" == typeof e)for (c in e)Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }

        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
            return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}(), define("commons/json/1.0.3/json", [], function () {
    return window.JSON
});
// lodash.underscore
!function () {
    function T(a, b, c) {
        for (var d = (c || 0) - 1, e = a ? a.length : 0; ++d < e;)if (a[d] === b)return d;
        return-1
    }

    function U(a, b) {
        var c = typeof b;
        if (a = a.cache, "boolean" == c || null == b)return a[b] ? 0 : -1;
        "number" != c && "string" != c && (c = "object");
        var d = "number" == c ? b : f + b;
        return a = (a = a[c]) && a[d], "object" == c ? a && T(a, b) > -1 ? 0 : -1 : a ? 0 : -1
    }

    function V(a) {
        var b = this.cache, c = typeof a;
        if ("boolean" == c || null == a)b[a] = !0; else {
            "number" != c && "string" != c && (c = "object");
            var d = "number" == c ? a : f + a, e = b[c] || (b[c] = {});
            "object" == c ? (e[d] || (e[d] = [])).push(a) : e[d] = !0
        }
    }

    function W(a) {
        return a.charCodeAt(0)
    }

    function X(a, b) {
        for (var c = a.criteria, d = b.criteria, e = -1, f = c.length; ++e < f;) {
            var g = c[e], h = d[e];
            if (g !== h) {
                if (g > h || "undefined" == typeof g)return 1;
                if (h > g || "undefined" == typeof h)return-1
            }
        }
        return a.index - b.index
    }

    function Y(a) {
        var b = -1, c = a.length, d = a[0], e = a[0 | c / 2], f = a[c - 1];
        if (d && "object" == typeof d && e && "object" == typeof e && f && "object" == typeof f)return!1;
        var g = _();
        g["false"] = g["null"] = g["true"] = g.undefined = !1;
        var h = _();
        for (h.array = a, h.cache = g, h.push = V; ++b < c;)h.push(a[b]);
        return h
    }

    function Z(a) {
        return"\\" + N[a]
    }

    function $() {
        return b.pop() || []
    }

    function _() {
        return c.pop() || {array: null, cache: null, criteria: null, "false": !1, index: 0, "null": !1, number: null, object: null, push: null, string: null, "true": !1, undefined: !1, value: null}
    }

    function ab(a) {
        return"function" != typeof a.toString && "string" == typeof(a + "")
    }

    function bb(a) {
        a.length = 0, b.length < h && b.push(a)
    }

    function cb(a) {
        var b = a.cache;
        b && cb(b), a.array = a.cache = a.criteria = a.object = a.number = a.string = a.value = null, c.length < h && c.push(a)
    }

    function db(a, b, c) {
        b || (b = 0), "undefined" == typeof c && (c = a ? a.length : 0);
        for (var d = -1, e = c - b || 0, f = Array(0 > e ? 0 : e); ++d < e;)f[d] = a[b + d];
        return f
    }

    function eb(b) {
        function Nb(a) {
            return a && "object" == typeof a && !kc(a) && vb.call(a, "__wrapped__") ? a : new Ob(a)
        }

        function Ob(a, b) {
            this.__chain__ = !!b, this.__wrapped__ = a
        }

        function Rb(a) {
            function e() {
                if (c) {
                    var a = db(c);
                    wb.apply(a, arguments)
                }
                if (this instanceof e) {
                    var f = Tb(b.prototype), g = b.apply(f, a || arguments);
                    return Qc(g) ? g : f
                }
                return b.apply(d, a || arguments)
            }

            var b = a[0], c = a[2], d = a[4];
            return gc(e, a), e
        }

        function Sb(a, b, c, d, e) {
            if (c) {
                var f = c(a);
                if ("undefined" != typeof f)return f
            }
            var g = Qc(a);
            if (!g)return a;
            var h = ob.call(a);
            if (!I[h] || !Pb.nodeClass && ab(a))return a;
            var i = Lb[h];
            switch (h) {
                case A:
                case B:
                    return new i(+a);
                case E:
                case H:
                    return new i(a);
                case G:
                    return f = i(a.source, o.exec(a)), f.lastIndex = a.lastIndex, f
            }
            var j = kc(a);
            if (b) {
                var k = !d;
                d || (d = $()), e || (e = $());
                for (var l = d.length; l--;)if (d[l] == a)return e[l];
                f = j ? i(a.length) : {}
            } else f = j ? db(a) : vc({}, a);
            return j && (vb.call(a, "index") && (f.index = a.index), vb.call(a, "input") && (f.input = a.input)), b ? (d.push(a), e.push(f), (j ? uc : Ec)(a, function (a, g) {
                f[g] = Sb(a, b, c, d, e)
            }), k && (bb(d), bb(e)), f) : f
        }

        function Tb(a) {
            return Qc(a) ? Cb(a) : {}
        }

        function Ub(a, b, c) {
            if ("function" != typeof a)return pe;
            if ("undefined" == typeof b || !("prototype"in a))return a;
            var d = a.__bindData__;
            if ("undefined" == typeof d && (Pb.funcNames && (d = !a.name), d = d || !Pb.funcDecomp, !d)) {
                var e = tb.call(a);
                Pb.funcNames || (d = !p.test(e)), d || (d = t.test(e), gc(a, d))
            }
            if (d === !1 || d !== !0 && 1 & d[1])return a;
            switch (c) {
                case 1:
                    return function (c) {
                        return a.call(b, c)
                    };
                case 2:
                    return function (c, d) {
                        return a.call(b, c, d)
                    };
                case 3:
                    return function (c, d, e) {
                        return a.call(b, c, d, e)
                    };
                case 4:
                    return function (c, d, e, f) {
                        return a.call(b, c, d, e, f)
                    }
            }
            return $d(a, b)
        }

        function Vb(a) {
            function m() {
                var a = h ? f : this;
                if (d) {
                    var n = db(d);
                    wb.apply(n, arguments)
                }
                if ((e || j) && (n || (n = db(arguments)), e && wb.apply(n, e), j && n.length < g))return c |= 16, Vb([b, k ? c : -4 & c, n, null, f, g]);
                if (n || (n = arguments), i && (b = a[l]), this instanceof m) {
                    a = Tb(b.prototype);
                    var o = b.apply(a, n);
                    return Qc(o) ? o : a
                }
                return b.apply(a, n)
            }

            var b = a[0], c = a[1], d = a[2], e = a[3], f = a[4], g = a[5], h = 1 & c, i = 2 & c, j = 4 & c, k = 8 & c, l = b;
            return gc(m, a), m
        }

        function Wb(a, b) {
            var c = -1, d = ec(), e = a ? a.length : 0, f = e >= g && d === T, h = [];
            if (f) {
                var i = Y(b);
                i ? (d = U, b = i) : f = !1
            }
            for (; ++c < e;) {
                var j = a[c];
                d(b, j) < 0 && h.push(j)
            }
            return f && cb(b), h
        }

        function Xb(a, b, c, d) {
            for (var e = (d || 0) - 1, f = a ? a.length : 0, g = []; ++e < f;) {
                var h = a[e];
                if (h && "object" == typeof h && "number" == typeof h.length && (kc(h) || jc(h))) {
                    b || (h = Xb(h, b, c));
                    var i = -1, j = h.length, k = g.length;
                    for (g.length += j; ++i < j;)g[k++] = h[i]
                } else c || g.push(h)
            }
            return g
        }

        function Yb(a, b, c, d, e, f) {
            if (c) {
                var g = c(a, b);
                if ("undefined" != typeof g)return!!g
            }
            if (a === b)return 0 !== a || 1 / a == 1 / b;
            var h = typeof a, i = typeof b;
            if (!(a !== a || a && M[h] || b && M[i]))return!1;
            if (null == a || null == b)return a === b;
            var j = ob.call(a), k = ob.call(b);
            if (j == y && (j = F), k == y && (k = F), j != k)return!1;
            switch (j) {
                case A:
                case B:
                    return+a == +b;
                case E:
                    return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                case G:
                case H:
                    return a == hb(b)
            }
            var l = j == z;
            if (!l) {
                var m = vb.call(a, "__wrapped__"), n = vb.call(b, "__wrapped__");
                if (m || n)return Yb(m ? a.__wrapped__ : a, n ? b.__wrapped__ : b, c, d, e, f);
                if (j != F || !Pb.nodeClass && (ab(a) || ab(b)))return!1;
                var o = !Pb.argsObject && jc(a) ? V : a.constructor, p = !Pb.argsObject && jc(b) ? V : b.constructor;
                if (o != p && !(Pc(o) && o instanceof o && Pc(p) && p instanceof p) && "constructor"in a && "constructor"in b)return!1
            }
            var q = !e;
            e || (e = $()), f || (f = $());
            for (var r = e.length; r--;)if (e[r] == a)return f[r] == b;
            var s = 0;
            if (g = !0, e.push(a), f.push(b), l) {
                if (r = a.length, s = b.length, g = s == r, g || d)for (; s--;) {
                    var t = r, u = b[s];
                    if (d)for (; t-- && !(g = Yb(a[t], u, c, d, e, f));); else if (!(g = Yb(a[s], u, c, d, e, f)))break
                }
            } else Cc(b, function (b, h, i) {
                return vb.call(i, h) ? (s++, g = vb.call(a, h) && Yb(a[h], b, c, d, e, f)) : void 0
            }), g && !d && Cc(a, function (a, b, c) {
                return vb.call(c, b) ? g = --s > -1 : void 0
            });
            return e.pop(), f.pop(), q && (bb(e), bb(f)), g
        }

        function Zb(a, b, c, d, e) {
            (kc(b) ? kd : Ec)(b, function (b, f) {
                var g, h, i = b, j = a[f];
                if (b && ((h = kc(b)) || Uc(b))) {
                    for (var k = d.length; k--;)if (g = d[k] == b) {
                        j = e[k];
                        break
                    }
                    if (!g) {
                        var l;
                        c && (i = c(j, b), (l = "undefined" != typeof i) && (j = i)), l || (j = h ? kc(j) ? j : [] : Uc(j) ? j : {}), d.push(b), e.push(j), l || Zb(j, b, c, d, e)
                    }
                } else c && (i = c(j, b), "undefined" == typeof i && (i = b)), "undefined" != typeof i && (j = i);
                a[f] = j
            })
        }

        function $b(a, b) {
            return a + sb(Kb() * (b - a + 1))
        }

        function _b(a, b, c) {
            var d = -1, e = ec(), f = a ? a.length : 0, h = [], i = !b && f >= g && e === T, j = c || i ? $() : h;
            if (i) {
                var k = Y(j);
                e = U, j = k
            }
            for (; ++d < f;) {
                var l = a[d], m = c ? c(l, d, a) : l;
                (b ? !d || j[j.length - 1] !== m : e(j, m) < 0) && ((c || i) && j.push(m), h.push(l))
            }
            return i ? (bb(j.array), cb(j)) : c && bb(j), h
        }

        function ac(a) {
            return function (b, c, d) {
                var e = {};
                if (c = Nb.createCallback(c, d, 3), kc(b))for (var f = -1, g = b.length; ++f < g;) {
                    var h = b[f];
                    a(e, h, c(h, f, b), b)
                } else uc(b, function (b, d, f) {
                    a(e, b, c(b, d, f), f)
                });
                return e
            }
        }

        function bc(a, b, c, d, e, f) {
            var g = 1 & b, h = 2 & b, i = 4 & b, k = 16 & b, l = 32 & b;
            if (!h && !Pc(a))throw new ib;
            k && !c.length && (b &= -17, k = c = !1), l && !d.length && (b &= -33, l = d = !1);
            var m = a && a.__bindData__;
            if (m && m !== !0)return m = db(m), m[2] && (m[2] = db(m[2])), m[3] && (m[3] = db(m[3])), !g || 1 & m[1] || (m[4] = e), !g && 1 & m[1] && (b |= 8), !i || 4 & m[1] || (m[5] = f), k && wb.apply(m[2] || (m[2] = []), c), l && Ab.apply(m[3] || (m[3] = []), d), m[1] |= b, bc.apply(null, m);
            var n = 1 == b || 17 === b ? Rb : Vb;
            return n([a, b, c, d, e, f])
        }

        function cc() {
            L.shadowedProps = w, L.array = L.bottom = L.loop = L.top = "", L.init = "iterable", L.useHas = !0;
            for (var a, b = 0; a = arguments[b]; b++)for (var c in a)L[c] = a[c];
            var d = L.args;
            L.firstArg = /^[^,]+/.exec(d)[0];
            var f = Q("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString", "return function(" + d + ") {\n" + Qb(L) + "\n}");
            return f(Ub, C, kb, vb, e, jc, kc, Wc, L.keys, lb, M, Mb, H, mb, ob)
        }

        function dc(a) {
            return qc[a]
        }

        function ec() {
            var a = (a = Nb.indexOf) === Jd ? T : a;
            return a
        }

        function fc(a) {
            return"function" == typeof a && pb.test(a)
        }

        function hc(a) {
            var b, c;
            return!a || ob.call(a) != F || (b = a.constructor, Pc(b) && !(b instanceof b)) || !Pb.argsClass && jc(a) || !Pb.nodeClass && ab(a) ? !1 : Pb.ownLast ? (Cc(a, function (a, b, d) {
                return c = vb.call(d, b), !1
            }), c !== !1) : (Cc(a, function (a, b) {
                c = b
            }), "undefined" == typeof c || vb.call(a, c))
        }

        function ic(a) {
            return rc[a]
        }

        function jc(a) {
            return a && "object" == typeof a && "number" == typeof a.length && ob.call(a) == y || !1
        }

        function wc(a, b, c, d) {
            return"boolean" != typeof b && null != b && (d = c, c = b, b = !1), Sb(a, b, "function" == typeof c && Ub(c, d, 1))
        }

        function xc(a, b, c) {
            return Sb(a, !0, "function" == typeof b && Ub(b, c, 1))
        }

        function yc(a, b) {
            var c = Tb(a);
            return b ? vc(c, b) : c
        }

        function Ac(a, b, c) {
            var d;
            return b = Nb.createCallback(b, c, 3), Ec(a, function (a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0
            }), d
        }

        function Bc(a, b, c) {
            var d;
            return b = Nb.createCallback(b, c, 3), Fc(a, function (a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0
            }), d
        }

        function Dc(a, b, c) {
            var d = [];
            Cc(a, function (a, b) {
                d.push(b, a)
            });
            var e = d.length;
            for (b = Ub(b, c, 3); e-- && b(d[e--], d[e], a) !== !1;);
            return a
        }

        function Fc(a, b, c) {
            var d = mc(a), e = d.length;
            for (b = Ub(b, c, 3); e--;) {
                var f = d[e];
                if (b(a[f], f, a) === !1)break
            }
            return a
        }

        function Gc(a) {
            var b = [];
            return Cc(a, function (a, c) {
                Pc(a) && b.push(c)
            }), b.sort()
        }

        function Hc(a, b) {
            return a ? vb.call(a, b) : !1
        }

        function Ic(a) {
            for (var b = -1, c = mc(a), d = c.length, e = {}; ++b < d;) {
                var f = c[b];
                e[a[f]] = f
            }
            return e
        }

        function Jc(a) {
            return a === !0 || a === !1 || a && "object" == typeof a && ob.call(a) == A || !1
        }

        function Kc(a) {
            return a && "object" == typeof a && ob.call(a) == B || !1
        }

        function Lc(a) {
            return a && 1 === a.nodeType || !1
        }

        function Mc(a) {
            var b = !0;
            if (!a)return b;
            var c = ob.call(a), d = a.length;
            return c == z || c == H || (Pb.argsClass ? c == y : jc(a)) || c == F && "number" == typeof d && Pc(a.splice) ? !d : (Ec(a, function () {
                return b = !1
            }), b)
        }

        function Nc(a, b, c, d) {
            return Yb(a, b, "function" == typeof c && Ub(c, d, 2))
        }

        function Oc(a) {
            return Eb(a) && !Fb(parseFloat(a))
        }

        function Pc(a) {
            return"function" == typeof a
        }

        function Qc(a) {
            return!(!a || !M[typeof a])
        }

        function Rc(a) {
            return Tc(a) && a != +a
        }

        function Sc(a) {
            return null === a
        }

        function Tc(a) {
            return"number" == typeof a || a && "object" == typeof a && ob.call(a) == E || !1
        }

        function Vc(a) {
            return a && M[typeof a] && ob.call(a) == G || !1
        }

        function Wc(a) {
            return"string" == typeof a || a && "object" == typeof a && ob.call(a) == H || !1
        }

        function Xc(a) {
            return"undefined" == typeof a
        }

        function Yc(a, b, c) {
            var d = {};
            return b = Nb.createCallback(b, c, 3), Ec(a, function (a, c, e) {
                d[c] = b(a, c, e)
            }), d
        }

        function Zc(a) {
            var b = arguments, c = 2;
            if (!Qc(a))return a;
            if ("number" != typeof b[2] && (c = b.length), c > 3 && "function" == typeof b[c - 2])var d = Ub(b[--c - 1], b[c--], 2); else c > 2 && "function" == typeof b[c - 1] && (d = b[--c]);
            for (var e = db(arguments, 1, c), f = -1, g = $(), h = $(); ++f < c;)Zb(a, e[f], d, g, h);
            return bb(g), bb(h), a
        }

        function $c(a, b, c) {
            var d = {};
            if ("function" != typeof b) {
                var e = [];
                Cc(a, function (a, b) {
                    e.push(b)
                }), e = Wb(e, Xb(arguments, !0, !1, 1));
                for (var f = -1, g = e.length; ++f < g;) {
                    var h = e[f];
                    d[h] = a[h]
                }
            } else b = Nb.createCallback(b, c, 3), Cc(a, function (a, c, e) {
                b(a, c, e) || (d[c] = a)
            });
            return d
        }

        function _c(a) {
            for (var b = -1, d = mc(a), e = d.length, f = c(e); ++b < e;) {
                var g = d[b];
                f[b] = [g, a[g]]
            }
            return f
        }

        function ad(a, b, c) {
            var d = {};
            if ("function" != typeof b)for (var e = -1, f = Xb(arguments, !0, !1, 1), g = Qc(a) ? f.length : 0; ++e < g;) {
                var h = f[e];
                h in a && (d[h] = a[h])
            } else b = Nb.createCallback(b, c, 3), Cc(a, function (a, c, e) {
                b(a, c, e) && (d[c] = a)
            });
            return d
        }

        function bd(a, b, c, d) {
            var e = kc(a);
            if (null == c)if (e)c = []; else {
                var f = a && a.constructor, g = f && f.prototype;
                c = Tb(g)
            }
            return b && (b = Nb.createCallback(b, d, 4), (e ? uc : Ec)(a, function (a, d, e) {
                return b(c, a, d, e)
            })), c
        }

        function cd(a) {
            for (var b = -1, d = mc(a), e = d.length, f = c(e); ++b < e;)f[b] = a[d[b]];
            return f
        }

        function dd(a) {
            var b = arguments, d = -1, e = Xb(b, !0, !1, 1), f = b[2] && b[2][b[1]] === a ? 1 : e.length, g = c(f);
            for (Pb.unindexedChars && Wc(a) && (a = a.split("")); ++d < f;)g[d] = a[e[d]];
            return g
        }

        function ed(a, b, c) {
            var d = -1, e = ec(), f = a ? a.length : 0, g = !1;
            return c = (0 > c ? Hb(0, f + c) : c) || 0, kc(a) ? g = e(a, b, c) > -1 : "number" == typeof f ? g = (Wc(a) ? a.indexOf(b, c) : e(a, b, c)) > -1 : uc(a, function (a) {
                return++d >= c ? !(g = a === b) : void 0
            }), g
        }

        function gd(a, b, c) {
            var d = !0;
            if (b = Nb.createCallback(b, c, 3), kc(a))for (var e = -1, f = a.length; ++e < f && (d = !!b(a[e], e, a));); else uc(a, function (a, c, e) {
                return d = !!b(a, c, e)
            });
            return d
        }

        function hd(a, b, c) {
            var d = [];
            if (b = Nb.createCallback(b, c, 3), kc(a))for (var e = -1, f = a.length; ++e < f;) {
                var g = a[e];
                b(g, e, a) && d.push(g)
            } else uc(a, function (a, c, e) {
                b(a, c, e) && d.push(a)
            });
            return d
        }

        function id(a, b, c) {
            if (b = Nb.createCallback(b, c, 3), !kc(a)) {
                var g;
                return uc(a, function (a, c, d) {
                    return b(a, c, d) ? (g = a, !1) : void 0
                }), g
            }
            for (var d = -1, e = a.length; ++d < e;) {
                var f = a[d];
                if (b(f, d, a))return f
            }
        }

        function jd(a, b, c) {
            var d;
            return b = Nb.createCallback(b, c, 3), ld(a, function (a, c, e) {
                return b(a, c, e) ? (d = a, !1) : void 0
            }), d
        }

        function kd(a, b, c) {
            if (b && "undefined" == typeof c && kc(a))for (var d = -1, e = a.length; ++d < e && b(a[d], d, a) !== !1;); else uc(a, b, c);
            return a
        }

        function ld(a, b, c) {
            var d = a, e = a ? a.length : 0;
            if (b = b && "undefined" == typeof c ? b : Ub(b, c, 3), kc(a))for (; e-- && b(a[e], e, a) !== !1;); else {
                if ("number" != typeof e) {
                    var f = mc(a);
                    e = f.length
                } else Pb.unindexedChars && Wc(a) && (d = a.split(""));
                uc(a, function (a, c, g) {
                    return c = f ? f[--e] : --e, b(d[c], c, g)
                })
            }
            return a
        }

        function od(a, b) {
            var d = db(arguments, 2), e = -1, f = "function" == typeof b, g = a ? a.length : 0, h = c("number" == typeof g ? g : 0);
            return kd(a, function (a) {
                h[++e] = (f ? b : a[b]).apply(a, d)
            }), h
        }

        function pd(a, b, d) {
            var e = -1, f = a ? a.length : 0, g = c("number" == typeof f ? f : 0);
            if (b = Nb.createCallback(b, d, 3), kc(a))for (; ++e < f;)g[e] = b(a[e], e, a); else uc(a, function (a, c, d) {
                g[++e] = b(a, c, d)
            });
            return g
        }

        function qd(a, b, c) {
            var d = -1 / 0, e = d;
            if ("function" != typeof b && c && c[b] === a && (b = null), null == b && kc(a))for (var f = -1, g = a.length; ++f < g;) {
                var h = a[f];
                h > e && (e = h)
            } else b = null == b && Wc(a) ? W : Nb.createCallback(b, c, 3), uc(a, function (a, c, f) {
                var g = b(a, c, f);
                g > d && (d = g, e = a)
            });
            return e
        }

        function rd(a, b, c) {
            var d = 1 / 0, e = d;
            if ("function" != typeof b && c && c[b] === a && (b = null), null == b && kc(a))for (var f = -1, g = a.length; ++f < g;) {
                var h = a[f];
                e > h && (e = h)
            } else b = null == b && Wc(a) ? W : Nb.createCallback(b, c, 3), uc(a, function (a, c, f) {
                var g = b(a, c, f);
                d > g && (d = g, e = a)
            });
            return e
        }

        function td(a, b, c, d) {
            var e = arguments.length < 3;
            if (b = Nb.createCallback(b, d, 4), kc(a)) {
                var f = -1, g = a.length;
                for (e && (c = a[++f]); ++f < g;)c = b(c, a[f], f, a)
            } else uc(a, function (a, d, f) {
                c = e ? (e = !1, a) : b(c, a, d, f)
            });
            return c
        }

        function ud(a, b, c, d) {
            var e = arguments.length < 3;
            return b = Nb.createCallback(b, d, 4), ld(a, function (a, d, f) {
                c = e ? (e = !1, a) : b(c, a, d, f)
            }), c
        }

        function vd(a, b, c) {
            return b = Nb.createCallback(b, c, 3), hd(a, function (a, c, d) {
                return!b(a, c, d)
            })
        }

        function wd(b, c, d) {
            if (b && "number" != typeof b.length ? b = cd(b) : Pb.unindexedChars && Wc(b) && (b = b.split("")), null == c || d)return b ? b[$b(0, b.length - 1)] : a;
            var e = xd(b);
            return e.length = Ib(Hb(0, c), e.length), e
        }

        function xd(a) {
            var b = -1, d = a ? a.length : 0, e = c("number" == typeof d ? d : 0);
            return kd(a, function (a) {
                var c = $b(0, ++b);
                e[b] = e[c], e[c] = a
            }), e
        }

        function yd(a) {
            var b = a ? a.length : 0;
            return"number" == typeof b ? b : mc(a).length
        }

        function zd(a, b, c) {
            var d;
            if (b = Nb.createCallback(b, c, 3), kc(a))for (var e = -1, f = a.length; ++e < f && !(d = b(a[e], e, a));); else uc(a, function (a, c, e) {
                return!(d = b(a, c, e))
            });
            return!!d
        }

        function Ad(a, b, d) {
            var e = -1, f = kc(b), g = a ? a.length : 0, h = c("number" == typeof g ? g : 0);
            for (f || (b = Nb.createCallback(b, d, 3)), kd(a, function (a, c, d) {
                var g = h[++e] = _();
                f ? g.criteria = pd(b, function (b) {
                    return a[b]
                }) : (g.criteria = $())[0] = b(a, c, d), g.index = e, g.value = a
            }), g = h.length, h.sort(X); g--;) {
                var i = h[g];
                h[g] = i.value, f || bb(i.criteria), cb(i)
            }
            return h
        }

        function Bd(a) {
            return a && "number" == typeof a.length ? Pb.unindexedChars && Wc(a) ? a.split("") : db(a) : cd(a)
        }

        function Dd(a) {
            for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
                var e = a[b];
                e && d.push(e)
            }
            return d
        }

        function Ed(a) {
            return Wb(a, Xb(arguments, !0, !0, 1))
        }

        function Fd(a, b, c) {
            var d = -1, e = a ? a.length : 0;
            for (b = Nb.createCallback(b, c, 3); ++d < e;)if (b(a[d], d, a))return d;
            return-1
        }

        function Gd(a, b, c) {
            var d = a ? a.length : 0;
            for (b = Nb.createCallback(b, c, 3); d--;)if (b(a[d], d, a))return d;
            return-1
        }

        function Hd(b, c, d) {
            var e = 0, f = b ? b.length : 0;
            if ("number" != typeof c && null != c) {
                var g = -1;
                for (c = Nb.createCallback(c, d, 3); ++g < f && c(b[g], g, b);)e++
            } else if (e = c, null == e || d)return b ? b[0] : a;
            return db(b, 0, Ib(Hb(0, e), f))
        }

        function Id(a, b, c, d) {
            return"boolean" != typeof b && null != b && (d = c, c = "function" != typeof b && d && d[b] === a ? null : b, b = !1), null != c && (a = pd(a, c, d)), Xb(a, b)
        }

        function Jd(a, b, c) {
            if ("number" == typeof c) {
                var d = a ? a.length : 0;
                c = 0 > c ? Hb(0, d + c) : c || 0
            } else if (c) {
                var e = Sd(a, b);
                return a[e] === b ? e : -1
            }
            return T(a, b, c)
        }

        function Kd(a, b, c) {
            var d = 0, e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = Nb.createCallback(b, c, 3); f-- && b(a[f], f, a);)d++
            } else d = null == b || c ? 1 : b || d;
            return db(a, 0, Ib(Hb(0, e - d), e))
        }

        function Ld() {
            for (var a = [], b = -1, c = arguments.length, d = $(), e = ec(), f = e === T, h = $(); ++b < c;) {
                var i = arguments[b];
                (kc(i) || jc(i)) && (a.push(i), d.push(f && i.length >= g && Y(b ? a[b] : h)))
            }
            var j = a[0], k = -1, l = j ? j.length : 0, m = [];
            a:for (; ++k < l;) {
                var n = d[0];
                if (i = j[k], (n ? U(n, i) : e(h, i)) < 0) {
                    for (b = c, (n || h).push(i); --b;)if (n = d[b], (n ? U(n, i) : e(a[b], i)) < 0)continue a;
                    m.push(i)
                }
            }
            for (; c--;)n = d[c], n && cb(n);
            return bb(d), bb(h), m
        }

        function Md(b, c, d) {
            var e = 0, f = b ? b.length : 0;
            if ("number" != typeof c && null != c) {
                var g = f;
                for (c = Nb.createCallback(c, d, 3); g-- && c(b[g], g, b);)e++
            } else if (e = c, null == e || d)return b ? b[f - 1] : a;
            return db(b, Hb(0, f - e))
        }

        function Nd(a, b, c) {
            var d = a ? a.length : 0;
            for ("number" == typeof c && (d = (0 > c ? Hb(0, d + c) : Ib(c, d - 1)) + 1); d--;)if (a[d] === b)return d;
            return-1
        }

        function Od(a) {
            for (var b = arguments, c = 0, d = b.length, e = a ? a.length : 0; ++c < d;)for (var f = -1, g = b[c]; ++f < e;)a[f] === g && (zb.call(a, f--, 1), e--);
            return a
        }

        function Pd(a, b, d) {
            a = +a || 0, d = "number" == typeof d ? d : +d || 1, null == b && (b = a, a = 0);
            for (var e = -1, f = Hb(0, qb((b - a) / (d || 1))), g = c(f); ++e < f;)g[e] = a, a += d;
            return g
        }

        function Qd(a, b, c) {
            var d = -1, e = a ? a.length : 0, f = [];
            for (b = Nb.createCallback(b, c, 3); ++d < e;) {
                var g = a[d];
                b(g, d, a) && (f.push(g), zb.call(a, d--, 1), e--)
            }
            return f
        }

        function Rd(a, b, c) {
            if ("number" != typeof b && null != b) {
                var d = 0, e = -1, f = a ? a.length : 0;
                for (b = Nb.createCallback(b, c, 3); ++e < f && b(a[e], e, a);)d++
            } else d = null == b || c ? 1 : Hb(0, b);
            return db(a, d)
        }

        function Sd(a, b, c, d) {
            var e = 0, f = a ? a.length : e;
            for (c = c ? Nb.createCallback(c, d, 1) : pe, b = c(b); f > e;) {
                var g = e + f >>> 1;
                c(a[g]) < b ? e = g + 1 : f = g
            }
            return e
        }

        function Td() {
            return _b(Xb(arguments, !0, !0))
        }

        function Ud(a, b, c, d) {
            return"boolean" != typeof b && null != b && (d = c, c = "function" != typeof b && d && d[b] === a ? null : b, b = !1), null != c && (c = Nb.createCallback(c, d, 3)), _b(a, b, c)
        }

        function Vd(a) {
            return Wb(a, db(arguments, 1))
        }

        function Wd() {
            for (var a = -1, b = arguments.length; ++a < b;) {
                var c = arguments[a];
                if (kc(c) || jc(c))var d = d ? _b(Wb(d, c).concat(Wb(c, d))) : c
            }
            return d || []
        }

        function Xd() {
            for (var a = arguments.length > 1 ? arguments : arguments[0], b = -1, d = a ? qd(sd(a, "length")) : 0, e = c(0 > d ? 0 : d); ++b < d;)e[b] = sd(a, b);
            return e
        }

        function Yd(a, b) {
            var c = -1, d = a ? a.length : 0, e = {};
            for (b || !d || kc(a[0]) || (b = []); ++c < d;) {
                var f = a[c];
                b ? e[f] = b[c] : f && (e[f[0]] = f[1])
            }
            return e
        }

        function Zd(a, b) {
            if (!Pc(b))throw new ib;
            return function () {
                return--a < 1 ? b.apply(this, arguments) : void 0
            }
        }

        function $d(a, b) {
            return arguments.length > 2 ? bc(a, 17, db(arguments, 2), null, b) : bc(a, 1, null, null, b)
        }

        function _d(a) {
            for (var b = arguments.length > 1 ? Xb(arguments, !0, !1, 1) : Gc(a), c = -1, d = b.length; ++c < d;) {
                var e = b[c];
                a[e] = bc(a[e], 1, null, null, a)
            }
            return a
        }

        function ae(a, b) {
            return arguments.length > 2 ? bc(b, 19, db(arguments, 2), null, a) : bc(b, 3, null, null, a)
        }

        function be() {
            for (var a = arguments, b = a.length; b--;)if (!Pc(a[b]))throw new ib;
            return function () {
                for (var b = arguments, c = a.length; c--;)b = [a[c].apply(this, b)];
                return b[0]
            }
        }

        function ce(a, b) {
            return b = "number" == typeof b ? b : +b || a.length, bc(a, 4, null, null, null, b)
        }

        function de(b, c, d) {
            var e, f, g, h, i, j, k, l = 0, m = !1, n = !0;
            if (!Pc(b))throw new ib;
            if (c = Hb(0, c) || 0, d === !0) {
                var o = !0;
                n = !1
            } else Qc(d) && (o = d.leading, m = "maxWait"in d && (Hb(c, d.maxWait) || 0), n = "trailing"in d ? d.trailing : n);
            var p = function () {
                var d = c - (te() - h);
                if (0 >= d) {
                    f && rb(f);
                    var m = k;
                    f = j = k = a, m && (l = te(), g = b.apply(i, e), j || f || (e = i = null))
                } else j = yb(p, d)
            }, q = function () {
                j && rb(j), f = j = k = a, (n || m !== c) && (l = te(), g = b.apply(i, e), j || f || (e = i = null))
            };
            return function () {
                if (e = arguments, h = te(), i = this, k = n && (j || !o), m === !1)var a = o && !j; else {
                    f || o || (l = h);
                    var d = m - (h - l), r = 0 >= d;
                    r ? (f && (f = rb(f)), l = h, g = b.apply(i, e)) : f || (f = yb(q, d))
                }
                return r && j ? j = rb(j) : j || c === m || (j = yb(p, c)), a && (r = !0, g = b.apply(i, e)), !r || j || f || (e = i = null), g
            }
        }

        function ee(b) {
            if (!Pc(b))throw new ib;
            var c = db(arguments, 1);
            return yb(function () {
                b.apply(a, c)
            }, 1)
        }

        function fe(b, c) {
            if (!Pc(b))throw new ib;
            var d = db(arguments, 2);
            return yb(function () {
                b.apply(a, d)
            }, c)
        }

        function ge(a, b) {
            if (!Pc(a))throw new ib;
            var c = function () {
                var d = c.cache, e = b ? b.apply(this, arguments) : f + arguments[0];
                return vb.call(d, e) ? d[e] : d[e] = a.apply(this, arguments)
            };
            return c.cache = {}, c
        }

        function he(a) {
            var b, c;
            if (!Pc(a))throw new ib;
            return function () {
                return b ? c : (b = !0, c = a.apply(this, arguments), a = null, c)
            }
        }

        function ie(a) {
            return bc(a, 16, db(arguments, 1))
        }

        function je(a) {
            return bc(a, 32, null, db(arguments, 1))
        }

        function ke(a, b, c) {
            var d = !0, e = !0;
            if (!Pc(a))throw new ib;
            return c === !1 ? d = !1 : Qc(c) && (d = "leading"in c ? c.leading : d, e = "trailing"in c ? c.trailing : e), J.leading = d, J.maxWait = b, J.trailing = e, de(a, b, J)
        }

        function le(a, b) {
            return bc(b, 16, [a])
        }

        function me(a) {
            return function () {
                return a
            }
        }

        function ne(a, b, c) {
            var d = typeof a;
            if (null == a || "function" == d)return Ub(a, b, c);
            if ("object" != d)return ve(a);
            var e = mc(a), f = e[0], g = a[f];
            return 1 != e.length || g !== g || Qc(g) ? function (b) {
                for (var c = e.length, d = !1; c-- && (d = Yb(b[e[c]], a[e[c]], null, !0)););
                return d
            } : function (a) {
                var b = a[f];
                return g === b && (0 !== g || 1 / g == 1 / b)
            }
        }

        function oe(a) {
            return null == a ? "" : hb(a).replace(tc, dc)
        }

        function pe(a) {
            return a
        }

        function qe(a, b, c) {
            var d = !0, e = b && Gc(b);
            b && (c || e.length) || (null == c && (c = b), f = Ob, b = a, a = Nb, e = Gc(b)), c === !1 ? d = !1 : Qc(c) && "chain"in c && (d = c.chain);
            var f = a, g = Pc(f);
            kd(e, function (c) {
                var e = a[c] = b[c];
                g && (f.prototype[c] = function () {
                    var b = this.__chain__, c = this.__wrapped__, g = [c];
                    wb.apply(g, arguments);
                    var h = e.apply(a, g);
                    if (d || b) {
                        if (c === h && Qc(h))return this;
                        h = new f(h), h.__chain__ = b
                    }
                    return h
                })
            })
        }

        function re() {
            return b._ = nb, this
        }

        function se() {
        }

        function ve(a) {
            return function (b) {
                return b[a]
            }
        }

        function we(a, b, c) {
            var d = null == a, e = null == b;
            if (null == c && ("boolean" == typeof a && e ? (c = a, a = 1) : e || "boolean" != typeof b || (c = b, e = !0)), d && e && (b = 1), a = +a || 0, e ? (b = a, a = 0) : b = +b || 0, c || a % 1 || b % 1) {
                var f = Kb();
                return Ib(a + f * (b - a + parseFloat("1e-" + ((f + "").length - 1))), b)
            }
            return $b(a, b)
        }

        function xe(a, b) {
            if (a) {
                var c = a[b];
                return Pc(c) ? a[b]() : c
            }
        }

        function ye(b, c, d) {
            var e = Nb.templateSettings;
            b = hb(b || ""), d = zc({}, d, e);
            var i, f = zc({}, d.imports, e.imports), g = mc(f), h = cd(f), k = 0, o = d.interpolate || s, p = "__p += '", r = gb((d.escape || s).source + "|" + o.source + "|" + (o === q ? n : s).source + "|" + (d.evaluate || s).source + "|$", "g");
            b.replace(r, function (a, c, d, e, f, g) {
                return d || (d = e), p += b.slice(k, g).replace(u, Z), c && (p += "' +\n__e(" + c + ") +\n'"), f && (i = !0, p += "';\n" + f + ";\n__p += '"), d && (p += "' +\n((__t = (" + d + ")) == null ? '' : __t) +\n'"), k = g + a.length, a
            }), p += "';\n";
            var t = d.variable, v = t;
            v || (t = "obj", p = "with (" + t + ") {\n" + p + "\n}\n"), p = (i ? p.replace(j, "") : p).replace(l, "$1").replace(m, "$1;"), p = "function(" + t + ") {\n" + (v ? "" : t + " || (" + t + " = {});\n") + "var __t, __p = '', __e = _.escape" + (i ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + p + "return __p\n}";
            var w = "\n/*\n//# sourceURL=" + (d.sourceURL || "/lodash/template/source[" + x++ + "]") + "\n*/";
            try {
                var y = Q(g, "return " + p + w).apply(a, h)
            } catch (z) {
                throw z.source = p, z
            }
            return c ? y(c) : (y.source = p, y)
        }

        function ze(a, b, d) {
            a = (a = +a) > -1 ? a : 0;
            var e = -1, f = c(a);
            for (b = Ub(b, d, 1); ++e < a;)f[e] = b(e);
            return f
        }

        function Ae(a) {
            return null == a ? "" : hb(a).replace(sc, ic)
        }

        function Be(a) {
            var b = ++d;
            return hb(null == a ? "" : a) + b
        }

        function Ce(a) {
            return a = new Ob(a), a.__chain__ = !0, a
        }

        function De(a, b) {
            return b(a), a
        }

        function Ee() {
            return this.__chain__ = !0, this
        }

        function Fe() {
            return hb(this.__wrapped__)
        }

        function Ge() {
            return this.__wrapped__
        }

        b = b ? fb.defaults(O.Object(), b, fb.pick(O, v)) : O;
        var c = b.Array, h = b.Boolean, N = b.Date, P = b.Error, Q = b.Function, R = b.Math, S = b.Number, V = b.Object, gb = b.RegExp, hb = b.String, ib = b.TypeError, jb = [], kb = P.prototype, lb = V.prototype, mb = hb.prototype, nb = b._, ob = lb.toString, pb = gb("^" + hb(ob).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"), qb = R.ceil, rb = b.clearTimeout, sb = R.floor, tb = Q.prototype.toString, ub = fc(ub = V.getPrototypeOf) && ub, vb = lb.hasOwnProperty, wb = jb.push, xb = lb.propertyIsEnumerable, yb = b.setTimeout, zb = jb.splice, Ab = jb.unshift, Bb = function () {
            try {
                var a = {}, b = fc(b = V.defineProperty) && b, c = b(a, a, a) && b
            } catch (d) {
            }
            return c
        }(), Cb = fc(Cb = V.create) && Cb, Db = fc(Db = c.isArray) && Db, Eb = b.isFinite, Fb = b.isNaN, Gb = fc(Gb = V.keys) && Gb, Hb = R.max, Ib = R.min, Jb = b.parseInt, Kb = R.random, Lb = {};
        Lb[z] = c, Lb[A] = h, Lb[B] = N, Lb[D] = Q, Lb[F] = V, Lb[E] = S, Lb[G] = gb, Lb[H] = hb;
        var Mb = {};
        Mb[z] = Mb[B] = Mb[E] = {constructor: !0, toLocaleString: !0, toString: !0, valueOf: !0}, Mb[A] = Mb[H] = {constructor: !0, toString: !0, valueOf: !0}, Mb[C] = Mb[D] = Mb[G] = {constructor: !0, toString: !0}, Mb[F] = {constructor: !0}, function () {
            for (var a = w.length; a--;) {
                var b = w[a];
                for (var c in Mb)vb.call(Mb, c) && !vb.call(Mb[c], b) && (Mb[c][b] = !1)
            }
        }(), Ob.prototype = Nb.prototype;
        var Pb = Nb.support = {};
        !function () {
            var a = function () {
                this.x = 1
            }, d = {0: 1, length: 1}, e = [];
            a.prototype = {valueOf: 1, y: 1};
            for (var f in new a)e.push(f);
            for (f in arguments);
            Pb.argsClass = ob.call(arguments) == y, Pb.argsObject = arguments.constructor == V && !(arguments instanceof c), Pb.enumErrorProps = xb.call(kb, "message") || xb.call(kb, "name"), Pb.enumPrototypes = xb.call(a, "prototype"), Pb.funcDecomp = !fc(b.WinRTError) && t.test(eb), Pb.funcNames = "string" == typeof Q.name, Pb.nonEnumArgs = 0 != f, Pb.nonEnumShadows = !/valueOf/.test(e), Pb.ownLast = "x" != e[0], Pb.spliceObjects = (jb.splice.call(d, 0, 1), !d[0]), Pb.unindexedChars = "xx" != "x"[0] + V("x")[0];
            try {
                Pb.nodeClass = !(ob.call(document) == F && !({toString: 0} + ""))
            } catch (g) {
                Pb.nodeClass = !0
            }
        }(1), Nb.templateSettings = {escape: /<%-([\s\S]+?)%>/g, evaluate: /<%([\s\S]+?)%>/g, interpolate: q, variable: "", imports: {_: Nb}};
        var Qb = function (a) {
            var b = "var index, iterable = " + a.firstArg + ", result = " + a.init + ";\nif (!iterable) return result;\n" + a.top + ";";
            a.array ? (b += "\nvar length = iterable.length; index = -1;\nif (" + a.array + ") {  ", Pb.unindexedChars && (b += "\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "), b += "\n  while (++index < length) {\n    " + a.loop + ";\n  }\n}\nelse {  ") : Pb.nonEnumArgs && (b += "\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      " + a.loop + ";\n    }\n  } else {  "), Pb.enumPrototypes && (b += "\n  var skipProto = typeof iterable == 'function';\n  "), Pb.enumErrorProps && (b += "\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");
            var c = [];
            if (Pb.enumPrototypes && c.push('!(skipProto && index == "prototype")'), Pb.enumErrorProps && c.push('!(skipErrorProps && (index == "message" || index == "name"))'), a.useHas && a.keys)b += "\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n", c.length && (b += "    if (" + c.join(" && ") + ") {\n  "), b += a.loop + ";    ", c.length && (b += "\n    }"), b += "\n  }  "; else if (b += "\n  for (index in iterable) {\n", a.useHas && c.push("hasOwnProperty.call(iterable, index)"), c.length && (b += "    if (" + c.join(" && ") + ") {\n  "), b += a.loop + ";    ", c.length && (b += "\n    }"), b += "\n  }    ", Pb.nonEnumShadows) {
                for (b += "\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ", k = 0; 7 > k; k++)b += "\n    index = '" + a.shadowedProps[k] + "';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))", a.useHas || (b += " || (!nonEnum[index] && iterable[index] !== objectProto[index])"), b += ") {\n      " + a.loop + ";\n    }      ";
                b += "\n  }    "
            }
            return(a.array || Pb.nonEnumArgs) && (b += "\n}"), b += a.bottom + ";\nreturn result"
        };
        Cb || (Tb = function () {
            function a() {
            }

            return function (c) {
                if (Qc(c)) {
                    a.prototype = c;
                    var d = new a;
                    a.prototype = null
                }
                return d || b.Object()
            }
        }());
        var gc = Bb ? function (a, b) {
            K.value = b, Bb(a, "__bindData__", K)
        } : se;
        Pb.argsClass || (jc = function (a) {
            return a && "object" == typeof a && "number" == typeof a.length && vb.call(a, "callee") && !xb.call(a, "callee") || !1
        });
        var kc = Db || function (a) {
            return a && "object" == typeof a && "number" == typeof a.length && ob.call(a) == z || !1
        }, lc = cc({args: "object", init: "[]", top: "if (!(objectTypes[typeof object])) return result", loop: "result.push(index)"}), mc = Gb ? function (a) {
            return Qc(a) ? Pb.enumPrototypes && "function" == typeof a || Pb.nonEnumArgs && a.length && jc(a) ? lc(a) : Gb(a) : []
        } : lc, nc = {args: "collection, callback, thisArg", top: "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)", array: "typeof length == 'number'", keys: mc, loop: "if (callback(iterable[index], index, collection) === false) return result"}, oc = {args: "object, source, guard", top: "var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {", keys: mc, loop: "if (typeof result[index] == 'undefined') result[index] = iterable[index]", bottom: "  }\n}"}, pc = {top: "if (!objectTypes[typeof iterable]) return result;\n" + nc.top, array: !1}, qc = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}, rc = Ic(qc), sc = gb("(" + mc(rc).join("|") + ")", "g"), tc = gb("[" + mc(qc).join("") + "]", "g"), uc = cc(nc), vc = cc(oc, {top: oc.top.replace(";", ";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"), loop: "result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"}), zc = cc(oc), Cc = cc(nc, pc, {useHas: !1}), Ec = cc(nc, pc);
        Pc(/x/) && (Pc = function (a) {
            return"function" == typeof a && ob.call(a) == D
        });
        var Uc = ub ? function (a) {
            if (!a || ob.call(a) != F || !Pb.argsClass && jc(a))return!1;
            var b = a.valueOf, c = fc(b) && (c = ub(b)) && ub(c);
            return c ? a == c || ub(a) == c : hc(a)
        } : hc, fd = ac(function (a, b, c) {
            vb.call(a, c) ? a[c]++ : a[c] = 1
        }), md = ac(function (a, b, c) {
            (vb.call(a, c) ? a[c] : a[c] = []).push(b)
        }), nd = ac(function (a, b, c) {
            a[c] = b
        }), sd = pd, Cd = hd, te = fc(te = N.now) && te || function () {
            return(new N).getTime()
        }, ue = 8 == Jb(i + "08") ? Jb : function (a, b) {
            return Jb(Wc(a) ? a.replace(r, "") : a, b || 0)
        };
        return Nb.after = Zd, Nb.assign = vc, Nb.at = dd, Nb.bind = $d, Nb.bindAll = _d, Nb.bindKey = ae, Nb.chain = Ce, Nb.compact = Dd, Nb.compose = be, Nb.constant = me, Nb.countBy = fd, Nb.create = yc, Nb.createCallback = ne, Nb.curry = ce, Nb.debounce = de, Nb.defaults = zc, Nb.defer = ee, Nb.delay = fe, Nb.difference = Ed, Nb.filter = hd, Nb.flatten = Id, Nb.forEach = kd, Nb.forEachRight = ld, Nb.forIn = Cc, Nb.forInRight = Dc, Nb.forOwn = Ec, Nb.forOwnRight = Fc, Nb.functions = Gc, Nb.groupBy = md, Nb.indexBy = nd, Nb.initial = Kd, Nb.intersection = Ld, Nb.invert = Ic, Nb.invoke = od, Nb.keys = mc, Nb.map = pd, Nb.mapValues = Yc, Nb.max = qd, Nb.memoize = ge, Nb.merge = Zc, Nb.min = rd, Nb.omit = $c, Nb.once = he, Nb.pairs = _c, Nb.partial = ie, Nb.partialRight = je, Nb.pick = ad, Nb.pluck = sd, Nb.property = ve, Nb.pull = Od, Nb.range = Pd, Nb.reject = vd, Nb.remove = Qd, Nb.rest = Rd, Nb.shuffle = xd, Nb.sortBy = Ad, Nb.tap = De, Nb.throttle = ke, Nb.times = ze, Nb.toArray = Bd, Nb.transform = bd, Nb.union = Td, Nb.uniq = Ud, Nb.values = cd, Nb.where = Cd, Nb.without = Vd, Nb.wrap = le, Nb.xor = Wd, Nb.zip = Xd, Nb.zipObject = Yd, Nb.collect = pd, Nb.drop = Rd, Nb.each = kd, Nb.eachRight = ld, Nb.extend = vc, Nb.methods = Gc, Nb.object = Yd, Nb.select = hd, Nb.tail = Rd, Nb.unique = Ud, Nb.unzip = Xd, qe(Nb), Nb.clone = wc, Nb.cloneDeep = xc, Nb.contains = ed, Nb.escape = oe, Nb.every = gd, Nb.find = id, Nb.findIndex = Fd, Nb.findKey = Ac, Nb.findLast = jd, Nb.findLastIndex = Gd, Nb.findLastKey = Bc, Nb.has = Hc, Nb.identity = pe, Nb.indexOf = Jd, Nb.isArguments = jc, Nb.isArray = kc, Nb.isBoolean = Jc, Nb.isDate = Kc, Nb.isElement = Lc,Nb.isEmpty = Mc,Nb.isEqual = Nc,Nb.isFinite = Oc,Nb.isFunction = Pc,Nb.isNaN = Rc,Nb.isNull = Sc,Nb.isNumber = Tc,Nb.isObject = Qc,Nb.isPlainObject = Uc,Nb.isRegExp = Vc,Nb.isString = Wc,Nb.isUndefined = Xc,Nb.lastIndexOf = Nd,Nb.mixin = qe,Nb.noConflict = re,Nb.noop = se,Nb.now = te,Nb.parseInt = ue,Nb.random = we,Nb.reduce = td,Nb.reduceRight = ud,Nb.result = xe,Nb.runInContext = eb,Nb.size = yd,Nb.some = zd,Nb.sortedIndex = Sd,Nb.template = ye,Nb.unescape = Ae,Nb.uniqueId = Be,Nb.all = gd,Nb.any = zd,Nb.detect = id,Nb.findWhere = id,Nb.foldl = td,Nb.foldr = ud,Nb.include = ed,Nb.inject = td,qe(function () {
            var a = {};
            return Ec(Nb, function (b, c) {
                Nb.prototype[c] || (a[c] = b)
            }), a
        }(), !1),Nb.first = Hd,Nb.last = Md,Nb.sample = wd,Nb.take = Hd,Nb.head = Hd,Ec(Nb, function (a, b) {
            var c = "sample" !== b;
            Nb.prototype[b] || (Nb.prototype[b] = function (b, d) {
                var e = this.__chain__, f = a(this.__wrapped__, b, d);
                return e || null != b && (!d || c && "function" == typeof b) ? new Ob(f, e) : f
            })
        }),Nb.VERSION = "2.4.1",Nb.prototype.chain = Ee,Nb.prototype.toString = Fe,Nb.prototype.value = Ge,Nb.prototype.valueOf = Ge,uc(["join", "pop", "shift"], function (a) {
            var b = jb[a];
            Nb.prototype[a] = function () {
                var a = this.__chain__, c = b.apply(this.__wrapped__, arguments);
                return a ? new Ob(c, a) : c
            }
        }),uc(["push", "reverse", "sort", "unshift"], function (a) {
            var b = jb[a];
            Nb.prototype[a] = function () {
                return b.apply(this.__wrapped__, arguments), this
            }
        }),uc(["concat", "slice", "splice"], function (a) {
            var b = jb[a];
            Nb.prototype[a] = function () {
                return new Ob(b.apply(this.__wrapped__, arguments), this.__chain__)
            }
        }),Pb.spliceObjects || uc(["pop", "shift", "splice"], function (a) {
            var b = jb[a], c = "splice" == a;
            Nb.prototype[a] = function () {
                var a = this.__chain__, d = this.__wrapped__, e = b.apply(d, arguments);
                return 0 === d.length && delete d[0], a || c ? new Ob(e, a) : e
            }
        }),Nb
    }

    var a, b = [], c = [], d = 0, e = {}, f = +new Date + "", g = 75, h = 40, i = " 	\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000", j = /\b__p \+= '';/g, l = /\b(__p \+=) '' \+/g, m = /(__e\(.*?\)|\b__t\)) \+\n'';/g, n = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, o = /\w*$/, p = /^\s*function[ \n\r\t]+\w/, q = /<%=([\s\S]+?)%>/g, r = RegExp("^[" + i + "]*0+(?=.$)"), s = /($^)/, t = /\bthis\b/, u = /['\n\r\t\u2028\u2029\\]/g, v = ["Array", "Boolean", "Date", "Error", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout"], w = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"], x = 0, y = "[object Arguments]", z = "[object Array]", A = "[object Boolean]", B = "[object Date]", C = "[object Error]", D = "[object Function]", E = "[object Number]", F = "[object Object]", G = "[object RegExp]", H = "[object String]", I = {};
    I[D] = !1, I[y] = I[z] = I[A] = I[B] = I[E] = I[F] = I[G] = I[H] = !0;
    var J = {leading: !1, maxWait: 0, trailing: !1}, K = {configurable: !1, enumerable: !1, value: null, writable: !1}, L = {args: "", array: null, bottom: "", firstArg: "", init: "", keys: null, loop: "", shadowedProps: null, support: null, top: "", useHas: !1}, M = {"boolean": !1, "function": !0, object: !0, number: !1, string: !1, undefined: !1}, N = {"\\": "\\", "'": "'", "\n": "n", "\r": "r", "	": "t", "\u2028": "u2028", "\u2029": "u2029"}, O = M[typeof window] && window || this, P = M[typeof exports] && exports && !exports.nodeType && exports, Q = M[typeof module] && module && !module.nodeType && module, R = Q && Q.exports === P && P, S = M[typeof global] && global;
    !S || S.global !== S && S.window !== S || (O = S);
    var fb = eb();
    "function" == typeof define ? (O._ = fb, define("commons/underscore/2.4.1/lodash", [], function () {
        return fb
    })) : P && Q ? R ? (Q.exports = fb)._ = fb : P._ = fb : O._ = fb
}.call(this);
define("commons/underscore-string/underscore.string", function (require, exports, module) {
    !function (e, t) {
        "use strict";
        var n = t.prototype.trim, r = t.prototype.trimRight, i = t.prototype.trimLeft, s = function (e) {
            return e * 1 || 0
        }, o = function (e, t) {
            if (t < 1)return"";
            var n = "";
            while (t > 0)t & 1 && (n += e), t >>= 1, e += e;
            return n
        }, u = [].slice, a = function (e) {
            return e == null ? "\\s" : e.source ? e.source : "[" + p.escapeRegExp(e) + "]"
        }, f = {lt: "<", gt: ">", quot: '"', amp: "&", apos: "'"}, l = {};
        for (var c in f)l[f[c]] = c;
        l["'"] = "#39";
        var h = function () {
            function e(e) {
                return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
            }

            var n = o, r = function () {
                return r.cache.hasOwnProperty(arguments[0]) || (r.cache[arguments[0]] = r.parse(arguments[0])), r.format.call(null, r.cache[arguments[0]], arguments)
            };
            return r.format = function (r, i) {
                var s = 1, o = r.length, u = "", a, f = [], l, c, p, d, v, m;
                for (l = 0; l < o; l++) {
                    u = e(r[l]);
                    if (u === "string")f.push(r[l]); else if (u === "array") {
                        p = r[l];
                        if (p[2]) {
                            a = i[s];
                            for (c = 0; c < p[2].length; c++) {
                                if (!a.hasOwnProperty(p[2][c]))throw new Error(h('[_.sprintf] property "%s" does not exist', p[2][c]));
                                a = a[p[2][c]]
                            }
                        } else p[1] ? a = i[p[1]] : a = i[s++];
                        if (/[^s]/.test(p[8]) && e(a) != "number")throw new Error(h("[_.sprintf] expecting number but found %s", e(a)));
                        switch (p[8]) {
                            case"b":
                                a = a.toString(2);
                                break;
                            case"c":
                                a = t.fromCharCode(a);
                                break;
                            case"d":
                                a = parseInt(a, 10);
                                break;
                            case"e":
                                a = p[7] ? a.toExponential(p[7]) : a.toExponential();
                                break;
                            case"f":
                                a = p[7] ? parseFloat(a).toFixed(p[7]) : parseFloat(a);
                                break;
                            case"o":
                                a = a.toString(8);
                                break;
                            case"s":
                                a = (a = t(a)) && p[7] ? a.substring(0, p[7]) : a;
                                break;
                            case"u":
                                a = Math.abs(a);
                                break;
                            case"x":
                                a = a.toString(16);
                                break;
                            case"X":
                                a = a.toString(16).toUpperCase()
                        }
                        a = /[def]/.test(p[8]) && p[3] && a >= 0 ? "+" + a : a, v = p[4] ? p[4] == "0" ? "0" : p[4].charAt(1) : " ", m = p[6] - t(a).length, d = p[6] ? n(v, m) : "", f.push(p[5] ? a + d : d + a)
                    }
                }
                return f.join("")
            }, r.cache = {}, r.parse = function (e) {
                var t = e, n = [], r = [], i = 0;
                while (t) {
                    if ((n = /^[^\x25]+/.exec(t)) !== null)r.push(n[0]); else if ((n = /^\x25{2}/.exec(t)) !== null)r.push("%"); else {
                        if ((n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t)) === null)throw new Error("[_.sprintf] huh?");
                        if (n[2]) {
                            i |= 1;
                            var s = [], o = n[2], u = [];
                            if ((u = /^([a-z_][a-z_\d]*)/i.exec(o)) === null)throw new Error("[_.sprintf] huh?");
                            s.push(u[1]);
                            while ((o = o.substring(u[0].length)) !== "")if ((u = /^\.([a-z_][a-z_\d]*)/i.exec(o)) !== null)s.push(u[1]); else {
                                if ((u = /^\[(\d+)\]/.exec(o)) === null)throw new Error("[_.sprintf] huh?");
                                s.push(u[1])
                            }
                            n[2] = s
                        } else i |= 2;
                        if (i === 3)throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");
                        r.push(n)
                    }
                    t = t.substring(n[0].length)
                }
                return r
            }, r
        }(), p = {VERSION: "2.3.0", isBlank: function (e) {
            return e == null && (e = ""), /^\s*$/.test(e)
        }, stripTags: function (e) {
            return e == null ? "" : t(e).replace(/<\/?[^>]+>/g, "")
        }, capitalize: function (e) {
            return e = e == null ? "" : t(e), e.charAt(0).toUpperCase() + e.slice(1)
        }, chop: function (e, n) {
            return e == null ? [] : (e = t(e), n = ~~n, n > 0 ? e.match(new RegExp(".{1," + n + "}", "g")) : [e])
        }, clean: function (e) {
            return p.strip(e).replace(/\s+/g, " ")
        }, count: function (e, n) {
            if (e == null || n == null)return 0;
            e = t(e), n = t(n);
            var r = 0, i = 0, s = n.length;
            for (; ;) {
                i = e.indexOf(n, i);
                if (i === -1)break;
                r++, i += s
            }
            return r
        }, chars: function (e) {
            return e == null ? [] : t(e).split("")
        }, swapCase: function (e) {
            return e == null ? "" : t(e).replace(/\S/g, function (e) {
                return e === e.toUpperCase() ? e.toLowerCase() : e.toUpperCase()
            })
        }, escapeHTML: function (e) {
            return e == null ? "" : t(e).replace(/[&<>"']/g, function (e) {
                return"&" + l[e] + ";"
            })
        }, unescapeHTML: function (e) {
            return e == null ? "" : t(e).replace(/\&([^;]+);/g, function (e, n) {
                var r;
                return n in f ? f[n] : (r = n.match(/^#x([\da-fA-F]+)$/)) ? t.fromCharCode(parseInt(r[1], 16)) : (r = n.match(/^#(\d+)$/)) ? t.fromCharCode(~~r[1]) : e
            })
        }, escapeRegExp: function (e) {
            return e == null ? "" : t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
        }, splice: function (e, t, n, r) {
            var i = p.chars(e);
            return i.splice(~~t, ~~n, r), i.join("")
        }, insert: function (e, t, n) {
            return p.splice(e, t, 0, n)
        }, include: function (e, n) {
            return n === "" ? !0 : e == null ? !1 : t(e).indexOf(n) !== -1
        }, join: function () {
            var e = u.call(arguments), t = e.shift();
            return t == null && (t = ""), e.join(t)
        }, lines: function (e) {
            return e == null ? [] : t(e).split("\n")
        }, reverse: function (e) {
            return p.chars(e).reverse().join("")
        }, startsWith: function (e, n) {
            return n === "" ? !0 : e == null || n == null ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(0, n.length) === n)
        }, endsWith: function (e, n) {
            return n === "" ? !0 : e == null || n == null ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(e.length - n.length) === n)
        }, succ: function (e) {
            return e == null ? "" : (e = t(e), e.slice(0, -1) + t.fromCharCode(e.charCodeAt(e.length - 1) + 1))
        }, titleize: function (e) {
            return e == null ? "" : t(e).replace(/(?:^|\s)\S/g, function (e) {
                return e.toUpperCase()
            })
        }, camelize: function (e) {
            return p.trim(e).replace(/[-_\s]+(.)?/g, function (e, t) {
                return t.toUpperCase()
            })
        }, underscored: function (e) {
            return p.trim(e).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase()
        }, dasherize: function (e) {
            return p.trim(e).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()
        }, classify: function (e) {
            return p.titleize(t(e).replace(/_/g, " ")).replace(/\s/g, "")
        }, humanize: function (e) {
            return p.capitalize(p.underscored(e).replace(/_id$/, "").replace(/_/g, " "))
        }, trim: function (e, r) {
            return e == null ? "" : !r && n ? n.call(e) : (r = a(r), t(e).replace(new RegExp("^" + r + "+|" + r + "+$", "g"), ""))
        }, ltrim: function (e, n) {
            return e == null ? "" : !n && i ? i.call(e) : (n = a(n), t(e).replace(new RegExp("^" + n + "+"), ""))
        }, rtrim: function (e, n) {
            return e == null ? "" : !n && r ? r.call(e) : (n = a(n), t(e).replace(new RegExp(n + "+$"), ""))
        }, truncate: function (e, n, r) {
            return e == null ? "" : (e = t(e), r = r || "...", n = ~~n, e.length > n ? e.slice(0, n) + r : e)
        }, prune: function (e, n, r) {
            if (e == null)return"";
            e = t(e), n = ~~n, r = r != null ? t(r) : "...";
            if (e.length <= n)return e;
            var i = function (e) {
                return e.toUpperCase() !== e.toLowerCase() ? "A" : " "
            }, s = e.slice(0, n + 1).replace(/.(?=\W*\w*$)/g, i);
            return s.slice(s.length - 2).match(/\w\w/) ? s = s.replace(/\s*\S+$/, "") : s = p.rtrim(s.slice(0, s.length - 1)), (s + r).length > e.length ? e : e.slice(0, s.length) + r
        }, words: function (e, t) {
            return p.isBlank(e) ? [] : p.trim(e, t).split(t || /\s+/)
        }, pad: function (e, n, r, i) {
            e = e == null ? "" : t(e), n = ~~n;
            var s = 0;
            r ? r.length > 1 && (r = r.charAt(0)) : r = " ";
            switch (i) {
                case"right":
                    return s = n - e.length, e + o(r, s);
                case"both":
                    return s = n - e.length, o(r, Math.ceil(s / 2)) + e + o(r, Math.floor(s / 2));
                default:
                    return s = n - e.length, o(r, s) + e
            }
        }, lpad: function (e, t, n) {
            return p.pad(e, t, n)
        }, rpad: function (e, t, n) {
            return p.pad(e, t, n, "right")
        }, lrpad: function (e, t, n) {
            return p.pad(e, t, n, "both")
        }, sprintf: h, vsprintf: function (e, t) {
            return t.unshift(e), h.apply(null, t)
        }, toNumber: function (e, n) {
            if (e == null || e == "")return 0;
            e = t(e);
            var r = s(s(e).toFixed(~~n));
            return r === 0 && !e.match(/^0+$/) ? Number.NaN : r
        }, numberFormat: function (e, t, n, r) {
            if (isNaN(e) || e == null)return"";
            e = e.toFixed(~~t), r = typeof r == "string" ? r : ",";
            var i = e.split("."), s = i[0], o = i[1] ? (n || ".") + i[1] : "";
            return s.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + r) + o
        }, strRight: function (e, n) {
            if (e == null)return"";
            e = t(e), n = n != null ? t(n) : n;
            var r = n ? e.indexOf(n) : -1;
            return~r ? e.slice(r + n.length, e.length) : e
        }, strRightBack: function (e, n) {
            if (e == null)return"";
            e = t(e), n = n != null ? t(n) : n;
            var r = n ? e.lastIndexOf(n) : -1;
            return~r ? e.slice(r + n.length, e.length) : e
        }, strLeft: function (e, n) {
            if (e == null)return"";
            e = t(e), n = n != null ? t(n) : n;
            var r = n ? e.indexOf(n) : -1;
            return~r ? e.slice(0, r) : e
        }, strLeftBack: function (e, t) {
            if (e == null)return"";
            e += "", t = t != null ? "" + t : t;
            var n = e.lastIndexOf(t);
            return~n ? e.slice(0, n) : e
        }, toSentence: function (e, t, n, r) {
            t = t || ", ", n = n || " and ";
            var i = e.slice(), s = i.pop();
            return e.length > 2 && r && (n = p.rtrim(t) + n), i.length ? i.join(t) + n + s : s
        }, toSentenceSerial: function () {
            var e = u.call(arguments);
            return e[3] = !0, p.toSentence.apply(p, e)
        }, slugify: function (e) {
            if (e == null)return"";
            var n = "?àá???????èé?êìí???ńòó????ùúü?????", r = "aaaaaaaaceeeeeiiiilnoooooouuuunczz", i = new RegExp(a(n), "g");
            return e = t(e).toLowerCase().replace(i, function (e) {
                var t = n.indexOf(e);
                return r.charAt(t) || "-"
            }), p.dasherize(e.replace(/[^\w\s-]/g, ""))
        }, surround: function (e, t) {
            return[t, e, t].join("")
        }, quote: function (e) {
            return p.surround(e, '"')
        }, exports: function () {
            var e = {};
            for (var t in this) {
                if (!this.hasOwnProperty(t) || t.match(/^(?:include|contains|reverse)$/))continue;
                e[t] = this[t]
            }
            return e
        }, repeat: function (e, n, r) {
            if (e == null)return"";
            n = ~~n;
            if (r == null)return o(t(e), n);
            for (var i = []; n > 0; i[--n] = e);
            return i.join(r)
        }, levenshtein: function (e, n) {
            if (e == null && n == null)return 0;
            if (e == null)return t(n).length;
            if (n == null)return t(e).length;
            e = t(e), n = t(n);
            var r = [], i, s;
            for (var o = 0; o <= n.length; o++)for (var u = 0; u <= e.length; u++)o && u ? e.charAt(u - 1) === n.charAt(o - 1) ? s = i : s = Math.min(r[u], r[u - 1], i) + 1 : s = o + u, i = r[u], r[u] = s;
            return r.pop()
        }};
        p.strip = p.trim, p.lstrip = p.ltrim, p.rstrip = p.rtrim, p.center = p.lrpad, p.rjust = p.lpad, p.ljust = p.rpad, p.contains = p.include, p.q = p.quote, typeof exports != "undefined" && (typeof module != "undefined" && module.exports && (module.exports = p), exports._s = p), typeof define == "function" && define.amd && define("underscore.string", [], function () {
            return p
        }), e._ = e._ || {}, e._.string = e._.str = p
    }(this, String);
});
// moment
(function (t) {
    var ender = 1;

    function e(t, e) {
        return function (n) {
            return u(t.call(this, n), e)
        }
    }

    function n(t, e) {
        return function (n) {
            return this.lang().ordinal(t.call(this, n), e)
        }
    }

    function s() {
    }

    function r(t) {
        a(this, t)
    }

    function i(t) {
        var e = this._data = {}, n = t.years || t.year || t.y || 0, s = t.months || t.month || t.M || 0, r = t.weeks || t.week || t.w || 0, i = t.days || t.day || t.d || 0, a = t.hours || t.hour || t.h || 0, u = t.minutes || t.minute || t.m || 0, d = t.seconds || t.second || t.s || 0, h = t.milliseconds || t.millisecond || t.ms || 0;
        this._milliseconds = h + 1e3 * d + 6e4 * u + 36e5 * a, this._days = i + 7 * r, this._months = s + 12 * n, e.milliseconds = h % 1e3, d += o(h / 1e3), e.seconds = d % 60, u += o(d / 60), e.minutes = u % 60, a += o(u / 60), e.hours = a % 24, i += o(a / 24), i += 7 * r, e.days = i % 30, s += o(i / 30), e.months = s % 12, n += o(s / 12), e.years = n
    }

    function a(t, e) {
        for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n]);
        return t
    }

    function o(t) {
        return 0 > t ? Math.ceil(t) : Math.floor(t)
    }

    function u(t, e) {
        for (var n = t + ""; e > n.length;)n = "0" + n;
        return n
    }

    function d(t, e, n) {
        var s, r = e._milliseconds, i = e._days, a = e._months;
        r && t._d.setTime(+t + r * n), i && t.date(t.date() + i * n), a && (s = t.date(), t.date(1).month(t.month() + a * n).date(Math.min(s, t.daysInMonth())))
    }

    function h(t) {
        return"[object Array]" === Object.prototype.toString.call(t)
    }

    function c(t, e) {
        var n, s = Math.min(t.length, e.length), r = Math.abs(t.length - e.length), i = 0;
        for (n = 0; s > n; n++)~~t[n] !== ~~e[n] && i++;
        return i + r
    }

    function f(t) {
        return t ? se[t] || t.toLowerCase().replace(/(.)s$/, "$1") : t
    }

    function l(t, e) {
        return e.abbr = t, U[t] || (U[t] = new s), U[t].set(e), U[t]
    }

    function _(t) {
        return t ? (!U[t] && x && require("./lang/" + t), U[t]) : C.fn._lang
    }

    function m(t) {
        return t.match(/\[.*\]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
    }

    function y(t) {
        var e, n, s = t.match(Z);
        for (e = 0, n = s.length; n > e; e++)s[e] = oe[s[e]] ? oe[s[e]] : m(s[e]);
        return function (r) {
            var i = "";
            for (e = 0; n > e; e++)i += "function" == typeof s[e].call ? s[e].call(r, t) : s[e];
            return i
        }
    }

    function M(t, e) {
        function n(e) {
            return t.lang().longDateFormat(e) || e
        }

        for (var s = 5; s-- && E.test(e);)e = e.replace(E, n);
        return re[e] || (re[e] = y(e)), re[e](t)
    }

    function g(t) {
        switch (t) {
            case"DDDD":
                return N;
            case"YYYY":
                return I;
            case"YYYYY":
                return X;
            case"S":
            case"SS":
            case"SSS":
            case"DDD":
                return V;
            case"MMM":
            case"MMMM":
            case"dd":
            case"ddd":
            case"dddd":
            case"a":
            case"A":
                return $;
            case"X":
                return q;
            case"Z":
            case"ZZ":
                return R;
            case"T":
                return j;
            case"MM":
            case"DD":
            case"YY":
            case"HH":
            case"hh":
            case"mm":
            case"ss":
            case"M":
            case"D":
            case"d":
            case"H":
            case"h":
            case"m":
            case"s":
                return J;
            default:
                return RegExp(t.replace("\\", ""))
        }
    }

    function D(t, e, n) {
        var s, r = n._a;
        switch (t) {
            case"M":
            case"MM":
                r[1] = null == e ? 0 : ~~e - 1;
                break;
            case"MMM":
            case"MMMM":
                s = _(n._l).monthsParse(e), null != s ? r[1] = s : n._isValid = !1;
                break;
            case"D":
            case"DD":
            case"DDD":
            case"DDDD":
                null != e && (r[2] = ~~e);
                break;
            case"YY":
                r[0] = ~~e + (~~e > 68 ? 1900 : 2e3);
                break;
            case"YYYY":
            case"YYYYY":
                r[0] = ~~e;
                break;
            case"a":
            case"A":
                n._isPm = "pm" === (e + "").toLowerCase();
                break;
            case"H":
            case"HH":
            case"h":
            case"hh":
                r[3] = ~~e;
                break;
            case"m":
            case"mm":
                r[4] = ~~e;
                break;
            case"s":
            case"ss":
                r[5] = ~~e;
                break;
            case"S":
            case"SS":
            case"SSS":
                r[6] = ~~(1e3 * ("0." + e));
                break;
            case"X":
                n._d = new Date(1e3 * parseFloat(e));
                break;
            case"Z":
            case"ZZ":
                n._useUTC = !0, s = (e + "").match(te), s && s[1] && (n._tzh = ~~s[1]), s && s[2] && (n._tzm = ~~s[2]), s && "+" === s[0] && (n._tzh = -n._tzh, n._tzm = -n._tzm)
        }
        null == e && (n._isValid = !1)
    }

    function Y(t) {
        var e, n, s = [];
        if (!t._d) {
            for (e = 0; 7 > e; e++)t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
            s[3] += t._tzh || 0, s[4] += t._tzm || 0, n = new Date(0), t._useUTC ? (n.setUTCFullYear(s[0], s[1], s[2]), n.setUTCHours(s[3], s[4], s[5], s[6])) : (n.setFullYear(s[0], s[1], s[2]), n.setHours(s[3], s[4], s[5], s[6])), t._d = n
        }
    }

    function w(t) {
        var e, n, s = t._f.match(Z), r = t._i;
        for (t._a = [], e = 0; s.length > e; e++)n = (g(s[e]).exec(r) || [])[0], n && (r = r.slice(r.indexOf(n) + n.length)), oe[s[e]] && D(s[e], n, t);
        t._isPm && 12 > t._a[3] && (t._a[3] += 12), t._isPm === !1 && 12 === t._a[3] && (t._a[3] = 0), Y(t)
    }

    function p(t) {
        var e, n, s, i, o, u = 99;
        for (i = t._f.length; i > 0; i--) {
            if (e = a({}, t), e._f = t._f[i - 1], w(e), n = new r(e), n.isValid()) {
                s = n;
                break
            }
            o = c(e._a, n.toArray()), u > o && (u = o, s = n)
        }
        a(t, s)
    }

    function k(t) {
        var e, n = t._i;
        if (B.exec(n)) {
            for (t._f = "YYYY-MM-DDT", e = 0; 4 > e; e++)if (Q[e][1].exec(n)) {
                t._f += Q[e][0];
                break
            }
            R.exec(n) && (t._f += " Z"), w(t)
        } else t._d = new Date(n)
    }

    function v(e) {
        var n = e._i, s = A.exec(n);
        n === t ? e._d = new Date : s ? e._d = new Date(+s[1]) : "string" == typeof n ? k(e) : h(n) ? (e._a = n.slice(0), Y(e)) : e._d = n instanceof Date ? new Date(+n) : new Date(n)
    }

    function T(t, e, n, s, r) {
        return r.relativeTime(e || 1, !!n, t, s)
    }

    function S(t, e, n) {
        var s = P(Math.abs(t) / 1e3), r = P(s / 60), i = P(r / 60), a = P(i / 24), o = P(a / 365), u = 45 > s && ["s", s] || 1 === r && ["m"] || 45 > r && ["mm", r] || 1 === i && ["h"] || 22 > i && ["hh", i] || 1 === a && ["d"] || 25 >= a && ["dd", a] || 45 >= a && ["M"] || 345 > a && ["MM", P(a / 30)] || 1 === o && ["y"] || ["yy", o];
        return u[2] = e, u[3] = t > 0, u[4] = n, T.apply({}, u)
    }

    function b(t, e, n) {
        var s, r = n - e, i = n - t.day();
        return i > r && (i -= 7), r - 7 > i && (i += 7), s = C(t).add("d", i), {week: Math.ceil(s.dayOfYear() / 7), year: s.year()}
    }

    function F(t) {
        var e = t._i, n = t._f;
        return null === e || "" === e ? null : ("string" == typeof e && (t._i = e = _().preparse(e)), C.isMoment(e) ? (t = a({}, e), t._d = new Date(+e._d)) : n ? h(n) ? p(t) : w(t) : v(t), new r(t))
    }

    function L(t, e) {
        C.fn[t] = C.fn[t + "s"] = function (t) {
            var n = this._isUTC ? "UTC" : "";
            return null != t ? (this._d["set" + n + e](t), this) : this._d["get" + n + e]()
        }
    }

    function H(t) {
        C.duration.fn[t] = function () {
            return this._data[t]
        }
    }

    function O(t, e) {
        C.duration.fn["as" + t] = function () {
            return+this / e
        }
    }

    for (var C, z, W = "2.0.0", P = Math.round, U = {}, x = "undefined" != typeof module && module.exports, A = /^\/?Date\((\-?\d+)/i, G = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, Z = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, E = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, J = /\d\d?/, V = /\d{1,3}/, N = /\d{3}/, I = /\d{1,4}/, X = /[+\-]?\d{1,6}/, $ = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, R = /Z|[\+\-]\d\d:?\d\d/i, j = /T/i, q = /[\+\-]?\d+(\.\d{1,3})?/, B = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, K = "YYYY-MM-DDTHH:mm:ssZ", Q = [
        ["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
        ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
        ["HH:mm", /(T| )\d\d:\d\d/],
        ["HH", /(T| )\d\d/]
    ], te = /([\+\-]|\d\d)/gi, ee = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), ne = {Milliseconds: 1, Seconds: 1e3, Minutes: 6e4, Hours: 36e5, Days: 864e5, Months: 2592e6, Years: 31536e6}, se = {ms: "millisecond", s: "second", m: "minute", h: "hour", d: "day", w: "week", M: "month", y: "year"}, re = {}, ie = "DDD w W M D d".split(" "), ae = "M D H h m s w W".split(" "), oe = {M: function () {
        return this.month() + 1
    }, MMM: function (t) {
        return this.lang().monthsShort(this, t)
    }, MMMM: function (t) {
        return this.lang().months(this, t)
    }, D: function () {
        return this.date()
    }, DDD: function () {
        return this.dayOfYear()
    }, d: function () {
        return this.day()
    }, dd: function (t) {
        return this.lang().weekdaysMin(this, t)
    }, ddd: function (t) {
        return this.lang().weekdaysShort(this, t)
    }, dddd: function (t) {
        return this.lang().weekdays(this, t)
    }, w: function () {
        return this.week()
    }, W: function () {
        return this.isoWeek()
    }, YY: function () {
        return u(this.year() % 100, 2)
    }, YYYY: function () {
        return u(this.year(), 4)
    }, YYYYY: function () {
        return u(this.year(), 5)
    }, gg: function () {
        return u(this.weekYear() % 100, 2)
    }, gggg: function () {
        return this.weekYear()
    }, ggggg: function () {
        return u(this.weekYear(), 5)
    }, GG: function () {
        return u(this.isoWeekYear() % 100, 2)
    }, GGGG: function () {
        return this.isoWeekYear()
    }, GGGGG: function () {
        return u(this.isoWeekYear(), 5)
    }, e: function () {
        return this.weekday()
    }, E: function () {
        return this.isoWeekday()
    }, a: function () {
        return this.lang().meridiem(this.hours(), this.minutes(), !0)
    }, A: function () {
        return this.lang().meridiem(this.hours(), this.minutes(), !1)
    }, H: function () {
        return this.hours()
    }, h: function () {
        return this.hours() % 12 || 12
    }, m: function () {
        return this.minutes()
    }, s: function () {
        return this.seconds()
    }, S: function () {
        return~~(this.milliseconds() / 100)
    }, SS: function () {
        return u(~~(this.milliseconds() / 10), 2)
    }, SSS: function () {
        return u(this.milliseconds(), 3)
    }, Z: function () {
        var t = -this.zone(), e = "+";
        return 0 > t && (t = -t, e = "-"), e + u(~~(t / 60), 2) + ":" + u(~~t % 60, 2)
    }, ZZ: function () {
        var t = -this.zone(), e = "+";
        return 0 > t && (t = -t, e = "-"), e + u(~~(10 * t / 6), 4)
    }, X: function () {
        return this.unix()
    }}; ie.length;)z = ie.pop(), oe[z + "o"] = n(oe[z], z);
    for (; ae.length;)z = ae.pop(), oe[z + z] = e(oe[z], 2);
    for (oe.DDDD = e(oe.DDD, 3), s.prototype = {set: function (t) {
        var e, n;
        for (n in t)e = t[n], "function" == typeof e ? this[n] = e : this["_" + n] = e
    }, _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), months: function (t) {
        return this._months[t.month()]
    }, _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), monthsShort: function (t) {
        return this._monthsShort[t.month()]
    }, monthsParse: function (t) {
        var e, n, s;
        for (this._monthsParse || (this._monthsParse = []), e = 0; 12 > e; e++)if (this._monthsParse[e] || (n = C([2e3, e]), s = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[e] = RegExp(s.replace(".", ""), "i")), this._monthsParse[e].test(t))return e
    }, _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdays: function (t) {
        return this._weekdays[t.day()]
    }, _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysShort: function (t) {
        return this._weekdaysShort[t.day()]
    }, _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), weekdaysMin: function (t) {
        return this._weekdaysMin[t.day()]
    }, weekdaysParse: function (t) {
        var e, n, s;
        for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; 7 > e; e++)if (this._weekdaysParse[e] || (n = C([2e3, 1]).day(e), s = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[e] = RegExp(s.replace(".", ""), "i")), this._weekdaysParse[e].test(t))return e
    }, _longDateFormat: {LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D YYYY", LLL: "MMMM D YYYY LT", LLLL: "dddd, MMMM D YYYY LT"}, longDateFormat: function (t) {
        var e = this._longDateFormat[t];
        return!e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (t) {
            return t.slice(1)
        }), this._longDateFormat[t] = e), e
    }, meridiem: function (t, e, n) {
        return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    }, _calendar: {sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L"}, calendar: function (t, e) {
        var n = this._calendar[t];
        return"function" == typeof n ? n.apply(e) : n
    }, _relativeTime: {future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years"}, relativeTime: function (t, e, n, s) {
        var r = this._relativeTime[n];
        return"function" == typeof r ? r(t, e, n, s) : r.replace(/%d/i, t)
    }, pastFuture: function (t, e) {
        var n = this._relativeTime[t > 0 ? "future" : "past"];
        return"function" == typeof n ? n(e) : n.replace(/%s/i, e)
    }, ordinal: function (t) {
        return this._ordinal.replace("%d", t)
    }, _ordinal: "%d", preparse: function (t) {
        return t
    }, postformat: function (t) {
        return t
    }, week: function (t) {
        return b(t, this._week.dow, this._week.doy).week
    }, _week: {dow: 0, doy: 6}}, C = function (t, e, n) {
        return F({_i: t, _f: e, _l: n, _isUTC: !1})
    }, C.utc = function (t, e, n) {
        return F({_useUTC: !0, _isUTC: !0, _l: n, _i: t, _f: e})
    }, C.unix = function (t) {
        return C(1e3 * t)
    }, C.duration = function (t, e) {
        var n, s, r = C.isDuration(t), a = "number" == typeof t, o = r ? t._data : a ? {} : t, u = G.exec(t);
        return a ? e ? o[e] = t : o.milliseconds = t : u && (n = "-" === u[1] ? -1 : 1, o = {y: 0, d: ~~u[2] * n, h: ~~u[3] * n, m: ~~u[4] * n, s: ~~u[5] * n, ms: ~~u[6] * n}), s = new i(o), r && t.hasOwnProperty("_lang") && (s._lang = t._lang), s
    }, C.version = W, C.defaultFormat = K, C.lang = function (e, n) {
        return e ? (n ? l(e, n) : U[e] || _(e), C.duration.fn._lang = C.fn._lang = _(e), t) : C.fn._lang._abbr
    }, C.langData = function (t) {
        return t && t._lang && t._lang._abbr && (t = t._lang._abbr), _(t)
    }, C.isMoment = function (t) {
        return t instanceof r
    }, C.isDuration = function (t) {
        return t instanceof i
    }, C.fn = r.prototype = {clone: function () {
        return C(this)
    }, valueOf: function () {
        return+this._d
    }, unix: function () {
        return Math.floor(+this._d / 1e3)
    }, toString: function () {
        return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, toDate: function () {
        return this._d
    }, toJSON: function () {
        return M(C(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }, toArray: function () {
        var t = this;
        return[t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
    }, isValid: function () {
        return null == this._isValid && (this._isValid = this._a ? !c(this._a, (this._isUTC ? C.utc(this._a) : C(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
    }, utc: function () {
        return this._isUTC = !0, this
    }, local: function () {
        return this._isUTC = !1, this
    }, format: function (t) {
        var e = M(this, t || C.defaultFormat);
        return this.lang().postformat(e)
    }, add: function (t, e) {
        var n;
        return n = "string" == typeof t ? C.duration(+e, t) : C.duration(t, e), d(this, n, 1), this
    }, subtract: function (t, e) {
        var n;
        return n = "string" == typeof t ? C.duration(+e, t) : C.duration(t, e), d(this, n, -1), this
    }, diff: function (t, e, n) {
        var s, r, i = this._isUTC ? C(t).utc() : C(t).local(), a = 6e4 * (this.zone() - i.zone());
        return e = f(e), "year" === e || "month" === e ? (s = 432e5 * (this.daysInMonth() + i.daysInMonth()), r = 12 * (this.year() - i.year()) + (this.month() - i.month()), r += (this - C(this).startOf("month") - (i - C(i).startOf("month"))) / s, "year" === e && (r /= 12)) : (s = this - i - a, r = "second" === e ? s / 1e3 : "minute" === e ? s / 6e4 : "hour" === e ? s / 36e5 : "day" === e ? s / 864e5 : "week" === e ? s / 6048e5 : s), n ? r : o(r)
    }, from: function (t, e) {
        return C.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e)
    }, fromNow: function (t) {
        return this.from(C(), t)
    }, calendar: function () {
        var t = this.diff(C().startOf("day"), "days", !0), e = -6 > t ? "sameElse" : -1 > t ? "lastWeek" : 0 > t ? "lastDay" : 1 > t ? "sameDay" : 2 > t ? "nextDay" : 7 > t ? "nextWeek" : "sameElse";
        return this.format(this.lang().calendar(e, this))
    }, isLeapYear: function () {
        var t = this.year();
        return 0 === t % 4 && 0 !== t % 100 || 0 === t % 400
    }, isDST: function () {
        return this.zone() < C([this.year()]).zone() || this.zone() < C([this.year(), 5]).zone()
    }, day: function (t) {
        var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != t ? "string" == typeof t && (t = this.lang().weekdaysParse(t), "number" != typeof t) ? this : this.add({d: t - e}) : e
    }, month: function (t) {
        var e = this._isUTC ? "UTC" : "";
        return null != t ? "string" == typeof t && (t = this.lang().monthsParse(t), "number" != typeof t) ? this : (this._d["set" + e + "Month"](t), this) : this._d["get" + e + "Month"]()
    }, startOf: function (t) {
        switch (t = f(t)) {
            case"year":
                this.month(0);
            case"month":
                this.date(1);
            case"week":
            case"day":
                this.hours(0);
            case"hour":
                this.minutes(0);
            case"minute":
                this.seconds(0);
            case"second":
                this.milliseconds(0)
        }
        return"week" === t && this.day(0), this
    }, endOf: function (t) {
        return this.startOf(t).add(t, 1).subtract("ms", 1)
    }, isAfter: function (e, n) {
        return n = n !== t ? n : "millisecond", +this.clone().startOf(n) > +C(e).startOf(n)
    }, isBefore: function (e, n) {
        return n = n !== t ? n : "millisecond", +this.clone().startOf(n) < +C(e).startOf(n)
    }, isSame: function (e, n) {
        return n = n !== t ? n : "millisecond", +this.clone().startOf(n) === +C(e).startOf(n)
    }, zone: function () {
        return this._isUTC ? 0 : this._d.getTimezoneOffset()
    }, daysInMonth: function () {
        return C.utc([this.year(), this.month() + 1, 0]).date()
    }, dayOfYear: function (t) {
        var e = P((C(this).startOf("day") - C(this).startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add("d", t - e)
    }, weekYear: function (t) {
        var e = b(this, this.lang()._week.dow, this.lang()._week.doy).year;
        return null == t ? e : this.add("y", t - e)
    }, isoWeekYear: function (t) {
        var e = b(this, 1, 4).year;
        return null == t ? e : this.add("y", t - e)
    }, week: function (t) {
        var e = this.lang().week(this);
        return null == t ? e : this.add("d", 7 * (t - e))
    }, isoWeek: function (t) {
        var e = b(this, 1, 4).week;
        return null == t ? e : this.add("d", 7 * (t - e))
    }, weekday: function (t) {
        var e = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
        return null == t ? e : this.add("d", t - e)
    }, isoWeekday: function (t) {
        var e = (this._d.getDay() + 6) % 7;
        return null == t ? e : this.add("d", t - e)
    }, lang: function (e) {
        return e === t ? this._lang : (this._lang = _(e), this)
    }}, z = 0; ee.length > z; z++)L(ee[z].toLowerCase().replace(/s$/, ""), ee[z]);
    L("year", "FullYear"), C.fn.days = C.fn.day, C.fn.months = C.fn.month, C.fn.weeks = C.fn.week, C.fn.isoWeeks = C.fn.isoWeek, C.duration.fn = i.prototype = {weeks: function () {
        return o(this.days() / 7)
    }, valueOf: function () {
        return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
    }, humanize: function (t) {
        var e = +this, n = S(e, !t, this.lang());
        return t && (n = this.lang().pastFuture(e, n)), this.lang().postformat(n)
    }, get: function (t) {
        return t = f(t), this[t.toLowerCase() + "s"]()
    }, as: function (t) {
        return t = f(t), this["as" + t.charAt(0).toUpperCase() + t.slice(1) + "s"]()
    }, lang: C.fn.lang};
    for (z in ne)ne.hasOwnProperty(z) && (O(z, ne[z]), H(z.toLowerCase()));
    O("Weeks", 6048e5), C.duration.fn.asMonths = function () {
        return(+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, C.lang("en", {ordinal: function (t) {
        var e = t % 10, n = 1 === ~~(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
        return t + n
    }}), x && (module.exports = C), "undefined" == typeof ender && (this.moment = C), "function" == typeof define && define("commons/moment/2.0.0/moment", [], function () {
        return C
    })
}).call(this);
define("commons/firebugx", [], function () {
    function f(a) {
        for (var a = _.values(a), b = "", c = 0, d = a.length; d > c; c++)b += _.isString(a[c]) ? a[c] : a[c];
        return b
    }

    if ("undefined" == typeof console || "undefined" == typeof console.log) {
        var d = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
        window.console = {};
        for (var e = 0; e < d.length; ++e)window.console[d[e]] = function () {
        }
    }
    window.log = {}, log.log = log.debug = function () {
        "function" == typeof console.log.apply ? console.log.apply(console, arguments) : console.log(f(arguments))
    }, log.info = function () {
        "function" == typeof console.info.apply ? console.info.apply(console, arguments) : console.info(f(arguments))
    }, log.warn = function () {
        "function" == typeof console.warn.apply ? console.warn.apply(console, arguments) : console.warn(f(arguments))
    }, log.error = function () {
        "function" == typeof console.error.apply ? console.error.apply(console, arguments) : console.error(f(arguments))
    }
});
define("commons/webhelper",[],function(e,t,n){var r=/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;n.exports={getCookie:function(e){var t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]*)(;|$)"));if(t!=null)return unescape(t[2]);return null},getLocale:function(){var e=this.getCookie("lang");e=e||this.getUrlEncodedKey("locale");e=e?e:(navigator.language||navigator.browserLanguage||navigator.systemLanguage||navigator.userLanguage).replace(/-/g,"_");var t=e.indexOf("_");if(t!=-1){var n,r;n=e.substring(0,t);r=e.substring(t,e.length).toUpperCase();e=n+r}return e},getLang:function(){var e="zh_CN",t=this.getLocale();if(t){t=t.toLowerCase();_.include(t,"cn")&&(e="zh_CN");_.include(t,"en")&&(e="en_US");_.include(t,"tw")&&(e="zh_TW");_.include(t,"hk")&&(e="zh_TW")}return e},loadExternalFiles:function(e){var t=[];var n;for(n in e.fileUrls){t.push(e.prefix+e.fileUrls[n]+"?t="+e.version+e.suffix)}document.write(t.join(""))},escapeRegExp:function(e){if(e)return e.replace(/[.*+?^${}()|[\]\/\\]/g,"\\$0");return null},trimEnd:function(e,t){if(e&&t)return e.replace(new RegExp(this.escapeRegExp(t)+"*$"),"");return e.replace(/\s+$/,"")},trimStart:function(e,t){if(e&&t)return e.replace(new RegExp("^"+this.escapeRegExp(t)+"*"),"");return e.replace(/^\s+/,"")},setUrlEncodedKey:function(e,t,n){n=n||window.location.search;var r=n+"&";var i=new RegExp("[?|&]"+e+"=.*?&");if(!i.test(r))r+=e+"="+encodeURI(t);else r=r.replace(i,"&"+e+"="+encodeURIComponent(t)+"&");r=this.trimEnd(this.trimStart(r,"&"),"&");return r.charAt(0)=="?"?r:r="?"+r},getUrlEncodedKey:function(e,t){if(!t)t=window.location.search;var n=new RegExp("[?|&]"+e+"=(.*?)&");var r=n.exec(t+"&");if(!r||r.length<2)return null;return decodeURIComponent(r[1].replace("+"," "))},isSupportBrowser:function(){var e=navigator.userAgent.toLowerCase();if(function(){return e.indexOf("msie 9")!=-1}())return true;if(function(){return e.indexOf("msie 8")!=-1}())return true;if(function(){return e.indexOf("msie 6")!=-1||e.indexOf("msie 7")!=-1}()){return false}return true},getBrowserAndVersions:function(){var e={};var t=navigator.userAgent.toLowerCase();var n;(n=t.match(/msie ([\d.]+)/))?e.ie=n[1]:(n=t.match(/firefox\/([\d.]+)/))?e.firefox=n[1]:(n=t.match(/chrome\/([\d.]+)/))?e.chrome=n[1]:(n=t.match(/opera.([\d.]+)/))?e.opera=n[1]:(n=t.match(/version\/([\d.]+).*safari/))?e.safari=n[1]:0;if(e.ie){return"IE"+e.ie}if(e.firefox){return"firefox"+e.firefox}if(e.chrome){return"chrome"+e.chrome}if(e.opera){return"opera"+e.opera}if(e.safari){return"safari"+e.safari}},isCompatiableMode:function(){var e=navigator.userAgent.toLowerCase();if(e.indexOf("msie")!==-2){var t=/msie\s*(\d)/i;e.match(t);var n=RegExp.$1;var r=document.documentMode;if(n!=r&&(n>=8||r>=8)&&!(n>=8&&r>=8)){return true}if(n==7&&e.indexOf("trident/5.0")!=-1){return true}}return false},isIE:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("msie")!=-1||e.indexOf("trident")!=-1},isIE9:function(){var e=navigator.userAgent.toLowerCase();var t=/msie\s*(\d)/i;e.match(t);var n=RegExp.$1;return e.indexOf("msie")!=-1&&n==9},isIE8:function(){var e=navigator.userAgent.toLowerCase();var t=/msie\s*(\d+)/i;e.match(t);var n=RegExp.$1;return e.indexOf("msie")!=-1&&n==8},isLessIE8:function(){var e=navigator.userAgent.toLowerCase();var t=/msie\s*(\d+)/i;e.match(t);var n=RegExp.$1;return e.indexOf("msie")!=-1&&n<8},getIEVersion:function(){var e=navigator.userAgent.toLowerCase();var t=/msie\s*(\d+)/i;e.match(t);var n=RegExp.$1;return e.indexOf("msie")!=-1&&n},isMobile:function(){return this.isIPhone()||this.isAndroidPhone()||this.isIPad()||this.isAndroidPad()},isIPad:function(){var e=navigator.platform.toLowerCase();if(e.indexOf("ipad")!=-1){return true}return false},isIPhone:function(){var e=navigator.platform.toLowerCase();if(e.indexOf("iphone")!=-1||e.indexOf("ipod")!=-1){return true}return false},isAndroidPhone:function(){var e=navigator.platform.toLowerCase();if(e.indexOf("android")!=-1||e.indexOf("linux armv7l")!=-1){return true}return false},isAndroidPad:function(){var e=navigator.platform.toLowerCase();if(e.indexOf("android")!=-1||e.indexOf("linux armv7l")!=-1){return true}return false},S4:function(){return((1+Math.random())*65536|0).toString(16).substring(1)},guid:function(){var e=this.S4;return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()},getAgent:function(){var e="web";if(this.isIPad()||this.isIPhone()){e="pad"}return e},getFileSuffix:function(e){if(!e||e.indexOf(".")===-1)return"";return e.substr(e.lastIndexOf(".")+1).toLowerCase()},getUrlPrefix:function(){return location.protocol+"//"+location.host},loadJs:function(e,t){var n=document.getElementById(e);var r=document.getElementsByTagName("head").item(0);if(n)r.removeChild(n);var i=document.createElement("script");i.src=t;i.type="text/javascript";i.id=e;r.appendChild(i)},loadCss:function(e,t){var n=document.getElementById(e);var r=document.getElementsByTagName("head").item(0);if(n)r.removeChild(n);var i=document.createElement("link");i.href=t;i.rel="stylesheet";i.type="text/css";i.id=e;r.appendChild(i)},loadJsByJq:function(e,t){var n=$("head").remove("#"+e);$("<scri"+"pt>"+"</scr"+"ipt>").attr({src:t,type:"text/javascript",id:e}).appendTo(n)},without:function(e,t){var n=-1;_.each(t,function(t){n=_.indexOf(e,t);n!==-1&&e.splice(n,1)})},becomeLink:function(e){if(r.test(e)){var t=e.indexOf("http");var n=t!==-1;var i=e.substring(t);var s=n?i:"http://"+i;return e.substring(0,t)+"<a href='"+s+"' target='_blank'>"+s+"</a>"}else{return e}},initOatosWeb:function(){var e=this.getLang();window.lang=e;$("body").addClass(e);seajs.isPrivate&&$("body").addClass("private");_.extend(window,{model:{},modelbinder:{},tpl:{},view:{},tplpre:{},cache:{},collection:{},setting:{}})}}})
// handlebars
//handlebars-runtime
define("commons/handlebars-runtime/1.0.0/handlebars", [], function (a, b, c) {
    var d = {};
    d.VERSION = "1.0.0", d.COMPILER_REVISION = 4, d.REVISION_CHANGES = {1: "<= 1.0.rc.2", 2: "== 1.0.0-rc.3", 3: "== 1.0.0-rc.4", 4: ">= 1.0.0"}, d.helpers = {}, d.partials = {};
    var e = Object.prototype.toString, f = "[object Function]", g = "[object Object]";
    d.registerHelper = function (a, b, c) {
        if (e.call(a) === g) {
            if (c || b)throw new d.Exception("Arg not supported with multiple helpers");
            d.Utils.extend(this.helpers, a)
        } else c && (b.not = c), this.helpers[a] = b
    }, d.registerPartial = function (a, b) {
        e.call(a) === g ? d.Utils.extend(this.partials, a) : this.partials[a] = b
    }, d.registerHelper("helperMissing", function (a) {
        if (2 === arguments.length)return void 0;
        throw new Error("Missing helper: '" + a + "'")
    }), d.registerHelper("blockHelperMissing", function (a, b) {
        var c = b.inverse || function () {
        }, g = b.fn, h = e.call(a);
        return h === f && (a = a.call(this)), a === !0 ? g(this) : a === !1 || null == a ? c(this) : "[object Array]" === h ? a.length > 0 ? d.helpers.each(a, b) : c(this) : g(a)
    }), d.K = function () {
    }, d.createFrame = Object.create || function (a) {
        d.K.prototype = a;
        var b = new d.K;
        return d.K.prototype = null, b
    }, d.logger = {DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3, methodMap: {0: "debug", 1: "info", 2: "warn", 3: "error"}, log: function (a, b) {
        if (d.logger.level <= a) {
            var c = d.logger.methodMap[a];
            "undefined" != typeof console && console[c] && console[c].call(console, b)
        }
    }}, d.log = function (a, b) {
        d.logger.log(a, b)
    }, d.registerHelper("each", function (a, b) {
        var j, c = b.fn, g = b.inverse, h = 0, i = "", k = e.call(a);
        if (k === f && (a = a.call(this)), b.data && (j = d.createFrame(b.data)), a && "object" == typeof a)if (a instanceof Array)for (var l = a.length; l > h; h++)j && (j.index = h), i += c(a[h], {data: j}); else for (var m in a)a.hasOwnProperty(m) && (j && (j.key = m), i += c(a[m], {data: j}), h++);
        return 0 === h && (i = g(this)), i
    }), d.registerHelper("if", function (a, b) {
        var c = e.call(a);
        return c === f && (a = a.call(this)), !a || d.Utils.isEmpty(a) ? b.inverse(this) : b.fn(this)
    }), d.registerHelper("unless", function (a, b) {
        return d.helpers["if"].call(this, a, {fn: b.inverse, inverse: b.fn})
    }), d.registerHelper("with", function (a, b) {
        var c = e.call(a);
        return c === f && (a = a.call(this)), d.Utils.isEmpty(a) ? void 0 : b.fn(a)
    }), d.registerHelper("log", function (a, b) {
        var c = b.data && null != b.data.level ? parseInt(b.data.level, 10) : 1;
        d.log(c, a)
    });
    var h = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
    d.Exception = function () {
        for (var b = Error.prototype.constructor.apply(this, arguments), c = 0; c < h.length; c++)this[h[c]] = b[h[c]]
    }, d.Exception.prototype = new Error, d.SafeString = function (a) {
        this.string = a
    }, d.SafeString.prototype.toString = function () {
        return this.string.toString()
    };
    var i = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, j = /[&<>"'`]/g, k = /[&<>"'`]/, l = function (a) {
        return i[a] || "&amp;"
    };
    d.Utils = {extend: function (a, b) {
        for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c])
    }, escapeExpression: function (a) {
        return a instanceof d.SafeString ? a.toString() : null == a || a === !1 ? "" : (a = a.toString(), k.test(a) ? a.replace(j, l) : a)
    }, isEmpty: function (a) {
        return a || 0 === a ? "[object Array]" === e.call(a) && 0 === a.length ? !0 : !1 : !0
    }}, d.VM = {template: function (a) {
        var b = {escapeExpression: d.Utils.escapeExpression, invokePartial: d.VM.invokePartial, programs: [], program: function (a, b, c) {
            var e = this.programs[a];
            return c ? e = d.VM.program(a, b, c) : e || (e = this.programs[a] = d.VM.program(a, b)), e
        }, merge: function (a, b) {
            var c = a || b;
            return a && b && (c = {}, d.Utils.extend(c, b), d.Utils.extend(c, a)), c
        }, programWithDepth: d.VM.programWithDepth, noop: d.VM.noop, compilerInfo: null};
        return function (c, e) {
            e = e || {};
            var f = a.call(b, d, c, e.helpers, e.partials, e.data), g = b.compilerInfo || [], h = g[0] || 1, i = d.COMPILER_REVISION;
            if (h !== i) {
                if (i > h) {
                    var j = d.REVISION_CHANGES[i], k = d.REVISION_CHANGES[h];
                    throw"Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + j + ") or downgrade your runtime to an older version (" + k + ")."
                }
                throw"Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + g[1] + ")."
            }
            return f
        }
    }, programWithDepth: function (a, b, c) {
        var d = Array.prototype.slice.call(arguments, 3), e = function (a, e) {
            return e = e || {}, b.apply(this, [a, e.data || c].concat(d))
        };
        return e.program = a, e.depth = d.length, e
    }, program: function (a, b, c) {
        var d = function (a, d) {
            return d = d || {}, b(a, d.data || c)
        };
        return d.program = a, d.depth = 0, d
    }, noop: function () {
        return""
    }, invokePartial: function (a, b, c, e, f, g) {
        var h = {helpers: e, partials: f, data: g};
        if (void 0 === a)throw new d.Exception("The partial " + b + " could not be found");
        if (a instanceof Function)return a(c, h);
        if (d.compile)return f[b] = d.compile(a, {data: void 0 !== g}), f[b](c, h);
        throw new d.Exception("The partial " + b + " could not be compiled when running in runtime-only mode")
    }}, d.template = d.VM.template, "object" == typeof c && c.exports ? c.exports = d : "function" == typeof define && define.amd ? define(function () {
        return d
    }) : this.Handlebars = d, b.Handlebars = d
});
// spin.js
!function (a, b) {
    "object" == typeof exports ? module.exports = b() : "function" == typeof define ? define("commons/spin", [], b) : a.Spinner = b()
}(this, function () {
    "use strict";
    function a(a, b) {
        var c, d = document.createElement(a || "div");
        for (c in b)d[c] = b[c];
        return d
    }

    function b(a) {
        for (var b = 1, c = arguments.length; c > b; b++)a.appendChild(arguments[b]);
        return a
    }

    function c(a, b, c, d) {
        var e = ["opacity", b, ~~(100 * a), c, d].join("-"), f = .01 + c / d * 100, g = Math.max(1 - (1 - a) / b * (100 - f), a), h = j.substring(0, j.indexOf("Animation")).toLowerCase(), i = h && "-" + h + "-" || "";
        return l[e] || (m.insertRule("@" + i + "keyframes " + e + "{0%{opacity:" + g + "}" + f + "%{opacity:" + a + "}" + (f + .01) + "%{opacity:1}" + (f + b) % 100 + "%{opacity:" + a + "}100%{opacity:" + g + "}}", m.cssRules.length), l[e] = 1), e
    }

    function d(a, b) {
        var c, d, e = a.style;
        for (b = b.charAt(0).toUpperCase() + b.slice(1), d = 0; d < k.length; d++)if (c = k[d] + b, void 0 !== e[c])return c;
        return void 0 !== e[b] ? b : void 0
    }

    function e(a, b) {
        for (var c in b)a.style[d(a, c) || c] = b[c];
        return a
    }

    function f(a) {
        for (var b = 1; b < arguments.length; b++) {
            var c = arguments[b];
            for (var d in c)void 0 === a[d] && (a[d] = c[d])
        }
        return a
    }

    function g(a, b) {
        return"string" == typeof a ? a : a[b % a.length]
    }

    function h(a) {
        this.opts = f(a || {}, h.defaults, n)
    }

    function i() {
        function c(b, c) {
            return a("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', c)
        }

        m.addRule(".spin-vml", "behavior:url(#default#VML)"), h.prototype.lines = function (a, d) {
            function f() {
                return e(c("group", {coordsize: k + " " + k, coordorigin: -j + " " + -j}), {width: k, height: k})
            }

            function h(a, h, i) {
                b(m, b(e(f(), {rotation: 360 / d.lines * a + "deg", left: ~~h}), b(e(c("roundrect", {arcsize: d.corners}), {width: j, height: d.width, left: d.radius, top: -d.width >> 1, filter: i}), c("fill", {color: g(d.color, a), opacity: d.opacity}), c("stroke", {opacity: 0}))))
            }

            var i, j = d.length + d.width, k = 2 * j, l = 2 * -(d.width + d.length) + "px", m = e(f(), {position: "absolute", top: l, left: l});
            if (d.shadow)for (i = 1; i <= d.lines; i++)h(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (i = 1; i <= d.lines; i++)h(i);
            return b(a, m)
        }, h.prototype.opacity = function (a, b, c, d) {
            var e = a.firstChild;
            d = d.shadow && d.lines || 0, e && b + d < e.childNodes.length && (e = e.childNodes[b + d], e = e && e.firstChild, e = e && e.firstChild, e && (e.opacity = c))
        }
    }

    var j, k = ["webkit", "Moz", "ms", "O"], l = {}, m = function () {
            var c = a("style", {type: "text/css"});
            return b(document.getElementsByTagName("head")[0], c), c.sheet || c.styleSheet
        }(),
        n = {lines: 15, length: 16, width: 8, radius: 24, rotate: 0, corners: 1, color: "#000", direction: 1, speed: 1.2, trail: 100, opacity: .25, fps: 20, zIndex: 2e9, className: "spinner", top: "50%", left: "50%", position: "absolute"};
    h.defaults = {}, f(h.prototype, {spin: function (b) {
        this.stop();
        {
            var c = this, d = c.opts, f = c.el = e(a(0, {className: d.className}), {position: d.position, width: 0, zIndex: d.zIndex});
            d.radius + d.length + d.width
        }
        if (e(f, {left: d.left, top: d.top}), b && b.insertBefore(f, b.firstChild || null), f.setAttribute("role", "progressbar"), c.lines(f, c.opts), !j) {
            var g, h = 0, i = (d.lines - 1) * (1 - d.direction) / 2, k = d.fps, l = k / d.speed, m = (1 - d.opacity) / (l * d.trail / 100), n = l / d.lines;
            !function o() {
                h++;
                for (var a = 0; a < d.lines; a++)g = Math.max(1 - (h + (d.lines - a) * n) % l * m, d.opacity), c.opacity(f, a * d.direction + i, g, d);
                c.timeout = c.el && setTimeout(o, ~~(1e3 / k))
            }()
        }
        return c
    }, stop: function () {
        var a = this.el;
        return a && (clearTimeout(this.timeout), a.parentNode && a.parentNode.removeChild(a), this.el = void 0), this
    }, lines: function (d, f) {
        function h(b, c) {
            return e(a(), {position: "absolute", width: f.length + f.width + "px", height: f.width + "px", background: b, boxShadow: c, transformOrigin: "left", transform: "rotate(" + ~~(360 / f.lines * k + f.rotate) + "deg) translate(" + f.radius + "px,0)", borderRadius: (f.corners * f.width >> 1) + "px"})
        }

        for (var i, k = 0, l = (f.lines - 1) * (1 - f.direction) / 2; k < f.lines; k++)i = e(a(), {position: "absolute", top: 1 + ~(f.width / 2) + "px", transform: f.hwaccel ? "translate3d(0,0,0)" : "", opacity: f.opacity, animation: j && c(f.opacity, f.trail, l + k * f.direction, f.lines) + " " + 1 / f.speed + "s linear infinite"}), f.shadow && b(i, e(h("#000", "0 0 4px #000"), {top: "2px"})), b(d, b(i, h(g(f.color, k), "0 0 1px rgba(0,0,0,.1)")));
        return d
    }, opacity: function (a, b, c) {
        b < a.childNodes.length && (a.childNodes[b].style.opacity = c)
    }});
    var o = e(a("group"), {behavior: "url(#default#VML)"});
    return!d(o, "transform") && o.adj ? i() : j = d(o, "animation"), h
});
define("commons/crypto-sha256",function(require, exports, module) {
    /*
     * Crypto-JS v2.5.2
     * http://code.google.com/p/crypto-js/
     * (c) 2009-2011 by Jeff Mott. All rights reserved.
     * http://code.google.com/p/crypto-js/wiki/License
     */
    (typeof Crypto=="undefined"||!Crypto.util)&&function(){var f=window.Crypto={},l=f.util={rotl:function(b,a){return b<<a|b>>>32-a},rotr:function(b,a){return b<<32-a|b>>>a},endian:function(b){if(b.constructor==Number)return l.rotl(b,8)&16711935|l.rotl(b,24)&4278255360;for(var a=0;a<b.length;a++)b[a]=l.endian(b[a]);return b},randomBytes:function(b){for(var a=[];b>0;b--)a.push(Math.floor(Math.random()*256));return a},bytesToWords:function(b){for(var a=[],c=0,d=0;c<b.length;c++,d+=8)a[d>>>5]|=b[c]<<24-
        d%32;return a},wordsToBytes:function(b){for(var a=[],c=0;c<b.length*32;c+=8)a.push(b[c>>>5]>>>24-c%32&255);return a},bytesToHex:function(b){for(var a=[],c=0;c<b.length;c++)a.push((b[c]>>>4).toString(16)),a.push((b[c]&15).toString(16));return a.join("")},hexToBytes:function(b){for(var a=[],c=0;c<b.length;c+=2)a.push(parseInt(b.substr(c,2),16));return a},bytesToBase64:function(b){if(typeof btoa=="function")return btoa(g.bytesToString(b));for(var a=[],c=0;c<b.length;c+=3)for(var d=b[c]<<16|b[c+1]<<8|
        b[c+2],p=0;p<4;p++)c*8+p*6<=b.length*8?a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>>6*(3-p)&63)):a.push("=");return a.join("")},base64ToBytes:function(b){if(typeof atob=="function")return g.stringToBytes(atob(b));for(var b=b.replace(/[^A-Z0-9+\/]/ig,""),a=[],c=0,d=0;c<b.length;d=++c%4)d!=0&&a.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(c-1))&Math.pow(2,-2*d+8)-1)<<d*2|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(c))>>>
        6-d*2);return a}},f=f.charenc={};f.UTF8={stringToBytes:function(b){return g.stringToBytes(unescape(encodeURIComponent(b)))},bytesToString:function(b){return decodeURIComponent(escape(g.bytesToString(b)))}};var g=f.Binary={stringToBytes:function(b){for(var a=[],c=0;c<b.length;c++)a.push(b.charCodeAt(c)&255);return a},bytesToString:function(b){for(var a=[],c=0;c<b.length;c++)a.push(String.fromCharCode(b[c]));return a.join("")}}}();
    (function(){var f=Crypto,l=f.util,g=f.charenc,b=g.UTF8,a=g.Binary,c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,
        2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],d=f.SHA256=function(b,c){var e=l.wordsToBytes(d._sha256(b));return c&&c.asBytes?e:c&&c.asString?a.bytesToString(e):l.bytesToHex(e)};d._sha256=function(a){a.constructor==String&&(a=b.stringToBytes(a));var d=l.bytesToWords(a),e=a.length*8,a=[1779033703,3144134277,
        1013904242,2773480762,1359893119,2600822924,528734635,1541459225],f=[],g,m,q,i,n,o,r,s,h,k,j;d[e>>5]|=128<<24-e%32;d[(e+64>>9<<4)+15]=e;for(s=0;s<d.length;s+=16){e=a[0];g=a[1];m=a[2];q=a[3];i=a[4];n=a[5];o=a[6];r=a[7];for(h=0;h<64;h++){h<16?f[h]=d[h+s]:(k=f[h-15],j=f[h-2],f[h]=((k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3)+(f[h-7]>>>0)+((j<<15|j>>>17)^(j<<13|j>>>19)^j>>>10)+(f[h-16]>>>0));j=e&g^e&m^g&m;var t=(e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22);k=(r>>>0)+((i<<26|i>>>6)^(i<<21|i>>>11)^(i<<7|i>>>25))+
        (i&n^~i&o)+c[h]+(f[h]>>>0);j=t+j;r=o;o=n;n=i;i=q+k;q=m;m=g;g=e;e=k+j}a[0]+=e;a[1]+=g;a[2]+=m;a[3]+=q;a[4]+=i;a[5]+=n;a[6]+=o;a[7]+=r}return a};d._blocksize=16;d._digestsize=32})();
});
define("commons/security",["crypto-sha256"],function(a,b,c){"use strict";a("crypto-sha256"),function(){function f(a){var c,f,g=a.length;for(b=0;256>b;b++)e[b]=b>=128?b%128-128:b;for(b=0,d=0,c=0;256>b;b++)d=255&d+e[b]+a.charCodeAt(c),c=(c+1)%g,f=e[b],e[b]=e[d],e[d]=f;b=0,d=0}function g(a,c){f(a);for(var g,h="",i=c.length,j=0;i>j;j++)b=255&b+1,d=255&d+e[b],g=e[b],e[b]=e[d],e[d]=g,h+=String.fromCharCode(c.charCodeAt(j)^255&e[255&e[b]+e[d]]);return h}function h(){for(var a="1234567890abcdefghijklmnopqrstuvwxyz",b=32,c=[],d=0;b>d;d++)c[d]=a.charAt(~~Math.floor(36*Math.random()));return c.join("")}function i(a){var c,d,b="";for(c=0;c<a.length;c++)d=a.charCodeAt(c).toString(16),b+=1===d.length?"0"+d:d;return b}function j(a,b){var c=h(),d=b,e=Crypto.SHA256(a+d+c);return d=i(g(c,d)),{nonce:c,hashKey:e,password:d}}function k(a){var c,d,b="";for(c=0,d=a.length;d>c;c+=2)b+=String.fromCharCode(parseInt(a.substring(c,c+2),16));return b}var a={},b=0,d=0,e=[];a.codeDecode=g,a.randomCharString=h,a.byteStringToHexString=i,a.hexStringToByteString=k,a.getNonceDTO=j,c.exports=a}()});
/*math.js*/
!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.cmd?define("commons/math/math",r):"object"==typeof exports?exports.math=r():e.math=r()}(this,function(){return function(e){function r(t){if(n[t])return n[t].exports;var i=n[t]={exports:{},id:t,loaded:!1};return e[t].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}var n={};return r.m=e,r.c=n,r.p="",r(0)}([function(e,r,n){e.exports=n(1)},function(e,r,n){function t(e){function r(e){return t(e)}if("function"!=typeof Object.create)throw new Error("ES5 not supported by this JavaScript engine. Please load the es5-shim and es5-sham library for compatibility.");var o={matrix:"matrix",number:"number",precision:64,epsilon:1e-14};r.config=function(e){if(e){if(i.deepExtend(o,e),e.precision&&r.type.BigNumber.config({precision:e.precision}),e.number&&e.number.defaultType)throw new Error("setting `number.defaultType` is deprecated. Use `number` instead.");if(e.number&&e.number.precision)throw new Error("setting `number.precision` is deprecated. Use `precision` instead.");if(e.matrix&&e.matrix.defaultType)throw new Error("setting `matrix.defaultType` is deprecated. Use `matrix` instead.");if(e.matrix&&e.matrix["default"])throw new Error("setting `matrix.default` is deprecated. Use `matrix` instead.");if(e.decimals)throw new Error("setting `decimals` is deprecated. Use `precision` instead.")}return i.clone(o)};var a=n(123).constructor();if("function"!=typeof a.prototype.clone&&(a.prototype.clone=function(){return new a(this)}),"function"==typeof a.convert)throw new Error("Cannot add function convert to BigNumber: function already exists");return a.convert=function(e){return digits(e)>15?e:new a(e)},r.error=n(4),r.type={},r.type.Complex=n(5),r.type.Range=n(6),r.type.Index=n(7),r.type.Matrix=n(8),r.type.Unit=n(9),r.type.Help=n(10),r.type.BigNumber=a,r.collection=n(11),r.expression={},r.expression.node=n(14),r.expression.parse=n(12),r.expression.Parser=n(13),r.expression.docs=n(15),n(17)(r,o),n(18)(r,o),n(19)(r,o),n(20)(r,o),n(21)(r,o),n(22)(r,o),n(23)(r,o),n(24)(r,o),n(25)(r,o),n(26)(r,o),n(27)(r,o),n(28)(r,o),n(29)(r,o),n(30)(r,o),n(31)(r,o),n(32)(r,o),n(33)(r,o),n(34)(r,o),n(35)(r,o),n(36)(r,o),n(37)(r,o),n(38)(r,o),n(39)(r,o),n(40)(r,o),n(41)(r,o),n(42)(r,o),n(43)(r,o),n(44)(r,o),n(45)(r,o),n(46)(r,o),n(47)(r,o),n(48)(r,o),n(49)(r,o),n(50)(r,o),n(51)(r,o),n(52)(r,o),n(53)(r,o),n(54)(r,o),n(55)(r,o),n(56)(r,o),n(57)(r,o),n(58)(r,o),n(59)(r,o),n(60)(r,o),n(61)(r,o),n(62)(r,o),n(63)(r,o),n(64)(r,o),n(65)(r,o),n(66)(r,o),n(67)(r,o),n(68)(r,o),n(69)(r,o),n(70)(r,o),n(71)(r,o),n(72)(r,o),n(73)(r,o),n(74)(r,o),n(75)(r,o),n(76)(r,o),n(77)(r,o),n(78)(r,o),n(79)(r,o),n(80)(r,o),n(81)(r,o),n(82)(r,o),n(83)(r,o),n(84)(r,o),n(85)(r,o),n(86)(r,o),n(87)(r,o),n(88)(r,o),n(89)(r,o),n(90)(r,o),n(91)(r,o),n(92)(r,o),n(93)(r,o),n(94)(r,o),n(95)(r,o),n(96)(r,o),n(97)(r,o),n(98)(r,o),n(99)(r,o),n(100)(r,o),n(101)(r,o),n(102)(r,o),n(103)(r,o),n(104)(r,o),n(105)(r,o),n(106)(r,o),n(107)(r,o),n(108)(r,o),n(109)(r,o),n(110)(r,o),n(111)(r,o),n(112)(r,o),n(113)(r,o),n(114)(r,o),n(115)(r,o),n(116)(r,o),n(117)(r,o),n(118)(r,o),n(119)(r,o),n(120)(r,o),n(121)(r,o),r.ifElse=function(){throw new Error("Function ifElse is deprecated. Use the conditional operator instead.")},n(2)(r,o),r.chaining={},r.chaining.Selector=n(16)(r,o),r.config(o),r.config(e),r}var i=n(3),o=t();"undefined"!=typeof window&&(window.mathjs=o),e.exports=t()},function(e,r,n){e.exports=function(e){var r=n(5);e.version=n(122),e.pi=Math.PI,e.e=Math.E,e.tau=2*Math.PI,e.phi=1.618033988749895,e.i=new r(0,1),e.Infinity=1/0,e.NaN=0/0,e["true"]=!0,e["false"]=!1,e["null"]=null,e.E=Math.E,e.LN2=Math.LN2,e.LN10=Math.LN10,e.LOG2E=Math.LOG2E,e.LOG10E=Math.LOG10E,e.PI=Math.PI,e.SQRT1_2=Math.SQRT1_2,e.SQRT2=Math.SQRT2}},function(e,r){r.clone=function n(e){var r=typeof e;if("number"===r||"string"===r||"boolean"===r||null===e||void 0===e)return e;if("function"==typeof e.clone)return e.clone();if(_.isArray(e))return e.map(function(e){return n(e)});if(e instanceof Number)return new Number(e.valueOf());if(e instanceof String)return new String(e.valueOf());if(e instanceof Boolean)return new Boolean(e.valueOf());if(e instanceof Date)return new Date(e.valueOf());if(e instanceof RegExp)throw new TypeError("Cannot clone "+e);var t={};for(var i in e)e.hasOwnProperty(i)&&(t[i]=n(e[i]));return t},r.extend=function(e,r){for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n]);return e},r.deepExtend=function t(e,r){if(_.isArray(r))throw new TypeError("Arrays are not supported by deepExtend");for(var n in r)if(r.hasOwnProperty(n))if(r[n]&&r[n].constructor===Object)void 0===e[n]&&(e[n]={}),e[n].constructor===Object?t(e[n],r[n]):e[n]=r[n];else{if(_.isArray(r[n]))throw new TypeError("Arrays are not supported by deepExtend");e[n]=r[n]}return e},r.deepEqual=function(e,n){var t,i,o;if(_.isArray(e)){if(!_.isArray(n))return!1;if(e.length!=n.length)return!1;for(i=0,o=e.length;o>i;i++)if(!r.deepEqual(e[i],n[i]))return!1;return!0}if(e instanceof Object){if(_.isArray(n)||!(n instanceof Object))return!1;for(t in e)if(!r.deepEqual(e[t],n[t]))return!1;for(t in n)if(!r.deepEqual(e[t],n[t]))return!1;return!0}return typeof e==typeof n&&e==n}},function(e,r,n){r.ArgumentsError=n(124),r.DimensionError=n(125),r.IndexError=n(126),r.UnsupportedTypeError=n(127)},function(e,r,n){function t(e,r){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");switch(arguments.length){case 0:this.re=0,this.im=0;break;case 1:var n=arguments[0];if("object"==typeof n){if("re"in n&&"im"in n){var i=new t(n.re,n.im);this.re=i.re,this.im=i.im;break}if("r"in n&&"phi"in n){var i=t.fromPolar(n.r,n.phi);this.re=i.re,this.im=i.im;break}}throw new SyntaxError("Object with the re and im or r and phi properties expected.");case 2:if(!h(e)||!h(r))throw new TypeError("Two numbers expected in Complex constructor");this.re=e,this.im=r;break;default:throw new SyntaxError("One, two or three arguments expected in Complex constructor")}}function i(){for(;" "==y||"	"==y;)s()}function o(e){return e>="0"&&"9">=e||"."==e}function a(e){return e>="0"&&"9">=e}function s(){w++,y=x.charAt(w)}function u(e){w=e,y=x.charAt(w)}function f(){var e,r="";if(e=w,"+"==y?s():"-"==y&&(r+=y,s()),!o(y))return u(e),null;if("."==y){if(r+=y,s(),!a(y))return u(e),null}else{for(;a(y);)r+=y,s();"."==y&&(r+=y,s())}for(;a(y);)r+=y,s();if("E"==y||"e"==y){if(r+=y,s(),("+"==y||"-"==y)&&(r+=y,s()),!a(y))return u(e),null;for(;a(y);)r+=y,s()}return r}function c(){var e=x.charAt(w+1);if("I"==y||"i"==y)return s(),"1";if(!("+"!=y&&"-"!=y||"I"!=e&&"i"!=e)){var r="+"==y?"1":"-1";return s(),s(),r}return null}var l=n(128),p=n(9),m=l.number,h=l.number.isNumber,g=p.isUnit,d=l.string.isString;t.isComplex=function(e){return e instanceof t};var x,w,y;t.parse=function(e){if(x=e,w=-1,y="",!d(x))return null;s(),i();var r=f();if(r){if("I"==y||"i"==y)return s(),i(),y?null:new t(0,Number(r));i();var n=y;if("+"!=n&&"-"!=n)return i(),y?null:new t(Number(r),0);s(),i();var o=f();if(o){if("I"!=y&&"i"!=y)return null;s()}else if(o=c(),!o)return null;return"-"==n&&(o="-"==o[0]?"+"+o.substring(1):"-"+o),s(),i(),y?null:new t(Number(r),Number(o))}return(r=c())?(i(),y?null:new t(0,Number(r))):null},t.fromPolar=function(){switch(arguments.length){case 1:var e=arguments[0];if("object"==typeof e)return t.fromPolar(e.r,e.phi);throw new TypeError("Input has to be an object with r and phi keys.");case 2:var r=arguments[0],n=arguments[1];if(h(r)){if(g(n)&&n.hasBase(p.BASE_UNITS.ANGLE)&&(n=n.toNumber("rad")),h(n))return new t(r*Math.cos(n),r*Math.sin(n));throw new TypeError("Phi is not a number nor an angle unit.")}throw new TypeError("Radius r is not a number.");default:throw new SyntaxError("Wrong number of arguments in function fromPolar")}},t.prototype.toPolar=function(){return{r:Math.sqrt(this.re*this.re+this.im*this.im),phi:Math.atan2(this.im,this.re)}},t.prototype.clone=function(){return new t(this.re,this.im)},t.prototype.equals=function(e){return this.re===e.re&&this.im===e.im},t.prototype.format=function(e){var r="",n=m.format(this.re,e),t=m.format(this.im,e);return r=0==this.im?n:0==this.re?1==this.im?"i":-1==this.im?"-i":t+"i":this.im>0?1==this.im?n+" + i":n+" + "+t+"i":-1==this.im?n+" - i":n+" - "+t.substring(1)+"i"},t.prototype.toString=function(){return this.format()},t.prototype.valueOf=t.prototype.toString,e.exports=t},function(e,r,n){function t(e,r,n){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(null!=e&&!o.isNumber(e))throw new TypeError("Parameter start must be a number");if(null!=r&&!o.isNumber(r))throw new TypeError("Parameter end must be a number");if(null!=n&&!o.isNumber(n))throw new TypeError("Parameter step must be a number");this.start=null!=e?parseFloat(e):0,this.end=null!=r?parseFloat(r):0,this.step=null!=n?parseFloat(n):1}{var i=n(128),o=i.number,a=i.string;i.array}t.parse=function(e){if(!a.isString(e))return null;var r=e.split(":"),n=r.map(function(e){return parseFloat(e)}),i=n.some(function(e){return isNaN(e)});if(i)return null;switch(n.length){case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[2],n[1]);default:return null}},t.prototype.clone=function(){return new t(this.start,this.end,this.step)},t.isRange=function(e){return e instanceof t},t.prototype.size=function(){var e=0,r=this.start,n=this.step,t=this.end,i=t-r;return o.sign(n)==o.sign(i)?e=Math.ceil(i/n):0==i&&(e=0),isNaN(e)&&(e=0),[e]},t.prototype.min=function(){var e=this.size()[0];return e>0?this.step>0?this.start:this.start+(e-1)*this.step:void 0},t.prototype.max=function(){var e=this.size()[0];return e>0?this.step>0?this.start+(e-1)*this.step:this.start:void 0},t.prototype.forEach=function(e){var r=this.start,n=this.step,t=this.end,i=0;if(n>0)for(;t>r;)e(r,i,this),r+=n,i++;else if(0>n)for(;r>t;)e(r,i,this),r+=n,i++},t.prototype.map=function(e){var r=[];return this.forEach(function(n,t,i){r[t]=e(n,t,i)}),r},t.prototype.toArray=function(){var e=[];return this.forEach(function(r,n){e[n]=r}),e},t.prototype.valueOf=function(){return this.toArray()},t.prototype.format=function(e){var r=o.format(this.start,e);return 1!=this.step&&(r+=":"+o.format(this.step,e)),r+=":"+o.format(this.end,e)},t.prototype.toString=function(){return this.format()},e.exports=t},function(e,r,n){function t(){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");this._ranges=[];for(var e=0,r=arguments.length;r>e;e++){var n=arguments[e];if(n instanceof a)this._ranges.push(n);else if(c(n))this._ranges.push(i(n));else{if(!u(n))throw new TypeError("Ranges must be an Array, Number, or Range");this._ranges.push(i([n,n+1]))}}}function i(e){for(var r=e.length,n=0;r>n;n++)if(!u(e[n])||!f(e[n]))throw new TypeError("Index parameters must be integer numbers");switch(e.length){case 2:return new a(e[0],e[1]);case 3:return new a(e[0],e[1],e[2]);default:throw new SyntaxError("Wrong number of arguments in Index (2 or 3 expected)")}}{var o=n(128),a=n(6),s=o.number,u=s.isNumber,f=s.isInteger,c=_.isArray;o.array.validateIndex}t.prototype.clone=function(){var e=new t;return e._ranges=o.object.clone(this._ranges),e},t.isIndex=function(e){return e instanceof t},t.create=function(e){var r=new t;return t.apply(r,e),r},t.prototype.size=function(){for(var e=[],r=0,n=this._ranges.length;n>r;r++){var t=this._ranges[r];e[r]=t.size()[0]}return e},t.prototype.max=function(){for(var e=[],r=0,n=this._ranges.length;n>r;r++){var t=this._ranges[r];e[r]=t.max()}return e},t.prototype.min=function(){for(var e=[],r=0,n=this._ranges.length;n>r;r++){var t=this._ranges[r];e[r]=t.min()}return e},t.prototype.forEach=function(e){for(var r=0,n=this._ranges.length;n>r;r++)e(this._ranges[r],r,this)},t.prototype.range=function(e){return this._ranges[e]||null},t.prototype.isScalar=function(){for(var e=this.size(),r=0,n=e.length;n>r;r++)if(1!==e[r])return!1;return!0},t.prototype.toArray=function(){for(var e=[],r=0,n=this._ranges.length;n>r;r++){var t=this._ranges[r],i=[],o=t.start,a=t.end,s=t.step;if(s>0)for(;a>o;)i.push(o),o+=s;else if(0>s)for(;o>a;)i.push(o),o+=s;e.push(i)}return e},t.prototype.valueOf=t.prototype.toArray,t.prototype.toString=function(){for(var e=[],r=0,n=this._ranges.length;n>r;r++){var t=this._ranges[r],i=s.format(t.start);1!=t.step&&(i+=":"+s.format(t.step)),i+=":"+s.format(t.end),e.push(i)}return"["+e.join(", ")+"]"},e.exports=t},function(e,r,n){function t(e){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(e instanceof t)this._data=e.clone()._data;else if(d(e))this._data=f(e);else{if(null!=e)throw new TypeError("Unsupported type of data ("+c.types.type(e)+")");this._data=[]}this._size=h.size(this._data)}function i(e,r){if(!(r instanceof p))throw new TypeError("Invalid index");var n=r.isScalar();if(n)return e.get(r.min());var i=r.size();if(i.length!=e._size.length)throw new l(i.length,e._size.length);for(var a=new t(o(e._data,r,i.length,0));d(a._data)&&1==a._data.length;)a._data=a._data[0],a._size.shift();return a}function o(e,r,n,t){var i=t==n-1,a=r.range(t);return a.map(i?function(r){return x(r,e.length),e[r]}:function(i){x(i,e.length);var a=e[i];return o(a,r,n,t+1)})}function a(e,r,n,i){if(!(r instanceof p))throw new TypeError("Invalid index");var o,a=r.size(),f=r.isScalar();if(n instanceof t?(o=n.size(),n=n.valueOf()):o=h.size(n),f){if(0!=o.length)throw new TypeError("Scalar expected");e.set(r.min(),n,i)}else{if(a.length<e._size.length)throw new l(a.length,e._size.length,"<");for(var c=0,m=a.length-o.length;m>c;c++)n=[n],o.unshift(1);if(!g.deepEqual(a,o))throw new l(a,o);var d=r.max().map(function(e){return e+1});u(e,d,i);var x=a.length,w=0;s(e._data,r,n,x,w)}return e}function s(e,r,n,t,i){var o=i==t-1,a=r.range(i);a.forEach(o?function(r,t){x(r),e[r]=n[t]}:function(o,a){x(o),s(e[o],r,n[a],t,i+1)})}function u(e,r,n){for(var t=g.clone(e._size),i=!1;t.length<r.length;)t.unshift(0),i=!0;for(var o=0,a=r.length;a>o;o++)r[o]>t[o]&&(t[o]=r[o],i=!0);i&&e.resize(t,n)}function f(e){for(var r=0,n=e.length;n>r;r++){var i=e[r];d(i)?e[r]=f(i):i instanceof t&&(e[r]=f(i._data))}return e}var c=n(128),l=n(125),p=n(7),m=(c.number,c.string),h=c.array,g=c.object,d=_.isArray,x=h.validateIndex;t.isMatrix=function(e){return e instanceof t},t.prototype.subset=function(e,r,n){switch(arguments.length){case 1:return i(this,e);case 2:case 3:return a(this,e,r,n);default:throw new SyntaxError("Wrong number of arguments")}},t.prototype.get=function(e){if(!d(e))throw new TypeError("Array expected");if(e.length!=this._size.length)throw new l(e.length,this._size.length);for(var r=this._data,n=0,t=e.length;t>n;n++){var i=e[n];x(i,r.length),r=r[i]}return g.clone(r)},t.prototype.set=function(e,r,n){var t,i;if(!d(e))throw new Error("Array expected");if(e.length<this._size.length)throw new l(e.length,this._size.length,"<");var o=e.map(function(e){return e+1});u(this,o,n);var a=this._data;for(t=0,i=e.length-1;i>t;t++){var s=e[t];x(s,a.length),a=a[s]}return s=e[e.length-1],x(s,a.length),a[s]=r,this},t.prototype.resize=function(e,r){return this._size=g.clone(e),this._data=h.resize(this._data,this._size,r),this},t.prototype.clone=function(){var e=new t;return e._data=g.clone(this._data),e._size=g.clone(this._size),e},t.prototype.size=function(){return this._size},t.prototype.map=function(e){var r=this,n=new t,i=[],o=function(n,t){return d(n)?n.map(function(e,r){return i[t]=r,o(e,t+1)}):e(n,i,r)};return n._data=o(this._data,0),n._size=g.clone(this._size),n},t.prototype.forEach=function(e){var r=this,n=[],t=function(i,o){d(i)?i.forEach(function(e,r){n[o]=r,t(e,o+1)}):e(i,n,r)};t(this._data,0)},t.prototype.toArray=function(){return g.clone(this._data)},t.prototype.valueOf=function(){return this._data},t.prototype.format=function(e){return m.format(this._data,e)},t.prototype.toString=function(){return m.format(this._data)},e.exports=t},function(e,r,n){function t(e,r){if(!(this instanceof t))throw new Error("Constructor must be called with the new operator");if(void 0!=e&&!w(e))throw new TypeError("First parameter in Unit constructor must be a number");if(void 0!=r&&(!y(r)||""==r))throw new TypeError("Second parameter in Unit constructor must be a string");if(void 0!=r){var n=l(r);if(!n)throw new SyntaxError('Unknown unit "'+r+'"');this.unit=n.unit,this.prefix=n.prefix}else this.unit=UNIT_NONE,this.prefix=b;this.value=void 0!=e?this._normalize(e):null,this.fixPrefix=!1}function i(){for(;" "==h||"	"==h;)s()}function o(e){return e>="0"&&"9">=e||"."==e}function a(e){return e>="0"&&"9">=e}function s(){m++,h=p.charAt(m)}function u(e){m=e,h=p.charAt(m)}function f(){var e,r="";if(e=m,"+"==h?s():"-"==h&&(r+=h,s()),!o(h))return u(e),null;if("."==h){if(r+=h,s(),!a(h))return u(e),null}else{for(;a(h);)r+=h,s();"."==h&&(r+=h,s())}for(;a(h);)r+=h,s();if("E"==h||"e"==h){if(r+=h,s(),("+"==h||"-"==h)&&(r+=h,s()),!a(h))return u(e),null;for(;a(h);)r+=h,s()}return r}function c(){var e="";for(i();h&&" "!=h&&"	"!=h;)e+=h,s();return e||null}function l(e){for(var r in N)if(N.hasOwnProperty(r)&&x.endsWith(e,r)){var n=N[r],t=e.length-r.length,i=e.substring(0,t),o=n.prefixes[i];if(void 0!==o)return{unit:n,prefix:o}}return null}var p,m,h,g=n(128),d=g.number,x=g.string,w=g.number.isNumber,y=g.string.isString;t.parse=function(e){if(p=e,m=-1,h="",!y(p))return null;s(),i();var r,n=f();if(n){if(r=c(),s(),i(),h)return null;if(n&&r)try{return new t(Number(n),r)}catch(o){}}else{if(r=c(),s(),i(),h)return null;if(r)try{return new t(null,r)}catch(o){}}return null},t.isUnit=function(e){return e instanceof t},t.prototype.clone=function(){var e=new t;for(var r in this)this.hasOwnProperty(r)&&(e[r]=this[r]);return e},t.prototype._normalize=function(e){return(e+this.unit.offset)*this.unit.value*this.prefix.value},t.prototype._unnormalize=function(e,r){return void 0==r?e/this.unit.value/this.prefix.value-this.unit.offset:e/this.unit.value/r-this.unit.offset},t.isValuelessUnit=function(e){return null!=l(e)},t.prototype.hasBase=function(e){return this.unit.base===e},t.prototype.equalBase=function(e){return this.unit.base===e.unit.base},t.prototype.equals=function(e){return this.equalBase(e)&&this.value==e.value},t.prototype.to=function(e){var r;if(y(e)){if(r=new t(null,e),!this.equalBase(r))throw new Error("Units do not match");return r.value=this.value,r.fixPrefix=!0,r}if(e instanceof t){if(!this.equalBase(e))throw new Error("Units do not match");if(null!==e.value)throw new Error("Cannot convert to a unit with a value");return r=e.clone(),r.value=this.value,r.fixPrefix=!0,r}throw new Error("String or Unit expected as parameter")},t.prototype.toNumber=function(e){var r=this.to(e);return r._unnormalize(r.value,r.prefix.value)},t.prototype.toString=function(){return this.format()},t.prototype.valueOf=t.prototype.toString,t.prototype.format=function(e){var r,n;if(null===this.value||this.fixPrefix)r=this._unnormalize(this.value),n=null!==this.value?d.format(r,e)+" ":"",n+=this.prefix.name+this.unit.name;else{var t=this._bestPrefix();r=this._unnormalize(this.value,t.value),n=d.format(r,e)+" ",n+=t.name+this.unit.name}return n},t.prototype._bestPrefix=function(){var e=Math.abs(this.value/this.unit.value),r=b,n=Math.abs(Math.log(e/r.value)/Math.LN10-1.2),t=this.unit.prefixes;for(var i in t)if(t.hasOwnProperty(i)){var o=t[i];if(o.scientific){var a=Math.abs(Math.log(e/o.value)/Math.LN10-1.2);n>a&&(r=o,n=a)}}return r};var v={NONE:{"":{name:"",value:1,scientific:!0}},SHORT:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:10,scientific:!1},h:{name:"h",value:100,scientific:!1},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0},d:{name:"d",value:.1,scientific:!1},c:{name:"c",value:.01,scientific:!1},m:{name:"m",value:.001,scientific:!0},u:{name:"u",value:1e-6,scientific:!0},n:{name:"n",value:1e-9,scientific:!0},p:{name:"p",value:1e-12,scientific:!0},f:{name:"f",value:1e-15,scientific:!0},a:{name:"a",value:1e-18,scientific:!0},z:{name:"z",value:1e-21,scientific:!0},y:{name:"y",value:1e-24,scientific:!0}},LONG:{"":{name:"",value:1,scientific:!0},deca:{name:"deca",value:10,scientific:!1},hecto:{name:"hecto",value:100,scientific:!1},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0},deci:{name:"deci",value:.1,scientific:!1},centi:{name:"centi",value:.01,scientific:!1},milli:{name:"milli",value:.001,scientific:!0},micro:{name:"micro",value:1e-6,scientific:!0},nano:{name:"nano",value:1e-9,scientific:!0},pico:{name:"pico",value:1e-12,scientific:!0},femto:{name:"femto",value:1e-15,scientific:!0},atto:{name:"atto",value:1e-18,scientific:!0},zepto:{name:"zepto",value:1e-21,scientific:!0},yocto:{name:"yocto",value:1e-24,scientific:!0}},SQUARED:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:100,scientific:!1},h:{name:"h",value:1e4,scientific:!1},k:{name:"k",value:1e6,scientific:!0},M:{name:"M",value:1e12,scientific:!0},G:{name:"G",value:1e18,scientific:!0},T:{name:"T",value:1e24,scientific:!0},P:{name:"P",value:1e30,scientific:!0},E:{name:"E",value:1e36,scientific:!0},Z:{name:"Z",value:1e42,scientific:!0},Y:{name:"Y",value:1e48,scientific:!0},d:{name:"d",value:.01,scientific:!1},c:{name:"c",value:1e-4,scientific:!1},m:{name:"m",value:1e-6,scientific:!0},u:{name:"u",value:1e-12,scientific:!0},n:{name:"n",value:1e-18,scientific:!0},p:{name:"p",value:1e-24,scientific:!0},f:{name:"f",value:1e-30,scientific:!0},a:{name:"a",value:1e-36,scientific:!0},z:{name:"z",value:1e-42,scientific:!0},y:{name:"y",value:1e-42,scientific:!0}},CUBIC:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:1e3,scientific:!1},h:{name:"h",value:1e6,scientific:!1},k:{name:"k",value:1e9,scientific:!0},M:{name:"M",value:1e18,scientific:!0},G:{name:"G",value:1e27,scientific:!0},T:{name:"T",value:1e36,scientific:!0},P:{name:"P",value:1e45,scientific:!0},E:{name:"E",value:1e54,scientific:!0},Z:{name:"Z",value:1e63,scientific:!0},Y:{name:"Y",value:1e72,scientific:!0},d:{name:"d",value:.001,scientific:!1},c:{name:"c",value:1e-6,scientific:!1},m:{name:"m",value:1e-9,scientific:!0},u:{name:"u",value:1e-18,scientific:!0},n:{name:"n",value:1e-27,scientific:!0},p:{name:"p",value:1e-36,scientific:!0},f:{name:"f",value:1e-45,scientific:!0},a:{name:"a",value:1e-54,scientific:!0},z:{name:"z",value:1e-63,scientific:!0},y:{name:"y",value:1e-72,scientific:!0}},BINARY_SHORT:{"":{name:"",value:1,scientific:!0},k:{name:"k",value:1024,scientific:!0},M:{name:"M",value:Math.pow(1024,2),scientific:!0},G:{name:"G",value:Math.pow(1024,3),scientific:!0},T:{name:"T",value:Math.pow(1024,4),scientific:!0},P:{name:"P",value:Math.pow(1024,5),scientific:!0},E:{name:"E",value:Math.pow(1024,6),scientific:!0},Z:{name:"Z",value:Math.pow(1024,7),scientific:!0},Y:{name:"Y",value:Math.pow(1024,8),scientific:!0},Ki:{name:"Ki",value:1024,scientific:!0},Mi:{name:"Mi",value:Math.pow(1024,2),scientific:!0},Gi:{name:"Gi",value:Math.pow(1024,3),scientific:!0},Ti:{name:"Ti",value:Math.pow(1024,4),scientific:!0},Pi:{name:"Pi",value:Math.pow(1024,5),scientific:!0},Ei:{name:"Ei",value:Math.pow(1024,6),scientific:!0},Zi:{name:"Zi",value:Math.pow(1024,7),scientific:!0},Yi:{name:"Yi",value:Math.pow(1024,8),scientific:!0}},BINARY_LONG:{"":{name:"",value:1,scientific:!0},kilo:{name:"kilo",value:1024,scientific:!0},mega:{name:"mega",value:Math.pow(1024,2),scientific:!0},giga:{name:"giga",value:Math.pow(1024,3),scientific:!0},tera:{name:"tera",value:Math.pow(1024,4),scientific:!0},peta:{name:"peta",value:Math.pow(1024,5),scientific:!0},exa:{name:"exa",value:Math.pow(1024,6),scientific:!0},zetta:{name:"zetta",value:Math.pow(1024,7),scientific:!0},yotta:{name:"yotta",value:Math.pow(1024,8),scientific:!0},kibi:{name:"kibi",value:1024,scientific:!0},mebi:{name:"mebi",value:Math.pow(1024,2),scientific:!0},gibi:{name:"gibi",value:Math.pow(1024,3),scientific:!0},tebi:{name:"tebi",value:Math.pow(1024,4),scientific:!0},pebi:{name:"pebi",value:Math.pow(1024,5),scientific:!0},exi:{name:"exi",value:Math.pow(1024,6),scientific:!0},zebi:{name:"zebi",value:Math.pow(1024,7),scientific:!0},yobi:{name:"yobi",value:Math.pow(1024,8),scientific:!0}}},b={name:"",value:1,scientific:!0},E={NONE:{},LENGTH:{},MASS:{},TIME:{},CURRENT:{},TEMPERATURE:{},LUMINOUS_INTENSITY:{},AMOUNT_OF_SUBSTANCE:{},FORCE:{},SURFACE:{},VOLUME:{},ANGLE:{},BIT:{}};BASE_UNIT_NONE={},UNIT_NONE={name:"",base:BASE_UNIT_NONE,value:1,offset:0};var N={meter:{name:"meter",base:E.LENGTH,prefixes:v.LONG,value:1,offset:0},inch:{name:"inch",base:E.LENGTH,prefixes:v.NONE,value:.0254,offset:0},foot:{name:"foot",base:E.LENGTH,prefixes:v.NONE,value:.3048,offset:0},yard:{name:"yard",base:E.LENGTH,prefixes:v.NONE,value:.9144,offset:0},mile:{name:"mile",base:E.LENGTH,prefixes:v.NONE,value:1609.344,offset:0},link:{name:"link",base:E.LENGTH,prefixes:v.NONE,value:.201168,offset:0},rod:{name:"rod",base:E.LENGTH,prefixes:v.NONE,value:5.02921,offset:0},chain:{name:"chain",base:E.LENGTH,prefixes:v.NONE,value:20.1168,offset:0},angstrom:{name:"angstrom",base:E.LENGTH,prefixes:v.NONE,value:1e-10,offset:0},m:{name:"m",base:E.LENGTH,prefixes:v.SHORT,value:1,offset:0},"in":{name:"in",base:E.LENGTH,prefixes:v.NONE,value:.0254,offset:0},ft:{name:"ft",base:E.LENGTH,prefixes:v.NONE,value:.3048,offset:0},yd:{name:"yd",base:E.LENGTH,prefixes:v.NONE,value:.9144,offset:0},mi:{name:"mi",base:E.LENGTH,prefixes:v.NONE,value:1609.344,offset:0},li:{name:"li",base:E.LENGTH,prefixes:v.NONE,value:.201168,offset:0},rd:{name:"rd",base:E.LENGTH,prefixes:v.NONE,value:5.02921,offset:0},ch:{name:"ch",base:E.LENGTH,prefixes:v.NONE,value:20.1168,offset:0},mil:{name:"mil",base:E.LENGTH,prefixes:v.NONE,value:254e-7,offset:0},m2:{name:"m2",base:E.SURFACE,prefixes:v.SQUARED,value:1,offset:0},sqin:{name:"sqin",base:E.SURFACE,prefixes:v.NONE,value:64516e-8,offset:0},sqft:{name:"sqft",base:E.SURFACE,prefixes:v.NONE,value:.09290304,offset:0},sqyd:{name:"sqyd",base:E.SURFACE,prefixes:v.NONE,value:.83612736,offset:0},sqmi:{name:"sqmi",base:E.SURFACE,prefixes:v.NONE,value:2589988.110336,offset:0},sqrd:{name:"sqrd",base:E.SURFACE,prefixes:v.NONE,value:25.29295,offset:0},sqch:{name:"sqch",base:E.SURFACE,prefixes:v.NONE,value:404.6873,offset:0},sqmil:{name:"sqmil",base:E.SURFACE,prefixes:v.NONE,value:6.4516e-10,offset:0},m3:{name:"m3",base:E.VOLUME,prefixes:v.CUBIC,value:1,offset:0},L:{name:"L",base:E.VOLUME,prefixes:v.SHORT,value:.001,offset:0},l:{name:"l",base:E.VOLUME,prefixes:v.SHORT,value:.001,offset:0},litre:{name:"litre",base:E.VOLUME,prefixes:v.LONG,value:.001,offset:0},cuin:{name:"cuin",base:E.VOLUME,prefixes:v.NONE,value:16387064e-12,offset:0},cuft:{name:"cuft",base:E.VOLUME,prefixes:v.NONE,value:.028316846592,offset:0},cuyd:{name:"cuyd",base:E.VOLUME,prefixes:v.NONE,value:.764554857984,offset:0},teaspoon:{name:"teaspoon",base:E.VOLUME,prefixes:v.NONE,value:5e-6,offset:0},tablespoon:{name:"tablespoon",base:E.VOLUME,prefixes:v.NONE,value:15e-6,offset:0},drop:{name:"drop",base:E.VOLUME,prefixes:v.NONE,value:5e-8,offset:0},gtt:{name:"gtt",base:E.VOLUME,prefixes:v.NONE,value:5e-8,offset:0},minim:{name:"minim",base:E.VOLUME,prefixes:v.NONE,value:6.161152e-8,offset:0},fluiddram:{name:"fluiddram",base:E.VOLUME,prefixes:v.NONE,value:36966911e-13,offset:0},fluidounce:{name:"fluidounce",base:E.VOLUME,prefixes:v.NONE,value:2957353e-11,offset:0},gill:{name:"gill",base:E.VOLUME,prefixes:v.NONE,value:.0001182941,offset:0},cc:{name:"cc",base:E.VOLUME,prefixes:v.NONE,value:1e-6,offset:0},cup:{name:"cup",base:E.VOLUME,prefixes:v.NONE,value:.0002365882,offset:0},pint:{name:"pint",base:E.VOLUME,prefixes:v.NONE,value:.0004731765,offset:0},quart:{name:"quart",base:E.VOLUME,prefixes:v.NONE,value:.0009463529,offset:0},gallon:{name:"gallon",base:E.VOLUME,prefixes:v.NONE,value:.003785412,offset:0},beerbarrel:{name:"beerbarrel",base:E.VOLUME,prefixes:v.NONE,value:.1173478,offset:0},oilbarrel:{name:"oilbarrel",base:E.VOLUME,prefixes:v.NONE,value:.1589873,offset:0},hogshead:{name:"hogshead",base:E.VOLUME,prefixes:v.NONE,value:.238481,offset:0},fldr:{name:"fldr",base:E.VOLUME,prefixes:v.NONE,value:36966911e-13,offset:0},floz:{name:"floz",base:E.VOLUME,prefixes:v.NONE,value:2957353e-11,offset:0},gi:{name:"gi",base:E.VOLUME,prefixes:v.NONE,value:.0001182941,offset:0},cp:{name:"cp",base:E.VOLUME,prefixes:v.NONE,value:.0002365882,offset:0},pt:{name:"pt",base:E.VOLUME,prefixes:v.NONE,value:.0004731765,offset:0},qt:{name:"qt",base:E.VOLUME,prefixes:v.NONE,value:.0009463529,offset:0},gal:{name:"gal",base:E.VOLUME,prefixes:v.NONE,value:.003785412,offset:0},bbl:{name:"bbl",base:E.VOLUME,prefixes:v.NONE,value:.1173478,offset:0},obl:{name:"obl",base:E.VOLUME,prefixes:v.NONE,value:.1589873,offset:0},g:{name:"g",base:E.MASS,prefixes:v.SHORT,value:.001,offset:0},gram:{name:"gram",base:E.MASS,prefixes:v.LONG,value:.001,offset:0},ton:{name:"ton",base:E.MASS,prefixes:v.SHORT,value:907.18474,offset:0},tonne:{name:"tonne",base:E.MASS,prefixes:v.SHORT,value:1e3,offset:0},grain:{name:"grain",base:E.MASS,prefixes:v.NONE,value:6479891e-11,offset:0},dram:{name:"dram",base:E.MASS,prefixes:v.NONE,value:.0017718451953125,offset:0},ounce:{name:"ounce",base:E.MASS,prefixes:v.NONE,value:.028349523125,offset:0},poundmass:{name:"poundmass",base:E.MASS,prefixes:v.NONE,value:.45359237,offset:0},hundredweight:{name:"hundredweight",base:E.MASS,prefixes:v.NONE,value:45.359237,offset:0},stick:{name:"stick",base:E.MASS,prefixes:v.NONE,value:.115,offset:0},gr:{name:"gr",base:E.MASS,prefixes:v.NONE,value:6479891e-11,offset:0},dr:{name:"dr",base:E.MASS,prefixes:v.NONE,value:.0017718451953125,offset:0},oz:{name:"oz",base:E.MASS,prefixes:v.NONE,value:.028349523125,offset:0},lbm:{name:"lbm",base:E.MASS,prefixes:v.NONE,value:.45359237,offset:0},cwt:{name:"cwt",base:E.MASS,prefixes:v.NONE,value:45.359237,offset:0},s:{name:"s",base:E.TIME,prefixes:v.SHORT,value:1,offset:0},min:{name:"min",base:E.TIME,prefixes:v.NONE,value:60,offset:0},h:{name:"h",base:E.TIME,prefixes:v.NONE,value:3600,offset:0},second:{name:"second",base:E.TIME,prefixes:v.LONG,value:1,offset:0},sec:{name:"sec",base:E.TIME,prefixes:v.LONG,value:1,offset:0},minute:{name:"minute",base:E.TIME,prefixes:v.NONE,value:60,offset:0},hour:{name:"hour",base:E.TIME,prefixes:v.NONE,value:3600,offset:0},day:{name:"day",base:E.TIME,prefixes:v.NONE,value:86400,offset:0},rad:{name:"rad",base:E.ANGLE,prefixes:v.NONE,value:1,offset:0},deg:{name:"deg",base:E.ANGLE,prefixes:v.NONE,value:.017453292519943295,offset:0},grad:{name:"grad",base:E.ANGLE,prefixes:v.NONE,value:.015707963267948967,offset:0},cycle:{name:"cycle",base:E.ANGLE,prefixes:v.NONE,value:6.283185307179586,offset:0},A:{name:"A",base:E.CURRENT,prefixes:v.SHORT,value:1,offset:0},ampere:{name:"ampere",base:E.CURRENT,prefixes:v.LONG,value:1,offset:0},K:{name:"K",base:E.TEMPERATURE,prefixes:v.NONE,value:1,offset:0},degC:{name:"degC",base:E.TEMPERATURE,prefixes:v.NONE,value:1,offset:273.15},degF:{name:"degF",base:E.TEMPERATURE,prefixes:v.NONE,value:1/1.8,offset:459.67},degR:{name:"degR",base:E.TEMPERATURE,prefixes:v.NONE,value:1/1.8,offset:0},kelvin:{name:"kelvin",base:E.TEMPERATURE,prefixes:v.NONE,value:1,offset:0},celsius:{name:"celsius",base:E.TEMPERATURE,prefixes:v.NONE,value:1,offset:273.15},fahrenheit:{name:"fahrenheit",base:E.TEMPERATURE,prefixes:v.NONE,value:1/1.8,offset:459.67},rankine:{name:"rankine",base:E.TEMPERATURE,prefixes:v.NONE,value:1/1.8,offset:0},mol:{name:"mol",base:E.AMOUNT_OF_SUBSTANCE,prefixes:v.NONE,value:1,offset:0},mole:{name:"mole",base:E.AMOUNT_OF_SUBSTANCE,prefixes:v.NONE,value:1,offset:0},cd:{name:"cd",base:E.LUMINOUS_INTENSITY,prefixes:v.NONE,value:1,offset:0},candela:{name:"candela",base:E.LUMINOUS_INTENSITY,prefixes:v.NONE,value:1,offset:0},N:{name:"N",base:E.FORCE,prefixes:v.SHORT,value:1,offset:0},newton:{name:"newton",base:E.FORCE,prefixes:v.LONG,value:1,offset:0},lbf:{name:"lbf",base:E.FORCE,prefixes:v.NONE,value:4.4482216152605,offset:0},poundforce:{name:"poundforce",base:E.FORCE,prefixes:v.NONE,value:4.4482216152605,offset:0},b:{name:"b",base:E.BIT,prefixes:v.BINARY_SHORT,value:1,offset:0},bits:{name:"bits",base:E.BIT,prefixes:v.BINARY_LONG,value:1,offset:0},B:{name:"B",base:E.BIT,prefixes:v.BINARY_SHORT,value:8,offset:0},bytes:{name:"bytes",base:E.BIT,prefixes:v.BINARY_LONG,value:8,offset:0}},M={meters:"meter",inches:"inch",feet:"foot",yards:"yard",miles:"mile",links:"link",rods:"rod",chains:"chain",angstroms:"angstrom",litres:"litre",teaspoons:"teaspoon",tablespoons:"tablespoon",minims:"minim",fluiddrams:"fluiddram",fluidounces:"fluidounce",gills:"gill",cups:"cup",pints:"pint",quarts:"quart",gallons:"gallon",beerbarrels:"beerbarrel",oilbarrels:"oilbarrel",hogsheads:"hogshead",gtts:"gtt",grams:"gram",tons:"ton",tonnes:"tonne",grains:"grain",drams:"dram",ounces:"ounce",poundmasses:"poundmass",hundredweights:"hundredweight",sticks:"stick",seconds:"second",minutes:"minute",hours:"hour",days:"day",radians:"rad",degrees:"deg",gradients:"grad",cycles:"cycle",amperes:"ampere",moles:"mole"};
    for(var T in M)if(M.hasOwnProperty(T)){var A=N[M[T]],O=Object.create(A);O.name=T,N[T]=O}N.lt=N.l,N.liter=N.litre,N.liters=N.litres,N.lb=N.lbm,N.lbs=N.lbm,t.PREFIXES=v,t.BASE_UNITS=E,t.UNITS=N,e.exports=t},function(e,r,n){function t(e,r){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");this.math=e,this.doc=r}var i=n(128),o=i.object,a=i.string;t.isHelp=function(e){return e instanceof t},t.prototype.toString=function(){var e=this.doc||{},r="\n";if(e.name&&(r+="Name: "+e.name+"\n\n"),e.category&&(r+="Category: "+e.category+"\n\n"),e.description&&(r+="Description:\n    "+e.description+"\n\n"),e.syntax&&(r+="Syntax:\n    "+e.syntax.join("\n    ")+"\n\n"),e.examples){var n=this.math.parser();r+="Examples:\n";for(var i=0;i<e.examples.length;i++){var o,s=e.examples[i];try{o=n.eval(s)}catch(u){o=u}r+="    "+s+"\n",!o||o instanceof t||(r+="        "+a.format(o)+"\n")}r+="\n"}return e.seealso&&(r+="See also: "+e.seealso.join(", ")+"\n"),r},t.prototype.toJSON=function(){return o.clone(this.doc)},t.prototype.valueOf=t.prototype.toString,e.exports=t},function(e,r,n){function t(e,r,n){var o,a,s,f;if(0>=r){if(u(e[0])){for(f=i(e),a=[],o=0;o<f.length;o++)a[o]=t(f[o],r-1,n);return a}for(s=e[0],o=1;o<e.length;o++)s=n(s,e[o]);return s}for(a=[],o=0;o<e.length;o++)a[o]=t(e[o],r-1,n);return a}function i(e){var r,n,t=e.length,i=e[0].length,o=[];for(n=0;i>n;n++){var a=[];for(r=0;t>r;r++)a.push(e[r][n]);o.push(a)}return o}{var o=n(128),a=n(125),s=n(8),u=o.array.isArray;o.string.isString}r.argsToArray=function(e){var r;return 0==e.length?r=[]:1==e.length?(r=e[0],r instanceof s&&(r=r.valueOf()),u(r)||(r=[r])):r=Array.prototype.slice.apply(e),r},r.isCollection=function(e){return u(e)||e instanceof s},r.deepMap=function f(e,r){return e&&"function"==typeof e.map?e.map(function(e){return f(e,r)}):r(e)},r.deepMap2=function c(e,r,n){var t,i,o;if(u(e))if(u(r)){if(e.length!=r.length)throw new a(e.length,r.length);for(t=[],i=e.length,o=0;i>o;o++)t[o]=c(e[o],r[o],n)}else{if(r instanceof s)return t=c(e,r.valueOf(),n),new s(t);for(t=[],i=e.length,o=0;i>o;o++)t[o]=c(e[o],r,n)}else{if(e instanceof s)return r instanceof s?(t=c(e.valueOf(),r.valueOf(),n),new s(t)):(t=c(e.valueOf(),r,n),new s(t));if(u(r))for(t=[],i=r.length,o=0;i>o;o++)t[o]=c(e,r[o],n);else{if(r instanceof s)return t=c(e,r.valueOf(),n),new s(t);t=n(e,r)}}return t},r.reduce=function(e,r,n){return e instanceof s?new s(t(e.valueOf(),r,n)):t(e,r,n)},r.deepForEach=function l(e,r){e instanceof s&&(e=e.valueOf());for(var n=0,t=e.length;t>n;n++){var i=e[n];u(i)?l(i,r):r(i)}}},function(e,r,n){function t(e,r){if(1!=arguments.length&&2!=arguments.length)throw new j("parse",arguments.length,1,2);if(ar=r&&r.nodes?r.nodes:{},F(e))return sr=e,p();if(D(e)||e instanceof G)return V.deepMap(e,function(e){if(!F(e))throw new TypeError("String expected");return sr=e,p()});throw new TypeError("String or matrix expected")}function i(){ur=0,fr=sr.charAt(0)}function o(){ur++,fr=sr.charAt(ur)}function a(){return sr.charAt(ur+1)}function s(){for(lr=tr.NULL,cr="";" "==fr||"	"==fr;)o();if("#"==fr)for(;"\n"!=fr&&""!=fr;)o();if(""==fr)return void(lr=tr.DELIMITER);var e=fr+a();if(2==e.length&&ir[e])return lr=tr.DELIMITER,cr=e,o(),void o();if(ir[fr])return lr=tr.DELIMITER,cr=fr,void o();if(!c(fr)){if(f(fr)){for(;f(fr)||l(fr);)cr+=fr,o();return void(lr=or[cr]?tr.DELIMITER:tr.SYMBOL)}for(lr=tr.UNKNOWN;""!=fr;)cr+=fr,o();throw L('Syntax error in part "'+cr+'"')}if(lr=tr.NUMBER,"."==fr)cr+=fr,o(),l(fr)||(lr=tr.UNKNOWN);else{for(;l(fr);)cr+=fr,o();"."==fr&&(cr+=fr,o())}for(;l(fr);)cr+=fr,o();if("E"==fr||"e"==fr)for(cr+=fr,o(),("+"==fr||"-"==fr)&&(cr+=fr,o()),l(fr)||(lr=tr.UNKNOWN);l(fr);)cr+=fr,o()}function u(){for(;"\n"==cr;)s()}function f(e){return e>="a"&&"z">=e||e>="A"&&"Z">=e||"_"==e}function c(e){return e>="0"&&"9">=e||"."==e}function l(e){return e>="0"&&"9">=e}function p(){i(),s();var e=m();if(""!=cr)throw lr==tr.DELIMITER?P("Unexpected operator "+cr):L('Unexpected part "'+cr+'"');return e}function m(){var e,r,n;if(""==cr)return new Q("undefined","undefined");for("\n"!=cr&&";"!=cr&&(e=h());"\n"==cr||";"==cr;)r||(r=new W,e&&(n=";"!=cr,r.add(e,n))),s(),"\n"!=cr&&";"!=cr&&""!=cr&&(e=h(),n=";"!=cr,r.add(e,n));return r?r:e}function h(){if(lr==tr.SYMBOL&&"function"==cr)throw L('Deprecated keyword "function". Functions can now be assigned without it, like "f(x) = x^2".');return g()}function g(){var e,r,n,t=d();if("="==cr){if(t instanceof rr)return e=t.name,s(),n=g(),new Y(e,n);if(t instanceof $)return s(),n=g(),new nr(t,n);if(t instanceof X){var i=!0;if(r=[],t.object instanceof rr?(e=t.object.name,t.params.forEach(function(e,n){e instanceof rr?r[n]=e.name:i=!1})):i=!1,i)return s(),n=g(),new K(e,r,n)}throw L("Invalid left hand side of assignment operator =")}return t}function d(){for(var e=x();"?"==cr;){s();var r=e,n=w();if(":"!=cr)throw L("False part of conditional expression expected");s();var t=d();e=new Z(r,n,t)}return e}function x(){var e,r=[];if(e=":"==cr?new Q("1","number"):w(),":"==cr){for(r.push(e);":"==cr;)s(),r.push(")"==cr||"]"==cr||","==cr||""==cr?new rr("end"):w());if(3==r.length){var n=r[2];r[2]=r[1],r[1]=n}e=new er(r)}return e}function w(){var e,r,n,t,i;for(e=y(),r={to:"to","in":"to"};cr in r;)n=cr,t=r[n],s(),i=[e,y()],e=new J(n,t,i);return e}function y(){var e,r,n,t,i;for(e=v(),r={"==":"equal","!=":"unequal","<":"smaller",">":"larger","<=":"smallerEq",">=":"largerEq"};cr in r;)n=cr,t=r[n],s(),i=[e,v()],e=new J(n,t,i);return e}function v(){var e,r,n,t,i;for(e=b(),r={"+":"add","-":"subtract"};cr in r;)n=cr,t=r[n],s(),i=[e,b()],e=new J(n,t,i);return e}function b(){var e,r,n,t,i;if(e=E(),r={"*":"multiply",".*":"dotMultiply","/":"divide","./":"dotDivide","%":"mod",mod:"mod"},cr in r)for(;cr in r;)n=cr,t=r[n],s(),i=[e,E()],e=new J(n,t,i);return(lr==tr.SYMBOL||"in"==cr&&e instanceof Q||lr==tr.NUMBER&&!(e instanceof Q)||"("==cr||"["==cr)&&(e=new J("*","multiply",[e,b()])),e}function E(){var e,r,n;return"-"==cr||"+"==cr?(e=cr,r="+"==e?"unaryPlus":"unaryMinus",s(),n=[E()],new J(e,r,n)):N()}function N(){var e,r,n,t;return e=M(),("^"==cr||".^"==cr)&&(r=cr,n="^"==r?"pow":"dotPow",s(),t=[e,E()],e=new J(r,n,t)),e}function M(){var e,r,n,t,i;for(e=T(),r={"!":"factorial","'":"transpose"};cr in r;)n=cr,t=r[n],s(),i=[e],e=new J(n,t,i);return e}function T(){var e,r=[];if(lr==tr.SYMBOL&&ar[cr]){if(e=ar[cr],s(),"("==cr){if(r=[],s(),")"!=cr)for(r.push(d());","==cr;)s(),r.push(d());if(")"!=cr)throw L("Parenthesis ) expected");s()}return new e(r)}return A()}function A(){var e,r;return lr==tr.SYMBOL||lr==tr.DELIMITER&&cr in or?(r=cr,s(),e=new rr(r),e=O(e),e=S(e)):C()}function O(e){var r;if("("==cr){if(r=[],s(),")"!=cr)for(r.push(d());","==cr;)s(),r.push(d());if(")"!=cr)throw L("Parenthesis ) expected");s(),e=new X(e,r)}return e}function S(e){for(var r;"["==cr;){if(r=[],s(),"]"!=cr)for(r.push(d());","==cr;)s(),r.push(d());if("]"!=cr)throw L("Parenthesis ] expected");s(),e=new $(e,r)}return e}function C(){var e,r,n;if('"'==cr){for(r="",n="";""!=fr&&('"'!=fr||"\\"==n);)r+=fr,n=fr,o();if(s(),'"'!=cr)throw L('End of string " expected');return s(),e=new Q(r,"string"),e=S(e)}return U()}function U(){var e,r,n,t;if("["==cr){if(s(),u(),"]"!=cr){var i=q();if(";"==cr){for(n=1,r=[i];";"==cr;)s(),u(),r[n]=q(),n++,u();if("]"!=cr)throw L("End of matrix ] expected");s(),t=r[0].nodes.length;for(var o=1;n>o;o++)if(r[o].nodes.length!=t)throw P("Column dimensions mismatch ("+r[o].nodes.length+" != "+t+")");e=new H(r)}else{if("]"!=cr)throw L("End of matrix ] expected");s(),e=i}}else s(),e=new H([]);return e}return B()}function q(){for(var e=[g()],r=1;","==cr;)s(),u(),e[r]=g(),r++,u();return new H(e)}function B(){var e,r;return lr==tr.NUMBER?(r=cr,s(),e=new Q(r,"number")):z()}function z(){var e;if("("==cr){if(s(),e=g(),")"!=cr)throw L("Parenthesis ) expected");return s(),e}return I()}function I(){throw L(""==cr?"Unexpected end of expression":"Value expected")}function R(){return ur-cr.length+1}function L(e){var r=R(),n=new SyntaxError(e+" (char "+r+")");return n["char"]=r,n}function P(e){var r=R(),n=new Error(e+" (char "+r+")");return n["char"]=r,n}var k=n(128),j=n(124),F=k.string.isString,D=_.isArray,G=(k.types.type,n(5),n(8)),V=(n(9),n(11)),H=n(129),Y=n(130),W=n(131),Z=n(132),Q=n(133),K=n(135),$=n(134),J=n(137),X=n(138),er=n(139),rr=n(140),nr=n(141),tr={NULL:0,DELIMITER:1,NUMBER:2,SYMBOL:3,UNKNOWN:4},ir={",":!0,"(":!0,")":!0,"[":!0,"]":!0,'"':!0,"\n":!0,";":!0,"+":!0,"-":!0,"*":!0,".*":!0,"/":!0,"./":!0,"%":!0,"^":!0,".^":!0,"!":!0,"'":!0,"=":!0,":":!0,"?":!0,"==":!0,"!=":!0,"<":!0,">":!0,"<=":!0,">=":!0},or={mod:!0,to:!0,"in":!0},ar={},sr="",ur=0,fr="",cr="",lr=tr.NULL;e.exports=t},function(e,r,n){function t(e){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(!(e instanceof Object))throw new TypeError("Object expected as parameter math");this.math=e,this.scope={}}var i=n(12);t.prototype.parse=function(){throw new Error("Parser.parse is deprecated. Use math.parse instead.")},t.prototype.compile=function(){throw new Error("Parser.compile is deprecated. Use math.compile instead.")},t.prototype.eval=function(e){return i(e).compile(this.math).eval(this.scope)},t.prototype.get=function(e){return this.scope[e]},t.prototype.set=function(e,r){return this.scope[e]=r},t.prototype.remove=function(e){delete this.scope[e]},t.prototype.clear=function(){for(var e in this.scope)this.scope.hasOwnProperty(e)&&delete this.scope[e]},e.exports=t},function(e,r,n){r.ArrayNode=n(129),r.AssignmentNode=n(130),r.BlockNode=n(131),r.ConditionalNode=n(132),r.ConstantNode=n(133),r.IndexNode=n(134),r.FunctionNode=n(135),r.Node=n(136),r.OperatorNode=n(137),r.ParamsNode=n(138),r.RangeNode=n(139),r.SymbolNode=n(140),r.UpdateNode=n(141)},function(e,r,n){r.e=n(143),r.E=n(143),r["false"]=n(144),r.i=n(145),r.Infinity=n(146),r.LN2=n(147),r.LN10=n(148),r.LOG2E=n(149),r.LOG10E=n(150),r.NaN=n(151),r["null"]=n(152),r.pi=n(153),r.PI=n(153),r.phi=n(154),r.SQRT1_2=n(155),r.SQRT2=n(156),r.tau=n(157),r["true"]=n(158),r.version=n(159),r.abs=n(164),r.add=n(165),r.ceil=n(166),r.cube=n(167),r.divide=n(168),r.dotDivide=n(169),r.dotMultiply=n(170),r.dotPow=n(171),r.exp=n(172),r.fix=n(173),r.floor=n(174),r.gcd=n(175),r.lcm=n(176),r.log=n(177),r.log10=n(178),r.mod=n(179),r.multiply=n(180),r.norm=n(181),r.pow=n(182),r.round=n(183),r.sign=n(184),r.sqrt=n(185),r.square=n(186),r.subtract=n(187),r.unaryMinus=n(188),r.unaryPlus=n(189),r.xgcd=n(190),r.compare=n(191),r.deepEqual=n(192),r.equal=n(193),r.larger=n(194),r.largerEq=n(195),r.smaller=n(196),r.smallerEq=n(197),r.unequal=n(198),r.arg=n(199),r.conj=n(200),r.re=n(201),r.im=n(202),r.bignumber=n(203),r["boolean"]=n(204),r.complex=n(205),r.index=n(206),r.matrix=n(207),r.number=n(208),r.string=n(209),r.unit=n(210),r.eval=n(211),r.help=n(212),r.concat=n(213),r.det=n(214),r.diag=n(215),r.eye=n(216),r.inv=n(217),r.ones=n(218),r.range=n(219),r.resize=n(220),r.size=n(221),r.squeeze=n(222),r.subset=n(223),r.transpose=n(224),r.zeros=n(225),r.combinations=n(226),r.distribution=n(227),r.factorial=n(228),r.permutations=n(229),r.pickRandom=n(230),r.random=n(231),r.randomInt=n(232),r.max=n(233),r.mean=n(234),r.median=n(235),r.min=n(236),r.prod=n(237),r.std=n(238),r.sum=n(239),r["var"]=n(240),r.acos=n(241),r.asin=n(242),r.atan=n(243),r.atan2=n(244),r.cos=n(245),r.cosh=n(246),r.cot=n(247),r.coth=n(248),r.csc=n(249),r.csch=n(250),r.sec=n(251),r.sech=n(252),r.sin=n(253),r.sinh=n(254),r.tan=n(255),r.tanh=n(256),r.to=n(257),r.clone=n(258),r.map=n(259),r.forEach=n(260),r.format=n(261),r["import"]=n(262),r["typeof"]=n(263)},function(e,r,n){e.exports=function(e){function r(e){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.value=e instanceof r?e.value:e}function t(e,n){var t=Array.prototype.slice;r.prototype[e]="function"==typeof n?function(){var e=[this.value].concat(t.call(arguments,0));return new r(n.apply(this,e))}:new r(n)}var i=n(142);r.prototype.done=function(){return this.value},r.prototype.valueOf=function(){return this.value},r.prototype.toString=function(){return i.format(this.value)},r.createProxy=t;for(var o in e)e.hasOwnProperty(o)&&t(o,e[o]);return r}},function(e,r,n){e.exports=function(e){var r=n(128),t=n(12),i=n(11),o=r.string.isString,a=i.isCollection;e.compile=function(r){if(1!=arguments.length)throw new e.error.ArgumentsError("compile",arguments.length,1);if(o(r))return t(r).compile(e);if(a(r))return i.deepMap(r,function(r){return t(r).compile(e)});throw new TypeError("String, array, or matrix expected")}}},function(e,r,n){e.exports=function(e){var r=n(128),t=n(12),i=n(11),o=r.string.isString,a=i.isCollection;e.eval=function(r,n){if(1!=arguments.length&&2!=arguments.length)throw new e.error.ArgumentsError("eval",arguments.length,1,2);if(n=n||{},o(r))return t(r).compile(e).eval(n);if(a(r))return i.deepMap(r,function(r){return t(r).compile(e).eval(n)});throw new TypeError("String, array, or matrix expected")}}},function(e,r,n){e.exports=function(e){var r=n(10);e.help=function(n){if(1!=arguments.length)throw new SyntaxError("Wrong number of arguments in function help ("+arguments.length+" provided, 1 expected)");var t=null;if(n instanceof String||"string"==typeof n)t=n;else{var i;for(i in e)if(e.hasOwnProperty(i)&&n===e[i]){t=i;break}}var o=e.expression.docs[t];if(!t||!o)throw new Error('No documentation found on "'+t+'"');return new r(e,o)}}},function(e,r,n){e.exports=function(e){var r=n(12);e.parse=function(){return r.apply(r,arguments)}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=(n(8),n(11)),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.abs=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("abs",arguments.length,1);if(a(r))return Math.abs(r);if(u(r))return Math.sqrt(r.re*r.re+r.im*r.im);if(r instanceof t)return r.abs();if(f(r))return o.deepMap(r,c);if(s(r))return Math.abs(r);throw new e.error.UnsupportedTypeError("abs",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=(n(8),n(9)),a=n(11),s=r["boolean"].isBoolean,u=r.number.isNumber,f=r.string.isString,c=i.isComplex,l=o.isUnit,p=a.isCollection;e.add=function m(r,n){if(2!=arguments.length)throw new e.error.ArgumentsError("add",arguments.length,2);if(u(r)){if(u(n))return r+n;if(c(n))return new i(r+n.re,n.im)}if(c(r)){if(c(n))return new i(r.re+n.re,r.im+n.im);if(u(n))return new i(r.re+n,r.im)}if(l(r)&&l(n)){if(null==r.value)throw new Error("Parameter x contains a unit with undefined value");if(null==n.value)throw new Error("Parameter y contains a unit with undefined value");if(!r.equalBase(n))throw new Error("Units do not match");var o=r.clone();return o.value+=n.value,o.fixPrefix=!1,o}if(r instanceof t)return u(n)?n=t.convert(n):s(n)&&(n=new t(n?1:0)),n instanceof t?r.plus(n):m(r.toNumber(),n);if(n instanceof t)return u(r)?r=t.convert(r):s(r)&&(r=new t(r?1:0)),r instanceof t?r.plus(n):m(r,n.toNumber());if(p(r)||p(n))return a.deepMap2(r,n,m);if(f(r)||f(n))return r+n;if(s(r))return m(+r,n);if(s(n))return m(r,+n);throw new e.error.UnsupportedTypeError("add",e["typeof"](r),e["typeof"](n))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=o.isCollection,f=i.isComplex;e.ceil=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("ceil",arguments.length,1);if(a(r))return Math.ceil(r);if(f(r))return new i(Math.ceil(r.re),Math.ceil(r.im));if(r instanceof t)return r.ceil();if(u(r))return o.deepMap(r,c);if(s(r))return Math.ceil(r);throw new e.error.UnsupportedTypeError("ceil",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.cube=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("cube",arguments.length,1);if(a(r))return r*r*r;if(u(r))return e.multiply(e.multiply(r,r),r);if(r instanceof t)return r.times(r).times(r);if(f(r))return o.deepMap(r,c);if(s(r))return c(+r);throw new e.error.UnsupportedTypeError("cube",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){function r(e,r){var n=r.re*r.re+r.im*r.im;return 0!=n?new o((e.re*r.re+e.im*r.im)/n,(e.im*r.re-e.re*r.im)/n):new o(0!=e.re?e.re/0:0,0!=e.im?e.im/0:0)}var t=n(128),i=e.type.BigNumber,o=n(5),a=(n(8),n(9)),s=n(11),u=t.number.isNumber,f=t["boolean"].isBoolean,c=o.isComplex,l=a.isUnit,p=s.isCollection;e.divide=function m(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("divide",arguments.length,2);if(u(n)){if(u(t))return n/t;if(c(t))return r(new o(n,0),t)}if(c(n)){if(c(t))return r(n,t);if(u(t))return r(n,new o(t,0))}if(n instanceof i)return u(t)?t=i.convert(t):f(t)&&(t=new i(t?1:0)),t instanceof i?n.div(t):m(n.toNumber(),t);if(t instanceof i)return u(n)?n=i.convert(n):f(n)&&(n=new i(n?1:0)),n instanceof i?n.div(t):m(n,t.toNumber());if(l(n)&&u(t)){var a=n.clone();return a.value/=t,a}if(p(n))return p(t)?e.multiply(n,e.inv(t)):s.deepMap2(n,t,m);if(p(t))return e.multiply(n,e.inv(t));if(f(n))return m(+n,t);if(f(t))return m(n,+t);throw new e.error.UnsupportedTypeError("divide",e["typeof"](n),e["typeof"](t))}}},function(e,r,n){e.exports=function(e){var r=n(11);e.dotDivide=function(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("dotDivide",arguments.length,2);return r.deepMap2(n,t,e.divide)},e.edivide=function(){throw new Error("Function edivide is renamed to dotDivide")}}},function(e,r,n){e.exports=function(e){var r=(n(128),n(11));e.dotMultiply=function(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("dotMultiply",arguments.length,2);return r.deepMap2(n,t,e.multiply)},e.emultiply=function(){throw new Error("Function emultiply is renamed to dotMultiply")}}},function(e,r,n){e.exports=function(e){var r=(n(128),n(11));e.dotPow=function(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("dotPow",arguments.length,2);return r.deepMap2(n,t,e.pow)},e.epow=function(){throw new Error("Function epow is renamed to dotPow")}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=(n(8),n(11)),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.exp=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("exp",arguments.length,1);if(a(r))return Math.exp(r);if(u(r)){var n=Math.exp(r.re);return new i(n*Math.cos(r.im),n*Math.sin(r.im))}if(r instanceof t)return r.exp();if(f(r))return o.deepMap(r,c);if(s(r))return Math.exp(r);throw new e.error.UnsupportedTypeError("exp",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.fix=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("fix",arguments.length,1);if(a(r))return r>0?Math.floor(r):Math.ceil(r);if(u(r))return new i(r.re>0?Math.floor(r.re):Math.ceil(r.re),r.im>0?Math.floor(r.im):Math.ceil(r.im));if(r instanceof t)return r.isNegative()?r.ceil():r.floor();if(f(r))return o.deepMap(r,c);if(s(r))return c(+r);throw new e.error.UnsupportedTypeError("fix",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.floor=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("floor",arguments.length,1);if(a(r))return Math.floor(r);if(u(r))return new i(Math.floor(r.re),Math.floor(r.im));if(r instanceof t)return r.floor();if(f(r))return o.deepMap(r,c);if(s(r))return c(+r);throw new e.error.UnsupportedTypeError("floor",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(11),o=r.number.isNumber,a=r["boolean"].isBoolean,s=r.number.isInteger,u=i.isCollection;e.gcd=function f(){var r,n=arguments[0],c=arguments[1];if(2==arguments.length){if(o(n)&&o(c)){if(!s(n)||!s(c))throw new Error("Parameters in function gcd must be integer numbers");for(;0!=c;)r=n%c,n=c,c=r;return 0>n?-n:n}if(u(n)||u(c))return i.deepMap2(n,c,f);if(n instanceof t)return f(n.toNumber(),c);if(c instanceof t)return f(n,c.toNumber());if(a(n))return f(+n,c);if(a(c))return f(n,+c);throw new e.error.UnsupportedTypeError("gcd",e["typeof"](n),e["typeof"](c))}if(arguments.length>2){for(var l=1;l<arguments.length;l++)n=f(n,arguments[l]);return n}throw new SyntaxError("Function gcd expects two or more arguments")}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(11),o=r.number.isNumber,a=r["boolean"].isBoolean,s=r.number.isInteger,u=i.isCollection;e.lcm=function f(){var r,n=arguments[0],c=arguments[1];if(2==arguments.length){if(o(n)&&o(c)){if(!s(n)||!s(c))throw new Error("Parameters in function lcm must be integer numbers");if(0==n||0==c)return 0;for(var l=n*c;0!=c;)r=c,c=n%r,n=r;return Math.abs(l/n)}if(u(n)||u(c))return i.deepMap2(n,c,f);if(a(n))return f(+n,c);if(a(c))return f(n,+c);if(n instanceof t)return f(n.toNumber(),c);if(c instanceof t)return f(n,c.toNumber());throw new e.error.UnsupportedTypeError("lcm",e["typeof"](n),e["typeof"](c))}if(arguments.length>2){for(var p=1;p<arguments.length;p++)n=f(n,arguments[p]);return n}throw new SyntaxError("Function lcm expects two or more arguments")}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.log=function c(r,n){if(1==arguments.length){if(a(r))return r>=0?Math.log(r):c(new i(r,0));if(u(r))return new i(Math.log(Math.sqrt(r.re*r.re+r.im*r.im)),Math.atan2(r.im,r.re));if(r instanceof t)return r.isNegative()?c(r.toNumber()):r.ln();if(f(r))return o.deepMap(r,c);if(s(r))return c(+r);throw new e.error.UnsupportedTypeError("log",e["typeof"](r))}if(2==arguments.length)return e.divide(c(r),c(n));throw new e.error.ArgumentsError("log",arguments.length,1,2)}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.log10=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("log10",arguments.length,1);if(a(r))return r>=0?Math.log(r)/Math.LN10:c(new i(r,0));if(r instanceof t)return r.isNegative()?c(r.toNumber()):r.log();if(u(r))return new i(Math.log(Math.sqrt(r.re*r.re+r.im*r.im))/Math.LN10,Math.atan2(r.im,r.re)/Math.LN10);if(f(r))return o.deepMap(r,c);if(s(r))return c(+r);throw new e.error.UnsupportedTypeError("log10",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){function r(e,r){if(r>0)return e-r*Math.floor(e/r);if(0==r)return e;throw new Error("Cannot calculate mod for a negative divisor")}var t=n(128),i=e.type.BigNumber,o=n(11),a=t.number.isNumber,s=t["boolean"].isBoolean,u=o.isCollection;e.mod=function f(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("mod",arguments.length,2);if(a(n)&&a(t))return r(n,t);if(n instanceof i)return a(t)?t=i.convert(t):s(t)&&(t=new i(t?1:0)),t instanceof i?t.isZero()?n:n.mod(t):f(n.toNumber(),t);if(t instanceof i)return a(n)?n=i.convert(n):s(n)&&(n=new i(n?1:0)),n instanceof i?t.isZero()?n:n.mod(t):f(n,t.toNumber());if(u(n)||u(t))return o.deepMap2(n,t,f);if(s(n))return f(+n,t);if(s(t))return f(n,+t);throw new e.error.UnsupportedTypeError("mod",e["typeof"](n),e["typeof"](t))}}},function(e,r,n){e.exports=function(e){function r(r,n){for(var t=[],i=r.length,o=n[0].length,a=r[0].length,s=0;i>s;s++){t[s]=[];for(var u=0;o>u;u++){for(var f=null,c=0;a>c;c++){var l=e.multiply(r[s][c],n[c][u]);f=null===f?l:e.add(f,l)}t[s][u]=f}}return m.squeeze(t)}function t(r,n){for(var t=[],i=n.length,o=n[0].length,a=0;o>a;a++){for(var s=null,u=0;i>u;u++){var f=e.multiply(r[u],n[u][a]);s=0===u?f:e.add(s,f)}t[a]=s}return m.squeeze(t)}function i(r,n){for(var t=[],i=r.length,o=r[0].length,a=0;i>a;a++){for(var s=null,u=0;o>u;u++){var f=e.multiply(r[a][u],n[u]);s=0===u?f:e.add(s,f)}t[a]=s}return m.squeeze(t)}function o(r,n){var t=r.length;if(!t)throw new Error("Cannot multiply two empty vectors");for(var i=0,o=0;t>o;o++)i=e.add(i,e.multiply(r[o],n[o]));return i}function a(e,r){return 0==e.im?0==r.im?new f(e.re*r.re,0):0==r.re?new f(0,e.re*r.im):new f(e.re*r.re,e.re*r.im):0==e.re?0==r.im?new f(0,e.im*r.re):0==r.re?new f(-e.im*r.im,0):new f(-e.im*r.im,e.im*r.re):0==r.im?new f(e.re*r.re,e.im*r.re):0==r.re?new f(-e.im*r.im,e.re*r.im):new f(e.re*r.re-e.im*r.im,e.re*r.im+e.im*r.re)}var s=n(128),u=e.type.BigNumber,f=n(5),c=n(8),l=n(9),p=n(11),m=s.array,h=s.number.isNumber,g=s["boolean"].isBoolean,d=f.isComplex,x=_.isArray,w=l.isUnit;e.multiply=function y(n,s){var l;if(2!=arguments.length)throw new e.error.ArgumentsError("multiply",arguments.length,2);if(h(n)){if(h(s))return n*s;if(d(s))return a(new f(n,0),s);if(w(s))return l=s.clone(),l.value=null===l.value?l._normalize(n):l.value*n,l}if(d(n)){if(h(s))return a(n,new f(s,0));if(d(s))return a(n,s)}if(n instanceof u)return h(s)?s=u.convert(s):g(s)&&(s=new u(s?1:0)),s instanceof u?n.times(s):y(n.toNumber(),s);if(s instanceof u)return h(n)?n=u.convert(n):g(n)&&(n=new u(n?1:0)),n instanceof u?n.times(s):y(n,s.toNumber());if(w(n)&&h(s))return l=n.clone(),l.value=null===l.value?l._normalize(s):l.value*s,l;if(x(n)){if(x(s)){var v=m.size(n),b=m.size(s);if(1==v.length){if(1==b.length){if(v[0]!=b[0])throw new RangeError("Dimension mismatch in multiplication. Length of A must match length of B (A is "+v[0]+", B is "+b[0]+v[0]+" != "+b[0]+")");return o(n,s)}if(2==b.length){if(v[0]!=b[0])throw new RangeError("Dimension mismatch in multiplication. Length of A must match rows of B (A is "+v[0]+", B is "+b[0]+"x"+b[1]+", "+v[0]+" != "+b[0]+")");return t(n,s)}throw new Error("Can only multiply a 1 or 2 dimensional matrix (B has "+b.length+" dimensions)")}if(2==v.length){if(1==b.length){if(v[1]!=b[0])throw new RangeError("Dimension mismatch in multiplication. Columns of A must match length of B (A is "+v[0]+"x"+v[0]+", B is "+b[0]+", "+v[1]+" != "+b[0]+")");return i(n,s)}if(2==b.length){if(v[1]!=b[0])throw new RangeError("Dimension mismatch in multiplication. Columns of A must match rows of B (A is "+v[0]+"x"+v[1]+", B is "+b[0]+"x"+b[1]+", "+v[1]+" != "+b[0]+")");return r(n,s)}throw new Error("Can only multiply a 1 or 2 dimensional matrix (B has "+b.length+" dimensions)")}throw new Error("Can only multiply a 1 or 2 dimensional matrix (A has "+v.length+" dimensions)")}return s instanceof c?(l=y(n,s.valueOf()),x(l)?new c(l):l):p.deepMap2(n,s,y)}if(n instanceof c)return s instanceof c?(l=y(n.valueOf(),s.valueOf()),x(l)?new c(l):l):(l=y(n.valueOf(),s),x(l)?new c(l):l);if(x(s))return p.deepMap2(n,s,y);if(s instanceof c)return new c(p.deepMap2(n,s.valueOf(),y));if(g(n))return y(+n,s);if(g(s))return y(n,+s);throw new e.error.UnsupportedTypeError("multiply",e["typeof"](n),e["typeof"](s))}}},function(e,r,n){e.exports=function(e){{var r=n(128),t=n(160),i=e.type.BigNumber,o=n(5),a=n(8),s=n(11),u=r.number.isNumber,f=r["boolean"].isBoolean,c=o.isComplex;s.isCollection}e.norm=function l(r,n){if(arguments.length<1||arguments.length>2)throw new e.error.ArgumentsError("abs",arguments.length,1,2);if(u(r))return Math.abs(r);if(c(r))return Math.sqrt(r.re*r.re+r.im*r.im);if(r instanceof i)return r.abs();if(f(r))return Math.abs(r);if(isArray(r)){var o=t.size(r);if(null==n&&(n=2),1==o.length){if(n===Number.POSITIVE_INFINITY||"inf"===n){var s;return e.forEach(r,function(r){var n=e.abs(r);(!s||e.larger(n,s))&&(s=n)}),s}if(n===Number.NEGATIVE_INFINITY||"-inf"===n){var s;return e.forEach(r,function(r){var n=e.abs(r);(!s||e.smaller(n,s))&&(s=n)}),s}if("fro"===n)return l(r);if(u(n)&&!isNaN(n)){if(!e.equal(n,0)){var s=0;return e.forEach(r,function(r){s=e.add(e.pow(e.abs(r),n),s)}),e.pow(s,1/n)}return Number.POSITIVE_INFINITY}throw new Error("Unsupported parameter value")}if(2==o.length){if(1==n){for(var p=[],m=0;m<r.length;m++)for(var h=r[m],g=0;g<h.length;g++)p[g]=e.add(p[g]||0,e.abs(h[g]));return e.max(p)}if(n==Number.POSITIVE_INFINITY||"inf"===n){for(var s=0,m=0;m<r.length;m++){for(var d=0,h=r[m],g=0;g<h.length;g++)d=e.add(d,e.abs(h[g]));e.larger(d,s)&&(s=d)}return s}if("fro"===n){var x=e.diag(e.multiply(e.transpose(r),r)),w=0;return e.forEach(x,function(r){w=e.add(r,w)}),e.sqrt(w)}if(2==n)throw new Error("Unsupported parameter value, missing implementation of matrix singular value decomposition");throw new Error("Unsupported parameter value")}}if(r instanceof a)return l(r.valueOf(),n);throw new e.error.UnsupportedTypeError("norm",r)}}},function(e,r,n){e.exports=function(e){function r(r,n){var t=e.log(r),i=e.multiply(t,n);return e.exp(i)}var t=n(128),i=e.type.BigNumber,o=n(5),a=n(8),s=(n(11),t.array),u=t.number.isNumber,f=t["boolean"].isBoolean,c=_.isArray,l=t.number.isInteger,p=o.isComplex;e.pow=function m(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("pow",arguments.length,2);if(u(n)){if(u(t))return l(t)||n>=0?Math.pow(n,t):r(new o(n,0),new o(t,0));if(p(t))return r(new o(n,0),t)}if(p(n)){if(u(t))return r(n,new o(t,0));if(p(t))return r(n,t)}if(n instanceof i)return u(t)?t=i.convert(t):f(t)&&(t=new i(t?1:0)),t instanceof i?t.isInteger()&&!n.isNegative()?n.pow(t):m(n.toNumber(),t.toNumber()):m(n.toNumber(),t);if(t instanceof i)return u(n)?n=i.convert(n):f(n)&&(n=new i(n?1:0)),n instanceof i?t.isInteger()&&!n.isNegative()?n.pow(t):m(n.toNumber(),t.toNumber()):m(n,t.toNumber());if(c(n)){if(!u(t)||!l(t)||0>t)throw new TypeError("For A^b, b must be a positive integer (value is "+t+")");var h=s.size(n);if(2!=h.length)throw new Error("For A^b, A must be 2 dimensional (A has "+h.length+" dimensions)");if(h[0]!=h[1])throw new Error("For A^b, A must be square (size is "+h[0]+"x"+h[1]+")");for(var g=e.eye(h[0]).valueOf(),d=n;t>=1;)1==(1&t)&&(g=e.multiply(d,g)),t>>=1,d=e.multiply(d,d);return g}if(n instanceof a)return new a(m(n.valueOf(),t));if(f(n))return m(+n,t);if(f(t))return m(n,+t);throw new e.error.UnsupportedTypeError("pow",e["typeof"](n),e["typeof"](t))}}},function(e,r,n){e.exports=function(e){function r(e,r){var n=Math.pow(10,r);return Math.round(e*n)/n}var t=n(128),i=e.type.BigNumber,o=n(5),a=n(11),s=t.number.isNumber,u=t.number.isInteger,f=t["boolean"].isBoolean,c=o.isComplex,l=a.isCollection;e.round=function p(n,t){if(1!=arguments.length&&2!=arguments.length)throw new e.error.ArgumentsError("round",arguments.length,1,2);if(void 0==t){if(s(n))return Math.round(n);if(c(n))return new o(Math.round(n.re),Math.round(n.im));if(n instanceof i)return n.toDecimalPlaces(0);if(l(n))return a.deepMap(n,p);if(f(n))return Math.round(n);throw new e.error.UnsupportedTypeError("round",e["typeof"](n))}if(!s(t)||!u(t)){if(!(t instanceof i)){if(f(t))return p(n,+t);throw new TypeError("Number of decimals in function round must be an integer")}t=parseFloat(t.valueOf())}if(0>t||t>15)throw new Error("Number of decimals in function round must be in te range of 0-15");if(s(n))return r(n,t);if(c(n))return new o(r(n.re,t),r(n.im,t));if(n instanceof i)return n.toDecimalPlaces(t);if(l(n)||l(t))return a.deepMap2(n,t,p);if(f(n))return p(+n,t);throw new e.error.UnsupportedTypeError("round",e["typeof"](n),e["typeof"](t))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number,s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isCollection;e.sign=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sign",arguments.length,1);if(s(r))return a.sign(r);if(f(r)){var n=Math.sqrt(r.re*r.re+r.im*r.im);return new i(r.re/n,r.im/n)}if(r instanceof t)return new t(r.cmp(0));if(c(r))return o.deepMap(r,l);if(u(r))return a.sign(r);throw new e.error.UnsupportedTypeError("sign",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.sqrt=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sqrt",arguments.length,1);if(a(r))return r>=0?Math.sqrt(r):c(new i(r,0));if(u(r)){var n=Math.sqrt(r.re*r.re+r.im*r.im);return r.im>=0?new i(.5*Math.sqrt(2*(n+r.re)),.5*Math.sqrt(2*(n-r.re))):new i(.5*Math.sqrt(2*(n+r.re)),-.5*Math.sqrt(2*(n-r.re)))
}if(r instanceof t)return r.isNegative()?c(r.toNumber()):r.sqrt();if(f(r))return o.deepMap(r,c);if(s(r))return c(+r);throw new e.error.UnsupportedTypeError("sqrt",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.square=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("square",arguments.length,1);if(a(r))return r*r;if(u(r))return e.multiply(r,r);if(r instanceof t)return r.times(r);if(f(r))return o.deepMap(r,c);if(s(r))return r*r;throw new e.error.UnsupportedTypeError("square",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=(n(8),n(9)),a=n(11),s=r["boolean"].isBoolean,u=r.number.isNumber,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.subtract=function p(r,n){if(2!=arguments.length)throw new e.error.ArgumentsError("subtract",arguments.length,2);if(u(r)){if(u(n))return r-n;if(f(n))return new i(r-n.re,-n.im)}else if(f(r)){if(u(n))return new i(r.re-n,r.im);if(f(n))return new i(r.re-n.re,r.im-n.im)}if(r instanceof t)return u(n)?n=t.convert(n):s(n)&&(n=new t(n?1:0)),n instanceof t?r.minus(n):p(r.toNumber(),n);if(n instanceof t)return u(r)?r=t.convert(r):s(r)&&(r=new t(r?1:0)),r instanceof t?r.minus(n):p(r,n.toNumber());if(c(r)&&c(n)){if(null==r.value)throw new Error("Parameter x contains a unit with undefined value");if(null==n.value)throw new Error("Parameter y contains a unit with undefined value");if(!r.equalBase(n))throw new Error("Units do not match");var o=r.clone();return o.value-=n.value,o.fixPrefix=!1,o}if(l(r)||l(n))return a.deepMap2(r,n,p);if(s(r))return p(+r,n);if(s(n))return p(r,+n);throw new e.error.UnsupportedTypeError("subtract",e["typeof"](r),e["typeof"](n))}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(5),a=n(9),s=n(11),u=t.number.isNumber,f=t["boolean"].isBoolean,c=t.string.isString,l=o.isComplex,p=a.isUnit,m=s.isCollection;e.unaryMinus=function h(n){if(1!=arguments.length)throw new e.error.ArgumentsError("unaryMinus",arguments.length,1);if(u(n))return-n;if(l(n))return new o(-n.re,-n.im);if(n instanceof i)return n.neg();if(p(n)){var t=n.clone();return t.value=-n.value,t}if(m(n))return s.deepMap(n,h);if(f(n)||c(n))return"bignumber"==r.number?new i(-n):-n;throw new e.error.UnsupportedTypeError("unaryMinus",e["typeof"](n))},e.unary=function(){throw new Error("Function unary is deprecated. Use unaryMinus instead.")}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(5),a=n(9),s=n(11),u=t.number.isNumber,f=t["boolean"].isBoolean,c=t.string.isString,l=o.isComplex,p=a.isUnit,m=s.isCollection;e.unaryPlus=function h(n){if(1!=arguments.length)throw new e.error.ArgumentsError("unaryPlus",arguments.length,1);if(u(n))return n;if(l(n))return n.clone();if(n instanceof i)return n;if(p(n))return n.clone();if(m(n))return s.deepMap(n,h);if(f(n)||c(n))return"bignumber"==r.number?new i(+n):+n;throw new e.error.UnsupportedTypeError("unaryPlus",e["typeof"](n))}}},function(e,r,n){e.exports=function(e){function r(e,r){for(var n,t,i,o=0,a=1,s=1,u=0;r;)t=Math.floor(e/r),i=e%r,n=o,o=a-t*o,a=n,n=s,s=u-t*s,u=n,e=r,r=i;return 0>e?[-e,-a,-u]:[e,e?a:0,u]}var t=n(128),i=e.type.BigNumber,o=t.number.isNumber,a=t["boolean"].isBoolean,s=t.number.isInteger;e.xgcd=function u(n,t){if(2==arguments.length){if(o(n)&&o(t)){if(!s(n)||!s(t))throw new Error("Parameters in function xgcd must be integer numbers");return r(n,t)}if(n instanceof i)return u(n.toNumber(),t);if(t instanceof i)return u(n,t.toNumber());if(a(n))return u(+n,t);if(a(t))return u(n,+t);throw new e.error.UnsupportedTypeError("xgcd",e["typeof"](n),e["typeof"](t))}throw new SyntaxError("Function xgcd expects two arguments")}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(5),a=n(9),s=n(11),u=t.number.isNumber,f=t.number.nearlyEqual,c=t["boolean"].isBoolean,l=t.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.compare=function g(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("compare",arguments.length,2);if(u(n)&&u(t))return f(n,t,r.epsilon)?0:n>t?1:-1;if(n instanceof i)return u(t)?t=i.convert(t):c(t)&&(t=new i(t?1:0)),t instanceof i?new i(n.cmp(t)):g(n.toNumber(),t);if(t instanceof i)return u(n)?n=i.convert(n):c(n)&&(n=new i(n?1:0)),n instanceof i?new i(n.cmp(t)):g(n,t.toNumber());if(m(n)&&m(t)){if(!n.equalBase(t))throw new Error("Cannot compare units with different base");return n.value>t.value?1:n.value<t.value?-1:0}if(h(n)||h(t))return s.deepMap2(n,t,g);if(l(n)||l(t))return n>t?1:t>n?-1:0;if(c(n))return g(+n,t);if(c(t))return g(n,+t);if(p(n)||p(t))throw new TypeError("No ordering relation is defined for complex numbers");throw new e.error.UnsupportedTypeError("compare",e["typeof"](n),e["typeof"](t))}}},function(e,r,n){e.exports=function(e){function r(n,t){if(o(n)){if(o(t)){var i=n.length;if(i!==t.length)return!1;for(var a=0;i>a;a++)if(!r(n[a],t[a]))return!1;return!0}return!1}return o(t)?!1:e.equal(n,t)}var t=n(11),i=t.isCollection,o=_.isArray;e.deepEqual=function(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("deepEqual",arguments.length,2);return i(n)||i(t)?r(n.valueOf(),t.valueOf()):e.equal(n,t)}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(5),a=n(9),s=n(11),u=t.number.isNumber,f=t.number.nearlyEqual,c=t["boolean"].isBoolean,l=t.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.equal=function g(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("equal",arguments.length,2);if(u(n)){if(u(t))return f(n,t,r.epsilon);if(p(t))return f(n,t.re,r.epsilon)&&f(t.im,0,r.epsilon)}if(p(n)){if(u(t))return f(n.re,t,r.epsilon)&&f(n.im,0,r.epsilon);if(p(t))return f(n.re,t.re,r.epsilon)&&f(n.im,t.im,r.epsilon)}if(n instanceof i)return u(t)?t=i.convert(t):c(t)&&(t=new i(t?1:0)),t instanceof i?n.eq(t):g(n.toNumber(),t);if(t instanceof i)return u(n)?n=i.convert(n):c(n)&&(n=new i(n?1:0)),n instanceof i?n.eq(t):g(n,t.toNumber());if(m(n)&&m(t)){if(!n.equalBase(t))throw new Error("Cannot compare units with different base");return n.value==t.value}if(h(n)||h(t))return s.deepMap2(n,t,g);if(l(n)||l(t))return n==t;if(c(n))return g(+n,t);if(c(t))return g(n,+t);if(null===n)return null===t;if(null===t)return null===n;if(void 0===n)return void 0===t;if(void 0===t)return void 0===n;throw new e.error.UnsupportedTypeError("equal",e["typeof"](n),e["typeof"](t))}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(5),a=n(9),s=n(11),u=t.number.isNumber,f=t.number.nearlyEqual,c=t["boolean"].isBoolean,l=t.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.larger=function g(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("larger",arguments.length,2);if(u(n)&&u(t))return!f(n,t,r.epsilon)&&n>t;if(n instanceof i)return u(t)?t=i.convert(t):c(t)&&(t=new i(t?1:0)),t instanceof i?n.gt(t):g(n.toNumber(),t);if(t instanceof i)return u(n)?n=i.convert(n):c(n)&&(n=new i(n?1:0)),n instanceof i?n.gt(t):g(n,t.toNumber());if(m(n)&&m(t)){if(!n.equalBase(t))throw new Error("Cannot compare units with different base");return n.value>t.value}if(h(n)||h(t))return s.deepMap2(n,t,g);if(l(n)||l(t))return n>t;if(c(n))return g(+n,t);if(c(t))return g(n,+t);if(p(n)||p(t))throw new TypeError("No ordering relation is defined for complex numbers");throw new e.error.UnsupportedTypeError("larger",e["typeof"](n),e["typeof"](t))}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(5),a=n(9),s=n(11),u=t.number.isNumber,f=t.number.nearlyEqual,c=t["boolean"].isBoolean,l=t.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.largerEq=function g(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("largerEq",arguments.length,2);if(u(n)&&u(t))return f(n,t,r.epsilon)||n>t;if(n instanceof i)return u(t)?t=i.convert(t):c(t)&&(t=new i(t?1:0)),t instanceof i?n.gte(t):g(n.toNumber(),t);if(t instanceof i)return u(n)?n=i.convert(n):c(n)&&(n=new i(n?1:0)),n instanceof i?n.gte(t):g(n,t.toNumber());if(m(n)&&m(t)){if(!n.equalBase(t))throw new Error("Cannot compare units with different base");return n.value>=t.value}if(h(n)||h(t))return s.deepMap2(n,t,g);if(l(n)||l(t))return n>=t;if(c(n))return g(+n,t);if(c(t))return g(n,+t);if(p(n)||p(t))throw new TypeError("No ordering relation is defined for complex numbers");throw new e.error.UnsupportedTypeError("largerEq",e["typeof"](n),e["typeof"](t))},e.largereq=function(){throw new Error("Function largereq is renamed to largerEq")}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(5),a=n(9),s=n(11),u=t.number.isNumber,f=t.number.nearlyEqual,c=t["boolean"].isBoolean,l=t.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.smaller=function g(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("smaller",arguments.length,2);if(u(n)&&u(t))return!f(n,t,r.epsilon)&&t>n;if(n instanceof i)return u(t)?t=i.convert(t):c(t)&&(t=new i(t?1:0)),t instanceof i?n.lt(t):g(n.toNumber(),t);if(t instanceof i)return u(n)?n=i.convert(n):c(n)&&(n=new i(n?1:0)),n instanceof i?n.lt(t):g(n,t.toNumber());if(m(n)&&m(t)){if(!n.equalBase(t))throw new Error("Cannot compare units with different base");return n.value<t.value}if(h(n)||h(t))return s.deepMap2(n,t,g);if(l(n)||l(t))return t>n;if(c(n))return g(+n,t);if(c(t))return g(n,+t);if(p(n)||p(t))throw new TypeError("No ordering relation is defined for complex numbers");throw new e.error.UnsupportedTypeError("smaller",e["typeof"](n),e["typeof"](t))}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(5),a=n(9),s=n(11),u=t.number.isNumber,f=t.number.nearlyEqual,c=t["boolean"].isBoolean,l=t.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.smallerEq=function g(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("smallerEq",arguments.length,2);if(u(n)&&u(t))return f(n,t,r.epsilon)||t>n;if(n instanceof i)return u(t)?t=i.convert(t):c(t)&&(t=new i(t?1:0)),t instanceof i?n.lte(t):g(n.toNumber(),t);if(t instanceof i)return u(n)?n=i.convert(n):c(n)&&(n=new i(n?1:0)),n instanceof i?n.lte(t):g(n,t.toNumber());if(m(n)&&m(t)){if(!n.equalBase(t))throw new Error("Cannot compare units with different base");return n.value<=t.value}if(h(n)||h(t))return s.deepMap2(n,t,g);if(l(n)||l(t))return t>=n;if(c(n))return g(+n,t);if(c(t))return g(n,+t);if(p(n)||p(t))throw new TypeError("No ordering relation is defined for complex numbers");throw new e.error.UnsupportedTypeError("smallerEq",e["typeof"](n),e["typeof"](t))},e.smallereq=function(){throw new Error("Function smallereq is renamed to smallerEq")}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(5),a=n(9),s=n(11),u=t.number.isNumber,f=t.number.nearlyEqual,c=t["boolean"].isBoolean,l=t.string.isString,p=o.isComplex,m=a.isUnit,h=s.isCollection;e.unequal=function g(n,t){if(2!=arguments.length)throw new e.error.ArgumentsError("unequal",arguments.length,2);if(u(n)){if(u(t))return!f(n,t,r.epsilon);if(p(t))return!f(n,t.re,r.epsilon)||!f(t.im,0,r.epsilon)}if(p(n)){if(u(t))return!f(n.re,t,r.epsilon)||!f(n.im,0,r.epsilon);if(p(t))return!f(n.re,t.re,r.epsilon)||!f(n.im,t.im,r.epsilon)}if(n instanceof i)return u(t)?t=i.convert(t):c(t)&&(t=new i(t?1:0)),t instanceof i?!n.eq(t):g(n.toNumber(),t);if(t instanceof i)return u(n)?n=i.convert(n):c(n)&&(n=new i(n?1:0)),n instanceof i?!n.eq(t):g(n,t.toNumber());if(m(n)&&m(t)){if(!n.equalBase(t))throw new Error("Cannot compare units with different base");return n.value!=t.value}if(h(n)||h(t))return s.deepMap2(n,t,g);if(l(n)||l(t))return n!=t;if(c(n))return g(+n,t);if(c(t))return g(n,+t);if(null===n)return null!==t;if(null===t)return null!==n;if(void 0===n)return void 0!==t;if(void 0===t)return void 0!==n;throw new e.error.UnsupportedTypeError("unequal",e["typeof"](n),e["typeof"](t))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=o.isCollection,f=i.isComplex;e.arg=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("arg",arguments.length,1);if(a(r))return Math.atan2(0,r);if(f(r))return Math.atan2(r.im,r.re);if(u(r))return o.deepMap(r,c);if(s(r))return c(+r);if(r instanceof t)return c(r.toNumber());throw new e.error.UnsupportedTypeError("arg",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.object,s=r.number.isNumber,u=r["boolean"].isBoolean,f=o.isCollection,c=i.isComplex;e.conj=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("conj",arguments.length,1);return s(r)?r:r instanceof t?new t(r):c(r)?new i(r.re,-r.im):f(r)?o.deepMap(r,l):u(r)?+r:a.clone(r)}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.object,s=r.number.isNumber,u=r["boolean"].isBoolean,f=o.isCollection,c=i.isComplex;e.re=function l(r){if(1!=arguments.length)throw new e.error.ArgumentsError("re",arguments.length,1);return s(r)?r:r instanceof t?new t(r):c(r)?r.re:f(r)?o.deepMap(r,l):u(r)?+r:a.clone(r)}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=o.isCollection,f=i.isComplex;e.im=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("im",arguments.length,1);return a(r)?0:r instanceof t?new t(0):f(r)?r.im:u(r)?o.deepMap(r,c):s(r)?0:0}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(11),o=i.isCollection,a=r.number.isNumber,s=r.string.isString,u=r["boolean"].isBoolean;e.bignumber=function f(r){if(arguments.length>1)throw new e.error.ArgumentsError("bignumber",arguments.length,0,1);if(r instanceof t||a(r)||s(r))return new t(r);if(u(r))return new t(+r);if(o(r))return i.deepMap(r,f);if(0==arguments.length)return new t(0);throw new e.error.UnsupportedTypeError("bignumber",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(11),o=i.isCollection,a=r.number.isNumber,s=r.string.isString;e["boolean"]=function u(r){if(1!=arguments.length)throw new e.error.ArgumentsError("boolean",arguments.length,0,1);if("true"===r||r===!0)return!0;if("false"===r||r===!1)return!1;if(r instanceof Boolean)return 1==r;if(a(r))return 0!==r;if(r instanceof t)return!r.isZero();if(s(r)){var n=r.toLowerCase();if("true"===n)return!0;if("false"===n)return!1;var f=Number(r);if(""!=r&&!isNaN(f))return 0!==f}if(o(r))return i.deepMap(r,u);throw new SyntaxError(r.toString()+" is no valid boolean")}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=o.isCollection,s=r.number.isNumber,u=r.string.isString,f=i.isComplex;e.complex=function c(){switch(arguments.length){case 0:return new i(0,0);case 1:var r=arguments[0];if(s(r))return new i(r,0);if(r instanceof t)return new i(r.toNumber(),0);if(f(r))return r.clone();if(u(r)){var n=i.parse(r);if(n)return n;throw new SyntaxError('String "'+r+'" is no valid complex number')}if(a(r))return o.deepMap(r,c);if("object"==typeof r){if("re"in r&&"im"in r)return new i(r.re,r.im);if("r"in r&&"phi"in r)return i.fromPolar(r.r,r.phi)}throw new TypeError("Two numbers, single string or an fitting object expected in function complex");case 2:var l=arguments[0],p=arguments[1];if(l instanceof t&&(l=l.toNumber()),p instanceof t&&(p=p.toNumber()),s(l)&&s(p))return new i(l,p);throw new TypeError("Two numbers or a single string expected in function complex");default:throw new e.error.ArgumentsError("complex",arguments.length,0,2)}}}},function(e,r,n){e.exports=function(e){var r=(n(128),e.type.BigNumber),t=n(7);e.index=function(){var e=new t,n=Array.prototype.slice.apply(arguments).map(function(e){return e instanceof r?e.toNumber():_.isArray(e)?e.map(function(e){return e instanceof r?e.toNumber():e}):e});return t.apply(e,n),e}}},function(e,r,n){e.exports=function(e){var r=(n(128),n(8));e.matrix=function(n){if(arguments.length>1)throw new e.error.ArgumentsError("matrix",arguments.length,0,1);return new r(n)}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(11),o=i.isCollection,a=r.number.isNumber,s=r["boolean"].isBoolean,u=r.string.isString;e.number=function f(r){switch(arguments.length){case 0:return 0;case 1:if(o(r))return i.deepMap(r,f);if(r instanceof t)return r.toNumber();if(u(r)){var n=Number(r);if(isNaN(n)&&(n=Number(r.valueOf())),isNaN(n))throw new SyntaxError(r.toString()+" is no valid number");return n}if(s(r))return r+0;if(a(r))return r;throw new e.error.UnsupportedTypeError("number",e["typeof"](r));default:throw new e.error.ArgumentsError("number",arguments.length,0,1)}}}},function(e,r,n){e.exports=function(e){var r=n(13);e.parser=function(){return new r(e)}}},function(e){e.exports=function(e){e.select=function(r){return new e.chaining.Selector(r)}}},function(e,r,n){e.exports=function(e){var r=n(128),t=n(11),i=r.number,o=r.number.isNumber,a=t.isCollection;e.string=function s(r){switch(arguments.length){case 0:return"";case 1:return o(r)?i.format(r):a(r)?t.deepMap(r,s):null===r?"null":r.toString();default:throw new e.error.ArgumentsError("string",arguments.length,0,1)}}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(9),o=n(11),a=o.isCollection,s=r.string.isString;e.unit=function u(r){switch(arguments.length){case 1:var n=arguments[0];if(n instanceof i)return n.clone();if(s(n)){if(i.isValuelessUnit(n))return new i(null,n);var f=i.parse(n);if(f)return f;throw new SyntaxError('String "'+n+'" is no valid unit')}if(a(r))return o.deepMap(r,u);throw new TypeError("A string or a number and string expected in function unit");case 2:return arguments[0]instanceof t?new i(arguments[0].toNumber(),arguments[1]):new i(arguments[0],arguments[1]);default:throw new e.error.ArgumentsError("unit",arguments.length,1,2)}}}},function(e,r,n){e.exports=function(e){function r(n,t,i,o){if(i>o){if(n.length!=t.length)throw new e.error.DimensionError(n.length,t.length);for(var a=[],s=0;s<n.length;s++)a[s]=r(n[s],t[s],i,o+1);return a}return n.concat(t)}var t=n(128),i=n(8),o=n(11),a=t.object,s=t.array,u=t.number.isNumber,f=t.number.isInteger,c=o.isCollection;e.concat=function(){var n,t,o=arguments.length,l=-1,p=!1,m=[];for(n=0;o>n;n++){var h=arguments[n];if(h instanceof i&&(p=!0),n==o-1&&u(h)){if(t=l,l=h,!f(l)||0>l)throw new TypeError("Dimension number must be a positive integer (dim = "+l+")");if(n>0&&l>t)throw new e.error.DimensionError(l,t,">")}else{if(!c(h))throw new e.error.UnsupportedTypeError("concat",e["typeof"](h));var g=a.clone(h).valueOf(),d=s.size(h.valueOf());if(m[n]=g,t=l,l=d.length-1,n>0&&l!=t)throw new e.error.DimensionError(l,t)}}if(0==m.length)throw new SyntaxError("At least one matrix expected");for(var x=m.shift();m.length;)x=r(x,m.shift(),l,0);return p?new i(x):x}}},function(e,r,n){e.exports=function(e){function r(r,n){function t(r){var n,t,i=new Array(r.length),o=0;for(n=1;n<r.length;n++)o=e.add(o,r[n][n]);for(n=0;n<r.length;n++){for(i[n]=new Array(r.length),i[n][n]=e.unaryMinus(o),t=0;n>t;t++)i[n][t]=0;for(t=n+1;t<r.length;t++)i[n][t]=r[n][t];n+1<r.length&&(o=e.subtract(o,r[n+1][n+1]))}return i}if(1==n)return o.clone(r[0][0]);if(2==n)return e.subtract(e.multiply(r[0][0],r[1][1]),e.multiply(r[1][0],r[0][1]));for(var i=r,a=0;n-1>a;a++)i=e.multiply(t(i),r);return n%2==0?e.unaryMinus(i[0][0]):i[0][0]}var t=n(128),i=n(8),o=t.object,a=t.string;e.det=function(n){if(1!=arguments.length)throw new e.error.ArgumentsError("det",arguments.length,1);var t;switch(n instanceof i?t=n.size():n instanceof Array?(n=new i(n),t=n.size()):t=[],t.length){case 0:return o.clone(n);case 1:if(1==t[0])return o.clone(n.valueOf()[0]);throw new RangeError("Matrix must be square (size: "+a.format(t)+")");case 2:var s=t[0],u=t[1];if(s==u)return r(n.clone().valueOf(),s,u);throw new RangeError("Matrix must be square (size: "+a.format(t)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+a.format(t)+")")}}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(8),o=r.object,a=r.array.isArray,s=r.number.isNumber,u=r.number.isInteger;e.diag=function(r,n){var f,c,l,p;if(1!=arguments.length&&2!=arguments.length)throw new e.error.ArgumentsError("diag",arguments.length,1,2);if(n){if(n instanceof t&&(n=n.toNumber()),!s(n)||!u(n))throw new TypeError("Second parameter in function diag must be an integer")}else n=0;var m,h=n>0?n:0,g=0>n?-n:0;if(r instanceof i)m=!1;else{if(!a(r))throw new TypeError("First parameter in function diag must be a Matrix or Array");r=new i(r),m=!0}var d=r.size();switch(d.length){case 1:c=r.valueOf();var x=new i,w=c[0]instanceof t?new t(0):0;for(x.resize([c.length+g,c.length+h],w),f=x.valueOf(),p=c.length,l=0;p>l;l++)f[l+g][l+h]=o.clone(c[l]);return m?x.valueOf():x;case 2:for(c=[],f=r.valueOf(),p=Math.min(d[0]-g,d[1]-h),l=0;p>l;l++)c[l]=o.clone(f[l+g][l+h]);return m?c:new i(c);default:throw new RangeError("Matrix for function diag must be 2 dimensional")}}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(8),a=n(11),s=t.number.isNumber,u=t.number.isInteger,f=_.isArray;e.eye=function(n){var t=a.argsToArray(arguments),c=n instanceof o?!0:f(n)?!1:"matrix"===r.matrix;if(0==t.length)return c?new o:[];if(1==t.length)t[1]=t[0];else if(t.length>2)throw new e.error.ArgumentsError("eye",t.length,0,2);var l=t[0],p=t[1];if(l instanceof i&&(l=l.toNumber()),p instanceof i&&(p=p.toNumber()),!s(l)||!u(l)||1>l)throw new Error("Parameters in function eye must be positive integers");if(!s(p)||!u(p)||1>p)throw new Error("Parameters in function eye must be positive integers");var m=!1;t=t.map(function(e){return e instanceof i?(m=!0,e.toNumber()):e});var h=new o,g=m?new i(1):1,d=m?new i(0):0;h.resize(t,d);for(var x=e.min(t),w=h.valueOf(),y=0;x>y;y++)w[y][y]=g;return c?h:h.valueOf()}}},function(e,r,n){e.exports=function(e){function r(r,n,t){var i,o,a,s,u;if(1==n){if(s=r[0][0],0==s)throw Error("Cannot calculate inverse, determinant is zero");return[[e.divide(1,s)]]}if(2==n){var f=e.det(r);if(0==f)throw Error("Cannot calculate inverse, determinant is zero");return[[e.divide(r[1][1],f),e.divide(e.unaryMinus(r[0][1]),f)],[e.divide(e.unaryMinus(r[1][0]),f),e.divide(r[0][0],f)]]}var c=r.concat();for(i=0;n>i;i++)c[i]=c[i].concat();for(var l=e.eye(n).valueOf(),p=0;t>p;p++){for(i=p;n>i&&0==c[i][p];)i++;if(i==n||0==c[i][p])throw Error("Cannot calculate inverse, determinant is zero");i!=p&&(u=c[p],c[p]=c[i],c[i]=u,u=l[p],l[p]=l[i],l[i]=u);var m=c[p],h=l[p];for(i=0;n>i;i++){var g=c[i],d=l[i];if(i!=p){if(0!=g[p]){for(a=e.divide(e.unaryMinus(g[p]),m[p]),o=p;t>o;o++)g[o]=e.add(g[o],e.multiply(a,m[o]));for(o=0;t>o;o++)d[o]=e.add(d[o],e.multiply(a,h[o]))}}else{for(a=m[p],o=p;t>o;o++)g[o]=e.divide(g[o],a);for(o=0;t>o;o++)d[o]=e.divide(d[o],a)}}}return l}var t=n(128),i=t.string,o=n(8);e.inv=function(n){if(1!=arguments.length)throw new e.error.ArgumentsError("inv",arguments.length,1);var t=e.size(n).valueOf();switch(t.length){case 0:return e.divide(1,n);case 1:if(1==t[0])return n instanceof o?new o([e.divide(1,n.valueOf()[0])]):[e.divide(1,n[0])];throw new RangeError("Matrix must be square (size: "+i.format(t)+")");case 2:var a=t[0],s=t[1];if(a==s)return n instanceof o?new o(r(n.valueOf(),a,s)):r(n,a,s);throw new RangeError("Matrix must be square (size: "+i.format(t)+")");default:throw new RangeError("Matrix must be two dimensional (size: "+i.format(t)+")")}}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(8),a=n(11),s=t.array,u=_.isArray;e.ones=function(e){var n=a.argsToArray(arguments),t=e instanceof o?!0:u(e)?!1:"matrix"===r.matrix;if(0==n.length)return t?new o:[];var f=!1;n=n.map(function(e){return e instanceof i?(f=!0,e.toNumber()):e});var c=[],l=f?new i(1):1;return c=s.resize(c,n,l),t?new o(c):c}}},function(e,r,n){e.exports=function(e,r){function t(e,r,n){var t=[],i=e;if(n>0)for(;r>i;)t.push(i),i+=n;else if(0>n)for(;i>r;)t.push(i),i+=n;return t}function i(e,r,n){var t=[],i=e;if(n>0)for(;r>=i;)t.push(i),i+=n;else if(0>n)for(;i>=r;)t.push(i),i+=n;return t}function o(e,r,n){var t=[],i=e.clone(),o=new f(0);if(n.gt(o))for(;i.lt(r);)t.push(i),i=i.plus(n);else if(n.lt(o))for(;i.gt(r);)t.push(i),i=i.plus(n);return t}function a(e,r,n){var t=[],i=e.clone(),o=new f(0);if(n.gt(o))for(;i.lte(r);)t.push(i),i=i.plus(n);else if(n.lt(o))for(;i.gte(r);)t.push(i),i=i.plus(n);return t}function s(e){var n=e.split(":"),t=null;if("bignumber"===r.number)try{t=n.map(function(e){return new f(e)})}catch(i){return null}else{t=n.map(function(e){return Number(e)});var o=t.some(function(e){return isNaN(e)});if(o)return null}switch(t.length){case 2:return{start:t[0],end:t[1],step:1};case 3:return{start:t[0],end:t[2],step:t[1]};default:return null}}var u=n(128),f=e.type.BigNumber,c=n(8),l=(n(11),u["boolean"].isBoolean),p=u.string.isString,m=u.number.isNumber;e.range=function(){var n,u,h,g=Array.prototype.slice.call(arguments),d=!1;switch(l(g[g.length-1])&&(d=g.pop()?!0:!1),g.length){case 1:if(!p(g[0]))throw new TypeError("Two or three numbers or a single string expected in function range");var x=s(g[0]);if(!x)throw new SyntaxError('String "'+g[0]+'" is no valid range');n=x.start,u=x.end,h=x.step;break;case 2:n=g[0],u=g[1],h=1;break;case 3:n=g[0],u=g[1],h=g[2];break;case 4:throw new TypeError("Parameter includeEnd must be a boolean");default:throw new e.error.ArgumentsError("range",arguments.length,2,4)}if(!(m(n)||n instanceof f))throw new TypeError("Parameter start must be a number");if(!(m(u)||u instanceof f))throw new TypeError("Parameter end must be a number");if(!(m(h)||h instanceof f))throw new TypeError("Parameter step must be a number");if(n instanceof f||u instanceof f||h instanceof f){var w=!0;n instanceof f||(n=f.convert(n)),u instanceof f||(u=f.convert(u)),h instanceof f||(h=f.convert(h)),n instanceof f&&u instanceof f&&h instanceof f||(w=!1,n instanceof f&&(n=n.toNumber()),u instanceof f&&(u=u.toNumber()),h instanceof f&&(h=h.toNumber()))}var y=w?d?a:o:d?i:t,v=y(n,u,h);return"array"===r.matrix?v:new c(v)}}},function(e,r,n){e.exports=function(e,r){function t(r,n,t){if(void 0!==t){if(!c(t)||1!==t.length)throw new TypeError("Single character expected as defaultValue")}else t=" ";if(1!==n.length)throw new e.error.DimensionError(n.length,1);var i=n[0];if(!l(i)||!p(i))throw new TypeError("Invalid size, must contain positive integers (size: "+f.format(n)+")");if(r.length>i)return r.substring(0,i);if(r.length<i){for(var o=r,a=0,s=i-r.length;s>a;a++)o+=t;return o}return r}var i=n(128),o=e.type.BigNumber,a=n(8),s=i.array,u=i.object.clone,f=i.string,c=i.string.isString,l=i.number.isNumber,p=i.number.isInteger,m=_.isArray;e.resize=function(n,i,f){if(2!=arguments.length&&3!=arguments.length)throw new e.error.ArgumentsError("resize",arguments.length,2,3);var l=n instanceof a?!0:m(n)?!1:"array"!==r.matrix;if(n instanceof a&&(n=n.valueOf()),i instanceof a&&(i=i.valueOf()),i.length&&i[0]instanceof o&&(i=i.map(function(e){return e instanceof o?e.toNumber():e})),c(n))return t(n,i,f);if(0==i.length){for(;m(n);)n=n[0];return u(n)}m(n)||(n=[n]),n=u(n);var p=s.resize(n,i,f);return l?new a(p):p}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(5),a=n(9),s=n(8),u=t.array,f=t.number.isNumber,c=t["boolean"].isBoolean,l=t.string.isString,p=o.isComplex,m=a.isUnit;e.size=function(n){if(1!=arguments.length)throw new e.error.ArgumentsError("size",arguments.length,1);var t="array"===r.matrix;if(f(n)||p(n)||m(n)||c(n)||null==n||n instanceof i)return t?[]:new s([]);if(l(n))return t?[n.length]:new s([n.length]);if(_.isArray(n))return u.size(n);if(n instanceof s)return new s(n.size());throw new e.error.UnsupportedTypeError("size",e["typeof"](n))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=n(8),i=r.object,o=r.array,a=_.isArray;e.squeeze=function(r){if(1!=arguments.length)throw new e.error.ArgumentsError("squeeze",arguments.length,1);if(a(r))return o.squeeze(i.clone(r));if(r instanceof t){var n=o.squeeze(r.toArray());return a(n)?new t(n):n}return i.clone(r)}}},function(e,r,n){e.exports=function(e){function r(r,n){var i,o;if(l(r))return i=new s(r),o=i.subset(n),o.valueOf();if(r instanceof s)return r.subset(n);if(c(r))return t(r,n);throw new e.error.UnsupportedTypeError("subset",e["typeof"](r))}function t(r,n){if(!(n instanceof u))throw new TypeError("Index expected");if(1!=n.size().length)throw new e.error.DimensionError(n.size().length,1);var t=n.range(0),i="",o=r.length;return t.forEach(function(e){f.validateIndex(e,o),i+=r.charAt(e)}),i}function i(r,n,t,i){var a;if(l(r))return a=new s(e.clone(r)),a.subset(n,t,i),a.valueOf();if(r instanceof s)return r.clone().subset(n,t,i);if(c(r))return o(r,n,t,i);throw new e.error.UnsupportedTypeError("subset",e["typeof"](r))}function o(r,n,t,i){if(!(n instanceof u))throw new TypeError("Index expected");if(1!=n.size().length)throw new e.error.DimensionError(n.size().length,1);if(void 0!==i){if(!c(i)||1!==i.length)throw new TypeError("Single character expected as defaultValue")}else i=" ";var o=n.range(0),a=o.size()[0];if(a!=t.length)throw new e.error.DimensionError(o.size()[0],t.length);for(var s=r.length,l=[],p=0;s>p;p++)l[p]=r.charAt(p);if(o.forEach(function(e,r){f.validateIndex(e),l[e]=t.charAt(r)}),l.length>s)for(p=s-1,a=l.length;a>p;p++)l[p]||(l[p]=i);return l.join("")}var a=n(128),s=n(8),u=n(7),f=a.array,c=a.string.isString,l=_.isArray;e.subset=function(){switch(arguments.length){case 2:return r(arguments[0],arguments[1]);case 3:case 4:return i(arguments[0],arguments[1],arguments[2],arguments[3]);default:throw new e.error.ArgumentsError("subset",arguments.length,2,4)}}}},function(e,r,n){e.exports=function(e){var r=n(128),t=n(8),i=r.object,o=r.string;e.transpose=function(r){if(1!=arguments.length)throw new e.error.ArgumentsError("transpose",arguments.length,1);var n=e.size(r).valueOf();switch(n.length){case 0:return i.clone(r);case 1:return i.clone(r);case 2:var a,s=n[1],u=n[0],f=r instanceof t,c=r.valueOf(),l=[],p=i.clone;if(0===s)throw new RangeError("Cannot transpose a 2D matrix with no rows(size: "+o.format(n)+")");for(var m=0;s>m;m++){a=l[m]=[];for(var h=0;u>h;h++)a[h]=p(c[h][m])}return f?new t(l):l;default:throw new RangeError("Matrix must be two dimensional (size: "+o.format(n)+")")}}}},function(e,r,n){e.exports=function(e,r){var t=n(128),i=e.type.BigNumber,o=n(8),a=n(11),s=t.array,u=_.isArray;e.zeros=function(e){var n=a.argsToArray(arguments),t=e instanceof o?!0:u(e)?!1:"matrix"===r.matrix;if(0==n.length)return t?new o:[];var f=!1;n=n.map(function(e){return e instanceof i?(f=!0,e.toNumber()):e});var c=[],l=f?new i(0):0;return c=s.resize(c,n,l),t?new o(c):c}}},function(e,r,n){e.exports=function(e){var r=n(8),t=n(160),i=n(11),o=i.isCollection;e.distribution=function(n){if(!a.hasOwnProperty(n))throw new Error("Unknown distribution "+n);var i=Array.prototype.slice.call(arguments,1),s=a[n].apply(this,i);return function(n){var i={random:function(n,t,i){var s,f,c;if(arguments.length>3)throw new e.error.ArgumentsError("random",arguments.length,0,3);if(1===arguments.length?o(n)?s=n:c=n:2===arguments.length?o(n)?(s=n,c=t):(f=n,c=t):(s=n,f=t,c=i),void 0===c&&(c=1),void 0===f&&(f=0),void 0!==s){var l=u(s.valueOf(),f,c,a);return s instanceof r?new r(l):l}return a(f,c)},randomInt:function(n,t,i){var a,f,c;if(arguments.length>3||arguments.length<1)throw new e.error.ArgumentsError("randomInt",arguments.length,1,3);if(1===arguments.length?o(n)?a=n:c=n:2===arguments.length?o(n)?(a=n,c=t):(f=n,c=t):(a=n,f=t,c=i),void 0===f&&(f=0),void 0!==a){var l=u(a.valueOf(),f,c,s);return a instanceof r?new r(l):l}return s(f,c)},pickRandom:function(n){if(1!==arguments.length)throw new e.error.ArgumentsError("pickRandom",arguments.length,1);if(n instanceof r)n=n.valueOf();else if(!_.isArray(n))throw new e.error.UnsupportedTypeError("pickRandom",e["typeof"](n));if(t.size(n).length>1)throw new e.error.DimensionError("Only one dimensional vectors supported");return n[Math.floor(Math.random()*n.length)]}},a=function(e,r){return e+n()*(r-e)},s=function(e,r){return Math.floor(e+n()*(r-e))},u=function(e,r,n,t){var i,o,a=[];
    if(e=e.slice(0),e.length>1)for(o=0,i=e.shift();i>o;o++)a.push(u(e,r,n,t));else for(o=0,i=e.shift();i>o;o++)a.push(t(r,n));return a};return i}(s)};var a={uniform:function(){return Math.random},normal:function(){return function(){for(var e,r,n=-1;0>n||n>1;)e=Math.random(),r=Math.random(),n=1/6*Math.pow(-2*Math.log(e),.5)*Math.cos(2*Math.PI*r)+.5;return n}}}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(11),o=r.number.isNumber,a=r["boolean"].isBoolean,s=r.number.isInteger,u=i.isCollection;e.factorial=function c(r){var n,l;if(1!=arguments.length)throw new e.error.ArgumentsError("factorial",arguments.length,1);if(o(r)){if(!s(r)||0>r)throw new TypeError("Positive integer value expected in function factorial");for(n=r-1,l=r;n>1;)l*=n,n--;return 0==l&&(l=1),l}if(r instanceof t){if(!f(r))throw new TypeError("Positive integer value expected in function factorial");var p=new t(1);for(n=r.minus(p),l=r;n.gt(p);)l=l.times(n),n=n.minus(p);return l.equals(0)&&(l=p),l}if(a(r))return 1;if(u(r))return i.deepMap(r,c);throw new e.error.UnsupportedTypeError("factorial",e["typeof"](r))};var f=function(e){return e.isInteger()&&e.gte(0)}}},function(e){e.exports=function(e){e.random=e.distribution("uniform").random}},function(e){e.exports=function(e){e.randomInt=e.distribution("uniform").randomInt}},function(e){e.exports=function(e){e.distribution("uniform");e.pickRandom=e.distribution("uniform").pickRandom}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=r.number.isNumber,o=r.number.isInteger;e.permutations=function(r,n){var s,u,f=arguments.length;if(f>2)throw new e.error.ArgumentsError("permutations",arguments.length,2);if(i(r)){if(!o(r)||0>r)throw new TypeError("Positive integer value expected in function permutations");if(1==f)return e.factorial(r);if(2==f&&i(n)){if(!o(n)||0>n)throw new TypeError("Positive integer value expected in function permutations");if(n>r)throw new TypeError("second argument k must be less than or equal to first argument n");for(s=1,u=r-n+1;r>=u;u++)s*=u;return s}}if(r instanceof t){if(void 0===n&&a(r))return e.factorial(r);if(n=t.convert(n),!(n instanceof t&&a(r)&&a(n)))throw new TypeError("Positive integer value expected in function permutations");if(n.gt(r))throw new TypeError("second argument k must be less than or equal to first argument n");for(s=new t(1),u=r.minus(n).plus(1);u.lte(r);u=u.plus(1))s=s.times(u);return s}throw new e.error.UnsupportedTypeError("permutations",e["typeof"](r))};var a=function(e){return e.isInteger()&&e.gte(0)}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=(n(11),r.number.isNumber),o=r.number.isInteger;e.combinations=function(r,n){var s,u,f,c,l=arguments.length;if(2!=l)throw new e.error.ArgumentsError("combinations",arguments.length,2);if(i(r)){if(!o(r)||0>r)throw new TypeError("Positive integer value enpected in function combinations");if(n>r)throw new TypeError("k must be less than or equal to n");for(s=Math.max(n,r-n),u=1,f=1;r-s>=f;f++)u=u*(s+f)/f;return u}if(r instanceof t){if(n=t.convert(n),!(n instanceof t&&a(r)&&a(n)))throw new TypeError("Positive integer value expected in function combinations");if(n.gt(r))throw new TypeError("k must be less than n in function combinations");for(s=r.minus(n),n.lt(s)&&(s=n),u=new t(1),f=new t(1),c=r.minus(s);f.lte(c);f=f.plus(1))u=u.times(s.plus(f)).dividedBy(f);return u}throw new e.error.UnsupportedTypeError("combinations",e["typeof"](r))};var a=function(e){return e.isInteger()&&e.gte(0)}}},function(e,r,n){e.exports=function(e){function r(r,n){return e.smaller(r,n)?r:n}function t(r){var n=void 0;if(i.deepForEach(r,function(r){(void 0===n||e.smaller(r,n))&&(n=r)}),void 0===n)throw new Error("Cannot calculate min of an empty array");return n}var i=(n(8),n(11)),o=i.isCollection;e.min=function(e){if(0==arguments.length)throw new SyntaxError("Function min requires one or more parameters (0 provided)");if(o(e)){if(1==arguments.length)return t(e);if(2==arguments.length)return i.reduce(arguments[0],arguments[1],r);throw new SyntaxError("Wrong number of parameters")}return t(arguments)}}},function(e,r,n){e.exports=function(e){function r(r,n){return e.larger(r,n)?r:n}function t(r){var n=void 0;if(i.deepForEach(r,function(r){(void 0===n||e.larger(r,n))&&(n=r)}),void 0===n)throw new Error("Cannot calculate max of an empty array");return n}var i=(n(8),n(11)),o=i.isCollection;e.max=function(e){if(0==arguments.length)throw new SyntaxError("Function max requires one or more parameters (0 provided)");if(o(e)){if(1==arguments.length)return t(e);if(2==arguments.length)return i.reduce(arguments[0],arguments[1],r);throw new SyntaxError("Wrong number of parameters")}return t(arguments)}}},function(e,r,n){e.exports=function(e){function r(r,n){var t;return t=i.reduce(r,n,e.add),e.divide(t,a(r)[n])}function t(r){var n=0,t=0;if(i.deepForEach(r,function(r){n=e.add(n,r),t++}),0===t)throw new Error("Cannot calculate mean of an empty array");return e.divide(n,t)}var i=(n(8),n(11)),o=i.isCollection,a=n(160).size;e.mean=function(e){if(0==arguments.length)throw new SyntaxError("Function mean requires one or more parameters (0 provided)");if(o(e)){if(1==arguments.length)return t(e);if(2==arguments.length)return r(arguments[0],arguments[1]);throw new SyntaxError("Wrong number of parameters")}return t(arguments)}}},function(e,r,n){e.exports=function(e){function r(r){var n=u(r);n.sort(e.compare);var o=n.length;if(0==o)throw new Error("Cannot calculate median of an empty array");if(o%2==0){var s=n[o/2-1],f=n[o/2];if(!(a(s)||s instanceof i||s instanceof t))throw new e.error.UnsupportedTypeError("median",e["typeof"](s));if(!(a(f)||f instanceof i||f instanceof t))throw new e.error.UnsupportedTypeError("median",e["typeof"](f));return e.divide(e.add(s,f),2)}var c=n[(o-1)/2];if(!(a(c)||c instanceof i||c instanceof t))throw new e.error.UnsupportedTypeError("median",e["typeof"](c));return c}var t=(n(8),n(9)),i=e.type.BigNumber,o=n(11),a=n(161).isNumber,s=o.isCollection,u=n(160).flatten;e.median=function(e){if(0==arguments.length)throw new SyntaxError("Function median requires one or more parameters (0 provided)");if(s(e)){if(1==arguments.length)return r(e.valueOf());throw 2==arguments.length?new Error("median(A, dim) is not yet supported"):new SyntaxError("Wrong number of parameters")}return r(Array.prototype.slice.call(arguments))}}},function(e,r,n){e.exports=function(e){function r(r){var n=void 0;if(t.deepForEach(r,function(r){n=void 0===n?r:e.multiply(n,r)}),void 0===n)throw new Error("Cannot calculate prod of an empty array");return n}var t=(n(8),n(11)),i=t.isCollection;e.prod=function(e){if(0==arguments.length)throw new SyntaxError("Function prod requires one or more parameters (0 provided)");if(i(e)){if(1==arguments.length)return r(e);throw 2==arguments.length?new Error("prod(A, dim) is not yet supported"):new SyntaxError("Wrong number of parameters")}return r(arguments)}}},function(e){e.exports=function(e){e.std=function(){if(0==arguments.length)throw new SyntaxError("Function std requires one or more parameters (0 provided)");var r=e["var"].apply(null,arguments);return e.sqrt(r)}}},function(e,r,n){e.exports=function(e){function r(r){var n=void 0;if(t.deepForEach(r,function(r){n=void 0===n?r:e.add(n,r)}),void 0===n)throw new Error("Cannot calculate sum of an empty array");return n}var t=(n(8),n(11)),i=t.isCollection;e.sum=function(e){if(0==arguments.length)throw new SyntaxError("Function sum requires one or more parameters (0 provided)");if(i(e)){if(1==arguments.length)return r(e);throw 2==arguments.length?new Error("sum(A, dim) is not yet supported"):new SyntaxError("Wrong number of parameters")}return r(arguments)}}},function(e,r,n){e.exports=function(e){function r(r,n){var o=0,a=0;if(i.deepForEach(r,function(r){o=e.add(o,r),a++}),0===a)throw new Error("Cannot calculate var of an empty array");var s=e.divide(o,a);switch(o=0,i.deepForEach(r,function(r){var n=e.subtract(r,s);o=e.add(o,e.multiply(n,n))}),n){case"uncorrected":return e.divide(o,a);case"biased":return e.divide(o,a+1);case"unbiased":var u=o instanceof t?new t(0):0;return 1==a?u:e.divide(o,a-1);default:throw new Error('Unknown normalization "'+n+'". Choose "unbiased" (default), "uncorrected", or "biased".')}}var t=(n(8),e.type.BigNumber),i=n(11),o=i.isCollection,a=n(142).isString,s="unbiased";e["var"]=function(e,n){if(0==arguments.length)throw new SyntaxError("Function var requires one or more parameters (0 provided)");if(o(e)){if(1==arguments.length)return r(e,s);if(2==arguments.length){if(!a(n))throw new Error("String expected for parameter normalization");return r(e,n)}throw new SyntaxError("Wrong number of parameters")}return r(arguments,s)}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.acos=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("acos",arguments.length,1);if(a(r))return r>=-1&&1>=r?Math.acos(r):c(new i(r,0));if(u(r)){var n=new i(r.im*r.im-r.re*r.re+1,-2*r.re*r.im),l=e.sqrt(n),p=new i(l.re-r.im,l.im+r.re),m=e.log(p);return new i(1.5707963267948966-m.im,m.re)}if(f(r))return o.deepMap(r,c);if(s(r))return Math.acos(r);if(r instanceof t)return c(r.toNumber());throw new e.error.UnsupportedTypeError("acos",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.asin=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("asin",arguments.length,1);if(a(r))return r>=-1&&1>=r?Math.asin(r):c(new i(r,0));if(u(r)){var n=r.re,l=r.im,p=new i(l*l-n*n+1,-2*n*l),m=e.sqrt(p),h=new i(m.re-l,m.im+n),g=e.log(h);return new i(g.im,-g.re)}if(f(r))return o.deepMap(r,c);if(s(r))return Math.asin(r);if(r instanceof t)return c(r.toNumber());throw new e.error.UnsupportedTypeError("asin",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=i.isComplex,f=o.isCollection;e.atan=function c(r){if(1!=arguments.length)throw new e.error.ArgumentsError("atan",arguments.length,1);if(a(r))return Math.atan(r);if(u(r)){var n=r.re,l=r.im,p=n*n+(1-l)*(1-l),m=new i((1-l*l-n*n)/p,-2*n/p),h=e.log(m);return new i(-.5*h.im,.5*h.re)}if(f(r))return o.deepMap(r,c);if(s(r))return Math.atan(r);if(r instanceof t)return c(r.toNumber());throw new e.error.UnsupportedTypeError("atan",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(11),a=r.number.isNumber,s=r["boolean"].isBoolean,u=(i.isComplex,o.isCollection);e.atan2=function f(r,n){if(2!=arguments.length)throw new e.error.ArgumentsError("atan2",arguments.length,2);if(a(r)&&a(n))return Math.atan2(r,n);if(u(r)||u(n))return o.deepMap2(r,n,f);if(s(r))return f(+r,n);if(s(n))return f(r,+n);if(r instanceof t)return f(r.toNumber(),n);if(n instanceof t)return f(r,n.toNumber());throw new e.error.UnsupportedTypeError("atan2",e["typeof"](r),e["typeof"](n))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.cos=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("cos",arguments.length,1);if(s(r))return Math.cos(r);if(f(r))return new i(.5*Math.cos(r.re)*(Math.exp(-r.im)+Math.exp(r.im)),.5*Math.sin(r.re)*(Math.exp(-r.im)-Math.exp(r.im)));if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cos is no angle");return Math.cos(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return Math.cos(r);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("cos",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.cosh=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("cosh",arguments.length,1);if(s(r))return(Math.exp(r)+Math.exp(-r))/2;if(f(r)){var n=Math.exp(r.re),m=Math.exp(-r.re);return new i(Math.cos(r.im)*(n+m)/2,Math.sin(r.im)*(n-m)/2)}if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cosh is no angle");return p(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return p(r?1:0);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("cosh",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.cot=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("cot",arguments.length,1);if(s(r))return 1/Math.tan(r);if(f(r)){var n=Math.exp(-4*r.im)-2*Math.exp(-2*r.im)*Math.cos(2*r.re)+1;return new i(2*Math.exp(-2*r.im)*Math.sin(2*r.re)/n,(Math.exp(-4*r.im)-1)/n)}if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cot is no angle");return 1/Math.tan(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return p(+r);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("cot",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.coth=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("coth",arguments.length,1);if(s(r)){var n=Math.exp(2*r);return(n+1)/(n-1)}if(f(r)){var m=Math.exp(2*r.re),h=m*Math.cos(2*r.im),g=m*Math.sin(2*r.im),d=(h-1)*(h-1)+g*g;return new i(((h+1)*(h-1)+g*g)/d,-2*g/d)}if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function coth is no angle");return p(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return p(r?1:0);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("coth",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.csc=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("csc",arguments.length,1);if(s(r))return 1/Math.sin(r);if(f(r)){var n=.25*(Math.exp(-2*r.im)+Math.exp(2*r.im))-.5*Math.cos(2*r.re);return new i(.5*Math.sin(r.re)*(Math.exp(-r.im)+Math.exp(r.im))/n,.5*Math.cos(r.re)*(Math.exp(-r.im)-Math.exp(r.im))/n)}if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csc is no angle");return 1/Math.sin(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return p(+r);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("csc",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number,u=r.number.isNumber,f=r["boolean"].isBoolean,c=i.isComplex,l=o.isUnit,p=a.isCollection;e.csch=function m(r){if(1!=arguments.length)throw new e.error.ArgumentsError("csch",arguments.length,1);if(u(r))return 0==r?Number.NaN:Math.abs(2/(Math.exp(r)-Math.exp(-r)))*s.sign(r);if(c(r)){var n=Math.exp(r.re),h=Math.exp(-r.re),g=Math.cos(r.im)*(n-h),d=Math.sin(r.im)*(n+h),x=g*g+d*d;return new i(2*g/x,-2*d/x)}if(l(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csch is no angle");return m(r.value)}if(p(r))return a.deepMap(r,m);if(f(r))return m(r?1:0);if(r instanceof t)return m(r.toNumber());throw new e.error.UnsupportedTypeError("csch",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.sec=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sec",arguments.length,1);if(s(r))return 1/Math.cos(r);if(f(r)){var n=.25*(Math.exp(-2*r.im)+Math.exp(2*r.im))+.5*Math.cos(2*r.re);return new i(.5*Math.cos(r.re)*(Math.exp(-r.im)+Math.exp(r.im))/n,.5*Math.sin(r.re)*(Math.exp(r.im)-Math.exp(-r.im))/n)}if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sec is no angle");return 1/Math.cos(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return p(+r);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("sec",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.sech=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sech",arguments.length,1);if(s(r))return 2/(Math.exp(r)+Math.exp(-r));if(f(r)){var n=Math.exp(r.re),m=Math.exp(-r.re),h=Math.cos(r.im)*(n+m),g=Math.sin(r.im)*(n-m),d=h*h+g*g;return new i(2*h/d,-2*g/d)}if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sech is no angle");return p(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return p(r?1:0);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("sech",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.sin=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sin",arguments.length,1);if(s(r))return Math.sin(r);if(f(r))return new i(.5*Math.sin(r.re)*(Math.exp(-r.im)+Math.exp(r.im)),.5*Math.cos(r.re)*(Math.exp(r.im)-Math.exp(-r.im)));if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sin is no angle");return Math.sin(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return Math.sin(r);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("sin",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.sinh=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("sinh",arguments.length,1);if(s(r))return(Math.exp(r)-Math.exp(-r))/2;if(f(r)){var n=Math.cos(r.im),m=Math.sin(r.im),h=Math.exp(r.re),g=Math.exp(-r.re);return new i(n*(h-g)/2,m*(h+g)/2)}if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sinh is no angle");return p(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return p(r?1:0);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("sinh",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.tan=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("tan",arguments.length,1);if(s(r))return Math.tan(r);if(f(r)){var n=Math.exp(-4*r.im)+2*Math.exp(-2*r.im)*Math.cos(2*r.re)+1;return new i(2*Math.exp(-2*r.im)*Math.sin(2*r.re)/n,(1-Math.exp(-4*r.im))/n)}if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tan is no angle");return Math.tan(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return Math.tan(r);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("tan",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=e.type.BigNumber,i=n(5),o=n(9),a=n(11),s=r.number.isNumber,u=r["boolean"].isBoolean,f=i.isComplex,c=o.isUnit,l=a.isCollection;e.tanh=function p(r){if(1!=arguments.length)throw new e.error.ArgumentsError("tanh",arguments.length,1);if(s(r)){var n=Math.exp(2*r);return(n-1)/(n+1)}if(f(r)){var m=Math.exp(2*r.re),h=m*Math.cos(2*r.im),g=m*Math.sin(2*r.im),d=(h+1)*(h+1)+g*g;return new i(((h-1)*(h+1)+g*g)/d,2*g/d)}if(c(r)){if(!r.hasBase(o.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tanh is no angle");return p(r.value)}if(l(r))return a.deepMap(r,p);if(u(r))return p(r?1:0);if(r instanceof t)return p(r.toNumber());throw new e.error.UnsupportedTypeError("tanh",e["typeof"](r))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=n(9),i=n(11),o=r.string.isString,a=t.isUnit,s=i.isCollection;e.to=function u(r,n){if(2!=arguments.length)throw new e.error.ArgumentsError("to",arguments.length,2);if(a(r)&&(a(n)||o(n)))return r.to(n);if(s(r)||s(n))return i.deepMap2(r,n,u);throw new e.error.UnsupportedTypeError("to",e["typeof"](r),e["typeof"](n))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=r.object;e.clone=function(r){if(1!=arguments.length)throw new e.error.ArgumentsError("clone",arguments.length,1);return t.clone(r)}}},function(e,r,n){e.exports=function(e){var r=n(128),t=r.string;e.format=function(r,n){var i=arguments.length;if(1!==i&&2!==i)throw new e.error.ArgumentsError("format",i,1,2);return t.format(r,n)}}},function(e,r,n){e.exports=function(e){function r(r,n,t){(t.override||void 0===e[r])&&(e[r]=t.wrap&&"function"==typeof n?function(){for(var r=[],t=0,i=arguments.length;i>t;t++){var o=arguments[t];r[t]=o&&o.valueOf()}return n.apply(e,r)}:n,e.chaining.Selector.createProxy(r,n))}function t(e){return"function"==typeof e||s(e)||u(e)||f(e)||c(e)}var i=n(128),o=n(5),a=n(9),s=i.number.isNumber,u=i.string.isString,f=o.isComplex,c=a.isUnit;e["import"]=function l(o,a){var s=arguments.length;if(1!=s&&2!=s)throw new e.error.ArgumentsError("import",s,1,2);var f,c={override:!1,wrap:!0};if(a&&a instanceof Object&&i.object.extend(c,a),u(o)){var p=n(162)(o);l(p)}else{if("object"!=typeof o)throw new TypeError("Object or module name expected");for(f in o)if(o.hasOwnProperty(f)){var m=o[f];t(m)?r(f,m,c):l(m)}}}}},function(e,r,n){e.exports=function(e){function r(e,r){var n=[],t=function(i,o){return _.isArray(i)?i.map(function(e,r){return n[o]=r,t(e,o+1)}):r(i,n,e)};return t(e,0)}var t=n(8).isMatrix;e.map=function(n,i){if(2!=arguments.length)throw new e.error.ArgumentsError("map",arguments.length,2);if(_.isArray(n))return r(n,i);if(t(n))return n.map(i);throw new e.error.UnsupportedTypeError("map",e["typeof"](n))}}},function(e,r,n){e.exports=function(e){var r=n(128),t=r.string.isString;e.print=function(r,n,i){var o=arguments.length;if(2!=o&&3!=o)throw new e.error.ArgumentsError("print",o,2,3);if(!t(r))throw new TypeError("String expected as first parameter in function format");if(!(n instanceof Object))throw new TypeError("Object expected as second parameter in function format");return r.replace(/\$([\w\.]+)/g,function(r,o){for(var a=o.split("."),s=n[a.shift()];a.length&&void 0!==s;){var u=a.shift();s=u?s[u]:s+"."}return void 0!==s?t(s)?s:e.format(s,i):r})}}},function(e,r,n){e.exports=function(e){var r=n(163),t=n(5),i=n(8),o=n(9),a=n(7),s=n(6),u=n(10);e["typeof"]=function(n){if(1!=arguments.length)throw new e.error.ArgumentsError("typeof",arguments.length,1);var f=r.type(n);if("object"===f){if(n instanceof t)return"complex";if(n instanceof i)return"matrix";if(n instanceof o)return"unit";if(n instanceof a)return"index";if(n instanceof s)return"range";if(n instanceof u)return"help";if(n instanceof e.type.BigNumber)return"bignumber";if(n instanceof e.chaining.Selector)return"selector"}return f}}},function(e,r,n){e.exports=function(e){function r(e,r){var n=[],t=function(i,o){_.isArray(i)?i.forEach(function(e,r){n[o]=r,t(e,o+1)}):r(i,n,e)};t(e,0)}var t=n(8).isMatrix;e.forEach=function(n,i){if(2!=arguments.length)throw new e.error.ArgumentsError("forEach",arguments.length,2);if(_.isArray(n))return r(n,i);if(t(n))return n.forEach(i);throw new e.error.UnsupportedTypeError("forEach",e["typeof"](n))}}},function(e){e.exports="0.25.0"},function(e,r,n){var t;!function(i){"use strict";function o(e){for(var r,n,t=1,i=e.length,o=e[0]+"";i>t;t++){for(r=e[t]+"",n=A-r.length;n--;)r="0"+r;o+=r}for(i=o.length;"0"==o.charAt(--i););return o.slice(0,i+1||1)}function a(e,r,n,t){var i,o,a,s,u;for(o=1,a=e[0];a>=10;a/=10,o++);return a=r-o,0>a?(a+=A,i=0):(i=Math.ceil((a+1)/A),a%=A),o=N(10,A-a),u=e[i]%o|0,null==t?3>a?(0==a?u=u/100|0:1==a&&(u=u/10|0),s=4>n&&99999==u||n>3&&49999==u||5e4==u||0==u):s=(4>n&&u+1==o||n>3&&u+1==o/2)&&(e[i+1]/o/100|0)==N(10,a-2)-1||(u==o/2||0==u)&&0==(e[i+1]/o/100|0):4>a?(0==a?u=u/1e3|0:1==a?u=u/100|0:2==a&&(u=u/10|0),s=(t||4>n)&&9999==u||!t&&n>3&&4999==u):s=((t||4>n)&&u+1==o||!t&&n>3&&u+1==o/2)&&(e[i+1]/o/1e3|0)==N(10,a-3)-1,s}function s(e,r,n){var t=e.constructor;return null==r||((w=0>r||r>8)||0!==r&&(t.errors?parseInt:parseFloat)(r)!=r)&&!p(t,"rounding mode",r,n,0)?t.rounding:0|r}function u(e,r,n,t){var i=e.constructor;return!(w=(t||0)>r||r>=U+1)&&(0===r||(i.errors?parseInt:parseFloat)(r)==r)||p(i,"argument",r,n,0)}function f(e,r){var n,t,i,s,u,f,c,l=0,p=0,m=0,h=e.constructor,d=h.ONE,x=h.rounding,w=h.precision;if(!e.c||!e.c[0]||e.e>17)return new h(e.c?e.c[0]?e.s<0?0:1/0:d:e.s?e.s<0?0:e:0/0);for(null==r?(v=!1,u=w):u=r,c=new h(.03125);e.e>-2;)e=e.times(c),m+=5;for(t=Math.log(N(2,m))/Math.LN10*2+5|0,u+=t,n=s=f=new h(d),h.precision=u;;){if(s=g(s.times(e),u,1),n=n.times(++p),c=f.plus(z(s,n,u,1)),o(c.c).slice(0,u)===o(f.c).slice(0,u)){for(i=m;i--;)f=g(f.times(f),u,1);if(null!=r)return h.precision=w,f;if(!(3>l&&a(f.c,u-t,x,l)))return g(f,h.precision=w,x,v=!0);h.precision=u+=10,n=s=c=new h(d),p=0,l++}f=c}}function c(e,r,n,t){var i,a,s=e.constructor,u=(e=new s(e)).e;if(null==r?n=0:(g(e,++r,n),n=t?r:r+e.e-u),u=e.e,i=o(e.c),1==t||2==t&&(u>=r||u<=s.toExpNeg)){for(;i.length<n;i+="0");i.length>1&&(i=i.charAt(0)+"."+i.slice(1)),i+=(0>u?"e":"e+")+u}else{if(t=i.length,0>u){for(a=n-t;++u;i="0"+i);i="0."+i}else if(++u>t){for(a=n-u,u-=t;u--;i+="0");a>0&&(i+=".")}else a=n-t,t>u?i=i.slice(0,u)+"."+i.slice(u):a>0&&(i+=".");if(a>0)for(;a--;i+="0");}return e.s<0&&e.c[0]?"-"+i:i}function l(e){var r=e.length-1,n=r*A+1;if(r=e[r]){for(;r%10==0;r/=10,n--);for(r=e[0];r>=10;r/=10,n++);}return n}function p(e,r,n,t,i){if(e.errors){var o=new Error((t||["new Decimal","cmp","div","eq","gt","gte","lt","lte","minus","mod","plus","times","toFraction","pow","random","log","sqrt","toNearest","divToInt"][b?0>b?-b:b:0>1/b?1:0])+"() "+(["number type has more than 15 significant digits","LN10 out of digits"][r]||r+([w?" out of range":" not an integer"," not a boolean or binary digit"][i]||""))+": "+n);throw o.name="Decimal Error",w=b=0,o}}function m(e,r,n){var t=new e(e.ONE);for(v=!1;1&n&&(t=t.times(r)),n>>=1,n;)r=r.times(r);return v=!0,t}function h(e,r){var n,t,i,s,u,f,c,l,m,d,x,w=1,y=10,b=e,E=b.c,N=b.constructor,M=N.ONE,T=N.rounding,A=N.precision;if(b.s<0||!E||!E[0]||!b.e&&1==E[0]&&1==E.length)return new N(E&&!E[0]?-1/0:1!=b.s?0/0:E?0:b);if(null==r?(v=!1,c=A):c=r,N.precision=c+=y,n=o(E),t=n.charAt(0),!(Math.abs(s=b.e)<15e14))return b=new N(t+"."+n.slice(1)),c+2>B.length&&p(N,1,c+2,"ln"),b=h(b,c-y).plus(new N(B.slice(0,c+2)).times(s+"")),N.precision=A,null==r?g(b,A,T,v=!0):b;for(;7>t&&1!=t||1==t&&n.charAt(1)>3;)b=b.times(e),n=o(b.c),t=n.charAt(0),w++;for(s=b.e,t>1?(b=new N("0."+n),s++):b=new N(t+"."+n.slice(1)),d=b,l=u=b=z(b.minus(M),b.plus(M),c,1),x=g(b.times(b),c,1),i=3;;){if(u=g(u.times(x),c,1),m=l.plus(z(u,new N(i),c,1)),o(m.c).slice(0,c)===o(l.c).slice(0,c)){if(l=l.times(2),0!==s&&(c+2>B.length&&p(N,1,c+2,"ln"),l=l.plus(new N(B.slice(0,c+2)).times(s+""))),l=z(l,new N(w),c,1),null!=r)return N.precision=A,l;if(!a(l.c,c-y,T,f))return g(l,N.precision=A,T,v=!0);N.precision=c+=y,m=u=b=z(d.minus(M),d.plus(M),c,1),x=g(b.times(b),c,1),i=f=1}l=m,i+=2}}function g(e,r,n,t){var i,o,a,s,u,f,c,l,p=e.constructor;e:if(r!=o){if(!(c=e.c))return e;for(i=1,s=c[0];s>=10;s/=10,i++);if(o=r-i,0>o)o+=A,a=r,u=c[l=0],f=u/N(10,i-a-1)%10|0;else if(l=Math.ceil((o+1)/A),l>=c.length){if(!t)break e;for(;c.length<=l;c.push(0));u=f=0,i=1,o%=A,a=o-A+1}else{for(u=s=c[l],i=1;s>=10;s/=10,i++);o%=A,a=o-A+i,f=0>a?0:E(u/N(10,i-a-1)%10)}if(t=t||0>r||null!=c[l+1]||(0>a?u:u%N(10,i-a-1)),t=4>n?(f||t)&&(0==n||n==(e.s<0?3:2)):f>5||5==f&&(4==n||t||6==n&&(o>0?a>0?u/N(10,i-a):0:c[l-1])%10&1||n==(e.s<0?8:7)),1>r||!c[0])return c.length=0,t?(r-=e.e+1,c[0]=N(10,r%A),e.e=-r||0):c[0]=e.e=0,e;if(0==o?(c.length=l,s=1,l--):(c.length=l+1,s=N(10,A-o),c[l]=a>0?(u/N(10,i-a)%N(10,a)|0)*s:0),t)for(;;){if(0==l){for(o=1,a=c[0];a>=10;a/=10,o++);for(a=c[0]+=s,s=1;a>=10;a/=10,s++);o!=s&&(e.e++,c[0]==T&&(c[0]=1));break}if(c[l]+=s,c[l]!=T)break;c[l--]=0,s=1}for(o=c.length;0===c[--o];c.pop());}return v&&(e.e>p.maxE?e.c=e.e=null:e.e<p.minE&&(e.c=[e.e=0])),e}var d,x,w,y=i.crypto,v=!0,b=0,E=Math.floor,N=Math.pow,M=Object.prototype.toString,T=1e7,A=7,O="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_",S={},C=9e15,U=1e9,q=3e3,B="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";S.absoluteValue=S.abs=function(){var e=new this.constructor(this);return e.s<0&&(e.s=1),g(e)},S.ceil=function(){return g(new this.constructor(this),this.e+1,2)},S.comparedTo=S.cmp=function(e,r){var n,t=this,i=t.c,o=(b=-b,e=new t.constructor(e,r),e.c),a=t.s,s=e.s,u=t.e,f=e.e;if(!a||!s)return null;if(n=i&&!i[0],r=o&&!o[0],n||r)return n?r?0:-s:a;if(a!=s)return a;if(n=0>a,!i||!o)return u==f?0:!i^n?1:-1;if(u!=f)return u>f^n?1:-1;for(a=-1,s=(u=i.length)<(f=o.length)?u:f;++a<s;)if(i[a]!=o[a])return i[a]>o[a]^n?1:-1;return u==f?0:u>f^n?1:-1},S.decimalPlaces=S.dp=function(){var e,r,n=null;if(e=this.c){if(n=((r=e.length-1)-E(this.e/A))*A,r=e[r])for(;r%10==0;r/=10,n--);0>n&&(n=0)}return n},S.dividedBy=S.div=function(e,r){return b=2,z(this,new this.constructor(e,r))},S.dividedToIntegerBy=S.divToInt=function(e,r){var n=this,t=n.constructor;return b=18,g(z(n,new t(e,r),0,1,1),t.precision,t.rounding)},S.equals=S.eq=function(e,r){return b=3,0===this.cmp(e,r)},S.exponential=S.exp=function(){return f(this)},S.floor=function(){return g(new this.constructor(this),this.e+1,3)},S.greaterThan=S.gt=function(e,r){return b=4,this.cmp(e,r)>0},S.greaterThanOrEqualTo=S.gte=function(e,r){return b=5,r=this.cmp(e,r),1==r||0===r},S.isFinite=function(){return!!this.c},S.isInteger=S.isInt=function(){return!!this.c&&E(this.e/A)>this.c.length-2},S.isNaN=function(){return!this.s},S.isNegative=S.isNeg=function(){return this.s<0},S.isZero=function(){return!!this.c&&0==this.c[0]},S.lessThan=S.lt=function(e,r){return b=6,this.cmp(e,r)<0},S.lessThanOrEqualTo=S.lte=function(e,r){return b=7,r=this.cmp(e,r),-1==r||0===r},S.logarithm=S.log=function(e,r){var n,t,i,s,u,f,c,l,m,d=this,x=d.constructor,w=x.precision,y=x.rounding,E=5;if(null==e)e=new x(10),n=!0;else{if(b=15,e=new x(e,r),t=e.c,e.s<0||!t||!t[0]||!e.e&&1==t[0]&&1==t.length)return new x(0/0);n=e.eq(10)}if(t=d.c,d.s<0||!t||!t[0]||!d.e&&1==t[0]&&1==t.length)return new x(t&&!t[0]?-1/0:1!=d.s?0/0:t?0:1/0);if(u=n&&(s=t[0],t.length>1||1!=s&&10!=s&&100!=s&&1e3!=s&&1e4!=s&&1e5!=s&&1e6!=s),v=!1,c=w+E,l=c+10,f=h(d,c),n?(l>B.length&&p(x,1,l,"log"),i=new x(B.slice(0,l))):i=h(e,c),m=z(f,i,c,1),a(m.c,s=w,y))do if(c+=10,f=h(d,c),n?(l=c+10,l>B.length&&p(x,1,l,"log"),i=new x(B.slice(0,l))):i=h(e,c),m=z(f,i,c,1),!u){+o(m.c).slice(s+1,s+15)+1==1e14&&(m=g(m,w+1,0));break}while(a(m.c,s+=10,y));return v=!0,g(m,w,y)},S.minus=function(e,r){var n,t,i,o,a=this,s=a.constructor,u=a.s;if(b=8,e=new s(e,r),r=e.s,!u||!r)return new s(0/0);if(u!=r)return e.s=-r,a.plus(e);var f=a.c,c=e.c,l=E(e.e/A),p=E(a.e/A),m=s.precision,h=s.rounding;if(!p||!l){if(!f||!c)return f?(e.s=-r,e):new s(c?a:0/0);
    if(!f[0]||!c[0])return a=c[0]?(e.s=-r,e):new s(f[0]?a:3==h?-0:0),v?g(a,m,h):a}if(f=f.slice(),t=f.length,u=p-l){for((o=0>u)?(u=-u,n=f,t=c.length):(l=p,n=c),(p=Math.ceil(m/A))>t&&(t=p),u>(t+=2)&&(u=t,n.length=1),n.reverse(),r=u;r--;n.push(0));n.reverse()}else for((o=t<(i=c.length))&&(i=t),u=r=0;i>r;r++)if(f[r]!=c[r]){o=f[r]<c[r];break}if(o&&(n=f,f=c,c=n,e.s=-e.s),(r=-((i=f.length)-c.length))>0)for(;r--;f[i++]=0);for(p=T-1,r=c.length;r>u;){if(f[--r]<c[r]){for(t=r;t&&!f[--t];f[t]=p);--f[t],f[r]+=T}f[r]-=c[r]}for(;0==f[--i];f.pop());for(;0==f[0];f.shift(),--l);for(f[0]||(f=[l=0],e.s=3==h?-1:1),e.c=f,u=1,r=f[0];r>=10;r/=10,u++);return e.e=u+l*A-1,v?g(e,m,h):e},S.modulo=S.mod=function(e,r){var n,t,i=this,o=i.constructor,a=o.modulo;return b=9,e=new o(e,r),r=e.s,n=!i.c||!r||e.c&&!e.c[0],n||!e.c||i.c&&!i.c[0]?n?new o(0/0):g(new o(i),o.precision,o.rounding):(v=!1,9==a?(e.s=1,t=z(i,e,0,3,1),e.s=r,t.s*=r):t=z(i,e,0,a,1),t=t.times(e),v=!0,i.minus(t))},S.naturalLogarithm=S.ln=function(){return h(this)},S.negated=S.neg=function(){var e=new this.constructor(this);return e.s=-e.s||null,g(e)},S.plus=function(e,r){var n,t=this,i=t.constructor,o=t.s;if(b=10,e=new i(e,r),r=e.s,!o||!r)return new i(0/0);if(o!=r)return e.s=-r,t.minus(e);var a=t.c,s=e.c,u=E(e.e/A),f=E(t.e/A),c=i.precision,l=i.rounding;if(!f||!u){if(!a||!s)return new i(o/0);if(!a[0]||!s[0])return t=s[0]?e:new i(a[0]?t:0*o),v?g(t,c,l):t}if(a=a.slice(),o=f-u){for(0>o?(o=-o,n=a,r=s.length):(u=f,n=s,r=a.length),(f=Math.ceil(c/A))>r&&(r=f),o>++r&&(o=r,n.length=1),n.reverse();o--;n.push(0));n.reverse()}for(a.length-s.length<0&&(n=s,s=a,a=n),o=s.length,r=0,f=T;o;a[o]%=f)r=(a[--o]=a[o]+s[o]+r)/f|0;for(r&&(a.unshift(r),++u),o=a.length;0==a[--o];a.pop());for(e.c=a,o=1,r=a[0];r>=10;r/=10,o++);return e.e=o+u*A-1,v?g(e,c,l):e},S.precision=S.sd=function(e){var r=null,n=this;return e!=r&&e!==!!e&&1!==e&&0!==e&&p(n.constructor,"argument",e,"precision",1),n.c&&(r=l(n.c),e&&n.e+1>r&&(r=n.e+1)),r},S.round=function(){var e=this,r=e.constructor;return g(new r(e),e.e+1,r.rounding)},S.squareRoot=S.sqrt=function(){var e,r,n,t,i,a,s=this,u=s.c,f=s.s,c=s.e,l=s.constructor,p=new l(.5);if(1!==f||!u||!u[0])return new l(!f||0>f&&(!u||u[0])?0/0:u?s:1/0);for(v=!1,f=Math.sqrt(+s),0==f||f==1/0?(r=o(u),(r.length+c)%2==0&&(r+="0"),f=Math.sqrt(r),c=E((c+1)/2)-(0>c||c%2),f==1/0?r="1e"+c:(r=f.toExponential(),r=r.slice(0,r.indexOf("e")+1)+c),t=new l(r)):t=new l(f.toString()),n=(c=l.precision)+3;;)if(a=t,t=p.times(a.plus(z(s,a,n+2,1))),o(a.c).slice(0,n)===(r=o(t.c)).slice(0,n)){if(r=r.slice(n-3,n+1),"9999"!=r&&(i||"4999"!=r)){(!+r||!+r.slice(1)&&"5"==r.charAt(0))&&(g(t,c+1,1),e=!t.times(t).eq(s));break}if(!i&&(g(a,c+1,0),a.times(a).eq(s))){t=a;break}n+=4,i=1}return v=!0,g(t,c,l.rounding,e)},S.times=function(e,r){var n,t,i=this,o=i.constructor,a=i.c,s=(b=11,e=new o(e,r),e.c),u=E(i.e/A),f=E(e.e/A),c=i.s;if(r=e.s,e.s=c==r?1:-1,!((u||a&&a[0])&&(f||s&&s[0])))return new o(!c||!r||a&&!a[0]&&!s||s&&!s[0]&&!a?0/0:a&&s?0*e.s:e.s/0);for(t=u+f,c=a.length,r=s.length,r>c&&(n=a,a=s,s=n,f=c,c=r,r=f),f=c+r,n=[];f--;n.push(0));for(u=r-1;u>-1;u--){for(r=0,f=c+u;f>u;r=r/T|0)r=n[f]+s[u]*a[f-u-1]+r,n[f--]=r%T|0;r&&(n[f]=(n[f]+r)%T)}for(r&&++t,n[0]||n.shift(),f=n.length;!n[--f];n.pop());for(e.c=n,c=1,r=n[0];r>=10;r/=10,c++);return e.e=c+t*A-1,v?g(e,o.precision,o.rounding):e},S.toDecimalPlaces=S.toDP=function(e,r){var n=this;return n=new n.constructor(n),null!=e&&u(n,e,"toDP")?g(n,(0|e)+n.e+1,s(n,r,"toDP")):n},S.toExponential=function(e,r){var n=this;return n.c?c(n,null!=e&&u(n,e,"toExponential")?0|e:null,null!=e&&s(n,r,"toExponential"),1):n.toString()},S.toFixed=function(e,r){var n,t=this,i=t.constructor,o=i.toExpNeg,a=i.toExpPos;return null!=e&&(e=u(t,e,n="toFixed")?t.e+(0|e):null,r=s(t,r,n)),i.toExpNeg=-(i.toExpPos=1/0),null!=e&&t.c?(n=c(t,e,r),t.s<0&&t.c&&(t.c[0]?n.indexOf("-")<0&&(n="-"+n):n=n.replace("-",""))):n=t.toString(),i.toExpNeg=o,i.toExpPos=a,n},S.toFormat=function(e,r,n){var t=this.toFixed(r).split(".");return t[0].replace(/\B(?=(\d{3})+$)/g,null==e?",":e+"")+(t[1]?"."+(n?t[1].replace(/\d{5}\B/g,"$&"+n):t[1]):"")},S.toFraction=function(e){var r,n,t,i,a,s,u,f,c=this,m=c.constructor,h=r=new m(m.ONE),g=s=new m(0),d=c.c,x=new m(g);if(!d)return c.toString();for(t=x.e=l(d)-c.e-1,x.c[0]=N(10,(u=t%A)<0?A+u:u),(null==e||(!(b=12,a=new m(e)).s||(w=a.cmp(h)<0||!a.c)||m.errors&&E(a.e/A)<a.c.length-1)&&!p(m,"max denominator",e,"toFraction",0)||(e=a).cmp(x)>0)&&(e=t>0?x:h),v=!1,a=new m(o(d)),u=m.precision,m.precision=t=d.length*A*2;f=z(a,x,0,1,1),n=r.plus(f.times(g)),1!=n.cmp(e);)r=g,g=n,h=s.plus(f.times(n=h)),s=n,x=a.minus(f.times(n=x)),a=n;return n=z(e.minus(r),g,0,1,1),s=s.plus(n.times(h)),r=r.plus(n.times(g)),s.s=h.s=c.s,i=z(h,g,t,1).minus(c).abs().cmp(z(s,r,t,1).minus(c).abs())<1?[h+"",g+""]:[s+"",r+""],v=!0,m.precision=u,i},S.toNearest=function(e,r){var n=this,t=n.constructor;return n=new t(n),null==e?(e=new t(t.ONE),r=t.rounding):(b=17,e=new t(e),r=s(n,r,"toNearest")),e.c?n.c&&(e.c[0]?(v=!1,n=z(n,e,0,4>r?[4,5,7,8][r]:r,1).times(e),v=!0,g(n)):n.c=[n.e=0]):n.s&&(e.s&&(e.s=n.s),n=e),n},S.toNumber=function(){var e=this;return+e||(e.s?0*e.s:0/0)},S.toPower=S.pow=function(e,r){var n,t,i,s,u=this,c=u.constructor,l=u.s,p=(b=13,+(e=new c(e,r))),d=0>p?-p:p,x=c.precision,w=c.rounding;if(!u.c||!e.c||(i=!u.c[0])||!e.c[0])return new c(N(i?0*l:+u,p));if(u=new c(u),n=u.c.length,!u.e&&u.c[0]==u.s&&1==n)return u;if(r=e.c.length-1,e.e||e.c[0]!=e.s||r)if(t=E(e.e/A),i=t>=r,!i&&0>l)s=new c(0/0);else{if(i&&q>n*A*d){if(s=m(c,u,d),e.s<0)return c.ONE.div(s)}else{if(l=0>l&&1&e.c[Math.max(t,r)]?-1:1,r=N(+u,p),t=0!=r&&isFinite(r)?new c(r+"").e:E(p*(Math.log("0."+o(u.c))/Math.LN10+u.e+1)),t>c.maxE+1||t<c.minE-1)return new c(t>0?l/0:0);v=!1,c.rounding=u.s=1,d=Math.min(12,(t+"").length),s=f(e.times(h(u,x+d)),x),s=g(s,x+5,1),a(s.c,x,w)&&(t=x+10,s=g(f(e.times(h(u,t+d)),t),t+5,1),+o(s.c).slice(x+1,x+15)+1==1e14&&(s=g(s,x+1,0))),s.s=l,v=!0,c.rounding=w}s=g(s,x,w)}else s=g(u,x,w);return s},S.toPrecision=function(e,r){var n=this;return null!=e&&u(n,e,"toPrecision",1)&&n.c?c(n,0|--e,s(n,r,"toPrecision"),2):n.toString()},S.toSignificantDigits=S.toSD=function(e,r){var n=this,t=n.constructor;return n=new t(n),null!=e&&u(n,e,"toSD",1)?g(n,0|e,s(n,r,"toSD")):g(n,t.precision,t.rounding)},S.toString=function(e){var r,n,t,i=this,a=i.constructor,s=i.e;if(null===s)n=i.s?"Infinity":"NaN";else{if(e===r&&(s<=a.toExpNeg||s>=a.toExpPos))return c(i,null,a.rounding,1);if(n=o(i.c),0>s){for(;++s;n="0"+n);n="0."+n}else if(t=n.length,s>0)if(++s>t)for(s-=t;s--;n+="0");else t>s&&(n=n.slice(0,s)+"."+n.slice(s));else if(r=n.charAt(0),t>1)n=r+"."+n.slice(1);else if("0"==r)return r;if(null!=e)if((w=!(e>=2&&65>e))||e!=(0|e)&&a.errors)p(a,"base",e,"toString",0);else if(n=d(a,n,0|e,10,i.s),"0"==n)return n}return i.s<0?"-"+n:n},S.truncated=S.trunc=function(){return g(new this.constructor(this),this.e+1,1)},S.valueOf=S.toJSON=function(){return this.toString()},d=function(){function e(e,r,n){for(var t,i,o=[0],a=0,s=e.length;s>a;){for(i=o.length;i--;o[i]*=r);for(o[t=0]+=O.indexOf(e.charAt(a++));t<o.length;t++)o[t]>n-1&&(null==o[t+1]&&(o[t+1]=0),o[t+1]+=o[t]/n|0,o[t]%=n)}return o.reverse()}return function(r,n,t,i,o){var a,s,u,f,c,l,p=n.indexOf("."),h=r.precision,g=r.rounding;for(37>i&&(n=n.toLowerCase()),p>=0&&(n=n.replace(".",""),l=new r(i),f=m(r,l,n.length-p),l.c=e(f.toFixed(),10,t),l.e=l.c.length),c=e(n,i,t),a=s=c.length;0==c[--s];c.pop());if(!c[0])return"0";if(0>p?a--:(f.c=c,f.e=a,f.s=o,f=z(f,l,h,g,0,t),c=f.c,u=f.r,a=f.e),p=c[h],s=t/2,u=u||null!=c[h+1],4>g?(null!=p||u)&&(0==g||g==(f.s<0?3:2)):p>s||p==s&&(4==g||u||6==g&&1&c[h-1]||g==(f.s<0?8:7)))for(c.length=h,--t;++c[--h]>t;)c[h]=0,h||(++a,c.unshift(1));else c.length=h;for(s=c.length;!c[--s];);for(p=0,n="";s>=p;n+=O.charAt(c[p++]));if(0>a){for(;++a;n="0"+n);n="0."+n}else if(p=n.length,++a>p)for(a-=p;a--;n+="0");else p>a&&(n=n.slice(0,a)+"."+n.slice(a));return n}}();var z=function(){function e(e,r,n){var t,i=0,o=e.length;for(e=e.slice();o--;)t=e[o]*r+i,e[o]=t%n|0,i=t/n|0;return i&&e.unshift(i),e}function r(e,r,n,t){var i,o;if(n!=t)o=n>t?1:-1;else for(i=o=0;n>i;i++)if(e[i]!=r[i]){o=e[i]>r[i]?1:-1;break}return o}function n(e,r,n,t){for(var i=0;n--;)e[n]-=i,i=e[n]<r[n]?1:0,e[n]=i*t+e[n]-r[n];for(;!e[0]&&e.length>1;e.shift());}return function(t,i,o,a,s,u){var f,c,l,p,m,h,d,x,w,y,v,b,N,M,O,S,C,U,q,B=t.constructor,z=t.s==i.s?1:-1,_=t.c,I=i.c;if(!(_&&_[0]&&I&&I[0]))return new B(t.s&&i.s&&(_?!I||_[0]!=I[0]:I)?_&&0==_[0]||!I?0*z:z/0:0/0);for(u?(p=1,c=t.e-i.e):(u=T,p=A,c=E(t.e/p)-E(i.e/p)),U=I.length,S=_.length,w=new B(z),y=w.c=[],l=0;I[l]==(_[l]||0);l++);if(I[l]>(_[l]||0)&&c--,null==o?(z=o=B.precision,a=B.rounding):z=s?o+(t.e-i.e)+1:o,0>z)y.push(1),m=!0;else{if(z=z/p+2|0,l=0,1==U){for(h=0,I=I[0],z++;(S>l||h)&&z--;l++)M=h*u+(_[l]||0),y[l]=M/I|0,h=M%I|0;m=h||S>l}else{for(h=u/(I[0]+1)|0,h>1&&(I=e(I,h,u),_=e(_,h,u),U=I.length,S=_.length),O=U,v=_.slice(0,U),b=v.length;U>b;v[b++]=0);q=I.slice(),q.unshift(0),C=I[0],I[1]>=u/2&&C++;do h=0,f=r(I,v,U,b),0>f?(N=v[0],U!=b&&(N=N*u+(v[1]||0)),h=N/C|0,h>1?(h>=u&&(h=u-1),d=e(I,h,u),x=d.length,b=v.length,f=r(d,v,x,b),1==f&&(h--,n(d,x>U?q:I,x,u))):(0==h&&(f=h=1),d=I.slice()),x=d.length,b>x&&d.unshift(0),n(v,d,b,u),-1==f&&(b=v.length,f=r(I,v,U,b),1>f&&(h++,n(v,b>U?q:I,b,u))),b=v.length):0===f&&(h++,v=[0]),y[l++]=h,f&&v[0]?v[b++]=_[O]||0:(v=[_[O]],b=1);while((O++<S||null!=v[0])&&z--);m=null!=v[0]}y[0]||y.shift()}if(1==p)w.e=c,w.r=+m;else{for(l=1,z=y[0];z>=10;z/=10,l++);w.e=l+c*p-1,g(w,s?o+w.e+1:o,a,m)}return w}}();x=function(){function e(e){var r,n,t,i=this,o="config",a=i.errors?parseInt:parseFloat;return e==n||"object"!=typeof e&&!p(i,"object expected",e,o)?i:((t=e[r="precision"])!=n&&((w=1>t||t>U)||a(t)!=t?p(i,r,t,o,0):i[r]=0|t),(t=e[r="rounding"])!=n&&((w=0>t||t>8)||a(t)!=t?p(i,r,t,o,0):i[r]=0|t),(t=e[r="toExpNeg"])!=n&&((w=-C>t||t>0)||a(t)!=t?p(i,r,t,o,0):i[r]=E(t)),(t=e[r="toExpPos"])!=n&&((w=0>t||t>C)||a(t)!=t?p(i,r,t,o,0):i[r]=E(t)),(t=e[r="minE"])!=n&&((w=-C>t||t>0)||a(t)!=t?p(i,r,t,o,0):i[r]=E(t)),(t=e[r="maxE"])!=n&&((w=0>t||t>C)||a(t)!=t?p(i,r,t,o,0):i[r]=E(t)),(t=e[r="errors"])!=n&&(t===!!t||1===t||0===t?(w=b=0,i[r]=!!t):p(i,r,t,o,1)),(t=e[r="crypto"])!=n&&(t===!!t||1===t||0===t?i[r]=!(!t||!y||"object"!=typeof y):p(i,r,t,o,1)),(t=e[r="modulo"])!=n&&((w=0>t||t>9)||a(t)!=t?p(i,r,t,o,0):i[r]=0|t),i)}function r(e){return new this(e).exp()}function n(e){return new this(e).ln()}function t(e,r){return new this(e).log(r)}function i(e,r,n){var t,i,o=0;for("[object Array]"==M.call(r[0])&&(r=r[0]),t=new e(r[0]);++o<r.length;){if(i=new e(r[o]),!i.s){t=i;break}t[n](i)&&(t=i)}return t}function o(){return i(this,arguments,"lt")}function a(){return i(this,arguments,"gt")}function s(e,r){return new this(e).pow(r)}function f(e){var r,n,t,i=0,o=[],a=this,s=new a(a.ONE);if(null!=e&&u(s,e,"random")?e|=0:e=a.precision,n=Math.ceil(e/A),a.crypto)if(y&&y.getRandomValues)for(r=y.getRandomValues(new Uint32Array(n));n>i;)t=r[i],t>=429e7?r[i]=y.getRandomValues(new Uint32Array(1))[0]:o[i++]=t%1e7;else if(y&&y.randomBytes){for(r=y.randomBytes(n*=4);n>i;)t=r[i]+(r[i+1]<<8)+(r[i+2]<<16)+((127&r[i+3])<<24),t>=214e7?y.randomBytes(4).copy(r,i):(o.push(t%1e7),i+=4);i=n/4}else p(a,"crypto unavailable",y,"random");if(!i)for(;n>i;)o[i++]=1e7*Math.random()|0;for(n=o[--i],e%=A,n&&e&&(t=N(10,A-e),o[i]=(n/t|0)*t);0===o[i];i--)o.pop();if(0>i)o=[n=0];else{for(n=-1;0===o[0];)o.shift(),n-=A;for(i=1,t=o[0];t>=10;)t/=10,i++;A>i&&(n-=A-i)}return s.e=n,s.c=o,s}function c(e){return new this(e).sqrt()}function l(i){function u(e,r){var n=this;if(!(n instanceof u))return p(u,"Decimal called without new",e),new u(e,r);if(e instanceof u){if(null==r)return b=0,n.constructor=e.constructor,n.s=e.s,n.e=e.e,void(n.c=(e=e.c)?e.slice():e);if(10==r)return g(new u(e),u.precision,u.rounding);e+=""}return m(n.constructor=u,n,e,r)}return u.precision=20,u.rounding=4,u.modulo=1,u.toExpNeg=-7,u.toExpPos=21,u.minE=-C,u.maxE=C,u.errors=!0,u.crypto=!1,u.prototype=S,u.ONE=new u(1),u.ROUND_UP=0,u.ROUND_DOWN=1,u.ROUND_CEIL=2,u.ROUND_FLOOR=3,u.ROUND_HALF_UP=4,u.ROUND_HALF_DOWN=5,u.ROUND_HALF_EVEN=6,u.ROUND_HALF_CEIL=7,u.ROUND_HALF_FLOOR=8,u.EUCLID=9,u.config=e,u.constructor=l,u.exp=r,u.ln=n,u.log=t,u.max=o,u.min=a,u.pow=s,u.sqrt=c,u.random=f,null!=i&&u.config(i),u}var m=function(){var e=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,r=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")};return function(n,t,i,o){var a,s,u,f,c,l;if("string"!=typeof i&&(i=(f="number"==typeof i||"[object Number]"==M.call(i))&&0===i&&0>1/i?"-0":i+""),c=i,o==s&&e.test(i))t.s="-"==i.charAt(0)?(i=i.slice(1),-1):1;else{if(10==o)return g(new n(i),n.precision,n.rounding);if(i=r.call(i).replace(/^\+(?!-)/,""),t.s="-"==i.charAt(0)?(i=i.replace(/^-(?!-)/,""),-1):1,o!=s?o!=(0|o)&&n.errors||(w=!(o>=2&&65>o))?(p(n,"base",o,0,0),l=e.test(i)):(a="["+O.slice(0,o=0|o)+"]+",i=i.replace(/\.$/,"").replace(/^\./,"0."),(l=new RegExp("^"+a+"(?:\\."+a+")?$",37>o?"i":"").test(i))?(f&&(i.replace(/^0\.0*|\./,"").length>15&&p(n,0,c),f=!f),i=d(n,i,10,o,t.s)):"Infinity"!=i&&"NaN"!=i&&(p(n,"not a base "+o+" number",c),i="NaN")):l=e.test(i),!l)return t.c=t.e=null,"Infinity"!=i&&("NaN"!=i&&p(n,"not a number",c),t.s=null),b=0,t}for((s=i.indexOf("."))>-1&&(i=i.replace(".","")),(u=i.search(/e/i))>0?(0>s&&(s=u),s+=+i.slice(u+1),i=i.substring(0,u)):0>s&&(s=i.length),u=0;"0"==i.charAt(u);u++);for(o=i.length;"0"==i.charAt(--o););if(i=i.slice(u,o+1)){if(o=i.length,f&&o>15&&p(n,0,c),t.e=s=s-u-1,t.c=[],u=(s+1)%A,0>s&&(u+=A),o>u){for(u&&t.c.push(+i.slice(0,u)),o-=A;o>u;)t.c.push(+i.slice(u,u+=A));i=i.slice(u),u=A-i.length}else u-=o;for(;u--;i+="0");t.c.push(+i),v&&(t.e>n.maxE?t.c=t.e=null:t.e<n.minE&&(t.c=[t.e=0]))}else t.c=[t.e=0];b=0}}();return l()}(),t=function(){return x}.call(r,n,r,e),!(void 0!==t&&(e.exports=t))}(this)},function(e){function r(e,n,t,i){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.fn=e,this.count=n,this.min=t,this.max=i,this.message="Wrong number of arguments in function "+e+" ("+n+" provided, "+t+(void 0!=i?"-"+i:"")+" expected)",this.stack=(new Error).stack}r.prototype=new Error,r.prototype.constructor=Error,r.prototype.name="ArgumentsError",e.exports=r},function(e){function r(e,n,t){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.actual=e,this.expected=n,this.relation=t,this.message="Dimension mismatch ("+(_.isArray(e)?"["+e.join(", ")+"]":e)+" "+(this.relation||"!=")+" "+(_.isArray(n)?"["+n.join(", ")+"]":n)+")",this.stack=(new Error).stack}r.prototype=new RangeError,r.prototype.constructor=RangeError,r.prototype.name="DimensionError",e.exports=r},function(e){function r(e,n,t){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.index=e,arguments.length<3?(this.min=0,this.max=n):(this.min=n,this.max=t),this.message=void 0!==this.min&&this.index<this.min?"Index out of range ("+this.index+" < "+this.min+")":void 0!==this.max&&this.index>=this.max?"Index out of range ("+this.index+" > "+(this.max-1)+")":"Index out of range ("+this.index+")",this.stack=(new Error).stack}r.prototype=new RangeError,r.prototype.constructor=RangeError,r.prototype.name="IndexError",e.exports=r},function(e){function r(e){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this.fn=e,this.types=Array.prototype.splice.call(arguments,1),this.message=e?0==this.types.length?"Unsupported type of argument in function "+e:"Function "+e+"("+this.types.join(", ")+") not supported":"Unsupported type of argument",this.stack=(new Error).stack}r.prototype=new TypeError,r.prototype.constructor=TypeError,r.prototype.name="UnsupportedTypeError",e.exports=r},function(e,r,n){r.array=n(160),r["boolean"]=n(264),r.number=n(161),r.bignumber=n(265),r.object=n(3),r.string=n(142),r.types=n(163)},function(e,r,n){function t(e){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(this.nodes=e||[],!a(this.nodes)||!this.nodes.every(s))throw new TypeError("Array containing Nodes expected")}var i=n(136),o=(n(3),n(142)),a=(n(11),n(128),_.isArray),s=i.isNode;t.prototype=new i,t.prototype.type="ArrayNode",t.prototype._compile=function(e){var r="array"!==e.math.config().matrix,n=this.nodes.map(function(r){return r._compile(e)});return(r?"math.matrix([":"[")+n.join(",")+(r?"])":"]")},t.prototype.find=function(e){var r=[];this.match(e)&&r.push(this);for(var n=this.nodes,t=0,i=n.length;i>t;t++)r=r.concat(n[t].find(e));return r},t.prototype.toString=function(){return o.format(this.nodes)},t.prototype.toTex=function(e){e=e||"bmatrix";var r="\\begin{"+e+"}";return this.nodes.forEach(function(e){r+=e.nodes?e.nodes.map(function(e){return e.toTex()}).join("&"):e.toTex(),r+="\\\\"}),r+="\\end{"+e+"}"},e.exports=t},function(e,r,n){function t(e,r){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(!u(e))throw new TypeError('String expected for parameter "name"');if(!(r instanceof i))throw new TypeError('Node expected for parameter "expr"');if(e in a)throw new Error('Illegal symbol name, "'+e+'" is a reserved keyword');this.name=e,this.expr=r}var i=n(136),o=n(129),a=n(267),s=n(266),u=n(142).isString;t.prototype=new i,t.prototype.type="AssignmentNode",t.prototype._compile=function(e){return'scope["'+this.name+'"] = '+this.expr._compile(e)},t.prototype.find=function(e){var r=[];return this.match(e)&&r.push(this),r=r.concat(this.expr.find(e))},t.prototype.toString=function(){return this.name+" = "+this.expr.toString()},t.prototype.toTex=function(){var e;return this.expr instanceof o&&(e=["\\mathbf{","}"]),s.addBraces(s.toSymbol(this.name),e)+"="+s.addBraces(this.expr.toTex())},e.exports=t},function(e,r,n){function t(){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");this.params=[]}var i=n(136),o=n(264).isBoolean;t.prototype=new i,t.prototype.type="BlockNode",t.prototype.add=function(e,r){if(void 0===r&&(r=!0),!(e instanceof i))throw new TypeError('Node expected for parameter "expr"');if(!o(r))throw new TypeError('Boolean expected for parameter "visible"');var n=this.params.length;this.params[n]={node:e,visible:r}},t.prototype._compile=function(e){var r=this.params.map(function(r){var n=r.node._compile(e);return r.visible?"results.push("+n+");":n+";"});return"(function () {var results = [];"+r.join("")+"return results;})()"},t.prototype.find=function(e){var r=[];this.match(e)&&r.push(this);for(var n=this.params,t=0,i=n.length;i>t;t++)r=r.concat(n[t].node.find(e));return r},t.prototype.toString=function(){return this.params.map(function(e){return e.node.toString()+(e.visible?"":";")}).join("\n")},t.prototype.toTex=function(){return this.params.map(function(e){return e.node.toTex()+(e.visible?"":";")}).join("\n")},e.exports=t},function(e,r,n){function t(e,r,n){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(!(e instanceof i))throw new TypeError("Parameter condition must be a Node");if(!(r instanceof i))throw new TypeError("Parameter trueExpr must be a Node");if(!(n instanceof i))throw new TypeError("Parameter falseExpr must be a Node");this.condition=e,this.trueExpr=r,this.falseExpr=n}var i=n(136),o=n(266),a=n(123),s=n(5),u=n(128),f=u.string.isString,c=u.number.isNumber,l=u["boolean"].isBoolean;t.prototype=new i,t.prototype.type="ConditionalNode",t.prototype._compile=function(e){return e.testCondition=function(r){if(c(r)||l(r)||f(r))return r?!0:!1;if(r instanceof a)return r.isZero()?!1:!0;if(r instanceof s)return r.re||r.im?!0:!1;if(r instanceof Unit)return r.value?!0:!1;if(null===r||void 0===r)return!1;throw new TypeError('Unsupported type of condition "'+e.math["typeof"](r)+'"')},"testCondition("+this.condition._compile(e)+") ? ( "+this.trueExpr._compile(e)+") : ( "+this.falseExpr._compile(e)+")"},t.prototype.find=function(e){var r=[];return this.match(e)&&r.push(this),r=r.concat(this.condition.find(e),this.trueExpr.find(e),this.falseExpr.find(e))},t.prototype.toString=function(){return"("+this.condition.toString()+") ? ("+this.trueExpr.toString()+") : ("+this.falseExpr.toString()+")"},t.prototype.toTex=function(){var e=o.addBraces(this.trueExpr.toTex())+", &\\quad"+o.addBraces("\\text{if}\\;"+this.condition.toTex())+"\\\\"+(o.addBraces(this.falseExpr.toTex())+", &\\quad"+o.addBraces("\\text{otherwise}"));return o.addBraces(e,["\\left\\{\\begin{array}{l l}","\\end{array}\\right."])},e.exports=t},function(e,r,n){function t(e,r){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(r){if(!a(r))throw new TypeError('String expected for parameter "valueType"');if(!a(e))throw new TypeError('String expected for parameter "value"');this.value=e,this.valueType=r}else this.value=e+"",this.valueType=o(e);if(!s[this.valueType])throw new TypeError('Unsupported type of value "'+this.valueType+'"')}var i=n(136),o=(n(123),n(163).type),a=n(142).isString,s={number:!0,string:!0,"boolean":!0,undefined:!0,"null":!0};t.prototype=new i,t.prototype.type="ConstantNode",t.prototype._compile=function(e){switch(this.valueType){case"number":return"bignumber"===e.math.config().number?'math.bignumber("'+this.value+'")':this.value.replace(/^(0*)[0-9]/,function(e,r){return e.substring(r.length)});case"string":return'"'+this.value+'"';case"boolean":return this.value;case"undefined":return this.value;case"null":return this.value;default:throw new TypeError('Unsupported type of constant "'+this.valueType+'"')}},t.prototype.toString=function(){switch(this.valueType){case"string":return'"'+this.value+'"';default:return this.value}},t.prototype.toTex=function(){var e,r=this.value;switch(this.valueType){case"string":return"\\text{"+r+"}";case"number":return e=r.toLowerCase().indexOf("e"),-1!==e?r.substring(0,e)+" \\cdot 10^{"+r.substring(e+1)+"}":r;default:return r}},e.exports=t},function(e,r,n){function t(e,r){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(!(e instanceof i))throw new TypeError('Node expected for parameter "object"');if(!isArray(r)||!r.every(s))throw new TypeError('Array containing Nodes expected for parameter "ranges"');this.object=e,this.ranges=r}var i=n(136),o=n(139),a=n(140),s=i.isNode;t.prototype=new i,t.prototype.type="IndexNode",t.prototype._compile=function(e){return this.compileSubset(e)},t.prototype.compileSubset=function(e,r){var n={type:a,properties:{name:"end"}},t=!1,i=this.ranges.map(function(e){var r=e.find(n).length>0;return t=r?r:t,r}),s=this.ranges.map(function(r,n){var t=i[n];return r instanceof o?t?'(function (scope) {  scope = Object.create(scope);   scope["end"] = size['+n+"];  var step = "+(r.step?r.step._compile(e):"1")+";  return [    "+r.start._compile(e)+" - 1,     "+r.end._compile(e)+" - (step > 0 ? 0 : 2),     step  ];})(scope)":"(function () {  var step = "+(r.step?r.step._compile(e):"1")+";  return [    "+r.start._compile(e)+" - 1,     "+r.end._compile(e)+" - (step > 0 ? 0 : 2),     step  ];})()":t?'(function (scope) {  scope = Object.create(scope);   scope["end"] = size['+n+"];  return "+r._compile(e)+" - 1;})(scope)":r._compile(e)+" - 1"});return t?"(function () {  var obj = "+this.object._compile(e)+";  var size = math.size(obj).valueOf();  return math.subset(    obj,     math.index("+s.join(", ")+")    "+(r?", "+r:"")+"  );})()":"math.subset("+this.object._compile(e)+",math.index("+s.join(", ")+")"+(r?", "+r:"")+")"},t.prototype.find=function(e){var r=[];this.match(e)&&r.push(this),r=r.concat(this.object.find(e));for(var n=this.ranges,t=0,i=n.length;i>t;t++)r=r.concat(n[t].find(e));return r},t.prototype.objectName=function(){return this.object.name},t.prototype.toString=function(){return this.object.toString()+"["+this.ranges.join(", ")+"]"},t.prototype.toTex=function(){return this.object.toTex()+"["+this.ranges.join(", ")+"]"},e.exports=t},function(e,r,n){function t(e,r,n){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(!s(e))throw new TypeError('String expected for parameter "name"');if(!isArray(r)||!r.every(s))throw new TypeError('Array containing strings expected for parameter "args"');if(!(n instanceof i))throw new TypeError('Node expected for parameter "expr"');if(e in o)throw new Error('Illegal function name, "'+e+'" is a reserved keyword');this.name=e,this.args=r,this.expr=n}var i=n(136),o=n(267),a=n(266),s=n(142).isString;isArray=_.isArray,t.prototype=new i,t.prototype.type="FunctionNode",t.prototype._compile=function(e){return'scope["'+this.name+'"] =   (function (scope) {    scope = Object.create(scope);     var fn = function '+this.name+"("+this.args.join(",")+") {      if (arguments.length != "+this.args.length+') {        throw new SyntaxError("Wrong number of arguments in function '+this.name+' (" + arguments.length + " provided, '+this.args.length+' expected)");      }'+this.args.map(function(e,r){return'scope["'+e+'"] = arguments['+r+"];"}).join("")+"      return "+this.expr._compile(e)+'    };    fn.syntax = "'+this.name+"("+this.args.join(", ")+')";    return fn;  })(scope);'},t.prototype.find=function(e){var r=[];return this.match(e)&&r.push(this),r=r.concat(this.expr.find(e))},t.prototype.toString=function(){return"function "+this.name+"("+this.args.join(", ")+") = "+this.expr.toString()},t.prototype.toTex=function(){return this.name+a.addBraces(this.args.map(a.toSymbol).join(", "),!0)+"="+a.addBraces(this.expr.toTex())},e.exports=t},function(e,r,n){function t(){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator")}function i(e){for(var r in e)if(e.hasOwnProperty(r)&&r in a)throw new Error('Scope contains an illegal symbol, "'+r+'" is a reserved keyword')}var o=n(4),a=n(267);t.prototype.eval=function(){throw new Error("Node.eval is deprecated. Use Node.compile(math).eval([scope]) instead.")},t.prototype.type="Node",t.prototype.compile=function(e){if(!(e instanceof Object))throw new TypeError("Object expected for parameter math");var r={math:e,error:o,validateScope:i},n=this._compile(r),t=Object.keys(r).map(function(e){return"    var "+e+' = defs["'+e+'"];'}),a=t.join(" ")+'return {  "eval": function (scope) {    try {      if (scope) defs.validateScope(scope);      scope = scope || {};      return '+n+";    } catch (err) {      if (err instanceof defs.error.IndexError) {        err = new defs.error.IndexError(err.index + 1, err.min + 1, err.max + 1);      }      throw err;    }  }};",s=new Function("defs",a);return s(r)},t.prototype._compile=function(){throw new Error("Cannot compile a Node interface")},t.prototype.find=function(e){return this.match(e)?[this]:[]},t.prototype.match=function(e){var r=!0;if(e){!e.type||this instanceof e.type||(r=!1);var n=e.properties;if(r&&n)for(var t in n)if(n.hasOwnProperty(t)&&this[t]!==n[t]){r=!1;break}}return r},t.prototype.toString=function(){return""},t.prototype.toTex=function(){return""},t.isNode=function(e){return e instanceof t},e.exports=t},function(e,r,n){function t(e,r,n){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");this.op=e,this.fn=r,this.params=n}var i=n(136),o=n(133),a=n(140),s=n(138),u=n(266);t.prototype=new i,t.prototype.type="OperatorNode",t.prototype._compile=function(e){if(!(this.fn in e.math))throw new Error("Function "+this.fn+' missing in provided namespace "math"');var r=this.params.map(function(r){return r._compile(e)});return"math."+this.fn+"("+r.join(", ")+")"},t.prototype.find=function(e){var r=[];this.match(e)&&r.push(this);var n=this.params;if(n)for(var t=0,i=n.length;i>t;t++)r=r.concat(n[t].find(e));return r},t.prototype.toString=function(){var e=this.params;switch(e.length){case 1:return"-"==this.op?"-"+e[0].toString():e[0].toString()+this.op;case 2:var r=e[0].toString();e[0]instanceof t&&(r="("+r+")");var n=e[1].toString();return e[1]instanceof t&&(n="("+n+")"),r+" "+this.op+" "+n;default:return this.op+"("+this.params.join(", ")+")"}},t.prototype.toTex=function(){var e=this.params,r=u.toOperator(this.op),n=e[0],i=e[1];switch(e.length){case 1:return"-"===this.op||"+"===this.op?this.op+n.toTex():n.toTex()+this.op;case 2:var f=n.toTex(),c=!1,l=i.toTex(),p=!1,m="",h="";switch(this.op){case"/":m=r,r="";break;case"*":n instanceof t&&("+"===n.op||"-"===n.op)&&(c=!0),i instanceof t&&("+"===i.op||"-"===i.op?p=!0:"*"===i.op&&(p=!0)),r=(n instanceof o||n instanceof t)&&(i instanceof o||i instanceof t)?" \\cdot ":" \\, ";break;case"^":n instanceof t||n instanceof s?c=!0:n instanceof a&&(c=null);break;case"to":l=u.toUnit(l,!0)}return f=u.addBraces(f,c),l=u.addBraces(l,p),m+f+r+l+h;default:return r+"("+this.params.map(u.toSymbol).join(", ")+")"}},e.exports=t},function(e,r,n){function t(e,r){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(!(e instanceof i))throw new TypeError('Node expected for parameter "object"');if(!isArray(r)||!r.every(a))throw new TypeError('Array containing Nodes expected for parameter "params"');this.object=e,this.params=r}var i=n(136),o=n(266),a=i.isNode;t.prototype=new i,t.prototype.type="ParamsNode",t.prototype._compile=function(e){var r=this.params.map(function(r){return r._compile(e)});return this.object._compile(e)+"("+r.join(", ")+")"},t.prototype.find=function(e){var r=[];this.match(e)&&r.push(this),r=r.concat(this.object.find(e));for(var n=this.params,t=0,i=n.length;i>t;t++)r=r.concat(n[t].find(e));return r},t.prototype.toString=function(){return this.object.toString()+"("+this.params.join(", ")+")"},t.prototype.toTex=function(){return o.toParams(this)},e.exports=t},function(e,r,n){function t(e){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(!_.isArray(e)||2!=e.length&&3!=e.length||!e.every(o))throw new TypeError('Expected an Array containing 2 or 3 Nodes as parameter "params"');this.start=e[0],this.end=e[1],this.step=e[2]}var i=n(136),o=i.isNode;t.prototype=new i,t.prototype.type="RangeNode",t.prototype._compile=function(e){return"math.range("+this.start._compile(e)+", "+this.end._compile(e)+", "+(this.step?this.step._compile(e)+", ":"")+"true)"},t.prototype.find=function(e){var r=[];return this.match(e)&&r.push(this),r=r.concat(this.start.find(e)),this.step&&(r=r.concat(this.step.find(e))),r=r.concat(this.end.find(e))},t.prototype.toString=function(){var e=this.start.toString();return this.step&&(e+=":"+this.step.toString()),e+=":"+this.end.toString()},t.prototype.toTex=function(){var e=this.start.toTex();return this.step&&(e+=":"+this.step.toTex()),e+=":"+this.end.toTex()},e.exports=t},function(e,r,n){function t(e){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(!u(e))throw new TypeError('String expected for parameter "name"');this.name=e}function i(e){throw new Error("Undefined symbol "+e)}var o=n(136),a=n(9),s=n(266),u=n(142).isString;t.prototype=new o,t.prototype.type="SymbolNode",t.prototype._compile=function(e){return e.undef=i,e.Unit=a,'("'+this.name+'" in scope ? scope["'+this.name+'"] : "'+this.name+'" in math ? math["'+this.name+'"] : '+(a.isValuelessUnit(this.name)?'new Unit(null, "'+this.name+'")':'undef("'+this.name+'")')+")"},t.prototype.toString=function(){return this.name},t.prototype.toTex=function(){return s.toSymbol(this.name)},e.exports=t},function(e,r,n){function t(e,r){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(!(e instanceof o))throw new TypeError('Expected IndexNode for parameter "index"');if(!(r instanceof i))throw new TypeError('Expected Node for parameter "expr"');this.index=e,this.expr=r}var i=n(136),o=n(134);t.prototype=new i,t.prototype.type="UpdateNode",t.prototype._compile=function(e){return'scope["'+this.index.objectName()+'"] = '+this.index.compileSubset(e,this.expr._compile(e))},t.prototype.find=function(e){var r=[];return this.match(e)&&r.push(this),r=r.concat(this.index.find(e)),r=r.concat(this.expr.find(e))
},t.prototype.toString=function(){return this.index.toString()+" = "+this.expr.toString()},t.prototype.toTex=function(){return this.index.toTex()+" = "+this.expr.toTex()},e.exports=t},function(e,r,n){function t(e,n){if(_.isArray(e)){for(var i="[",o=e.length,a=0;o>a;a++)0!=a&&(i+=", "),i+=t(e[a],n);return i+="]"}return r.format(e,n)}var i=n(161),o=n(265),a=n(123);r.isString=function(e){return e instanceof String||"string"==typeof e},r.endsWith=function(e,r){var n=e.length-r.length,t=e.length;return e.substring(n,t)===r},r.format=function(e,n){return i.isNumber(e)?i.format(e,n):e instanceof a?o.format(e,n):_.isArray(e)?t(e,n):r.isString(e)?'"'+e+'"':"function"==typeof e?e.syntax?e.syntax+"":"function":e instanceof Object?"function"==typeof e.format?e.format(n):e.toString():String(e)}},function(e){e.exports={name:"e",category:"Constants",syntax:["e"],description:"Euler's number, the base of the natural logarithm. Approximately equal to 2.71828",examples:["e","e ^ 2","exp(2)","log(e)"],seealso:["exp"]}},function(e){e.exports={name:"false",category:"Constants",syntax:["false"],description:"Boolean value false",examples:["false"],seealso:["true"]}},function(e){e.exports={name:"i",category:"Constants",syntax:["i"],description:"Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.",examples:["i","i * i","sqrt(-1)"],seealso:[]}},function(e){e.exports={name:"Infinity",category:"Constants",syntax:["Infinity"],description:"Infinity, a number which is larger than the maximum number that can be handled by a floating point number.",examples:["Infinity","1 / 0"],seealso:[]}},function(e){e.exports={name:"LN2",category:"Constants",syntax:["LN2"],description:"Returns the natural logarithm of 2, approximately equal to 0.693",examples:["LN2","log(2)"],seealso:[]}},function(e){e.exports={name:"LN10",category:"Constants",syntax:["LN10"],description:"Returns the natural logarithm of 10, approximately equal to 2.302",examples:["LN10","log(10)"],seealso:[]}},function(e){e.exports={name:"LOG2E",category:"Constants",syntax:["LOG2E"],description:"Returns the base-2 logarithm of E, approximately equal to 1.442",examples:["LOG2E","log(e, 2)"],seealso:[]}},function(e){e.exports={name:"LOG10E",category:"Constants",syntax:["LOG10E"],description:"Returns the base-10 logarithm of E, approximately equal to 0.434",examples:["LOG10E","log(e, 10)"],seealso:[]}},function(e){e.exports={name:"NaN",category:"Constants",syntax:["NaN"],description:"Not a number",examples:["NaN","0 / 0"],seealso:[]}},function(e){e.exports={name:"null",category:"Constants",syntax:["null"],description:"Value null",examples:["null"],seealso:["true","false"]}},function(e){e.exports={name:"pi",category:"Constants",syntax:["pi"],description:"The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159",examples:["pi","sin(pi/2)"],seealso:["tau"]}},function(e){e.exports={name:"phi",category:"Constants",syntax:["phi"],description:"Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...",examples:["tau"],seealso:[]}},function(e){e.exports={name:"SQRT1_2",category:"Constants",syntax:["SQRT1_2"],description:"Returns the square root of 1/2, approximately equal to 0.707",examples:["SQRT1_2","sqrt(1/2)"],seealso:[]}},function(e){e.exports={name:"SQRT2",category:"Constants",syntax:["SQRT2"],description:"Returns the square root of 2, approximately equal to 1.414",examples:["SQRT2","sqrt(2)"],seealso:[]}},function(e){e.exports={name:"tau",category:"Constants",syntax:["tau"],description:"Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.",examples:["tau","2 * pi"],seealso:["pi"]}},function(e){e.exports={name:"true",category:"Constants",syntax:["true"],description:"Boolean value true",examples:["true"],seealso:["false"]}},function(e){e.exports={name:"version",category:"Constants",syntax:["version"],description:"A string with the version number of math.js",examples:["version"],seealso:[]}},function(e,r,n){function t(e){for(var r=[];l(e);)r.push(e.length),e=e[0];return r}function i(e,r,n){var t,o=e.length;if(o!=r[n])throw new f(o,r[n]);if(n<r.length-1){var a=n+1;for(t=0;o>t;t++){var s=e[t];if(!l(s))throw new f(r.length-1,r.length,"<");i(e[t],r,a)}}else for(t=0;o>t;t++)if(l(e[t]))throw new f(r.length+1,r.length,">")}function o(e,r,n,t){if(!l(e))throw Error("Array expected");var i,a,s=e.length,f=r[n],c=Math.min(s,f);if(e.length=f,n<r.length-1){var p=n+1;for(i=0;c>i;i++)a=e[i],o(a,r,p,t);for(i=c;f>i;i++)a=[],e[i]=a,o(a,r,p,t)}else if(void 0!==t)for(i=s;f>i;i++)e[i]=u.clone(t)}var a=n(161),s=n(142),u=n(3),f=(n(163),n(125)),c=n(126),l=_.isArray;r.size=function(e){var n=t(e);return r.validate(e,n),n},r.validate=function(e,r){var n=0==r.length;if(n){if(l(e))throw new f(e.length,0)}else i(e,r,0)},r.validateIndex=function(e,r){if(!a.isNumber(e)||!a.isInteger(e))throw new TypeError("Index must be an integer (value: "+e+")");if(0>e)throw new c(e);if(void 0!==r&&e>=r)throw new c(e,r)},r.resize=function(e,r,n){if(!l(e)||!l(r))throw new TypeError("Array expected");if(0===r.length)throw new Error("Resizing to scalar is not supported");r.forEach(function(e){if(!a.isNumber(e)||!a.isInteger(e)||0>e)throw new TypeError("Invalid size, must contain positive integers (size: "+s.format(r)+")")});for(var t=1,i=e[0];l(i);)t++,i=i[0];for(;t<r.length;)e=[e],t++;for(;t>r.length;)e=e[0],t--;return o(e,r,0,n),e},r.squeeze=function(e){for(;l(e)&&1===e.length;)e=e[0];return e},r.unsqueeze=function(e,n){for(var t=r.size(e),i=0,o=n-t.length;o>i;i++)e=[e];return e},r.flatten=function(e){for(var r=e,n=_.isArray;n(r[0]);){for(var t=[],i=0,o=r.length;o>i;i++)t=t.concat.apply(t,r[i]);r=t}return r},r.isArray=l},function(e,r){r.isNumber=function(e){return e instanceof Number||"number"==typeof e},r.isInteger=function(e){return e==Math.round(e)},r.sign=function(e){return e>0?1:0>e?-1:0},r.format=function(e,n){if("function"==typeof n)return n(e);if(1/0===e)return"Infinity";if(e===-1/0)return"-Infinity";if(isNaN(e))return"NaN";var t="auto",i=void 0;switch(n&&(n.notation&&(t=n.notation),r.isNumber(n)?i=n:n.precision&&(i=n.precision)),t){case"fixed":return r.toFixed(e,i);case"exponential":return r.toExponential(e,i);case"auto":var o=.001,a=1e5;if(n&&n.exponential&&(void 0!==n.exponential.lower&&(o=n.exponential.lower),void 0!==n.exponential.upper&&(a=n.exponential.upper)),0===e)return"0";var s,u=Math.abs(e);if(u>=o&&a>u){var f=i?e.toPrecision(Math.min(i,21)):e.toPrecision();s=parseFloat(f)+""}else s=r.toExponential(e,i);return s.replace(/((\.\d*?)(0+))($|e)/,function(){var e=arguments[2],r=arguments[4];return"."!==e?e+r:r});default:throw new Error('Unknown notation "'+t+'". Choose "auto", "exponential", or "fixed".')}},r.toExponential=function(e,r){return void 0!==r?e.toExponential(Math.min(r-1,20)):e.toExponential()},r.toFixed=function(e,r){return e.toFixed(Math.min(r,20))},r.digits=function(e){return e.toExponential().replace(/e.*$/,"").replace(/^0\.?0*|\./,"").length},r.DBL_EPSILON=Number.EPSILON||2.220446049250313e-16,r.nearlyEqual=function(e,n,t){if(null==t)return e==n;if(e==n)return!0;if(isNaN(e)||isNaN(n))return!1;if(isFinite(e)&&isFinite(n)){var i=Math.abs(e-n);return i<r.DBL_EPSILON?!0:i<=Math.max(Math.abs(e),Math.abs(n))*t}return!1}},function(e,r,n){function t(e){return n(i(e))}function i(e){return o[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var o={"./clone":115,"./clone.js":115,"./forEach":121,"./forEach.js":121,"./format":116,"./format.js":116,"./import":117,"./import.js":117,"./map":118,"./map.js":118,"./print":119,"./print.js":119,"./typeof":120,"./typeof.js":120};t.keys=function(){return Object.keys(o)},t.resolve=i,e.exports=t},function(e,r){r.type=function n(e){var n=typeof e;if("object"===n){if(null===e)return"null";if(e instanceof Boolean)return"boolean";if(e instanceof Number)return"number";if(e instanceof String)return"string";if(_.isArray(e))return"array";if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return n}},function(e){e.exports={name:"abs",category:"Arithmetic",syntax:["abs(x)"],description:"Compute the absolute value.",examples:["abs(3.5)","abs(-4.2)"],seealso:["sign"]}},function(e){e.exports={name:"add",category:"Operators",syntax:["x + y","add(x, y)"],description:"Add two values.",examples:["a = 2.1 + 3.6","a - 3.6","3 + 2i",'"hello" + " world"',"3 cm + 2 inch"],seealso:["subtract"]}},function(e){e.exports={name:"ceil",category:"Arithmetic",syntax:["ceil(x)"],description:"Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.",examples:["ceil(3.2)","ceil(3.8)","ceil(-4.2)"],seealso:["floor","fix","round"]}},function(e){e.exports={name:"cube",category:"Arithmetic",syntax:["cube(x)"],description:"Compute the cube of a value. The cube of x is x * x * x.",examples:["cube(2)","2^3","2 * 2 * 2"],seealso:["multiply","square","pow"]}},function(e){e.exports={name:"divide",category:"Operators",syntax:["x / y","divide(x, y)"],description:"Divide two values.",examples:["a = 2 / 3","a * 3","4.5 / 2","3 + 4 / 2","(3 + 4) / 2","18 km / 4.5"],seealso:["multiply"]}},function(e){e.exports={name:"dotDivide",category:"Operators",syntax:["x ./ y","dotDivide(x, y)"],description:"Divide two values element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","b = [2, 1, 1; 3, 2, 5]","a ./ b"],seealso:["multiply","dotMultiply","divide"]}},function(e){e.exports={name:"dotMultiply",category:"Operators",syntax:["x .* y","dotMultiply(x, y)"],description:"Multiply two values element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","b = [2, 1, 1; 3, 2, 5]","a .* b"],seealso:["multiply","divide","dotDivide"]}},function(e){e.exports={name:"dotpow",category:"Operators",syntax:["x .^ y","dotpow(x, y)"],description:"Calculates the power of x to y element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","a .^ 2"],seealso:["pow"]}},function(e){e.exports={name:"exp",category:"Arithmetic",syntax:["exp(x)"],description:"Calculate the exponent of a value.",examples:["exp(1.3)","e ^ 1.3","log(exp(1.3))","x = 2.4","(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"],seealso:["pow","log"]}},function(e){e.exports={name:"fix",category:"Arithmetic",syntax:["fix(x)"],description:"Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.",examples:["fix(3.2)","fix(3.8)","fix(-4.2)","fix(-4.8)"],seealso:["ceil","floor","round"]}},function(e){e.exports={name:"floor",category:"Arithmetic",syntax:["floor(x)"],description:"Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.",examples:["floor(3.2)","floor(3.8)","floor(-4.2)"],seealso:["ceil","fix","round"]}},function(e){e.exports={name:"gcd",category:"Arithmetic",syntax:["gcd(a, b)","gcd(a, b, c, ...)"],description:"Compute the greatest common divisor.",examples:["gcd(8, 12)","gcd(-4, 6)","gcd(25, 15, -10)"],seealso:["lcm","xgcd"]}},function(e){e.exports={name:"lcm",category:"Arithmetic",syntax:["lcm(x, y)"],description:"Compute the least common multiple.",examples:["lcm(4, 6)","lcm(6, 21)","lcm(6, 21, 5)"],seealso:["gcd"]}},function(e){e.exports={name:"log",category:"Arithmetic",syntax:["log(x)","log(x, base)"],description:"Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).",examples:["log(3.5)","a = log(2.4)","exp(a)","10 ^ 4","log(10000, 10)","log(10000) / log(10)","b = log(1024, 2)","2 ^ b"],seealso:["exp","log10"]}},function(e){e.exports={name:"log10",category:"Arithmetic",syntax:["log10(x)"],description:"Compute the 10-base logarithm of a value.",examples:["log10(0.00001)","log10(10000)","10 ^ 4","log(10000) / log(10)","log(10000, 10)"],seealso:["exp","log"]}},function(e){e.exports={name:"mod",category:"Operators",syntax:["x % y","x mod y","mod(x, y)"],description:"Calculates the modulus, the remainder of an integer division.",examples:["7 % 3","11 % 2","10 mod 4","function isOdd(x) = x % 2","isOdd(2)","isOdd(3)"],seealso:["divide"]}},function(e){e.exports={name:"multiply",category:"Operators",syntax:["x * y","multiply(x, y)"],description:"multiply two values.",examples:["a = 2.1 * 3.4","a / 3.4","2 * 3 + 4","2 * (3 + 4)","3 * 2.1 km"],seealso:["divide"]}},function(e){e.exports={name:"norm",category:"Arithmetic",syntax:["norm(x)","norm(x, p)"],description:"Calculate the norm of a number, vector or matrix.",examples:["abs(-3.5)","norm(-3.5)","norm(3 - 4i))","norm([1, 2, -3], Infinity)","norm([1, 2, -3], -Infinity)","norm([3, 4], 2)","norm([[1, 2], [3, 4]], 1)","norm([[1, 2], [3, 4]], 'inf')","norm([[1, 2], [3, 4]], 'fro')"]}},function(e){e.exports={name:"pow",category:"Operators",syntax:["x ^ y","pow(x, y)"],description:"Calculates the power of x to y, x^y.",examples:["2^3 = 8","2*2*2","1 + e ^ (pi * i)"],seealso:["multiply"]}},function(e){e.exports={name:"round",category:"Arithmetic",syntax:["round(x)","round(x, n)"],description:"round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.",examples:["round(3.2)","round(3.8)","round(-4.2)","round(-4.8)","round(pi, 3)","round(123.45678, 2)"],seealso:["ceil","floor","fix"]}},function(e){e.exports={name:"sign",category:"Arithmetic",syntax:["sign(x)"],description:"Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.",examples:["sign(3.5)","sign(-4.2)","sign(0)"],seealso:["abs"]}},function(e){e.exports={name:"sqrt",category:"Arithmetic",syntax:["sqrt(x)"],description:"Compute the square root value. If x = y * y, then y is the square root of x.",examples:["sqrt(25)","5 * 5","sqrt(-1)"],seealso:["square","multiply"]}},function(e){e.exports={name:"square",category:"Arithmetic",syntax:["square(x)"],description:"Compute the square of a value. The square of x is x * x.",examples:["square(3)","sqrt(9)","3^2","3 * 3"],seealso:["multiply","pow","sqrt","cube"]}},function(e){e.exports={name:"subtract",category:"Operators",syntax:["x - y","subtract(x, y)"],description:"subtract two values.",examples:["a = 5.3 - 2","a + 2","2/3 - 1/6","2 * 3 - 3","2.1 km - 500m"],seealso:["add"]}},function(e){e.exports={name:"unaryMinus",category:"Operators",syntax:["-x","unaryMinus(x)"],description:"Inverse the sign of a value. Converts booleans and strings to numbers.",examples:["-4.5","-(-5.6)",'-"22"'],seealso:["add","subtract","unaryPlus"]}},function(e){e.exports={name:"unaryPlus",category:"Operators",syntax:["+x","unaryPlus(x)"],description:"Converts booleans and strings to numbers.",examples:["+true",'+"2"'],seealso:["add","subtract","unaryMinus"]}},function(e){e.exports={name:"xgcd",category:"Arithmetic",syntax:["xgcd(a, b)"],description:"Calculate the extended greatest common divisor for two values",examples:["xgcd(8, 12)","gcd(8, 12)","xgcd(36163, 21199)"],seealso:["gcd","lcm"]}},function(e){e.exports={name:"compare",category:"Comparison",syntax:["compare(x, y)"],description:"Compare two values. Returns 1 if x is larger than y, -1 if x is smaller than y, and 0 if x and y are equal.",examples:["compare(2, 3)","compare(3, 2)","compare(2, 2)","compare(5cm, 40mm)","compare(2, [1, 2, 3])"],seealso:["equal","unequal","smaller","smallerEq","largerEq"]}},function(e){e.exports={name:"deepEqual",category:"Comparison",syntax:["deepEqual(x, y)"],description:"Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.",examples:["[1,3,4] == [1,3,4]","[1,3,4] == [1,3]"],seealso:["equal","unequal","smaller","larger","smallerEq","largerEq","compare"]}},function(e){e.exports={name:"equal",category:"Comparison",syntax:["x == y","equal(x, y)"],description:"Check equality of two values. Returns true if the values are equal, and false if not.",examples:["2+2 == 3","2+2 == 4","a = 3.2","b = 6-2.8","a == b","50cm == 0.5m"],seealso:["unequal","smaller","larger","smallerEq","largerEq","compare","deepEqual"]}},function(e){e.exports={name:"larger",category:"Comparison",syntax:["x > y","larger(x, y)"],description:"Check if value x is larger than y. Returns true if x is larger than y, and false if not.",examples:["2 > 3","5 > 2*2","a = 3.3","b = 6-2.8","(a > b)","(b < a)","5 cm > 2 inch"],seealso:["equal","unequal","smaller","smallerEq","largerEq","compare"]}},function(e){e.exports={name:"largerEq",category:"Comparison",syntax:["x >= y","largerEq(x, y)"],description:"Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.",examples:["2 > 1+1","2 >= 1+1","a = 3.2","b = 6-2.8","(a > b)"],seealso:["equal","unequal","smallerEq","smaller","largerEq","compare"]}},function(e){e.exports={name:"smaller",category:"Comparison",syntax:["x < y","smaller(x, y)"],description:"Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.",examples:["2 < 3","5 < 2*2","a = 3.3","b = 6-2.8","(a < b)","5 cm < 2 inch"],seealso:["equal","unequal","larger","smallerEq","largerEq","compare"]}},function(e){e.exports={name:"smallerEq",category:"Comparison",syntax:["x <= y","smallerEq(x, y)"],description:"Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.",examples:["2 < 1+1","2 <= 1+1","a = 3.2","b = 6-2.8","(a < b)"],seealso:["equal","unequal","larger","smaller","largerEq","compare"]}},function(e){e.exports={name:"unequal",category:"Comparison",syntax:["x != y","unequal(x, y)"],description:"Check unequality of two values. Returns true if the values are unequal, and false if they are equal.",examples:["2+2 != 3","2+2 != 4","a = 3.2","b = 6-2.8","a != b","50cm != 0.5m","5 cm != 2 inch"],seealso:["equal","smaller","larger","smallerEq","largerEq","compare","deepEqual"]}},function(e){e.exports={name:"arg",category:"Complex",syntax:["arg(x)"],description:"Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).",examples:["arg(2 + 2i)","atan2(3, 2)","arg(2 + 3i)"],seealso:["re","im","conj","abs"]}},function(e){e.exports={name:"conj",category:"Complex",syntax:["conj(x)"],description:"Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.",examples:["conj(2 + 3i)","conj(2 - 3i)","conj(-5.2i)"],seealso:["re","im","abs","arg"]}},function(e){e.exports={name:"re",category:"Complex",syntax:["re(x)"],description:"Get the real part of a complex number.",examples:["re(2 + 3i)","im(2 + 3i)","re(-5.2i)","re(2.4)"],seealso:["im","conj","abs","arg"]}},function(e){e.exports={name:"im",category:"Complex",syntax:["im(x)"],description:"Get the imaginary part of a complex number.",examples:["im(2 + 3i)","re(2 + 3i)","im(-5.2i)","im(2.4)"],seealso:["re","conj","abs","arg"]}},function(e){e.exports={name:"bignumber",category:"Type",syntax:["bignumber(x)"],description:"Create a big number from a number or string.",examples:["0.1 + 0.2","bignumber(0.1) + bignumber(0.2)",'bignumber("7.2")','bignumber("7.2e500")',"bignumber([0.1, 0.2, 0.3])"],seealso:["boolean","complex","index","matrix","string","unit"]}},function(e){e.exports={name:"boolean",category:"Type",syntax:["x","boolean(x)"],description:"Convert a string or number into a boolean.",examples:["boolean(0)","boolean(1)","boolean(3)",'boolean("true")','boolean("false")',"boolean([1, 0, 1, 1])"],seealso:["bignumber","complex","index","matrix","number","string","unit"]}},function(e){e.exports={name:"complex",category:"Type",syntax:["complex()","complex(re, im)","complex(string)"],description:"Create a complex number.",examples:["complex()","complex(2, 3)",'complex("7 - 2i")'],seealso:["bignumber","boolean","index","matrix","number","string","unit"]}},function(e){e.exports={name:"index",category:"Type",syntax:["[start]","[start:end]","[start:step:end]","[start1, start 2, ...]","[start1:end1, start2:end2, ...]","[start1:step1:end1, start2:step2:end2, ...]"],description:"Create an index to get or replace a subset of a matrix",examples:["[]","[1, 2, 3]","A = [1, 2, 3; 4, 5, 6]","A[1, :]","A[1, 2] = 50","A[0:2, 0:2] = ones(2, 2)"],seealso:["bignumber","boolean","complex","matrix,","number","range","string","unit"]}},function(e){e.exports={name:"matrix",category:"Type",syntax:["[]","[a1, b1, ...; a2, b2, ...]","matrix()","matrix([...])"],description:"Create a matrix.",examples:["[]","[1, 2, 3]","[1, 2, 3; 4, 5, 6]","matrix()","matrix([3, 4])"],seealso:["bignumber","boolean","complex","index","number","string","unit"]}},function(e){e.exports={name:"number",category:"Type",syntax:["x","number(x)"],description:"Create a number or convert a string or boolean into a number.",examples:["2","2e3","4.05","number(2)",'number("7.2")',"number(true)","number([true, false, true, true])"],seealso:["bignumber","boolean","complex","index","matrix","string","unit"]}},function(e){e.exports={name:"string",category:"Type",syntax:['"text"',"string(x)"],description:"Create a string or convert a value to a string",examples:['"Hello World!"',"string(4.2)","string(3 + 2i)"],seealso:["bignumber","boolean","complex","index","matrix","number","unit"]}},function(e){e.exports={name:"unit",category:"Type",syntax:["value unit","unit(value, unit)","unit(string)"],description:"Create a unit.",examples:["5.5 mm","3 inch",'unit(7.1, "kilogram")','unit("23 deg")'],seealso:["bignumber","boolean","complex","index","matrix","number","string"]}},function(e){e.exports={name:"eval",category:"Expression",syntax:["eval(expression)","eval([expr1, expr2, expr3, ...])"],description:"Evaluate an expression or an array with expressions.",examples:['eval("2 + 3")','eval("sqrt(" + 4 + ")")'],seealso:[]}},function(e){e.exports={name:"help",category:"Expression",syntax:["help(object)","help(string)"],description:"Display documentation on a function or data type.",examples:["help(sqrt)",'help("complex")'],seealso:[]}},function(e){e.exports={name:"concat",category:"Matrix",syntax:["concat(A, B, C, ...)","concat(A, B, C, ..., dim)"],description:"Concatenate matrices. By default, the matrices are concatenated by the first dimension. The dimension on which to concatenate can be provided as last argument.",examples:["A = [1, 2; 5, 6]","B = [3, 4; 7, 8]","concat(A, B)","[A, B]","concat(A, B, 1)","[A; B]"],seealso:["det","diag","eye","inv","ones","range","size","squeeze","subset","transpose","zeros"]}},function(e){e.exports={name:"det",category:"Matrix",syntax:["det(x)"],description:"Calculate the determinant of a matrix",examples:["det([1, 2; 3, 4])","det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"],seealso:["concat","diag","eye","inv","ones","range","size","squeeze","subset","transpose","zeros"]}},function(e){e.exports={name:"diag",category:"Matrix",syntax:["diag(x)","diag(x, k)"],description:"Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.",examples:["diag(1:3)","diag(1:3, 1)","a = [1, 2, 3; 4, 5, 6; 7, 8, 9]","diag(a)"],seealso:["concat","det","eye","inv","ones","range","size","squeeze","subset","transpose","zeros"]}},function(e){e.exports={name:"eye",category:"Matrix",syntax:["eye(n)","eye(m, n)","eye([m, n])","eye"],description:"Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.",examples:["eye(3)","eye(3, 5)","a = [1, 2, 3; 4, 5, 6]","eye(size(a))"],seealso:["concat","det","diag","inv","ones","range","size","squeeze","subset","transpose","zeros"]}},function(e){e.exports={name:"inv",category:"Matrix",syntax:["inv(x)"],description:"Calculate the inverse of a matrix",examples:["inv([1, 2; 3, 4])","inv(4)","1 / 4"],seealso:["concat","det","diag","eye","ones","range","size","squeeze","subset","transpose","zeros"]}},function(e){e.exports={name:"ones",category:"Matrix",syntax:["ones(m)","ones(m, n)","ones(m, n, p, ...)","ones([m])","ones([m, n])","ones([m, n, p, ...])","ones"],description:"Create a matrix containing ones.",examples:["ones(3)","ones(3, 5)","ones([2,3]) * 4.5","a = [1, 2, 3; 4, 5, 6]","ones(size(a))"],seealso:["concat","det","diag","eye","inv","range","size","squeeze","subset","transpose","zeros"]}},function(e){e.exports={name:"range",category:"Type",syntax:["start:end","start:step:end","range(start, end)","range(start, end, step)","range(string)"],description:"Create a range. Lower bound of the range is included, upper bound is excluded.",examples:["1:5","3:-1:-3","range(3, 7)","range(0, 12, 2)",'range("4:10")',"a = [1, 2, 3, 4; 5, 6, 7, 8]","a[1:2, 1:2]"],seealso:["concat","det","diag","eye","inv","ones","size","squeeze","subset","transpose","zeros"]}},function(e){e.exports={name:"resize",category:"Matrix",syntax:["resize(x, size)","resize(x, size, defaultValue)"],description:"Resize a matrix.",examples:["resize([1,2,3,4,5], [3])","resize([1,2,3], [5], 0)","resize(2, [2, 3], 0)",'resize("hello", [8], "!")'],seealso:["size","subset","squeeze"]}},function(e){e.exports={name:"size",category:"Matrix",syntax:["size(x)"],description:"Calculate the size of a matrix.",examples:["size(2.3)",'size("hello world")',"a = [1, 2; 3, 4; 5, 6]","size(a)","size(1:6)"],seealso:["concat","det","diag","eye","inv","ones","range","squeeze","subset","transpose","zeros"]}},function(e){e.exports={name:"squeeze",category:"Matrix",syntax:["squeeze(x)"],description:"Remove singleton dimensions from a matrix.",examples:["a = zeros(1,3,2)","size(squeeze(a))","b = zeros(3,1,1)","size(squeeze(b))"],seealso:["concat","det","diag","eye","inv","ones","range","size","subset","transpose","zeros"]}},function(e){e.exports={name:"subset",category:"Matrix",syntax:["value(index)","value(index) = replacement","subset(value, [index])","subset(value, [index], replacement)"],description:"Get or set a subset of a matrix or string. Indexes are one-based. Both the ranges lower-bound and upper-bound are included.",examples:["d = [1, 2; 3, 4]","e = []","e[1, 1:2] = [5, 6]","e[2, :] = [7, 8]","f = d * e","f[2, 1]","f[:, 1]"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","transpose","zeros"]}},function(e){e.exports={name:"transpose",category:"Matrix",syntax:["x'","transpose(x)"],description:"Transpose a matrix",examples:["a = [1, 2, 3; 4, 5, 6]","a'","transpose(a)"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","zeros"]}},function(e){e.exports={name:"zeros",category:"Matrix",syntax:["zeros(m)","zeros(m, n)","zeros(m, n, p, ...)","zeros([m])","zeros([m, n])","zeros([m, n, p, ...])","zeros"],description:"Create a matrix containing zeros.",examples:["zeros(3)","zeros(3, 5)","a = [1, 2, 3; 4, 5, 6]","zeros(size(a))"],seealso:["concat","det","diag","eye","inv","ones","range","size","squeeze","subset","transpose"]}},function(e){e.exports={name:"combinations",category:"Probability",syntax:["combinations(n, k)"],description:"Compute the number of combinations of n items taken k at a time",examples:["combinations(7, 5)"],seealso:["permutations","factorial"]}},function(e){e.exports={name:"distribution",category:"Probability",syntax:["distribution(name)","distribution(name, arg1, arg2, ...)"],description:'Create a distribution object of a specific type. A distribution object contains functions `random([size,] [min,] [max])`, `randomInt([size,] [min,] [max])`, and `pickRandom(array)`. Available types of distributions: "uniform", "normal". Note that the function distribution is currently not available via the expression parser.',examples:[],seealso:["random","randomInt"]}},function(e){e.exports={name:"factorial",category:"Probability",syntax:["n!","factorial(n)"],description:"Compute the factorial of a value",examples:["5!","5*4*3*2*1","3!"],seealso:["combinations","permutations"]}},function(e){e.exports={name:"permutations",category:"Probability",syntax:["permutations(n)","permutations(n, k)"],description:"Compute the number of permutations of n items taken k at a time",examples:["permutations(5)","permutations(5, 3)"],seealso:["combinations","factorial"]}},function(e){e.exports={name:"pickRandom",category:"Probability",syntax:["pickRandom(array)"],description:"Pick a random entry from a given array.",examples:["pickRandom(0:10)","pickRandom([1, 3, 1, 6])"],seealso:["distribution","random","randomInt"]}},function(e){e.exports={name:"random",category:"Probability",syntax:["random()","random(max)","random(min, max)","random(size)","random(size, max)","random(size, min, max)"],description:"Return a random number.",examples:["random()","random(10, 20)","random([2, 3])"],seealso:["distribution","pickRandom","randomInt"]}},function(e){e.exports={name:"randInt",category:"Probability",syntax:["randInt()","randInt(max)","randInt(min, max)","randInt(size)","randInt(size, max)","randInt(size, min, max)"],description:"Return a random integer number",examples:["randInt()","randInt(10, 20)","randInt([2, 3], 10)"],seealso:["distribution","pickRandom","random"]}},function(e){e.exports={name:"max",category:"Statistics",syntax:["max(a, b, c, ...)","max(A)","max(A, dim)"],description:"Compute the maximum value of a list of values.",examples:["max(2, 3, 4, 1)","max([2, 3, 4, 1])","max([2, 5; 4, 3], 0)","max([2, 5; 4, 3], 1)","max(2.7, 7.1, -4.5, 2.0, 4.1)","min(2.7, 7.1, -4.5, 2.0, 4.1)"],seealso:["mean","median","min","prod","std","sum","var"]}},function(e){e.exports={name:"mean",category:"Statistics",syntax:["mean(a, b, c, ...)","mean(A)","mean(A, dim)"],description:"Compute the arithmetic mean of a list of values.",examples:["mean(2, 3, 4, 1)","mean([2, 3, 4, 1])","mean([2, 5; 4, 3], 0)","mean([2, 5; 4, 3], 1)","mean([1.0, 2.7, 3.2, 4.0])"],seealso:["max","median","min","prod","std","sum","var"]}},function(e){e.exports={name:"median",category:"Statistics",syntax:["median(a, b, c, ...)","median(A)"],description:"Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.",examples:["median(5, 2, 7)","median([3, -1, 5, 7])"],seealso:["max","mean","min","prod","std","sum","var"]}},function(e){e.exports={name:"min",category:"Statistics",syntax:["min(a, b, c, ...)","min(A)","min(A, dim)"],description:"Compute the minimum value of a list of values.",examples:["min(2, 3, 4, 1)","min([2, 3, 4, 1])","min([2, 5; 4, 3], 0)","min([2, 5; 4, 3], 1)","min(2.7, 7.1, -4.5, 2.0, 4.1)","max(2.7, 7.1, -4.5, 2.0, 4.1)"],seealso:["max","mean","median","prod","std","sum","var"]}},function(e){e.exports={name:"prod",category:"Statistics",syntax:["prod(a, b, c, ...)","prod(A)"],description:"Compute the product of all values.",examples:["prod(2, 3, 4)","prod([2, 3, 4])","prod([2, 5; 4, 3])"],seealso:["max","mean","min","median","min","std","sum","var"]}},function(e){e.exports={name:"std",category:"Statistics",syntax:["std(a, b, c, ...)","std(A)","std(A, normalization)"],description:'Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',examples:["std(2, 4, 6)","std([2, 4, 6, 8])",'std([2, 4, 6, 8], "uncorrected")','std([2, 4, 6, 8], "biased")',"std([1, 2, 3; 4, 5, 6])"],seealso:["max","mean","min","median","min","prod","sum","var"]}},function(e){e.exports={name:"sum",category:"Statistics",syntax:["sum(a, b, c, ...)","sum(A)"],description:"Compute the sum of all values.",examples:["sum(2, 3, 4, 1)","sum([2, 3, 4, 1])","sum([2, 5; 4, 3])"],seealso:["max","mean","median","min","prod","std","sum","var"]}
},function(e){e.exports={name:"var",category:"Statistics",syntax:["var(a, b, c, ...)","var(A)","var(A, normalization)"],description:'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',examples:["var(2, 4, 6)","var([2, 4, 6, 8])",'var([2, 4, 6, 8], "uncorrected")','var([2, 4, 6, 8], "biased")',"var([1, 2, 3; 4, 5, 6])"],seealso:["max","mean","min","median","min","prod","std","sum"]}},function(e){e.exports={name:"acos",category:"Trigonometry",syntax:["acos(x)"],description:"Compute the inverse cosine of a value in radians.",examples:["acos(0.5)","acos(cos(2.3))"],seealso:["cos","atan","asin"]}},function(e){e.exports={name:"asin",category:"Trigonometry",syntax:["asin(x)"],description:"Compute the inverse sine of a value in radians.",examples:["asin(0.5)","asin(sin(2.3))"],seealso:["sin","acos","atan"]}},function(e){e.exports={name:"atan",category:"Trigonometry",syntax:["atan(x)"],description:"Compute the inverse tangent of a value in radians.",examples:["atan(0.5)","atan(tan(2.3))"],seealso:["tan","acos","asin"]}},function(e){e.exports={name:"atan2",category:"Trigonometry",syntax:["atan2(y, x)"],description:"Computes the principal value of the arc tangent of y/x in radians.",examples:["atan2(2, 2) / pi","angle = 60 deg in rad","x = cos(angle)","y = sin(angle)","atan2(y, x)"],seealso:["sin","cos","tan"]}},function(e){e.exports={name:"cos",category:"Trigonometry",syntax:["cos(x)"],description:"Compute the cosine of x in radians.",examples:["cos(2)","cos(pi / 4) ^ 2","cos(180 deg)","cos(60 deg)","sin(0.2)^2 + cos(0.2)^2"],seealso:["acos","sin","tan"]}},function(e){e.exports={name:"cosh",category:"Trigonometry",syntax:["cosh(x)"],description:"Compute the hyperbolic cosine of x in radians.",examples:["cosh(0.5)"],seealso:["sinh","tanh","coth"]}},function(e){e.exports={name:"cot",category:"Trigonometry",syntax:["cot(x)"],description:"Compute the cotangent of x in radians. Defined as 1/tan(x)",examples:["cot(2)","1 / tan(2)"],seealso:["sec","csc","tan"]}},function(e){e.exports={name:"coth",category:"Trigonometry",syntax:["coth(x)"],description:"Compute the hyperbolic cotangent of x in radians.",examples:["coth(2)","1 / tanh(2)"],seealso:["sech","csch","tanh"]}},function(e){e.exports={name:"csc",category:"Trigonometry",syntax:["csc(x)"],description:"Compute the cosecant of x in radians. Defined as 1/sin(x)",examples:["csc(2)","1 / sin(2)"],seealso:["sec","cot","sin"]}},function(e){e.exports={name:"csch",category:"Trigonometry",syntax:["csch(x)"],description:"Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)",examples:["csch(2)","1 / sinh(2)"],seealso:["sech","coth","sinh"]}},function(e){e.exports={name:"sec",category:"Trigonometry",syntax:["sec(x)"],description:"Compute the secant of x in radians. Defined as 1/cos(x)",examples:["sec(2)","1 / cos(2)"],seealso:["cot","csc","cos"]}},function(e){e.exports={name:"sech",category:"Trigonometry",syntax:["sech(x)"],description:"Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)",examples:["sech(2)","1 / cosh(2)"],seealso:["coth","csch","cosh"]}},function(e){e.exports={name:"sin",category:"Trigonometry",syntax:["sin(x)"],description:"Compute the sine of x in radians.",examples:["sin(2)","sin(pi / 4) ^ 2","sin(90 deg)","sin(30 deg)","sin(0.2)^2 + cos(0.2)^2"],seealso:["asin","cos","tan"]}},function(e){e.exports={name:"sinh",category:"Trigonometry",syntax:["sinh(x)"],description:"Compute the hyperbolic sine of x in radians.",examples:["sinh(0.5)"],seealso:["cosh","tanh"]}},function(e){e.exports={name:"tan",category:"Trigonometry",syntax:["tan(x)"],description:"Compute the tangent of x in radians.",examples:["tan(0.5)","sin(0.5) / cos(0.5)","tan(pi / 4)","tan(45 deg)"],seealso:["atan","sin","cos"]}},function(e){e.exports={name:"tanh",category:"Trigonometry",syntax:["tanh(x)"],description:"Compute the hyperbolic tangent of x in radians.",examples:["tanh(0.5)","sinh(0.5) / cosh(0.5)"],seealso:["sinh","cosh"]}},function(e){e.exports={name:"to",category:"Units",syntax:["x to unit","to(x, unit)"],description:"Change the unit of a value.",examples:["5 inch to cm","3.2kg to g","16 bytes in bits"],seealso:[]}},function(e){e.exports={name:"clone",category:"Utils",syntax:["clone(x)"],description:"Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices",examples:["clone(3.5)","clone(2 - 4i)","clone(45 deg)","clone([1, 2; 3, 4])",'clone("hello world")'],seealso:[]}},function(e){e.exports={name:"map",category:"Utils",syntax:["map(x, callback)"],description:"Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.",examples:["map([1, 2, 3], function(val) { return value * value })"],seealso:[]}},function(e){e.exports={name:"forEach",category:"Utils",syntax:["forEach(x, callback)"],description:"Iterates over all elements of a matrix/array, and executes the given callback function.",examples:["forEach([1, 2, 3], function(val) { console.log(val) })"],seealso:["unit"]}},function(e){e.exports={name:"format",category:"Utils",syntax:["format(value)","format(value, precision)"],description:"Format a value of any type as string.",examples:["format(2.3)","format(3 - 4i)","format([])","format(pi, 3)"],seealso:["print"]}},function(e){e.exports={name:"import",category:"Utils",syntax:["import(string)"],description:"Import functions from a file.",examples:['import("numbers")','import("./mylib.js")'],seealso:[]}},function(e){e.exports={name:"typeof",category:"Utils",syntax:["typeof(x)"],description:"Get the type of a variable.",examples:["typeof(3.5)","typeof(2 - 4i)","typeof(45 deg)",'typeof("hello world")'],seealso:[]}},function(e,r){r.isBoolean=function(e){return e instanceof Boolean||"boolean"==typeof e}},function(e,r,n){var t=n(123),i=n(161).isNumber;digits=n(161).digits,r.isBigNumber=function(e){return e instanceof t},r.format=function(e,n){if("function"==typeof n)return n(e);if(!e.isFinite())return e.isNaN()?"NaN":e.gt(0)?"Infinity":"-Infinity";var t="auto",o=void 0;switch(void 0!==n&&(n.notation&&(t=n.notation),i(n)?o=n:n.precision&&(o=n.precision)),t){case"fixed":return r.toFixed(e,o);case"exponential":return r.toExponential(e,o);case"auto":var a=.001,s=1e5;n&&n.exponential&&(void 0!==n.exponential.lower&&(a=n.exponential.lower),void 0!==n.exponential.upper&&(s=n.exponential.upper));{({toExpNeg:e.constructor.toExpNeg,toExpPos:e.constructor.toExpPos})}if(e.constructor.config({toExpNeg:Math.round(Math.log(a)/Math.LN10),toExpPos:Math.round(Math.log(s)/Math.LN10)}),e.isZero())return"0";var u,f=e.abs();return u=f.gte(a)&&f.lt(s)?e.toSignificantDigits(o).toFixed():r.toExponential(e,o),u.replace(/((\.\d*?)(0+))($|e)/,function(){var e=arguments[2],r=arguments[4];return"."!==e?e+r:r});default:throw new Error('Unknown notation "'+t+'". Choose "auto", "exponential", or "fixed".')}},r.toExponential=function(e,r){return void 0!==r?e.toExponential(r-1):e.toExponential()},r.toFixed=function(e,r){return e.toFixed(r||0)}},function(e,r,n){function t(){for(var e,r=Array.prototype.slice.call(arguments),n=0,t=r.length;t>n;n++){e=r[n];for(var i in e)e.hasOwnProperty(i)&&(x[i]=e[i])}}function i(e,r){return"undefined"!=typeof e[r]}function o(e){return function(r){return i(e,r)}}function a(e){return function(n){if("boolean"==typeof e[n])n=e[n]===!0?"\\"+n:"\\mathrm{"+n+"}";else if("string"==typeof e[n])n=e[n];else if("string"==typeof n){var t=n.indexOf("_");-1!==t&&(n=r.toSymbol(n.substring(0,t))+"_{"+r.toSymbol(n.substring(t+1))+"}")}return n}}var s=n(129),u=n(137),f={Alpha:"A",alpha:!0,Beta:"B",beta:!0,Gamma:!0,gamma:!0,Delta:!0,delta:!0,Epsilon:"E",epsilon:!0,varepsilon:!0,Zeta:"Z",zeta:!0,Eta:"H",eta:!0,Theta:!0,theta:!0,vartheta:!0,Iota:"I",iota:!0,Kappa:"K",kappa:!0,varkappa:!0,Lambda:!0,lambda:!0,Mu:"M",mu:!0,Nu:"N",nu:!0,Xi:!0,xi:!0,Omicron:"O",omicron:!0,Pi:!0,pi:!0,varpi:!0,Rho:"P",rho:!0,varrho:!0,Sigma:!0,sigma:!0,varsigma:!0,Tau:"T",tau:!0,Upsilon:!0,upsilon:!0,Phi:!0,phi:!0,varphi:!0,Chi:"X",chi:!0,Psi:!0,psi:!0,Omega:!0,omega:!0},c={dots:!0,ldots:!0,cdots:!0,vdots:!0,ddots:!0,idots:!0},l={"true":"\\mathrm{True}","false":"\\mathrm{False}"},p={inf:"\\infty",Inf:"\\infty",infinity:"\\infty",Infinity:"\\infty",oo:"\\infty",lim:!0,undefined:"\\mathbf{?}"},m={acos:"\\cos^{-1}",arccos:"\\cos^{-1}",cos:!0,csc:!0,csch:!1,exp:!0,ker:!0,limsup:!0,min:!0,sinh:!0,asin:"\\sin^{-1}",arcsin:"\\sin^{-1}",cosh:!0,deg:!0,gcd:!0,lg:!0,ln:!0,Pr:!0,sup:!0,atan:"\\tan^{-1}",atan2:"\\tan2^{-1}",arctan:"\\tan^{-1}",cot:!0,det:!0,hom:!0,log:!0,log10:"\\log_{10}",sec:!0,sech:!1,tan:!0,arg:!0,coth:!0,dim:!0,inf:!0,max:!0,sin:!0,tanh:!0,fix:!1,lcm:!1,sign:!1,xgcd:!1,unaryMinus:!1,unaryPlus:!1,complex:!1,conj:!1,im:!1,re:!1,diag:!1,resize:!1,size:!1,squeeze:!1,subset:!1,index:!1,ones:!1,zeros:!1,range:!1,random:!1,mean:"\\mu",median:!1,prod:!1,std:"\\sigma","var":"\\sigma^2"},h={sqrt:!0,inv:!0,"int":"\\int",Int:"\\int",integrate:"\\int",eigenvalues:"\\lambda",liminf:!0,lim:!0,exp:"e^",sum:!0,eye:"\\mathbf{I}"},g={"<=":"\\leq",">=":"\\geq","!=":"\\neq","in":!0,"*":"\\cdot","/":"\\frac",mod:"\\bmod",to:"\\rightarrow"},d={deg:"^{\\circ}"},x={};t(m,h,f,c,l,p),r.isSymbol=o(x),r.toSymbol=a(x),r.isFunction=o(m),r.toFunction=a(m),r.isCurlyFunction=o(h),r.toCurlyFunction=a(h),r.isOperator=o(g),r.toOperator=a(g),r.isUnit=o(d),r.toUnit=function(){var e=a(d);return function(n,t){return r.isUnit(n)?e(n):(t?"":"\\,")+"\\mathrm{"+n+"}"}}(),r.addBraces=function(e,r,n){if(null===r)return e;var t=["",""];switch(n=n||"normal","undefined"==typeof r||r===!1?t=["{","}"]:r===!0?(t=["(",")"],n="lr"):t=_.isArray(r)&&2===r.length?r:[r,r],n){case"normal":case!1:return t[0]+e+t[1];case"lr":return"\\left"+t[0]+"{"+e+"}\\right"+t[1];case"be":return"\\begin{"+t[0]+"}"+e+"\\end{"+t[1]+"}"}return t[0]+e+t[1]},r.toParams=function(e){var n=e.object,t=e.params,i=n.toTex(),o=null,a=null,f=!1,c=!1,l="",p="",m=null;switch(n.name){case"add":m="+";break;case"subtract":m="-";break;case"larger":m=">";break;case"largerEq":m=">=";break;case"smaller":m="<";break;case"smallerEq":m="<=";break;case"unequal":m="!=";break;case"equal":m="=";break;case"mod":m="mod";break;case"multiply":m="*";break;case"pow":m="^";break;case"concat":m="||";break;case"factorial":m="!";break;case"permutations":if(1!==t.length){var h=t[0].toTex(),g=t[1].toTex();return"\\frac{"+h+"!}{\\left("+h+" - "+g+"\\right)!}"}m="!";break;case"combinations":m="\\choose";break;case"abs":a="|",f="lr";break;case"norm":if(a="\\|",f="lr",2===t.length){var d=t[1].toTex();"\\text{inf}"===d?d="\\infty":"\\text{-inf}"===d?d="{- \\infty}":"\\text{fro}"===d&&(d="F"),p="_{"+d+"}",t=[t[0]]}break;case"ceil":a=["\\lceil","\\rceil"],f="lr";break;case"floor":a=["\\lfloor","\\rfloor"],f="lr";break;case"round":a=["\\lfloor","\\rceil"],f="lr",2===t.length&&(p="_"+r.addBraces(t[1].toTex()),t=[t[0]]);break;case"inv":p="^{-1}";break;case"transpose":p="^{T}",a=!1;break;case"log":var x="e";2===t.length&&(x=t[1].toTex(),i="\\log_{"+x+"}",t=[t[0]]),"e"===x&&(i="\\ln"),c=!0;break;case"square":p="^{2}";break;case"cube":p="^{3}";break;case"eye":c=!0,a=!1,i+="_";break;case"det":if(e.params[0]instanceof s)return e.params[0].toTex("vmatrix");a="vmatrix",f="be";break;default:c=!0}return null!==m?(a="+"===m||"-"===m,o=new u(m,n.name,t).toTex()):m=", ",null!==a||r.isCurlyFunction(n.name)||(a=!0),o=o||t.map(function(e){return"{"+e.toTex()+"}"}).join(m),l+(c?i:"")+r.addBraces(o,a,f)+p}},function(e){e.exports={end:!0}}])});