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
        let id = 'cssManagerTag', tag = document.getElementById(id);
        if (!tag) {
            tag = document.createElement('style');
            tag.setAttribute('id', id);
            document.body.appendChild(tag);
        }
        return tag;
    }
});

Object.defineProperty(CM, 'sheet', {
    get() {
        return CM.tag.sheet;
    }
});

Object.defineProperty(CM, 'rules', {
    get() {
        return Array.from(CM.sheet.rules).map(e=>e.cssText);
    }
});

Object.defineProperty(CM,'createManager',{
    value(selectorText) {
        return new Proxy(CM.tag.sheet, {
            get(o,k,p){
                return CM.get(selectorText)[k];
            },
            set(o,k,v,p){
                let rule, hasRule=false;
                for(let i=0,len=o.rules.length; i<len; i++) {
                    rule=o.rules.item(i);
                    console.log(rule);
                    
                    hasRule=rule.selectorText===selectorText
                    if(hasRule) {
                        break;
                    }
                }
                if(!hasRule) {
                    o.addRule(selectorText, `${k}: ${v}`);
                }else{
                    if(v!==undefined){
                        rule.style[k]=v;
                    }else{
                        let deleteList = Array.from(o.rules).map((e,i)=>e.selectorText===selectorText);
                        let len=deleteList.length;
                        if(len--) {
                            o.removeRule(deleteList[len]);
                        }
                    }
                }
            }
        });
    }
});