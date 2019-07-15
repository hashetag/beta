/*! pace 0.4.17 */
(function () {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V = [].slice, W = {}.hasOwnProperty, X = function (a, b) {
        function c() {
            this.constructor = a
        }

        for (var d in b)W.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
    }, Y = [].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)if (b in this && this[b] === a)return b;
            return -1
        };
    for (t = {
        catchupTime: 500,
        initialRate: .03,
        minTime: 500,
        ghostTime: 500,
        maxProgressPerFrame: 10,
        easeFactor: 1.25,
        startOnPageLoad: !0,
        restartOnPushState: !0,
        restartOnRequestAfter: 500,
        target: "body",
        elements: {checkInterval: 100, selectors: ["body"]},
        eventLag: {minSamples: 10, sampleCount: 3, lagThreshold: 3},
        ajax: {trackMethods: ["GET"], trackWebSockets: !1}
    }, B = function () {
        var a;
        return null != (a = "undefined" != typeof performance && null !== performance ? "function" == typeof performance.now ? performance.now() : void 0 : void 0) ? a : +new Date
    }, D = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, s = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == D && (D = function (a) {
        return setTimeout(a, 50)
    }, s = function (a) {
        return clearTimeout(a)
    }), F = function (a) {
        var b, c;
        return b = B(), (c = function () {
            var d;
            return d = B() - b, d >= 33 ? (b = B(), a(d, function () {
                return D(c)
            })) : setTimeout(c, 33 - d)
        })()
    }, E = function () {
        var a, b, c;
        return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? V.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b]
    }, u = function () {
        var a, b, c, d, e, f, g;
        for (b = arguments[0], d = 2 <= arguments.length ? V.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++)if (c = d[f])for (a in c)W.call(c, a) && (e = c[a], null != b[a] && "object" == typeof b[a] && null != e && "object" == typeof e ? u(b[a], e) : b[a] = e);
        return b
    }, p = function (a) {
        var b, c, d, e, f;
        for (c = b = 0, e = 0, f = a.length; f > e; e++)d = a[e], c += Math.abs(d), b++;
        return c / b
    }, w = function (a, b) {
        var c, d, e;
        if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
            if (c = e.getAttribute("data-pace-" + a), !b)return c;
            try {
                return JSON.parse(c)
            } catch (f) {
                return d = f, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0
            }
        }
    }, g = function () {
        function a() {
        }

        return a.prototype.on = function (a, b, c, d) {
            var e;
            return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({
                handler: b,
                ctx: c,
                once: d
            })
        }, a.prototype.once = function (a, b, c) {
            return this.on(a, b, c, !0)
        }, a.prototype.off = function (a, b) {
            var c, d, e;
            if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
                if (null == b)return delete this.bindings[a];
                for (c = 0, e = []; c < this.bindings[a].length;)this.bindings[a][c].handler === b ? e.push(this.bindings[a].splice(c, 1)) : e.push(c++);
                return e
            }
        }, a.prototype.trigger = function () {
            var a, b, c, d, e, f, g, h, i;
            if (c = arguments[0], a = 2 <= arguments.length ? V.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
                for (e = 0, i = []; e < this.bindings[c].length;)h = this.bindings[c][e], d = h.handler, b = h.ctx, f = h.once, d.apply(null != b ? b : this, a), f ? i.push(this.bindings[c].splice(e, 1)) : i.push(e++);
                return i
            }
        }, a
    }(), null == window.Pace && (window.Pace = {}), u(Pace, g.prototype), C = Pace.options = u({}, t, window.paceOptions, w()), S = ["ajax", "document", "eventLag", "elements"], O = 0, Q = S.length; Q > O; O++)I = S[O], C[I] === !0 && (C[I] = t[I]);
    i = function (a) {
        function b() {
            return T = b.__super__.constructor.apply(this, arguments)
        }

        return X(b, a), b
    }(Error), b = function () {
        function a() {
            this.progress = 0
        }

        return a.prototype.getElement = function () {
            var a;
            if (null == this.el) {
                if (a = document.querySelector(C.target), !a)throw new i;
                this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace("pace-done", ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el)
            }
            return this.el
        }, a.prototype.finish = function () {
            var a;
            return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
        }, a.prototype.update = function (a) {
            return this.progress = a, this.render()
        }, a.prototype.destroy = function () {
            try {
                this.getElement().parentNode.removeChild(this.getElement())
            } catch (a) {
                i = a
            }
            return this.el = void 0
        }, a.prototype.render = function () {
            var a, b;
            return null == document.querySelector(C.target) ? !1 : (a = this.getElement(), a.children[0].style.width = "" + this.progress + "%", (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? b = "99" : (b = this.progress < 10 ? "0" : "", b += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + b)), this.lastRenderedProgress = this.progress)
        }, a.prototype.done = function () {
            return this.progress >= 100
        }, a
    }(), h = function () {
        function a() {
            this.bindings = {}
        }

        return a.prototype.trigger = function (a, b) {
            var c, d, e, f, g;
            if (null != this.bindings[a]) {
                for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++)c = f[d], g.push(c.call(this, b));
                return g
            }
        }, a.prototype.on = function (a, b) {
            var c;
            return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b)
        }, a
    }(), N = window.XMLHttpRequest, M = window.XDomainRequest, L = window.WebSocket, v = function (a, b) {
        var c, d, e, f;
        f = [];
        for (d in b.prototype)try {
            e = b.prototype[d], null == a[d] && "function" != typeof e ? f.push(a[d] = e) : f.push(void 0)
        } catch (g) {
            c = g
        }
        return f
    }, z = [], Pace.ignore = function () {
        var a, b, c;
        return b = arguments[0], a = 2 <= arguments.length ? V.call(arguments, 1) : [], z.unshift("ignore"), c = b.apply(null, a), z.shift(), c
    }, Pace.track = function () {
        var a, b, c;
        return b = arguments[0], a = 2 <= arguments.length ? V.call(arguments, 1) : [], z.unshift("track"), c = b.apply(null, a), z.shift(), c
    }, H = function (a) {
        var b;
        if (null == a && (a = "GET"), "track" === z[0])return "force";
        if (!z.length && C.ajax) {
            if ("socket" === a && C.ajax.trackWebSockets)return !0;
            if (b = a.toUpperCase(), Y.call(C.ajax.trackMethods, b) >= 0)return !0
        }
        return !1
    }, j = function (a) {
        function b() {
            var a, c = this;
            b.__super__.constructor.apply(this, arguments), a = function (a) {
                var b;
                return b = a.open, a.open = function (d, e) {
                    return H(d) && c.trigger("request", {type: d, url: e, request: a}), b.apply(a, arguments)
                }
            }, window.XMLHttpRequest = function (b) {
                var c;
                return c = new N(b), a(c), c
            }, v(window.XMLHttpRequest, N), null != M && (window.XDomainRequest = function () {
                var b;
                return b = new M, a(b), b
            }, v(window.XDomainRequest, M)), null != L && C.ajax.trackWebSockets && (window.WebSocket = function (a, b) {
                var d;
                return d = new L(a, b), H("socket") && c.trigger("request", {
                    type: "socket",
                    url: a,
                    protocols: b,
                    request: d
                }), d
            }, v(window.WebSocket, L))
        }

        return X(b, a), b
    }(h), P = null, x = function () {
        return null == P && (P = new j), P
    }, x().on("request", function (b) {
        var c, d, e, f;
        return f = b.type, e = b.request, Pace.running || C.restartOnRequestAfter === !1 && "force" !== H(f) ? void 0 : (d = arguments, c = C.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function () {
            var b, c, g, h, i, j;
            if (b = "socket" === f ? e.readyState < 2 : 0 < (h = e.readyState) && 4 > h) {
                for (Pace.restart(), i = Pace.sources, j = [], c = 0, g = i.length; g > c; c++) {
                    if (I = i[c], I instanceof a) {
                        I.watch.apply(I, d);
                        break
                    }
                    j.push(void 0)
                }
                return j
            }
        }, c))
    }), a = function () {
        function a() {
            var a = this;
            this.elements = [], x().on("request", function () {
                return a.watch.apply(a, arguments)
            })
        }

        return a.prototype.watch = function (a) {
            var b, c, d;
            return d = a.type, b = a.request, c = "socket" === d ? new m(b) : new n(b), this.elements.push(c)
        }, a
    }(), n = function () {
        function a(a) {
            var b, c, d, e, f, g, h = this;
            if (this.progress = 0, null != window.ProgressEvent)for (c = null, a.addEventListener("progress", function (a) {
                return h.progress = a.lengthComputable ? 100 * a.loaded / a.total : h.progress + (100 - h.progress) / 2
            }), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++)b = g[d], a.addEventListener(b, function () {
                return h.progress = 100
            }); else f = a.onreadystatechange, a.onreadystatechange = function () {
                var b;
                return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50), "function" == typeof f ? f.apply(null, arguments) : void 0
            }
        }

        return a
    }(), m = function () {
        function a(a) {
            var b, c, d, e, f = this;
            for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++)b = e[c], a.addEventListener(b, function () {
                return f.progress = 100
            })
        }

        return a
    }(), d = function () {
        function a(a) {
            var b, c, d, f;
            for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++)b = f[c], this.elements.push(new e(b))
        }

        return a
    }(), e = function () {
        function a(a) {
            this.selector = a, this.progress = 0, this.check()
        }

        return a.prototype.check = function () {
            var a = this;
            return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
                return a.check()
            }, C.elements.checkInterval)
        }, a.prototype.done = function () {
            return this.progress = 100
        }, a
    }(), c = function () {
        function a() {
            var a, b, c = this;
            this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function () {
                return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0
            }
        }

        return a.prototype.states = {loading: 0, interactive: 50, complete: 100}, a
    }(), f = function () {
        function a() {
            var a, b, c, d, e, f = this;
            this.progress = 0, a = 0, e = [], d = 0, c = B(), b = setInterval(function () {
                var g;
                return g = B() - c - 50, c = B(), e.push(g), e.length > C.eventLag.sampleCount && e.shift(), a = p(e), ++d >= C.eventLag.minSamples && a < C.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3))
            }, 50)
        }

        return a
    }(), l = function () {
        function a(a) {
            this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = C.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = E(this.source, "progress"))
        }

        return a.prototype.tick = function (a, b) {
            var c;
            return null == b && (b = E(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / C.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, C.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + C.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
        }, a
    }(), J = null, G = null, q = null, K = null, o = null, r = null, Pace.running = !1, y = function () {
        return C.restartOnPushState ? Pace.restart() : void 0
    }, null != window.history.pushState && (R = window.history.pushState, window.history.pushState = function () {
        return y(), R.apply(window.history, arguments)
    }), null != window.history.replaceState && (U = window.history.replaceState, window.history.replaceState = function () {
        return y(), U.apply(window.history, arguments)
    }), k = {ajax: a, elements: d, document: c, eventLag: f}, (A = function () {
        var a, c, d, e, f, g, h, i;
        for (Pace.sources = J = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++)a = g[c], C[a] !== !1 && J.push(new k[a](C[a]));
        for (i = null != (h = C.extraSources) ? h : [], d = 0, f = i.length; f > d; d++)I = i[d], J.push(new I(C));
        return Pace.bar = q = new b, G = [], K = new l
    })(), Pace.stop = function () {
        return Pace.trigger("stop"), Pace.running = !1, q.destroy(), r = !0, null != o && ("function" == typeof s && s(o), o = null), A()
    }, Pace.restart = function () {
        return Pace.trigger("restart"), Pace.stop(), Pace.start()
    }, Pace.go = function () {
        return Pace.running = !0, q.render(), r = !1, o = F(function (a, b) {
            var c, d, e, f, g, h, i, j, k, m, n, o, p, s, t, u, v;
            for (j = 100 - q.progress, d = o = 0, e = !0, h = p = 0, t = J.length; t > p; h = ++p)for (I = J[h], m = null != G[h] ? G[h] : G[h] = [], g = null != (v = I.elements) ? v : [I], i = s = 0, u = g.length; u > s; i = ++s)f = g[i], k = null != m[i] ? m[i] : m[i] = new l(f), e &= k.done, k.done || (d++, o += k.tick(a));
            return c = o / d, q.update(K.tick(a, c)), n = B(), q.done() || e || r ? (q.update(100), Pace.trigger("done"), setTimeout(function () {
                return q.finish(), Pace.running = !1, Pace.trigger("hide")
            }, Math.max(C.ghostTime, Math.min(C.minTime, B() - n)))) : b()
        })
    }, Pace.start = function (a) {
        u(C, a), Pace.running = !0;
        try {
            q.render()
        } catch (b) {
            i = b
        }
        return document.querySelector(".pace") ? (Pace.trigger("start"), Pace.go()) : setTimeout(Pace.start, 50)
    }, "function" == typeof define && define.amd ? define(function () {
        return Pace
    }) : "object" == typeof exports ? module.exports = Pace : C.startOnPageLoad && Pace.start()
}).call(this);
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-eventlistener-forcetouch-localstorage-touchevents-mq-prefixes-setclasses-shiv-teststyles !*/
!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,a,s;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],t=C[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)a=e[i],s=a.split("."),1===s.length?Modernizr[s[0]]=o:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=o),y.push((o?"":"no-")+s.join("-"))}}function i(e){var t=b.className,n=Modernizr._config.classPrefix||"";if(_&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),_?b.className.baseVal=t:b.className=t)}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):_?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function s(){var e=t.body;return e||(e=a(_?"svg":"body"),e.fake=!0),e}function l(e,n,r,o){var i,l,u,c,f="modernizr",d=a("div"),p=s();if(parseInt(r,10))for(;r--;)u=a("div"),u.id=o?o[r]:f+(r+1),d.appendChild(u);return i=a("style"),i.type="text/css",i.id="s"+f,(p.fake?p:d).appendChild(i),p.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),d.id=f,p.fake&&(p.style.background="",p.style.overflow="hidden",c=b.style.overflow,b.style.overflow="hidden",b.appendChild(p)),l=n(d,e),p.fake?(p.parentNode.removeChild(p),b.style.overflow=c,b.offsetHeight):d.parentNode.removeChild(d),!!l}function u(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function c(e,t){return!!~(""+e).indexOf(t)}function f(e,t){return function(){return e.apply(t,arguments)}}function d(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?f(o,n||t):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(t,n,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,t,n);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var a=i.error?"error":"log";i[a].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!n&&t.currentStyle&&t.currentStyle[r];return o}function h(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+p(t[o])+":"+r+")");return i=i.join(" or "),l("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==m(e,null,"position")})}return n}function v(e,t,o,i){function s(){f&&(delete O.style,delete O.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var l=h(e,o);if(!r(l,"undefined"))return l}for(var f,d,p,m,v,g=["modernizr","tspan","samp"];!O.style&&g.length;)f=!0,O.modElem=a(g.shift()),O.style=O.modElem.style;for(p=e.length,d=0;p>d;d++)if(m=e[d],v=O.style[m],c(m,"-")&&(m=u(m)),O.style[m]!==n){if(i||r(o,"undefined"))return s(),"pfx"==t?m:!0;try{O.style[m]=o}catch(y){}if(O.style[m]!=v)return s(),"pfx"==t?m:!0}return s(),!1}function g(e,t,n,o,i){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+z.join(a+" ")+a).split(" ");return r(t,"string")||r(t,"undefined")?v(s,t,o,i):(s=(e+" "+j.join(a+" ")+a).split(" "),d(s,t,n))}var y=[],C=[],E={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){C.push({name:e,fn:t,options:n})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=E,Modernizr=new Modernizr,Modernizr.addTest("eventlistener","addEventListener"in e),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}});var S=E._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];E._prefixes=S;var b=t.documentElement,_="svg"===b.nodeName.toLowerCase();_||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=C.elements;return"string"==typeof e?e.split(" "):e}function o(e,t){var n=C.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),C.elements=n+" "+e,u(t)}function i(e){var t=y[e[v]];return t||(t={},g++,e[v]=g,y[g]=t),t}function a(e,n,r){if(n||(n=t),f)return n.createElement(e);r||(r=i(n));var o;return o=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!o.canHaveChildren||m.test(e)||o.tagUrn?o:r.frag.appendChild(o)}function s(e,n){if(e||(e=t),f)return e.createDocumentFragment();n=n||i(e);for(var o=n.frag.cloneNode(),a=0,s=r(),l=s.length;l>a;a++)o.createElement(s[a]);return o}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return C.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(C,t.frag)}function u(e){e||(e=t);var r=i(e);return!C.shivCSS||c||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),f||l(e,r),e}var c,f,d="3.7.3",p=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,v="_html5shiv",g=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,f=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){c=!0,f=!0}}();var C={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:d,shivCSS:p.shivCSS!==!1,supportsUnknownElements:f,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:u,createElement:a,createDocumentFragment:s,addElements:o};e.html5=C,u(t),"object"==typeof module&&module.exports&&(module.exports=C)}("undefined"!=typeof e?e:this,t);var x=function(){function e(e,t){var o;return e?(t&&"string"!=typeof t||(t=a(t||"div")),e="on"+e,o=e in t,!o&&r&&(t.setAttribute||(t=a("div")),t.setAttribute(e,""),o="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),o):!1}var r=!("onblur"in t.documentElement);return e}();E.hasEvent=x;var w=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return l("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();E.mq=w;var T=E.testStyles=l;Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",S.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");T(r,function(e){n=9===e.offsetTop})}return n});var N="Moz O ms Webkit",z=E._config.usePrefixes?N.split(" "):[];E._cssomPrefixes=z;var M=function(t){var r,o=S.length,i=e.CSSRule;if("undefined"==typeof i)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+t;for(var a=0;o>a;a++){var s=S[a],l=s.toUpperCase()+"_"+r;if(l in i)return"@-"+s.toLowerCase()+"-"+t}return!1};E.atRule=M;var j=E._config.usePrefixes?N.toLowerCase().split(" "):[];E._domPrefixes=j;var F={elem:a("modernizr")};Modernizr._q.push(function(){delete F.elem});var O={style:F.elem.style};Modernizr._q.unshift(function(){delete O.style}),E.testAllProps=g;var k=E.prefixed=function(e,t,n){return 0===e.indexOf("@")?M(e):(-1!=e.indexOf("-")&&(e=u(e)),t?g(e,t,n):g(e,"pfx"))};Modernizr.addTest("forcetouch",function(){return x(k("mouseforcewillbegin",e,!1),e)?MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN&&MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN:!1}),o(),i(y),delete E.addTest,delete E.addAsyncTest;for(var D=0;D<Modernizr._q.length;D++)Modernizr._q[D]();e.Modernizr=Modernizr}(window,document);
/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){"use strict";var n=[],r=e.document,i=Object.getPrototypeOf,o=n.slice,a=n.concat,s=n.push,u=n.indexOf,l={},c=l.toString,f=l.hasOwnProperty,p=f.toString,d=p.call(Object),h={},g=function e(t){return"function"==typeof t&&"number"!=typeof t.nodeType},y=function e(t){return null!=t&&t===t.window},v={type:!0,src:!0,noModule:!0};function m(e,t,n){var i,o=(t=t||r).createElement("script");if(o.text=e,n)for(i in v)n[i]&&(o[i]=n[i]);t.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[c.call(e)]||"object":typeof e}var b="3.3.1",w=function(e,t){return new w.fn.init(e,t)},T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.fn=w.prototype={jquery:"3.3.1",constructor:w,length:0,toArray:function(){return o.call(this)},get:function(e){return null==e?o.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=w.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return w.each(this,e)},map:function(e){return this.pushStack(w.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(o.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:n.sort,splice:n.splice},w.extend=w.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||g(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],a!==(r=e[t])&&(l&&r&&(w.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,o=n&&Array.isArray(n)?n:[]):o=n&&w.isPlainObject(n)?n:{},a[t]=w.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},w.extend({expando:"jQuery"+("3.3.1"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==c.call(e))&&(!(t=i(e))||"function"==typeof(n=f.call(t,"constructor")&&t.constructor)&&p.call(n)===d)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e){m(e)},each:function(e,t){var n,r=0;if(C(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(C(Object(e))?w.merge(n,"string"==typeof e?[e]:e):s.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:u.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)(r=!t(e[o],o))!==s&&i.push(e[o]);return i},map:function(e,t,n){var r,i,o=0,s=[];if(C(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&s.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&s.push(i);return a.apply([],s)},guid:1,support:h}),"function"==typeof Symbol&&(w.fn[Symbol.iterator]=n[Symbol.iterator]),w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function C(e){var t=!!e&&"length"in e&&e.length,n=x(e);return!g(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}var E=function(e){var t,n,r,i,o,a,s,u,l,c,f,p,d,h,g,y,v,m,x,b="sizzle"+1*new Date,w=e.document,T=0,C=0,E=ae(),k=ae(),S=ae(),D=function(e,t){return e===t&&(f=!0),0},N={}.hasOwnProperty,A=[],j=A.pop,q=A.push,L=A.push,H=A.slice,O=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},P="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",I="\\["+M+"*("+R+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+R+"))|)"+M+"*\\]",W=":("+R+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+I+")*)|.*)\\)|)",$=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),F=new RegExp("^"+M+"*,"+M+"*"),_=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),z=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),X=new RegExp(W),U=new RegExp("^"+R+"$"),V={ID:new RegExp("^#("+R+")"),CLASS:new RegExp("^\\.("+R+")"),TAG:new RegExp("^("+R+"|[*])"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+W),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+P+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},G=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Q=/^[^{]+\{\s*\[native \w/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,K=/[+~]/,Z=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ee=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},te=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ne=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},re=function(){p()},ie=me(function(e){return!0===e.disabled&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{L.apply(A=H.call(w.childNodes),w.childNodes),A[w.childNodes.length].nodeType}catch(e){L={apply:A.length?function(e,t){q.apply(e,H.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function oe(e,t,r,i){var o,s,l,c,f,h,v,m=t&&t.ownerDocument,T=t?t.nodeType:9;if(r=r||[],"string"!=typeof e||!e||1!==T&&9!==T&&11!==T)return r;if(!i&&((t?t.ownerDocument||t:w)!==d&&p(t),t=t||d,g)){if(11!==T&&(f=J.exec(e)))if(o=f[1]){if(9===T){if(!(l=t.getElementById(o)))return r;if(l.id===o)return r.push(l),r}else if(m&&(l=m.getElementById(o))&&x(t,l)&&l.id===o)return r.push(l),r}else{if(f[2])return L.apply(r,t.getElementsByTagName(e)),r;if((o=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return L.apply(r,t.getElementsByClassName(o)),r}if(n.qsa&&!S[e+" "]&&(!y||!y.test(e))){if(1!==T)m=t,v=e;else if("object"!==t.nodeName.toLowerCase()){(c=t.getAttribute("id"))?c=c.replace(te,ne):t.setAttribute("id",c=b),s=(h=a(e)).length;while(s--)h[s]="#"+c+" "+ve(h[s]);v=h.join(","),m=K.test(e)&&ge(t.parentNode)||t}if(v)try{return L.apply(r,m.querySelectorAll(v)),r}catch(e){}finally{c===b&&t.removeAttribute("id")}}}return u(e.replace(B,"$1"),t,r,i)}function ae(){var e=[];function t(n,i){return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=i}return t}function se(e){return e[b]=!0,e}function ue(e){var t=d.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function le(e,t){var n=e.split("|"),i=n.length;while(i--)r.attrHandle[n[i]]=t}function ce(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function fe(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function pe(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function de(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ie(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function he(e){return se(function(t){return t=+t,se(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function ge(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}n=oe.support={},o=oe.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},p=oe.setDocument=function(e){var t,i,a=e?e.ownerDocument||e:w;return a!==d&&9===a.nodeType&&a.documentElement?(d=a,h=d.documentElement,g=!o(d),w!==d&&(i=d.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",re,!1):i.attachEvent&&i.attachEvent("onunload",re)),n.attributes=ue(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ue(function(e){return e.appendChild(d.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=Q.test(d.getElementsByClassName),n.getById=ue(function(e){return h.appendChild(e).id=b,!d.getElementsByName||!d.getElementsByName(b).length}),n.getById?(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){return e.getAttribute("id")===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),r.find.TAG=n.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},r.find.CLASS=n.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&g)return t.getElementsByClassName(e)},v=[],y=[],(n.qsa=Q.test(d.querySelectorAll))&&(ue(function(e){h.appendChild(e).innerHTML="<a id='"+b+"'></a><select id='"+b+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&y.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||y.push("\\["+M+"*(?:value|"+P+")"),e.querySelectorAll("[id~="+b+"-]").length||y.push("~="),e.querySelectorAll(":checked").length||y.push(":checked"),e.querySelectorAll("a#"+b+"+*").length||y.push(".#.+[+~]")}),ue(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=d.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&y.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&y.push(":enabled",":disabled"),h.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&y.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),y.push(",.*:")})),(n.matchesSelector=Q.test(m=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&ue(function(e){n.disconnectedMatch=m.call(e,"*"),m.call(e,"[s!='']:x"),v.push("!=",W)}),y=y.length&&new RegExp(y.join("|")),v=v.length&&new RegExp(v.join("|")),t=Q.test(h.compareDocumentPosition),x=t||Q.test(h.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return f=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e===d||e.ownerDocument===w&&x(w,e)?-1:t===d||t.ownerDocument===w&&x(w,t)?1:c?O(c,e)-O(c,t):0:4&r?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===d?-1:t===d?1:i?-1:o?1:c?O(c,e)-O(c,t):0;if(i===o)return ce(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?ce(a[r],s[r]):a[r]===w?-1:s[r]===w?1:0},d):d},oe.matches=function(e,t){return oe(e,null,null,t)},oe.matchesSelector=function(e,t){if((e.ownerDocument||e)!==d&&p(e),t=t.replace(z,"='$1']"),n.matchesSelector&&g&&!S[t+" "]&&(!v||!v.test(t))&&(!y||!y.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return oe(t,d,null,[e]).length>0},oe.contains=function(e,t){return(e.ownerDocument||e)!==d&&p(e),x(e,t)},oe.attr=function(e,t){(e.ownerDocument||e)!==d&&p(e);var i=r.attrHandle[t.toLowerCase()],o=i&&N.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},oe.escape=function(e){return(e+"").replace(te,ne)},oe.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},oe.uniqueSort=function(e){var t,r=[],i=0,o=0;if(f=!n.detectDuplicates,c=!n.sortStable&&e.slice(0),e.sort(D),f){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return c=null,e},i=oe.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)}else if(3===o||4===o)return e.nodeValue}else while(t=e[r++])n+=i(t);return n},(r=oe.selectors={cacheLength:50,createPseudo:se,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Z,ee),e[3]=(e[3]||e[4]||e[5]||"").replace(Z,ee),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||oe.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&oe.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return V.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=a(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Z,ee).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=E[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&E(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=oe.attr(r,e);return null==i?"!="===t:!t||(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace($," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",y=t.parentNode,v=s&&t.nodeName.toLowerCase(),m=!u&&!s,x=!1;if(y){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===v:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?y.firstChild:y.lastChild],a&&m){x=(d=(l=(c=(f=(p=y)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1])&&l[2],p=d&&y.childNodes[d];while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if(1===p.nodeType&&++x&&p===t){c[e]=[T,d,x];break}}else if(m&&(x=d=(l=(c=(f=(p=t)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1]),!1===x)while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===v:1===p.nodeType)&&++x&&(m&&((c=(f=p[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]=[T,x]),p===t))break;return(x-=i)===r||x%r==0&&x/r>=0}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||oe.error("unsupported pseudo: "+e);return i[b]?i(t):i.length>1?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?se(function(e,n){var r,o=i(e,t),a=o.length;while(a--)e[r=O(e,o[a])]=!(n[r]=o[a])}):function(e){return i(e,0,n)}):i}},pseudos:{not:se(function(e){var t=[],n=[],r=s(e.replace(B,"$1"));return r[b]?se(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}}),has:se(function(e){return function(t){return oe(e,t).length>0}}),contains:se(function(e){return e=e.replace(Z,ee),function(t){return(t.textContent||t.innerText||i(t)).indexOf(e)>-1}}),lang:se(function(e){return U.test(e||"")||oe.error("unsupported lang: "+e),e=e.replace(Z,ee).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===h},focus:function(e){return e===d.activeElement&&(!d.hasFocus||d.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:de(!1),disabled:de(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){return Y.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:he(function(){return[0]}),last:he(function(e,t){return[t-1]}),eq:he(function(e,t,n){return[n<0?n+t:n]}),even:he(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:he(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:he(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:he(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=r.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=fe(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=pe(t);function ye(){}ye.prototype=r.filters=r.pseudos,r.setFilters=new ye,a=oe.tokenize=function(e,t){var n,i,o,a,s,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=r.preFilter;while(s){n&&!(i=F.exec(s))||(i&&(s=s.slice(i[0].length)||s),u.push(o=[])),n=!1,(i=_.exec(s))&&(n=i.shift(),o.push({value:n,type:i[0].replace(B," ")}),s=s.slice(n.length));for(a in r.filter)!(i=V[a].exec(s))||l[a]&&!(i=l[a](i))||(n=i.shift(),o.push({value:n,type:a,matches:i}),s=s.slice(n.length));if(!n)break}return t?s.length:s?oe.error(e):k(e,u).slice(0)};function ve(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function me(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,u){var l,c,f,p=[T,s];if(u){while(t=t[r])if((1===t.nodeType||a)&&e(t,n,u))return!0}else while(t=t[r])if(1===t.nodeType||a)if(f=t[b]||(t[b]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((l=c[o])&&l[0]===T&&l[1]===s)return p[2]=l[2];if(c[o]=p,p[2]=e(t,n,u))return!0}return!1}}function xe(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function be(e,t,n){for(var r=0,i=t.length;r<i;r++)oe(e,t[r],n);return n}function we(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Te(e,t,n,r,i,o){return r&&!r[b]&&(r=Te(r)),i&&!i[b]&&(i=Te(i,o)),se(function(o,a,s,u){var l,c,f,p=[],d=[],h=a.length,g=o||be(t||"*",s.nodeType?[s]:s,[]),y=!e||!o&&t?g:we(g,p,e,s,u),v=n?i||(o?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r){l=we(v,d),r(l,[],s,u),c=l.length;while(c--)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f))}if(o){if(i||e){if(i){l=[],c=v.length;while(c--)(f=v[c])&&l.push(y[c]=f);i(null,v=[],l,u)}c=v.length;while(c--)(f=v[c])&&(l=i?O(o,f):p[c])>-1&&(o[l]=!(a[l]=f))}}else v=we(v===a?v.splice(h,v.length):v),i?i(null,a,v,u):L.apply(a,v)})}function Ce(e){for(var t,n,i,o=e.length,a=r.relative[e[0].type],s=a||r.relative[" "],u=a?1:0,c=me(function(e){return e===t},s,!0),f=me(function(e){return O(t,e)>-1},s,!0),p=[function(e,n,r){var i=!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):f(e,n,r));return t=null,i}];u<o;u++)if(n=r.relative[e[u].type])p=[me(xe(p),n)];else{if((n=r.filter[e[u].type].apply(null,e[u].matches))[b]){for(i=++u;i<o;i++)if(r.relative[e[i].type])break;return Te(u>1&&xe(p),u>1&&ve(e.slice(0,u-1).concat({value:" "===e[u-2].type?"*":""})).replace(B,"$1"),n,u<i&&Ce(e.slice(u,i)),i<o&&Ce(e=e.slice(i)),i<o&&ve(e))}p.push(n)}return xe(p)}function Ee(e,t){var n=t.length>0,i=e.length>0,o=function(o,a,s,u,c){var f,h,y,v=0,m="0",x=o&&[],b=[],w=l,C=o||i&&r.find.TAG("*",c),E=T+=null==w?1:Math.random()||.1,k=C.length;for(c&&(l=a===d||a||c);m!==k&&null!=(f=C[m]);m++){if(i&&f){h=0,a||f.ownerDocument===d||(p(f),s=!g);while(y=e[h++])if(y(f,a||d,s)){u.push(f);break}c&&(T=E)}n&&((f=!y&&f)&&v--,o&&x.push(f))}if(v+=m,n&&m!==v){h=0;while(y=t[h++])y(x,b,a,s);if(o){if(v>0)while(m--)x[m]||b[m]||(b[m]=j.call(u));b=we(b)}L.apply(u,b),c&&!o&&b.length>0&&v+t.length>1&&oe.uniqueSort(u)}return c&&(T=E,l=w),x};return n?se(o):o}return s=oe.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=a(e)),n=t.length;while(n--)(o=Ce(t[n]))[b]?r.push(o):i.push(o);(o=S(e,Ee(i,r))).selector=e}return o},u=oe.select=function(e,t,n,i){var o,u,l,c,f,p="function"==typeof e&&e,d=!i&&a(e=p.selector||e);if(n=n||[],1===d.length){if((u=d[0]=d[0].slice(0)).length>2&&"ID"===(l=u[0]).type&&9===t.nodeType&&g&&r.relative[u[1].type]){if(!(t=(r.find.ID(l.matches[0].replace(Z,ee),t)||[])[0]))return n;p&&(t=t.parentNode),e=e.slice(u.shift().value.length)}o=V.needsContext.test(e)?0:u.length;while(o--){if(l=u[o],r.relative[c=l.type])break;if((f=r.find[c])&&(i=f(l.matches[0].replace(Z,ee),K.test(u[0].type)&&ge(t.parentNode)||t))){if(u.splice(o,1),!(e=i.length&&ve(u)))return L.apply(n,i),n;break}}}return(p||s(e,d))(i,t,!g,n,!t||K.test(e)&&ge(t.parentNode)||t),n},n.sortStable=b.split("").sort(D).join("")===b,n.detectDuplicates=!!f,p(),n.sortDetached=ue(function(e){return 1&e.compareDocumentPosition(d.createElement("fieldset"))}),ue(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||le("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ue(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||le("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ue(function(e){return null==e.getAttribute("disabled")})||le(P,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),oe}(e);w.find=E,w.expr=E.selectors,w.expr[":"]=w.expr.pseudos,w.uniqueSort=w.unique=E.uniqueSort,w.text=E.getText,w.isXMLDoc=E.isXML,w.contains=E.contains,w.escapeSelector=E.escape;var k=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&w(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},D=w.expr.match.needsContext;function N(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var A=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,t,n){return g(t)?w.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?w.grep(e,function(e){return e===t!==n}):"string"!=typeof t?w.grep(e,function(e){return u.call(t,e)>-1!==n}):w.filter(t,e,n)}w.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?w.find.matchesSelector(r,e)?[r]:[]:w.find.matches(e,w.grep(t,function(e){return 1===e.nodeType}))},w.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(w(e).filter(function(){for(t=0;t<r;t++)if(w.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)w.find(e,i[t],n);return r>1?w.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&D.test(e)?w(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init=function(e,t,n){var i,o;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(i="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:L.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof w?t[0]:t,w.merge(this,w.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:r,!0)),A.test(i[1])&&w.isPlainObject(t))for(i in t)g(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}return(o=r.getElementById(i[2]))&&(this[0]=o,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):g(e)?void 0!==n.ready?n.ready(e):e(w):w.makeArray(e,this)}).prototype=w.fn,q=w(r);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};w.fn.extend({has:function(e){var t=w(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(w.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&w(e);if(!D.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&w.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?w.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?u.call(w(e),this[0]):u.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(w.uniqueSort(w.merge(this.get(),w(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}w.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return k(e,"parentNode")},parentsUntil:function(e,t,n){return k(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return k(e,"nextSibling")},prevAll:function(e){return k(e,"previousSibling")},nextUntil:function(e,t,n){return k(e,"nextSibling",n)},prevUntil:function(e,t,n){return k(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return N(e,"iframe")?e.contentDocument:(N(e,"template")&&(e=e.content||e),w.merge([],e.childNodes))}},function(e,t){w.fn[e]=function(n,r){var i=w.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=w.filter(r,i)),this.length>1&&(O[e]||w.uniqueSort(i),H.test(e)&&i.reverse()),this.pushStack(i)}});var M=/[^\x20\t\r\n\f]+/g;function R(e){var t={};return w.each(e.match(M)||[],function(e,n){t[n]=!0}),t}w.Callbacks=function(e){e="string"==typeof e?R(e):w.extend({},e);var t,n,r,i,o=[],a=[],s=-1,u=function(){for(i=i||e.once,r=t=!0;a.length;s=-1){n=a.shift();while(++s<o.length)!1===o[s].apply(n[0],n[1])&&e.stopOnFalse&&(s=o.length,n=!1)}e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},l={add:function(){return o&&(n&&!t&&(s=o.length-1,a.push(n)),function t(n){w.each(n,function(n,r){g(r)?e.unique&&l.has(r)||o.push(r):r&&r.length&&"string"!==x(r)&&t(r)})}(arguments),n&&!t&&u()),this},remove:function(){return w.each(arguments,function(e,t){var n;while((n=w.inArray(t,o,n))>-1)o.splice(n,1),n<=s&&s--}),this},has:function(e){return e?w.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=a=[],o=n="",this},disabled:function(){return!o},lock:function(){return i=a=[],n||t||(o=n=""),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=[e,(n=n||[]).slice?n.slice():n],a.push(n),t||u()),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!r}};return l};function I(e){return e}function W(e){throw e}function $(e,t,n,r){var i;try{e&&g(i=e.promise)?i.call(e).done(t).fail(n):e&&g(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}w.extend({Deferred:function(t){var n=[["notify","progress",w.Callbacks("memory"),w.Callbacks("memory"),2],["resolve","done",w.Callbacks("once memory"),w.Callbacks("once memory"),0,"resolved"],["reject","fail",w.Callbacks("once memory"),w.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},"catch":function(e){return i.then(null,e)},pipe:function(){var e=arguments;return w.Deferred(function(t){w.each(n,function(n,r){var i=g(e[r[4]])&&e[r[4]];o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&g(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){var o=0;function a(t,n,r,i){return function(){var s=this,u=arguments,l=function(){var e,l;if(!(t<o)){if((e=r.apply(s,u))===n.promise())throw new TypeError("Thenable self-resolution");l=e&&("object"==typeof e||"function"==typeof e)&&e.then,g(l)?i?l.call(e,a(o,n,I,i),a(o,n,W,i)):(o++,l.call(e,a(o,n,I,i),a(o,n,W,i),a(o,n,I,n.notifyWith))):(r!==I&&(s=void 0,u=[e]),(i||n.resolveWith)(s,u))}},c=i?l:function(){try{l()}catch(e){w.Deferred.exceptionHook&&w.Deferred.exceptionHook(e,c.stackTrace),t+1>=o&&(r!==W&&(s=void 0,u=[e]),n.rejectWith(s,u))}};t?c():(w.Deferred.getStackHook&&(c.stackTrace=w.Deferred.getStackHook()),e.setTimeout(c))}}return w.Deferred(function(e){n[0][3].add(a(0,e,g(i)?i:I,e.notifyWith)),n[1][3].add(a(0,e,g(t)?t:I)),n[2][3].add(a(0,e,g(r)?r:W))}).promise()},promise:function(e){return null!=e?w.extend(e,i):i}},o={};return w.each(n,function(e,t){var a=t[2],s=t[5];i[t[1]]=a.add,s&&a.add(function(){r=s},n[3-e][2].disable,n[3-e][3].disable,n[0][2].lock,n[0][3].lock),a.add(t[3].fire),o[t[0]]=function(){return o[t[0]+"With"](this===o?void 0:this,arguments),this},o[t[0]+"With"]=a.fireWith}),i.promise(o),t&&t.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=o.call(arguments),a=w.Deferred(),s=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?o.call(arguments):n,--t||a.resolveWith(r,i)}};if(t<=1&&($(e,a.done(s(n)).resolve,a.reject,!t),"pending"===a.state()||g(i[n]&&i[n].then)))return a.then();while(n--)$(i[n],s(n),a.reject);return a.promise()}});var B=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook=function(t,n){e.console&&e.console.warn&&t&&B.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},w.readyException=function(t){e.setTimeout(function(){throw t})};var F=w.Deferred();w.fn.ready=function(e){return F.then(e)["catch"](function(e){w.readyException(e)}),this},w.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--w.readyWait:w.isReady)||(w.isReady=!0,!0!==e&&--w.readyWait>0||F.resolveWith(r,[w]))}}),w.ready.then=F.then;function _(){r.removeEventListener("DOMContentLoaded",_),e.removeEventListener("load",_),w.ready()}"complete"===r.readyState||"loading"!==r.readyState&&!r.documentElement.doScroll?e.setTimeout(w.ready):(r.addEventListener("DOMContentLoaded",_),e.addEventListener("load",_));var z=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===x(n)){i=!0;for(s in n)z(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,g(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(w(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},X=/^-ms-/,U=/-([a-z])/g;function V(e,t){return t.toUpperCase()}function G(e){return e.replace(X,"ms-").replace(U,V)}var Y=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Q(){this.expando=w.expando+Q.uid++}Q.uid=1,Q.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Y(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[G(t)]=n;else for(r in t)i[G(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][G(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(G):(t=G(t))in r?[t]:t.match(M)||[]).length;while(n--)delete r[t[n]]}(void 0===t||w.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!w.isEmptyObject(t)}};var J=new Q,K=new Q,Z=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ee=/[A-Z]/g;function te(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Z.test(e)?JSON.parse(e):e)}function ne(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(ee,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n=te(n)}catch(e){}K.set(e,t,n)}else n=void 0;return n}w.extend({hasData:function(e){return K.hasData(e)||J.hasData(e)},data:function(e,t,n){return K.access(e,t,n)},removeData:function(e,t){K.remove(e,t)},_data:function(e,t,n){return J.access(e,t,n)},_removeData:function(e,t){J.remove(e,t)}}),w.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=K.get(o),1===o.nodeType&&!J.get(o,"hasDataAttrs"))){n=a.length;while(n--)a[n]&&0===(r=a[n].name).indexOf("data-")&&(r=G(r.slice(5)),ne(o,r,i[r]));J.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){K.set(this,e)}):z(this,function(t){var n;if(o&&void 0===t){if(void 0!==(n=K.get(o,e)))return n;if(void 0!==(n=ne(o,e)))return n}else this.each(function(){K.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){K.remove(this,e)})}}),w.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=J.get(e,t),n&&(!r||Array.isArray(n)?r=J.access(e,t,w.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=w.queue(e,t),r=n.length,i=n.shift(),o=w._queueHooks(e,t),a=function(){w.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return J.get(e,n)||J.access(e,n,{empty:w.Callbacks("once memory").add(function(){J.remove(e,[t+"queue",n])})})}}),w.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?w.queue(this[0],e):void 0===t?this:this.each(function(){var n=w.queue(this,e,t);w._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&w.dequeue(this,e)})},dequeue:function(e){return this.each(function(){w.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=w.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=J.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var re=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ie=new RegExp("^(?:([+-])=|)("+re+")([a-z%]*)$","i"),oe=["Top","Right","Bottom","Left"],ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&w.contains(e.ownerDocument,e)&&"none"===w.css(e,"display")},se=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i};function ue(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return w.css(e,t,"")},u=s(),l=n&&n[3]||(w.cssNumber[t]?"":"px"),c=(w.cssNumber[t]||"px"!==l&&+u)&&ie.exec(w.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)w.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,w.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var le={};function ce(e){var t,n=e.ownerDocument,r=e.nodeName,i=le[r];return i||(t=n.body.appendChild(n.createElement(r)),i=w.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),le[r]=i,i)}function fe(e,t){for(var n,r,i=[],o=0,a=e.length;o<a;o++)(r=e[o]).style&&(n=r.style.display,t?("none"===n&&(i[o]=J.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&ae(r)&&(i[o]=ce(r))):"none"!==n&&(i[o]="none",J.set(r,"display",n)));for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}w.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?w(this).show():w(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;function ye(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&N(e,t)?w.merge([e],n):n}function ve(e,t){for(var n=0,r=e.length;n<r;n++)J.set(e[n],"globalEval",!t||J.get(t[n],"globalEval"))}var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===x(o))w.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+w.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;w.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&w.inArray(o,r)>-1)i&&i.push(o);else if(l=w.contains(o.ownerDocument,o),a=ye(f.appendChild(o),"script"),l&&ve(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}!function(){var e=r.createDocumentFragment().appendChild(r.createElement("div")),t=r.createElement("input");t.setAttribute("type","radio"),t.setAttribute("checked","checked"),t.setAttribute("name","t"),e.appendChild(t),h.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",h.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var be=r.documentElement,we=/^key/,Te=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ce=/^([^.]*)(?:\.(.+)|)/;function Ee(){return!0}function ke(){return!1}function Se(){try{return r.activeElement}catch(e){}}function De(e,t,n,r,i,o){var a,s;if("object"==typeof t){"string"!=typeof n&&(r=r||n,n=void 0);for(s in t)De(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=ke;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return w().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=w.guid++)),e.each(function(){w.event.add(this,t,i,r,n)})}w.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.get(e);if(y){n.handler&&(n=(o=n).handler,i=o.selector),i&&w.find.matchesSelector(be,i),n.guid||(n.guid=w.guid++),(u=y.events)||(u=y.events={}),(a=y.handle)||(a=y.handle=function(t){return"undefined"!=typeof w&&w.event.triggered!==t.type?w.event.dispatch.apply(e,arguments):void 0}),l=(t=(t||"").match(M)||[""]).length;while(l--)d=g=(s=Ce.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=w.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=w.event.special[d]||{},c=w.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&w.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,r,h,a)||e.addEventListener&&e.addEventListener(d,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),w.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.hasData(e)&&J.get(e);if(y&&(u=y.events)){l=(t=(t||"").match(M)||[""]).length;while(l--)if(s=Ce.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){f=w.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,y.handle)||w.removeEvent(e,d,y.handle),delete u[d])}else for(d in u)w.event.remove(e,d+t[l],n,r,!0);w.isEmptyObject(u)&&J.remove(e,"handle events")}},dispatch:function(e){var t=w.event.fix(e),n,r,i,o,a,s,u=new Array(arguments.length),l=(J.get(this,"events")||{})[t.type]||[],c=w.event.special[t.type]||{};for(u[0]=t,n=1;n<arguments.length;n++)u[n]=arguments[n];if(t.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,t)){s=w.event.handlers.call(this,t,l),n=0;while((o=s[n++])&&!t.isPropagationStopped()){t.currentTarget=o.elem,r=0;while((a=o.handlers[r++])&&!t.isImmediatePropagationStopped())t.rnamespace&&!t.rnamespace.test(a.namespace)||(t.handleObj=a,t.data=a.data,void 0!==(i=((w.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u))&&!1===(t.result=i)&&(t.preventDefault(),t.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,t),t.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&e.button>=1))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?w(i,this).index(l)>-1:w.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(e,t){Object.defineProperty(w.Event.prototype,e,{enumerable:!0,configurable:!0,get:g(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[w.expando]?e:new w.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==Se()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===Se()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&N(this,"input"))return this.click(),!1},_default:function(e){return N(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},w.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},w.Event=function(e,t){if(!(this instanceof w.Event))return new w.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ee:ke,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&w.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[w.expando]=!0},w.Event.prototype={constructor:w.Event,isDefaultPrevented:ke,isPropagationStopped:ke,isImmediatePropagationStopped:ke,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ee,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ee,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ee,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},w.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&we.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Te.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},w.event.addProp),w.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){w.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||w.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),w.fn.extend({on:function(e,t,n,r){return De(this,e,t,n,r)},one:function(e,t,n,r){return De(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,w(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=ke),this.each(function(){w.event.remove(this,e,n,t)})}});var Ne=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Ae=/<script|<style|<link/i,je=/checked\s*(?:[^=]|=\s*.checked.)/i,qe=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e,t){return N(e,"table")&&N(11!==t.nodeType?t:t.firstChild,"tr")?w(e).children("tbody")[0]||e:e}function He(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Oe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Pe(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(J.hasData(e)&&(o=J.access(e),a=J.set(t,o),l=o.events)){delete a.handle,a.events={};for(i in l)for(n=0,r=l[i].length;n<r;n++)w.event.add(t,i,l[i][n])}K.hasData(e)&&(s=K.access(e),u=w.extend({},s),K.set(t,u))}}function Me(e,t){var n=t.nodeName.toLowerCase();"input"===n&&pe.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function Re(e,t,n,r){t=a.apply([],t);var i,o,s,u,l,c,f=0,p=e.length,d=p-1,y=t[0],v=g(y);if(v||p>1&&"string"==typeof y&&!h.checkClone&&je.test(y))return e.each(function(i){var o=e.eq(i);v&&(t[0]=y.call(this,i,o.html())),Re(o,t,n,r)});if(p&&(i=xe(t,e[0].ownerDocument,!1,e,r),o=i.firstChild,1===i.childNodes.length&&(i=o),o||r)){for(u=(s=w.map(ye(i,"script"),He)).length;f<p;f++)l=i,f!==d&&(l=w.clone(l,!0,!0),u&&w.merge(s,ye(l,"script"))),n.call(e[f],l,f);if(u)for(c=s[s.length-1].ownerDocument,w.map(s,Oe),f=0;f<u;f++)l=s[f],he.test(l.type||"")&&!J.access(l,"globalEval")&&w.contains(c,l)&&(l.src&&"module"!==(l.type||"").toLowerCase()?w._evalUrl&&w._evalUrl(l.src):m(l.textContent.replace(qe,""),c,l))}return e}function Ie(e,t,n){for(var r,i=t?w.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||w.cleanData(ye(r)),r.parentNode&&(n&&w.contains(r.ownerDocument,r)&&ve(ye(r,"script")),r.parentNode.removeChild(r));return e}w.extend({htmlPrefilter:function(e){return e.replace(Ne,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),u=w.contains(e.ownerDocument,e);if(!(h.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||w.isXMLDoc(e)))for(a=ye(s),r=0,i=(o=ye(e)).length;r<i;r++)Me(o[r],a[r]);if(t)if(n)for(o=o||ye(e),a=a||ye(s),r=0,i=o.length;r<i;r++)Pe(o[r],a[r]);else Pe(e,s);return(a=ye(s,"script")).length>0&&ve(a,!u&&ye(e,"script")),s},cleanData:function(e){for(var t,n,r,i=w.event.special,o=0;void 0!==(n=e[o]);o++)if(Y(n)){if(t=n[J.expando]){if(t.events)for(r in t.events)i[r]?w.event.remove(n,r):w.removeEvent(n,r,t.handle);n[J.expando]=void 0}n[K.expando]&&(n[K.expando]=void 0)}}}),w.fn.extend({detach:function(e){return Ie(this,e,!0)},remove:function(e){return Ie(this,e)},text:function(e){return z(this,function(e){return void 0===e?w.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Re(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Le(this,e).appendChild(e)})},prepend:function(){return Re(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Le(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(w.cleanData(ye(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return w.clone(this,e,t)})},html:function(e){return z(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ae.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=w.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(w.cleanData(ye(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return Re(this,arguments,function(t){var n=this.parentNode;w.inArray(this,e)<0&&(w.cleanData(ye(this)),n&&n.replaceChild(t,this))},e)}}),w.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){w.fn[e]=function(e){for(var n,r=[],i=w(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),w(i[a])[t](n),s.apply(r,n.get());return this.pushStack(r)}});var We=new RegExp("^("+re+")(?!px)[a-z%]+$","i"),$e=function(t){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)},Be=new RegExp(oe.join("|"),"i");!function(){function t(){if(c){l.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",c.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",be.appendChild(l).appendChild(c);var t=e.getComputedStyle(c);i="1%"!==t.top,u=12===n(t.marginLeft),c.style.right="60%",s=36===n(t.right),o=36===n(t.width),c.style.position="absolute",a=36===c.offsetWidth||"absolute",be.removeChild(l),c=null}}function n(e){return Math.round(parseFloat(e))}var i,o,a,s,u,l=r.createElement("div"),c=r.createElement("div");c.style&&(c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",h.clearCloneStyle="content-box"===c.style.backgroundClip,w.extend(h,{boxSizingReliable:function(){return t(),o},pixelBoxStyles:function(){return t(),s},pixelPosition:function(){return t(),i},reliableMarginLeft:function(){return t(),u},scrollboxSize:function(){return t(),a}}))}();function Fe(e,t,n){var r,i,o,a,s=e.style;return(n=n||$e(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||w.contains(e.ownerDocument,e)||(a=w.style(e,t)),!h.pixelBoxStyles()&&We.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function _e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}var ze=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ue={position:"absolute",visibility:"hidden",display:"block"},Ve={letterSpacing:"0",fontWeight:"400"},Ge=["Webkit","Moz","ms"],Ye=r.createElement("div").style;function Qe(e){if(e in Ye)return e;var t=e[0].toUpperCase()+e.slice(1),n=Ge.length;while(n--)if((e=Ge[n]+t)in Ye)return e}function Je(e){var t=w.cssProps[e];return t||(t=w.cssProps[e]=Qe(e)||e),t}function Ke(e,t,n){var r=ie.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ze(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=w.css(e,n+oe[a],!0,i)),r?("content"===n&&(u-=w.css(e,"padding"+oe[a],!0,i)),"margin"!==n&&(u-=w.css(e,"border"+oe[a]+"Width",!0,i))):(u+=w.css(e,"padding"+oe[a],!0,i),"padding"!==n?u+=w.css(e,"border"+oe[a]+"Width",!0,i):s+=w.css(e,"border"+oe[a]+"Width",!0,i));return!r&&o>=0&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))),u}function et(e,t,n){var r=$e(e),i=Fe(e,t,r),o="border-box"===w.css(e,"boxSizing",!1,r),a=o;if(We.test(i)){if(!n)return i;i="auto"}return a=a&&(h.boxSizingReliable()||i===e.style[t]),("auto"===i||!parseFloat(i)&&"inline"===w.css(e,"display",!1,r))&&(i=e["offset"+t[0].toUpperCase()+t.slice(1)],a=!0),(i=parseFloat(i)||0)+Ze(e,t,n||(o?"border":"content"),a,r,i)+"px"}w.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Fe(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=G(t),u=Xe.test(t),l=e.style;if(u||(t=Je(s)),a=w.cssHooks[t]||w.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"==(o=typeof n)&&(i=ie.exec(n))&&i[1]&&(n=ue(e,t,i),o="number"),null!=n&&n===n&&("number"===o&&(n+=i&&i[3]||(w.cssNumber[s]?"":"px")),h.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=G(t);return Xe.test(t)||(t=Je(s)),(a=w.cssHooks[t]||w.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Fe(e,t,r)),"normal"===i&&t in Ve&&(i=Ve[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),w.each(["height","width"],function(e,t){w.cssHooks[t]={get:function(e,n,r){if(n)return!ze.test(w.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?et(e,t,r):se(e,Ue,function(){return et(e,t,r)})},set:function(e,n,r){var i,o=$e(e),a="border-box"===w.css(e,"boxSizing",!1,o),s=r&&Ze(e,t,r,a,o);return a&&h.scrollboxSize()===o.position&&(s-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-Ze(e,t,"border",!1,o)-.5)),s&&(i=ie.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=w.css(e,t)),Ke(e,n,s)}}}),w.cssHooks.marginLeft=_e(h.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Fe(e,"marginLeft"))||e.getBoundingClientRect().left-se(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),w.each({margin:"",padding:"",border:"Width"},function(e,t){w.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+oe[r]+t]=o[r]||o[r-2]||o[0];return i}},"margin"!==e&&(w.cssHooks[e+t].set=Ke)}),w.fn.extend({css:function(e,t){return z(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=$e(e),i=t.length;a<i;a++)o[t[a]]=w.css(e,t[a],!1,r);return o}return void 0!==n?w.style(e,t,n):w.css(e,t)},e,t,arguments.length>1)}});function tt(e,t,n,r,i){return new tt.prototype.init(e,t,n,r,i)}w.Tween=tt,tt.prototype={constructor:tt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||w.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(w.cssNumber[n]?"":"px")},cur:function(){var e=tt.propHooks[this.prop];return e&&e.get?e.get(this):tt.propHooks._default.get(this)},run:function(e){var t,n=tt.propHooks[this.prop];return this.options.duration?this.pos=t=w.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):tt.propHooks._default.set(this),this}},tt.prototype.init.prototype=tt.prototype,tt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=w.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){w.fx.step[e.prop]?w.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[w.cssProps[e.prop]]&&!w.cssHooks[e.prop]?e.elem[e.prop]=e.now:w.style(e.elem,e.prop,e.now+e.unit)}}},tt.propHooks.scrollTop=tt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},w.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},w.fx=tt.prototype.init,w.fx.step={};var nt,rt,it=/^(?:toggle|show|hide)$/,ot=/queueHooks$/;function at(){rt&&(!1===r.hidden&&e.requestAnimationFrame?e.requestAnimationFrame(at):e.setTimeout(at,w.fx.interval),w.fx.tick())}function st(){return e.setTimeout(function(){nt=void 0}),nt=Date.now()}function ut(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=oe[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function lt(e,t,n){for(var r,i=(pt.tweeners[t]||[]).concat(pt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ct(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),y=J.get(e,"fxshow");n.queue||(null==(a=w._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,w.queue(e,"fx").length||a.empty.fire()})}));for(r in t)if(i=t[r],it.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!y||void 0===y[r])continue;g=!0}d[r]=y&&y[r]||w.style(e,r)}if((u=!w.isEmptyObject(t))||!w.isEmptyObject(d)){f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=y&&y.display)&&(l=J.get(e,"display")),"none"===(c=w.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=w.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===w.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1;for(r in d)u||(y?"hidden"in y&&(g=y.hidden):y=J.access(e,"fxshow",{display:l}),o&&(y.hidden=!g),g&&fe([e],!0),p.done(function(){g||fe([e]),J.remove(e,"fxshow");for(r in d)w.style(e,r,d[r])})),u=lt(g?y[r]:0,r,p),r in y||(y[r]=u.start,g&&(u.end=u.start,u.start=0))}}function ft(e,t){var n,r,i,o,a;for(n in e)if(r=G(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=w.cssHooks[r])&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function pt(e,t,n){var r,i,o=0,a=pt.prefilters.length,s=w.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=nt||st(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),o=0,a=l.tweens.length;o<a;o++)l.tweens[o].run(r);return s.notifyWith(e,[l,r,n]),r<1&&a?n:(a||s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:w.extend({},t),opts:w.extend(!0,{specialEasing:{},easing:w.easing._default},n),originalProperties:t,originalOptions:n,startTime:nt||st(),duration:n.duration,tweens:[],createTween:function(t,n){var r=w.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)l.tweens[n].run(1);return t?(s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l,t])):s.rejectWith(e,[l,t]),this}}),c=l.props;for(ft(c,l.opts.specialEasing);o<a;o++)if(r=pt.prefilters[o].call(l,e,c,l.opts))return g(r.stop)&&(w._queueHooks(l.elem,l.opts.queue).stop=r.stop.bind(r)),r;return w.map(c,lt,l),g(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),w.fx.timer(w.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l}w.Animation=w.extend(pt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return ue(n.elem,e,ie.exec(t),n),n}]},tweener:function(e,t){g(e)?(t=e,e=["*"]):e=e.match(M);for(var n,r=0,i=e.length;r<i;r++)n=e[r],pt.tweeners[n]=pt.tweeners[n]||[],pt.tweeners[n].unshift(t)},prefilters:[ct],prefilter:function(e,t){t?pt.prefilters.unshift(e):pt.prefilters.push(e)}}),w.speed=function(e,t,n){var r=e&&"object"==typeof e?w.extend({},e):{complete:n||!n&&t||g(e)&&e,duration:e,easing:n&&t||t&&!g(t)&&t};return w.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in w.fx.speeds?r.duration=w.fx.speeds[r.duration]:r.duration=w.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){g(r.old)&&r.old.call(this),r.queue&&w.dequeue(this,r.queue)},r},w.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=w.isEmptyObject(e),o=w.speed(t,n,r),a=function(){var t=pt(this,w.extend({},e),o);(i||J.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=w.timers,a=J.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&ot.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||w.dequeue(this,e)})},finish:function(e){return!1!==e&&(e=e||"fx"),this.each(function(){var t,n=J.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=w.timers,a=r?r.length:0;for(n.finish=!0,w.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),w.each(["toggle","show","hide"],function(e,t){var n=w.fn[t];w.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ut(t,!0),e,r,i)}}),w.each({slideDown:ut("show"),slideUp:ut("hide"),slideToggle:ut("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){w.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),w.timers=[],w.fx.tick=function(){var e,t=0,n=w.timers;for(nt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||w.fx.stop(),nt=void 0},w.fx.timer=function(e){w.timers.push(e),w.fx.start()},w.fx.interval=13,w.fx.start=function(){rt||(rt=!0,at())},w.fx.stop=function(){rt=null},w.fx.speeds={slow:600,fast:200,_default:400},w.fn.delay=function(t,n){return t=w.fx?w.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},function(){var e=r.createElement("input"),t=r.createElement("select").appendChild(r.createElement("option"));e.type="checkbox",h.checkOn=""!==e.value,h.optSelected=t.selected,(e=r.createElement("input")).value="t",e.type="radio",h.radioValue="t"===e.value}();var dt,ht=w.expr.attrHandle;w.fn.extend({attr:function(e,t){return z(this,w.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){w.removeAttr(this,e)})}}),w.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?w.prop(e,t,n):(1===o&&w.isXMLDoc(e)||(i=w.attrHooks[t.toLowerCase()]||(w.expr.match.bool.test(t)?dt:void 0)),void 0!==n?null===n?void w.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=w.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!h.radioValue&&"radio"===t&&N(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(M);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),dt={set:function(e,t,n){return!1===t?w.removeAttr(e,n):e.setAttribute(n,n),n}},w.each(w.expr.match.bool.source.match(/\w+/g),function(e,t){var n=ht[t]||w.find.attr;ht[t]=function(e,t,r){var i,o,a=t.toLowerCase();return r||(o=ht[a],ht[a]=i,i=null!=n(e,t,r)?a:null,ht[a]=o),i}});var gt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;w.fn.extend({prop:function(e,t){return z(this,w.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[w.propFix[e]||e]})}}),w.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&w.isXMLDoc(e)||(t=w.propFix[t]||t,i=w.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=w.find.attr(e,"tabindex");return t?parseInt(t,10):gt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),h.optSelected||(w.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),w.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){w.propFix[this.toLowerCase()]=this});function vt(e){return(e.match(M)||[]).join(" ")}function mt(e){return e.getAttribute&&e.getAttribute("class")||""}function xt(e){return Array.isArray(e)?e:"string"==typeof e?e.match(M)||[]:[]}w.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).addClass(e.call(this,t,mt(this)))});if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).removeClass(e.call(this,t,mt(this)))});if(!arguments.length)return this.attr("class","");if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])while(r.indexOf(" "+o+" ")>-1)r=r.replace(" "+o+" "," ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e,r="string"===n||Array.isArray(e);return"boolean"==typeof t&&r?t?this.addClass(e):this.removeClass(e):g(e)?this.each(function(n){w(this).toggleClass(e.call(this,n,mt(this),t),t)}):this.each(function(){var t,i,o,a;if(r){i=0,o=w(this),a=xt(e);while(t=a[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else void 0!==e&&"boolean"!==n||((t=mt(this))&&J.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":J.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&(" "+vt(mt(n))+" ").indexOf(t)>-1)return!0;return!1}});var bt=/\r/g;w.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=g(e),this.each(function(n){var i;1===this.nodeType&&(null==(i=r?e.call(this,n,w(this).val()):e)?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=w.map(i,function(e){return null==e?"":e+""})),(t=w.valHooks[this.type]||w.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return(t=w.valHooks[i.type]||w.valHooks[i.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:"string"==typeof(n=i.value)?n.replace(bt,""):null==n?"":n}}}),w.extend({valHooks:{option:{get:function(e){var t=w.find.attr(e,"value");return null!=t?t:vt(w.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!N(n.parentNode,"optgroup"))){if(t=w(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=w.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=w.inArray(w.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),w.each(["radio","checkbox"],function(){w.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=w.inArray(w(e).val(),t)>-1}},h.checkOn||(w.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),h.focusin="onfocusin"in e;var wt=/^(?:focusinfocus|focusoutblur)$/,Tt=function(e){e.stopPropagation()};w.extend(w.event,{trigger:function(t,n,i,o){var a,s,u,l,c,p,d,h,v=[i||r],m=f.call(t,"type")?t.type:t,x=f.call(t,"namespace")?t.namespace.split("."):[];if(s=h=u=i=i||r,3!==i.nodeType&&8!==i.nodeType&&!wt.test(m+w.event.triggered)&&(m.indexOf(".")>-1&&(m=(x=m.split(".")).shift(),x.sort()),c=m.indexOf(":")<0&&"on"+m,t=t[w.expando]?t:new w.Event(m,"object"==typeof t&&t),t.isTrigger=o?2:3,t.namespace=x.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+x.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:w.makeArray(n,[t]),d=w.event.special[m]||{},o||!d.trigger||!1!==d.trigger.apply(i,n))){if(!o&&!d.noBubble&&!y(i)){for(l=d.delegateType||m,wt.test(l+m)||(s=s.parentNode);s;s=s.parentNode)v.push(s),u=s;u===(i.ownerDocument||r)&&v.push(u.defaultView||u.parentWindow||e)}a=0;while((s=v[a++])&&!t.isPropagationStopped())h=s,t.type=a>1?l:d.bindType||m,(p=(J.get(s,"events")||{})[t.type]&&J.get(s,"handle"))&&p.apply(s,n),(p=c&&s[c])&&p.apply&&Y(s)&&(t.result=p.apply(s,n),!1===t.result&&t.preventDefault());return t.type=m,o||t.isDefaultPrevented()||d._default&&!1!==d._default.apply(v.pop(),n)||!Y(i)||c&&g(i[m])&&!y(i)&&((u=i[c])&&(i[c]=null),w.event.triggered=m,t.isPropagationStopped()&&h.addEventListener(m,Tt),i[m](),t.isPropagationStopped()&&h.removeEventListener(m,Tt),w.event.triggered=void 0,u&&(i[c]=u)),t.result}},simulate:function(e,t,n){var r=w.extend(new w.Event,n,{type:e,isSimulated:!0});w.event.trigger(r,null,t)}}),w.fn.extend({trigger:function(e,t){return this.each(function(){w.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return w.event.trigger(e,t,n,!0)}}),h.focusin||w.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){w.event.simulate(t,e.target,w.event.fix(e))};w.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=J.access(r,t);i||r.addEventListener(e,n,!0),J.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=J.access(r,t)-1;i?J.access(r,t,i):(r.removeEventListener(e,n,!0),J.remove(r,t))}}});var Ct=e.location,Et=Date.now(),kt=/\?/;w.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;try{n=(new e.DOMParser).parseFromString(t,"text/xml")}catch(e){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||w.error("Invalid XML: "+t),n};var St=/\[\]$/,Dt=/\r?\n/g,Nt=/^(?:submit|button|image|reset|file)$/i,At=/^(?:input|select|textarea|keygen)/i;function jt(e,t,n,r){var i;if(Array.isArray(t))w.each(t,function(t,i){n||St.test(e)?r(e,i):jt(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==x(t))r(e,t);else for(i in t)jt(e+"["+i+"]",t[i],n,r)}w.param=function(e,t){var n,r=[],i=function(e,t){var n=g(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(e)||e.jquery&&!w.isPlainObject(e))w.each(e,function(){i(this.name,this.value)});else for(n in e)jt(n,e[n],t,i);return r.join("&")},w.fn.extend({serialize:function(){return w.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=w.prop(this,"elements");return e?w.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!w(this).is(":disabled")&&At.test(this.nodeName)&&!Nt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=w(this).val();return null==n?null:Array.isArray(n)?w.map(n,function(e){return{name:t.name,value:e.replace(Dt,"\r\n")}}):{name:t.name,value:n.replace(Dt,"\r\n")}}).get()}});var qt=/%20/g,Lt=/#.*$/,Ht=/([?&])_=[^&]*/,Ot=/^(.*?):[ \t]*([^\r\n]*)$/gm,Pt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Mt=/^(?:GET|HEAD)$/,Rt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Bt=r.createElement("a");Bt.href=Ct.href;function Ft(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(M)||[];if(g(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function _t(e,t,n,r){var i={},o=e===Wt;function a(s){var u;return i[s]=!0,w.each(e[s]||[],function(e,s){var l=s(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):void 0:(t.dataTypes.unshift(l),a(l),!1)}),u}return a(t.dataTypes[0])||!i["*"]&&a("*")}function zt(e,t){var n,r,i=w.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&w.extend(!0,e,r),e}function Xt(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}function Ut(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}w.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ct.href,type:"GET",isLocal:Pt.test(Ct.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":w.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,w.ajaxSettings),t):zt(w.ajaxSettings,e)},ajaxPrefilter:Ft(It),ajaxTransport:Ft(Wt),ajax:function(t,n){"object"==typeof t&&(n=t,t=void 0),n=n||{};var i,o,a,s,u,l,c,f,p,d,h=w.ajaxSetup({},n),g=h.context||h,y=h.context&&(g.nodeType||g.jquery)?w(g):w.event,v=w.Deferred(),m=w.Callbacks("once memory"),x=h.statusCode||{},b={},T={},C="canceled",E={readyState:0,getResponseHeader:function(e){var t;if(c){if(!s){s={};while(t=Ot.exec(a))s[t[1].toLowerCase()]=t[2]}t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return c?a:null},setRequestHeader:function(e,t){return null==c&&(e=T[e.toLowerCase()]=T[e.toLowerCase()]||e,b[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(c)E.always(e[E.status]);else for(t in e)x[t]=[x[t],e[t]];return this},abort:function(e){var t=e||C;return i&&i.abort(t),k(0,t),this}};if(v.promise(E),h.url=((t||h.url||Ct.href)+"").replace(Rt,Ct.protocol+"//"),h.type=n.method||n.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(M)||[""],null==h.crossDomain){l=r.createElement("a");try{l.href=h.url,l.href=l.href,h.crossDomain=Bt.protocol+"//"+Bt.host!=l.protocol+"//"+l.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=w.param(h.data,h.traditional)),_t(It,h,n,E),c)return E;(f=w.event&&h.global)&&0==w.active++&&w.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Mt.test(h.type),o=h.url.replace(Lt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(qt,"+")):(d=h.url.slice(o.length),h.data&&(h.processData||"string"==typeof h.data)&&(o+=(kt.test(o)?"&":"?")+h.data,delete h.data),!1===h.cache&&(o=o.replace(Ht,"$1"),d=(kt.test(o)?"&":"?")+"_="+Et+++d),h.url=o+d),h.ifModified&&(w.lastModified[o]&&E.setRequestHeader("If-Modified-Since",w.lastModified[o]),w.etag[o]&&E.setRequestHeader("If-None-Match",w.etag[o])),(h.data&&h.hasContent&&!1!==h.contentType||n.contentType)&&E.setRequestHeader("Content-Type",h.contentType),E.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+$t+"; q=0.01":""):h.accepts["*"]);for(p in h.headers)E.setRequestHeader(p,h.headers[p]);if(h.beforeSend&&(!1===h.beforeSend.call(g,E,h)||c))return E.abort();if(C="abort",m.add(h.complete),E.done(h.success),E.fail(h.error),i=_t(Wt,h,n,E)){if(E.readyState=1,f&&y.trigger("ajaxSend",[E,h]),c)return E;h.async&&h.timeout>0&&(u=e.setTimeout(function(){E.abort("timeout")},h.timeout));try{c=!1,i.send(b,k)}catch(e){if(c)throw e;k(-1,e)}}else k(-1,"No Transport");function k(t,n,r,s){var l,p,d,b,T,C=n;c||(c=!0,u&&e.clearTimeout(u),i=void 0,a=s||"",E.readyState=t>0?4:0,l=t>=200&&t<300||304===t,r&&(b=Xt(h,E,r)),b=Ut(h,b,E,l),l?(h.ifModified&&((T=E.getResponseHeader("Last-Modified"))&&(w.lastModified[o]=T),(T=E.getResponseHeader("etag"))&&(w.etag[o]=T)),204===t||"HEAD"===h.type?C="nocontent":304===t?C="notmodified":(C=b.state,p=b.data,l=!(d=b.error))):(d=C,!t&&C||(C="error",t<0&&(t=0))),E.status=t,E.statusText=(n||C)+"",l?v.resolveWith(g,[p,C,E]):v.rejectWith(g,[E,C,d]),E.statusCode(x),x=void 0,f&&y.trigger(l?"ajaxSuccess":"ajaxError",[E,h,l?p:d]),m.fireWith(g,[E,C]),f&&(y.trigger("ajaxComplete",[E,h]),--w.active||w.event.trigger("ajaxStop")))}return E},getJSON:function(e,t,n){return w.get(e,t,n,"json")},getScript:function(e,t){return w.get(e,void 0,t,"script")}}),w.each(["get","post"],function(e,t){w[t]=function(e,n,r,i){return g(n)&&(i=i||r,r=n,n=void 0),w.ajax(w.extend({url:e,type:t,dataType:i,data:n,success:r},w.isPlainObject(e)&&e))}}),w._evalUrl=function(e){return w.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},w.fn.extend({wrapAll:function(e){var t;return this[0]&&(g(e)&&(e=e.call(this[0])),t=w(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return g(e)?this.each(function(t){w(this).wrapInner(e.call(this,t))}):this.each(function(){var t=w(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=g(e);return this.each(function(n){w(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){w(this).replaceWith(this.childNodes)}),this}}),w.expr.pseudos.hidden=function(e){return!w.expr.pseudos.visible(e)},w.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},w.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(e){}};var Vt={0:200,1223:204},Gt=w.ajaxSettings.xhr();h.cors=!!Gt&&"withCredentials"in Gt,h.ajax=Gt=!!Gt,w.ajaxTransport(function(t){var n,r;if(h.cors||Gt&&!t.crossDomain)return{send:function(i,o){var a,s=t.xhr();if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(a in t.xhrFields)s[a]=t.xhrFields[a];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(a in i)s.setRequestHeader(a,i[a]);n=function(e){return function(){n&&(n=r=s.onload=s.onerror=s.onabort=s.ontimeout=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?"number"!=typeof s.status?o(0,"error"):o(s.status,s.statusText):o(Vt[s.status]||s.status,s.statusText,"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=n(),r=s.onerror=s.ontimeout=n("error"),void 0!==s.onabort?s.onabort=r:s.onreadystatechange=function(){4===s.readyState&&e.setTimeout(function(){n&&r()})},n=n("abort");try{s.send(t.hasContent&&t.data||null)}catch(e){if(n)throw e}},abort:function(){n&&n()}}}),w.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),w.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return w.globalEval(e),e}}}),w.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),w.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(i,o){t=w("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&o("error"===e.type?404:200,e.type)}),r.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Yt=[],Qt=/(=)\?(?=&|$)|\?\?/;w.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Yt.pop()||w.expando+"_"+Et++;return this[e]=!0,e}}),w.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=!1!==t.jsonp&&(Qt.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Qt.test(t.data)&&"data");if(s||"jsonp"===t.dataTypes[0])return i=t.jsonpCallback=g(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(Qt,"$1"+i):!1!==t.jsonp&&(t.url+=(kt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||w.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){void 0===o?w(e).removeProp(i):e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Yt.push(i)),a&&g(o)&&o(a[0]),a=o=void 0}),"script"}),h.createHTMLDocument=function(){var e=r.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),w.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var i,o,a;return t||(h.createHTMLDocument?((i=(t=r.implementation.createHTMLDocument("")).createElement("base")).href=r.location.href,t.head.appendChild(i)):t=r),o=A.exec(e),a=!n&&[],o?[t.createElement(o[1])]:(o=xe([e],t,a),a&&a.length&&w(a).remove(),w.merge([],o.childNodes))},w.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return s>-1&&(r=vt(e.slice(s)),e=e.slice(0,s)),g(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),a.length>0&&w.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?w("<div>").append(w.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},w.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){w.fn[t]=function(e){return this.on(t,e)}}),w.expr.pseudos.animated=function(e){return w.grep(w.timers,function(t){return e===t.elem}).length},w.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l,c=w.css(e,"position"),f=w(e),p={};"static"===c&&(e.style.position="relative"),s=f.offset(),o=w.css(e,"top"),u=w.css(e,"left"),(l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1)?(a=(r=f.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),g(t)&&(t=t.call(e,n,w.extend({},s))),null!=t.top&&(p.top=t.top-s.top+a),null!=t.left&&(p.left=t.left-s.left+i),"using"in t?t.using.call(e,p):f.css(p)}},w.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){w.offset.setOffset(this,e,t)});var t,n,r=this[0];if(r)return r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===w.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===w.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=w(e).offset()).top+=w.css(e,"borderTopWidth",!0),i.left+=w.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-w.css(r,"marginTop",!0),left:t.left-i.left-w.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===w.css(e,"position"))e=e.offsetParent;return e||be})}}),w.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;w.fn[e]=function(r){return z(this,function(e,r,i){var o;if(y(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r];o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i},e,r,arguments.length)}}),w.each(["top","left"],function(e,t){w.cssHooks[t]=_e(h.pixelPosition,function(e,n){if(n)return n=Fe(e,t),We.test(n)?w(e).position()[t]+"px":n})}),w.each({Height:"height",Width:"width"},function(e,t){w.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){w.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(!0===i||!0===o?"margin":"border");return z(this,function(t,n,i){var o;return y(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?w.css(t,n,s):w.style(t,n,i,s)},t,a?i:void 0,a)}})}),w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){w.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),w.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),w.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),w.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),g(e))return r=o.call(arguments,2),i=function(){return e.apply(t||this,r.concat(o.call(arguments)))},i.guid=e.guid=e.guid||w.guid++,i},w.holdReady=function(e){e?w.readyWait++:w.ready(!0)},w.isArray=Array.isArray,w.parseJSON=JSON.parse,w.nodeName=N,w.isFunction=g,w.isWindow=y,w.camelCase=G,w.type=x,w.now=Date.now,w.isNumeric=function(e){var t=w.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return w});var Jt=e.jQuery,Kt=e.$;return w.noConflict=function(t){return e.$===w&&(e.$=Kt),t&&e.jQuery===w&&(e.jQuery=Jt),w},t||(e.jQuery=e.$=w),w});

function RepositionNav(){var e=$(window).height()/2-$("#nav").height()/2;$("#nav").css({top:e})}!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";var e,s;function y(){return e.apply(null,arguments)}function a(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function l(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function c(e){return void 0===e}function d(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function h(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function u(e,t){var i,n=[];for(i=0;i<e.length;++i)n.push(t(e[i],i));return n}function w(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function f(e,t){for(var i in t)w(t,i)&&(e[i]=t[i]);return w(t,"toString")&&(e.toString=t.toString),w(t,"valueOf")&&(e.valueOf=t.valueOf),e}function m(e,t,i,n){return Dt(e,t,i,n,!0).utc()}function b(e){return null==e._pf&&(e._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}),e._pf}function p(e){if(null==e._isValid){var t=b(e),i=s.call(t.parsedDateParts,function(e){return null!=e}),n=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidMonth&&!t.invalidWeekday&&!t.weekdayMismatch&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&i);if(e._strict&&(n=n&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return n;e._isValid=n}return e._isValid}function g(e){var t=m(NaN);return null!=e?f(b(t),e):b(t).userInvalidated=!0,t}s=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),i=t.length>>>0,n=0;n<i;n++)if(n in t&&e.call(this,t[n],n,t))return!0;return!1};var r=y.momentProperties=[];function v(e,t){var i,n,s;if(c(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),c(t._i)||(e._i=t._i),c(t._f)||(e._f=t._f),c(t._l)||(e._l=t._l),c(t._strict)||(e._strict=t._strict),c(t._tzm)||(e._tzm=t._tzm),c(t._isUTC)||(e._isUTC=t._isUTC),c(t._offset)||(e._offset=t._offset),c(t._pf)||(e._pf=b(t)),c(t._locale)||(e._locale=t._locale),0<r.length)for(i=0;i<r.length;i++)c(s=t[n=r[i]])||(e[n]=s);return e}var t=!1;function _(e){v(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===t&&(t=!0,y.updateOffset(this),t=!1)}function S(e){return e instanceof _||null!=e&&null!=e._isAMomentObject}function x(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function D(e){var t=+e,i=0;return 0!==t&&isFinite(t)&&(i=x(t)),i}function o(e,t,i){var n,s=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),o=0;for(n=0;n<s;n++)(i&&e[n]!==t[n]||!i&&D(e[n])!==D(t[n]))&&o++;return o+r}function k(e){!1===y.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function i(s,r){var o=!0;return f(function(){if(null!=y.deprecationHandler&&y.deprecationHandler(null,s),o){for(var e,t=[],i=0;i<arguments.length;i++){if(e="","object"==typeof arguments[i]){for(var n in e+="\n["+i+"] ",arguments[0])e+=n+": "+arguments[0][n]+", ";e=e.slice(0,-2)}else e=arguments[i];t.push(e)}k(s+"\nArguments: "+Array.prototype.slice.call(t).join("")+"\n"+(new Error).stack),o=!1}return r.apply(this,arguments)},r)}var n,C={};function T(e,t){null!=y.deprecationHandler&&y.deprecationHandler(e,t),C[e]||(k(t),C[e]=!0)}function E(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function I(e,t){var i,n=f({},e);for(i in t)w(t,i)&&(l(e[i])&&l(t[i])?(n[i]={},f(n[i],e[i]),f(n[i],t[i])):null!=t[i]?n[i]=t[i]:delete n[i]);for(i in e)w(e,i)&&!w(t,i)&&l(e[i])&&(n[i]=f({},n[i]));return n}function M(e){null!=e&&this.set(e)}y.suppressDeprecationWarnings=!1,y.deprecationHandler=null,n=Object.keys?Object.keys:function(e){var t,i=[];for(t in e)w(e,t)&&i.push(t);return i};var P={};function A(e,t){var i=e.toLowerCase();P[i]=P[i+"s"]=P[t]=e}function O(e){return"string"==typeof e?P[e]||P[e.toLowerCase()]:void 0}function Y(e){var t,i,n={};for(i in e)w(e,i)&&(t=O(i))&&(n[t]=e[i]);return n}var L={};function N(e,t){L[e]=t}function F(e,t,i){var n=""+Math.abs(e),s=t-n.length;return(0<=e?i?"+":"":"-")+Math.pow(10,Math.max(0,s)).toString().substr(1)+n}var z=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,W=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,R={},H={};function j(e,t,i,n){var s=n;"string"==typeof n&&(s=function(){return this[n]()}),e&&(H[e]=s),t&&(H[t[0]]=function(){return F(s.apply(this,arguments),t[1],t[2])}),i&&(H[i]=function(){return this.localeData().ordinal(s.apply(this,arguments),e)})}function U(e,t){return e.isValid()?(t=V(t,e.localeData()),R[t]=R[t]||function(n){var e,s,t,r=n.match(z);for(e=0,s=r.length;e<s;e++)H[r[e]]?r[e]=H[r[e]]:r[e]=(t=r[e]).match(/\[[\s\S]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"");return function(e){var t,i="";for(t=0;t<s;t++)i+=E(r[t])?r[t].call(e,n):r[t];return i}}(t),R[t](e)):e.localeData().invalidDate()}function V(e,t){var i=5;function n(e){return t.longDateFormat(e)||e}for(W.lastIndex=0;0<=i&&W.test(e);)e=e.replace(W,n),W.lastIndex=0,i-=1;return e}var q=/\d/,B=/\d\d/,$=/\d{3}/,G=/\d{4}/,X=/[+-]?\d{6}/,K=/\d\d?/,Z=/\d\d\d\d?/,Q=/\d\d\d\d\d\d?/,J=/\d{1,3}/,ee=/\d{1,4}/,te=/[+-]?\d{1,6}/,ie=/\d+/,ne=/[+-]?\d+/,se=/Z|[+-]\d\d:?\d\d/gi,re=/Z|[+-]\d\d(?::?\d\d)?/gi,oe=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,ae={};function le(e,i,n){ae[e]=E(i)?i:function(e,t){return e&&n?n:i}}function ce(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var de={};function he(e,i){var t,n=i;for("string"==typeof e&&(e=[e]),d(i)&&(n=function(e,t){t[i]=D(e)}),t=0;t<e.length;t++)de[e[t]]=n}function ue(e,s){he(e,function(e,t,i,n){i._w=i._w||{},s(e,i._w,i,n)})}var fe=0,me=1,pe=2,ge=3,ve=4,ye=5,we=6,be=7,_e=8;function Se(e){return xe(e)?366:365}function xe(e){return e%4==0&&e%100!=0||e%400==0}j("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),j(0,["YY",2],0,function(){return this.year()%100}),j(0,["YYYY",4],0,"year"),j(0,["YYYYY",5],0,"year"),j(0,["YYYYYY",6,!0],0,"year"),A("year","y"),N("year",1),le("Y",ne),le("YY",K,B),le("YYYY",ee,G),le("YYYYY",te,X),le("YYYYYY",te,X),he(["YYYYY","YYYYYY"],fe),he("YYYY",function(e,t){t[fe]=2===e.length?y.parseTwoDigitYear(e):D(e)}),he("YY",function(e,t){t[fe]=y.parseTwoDigitYear(e)}),he("Y",function(e,t){t[fe]=parseInt(e,10)}),y.parseTwoDigitYear=function(e){return D(e)+(68<D(e)?1900:2e3)};var De,ke=Ce("FullYear",!0);function Ce(t,i){return function(e){return null!=e?(Ee(this,t,e),y.updateOffset(this,i),this):Te(this,t)}}function Te(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function Ee(e,t,i){e.isValid()&&!isNaN(i)&&("FullYear"===t&&xe(e.year())&&1===e.month()&&29===e.date()?e._d["set"+(e._isUTC?"UTC":"")+t](i,e.month(),Ie(i,e.month())):e._d["set"+(e._isUTC?"UTC":"")+t](i))}function Ie(e,t){if(isNaN(e)||isNaN(t))return NaN;var i=(t%12+12)%12;return e+=(t-i)/12,1===i?xe(e)?29:28:31-i%7%2}De=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1},j("M",["MM",2],"Mo",function(){return this.month()+1}),j("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),j("MMMM",0,0,function(e){return this.localeData().months(this,e)}),A("month","M"),N("month",8),le("M",K),le("MM",K,B),le("MMM",function(e,t){return t.monthsShortRegex(e)}),le("MMMM",function(e,t){return t.monthsRegex(e)}),he(["M","MM"],function(e,t){t[me]=D(e)-1}),he(["MMM","MMMM"],function(e,t,i,n){var s=i._locale.monthsParse(e,n,i._strict);null!=s?t[me]=s:b(i).invalidMonth=e});var Me=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Pe="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Ae="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");function Oe(e,t){var i;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=D(t);else if(!d(t=e.localeData().monthsParse(t)))return e;return i=Math.min(e.date(),Ie(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,i),e}function Ye(e){return null!=e?(Oe(this,e),y.updateOffset(this,!0),this):Te(this,"Month")}var Le=oe,Ne=oe;function Fe(){function e(e,t){return t.length-e.length}var t,i,n=[],s=[],r=[];for(t=0;t<12;t++)i=m([2e3,t]),n.push(this.monthsShort(i,"")),s.push(this.months(i,"")),r.push(this.months(i,"")),r.push(this.monthsShort(i,""));for(n.sort(e),s.sort(e),r.sort(e),t=0;t<12;t++)n[t]=ce(n[t]),s[t]=ce(s[t]);for(t=0;t<24;t++)r[t]=ce(r[t]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+s.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+n.join("|")+")","i")}function ze(e){var t=new Date(Date.UTC.apply(null,arguments));return e<100&&0<=e&&isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e),t}function We(e,t,i){var n=7+t-i;return-(7+ze(e,0,n).getUTCDay()-t)%7+n-1}function Re(e,t,i,n,s){var r,o,a=1+7*(t-1)+(7+i-n)%7+We(e,n,s);return a<=0?o=Se(r=e-1)+a:a>Se(e)?(r=e+1,o=a-Se(e)):(r=e,o=a),{year:r,dayOfYear:o}}function He(e,t,i){var n,s,r=We(e.year(),t,i),o=Math.floor((e.dayOfYear()-r-1)/7)+1;return o<1?n=o+je(s=e.year()-1,t,i):o>je(e.year(),t,i)?(n=o-je(e.year(),t,i),s=e.year()+1):(s=e.year(),n=o),{week:n,year:s}}function je(e,t,i){var n=We(e,t,i),s=We(e+1,t,i);return(Se(e)-n+s)/7}j("w",["ww",2],"wo","week"),j("W",["WW",2],"Wo","isoWeek"),A("week","w"),A("isoWeek","W"),N("week",5),N("isoWeek",5),le("w",K),le("ww",K,B),le("W",K),le("WW",K,B),ue(["w","ww","W","WW"],function(e,t,i,n){t[n.substr(0,1)]=D(e)}),j("d",0,"do","day"),j("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),j("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),j("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),j("e",0,0,"weekday"),j("E",0,0,"isoWeekday"),A("day","d"),A("weekday","e"),A("isoWeekday","E"),N("day",11),N("weekday",11),N("isoWeekday",11),le("d",K),le("e",K),le("E",K),le("dd",function(e,t){return t.weekdaysMinRegex(e)}),le("ddd",function(e,t){return t.weekdaysShortRegex(e)}),le("dddd",function(e,t){return t.weekdaysRegex(e)}),ue(["dd","ddd","dddd"],function(e,t,i,n){var s=i._locale.weekdaysParse(e,n,i._strict);null!=s?t.d=s:b(i).invalidWeekday=e}),ue(["d","e","E"],function(e,t,i,n){t[n]=D(e)});var Ue="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Ve="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),qe="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),Be=oe,$e=oe,Ge=oe;function Xe(){function e(e,t){return t.length-e.length}var t,i,n,s,r,o=[],a=[],l=[],c=[];for(t=0;t<7;t++)i=m([2e3,1]).day(t),n=this.weekdaysMin(i,""),s=this.weekdaysShort(i,""),r=this.weekdays(i,""),o.push(n),a.push(s),l.push(r),c.push(n),c.push(s),c.push(r);for(o.sort(e),a.sort(e),l.sort(e),c.sort(e),t=0;t<7;t++)a[t]=ce(a[t]),l[t]=ce(l[t]),c[t]=ce(c[t]);this._weekdaysRegex=new RegExp("^("+c.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+a.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+o.join("|")+")","i")}function Ke(){return this.hours()%12||12}function Ze(e,t){j(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function Qe(e,t){return t._meridiemParse}j("H",["HH",2],0,"hour"),j("h",["hh",2],0,Ke),j("k",["kk",2],0,function(){return this.hours()||24}),j("hmm",0,0,function(){return""+Ke.apply(this)+F(this.minutes(),2)}),j("hmmss",0,0,function(){return""+Ke.apply(this)+F(this.minutes(),2)+F(this.seconds(),2)}),j("Hmm",0,0,function(){return""+this.hours()+F(this.minutes(),2)}),j("Hmmss",0,0,function(){return""+this.hours()+F(this.minutes(),2)+F(this.seconds(),2)}),Ze("a",!0),Ze("A",!1),A("hour","h"),N("hour",13),le("a",Qe),le("A",Qe),le("H",K),le("h",K),le("k",K),le("HH",K,B),le("hh",K,B),le("kk",K,B),le("hmm",Z),le("hmmss",Q),le("Hmm",Z),le("Hmmss",Q),he(["H","HH"],ge),he(["k","kk"],function(e,t,i){var n=D(e);t[ge]=24===n?0:n}),he(["a","A"],function(e,t,i){i._isPm=i._locale.isPM(e),i._meridiem=e}),he(["h","hh"],function(e,t,i){t[ge]=D(e),b(i).bigHour=!0}),he("hmm",function(e,t,i){var n=e.length-2;t[ge]=D(e.substr(0,n)),t[ve]=D(e.substr(n)),b(i).bigHour=!0}),he("hmmss",function(e,t,i){var n=e.length-4,s=e.length-2;t[ge]=D(e.substr(0,n)),t[ve]=D(e.substr(n,2)),t[ye]=D(e.substr(s)),b(i).bigHour=!0}),he("Hmm",function(e,t,i){var n=e.length-2;t[ge]=D(e.substr(0,n)),t[ve]=D(e.substr(n))}),he("Hmmss",function(e,t,i){var n=e.length-4,s=e.length-2;t[ge]=D(e.substr(0,n)),t[ve]=D(e.substr(n,2)),t[ye]=D(e.substr(s))});var Je,et=Ce("Hours",!0),tt={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:Pe,monthsShort:Ae,week:{dow:0,doy:6},weekdays:Ue,weekdaysMin:qe,weekdaysShort:Ve,meridiemParse:/[ap]\.?m?\.?/i},it={},nt={};function st(e){return e?e.toLowerCase().replace("_","-"):e}function rt(e){var t=null;if(!it[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=Je._abbr,require("./locale/"+e),ot(t)}catch(e){}return it[e]}function ot(e,t){var i;return e&&((i=c(t)?lt(e):at(e,t))?Je=i:"undefined"!=typeof console&&console.warn&&console.warn("Locale "+e+" not found. Did you forget to load it?")),Je._abbr}function at(e,t){if(null!==t){var i,n=tt;if(t.abbr=e,null!=it[e])T("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),n=it[e]._config;else if(null!=t.parentLocale)if(null!=it[t.parentLocale])n=it[t.parentLocale]._config;else{if(null==(i=rt(t.parentLocale)))return nt[t.parentLocale]||(nt[t.parentLocale]=[]),nt[t.parentLocale].push({name:e,config:t}),null;n=i._config}return it[e]=new M(I(n,t)),nt[e]&&nt[e].forEach(function(e){at(e.name,e.config)}),ot(e),it[e]}return delete it[e],null}function lt(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return Je;if(!a(e)){if(t=rt(e))return t;e=[e]}return function(e){for(var t,i,n,s,r=0;r<e.length;){for(t=(s=st(e[r]).split("-")).length,i=(i=st(e[r+1]))?i.split("-"):null;0<t;){if(n=rt(s.slice(0,t).join("-")))return n;if(i&&i.length>=t&&o(s,i,!0)>=t-1)break;t--}r++}return Je}(e)}function ct(e){var t,i=e._a;return i&&-2===b(e).overflow&&(t=i[me]<0||11<i[me]?me:i[pe]<1||i[pe]>Ie(i[fe],i[me])?pe:i[ge]<0||24<i[ge]||24===i[ge]&&(0!==i[ve]||0!==i[ye]||0!==i[we])?ge:i[ve]<0||59<i[ve]?ve:i[ye]<0||59<i[ye]?ye:i[we]<0||999<i[we]?we:-1,b(e)._overflowDayOfYear&&(t<fe||pe<t)&&(t=pe),b(e)._overflowWeeks&&-1===t&&(t=be),b(e)._overflowWeekday&&-1===t&&(t=_e),b(e).overflow=t),e}function dt(e,t,i){return null!=e?e:null!=t?t:i}function ht(e){var t,i,n,s,r,o=[];if(!e._d){var a,l;for(a=e,l=new Date(y.now()),n=a._useUTC?[l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()]:[l.getFullYear(),l.getMonth(),l.getDate()],e._w&&null==e._a[pe]&&null==e._a[me]&&function(e){var t,i,n,s,r,o,a,l;if(null!=(t=e._w).GG||null!=t.W||null!=t.E)r=1,o=4,i=dt(t.GG,e._a[fe],He(kt(),1,4).year),n=dt(t.W,1),((s=dt(t.E,1))<1||7<s)&&(l=!0);else{r=e._locale._week.dow,o=e._locale._week.doy;var c=He(kt(),r,o);i=dt(t.gg,e._a[fe],c.year),n=dt(t.w,c.week),null!=t.d?((s=t.d)<0||6<s)&&(l=!0):null!=t.e?(s=t.e+r,(t.e<0||6<t.e)&&(l=!0)):s=r}n<1||n>je(i,r,o)?b(e)._overflowWeeks=!0:null!=l?b(e)._overflowWeekday=!0:(a=Re(i,n,s,r,o),e._a[fe]=a.year,e._dayOfYear=a.dayOfYear)}(e),null!=e._dayOfYear&&(r=dt(e._a[fe],n[fe]),(e._dayOfYear>Se(r)||0===e._dayOfYear)&&(b(e)._overflowDayOfYear=!0),i=ze(r,0,e._dayOfYear),e._a[me]=i.getUTCMonth(),e._a[pe]=i.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=o[t]=n[t];for(;t<7;t++)e._a[t]=o[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[ge]&&0===e._a[ve]&&0===e._a[ye]&&0===e._a[we]&&(e._nextDay=!0,e._a[ge]=0),e._d=(e._useUTC?ze:function(e,t,i,n,s,r,o){var a=new Date(e,t,i,n,s,r,o);return e<100&&0<=e&&isFinite(a.getFullYear())&&a.setFullYear(e),a}).apply(null,o),s=e._useUTC?e._d.getUTCDay():e._d.getDay(),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[ge]=24),e._w&&void 0!==e._w.d&&e._w.d!==s&&(b(e).weekdayMismatch=!0)}}var ut=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,ft=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,mt=/Z|[+-]\d\d(?::?\d\d)?/,pt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],gt=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],vt=/^\/?Date\((\-?\d+)/i;function yt(e){var t,i,n,s,r,o,a=e._i,l=ut.exec(a)||ft.exec(a);if(l){for(b(e).iso=!0,t=0,i=pt.length;t<i;t++)if(pt[t][1].exec(l[1])){s=pt[t][0],n=!1!==pt[t][2];break}if(null==s)return void(e._isValid=!1);if(l[3]){for(t=0,i=gt.length;t<i;t++)if(gt[t][1].exec(l[3])){r=(l[2]||" ")+gt[t][0];break}if(null==r)return void(e._isValid=!1)}if(!n&&null!=r)return void(e._isValid=!1);if(l[4]){if(!mt.exec(l[4]))return void(e._isValid=!1);o="Z"}e._f=s+(r||"")+(o||""),St(e)}else e._isValid=!1}var wt=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;var bt={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function _t(e){var t,i,n,s,r,o,a,l,c,d,h,u=wt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim());if(u){var f=(s=u[4],r=u[3],o=u[2],a=u[5],l=u[6],c=u[7],h=[(d=parseInt(s,10),d<=49?2e3+d:d<=999?1900+d:d),Ae.indexOf(r),parseInt(o,10),parseInt(a,10),parseInt(l,10)],c&&h.push(parseInt(c,10)),h);if(i=f,n=e,(t=u[1])&&Ve.indexOf(t)!==new Date(i[0],i[1],i[2]).getDay()&&(b(n).weekdayMismatch=!0,!(n._isValid=!1)))return;e._a=f,e._tzm=function(e,t,i){if(e)return bt[e];if(t)return 0;var n=parseInt(i,10),s=n%100;return(n-s)/100*60+s}(u[8],u[9],u[10]),e._d=ze.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),b(e).rfc2822=!0}else e._isValid=!1}function St(e){if(e._f!==y.ISO_8601)if(e._f!==y.RFC_2822){e._a=[],b(e).empty=!0;var t,i,n,s,r,o,a,l,c=""+e._i,d=c.length,h=0;for(n=V(e._f,e._locale).match(z)||[],t=0;t<n.length;t++)s=n[t],(i=(c.match((g=s,v=e,w(ae,g)?ae[g](v._strict,v._locale):new RegExp(ce(g.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,i,n,s){return t||i||n||s})))))||[])[0])&&(0<(r=c.substr(0,c.indexOf(i))).length&&b(e).unusedInput.push(r),c=c.slice(c.indexOf(i)+i.length),h+=i.length),H[s]?(i?b(e).empty=!1:b(e).unusedTokens.push(s),o=s,l=e,null!=(a=i)&&w(de,o)&&de[o](a,l._a,l,o)):e._strict&&!i&&b(e).unusedTokens.push(s);b(e).charsLeftOver=d-h,0<c.length&&b(e).unusedInput.push(c),e._a[ge]<=12&&!0===b(e).bigHour&&0<e._a[ge]&&(b(e).bigHour=void 0),b(e).parsedDateParts=e._a.slice(0),b(e).meridiem=e._meridiem,e._a[ge]=(u=e._locale,f=e._a[ge],null==(m=e._meridiem)?f:null!=u.meridiemHour?u.meridiemHour(f,m):(null!=u.isPM&&((p=u.isPM(m))&&f<12&&(f+=12),p||12!==f||(f=0)),f)),ht(e),ct(e)}else _t(e);else yt(e);var u,f,m,p,g,v}function xt(e){var t,i,n,s,r=e._i,o=e._f;return e._locale=e._locale||lt(e._l),null===r||void 0===o&&""===r?g({nullInput:!0}):("string"==typeof r&&(e._i=r=e._locale.preparse(r)),S(r)?new _(ct(r)):(h(r)?e._d=r:a(o)?function(e){var t,i,n,s,r;if(0===e._f.length)return b(e).invalidFormat=!0,e._d=new Date(NaN);for(s=0;s<e._f.length;s++)r=0,t=v({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[s],St(t),p(t)&&(r+=b(t).charsLeftOver,r+=10*b(t).unusedTokens.length,b(t).score=r,(null==n||r<n)&&(n=r,i=t));f(e,i||t)}(e):o?St(e):c(i=(t=e)._i)?t._d=new Date(y.now()):h(i)?t._d=new Date(i.valueOf()):"string"==typeof i?(n=t,null===(s=vt.exec(n._i))?(yt(n),!1===n._isValid&&(delete n._isValid,_t(n),!1===n._isValid&&(delete n._isValid,y.createFromInputFallback(n)))):n._d=new Date(+s[1])):a(i)?(t._a=u(i.slice(0),function(e){return parseInt(e,10)}),ht(t)):l(i)?function(e){if(!e._d){var t=Y(e._i);e._a=u([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),ht(e)}}(t):d(i)?t._d=new Date(i):y.createFromInputFallback(t),p(e)||(e._d=null),e))}function Dt(e,t,i,n,s){var r,o={};return!0!==i&&!1!==i||(n=i,i=void 0),(l(e)&&function(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0}(e)||a(e)&&0===e.length)&&(e=void 0),o._isAMomentObject=!0,o._useUTC=o._isUTC=s,o._l=i,o._i=e,o._f=t,o._strict=n,(r=new _(ct(xt(o))))._nextDay&&(r.add(1,"d"),r._nextDay=void 0),r}function kt(e,t,i,n){return Dt(e,t,i,n,!1)}y.createFromInputFallback=i("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),y.ISO_8601=function(){},y.RFC_2822=function(){};var Ct=i("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=kt.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:g()}),Tt=i("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=kt.apply(null,arguments);return this.isValid()&&e.isValid()?this<e?this:e:g()});function Et(e,t){var i,n;if(1===t.length&&a(t[0])&&(t=t[0]),!t.length)return kt();for(i=t[0],n=1;n<t.length;++n)t[n].isValid()&&!t[n][e](i)||(i=t[n]);return i}var It=["year","quarter","month","week","day","hour","minute","second","millisecond"];function Mt(e){var t=Y(e),i=t.year||0,n=t.quarter||0,s=t.month||0,r=t.week||0,o=t.day||0,a=t.hour||0,l=t.minute||0,c=t.second||0,d=t.millisecond||0;this._isValid=function(e){for(var t in e)if(-1===De.call(It,t)||null!=e[t]&&isNaN(e[t]))return!1;for(var i=!1,n=0;n<It.length;++n)if(e[It[n]]){if(i)return!1;parseFloat(e[It[n]])!==D(e[It[n]])&&(i=!0)}return!0}(t),this._milliseconds=+d+1e3*c+6e4*l+1e3*a*60*60,this._days=+o+7*r,this._months=+s+3*n+12*i,this._data={},this._locale=lt(),this._bubble()}function Pt(e){return e instanceof Mt}function At(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function Ot(e,i){j(e,0,0,function(){var e=this.utcOffset(),t="+";return e<0&&(e=-e,t="-"),t+F(~~(e/60),2)+i+F(~~e%60,2)})}Ot("Z",":"),Ot("ZZ",""),le("Z",re),le("ZZ",re),he(["Z","ZZ"],function(e,t,i){i._useUTC=!0,i._tzm=Lt(re,e)});var Yt=/([\+\-]|\d\d)/gi;function Lt(e,t){var i=(t||"").match(e);if(null===i)return null;var n=((i[i.length-1]||[])+"").match(Yt)||["-",0,0],s=60*n[1]+D(n[2]);return 0===s?0:"+"===n[0]?s:-s}function Nt(e,t){var i,n;return t._isUTC?(i=t.clone(),n=(S(e)||h(e)?e.valueOf():kt(e).valueOf())-i.valueOf(),i._d.setTime(i._d.valueOf()+n),y.updateOffset(i,!1),i):kt(e).local()}function Ft(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function zt(){return!!this.isValid()&&this._isUTC&&0===this._offset}y.updateOffset=function(){};var Wt=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Rt=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function Ht(e,t){var i,n,s,r,o,a,l=e,c=null;return Pt(e)?l={ms:e._milliseconds,d:e._days,M:e._months}:d(e)?(l={},t?l[t]=e:l.milliseconds=e):(c=Wt.exec(e))?(i="-"===c[1]?-1:1,l={y:0,d:D(c[pe])*i,h:D(c[ge])*i,m:D(c[ve])*i,s:D(c[ye])*i,ms:D(At(1e3*c[we]))*i}):(c=Rt.exec(e))?(i="-"===c[1]?-1:(c[1],1),l={y:jt(c[2],i),M:jt(c[3],i),w:jt(c[4],i),d:jt(c[5],i),h:jt(c[6],i),m:jt(c[7],i),s:jt(c[8],i)}):null==l?l={}:"object"==typeof l&&("from"in l||"to"in l)&&(r=kt(l.from),o=kt(l.to),s=r.isValid()&&o.isValid()?(o=Nt(o,r),r.isBefore(o)?a=Ut(r,o):((a=Ut(o,r)).milliseconds=-a.milliseconds,a.months=-a.months),a):{milliseconds:0,months:0},(l={}).ms=s.milliseconds,l.M=s.months),n=new Mt(l),Pt(e)&&w(e,"_locale")&&(n._locale=e._locale),n}function jt(e,t){var i=e&&parseFloat(e.replace(",","."));return(isNaN(i)?0:i)*t}function Ut(e,t){var i={milliseconds:0,months:0};return i.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(i.months,"M").isAfter(t)&&--i.months,i.milliseconds=+t-+e.clone().add(i.months,"M"),i}function Vt(n,s){return function(e,t){var i;return null===t||isNaN(+t)||(T(s,"moment()."+s+"(period, number) is deprecated. Please use moment()."+s+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),i=e,e=t,t=i),qt(this,Ht(e="string"==typeof e?+e:e,t),n),this}}function qt(e,t,i,n){var s=t._milliseconds,r=At(t._days),o=At(t._months);e.isValid()&&(n=null==n||n,o&&Oe(e,Te(e,"Month")+o*i),r&&Ee(e,"Date",Te(e,"Date")+r*i),s&&e._d.setTime(e._d.valueOf()+s*i),n&&y.updateOffset(e,r||o))}Ht.fn=Mt.prototype,Ht.invalid=function(){return Ht(NaN)};var Bt=Vt(1,"add"),$t=Vt(-1,"subtract");function Gt(e,t){var i=12*(t.year()-e.year())+(t.month()-e.month()),n=e.clone().add(i,"months");return-(i+(t-n<0?(t-n)/(n-e.clone().add(i-1,"months")):(t-n)/(e.clone().add(i+1,"months")-n)))||0}function Xt(e){var t;return void 0===e?this._locale._abbr:(null!=(t=lt(e))&&(this._locale=t),this)}y.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",y.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Kt=i("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});function Zt(){return this._locale}function Qt(e,t){j(0,[e,e.length],0,t)}function Jt(e,t,i,n,s){var r;return null==e?He(this,n,s).year:((r=je(e,n,s))<t&&(t=r),function(e,t,i,n,s){var r=Re(e,t,i,n,s),o=ze(r.year,0,r.dayOfYear);return this.year(o.getUTCFullYear()),this.month(o.getUTCMonth()),this.date(o.getUTCDate()),this}.call(this,e,t,i,n,s))}j(0,["gg",2],0,function(){return this.weekYear()%100}),j(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Qt("gggg","weekYear"),Qt("ggggg","weekYear"),Qt("GGGG","isoWeekYear"),Qt("GGGGG","isoWeekYear"),A("weekYear","gg"),A("isoWeekYear","GG"),N("weekYear",1),N("isoWeekYear",1),le("G",ne),le("g",ne),le("GG",K,B),le("gg",K,B),le("GGGG",ee,G),le("gggg",ee,G),le("GGGGG",te,X),le("ggggg",te,X),ue(["gggg","ggggg","GGGG","GGGGG"],function(e,t,i,n){t[n.substr(0,2)]=D(e)}),ue(["gg","GG"],function(e,t,i,n){t[n]=y.parseTwoDigitYear(e)}),j("Q",0,"Qo","quarter"),A("quarter","Q"),N("quarter",7),le("Q",q),he("Q",function(e,t){t[me]=3*(D(e)-1)}),j("D",["DD",2],"Do","date"),A("date","D"),N("date",9),le("D",K),le("DD",K,B),le("Do",function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient}),he(["D","DD"],pe),he("Do",function(e,t){t[pe]=D(e.match(K)[0])});var ei=Ce("Date",!0);j("DDD",["DDDD",3],"DDDo","dayOfYear"),A("dayOfYear","DDD"),N("dayOfYear",4),le("DDD",J),le("DDDD",$),he(["DDD","DDDD"],function(e,t,i){i._dayOfYear=D(e)}),j("m",["mm",2],0,"minute"),A("minute","m"),N("minute",14),le("m",K),le("mm",K,B),he(["m","mm"],ve);var ti=Ce("Minutes",!1);j("s",["ss",2],0,"second"),A("second","s"),N("second",15),le("s",K),le("ss",K,B),he(["s","ss"],ye);var ii,ni=Ce("Seconds",!1);for(j("S",0,0,function(){return~~(this.millisecond()/100)}),j(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),j(0,["SSS",3],0,"millisecond"),j(0,["SSSS",4],0,function(){return 10*this.millisecond()}),j(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),j(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),j(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),j(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),j(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),A("millisecond","ms"),N("millisecond",16),le("S",J,q),le("SS",J,B),le("SSS",J,$),ii="SSSS";ii.length<=9;ii+="S")le(ii,ie);function si(e,t){t[we]=D(1e3*("0."+e))}for(ii="S";ii.length<=9;ii+="S")he(ii,si);var ri=Ce("Milliseconds",!1);j("z",0,0,"zoneAbbr"),j("zz",0,0,"zoneName");var oi=_.prototype;function ai(e){return e}oi.add=Bt,oi.calendar=function(e,t){var i=e||kt(),n=Nt(i,this).startOf("day"),s=y.calendarFormat(this,n)||"sameElse",r=t&&(E(t[s])?t[s].call(this,i):t[s]);return this.format(r||this.localeData().calendar(s,this,kt(i)))},oi.clone=function(){return new _(this)},oi.diff=function(e,t,i){var n,s,r;if(!this.isValid())return NaN;if(!(n=Nt(e,this)).isValid())return NaN;switch(s=6e4*(n.utcOffset()-this.utcOffset()),t=O(t)){case"year":r=Gt(this,n)/12;break;case"month":r=Gt(this,n);break;case"quarter":r=Gt(this,n)/3;break;case"second":r=(this-n)/1e3;break;case"minute":r=(this-n)/6e4;break;case"hour":r=(this-n)/36e5;break;case"day":r=(this-n-s)/864e5;break;case"week":r=(this-n-s)/6048e5;break;default:r=this-n}return i?r:x(r)},oi.endOf=function(e){return void 0===(e=O(e))||"millisecond"===e?this:("date"===e&&(e="day"),this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms"))},oi.format=function(e){e||(e=this.isUtc()?y.defaultFormatUtc:y.defaultFormat);var t=U(this,e);return this.localeData().postformat(t)},oi.from=function(e,t){return this.isValid()&&(S(e)&&e.isValid()||kt(e).isValid())?Ht({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},oi.fromNow=function(e){return this.from(kt(),e)},oi.to=function(e,t){return this.isValid()&&(S(e)&&e.isValid()||kt(e).isValid())?Ht({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},oi.toNow=function(e){return this.to(kt(),e)},oi.get=function(e){return E(this[e=O(e)])?this[e]():this},oi.invalidAt=function(){return b(this).overflow},oi.isAfter=function(e,t){var i=S(e)?e:kt(e);return!(!this.isValid()||!i.isValid())&&("millisecond"===(t=O(c(t)?"millisecond":t))?this.valueOf()>i.valueOf():i.valueOf()<this.clone().startOf(t).valueOf())},oi.isBefore=function(e,t){var i=S(e)?e:kt(e);return!(!this.isValid()||!i.isValid())&&("millisecond"===(t=O(c(t)?"millisecond":t))?this.valueOf()<i.valueOf():this.clone().endOf(t).valueOf()<i.valueOf())},oi.isBetween=function(e,t,i,n){return("("===(n=n||"()")[0]?this.isAfter(e,i):!this.isBefore(e,i))&&(")"===n[1]?this.isBefore(t,i):!this.isAfter(t,i))},oi.isSame=function(e,t){var i,n=S(e)?e:kt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=O(t||"millisecond"))?this.valueOf()===n.valueOf():(i=n.valueOf(),this.clone().startOf(t).valueOf()<=i&&i<=this.clone().endOf(t).valueOf()))},oi.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)},oi.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)},oi.isValid=function(){return p(this)},oi.lang=Kt,oi.locale=Xt,oi.localeData=Zt,oi.max=Tt,oi.min=Ct,oi.parsingFlags=function(){return f({},b(this))},oi.set=function(e,t){if("object"==typeof e)for(var i=function(e){var t=[];for(var i in e)t.push({unit:i,priority:L[i]});return t.sort(function(e,t){return e.priority-t.priority}),t}(e=Y(e)),n=0;n<i.length;n++)this[i[n].unit](e[i[n].unit]);else if(E(this[e=O(e)]))return this[e](t);return this},oi.startOf=function(e){switch(e=O(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this},oi.subtract=$t,oi.toArray=function(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]},oi.toObject=function(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}},oi.toDate=function(){return new Date(this.valueOf())},oi.toISOString=function(e){if(!this.isValid())return null;var t=!0!==e,i=t?this.clone().utc():this;return i.year()<0||9999<i.year()?U(i,t?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):E(Date.prototype.toISOString)?t?this.toDate().toISOString():new Date(this.valueOf()+60*this.utcOffset()*1e3).toISOString().replace("Z",U(i,"Z")):U(i,t?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")},oi.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",t="Z");var i="["+e+'("]',n=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",s=t+'[")]';return this.format(i+n+"-MM-DD[T]HH:mm:ss.SSS"+s)},oi.toJSON=function(){return this.isValid()?this.toISOString():null},oi.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},oi.unix=function(){return Math.floor(this.valueOf()/1e3)},oi.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},oi.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},oi.year=ke,oi.isLeapYear=function(){return xe(this.year())},oi.weekYear=function(e){return Jt.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},oi.isoWeekYear=function(e){return Jt.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},oi.quarter=oi.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},oi.month=Ye,oi.daysInMonth=function(){return Ie(this.year(),this.month())},oi.week=oi.weeks=function(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")},oi.isoWeek=oi.isoWeeks=function(e){var t=He(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")},oi.weeksInYear=function(){var e=this.localeData()._week;return je(this.year(),e.dow,e.doy)},oi.isoWeeksInYear=function(){return je(this.year(),1,4)},oi.date=ei,oi.day=oi.days=function(e){if(!this.isValid())return null!=e?this:NaN;var t,i,n=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(t=e,i=this.localeData(),e="string"!=typeof t?t:isNaN(t)?"number"==typeof(t=i.weekdaysParse(t))?t:null:parseInt(t,10),this.add(e-n,"d")):n},oi.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")},oi.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var t=(i=e,n=this.localeData(),"string"==typeof i?n.weekdaysParse(i)%7||7:isNaN(i)?null:i);return this.day(this.day()%7?t:t-7)}return this.day()||7;var i,n},oi.dayOfYear=function(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")},oi.hour=oi.hours=et,oi.minute=oi.minutes=ti,oi.second=oi.seconds=ni,oi.millisecond=oi.milliseconds=ri,oi.utcOffset=function(e,t,i){var n,s=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null!=e){if("string"==typeof e){if(null===(e=Lt(re,e)))return this}else Math.abs(e)<16&&!i&&(e*=60);return!this._isUTC&&t&&(n=Ft(this)),this._offset=e,this._isUTC=!0,null!=n&&this.add(n,"m"),s!==e&&(!t||this._changeInProgress?qt(this,Ht(e-s,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,y.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?s:Ft(this)},oi.utc=function(e){return this.utcOffset(0,e)},oi.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Ft(this),"m")),this},oi.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var e=Lt(se,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this},oi.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?kt(e).utcOffset():0,(this.utcOffset()-e)%60==0)},oi.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},oi.isLocal=function(){return!!this.isValid()&&!this._isUTC},oi.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},oi.isUtc=zt,oi.isUTC=zt,oi.zoneAbbr=function(){return this._isUTC?"UTC":""},oi.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},oi.dates=i("dates accessor is deprecated. Use date instead.",ei),oi.months=i("months accessor is deprecated. Use month instead",Ye),oi.years=i("years accessor is deprecated. Use year instead",ke),oi.zone=i("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}),oi.isDSTShifted=i("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!c(this._isDSTShifted))return this._isDSTShifted;var e={};if(v(e,this),(e=xt(e))._a){var t=e._isUTC?m(e._a):kt(e._a);this._isDSTShifted=this.isValid()&&0<o(e._a,t.toArray())}else this._isDSTShifted=!1;return this._isDSTShifted});var li=M.prototype;function ci(e,t,i,n){var s=lt(),r=m().set(n,t);return s[i](r,e)}function di(e,t,i){if(d(e)&&(t=e,e=void 0),e=e||"",null!=t)return ci(e,t,i,"month");var n,s=[];for(n=0;n<12;n++)s[n]=ci(e,n,i,"month");return s}function hi(e,t,i,n){"boolean"==typeof e?d(t)&&(i=t,t=void 0):(t=e,e=!1,d(i=t)&&(i=t,t=void 0)),t=t||"";var s,r=lt(),o=e?r._week.dow:0;if(null!=i)return ci(t,(i+o)%7,n,"day");var a=[];for(s=0;s<7;s++)a[s]=ci(t,(s+o)%7,n,"day");return a}li.calendar=function(e,t,i){var n=this._calendar[e]||this._calendar.sameElse;return E(n)?n.call(t,i):n},li.longDateFormat=function(e){var t=this._longDateFormat[e],i=this._longDateFormat[e.toUpperCase()];return t||!i?t:(this._longDateFormat[e]=i.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])},li.invalidDate=function(){return this._invalidDate},li.ordinal=function(e){return this._ordinal.replace("%d",e)},li.preparse=ai,li.postformat=ai,li.relativeTime=function(e,t,i,n){var s=this._relativeTime[i];return E(s)?s(e,t,i,n):s.replace(/%d/i,e)},li.pastFuture=function(e,t){var i=this._relativeTime[0<e?"future":"past"];return E(i)?i(t):i.replace(/%s/i,t)},li.set=function(e){var t,i;for(i in e)E(t=e[i])?this[i]=t:this["_"+i]=t;this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},li.months=function(e,t){return e?a(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||Me).test(t)?"format":"standalone"][e.month()]:a(this._months)?this._months:this._months.standalone},li.monthsShort=function(e,t){return e?a(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[Me.test(t)?"format":"standalone"][e.month()]:a(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},li.monthsParse=function(e,t,i){var n,s,r;if(this._monthsParseExact)return function(e,t,i){var n,s,r,o=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],n=0;n<12;++n)r=m([2e3,n]),this._shortMonthsParse[n]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[n]=this.months(r,"").toLocaleLowerCase();return i?"MMM"===t?-1!==(s=De.call(this._shortMonthsParse,o))?s:null:-1!==(s=De.call(this._longMonthsParse,o))?s:null:"MMM"===t?-1!==(s=De.call(this._shortMonthsParse,o))?s:-1!==(s=De.call(this._longMonthsParse,o))?s:null:-1!==(s=De.call(this._longMonthsParse,o))?s:-1!==(s=De.call(this._shortMonthsParse,o))?s:null}.call(this,e,t,i);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),n=0;n<12;n++){if(s=m([2e3,n]),i&&!this._longMonthsParse[n]&&(this._longMonthsParse[n]=new RegExp("^"+this.months(s,"").replace(".","")+"$","i"),this._shortMonthsParse[n]=new RegExp("^"+this.monthsShort(s,"").replace(".","")+"$","i")),i||this._monthsParse[n]||(r="^"+this.months(s,"")+"|^"+this.monthsShort(s,""),this._monthsParse[n]=new RegExp(r.replace(".",""),"i")),i&&"MMMM"===t&&this._longMonthsParse[n].test(e))return n;if(i&&"MMM"===t&&this._shortMonthsParse[n].test(e))return n;if(!i&&this._monthsParse[n].test(e))return n}},li.monthsRegex=function(e){return this._monthsParseExact?(w(this,"_monthsRegex")||Fe.call(this),e?this._monthsStrictRegex:this._monthsRegex):(w(this,"_monthsRegex")||(this._monthsRegex=Ne),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},li.monthsShortRegex=function(e){return this._monthsParseExact?(w(this,"_monthsRegex")||Fe.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(w(this,"_monthsShortRegex")||(this._monthsShortRegex=Le),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},li.week=function(e){return He(e,this._week.dow,this._week.doy).week},li.firstDayOfYear=function(){return this._week.doy},li.firstDayOfWeek=function(){return this._week.dow},li.weekdays=function(e,t){return e?a(this._weekdays)?this._weekdays[e.day()]:this._weekdays[this._weekdays.isFormat.test(t)?"format":"standalone"][e.day()]:a(this._weekdays)?this._weekdays:this._weekdays.standalone},li.weekdaysMin=function(e){return e?this._weekdaysMin[e.day()]:this._weekdaysMin},li.weekdaysShort=function(e){return e?this._weekdaysShort[e.day()]:this._weekdaysShort},li.weekdaysParse=function(e,t,i){var n,s,r;if(this._weekdaysParseExact)return function(e,t,i){var n,s,r,o=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],n=0;n<7;++n)r=m([2e3,1]).day(n),this._minWeekdaysParse[n]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[n]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[n]=this.weekdays(r,"").toLocaleLowerCase();return i?"dddd"===t?-1!==(s=De.call(this._weekdaysParse,o))?s:null:"ddd"===t?-1!==(s=De.call(this._shortWeekdaysParse,o))?s:null:-1!==(s=De.call(this._minWeekdaysParse,o))?s:null:"dddd"===t?-1!==(s=De.call(this._weekdaysParse,o))?s:-1!==(s=De.call(this._shortWeekdaysParse,o))?s:-1!==(s=De.call(this._minWeekdaysParse,o))?s:null:"ddd"===t?-1!==(s=De.call(this._shortWeekdaysParse,o))?s:-1!==(s=De.call(this._weekdaysParse,o))?s:-1!==(s=De.call(this._minWeekdaysParse,o))?s:null:-1!==(s=De.call(this._minWeekdaysParse,o))?s:-1!==(s=De.call(this._weekdaysParse,o))?s:-1!==(s=De.call(this._shortWeekdaysParse,o))?s:null}.call(this,e,t,i);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),n=0;n<7;n++){if(s=m([2e3,1]).day(n),i&&!this._fullWeekdaysParse[n]&&(this._fullWeekdaysParse[n]=new RegExp("^"+this.weekdays(s,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[n]=new RegExp("^"+this.weekdaysShort(s,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[n]=new RegExp("^"+this.weekdaysMin(s,"").replace(".",".?")+"$","i")),this._weekdaysParse[n]||(r="^"+this.weekdays(s,"")+"|^"+this.weekdaysShort(s,"")+"|^"+this.weekdaysMin(s,""),this._weekdaysParse[n]=new RegExp(r.replace(".",""),"i")),i&&"dddd"===t&&this._fullWeekdaysParse[n].test(e))return n;if(i&&"ddd"===t&&this._shortWeekdaysParse[n].test(e))return n;if(i&&"dd"===t&&this._minWeekdaysParse[n].test(e))return n;if(!i&&this._weekdaysParse[n].test(e))return n}},li.weekdaysRegex=function(e){return this._weekdaysParseExact?(w(this,"_weekdaysRegex")||Xe.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(w(this,"_weekdaysRegex")||(this._weekdaysRegex=Be),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},li.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(w(this,"_weekdaysRegex")||Xe.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(w(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=$e),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},li.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(w(this,"_weekdaysRegex")||Xe.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(w(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Ge),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},li.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},li.meridiem=function(e,t,i){return 11<e?i?"pm":"PM":i?"am":"AM"},ot("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10;return e+(1===D(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th")}}),y.lang=i("moment.lang is deprecated. Use moment.locale instead.",ot),y.langData=i("moment.langData is deprecated. Use moment.localeData instead.",lt);var ui=Math.abs;function fi(e,t,i,n){var s=Ht(t,i);return e._milliseconds+=n*s._milliseconds,e._days+=n*s._days,e._months+=n*s._months,e._bubble()}function mi(e){return e<0?Math.floor(e):Math.ceil(e)}function pi(e){return 4800*e/146097}function gi(e){return 146097*e/4800}function vi(e){return function(){return this.as(e)}}var yi=vi("ms"),wi=vi("s"),bi=vi("m"),_i=vi("h"),Si=vi("d"),xi=vi("w"),Di=vi("M"),ki=vi("y");function Ci(e){return function(){return this.isValid()?this._data[e]:NaN}}var Ti=Ci("milliseconds"),Ei=Ci("seconds"),Ii=Ci("minutes"),Mi=Ci("hours"),Pi=Ci("days"),Ai=Ci("months"),Oi=Ci("years"),Yi=Math.round,Li={ss:44,s:45,m:45,h:22,d:26,M:11},Ni=Math.abs;function Fi(e){return(0<e)-(e<0)||+e}function zi(){if(!this.isValid())return this.localeData().invalidDate();var e,t,i=Ni(this._milliseconds)/1e3,n=Ni(this._days),s=Ni(this._months);t=x((e=x(i/60))/60),i%=60,e%=60;var r=x(s/12),o=s%=12,a=n,l=t,c=e,d=i?i.toFixed(3).replace(/\.?0+$/,""):"",h=this.asSeconds();if(!h)return"P0D";var u=h<0?"-":"",f=Fi(this._months)!==Fi(h)?"-":"",m=Fi(this._days)!==Fi(h)?"-":"",p=Fi(this._milliseconds)!==Fi(h)?"-":"";return u+"P"+(r?f+r+"Y":"")+(o?f+o+"M":"")+(a?m+a+"D":"")+(l||c||d?"T":"")+(l?p+l+"H":"")+(c?p+c+"M":"")+(d?p+d+"S":"")}var Wi=Mt.prototype;return Wi.isValid=function(){return this._isValid},Wi.abs=function(){var e=this._data;return this._milliseconds=ui(this._milliseconds),this._days=ui(this._days),this._months=ui(this._months),e.milliseconds=ui(e.milliseconds),e.seconds=ui(e.seconds),e.minutes=ui(e.minutes),e.hours=ui(e.hours),e.months=ui(e.months),e.years=ui(e.years),this},Wi.add=function(e,t){return fi(this,e,t,1)},Wi.subtract=function(e,t){return fi(this,e,t,-1)},Wi.as=function(e){if(!this.isValid())return NaN;var t,i,n=this._milliseconds;if("month"===(e=O(e))||"year"===e)return t=this._days+n/864e5,i=this._months+pi(t),"month"===e?i:i/12;switch(t=this._days+Math.round(gi(this._months)),e){case"week":return t/7+n/6048e5;case"day":return t+n/864e5;case"hour":return 24*t+n/36e5;case"minute":return 1440*t+n/6e4;case"second":return 86400*t+n/1e3;case"millisecond":return Math.floor(864e5*t)+n;default:throw new Error("Unknown unit "+e)}},Wi.asMilliseconds=yi,Wi.asSeconds=wi,Wi.asMinutes=bi,Wi.asHours=_i,Wi.asDays=Si,Wi.asWeeks=xi,Wi.asMonths=Di,Wi.asYears=ki,Wi.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*D(this._months/12):NaN},Wi._bubble=function(){var e,t,i,n,s,r=this._milliseconds,o=this._days,a=this._months,l=this._data;return 0<=r&&0<=o&&0<=a||r<=0&&o<=0&&a<=0||(r+=864e5*mi(gi(a)+o),a=o=0),l.milliseconds=r%1e3,e=x(r/1e3),l.seconds=e%60,t=x(e/60),l.minutes=t%60,i=x(t/60),l.hours=i%24,a+=s=x(pi(o+=x(i/24))),o-=mi(gi(s)),n=x(a/12),a%=12,l.days=o,l.months=a,l.years=n,this},Wi.clone=function(){return Ht(this)},Wi.get=function(e){return e=O(e),this.isValid()?this[e+"s"]():NaN},Wi.milliseconds=Ti,Wi.seconds=Ei,Wi.minutes=Ii,Wi.hours=Mi,Wi.days=Pi,Wi.weeks=function(){return x(this.days()/7)},Wi.months=Ai,Wi.years=Oi,Wi.humanize=function(e){if(!this.isValid())return this.localeData().invalidDate();var t,i,n,s,r,o,a,l,c,d,h=this.localeData(),u=(t=!e,i=h,n=Ht(this).abs(),s=Yi(n.as("s")),r=Yi(n.as("m")),o=Yi(n.as("h")),a=Yi(n.as("d")),l=Yi(n.as("M")),c=Yi(n.as("y")),(d=s<=Li.ss&&["s",s]||s<Li.s&&["ss",s]||r<=1&&["m"]||r<Li.m&&["mm",r]||o<=1&&["h"]||o<Li.h&&["hh",o]||a<=1&&["d"]||a<Li.d&&["dd",a]||l<=1&&["M"]||l<Li.M&&["MM",l]||c<=1&&["y"]||["yy",c])[2]=t,d[3]=0<+this,d[4]=i,function(e,t,i,n,s){return s.relativeTime(t||1,!!i,e,n)}.apply(null,d));return e&&(u=h.pastFuture(+this,u)),h.postformat(u)},Wi.toISOString=zi,Wi.toString=zi,Wi.toJSON=zi,Wi.locale=Xt,Wi.localeData=Zt,Wi.toIsoString=i("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",zi),Wi.lang=Kt,j("X",0,0,"unix"),j("x",0,0,"valueOf"),le("x",ne),le("X",/[+-]?\d+(\.\d{1,3})?/),he("X",function(e,t,i){i._d=new Date(1e3*parseFloat(e,10))}),he("x",function(e,t,i){i._d=new Date(D(e))}),y.version="2.22.1",e=kt,y.fn=oi,y.min=function(){return Et("isBefore",[].slice.call(arguments,0))},y.max=function(){return Et("isAfter",[].slice.call(arguments,0))},y.now=function(){return Date.now?Date.now():+new Date},y.utc=m,y.unix=function(e){return kt(1e3*e)},y.months=function(e,t){return di(e,t,"months")},y.isDate=h,y.locale=ot,y.invalid=g,y.duration=Ht,y.isMoment=S,y.weekdays=function(e,t,i){return hi(e,t,i,"weekdays")},y.parseZone=function(){return kt.apply(null,arguments).parseZone()},y.localeData=lt,y.isDuration=Pt,y.monthsShort=function(e,t){return di(e,t,"monthsShort")},y.weekdaysMin=function(e,t,i){return hi(e,t,i,"weekdaysMin")},y.defineLocale=at,y.updateLocale=function(e,t){if(null!=t){var i,n,s=tt;null!=(n=rt(e))&&(s=n._config),(i=new M(t=I(s,t))).parentLocale=it[e],it[e]=i,ot(e)}else null!=it[e]&&(null!=it[e].parentLocale?it[e]=it[e].parentLocale:null!=it[e]&&delete it[e]);return it[e]},y.locales=function(){return n(it)},y.weekdaysShort=function(e,t,i){return hi(e,t,i,"weekdaysShort")},y.normalizeUnits=O,y.relativeTimeRounding=function(e){return void 0===e?Yi:"function"==typeof e&&(Yi=e,!0)},y.relativeTimeThreshold=function(e,t){return void 0!==Li[e]&&(void 0===t?Li[e]:(Li[e]=t,"s"===e&&(Li.ss=t-1),!0))},y.calendarFormat=function(e,t){var i=e.diff(t,"days",!0);return i<-6?"sameElse":i<-1?"lastWeek":i<0?"lastDay":i<1?"sameDay":i<2?"nextDay":i<7?"nextWeek":"sameElse"},y.prototype=oi,y.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"YYYY-[W]WW",MONTH:"YYYY-MM"},y}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],t):t(e.bootstrap={},e.jQuery)}(this,function(e,t){"use strict";function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}function l(s){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},t=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),t.forEach(function(e){var t,i,n;t=s,n=r[i=e],i in t?Object.defineProperty(t,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[i]=n})}return s}for(var s,i,r,a,c,d,h,u,f,m,p,g,v,y,w,b,_,S,x,D,k,C,T,E,I,M,P,A,O,Y,L,N,F,z,W,R,H,j,U,V,q,B,$,G,X,K,Z,Q,J,ee,te,ie,ne,se,re,oe,ae,le,ce,de,he,ue,fe,me,pe=function(n){var t="transitionend";function e(e){var t=this,i=!1;return n(this).one(l.TRANSITION_END,function(){i=!0}),setTimeout(function(){i||l.triggerTransitionEnd(t)},e),this}var l={TRANSITION_END:"bsTransitionEnd",getUID:function(e){for(;e+=~~(1e6*Math.random()),document.getElementById(e););return e},getSelectorFromElement:function(e){var t=e.getAttribute("data-target");t&&"#"!==t||(t=e.getAttribute("href")||"");try{return document.querySelector(t)?t:null}catch(e){return null}},getTransitionDurationFromElement:function(e){if(!e)return 0;var t=n(e).css("transition-duration");return parseFloat(t)?(t=t.split(",")[0],1e3*parseFloat(t)):0},reflow:function(e){return e.offsetHeight},triggerTransitionEnd:function(e){n(e).trigger(t)},supportsTransitionEnd:function(){return Boolean(t)},isElement:function(e){return(e[0]||e).nodeType},typeCheckConfig:function(e,t,i){for(var n in i)if(Object.prototype.hasOwnProperty.call(i,n)){var s=i[n],r=t[n],o=r&&l.isElement(r)?"element":(a=r,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(s).test(o))throw new Error(e.toUpperCase()+': Option "'+n+'" provided type "'+o+'" but expected type "'+s+'".')}var a}};return n.fn.emulateTransitionEnd=e,n.event.special[l.TRANSITION_END]={bindType:t,delegateType:t,handle:function(e){if(n(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}},l}(t=t&&t.hasOwnProperty("default")?t.default:t),ge=(i="alert",a="."+(r="bs.alert"),c=(s=t).fn[i],d={CLOSE:"close"+a,CLOSED:"closed"+a,CLICK_DATA_API:"click"+a+".data-api"},h="alert",u="fade",f="show",m=function(){function n(e){this._element=e}var e=n.prototype;return e.close=function(e){var t=this._element;e&&(t=this._getRootElement(e)),this._triggerCloseEvent(t).isDefaultPrevented()||this._removeElement(t)},e.dispose=function(){s.removeData(this._element,r),this._element=null},e._getRootElement=function(e){var t=pe.getSelectorFromElement(e),i=!1;return t&&(i=document.querySelector(t)),i||(i=s(e).closest("."+h)[0]),i},e._triggerCloseEvent=function(e){var t=s.Event(d.CLOSE);return s(e).trigger(t),t},e._removeElement=function(t){var i=this;if(s(t).removeClass(f),s(t).hasClass(u)){var e=pe.getTransitionDurationFromElement(t);s(t).one(pe.TRANSITION_END,function(e){return i._destroyElement(t,e)}).emulateTransitionEnd(e)}else this._destroyElement(t)},e._destroyElement=function(e){s(e).detach().trigger(d.CLOSED).remove()},n._jQueryInterface=function(i){return this.each(function(){var e=s(this),t=e.data(r);t||(t=new n(this),e.data(r,t)),"close"===i&&t[i](this)})},n._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},o(n,null,[{key:"VERSION",get:function(){return"4.1.3"}}]),n}(),s(document).on(d.CLICK_DATA_API,'[data-dismiss="alert"]',m._handleDismiss(new m)),s.fn[i]=m._jQueryInterface,s.fn[i].Constructor=m,s.fn[i].noConflict=function(){return s.fn[i]=c,m._jQueryInterface},m),ve=(g="button",y="."+(v="bs.button"),w=".data-api",b=(p=t).fn[g],_="active",S="btn",D='[data-toggle^="button"]',k='[data-toggle="buttons"]',C="input",T=".active",E=".btn",I={CLICK_DATA_API:"click"+y+w,FOCUS_BLUR_DATA_API:(x="focus")+y+w+" blur"+y+w},M=function(){function i(e){this._element=e}var e=i.prototype;return e.toggle=function(){var e=!0,t=!0,i=p(this._element).closest(k)[0];if(i){var n=this._element.querySelector(C);if(n){if("radio"===n.type)if(n.checked&&this._element.classList.contains(_))e=!1;else{var s=i.querySelector(T);s&&p(s).removeClass(_)}if(e){if(n.hasAttribute("disabled")||i.hasAttribute("disabled")||n.classList.contains("disabled")||i.classList.contains("disabled"))return;n.checked=!this._element.classList.contains(_),p(n).trigger("change")}n.focus(),t=!1}}t&&this._element.setAttribute("aria-pressed",!this._element.classList.contains(_)),e&&p(this._element).toggleClass(_)},e.dispose=function(){p.removeData(this._element,v),this._element=null},i._jQueryInterface=function(t){return this.each(function(){var e=p(this).data(v);e||(e=new i(this),p(this).data(v,e)),"toggle"===t&&e[t]()})},o(i,null,[{key:"VERSION",get:function(){return"4.1.3"}}]),i}(),p(document).on(I.CLICK_DATA_API,D,function(e){e.preventDefault();var t=e.target;p(t).hasClass(S)||(t=p(t).closest(E)),M._jQueryInterface.call(p(t),"toggle")}).on(I.FOCUS_BLUR_DATA_API,D,function(e){var t=p(e.target).closest(E)[0];p(t).toggleClass(x,/^focus(in)?$/.test(e.type))}),p.fn[g]=M._jQueryInterface,p.fn[g].Constructor=M,p.fn[g].noConflict=function(){return p.fn[g]=b,M._jQueryInterface},M),ye=(A="carousel",Y="."+(O="bs.carousel"),L=".data-api",N=(P=t).fn[A],F={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},z={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},W="next",R="prev",H="left",j="right",U={SLIDE:"slide"+Y,SLID:"slid"+Y,KEYDOWN:"keydown"+Y,MOUSEENTER:"mouseenter"+Y,MOUSELEAVE:"mouseleave"+Y,TOUCHEND:"touchend"+Y,LOAD_DATA_API:"load"+Y+L,CLICK_DATA_API:"click"+Y+L},V="carousel",q="active",B="slide",$="carousel-item-right",G="carousel-item-left",X="carousel-item-next",K="carousel-item-prev",Z={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},Q=function(){function r(e,t){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(t),this._element=P(e)[0],this._indicatorsElement=this._element.querySelector(Z.INDICATORS),this._addEventListeners()}var e=r.prototype;return e.next=function(){this._isSliding||this._slide(W)},e.nextWhenVisible=function(){!document.hidden&&P(this._element).is(":visible")&&"hidden"!==P(this._element).css("visibility")&&this.next()},e.prev=function(){this._isSliding||this._slide(R)},e.pause=function(e){e||(this._isPaused=!0),this._element.querySelector(Z.NEXT_PREV)&&(pe.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},e.cycle=function(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},e.to=function(e){var t=this;this._activeElement=this._element.querySelector(Z.ACTIVE_ITEM);var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)P(this._element).one(U.SLID,function(){return t.to(e)});else{if(i===e)return this.pause(),void this.cycle();var n=i<e?W:R;this._slide(n,this._items[e])}},e.dispose=function(){P(this._element).off(Y),P.removeData(this._element,O),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},e._getConfig=function(e){return e=l({},F,e),pe.typeCheckConfig(A,e,z),e},e._addEventListeners=function(){var t=this;this._config.keyboard&&P(this._element).on(U.KEYDOWN,function(e){return t._keydown(e)}),"hover"===this._config.pause&&(P(this._element).on(U.MOUSEENTER,function(e){return t.pause(e)}).on(U.MOUSELEAVE,function(e){return t.cycle(e)}),"ontouchstart"in document.documentElement&&P(this._element).on(U.TOUCHEND,function(){t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout(function(e){return t.cycle(e)},500+t._config.interval)}))},e._keydown=function(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case 37:e.preventDefault(),this.prev();break;case 39:e.preventDefault(),this.next()}},e._getItemIndex=function(e){return this._items=e&&e.parentNode?[].slice.call(e.parentNode.querySelectorAll(Z.ITEM)):[],this._items.indexOf(e)},e._getItemByDirection=function(e,t){var i=e===W,n=e===R,s=this._getItemIndex(t),r=this._items.length-1;if((n&&0===s||i&&s===r)&&!this._config.wrap)return t;var o=(s+(e===R?-1:1))%this._items.length;return-1===o?this._items[this._items.length-1]:this._items[o]},e._triggerSlideEvent=function(e,t){var i=this._getItemIndex(e),n=this._getItemIndex(this._element.querySelector(Z.ACTIVE_ITEM)),s=P.Event(U.SLIDE,{relatedTarget:e,direction:t,from:n,to:i});return P(this._element).trigger(s),s},e._setActiveIndicatorElement=function(e){if(this._indicatorsElement){var t=[].slice.call(this._indicatorsElement.querySelectorAll(Z.ACTIVE));P(t).removeClass(q);var i=this._indicatorsElement.children[this._getItemIndex(e)];i&&P(i).addClass(q)}},e._slide=function(e,t){var i,n,s,r=this,o=this._element.querySelector(Z.ACTIVE_ITEM),a=this._getItemIndex(o),l=t||o&&this._getItemByDirection(e,o),c=this._getItemIndex(l),d=Boolean(this._interval);if(e===W?(i=G,n=X,s=H):(i=$,n=K,s=j),l&&P(l).hasClass(q))this._isSliding=!1;else if(!this._triggerSlideEvent(l,s).isDefaultPrevented()&&o&&l){this._isSliding=!0,d&&this.pause(),this._setActiveIndicatorElement(l);var h=P.Event(U.SLID,{relatedTarget:l,direction:s,from:a,to:c});if(P(this._element).hasClass(B)){P(l).addClass(n),pe.reflow(l),P(o).addClass(i),P(l).addClass(i);var u=pe.getTransitionDurationFromElement(o);P(o).one(pe.TRANSITION_END,function(){P(l).removeClass(i+" "+n).addClass(q),P(o).removeClass(q+" "+n+" "+i),r._isSliding=!1,setTimeout(function(){return P(r._element).trigger(h)},0)}).emulateTransitionEnd(u)}else P(o).removeClass(q),P(l).addClass(q),this._isSliding=!1,P(this._element).trigger(h);d&&this.cycle()}},r._jQueryInterface=function(n){return this.each(function(){var e=P(this).data(O),t=l({},F,P(this).data());"object"==typeof n&&(t=l({},t,n));var i="string"==typeof n?n:t.slide;if(e||(e=new r(this,t),P(this).data(O,e)),"number"==typeof n)e.to(n);else if("string"==typeof i){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i]()}else t.interval&&(e.pause(),e.cycle())})},r._dataApiClickHandler=function(e){var t=pe.getSelectorFromElement(this);if(t){var i=P(t)[0];if(i&&P(i).hasClass(V)){var n=l({},P(i).data(),P(this).data()),s=this.getAttribute("data-slide-to");s&&(n.interval=!1),r._jQueryInterface.call(P(i),n),s&&P(i).data(O).to(s),e.preventDefault()}}},o(r,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return F}}]),r}(),P(document).on(U.CLICK_DATA_API,Z.DATA_SLIDE,Q._dataApiClickHandler),P(window).on(U.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(Z.DATA_RIDE)),t=0,i=e.length;t<i;t++){var n=P(e[t]);Q._jQueryInterface.call(n,n.data())}}),P.fn[A]=Q._jQueryInterface,P.fn[A].Constructor=Q,P.fn[A].noConflict=function(){return P.fn[A]=N,Q._jQueryInterface},Q),we=(ee="collapse",ie="."+(te="bs.collapse"),ne=(J=t).fn[ee],se={toggle:!0,parent:""},re={toggle:"boolean",parent:"(string|element)"},oe={SHOW:"show"+ie,SHOWN:"shown"+ie,HIDE:"hide"+ie,HIDDEN:"hidden"+ie,CLICK_DATA_API:"click"+ie+".data-api"},ae="show",le="collapse",ce="collapsing",de="collapsed",he="width",ue="height",fe={ACTIVES:".show, .collapsing",DATA_TOGGLE:'[data-toggle="collapse"]'},me=function(){function a(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=J.makeArray(document.querySelectorAll('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'));for(var i=[].slice.call(document.querySelectorAll(fe.DATA_TOGGLE)),n=0,s=i.length;n<s;n++){var r=i[n],o=pe.getSelectorFromElement(r),a=[].slice.call(document.querySelectorAll(o)).filter(function(e){return e===t});null!==o&&0<a.length&&(this._selector=o,this._triggerArray.push(r))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var e=a.prototype;return e.toggle=function(){J(this._element).hasClass(ae)?this.hide():this.show()},e.show=function(){var e,t,i=this;if(!this._isTransitioning&&!J(this._element).hasClass(ae)&&(this._parent&&0===(e=[].slice.call(this._parent.querySelectorAll(fe.ACTIVES)).filter(function(e){return e.getAttribute("data-parent")===i._config.parent})).length&&(e=null),!(e&&(t=J(e).not(this._selector).data(te))&&t._isTransitioning))){var n=J.Event(oe.SHOW);if(J(this._element).trigger(n),!n.isDefaultPrevented()){e&&(a._jQueryInterface.call(J(e).not(this._selector),"hide"),t||J(e).data(te,null));var s=this._getDimension();J(this._element).removeClass(le).addClass(ce),this._element.style[s]=0,this._triggerArray.length&&J(this._triggerArray).removeClass(de).attr("aria-expanded",!0),this.setTransitioning(!0);var r="scroll"+(s[0].toUpperCase()+s.slice(1)),o=pe.getTransitionDurationFromElement(this._element);J(this._element).one(pe.TRANSITION_END,function(){J(i._element).removeClass(ce).addClass(le).addClass(ae),i._element.style[s]="",i.setTransitioning(!1),J(i._element).trigger(oe.SHOWN)}).emulateTransitionEnd(o),this._element.style[s]=this._element[r]+"px"}}},e.hide=function(){var e=this;if(!this._isTransitioning&&J(this._element).hasClass(ae)){var t=J.Event(oe.HIDE);if(J(this._element).trigger(t),!t.isDefaultPrevented()){var i=this._getDimension();this._element.style[i]=this._element.getBoundingClientRect()[i]+"px",pe.reflow(this._element),J(this._element).addClass(ce).removeClass(le).removeClass(ae);var n=this._triggerArray.length;if(0<n)for(var s=0;s<n;s++){var r=this._triggerArray[s],o=pe.getSelectorFromElement(r);if(null!==o)J([].slice.call(document.querySelectorAll(o))).hasClass(ae)||J(r).addClass(de).attr("aria-expanded",!1)}this.setTransitioning(!0);this._element.style[i]="";var a=pe.getTransitionDurationFromElement(this._element);J(this._element).one(pe.TRANSITION_END,function(){e.setTransitioning(!1),J(e._element).removeClass(ce).addClass(le).trigger(oe.HIDDEN)}).emulateTransitionEnd(a)}}},e.setTransitioning=function(e){this._isTransitioning=e},e.dispose=function(){J.removeData(this._element,te),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},e._getConfig=function(e){return(e=l({},se,e)).toggle=Boolean(e.toggle),pe.typeCheckConfig(ee,e,re),e},e._getDimension=function(){return J(this._element).hasClass(he)?he:ue},e._getParent=function(){var i=this,e=null;pe.isElement(this._config.parent)?(e=this._config.parent,void 0!==this._config.parent.jquery&&(e=this._config.parent[0])):e=document.querySelector(this._config.parent);var t='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',n=[].slice.call(e.querySelectorAll(t));return J(n).each(function(e,t){i._addAriaAndCollapsedClass(a._getTargetFromElement(t),[t])}),e},e._addAriaAndCollapsedClass=function(e,t){if(e){var i=J(e).hasClass(ae);t.length&&J(t).toggleClass(de,!i).attr("aria-expanded",i)}},a._getTargetFromElement=function(e){var t=pe.getSelectorFromElement(e);return t?document.querySelector(t):null},a._jQueryInterface=function(n){return this.each(function(){var e=J(this),t=e.data(te),i=l({},se,e.data(),"object"==typeof n&&n?n:{});if(!t&&i.toggle&&/show|hide/.test(n)&&(i.toggle=!1),t||(t=new a(this,i),e.data(te,t)),"string"==typeof n){if(void 0===t[n])throw new TypeError('No method named "'+n+'"');t[n]()}})},o(a,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return se}}]),a}(),J(document).on(oe.CLICK_DATA_API,fe.DATA_TOGGLE,function(e){"A"===e.currentTarget.tagName&&e.preventDefault();var i=J(this),t=pe.getSelectorFromElement(this),n=[].slice.call(document.querySelectorAll(t));J(n).each(function(){var e=J(this),t=e.data(te)?"toggle":i.data();me._jQueryInterface.call(e,t)})}),J.fn[ee]=me._jQueryInterface,J.fn[ee].Constructor=me,J.fn[ee].noConflict=function(){return J.fn[ee]=ne,me._jQueryInterface},me),be="undefined"!=typeof window&&"undefined"!=typeof document,_e=["Edge","Trident","Firefox"],Se=0,xe=0;xe<_e.length;xe+=1)if(be&&0<=navigator.userAgent.indexOf(_e[xe])){Se=1;break}var De=be&&window.Promise?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},Se))}};function ke(e){return e&&"[object Function]"==={}.toString.call(e)}function Ce(e,t){if(1!==e.nodeType)return[];var i=getComputedStyle(e,null);return t?i[t]:i}function Te(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function Ee(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=Ce(e),i=t.overflow,n=t.overflowX,s=t.overflowY;return/(auto|scroll|overlay)/.test(i+s+n)?e:Ee(Te(e))}var Ie=be&&!(!window.MSInputMethodContext||!document.documentMode),Me=be&&/MSIE 10/.test(navigator.userAgent);function Pe(e){return 11===e?Ie:10===e?Me:Ie||Me}function Ae(e){if(!e)return document.documentElement;for(var t=Pe(10)?document.body:null,i=e.offsetParent;i===t&&e.nextElementSibling;)i=(e=e.nextElementSibling).offsetParent;var n=i&&i.nodeName;return n&&"BODY"!==n&&"HTML"!==n?-1!==["TD","TABLE"].indexOf(i.nodeName)&&"static"===Ce(i,"position")?Ae(i):i:e?e.ownerDocument.documentElement:document.documentElement}function Oe(e){return null!==e.parentNode?Oe(e.parentNode):e}function Ye(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;var i=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,n=i?e:t,s=i?t:e,r=document.createRange();r.setStart(n,0),r.setEnd(s,0);var o,a,l=r.commonAncestorContainer;if(e!==l&&t!==l||n.contains(s))return"BODY"===(a=(o=l).nodeName)||"HTML"!==a&&Ae(o.firstElementChild)!==o?Ae(l):l;var c=Oe(e);return c.host?Ye(c.host,t):Ye(e,Oe(t).host)}function Le(e){var t="top"===(1<arguments.length&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",i=e.nodeName;if("BODY"===i||"HTML"===i){var n=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||n)[t]}return e[t]}function Ne(e,t){var i="x"===t?"Left":"Top",n="Left"===i?"Right":"Bottom";return parseFloat(e["border"+i+"Width"],10)+parseFloat(e["border"+n+"Width"],10)}function Fe(e,t,i,n){return Math.max(t["offset"+e],t["scroll"+e],i["client"+e],i["offset"+e],i["scroll"+e],Pe(10)?i["offset"+e]+n["margin"+("Height"===e?"Top":"Left")]+n["margin"+("Height"===e?"Bottom":"Right")]:0)}function ze(){var e=document.body,t=document.documentElement,i=Pe(10)&&getComputedStyle(t);return{height:Fe("Height",e,t,i),width:Fe("Width",e,t,i)}}var We=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},Re=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}(),He=function(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e},je=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};function Ue(e){return je({},e,{right:e.left+e.width,bottom:e.top+e.height})}function Ve(e){var t={};try{if(Pe(10)){t=e.getBoundingClientRect();var i=Le(e,"top"),n=Le(e,"left");t.top+=i,t.left+=n,t.bottom+=i,t.right+=n}else t=e.getBoundingClientRect()}catch(e){}var s={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},r="HTML"===e.nodeName?ze():{},o=r.width||e.clientWidth||s.right-s.left,a=r.height||e.clientHeight||s.bottom-s.top,l=e.offsetWidth-o,c=e.offsetHeight-a;if(l||c){var d=Ce(e);l-=Ne(d,"x"),c-=Ne(d,"y"),s.width-=l,s.height-=c}return Ue(s)}function qe(e,t){var i=2<arguments.length&&void 0!==arguments[2]&&arguments[2],n=Pe(10),s="HTML"===t.nodeName,r=Ve(e),o=Ve(t),a=Ee(e),l=Ce(t),c=parseFloat(l.borderTopWidth,10),d=parseFloat(l.borderLeftWidth,10);i&&"HTML"===t.nodeName&&(o.top=Math.max(o.top,0),o.left=Math.max(o.left,0));var h=Ue({top:r.top-o.top-c,left:r.left-o.left-d,width:r.width,height:r.height});if(h.marginTop=0,h.marginLeft=0,!n&&s){var u=parseFloat(l.marginTop,10),f=parseFloat(l.marginLeft,10);h.top-=c-u,h.bottom-=c-u,h.left-=d-f,h.right-=d-f,h.marginTop=u,h.marginLeft=f}return(n&&!i?t.contains(a):t===a&&"BODY"!==a.nodeName)&&(h=function(e,t){var i=2<arguments.length&&void 0!==arguments[2]&&arguments[2],n=Le(t,"top"),s=Le(t,"left"),r=i?-1:1;return e.top+=n*r,e.bottom+=n*r,e.left+=s*r,e.right+=s*r,e}(h,t)),h}function Be(e){if(!e||!e.parentElement||Pe())return document.documentElement;for(var t=e.parentElement;t&&"none"===Ce(t,"transform");)t=t.parentElement;return t||document.documentElement}function $e(e,t,i,n){var s=4<arguments.length&&void 0!==arguments[4]&&arguments[4],r={top:0,left:0},o=s?Be(e):Ye(e,t);if("viewport"===n)r=function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],i=e.ownerDocument.documentElement,n=qe(e,i),s=Math.max(i.clientWidth,window.innerWidth||0),r=Math.max(i.clientHeight,window.innerHeight||0),o=t?0:Le(i),a=t?0:Le(i,"left");return Ue({top:o-n.top+n.marginTop,left:a-n.left+n.marginLeft,width:s,height:r})}(o,s);else{var a=void 0;"scrollParent"===n?"BODY"===(a=Ee(Te(t))).nodeName&&(a=e.ownerDocument.documentElement):a="window"===n?e.ownerDocument.documentElement:n;var l=qe(a,o,s);if("HTML"!==a.nodeName||function e(t){var i=t.nodeName;return"BODY"!==i&&"HTML"!==i&&("fixed"===Ce(t,"position")||e(Te(t)))}(o))r=l;else{var c=ze(),d=c.height,h=c.width;r.top+=l.top-l.marginTop,r.bottom=d+l.top,r.left+=l.left-l.marginLeft,r.right=h+l.left}}return r.left+=i,r.top+=i,r.right-=i,r.bottom-=i,r}function Ge(e,t,n,i,s){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var o=$e(n,i,r,s),a={top:{width:o.width,height:t.top-o.top},right:{width:o.right-t.right,height:o.height},bottom:{width:o.width,height:o.bottom-t.bottom},left:{width:t.left-o.left,height:o.height}},l=Object.keys(a).map(function(e){return je({key:e},a[e],{area:(t=a[e],t.width*t.height)});var t}).sort(function(e,t){return t.area-e.area}),c=l.filter(function(e){var t=e.width,i=e.height;return t>=n.clientWidth&&i>=n.clientHeight}),d=0<c.length?c[0].key:l[0].key,h=e.split("-")[1];return d+(h?"-"+h:"")}function Xe(e,t,i){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return qe(i,n?Be(t):Ye(t,i),n)}function Ke(e){var t=getComputedStyle(e),i=parseFloat(t.marginTop)+parseFloat(t.marginBottom),n=parseFloat(t.marginLeft)+parseFloat(t.marginRight);return{width:e.offsetWidth+n,height:e.offsetHeight+i}}function Ze(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function Qe(e,t,i){i=i.split("-")[0];var n=Ke(e),s={width:n.width,height:n.height},r=-1!==["right","left"].indexOf(i),o=r?"top":"left",a=r?"left":"top",l=r?"height":"width",c=r?"width":"height";return s[o]=t[o]+t[l]/2-n[l]/2,s[a]=i===a?t[a]-n[c]:t[Ze(a)],s}function Je(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function et(e,i,t){return(void 0===t?e:e.slice(0,function(e,t,i){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===i});var n=Je(e,function(e){return e[t]===i});return e.indexOf(n)}(e,"name",t))).forEach(function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var t=e.function||e.fn;e.enabled&&ke(t)&&(i.offsets.popper=Ue(i.offsets.popper),i.offsets.reference=Ue(i.offsets.reference),i=t(i,e))}),i}function tt(e,i){return e.some(function(e){var t=e.name;return e.enabled&&t===i})}function it(e){for(var t=[!1,"ms","Webkit","Moz","O"],i=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length;n++){var s=t[n],r=s?""+s+i:e;if(void 0!==document.body.style[r])return r}return null}function nt(e){var t=e.ownerDocument;return t?t.defaultView:window}function st(e,t,i,n){i.updateBound=n,nt(e).addEventListener("resize",i.updateBound,{passive:!0});var s=Ee(e);return function e(t,i,n,s){var r="BODY"===t.nodeName,o=r?t.ownerDocument.defaultView:t;o.addEventListener(i,n,{passive:!0}),r||e(Ee(o.parentNode),i,n,s),s.push(o)}(s,"scroll",i.updateBound,i.scrollParents),i.scrollElement=s,i.eventsEnabled=!0,i}function rt(){var e,t;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(e=this.reference,t=this.state,nt(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t))}function ot(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function at(i,n){Object.keys(n).forEach(function(e){var t="";-1!==["width","height","top","right","bottom","left"].indexOf(e)&&ot(n[e])&&(t="px"),i.style[e]=n[e]+t})}function lt(e,t,i){var n=Je(e,function(e){return e.name===t}),s=!!n&&e.some(function(e){return e.name===i&&e.enabled&&e.order<n.order});if(!s){var r="`"+t+"`",o="`"+i+"`";console.warn(o+" modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")}return s}var ct=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],dt=ct.slice(3);function ht(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],i=dt.indexOf(e),n=dt.slice(i+1).concat(dt.slice(0,i));return t?n.reverse():n}var ut={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"};function ft(e,s,r,t){var o=[0,0],a=-1!==["right","left"].indexOf(t),i=e.split(/(\+|\-)/).map(function(e){return e.trim()}),n=i.indexOf(Je(i,function(e){return-1!==e.search(/,|\s/)}));i[n]&&-1===i[n].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,c=-1!==n?[i.slice(0,n).concat([i[n].split(l)[0]]),[i[n].split(l)[1]].concat(i.slice(n+1))]:[i];return(c=c.map(function(e,t){var i=(1===t?!a:a)?"height":"width",n=!1;return e.reduce(function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,n=!0,e):n?(e[e.length-1]+=t,n=!1,e):e.concat(t)},[]).map(function(e){return function(e,t,i,n){var s=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+s[1],o=s[2];if(!r)return e;if(0===o.indexOf("%")){var a=void 0;switch(o){case"%p":a=i;break;case"%":case"%r":default:a=n}return Ue(a)[t]/100*r}if("vh"===o||"vw"===o)return("vh"===o?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*r;return r}(e,i,s,r)})})).forEach(function(i,n){i.forEach(function(e,t){ot(e)&&(o[n]+=e*("-"===i[t-1]?-1:1))})}),o}var mt={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,i=t.split("-")[0],n=t.split("-")[1];if(n){var s=e.offsets,r=s.reference,o=s.popper,a=-1!==["bottom","top"].indexOf(i),l=a?"left":"top",c=a?"width":"height",d={start:He({},l,r[l]),end:He({},l,r[l]+r[c]-o[c])};e.offsets.popper=je({},o,d[n])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var i=t.offset,n=e.placement,s=e.offsets,r=s.popper,o=s.reference,a=n.split("-")[0],l=void 0;return l=ot(+i)?[+i,0]:ft(i,r,o,a),"left"===a?(r.top+=l[0],r.left-=l[1]):"right"===a?(r.top+=l[0],r.left+=l[1]):"top"===a?(r.left+=l[0],r.top-=l[1]):"bottom"===a&&(r.left+=l[0],r.top+=l[1]),e.popper=r,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,n){var t=n.boundariesElement||Ae(e.instance.popper);e.instance.reference===t&&(t=Ae(t));var i=it("transform"),s=e.instance.popper.style,r=s.top,o=s.left,a=s[i];s.top="",s.left="",s[i]="";var l=$e(e.instance.popper,e.instance.reference,n.padding,t,e.positionFixed);s.top=r,s.left=o,s[i]=a,n.boundaries=l;var c=n.priority,d=e.offsets.popper,h={primary:function(e){var t=d[e];return d[e]<l[e]&&!n.escapeWithReference&&(t=Math.max(d[e],l[e])),He({},e,t)},secondary:function(e){var t="right"===e?"left":"top",i=d[t];return d[e]>l[e]&&!n.escapeWithReference&&(i=Math.min(d[t],l[e]-("right"===e?d.width:d.height))),He({},t,i)}};return c.forEach(function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";d=je({},d,h[t](e))}),e.offsets.popper=d,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,i=t.popper,n=t.reference,s=e.placement.split("-")[0],r=Math.floor,o=-1!==["top","bottom"].indexOf(s),a=o?"right":"bottom",l=o?"left":"top",c=o?"width":"height";return i[a]<r(n[l])&&(e.offsets.popper[l]=r(n[l])-i[c]),i[l]>r(n[a])&&(e.offsets.popper[l]=r(n[a])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){var i;if(!lt(e.instance.modifiers,"arrow","keepTogether"))return e;var n=t.element;if("string"==typeof n){if(!(n=e.instance.popper.querySelector(n)))return e}else if(!e.instance.popper.contains(n))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var s=e.placement.split("-")[0],r=e.offsets,o=r.popper,a=r.reference,l=-1!==["left","right"].indexOf(s),c=l?"height":"width",d=l?"Top":"Left",h=d.toLowerCase(),u=l?"left":"top",f=l?"bottom":"right",m=Ke(n)[c];a[f]-m<o[h]&&(e.offsets.popper[h]-=o[h]-(a[f]-m)),a[h]+m>o[f]&&(e.offsets.popper[h]+=a[h]+m-o[f]),e.offsets.popper=Ue(e.offsets.popper);var p=a[h]+a[c]/2-m/2,g=Ce(e.instance.popper),v=parseFloat(g["margin"+d],10),y=parseFloat(g["border"+d+"Width"],10),w=p-e.offsets.popper[h]-v-y;return w=Math.max(Math.min(o[c]-m,w),0),e.arrowElement=n,e.offsets.arrow=(He(i={},h,Math.round(w)),He(i,u,""),i),e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(m,p){if(tt(m.instance.modifiers,"inner"))return m;if(m.flipped&&m.placement===m.originalPlacement)return m;var g=$e(m.instance.popper,m.instance.reference,p.padding,p.boundariesElement,m.positionFixed),v=m.placement.split("-")[0],y=Ze(v),w=m.placement.split("-")[1]||"",b=[];switch(p.behavior){case ut.FLIP:b=[v,y];break;case ut.CLOCKWISE:b=ht(v);break;case ut.COUNTERCLOCKWISE:b=ht(v,!0);break;default:b=p.behavior}return b.forEach(function(e,t){if(v!==e||b.length===t+1)return m;v=m.placement.split("-")[0],y=Ze(v);var i,n=m.offsets.popper,s=m.offsets.reference,r=Math.floor,o="left"===v&&r(n.right)>r(s.left)||"right"===v&&r(n.left)<r(s.right)||"top"===v&&r(n.bottom)>r(s.top)||"bottom"===v&&r(n.top)<r(s.bottom),a=r(n.left)<r(g.left),l=r(n.right)>r(g.right),c=r(n.top)<r(g.top),d=r(n.bottom)>r(g.bottom),h="left"===v&&a||"right"===v&&l||"top"===v&&c||"bottom"===v&&d,u=-1!==["top","bottom"].indexOf(v),f=!!p.flipVariations&&(u&&"start"===w&&a||u&&"end"===w&&l||!u&&"start"===w&&c||!u&&"end"===w&&d);(o||h||f)&&(m.flipped=!0,(o||h)&&(v=b[t+1]),f&&(w="end"===(i=w)?"start":"start"===i?"end":i),m.placement=v+(w?"-"+w:""),m.offsets.popper=je({},m.offsets.popper,Qe(m.instance.popper,m.offsets.reference,m.placement)),m=et(m.instance.modifiers,m,"flip"))}),m},behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,i=t.split("-")[0],n=e.offsets,s=n.popper,r=n.reference,o=-1!==["left","right"].indexOf(i),a=-1===["top","left"].indexOf(i);return s[o?"left":"top"]=r[i]-(a?s[o?"width":"height"]:0),e.placement=Ze(t),e.offsets.popper=Ue(s),e}},hide:{order:800,enabled:!0,fn:function(e){if(!lt(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,i=Je(e.instance.modifiers,function(e){return"preventOverflow"===e.name}).boundaries;if(t.bottom<i.top||t.left>i.right||t.top>i.bottom||t.right<i.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var i=t.x,n=t.y,s=e.offsets.popper,r=Je(e.instance.modifiers,function(e){return"applyStyle"===e.name}).gpuAcceleration;void 0!==r&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var o=void 0!==r?r:t.gpuAcceleration,a=Ve(Ae(e.instance.popper)),l={position:s.position},c={left:Math.floor(s.left),top:Math.round(s.top),bottom:Math.round(s.bottom),right:Math.floor(s.right)},d="bottom"===i?"top":"bottom",h="right"===n?"left":"right",u=it("transform"),f=void 0,m=void 0;if(m="bottom"===d?-a.height+c.bottom:c.top,f="right"===h?-a.width+c.right:c.left,o&&u)l[u]="translate3d("+f+"px, "+m+"px, 0)",l[d]=0,l[h]=0,l.willChange="transform";else{var p="bottom"===d?-1:1,g="right"===h?-1:1;l[d]=m*p,l[h]=f*g,l.willChange=d+", "+h}var v={"x-placement":e.placement};return e.attributes=je({},v,e.attributes),e.styles=je({},l,e.styles),e.arrowStyles=je({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){var t,i;return at(e.instance.popper,e.styles),t=e.instance.popper,i=e.attributes,Object.keys(i).forEach(function(e){!1!==i[e]?t.setAttribute(e,i[e]):t.removeAttribute(e)}),e.arrowElement&&Object.keys(e.arrowStyles).length&&at(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,i,n,s){var r=Xe(s,t,e,i.positionFixed),o=Ge(i.placement,r,t,e,i.modifiers.flip.boundariesElement,i.modifiers.flip.padding);return t.setAttribute("x-placement",o),at(t,{position:i.positionFixed?"fixed":"absolute"}),i},gpuAcceleration:void 0}}},pt=function(){function r(e,t){var i=this,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};We(this,r),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=De(this.update.bind(this)),this.options=je({},r.Defaults,n),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=t&&t.jquery?t[0]:t,this.options.modifiers={},Object.keys(je({},r.Defaults.modifiers,n.modifiers)).forEach(function(e){i.options.modifiers[e]=je({},r.Defaults.modifiers[e]||{},n.modifiers?n.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return je({name:e},i.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(e){e.enabled&&ke(e.onLoad)&&e.onLoad(i.reference,i.popper,i.options,e,i.state)}),this.update();var s=this.options.eventsEnabled;s&&this.enableEventListeners(),this.state.eventsEnabled=s}return Re(r,[{key:"update",value:function(){return function(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=Xe(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=Ge(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=Qe(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=et(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}.call(this)}},{key:"destroy",value:function(){return function(){return this.state.isDestroyed=!0,tt(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[it("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}.call(this)}},{key:"enableEventListeners",value:function(){return function(){this.state.eventsEnabled||(this.state=st(this.reference,this.options,this.state,this.scheduleUpdate))}.call(this)}},{key:"disableEventListeners",value:function(){return rt.call(this)}}]),r}();pt.Utils=("undefined"!=typeof window?window:global).PopperUtils,pt.placements=ct,pt.Defaults=mt;var gt,vt,yt,wt,bt,_t,St,xt,Dt,kt,Ct,Tt,Et,It,Mt,Pt,At,Ot,Yt,Lt,Nt,Ft,zt,Wt,Rt,Ht,jt,Ut,Vt,qt,Bt,$t,Gt,Xt,Kt,Zt,Qt,Jt,ei,ti,ii,ni,si,ri,oi,ai,li,ci,di,hi,ui,fi,mi,pi,gi,vi,yi,wi,bi,_i,Si,xi,Di,ki,Ci,Ti,Ei,Ii,Mi,Pi,Ai,Oi,Yi,Li,Ni,Fi,zi,Wi,Ri,Hi,ji,Ui,Vi,qi,Bi,$i,Gi,Xi,Ki,Zi,Qi,Ji,en,tn,nn,sn,rn,on,an,ln,cn,dn,hn,un,fn,mn,pn,gn,vn,yn,wn,bn,_n,Sn=(vt="dropdown",wt="."+(yt="bs.dropdown"),bt=".data-api",_t=(gt=t).fn[vt],St=new RegExp("38|40|27"),xt={HIDE:"hide"+wt,HIDDEN:"hidden"+wt,SHOW:"show"+wt,SHOWN:"shown"+wt,CLICK:"click"+wt,CLICK_DATA_API:"click"+wt+bt,KEYDOWN_DATA_API:"keydown"+wt+bt,KEYUP_DATA_API:"keyup"+wt+bt},Dt="disabled",kt="show",Ct="dropup",Tt="dropright",Et="dropleft",It="dropdown-menu-right",Mt="position-static",Pt='[data-toggle="dropdown"]',At=".dropdown form",Ot=".dropdown-menu",Yt=".navbar-nav",Lt=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Nt="top-start",Ft="top-end",zt="bottom-start",Wt="bottom-end",Rt="right-start",Ht="left-start",jt={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic"},Ut={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string"},Vt=function(){function c(e,t){this._element=e,this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var e=c.prototype;return e.toggle=function(){if(!this._element.disabled&&!gt(this._element).hasClass(Dt)){var e=c._getParentFromElement(this._element),t=gt(this._menu).hasClass(kt);if(c._clearMenus(),!t){var i={relatedTarget:this._element},n=gt.Event(xt.SHOW,i);if(gt(e).trigger(n),!n.isDefaultPrevented()){if(!this._inNavbar){if(void 0===pt)throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");var s=this._element;"parent"===this._config.reference?s=e:pe.isElement(this._config.reference)&&(s=this._config.reference,void 0!==this._config.reference.jquery&&(s=this._config.reference[0])),"scrollParent"!==this._config.boundary&&gt(e).addClass(Mt),this._popper=new pt(s,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===gt(e).closest(Yt).length&&gt(document.body).children().on("mouseover",null,gt.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),gt(this._menu).toggleClass(kt),gt(e).toggleClass(kt).trigger(gt.Event(xt.SHOWN,i))}}}},e.dispose=function(){gt.removeData(this._element,yt),gt(this._element).off(wt),this._element=null,(this._menu=null)!==this._popper&&(this._popper.destroy(),this._popper=null)},e.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},e._addEventListeners=function(){var t=this;gt(this._element).on(xt.CLICK,function(e){e.preventDefault(),e.stopPropagation(),t.toggle()})},e._getConfig=function(e){return e=l({},this.constructor.Default,gt(this._element).data(),e),pe.typeCheckConfig(vt,e,this.constructor.DefaultType),e},e._getMenuElement=function(){if(!this._menu){var e=c._getParentFromElement(this._element);e&&(this._menu=e.querySelector(Ot))}return this._menu},e._getPlacement=function(){var e=gt(this._element.parentNode),t=zt;return e.hasClass(Ct)?(t=Nt,gt(this._menu).hasClass(It)&&(t=Ft)):e.hasClass(Tt)?t=Rt:e.hasClass(Et)?t=Ht:gt(this._menu).hasClass(It)&&(t=Wt),t},e._detectNavbar=function(){return 0<gt(this._element).closest(".navbar").length},e._getPopperConfig=function(){var t=this,e={};"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=l({},e.offsets,t._config.offset(e.offsets)||{}),e}:e.offset=this._config.offset;var i={placement:this._getPlacement(),modifiers:{offset:e,flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(i.modifiers.applyStyle={enabled:!1}),i},c._jQueryInterface=function(t){return this.each(function(){var e=gt(this).data(yt);if(e||(e=new c(this,"object"==typeof t?t:null),gt(this).data(yt,e)),"string"==typeof t){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t]()}})},c._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var t=[].slice.call(document.querySelectorAll(Pt)),i=0,n=t.length;i<n;i++){var s=c._getParentFromElement(t[i]),r=gt(t[i]).data(yt),o={relatedTarget:t[i]};if(e&&"click"===e.type&&(o.clickEvent=e),r){var a=r._menu;if(gt(s).hasClass(kt)&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&gt.contains(s,e.target))){var l=gt.Event(xt.HIDE,o);gt(s).trigger(l),l.isDefaultPrevented()||("ontouchstart"in document.documentElement&&gt(document.body).children().off("mouseover",null,gt.noop),t[i].setAttribute("aria-expanded","false"),gt(a).removeClass(kt),gt(s).removeClass(kt).trigger(gt.Event(xt.HIDDEN,o)))}}}},c._getParentFromElement=function(e){var t,i=pe.getSelectorFromElement(e);return i&&(t=document.querySelector(i)),t||e.parentNode},c._dataApiKeydownHandler=function(e){if((/input|textarea/i.test(e.target.tagName)?!(32===e.which||27!==e.which&&(40!==e.which&&38!==e.which||gt(e.target).closest(Ot).length)):St.test(e.which))&&(e.preventDefault(),e.stopPropagation(),!this.disabled&&!gt(this).hasClass(Dt))){var t=c._getParentFromElement(this),i=gt(t).hasClass(kt);if((i||27===e.which&&32===e.which)&&(!i||27!==e.which&&32!==e.which)){var n=[].slice.call(t.querySelectorAll(Lt));if(0!==n.length){var s=n.indexOf(e.target);38===e.which&&0<s&&s--,40===e.which&&s<n.length-1&&s++,s<0&&(s=0),n[s].focus()}}else{if(27===e.which){var r=t.querySelector(Pt);gt(r).trigger("focus")}gt(this).trigger("click")}}},o(c,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return jt}},{key:"DefaultType",get:function(){return Ut}}]),c}(),gt(document).on(xt.KEYDOWN_DATA_API,Pt,Vt._dataApiKeydownHandler).on(xt.KEYDOWN_DATA_API,Ot,Vt._dataApiKeydownHandler).on(xt.CLICK_DATA_API+" "+xt.KEYUP_DATA_API,Vt._clearMenus).on(xt.CLICK_DATA_API,Pt,function(e){e.preventDefault(),e.stopPropagation(),Vt._jQueryInterface.call(gt(this),"toggle")}).on(xt.CLICK_DATA_API,At,function(e){e.stopPropagation()}),gt.fn[vt]=Vt._jQueryInterface,gt.fn[vt].Constructor=Vt,gt.fn[vt].noConflict=function(){return gt.fn[vt]=_t,Vt._jQueryInterface},Vt),xn=(Bt="modal",Gt="."+($t="bs.modal"),Xt=(qt=t).fn[Bt],Kt={backdrop:!0,keyboard:!0,focus:!0,show:!0},Zt={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},Qt={HIDE:"hide"+Gt,HIDDEN:"hidden"+Gt,SHOW:"show"+Gt,SHOWN:"shown"+Gt,FOCUSIN:"focusin"+Gt,RESIZE:"resize"+Gt,CLICK_DISMISS:"click.dismiss"+Gt,KEYDOWN_DISMISS:"keydown.dismiss"+Gt,MOUSEUP_DISMISS:"mouseup.dismiss"+Gt,MOUSEDOWN_DISMISS:"mousedown.dismiss"+Gt,CLICK_DATA_API:"click"+Gt+".data-api"},Jt="modal-scrollbar-measure",ei="modal-backdrop",ti="modal-open",ii="fade",ni="show",si={DIALOG:".modal-dialog",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top"},ri=function(){function s(e,t){this._config=this._getConfig(t),this._element=e,this._dialog=e.querySelector(si.DIALOG),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._scrollbarWidth=0}var e=s.prototype;return e.toggle=function(e){return this._isShown?this.hide():this.show(e)},e.show=function(e){var t=this;if(!this._isTransitioning&&!this._isShown){qt(this._element).hasClass(ii)&&(this._isTransitioning=!0);var i=qt.Event(Qt.SHOW,{relatedTarget:e});qt(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),qt(document.body).addClass(ti),this._setEscapeEvent(),this._setResizeEvent(),qt(this._element).on(Qt.CLICK_DISMISS,si.DATA_DISMISS,function(e){return t.hide(e)}),qt(this._dialog).on(Qt.MOUSEDOWN_DISMISS,function(){qt(t._element).one(Qt.MOUSEUP_DISMISS,function(e){qt(e.target).is(t._element)&&(t._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return t._showElement(e)}))}},e.hide=function(e){var t=this;if(e&&e.preventDefault(),!this._isTransitioning&&this._isShown){var i=qt.Event(Qt.HIDE);if(qt(this._element).trigger(i),this._isShown&&!i.isDefaultPrevented()){this._isShown=!1;var n=qt(this._element).hasClass(ii);if(n&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),qt(document).off(Qt.FOCUSIN),qt(this._element).removeClass(ni),qt(this._element).off(Qt.CLICK_DISMISS),qt(this._dialog).off(Qt.MOUSEDOWN_DISMISS),n){var s=pe.getTransitionDurationFromElement(this._element);qt(this._element).one(pe.TRANSITION_END,function(e){return t._hideModal(e)}).emulateTransitionEnd(s)}else this._hideModal()}}},e.dispose=function(){qt.removeData(this._element,$t),qt(window,document,this._element,this._backdrop).off(Gt),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null},e.handleUpdate=function(){this._adjustDialog()},e._getConfig=function(e){return e=l({},Kt,e),pe.typeCheckConfig(Bt,e,Zt),e},e._showElement=function(e){var t=this,i=qt(this._element).hasClass(ii);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,i&&pe.reflow(this._element),qt(this._element).addClass(ni),this._config.focus&&this._enforceFocus();var n=qt.Event(Qt.SHOWN,{relatedTarget:e}),s=function(){t._config.focus&&t._element.focus(),t._isTransitioning=!1,qt(t._element).trigger(n)};if(i){var r=pe.getTransitionDurationFromElement(this._element);qt(this._dialog).one(pe.TRANSITION_END,s).emulateTransitionEnd(r)}else s()},e._enforceFocus=function(){var t=this;qt(document).off(Qt.FOCUSIN).on(Qt.FOCUSIN,function(e){document!==e.target&&t._element!==e.target&&0===qt(t._element).has(e.target).length&&t._element.focus()})},e._setEscapeEvent=function(){var t=this;this._isShown&&this._config.keyboard?qt(this._element).on(Qt.KEYDOWN_DISMISS,function(e){27===e.which&&(e.preventDefault(),t.hide())}):this._isShown||qt(this._element).off(Qt.KEYDOWN_DISMISS)},e._setResizeEvent=function(){var t=this;this._isShown?qt(window).on(Qt.RESIZE,function(e){return t.handleUpdate(e)}):qt(window).off(Qt.RESIZE)},e._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._isTransitioning=!1,this._showBackdrop(function(){qt(document.body).removeClass(ti),e._resetAdjustments(),e._resetScrollbar(),qt(e._element).trigger(Qt.HIDDEN)})},e._removeBackdrop=function(){this._backdrop&&(qt(this._backdrop).remove(),this._backdrop=null)},e._showBackdrop=function(e){var t=this,i=qt(this._element).hasClass(ii)?ii:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className=ei,i&&this._backdrop.classList.add(i),qt(this._backdrop).appendTo(document.body),qt(this._element).on(Qt.CLICK_DISMISS,function(e){t._ignoreBackdropClick?t._ignoreBackdropClick=!1:e.target===e.currentTarget&&("static"===t._config.backdrop?t._element.focus():t.hide())}),i&&pe.reflow(this._backdrop),qt(this._backdrop).addClass(ni),!e)return;if(!i)return void e();var n=pe.getTransitionDurationFromElement(this._backdrop);qt(this._backdrop).one(pe.TRANSITION_END,e).emulateTransitionEnd(n)}else if(!this._isShown&&this._backdrop){qt(this._backdrop).removeClass(ni);var s=function(){t._removeBackdrop(),e&&e()};if(qt(this._element).hasClass(ii)){var r=pe.getTransitionDurationFromElement(this._backdrop);qt(this._backdrop).one(pe.TRANSITION_END,s).emulateTransitionEnd(r)}else s()}else e&&e()},e._adjustDialog=function(){var e=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&e&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!e&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},e._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},e._checkScrollbar=function(){var e=document.body.getBoundingClientRect();this._isBodyOverflowing=e.left+e.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},e._setScrollbar=function(){var s=this;if(this._isBodyOverflowing){var e=[].slice.call(document.querySelectorAll(si.FIXED_CONTENT)),t=[].slice.call(document.querySelectorAll(si.STICKY_CONTENT));qt(e).each(function(e,t){var i=t.style.paddingRight,n=qt(t).css("padding-right");qt(t).data("padding-right",i).css("padding-right",parseFloat(n)+s._scrollbarWidth+"px")}),qt(t).each(function(e,t){var i=t.style.marginRight,n=qt(t).css("margin-right");qt(t).data("margin-right",i).css("margin-right",parseFloat(n)-s._scrollbarWidth+"px")});var i=document.body.style.paddingRight,n=qt(document.body).css("padding-right");qt(document.body).data("padding-right",i).css("padding-right",parseFloat(n)+this._scrollbarWidth+"px")}},e._resetScrollbar=function(){var e=[].slice.call(document.querySelectorAll(si.FIXED_CONTENT));qt(e).each(function(e,t){var i=qt(t).data("padding-right");qt(t).removeData("padding-right"),t.style.paddingRight=i||""});var t=[].slice.call(document.querySelectorAll(""+si.STICKY_CONTENT));qt(t).each(function(e,t){var i=qt(t).data("margin-right");void 0!==i&&qt(t).css("margin-right",i).removeData("margin-right")});var i=qt(document.body).data("padding-right");qt(document.body).removeData("padding-right"),document.body.style.paddingRight=i||""},e._getScrollbarWidth=function(){var e=document.createElement("div");e.className=Jt,document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t},s._jQueryInterface=function(i,n){return this.each(function(){var e=qt(this).data($t),t=l({},Kt,qt(this).data(),"object"==typeof i&&i?i:{});if(e||(e=new s(this,t),qt(this).data($t,e)),"string"==typeof i){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i](n)}else t.show&&e.show(n)})},o(s,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return Kt}}]),s}(),qt(document).on(Qt.CLICK_DATA_API,si.DATA_TOGGLE,function(e){var t,i=this,n=pe.getSelectorFromElement(this);n&&(t=document.querySelector(n));var s=qt(t).data($t)?"toggle":l({},qt(t).data(),qt(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var r=qt(t).one(Qt.SHOW,function(e){e.isDefaultPrevented()||r.one(Qt.HIDDEN,function(){qt(i).is(":visible")&&i.focus()})});ri._jQueryInterface.call(qt(t),s,this)}),qt.fn[Bt]=ri._jQueryInterface,qt.fn[Bt].Constructor=ri,qt.fn[Bt].noConflict=function(){return qt.fn[Bt]=Xt,ri._jQueryInterface},ri),Dn=(ai="tooltip",ci="."+(li="bs.tooltip"),di=(oi=t).fn[ai],hi="bs-tooltip",ui=new RegExp("(^|\\s)"+hi+"\\S+","g"),fi={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)"},mi={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},pi={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent"},vi="out",yi={HIDE:"hide"+ci,HIDDEN:"hidden"+ci,SHOW:(gi="show")+ci,SHOWN:"shown"+ci,INSERTED:"inserted"+ci,CLICK:"click"+ci,FOCUSIN:"focusin"+ci,FOCUSOUT:"focusout"+ci,MOUSEENTER:"mouseenter"+ci,MOUSELEAVE:"mouseleave"+ci},wi="fade",bi="show",_i=".tooltip-inner",Si=".arrow",xi="hover",Di="focus",ki="click",Ci="manual",Ti=function(){function n(e,t){if(void 0===pt)throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=e,this.config=this._getConfig(t),this.tip=null,this._setListeners()}var e=n.prototype;return e.enable=function(){this._isEnabled=!0},e.disable=function(){this._isEnabled=!1},e.toggleEnabled=function(){this._isEnabled=!this._isEnabled},e.toggle=function(e){if(this._isEnabled)if(e){var t=this.constructor.DATA_KEY,i=oi(e.currentTarget).data(t);i||(i=new this.constructor(e.currentTarget,this._getDelegateConfig()),oi(e.currentTarget).data(t,i)),i._activeTrigger.click=!i._activeTrigger.click,i._isWithActiveTrigger()?i._enter(null,i):i._leave(null,i)}else{if(oi(this.getTipElement()).hasClass(bi))return void this._leave(null,this);this._enter(null,this)}},e.dispose=function(){clearTimeout(this._timeout),oi.removeData(this.element,this.constructor.DATA_KEY),oi(this.element).off(this.constructor.EVENT_KEY),oi(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&oi(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,(this._activeTrigger=null)!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},e.show=function(){var t=this;if("none"===oi(this.element).css("display"))throw new Error("Please use show on visible elements");var e=oi.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){oi(this.element).trigger(e);var i=oi.contains(this.element.ownerDocument.documentElement,this.element);if(e.isDefaultPrevented()||!i)return;var n=this.getTipElement(),s=pe.getUID(this.constructor.NAME);n.setAttribute("id",s),this.element.setAttribute("aria-describedby",s),this.setContent(),this.config.animation&&oi(n).addClass(wi);var r="function"==typeof this.config.placement?this.config.placement.call(this,n,this.element):this.config.placement,o=this._getAttachment(r);this.addAttachmentClass(o);var a=!1===this.config.container?document.body:oi(document).find(this.config.container);oi(n).data(this.constructor.DATA_KEY,this),oi.contains(this.element.ownerDocument.documentElement,this.tip)||oi(n).appendTo(a),oi(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new pt(this.element,n,{placement:o,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:Si},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(e){e.originalPlacement!==e.placement&&t._handlePopperPlacementChange(e)},onUpdate:function(e){t._handlePopperPlacementChange(e)}}),oi(n).addClass(bi),"ontouchstart"in document.documentElement&&oi(document.body).children().on("mouseover",null,oi.noop);var l=function(){t.config.animation&&t._fixTransition();var e=t._hoverState;t._hoverState=null,oi(t.element).trigger(t.constructor.Event.SHOWN),e===vi&&t._leave(null,t)};if(oi(this.tip).hasClass(wi)){var c=pe.getTransitionDurationFromElement(this.tip);oi(this.tip).one(pe.TRANSITION_END,l).emulateTransitionEnd(c)}else l()}},e.hide=function(e){var t=this,i=this.getTipElement(),n=oi.Event(this.constructor.Event.HIDE),s=function(){t._hoverState!==gi&&i.parentNode&&i.parentNode.removeChild(i),t._cleanTipClass(),t.element.removeAttribute("aria-describedby"),oi(t.element).trigger(t.constructor.Event.HIDDEN),null!==t._popper&&t._popper.destroy(),e&&e()};if(oi(this.element).trigger(n),!n.isDefaultPrevented()){if(oi(i).removeClass(bi),"ontouchstart"in document.documentElement&&oi(document.body).children().off("mouseover",null,oi.noop),this._activeTrigger[ki]=!1,this._activeTrigger[Di]=!1,this._activeTrigger[xi]=!1,oi(this.tip).hasClass(wi)){var r=pe.getTransitionDurationFromElement(i);oi(i).one(pe.TRANSITION_END,s).emulateTransitionEnd(r)}else s();this._hoverState=""}},e.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},e.isWithContent=function(){return Boolean(this.getTitle())},e.addAttachmentClass=function(e){oi(this.getTipElement()).addClass(hi+"-"+e)},e.getTipElement=function(){return this.tip=this.tip||oi(this.config.template)[0],this.tip},e.setContent=function(){var e=this.getTipElement();this.setElementContent(oi(e.querySelectorAll(_i)),this.getTitle()),oi(e).removeClass(wi+" "+bi)},e.setElementContent=function(e,t){var i=this.config.html;"object"==typeof t&&(t.nodeType||t.jquery)?i?oi(t).parent().is(e)||e.empty().append(t):e.text(oi(t).text()):e[i?"html":"text"](t)},e.getTitle=function(){var e=this.element.getAttribute("data-original-title");return e||(e="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),e},e._getAttachment=function(e){return mi[e.toUpperCase()]},e._setListeners=function(){var n=this;this.config.trigger.split(" ").forEach(function(e){if("click"===e)oi(n.element).on(n.constructor.Event.CLICK,n.config.selector,function(e){return n.toggle(e)});else if(e!==Ci){var t=e===xi?n.constructor.Event.MOUSEENTER:n.constructor.Event.FOCUSIN,i=e===xi?n.constructor.Event.MOUSELEAVE:n.constructor.Event.FOCUSOUT;oi(n.element).on(t,n.config.selector,function(e){return n._enter(e)}).on(i,n.config.selector,function(e){return n._leave(e)})}oi(n.element).closest(".modal").on("hide.bs.modal",function(){return n.hide()})}),this.config.selector?this.config=l({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},e._fixTitle=function(){var e=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==e)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},e._enter=function(e,t){var i=this.constructor.DATA_KEY;(t=t||oi(e.currentTarget).data(i))||(t=new this.constructor(e.currentTarget,this._getDelegateConfig()),oi(e.currentTarget).data(i,t)),e&&(t._activeTrigger["focusin"===e.type?Di:xi]=!0),oi(t.getTipElement()).hasClass(bi)||t._hoverState===gi?t._hoverState=gi:(clearTimeout(t._timeout),t._hoverState=gi,t.config.delay&&t.config.delay.show?t._timeout=setTimeout(function(){t._hoverState===gi&&t.show()},t.config.delay.show):t.show())},e._leave=function(e,t){var i=this.constructor.DATA_KEY;(t=t||oi(e.currentTarget).data(i))||(t=new this.constructor(e.currentTarget,this._getDelegateConfig()),oi(e.currentTarget).data(i,t)),e&&(t._activeTrigger["focusout"===e.type?Di:xi]=!1),t._isWithActiveTrigger()||(clearTimeout(t._timeout),t._hoverState=vi,t.config.delay&&t.config.delay.hide?t._timeout=setTimeout(function(){t._hoverState===vi&&t.hide()},t.config.delay.hide):t.hide())},e._isWithActiveTrigger=function(){for(var e in this._activeTrigger)if(this._activeTrigger[e])return!0;return!1},e._getConfig=function(e){return"number"==typeof(e=l({},this.constructor.Default,oi(this.element).data(),"object"==typeof e&&e?e:{})).delay&&(e.delay={show:e.delay,hide:e.delay}),"number"==typeof e.title&&(e.title=e.title.toString()),"number"==typeof e.content&&(e.content=e.content.toString()),pe.typeCheckConfig(ai,e,this.constructor.DefaultType),e},e._getDelegateConfig=function(){var e={};if(this.config)for(var t in this.config)this.constructor.Default[t]!==this.config[t]&&(e[t]=this.config[t]);return e},e._cleanTipClass=function(){var e=oi(this.getTipElement()),t=e.attr("class").match(ui);null!==t&&t.length&&e.removeClass(t.join(""))},e._handlePopperPlacementChange=function(e){var t=e.instance;this.tip=t.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(e.placement))},e._fixTransition=function(){var e=this.getTipElement(),t=this.config.animation;null===e.getAttribute("x-placement")&&(oi(e).removeClass(wi),this.config.animation=!1,this.hide(),this.show(),this.config.animation=t)},n._jQueryInterface=function(i){return this.each(function(){var e=oi(this).data(li),t="object"==typeof i&&i;if((e||!/dispose|hide/.test(i))&&(e||(e=new n(this,t),oi(this).data(li,e)),"string"==typeof i)){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},o(n,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return pi}},{key:"NAME",get:function(){return ai}},{key:"DATA_KEY",get:function(){return li}},{key:"Event",get:function(){return yi}},{key:"EVENT_KEY",get:function(){return ci}},{key:"DefaultType",get:function(){return fi}}]),n}(),oi.fn[ai]=Ti._jQueryInterface,oi.fn[ai].Constructor=Ti,oi.fn[ai].noConflict=function(){return oi.fn[ai]=di,Ti._jQueryInterface},Ti),kn=(Ii="popover",Pi="."+(Mi="bs.popover"),Ai=(Ei=t).fn[Ii],Oi="bs-popover",Yi=new RegExp("(^|\\s)"+Oi+"\\S+","g"),Li=l({},Dn.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),Ni=l({},Dn.DefaultType,{content:"(string|element|function)"}),Fi="fade",Wi=".popover-header",Ri=".popover-body",Hi={HIDE:"hide"+Pi,HIDDEN:"hidden"+Pi,SHOW:(zi="show")+Pi,SHOWN:"shown"+Pi,INSERTED:"inserted"+Pi,CLICK:"click"+Pi,FOCUSIN:"focusin"+Pi,FOCUSOUT:"focusout"+Pi,MOUSEENTER:"mouseenter"+Pi,MOUSELEAVE:"mouseleave"+Pi},ji=function(e){var t,i;function n(){return e.apply(this,arguments)||this}i=e,(t=n).prototype=Object.create(i.prototype),(t.prototype.constructor=t).__proto__=i;var s=n.prototype;return s.isWithContent=function(){return this.getTitle()||this._getContent()},s.addAttachmentClass=function(e){Ei(this.getTipElement()).addClass(Oi+"-"+e)},s.getTipElement=function(){return this.tip=this.tip||Ei(this.config.template)[0],this.tip},s.setContent=function(){var e=Ei(this.getTipElement());this.setElementContent(e.find(Wi),this.getTitle());var t=this._getContent();"function"==typeof t&&(t=t.call(this.element)),this.setElementContent(e.find(Ri),t),e.removeClass(Fi+" "+zi)},s._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},s._cleanTipClass=function(){var e=Ei(this.getTipElement()),t=e.attr("class").match(Yi);null!==t&&0<t.length&&e.removeClass(t.join(""))},n._jQueryInterface=function(i){return this.each(function(){var e=Ei(this).data(Mi),t="object"==typeof i?i:null;if((e||!/destroy|hide/.test(i))&&(e||(e=new n(this,t),Ei(this).data(Mi,e)),"string"==typeof i)){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},o(n,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return Li}},{key:"NAME",get:function(){return Ii}},{key:"DATA_KEY",get:function(){return Mi}},{key:"Event",get:function(){return Hi}},{key:"EVENT_KEY",get:function(){return Pi}},{key:"DefaultType",get:function(){return Ni}}]),n}(Dn),Ei.fn[Ii]=ji._jQueryInterface,Ei.fn[Ii].Constructor=ji,Ei.fn[Ii].noConflict=function(){return Ei.fn[Ii]=Ai,ji._jQueryInterface},ji),Cn=(Vi="scrollspy",Bi="."+(qi="bs.scrollspy"),$i=(Ui=t).fn[Vi],Gi={offset:10,method:"auto",target:""},Xi={offset:"number",method:"string",target:"(string|element)"},Ki={ACTIVATE:"activate"+Bi,SCROLL:"scroll"+Bi,LOAD_DATA_API:"load"+Bi+".data-api"},Zi="dropdown-item",Qi="active",Ji={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV_LINKS:".nav-link",NAV_ITEMS:".nav-item",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},en="offset",tn="position",nn=function(){function i(e,t){var i=this;this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(t),this._selector=this._config.target+" "+Ji.NAV_LINKS+","+this._config.target+" "+Ji.LIST_ITEMS+","+this._config.target+" "+Ji.DROPDOWN_ITEMS,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,Ui(this._scrollElement).on(Ki.SCROLL,function(e){return i._process(e)}),this.refresh(),this._process()}var e=i.prototype;return e.refresh=function(){var t=this,e=this._scrollElement===this._scrollElement.window?en:tn,s="auto"===this._config.method?e:this._config.method,r=s===tn?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map(function(e){var t,i=pe.getSelectorFromElement(e);if(i&&(t=document.querySelector(i)),t){var n=t.getBoundingClientRect();if(n.width||n.height)return[Ui(t)[s]().top+r,i]}return null}).filter(function(e){return e}).sort(function(e,t){return e[0]-t[0]}).forEach(function(e){t._offsets.push(e[0]),t._targets.push(e[1])})},e.dispose=function(){Ui.removeData(this._element,qi),Ui(this._scrollElement).off(Bi),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},e._getConfig=function(e){if("string"!=typeof(e=l({},Gi,"object"==typeof e&&e?e:{})).target){var t=Ui(e.target).attr("id");t||(t=pe.getUID(Vi),Ui(e.target).attr("id",t)),e.target="#"+t}return pe.typeCheckConfig(Vi,e,Xi),e},e._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},e._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},e._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},e._process=function(){var e=this._getScrollTop()+this._config.offset,t=this._getScrollHeight(),i=this._config.offset+t-this._getOffsetHeight();if(this._scrollHeight!==t&&this.refresh(),i<=e){var n=this._targets[this._targets.length-1];this._activeTarget!==n&&this._activate(n)}else{if(this._activeTarget&&e<this._offsets[0]&&0<this._offsets[0])return this._activeTarget=null,void this._clear();for(var s=this._offsets.length;s--;){this._activeTarget!==this._targets[s]&&e>=this._offsets[s]&&(void 0===this._offsets[s+1]||e<this._offsets[s+1])&&this._activate(this._targets[s])}}},e._activate=function(t){this._activeTarget=t,this._clear();var e=this._selector.split(",");e=e.map(function(e){return e+'[data-target="'+t+'"],'+e+'[href="'+t+'"]'});var i=Ui([].slice.call(document.querySelectorAll(e.join(","))));i.hasClass(Zi)?(i.closest(Ji.DROPDOWN).find(Ji.DROPDOWN_TOGGLE).addClass(Qi),i.addClass(Qi)):(i.addClass(Qi),i.parents(Ji.NAV_LIST_GROUP).prev(Ji.NAV_LINKS+", "+Ji.LIST_ITEMS).addClass(Qi),i.parents(Ji.NAV_LIST_GROUP).prev(Ji.NAV_ITEMS).children(Ji.NAV_LINKS).addClass(Qi)),Ui(this._scrollElement).trigger(Ki.ACTIVATE,{relatedTarget:t})},e._clear=function(){var e=[].slice.call(document.querySelectorAll(this._selector));Ui(e).filter(Ji.ACTIVE).removeClass(Qi)},i._jQueryInterface=function(t){return this.each(function(){var e=Ui(this).data(qi);if(e||(e=new i(this,"object"==typeof t&&t),Ui(this).data(qi,e)),"string"==typeof t){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t]()}})},o(i,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return Gi}}]),i}(),Ui(window).on(Ki.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(Ji.DATA_SPY)),t=e.length;t--;){var i=Ui(e[t]);nn._jQueryInterface.call(i,i.data())}}),Ui.fn[Vi]=nn._jQueryInterface,Ui.fn[Vi].Constructor=nn,Ui.fn[Vi].noConflict=function(){return Ui.fn[Vi]=$i,nn._jQueryInterface},nn),Tn=(on="."+(rn="bs.tab"),an=(sn=t).fn.tab,ln={HIDE:"hide"+on,HIDDEN:"hidden"+on,SHOW:"show"+on,SHOWN:"shown"+on,CLICK_DATA_API:"click"+on+".data-api"},cn="dropdown-menu",dn="active",hn="disabled",un="fade",fn="show",mn=".dropdown",pn=".nav, .list-group",gn=".active",vn="> li > .active",yn='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',wn=".dropdown-toggle",bn="> .dropdown-menu .active",_n=function(){function n(e){this._element=e}var e=n.prototype;return e.show=function(){var i=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&sn(this._element).hasClass(dn)||sn(this._element).hasClass(hn))){var e,n,t=sn(this._element).closest(pn)[0],s=pe.getSelectorFromElement(this._element);if(t){var r="UL"===t.nodeName?vn:gn;n=(n=sn.makeArray(sn(t).find(r)))[n.length-1]}var o=sn.Event(ln.HIDE,{relatedTarget:this._element}),a=sn.Event(ln.SHOW,{relatedTarget:n});if(n&&sn(n).trigger(o),sn(this._element).trigger(a),!a.isDefaultPrevented()&&!o.isDefaultPrevented()){s&&(e=document.querySelector(s)),this._activate(this._element,t);var l=function(){var e=sn.Event(ln.HIDDEN,{relatedTarget:i._element}),t=sn.Event(ln.SHOWN,{relatedTarget:n});sn(n).trigger(e),sn(i._element).trigger(t)};e?this._activate(e,e.parentNode,l):l()}}},e.dispose=function(){sn.removeData(this._element,rn),this._element=null},e._activate=function(e,t,i){var n=this,s=("UL"===t.nodeName?sn(t).find(vn):sn(t).children(gn))[0],r=i&&s&&sn(s).hasClass(un),o=function(){return n._transitionComplete(e,s,i)};if(s&&r){var a=pe.getTransitionDurationFromElement(s);sn(s).one(pe.TRANSITION_END,o).emulateTransitionEnd(a)}else o()},e._transitionComplete=function(e,t,i){if(t){sn(t).removeClass(fn+" "+dn);var n=sn(t.parentNode).find(bn)[0];n&&sn(n).removeClass(dn),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!1)}if(sn(e).addClass(dn),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),pe.reflow(e),sn(e).addClass(fn),e.parentNode&&sn(e.parentNode).hasClass(cn)){var s=sn(e).closest(mn)[0];if(s){var r=[].slice.call(s.querySelectorAll(wn));sn(r).addClass(dn)}e.setAttribute("aria-expanded",!0)}i&&i()},n._jQueryInterface=function(i){return this.each(function(){var e=sn(this),t=e.data(rn);if(t||(t=new n(this),e.data(rn,t)),"string"==typeof i){if(void 0===t[i])throw new TypeError('No method named "'+i+'"');t[i]()}})},o(n,null,[{key:"VERSION",get:function(){return"4.1.3"}}]),n}(),sn(document).on(ln.CLICK_DATA_API,yn,function(e){e.preventDefault(),_n._jQueryInterface.call(sn(this),"show")}),sn.fn.tab=_n._jQueryInterface,sn.fn.tab.Constructor=_n,sn.fn.tab.noConflict=function(){return sn.fn.tab=an,_n._jQueryInterface},_n);!function(e){if(void 0===e)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var t=e.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1===t[0]&&9===t[1]&&t[2]<1||4<=t[0])throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(t),e.Util=pe,e.Alert=ge,e.Button=ve,e.Carousel=ye,e.Collapse=we,e.Dropdown=Sn,e.Modal=xn,e.Popover=kn,e.Scrollspy=Cn,e.Tab=Tn,e.Tooltip=Dn,Object.defineProperty(e,"__esModule",{value:!0})}),function(e,i){if("function"==typeof define&&define.amd)define(["moment","jquery"],function(e,t){return t.fn||(t.fn={}),i(e,t)});else if("object"==typeof module&&module.exports){var t="undefined"!=typeof window?window.jQuery:void 0;t||(t=require("jquery")).fn||(t.fn={});var n="undefined"!=typeof window&&void 0!==window.moment?window.moment:require("moment");module.exports=i(n,t)}else e.daterangepicker=i(e.moment,e.jQuery)}(this,function(W,R){var n=function(e,t,i){if(this.parentEl="body",this.element=R(e),this.startDate=W().startOf("day"),this.endDate=W().endOf("day"),this.minDate=!1,this.maxDate=!1,this.dateLimit=!1,this.autoApply=!1,this.singleDatePicker=!1,this.showDropdowns=!1,this.showWeekNumbers=!1,this.showISOWeekNumbers=!1,this.showCustomRangeLabel=!0,this.timePicker=!1,this.timePicker24Hour=!1,this.timePickerIncrement=1,this.timePickerSeconds=!1,this.linkedCalendars=!0,this.autoUpdateInput=!0,this.alwaysShowCalendars=!1,this.ranges={},this.opens="right",this.element.hasClass("pull-right")&&(this.opens="left"),this.drops="down",this.element.hasClass("dropup")&&(this.drops="up"),this.buttonClasses="btn btn-sm",this.applyClass="btn-success",this.cancelClass="btn-default",this.locale={direction:"ltr",format:W.localeData().longDateFormat("L"),separator:" - ",applyLabel:"Apply",cancelLabel:"Cancel",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:W.weekdaysMin(),monthNames:W.monthsShort(),firstDay:W.localeData().firstDayOfWeek()},this.callback=function(){},this.isShowing=!1,this.leftCalendar={},this.rightCalendar={},"object"==typeof t&&null!==t||(t={}),"string"==typeof(t=R.extend(this.element.data(),t)).template||t.template instanceof R||(t.template='<div class="daterangepicker dropdown-menu"><div class="calendar left"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="calendar right"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="ranges"><div class="range_inputs"><button class="applyBtn" disabled="disabled" type="button"></button> <button class="cancelBtn" type="button"></button></div></div></div>'),this.parentEl=t.parentEl&&R(t.parentEl).length?R(t.parentEl):R(this.parentEl),this.container=R(t.template).appendTo(this.parentEl),"object"==typeof t.locale&&("string"==typeof t.locale.direction&&(this.locale.direction=t.locale.direction),"string"==typeof t.locale.format&&(this.locale.format=t.locale.format),"string"==typeof t.locale.separator&&(this.locale.separator=t.locale.separator),"object"==typeof t.locale.daysOfWeek&&(this.locale.daysOfWeek=t.locale.daysOfWeek.slice()),"object"==typeof t.locale.monthNames&&(this.locale.monthNames=t.locale.monthNames.slice()),"number"==typeof t.locale.firstDay&&(this.locale.firstDay=t.locale.firstDay),"string"==typeof t.locale.applyLabel&&(this.locale.applyLabel=t.locale.applyLabel),"string"==typeof t.locale.cancelLabel&&(this.locale.cancelLabel=t.locale.cancelLabel),"string"==typeof t.locale.weekLabel&&(this.locale.weekLabel=t.locale.weekLabel),"string"==typeof t.locale.customRangeLabel)){(h=document.createElement("textarea")).innerHTML=t.locale.customRangeLabel;var n=h.value;this.locale.customRangeLabel=n}if(this.container.addClass(this.locale.direction),"string"==typeof t.startDate&&(this.startDate=W(t.startDate,this.locale.format)),"string"==typeof t.endDate&&(this.endDate=W(t.endDate,this.locale.format)),"string"==typeof t.minDate&&(this.minDate=W(t.minDate,this.locale.format)),"string"==typeof t.maxDate&&(this.maxDate=W(t.maxDate,this.locale.format)),"object"==typeof t.startDate&&(this.startDate=W(t.startDate)),"object"==typeof t.endDate&&(this.endDate=W(t.endDate)),"object"==typeof t.minDate&&(this.minDate=W(t.minDate)),"object"==typeof t.maxDate&&(this.maxDate=W(t.maxDate)),this.minDate&&this.startDate.isBefore(this.minDate)&&(this.startDate=this.minDate.clone()),this.maxDate&&this.endDate.isAfter(this.maxDate)&&(this.endDate=this.maxDate.clone()),"string"==typeof t.applyClass&&(this.applyClass=t.applyClass),"string"==typeof t.cancelClass&&(this.cancelClass=t.cancelClass),"object"==typeof t.dateLimit&&(this.dateLimit=t.dateLimit),"string"==typeof t.opens&&(this.opens=t.opens),"string"==typeof t.drops&&(this.drops=t.drops),"boolean"==typeof t.showWeekNumbers&&(this.showWeekNumbers=t.showWeekNumbers),"boolean"==typeof t.showISOWeekNumbers&&(this.showISOWeekNumbers=t.showISOWeekNumbers),"string"==typeof t.buttonClasses&&(this.buttonClasses=t.buttonClasses),"object"==typeof t.buttonClasses&&(this.buttonClasses=t.buttonClasses.join(" ")),"boolean"==typeof t.showDropdowns&&(this.showDropdowns=t.showDropdowns),"boolean"==typeof t.showCustomRangeLabel&&(this.showCustomRangeLabel=t.showCustomRangeLabel),"boolean"==typeof t.singleDatePicker&&(this.singleDatePicker=t.singleDatePicker,this.singleDatePicker&&(this.endDate=this.startDate.clone())),"boolean"==typeof t.timePicker&&(this.timePicker=t.timePicker),"boolean"==typeof t.timePickerSeconds&&(this.timePickerSeconds=t.timePickerSeconds),"number"==typeof t.timePickerIncrement&&(this.timePickerIncrement=t.timePickerIncrement),"boolean"==typeof t.timePicker24Hour&&(this.timePicker24Hour=t.timePicker24Hour),"boolean"==typeof t.autoApply&&(this.autoApply=t.autoApply),"boolean"==typeof t.autoUpdateInput&&(this.autoUpdateInput=t.autoUpdateInput),"boolean"==typeof t.linkedCalendars&&(this.linkedCalendars=t.linkedCalendars),"function"==typeof t.isInvalidDate&&(this.isInvalidDate=t.isInvalidDate),"function"==typeof t.isCustomDate&&(this.isCustomDate=t.isCustomDate),"boolean"==typeof t.alwaysShowCalendars&&(this.alwaysShowCalendars=t.alwaysShowCalendars),0!=this.locale.firstDay)for(var s=this.locale.firstDay;0<s;)this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()),s--;var r,o,a;if(void 0===t.startDate&&void 0===t.endDate&&R(this.element).is("input[type=text]")){var l=R(this.element).val(),c=l.split(this.locale.separator);r=o=null,2==c.length?(r=W(c[0],this.locale.format),o=W(c[1],this.locale.format)):this.singleDatePicker&&""!==l&&(r=W(l,this.locale.format),o=W(l,this.locale.format)),null!==r&&null!==o&&(this.setStartDate(r),this.setEndDate(o))}if("object"==typeof t.ranges){for(a in t.ranges){r="string"==typeof t.ranges[a][0]?W(t.ranges[a][0],this.locale.format):W(t.ranges[a][0]),o="string"==typeof t.ranges[a][1]?W(t.ranges[a][1],this.locale.format):W(t.ranges[a][1]),this.minDate&&r.isBefore(this.minDate)&&(r=this.minDate.clone());var d=this.maxDate;if(this.dateLimit&&d&&r.clone().add(this.dateLimit).isAfter(d)&&(d=r.clone().add(this.dateLimit)),d&&o.isAfter(d)&&(o=d.clone()),!(this.minDate&&o.isBefore(this.minDate,this.timepicker?"minute":"day")||d&&r.isAfter(d,this.timepicker?"minute":"day"))){var h;(h=document.createElement("textarea")).innerHTML=a;n=h.value;this.ranges[n]=[r,o]}}var u="<ul>";for(a in this.ranges)u+='<li data-range-key="'+a+'">'+a+"</li>";this.showCustomRangeLabel&&(u+='<li data-range-key="'+this.locale.customRangeLabel+'">'+this.locale.customRangeLabel+"</li>"),u+="</ul>",this.container.find(".ranges").prepend(u)}"function"==typeof i&&(this.callback=i),this.timePicker||(this.startDate=this.startDate.startOf("day"),this.endDate=this.endDate.endOf("day"),this.container.find(".calendar-time").hide()),this.timePicker&&this.autoApply&&(this.autoApply=!1),this.autoApply&&"object"!=typeof t.ranges?this.container.find(".ranges").hide():this.autoApply&&this.container.find(".applyBtn, .cancelBtn").addClass("hide"),this.singleDatePicker&&(this.container.addClass("single"),this.container.find(".calendar.left").addClass("single"),this.container.find(".calendar.left").show(),this.container.find(".calendar.right").hide(),this.container.find(".daterangepicker_input input, .daterangepicker_input > i").hide(),this.timePicker?this.container.find(".ranges ul").hide():this.container.find(".ranges").hide()),(void 0===t.ranges&&!this.singleDatePicker||this.alwaysShowCalendars)&&this.container.addClass("show-calendar"),this.container.addClass("opens"+this.opens),void 0!==t.ranges&&"right"==this.opens&&this.container.find(".ranges").prependTo(this.container.find(".calendar.left").parent()),this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses),this.applyClass.length&&this.container.find(".applyBtn").addClass(this.applyClass),this.cancelClass.length&&this.container.find(".cancelBtn").addClass(this.cancelClass),this.container.find(".applyBtn").html(this.locale.applyLabel),this.container.find(".cancelBtn").html(this.locale.cancelLabel),this.container.find(".calendar").on("click.daterangepicker",".prev",R.proxy(this.clickPrev,this)).on("click.daterangepicker",".next",R.proxy(this.clickNext,this)).on("mousedown.daterangepicker","td.available",R.proxy(this.clickDate,this)).on("mouseenter.daterangepicker","td.available",R.proxy(this.hoverDate,this)).on("mouseleave.daterangepicker","td.available",R.proxy(this.updateFormInputs,this)).on("change.daterangepicker","select.yearselect",R.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.monthselect",R.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",R.proxy(this.timeChanged,this)).on("click.daterangepicker",".daterangepicker_input input",R.proxy(this.showCalendars,this)).on("focus.daterangepicker",".daterangepicker_input input",R.proxy(this.formInputsFocused,this)).on("blur.daterangepicker",".daterangepicker_input input",R.proxy(this.formInputsBlurred,this)).on("change.daterangepicker",".daterangepicker_input input",R.proxy(this.formInputsChanged,this)).on("keydown.daterangepicker",".daterangepicker_input input",R.proxy(this.formInputsKeydown,this)),this.container.find(".ranges").on("click.daterangepicker","button.applyBtn",R.proxy(this.clickApply,this)).on("click.daterangepicker","button.cancelBtn",R.proxy(this.clickCancel,this)).on("click.daterangepicker","li",R.proxy(this.clickRange,this)).on("mouseenter.daterangepicker","li",R.proxy(this.hoverRange,this)).on("mouseleave.daterangepicker","li",R.proxy(this.updateFormInputs,this)),this.element.is("input")||this.element.is("button")?this.element.on({"click.daterangepicker":R.proxy(this.show,this),"focus.daterangepicker":R.proxy(this.show,this),"keyup.daterangepicker":R.proxy(this.elementChanged,this),"keydown.daterangepicker":R.proxy(this.keydown,this)}):(this.element.on("click.daterangepicker",R.proxy(this.toggle,this)),this.element.on("keydown.daterangepicker",R.proxy(this.toggle,this))),this.element.is("input")&&!this.singleDatePicker&&this.autoUpdateInput?(this.element.val(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format)),this.element.trigger("change")):this.element.is("input")&&this.autoUpdateInput&&(this.element.val(this.startDate.format(this.locale.format)),this.element.trigger("change"))};return n.prototype={constructor:n,setStartDate:function(e){"string"==typeof e&&(this.startDate=W(e,this.locale.format)),"object"==typeof e&&(this.startDate=W(e)),this.timePicker||(this.startDate=this.startDate.startOf("day")),this.timePicker&&this.timePickerIncrement&&this.startDate.minute(Math.round(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement),this.minDate&&this.startDate.isBefore(this.minDate)&&(this.startDate=this.minDate.clone(),this.timePicker&&this.timePickerIncrement&&this.startDate.minute(Math.round(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement)),this.maxDate&&this.startDate.isAfter(this.maxDate)&&(this.startDate=this.maxDate.clone(),this.timePicker&&this.timePickerIncrement&&this.startDate.minute(Math.floor(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement)),this.isShowing||this.updateElement(),this.updateMonthsInView()},setEndDate:function(e){"string"==typeof e&&(this.endDate=W(e,this.locale.format)),"object"==typeof e&&(this.endDate=W(e)),this.timePicker||(this.endDate=this.endDate.add(1,"d").startOf("day").subtract(1,"second")),this.timePicker&&this.timePickerIncrement&&this.endDate.minute(Math.round(this.endDate.minute()/this.timePickerIncrement)*this.timePickerIncrement),this.endDate.isBefore(this.startDate)&&(this.endDate=this.startDate.clone()),this.maxDate&&this.endDate.isAfter(this.maxDate)&&(this.endDate=this.maxDate.clone()),this.dateLimit&&this.startDate.clone().add(this.dateLimit).isBefore(this.endDate)&&(this.endDate=this.startDate.clone().add(this.dateLimit)),this.previousRightTime=this.endDate.clone(),this.isShowing||this.updateElement(),this.updateMonthsInView()},isInvalidDate:function(){return!1},isCustomDate:function(){return!1},updateView:function(){this.timePicker&&(this.renderTimePicker("left"),this.renderTimePicker("right"),this.endDate?this.container.find(".right .calendar-time select").removeAttr("disabled").removeClass("disabled"):this.container.find(".right .calendar-time select").attr("disabled","disabled").addClass("disabled")),this.endDate?(this.container.find('input[name="daterangepicker_end"]').removeClass("active"),this.container.find('input[name="daterangepicker_start"]').addClass("active")):(this.container.find('input[name="daterangepicker_end"]').addClass("active"),this.container.find('input[name="daterangepicker_start"]').removeClass("active")),this.updateMonthsInView(),this.updateCalendars(),this.updateFormInputs()},updateMonthsInView:function(){if(this.endDate){if(!this.singleDatePicker&&this.leftCalendar.month&&this.rightCalendar.month&&(this.startDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.startDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM"))&&(this.endDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.endDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM")))return;this.leftCalendar.month=this.startDate.clone().date(2),this.linkedCalendars||this.endDate.month()==this.startDate.month()&&this.endDate.year()==this.startDate.year()?this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month"):this.rightCalendar.month=this.endDate.clone().date(2)}else this.leftCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")&&this.rightCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")&&(this.leftCalendar.month=this.startDate.clone().date(2),this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month"));this.maxDate&&this.linkedCalendars&&!this.singleDatePicker&&this.rightCalendar.month>this.maxDate&&(this.rightCalendar.month=this.maxDate.clone().date(2),this.leftCalendar.month=this.maxDate.clone().date(2).subtract(1,"month"))},updateCalendars:function(){if(this.timePicker){var e,t,i,n;if(this.endDate){if(e=parseInt(this.container.find(".left .hourselect").val(),10),t=parseInt(this.container.find(".left .minuteselect").val(),10),i=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0,!this.timePicker24Hour)"PM"===(n=this.container.find(".left .ampmselect").val())&&e<12&&(e+=12),"AM"===n&&12===e&&(e=0)}else if(e=parseInt(this.container.find(".right .hourselect").val(),10),t=parseInt(this.container.find(".right .minuteselect").val(),10),i=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0,!this.timePicker24Hour)"PM"===(n=this.container.find(".right .ampmselect").val())&&e<12&&(e+=12),"AM"===n&&12===e&&(e=0);this.leftCalendar.month.hour(e).minute(t).second(i),this.rightCalendar.month.hour(e).minute(t).second(i)}this.renderCalendar("left"),this.renderCalendar("right"),this.container.find(".ranges li").removeClass("active"),null!=this.endDate&&this.calculateChosenLabel()},renderCalendar:function(e){var t,i=(t="left"==e?this.leftCalendar:this.rightCalendar).month.month(),n=t.month.year(),s=t.month.hour(),r=t.month.minute(),o=t.month.second(),a=W([n,i]).daysInMonth(),l=W([n,i,1]),c=W([n,i,a]),d=W(l).subtract(1,"month").month(),h=W(l).subtract(1,"month").year(),u=W([h,d]).daysInMonth(),f=l.day();(t=[]).firstDay=l,t.lastDay=c;for(var m=0;m<6;m++)t[m]=[];var p=u-f+this.locale.firstDay+1;u<p&&(p-=7),f==this.locale.firstDay&&(p=u-6);for(var g=W([h,d,p,12,r,o]),v=(m=0,0),y=0;m<42;m++,v++,g=W(g).add(24,"hour"))0<m&&v%7==0&&(v=0,y++),t[y][v]=g.clone().hour(s).minute(r).second(o),g.hour(12),this.minDate&&t[y][v].format("YYYY-MM-DD")==this.minDate.format("YYYY-MM-DD")&&t[y][v].isBefore(this.minDate)&&"left"==e&&(t[y][v]=this.minDate.clone()),this.maxDate&&t[y][v].format("YYYY-MM-DD")==this.maxDate.format("YYYY-MM-DD")&&t[y][v].isAfter(this.maxDate)&&"right"==e&&(t[y][v]=this.maxDate.clone());"left"==e?this.leftCalendar.calendar=t:this.rightCalendar.calendar=t;var w="left"==e?this.minDate:this.startDate,b=this.maxDate,_=("left"==e?this.startDate:this.endDate,"ltr"==this.locale.direction?{left:"chevron-left",right:"chevron-right"}:{left:"chevron-right",right:"chevron-left"}),S='<table class="table-condensed">';S+="<thead>",S+="<tr>",(this.showWeekNumbers||this.showISOWeekNumbers)&&(S+="<th></th>"),w&&!w.isBefore(t.firstDay)||this.linkedCalendars&&"left"!=e?S+="<th></th>":S+='<th class="prev available"><i class="fa fa-'+_.left+" glyphicon glyphicon-"+_.left+'"></i></th>';var x=this.locale.monthNames[t[1][1].month()]+t[1][1].format(" YYYY");if(this.showDropdowns){for(var D=t[1][1].month(),k=t[1][1].year(),C=b&&b.year()||k+5,T=w&&w.year()||k-50,E=k==T,I=k==C,M='<select class="monthselect">',P=0;P<12;P++)(!E||P>=w.month())&&(!I||P<=b.month())?M+="<option value='"+P+"'"+(P===D?" selected='selected'":"")+">"+this.locale.monthNames[P]+"</option>":M+="<option value='"+P+"'"+(P===D?" selected='selected'":"")+" disabled='disabled'>"+this.locale.monthNames[P]+"</option>";M+="</select>";for(var A='<select class="yearselect">',O=T;O<=C;O++)A+='<option value="'+O+'"'+(O===k?' selected="selected"':"")+">"+O+"</option>";x=M+(A+="</select>")}if(S+='<th colspan="5" class="month">'+x+"</th>",b&&!b.isAfter(t.lastDay)||this.linkedCalendars&&"right"!=e&&!this.singleDatePicker?S+="<th></th>":S+='<th class="next available"><i class="fa fa-'+_.right+" glyphicon glyphicon-"+_.right+'"></i></th>',S+="</tr>",S+="<tr>",(this.showWeekNumbers||this.showISOWeekNumbers)&&(S+='<th class="week">'+this.locale.weekLabel+"</th>"),R.each(this.locale.daysOfWeek,function(e,t){S+="<th>"+t+"</th>"}),S+="</tr>",S+="</thead>",S+="<tbody>",null==this.endDate&&this.dateLimit){var Y=this.startDate.clone().add(this.dateLimit).endOf("day");b&&!Y.isBefore(b)||(b=Y)}for(y=0;y<6;y++){S+="<tr>",this.showWeekNumbers?S+='<td class="week">'+t[y][0].week()+"</td>":this.showISOWeekNumbers&&(S+='<td class="week">'+t[y][0].isoWeek()+"</td>");for(v=0;v<7;v++){var L=[];t[y][v].isSame(new Date,"day")&&L.push("today"),5<t[y][v].isoWeekday()&&L.push("weekend"),t[y][v].month()!=t[1][1].month()&&L.push("off"),this.minDate&&t[y][v].isBefore(this.minDate,"day")&&L.push("off","disabled"),b&&t[y][v].isAfter(b,"day")&&L.push("off","disabled"),this.isInvalidDate(t[y][v])&&L.push("off","disabled"),t[y][v].format("YYYY-MM-DD")==this.startDate.format("YYYY-MM-DD")&&L.push("active","start-date"),null!=this.endDate&&t[y][v].format("YYYY-MM-DD")==this.endDate.format("YYYY-MM-DD")&&L.push("active","end-date"),null!=this.endDate&&t[y][v]>this.startDate&&t[y][v]<this.endDate&&L.push("in-range");var N=this.isCustomDate(t[y][v]);!1!==N&&("string"==typeof N?L.push(N):Array.prototype.push.apply(L,N));var F="",z=!1;for(m=0;m<L.length;m++)F+=L[m]+" ","disabled"==L[m]&&(z=!0);z||(F+="available"),S+='<td class="'+F.replace(/^\s+|\s+$/g,"")+'" data-title="r'+y+"c"+v+'">'+t[y][v].date()+"</td>"}S+="</tr>"}S+="</tbody>",S+="</table>",this.container.find(".calendar."+e+" .calendar-table").html(S)},renderTimePicker:function(e){if("right"!=e||this.endDate){var t,i,n,s=this.maxDate;if(!this.dateLimit||this.maxDate&&!this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)||(s=this.startDate.clone().add(this.dateLimit)),"left"==e)i=this.startDate.clone(),n=this.minDate;else if("right"==e){i=this.endDate.clone(),n=this.startDate;var r=this.container.find(".calendar.right .calendar-time div");if(""!=r.html()&&(i.hour(r.find(".hourselect option:selected").val()||i.hour()),i.minute(r.find(".minuteselect option:selected").val()||i.minute()),i.second(r.find(".secondselect option:selected").val()||i.second()),!this.timePicker24Hour)){var o=r.find(".ampmselect option:selected").val();"PM"===o&&i.hour()<12&&i.hour(i.hour()+12),"AM"===o&&12===i.hour()&&i.hour(0)}i.isBefore(this.startDate)&&(i=this.startDate.clone()),s&&i.isAfter(s)&&(i=s.clone())}t='<select class="hourselect">';for(var a=this.timePicker24Hour?0:1,l=this.timePicker24Hour?23:12,c=a;c<=l;c++){var d=c;this.timePicker24Hour||(d=12<=i.hour()?12==c?12:c+12:12==c?0:c);var h=i.clone().hour(d),u=!1;n&&h.minute(59).isBefore(n)&&(u=!0),s&&h.minute(0).isAfter(s)&&(u=!0),d!=i.hour()||u?t+=u?'<option value="'+c+'" disabled="disabled" class="disabled">'+c+"</option>":'<option value="'+c+'">'+c+"</option>":t+='<option value="'+c+'" selected="selected">'+c+"</option>"}t+="</select> ",t+=': <select class="minuteselect">';for(c=0;c<60;c+=this.timePickerIncrement){var f=c<10?"0"+c:c;h=i.clone().minute(c),u=!1;n&&h.second(59).isBefore(n)&&(u=!0),s&&h.second(0).isAfter(s)&&(u=!0),i.minute()!=c||u?t+=u?'<option value="'+c+'" disabled="disabled" class="disabled">'+f+"</option>":'<option value="'+c+'">'+f+"</option>":t+='<option value="'+c+'" selected="selected">'+f+"</option>"}if(t+="</select> ",this.timePickerSeconds){t+=': <select class="secondselect">';for(c=0;c<60;c++){f=c<10?"0"+c:c,h=i.clone().second(c),u=!1;n&&h.isBefore(n)&&(u=!0),s&&h.isAfter(s)&&(u=!0),i.second()!=c||u?t+=u?'<option value="'+c+'" disabled="disabled" class="disabled">'+f+"</option>":'<option value="'+c+'">'+f+"</option>":t+='<option value="'+c+'" selected="selected">'+f+"</option>"}t+="</select> "}if(!this.timePicker24Hour){t+='<select class="ampmselect">';var m="",p="";n&&i.clone().hour(12).minute(0).second(0).isBefore(n)&&(m=' disabled="disabled" class="disabled"'),s&&i.clone().hour(0).minute(0).second(0).isAfter(s)&&(p=' disabled="disabled" class="disabled"'),12<=i.hour()?t+='<option value="AM"'+m+'>AM</option><option value="PM" selected="selected"'+p+">PM</option>":t+='<option value="AM" selected="selected"'+m+'>AM</option><option value="PM"'+p+">PM</option>",t+="</select>"}this.container.find(".calendar."+e+" .calendar-time div").html(t)}},updateFormInputs:function(){this.container.find("input[name=daterangepicker_start]").is(":focus")||this.container.find("input[name=daterangepicker_end]").is(":focus")||(this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.locale.format)),this.endDate&&this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.locale.format)),this.singleDatePicker||this.endDate&&(this.startDate.isBefore(this.endDate)||this.startDate.isSame(this.endDate))?this.container.find("button.applyBtn").removeAttr("disabled"):this.container.find("button.applyBtn").attr("disabled","disabled"))},move:function(){var e,t={top:0,left:0},i=R(window).width();this.parentEl.is("body")||(t={top:this.parentEl.offset().top-this.parentEl.scrollTop(),left:this.parentEl.offset().left-this.parentEl.scrollLeft()},i=this.parentEl[0].clientWidth+this.parentEl.offset().left),e="up"==this.drops?this.element.offset().top-this.container.outerHeight()-t.top:this.element.offset().top+this.element.outerHeight()-t.top,this.container["up"==this.drops?"addClass":"removeClass"]("dropup"),"left"==this.opens?(this.container.css({top:e,right:i-this.element.offset().left-this.element.outerWidth(),left:"auto"}),this.container.offset().left<0&&this.container.css({right:"auto",left:9})):"center"==this.opens?(this.container.css({top:e,left:this.element.offset().left-t.left+this.element.outerWidth()/2-this.container.outerWidth()/2,right:"auto"}),this.container.offset().left<0&&this.container.css({right:"auto",left:9})):(this.container.css({top:e,left:this.element.offset().left-t.left,right:"auto"}),this.container.offset().left+this.container.outerWidth()>R(window).width()&&this.container.css({left:"auto",right:0}))},show:function(e){this.isShowing||(this._outsideClickProxy=R.proxy(function(e){this.outsideClick(e)},this),R(document).on("mousedown.daterangepicker",this._outsideClickProxy).on("touchend.daterangepicker",this._outsideClickProxy).on("click.daterangepicker","[data-toggle=dropdown]",this._outsideClickProxy).on("focusin.daterangepicker",this._outsideClickProxy),R(window).on("resize.daterangepicker",R.proxy(function(e){this.move(e)},this)),this.oldStartDate=this.startDate.clone(),this.oldEndDate=this.endDate.clone(),this.previousRightTime=this.endDate.clone(),this.updateView(),this.container.show(),this.move(),this.element.trigger("show.daterangepicker",this),this.isShowing=!0)},hide:function(e){this.isShowing&&(this.endDate||(this.startDate=this.oldStartDate.clone(),this.endDate=this.oldEndDate.clone()),this.startDate.isSame(this.oldStartDate)&&this.endDate.isSame(this.oldEndDate)||this.callback(this.startDate.clone(),this.endDate.clone(),this.chosenLabel),this.updateElement(),R(document).off(".daterangepicker"),R(window).off(".daterangepicker"),this.container.hide(),this.element.trigger("hide.daterangepicker",this),this.isShowing=!1)},toggle:function(e){this.isShowing?this.hide():this.show()},outsideClick:function(e){var t=R(e.target);"focusin"==e.type||t.closest(this.element).length||t.closest(this.container).length||t.closest(".calendar-table").length||(this.hide(),this.element.trigger("outsideClick.daterangepicker",this))},showCalendars:function(){this.container.addClass("show-calendar"),this.move(),this.element.trigger("showCalendar.daterangepicker",this)},hideCalendars:function(){this.container.removeClass("show-calendar"),this.element.trigger("hideCalendar.daterangepicker",this)},hoverRange:function(e){if(!this.container.find("input[name=daterangepicker_start]").is(":focus")&&!this.container.find("input[name=daterangepicker_end]").is(":focus")){var t=e.target.getAttribute("data-range-key");if(t==this.locale.customRangeLabel)this.updateView();else{var i=this.ranges[t];this.container.find("input[name=daterangepicker_start]").val(i[0].format(this.locale.format)),this.container.find("input[name=daterangepicker_end]").val(i[1].format(this.locale.format))}}},clickRange:function(e){var t=e.target.getAttribute("data-range-key");if((this.chosenLabel=t)==this.locale.customRangeLabel)this.showCalendars();else{var i=this.ranges[t];this.startDate=i[0],this.endDate=i[1],this.timePicker||(this.startDate.startOf("day"),this.endDate.endOf("day")),this.alwaysShowCalendars||this.hideCalendars(),this.clickApply()}},clickPrev:function(e){R(e.target).parents(".calendar").hasClass("left")?(this.leftCalendar.month.subtract(1,"month"),this.linkedCalendars&&this.rightCalendar.month.subtract(1,"month")):this.rightCalendar.month.subtract(1,"month"),this.updateCalendars()},clickNext:function(e){R(e.target).parents(".calendar").hasClass("left")?this.leftCalendar.month.add(1,"month"):(this.rightCalendar.month.add(1,"month"),this.linkedCalendars&&this.leftCalendar.month.add(1,"month")),this.updateCalendars()},hoverDate:function(e){if(R(e.target).hasClass("available")){var t=R(e.target).attr("data-title"),i=t.substr(1,1),n=t.substr(3,1),o=R(e.target).parents(".calendar").hasClass("left")?this.leftCalendar.calendar[i][n]:this.rightCalendar.calendar[i][n];this.endDate&&!this.container.find("input[name=daterangepicker_start]").is(":focus")?this.container.find("input[name=daterangepicker_start]").val(o.format(this.locale.format)):this.endDate||this.container.find("input[name=daterangepicker_end]").is(":focus")||this.container.find("input[name=daterangepicker_end]").val(o.format(this.locale.format));var a=this.leftCalendar,l=this.rightCalendar,c=this.startDate;this.endDate||this.container.find(".calendar tbody td").each(function(e,t){if(!R(t).hasClass("week")){var i=R(t).attr("data-title"),n=i.substr(1,1),s=i.substr(3,1),r=R(t).parents(".calendar").hasClass("left")?a.calendar[n][s]:l.calendar[n][s];r.isAfter(c)&&r.isBefore(o)||r.isSame(o,"day")?R(t).addClass("in-range"):R(t).removeClass("in-range")}})}},clickDate:function(e){if(R(e.target).hasClass("available")){var t=R(e.target).attr("data-title"),i=t.substr(1,1),n=t.substr(3,1),s=R(e.target).parents(".calendar").hasClass("left")?this.leftCalendar.calendar[i][n]:this.rightCalendar.calendar[i][n];if(this.endDate||s.isBefore(this.startDate,"day")){if(this.timePicker){var r=parseInt(this.container.find(".left .hourselect").val(),10);if(!this.timePicker24Hour)"PM"===(l=this.container.find(".left .ampmselect").val())&&r<12&&(r+=12),"AM"===l&&12===r&&(r=0);var o=parseInt(this.container.find(".left .minuteselect").val(),10),a=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0;s=s.clone().hour(r).minute(o).second(a)}this.endDate=null,this.setStartDate(s.clone())}else if(!this.endDate&&s.isBefore(this.startDate))this.setEndDate(this.startDate.clone());else{if(this.timePicker){var l;r=parseInt(this.container.find(".right .hourselect").val(),10);if(!this.timePicker24Hour)"PM"===(l=this.container.find(".right .ampmselect").val())&&r<12&&(r+=12),"AM"===l&&12===r&&(r=0);o=parseInt(this.container.find(".right .minuteselect").val(),10),a=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0;s=s.clone().hour(r).minute(o).second(a)}this.setEndDate(s.clone()),this.autoApply&&(this.calculateChosenLabel(),this.clickApply())}this.singleDatePicker&&(this.setEndDate(this.startDate),this.timePicker||this.clickApply()),this.updateView(),e.stopPropagation()}},calculateChosenLabel:function(){var e=!0,t=0;for(var i in this.ranges){if(this.timePicker){var n=this.timePickerSeconds?"YYYY-MM-DD hh:mm:ss":"YYYY-MM-DD hh:mm";if(this.startDate.format(n)==this.ranges[i][0].format(n)&&this.endDate.format(n)==this.ranges[i][1].format(n)){e=!1,this.chosenLabel=this.container.find(".ranges li:eq("+t+")").addClass("active").html();break}}else if(this.startDate.format("YYYY-MM-DD")==this.ranges[i][0].format("YYYY-MM-DD")&&this.endDate.format("YYYY-MM-DD")==this.ranges[i][1].format("YYYY-MM-DD")){e=!1,this.chosenLabel=this.container.find(".ranges li:eq("+t+")").addClass("active").html();break}t++}e&&(this.showCustomRangeLabel?this.chosenLabel=this.container.find(".ranges li:last").addClass("active").html():this.chosenLabel=null,this.showCalendars())},clickApply:function(e){this.hide(),this.element.trigger("apply.daterangepicker",this)},clickCancel:function(e){this.startDate=this.oldStartDate,this.endDate=this.oldEndDate,this.hide(),this.element.trigger("cancel.daterangepicker",this)},monthOrYearChanged:function(e){var t=R(e.target).closest(".calendar").hasClass("left"),i=t?"left":"right",n=this.container.find(".calendar."+i),s=parseInt(n.find(".monthselect").val(),10),r=n.find(".yearselect").val();t||(r<this.startDate.year()||r==this.startDate.year()&&s<this.startDate.month())&&(s=this.startDate.month(),r=this.startDate.year()),this.minDate&&(r<this.minDate.year()||r==this.minDate.year()&&s<this.minDate.month())&&(s=this.minDate.month(),r=this.minDate.year()),this.maxDate&&(r>this.maxDate.year()||r==this.maxDate.year()&&s>this.maxDate.month())&&(s=this.maxDate.month(),r=this.maxDate.year()),t?(this.leftCalendar.month.month(s).year(r),this.linkedCalendars&&(this.rightCalendar.month=this.leftCalendar.month.clone().add(1,"month"))):(this.rightCalendar.month.month(s).year(r),this.linkedCalendars&&(this.leftCalendar.month=this.rightCalendar.month.clone().subtract(1,"month"))),this.updateCalendars()},timeChanged:function(e){var t=R(e.target).closest(".calendar"),i=t.hasClass("left"),n=parseInt(t.find(".hourselect").val(),10),s=parseInt(t.find(".minuteselect").val(),10),r=this.timePickerSeconds?parseInt(t.find(".secondselect").val(),10):0;if(!this.timePicker24Hour){var o=t.find(".ampmselect").val();"PM"===o&&n<12&&(n+=12),"AM"===o&&12===n&&(n=0)}if(i){var a=this.startDate.clone();a.hour(n),a.minute(s),a.second(r),this.setStartDate(a),this.singleDatePicker?this.endDate=this.startDate.clone():this.endDate&&this.endDate.format("YYYY-MM-DD")==a.format("YYYY-MM-DD")&&this.endDate.isBefore(a)&&this.setEndDate(a.clone())}else if(this.endDate){var l=this.endDate.clone();l.hour(n),l.minute(s),l.second(r),this.setEndDate(l)}this.updateCalendars(),this.updateFormInputs(),this.renderTimePicker("left"),this.renderTimePicker("right")},formInputsChanged:function(e){var t=R(e.target).closest(".calendar").hasClass("right"),i=W(this.container.find('input[name="daterangepicker_start"]').val(),this.locale.format),n=W(this.container.find('input[name="daterangepicker_end"]').val(),this.locale.format);i.isValid()&&n.isValid()&&(t&&n.isBefore(i)&&(i=n.clone()),this.setStartDate(i),this.setEndDate(n),t?this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format)):this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format))),this.updateView()},formInputsFocused:function(e){this.container.find('input[name="daterangepicker_start"], input[name="daterangepicker_end"]').removeClass("active"),R(e.target).addClass("active"),R(e.target).closest(".calendar").hasClass("right")&&(this.endDate=null,this.setStartDate(this.startDate.clone()),this.updateView())},formInputsBlurred:function(e){if(!this.endDate){var t=this.container.find('input[name="daterangepicker_end"]').val(),i=W(t,this.locale.format);i.isValid()&&(this.setEndDate(i),this.updateView())}},formInputsKeydown:function(e){13===e.keyCode&&(e.preventDefault(),this.formInputsChanged(e))},elementChanged:function(){if(this.element.is("input")&&this.element.val().length){var e=this.element.val().split(this.locale.separator),t=null,i=null;2===e.length&&(t=W(e[0],this.locale.format),i=W(e[1],this.locale.format)),(this.singleDatePicker||null===t||null===i)&&(i=t=W(this.element.val(),this.locale.format)),t.isValid()&&i.isValid()&&(this.setStartDate(t),this.setEndDate(i),this.updateView())}},keydown:function(e){9!==e.keyCode&&13!==e.keyCode||this.hide(),27===e.keyCode&&(e.preventDefault(),e.stopPropagation(),this.hide())},updateElement:function(){this.element.is("input")&&!this.singleDatePicker&&this.autoUpdateInput?(this.element.val(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format)),this.element.trigger("change")):this.element.is("input")&&this.autoUpdateInput&&(this.element.val(this.startDate.format(this.locale.format)),this.element.trigger("change"))},remove:function(){this.container.remove(),this.element.off(".daterangepicker"),this.element.removeData()}},R.fn.daterangepicker=function(e,t){var i=R.extend(!0,{},R.fn.daterangepicker.defaultOptions,e);return this.each(function(){var e=R(this);e.data("daterangepicker")&&e.data("daterangepicker").remove(),e.data("daterangepicker",new n(e,i,t))}),this},n}),function(U){var V={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,wrapperClass:"bx-wrapper",touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,ariaLive:!0,ariaHidden:!0,keyboardEnabled:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",stopAutoOnClick:!1,autoHover:!1,autoDelay:0,autoSlideForOnePage:!1,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,shrinkItems:!1,onSliderLoad:function(){return!0},onSlideBefore:function(){return!0},onSlideAfter:function(){return!0},onSlideNext:function(){return!0},onSlidePrev:function(){return!0},onSliderResize:function(){return!0}};U.fn.bxSlider=function(t){if(0===this.length)return this;if(1<this.length)return this.each(function(){U(this).bxSlider(t)}),this;var h={},u=this,n=U(window).width(),s=U(window).height();if(!U(u).data("bxSlider")){var r=function(){U(u).data("bxSlider")||(h.settings=U.extend({},V,t),h.settings.slideWidth=parseInt(h.settings.slideWidth),h.children=u.children(h.settings.slideSelector),h.children.length<h.settings.minSlides&&(h.settings.minSlides=h.children.length),h.children.length<h.settings.maxSlides&&(h.settings.maxSlides=h.children.length),h.settings.randomStart&&(h.settings.startSlide=Math.floor(Math.random()*h.children.length)),h.active={index:h.settings.startSlide},h.carousel=1<h.settings.minSlides||1<h.settings.maxSlides,h.carousel&&(h.settings.preloadImages="all"),h.minThreshold=h.settings.minSlides*h.settings.slideWidth+(h.settings.minSlides-1)*h.settings.slideMargin,h.maxThreshold=h.settings.maxSlides*h.settings.slideWidth+(h.settings.maxSlides-1)*h.settings.slideMargin,h.working=!1,h.controls={},h.interval=null,h.animProp="vertical"===h.settings.mode?"top":"left",h.usingCSS=h.settings.useCSS&&"fade"!==h.settings.mode&&function(){for(var e=document.createElement("div"),t=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"],i=0;i<t.length;i++)if(void 0!==e.style[t[i]])return h.cssPrefix=t[i].replace("Perspective","").toLowerCase(),h.animProp="-"+h.cssPrefix+"-transform",!0;return!1}(),"vertical"===h.settings.mode&&(h.settings.maxSlides=h.settings.minSlides),u.data("origStyle",u.attr("style")),u.children(h.settings.slideSelector).each(function(){U(this).data("origStyle",U(this).attr("style"))}),e())},e=function(){var e=h.children.eq(h.settings.startSlide);u.wrap('<div class="'+h.settings.wrapperClass+'"><div class="bx-viewport"></div></div>'),h.viewport=u.parent(),h.settings.ariaLive&&!h.settings.ticker&&h.viewport.attr("aria-live","polite"),h.loader=U('<div class="bx-loading" />'),h.viewport.prepend(h.loader),u.css({width:"horizontal"===h.settings.mode?1e3*h.children.length+215+"%":"auto",position:"relative"}),h.usingCSS&&h.settings.easing?u.css("-"+h.cssPrefix+"-transition-timing-function",h.settings.easing):h.settings.easing||(h.settings.easing="swing"),h.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),h.viewport.parent().css({maxWidth:l()}),h.children.css({float:"horizontal"===h.settings.mode?"left":"none",listStyle:"none",position:"relative"}),h.children.css("width",c()),"horizontal"===h.settings.mode&&0<h.settings.slideMargin&&h.children.css("marginRight",h.settings.slideMargin),"vertical"===h.settings.mode&&0<h.settings.slideMargin&&h.children.css("marginBottom",h.settings.slideMargin),"fade"===h.settings.mode&&(h.children.css({position:"absolute",zIndex:0,display:"none"}),h.children.eq(h.settings.startSlide).css({zIndex:h.settings.slideZIndex,display:"block"})),h.controls.el=U('<div class="bx-controls" />'),h.settings.captions&&S(),h.active.last=h.settings.startSlide===m()-1,h.settings.video&&u.fitVids(),("all"===h.settings.preloadImages||h.settings.ticker)&&(e=h.children),h.settings.ticker?h.settings.pager=!1:(h.settings.controls&&b(),h.settings.auto&&h.settings.autoControls&&_(),h.settings.pager&&w(),(h.settings.controls||h.settings.autoControls||h.settings.pager)&&h.viewport.after(h.controls.el)),o(e,a)},o=function(e,t){var i=e.find('img:not([src=""]), iframe').length,n=0;0!==i?e.find('img:not([src=""]), iframe').each(function(){U(this).one("load error",function(){++n===i&&t()}).each(function(){this.complete&&U(this).trigger("load")})}):t()},a=function(){if(h.settings.infiniteLoop&&"fade"!==h.settings.mode&&!h.settings.ticker){var e="vertical"===h.settings.mode?h.settings.minSlides:h.settings.maxSlides,t=h.children.slice(0,e).clone(!0).addClass("bx-clone"),i=h.children.slice(-e).clone(!0).addClass("bx-clone");h.settings.ariaHidden&&(t.attr("aria-hidden",!0),i.attr("aria-hidden",!0)),u.append(t).prepend(i)}h.loader.remove(),g(),"vertical"===h.settings.mode&&(h.settings.adaptiveHeight=!0),h.viewport.height(f()),u.redrawSlider(),h.settings.onSliderLoad.call(u,h.active.index),h.initialized=!0,h.settings.responsive&&U(window).bind("resize",H),h.settings.auto&&h.settings.autoStart&&(1<m()||h.settings.autoSlideForOnePage)&&A(),h.settings.ticker&&O(),h.settings.pager&&E(h.settings.startSlide),h.settings.controls&&P(),h.settings.touchEnabled&&!h.settings.ticker&&N(),h.settings.keyboardEnabled&&!h.settings.ticker&&U(document).keydown(L)},f=function(){var t=0,e=U();if("vertical"===h.settings.mode||h.settings.adaptiveHeight)if(h.carousel){var n=1===h.settings.moveSlides?h.active.index:h.active.index*p();for(e=h.children.eq(n),i=1;i<=h.settings.maxSlides-1;i++)e=n+i>=h.children.length?e.add(h.children.eq(i-1)):e.add(h.children.eq(n+i))}else e=h.children.eq(h.active.index);else e=h.children;return"vertical"===h.settings.mode?(e.each(function(e){t+=U(this).outerHeight()}),0<h.settings.slideMargin&&(t+=h.settings.slideMargin*(h.settings.minSlides-1))):t=Math.max.apply(Math,e.map(function(){return U(this).outerHeight(!1)}).get()),"border-box"===h.viewport.css("box-sizing")?t+=parseFloat(h.viewport.css("padding-top"))+parseFloat(h.viewport.css("padding-bottom"))+parseFloat(h.viewport.css("border-top-width"))+parseFloat(h.viewport.css("border-bottom-width")):"padding-box"===h.viewport.css("box-sizing")&&(t+=parseFloat(h.viewport.css("padding-top"))+parseFloat(h.viewport.css("padding-bottom"))),t},l=function(){var e="100%";return 0<h.settings.slideWidth&&(e="horizontal"===h.settings.mode?h.settings.maxSlides*h.settings.slideWidth+(h.settings.maxSlides-1)*h.settings.slideMargin:h.settings.slideWidth),e},c=function(){var e=h.settings.slideWidth,t=h.viewport.width();if(0===h.settings.slideWidth||h.settings.slideWidth>t&&!h.carousel||"vertical"===h.settings.mode)e=t;else if(1<h.settings.maxSlides&&"horizontal"===h.settings.mode){if(t>h.maxThreshold)return e;t<h.minThreshold?e=(t-h.settings.slideMargin*(h.settings.minSlides-1))/h.settings.minSlides:h.settings.shrinkItems&&(e=Math.floor((t+h.settings.slideMargin)/Math.ceil((t+h.settings.slideMargin)/(e+h.settings.slideMargin))-h.settings.slideMargin))}return e},d=function(){var e=1,t=null;return"horizontal"===h.settings.mode&&0<h.settings.slideWidth?h.viewport.width()<h.minThreshold?e=h.settings.minSlides:h.viewport.width()>h.maxThreshold?e=h.settings.maxSlides:(t=h.children.first().width()+h.settings.slideMargin,e=Math.floor((h.viewport.width()+h.settings.slideMargin)/t)):"vertical"===h.settings.mode&&(e=h.settings.minSlides),e},m=function(){var e=0,t=0,i=0;if(0<h.settings.moveSlides)if(h.settings.infiniteLoop)e=Math.ceil(h.children.length/p());else for(;t<h.children.length;)++e,t=i+d(),i+=h.settings.moveSlides<=d()?h.settings.moveSlides:d();else e=Math.ceil(h.children.length/d());return e},p=function(){return 0<h.settings.moveSlides&&h.settings.moveSlides<=d()?h.settings.moveSlides:d()},g=function(){var e,t,i;h.children.length>h.settings.maxSlides&&h.active.last&&!h.settings.infiniteLoop?"horizontal"===h.settings.mode?(e=(t=h.children.last()).position(),v(-(e.left-(h.viewport.width()-t.outerWidth())),"reset",0)):"vertical"===h.settings.mode&&(i=h.children.length-h.settings.minSlides,e=h.children.eq(i).position(),v(-e.top,"reset",0)):(e=h.children.eq(h.active.index*p()).position(),h.active.index===m()-1&&(h.active.last=!0),void 0!==e&&("horizontal"===h.settings.mode?v(-e.left,"reset",0):"vertical"===h.settings.mode&&v(-e.top,"reset",0)))},v=function(e,t,i,n){var s,r;h.usingCSS?(r="vertical"===h.settings.mode?"translate3d(0, "+e+"px, 0)":"translate3d("+e+"px, 0, 0)",u.css("-"+h.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"===t?(u.css(h.animProp,r),0!==i?u.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(e){U(e.target).is(u)&&(u.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),I())}):I()):"reset"===t?u.css(h.animProp,r):"ticker"===t&&(u.css("-"+h.cssPrefix+"-transition-timing-function","linear"),u.css(h.animProp,r),0!==i?u.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(e){U(e.target).is(u)&&(u.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),v(n.resetValue,"reset",0),Y())}):(v(n.resetValue,"reset",0),Y()))):((s={})[h.animProp]=e,"slide"===t?u.animate(s,i,h.settings.easing,function(){I()}):"reset"===t?u.css(h.animProp,e):"ticker"===t&&u.animate(s,i,"linear",function(){v(n.resetValue,"reset",0),Y()}))},y=function(){for(var e="",t="",i=m(),n=0;n<i;n++)t="",h.settings.buildPager&&U.isFunction(h.settings.buildPager)||h.settings.pagerCustom?(t=h.settings.buildPager(n),h.pagerEl.addClass("bx-custom-pager")):(t=n+1,h.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+n+'" class="bx-pager-link">'+t+"</a></div>";h.pagerEl.html(e)},w=function(){h.settings.pagerCustom?h.pagerEl=U(h.settings.pagerCustom):(h.pagerEl=U('<div class="bx-pager" />'),h.settings.pagerSelector?U(h.settings.pagerSelector).html(h.pagerEl):h.controls.el.addClass("bx-has-pager").append(h.pagerEl),y()),h.pagerEl.on("click touchend","a",T)},b=function(){h.controls.next=U('<a class="bx-next" href="">'+h.settings.nextText+"</a>"),h.controls.prev=U('<a class="bx-prev" href="">'+h.settings.prevText+"</a>"),h.controls.next.bind("click touchend",x),h.controls.prev.bind("click touchend",D),h.settings.nextSelector&&U(h.settings.nextSelector).append(h.controls.next),h.settings.prevSelector&&U(h.settings.prevSelector).append(h.controls.prev),h.settings.nextSelector||h.settings.prevSelector||(h.controls.directionEl=U('<div class="bx-controls-direction" />'),h.controls.directionEl.append(h.controls.prev).append(h.controls.next),h.controls.el.addClass("bx-has-controls-direction").append(h.controls.directionEl))},_=function(){h.controls.start=U('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+h.settings.startText+"</a></div>"),h.controls.stop=U('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+h.settings.stopText+"</a></div>"),h.controls.autoEl=U('<div class="bx-controls-auto" />'),h.controls.autoEl.on("click",".bx-start",k),h.controls.autoEl.on("click",".bx-stop",C),h.settings.autoControlsCombine?h.controls.autoEl.append(h.controls.start):h.controls.autoEl.append(h.controls.start).append(h.controls.stop),h.settings.autoControlsSelector?U(h.settings.autoControlsSelector).html(h.controls.autoEl):h.controls.el.addClass("bx-has-controls-auto").append(h.controls.autoEl),M(h.settings.autoStart?"stop":"start")},S=function(){h.children.each(function(e){var t=U(this).find("img:first").attr("title");void 0!==t&&(""+t).length&&U(this).append('<div class="bx-caption"><span>'+t+"</span></div>")})},x=function(e){e.preventDefault(),h.controls.el.hasClass("disabled")||(h.settings.auto&&h.settings.stopAutoOnClick&&u.stopAuto(),u.goToNextSlide())},D=function(e){e.preventDefault(),h.controls.el.hasClass("disabled")||(h.settings.auto&&h.settings.stopAutoOnClick&&u.stopAuto(),u.goToPrevSlide())},k=function(e){u.startAuto(),e.preventDefault()},C=function(e){u.stopAuto(),e.preventDefault()},T=function(e){var t,i;e.preventDefault(),h.controls.el.hasClass("disabled")||(h.settings.auto&&h.settings.stopAutoOnClick&&u.stopAuto(),void 0!==(t=U(e.currentTarget)).attr("data-slide-index")&&(i=parseInt(t.attr("data-slide-index")))!==h.active.index&&u.goToSlide(i))},E=function(i){var e=h.children.length;if("short"===h.settings.pagerType)return 1<h.settings.maxSlides&&(e=Math.ceil(h.children.length/h.settings.maxSlides)),void h.pagerEl.html(i+1+h.settings.pagerShortSeparator+e);h.pagerEl.find("a").removeClass("active"),h.pagerEl.each(function(e,t){U(t).find("a").eq(i).addClass("active")})},I=function(){if(h.settings.infiniteLoop){var e="";0===h.active.index?e=h.children.eq(0).position():h.active.index===m()-1&&h.carousel?e=h.children.eq((m()-1)*p()).position():h.active.index===h.children.length-1&&(e=h.children.eq(h.children.length-1).position()),e&&("horizontal"===h.settings.mode?v(-e.left,"reset",0):"vertical"===h.settings.mode&&v(-e.top,"reset",0))}h.working=!1,h.settings.onSlideAfter.call(u,h.children.eq(h.active.index),h.oldIndex,h.active.index)},M=function(e){h.settings.autoControlsCombine?h.controls.autoEl.html(h.controls[e]):(h.controls.autoEl.find("a").removeClass("active"),h.controls.autoEl.find("a:not(.bx-"+e+")").addClass("active"))},P=function(){1===m()?(h.controls.prev.addClass("disabled"),h.controls.next.addClass("disabled")):!h.settings.infiniteLoop&&h.settings.hideControlOnEnd&&(0===h.active.index?(h.controls.prev.addClass("disabled"),h.controls.next.removeClass("disabled")):h.active.index===m()-1?(h.controls.next.addClass("disabled"),h.controls.prev.removeClass("disabled")):(h.controls.prev.removeClass("disabled"),h.controls.next.removeClass("disabled")))},A=function(){if(0<h.settings.autoDelay)setTimeout(u.startAuto,h.settings.autoDelay);else u.startAuto(),U(window).focus(function(){u.startAuto()}).blur(function(){u.stopAuto()});h.settings.autoHover&&u.hover(function(){h.interval&&(u.stopAuto(!0),h.autoPaused=!0)},function(){h.autoPaused&&(u.startAuto(!0),h.autoPaused=null)})},O=function(){var e,t,i,n,s,r,o,a,l=0;"next"===h.settings.autoDirection?u.append(h.children.clone().addClass("bx-clone")):(u.prepend(h.children.clone().addClass("bx-clone")),e=h.children.first().position(),l="horizontal"===h.settings.mode?-e.left:-e.top),v(l,"reset",0),h.settings.pager=!1,h.settings.controls=!1,h.settings.autoControls=!1,h.settings.tickerHover&&(h.usingCSS?(n="horizontal"===h.settings.mode?4:5,h.viewport.hover(function(){t=u.css("-"+h.cssPrefix+"-transform"),i=parseFloat(t.split(",")[n]),v(i,"reset",0)},function(){a=0,h.children.each(function(e){a+="horizontal"===h.settings.mode?U(this).outerWidth(!0):U(this).outerHeight(!0)}),s=h.settings.speed/a,r="horizontal"===h.settings.mode?"left":"top",o=s*(a-Math.abs(parseInt(i))),Y(o)})):h.viewport.hover(function(){u.stop()},function(){a=0,h.children.each(function(e){a+="horizontal"===h.settings.mode?U(this).outerWidth(!0):U(this).outerHeight(!0)}),s=h.settings.speed/a,r="horizontal"===h.settings.mode?"left":"top",o=s*(a-Math.abs(parseInt(u.css(r)))),Y(o)})),Y()},Y=function(e){var t,i,n=e||h.settings.speed,s={left:0,top:0},r={left:0,top:0};"next"===h.settings.autoDirection?s=u.find(".bx-clone").first().position():r=h.children.first().position(),t="horizontal"===h.settings.mode?-s.left:-s.top,i="horizontal"===h.settings.mode?-r.left:-r.top,v(t,"ticker",n,{resetValue:i})},L=function(e){var t,i,n,s,r=document.activeElement.tagName.toLowerCase();if(null==new RegExp(r,["i"]).exec("input|textarea")&&(t=u,i=U(window),n={top:i.scrollTop(),left:i.scrollLeft()},s=t.offset(),n.right=n.left+i.width(),n.bottom=n.top+i.height(),s.right=s.left+t.outerWidth(),s.bottom=s.top+t.outerHeight(),!(n.right<s.left||n.left>s.right||n.bottom<s.top||n.top>s.bottom))){if(39===e.keyCode)return x(e),!1;if(37===e.keyCode)return D(e),!1}},N=function(){h.touch={start:{x:0,y:0},end:{x:0,y:0}},h.viewport.bind("touchstart MSPointerDown pointerdown",F),h.viewport.on("click",".bxslider a",function(e){h.viewport.hasClass("click-disabled")&&(e.preventDefault(),h.viewport.removeClass("click-disabled"))})},F=function(e){if(h.controls.el.addClass("disabled"),h.working)e.preventDefault(),h.controls.el.removeClass("disabled");else{h.touch.originalPos=u.position();var t=e.originalEvent,i=void 0!==t.changedTouches?t.changedTouches:[t];h.touch.start.x=i[0].pageX,h.touch.start.y=i[0].pageY,h.viewport.get(0).setPointerCapture&&(h.pointerId=t.pointerId,h.viewport.get(0).setPointerCapture(h.pointerId)),h.viewport.bind("touchmove MSPointerMove pointermove",W),h.viewport.bind("touchend MSPointerUp pointerup",R),h.viewport.bind("MSPointerCancel pointercancel",z)}},z=function(e){v(h.touch.originalPos.left,"reset",0),h.controls.el.removeClass("disabled"),h.viewport.unbind("MSPointerCancel pointercancel",z),h.viewport.unbind("touchmove MSPointerMove pointermove",W),h.viewport.unbind("touchend MSPointerUp pointerup",R),h.viewport.get(0).releasePointerCapture&&h.viewport.get(0).releasePointerCapture(h.pointerId)},W=function(e){var t=e.originalEvent,i=void 0!==t.changedTouches?t.changedTouches:[t],n=Math.abs(i[0].pageX-h.touch.start.x),s=Math.abs(i[0].pageY-h.touch.start.y),r=0,o=0;s<3*n&&h.settings.preventDefaultSwipeX?e.preventDefault():n<3*s&&h.settings.preventDefaultSwipeY&&e.preventDefault(),"fade"!==h.settings.mode&&h.settings.oneToOneTouch&&("horizontal"===h.settings.mode?(o=i[0].pageX-h.touch.start.x,r=h.touch.originalPos.left+o):(o=i[0].pageY-h.touch.start.y,r=h.touch.originalPos.top+o),v(r,"reset",0))},R=function(e){h.viewport.unbind("touchmove MSPointerMove pointermove",W),h.controls.el.removeClass("disabled");var t=e.originalEvent,i=void 0!==t.changedTouches?t.changedTouches:[t],n=0,s=0;h.touch.end.x=i[0].pageX,h.touch.end.y=i[0].pageY,"fade"===h.settings.mode?(s=Math.abs(h.touch.start.x-h.touch.end.x))>=h.settings.swipeThreshold&&(h.touch.start.x>h.touch.end.x?u.goToNextSlide():u.goToPrevSlide(),u.stopAuto()):("horizontal"===h.settings.mode?(s=h.touch.end.x-h.touch.start.x,n=h.touch.originalPos.left):(s=h.touch.end.y-h.touch.start.y,n=h.touch.originalPos.top),!h.settings.infiniteLoop&&(0===h.active.index&&0<s||h.active.last&&s<0)?v(n,"reset",200):Math.abs(s)>=h.settings.swipeThreshold?(s<0?u.goToNextSlide():u.goToPrevSlide(),u.stopAuto()):v(n,"reset",200)),h.viewport.unbind("touchend MSPointerUp pointerup",R),h.viewport.get(0).releasePointerCapture&&h.viewport.get(0).releasePointerCapture(h.pointerId)},H=function(e){if(h.initialized)if(h.working)window.setTimeout(H,10);else{var t=U(window).width(),i=U(window).height();n===t&&s===i||(n=t,s=i,u.redrawSlider(),h.settings.onSliderResize.call(u,h.active.index))}},j=function(e){var t=d();h.settings.ariaHidden&&!h.settings.ticker&&(h.children.attr("aria-hidden","true"),h.children.slice(e,e+t).attr("aria-hidden","false"))};return u.goToSlide=function(e,t){var i,n,s,r,o,a=!0,l=0,c={left:0,top:0},d=null;if(h.oldIndex=h.active.index,h.active.index=(o=e)<0?h.settings.infiniteLoop?m()-1:h.active.index:o>=m()?h.settings.infiniteLoop?0:h.active.index:o,!h.working&&h.active.index!==h.oldIndex){if(h.working=!0,void 0!==(a=h.settings.onSlideBefore.call(u,h.children.eq(h.active.index),h.oldIndex,h.active.index))&&!a)return h.active.index=h.oldIndex,void(h.working=!1);"next"===t?h.settings.onSlideNext.call(u,h.children.eq(h.active.index),h.oldIndex,h.active.index)||(a=!1):"prev"===t&&(h.settings.onSlidePrev.call(u,h.children.eq(h.active.index),h.oldIndex,h.active.index)||(a=!1)),h.active.last=h.active.index>=m()-1,(h.settings.pager||h.settings.pagerCustom)&&E(h.active.index),h.settings.controls&&P(),"fade"===h.settings.mode?(h.settings.adaptiveHeight&&h.viewport.height()!==f()&&h.viewport.animate({height:f()},h.settings.adaptiveHeightSpeed),h.children.filter(":visible").fadeOut(h.settings.speed).css({zIndex:0}),h.children.eq(h.active.index).css("zIndex",h.settings.slideZIndex+1).fadeIn(h.settings.speed,function(){U(this).css("zIndex",h.settings.slideZIndex),I()})):(h.settings.adaptiveHeight&&h.viewport.height()!==f()&&h.viewport.animate({height:f()},h.settings.adaptiveHeightSpeed),!h.settings.infiniteLoop&&h.carousel&&h.active.last?"horizontal"===h.settings.mode?(c=(d=h.children.eq(h.children.length-1)).position(),l=h.viewport.width()-d.outerWidth()):(i=h.children.length-h.settings.minSlides,c=h.children.eq(i).position()):h.carousel&&h.active.last&&"prev"===t?(n=1===h.settings.moveSlides?h.settings.maxSlides-p():(m()-1)*p()-(h.children.length-h.settings.maxSlides),c=(d=u.children(".bx-clone").eq(n)).position()):"next"===t&&0===h.active.index?(c=u.find("> .bx-clone").eq(h.settings.maxSlides).position(),h.active.last=!1):0<=e&&(r=e*parseInt(p()),c=h.children.eq(r).position()),void 0!==c?(s="horizontal"===h.settings.mode?-(c.left-l):-c.top,v(s,"slide",h.settings.speed)):h.working=!1),h.settings.ariaHidden&&j(h.active.index*p())}},u.goToNextSlide=function(){if(h.settings.infiniteLoop||!h.active.last){var e=parseInt(h.active.index)+1;u.goToSlide(e,"next")}},u.goToPrevSlide=function(){if(h.settings.infiniteLoop||0!==h.active.index){var e=parseInt(h.active.index)-1;u.goToSlide(e,"prev")}},u.startAuto=function(e){h.interval||(h.interval=setInterval(function(){"next"===h.settings.autoDirection?u.goToNextSlide():u.goToPrevSlide()},h.settings.pause),h.settings.autoControls&&!0!==e&&M("stop"))},u.stopAuto=function(e){h.interval&&(clearInterval(h.interval),h.interval=null,h.settings.autoControls&&!0!==e&&M("start"))},u.getCurrentSlide=function(){return h.active.index},u.getCurrentSlideElement=function(){return h.children.eq(h.active.index)},u.getSlideElement=function(e){return h.children.eq(e)},u.getSlideCount=function(){return h.children.length},u.isWorking=function(){return h.working},u.redrawSlider=function(){h.children.add(u.find(".bx-clone")).outerWidth(c()),h.viewport.css("height",f()),h.settings.ticker||g(),h.active.last&&(h.active.index=m()-1),h.active.index>=m()&&(h.active.last=!0),h.settings.pager&&!h.settings.pagerCustom&&(y(),E(h.active.index)),h.settings.ariaHidden&&j(h.active.index*p())},u.destroySlider=function(){h.initialized&&(h.initialized=!1,U(".bx-clone",this).remove(),h.children.each(function(){void 0!==U(this).data("origStyle")?U(this).attr("style",U(this).data("origStyle")):U(this).removeAttr("style")}),void 0!==U(this).data("origStyle")?this.attr("style",U(this).data("origStyle")):U(this).removeAttr("style"),U(this).unwrap().unwrap(),h.controls.el&&h.controls.el.remove(),h.controls.next&&h.controls.next.remove(),h.controls.prev&&h.controls.prev.remove(),h.pagerEl&&h.settings.controls&&!h.settings.pagerCustom&&h.pagerEl.remove(),U(".bx-caption",this).remove(),h.controls.autoEl&&h.controls.autoEl.remove(),clearInterval(h.interval),h.settings.responsive&&U(window).unbind("resize",H),h.settings.keyboardEnabled&&U(document).unbind("keydown",L),U(this).removeData("bxSlider"))},u.reloadSlider=function(e){void 0!==e&&(t=e),u.destroySlider(),r(),U(u).data("bxSlider",this)},r(),U(u).data("bxSlider",this),this}}}(jQuery),function(n){n.scrollTo=n.fn.scrollTo=function(e,t,i){return this instanceof n?(i=n.extend({},{gap:{x:0,y:0},animation:{easing:"swing",duration:600,complete:n.noop,step:n.noop}},i),this.each(function(){n(this).stop().animate({scrollLeft:isNaN(Number(e))?n(e).offset().left+i.gap.x:e,scrollTop:isNaN(Number(t))?n(t).offset().top+i.gap.y:t},i.animation)})):n.fn.scrollTo.apply(n("html, body"),arguments)}}(jQuery),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(c){c.extend(c.fn,{validate:function(e){if(this.length){var i=c.data(this[0],"validator");return i||(this.attr("novalidate","novalidate"),i=new c.validator(e,this[0]),c.data(this[0],"validator",i),i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(e){i.settings.submitHandler&&(i.submitButton=e.target),c(e.target).hasClass("cancel")&&(i.cancelSubmit=!0),void 0!==c(e.target).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.submit(function(t){function e(){var e;return!i.settings.submitHandler||(i.submitButton&&(e=c("<input type='hidden'/>").attr("name",i.submitButton.name).val(c(i.submitButton).val()).appendTo(i.currentForm)),i.settings.submitHandler.call(i,i.currentForm,t),i.submitButton&&e.remove(),!1)}return i.settings.debug&&t.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,e()):i.form()?i.pendingRequest?(i.formSubmitted=!0,!1):e():(i.focusInvalid(),!1)})),i)}e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.")},valid:function(){var e,t;return c(this[0]).is("form")?e=this.validate().form():(e=!0,t=c(this[0].form).validate(),this.each(function(){e=t.element(this)&&e})),e},removeAttrs:function(e){var i={},n=this;return c.each(e.split(/\s/),function(e,t){i[t]=n.attr(t),n.removeAttr(t)}),i},rules:function(e,t){var i,n,s,r,o,a,l=this[0];if(e)switch(n=(i=c.data(l.form,"validator").settings).rules,s=c.validator.staticRules(l),e){case"add":c.extend(s,c.validator.normalizeRule(t)),delete s.messages,n[l.name]=s,t.messages&&(i.messages[l.name]=c.extend(i.messages[l.name],t.messages));break;case"remove":return t?(a={},c.each(t.split(/\s/),function(e,t){a[t]=s[t],delete s[t],"required"===t&&c(l).removeAttr("aria-required")}),a):(delete n[l.name],s)}return(r=c.validator.normalizeRules(c.extend({},c.validator.classRules(l),c.validator.attributeRules(l),c.validator.dataRules(l),c.validator.staticRules(l)),l)).required&&(o=r.required,delete r.required,r=c.extend({required:o},r),c(l).attr("aria-required","true")),r.remote&&(o=r.remote,delete r.remote,r=c.extend(r,{remote:o})),r}}),c.extend(c.expr[":"],{blank:function(e){return!c.trim(""+c(e).val())},filled:function(e){return!!c.trim(""+c(e).val())},unchecked:function(e){return!c(e).prop("checked")}}),c.validator=function(e,t){this.settings=c.extend(!0,{},c.validator.defaults,e),this.currentForm=t,this.init()},c.validator.format=function(i,e){return 1===arguments.length?function(){var e=c.makeArray(arguments);return e.unshift(i),c.validator.format.apply(this,e)}:(2<arguments.length&&e.constructor!==Array&&(e=c.makeArray(arguments).slice(1)),e.constructor!==Array&&(e=[e]),c.each(e,function(e,t){i=i.replace(new RegExp("\\{"+e+"\\}","g"),function(){return t})}),i)},c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(e){this.lastActive=e,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,e,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(e)))},onfocusout:function(e){this.checkable(e)||!(e.name in this.submitted)&&this.optional(e)||this.element(e)},onkeyup:function(e,t){9===t.which&&""===this.elementValue(e)||(e.name in this.submitted||e===this.lastElement)&&this.element(e)},onclick:function(e){e.name in this.submitted?this.element(e):e.parentNode.name in this.submitted&&this.element(e.parentNode)},highlight:function(e,t,i){"radio"===e.type?this.findByName(e.name).addClass(t).removeClass(i):c(e).addClass(t).removeClass(i)},unhighlight:function(e,t,i){"radio"===e.type?this.findByName(e.name).removeClass(t).addClass(i):c(e).removeClass(t).addClass(i)}},setDefaults:function(e){c.extend(c.validator.defaults,e)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:c.validator.format("Please enter no more than {0} characters."),minlength:c.validator.format("Please enter at least {0} characters."),rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){this.labelContainer=c(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||c(this.currentForm),this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var i,n=this.groups={};function e(e){var t=c.data(this[0].form,"validator"),i="on"+e.type.replace(/^validate/,""),n=t.settings;n[i]&&!this.is(n.ignore)&&n[i].call(t,this[0],e)}c.each(this.settings.groups,function(i,e){"string"==typeof e&&(e=e.split(/\s/)),c.each(e,function(e,t){n[t]=i})}),i=this.settings.rules,c.each(i,function(e,t){i[e]=c.validator.normalizeRule(t)}),c(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",e).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",e),this.settings.invalidHandler&&c(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),c(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),c.extend(this.submitted,this.errorMap),this.invalid=c.extend({},this.errorMap),this.valid()||c(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var e=0,t=this.currentElements=this.elements();t[e];e++)this.check(t[e]);return this.valid()},element:function(e){var t=this.clean(e),i=this.validationTargetFor(t),n=!0;return void 0===(this.lastElement=i)?delete this.invalid[t.name]:(this.prepareElement(i),this.currentElements=c(i),(n=!1!==this.check(i))?delete this.invalid[i.name]:this.invalid[i.name]=!0),c(e).attr("aria-invalid",!n),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),n},showErrors:function(t){if(t){for(var e in c.extend(this.errorMap,t),this.errorList=[],t)this.errorList.push({message:t[e],element:this.findByName(e)[0]});this.successList=c.grep(this.successList,function(e){return!(e.name in t)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(e){var t,i=0;for(t in e)i++;return i},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(e){e.not(this.containers).text(""),this.addWrapper(e).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}},findLastActive:function(){var t=this.lastActive;return t&&1===c.grep(this.errorList,function(e){return e.element.name===t.name}).length&&t},elements:function(){var e=this,t={};return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),!(this.name in t||!e.objectLength(c(this).rules()))&&(t[this.name]=!0)})},clean:function(e){return c(e)[0]},errors:function(){var e=this.settings.errorClass.split(" ").join(".");return c(this.settings.errorElement+"."+e,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=c([]),this.toHide=c([]),this.currentElements=c([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(e){this.reset(),this.toHide=this.errorsFor(e)},elementValue:function(e){var t,i=c(e),n=e.type;return"radio"===n||"checkbox"===n?c("input[name='"+e.name+"']:checked").val():"number"===n&&void 0!==e.validity?!e.validity.badInput&&i.val():"string"==typeof(t=i.val())?t.replace(/\r/g,""):t},check:function(t){t=this.validationTargetFor(this.clean(t));var e,i,n,s=c(t).rules(),r=c.map(s,function(e,t){return t}).length,o=!1,a=this.elementValue(t);for(i in s){n={method:i,parameters:s[i]};try{if("dependency-mismatch"===(e=c.validator.methods[i].call(this,a,t,n.parameters))&&1===r){o=!0;continue}if(o=!1,"pending"===e)return void(this.toHide=this.toHide.not(this.errorsFor(t)));if(!e)return this.formatAndAdd(t,n),!1}catch(e){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+t.id+", check the '"+n.method+"' method.",e),e}}if(!o)return this.objectLength(s)&&this.successList.push(t),!0},customDataMessage:function(e,t){return c(e).data("msg"+t.charAt(0).toUpperCase()+t.substring(1).toLowerCase())||c(e).data("msg")},customMessage:function(e,t){var i=this.settings.messages[e];return i&&(i.constructor===String?i:i[t])},findDefined:function(){for(var e=0;e<arguments.length;e++)if(void 0!==arguments[e])return arguments[e]},defaultMessage:function(e,t){return this.findDefined(this.customMessage(e.name,t),this.customDataMessage(e,t),!this.settings.ignoreTitle&&e.title||void 0,c.validator.messages[t],"<strong>Warning: No message defined for "+e.name+"</strong>")},formatAndAdd:function(e,t){var i=this.defaultMessage(e,t.method),n=/\$?\{(\d+)\}/g;"function"==typeof i?i=i.call(this,t.parameters,e):n.test(i)&&(i=c.validator.format(i.replace(n,"{$1}"),t.parameters)),this.errorList.push({message:i,element:e,method:t.method}),this.errorMap[e.name]=i,this.submitted[e.name]=i},addWrapper:function(e){return this.settings.wrapper&&(e=e.add(e.parent(this.settings.wrapper))),e},defaultShowErrors:function(){var e,t,i;for(e=0;this.errorList[e];e++)i=this.errorList[e],this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(e=0;this.successList[e];e++)this.showLabel(this.successList[e]);if(this.settings.unhighlight)for(e=0,t=this.validElements();t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(e,t){var i,n,s,r=this.errorsFor(e),o=this.idOrName(e),a=c(e).attr("aria-describedby");r.length?(r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),r.html(t)):(i=r=c("<"+this.settings.errorElement+">").attr("id",o+"-error").addClass(this.settings.errorClass).html(t||""),this.settings.wrapper&&(i=r.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(i):this.settings.errorPlacement?this.settings.errorPlacement(i,c(e)):i.insertAfter(e),r.is("label")?r.attr("for",o):0===r.parents("label[for='"+o+"']").length&&(s=r.attr("id"),a?a.match(new RegExp("\b"+s+"\b"))||(a+=" "+s):a=s,c(e).attr("aria-describedby",a),(n=this.groups[e.name])&&c.each(this.groups,function(e,t){t===n&&c("[name='"+e+"']",this.currentForm).attr("aria-describedby",r.attr("id"))}))),!t&&this.settings.success&&(r.text(""),"string"==typeof this.settings.success?r.addClass(this.settings.success):this.settings.success(r,e)),this.toShow=this.toShow.add(r)},errorsFor:function(e){var t=this.idOrName(e),i=c(e).attr("aria-describedby"),n="label[for='"+t+"'], label[for='"+t+"'] *";return i&&(n=n+", #"+i.replace(/\s+/g,", #")),this.errors().filter(n)},idOrName:function(e){return this.groups[e.name]||(this.checkable(e)?e.name:e.id||e.name)},validationTargetFor:function(e){return this.checkable(e)&&(e=this.findByName(e.name).not(this.settings.ignore)[0]),e},checkable:function(e){return/radio|checkbox/i.test(e.type)},findByName:function(e){return c(this.currentForm).find("[name='"+e+"']")},getLength:function(e,t){switch(t.nodeName.toLowerCase()){case"select":return c("option:selected",t).length;case"input":if(this.checkable(t))return this.findByName(t.name).filter(":checked").length}return e.length},depend:function(e,t){return!this.dependTypes[typeof e]||this.dependTypes[typeof e](e,t)},dependTypes:{boolean:function(e){return e},string:function(e,t){return!!c(e,t.form).length},function:function(e,t){return e(t)}},optional:function(e){var t=this.elementValue(e);return!c.validator.methods.required.call(this,t,e)&&"dependency-mismatch"},startRequest:function(e){this.pending[e.name]||(this.pendingRequest++,this.pending[e.name]=!0)},stopRequest:function(e,t){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[e.name],t&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(c(this.currentForm).submit(),this.formSubmitted=!1):!t&&0===this.pendingRequest&&this.formSubmitted&&(c(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(e){return c.data(e,"previousValue")||c.data(e,"previousValue",{old:null,valid:!0,message:this.defaultMessage(e,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(e,t){e.constructor===String?this.classRuleSettings[e]=t:c.extend(this.classRuleSettings,e)},classRules:function(e){var t={},i=c(e).attr("class");return i&&c.each(i.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(t,c.validator.classRuleSettings[this])}),t},attributeRules:function(e){var t,i,n={},s=c(e),r=e.getAttribute("type");for(t in c.validator.methods)"required"===t?(""===(i=e.getAttribute(t))&&(i=!0),i=!!i):i=s.attr(t),/min|max/.test(t)&&(null===r||/number|range|text/.test(r))&&(i=Number(i)),i||0===i?n[t]=i:r===t&&"range"!==r&&(n[t]=!0);return n.maxlength&&/-1|2147483647|524288/.test(n.maxlength)&&delete n.maxlength,n},dataRules:function(e){var t,i,n={},s=c(e);for(t in c.validator.methods)void 0!==(i=s.data("rule"+t.charAt(0).toUpperCase()+t.substring(1).toLowerCase()))&&(n[t]=i);return n},staticRules:function(e){var t={},i=c.data(e.form,"validator");return i.settings.rules&&(t=c.validator.normalizeRule(i.settings.rules[e.name])||{}),t},normalizeRules:function(n,s){return c.each(n,function(e,t){if(!1!==t){if(t.param||t.depends){var i=!0;switch(typeof t.depends){case"string":i=!!c(t.depends,s.form).length;break;case"function":i=t.depends.call(s,s)}i?n[e]=void 0===t.param||t.param:delete n[e]}}else delete n[e]}),c.each(n,function(e,t){n[e]=c.isFunction(t)?t(s):t}),c.each(["minlength","maxlength"],function(){n[this]&&(n[this]=Number(n[this]))}),c.each(["rangelength","range"],function(){var e;n[this]&&(c.isArray(n[this])?n[this]=[Number(n[this][0]),Number(n[this][1])]:"string"==typeof n[this]&&(e=n[this].replace(/[\[\]]/g,"").split(/[\s,]+/),n[this]=[Number(e[0]),Number(e[1])]))}),c.validator.autoCreateRanges&&(n.min&&n.max&&(n.range=[n.min,n.max],delete n.min,delete n.max),n.minlength&&n.maxlength&&(n.rangelength=[n.minlength,n.maxlength],delete n.minlength,delete n.maxlength)),n},normalizeRule:function(e){if("string"==typeof e){var t={};c.each(e.split(/\s/),function(){t[this]=!0}),e=t}return e},addMethod:function(e,t,i){c.validator.methods[e]=t,c.validator.messages[e]=void 0!==i?i:c.validator.messages[e],t.length<3&&c.validator.addClassRules(e,c.validator.normalizeRule(e))},methods:{required:function(e,t,i){if(!this.depend(i,t))return"dependency-mismatch";if("select"===t.nodeName.toLowerCase()){var n=c(t).val();return n&&0<n.length}return this.checkable(t)?0<this.getLength(e,t):0<c.trim(e).length},email:function(e,t){return this.optional(t)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)},url:function(e,t){return this.optional(t)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)},date:function(e,t){return this.optional(t)||!/Invalid|NaN/.test(new Date(e).toString())},dateISO:function(e,t){return this.optional(t)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)},number:function(e,t){return this.optional(t)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)},digits:function(e,t){return this.optional(t)||/^\d+$/.test(e)},creditcard:function(e,t){if(this.optional(t))return"dependency-mismatch";if(/[^0-9 \-]+/.test(e))return!1;var i,n,s=0,r=0,o=!1;if((e=e.replace(/\D/g,"")).length<13||19<e.length)return!1;for(i=e.length-1;0<=i;i--)n=e.charAt(i),r=parseInt(n,10),o&&9<(r*=2)&&(r-=9),s+=r,o=!o;return s%10==0},minlength:function(e,t,i){var n=c.isArray(e)?e.length:this.getLength(c.trim(e),t);return this.optional(t)||i<=n},maxlength:function(e,t,i){var n=c.isArray(e)?e.length:this.getLength(c.trim(e),t);return this.optional(t)||n<=i},rangelength:function(e,t,i){var n=c.isArray(e)?e.length:this.getLength(c.trim(e),t);return this.optional(t)||n>=i[0]&&n<=i[1]},min:function(e,t,i){return this.optional(t)||i<=e},max:function(e,t,i){return this.optional(t)||e<=i},range:function(e,t,i){return this.optional(t)||e>=i[0]&&e<=i[1]},equalTo:function(e,t,i){var n=c(i);return this.settings.onfocusout&&n.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){c(t).valid()}),e===n.val()},remote:function(r,o,e){if(this.optional(o))return"dependency-mismatch";var a,t,l=this.previousValue(o);return this.settings.messages[o.name]||(this.settings.messages[o.name]={}),l.originalMessage=this.settings.messages[o.name].remote,this.settings.messages[o.name].remote=l.message,e="string"==typeof e&&{url:e}||e,l.old===r?l.valid:(l.old=r,(a=this).startRequest(o),(t={})[o.name]=r,c.ajax(c.extend(!0,{url:e,mode:"abort",port:"validate"+o.name,dataType:"json",data:t,context:a.currentForm,success:function(e){var t,i,n,s=!0===e||"true"===e;a.settings.messages[o.name].remote=l.originalMessage,s?(n=a.formSubmitted,a.prepareElement(o),a.formSubmitted=n,a.successList.push(o),delete a.invalid[o.name],a.showErrors()):(t={},i=e||a.defaultMessage(o,"remote"),t[o.name]=l.message=c.isFunction(i)?i(r):i,a.invalid[o.name]=!0,a.showErrors(t)),l.valid=s,a.stopRequest(o,s)}},e)),"pending")}}}),c.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var n,s={};c.ajaxPrefilter?c.ajaxPrefilter(function(e,t,i){var n=e.port;"abort"===e.mode&&(s[n]&&s[n].abort(),s[n]=i)}):(n=c.ajax,c.ajax=function(e){var t=("mode"in e?e:c.ajaxSettings).mode,i=("port"in e?e:c.ajaxSettings).port;return"abort"===t?(s[i]&&s[i].abort(),s[i]=n.apply(this,arguments),s[i]):n.apply(this,arguments)}),c.extend(c.fn,{validateDelegate:function(i,e,n){return this.bind(e,function(e){var t=c(e.target);if(t.is(i))return n.apply(t,arguments)})}})}),function(d){d.fn.parallax=function(i,n,s,r){var t=d(window),o=d(window).height(),a=(t.scrollTop(),d(this));function l(e,t,i,n,s){return e+" "+Math.round(-(t+i-n)*s)+"px"}function c(e,t){a.css({backgroundPosition:l(i,t,e,n,s)})}null==i&&(i="50%"),null==n&&(n=0),null==s&&(s=.1),null==r&&(r=!0),height=a.height(),a.css({backgroundPosition:l(i,r,n,s)}),t.bind("scroll",function(){var n,e=t.scrollTop();n=e,a.each(function(){var e=d(this),t=e.offset().top;if(1==r)var i=e.outerHeight(!0);else i=e.height();n<=t+i&&t+i-o<n&&c(n,i),t<=n&&n<=t+i&&t-o<n&&n<t+i-o&&c(n,i),n<t+i&&t-o<n&&n<t&&c(n,i)}),d("#pixels").html(e)})}}(jQuery),function(a){a.fn.extend({hideMaxListItems:function(i){i=a.extend({max:3,speed:1e3,moreText:"View More",lessText:"View Less",moreHTML:'<p class="maxlist-more"><a href="#"></a></p>'},i);return this.each(function(){var n,s=i,e=a(this).children("li").length;if(0<e&&0<s.speed?(n=Math.round(s.speed/e))<1&&(n=1):n=0,0<e&&e>s.max){a(this).children("li").each(function(e){e+1>s.max&&(a(this).hide(0),a(this).addClass("maxlist-hidden"))});var t=e-s.max,r=s.moreText,o=s.lessText;0<t&&(r=r.replace("[COUNT]",t),o=o.replace("[COUNT]",t)),a(this).after(s.moreHTML),a(this).next(".maxlist-more").children("a").text(r),a(this).next(".maxlist-more").children("a").click(function(e){var t=a(this).parent().prev("ul, ol").children("li");if(t=t.slice(s.max),a(this).text()==r){a(this).text(o);var i=0;!function(){a(t[i++]||[]).slideToggle(n,arguments.callee)}()}else{a(this).text(r);i=t.length-1;!function(){a(t[i--]||[]).slideToggle(n,arguments.callee)}()}e.preventDefault()})}})}})}(jQuery),function(r){r.fn.niceSelect=function(e){function n(e){e.after(r("<div></div>").addClass("nice-select").addClass(e.attr("class")||"").addClass(e.attr("disabled")?"disabled":"").attr("tabindex",e.attr("disabled")?null:"0").html('<span class="current"></span><ul class="list"></ul>'));var n=e.next(),t=e.find("option"),i=e.find("option:selected");n.find(".current").html(i.data("display")||i.text()),t.each(function(e){var t=r(this),i=t.data("display");n.find("ul").append(r("<li></li>").attr("data-value",t.val()).attr("data-display",i||null).addClass("option"+(t.is(":selected")?" selected":"")+(t.is(":disabled")?" disabled":"")).html(t.text()))})}if("string"==typeof e)return"update"==e?this.each(function(){var e=r(this),t=r(this).next(".nice-select"),i=t.hasClass("open");t.length&&(t.remove(),n(e),i&&e.next().trigger("click"))}):"destroy"==e?(this.each(function(){var e=r(this),t=r(this).next(".nice-select");t.length&&(t.remove(),e.css("display",""))}),0==r(".nice-select").length&&r(document).off(".nice_select")):console.log('Method "'+e+'" does not exist.'),this;this.hide(),this.each(function(){var e=r(this);e.next().hasClass("nice-select")||n(e)}),r(document).off(".nice_select"),r(document).on("click.nice_select",".nice-select",function(e){var t=r(this);r(".nice-select").not(t).removeClass("open"),t.toggleClass("open"),t.hasClass("open")?(t.find(".option"),t.find(".focus").removeClass("focus"),t.find(".selected").addClass("focus")):t.focus()}),r(document).on("click.nice_select",function(e){0===r(e.target).closest(".nice-select").length&&r(".nice-select").removeClass("open").find(".option")}),r(document).on("click.nice_select",".nice-select .option:not(.disabled)",function(e){var t=r(this),i=t.closest(".nice-select");i.find(".selected").removeClass("selected"),t.addClass("selected");var n=t.data("display")||t.text();i.find(".current").text(n),i.prev("select").val(t.data("value")).trigger("change")}),r(document).on("keydown.nice_select",".nice-select",function(e){var t=r(this),i=r(t.find(".focus")||t.find(".list .option.selected"));if(32==e.keyCode||13==e.keyCode)return t.hasClass("open")?i.trigger("click"):t.trigger("click"),!1;if(40==e.keyCode){if(t.hasClass("open")){var n=i.nextAll(".option:not(.disabled)").first();0<n.length&&(t.find(".focus").removeClass("focus"),n.addClass("focus"))}else t.trigger("click");return!1}if(38==e.keyCode){if(t.hasClass("open")){var s=i.prevAll(".option:not(.disabled)").first();0<s.length&&(t.find(".focus").removeClass("focus"),s.addClass("focus"))}else t.trigger("click");return!1}if(27==e.keyCode)t.hasClass("open")&&t.trigger("click");else if(9==e.keyCode&&t.hasClass("open"))return!1});var t=document.createElement("a").style;return t.cssText="pointer-events:auto","auto"!==t.pointerEvents&&r("html").addClass("no-csspointerevents"),this}}(jQuery),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){"use strict";var C=!1,T=!1,E=0,I=2e3,M=0,P=e,A=document,O=window,Y=P(O),L=[];var N=O.requestAnimationFrame||O.webkitRequestAnimationFrame||O.mozRequestAnimationFrame||!1,F=O.cancelAnimationFrame||O.webkitCancelAnimationFrame||O.mozCancelAnimationFrame||!1;if(N)O.cancelAnimationFrame||(F=function(e){});else{var r=0;N=function(e,t){var i=(new Date).getTime(),n=Math.max(0,16-(i-r)),s=O.setTimeout(function(){e(i+n)},n);return r=i+n,s},F=function(e){O.clearTimeout(e)}}var t,i,n,z=O.MutationObserver||O.WebKitMutationObserver||!1,W=Date.now||function(){return(new Date).getTime()},R={zindex:"auto",cursoropacitymin:0,cursoropacitymax:1,cursorcolor:"#424242",cursorwidth:"6px",cursorborder:"1px solid #fff",cursorborderradius:"5px",scrollspeed:40,mousescrollstep:27,touchbehavior:!1,emulatetouch:!1,hwacceleration:!0,usetransition:!0,boxzoom:!1,dblclickzoom:!0,gesturezoom:!0,grabcursorenabled:!0,autohidemode:!0,background:"",iframeautoresize:!0,cursorminheight:32,preservenativescrolling:!0,railoffset:!1,railhoffset:!1,bouncescroll:!0,spacebarenabled:!0,railpadding:{top:0,right:0,left:0,bottom:0},disableoutline:!0,horizrailenabled:!0,railalign:"right",railvalign:"bottom",enabletranslate3d:!0,enablemousewheel:!0,enablekeyboard:!0,smoothscroll:!0,sensitiverail:!0,enablemouselockapi:!0,cursorfixedheight:!1,directionlockdeadzone:6,hidecursordelay:400,nativeparentscrolling:!0,enablescrollonselection:!0,overflowx:!0,overflowy:!0,cursordragspeed:.3,rtlmode:"auto",cursordragontouch:!1,oneaxismousemode:"auto",scriptpath:(i=A.currentScript||!!(t=A.getElementsByTagName("script")).length&&t[t.length-1],n=i?i.src.split("?")[0]:"",0<n.split("/").length?n.split("/").slice(0,-1).join("/")+"/":""),preventmultitouchscrolling:!0,disablemutationobserver:!1,enableobserver:!0,scrollbarid:!1},H=!1,a=function(e,t){var w=this;this.version="3.7.6",this.name="nicescroll",this.me=t;var b=P("body"),_=this.opt={doc:b,win:!1};if(P.extend(_,R),_.snapbackspeed=80,e)for(var i in _)void 0!==e[i]&&(_[i]=e[i]);if(_.disablemutationobserver&&(z=!1),this.doc=_.doc,this.iddoc=this.doc&&this.doc[0]&&this.doc[0].id||"",this.ispage=/^BODY|HTML/.test(_.win?_.win[0].nodeName:this.doc[0].nodeName),this.haswrapper=!1!==_.win,this.win=_.win||(this.ispage?Y:this.doc),this.docscroll=this.ispage&&!this.haswrapper?Y:this.win,this.body=b,this.viewport=!1,this.isfixed=!1,this.iframe=!1,this.isiframe="IFRAME"==this.doc[0].nodeName&&"IFRAME"==this.win[0].nodeName,this.istextarea="TEXTAREA"==this.win[0].nodeName,this.forcescreen=!1,this.canshowonmouseevent="scroll"!=_.autohidemode,this.onmousedown=!1,this.onmouseup=!1,this.onmousemove=!1,this.onmousewheel=!1,this.onkeypress=!1,this.ongesturezoom=!1,this.onclick=!1,this.onscrollstart=!1,this.onscrollend=!1,this.onscrollcancel=!1,this.onzoomin=!1,this.onzoomout=!1,this.view=!1,this.page=!1,this.scroll={x:0,y:0},this.scrollratio={x:0,y:0},this.cursorheight=20,this.scrollvaluemax=0,"auto"==_.rtlmode){var n=this.win[0]==O?this.body:this.win,s=n.css("writing-mode")||n.css("-webkit-writing-mode")||n.css("-ms-writing-mode")||n.css("-moz-writing-mode");"horizontal-tb"==s||"lr-tb"==s||""===s?(this.isrtlmode="rtl"==n.css("direction"),this.isvertical=!1):(this.isrtlmode="vertical-rl"==s||"tb"==s||"tb-rl"==s||"rl-tb"==s,this.isvertical="vertical-rl"==s||"tb"==s||"tb-rl"==s)}else this.isrtlmode=!0===_.rtlmode,this.isvertical=!1;if(this.scrollrunning=!1,this.scrollmom=!1,this.observer=!1,this.observerremover=!1,(this.observerbody=!1)!==_.scrollbarid)this.id=_.scrollbarid;else for(;this.id="ascrail"+I++,A.getElementById(this.id););this.rail=!1,this.cursor=!1,this.cursorfreezed=!1,this.selectiondrag=!1,this.zoom=!1,this.zoomactive=!1,this.hasfocus=!1,this.hasmousefocus=!1,this.railslocked=!1,this.locked=!1,this.hidden=!1,this.cursoractive=!0,this.wheelprevented=!1,this.overflowx=_.overflowx,this.overflowy=_.overflowy,this.nativescrollingarea=!1,this.checkarea=0,this.events=[],this.saved={},this.delaylist={},this.synclist={},this.lastdeltax=0,this.lastdeltay=0,this.detected=function(){if(H)return H;var e=A.createElement("DIV"),r=e.style,t=navigator.userAgent,i=navigator.platform,o={};return o.haspointerlock="pointerLockElement"in A||"webkitPointerLockElement"in A||"mozPointerLockElement"in A,o.isopera="opera"in O,o.isopera12=o.isopera&&"getUserMedia"in navigator,o.isoperamini="[object OperaMini]"===Object.prototype.toString.call(O.operamini),o.isie="all"in A&&"attachEvent"in e&&!o.isopera,o.isieold=o.isie&&!("msInterpolationMode"in r),o.isie7=o.isie&&!o.isieold&&(!("documentMode"in A)||7===A.documentMode),o.isie8=o.isie&&"documentMode"in A&&8===A.documentMode,o.isie9=o.isie&&"performance"in O&&9===A.documentMode,o.isie10=o.isie&&"performance"in O&&10===A.documentMode,o.isie11="msRequestFullscreen"in e&&11<=A.documentMode,o.ismsedge="msCredentials"in O,o.ismozilla="MozAppearance"in r,o.iswebkit=!o.ismsedge&&"WebkitAppearance"in r,o.ischrome=o.iswebkit&&"chrome"in O,o.ischrome38=o.ischrome&&"touchAction"in r,o.ischrome22=!o.ischrome38&&o.ischrome&&o.haspointerlock,o.ischrome26=!o.ischrome38&&o.ischrome&&"transition"in r,o.cantouch="ontouchstart"in A.documentElement||"ontouchstart"in O,o.hasw3ctouch=!!O.PointerEvent&&(0<navigator.maxTouchPoints||0<navigator.msMaxTouchPoints),o.hasmstouch=!o.hasw3ctouch&&(O.MSPointerEvent||!1),o.ismac=/^mac$/i.test(i),o.isios=o.cantouch&&/iphone|ipad|ipod/i.test(i),o.isios4=o.isios&&!("seal"in Object),o.isios7=o.isios&&"webkitHidden"in A,o.isios8=o.isios&&"hidden"in A,o.isios10=o.isios&&O.Proxy,o.isandroid=/android/i.test(t),o.haseventlistener="addEventListener"in e,o.trstyle=!1,o.hastransform=!1,o.hastranslate3d=!1,o.transitionstyle=!1,o.hastransition=!1,o.transitionend=!1,o.trstyle="transform",o.hastransform="transform"in r||function(){for(var e=["msTransform","webkitTransform","MozTransform","OTransform"],t=0,i=e.length;t<i;t++)if(void 0!==r[e[t]]){o.trstyle=e[t];break}o.hastransform=!!o.trstyle}(),o.hastransform&&(r[o.trstyle]="translate3d(1px,2px,3px)",o.hastranslate3d=/translate3d/.test(r[o.trstyle])),o.transitionstyle="transition",o.prefixstyle="",o.transitionend="transitionend",o.hastransition="transition"in r||function(){o.transitionend=!1;for(var e=["webkitTransition","msTransition","MozTransition","OTransition","OTransition","KhtmlTransition"],t=["-webkit-","-ms-","-moz-","-o-","-o","-khtml-"],i=["webkitTransitionEnd","msTransitionEnd","transitionend","otransitionend","oTransitionEnd","KhtmlTransitionEnd"],n=0,s=e.length;n<s;n++)if(e[n]in r){o.transitionstyle=e[n],o.prefixstyle=t[n],o.transitionend=i[n];break}o.ischrome26&&(o.prefixstyle=t[1]),o.hastransition=o.transitionstyle}(),o.cursorgrabvalue=function(){var e=["grab","-webkit-grab","-moz-grab"];(o.ischrome&&!o.ischrome38||o.isie)&&(e=[]);for(var t=0,i=e.length;t<i;t++){var n=e[t];if(r.cursor=n,r.cursor==n)return n}return"url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize"}(),o.hasmousecapture="setCapture"in e,o.hasMutationObserver=!1!==z,e=null,H=o}();var S=P.extend({},this.detected);this.canhwscroll=S.hastransform&&_.hwacceleration,this.ishwscroll=this.canhwscroll&&w.haswrapper,this.isrtlmode?this.isvertical?this.hasreversehr=!(S.iswebkit||S.isie||S.isie11):this.hasreversehr=!(S.iswebkit||S.isie&&!S.isie10&&!S.isie11):this.hasreversehr=!1,this.istouchcapable=!1,(S.cantouch||!S.hasw3ctouch&&!S.hasmstouch)&&(!S.cantouch||S.isios||S.isandroid||!S.iswebkit&&!S.ismozilla)||(this.istouchcapable=!0),_.enablemouselockapi||(S.hasmousecapture=!1,S.haspointerlock=!1),this.debounced=function(e,t,i){w&&(w.delaylist[e]||!1||(w.delaylist[e]={h:N(function(){w.delaylist[e].fn.call(w),w.delaylist[e]=!1},i)},t.call(w)),w.delaylist[e].fn=t)},this.synched=function(e,t){w.synclist[e]?w.synclist[e]=t:(w.synclist[e]=t,N(function(){w&&(w.synclist[e]&&w.synclist[e].call(w),w.synclist[e]=null)}))},this.unsynched=function(e){w.synclist[e]&&(w.synclist[e]=!1)},this.css=function(e,t){for(var i in t)w.saved.css.push([e,i,e.css(i)]),e.css(i,t[i])},this.scrollTop=function(e){return void 0===e?w.getScrollTop():w.setScrollTop(e)},this.scrollLeft=function(e){return void 0===e?w.getScrollLeft():w.setScrollLeft(e)};var d=function(e,t,i,n,s,r,o){this.st=e,this.ed=t,this.spd=i,this.p1=n||0,this.p2=s||1,this.p3=r||0,this.p4=o||1,this.ts=W(),this.df=t-e};function r(){var e=w.doc.css(S.trstyle);return!(!e||"matrix"!=e.substr(0,6))&&e.replace(/^.*\((.*)\)$/g,"$1").replace(/px/g,"").split(/, +/)}if(d.prototype={B2:function(e){return 3*(1-e)*(1-e)*e},B3:function(e){return 3*(1-e)*e*e},B4:function(e){return e*e*e},getPos:function(){return(W()-this.ts)/this.spd},getNow:function(){var e=(W()-this.ts)/this.spd,t=this.B2(e)+this.B3(e)+this.B4(e);return 1<=e?this.ed:this.st+this.df*t|0},update:function(e,t){return this.st=this.getNow(),this.ed=e,this.spd=t,this.ts=W(),this.df=this.ed-this.st,this}},this.ishwscroll){this.doc.translate={x:0,y:0,tx:"0px",ty:"0px"},S.hastranslate3d&&S.isios&&this.doc.css("-webkit-backface-visibility","hidden"),this.getScrollTop=function(e){if(!e){var t=r();if(t)return 16==t.length?-t[13]:-t[5];if(w.timerscroll&&w.timerscroll.bz)return w.timerscroll.bz.getNow()}return w.doc.translate.y},this.getScrollLeft=function(e){if(!e){var t=r();if(t)return 16==t.length?-t[12]:-t[4];if(w.timerscroll&&w.timerscroll.bh)return w.timerscroll.bh.getNow()}return w.doc.translate.x},this.notifyScrollEvent=function(e){var t=A.createEvent("UIEvents");t.initUIEvent("scroll",!1,!1,O,1),t.niceevent=!0,e.dispatchEvent(t)};var o=this.isrtlmode?1:-1;S.hastranslate3d&&_.enabletranslate3d?(this.setScrollTop=function(e,t){w.doc.translate.y=e,w.doc.translate.ty=-1*e+"px",w.doc.css(S.trstyle,"translate3d("+w.doc.translate.tx+","+w.doc.translate.ty+",0)"),t||w.notifyScrollEvent(w.win[0])},this.setScrollLeft=function(e,t){w.doc.translate.x=e,w.doc.translate.tx=e*o+"px",w.doc.css(S.trstyle,"translate3d("+w.doc.translate.tx+","+w.doc.translate.ty+",0)"),t||w.notifyScrollEvent(w.win[0])}):(this.setScrollTop=function(e,t){w.doc.translate.y=e,w.doc.translate.ty=-1*e+"px",w.doc.css(S.trstyle,"translate("+w.doc.translate.tx+","+w.doc.translate.ty+")"),t||w.notifyScrollEvent(w.win[0])},this.setScrollLeft=function(e,t){w.doc.translate.x=e,w.doc.translate.tx=e*o+"px",w.doc.css(S.trstyle,"translate("+w.doc.translate.tx+","+w.doc.translate.ty+")"),t||w.notifyScrollEvent(w.win[0])})}else this.getScrollTop=function(){return w.docscroll.scrollTop()},this.setScrollTop=function(e){w.docscroll.scrollTop(e)},this.getScrollLeft=function(){return w.hasreversehr?w.detected.ismozilla?w.page.maxw-Math.abs(w.docscroll.scrollLeft()):w.page.maxw-w.docscroll.scrollLeft():w.docscroll.scrollLeft()},this.setScrollLeft=function(e){return setTimeout(function(){if(w)return w.hasreversehr&&(e=w.detected.ismozilla?-(w.page.maxw-e):w.page.maxw-e),w.docscroll.scrollLeft(e)},1)};this.getTarget=function(e){return!!e&&(e.target?e.target:!!e.srcElement&&e.srcElement)},this.hasParent=function(e,t){if(!e)return!1;for(var i=e.target||e.srcElement||e||!1;i&&i.id!=t;)i=i.parentNode||!1;return!1!==i};var a={thin:1,medium:3,thick:5};function l(e,t,i){var n=e.css(t),s=parseFloat(n);if(isNaN(s)){var r=3==(s=a[n]||0)?i?w.win.outerHeight()-w.win.innerHeight():w.win.outerWidth()-w.win.innerWidth():1;return w.isie8&&s&&(s+=1),r?s:0}return s}this.getDocumentScrollOffset=function(){return{top:O.pageYOffset||A.documentElement.scrollTop,left:O.pageXOffset||A.documentElement.scrollLeft}},this.getOffset=function(){if(w.isfixed){var e=w.win.offset(),t=w.getDocumentScrollOffset();return e.top-=t.top,e.left-=t.left,e}var i=w.win.offset();if(!w.viewport)return i;var n=w.viewport.offset();return{top:i.top-n.top,left:i.left-n.left}},this.updateScrollBar=function(e){var t,i;if(w.ishwscroll)w.rail.css({height:w.win.innerHeight()-(_.railpadding.top+_.railpadding.bottom)}),w.railh&&w.railh.css({width:w.win.innerWidth()-(_.railpadding.left+_.railpadding.right)});else{var n=w.getOffset();if((t={top:n.top,left:n.left-(_.railpadding.left+_.railpadding.right)}).top+=l(w.win,"border-top-width",!0),t.left+=w.rail.align?w.win.outerWidth()-l(w.win,"border-right-width")-w.rail.width:l(w.win,"border-left-width"),(i=_.railoffset)&&(i.top&&(t.top+=i.top),i.left&&(t.left+=i.left)),w.railslocked||w.rail.css({top:t.top,left:t.left,height:(e?e.h:w.win.innerHeight())-(_.railpadding.top+_.railpadding.bottom)}),w.zoom&&w.zoom.css({top:t.top+1,left:1==w.rail.align?t.left-20:t.left+w.rail.width+4}),w.railh&&!w.railslocked){t={top:n.top,left:n.left},(i=_.railhoffset)&&(i.top&&(t.top+=i.top),i.left&&(t.left+=i.left));var s=w.railh.align?t.top+l(w.win,"border-top-width",!0)+w.win.innerHeight()-w.railh.height:t.top+l(w.win,"border-top-width",!0),r=t.left+l(w.win,"border-left-width");w.railh.css({top:s-(_.railpadding.top+_.railpadding.bottom),left:r,width:w.railh.width})}}},this.doRailClick=function(e,t,i){var n,s,r,o;w.railslocked||(w.cancelEvent(e),"pageY"in e||(e.pageX=e.clientX+A.documentElement.scrollLeft,e.pageY=e.clientY+A.documentElement.scrollTop),t?(n=i?w.doScrollLeft:w.doScrollTop,r=i?(e.pageX-w.railh.offset().left-w.cursorwidth/2)*w.scrollratio.x:(e.pageY-w.rail.offset().top-w.cursorheight/2)*w.scrollratio.y,w.unsynched("relativexy"),n(0|r)):(n=i?w.doScrollLeftBy:w.doScrollBy,r=i?w.scroll.x:w.scroll.y,o=i?e.pageX-w.railh.offset().left:e.pageY-w.rail.offset().top,s=i?w.view.w:w.view.h,n(o<=r?s:-s)))},w.newscrolly=w.newscrollx=0,w.hasanimationframe="requestAnimationFrame"in O,w.hascancelanimationframe="cancelAnimationFrame"in O,w.hasborderbox=!1,this.init=function(){if(w.saved.css=[],S.isoperamini)return!0;if(S.isandroid&&!("hidden"in A))return!0;_.emulatetouch=_.emulatetouch||_.touchbehavior,w.hasborderbox=O.getComputedStyle&&"border-box"===O.getComputedStyle(A.body)["box-sizing"];var i={"overflow-y":"hidden"};if((S.isie11||S.isie10)&&(i["-ms-overflow-style"]="none"),w.ishwscroll&&(this.doc.css(S.transitionstyle,S.prefixstyle+"transform 0ms ease-out"),S.transitionend&&w.bind(w.doc,S.transitionend,w.onScrollTransitionEnd,!1)),w.zindex="auto",w.ispage||"auto"!=_.zindex?w.zindex=_.zindex:w.zindex=function(){var e=w.win;if("zIndex"in e)return e.zIndex();for(;0<e.length;){if(9==e[0].nodeType)return!1;var t=e.css("zIndex");if(!isNaN(t)&&0!==t)return parseInt(t);e=e.parent()}return!1}()||"auto",!w.ispage&&"auto"!=w.zindex&&w.zindex>M&&(M=w.zindex),w.isie&&0===w.zindex&&"auto"==_.zindex&&(w.zindex="auto"),!w.ispage||!S.isieold){var e=w.docscroll;w.ispage&&(e=w.haswrapper?w.win:w.doc),w.css(e,i),w.ispage&&(S.isie11||S.isie)&&w.css(P("html"),i),!S.isios||w.ispage||w.haswrapper||w.css(b,{"-webkit-overflow-scrolling":"touch"});var t=P(A.createElement("div"));t.css({position:"relative",top:0,float:"right",width:_.cursorwidth,height:0,"background-color":_.cursorcolor,border:_.cursorborder,"background-clip":"padding-box","-webkit-border-radius":_.cursorborderradius,"-moz-border-radius":_.cursorborderradius,"border-radius":_.cursorborderradius}),t.addClass("nicescroll-cursors"),w.cursor=t;var n=P(A.createElement("div"));n.attr("id",w.id),n.addClass("nicescroll-rails nicescroll-rails-vr");var s,r,o=["left","right","top","bottom"];for(var a in o)r=o[a],(s=_.railpadding[r]||0)&&n.css("padding-"+r,s+"px");n.append(t),n.width=Math.max(parseFloat(_.cursorwidth),t.outerWidth()),n.css({width:n.width+"px",zIndex:w.zindex,background:_.background,cursor:"default"}),n.visibility=!0,n.scrollable=!0,n.align="left"==_.railalign?0:1,w.rail=n;var l,c=w.rail.drag=!1;if(!_.boxzoom||w.ispage||S.isieold||(c=A.createElement("div"),w.bind(c,"click",w.doZoom),w.bind(c,"mouseenter",function(){w.zoom.css("opacity",_.cursoropacitymax)}),w.bind(c,"mouseleave",function(){w.zoom.css("opacity",_.cursoropacitymin)}),w.zoom=P(c),w.zoom.css({cursor:"pointer",zIndex:w.zindex,backgroundImage:"url("+_.scriptpath+"zoomico.png)",height:18,width:18,backgroundPosition:"0 0"}),_.dblclickzoom&&w.bind(w.win,"dblclick",w.doZoom),S.cantouch&&_.gesturezoom&&(w.ongesturezoom=function(e){return 1.5<e.scale&&w.doZoomIn(e),e.scale<.8&&w.doZoomOut(e),w.cancelEvent(e)},w.bind(w.win,"gestureend",w.ongesturezoom))),w.railh=!1,_.horizrailenabled&&(w.css(e,{overflowX:"hidden"}),(t=P(A.createElement("div"))).css({position:"absolute",top:0,height:_.cursorwidth,width:0,backgroundColor:_.cursorcolor,border:_.cursorborder,backgroundClip:"padding-box","-webkit-border-radius":_.cursorborderradius,"-moz-border-radius":_.cursorborderradius,"border-radius":_.cursorborderradius}),S.isieold&&t.css("overflow","hidden"),t.addClass("nicescroll-cursors"),w.cursorh=t,(l=P(A.createElement("div"))).attr("id",w.id+"-hr"),l.addClass("nicescroll-rails nicescroll-rails-hr"),l.height=Math.max(parseFloat(_.cursorwidth),t.outerHeight()),l.css({height:l.height+"px",zIndex:w.zindex,background:_.background}),l.append(t),l.visibility=!0,l.scrollable=!0,l.align="top"==_.railvalign?0:1,w.railh=l,w.railh.drag=!1),w.ispage)n.css({position:"fixed",top:0,height:"100%"}),n.css(n.align?{right:0}:{left:0}),w.body.append(n),w.railh&&(l.css({position:"fixed",left:0,width:"100%"}),l.css(l.align?{bottom:0}:{top:0}),w.body.append(l));else{if(w.ishwscroll){"static"==w.win.css("position")&&w.css(w.win,{position:"relative"});var d="HTML"==w.win[0].nodeName?w.body:w.win;P(d).scrollTop(0).scrollLeft(0),w.zoom&&(w.zoom.css({position:"absolute",top:1,right:0,"margin-right":n.width+4}),d.append(w.zoom)),n.css({position:"absolute",top:0}),n.css(n.align?{right:0}:{left:0}),d.append(n),l&&(l.css({position:"absolute",left:0,bottom:0}),l.css(l.align?{bottom:0}:{top:0}),d.append(l))}else{w.isfixed="fixed"==w.win.css("position");var h=w.isfixed?"fixed":"absolute";w.isfixed||(w.viewport=w.getViewport(w.win[0])),w.viewport&&(w.body=w.viewport,/fixed|absolute/.test(w.viewport.css("position"))||w.css(w.viewport,{position:"relative"})),n.css({position:h}),w.zoom&&w.zoom.css({position:h}),w.updateScrollBar(),w.body.append(n),w.zoom&&w.body.append(w.zoom),w.railh&&(l.css({position:h}),w.body.append(l))}S.isios&&w.css(w.win,{"-webkit-tap-highlight-color":"rgba(0,0,0,0)","-webkit-touch-callout":"none"}),_.disableoutline&&(S.isie&&w.win.attr("hideFocus","true"),S.iswebkit&&w.win.css("outline","none"))}if(!1===_.autohidemode?(w.autohidedom=!1,w.rail.css({opacity:_.cursoropacitymax}),w.railh&&w.railh.css({opacity:_.cursoropacitymax})):!0===_.autohidemode||"leave"===_.autohidemode?(w.autohidedom=P().add(w.rail),S.isie8&&(w.autohidedom=w.autohidedom.add(w.cursor)),w.railh&&(w.autohidedom=w.autohidedom.add(w.railh)),w.railh&&S.isie8&&(w.autohidedom=w.autohidedom.add(w.cursorh))):"scroll"==_.autohidemode?(w.autohidedom=P().add(w.rail),w.railh&&(w.autohidedom=w.autohidedom.add(w.railh))):"cursor"==_.autohidemode?(w.autohidedom=P().add(w.cursor),w.railh&&(w.autohidedom=w.autohidedom.add(w.cursorh))):"hidden"==_.autohidemode&&(w.autohidedom=!1,w.hide(),w.railslocked=!1),S.cantouch||w.istouchcapable||_.emulatetouch||S.hasmstouch){w.scrollmom=new j(w);w.ontouchstart=function(e){if(w.locked)return!1;if(e.pointerType&&("mouse"===e.pointerType||e.pointerType===e.MSPOINTER_TYPE_MOUSE))return!1;if(w.hasmoving=!1,w.scrollmom.timer&&(w.triggerScrollEnd(),w.scrollmom.stop()),!w.railslocked){var t=w.getTarget(e);if(t)if(/INPUT/i.test(t.nodeName)&&/range/i.test(t.type))return w.stopPropagation(e);var i="mousedown"===e.type;if(!("clientX"in e)&&"changedTouches"in e&&(e.clientX=e.changedTouches[0].clientX,e.clientY=e.changedTouches[0].clientY),w.forcescreen){var n=e;(e={original:e.original?e.original:e}).clientX=n.screenX,e.clientY=n.screenY}if(w.rail.drag={x:e.clientX,y:e.clientY,sx:w.scroll.x,sy:w.scroll.y,st:w.getScrollTop(),sl:w.getScrollLeft(),pt:2,dl:!1,tg:t},w.ispage||!_.directionlockdeadzone)w.rail.drag.dl="f";else{var s=Y.width(),r=Y.height(),o=w.getContentSize(),a=o.h-r,l=o.w-s;w.rail.scrollable&&!w.railh.scrollable?w.rail.drag.ck=0<a&&"v":!w.rail.scrollable&&w.railh.scrollable?w.rail.drag.ck=0<l&&"h":w.rail.drag.ck=!1}if(_.emulatetouch&&w.isiframe&&S.isie){var c=w.win.position();w.rail.drag.x+=c.left,w.rail.drag.y+=c.top}if(w.hasmoving=!1,w.lastmouseup=!1,w.scrollmom.reset(e.clientX,e.clientY),t&&i){if(!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(t.nodeName))return S.hasmousecapture&&t.setCapture(),_.emulatetouch?(t.onclick&&!t._onclick&&(t._onclick=t.onclick,t.onclick=function(e){if(w.hasmoving)return!1;t._onclick.call(this,e)}),w.cancelEvent(e)):w.stopPropagation(e);/SUBMIT|CANCEL|BUTTON/i.test(P(t).attr("type"))&&(w.preventclick={tg:t,click:!1})}}},w.ontouchend=function(e){if(!w.rail.drag)return!0;if(2==w.rail.drag.pt){if(e.pointerType&&("mouse"===e.pointerType||e.pointerType===e.MSPOINTER_TYPE_MOUSE))return!1;w.rail.drag=!1;var t="mouseup"===e.type;if(w.hasmoving&&(w.scrollmom.doMomentum(),w.lastmouseup=!0,w.hideCursor(),S.hasmousecapture&&A.releaseCapture(),t))return w.cancelEvent(e)}else if(1==w.rail.drag.pt)return w.onmouseup(e)};var m=_.emulatetouch&&w.isiframe&&!S.hasmousecapture,p=.3*_.directionlockdeadzone|0;w.ontouchmove=function(e,t){if(!w.rail.drag)return!0;if(e.targetTouches&&_.preventmultitouchscrolling&&1<e.targetTouches.length)return!0;if(e.pointerType&&("mouse"===e.pointerType||e.pointerType===e.MSPOINTER_TYPE_MOUSE))return!0;if(2==w.rail.drag.pt){var i,n;if("changedTouches"in e&&(e.clientX=e.changedTouches[0].clientX,e.clientY=e.changedTouches[0].clientY),n=i=0,m&&!t){var s=w.win.position();n=-s.left,i=-s.top}var r=e.clientY+i,o=r-w.rail.drag.y,a=e.clientX+n,l=a-w.rail.drag.x,c=w.rail.drag.st-o;if(w.ishwscroll&&_.bouncescroll)c<0?c=Math.round(c/2):c>w.page.maxh&&(c=w.page.maxh+Math.round((c-w.page.maxh)/2));else if(c<0?r=c=0:c>w.page.maxh&&(c=w.page.maxh,r=0),0===r&&!w.hasmoving)return w.ispage||(w.rail.drag=!1),!0;var d=w.getScrollLeft();if(w.railh&&w.railh.scrollable&&(d=w.isrtlmode?l-w.rail.drag.sl:w.rail.drag.sl-l,w.ishwscroll&&_.bouncescroll?d<0?d=Math.round(d/2):d>w.page.maxw&&(d=w.page.maxw+Math.round((d-w.page.maxw)/2)):(d<0&&(a=d=0),d>w.page.maxw&&(d=w.page.maxw,a=0))),!w.hasmoving){if(w.rail.drag.y===e.clientY&&w.rail.drag.x===e.clientX)return w.cancelEvent(e);var h=Math.abs(o),u=Math.abs(l),f=_.directionlockdeadzone;if(w.rail.drag.ck?"v"==w.rail.drag.ck?f<u&&h<=p?w.rail.drag=!1:f<h&&(w.rail.drag.dl="v"):"h"==w.rail.drag.ck&&(f<h&&u<=p?w.rail.drag=!1:f<u&&(w.rail.drag.dl="h")):f<h&&f<u?w.rail.drag.dl="f":f<h?w.rail.drag.dl=p<u?"f":"v":f<u&&(w.rail.drag.dl=p<h?"f":"h"),!w.rail.drag.dl)return w.cancelEvent(e);w.triggerScrollStart(e.clientX,e.clientY,0,0,0),w.hasmoving=!0}return w.preventclick&&!w.preventclick.click&&(w.preventclick.click=w.preventclick.tg.onclick||!1,w.preventclick.tg.onclick=w.onpreventclick),w.rail.drag.dl&&("v"==w.rail.drag.dl?d=w.rail.drag.sl:"h"==w.rail.drag.dl&&(c=w.rail.drag.st)),w.synched("touchmove",function(){w.rail.drag&&2==w.rail.drag.pt&&(w.prepareTransition&&w.resetTransition(),w.rail.scrollable&&w.setScrollTop(c),w.scrollmom.update(a,r),w.railh&&w.railh.scrollable?(w.setScrollLeft(d),w.showCursor(c,d)):w.showCursor(c),S.isie10&&A.selection.clear())}),w.cancelEvent(e)}return 1==w.rail.drag.pt?w.onmousemove(e):void 0},w.ontouchstartCursor=function(e,t){if(!w.rail.drag||3==w.rail.drag.pt){if(w.locked)return w.cancelEvent(e);w.cancelScroll(),w.rail.drag={x:e.touches[0].clientX,y:e.touches[0].clientY,sx:w.scroll.x,sy:w.scroll.y,pt:3,hr:!!t};var i=w.getTarget(e);return!w.ispage&&S.hasmousecapture&&i.setCapture(),w.isiframe&&!S.hasmousecapture&&(w.saved.csspointerevents=w.doc.css("pointer-events"),w.css(w.doc,{"pointer-events":"none"})),w.cancelEvent(e)}},w.ontouchendCursor=function(e){if(w.rail.drag){if(S.hasmousecapture&&A.releaseCapture(),w.isiframe&&!S.hasmousecapture&&w.doc.css("pointer-events",w.saved.csspointerevents),3!=w.rail.drag.pt)return;return w.rail.drag=!1,w.cancelEvent(e)}},w.ontouchmoveCursor=function(e){if(w.rail.drag){if(3!=w.rail.drag.pt)return;if(w.cursorfreezed=!0,w.rail.drag.hr){w.scroll.x=w.rail.drag.sx+(e.touches[0].clientX-w.rail.drag.x),w.scroll.x<0&&(w.scroll.x=0);var t=w.scrollvaluemaxw;w.scroll.x>t&&(w.scroll.x=t)}else{w.scroll.y=w.rail.drag.sy+(e.touches[0].clientY-w.rail.drag.y),w.scroll.y<0&&(w.scroll.y=0);var i=w.scrollvaluemax;w.scroll.y>i&&(w.scroll.y=i)}return w.synched("touchmove",function(){w.rail.drag&&3==w.rail.drag.pt&&(w.showCursor(),w.rail.drag.hr?w.doScrollLeft(Math.round(w.scroll.x*w.scrollratio.x),_.cursordragspeed):w.doScrollTop(Math.round(w.scroll.y*w.scrollratio.y),_.cursordragspeed))}),w.cancelEvent(e)}}}if(w.onmousedown=function(e,t){if(!w.rail.drag||1==w.rail.drag.pt){if(w.railslocked)return w.cancelEvent(e);w.cancelScroll(),w.rail.drag={x:e.clientX,y:e.clientY,sx:w.scroll.x,sy:w.scroll.y,pt:1,hr:t||!1};var i=w.getTarget(e);return S.hasmousecapture&&i.setCapture(),w.isiframe&&!S.hasmousecapture&&(w.saved.csspointerevents=w.doc.css("pointer-events"),w.css(w.doc,{"pointer-events":"none"})),w.hasmoving=!1,w.cancelEvent(e)}},w.onmouseup=function(e){if(w.rail.drag)return 1!=w.rail.drag.pt||(S.hasmousecapture&&A.releaseCapture(),w.isiframe&&!S.hasmousecapture&&w.doc.css("pointer-events",w.saved.csspointerevents),w.rail.drag=!1,w.cursorfreezed=!1,w.hasmoving&&w.triggerScrollEnd(),w.cancelEvent(e))},w.onmousemove=function(e){if(w.rail.drag){if(1!==w.rail.drag.pt)return;if(S.ischrome&&0===e.which)return w.onmouseup(e);if(w.cursorfreezed=!0,w.hasmoving||w.triggerScrollStart(e.clientX,e.clientY,0,0,0),w.hasmoving=!0,w.rail.drag.hr){w.scroll.x=w.rail.drag.sx+(e.clientX-w.rail.drag.x),w.scroll.x<0&&(w.scroll.x=0);var t=w.scrollvaluemaxw;w.scroll.x>t&&(w.scroll.x=t)}else{w.scroll.y=w.rail.drag.sy+(e.clientY-w.rail.drag.y),w.scroll.y<0&&(w.scroll.y=0);var i=w.scrollvaluemax;w.scroll.y>i&&(w.scroll.y=i)}return w.synched("mousemove",function(){w.cursorfreezed&&(w.showCursor(),w.rail.drag.hr?w.scrollLeft(Math.round(w.scroll.x*w.scrollratio.x)):w.scrollTop(Math.round(w.scroll.y*w.scrollratio.y)))}),w.cancelEvent(e)}w.checkarea=0},S.cantouch||_.emulatetouch)w.onpreventclick=function(e){if(w.preventclick)return w.preventclick.tg.onclick=w.preventclick.click,w.preventclick=!1,w.cancelEvent(e)},w.onclick=!S.isios&&function(e){return!w.lastmouseup||(w.lastmouseup=!1,w.cancelEvent(e))},_.grabcursorenabled&&S.cursorgrabvalue&&(w.css(w.ispage?w.doc:w.win,{cursor:S.cursorgrabvalue}),w.css(w.rail,{cursor:S.cursorgrabvalue}));else{var u=function(e){if(w.selectiondrag){if(e){var t=w.win.outerHeight(),i=e.pageY-w.selectiondrag.top;0<i&&i<t&&(i=0),t<=i&&(i-=t),w.selectiondrag.df=i}if(0!==w.selectiondrag.df){var n=-2*w.selectiondrag.df/6|0;w.doScrollBy(n),w.debounced("doselectionscroll",function(){u()},50)}}};w.hasTextSelected="getSelection"in A?function(){return 0<A.getSelection().rangeCount}:"selection"in A?function(){return"None"!=A.selection.type}:function(){return!1},w.onselectionstart=function(e){w.ispage||(w.selectiondrag=w.win.offset())},w.onselectionend=function(e){w.selectiondrag=!1},w.onselectiondrag=function(e){w.selectiondrag&&w.hasTextSelected()&&w.debounced("selectionscroll",function(){u(e)},250)}}if(S.hasw3ctouch?(w.css(w.ispage?P("html"):w.win,{"touch-action":"none"}),w.css(w.rail,{"touch-action":"none"}),w.css(w.cursor,{"touch-action":"none"}),w.bind(w.win,"pointerdown",w.ontouchstart),w.bind(A,"pointerup",w.ontouchend),w.delegate(A,"pointermove",w.ontouchmove)):S.hasmstouch?(w.css(w.ispage?P("html"):w.win,{"-ms-touch-action":"none"}),w.css(w.rail,{"-ms-touch-action":"none"}),w.css(w.cursor,{"-ms-touch-action":"none"}),w.bind(w.win,"MSPointerDown",w.ontouchstart),w.bind(A,"MSPointerUp",w.ontouchend),w.delegate(A,"MSPointerMove",w.ontouchmove),w.bind(w.cursor,"MSGestureHold",function(e){e.preventDefault()}),w.bind(w.cursor,"contextmenu",function(e){e.preventDefault()})):S.cantouch&&(w.bind(w.win,"touchstart",w.ontouchstart,!1,!0),w.bind(A,"touchend",w.ontouchend,!1,!0),w.bind(A,"touchcancel",w.ontouchend,!1,!0),w.delegate(A,"touchmove",w.ontouchmove,!1,!0)),_.emulatetouch&&(w.bind(w.win,"mousedown",w.ontouchstart,!1,!0),w.bind(A,"mouseup",w.ontouchend,!1,!0),w.bind(A,"mousemove",w.ontouchmove,!1,!0)),(_.cursordragontouch||!S.cantouch&&!_.emulatetouch)&&(w.rail.css({cursor:"default"}),w.railh&&w.railh.css({cursor:"default"}),w.jqbind(w.rail,"mouseenter",function(){if(!w.ispage&&!w.win.is(":visible"))return!1;w.canshowonmouseevent&&w.showCursor(),w.rail.active=!0}),w.jqbind(w.rail,"mouseleave",function(){w.rail.active=!1,w.rail.drag||w.hideCursor()}),_.sensitiverail&&(w.bind(w.rail,"click",function(e){w.doRailClick(e,!1,!1)}),w.bind(w.rail,"dblclick",function(e){w.doRailClick(e,!0,!1)}),w.bind(w.cursor,"click",function(e){w.cancelEvent(e)}),w.bind(w.cursor,"dblclick",function(e){w.cancelEvent(e)})),w.railh&&(w.jqbind(w.railh,"mouseenter",function(){if(!w.ispage&&!w.win.is(":visible"))return!1;w.canshowonmouseevent&&w.showCursor(),w.rail.active=!0}),w.jqbind(w.railh,"mouseleave",function(){w.rail.active=!1,w.rail.drag||w.hideCursor()}),_.sensitiverail&&(w.bind(w.railh,"click",function(e){w.doRailClick(e,!1,!0)}),w.bind(w.railh,"dblclick",function(e){w.doRailClick(e,!0,!0)}),w.bind(w.cursorh,"click",function(e){w.cancelEvent(e)}),w.bind(w.cursorh,"dblclick",function(e){w.cancelEvent(e)})))),_.cursordragontouch&&(this.istouchcapable||S.cantouch)&&(w.bind(w.cursor,"touchstart",w.ontouchstartCursor),w.bind(w.cursor,"touchmove",w.ontouchmoveCursor),w.bind(w.cursor,"touchend",w.ontouchendCursor),w.cursorh&&w.bind(w.cursorh,"touchstart",function(e){w.ontouchstartCursor(e,!0)}),w.cursorh&&w.bind(w.cursorh,"touchmove",w.ontouchmoveCursor),w.cursorh&&w.bind(w.cursorh,"touchend",w.ontouchendCursor)),_.emulatetouch||S.isandroid||S.isios?(w.bind(S.hasmousecapture?w.win:A,"mouseup",w.ontouchend),w.onclick&&w.bind(A,"click",w.onclick),_.cursordragontouch?(w.bind(w.cursor,"mousedown",w.onmousedown),w.bind(w.cursor,"mouseup",w.onmouseup),w.cursorh&&w.bind(w.cursorh,"mousedown",function(e){w.onmousedown(e,!0)}),w.cursorh&&w.bind(w.cursorh,"mouseup",w.onmouseup)):(w.bind(w.rail,"mousedown",function(e){e.preventDefault()}),w.railh&&w.bind(w.railh,"mousedown",function(e){e.preventDefault()}))):(w.bind(S.hasmousecapture?w.win:A,"mouseup",w.onmouseup),w.bind(A,"mousemove",w.onmousemove),w.onclick&&w.bind(A,"click",w.onclick),w.bind(w.cursor,"mousedown",w.onmousedown),w.bind(w.cursor,"mouseup",w.onmouseup),w.railh&&(w.bind(w.cursorh,"mousedown",function(e){w.onmousedown(e,!0)}),w.bind(w.cursorh,"mouseup",w.onmouseup)),!w.ispage&&_.enablescrollonselection&&(w.bind(w.win[0],"mousedown",w.onselectionstart),w.bind(A,"mouseup",w.onselectionend),w.bind(w.cursor,"mouseup",w.onselectionend),w.cursorh&&w.bind(w.cursorh,"mouseup",w.onselectionend),w.bind(A,"mousemove",w.onselectiondrag)),w.zoom&&(w.jqbind(w.zoom,"mouseenter",function(){w.canshowonmouseevent&&w.showCursor(),w.rail.active=!0}),w.jqbind(w.zoom,"mouseleave",function(){w.rail.active=!1,w.rail.drag||w.hideCursor()}))),_.enablemousewheel&&(w.isiframe||w.mousewheel(S.isie&&w.ispage?A:w.win,w.onmousewheel),w.mousewheel(w.rail,w.onmousewheel),w.railh&&w.mousewheel(w.railh,w.onmousewheelhr)),w.ispage||S.cantouch||/HTML|^BODY/.test(w.win[0].nodeName)||(w.win.attr("tabindex")||w.win.attr({tabindex:++E}),w.bind(w.win,"focus",function(e){C=w.getTarget(e).id||w.getTarget(e)||!1,w.hasfocus=!0,w.canshowonmouseevent&&w.noticeCursor()}),w.bind(w.win,"blur",function(e){C=!1,w.hasfocus=!1}),w.bind(w.win,"mouseenter",function(e){T=w.getTarget(e).id||w.getTarget(e)||!1,w.hasmousefocus=!0,w.canshowonmouseevent&&w.noticeCursor()}),w.bind(w.win,"mouseleave",function(e){T=!1,w.hasmousefocus=!1,w.rail.drag||w.hideCursor()})),w.onkeypress=function(e){if(w.railslocked&&0===w.page.maxh)return!0;e=e||O.event;var t=w.getTarget(e);if(t&&/INPUT|TEXTAREA|SELECT|OPTION/.test(t.nodeName)&&(!(t.getAttribute("type")||t.type||!1)||!/submit|button|cancel/i.tp))return!0;if(P(t).attr("contenteditable"))return!0;if(w.hasfocus||w.hasmousefocus&&!C||w.ispage&&!C&&!T){var i=e.keyCode;if(w.railslocked&&27!=i)return w.cancelEvent(e);var n=e.ctrlKey||!1,s=e.shiftKey||!1,r=!1;switch(i){case 38:case 63233:w.doScrollBy(72),r=!0;break;case 40:case 63235:w.doScrollBy(-72),r=!0;break;case 37:case 63232:w.railh&&(n?w.doScrollLeft(0):w.doScrollLeftBy(72),r=!0);break;case 39:case 63234:w.railh&&(n?w.doScrollLeft(w.page.maxw):w.doScrollLeftBy(-72),r=!0);break;case 33:case 63276:w.doScrollBy(w.view.h),r=!0;break;case 34:case 63277:w.doScrollBy(-w.view.h),r=!0;break;case 36:case 63273:w.railh&&n?w.doScrollPos(0,0):w.doScrollTo(0),r=!0;break;case 35:case 63275:w.railh&&n?w.doScrollPos(w.page.maxw,w.page.maxh):w.doScrollTo(w.page.maxh),r=!0;break;case 32:_.spacebarenabled&&(s?w.doScrollBy(w.view.h):w.doScrollBy(-w.view.h),r=!0);break;case 27:w.zoomactive&&(w.doZoom(),r=!0)}if(r)return w.cancelEvent(e)}},_.enablekeyboard&&w.bind(A,S.isopera&&!S.isopera12?"keypress":"keydown",w.onkeypress),w.bind(A,"keydown",function(e){(e.ctrlKey||!1)&&(w.wheelprevented=!0)}),w.bind(A,"keyup",function(e){e.ctrlKey||!1||(w.wheelprevented=!1)}),w.bind(O,"blur",function(e){w.wheelprevented=!1}),w.bind(O,"resize",w.onscreenresize),w.bind(O,"orientationchange",w.onscreenresize),w.bind(O,"load",w.lazyResize),S.ischrome&&!w.ispage&&!w.haswrapper){var f=w.win.attr("style"),g=parseFloat(w.win.css("width"))+1;w.win.css("width",g),w.synched("chromefix",function(){w.win.attr("style",f)})}if(w.onAttributeChange=function(e){w.lazyResize(w.isieold?250:30)},_.enableobserver&&(w.isie11||!1===z||(w.observerbody=new z(function(e){if(e.forEach(function(e){if("attributes"==e.type)return b.hasClass("modal-open")&&b.hasClass("modal-dialog")&&!P.contains(P(".modal-dialog")[0],w.doc[0])?w.hide():w.show()}),w.me.clientWidth!=w.page.width||w.me.clientHeight!=w.page.height)return w.lazyResize(30)}),w.observerbody.observe(A.body,{childList:!0,subtree:!0,characterData:!1,attributes:!0,attributeFilter:["class"]})),!w.ispage&&!w.haswrapper)){var v=w.win[0];!1!==z?(w.observer=new z(function(e){e.forEach(w.onAttributeChange)}),w.observer.observe(v,{childList:!0,characterData:!1,attributes:!0,subtree:!1}),w.observerremover=new z(function(e){e.forEach(function(e){if(0<e.removedNodes.length)for(var t in e.removedNodes)if(w&&e.removedNodes[t]===v)return w.remove()})}),w.observerremover.observe(v.parentNode,{childList:!0,characterData:!1,attributes:!1,subtree:!1})):(w.bind(v,S.isie&&!S.isie9?"propertychange":"DOMAttrModified",w.onAttributeChange),S.isie9&&v.attachEvent("onpropertychange",w.onAttributeChange),w.bind(v,"DOMNodeRemoved",function(e){e.target===v&&w.remove()}))}!w.ispage&&_.boxzoom&&w.bind(O,"resize",w.resizeZoom),w.istextarea&&(w.bind(w.win,"keydown",w.lazyResize),w.bind(w.win,"mouseup",w.lazyResize)),w.lazyResize(30)}if("IFRAME"==this.doc[0].nodeName){var y=function(){var t;w.iframexd=!1;try{(t="contentDocument"in this?this.contentDocument:this.contentWindow._doc).domain}catch(e){w.iframexd=!0,t=!1}if(w.iframexd)return"console"in O&&console.log("NiceScroll error: policy restriced iframe"),!0;if(w.forcescreen=!0,w.isiframe&&(w.iframe={doc:P(t),html:w.doc.contents().find("html")[0],body:w.doc.contents().find("body")[0]},w.getContentSize=function(){return{w:Math.max(w.iframe.html.scrollWidth,w.iframe.body.scrollWidth),h:Math.max(w.iframe.html.scrollHeight,w.iframe.body.scrollHeight)}},w.docscroll=P(w.iframe.body)),!S.isios&&_.iframeautoresize&&!w.isiframe){w.win.scrollTop(0),w.doc.height("");var e=Math.max(t.getElementsByTagName("html")[0].scrollHeight,t.body.scrollHeight);w.doc.height(e)}w.lazyResize(30),w.css(P(w.iframe.body),i),S.isios&&w.haswrapper&&w.css(P(t.body),{"-webkit-transform":"translate3d(0,0,0)"}),"contentWindow"in this?w.bind(this.contentWindow,"scroll",w.onscroll):w.bind(t,"scroll",w.onscroll),_.enablemousewheel&&w.mousewheel(t,w.onmousewheel),_.enablekeyboard&&w.bind(t,S.isopera?"keypress":"keydown",w.onkeypress),S.cantouch?(w.bind(t,"touchstart",w.ontouchstart),w.bind(t,"touchmove",w.ontouchmove)):_.emulatetouch&&(w.bind(t,"mousedown",w.ontouchstart),w.bind(t,"mousemove",function(e){return w.ontouchmove(e,!0)}),_.grabcursorenabled&&S.cursorgrabvalue&&w.css(P(t.body),{cursor:S.cursorgrabvalue})),w.bind(t,"mouseup",w.ontouchend),w.zoom&&(_.dblclickzoom&&w.bind(t,"dblclick",w.doZoom),w.ongesturezoom&&w.bind(t,"gestureend",w.ongesturezoom))};this.doc[0].readyState&&"complete"===this.doc[0].readyState&&setTimeout(function(){y.call(w.doc[0],!1)},500),w.bind(this.doc,"load",y)}},this.showCursor=function(e,t){if(w.cursortimeout&&(clearTimeout(w.cursortimeout),w.cursortimeout=0),w.rail){if(w.autohidedom&&(w.autohidedom.stop().css({opacity:_.cursoropacitymax}),w.cursoractive=!0),w.rail.drag&&1==w.rail.drag.pt||(void 0!==e&&!1!==e&&(w.scroll.y=e/w.scrollratio.y|0),void 0!==t&&(w.scroll.x=t/w.scrollratio.x|0)),w.cursor.css({height:w.cursorheight,top:w.scroll.y}),w.cursorh){var i=w.hasreversehr?w.scrollvaluemaxw-w.scroll.x:w.scroll.x;w.cursorh.css({width:w.cursorwidth,left:!w.rail.align&&w.rail.visibility?i+w.rail.width:i}),w.cursoractive=!0}w.zoom&&w.zoom.stop().css({opacity:_.cursoropacitymax})}},this.hideCursor=function(e){w.cursortimeout||w.rail&&w.autohidedom&&(w.hasmousefocus&&"leave"===_.autohidemode||(w.cursortimeout=setTimeout(function(){w.rail.active&&w.showonmouseevent||(w.autohidedom.stop().animate({opacity:_.cursoropacitymin}),w.zoom&&w.zoom.stop().animate({opacity:_.cursoropacitymin}),w.cursoractive=!1),w.cursortimeout=0},e||_.hidecursordelay)))},this.noticeCursor=function(e,t,i){w.showCursor(t,i),w.rail.active||w.hideCursor(e)},this.getContentSize=w.ispage?function(){return{w:Math.max(A.body.scrollWidth,A.documentElement.scrollWidth),h:Math.max(A.body.scrollHeight,A.documentElement.scrollHeight)}}:w.haswrapper?function(){return{w:w.doc[0].offsetWidth,h:w.doc[0].offsetHeight}}:function(){return{w:w.docscroll[0].scrollWidth,h:w.docscroll[0].scrollHeight}},this.onResize=function(e,t){if(!w||!w.win)return!1;var i=w.page.maxh,n=w.page.maxw,s=w.view.h,r=w.view.w;if(w.view={w:w.ispage?w.win.width():w.win[0].clientWidth,h:w.ispage?w.win.height():w.win[0].clientHeight},w.page=t||w.getContentSize(),w.page.maxh=Math.max(0,w.page.h-w.view.h),w.page.maxw=Math.max(0,w.page.w-w.view.w),w.page.maxh==i&&w.page.maxw==n&&w.view.w==r&&w.view.h==s){if(w.ispage)return w;var o=w.win.offset();if(w.lastposition){var a=w.lastposition;if(a.top==o.top&&a.left==o.left)return w}w.lastposition=o}return 0===w.page.maxh?(w.hideRail(),w.scrollvaluemax=0,w.scroll.y=0,w.scrollratio.y=0,w.cursorheight=0,w.setScrollTop(0),w.rail&&(w.rail.scrollable=!1)):(w.page.maxh-=_.railpadding.top+_.railpadding.bottom,w.rail.scrollable=!0),0===w.page.maxw?(w.hideRailHr(),w.scrollvaluemaxw=0,w.scroll.x=0,w.scrollratio.x=0,w.cursorwidth=0,w.setScrollLeft(0),w.railh&&(w.railh.scrollable=!1)):(w.page.maxw-=_.railpadding.left+_.railpadding.right,w.railh&&(w.railh.scrollable=_.horizrailenabled)),w.railslocked=w.locked||0===w.page.maxh&&0===w.page.maxw,w.railslocked?(w.ispage||w.updateScrollBar(w.view),!1):(w.hidden||(w.rail.visibility||w.showRail(),w.railh&&!w.railh.visibility&&w.showRailHr()),w.istextarea&&w.win.css("resize")&&"none"!=w.win.css("resize")&&(w.view.h-=20),w.cursorheight=Math.min(w.view.h,Math.round(w.view.h*(w.view.h/w.page.h))),w.cursorheight=_.cursorfixedheight?_.cursorfixedheight:Math.max(_.cursorminheight,w.cursorheight),w.cursorwidth=Math.min(w.view.w,Math.round(w.view.w*(w.view.w/w.page.w))),w.cursorwidth=_.cursorfixedheight?_.cursorfixedheight:Math.max(_.cursorminheight,w.cursorwidth),w.scrollvaluemax=w.view.h-w.cursorheight-(_.railpadding.top+_.railpadding.bottom),w.hasborderbox||(w.scrollvaluemax-=w.cursor[0].offsetHeight-w.cursor[0].clientHeight),w.railh&&(w.railh.width=0<w.page.maxh?w.view.w-w.rail.width:w.view.w,w.scrollvaluemaxw=w.railh.width-w.cursorwidth-(_.railpadding.left+_.railpadding.right)),w.ispage||w.updateScrollBar(w.view),w.scrollratio={x:w.page.maxw/w.scrollvaluemaxw,y:w.page.maxh/w.scrollvaluemax},w.getScrollTop()>w.page.maxh?w.doScrollTop(w.page.maxh):(w.scroll.y=w.getScrollTop()/w.scrollratio.y|0,w.scroll.x=w.getScrollLeft()/w.scrollratio.x|0,w.cursoractive&&w.noticeCursor()),w.scroll.y&&0===w.getScrollTop()&&w.doScrollTo(w.scroll.y*w.scrollratio.y|0),w)},this.resize=w.onResize;var c=0;function h(i,n,s,e){w._bind(i,n,function(e){var t={original:e=e||O.event,target:e.target||e.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==e.type?0:1,deltaX:0,deltaZ:0,preventDefault:function(){return e.preventDefault?e.preventDefault():e.returnValue=!1,!1},stopImmediatePropagation:function(){e.stopImmediatePropagation?e.stopImmediatePropagation():e.cancelBubble=!0}};return"mousewheel"==n?(e.wheelDeltaX&&(t.deltaX=-.025*e.wheelDeltaX),e.wheelDeltaY&&(t.deltaY=-.025*e.wheelDeltaY),!t.deltaY&&!t.deltaX&&(t.deltaY=-.025*e.wheelDelta)):t.deltaY=e.detail,s.call(i,t)},e)}this.onscreenresize=function(e){clearTimeout(c);var t=!w.ispage&&!w.haswrapper;t&&w.hideRails(),c=setTimeout(function(){w&&(t&&w.showRails(),w.resize()),c=0},120)},this.lazyResize=function(e){return clearTimeout(c),e=isNaN(e)?240:e,c=setTimeout(function(){w&&w.resize(),c=0},e),w},this.jqbind=function(e,t,i){w.events.push({e:e,n:t,f:i,q:!0}),P(e).on(t,i)},this.mousewheel=function(e,t,i){var n="jquery"in e?e[0]:e;if("onwheel"in A.createElement("div"))w._bind(n,"wheel",t,i||!1);else{var s=void 0!==A.onmousewheel?"mousewheel":"DOMMouseScroll";h(n,s,t,i||!1),"DOMMouseScroll"==s&&h(n,"MozMousePixelScroll",t,i||!1)}};var u=!1;if(S.haseventlistener){try{var f=Object.defineProperty({},"passive",{get:function(){u=!0}});O.addEventListener("test",null,f)}catch(e){}this.stopPropagation=function(e){return e&&(e=e.original?e.original:e).stopPropagation(),!1},this.cancelEvent=function(e){return e.cancelable&&e.preventDefault(),e.stopImmediatePropagation(),e.preventManipulation&&e.preventManipulation(),!1}}else Event.prototype.preventDefault=function(){this.returnValue=!1},Event.prototype.stopPropagation=function(){this.cancelBubble=!0},O.constructor.prototype.addEventListener=A.constructor.prototype.addEventListener=Element.prototype.addEventListener=function(e,t,i){this.attachEvent("on"+e,t)},O.constructor.prototype.removeEventListener=A.constructor.prototype.removeEventListener=Element.prototype.removeEventListener=function(e,t,i){this.detachEvent("on"+e,t)},this.cancelEvent=function(e){return(e=e||O.event)&&(e.cancelBubble=!0,e.cancel=!0,e.returnValue=!1),!1},this.stopPropagation=function(e){return(e=e||O.event)&&(e.cancelBubble=!0),!1};this.delegate=function(e,t,i,n,s){var r=L[t]||!1;r||(r={a:[],l:[],f:function(e){for(var t=r.l,i=!1,n=t.length-1;0<=n;n--)if(!1===(i=t[n].call(e.target,e)))return!1;return i}},w.bind(e,t,r.f,n,s),L[t]=r),w.ispage?(r.a=[w.id].concat(r.a),r.l=[i].concat(r.l)):(r.a.push(w.id),r.l.push(i))},this.undelegate=function(e,t,i,n,s){var r=L[t]||!1;if(r&&r.l)for(var o=0,a=r.l.length;o<a;o++)r.a[o]===w.id&&(r.a.splice(o),r.l.splice(o),0===r.a.length&&(w._unbind(e,t,r.l.f),L[t]=null))},this.bind=function(e,t,i,n,s){var r="jquery"in e?e[0]:e;w._bind(r,t,i,n||!1,s||!1)},this._bind=function(e,t,i,n,s){w.events.push({e:e,n:t,f:i,b:n,q:!1}),u&&s?e.addEventListener(t,i,{passive:!1,capture:n}):e.addEventListener(t,i,n||!1)},this._unbind=function(e,t,i,n){L[t]?w.undelegate(e,t,i,n):e.removeEventListener(t,i,n)},this.unbindAll=function(){for(var e=0;e<w.events.length;e++){var t=w.events[e];t.q?t.e.unbind(t.n,t.f):w._unbind(t.e,t.n,t.f,t.b)}},this.showRails=function(){return w.showRail().showRailHr()},this.showRail=function(){return 0===w.page.maxh||!w.ispage&&"none"==w.win.css("display")||(w.rail.visibility=!0,w.rail.css("display","block")),w},this.showRailHr=function(){return w.railh&&(0===w.page.maxw||!w.ispage&&"none"==w.win.css("display")||(w.railh.visibility=!0,w.railh.css("display","block"))),w},this.hideRails=function(){return w.hideRail().hideRailHr()},this.hideRail=function(){return w.rail.visibility=!1,w.rail.css("display","none"),w},this.hideRailHr=function(){return w.railh&&(w.railh.visibility=!1,w.railh.css("display","none")),w},this.show=function(){return w.hidden=!1,w.railslocked=!1,w.showRails()},this.hide=function(){return w.hidden=!0,w.railslocked=!0,w.hideRails()},this.toggle=function(){return w.hidden?w.show():w.hide()},this.remove=function(){for(var e in w.stop(),w.cursortimeout&&clearTimeout(w.cursortimeout),w.delaylist)w.delaylist[e]&&F(w.delaylist[e].h);w.doZoomOut(),w.unbindAll(),S.isie9&&w.win[0].detachEvent("onpropertychange",w.onAttributeChange),!1!==w.observer&&w.observer.disconnect(),!1!==w.observerremover&&w.observerremover.disconnect(),!1!==w.observerbody&&w.observerbody.disconnect(),w.events=null,w.cursor&&w.cursor.remove(),w.cursorh&&w.cursorh.remove(),w.rail&&w.rail.remove(),w.railh&&w.railh.remove(),w.zoom&&w.zoom.remove();for(var t=0;t<w.saved.css.length;t++){var i=w.saved.css[t];i[0].css(i[1],void 0===i[2]?"":i[2])}w.saved=!1,w.me.data("__nicescroll","");var n=P.nicescroll;for(var s in n.each(function(e){if(this&&this.id===w.id){delete n[e];for(var t=++e;t<n.length;t++,e++)n[e]=n[t];n.length--,n.length&&delete n[n.length]}}),w)w[s]=null,delete w[s];w=null},this.scrollstart=function(e){return this.onscrollstart=e,w},this.scrollend=function(e){return this.onscrollend=e,w},this.scrollcancel=function(e){return this.onscrollcancel=e,w},this.zoomin=function(e){return this.onzoomin=e,w},this.zoomout=function(e){return this.onzoomout=e,w},this.isScrollable=function(e){var t=e.target?e.target:e;if("OPTION"==t.nodeName)return!0;for(;t&&1==t.nodeType&&t!==this.me[0]&&!/^BODY|HTML/.test(t.nodeName);){var i=P(t),n=i.css("overflowY")||i.css("overflowX")||i.css("overflow")||"";if(/scroll|auto/.test(n))return t.clientHeight!=t.scrollHeight;t=!!t.parentNode&&t.parentNode}return!1},this.getViewport=function(e){for(var t=!(!e||!e.parentNode)&&e.parentNode;t&&1==t.nodeType&&!/^BODY|HTML/.test(t.nodeName);){var i=P(t);if(/fixed|absolute/.test(i.css("position")))return i;var n=i.css("overflowY")||i.css("overflowX")||i.css("overflow")||"";if(/scroll|auto/.test(n)&&t.clientHeight!=t.scrollHeight)return i;if(0<i.getNiceScroll().length)return i;t=!!t.parentNode&&t.parentNode}return!1},this.triggerScrollStart=function(e,t,i,n,s){if(w.onscrollstart){var r={type:"scrollstart",current:{x:e,y:t},request:{x:i,y:n},end:{x:w.newscrollx,y:w.newscrolly},speed:s};w.onscrollstart.call(w,r)}},this.triggerScrollEnd=function(){if(w.onscrollend){var e=w.getScrollLeft(),t=w.getScrollTop(),i={type:"scrollend",current:{x:e,y:t},end:{x:e,y:t}};w.onscrollend.call(w,i)}};var m=0,p=0,g=0,v=1;function y(e,t,i,n){w.scrollrunning||(w.newscrolly=w.getScrollTop(),w.newscrollx=w.getScrollLeft(),g=W());var s=W()-g;if(g=W(),350<s?v=1:v+=(2-v)/10,t=t*v|0,e=e*v|0){if(n)if(e<0){if(w.getScrollLeft()>=w.page.maxw)return!0}else if(w.getScrollLeft()<=0)return!0;var r=0<e?1:-1;p!==r&&(w.scrollmom&&w.scrollmom.stop(),w.newscrollx=w.getScrollLeft(),p=r),w.lastdeltax-=e}if(t){if(function(){var e=w.getScrollTop();if(t<0){if(e>=w.page.maxh)return!0}else if(e<=0)return!0}()){if(_.nativeparentscrolling&&i&&!w.ispage&&!w.zoomactive)return!0;var o=w.view.h>>1;w.newscrolly<-o?(w.newscrolly=-o,t=-1):w.newscrolly>w.page.maxh+o?(w.newscrolly=w.page.maxh+o,t=1):t=0}var a=0<t?1:-1;m!==a&&(w.scrollmom&&w.scrollmom.stop(),w.newscrolly=w.getScrollTop(),m=a),w.lastdeltay-=t}(t||e)&&w.synched("relativexy",function(){var e=w.lastdeltay+w.newscrolly;w.lastdeltay=0;var t=w.lastdeltax+w.newscrollx;w.lastdeltax=0,w.rail.drag||w.doScrollPos(t,e)})}var x=!1;function D(e,t,i){var n,s;if(!i&&x)return!0;(0===e.deltaMode?(n=-e.deltaX*(_.mousescrollstep/54)|0,s=-e.deltaY*(_.mousescrollstep/54)|0):1===e.deltaMode&&(n=-e.deltaX*_.mousescrollstep*50/80|0,s=-e.deltaY*_.mousescrollstep*50/80|0),t&&_.oneaxismousemode&&0===n&&s)&&(n=s,s=0,i&&(n<0?w.getScrollLeft()>=w.page.maxw:w.getScrollLeft()<=0)&&(s=n,n=0));if(w.isrtlmode&&(n=-n),!y(n,s,i,!0))return x=!1,e.stopImmediatePropagation(),e.preventDefault();i&&(x=!0)}if(this.onmousewheel=function(e){if(w.wheelprevented||w.locked)return!1;if(w.railslocked)return w.debounced("checkunlock",w.resize,250),!1;if(w.rail.drag)return w.cancelEvent(e);if("auto"===_.oneaxismousemode&&0!==e.deltaX&&(_.oneaxismousemode=!1),_.oneaxismousemode&&0===e.deltaX&&!w.rail.scrollable)return!w.railh||!w.railh.scrollable||w.onmousewheelhr(e);var t=W(),i=!1;if(_.preservenativescrolling&&w.checkarea+600<t&&(w.nativescrollingarea=w.isScrollable(e),i=!0),w.checkarea=t,w.nativescrollingarea)return!0;var n=D(e,!1,i);return n&&(w.checkarea=0),n},this.onmousewheelhr=function(e){if(!w.wheelprevented){if(w.railslocked||!w.railh.scrollable)return!0;if(w.rail.drag)return w.cancelEvent(e);var t=W(),i=!1;return _.preservenativescrolling&&w.checkarea+600<t&&(w.nativescrollingarea=w.isScrollable(e),i=!0),w.checkarea=t,!!w.nativescrollingarea||(w.railslocked?w.cancelEvent(e):D(e,!0,i))}},this.stop=function(){return w.cancelScroll(),w.scrollmon&&w.scrollmon.stop(),w.cursorfreezed=!1,w.scroll.y=Math.round(w.getScrollTop()*(1/w.scrollratio.y)),w.noticeCursor(),w},this.getTransitionSpeed=function(e){return 80+e/72*_.scrollspeed|0},_.smoothscroll)if(w.ishwscroll&&S.hastransition&&_.usetransition&&_.smoothscroll){var k="";this.resetTransition=function(){k="",w.doc.css(S.prefixstyle+"transition-duration","0ms")},this.prepareTransition=function(e,t){var i=t?e:w.getTransitionSpeed(e),n=i+"ms";return k!==n&&(k=n,w.doc.css(S.prefixstyle+"transition-duration",n)),i},this.doScrollLeft=function(e,t){var i=w.scrollrunning?w.newscrolly:w.getScrollTop();w.doScrollPos(e,i,t)},this.doScrollTop=function(e,t){var i=w.scrollrunning?w.newscrollx:w.getScrollLeft();w.doScrollPos(i,e,t)},this.cursorupdate={running:!1,start:function(){var e=this;if(!e.running){e.running=!0;var t=function(){e.running&&N(t),w.showCursor(w.getScrollTop(),w.getScrollLeft()),w.notifyScrollEvent(w.win[0])};N(t)}},stop:function(){this.running=!1}},this.doScrollPos=function(e,t,i){var n=w.getScrollTop(),s=w.getScrollLeft();if(((w.newscrolly-n)*(t-n)<0||(w.newscrollx-s)*(e-s)<0)&&w.cancelScroll(),_.bouncescroll?(t<0?t=t/2|0:t>w.page.maxh&&(t=w.page.maxh+(t-w.page.maxh)/2|0),e<0?e=e/2|0:e>w.page.maxw&&(e=w.page.maxw+(e-w.page.maxw)/2|0)):(t<0?t=0:t>w.page.maxh&&(t=w.page.maxh),e<0?e=0:e>w.page.maxw&&(e=w.page.maxw)),w.scrollrunning&&e==w.newscrollx&&t==w.newscrolly)return!1;w.newscrolly=t,w.newscrollx=e;var r=w.getScrollTop(),o=w.getScrollLeft(),a={};a.x=e-o,a.y=t-r;var l=0|Math.sqrt(a.x*a.x+a.y*a.y),c=w.prepareTransition(l);w.scrollrunning||(w.scrollrunning=!0,w.triggerScrollStart(o,r,e,t,c),w.cursorupdate.start()),w.scrollendtrapped=!0,S.transitionend||(w.scrollendtrapped&&clearTimeout(w.scrollendtrapped),w.scrollendtrapped=setTimeout(w.onScrollTransitionEnd,c)),w.setScrollTop(w.newscrolly),w.setScrollLeft(w.newscrollx)},this.cancelScroll=function(){if(!w.scrollendtrapped)return!0;var e=w.getScrollTop(),t=w.getScrollLeft();return w.scrollrunning=!1,S.transitionend||clearTimeout(S.transitionend),w.scrollendtrapped=!1,w.resetTransition(),w.setScrollTop(e),w.railh&&w.setScrollLeft(t),w.timerscroll&&w.timerscroll.tm&&clearInterval(w.timerscroll.tm),w.timerscroll=!1,w.cursorfreezed=!1,w.cursorupdate.stop(),w.showCursor(e,t),w},this.onScrollTransitionEnd=function(){if(w.scrollendtrapped){var e=w.getScrollTop(),t=w.getScrollLeft();if(e<0?e=0:e>w.page.maxh&&(e=w.page.maxh),t<0?t=0:t>w.page.maxw&&(t=w.page.maxw),e!=w.newscrolly||t!=w.newscrollx)return w.doScrollPos(t,e,_.snapbackspeed);w.scrollrunning&&w.triggerScrollEnd(),w.scrollrunning=!1,w.scrollendtrapped=!1,w.resetTransition(),w.timerscroll=!1,w.setScrollTop(e),w.railh&&w.setScrollLeft(t),w.cursorupdate.stop(),w.noticeCursor(!1,e,t),w.cursorfreezed=!1}}}else this.doScrollLeft=function(e,t){var i=w.scrollrunning?w.newscrolly:w.getScrollTop();w.doScrollPos(e,i,t)},this.doScrollTop=function(e,t){var i=w.scrollrunning?w.newscrollx:w.getScrollLeft();w.doScrollPos(i,e,t)},this.doScrollPos=function(e,t,i){var n=w.getScrollTop(),s=w.getScrollLeft();((w.newscrolly-n)*(t-n)<0||(w.newscrollx-s)*(e-s)<0)&&w.cancelScroll();var r=!1;if(w.bouncescroll&&w.rail.visibility||(t<0?r=!(t=0):t>w.page.maxh&&(t=w.page.maxh,r=!0)),w.bouncescroll&&w.railh.visibility||(e<0?r=!(e=0):e>w.page.maxw&&(e=w.page.maxw,r=!0)),w.scrollrunning&&w.newscrolly===t&&w.newscrollx===e)return!0;w.newscrolly=t,w.newscrollx=e,w.dst={},w.dst.x=e-s,w.dst.y=t-n,w.dst.px=s,w.dst.py=n;var o=0|Math.sqrt(w.dst.x*w.dst.x+w.dst.y*w.dst.y),a=w.getTransitionSpeed(o);w.bzscroll={};var l=r?1:.58;w.bzscroll.x=new d(s,w.newscrollx,a,0,0,l,1),w.bzscroll.y=new d(n,w.newscrolly,a,0,0,l,1);W();var c=function(){if(w.scrollrunning){var e=w.bzscroll.y.getPos();w.setScrollLeft(w.bzscroll.x.getNow()),w.setScrollTop(w.bzscroll.y.getNow()),e<=1?w.timer=N(c):(w.scrollrunning=!1,w.timer=0,w.triggerScrollEnd())}};w.scrollrunning||(w.triggerScrollStart(s,n,e,t,a),w.scrollrunning=!0,w.timer=N(c))},this.cancelScroll=function(){return w.timer&&F(w.timer),w.timer=0,w.bzscroll=!1,w.scrollrunning=!1,w};else this.doScrollLeft=function(e,t){var i=w.getScrollTop();w.doScrollPos(e,i,t)},this.doScrollTop=function(e,t){var i=w.getScrollLeft();w.doScrollPos(i,e,t)},this.doScrollPos=function(e,t,i){var n=e>w.page.maxw?w.page.maxw:e;n<0&&(n=0);var s=t>w.page.maxh?w.page.maxh:t;s<0&&(s=0),w.synched("scroll",function(){w.setScrollTop(s),w.setScrollLeft(n)})},this.cancelScroll=function(){};this.doScrollBy=function(e,t){y(0,e)},this.doScrollLeftBy=function(e,t){y(e,0)},this.doScrollTo=function(e,t){var i=t?Math.round(e*w.scrollratio.y):e;i<0?i=0:i>w.page.maxh&&(i=w.page.maxh),w.cursorfreezed=!1,w.doScrollTop(e)},this.checkContentSize=function(){var e=w.getContentSize();e.h==w.page.h&&e.w==w.page.w||w.resize(!1,e)},w.onscroll=function(e){w.rail.drag||w.cursorfreezed||w.synched("scroll",function(){w.scroll.y=Math.round(w.getScrollTop()/w.scrollratio.y),w.railh&&(w.scroll.x=Math.round(w.getScrollLeft()/w.scrollratio.x)),w.noticeCursor()})},w.bind(w.docscroll,"scroll",w.onscroll),this.doZoomIn=function(e){if(!w.zoomactive){w.zoomactive=!0,w.zoomrestore={style:{}};var t=["position","top","left","zIndex","backgroundColor","marginTop","marginBottom","marginLeft","marginRight"],i=w.win[0].style;for(var n in t){var s=t[n];w.zoomrestore.style[s]=void 0!==i[s]?i[s]:""}w.zoomrestore.style.width=w.win.css("width"),w.zoomrestore.style.height=w.win.css("height"),w.zoomrestore.padding={w:w.win.outerWidth()-w.win.width(),h:w.win.outerHeight()-w.win.height()},S.isios4&&(w.zoomrestore.scrollTop=Y.scrollTop(),Y.scrollTop(0)),w.win.css({position:S.isios4?"absolute":"fixed",top:0,left:0,zIndex:M+100,margin:0});var r=w.win.css("backgroundColor");return(""===r||/transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(r))&&w.win.css("backgroundColor","#fff"),w.rail.css({zIndex:M+101}),w.zoom.css({zIndex:M+102}),w.zoom.css("backgroundPosition","0 -18px"),w.resizeZoom(),w.onzoomin&&w.onzoomin.call(w),w.cancelEvent(e)}},this.doZoomOut=function(e){if(w.zoomactive)return w.zoomactive=!1,w.win.css("margin",""),w.win.css(w.zoomrestore.style),S.isios4&&Y.scrollTop(w.zoomrestore.scrollTop),w.rail.css({"z-index":w.zindex}),w.zoom.css({"z-index":w.zindex}),w.zoomrestore=!1,w.zoom.css("backgroundPosition","0 0"),w.onResize(),w.onzoomout&&w.onzoomout.call(w),w.cancelEvent(e)},this.doZoom=function(e){return w.zoomactive?w.doZoomOut(e):w.doZoomIn(e)},this.resizeZoom=function(){if(w.zoomactive){var e=w.getScrollTop();w.win.css({width:Y.width()-w.zoomrestore.padding.w+"px",height:Y.height()-w.zoomrestore.padding.h+"px"}),w.onResize(),w.setScrollTop(Math.min(w.page.maxh,e))}},this.init(),P.nicescroll.push(this)},j=function(e){var p=this;this.nc=e,this.lastx=0,this.lasty=0,this.speedx=0,this.speedy=0,this.lasttime=0,this.steptime=0,this.snapx=!1,this.snapy=!1,this.demulx=0,this.demuly=0,this.lastscrollx=-1,this.lastscrolly=-1,this.chkx=0,this.chky=0,this.timer=0,this.reset=function(e,t){p.stop(),p.steptime=0,p.lasttime=W(),p.speedx=0,p.speedy=0,p.lastx=e,p.lasty=t,p.lastscrollx=-1,p.lastscrolly=-1},this.update=function(e,t){var i=W();p.steptime=i-p.lasttime,p.lasttime=i;var n=t-p.lasty,s=e-p.lastx,r=p.nc.getScrollTop()+n,o=p.nc.getScrollLeft()+s;p.snapx=o<0||o>p.nc.page.maxw,p.snapy=r<0||r>p.nc.page.maxh,p.speedx=s,p.speedy=n,p.lastx=e,p.lasty=t},this.stop=function(){p.nc.unsynched("domomentum2d"),p.timer&&clearTimeout(p.timer),p.timer=0,p.lastscrollx=-1,p.lastscrolly=-1},this.doSnapy=function(e,t){var i=!1;t<0?i=!(t=0):t>p.nc.page.maxh&&(t=p.nc.page.maxh,i=!0),e<0?i=!(e=0):e>p.nc.page.maxw&&(e=p.nc.page.maxw,i=!0),i?p.nc.doScrollPos(e,t,p.nc.opt.snapbackspeed):p.nc.triggerScrollEnd()},this.doMomentum=function(e){var t=W(),i=e?t+e:p.lasttime,n=p.nc.getScrollLeft(),s=p.nc.getScrollTop(),r=p.nc.page.maxh,o=p.nc.page.maxw;p.speedx=0<o?Math.min(60,p.speedx):0,p.speedy=0<r?Math.min(60,p.speedy):0;var a=i&&t-i<=60;(s<0||r<s||n<0||o<n)&&(a=!1);var l=!(!p.speedy||!a)&&p.speedy,c=!(!p.speedx||!a)&&p.speedx;if(l||c){var d=Math.max(16,p.steptime);if(50<d){var h=d/50;p.speedx*=h,p.speedy*=h,d=50}p.demulxy=0,p.lastscrollx=p.nc.getScrollLeft(),p.chkx=p.lastscrollx,p.lastscrolly=p.nc.getScrollTop(),p.chky=p.lastscrolly;var u=p.lastscrollx,f=p.lastscrolly,m=function(){var e=600<W()-t?.04:.02;p.speedx&&(u=Math.floor(p.lastscrollx-p.speedx*(1-p.demulxy)),((p.lastscrollx=u)<0||o<u)&&(e=.1)),p.speedy&&(f=Math.floor(p.lastscrolly-p.speedy*(1-p.demulxy)),((p.lastscrolly=f)<0||r<f)&&(e=.1)),p.demulxy=Math.min(1,p.demulxy+e),p.nc.synched("domomentum2d",function(){if(p.speedx){p.nc.getScrollLeft();p.chkx=u,p.nc.setScrollLeft(u)}if(p.speedy){p.nc.getScrollTop();p.chky=f,p.nc.setScrollTop(f)}p.timer||(p.nc.hideCursor(),p.doSnapy(u,f))}),p.demulxy<1?p.timer=setTimeout(m,d):(p.stop(),p.nc.hideCursor(),p.doSnapy(u,f))};m()}else p.doSnapy(p.nc.getScrollLeft(),p.nc.getScrollTop())}},s=e.fn.scrollTop;e.cssHooks.pageYOffset={get:function(e,t,i){var n=P.data(e,"__nicescroll")||!1;return n&&n.ishwscroll?n.getScrollTop():s.call(e)},set:function(e,t){var i=P.data(e,"__nicescroll")||!1;return i&&i.ishwscroll?i.setScrollTop(parseInt(t)):s.call(e,t),this}},e.fn.scrollTop=function(t){if(void 0===t){var e=this[0]&&P.data(this[0],"__nicescroll")||!1;return e&&e.ishwscroll?e.getScrollTop():s.call(this)}return this.each(function(){var e=P.data(this,"__nicescroll")||!1;e&&e.ishwscroll?e.setScrollTop(parseInt(t)):s.call(P(this),t)})};var o=e.fn.scrollLeft;P.cssHooks.pageXOffset={get:function(e,t,i){var n=P.data(e,"__nicescroll")||!1;return n&&n.ishwscroll?n.getScrollLeft():o.call(e)},set:function(e,t){var i=P.data(e,"__nicescroll")||!1;return i&&i.ishwscroll?i.setScrollLeft(parseInt(t)):o.call(e,t),this}},e.fn.scrollLeft=function(t){if(void 0===t){var e=this[0]&&P.data(this[0],"__nicescroll")||!1;return e&&e.ishwscroll?e.getScrollLeft():o.call(this)}return this.each(function(){var e=P.data(this,"__nicescroll")||!1;e&&e.ishwscroll?e.setScrollLeft(parseInt(t)):o.call(P(this),t)})};var l=function(e){var t=this;if(this.length=0,this.name="nicescrollarray",this.each=function(e){return P.each(t,e),t},this.push=function(e){t[t.length]=e,t.length++},this.eq=function(e){return t[e]},e)for(var i=0;i<e.length;i++){var n=P.data(e[i],"__nicescroll")||!1;n&&(this[this.length]=n,this.length++)}return this};!function(e,t,i){for(var n=0,s=t.length;n<s;n++)i(e,t[n])}(l.prototype,["show","hide","toggle","onResize","resize","remove","stop","doScrollPos"],function(e,t){e[t]=function(){var e=arguments;return this.each(function(){this[t].apply(this,e)})}}),e.fn.getNiceScroll=function(e){return void 0===e?new l(this):this[e]&&P.data(this[e],"__nicescroll")||!1},(e.expr.pseudos||e.expr[":"]).nicescroll=function(e){return void 0!==P.data(e,"__nicescroll")},P.fn.niceScroll=function(s,r){void 0!==r||"object"!=typeof s||"jquery"in s||(r=s,s=!1);var o=new l;return this.each(function(){var e=P(this),t=P.extend({},r);if(s){var i=P(s);t.doc=1<i.length?P(s,e):i,t.win=e}!("doc"in t)||"win"in t||(t.win=e);var n=e.data("__nicescroll")||!1;n||(t.doc=t.doc||e,n=new a(t,e),e.data("__nicescroll",n)),o.push(n)}),1===o.length?o[0]:o},O.NiceScroll={getjQuery:function(){return e}},P.nicescroll||(P.nicescroll=new l,P.nicescroll.options=R)}),"function"!=typeof Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t}),function(a,l,c,d){var i={init:function(e,t){this.$elem=a(t),this.options=a.extend({},a.fn.owlCarousel.options,this.$elem.data(),e),this.userOptions=e,this.loadContent()},loadContent:function(){var n=this;if("function"==typeof n.options.beforeInit&&n.options.beforeInit.apply(this,[n.$elem]),"string"==typeof n.options.jsonPath){var e=n.options.jsonPath;a.getJSON(e,function(e){if("function"==typeof n.options.jsonSuccess)n.options.jsonSuccess.apply(this,[e]);else{var t="";for(var i in e.owl)t+=e.owl[i].item;n.$elem.html(t)}n.logIn()})}else n.logIn()},logIn:function(e){var t=this;t.$elem.data("owl-originalStyles",t.$elem.attr("style")).data("owl-originalClasses",t.$elem.attr("class")),t.$elem.css({opacity:0}),t.orignalItems=t.options.items,t.checkBrowser(),t.wrapperWidth=0,t.checkVisible,t.setVars()},setVars:function(){var e=this;if(0===e.$elem.children().length)return!1;e.baseClass(),e.eventTypes(),e.$userItems=e.$elem.children(),e.itemsAmount=e.$userItems.length,e.wrapItems(),e.$owlItems=e.$elem.find(".owl-item"),e.$owlWrapper=e.$elem.find(".owl-wrapper"),e.playDirection="next",e.prevItem=0,e.prevArr=[0],e.currentItem=0,e.customEvents(),e.onStartup()},onStartup:function(){var e=this;e.updateItems(),e.calculateAll(),e.buildControls(),e.updateControls(),e.response(),e.moveEvents(),e.stopOnHover(),e.owlStatus(),!1!==e.options.transitionStyle&&e.transitionTypes(e.options.transitionStyle),!0===e.options.autoPlay&&(e.options.autoPlay=5e3),e.play(),e.$elem.find(".owl-wrapper").css("display","block"),e.$elem.is(":visible")?e.$elem.css("opacity",1):e.watchVisibility(),e.onstartup=!1,e.eachMoveUpdate(),"function"==typeof e.options.afterInit&&e.options.afterInit.apply(this,[e.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad(),!0===this.options.autoHeight&&this.autoHeight(),this.onVisibleItems(),"function"==typeof this.options.afterAction&&this.options.afterAction.apply(this,[this.$elem])},updateVars:function(){var e=this;"function"==typeof e.options.beforeUpdate&&e.options.beforeUpdate.apply(this,[e.$elem]),e.watchVisibility(),e.updateItems(),e.calculateAll(),e.updatePosition(),e.updateControls(),e.eachMoveUpdate(),"function"==typeof e.options.afterUpdate&&e.options.afterUpdate.apply(this,[e.$elem])},reload:function(e){var t=this;setTimeout(function(){t.updateVars()},0)},watchVisibility:function(){var e=this;if(!1!==e.$elem.is(":visible"))return!1;e.$elem.css({opacity:0}),clearInterval(e.autoPlayInterval),clearInterval(e.checkVisible),e.checkVisible=setInterval(function(){e.$elem.is(":visible")&&(e.reload(),e.$elem.animate({opacity:1},200),clearInterval(e.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'),this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'),this.wrapperOuter=this.$elem.find(".owl-wrapper-outer"),this.$elem.css("display","block")},baseClass:function(){var e=this.$elem.hasClass(this.options.baseClass),t=this.$elem.hasClass(this.options.theme);e||this.$elem.addClass(this.options.baseClass),t||this.$elem.addClass(this.options.theme)},updateItems:function(){var e=this;if(!1===e.options.responsive)return!1;if(!0===e.options.singleItem)return e.options.items=e.orignalItems=1,e.options.itemsCustom=!1,e.options.itemsDesktop=!1,e.options.itemsDesktopSmall=!1,e.options.itemsTablet=!1,e.options.itemsTabletSmall=!1,e.options.itemsMobile=!1;var t=a(e.options.responsiveBaseWidth).width();if(t>(e.options.itemsDesktop[0]||e.orignalItems)&&(e.options.items=e.orignalItems),void 0!==e.options.itemsCustom&&!1!==e.options.itemsCustom)for(var i in e.options.itemsCustom.sort(function(e,t){return e[0]-t[0]}),e.options.itemsCustom)void 0!==e.options.itemsCustom[i]&&e.options.itemsCustom[i][0]<=t&&(e.options.items=e.options.itemsCustom[i][1]);else t<=e.options.itemsDesktop[0]&&!1!==e.options.itemsDesktop&&(e.options.items=e.options.itemsDesktop[1]),t<=e.options.itemsDesktopSmall[0]&&!1!==e.options.itemsDesktopSmall&&(e.options.items=e.options.itemsDesktopSmall[1]),t<=e.options.itemsTablet[0]&&!1!==e.options.itemsTablet&&(e.options.items=e.options.itemsTablet[1]),t<=e.options.itemsTabletSmall[0]&&!1!==e.options.itemsTabletSmall&&(e.options.items=e.options.itemsTabletSmall[1]),t<=e.options.itemsMobile[0]&&!1!==e.options.itemsMobile&&(e.options.items=e.options.itemsMobile[1]);e.options.items>e.itemsAmount&&!0===e.options.itemsScaleUp&&(e.options.items=e.itemsAmount)},response:function(){var e,t=this;if(!0!==t.options.responsive)return!1;var i=a(l).width();t.resizer=function(){a(l).width()!==i&&(!1!==t.options.autoPlay&&clearInterval(t.autoPlayInterval),clearTimeout(e),e=setTimeout(function(){i=a(l).width(),t.updateVars()},t.options.responsiveRefreshRate))},a(l).resize(t.resizer)},updatePosition:function(){this.jumpTo(this.currentItem),!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var i=this,n=0,s=i.itemsAmount-i.options.items;i.$owlItems.each(function(e){var t=a(this);t.css({width:i.itemWidth}).data("owl-item",Number(e)),e%i.options.items!=0&&e!==s||s<e||(n+=1),t.data("owl-roundPages",n)})},appendWrapperSizes:function(){var e=this.$owlItems.length*this.itemWidth;this.$owlWrapper.css({width:2*e,left:0}),this.appendItemsSizes()},calculateAll:function(){this.calculateWidth(),this.appendWrapperSizes(),this.loops(),this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/this.options.items)},max:function(){var e=this,t=-1*(e.itemsAmount*e.itemWidth-e.options.items*e.itemWidth);return e.options.items>e.itemsAmount?(t=e.maximumItem=0,e.maximumPixels=0):(e.maximumItem=e.itemsAmount-e.options.items,e.maximumPixels=t),t},min:function(){return 0},loops:function(){this.positionsInArray=[0],this.pagesInArray=[];for(var e=0,t=0,i=0;i<this.itemsAmount;i++)if(t+=this.itemWidth,this.positionsInArray.push(-t),!0===this.options.scrollPerPage){var n=a(this.$owlItems[i]).data("owl-roundPages");n!==e&&(this.pagesInArray[e]=this.positionsInArray[i],e=n)}},buildControls:function(){!0!==this.options.navigation&&!0!==this.options.pagination||(this.owlControls=a('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem)),!0===this.options.pagination&&this.buildPagination(),!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var t=this,e=a('<div class="owl-buttons"/>');t.owlControls.append(e),t.buttonPrev=a("<div/>",{class:"owl-prev",html:t.options.navigationText[0]||""}),t.buttonNext=a("<div/>",{class:"owl-next",html:t.options.navigationText[1]||""}),e.append(t.buttonPrev).append(t.buttonNext),e.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(e){e.preventDefault()}),e.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(e){e.preventDefault(),a(this).hasClass("owl-next")?t.next():t.prev()})},buildPagination:function(){var t=this;t.paginationWrapper=a('<div class="owl-pagination"/>'),t.owlControls.append(t.paginationWrapper),t.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(e){e.preventDefault(),Number(a(this).data("owl-page"))!==t.currentItem&&t.goTo(Number(a(this).data("owl-page")),!0)})},updatePagination:function(){var e=this;if(!1===e.options.pagination)return!1;e.paginationWrapper.html("");for(var t=0,i=e.itemsAmount-e.itemsAmount%e.options.items,n=0;n<e.itemsAmount;n++)if(n%e.options.items==0){if(t+=1,i===n)var s=e.itemsAmount-e.options.items;var r=a("<div/>",{class:"owl-page"}),o=a("<span></span>",{text:!0===e.options.paginationNumbers?t:"",class:!0===e.options.paginationNumbers?"owl-numbers":""});r.append(o),r.data("owl-page",i===n?s:n),r.data("owl-roundPages",t),e.paginationWrapper.append(r)}e.checkPagination()},checkPagination:function(){var i=this;if(!1===i.options.pagination)return!1;i.paginationWrapper.find(".owl-page").each(function(e,t){a(this).data("owl-roundPages")===a(i.$owlItems[i.currentItem]).data("owl-roundPages")&&(i.paginationWrapper.find(".owl-page").removeClass("active"),a(this).addClass("active"))})},checkNavigation:function(){var e=this;if(!1===e.options.navigation)return!1;!1===e.options.rewindNav&&(0===e.currentItem&&0===e.maximumItem?(e.buttonPrev.addClass("disabled"),e.buttonNext.addClass("disabled")):0===e.currentItem&&0!==e.maximumItem?(e.buttonPrev.addClass("disabled"),e.buttonNext.removeClass("disabled")):e.currentItem===e.maximumItem?(e.buttonPrev.removeClass("disabled"),e.buttonNext.addClass("disabled")):0!==e.currentItem&&e.currentItem!==e.maximumItem&&(e.buttonPrev.removeClass("disabled"),e.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination(),this.checkNavigation(),this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(e){var t=this;if(t.isTransition)return!1;if(t.currentItem+=!0===t.options.scrollPerPage?t.options.items:1,t.currentItem>t.maximumItem+(1==t.options.scrollPerPage?t.options.items-1:0)){if(!0!==t.options.rewindNav)return t.currentItem=t.maximumItem,!1;t.currentItem=0,e="rewind"}t.goTo(t.currentItem,e)},prev:function(e){var t=this;if(t.isTransition)return!1;if(!0===t.options.scrollPerPage&&0<t.currentItem&&t.currentItem<t.options.items?t.currentItem=0:t.currentItem-=!0===t.options.scrollPerPage?t.options.items:1,t.currentItem<0){if(!0!==t.options.rewindNav)return t.currentItem=0,!1;t.currentItem=t.maximumItem,e="rewind"}t.goTo(t.currentItem,e)},goTo:function(e,t,i){var n=this;if(n.isTransition)return!1;if("function"==typeof n.options.beforeMove&&n.options.beforeMove.apply(this,[n.$elem]),e>=n.maximumItem?e=n.maximumItem:e<=0&&(e=0),n.currentItem=n.owl.currentItem=e,!1!==n.options.transitionStyle&&"drag"!==i&&1===n.options.items&&!0===n.browser.support3d)return n.swapSpeed(0),!0===n.browser.support3d?n.transition3d(n.positionsInArray[e]):n.css2slide(n.positionsInArray[e],1),n.afterGo(),n.singleItemTransition(),!1;var s=n.positionsInArray[e];!0===n.browser.support3d?(n.isCss3Finish=!1,!0===t?(n.swapSpeed("paginationSpeed"),setTimeout(function(){n.isCss3Finish=!0},n.options.paginationSpeed)):"rewind"===t?(n.swapSpeed(n.options.rewindSpeed),setTimeout(function(){n.isCss3Finish=!0},n.options.rewindSpeed)):(n.swapSpeed("slideSpeed"),setTimeout(function(){n.isCss3Finish=!0},n.options.slideSpeed)),n.transition3d(s)):!0===t?n.css2slide(s,n.options.paginationSpeed):"rewind"===t?n.css2slide(s,n.options.rewindSpeed):n.css2slide(s,n.options.slideSpeed),n.afterGo()},jumpTo:function(e){var t=this;"function"==typeof t.options.beforeMove&&t.options.beforeMove.apply(this,[t.$elem]),e>=t.maximumItem||-1===e?e=t.maximumItem:e<=0&&(e=0),t.swapSpeed(0),!0===t.browser.support3d?t.transition3d(t.positionsInArray[e]):t.css2slide(t.positionsInArray[e],1),t.currentItem=t.owl.currentItem=e,t.afterGo()},afterGo:function(){var e=this;e.prevArr.push(e.currentItem),e.prevItem=e.owl.prevItem=e.prevArr[e.prevArr.length-2],e.prevArr.shift(0),e.prevItem!==e.currentItem&&(e.checkPagination(),e.checkNavigation(),e.eachMoveUpdate(),!1!==e.options.autoPlay&&e.checkAp()),"function"==typeof e.options.afterMove&&e.prevItem!==e.currentItem&&e.options.afterMove.apply(this,[e.$elem])},stop:function(){this.apStatus="stop",clearInterval(this.autoPlayInterval)},checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var e=this;if(e.apStatus="play",!1===e.options.autoPlay)return!1;clearInterval(e.autoPlayInterval),e.autoPlayInterval=setInterval(function(){e.next(!0)},e.options.autoPlay)},swapSpeed:function(e){"slideSpeed"===e?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===e?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!=typeof e&&this.$owlWrapper.css(this.addCssSpeed(e))},addCssSpeed:function(e){return{"-webkit-transition":"all "+e+"ms ease","-moz-transition":"all "+e+"ms ease","-o-transition":"all "+e+"ms ease",transition:"all "+e+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(e){return{"-webkit-transform":"translate3d("+e+"px, 0px, 0px)","-moz-transform":"translate3d("+e+"px, 0px, 0px)","-o-transform":"translate3d("+e+"px, 0px, 0px)","-ms-transform":"translate3d("+e+"px, 0px, 0px)",transform:"translate3d("+e+"px, 0px,0px)"}},transition3d:function(e){this.$owlWrapper.css(this.doTranslate(e))},css2move:function(e){this.$owlWrapper.css({left:e})},css2slide:function(e,t){var i=this;i.isCssFinish=!1,i.$owlWrapper.stop(!0,!0).animate({left:e},{duration:t||i.options.slideSpeed,complete:function(){i.isCssFinish=!0}})},checkBrowser:function(){var e="translate3d(0px, 0px, 0px)",t=c.createElement("div");t.style.cssText="  -moz-transform:"+e+"; -ms-transform:"+e+"; -o-transform:"+e+"; -webkit-transform:"+e+"; transform:"+e;var i=t.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g),n=null!==i&&1===i.length,s="ontouchstart"in l||navigator.msMaxTouchPoints;this.browser={support3d:n,isTouch:s}},moveEvents:function(){!1===this.options.mouseDrag&&!1===this.options.touchDrag||(this.gestures(),this.disabledEvents())},eventTypes:function(){var e=this,t=["s","e","x"];e.ev_types={},!0===e.options.mouseDrag&&!0===e.options.touchDrag?t=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:!1===e.options.mouseDrag&&!0===e.options.touchDrag?t=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===e.options.mouseDrag&&!1===e.options.touchDrag&&(t=["mousedown.owl","mousemove.owl","mouseup.owl"]),e.ev_types.start=t[0],e.ev_types.move=t[1],e.ev_types.end=t[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(e){e.preventDefault()}),this.$elem.on("mousedown.disableTextSelect",function(e){return a(e.target).is("input, textarea, select, option")})},gestures:function(){var s=this,r={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};function i(e){return e.touches?{x:e.touches[0].pageX,y:e.touches[0].pageY}:e.pageX!==d?{x:e.pageX,y:e.pageY}:{x:e.clientX,y:e.clientY}}function o(e){"on"===e?(a(c).on(s.ev_types.move,t),a(c).on(s.ev_types.end,n)):"off"===e&&(a(c).off(s.ev_types.move),a(c).off(s.ev_types.end))}function t(e){e=e.originalEvent||e||l.event;s.newPosX=i(e).x-r.offsetX,s.newPosY=i(e).y-r.offsetY,s.newRelativeX=s.newPosX-r.relativePos,"function"==typeof s.options.startDragging&&!0!==r.dragging&&0!==s.newRelativeX&&(r.dragging=!0,s.options.startDragging.apply(s,[s.$elem])),(8<s.newRelativeX||s.newRelativeX<-8&&!0===s.browser.isTouch)&&(e.preventDefault?e.preventDefault():e.returnValue=!1,r.sliding=!0),(10<s.newPosY||s.newPosY<-10)&&!1===r.sliding&&a(c).off("touchmove.owl");s.newPosX=Math.max(Math.min(s.newPosX,s.newRelativeX/5),s.maximumPixels+s.newRelativeX/5),!0===s.browser.support3d?s.transition3d(s.newPosX):s.css2move(s.newPosX)}function n(t){if((t=t.originalEvent||t||l.event).target=t.target||t.srcElement,r.dragging=!1,!0!==s.browser.isTouch&&s.$owlWrapper.removeClass("grabbing"),s.newRelativeX<0?s.dragDirection=s.owl.dragDirection="left":s.dragDirection=s.owl.dragDirection="right",0!==s.newRelativeX){var e=s.getNewPosition();if(s.goTo(e,!1,"drag"),r.targetElement===t.target&&!0!==s.browser.isTouch){a(t.target).on("click.disable",function(e){e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault(),a(t.target).off("click.disable")});var i=a._data(t.target,"events").click,n=i.pop();i.splice(0,0,n)}}o("off")}s.isCssFinish=!0,s.$elem.on(s.ev_types.start,".owl-wrapper",function(e){if(3===(e=e.originalEvent||e||l.event).which)return!1;if(!(s.itemsAmount<=s.options.items)){if(!1===s.isCssFinish&&!s.options.dragBeforeAnimFinish)return!1;if(!1===s.isCss3Finish&&!s.options.dragBeforeAnimFinish)return!1;!1!==s.options.autoPlay&&clearInterval(s.autoPlayInterval),!0===s.browser.isTouch||s.$owlWrapper.hasClass("grabbing")||s.$owlWrapper.addClass("grabbing"),s.newPosX=0,s.newRelativeX=0,a(this).css(s.removeTransition());var t=a(this).position();r.relativePos=t.left,r.offsetX=i(e).x-t.left,r.offsetY=i(e).y-t.top,o("on"),r.sliding=!1,r.targetElement=e.target||e.srcElement}})},getNewPosition:function(){var e;return(e=this.closestItem())>this.maximumItem?(this.currentItem=this.maximumItem,e=this.maximumItem):0<=this.newPosX&&(e=0,this.currentItem=0),e},closestItem:function(){var i=this,n=!0===i.options.scrollPerPage?i.pagesInArray:i.positionsInArray,s=i.newPosX,r=null;return a.each(n,function(e,t){s-i.itemWidth/20>n[e+1]&&s-i.itemWidth/20<t&&"left"===i.moveDirection()?(r=t,!0===i.options.scrollPerPage?i.currentItem=a.inArray(r,i.positionsInArray):i.currentItem=e):s+i.itemWidth/20<t&&s+i.itemWidth/20>(n[e+1]||n[e]-i.itemWidth)&&"right"===i.moveDirection()&&(!0===i.options.scrollPerPage?(r=n[e+1]||n[n.length-1],i.currentItem=a.inArray(r,i.positionsInArray)):(r=n[e+1],i.currentItem=e+1))}),i.currentItem},moveDirection:function(){var e;return this.newRelativeX<0?(e="right",this.playDirection="next"):(e="left",this.playDirection="prev"),e},customEvents:function(){var i=this;i.$elem.on("owl.next",function(){i.next()}),i.$elem.on("owl.prev",function(){i.prev()}),i.$elem.on("owl.play",function(e,t){i.options.autoPlay=t,i.play(),i.hoverStatus="play"}),i.$elem.on("owl.stop",function(){i.stop(),i.hoverStatus="stop"}),i.$elem.on("owl.goTo",function(e,t){i.goTo(t)}),i.$elem.on("owl.jumpTo",function(e,t){i.jumpTo(t)})},stopOnHover:function(){var e=this;!0===e.options.stopOnHover&&!0!==e.browser.isTouch&&!1!==e.options.autoPlay&&(e.$elem.on("mouseover",function(){e.stop()}),e.$elem.on("mouseout",function(){"stop"!==e.hoverStatus&&e.play()}))},lazyLoad:function(){if(!1===this.options.lazyLoad)return!1;for(var e=0;e<this.itemsAmount;e++){var t=a(this.$owlItems[e]);if("loaded"!==t.data("owl-loaded")){var i=t.data("owl-item"),n=t.find(".lazyOwl");"string"==typeof n.data("src")?(t.data("owl-loaded")===d&&(n.hide(),t.addClass("loading").data("owl-loaded","checked")),(!0!==this.options.lazyFollow||i>=this.currentItem)&&i<this.currentItem+this.options.items&&n.length&&this.lazyPreload(t,n)):t.data("owl-loaded","loaded")}}},lazyPreload:function(e,t){var i=this,n=0;if("DIV"===t.prop("tagName")){t.css("background-image","url("+t.data("src")+")");var s=!0}else t[0].src=t.data("src");function r(){e.data("owl-loaded","loaded").removeClass("loading"),t.removeAttr("data-src"),"fade"===i.options.lazyEffect?t.fadeIn(400):t.show(),"function"==typeof i.options.afterLazyLoad&&i.options.afterLazyLoad.apply(this,[i.$elem])}!function e(){n+=1;i.completeImg(t.get(0))||!0===s?r():n<=100?setTimeout(e,100):r()}()},autoHeight:function(){var t=this,i=a(t.$owlItems[t.currentItem]).find("img");if(i.get(0)!==d){var n=0;!function e(){n+=1;t.completeImg(i.get(0))?s():n<=100?setTimeout(e,100):t.wrapperOuter.css("height","")}()}else s();function s(){var e=a(t.$owlItems[t.currentItem]).height();t.wrapperOuter.css("height",e+"px"),t.wrapperOuter.hasClass("autoHeight")||setTimeout(function(){t.wrapperOuter.addClass("autoHeight")},0)}},completeImg:function(e){return!!e.complete&&(void 0===e.naturalWidth||0!=e.naturalWidth)},onVisibleItems:function(){var e=this;!0===e.options.addClassActive&&e.$owlItems.removeClass("active"),e.visibleItems=[];for(var t=e.currentItem;t<e.currentItem+e.options.items;t++)e.visibleItems.push(t),!0===e.options.addClassActive&&a(e.$owlItems[t]).addClass("active");e.owl.visibleItems=e.visibleItems},transitionTypes:function(e){this.outClass="owl-"+e+"-out",this.inClass="owl-"+e+"-in"},singleItemTransition:function(){var e=this;e.isTransition=!0;var t=e.outClass,i=e.inClass,n=e.$owlItems.eq(e.currentItem),s=e.$owlItems.eq(e.prevItem),r=Math.abs(e.positionsInArray[e.currentItem])+e.positionsInArray[e.prevItem],o=Math.abs(e.positionsInArray[e.currentItem])+e.itemWidth/2;e.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":o+"px","-moz-perspective-origin":o+"px","perspective-origin":o+"px"});var a,l="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";s.css((a=r,{position:"relative",left:a+"px"})).addClass(t).on(l,function(){e.endPrev=!0,s.off(l),e.clearTransStyle(s,t)}),n.addClass(i).on(l,function(){e.endCurrent=!0,n.off(l),e.clearTransStyle(n,i)})},clearTransStyle:function(e,t){e.css({position:"",left:""}).removeClass(t),this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.endPrev=!1,this.endCurrent=!1,this.isTransition=!1)},owlStatus:function(){var e=this;e.owl={userOptions:e.userOptions,baseElement:e.$elem,userItems:e.$userItems,owlItems:e.$owlItems,currentItem:e.currentItem,prevItem:e.prevItem,visibleItems:e.visibleItems,isTouch:e.browser.isTouch,browser:e.browser,dragDirection:e.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect"),a(c).off(".owl owl"),a(l).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove()),this.clearEvents(),this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop(),clearInterval(this.checkVisible),this.unWrap(),this.$elem.removeData()},reinit:function(e){var t=a.extend({},this.userOptions,e);this.unWrap(),this.init(t,this.$elem)},addItem:function(e,t){var i;return!!e&&(0===this.$elem.children().length?(this.$elem.append(e),this.setVars(),!1):(this.unWrap(),(i=t===d||-1===t?-1:t)>=this.$userItems.length||-1===i?this.$userItems.eq(-1).after(e):this.$userItems.eq(i).before(e),void this.setVars()))},removeItem:function(e){var t;if(0===this.$elem.children().length)return!1;t=e===d||-1===e?-1:e,this.unWrap(),this.$userItems.eq(t).remove(),this.setVars()}};a.fn.owlCarousel=function(t){return this.each(function(){if(!0===a(this).data("owl-init"))return!1;a(this).data("owl-init",!0);var e=Object.create(i);e.init(t,this),a.data(this,"owlCarousel",e)})},a.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:l,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}}(jQuery,window,document);
/*!
 * MockJax - jQuery Plugin to Mock Ajax requests
 *
 * Version:  1.5.3
 * Released:
 * Home:   http://github.com/appendto/jquery-mockjax
 * Author:   Jonathan Sharp (http://jdsharp.com)
 * License:  MIT,GPL
 *
 * Copyright (c) 2011 appendTo LLC.
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 */
(function ($) {
    var _ajax = $.ajax,
        mockHandlers = [],
        mockedAjaxCalls = [],
        CALLBACK_REGEX = /=\?(&|$)/,
        jsc = (new Date()).getTime();


    // Parse the given XML string.
    function parseXML(xml) {
        if (window.DOMParser == undefined && window.ActiveXObject) {
            DOMParser = function () {
            };
            DOMParser.prototype.parseFromString = function (xmlString) {
                var doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(xmlString);
                return doc;
            };
        }

        try {
            var xmlDoc = ( new DOMParser() ).parseFromString(xml, 'text/xml');
            if ($.isXMLDoc(xmlDoc)) {
                var err = $('parsererror', xmlDoc);
                if (err.length == 1) {
                    throw('Error: ' + $(xmlDoc).text() );
                }
            } else {
                throw('Unable to parse XML');
            }
            return xmlDoc;
        } catch (e) {
            var msg = ( e.name == undefined ? e : e.name + ': ' + e.message );
            $(document).trigger('xmlParseError', [msg]);
            return undefined;
        }
    }

    // Trigger a jQuery event
    function trigger(s, type, args) {
        (s.context ? $(s.context) : $.event).trigger(type, args);
    }

    // Check if the data field on the mock handler and the request match. This
    // can be used to restrict a mock handler to being used only when a certain
    // set of data is passed to it.
    function isMockDataEqual(mock, live) {
        var identical = true;
        // Test for situations where the data is a querystring (not an object)
        if (typeof live === 'string') {
            // Querystring may be a regex
            return $.isFunction(mock.test) ? mock.test(live) : mock == live;
        }
        $.each(mock, function (k) {
            if (live[k] === undefined) {
                identical = false;
                return identical;
            } else {
                if (typeof live[k] === 'object' && live[k] !== null) {
                    if (identical && $.isArray(live[k])) {
                        identical = $.isArray(mock[k]) && live[k].length === mock[k].length;
                    }
                    identical = identical && isMockDataEqual(mock[k], live[k]);
                } else {
                    if (mock[k] && $.isFunction(mock[k].test)) {
                        identical = identical && mock[k].test(live[k]);
                    } else {
                        identical = identical && ( mock[k] == live[k] );
                    }
                }
            }
        });

        return identical;
    }

    // See if a mock handler property matches the default settings
    function isDefaultSetting(handler, property) {
        return handler[property] === $.mockjaxSettings[property];
    }

    // Check the given handler should mock the given request
    function getMockForRequest(handler, requestSettings) {
        // If the mock was registered with a function, let the function decide if we
        // want to mock this request
        if ($.isFunction(handler)) {
            return handler(requestSettings);
        }

        // Inspect the URL of the request and check if the mock handler's url
        // matches the url for this ajax request
        if ($.isFunction(handler.url.test)) {
            // The user provided a regex for the url, test it
            if (!handler.url.test(requestSettings.url)) {
                return null;
            }
        } else {
            // Look for a simple wildcard '*' or a direct URL match
            var star = handler.url.indexOf('*');
            if (handler.url !== requestSettings.url && star === -1 || !new RegExp(handler.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace(/\*/g, '.+')).test(requestSettings.url)) {
                return null;
            }
        }

        // Inspect the data submitted in the request (either POST body or GET query string)
        if (handler.data) {
            if (!requestSettings.data || !isMockDataEqual(handler.data, requestSettings.data)) {
                // They're not identical, do not mock this request
                return null;
            }
        }
        // Inspect the request type
        if (handler && handler.type &&
            handler.type.toLowerCase() != requestSettings.type.toLowerCase()) {
            // The request type doesn't match (GET vs. POST)
            return null;
        }

        return handler;
    }

    // Process the xhr objects send operation
    function _xhrSend(mockHandler, requestSettings, origSettings) {

        // This is a substitute for < 1.4 which lacks $.proxy
        var process = (function (that) {
            return function () {
                return (function () {
                    var onReady;

                    // The request has returned
                    this.status = mockHandler.status;
                    this.statusText = mockHandler.statusText;
                    this.readyState = 4;

                    // We have an executable function, call it to give
                    // the mock handler a chance to update it's data
                    if ($.isFunction(mockHandler.response)) {
                        mockHandler.response(origSettings);
                    }
                    // Copy over our mock to our xhr object before passing control back to
                    // jQuery's onreadystatechange callback
                    if (requestSettings.dataType == 'json' && ( typeof mockHandler.responseText == 'object' )) {
                        this.responseText = JSON.stringify(mockHandler.responseText);
                    } else if (requestSettings.dataType == 'xml') {
                        if (typeof mockHandler.responseXML == 'string') {
                            this.responseXML = parseXML(mockHandler.responseXML);
                            //in jQuery 1.9.1+, responseXML is processed differently and relies on responseText
                            this.responseText = mockHandler.responseXML;
                        } else {
                            this.responseXML = mockHandler.responseXML;
                        }
                    } else {
                        this.responseText = mockHandler.responseText;
                    }
                    if (typeof mockHandler.status == 'number' || typeof mockHandler.status == 'string') {
                        this.status = mockHandler.status;
                    }
                    if (typeof mockHandler.statusText === "string") {
                        this.statusText = mockHandler.statusText;
                    }
                    // jQuery 2.0 renamed onreadystatechange to onload
                    onReady = this.onreadystatechange || this.onload;

                    // jQuery < 1.4 doesn't have onreadystate change for xhr
                    if ($.isFunction(onReady)) {
                        if (mockHandler.isTimeout) {
                            this.status = -1;
                        }
                        onReady.call(this, mockHandler.isTimeout ? 'timeout' : undefined);
                    } else if (mockHandler.isTimeout) {
                        // Fix for 1.3.2 timeout to keep success from firing.
                        this.status = -1;
                    }
                }).apply(that);
            };
        })(this);

        if (mockHandler.proxy) {
            // We're proxying this request and loading in an external file instead
            _ajax({
                global: false,
                url: mockHandler.proxy,
                type: mockHandler.proxyType,
                data: mockHandler.data,
                dataType: requestSettings.dataType === "script" ? "text/plain" : requestSettings.dataType,
                complete: function (xhr) {
                    mockHandler.responseXML = xhr.responseXML;
                    mockHandler.responseText = xhr.responseText;
                    // Don't override the handler status/statusText if it's specified by the config
                    if (isDefaultSetting(mockHandler, 'status')) {
                        mockHandler.status = xhr.status;
                    }
                    if (isDefaultSetting(mockHandler, 'statusText')) {
                        mockHandler.statusText = xhr.statusText;
                    }

                    this.responseTimer = setTimeout(process, mockHandler.responseTime || 0);
                }
            });
        } else {
            // type == 'POST' || 'GET' || 'DELETE'
            if (requestSettings.async === false) {
                // TODO: Blocking delay
                process();
            } else {
                this.responseTimer = setTimeout(process, mockHandler.responseTime || 50);
            }
        }
    }

    // Construct a mocked XHR Object
    function xhr(mockHandler, requestSettings, origSettings, origHandler) {
        // Extend with our default mockjax settings
        mockHandler = $.extend(true, {}, $.mockjaxSettings, mockHandler);

        if (typeof mockHandler.headers === 'undefined') {
            mockHandler.headers = {};
        }
        if (mockHandler.contentType) {
            mockHandler.headers['content-type'] = mockHandler.contentType;
        }

        return {
            status: mockHandler.status,
            statusText: mockHandler.statusText,
            readyState: 1,
            open: function () {
            },
            send: function () {
                origHandler.fired = true;
                _xhrSend.call(this, mockHandler, requestSettings, origSettings);
            },
            abort: function () {
                clearTimeout(this.responseTimer);
            },
            setRequestHeader: function (header, value) {
                mockHandler.headers[header] = value;
            },
            getResponseHeader: function (header) {
                // 'Last-modified', 'Etag', 'content-type' are all checked by jQuery
                if (mockHandler.headers && mockHandler.headers[header]) {
                    // Return arbitrary headers
                    return mockHandler.headers[header];
                } else if (header.toLowerCase() == 'last-modified') {
                    return mockHandler.lastModified || (new Date()).toString();
                } else if (header.toLowerCase() == 'etag') {
                    return mockHandler.etag || '';
                } else if (header.toLowerCase() == 'content-type') {
                    return mockHandler.contentType || 'text/plain';
                }
            },
            getAllResponseHeaders: function () {
                var headers = '';
                $.each(mockHandler.headers, function (k, v) {
                    headers += k + ': ' + v + "\n";
                });
                return headers;
            }
        };
    }

    // Process a JSONP mock request.
    function processJsonpMock(requestSettings, mockHandler, origSettings) {
        // Handle JSONP Parameter Callbacks, we need to replicate some of the jQuery core here
        // because there isn't an easy hook for the cross domain script tag of jsonp

        processJsonpUrl(requestSettings);

        requestSettings.dataType = "json";
        if (requestSettings.data && CALLBACK_REGEX.test(requestSettings.data) || CALLBACK_REGEX.test(requestSettings.url)) {
            createJsonpCallback(requestSettings, mockHandler, origSettings);

            // We need to make sure
            // that a JSONP style response is executed properly

            var rurl = /^(\w+:)?\/\/([^\/?#]+)/,
                parts = rurl.exec(requestSettings.url),
                remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);

            requestSettings.dataType = "script";
            if (requestSettings.type.toUpperCase() === "GET" && remote) {
                var newMockReturn = processJsonpRequest(requestSettings, mockHandler, origSettings);

                // Check if we are supposed to return a Deferred back to the mock call, or just
                // signal success
                if (newMockReturn) {
                    return newMockReturn;
                } else {
                    return true;
                }
            }
        }
        return null;
    }

    // Append the required callback parameter to the end of the request URL, for a JSONP request
    function processJsonpUrl(requestSettings) {
        if (requestSettings.type.toUpperCase() === "GET") {
            if (!CALLBACK_REGEX.test(requestSettings.url)) {
                requestSettings.url += (/\?/.test(requestSettings.url) ? "&" : "?") +
                (requestSettings.jsonp || "callback") + "=?";
            }
        } else if (!requestSettings.data || !CALLBACK_REGEX.test(requestSettings.data)) {
            requestSettings.data = (requestSettings.data ? requestSettings.data + "&" : "") + (requestSettings.jsonp || "callback") + "=?";
        }
    }

    // Process a JSONP request by evaluating the mocked response text
    function processJsonpRequest(requestSettings, mockHandler, origSettings) {
        // Synthesize the mock request for adding a script tag
        var callbackContext = origSettings && origSettings.context || requestSettings,
            newMock = null;


        // If the response handler on the moock is a function, call it
        if (mockHandler.response && $.isFunction(mockHandler.response)) {
            mockHandler.response(origSettings);
        } else {

            // Evaluate the responseText javascript in a global context
            if (typeof mockHandler.responseText === 'object') {
                $.globalEval('(' + JSON.stringify(mockHandler.responseText) + ')');
            } else {
                $.globalEval('(' + mockHandler.responseText + ')');
            }
        }

        // Successful response
        jsonpSuccess(requestSettings, callbackContext, mockHandler);
        jsonpComplete(requestSettings, callbackContext, mockHandler);

        // If we are running under jQuery 1.5+, return a deferred object
        if ($.Deferred) {
            newMock = new $.Deferred();
            if (typeof mockHandler.responseText == "object") {
                newMock.resolveWith(callbackContext, [mockHandler.responseText]);
            }
            else {
                newMock.resolveWith(callbackContext, [$.parseJSON(mockHandler.responseText)]);
            }
        }
        return newMock;
    }


    // Create the required JSONP callback function for the request
    function createJsonpCallback(requestSettings, mockHandler, origSettings) {
        var callbackContext = origSettings && origSettings.context || requestSettings;
        var jsonp = requestSettings.jsonpCallback || ("jsonp" + jsc++);

        // Replace the =? sequence both in the query string and the data
        if (requestSettings.data) {
            requestSettings.data = (requestSettings.data + "").replace(CALLBACK_REGEX, "=" + jsonp + "$1");
        }

        requestSettings.url = requestSettings.url.replace(CALLBACK_REGEX, "=" + jsonp + "$1");


        // Handle JSONP-style loading
        window[jsonp] = window[jsonp] || function (tmp) {
            data = tmp;
            jsonpSuccess(requestSettings, callbackContext, mockHandler);
            jsonpComplete(requestSettings, callbackContext, mockHandler);
            // Garbage collect
            window[jsonp] = undefined;

            try {
                delete window[jsonp];
            } catch (e) {
            }

            if (head) {
                head.removeChild(script);
            }
        };
    }

    // The JSONP request was successful
    function jsonpSuccess(requestSettings, callbackContext, mockHandler) {
        // If a local callback was specified, fire it and pass it the data
        if (requestSettings.success) {
            requestSettings.success.call(callbackContext, mockHandler.responseText || "", status, {});
        }

        // Fire the global callback
        if (requestSettings.global) {
            trigger(requestSettings, "ajaxSuccess", [{}, requestSettings]);
        }
    }

    // The JSONP request was completed
    function jsonpComplete(requestSettings, callbackContext) {
        // Process result
        if (requestSettings.complete) {
            requestSettings.complete.call(callbackContext, {}, status);
        }

        // The request was completed
        if (requestSettings.global) {
            trigger("ajaxComplete", [{}, requestSettings]);
        }

        // Handle the global AJAX counter
        if (requestSettings.global && !--$.active) {
            $.event.trigger("ajaxStop");
        }
    }


    // The core $.ajax replacement.
    function handleAjax(url, origSettings) {
        var mockRequest, requestSettings, mockHandler;

        // If url is an object, simulate pre-1.5 signature
        if (typeof url === "object") {
            origSettings = url;
            url = undefined;
        } else {
            // work around to support 1.5 signature
            origSettings = origSettings || {};
            origSettings.url = url;
        }

        // Extend the original settings for the request
        requestSettings = $.extend(true, {}, $.ajaxSettings, origSettings);

        // Iterate over our mock handlers (in registration order) until we find
        // one that is willing to intercept the request
        for (var k = 0; k < mockHandlers.length; k++) {
            if (!mockHandlers[k]) {
                continue;
            }

            mockHandler = getMockForRequest(mockHandlers[k], requestSettings);
            if (!mockHandler) {
                // No valid mock found for this request
                continue;
            }

            mockedAjaxCalls.push(requestSettings);

            // If logging is enabled, log the mock to the console
            $.mockjaxSettings.log(mockHandler, requestSettings);


            if (requestSettings.dataType && requestSettings.dataType.toUpperCase() === 'JSONP') {
                if ((mockRequest = processJsonpMock(requestSettings, mockHandler, origSettings))) {
                    // This mock will handle the JSONP request
                    return mockRequest;
                }
            }


            // Removed to fix #54 - keep the mocking data object intact
            //mockHandler.data = requestSettings.data;

            mockHandler.cache = requestSettings.cache;
            mockHandler.timeout = requestSettings.timeout;
            mockHandler.global = requestSettings.global;

            copyUrlParameters(mockHandler, origSettings);

            (function (mockHandler, requestSettings, origSettings, origHandler) {
                mockRequest = _ajax.call($, $.extend(true, {}, origSettings, {
                    // Mock the XHR object
                    xhr: function () {
                        return xhr(mockHandler, requestSettings, origSettings, origHandler);
                    }
                }));
            })(mockHandler, requestSettings, origSettings, mockHandlers[k]);

            return mockRequest;
        }

        // We don't have a mock request
        if ($.mockjaxSettings.throwUnmocked === true) {
            throw('AJAX not mocked: ' + origSettings.url);
        }
        else { // trigger a normal request
            return _ajax.apply($, [origSettings]);
        }
    }

    /**
     * Copies URL parameter values if they were captured by a regular expression
     * @param {Object} mockHandler
     * @param {Object} origSettings
     */
    function copyUrlParameters(mockHandler, origSettings) {
        //parameters aren't captured if the URL isn't a RegExp
        if (!(mockHandler.url instanceof RegExp)) {
            return;
        }
        //if no URL params were defined on the handler, don't attempt a capture
        if (!mockHandler.hasOwnProperty('urlParams')) {
            return;
        }
        var captures = mockHandler.url.exec(origSettings.url);
        //the whole RegExp match is always the first value in the capture results
        if (captures.length === 1) {
            return;
        }
        captures.shift();
        //use handler params as keys and capture resuts as values
        var i = 0,
            capturesLength = captures.length,
            paramsLength = mockHandler.urlParams.length,
        //in case the number of params specified is less than actual captures
            maxIterations = Math.min(capturesLength, paramsLength),
            paramValues = {};
        for (i; i < maxIterations; i++) {
            var key = mockHandler.urlParams[i];
            paramValues[key] = captures[i];
        }
        origSettings.urlParams = paramValues;
    }


    // Public

    $.extend({
        ajax: handleAjax
    });

    $.mockjaxSettings = {
        //url:        null,
        //type:       'GET',
        log: function (mockHandler, requestSettings) {
            if (mockHandler.logging === false ||
                ( typeof mockHandler.logging === 'undefined' && $.mockjaxSettings.logging === false )) {
                return;
            }
            if (window.console && console.log) {
                var message = 'MOCK ' + requestSettings.type.toUpperCase() + ': ' + requestSettings.url;
                var request = $.extend({}, requestSettings);

                if (typeof console.log === 'function') {
                    console.log(message, request);
                } else {
                    try {
                        console.log(message + ' ' + JSON.stringify(request));
                    } catch (e) {
                        console.log(message);
                    }
                }
            }
        },
        logging: true,
        status: 200,
        statusText: "OK",
        responseTime: 500,
        isTimeout: false,
        throwUnmocked: false,
        contentType: 'text/plain',
        response: '',
        responseText: '',
        responseXML: '',
        proxy: '',
        proxyType: 'GET',

        lastModified: null,
        etag: '',
        headers: {
            etag: 'IJF@H#@923uf8023hFO@I#H#',
            'content-type': 'text/plain'
        }
    };

    $.mockjax = function (settings) {
        var i = mockHandlers.length;
        mockHandlers[i] = settings;
        return i;
    };
    $.mockjaxClear = function (i) {
        if (arguments.length == 1) {
            mockHandlers[i] = null;
        } else {
            mockHandlers = [];
        }
        mockedAjaxCalls = [];
    };
    $.mockjax.handler = function (i) {
        if (arguments.length == 1) {
            return mockHandlers[i];
        }
    };
    $.mockjax.mockedAjaxCalls = function () {
        return mockedAjaxCalls;
    };
})(jQuery);
/**
 *  Ajax Autocomplete for jQuery, version 1.2.16
 *  (c) 2014 Tomas Kirda
 *
 *  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
 *  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
 */

/*jslint  browser: true, white: true, plusplus: true, vars: true */
/*global define, window, document, jQuery, exports, require */

// Expose plugin as an AMD module if AMD loader is present:
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var
        utils = (function () {
            return {
                escapeRegExChars: function (value) {
                    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                },
                createNode: function (containerClass) {
                    var div = document.createElement('div');
                    div.className = containerClass;
                    div.style.position = 'absolute';
                    div.style.display = 'none';
                    return div;
                }
            };
        }()),

        keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };

    function Autocomplete(el, options) {
        var noop = function () {
            },
            that = this,
            defaults = {
                ajaxSettings: {},
                autoSelectFirst: false,
                appendTo: document.body,
                serviceUrl: null,
                lookup: null,
                onSelect: null,
                width: 'auto',
                minChars: 1,
                maxHeight: 300,
                deferRequestBy: 0,
                params: {},
                formatResult: Autocomplete.formatResult,
                delimiter: null,
                zIndex: 9999,
                type: 'GET',
                noCache: false,
                onSearchStart: noop,
                onSearchComplete: noop,
                onSearchError: noop,
                preserveInput: false,
                containerClass: 'autocomplete-suggestions',
                tabDisabled: false,
                dataType: 'text',
                currentRequest: null,
                triggerSelectOnValidInput: true,
                preventBadQueries: true,
                lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                    return suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1;
                },
                paramName: 'query',
                transformResult: function (response) {
                    return typeof response === 'string' ? $.parseJSON(response) : response;
                },
                showNoSuggestionNotice: false,
                noSuggestionNotice: 'No results',
                orientation: 'bottom',
                forceFixPosition: false
            };

        // Shared variables:
        that.element = el;
        that.el = $(el);
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.intervalId = 0;
        that.cachedResponse = {};
        that.onChangeInterval = null;
        that.onChange = null;
        that.isLocal = false;
        that.suggestionsContainer = null;
        that.noSuggestionsContainer = null;
        that.options = $.extend({}, defaults, options);
        that.classes = {
            selected: 'autocomplete-selected',
            suggestion: 'autocomplete-suggestion'
        };
        that.hint = null;
        that.hintValue = '';
        that.selection = null;

        // Initialize and set options:
        that.initialize();
        that.setOptions(options);
    }

    Autocomplete.utils = utils;

    $.Autocomplete = Autocomplete;

    Autocomplete.formatResult = function (suggestion, currentValue) {
        var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

        return suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
    };

    Autocomplete.prototype = {

        killerFn: null,

        initialize: function () {
            var that = this,
                suggestionSelector = '.' + that.classes.suggestion,
                selected = that.classes.selected,
                options = that.options,
                container;

            // Remove autocomplete attribute to prevent native suggestions:
            that.element.setAttribute('autocomplete', 'off');

            that.killerFn = function (e) {
                if ($(e.target).closest('.' + that.options.containerClass).length === 0) {
                    that.killSuggestions();
                    that.disableKillerFn();
                }
            };

            // html() deals with many types: htmlString or Element or Array or jQuery
            that.noSuggestionsContainer = $('<div class="autocomplete-no-suggestion"></div>')
                .html(this.options.noSuggestionNotice).get(0);

            that.suggestionsContainer = Autocomplete.utils.createNode(options.containerClass);

            container = $(that.suggestionsContainer);

            container.appendTo(options.appendTo);

            // Only set width if it was provided:
            if (options.width !== 'auto') {
                container.width(options.width);
            }

            // Listen for mouse over event on suggestions list:
            container.on('mouseover.autocomplete', suggestionSelector, function () {
                that.activate($(this).data('index'));
            });

            // Deselect active element when mouse leaves suggestions container:
            container.on('mouseout.autocomplete', function () {
                that.selectedIndex = -1;
                container.children('.' + selected).removeClass(selected);
            });

            // Listen for click event on suggestions list:
            container.on('click.autocomplete', suggestionSelector, function () {
                that.select($(this).data('index'));
            });

            that.fixPositionCapture = function () {
                if (that.visible) {
                    that.fixPosition();
                }
            };

            $(window).on('resize.autocomplete', that.fixPositionCapture);

            that.el.on('keydown.autocomplete', function (e) {
                that.onKeyPress(e);
            });
            that.el.on('keyup.autocomplete', function (e) {
                that.onKeyUp(e);
            });
            that.el.on('blur.autocomplete', function () {
                that.onBlur();
            });
            that.el.on('focus.autocomplete', function () {
                that.onFocus();
            });
            that.el.on('change.autocomplete', function (e) {
                that.onKeyUp(e);
            });
            that.el.on('input.autocomplete', function (e) {
                that.onKeyUp(e);
            });
        },

        onFocus: function () {
            var that = this;
            that.fixPosition();
            if (that.options.minChars <= that.el.val().length) {
                that.onValueChange();
            }
        },

        onBlur: function () {
            this.enableKillerFn();
        },

        setOptions: function (suppliedOptions) {
            var that = this,
                options = that.options;

            $.extend(options, suppliedOptions);

            that.isLocal = $.isArray(options.lookup);

            if (that.isLocal) {
                options.lookup = that.verifySuggestionsFormat(options.lookup);
            }

            options.orientation = that.validateOrientation(options.orientation, 'bottom');

            // Adjust height, width and z-index:
            $(that.suggestionsContainer).css({
                'max-height': options.maxHeight + 'px',
                'width': options.width + 'px',
                'z-index': options.zIndex
            });
        },


        clearCache: function () {
            this.cachedResponse = {};
            this.badQueries = [];
        },

        clear: function () {
            this.clearCache();
            this.currentValue = '';
            this.suggestions = [];
        },

        disable: function () {
            var that = this;
            that.disabled = true;
            clearInterval(that.onChangeInterval);
            if (that.currentRequest) {
                that.currentRequest.abort();
            }
        },

        enable: function () {
            this.disabled = false;
        },

        fixPosition: function () {
            // Use only when container has already its content

            var that = this,
                $container = $(that.suggestionsContainer),
                containerParent = $container.parent().get(0);
            // Fix position automatically when appended to body.
            // In other cases force parameter must be given.
            if (containerParent !== document.body && !that.options.forceFixPosition) {
                return;
            }

            // Choose orientation
            var orientation = that.options.orientation,
                containerHeight = $container.outerHeight(),
                height = that.el.outerHeight(),
                offset = that.el.offset(),
                styles = {'top': offset.top, 'left': offset.left};

            if (orientation === 'auto') {
                var viewPortHeight = $(window).height(),
                    scrollTop = $(window).scrollTop(),
                    topOverflow = -scrollTop + offset.top - containerHeight,
                    bottomOverflow = scrollTop + viewPortHeight - (offset.top + height + containerHeight);

                orientation = (Math.max(topOverflow, bottomOverflow) === topOverflow) ? 'top' : 'bottom';
            }

            if (orientation === 'top') {
                styles.top += -containerHeight;
            } else {
                styles.top += height;
            }

            // If container is not positioned to body,
            // correct its position using offset parent offset
            if (containerParent !== document.body) {
                var opacity = $container.css('opacity'),
                    parentOffsetDiff;

                if (!that.visible) {
                    $container.css('opacity', 0).show();
                }

                parentOffsetDiff = $container.offsetParent().offset();
                styles.top -= parentOffsetDiff.top;
                styles.left -= parentOffsetDiff.left;

                if (!that.visible) {
                    $container.css('opacity', opacity).hide();
                }
            }

            // -2px to account for suggestions border.
            if (that.options.width === 'auto') {
                styles.width = (that.el.outerWidth() - 2) + 'px';
            }

            $container.css(styles);
        },

        enableKillerFn: function () {
            var that = this;
            $(document).on('click.autocomplete', that.killerFn);
        },

        disableKillerFn: function () {
            var that = this;
            $(document).off('click.autocomplete', that.killerFn);
        },

        killSuggestions: function () {
            var that = this;
            that.stopKillSuggestions();
            that.intervalId = window.setInterval(function () {
                that.hide();
                that.stopKillSuggestions();
            }, 50);
        },

        stopKillSuggestions: function () {
            window.clearInterval(this.intervalId);
        },

        isCursorAtEnd: function () {
            var that = this,
                valLength = that.el.val().length,
                selectionStart = that.element.selectionStart,
                range;

            if (typeof selectionStart === 'number') {
                return selectionStart === valLength;
            }
            if (document.selection) {
                range = document.selection.createRange();
                range.moveStart('character', -valLength);
                return valLength === range.text.length;
            }
            return true;
        },

        onKeyPress: function (e) {
            var that = this;

            // If suggestions are hidden and user presses arrow down, display suggestions:
            if (!that.disabled && !that.visible && e.which === keys.DOWN && that.currentValue) {
                that.suggest();
                return;
            }

            if (that.disabled || !that.visible) {
                return;
            }

            switch (e.which) {
                case keys.ESC:
                    that.el.val(that.currentValue);
                    that.hide();
                    break;
                case keys.RIGHT:
                    if (that.hint && that.options.onHint && that.isCursorAtEnd()) {
                        that.selectHint();
                        break;
                    }
                    return;
                case keys.TAB:
                    if (that.hint && that.options.onHint) {
                        that.selectHint();
                        return;
                    }
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    if (that.options.tabDisabled === false) {
                        return;
                    }
                    break;
                case keys.RETURN:
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    break;
                case keys.UP:
                    that.moveUp();
                    break;
                case keys.DOWN:
                    that.moveDown();
                    break;
                default:
                    return;
            }

            // Cancel event if function did not return:
            e.stopImmediatePropagation();
            e.preventDefault();
        },

        onKeyUp: function (e) {
            var that = this;

            if (that.disabled) {
                return;
            }

            switch (e.which) {
                case keys.UP:
                case keys.DOWN:
                    return;
            }

            clearInterval(that.onChangeInterval);

            if (that.currentValue !== that.el.val()) {
                that.findBestHint();
                if (that.options.deferRequestBy > 0) {
                    // Defer lookup in case when value changes very quickly:
                    that.onChangeInterval = setInterval(function () {
                        that.onValueChange();
                    }, that.options.deferRequestBy);
                } else {
                    that.onValueChange();
                }
            }
        },

        onValueChange: function () {
            var that = this,
                options = that.options,
                value = that.el.val(),
                query = that.getQuery(value),
                index;

            if (that.selection && that.currentValue !== query) {
                that.selection = null;
                (options.onInvalidateSelection || $.noop).call(that.element);
            }

            clearInterval(that.onChangeInterval);
            that.currentValue = value;
            that.selectedIndex = -1;

            // Check existing suggestion for the match before proceeding:
            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(query);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }

            if (query.length < options.minChars) {
                that.hide();
            } else {
                that.getSuggestions(query);
            }
        },

        findSuggestionIndex: function (query) {
            var that = this,
                index = -1,
                queryLowerCase = query.toLowerCase();

            $.each(that.suggestions, function (i, suggestion) {
                if (suggestion.value.toLowerCase() === queryLowerCase) {
                    index = i;
                    return false;
                }
            });

            return index;
        },

        getQuery: function (value) {
            var delimiter = this.options.delimiter,
                parts;

            if (!delimiter) {
                return value;
            }
            parts = value.split(delimiter);
            return $.trim(parts[parts.length - 1]);
        },

        getSuggestionsLocal: function (query) {
            var that = this,
                options = that.options,
                queryLowerCase = query.toLowerCase(),
                filter = options.lookupFilter,
                limit = parseInt(options.lookupLimit, 10),
                data;

            data = {
                suggestions: $.grep(options.lookup, function (suggestion) {
                    return filter(suggestion, query, queryLowerCase);
                })
            };

            if (limit && data.suggestions.length > limit) {
                data.suggestions = data.suggestions.slice(0, limit);
            }

            return data;
        },

        getSuggestions: function (q) {
            var response,
                that = this,
                options = that.options,
                serviceUrl = options.serviceUrl,
                params,
                cacheKey,
                ajaxSettings;

            options.params[options.paramName] = q;
            params = options.ignoreParams ? null : options.params;

            if (options.onSearchStart.call(that.element, options.params) === false) {
                return;
            }

            if ($.isFunction(options.lookup)) {
                options.lookup(q, function (data) {
                    that.suggestions = data.suggestions;
                    that.suggest();
                    options.onSearchComplete.call(that.element, q, data.suggestions);
                });
                return;
            }

            if (that.isLocal) {
                response = that.getSuggestionsLocal(q);
            } else {
                if ($.isFunction(serviceUrl)) {
                    serviceUrl = serviceUrl.call(that.element, q);
                }
                cacheKey = serviceUrl + '?' + $.param(params || {});
                response = that.cachedResponse[cacheKey];
            }

            if (response && $.isArray(response.suggestions)) {
                that.suggestions = response.suggestions;
                that.suggest();
                options.onSearchComplete.call(that.element, q, response.suggestions);
            } else if (!that.isBadQuery(q)) {
                if (that.currentRequest) {
                    that.currentRequest.abort();
                }

                ajaxSettings = {
                    url: serviceUrl,
                    data: params,
                    type: options.type,
                    dataType: options.dataType
                };

                $.extend(ajaxSettings, options.ajaxSettings);

                that.currentRequest = $.ajax(ajaxSettings).done(function (data) {
                    var result;
                    that.currentRequest = null;
                    result = options.transformResult(data);
                    that.processResponse(result, q, cacheKey);
                    options.onSearchComplete.call(that.element, q, result.suggestions);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    options.onSearchError.call(that.element, q, jqXHR, textStatus, errorThrown);
                });
            } else {
                options.onSearchComplete.call(that.element, q, []);
            }
        },

        isBadQuery: function (q) {
            if (!this.options.preventBadQueries) {
                return false;
            }

            var badQueries = this.badQueries,
                i = badQueries.length;

            while (i--) {
                if (q.indexOf(badQueries[i]) === 0) {
                    return true;
                }
            }

            return false;
        },

        hide: function () {
            var that = this;
            that.visible = false;
            that.selectedIndex = -1;
            clearInterval(that.onChangeInterval);
            $(that.suggestionsContainer).hide();
            that.signalHint(null);
        },

        suggest: function () {
            if (this.suggestions.length === 0) {
                if (this.options.showNoSuggestionNotice) {
                    this.noSuggestions();
                } else {
                    this.hide();
                }
                return;
            }

            var that = this,
                options = that.options,
                groupBy = options.groupBy,
                formatResult = options.formatResult,
                value = that.getQuery(that.currentValue),
                className = that.classes.suggestion,
                classSelected = that.classes.selected,
                container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer),
                beforeRender = options.beforeRender,
                html = '',
                category,
                formatGroup = function (suggestion, index) {
                    var currentCategory = suggestion.data[groupBy];

                    if (category === currentCategory) {
                        return '';
                    }

                    category = currentCategory;

                    return '<div class="autocomplete-group"><strong>' + category + '</strong></div>';
                },
                index;

            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(value);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }

            // Build suggestions inner HTML:
            $.each(that.suggestions, function (i, suggestion) {
                if (groupBy) {
                    html += formatGroup(suggestion, value, i);
                }

                html += '<div class="' + className + '" data-index="' + i + '">' + formatResult(suggestion, value) + '</div>';
            });

            this.adjustContainerWidth();

            noSuggestionsContainer.detach();
            container.html(html);

            if ($.isFunction(beforeRender)) {
                beforeRender.call(that.element, container);
            }

            that.fixPosition();
            container.show();

            // Select first value by default:
            if (options.autoSelectFirst) {
                that.selectedIndex = 0;
                container.scrollTop(0);
                container.children().first().addClass(classSelected);
            }

            that.visible = true;
            that.findBestHint();
        },

        noSuggestions: function () {
            var that = this,
                container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer);

            this.adjustContainerWidth();

            // Some explicit steps. Be careful here as it easy to get
            // noSuggestionsContainer removed from DOM if not detached properly.
            noSuggestionsContainer.detach();
            container.empty(); // clean suggestions if any
            container.append(noSuggestionsContainer);

            that.fixPosition();

            container.show();
            that.visible = true;
        },

        adjustContainerWidth: function () {
            var that = this,
                options = that.options,
                width,
                container = $(that.suggestionsContainer);

            // If width is auto, adjust width before displaying suggestions,
            // because if instance was created before input had width, it will be zero.
            // Also it adjusts if input width has changed.
            // -2px to account for suggestions border.
            if (options.width === 'auto') {
                width = that.el.outerWidth() - 2;
                container.width(width > 0 ? width : 300);
            }
        },

        findBestHint: function () {
            var that = this,
                value = that.el.val().toLowerCase(),
                bestMatch = null;

            if (!value) {
                return;
            }

            $.each(that.suggestions, function (i, suggestion) {
                var foundMatch = suggestion.value.toLowerCase().indexOf(value) === 0;
                if (foundMatch) {
                    bestMatch = suggestion;
                }
                return !foundMatch;
            });

            that.signalHint(bestMatch);
        },

        signalHint: function (suggestion) {
            var hintValue = '',
                that = this;
            if (suggestion) {
                hintValue = that.currentValue + suggestion.value.substr(that.currentValue.length);
            }
            if (that.hintValue !== hintValue) {
                that.hintValue = hintValue;
                that.hint = suggestion;
                (this.options.onHint || $.noop)(hintValue);
            }
        },

        verifySuggestionsFormat: function (suggestions) {
            // If suggestions is string array, convert them to supported format:
            if (suggestions.length && typeof suggestions[0] === 'string') {
                return $.map(suggestions, function (value) {
                    return {value: value, data: null};
                });
            }

            return suggestions;
        },

        validateOrientation: function (orientation, fallback) {
            orientation = $.trim(orientation || '').toLowerCase();

            if ($.inArray(orientation, ['auto', 'bottom', 'top']) === -1) {
                orientation = fallback;
            }

            return orientation;
        },

        processResponse: function (result, originalQuery, cacheKey) {
            var that = this,
                options = that.options;

            result.suggestions = that.verifySuggestionsFormat(result.suggestions);

            // Cache results if cache is not disabled:
            if (!options.noCache) {
                that.cachedResponse[cacheKey] = result;
                if (options.preventBadQueries && result.suggestions.length === 0) {
                    that.badQueries.push(originalQuery);
                }
            }

            // Return if originalQuery is not matching current query:
            if (originalQuery !== that.getQuery(that.currentValue)) {
                return;
            }

            that.suggestions = result.suggestions;
            that.suggest();
        },

        activate: function (index) {
            var that = this,
                activeItem,
                selected = that.classes.selected,
                container = $(that.suggestionsContainer),
                children = container.find('.' + that.classes.suggestion);

            container.find('.' + selected).removeClass(selected);

            that.selectedIndex = index;

            if (that.selectedIndex !== -1 && children.length > that.selectedIndex) {
                activeItem = children.get(that.selectedIndex);
                $(activeItem).addClass(selected);
                return activeItem;
            }

            return null;
        },

        selectHint: function () {
            var that = this,
                i = $.inArray(that.hint, that.suggestions);

            that.select(i);
        },

        select: function (i) {
            var that = this;
            that.hide();
            that.onSelect(i);
        },

        moveUp: function () {
            var that = this;

            if (that.selectedIndex === -1) {
                return;
            }

            if (that.selectedIndex === 0) {
                $(that.suggestionsContainer).children().first().removeClass(that.classes.selected);
                that.selectedIndex = -1;
                that.el.val(that.currentValue);
                that.findBestHint();
                return;
            }

            that.adjustScroll(that.selectedIndex - 1);
        },

        moveDown: function () {
            var that = this;

            if (that.selectedIndex === (that.suggestions.length - 1)) {
                return;
            }

            that.adjustScroll(that.selectedIndex + 1);
        },

        adjustScroll: function (index) {
            var that = this,
                activeItem = that.activate(index);

            if (!activeItem) {
                return;
            }

            var offsetTop,
                upperBound,
                lowerBound,
                heightDelta = $(activeItem).outerHeight();

            offsetTop = activeItem.offsetTop;
            upperBound = $(that.suggestionsContainer).scrollTop();
            lowerBound = upperBound + that.options.maxHeight - heightDelta;

            if (offsetTop < upperBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop);
            } else if (offsetTop > lowerBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop - that.options.maxHeight + heightDelta);
            }

            if (!that.options.preserveInput) {
                that.el.val(that.getValue(that.suggestions[index].value));
            }
            that.signalHint(null);
        },

        onSelect: function (index) {
            var that = this,
                onSelectCallback = that.options.onSelect,
                suggestion = that.suggestions[index];

            that.currentValue = that.getValue(suggestion.value);

            if (that.currentValue !== that.el.val() && !that.options.preserveInput) {
                that.el.val(that.currentValue);
            }

            that.signalHint(null);
            that.suggestions = [];
            that.selection = suggestion;

            if ($.isFunction(onSelectCallback)) {
                onSelectCallback.call(that.element, suggestion);
            }
        },

        getValue: function (value) {
            var that = this,
                delimiter = that.options.delimiter,
                currentValue,
                parts;

            if (!delimiter) {
                return value;
            }

            currentValue = that.currentValue;
            parts = currentValue.split(delimiter);

            if (parts.length === 1) {
                return value;
            }

            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length) + value;
        },

        dispose: function () {
            var that = this;
            that.el.off('.autocomplete').removeData('autocomplete');
            that.disableKillerFn();
            $(window).off('resize.autocomplete', that.fixPositionCapture);
            $(that.suggestionsContainer).remove();
        }
    };

    // Create chainable jQuery plugin:
    $.fn.autocomplete = $.fn.devbridgeAutocomplete = function (options, args) {
        var dataKey = 'autocomplete';
        // If function invoked without argument return
        // instance of the first matched element:
        if (arguments.length === 0) {
            return this.first().data(dataKey);
        }

        return this.each(function () {
            var inputElement = $(this),
                instance = inputElement.data(dataKey);

            if (typeof options === 'string') {
                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }
            } else {
                // If instance already exists, destroy it:
                if (instance && instance.dispose) {
                    instance.dispose();
                }
                instance = new Autocomplete(this, options);
                inputElement.data(dataKey, instance);
            }
        });
    };
}));

﻿var usastates = {

    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"

}
﻿/*jslint  browser: true, white: true, plusplus: true */
/*global $, usastates */

$(function () {
    'use strict';

    var usastatesArray = $.map(usastates, function (value, key) {
        return {value: value, data: key};
    });

    // Setup jQuery ajax mock:
    $.mockjax({
        url: '*',
        responseTime: 2000,
        response: function (settings) {
            var query = settings.data.query,
                queryLowerCase = query.toLowerCase(),
                re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                suggestions = $.grep(usastatesArray, function (country) {
                    // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
                    return re.test(country.value);
                }),
                response = {
                    query: query,
                    suggestions: suggestions
                };

            this.responseText = JSON.stringify(response);
        }
    });


    // Initialize ajax autocomplete:
    $('#autocomplete-ajax').autocomplete({
        // serviceUrl: '/autosuggest/service/url',
        lookup: usastatesArray,
        lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function (suggestion) {
            $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
        },
        onHint: function (hint) {
            $('#autocomplete-ajax-x').val(hint);

        },
        onInvalidateSelection: function () {
            $('#selction-ajax').html('You selected: none');
        }
    });


});
/*!
 * sweetalert2 v7.11.0
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Sweetalert2 = factory());
}(this, (function () { 'use strict';

var styles = "body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-actions {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    height: 2.2em; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-loading {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-input {\n    height: 2em;\n    margin: .3125em auto;\n    font-size: 1em; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-validationerror {\n    font-size: 1em; }\n\nbody.swal2-toast-shown > .swal2-container {\n  position: fixed;\n  background-color: transparent; }\n  body.swal2-toast-shown > .swal2-container.swal2-shown {\n    background-color: transparent; }\n  body.swal2-toast-shown > .swal2-container.swal2-top {\n    top: 0;\n    right: auto;\n    bottom: auto;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-top-end, body.swal2-toast-shown > .swal2-container.swal2-top-right {\n    top: 0;\n    right: 0;\n    bottom: auto;\n    left: auto; }\n  body.swal2-toast-shown > .swal2-container.swal2-top-start, body.swal2-toast-shown > .swal2-container.swal2-top-left {\n    top: 0;\n    right: auto;\n    bottom: auto;\n    left: 0; }\n  body.swal2-toast-shown > .swal2-container.swal2-center-start, body.swal2-toast-shown > .swal2-container.swal2-center-left {\n    top: 50%;\n    right: auto;\n    bottom: auto;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-center {\n    top: 50%;\n    right: auto;\n    bottom: auto;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-center-end, body.swal2-toast-shown > .swal2-container.swal2-center-right {\n    top: 50%;\n    right: 0;\n    bottom: auto;\n    left: auto;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom-start, body.swal2-toast-shown > .swal2-container.swal2-bottom-left {\n    top: auto;\n    right: auto;\n    bottom: 0;\n    left: 0; }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom {\n    top: auto;\n    right: auto;\n    bottom: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom-end, body.swal2-toast-shown > .swal2-container.swal2-bottom-right {\n    top: auto;\n    right: 0;\n    bottom: 0;\n    left: auto; }\n\n.swal2-popup.swal2-toast {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: auto;\n  padding: 0.625em;\n  -webkit-box-shadow: 0 0 10px #d9d9d9;\n          box-shadow: 0 0 10px #d9d9d9;\n  overflow-y: hidden; }\n  .swal2-popup.swal2-toast .swal2-header {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  .swal2-popup.swal2-toast .swal2-title {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    margin: 0 .6em;\n    font-size: 1em; }\n  .swal2-popup.swal2-toast .swal2-close {\n    position: initial; }\n  .swal2-popup.swal2-toast .swal2-content {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    font-size: 1em; }\n  .swal2-popup.swal2-toast .swal2-icon {\n    width: 32px;\n    min-width: 32px;\n    height: 32px;\n    margin: 0; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring {\n      width: 32px;\n      height: 32px; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-info, .swal2-popup.swal2-toast .swal2-icon.swal2-warning, .swal2-popup.swal2-toast .swal2-icon.swal2-question {\n      font-size: 26px;\n      line-height: 32px; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      top: 14px;\n      width: 22px; }\n      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        left: 5px; }\n      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        right: 5px; }\n  .swal2-popup.swal2-toast .swal2-actions {\n    height: auto;\n    margin: 0 .3125em; }\n  .swal2-popup.swal2-toast .swal2-styled {\n    margin: 0 .3125em;\n    padding: .3125em .625em;\n    font-size: 1em; }\n    .swal2-popup.swal2-toast .swal2-styled:focus {\n      -webkit-box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(50, 100, 150, 0.4);\n              box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(50, 100, 150, 0.4); }\n  .swal2-popup.swal2-toast .swal2-success {\n    border-color: #a5dc86; }\n    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'] {\n      position: absolute;\n      width: 32px;\n      height: 45px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n      border-radius: 50%; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        top: -4px;\n        left: -15px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 32px 32px;\n                transform-origin: 32px 32px;\n        border-radius: 64px 0 0 64px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        top: -4px;\n        left: 15px;\n        -webkit-transform-origin: 0 32px;\n                transform-origin: 0 32px;\n        border-radius: 0 64px 64px 0; }\n    .swal2-popup.swal2-toast .swal2-success .swal2-success-ring {\n      width: 32px;\n      height: 32px; }\n    .swal2-popup.swal2-toast .swal2-success .swal2-success-fix {\n      top: 0;\n      left: 7px;\n      width: 7px;\n      height: 43px; }\n    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'] {\n      height: 5px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='tip'] {\n        top: 18px;\n        left: 3px;\n        width: 12px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='long'] {\n        top: 15px;\n        right: 3px;\n        width: 22px; }\n  .swal2-popup.swal2-toast.swal2-show {\n    -webkit-animation: showSweetToast .5s;\n            animation: showSweetToast .5s; }\n  .swal2-popup.swal2-toast.swal2-hide {\n    -webkit-animation: hideSweetToast .2s forwards;\n            animation: hideSweetToast .2s forwards; }\n  .swal2-popup.swal2-toast .swal2-animate-success-line-tip {\n    -webkit-animation: animate-toast-success-tip .75s;\n            animation: animate-toast-success-tip .75s; }\n  .swal2-popup.swal2-toast .swal2-animate-success-line-long {\n    -webkit-animation: animate-toast-success-long .75s;\n            animation: animate-toast-success-long .75s; }\n\n@-webkit-keyframes showSweetToast {\n  0% {\n    -webkit-transform: translateY(-10px) rotateZ(2deg);\n            transform: translateY(-10px) rotateZ(2deg);\n    opacity: 0; }\n  33% {\n    -webkit-transform: translateY(0) rotateZ(-2deg);\n            transform: translateY(0) rotateZ(-2deg);\n    opacity: .5; }\n  66% {\n    -webkit-transform: translateY(5px) rotateZ(2deg);\n            transform: translateY(5px) rotateZ(2deg);\n    opacity: .7; }\n  100% {\n    -webkit-transform: translateY(0) rotateZ(0);\n            transform: translateY(0) rotateZ(0);\n    opacity: 1; } }\n\n@keyframes showSweetToast {\n  0% {\n    -webkit-transform: translateY(-10px) rotateZ(2deg);\n            transform: translateY(-10px) rotateZ(2deg);\n    opacity: 0; }\n  33% {\n    -webkit-transform: translateY(0) rotateZ(-2deg);\n            transform: translateY(0) rotateZ(-2deg);\n    opacity: .5; }\n  66% {\n    -webkit-transform: translateY(5px) rotateZ(2deg);\n            transform: translateY(5px) rotateZ(2deg);\n    opacity: .7; }\n  100% {\n    -webkit-transform: translateY(0) rotateZ(0);\n            transform: translateY(0) rotateZ(0);\n    opacity: 1; } }\n\n@-webkit-keyframes hideSweetToast {\n  0% {\n    opacity: 1; }\n  33% {\n    opacity: .5; }\n  100% {\n    -webkit-transform: rotateZ(1deg);\n            transform: rotateZ(1deg);\n    opacity: 0; } }\n\n@keyframes hideSweetToast {\n  0% {\n    opacity: 1; }\n  33% {\n    opacity: .5; }\n  100% {\n    -webkit-transform: rotateZ(1deg);\n            transform: rotateZ(1deg);\n    opacity: 0; } }\n\n@-webkit-keyframes animate-toast-success-tip {\n  0% {\n    top: 9px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 2px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 10px;\n    left: -4px;\n    width: 26px; }\n  84% {\n    top: 17px;\n    left: 12px;\n    width: 8px; }\n  100% {\n    top: 18px;\n    left: 3px;\n    width: 12px; } }\n\n@keyframes animate-toast-success-tip {\n  0% {\n    top: 9px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 2px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 10px;\n    left: -4px;\n    width: 26px; }\n  84% {\n    top: 17px;\n    left: 12px;\n    width: 8px; }\n  100% {\n    top: 18px;\n    left: 3px;\n    width: 12px; } }\n\n@-webkit-keyframes animate-toast-success-long {\n  0% {\n    top: 26px;\n    right: 22px;\n    width: 0; }\n  65% {\n    top: 20px;\n    right: 15px;\n    width: 0; }\n  84% {\n    top: 15px;\n    right: 0;\n    width: 18px; }\n  100% {\n    top: 15px;\n    right: 3px;\n    width: 22px; } }\n\n@keyframes animate-toast-success-long {\n  0% {\n    top: 26px;\n    right: 22px;\n    width: 0; }\n  65% {\n    top: 20px;\n    right: 15px;\n    width: 0; }\n  84% {\n    top: 15px;\n    right: 0;\n    width: 18px; }\n  100% {\n    top: 15px;\n    right: 3px;\n    width: 22px; } }\n\nhtml.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown),\nbody.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {\n  height: auto;\n  overflow-y: hidden; }\n\nbody.swal2-iosfix {\n  position: fixed;\n  right: 0;\n  left: 0; }\n\nbody.swal2-no-backdrop .swal2-shown {\n  top: auto;\n  right: auto;\n  bottom: auto;\n  left: auto;\n  background-color: transparent; }\n  body.swal2-no-backdrop .swal2-shown > .swal2-modal {\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }\n  body.swal2-no-backdrop .swal2-shown.swal2-top {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-top-start, body.swal2-no-backdrop .swal2-shown.swal2-top-left {\n    top: 0;\n    left: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-top-end, body.swal2-no-backdrop .swal2-shown.swal2-top-right {\n    top: 0;\n    right: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-center {\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-center-start, body.swal2-no-backdrop .swal2-shown.swal2-center-left {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-center-end, body.swal2-no-backdrop .swal2-shown.swal2-center-right {\n    top: 50%;\n    right: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom {\n    bottom: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom-start, body.swal2-no-backdrop .swal2-shown.swal2-bottom-left {\n    bottom: 0;\n    left: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom-end, body.swal2-no-backdrop .swal2-shown.swal2-bottom-right {\n    right: 0;\n    bottom: 0; }\n\n.swal2-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 10px;\n  background-color: transparent;\n  z-index: 1060;\n  overflow-x: hidden; }\n  .swal2-container.swal2-top {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  .swal2-container.swal2-top-start, .swal2-container.swal2-top-left {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-top-end, .swal2-container.swal2-top-right {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-center {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .swal2-container.swal2-center-start, .swal2-container.swal2-center-left {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-center-end, .swal2-container.swal2-center-right {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-bottom {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  .swal2-container.swal2-bottom-start, .swal2-container.swal2-bottom-left {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-bottom-end, .swal2-container.swal2-bottom-right {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-grow-fullscreen > .swal2-modal {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .swal2-container.swal2-grow-row > .swal2-modal {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .swal2-container.swal2-grow-column {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    .swal2-container.swal2-grow-column.swal2-top, .swal2-container.swal2-grow-column.swal2-center, .swal2-container.swal2-grow-column.swal2-bottom {\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .swal2-container.swal2-grow-column.swal2-top-start, .swal2-container.swal2-grow-column.swal2-center-start, .swal2-container.swal2-grow-column.swal2-bottom-start, .swal2-container.swal2-grow-column.swal2-top-left, .swal2-container.swal2-grow-column.swal2-center-left, .swal2-container.swal2-grow-column.swal2-bottom-left {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start; }\n    .swal2-container.swal2-grow-column.swal2-top-end, .swal2-container.swal2-grow-column.swal2-center-end, .swal2-container.swal2-grow-column.swal2-bottom-end, .swal2-container.swal2-grow-column.swal2-top-right, .swal2-container.swal2-grow-column.swal2-center-right, .swal2-container.swal2-grow-column.swal2-bottom-right {\n      -webkit-box-align: end;\n          -ms-flex-align: end;\n              align-items: flex-end; }\n    .swal2-container.swal2-grow-column > .swal2-modal {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      -ms-flex-line-pack: center;\n          align-content: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  .swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right) > .swal2-modal {\n    margin: auto; }\n  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n    .swal2-container .swal2-modal {\n      margin: 0 !important; } }\n  .swal2-container.swal2-fade {\n    -webkit-transition: background-color .1s;\n    transition: background-color .1s; }\n  .swal2-container.swal2-shown {\n    background-color: rgba(0, 0, 0, 0.4); }\n\n.swal2-popup {\n  display: none;\n  position: relative;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 32em;\n  max-width: 100%;\n  padding: 1.25em;\n  border-radius: .3125em;\n  background-color: #fff;\n  font-family: inherit;\n  font-size: 1rem;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow-x: hidden;\n  overflow-y: auto; }\n  .swal2-popup:focus {\n    outline: none; }\n  .swal2-popup.swal2-loading {\n    overflow-y: hidden; }\n  .swal2-popup .swal2-header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .swal2-popup .swal2-title {\n    display: block;\n    position: relative;\n    margin: 0 0 .4em;\n    padding: 0;\n    color: #595959;\n    font-size: 1.875em;\n    font-weight: 600;\n    text-align: center;\n    text-transform: none;\n    word-wrap: break-word; }\n  .swal2-popup .swal2-actions {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-top: 1.25em; }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled] {\n      opacity: .4; }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover {\n      background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.1)), to(rgba(0, 0, 0, 0.1)));\n      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)); }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active {\n      background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.2)), to(rgba(0, 0, 0, 0.2)));\n      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); }\n    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm {\n      width: 2.5em;\n      height: 2.5em;\n      margin: .46875em;\n      padding: 0;\n      border: .25em solid transparent;\n      border-radius: 100%;\n      border-color: transparent;\n      background-color: transparent !important;\n      color: transparent;\n      cursor: default;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;\n              animation: rotate-loading 1.5s linear 0s infinite normal;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none; }\n    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel {\n      margin-right: 30px;\n      margin-left: 30px; }\n    .swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after {\n      display: inline-block;\n      width: 15px;\n      height: 15px;\n      margin-left: 5px;\n      border: 3px solid #999999;\n      border-radius: 50%;\n      border-right-color: transparent;\n      -webkit-box-shadow: 1px 1px 1px #fff;\n              box-shadow: 1px 1px 1px #fff;\n      content: '';\n      -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;\n              animation: rotate-loading 1.5s linear 0s infinite normal; }\n  .swal2-popup .swal2-styled {\n    margin: 0 .3125em;\n    padding: .625em 2em;\n    border: 0;\n    border-radius: .25em;\n    color: #fff;\n    font-size: 1.0625em;\n    font-weight: 500;\n    -webkit-box-shadow: none;\n            box-shadow: none; }\n    .swal2-popup .swal2-styled:not([disabled]) {\n      cursor: pointer; }\n    .swal2-popup .swal2-styled.swal2-confirm {\n      background-color: #3085d6; }\n    .swal2-popup .swal2-styled.swal2-cancel {\n      background-color: #aaa; }\n    .swal2-popup .swal2-styled:focus {\n      outline: none;\n      -webkit-box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4);\n              box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4); }\n    .swal2-popup .swal2-styled::-moz-focus-inner {\n      border: 0; }\n  .swal2-popup .swal2-footer {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-top: 1.25em;\n    padding-top: 1em;\n    border-top: 1px solid #eee;\n    font-size: 1em; }\n  .swal2-popup .swal2-image {\n    max-width: 100%;\n    margin: 1.25em auto; }\n  .swal2-popup .swal2-close {\n    position: absolute;\n    top: 5px;\n    right: 8px;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: 1.2em;\n    min-width: 1.2em;\n    height: 1.2em;\n    margin: 0;\n    padding: 0;\n    -webkit-transition: color .1s ease;\n    transition: color .1s ease;\n    border: 0;\n    background: transparent;\n    color: #cccccc;\n    font-family: serif;\n    font-size: calc(2.5em - 0.25em);\n    line-height: 1.2em;\n    cursor: pointer; }\n    .swal2-popup .swal2-close:hover {\n      color: #d55; }\n  .swal2-popup > .swal2-input,\n  .swal2-popup > .swal2-file,\n  .swal2-popup > .swal2-textarea,\n  .swal2-popup > .swal2-select,\n  .swal2-popup > .swal2-radio,\n  .swal2-popup > .swal2-checkbox {\n    display: none; }\n  .swal2-popup .swal2-content {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin: 0;\n    padding: 0;\n    color: #545454;\n    font-size: 1.125em;\n    font-weight: 300;\n    line-height: normal;\n    word-wrap: break-word; }\n  .swal2-popup #swal2-content {\n    text-align: center; }\n  .swal2-popup .swal2-input,\n  .swal2-popup .swal2-file,\n  .swal2-popup .swal2-textarea,\n  .swal2-popup .swal2-select,\n  .swal2-popup .swal2-radio,\n  .swal2-popup .swal2-checkbox {\n    margin: 1em auto; }\n  .swal2-popup .swal2-input,\n  .swal2-popup .swal2-file,\n  .swal2-popup .swal2-textarea {\n    width: 100%;\n    -webkit-transition: border-color .3s, -webkit-box-shadow .3s;\n    transition: border-color .3s, -webkit-box-shadow .3s;\n    transition: border-color .3s, box-shadow .3s;\n    transition: border-color .3s, box-shadow .3s, -webkit-box-shadow .3s;\n    border: 1px solid #d9d9d9;\n    border-radius: 3px;\n    font-size: 1.125em;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n    .swal2-popup .swal2-input.swal2-inputerror,\n    .swal2-popup .swal2-file.swal2-inputerror,\n    .swal2-popup .swal2-textarea.swal2-inputerror {\n      border-color: #f27474 !important;\n      -webkit-box-shadow: 0 0 2px #f27474 !important;\n              box-shadow: 0 0 2px #f27474 !important; }\n    .swal2-popup .swal2-input:focus,\n    .swal2-popup .swal2-file:focus,\n    .swal2-popup .swal2-textarea:focus {\n      border: 1px solid #b4dbed;\n      outline: none;\n      -webkit-box-shadow: 0 0 3px #c4e6f5;\n              box-shadow: 0 0 3px #c4e6f5; }\n    .swal2-popup .swal2-input::-webkit-input-placeholder,\n    .swal2-popup .swal2-file::-webkit-input-placeholder,\n    .swal2-popup .swal2-textarea::-webkit-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input:-ms-input-placeholder,\n    .swal2-popup .swal2-file:-ms-input-placeholder,\n    .swal2-popup .swal2-textarea:-ms-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input::-ms-input-placeholder,\n    .swal2-popup .swal2-file::-ms-input-placeholder,\n    .swal2-popup .swal2-textarea::-ms-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input::placeholder,\n    .swal2-popup .swal2-file::placeholder,\n    .swal2-popup .swal2-textarea::placeholder {\n      color: #cccccc; }\n  .swal2-popup .swal2-range input {\n    width: 80%; }\n  .swal2-popup .swal2-range output {\n    width: 20%;\n    font-weight: 600;\n    text-align: center; }\n  .swal2-popup .swal2-range input,\n  .swal2-popup .swal2-range output {\n    height: 2.625em;\n    margin: 1em auto;\n    padding: 0;\n    font-size: 1.125em;\n    line-height: 2.625em; }\n  .swal2-popup .swal2-input {\n    height: 2.625em;\n    padding: 0 .75em; }\n    .swal2-popup .swal2-input[type='number'] {\n      max-width: 10em; }\n  .swal2-popup .swal2-file {\n    font-size: 1.125em; }\n  .swal2-popup .swal2-textarea {\n    height: 6.75em;\n    padding: .75em; }\n  .swal2-popup .swal2-select {\n    min-width: 50%;\n    max-width: 100%;\n    padding: .375em .625em;\n    color: #545454;\n    font-size: 1.125em; }\n  .swal2-popup .swal2-radio,\n  .swal2-popup .swal2-checkbox {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    .swal2-popup .swal2-radio label,\n    .swal2-popup .swal2-checkbox label {\n      margin: 0 .6em;\n      font-size: 1.125em; }\n    .swal2-popup .swal2-radio input,\n    .swal2-popup .swal2-checkbox input {\n      margin: 0 .4em; }\n  .swal2-popup .swal2-validationerror {\n    display: none;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: .625em;\n    background-color: #f0f0f0;\n    color: gray;\n    font-size: 1em;\n    font-weight: 300;\n    overflow: hidden; }\n    .swal2-popup .swal2-validationerror::before {\n      display: inline-block;\n      width: 1.5em;\n      height: 1.5em;\n      margin: 0 .625em;\n      border-radius: 50%;\n      background-color: #ea7d7d;\n      color: #fff;\n      font-weight: 600;\n      line-height: 1.5em;\n      text-align: center;\n      content: '!'; }\n\n@supports (-ms-accelerator: true) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n.swal2-icon {\n  position: relative;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 80px;\n  height: 80px;\n  margin: 1.25em auto 1.875em;\n  border: 4px solid transparent;\n  border-radius: 50%;\n  line-height: 80px;\n  cursor: default;\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  .swal2-icon.swal2-error {\n    border-color: #f27474; }\n    .swal2-icon.swal2-error .swal2-x-mark {\n      position: relative;\n      -webkit-box-flex: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1; }\n    .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      display: block;\n      position: absolute;\n      top: 37px;\n      width: 47px;\n      height: 5px;\n      border-radius: 2px;\n      background-color: #f27474; }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        left: 17px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg); }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        right: 16px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg); }\n  .swal2-icon.swal2-warning, .swal2-icon.swal2-info, .swal2-icon.swal2-question {\n    margin: .333333em auto .5em;\n    font-family: inherit;\n    font-size: 3.75em; }\n  .swal2-icon.swal2-warning {\n    border-color: #facea8;\n    color: #f8bb86; }\n  .swal2-icon.swal2-info {\n    border-color: #9de0f6;\n    color: #3fc3ee; }\n  .swal2-icon.swal2-question {\n    border-color: #c9dae1;\n    color: #87adbd; }\n  .swal2-icon.swal2-success {\n    border-color: #a5dc86; }\n    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {\n      position: absolute;\n      width: 60px;\n      height: 120px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n      border-radius: 50%; }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        top: -7px;\n        left: -33px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 60px 60px;\n                transform-origin: 60px 60px;\n        border-radius: 120px 0 0 120px; }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        top: -11px;\n        left: 30px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 0 60px;\n                transform-origin: 0 60px;\n        border-radius: 0 120px 120px 0; }\n    .swal2-icon.swal2-success .swal2-success-ring {\n      position: absolute;\n      top: -4px;\n      left: -4px;\n      width: 80px;\n      height: 80px;\n      border: 4px solid rgba(165, 220, 134, 0.2);\n      border-radius: 50%;\n      z-index: 2;\n      -webkit-box-sizing: content-box;\n              box-sizing: content-box; }\n    .swal2-icon.swal2-success .swal2-success-fix {\n      position: absolute;\n      top: 8px;\n      left: 26px;\n      width: 7px;\n      height: 90px;\n      -webkit-transform: rotate(-45deg);\n              transform: rotate(-45deg);\n      z-index: 1; }\n    .swal2-icon.swal2-success [class^='swal2-success-line'] {\n      display: block;\n      position: absolute;\n      height: 5px;\n      border-radius: 2px;\n      background-color: #a5dc86;\n      z-index: 2; }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {\n        top: 46px;\n        left: 14px;\n        width: 25px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg); }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {\n        top: 38px;\n        right: 8px;\n        width: 47px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg); }\n\n.swal2-progresssteps {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 0 0 1.25em;\n  padding: 0;\n  font-weight: 600; }\n  .swal2-progresssteps li {\n    display: inline-block;\n    position: relative; }\n  .swal2-progresssteps .swal2-progresscircle {\n    width: 2em;\n    height: 2em;\n    border-radius: 2em;\n    background: #3085d6;\n    color: #fff;\n    line-height: 2em;\n    text-align: center;\n    z-index: 20; }\n    .swal2-progresssteps .swal2-progresscircle:first-child {\n      margin-left: 0; }\n    .swal2-progresssteps .swal2-progresscircle:last-child {\n      margin-right: 0; }\n    .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {\n      background: #3085d6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {\n        background: #add8e6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {\n        background: #add8e6; }\n  .swal2-progresssteps .swal2-progressline {\n    width: 2.5em;\n    height: .4em;\n    margin: 0 -1px;\n    background: #3085d6;\n    z-index: 10; }\n\n[class^='swal2'] {\n  -webkit-tap-highlight-color: transparent; }\n\n@-webkit-keyframes showSweetAlert {\n  0% {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n  45% {\n    -webkit-transform: scale(1.05);\n            transform: scale(1.05); }\n  80% {\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes showSweetAlert {\n  0% {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n  45% {\n    -webkit-transform: scale(1.05);\n            transform: scale(1.05); }\n  80% {\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@-webkit-keyframes hideSweetAlert {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0; } }\n\n@keyframes hideSweetAlert {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0; } }\n\n.swal2-show {\n  -webkit-animation: showSweetAlert .3s;\n          animation: showSweetAlert .3s; }\n  .swal2-show.swal2-noanimation {\n    -webkit-animation: none;\n            animation: none; }\n\n.swal2-hide {\n  -webkit-animation: hideSweetAlert .15s forwards;\n          animation: hideSweetAlert .15s forwards; }\n  .swal2-hide.swal2-noanimation {\n    -webkit-animation: none;\n            animation: none; }\n\n[dir='rtl'] .swal2-close {\n  right: auto;\n  left: 8px; }\n\n@-webkit-keyframes animate-success-tip {\n  0% {\n    top: 19px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 17px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 35px;\n    left: -6px;\n    width: 50px; }\n  84% {\n    top: 48px;\n    left: 21px;\n    width: 17px; }\n  100% {\n    top: 45px;\n    left: 14px;\n    width: 25px; } }\n\n@keyframes animate-success-tip {\n  0% {\n    top: 19px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 17px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 35px;\n    left: -6px;\n    width: 50px; }\n  84% {\n    top: 48px;\n    left: 21px;\n    width: 17px; }\n  100% {\n    top: 45px;\n    left: 14px;\n    width: 25px; } }\n\n@-webkit-keyframes animate-success-long {\n  0% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  65% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  84% {\n    top: 35px;\n    right: 0;\n    width: 55px; }\n  100% {\n    top: 38px;\n    right: 8px;\n    width: 47px; } }\n\n@keyframes animate-success-long {\n  0% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  65% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  84% {\n    top: 35px;\n    right: 0;\n    width: 55px; }\n  100% {\n    top: 38px;\n    right: 8px;\n    width: 47px; } }\n\n@-webkit-keyframes rotatePlaceholder {\n  0% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  5% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  12% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); }\n  100% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); } }\n\n@keyframes rotatePlaceholder {\n  0% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  5% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  12% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); }\n  100% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); } }\n\n.swal2-animate-success-line-tip {\n  -webkit-animation: animate-success-tip .75s;\n          animation: animate-success-tip .75s; }\n\n.swal2-animate-success-line-long {\n  -webkit-animation: animate-success-long .75s;\n          animation: animate-success-long .75s; }\n\n.swal2-success.swal2-animate-success-icon .swal2-success-circular-line-right {\n  -webkit-animation: rotatePlaceholder 4.25s ease-in;\n          animation: rotatePlaceholder 4.25s ease-in; }\n\n@-webkit-keyframes animate-error-icon {\n  0% {\n    -webkit-transform: rotateX(100deg);\n            transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    opacity: 1; } }\n\n@keyframes animate-error-icon {\n  0% {\n    -webkit-transform: rotateX(100deg);\n            transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    opacity: 1; } }\n\n.swal2-animate-error-icon {\n  -webkit-animation: animate-error-icon .5s;\n          animation: animate-error-icon .5s; }\n\n@-webkit-keyframes animate-x-mark {\n  0% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  50% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  80% {\n    margin-top: -6px;\n    -webkit-transform: scale(1.15);\n            transform: scale(1.15); }\n  100% {\n    margin-top: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n@keyframes animate-x-mark {\n  0% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  50% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  80% {\n    margin-top: -6px;\n    -webkit-transform: scale(1.15);\n            transform: scale(1.15); }\n  100% {\n    margin-top: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n.swal2-animate-x-mark {\n  -webkit-animation: animate-x-mark .5s;\n          animation: animate-x-mark .5s; }\n\n@-webkit-keyframes rotate-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes rotate-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n";

var defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  footer: '',
  type: null,
  toast: false,
  customClass: '',
  target: 'body',
  backdrop: true,
  animation: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  showConfirmButton: true,
  showCancelButton: false,
  preConfirm: null,
  confirmButtonText: 'OK',
  confirmButtonAriaLabel: '',
  confirmButtonColor: null,
  confirmButtonClass: null,
  cancelButtonText: 'Cancel',
  cancelButtonAriaLabel: '',
  cancelButtonColor: null,
  cancelButtonClass: null,
  buttonsStyling: true,
  reverseButtons: false,
  focusConfirm: true,
  focusCancel: false,
  showCloseButton: false,
  closeButtonAriaLabel: 'Close this dialog',
  showLoaderOnConfirm: false,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
  imageAlt: '',
  imageClass: null,
  timer: null,
  width: null,
  padding: null,
  background: null,
  input: null,
  inputPlaceholder: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputClass: null,
  inputAttributes: {},
  inputValidator: null,
  grow: false,
  position: 'center',
  progressSteps: [],
  currentProgressStep: null,
  progressStepsDistance: null,
  onBeforeOpen: null,
  onOpen: null,
  onClose: null,
  useRejections: false,
  expectRejections: false
};

var deprecatedParams = ['useRejections', 'expectRejections'];

var swalPrefix = 'swal2-';

var prefix = function prefix(items) {
  var result = {};
  for (var i in items) {
    result[items[i]] = swalPrefix + items[i];
  }
  return result;
};

var swalClasses = prefix(['container', 'shown', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'image', 'input', 'has-input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen']);

var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

var consolePrefix = 'SweetAlert2:';

/**
 * Filter the unique values into a new array
 * @param arr
 */
var uniqueArray = function uniqueArray(arr) {
  var result = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;

      if (result.indexOf(elem) === -1) {
        result.push(elem);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

/**
 * Convert object into iterable Map
 * https://stackoverflow.com/a/36644532/1331425
 * @param obj
 */
var objectToMap = function objectToMap(obj) {
  if (obj instanceof Map) {
    return obj;
  }
  var map = new Map();
  Object.keys(obj).forEach(function (key) {
    map.set(key, obj[key]);
  });
  return map;
};

/**
 * Standardise console warnings
 * @param message
 */
var warn = function warn(message) {
  console.warn(consolePrefix + ' ' + message);
};

/**
 * Standardise console errors
 * @param message
 */
var error = function error(message) {
  console.error(consolePrefix + ' ' + message);
};

/**
 * Private global state for `warnOnce`
 * @type {Array}
 * @private
 */
var previousWarnOnceMessages = [];

/**
 * Show a console warning, but only if it hasn't already been shown
 * @param message
 */
var warnOnce = function warnOnce(message) {
  if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
    previousWarnOnceMessages.push(message);
    warn(message);
  }
};

/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 * @param arg
 */
var callIfFunction = function callIfFunction(arg) {
  return typeof arg === 'function' ? arg() : arg;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















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





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var popupParams = _extends({}, defaultParams);
var queue = [];

var previousWindowKeyDown = void 0;
var windowOnkeydownOverridden = void 0;

/**
 * Show relevant warnings for given params
 *
 * @param params
 */
var showWarningsForParams = function showWarningsForParams(params) {
  for (var param in params) {
    if (!sweetAlert.isValidParameter(param)) {
      warn('Unknown parameter "' + param + '"');
    }
    if (sweetAlert.isDeprecatedParameter(param)) {
      warnOnce('The parameter "' + param + '" is deprecated and will be removed in the next major release.');
    }
  }
};

/**
 * Set type, text and actions on popup
 *
 * @param params
 * @returns {boolean}
 */
var setParameters = function setParameters(params) {
  // Determine if the custom target element is valid
  if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
    warn('Target parameter is not valid, defaulting to "body"');
    params.target = 'body';
  }

  var popup = void 0;
  var oldPopup = getPopup();
  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  // If the model target has changed, refresh the popup
  if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
    popup = init(params);
  } else {
    popup = oldPopup || init(params);
  }

  // Set popup width
  if (params.width) {
    popup.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;
  }

  // Set popup padding
  if (params.padding) {
    popup.style.padding = typeof params.padding === 'number' ? params.padding + 'px' : params.padding;
  }

  // Set popup background
  if (params.background) {
    popup.style.background = params.background;
  }
  var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
  var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
  for (var i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor;
  }

  var container = getContainer();
  var title = getTitle();
  var content = getContent().querySelector('#' + swalClasses.content);
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();
  var closeButton = getCloseButton();
  var footer = getFooter();

  // Title
  if (params.titleText) {
    title.innerText = params.titleText;
  } else if (params.title) {
    title.innerHTML = params.title.split('\n').join('<br />');
  }

  if (typeof params.backdrop === 'string') {
    getContainer().style.background = params.backdrop;
  } else if (!params.backdrop) {
    addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
  }

  // Content as HTML
  if (params.html) {
    parseHtmlToContainer(params.html, content);

    // Content as plain text
  } else if (params.text) {
    content.textContent = params.text;
    show(content);
  } else {
    hide(content);
  }

  // Position
  if (params.position in swalClasses) {
    addClass(container, swalClasses[params.position]);
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"');
    addClass(container, swalClasses.center);
  }

  // Grow
  if (params.grow && typeof params.grow === 'string') {
    var growClass = 'grow-' + params.grow;
    if (growClass in swalClasses) {
      addClass(container, swalClasses[growClass]);
    }
  }

  // Close button
  if (params.showCloseButton) {
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
    show(closeButton);
  } else {
    hide(closeButton);
  }

  // Default Class
  popup.className = swalClasses.popup;
  if (params.toast) {
    addClass([document.documentElement, document.body], swalClasses['toast-shown']);
    addClass(popup, swalClasses.toast);
  } else {
    addClass(popup, swalClasses.modal);
  }

  // Custom Class
  if (params.customClass) {
    addClass(popup, params.customClass);
  }

  // Progress steps
  var progressStepsContainer = getProgressSteps();
  var currentProgressStep = parseInt(params.currentProgressStep === null ? sweetAlert.getQueueStep() : params.currentProgressStep, 10);
  if (params.progressSteps && params.progressSteps.length) {
    show(progressStepsContainer);
    empty(progressStepsContainer);
    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    params.progressSteps.forEach(function (step, index) {
      var circle = document.createElement('li');
      addClass(circle, swalClasses.progresscircle);
      circle.innerHTML = step;
      if (index === currentProgressStep) {
        addClass(circle, swalClasses.activeprogressstep);
      }
      progressStepsContainer.appendChild(circle);
      if (index !== params.progressSteps.length - 1) {
        var line = document.createElement('li');
        addClass(line, swalClasses.progressline);
        if (params.progressStepsDistance) {
          line.style.width = params.progressStepsDistance;
        }
        progressStepsContainer.appendChild(line);
      }
    });
  } else {
    hide(progressStepsContainer);
  }

  // Icon
  var icons = getIcons();
  for (var _i = 0; _i < icons.length; _i++) {
    hide(icons[_i]);
  }
  if (params.type) {
    var validType = false;
    for (var iconType in iconTypes) {
      if (params.type === iconType) {
        validType = true;
        break;
      }
    }
    if (!validType) {
      error('Unknown alert type: ' + params.type);
      return false;
    }
    var icon = popup.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
    show(icon);

    // Animate icon
    if (params.animation) {
      switch (params.type) {
        case 'success':
          addClass(icon, 'swal2-animate-success-icon');
          addClass(icon.querySelector('.swal2-success-line-tip'), 'swal2-animate-success-line-tip');
          addClass(icon.querySelector('.swal2-success-line-long'), 'swal2-animate-success-line-long');
          break;
        case 'error':
          addClass(icon, 'swal2-animate-error-icon');
          addClass(icon.querySelector('.swal2-x-mark'), 'swal2-animate-x-mark');
          break;
        default:
          break;
      }
    }
  }

  // Custom image
  var image = getImage();
  if (params.imageUrl) {
    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt);
    show(image);

    if (params.imageWidth) {
      image.setAttribute('width', params.imageWidth);
    } else {
      image.removeAttribute('width');
    }

    if (params.imageHeight) {
      image.setAttribute('height', params.imageHeight);
    } else {
      image.removeAttribute('height');
    }

    image.className = swalClasses.image;
    if (params.imageClass) {
      addClass(image, params.imageClass);
    }
  } else {
    hide(image);
  }

  // Cancel button
  if (params.showCancelButton) {
    cancelButton.style.display = 'inline-block';
  } else {
    hide(cancelButton);
  }

  // Confirm button
  if (params.showConfirmButton) {
    removeStyleProperty(confirmButton, 'display');
  } else {
    hide(confirmButton);
  }

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showCancelButton) {
    hide(actions);
  } else {
    show(actions);
  }

  // Edit text on confirm and cancel buttons
  confirmButton.innerHTML = params.confirmButtonText;
  cancelButton.innerHTML = params.cancelButtonText;

  // ARIA labels for confirm and cancel buttons
  confirmButton.setAttribute('aria-label', params.confirmButtonAriaLabel);
  cancelButton.setAttribute('aria-label', params.cancelButtonAriaLabel);

  // Add buttons custom classes
  confirmButton.className = swalClasses.confirm;
  addClass(confirmButton, params.confirmButtonClass);
  cancelButton.className = swalClasses.cancel;
  addClass(cancelButton, params.cancelButtonClass);

  // Buttons styling
  if (params.buttonsStyling) {
    addClass([confirmButton, cancelButton], swalClasses.styled);

    // Buttons background colors
    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }
    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    }

    // Loading state
    var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
    confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
    confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
  } else {
    removeClass([confirmButton, cancelButton], swalClasses.styled);

    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
  }

  // Footer
  parseHtmlToContainer(params.footer, footer);

  // CSS animation
  if (params.animation === true) {
    removeClass(popup, swalClasses.noanimation);
  } else {
    addClass(popup, swalClasses.noanimation);
  }

  // showLoaderOnConfirm && preConfirm
  if (params.showLoaderOnConfirm && !params.preConfirm) {
    warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
  }
};

/**
 * Animations
 *
 * @param animation
 * @param onBeforeOpen
 * @param onComplete
 */
var openPopup = function openPopup(animation, onBeforeOpen, onComplete) {
  var container = getContainer();
  var popup = getPopup();

  if (onBeforeOpen !== null && typeof onBeforeOpen === 'function') {
    onBeforeOpen(popup);
  }

  if (animation) {
    addClass(popup, swalClasses.show);
    addClass(container, swalClasses.fade);
    removeClass(popup, swalClasses.hide);
  } else {
    removeClass(popup, swalClasses.fade);
  }
  show(popup);

  // scrolling is 'hidden' until animation is done, after that 'auto'
  container.style.overflowY = 'hidden';
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      container.style.overflowY = 'auto';
    });
  } else {
    container.style.overflowY = 'auto';
  }

  addClass([document.documentElement, document.body, container], swalClasses.shown);
  if (isModal()) {
    fixScrollbar();
    iOSfix();
  }
  states.previousActiveElement = document.activeElement;
  if (onComplete !== null && typeof onComplete === 'function') {
    setTimeout(function () {
      onComplete(popup);
    });
  }
};

var fixScrollbar = function fixScrollbar() {
  // for queues, do not do this more than once
  if (states.previousBodyPadding !== null) {
    return;
  }
  // if the body has overflow
  if (document.body.scrollHeight > window.innerHeight) {
    // add padding so the content doesn't shift after removal of scrollbar
    states.previousBodyPadding = document.body.style.paddingRight;
    document.body.style.paddingRight = measureScrollbar() + 'px';
  }
};

var undoScrollbar = function undoScrollbar() {
  if (states.previousBodyPadding !== null) {
    document.body.style.paddingRight = states.previousBodyPadding;
    states.previousBodyPadding = null;
  }
};

// Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
var iOSfix = function iOSfix() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    var offset = document.body.scrollTop;
    document.body.style.top = offset * -1 + 'px';
    addClass(document.body, swalClasses.iosfix);
  }
};

var undoIOSfix = function undoIOSfix() {
  if (hasClass(document.body, swalClasses.iosfix)) {
    var offset = parseInt(document.body.style.top, 10);
    removeClass(document.body, swalClasses.iosfix);
    document.body.style.top = '';
    document.body.scrollTop = offset * -1;
  }
};

// SweetAlert entry point
var sweetAlert = function sweetAlert() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // Prevent run in Node env
  if (typeof window === 'undefined') {
    return;
  }

  // Check for the existence of Promise
  if (typeof Promise === 'undefined') {
    error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
  }

  if (typeof args[0] === 'undefined') {
    error('SweetAlert2 expects at least 1 attribute!');
    return false;
  }

  var params = _extends({}, popupParams);

  switch (_typeof(args[0])) {
    case 'string':
      params.title = args[0];
      params.html = args[1];
      params.type = args[2];

      break;

    case 'object':
      showWarningsForParams(args[0]);
      _extends(params, args[0]);
      params.extraParams = args[0].extraParams;

      if (params.input === 'email' && params.inputValidator === null) {
        var inputValidator = function inputValidator(email) {
          return new Promise(function (resolve, reject) {
            var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/;
            if (emailRegex.test(email)) {
              resolve();
            } else {
              reject('Invalid email address');
            }
          });
        };
        params.inputValidator = params.expectRejections ? inputValidator : sweetAlert.adaptInputValidator(inputValidator);
      }

      if (params.input === 'url' && params.inputValidator === null) {
        var _inputValidator = function _inputValidator(url) {
          return new Promise(function (resolve, reject) {
            // taken from https://stackoverflow.com/a/3809435/1331425
            var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
            if (urlRegex.test(url)) {
              resolve();
            } else {
              reject('Invalid URL');
            }
          });
        };
        params.inputValidator = params.expectRejections ? _inputValidator : sweetAlert.adaptInputValidator(_inputValidator);
      }
      break;

    default:
      error('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
      return false;
  }

  setParameters(params);

  var container = getContainer();
  var popup = getPopup();

  return new Promise(function (resolve, reject) {
    // functions to handle all resolving/rejecting/settling
    var succeedWith = function succeedWith(value) {
      sweetAlert.closePopup(params.onClose);
      if (params.useRejections) {
        resolve(value);
      } else {
        resolve({ value: value });
      }
    };
    var dismissWith = function dismissWith(dismiss) {
      sweetAlert.closePopup(params.onClose);
      if (params.useRejections) {
        reject(dismiss);
      } else {
        resolve({ dismiss: dismiss });
      }
    };
    var errorWith = function errorWith(error$$1) {
      sweetAlert.closePopup(params.onClose);
      reject(error$$1);
    };

    // Close on timer
    if (params.timer) {
      popup.timeout = setTimeout(function () {
        return dismissWith('timer');
      }, params.timer);
    }

    // Get input element by specified type or, if type isn't specified, by params.input
    var getInput = function getInput(inputType) {
      inputType = inputType || params.input;
      if (!inputType) {
        return null;
      }
      switch (inputType) {
        case 'select':
        case 'textarea':
        case 'file':
          return getChildByClass(content, swalClasses[inputType]);
        case 'checkbox':
          return popup.querySelector('.' + swalClasses.checkbox + ' input');
        case 'radio':
          return popup.querySelector('.' + swalClasses.radio + ' input:checked') || popup.querySelector('.' + swalClasses.radio + ' input:first-child');
        case 'range':
          return popup.querySelector('.' + swalClasses.range + ' input');
        default:
          return getChildByClass(content, swalClasses.input);
      }
    };

    // Get the value of the popup input
    var getInputValue = function getInputValue() {
      var input = getInput();
      if (!input) {
        return null;
      }
      switch (params.input) {
        case 'checkbox':
          return input.checked ? 1 : 0;
        case 'radio':
          return input.checked ? input.value : null;
        case 'file':
          return input.files.length ? input.files[0] : null;
        default:
          return params.inputAutoTrim ? input.value.trim() : input.value;
      }
    };

    // input autofocus
    if (params.input) {
      setTimeout(function () {
        var input = getInput();
        if (input) {
          focusInput(input);
        }
      }, 0);
    }

    var confirm = function confirm(value) {
      if (params.showLoaderOnConfirm) {
        sweetAlert.showLoading();
      }

      if (params.preConfirm) {
        sweetAlert.resetValidationError();
        var preConfirmPromise = Promise.resolve().then(function () {
          return params.preConfirm(value, params.extraParams);
        });
        if (params.expectRejections) {
          preConfirmPromise.then(function (preConfirmValue) {
            return succeedWith(preConfirmValue || value);
          }, function (validationError) {
            sweetAlert.hideLoading();
            if (validationError) {
              sweetAlert.showValidationError(validationError);
            }
          });
        } else {
          preConfirmPromise.then(function (preConfirmValue) {
            if (isVisible(getValidationError()) || preConfirmValue === false) {
              sweetAlert.hideLoading();
            } else {
              succeedWith(preConfirmValue || value);
            }
          }, function (error$$1) {
            return errorWith(error$$1);
          });
        }
      } else {
        succeedWith(value);
      }
    };

    // Mouse interactions
    var onButtonEvent = function onButtonEvent(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var confirmButton = getConfirmButton();
      var cancelButton = getCancelButton();
      var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
      var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

      switch (e.type) {
        case 'click':
          // Clicked 'confirm'
          if (targetedConfirm && sweetAlert.isVisible()) {
            sweetAlert.disableButtons();
            if (params.input) {
              var inputValue = getInputValue();

              if (params.inputValidator) {
                sweetAlert.disableInput();
                var validationPromise = Promise.resolve().then(function () {
                  return params.inputValidator(inputValue, params.extraParams);
                });
                if (params.expectRejections) {
                  validationPromise.then(function () {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    confirm(inputValue);
                  }, function (validationError) {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    if (validationError) {
                      sweetAlert.showValidationError(validationError);
                    }
                  });
                } else {
                  validationPromise.then(function (validationError) {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    if (validationError) {
                      sweetAlert.showValidationError(validationError);
                    } else {
                      confirm(inputValue);
                    }
                  }, function (error$$1) {
                    return errorWith(error$$1);
                  });
                }
              } else {
                confirm(inputValue);
              }
            } else {
              confirm(true);
            }

            // Clicked 'cancel'
          } else if (targetedCancel && sweetAlert.isVisible()) {
            sweetAlert.disableButtons();
            dismissWith(sweetAlert.DismissReason.cancel);
          }
          break;
        default:
      }
    };

    var buttons = popup.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = onButtonEvent;
      buttons[i].onmouseover = onButtonEvent;
      buttons[i].onmouseout = onButtonEvent;
      buttons[i].onmousedown = onButtonEvent;
    }

    // Closing popup by close button
    getCloseButton().onclick = function () {
      dismissWith(sweetAlert.DismissReason.close);
    };

    if (params.toast) {
      // Closing popup by backdrop click
      popup.onclick = function (e) {
        if (e.target !== popup || params.showConfirmButton || params.showCancelButton) {
          return;
        }
        if (params.allowOutsideClick) {
          sweetAlert.closePopup(params.onClose);
          dismissWith(sweetAlert.DismissReason.backdrop);
        }
      };
    } else {
      var ignoreOutsideClick = false;

      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      popup.onmousedown = function () {
        container.onmouseup = function (e) {
          container.onmouseup = undefined;
          // We only check if the mouseup target is the container because usually it doesn't
          // have any other direct children aside of the popup
          if (e.target === container) {
            ignoreOutsideClick = true;
          }
        };
      };

      // Ignore click events that had mousedown on the container but mouseup on the popup
      container.onmousedown = function () {
        popup.onmouseup = function (e) {
          popup.onmouseup = undefined;
          // We also need to check if the mouseup target is a child of the popup
          if (e.target === popup || popup.contains(e.target)) {
            ignoreOutsideClick = true;
          }
        };
      };

      container.onclick = function (e) {
        if (ignoreOutsideClick) {
          ignoreOutsideClick = false;
          return;
        }
        if (e.target !== container) {
          return;
        }
        if (callIfFunction(params.allowOutsideClick)) {
          dismissWith(sweetAlert.DismissReason.backdrop);
        }
      };
    }

    var content = getContent();
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton();

    // Reverse buttons (Confirm on the right side)
    if (params.reverseButtons) {
      confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
    } else {
      confirmButton.parentNode.insertBefore(confirmButton, cancelButton);
    }

    // Focus handling
    var setFocus = function setFocus(index, increment) {
      var focusableElements = getFocusableElements(params.focusCancel);
      // search for visible elements and select the next possible match
      for (var _i2 = 0; _i2 < focusableElements.length; _i2++) {
        index = index + increment;

        // rollover to first item
        if (index === focusableElements.length) {
          index = 0;

          // go to last item
        } else if (index === -1) {
          index = focusableElements.length - 1;
        }

        // determine if element is visible
        var el = focusableElements[index];
        if (isVisible(el)) {
          return el.focus();
        }
      }
    };

    var handleKeyDown = function handleKeyDown(event) {
      var e = event || window.event;

      var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
      ];

      if (e.key === 'Enter' && !e.isComposing) {
        if (e.target === getInput()) {
          if (['textarea', 'file'].indexOf(params.input) !== -1) {
            return; // do not submit
          }

          sweetAlert.clickConfirm();
          e.preventDefault();
        }

        // TAB
      } else if (e.key === 'Tab') {
        var targetElement = e.target || e.srcElement;

        var focusableElements = getFocusableElements(params.focusCancel);
        var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
        for (var _i3 = 0; _i3 < focusableElements.length; _i3++) {
          if (targetElement === focusableElements[_i3]) {
            btnIndex = _i3;
            break;
          }
        }

        if (!e.shiftKey) {
          // Cycle to the next button
          setFocus(btnIndex, 1);
        } else {
          // Cycle to the prev button
          setFocus(btnIndex, -1);
        }
        e.stopPropagation();
        e.preventDefault();

        // ARROWS - switch focus between buttons
      } else if (arrowKeys.indexOf(e.key) !== -1) {
        // focus Cancel button if Confirm button is currently focused
        if (document.activeElement === confirmButton && isVisible(cancelButton)) {
          cancelButton.focus();
          // and vice versa
        } else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
          confirmButton.focus();
        }

        // ESC
      } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(params.allowEscapeKey) === true) {
        dismissWith(sweetAlert.DismissReason.esc);
      }
    };

    if (params.toast && windowOnkeydownOverridden) {
      window.onkeydown = previousWindowKeyDown;
      windowOnkeydownOverridden = false;
    }

    if (!params.toast && !windowOnkeydownOverridden) {
      previousWindowKeyDown = window.onkeydown;
      windowOnkeydownOverridden = true;
      window.onkeydown = handleKeyDown;
    }

    /**
     * Show spinner instead of Confirm button and disable Cancel button
     */
    sweetAlert.hideLoading = sweetAlert.disableLoading = function () {
      if (!params.showConfirmButton) {
        hide(confirmButton);
        if (!params.showCancelButton) {
          hide(getActions());
        }
      }
      removeClass([popup, actions], swalClasses.loading);
      popup.removeAttribute('aria-busy');
      popup.removeAttribute('data-loading');
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    };

    sweetAlert.getTitle = function () {
      return getTitle();
    };
    sweetAlert.getContent = function () {
      return getContent();
    };
    sweetAlert.getInput = function () {
      return getInput();
    };
    sweetAlert.getImage = function () {
      return getImage();
    };
    sweetAlert.getButtonsWrapper = function () {
      return getButtonsWrapper();
    };
    sweetAlert.getActions = function () {
      return getActions();
    };
    sweetAlert.getConfirmButton = function () {
      return getConfirmButton();
    };
    sweetAlert.getCancelButton = function () {
      return getCancelButton();
    };
    sweetAlert.getFooter = function () {
      return getFooter();
    };
    sweetAlert.isLoading = function () {
      return isLoading();
    };

    sweetAlert.enableButtons = function () {
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    };

    sweetAlert.disableButtons = function () {
      confirmButton.disabled = true;
      cancelButton.disabled = true;
    };

    sweetAlert.enableConfirmButton = function () {
      confirmButton.disabled = false;
    };

    sweetAlert.disableConfirmButton = function () {
      confirmButton.disabled = true;
    };

    sweetAlert.enableInput = function () {
      var input = getInput();
      if (!input) {
        return false;
      }
      if (input.type === 'radio') {
        var radiosContainer = input.parentNode.parentNode;
        var radios = radiosContainer.querySelectorAll('input');
        for (var _i4 = 0; _i4 < radios.length; _i4++) {
          radios[_i4].disabled = false;
        }
      } else {
        input.disabled = false;
      }
    };

    sweetAlert.disableInput = function () {
      var input = getInput();
      if (!input) {
        return false;
      }
      if (input && input.type === 'radio') {
        var radiosContainer = input.parentNode.parentNode;
        var radios = radiosContainer.querySelectorAll('input');
        for (var _i5 = 0; _i5 < radios.length; _i5++) {
          radios[_i5].disabled = true;
        }
      } else {
        input.disabled = true;
      }
    };

    // Show block with validation error
    sweetAlert.showValidationError = function (error$$1) {
      var validationError = getValidationError();
      validationError.innerHTML = error$$1;
      var popupComputedStyle = window.getComputedStyle(popup);
      validationError.style.marginLeft = '-' + popupComputedStyle.getPropertyValue('padding-left');
      validationError.style.marginRight = '-' + popupComputedStyle.getPropertyValue('padding-right');
      show(validationError);

      var input = getInput();
      if (input) {
        input.setAttribute('aria-invalid', true);
        input.setAttribute('aria-describedBy', swalClasses.validationerror);
        focusInput(input);
        addClass(input, swalClasses.inputerror);
      }
    };

    // Hide block with validation error
    sweetAlert.resetValidationError = function () {
      var validationError = getValidationError();
      hide(validationError);

      var input = getInput();
      if (input) {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedBy');
        removeClass(input, swalClasses.inputerror);
      }
    };

    sweetAlert.getProgressSteps = function () {
      return params.progressSteps;
    };

    sweetAlert.setProgressSteps = function (progressSteps) {
      params.progressSteps = progressSteps;
      setParameters(params);
    };

    sweetAlert.showProgressSteps = function () {
      show(getProgressSteps());
    };

    sweetAlert.hideProgressSteps = function () {
      hide(getProgressSteps());
    };

    sweetAlert.enableButtons();
    sweetAlert.hideLoading();
    sweetAlert.resetValidationError();

    if (params.input) {
      addClass(document.body, swalClasses['has-input']);
    }

    // inputs
    var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
    var input = void 0;
    for (var _i6 = 0; _i6 < inputTypes.length; _i6++) {
      var inputClass = swalClasses[inputTypes[_i6]];
      var inputContainer = getChildByClass(content, inputClass);
      input = getInput(inputTypes[_i6]);

      // set attributes
      if (input) {
        for (var j in input.attributes) {
          if (input.attributes.hasOwnProperty(j)) {
            var attrName = input.attributes[j].name;
            if (attrName !== 'type' && attrName !== 'value') {
              input.removeAttribute(attrName);
            }
          }
        }
        for (var attr in params.inputAttributes) {
          input.setAttribute(attr, params.inputAttributes[attr]);
        }
      }

      // set class
      inputContainer.className = inputClass;
      if (params.inputClass) {
        addClass(inputContainer, params.inputClass);
      }

      hide(inputContainer);
    }

    var populateInputOptions = void 0;
    switch (params.input) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        input = getChildByClass(content, swalClasses.input);
        input.value = params.inputValue;
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'file':
        input = getChildByClass(content, swalClasses.file);
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'range':
        var range = getChildByClass(content, swalClasses.range);
        var rangeInput = range.querySelector('input');
        var rangeOutput = range.querySelector('output');
        rangeInput.value = params.inputValue;
        rangeInput.type = params.input;
        rangeOutput.value = params.inputValue;
        show(range);
        break;
      case 'select':
        var select = getChildByClass(content, swalClasses.select);
        select.innerHTML = '';
        if (params.inputPlaceholder) {
          var placeholder = document.createElement('option');
          placeholder.innerHTML = params.inputPlaceholder;
          placeholder.value = '';
          placeholder.disabled = true;
          placeholder.selected = true;
          select.appendChild(placeholder);
        }
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions = objectToMap(inputOptions);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = inputOptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = slicedToArray(_step.value, 2),
                  optionValue = _step$value[0],
                  optionLabel = _step$value[1];

              var option = document.createElement('option');
              option.value = optionValue;
              option.innerHTML = optionLabel;
              if (params.inputValue.toString() === optionValue.toString()) {
                option.selected = true;
              }
              select.appendChild(option);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          show(select);
          select.focus();
        };
        break;
      case 'radio':
        var radio = getChildByClass(content, swalClasses.radio);
        radio.innerHTML = '';
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions = objectToMap(inputOptions);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = inputOptions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = slicedToArray(_step2.value, 2),
                  radioValue = _step2$value[0],
                  radioLabel = _step2$value[1];

              var radioInput = document.createElement('input');
              var radioLabelElement = document.createElement('label');
              radioInput.type = 'radio';
              radioInput.name = swalClasses.radio;
              radioInput.value = radioValue;
              if (params.inputValue.toString() === radioValue.toString()) {
                radioInput.checked = true;
              }
              radioLabelElement.innerHTML = radioLabel;
              radioLabelElement.insertBefore(radioInput, radioLabelElement.firstChild);
              radio.appendChild(radioLabelElement);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          show(radio);
          var radios = radio.querySelectorAll('input');
          if (radios.length) {
            radios[0].focus();
          }
        };
        break;
      case 'checkbox':
        var checkbox = getChildByClass(content, swalClasses.checkbox);
        var checkboxInput = getInput('checkbox');
        checkboxInput.type = 'checkbox';
        checkboxInput.value = 1;
        checkboxInput.id = swalClasses.checkbox;
        checkboxInput.checked = Boolean(params.inputValue);
        var label = checkbox.getElementsByTagName('span');
        if (label.length) {
          checkbox.removeChild(label[0]);
        }
        label = document.createElement('span');
        label.innerHTML = params.inputPlaceholder;
        checkbox.appendChild(label);
        show(checkbox);
        break;
      case 'textarea':
        var textarea = getChildByClass(content, swalClasses.textarea);
        textarea.value = params.inputValue;
        textarea.placeholder = params.inputPlaceholder;
        show(textarea);
        break;
      case null:
        break;
      default:
        error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + params.input + '"');
        break;
    }

    if (params.input === 'select' || params.input === 'radio') {
      if (params.inputOptions instanceof Promise) {
        sweetAlert.showLoading();
        params.inputOptions.then(function (inputOptions) {
          sweetAlert.hideLoading();
          populateInputOptions(inputOptions);
        });
      } else if (_typeof(params.inputOptions) === 'object') {
        populateInputOptions(params.inputOptions);
      } else {
        error('Unexpected type of inputOptions! Expected object, Map or Promise, got ' + _typeof(params.inputOptions));
      }
    }

    openPopup(params.animation, params.onBeforeOpen, params.onOpen);

    if (!params.toast) {
      if (!callIfFunction(params.allowEnterKey)) {
        if (document.activeElement) {
          document.activeElement.blur();
        }
      } else if (params.focusCancel && isVisible(cancelButton)) {
        cancelButton.focus();
      } else if (params.focusConfirm && isVisible(confirmButton)) {
        confirmButton.focus();
      } else {
        setFocus(-1, 1);
      }
    }

    // fix scroll
    getContainer().scrollTop = 0;
  });
};

/*
 * Global function to determine if swal2 popup is shown
 */
sweetAlert.isVisible = function () {
  return !!getPopup();
};

/*
 * Global function for chaining sweetAlert popups
 */
sweetAlert.queue = function (steps) {
  queue = steps;
  var resetQueue = function resetQueue() {
    queue = [];
    document.body.removeAttribute('data-swal2-queue-step');
  };
  var queueResult = [];
  return new Promise(function (resolve, reject) {
    (function step(i, callback) {
      if (i < queue.length) {
        document.body.setAttribute('data-swal2-queue-step', i);

        sweetAlert(queue[i]).then(function (result) {
          if (typeof result.value !== 'undefined') {
            queueResult.push(result.value);
            step(i + 1, callback);
          } else {
            resetQueue();
            resolve({ dismiss: result.dismiss });
          }
        });
      } else {
        resetQueue();
        resolve({ value: queueResult });
      }
    })(0);
  });
};

/*
 * Global function for getting the index of current popup in queue
 */
sweetAlert.getQueueStep = function () {
  return document.body.getAttribute('data-swal2-queue-step');
};

/*
 * Global function for inserting a popup to the queue
 */
sweetAlert.insertQueueStep = function (step, index) {
  if (index && index < queue.length) {
    return queue.splice(index, 0, step);
  }
  return queue.push(step);
};

/*
 * Global function for deleting a popup from the queue
 */
sweetAlert.deleteQueueStep = function (index) {
  if (typeof queue[index] !== 'undefined') {
    queue.splice(index, 1);
  }
};

/*
 * Global function to close sweetAlert
 */
sweetAlert.close = sweetAlert.closePopup = sweetAlert.closeModal = sweetAlert.closeToast = function (onComplete) {
  var container = getContainer();
  var popup = getPopup();
  if (!popup) {
    return;
  }
  removeClass(popup, swalClasses.show);
  addClass(popup, swalClasses.hide);
  clearTimeout(popup.timeout);

  if (!isToast()) {
    resetPrevState();
    window.onkeydown = previousWindowKeyDown;
    windowOnkeydownOverridden = false;
  }

  var removePopupAndResetState = function removePopupAndResetState() {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
    }
  };

  // If animation is supported, animate
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      if (hasClass(popup, swalClasses.hide)) {
        removePopupAndResetState();
      }
    });
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState();
  }
  if (onComplete !== null && typeof onComplete === 'function') {
    setTimeout(function () {
      onComplete(popup);
    });
  }
};

/*
 * Global function to click 'Confirm' button
 */
sweetAlert.clickConfirm = function () {
  return getConfirmButton().click();
};

/*
 * Global function to click 'Cancel' button
 */
sweetAlert.clickCancel = function () {
  return getCancelButton().click();
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
sweetAlert.showLoading = sweetAlert.enableLoading = function () {
  var popup = getPopup();
  if (!popup) {
    sweetAlert('');
  }
  popup = getPopup();
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();

  show(actions);
  show(confirmButton, 'inline-block');
  addClass([popup, actions], swalClasses.loading);
  confirmButton.disabled = true;
  cancelButton.disabled = true;

  popup.setAttribute('data-loading', true);
  popup.setAttribute('aria-busy', true);
  popup.focus();
};

/**
 * Is valid parameter
 * @param {String} paramName
 */
sweetAlert.isValidParameter = function (paramName) {
  return defaultParams.hasOwnProperty(paramName) || paramName === 'extraParams';
};

/**
 * Is deprecated parameter
 * @param {String} paramName
 */
sweetAlert.isDeprecatedParameter = function (paramName) {
  return deprecatedParams.indexOf(paramName) !== -1;
};

/**
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = function (userParams) {
  if (!userParams || (typeof userParams === 'undefined' ? 'undefined' : _typeof(userParams)) !== 'object') {
    return error('the argument for setDefaults() is required and has to be a object');
  }

  showWarningsForParams(userParams);

  // assign valid params from userParams to popupParams
  for (var param in userParams) {
    if (sweetAlert.isValidParameter(param)) {
      popupParams[param] = userParams[param];
    }
  }
};

/**
 * Reset default params for each popup
 */
sweetAlert.resetDefaults = function () {
  popupParams = _extends({}, defaultParams);
};

/**
 * Adapt a legacy inputValidator for use with expectRejections=false
 */
sweetAlert.adaptInputValidator = function (legacyValidator) {
  return function adaptedInputValidator(inputValue, extraParams) {
    return legacyValidator.call(this, inputValue, extraParams).then(function () {
      return undefined;
    }, function (validationError) {
      return validationError;
    });
  };
};

sweetAlert.DismissReason = Object.freeze({
  cancel: 'cancel',
  backdrop: 'overlay',
  close: 'close',
  esc: 'esc',
  timer: 'timer'
});

sweetAlert.noop = function () {};

sweetAlert.version = '7.11.0';

sweetAlert.default = sweetAlert;

/**
 * Set default params if `window._swalDefaults` is an object
 */
if (typeof window !== 'undefined' && _typeof(window._swalDefaults) === 'object') {
  sweetAlert.setDefaults(window._swalDefaults);
}

// Remember state in cases where opening and handling a modal will fiddle with it.
var states = {
  previousActiveElement: null,
  previousBodyPadding: null

  // Detect Node env
};var isNodeEnv = function isNodeEnv() {
  return typeof window === 'undefined' || typeof document === 'undefined';
};

/*
 * Add modal + backdrop to DOM
 */
var init = function init(params) {
  // Clean up the old popup if it exists
  var c = getContainer();
  if (c) {
    c.parentNode.removeChild(c);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);
  }

  if (isNodeEnv()) {
    error('SweetAlert2 requires document to initialize');
    return;
  }

  var container = document.createElement('div');
  container.className = swalClasses.container;
  container.innerHTML = sweetHTML;

  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  targetElement.appendChild(container);

  var popup = getPopup();
  var content = getContent();
  var input = getChildByClass(content, swalClasses.input);
  var file = getChildByClass(content, swalClasses.file);
  var range = content.querySelector('.' + swalClasses.range + ' input');
  var rangeOutput = content.querySelector('.' + swalClasses.range + ' output');
  var select = getChildByClass(content, swalClasses.select);
  var checkbox = content.querySelector('.' + swalClasses.checkbox + ' input');
  var textarea = getChildByClass(content, swalClasses.textarea);

  // a11y
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

  var resetValidationError = function resetValidationError() {
    sweetAlert.isVisible() && sweetAlert.resetValidationError();
  };

  input.oninput = resetValidationError;
  file.onchange = resetValidationError;
  select.onchange = resetValidationError;
  checkbox.onchange = resetValidationError;
  textarea.oninput = resetValidationError;

  range.oninput = function () {
    resetValidationError();
    rangeOutput.value = range.value;
  };

  range.onchange = function () {
    resetValidationError();
    range.previousSibling.value = range.value;
  };

  return popup;
};

/*
 * Manipulate DOM
 */

var sweetHTML = ('\n <div role="dialog" aria-modal="true" aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.popup + '" tabindex="-1">\n   <div class="' + swalClasses.header + '">\n     <ul class="' + swalClasses.progresssteps + '"></ul>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + swalClasses.image + '" />\n     <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n     <button type="button" class="' + swalClasses.close + '">\xD7</button>\n   </div>\n   <div class="' + swalClasses.content + '">\n     <div id="' + swalClasses.content + '"></div>\n     <input class="' + swalClasses.input + '" />\n     <input type="file" class="' + swalClasses.file + '" />\n     <div class="' + swalClasses.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + swalClasses.select + '"></select>\n     <div class="' + swalClasses.radio + '"></div>\n     <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + swalClasses.textarea + '"></textarea>\n     <div class="' + swalClasses.validationerror + '" id="' + swalClasses.validationerror + '"></div>\n   </div>\n   <div class="' + swalClasses.actions + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <div class="' + swalClasses.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '');

var getContainer = function getContainer() {
  return document.body.querySelector('.' + swalClasses.container);
};

var getPopup = function getPopup() {
  return getContainer() ? getContainer().querySelector('.' + swalClasses.popup) : null;
};

var getIcons = function getIcons() {
  var popup = getPopup();
  return popup.querySelectorAll('.' + swalClasses.icon);
};

var elementByClass = function elementByClass(className) {
  return getContainer() ? getContainer().querySelector('.' + className) : null;
};

var getTitle = function getTitle() {
  return elementByClass(swalClasses.title);
};

var getContent = function getContent() {
  return elementByClass(swalClasses.content);
};

var getImage = function getImage() {
  return elementByClass(swalClasses.image);
};

var getProgressSteps = function getProgressSteps() {
  return elementByClass(swalClasses.progresssteps);
};

var getValidationError = function getValidationError() {
  return elementByClass(swalClasses.validationerror);
};

var getConfirmButton = function getConfirmButton() {
  return elementByClass(swalClasses.confirm);
};

var getCancelButton = function getCancelButton() {
  return elementByClass(swalClasses.cancel);
};

var getButtonsWrapper = function getButtonsWrapper() {
  warnOnce('swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead');
  return elementByClass(swalClasses.actions);
};

var getActions = function getActions() {
  return elementByClass(swalClasses.actions);
};

var getFooter = function getFooter() {
  return elementByClass(swalClasses.footer);
};

var getCloseButton = function getCloseButton() {
  return elementByClass(swalClasses.close);
};

var getFocusableElements = function getFocusableElements() {
  var focusableElementsWithTabindex = Array.prototype.slice.call(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
  // sort according to tabindex
  .sort(function (a, b) {
    a = parseInt(a.getAttribute('tabindex'));
    b = parseInt(b.getAttribute('tabindex'));
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  });

  var otherFocusableElements = Array.prototype.slice.call(getPopup().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, [tabindex="0"]'));

  return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements));
};

var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
  if (!param) {
    return hide(target);
  }

  if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
    target.innerHTML = '';
    if (0 in param) {
      for (var i = 0; i in param; i++) {
        target.appendChild(param[i].cloneNode(true));
      }
    } else {
      target.appendChild(param.cloneNode(true));
    }
  } else if (param) {
    target.innerHTML = param;
  } else {}
  show(target);
};

var isModal = function isModal() {
  return !document.body.classList.contains(swalClasses['toast-shown']);
};

var isToast = function isToast() {
  return document.body.classList.contains(swalClasses['toast-shown']);
};

var isLoading = function isLoading() {
  return getPopup().hasAttribute('data-loading');
};

var hasClass = function hasClass(elem, className) {
  if (elem.classList) {
    return elem.classList.contains(className);
  }
  return false;
};

var focusInput = function focusInput(input) {
  input.focus();

  // place cursor at end of text in text input
  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915/1331425
    var val = input.value;
    input.value = '';
    input.value = val;
  }
};

var addOrRemoveClass = function addOrRemoveClass(target, classList, add) {
  if (!target || !classList) {
    return;
  }
  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean);
  }
  classList.forEach(function (className) {
    if (target.forEach) {
      target.forEach(function (elem) {
        add ? elem.classList.add(className) : elem.classList.remove(className);
      });
    } else {
      add ? target.classList.add(className) : target.classList.remove(className);
    }
  });
};

var addClass = function addClass(target, classList) {
  addOrRemoveClass(target, classList, true);
};

var removeClass = function removeClass(target, classList) {
  addOrRemoveClass(target, classList, false);
};

var getChildByClass = function getChildByClass(elem, className) {
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i];
    }
  }
};

var show = function show(elem, display) {
  if (!display) {
    display = elem.id === swalClasses.content ? 'block' : 'flex';
  }
  elem.style.opacity = '';
  elem.style.display = display;
};

var hide = function hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var empty = function empty(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

// borrowed from jquery $(elem).is(':visible') implementation
var isVisible = function isVisible(elem) {
  return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};

var removeStyleProperty = function removeStyleProperty(elem, property) {
  if (elem.style.removeProperty) {
    elem.style.removeProperty(property);
  } else {
    elem.style.removeAttribute(property);
  }
};

var animationEndEvent = function () {
  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var testEl = document.createElement('div');
  var transEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd oanimationend',
    'animation': 'animationend'
  };
  for (var i in transEndEventNames) {
    if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
      return transEndEventNames[i];
    }
  }

  return false;
}();

// Reset previous window keydown handler and focued element
var resetPrevState = function resetPrevState() {
  if (states.previousActiveElement && states.previousActiveElement.focus) {
    var x = window.scrollX;
    var y = window.scrollY;
    states.previousActiveElement.focus();
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      // IE doesn't have scrollX/scrollY support
      window.scrollTo(x, y);
    }
  }
};

// Measure width of scrollbar
// https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
var measureScrollbar = function measureScrollbar() {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (supportsTouch) {
    return 0;
  }
  var scrollDiv = document.createElement('div');
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

/**
 * Inject a string of CSS into the page header
 *
 * @param {String} css
 */
var injectCSS = function injectCSS() {
  var css = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
};

injectCSS(styles);

return sweetAlert;

})));
if (typeof window !== 'undefined' && window.Sweetalert2) window.sweetAlert = window.swal = window.Sweetalert2;
