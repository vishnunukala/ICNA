'use strict';
angular.module('IcnaApp', [
  'ngRoute',
  'ngTouch',
  'mobile-angular-ui',
  'google-maps'.ns(),'ngMaterial'
]).config(function($routeProvider) {
  $routeProvider.when('/home',                   {templateUrl: 'templates/home.html'});
  $routeProvider.when('/schedule',           {templateUrl: 'templates/schedule.html',controller:'schedule'}); 
  $routeProvider.when('/speakers',           {templateUrl: 'templates/speakers.html'}); 
  $routeProvider.when('/exhibitors',         {templateUrl: 'templates/exhibitors.html'}); 
  $routeProvider.when('/sponsors',           {templateUrl: 'templates/sponsors.html'}); 
  $routeProvider.when('/about',              {templateUrl: 'templates/about.html'});
  $routeProvider.when('/schedule-profile',   {templateUrl: 'templates/schedule-profile.html'});
  $routeProvider.when('/speakers-profile',   {templateUrl: 'templates/speakers-profile.html'});    
  $routeProvider.when('/sponsors-profile',   {templateUrl: 'templates/sponsors-profile.html'});
  $routeProvider.when('/exhibitor-profile',  {templateUrl: 'templates/exhibitor-profile.html'}); 
  $routeProvider.when('/googlemap',          {templateUrl: 'templates/googlemap.html'});
    $routeProvider.otherwise({
    redirectTo:"/home"});
}).controller('MainController', ['$rootScope', '$scope', '$window', '$animate', '$timeout', '$compile', '$location','ToggleHelper','services','$mdSidenav', '$log',
    function ($rootScope, $scope, $window, $animate, $timeout,  $compile, $location,ToggleHelper,services,$mdSidenav, $log) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            ToggleHelper.toggle('ScheduleFilterSidebar', 'off');
            ToggleHelper.toggle('mapFilterSidebar', 'off');
            var path = $location.$$url;
            //$rootScope.loading = true;
            });
        $scope.mapFilterOpts=["All","Hotel","Prayer Place"];
        $scope.scheduleFilterOpts = ["All","Parallel Sessions","Ethnic","youth"];
        $scope.userAgent = navigator.userAgent;
        
         $rootScope.$on("$routeChangeSuccess", function () {
             //$rootScope.loading = false;
             $rootScope.slide="slide-left"
            $rootScope.search.term='';
            $rootScope.search_exhibitors.term='';
            $rootScope.search_sponsers.term='';
        });
       $scope.hideOverlay = function () {
            $(".uiblock").hide();
            ToggleHelper.toggle('ScheduleFilterSidebar', 'off');
         };
                                 $scope.toggleLeft = function() {
                                        $mdSidenav('left').toggle();
                                 };
                                 $scope.toggleRight = function() {
                                        $mdSidenav('right').toggle();
                                 };
                                 $scope.close = function() {
                                        $mdSidenav('left').close();
                                 };
                                 
$scope.showMapFilter = function () {
                    if($("#filterr").hasClass("filterBlack")){
                        $(".uiblock").hide();
                        $("#filterr").removeClass("filterBlack").addClass('filterr');
                        $('.fliterBar').toggleClass('storeMobileSideBar');
                    }else{
                        $(".uiblock").show();
                        $("#filterr").addClass("filterBlack").removeClass('filterr');
                        $('.fliterBar').toggleClass('storeMobileSideBar');
                    }
              
        };
        
        $scope.getNotification= function(i){
          //  alert("ads asd ");
            var now = new Date().getTime(),
            _60_seconds_from_now = new Date(now + 60*1000);

            window.plugin.notification.local.add({
                id:      i,
                title:   'ICNA',
                message: 'Dont forget to buy some flowers.',
                repeat:  'weekly',
                date:    _60_seconds_from_now
            });
            
        };
                                 $scope.twitterlogin = function(){
                                     OAuth.popup('twitter')
                                                    .done(function (r) {
                                                        // the access_token is available via r.access_token
                                                        // but the http functions automagically wrap the jquery calls
                                                        r.get('/1.1/account/verify_credentials.json')
                                                            .done(function (data) {
                                                                alert("twitter: Hello, " + data.name + " !");
                                                            })
                                                            .fail(function (jqXHR, textStatus, errorThrown) {
                                                                alert("req error: " + textStatus);
                                                            });
                                                    })
                                                    .fail(function (e) {
                                                        alert('error: ' + e.message);
                                                    });
//                                 var dateStr = new Date().toJSON();
//                                 cordova.exec(
//                                              // Register the callback handler
//                                              function callback(response) {
//                                              alert(' data passed ' + JSON.stringify(response));
//                                              
//                                              },
//                                              // Register the errorHandler
//                                              function errorHandler(err) {
//                                              alert('Error');
//                                              },
//                                              // Define what class to route messages to
//                                              'testingcall',
//                                              // Execute this method on the above class
//                                              'testingfunc',
//                                              // An array
//                                              [ dateStr ]
//                                              );
                                 };
                                 
$scope.showFilter = function () {
               // ToggleHelper.toggle('ScheduleFilterSidebar', 'on');

        if($("#schedule_filter").hasClass("filterBlack")){
                        $(".uiblock").hide();
                        $("#schedule_filter").removeClass("filterBlack").addClass('schedule_filter');
                        $('.schedule_fliterBar').toggleClass('scheduleSideBar');
                    }else{
                        $(".uiblock").show();
                        $("#schedule_filter").addClass("filterBlack").removeClass('schedule_filter');
                        $('.schedule_fliterBar').toggleClass('scheduleSideBar');
                    }
                    
        };
        $scope.searchbar = false;
        $scope.searchicon = true;
        $scope.searchbar_exhibitors = false;
        $scope.searchicon_exhibitors = true;
        $scope.searchbar_sponsers = false;
        $scope.searchicon_sponsers = true;
        
         $rootScope.changePage = function (path) {
            $rootScope.slide = 'slide-left';
            //$scope.hideOverlay();
            $location.url(path);
        };

        $scope.map = {
            center: {
                latitude: 12.9833,
                longitude: 77.5833
            },
            zoom: 11
        };
           $scope.mapPop = {
            center: {
                latitude: 12.9833,
                longitude: 77.5833
            },
            zoom: 14
        };
        $scope.userAgent = navigator.userAgent;
        
        $rootScope.search = {
            "term": ""
        };
        $rootScope.search_exhibitors = {
            "term": ""
        };
        $rootScope.search_sponsers = {
            "term": ""
        };
        
        $rootScope.searchResult = function(term){
        //$http.get("","");response handler
        };
        $rootScope.search_exhibitors = function(term){
        //$http.get("","");response handler
        };
        $rootScope.search_sponsers = function(term){
        //$http.get("","");response handler
        };
        
        
}]).controller('schedule', ['$rootScope', '$scope', '$window', '$animate', '$timeout', '$compile', '$location',
    function ($rootScope, $scope, $window, $animate, $timeout,  $compile, $location) {
       // var owl2 = ;
 
        var owl;
        $scope.noOfschedule = [1,2,3,4,5];

        var swiper =["mySwiper1","mySwiper2","mySwiper3","mySwiper4","mySwiper5"];
         $timeout(function(){
             for(var i=0;i<$scope.noOfschedule.length;i++){
                 swiper[i]  = new Swiper('#swiper-container'+$scope.noOfschedule[i],{
    pagination: '.pagination',
      createPagination:false,
      slidesPerView:1,
    paginationClickable: true,
      initialSlide:1
  });
             }
            },500);
            
            $scope.callback2 = function(i){
                swiper[i].appendSlide('<div class="schedule-inner"><h4>Rakesh</h4><div class="clearfix"></div><div class="row"><div class="col-xs-6"><p><span class="glyphicon glyphicon-time"></span>5:00 AM - 5:30 AM</p></div><div class="col-xs-6"><p><span class="glyphicon glyphicon-map-marker"></span>Hotel Prayer Area (Check for Signs)</p></div></div></div>', 'swiper-slide');
                //alert("ads"+element+ info+callbackName);
                console.log(element);
            }; 
      
    }]).run(function ($rootScope, $window, $location) {

}).service('services', function ($http) {
    this.serviceGet = function (url,data,success,error) {
        $http.get(url,data).success(function (data) {
            return success(data);
        }).error(function(data, status, headers, config) {
            return error(data);
        });
    };
    this.servicePost = function (url,data,success,error) {
        $http.post(url).success(function (data) {
            return success(data);
        }).error(function(data, status, headers, config) {
            return error(data);
        });
    };
});