export default  ({store, route, redirect, error, params, req}) => {
  //用户路由拦截
  //检测登录状态
  if (!store.state.isLogin) {
    // 未登陆
    if (route.path !== '/login' && route.path !== '/register') {
      return redirect('/login')
    }
  } else {
    //已登录
    if (route.path === '/login' || route.path === '/register') {
      return redirect('/')
    }
  }
}
