Primary Language Structure
============================

Show value
------------
Use tag `<show>expression</show>`.
#### example
```html
Time: <show>(new Date()).toUTCString()</show>
```

Set variable
---------------
Use tag `<set><token>variable-name</token> <value>set value</value></set>`.
#### example
```html
<set>
    <token>name</token> <value>"JTML"</value>
    <token>version</token> <value>"v-0.0.1"</value>
</set>
<p>name: <show>name</show></p>
<p>version: <show>version</show></p>
```

If statement
-----------------
Use tag `<if conditional="conditional"><!--JTML code here--></if>`.
Use tag `<elif conditional="conditional"><!--JTML code here--></elif>` when the if statement does not hold.
Use tag `<else><!--JTML code here--></else>` when the if statement and elif statement don't hold.
#### example
```html
<if conditional="1 + 2 == 1">
    <p>1+2=1</p>
</if>
<elif conditional="1 + 2 == 2">
    <p>1+2=2</p>
</elif>
<elif conditional="1 + 2 == 3">
    <p>1+2=3</p>
</elif>
<else>
    <p>unknown</p>
</else>
```

While statement
-----------------
Use tag `<while conditional="conditional"><!--JTML code here--></while>`.
#### example
```html
<set>
    <token>i</token> <value>0</value>
</set>
<while conditional="i < 10">
    <p><show>i++</show></p>
</while>
```

Do statement
-----------------
Use tag `<do conditional="conditional"><!--JTML code here--></do>`.
It likes do...while in JavaScript.
#### example
```html
<set>
    <token>i</token> <value>0</value>
</set>
<do conditional="i < 10">
    <p><show>i++</show></p>
</do>
```
