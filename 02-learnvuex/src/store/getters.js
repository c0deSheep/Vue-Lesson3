export default {
  // 什么时候使用getters： 当公共数据需要一些变化再传到组件中时，
  // 怎么使用getters：组件中{{$store.getters.方法名}} 或 this.$store.getters.方法名

  //getters的作用和vue对象实例中的computed计算属性中getters一样，进行一些数字/计算
  // 下面就将上面的list进行过滤计算
  // 然后在组件中使用
  // 注意：getters中的函数的this不是这个vuex实例,所以显示undefined，而这个$this是一开始定义的this，保存了数据，所以这里能使用
  //      但不这样使用，直接使用规则，在getters里定义的函数传入state参数，就可以直接调用state属性中的数据
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
}
