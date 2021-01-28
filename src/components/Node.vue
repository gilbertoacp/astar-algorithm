<template>
  <div 
    class="node"
    :style="{ 'background-color': color }"
    @mousemove.prevent="drawWall"
  >
  </div>
</template>

<script>
import { Colors } from "../helpers";

export default {
  name: 'Node',
  props: {
    col: Number,
    row: Number,
    mousePressed: Boolean
  },
  data: function() {
    return {
      color: Colors.WHITE,
    }
  },
  methods: {
    drawWall: function() {
     const { mousePressed } = this.$props;

      if(mousePressed) {
        console.log('Dibujando');
      }
    },
  }
}
</script>

<style scoped>
.node {
  padding: 1em;
  border: 1px solid rgb(118, 213, 241);
  text-align: center;
  cursor: pointer;
}
</style>