var WeixinApi = function() {
    "use strict";

    function e(e, t) {
        t = t || {};
        var n = function(e) {
            WeixinJSBridge.invoke("shareTimeline", {
                appid: e.appId ? e.appId : "",
                img_url: e.imgUrl,
                link: e.link,
                desc: e.title,
                title: e.desc,
                img_width: "120",
                img_height: "120"
            }, function(e) {
                switch (e.err_msg) {
                    case "share_timeline:cancel":
                        t.cancel && t.cancel(e);
                        break;
                    case "share_timeline:fail":
                        t.fail && t.fail(e);
                        break;
                    case "share_timeline:confirm":
                    case "share_timeline:ok":
                        t.confirm && t.confirm(e)
                }
                t.all && t.all(e)
            })
        };
        WeixinJSBridge.on("menu:share:timeline", function(r) {
            t.async && t.ready ? (window._wx_loadedCb_ = t.dataLoaded || new Function, window._wx_loadedCb_.toString().indexOf(
                "_wx_loadedCb_") > 0 && (window._wx_loadedCb_ = new Function), t.dataLoaded = function(e) {
                window._wx_loadedCb_(e), n(e)
            }, t.ready && t.ready(r)) : (t.ready && t.ready(r), n(e))
        })
    }

    function t(e, t) {
        t = t || {};
        var n = function(e) {
            WeixinJSBridge.invoke("sendAppMessage", {
                appid: e.appId ? e.appId : "",
                img_url: e.imgUrl,
                link: e.link,
                desc: e.desc,
                title: e.title,
                img_width: "120",
                img_height: "120"
            }, function(e) {
                switch (e.err_msg) {
                    case "send_app_msg:cancel":
                        t.cancel && t.cancel(e);
                        break;
                    case "send_app_msg:fail":
                        t.fail && t.fail(e);
                        break;
                    case "send_app_msg:confirm":
                    case "send_app_msg:ok":
                        t.confirm && t.confirm(e)
                }
                t.all && t.all(e)
            })
        };
        WeixinJSBridge.on("menu:share:appmessage", function(r) {
            t.async && t.ready ? (window._wx_loadedCb_ = t.dataLoaded || new Function, window._wx_loadedCb_.toString().indexOf(
                "_wx_loadedCb_") > 0 && (window._wx_loadedCb_ = new Function), t.dataLoaded = function(e) {
                window._wx_loadedCb_(e), n(e)
            }, t.ready && t.ready(r)) : (t.ready && t.ready(r), n(e))
        })
    }

    function n(e, t) {
        t = t || {};
        var n = function(e) {
            WeixinJSBridge.invoke("shareWeibo", {
                content: e.desc,
                url: e.link
            }, function(e) {
                switch (e.err_msg) {
                    case "share_weibo:cancel":
                        t.cancel && t.cancel(e);
                        break;
                    case "share_weibo:fail":
                        t.fail && t.fail(e);
                        break;
                    case "share_weibo:confirm":
                    case "share_weibo:ok":
                        t.confirm && t.confirm(e)
                }
                t.all && t.all(e)
            })
        };
        WeixinJSBridge.on("menu:share:weibo", function(r) {
            t.async && t.ready ? (window._wx_loadedCb_ = t.dataLoaded || new Function, window._wx_loadedCb_.toString().indexOf(
                "_wx_loadedCb_") > 0 && (window._wx_loadedCb_ = new Function), t.dataLoaded = function(e) {
                window._wx_loadedCb_(e), n(e)
            }, t.ready && t.ready(r)) : (t.ready && t.ready(r), n(e))
        })
    }

    function r(e, t) {
        if (!e || !t || t.length == 0) return;
        WeixinJSBridge.invoke("imagePreview", {
            current: e,
            urls: t
        })
    }

    function i() {
        WeixinJSBridge.call("showOptionMenu")
    }

    function s() {
        WeixinJSBridge.call("hideOptionMenu")
    }

    function o() {
        WeixinJSBridge.call("showToolbar")
    }

    function u() {
        WeixinJSBridge.call("hideToolbar")
    }

    function a(e) {
        e && typeof e == "function" && WeixinJSBridge.invoke("getNetworkType", {}, function(t) {
            e(t.err_msg)
        })
    }

    function f() {
        WeixinJSBridge.call("closeWindow")
    }

    function l(e) {
        if (e && typeof e == "function") {
            var t = this,
                n = function() {
                    e(t)
                };
            typeof window.WeixinJSBridge == "undefined" ? document.addEventListener ? document.addEventListener(
                "WeixinJSBridgeReady", n, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", n),
                document.attachEvent("onWeixinJSBridgeReady", n)) : n()
        }
    }
    return {
        version: "1.8",
        ready: l,
        shareToTimeline: e,
        shareToWeibo: n,
        shareToFriend: t,
        showOptionMenu: i,
        hideOptionMenu: s,
        showToolbar: o,
        hideToolbar: u,
        getNetworkType: a,
        imagePreview: r,
        closeWindow: f
    }
}();