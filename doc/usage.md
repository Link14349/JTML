Usage
========

## dependencies
- jquery ([/dependencies/jquery-3.3.1.min.js](../dependencies/jquery-3.3.1.min.js))

## Import
Insert:
```html
<script type="text/javascript" src="dist/index.js"></script>
```

## Domain
JTML default domain is `$("body:first")`, you can change domain with `JTML.DOMAIN`.
JTML compiles JTML content in domain.
If you don't need to compile the content in the domain, you can cancel it with `JTML.compileNow = false;`.

## Compile
Calling the `JTML.compile([domain=JTML.DOMAIN])` function compiles the JTML code in the specified element.
#### example
```html
<div id="jtml-code">
    <!--jtml code here-->
</div>
<script type="text/javascript">
    JTML.compile($("#jtml-code"));
</script> 
```

## Writing code
Read [Code Structure-primary](Part1/primary.md)

## Read this documentation with browser
Install gitbook first.
```bash
npm install gitbook-cli -g
```
Then start server.
```bash
gitbook serve
```
Finally, browsers access `http://localhost:4000`.