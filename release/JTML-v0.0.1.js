

// index.js

"use strict";

var JTML = {};
var global = globalThis;

!function (JTML) {
    JTML.DOMAIN = $("body:first");
    JTML.compileNow = true;
    JTML.compiler = {};
    JTML.compiler.$compiler = function (fun) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fun.name;
        var hide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        JTML.compiler[name] = fun;
        JTML.compiler[name].hide = hide;
    };
    JTML.compiler.$compiler(function set(tag) {
        var tags = tag.children();
        var tokenName = "",
            value = null;
        var gotName = false,
            gotValue = false;
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].localName == "token") {
                tokenName = $(tags[i]).text();
                gotName = true;
                if (gotValue) {
                    var tokens = tokenName.split(".");
                    var tmp = global;
                    for (var _i = 0; _i < tokens.length - 1; _i++) {
                        tmp = tmp[tokens[_i]];
                    }
                    tmp[tokens[tokens.length - 1]] = value;
                    gotValue = false;
                    gotName = false;
                }
            }
            if (tags[i].localName == "value") {
                value = eval($(tags[i]).text());
                gotValue = true;
                if (gotName) {
                    var _tokens = tokenName.split(".");
                    var _tmp = global;
                    for (var _i2 = 0; _i2 < _tokens.length - 1; _i2++) {
                        _tmp = _tmp[_tokens[_i2]];
                    }
                    _tmp[_tokens[_tokens.length - 1]] = value;
                    gotValue = false;
                    gotName = false;
                }
            }
        }
        return value;
    }, "set");
    JTML.compiler.$compiler(function value(tag) {
        var v = global[tag.text()];
        tag.text(v);
        return v;
    }, "value", false);

    JTML.compile = function () {
        var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : JTML.DOMAIN;

        var tags = domain.children();
        for (var i = 0; i < tags.length; i++) {
            var compiler = JTML.compiler[tags[i].localName];
            if (compiler) {
                // 存在这个jtml转义器
                var tagJq = $(tags[i]);
                if (compiler.hide) tagJq.css("display", "none");
                compiler(tagJq);
            }
        }
    };
}(JTML);

$(document).ready(function () {
    if (JTML.compileNow) JTML.compile();
});
//# sourceMappingURL=index.js.map
