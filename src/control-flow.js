!function (JTML) {
    JTML.compiler.$ignore("if");
    JTML.compiler.$ignore("elif");
    JTML.compiler.$ignore("else");
    JTML.compiler.$compiler(function If(tag) {
        let conditional = eval(tag.attr("conditional"));
        if (conditional) {
            JTML.compile(tag);
            let next = tag.next();
            while (
                next.length > 0 &&
                (next[0].localName == "elif" || next[0].localName == "else")
                ) {
                next.css("display", "none");
                next = next.next();
            }
        } else {
            tag.children().css("display", "none");
            let next = tag.next();
            let finish = false;
            while (
                next.length > 0 &&
                (next[0].localName == "elif" || next[0].localName == "else")
                ) {
                if (next[0].localName == "else") {
                    // console.log(next, finish);
                    if (finish) {
                        next.css("display", "none");
                        next = next.next();
                        continue;
                    }
                    JTML.compile(next);
                    finish = true;
                }
                if (next[0].localName == "elif") {
                    if (finish) {
                        next.css("display", "none");
                        next = next.next();
                        continue;
                    }
                    let conditional = eval(next.attr("conditional"));
                    if (conditional) {
                        JTML.compile(next);
                        finish = true;
                    } else {
                        next.css("display", "none");
                    }
                }
                next = next.next();
            }
        }
        // console.log(tag.next());
    }, "if", false, false);
    JTML.compiler.$compilerDefine("if", "");

    // while loop
    JTML.compiler.$compiler(function While(tag) {
        let conditionalContent = tag.attr("conditional");
        let content = tag.html();
        tag.empty();
        while (eval(conditionalContent)) {
            // console.log(i);
            let n = String(content);
            let q = $(n);
            JTML.compile(q, true);
            tag.append(q);
            // res += content;
        }
    }, "while", false, false);

    // do...while loop
    JTML.compiler.$compiler(function DoWhile(tag) {
        let conditionalContent = tag.attr("conditional");
        let content = tag.html();
        tag.empty();
        do {
            // console.log(i);
            let n = String(content);
            let q = $(n);
            JTML.compile(q, true);
            tag.append(q);
            // res += content;
        } while (eval(conditionalContent));
    }, "do", false, false);

    // for loop
    // for loop must be xx in xx format
    JTML.compiler.$compiler(function While(tag) {
        let conditionalContent = tag.attr("conditional");
        let content = tag.html();
        tag.empty();
        let tmp = conditionalContent.split("in");
        let tokenName = tmp[0].trim();
        let tokens = tokenName.split(".");
        let value = tmp[1];
        for (let i = 0; i < tokens.length; i++) {
            tokens[i] = tokens[i].trim();
        }
        let scope = global;
        for (let i = 0; i < tokens.length - 1; i++) scope = scope[tokens[i]];
    }, "while", false, false);
}(sword.JTML);