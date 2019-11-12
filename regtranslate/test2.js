let { log } = console
// 已知

let sOld = '[FFC663FF]카자(물)[-] / 연타공격으로 마탑과 피라미드 보스의 배리어를 훔쳐옵니다!'
let tOld = '[FFC663FF]卡夏(水)[-]/可通过连续攻击盗取魔塔和金字塔BOSS的屏障！'


// 需要翻译
let s = '[FFC663FF]{0}[-] 연타공격으로 마탑과 피라미드 보스의 배리어를 훔쳐옵니다!'


const S = '\\s*'
let re = /x/
re.compile('^'+/(?<v1>[\s\S]+?)/.source+S+'연타공격으로 마탑과 피라미드 보스의 배리어를 훔쳐옵니다!'.split('').join(S)+S+'$')
log(re)
// 需要分析


let i = 10
let r
r = re.exec(sOld)
log(r[1])




// 无视颜色值
function ignoreColor(s) {
	let re = /\[([0-9A-F]{2}){3,4}\]([\s\S]+?)\[-\]/g
	return s.replace(re, '$2')
}

function splitBySymbol(s) {
	let re = new RegExp('~!@#$ %^&* ()_ + {} |: "<>?`-=[]\\;\',./＃＆＊＠§※☆★○●◎◇◆，、。．？！～＄％‧；︰…‥﹐﹒˙·﹔﹕‘’“”〝〞‵′〃↑ ↓←→↖↗↙↘㊣⊕⊙△▲□■▽▼￥〒￠￡♀♂卍♨▀▄█▌▐░▒▪▫▬►◊◦▤▦▩▣◈☏◐◑♩♭♫∮∴∵＿ˍ▁▂▃▅▆▇▏▎▍▋▊▉◢◣◥◤〔〕【】《》（）｛｝﹙﹚『』﹛﹜﹝﹞＜＞≦≧﹤﹥「」︵︶︷︸︹︺︻︼︽︾〈〉︿﹀∩∪﹁﹂﹃﹄╳＋﹢－×÷＝≠≒∞ˇ±√⊥∠∟⊿㏒㏑∫'.split('').map(s=>'\\'+s).join('|'), 'g')
	return s.split(re).filter(e=>e)
}


log(splitBySymbol(ignoreColor(r[1])))

