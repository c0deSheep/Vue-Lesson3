import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import moduleA from './modules/moduleA'


// 1.安装插件
//相当于在底层执行了Vuex.install
Vue.use(Vuex)


// 2.创建Vuex实例对象
const store = new Vuex.Store({
  //保存状态
  state:{
    counter:1000,
    //定义一个数组，里面保存对象
    lists:[{
      id:110,name:'goose',weight:'100',
      },
      {
        id:111,name:'tiger',weight:'200',
      },
      {
        id:112,name:'lion',weight:'220',
      },
      {
        id:113,name:'elephant',weight:'5000',
      }],
    info:{
      name:'dog',
      weight:'10'
    },
    arr:[1,2,3,4],
    info1:'我是待异步修改状态'
  },
  // 最后将各个属性代码抽离分类存放,方便日后维护
  mutations,
  getters,
  actions,

  //使用模块,将变量名对应key
  modules:{
    a : moduleA
  }
})

// 3.导出store
export default store
