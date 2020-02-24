<template>
  <div id="app">
    <h2>{{result}}</h2>
    <h2>--------------------------下面是组件请求内容--------------</h2>
    <cpn></cpn>
  </div>
</template>

<script>
  import cpn from './components/cpn'
  import axios from 'axios'


export default {
  name: 'App',
  data () {
    return {
      result:''
    }
  },
  components: {
    cpn,
  },
  //
  //实现一旦生成网页就发生网络请求的方式，使用生命周期函数中的created
  // created(){
  //   axios({
  //     url:'http://123.207.32.32:8000/home/multidata'
  //   }).then( res => {
  //     console.log(res);
  //     this.result = res
  //   })
  // }
}
</script>

<style>

</style>
