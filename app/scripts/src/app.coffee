KCW = angular.module("KCW", ["ngRoute"])
KCW.config [
  "$routeProvider"
  "$locationProvider"
  ($routeProvider, $locationProvider) ->
    $routeProvider.when("/",
      templateUrl: "view/main.html"
      controller: "mainCtrl"
    ).when("/expedition",
      templateUrl: "view/expedition.html"
      controller: "expeditionCtrl"
    ).when("/ships",
      templateUrl: "view/ships.html"
      controller: "shipsCtrl"
    ).when("/enemy",
      templateUrl: "view/enemy.html"
      controller: "enemyCtrl"
    ).when("/equipment",
      templateUrl: "view/equipment.html"
      controller: "eqCtrl"
    ).when("/enemy-equipment",
      templateUrl: "view/equipment.html"
      controller: "eeqCtrl"
    ).when("/view-range",
      templateUrl: "view/view-range.html"
      controller: "vrCtrl"
    ).when("/improvement",
      templateUrl: "view/improvement.html"
      controller: "improveCtrl"
    ).otherwise redirectTo: "/"
]