angular-taglist
===============

An Angular directive for editing lists of freeform tags.  Inspired by [xoxco's jQuery plugin](https://github.com/xoxco/jQuery-Tags-Input).

Instructions
------------

Download this github repo and include it in your code.  We're also available on bower (as 'angular-taglist').

Include 'angular_taglist_directive' as a dependency in your angular module.

Drop a `taglist` tag into your HTML surrounding an `input`:

    <taglist tag-data="my_tag_array"><input/></taglist>

If you want more control over the `<input>` tag in the tag list (for example, to add form validation or to set placeholder text), go for it:

    <taglist tag-data="my_tag_array"><input ng-required="my_tag_array.length==0"/></taglist>

Some basic examples are [on Plunker](http://plnkr.co/edit/0vzZsn70SGQkIKKZoVEP?p=preview).

With Typeahead
--------------

Angular-taglist should work well with a typeahead plugin such as the one in angular-ui-bootstrap.  If you make your angular app depend on ui.bootstrap:

    <script>
      angular.module('test', ['angular_taglist_directive','ui.bootstrap'])
      .controller('testController', ['$scope', function($scope) {
        $scope.colors = ["white","black","red","orange","yellow","green","blue","purple","violet","indigo","brown","gray","amber","chartreuse"];
        $scope.tags1 = [];
      }]);
    </script>
    
...and use the typeahead attribute from ui-bootstrap on your input:

    <taglist tag-data="tags1" taglist-blur-timeout="250">
      <input ng-model="selected1" typeahead="color for color in colors | filter:$viewValue"/>
    </taglist>

...you should get a popup suggesting values for your tags.  (The taglist-blur-timeout attribute handles the 
click on one of the popup values - we want to give that the typeahead plugin a little time
to finish before we grab the value that it inserted.)

Versions
--------
* 0.0.x - initial versions
* 0.1.0 - rewrite & cleanup; all taglist attrs other than tag-data dropped in favor of giving direct access to the 'input' tag
* 0.1.5 - added taglist-blur-timeout attribute to support autosuggested tags
