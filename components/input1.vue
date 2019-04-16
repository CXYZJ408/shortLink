<template>
  <div>
    <v-layout row wrap justify-center>
      <v-flex md6>
        <v-text-field v-model="text" background-color="green"></v-text-field>
      </v-flex>
      <v-flex md2>
        <v-btn @click="add" dark>add</v-btn>
      </v-flex>
      <v-flex md6>
        <myList :textList="addText"></myList>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
  import myList from './list1'

  export default {
    //todo delete

    name: "input1",
    components: {
      myList
    },
    data: function () {
      return {
        text: "",
        addText: []
      }
    },
    methods: {
      add() {
        this.addText.push(this.text)
      }
    }
  }
</script>

<style scoped>

</style>
