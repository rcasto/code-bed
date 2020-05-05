# code-pen
A web component for [embedded CodePens](https://blog.codepen.io/documentation/embedded-pens/).

## Usage
1. Include the script tag on your page or include in your bundle.
2. Add definition to [customElements registry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define). You can change from suggested `code-pen` if ya want.
3. Use `<code-pen></code-pen>` on your page. [More info on embed attributes](https://blog.codepen.io/documentation/embedded-pens/#override-attributes-5) that can be customized, these same attributes can be used via the code-pen web component.


```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>code-pen usage</title>
</head>
<body>
    <code-pen
        data-slug-hash="RwWxWNB"
        data-height="150">
    </code-pen>

    <script src="dist/codepen.js"></script>
    <script>
        customElements.define('code-pen', CodePen);
    </script>
</body>
</html>
```