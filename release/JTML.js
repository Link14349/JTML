

// index.js

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
    JTML.compiler.$compilerDefine = function (name, attr, val) {
        JTML.compiler[name][attr] = val;
    };
    JTML.compiler.$ignoreDict = {};
    JTML.compiler.$ignore = function (tagName) {
        JTML.compiler.$ignoreDict[tagName] = true;
    };

    JTML.compile = function () {
        var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : JTML.DOMAIN;
        var compileSelf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        function tmp(tag) {
            var compiler = JTML.compiler[tag.localName];
            if (compiler) {
                // 存在这个jtml转义器
                var tagJq = $(tag);
                if (compiler.hide) tagJq.css("display", "none");
                compiler(tagJq);
                return compiler.recursion;
            }
        }
        if (compileSelf) {
            tmp(domain[0]);
            JTML.each(domain, tmp);
        } else {
            JTML.each(domain, tmp);
        }
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
