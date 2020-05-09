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

const defaultIntersectionObeserverOptions = Object.freeze({
    rootMargin: '20px',
});

// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
export function createIntersectionObserver(observerCallback) {
    if (typeof IntersectionObserver !== 'function') {
        return null;
    }
    return new IntersectionObserver(observerCallback, defaultIntersectionObeserverOptions);
}