export function copyAttributes(fromElem, toElem, attrs) {
    attrs
        .forEach(attr => {
            const attrValue = fromElem.getAttribute(attr);
            if (typeof attrValue === 'string') {
                toElem.setAttribute(attr, attrValue);
            }
        });
}

export function createTemplateFromString(templateHTMLString) {
    const template = document.createElement('template');
    template.innerHTML = templateHTMLString;
    return template;
}