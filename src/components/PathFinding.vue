<template>
  <div 
    class="grid"
    :style="{ '--grid-cols': cols, '--grid-rows': rows }" 
    @mousemove.prevent="drawWalls"
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
        :f="point.f"
        :g="point.g"
        :h="point.h"
      >
      </Node>
  </div>
</template>

<script>
import Node from './Node';
import NodeModel from '../models/Node';
import { Colors, removeFromArrayBackwards, h } from "../helpers";

export default {
  name: 'PathFinding',
  components: { Node },
  props: {
    stateControl: String
  },
  data: function() {
    return {
      rows: 20,
      cols: 50,
      board: [],
      mousePressed: false,
      startNode: null,
      endNode: null,
      openSet: [],
      closedSet: [],
      path: []
    }
  },
  created: function() {
    this.setUp();
  },
  methods: {
    setUp : function() {

      const { rows, cols, board } = this;

      for(let x = 0; x < rows; x++) 
        for(let y = 0; y < cols; y++) 
          board.push(new NodeModel(x, y));

      

    },
    setStartNode: function (e) {

      if(this.startNode)
        return;

      const { row, col } = e.target.__vue__;

      if(row !== null && col !== null) {
        const node = this.getNode(row, col);
        node.isStartNode = true;
        node.color = Colors.ORANGE;
        this.startNode = node;
        this.openSet.push(node);
      }

    },
    setEndNode: function (e) {
      
      if(this.endNode)
        return;

      const { row, col } = e.target.__vue__;

      if(row !== null && col !== null) {
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

      const { openSet, closedSet ,endNode, path, board, cols, rows } = this;

      let done = false;

      for (let idx = 0; idx < board.length; idx++) 
        board[idx].addNeighbors(board, rows, cols);

      let idx = 0;
      while(openSet.length > 0) {

        let winner = 0;

        console.log(++idx);

        for (let idx = 0; idx < openSet.length; idx++) 
          if(openSet[idx].f < openSet[winner].f) 
            winner = idx;

        let current = openSet[winner];  

        if(current.col === endNode.col && current.row === endNode.row) {
          let temp = current;
          let first = true;
          
          while(temp.previous) {

            if(first) {
              path.push(current);
              first = false;
            }

            path.push(temp.previous);
            temp = temp.previous;

          }

          // this.animateClosedSet();

          // for(let idx = path.length - 1; idx >= 0; idx--) {

          //   setTimeout(() => path[idx].color = Colors.BLUE, 300)
            
          // }

          // console.log('open set => ', openSet);
          // console.log('closed set => ', closedSet);
          // console.log('path => ', path);
          // console.log('DONE');

          done = true;

          break;
        }

        removeFromArrayBackwards(openSet, current);

        // setTimeout(() => current.color = Colors.RED, 30)
        
        closedSet.push(current);

        const neighbors = current.neighbors;

        for (let idx = 0; idx < neighbors.length; idx++) {

          const neighbor = neighbors[idx];

          if( !closedSet.includes(neighbor) ) {

            const tempG = current.g + 1;

            if( openSet.includes(neighbor) ) {

              if(tempG < neighbor.g) {

                neighbor.g = tempG;

              }

            } else {
            
              neighbor.g = tempG;
              // setTimeout(() => neighbor.color = Colors.GREEN, 30);
              openSet.push(neighbor);
            }

            neighbor.h = h(neighbor, endNode);
            neighbor.f = neighbor.g + neighbor.h; 
            neighbor.previous = current;
          }

        }

        if( done ) {
          console.log('Done');
        } else {
          console.log('No Solution');
        }

      } 
    },
    animateClosedSet: function() {
      const { closedSet } = this;

      for (let idx = 0; idx < closedSet.length; idx++) {
        setTimeout(() => closedSet[idx].color = Colors.RED, 10);        
      }
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
  height: 70%;
  position: absolute;
  bottom: 0;
}
</style>
