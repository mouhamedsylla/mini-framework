const parseContext = (code) => {
    const contextRegex = /<context>([\s\S]*?)<\/context>/;
    const match = code.match(contextRegex);
    let context = {};

    if (match) {
        const contextCode = match[1];
        context = new Function(`
            let context = {};
            ${contextCode.replace(/const|let|var/g, 'context.')};
            return context;
        `)();
    }

    return { code: code.replace(contextRegex, '').trim(), context };
};


export function evalJS(code) {
    const { context } = parseContext(code)
    const extract_to_render = /<div>([\s\S]*?)<\/div>/
    const match = code.match(extract_to_render);
    code = match[0]

    const nestedBracesRegex = /(?<!on=)\{([^{}]*(\{[^{}]*\})?[^{}]*)+\}/g

    ///\{([^{}]*(\{[^{}]*\})?[^{}]*)+\}/g;
    let matchedJS = [];
    let matches;

    while ((matches = nestedBracesRegex.exec(match[0])) !== null) {
        matchedJS.push(matches[1]);
    }

    if (matchedJS.length > 0) {
        matchedJS.forEach(js => {
            const expr = evaluateExpression(js, context);
            code = code.replace(`{${js}}`, expr);
        });
    }

    return { code, context };
}

const evaluateExpression = (expression, context) => {
    return new Function('context', `
        with (context) {
            return ${expression};
        }
    `)(context);
}

export function EvalJS(code, context) {
    const nestedBracesRegex = /\{([^{}]*(\{[^{}]*\})?[^{}]*)+\}/g;

    let matchedJS = [];
    let matches;
    //code = encodeHTML(code);

    while ((matches = nestedBracesRegex.exec(code)) !== null) {
        matchedJS.push(matches[1]);
    }

    if (matchedJS.length > 0) {
        matchedJS.forEach(js => {
            const expr = evaluateExpression(js, context);
            code = code.replace(`{${js}}`, expr);
        });
    }

    return code;
}