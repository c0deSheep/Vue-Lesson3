import  axios from 'axios'

//导出一个网络请求实例，根据需要可以发送多个，主要在url中不同
//传入config请求网络配置，成功请求回调函数，失败回调函数
// export function request (config,success,failure)  {
//   // 创建一个axios的实例
//   const instance = axios.create({
//     baseURL : 'http://123.207.32.32:8000',
//     timeout:5000
//   });
//   // 使用axios实例，发送真正网络请求
//   //  注意：已经定义的配置将和利用create创建的实例的配置合并
//   instance(config).then(res => {
//     success(res)
//   }).catch(err => {
//     failure(err)
//   })
// }

// 优化：直接传入一个对象，包含三个参数
// export function request (config)  {
//   // 创建一个axios的实例
//   const instance = axios.create({
//     baseURL : 'http://123.207.32.32:8000',
//     timeout:5000
//   });
//   // 使用axios实例，发送真正网络请求
//   //  注意：已经定义的配置将和利用create创建的实例的配置合并
//   instance(config.baseConfig).then(res => {
//     config.success(res)
//   }).catch(err => {
//     config.failure(err)
//   })
// }

// 继续优化，将返回的axios实例再用Promise包裹，可以进行回调
//   export function request (config)  {
//     return new Promise( (resolve,reject) => {
//       // 创建一个axios的实例
//       const instance = axios.create({
//         baseURL : 'http://123.207.32.32:8000',
//         timeout:5000
//       });
//       // 使用axios实例，发送真正网络请求
//       //  注意：已经定义的配置将和利用create创建的实例的配置合并
//       instance(config)
//         .then(res => {
//           resolve(res)
//       }).catch(err => {
//           reject(err)
//       })
//     })
// }

// 继续优化：因为一个axios实例就是一个promise，可以直接回调，所以直接返回这个实例，
  export function request (config)  {
    // 1.创建一个axios的实例
    const instance = axios.create({
      baseURL : 'http://123.207.32.32:8000',
      timeout:5000
    });

    // 2.axios的拦截器
    // axios.interceptors ----全局拦截器
    // 实例的就是局部拦截器
    // use有两个参数，前一个请求满足的函数(这个函数接收的参数就是传进的请求连接)，后一个为请求失败的函数
    // 2.1请求拦截的作用
    instance.interceptors.request.use(config => {
      // console.log(config)
    //  拦截后的处理可能有：
      // 1.筛选掉不符合需求的信息
      // 2.每次发送网络请求时，在页面显示请求动画
      // 3.比如某些网络请求（比如登录（token），必须携带一些特殊的信息）
    //  拦截后进行处理之后，需要将内容返回，否则不会到达main.js中
      return config
    }, err => {
      // console.log(err)
    });

    // 2.2响应拦截的作用
    // 获取的就是main.js中获得最终内容，其中需要的是其中的data属性
    instance.interceptors.response.use(res => {
      console.log(res.data)

    //  同样处理完拦截的内容后，必须要返回，否则，main.js无法接收
      return res.data
    },err => {
      console.log(err)
    })

    // 3.使用axios实例，发送真正网络请求
    return instance(config)
  }
