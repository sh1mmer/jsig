var builtinTypes = require('./parser/builtin-types.js')

module.exports = {
    program: program,
    typeDeclaration: typeDeclaration,
    assignment: assignment,
    object: object,
    union: union,
    literal: literal,
    keyValue: keyValue,
    value: value,
    functionType: functionType,
    generic: generic
}

function program(statements) {
    return {
        type: 'program',
        statements: statements
    }
}

function typeDeclaration(identifier, typeExpression) {
    return {
        type: 'typeDeclaration',
        identifier: identifier,
        typeExpression: typeExpression
    }
}

function assignment(identifier, typeExpression) {
    return {
        type: 'assignment',
        identifier: identifier,
        typeExpression: typeExpression
    }
}

function object(keyValues, label, opts) {
    opts = opts || {}
    if (!Array.isArray(keyValues)) {
        keyValues = Object.keys(keyValues)
            .reduce(function (acc, key) {
                acc.push(keyValue(key, keyValues[key]))
                return acc
            }, [])
    }

    return {
        type: 'object',
        keyValues: keyValues,
        label: label || null,
        optional: opts.optional || false
    }
}

function union(unions, label, opts) {
    opts = opts || {}

    return {
        type: 'unionType',
        unions: unions,
        label: label || null,
        optional: opts.optional || false
    }
}

function literal(name, builtin, opts) {
    opts = opts || {}
    if (typeof builtin === 'string') {
        opts.label = builtin
        builtin = undefined
    }

    return {
        type: 'typeLiteral',
        name: name,
        builtin: builtin !== undefined ? builtin :
            builtinTypes.indexOf(name) !== -1 ? true : false,
        label: opts.label || null,
        optional: opts.optional || false
    }
}

function keyValue(key, value) {
    return {
        type: 'keyValue',
        key: key,
        value: value
    }
}

function value(_value, name, label) {
    return {
        type: 'valueLiteral',
        value: _value,
        name: name ? name : _value === 'null' ? 'null' : 'void',
        label: label || null,
        optional: false
    }
}

function functionType(opts) {
    return {
        type: 'function',
        args: opts.args || [],
        result: opts.result,
        thisArg: opts.thisArg || null,
        label: opts.label || null,
        optional: opts.optional || false
    }
}

function generic(value, generics, label) {
    return {
        type: 'genericLiteral',
        value: value,
        generics: generics,
        label: label || null,
        optional: false
    }
}
