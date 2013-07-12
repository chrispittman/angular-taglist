var angular_taglist_directive = angular.module('angular_taglist_directive', []);

angular_taglist_directive.directive('taglist', function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: {tags: '=tagData', taglistClass: '@taglistclass', tagitemClass: '@tagitemclass'},
        template: '<div class="taglist {{taglistClass}}">\
        <span class="tag {{tagitemClass}}" data-ng-repeat="tag in tags">\
        <a href data-ng-click="tags.splice($index, 1)">x</a> <span>{{tag}}</span></span>\
        <input/><div class="tags_clear"></div></div>',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                element[0].getElementsByTagName('input')[0].focus();
            });
            var input = angular.element(element[0].getElementsByTagName('input')[0]);
            input.bind('blur', function () {
                addTag(this);
            }).bind('keydown', function (evt) {
            	if (evt.altKey || evt.metaKey || evt.ctrlKey || evt.shiftKey) {
            		return;
                }
                if (evt.which==188 || evt.which==13) { // 188 = comma, 13 = return
                    evt.preventDefault();
                    addTag(this);
                } else if (evt.which==8 /* 8 = delete */
                     && this.value.trim().length == 0
                     && element[0].getElementsByClassName('tag').length > 0) {
                    evt.preventDefault();
                    scope.$apply(function () {
                        scope.tags.splice(scope.tags.length-1,1);
                    });
                }
            });

            function addTag(element) {
                if (!scope.tags) {
                    scope.tags = [];
                }
                var val = element.value.trim();
                if (val.length == 0) {
                    return;
                }
                if (scope.tags.indexOf(val) >= 0) {
                    return;
                }
                scope.$apply(function () {
                    scope.tags.push(val);
                    element.value = "";
                });
            }
        }
    }
});
