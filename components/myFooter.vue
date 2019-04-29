<template>
  <div class="text-md-center pt-3 my-footer">
    <div class="end-text">本站禁止赌博、色情、暴力、诈骗等违法违规内容、支付页面或未经备案的网站生成的短网址，如有发现立即封停！</div>
    <div class="end-text">本站仅提供待统计的短网址服务，短网址有用户生成，所有跳转的网站内容均与本站无关，访客请自行记录并核对跳转后的网站，谨防受骗！</div>
    <div class="end-text">客服QQ：24259830 <a target="_blank" style="text-decoration: none" href="http://www.beian.miit.gov.cn/">苏ICP备19021199号-1</a></div>
    <div class="text-md-center end-text">© 2019 JumpLinker. All rights reserved.</div>
  </div>
</template>

<script>
  export default {
    name: "myFooter"
  }
</script>

<style scoped>
  .my-footer {
    width: 100%;
  }

  .end-text {
    font-size: 14px;
    line-height: 25px;
    color: #ADADBD;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .end-text a{
    text-decoration: none;
    color: #ADADBD;
    padding-left: 20px;
  }
  .end-text a:hover{
    color: #3FA3F9;
  }
</style>
