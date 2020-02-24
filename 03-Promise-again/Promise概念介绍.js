// 同步操作就是：必须吃完饭，才能喝汤   ||  异步操作就是：边吃饭边喝汤

// 1.Promise是es6新增的方法，用于解决回调地狱问题，仅此而已

// 2.Promise是一个构造函数，所有可以new Promise()得到一个Promise实例

// 3.Promise上，有两个函数，一个叫resolve（成功回调函数），一个叫reject（失败回调函数）

// 4.在Promise构造函数的Prototype 原型对象里定义了两个方法 ： .then()  .catch()
//   也就是说只要是Promise实例，都可以访问

// 5.Promise表示一个 异步操作 ， 当new 一个Promise实例，这个实例就是一个具体的异步操作

// 6.既然 Promise创建的实例，是一个异步操作，那么这个异步操作的结果，只能有两种状态：
//   6.1 状态1 ： 异步执行成功了 需要在内部调用成功的回调函数resolve 把结果返回给调用者
//   6.2 状态2 ： 异步执行失败了 需要在内部调用失败的回调函数reject 把结果返回给调用者
//   6.3 状态3 ： Promise 的实例，是一个异步操作，所以内部拿到操作的结果后，无法使用return把
//       操作的结果返回（return）给调用者；这时候，需要使用回调函数形式，把结果返回给调用者

// 7.我们可以在new 出来的Promise 实例上，调用 .then() 方法，【预先】为这个Promise异步操作，
//   指定 成功（resolve） 和 失败（reject）  回调函数


// ---------------------------------


// 这是一个具体的异步操作，其中，使用function 自定一个具体的异步操作，
// 这个function里面一定要接受参数，一个是resolve表示成功回调，一个是reject表示失败回调
// const promise = new Promise(function () {
//   // 这个 function 内部写道就是具体的异步操作
      // resolve()
      // reject()
// })

// 注意：.then 指定回调函数时候，成功的回调函数 resolve， 必须传，失败的回调 reject ，可以不传


// ---------------------------------

function getPromise(data) {
  return  new Promise((resolve, reject) =>{
    setTimeout(function () {
      resolve(data)
      reject(404)
    },1000)
  })

}

// getPromise('i am promise maked by function')
//   .then((data)=>{
//   console.log(data + '-----------------')
// }).catch((err)=>{
//   console.log(err + '---------------')
// })

// console.log('-------------分界线，上下两种都可以，只是上面使用函数来接受一个Promise实例更多用于保存Promise变量，以便重复调用，而下面直接调用-----------------------------')

// new Promise((resolve, reject) =>{
//   setTimeout(function () {
//     resolve('i am promise from directly')
//     reject(404)
//   },1000)
// }).then((data)=>{
//   console.log(data + '-----------------')
// }).catch((err)=>{
//   console.log(err + '---------------')
// })


//-----------------------------------------------------

// 在上一个 .then 中 返回（return）一个新的promise 实例，可以进行使用 下一个 .then 来处理

getPromise('i am promise maked by function')
  .then ((data) => {
    console.log(data)
    return getPromise('i am promise maked by function')
  })
  .then ((data) => {
    console.log(data)
    return getPromise('i am promise maked by function')
  })
  .then ((data) => {
    console.log(data)
  })

// 当 有需求：哪怕前面的Promise执行失败了，但是步要影响后面 Promise 的正常执行，此时，可以为每个.then（）返回
//  一个promise，并指定一个reject失败的回调函数 ----->   .then(success , fail)



// -----------------------------------------------------

getPromise('success 1')
  .then ((data) => {
    console.log(data)
    return getPromise('success 2')
  })
  .then ((data) => {
    console.log(data)
    return getPromise('success 3')
  })
  .then ((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log (err.message)
  })



// 除了.then() 还有.catch 作用是：如果运行中catch前面有任何Promise执行失败，则立即终止所有promise的执行，并
// 马上进入catch去处理Promise中抛出的异常
