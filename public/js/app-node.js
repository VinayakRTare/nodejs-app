/*jslint browser:true, plusplus: true */
/*global $, jQuery, main, console*/
//namespace for home screen
var app = angular.module('moneyabcs', []);

app.controller("moneycontroller",function($scope,$http){
	//$scope.hello = "hello welcome to moneyabc";
	$http.get("/api/website").success(function(res){
		$scope.hello = res;
	});
	
	$scope.remove = function(index){
		$http.delete("/api/website/" + index).success(function(res){
			$scope.hello = res;
		});
	}
	
	$scope.add = function(index){
		$http.post("/api/website",index).success(function(res){
			$scope.hello = res;
		});
	}
	
	$scope.selectedPage = null;
	$scope.selectedIndex = null;
	$scope.showPage = function(index){
		$scope.selectedPage = $scope.hello[index].pages;
		$scope.selectedIndex = index;
	}
	
	$scope.deletePage = function(pageIndex){
		$http.delete("/api/website/" + $scope.selectedIndex + "/page/" + pageIndex)
		.success(function(res){
			$scope.selectedPage = res;
		});
	}
});