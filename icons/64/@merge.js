const fs = require('fs')

let merge = {};

fs.readdirSync(__dirname).some((file, i) => {
	if (!/\.webp/.test(file)) return false;

	let stat = fs.statSync(file)
	if (stat.isFile()) {
		let type = file.match(/\.([\s\S]+)$/)[1];
		let name = file.slice(0, -5);
		let dataPrefix = `data:image/${type};base64,`;
		let data = fs.readFileSync(file, 'base64');
		// console.log(name, data);
		// merge[name] = data;
		merge[name] = dataPrefix + data;
		// return true;
	}
})

// let jsData = 'let iconDatas = ' + JSON.stringify(merge) + ';';
// fs.writeFileSync('all.js', jsData, 'utf8');


let cssData = [];
cssData.push(`.icon {
	-webkit-mask-repeat: no-repeat;
	-webkit-mask-position: center;
	-webkit-mask-size: 80%;
}
.icon:not(.disabled):hover {
	filter: brightness(1.5);
}
.mask8 { -webkit-mask-size: 8px; }
.mask16 { -webkit-mask-size: 16px; }
.mask24 { -webkit-mask-size: 24px; }
.mask32 { -webkit-mask-size: 32px; }
.mask64 { -webkit-mask-size: 64px; }`)
for (let k in merge) {
	let v = merge[k]
	// s.backgroundColor = color;
	// s.maskImage = s.webkitMaskImage = `url(${iconDatas[name]})`;
	// s.maskRepeat = s.webkitMaskRepeat = 'no-repeat';
	// s.maskPosition = s.webkitMaskPosition = 'center';
	// s.maskSize = s.webkitMaskSize = size;
	cssData.push(`.icon-${k} {
	-webkit-mask-image: url(${v});
}`)
}

cssData = cssData.join('\n');
// cssData = cssData.replace(/\t/g, '').replace(/\n/g, '').replace(/:\s+/g, ':').replace(/\s*\{\s*/g, '{').replace(/\s*\}\s*/g, '}')
fs.writeFileSync('../all.css', cssData, 'utf8');


console.log('Done.')