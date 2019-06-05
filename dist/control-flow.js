"use strict";

!function (JTML) {
    JTML.compiler.$ignore("if");
    JTML.compiler.$ignore("elif");
    JTML.compiler.$ignore("else");
    JTML.compiler.$compiler(function If(tag) {
        var conditional = eval(tag.attr("conditional"));
        if (conditional) {
            JTML.compile(tag);
            var next = tag.next();
            while (next.length > 0 && (next[0].localName == "elif" || next[0].localName == "else")) {
                next.css("display", "none");
                next = next.next();
            }
        } else {
            tag.children().css("display", "none");
            var _next = tag.next();
            var finish = false;
            while (_next.length > 0 && (_next[0].localName == "elif" || _next[0].localName == "else")) {
                if (_next[0].localName == "else") {
                    // console.log(next, finish);
                    if (finish) {
                        _next.css("display", "none");
                        _next = _next.next();
                        continue;
                    }
                    JTML.compile(_next);
                    finish = true;
                }
                if (_next[0].localName == "elif") {
                    if (finish) {
                        _next.css("display", "none");
                        _next = _next.next();
                        continue;
                    }
                    var _conditional = eval(_next.attr("conditional"));
                    if (_conditional) {
                        JTML.compile(_next);
                        finish = true;
                    } else {
                        _next.css("display", "none");
                    }
                }
                _next = _next.next();
            }
        }
        // console.log(tag.next());
    }, "if", false, false);
    JTML.compiler.$compilerDefine("if", "");

    // while loop
    JTML.compiler.$compiler(function While(tag) {
        var conditionalContent = tag.attr("conditional");
        var content = tag.html();
        tag.empty();
        while (eval(conditionalContent)) {
            // console.log(i);
            var n = String(content);
            var q = $(n);
            JTML.compile(q, true);
            tag.append(q);
            // res += content;
        }
    }, "while", false, false);

    // do...while loop
    JTML.compiler.$compiler(function DoWhile(tag) {
        var conditionalContent = tag.attr("conditional");
        var content = tag.html();
        tag.empty();
        do {
            // console.log(i);
            var n = String(content);
            var q = $(n);
            JTML.compile(q, true);
            tag.append(q);
            // res += content;
        } while (eval(conditionalContent));
    }, "do", false, false);

    // for loop
    // for loop must be xx in xx format
    JTML.compiler.$compiler(function While(tag) {
        var conditionalContent = tag.attr("conditional");
        var content = tag.html();
        tag.empty();
        var tmp = conditionalContent.split("in");
        var tokenName = tmp[0].trim();
        var tokens = tokenName.split(".");
        var value = tmp[1];
        for (var i = 0; i < tokens.length; i++) {
            tokens[i] = tokens[i].trim();
        }
        var scope = global;
        for (var _i = 0; _i < tokens.length - 1; _i++) {
            scope = scope[tokens[_i]];
        }
    }, "while", false, false);
}(sword.JTML);
//# sourceMappingURL=control-flow.js.map