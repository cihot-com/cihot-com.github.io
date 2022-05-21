class StyleRoot {
	static init() {
		if (document.styleSheets.length === 0) {
			document.head.appendChild(document.createElement('style'))
		}
	}
	static get(k, selector = ':root') {
		StyleRoot.init();
		let VALUE = null;
		Array.prototype.forEach.call(document.styleSheets, (sheet, i) => {
			Array.prototype.forEach.call(sheet.rules, (rule) => {
				if (rule.selectorText === selector) {
					VALUE = rule.styleMap.get(k);
				}
			})
		})
		return VALUE ? String(VALUE).trim() : VALUE;
		// document.styleSheets[0].rules[0].styleMap.get('--color')
	}

	static set(k, v = '', selector = ':root') {
		StyleRoot.init();
		let SHEET, RULE, VALUE;
		Array.prototype.forEach.call(document.styleSheets, (sheet, i) => {
			SHEET = sheet;
			Array.prototype.forEach.call(sheet.rules, (rule) => {
				if (rule.selectorText === selector) {
					RULE = rule;
				}
			})
		})
		if (!RULE) {
			SHEET.addRule(selector, `${k}:${v};`, SHEET.rules.length)
			RULE = SHEET.rules[SHEET.rules.length - 1];
		};
		RULE.styleMap.set(k, v);
		return v;
	}
	static getValue(k, selector = ':root') {
		return StyleRoot.get(StyleRoot.normalizeKey(k), selector);
	}

	static setValue(k, v = '', selector = ':root') {
		k = StyleRoot.normalizeKey(k);
		v = StyleRoot.normalizeValue(v);
		return StyleRoot.set(k, v, selector);

	}

	static style(element, k, v, isImportant = false) {
		if (isImportant) v += '!important';
		return element.style.setProperty(k, v);
		// document.documentElement.style.setProperty('--color', color)
	}
	static styleValue(element, k, v, isImportant = false) {
		k = StyleRoot.normalizeKey(k);
		v = StyleRoot.normalizeValue(v);
		if (isImportant) v += '!important';
		return element.style.setProperty(k, v);
	}

	static normalizeKey(k) {
		k = String(k).trim();
		if (!/^--\S/.test(k)) k = '--' + k;
		return k;
	}
	static normalizeValue(v) {
		return String(v).trim();
	}

}