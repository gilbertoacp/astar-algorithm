<template>
  <div 
    class="node"
    @click.prevent="emitStartNode"
    @contextmenu.prevent="emitEndNode"
    @mousemove="emitBarrierNode"
    :style="{'background-color': color}"
  >
  </div>
</template>

<script>
import { Colors } from "../helpers";

export default {
  name: 'Node',
  props: {
    color: String,
    row: Number,
    col: Number
  },
  data: function() {
    return {
      colors: Colors,
    }
  },
  methods: {
    emitStartNode: function () {
      const { row, col } = this;
      this.$emit('startNode', { row, col });
    },
    emitEndNode: function () {
      const { row, col } = this;
      this.$emit('endNode', { row, col });
    },
    emitBarrierNode: function(e) {
      if(e.ctrlKey) {
        const { row, col } = this;
        this.$emit('barrierNode', { row, col });
      } 
    }
  },
}
</script>

<style scoped>
.node {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(150, 150, 150);
  display: block;
}
</style>