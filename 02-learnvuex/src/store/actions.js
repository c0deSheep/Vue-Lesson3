export default {
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




}
