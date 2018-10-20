http://cihot.com/styleSheets


获取选择器样式:
```
let cm = CM('cssSelectorText')
```

读取样式:
```
cm.width;
```

修改样式:
```
cm.width='200px';
```


实例: 修改id为app的样式.
```
let cm = CM('#app');

cm.width = '300px';
cm.height= '300px';

console.log(CM.get('#app'));
```