KCW.controller "mainCtrl", [
  "$scope"
  "$location"
  ($scope, $location) ->
    $scope.isActive = (route) ->
      route is $location.path()
]