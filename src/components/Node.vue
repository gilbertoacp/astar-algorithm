<template>
  <div 
    class="node"
    :style="{ 'background-color': color }"
    :class="{ 
      'visited': colors.RED === color || colors.GREEN === color, 
      'path': colors.GREEN === color 
    }"
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
    isStartNode: Boolean,
    isEndNode: Boolean,
    neighbors: [],
    isBarrier: Boolean,
    f: Number,
    g: Number,
    h: Number,
    color: String
  },
  data: function() {
    return {
      colors: Colors
    }
  }
}
</script>

<style scoped>
.node {
  padding: 1em;
  border: 1px solid rgb(150, 150, 150);
  text-align: center;
  cursor: pointer;
}

/* .visited {
  -webkit-animation: scale-up-center 0ms cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	animation: scale-up-center 0ms cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.path {
  -webkit-animation: fade-in-fwd 10ms cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	animation: fade-in-fwd 10ms cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

@-webkit-keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
            transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
            transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
} */

</style>