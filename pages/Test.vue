<template>
  <div>
    <div class="test" :style="{'height':availHeight+'px'}"></div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        availHeight: 0
      }
    },
    methods: {
      setHeight()  {
        console.log(window.innerHeight)
        this.availHeight = window.innerHeight - 70
      },
      setEvent() {
        window.onresize = () => {
          this.setHeight()
        }
      }
    },
    mounted() {
      this.setHeight()
      this.setEvent()
    }
  }
</script>

<style scoped>
  .test {
    width: 100px;
    margin-top: 70px;
    background-color: orangered;
  }

</style>
