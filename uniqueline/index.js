let { log } = console

let ta = $('textarea')

$('#unique').on('click', (e)=>{
	let t = ta.val()
	let n = t.length
	let rows = t.split('\n')
	rows = Array.from(new Set(rows))
	t = rows.join('\n')
	log(n,'->',t.length)
	ta.val(t)

})

$('#trim').on('click', (e)=>{
	each(function(rows){
		return rows.map(e=>e.trim())
	})
})

$('#sortUp').on('click', (e)=>{
	sort(1)
})
$('#sortDown').on('click', (e)=>{
	sort(-1)
})

function sort(n){
	each(function(rows){
		return rows.sort((a,b)=>{
			return a>b ? n : (a<b? -n: 0)
		})
	})
}


function each(fn) {
	let rows = ta.val().split('\n')
	return ta.val(fn(rows).join('\n'))
}
