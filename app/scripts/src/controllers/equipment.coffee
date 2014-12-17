KCW.controller "eqCtrl", [
  "$scope"
  "$filter"
  "getJson"
  "eqType"
  "toSelectors"
  ($scope, $filter, getJson, eqType, toSelectors) ->
    $scope.predicate = "api_type"
    $scope.reverse = false
    $scope.typesel = [1..eqType.length]
    $scope.allType = true
    getJson.fetch("Equipment.json").then (data) ->
      $scope.eqs = data.api_mst_slotitem
      return

    $scope.eqType = toSelectors(eqType)
    $scope.filterType = ->
      selects = []
      for e in $scope.eqType
        selects.push e.val  if e.selected is true
      $scope.typesel = selects
      if $scope.typesel.length is 0
        $scope.allType = false
      else $scope.allType = true  if $scope.typesel.length > 0
      return

    $scope.toggleType = ->
      $scope.typesel = []
      for e in $scope.eqType
        e.selected = $scope.allType
      $scope.filterType()
      return
]