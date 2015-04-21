var
  should = require('should'),
  HtmlAngularMinify = require('..')
  ;

describe('impress-html-angular-minify', function () {
  it('should work', function() {
    var
      minify = new HtmlAngularMinify();

    should(minify.apply('<input ng-model="model" class="ng-scope" required="required" />')).equal('<input class="" required="required"/>');
  });
});