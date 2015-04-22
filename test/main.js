var
  should = require('should'),
  HtmlAngularMinifier = require('..')
  ;

describe('impresser-html-angular-minifier', function () {
  it('should work', function() {
    var
      minifier = new HtmlAngularMinifier();

    should(minifier.apply('<input ng-model="model" class="ng-scope" required="required" />'))
      .equal('<input class="" required="required"/>');
  });

  //it('svg should work', function() {
  //  var
  //    minifier = new HtmlAngularMinifier();
  //
  //  should(minifier.apply('<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><g></g></svg>'))
  //    .equal('<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><g></g></svg>');
  //});

});