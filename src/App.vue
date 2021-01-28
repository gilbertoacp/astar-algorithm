<template>
  <NavControl></NavControl>
</template>

<script>
import NavControl from './components/NavControl';

export default {
  name: 'App',
  components: {
    NavControl
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
