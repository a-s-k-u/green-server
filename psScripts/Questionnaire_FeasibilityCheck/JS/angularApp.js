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

		app.directive('heatMap',function(){
			return{
				restrict:'A',
				scope:{
				autoTags: '=availableTags'
				},
				link:function(scope,element,attr){
					console.log(element);
				}
			}
		});
		
		app.directive("bttooltip", function($timeout) {
			return {
				restrict: "A",
				link: function(scope, element, attrs) {
					$timeout(function() {
						$(element).data("title", attrs.btTooltip + "!!!");
						// set other options via data or use an options object
						$(element).tooltip();
					});
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
									format: '{value}'
								}
							},

							yAxis: {
								startOnTick: false,
								endOnTick: false,
								max: 60,
								title: {
									text: 'Risk'
								},
								labels: {
									format: '{value}'
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
								name: 'Medium',
								data:  [[0, 30],[30, 0]]
							},{
								type: 'spline',
								name: 'High',
								data: [[3, 60],[60, 0]]
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
                score: {},
				questionnaire:{},
				leadBoard:[]
            };

            o.getAll = function () {
                return $http.get('/AllScores').success(function (data) {
                    angular.copy(data, o.allScores);
                });
            };
			o.getLeadBoard = function () {
                return $http.get('/LeadBoard').success(function (data) {
                    angular.copy(data, o.leadBoard);
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
			o.getQuestionnaire = function (id) {
                return $http.get('/questionnaire/' + id).success(function (data) {
                    angular.copy(data, o.questionnaire);
					console.log(o.questionnaire);
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
			
			o.updateBatch01 = function(score){
			  return $http.post('/UpdateBatch01', angular.toJson(score)).success(function(status){
			   alert("Answers updated");
			  });
			};
			o.updateBatch02 = function(score){
			  return $http.post('/UpdateBatch02', angular.toJson(score)).success(function(status){
			   alert("Answers updated");
			  });
			};
			o.updateAllBatches = function(score){
			  return $http.post('/UpdateAllBatches', angular.toJson(score)).success(function(status){
			   alert("Answers updated. Please refresh the page to view the correct answers.");
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
		
		app.controller('LeadBoardCtrl', [
        '$scope',
        'webServiceCall',
        function ($scope, webServiceCall) {
            $scope.leadBoard = webServiceCall.leadBoard;
        }]);
		
		app.controller('questionnaireCtrl', [
        '$scope',
        'webServiceCall',
        function ($scope, webServiceCall) {
            $scope.allQuestionnaire = webServiceCall.allQuestionnaire;
  
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
			$scope.isObjective = function(question){
			  if (question.Type == 'Objective')
			  {
			  return true;
			  }
			  else
			  {
			  return false;
			  }
			}
			$scope.showRadio = function(optionCount,id){
			  if(optionCount >= id)
			  {
			    return true;
			  }
			  else
			  {
			  return false;
			  }
			}
			$scope.showSubmit = function(batchID)
			{
			    if(batchID == 1){
				   if($scope.score.batch01Status == 'Submitted'){
					return false;
				   }
				   else{
				    return true;
				   }
				}
				else if (batchID == 2){
				if($scope.score.batch02Status == 'Submitted'){
					return false;
				   }
				   else{
				    return true;
				   }
				}
			}
			
			$scope.updateBatch01 = function(){
			      webServiceCall.updateBatch01($scope.score);
			}
			$scope.updateBatch02 = function(){
			      webServiceCall.updateBatch02($scope.score);
			}
			$scope.updateAllBatches = function(){
			      webServiceCall.updateAllBatches($scope.score);
			}
			
			$scope.currentBatch = 'batch01';
			$scope.setBatch01 = function(){
			     $scope.currentBatch = 'batch01';
			}
			$scope.setBatch02 = function(){
			     $scope.currentBatch = 'batch02';
			}
			
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
			
			$scope.getHeatMapColor = function(ratingValue){
			    if (ratingValue == 1) {
				return '#ff8080';
				}
				else if (ratingValue == 2) {
				return '#ffad99';
				}
				else if (ratingValue == 3) {
				return '#ffd9b3';
				}
				else if (ratingValue == 4) {
				return '#ccffcc';
				}
				else{
				return '#80ff80';
				}
			}
			
			$scope.getScore = function(rating, factor){
			//alert('hi');
			//console.log(factor);
			if(rating == 1 ){
				return factor.Score01;
			}
			else if (rating == 2) {
				return factor.Score02;
			}
			else if (rating == 3){
				return factor.Score03;
			}
			else if ( rating == 4){
				return factor.Score04;
			}
			else if ( rating == 5) {
				return factor.Score05;
			}
			
			  return factor.Score01;
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
			  $stateProvider.state('leadBoard', {
                  url: '/leadBoard',
                  templateUrl: '/leadBoard.html',
                  controller: 'LeadBoardCtrl',
                  resolve: {
                      postPromise: ['$stateParams', 'webServiceCall', function ($stateParams, webServiceCall) {
                          return webServiceCall.getLeadBoard();
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
			  $stateProvider.state('questionnaire', {
                  url: '/questionnaire',
                  templateUrl: '/questionnaire.html',
                  controller: 'questionnaireCtrl',
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
