JTML Development API Documentation
====================================

## Interfaces

__Note that all of the following interfaces are in the JTML object__

| Name | Type | Description | Usage |
| --- | --- | ------------- | -------------- |
| DOMAIN | jQuery Object | Set the elements of JTML default parsing | `JTML.DOMAIN = $("html:first")` |
| compileNow | Boolean | Set whether JTML immediately parses elements in DOMAIN | `JTML.compileNow = true` |
| compiler | Object | All the tag compilation functions are in it (__private__) | / |
| each(tag, callback) | Function | Traversing all children of an element | `JTML.each($("html:first"), function (tag) { console.log(tag); })` |
| compiler.$compiler(method, name, hide, recursion) | Function | Add a tag compilation method | / |
| compiler.$compilerDefine(methodName, attr, value) | Function | Set a private property of a tag compilation method | / |
| compiler.$ignoreDict | Hash Map | Store all element tag names that are not compiled (__private__) | / |
| compiler.$ignore(tagName) | Function | Add an element tag name that is not compiled | `JTML.compiler.$ignore("a")` |
| compile(domain=JTML.DOMAIN, compileSelf=false) | Function | Compile the JTML code in domain (If compileSelf is true, then compile the domain itself) | `JTML.compile($("html:first"))` |
