'use strict';

var assert = require('assert');
var format = require('util').format;
var TypedError = require('error/typed');

var tryCatch = require('../../lib/try-catch.js');
var checkValue = require('../checkers/value.js');

var ExpectedFunctionArgIntersection = TypedError({
    type: 'expected.function.arg.intersection',
    message: 'expected {description} to be a intersection.\n' +
        'expected one of: \n' +
        '{intersections}\n' +
        'value is {value}.\n'
});

var ExpectedFunctionResultIntersection = TypedError({
    type: 'expected.function.result.intersection',
    message: 'expected {description} to be a intersection.\n' +
        'expected one of: \n' +
        '{intersections}\n' +
        'instead got type {typeof}.\n' +
        'value is {value}.\n'
});

module.exports = wrapUnionType;

function wrapUnionType(expr, value, name) {
    var intersections = expr.intersections;

    var types = intersections.map(function getType(un) {
        return un.type;
    });

    assert(types.every(function check(type) {
        return type === 'function';
    }), 'union must consist of functions');

    return function wrapped() {
        var args = [].slice.call(arguments);

        var tuples = expr.intersections.map(function checkAll(union) {
            var expectedArgs = union.args;

            return tryCatch(function catchIt() {
                expectedArgs.forEach(function checkArg(v, i) {
                    var description = format('argument %d of `%s()`',
                        i, name
                    );

                    checkValue(v, args[i], description);
                });
            });
        });

        var errors = tuples.map(function indexZero(t) {
            return t[0];
        }).filter(Boolean);

        if (errors.length === expr.intersections.length) {
            var messages = errors.map(function msg(err) {
                return err.message;
            }).join('\n');

            throw ExpectedFunctionArgIntersection({
                value: arguments,
                description: name,
                intersections: messages,
                errors: errors
            });
        }

        var result = value.apply(this, args);

        // TODO the result must be at the same index as
        // the parameters
        var tuples2 = expr.intersections.map(function checkAll(union) {
            var desc = format('return value of %s()', name);
            var expectedResult = union.result;
            return tryCatch(function catchIt() {
                checkValue(expectedResult, result, desc);
            });
        });

        var errors2 = tuples2.map(function indexZero(t) {
            return t[0];
        }).filter(Boolean);

        if (errors2.length === expr.intersections.length) {
            var messages2 = errors2.map(function msg(err) {
                return err.message;
            }).join('\n');

            throw ExpectedFunctionResultIntersection({
                typeof: typeof result,
                value: result,
                description: name,
                intersections: messages2,
                errors: errors2
            });
        }

        return result;
    };
}
