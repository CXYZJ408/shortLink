<template>
  <div id="index" style="padding-top: 55px;">
    <div class="hidden-md-and-up" id="mobile">
      <div style="position:relative;">
        <v-carousel hide-controls hide-delimiters height="30vh">
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
        <div class="mask-mobile">
          <div class="content-mobile">
            <div class="main-title-mobile">JumpLinker</div>
            <div class="main-sub-title-mobile">短链生成，一键追踪，安全高效，毫秒级响应，快速直达。</div>
          </div>
          <div class="action-mobile">
            <v-btn color="#FF7800" small depressed dark nuxt to="/transfer"><span class="btn-title-mobile">免费试用</span>
            </v-btn>
            <v-btn color="white" small outline depressed dark @click="purchase"><span
              class="btn-title-mobile">立即购买</span>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="second">
        <div class="second-title-mobile">
          专为跳转而生
        </div>
        <div class="second-img">
          <img src="/img/index/tree.png" width="180px" alt="">
        </div>
        <v-layout row wrap justify-center>
          <v-flex md2 class="text-xs-center">
            <img src="/img/index/ico-top-01.png" width="40px" alt="">
            <div class="second-subtitle-mobile">无劫持</div>
          </v-flex>
          <v-flex md2 class="text-xs-center">
            <img src="/img/index/ico-top-02.png" width="40px" alt="">
            <div class="second-subtitle-mobile">安全高效</div>
          </v-flex>
          <v-flex md2 class="text-xs-center">
            <img src="/img/index/ico-top-03.png" width="40px" alt="">
            <div class="second-subtitle-mobile">跳转任何内容</div>
          </v-flex>
          <v-flex md2 class="text-xs-center">
            <img src="/img/index/ico-top-04.png" width="40px" alt="">
            <div class="second-subtitle-mobile">快如闪电</div>
          </v-flex>
          <v-flex md8 class="text-xs-center mt-2">
            <div class="second-content-mobile">安全高效无劫持，毫秒级快速响应，多台服务器提供稳定性保证，让您跳转无忧。</div>
            <div class="second-content-mobile">操作简单，终身免费使用，更有VIP专享服务为您提供。</div>
          </v-flex>
        </v-layout>
      </div>
      <div class="mt-2">
        <div class="y-card-content text-xs-center">
          <!--blue card-->
          <div class="card-blue y-card-mobile">
            <div>
              <div class="y-card-title-mobile">免费版</div>
              <div class="mt-3">
                <div>
                  <v-icon color="#4D55E8" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle-mobile">访问次数不限</span></div>
                <div class="mt-3">
                  <v-icon color="#4D55E8" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle-mobile">短地址数量不限</span></div>
              </div>
              <div class="text-xs-right" style="z-index: 99;">
                <v-btn style="z-index: 99;" depressed small dark round color="#4D55E8" nuxt to="/register"><span
                  class="y-card-btn-mobile px-2">免费注册</span>
                </v-btn>
              </div>
              <div class="img pt-2" style="z-index: 10;">
                <img style="z-index: 10;" src="/img/index/blue-back.svg" width="250px" alt="">
              </div>
            </div>
          </div>
          <!--yellow card-->
          <div class="card-yellow y-card-mobile mt-3">
            <div class="up-mobile">
              <div class="left">
                <div class="y-card-title-mobile">VIP版</div>
                <div class="mt-2">
                  <v-icon color="#FF960C" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle-mobile">访问次数不限</span>
                </div>
                <div class="mt-2">
                  <v-icon color="#FF960C" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle-mobile">短地址数量不限</span>
                </div>
              </div>
              <div class="right ">
                <div class="mt-2">
                  <v-icon color="#FF960C" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle-mobile">统计数据可视化</span>
                </div>
                <div class="mt-2">
                  <v-icon color="#FF960C" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle-mobile">任意修改链接指向</span>
                </div>
                <div class="mt-2">
                  <v-icon color="#FF960C" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle-mobile">多地址合并统计</span>
                </div>
              </div>
            </div>
            <div class="mt-2 text-xs-right" style="z-index: 99;">
              <v-btn style="z-index: 99;" depressed small dark round color="#FF960C" @click="purchase"><span
                class="y-card-btn-mobile px-2">特价购买</span>
              </v-btn>
            </div>
            <div class="img pt-2" style="z-index: 10;">
              <img src="/img/index/yellow-back.svg" style="z-index: 10;" width="250px" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="my-card-dark-mobile mt-4">
        <v-layout align-center justify-center row fill-height>
          <v-flex xs6>
            <p class="p-title-mobile">方方面面，快而稳定</p>
            <p class="p-content-mobile">多台服务器实时保证您的跳转链接稳定有效，我们会不断提升我们的服务器速度和性能，给您提供快速而稳定的跳转服务。</p>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <img src="/img/index/server.png" width="80px" alt="">
          </v-flex>
        </v-layout>
      </div>
      <div class="my-card-mobile">
        <v-layout align-center justify-center row fill-height>
          <v-flex xs3>
            <img src="/img/index/security.png" width="80px" alt="">
          </v-flex>
          <v-flex xs6 offset-xs1>
            <p class="p-title-mobile">安全高效，拒绝劫持</p>
            <p class="p-content-mobile">我们会使用银行级别的加密来确保您的任何跳转链接的安全，有专门的网络安全团队时刻保证跳转链接不被劫持，让您安全跳转。</p>
          </v-flex>
        </v-layout>
      </div>
      <div class="my-card-dark-mobile">
        <v-layout align-center justify-center row fill-height>
          <v-flex xs6>
            <p class="p-title-mobile">终身免费使用！</p>
            <p class="p-content-mobile">一次注册终身免费使用，无需任何费用即可享受不限次数的网站跳转，同时如有需要亦为您提供了VIP专项服务体验。</p>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <div class="free-mobile">Free!</div>
          </v-flex>
        </v-layout>
      </div>
      <myFooter></myFooter>


    </div>

    <div class="hidden-sm-and-down">
      <div style="position:relative;">
        <v-carousel hide-controls hide-delimiters height="82vh">
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
        <div class="mask">
          <div class="content">
            <div class="main-title">JumpLinker</div>
            <div class="sub-title">短链生成，一键追踪，安全高效，毫秒级响应，快速直达。</div>
          </div>
          <div class="action">
            <v-btn color="#FF7800" large depressed dark nuxt to="/transfer"><span class="btn-title">免费试用</span></v-btn>
            <v-btn color="white" large outline depressed dark @click="purchase"><span class="btn-title">立即购买</span>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="second">
        <div class="second-title">
          专为跳转而生
        </div>
        <div class="second-img">
          <img src="/img/index/tree.png" width="400px" alt="">
        </div>
        <v-layout row wrap justify-center>
          <v-flex md2 class="text-md-center">
            <img src="/img/index/ico-top-01.png" width="60px" alt="">
            <div class="second-subtitle">无劫持</div>
          </v-flex>
          <v-flex md2 class="text-md-center">
            <img src="/img/index/ico-top-02.png" width="60px" alt="">
            <div class="second-subtitle">安全高效</div>
          </v-flex>
          <v-flex md2 class="text-md-center">
            <img src="/img/index/ico-top-03.png" width="60px" alt="">
            <div class="second-subtitle">跳转任何内容</div>
          </v-flex>
          <v-flex md2 class="text-md-center">
            <img src="/img/index/ico-top-04.png" width="60px" alt="">
            <div class="second-subtitle">快如闪电</div>
          </v-flex>
          <v-flex md8 class="text-md-center mt-3">
            <div class="second-content">安全高效无劫持，毫秒级快速响应，多台服务器提供稳定性保证，让您跳转无忧。</div>
            <div class="second-content">操作简单，终身免费使用，更有VIP专享服务为您提供。</div>
          </v-flex>
        </v-layout>
      </div>
      <div class="mt-3">
        <div class="y-card-content">
          <!--blue card-->
          <div class="card-blue y-card d-inline-block">
            <div>
              <div class="y-card-title">免费版</div>
              <div class="mt-3">
                <div>
                  <v-icon color="#4D55E8" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle">访问次数不限</span></div>
                <div class="mt-3">
                  <v-icon color="#4D55E8" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle">短地址数量不限</span></div>
              </div>
              <div class="mt-3 text-md-right">
                <v-btn depressed dark round color="#4D55E8" nuxt to="/register"><span
                  class="y-card-btn px-2">免费注册</span>
                </v-btn>
              </div>
              <div class="img">
                <img src="/img/index/blue-back.svg" alt="">
              </div>
            </div>
          </div>
          <!--yellow card-->
          <div class="card-yellow y-card d-inline-block ml-5">
            <div class="up">
              <div class="left">
                <div class="y-card-title">VIP版</div>
                <div class="mt-3">
                  <v-icon color="#FF960C" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle">访问次数不限</span>
                </div>
                <div class="mt-3">
                  <v-icon color="#FF960C" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle">短地址数量不限</span>
                </div>
              </div>
              <div class="right mt-3">
                <div class="mt-3">
                  <v-icon color="#FF960C" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle">统计数据可视化</span>
                </div>
                <div class="mt-3">
                  <v-icon color="#FF960C" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle">任意修改链接指向</span>
                </div>
                <div class="mt-3">
                  <v-icon color="#FF960C" size="20">iconfont icon-done</v-icon>
                  <span class="y-card-subtitle">多地址合并统计</span>
                </div>
              </div>
            </div>
            <div class="mt-3 text-md-right">
              <v-btn depressed dark round color="#FF960C" @click="purchase"><span class="y-card-btn px-2">特价购买</span>
              </v-btn>
            </div>
            <div class="img">
              <img src="/img/index/yellow-back.svg" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="my-card-dark mt-4">
        <v-layout align-center justify-center row fill-height>
          <v-flex md5 style="margin-top: -70px">
            <p class="p-title">方方面面，快而稳定</p>
            <p class="p-content">多台服务器实时保证您的跳转链接稳定有效，我们会不断提升我们的服务器速度和性能，给您提供快速而稳定的跳转服务。</p>
          </v-flex>
          <v-flex md2 offset-md1>
            <img src="/img/index/server.png" width="280px" alt="">
          </v-flex>
        </v-layout>
      </div>
      <div class="my-card">
        <v-layout align-center justify-center row fill-height>
          <v-flex md2>
            <img src="/img/index/security.png" width="280px" alt="">
          </v-flex>
          <v-flex md5 offset-md1 style="margin-top: -70px">
            <p class="p-title">安全高效，拒绝劫持</p>
            <p class="p-content">我们会使用银行级别的加密来确保您的任何跳转链接的安全，有专门的网络安全团队时刻保证跳转链接不被劫持，让您安全跳转。</p>
          </v-flex>
        </v-layout>
      </div>
      <div class="my-card-dark" style="height: 350px">
        <v-layout align-center justify-center row fill-height>
          <v-flex md5 style="margin-top: -70px">
            <p class="p-title">终身免费使用！</p>
            <p class="p-content">一次注册终身免费使用，无需任何费用即可享受不限次数的网站跳转，同时如有需要亦为您提供了VIP专项服务体验。</p>
          </v-flex>
          <v-flex md2 offset-md1>
            <div class="free">Free!</div>
          </v-flex>
        </v-layout>
      </div>
      <myFooter></myFooter>
    </div>


  </div>
</template>

<script>
  import myFooter from '../../components/PC/layout/myFooter'

  export default {
    name: "index",
    data() {
      return {
        items: [
          {src: '/img/index/1.jpg'},
          {src: '/img/index/2.jpg'},
          {src: '/img/index/3.jpg'}
        ],
      }
    },
    components: {myFooter},
    methods: {
      purchase() {
        //状态树中设置跳转购买页面
        this.$store.commit("setPurchaseVip", true)
        this.$router.push("/login")
      }
    }
  }
</script>

<style scoped>
  #mobile::-webkit-scrollbar {
    width: 0;
  }

  #mobile {
    overflow: auto;
  }

  .mask {
    background-color: rgba(48, 48, 77, 0.3);
    position: absolute;
    top: 0;
    height: 82vh;
    width: 100%;
    z-index: 99;
  }

  .mask-mobile {
    background-color: rgba(48, 48, 77, 0.3);
    position: absolute;
    top: 0;
    height: 30vh;
    width: 100%;
    z-index: 99;
  }

  .content-mobile {
    text-align: center;
    color: white;
    margin-top: 4vh;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .main-title-mobile {
    font-size: 5vh;
    font-weight: 600;
  }

  .main-sub-title-mobile {
    font-size: 2vh;
  }

  .action-mobile {
    margin-top: 2vh;
    text-align: center;
  }

  .btn-title-mobile {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 2vh;
  }

  .second-title-mobile {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 4vh;
    color: #41424E;
    font-weight: 600;
    text-align: center;
    width: 100%;
  }

  .second-subtitle-mobile {
    color: #41424E;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 12px;
    font-weight: 600;
  }

  .second-content-mobile {
    margin-top: 5px;
    color: #727888;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 10px;
  }

  .content {
    text-align: center;
    color: white;
    margin-top: 16vh;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .main-title {
    font-size: 60px;
    font-weight: 600;
  }

  .sub-title {
    font-size: 22px;
  }

  .action {
    margin-top: 10vh;
    text-align: center;

  }

  .btn-title {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 25px;
  }

  .second-title {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 50px;
    color: #41424E;
    font-weight: 600;
    text-align: center;
    width: 100%;
  }

  .second {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .second-img {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 50%;
  }

  .second-subtitle {
    color: #41424E;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 17px;
    font-weight: 600;
  }

  .second-content {
    margin-top: 10px;
    color: #727888;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 18px;
  }

  .my-card-dark {
    width: 100%;
    background-color: #F2F2F6;
    height: 455px;
  }

  .my-card-dark-mobile {
    width: 100%;
    background-color: #F2F2F6;
    height: 200px;
  }

  .my-card {
    width: 100%;
    height: 455px;
  }

  .my-card-mobile {
    width: 100%;
    height: 200px;
  }

  .p-title {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 600;
    font-size: 40px;
    line-height: 90px;
    color: #41424E;
  }

  .p-title-mobile {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #41424E;
  }

  .p-content {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 18px;
    color: #727888;
  }

  .p-content-mobile {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 12px;
    color: #727888;
  }

  .free {
    font-size: 150px;
    color: #A670F0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-style: italic;
    font-weight: 600;
  }

  .free-mobile {
    font-size: 50px;
    color: #A670F0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-style: italic;
    font-weight: 600;
  }

  .y-card {
    padding: 36px 40px 40px 42px;
    width: 556px;
    height: 280px;
    border-radius: 15px;
    position: relative;
    text-align: left;
    vertical-align: top;
  }

  .y-card-mobile {
    padding: 16px 20px 20px 22px;
    width: 300px;
    height: 180px;
    border-radius: 15px;
    position: relative;
    text-align: left;
    margin-left: auto;
    margin-right: auto;

  }

  .card-blue {
    background-color: rgba(77, 85, 232, .06);
  }

  .card-yellow {
    background-color: #FFF6EA;
  }

  .y-card-title {
    font-size: 40px;
    color: #41424E;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .y-card-title-mobile {
    font-size: 20px;
    color: #41424E;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .y-card-subtitle {
    font-size: 18px;
    padding-left: 3px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #41424E;
  }

  .y-card-subtitle-mobile {
    font-size: 12px;
    padding-left: 3px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #41424E;
  }

  .y-card-btn {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 20px;
  }

  .y-card-btn-mobile {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 12px;
  }

  .img {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 80px;
    overflow: hidden;
    border-bottom-left-radius: 15px;
  }

  .y-card-content {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
  }

  .left {
    width: 50%;
    float: left;
  }

  .right {
    width: 50%;
    float: left;
  }

  .up {
    height: 150px;
  }

  .up-mobile {
    height: 90px;
  }

  .foot-div {
    height: 116px;
  }

</style>
<style>
  #index .v-btn--large {
    height: 55px !important;
  }
</style>
