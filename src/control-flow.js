!function (JTML) {
    JTML.compiler.$compiler(function If(tag) {
        let conditional = eval(tag.attr("conditional"));
        console.log(conditional);
        if (conditional) {
            JTML.compile(tag);
        } else {
            tag.children().css("display", "none");
        }
    }, "if", false, false);
}(JTML);