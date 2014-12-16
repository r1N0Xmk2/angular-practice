KCW.controller "enemyCtrl", [
  "$scope"
  "$filter"
  "getJson"
  "shipType"
  "toSelectors"
  ($scope, $filter, getJson, shipType, toSelectors) ->
    $scope.predicate = "api_stype"
    $scope.reverse = false
    $scope.typesel = [1..shipType.length]
    $scope.shipFinal = true
    $scope.allType = true
    shipSuffix = [
      "normal"
      "elite"
      "flagship"
      "改flagship"
    ]
    $scope.shipSuffix = toSelectors(shipSuffix)
    $scope.suffixsel = [1..shipSuffix.length]
    getJson.fetch("Enemy.json").then (data) ->
      $scope.ships = data.api_mst_ship
      return

    $scope.summaxeq = (ship) ->
      ship.api_maxeq.reduce (a, b) ->
        a + b


    $scope.fuelBull = (ship) ->
      ship.api_bull_max + ship.api_fuel_max

    $scope.shipType = toSelectors(shipType)
    $scope.filterType = ->
      selects = []
      for e in $scope.shipType
        selects.push e.val  if e.selected is true
      $scope.typesel = selects
      if $scope.typesel.length is 0
        $scope.allType = false
      else $scope.allType = true  if $scope.typesel.length > 0
      return

    $scope.toggleType = ->
      $scope.typesel = []
      for e in $scope.shipType
        e.selected = $scope.allType
      $scope.filterType()
      return

    $scope.filterSuffix = ->
      selects = []
      for e in $scope.shipSuffix
         selects.push e.val  if e.selected is true
      $scope.suffixsel = selects
      return
]