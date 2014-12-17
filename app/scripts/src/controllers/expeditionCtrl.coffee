KCW.controller "expeditionCtrl", [
  "$scope"
  "getJson"
  ($scope, getJson) ->
    expeditionCalculate = (object, type, time) ->
      get = object.regard[type] * time
      cost = (if type is 1 or type is 2 then object.cost[type + 1] else 0)
      times = object.time.split(":")
      min = (Number(times[0]) * 60 + Number(times[1])) / 60
      (get - cost) / min
    calph = ->
      expeditionOp = []
      for item, index in  $scope.expedition
        item.regardph = JSON.parse(JSON.stringify(item.regard))
        item.regardph = (expeditionCalculate item, i, $scope.greatSuccessTime for e,i in item.regardph)

      return
    $scope.perHour = false
    $scope.greatSuccessTime = (if $scope.greatSuccess is true then 1.5 else 1)
    $scope.applys = ->
      $scope.greatSuccessTime = (if $scope.greatSuccess is true then 1.5 else 1)
      calph()
      return

    getJson.fetch("Expedition.json").then (data) ->
      $scope.esh = 1
      $scope.expedition = data
      expeditionOp = []
      $scope.expedition.forEach (item, index) ->
        expeditionOp.push item.id
        return

      calph()
      $scope.predicate = "id"
      $scope.expedition1 =  $scope.expedition2 = $scope.expedition3 = (e for e in expeditionOp)
      $scope.total = [
        0
        0
        0
        0
        0
      ]
      $scope.calget = ->
        x = expeditionOp.indexOf($scope.es1)
        y = expeditionOp.indexOf($scope.es2)
        z = expeditionOp.indexOf($scope.es3)
        $scope.total = $scope.total.map((e, i) ->
          ($scope.esh) * (((if x is -1 then 0 else expeditionCalculate($scope.expedition[x], i, (if $scope.esd1 then 1.5 else 1)))) + ((if y is -1 then 0 else expeditionCalculate($scope.expedition[y], i, (if $scope.esd2 then 1.5 else 1)))) + ((if z is -1 then 0 else expeditionCalculate($scope.expedition[z], i, (if $scope.esd3 then 1.5 else 1)))))
        )
        return

      return

]