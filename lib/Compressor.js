var
  HTMLParser = require('html-minifier/dist/htmlminifier.js').HTMLParser;

module.exports = Compressor;

function Compressor(options) {
  this.options = options || {};
}

Compressor.prototype = {

  apply: function(content) {
    var
      output = '';

    content = String(content || '');

    new HTMLParser(content, {
      html5: typeof this.options.html5 !== 'undefined' ? this.options.html5 : true,

      start: function(tag, attrs, unary) {
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
          attrValue = String(attrs[attrIndex].escaped || '');
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
      end: function(tag) {
        output += '</' + tag + '>';
      },
      chars: function(text) {
        output += text;
      },
      comment: function(text) {
        output += '<!--' + text + '-->';
      },
      ignore: function(text) {
        output += text;
      },
      doctype: function(doctype) {
        output += doctype;
      }
    });

    return output;
  }

};
