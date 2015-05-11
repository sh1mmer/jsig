'use strict';

var test = require('tape');
var path = require('path');

var compile = require('../../bin/type-check.js');

test('compile good example 1', function t(assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'good-example-1.js');

    compile({
        _: [file]
    }, function onCompiled(err, meta) {
        assert.ifError(err);

        assert.ok(meta);

        var identifiers = meta.currentMeta.identifiers;

        assert.ok(meta && identifiers.require);
        assert.ok(meta && identifiers.sum);

        assert.end();
    });
});

test('compile bad example 1', function t(assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'bad-example-1.js');

    compile({
        _: [file]
    }, function onMeta(err, meta) {
        assert.ok(err);

        assert.equal(err.message,
            'Expected to get a string but found Number');

        assert.end();
    });
});

test('compile bad example 2', function t(assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'bad-example-2.js');

    compile({
        _: [file]
    }, function onMeta(err, meta) {
        assert.ok(err);

        assert.equal(err.message,
            'Expected to get a string but found Number');

        assert.end();
    });
});

test('compile bad example 3', function t(assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'bad-example-3.js');

    compile({
        _: [file]
    }, function onMeta(err, meta) {
        assert.ok(err);

        assert.equal(err.message,
            'Expected call expression to have 2 number of ' +
                'args but found 1 args');

        assert.end();
    });
});

test('compile good example 2', function t(assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'good-example-2.js');

    compile({
        _: [file]
    }, function onCompiled(err, meta) {
        assert.ifError(err);

        assert.ok(meta);

        var identifiers = meta.currentMeta.identifiers;

        assert.ok(meta && identifiers.require);
        assert.ok(meta && identifiers.value);

        assert.end();
    });
});

test('compile bad example 4', function t(assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'bad-example-4.js');

    compile({
        _: [file]
    }, function onMeta(err, meta) {
        assert.ok(err);

        assert.equal(err.message,
            'Expected to get a string but found Number');

        assert.end();
    });
});

test('compile bad example 5', function t(assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'bad-example-5.js');

    compile({
        _: [file]
    }, function onMeta(err, meta) {
        assert.ok(err);

        assert.equal(err.message,
            'Expected to get a string but found Number');

        assert.end();
    });
});

test('compile bad example 6', function t(assert) {
    var file = path.join(__dirname, '..',
        'fixtures', 'simple-runtime', 'bad-example-6.js');

    compile({
        _: [file]
    }, function onMeta(err, meta) {
        assert.ok(err);

        assert.equal(err.message,
            'Expected to get a string but found Number');

        assert.end();
    });
});
