/*!

 * JTML Library

 * yhzheng - v0.0.1

 * https://github.com/qianduanXIAOHAOZI/JTML | Released under MIT license

 */

const jQuery = require("./../dependencies/jquery-3.3.1.min.js");
const $ = jQuery;

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

    JTML.compile = function (domain = JTML.DOMAIN, compileSelf = false) {
        function tmp(tag) {
            let compiler = JTML.compiler[tag.localName];
            if (compiler) {// 存在这个jtml转义器
                let tagJq = $(tag);
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
    JTML.resetDomain = function () {
        JTML.DOMAIN = $("body:first");
    };
    JTML.updateCompile = function () {
        if (JTML.compileNow) JTML.compile();// 编译domain内容
        let jtml = $("jtml");
        for (let i = 0; i < jtml.length; i++) {
            JTML.compile($(jtml[i]));
        }
    };
    JTML.select = function (t) {
        this.DOMAIN = $(t);
    };

    sword.define("JTML", function (exports) {
        exports(JTML);
    });
}(JTML);

$(document).ready(function () {
    JTML.resetDomain();
    JTML.updateCompile();
});