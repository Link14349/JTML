/*!

 * JTML Library

 * yhzheng - v0.0.1

 * https://github.com/qianduanXIAOHAOZI/JTML | Released under MIT license

 */

const JTML = {};
const global = globalThis;

!function (JTML) {
    JTML.DOMAIN = $(null);
    JTML.compileNow = true;
    JTML.compiler = {};

    JTML.each = function (tag, cb) {
        let tags = tag.children();
        for (let i = 0; i < tags.length; i++) {
            if (!cb(tags[i])) JTML.each($(tags[i]), cb);
        }
    };

    JTML.compiler.$compiler = function (fun, name = fun.name, hide = true, recursion = true) {
        JTML.compiler[name] = fun;
        JTML.compiler[name].hide = hide;
        JTML.compiler[name].recursion = recursion;
    };
    JTML.compiler.$compiler(function set(tag) {
        let tags = tag.children();
        let tokenName = "", value = null;
        let gotName = false, gotValue = false;
        let i;
        function set() {
            let tokens = tokenName.split(".");
            let tmp = global;
            for (let i = 0; i < tokens.length - 1; i++) {
                tmp = tmp[tokens[i]];
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
                let t = $(tags[i]).text();
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
        let v;
        try {
            let t = tag.text();
            v = eval(t);
        } catch (e) {
            console.error(new Error("Show expression error"));
            console.error(e);
            return null;
        }
        tag.text(v);
        return v;
    }, "show", false, false);

    JTML.compile = function (domain = JTML.DOMAIN) {
        JTML.each(domain, function (tag) {
            let compiler = JTML.compiler[tag.localName];
            if (compiler) {// 存在这个jtml转义器
                let tagJq = $(tag);
                if (compiler.hide) tagJq.css("display", "none");
                compiler(tagJq);
                return compiler.recursion;
            }
        });
    };
}(JTML);

$(document).ready(function () {
    JTML.DOMAIN = $("body:first");

    if (JTML.compileNow) JTML.compile();// 编译domain内容

    // 编译所有jtml标签包裹的内容
    let jtml = $("jtml");
    for (let i = 0; i < jtml.length; i++) {
        JTML.compile($(jtml[i]));
    }
});