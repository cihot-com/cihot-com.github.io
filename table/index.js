let table = document.body.appendChild(document.createElement('table'))
let h,b,tb



h =new Head('id','name')
h.to(table)
h.add('bmd').make()

b = new Body()
b.from(document.querySelector('#app'))
b._rows[0][1]='AAA'
b.add({1:'aaa'})

b.empty().make()

b= new Body('node')
b.add({1:'aaa@',2:'BBB@'})
b.parent = document.querySelector('#app')
b.make()



let rows = [
	{id:1, name:'A', age:27},
	{id:2, name:'B', age:26},
	{id:3, name:'C', age:25},
	{id:4, name:'Z', age:24},
	{id:5, name:'X2', age:23},
	{id:6, name:'X1', age:24},
]


b.setData()