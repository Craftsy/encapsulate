import recast from 'recast';

const typeBuilders = recast.types.builders;

function transformJsx(jsxString, className) {
    const ast = recast.parse(jsxString);

    recast.types.visit(ast, {
        visitJSXOpeningElement: function(path) {
            const jsxAttributes = recast.types.getFieldValue(path.node, 'attributes');

            let classNameAttribute = jsxAttributes.reduce(function(classNameAttribute, attribute) {
                if (!classNameAttribute && (!attribute || !attribute.name)) {
                    return null;
                }
                return classNameAttribute || (attribute.name.name === 'className' ? attribute : null);
            }, null);

            if (!classNameAttribute) {
                // Time to create one!
                classNameAttribute = typeBuilders.jsxAttribute(
                    typeBuilders.jsxIdentifier('className'),
                    typeBuilders.literal(className)
                );
                jsxAttributes.push(classNameAttribute);
            } else {
                // Has an existing class name, there is one of two possibilities
                // it is either a string literal (easy)
                // or it is a JSXExpressionContainer
                const classNameValue = recast.types.getFieldValue(classNameAttribute, 'value');
                if (recast.types.namedTypes.JSXExpressionContainer.check(classNameValue)) {
                    // It's a JSXExpressionContainer
                    // The solution is to wrap the expression in a binary operator to append className
                    const originalExpression = classNameValue.expression;
                    const wrappedExpression = typeBuilders.binaryExpression(
                        '+',
                        originalExpression,
                        typeBuilders.literal(' ' + className)
                    );
                    classNameValue.expression = wrappedExpression;
                } else {
                    // It's a literal
                    classNameValue.value += ' ' + className;
                }
            }

            this.traverse(path);
        },
    });

    return recast.print(ast, {tabWidth: 4}).code;
}

export default {transformJsx};
