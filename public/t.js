!(function () {
  "use strict";
  var r = window.location,
    n = window.document,
    o = n.currentScript,
    p = o.getAttribute("data-api") || "https://p.liuzhen932.top/api/event";
  function l(t, e) {
    t && console.warn("Ignoring Event: " + t), e && e.callback && e.callback();
  }
  function t(t, e) {
    if (
      /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(r.hostname) ||
      "file:" === r.protocol
    )
      return l("localhost", e);
    if (
      (window._phantom ||
        window.__nightmare ||
        window.navigator.webdriver ||
        window.Cypress) &&
      !window.__plausible
    )
      return l(null, e);
    try {
      if ("true" === window.localStorage.plausible_ignore)
        return l("localStorage flag", e);
    } catch (t) {}
    var a = {},
      i =
        ((a.n = t),
        (a.u = r.href),
        (a.d = "liuzhen932.top",
        (a.r = n.referrer || null),
        e && e.meta && (a.m = JSON.stringify(e.meta)),
        e && e.props && (a.p = e.props),
        new XMLHttpRequest());
    i.open("POST", p, !0),
      i.setRequestHeader("Content-Type", "text/plain"),
      i.send(JSON.stringify(a)),
      (i.onreadystatechange = function () {
        4 === i.readyState &&
          e &&
          e.callback &&
          e.callback({ status: i.status });
      });
  }
  var e = (window.plausible && window.plausible.q) || [];
  window.plausible = t;
  for (var a, i = 0; i < e.length; i++) t.apply(this, e[i]);
  function s() {
    a !== r.pathname && ((a = r.pathname), t("pageview"));
  }
  var c,
    u = window.history;
  u.pushState &&
    ((c = u.pushState),
    (u.pushState = function () {
      c.apply(this, arguments), s();
    }),
    window.addEventListener("popstate", s)),
    "prerender" === n.visibilityState
      ? n.addEventListener("visibilitychange", function () {
          a || "visible" !== n.visibilityState || s();
        })
      : s();
  var d = 1;
  function f(t) {
    var e, a, i, n;
    if ("auxclick" !== t.type || t.button === d)
      return (
        (e = (function (t) {
          for (
            ;
            t &&
            (void 0 === t.tagName ||
              !(e = t) ||
              !e.tagName ||
              "a" !== e.tagName.toLowerCase() ||
              !t.href);

          )
            t = t.parentNode;
          var e;
          return t;
        })(t.target)),
        (a = e && e.href && e.href.split("?")[0]),
        (i = e) && i.href && i.host && i.host !== r.host
          ? w(t, e, { name: "Outbound Link: Click", props: { url: e.href } })
          : (i = a) &&
              ((n = i.split(".").pop()),
              h.some(function (t) {
                return t === n;
              }))
            ? w(t, e, { name: "File Download", props: { url: a } })
            : void 0
      );
  }
  function w(t, e, a) {
    var i,
      n = !1;
    function r() {
      n || ((n = !0), (window.location = e.href));
    }
    !(function (t, e) {
      if (!t.defaultPrevented)
        return (
          (e = !e.target || e.target.match(/^_(self|parent|top)$/i)),
          (t = !(t.ctrlKey || t.metaKey || t.shiftKey) && "click" === t.type),
          e && t
        );
    })(t, e)
      ? ((i = { props: a.props }), plausible(a.name, i))
      : ((i = { props: a.props, callback: r }),
        plausible(a.name, i),
        setTimeout(r, 5e3),
        t.preventDefault());
  }
  n.addEventListener("click", f), n.addEventListener("auxclick", f);
  var u = [
      "pdf",
      "xlsx",
      "docx",
      "txt",
      "rtf",
      "csv",
      "exe",
      "key",
      "pps",
      "ppt",
      "pptx",
      "7z",
      "pkg",
      "rar",
      "gz",
      "zip",
      "avi",
      "mov",
      "mp4",
      "mpeg",
      "wmv",
      "midi",
      "mp3",
      "wav",
      "wma",
      "dmg",
    ],
    v = o.getAttribute("file-types"),
    g = o.getAttribute("add-file-types"),
    h = (v && v.split(",")) || (g && g.split(",").concat(u)) || u;
})();
