
export default {
  // 修改state的唯一途径是mutations
  // 保存方法,默认需要传入一个state参数，不传的就使用this.state.xx
  // 使用里面的方法需要在用this.$store.commit('方法名')，来调用
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


}
