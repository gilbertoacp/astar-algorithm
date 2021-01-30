<template>
  <div 
    class="grid"
    :style="{ '--grid-cols': cols, '--grid-rows': rows }" 
    @mousemove="drawWalls"
    @click.prevent="setStartNode"
    @contextmenu.prevent="setEndNode"
    >
      <Node 
        v-for="(point, index) in board" 
        :key="index"
        :col="point.col"
        :row="point.row"
        :isStartNode="point.isStartNode"
        :isEndNode="point.isEndNode"
        :isBarrier="point.isBarrier"
        :color="point.color"
      >
      </Node>
  </div>
</template>

<script>
import Node from './Node';
import NodeModel from '../models/Node';
import { Colors } from "../helpers";

export default {
  name: 'PathFinding',
  components: { Node },
  props: {
    stateControl: String
  },
  data: function() {
    return {
      rows: 20,
      cols: 40,
      board: [],
      mousePressed: false,
      startNode: null,
      endNode: null,
      openSet: [],
      closedSet: []
    }
  },
  created: function() {
    this.setUp();
  },
  methods: {
    setUp : function() {

      const { rows, cols, board } = this;

      for(let x = 0; x < rows; x++) {
        for(let y = 0; y < cols; y++) {
          board.push(new NodeModel(x, y));
        }
      }

    },
    setStartNode: function (e) {

      if(this.startNode)
        return;

      const { row, col } = e.target.__vue__;

      if(row && col) {
        const node = this.getNode(row, col);
        node.isStartNode = true;
        node.color = Colors.ORANGE;
        this.startNode = node;
      }

    },
    setEndNode: function (e) {
      
      if(this.endNode)
        return;

      const { row, col } = e.target.__vue__;

      if(row && col) {
        const node = this.getNode(row, col);
        node.isEndNode = true;
        node.color = Colors.TURQUOISE;
        this.endNode = node;
      }

    },
    getNode: function (row, col) {
      const result = this.board.filter(node => node.row === row && node.col === col);
      const node = result? result[0]: null;
      return node;
    },
    startAlgorithm: function() {
      
    },
    clearBoard: function() {
      this.startNode = null;
      this.endNode = null;
      this.openSet = [];
      this.closedSet = [];
      this.board.forEach(node => node.clearNode());
    },
    drawWalls: function(e) {
      if(e.ctrlKey) {
        const { row, col } = e.target.__vue__;
  
        const node = this.getNode(row, col);

        if(node.isStartNode || node.isEndNode)
          return;

        
        node.isBarrier = true;
        node.color = Colors.BLACK;
      }
    },
  },
  watch: {
    stateControl: function(current) {
      switch(current) {
        case 'start':
          this.startAlgorithm();
        break;

        case 'clear':
          this.clearBoard();
        break;
      }

      this.$emit('state', 'none');
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
