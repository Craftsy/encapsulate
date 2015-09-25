# encapsulate

Transform CSS and JSX content by scoping the CSS classes to a provided module name.

## why

To prevent CSS styles intended for specific React components to cascade and apply to other components, encapsulate ensures that all elements are given a class name and all CSS styles are scoped to the same class. For example, given a class name of FooComponent-1-0-0 the JSX and CSS

```jsx
<section>
    <h1 className={this.props.headerClass}>Hello World</h1>
    <p className="small">This is some text.</p>
</section>
```
```css
section: {
    background-color: grey;
}

section h1 {
    display: inline-block;
}

section p.small {
    font-size: 10px;
}
```

are transformed into

```jsx
<section className="FooComponent-1-0-0">
    <h1 className={this.props.headerClass + ' FooComponent-1-0-0'}>Hello World</h1>
    <p className="small FooComponent-1-0-0">This is some text.</p>
</section>
```
```css
section.FooComponent-1-0-0: {
    background-color: grey;
}

section.FooComponent-1-0-0 h1.FooComponent-1-0-0 {
    display: inline-block;
}

section.FooComponent-1-0-0 p.small.FooComponent-1-0-0 {
    font-size: 10px;
}
```

## how

There are a couple ways to use encapsulate

### specifying a custom CSS class name
```javascript
let encapsulate = require('encapsulate');

// somehow populate the JSX and CSS into these
let jsxContent;
let cssContent;

let transformedJsx = encapsulate.transformJsx(jsxContent, 'FooComponent-1-0-0');
let transformedCss = encapsulate.transformCss(cssContent, 'FooComponent-1-0-0');
```

### computing the CSS class name from a package.json file
```javascript
let encapsulate = require('encapsulate');

// somehow populate the JSX and CSS into these
let jsxContent;
let cssContent;

// This can be any path that that has a package.json in its hierarchy
// e.g. /path/to/the/module
// /path/to/the/module/package.json
// /path/to/the/module/some/other/file
let pathToModule = '/path/to/module';

let transformedJsx = encapsulate.encapsulateJsxWithPackage(pathToModule, jsxContent);
let transformedCss = encapsulate.encapsulateCssWithPackage(pathToModule, cssContent);
```

## developing
`git clone` the repository and `npm install` to install all of the dependencies needed to build & run tests.

### running tests
`npm test`

### building
`gulp build` transpiles the encapsulate code into the `dist` directory.
