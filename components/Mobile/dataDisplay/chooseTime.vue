<template>
  <div class="time ">
    <span class="time-text my-inline-div ">
      往前：
    </span>
    <div id="progress" @touchmove="move" @touchend="end" class="my-inline-div time-progress">
      <div class="progress" :style="{'width':width+'px'}"></div>
      <div class="mr-2 hour white--text">
        {{hourBefore}}
      </div>
    </div>
    <span class="time-text my-inline-div ">
      小时
    </span>
  </div>
</template>

<script>
  let left = 0
  let max = 0
  let perHour = 1
  let hours = 8
  export default {
    name: "chooseTime",
    mounted() {
      let el = document.getElementById("progress")
      left = el.offsetLeft
      max = el.clientWidth
      perHour = max / hours
      this.width = 5
    },
    computed: {
      hourBefore: function () {
        return Math.ceil(this.width / perHour)
      }
    },
    methods: {
      end() {
        this.$emit('changeData', this.hourBefore)
      },
      move(event) {
        let width = event.touches[0].clientX - left
        if (width <= max && width >= 5) {
          setTimeout(() => {
            this.width = width
          }, 20)
        }
      }
    },
    data: function () {
      return {
        width: 0
      }
    }
  }
</script>

<style scoped>
  .time {
    width: 100%;
    height: 22px;
  }

  .time-text {
    font-size: 2.5vh;
    line-height: 22px;
    font-family: 华文楷体, serif;
  }

  .time-progress {
    position: relative;
    width: 70%;
    height: 100%;
    overflow: hidden;
    background-color: #BEE0FF;
    border-radius: 20px;
  }

  .progress {
    background-color: #40A1FA;
    height: 100%;
    z-index: 10;
  }

  .hour {
    position: absolute;
    right: 0;
    z-index: 9999;
    top: 0;
  }
</style>
