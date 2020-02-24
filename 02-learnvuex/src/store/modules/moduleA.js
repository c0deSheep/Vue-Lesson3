export default {
  //modules模块对象,模块里的方法和名字不能和根下的一样,调用时要加入模块名

    state:{
      name1:'young'
    },
    mutations:{
      changName (state) {
        state.name1 = 'Cheung'
      }
    },
    getters:{

    },
    actions:{

    }

}
