var app = angular.module("myApp", []);

app.controller("ctrlIMG", function ($scope, $http) {
  $scope.list_cauHoi = [];
  $scope.currentIndex = 0;

  $http.get("/db/nhanVat.js").then(function (response) {
    $scope.list_cauHoi = response.data;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex]; // Ảnh hiện tại
  });

  $scope.nextImage = function () {
    $scope.currentIndex = ($scope.currentIndex + 3) % $scope.list_cauHoi.length;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.prevImage = function () {
    $scope.currentIndex =
      ($scope.currentIndex - 3 + $scope.list_cauHoi.length) %
      $scope.list_cauHoi.length;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.firstImage = function () {
    $scope.currentIndex = 0;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.lastImage = function () {
    $scope.currentIndex = $scope.list_cauHoi.length - 3;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.randomImage = function () {
    $scope.currentIndex = Math.floor(
      Math.random() * ($scope.list_cauHoi.length - 2)
    );
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };
});
