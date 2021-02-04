<template>
  <div class="legend">
    <div class="legend__item" 
         v-for="(item, idx) in items" 
         :key="idx"
         >
      <span class="legend__name">{{item.name}}</span>
      <span class="legend__square" 
            :style="{ 'background-color': item.value }"
            >
      </span>
    </div >
  </div>
</template>

<script>
import { Colors } from '../helpers';

export default {
  name: 'Legend',
  data: function() {
    return {
      colors: Colors
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.legend {
  display: flex;
  width: 100%;
  height: 150px;
  align-items: center;
  justify-content: space-around;
}

.legend > * {
  display: flex;
  justify-content: center;
  align-items: center;
}
.legend__square {
  height: 30px;
  width: 30px;
  margin-left: 10px;
}

.legend__name {
  font-size: 1.5em;
  font-weight: bold;
}
</style>