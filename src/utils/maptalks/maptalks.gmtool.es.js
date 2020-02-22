import * as maptalks from 'maptalks'
const options = {
  'position': {right: 10, top: 100},
  'content': 'My Control',
  'mark': true,
  'switchBase': true,
  'measure': true,
  'show3d': true,
  'reset': true,
  'pointClear': true,
  'center': [0, 0],
  'zoom': 10
}

class GMComtrol extends maptalks.control.Control {
  buildOn (map) {
    const options = this.options
    const dom = maptalks.DomUtil.createEl('div', 'maptalks-gmtool')

    if (options['mark']) {
      const markDom = maptalks.DomUtil.createEl('button', 'maptalks-gmtool-mark')
      markDom.title = '标注'
      dom.appendChild(markDom)
      this._markDom = markDom
    }

    if (options['measure']) {
      const distanceDom = maptalks.DomUtil.createEl('button', 'maptalks-gmtool-distance')
      distanceDom.title = '测距'
      dom.appendChild(distanceDom)
      this._disntanceDom = distanceDom
      const areaDom = maptalks.DomUtil.createEl('button', 'maptalks-gmtool-area')
      areaDom.title = '侧面积'
      this._areaDOm = areaDom
      dom.appendChild(areaDom)
    }

    const show3dDom = maptalks.DomUtil.createEl('button', '')
    show3dDom.innerText = '2D'
    show3dDom.title = '倾斜'
    dom.appendChild(show3dDom)
    this._show3dDom = show3dDom

    const resetDom = maptalks.DomUtil.createEl('button', 'maptalks-gmtool-reset')
    resetDom.title = '复位'
    dom.appendChild(resetDom)
    this._resetDom = resetDom

    if (options['switchBase']) {
      const slDom = maptalks.DomUtil.createEl('button', 'maptalks-gmtool-shiliang')
      slDom.title = '矢量地图'
      dom.appendChild(slDom)
      this._slDom = slDom
    }

    if (options['pointClear']) {
      const clear = maptalks.DomUtil.createEl('button', 'maptalks-gmtool-clear')
      clear.title = '清除'
      dom.appendChild(clear)
      this._clear = clear
    }

    this._map = map
    // 注册事件
    this._registerMapEvents()
    this._registerDomEvents()
    return dom
  }
  _registerMapEvents () {
    if (this._show3dDom) {
      this._map.on('pitchend', (evt) => {
        if (evt.from > 7) {
          this._show3dDom.innerText = '3D'
          this._show3dDom.title = '倾斜'
        } else {
          this._show3dDom.innerText = '2D'
          this._show3dDom.title = '恢复'
        }
      })
      this._map.on('moveend', (evt) => {
        // console.log(111111111111111)
      })
    }
  }
  _registerDomEvents () {
    if (this._markDom) {
      maptalks.DomUtil.on(this._markDom, 'click', this._markClick, this)
      this.markVector = new maptalks.VectorLayer('markVector').addTo(this._map)
    }
    if (this._disntanceDom) {
      maptalks.DomUtil.on(this._disntanceDom, 'click', this._distanceClick, this)
    }
    if (this._areaDOm) {
      maptalks.DomUtil.on(this._areaDOm, 'click', this._areaClick, this)
    }
    if (this._slDom) {
      maptalks.DomUtil.on(this._slDom, 'click', this._slClick, this)
    }
    if (this._clear) {
      maptalks.DomUtil.on(this._clear, 'click', this._clearClick, this)
    }
    maptalks.DomUtil.on(this._show3dDom, 'click', this._show3dClick, this)
    maptalks.DomUtil.on(this._resetDom, 'click', this._resetClick, this)
  }
  // 标注
  _markClick () {
    var self = this
    var drawToolPoint = new maptalks.DrawTool({
      mode: 'Point',
      once: true
    }).addTo(this._map)
    drawToolPoint.on('drawend', function (param) {
      let point = new maptalks.Marker([param.coordinate.x, param.coordinate.y])
      // self.marker = new maptalks.Marker([param.coordinate.x, param.coordinate.y])
      // self.markVector.addGeometry(self.marker)
      self.markVector.addGeometry(point)
      point.setInfoWindow({
        'title': '<input placeholder="标题" class="titleClass">',
        'custom ': true,
        'content': "<input placeholder='文本描述' class='textClass'/><button class='saveClass'>保存</button>"
      })
      point.openInfoWindow()
      $('.saveClass').data('fea', point)
      $('.saveClass').click(function (e) {
        let point = $(e.currentTarget).data('fea')
        point.options.titleClass = $('.titleClass').val()
        point.options.textClass = $('.textClass').val()
        $('.saveClass').unbind()
      })
      point.on('click', function (e) {
        e.target.setInfoWindow({
          'title': '<input placeholder="标题" class="titleClass">',
          'custom ': true,
          'content': "<input placeholder='文本描述' class='textClass'/><button class='saveClass'>保存</button>"
        })
        e.target.openInfoWindow()
        $('.saveClass').data('fea', e.target)
        $('.saveClass').click(function (e) {
          let point = $(e.currentTarget).data('fea')
          point.options.titleClass = $('.titleClass').val()
          point.options.textClass = $('.textClass').val()
          $('.saveClass').unbind()
        })
        // console.log(e.target._coordinates.x)
        $('.titleClass').val(e.target.options.titleClass)
        $('.textClass').val(e.target.options.textClass)
      })
    })
  }
  // 测距
  _distanceClick () {
    new maptalks.DistanceTool({
      once: true,
      'symbol': {
        'lineColor': '#34495e',
        'lineWidth': 2
      },
      'vertexSymbol': {
        'markerType': 'ellipse',
        'markerFill': '#1bbc9b',
        'markerLineColor': '#000',
        'markerLineWidth': 3,
        'markerWidth': 10,
        'markerHeight': 10
      },
      'labelOptions': {
        'textSymbol': {
          'textFaceName': 'monospace',
          'textFill': '#fff',
          'textLineSpacing': 1,
          'textHorizontalAlignment': 'right',
          'textDx': 15,
          'markerLineColor': '#b4b3b3',
          'markerFill': '#000'
        },
        'boxStyle': {
          'padding': [6, 2],
          'symbol': {
            'markerType': 'square',
            'markerFill': '#000',
            'markerFillOpacity': 0.9,
            'markerLineColor': '#b4b3b3'
          }
        }
      },
      'clearButtonSymbol': [{
        'markerType': 'square',
        'markerFill': '#000',
        'markerLineColor': '#b4b3b3',
        'markerLineWidth': 2,
        'markerWidth': 15,
        'markerHeight': 15,
        'markerDx': 20
      }, {
        'markerType': 'x',
        'markerWidth': 10,
        'markerHeight': 10,
        'markerLineColor': '#fff',
        'markerDx': 20
      }],
      'language': 'en-US'
    }).addTo(this._map)
  }
  // 测面
  _areaClick () {
    new maptalks.AreaTool({
      once: true,
      'symbol': {
        'lineColor': '#1bbc9b',
        'lineWidth': 2,
        'polygonFill': '#fff',
        'polygonOpacity': 0.3
      },
      'vertexSymbol': {
        'markerType': 'ellipse',
        'markerFill': '#34495e',
        'markerLineColor': '#1bbc9b',
        'markerLineWidth': 3,
        'markerWidth': 10,
        'markerHeight': 10
      },
      'labelOptions': {
        'textSymbol': {
          'textFaceName': 'monospace',
          'textFill': '#fff',
          'textLineSpacing': 1,
          'textHorizontalAlignment': 'right',
          'textDx': 15
        },
        'boxStyle': {
          'padding': [6, 2],
          'symbol': {
            'markerType': 'square',
            'markerFill': '#000',
            'markerFillOpacity': 0.9,
            'markerLineColor': '#b4b3b3'
          }
        }
      },
      'clearButtonSymbol': [{
        'markerType': 'square',
        'markerFill': '#000',
        'markerLineColor': '#b4b3b3',
        'markerLineWidth': 2,
        'markerWidth': 15,
        'markerHeight': 15,
        'markerDx': 22
      }, {
        'markerType': 'x',
        'markerWidth': 10,
        'markerHeight': 10,
        'markerLineColor': '#fff',
        'markerDx': 22
      }],
      language: ''
    }).addTo(this._map)
  }
  // 底图切换
  _slClick () {
    if (this._slDom.title === '矢量地图') {
      this._slDom.title = '影像地图'
      this._slDom.className = 'maptalks-gmtool-yingxiang'
      this._map.setBaseLayer(
        new maptalks.TileLayer('影像', {
          urlTemplate: 'http://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=74963602164fee0c67b3858e4592df2a',
          subdomains: ['1', '2', '3', '4', '5']
        })
      )
    } else {
      this._slDom.title = '矢量地图'
      this._slDom.className = 'maptalks-gmtool-shiliang'
      this._map.setBaseLayer(
        new maptalks.TileLayer('矢量', {
          urlTemplate: 'http://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=74963602164fee0c67b3858e4592df2a',
          subdomains: ['1', '2', '3', '4', '5']
        })
      )
    }
  }
  // 地图倾斜
  _show3dClick () {
    if (this._show3dDom.innerText === '2D') {
      this._map.animateTo({
        pitch: 80
      })
      this._show3dDom.innerText = '3D'
      this._show3dDom.title = '恢复'
    } else {
      this._map.animateTo({
        pitch: 0
      })
      this._show3dDom.innerText = '2D'
      this._show3dDom.title = '倾斜'
    }
  }
  // 复位
  _resetClick () {
    this._map.animateTo({
      zoom: this.options.zoom,
      center: this.options.center,
      pitch: 0,
      bearing: 0
    })
  }
  // 清除标注
  _clearClick () {
    this.markVector.clear()
  }
}

GMComtrol.mergeOptions(options)

export {GMComtrol}
