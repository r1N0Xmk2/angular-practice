KCW.controller "enemyCtrl", [
  "$scope"
  "$filter"
  "getJson"
  "shipType"
  "toSelectors"
  ($scope, $filter, getJson, shipType, toSelectors) ->
    $scope.predicate = "api_stype"
    $scope.reverse = false
    $scope.typesel = shipType.map((e, i) ->
      i + 1
    )
    $scope.shipFinal = true
    $scope.allType = true
    shipSuffix = [
      "normal"
      "elite"
      "flagship"
      "改flagship"
    ]
    $scope.shipSuffix = toSelectors(shipSuffix)
    $scope.suffixsel = shipSuffix.map((e, i) ->
      i + 1
    )
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
      $scope.shipType.forEach (e) ->
        selects.push e.val  if e.selected is true
        return

      $scope.typesel = selects
      if $scope.typesel.length is 0
        $scope.allType = false
      else $scope.allType = true  if $scope.typesel.length > 0
      return

    $scope.toggleType = ->
      $scope.typesel = []
      $scope.shipType.forEach (e) ->
        e.selected = $scope.allType
        return

      $scope.filterType()
      return

    $scope.filterSuffix = ->
      selects = []
      $scope.shipSuffix.forEach (e) ->
        selects.push e.val  if e.selected is true
        return

      $scope.suffixsel = selects
      return
]