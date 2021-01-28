<template>
  <div 
    class="node"
    :style="{ 'background-color': color }"
    @mousemove.prevent="drawWall"
    @click.prevent="emitStartNode"
    @contextmenu.prevent="emitEndNode"
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
    mousePressed: Boolean,
    startNodeIsSet: Boolean,
    endNodeIsSet: Boolean,
  },
  data: function() {
    return {
      color: Colors.WHITE,
      f: 0,
      g: 0,
      h: 0,
      neighbors: []
    }
  },
  methods: {
    drawWall: function() {

      const { mousePressed, color } = this;

      if(color === Colors.ORANGE || color === Colors.TURQUOISE) return;

      if( mousePressed ) {
        this.color = Colors.BLACK;
      }
    },
    emitStartNode: function () {
      const { startNodeIsSet, color } = this;

      if(startNodeIsSet || color === Colors.BLACK) return;

      this.color = Colors.ORANGE;
      this.$emit('setStartNode', this);
    },
    emitEndNode: function () {
      const { endNodeIsSet, color } = this;

      if(endNodeIsSet || color === Colors.BLACK) return;

      this.color = Colors.TURQUOISE;
      this.$emit('setEndNode',  this);
    },
    isWall: function() {
      return this.color === Colors.BLACK;
    },
    addNeighbors: function () {
      //
    }
  }
}
</script>

<style scoped>
.node {
  padding: 1em;
  border: 1px solid rgb(156, 167, 170);
  text-align: center;
  cursor: pointer;
}
</style>