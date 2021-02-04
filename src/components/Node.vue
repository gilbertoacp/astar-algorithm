<template>
  <div 
    class="node"
    @click.prevent="emitStartNode"
    @contextmenu.prevent="emitEndNode"
    @mousemove="emitBarrierNode"
    :style="{'background-color': color}"
  >
  </div>
</template>

<script>
import { Colors } from "../helpers";

export default {
  name: 'Node',
  props: {
    color: String,
    row: Number,
    col: Number
  },
  data: function() {
    return {
      colors: Colors,
    }
  },
  methods: {
    emitStartNode: function () {
      const { row, col } = this;
      this.$emit('startNode', { row, col });
    },
    emitEndNode: function () {
      const { row, col } = this;
      this.$emit('endNode', { row, col });
    },
    emitBarrierNode: function(e) {
      if(e.ctrlKey) {
        const { row, col } = this;
        this.$emit('barrierNode', { row, col });
      } 
    }
  },
}
</script>

<style scoped>
.node {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(150, 150, 150);
  display: block;
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
} 

</style>