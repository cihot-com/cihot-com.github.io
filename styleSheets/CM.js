function CM(selectorText){
    return CM.createManager(selectorText);
};


CM.get = function (selectorText, ignoreInitial = true) {
    let styleSheets = document.styleSheets,
        styleSheetsIndex, styleSheetsLength,
        rules,
        rulesIndex, rulesLength,
        rule,
        result = [],
        style,
        styleIndex, styleLength;
    styleSheetsIndex = 0;
    styleSheetsLength = styleSheets.length;
    while (styleSheetsIndex < styleSheetsLength) {
        rules = styleSheets.item(styleSheetsIndex).rules;
        rulesIndex = 0;
        rulesLength = rules.length;
        while (rulesIndex < rulesLength) {
            rule = rules.item(rulesIndex);
            if (rule.selectorText === selectorText) {
                let o = Object.create(null);
                style = rule.style;
                styleIndex = 0;
                styleLength = style.length;
                while (styleIndex < styleLength) {
                    let name = style.item(styleIndex);
                    let value = style[style.item(styleIndex)];
                    o[name] = value;
                    styleIndex++;
                }
                result.push(o);
            }
            rulesIndex++;
        }

        styleSheetsIndex++;
    }

    if (ignoreInitial) {
        result = result.map(e => {
            let o = Object.create(null);
            for (let k in e) {
                let v = e[k];
                if (v !== 'initial') {
                    o[k] = v;
                }
            }
            return o;
        })
    }

    return result.length ? Object.assign(...result) : null;
};


Object.defineProperty(CM, 'tag', {
    get() {
        let id = '#cssManagerTag', tag = document.querySelector(id);
        if (!tag) {
            tag = document.createElement('style');
            tag.setAttribute('id', id);
            document.body.appendChild(tag);
        }
        return tag;
    }
});

Object.defineProperty(CM,'createManager',{
    value(selectorText) {
        return new Proxy(CM.tag.sheet, {
            get(o,k,p){
                return CM.get(selectorText)[k];
            },
            set(o,k,v,p){
                return o.addRule(selectorText, `${k}: ${v}`);
                // return CM.tag.sheet.addRule(selectorText, `${k}: ${v}`);
            }
        });
    }
});