var Parsimmon = require('parsimmon');

var AST = require('../ast.js');
var join = require('./lib/join.js');

var objectKey = Parsimmon.regex(/[a-z]+/i)
    .skip(Parsimmon.string(':'))
    .skip(Parsimmon.optWhitespace)

var typeKeyValue = Parsimmon.lazy(function () {
    return objectKey
        .chain(function (keyName) {
            return typeDefinition
                .map(function (keyValue) {
                    return AST.keyValue(keyName, keyValue)
                })
        })
})

var typeKeyValues = join(
    typeKeyValue,
    Parsimmon.optWhitespace
        .then(Parsimmon.string(','))
        .then(Parsimmon.optWhitespace)
);

var typeObject = Parsimmon.string('{')
    .skip(Parsimmon.optWhitespace)
    .then(typeKeyValues)
    .skip(Parsimmon.optWhitespace)
    .skip(Parsimmon.string('}'))
    .map(function (values) {
        return AST.object(values)
    })

module.exports = typeObject;

var typeDefinition = require('./type-definition.js');