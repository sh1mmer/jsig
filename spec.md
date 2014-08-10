# JSig Specification

JSig is language to express the types of a JavaScript program.

## Jsig types and subtypes

To be able to talk about how JavaScript values and JSig types
    are related we will introduce some concepts.

### A value is of a type

A JavaScript value `v` is of a JSig type `T`.

To check whether `v` is of type `T` we first infer the
    Jsig type expression `S` for `v`. Then if `S` is a subtype
    of `T` we know that `v` is of type `T`

### JSig subtypes

A Jsig type expression `S` can be a subtype of a JSig type
    expression `T`

TODO: define subtype semantics

## Statements

A JSig file contains a series of statements.

You can also use a statement in a comment in a piece of code.

### Assignment statement

```jsig
someIdentifier : {{TypeExpression}}
```

An assignment statement is an identifier and a type expression
    seperated by a `:` symbol.

An identifier is a reference to some concrete value in JavaScript.

There are multiple ways that identifiers can be resolved to
    a value in JavaScript, these will be defined later.

The concrete value `v` that the identifier references to must
    satisfy the `{{TypeExpression}}`

## Builtin Types

There are a set of builtin types.

 - `String`
 - `Number`
 - `Object`
 - `void`
 - `Any`
 - `Array`
 - `Error`
 - `Function`

Every builtin type is a valid type expression.

### The builtin `String` type

Any JavaScript String value is of type `String`.

i.e. A value `v` is of type `String` if `typeof v === 'string'`.

Examples:

 - `"foo"` is of type `String`. 
 - `new String("foo")` is not of type `String`

### The builtin `Number` type

Any JavaScript Number value is of type `Number`

i.e. A value `v` is of type `Number` if `typeof v === 'number'`

Examples:

 - `42` is of type `Number`
 - `Infinity`, `-Infinity` is of type `Number`
 - `NaN` is of type `Number`
 - `new Number(0)` is not of type `Number`

### The bultin `Object` type

Any Javascript object is of type `Object`

i.e. A value `v` is of type `Object` if
    `typeof v === 'object' && v !== null`

Examples:

 - `{ foo: 'bar' }` is of type `Object`
 - `[1, 2, 3]` is of type `Object`
 - `new Object()` is of type `Object`
 - `null` is not of type `Object`

### The builtin `void` type

If something has no value then it is of type `void`.
In JavaScript the undefined value is of type `void`

i.e. A value `v` is of type `void` if `v === void 0`

Examples:

 - `void 0` is of type `void`
 - `undefined` is of type `void`
 - `(function () { /* no return statement */ }())` is of type `void`
 - `null` is not of type `void`

### The builtin `Any` type

Everything is of type `Any`

i.e. A value `v` is of type `Any` if `true`

Examples

 - `undefined` is of type `Any`
 - `"foo"` is of type `Any`
 - `null` is of type `Any`
 - `{ foo: 50 }` is of type `Any`

### The builtin `Array` type

Any javascript Array object is of type `Array`

i.e. A value `v` is of type `Array` if `Array.isArray(v)`

Examples:

 - `[1, 2, 3]` is of type `Array`
 - `new Array(10)` is of type `Array`
 - `{ length: 1, 1: 10 }` is not of type `Array`
 - `{ __proto__: Array.prototype }` is not of type `Array`

### The builtin `Error` type

Any javascript Error object is of type `Error`

i.e. A value `v` is of type `Error` if
    `{}.toString.call(v) === '[object Error]'`

Examples:

 - `new Error("foo")` is of type `Error`
 - `Error("foo")` is of type `Error`
 - `{ message: "foo" }` is not of type `Error`

### The builtin `Function` type

Any javascript function is of type `Function`

i.e. A value `v` is of type `Function` if `typeof v === 'function'`

Examples:

 - `Object.prototype.toString` is of type `Function`
 - `function () {}` is of type `Function`
 - `new Function("return 42")` is of type `Function`
 - `{ call: function () {} }` is not of type `Function`
