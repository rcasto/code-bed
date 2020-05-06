import { loadCodePenEmbedScript } from '../src/codepenUtil';

describe('loadCodePenEmbedScript Tests', () => {
    let createElementSpy;

    beforeEach(() => {
        createElementSpy = jest.spyOn(document, 'createElement');
    });

    test('can load codepen embed script', () => {
        loadCodePenEmbedScript();

        expect(createElementSpy).toHaveBeenCalledWith('script');
    });
});