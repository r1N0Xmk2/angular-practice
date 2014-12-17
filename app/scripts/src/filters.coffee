KCW.filter("etype", (eqType) ->
  (n) ->
    unless isNaN(Number(n))
      eqType[n - 1]
    else if n is "team"
      "√(全裸舰娘索敌)"
    else "司令部进位至5的倍数"  if n is "admiral"
).filter("stype", (shipType) ->
  (n) ->
    shipType[n - 1]
).filter("maxeq", ->
  (oldArr) ->
    arr = oldArr.map((e) ->
      e
    )
    while arr[arr.length - 1] is 0
      arr.pop()
    total = 0
    if arr.length isnt 0
      total = arr.reduce((a, b) ->
        a + b
      )
    (if total is 0 then 0 else total + "(" + arr.join(",") + ")")
).filter("rare", ->
  (n) ->
    rare = [
      "コモン"
      "レア"
      "ホロ"
      "Sホロ"
      "SSホロ"
      "SSSホロ"
    ]
    rare[n]
).filter("soku", ->
  (n) ->
    if n is 5
      "低速"
    else if n is 10
      "高速"
    else
      "陆上"
).filter("afterlv", ->
  (n) ->
    (if n is 0 then "-" else n)
).filter("leng", ->
  arr = [
    "無"
    "短"
    "中"
    "長"
    "超長"
  ]
  (n) ->
    arr[n]
).filter("afterlv0", ->
  (items, flag) ->
    return items  unless flag
    filtered = []
    items = items or []
    for e in items
      filtered.push e  if e.api_afterlv is 0
    filtered
).filter("filterType", ->
  (items, arr) ->
    if items
      filtered = []
      for e in items
        filtered.push e  if arr.indexOf(e.api_stype) isnt -1

      filtered
).filter("filterEqType", ->
  (items, arr) ->
    if items
      filtered = []
      for e in items
        filtered.push e  if arr.indexOf(e.api_type[2]) isnt -1

      filtered
).filter("filterSuffix", ->
  (items, arr) ->
    filtered = []
    items = items or []
    shipSuffix = [
      ""
      "elite"
      "flagship"
      "brsflagship"
    ]
    arr_ = (shipSuffix[e - 1] for e in arr)
    for e in items
      filtered.push e  if arr_.indexOf(e.api_yomi) isnt -1

    filtered
).filter("zerotodash", ->
  (num) ->
    if num is 0
      "-"
    else
      num
).filter("nodash", ->
  (str) ->
    str.replace /\-/, ""
).filter("delbrs", ->
  (str) ->
    str.replace /brs/, ""
).filter("nobr", ->
  (str) ->
    str.replace /\<br\>/, ""
).filter "todayImprove", ->
  (items, day) ->
    selected = {}
    items = items or []
    for k, v of items
      selected[k] = v if v.week[day] isnt "不可"
    selected
