var
  parse5 = require('parse5');

module.exports = Compressor;

function Compressor(options) {
  this.options = options || {};
}

Compressor.prototype = {

  apply: function(content) {
    var
      parser,
      output = '';

    parser = new parse5.SimpleApiParser({

      doctype: function(name, publicId, systemId) {
        var
          doctype;

        doctype = '<!DOCTYPE '
          + name
          + (publicId ? ' PUBLIC "' + publicId + '"' : '')
          + (!publicId && systemId ? ' SYSTEM' : '')
          + (systemId ? ' "' + systemId + '"' : '')
          + '>';

        output += doctype;
      },

      startTag: function(tag, attrs, unary) {
        var
          attrIndex,
          attrName,
          attrValue,
          classNameBuilder,
          classList,
          className,
          classIndex;

        output += '<' + tag;
        for (attrIndex = 0; attrIndex < attrs.length; attrIndex++) {
          attrName = attrs[attrIndex].name;
          if (/^(?:data-)?ng[:-]?[\w-]+$/i.test(attrName)) {
            continue;
          }
          attrValue = String(attrs[attrIndex].value || '');
          if (attrName == 'class') {
            classList = attrValue.split(/\s+/);
            classNameBuilder = [];
            for (classIndex = 0; classIndex < classList.length; classIndex++) {
              className = classList[classIndex];
              if (/^ng-(?:(?:isolate-)?scope|binding|animate)$/i.test(className)) {
                continue;
              }
              classNameBuilder.push(className);
            }
            attrValue = classNameBuilder.join(' ');
          }
          output += ' ' + attrName + '="' + attrValue + '"';
        }

        output += (unary ? '/' : '') + '>';
      },
      endTag: function(tag) {
        output += '</' + tag + '>';
      },
      text: function(text) {
        output += text;
      },
      comment: function(text) {
        output += '<!--' + text + '-->';
      }
    }, {
      decodeHtmlEntities: false
    });

    parser.parse(String(content || ''));

    return output;
  }

};
