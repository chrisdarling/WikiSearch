var app = angular.module('app', []);

app.controller('wikiCtrl', function($scope, $http) {

	

	$scope.results = [];
	

	
    function trimSearch(search) {
    	var result = search.match(/\S+/g).join(" ");
    	return result;
	};


   $scope.searchWiki = function(input) {

   		
   		$scope.search = trimSearch(input);
   	
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
					console.log("no results");
				}

				
		});

		$scope.inputSearch = "";




	}

});