KCW.controller "improveCtrl", [
  "$scope"
  "getJson"
  "toSelectors"
  ($scope, getJson, toSelectors) ->
    getShipName = (obj, arr) ->
      if obj is -1
        "不可"
      else if obj is 0
        "无需"
      else if obj is 999
        "???"
      else if typeof (obj) is "number"
        arr[obj].api_name
      else if Array.isArray(obj)
        (arr[e].api_name for e in obj).join " 或 "
    getItem = (obj, arr) ->
      if obj[1] is 0
        "无"
      else
        arr[obj[0]].api_name + "*" + obj[1]
    d = new Date()
    localTime = d.getTime()
    localOffset = d.getTimezoneOffset() * 60000
    utc = localTime + localOffset
    offset = 9
    tokyo = utc + (3600000 * offset)
    $scope.day = new Date(tokyo).getDay()
    $scope.week = []
    i = 0
    
    while i < 7
      if i is $scope.day
        $scope.week[i] = true
      else
        $scope.week[i] = false
      i++
    getJson.fetch("Improvement.json").then (data) ->
      getJson.fetch("Ships.min.json").then (ships) ->
        getJson.fetch("Equipment.min.json").then (equip) ->
          $scope.improves = {}
          
          for key, val of data.improvement
            ea = equip.api_mst_slotitem[key]
            $scope.improves[ea.api_name] = val
            $scope.improves[ea.api_name].api_type = ea.api_type
            for k, v of $scope.improves[ea.api_name].materials
              v[2] = getItem(v[2], equip.api_mst_slotitem)  if typeof (v) isnt "number"
            for e, i in $scope.improves[ea.api_name].week
              $scope.improves[ea.api_name].week[i] = getShipName(e, ships.api_mst_ship)

          return

        return

      return

]