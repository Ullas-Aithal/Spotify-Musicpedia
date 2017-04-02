'use strict';

/**
 * @ngdoc function
 * @name musicInfoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicInfoApp
 */
angular.module('musicInfoApp')
  .controller('MainCtrl',function ($scope,$http) {
          
  $scope.artistSearchBox = "";
  $scope.returnData = "";
  $scope.artistList = [];
  $scope.albumList = [];
  $scope.trackList=[];
  //$scope.selectedArtist=[];
  $scope.selectedArtist={value:[]};
  $scope.selectedAlbum={value:[]};
  $scope.selectedTrack={value:[]};


  $scope.assignNull = function()
  {
  	$scope.artistList = "";      
      $scope.selectedArtist.value = "";
      $scope.albumList = "";      
      $scope.selectedAlbum.value = "";
      $scope.trackList = "";      
      $scope.selectedTrack.value = "";
  }
  


$scope.checkArtist = function(artist){
  	
  	//To avoid duplicate null values for the first time when the page loads.
  	if(artist == "") return;

  	//Reinitialize all dropdowns to null before populating
     $scope.assignNull();

     $scope.artistSearchBox = artist;


    
    $http({
      method: 'GET',
      url: 'https://api.spotify.com/v1/search/',
      params:{
        q: $scope.artistSearchBox,
        type: 'artist'
      }
      
    }).then(function successCallback(response)
           {
      $scope.artistList = response.data.artists.items;      
      

      
      
    },function errorCallback(response){
      $scope.artistList = "error";

      
    });
  };

  
   $scope.getAlbums = function(){
    
    $http({
      method: 'GET',
      url: 'https://api.spotify.com/v1/artists/' + $scope.selectedArtist.value.id.trim() + '/albums'
      
    }).then(function successCallback(response)
           {
      $scope.albumList = response.data.items;      
      
      
      
    },function errorCallback(response){
      $scope.albumList = "error";
    });
  };
  
  
  $scope.getTracks = function(){
    
    $http({
      method: 'GET',
      url: 'https://api.spotify.com/v1/albums/' + $scope.selectedAlbum.value.id.trim() + '/tracks'
      
    }).then(function successCallback(response)
           {
      $scope.trackList = response.data.items;          
            
      
    },function errorCallback(response){
      $scope.trackList = "error";
      
    });
  };
  
  
     
});
