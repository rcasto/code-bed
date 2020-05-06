# code-bed
A web component for [embedded CodePens](https://blog.codepen.io/documentation/embedded-pens/).

[Try it out!](https://codepen.io/rcasto/pen/ExVoXKW)

## Usage
1. Include the script tag on your page or include in your bundle.
2. Use `<code-bed></code-bed>` on your page. [More info on embed attributes](https://blog.codepen.io/documentation/embedded-pens/#override-attributes-5) that can be customized, these same attributes can be used via the code-bed web component.

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>code-bed usage</title>
</head>
<body>
    <code-bed
        data-slug-hash="RwWxWNB"
        data-height="150">
    </code-bed>

    <script src="https://cdn.jsdelivr.net/npm/code-bed@1.0.3/dist/codebed.min.js"></script>
</body>
</html>
```