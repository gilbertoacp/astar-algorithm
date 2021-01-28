<template>
  <div 
    class="grid"
    :style="{ '--grid-cols': cols, '--grid-rows': rows }" 
    @mousedown.prevent="mousePressed = true"
    @mouseup.prevent="mousePressed = false" 
  >
    <Node 
      v-for="(node, index) of templateBoard" 
      :key="index"
      :col="node.col"
      :row="node.row"
      :mousePressed="mousePressed"
      :startNodeIsSet="startNode? true: false"
      :endNodeIsSet="endNode? true: false"
      @setStartNode="setStartNode"
      @setEndNode="setEndNode"
    >
    </Node>
  </div>
</template>

<script>
import Node from './Node';

export default {
  name: 'PathFinding',
  components: { Node },
  props: {

  },
  data: function() {
    return {
      rows: 20,
      cols: 40,
      templateBoard: [],
      board: [],
      mousePressed: false,
      startNode: null,
      endNode: null,
      openSet: [],
      closedSet: []
    }
  },
  created: function() {
    const { rows, cols, templateBoard } = this;

    for(let row = 1; row <= rows; row++) {
      for(let col = 1; col <= cols; col++) {
        templateBoard.push({ row, col });
      }
    }

    this.board = this.$children;
  },
  methods: {
    setStartNode: function (startNode) {
      this.startNode = startNode;
    },
    setEndNode: function (endNode) {
      this.endNode = endNode;
    },
    draw : function () {

      let winner = 0;

      if(this.openSet.length > 0) { 
        console.log();

        for (let i = 0; i < this.openSet.length; i++) {
          if(this.openSet[i].f  < this.openSet[winner].f) {
            //
          }
          
        }

      } else {
        console.log();
      }

    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-template-columns: repeat(var(--grid-cols), 1fr );
  width: 100%;
  height: 75%;
  position: absolute;
  bottom: 0;
}
</style>
