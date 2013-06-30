var angular_taglist_directive = angular.module('angular_taglist_directive', []);

angular_taglist_directive.directive('taglist', function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: {tags: '=tagData', taglistClass: '@taglistclass', tagitemClass: '@tagitemclass'},
        template: '<div data-ng-class="custom_taglist_class"><span data-ng-class="custom_tag_class" data-ng-repeat="tag in tags"><a href data-ng-click="deleteTag(tag)">x</a> <span>{{tag}}</span></span><input/><div class="tags_clear"></div></div>',
        controller: ['$scope', function ($scope) {
            $scope.deleteTag = function (tag) {
                for (var posn = 0; posn < $scope.tags.length; posn++) {
                    if ($scope.tags[posn] === tag) {
                        $scope.tags.splice(posn, 1);
                    }
                }
            };

            $scope.$watch('tagitemClass', function() {
                $scope.custom_tag_class = $scope.tagitemClass ? "tag "+$scope.tagitemClass : "tag";
            });
            $scope.$watch('taglistClass', function() {
                $scope.custom_taglist_class = $scope.taglistClass ? "taglist "+$scope.taglistClass : "taglist";
            })
        }],
        link: function (scope, element, attrs) {
            input = angular.element(element[0].children[element[0].children.length - 2]);
            element.bind('click', function () {
                var input = this.children[this.children.length - 2];
                input.focus();
            });
            input.bind('blur', function () {
                addTag(this)
            });
            input.bind('keydown', function (evt) {
                if (isAddDelimeter(evt)) {
                    evt.preventDefault();
                    addTag(this);
                } else if (isDeleteDelimiter(evt) && this.value.trim().length == 0) {
                    evt.preventDefault();
                    var maindiv = angular.element(this).parent()[0];
                    var taglist = angular.element(maindiv).children();
                    if (taglist.length <= 2) {
                        return;
                    }
                    deleteTagElement(angular.element(taglist[taglist.length - 3]));
                }
            });

            function isAddDelimeter(event) {
                if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) {
                    return false;
                }
                return event.which == 188 // comma
                    || event.which == 13; // return
            }

            function isDeleteDelimiter(event) {
                if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) {
                    return false;
                }
                return event.which == 8; // delete
            }

            function addTag(element) {
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

            function deleteTagElement(element) {
                var text = element.children()[1].textContent;
                scope.$apply(function () {
                    for (var posn = 0; posn < scope.tags.length; posn++) {
                        if (scope.tags[posn] === text) {
                            scope.tags.splice(posn, 1);
                        }
                    }
                });
            }
        }
    }
});
