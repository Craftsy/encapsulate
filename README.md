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
    <h1 className={this.props.headerClass + 'FooComponent-1-0-0'}>Hello World</h1>
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

### directly passing the content strings
```javascript
let transformCss = require('encapsulate/dist/css').transformCss;
let transformJsx = require('encapsulate/dist/jsx').transformJsx;

// somehow populate the JSX and CSS into these
let jsxContent;
let cssContent;

let transformedJsx = encapsulate.transformJsx();
```
