import {
    loadCodePenEmbedScript,
    codepenEmbedScriptUrl,
    reset
} from '../src/codepenUtil';

describe('loadCodePenEmbedScript Tests', () => {
    let createElementSpy;
    let appendChildSpy;
    let mockCodePenScriptElem;

    beforeEach(() => {
        mockCodePenScriptElem = {
            addEventListener: jest.fn()
        };
        createElementSpy = jest.spyOn(document, 'createElement')
            .mockImplementation(_ => mockCodePenScriptElem);
        appendChildSpy = jest.spyOn(document.body, 'appendChild')
            .mockImplementation(() => {});
    });

    afterEach(() => {
        reset();
        jest.restoreAllMocks();
    });

    test('can start to load codepen embed script', () => {
        loadCodePenEmbedScript();

        expect(createElementSpy).toHaveBeenCalledWith('script');
        expect(appendChildSpy).toHaveBeenCalled();

        expect(mockCodePenScriptElem.src).toEqual(codepenEmbedScriptUrl);
        expect(mockCodePenScriptElem.async).toBeTruthy();

        expect(mockCodePenScriptElem.addEventListener)
            .toHaveBeenCalledWith('load', expect.any(Function));
        expect(mockCodePenScriptElem.addEventListener)
            .toHaveBeenCalledWith('error', expect.any(Function));
    });

    test('can resolve on successful load of codepen embed script', async () => {
        const loadPenPromise = loadCodePenEmbedScript();

        // This triggers the 'load' event
        // click handler
        mockCodePenScriptElem.addEventListener
            .mock.calls[0][1]();
        
        try {
            await loadPenPromise;
        } catch (err) {
            // This line should not be reached as the above call in the try
            // should resolve. If the below line is hit, it should fail out.
            expect(false).toEqual(true);
        }
    });

    test('can reject on error of loading codepen embed script', async () => {
        const loadPenPromise = loadCodePenEmbedScript();

        // This triggers the 'error' event
        // click handler
        mockCodePenScriptElem.addEventListener
            .mock.calls[1][1]('fake-error');
        
        try {
            await loadPenPromise;

            // This line should not be reached as the above call
            // should reject. If the below line is hit, it should fail out.
            expect(false).toEqual(true);
        } catch (err) {
            expect(err).toEqual('fake-error');
        }
    });

    test('can not create and append codepen embed script when already present', async () => {
        // setup global window object, such that
        // the CodePen embed script globals are already
        // available.
        const prevCPEmbed = window.__CPEmbed;
        window.__CPEmbed = jest.fn();

        await loadCodePenEmbedScript();

        expect(createElementSpy).not.toHaveBeenCalled();
        expect(appendChildSpy).not.toHaveBeenCalled();

        window.__CPEmbed = prevCPEmbed;
    });

    test('does not cache result of error loading codepen embed script', async () => {
        let loadPenPromise = loadCodePenEmbedScript();

        // This triggers the 'error' event
        // click handler
        mockCodePenScriptElem.addEventListener
            .mock.calls[1][1]('fake-error');
        
        try {
            await loadPenPromise;

            // This line should not be reached as the above call
            // should reject. If the below line is hit, it should fail out.
            expect(false).toEqual(true);
        } catch(err) {
            // clear createElement and appendChild spies
            createElementSpy.mockClear();
            appendChildSpy.mockClear();

            // Start the reloading process over
            loadPenPromise = loadCodePenEmbedScript();

            // make sure the createElement and appendChild callls are
            // still made, injecting the CodePen embed script
            expect(createElementSpy).toHaveBeenCalledWith('script');
            expect(appendChildSpy).toHaveBeenCalled();
        }
    });
});