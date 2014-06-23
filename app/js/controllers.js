'use strict';

/* Controllers */

(function(){

    var app = angular.module('cleshFilm.controllers', [ 'truncate', 'angularFileUpload' ]);

    app.controller('HatCtr', ['$scope', '$route', function($scope,$route) {
        var self = this;
        self.activeTab = undefined;

        $scope.$on('$routeChangeSuccess', function(event,current) {
            self.activeTab = current.$$route === undefined ? undefined : current.$$route.activeTab;
        });

        self.isActive = function(tabName)
        {
            return tabName == self.activeTab;
        };
    }]);

    app.controller('HomePageCtrl', ['$scope', function($scope) {

    }]);

    app.controller('MoviePageCtrl', ['$scope', '$http', '$timeout', 'Movie', function($scope,$http,$timeout,Movie) {
        var self = this;
        self.movies = Movie.query();
        // This is what you will bind the filter to
        self.filterSearchQuery = '';


        // Instantiate these variables outside the watch
        var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
        $scope.$watch('searchQuery', function (val) {
            if (filterSearchQueryTimeout)
                $timeout.cancel(filterSearchQueryTimeout);

            tmpFilterSearchQuery = val;

            filterSearchQueryTimeout = $timeout(function() {
                self.filterSearchQuery = tmpFilterSearchQuery;
            }, 250); // delay 250 ms
        });

        self.getRowMoviesNum = function () {
            return 4;
        };

        self.calculateIndex = function (index, parent) {
            return index + parent * self.getRowMoviesNum();
        };

        self.removeMovie = function (index) {
            //$scope.movies.splice(index,1);
            //$scope.movies.push({ name: 'new', thumbUrl: 'lool'});
            //console.log(self.movies[index].name);
            self.movies[index].$delete();
            self.movies.splice(index,1);
        };


    }]);

    app.controller('MovieEditCtrl', ['$scope', '$http', '$routeParams', 'Movie', function($scope,$http,$routeParams,Movie) {
        var self = this;
        //self.movieId = $routeParams.movieId;
        self.movie = Movie.get({id:$routeParams.movieId});
    }]);

    app.controller('MovieAddSuccessCtrl', ['$scope', '$http', '$routeParams', 'Movie', function ($scope, $http, $routeParams,Movie) {
        var self = this;
        $scope.movie = Movie.get({id:$routeParams.movieId});
    }]);


    app.controller('MovieAddFormCtrl',['$scope', '$http', '$routeParams', '$location', '$timeout', '$filter','Movie',
        function ($scope, $http, $routeParams, $location, $timeout, $filter, Movie)
        {
            var self = this;


            self.isSuccessMsgVisible = false;
            self.showMovieImageContainer = true;
            self.showScreenImageContainer = true;
            self.showLoadMoreBtn = true;
            self.filterImageSearchQuery = '';
            self.formattedDate = {
              'movieYear' : null
            };



            self.initMovie = function () {
                self.movie = new Movie();
                self.movie.countries = [{}];
                self.movie.genres = [{}];
                self.movie.crew = [{}];
                self.movie.awards = [{}];
            };

            self.initMovie();

            var oldMovieYear = undefined;
            $scope.$watch('movieAddFormCtrl.movie.year', function (nv) {

                if(nv == oldMovieYear)
                    return;

                nv = $filter('date')(nv,'yyyy');
                self.movie.year = nv;
                oldMovieYear = nv;
            });

            var oldMovieWorldPremiere = undefined;
            $scope.$watch('movieAddFormCtrl.movie.worldPremiere', function (nv) {

                if(nv == oldMovieWorldPremiere)
                    return;

                nv = $filter('date')(nv,'dd-MM-yyyy');
                self.movie.worldPremiere = nv;
                oldMovieWorldPremiere = nv;
            });

            var oldMovieRussiaPremiere = undefined;
            $scope.$watch('movieAddFormCtrl.movie.russiaPremiere', function (nv) {

                if(nv == oldMovieRussiaPremiere)
                    return;

                nv = $filter('date')(nv,'dd-MM-yyyy');
                self.movie.russiaPremiere = nv;
                oldMovieRussiaPremiere = nv;
            });

            var oldMovieRussiaRelease = undefined;
            $scope.$watch('movieAddFormCtrl.movie.russiaRelease', function (nv) {

                if(nv == oldMovieRussiaRelease)
                    return;

                nv = $filter('date')(nv,'dd-MM-yyyy');
                self.movie.russiaRelease = nv;
                oldMovieRussiaRelease = nv;
            });

            var oldMovieRussiaBlueRayRelease = undefined;
            $scope.$watch('movieAddFormCtrl.movie.russiaBlueRayRelease', function (nv) {

                if(nv == oldMovieRussiaBlueRayRelease)
                    return;

                nv = $filter('date')(nv,'dd-MM-yyyy');
                self.movie.russiaBlueRayRelease = nv;
                oldMovieRussiaBlueRayRelease = nv;
            });




            /*$http.get('./json/all-professions-list.json').success(function (data) {
                self.professions = data;
                self.broadcastDataLoaded();
            });

            $http.get('./json/all-stuff-list.json').success(function (data) {
                self.staff = data;
                self.broadcastDataLoaded();
            });*/


            // Instantiate these variables outside the watch
            var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
            $scope.$watch('imageSearchQuery', function (val) {
                if (filterSearchQueryTimeout)
                    $timeout.cancel(filterSearchQueryTimeout);

                tmpFilterSearchQuery = val;

                filterSearchQueryTimeout = $timeout(function() {
                    self.filterImageSearchQuery = tmpFilterSearchQuery;
                }, 250); // delay 250 ms
            });

            self.addStaffMember = function () {
                self.movie.crew.push({ });
                $timeout(function () {
                    //self.broadcastDataLoaded();
                },0,false);
            };

            self.addAward = function () {
                self.movie.awards.push({  });
                $timeout(function () {
                    //self.broadcastDataLoaded();
                },0,false);
            };


            self.addCountry = function () {
                self.movie.countries.push({  });
            };

            self.addGenre = function () {
                self.movie.genres.push({  });
            };

            self.removeStaffMember = function (index) {
              self.movie.crew.splice(index,1);
            };

            self.removeAward = function (index) {
              self.movie.awards.splice(index,1);
            };

            self.removeCountry = function (index) {
              self.movie.countries.splice(index,1);
            };

            self.removeGenre = function (index) {
              self.movie.genres.splice(index,1);
            };

            /*self.broadcastDataLoaded = function () {
                if(!self.professions.length || !self.staff.length)
                    return;
                $scope.$broadcast('dataloaded');
            };*/

            self.getRowNum = function () {
                return 3;
            };

            self.chooseMovieImg = function () {
                self.showMovieImageContainer = false;
                $scope.addMovieForm.$setDirty();
            };

            self.chooseScreenImg = function () {
                self.showScreenImageContainer = false;
                $scope.addMovieForm.$setDirty();
            };

            /*self.onTimeSet = function (targetName , newDate) {
                console.log(newDate);
                $scope.addMovieForm[targetName] = newDate;
                //console.log(oldDate);
            };*/

            /*self.chooseImg = function (id) {
                var tmpImg = $filter('filter')(self.images, { "id": id }, true)[0];
                //self.movie.image = $filter('filter')(self.images, { "id": id }, true)[0];
                self.movie.imageId = id;
                self.toggleImageContainer();
                self.tmpData.imagePreViewUrl = tmpImg.thumbUrl;
                $scope.addMovieForm.$setDirty();
                //$scope.addMovieForm.movieImageId.$setValidity('required', true);
                //console.log(self.movie.image);
            };*/

            /*self.refreshImagesList = function () {
                $http.get('./json/all-images-list.json').success(function (data) {
                    self.images = data;
                    self.showLoadMoreBtn = true;
                });
            };*/

            /*self.loadMoreImages = function () {
                $http.get('./json/additional-images-list.json').success(function (data) {
                    //self.images = data;
                    for(var i =0; i != data.length; i++)
                    {
                        self.images.push(data[i]);
                    }
                    self.showLoadMoreBtn = false;
                });
            };*/

            /*self.toggleImageContainer = function () {
                var $cont = $('#imagesContainer');
                if(self.showImageContainer)
                {
                    $cont.slideUp("slow");
                    self.showImageContainer = false;
                    return;
                }
                $cont.slideDown("slow");
                self.showImageContainer = true;
            };*/

            self.showSuccessMsg = function (id) {
                self.isSuccessMsgVisible = true;

                $timeout(function () {
                    self.isSuccessMsgVisible = false;
                },3000);
            };

            self.submitForm = function () {
                console.log("Form submit");
                self.movie.$save().then(function () {
                    self.showScreenImageContainer = true;
                    self.showMovieImageContainer = true;
                    self.initMovie();
                    self.showSuccessMsg();
                });
                //$location.path("movies/add/success/"+self.movie.id);
            };

            //self.refreshImagesList();

            //$("select[name='herolist']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
            //$('#imagesContainer').slideUp();
    }]);


    app.controller('MovieEditFormCtrl',['$scope', '$http', '$routeParams', '$location', '$timeout', '$filter','Movie',
        function ($scope, $http, $routeParams, $location, $timeout, $filter, Movie)
        {
            var self = this;

            self.isSuccessMsgVisible = false;
            self.showMovieImageContainer = false;
            self.showScreenImageContainer = false;
            self.showLoadMoreBtn = true;
            self.filterImageSearchQuery = '';
            self.formattedDate = {
                'movieYear' : null
            };

            self.initMovie = function () {
                self.movie = new Movie.get({"id":$routeParams.movieId});
                //self.movie.crew = [{}];
                //self.movie.awards = [{}];
            };

            self.initMovie();

            var oldMovieYear = undefined;
            $scope.$watch('movieAddFormCtrl.movie.year', function (nv) {

                if(nv == oldMovieYear)
                    return;

                nv = $filter('date')(nv,'yyyy');
                self.movie.year = nv;
                oldMovieYear = nv;
            });

            var oldMovieWorldPremiere = undefined;
            $scope.$watch('movieAddFormCtrl.movie.worldPremiere', function (nv) {

                if(nv == oldMovieWorldPremiere)
                    return;

                nv = $filter('date')(nv,'dd-MM-yyyy');
                self.movie.worldPremiere = nv;
                oldMovieWorldPremiere = nv;
            });

            var oldMovieRussiaPremiere = undefined;
            $scope.$watch('movieAddFormCtrl.movie.russiaPremiere', function (nv) {

                if(nv == oldMovieRussiaPremiere)
                    return;

                nv = $filter('date')(nv,'dd-MM-yyyy');
                self.movie.russiaPremiere = nv;
                oldMovieRussiaPremiere = nv;
            });

            var oldMovieRussiaRelease = undefined;
            $scope.$watch('movieAddFormCtrl.movie.russiaRelease', function (nv) {

                if(nv == oldMovieRussiaRelease)
                    return;

                nv = $filter('date')(nv,'dd-MM-yyyy');
                self.movie.russiaRelease = nv;
                oldMovieRussiaRelease = nv;
            });

            var oldMovieRussiaBlueRayRelease = undefined;
            $scope.$watch('movieAddFormCtrl.movie.russiaBlueRayRelease', function (nv) {

                if(nv == oldMovieRussiaBlueRayRelease)
                    return;

                nv = $filter('date')(nv,'dd-MM-yyyy');
                self.movie.russiaBlueRayRelease = nv;
                oldMovieRussiaBlueRayRelease = nv;
            });


            // Instantiate these variables outside the watch
            var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
            $scope.$watch('imageSearchQuery', function (val) {
                if (filterSearchQueryTimeout)
                    $timeout.cancel(filterSearchQueryTimeout);

                tmpFilterSearchQuery = val;

                filterSearchQueryTimeout = $timeout(function() {
                    self.filterImageSearchQuery = tmpFilterSearchQuery;
                }, 250); // delay 250 ms
            });

            self.addStaffMember = function () {
                self.movie.crew.push({ });
                $timeout(function () {
                    //self.broadcastDataLoaded();
                },0,false);
            };

            self.addAward = function () {
                self.movie.awards.push({  });
                $timeout(function () {
                    //self.broadcastDataLoaded();
                },0,false);
            };

            self.removeStaffMember = function (index) {
                self.movie.crew.splice(index,1);
            };

            self.removeAward = function (index) {
                self.movie.awards.splice(index,1);
            };

            self.getRowNum = function () {
                return 3;
            };

            self.chooseMovieImg = function () {
                self.showMovieImageContainer = false;
                $scope.addMovieForm.$setDirty();
            };

            self.chooseScreenImg = function () {
                self.showScreenImageContainer = false;
                $scope.addMovieForm.$setDirty();
            };


            self.showSuccessMsg = function (id) {
                self.isSuccessMsgVisible = true;

                $timeout(function () {
                    self.isSuccessMsgVisible = false;
                },3000);
            };

            self.submitForm = function () {
                console.log("Form submit");
                self.movie.$update().then(function () {
                    //self.showScreenImageContainer = true;
                    //self.showMovieImageContainer = true;
                    //self.initMovie();
                    self.showSuccessMsg();
                });
                //$location.path("movies/add/success/"+self.movie.id);
            };

        }]);


    app.controller('ImagesPageCtrl', ['$scope', '$http', '$timeout', 'Image', function($scope,$http,$timeout,Image) {
        var self = this;
        self.images = [];
        // This is what you will bind the filter to
        self.filterSearchQuery = '';

        self.images = Image.query(function () {
            console.log("Query callback",self.images.length);
        });

        /*$http.get('/app/json/all-images-list.json').success(function(data){
            self.images = data;
            //$scope.movies = data;
        });*/

        /*$http.get('/app/json/all-movies-list.json').success(function(data){
         self.movies = data;
         //$scope.movies = data;
         });*/



        // Instantiate these variables outside the watch
        var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
        $scope.$watch('searchQuery', function (val) {
            if (filterSearchQueryTimeout)
                $timeout.cancel(filterSearchQueryTimeout);

            tmpFilterSearchQuery = val;

            filterSearchQueryTimeout = $timeout(function() {
                self.filterSearchQuery = tmpFilterSearchQuery;
            }, 250); // delay 250 ms
        });

        self.getRowNum = function () {
            return 3;
        };

        self.calculateIndex = function (index, parent) {
            return index + parent * self.getRowNum();
        };

        self.removeImage = function (index) {
            //$scope.movies.splice(index,1);
            //$scope.movies.push({ name: 'new', thumbUrl: 'lool'});
            //console.log(self.movies[index].name);
            self.images[index].$remove();
            self.images.splice(index,1);
        };


    }]);


    app.controller('ImageEditCtrl', ['$scope', '$http', '$routeParams', '$sce', '$filter', function($scope,$http,$routeParams,$sce,$filter) {
        var self = this;
        self.imageId = $routeParams.imageId;
        //var tmp = $sce.trustAsUrl($filter('doubleDecodeUri')($routeParams.returnPath));
        self.returnPath = $routeParams.returnPath || '#/images';
        self.image = { };

        $http.get('./json/super-girl-image.json').success(function (data) {
            self.image = data;
        });

        $scope.selected = function(x) {
            console.log("selected",x);
        };

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

    }]);


    app.controller('ImageUploadCtrl', function ($scope, $fileUploader, ENV) {
        // Creates a uploader
        var uploader = $scope.uploader = $fileUploader.create({
            scope: $scope,
            url: ENV.CONFIG.IMAGE.ADD_URL
        });


        // ADDING FILTERS

        // Images only
        uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
            var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
            type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        });


        // REGISTER HANDLERS

        uploader.bind('afteraddingfile', function (event, item) {
            console.info('After adding a file', item);
        });

        uploader.bind('whenaddingfilefailed', function (event, item) {
            console.info('When adding a file failed', item);
        });

        uploader.bind('afteraddingall', function (event, items) {
            console.info('After adding all files', items);
        });

        uploader.bind('beforeupload', function (event, item) {
            console.info('Before upload', item);
        });

        uploader.bind('progress', function (event, item, progress) {
            console.info('Progress: ' + progress, item);
        });

        uploader.bind('success', function (event, xhr, item, response) {
            console.info('Success', xhr, item, response);
        });

        uploader.bind('cancel', function (event, xhr, item) {
            console.info('Cancel', xhr, item);
        });

        uploader.bind('error', function (event, xhr, item, response) {
            console.info('Error', xhr, item, response);
        });

        uploader.bind('complete', function (event, xhr, item, response) {
            console.info('Complete', xhr, item, response);
        });

        uploader.bind('progressall', function (event, progress) {
            console.info('Total progress: ' + progress);
        });

        uploader.bind('completeall', function (event, items) {
            console.info('Complete all', items);
        });
    });


    app.controller('ImageInputCtrl', ['$scope', '$http', '$routeParams', '$timeout', '$filter', 'Image', function ($scope, $http, $routeParams, $timeout, $filter, Image) {
        var self = this;
        self.$scope = $scope;
        self.$scope.images = [];
        self.$scope.showLoadMoreBtn = false;

        $scope.getRowNum = function () {
            return 3;
        };

        $scope.chooseImg = function (image) {
            //var tmpImg = $filter('filter')(self.images, { "id": id }, true)[0];
            self.$scope.selectedImage = image;
            self.$scope.dChosenFun();
            //self.toggleImageContainer();
            //self.tmpData.imagePreViewUrl = tmpImg.thumbUrl;
            //$scope.addMovieForm.$setDirty();
        };

        $scope.refreshImagesList = function () {
            self.$scope.images = Image.query(function (data) {
                console.log(data);
                self.$scope.showLoadMoreBtn = false;
            });
        };

        /*$scope.loadMoreImages = function () {
            $http.get('./json/additional-images-list.json').success(function (data) {
                //self.images = data;
                for(var i =0; i != data.length; i++)
                {
                    self.images.push(data[i]);
                }
                self.showLoadMoreBtn = false;
            });
        };*/


        // Instantiate these variables outside the watch
        var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
        $scope.$watch('imageSearchQuery', function (val) {
            if (filterSearchQueryTimeout)
                $timeout.cancel(filterSearchQueryTimeout);

            tmpFilterSearchQuery = val;

            filterSearchQueryTimeout = $timeout(function() {
                self.$scope.filterImageSearchQuery = tmpFilterSearchQuery;
            }, 250); // delay 250 ms
        });

        $scope.refreshImagesList();
    }]);


    app.controller('ProfessionsPageCtrl', ['$scope', '$http', '$timeout', 'Profession', function($scope,$http,$timeout,Profession) {
        var self = this;
        self.professions = [];
        // This is what you will bind the filter to
        self.filterSearchQuery = '';

        self.professions = Profession.query();
        //self.professions.push(Profession.get({id:1}));


        // Instantiate these variables outside the watch
        var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
        $scope.$watch('searchQuery', function (val) {
            if (filterSearchQueryTimeout)
                $timeout.cancel(filterSearchQueryTimeout);

            tmpFilterSearchQuery = val;

            filterSearchQueryTimeout = $timeout(function() {
                self.filterSearchQuery = tmpFilterSearchQuery;
            }, 250); // delay 250 ms
        });


        self.removeProfession = function (index) {
            //console.log(self.professions[index]);
            self.professions[index].$remove();
            self.professions.splice(index,1);
        };


    }]);


    app.controller('ProfessionsInputCtrl', ['$scope', '$http', '$routeParams', 'Profession', function ($scope, $http, $routeParams, Profession) {
        var self = this;
        self.$scope = $scope;
        self.$scope.professions = Profession.query(function()
        {
            self.$scope.$broadcast('dataloaded');
        });
    }]);


    app.controller('ProfessionAddFormCtrl',['$scope', '$http', '$routeParams', '$location', '$timeout', '$filter', 'Profession',
        function ($scope, $http, $routeParams, $location, $timeout, $filter, Profession)
        {

            var self = this;

            self.isSuccessMsgVisible = false;

            console.log('Page reloaded');

            /*self.profession = {
                name : null
            };*/

            self.profession = new Profession();

            self.submitForm = function () {
                console.log("Form submit start");
                //console.log(self.profession);
                self.profession.$save().then(self.showSuccessMsg);

                //self.showForm = false;
                //self.movie.id = "1";
                //$location.path("movies/add/success/"+self.movie.id);
            };

            self.showSuccessMsg = function (id) {
                console.log('Show msg');
                self.isSuccessMsgVisible = true;
                $timeout(function () {
                    console.log('Hide msg');
                    self.isSuccessMsgVisible = false;
                },3000);
            };

            //self.refreshImagesList();
    }]);


    app.controller('AwardsPageCtrl', ['$scope', '$http', '$timeout', 'Award', function($scope,$http,$timeout,Award) {
        var self = this;
        self.awards = [];
        // This is what you will bind the filter to
        self.filterSearchQuery = '';
        self.awards = Award.query();


        // Instantiate these variables outside the watch
        var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
        $scope.$watch('searchQuery', function (val) {
            if (filterSearchQueryTimeout)
                $timeout.cancel(filterSearchQueryTimeout);

            tmpFilterSearchQuery = val;

            filterSearchQueryTimeout = $timeout(function() {
                self.filterSearchQuery = tmpFilterSearchQuery;
            }, 250); // delay 250 ms
        });


        self.remove = function (index) {
            //console.log(self.professions[index]);
            self.awards[index].$remove();
            self.awards.splice(index,1);
        };


    }]);


    app.controller('AwardInputCtrl', ['$scope', '$http', '$routeParams', 'Award', function ($scope, $http, $routeParams, Award) {
        var self = this;
        self.$scope = $scope;
        self.$scope.awards = Award.query(function()
        {
            self.$scope.$broadcast('dataloaded');
        });
    }]);


    app.controller('AwardAddFormCtrl',['$scope', '$http', '$routeParams', '$location', '$timeout', '$filter', 'Award',
        function ($scope, $http, $routeParams, $location, $timeout, $filter, Award)
        {

            var self = this;

            self.isSuccessMsgVisible = false;
            self.showImageContainer = true;
            self.award = new Award();

            var oldAwardYear = undefined;
            $scope.$watch('awardAddFormCtrl.award.year', function (nv) {

                if(nv == oldAwardYear)
                    return;

                nv = $filter('date')(nv,'yyyy');
                self.award.year = nv;
                oldAwardYear = nv;
            });

            self.submitForm = function () {
                self.award.$save().then(self.showSuccessMsg);
            };

            self.showSuccessMsg = function (id) {
                self.isSuccessMsgVisible = true;

                $timeout(function () {
                    self.isSuccessMsgVisible = false;
                },3000);
            };

            self.chooseImg = function () {
                self.showImageContainer = false;
                $scope.addAwardForm.$setDirty();
                //$scope.addAwardForm.awardImageId.$setValid();
            };


            //self.refreshImagesList();
    }]);





    app.controller('GenresPageCtrl', ['$scope', '$http', '$timeout', 'Genre', function($scope,$http,$timeout,Genre) {
        var self = this;
        self.genres = [];
        // This is what you will bind the filter to
        self.filterSearchQuery = '';
        self.genres = Genre.query();


        // Instantiate these variables outside the watch
        var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
        $scope.$watch('searchQuery', function (val) {
            if (filterSearchQueryTimeout)
                $timeout.cancel(filterSearchQueryTimeout);

            tmpFilterSearchQuery = val;

            filterSearchQueryTimeout = $timeout(function() {
                self.filterSearchQuery = tmpFilterSearchQuery;
            }, 250); // delay 250 ms
        });


        self.remove = function (index) {
            //console.log(self.professions[index]);
            self.genres[index].$remove();
            self.genres.splice(index,1);
        };


    }]);


    app.controller('GenreInputCtrl', ['$scope', '$http', '$routeParams', 'Genre', function ($scope, $http, $routeParams, Genre) {
        var self = this;
        self.$scope = $scope;
        self.$scope.genres = Genre.query(function()
        {
            self.$scope.$broadcast('dataloaded');
        });
    }]);


    app.controller('GenreAddFormCtrl',['$scope', '$http', '$routeParams', '$location', '$timeout', '$filter', 'Genre',
        function ($scope, $http, $routeParams, $location, $timeout, $filter, Genre)
        {

            var self = this;

            self.isSuccessMsgVisible = false;
            self.genre = new Genre();

            self.submitForm = function () {
                self.genre.$save().then(self.showSuccessMsg);
            };

            self.showSuccessMsg = function (id) {
                self.isSuccessMsgVisible = true;

                $timeout(function () {
                    self.isSuccessMsgVisible = false;
                },3000);
            };

            //self.refreshImagesList();
    }]);


    app.controller('CountriesPageCtrl', ['$scope', '$http', '$timeout', 'Country', function($scope,$http,$timeout,Country) {
        var self = this;
        self.countries = [];
        // This is what you will bind the filter to
        self.filterSearchQuery = '';
        self.countries = Country.query();


        // Instantiate these variables outside the watch
        var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
        $scope.$watch('searchQuery', function (val) {
            if (filterSearchQueryTimeout)
                $timeout.cancel(filterSearchQueryTimeout);

            tmpFilterSearchQuery = val;

            filterSearchQueryTimeout = $timeout(function() {
                self.filterSearchQuery = tmpFilterSearchQuery;
            }, 250); // delay 250 ms
        });


        self.remove = function (index) {
            //console.log(self.professions[index]);
            self.countries[index].$remove();
            self.countries.splice(index,1);
        };


    }]);


    app.controller('CountryAddFormCtrl',['$scope', '$http', '$routeParams', '$location', '$timeout', '$filter', 'Country',
        function ($scope, $http, $routeParams, $location, $timeout, $filter, Country)
        {

            var self = this;

            self.isSuccessMsgVisible = false;
            self.country = new Country();

            self.submitForm = function () {
                self.country.$save().then(self.showSuccessMsg);
            };

            self.showSuccessMsg = function (id) {
                self.isSuccessMsgVisible = true;

                $timeout(function () {
                    self.isSuccessMsgVisible = false;
                },3000);
            };

            //self.refreshImagesList();
    }]);


    app.controller('CountryInputCtrl', ['$scope', '$http', '$routeParams', 'Country', function ($scope, $http, $routeParams, Country) {
        var self = this;
        self.$scope = $scope;
        self.$scope.countries = Country.query(function()
        {
            self.$scope.$broadcast('dataloaded');
        });
    }]);


    app.controller('StuffPageCtrl', ['$scope', '$http', '$timeout', 'Staff',function($scope,$http,$timeout,Staff) {
        var self = this;
        self.stuff = [];
        // This is what you will bind the filter to
        self.filterSearchQuery = '';
        self.stuff = Staff.query();

        /*$http.get('./json/all-stuff-list.json').success(function(data){
            self.stuff = data;
            //$scope.movies = data;
        });*/

        /*$http.get('/app/json/all-movies-list.json').success(function(data){
         self.movies = data;
         //$scope.movies = data;
         });*/



        // Instantiate these variables outside the watch
        var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
        $scope.$watch('searchQuery', function (val) {
            if (filterSearchQueryTimeout)
                $timeout.cancel(filterSearchQueryTimeout);

            tmpFilterSearchQuery = val;

            filterSearchQueryTimeout = $timeout(function() {
                self.filterSearchQuery = tmpFilterSearchQuery;
            }, 250); // delay 250 ms
        });


        self.removeProfession = function (index) {
            //$scope.movies.splice(index,1);
            //$scope.movies.push({ name: 'new', thumbUrl: 'lool'});
            //console.log(self.movies[index].name);
            self.stuff[index].$remove();
            self.stuff.splice(index,1);

        };


    }]);


    app.controller('StaffAddFormCtrl',['$scope', '$http', '$routeParams', '$location', '$timeout', '$filter', 'Staff',
        function ($scope, $http, $routeParams, $location, $timeout, $filter, Staff)
        {

            var self = this;

            self.isSuccessMsgVisible = false;
            self.showImageContainer = true;


            self.initStaff = function () {
                self.staff = new Staff();
                self.staff.professions = [{}];
                self.staff.awards = [{}];
            };

            self.initStaff();

            var oldYear = undefined;
            $scope.$watch('staffAddFormCtrl.staff.birthYear', function (nv) {

                if(nv == oldYear)
                    return;

                nv = $filter('date')(nv,'dd-MM-yyyy');
                self.staff.birthYear = nv;
                oldYear = nv;
            });

            self.submitForm = function () {
                self.staff.$save().then(function () {
                    self.showImageContainer = true;
                    self.initStaff();
                    self.showSuccessMsg();
                });
            };

            self.showSuccessMsg = function (id) {
                self.isSuccessMsgVisible = true;

                $timeout(function () {
                    self.isSuccessMsgVisible = false;
                },3000);
            };

            self.chooseImg = function () {
                self.showImageContainer = false;
                $scope.addStaffForm.$setDirty();
                //$scope.addAwardForm.awardImageId.$setValid();
            };

            self.addStaffProfession = function () {
                self.staff.professions.push({ });
            };

            self.addStaffProfession = function () {
                self.staff.professions.push({ });
            };

            self.addAward = function () {
                self.staff.awards.push({  });
            };

            self.removeAward = function (index) {
                self.staff.awards.splice(index,1);
            };

            self.removeStaffProfession = function (index) {
                self.staff.professions.splice(index,1);
            };

            //self.refreshImagesList();
        }]);


    app.controller('StaffInputCtrl', ['$scope', '$http', '$routeParams', 'Staff', function ($scope, $http, $routeParams, Staff) {
        var self = this;
        self.$scope = $scope;
        self.$scope.staff = Staff.query(function()
        {
            self.$scope.$broadcast('dataloaded');
        });
    }]);


    app.controller('CategoriesPageCtrl', ['$scope', '$http', '$timeout', 'Category', function($scope,$http,$timeout,Category) {
        var self = this;
        self.$scope = $scope;
        self.$scope.selectedCategoryId = null;
        self.$scope.selectedCategory = null;
        self.$scope.categories = [];
        self.$scope.categories = Category.query();

        var findById = function (categories,id) {
            var result;
            angular.forEach(categories, function (value, key) {

                if(result)
                    return;

                if(value.id == id)
                {
                    result = value;
                    return;
                }

                if(value.children.length)
                    result = findById(value.children,id);
            });
            return result;
        };

        self.$scope.$watch('selectedCategoryId', function (nv) {
            //self.$scope.selectedCategory.get();
            //console.log("Cat selected id="+nv);
            //self.$scope.selectedCategory = $filter('filter')(self.$scope.categories,{id:nv})[0];
            self.$scope.selectedCategory = findById(self.$scope.categories,nv);
            console.log("Cat selected =",self.$scope.selectedCategory);
        });

        self.$scope.remove = function () {
            //console.log(self.professions[index]);
            //self.genres[index].$remove();
            //self.genres.splice(index,1);
            //console.log('removing');
            console.log("deleting",self.$scope.selectedCategory);
            var tmpCat = new Category();
            tmpCat.id = self.$scope.selectedCategory.id;
            tmpCat.$remove();
            self.$scope.categories = Category.query();
            self.$scope.selectedCategory = {};
            /*self.$scope.categories = [
                {
                    "id" : "1",
                    "name" : "Category 1",
                    "children" : [
                        {
                            "id" : "2",
                            "name" : "Category 1.1",
                            "children" : []
                        },
                        {
                            "id" : "3",
                            "name" : "Category 1.2",
                            "children" : [
                                {
                                    "id" : "5",
                                    "name" : "Category 1.2.1",
                                    "children" : []
                                },
                                {
                                    "id" : "6",
                                    "name" : "Category 1.2.2",
                                    "children" : []
                                }
                            ]
                        },
                        {
                            "id" : "4",
                            "name" : "Category 1.3",
                            "children" : []
                        }
                    ]
                }
            ];*/

        };


    }]);


    app.controller('CategoriesAddFormCtrl',['$scope', '$http', '$routeParams', '$location', '$timeout', '$filter', 'Category',
        function ($scope, $http, $routeParams, $location, $timeout, $filter, Category)
        {
            var self = this;
            self.$scope = $scope;

            self.isSuccessMsgVisible = false;
            self.category = new Category();
            self.$scope.categories = Category.query();
            /*self.$scope.categories = [];
            Category.query(function (data) {
                self.$scope.categories.push(
                    {
                        "id":0,
                        "name":"No category",
                        "children":data
                    }
                );
            });*/

            self.submitForm = function () {
                self.category.$save().then(self.showSuccessMsg);
            };

            self.showSuccessMsg = function (id) {
                self.isSuccessMsgVisible = true;

                $timeout(function () {
                    self.isSuccessMsgVisible = false;
                },3000);
            };

            //self.refreshImagesList();
        }]);


    app.controller('CategoryInputCtrl', ['$scope', '$http', '$routeParams', '$timeout', 'Category', function ($scope, $http, $routeParams, $timeout, Category) {
        var self = this;
        self.$scope = $scope;

        //console.log("HERE");
        self.$scope.treeData = [];

        self.$scope.chooseCategory = function (cat) {
            console.log("Cat chosen id="+cat.id);
            self.$scope.selected = cat.id;
        };

        var addChildren = function (children) {
            var ret = [];

            angular.forEach(children, function (value, key) {
                var cat = {
                    id: value.id,
                    label: value.name,
                    //onSelect: chooseCategory,
                    children: []
                };

                if(value.children.length)
                    cat.children = addChildren(value.children);

                ret.push(cat);
            });

            return ret;
        };

        var processCategoriesData = function (categoriesData) {

            if(categoriesData.$promise === undefined || categoriesData.$resolved === true)
            {
                // it's not a promise or promise resolved
                self.$scope.treeData = addChildren(categoriesData);
                //console.log("Tree data =",self.$scope.treeData);
                return;
            }

            // else - let's wait for promise
            categoriesData.$promise.then(function (data) {
                self.$scope.treeData = addChildren(data);
                //console.log("Tree data =",self.$scope.treeData);
            });
        };

        if(!self.$scope.categoriesData)
        {
            //console.log("Data bad",self.$scope.categoriesData);
            Category.query(function (data) {
                console.log(data);
                //console.log("Categories tree data:",trData);
                self.$scope.treeData = addChildren(data);
                //console.log("Tree data =",self.$scope.treeData);
            });
        }
        else
        {
            //console.log("Data ok",self.$scope.categoriesData);
            processCategoriesData(self.$scope.categoriesData);
            self.$scope.$watch(function () {
                return self.$scope.categoriesData;
            }, function (nv) {
                processCategoriesData(nv);
            });
        }

    }]);

})();

/*
var rand = function (n,d,u) {
    var ret = [];
    for (var i = 0; i != n; i++) {
        var numWords = Math.round(Math.random() * 3 + 1);
        var name = '';
        var url = '';
        for (var j = 0; j != numWords; j++) {
            name += ' ' + $.trim(d[Math.round(Math.random() * d.length)]);
        }
        url += u[Math.round(Math.random() * u.length)];
        ret.push({ "name":name, thumbUrl:url });
    }
    return ret;
};*/