'use strict';

var fs = require('fs');

var parser = require('../parser.js');

module.exports = toSchema;

function toSchema(opts, cb) {
    if (opts.jsig) {
        onJsig(null, opts.jsig);
    } else if (opts.path) {
        fs.readFile(opts.path, 'utf8', onJsig);
    } else {
        throw new Error('must pass opts.uri or opts.jsig');
    }

    function onJsig(err, content) {
        if (err) {
            return cb(err);
        }

        parser(content, onAST);
    }

    function onAST(err, ast) {
        if (err) {
            return cb(err);
        }

        cb(null, toJSONSchema(ast));
    }
}
