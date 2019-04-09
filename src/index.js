const JTML = {};
const global = globalThis;

!function (JTML) {
    JTML.DOMAIN = $("body:first");
    JTML.compileNow = true;
    JTML.compiler = {};
    JTML.compiler.$compiler = function (fun, name = fun.name, hide = true) {
        JTML.compiler[name] = fun;
        JTML.compiler[name].hide = hide;
    };
    JTML.compiler.$compiler(function set(tag) {
        let tags = tag.children();
        let tokenName = "", value = null;
        let gotName = false, gotValue = false;
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].localName == "token") {
                tokenName = $(tags[i]).text();
                gotName = true;
                if (gotValue) {
                    let tokens = tokenName.split(".");
                    let tmp = global;
                    for (let i = 0; i < tokens.length - 1; i++) {
                        tmp = tmp[tokens[i]];
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
                    let tokens = tokenName.split(".");
                    let tmp = global;
                    for (let i = 0; i < tokens.length - 1; i++) {
                        tmp = tmp[tokens[i]];
                    }
                    tmp[tokens[tokens.length - 1]] = value;
                    gotValue = false;
                    gotName = false;
                }
            }
        }
        return value;
    }, "set");
    JTML.compiler.$compiler(function show(tag) {
        console.log(tag.text());
        let v = eval(tag.text());
        tag.text(v);
        return v;
    }, "show", false);

    JTML.each = function (tag, cb) {
        let tags = tag.children();
        for (let i = 0; i < tags.length; i++) {
            cb(tags[i]);
            JTML.each($(tags[i]), cb);
        }
    };
    JTML.compile = function (domain = JTML.DOMAIN) {
        JTML.each(domain, function (tag) {
            let compiler = JTML.compiler[tag.localName];
            if (compiler) {// 存在这个jtml转义器
                let tagJq = $(tag);
                if (compiler.hide) tagJq.css("display", "none");
                compiler(tagJq);
            }
        });
    };
}(JTML);

$(document).ready(function () {
    if (JTML.compileNow) JTML.compile();
});