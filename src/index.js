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
    JTML.compiler.$compilerDefine = function (name, attr, val) {
        JTML.compiler[name][attr] = val;
    };
    JTML.compiler.$ignoreDict = {};
    JTML.compiler.$ignore = function (tagName) {
        JTML.compiler.$ignoreDict[tagName] = true;
    };

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