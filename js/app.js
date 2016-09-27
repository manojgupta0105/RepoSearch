var myApp = angular.module('ngApp', ['ngRoute','ui.router','ngResource'])

	.config(['$stateProvider',
             '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
				 $urlRouterProvider.otherwise("/home");
				 
				 $stateProvider
					.state('home', {
						url: "/home",
						title: "Home",
						templateUrl: "views/home.html",
						controller : "HomePageController"
					})
			 }
		 ])
	.controller('MyCtrl', function() {

	})
	.controller('HomePageController', function($scope,$resource,$http,SessionService) {		
		var categories = '[{"icon_default":"http://static.stayglad.com/images/color/facial.png","icon_white":"http://static.stayglad.com/images/white/facial.png","id":10,"name":"Facial",'+
		'"services":[{"description":"<p>The Anti Tan Facial heals the pigmentation of skin due to sun exposure and reduces the effect of UV rays.</p><p>The therapy includes deep cleansing, exfoliation, toning, moisturizing, masque and relaxing massage</p><p><strong>Time:</strong> 60 mins</p>","id":55,"options":[],"price":600,"thumbnail":"http://static.stayglad.com/images/service/03.jpg","title":"Anti Tan Facial"},'+
		'{"description":"<p>Basic Cleanup is a gentle cleansing procedure that includes exfoliation, blackhead removal & toning.<br><strong>Time:</strong> 20 mins</p>","id":53,"options":[],"price":200,"thumbnail":"http://static.stayglad.com/images/service/01.jpg","title":"Basic Clean Up"},'+
		'{"description":"<p>The therapy includes deep cleansing, exfoliation, toning, moisturizing, masque and relaxing massage.</p><p><strong>Time:</strong> 45 mins</p>","id":59,"options":[],"price":400,"thumbnail":"http://static.stayglad.com/images/service/07.jpg","title":"Classic Facial"},'+
		'{"description":"<p>The Fruit facial helps revive dull skin & reduces enlarged pores. Ideal for sensitive skin.<br>The therapy includes deep cleansing, exfoliation, toning, moisturizing, masque and relaxing massage.</p><p><strong>Time:</strong> 60 mins</p>","id":56,"options":[],"price":700,"thumbnail":"http://static.stayglad.com/images/service/04.jpg","title":"Fruit Facial"},'+
		'{"description":"<p>The Instaglow facial uses herbal actives that control melanin and make the skin brighter.<br>The therapy includes cleansing, exfoliation, toning, moisturizing, serum & masque application and relaxing massage.</p><p><strong>Time:</strong> 60 mins</p>","id":58,"options":[],"price":1000,"thumbnail":"http://static.stayglad.com/images/service/06.jpg","title":"Insta Glow Facial"},'+
		'{"description":"<p>The Skin tightening facial uses plant hormones that stimulate retention of collagen and elastin.<br>The therapy includes deep cleansing, exfoliation, toning, moisturizing, masque and relaxing massage.</p><p><strong>Time:</strong> 60 mins</p>","id":57,"options":[],"price":800,"thumbnail":"http://static.stayglad.com/images/service/05.jpg","title":"Skin Tightening Facial"}]},'+
		'{"icon_default":"http://static.stayglad.com/images/color/hair_spa_n_nourish.png","icon_white":"http://static.stayglad.com/images/white/hair_spa_n_nourish.png","id":15,"name":"Hair Spa & Nourish",'+
		'"services":[{"description":"<p>Advanced haircuts in varying styles by a senior StayGlad stylist.</p><p><strong>Time:</strong> 45 mins</p>","id":136,"options":[],"price":500,"thumbnail":"http://static.stayglad.com/images/service/83.jpg","title":"Hair Cut"},'+
		'{"description":"<p>Basic haircut for juniors up to 10 yrs. (Bob, Mushroom, Blunt, Straight, etc)</p><p><strong>Time:</strong> 45 mins</p>","id":138,"options":[],"price":300,"thumbnail":"http://static.stayglad.com/images/service/85.jpg","title":"Hair Cut for Kids"},'+
		'{"description":"<p>An advanced makeover haircut by a senior StayGlad stylist followed by an elaborate blow dry styling.</p><p><strong>Time:</strong> 60 mins</p>","id":137,"options":[],"price":800,"thumbnail":"http://static.stayglad.com/images/service/84.jpg","title":"Hair Cut Makeover & Styling"},{"description":"<p>A Trim up to one inch in the existing haircut.</p><p><strong>Time:</strong> 30 mins</p>","id":139,"options":[],"price":250,"thumbnail":"http://static.stayglad.com/images/service/86.jpg","title":"Hair Trim"}]},'+
		'{"icon_default":"http://static.stayglad.com/images/color/get_ready.png","icon_white":"http://static.stayglad.com/images/white/get_ready.png","id":21,"name":"Get Ready",'+
		'"services":[{"description":"<p>Professional Saree draping with decorative pleats.<br><strong>Options:</strong><br><strong>Normal-</strong> Regular or flowing Pallu style.<br><strong>Fancy-</strong> Special style (Eg. Bengali, Gujarati, Kerala, Lehnga style etc) for Bridal and other special occassions.</p><p><strong>Time:</strong> 30-45 mins</p>","id":140,"options":[{"id":224,"name":"Fancy Saree Drape","price":300},{"id":223,"name":"Normal Saree Drape","price":250}],"price":250,"thumbnail":"http://static.stayglad.com/images/service/87.jpg","title":"Saree Drape"}]}]';
		
		if(SessionService.get("categoryList") != null || SessionService.get("categoryList") != undefined){
			$scope.categoryList = SessionService.get("categoryList");
		}
		else{
			$scope.categoryList = JSON.parse(categories);
			SessionService.set("categoryList",$scope.categoryList);
		}
		$scope.initData = function(){
			angular.forEach($scope.categoryList,function(category){
				angular.forEach(category.services,function(service){
					service.isDisable = true;
				});
			});
		}
		$scope.initData();
		$scope.selectedDiv = "";
		$scope.btnText = "Edit";
		
		$scope.toggleSelectDiv = function(selectedDivName){
			if($scope.selectedDiv == selectedDivName){
				$scope.selectedDiv = "";
			}
			else{
				$scope.selectedDiv = selectedDivName;
			}
		};
		
		$scope.toggleEdit = function(service){
			if($scope.btnText == "Edit"){
				$scope.btnText = "Save";
				service.isDisable = !service.isDisable;
			}
			else{
				$scope.btnText = "Edit";
				service.isDisable = !service.isDisable;
				SessionService.set("categoryList",$scope.categoryList);
			}
		};
		
		$scope.cancelEdit=function(service){
			$scope.btnText = "Edit";
			service.isDisable = !service.isDisable;
		};		
	})
	
	.factory("SessionService", ['$window', function($window) {
			return {
				set:function(key, val) {
						$window.localStorage.setItem(key, JSON.stringify(val));
					},
				get: function(key) {
						var str = $window.localStorage.getItem(key);
						var result = undefined;
						try {
							result = str ? JSON.parse(str) : result;
						}
						catch (e) {
							console.log('Parse error for localStorage ' + key);
						}
						return result;
					},
				unset: function(key) {
						$window.localStorage.removeItem(key);
					},
			}
		}
	])