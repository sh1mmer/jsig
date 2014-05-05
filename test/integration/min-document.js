var test = require('tape');
var fs = require('fs')
var path = require('path')

// var showDiff = require('../lib/show-diff.js')

var parse = require('../../parser.js');
var AST = require('../../ast.js')

var uri = path.join(__dirname, 'min-document.mli')
var content = fs.readFileSync(uri, 'utf8')

var ASTFixture = AST.program([
    AST.typeDeclaration('DOMText', AST.object({
        'data': AST.literal('String'),
        'type':
            AST.value('DOMTextNode', 'string'),
        'length': AST.literal('Number'),
        'nodeType': AST.value('3', 'number'),
        'toString': AST.functionType({
            result: AST.literal('String'),
            thisArg: AST.literal('DOMText', 'this')
        }),
        'replaceChild': AST.functionType({
            args: [
                AST.literal('Number', 'index'),
                AST.literal('Number', 'length'),
                AST.literal('String', 'value')
            ],
            result: AST.literal('void'),
            thisArg: AST.literal('DOMText', 'this')
        })
    })),
    AST.typeDeclaration('DOMNode', AST.union([
        AST.literal('DOMText'),
        AST.literal('DOMElement'),
        AST.literal('DocumentFragment')
    ])),
    AST.typeDeclaration('DOMChild', AST.union([
        AST.literal('DOMText'),
        AST.literal('DOMElement')
    ])),
    AST.typeDeclaration('DOMElement', AST.object({
        'tagName': AST.literal('String'),
        'className': AST.literal('String'),
        'dataset': AST.generic(
            AST.literal('Object'),
            [ AST.literal('String'), AST.literal('Any') ]
        ),
        'childNodes': AST.generic(
            AST.literal('Array'),
            [ AST.literal('DOMChild') ]
        ),
        'parentNode': AST.union([
            AST.value('null'),
            AST.literal('DOMElement')
        ]),
        'style': AST.generic(
            AST.literal('Object'),
            [ AST.literal('String'), AST.literal('String') ]
        ),
        'type': AST.value('DOMElement', 'string'),
        'nodeType': AST.value('1', 'number'),
        'ownerDocument': AST.union([
            AST.value('null'),
            AST.literal('Document')
        ]),
        'namespaceURI': AST.union([
            AST.value('null'),
            AST.literal('String')
        ]),
        'appendChild': AST.functionType({
            args: [ AST.literal('DOMChild', 'child') ],
            result: AST.literal('DOMChild'),
            thisArg: AST.literal('DOMElement', 'this')
        }),
        'replaceChild': AST.functionType({
            args: [
                AST.literal('DOMChild', 'elem'),
                AST.literal('DOMChild', 'needle')
            ],
            result: AST.literal('DOMChild'),
            thisArg: AST.literal('DOMElement', 'this')
        }),
        'removeChild': AST.functionType({
            args: [ AST.literal('DOMChild', 'child') ],
            result: AST.literal('DOMChild'),
            thisArg: AST.literal('DOMElement', 'this')
        }),
        'insertBefore': AST.functionType({
            args: [
                AST.literal('DOMChild', 'elem'),
                AST.union([
                    AST.literal('DOMChild'),
                    AST.value('null'),
                    AST.literal('undefined')
                ], 'needle')
            ],
            result: AST.literal('DOMChild'),
            thisArg: AST.literal('DOMElement', 'this')
        }),
        'addEventListener': AST.literal('addEventListener'),
        'dispatchEvent': AST.literal('dispatchEvent'),
        'focus': AST.functionType({
            result: AST.literal('void'),
            thisArg: AST.literal('DOMElement', 'this')
        }),
        'toString': AST.functionType({
            result: AST.literal('String'),
            thisArg: AST.literal('DOMElement', 'this')
        })
    })),
    AST.typeDeclaration('DocumentFragment', AST.object({
        'childNodes': AST.generic(
            AST.literal('Array'),
            [ AST.literal('DOMChild') ]
        ),
        'parentNode': AST.union([
            AST.value('null'),
            AST.literal('DOMElement')
        ]),
        'type': AST.value('DocumentFragment', 'string'),
        'nodeType': AST.value('11', 'number'),
        'nodeName': AST.value('#document-fragment', 'string'),
        'ownerDocument': AST.union([
            AST.literal('Document'),
            AST.value('null')
        ]),
        'appendChild': AST.functionType({
            args: [AST.literal('DOMChild', 'child')],
            result: AST.literal('DOMChild'),
            thisArg: AST.literal('DocumentFragment', 'this')
        }),
        'replaceChild': AST.functionType({
            args: [
                AST.literal('DOMChild', 'elem'),
                AST.literal('DOMChild', 'needle')
            ],
            result: AST.literal('DOMChild'),
            thisArg: AST.literal('DocumentFragment', 'this')
        }),
        'removeChild': AST.functionType({
            args: [ AST.literal('DOMChild', 'child') ],
            result: AST.literal('DOMChild'),
            thisArg: AST.literal('DocumentFragment', 'this')
        }),
        'toString': AST.functionType({
            result: AST.literal('String'),
            thisArg: AST.literal('DocumentFragment', 'this')
        })
    }))
])

// labeled unions dont parse properly
test('the min-document type definition', function (assert) {
    var result = parse(content)

    // showDiff(result, ASTFixture)
    assert.deepEqual(result, ASTFixture)


    assert.end()
})
