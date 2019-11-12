let _term=``;

_term=_term.trim().split('\n').map(e=>e.split('\t'));

if(typeof module==='object' && typeof module.exports==='object') {
	let term=global.term;
}

if(typeof term==='object') {
	term=_term.concat(term);
	term=term.filter(e=>Array.isArray(e)&&(typeof e[0]==='string'&&e[0].length>0)&&(typeof e[1]==='string'&&e[1].length>0));
}