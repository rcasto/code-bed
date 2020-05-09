function hasCodePenEmbedScript() {
    return typeof window.__CPEmbed === 'function';
}

export const codepenEmbedScriptUrl = 'https://static.codepen.io/assets/embed/ei.js';
export const codepenEmbedContainerClass = 'code-bed-embed-container';
export const codepenEmbedClass = 'code-bed-embed';

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

export function triggerCodePenEmbedReload() {
    if (!hasCodePenEmbedScript()) {
        return;
    }

    window.__CPEmbed(`.${codepenEmbedClass}`);
}

let loadingCodePenEmbedScriptPromise = null;
export function loadCodePenEmbedScript() {
    if (loadingCodePenEmbedScriptPromise) {
        return loadingCodePenEmbedScriptPromise;
    }

    loadingCodePenEmbedScriptPromise = new Promise((resolve, reject) => {
        if (hasCodePenEmbedScript()) {
            return resolve();
        }

        const codepenScriptElem = document.createElement('script');

        codepenScriptElem.src = codepenEmbedScriptUrl;
        codepenScriptElem.async = true;

        codepenScriptElem.addEventListener('load', resolve);
        codepenScriptElem.addEventListener('error', reject);

        document.body.appendChild(codepenScriptElem);
    });

    loadingCodePenEmbedScriptPromise
        .catch(err => {
            // don't keep errors cached
            loadingCodePenEmbedScriptPromise = null;
            throw err;
        });

    return loadingCodePenEmbedScriptPromise;
}