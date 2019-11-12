数据表格

目的：大数据渲染表格会使浏览器严重卡顿。解决数据分页显示，过滤显示，排序显示，进度条显示。


环境分析：
在1个表格中，只能有1个thead和tfoot，却可以有多个tbody。
用于显示多个相同字段的表时



数据过滤
选中 特定条件的数据


new TBL()
table
tbody
thead
tfoot
caption

tbl.data([{}{}{}{}{}]).start(0).end(0).first().last().item()
.tbody().thead()

T.data([]).row([] cb)


filter(condition, context)