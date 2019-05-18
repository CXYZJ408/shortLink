export default ({store, route, redirect, error, params, req, res}) => {
  //用户路由拦截
  //检测登录状态
  //todo 用户拦截
  // return
  if (!store.state.isLogin) {
    // 未登陆
    if (route.path.indexOf("/user_center") !== -1) {//如果没有登录要访问后台就禁止访问
      return redirect('/login')
    }
  } else {
    //已登录
    if (route.path === '/login' || route.path === '/register') {
      let url = "/user_center/my_center"
      console.log(store.state.purchaseVip)
      if (store.state.purchaseVip) {//如果购买，跳转到vip购买页面
        if (store.state.isMobile) {
          url = "/user_center_mobile/my_center"
        } else {
          store.commit("setPurchaseVip", false)
        }
        console.log(url)
        return redirect(url)
      } else {
        if (!store.state.isMobile) {
          return redirect('/user_center')
        } else {
          return redirect('/user_center_mobile')
        }
      }
    }
  }
}
