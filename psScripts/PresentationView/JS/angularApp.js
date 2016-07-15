    var app = angular.module('tryOutApp', ['ui.router','ui.bootstrap']);

        //deals with all calls made to app server.
        app.factory('webServiceCall',['$http', function($http){
            var o = {
                parties: [],
                slides:[],
                party: {}
            };

            o.getAll = function () {
                return $http.get('/ideas').success(function (data) {
                    angular.copy(data, o.parties);
                });
            };
            o.getSlides = function () {
                return $http.get('/slides').success(function (data) {
                    angular.copy(data, o.slides);
                });
            };
            o.get = function (id) {
                return $http.get('/party/' + id).success(function (data) {
                    angular.copy(data[0], o.party);
                });
            };
           
            return o;
        }]);

        //deals with UI updates
        app.controller('HomeCtrl', [
        '$scope',
        'webServiceCall',
        function ($scope, webServiceCall) {
            $scope.parties = webServiceCall.parties;
        }]);

        //deals with UI updates
        app.controller('DetailsCtrl', [
        '$scope',
        '$stateParams',
        'webServiceCall',
        function ($scope,$stateParams, webServiceCall) {
            $scope.party = webServiceCall.party;
        }]);

         //deals with UI updates
        app.controller('PresentationCtrl', [
        '$scope',
        '$stateParams',
        'webServiceCall',
        function ($scope,$stateParams, webServiceCall) {
            //$scope.party = webServiceCall.party;
            webServiceCall.getSlides();
            $scope.myInterval = 300000;
              $scope.slides1 = [
                {
                  image: 'http://lorempixel.com/400/500/'
                },
                {
                  image: 'http://lorempixel.com/400/200/food'
                },
                {
                  image: 'http://lorempixel.com/400/200/sports'
                },
                {
                  image: 'http://lorempixel.com/400/200/people'
                }
              ];
              

              $scope.ideas = webServiceCall.parties;
              $scope.slides = webServiceCall.slides;
              $scope.getActiveSlide = function () {
                    return $scope.slides.filter(function (s) { return s.active; alert(s.active); })[0];
                };
        }]);

        //configures which html piece to load and determines state.
        app.config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('home', {
                  url: '/index',
                  templateUrl: '/home.html',
                  controller: 'HomeCtrl',
                  resolve: {
                      postPromise: ['webServiceCall', function (webServiceCall) {
                          return webServiceCall.getAll();
                      }]
                  }
              });
            $stateProvider.state('parties', {
                  url: '/parties/{id}',
                  templateUrl: '/selectedParty.html',
                  controller: 'DetailsCtrl',
                  resolve: {
                      postPromise: ['$stateParams', 'webServiceCall', function ($stateParams, webServiceCall) {
                          return webServiceCall.get($stateParams.id);
                      }]
                  }
              });
            $stateProvider.state('presentation', {
                  url: '/presentation',
                  templateUrl: '/presentation.html',
                  controller: 'PresentationCtrl',
                  resolve: {
                      postPromise: ['webServiceCall', function (webServiceCall) {
                          return webServiceCall.getAll();
                      }]
                  }
              });

            $urlRouterProvider.otherwise('presentation');
        }]);

        app.config(['$httpProvider', function ($httpProvider) {
            //initialize get if not there
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }

            // Answer edited to include suggestions from comments
            // because previous version of code introduced browser-related errors

            //disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            // extra
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        }]);
