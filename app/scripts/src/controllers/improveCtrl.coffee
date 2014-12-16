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
        obj.map((e) ->
          arr[e].api_name
        ).join " 或 "
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
          Object.keys(data.improvement).forEach (ele) ->
            $scope.improves[equip.api_mst_slotitem[ele].api_name] = data.improvement[ele]
            $scope.improves[equip.api_mst_slotitem[ele].api_name].api_type = equip.api_mst_slotitem[ele].api_type
            Object.keys($scope.improves[equip.api_mst_slotitem[ele].api_name].materials).forEach (e) ->
              $scope.improves[equip.api_mst_slotitem[ele].api_name].materials[e][2] = getItem($scope.improves[equip.api_mst_slotitem[ele].api_name].materials[e][2], equip.api_mst_slotitem)  if typeof ($scope.improves[equip.api_mst_slotitem[ele].api_name].materials[e]) isnt "number"
              return

            $scope.improves[equip.api_mst_slotitem[ele].api_name].week.forEach (e, i, arr) ->
              arr[i] = getShipName(e, ships.api_mst_ship)
              return

            return

          return

        return

      return

]