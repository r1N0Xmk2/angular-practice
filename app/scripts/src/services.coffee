KCW.factory("getJson", ($q, $timeout, $http) ->
  getJson = fetch: (what) ->
    deferred = $q.defer()
    $timeout (->
      $http.get("data/" + what).success (data) ->
        deferred.resolve data
        return

      return
    ), 30
    deferred.promise

  getJson
).factory("toSelectors", ->
  (arr) ->
    (name: e,val: i + 1,selected: true for e,i in arr)

    arr.map (e, i) ->
      name: e
      val: i + 1
      selected: true

).factory("shipType", ->
  [
    "海防艦"
    "駆逐艦"
    "軽巡洋艦"
    "重雷装巡洋艦"
    "重巡洋艦"
    "航空巡洋艦"
    "軽空母"
    "巡洋戦艦"
    "戦艦"
    "航空戦艦"
    "正規空母"
    "超弩級戦艦"
    "潜水艦"
    "潜水空母"
    "補給艦"
    "水上機母艦"
    "揚陸艦"
    "装甲空母"
    "工作艦"
    "潜水母艦"
  ]
).factory "eqType", ->
  [
    "小口径主砲"
    "中口径主砲"
    "大口径主砲"
    "副砲"
    "魚雷"
    "艦上戦闘機"
    "艦上爆撃機"
    "艦上攻撃機"
    "艦上偵察機"
    "水上偵察機"
    "水上爆撃機"
    "小型電探"
    "大型電探"
    "ソナー"
    "爆雷"
    "追加装甲"
    "機関部強化"
    "対空強化弾"
    "対艦強化弾"
    "VT信管"
    "対空機銃"
    "特殊潜航艇"
    "応急修理要員"
    "上陸用舟艇"
    "オートジャイロ"
    "対潜哨戒機"
    "追加装甲(中型)"
    "追加装甲(大型)"
    "探照灯"
    "簡易輸送部材"
    "艦艇修理施設"
    "潜水艦魚雷"
    "照明弾"
    "司令部施設"
    "航空要員"
    "高射装置"
  ]
