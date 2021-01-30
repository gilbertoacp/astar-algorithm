<template>
  <div 
    class="node"
    :style="{ 'background-color': color }"
  >
  </div>
</template>

<script>
export default {
  name: 'Node',
  props: {
    col: Number,
    row: Number,
    isStartNode: Boolean,
    isEndNode: Boolean,
    neighbors: [],
    isBarrier: Boolean,
    f: Number,
    g: Number,
    h: Number,
    color: String
  }
}
</script>

<style scoped>
.node {
  padding: 1em;
  border: 1px solid rgb(150, 150, 150);
  text-align: center;
  cursor: pointer;
  transition: .3s ease;
}
</style>