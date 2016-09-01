    var app = angular.module('scoreCardApp', ['ui.router','ui.bootstrap']);

	
	
	    app.directive('showgraph',function(){
			return{
				restrict:'A',
				scope:{
				autoTags: '=availableTags'
				},
				link:function(scope,element,attr){
					
				}
			}
		});

		app.directive('hcBubbleChart', function () {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    scope: {
                        title: '@',
                        data: '='
                    },
                    link: function (scope, element) {
                        Highcharts.chart(element[0], {
                            chart: {
                                type: 'bubble',
								plotBorderWidth: 1,
							    zoomType: 'y'
                            },
                            title: {
                                text: scope.title
                            },
							 xAxis: {
								gridLineWidth: 1,
								max: 60,
								title: {
									text: 'Feasibility'
								},
								labels: {
									format: '{value} points'
								}
							},

							yAxis: {
								startOnTick: false,
								endOnTick: false,
								max: 60,
								title: {
									text: 'Risk / Impact Assessment'
								},
								labels: {
									format: '{value} points'
								}
							},

							tooltip: {
								useHTML: true,
								headerFormat: '<table>',
								pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
									'<tr><th>Feasibility Score:</th><td>{point.x}</td></tr>' +
									'<tr><th>Risk Score:</th><td>{point.y}</td></tr>' +
									'<tr><th>FTE:</th><td>{point.z}</td></tr>',
								footerFormat: '</table>',
								followPointer: false
							},

                            plotOptions: {
                                series: {
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.name}'
                                    }
                                }
                            },
                            series: [{
                                data: scope.data
                            },{
								type: 'spline',
								name: 'Low / Medium Migration Potential',
								data:  [[0, 30],[30, 0]]
							},{
								type: 'spline',
								name: 'Medium/ High Migration Potential',
								data: [[3, 60],[30,30],[60, 0]]
							}]
                        });
                    }
                };
            });

        //deals with all calls made to app server.
        app.factory('webServiceCall',['$http', function($http){
            var o = {
                allScores: [],
                slides:[],
                score: {}
            };

            o.getAll = function () {
                return $http.get('/AllScores').success(function (data) {
                    angular.copy(data, o.allScores);
                });
            };
            o.getSlides = function () {
                return $http.get('/slides').success(function (data) {
                    angular.copy(data, o.slides);
                });
            };
            o.get = function (id) {
                return $http.get('/score/' + id).success(function (data) {
                    angular.copy(data, o.score);
					console.log(o.score);
                });
            };
			
			o.createNewIdea = function(idea){
			alert(idea);
			  return $http.post('/ideas', angular.toJson(idea)).success(function(status){
			   alert("Idea Created");
			   o.getAll();
			  });
			};
			
			o.createNewDimension = function(dimension){
			  return $http.post('/CreateNewDimension', angular.toJson(dimension)).success(function(status){
			   alert("New Dimension Created");
			   o.getAll();
			  });
			};
			
			o.updateFeasibility = function(feasibility){
			  return $http.post('/UpdateScore', angular.toJson(feasibility)).success(function(status){
			   alert("Scores updated");
			  });
			};
			o.deleteFeasibility = function(feasibility){
			  return $http.post('/DeleteScore', angular.toJson(feasibility)).success(function(status){
			   alert("Score Deleted");
			  });
			};
           
            return o;
        }]);

        //deals with UI updates
        app.controller('HomeCtrl', [
        '$scope',
        'webServiceCall',
        function ($scope, webServiceCall) {
            $scope.allScores = webServiceCall.allScores;
  
			// Sample data for pie chart
			
			$scope.bubbleData = $scope.allScores;
			$scope.newDimension;
			$scope.createDimension = function(){
				webServiceCall.createNewDimension($scope.newDimension);
			}

        }]);

        //deals with UI updates
        app.controller('DetailsCtrl', [
        '$scope',
        '$stateParams',
        'webServiceCall',
        function ($scope,$stateParams, webServiceCall) {
            $scope.score = webServiceCall.score;
			$scope.ratings = [{
				value: 1
			}, {
				value : 2
			}, {
			    value : 3
			}, {
				value : 4 
			}, { 
				value : 5
			}
			];

			$scope.getFeasibilityCount =  function(){
				var total = 0;
				for(var i = 0; i < $scope.score.Feasibility.length; i++){
					var factor = $scope.score.Feasibility[i];
					total = total + parseInt(factor.SelectedValue);
				}
				return total;
			}
			
			$scope.getRiskCount =  function(){
				var total = 0;
				for(var i = 0; i < $scope.score.Risk.length; i++){
					var factor = $scope.score.Risk[i];
					total = total + parseInt(factor.SelectedValue);
				}
				return total;
			}
			
			$scope.updateFeasibility = function(){
			      webServiceCall.updateFeasibility($scope.score);
			}
			
			$scope.deleteFeasibility = function(){
			      webServiceCall.deleteFeasibility($scope.score);
				  $window.location.href = '#/home';
			}

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
				
			  $scope.newIdea;
			  $scope.createIdea = function() {
				 webServiceCall.createNewIdea($scope.newIdea);
			  };
        }]);

        //configures which html piece to load and determines state.
        app.config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('home', {
                  url: '/home',
                  templateUrl: '/home.html',
                  controller: 'HomeCtrl',
                  resolve: {
                      postPromise: ['webServiceCall', function (webServiceCall) {
                          return webServiceCall.getAll();
                      }]
                  }
              });
			$stateProvider.state('details', {
                  url: '/details/{id}',
                  templateUrl: '/details.html',
                  controller: 'DetailsCtrl',
                  resolve: {
                      postPromise: ['$stateParams', 'webServiceCall', function ($stateParams, webServiceCall) {
                          return webServiceCall.get($stateParams.id);
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

            $urlRouterProvider.otherwise('home');
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
