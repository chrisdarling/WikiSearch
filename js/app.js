var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/views', {
		templateUrl: 'views/results.html'
	});

	
});


app.controller('wikiCtrl', function($scope, $http, $location) {


	

	$scope.results = [];

	
	

	
    function trimSearch(search) {

    	if ((search === undefined) || (search === null))  {
    		return null;
    	} else {
    		return search.match(/\S+/g).join(" ");
    	}
    	
	};

	$scope.showClear = function() {
		if (!($scope.inputSearch === undefined)) {

			if ($scope.inputSearch.length >= 1) {
				return false;
				// show
			} else {
				return true;

				// hide
			}

		} else {
			return true;
			// hide
		}
	};

	$scope.clearSearch = function() {
		$scope.inputSearch = "";
		$location.path('/');
	}


   $scope.searchWiki = function(input) {

   		
   		$scope.search = trimSearch(input);

   		if (!($scope.search === null)) {
   	
			$http.jsonp('https://en.wikipedia.org/w/api.php?action=opensearch&search='
				+ $scope.search + '&limit=10&namespace=0&callback=JSON_CALLBACK'
				).success(function(data) {

					

					if (data[1].length >= 1)  {
						console.log(data);
						$scope.results = [];
					
						var dataObj = {
								title: data[1],
								info: data[2],
								link: data[3] 
						};
						
						for (var i = 0; i < dataObj.title.length; i++) {

							var article = {
								title: dataObj.title[i],
								info: dataObj.info[i],
								link: dataObj.link[i]
							};

							$scope.results.push(article);

						}


					} else {
						$scope.results = [];
						console.log("no results");
					}

					
			});

			
			$location.path('/views');


		} else {

		}




	};

	


	

});