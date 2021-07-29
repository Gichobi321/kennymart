! function(t, i, s) { "use strict"; var e, n = t.document,
        o = t.Modernizr,
        r = function(t) { return t.charAt(0).toUpperCase() + t.slice(1) },
        a = "Moz Webkit O Ms".split(" "),
        h = function(t) { var i, s = n.documentElement.style; if ("string" == typeof s[t]) return t;
            t = r(t); for (var e = 0, o = a.length; o > e; e++)
                if (i = a[e] + t, "string" == typeof s[i]) return i },
        l = h("transform"),
        u = h("transitionProperty"),
        c = { csstransforms: function() { return !!l }, csstransforms3d: function() { var t = !!h("perspective"); if (t) { var s = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
                        e = "@media (" + s.join("transform-3d),(") + "modernizr)",
                        n = i("<style>" + e + "{#modernizr{height:3px}}</style>").appendTo("head"),
                        o = i('<div id="modernizr" />').appendTo("html");
                    t = 3 === o.height(), o.remove(), n.remove() } return t }, csstransitions: function() { return !!u } }; if (o)
        for (e in c) o.hasOwnProperty(e) || o.addTest(e, c[e]);
    else { o = t.Modernizr = { _version: "1.6ish: miniModernizr for Isotope" }; var d, f = " "; for (e in c) d = c[e](), o[e] = d, f += " " + (d ? "" : "no-") + e;
        i("html").addClass(f) } if (o.csstransforms) { var m = o.csstransforms3d ? { translate: function(t) { return "translate3d(" + t[0] + "px, " + t[1] + "px, 0) " }, scale: function(t) { return "scale3d(" + t + ", " + t + ", 1) " } } : { translate: function(t) { return "translate(" + t[0] + "px, " + t[1] + "px) " }, scale: function(t) { return "scale(" + t + ") " } },
            p = function(t, s, e) { var n, o, r = i.data(t, "isoTransform") || {},
                    a = {},
                    h = {};
                a[s] = e, i.extend(r, a); for (n in r) o = r[n], h[n] = m[n](o); var u = h.translate || "",
                    c = h.scale || "",
                    d = u + c;
                i.data(t, "isoTransform", r), t.style[l] = d };
        i.cssNumber.scale = !0, i.cssHooks.scale = { set: function(t, i) { p(t, "scale", i) }, get: function(t, s) { var e = i.data(t, "isoTransform"); return e && e.scale ? e.scale : 1 } }, i.fx.step.scale = function(t) { i.cssHooks.scale.set(t.elem, t.now + t.unit) }, i.cssNumber.translate = !0, i.cssHooks.translate = { set: function(t, i) { p(t, "translate", i) }, get: function(t, s) { var e = i.data(t, "isoTransform"); return e && e.translate ? e.translate : [0, 0] } } } var y, g;
    o.csstransitions && (y = { WebkitTransitionProperty: "webkitTransitionEnd", MozTransitionProperty: "transitionend", OTransitionProperty: "oTransitionEnd otransitionend", transitionProperty: "transitionend" }[u], g = h("transitionDuration")); var v, _ = i.event,
        A = i.event.handle ? "handle" : "dispatch";
    _.special.smartresize = { setup: function() { i(this).bind("resize", _.special.smartresize.handler) }, teardown: function() { i(this).unbind("resize", _.special.smartresize.handler) }, handler: function(t, i) { var s = this,
                e = arguments;
            t.type = "smartresize", v && clearTimeout(v), v = setTimeout(function() { _[A].apply(s, e) }, "execAsap" === i ? 0 : 100) } }, i.fn.smartresize = function(t) { return t ? this.bind("smartresize", t) : this.trigger("smartresize", ["execAsap"]) }, i.Isotope = function(t, s, e) { this.element = i(s), this._create(t), this._init(e) }; var w = ["width", "height"],
        C = i(t);
    i.Isotope.settings = { resizable: !0, layoutMode: "masonry", containerClass: "isotope", itemClass: "isotope-item", hiddenClass: "isotope-hidden", hiddenStyle: { opacity: 0, scale: .001 }, visibleStyle: { opacity: 1, scale: 1 }, containerStyle: { position: "relative", overflow: "hidden" }, animationEngine: "best-available", animationOptions: { queue: !1, duration: 800 }, sortBy: "original-order", sortAscending: !0, resizesContainer: !0, transformsEnabled: !0, itemPositionDataEnabled: !1 }, i.Isotope.prototype = { _create: function(t) { this.options = i.extend({}, i.Isotope.settings, t), this.styleQueue = [], this.elemCount = 0; var s = this.element[0].style;
            this.originalStyle = {}; var e = w.slice(0); for (var n in this.options.containerStyle) e.push(n); for (var o = 0, r = e.length; r > o; o++) n = e[o], this.originalStyle[n] = s[n] || "";
            this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms(); var a = { "original-order": function(t, i) { return i.elemCount++, i.elemCount }, random: function() { return Math.random() } };
            this.options.getSortData = i.extend(this.options.getSortData, a), this.reloadItems(), this.offset = { left: parseInt(this.element.css("padding-left") || 0, 10), top: parseInt(this.element.css("padding-top") || 0, 10) }; var h = this;
            setTimeout(function() { h.element.addClass(h.options.containerClass) }, 0), this.options.resizable && C.bind("smartresize.isotope", function() { h.resize() }), this.element.delegate("." + this.options.hiddenClass, "click", function() { return !1 }) }, _getAtoms: function(t) { var i = this.options.itemSelector,
                s = i ? t.filter(i).add(t.find(i)) : t,
                e = { position: "absolute" }; return s = s.filter(function(t, i) { return 1 === i.nodeType }), this.usingTransforms && (e.left = 0, e.top = 0), s.css(e).addClass(this.options.itemClass), this.updateSortData(s, !0), s }, _init: function(t) { this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(t) }, option: function(t) { if (i.isPlainObject(t)) { this.options = i.extend(!0, this.options, t); var s; for (var e in t) s = "_update" + r(e), this[s] && this[s]() } }, _updateAnimationEngine: function() { var t, i = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, ""); switch (i) {
                case "css":
                case "none":
                    t = !1; break;
                case "jquery":
                    t = !0; break;
                default:
                    t = !o.csstransitions }
            this.isUsingJQueryAnimation = t, this._updateUsingTransforms() }, _updateTransformsEnabled: function() { this._updateUsingTransforms() }, _updateUsingTransforms: function() { var t = this.usingTransforms = this.options.transformsEnabled && o.csstransforms && o.csstransitions && !this.isUsingJQueryAnimation;
            t || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = t ? this._translate : this._positionAbs }, _filter: function(t) { var i = "" === this.options.filter ? "*" : this.options.filter; if (!i) return t; var s = this.options.hiddenClass,
                e = "." + s,
                n = t.filter(e),
                o = n; if ("*" !== i) { o = n.filter(i); var r = t.not(e).not(i).addClass(s);
                this.styleQueue.push({ $el: r, style: this.options.hiddenStyle }) } return this.styleQueue.push({ $el: o, style: this.options.visibleStyle }), o.removeClass(s), t.filter(i) }, updateSortData: function(t, s) { var e, n, o = this,
                r = this.options.getSortData;
            t.each(function() { e = i(this), n = {}; for (var t in r) s || "original-order" !== t ? n[t] = r[t](e, o) : n[t] = i.data(this, "isotope-sort-data")[t];
                i.data(this, "isotope-sort-data", n) }) }, _sort: function() { var t = this.options.sortBy,
                i = this._getSorter,
                s = this.options.sortAscending ? 1 : -1,
                e = function(e, n) { var o = i(e, t),
                        r = i(n, t); return o === r && "original-order" !== t && (o = i(e, "original-order"), r = i(n, "original-order")), (o > r ? 1 : r > o ? -1 : 0) * s };
            this.$filteredAtoms.sort(e) }, _getSorter: function(t, s) { return i.data(t, "isotope-sort-data")[s] }, _translate: function(t, i) { return { translate: [t, i] } }, _positionAbs: function(t, i) { return { left: t, top: i } }, _pushPosition: function(t, i, s) { i = Math.round(i + this.offset.left), s = Math.round(s + this.offset.top); var e = this.getPositionStyles(i, s);
            this.styleQueue.push({ $el: t, style: e }), this.options.itemPositionDataEnabled && t.data("isotope-item-position", { x: i, y: s }) }, layout: function(t, i) { var s = this.options.layoutMode; if (this["_" + s + "Layout"](t), this.options.resizesContainer) { var e = this["_" + s + "GetContainerSize"]();
                this.styleQueue.push({ $el: this.element, style: e }) }
            this._processStyleQueue(t, i), this.isLaidOut = !0 }, _processStyleQueue: function(t, s) { var e, n, r, a, h = this.isLaidOut && this.isUsingJQueryAnimation ? "animate" : "css",
                l = this.options.animationOptions,
                u = this.options.onLayout; if (n = function(t, i) { i.$el[h](i.style, l) }, this._isInserting && this.isUsingJQueryAnimation) n = function(t, i) { e = i.$el.hasClass("no-transition") ? "css" : h, i.$el[e](i.style, l) };
            else if (s || u || l.complete) { var c = !1,
                    d = [s, u, l.complete],
                    f = this; if (r = !0, a = function() { if (!c) { for (var i, s = 0, e = d.length; e > s; s++) i = d[s], "function" == typeof i && i.call(f.element, t, f);
                            c = !0 } }, this.isUsingJQueryAnimation && "animate" === h) l.complete = a, r = !1;
                else if (o.csstransitions) { for (var m, p = 0, v = this.styleQueue[0], _ = v && v.$el; !_ || !_.length;) { if (m = this.styleQueue[p++], !m) return;
                        _ = m.$el } var A = parseFloat(getComputedStyle(_[0])[g]);
                    A > 0 && (n = function(t, i) { i.$el[h](i.style, l).one(y, a) }, r = !1) } }
            i.each(this.styleQueue, n), r && a(), this.styleQueue = [] }, resize: function() { this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout() }, reLayout: function(t) { this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, t) }, addItems: function(t, i) { var s = this._getAtoms(t);
            this.$allAtoms = this.$allAtoms.add(s), i && i(s) }, insert: function(t, i) { this.element.append(t); var s = this;
            this.addItems(t, function(t) { var e = s._filter(t);
                s._addHideAppended(e), s._sort(), s.reLayout(), s._revealAppended(e, i) }) }, appended: function(t, i) { var s = this;
            this.addItems(t, function(t) { s._addHideAppended(t), s.layout(t), s._revealAppended(t, i) }) }, _addHideAppended: function(t) { this.$filteredAtoms = this.$filteredAtoms.add(t), t.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({ $el: t, style: this.options.hiddenStyle }) }, _revealAppended: function(t, i) { var s = this;
            setTimeout(function() { t.removeClass("no-transition"), s.styleQueue.push({ $el: t, style: s.options.visibleStyle }), s._isInserting = !1, s._processStyleQueue(t, i) }, 10) }, reloadItems: function() { this.$allAtoms = this._getAtoms(this.element.children()) }, remove: function(t, i) { this.$allAtoms = this.$allAtoms.not(t), this.$filteredAtoms = this.$filteredAtoms.not(t); var s = this,
                e = function() { t.remove(), i && i.call(s.element) };
            t.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({ $el: t, style: this.options.hiddenStyle }), this._sort(), this.reLayout(e)) : e() }, shuffle: function(t) { this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(t) }, destroy: function() { var t = this.usingTransforms,
                i = this.options;
            this.$allAtoms.removeClass(i.hiddenClass + " " + i.itemClass).each(function() { var i = this.style;
                i.position = "", i.top = "", i.left = "", i.opacity = "", t && (i[l] = "") }); var s = this.element[0].style; for (var e in this.originalStyle) s[e] = this.originalStyle[e];
            this.element.unbind(".isotope").undelegate("." + i.hiddenClass, "click").removeClass(i.containerClass).removeData("isotope"), C.unbind(".isotope") }, _getSegments: function(t) { var i, s = this.options.layoutMode,
                e = t ? "rowHeight" : "columnWidth",
                n = t ? "height" : "width",
                o = t ? "rows" : "cols",
                a = this.element[n](),
                h = this.options[s] && this.options[s][e] || this.$filteredAtoms["outer" + r(n)](!0) || a;
            i = Math.floor(a / h), i = Math.max(i, 1), this[s][o] = i, this[s][e] = h }, _checkIfSegmentsChanged: function(t) { var i = this.options.layoutMode,
                s = t ? "rows" : "cols",
                e = this[i][s]; return this._getSegments(t), this[i][s] !== e }, _masonryReset: function() { this.masonry = {}, this._getSegments(); var t = this.masonry.cols; for (this.masonry.colYs = []; t--;) this.masonry.colYs.push(0) }, _masonryLayout: function(t) { var s = this,
                e = s.masonry;
            t.each(function() { var t = i(this),
                    n = Math.ceil(t.outerWidth(!0) / e.columnWidth); if (n = Math.min(n, e.cols), 1 === n) s._masonryPlaceBrick(t, e.colYs);
                else { var o, r, a = e.cols + 1 - n,
                        h = []; for (r = 0; a > r; r++) o = e.colYs.slice(r, r + n), h[r] = Math.max.apply(Math, o);
                    s._masonryPlaceBrick(t, h) } }) }, _masonryPlaceBrick: function(t, i) { for (var s = Math.min.apply(Math, i), e = 0, n = 0, o = i.length; o > n; n++)
                if (i[n] === s) { e = n; break }
            var r = this.masonry.columnWidth * e,
                a = s;
            this._pushPosition(t, r, a); var h = s + t.outerHeight(!0),
                l = this.masonry.cols + 1 - o; for (n = 0; l > n; n++) this.masonry.colYs[e + n] = h }, _masonryGetContainerSize: function() { var t = Math.max.apply(Math, this.masonry.colYs); return { height: t } }, _masonryResizeChanged: function() { return this._checkIfSegmentsChanged() }, _fitRowsReset: function() { this.fitRows = { x: 0, y: 0, height: 0 } }, _fitRowsLayout: function(t) { var s = this,
                e = this.element.width(),
                n = this.fitRows;
            t.each(function() { var t = i(this),
                    o = t.outerWidth(!0),
                    r = t.outerHeight(!0);
                0 !== n.x && o + n.x > e && (n.x = 0, n.y = n.height), s._pushPosition(t, n.x, n.y), n.height = Math.max(n.y + r, n.height), n.x += o }) }, _fitRowsGetContainerSize: function() { return { height: this.fitRows.height } }, _fitRowsResizeChanged: function() { return !0 }, _cellsByRowReset: function() { this.cellsByRow = { index: 0 }, this._getSegments(), this._getSegments(!0) }, _cellsByRowLayout: function(t) { var s = this,
                e = this.cellsByRow;
            t.each(function() { var t = i(this),
                    n = e.index % e.cols,
                    o = Math.floor(e.index / e.cols),
                    r = (n + .5) * e.columnWidth - t.outerWidth(!0) / 2,
                    a = (o + .5) * e.rowHeight - t.outerHeight(!0) / 2;
                s._pushPosition(t, r, a), e.index++ }) }, _cellsByRowGetContainerSize: function() { return { height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top } }, _cellsByRowResizeChanged: function() { return this._checkIfSegmentsChanged() }, _straightDownReset: function() { this.straightDown = { y: 0 } }, _straightDownLayout: function(t) { var s = this;
            t.each(function(t) { var e = i(this);
                s._pushPosition(e, 0, s.straightDown.y), s.straightDown.y += e.outerHeight(!0) }) }, _straightDownGetContainerSize: function() { return { height: this.straightDown.y } }, _straightDownResizeChanged: function() { return !0 }, _masonryHorizontalReset: function() { this.masonryHorizontal = {}, this._getSegments(!0); var t = this.masonryHorizontal.rows; for (this.masonryHorizontal.rowXs = []; t--;) this.masonryHorizontal.rowXs.push(0) }, _masonryHorizontalLayout: function(t) { var s = this,
                e = s.masonryHorizontal;
            t.each(function() { var t = i(this),
                    n = Math.ceil(t.outerHeight(!0) / e.rowHeight); if (n = Math.min(n, e.rows), 1 === n) s._masonryHorizontalPlaceBrick(t, e.rowXs);
                else { var o, r, a = e.rows + 1 - n,
                        h = []; for (r = 0; a > r; r++) o = e.rowXs.slice(r, r + n), h[r] = Math.max.apply(Math, o);
                    s._masonryHorizontalPlaceBrick(t, h) } }) }, _masonryHorizontalPlaceBrick: function(t, i) { for (var s = Math.min.apply(Math, i), e = 0, n = 0, o = i.length; o > n; n++)
                if (i[n] === s) { e = n; break }
            var r = s,
                a = this.masonryHorizontal.rowHeight * e;
            this._pushPosition(t, r, a); var h = s + t.outerWidth(!0),
                l = this.masonryHorizontal.rows + 1 - o; for (n = 0; l > n; n++) this.masonryHorizontal.rowXs[e + n] = h }, _masonryHorizontalGetContainerSize: function() { var t = Math.max.apply(Math, this.masonryHorizontal.rowXs); return { width: t } }, _masonryHorizontalResizeChanged: function() { return this._checkIfSegmentsChanged(!0) }, _fitColumnsReset: function() { this.fitColumns = { x: 0, y: 0, width: 0 } }, _fitColumnsLayout: function(t) { var s = this,
                e = this.element.height(),
                n = this.fitColumns;
            t.each(function() { var t = i(this),
                    o = t.outerWidth(!0),
                    r = t.outerHeight(!0);
                0 !== n.y && r + n.y > e && (n.x = n.width, n.y = 0), s._pushPosition(t, n.x, n.y), n.width = Math.max(n.x + o, n.width), n.y += r }) }, _fitColumnsGetContainerSize: function() { return { width: this.fitColumns.width } }, _fitColumnsResizeChanged: function() { return !0 }, _cellsByColumnReset: function() { this.cellsByColumn = { index: 0 }, this._getSegments(), this._getSegments(!0) }, _cellsByColumnLayout: function(t) { var s = this,
                e = this.cellsByColumn;
            t.each(function() { var t = i(this),
                    n = Math.floor(e.index / e.rows),
                    o = e.index % e.rows,
                    r = (n + .5) * e.columnWidth - t.outerWidth(!0) / 2,
                    a = (o + .5) * e.rowHeight - t.outerHeight(!0) / 2;
                s._pushPosition(t, r, a), e.index++ }) }, _cellsByColumnGetContainerSize: function() { return { width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth } }, _cellsByColumnResizeChanged: function() { return this._checkIfSegmentsChanged(!0) }, _straightAcrossReset: function() { this.straightAcross = { x: 0 } }, _straightAcrossLayout: function(t) { var s = this;
            t.each(function(t) { var e = i(this);
                s._pushPosition(e, s.straightAcross.x, 0), s.straightAcross.x += e.outerWidth(!0) }) }, _straightAcrossGetContainerSize: function() { return { width: this.straightAcross.x } }, _straightAcrossResizeChanged: function() { return !0 } }, i.fn.imagesLoaded = function(t) {
        function s() { t.call(n, o) }

        function e(t) { var n = t.target;
            n.src !== a && -1 === i.inArray(n, h) && (h.push(n), --r <= 0 && (setTimeout(s), o.unbind(".imagesLoaded", e))) } var n = this,
            o = n.find("img").add(n.filter("img")),
            r = o.length,
            a = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
            h = []; return r || s(), o.bind("load.imagesLoaded error.imagesLoaded", e).each(function() { var t = this.src;
            this.src = a, this.src = t }), n }; var z = function(i) { t.console && t.console.error(i) };
    i.fn.isotope = function(t, s) { if ("string" == typeof t) { var e = Array.prototype.slice.call(arguments, 1);
            this.each(function() { var s = i.data(this, "isotope"); return s ? i.isFunction(s[t]) && "_" !== t.charAt(0) ? void s[t].apply(s, e) : void z("no such method '" + t + "' for isotope instance") : void z("cannot call methods on isotope prior to initialization; attempted to call method '" + t + "'") }) } else this.each(function() { var e = i.data(this, "isotope");
            e ? (e.option(t), e._init(s)) : i.data(this, "isotope", new i.Isotope(t, this, s)) }); return this } }(window, jQuery);

/*!
 * IMAGESLOAD
 */
(function() {
    function e() {}

    function t(e, t) { for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1 }

    function n(e) { return function() { return this[e].apply(this, arguments) } } var i = e.prototype,
        r = this,
        o = r.EventEmitter;
    i.getListeners = function(e) { var t, n, i = this._getEvents(); if ("object" == typeof e) { t = {}; for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]) } else t = i[e] || (i[e] = []); return t }, i.flattenListeners = function(e) { var t, n = []; for (t = 0; t < e.length; t += 1) n.push(e[t].listener); return n }, i.getListenersAsObject = function(e) { var t, n = this.getListeners(e); return n instanceof Array && (t = {}, t[e] = n), t || n }, i.addListener = function(e, n) { var i, r = this.getListenersAsObject(e),
            o = "object" == typeof n; for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : { listener: n, once: !1 }); return this }, i.on = n("addListener"), i.addOnceListener = function(e, t) { return this.addListener(e, { listener: t, once: !0 }) }, i.once = n("addOnceListener"), i.defineEvent = function(e) { return this.getListeners(e), this }, i.defineEvents = function(e) { for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]); return this }, i.removeListener = function(e, n) { var i, r, o = this.getListenersAsObject(e); for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1)); return this }, i.off = n("removeListener"), i.addListeners = function(e, t) { return this.manipulateListeners(!1, e, t) }, i.removeListeners = function(e, t) { return this.manipulateListeners(!0, e, t) }, i.manipulateListeners = function(e, t, n) { var i, r, o = e ? this.removeListener : this.addListener,
            s = e ? this.removeListeners : this.addListeners; if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r)); return this }, i.removeEvent = function(e) { var t, n = typeof e,
            i = this._getEvents(); if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events; return this }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) { var n, i, r, o, s = this.getListenersAsObject(e); for (r in s)
            if (s.hasOwnProperty(r))
                for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this }, i.trigger = n("emitEvent"), i.emit = function(e) { var t = Array.prototype.slice.call(arguments, 1); return this.emitEvent(e, t) }, i.setOnceReturnValue = function(e) { return this._onceReturnValue = e, this }, i._getOnceReturnValue = function() { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, i._getEvents = function() { return this._events || (this._events = {}) }, e.noConflict = function() { return r.EventEmitter = o, e }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() { return e }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e }).call(this),
    function(e) {
        function t(t) { var n = e.event; return n.target = n.target || n.srcElement || t, n } var n = document.documentElement,
            i = function() {};
        n.addEventListener ? i = function(e, t, n) { e.addEventListener(t, n, !1) } : n.attachEvent && (i = function(e, n, i) { e[n + i] = i.handleEvent ? function() { var n = t(e);
                i.handleEvent.call(i, n) } : function() { var n = t(e);
                i.call(e, n) }, e.attachEvent("on" + n, e[n + i]) }); var r = function() {};
        n.removeEventListener ? r = function(e, t, n) { e.removeEventListener(t, n, !1) } : n.detachEvent && (r = function(e, t, n) { e.detachEvent("on" + t, e[t + n]); try { delete e[t + n] } catch (i) { e[t + n] = void 0 } }); var o = { bind: i, unbind: r }; "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o }(this),
    function(e, t) { "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) { return t(e, n, i) }) : "object" == typeof exports || (e.imagesLoaded = t(e, e.EventEmitter, e.eventie)) }(window, function(e, t, n) {
        function i(e, t) { for (var n in t) e[n] = t[n]; return e }

        function r(e) { return "[object Array]" === d.call(e) }

        function o(e) { var t = []; if (r(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
            else t.push(e); return t }

        function s(e, t, n) { if (!(this instanceof s)) return new s(e, t); "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred); var r = this;
            setTimeout(function() { r.check() }) }

        function f(e) { this.img = e }

        function c(e) { this.src = e, v[e] = this } var a = e.jQuery,
            h = e.console,
            u = "undefined" != typeof h,
            d = Object.prototype.toString;
        s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function() { this.images = []; for (var e = 0, t = this.elements.length; t > e; e++) { var n = this.elements[e]; "IMG" === n.nodeName && this.addImage(n); var i = n.nodeType; if (i && (1 === i || 9 === i || 11 === i))
                    for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) { var f = r[o];
                        this.addImage(f) } } }, s.prototype.addImage = function(e) { var t = new f(e);
            this.images.push(t) }, s.prototype.check = function() {
            function e(e, r) { return t.options.debug && u && h.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0 } var t = this,
                n = 0,
                i = this.images.length; if (this.hasAnyBroken = !1, !i) return void this.complete(); for (var r = 0; i > r; r++) { var o = this.images[r];
                o.on("confirm", e), o.check() } }, s.prototype.progress = function(e) { this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded; var t = this;
            setTimeout(function() { t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e) }) }, s.prototype.complete = function() { var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0; var t = this;
            setTimeout(function() { if (t.emit(e, t), t.emit("always", t), t.jqDeferred) { var n = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[n](t) } }) }, a && (a.fn.imagesLoaded = function(e, t) { var n = new s(this, e, t); return n.jqDeferred.promise(a(this)) }), f.prototype = new t, f.prototype.check = function() { var e = v[this.img.src] || new c(this.img.src); if (e.isConfirmed) return void this.confirm(e.isLoaded, "cached was confirmed"); if (this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth"); var t = this;
            e.on("confirm", function(e, n) { return t.confirm(e.isLoaded, n), !0 }), e.check() }, f.prototype.confirm = function(e, t) { this.isLoaded = e, this.emit("confirm", this, t) }; var v = {}; return c.prototype = new t, c.prototype.check = function() { if (!this.isChecked) { var e = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0 } }, c.prototype.handleEvent = function(e) { var t = "on" + e.type;
            this[t] && this[t](e) }, c.prototype.onload = function(e) { this.confirm(!0, "onload"), this.unbindProxyEvents(e) }, c.prototype.onerror = function(e) { this.confirm(!1, "onerror"), this.unbindProxyEvents(e) }, c.prototype.confirm = function(e, t) { this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t) }, c.prototype.unbindProxyEvents = function(e) { n.unbind(e.target, "load", this), n.unbind(e.target, "error", this) }, s });

/* ----------------------------------------------------

    File Name: three-col-masonry.js
    Template Name: Linda
    Created By: HTML.Design
    http://themeforest.net/user/wpdestek

    MASONRY PLUGIN

------------------------------------------------------- */

(function($) {
    var $container = $('.portfolio'),
        colWidth = function() {
            var w = $container.width(),
                columnNum = 1,
                columnWidth = 50;
            if (w > 1200) {
                columnNum = 3;
            } else if (w > 900) {
                columnNum = 3;
            } else if (w > 800) {
                columnNum = 2;
            } else if (w > 560) {
                columnNum = 2;
            } else if (w > 300) {
                columnNum = 1;
            }
            columnWidth = Math.floor(w / columnNum);
            $container.find('.pitem').each(function() {
                var $item = $(this),
                    multiplier_w = $item.attr('class').match(/item-w(\d)/),
                    multiplier_h = $item.attr('class').match(/item-h(\d)/),
                    width = multiplier_w ? columnWidth * multiplier_w[1] - 0 : columnWidth - 5,
                    height = multiplier_h ? columnWidth * multiplier_h[1] * 1 - 5 : columnWidth * 0.5 - 5;
                $item.css({
                    width: width,
                    height: height
                });
            });
            return columnWidth;
        }

    function refreshWaypoints() {
        setTimeout(function() {}, 3000);
    }
    $('nav.portfolio-filter ul a').on('click', function() {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        }, refreshWaypoints());
        $('nav.portfolio-filter ul a').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    function setPortfolio() {
        setColumns();
        $container.isotope('reLayout');
    }
    $container.imagesLoaded(function() {
        $container.isotope();
    });
    isotope = function() {
        $container.isotope({
            resizable: true,
            itemSelector: '.pitem',
            layoutMode: 'masonry',
            gutter: 10,
            masonry: {
                columnWidth: colWidth(),
                gutterWidth: 0
            }
        });
    };
    isotope();
    $(window).smartresize(isotope);
}(jQuery));