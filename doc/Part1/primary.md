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
#### example
```html
<if conditional="1 + 1 == 2">
    <p>1+1=2!</p>
</if>
```