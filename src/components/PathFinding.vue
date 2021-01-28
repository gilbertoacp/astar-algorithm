<template>
  <div 
    class="grid"
    :style="{ '--grid-cols': cols, '--grid-rows': rows }" 
    @mousedown.prevent="mousePressed = true"
    @mouseup.prevent="mousePressed = false" 
  >
    <Node 
      v-for="(node, index) of grid" 
      :key="index"
      :col="node.col"
      :row="node.row"
      :mousePressed="mousePressed"
    >
    </Node>
  </div>
</template>

<script>
import Node from './Node';

export default {
  name: 'PathFinding',
  props: {  },
  components: { Node },
  data: function() {
    return {
      rows: 18,
      cols: 35,
      grid: [],
      mousePressed: false
    }
  },
  created: function() {
    const {rows, cols, grid} = this.$data;

    for(let row = 1; row <= rows; row++) {

      for(let col = 1; col <= cols; col++) {
        
        grid.push({ row, col });
      
      }

    }

    console.log(grid);
  },
  methods: {
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-rows: repeat(var(--grid-rows), 1fr );
  grid-template-columns: repeat(var(--grid-cols), 1fr );
  width: 100%;
  height: 70%;
  position: absolute;
  bottom: 0;
}

</style>
