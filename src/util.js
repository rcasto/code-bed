function hasCodePenEmbedScript() {
    return typeof window.__CPEmbed === 'function';
}

export function triggerCodePenEmbedReload() {
    if (!hasCodePenEmbedScript()) {
        return;
    }

    window.__CPEmbed('.codepen-component-embed');
}

export function loadCodePenEmbedScript() {
    return new Promise((resolve, reject) => {
        if (hasCodePenEmbedScript()) {
            return resolve();
        }

        const codepenScriptElem = document.createElement('script');

        codepenScriptElem.src = 'https://static.codepen.io/assets/embed/ei.js';
        codepenScriptElem.async = true;
        
        codepenScriptElem.addEventListener('load', resolve);
        codepenScriptElem.addEventListener('error', reject);

        document.body.appendChild(codepenScriptElem);
    });
}

export function copyAttributes(fromElem, toElem, attrs) {
    attrs
        .forEach(attr => {
            const attrValue = fromElem.getAttribute(attr);
            if (typeof attrValue === 'string') {
                toElem.setAttribute(attr, attrValue);
            }
        });
}

export const codepenEmbedClass = 'codepen-component-embed';

// https://blog.codepen.io/documentation/embedded-pens/#override-attributes-5
export const codepenEmbedAttributes = Object.freeze([
    "data-theme-id",
    "data-slug-hash",
    "data-user",
    "data-default-tab",
    "data-height",
    "data-show-tab-bar",
    "data-animations",
    "data-border",
    "data-border-color",
    "data-tab-bar-color",
    "data-tab-link-color",
    "data-active-tab-color",
    "data-active-link-color",
    "data-link-logo-color",
    "data-class",
    "data-custom-css-url",
    "data-preview"
  ]);