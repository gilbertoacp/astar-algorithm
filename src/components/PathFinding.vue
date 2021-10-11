<template>
  <div 
    class="grid"
    :style="{ '--grid-cols': cols, '--grid-rows': rows }" 
  >
    <Node
      v-for="(node, idx) in templateBoard"
      :key="idx"
      :color="node.color"
      :row="node.row"
      :col="node.col"
      @startNode="setStartNode"
      @endNode="setEndNode"
      @barrierNode="drawWall"
    >
    </Node>
  </div>
</template>

<script>
import Node from './Node';
import NodeModel from '../models/Node';
import { h, removeFromArrayBackwards, flatten } from "../helpers";

export default {
  name: 'PathFinding',
  components: { Node },
  props: {
    stateControl: String
  },
  data: function() {
    return {
      rows: 25,
      cols: 60,
      board: [],
      startNode: null,
      endNode: null,
      openSet: [],
      closedSet: [],
      path: [],
      canDrawWall: true,
    }
  },
  created: function() {
    this.setUp();
  },
  computed: {
    templateBoard: function() {
      return flatten(this.board);
    }
  },
  methods: {
    setUp : function() {
      for(let row = 0; row < this.rows; row++) {
        
        this.board[row] = [];
        
        for(let col = 0; col < this.cols; col++) 
          this.board[row].push(new NodeModel(row, col));
      }
    },
    setStartNode: function (pos) {
      if(this.startNode) 
        return;
      
      const { row, col } = pos;
      const posRow = this.board[row].slice(0);

      if(posRow[col].isEndNode() || posRow[col].isBarrier()) {
        return;
      }
      
      posRow[col].setStartNode();
      this.startNode = posRow[col];
      this.$set(this.board, row, posRow);
    },
    setEndNode: function (pos) {
      if(this.endNode) 
        return;
      
      const { row, col } = pos;
      const posRow = this.board[row].slice(0);

      if(posRow[col].isStartNode() || posRow[col].isBarrier()) {
        return;
      }
      posRow[col].setEndNode();
      this.endNode = posRow[col];
      this.$set(this.board, row, posRow);
    },
    drawWall: function(pos) {

      if(!this.canDrawWall) return;

      const { row, col } = pos;
      
      const posRow = this.board[row].slice(0);
      
      if(posRow[col].isStartNode() || posRow[col].isEndNode()) return;
      
      posRow[col].setBarrier();

      setTimeout(() => {
        this.$set(this.board, row, posRow);
      }, 15);
    },
    startAlgorithm: function() {

      this.canDrawWall = false;
      this.$emit('state', 'running');

      for(const row of this.board) 
        for(const node of row) 
          node.addNeighbors(this.board, this.rows, this.cols);

      this.openSet.push(this.startNode);
      this.startNode.g = 0;
      this.startNode.f = h(this.startNode, this.endNode);

      while(this.openSet.length > 0) {

        let lowest = 0;

        for (let idx = 0; idx < this.openSet.length; idx++) 
          if(this.openSet[idx].f < this.openSet[lowest].f) 
            lowest = idx;
    
        const current = this.openSet[lowest];

        if(current.row === this.endNode.row && 
          current.col === this.endNode.col
        ) {

          let temp = current;
          let first = true;

          while(temp.previous) {

            if(first) {
              this.path.push(temp);
              first = false;
            }

            this.path.push(temp.previous);
            temp = temp.previous;
          }

          
          for(let idx = this.path.length - 1; idx >= 0; idx--) {
            setTimeout(() => {

              if(idx === 0) {
                this.$emit('state', 'none');
              }

              this.path[idx].setPath();

            }, 100 / (idx + 1)); 
          } 

          console.log('DONE');
          return;
        }

        removeFromArrayBackwards(this.openSet, current);
        
        for(const neighbor of current.neighbors) {
          let tentativeG = current.g + 1;

          if(tentativeG < neighbor.g) {
            neighbor.previous = current;
            neighbor.h = h(neighbor, this.endNode);
            neighbor.g = tentativeG;
            neighbor.f = neighbor.g + neighbor.h;

            if(!this.openSet.includes(neighbor))  {
              setTimeout(() => neighbor.setOpen(), 1);
              this.openSet.push(neighbor);
            }
          }
        }

        setTimeout(() => {
          current.setClosed();
        }, 1);
        
      } 

      this.$emit('state', 'none');
      console.log('No Solution');
      return;
    },
    clearBoard: function() {
      this.canDrawWall = true;
      this.startNode = null;
      this.endNode = null;
      this.openSet = [];
      this.closedSet = [];
      this.path = [];

      for(let row = 0; row < this.rows; row++) 
        for(let col = 0; col < this.cols; col++) 
          this.board[row][col].clearNode();
      
      this.$forceUpdate();
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
          this.$emit('state', 'clear');
          this.$emit('state', 'none');
        break;
      }

    }
  }
}
</script>

<style scoped>
 .grid {
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-template-columns: repeat(var(--grid-cols), 1fr);
  width: 100%;
  height: 75%;
  position: absolute;
  bottom: 0;
 }

</style>
