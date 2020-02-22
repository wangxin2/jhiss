// 图表封装
export function containEle (title, resArray, nowNumBer1, nowNumBer2, sty1, sty2) {
  var option = null
  if (sty2 == '' || sty2 == null) {
    option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 13,
          fontWeight: 'bold',
          color: '#000'
        },
        x: 'center',
        y: 'top'
      },
      color: ['#00c0ff'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '0',
        right: '0',
        bottom: '0',
        top: '5px',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
              // width: 1 // 这里是为了突出显示加上的
            }
          },
          data: resArray,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
              // width: 1 // 这里是为了突出显示加上的
            }
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '',
          type: sty1,
          barWidth: '8px',
          data: nowNumBer1
        }
      ]

    }
  } else {
    option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 13,
          fontWeight: 'bold',
          color: '#000'
        },
        x: 'center',
        y: 'top'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: [],
      // {
      //     data: [{
      //         name: '出动车辆',
      //         textStyle: {
      //             color: '#fff'
      //         }
      //     }, {
      //         name: '出动人数',
      //         textStyle: {
      //             color: '#fff'
      //         }
      //     }, {
      //         name: '持续时间',
      //         textStyle: {
      //             color: '#fff'
      //         }
      //     }],
      // },
      yAxis: [{
        type: 'value',
        name: '',
        nameTextStyle: {
          color: 'black'
        },
        min: 0,
        max: 400,
        axisLabel: {
          formatter: '{value}'
          // textStyle: {
          //     fontSize: 13,
          //     color: 'black'
          // }
        }

      },
      {
        type: 'value',
        name: '',
        nameTextStyle: {
          color: 'black'
        },
        min: 0,
        max: 200,
        axisLabel: {
          formatter: '{value}'
          // textStyle: {
          //     fontSize: 13,
          //     color: 'black'
          // }
        }
      }],
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
          width: 0.5,
          opacity: 0.1
        }
      },

      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#fff'
          },
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#00a0e8',
            width: 1,
            opacity: 0.2
          }
        }, // 显示x格子
        data: resArray
      },
      series: [{
        name: '总量',
        type: sty1,
        stack: '设施',
        barWidth: '20px',

        itemStyle: {
          normal: {
            color: '#E24C68'
          }
        },
        data: nowNumBer1
      }, {
        name: '损坏量',
        type: sty2,
        stack: '车辆',
        itemStyle: {
          normal: {
            color: '#ccc'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: nowNumBer2
      }]
    }
  }

  return option
}
// 环形图
export function huanbar (value) {
  var option = null
  var option = {
    // 标题组件，包含主标题和副标题
    title: {
      show: true,
      text: '',
      x: 'center',
      textStyle: {
        fontSize: '15',
        color: 'green',
        fontWeight: 'bold'
      }

    },
    //  提示框组件
    tooltip: {
      // 是否显示提示框组件，包括提示框浮层和 axisPointe
      show: false,
      // 触发类型: item:数据项触发，axis：坐标轴触发
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    // // 图例
    // legend: {
    //     orient: 'vertical',
    //     x: 'left',
    //     data:['完成率']
    // },

    // 系列列表。每个系列通过 type 决定自己的图表类型
    series: [
      {
        // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
        name: '任务进度',
        type: 'pie',
        // 饼图的半径，数组的第一项是内半径，第二项是外半径
        radius: ['50%', '70%'],
        // 是否启用防止标签重叠策略，默认开启
        avoidLabelOverlap: false,
        hoverAnimation: false,
        // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { // 数据值
            value: value * 100,
            // 数据项名称
            name: '配备率',
            // 该数据项是否被选中
            selected: false,
            // 单个扇区的标签配置
            label: {
              normal: {
                // 是显示标签
                show: true,
                position: 'center',
                fontSize: 20,
                // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                formatter: '{b}\n{d}%'
              }

            }

          },
          {
            value: (1 - value) * 100,
            label: {
              normal: {
                show: false

              }
            }

          }

        ]
      }
    ]
  }
  return option
}
export function huanbar2 (value) {
  var option = null
  var option = {
    // 标题组件，包含主标题和副标题
    title: {
      show: true,
      text: '',
      x: 'center',
      textStyle: {
        fontSize: '15',
        color: '#02EFF2',
        fontWeight: 'bold'
      }
    },
    //  提示框组件
    tooltip: {
      // 是否显示提示框组件，包括提示框浮层和 axisPointe
      show: false,
      // 触发类型: item:数据项触发，axis：坐标轴触发
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    // // 图例
    // legend: {
    //     orient: 'vertical',
    //     x: 'left',
    //     data:['完成率']
    // },

    // 系列列表。每个系列通过 type 决定自己的图表类型
    series: [
      {
        // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
        name: '任务进度',
        type: 'pie',
        // 饼图的半径，数组的第一项是内半径，第二项是外半径
        radius: ['50%', '70%'],
        // 是否启用防止标签重叠策略，默认开启
        avoidLabelOverlap: false,
        hoverAnimation: false,
        // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { // 数据值
            value: value * 100,
            // 数据项名称
            name: '完好率',
            // 该数据项是否被选中
            selected: false,
            // 单个扇区的标签配置
            label: {
              normal: {
                // 是显示标签
                show: true,
                position: 'center',
                fontSize: 20,
                // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                formatter: '{b}\n{d}%'
              }

            }

          },
          {
            value: 100,
            label: {
              normal: {
                show: false

              }
            }

          }

        ]
      }
    ]
  }
  return option
}
export function containEle2 (title, resArray, nowNumBer1, nowNumBer2, sty1, sty2) {
  var option = null
  if (sty2 == '' || sty2 == null) {
    option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 13,
          fontWeight: 'bold',
          color: '#000'
        },
        x: 'center',
        y: 'top'
      },
      color: ['#00c0ff'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '0',
        right: '0',
        bottom: '0',
        top: '5px',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
              // width: 1 // 这里是为了突出显示加上的
            }
          },
          data: resArray,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
              // width: 1 // 这里是为了突出显示加上的
            }
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '',
          type: sty1,
          barWidth: '25px',
          data: nowNumBer1
        }
      ]

    }
  } else {
    option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 13,
          fontWeight: 'bold',
          color: '#000'
        },
        x: 'center',
        y: 'top'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: [],
      // {
      //     data: [{
      //         name: '出动车辆',
      //         textStyle: {
      //             color: '#fff'
      //         }
      //     }, {
      //         name: '出动人数',
      //         textStyle: {
      //             color: '#fff'
      //         }
      //     }, {
      //         name: '持续时间',
      //         textStyle: {
      //             color: '#fff'
      //         }
      //     }],
      // },
      yAxis: [{
        type: 'value',
        name: '',
        nameTextStyle: {
          color: 'black'
        },
        min: 0,
        max: 400,
        axisLabel: {
          formatter: '{value}'
          // textStyle: {
          //     fontSize: 13,
          //     color: 'black'
          // }
        }

      },
      {
        type: 'value',
        name: '',
        nameTextStyle: {
          color: 'black'
        },
        min: 0,
        max: 200,
        axisLabel: {
          formatter: '{value}'
          // textStyle: {
          //     fontSize: 13,
          //     color: 'black'
          // }
        }
      }],
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
          width: 0.5,
          opacity: 0.1
        }
      },

      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#fff'
          },
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#00a0e8',
            width: 1,
            opacity: 0.2
          }
        }, // 显示x格子
        data: resArray
      },
      series: [{
        name: '总量',
        type: sty1,
        stack: '设施',
        barWidth: '20px',

        itemStyle: {
          normal: {
            color: '#E24C68'
          }
        },
        data: nowNumBer1
      }, {
        name: '损坏量',
        type: sty2,
        stack: '车辆',
        itemStyle: {
          normal: {
            color: '#ccc'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: nowNumBer2
      }]
    }
  }

  return option
}

// 多柱状图
export function containDataSet (source, series) {
  var option = {
    // title: {
    //   text: title,
    //   textStyle: {
    //     fontSize: 13,
    //     fontWeight: 'bold',
    //     color: '#000'
    //   },
    //   x: 'center',
    //   y: 'top'
    // },
    grid: {
      left: '30',
      right: '30',
      bottom: '20',
      top: '60',
      containLabel: true
    },
    legend: {
      // orient: 'vertical',
      top: 20,
      // left: 10
      // bottom: 5,
      left: 'center',
      textStyle: { // ----图例内容样式
        color: '#fff' // ---所有图例的字体颜色
        // backgroundColor:'black',  //---所有图例的字体背景色
      }
    },
    tooltip: {},
    dataset: {
      // dimensions: dimensions,
      source: source
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        textStyle: { // ----图例内容样式
          color: '#fff' // ---所有图例的字体颜色
          // backgroundColor:'black',  //---所有图例的字体背景色
        }
      },
      axisLine: {
        lineStyle: {
          // color: '#fff'
          // width: 1 // 这里是为了突出显示加上的
        }
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      axisLabel: {
        interval: 0,
        textStyle: { // ----图例内容样式
          color: '#fff' // ---所有图例的字体颜色
          // backgroundColor:'black',  //---所有图例的字体背景色
        }
      },
      axisLine: {
        lineStyle: {
          // color: '#fff'
          // width: 1 // 这里是为了突出显示加上的
        }
      },
      splitLine: {
        show: true
      }
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: series
  }
  return option
}
// 饼图
export function containBing (type, title, legend, dataArr) {
  var option = null
  if (type == 1) {
    option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 13,
          fontWeight: 'bold',
          color: '#03b0ea'
        },
        x: 'center',
        y: 'top'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        // orient: 'vertical',
        bottom: 0,
        // left: 0,
        // bottom: 5,
        left: 'center',
        data: legend,
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: title,
          type: 'pie',
          radius: ['30%', '65%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: dataArr
        }
      ]

    }
  } else {
    option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 13,
          fontWeight: 'bold',
          color: '#000'
        },
        x: 'center',
        y: 'top'
      },
      // color:['red','#aaa','#bbb','#ccc','#ddd','#eee'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      calculable: true,
      series: [
        {
          name: '',
          type: 'pie',
          radius: [30, 110],
          center: ['50%', '55%'],
          roseType: 'area',
          data: dataArr
        }
      ]
    }
  }

  return option
}
// category 折线图
export function category (type, title, legend, dataArr) {
  var option = null
  option = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {

      textStyle: { color: 'white' },
      data: ['易燃易爆化学品', '高层建筑', '人员密集场所', '地下建筑、隧道']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: '#00E4FF'
        }
      },
      data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: '#00E4FF'
        }
      }
    },
    series: [
      {
        name: '易燃易爆化学品',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [20, 32, 41, 34, 90, 30, 90, 56, 45, 35, 45, 48]
      },
      {
        name: '高层建筑',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [20, 82, 91, 34, 90, 30, 10, 23, 45, 32, 56, 48]
      },
      {
        name: '人员密集场所',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [50, 32, 51, 54, 90, 30, 40, 45, 32, 34, 46, 68]
      },
      {
        name: '地下建筑、隧道',
        type: 'line',
        symbolSize: 8,

        itemStyle: {
          normal: {
            // 拐点上显示数值
            label: {
              show: false
            },
            borderColor: 'red', // 拐点边框颜色
            lineStyle: {
              width: 5, // 设置线宽
              type: 'solid' // 'dotted'虚线 'solid'实线
            }
          }
        },

        stack: '总量',
        data: [20, 32, 31, 34, 90, 33, 30, 23, 65, 98, 15, 45]
      }

    ],
    color: ['#00EE00', '#FF9F7F', '#FFD700']
  }
  return option
}
// category 折线图
export function category2 (type, title, legend, dataArr) {
  var option = null
  option = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
      orient: 'horizontal',
      // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
      x: 'center',
      // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
      y: 'bottom',
      textStyle: { color: 'white' },
      data: ['一级', '二级', '三级', '四级', '五级']
    },
    grid: {
      left: '3%',
      right: '8%',
      top: '8%',
      bottom: '13%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: '#00E4FF'
        }
      },
      data: ['1日', '6日', '12日', '18日', '24日', '30日']
    },
    yAxis: {
      type: 'value',
      min: 0, // 设置y轴刻度的最小值
      max: 3, // 设置y轴刻度的最大值
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: '#00E4FF'
        }
      }
    },
    series: [
      {
        name: '一级',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [0.90, 0.56, 0.45, 0.35, 0.45, 0.48]
      },
      {
        name: '二级',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [0.10, 0.23, 0.45, 0.32, 0.56, 0.48]
      },
      {
        name: '三级',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [0.40, 0.45, 0.32, 0.34, 0.46, 0.68]
      },
      {
        name: '四级',
        type: 'line',
        symbolSize: 8,

        itemStyle: {
          normal: {
            // 拐点上显示数值
            label: {
              show: false
            },
            borderColor: 'red', // 拐点边框颜色
            lineStyle: {
              width: 5, // 设置线宽
              type: 'solid' // 'dotted'虚线 'solid'实线
            }
          }
        },

        stack: '总量',
        data: [0.30, 0.23, 0.65, 0.98, 0.15, 0.45]
      },
      {
        name: '五级',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [0.40, 0.45, 0.32, 0.34, 0.46, 0.68]
      }

    ],
    color: ['#00EE00', '#FF9F7F', '#FFD700']
  }
  return option
}
// category 折线图
export function category3 (type, title, legend, dataArr) {
  var option = null
  option = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
      orient: 'horizontal',
      // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
      x: 'center',
      // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
      y: 'bottom',
      textStyle: { color: 'white' },
      data: ['一级', '二级', '三级', '四级', '五级']
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: '#00E4FF'
        }
      },
      data: ['1日', '6日', '12日', '18日', '24日', '30日']
    },
    yAxis: {
      type: 'value',
      min: 0, // 设置y轴刻度的最小值
      max: 3, // 设置y轴刻度的最大值
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: '#00E4FF'
        }
      }
    },
    series: [
      {
        name: '一级',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [0.3, 0.6, 0.4, 0.5, 0.4, 0.8]
      },
      {
        name: '二级',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [0.1, 0.3, 0.5, 0.2, 0.6, 0.8]
      },
      {
        name: '三级',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [0.4, 0.6, 0.3, 0.4, 0.6, 0.8]
      },
      {
        name: '四级',
        type: 'line',
        symbolSize: 8,

        itemStyle: {
          normal: {
            // 拐点上显示数值
            label: {
              show: false
            },
            borderColor: 'red', // 拐点边框颜色
            lineStyle: {
              width: 5, // 设置线宽
              type: 'solid' // 'dotted'虚线 'solid'实线
            }
          }
        },

        stack: '总量',
        data: [0.3, 0.2, 0.6, 0.8, 0.5, 0.4]
      },
      {
        name: '五级',
        type: 'line',
        symbolSize: 8,
        stack: '总量',
        data: [0.4, 0.4, 0.2, 0.4, 0.6, 0.8]
      }

    ],
    color: ['#00EE00', '#FF9F7F', '#FFD700']
  }
  return option
}
// 线柱图
export function linebar () {
  var option = null
  option = {
    color: ['#00c0ff'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      top: '5px',
      containLabel: true
    },
    tooltip: {},
    // 设置图例
    legend: {
      textStyle: { // ----图例内容样式
        color: '#fff' // ---所有图例的字体颜色
        // backgroundColor:'black',  //---所有图例的字体背景色
      },
      data: ['总量', '同期', '环期']
    },

    // 设置x轴
    xAxis: {
      itemStyle: {
        color: '#00C0FF',
        width: 1,
        type: 'solid'
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
          // width: 1 // 这里是为了突出显示加上的
        }
      },
      data: ['检查单位', '发现隐患', '整改隐患', '行政处罚', '临时查封', '责任三停', '拘留']
    },
    yAxis: {
      splitLine: {
        show: false // 隐藏 背景线
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
          // width: 1 // 这里是为了突出显示加上的
        }
      }
    },
    series: [{
      barWidth: 30, // 柱图宽度
      name: '总量',
      type: 'bar',
      data: [30, 40, 16, 35, 20, 45, 50]
    },
    // 折线图
    {
      'name': '同期',
      'type': 'line',
      'data': [30, 40, 16, 35, 20, 45, 50],
      symbol: 'circle', // 折线点设置为实心点
      symbolSize: 8, // 折线点的大小
      itemStyle: {
        normal: {
          color: 'yellow', // 折线点的颜色
          lineStyle: {
            color: 'yellow'// 折线的颜色
          }
        }
      }
    },
    {
      name: '环期',
      type: 'line',
      symbolSize: 8,
      symbol: 'circle',
      itemStyle: {
        normal: {
          color: '#32FF38', // 折线点的颜色
          lineStyle: {
            color: '#2D9231'// 折线的颜色
          }
        }
      },
      'data': [45, 20, 46, 35, 40, 30, 20]
    }
    ]
  }
  return option
}
// 饼图
export function containBing2 (type, title, data, legend, dataArr) {
  var option = null
  if (type == 1) {
    option = {
      // title: {
      //   text: '',
      //   subtext: '',
      //   x: 'center'
      // },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        // type: 'scroll',
        // orient: 'vertical',
        bottom: 2,
        right: 0,
        textStyle: {// 图例文字的样式
          color: '#ccc',
          fontSize: 12
        },
        data: data
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['30%', '60%'],
          // center: ['45%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
              // position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '18',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: dataArr,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            normal: {
              color: function (params) {
                // 自定义颜色
                var colorList = [
                  '#4286F5', '#56DA8E', '#FEBC4B', '#FE5E3A', '#00E4FF', '#D46565', '#00E4FF'
                ]
                return colorList[params.dataIndex]
              }
            }
          }
        }
      ]
    }
  } else {
    option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 13,
          fontWeight: 'bold',
          color: '#000'
        },
        x: 'center',
        y: 'top'
      },
      // color:['red','#aaa','#bbb','#ccc','#ddd','#eee'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      calculable: true,
      series: [
        {
          name: '',
          type: 'pie',
          radius: [30, 110],
          center: ['50%', '55%'],
          roseType: 'area',
          data: dataArr
        }
      ]
    }
  }

  return option
}

// 关系图
export function containGraph (title, graph, categories) {
  var option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000'
      },
      x: 'center',
      y: 'top'
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: '',
        type: 'graph',
        layout: 'circular',
        circular: {
          rotateLabel: true
        },
        data: graph.nodes,
        links: graph.links,
        categories: categories,
        roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        focusNodeAdjacency: true, // 当鼠标移动到节点上，突出显示节点以及节点的边和邻接节点
        legendHoverLink: true, // 是否启用图例 hover(悬停) 时的联动高亮。
        label: {
          normal: {
            position: 'right',
            formatter: '{b}'
          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0.3
          }
        }
      }
    ]
  }
  return option
}
// 地图
export function containMap (title, dataArray, pointData, geoCoordMap, conData) {
  // var geoCoordMap = {//自定义城市坐标
  //     "青岛":[120.33,36.07],
  //     "厦门":[118.1,24.46],
  //     "宁波":[121.56,29.86],
  //     "深圳":[114.07,22.62],
  //     "大连":[121.62,38.92]
  // };
  var convertData = function (data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name]
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    return res
  }
  var option = {
    // backgroundColor: '#BBFFFF',
    title: {
      text: title,
      textStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000'
      },
      x: 'center',
      y: 'top'
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        var res = params.name + '<br/>'
        var myseries = option.series
        if (convertData) {
          for (var i = 0; i < myseries.length - 1; i++) {
            for (var j = 0; j < myseries[i].data.length; j++) {
              if (myseries[i].data[j].name == params.name) {
                res += myseries[i].name + ' : ' + myseries[i].data[j].value + '</br>'
              }
            }
          }
        } else {
          for (var i = 0; i < myseries.length; i++) {
            for (var j = 0; j < myseries[i].data.length; j++) {
              if (myseries[i].data[j].name == params.name) {
                res += myseries[i].name + ' : ' + myseries[i].data[j].value + '</br>'
              }
            }
          }
        }
        return res
      }
    },
    // legend: {
    //     orient: 'vertical',
    //     x:'left',
    //     data:['超时','失败','运行中']
    // },
    dataRange: {
      min: 0,
      max: 30,
      x: 'left',
      y: 'bottom',
      color: ['red', 'orange', 'yellow', 'green'],
      text: ['高', '低'],
      // textStyle: {
      //     color: '#fff'          // 值域文字颜色
      // },
      calculable: true
    },
    // toolbox: {
    //     show: true,
    //     orient : 'vertical',
    //     x: 'right',
    //     y: 'center',
    //     feature : {
    //         mark : {show: true},
    //         dataView : {show: true, readOnly: false},
    //         restore : {show: true},
    //         saveAsImage : {show: true}
    //     }
    // },
    roamController: {
      show: true,
      x: 'right',
      mapTypeControl: {
        'china': true
      }
    },
    geo: {
      show: true,
      roam: 'scale', // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
      map: 'china',
      label: { // 图形上的文本标签，可用于说明图形的一些数据信息
        emphasis: {
          show: true, // 是否显示文本
          color: '#CCC' // 文本颜色
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#FFE4CA',
          borderColor: '#84C1FF',
          borderWidth: 0.8
          // borderColor: 'red',
          // borderWidth: 0.8
        },
        emphasis: {
          areaColor: '#FFC78E'
        }
      },
      silent: false // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
    },
    series: [
      {
        name: '人数',
        type: 'map',
        mapType: 'china',
        roam: true,
        itemStyle: {
          normal: { label: { show: false } },
          emphasis: { label: { show: true } }
        },
        data: [
          { name: '广东', value: 4 },
          { name: '黑龙江', value: 1 },
          { name: '湖南', value: 3 }
        ]
      },
      {
        name: '计划单列市',
        type: 'effectScatter', // 影响散点
        coordinateSystem: 'geo',
        symbolSize: 12,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            color: '#c60fff',
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: convertData(conData)
      }
    ]
  }
  return option
}
// 新老用户统计
export function containPerson (title, legend, pathSymbols) {
  var labelSetting = {
    normal: {
      show: true,
      position: 'right',
      offset: [10, 0],
      textStyle: {
        fontSize: 16
      }
    }
  }
  var option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000'
      },
      x: 'center',
      y: 'top'
    },
    legend: {
      left: 0,
      top: 10,
      data: legend
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      containLabel: true,
      left: 20
    },
    yAxis: {
      data: ['person'],
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        margin: 30,
        textStyle: {
          fontSize: 14
        }
      },
      axisPointer: {
        label: {
          show: true,
          margin: 30
        }
      }
    },
    xAxis: {
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    series: [{
      name: '新用户',
      type: 'pictorialBar',
      label: labelSetting,
      symbolRepeat: true,
      symbolSize: ['50%', '80%'],
      barCategoryGap: '20%',
      data: [{
        value: 123,
        symbol: pathSymbols.person
      }]
    }, {
      name: '老用户',
      type: 'pictorialBar',
      barGap: '10%',
      label: labelSetting,
      symbolRepeat: true,
      symbolSize: ['50%', '80%'],
      data: [{
        value: 95,
        symbol: pathSymbols.person
      }]
    }]

  }
  return option
}
// 年龄分布
export function containAge (title, xAxis_age, data_age, dataArr_age, pathSymbols) {
  var option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000'
      },
      x: 'center',
      y: 'top'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: function (params) {
        return params[0].name + ': ' + params[0].value
      }
    },
    xAxis: {
      data: xAxis_age,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        textStyle: {
          color: '#e54035'
        }
      }
    },
    yAxis: {
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false }
    },
    color: ['#e54035'],
    series: [{
      name: 'hill',
      type: 'pictorialBar',
      barCategoryGap: '-130%',
      // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      itemStyle: {
        normal: {
          opacity: 0.5
        },
        emphasis: {
          opacity: 1
        }
      },
      data: data_age,
      z: 10
    }, {
      name: 'glyph',
      type: 'pictorialBar',
      barGap: '-100%',
      symbolPosition: 'end',
      symbolSize: 50,
      symbolOffset: [0, '-120%'],
      data: dataArr_age
    }]

  }
  return option
}
// 地图2
export function containMap2 (geoCoordMap) {
  var convertData = function (data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name]
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    // console.log(res)
    return res
  }

  var option = {
    // title: {
    //   text: '测试bar3D、scatter3D、geo3D',
    //   x: 'left',
    //   top: '10',
    //   textStyle: {
    //     color: '#000',
    //     fontSize: 14
    //   }
    // },
    tooltip: {
      show: true
      // formatter:(params)=>{
      //   let data = "测试1:"+params.name + "<br/>"+"值:"+ params.value[2]+"<br/>"+"地理坐标:[" + params.value[0]+","+params.value[1] +"]";
      //   return data;
      // },
    },
    visualMap: [{
      type: 'continuous',
      seriesIndex: 0,
      text: ['bar3D'],
      calculable: true,
      max: 300,
      inRange: {
        color: ['#87aa66', '#eba438', '#d94d4c']
      }
    }, {
      type: 'continuous',
      seriesIndex: 1,
      text: ['scatter3D'],
      left: 'right',
      max: 100,
      calculable: true,
      inRange: {
        color: ['#000', 'blue', 'purple']
      }
    }],
    geo3D: {
      map: '北京',
      bottom: '50',
      left: '80',
      zoom: 1.5,
      roam: 'scale',
      itemStyle: {
        color: '#1d5e98',
        opacity: 1,
        borderWidth: 0.4,
        borderColor: '#000'
      },
      label: {
        show: true,
        textStyle: {
          color: '#f00', // 地图初始化区域字体颜色
          fontSize: 8,
          opacity: 1,
          backgroundColor: 'rgba(0,23,11,0)'
        }
      },
      emphasis: { // 当鼠标放上去  地区区域是否显示名称
        label: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 3,
            backgroundColor: 'rgba(0,23,11,0)'
          }
        }
      },
      // shading: 'lambert',
      light: { // 光照阴影
        main: {
          color: '#fff', // 光照颜色
          intensity: 1.2, // 光照强度
          // shadowQuality: 'high', //阴影亮度
          shadow: false, // 是否显示阴影
          alpha: 55,
          beta: 10

        },
        ambient: {
          intensity: 0.3
        }
      }
    },
    series: [{
      name: 'bar3D',
      type: 'bar3D',
      coordinateSystem: 'geo3D',
      barSize: 1, // 柱子粗细
      shading: 'lambert',
      opacity: 1,
      bevelSize: 0.3,
      label: {
        show: false,
        formatter: '{b}'
      },
      data: convertData([{
        name: '天安门',
        value: (Math.random() * 300).toFixed(2)
      }, {
        name: '生态环境部',
        value: (Math.random() * 300).toFixed(2)
      }, {
        name: '古热带植物园',
        value: (Math.random() * 300).toFixed(2)
      }, {
        name: '顺义奥林匹克水上公园',
        value: (Math.random() * 300).toFixed(2)
      }, {
        name: '应急管理部',
        value: (Math.random() * 300).toFixed(2)
      }, {
        name: '北京航空航天大学',
        value: (Math.random() * 300).toFixed(2)
      }
      ])
    }, {
      name: 'scatter3D',
      type: 'scatter3D',
      coordinateSystem: 'geo3D',
      symbol: 'pin',
      symbolSize: 30,
      opacity: 1,
      label: {
        show: false,
        formatter: '{b}'
      },
      itemStyle: {
        borderWidth: 0.5,
        borderColor: '#fff'
      },
      data: convertData([{
        name: '自然资源部',
        value: ((Math.random() * 100) + 50).toFixed(2)
      }, {
        name: '十渡自然风景区',
        value: ((Math.random() * 100) + 50).toFixed(2)
      }, {
        name: '北京国际鲜花港',
        value: ((Math.random() * 100) + 50).toFixed(2)
      }, {
        name: '百花山风景区',
        value: ((Math.random() * 100) + 50).toFixed(2)
      }])
    }]
  }
  return option
}
// 地图3
export function containMap3 (geoCoordMap) {
  var convertData = function (data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name]
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    // console.log(res)
    return res
  }
  var option = {
    // title: {
    //   text: '',
    //   x: 'left',
    //   top: "10",
    //   textStyle: {
    //     color: '#000',
    //     fontSize: 14
    //   }
    // },
    tooltip: {
      show: true,
      formatter: (params) => {
        let data = '城市:' + params.name + '<br/>' + '值:' + params.value[2] + '<br/>' + '地理坐标:[' + params.value[0] + ',' + params.value[1] + ']'
        return data
      }
    },
    visualMap: [{
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      text: ['bar3D'],
      calculable: true,
      max: 300,
      inRange: {
        color: ['#87aa66', '#eba438', '#d94d4c']
      }
    }, {
      show: false,
      type: 'continuous',
      seriesIndex: 1,
      text: ['scatter3D'],
      left: 'right',
      max: 100,
      calculable: true,
      inRange: {
        color: ['#000', 'blue', 'purple']
      }
    }],
    geo3D: {
      map: '北京',
      bottom: '50',
      left: '80',
      zoom: 1.5,
      selectedMode: 'single', // single 表示单选;multiple表示多选 默认flase不选
      roam: 'scale',
      // regions: [{
      //   name: '昌平区',
      //   itemStyle: {
      //     color: '#2f4554'
      //   }
      // }],
      itemStyle: {
        color: '#124a5b',
        opacity: 1,
        borderWidth: 0.7,
        borderColor: '#d48265'
      },
      label: {
        show: true,
        position: 'inside',
        distance: 0.5,
        textStyle: {
          color: 'white', // 地图初始化区域字体颜色
          fontSize: 8,
          opacity: 1,
          backgroundColor: 'rgba(0,23,11,0)'
        }
      },
      // itemStyle:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
      emphasis: { // 当鼠标放上去  地区区域是否显示名称
        label: {
          show: true,
          textStyle: {
            color: 'red',
            fontSize: 3,
            backgroundColor: 'rgba(0,23,11,0)'
          }
        }
      },
      // shading: 'lambert',
      light: { // 光照阴影
        main: {
          color: '#fff', // 光照颜色
          intensity: 1.2, // 光照强度
          // shadowQuality: 'high', //阴影亮度
          shadow: false, // 是否显示阴影
          alpha: 55,
          beta: 10
        },
        ambient: {
          intensity: 0.3
        }
      },
      viewControl: {// 用于鼠标的旋转，缩放等视角控制
        distance: 100, // 默认视角距离主体的距离
        // panMouseButton: 'left', // 平移操作使用的鼠标按键
        // rotateMouseButton: 'right', // 旋转操作使用的鼠标按键
        rotateMouseButton: 'left',
        alpha: 100 // 让canvas在x轴有一定的倾斜角度
      }
      // postEffect: {// 为画面添加高光，景深，环境光遮蔽（SSAO），调色等效果
      //   enable: true, // 是否开启
      //   SSAO: {// 环境光遮蔽
      //     radius: 1, // 环境光遮蔽的采样半径。半径越大效果越自然
      //     intensity: 1, // 环境光遮蔽的强度
      //     enable: true
      //   }
      // }
    },
    series: [
      // 柱状图
      {
        name: 'bar3D',
        type: 'bar3D',
        coordinateSystem: 'geo3D',
        barSize: 1, // 柱子粗细
        shading: 'lambert',
        opacity: 1,
        bevelSize: 0.3,
        label: {
          show: false,
          formatter: '{b}'
        },
        // data: convertData([{
        //   name: '天安门',
        //   value: (Math.random() * 300).toFixed(2)
        // }, {
        //   name: '生态环境部',
        //   value: (Math.random() * 300).toFixed(2)
        // }, {
        //   name: '古热带植物园',
        //   value: (Math.random() * 300).toFixed(2)
        // }, {
        //   name: '顺义奥林匹克水上公园',
        //   value: (Math.random() * 300).toFixed(2)
        // }, {
        //   name: '应急管理部',
        //   value: (Math.random() * 300).toFixed(2)
        // }, {
        //   name: '北京航空航天大学',
        //   value: (Math.random() * 300).toFixed(2)
        // }
        // ])
        data: convertData([])
      },
      {
        name: 'scatter3D',
        type: 'scatter3D',
        coordinateSystem: 'geo3D',
        symbol: 'pin',
        symbolSize: 30,
        opacity: 1,
        label: {
          show: false,
          formatter: '{b}'
        },
        itemStyle: {
          borderWidth: 0.5,
          borderColor: '#fff'
        },
        data: convertData([])
        // data: convertData([{
        //   name: '自然资源部',
        //   value: ((Math.random() * 100) + 50).toFixed(2)
        // }, {
        //   name: '十渡自然风景区',
        //   value: ((Math.random() * 100) + 50).toFixed(2)
        // }, {
        //   name: '北京国际鲜花港',
        //   value: ((Math.random() * 100) + 50).toFixed(2)
        // }, {
        //   name: '百花山风景区',
        //   value: ((Math.random() * 100) + 50).toFixed(2)
        // }])
      }
      // 画线
      // {
      //   type: 'lines3D',

      //   coordinateSystem: 'geo3D',

      //   effect: {
      //     show: true,
      //     trailWidth: 1,
      //     trailOpacity: 0.5,
      //     trailLength: 0.2,
      //     constantSpeed: 5
      //   },

      //   blendMode: 'lighter',

      //   lineStyle: {
      //     width: 0.2,
      //     opacity: 0.05
      //   },

      //   data: [
      //     [
      //       [121.15, 31.89],
      //       [109.781327, 39.608266]
      //     ],
      //     [
      //       [120.38, 37.35],
      //       [122.207216, 29.985295]
      //     ],
      //     [
      //       [123.97, 47.33],
      //       [120.13, 33.38]
      //     ],
      //     [
      //       [118.87, 42.28],
      //       [120.33, 36.07]
      //     ],
      //     [
      //       [121.52, 36.89],
      //       [117.93, 40.97]
      //     ],
      //     [
      //       [102.188043, 38.520089],
      //       [122.1, 37.5]
      //     ],
      //     [
      //       [118.58, 24.93],
      //       [101.718637, 26.582347]
      //     ],
      //     [
      //       [120.53, 36.86],
      //       [121.48, 31.22]
      //     ],
      //     [
      //       [119.46, 35.42],
      //       [122.05, 37.2]
      //     ],
      //     [
      //       [119.97, 35.88],
      //       [116.1, 24.55]
      //     ],
      //     [
      //       [121.05, 32.08],
      //       [112.02, 22.93]
      //     ],
      //     [
      //       [91.11, 29.97],
      //       [118.1, 24.46]
      //     ]
      //   ]
      // }
    ]
  }
  var scatter3D_arr = []
  for (var key in geoCoordMap) {
    var obj = {
      name: key,
      value: 0
    }
    scatter3D_arr.push(obj)
  }
  option.series[1].data = convertData(scatter3D_arr)
  return option
}
// 多图表封装
export function containElePub (resArray, dataList) {
  var option = {
    // title: {
    //   text: title,
    //   textStyle: {
    //     fontSize: 13,
    //     fontWeight: 'bold',
    //     color: '#000'
    //   },
    //   x: 'center',
    //   y: 'top'
    // },
    color: ['#09f0ff', '#02f336', '#ff9800', '#f65d00', '#e41c23'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    // legend: {
    //   textStyle: { // ----图例内容样式
    //     color: '#fff' // ---所有图例的字体颜色
    //     // backgroundColor:'black',  //---所有图例的字体背景色
    //   },
    //   data: ['总量', '同期', '环期']
    // },
    legend: {
      // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
      orient: 'horizontal',
      // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
      x: 'center',
      // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
      y: 'bottom',
      textStyle: { color: 'white' },
      data: ['一级', '二级', '三级', '四级', '五级']
    },
    grid: {
      left: '0',
      right: '10',
      bottom: '25',
      top: '5px',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
            // width: 1 // 这里是为了突出显示加上的
          }
        },
        data: resArray,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff'
            // width: 1 // 这里是为了突出显示加上的
          }
        },
        splitLine: {
          show: true
        }
      }
    ],
    series: [
      {
        name: dataList[0].name,
        type: dataList[0].sty,
        barWidth: '8px',
        data: dataList[0].number
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5
    }
  }
  var series = []
  var legend_data = []
  for (var i = 0; i < dataList.length; i++) {
    var obj = {
      name: dataList[i].name,
      stack: dataList[i].stack, // 堆叠条形图
      type: dataList[i].sty,
      barWidth: dataList[i].barWidth = dataList[i].barWidth || '8px',
      // symbolSize: 8,
      data: dataList[i].number,
      markPoint: {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      }
    }
    legend_data.push(dataList[i].name)
    series.push(obj)
  }
  option.legend.data = legend_data
  option.series = series
  return option
}
export function MixedLineAndBar (legendData, xAxisData, seriesData) {
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    // toolbox: {
    //   feature: {
    //     dataView: {show: true, readOnly: false},
    //     magicType: {show: true, type: ['line', 'bar']},
    //     restore: {show: true},
    //     saveAsImage: {show: true}
    //   }
    // },
    grid: {
      left: '30',
      right: '30',
      bottom: '0',
      top: '22',
      containLabel: true
    },
    legend: {
      textStyle: { // ----图例内容样式
        color: '#fff' // ---所有图例的字体颜色
        // backgroundColor:'black',  //---所有图例的字体背景色
      },
      data: legendData
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        // axisPointer: {
        //   type: 'shadow'
        // },
        axisLabel: {
          interval: 0,
          // rotate: -40,
          textStyle: {
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            // color: '#fff'
            // width: 1 // 这里是为了突出显示加上的
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        // name: '水量',
        // min: 0,
        // max: 250,
        // interval: 50,
        axisLabel: {
          textStyle: {
            color: '#fff'
          },
          formatter: '{value}'
        },
        axisLine: {
          textStyle: {
            color: '#fff'
          },
          lineStyle: {
            // color: '#fff'
            width: 1 // 这里是为了突出显示加上的
          }
        },
        splitLine: {
          show: false
        }
      },
      {
        type: 'value',
        // name: '温度',
        // min: 0,
        // max: 200,
        // interval: 5,
        axisLabel: {
          textStyle: {
            color: '#fff'
          },
          formatter: '{value}'
        },
        axisLine: {
          lineStyle: {
            // color: '#fff'
            // width: 1 // 这里是为了突出显示加上的
          }
        },
        splitLine: {
          show: true
        }
      }
    ],
    series: seriesData,
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5
    }
  }
  return option
}
