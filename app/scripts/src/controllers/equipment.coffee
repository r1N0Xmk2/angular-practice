KCW.controller "eqCtrl", [
  "$scope"
  "$filter"
  "getJson"
  "eqType"
  "toSelectors"
  ($scope, $filter, getJson, eqType, toSelectors) ->
    $scope.predicate = "api_type"
    $scope.reverse = false
    $scope.typesel = eqType.map((e, i) ->
      i + 1
    )
    $scope.allType = true
    getJson.fetch("Equipment.json").then (data) ->
      $scope.eqs = data.api_mst_slotitem
      return

    $scope.eqType = toSelectors(eqType)
    $scope.filterType = ->
      selects = []
      $scope.eqType.forEach (e) ->
        selects.push e.val  if e.selected is true
        return

      $scope.typesel = selects
      if $scope.typesel.length is 0
        $scope.allType = false
      else $scope.allType = true  if $scope.typesel.length > 0
      return

    $scope.toggleType = ->
      $scope.typesel = []
      $scope.eqType.forEach (e) ->
        e.selected = $scope.allType
        return

      $scope.filterType()
      return
]