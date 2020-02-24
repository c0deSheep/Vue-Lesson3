<template>
    <div>
      <p>{{data}}</p>
    </div>
</template>

<script>
    // 组件也要引入axios的包
    import axios from 'axios'

    export default {
      name: "cpn",
      data() {
        return {
          data:''
        }
      },
      //为避免出现第三方插件停止更新，难以维护，不直接使用第三方插件，而是集中封装，再分派调用
      // created () {
      //   axios({
      //     url:'http://123.207.32.32:8000/api/hy/home/data',
      //     params:{
      //       type:'sell',
      //       page:1
      //     }
      //   }).then( res => {
      //     console.log(res);
      //     this.data = res
      //   })
      // },

    }
</script>

<style scoped>

</style>
