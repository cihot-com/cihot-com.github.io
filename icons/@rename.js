const fs = require('fs')

class F {
	static numbers() {
		fs.readdir(__dirname, (err, files) => {
			files.forEach((file) => {
				if (/\.webp$/.test(file)) {
					fs.rename(file, file.replace(/^[0-9]+-/, ''), (err, rs) => {
						console.log(err ? err : (rs || file));
					})
				}
			})
		})
	}

	static remove() {
		fs.readdir(__dirname, (err, files) => {
			files.forEach((file) => {
				fs.rename(file, file.replace('.webpwebp', '.webp'), (err, rs) => {
					console.log(err ? err : (rs || file));
				})
			})
		})
	}


	static space(v = '-') {
		fs.readdir(__dirname, (err, files) => {
			files.forEach((file) => {
				if (/\.webp$/.test(file)) {
					fs.rename(file, file.replace(/\s+/, v), (err, rs) => {
						console.log(err ? err : (rs || file));
					})
				}
			})
		})
	}



	static addEnd(v = '-1') {
		fs.readdir(__dirname, (err, files) => {
			files.forEach((file) => {
				if (/\.webp$/.test(file)) {
					let file1 = file.replace(/\.(?=webp$)/, v + '.webp');
					// console.log(file1)
					fs.rename(file, file1, (err, rs) => {
						console.log(err ? err : ('OK ' + file));
					})
				}
			})
		})
	}
}