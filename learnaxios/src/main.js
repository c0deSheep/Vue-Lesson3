import Vue from 'vue'
import App from './App'
// import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})


// 1.axios的基本使用:  axios()
// 后面的then是类es6中的promise写法表示请求成功后的操作
// axios({
//   url:'http://123.207.32.32:8000/home/multidata'
// }).then(res => {
//   console.log(res);
// })


//获得的结果里，除了data，其他都是axios默认返回的http协议状态码

// axios({
//   url:'http://106.54.54.237:8000/api/hy/home/data',
//   //获取数据的方法
//   method:'get',
// //  专门针对get请求的参数拼接
//   params:{
//     type:'pop',
//     page:1
//   }
// }).then(res => {
//   console.log(res);
// })


// 2.axios的发送并发请求,
// axios.all()默认传入一个数组，数组里转载的是需要发送的请求（一个到多个）
// axios.all([axios({
//   url:'http://123.207.32.32:8000/home/multidata'
// }),axios({
//   url:'http://106.54.54.237:8000/api/hy/home/data',
//   params:{
//     type: 'sell',
//     page: 5
//   }
// })])
//   .then(results => {
// //    统一的相关处理
// //   无论传入一个还是多个， 结果都以数组形式返回
//     console.log(results);
// })

//公共url配置
// axios.defaults.baseURL = 'http://123.207.32.32:8000'
// axios.defaults.timeout = 5000
//
// axios.all([axios({
//   url:'/home/multidata'
// }),axios({
//   url:'http://106.54.54.237:8000/api/hy/home/data',
//   params:{
//     type: 'sell',
//     page: 5
//   }
// })])
//   // 以axios.spread()方式可以将数组中元素展开
//   .then(axios.spread((res1, res2) => {
// //    统一的相关处理
// //   无论传入一个还是多个， 结果都以数组形式返回
//     console.log(res1);
//     console.log(res2);
//   })
//   )


// 3.封装request模块（通过集中封装第三方axios插件，分派调用）


// 优化：通过再request中添加一个return new Promise代码，将返回一个实例用Promise包装，可以进行then回调
import {request} from "./netswork/request";
//request返回一个new Promise
// request({
//   url:'/home/multidata'
// }).then(res => {
//   //成功执行函数
//   console.log(res)
// }).catch( err => {
//   // 失败执行函数
//   console.log(err)
// })


// 以上需要优化：因为axios实例本身就是一个Promise实例，所以不需要再额外添加一句return new Promise代码，下面也不需要用resolve来回调这里的then代码
// 就可以直接回调，所以最终优化其实只是优化request中：
// 最终优化：
// request返回一个new Promise
request({
  url:'/home/multidata'
}).then(res => {
  //成功执行函数
  console.log(res)
}).catch( err => {
  // 失败执行函数
  console.log(err)
})

