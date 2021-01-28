<template>
  <PathFinding></PathFinding>
</template>

<script>
import PathFinding from './components/PathFinding';

export default {
  name: 'App',
  components: {
    PathFinding
  } 
}
</script>

<style>
:root {
  --grid-cols: 1;
  --grid-rows: 1;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
