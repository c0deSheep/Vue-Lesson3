<template>
  <div id="app">
    <h2>{{$store.state.lists}}</h2>
    <!--使用$store.state.数据名 来调用vuex里存放的公共数据-->
    <h2>{{$store.state.counter}}</h2>
    <!--使用$store.commit('方法')来修改vuex里的公共数据（不能之直接修改state.数据）-->
    <button @click="appInrement">+</button>
    <button @click="$store.commit('decrement')">-</button>
    <h2>{{$store.state.list}}</h2>
    <h2>---------------通过store中的getters属性中的自定义过滤方法筛出weight大于200的</h2>
    <h2>{{$store.getters.filterUnder200}}</h2>
    <!--可以通过这样来获取上面这个过滤后的数组的长度，当并不推荐，应该在getters里用函数的形式获取-->
    <h2>{{$store.getters.filterUnder200.length}}</h2>
    <h2>---------------通过store中的getters属性中的自定义过滤方法，并自定义过滤条件，筛出weight大于需要的条件的名单</h2>
    <h2>{{$store.getters.filterWeightList(100)}}</h2>

    <h2>---------------需要自定义加减的数量，就需要传入参数，同样时使用$store.commit('方法')，但是需要传入第二个参数就是自定义的数量</h2>
    <button @click="appInrement2(25)">+25</button>


    <h2>---------------当需要传进一个对象时候，方法也是和上面这个传参一样</h2>
    <button @click="addItem">传进一个对象</button>


    <!--响应式更改信息-->
    <h2>---------------响应式改变数据，只要有用到状态的都改变</h2>
    <h2>{{$store.state.info}}</h2>
    <h2>{{$store.state.arr}}</h2>
    <button @click="updateInfo('Coding')">响应式改变数据(对象)</button>
    <button @click="updateArr(5)">响应式改变数据(数组)</button>



    <!--需要异步操作的状态修改,仍然是需要mutations,但也需要action-->
    <h2>{{$store.state.info1}}</h2>
    <button @click="actionUpdateInfo('组件可以传递参数进store,通过action调用mutation修改')">异步操作修改状态</button>


    <!--尝试模块状态,使用时需强调模块,在key前加上模块名-->
    <h1>------------------------模块分界线---------------------------</h1>
    <h1>{{$store.state.a.name1}}</h1>
    <button @click="cpnChangeName">模块mutation</button>
    <hello-vuex></hello-vuex>
  </div>
</template>

<script>
  import HelloVuex from './components/HelloVuex'
  export default {
    name: 'App',
    data () {
      return {
        message: '我是App组件'
      }
    },
    components:{
      HelloVuex
    },
    methods:{
      appInrement () {
        // 通过使用this.$store.commit('函数')，来调用vuex中的mutations属性里的方法
        this.$store.commit('increment')
      },
      // appDecrement () {
      //   this.$store.commit('decrement')
      // },

      // 通过使用this.$store.commit('函数'，数据)，来调用vuex中的mutations属性里的方法，并将数据，传入到store里面设置
      appInrement2(count) {
        //payload:载荷
        // 1.普通的提交封装
        // this.$store.commit('incrementCount',count);

        // 2.特殊的提交封装,通过传递一个对象，type就是index里面的对应的方法，
        // 这样传过去时，count和type都成为了一个对象那个的属性
        this.$store.commit({
          //type是固定写法，对应着方法
          type:'incrementCount',
          //剩下的就是自定义传进的参数，对应函数传的实参
          count:count
        })

      },

      // 传入对象的写法
      addItem () {
        // 定义一个对象
        const obj = {id:114,name:"egg",weight:0.5}
        //this.$store.commit('需要用到的方法'，传进的参数)
        this.$store.commit('storeAddItem',obj)
      },

    //  响应式修改store里的state信息(对象)
      updateInfo (info) {
        this.$store.commit({
          type:'storeUpdateInfo',
          info:info
        })
      },
      //响应式修改store里的state信息(数组)
      updateArr (value) {
        this.$store.commit({
          type:'storeUpdateArr',
          value:value
        })
      },

  // {
  //   type:'aUpdateInfo',
  //     info1:info1
  // }

      // 异步操作修改状态的方法,不能用commit来提交,使用dispatch
      // dispatch和commit一样,第一个参数为接收调用的函数,commit为mutation的方法,dispatch为action中的方法
      //                     第二个参数为payload，传回store中dispatch或commit对接的方法接收的内容，可为字符串/数字/对象/数组
      actionUpdateInfo (info1) {
        // this.$store.dispatch('aUpdateInfo',{
        //   info1:info1,
        //   message:'我是异步传进来的信息',
        //   success: () => {
        //     console.log('store里面已经完成异步操作')
        //   }
        // })
      //  简写优化
        this.$store.dispatch('aUpdateInfo',{
            info1:info1,
            message:'我是异步传进来的信息',
            success: () => {
              console.log('store里面已经完成异步操作')
            }
          //  上面的dispatch调用了action方法,因为action里的方法返回的是一个Promise,所以后面可以紧跟一个then来接着下一步的操作需要
          }).then((res) => {
          console.log('store action done!');
          console.log(res)
        })
      },

      cpnChangeName () {
        this.$store.commit('changName')
      }
    }
  }
</script>

<style>

</style>
