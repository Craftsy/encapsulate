'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

var typeBuilders = _recast2['default'].types.builders;

function transformJsx(jsxString, className) {
    var ast = _recast2['default'].parse(jsxString);

    _recast2['default'].types.visit(ast, {
        visitJSXOpeningElement: function visitJSXOpeningElement(path) {
            var jsxAttributes = _recast2['default'].types.getFieldValue(path.node, 'attributes');

            var classNameAttribute = jsxAttributes.reduce(function (classNameAttribute, attribute) {
                if (!classNameAttribute && (!attribute || !attribute.name)) {
                    return null;
                }
                return classNameAttribute || (attribute.name.name === 'className' ? attribute : null);
            }, null);

            if (!classNameAttribute) {
                // Time to create one!
                classNameAttribute = typeBuilders.jsxAttribute(typeBuilders.jsxIdentifier('className'), typeBuilders.literal(className));
                jsxAttributes.push(classNameAttribute);
            } else {
                // Has an existing class name, there is one of two possibilities
                // it is either a string literal (easy)
                // or it is a JSXExpressionContainer
                var classNameValue = _recast2['default'].types.getFieldValue(classNameAttribute, 'value');
                if (_recast2['default'].types.namedTypes.JSXExpressionContainer.check(classNameValue)) {
                    // It's a JSXExpressionContainer
                    // The solution is to wrap the expression in a binary operator to append className
                    var originalExpression = classNameValue.expression;
                    var wrappedExpression = typeBuilders.binaryExpression('+', originalExpression, typeBuilders.literal(' ' + className));
                    classNameValue.expression = wrappedExpression;
                } else {
                    // It's a literal
                    classNameValue.value += ' ' + className;
                }
            }

            this.traverse(path);
        }
    });

    return _recast2['default'].print(ast, { tabWidth: 4 }).code;
}

exports['default'] = { transformJsx: transformJsx };
module.exports = exports['default'];