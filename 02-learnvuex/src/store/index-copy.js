import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
//相当于在底层执行了Vuex.install
Vue.use(Vuex)


//modules模块对象,模块里的方法和名字不能和根下的一样,调用时要加入模块名
const moduleA = {
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

  // 修改state的唯一途径是mutations
  // 保存方法,默认需要传入一个state参数，不传的就使用this.state.xx
  // 使用里面的方法需要在用this.$store.commit('方法名')，来调用
  mutations:{
    increment () {
      this.state.counter ++;
    },
    decrement () {
      this.state.counter --;
    },

  //  但是，如果需要控制每次加减的数量，不拔counter写死加1，就需要传入第二个参数this.$store.commit('方法名'，第二参数),这里的第二个参数count就是在组件中传入
  //  另外如果在组件中以this.$store.commit({'方法',第二参数}) 传递的是一整个对象，那么这里state后面接收的就是一个对象参数，可以改名为payload
    incrementCount(state,payload){
      // state.counter += count;
      console.log(payload);
      // 下面的count就对应着组件里传进的count
      state.counter += payload.count


    },

    // 组件里传递对象更新state的方法也一样
    storeAddItem (state,obj) {
      state.lists.push(obj)
    },


    // 响应式改变数据状态
    storeUpdateInfo (state,payload) {
      //通过对象的方法修改
      //state.info.name = payload.info
      // 但是无法通过索引值的方式来修改页面达到同步，因为这种方式不是响应式，但是可以通过splice(数组)或Vue.set（对象/数组）的方法来修改，同时满足响应式
      // state.info['foot'] = '4'
      //--------Vue.set()方法，第一个参数是要修改的对象/数组，第二个参数是要添加的索引，第三个是值
      Vue.set(state.info,'foot','4')

    //  //--------Vue.delete()方法，第一个参数是要修改的对象/数组，第二个参数是要删除的索引
    //   Vue.delete(state.info,'name')
    },
    storeUpdateArr (state,payload) {
      // state.arr.splice((state.arr.length),0,payload.value)
      Vue.set(state.arr,4,5)
    },


  //  需要异步操作的mutations中的方法,可以传入payload,使用payload或payload的属性来修改state
    mutationUpdateInfo (state,payload) {
      state.info1 = payload.info1
    }

  },
  actions:{
    // 不要用mutations进行异步操作，但确实需要进行异步操作，比如：网络请求，就需要用到actions来代替
    // action里得方法有个默认参数：context,并且使用commit来提交mutations中的相关方法
    // context：上下文
    // 第二个参数可为payload,调用它的组件中传入的内容
    //     aUpdateInfo (context,payload) {
    //       setTimeout( () => {
    //         //这里固定用context.commit来将组件里的执行的修改状态方法提交,并且需要使用mutations中方法来修改
    //         // 并且可以传进payload,这里的payload也会提交给mutations中的方法
    //         context.commit('mutationUpdateInfo',payload)
    //         console.log(payload.message)
    //         payload.success();
    //       },1000)
    //     }
  //  简写
    aUpdateInfo (context,payload) {
      //  简写这里用运用并返回了一个Promise，而且谁调用了这个aUpdateInfo方法,就将这个promise返回去,
      //  就相当于new Promise(), 自然后面可以跟一个then()方法来继续下一步操作,所以在组件中后面可以跟then
      return new Promise((resolve,reject) => {
        setTimeout( () => {
          //这里固定用context.commit来将组件里的执行的修改状态方法提交
          context.commit('mutationUpdateInfo',payload)
          console.log(payload)

        //  调用resolve成功异步后执行的函数,里面接收的参数就是res,then接收的参数
          resolve ('Promise成功') ;
        },1000)
      })
    }




  },
  // 什么时候使用getters： 当公共数据需要一些变化再传到组件中时，
  // 怎么使用getters：组件中{{$store.getters.方法名}} 或 this.$store.getters.方法名

  //getters的作用和vue对象实例中的computed计算属性中getters一样，进行一些数字/计算
  // 下面就将上面的list进行过滤计算
  // 然后在组件中使用
  // 注意：getters中的函数的this不是这个vuex实例,所以显示undefined，而这个$this是一开始定义的this，保存了数据，所以这里能使用
  //      但不这样使用，直接使用规则，在getters里定义的函数传入state参数，就可以直接调用state属性中的数据
  getters:{
    // filterUnder20 ($this) {
    //   console.log(this)
    //   // return state.list.filter(function (list) {
    //   //   return list.weight > 200
    //   // } )
    //   //  function可以缩写为 () => {} ,里面默认为return
    //   // $this.state.lists.filter(s => s.weight > 200)
    //   console.log($this.lists.filter(s => s.weight > 200))
    // }
    filterUnder200 (state) {
      return state.lists.filter(s => s.weight > 200)
    },
  //  当需要得到这个lists的长度时，可以继续使用getters里自定义的函数方法来获取,这个时候传入第二个参数getters代表getters这个属性
  //  因为getters里的filterUnder20返回的就是得到的模板，再用getters.filterUnder20.length来得到这个目标，然后.length属性就可以获得长度
    filterUnder200Length (state,getters) {
      return getters.filterUnder200.length
    },

  // 并且，如果需要自定义filter的筛选条件，还是传进state参数，通过返回一个函数,并在函数里面传入需要的参数，相当于调用时调用了一个函数，传进需要的实参
    filterWeightList(state){
      // return function (age) {
      //   return state.lists.filter(s => s.weight > age)
      // }
    //  简写为箭头函数
      return age =>
        state.lists.filter(s => s.weight > age)

    }
  },


  //使用模块,将变量名对应key
  modules:{
    a : moduleA
  }
})

// 3.导出store
export default store
