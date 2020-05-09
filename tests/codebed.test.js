import CodeBed from '../src/codebed';

test('can initialize code-bed component', () => {
    const codebed = new CodeBed();

    expect(codebed.codePenSlugHash).toEqual('');
    expect(codebed.codePenHeight).toEqual('300');
    expect(codebed.codepenEmbedElem).toEqual(null);
    expect(codebed.codepenEmbedContainerElem).toEqual(null);
});