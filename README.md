# code-bed
A web component for [embedded CodePens](https://blog.codepen.io/documentation/embedded-pens/).

[Try it out!](https://codepen.io/rcasto/full/ExVoXKW)

## Usage

### Via script tag
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

    <script async src="https://cdn.jsdelivr.net/npm/code-bed@1.0.3/dist/codebed.min.js"></script>
</body>
</html>
```

### Via module bundler
1. Install package via package manager of your choice.
```
npm install code-bed
```

2. `import 'code-bed'` as part of your app module, it should then be included as part of your bundle.
```javascript
import 'code-bed';

// Rest of your code...
```

3. You can now use `<code-bed></code-bed>` in your app views!

## Customization
All parameters into the code-bed web component are done so via attributes on the `<code-bed></code-bed>` HTML element.

The set of attributes used are the same ones used by the CodePen embed itself:
- https://blog.codepen.io/documentation/embedded-pens/#override-attributes-5

The only absolutely required attribute is:
- `data-slug-hash` - The identifier for the CodePen (ex. wbVzQG)