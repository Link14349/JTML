"use strict";

/*!

 * JTML Library

 * yhzheng - v0.0.1

 * https://github.com/qianduanXIAOHAOZI/JTML | Released under MIT license

 */

var JTML = {};
var global = globalThis;

!function (JTML) {
    JTML.DOMAIN = $(null);
    JTML.compileNow = true;
    JTML.compiler = {};

    JTML.each = function (tag, cb) {
        var tags = tag.children();
        for (var i = 0; i < tags.length; i++) {
            if (!cb(tags[i])) JTML.each($(tags[i]), cb);
        }
    };

    JTML.compiler.$compiler = function (fun) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fun.name;
        var hide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var recursion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        JTML.compiler[name] = fun;
        JTML.compiler[name].hide = hide;
        JTML.compiler[name].recursion = recursion;
    };
    JTML.compiler.$compiler(function set(tag) {
        var tags = tag.children();
        var tokenName = "",
            value = null;
        var gotName = false,
            gotValue = false;
        var i = void 0;
        function set() {
            var tokens = tokenName.split(".");
            var tmp = global;
            for (var _i = 0; _i < tokens.length - 1; _i++) {
                tmp = tmp[tokens[_i]];
            }
            tmp[tokens[tokens.length - 1]] = value;
            gotValue = false;
            gotName = false;
        }
        for (i = 0; i < tags.length; i++) {
            if (tags[i].localName == "token") {
                tokenName = $(tags[i]).text();
                gotName = true;
                if (gotValue) {
                    set();
                }
            }
            if (tags[i].localName == "value") {
                var t = $(tags[i]).text();
                value = eval(t);
                gotValue = true;
                if (gotName) {
                    set();
                }
            }
        }
        return value;
    }, "set", true, false);
    JTML.compiler.$compiler(function show(tag) {
        var v = void 0;
        try {
            var t = tag.text();
            v = eval(t);
        } catch (e) {
            console.error(new Error("Show expression error"));
            console.error(e);
            return null;
        }
        tag.text(v);
        return v;
    }, "show", false, false);

    JTML.compile = function () {
        var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : JTML.DOMAIN;

        JTML.each(domain, function (tag) {
            var compiler = JTML.compiler[tag.localName];
            if (compiler) {
                // 存在这个jtml转义器
                var tagJq = $(tag);
                if (compiler.hide) tagJq.css("display", "none");
                compiler(tagJq);
                return compiler.recursion;
            }
        });
    };
}(JTML);

$(document).ready(function () {
    JTML.DOMAIN = $("body:first");

    if (JTML.compileNow) JTML.compile(); // 编译domain内容

    // 编译所有jtml标签包裹的内容
    var jtml = $("jtml");
    for (var i = 0; i < jtml.length; i++) {
        JTML.compile($(jtml[i]));
    }
});
//# sourceMappingURL=index.js.map