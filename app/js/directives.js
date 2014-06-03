'use strict';

/* Directives */

(function(){

    var app = angular.module('cleshFilm.directives', []).
        directive('appVersion', ['version', function(version) {
            return function(scope, elm, attrs) {
                elm.text(version);
            };
        }]);

    app.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);


    app.directive('imgCropped', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: { src:'=ngModel', selected:'&', aspectRatio:'=aspectRatio' },
            link: function(scope,element, attr) {
                var myImg;
                var jcrop_api;
                var clear = function() {
                    if (myImg) {
                        myImg.next().remove();
                        myImg.remove();
                        myImg = undefined;
                    }
                };
                var run = function (nv) {
                    clear();
                    if (nv) {
                        element.after('<img />');
                        myImg = element.next();
                        myImg.attr('src',nv);
                        var $myImg = $(myImg);
                        var $parent = $myImg.parent('div').css({'opacity':0});
                        //myImg.css({'display':'none'});
                        //myImg.attr('class',attr.class);
                        $myImg.Jcrop({
                            trackDocument: true,
                            onSelect: function(x) {
                                scope.$apply(function() {
                                    scope.selected({cords: x});
                                });
                            },
                            boxWidth: $parent.width()/*,
                            boxHeight: 600*/
                        }, function () {
                            jcrop_api = this;
                            $parent.css({'opacity':1});
                        });
                    }
                };
                scope.$watch(function () {
                    return scope.src;
                }, run);

                scope.$watch(function () {
                    return scope.aspectRatio;
                }, function (nv) {
                    if(!jcrop_api)
                        return;
                    jcrop_api.setOptions({ aspectRatio: nv });
                    jcrop_api.focus();
                });
                //attr.$observe('src', run);

                scope.$on('$destroy', clear);


                //run(attr.src);
            }
        };
    });


    app.directive('myCombobox', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                $scope.$on('dataloaded', function () {
                    $timeout(function () { // You might need this timeout to be sure its run after DOM render.

                        $(element).combobox({bsVersion: '3', menu: '<ul class="typeahead typeahead-long dropdown-menu dropdown-inverse my-dowpdown" role="menu"></ul>',
                            item : '<li rel="1" class=""><a tabindex="-1" href="#" class="active"><span class="pull-left"></span></a></li>',
                            template : function () {
                                return '<div class="combobox-container"> <input type="hidden" /> <div class="input-group open"> <input type="text" autocomplete="off" /> <span class="input-group-addon dropdown-toggle" data-dropdown="dropdown"> <span class="caret" /> <span class="glyphicon glyphicon-remove" /> </span> </div> </div>';
                            }
                        });

                    }, 0, false);
                })
            }
        };
    }]);

    app.directive('myDropdown', ['$timeout', function ($timeout) {
        return {
            link: function ($scope, element, attrs) {
                $scope.$on('dataloaded', function () {
                    $timeout(function () { // You might need this timeout to be sure its run after DOM render.

                        $(element).selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});

                    }, 0, false);
                })
            }
        };
    }]);

    app.directive('myGoupBtn', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './partials/widgets/goup-btn.html',
            link: function ($scope, element, attrs) {
                $(element).find('button').click(function () {
                    $('html, body').stop().animate({
                        scrollTop: 0
                    }, 800);
                });
            }
        };
    }]);

})();